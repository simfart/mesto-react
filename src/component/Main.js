import React from 'react';
import Card from './Card';



function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike, userName, userDescription, userAvatar, cards }) {
    return (
        <main className="content">
            <section className="profile">
                <button onClick={onEditAvatar} type="button" className="profile__conteiner"><img className="profile__avatar" src={userAvatar} alt="Аватар" /></button>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <button onClick={onEditProfile} className="profile__edit-button" type="button" aria-label="Исправить"></button>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button onClick={onAddPlace} className="profile__add-button" type="button" aria-label="Добавить"></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                        card={card}
                        key={card._id}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;
