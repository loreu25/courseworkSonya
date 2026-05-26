const requestFormModal = document.querySelector("[data-request-form-modal]");
const requestSuccessModal = document.querySelector("[data-request-success]");
const requestOpeners = document.querySelectorAll("[data-request-open]");
const requestFormClose = document.querySelector("[data-request-form-close]");
const requestSuccessClose = document.querySelector(
  "[data-request-success-close]"
);
const ctaForm = document.querySelector(".cta-form");
const requestForm = document.querySelector("[data-request-form]");

const setModalState = (modal, isOpen) => {
  if (!modal) {
    return;
  }

  modal.classList.toggle("is-open", isOpen);
  modal.setAttribute("aria-hidden", (!isOpen).toString());
};

const setBodyState = (isOpen) => {
  document.body.classList.toggle("request-modal-open", isOpen);
};

const closeAll = () => {
  setModalState(requestFormModal, false);
  setModalState(requestSuccessModal, false);
  setBodyState(false);
};

const openForm = () => {
  setModalState(requestFormModal, true);
  setModalState(requestSuccessModal, false);
  setBodyState(true);
};

const openSuccess = () => {
  setModalState(requestFormModal, false);
  setModalState(requestSuccessModal, true);
  setBodyState(true);
};

requestOpeners.forEach((button) => {
  button.addEventListener("click", openForm);
});

if (ctaForm) {
  ctaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    openSuccess();
  });
}

if (requestForm) {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    openSuccess();
  });
}

if (requestFormClose) {
  requestFormClose.addEventListener("click", closeAll);
}

if (requestSuccessClose) {
  requestSuccessClose.addEventListener("click", closeAll);
}

if (requestFormModal) {
  requestFormModal.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closeAll();
    }
  });
}

if (requestSuccessModal) {
  requestSuccessModal.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closeAll();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAll();
  }
});
