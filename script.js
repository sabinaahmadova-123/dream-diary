let currentAIAnalysis = "";
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
          <div class="card-options-wrapper">
          <button class="options-btn">⋮</button>
          <div class="options-menu">
            <button class="edit-opt">Edit</button>
            <button class="delete-opt">Delete</button>
          </div>
        </div>

      <div class="card-top">
          <span class="dream-tag tag-${dream.category.toLowerCase()}">${dream.category}</span>
          </div>
      
      <h3 class="dream-title">${dream.title}</h3>
      <p class="dream-text">${dream.text}</p>
      
      <div class="card-bottom">
          <span class="dream-date">${dream.date}</span>
      </div>
  </div>
    `;
    dreamsWrapper.innerHTML += cardHTML;
  });

  menuEvents();
}

const part1 = "AQ.Ab8RN6InJF6Uaif83K";
const part2 = "PR9KzRCDqwcCPs_Bweo0D43EMuhElqmg";
const API_KEY = part1 + part2;

analyzeBtn.addEventListener('click', () => {
  const dreamText = textarea.value.trim();

  if (!dreamText) {
    alert("Please write your dream first!");
    return;
  }

  analyzeBtn.innerText = "✦ Analyzing...";

  fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a dream interpreter. Analyze the dream in exactly 2-3 sentences. Be concise and specific. Do not use bullet points. Do not ask follow-up questions. Dream: ${dreamText}`
              }
            ]
          }
        ]
      })
    }
  )
    .then(response => response.json())
    .then(data => {
      const analysis = data.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis available.";

      document.querySelector(".ai-result").innerText = analysis;
      
      currentAIAnalysis = analysis;

      // Düyməni əvvəlki halına qaytarırıq
      analyzeBtn.innerText = "✦ Analyze Dream";
    })
    .catch(error => {
      console.error(error);
      alert("Failed to analyze dream.");
      analyzeBtn.innerText = "✦ Analyze Dream";
    });
});


let addBtn = document.querySelector('.add-button');

addBtn.addEventListener('click', () => {
    const dreamText = textarea.value.trim(); 

    if (!dreamText) {
        alert("Please write something to add!");
        return;
    }
  const activeCategoryBtn = document.querySelector('.categories div.active');
  const selectedCategory = activeCategoryBtn ? activeCategoryBtn.innerText : "Lucid";

  const dreamTitle = dreamText.split(" ").slice(0, 4).join(" ") + "...";
  
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const newDream = {
    id: Date.now(),
    category: selectedCategory,
    title: dreamTitle,
    text: dreamText,
    analysis: currentAIAnalysis || "Not analyzed yet.", 
    date: today
  };

  dreams.push(newDream);
  localStorage.setItem('dreams', JSON.stringify(dreams));

  textarea.value = "";
  document.querySelector(".ai-result").innerText = "";
  currentAIAnalysis = ""; 

  renderRecentDreams();
});


function menuEvents() {
  const optionButtons = document.querySelectorAll('.options-btn');

  optionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();

      const currentMenu = button.nextElementSibling;

      document.querySelectorAll('.options-menu').forEach(menu => {
        if (menu !== currentMenu) {
          menu.classList.remove('show');
        }
      });

      if (currentMenu.classList.contains('show')) {
        currentMenu.classList.remove('show');
      } else {
        currentMenu.classList.add('show');
      }
    });
  });
}


document.addEventListener('click', () => {
  document.querySelectorAll('.options-menu').forEach(menu => {
    menu.classList.remove('show');
  });
});

renderRecentDreams();





