import "../pages/index.css";
import logoSrc from "../images/logo.svg";
import pencilSrc from "../images/pencil.svg";
import pencilLSrc from "../images/pencil-light.svg";
import plusSignSrc from "../images/plus-sign.svg";
import { enableValidation, settings } from "../scripts/validation.js";
import { disableButton, resetValidation } from "../scripts/validation.js";
import {
  renderLoading,
  openModal,
  closeModal,
  handleSubmit,
  handleEscape,
  closeButtons,
} from "../utils/helpers.js";
import Api from "../utils/Api.js";

const logoImage = document.getElementById("logo");
logoImage.src = logoSrc;
const avatarImage = document.getElementById("avatar");
const pencilImage = document.getElementById("pencil");
pencilImage.src = pencilSrc;
const pencilLImage = document.getElementById("pencil-light");
pencilLImage.src = pencilLSrc;
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
//Avatar elements
const editAvatarBtn = document.querySelector(".profile__avatar-btn");
const avatarForm = document.querySelector(".modal__avatar-form");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const avatarSubmitBtn = editAvatarModal.querySelector(".modal__submit-btn");
const avatarLinkInput = editAvatarModal.querySelector("#avatar-image-link");
const avatarURL = editAvatarModal.querySelector(".modal__input");
//Delete elements
const deleteModal = document.querySelector("#delete-card-modal");
const deleteForm = document.forms["delete-conf-form"];
const deleteConfBtn = deleteForm.querySelector(".modal__delete-btn");
let cardToDelete;
let cardIdToDelete;

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
      renderCard(card, "append");
    });
  })
  .catch((err) => {
    console.error("Error fetching initial cards:", err);
  });

//open avatar modal
editAvatarBtn.addEventListener("click", function () {
  openModal(editAvatarModal);
});

const handleAvatarFormSubmit = (e) => {
  e.preventDefault();
  const makeRequest = () => {
    return api
      .updateUserAvatar({ avatar: avatarLinkInput.value })
      .then((avatar) => {
        avatarImage.src = avatar.avatar;
        avatarForm.reset();
        closeModal(editAvatarModal);
      });
  };

  handleSubmit(makeRequest, e);
};

//Avatar submit button
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Open the modal when the button is clicked
editProfileBtn.addEventListener("click", function () {
  // Get the current profile name and description
  editProfileNameInput.value = profileNameEL.textContent;
  editProfileDescriptionInput.value = profileDescriptionEL.textContent;
  resetValidation(editProfileForm, settings);
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
const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  const makeRequest = () => {
    return api
      .updateUserInfo({
        name: editProfileNameInput.value,
        about: editProfileDescriptionInput.value,
      })
      .then(() => {
        profileNameEL.textContent = editProfileNameInput.value;
        profileDescriptionEL.textContent = editProfileDescriptionInput.value;

        disableButton(
          editProfileForm.querySelector(".modal__submit-btn"),
          settings
        ); // Disable the submit button

        closeModal(editProfileModal); // Close the modal
      });
  };

  handleSubmit(makeRequest, e);
};

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(e) {
  e.preventDefault();
  const makeRequest = () => {
    return api
      .addNewCard({ name: captionInput.value, link: linkInput.value })
      .then((data) => {
        // Render the new card
        renderCard(data);
        addCardFormElement.reset();
        disableButton(cardSubmitBtn, settings);
        closeModal(newPostModal);
      });
  };
  handleSubmit(makeRequest, e);
}

editProfileModal.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("modal")) {
    closeModal(editProfileModal);
  }
});

// Add event listener to the add card form
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

previewImageModal.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("modal")) {
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

  previewImageModal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal")) {
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
        .removeLike({ cardId: data._id })
        .then(() => {
          cardLikeBtn.classList.toggle("card__like-btn_active");
          // data.isLiked = false; // Update the like state
        })
        .catch((err) => {
          console.error("Error removing like:", err);
        });
    } else {
      // If the card is not liked, add the like
      api
        .isLiked({ cardId: data._id })
        .then(() => {
          cardLikeBtn.classList.toggle("card__like-btn_active");
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

function handleDeleteCardSubmit(e) {
  e.preventDefault(); // Prevent the default form submission behavior
  const makeRequest = () => {
    return api.deleteCard({ cardId: cardIdToDelete }).then(() => {
      // Remove the card from the DOM
      cardToDelete.remove();
      closeModal(deleteModal);
    });
  };
  handleSubmit(makeRequest, e, "Deleteing...");
}

deleteForm.addEventListener("submit", handleDeleteCardSubmit);

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardList[method](cardElement);
}
enableValidation(settings);
