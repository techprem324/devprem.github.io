// ============================================================
// Footer year
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// Mobile nav toggle
// ============================================================
const navBurger = document.getElementById('navBurger');
const navMobile = document.getElementById('navMobile');
navBurger.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  navBurger.setAttribute('aria-expanded', String(isOpen));
});
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navBurger.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Active nav link on scroll (IntersectionObserver)
// ============================================================
const sections = document.querySelectorAll('main .section');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active-link', link.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach(sec => navObserver.observe(sec));

// ============================================================
// Scroll reveal — apply to key blocks, one restrained pattern
// ============================================================
const revealTargets = document.querySelectorAll(
  '.about-card, .skill-card, .project-card, .contact-card, .contact-chip, .section-head'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));

// ============================================================
// Hero terminal — single orchestrated typing sequence
// ============================================================
function typeText(el, text, speed, onDone) {
  el.style.opacity = '1';
  let i = 0;
  const interval = setInterval(() => {
    el.textContent = text.slice(0, i + 1);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (onDone) onDone();
    }
  }, speed);
}

function revealLine(el) {
  el.style.transition = 'opacity 0.2s ease';
  el.style.opacity = '1';
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function runTerminalSequence() {
  const l1 = document.querySelector('.term-line'); // whoami
  const nameOut = document.getElementById('typedName');
  const l2 = document.querySelector('.term-line-2');
  const out2 = document.querySelector('.term-out-2');
  const l3 = document.querySelector('.term-line-3');
  const out3 = document.querySelector('.term-out-3');
  const l4 = document.querySelector('.term-line-4');

  if (prefersReducedMotion) {
    [l1, nameOut, l2, out2, l3, out3, l4].forEach(el => el && (el.style.opacity = '1'));
    nameOut.textContent = 'prem-kumar-srivastava';
    return;
  }

  revealLine(l1);
  setTimeout(() => {
    typeText(nameOut, 'prem-kumar-srivastava', 45, () => {
      setTimeout(() => {
        revealLine(l2);
        setTimeout(() => {
          typeText(out2, 'Software Developer — full-stack web & ML-powered apps', 14, () => {
            setTimeout(() => {
              revealLine(l3);
              setTimeout(() => {
                out3.style.opacity = '1';
                setTimeout(() => revealLine(l4), 200);
              }, 350);
            }, 300);
          });
        }, 250);
      }, 300);
    });
  }, 400);
}

runTerminalSequence();

// ============================================================
// Command palette (Cmd+K / Ctrl+K)
// ============================================================
const cmdkOverlay = document.getElementById('cmdkOverlay');
const cmdkInput = document.getElementById('cmdkInput');
const cmdkList = document.getElementById('cmdkList');
const cmdkTrigger = document.getElementById('cmdkTrigger');
let cmdkItems = Array.from(cmdkList.querySelectorAll('li'));
let activeIndex = 0;

function openCmdk() {
  cmdkOverlay.classList.add('open');
  cmdkInput.value = '';
  filterCmdk('');
  setTimeout(() => cmdkInput.focus(), 20);
}
function closeCmdk() {
  cmdkOverlay.classList.remove('open');
}
function filterCmdk(query) {
  const q = query.trim().toLowerCase();
  cmdkItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(q) ? 'flex' : 'none';
  });
  const visible = cmdkItems.filter(i => i.style.display !== 'none');
  cmdkItems.forEach(i => i.classList.remove('active-item'));
  if (visible.length) {
    activeIndex = 0;
    visible[0].classList.add('active-item');
  }
}
function goToItem(item) {
  if (!item) return;
  const target = item.dataset.target;
  closeCmdk();
  if (item.dataset.external) {
    window.open(target, '_blank', 'noopener');
  } else {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }
}

cmdkTrigger.addEventListener('click', openCmdk);

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    cmdkOverlay.classList.contains('open') ? closeCmdk() : openCmdk();
  }
  if (e.key === 'Escape' && cmdkOverlay.classList.contains('open')) {
    closeCmdk();
  }
  if (cmdkOverlay.classList.contains('open')) {
    const visible = cmdkItems.filter(i => i.style.display !== 'none');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, visible.length - 1);
      visible.forEach(i => i.classList.remove('active-item'));
      visible[activeIndex] && visible[activeIndex].classList.add('active-item');
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      visible.forEach(i => i.classList.remove('active-item'));
      visible[activeIndex] && visible[activeIndex].classList.add('active-item');
    }
    if (e.key === 'Enter') {
      const visible2 = cmdkItems.filter(i => i.style.display !== 'none');
      goToItem(visible2[activeIndex]);
    }
  }
});

cmdkOverlay.addEventListener('click', (e) => {
  if (e.target === cmdkOverlay) closeCmdk();
});

cmdkInput.addEventListener('input', (e) => filterCmdk(e.target.value));

cmdkItems.forEach(item => {
  item.addEventListener('click', () => goToItem(item));
  item.addEventListener('mouseenter', () => {
    cmdkItems.forEach(i => i.classList.remove('active-item'));
    item.classList.add('active-item');
  });
});

// ============================================================
// Contact form — Formspree AJAX submit (no page reload)
// ============================================================
const contactForm = document.getElementById('contactForm');
const cfStatus = document.getElementById('cf-status');
const cfSubmit = document.getElementById('cf-submit');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const action = contactForm.getAttribute('action');

  if (action.includes('YOUR_FORM_ID')) {
    cfStatus.textContent = 'Contact form endpoint not yet configured — email kumar02premsri@gmail.com directly for now.';
    cfStatus.className = 'form-status error';
    return;
  }

  cfSubmit.disabled = true;
  cfSubmit.textContent = 'Sending...';
  cfStatus.textContent = '';
  cfStatus.className = 'form-status';

  try {
    const formData = new FormData(contactForm);
    const res = await fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      cfStatus.textContent = "Message sent — I'll get back to you soon.";
      cfStatus.className = 'form-status success';
      contactForm.reset();
    } else {
      throw new Error('Request failed');
    }
  } catch (err) {
    cfStatus.textContent = 'Something went wrong. Please email kumar02premsri@gmail.com directly.';
    cfStatus.className = 'form-status error';
  } finally {
    cfSubmit.disabled = false;
    cfSubmit.textContent = 'Send message';
  }
});
