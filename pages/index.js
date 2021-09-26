// Imports
// Components
import Card from "../components/Card.js";
import FormValidatior from "../components/FormValidator.js";
import Section from "../components/Section.js";

// Constants & Utilities
import { formClassList } from "../utils/form-class-list.js";
import { initialCards } from "../utils/initial-cards.js";

// Containers
const containerPlacesSelector = ".places";
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

// Templates
const cardTemplateSelector = "#card-template";

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

const sectionPlaces = new Section({ items: initialCards.reverse(), renderer: (item) => {
  const placeCard = new Card(item, cardTemplateSelector, openImageModal).getCard();
  sectionPlaces.addItem(placeCard);
} }, containerPlacesSelector);
sectionPlaces.renderItems();

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
  const cardElement = new Card({
    name: inputPlaceTitle.value,
    link: inputPlaceLink.value },
    cardTemplateSelector,
    openImageModal).getCard();
  sectionPlaces.addItem(cardElement);
  closeModal(containerAdd);
}

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
