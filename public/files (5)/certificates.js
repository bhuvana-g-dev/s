/**
 * certificates.js — Full CRUD for Certificates
 * ─────────────────────────────────────────────────────────────
 * Firestore collection : "certificates"
 * Firebase Storage     : "certificate-images/{docId}/{filename}"
 *
 * Changes:
 *  - paste + keydown(Escape) listeners moved to admin.js (centralized)
 *  - isModalOpen() exposed on public API for admin.js to check
 *  - unsubscribe() exposed so logout can clean up listener
 */

const Certificates = (() => {

  let db;
  let storage;
  const COLLECTION = "certificates";

  const ISSUERS = [
    "NPTEL", "Coursera", "Google", "Microsoft", "IBM",
    "Meta", "Amazon", "Udemy", "LinkedIn Learning", "Other"
  ];

  const CATEGORIES = [
    "Programming", "Web Development", "Data Science",
    "Data Analytics", "AI & ML", "Cloud", "Soft Skills",
    "Cybersecurity", "Networking", "Other"
  ];

  // ── State ─────────────────────────────────────────────────
  let allCerts     = [];
  let editingDocId = null;
  let selectedFile = null;
  let unsubscribeFn = null;
  let deleteDocId  = null;
  let deleteImgPath = null;

  // ── DOM refs ──────────────────────────────────────────────
  let tbody, addBtn, modal, modalTitle, modalSubmitText,
      form, docIdInput, titleInput, issuerInput,
      categoryInput, yearInput, verifyInput,
      imageInput, uploadArea, uploadPlaceholder,
      uploadPreview, previewImg, removeImgBtn,
      existingImgNote, existingImgLink,
      progressWrap, progressFill, progressPct,
      modalError, modalClose, modalCancel,
      deleteModal, deleteCertName, deleteConfirmBtn,
      deleteBtnText, deleteModalClose, deleteCancel,
      toast, previewPanel;

  // ══════════════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════════════

  function init() {
    db      = firebase.firestore();
    storage = firebase.storage();

    tbody             = document.getElementById("certs-tbody");
    addBtn            = document.getElementById("add-cert-btn");
    modal             = document.getElementById("cert-modal");
    modalTitle        = document.getElementById("cert-modal-title");
    modalSubmitText   = document.getElementById("cert-submit-text");
    form              = document.getElementById("cert-form");
    docIdInput        = document.getElementById("cert-doc-id");
    titleInput        = document.getElementById("cert-title");
    issuerInput       = document.getElementById("cert-issuer");
    categoryInput     = document.getElementById("cert-category");
    yearInput         = document.getElementById("cert-year");
    verifyInput       = document.getElementById("cert-verify");
    imageInput        = document.getElementById("cert-image-input");
    uploadArea        = document.getElementById("cert-upload-area");
    uploadPlaceholder = document.getElementById("cert-upload-placeholder");
    uploadPreview     = document.getElementById("cert-upload-preview");
    previewImg        = document.getElementById("cert-preview-img");
    removeImgBtn      = document.getElementById("cert-remove-img");
    existingImgNote   = document.getElementById("cert-existing-img-note");
    existingImgLink   = document.getElementById("cert-existing-img-link");
    progressWrap      = document.getElementById("cert-progress-wrap");
    progressFill      = document.getElementById("cert-progress-fill");
    progressPct       = document.getElementById("cert-progress-pct");
    modalError        = document.getElementById("cert-modal-error");
    modalClose        = document.getElementById("cert-modal-close");
    modalCancel       = document.getElementById("cert-modal-cancel");
    deleteModal       = document.getElementById("cert-delete-modal");
    deleteCertName    = document.getElementById("cert-delete-name");
    deleteConfirmBtn  = document.getElementById("cert-delete-confirm");
    deleteBtnText     = document.getElementById("cert-delete-btn-text");
    deleteModalClose  = document.getElementById("cert-delete-modal-close");
    deleteCancel      = document.getElementById("cert-delete-cancel");
    toast             = document.getElementById("certs-toast");
    previewPanel      = document.getElementById("cert-preview-panel");

    populateSelects();
    bindEvents();
    startRealtimeListener();
  }

  // ══════════════════════════════════════════════════════════
  // POPULATE SELECTS
  // ══════════════════════════════════════════════════════════

  function populateSelects() {
    if (issuerInput) {
      issuerInput.innerHTML =
        `<option value="">— Select issuer —</option>` +
        ISSUERS.map(i => `<option value="${i}">${i}</option>`).join("");
    }
    if (categoryInput) {
      categoryInput.innerHTML =
        `<option value="">— Select category —</option>` +
        CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join("");
    }
    if (yearInput) {
      const currentYear = new Date().getFullYear();
      let opts = `<option value="">— Select year —</option>`;
      for (let y = currentYear; y >= 2018; y--) {
        opts += `<option value="${y}">${y}</option>`;
      }
      yearInput.innerHTML = opts;
    }
  }

  // ══════════════════════════════════════════════════════════
  // FIRESTORE — REAL-TIME LISTENER
  // ══════════════════════════════════════════════════════════

  function startRealtimeListener() {
    unsubscribeFn = db
      .collection(COLLECTION)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (snapshot) => {
          allCerts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          renderTable(allCerts);
        },
        (err) => {
          console.error("[Certificates] Firestore error:", err);
          showTableError("Could not load certificates. Check Firestore rules.");
        }
      );
  }

  // ══════════════════════════════════════════════════════════
  // TABLE RENDERING
  // ══════════════════════════════════════════════════════════

  function renderTable(certs) {
    if (!tbody) return;

    if (certs.length === 0) {
      tbody.innerHTML = `
        <tr class="table-empty-row">
          <td colspan="6">
            <div class="table-empty">
              <span>No certificates yet.</span>
              <button class="btn-link" id="cert-empty-add-btn">Add your first certificate →</button>
            </div>
          </td>
        </tr>`;
      document.getElementById("cert-empty-add-btn")
        ?.addEventListener("click", openAddModal);
      return;
    }

    tbody.innerHTML = certs.map(c => `
      <tr class="project-row" data-id="${c.id}">
        <td class="col-img">
          ${c.imageUrl
            ? `<img src="${c.imageUrl}" alt="${escHtml(c.title)}" class="table-thumb cert-thumb" loading="lazy" data-id="${c.id}" title="Click to preview" />`
            : `<div class="table-thumb-placeholder">—</div>`}
        </td>
        <td class="col-title">
          <span class="proj-title-cell">${escHtml(c.title)}</span>
          <span class="proj-desc-cell">${escHtml(c.issuer || "")} · ${escHtml(c.year || "")}</span>
        </td>
        <td>
          <span class="cert-category-chip">${escHtml(c.category || "—")}</span>
        </td>
        <td>
          <span class="proj-desc-cell">${escHtml(c.issuer || "—")}</span>
        </td>
        <td class="col-links">
          ${c.verifyLink
            ? `<a href="${escHtml(c.verifyLink)}" target="_blank" rel="noopener" class="link-btn link-btn--live">Verify ↗</a>`
            : `<span class="proj-desc-cell">—</span>`}
        </td>
        <td class="col-actions">
          <div class="action-btns">
            <button class="action-btn action-btn--edit" data-id="${c.id}" title="Edit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button class="action-btn action-btn--delete"
              data-id="${c.id}" data-title="${escHtml(c.title)}" data-imgpath="${escHtml(c.imagePath || "")}" title="Delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              Delete
            </button>
          </div>
        </td>
      </tr>
    `).join("");

    tbody.querySelectorAll(".action-btn--edit").forEach(btn =>
      btn.addEventListener("click", () => openEditModal(btn.dataset.id))
    );
    tbody.querySelectorAll(".action-btn--delete").forEach(btn =>
      btn.addEventListener("click", () =>
        openDeleteModal(btn.dataset.id, btn.dataset.title, btn.dataset.imgpath)
      )
    );
    tbody.querySelectorAll(".cert-thumb").forEach(img =>
      img.addEventListener("click", () => showPreviewPanel(img.dataset.id))
    );
  }

  function showTableError(msg) {
    if (!tbody) return;
    tbody.innerHTML = `<tr><td colspan="6"><div class="table-error">${escHtml(msg)}</div></td></tr>`;
  }

  // ══════════════════════════════════════════════════════════
  // CERTIFICATE PREVIEW PANEL
  // ══════════════════════════════════════════════════════════

  function showPreviewPanel(docId) {
    const cert = allCerts.find(c => c.id === docId);
    if (!cert || !previewPanel) return;

    previewPanel.innerHTML = `
      <div class="cert-preview-card">
        <div class="cert-preview-header">
          <div>
            <h3 class="cert-preview-title">${escHtml(cert.title)}</h3>
            <p class="cert-preview-meta">
              <span class="cert-category-chip">${escHtml(cert.category || "")}</span>
              <span class="proj-desc-cell">${escHtml(cert.issuer || "")} · ${escHtml(cert.year || "")}</span>
            </p>
          </div>
          <button class="cert-preview-close" id="cert-preview-close" aria-label="Close preview">✕</button>
        </div>
        ${cert.imageUrl
          ? `<div class="cert-preview-img-wrap">
               <img src="${cert.imageUrl}" alt="${escHtml(cert.title)}" class="cert-preview-img" />
             </div>`
          : `<div class="cert-preview-no-img">No image uploaded</div>`}
        <div class="cert-preview-actions">
          ${cert.verifyLink
            ? `<a href="${escHtml(cert.verifyLink)}" target="_blank" rel="noopener" class="btn-primary">Verify Certificate ↗</a>`
            : ""}
          <button class="btn-ghost" id="cert-preview-edit" data-id="${cert.id}">Edit</button>
        </div>
      </div>`;

    previewPanel.style.display = "block";

    document.getElementById("cert-preview-close")
      ?.addEventListener("click", hidePreviewPanel);
    document.getElementById("cert-preview-edit")
      ?.addEventListener("click", (e) => {
        hidePreviewPanel();
        openEditModal(e.currentTarget.dataset.id);
      });
  }

  function hidePreviewPanel() {
    if (previewPanel) previewPanel.style.display = "none";
  }

  // ══════════════════════════════════════════════════════════
  // MODAL — OPEN / CLOSE
  // ══════════════════════════════════════════════════════════

  function openAddModal() {
    editingDocId = null;
    modalTitle.textContent      = "Add Certificate";
    modalSubmitText.textContent = "Save Certificate";
    resetForm();
    openModal(modal);
  }

  function openEditModal(docId) {
    const cert = allCerts.find(c => c.id === docId);
    if (!cert) return;

    editingDocId = docId;
    modalTitle.textContent      = "Edit Certificate";
    modalSubmitText.textContent = "Update Certificate";
    resetForm();

    docIdInput.value  = docId;
    titleInput.value  = cert.title       || "";
    yearInput.value   = cert.year        || "";
    verifyInput.value = cert.verifyLink  || "";

    setSelectValue(issuerInput,   cert.issuer);
    setSelectValue(categoryInput, cert.category);

    if (cert.imageUrl) {
      existingImgNote.style.display   = "block";
      existingImgLink.href            = cert.imageUrl;
      previewImg.src                  = cert.imageUrl;
      uploadPreview.style.display     = "flex";
      uploadPlaceholder.style.display = "none";
    }

    openModal(modal);
  }

  function openDeleteModal(docId, title, imgPath) {
    deleteDocId              = docId;
    deleteImgPath            = imgPath || "";
    deleteCertName.textContent = title;
    openModal(deleteModal);
  }

  function openModal(el) {
    el.style.display = "flex";
    document.body.style.overflow = "hidden";
    setTimeout(() => el.querySelector("input, select, button")?.focus(), 60);
  }

  function closeModal(el) {
    el.style.display = "none";
    document.body.style.overflow = "";
  }

  // ── Public: lets admin.js check if cert modal is open ─────
  function isModalOpen() {
    return modal?.style.display !== "none";
  }

  // ── Public: lets admin.js close modals on Escape ──────────
  function handleEscape() {
    if (modal?.style.display       !== "none") closeModal(modal);
    if (deleteModal?.style.display !== "none") closeModal(deleteModal);
  }

  // ── Public: lets admin.js forward paste events ────────────
  function handlePaste(file) {
    if (modal?.style.display === "none") return;
    handleFileSelect(file);
  }

  // ══════════════════════════════════════════════════════════
  // FORM HELPERS
  // ══════════════════════════════════════════════════════════

  function resetForm() {
    form.reset();
    docIdInput.value                = "";
    selectedFile                    = null;
    uploadPreview.style.display     = "none";
    uploadPlaceholder.style.display = "flex";
    existingImgNote.style.display   = "none";
    existingImgLink.href            = "#";
    progressWrap.style.display      = "none";
    progressFill.style.width        = "0%";
    progressPct.textContent         = "0%";
    hideModalError();
    hidePreviewPanel();
  }

  function showModalError(msg) {
    modalError.textContent   = msg;
    modalError.style.display = "block";
  }

  function hideModalError() {
    modalError.textContent   = "";
    modalError.style.display = "none";
  }

  function getFormData() {
    return {
      title:      titleInput.value.trim(),
      issuer:     issuerInput.value,
      category:   categoryInput.value,
      year:       yearInput.value,
      verifyLink: verifyInput.value.trim()
    };
  }

  function validateForm(data) {
    if (!data.title)    return "Title is required.";
    if (!data.issuer)   return "Please select an issuer.";
    if (!data.category) return "Please select a category.";
    if (!data.year)     return "Please select a year.";
    return null;
  }

  function setSelectValue(selectEl, value) {
    if (!selectEl || !value) return;
    const opt = Array.from(selectEl.options).find(o => o.value === value);
    if (opt) selectEl.value = value;
  }

  // ══════════════════════════════════════════════════════════
  // FIREBASE STORAGE — IMAGE UPLOAD
  // ══════════════════════════════════════════════════════════

  function uploadImage(docId) {
    return new Promise((resolve, reject) => {
      if (!selectedFile) { resolve(null); return; }

      const mimeToExt = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };
      const ext       = (selectedFile.name && selectedFile.name.includes("."))
                          ? selectedFile.name.split(".").pop().toLowerCase()
                          : (mimeToExt[selectedFile.type] || "png");

      const safeName = `cert-${Date.now()}.${ext}`;
      const path     = `certificate-images/${docId}/${safeName}`;
      const ref      = storage.ref(path);
      const task     = ref.put(selectedFile);

      progressWrap.style.display = "block";

      task.on(
        "state_changed",
        (snap) => {
          const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
          progressFill.style.width = pct + "%";
          progressPct.textContent  = pct + "%";
        },
        (err) => { progressWrap.style.display = "none"; reject(err); },
        async () => {
          const imageUrl = await ref.getDownloadURL();
          progressWrap.style.display = "none";
          resolve({ imageUrl, imagePath: path });
        }
      );
    });
  }

  async function deleteImageFromStorage(imagePath) {
    if (!imagePath) return;
    try {
      await storage.ref(imagePath).delete();
    } catch (err) {
      if (err.code !== "storage/object-not-found") {
        console.warn("[Certificates] Storage delete warn:", err.message);
      }
    }
  }

  // ══════════════════════════════════════════════════════════
  // CRUD — CREATE
  // ══════════════════════════════════════════════════════════

  async function createCert(data) {
    const docRef = await db.collection(COLLECTION).add({
      ...data,
      imageUrl:  "",
      imagePath: "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    let imageData = null;
    if (selectedFile) imageData = await uploadImage(docRef.id);

    if (imageData) {
      await docRef.update({
        imageUrl:  imageData.imageUrl,
        imagePath: imageData.imagePath
      });
    }

    return docRef.id;
  }

  // ══════════════════════════════════════════════════════════
  // CRUD — UPDATE
  // ══════════════════════════════════════════════════════════

  async function updateCert(docId, data) {
    const existing = allCerts.find(c => c.id === docId);

    let imageData = null;
    if (selectedFile) {
      imageData = await uploadImage(docId);
      if (existing?.imagePath) await deleteImageFromStorage(existing.imagePath);
    }

    const payload = {
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (imageData) {
      payload.imageUrl  = imageData.imageUrl;
      payload.imagePath = imageData.imagePath;
    }

    await db.collection(COLLECTION).doc(docId).update(payload);
  }

  // ══════════════════════════════════════════════════════════
  // CRUD — DELETE
  // ══════════════════════════════════════════════════════════

  async function deleteCert(docId, imagePath) {
    await deleteImageFromStorage(imagePath);
    await db.collection(COLLECTION).doc(docId).delete();
  }

  // ══════════════════════════════════════════════════════════
  // EVENT BINDING
  // ══════════════════════════════════════════════════════════

  function bindEvents() {

    addBtn?.addEventListener("click", openAddModal);

    modalClose?.addEventListener("click",  () => closeModal(modal));
    modalCancel?.addEventListener("click", () => closeModal(modal));
    modal?.addEventListener("click", e => { if (e.target === modal) closeModal(modal); });

    // NOTE: Escape keydown is handled centrally in admin.js via Certificates.handleEscape()
    // NOTE: Paste is handled centrally in admin.js via Certificates.handlePaste()

    // Image upload
    uploadArea?.addEventListener("click", e => {
      if (removeImgBtn?.contains(e.target)) return;
      imageInput?.click();
    });

    uploadArea?.addEventListener("dragover", e => {
      e.preventDefault();
      uploadArea.classList.add("drag-over");
    });
    uploadArea?.addEventListener("dragleave", () =>
      uploadArea.classList.remove("drag-over")
    );
    uploadArea?.addEventListener("drop", e => {
      e.preventDefault();
      uploadArea.classList.remove("drag-over");
      const file = e.dataTransfer?.files[0];
      if (file) handleFileSelect(file);
    });

    imageInput?.addEventListener("change", e => {
      const file = e.target.files[0];
      if (file) handleFileSelect(file);
    });

    removeImgBtn?.addEventListener("click", e => {
      e.stopPropagation();
      selectedFile                    = null;
      imageInput.value                = "";
      uploadPreview.style.display     = "none";
      uploadPlaceholder.style.display = "flex";
    });

    form?.addEventListener("submit", async e => {
      e.preventDefault();
      hideModalError();

      const data  = getFormData();
      const error = validateForm(data);
      if (error) { showModalError(error); return; }

      const submitBtn = document.getElementById("cert-modal-submit");
      submitBtn.disabled = true;
      modalSubmitText.textContent = editingDocId ? "Updating…" : "Saving…";

      try {
        if (editingDocId) {
          await updateCert(editingDocId, data);
          showToast("✓ Certificate updated successfully", "success");
        } else {
          await createCert(data);
          showToast("✓ Certificate added successfully", "success");
        }
        closeModal(modal);
      } catch (err) {
        console.error("[Certificates] Save error:", err);
        showModalError("Failed to save: " + err.message);
      } finally {
        submitBtn.disabled = false;
        modalSubmitText.textContent = editingDocId
          ? "Update Certificate" : "Save Certificate";
      }
    });

    deleteModalClose?.addEventListener("click", () => closeModal(deleteModal));
    deleteCancel?.addEventListener("click",     () => closeModal(deleteModal));
    deleteModal?.addEventListener("click", e => {
      if (e.target === deleteModal) closeModal(deleteModal);
    });

    deleteConfirmBtn?.addEventListener("click", async () => {
      if (!deleteDocId) return;
      deleteConfirmBtn.disabled  = true;
      deleteBtnText.textContent  = "Deleting…";
      try {
        await deleteCert(deleteDocId, deleteImgPath);
        showToast("✓ Certificate deleted", "success");
        closeModal(deleteModal);
      } catch (err) {
        console.error("[Certificates] Delete error:", err);
        showToast("✗ Delete failed: " + err.message, "error");
      } finally {
        deleteConfirmBtn.disabled = false;
        deleteBtnText.textContent = "Delete";
        deleteDocId   = null;
        deleteImgPath = null;
      }
    });
  }

  // ══════════════════════════════════════════════════════════
  // FILE SELECT HANDLER
  // ══════════════════════════════════════════════════════════

  function handleFileSelect(file) {
    const allowed = ["image/png", "image/jpeg", "image/webp"];
    if (!allowed.includes(file.type)) {
      showToast("✗ Only PNG, JPG or WebP allowed.", "error");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      showToast("✗ Image must be under 3MB.", "error");
      return;
    }

    selectedFile = file;

    const reader = new FileReader();
    reader.onload = e => {
      previewImg.src                  = e.target.result;
      uploadPreview.style.display     = "flex";
      uploadPlaceholder.style.display = "none";
    };
    reader.readAsDataURL(file);
  }

  // ══════════════════════════════════════════════════════════
  // TOAST
  // ══════════════════════════════════════════════════════════

  let toastTimer = null;

  function showToast(message, type = "success") {
    if (!toast) return;
    toast.textContent = message;
    toast.className   = `toast toast--${type} toast--show`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("toast--show"), 3500);
  }

  // ══════════════════════════════════════════════════════════
  // UTILITY
  // ══════════════════════════════════════════════════════════

  function escHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // ── Public API ────────────────────────────────────────────
  return {
    init,
    isModalOpen,
    handleEscape,
    handlePaste,
    unsubscribe: () => { if (unsubscribeFn) { unsubscribeFn(); unsubscribeFn = null; } }
  };

})();
