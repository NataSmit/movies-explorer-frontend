import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState, useEffect } from "react";

export default function SearchForm({
  onSearchBtn,
  setShortMovie,
  handleShortMovieBtn,
  processing
}) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  function submitSearch(e) {
    e.preventDefault();
    onSearchBtn(value);
  }

  useEffect(() => {
    if (localStorage.keyWord) {
      setValue(localStorage.getItem("keyWord"));
    }
  }, []);

  return (
    <div className="searchForm">
      <form className="searchForm__form" onSubmit={submitSearch}>
        <input
          className="searchForm__input"
          type="text"
          value={value || ""}
          onChange={handleChange}
          placeholder="Фильм"
          disabled={processing}
        />
        <button className="searchForm__button" disabled={processing}></button>
      </form>
      <FilterCheckbox
        setShortMovie={setShortMovie}
        handleShortMovieBtn={handleShortMovieBtn}
      />
    </div>
  );
}
