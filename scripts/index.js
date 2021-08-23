// Containers
const placesSection = document.querySelector(".places");
const editContainer = document.querySelector(".modal-section_type_edit");
const addContainer = document.querySelector(".modal-section_type_add");
const imageModalContainer = document.querySelector(".modal-section_type_image");

// Forms
const editForm = document.querySelector(".form_type_edit");
const addForm = document.querySelector(".form_type_add");

// Buttons
const btnEdit = document.querySelector(".profile__edit-button");
const btnAdd = document.querySelector(".add-button");

// Labels, headings, etc.
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// Input fields
const inputProfileName = document.querySelector(".form__text-input_type_profile-name");
const inputProfileJob = document.querySelector(".form__text-input_type_profile-job");
const inputPlaceTitle = document.querySelector(".form__text-input_type_place-title");
const inputPlaceLink = document.querySelector(".form__text-input_type_place-link");

function updateEditFormContent() {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;
}

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

function addPlaceCard(name, link) {
  const placeTemplate = document.querySelector("#place-template").content;
  const placeElement = placeTemplate.querySelector(".place").cloneNode(true);

  const placeImage = placeElement.querySelector(".place__image");
  placeImage.style.backgroundImage = `url("${link}")`;
  placeImage.ariaLabel = name;
  placeElement.querySelector(".place__caption").textContent = name;

  placeImage.addEventListener("click", () => {
    const modalImage = imageModalContainer.querySelector(".image-modal__image");
    const modalCaption = imageModalContainer.querySelector(".image-modal__caption");

    modalImage.src = link;
    modalImage.alt = name;
    modalCaption.textContent = name;

    imageModalContainer.classList.add("modal-section_opened");
  });

  const btnLike = placeElement.querySelector(".place__like-button");
  btnLike.addEventListener("click", (evt) => evt.target.classList.toggle("place__like-button_active"));
  const btnDelete = placeElement.querySelector(".place__delete-button");
  btnDelete.addEventListener("click", () => placeElement.closest(".place").remove());

  placesSection.append(placeElement);
}
initialCards.forEach((card) => addPlaceCard(card.name, card.link));

// Edit Form
btnEdit.addEventListener("click", () => {
  updateEditFormContent();
  editContainer.classList.add("modal-section_opened");
});
editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  profileName.textContent = inputProfileName.value;
  profileJob.textContent = inputProfileJob.value;

  editContainer.classList.remove("modal-section_opened");
});

// Add Form
btnAdd.addEventListener("click", () => addContainer.classList.add("modal-section_opened"));
addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  addPlaceCard(inputPlaceTitle.value, inputPlaceLink.value);

  addContainer.classList.remove("modal-section_opened");
});

// All Modals
document.querySelectorAll(".close-button").forEach((button) => {
  button.addEventListener("click", (evt) => {
    evt.target.closest(".modal-section").classList.remove("modal-section_opened");
  });
});
