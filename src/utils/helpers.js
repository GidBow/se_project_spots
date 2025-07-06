const renderLoading = (
  isLoading,
  button,
  buttonText = "Save",
  loadingText = "Saving..."
) => {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
};

// Function to open the modal
export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}
// Function to close the modal
export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

export const handleSubmit = (request, e, loadingText = "Saving...") => {
  e.preventDefault();

  const submitButton = e.submitter;

  const initialText = submitButton.textContent;
  //update text to Saving...
  renderLoading(true, submitButton, initialText, loadingText);
  //handles the form resetting, error handling, and changing the button text back to normal
  request()
    .then(() => {
      e.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
};

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export const setModalEventListeners = () => {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("mousedown", (e) => {
      if (
        e.target === modal ||
        e.target.classList.contains("modal__close-btn")
      ) {
        closeModal(modal);
      }
    });
  });
};
