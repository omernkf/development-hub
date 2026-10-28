/**
 * pricing.js
 * Handles website package selection and contextual navigation.
 */

export function initPricing() {
  const packageButtons = document.querySelectorAll('[data-package-select]');
  if (!packageButtons.length) return;

  packageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const packageType = btn.dataset.packageSelect;
      if (packageType) {
        // Redirect to contact with package parameter
        window.location.href = `/contact.html?package=${encodeURIComponent(packageType)}`;
      }
    });
  });
}

// Auto-init on pricing page
if (document.querySelector('[data-package-select]')) {
  document.addEventListener('DOMContentLoaded', initPricing);
}