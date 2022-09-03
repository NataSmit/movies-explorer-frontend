import React, { useState, useEffect, useCallback } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";
import { Link } from "react-router-dom";
import { loginValidators, validateLoginInputs } from "../../utils/validation";

export default function Login({ children, onLoginBtn, serverError, processing }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formValues;
  const [errors, setErrors] = useState({
    email: {
      required: false, // true -ошибка есть
      emailFormat: false,
    },
    password: {
      required: false,
    },
  });
  const isEmailInvalid = Object.values(errors.email).some(Boolean);
  const isPasswordInvalid = Object.values(errors.password).some(Boolean);
  const isSubmitBtnDisabled = isEmailInvalid || isPasswordInvalid;

  useEffect(() => {
    validateLoginInputs(loginValidators, email, password, setErrors);
  }, [formValues, setErrors]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormValues((prevState) => ({ ...prevState, [name]: value }));
    },
    [setFormValues]
  );

  function handleSubmit(e) {
    e.preventDefault();
    onLoginBtn(email, password);
  }

  return (
    <div className="register">
      {children}
      <main className="register__body">
        <h1 className="register__title">Рады видеть!</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <label className="register__lable">E-mail</label>
          <input
            className="register__input"
            value={email}
            name="email"
            onChange={handleInputChange}
            type="email"
            required
            disabled={processing}
          ></input>
          <span className="register__errorMessage register__errorMessage_small">
            {errors.email.required && "Это обязательное поле"}
            <React.Fragment>
              <br />
            </React.Fragment>
            {errors.email.emailFormat && "Электронная почта не валидна"}
          </span>
          <label className="register__lable">Пароль</label>
          <input
            className="register__input"
            value={password}
            name="password"
            onChange={handleInputChange}
            type="password"
            required
            minLength="3"
            disabled={processing}
          ></input>
          <span className="register__errorMessage">
            {errors.password.required && "Это обязательное поле"}
          </span>

          {serverError.failed && (
            <span className="register__errorMessage register__errorMessage_small">
              {serverError.message}
            </span>
          )}
          <SubmitButton
            name={"Войти"}
            isSubmitBtnDisabled={isSubmitBtnDisabled}
            processing={processing}
          />
          <Link to="/signup" className="register__link">
            Ещё не зарегистрированы?{" "}
            <span className="register__link_modifyed">Регистрация</span>
          </Link>
        </form>
      </main>
    </div>
  );
}
