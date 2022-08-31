import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  saved,
  filteredMovies,
  isSearchSuccessful,
  serverError,
  saveFilm,
  savedMovies,
  deleteFilm,
  handleMoreBtnClick,
  finalNumberOfMoviesToDisplay,
  deleteFilmFromMoviesPage,
  message,
  noKeyword,
  savedMoviesForRender,
}) {
  const moviesArray = saved ? savedMoviesForRender : filteredMovies;

  const isMovieLiked = (id) => {
    const isLiked = savedMovies.find((savedMovie) => {
      return savedMovie.movieId === id;
    });

    return Boolean(isLiked);
  };

  function onMoreBtnClick() {
    handleMoreBtnClick();
  }

  return (
    <div className="moviesCardList">
      <ul className="moviesCardList__list">
        {isSearchSuccessful === undefined || isSearchSuccessful ? (
          ""
        ) : (
          <li className="moviesCardList_type_message">Ничего не найдено</li>
        )}
        {message.successful ? (
          ""
        ) : (
          <li className="moviesCardList_type_message">{message.message}</li>
        )}
        {noKeyword && (
          <li className="moviesCardList_type_message">
            Нужно ввести ключевое слово
          </li>
        )}
        {saved && savedMovies.length === 0 ? (
          <li className="moviesCardList_type_message">
            У Вас нет сохраненных фильмов
          </li>
        ) : (
          ""
        )}
        {moviesArray.slice(0, finalNumberOfMoviesToDisplay).map((film) => (
          <MoviesCard
            picture={`${
              saved
                ? film.image
                : `https://api.nomoreparties.co${film.image.url}`
            } `}
            title={film.nameRU}
            duration={film.duration}
            key={film.id || film.movieId}
            saveFilm={saveFilm}
            film={film}
            saved={saved}
            deleteFilm={deleteFilm}
            trailerLink={film.trailerLink}
            isLiked={isMovieLiked(film.id)}
            deleteFilmFromMoviesPage={deleteFilmFromMoviesPage}
          />
        ))}
      </ul>
      <div className="moviesCardList__more">
        {moviesArray.length > finalNumberOfMoviesToDisplay ? (
          <button onClick={onMoreBtnClick} className="moviesCardList__more-btn">
            Ещё
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
