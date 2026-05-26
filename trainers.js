const requestModal = document.querySelector("[data-request-modal]");
const requestOpeners = document.querySelectorAll("[data-request-open]");
const requestClose = document.querySelector("[data-request-close]");
const ctaForm = document.querySelector(".cta-form");

const setRequestModal = (isOpen) => {
  if (!requestModal) {
    return;
  }

  requestModal.classList.toggle("is-open", isOpen);
  requestModal.setAttribute("aria-hidden", (!isOpen).toString());
  document.body.classList.toggle("request-modal-open", isOpen);
};

requestOpeners.forEach((button) => {
  button.addEventListener("click", () => setRequestModal(true));
});

if (ctaForm) {
  ctaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setRequestModal(true);
  });
}

if (requestClose) {
  requestClose.addEventListener("click", () => setRequestModal(false));
}

if (requestModal) {
  requestModal.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      setRequestModal(false);
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setRequestModal(false);
  }
});
