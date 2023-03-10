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
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [load, setLoad] = useState(false);

  //Закрытие попапов по оверлею
  function clickOverPopups(e) {
    if (!(e.target.closest('.popup__conteiner-open'))) {
      closeAllPopups()
    }
  }

  function popupCloseEventListener() {
    document.addEventListener('mousedown', clickOverPopups)
  }

  //Закрытие всех попапов по Х
  function closeAllPopups() {
    setProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard(null);
    document.removeEventListener('mousedown', clickOverPopups)
  }

  function openProfilePopup() {
    setProfilePopupOpen(!isEditProfilePopupOpen);
    popupCloseEventListener()
  }

  function openEditAvatarPopup() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    popupCloseEventListener()
  }
  function openAddPlacePopup() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
    popupCloseEventListener()
  }

  function handleCardClick(card) {   // Попап image
    setSelectedCard(card);
    popupCloseEventListener()
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

  function handleCardClickDelete(card) {
    setSelectedCardToDelete(card);
    setConfirmPopupOpen(!isConfirmPopupOpen)
  }

  function handleCardDelete(card) {   // удаление карточки  
    setLoad(true)
    api.deleteCards(card._id)
      .then(() => {
        const filtered = cards.filter((newCard) => newCard !== card);
        setCards(filtered)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setLoad(false)
      });
  }

  function handleUpdateUser(values) {   //Редактирование профиля
    setLoad(true)
    api.editlUserInfo(values)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log('здесь ошибка', err); // выведем ошибку в консоль
      })
      .finally(() => {
        setLoad(false)
      });
  }

  function handleUpdateAvatar(values) {    //Редактирование аватара
    setLoad(true)
    api.editAvatar(values)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log('здесь ошибка', err); // выведем ошибку в консоль
      })
      .finally(() => {
        setLoad(false)
      });
  }

  function handleAddPlaceSubmit(data) {  // Добавление карточек
    setLoad(true)
    api.createNewCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setLoad(false)
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
          <Main
            onEditProfile={openProfilePopup}
            onEditAvatar={openEditAvatarPopup}
            onAddPlace={openAddPlacePopup}
            onCardDelete={handleCardClickDelete}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={load}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={load}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={load}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <ConfirmPopup
            card={selectedCardToDelete}
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleCardDelete}
            isLoading={load}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
