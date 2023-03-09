import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name,
            link,
        });
        setName('');
        setLink('');
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            popupTitle="Новое место"
            popunName="add_card"
            buttonText="Создать"
            onSubmit={handleSubmit}
        >
            <input
                onChange={handleChangeName}
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
                onChange={handleChangeLink}
                id="cardLink-input"
                type="url"
                className="popup__item popup__item_el_cardLink"
                name="cardLink"
                placeholder="Ссылка на картинку"
                required
            />
            <span id="cardLink-input-error" className="popup__error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
