import React from "react";
import { PopupWithForm } from "./PopupWithForm";

function DeletePlacePopup({card, isOpen, onClose, onUpdateCardDelete}) {

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateCardDelete(card);
  }

  return (
    <PopupWithForm
        name="delete-photo"
        title="Вы уверены?"
        buttonName="Да"
        modifier="popup__form_type_delete-photo"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
    />
  );
}

export {DeletePlacePopup};