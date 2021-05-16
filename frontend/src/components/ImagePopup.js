import React from "react";

function ImagePopup(props) {
  return (
    <section className={props.isOpen ? `popup popup_opened` : `popup`}>
      <div className="popup__container">
        <button
          type="button"
          onClick={() => {
            props.closeCallback();
          }}
          className="popup__close"
        />
        <div className="popup__full">
          <img src={props.cardData.link} alt={props.cardData.name} className="popup__img" />
          <p className="popup__full-title">{props.cardData.name}</p>
        </div>
      </div>
    </section>
  );
}

export default ImagePopup;
