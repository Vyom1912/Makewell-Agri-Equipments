/* ============================================================
   MAKEWELL AGRI EQUIPMENTS — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Navbar scroll effect & active link ----- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function onScroll() {
    // Sticky shadow
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    // Scroll-to-top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ----- Mobile hamburger menu ----- */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });

  // Close menu when a nav link is clicked
  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
    });
  });

  /* ----- Intersection Observer: fade-in animations ----- */
  const animateEls = document.querySelectorAll(
    '.product-card, .why-card, .region-card, .testi-card, ' +
    '.about-grid, .customize-grid, .contact-grid, .location-grid, ' +
    '.export-features, .step, .highlight-item, .ef-item'
  );

  // Assign fade-in class
  animateEls.forEach((el, i) => {
    el.classList.add('fade-in');
    const delay = Math.min(i % 6, 5);
    if (delay > 0) el.classList.add('delay-' + delay);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animateEls.forEach(el => observer.observe(el));

  /* ----- Contact Form submission ----- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('#name').value.trim();
      const email = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = 'Send Inquiry';
        submitBtn.disabled = false;
        showToast('✅ Your inquiry has been sent! We\'ll respond within 24 hours.');
      }, 1200);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ----- Toast notification ----- */
  function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.background = type === 'error' ? '#c62828' : 'var(--green)';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  /* ----- Create & handle scroll-to-top button ----- */
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.id = 'scrollTopBtn';
  scrollTopBtn.className = 'scroll-top';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  scrollTopBtn.innerHTML = '↑';
  document.body.appendChild(scrollTopBtn);

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ----- Smooth hover effect on tool chips ----- */
  document.querySelectorAll('.tool-chip').forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      chip.style.transform = 'scale(1.05) rotate(-1deg)';
    });
    chip.addEventListener('mouseleave', () => {
      chip.style.transform = '';
    });
  });

  /* ----- Hero stats counter animation ----- */
  function animateCounter(el, target, suffix = '') {
    let current = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 30);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.stat-num');
        nums.forEach(num => {
          const text = num.textContent;
          const match = text.match(/^(\d+)(.*)$/);
          if (match) {
            animateCounter(num, parseInt(match[1]), match[2]);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

});
