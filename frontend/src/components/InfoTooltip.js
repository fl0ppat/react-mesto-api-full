import React from "react";
import ok from "../images/ok.svg";
import error from "../images/error.svg";
import { useHistory } from "react-router";

function InfoTooltip(props) {
  const history = useHistory();

  function closeTooltip() {
    history.push(props.path);
    props.onClose();
  }

  return (
    <section className={props.isOpen ? `popup popup_opened` : `popup`}>
      <div className="popup__container popup__container-tooltip">
        <button
          type="button"
          onClick={() => {
            closeTooltip();
          }}
          className="popup__close"
        />
        <div className="popup__full">
          <img src={props.status ? ok : error} alt="" className="popup__img" />
          <p className="popup__tooltip-text">{props.text}</p>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
