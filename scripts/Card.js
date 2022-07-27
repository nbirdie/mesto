export class Card {
  constructor(data, cardSelector, openPicture) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPicture = openPicture;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".elements__image");
    this._setEventListeners();
    this._title = this._element.querySelector(".elements__title");
    this._title.innerText = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    return this._element;
  }

  _handleLikeClick() {
    this._like.classList.toggle("elements__like_active");
  }

  _handleDeleteClick() {
    this._delete.closest(".elements__item").remove();
  }

  _setEventListeners() {
    this._like = this._element.querySelector(".elements__like");
    this._delete = this._element.querySelector(".elements__delete-button");
    this._like.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._delete.addEventListener("click", () => {
      this._handleDeleteClick();
    });
    this._image.addEventListener("click", () => {this._openPicture(this._link, this._name)});
  }
}

