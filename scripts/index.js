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

// Input fields
const inputProfileName = formEdit.elements.namedItem("profile-name-input");
const inputProfileJob = formEdit.elements.namedItem("profile-job-input");
const inputPlaceTitle = formAdd.elements.namedItem("place-title-input");
const inputPlaceLink = formAdd.elements.namedItem("place-link-input");

function openModal(modal) {
  const formElement = modal.querySelector(".form");
  if (formElement) {
    resetFormValidation(formElement, formClassList);
  }

  modal.classList.add("modal-section_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal-section_opened");
}

function closeAllModals() {
  document.querySelectorAll(".modal-section").forEach((modal) => closeModal(modal));
}

function onClickModal(evt) {
  if (evt.target.classList.contains("close-button") || evt.target === evt.currentTarget) {
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
  inputPlaceTitle.value = "";
  inputPlaceLink.value = "";
}

function updateImageModal(name, link) {
  const imageModalImage = containerImageModal.querySelector(".image-modal__image");
  const imageModalCaption = containerImageModal.querySelector(".image-modal__caption");

  imageModalImage.src = link;
  imageModalImage.alt = name;
  imageModalCaption.textContent = name;
}

function openImageModal(name, link) {
  updateImageModal(name, link);
  openModal(containerImageModal);
}

function onClickPlaceCard(evt, name, link) {
  if (evt.target.classList.contains("place__image")) {
    openImageModal(name, link);
  } else if (evt.target.classList.contains("place__like-button")) {
    evt.target.classList.toggle("place__like-button_active");
  } else if (evt.target.classList.contains("place__delete-button")) {
    evt.currentTarget.remove();
  }
}

function createPlaceCard(name, link) {
  const placeTemplate = document.querySelector("#place-template").content;
  const placeElement = placeTemplate.querySelector(".place").cloneNode(true);

  const placeImage = placeElement.querySelector(".place__image");
  placeImage.style.backgroundImage = `url("${link}")`;
  placeImage.ariaLabel = name;
  placeElement.querySelector(".place__caption").textContent = name;

  placeElement.addEventListener("click", (evt) => onClickPlaceCard(evt, name, link));

  return placeElement;
}

function renderPlaceCard(name, link) {
  const placeCard = createPlaceCard(name, link);
  containerPlaces.prepend(placeCard);
}

initialCards.reverse().forEach((card) => renderPlaceCard(card.name, card.link));

updateEditFormContent();
enableValidation(formClassList);

// Edit Form
buttonEdit.addEventListener("click", () => {
  updateEditFormContent();
  openModal(containerEdit);
});
formEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  updateProfileValues();
  closeModal(containerEdit);
});

// Add Form
buttonAdd.addEventListener("click", () => {
  resetAddFormFields();
  openModal(containerAdd)
});
formAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();

  renderPlaceCard(inputPlaceTitle.value, inputPlaceLink.value);

  closeModal(containerAdd);
});

// All Modals
document.querySelectorAll(".modal-section").forEach((modal) => addModalEvents(modal));
document.addEventListener("keydown", (evt) => {
  switch (evt.key) {
    case "Escape":
      closeAllModals();
      break;
  }
});
