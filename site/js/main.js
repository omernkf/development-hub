/**
 * OMER DESIGN — Main application script
 * Navigation, WhatsApp, page transitions, accessibility
 */

import { CONTACT, SITE } from './config.js';

/* ---------- WhatsApp ---------- */
function initWhatsApp() {
  const btn = document.getElementById('whatsapp-btn');
  if (!btn) return;

  const number = CONTACT.whatsapp.number;
  const message = encodeURIComponent(CONTACT.whatsapp.message);
  const url = `https://wa.me/${number}?text=${message}`;

  btn.setAttribute('href', url);
  btn.setAttribute('target', '_blank');
  btn.setAttribute('rel', 'noopener noreferrer');
  btn.setAttribute('aria-label', 'تواصل معنا عبر واتساب');
}

/* ---------- Navigation ---------- */
function initNav() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  const mobile = document.getElementById('nav-mobile');
  const closeBtn = document.getElementById('nav-mobile-close');
  const dropdownTriggers = document.querySelectorAll('[data-dropdown]');

  // Scroll effect
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile drawer
  if (toggle && mobile) {
    const open = () => {
      mobile.classList.add('open');
      mobile.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      mobile.classList.remove('open');
      mobile.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    mobile.addEventListener('click', (e) => {
      if (e.target === mobile) close();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobile.classList.contains('open')) close();
    });
  }

  // Desktop dropdowns
  dropdownTriggers.forEach((trigger) => {
    const menu = trigger.nextElementSibling;
    if (!menu || !menu.classList.contains('nav-dropdown')) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = menu.classList.contains('open');
      // Close others
      document.querySelectorAll('.nav-dropdown.open').forEach((m) => {
        m.classList.remove('open');
        m.previousElementSibling?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        menu.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-dropdown]') && !e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown.open').forEach((m) => {
        m.classList.remove('open');
        m.previousElementSibling?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Mobile expandable groups
  document.querySelectorAll('[data-mobile-group]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      if (sub) {
        sub.classList.toggle('open');
        btn.setAttribute('aria-expanded', sub.classList.contains('open'));
      }
    });
  });

  // Active link highlighting
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-desktop a, .nav-mobile-list a').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    const clean = href.replace(/\/$/, '');
    if (clean === path || (path.endsWith(clean) && clean !== '/')) {
      a.classList.add('active');
    }
  });
}

/* ---------- FAQ Accordion ---------- */
function initAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      if (!item) return;
      const wasOpen = item.classList.contains('open');
      // Optional: close others
      item.parentElement.querySelectorAll('.accordion-item.open').forEach((i) => {
        i.classList.remove('open');
        i.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---------- Page transition (subtle) ---------- */
function initPageTransition() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.2s ease';
    document.body.style.opacity = '1';
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initPageTransition();
  initWhatsApp();
  initNav();
  initAccordion();
});
