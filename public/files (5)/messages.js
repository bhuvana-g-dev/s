/**
 * messages.js — Contact Message Management
 * ─────────────────────────────────────────────────────────────
 * Firestore collection : "messages"
 *
 * Changes:
 *  - confirmDelete backdrop listener now uses { once: true } — fixes stacking leak
 *  - unsubscribe() exposed so logout can clean up listener
 */

const Messages = (() => {

  let db;
  const COLLECTION = "messages";

  // ── State ─────────────────────────────────────────────────
  let allMessages  = [];
  let unsubscribeFn = null;
  let activeFilter = "all";

  // ── DOM refs ──────────────────────────────────────────────
  let listEl, emptyEl, toast,
      filterBtns, unreadCountEl,
      detailPanel, detailName, detailEmail,
      detailTime, detailBody, detailMarkBtn,
      detailDeleteBtn, detailCloseBtn;

  // ══════════════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════════════

  function init() {
    db = firebase.firestore();

    listEl        = document.getElementById("msg-list");
    emptyEl       = document.getElementById("msg-empty");
    toast         = document.getElementById("msg-toast");
    unreadCountEl = document.getElementById("msg-unread-count");
    filterBtns    = document.querySelectorAll(".msg-filter-btn");
    detailPanel   = document.getElementById("msg-detail-panel");
    detailName    = document.getElementById("msg-detail-name");
    detailEmail   = document.getElementById("msg-detail-email");
    detailTime    = document.getElementById("msg-detail-time");
    detailBody    = document.getElementById("msg-detail-body");
    detailMarkBtn = document.getElementById("msg-mark-btn");
    detailDeleteBtn = document.getElementById("msg-detail-delete");
    detailCloseBtn  = document.getElementById("msg-detail-close");

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
          allMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          updateUnreadBadge();
          renderList(getFiltered());
        },
        (err) => {
          console.error("[Messages] Firestore error:", err);
          showToast("Could not load messages.", "error");
        }
      );
  }

  // ══════════════════════════════════════════════════════════
  // FILTER
  // ══════════════════════════════════════════════════════════

  function getFiltered() {
    if (activeFilter === "unread") return allMessages.filter(m => !m.read);
    if (activeFilter === "read")   return allMessages.filter(m =>  m.read);
    return allMessages;
  }

  function updateUnreadBadge() {
    const count = allMessages.filter(m => !m.read).length;
    if (!unreadCountEl) return;
    unreadCountEl.textContent   = count;
    unreadCountEl.style.display = count > 0 ? "inline-flex" : "none";
  }

  // ══════════════════════════════════════════════════════════
  // LIST RENDERING
  // ══════════════════════════════════════════════════════════

  function renderList(messages) {
    if (!listEl) return;

    if (messages.length === 0) {
      listEl.innerHTML  = "";
      if (emptyEl) {
        emptyEl.style.display = "flex";
        emptyEl.querySelector(".msg-empty-text").textContent =
          activeFilter === "unread" ? "No unread messages." :
          activeFilter === "read"   ? "No read messages."   :
          "No messages yet. Share your portfolio link!";
      }
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";

    listEl.innerHTML = messages.map(m => {
      const time     = formatTime(m.createdAt);
      const preview  = (m.message || "").slice(0, 80) + ((m.message || "").length > 80 ? "…" : "");
      const isUnread = !m.read;

      return `
        <div class="msg-item ${isUnread ? "msg-item--unread" : ""}" data-id="${m.id}">
          <div class="msg-item-left">
            <div class="msg-avatar">${getInitial(m.name)}</div>
          </div>
          <div class="msg-item-body">
            <div class="msg-item-top">
              <span class="msg-item-name">${escHtml(m.name || "Anonymous")}</span>
              ${isUnread ? `<span class="msg-unread-dot" title="Unread"></span>` : ""}
              <span class="msg-item-time">${time}</span>
            </div>
            <div class="msg-item-email">${escHtml(m.email || "")}</div>
            <div class="msg-item-preview">${escHtml(preview)}</div>
          </div>
          <div class="msg-item-actions">
            <button class="msg-action-btn msg-action-btn--delete"
              data-id="${m.id}" data-name="${escHtml(m.name || "")}"
              title="Delete message" aria-label="Delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </div>
        </div>`;
    }).join("");

    listEl.querySelectorAll(".msg-item").forEach(item => {
      item.addEventListener("click", (e) => {
        if (e.target.closest(".msg-action-btn--delete")) return;
        openDetail(item.dataset.id);
      });
    });

    listEl.querySelectorAll(".msg-action-btn--delete").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        confirmDelete(btn.dataset.id, btn.dataset.name);
      });
    });
  }

  // ══════════════════════════════════════════════════════════
  // DETAIL PANEL
  // ══════════════════════════════════════════════════════════

  function openDetail(docId) {
    const msg = allMessages.find(m => m.id === docId);
    if (!msg || !detailPanel) return;

    detailName.textContent  = msg.name  || "Anonymous";
    detailEmail.textContent = msg.email || "—";
    detailEmail.href        = msg.email ? `mailto:${msg.email}` : "#";
    detailTime.textContent  = formatTimeFull(msg.createdAt);
    detailBody.textContent  = msg.message || "";

    const replyBtn = document.getElementById("msg-reply-btn");
    if (replyBtn && msg.email) {
      replyBtn.href = `mailto:${msg.email}?subject=Re: Your message to bhuvana.dev`;
    }

    detailMarkBtn.dataset.id     = docId;
    detailDeleteBtn.dataset.id   = docId;
    detailDeleteBtn.dataset.name = msg.name || "";
    updateMarkBtn(msg.read);

    document.querySelectorAll(".msg-item").forEach(el =>
      el.classList.toggle("msg-item--active", el.dataset.id === docId)
    );

    detailPanel.style.display = "flex";

    if (!msg.read) {
      setTimeout(() => markRead(docId), 1200);
    }
  }

  function closeDetail() {
    if (detailPanel) detailPanel.style.display = "none";
    document.querySelectorAll(".msg-item").forEach(el =>
      el.classList.remove("msg-item--active")
    );
  }

  function updateMarkBtn(isRead) {
    if (!detailMarkBtn) return;
    detailMarkBtn.textContent  = isRead ? "Mark as Unread" : "Mark as Read";
    detailMarkBtn.dataset.read = isRead ? "true" : "false";
  }

  // ══════════════════════════════════════════════════════════
  // CRUD — MARK READ / UNREAD
  // ══════════════════════════════════════════════════════════

  async function markRead(docId) {
    try {
      await db.collection(COLLECTION).doc(docId).update({ read: true });
    } catch (err) {
      console.error("[Messages] markRead error:", err);
    }
  }

  async function toggleRead(docId, currentlyRead) {
    try {
      await db.collection(COLLECTION).doc(docId).update({ read: !currentlyRead });
      updateMarkBtn(!currentlyRead);
      showToast(currentlyRead ? "Marked as unread" : "Marked as read", "success");
    } catch (err) {
      console.error("[Messages] toggleRead error:", err);
      showToast("Could not update message.", "error");
    }
  }

  // ══════════════════════════════════════════════════════════
  // CRUD — DELETE
  // ══════════════════════════════════════════════════════════

  function confirmDelete(docId, name) {
    const deleteModal = document.getElementById("msg-delete-modal");
    const deleteName  = document.getElementById("msg-delete-name");
    const confirmBtn  = document.getElementById("msg-delete-confirm");
    const cancelBtn   = document.getElementById("msg-delete-cancel");
    const closeBtn    = document.getElementById("msg-delete-modal-close");

    if (!deleteModal) return;
    deleteName.textContent       = name || "this message";
    deleteModal.style.display    = "flex";
    document.body.style.overflow = "hidden";

    // Replace buttons to clear any stale listeners
    const newConfirm = confirmBtn.cloneNode(true);
    const newCancel  = cancelBtn.cloneNode(true);
    const newClose   = closeBtn.cloneNode(true);
    confirmBtn.replaceWith(newConfirm);
    cancelBtn.replaceWith(newCancel);
    closeBtn.replaceWith(newClose);

    function closeDeleteModal() {
      deleteModal.style.display    = "none";
      document.body.style.overflow = "";
    }

    newCancel.addEventListener("click", closeDeleteModal);
    newClose.addEventListener("click",  closeDeleteModal);

    // FIX: { once: true } prevents stacking backdrop listeners on repeat opens
    deleteModal.addEventListener("click", (e) => {
      if (e.target === deleteModal) closeDeleteModal();
    }, { once: true });

    newConfirm.addEventListener("click", async () => {
      newConfirm.disabled        = true;
      newConfirm.textContent     = "Deleting…";
      try {
        await db.collection(COLLECTION).doc(docId).delete();
        showToast("✓ Message deleted", "success");
        closeDeleteModal();
        closeDetail();
      } catch (err) {
        console.error("[Messages] delete error:", err);
        showToast("✗ Delete failed: " + err.message, "error");
        newConfirm.disabled    = false;
        newConfirm.textContent = "Delete";
      }
    });
  }

  // ══════════════════════════════════════════════════════════
  // EVENT BINDING
  // ══════════════════════════════════════════════════════════

  function bindEvents() {
    filterBtns?.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.dataset.filter;
        renderList(getFiltered());
        closeDetail();
      });
    });

    detailCloseBtn?.addEventListener("click", closeDetail);

    detailMarkBtn?.addEventListener("click", () => {
      const docId  = detailMarkBtn.dataset.id;
      const isRead = detailMarkBtn.dataset.read === "true";
      toggleRead(docId, isRead);
    });

    detailDeleteBtn?.addEventListener("click", () => {
      const docId = detailDeleteBtn.dataset.id;
      const name  = detailDeleteBtn.dataset.name;
      confirmDelete(docId, name);
    });
  }

  // ══════════════════════════════════════════════════════════
  // UTILITY
  // ══════════════════════════════════════════════════════════

  function getInitial(name) {
    return (name || "?").trim().charAt(0).toUpperCase();
  }

  function formatTime(timestamp) {
    if (!timestamp) return "—";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now  = new Date();
    const diff = now - date;
    const mins = Math.floor(diff / 60000);
    const hrs  = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1)  return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hrs  < 24) return `${hrs}h ago`;
    if (days < 7)  return `${days}d ago`;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  function formatTimeFull(timestamp) {
    if (!timestamp) return "—";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  }

  function escHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  let toastTimer = null;
  function showToast(message, type = "success") {
    if (!toast) return;
    toast.textContent = message;
    toast.className   = `toast toast--${type} toast--show`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("toast--show"), 3500);
  }

  // ── Public API ────────────────────────────────────────────
  return {
    init,
    unsubscribe: () => { if (unsubscribeFn) { unsubscribeFn(); unsubscribeFn = null; } }
  };

})();
