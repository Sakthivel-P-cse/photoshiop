/* =============================================
   LUMINA PHOTOGRAPHY – JAVASCRIPT
   ============================================= */

// ---------- Navbar scroll effect ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---------- Hamburger menu ----------
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '70px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'rgba(26,22,17,0.98)';
  navLinks.style.padding = '20px 36px';
  navLinks.style.gap = '18px';
});

// ---------- Testimonials Carousel ----------
const track = document.getElementById('testimonials-track');
const cards = track.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('carousel-dots');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;
let autoplayTimer;

// Create dots
cards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function goTo(index) {
  currentIndex = (index + cards.length) % cards.length;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentIndex);
  });
}

function next() { goTo(currentIndex + 1); }
function prev() { goTo(currentIndex - 1); }

nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });

function startAutoplay() {
  autoplayTimer = setInterval(next, 4500);
}
function resetAutoplay() {
  clearInterval(autoplayTimer);
  startAutoplay();
}
startAutoplay();

// Pause autoplay on hover
track.parentElement.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
track.parentElement.addEventListener('mouseleave', startAutoplay);

// ---------- Add to Cart ----------
const toast = document.getElementById('cart-toast');
const toastMsg = document.getElementById('cart-toast-msg');
let toastTimer;

function addToCart(name, price) {
  clearTimeout(toastTimer);
  toastMsg.textContent = `✓  "${name}" added to cart — ₹${price.toLocaleString()}`;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---------- Newsletter ----------
function handleNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  if (email) {
    const btn = e.target.querySelector('button');
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#4caf50';
    btn.style.borderColor = '#4caf50';
    document.getElementById('newsletter-email').value = '';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 3000);
  }
}

// ---------- Intersection Observer – fade in on scroll ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Add fade-up animation style
const style = document.createElement('style');
style.textContent = `
  .fade-up {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Apply to sections
document.querySelectorAll(
  '.section-header, .gallery-item, .pricing-card, .about-content, .about-image, .testimonial-card, .footer-top > *'
).forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  observer.observe(el);
});

// ---------- Smooth active nav link ----------
const sections = document.querySelectorAll('section[id], footer[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--warm)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
