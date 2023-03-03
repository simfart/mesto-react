import React from 'react';

function Card({ card, onCardClick }) {

  function handleClick() {
    onCardClick(card);

  }
  return (
    <figure className="element">
      <img className="element__photo" onClick={handleClick} src={card.link} alt={card.name} />
      <button className="element__trash" type="button"></button>
      <figcaption className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button className="element__button" type="button"></button>
          <p className="element__counter">0</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default Card;