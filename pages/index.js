// Containers
const editContainer = document.querySelector(".edit-section");

// Forms
const editForm = document.querySelector(".edit-form");

// Buttons
const btnEdit = document.querySelector(".profile__edit-button");
const btnCloseEditForm = document.querySelector(".edit-form-modal__close-btn");
const btnLikeButtons = document.querySelectorAll(".like-button");

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
