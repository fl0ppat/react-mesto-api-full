import React from "react";

/**
 * Component for showing different popups with forms.
 *
 * @component
 * @param {Object} props
 * @param {String} props.name  Form and class name
 * @param {String} props.title Form title
 * @param {String} props.btnName Title for submit button
 * @param {Boolean} props.isOpen  Form visibility
 * @param {Boolean} props.btnIsActive
 * @param {Function} props.submitCallback
 * @param {Function} props.closeCallback
 * @return {Component}
 */
function PopupWithForm(props) {
  return (
    <section
      className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}
      id={props.sectionId}
    >
      <div className="popup__container">
        <button
          type="button"
          onClick={() => {
            props.closeCallback();
          }}
          className="popup__close"
        />
        <form onSubmit={props.onSubmit} className="popup__form" name={props.name}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className={`button button_type_save ${!props.btnIsActive && "button_type_inactive"}`} type="submit">
            {props.btnName}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
