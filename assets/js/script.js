
function filterItems(containerSelector, filters) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const cards = container.querySelectorAll('[data-item]');
  cards.forEach(card => {
    let visible = true;
    for (const key in filters) {
      const val = filters[key];
      if (!val || val === 'All' || val === 'all') continue;
      const check = key === 'name' ? (card.dataset['name'] || '') : (card.dataset[key] || '');
      if (!check.toLowerCase().includes(String(val).toLowerCase())) { visible = false; break; }
    }
    card.style.display = visible ? '' : 'none';
  });
}
function initDestinationsFilter() {
  const form = document.getElementById('dest-filter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const popularity = form.querySelector('[name=popularity]').value;
    const category = form.querySelector('[name=category]').value;
    const name = form.querySelector('[name=name]').value.trim();
    filterItems('#dest-list', { popularity, category, name });
  });
}
function initPackagesFilter() {
  const form = document.getElementById('pkg-filter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = form.querySelector('[name=location]').value;
    const category = form.querySelector('[name=category]').value;
    filterItems('#pkg-list', { location, category });
  });
}
function initHotelSearch() {
  const form = document.getElementById('hotel-search-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = form.querySelector('[name=location]').value;
    const price = Number(form.querySelector('[name=price]').value || 0);
    const ppl = Number(form.querySelector('[name=people]').value || 0);
    const container = document.querySelector('#hotel-list');
    if (!container) return;
    container.querySelectorAll('[data-item]').forEach(card => {
      const loc = (card.dataset.location || '').toLowerCase();
      const p = Number(card.dataset.price || 0);
      const cap = Number(card.dataset.people || 0);
      const show = (!location || loc.includes(location.toLowerCase())) && (!price || p <= price) && (!ppl || cap >= ppl);
      card.style.display = show ? '' : 'none';
    });
  });
}
function initClickableCards() {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => window.location.href = el.dataset.href);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initDestinationsFilter();
  initPackagesFilter();
  initHotelSearch();
  initClickableCards();
});
