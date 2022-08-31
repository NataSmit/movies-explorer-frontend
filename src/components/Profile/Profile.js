import React from "react";
import { useEffect, useCallback } from "react";
import { useState, useRef, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { profileValidateInputs } from "../../utils/validation";

export default function Profile({
  onExitBtn,
  children,
  handleUserUpdate,
  serverError,
  setServerError,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [active, setActive] = useState(false);
  const disabled = false;
  const nameInput = useRef();
  const emailInput = useRef();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });

  const profileValidators = {
    name: {
      required: (value) => {
        return value === "";
      }, // true - there's an error
      nameFormat: (value) => {
        return !/^[A-Za-zА-яё -]+$/.test(value);
      },
      sameValue: (value) => {
        return value === currentUser.name;
      },
    },
    email: {
      required: (value) => {
        return value === "";
      },
      emailFormat: (value) => {
        return !/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(value);
      },
      sameValue: (value) => {
        return value === currentUser.email;
      },
    },
  };

  const { name, email } = formValues;
  const [errors, setErrors] = useState({
    name: {
      required: true, // true -ошибка есть
      nameFormat: true,
    },
    email: {
      required: true, // true -ошибка есть
      emailFormat: true,
    },
  });
  const isEmailInvalid = Object.values(errors.email).some(Boolean);
  const isNameInvalid = Object.values(errors.name).some(Boolean);
  const isSubmitBtnDisabled = isEmailInvalid || isNameInvalid;

  useEffect(() => {
    profileValidateInputs(profileValidators, name, email, setErrors);
  }, [formValues, setErrors]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      console.log(e.target);
      setFormValues((prevState) => ({ ...prevState, [name]: value }));
      setServerError({
        failed: false,
        message: "",
      });
    },
    [setFormValues]
  );

  function editProfile() {
    setActive(true);
    nameInput.current.removeAttribute("disabled");
    emailInput.current.removeAttribute("disabled");
  }

  function handleLogout() {
    onExitBtn();
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleUserUpdate(email, name);
  }

  useEffect(() => {
    setFormValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser.name, currentUser.email]);

  return (
    <div className="profile">
      {children}
      <main className="profile__body">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={handleFormSubmit}>
          <div className="profile__input-container">
            <label htmlFor="name" className="profile__lable">
              Имя
            </label>
            <input
              onChange={handleInputChange}
              className="profile__input"
              id="name"
              name="name"
              value={name}
              disabled
              ref={nameInput}
            />
          </div>
          <div className="profile__input-container profile__input-container_type_no-border">
            <label htmlFor="email" className="profile__lable">
              E-mail
            </label>
            <input
              onChange={handleInputChange}
              className="profile__input"
              id="email"
              name="email"
              value={email}
              disabled
              ref={emailInput}
            />
          </div>
          <div className="profile__submit-container">
            <span
              className={`profile__errorMessage ${
                disabled ? "profile__errorMessage_visible" : ""
              }`}
            >
              При обновлении профиля произошла ошибка.
            </span>
            {serverError.failed && (
              <span className="register__errorMessage register__errorMessage_small">
                {serverError.message}
              </span>
            )}
            {errors.name.nameFormat && (
              <span className="register__errorMessage register__errorMessage_small">
                Поле name содержит только латиницу, кириллицу, пробел или дефис
              </span>
            )}
            <React.Fragment>
              <br />
            </React.Fragment>
            {errors.name.required && (
              <span className="register__errorMessage register__errorMessage_small">
                Это обязательное поле
              </span>
            )}
            <React.Fragment>
              <br />
            </React.Fragment>
            {errors.email.emailFormat && (
              <span className="register__errorMessage register__errorMessage_small">
                Поле name содержит только латиницу, кириллицу, пробел или дефис
              </span>
            )}
            <React.Fragment>
              <br />
            </React.Fragment>
            {errors.email.required && (
              <span className="register__errorMessage register__errorMessage_small">
                Это обязательное поле
              </span>
            )}
            <button
              disabled={isSubmitBtnDisabled}
              className={`profile__submit-btn ${
                disabled ? "profile__submit-btn_disabled" : ""
              } ${active ? "profile__submit-btn_visible" : ""}`}
            >
              Сохранить
            </button>
          </div>
        </form>
        <div
          className={`profile__buttons ${
            active ? "profile__buttons_hidden" : ""
          }`}
        >
          <button
            className="profile__edit-btn"
            type="button"
            onClick={editProfile}
          >
            Редактировать
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="profile__exit"
          >
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </div>
  );
}
