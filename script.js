/**
 * ============================================
 * Yashar's Hostel - Premium Website JavaScript
 * Version: 2.0
 * ============================================
 * Table of Contents:
 * 1. Data Loading & Initialization
 * 2. Preloader
 * 3. Navigation (Desktop & Mobile)
 * 4. Smooth Scrolling & Active Section
 * 5. Scroll Animations (Intersection Observer)
 * 6. Hero Counter Animation
 * 7. Room Cards Dynamic Rendering
 * 8. Gallery Rendering & Filtering
 * 9. Testimonials Slider
 * 10. Food Menu Day Tabs
 * 11. Landmarks Rendering
 * 12. Booking Form Handling & Validation
 * 13. File Upload Preview
 * 14. Lightbox
 * 15. Back to Top Button
 * 16. Toast Notifications
 * 17. Utility Functions
 * ============================================
 */

/* ============================================
   1. DATA LOADING & INITIALIZATION
   ============================================ */

// Global data store
let siteData = null;

/**
 * Load site data from data.json
 * Falls back to embedded data if fetch fails
 */
async function loadSiteData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Failed to load data.json');
    siteData = await response.json();
  } catch (error) {
    console.warn('Could not load data.json, using embedded data:', error);
    siteData = getEmbeddedData();
  }
  // Initialize all components once data is ready
  initializeWebsite();
}

/**
 * Embedded fallback data (mirrors data.json structure)
 */
function getEmbeddedData() {
  return {
    hostel: {
      name: "Yashraj Hostel",
      tagline: "Comfortable Living for Students",
      phone: "+91 8605463560",
      whatsapp: "918605463560"
    },
    rooms: [
      { id: 1, type: "Double Occupancy", capacity: "2 Person", price: "₹4,200/month", features: ["Study Desk", "Wi-Fi", "bed"], available: true, badge: "Premium" },
      { id: 2, type: "triple-Sharing Room", capacity: "3 Persons", price: "₹4,200/month", features: ["Study Desk", "Wi-Fi", "bed"], available: true, badge: "Popular" },
      { id: 3, type: "tetra-Sharing Room", capacity: "4 Persons", price: "₹4,200/month", features: ["Study desk", "Wi-fi", "bed"], available: true, badge: "Value" },
      { id: 4, type: "hexa-Sharing room", capacity: "6 Persons", price: "₹4,200/month", features: ["Study desk", "Wi-Fi", "bed"], available: false, badge: "Budget" },
      { id: 5, type: "oct-Sharing room", capacity: "8 Person", price: "₹4,200/month", features: ["study table ", "Wi-Fi", "bed"], available: true, badge: "Luxury" },
      { id: 6, type: "best friend Sharing Deluxe", capacity: "8 Persons", price: "₹4,200/month", features: ["Study Desk", "Wi-Fi", "bed"], available: true, badge: "Best Seller" }
    ],
    gallery: [
      { id: 1, src: "gallery-1.jpg", alt: "Hostel Front View", category: "exterior" },
      { id: 2, src: "gallery-2.jpg", alt: "Common Room", category: "common" },
      { id: 3, src: "gallery-3.jpg", alt: "Study Area", category: "common" },
      { id: 4, src: "gallery-4.jpg", alt: "Bedroom Interior", category: "rooms" },
      { id: 5, src: "gallery-5.jpg", alt: "Dining Hall", category: "dining" },
      { id: 6, src: "gallery-6.jpg", alt: "Bathroom Facilities", category: "rooms" },
      { id: 7, src: "gallery-7.jpg", alt: "Terrace Garden", category: "exterior" },
      { id: 8, src: "gallery-8.jpg", alt: "Recreation Area", category: "common" }
    ],
    testimonials: [
      { name: "TANUSH KADAM", course: "B.Pharm, DKCOP", text: "Yashraj Hostel is the best place I've stayed during my college years. The food is amazing and the rooms are always clean!", rating: 5 },
      { name: "Shubham Bhise", course: "B.pharm, DKCOP", text: "I love the study environment here. The WiFi is fast and the study room is perfect for late-night preparation.", rating: 5 },
      { name: "Mayank Shinde", course: "Computer science engineering, DGIT", text: "Affordable and comfortable. The staff is very friendly and the food quality is consistently good.", rating: 4 },
      { name: "Prasad Pawar", course: "BCA, 2nd Year", text: "The security and cleanliness standards here are top-notch. My parents feel safe knowing I'm at Yashraj hostel.", rating: 5 }
    ],
    foodMenu: {
      monday: {
      
        lunch: { items: ["Dal ", "Rice", "Roti", "Sabzi", ], type: "veg", time: "12:00 PM - 2:00 PM" },
        dinner: { items: ["shevga (drumstick", "Rice", "Roti", "Sweet"], type: "veg", time: "8:00 PM - 9:00 PM" }
      },
      tuesday: {
        
        lunch: { items: ["harbara curry", "Rice", "Roti", "Aloo-fry"], type: "veg", time: "12:00 PM - 2:00 PM" },
        dinner: { items: ["chicken Curry", "Rice", "Roti", "Paneer Sabzi"], type: "mixed", time: "8:00 PM - 9:00 PM" }
      },
      wednesday: {
        
        lunch: { items: ["vatana curry", "Rice", "bendi"], type: "veg", time: "12:00 PM - 2:00 PM" },
        dinner: { items: ["spicy gava kadchi daal", "Rice", "Roti", "Sabzi"], type: "veg", time: "8:00 PM - 9:00 PM" }
      },
      thursday: {
        
        lunch: { items: ["Sambar", "Rice", "Roti", "Dry Sabzi"], type: "veg", time: "12:00 PM - 2:00 PM" },
        dinner: { items: ["Mugg Curry", "Rice", "Roti",], type: "veg", time: "8:00 PM - 9:00 PM" }
      },
      friday: {
        
        lunch: { items: ["spicy daal", "Rice", "dry sabji"], type: "veg", time: "12:00 PM - 2:00 PM" },
        dinner: { items: ["Chicken curry", "roti", "rice", "panner curry"], type: "mixed", time: "8:00 PM - 9:00 PM" }
      },
      saturday: {
        
        lunch: { items: ["harbara, "Rice", "Roti"], type: "veg", time: "12:00 PM - 2:00 PM" },
        dinner: { items: ["hulgaa soap", "Roti", "rice"], type: "veg", time: "8:00 PM - 9:00 PM" }
      },
      sunday: {
        
        lunch: { items: ["besan ", "Rice", "dry Sabzi", "Dal"], type: "veg", time: "12:30 PM - 2:30 PM" },
        dinner: { items: ["misal pav", "veg polav", "raita",], type: "veg", time: "7:30 PM - 9:30 PM" }
      }
    },
    landmarks: [
      { name: "Datta kala college", distance: "500m", icon: "🎓" },
      { name: "Central Bus Station", distance: "3 km", icon: "🚌" },
      { name: "Railway Station", distance: "8 km", icon: "🚂" },
      { name: "bhigwan Hospital", distance: "3 km", icon: "🏥" },
      { name: "Shopping Area", distance: "3 km", icon: "🛒" },
      { name: "college Library", distance: "500m", icon: "📚" },
      { name: "Sports Complex", distance: "1 km", icon: "🏟️" },

    ]
  };
}

/**
 * Main initialization function
 * Called after site data is loaded
 */
function initializeWebsite() {
  // Render dynamic content
  renderRoomCards();
  renderGallery();
  renderTestimonials();
  renderFoodMenu('monday');
  renderLandmarks();

  // Setup interactions
  setupNavigation();
  setupSmoothScrolling();
  setupScrollAnimations();
  setupHeroCounters();
  setupGalleryFilters();
  setupTestimonialsSlider();
  setupDayTabs();
  setupBookingForm();
  setupFileUpload();
  setupLightbox();
  setupBackToTop();
  setupFooterYear();
  setupFormDateMin();
  setupMessageCharCount();

  // Handle preloader
  hidePreloader();
}

// Start loading when DOM is ready
document.addEventListener('DOMContentLoaded', loadSiteData);


/* ============================================
   2. PRELOADER
   ============================================ */

/**
 * Hide the preloader with a smooth transition
 */
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Wait for a minimum display time plus load time
  const minDisplayTime = 1800;
  const startTime = performance.now();

  function attemptHide() {
    const elapsed = performance.now() - startTime;
    if (elapsed < minDisplayTime) {
      setTimeout(attemptHide, minDisplayTime - elapsed);
      return;
    }
    preloader.classList.add('hidden');
    // Remove from DOM after transition
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  }

  // If the page is already loaded, hide after min time
  if (document.readyState === 'complete') {
    attemptHide();
  } else {
    window.addEventListener('load', attemptHide);
  }
}


/* ============================================
   3. NAVIGATION (Desktop & Mobile)
   ============================================ */

/**
 * Setup all navigation-related event listeners
 */
function setupNavigation() {
  const navbar = document.getElementById('navbar');
  const navbarToggle = document.getElementById('navbarToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // --- Sticky navbar on scroll ---
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Add/remove scrolled class for glass effect
    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  // --- Mobile menu toggle ---
  if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
      toggleMobileNav(true);
    });
  }

  // --- Close mobile menu ---
  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', () => {
      toggleMobileNav(false);
    });
  }

  // --- Close on overlay click ---
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', () => {
      toggleMobileNav(false);
    });
  }

  // --- Close on mobile nav link click ---
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileNav(false);
    });
  });

  // --- Close on Escape key ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleMobileNav(false);
    }
  });
}

/**
 * Toggle mobile navigation drawer
 * @param {boolean} show - Whether to show or hide the mobile nav
 */
function toggleMobileNav(show) {
  const navbarToggle = document.getElementById('navbarToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const body = document.body;

  if (show) {
    mobileNav.classList.add('active');
    mobileNavOverlay.classList.add('active');
    navbarToggle.classList.add('active');
    body.classList.add('nav-open');
  } else {
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    navbarToggle.classList.remove('active');
    body.classList.remove('nav-open');
  }
}


/* ============================================
   4. SMOOTH SCROLLING & ACTIVE SECTION
   ============================================ */

/**
 * Setup smooth scroll for all anchor links
 * and active section highlighting
 */
function setupSmoothScrolling() {
  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--navbar-height')) || 72;

        const targetPosition = targetElement.getBoundingClientRect().top
          + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Active section highlighting ---
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        updateActiveNavLink(sectionId, navLinks);
        updateActiveNavLink(sectionId, mobileNavLinks);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

/**
 * Update the active state of navigation links
 * @param {string} activeSectionId - The ID of the currently active section
 * @param {NodeList} links - The navigation links to update
 */
function updateActiveNavLink(activeSectionId, links) {
  links.forEach(link => {
    const linkSection = link.getAttribute('data-section');
    if (linkSection === activeSectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}


/* ============================================
   5. SCROLL ANIMATIONS (Intersection Observer)
   ============================================ */

/**
 * Setup scroll-triggered animations using Intersection Observer
 */
function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (!animatedElements.length) return;

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animated class with a small delay for stagger effect
        const delay = entry.target.dataset.animDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, delay);

        // Unobserve after animation triggers (one-time)
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  });

  animatedElements.forEach((el, index) => {
    // Add stagger delay
    el.dataset.animDelay = index * 50;
    animationObserver.observe(el);
  });
}


/* ============================================
   6. HERO COUNTER ANIMATION
   ============================================ */

/**
 * Animate hero stat numbers counting up
 */
function setupHeroCounters() {
  const counters = document.querySelectorAll('.hero-stat-number[data-count]');

  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

/**
 * Animate a single counter element
 * @param {HTMLElement} element - The counter element to animate
 */
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 2000; // 2 seconds
  const startTime = performance.now();
  const startValue = 0;

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease out cubic)
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(startValue + (target - startValue) * easeOutCubic);

    element.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(updateCounter);
}


/* ============================================
   7. ROOM CARDS DYNAMIC RENDERING
   ============================================ */

/**
 * Render room cards from data into the rooms grid
 */
function renderRoomCards() {
  const roomsGrid = document.getElementById('roomsGrid');
  if (!roomsGrid || !siteData || !siteData.rooms) return;

  const roomIcons = [
    'fa-bed', 'fa-door-open', 'fa-couch',
    'fa-house-user', 'fa-crown', 'fa-star'
  ];

  let roomsHTML = '';

  siteData.rooms.forEach((room, index) => {
    const icon = roomIcons[index % roomIcons.length];
    const featuresHTML = room.features.map(f =>
      `<span class="room-feature-tag">${f}</span>`
    ).join('');

    const unavailableBadge = !room.available
      ? `<span class="room-card-unavailable">Full</span>`
      : '';

    const buttonClass = room.available ? '' : 'disabled';
    const buttonText = room.available ? 'Book Now' : 'Full';

    roomsHTML += `
      <div class="room-card animate-on-scroll" data-room-id="${room.id}">
        <span class="room-card-badge">${room.badge}</span>
        ${unavailableBadge}
        <div class="room-card-image">
          <div class="room-img-placeholder">
            <i class="fas ${icon}"></i>
            <span>Upload Room Image Here</span>
          </div>
        </div>
        <div class="room-card-body">
          <h3 class="room-card-type">${room.type}</h3>
          <p class="room-card-capacity">
            <i class="fas fa-users"></i>
            ${room.capacity}
          </p>
          <div class="room-card-features">
            ${featuresHTML}
          </div>
          <div class="room-card-footer">
            <span class="room-card-price">${room.price}</span>
            <a href="#booking" class="room-card-btn ${buttonClass}">
              ${buttonText}
            </a>
          </div>
        </div>
      </div>
    `;
  });

  roomsGrid.innerHTML = roomsHTML;

  // Re-observe new elements for scroll animations
  roomsGrid.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.add('animated'); // Show them since parent section triggers animation
  });
}


/* ============================================
   8. GALLERY RENDERING & FILTERING
   ============================================ */

/**
 * Render gallery items from data
 */
function renderGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid || !siteData || !siteData.gallery) return;

  const galleryIcons = [
    'fa-building', 'fa-couch', 'fa-book-reader',
    'fa-bed', 'fa-utensils', 'fa-shower',
    'fa-tree', 'fa-gamepad'
  ];

  let galleryHTML = '';

  siteData.gallery.forEach((item, index) => {
    const icon = galleryIcons[index % galleryIcons.length];

    galleryHTML += `
      <div class="gallery-item" data-category="${item.category}" data-index="${index}" data-alt="${item.alt}">
        <div class="gallery-placeholder">
          <i class="fas ${icon}"></i>
          <span>${item.alt}</span>
        </div>
        <div class="gallery-overlay">${item.alt}</div>
        <div class="gallery-zoom-icon">
          <i class="fas fa-search-plus"></i>
        </div>
      </div>
    `;
  });

  galleryGrid.innerHTML = galleryHTML;
}

/**
 * Setup gallery filter tab functionality
 */
function setupGalleryFilters() {
  const filterButtons = document.querySelectorAll('.gallery-filter');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter gallery items
      const filter = button.getAttribute('data-filter');
      const galleryItems = document.querySelectorAll('.gallery-item');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}


/* ============================================
   9. TESTIMONIALS SLIDER
   ============================================ */

let testimonialIndex = 0;
let testimonialAutoPlay = null;

/**
 * Render testimonial cards
 */
function renderTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const dotsContainer = document.getElementById('testimonialsDots');
  if (!track || !dotsContainer || !siteData || !siteData.testimonials) return;

  let trackHTML = '';
  let dotsHTML = '';

  siteData.testimonials.forEach((testimonial, index) => {
    const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);

    trackHTML += `
      <div class="testimonial-card">
        <div class="testimonial-inner">
          <div class="testimonial-avatar">
            <i class="fas fa-user"></i>
          </div>
          <div class="testimonial-stars">${stars}</div>
          <p class="testimonial-text">"${testimonial.text}"</p>
          <p class="testimonial-name">${testimonial.name}</p>
          <p class="testimonial-course">${testimonial.course}</p>
        </div>
      </div>
    `;

    dotsHTML += `<span class="testimonial-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`;
  });

  track.innerHTML = trackHTML;
  dotsContainer.innerHTML = dotsHTML;
}

/**
 * Setup testimonials slider controls
 */
function setupTestimonialsSlider() {
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  const dotsContainer = document.getElementById('testimonialsDots');

  if (!prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', () => {
    navigateTestimonial(-1);
  });

  nextBtn.addEventListener('click', () => {
    navigateTestimonial(1);
  });

  // Dot click navigation
  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.testimonial-dot');
      if (dot) {
        const index = parseInt(dot.getAttribute('data-index'));
        goToTestimonial(index);
      }
    });
  }

  // Auto-play
  startTestimonialAutoPlay();

  // Pause on hover
  const slider = document.getElementById('testimonialsSlider');
  if (slider) {
    slider.addEventListener('mouseenter', stopTestimonialAutoPlay);
    slider.addEventListener('mouseleave', startTestimonialAutoPlay);
  }
}

/**
 * Navigate testimonials by direction
 * @param {number} direction - 1 for next, -1 for previous
 */
function navigateTestimonial(direction) {
  if (!siteData || !siteData.testimonials) return;
  const total = siteData.testimonials.length;
  testimonialIndex = (testimonialIndex + direction + total) % total;
  goToTestimonial(testimonialIndex);
}

/**
 * Go to a specific testimonial by index
 * @param {number} index - The testimonial index to show
 */
function goToTestimonial(index) {
  const track = document.getElementById('testimonialsTrack');
  const dots = document.querySelectorAll('.testimonial-dot');

  if (!track) return;

  testimonialIndex = index;
  track.style.transform = `translateX(-${index * 100}%)`;

  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

/**
 * Start auto-play for testimonials
 */
function startTestimonialAutoPlay() {
  stopTestimonialAutoPlay();
  testimonialAutoPlay = setInterval(() => {
    navigateTestimonial(1);
  }, 5000);
}

/**
 * Stop auto-play for testimonials
 */
function stopTestimonialAutoPlay() {
  if (testimonialAutoPlay) {
    clearInterval(testimonialAutoPlay);
    testimonialAutoPlay = null;
  }
}


/* ============================================
   10. FOOD MENU DAY TABS
   ============================================ */

/**
 * Setup day tab click handlers for food menu
 */
function setupDayTabs() {
  const dayTabs = document.querySelectorAll('.day-tab');

  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      dayTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Render menu for selected day
      const day = tab.getAttribute('data-day');
      renderFoodMenu(day);
    });
  });

  // Auto-select today's day
  autoSelectToday();
}

/**
 * Auto-select today's day in the tabs
 */
function autoSelectToday() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];

  const dayTabs = document.querySelectorAll('.day-tab');
  dayTabs.forEach(tab => {
    if (tab.getAttribute('data-day') === today) {
      tab.classList.add('active');
      // Remove active from default (monday)
      dayTabs.forEach(t => {
        if (t !== tab) t.classList.remove('active');
      });
      renderFoodMenu(today);
    }
  });
}

/**
 * Render food menu cards for a specific day
 * @param {string} day - The day name (e.g., 'monday')
 */
function renderFoodMenu(day) {
  const menuCards = document.getElementById('menuCards');
  if (!menuCards || !siteData || !siteData.foodMenu) return;

  const dayMenu = siteData.foodMenu[day];
  if (!dayMenu) return;

  const mealIcons = {
    
    lunch: '🍛',
    dinner: '🍽️'
  };

  const mealNames = {
    
    lunch: 'Lunch',
    dinner: 'Dinner'
  };

  let menuHTML = '';

  [ 'lunch', 'dinner'].forEach(meal => {
    const mealData = dayMenu[meal];
    if (!mealData) return;

    const typeBadgeClass = mealData.type === 'veg' ? 'veg'
      : mealData.type === 'non-veg' ? 'non-veg'
        : 'mixed';

    const typeLabel = mealData.type === 'veg' ? 'Veg'
      : mealData.type === 'non-veg' ? 'Non-Veg'
        : 'Mixed';

    const itemsHTML = mealData.items.map(item =>
      `<div class="menu-item">
        <i class="fas fa-circle"></i>
        <span>${item}</span>
      </div>`
    ).join('');

    menuHTML += `
      <div class="menu-card">
        <div class="menu-card-header">
          <div class="menu-card-title">
            <span>${mealIcons[meal]}</span>
            <h4>${mealNames[meal]}</h4>
          </div>
          <span class="menu-type-badge ${typeBadgeClass}">${typeLabel}</span>
        </div>
        <div class="menu-card-body">
          ${itemsHTML}
        </div>
        <div class="menu-card-time">
          <i class="fas fa-clock"></i>
          <span>${mealData.time}</span>
        </div>
      </div>
    `;
  });

  // Smooth transition
  menuCards.style.opacity = '0';
  menuCards.style.transform = 'translateY(10px)';

  setTimeout(() => {
    menuCards.innerHTML = menuHTML;
    requestAnimationFrame(() => {
      menuCards.style.transition = 'all 0.4s ease';
      menuCards.style.opacity = '1';
      menuCards.style.transform = 'translateY(0)';
    });
  }, 200);
}


/* ============================================
   11. LANDMARKS RENDERING
   ============================================ */

/**
 * Render nearby landmarks from data
 */
function renderLandmarks() {
  const landmarksGrid = document.getElementById('landmarksGrid');
  if (!landmarksGrid || !siteData || !siteData.landmarks) return;

  let landmarksHTML = '';

  siteData.landmarks.forEach(landmark => {
    landmarksHTML += `
      <div class="landmark-card">
        <span class="landmark-icon">${landmark.icon}</span>
        <div class="landmark-info">
          <h4>${landmark.name}</h4>
          <p>${landmark.distance}</p>
        </div>
      </div>
    `;
  });

  landmarksGrid.innerHTML = landmarksHTML;
}


/* ============================================
   12. BOOKING FORM HANDLING & VALIDATION
   ============================================ */

/**
 * Setup booking form submission and validation
 */
function setupBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', handleFormSubmit);

  // Real-time validation on input
  const inputs = form.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });

    input.addEventListener('input', () => {
      // Clear error on input
      const errorEl = document.getElementById(input.id + 'Error');
      if (errorEl) errorEl.textContent = '';
      input.classList.remove('error');
    });
  });

  // Phone number input formatting — allow only digits
  const phoneInputs = form.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    });
  });
}

/**
 * Handle form submission
 * @param {Event} e - The submit event
 */
function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById('submitBtn');
  const btnLoader = document.getElementById('btnLoader');

  // Validate all fields
  if (!validateForm(form)) {
    showToast('error', 'Validation Error', 'Please fill in all required fields correctly.');
    return;
  }

  // Show loading state
  if (submitBtn && btnLoader) {
    submitBtn.disabled = true;
    submitBtn.querySelector('span').style.opacity = '0';
    submitBtn.querySelector('i').style.opacity = '0';
    btnLoader.style.display = 'block';
  }

  // Collect form data
  const formData = {
    name: document.getElementById('fullName').value.trim(),
    city: document.getElementById('currentCity').value.trim(),
    age: document.getElementById('age').value.trim(),
    course: document.getElementById('course').value.trim(),
    visitDate: document.getElementById('visitDate').value,
    visitTime: document.getElementById('visitTime').value,
    parentPhone: document.getElementById('parentPhone').value.trim(),
    studentPhone: document.getElementById('studentPhone').value.trim(),
    roomPreference: document.getElementById('roomPreference').value,
    message: document.getElementById('message').value.trim()
  };

  // Format the visit time display
  const visitDateTime = formData.visitDate && formData.visitTime
    ? `${formatDate(formData.visitDate)} at ${formatTime(formData.visitTime)}`
    : 'Not specified';

  // Build WhatsApp message
  const whatsappMessage = `🏠 *New Hostel Booking Request*
━━━━━━━━━━━━━━━━━━━

👤 *Name:* ${formData.name}
🏙️ *City:* ${formData.city}
🎂 *Age:* ${formData.age}
🎓 *Course:* ${formData.course}
📅 *Visit Time:* ${visitDateTime}
📞 *Parent Phone:* ${formData.parentPhone}
📱 *Student Phone:* ${formData.studentPhone}
🛏️ *Room Preference:* ${formData.roomPreference || 'Not selected'}
💬 *Message:* ${formData.message || 'None'}

━━━━━━━━━━━━━━━━━━━
_Sent from Yashar's Hostel Website_`;

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // Build WhatsApp URL
  const whatsappURL = `https://wa.me/918605463560?text=${encodedMessage}`;

  // Simulate a brief processing delay
  setTimeout(() => {
    // Reset button state
    if (submitBtn && btnLoader) {
      submitBtn.disabled = false;
      submitBtn.querySelector('span').style.opacity = '1';
      submitBtn.querySelector('i').style.opacity = '1';
      btnLoader.style.display = 'none';
    }

    // Show success toast
    showToast('success', 'Booking Submitted!', 'Redirecting to WhatsApp...');

    // Open WhatsApp after a short delay
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
    }, 800);

    // Don't reset form — let user verify data was sent correctly
  }, 1500);
}

/**
 * Validate the entire form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
  let isValid = true;
  const requiredInputs = form.querySelectorAll('[required]');

  requiredInputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  return isValid;
}

/**
 * Validate a single form field
 * @param {HTMLInputElement} input - The input field to validate
 * @returns {boolean} - Whether the field is valid
 */
function validateField(input) {
  const value = input.value.trim();
  const errorEl = document.getElementById(input.id + 'Error');
  let errorMessage = '';

  // Required check
  if (input.required && !value) {
    errorMessage = 'This field is required';
  }

  // Specific field validations
  if (value && !errorMessage) {
    switch (input.id) {
      case 'fullName':
        if (value.length < 2) {
          errorMessage = 'Name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s.''-]+$/.test(value)) {
          errorMessage = 'Please enter a valid name';
        }
        break;

      case 'currentCity':
        if (value.length < 2) {
          errorMessage = 'Please enter a valid city name';
        }
        break;

      case 'age':
        const age = parseInt(value);
        if (isNaN(age) || age < 15 || age > 35) {
          errorMessage = 'Age must be between 15 and 35';
        }
        break;

      case 'course':
        if (value.length < 2) {
          errorMessage = 'Please enter your course/college';
        }
        break;

      case 'visitDate':
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          errorMessage = 'Please select a future date';
        }
        break;

      case 'visitTime':
        // Basic validation - just check if it's filled
        if (!value) {
          errorMessage = 'Please select a time';
        }
        break;

      case 'parentPhone':
      case 'studentPhone':
        if (!/^[0-9]{10}$/.test(value)) {
          errorMessage = 'Please enter a valid 10-digit phone number';
        }
        break;
    }
  }

  // Display error
  if (errorEl) {
    errorEl.textContent = errorMessage;
  }

  if (errorMessage) {
    input.classList.add('error');
    input.classList.remove('success');
    return false;
  } else if (value) {
    input.classList.remove('error');
    input.classList.add('success');
    return true;
  }

  input.classList.remove('error', 'success');
  return !input.required;
}


/* ============================================
   13. FILE UPLOAD PREVIEW
   ============================================ */

/**
 * Setup file upload functionality with image preview
 */
function setupFileUpload() {
  const fileInput = document.getElementById('photograph');
  const filePreview = document.getElementById('filePreview');
  const previewImage = document.getElementById('previewImage');
  const fileUploadLabel = document.getElementById('fileUploadLabel');
  const fileRemoveBtn = document.getElementById('fileRemoveBtn');
  const errorEl = document.getElementById('photographError');

  if (!fileInput) return;

  // File input change handler
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      if (errorEl) errorEl.textContent = 'Please upload a JPG, PNG, or WEBP image';
      fileInput.value = '';
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      if (errorEl) errorEl.textContent = 'File size must be less than 5MB';
      fileInput.value = '';
      return;
    }

    // Clear errors
    if (errorEl) errorEl.textContent = '';

    // Show preview
    const reader = new FileReader();
    reader.onload = function (event) {
      if (previewImage) previewImage.src = event.target.result;
      if (filePreview) filePreview.style.display = 'block';
      if (fileUploadLabel) fileUploadLabel.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  // Remove file button
  if (fileRemoveBtn) {
    fileRemoveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      fileInput.value = '';
      if (previewImage) previewImage.src = '';
      if (filePreview) filePreview.style.display = 'none';
      if (fileUploadLabel) fileUploadLabel.style.display = 'flex';
      if (errorEl) errorEl.textContent = '';
    });
  }
}


/* ============================================
   14. LIGHTBOX
   ============================================ */

let currentLightboxIndex = 0;
let lightboxItems = [];

/**
 * Setup lightbox functionality for gallery items
 */
function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxOverlay = lightbox?.querySelector('.lightbox-overlay');

  if (!lightbox) return;

  // Delegate click events on gallery items
  document.addEventListener('click', (e) => {
    const galleryItem = e.target.closest('.gallery-item');
    if (galleryItem) {
      openLightbox(galleryItem);
    }
  });

  // Close lightbox
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', closeLightbox);
  }

  // Navigation
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateLightbox(-1);
        break;
      case 'ArrowRight':
        navigateLightbox(1);
        break;
    }
  });
}

/**
 * Open lightbox for a gallery item
 * @param {HTMLElement} item - The clicked gallery item
 */
function openLightbox(item) {
  const lightbox = document.getElementById('lightbox');
  const lightboxLabel = document.getElementById('lightboxLabel');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (!lightbox) return;

  // Get all visible gallery items
  lightboxItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
  currentLightboxIndex = lightboxItems.indexOf(item);

  // Update lightbox content
  const altText = item.getAttribute('data-alt') || 'Gallery Image';
  if (lightboxLabel) lightboxLabel.textContent = altText;
  if (lightboxCaption) lightboxCaption.textContent = altText;

  // Show lightbox
  lightbox.classList.add('active');
  document.body.classList.add('lightbox-open');
}

/**
 * Close the lightbox
 */
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
  }
}

/**
 * Navigate lightbox images
 * @param {number} direction - 1 for next, -1 for previous
 */
function navigateLightbox(direction) {
  if (!lightboxItems.length) return;

  currentLightboxIndex = (currentLightboxIndex + direction + lightboxItems.length) % lightboxItems.length;

  const item = lightboxItems[currentLightboxIndex];
  const altText = item.getAttribute('data-alt') || 'Gallery Image';

  const lightboxLabel = document.getElementById('lightboxLabel');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (lightboxLabel) lightboxLabel.textContent = altText;
  if (lightboxCaption) lightboxCaption.textContent = altText;
}


/* ============================================
   15. BACK TO TOP BUTTON
   ============================================ */

/**
 * Setup back to top button visibility and click handler
 */
function setupBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  // Click to scroll to top
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


/* ============================================
   16. TOAST NOTIFICATIONS
   ============================================ */

/**
 * Show a toast notification
 * @param {string} type - Toast type: 'success', 'error', 'warning', 'info'
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {number} duration - Auto-dismiss duration in ms (default: 4000)
 */
function showToast(type = 'info', title = '', message = '', duration = 4000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  // Icon mapping
  const icons = {
    success: '<i class="fas fa-check-circle"></i>',
    error: '<i class="fas fa-exclamation-circle"></i>',
    warning: '<i class="fas fa-exclamation-triangle"></i>',
    info: '<i class="fas fa-info-circle"></i>'
  };

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <div class="toast-content">
      <p class="toast-title">${title}</p>
      <p class="toast-message">${message}</p>
    </div>
    <button class="toast-close" aria-label="Close notification">
      <i class="fas fa-times"></i>
    </button>
  `;

  // Add to container
  container.appendChild(toast);

  // Close button handler
  const closeBtn = toast.querySelector('.toast-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => removeToast(toast));
  }

  // Auto-dismiss
  if (duration > 0) {
    setTimeout(() => removeToast(toast), duration);
  }
}

/**
 * Remove a toast notification with animation
 * @param {HTMLElement} toast - The toast element to remove
 */
function removeToast(toast) {
  if (!toast || toast.classList.contains('removing')) return;

  toast.classList.add('removing');
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}


/* ============================================
   17. UTILITY FUNCTIONS
   ============================================ */

/**
 * Format a date string to a human-readable format
 * @param {string} dateStr - Date string (YYYY-MM-DD)
 * @returns {string} - Formatted date string
 */
function formatDate(dateStr) {
  if (!dateStr) return 'Not specified';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
  } catch {
    return dateStr;
  }
}

/**
 * Format a time string to 12-hour format
 * @param {string} timeStr - Time string (HH:MM)
 * @returns {string} - Formatted time string
 */
function formatTime(timeStr) {
  if (!timeStr) return 'Not specified';
  try {
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHours = h % 12 || 12;
    return `${displayHours}:${minutes} ${ampm}`;
  } catch {
    return timeStr;
  }
}

/**
 * Set the footer year to the current year
 */
function setupFooterYear() {
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
}

/**
 * Set the minimum date for the visit date input to today
 */
function setupFormDateMin() {
  const visitDateInput = document.getElementById('visitDate');
  if (visitDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    visitDateInput.min = `${yyyy}-${mm}-${dd}`;
  }
}

/**
 * Setup character count for message textarea
 */
function setupMessageCharCount() {
  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('messageCharCount');

  if (!messageInput || !charCount) return;

  messageInput.addEventListener('input', () => {
    const current = messageInput.value.length;
    const max = messageInput.maxLength || 500;
    charCount.textContent = `${current}/${max}`;

    // Change color when nearing limit
    if (current > max * 0.9) {
      charCount.style.color = 'var(--color-error)';
    } else if (current > max * 0.7) {
      charCount.style.color = 'var(--color-warning)';
    } else {
      charCount.style.color = 'var(--color-grey-400)';
    }
  });
}

/**
 * Debounce function to limit function call frequency
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce delay in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, wait = 100) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function call frequency
 * @param {Function} func - The function to throttle
 * @param {number} limit - The throttle limit in milliseconds
 * @returns {Function} - The throttled function
 */
function throttle(func, limit = 100) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}


/* ============================================
   END OF SCRIPT
   ============================================ */
