const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const saveButton = document.querySelector(".popup__save-button");
const popup = document.querySelector(".popup");
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__job");
const popupForm = document.querySelector(".popup__form");

const userNameInput = document.querySelector(".popup__field_type_name");
const userJobInput = document.querySelector(".popup__field_type_job");

function openPopup() {
  popup.classList.remove("popup_view_hidden");
  userNameInput.value = userName.textContent;
  userJobInput.value = userJob.textContent;
}

function closePopup() {
  popup.classList.add("popup_view_hidden");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userJob.textContent = userJobInput.value;
  closePopup();
}

editButton.addEventListener("click", function () {
  openPopup();
});

closeButton.addEventListener("click", function () {
  closePopup();
});

saveButton.addEventListener("submit", function () {
    console.log(2);
    formSubmitHandler();
});
