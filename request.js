const requestFormModal = document.querySelector("[data-request-form-modal]");
const requestSuccessModal = document.querySelector("[data-request-success]");
const requestOpeners = document.querySelectorAll(
  "[data-request-open], .slot-btn"
);
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

const setScheduleDetails = (opener) => {
  if (!requestFormModal || !opener) {
    return;
  }

  const dayEl = requestFormModal.querySelector("[data-schedule-day]");
  const timeEl = requestFormModal.querySelector("[data-schedule-time]");
  const trainerEl = requestFormModal.querySelector("[data-schedule-trainer]");
  const locationEl = requestFormModal.querySelector(
    "[data-schedule-location]"
  );

  if (!dayEl && !timeEl && !trainerEl && !locationEl) {
    return;
  }

  const slotCard = opener.closest(".slot-card");
  const daySource = document.querySelector(".schedule-day h2");
  const timeSource = slotCard?.querySelector(".slot-time");
  const trainerSource = slotCard?.querySelector(".icon-user")
    ?.parentElement;
  const locationSource = document.body.dataset.scheduleLocation;

  if (dayEl && daySource) {
    dayEl.textContent = daySource.textContent.trim();
  }

  if (timeEl && timeSource) {
    timeEl.textContent = timeSource.textContent.trim();
  }

  if (trainerEl && trainerSource) {
    trainerEl.textContent = trainerSource.textContent.replace(/\s+/g, " ").trim();
  }

  if (locationEl && locationSource) {
    locationEl.textContent = locationSource.trim();
  }
};

const openForm = (opener) => {
  setScheduleDetails(opener);
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
  button.addEventListener("click", (event) => {
    openForm(event.currentTarget);
  });
});

document.addEventListener("click", (event) => {
  const opener = event.target.closest("[data-request-open], .slot-btn");
  if (!opener) {
    return;
  }
  event.preventDefault();
  openForm(opener);
});

const handleRequestSubmit = (event) => {
  event.preventDefault();
  if (requestSuccessModal) {
    openSuccess();
  } else {
    closeAll();
  }
};

if (ctaForm) {
  ctaForm.addEventListener("submit", handleRequestSubmit);
}

if (requestForm) {
  requestForm.addEventListener("submit", handleRequestSubmit);
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
