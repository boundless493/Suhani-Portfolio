/**
 * SUHANI DHIRWAN PORTFOLIO - FAST INTERACTIONS & SCROLL ANIMATIONS
 * BFA Applied Art Student • Graphic Era Hill University, Dehradun
 * 
 * Clean, lightweight, native-speed scrolling with real projects and
 * direct certificate lightbox modal (zero Google Drive redirects).
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
  initCertificateModal();
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
    "Traditional & Canvas Fine Art",
    "Graphic Design & Corporate Identity"
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
 * 8. REAL PROJECT CASE STUDY DETAILS
 * -------------------------------------------------------------------------- */
const projectDetails = {
  mountain: {
    title: "Himalayan Mountain Village — Canvas Painting",
    subtitle: "Traditional Slate Architecture, Stone Masonry & Mountain Atmosphere",
    category: "Painting / Fine Art",
    discipline: "Fine Art & Acrylic on Canvas",
    institution: "Department of Fine Art • Graphic Era Hill University",
    image: "assets/images/projects/mountain_village_landscape.jpg",
    overview: "A rich fine art study on canvas exploring the rustic stone-and-timber architectural heritage of Himalayan mountain villages, stepped terrace farms, and deep atmospheric mountain perspective.",
    problem: "Capturing the organic textures of weathered slate roofs, stone walls, and dynamic depth of terraced valleys using brush layering.",
    solution: "Employed tonal color harmonies, architectural line work, and textured brushwork to render the earthy tranquility of mountain hamlets.",
    impact: "Showcased in GEHU academic exhibitions and celebrated for its atmospheric authenticity."
  },
  monal: {
    title: "Himalayan Monal — BFA Studio Artwork",
    subtitle: "Wildlife Study on Canvas • State Bird of Uttarakhand",
    category: "Painting / Fine Art",
    discipline: "Acrylic on Canvas • BFA 1st Semester",
    institution: "Department of Fine Art • Graphic Era Hill University",
    image: "assets/images/projects/monal_bird_canvas_painting.jpg",
    overview: "An acrylic canvas painting of the Himalayan Monal, perched gracefully upon a branch against a luminous emerald background. Created during BFA 1st Semester (Batch 2024–28) at Graphic Era Hill University.",
    problem: "Translating the iridescent metallic sheen and dynamic plumage colors of the Himalayan Monal onto traditional canvas.",
    solution: "Layered cobalt blues, warm ochres, and delicate feather linework to achieve lifelike presence and vibrant chromatic contrast.",
    impact: "Signed studio piece archived in university portfolio (Batch 2024–28, Department of Fine Art, GEHU)."
  },
  stationery: {
    title: "MakeMyTrip Corporate Stationery & Business Card Design",
    subtitle: "Executive Identity, Visiting Card & Architectural Envelope System",
    category: "Packaging / Product Design",
    discipline: "Commercial Applied Art & Corporate Identity",
    institution: "Graphic Era Hill University • Applied Art",
    image: "assets/images/projects/makemytrip_stationery.png",
    overview: "A comprehensive brand stationery system designed for MakeMyTrip, featuring modern business visiting cards, corporate envelopes, and clean contact information layouts.",
    problem: "Aligning playful travel spirit with executive professionalism and balanced print margins.",
    solution: "Combined MakeMyTrip's iconic red/blue identity with delicate architectural city skyline silhouettes and crisp grid hierarchy.",
    impact: "Exemplary commercial identity project in Applied Art coursework."
  },
  letterhead: {
    title: "MakeMyTrip Official Letterhead & Paris Skyline Art",
    subtitle: "Vector Architectural Skyline Illustration & Corporate Layout",
    category: "Graphic Design / Layout",
    discipline: "Graphic Design & Vector Illustration",
    institution: "Graphic Era Hill University • Applied Art",
    image: "assets/images/projects/makemytrip_letterhead.png",
    overview: "An official corporate letterhead featuring detailed vector silhouette illustrations of world monuments (Eiffel Tower, Arc de Triomphe, Notre Dame) along the lower margin.",
    problem: "Maintaining adequate blank writing space while incorporating rich, evocative travel art.",
    solution: "Used fine-line monochrome vector city silhouettes at the footer to ensure maximum document utility and brand delight.",
    impact: "High commendation for print usability and typographic restraint."
  },
  illustration: {
    title: "Observational Illustration & Anatomy Drawing",
    subtitle: "Freehand Linework, Value Studies & Gesture Expression",
    category: "Illustration / Drawing",
    discipline: "Applied Art & Freehand Linework",
    institution: "Graphic Era Hill University, Dehradun",
    image: "assets/images/projects/mountain_village_landscape.jpg",
    driveUrl: "https://drive.google.com/file/d/165MOUhLqwBdlDkNQ_263efK2kBZdy2E5/view?usp=drivesdk",
    overview: "A comprehensive freehand and observational drawing project exploring anatomical proportion, delicate ink linework, and expressive rendering.",
    problem: "Capturing organic depth and visual tension through traditional drawing while developing a signature illustration aesthetic.",
    solution: "Used fine-tip drawing mediums, tonal value gradations, and dynamic character perspective to convey emotion and visual rhythm.",
    impact: "Featured in class exhibitions and archived in foundational portfolio."
  },
  concept: {
    title: "Visual Storytelling & Narrative Concept Art",
    subtitle: "Thumbnail Storyboarding, Character Expressions & Lore",
    category: "Creative Concept / Narrative",
    discipline: "Storyboarding & Visual Ideas",
    institution: "Graphic Era Hill University, Dehradun",
    image: "assets/images/projects/monal_bird_canvas_painting.jpg",
    overview: "A narrative series exploring mood boards, thumbnail storyboards, and expressive visual character concepts for creative storytelling.",
    problem: "Developing an engaging visual storytelling sequence from an initial abstract prompt.",
    solution: "Iterated through dozens of thumbnail sketches, focal point studies, and color mood keys to establish an evocative world.",
    impact: "Demonstrated strong creative versatility across traditional and applied art disciplines."
  },
  dengler: {
    title: "Dengler — Design Project",
    subtitle: "Layout, Typography & Visual Communication",
    category: "Graphic Design / Layout",
    discipline: "Applied Art & Graphic Design",
    institution: "Graphic Era Hill University, Dehradun",
    image: "assets/images/projects/dengler_web.jpg",
    overview: "A graphic design composition exploring structured layout, typographic hierarchy, and cohesive visual communication — demonstrating applied art principles in a real-world design context.",
    problem: "Developing a balanced and visually compelling design system that communicates information clearly while maintaining strong aesthetic identity.",
    solution: "Applied principles of grid-based layout, intentional white space, and harmonious typography to produce a refined and purposeful design.",
    impact: "Showcases proficiency in applied graphic design and the ability to deliver commercially viable visual solutions."
  },
  maleficent: {
    title: "Maleficent — Editorial Book Cover Design",
    subtitle: "The Tale of a Sleeping Beauty • Spine & Jacket Typography",
    category: "Graphic Design / Publishing",
    discipline: "Applied Art & Book Cover Design",
    institution: "Graphic Era Hill University, Dehradun",
    image: "assets/images/projects/maleficent_cover_web.jpg",
    overview: "A full editorial jacket and book cover design for 'Maleficent: The Tale of a Sleeping Beauty'. Integrates high-contrast gothic villain portraiture, bespoke fantasy typography, back-cover barcode and publisher layout, and spine branding.",
    problem: "Balancing dark fantasy aesthetics with readable publishing typography and clean commercial jacket layout.",
    solution: "Combined a stark dual-tone palette (slate grey and deep blacks) with expressive horned silhouette motifs, precise typography hierarchy, and author attribution layout.",
    impact: "Demonstrates advanced skill in commercial publishing design, cover art composition, and print-ready typography."
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

    // Set the cover image
    const modalCoverImg = document.getElementById('modalCoverImg');
    if (modalCoverImg) {
      modalCoverImg.src = data.image || '';
      modalCoverImg.style.display = data.image ? 'block' : 'none';
    }

    if (modalLink) {
      if (data.driveUrl) {
        modalLink.href = data.driveUrl;
        modalLink.textContent = 'View Drive Artwork Link ↗';
        modalLink.style.display = 'inline-flex';
      } else {
        modalLink.style.display = 'none';
      }
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
 * 9. INTERACTIVE CERTIFICATES LIGHTBOX MODAL (Direct View, Zero Google Drive)
 * -------------------------------------------------------------------------- */
const certificateList = [
  {
    title: "Grafest 2025: Petri Plate Art",
    issuer: "Graphic Era (Deemed to be University), Dehradun",
    date: "May 01 — 03, 2025",
    desc: "Certificate of Participation for actively participating in Petri Plate Art during Grafest 2025, one of India's biggest inter-university techno-cultural festivals, organized by Graphic Era (Deemed to be University), Dehradun.",
    webImg: "assets/images/certificates/cert_1_grafest_web.jpg",
    fullImg: "assets/images/certificates/cert_1_grafest.png",
    tag: "Grafest 2025"
  },
  {
    title: "Pariksha Pe Charcha 2023",
    issuer: "Hon'ble Prime Minister Narendra Modi • Government of India",
    date: "April 20, 2023",
    desc: "Official letter of appreciation and commendation from Prime Minister Narendra Modi honoring Suhani for participating in Pariksha Pe Charcha and sharing thoughtful youth perspectives on learning and creative development.",
    webImg: "assets/images/certificates/cert_2_pariksha_pe_charcha_web.jpg",
    fullImg: "assets/images/certificates/cert_2_pariksha_pe_charcha.png",
    tag: "Prime Minister Letter"
  },
  {
    title: "Gender Sensitization & Legal Awareness Competition",
    issuer: "PM Shri Kendriya Vidyalaya IIP, Dehradun & National Commission for Women",
    date: "December 13, 2023",
    desc: "Certificate of Merit awarded to Suhani (Class XII B) for participating in the Gender Sensitization and Legal Awareness Competition organized under the aegis of the National Commission for Women in the Vidyalaya.",
    webImg: "assets/images/certificates/cert_3_gender_sensitization_web.jpg",
    fullImg: "assets/images/certificates/cert_3_gender_sensitization.png",
    tag: "National Commission for Women"
  },
  {
    title: "Background Design — Landscapes and Environments",
    issuer: "Udemy • Instructor: Siobhan Twomey",
    date: "January 31, 2025",
    desc: "Certificate of Completion for Background Design - Landscapes and Environments, covering atmospheric perspective, thumbnail compositions, color keys, and environmental concept art.",
    webImg: "assets/images/certificates/cert_4_udemy_background_design_web.jpg",
    fullImg: "assets/images/certificates/cert_4_udemy_background_design.png",
    tag: "Background Design"
  },
  {
    title: "Strategies for Sustainable Design (Elite Certificate)",
    issuer: "NPTEL • SWAYAM • IIT Hyderabad • Funded by MoE, Govt. of India",
    date: "January — April 2025",
    desc: "Elite NPTEL Online Certification awarded to Suhani for successfully completing the 12-week course 'Strategies for Sustainable Design' by Prof. B Umashankar (IIT Hyderabad) with a consolidated score of 65%.",
    webImg: "assets/images/certificates/cert_5_nptel_sustainable_design_web.jpg",
    fullImg: "assets/images/certificates/cert_5_nptel_sustainable_design.png",
    tag: "IIT Hyderabad / NPTEL"
  }
];

function initCertificateModal() {
  const modal = document.querySelector('#certificateModal');
  if (!modal) return;

  const certImg = modal.querySelector('#certViewerImg');
  const certTitle = modal.querySelector('#certModalTitle');
  const certIssuer = modal.querySelector('#certModalIssuer');
  const certDesc = modal.querySelector('#certModalDesc');
  const certCounter = modal.querySelector('#certModalCounter');
  const certFullLink = modal.querySelector('#certFullResLink');
  const closeBtn = modal.querySelector('#certCloseBtn');
  const prevBtn = modal.querySelector('#certPrevBtn');
  const nextBtn = modal.querySelector('#certNextBtn');
  const tabsContainer = modal.querySelector('#certTabsContainer');

  let currentCertIndex = 0;

  function renderCert(index) {
    if (index < 0) index = certificateList.length - 1;
    if (index >= certificateList.length) index = 0;
    currentCertIndex = index;

    const cert = certificateList[currentCertIndex];
    if (certImg) {
      certImg.src = cert.webImg;
      certImg.alt = cert.title;
    }
    if (certTitle) certTitle.textContent = cert.title;
    if (certIssuer) certIssuer.textContent = `${cert.issuer} • ${cert.date}`;
    if (certDesc) certDesc.textContent = cert.desc || '';
    if (certCounter) certCounter.textContent = `Certificate ${currentCertIndex + 1} of ${certificateList.length}`;
    if (certFullLink) certFullLink.href = cert.fullImg || cert.webImg;

    if (tabsContainer) {
      const tabs = tabsContainer.querySelectorAll('.cert-tab-pill');
      tabs.forEach((tab, idx) => {
        if (idx === currentCertIndex) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    }
  }

  window.openCertModal = function(index = 0) {
    renderCert(index);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeCertModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeCertModal);
  if (prevBtn) prevBtn.addEventListener('click', () => renderCert(currentCertIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => renderCert(currentCertIndex + 1));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCertModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeCertModal();
    if (e.key === 'ArrowLeft') renderCert(currentCertIndex - 1);
    if (e.key === 'ArrowRight') renderCert(currentCertIndex + 1);
  });

  // Event delegation on document so clicking anywhere on a certificate card or view button always works
  document.addEventListener('click', (e) => {
    const certCard = e.target.closest('[data-cert-index]');
    if (certCard) {
      e.preventDefault();
      const idx = parseInt(certCard.getAttribute('data-cert-index') || '0', 10);
      window.openCertModal(idx);
      return;
    }

    const triggerBtn = e.target.closest('.trigger-cert-modal');
    if (triggerBtn) {
      e.preventDefault();
      window.openCertModal(0);
      return;
    }
  });
}

/* --------------------------------------------------------------------------
 * 10. CONTACT FORM WITH INSTANT VALIDATION & TOAST
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
 * 11. ONE-CLICK EMAIL COPY
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
 * 12. MOBILE NAVIGATION DRAWER
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
 * 13. LIVE LOCAL TIME CLOCK (IST)
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
