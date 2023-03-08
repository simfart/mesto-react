import { useEffect, useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/Api";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';


function App() {
  const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});


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
 useEffect(() => {
  
  Promise.all([api.getInitialUserInfo(), api.getInitialUserCards()])
    .then(([resUserInfo, resCards]) => {        
      setCurrentUser(resUserInfo);    
      setCards(resCards)
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}, []);

  function handleCardLike(card) { 
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.setLikes(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete (card) {   // удаление карточки        
      api.deleteCards(card._id)
        .then(() => {            
          const filtered = cards.filter((newCard) => newCard!==card );         
          setCards(filtered) 
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });    
  }

  function handleUpdateUser(values) {   //Редактирование профиля
      api.editlUserInfo(values)
      .then((res) => {      
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log('здесь ошибка', err); // выведем ошибку в консоль
      })
      // .finally(() => {
      //   editProfileForm.renderLoading(false)
      // });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
      <div className="page">
        <Header />
        <Main
          onEditProfile={() => { setProfilePopupOpen(!isEditProfilePopupOpen) }}
          onEditAvatar={() => { setEditAvatarPopupOpen(!isEditAvatarPopupOpen) }}
          onAddPlace={() => { setAddPlacePopupOpen(!isAddPlacePopupOpen) }}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          userName={currentUser.name}
          userDescription={currentUser.about}
          userAvatar={currentUser.avatar}
         
        />
        <Footer />
        <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
       />

        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          popupTitle="Новое место"
          popunName="add_card"
          buttonText="Создать"
        >
          <input
            id="cardHeading-input"
            type="text"
            className="popup__item popup__item_el_cardHeading"
            name="cardName"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span id="cardHeading-input-error" className="popup__error"></span>
          <input
            id="cardLink-input"
            type="url"
            className="popup__item popup__item_el_cardLink"
            name="cardLink"
            placeholder="Ссылка на картинку"
            required
          />
          <span id="cardLink-input-error" className="popup__error"></span>
        </PopupWithForm>

        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          popupTitle="Обновить аватар"
          popunName="update_avatar"
          buttonText="Обновить"
        >
          <input
            id="Avatar-input"
            type="url"
            className="popup__item popup__item_el_cardLink"
            name="avatarLink"
            placeholder="Ссылка на картинку"
            required
          />
          <span id="Avatar-input-error" className="popup__error"></span>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
