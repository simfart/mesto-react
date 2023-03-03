import React from 'react';

function PopupWithForm({ popunName, popupTitle, children, isOpen, onClose }) {

  return (
    <div className={`popup popup_${popunName} ${isOpen ? 'popup_opened' : ''}`} name={`popup_${popunName}`} >
      <div className="popup__conteiner">
        <form name="formPopup" className="popup__form" noValidate>
          <h2 className="popup__title">{popupTitle}</h2>
          {children}
          <button onClick={onClose} className="popup__close" aria-label="Закрыть" type="button"></button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;