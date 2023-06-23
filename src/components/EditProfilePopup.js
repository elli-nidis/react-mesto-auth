import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { PopupWithForm } from "./PopupWithForm";


function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(
    () => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser, isOpen]
  );

  function handleUserNameChange(evt) {
    setName(evt.target.value);
  }

  function handleUserOccupationChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({name: name, description: description});
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonName={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input type="text" value={name ?? ''} onChange={handleUserNameChange} name="userName" className="popup__input popup__input_type_user-name" placeholder="Имя" minLength="2" maxLength="40" required />
          <span className="popup__error userName-error">Здесь будет сообщение об ошибке</span>
          <input type="text" value={description ?? ''} onChange={handleUserOccupationChange} name="userOccupation" className="popup__input popup__input_type_user-occupation" placeholder="Должность" minLength="2" maxLength="200" required />
          <span className="popup__error userOccupation-error">Здесь будет сообщение об ошибке</span>
        </>
      }
    />
  );
}

export {EditProfilePopup};