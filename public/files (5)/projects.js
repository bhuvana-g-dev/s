/**
 * projects.js — Full CRUD for Projects
 * ─────────────────────────────────────────────────────────────
 * Firestore collection : "projects"
 * Firebase Storage     : "project-images/{docId}/{filename}"
 *
 * Changes:
 *  - paste + keydown(Escape) listeners moved to admin.js (centralized)
 *  - isModalOpen() exposed on public API for admin.js to check
 *  - unsubscribe() exposed so auth.js logout can clean up listener
 */

const Projects = (() => {

  let db, storage;
  const COLLECTION = "projects";

  // ── State ─────────────────────────────────────────────────
  let allProjects   = [];
  let editingDocId  = null;
  let selectedFile  = null;
  let unsubscribeFn = null;
  let deleteDocId   = null;
  let deleteImgPath = null;

  // ── DOM refs ──────────────────────────────────────────────
  let tbody, addBtn, modal, modalTitle, modalSubmitText,
      form, docIdInput, titleInput, descInput, techInput,
      githubInput, liveInput, imageInput, uploadArea,
      uploadPlaceholder, uploadPreview, previewImg,
      removeImgBtn, existingImgNote, existingImgLink,
      progressWrap, progressFill, progressPct,
      modalError, modalClose, modalCancel,
      deleteModal, deleteProjectName, deleteConfirmBtn,
      deleteBtnText, deleteModalClose, deleteCancel,
      toast;

  // ══════════════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════════════

  function init() {
    db      = firebase.firestore();
    storage = firebase.storage();

    tbody             = document.getElementById("projects-tbody");
    addBtn            = document.getElementById("add-project-btn");
    modal             = document.getElementById("project-modal");
    modalTitle        = document.getElementById("modal-title");
    modalSubmitText   = document.getElementById("modal-submit-text");
    form              = document.getElementById("project-form");
    docIdInput        = document.getElementById("project-doc-id");
    titleInput        = document.getElementById("proj-title");
    descInput         = document.getElementById("proj-desc");
    techInput         = document.getElementById("proj-tech");
    githubInput       = document.getElementById("proj-github");
    liveInput         = document.getElementById("proj-live");
    imageInput        = document.getElementById("project-image-input");
    uploadArea        = document.getElementById("upload-area");
    uploadPlaceholder = document.getElementById("upload-placeholder");
    uploadPreview     = document.getElementById("upload-preview");
    previewImg        = document.getElementById("preview-img");
    removeImgBtn      = document.getElementById("remove-img-btn");
    existingImgNote   = document.getElementById("existing-img-note");
    existingImgLink   = document.getElementById("existing-img-link");
    progressWrap      = document.getElementById("upload-progress-wrap");
    progressFill      = document.getElementById("upload-progress-fill");
    progressPct       = document.getElementById("upload-pct");
    modalError        = document.getElementById("modal-error");
    modalClose        = document.getElementById("modal-close");
    modalCancel       = document.getElementById("modal-cancel");
    deleteModal       = document.getElementById("delete-modal");
    deleteProjectName = document.getElementById("delete-project-name");
    deleteConfirmBtn  = document.getElementById("delete-confirm");
    deleteBtnText     = document.getElementById("delete-btn-text");
    deleteModalClose  = document.getElementById("delete-modal-close");
    deleteCancel      = document.getElementById("delete-cancel");
    toast             = document.getElementById("projects-toast");

    bindEvents();
    startRealtimeListener();
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
          allProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          renderTable(allProjects);
        },
        (err) => {
          console.error("[Projects] Firestore listener error:", err);
          showTableError("Could not load projects. Check Firestore rules.");
        }
      );
  }

  // ══════════════════════════════════════════════════════════
  // TABLE RENDERING
  // ══════════════════════════════════════════════════════════

  function renderTable(projects) {
    if (!tbody) return;

    if (projects.length === 0) {
      tbody.innerHTML = `
        <tr class="table-empty-row">
          <td colspan="5">
            <div class="table-empty">
              <span>No projects yet.</span>
              <button class="btn-link" id="empty-add-btn">Add your first project →</button>
            </div>
          </td>
        </tr>`;
      document.getElementById("empty-add-btn")?.addEventListener("click", openAddModal);
      return;
    }

    tbody.innerHTML = projects.map(p => `
      <tr class="project-row" data-id="${p.id}">
        <td class="col-img">
          ${p.imageUrl
            ? `<img src="${p.imageUrl}" alt="${escHtml(p.title)}" class="table-thumb" loading="lazy" />`
            : `<div class="table-thumb-placeholder">—</div>`}
        </td>
        <td class="col-title">
          <span class="proj-title-cell">${escHtml(p.title)}</span>
          <span class="proj-desc-cell">${escHtml((p.description || "").slice(0, 72))}${(p.description || "").length > 72 ? "…" : ""}</span>
        </td>
        <td class="col-tech">
          <div class="tech-tags">
            ${(p.tech || []).map(t => `<span class="tech-chip">${escHtml(t)}</span>`).join("")}
          </div>
        </td>
        <td class="col-links">
          <div class="link-btns">
            ${p.liveUrl   ? `<a href="${p.liveUrl}"   target="_blank" rel="noopener" class="link-btn link-btn--live">↗ Live</a>`  : ""}
            ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener" class="link-btn link-btn--github">⬡ Code</a>` : ""}
          </div>
        </td>
        <td class="col-actions">
          <div class="action-btns">
            <button class="action-btn action-btn--edit" data-id="${p.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button class="action-btn action-btn--delete" data-id="${p.id}" data-title="${escHtml(p.title)}" data-imgpath="${escHtml(p.imagePath || "")}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              Delete
            </button>
          </div>
        </td>
      </tr>
    `).join("");

    tbody.querySelectorAll(".action-btn--edit").forEach(btn => {
      btn.addEventListener("click", () => openEditModal(btn.dataset.id));
    });
    tbody.querySelectorAll(".action-btn--delete").forEach(btn => {
      btn.addEventListener("click", () =>
        openDeleteModal(btn.dataset.id, btn.dataset.title, btn.dataset.imgpath)
      );
    });
  }

  function showTableError(msg) {
    if (!tbody) return;
    tbody.innerHTML = `<tr><td colspan="5"><div class="table-error">${escHtml(msg)}</div></td></tr>`;
  }

  // ══════════════════════════════════════════════════════════
  // MODAL — OPEN / CLOSE
  // ══════════════════════════════════════════════════════════

  function openAddModal() {
    editingDocId = null;
    modalTitle.textContent      = "Add Project";
    modalSubmitText.textContent = "Save Project";
    resetForm();
    openModal(modal);
  }

  function openEditModal(docId) {
    const project = allProjects.find(p => p.id === docId);
    if (!project) return;

    editingDocId = docId;
    modalTitle.textContent      = "Edit Project";
    modalSubmitText.textContent = "Update Project";
    resetForm();

    docIdInput.value  = docId;
    titleInput.value  = project.title       || "";
    descInput.value   = project.description || "";
    techInput.value   = (project.tech || []).join(", ");
    githubInput.value = project.githubUrl   || "";
    liveInput.value   = project.liveUrl     || "";

    if (project.imageUrl) {
      existingImgNote.style.display = "block";
      existingImgLink.href          = project.imageUrl;
    }

    openModal(modal);
  }

  function openDeleteModal(docId, title, imgPath) {
    deleteDocId   = docId;
    deleteImgPath = imgPath || "";
    deleteProjectName.textContent = title;
    openModal(deleteModal);
  }

  function openModal(el) {
    el.style.display = "flex";
    document.body.style.overflow = "hidden";
    setTimeout(() => el.querySelector("input, button, textarea")?.focus(), 60);
  }

  function closeModal(el) {
    el.style.display = "none";
    document.body.style.overflow = "";
  }

  // ── Public: lets admin.js check if project modal is open ──
  function isModalOpen() {
    return modal?.style.display !== "none";
  }

  // ── Public: lets admin.js close modal on Escape ───────────
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
      title:       titleInput.value.trim(),
      description: descInput.value.trim(),
      tech:        techInput.value.split(",").map(t => t.trim()).filter(Boolean),
      githubUrl:   githubInput.value.trim(),
      liveUrl:     liveInput.value.trim()
    };
  }

  function validateForm(data) {
    if (!data.title)       return "Title is required.";
    if (!data.description) return "Description is required.";
    if (!data.tech.length) return "At least one technology is required.";
    return null;
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

      const safeName = `project-${Date.now()}.${ext}`;
      const path     = `project-images/${docId}/${safeName}`;
      const ref      = storage.ref(path);
      const task     = ref.put(selectedFile);

      progressWrap.style.display = "block";

      task.on(
        "state_changed",
        (snapshot) => {
          const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          progressFill.style.width = pct + "%";
          progressPct.textContent  = pct + "%";
        },
        (err) => {
          progressWrap.style.display = "none";
          reject(err);
        },
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
      console.log("[Projects] Storage image deleted:", imagePath);
    } catch (err) {
      if (err.code !== "storage/object-not-found") {
        console.warn("[Projects] Could not delete storage image:", err.message);
      }
    }
  }

  // ══════════════════════════════════════════════════════════
  // CRUD — CREATE
  // ══════════════════════════════════════════════════════════

  async function createProject(data) {
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

  async function updateProject(docId, data) {
    const existing = allProjects.find(p => p.id === docId);

    let imageData = null;
    if (selectedFile) {
      imageData = await uploadImage(docId);
      if (existing?.imagePath) await deleteImageFromStorage(existing.imagePath);
    }

    const updatePayload = {
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (imageData) {
      updatePayload.imageUrl  = imageData.imageUrl;
      updatePayload.imagePath = imageData.imagePath;
    }

    await db.collection(COLLECTION).doc(docId).update(updatePayload);
  }

  // ══════════════════════════════════════════════════════════
  // CRUD — DELETE
  // ══════════════════════════════════════════════════════════

  async function deleteProject(docId, imagePath) {
    await deleteImageFromStorage(imagePath);
    await db.collection(COLLECTION).doc(docId).delete();
  }

  // ══════════════════════════════════════════════════════════
  // EVENT BINDING
  // ══════════════════════════════════════════════════════════

  function bindEvents() {

    // Open add modal
    addBtn?.addEventListener("click", openAddModal);

    // Close modal buttons
    modalClose?.addEventListener("click",  () => closeModal(modal));
    modalCancel?.addEventListener("click", () => closeModal(modal));
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });

    // NOTE: Escape keydown is handled centrally in admin.js via Projects.handleEscape()
    // NOTE: Paste is handled centrally in admin.js via Projects.handlePaste()

    // Click upload area
    uploadArea?.addEventListener("click", (e) => {
      if (e.target === removeImgBtn || removeImgBtn?.contains(e.target)) return;
      imageInput?.click();
    });

    // Drag over
    uploadArea?.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadArea.classList.add("drag-over");
    });
    uploadArea?.addEventListener("dragleave", () => {
      uploadArea.classList.remove("drag-over");
    });

    // Drop
    uploadArea?.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadArea.classList.remove("drag-over");
      const file = e.dataTransfer?.files[0];
      if (file) handleFileSelect(file);
    });

    // File input — registered once
    imageInput?.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) handleFileSelect(file);
    });

    // Remove image
    removeImgBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      selectedFile                    = null;
      imageInput.value                = "";
      uploadPreview.style.display     = "none";
      uploadPlaceholder.style.display = "flex";
    });

    // Form submit
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
      hideModalError();

      const data  = getFormData();
      const error = validateForm(data);
      if (error) { showModalError(error); return; }

      const submitBtn = document.getElementById("modal-submit");
      submitBtn.disabled = true;
      modalSubmitText.textContent = editingDocId ? "Updating…" : "Saving…";

      try {
        if (editingDocId) {
          await updateProject(editingDocId, data);
          showToast("✓ Project updated successfully", "success");
        } else {
          await createProject(data);
          showToast("✓ Project added successfully", "success");
        }
        closeModal(modal);
      } catch (err) {
        console.error("[Projects] Save error:", err);
        showModalError("Failed to save: " + err.message);
      } finally {
        submitBtn.disabled = false;
        modalSubmitText.textContent = editingDocId ? "Update Project" : "Save Project";
      }
    });

    // Delete modal
    deleteModalClose?.addEventListener("click", () => closeModal(deleteModal));
    deleteCancel?.addEventListener("click",     () => closeModal(deleteModal));
    deleteModal?.addEventListener("click", (e) => {
      if (e.target === deleteModal) closeModal(deleteModal);
    });

    deleteConfirmBtn?.addEventListener("click", async () => {
      if (!deleteDocId) return;
      deleteConfirmBtn.disabled = true;
      deleteBtnText.textContent = "Deleting…";
      try {
        await deleteProject(deleteDocId, deleteImgPath);
        showToast("✓ Project deleted", "success");
        closeModal(deleteModal);
      } catch (err) {
        console.error("[Projects] Delete error:", err);
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
  // FILE SELECT + PREVIEW
  // ══════════════════════════════════════════════════════════

  function handleFileSelect(file) {
    const allowed = ["image/png", "image/jpeg", "image/webp"];
    if (!allowed.includes(file.type)) {
      showToast("✗ Only PNG, JPG, or WebP images are allowed.", "error");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast("✗ Image must be under 2MB.", "error");
      return;
    }

    selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
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
