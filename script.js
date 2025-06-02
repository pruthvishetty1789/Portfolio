const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

// Make all sections visible immediately on page load
window.addEventListener('DOMContentLoaded', () => {
  sections.forEach(section => section.classList.add('visible'));
  sections.forEach(section => {
    // Default display block for all except home
    if(section.id === 'home') {
      section.style.display = 'flex';
    } else {
      section.style.display = 'block';
    }
  });
});

// Update nav link active on scroll (only if all sections are visible)
window.addEventListener('scroll', () => {
  let current = '';

  // Only run this if all sections are visible (i.e. home clicked)
  const allVisible = Array.from(sections).every(sec => sec.style.display !== 'none');
  if (!allVisible) return;  // skip updating active link when only one section visible

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Nav link click behavior
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('href').substring(1);

    if (targetId === 'home') {
      // Show all sections
      sections.forEach(section => {
        if(section.id === 'home') {
          section.style.display = 'flex';  // Keep flex layout for home
        } else {
          section.style.display = 'block';
        }
        section.classList.add('visible');
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Show only the clicked section, hide others
      sections.forEach(section => {
        if (section.id === targetId) {
          section.style.display = 'block';
          section.classList.add('visible');
          section.scrollIntoView({ behavior: 'smooth' });
        } else {
          section.style.display = 'none';
          section.classList.remove('visible');
        }
      });
    }

    // Update active nav link
    navLinks.forEach(nav => nav.classList.remove('active'));
    link.classList.add('active');
  });
});

// Contact form alert remains the same
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thanks for reaching out! I will get back to you soon.');
  form.reset();
});
