// Imports
// Components
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

// Containers
import {
  initialCards,
  containerPlacesSelector,
  containerEditSelector,
  containerAddSelector,
  containerImagePopupSelector,
} from "../utils/constants.js";

// Forms
const formEdit = document.querySelector(".form_type_edit");

// Buttons
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".add-button");

// Labels, headings, etc.
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// Input fields
const inputProfileName = formEdit.elements.namedItem("profile-name-input");
const inputProfileJob = formEdit.elements.namedItem("profile-job-input");

// Templates
const cardTemplateSelector = "#card-template";

// Popups
const popupImage = new PopupWithImage(containerImagePopupSelector);
popupImage.setEventListeners();

function updateEditFormContent() {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;
}

function updateProfileValues({ name, job }) {

  profileName.textContent = name;
  profileJob.textContent = job;
}

function onSubmitEditForm(inputs) {
  updateProfileValues(inputs);
  popupEditForm.close();
  updateEditFormContent();
}

const popupEditForm = new PopupWithForm(onSubmitEditForm, containerEditSelector);
popupEditForm.setEventListeners();

function onSubmitAddForm(inputValues) {
  const cardData = {
    name: inputValues.title,
    link: inputValues.link
  };

  const cardElement = new Card(
    cardData,
    cardTemplateSelector,
    () => popupImage.open(cardData)).getCard();

  sectionPlaces.addItem(cardElement);
  popupAddForm.close();
}

const popupAddForm = new PopupWithForm(onSubmitAddForm, containerAddSelector);
popupAddForm.setEventListeners();

const sectionPlaces = new Section({ items: initialCards.reverse(), renderer: (item) => {
  const placeCard = new Card(item, cardTemplateSelector, () => popupImage.open(item)).getCard();
  sectionPlaces.addItem(placeCard);
} }, containerPlacesSelector);
sectionPlaces.renderItems();

updateEditFormContent();

// Form Popup Events
buttonEdit.addEventListener("click", () => popupEditForm.open());
buttonAdd.addEventListener("click", () => popupAddForm.open());
