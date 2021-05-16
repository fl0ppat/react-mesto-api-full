import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const user = useContext(CurrentUserContext);

  const [userName, setUserName] = useState(user.name);
  const [description, setDescription] = useState(user.about);

  function handleInputName(e) {
    setUserName(e.target.value);
  }

  function handleInputDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: userName,
      about: description,
    });
  }

  useEffect(() => {
    setUserName(user.name);
    setDescription(user.about);
  }, [user]);

  return (
    <>
      <PopupWithForm
        isOpen={props.isOpen}
        closeCallback={props.closeCallback}
        onSubmit={handleSubmit}
        btnIsActive={true}
        name="dataEdit"
        title="Редактировать профиль"
        btnName="Сохранить"
      >
        <input
          id="name-input"
          autoComplete="off"
          required
          minLength={2}
          maxLength={40}
          value={userName}
          onChange={handleInputName}
          name="name"
          placeholder="Имя"
          className="popup__input"
          type="text"
        />
        <span className="popup__error popup__error_name-input" />
        <input
          id="subtitle-input"
          autoComplete="off"
          required
          minLength={2}
          maxLength={200}
          value={description}
          onChange={handleInputDescription}
          name="subtitle"
          placeholder="Занятие"
          className="popup__input"
          type="text"
        />
        <span className="popup__error popup__error_subtitle-input" />
      </PopupWithForm>
    </>
  );
}
