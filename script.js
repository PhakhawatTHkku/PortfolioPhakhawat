/*
  script.js
  - Contains sample data for projects (แก้ไขได้ง่าย)
  - Renders project cards into #projects-grid
  - Handles mobile nav toggle and smooth scrolling
*/

// === Editable sample data: แก้ข้อมูลตัวอย่างตรงนี้ ===
const sampleProjects = [
  {
    title: 'เว็บไซต์ Portfolio (This site)',
    description: 'เว็บ Portfolio แบบเรียบง่าย ใช้ HTML/CSS/JavaScript ไม่มี framework',
    tags: ['HTML','CSS','JS'],
    url: '#'
  },
  {
    title: 'Todo App',
    description: 'แอปบริหารงานง่าย ๆ ด้วย LocalStorage และ ES6',
    tags: ['JavaScript','LocalStorage'],
    url: '#'
  },
  {
    title: 'API Service (Node)',
    description: 'REST API เบื้องต้นด้วย Node.js + Express (ตัวอย่าง)',
    tags: ['Node.js','Express'],
    url: '#'
  }
];

// Render project cards into the DOM
function renderProjects(projects){
  const grid = document.getElementById('projects-grid');
  if(!grid) return;
  grid.innerHTML = '';
  projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card';

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
  renderProjects(sampleProjects); // render sample projects (edit sampleProjects above)
  setupNavToggle();
  setupSmoothScroll();
});
