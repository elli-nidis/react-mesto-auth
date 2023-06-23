import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(item => item._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_active'}`;

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card)
  }

  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  return (
    <li className="card">
      <figure className="card__item">
        <img src={card.link} className="card__img open-button" alt={card.name} onClick={handleClick} />
        <figcaption className="card__caption">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__likes-group">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <p className="card__likes-counter">{card.likes.length}</p>
          </div>
          {isOwn && <button className="card__delete-button" type="button" onClick={handleDeleteClick}></button>}
        </figcaption>
      </figure>
    </li>
  );
}

export {Card};