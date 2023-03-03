import React from 'react';

function ImagePopup({ card, onClose }) {

  return (
    <div className={`popup popup_img-background ${card ? 'popup_opened' : ''}`} name="imagePopup">
      <div className="popup-image">
        <figure className="popup-image__conteiner">
          <img className="popup-image__photo" src={card ? card.link : ''} alt={card ? card.name : ''} />
          <figcaption className="popup-image__label"> {card ? card.name : ''} </figcaption>
        </figure>
        <button className="popup__close" aria-label="Закрыть" type="button" onClick={onClose} ></button>
      </div>
    </div>

  );
}

export default ImagePopup;