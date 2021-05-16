import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleInputName(e) {
    setCardName(e.target.value);
  }

  function handleInputLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(cardName, cardLink);
  }

  function handleClose() {
    setCardName("");
    setCardLink("");
    props.closeCallback();
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      closeCallback={handleClose}
      onSubmit={handleSubmit}
      name="addCard"
      title="Новое место"
      btnName="Сохранить"
      btnIsActive={true}
    >
      <input
        id="title-input"
        required
        minLength={2}
        maxLength={30}
        name="name"
        value={cardName}
        onChange={handleInputName}
        autoComplete="off"
        placeholder="Название"
        className="popup__input"
        type="text"
      />
      <span className="popup__error popup__error_title-input" />
      <input
        id="image-input"
        required
        name="link"
        value={cardLink}
        onChange={handleInputLink}
        type="url"
        autoComplete="off"
        placeholder="Ссылка на картинку"
        className="popup__input"
      />
      <span className="popup__error popup__error_image-input" />
    </PopupWithForm>
  );
}
