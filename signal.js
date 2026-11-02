document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".package-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        const active = btn === button;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", String(active));
      });

      cards.forEach((card) => {
        const shouldShow = filter === "all" || card.dataset.category === filter;
        card.hidden = !shouldShow;
      });
    });
  });

  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      const nextState = !isExpanded;

      navToggle.setAttribute("aria-expanded", String(nextState));
      mobileNav.classList.toggle("is-open", nextState);
      mobileNav.hidden = !nextState;
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((item) => revealObserver.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add("is-visible"));
  }

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    const fields = [
      { selector: "#name", key: "name" },
      { selector: "#email", key: "email" },
      { selector: "#project-type", key: "project-type" },
      { selector: "#budget", key: "budget" },
      { selector: "#timeline", key: "timeline" },
      { selector: "#message", key: "message" },
    ];

    const validateField = (field) => {
      const input = document.querySelector(field.selector);
      const message = input.parentElement.querySelector(".error-message");
      let valid = true;
      let text = "";

      if (!input.value.trim()) {
        valid = false;
        text = "Please fill in this field.";
      } else if (field.key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        valid = false;
        text = "Please enter a valid email address.";
      }

      input.classList.toggle("invalid", !valid);
      if (message) {
        message.textContent = text;
      }

      return valid;
    };

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let isValid = true;
      fields.forEach((field) => {
        if (!validateField(field)) {
          isValid = false;
        }
      });

      if (!isValid) {
        return;
      }

      const thankYou = contactForm.querySelector(".thank-you");
      if (thankYou) {
        thankYou.hidden = false;
      }
      contactForm.reset();
      fields.forEach((field) => {
        const input = document.querySelector(field.selector);
        if (input) {
          input.classList.remove("invalid");
          const message = input.parentElement.querySelector(".error-message");
          if (message) message.textContent = "";
        }
      });
    });
  }
});

