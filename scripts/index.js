// Containers
const containerPlaces = document.querySelector(".places");
const containerEdit = document.querySelector(".modal-section_type_edit");
const containerAdd = document.querySelector(".modal-section_type_add");
const containerImageModal = document.querySelector(".modal-section_type_image");

// Forms
const formEdit = document.querySelector(".form_type_edit");
const formAdd = document.querySelector(".form_type_add");

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
const placeTemplate = document.querySelector("#place-template").content;

function clearFormErrors(modal) {
  const formElement = modal.querySelector(".form");
  if (formElement) {
    resetFormValidation(formElement, formClassList);
  }
}

function onKeydownEscape(evt) {
  switch (evt.key) {
    case "Escape":
      closeAllModals();
      break;
  }
}

function openModal(modal) {
  modal.classList.add("modal-section_opened");
  document.addEventListener("keydown", onKeydownEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal-section_opened");
  document.removeEventListener("keydown", onKeydownEscape);
  clearFormErrors(modal);
}

function closeAllModals() {
  document.querySelectorAll(".modal-section").forEach(closeModal);
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

function onClickImage(evt, cardData) {
  openImageModal(cardData);
}

function onClickLikeButton(evt) {
  evt.target.classList.toggle("place__like-button_active");
}

function onClickDeleteButton(evt) {
  evt.target.closest(".place").remove();
}

function createPlaceCard(cardData) {
  const placeElement = placeTemplate.querySelector(".place").cloneNode(true);
  const placeImage = placeElement.querySelector(".place__image");
  const buttonLike = placeElement.querySelector(".place__like-button");
  const buttonDelete = placeElement.querySelector(".place__delete-button");

  placeImage.style.backgroundImage = `url("${cardData.link}")`;
  placeImage.ariaLabel = cardData.name;
  placeElement.querySelector(".place__caption").textContent = cardData.name;

  placeImage.addEventListener("click", (evt) => onClickImage(evt, cardData));
  buttonLike.addEventListener("click", onClickLikeButton);
  buttonDelete.addEventListener("click", onClickDeleteButton);

  return placeElement;
}

function renderPlaceCard(cardData) {
  const placeCard = createPlaceCard(cardData);
  containerPlaces.prepend(placeCard);
}

initialCards.reverse().forEach(renderPlaceCard);

updateEditFormContent();
enableValidation(formClassList);

function onClickEditButton() {
  updateEditFormContent();
  openModal(containerEdit);
}

function onSubmitEditForm(evt) {
  evt.preventDefault();
  updateProfileValues();
  closeModal(containerEdit);
}

function onClickAddButton() {
  resetAddFormFields();
  openModal(containerAdd);
}

function onSubmitAddForm(evt) {
  evt.preventDefault();
  renderPlaceCard({ name: inputPlaceTitle.value, link: inputPlaceLink.value });
  closeModal(containerAdd);
}

// Edit Form
buttonEdit.addEventListener("click", onClickEditButton);
formEdit.addEventListener("submit", onSubmitEditForm);

// Add Form
buttonAdd.addEventListener("click", onClickAddButton);
formAdd.addEventListener("submit", onSubmitAddForm);

// All Modals
document
  .querySelectorAll(".modal-section")
  .forEach((modal) => addModalEvents(modal));
