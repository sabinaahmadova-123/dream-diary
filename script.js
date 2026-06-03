let dreams = JSON.parse(localStorage.getItem('dreams')) || [];
let analyzeBtn = document.querySelector('.analyze');
let textarea = document.querySelector('.textarea-container textarea');
let dreamsWrapper = document.getElementById('dreams-wrapper');
let dreamCounter = document.getElementById('dream-counter');



let categoryButtons = document.querySelectorAll('.categories div');
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

function renderRecentDreams() {
  if (!dreamsWrapper) return;
  dreamsWrapper.innerHTML = "";
  
  let recentDreams = [...dreams].reverse().slice(0, 6);

  if (dreamCounter) {
    dreamCounter.innerText = `${dreams.length} entries in your diary`;
  }

  if (recentDreams.length === 0) {
    dreamsWrapper.innerHTML = `<p class="no-dreams">Your dream diary is empty.</p>`;
    return;
  }

  recentDreams.forEach(dream => {
    const cardHTML = `
      <div class="dream-card">
          <div class="card-top">
              <span class="dream-tag tag-${dream.category.toLowerCase()}">${dream.category}</span>
              <span class="dream-time">${dream.timeAgo}</span>
          </div>

          <h3 class="dream-title">${dream.title}</h3>
          <p class="dream-text">${dream.text}</p>
          <div class="card-bottom">
              <span class="dream-date">${dream.date}</span>
              <a href="#" class="read-more">Read more →</a>
          </div>

      </div>
    `;
    dreamsWrapper.innerHTML += cardHTML;
  });
}

analyzeBtn.addEventListener('click', () => {
  const dreamText = textarea.value.trim();
  if (!dreamText) return alert("Please write something!");

  const activeCategoryBtn = document.querySelector('.categories div.active');
  const selectedCategory = activeCategoryBtn ? activeCategoryBtn.innerText : "Lucid";
  const dreamTitle = dreamText.split(" ").slice(0, 4).join(" ") + "...";
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const newDream = {
    id: Date.now(),
    category: selectedCategory,
    timeAgo: "Just now",
    title: dreamTitle,
    text: dreamText,
    date: today
  };

  dreams.push(newDream);
  localStorage.setItem('dreams', JSON.stringify(dreams));
  textarea.value = "";
  
  renderRecentDreams();
});

renderRecentDreams();