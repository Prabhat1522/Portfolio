// Home Typing Effect
const roles = [
  "Full Stack Developer",
  "Software Developer",
  "Problem Solver",
  "Open Source Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
  const typingElement = document.getElementById("typing");
  if (!typingElement) return;

  if (!isDeleting) {
    currentText = roles[roleIndex].substring(0, charIndex++);
  } else {
    currentText = roles[roleIndex].substring(0, charIndex--);
  }

  typingElement.textContent = currentText;

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === roles[roleIndex].length) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// Resume download helper (unused, links directly to resume.pdf)
function downloadResume() {
  const byteChars = atob(PDF_B64);
  const byteNums = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) byteNums[i] = byteChars.charCodeAt(i);
  const blob = new Blob([new Uint8Array(byteNums)], {type: 'application/pdf'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'Prabhat_Kumar_Resume.pdf';
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a,button,.skill-tag,.cert-card,.project-card,.stat-card,.cp-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    ring.style.width = '56px';
    ring.style.height = '56px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.width = '36px';
    ring.style.height = '36px';
  });
});

// Mobile Hamburger Menu
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
  document.querySelector('.hamburger').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('navLinks').classList.remove('open');
  document.querySelector('.hamburger').classList.remove('open');
}));

// Scroll Reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Active Nav on Scroll & Scroll Progress Bar
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scroll progress bar
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) progressBar.style.width = scrolled + '%';

  // Active nav
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// Contact Form
function sendMessage() {
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const msg = document.getElementById('contactMsg').value.trim();
  const fb = document.getElementById('form-feedback');

  if (!name || !email || !msg) {
    fb.textContent = 'Please fill in all fields.';
    fb.style.color = 'var(--accent3)';
    fb.style.display = 'block';
    return;
  }

  window.location.href = 'mailto:prabhat844502@gmail.com?subject=Portfolio Contact from ' + encodeURIComponent(name) + '&body=' + encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\n' + msg);
  fb.textContent = 'Opening your mail client...';
  fb.style.color = 'var(--accent)';
  fb.style.display = 'block';
}

// Certificate Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".cert-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    button.classList.add("active");

    let filter = button.getAttribute("data-filter");

    cards.forEach(card => {
      if (filter === "all") {
        card.style.display = "flex";
      } else if (card.classList.contains(filter)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});
// Counter Animation
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;
    const increment = target / 100;

    if (current < target) {
      counter.innerText = `${Math.ceil(current + increment)}`;
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});
