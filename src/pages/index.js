// Imports
// Components
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import ConfirmPopup from "../components/ConfirmPopup.js";
import UserInfo from "../components/UserInfo.js";

// Containers
import {
  containerConfirmSelector,
  containerPlacesSelector,
  containerEditSelector,
  containerAddSelector,
  containerImagePopupSelector,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  cardTemplateSelector,
  apiOptions
} from "../utils/constants.js";

// API Handler
const api = new Api(apiOptions);

api.getRemoteData()
  .then(([userData, initialCards]) => {

    // Forms
    const formEdit = document.querySelector(".form_type_edit");

    // Buttons
    const buttonEdit = document.querySelector(".profile__edit-button");
    const buttonAdd = document.querySelector(".add-button");

    // Input fields
    const inputProfileName = formEdit.elements.namedItem("profile-name-input");
    const inputProfileJob = formEdit.elements.namedItem("profile-job-input");

    // User Info & Avatar
    const profileAvatar = document.querySelector(profileAvatarSelector);

    function setAvatar(avatarLink) {
      profileAvatar.src = avatarLink;
      profileAvatar.alt = userData.name;
    }
    setAvatar(userData.avatar);

    const userInfo = new UserInfo(profileNameSelector, profileJobSelector);
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.job
    });

    // Popups & Cards
    // Confirm Popup
    const confirmPopup = new ConfirmPopup(containerConfirmSelector);
    confirmPopup.setEventListeners();

    // Place Cards
    function getNewCard(cardData) {
      // {data, cardSelector, handleCardClick, confirmPopup}
      const cardElement = new Card({
        data: cardData,
        cardSelector: cardTemplateSelector,
        handleCardClick: popupImage.open,
        api: api
      }).getCard();

        return cardElement;
    }

    // Image Popup
    const popupImage = new PopupWithImage(containerImagePopupSelector);
    popupImage.setEventListeners();

    // Edit Form Popup
    function updateEditFormContent(data) {
      inputProfileName.value = data.name;
      inputProfileJob.value = data.job;
    }

    function handleSubmitEditForm(inputs) {
      userInfo.setUserInfo(inputs);
      popupEditForm.close();
      updateEditFormContent(userInfo.getUserInfo());
    }

    const popupEditForm = new PopupWithForm(handleSubmitEditForm, containerEditSelector);
    popupEditForm.setEventListeners();

    // Add Form Popup
    function onSubmitAddForm(inputValues) {
      const cardData = {
        name: inputValues.title,
        link: inputValues.link
      };

      const cardElement = getNewCard(cardData);

      sectionPlaces.addItem(cardElement);
      popupAddForm.close();
    }

    const popupAddForm = new PopupWithForm(onSubmitAddForm, containerAddSelector);
    popupAddForm.setEventListeners();

    const sectionPlaces = new Section({ items: initialCards.reverse(), renderer: (item) => {
      const placeCard = getNewCard(item);
      sectionPlaces.addItem(placeCard);
    } }, containerPlacesSelector);
    sectionPlaces.renderItems();

    // Form Popup Events
    buttonEdit.addEventListener("click", () => {
      updateEditFormContent(userInfo.getUserInfo());
      popupEditForm.resetFormValidation();
      popupEditForm.open();
    });
    buttonAdd.addEventListener("click", () => {
      popupAddForm.open();
    });
  });
