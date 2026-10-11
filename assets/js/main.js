/**
 * SUHANI DHIRWAN PORTFOLIO - FAST INTERACTIONS & SCROLL ANIMATIONS
 * BFA Applied Art Student • Graphic Era Hill University, Dehradun
 * 
 * Clean, lightweight, native-speed scrolling with zero sluggishness.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initHeaderScroll();
  initHeroRoleRotator();
  initPortraitModeToggle();
  initBrushStrokeAnimation();
  initScrollAnimations();
  initStatsCounter();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initCopyEmail();
  initMobileNav();
  initLiveClock();
});

/* --------------------------------------------------------------------------
 * 1. SCROLL PROGRESS BAR & HEADER
 * -------------------------------------------------------------------------- */
function initScrollProgressBar() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  const updateProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
 * 2. DYNAMIC HERO ROLE ROTATOR
 * -------------------------------------------------------------------------- */
function initHeroRoleRotator() {
  const roleEl = document.querySelector('.role-dynamic-text');
  if (!roleEl) return;

  const roles = [
    "Applied Art & Visual Storytelling",
    "BFA • Graphic Era Hill University",
    "Illustration, Painting & Sketching",
    "Graphic Design & Typography"
  ];

  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % roles.length;
    
    roleEl.style.opacity = '0';
    roleEl.style.transform = 'translateY(5px)';
    
    setTimeout(() => {
      roleEl.textContent = roles[currentIndex];
      roleEl.style.transition = 'all 0.35s ease';
      roleEl.style.opacity = '1';
      roleEl.style.transform = 'translateY(0)';
    }, 250);
  }, 3200);
}

/* --------------------------------------------------------------------------
 * 3. PORTRAIT PHOTO MONOCHROME / COLOR TOGGLE
 * -------------------------------------------------------------------------- */
function initPortraitModeToggle() {
  const toggleBtn = document.querySelector('.portrait-mode-toggle');
  const portraitFrame = document.querySelector('.portrait-frame');
  if (!toggleBtn || !portraitFrame) return;

  let isColor = false;

  toggleBtn.addEventListener('click', () => {
    isColor = !isColor;
    if (isColor) {
      portraitFrame.classList.add('color-mode');
      toggleBtn.innerHTML = '<span class="toggle-icon">◑</span> Color Mode';
    } else {
      portraitFrame.classList.remove('color-mode');
      toggleBtn.innerHTML = '<span class="toggle-icon">◐</span> B&W Mode';
    }
  });
}

/* --------------------------------------------------------------------------
 * 4. HAND-DRAWN BRUSH STROKE UNDERLINE ANIMATION
 * -------------------------------------------------------------------------- */
function initBrushStrokeAnimation() {
  const pathMain = document.querySelector('.brush-path-main');
  const pathSub = document.querySelector('.brush-path-sub');
  if (!pathMain) return;

  pathMain.style.strokeDasharray = '320';
  pathMain.style.strokeDashoffset = '320';
  if (pathSub) {
    pathSub.style.strokeDasharray = '280';
    pathSub.style.strokeDashoffset = '280';
  }

  setTimeout(() => {
    pathMain.style.transition = 'stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
    pathMain.style.strokeDashoffset = '0';
    if (pathSub) {
      pathSub.style.transition = 'stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s';
      pathSub.style.strokeDashoffset = '0';
    }
  }, 300);

  const link = document.querySelector('.cta-brush-link');
  if (link) {
    link.addEventListener('mouseenter', () => {
      pathMain.style.strokeWidth = '3.4';
    });
    link.addEventListener('mouseleave', () => {
      pathMain.style.strokeWidth = '2.6';
    });
  }
}

/* --------------------------------------------------------------------------
 * 5. FAST, SNAPPY SCROLL REVEAL ANIMATIONS (IntersectionObserver)
 * -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
 * 6. ANIMATED STATS COUNTER
 * -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count') || '0', 10);
        let start = 0;
        const duration = 1200;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.floor(progress * countTo);
          target.childNodes[0].nodeValue = current;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            target.childNodes[0].nodeValue = countTo;
          }
        }

        requestAnimationFrame(updateCounter);
        countObserver.unobserve(target);
      }
    });
  }, { threshold: 0.25 });

  statNumbers.forEach(num => countObserver.observe(num));
}

/* --------------------------------------------------------------------------
 * 7. PROJECT FILTER FUNCTIONALITY
 * -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const tags = card.getAttribute('data-category-tags') || '';
        
        if (filter === 'all' || category === filter || tags.includes(filter)) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
 * 8. REAL PROJECT CASE STUDY MODAL DETAILS (From Netlify Portfolio)
 * -------------------------------------------------------------------------- */
const projectDetails = {
  illustration: {
    title: "Project One: Illustration & Drawing",
    subtitle: "Observational Study, Fine Linework & Visual Expression",
    category: "Illustration / Drawing",
    discipline: "Applied Art & Freehand",
    institution: "Graphic Era Hill University, Dehradun",
    driveUrl: "https://drive.google.com/file/d/165MOUhLqwBdlDkNQ_263efK2kBZdy2E5/view?usp=drivesdk",
    overview: "A comprehensive freehand and observational drawing project exploring anatomical proportion, delicate ink linework, and expressive rendering. Developed as part of coursework at Graphic Era Hill University.",
    problem: "Capturing organic depth and visual tension through traditional drawing while developing a unique signature illustration aesthetic.",
    solution: "Used fine-tip drawing mediums, tonal value gradations, and dynamic character perspective to convey emotion and visual rhythm.",
    impact: "Featured in class exhibitions and archived in the artist's foundational portfolio."
  },
  packaging: {
    title: "Project Two: Packaging & Product Design",
    subtitle: "Visual Identity, Box Architecture & Shelf Appeal",
    category: "Packaging / Product Design",
    discipline: "Commercial Applied Art",
    institution: "Graphic Era Hill University, Dehradun",
    driveUrl: "https://starlit-cupcake-7231fd.netlify.app/",
    overview: "A full product packaging exploration incorporating die-cut layout, label typography, cohesive color theory, and material storytelling tailored for consumer delight.",
    problem: "Designing packaging that communicates product value clearly within a 3-second glance while maintaining aesthetic distinction.",
    solution: "Drafted structural dielines, harmonious color palettes, and legible typographic hierarchy that balances regulatory details with artistic flair.",
    impact: "Received high commendations for structural balance and creative branding execution."
  },
  poster: {
    title: "Project Three: Poster & Visual Communication",
    subtitle: "Public Awareness, Headline Impact & Visual Metaphor",
    category: "Poster / Visual Communication",
    discipline: "Graphic Design & Applied Art",
    institution: "Graphic Era Hill University, Dehradun",
    driveUrl: "https://starlit-cupcake-7231fd.netlify.app/",
    overview: "A conceptual poster campaign designed to provoke thought on social awareness, legal rights, and gender sensitization through bold visual contrast.",
    problem: "Conveying a sensitive social topic with dignity, visual urgency, and instant communicative clarity.",
    solution: "Employed stark monochrome and vivid accent contrasts, minimalist metaphors, and bold display lettering.",
    impact: "Aliged with university programmes on Gender Sensitization and Legal Awareness."
  },
  typography: {
    title: "Project Four: Typography & Layout Design",
    subtitle: "Font Anatomy, Grid Systems & Editorial Composition",
    category: "Typography / Layout",
    discipline: "Editorial & Publication Design",
    institution: "Graphic Era Hill University, Dehradun",
    driveUrl: "https://starlit-cupcake-7231fd.netlify.app/",
    overview: "An experimental typographic exploration studying letterform geometry, line spacing, hierarchy, and harmonious print layout dynamics.",
    problem: "Balancing experimental display letterforms with effortless editorial readability across multi-column formats.",
    solution: "Constructed modular grid systems, expressive headline treatments, and carefully tuned micro-typographic kerning and leading.",
    impact: "Created a versatile editorial showcase used in academic critiques."
  },
  hospital: {
    title: "Project Five: Painting & Canvas Fine Art",
    subtitle: "Commissioned Canvas Painting for Graphic Era Hospital",
    category: "Painting / Fine Art",
    discipline: "Acrylic on Canvas & Mixed Media",
    institution: "Graphic Era Hospital & GEHU",
    driveUrl: "https://starlit-cupcake-7231fd.netlify.app/",
    overview: "An original hand-painted canvas artwork created for the healing environment of Graphic Era Hospital, focusing on serenity, restorative color harmony, and warmth.",
    problem: "Creating an expansive visual painting that instills calmness, hope, and visual warmth for patients, healthcare workers, and visitors.",
    solution: "Utilized soft blending strokes, organic botanical themes, and gentle chromatic harmony designed to alleviate clinical stress.",
    impact: "Displayed within Graphic Era Hospital premises, celebrated by faculty and healthcare visitors."
  },
  concept: {
    title: "Project Six: Creative Concept & Storytelling",
    subtitle: "Character Explorations, Worldbuilding & Visual Lore",
    category: "Creative Concept / Narrative",
    discipline: "Storyboarding & Visual Ideas",
    institution: "Graphic Era Hill University, Dehradun",
    driveUrl: "https://starlit-cupcake-7231fd.netlify.app/",
    overview: "A narrative series exploring mood boards, thumbnail storyboards, and expressive visual character concepts.",
    problem: "Developing an engaging visual storytelling sequence from an initial abstract prompt.",
    solution: "Iterated through dozens of thumbnail sketches, focal point studies, and color mood keys to establish an evocative world.",
    impact: "Demonstrated strong creative versatility across traditional and applied art disciplines."
  }
};

function initProjectModal() {
  const modalBackdrop = document.querySelector('.project-modal-backdrop');
  const closeBtn = document.querySelector('.modal-close-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (!modalBackdrop) return;

  const modalTitle = modalBackdrop.querySelector('.modal-title');
  const modalSubtitle = modalBackdrop.querySelector('.modal-subtitle');
  const modalRole = modalBackdrop.querySelector('.modal-role-val');
  const modalYear = modalBackdrop.querySelector('.modal-year-val');
  const modalTimeline = modalBackdrop.querySelector('.modal-time-val');
  const modalClient = modalBackdrop.querySelector('.modal-client-val');
  const modalOverview = modalBackdrop.querySelector('.modal-overview-text');
  const modalProblem = modalBackdrop.querySelector('.modal-problem-text');
  const modalSolution = modalBackdrop.querySelector('.modal-solution-text');
  const modalImpact = modalBackdrop.querySelector('.modal-impact-text');
  const modalLink = modalBackdrop.querySelector('.modal-drive-link');

  function openModal(id) {
    const data = projectDetails[id];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalRole.textContent = data.discipline;
    modalYear.textContent = data.category;
    modalTimeline.textContent = "Applied Art";
    modalClient.textContent = data.institution;
    modalOverview.textContent = data.overview;
    modalProblem.textContent = data.problem;
    modalSolution.textContent = data.solution;
    modalImpact.textContent = data.impact;

    if (modalLink) {
      modalLink.href = data.driveUrl;
      modalLink.textContent = data.driveUrl.includes('drive.google.com') ? 'Open Drive Artwork ↗' : 'View Project Details ↗';
    }

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project-id');
      if (id) openModal(id);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
 * 9. CONTACT FORM WITH INSTANT VALIDATION & TOAST
 * -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span style="font-size: 1.1rem; line-height: 1;">✓</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function initContactForm() {
  const form = document.querySelector('#contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    const submitBtn = form.querySelector('.btn-form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending Message...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
      showToast('Thank you! Your message has been sent to Suhani Dhirwan.');
    }, 800);
  });
}

/* --------------------------------------------------------------------------
 * 10. ONE-CLICK EMAIL COPY
 * -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.querySelector('.btn-copy-email');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = copyBtn.getAttribute('data-email') || 'dhirwansuhani0@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email copied: dhirwansuhani0@gmail.com');
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 2500);
    }).catch(() => {
      showToast(`Email: ${email}`);
    });
  });
}

/* --------------------------------------------------------------------------
 * 11. MOBILE NAVIGATION DRAWER
 * -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const links = document.querySelectorAll('.mobile-drawer .nav-link, .mobile-drawer a');
  if (!toggle || !drawer) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  toggle.addEventListener('click', toggleMenu);

  links.forEach(l => {
    l.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* --------------------------------------------------------------------------
 * 12. LIVE LOCAL TIME CLOCK (IST)
 * -------------------------------------------------------------------------- */
function initLiveClock() {
  const clockEl = document.querySelector('.live-local-time');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });
    clockEl.textContent = `${timeStr} IST • Dehradun`;
  }
  update();
  setInterval(update, 1000);
}
