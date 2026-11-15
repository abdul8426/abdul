/* =========================================
   IBRAHIM SIDDIQ PORTFOLIO
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     1. CURRENT YEAR
  ===================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =====================================
     2. VISITOR POPUP ELEMENTS
  ===================================== */

  const overlay = document.getElementById("visitorOverlay");
  const choices = document.getElementById("visitorChoices");
  const recruiterPanel = document.getElementById("recruiterPanel");
  const successPanel = document.getElementById("visitorSuccess");
  const errorPanel = document.getElementById("visitorError");
  const form = document.getElementById("recruiterForm");

  const exploreBtn = document.getElementById("exploreBtn");
  const skipBtn = document.getElementById("skipBtn");
  const recruiterBtn = document.getElementById("recruiterBtn");
  const closeBtn = document.getElementById("visitorClose");
  const backBtn = document.getElementById("backToChoices");
  const successBtn = document.getElementById("enterAfterSubmit");
  const submitBtn = document.getElementById("visitorSubmit");

  const SESSION_KEY = "ibrahimPortfolioEntered";


  /* =====================================
     3. ENTER PORTFOLIO
  ===================================== */

  function enterPortfolio() {

    if (!overlay) return;

    sessionStorage.setItem(SESSION_KEY, "yes");

    overlay.classList.add("is-hidden");

    document.body.classList.remove("modal-open");

    overlay.hidden = true;

  }


  /* =====================================
     4. SHOW POPUP ONLY ONCE PER TAB
  ===================================== */

  if (overlay) {

    if (sessionStorage.getItem(SESSION_KEY) === "yes") {

      overlay.hidden = true;
      document.body.classList.remove("modal-open");

    } else {

      overlay.hidden = false;
      document.body.classList.add("modal-open");

    }

  }


  /* =====================================
     5. EXPLORE / SKIP / CLOSE
  ===================================== */

  if (exploreBtn) {
    exploreBtn.addEventListener("click", enterPortfolio);
  }

  if (skipBtn) {
    skipBtn.addEventListener("click", enterPortfolio);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", enterPortfolio);
  }

  if (successBtn) {
    successBtn.addEventListener("click", enterPortfolio);
  }


  /* =====================================
     6. RECRUITER BUTTON
  ===================================== */

  if (recruiterBtn) {

    recruiterBtn.addEventListener("click", () => {

      choices.hidden = true;
      recruiterPanel.hidden = false;
      successPanel.hidden = true;
      errorPanel.hidden = true;

      const nameInput = document.getElementById("visitorName");

      if (nameInput) {
        nameInput.focus();
      }

    });

  }


  /* =====================================
     7. BACK BUTTON
  ===================================== */

  if (backBtn) {

    backBtn.addEventListener("click", () => {

      recruiterPanel.hidden = true;
      choices.hidden = false;
      errorPanel.hidden = true;

    });

  }


  /* =====================================
     8. ESCAPE KEY SUPPORT
  ===================================== */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      if (overlay && !overlay.hidden) {
        enterPortfolio();
      }
      if (certLightbox && !certLightbox.hidden) {
        closeLightbox();
      }
    }

  });


  /* =====================================
     9. RECRUITER FORM SUBMISSION
  ===================================== */

  if (form) {

    form.addEventListener("submit", async (event) => {

      event.preventDefault();

      errorPanel.hidden = true;

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending enquiry...";

      try {

        const formData = new FormData(form);

        const response = await fetch(
          "https://formsubmit.co/ajax/abdul8426n@gmail.com",
          {
            method: "POST",

            headers: {
              "Accept": "application/json"
            },

            body: formData
          }
        );

        const result = await response.json();

        if (
          !response.ok ||
          result.success === false ||
          result.success === "false" ||
          result.error
        ) {
          throw new Error(result.message || "Submission failed");
        }

        // Show success message
        form.reset();

        recruiterPanel.hidden = true;
        successPanel.hidden = false;

      } catch (error) {

        console.error("Form submission error:", error);

        errorPanel.hidden = false;

        submitBtn.disabled = false;
        submitBtn.textContent = "Send Enquiry ↗";

      }

    });

  }


  /* =====================================
     10. PROJECT FILTER TABS (HCLTech · Vestas / Dukane)
  ===================================== */

  const filterButtons = document.querySelectorAll("#projectFilters .filter-pill");
  const companyGroups = document.querySelectorAll(".company-group[data-group]");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = btn.dataset.filter;

      filterButtons.forEach((pill) => {
        const isActive = pill === btn;
        pill.classList.toggle("active", isActive);
        pill.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      companyGroups.forEach((group) => {
        const matches = selected === "all" || group.dataset.group === selected;
        group.classList.toggle("is-hidden", !matches);
        group.hidden = !matches;
      });
    });
  });


  /* =====================================
     11. CERTIFICATE IMAGE LIGHTBOX
  ===================================== */

  const certLightbox = document.getElementById("certLightbox");
  const certLightboxImg = document.getElementById("certLightboxImg");
  const certLightboxClose = document.getElementById("certLightboxClose");
  const certImages = document.querySelectorAll(".cert-image-wrap img");

  function closeLightbox() {
    if (!certLightbox) return;
    certLightbox.hidden = true;
    document.body.classList.remove("modal-open");
  }

  certImages.forEach((img) => {
    img.addEventListener("click", () => {
      if (!certLightbox || !certLightboxImg) return;
      certLightboxImg.src = img.src;
      certLightboxImg.alt = img.alt;
      certLightbox.hidden = false;
      document.body.classList.add("modal-open");
    });
  });

  if (certLightboxClose) {
    certLightboxClose.addEventListener("click", closeLightbox);
  }

  if (certLightbox) {
    certLightbox.addEventListener("click", (event) => {
      if (event.target === certLightbox) {
        closeLightbox();
      }
    });
  }


  /* =====================================
     12. TAB SYSTEM
  ===================================== */

  const tabLinks = document.querySelectorAll("[data-tab]");
  const panels = document.querySelectorAll("[data-panel]");
  const VALID_TABS = Array.from(panels).map((p) => p.dataset.panel);
  const DEFAULT_TAB = "about";

  function animateStats() {
    const statNumbers = document.querySelectorAll(".stat-number[data-count]");

    statNumbers.forEach((el) => {

      if (el.dataset.animated === "true") return;
      el.dataset.animated = "true";

      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || "";
      const duration = 900;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(eased * target);

        el.textContent = String(value).padStart(2, "0") + suffix;

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = String(target).padStart(2, "0") + suffix;
        }
      }

      requestAnimationFrame(tick);

    });
  }

  function playRoadmapAnimation() {

    const roadmap = document.getElementById("roadmap");
    const progress = document.getElementById("roadmapProgress");

    if (!roadmap || !progress) return;

    const nodes = roadmap.querySelectorAll(".roadmap-node");

    nodes.forEach((node) => node.classList.remove("in-view"));
    progress.style.transform = "scaleY(0)";

    void roadmap.offsetWidth;

    requestAnimationFrame(() => {
      progress.style.transform = "scaleY(1)";
    });

    nodes.forEach((node, index) => {
      setTimeout(() => {
        node.classList.add("in-view");
      }, 220 + index * 260);
    });

  }

  function activateTab(name, updateHash) {

    const target = VALID_TABS.includes(name) ? name : DEFAULT_TAB;

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== target;
    });

    tabLinks.forEach((link) => {
      const isMatch = link.dataset.tab === target;
      link.classList.toggle("active", isMatch);
      if (link.hasAttribute("role")) {
        link.setAttribute("aria-selected", isMatch ? "true" : "false");
      }
    });

    if (updateHash !== false) {
      history.replaceState(null, "", "#" + target);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (target === "experience") {
      playRoadmapAnimation();
    }

    if (target === "about") {
      animateStats();
    }

  }

  tabLinks.forEach((link) => {

    link.addEventListener("click", (event) => {
      event.preventDefault();
      activateTab(link.dataset.tab);
    });

  });

  window.addEventListener("hashchange", () => {
    const name = location.hash.replace("#", "");
    activateTab(name, false);
  });

  const initialTab = location.hash ? location.hash.replace("#", "") : DEFAULT_TAB;
  activateTab(initialTab, false);

  if (initialTab === DEFAULT_TAB || !VALID_TABS.includes(initialTab)) {
    animateStats();
  }

});
