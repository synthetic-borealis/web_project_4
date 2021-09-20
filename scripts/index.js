// Imports
import Card from "./Card.js";
import FormValidatior from "./FormValidator.js"
import { formClassList } from "./form-class-list.js";
import { initialCards } from "./initial-cards.js";

// Containers
const containerPlaces = document.querySelector(".places");
const containerEdit = document.querySelector(".modal-section_type_edit");
const containerAdd = document.querySelector(".modal-section_type_add");
const containerImageModal = document.querySelector(".modal-section_type_image");

// Forms
const formEdit = document.querySelector(".form_type_edit");
const formAdd = document.querySelector(".form_type_add");

// Form Validators
const formValidatorEdit = new FormValidatior(formClassList, formEdit);
const formValidatorAdd = new FormValidatior(formClassList, formAdd);

// Buttons
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".add-button");

// Labels, headings, etc.
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const imageImageModal = containerImageModal.querySelector(
  ".image-modal__image"
);
const captionImageModal = containerImageModal.querySelector(
  ".image-modal__caption"
);

// Input fields
const inputProfileName = formEdit.elements.namedItem("profile-name-input");
const inputProfileJob = formEdit.elements.namedItem("profile-job-input");
const inputPlaceTitle = formAdd.elements.namedItem("place-title-input");
const inputPlaceLink = formAdd.elements.namedItem("place-link-input");

function openModal(modal) {
  modal.classList.add("modal-section_opened");
  document.addEventListener("keydown", onKeydownEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal-section_opened");
  document.removeEventListener("keydown", onKeydownEscape);
}

function closeAllModals() {
  document.querySelectorAll(".modal-section").forEach(closeModal);
}

function onKeydownEscape(evt) {
  switch (evt.key) {
    case "Escape":
      closeAllModals();
      break;
  }
}

function onClickModal(evt) {
  if (
    evt.target.classList.contains("close-button") ||
    evt.target === evt.currentTarget
  ) {
    closeModal(evt.currentTarget);
  }
}

function addModalEvents(modal) {
  modal.addEventListener("click", onClickModal);
}

function enableFormValidation() {
  formValidatorEdit.enableValidation();
  formValidatorAdd.enableValidation();
}

function updateEditFormContent() {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;
}

function updateProfileValues() {
  profileName.textContent = inputProfileName.value;
  profileJob.textContent = inputProfileJob.value;
}

function resetAddFormFields() {
  formAdd.reset();
}

function updateImageModal(cardData) {
  imageImageModal.src = cardData.link;
  imageImageModal.alt = cardData.name;
  captionImageModal.textContent = cardData.name;
}

function openImageModal(cardData) {
  updateImageModal(cardData);
  openModal(containerImageModal);
}

function renderPlaceCard(cardData) {
  const placeCard = new Card(cardData, "#place-template", openImageModal).getCard();
  containerPlaces.prepend(placeCard);
}


function onClickEditButton() {
  updateEditFormContent();
  formValidatorEdit.resetFormValidation();
  openModal(containerEdit);
}

function onSubmitEditForm(evt) {
  evt.preventDefault();
  updateProfileValues();
  closeModal(containerEdit);
}

function onClickAddButton() {
  resetAddFormFields();
  formValidatorAdd.resetFormValidation();
  openModal(containerAdd);
}

function onSubmitAddForm(evt) {
  evt.preventDefault();
  renderPlaceCard({ name: inputPlaceTitle.value, link: inputPlaceLink.value });
  closeModal(containerAdd);
}

initialCards.reverse().forEach(renderPlaceCard);

updateEditFormContent();
enableFormValidation();

// Edit Form Events
buttonEdit.addEventListener("click", onClickEditButton);
formEdit.addEventListener("submit", onSubmitEditForm);

// Add Form Events
buttonAdd.addEventListener("click", onClickAddButton);
formAdd.addEventListener("submit", onSubmitAddForm);

// Modal Events
document
  .querySelectorAll(".modal-section")
  .forEach((modal) => addModalEvents(modal));
