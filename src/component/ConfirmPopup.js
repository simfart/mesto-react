import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ card, isOpen, onClose, onConfirm, isLoading }) {

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onConfirm(card)
  }
  return (
    <PopupWithForm
      popunName="confirm"
      isOpen={isOpen}
      onClose={onClose}
      popupTitle="Вы уверены?"
      buttonText={isLoading ? "Удаление..." : "Да"}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  );
}

export default ConfirmPopup;