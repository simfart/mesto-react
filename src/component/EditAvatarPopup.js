import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    
     const avatarRef = React.useRef();  

     function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();          
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
      }
  
  return (
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    popupTitle="Обновить аватар"
    popunName="update_avatar"
    buttonText="Обновить"
    onSubmit={handleSubmit}
  >
    <input
      id="Avatar-input"
      type="url"
      className="popup__item popup__item_el_cardLink"
      name="avatarLink"
      placeholder="Ссылка на картинку"
      required
      ref={avatarRef}
    />
    <span id="Avatar-input-error" className="popup__error"></span>
  </PopupWithForm>
  );
}

export default EditAvatarPopup;
