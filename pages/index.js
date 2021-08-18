// Containers
let editContainer = document.querySelector(".edit-section");

// Forms
let editForm = document.querySelector(".edit-form");

// Buttons
let btnEdit = document.querySelector(".profile__edit-button");
let btnCloseEditForm = document.querySelector(".edit-form-modal__close-btn");

// Labels, headings, etc.
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");

// Input fields
let inputName = document.querySelector(".edit-form__text-input_type_name");
let inputAbout = document.querySelector(".edit-form__text-input_type_about");

function updateFormContent() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function toggleEditFormVisibility(evt) {
  if (evt.target === btnEdit) {
    updateFormContent();
    editContainer.classList.add("edit-section_opened");
  } else if ((evt.target === btnCloseEditForm)) {
    editContainer.classList.remove("edit-section_opened");
  }
}
btnEdit.addEventListener("click", toggleEditFormVisibility);
btnCloseEditForm.addEventListener("click", toggleEditFormVisibility);

function saveProfile(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;

  editContainer.classList.remove("edit-section_opened");
}
editForm.addEventListener("submit", saveProfile);
