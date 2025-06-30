export const renderLoading = (
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

export function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export const closeButtons = document
  .querySelectorAll(".modal__close-btn")
  .forEach((button) => {
    // Find the closest popup only once
    const popup = button.closest(".modal");
    // Set the listener
    button.addEventListener("click", () => closeModal(popup));
  });
