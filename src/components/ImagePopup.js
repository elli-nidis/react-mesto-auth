function ImagePopup({card, isOpen, onClose}) {

  return (
    <div className={`popup popup_type_photo-zoom popup_bground_dark ${isOpen && card && 'popup_opened'}`}>
      <div className="photo">
        <figure className="photo__container">
          <img className="photo__img" src={card && card.link} alt={card && card.name}/>
          <figcaption className="photo__caption">
            <h2 className="photo__title">{card && card.name}</h2>
          </figcaption>
        </figure>
        <button className="popup__close-button close-button" type="button" aria-label="закрыть" onClick={onClose}></button>
      </div>
    </div>
  );
}

export {ImagePopup};