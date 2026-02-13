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
  const statusText = document.getElementById('theme-status');
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
  const statusText = document.getElementById('theme-status');
  const isDark = document.documentElement.classList.contains('dark-mode');
  toggle.textContent = isDark ? '☀️' : '🌙';
  statusText.textContent = isDark ? 'Dark Mode' : 'Bright Mode';
}

// === Editable sample data: แก้ข้อมูลตัวอย่างตรงนี้ ===
const sampleProjects = [
  {
    title: 'KKU Archery Website Design',
    description: 'การออกแบบเว็บไซต์สำหรับชมรมธนู KKU รวมถึงระบบจัดการข้อมูลนักธนู การจองสนาม และระบบจัดการคะแนน',
    tags: ['UI/UX Design', 'Figma', 'Prototyping'],
    images: [
      'Asset/img/Archery/Mainpage.png',
      'Asset/img/Archery/DashBoard.png',
      'Asset/img/Archery/LoginPage.png',
      'Asset/img/Archery/Profile.png',
      'Asset/img/Archery/Point.png'
    ],
    details: 'โปรเจคนี้เป็นการออกแบบ UX/UI สำหรับเว็บไซต์ชมรมธนูของมหาวิทยาลัยขอนแก่น เน้นการใช้งานที่ง่ายและมีประสิทธิภาพสำหรับนักศึกษาและผู้ดูแลชมรม รวมถึงระบบจัดการข้อมูลที่ครบถ้วน'
  },
  {
    title: 'Nurse Project',
    description: 'เว็บแอปพลิเคชันสำหรับจัดการข้อมูลพยาบาล รวมถึงระบบจัดการตารางงานและข้อมูลผู้ป่วย',
    tags: ['Vue.js', 'Node.js', 'MySQL', 'UI Design'],
    images: [
      'Asset/img/NurseProject/Nurse_Main.png',
      'Asset/img/NurseProject/Nurse_Dashboard.png',
      'Asset/img/NurseProject/Nurse_Credit.png'
    ],
    details: 'ระบบจัดการข้อมูลสำหรับพยาบาล พัฒนาด้วย Vue.js และ Node.js รองรับการจัดการตารางงาน การบันทึกข้อมูลผู้ป่วย และระบบรายงาน มีการออกแบบ UI ที่ใช้งานง่ายและ responsive',
    url: 'https://nurse-project-red.vercel.app/'
  },
  {
    title: 'HoloGraphic3d Earthquake Data',
    description: 'แอปพลิเคชันแสดงข้อมูลแผ่นดินไหวในรูปแบบ 3D Holographic สำหรับการวิเคราะห์และติดตามข้อมูลแผ่นดินไหว',
    tags: ['Flutter', '3D Graphics', 'Data Visualization', 'Mobile App'],
    images: [
      'Asset/img/Holo/Holo1.png'
    ],
    details: 'แอปพลิเคชันมือถือที่แสดงข้อมูลแผ่นดินไหวในรูปแบบ 3D holographic พัฒนาด้วย Flutter ช่วยให้ผู้ใช้สามารถวิเคราะห์และติดตามข้อมูลแผ่นดินไหวได้อย่างมีประสิทธิภาพ'
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
    link.href = '#';
    link.textContent = 'View Details';
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openProjectModal(p);
    });
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
  setupModalEvents(); // Setup modal events
  setupLightboxEvents(); // Setup lightbox events
});

// === Modal Functions ===
function openProjectModal(project) {
  const modal = document.getElementById('project-modal');
  const title = document.getElementById('modal-title');
  const description = document.getElementById('modal-description');
  const imagesContainer = document.getElementById('modal-images');
  const tagsContainer = document.getElementById('modal-tags');
  const actionsContainer = document.getElementById('modal-actions');

  // Set title and description
  title.textContent = project.title;
  description.textContent = project.details || project.description;

  // Add images with click handlers for lightbox
  imagesContainer.innerHTML = '';
  project.images.forEach((imgSrc, index) => {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = project.title;
    img.loading = 'lazy';
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(project.images, index));
    imagesContainer.appendChild(img);
  });

  // Add tags
  tagsContainer.innerHTML = '';
  project.tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  // Add actions (website link if available)
  actionsContainer.innerHTML = '';
  if (project.url) {
    const link = document.createElement('a');
    link.className = 'btn';
    link.href = project.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Visit Website';
    actionsContainer.appendChild(link);
  }

  // Show modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.style.display = 'none';
  document.body.style.overflow = ''; // Restore scroll
}

function setupModalEvents() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');

  // Close on button click
  closeBtn.addEventListener('click', closeProjectModal);

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeProjectModal();
    }
  });
}

// === Lightbox Functions ===
let currentImages = [];
let currentImageIndex = 0;

function openLightbox(images, startIndex) {
  currentImages = images;
  currentImageIndex = startIndex;
  
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  
  lightboxImg.src = images[startIndex];
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // Update navigation buttons visibility
  updateLightboxNavigation();
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

function updateLightboxNavigation() {
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  
  prevBtn.style.display = currentImages.length > 1 ? 'flex' : 'none';
  nextBtn.style.display = currentImages.length > 1 ? 'flex' : 'none';
}

function navigateLightbox(direction) {
  currentImageIndex += direction;
  
  if (currentImageIndex < 0) {
    currentImageIndex = currentImages.length - 1;
  } else if (currentImageIndex >= currentImages.length) {
    currentImageIndex = 0;
  }
  
  const lightboxImg = document.getElementById('lightbox-image');
  lightboxImg.src = currentImages[currentImageIndex];
}

function setupLightboxEvents() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const lightboxImg = document.getElementById('lightbox-image');

  // Close lightbox
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navigation
  prevBtn.addEventListener('click', () => navigateLightbox(-1));
  nextBtn.addEventListener('click', () => navigateLightbox(1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft' && currentImages.length > 1) {
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight' && currentImages.length > 1) {
        navigateLightbox(1);
      }
    }
  });
}
