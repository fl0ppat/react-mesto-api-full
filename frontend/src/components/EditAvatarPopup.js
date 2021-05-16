import React from "react";
import PopupWithForm from "./PopupWithForm";

export default class EditAvatarPopup extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onUpdateUserAvatar(this.ref.current.value);
  }

  handleClose() {
    this.ref.current.value = "";
    this.props.closeCallback();
  }

  render() {
    return (
      <>
        <PopupWithForm
          isOpen={this.props.isOpen}
          closeCallback={this.handleClose}
          onSubmit={this.handleSubmit}
          btnIsActive={true}
          name="updateAvatar"
          title="Обновить аватар?"
          btnName="Да"
        >
          <input
            id="avatar-input"
            required
            name="link"
            type="url"
            autoComplete="off"
            ref={this.ref}
            placeholder="Ссылка на автатар"
            className="popup__input"
          />
          <span className="popup__error popup__error_avatar-input" />
        </PopupWithForm>
      </>
    );
  }
}
