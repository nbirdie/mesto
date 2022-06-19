const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// для info редактирования
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button_place_info");
const saveButton = document.querySelector(".popup__save-button");
const popupInfo = document.querySelector(".popup_place_info");
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__job");
const popupInfoForm = document.querySelector(".popup__info-form");

const userNameInput = document.querySelector(".popup__field_type_name");
const userJobInput = document.querySelector(".popup__field_type_job");

// для лайка
const elLikes = document.querySelectorAll(".elements__like");

//для добавления места
const addPlaceButton = document.querySelector(".profile__add-button");
const closePlaceButton = document.querySelector(
  ".popup__close-button_place_add"
);
const popupAdd = document.querySelector(".popup_place_add-picture");
const itemTemplate = document.querySelector(".elements-template").content;
const elList = document.querySelector(".elements__list");
const popupAddForm = document.querySelector(".popup__add-form");
const placeTitleInput = document.querySelector(".popup__field_type_title");
const placeLinkInput = document.querySelector(".popup__field_type_link");
//для открытия фотографии
const popupPicture = document.querySelector(".popup_place_open-picture");
const popupPictureLink = document.querySelector(".popup__picture");
const popupPictureTitle = document.querySelector(".popup__title-picture");
const closeButtonPicture = document.querySelector(
  ".popup__close-button_place_open-picture"
);

//ФУНКЦИИ
//info
function openPopupInfo() {
  popupInfo.classList.remove("popup_view_hidden");
  userNameInput.value = userName.textContent;
  userJobInput.value = userJob.textContent;
}

function closePopupInfo() {
  popupInfo.classList.add("popup_view_hidden");
}

function formSubmitHandlerInfo(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userJob.textContent = userJobInput.value;
  closePopup();
}
//add-place
function openPopupAdd() {
  popupAdd.classList.remove("popup_view_hidden");
}

function closePopupAdd() {
  popupAdd.classList.add("popup_view_hidden");
}

function likeButton(event) {
  event.target.classList.toggle("elements__like_active");
}

function deleteItem(event) {
  event.target.closest(".elements__item").remove();
}
//открытие картинок
function openPicture(link, title) {
  popupPicture.classList.remove("popup_view_hidden");
  popupPictureLink.src = link;
  popupPictureTitle.innerText = title;
}

function renderItem(name, link) {
  const newElement = itemTemplate.cloneNode(true);
  newElement.querySelector(".elements__title").innerText = name;
  newElement.querySelector(".elements__image").src = link;
  //вешаем событие, лайк фотографии
  newElement
    .querySelector(".elements__like")
    .addEventListener("click", likeButton);
  //вешаем событие, клик на корзину для удаления
  newElement
    .querySelector(".elements__delete-button")
    .addEventListener("click", deleteItem);
  //вешаем событие, клик на картинку для открытия
  const elImage = newElement.querySelector(".elements__image");
  elImage.addEventListener("click", function () {
    openPicture(link, name);
  });

  elList.prepend(newElement);
}

function createItem(e) {
  e.preventDefault();
  renderItem(placeTitleInput.value, placeLinkInput.value);
  e.target.reset();
  closePopupAdd();
}

function closePopupPicture() {
  popupPicture.classList.add("popup_view_hidden");
}

//ОБРАБОТЧИКИ
//info
editButton.addEventListener("click", function () {
  openPopupInfo();
});
closeButton.addEventListener("click", function () {
  closePopupInfo();
});
saveButton.addEventListener("click", function (event) {
  formSubmitHandlerInfo(event);
});

//add-place
addPlaceButton.addEventListener("click", openPopupAdd);
closePlaceButton.addEventListener("click", closePopupAdd);
popupAddForm.addEventListener("submit", createItem);

initialCards.forEach((item) => {
  renderItem(item.name, item.link);
});

//для закрытия фото
closeButtonPicture.addEventListener("click", closePopupPicture);
