import { useEffect, useState } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/Api";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';


function App() {
  const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopup, setConfirmPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});


  //Закрытие всех попапов по Х
  function closeAllPopups() {
    setProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
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
        setCards(resCards);
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

  function handleCardDelete(card) {   // удаление карточки     
    setConfirmPopupOpen(!isConfirmPopup) 
    api.deleteCards(card._id)
      .then(() => {
        const filtered = cards.filter((newCard) => newCard !== card);
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
  }


  function handleUpdateAvatar(values) {    //Редактирование аватара
    api.editAvatar(values)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log('здесь ошибка', err); // выведем ошибку в консоль
      })
  }

  function handleAddPlaceSubmit(data) {  // Редактирование карточек
    api.createNewCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups()

      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
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
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <ConfirmPopup
            isOpen={false}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
