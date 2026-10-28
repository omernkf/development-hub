/**
 * hosting.js
 * Hosting plan selection and order flow.
 */

export function initHosting() {
  const planButtons = document.querySelectorAll('[data-plan-select]');
  if (!planButtons.length) return;

  planButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.planSelect;
      if (plan) {
        window.location.href = `/contact.html?plan=${encodeURIComponent(plan)}`;
      }
    });
  });
}

// Auto-init on hosting page
if (document.querySelector('[data-plan-select]')) {
  document.addEventListener('DOMContentLoaded', initHosting);
}