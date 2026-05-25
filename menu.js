const menuOpenButtons = document.querySelectorAll("[data-menu-open]");
const menuOverlay = document.querySelector("[data-menu-overlay]");
const menuCloseButton = document.querySelector("[data-menu-close]");
const scheduleToggle = document.querySelector("[data-menu-schedule]");
const schedulePanel = document.querySelector("[data-menu-schedule-panel]");

if (menuOverlay) {
  const openMenu = () => {
    document.body.classList.add("menu-open");
    menuOverlay.setAttribute("aria-hidden", "false");
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menuOverlay.setAttribute("aria-hidden", "true");
    if (schedulePanel && scheduleToggle) {
      schedulePanel.classList.remove("is-open");
      schedulePanel.setAttribute("aria-hidden", "true");
      scheduleToggle.classList.remove("is-active");
    }
  };

  menuOpenButtons.forEach((button) => {
    button.addEventListener("click", openMenu);
  });

  if (menuCloseButton) {
    menuCloseButton.addEventListener("click", closeMenu);
  }

  if (scheduleToggle && schedulePanel) {
    scheduleToggle.addEventListener("click", () => {
      const nextState = !schedulePanel.classList.contains("is-open");
      schedulePanel.classList.toggle("is-open", nextState);
      schedulePanel.setAttribute("aria-hidden", String(!nextState));
      scheduleToggle.classList.toggle("is-active", nextState);
    });
  }

  menuOverlay.addEventListener("click", (event) => {
    if (event.target === menuOverlay) {
      closeMenu();
    }
  });

  if (schedulePanel) {
    schedulePanel.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        closeMenu();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
      closeMenu();
    }
  });

  menuOverlay.querySelectorAll(".menu-links a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}
