import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);

     
    function handleChangeName(e) {
        // установите нужное состояние
        // используйте e.target.name и e.target.value
        setName(e.target.value);   
       
    }

    function handleChangeDescription(e) {
        // установите нужное состояние
        // используйте e.target.name и e.target.value        
        setDescription(e.target.value);
    }

      function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();          
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name,
          about: description,
        });
     }

  return (
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    popupTitle="Редактировать профиль"
    popunName="add_profile"
    buttonText="Сохранить"
    onSubmit={handleSubmit}
  >
    <input
      onChange={handleChangeName}
      id="heading-input"
      type="text"
      className="popup__item popup__item_el_heading"
      name="avatarName"
      placeholder={name}
      minLength="2"
      maxLength="40"
      required
    />
    <span id="heading-input-error" className="popup__error"></span>
    <input
    onChange={handleChangeDescription}
      id="subheading-input"
      type="text"
      className="popup__item popup__item_el_subheading"
      name="avatarDescription"
      placeholder={description}
      minLength="2"
      maxLength="200"
      required
    />
    <span id="subheading-input-error" className="popup__error"></span>
  </PopupWithForm>
  );
}

export default EditProfilePopup;
