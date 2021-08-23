// Containers
const editContainer = document.querySelector(".modal-section_type_edit");
const placesSection = document.querySelector(".places");

// Forms
const editForm = document.querySelector(".edit-form");

// Buttons
const btnEdit = document.querySelector(".profile__edit-button");
const btnCloseEditForm = document.querySelector(".edit-form-modal__close-btn");

// Labels, headings, etc.
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// Input fields
const inputName = document.querySelector(".edit-form__text-input_type_name");
const inputJob = document.querySelector(".edit-form__text-input_type_job");

function updateFormContent() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function toggleEditFormVisibility(evt) {
  if (evt.target === btnEdit) {
    updateFormContent();
    editContainer.classList.add("modal-section_opened");
  } else if ((evt.target === btnCloseEditForm)) {
    editContainer.classList.remove("modal-section_opened");
  }
}

function saveProfile(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  editContainer.classList.remove("edit-section_opened");
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
  const btnLike = placeElement.querySelector(".place__like-button");
  btnLike.addEventListener("click", (evt) => evt.target.classList.toggle("place__like-button_active"));
  const btnDelete = placeElement.querySelector(".place__delete-button");
  btnDelete.addEventListener("click", () => placeElement.closest(".place").remove());

  placesSection.append(placeElement);
}
initialCards.forEach((card) => addPlaceCard(card.name, card.link));

btnEdit.addEventListener("click", toggleEditFormVisibility);
btnCloseEditForm.addEventListener("click", toggleEditFormVisibility);
editForm.addEventListener("submit", saveProfile);
