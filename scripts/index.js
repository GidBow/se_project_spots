const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");

const editProfileNameInput = editProfileModal.querySelector(
  "#profile_name_input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const addCardFormElement = document.querySelector("#new-post-modal");
const captionInput = addCardFormElement.querySelector("#caption-input");
const linkInput = addCardFormElement.querySelector("#image-link");

const profileNameEL = document.querySelector(".profile__name");
const profileDescriptionEL = document.querySelector(".profile__description");

function handleAddCardSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();
  // Log both input values to the console.
  console.log(captionInput.value);
  console.log(linkInput.value);
  // Close the modal.
  newPostModal.classList.remove("modal_is-opened");
}

// Create the submit listener.
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

// Open the modal when the button is clicked
editProfileBtn.addEventListener("click", function () {
  // Get the current profile name and description
  editProfileNameInput.value = profileNameEL.textContent;
  editProfileDescriptionInput.value = profileDescriptionEL.textContent;
  // Open the modal
  editProfileModal.classList.add("modal_is-opened");
});
// Close the modal when the close button is clicked
editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

// Open the modal when the button is clicked
newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});
// Close the modal when the close button is clicked
newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

// Assign form input values to profile name and description
function handleEditProfileSubmit(e) {
  e.preventDefault(); // Prevent the default form submission behavior
  profileNameEL.textContent = editProfileNameInput.value;
  profileDescriptionEL.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened"); // Close the modal
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

const initialCards = [
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
console.log(initialCards);
