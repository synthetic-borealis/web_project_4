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
  containerChangeAvatarSelector,
  containerImagePopupSelector,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  cardTemplateSelector,
  apiOptions,
} from "../utils/constants.js";

// API Handler
const api = new Api(apiOptions);

api.getRemoteData().then(([userData, initialCards]) => {
  // Forms
  const formEdit = document.querySelector(".form_type_edit");

  // Buttons
  const buttonEdit = document.querySelector(".profile__edit-button");
  const buttonSaveProfile = document.querySelector("#btn-profile-save");
  const buttonChangeAvatar = document.querySelector("#btn-change-avatar");
  const buttonSaveAvatar = document.querySelector("#btn-save-avatar");
  const buttonAdd = document.querySelector(".add-button");

  // Input fields
  const inputProfileName = formEdit.elements.namedItem("profile-name-input");
  const inputProfileJob = formEdit.elements.namedItem("profile-job-input");

  // User Info & Avatar
  const profileAvatar = document.querySelector(profileAvatarSelector);

  function setAvatar(avatarLink) {
    profileAvatar.src = avatarLink;
    profileAvatar.style.backgroundImage = `url(${avatarLink})`;
    profileAvatar.ariaLabel = userData.name;
  }
  setAvatar(userData.avatar);

  const userInfo = new UserInfo(profileNameSelector, profileJobSelector);
  userInfo.setUserInfo({
    name: userData.name,
    job: userData.about,
  });

  // Popups & Cards
  // Confirm Popup
  const confirmPopup = new ConfirmPopup(containerConfirmSelector);
  confirmPopup.setEventListeners();

  // Place Cards
  function getNewCard(cardData) {
    const cardElement = new Card({
      data: cardData,
      cardSelector: cardTemplateSelector,
      handleCardClick: () => {
        popupImage.updateContent(cardData);
        popupImage.open();
      },
      api: api,
      userId: userData._id
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
    buttonSaveProfile.textContent = "Saving...";
    api
      .updateUserInfo(inputs.name, inputs.job)
      .then(() => {
        userInfo.setUserInfo(inputs);
        updateEditFormContent(userInfo.getUserInfo());
      })
      .catch((err) => console.log)
      .finally(() => {
        buttonSaveProfile.textContent = "Save";
        popupEditForm.close();
      });
  }

  const popupEditForm = new PopupWithForm(
    handleSubmitEditForm,
    containerEditSelector
  );
  popupEditForm.setEventListeners();

  // Add Form Popup
  function onSubmitAddForm(inputValues) {
    const cardData = {
      name: inputValues.title,
      link: inputValues.link,
    };

    const cardElement = getNewCard(cardData);

    sectionPlaces.addItem(cardElement);
    popupAddForm.close();
  }

  const popupAddForm = new PopupWithForm(onSubmitAddForm, containerAddSelector);
  popupAddForm.setEventListeners();

  // Change Avatar (Profile Picture) Popup
  function onSubmitChangeAvatar(inputs) {
    console.log(inputs);
    buttonSaveAvatar.textContent = "Saving...";
    api
      .updateUserAvatar(inputs.avatar)
      .then(() => {
        setAvatar(avatar);
      })
      .catch((err) => console.log)
      .finally(() => {
        buttonSaveAvatar.textContent = "Save";
        popupChangeAvatarForm.close();
      });
  }
  const popupChangeAvatarForm = new PopupWithForm(
    onSubmitChangeAvatar,
    containerChangeAvatarSelector
  );
  popupChangeAvatarForm.setEventListeners();

  // Places Section
  const sectionPlaces = new Section(
    {
      items: initialCards.reverse(),
      renderer: (item) => {
        const placeCard = getNewCard(item);
        sectionPlaces.addItem(placeCard);
      },
    },
    containerPlacesSelector
  );
  sectionPlaces.renderItems();

  // Form Popup Events
  buttonEdit.addEventListener("click", () => {
    updateEditFormContent(userInfo.getUserInfo());
    popupEditForm.resetFormValidation();
    popupEditForm.open();
  });
  buttonAdd.addEventListener("click", popupAddForm.open);
  buttonChangeAvatar.addEventListener("click", popupChangeAvatarForm.open);
});
