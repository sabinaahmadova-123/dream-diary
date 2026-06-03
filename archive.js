let dreams = JSON.parse(localStorage.getItem('dreams')) || [];

const archiveWrapper = document.getElementById('archive-wrapper');
const archiveCounter = document.getElementById('archive-counter');

function renderAllDreams() {
  if (!archiveWrapper) return;
  archiveWrapper.innerHTML = "";

  if (archiveCounter) {
    archiveCounter.innerText = `${dreams.length} entries in your diary`;
  }

  if (dreams.length === 0) {
    archiveWrapper.innerHTML = `<p class="no-dreams">No archived dreams found.</p>`;
    return;
  }

  let allDreams = [...dreams].reverse();

  allDreams.forEach(dream => {
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
    archiveWrapper.innerHTML += cardHTML;
  });
}

renderAllDreams();
