// Imports
// Components
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Containers
import {
  initialCards,
  containerPlacesSelector,
  containerEditSelector,
  containerAddSelector,
  containerImagePopupSelector,
  profileNameSelector,
  profileJobSelector
} from "../utils/constants.js";

// Forms
const formEdit = document.querySelector(".form_type_edit");

// Buttons
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".add-button");

// Input fields
const inputProfileName = formEdit.elements.namedItem("profile-name-input");
const inputProfileJob = formEdit.elements.namedItem("profile-job-input");

// Templates
const cardTemplateSelector = "#card-template";

// User Info
const userInfo = new UserInfo(profileNameSelector, profileJobSelector);

// Popups
const popupImage = new PopupWithImage(containerImagePopupSelector);
popupImage.setEventListeners();

function updateEditFormContent(data) {
  inputProfileName.value = data.name;
  inputProfileJob.value = data.job;
}

function onSubmitEditForm(inputs) {
  console.log(inputs);
  userInfo.setUserInfo(inputs);
  popupEditForm.close();
  updateEditFormContent(userInfo.getUserInfo());
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

updateEditFormContent(userInfo.getUserInfo());

// Form Popup Events
buttonEdit.addEventListener("click", () => {
  updateEditFormContent(userInfo.getUserInfo());
  popupEditForm.open();
});
buttonAdd.addEventListener("click", () => {
  popupAddForm.resetForm();
  popupAddForm.open();
});
