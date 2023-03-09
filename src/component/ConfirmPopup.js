import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onConfirm}) {

  return (
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    popupTitle="Вы уверены?"
    popunName="formConfirm"
    buttonText="Да"
    onSubmit={onConfirm}
  >
   </PopupWithForm>
  );
}

export default ConfirmPopup;