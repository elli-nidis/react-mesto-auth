import React from "react";

function InfoTooltip({isOpen, imgLink, text, name, onClose,}) {
  return (
    <div className={`popup popup_bground_half-dark ${isOpen && 'popup_opened'}`}>
    <div className="popup__container">
      <img className="popup__img" src={imgLink} alt={name} />
      <p className="popup__text">{text}</p>
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