let dreams = JSON.parse(localStorage.getItem('dreams')) || [];
let archiveWrapper = document.getElementById('archive-wrapper');
let categoryButtons = document.querySelectorAll('.arch-cat');

function renderArchiveDreams(selectedCategory = "All") {
  if (!archiveWrapper) return;
  archiveWrapper.innerHTML = "";

  let filteredDreams = selectedCategory === "All" 
    ? dreams 
    : dreams.filter(dream => dream.category.toLowerCase() === selectedCategory.toLowerCase());

  if (filteredDreams.length === 0) {
    archiveWrapper.innerHTML = `<p class="no-dreams">No dreams found in this category.</p>`;
    return;
  }

  [...filteredDreams].reverse().forEach(dream => {
    const cardHTML = `
      <div class="dream-card" onclick="window.location.href='edit.html?id=${dream.id}'">
          <div class="card-top">
              <span class="dream-tag tag-${dream.category.toLowerCase()}">${dream.category}</span>
          </div>
          <h3 class="dream-title">${dream.title || 'Untitled Dream'}</h3>
          <p class="dream-text">${dream.text}</p>
          <div class="card-bottom">
              <span class="dream-date">${dream.date}</span>
          </div>
      </div>
    `;
    archiveWrapper.innerHTML += cardHTML;
  });
}

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.getAttribute('data-category');
    renderArchiveDreams(category);
  });
});

renderArchiveDreams("All");