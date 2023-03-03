import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import api from '../utils/Api';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [userInfo, setProfileInfo] = React.useState({});

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);

  //Закрытие всех попапов по Х 
  function closeAllPopups() {
    setProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Данные из API
  React.useEffect(() => {
    Promise.all([api.getInitialUserInfo(), api.getInitialUserCards()])
      .then(([resUserInfo, resCards]) => {
        setProfileInfo({
          myId: resUserInfo._id,
          userName: resUserInfo.name,
          userDescription: resUserInfo.about,
          userAvatar: resUserInfo.avatar
        });
        setCards(resCards.map((item) => ({
          name: item.name,
          link: item.link,
          cardId: item._id
        })))
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [])


  return (
    <div className="body">
      <div className="page">
        <Header />
        <Main
          onEditProfile={() => { setProfilePopupOpen(!isEditProfilePopupOpen) }}
          onEditAvatar={() => { setEditAvatarPopupOpen(!isEditAvatarPopupOpen) }}
          onAddPlace={() => { setAddPlacePopupOpen(!isAddPlacePopupOpen) }}
          onCardClick={handleCardClick}
          cards={cards}
          userName={userInfo.userName}
          userDescription={userInfo.userDescription}
          userAvatar={userInfo.userAvatar}
        />

        <Footer />

        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          popupTitle='Редактировать профиль'
          popunName='add_profile'
          children={<fieldset className="popup__info">
            <input id="heading-input" type="text" className="popup__item popup__item_el_heading" name="avatarName"
              placeholder="Имя" minLength="2" maxLength="40" required />
            <span id="heading-input-error" className="popup__error"></span>
            <input id="subheading-input" type="text" className="popup__item popup__item_el_subheading"
              name="avatarDescription" placeholder="О себе" minLength="2" maxLength="200" required />
            <span id="subheading-input-error" className="popup__error"></span>
            <button className="popup__button" type="submit" aria-label="Сохранить">
              Сохранить
            </button>
          </fieldset>}
        />

        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          popupTitle='Новое место'
          popunName='add_card'
          children={<fieldset className="popup__info">
            <input id="cardHeading-input" type="text" className="popup__item popup__item_el_cardHeading" name="cardName"
              placeholder="Название" minLength="2" maxLength="30" required />
            <span id="cardHeading-input-error" className="popup__error"></span>
            <input id="cardLink-input" type="url" className="popup__item popup__item_el_cardLink" name="cardLink"
              placeholder="Ссылка на картинку" required />
            <span id="cardLink-input-error" className="popup__error"></span>
            <button className="popup__button popup__button_add_card popup__button_invalid" type="submit"
              aria-label="Создать">
              Создать
            </button>
          </fieldset>}
        />

        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          popupTitle='Обновить аватар'
          popunName='update_avatar'
          children={<fieldset className="popup__info">
            <input id="Avatar-input" type="url" className="popup__item popup__item_el_cardLink" name="avatarLink"
              placeholder="Ссылка на картинку" required />
            <span id="Avatar-input-error" className="popup__error"></span>
            <button className="popup__button popup__button_add_card popup__button_invalid" type="submit" aria-label="Создать">
              Обновить
            </button>
          </fieldset>}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}


export default App;