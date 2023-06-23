import React from "react";
import { PopupWithForm } from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  React.useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  function handleCardNameChange(evt) {
    setCardName(evt.target.value);
  }

  function handleCardLinkChange(evt) {
    setCardLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({name: cardName, link: cardLink});
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-photo"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonName={isLoading ? "Сохранение..." : "Создать"}
      children={
        <>
          <input type="text" value={cardName ?? ''} onChange={handleCardNameChange} name="photoName" className="popup__input popup__input_type_photo-name" placeholder="Название" minLength="2" maxLength="30" required />
          <span className="popup__error photoName-error">Здесь будет сообщение об ошибке</span>
          <input type="url" value={cardLink ?? ''} onChange={handleCardLinkChange} name="photoLink" className="popup__input popup__input_type_photo-link" placeholder="Ссылка на картинку" required />
          <span className="popup__error photoLink-error">Здесь будет сообщение об ошибке</span>
        </>
      }
    />
  );
}

export {AddPlacePopup};