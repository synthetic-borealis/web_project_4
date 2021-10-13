// Form Classes
const formClassList = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  fieldsetSelector: ".form__fieldset",
  errorSelector: ".form__error",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
};

// Popup Classes
const popupClassList = {
  openedPopup: "popup-section_opened",
  closeButton: "close-button",
  imageSelector: ".image-popup__image",
  imageCaptionSelector: ".image-popup__caption"
};

// Card Classes
const cardClassList = {
  cardSelector: ".card",
  imageSelector: ".card__image",
  captionSelector: ".card__caption",
  likeButtonSelector: ".card__like-button",
  activeLikeButtonClass: "card__like-button_active",
  deleteButtonSelector: ".card__delete-button"
};

// API Options
const apiOptions = {
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "d93b3a72-c2aa-468d-b021-56b5e633ed52",
    "Content-Type": "application/json"
  },
};

// Container Selectors
const containerConfirmSelector = ".popup-section_type_confirm";
const containerPlacesSelector = ".places";
const containerEditSelector = ".popup-section_type_edit";
const containerAddSelector = ".popup-section_type_add";
const containerChangeAvatarSelector = ".popup-section_type_change-avatar";
const containerImagePopupSelector = ".popup-section_type_image";

// Labels, headings, etc.
const profileNameSelector = ".profile__name";
const profileJobSelector = ".profile__job";
const profileAvatarSelector = ".profile__avatar";

// Template Selectors
const cardTemplateSelector = "#card-template";

export {
  formClassList,
  popupClassList,
  cardClassList,
  apiOptions,
  containerConfirmSelector,
  containerPlacesSelector,
  containerEditSelector,
  containerAddSelector,
  containerChangeAvatarSelector,
  containerImagePopupSelector,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  cardTemplateSelector
};
