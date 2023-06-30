import React from "react";
import successImg from '../images/success.svg';
import failureImg from '../images/failure.svg';

function InfoTooltip({isOpen, infoTooltipParams, onClose,}) {

  return (
    <div className={`popup popup_bground_half-dark ${isOpen && 'popup_opened'}`}>
    <div className="popup__container">
      <img className="popup__img"
        src={infoTooltipParams.imgLink === 'success'? successImg : failureImg}
        alt={infoTooltipParams.name}
      />
      <p className="popup__text">{infoTooltipParams.text}</p>
      <button
          className="popup__close-button close-button"
          type="button"
          onClick={onClose}
          aria-label="закрыть">
        </button>
    </div>
  </div>
  );
}

export {InfoTooltip};