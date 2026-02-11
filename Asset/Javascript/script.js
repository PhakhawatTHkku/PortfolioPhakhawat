/*
  script.js
  - Dark mode toggle with localStorage
  - Contains sample data for projects
  - Renders project cards into #projects-grid
  - Handles mobile nav toggle and smooth scrolling
*/

// === Dark mode theme toggle ===
function setupThemeToggle(){
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Check localStorage for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'dark'){
    html.classList.add('dark-mode');
    updateThemeToggleIcon();
  }
  
  toggle.addEventListener('click', () => {
    html.classList.toggle('dark-mode');
    const isDark = html.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeToggleIcon();
  });
}

function updateThemeToggleIcon(){
  const toggle = document.getElementById('theme-toggle');
  const isDark = document.documentElement.classList.contains('dark-mode');
  toggle.textContent = isDark ? '☀️' : '🌙';
}

// === Editable sample data: แก้ข้อมูลตัวอย่างตรงนี้ ===
const sampleProjects = [
  {
    title: 'เว็บไซต์ Portfolio (This site)',
    description: 'เว็บ Portfolio ที่ทำจาก HTML/CSS/JS พร้อม Dark Mode และ UX interactions',
    tags: ['HTML','CSS','JS','UX'],
    url: '#'
  },
  {
    title: 'Todo App',
    description: 'แอปบริหารงานง่าย ๆ ด้วย LocalStorage, ES6 และ Responsive Design',
    tags: ['JavaScript','LocalStorage'],
    url: '#'
  },
  {
    title: 'API Service (Node)',
    description: 'REST API เบื้องต้นด้วย Node.js + Express พร้อม MongoDB integration',
    tags: ['Node.js','Express'],
    url: '#'
  }
];

// Render project cards into the DOM
function renderProjects(projects){
  const grid = document.getElementById('projects-grid');
  if(!grid) return;
  grid.innerHTML = '';
  projects.forEach((p, idx) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.style.animationDelay = (idx * 0.1) + 's';

    const title = document.createElement('h3');
    title.textContent = p.title;

    const desc = document.createElement('p');
    desc.textContent = p.description;

    const tags = document.createElement('div');
    tags.className = 'project-tags';
    p.tags.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      tags.appendChild(span);
    });

    const actions = document.createElement('div');
    actions.className = 'project-actions';
    const link = document.createElement('a');
    link.className = 'btn';
    link.href = p.url || '#';
    link.textContent = 'View';
    link.target = '_blank';
    actions.appendChild(link);

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(tags);
    card.appendChild(actions);

    grid.appendChild(card);
  });
}

// Mobile nav toggle
function setupNavToggle(){
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const isOpen = nav.style.display === 'flex' || nav.style.display === '';
    nav.style.display = isOpen ? 'none' : 'flex';
  });

  // Close nav when clicking a link (mobile)
  nav.addEventListener('click', (e) => {
    if(e.target.tagName === 'A' && window.innerWidth <= 640){
      nav.style.display = 'none';
    }
  });
}

// Smooth scroll for internal anchors
function setupSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(href === '#' || href === '') return;
      const el = document.querySelector(href);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle(); // Setup dark mode toggle
  renderProjects(sampleProjects); // render sample projects (edit sampleProjects above)
  setupNavToggle();
  setupSmoothScroll();
});
