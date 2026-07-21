/* ============================================================
   MAKEWELL AGRI EQUIPMENTS — Main JavaScript
   Features:
   - Navbar: scroll → transparent-to-white transition + active link
   - Mobile menu: open/close, escape, outside click
   - Reveal animations via IntersectionObserver
   - Hero stats counter animation
   - Process step dots animate to brass on viewport entry
   - Contact form: validation + success state
   - Back to top button
   - Toast notifications
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------
     ELEMENT REFS
  ------------------------------------------------------- */
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const backToTop  = document.getElementById('backToTop');
  const sections   = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  /* -------------------------------------------------------
     NAVBAR: scroll effects + active link highlight
  ------------------------------------------------------- */
  function onScroll() {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle('scrolled', scrolled);

    // Back to top visibility
    if (backToTop) {
      backToTop.classList.toggle('show', window.scrollY > 500);
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 140) {
        current = section.getAttribute('id');
      }
    });
    navLinkEls.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------------------------------------------------------
     MOBILE MENU
  ------------------------------------------------------- */
  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close when a menu link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });

  /* -------------------------------------------------------
     BACK TO TOP
  ------------------------------------------------------- */
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* -------------------------------------------------------
     REVEAL ANIMATION (IntersectionObserver)
  ------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* -------------------------------------------------------
     HERO STATS: counter animation
  ------------------------------------------------------- */
  function animateCounter(el, target, suffix) {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 50));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 28);
  }

  const heroRow = document.querySelector('.hero-ruler-row');
  if (heroRow) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-num[data-target]').forEach(numEl => {
            const target = parseInt(numEl.getAttribute('data-target'), 10);
            const suffix = numEl.getAttribute('data-suffix') || '';
            if (!isNaN(target)) animateCounter(numEl, target, suffix);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statsObserver.observe(heroRow);
  }

  /* -------------------------------------------------------
     PROCESS STEPS: dot turns brass when entering viewport
  ------------------------------------------------------- */
  const processSteps = document.querySelectorAll('.process-step');
  if (processSteps.length) {
    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          stepObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    processSteps.forEach(step => stepObserver.observe(step));
  }

  /* -------------------------------------------------------
     CONTACT FORM: validation + submit
  ------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl    = contactForm.querySelector('#name');
      const emailEl   = contactForm.querySelector('#email');
      const messageEl = contactForm.querySelector('#message');

      const name    = nameEl.value.trim();
      const email   = emailEl.value.trim();
      const message = messageEl.value.trim();

      if (!name) { showToast('Please enter your full name.'); nameEl.focus(); return; }
      if (!email) { showToast('Please enter your email address.'); emailEl.focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address.'); emailEl.focus(); return;
      }
      if (!message) { showToast('Please describe your requirement.'); messageEl.focus(); return; }

      const submitBtn = contactForm.querySelector('[type="submit"]');
      const origHTML  = submitBtn.innerHTML;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      // Simulate submission (replace with real endpoint)
      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = origHTML;
        submitBtn.disabled = false;
        if (formSuccess) {
          formSuccess.style.display = 'flex';
          formSuccess.classList.add('show');
          setTimeout(() => {
            formSuccess.classList.remove('show');
            setTimeout(() => { formSuccess.style.display = ''; }, 400);
          }, 6000);
        }
      }, 1400);
    });
  }

  /* -------------------------------------------------------
     TOAST
  ------------------------------------------------------- */
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  /* -------------------------------------------------------
     SMOOTH SCROLL for anchor links
  ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
