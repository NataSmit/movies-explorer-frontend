import React from "react";
import SubmitButton from "../SubmitButton/SubmitButton";
import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import { useEffect } from "react";
import { validators, validateInputs } from "../../utils/validation";

export default function Register({
  children,
  onRegisterBtn,
  serverError,
  processing,
}) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formValues;
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);

  const [errors, setErrors] = useState({
    name: {
      required: false, // true -ошибка есть
      nameFormat: false,
    },
    email: {
      required: false,
      emailFormat: false,
    },
    password: {
      required: false,
    },
  });
  const isNameInvalid = Object.values(errors.name).some(Boolean);
  const isEmailInvalid = Object.values(errors.email).some(Boolean);
  const isPasswordInvalid = Object.values(errors.password).some(Boolean);
  const isSubmitBtnDisabled =
    isNameInvalid || isEmailInvalid || isPasswordInvalid;

  useEffect(() => {
    validateInputs(validators, name, email, password, setErrors);
  }, [formValues, setErrors]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegisterBtn(name, email, password);
  }

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormValues((prevState) => ({ ...prevState, [name]: value }));
    },
    [setFormValues]
  );

  function blurHandler(e) {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "name":
        setNameDirty(true);
        break;
      default:
        setEmailDirty(false);
        setPasswordDirty(false);
        setNameDirty(false);
    }
  }

  return (
    <div className="register">
      {children}
      <main className="register__body">
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <label className="register__lable">Имя</label>
          <input
            className={`register__input ${
              isNameInvalid && nameDirty ? "register__input_invalid" : ""
            }`}
            value={name}
            name="name"
            onChange={handleInputChange}
            required
            minLength="2"
            maxLength="30"
            disabled={processing}
            onBlur={blurHandler}
          ></input>
          <span className="register__errorMessage register__errorMessage_small">
            {nameDirty && errors.name.required && "Это обязательное поле"}
            <React.Fragment>
              <br />
            </React.Fragment>
            {nameDirty &&
              errors.name.nameFormat &&
              "Поле name содержит только латиницу, кириллицу, пробел или дефис"}
          </span>
          <label className="register__lable">E-mail</label>
          <input
            className={`register__input ${
              isEmailInvalid && emailDirty ? "register__input_invalid" : ""
            }`}
            value={email}
            name="email"
            onChange={handleInputChange}
            type="email"
            required
            disabled={processing}
            onBlur={blurHandler}
          ></input>
          <span className="register__errorMessage register__errorMessage_small">
            {emailDirty && errors.email.required && "Это обязательное поле"}
            <React.Fragment>
              <br />
            </React.Fragment>
            {emailDirty &&
              errors.email.emailFormat &&
              "Электронная почта не валидна"}
          </span>
          <label className="register__lable" required minLength="3">
            Пароль
          </label>
          <input
            className={`register__input ${
              isPasswordInvalid && passwordDirty
                ? "register__input_invalid"
                : ""
            }`}
            value={password}
            name="password"
            onChange={handleInputChange}
            type="password"
            disabled={processing}
            onBlur={blurHandler}
          ></input>
          <span className="register__errorMessage">
            {passwordDirty &&
              errors.password.required &&
              "Это обязательное поле"}
          </span>

          {serverError.failed && (
            <span className="register__errorMessage register__errorMessage_small">
              {serverError.message}
            </span>
          )}
          <SubmitButton
            name={"Зарегистрироваться"}
            isSubmitBtnDisabled={isSubmitBtnDisabled}
            processing={processing}
          />
          <Link to="/signin" className="register__link">
            Уже зарегистрированы?{" "}
            <span className="register__link_modifyed">Войти</span>
          </Link>
        </form>
      </main>
    </div>
  );
}
