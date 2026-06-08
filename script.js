/* ==========================================================
   PREMIUM PORTFOLIO WEBSITE V2
   SCRIPT.JS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
       TYPING ANIMATION
    ========================================== */

  const typingText = document.querySelector(".typing-text");

  const roles = [
    "Full Stack Developer",
    "WordPress Developer",
    "Frontend Developer",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex + 1);

      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;

        setTimeout(typeWriter, 1800);

        return;
      }
    } else {
      typingText.textContent = currentRole.substring(0, charIndex - 1);

      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;

        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeWriter, isDeleting ? 50 : 100);
  }

  typeWriter();

  /* ==========================================
       MOBILE MENU
    ========================================== */

  const hamburger = document.querySelector(".hamburger");

  const navMenu = document.querySelector(".nav-menu");

  const navLinks = document.querySelectorAll(".nav-link");

  hamburger?.addEventListener("click", () => {
    navMenu?.classList.toggle("active");

    hamburger.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu?.classList.remove("active");

      hamburger?.classList.remove("active");
    });
  });

  /* ==========================================
       ESC KEY CLOSE MENU
    ========================================== */

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navMenu?.classList.remove("active");

      hamburger?.classList.remove("active");
    }
  });

  /* ==========================================
       ACTIVE NAVIGATION
    ========================================== */

  const sections = document.querySelectorAll("section[id]");

  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;

      const sectionTop = section.offsetTop - 120;

      const sectionId = section.getAttribute("id");

      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLink?.classList.add("active");
      } else {
        navLink?.classList.remove("active");
      }
    });
  }

  /* ==========================================
       REVEAL ANIMATION
    ========================================== */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },

    {
      threshold: 0.15,
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  /* ==========================================
       THEME TOGGLE
    ========================================== */

  const themeToggle = document.querySelector(".theme-toggle");

  const body = document.body;

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    body.classList.add("light-theme");

    if (themeToggle) {
      themeToggle.innerHTML = "🌙";
    }
  }

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("light-theme");

    const isLight = body.classList.contains("light-theme");

    localStorage.setItem("theme", isLight ? "light" : "dark");

    themeToggle.innerHTML = isLight ? "🌙" : "☀";
  });

  /* ==========================================
       SCROLL PROGRESS BAR
    ========================================== */

  const progressBar = document.querySelector(".scroll-progress");

  function updateProgressBar() {
    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    if (progressBar) {
      progressBar.style.width = progress + "%";
    }
  }

  /* ==========================================
       BACK TO TOP
    ========================================== */

  const backToTop = document.getElementById("backToTop");

  function toggleBackToTop() {
    if (!backToTop) return;

    if (window.scrollY > 500) {
      backToTop.style.opacity = "1";
      backToTop.style.visibility = "visible";
    } else {
      backToTop.style.opacity = "0";
      backToTop.style.visibility = "hidden";
    }
  }

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* ==========================================
       PROJECT FILTERING
    ========================================== */

  const filterButtons = document.querySelectorAll(".filter-btn");

  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter = button.dataset.filter;

      projectCards.forEach((card) => {
        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.style.display = "block";

          requestAnimationFrame(() => {
            card.classList.remove("filtered-out");
          });
        } else {
          card.classList.add("filtered-out");

          setTimeout(() => {
            if (card.classList.contains("filtered-out")) {
              card.style.display = "none";
            }
          }, 250);
        }
      });
    });
  });

  /* ==========================================
       IMAGE LIGHTBOX
    ========================================== */

  const galleryImages = document.querySelectorAll(".project-gallery img");

  if (galleryImages.length) {
    const modal = document.createElement("div");

    modal.className = "gallery-modal";

    modal.innerHTML = `
            <span class="gallery-close">&times;</span>
            <img src="" alt="Project Screenshot">
        `;

    document.body.appendChild(modal);

    const modalImg = modal.querySelector("img");

    const closeBtn = modal.querySelector(".gallery-close");

    galleryImages.forEach((img) => {
      img.addEventListener("click", () => {
        modal.classList.add("active");

        modalImg.src = img.src;

        modalImg.alt = img.alt;

        document.body.style.overflow = "hidden";
      });
    });

    function closeModal() {
      modal.classList.remove("active");

      document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  /* ==========================================
       EMAILJS CONTACT FORM
    ========================================== */

  const contactForm = document.getElementById("contactForm");

  const formMessage = document.getElementById("formMessage");

  contactForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      formMessage.className = "error-message";

      formMessage.textContent = "Please fill all fields.";

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      formMessage.className = "error-message";

      formMessage.textContent = "Please enter a valid email.";

      return;
    }

    formMessage.className = "";

    formMessage.textContent = "Sending message...";

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)

      .then(() => {
        formMessage.className = "success-message";

        formMessage.textContent = "Message sent successfully.";

        contactForm.reset();
      })

      .catch((error) => {
        console.error(error);

        formMessage.className = "error-message";

        formMessage.textContent = "Failed to send message.";
      });
  });

  /* ==========================================
       HEADER SHADOW
    ========================================== */

  const header = document.getElementById("header");

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 50) {
      header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";
    } else {
      header.style.boxShadow = "none";
    }
  }

  /* ==========================================
       DEBOUNCE
    ========================================== */

  function debounce(func, wait) {
    let timeout;

    return function (...args) {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }

  const handleScroll = debounce(() => {
    updateProgressBar();

    updateActiveNav();

    updateHeader();

    toggleBackToTop();
  }, 10);

  window.addEventListener("scroll", handleScroll);

  /* ==========================================
       INITIAL LOAD
    ========================================== */

  updateProgressBar();

  updateActiveNav();

  updateHeader();

  toggleBackToTop();
});
