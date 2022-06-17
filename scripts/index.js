const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const saveButton = document.querySelector(".popup__save-button");
const popup = document.querySelector(".popup");
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__job");
const popupForm = document.querySelector(".popup__info-form");
// для лайка
const elLikes = document.querySelectorAll(".elements__like");

// для info редактирования
const userNameInput = document.querySelector(".popup__field_type_name");
const userJobInput = document.querySelector(".popup__field_type_job");

//popup_place_add
const addPlaceButton = document.querySelector(".profile__add-button")

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

saveButton.addEventListener("click", function (event) {
  formSubmitHandler(event);
});

for (let i = 0; i < elLikes.length; i += 1) {
  const elLike = elLikes[i];

  elLike.addEventListener("click", function (event) {
    event.target.classList.toggle("elements__like_active");
  });
}
