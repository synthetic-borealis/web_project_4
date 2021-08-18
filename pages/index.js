// Containers
let editContainer = document.querySelector(".edit-section");

// Forms
let editForm = document.querySelector(".edit-form");

// Buttons
let btnEdit = document.querySelector(".profile__edit-button");
let btnCloseEditForm = document.querySelector(".edit-form-modal__close-btn");
let btnLikeButtons = document.querySelectorAll(".like-button");

// Labels, headings, etc.
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

// Input fields
let inputName = document.querySelector(".edit-form__text-input_type_name");
let inputJob = document.querySelector(".edit-form__text-input_type_job");

function updateFormContent() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
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
  profileJob.textContent = inputJob.value;

  editContainer.classList.remove("edit-section_opened");
}
editForm.addEventListener("submit", saveProfile);

function toggleLikeButton(evt) {
  evt.target.classList.toggle("like-button_active");
}
for (let i = 0; i < btnLikeButtons.length; i++) {
  btnLikeButtons[i].addEventListener("click", toggleLikeButton);
}
