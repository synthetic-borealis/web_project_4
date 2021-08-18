// Containers
const editContainer = document.querySelector(".edit-section");

// Forms
const editForm = document.querySelector(".edit-form");

// Buttons
const btnEdit = document.querySelector(".profile__edit-button");
const btnCloseEditForm = document.querySelector(".edit-form-modal__close-btn");

// Labels, headings, etc.
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

// Input fields
const inputName = document.querySelector(".edit-form__text-input_type_name");
const inputAbout = document.querySelector(".edit-form__text-input_type_about");

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
