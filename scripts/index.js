import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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
const editInfoButton = document.querySelector(".profile__edit-button");
const closeInfoButton = document.querySelector(
  ".popup__close-button_place_info"
);
const popupInfo = document.querySelector(".popup_place_info");
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__job");
const popupInfoForm = document.querySelector(".popup__form_type_info-form");

const userNameInput = document.querySelector(".popup__field_type_name");
const userJobInput = document.querySelector(".popup__field_type_job");

//для добавления места
const addPlaceButton = document.querySelector(".profile__add-button");
const closePlaceButton = document.querySelector(
  ".popup__close-button_place_add"
);
const popupAdd = document.querySelector(".popup_place_add-picture");
const popupAddForm = document.querySelector(".popup__form_type_add-form");
const placeTitleInput = document.querySelector(".popup__field_type_title");
const placeLinkInput = document.querySelector(".popup__field_type_link");
//для открытия фотографии
const popupPicture = document.querySelector(".popup_place_open-picture");
const popupPictureLink = document.querySelector(".popup__picture");
const popupPictureTitle = document.querySelector(".popup__title-picture");
const closeButtonPicture = document.querySelector(
  ".popup__close-button_place_open-picture"
);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_visible",
};

const forms = Array.from(document.querySelectorAll(".popup__form"));

//влючаем валидацию всех форм на странице

const formAdd = new FormValidator(popupAdd, validationConfig);
formAdd.enableValidation();

const formInfo = new FormValidator(popupInfo, validationConfig);
formInfo.enableValidation();

//ФУНКЦИИ
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function closePopupByOverlayClick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function openPopup(popup) {
  document.addEventListener("keydown", closePopupByEsc);
  popup.addEventListener("click", closePopupByOverlayClick);
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
  popup.removeEventListener("click", closePopupByOverlayClick);
}

//info
function editPopupInfo() {
  openPopup(popupInfo);
  formInfo.activateButtonSate();
  userNameInput.value = userName.textContent;
  userJobInput.value = userJob.textContent;
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userJob.textContent = userJobInput.value;
  closePopup(popupInfo);
}

function toggleLikeButton(event) {
  event.target.classList.toggle("elements__like_active");
}

function deleteItem(event) {
  event.target.closest(".elements__item").remove();
}
//открытие картинок
function openPicture(link, title) {
  popupPictureLink.src = link;
  popupPictureLink.alt = title;
  popupPictureTitle.innerText = title;
  openPopup(popupPicture);
}

function createCards(item) {
  const card = new Card(item, ".elements-template", openPicture);
  const cardElement = card.createCard();

  document.querySelector(".elements__list").prepend(cardElement);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = placeTitleInput.value;
  newCard.link = placeLinkInput.value;
  createCards(newCard);
  evt.target.reset();
  formAdd.deactivateButtonState();
  closePopup(popupAdd);
}

//ОБРАБОТЧИКИ
//info
editInfoButton.addEventListener("click", function () {
  editPopupInfo();
});
closeInfoButton.addEventListener("click", function () {
  closePopup(popupInfo);
});
popupInfoForm.addEventListener("submit", function (event) {
  handleEditProfileFormSubmit(event);
});

//add-place
addPlaceButton.addEventListener("click", () => openPopup(popupAdd));
closePlaceButton.addEventListener("click", () => closePopup(popupAdd));
popupAddForm.addEventListener("submit", handleAddCardFormSubmit);

//для закрытия фото
closeButtonPicture.addEventListener("click", () => closePopup(popupPicture));

initialCards.forEach((item) => {
  createCards(item);
});
