import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function FilterCheckbox({ setShortMovie, handleShortMovieBtn }) {
  const [checked, setChecked] = useState(false);
  const location = useLocation()
  console.log('checked filtercheckbox', checked)

  function handleChange() {
    setChecked(!checked);
    setShortMovie(!checked);
    handleShortMovieBtn();
  }

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (localStorage.shortMovieMoviesPage) {
          setChecked(JSON.parse(localStorage.getItem("shortMovieMoviesPage")));
        } else {
          setChecked(false);
        }
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
