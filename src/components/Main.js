import React from "react";
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main({onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile" aria-label="профиль">
        <img src={currentUser.avatar} alt="Фото пользователя" className="profile__avatar" />
        <div 
          className="profile__edit-avatar"
          onClick={onEditAvatar}>
        </div>
        <div className="profile__info">
          <div className="profile__edit-group">
            <h1 className="profile__user-name">{currentUser.name}</h1>
            <button
              className="profile__edit-button open-button"
              type="button"
              onClick={onEditProfile}
              aria-label="редактировать">
            </button>
          </div>
          <p className="profile__user-occupation">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button open-button"
          type="button"
          onClick={onAddPlace}
          aria-label="добавить">
        </button>
      </section>

      <section className="elements" aria-label="раздел с фотографиями">
        <ul className="photo-grid">
          {
            cards.map((card) => {
              return <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
            })
          }
        </ul>
      </section>
    </main>
  );
}

export {Main};
