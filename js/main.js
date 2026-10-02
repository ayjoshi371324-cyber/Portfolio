/**
 * DAVID FRANCO PORTFOLIO — INTERACTIVE SCRIPTS
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initServiceHoverPreview();
  initTelegramCopy();
  initMobileNav();
  initScrollNavSpy();
  initProjectsCarousel();
  initScrollBadge();
});

/* -------------------------------------------------------------
 * 1. Segmented Tabs Switcher (Education / Skills / Work Exp)
 * ----------------------------------------------------------- */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update button states
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panel visibility
      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 2. Floating Hover Image Preview for Services Rows
 * ----------------------------------------------------------- */
function initServiceHoverPreview() {
  const preview = document.getElementById('servicePreview');
  const previewImg = preview ? preview.querySelector('img') : null;
  const serviceRows = document.querySelectorAll('.service-row');

  if (!preview || !previewImg) return;

  serviceRows.forEach(row => {
    const previewSrc = row.getAttribute('data-preview');

    row.addEventListener('mouseenter', (e) => {
      if (previewSrc) {
        previewImg.src = previewSrc;
        preview.classList.add('visible');
        updatePreviewPosition(e);
      }
    });

    row.addEventListener('mousemove', (e) => {
      updatePreviewPosition(e);
    });

    row.addEventListener('mouseleave', () => {
      preview.classList.remove('visible');
    });
  });

  function updatePreviewPosition(e) {
    // Position offset from cursor
    const xOffset = 30;
    const yOffset = -40;
    preview.style.left = `${e.clientX + xOffset}px`;
    preview.style.top = `${e.clientY + yOffset}px`;
  }
}

/* -------------------------------------------------------------
 * 3. Telegram Handle Copy-to-Clipboard & Toast Feedback
 * ----------------------------------------------------------- */
function initTelegramCopy() {
  const copyBox = document.getElementById('telegramCopyBox');
  const toast = document.getElementById('toastNotice');
  let timeoutId = null;

  if (!copyBox) return;

  copyBox.addEventListener('click', () => {
    const handleText = copyBox.getAttribute('data-handle') || 't.me/davidfranco_design';

    navigator.clipboard.writeText(handleText).then(() => {
      showToast('Copied ' + handleText + ' to clipboard! ✓');
    }).catch(() => {
      // Fallback
      showToast('Selected: ' + handleText);
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/* -------------------------------------------------------------
 * 4. Mobile Navigation Drawer Toggle
 * ----------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggle || !navMenu) return;

  toggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* -------------------------------------------------------------
 * 5. Active Nav Spy on Scroll
 * ----------------------------------------------------------- */
function initScrollNavSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 6. Projects Horizontal Carousel Next Action
 * ----------------------------------------------------------- */
function initProjectsCarousel() {
  const nextBtn = document.getElementById('projectNextBtn');
  const grid = document.querySelector('.projects-grid');

  if (!nextBtn || !grid) return;

  nextBtn.addEventListener('click', () => {
    // Smooth pulse animation or scroll
    grid.style.transform = 'translateX(-8px)';
    setTimeout(() => {
      grid.style.transform = 'translateX(0)';
    }, 200);
  });
}

/* -------------------------------------------------------------
 * 7. Rotating Scroll Badge Down Action
 * ----------------------------------------------------------- */
function initScrollBadge() {
  const badge = document.getElementById('scrollBadge');
  if (!badge) return;

  badge.addEventListener('click', () => {
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
