/**
 * domain-search.js
 * Frontend-only domain search demonstration.
 * No live availability checking.
 */

export function initDomainSearch() {
  const searchForm = document.getElementById('domainSearchForm');
  const input = document.getElementById('domainInput');
  const resultContainer = document.getElementById('domainSearchResult');

  if (!searchForm || !input || !resultContainer) return;

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const domain = input.value.trim().toLowerCase();
    if (!domain) {
      showMessage(resultContainer, 'يرجى إدخال النطاق المطلوب.', 'error');
      return;
    }
    // Simple validation: basic domain format
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) {
      showMessage(resultContainer, 'يرجى إدخال نطاق صحيح (مثال: example.com).', 'error');
      return;
    }
    // Frontend-only demonstration - no real lookup
    showMessage(
      resultContainer,
      `هذه واجهة تجريبية للبحث عن النطاق "${domain}". لا يتم التحقق الفعلي من التوفر حالياً. للاستعلام الحقيقي يرجى التواصل معنا.`,
      'info'
    );
  });
}

function showMessage(container, message, type) {
  container.innerHTML = '';
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  container.appendChild(alert);
}

// Auto-init
if (document.getElementById('domainSearchForm')) {
  document.addEventListener('DOMContentLoaded', initDomainSearch);
}