const initialCards = [
  {
    name: "Golden Gate Bridge",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".cards__list");

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = document.forms["edit-profile"];

const editProfileNameInput = editProfileModal.querySelector(
  "#profile_name_input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const addCardFormElement = document.querySelector(
  "#new-post-modal .modal__form"
);
const captionInput = addCardFormElement.querySelector("#caption-input");
const linkInput = addCardFormElement.querySelector("#image-link");
const addCardBtn = newPostModal.querySelector(".modal__save-btn");

const profileNameEL = document.querySelector(".profile__name");
const profileDescriptionEL = document.querySelector(".profile__description");

const previewImageModal = document.querySelector("#preview-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewCaption = previewImageModal.querySelector(".modal__caption");
const previewCloseBtn = previewImageModal.querySelector(".modal__close-btn");

// Function to open the modal
function openModal(modal) {
  modal.classList.add("modal_opened");
}
// Function to close the modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Find all close buttons
const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closeModal(popup));
});

// Open the modal when the button is clicked
editProfileBtn.addEventListener("click", function () {
  // Get the current profile name and description
  editProfileNameInput.value = profileNameEL.textContent;
  editProfileDescriptionInput.value = profileDescriptionEL.textContent;
  // Open the modal
  openModal(editProfileModal);
});

// Open the modal when the button is clicked
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

// Assign form input values to profile name and description
function handleEditProfileSubmit(e) {
  e.preventDefault(); // Prevent the default form submission behavior
  profileNameEL.textContent = editProfileNameInput.value;
  profileDescriptionEL.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal); // Close the modal
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();

  const cardElement = getCardElement({
    name: captionInput.value,
    image: linkInput.value,
  });
  cardList.prepend(cardElement);
  addCardFormElement.reset();
  closeModal(newPostModal);
}

// Function to open the preview modal
function openPreviewModal(image, caption) {
  previewImage.src = image;
  previewImage.alt = caption;
  previewCaption.textContent = caption;
  openModal(previewImageModal);
}
// Function to close the preview modal
function closePreviewModal() {
  closeModal(previewImageModal);
}
// Add event listener to the preview close button
previewCloseBtn.addEventListener("click", closePreviewModal);
// Add event listener to the card image elements

// Add event listener to the preview image
previewImage.addEventListener("click", closePreviewModal);

// Create the submit listener.
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

function getCardElement(data) {
  // Clone the template
  const cardElement = cardTemplate.cloneNode(true);
  // Find the elements inside the template
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  // Set the image and title
  cardImageEl.src = data.image;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  cardLikeBtn.addEventListener("click", () => {
    // Toggle the active class on the button
    cardLikeBtn.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", () => {
    // Remove the card element from the DOM
    const card = cardDeleteBtn.closest(".card");
    card.remove();
  });

  cardImageEl.addEventListener("click", () => {
    const caption = cardImageEl
      .closest(".card")
      .querySelector(".card__title").textContent;
    openPreviewModal(cardImageEl.src, caption);
  });

  return cardElement;
}

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardList.append(cardElement);
});
