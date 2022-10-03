import React from "react";
import { useHistory } from "react-router-dom";

export default function NotFound() {
  const history = useHistory();

  function handleBackBtnClick() {
    console.log("cklicked");
    history.goBack();
  }

  return (
    <div className="notFound">
      <div className="notFound__body">
        <h1 className="notFound__title">404</h1>
        <p className="notFound__subtitle">Страница не найдена</p>
        <button to="/" className="notFound__btn" onClick={handleBackBtnClick}>
          Назад
        </button>
      </div>
    </div>
  );
}
