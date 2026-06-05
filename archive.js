let dreams = JSON.parse(localStorage.getItem('dreams')) || [];
let archiveWrapper = document.getElementById('archive-wrapper');
let categoryButtons = document.querySelectorAll('.arch-cat');

function renderArchiveDreams(selectedCategory = "All") {
  if (!archiveWrapper) return;

  let filteredDreams = selectedCategory === "All"
    ? dreams
    : dreams.filter(dream => dream.category.toLowerCase() === selectedCategory.toLowerCase());

  if (filteredDreams.length === 0) {
    archiveWrapper.innerHTML = `<p class="no-dreams">No dreams found in this category.</p>`;
    return;
  }

  let newHTML = "";
  [...filteredDreams].reverse().forEach(dream => {
    newHTML += `
      <div class="dream-card" data-id="${dream.id}">
          <div class="card-top">
              <span class="dream-tag tag-${dream.category.toLowerCase()}">${dream.category}</span>
              <div class="card-options-wrapper">
                  <button class="options-btn">⋯</button>
                  <div class="options-menu">
                      <button class="edit-opt">Edit</button>
                      <button class="delete-opt">Delete</button>
                  </div>
              </div>
          </div>
          <h3 class="dream-title">${dream.title || 'Untitled Dream'}</h3>
          <p class="dream-text">${dream.text}</p>
          <div class="card-bottom">
              <span class="dream-date">${dream.date}</span>
          </div>
      </div>
    `;
  });

  archiveWrapper.innerHTML = newHTML;

  document.querySelectorAll('.options-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = btn.nextElementSibling;
      document.querySelectorAll('.options-menu').forEach(m => {
        if (m !== menu) m.classList.remove('show');
      });
      menu.classList.toggle('show');
    });
  });

  document.querySelectorAll('.delete-opt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.dream-card');
      const dreamId = Number(card.dataset.id);
      dreams = dreams.filter(d => d.id !== dreamId);
      localStorage.setItem('dreams', JSON.stringify(dreams));
      const activeCategory = document.querySelector('.arch-cat.active').getAttribute('data-category');
      renderArchiveDreams(activeCategory);
    });
  });

  document.querySelectorAll('.edit-opt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.dream-card');
      const dreamId = Number(card.dataset.id);
      localStorage.setItem('editDreamId', dreamId);
      window.location.href = 'index.html';
    });
  });
}

document.addEventListener('click', () => {
  document.querySelectorAll('.options-menu').forEach(m => m.classList.remove('show'));
});

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const category = button.getAttribute('data-category');
    renderArchiveDreams(category);
  });
});

renderArchiveDreams("All");