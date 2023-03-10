import React from 'react';

function ImagePopup({ card, onClose }) {

  return (
    <div className={`popup popup_img-background ${card ? 'popup_opened' : ''}`} name="imagePopup">
      <div className="popup-image popup__conteiner-open">
        <figure className="popup-image__conteiner">
          <img className="popup-image__photo" src={card?.link} alt={card?.name} />
          <figcaption className="popup-image__label"> {card?.name} </figcaption>
        </figure>
        <button className="popup__close" aria-label="Закрыть" type="button" onClick={onClose} ></button>
      </div>
    </div>

  );
}

export default ImagePopup;