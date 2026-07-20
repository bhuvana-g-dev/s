/**
 * main.js — Portfolio interactions + Firestore live sync
 * ─────────────────────────────────────────────────────────────
 * Changes:
 *  - Added loadFromFirestore() which sets up onSnapshot listeners for
 *    "projects" and "certificates" collections.
 *  - When Firestore has data → re-renders those sections live.
 *  - When Firestore collections are empty → keeps static data.js content.
 *  - Contact form saves to Firestore "messages" collection (unchanged).
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── INITIAL RENDER (static data — instant, no flash) ───── */
  renderAll();
  initCertCarousel();

  /* ── FIRESTORE LIVE SYNC ─────────────────────────────────── */
  // Overlays Firestore data on top of static render.
  // If Firestore collections have data, those sections update in real time.
  // Falls back silently to static data.js if Firestore is unreachable.
  loadFromFirestore();

  /* ── NAVBAR SCROLL ──────────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    highlightActiveNav();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── MOBILE MENU ────────────────────────────────────────── */
  const burger   = document.querySelector('.nav-burger');
  const navLinks = document.querySelector('.nav-links');

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('active');
    burger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
    });
  });

  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
    }
  });

  /* ── ACTIVE NAV HIGHLIGHT ───────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }

  /* ── SMOOTH SCROLL ──────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  const revealSelectors = [
    '.skill-card', '.project-card', '.achievement-card',
    '.exp-card', '.contact-card', '.cert-card', '.about-card'
  ];

  function observeRevealTargets() {
    revealSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => revealObserver.observe(el));
    });
  }
  setTimeout(observeRevealTargets, 50);

  /* ── TYPED HERO EFFECT ──────────────────────────────────── */
  const roles   = PORTFOLIO.profile.typedRoles;
  const typedEl = document.querySelector('.hero-typed');
  let roleIdx   = 0;
  let charIdx   = 0;
  let deleting  = false;

  function typeEffect() {
    const current = roles[roleIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeEffect, 1600);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(typeEffect, deleting ? 45 : 85);
  }
  if (typedEl) typeEffect();

  /* ── STAGGER SKILL CARDS ────────────────────────────────── */
  document.querySelectorAll('.skill-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  /* ══════════════════════════════════════════════════════════
     FIRESTORE LIVE SYNC
     Listens to "projects" and "certificates" in real time.
     When the admin adds/edits/deletes anything, the portfolio
     updates automatically without a page reload.
  ══════════════════════════════════════════════════════════ */

  function loadFromFirestore() {
    // Guard: db is the global from firebase.js
    if (typeof db === "undefined" || !db) {
      console.warn("[Portfolio] Firestore not available — using static data.");
      return;
    }

    // ── Projects ────────────────────────────────────────────
    db.collection("projects")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (snapshot) => {
          const firestoreProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          if (firestoreProjects.length > 0) {
            // Re-render projects section with live Firestore data
            renderProjects(firestoreProjects);
            // Re-observe newly rendered cards for scroll reveal
            setTimeout(() => {
              document.querySelectorAll('.project-card').forEach(el => revealObserver.observe(el));
            }, 50);
          }
          // If empty, static data already rendered by renderAll() — no change needed
        },
        (err) => {
          // Silently fall back to static data — don't break the portfolio
          console.warn("[Portfolio] Projects Firestore sync failed:", err.message);
        }
      );

    // ── Certificates ─────────────────────────────────────────
    db.collection("certificates")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (snapshot) => {
          const firestoreCerts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          if (firestoreCerts.length > 0) {
            // Re-render certificates with live Firestore data
            renderCertificates(firestoreCerts);
            // Re-init carousel since DOM changed
            initCertCarousel();
            // Re-observe cert cards
            setTimeout(() => {
              document.querySelectorAll('.cert-card').forEach(el => revealObserver.observe(el));
            }, 50);
          }
        },
        (err) => {
          console.warn("[Portfolio] Certificates Firestore sync failed:", err.message);
        }
      );
  }

  /* ══════════════════════════════════════════════════════════
     CONTACT FORM → FIRESTORE
  ══════════════════════════════════════════════════════════ */

  const form       = document.querySelector('.contact-form');
  const formResult = document.querySelector('.form-result');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const nameVal    = form.querySelector('#contact-name')?.value.trim();
      const emailVal   = form.querySelector('#contact-email')?.value.trim();
      const messageVal = form.querySelector('#contact-message')?.value.trim();

      if (!nameVal || !emailVal || !messageVal) {
        showFormResult('Please fill in all fields.', 'error');
        return;
      }

      const btn = form.querySelector('.form-submit-btn');
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled    = true;
      showFormResult('', '');

      try {
        await db.collection('messages').add({
          name:      nameVal,
          email:     emailVal,
          message:   messageVal,
          read:      false,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        form.reset();
        showFormResult('✓ Message sent! I\'ll get back to you soon.', 'success');

      } catch (err) {
        console.error('[Contact] Firestore save failed:', err.message);
        showFormResult('✗ Something went wrong. Try emailing me directly.', 'error');

      } finally {
        btn.textContent = originalText;
        btn.disabled    = false;
      }
    });
  }

  function showFormResult(message, type) {
    if (!formResult) return;
    formResult.textContent = message;
    formResult.className   = message
      ? `form-result form-result--${type}`
      : 'form-result';
  }

});
