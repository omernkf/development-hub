/**
 * contact.js
 * Contact form validation, URL parameters (project, plan, package).
 */

import { loadPortfolio } from './portfolio-data.js';

export async function initContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Process URL parameters
  await processUrlParams(form);

  // Add submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(form)) {
      showSuccessMessage(form);
      // Reset form after delay (optional)
      // form.reset();
    }
  });

  // Real-time validation
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => validateField(field));
  });
}

async function processUrlParams(form) {
  const params = new URLSearchParams(window.location.search);
  
  // Project parameter
  const projectId = params.get('project');
  if (projectId) {
    try {
      const projects = await loadPortfolio();
      const project = projects.find(p => p.id === projectId);
      if (project) {
        const projectField = document.getElementById('projectContext');
        if (projectField) {
          projectField.textContent = `المشروع المطلوب: ${project.title}`;
          projectField.hidden = false;
        }
        // Set service to "تطوير المواقع" if not already
        const serviceSelect = document.getElementById('service');
        if (serviceSelect && !serviceSelect.value) {
          serviceSelect.value = 'تطوير المواقع';
        }
      }
    } catch (error) {
      console.warn('Could not load portfolio for contact context:', error);
    }
  }

  // Plan parameter
  const plan = params.get('plan');
  if (plan) {
    const planField = document.getElementById('planContext');
    if (planField) {
      planField.textContent = `الباقة المختارة: ${getPlanDisplayName(plan)}`;
      planField.hidden = false;
    }
    // Set hosting plan select if exists
    const planSelect = document.getElementById('hostingPlan');
    if (planSelect) {
      planSelect.value = plan;
    }
  }

  // Package parameter (website packages)
  const packageType = params.get('package');
  if (packageType) {
    const packageField = document.getElementById('packageContext');
    if (packageField) {
      packageField.textContent = `الباقة المختارة: ${getPackageDisplayName(packageType)}`;
      packageField.hidden = false;
    }
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
      serviceSelect.value = 'تطوير المواقع';
    }
  }
}

function getPlanDisplayName(plan) {
  const plans = {
    'basic': 'الباقة الأساسية',
    'business': 'باقة الأعمال',
    'professional': 'الباقة الاحترافية',
    'enterprise': 'باقة المؤسسات'
  };
  return plans[plan] || plan;
}

function getPackageDisplayName(pkg) {
  const packages = {
    'basic-site': 'الموقع الأساسي',
    'business-site': 'موقع الأعمال',
    'cms-site': 'موقع CMS',
    'ecommerce': 'المتجر الإلكتروني',
    'custom': 'التطوير المخصص'
  };
  return packages[pkg] || pkg;
}

function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  return isValid;
}

function validateField(field) {
  const errorEl = document.getElementById(`${field.id}-error`);
  let errorMessage = '';

  if (field.hasAttribute('required') && !field.value.trim()) {
    errorMessage = field.dataset.requiredMessage || 'هذا الحقل مطلوب.';
  } else if (field.type === 'email' && field.value.trim()) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(field.value.trim())) {
      errorMessage = 'يرجى إدخال بريد إلكتروني صحيح.';
    }
  } else if (field.id === 'phone' && field.value.trim()) {
    // Simple phone validation: digits, spaces, +, -, ()
    const phonePattern = /^[0-9+()\-\s]{7,20}$/;
    if (!phonePattern.test(field.value.trim())) {
      errorMessage = 'يرجى إدخال رقم هاتف صحيح.';
    }
  }

  // Set error state
  if (errorMessage) {
    field.classList.add('error');
    field.classList.remove('success');
    if (errorEl) {
      errorEl.textContent = errorMessage;
      errorEl.classList.add('visible');
    }
    return false;
  } else {
    field.classList.remove('error');
    field.classList.add('success');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
    return true;
  }
}

function showSuccessMessage(form) {
  // Replace form with success message or show inline alert
  const existingAlert = document.getElementById('formSuccessAlert');
  if (existingAlert) existingAlert.remove();

  const alert = document.createElement('div');
  alert.id = 'formSuccessAlert';
  alert.className = 'alert alert-success';
  alert.textContent = 'تم استلام طلبك بنجاح. سنتواصل معك قريبا.';
  form.insertBefore(alert, form.firstChild);
  alert.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Auto-init
if (document.getElementById('contactForm')) {
  document.addEventListener('DOMContentLoaded', initContact);
}