import React from "react";
import { PopupWithForm } from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  
  const avatarLink = React.useRef('');

  React.useEffect(() => {
    avatarLink.current.value = '';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({avatar: avatarLink.current.value});
    // avatarLink.current.value = '';
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      buttonName={isLoading ? "Сохранение..." : "Сохранить"}
      modifier="popup__form_type_update-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input ref={avatarLink} type="url" name="avatarLink" className="popup__input popup__input_type_avatar-link" placeholder="Ссылка на картинку" required />
          <span className="popup__error avatarLink-error">Здесь будет сообщение об ошибке</span>
        </>
      }
    />
  );
}

export {EditAvatarPopup};