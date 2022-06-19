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
const popupInfoForm = document.querySelector(".popup__info-form");

const userNameInput = document.querySelector(".popup__field_type_name");
const userJobInput = document.querySelector(".popup__field_type_job");

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
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//info
function editPopupInfo() {
  openPopup(popupInfo);
  userNameInput.value = userName.textContent;
  userJobInput.value = userJob.textContent;
}

function submitFormHandlerInfo(evt) {
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
  openPopup(popupPicture);
  popupPictureLink.src = link;
  popupPictureLink.alt = title;
  popupPictureTitle.innerText = title;
}

function createCard(name, link) {
  const cardElement = itemTemplate.cloneNode(true);
  cardElement.querySelector(".elements__title").innerText = name;
  const elImage = cardElement.querySelector(".elements__image");
  elImage.src = link;
  elImage.alt = name;
  //вешаем событие, лайк фотографии
  cardElement
    .querySelector(".elements__like")
    .addEventListener("click", toggleLikeButton);
  //вешаем событие, клик на корзину для удаления
  cardElement
    .querySelector(".elements__delete-button")
    .addEventListener("click", deleteItem);
  //вешаем событие, клик на картинку для открытия
  elImage.addEventListener("click", function () {
    openPicture(link, name);
  });
  return cardElement;
}

function renderItem(name, link) {
  const newElement = createCard(name, link);
  elList.prepend(newElement);
}

function createItem(e) {
  e.preventDefault();
  renderItem(placeTitleInput.value, placeLinkInput.value);
  e.target.reset();
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
  submitFormHandlerInfo(event);
});

//add-place
addPlaceButton.addEventListener("click", () => openPopup(popupAdd));
closePlaceButton.addEventListener("click", () => closePopup(popupAdd));
popupAddForm.addEventListener("submit", createItem);

initialCards.forEach((item) => {
  renderItem(item.name, item.link);
});

//для закрытия фото
closeButtonPicture.addEventListener("click", () => closePopup(popupPicture));
