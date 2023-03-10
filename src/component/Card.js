import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__button ${isLiked && 'element__button_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <figure className="element">
      <img className="element__photo" onClick={handleClick} src={card.link} alt={card.name} />
      {isOwn && <button className='element__trash' onClick={handleDeleteClick} />}
      <figcaption className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <p className="element__counter">{card.likes.length}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default Card;