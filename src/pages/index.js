import "../pages/index.css";
import logoSrc from "../images/logo.svg";
import avatarSrc from "../images/avatar.jpg";
import pencilSrc from "../images/pencil.svg";
import plusSignSrc from "../images/plus-sign.svg";

import { enableValidation, settings } from "../scripts/validation.js";
import { initialCards } from "../scripts/cards.js";
import { disableButton, resetValidation } from "../scripts/validation.js";

import Api from "../scripts/Api.js";

const logoImage = document.getElementById("logo");
logoImage.src = logoSrc;
const avatarImage = document.getElementById("avatar");
avatarImage.src = avatarSrc;
const pencilImage = document.getElementById("pencil");
pencilImage.src = pencilSrc;
const plusSignImage = document.getElementById("plus-sign");
plusSignImage.src = plusSignSrc;

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".cards__list");
//profile elements
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = document.forms["edit-profile"];

const editProfileNameInput = editProfileModal.querySelector(
  "#profile_name_input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile_description_input"
);

//card form elements
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const addCardFormElement = document.querySelector(
  "#new-post-modal .modal__form"
);
const captionInput = addCardFormElement.querySelector("#caption-input");
const linkInput = addCardFormElement.querySelector("#image-link");
const addCardBtn = newPostModal.querySelector(".modal__submit-btn");
const cardSubmitBtn = addCardFormElement.querySelector(".modal__submit-btn");
//profile elements
const profileNameEL = document.querySelector(".profile__name");
const profileDescriptionEL = document.querySelector(".profile__description");
//preview modal elements

const previewImageModal = document.querySelector("#preview-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewCaption = previewImageModal.querySelector(".modal__caption");
const previewCloseBtn = previewImageModal.querySelector(".modal__close-btn");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d321f5b5-1857-422e-ae16-202feee0f36a",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((userInfo) => {
    // Render the user info
    profileNameEL.textContent = userInfo.name;
    profileDescriptionEL.textContent = userInfo.about;
    avatarImage.src = userInfo.avatar;
  })
  .catch((err) => {
    console.error("Error fetching user info:", err);
  });

api
  .getInitialCards()
  .then((cards) => {
    // Render the initial cards
    cards.forEach((card) => {
      renderCard(card);
    });
  })
  .catch((err) => {
    console.error("Error fetching initial cards:", err);
  });

// Function to open the modal
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}
// Function to close the modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
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
  resetValidation(editProfileForm, settings);
  // Open the modal
  openModal(editProfileModal);
});

// Open the modal when the button is clicked
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

// For the new post modal overlay click
newPostModal.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(newPostModal);
  }
});

// Assign form input values to profile name and description
function handleEditProfileSubmit(e) {
  e.preventDefault(); // Prevent the default form submission behavior
  api
    .updateUserInfo(
      editProfileNameInput.value,
      editProfileDescriptionInput.value
    )
    .then((value) => {
      profileNameEL.textContent = editProfileNameInput.value;
      profileDescriptionEL.textContent = editProfileDescriptionInput.value;

      disableButton(
        editProfileForm.querySelector(".modal__submit-btn"),
        settings
      ); // Disable the submit button

      closeModal(editProfileModal); // Close the modal
    })
    .catch((err) => {
      console.error("Error updating user info:", err);
    });
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();
  api
    .addNewCard({ name: captionInput.value, link: linkInput.value })
    .then((data) => {
      // Render the new card
      renderCard(data);
      addCardFormElement.reset();
      disableButton(cardSubmitBtn, settings);
      closeModal(newPostModal);
    })
    .catch((err) => {
      console.error("Error adding new card", err);
    });
}

editProfileModal.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(editProfileModal);
  }
});

// Add event listener to the add card form
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

previewImageModal.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(previewImageModal);
  }
});

// Function to open the preview modal
function openPreviewModal(image, caption) {
  previewImage.src = image;
  previewImage.alt = caption;
  previewCaption.textContent = caption;
  openModal(previewImageModal);
}

const deleteModal = document.querySelector("#delete-card-modal");

const deleteForm = document.forms["delete-conf-form"];
const deleteConfBtn = deleteForm.querySelector(".modal__delete-btn");
let cardToDelete;
let cardIdToDelete;

function getCardElement(data) {
  // Find the elements inside the template
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  // Set the image and title
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  previewImageModal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(previewImageModal);
    }
  });

  //keeps showing like state
  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_active");
  }

  cardLikeBtn.addEventListener("click", () => {
    if (data.isLiked) {
      // If the card is already liked, remove the like
      api
        .removeLike(data._id)
        .then((res) => {
          cardLikeBtn.classList.remove("card__like-btn_active");
          data.isLiked = false; // Update the like state
        })
        .catch((err) => {
          console.error("Error removing like:", err);
        });
    } else {
      // If the card is not liked, add the like
      api
        .isLiked(data._id)
        .then((res) => {
          cardLikeBtn.classList.add("card__like-btn_active");
        })
        .catch((err) => {
          console.error("Error adding like:", err);
        });
    }
  });

  cardImageEl.addEventListener("click", () => {
    const caption = cardTitleEl.textContent;
    openPreviewModal(cardImageEl.src, caption);
  });

  cardDeleteBtn.addEventListener("click", () => {
    handleDeleteCard(data, cardElement);
  });

  function handleDeleteCard(data, cardElement) {
    // Open the delete confirmation modal
    cardToDelete = cardElement;
    cardIdToDelete = data._id;
    openModal(deleteModal);
  }

  return cardElement;
}

function handleDeleteCardSubmit(evt) {
  evt.preventDefault(); // Prevent the default form submission behavior
  api
    .deleteCard({ cardId: cardIdToDelete })
    .then(() => {
      // Remove the card from the DOM
      cardToDelete.remove();
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
    });
}

deleteForm.addEventListener("submit", handleDeleteCardSubmit);

function renderCard(item, method = "append") {
  const cardElement = getCardElement(item);
  cardList[method](cardElement);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
enableValidation(settings);
