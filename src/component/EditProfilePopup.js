import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';


function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const { values, handleChange, setValues } = useForm({});
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about
    });
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      popupTitle="Редактировать профиль"
      popunName="add_profile"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        value={values.name || ''}
        onChange={handleChange}
        id="heading-input"
        type="text"
        className="popup__item popup__item_el_heading"
        name="name"
        minLength="2"
        maxLength="40"
        required
      />
      <span id="heading-input-error" className="popup__error"></span>
      <input
        value={values.about || ''}
        onChange={handleChange}
        id="subheading-input"
        type="text"
        className="popup__item popup__item_el_subheading"
        name="about"
        minLength="2"
        maxLength="200"
        required
      />
      <span id="subheading-input-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
