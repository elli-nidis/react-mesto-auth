import React from "react";

function PopupWithForm({title, name, children, buttonName, modifier, isOpen, onClose, onSubmit}) {
  
  return (
    <div className={`popup popup_type_${name} popup_bground_half-dark ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form ${modifier}`} name={`${name}`} onSubmit={onSubmit} noValidate>
          {children}
          <button className="popup__button" type="submit" aria-label={`кнопка ${buttonName}`}>{buttonName}</button>
        </form>
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

export {PopupWithForm};