// Imports
// Components
import Card from "../components/Card.js";
import FormValidatior from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";

// Constants & Utilities
import { formClassList } from "../utils/form-class-list.js";
import { initialCards } from "../utils/initial-cards.js";

// Containers
const containerPlacesSelector = ".places";
const containerEdit = document.querySelector(".popup-section_type_edit");
const containerAdd = document.querySelector(".popup-section_type_add");
const containerImagePopup = document.querySelector(".popup-section_type_image");
const containerImagePopupSelector = ".popup-section_type_image";

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

// Input fields
const inputProfileName = formEdit.elements.namedItem("profile-name-input");
const inputProfileJob = formEdit.elements.namedItem("profile-job-input");
const inputPlaceTitle = formAdd.elements.namedItem("place-title-input");
const inputPlaceLink = formAdd.elements.namedItem("place-link-input");

// Templates
const cardTemplateSelector = "#card-template";

// Popups
const popupImage = new PopupWithImage(containerImagePopupSelector);
popupImage.setEventListeners();

function openPopup(popup) {
  popup.classList.add("popup-section_opened");
  document.addEventListener("keydown", onKeydownEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup-section_opened");
  document.removeEventListener("keydown", onKeydownEscape);
}

function closeAllPopups() {
  document.querySelectorAll(".popup-section").forEach(closePopup);
}

function onKeydownEscape(evt) {
  switch (evt.key) {
    case "Escape":
      closeAllPopups();
      break;
  }
}

function onClickPopup(evt) {
  if (
    evt.target.classList.contains("close-button") ||
    evt.target === evt.currentTarget
  ) {
    closePopup(evt.currentTarget);
  }
}

function addPopupEvents(popup) {
  popup.addEventListener("click", onClickPopup);
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

const sectionPlaces = new Section({ items: initialCards.reverse(), renderer: (item) => {
  const placeCard = new Card(item, cardTemplateSelector, () => popupImage.open(item)).getCard();
  sectionPlaces.addItem(placeCard);
} }, containerPlacesSelector);
sectionPlaces.renderItems();

function onClickEditButton() {
  updateEditFormContent();
  formValidatorEdit.resetFormValidation();
  openPopup(containerEdit);
}

function onSubmitEditForm(evt) {
  evt.preventDefault();
  updateProfileValues();
  closePopup(containerEdit);
}

function onClickAddButton() {
  resetAddFormFields();
  formValidatorAdd.resetFormValidation();
  openPopup(containerAdd);
}

function onSubmitAddForm(evt) {
  evt.preventDefault();
  const cardData = {
    name: inputPlaceTitle.value,
    link: inputPlaceLink.value
  };
  const cardElement = new Card(
    cardData,
    cardTemplateSelector,
    () => popupImage.open(cardData)).getCard();
  sectionPlaces.addItem(cardElement);
  closePopup(containerAdd);
}

updateEditFormContent();
enableFormValidation();

// Edit Form Events
buttonEdit.addEventListener("click", onClickEditButton);
formEdit.addEventListener("submit", onSubmitEditForm);

// Add Form Events
buttonAdd.addEventListener("click", onClickAddButton);
formAdd.addEventListener("submit", onSubmitAddForm);

// Popup Events
// document
//   .querySelectorAll(".popup-section")
//   .forEach((popup) => addPopupEvents(popup));
