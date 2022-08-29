import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function FilterCheckbox({ setShortMovie, handleShortMovieBtn }) {
  const [checked, setChecked] = useState(false);

  function handleChange() {
    setChecked(!checked);
    setShortMovie(!checked);
    handleShortMovieBtn();
  }

  useEffect(() => {
    if (localStorage.shortMovie) {
      setChecked(JSON.parse(localStorage.getItem("shortMovie")));
    }
  }, []);

  return (
    <div className="filterCheckbox">
      <div className="filterCheckbox__container">
        <input
          className="filterCheckbox__input"
          type="checkbox"
          id="shortFilm"
          checked={checked}
          onChange={handleChange}
        />
        <label htmlFor="shortFilm" className="filterCheckbox__label">
          Короткометражки
        </label>
      </div>
    </div>
  );
}
