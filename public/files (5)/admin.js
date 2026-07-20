/**
 * admin.js — Admin Panel Orchestrator
 * ─────────────────────────────────────────────────────────────
 * Changes:
 *  - Centralized document-level paste listener (was duplicated in projects + certs)
 *  - Centralized document-level keydown Escape listener (was duplicated)
 *  - Calls module unsubscribe() on logout to clean up Firestore listeners
 *  - modulesInited guard prevents double-init on rapid auth state changes
 */

document.addEventListener("DOMContentLoaded", () => {

  // ── Auth state ─────────────────────────────────────────────
  Auth.init();

  // ── Login form ──────────────────────────────────────────────
  const loginForm     = document.getElementById("login-form");
  const emailInput    = document.getElementById("admin-email-input");
  const passwordInput = document.getElementById("admin-password-input");
  const loginBtn      = document.getElementById("login-btn");
  const loginError    = document.getElementById("login-error");

  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email    = emailInput?.value.trim();
    const password = passwordInput?.value;
    if (!email || !password) { showError("Enter your email and password."); return; }
    setLoading(true);
    clearError();
    try {
      await Auth.login(email, password);
    } catch (err) {
      showError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  });

  // ── Logout — unsubscribe all Firestore listeners first ──────
  document.getElementById("logout-btn")?.addEventListener("click", async () => {
    try {
      // Clean up all open Firestore real-time listeners before signing out
      if (typeof Projects     !== "undefined") Projects.unsubscribe();
      if (typeof Certificates !== "undefined") Certificates.unsubscribe();
      if (typeof Messages     !== "undefined") Messages.unsubscribe();

      await Auth.logout();
    } catch (err) {
      console.error("[Admin] Logout error:", err);
    }
  });

  // ── Sidebar navigation ──────────────────────────────────────
  document.querySelectorAll(".dash-nav-item:not(.soon)").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".dash-nav-item").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".dash-section").forEach(s => s.style.display = "none");

      btn.classList.add("active");
      const sec = document.getElementById("section-" + btn.dataset.section);
      if (sec) sec.style.display = "block";
    });
  });

  // ── Init feature modules once user is confirmed logged in ───
  let modulesInited = false;

  firebase.auth().onAuthStateChanged((user) => {
    if (user && !modulesInited) {
      modulesInited = true;
      initModules();
    }
    // Reset flag on logout so modules re-init if user logs back in
    if (!user) {
      modulesInited = false;
    }
  });

  function initModules() {
    if (typeof Projects     !== "undefined") Projects.init();
    if (typeof Certificates !== "undefined") Certificates.init();
    if (typeof Messages     !== "undefined") Messages.init();
    // Phase 3: Skills.init(), Achievements.init()

    // Register centralized global listeners AFTER modules are inited
    registerGlobalListeners();
  }

  // ══════════════════════════════════════════════════════════
  // CENTRALIZED GLOBAL LISTENERS
  // These were previously duplicated in projects.js AND certificates.js.
  // Now registered exactly once here, delegating to the right module.
  // ══════════════════════════════════════════════════════════

  function registerGlobalListeners() {

    // ── Escape key — close whichever modal is open ──────────
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (typeof Projects     !== "undefined") Projects.handleEscape();
      if (typeof Certificates !== "undefined") Certificates.handleEscape();
    });

    // ── Paste (Ctrl+V) — forward image to the open modal ────
    document.addEventListener("paste", (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (!file) break;

          // Only one modal can be open at a time — delegate to whichever is active
          if (typeof Projects !== "undefined" && Projects.isModalOpen()) {
            Projects.handlePaste(file);
          } else if (typeof Certificates !== "undefined" && Certificates.isModalOpen()) {
            Certificates.handlePaste(file);
          }
          break;
        }
      }
    });
  }

  // ── Login helpers ───────────────────────────────────────────
  function setLoading(on) {
    if (!loginBtn) return;
    loginBtn.disabled = on;
    loginBtn.querySelector(".login-btn-text").textContent = on ? "Signing in…" : "Sign In";
  }
  function showError(msg) {
    if (!loginError) return;
    loginError.textContent   = msg;
    loginError.style.display = "block";
    loginError.classList.remove("shake");
    void loginError.offsetWidth;
    loginError.classList.add("shake");
  }
  function clearError() {
    if (!loginError) return;
    loginError.textContent   = "";
    loginError.style.display = "none";
  }
  function getFriendlyError(code) {
    const m = {
      "auth/user-not-found":         "No account found with this email.",
      "auth/wrong-password":         "Incorrect password.",
      "auth/invalid-email":          "Invalid email address.",
      "auth/user-disabled":          "This account has been disabled.",
      "auth/too-many-requests":      "Too many attempts. Try again later.",
      "auth/network-request-failed": "Network error. Check your connection.",
      "auth/invalid-credential":     "Invalid credentials."
    };
    return m[code] || "Login failed. Please try again.";
  }

});
