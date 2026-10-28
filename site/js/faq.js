/**
 * faq.js
 * Accessible accordion for FAQ page.
 */

export function initFaq() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  if (!accordionHeaders.length) return;

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Close all
      accordionHeaders.forEach(h => {
        h.setAttribute('aria-expanded', 'false');
        const c = h.closest('.accordion-item').querySelector('.accordion-content');
        if (c) c.style.maxHeight = null;
      });

      // Open current if it was closed
      if (!isExpanded) {
        header.setAttribute('aria-expanded', 'true');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      }
    });
  });
}

// Auto-init
if (document.querySelector('.accordion')) {
  document.addEventListener('DOMContentLoaded', initFaq);
}