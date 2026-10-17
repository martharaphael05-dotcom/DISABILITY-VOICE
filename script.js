// DISABILITY VOICES
// Navigation, resource filters, contact form, and copyright year.

document.addEventListener("DOMContentLoaded", function () {

  // 1. MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = siteNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
      });
    });
  }

  // 2. OPPORTUNITY AND RESOURCE FILTERS
  const filterButtons = document.querySelectorAll(".filter-button");
  const resourceCards = document.querySelectorAll(".resource-card");

  filterButtons.forEach(function (button) {
    button.setAttribute(
      "aria-pressed",
      String(button.classList.contains("active"))
    );

    button.addEventListener("click", function () {
      const category = button.dataset.filter;

      filterButtons.forEach(function (item) {
        const isActive = item === button;

        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      resourceCards.forEach(function (card) {
        const shouldShow =
          category === "all" ||
          card.dataset.category === category;

        card.hidden = !shouldShow;
      });
    });
  });

  // 3. AUTOMATIC COPYRIGHT YEAR
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 4. CONTACT FORM
  // Opens the visitor's email application.
  // Messages are not stored on a server.

  const PUBLIC_EMAIL = "martharaphael05@gmail.com";

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const data = new FormData(contactForm);

      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const topic = String(
        data.get("topic") || "General enquiry"
      ).trim();
      const message = String(data.get("message") || "").trim();

      // Validate required fields.
      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.textContent =
            "Please complete your name, email, and message.";
        }
        return;
      }

      // Validate the visitor's email address.
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        if (formStatus) {
          formStatus.textContent =
            "Please enter a valid email address.";
        }
        return;
      }

      // Prepare the email subject.
      const subject = encodeURIComponent(
        "Disability Voices: " + topic
      );

      // Prepare the email body.
      const body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Topic: " + topic + "\n\n" +
        "Message:\n" + message
      );

      // Inform the visitor.
      if (formStatus) {
        formStatus.textContent =
          "Your email application should open with your message prepared. Please review it and press Send.";
      }

      // Open the visitor's default email application.
      const mailtoLink =
        "mailto:" + PUBLIC_EMAIL +
        "?subject=" + subject +
        "&body=" + body;

      window.location.href = mailtoLink;
    });
  }

});