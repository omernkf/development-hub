/**
 * portfolio.js
 * Renders portfolio grid, filters, featured projects.
 * Loads data from portfolio.json via portfolio-data.js
 */

import { loadPortfolio, getCategories, getCategoryLabel } from './portfolio-data.js';

const state = {
  projects: [],
  activeCategory: 'all',
  featuredOnly: false
};

export async function initPortfolio() {
  const grid = document.getElementById('portfolioGrid');
  const filtersContainer = document.getElementById('portfolioFilters');
  const loadingEl = document.getElementById('portfolioLoading');
  const errorEl = document.getElementById('portfolioError');
  const emptyEl = document.getElementById('portfolioEmpty');

  if (!grid) return; // not on portfolio page

  // Show loading
  if (loadingEl) loadingEl.hidden = false;

  try {
    state.projects = await loadPortfolio();

    // Hide loading
    if (loadingEl) loadingEl.hidden = true;

    if (state.projects.length === 0) {
      showEmptyState(emptyEl, 'معرض أعمالنا في طور النمو. ستظهر المشاريع الجديدة هنا قريبا.');
      return;
    }

    // Render filters
    if (filtersContainer) {
      renderFilters(filtersContainer);
    }

    // Render projects
    renderProjects();
  } catch (error) {
    console.error('Error loading portfolio:', error);
    if (loadingEl) loadingEl.hidden = true;
    if (errorEl) {
      errorEl.hidden = false;
      errorEl.textContent = 'تعذر تحميل معرض الأعمال حاليا.';
    }
  }
}

function renderFilters(container) {
  const categories = getCategories(state.projects);
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn active';
  allBtn.textContent = 'الكل';
  allBtn.dataset.category = 'all';
  allBtn.addEventListener('click', () => setFilter('all'));
  container.appendChild(allBtn);

  categories.forEach(category => {
    const label = getCategoryLabel(state.projects, category);
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.textContent = label;
    btn.dataset.category = category;
    btn.addEventListener('click', () => setFilter(category));
    container.appendChild(btn);
  });
}

function setFilter(category) {
  state.activeCategory = category;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  renderProjects();
}

function renderProjects() {
  const grid = document.getElementById('portfolioGrid');
  const emptyEl = document.getElementById('portfolioEmpty');
  if (!grid) return;

  const filtered = state.projects.filter(project => 
    state.activeCategory === 'all' || project.category === state.activeCategory
  );

  grid.innerHTML = '';

  if (filtered.length === 0) {
    if (emptyEl) {
      emptyEl.hidden = false;
      emptyEl.textContent = 'لا توجد مشاريع في هذه الفئة حاليا.';
    }
    return;
  }

  if (emptyEl) emptyEl.hidden = true;

  filtered.forEach(project => {
    const card = createPortfolioCard(project);
    grid.appendChild(card);
  });
}

function createPortfolioCard(project) {
  const card = document.createElement('article');
  card.className = 'portfolio-card';

  // Image area
  const imageContainer = document.createElement('div');
  imageContainer.className = 'portfolio-image';

  if (project.image && isImageUrlValid(project.image)) {
    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.title;
    img.loading = 'lazy';
    img.onerror = () => {
      imageContainer.innerHTML = '';
      imageContainer.appendChild(createImagePlaceholder(project.title));
    };
    imageContainer.appendChild(img);
  } else {
    imageContainer.appendChild(createImagePlaceholder(project.title));
  }
  card.appendChild(imageContainer);

  // Body
  const body = document.createElement('div');
  body.className = 'portfolio-body';

  const title = document.createElement('h3');
  title.className = 'portfolio-title';
  title.textContent = project.title;

  const category = document.createElement('span');
  category.className = 'portfolio-category';
  category.textContent = project.categoryLabel || project.category;

  const description = document.createElement('p');
  description.className = 'portfolio-description';
  description.textContent = project.description;

  const actions = document.createElement('div');
  actions.className = 'portfolio-actions';

  // Demo button if demoUrl exists
  if (project.demoUrl) {
    const demoBtn = document.createElement('a');
    demoBtn.className = 'btn btn-outline';
    demoBtn.textContent = 'عرض النموذج التجريبي';
    if (project.demoType === 'external') {
      demoBtn.href = project.demoUrl;
      demoBtn.target = '_blank';
      demoBtn.rel = 'noopener noreferrer';
    } else {
      demoBtn.href = project.demoUrl; // internal path
    }
    actions.appendChild(demoBtn);
  }

  // Request similar button
  const requestBtn = document.createElement('a');
  requestBtn.className = 'btn btn-primary';
  requestBtn.textContent = 'اطلب موقعا مشابها';
  requestBtn.href = project.requestUrl || `/contact.html?project=${project.id}`;
  actions.appendChild(requestBtn);

  body.appendChild(title);
  body.appendChild(category);
  body.appendChild(description);
  body.appendChild(actions);
  card.appendChild(body);

  return card;
}

function createImagePlaceholder(projectTitle) {
  const placeholder = document.createElement('div');
  placeholder.className = 'portfolio-image-placeholder';
  placeholder.textContent = projectTitle;
  return placeholder;
}

function isImageUrlValid(url) {
  // Basic check: non-empty string, maybe starts with / or http
  return typeof url === 'string' && url.trim() !== '' && 
         (url.startsWith('/') || url.startsWith('http'));
}

function showEmptyState(element, message) {
  if (element) {
    element.hidden = false;
    element.textContent = message;
  }
}

// Auto-init if on portfolio page
if (document.getElementById('portfolioGrid')) {
  document.addEventListener('DOMContentLoaded', initPortfolio);
}

/**
 * For homepage featured projects: can import and use loadPortfolio directly.
 */
export async function loadFeaturedProjects() {
  const projects = await loadPortfolio();
  return projects.filter(p => p.featured);
}