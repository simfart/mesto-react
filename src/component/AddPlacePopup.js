import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

    const { values, handleChange, setValues } = useForm({});

    React.useEffect(() => {
        setValues({});
    }, [isOpen, setValues]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name: values.name,
            link: values.link
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            popupTitle="Новое место"
            popunName="add_card"
            buttonText={isLoading ? "Добавление..." : "Создать"}
            onSubmit={handleSubmit}
        >
            <input
                value={values.name || ''}
                onChange={handleChange}
                id="cardHeading-input"
                type="text"
                className="popup__item popup__item_el_cardHeading"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
            />
            <span id="cardHeading-input-error" className="popup__error"></span>
            <input
                value={values.link || ''}
                onChange={handleChange}
                id="cardLink-input"
                type="url"
                className="popup__item popup__item_el_cardLink"
                name="link"
                placeholder="Ссылка на картинку"
                required
            />
            <span id="cardLink-input-error" className="popup__error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
