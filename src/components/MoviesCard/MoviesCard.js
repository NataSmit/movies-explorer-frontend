import React from 'react';
import { useState } from 'react';

export default function MoviesCard({picture, title, duration, saveFilm, film, saved, deleteFilm, trailerLink, 
  isLiked, test, deleteFilmFromMoviesPage}) {
   
  const [addedToFafourites, setAddedToFafourites] = useState(false);
 
 
  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + 'ч' + ' ' + minutes + 'м';
  };
  const formattedDuration = getTimeFromMins(duration)

  function handleSaveClick() {
    saveFilm(film);
    setAddedToFafourites(true);
    
  }

  function handleDeleteClick() {
    deleteFilm(film._id)
  }

  function handleTickClick() {
    deleteFilmFromMoviesPage(film.id)
  }

 
  return (
    <li className='moviesCard'>
      {
        saved 
         ? <button className='moviesCard__delete-btn' onClick={handleDeleteClick}></button> 
         : 
         <>
          <button type='button' className={`${addedToFafourites || isLiked ? 'moviesCard__save-btn_hidden' : 'moviesCard__save-btn'}`} 
          onClick={handleSaveClick}>Сохранить</button>
          <button type='button' onClick={handleTickClick} className={`moviesCard__tick ${addedToFafourites || isLiked ? 'moviesCard__tick_visible' : ''}`}></button>
        </>
      }
      
      <a className='moviesCard__trailer-link' href={trailerLink} target='blank'>
        <div className='moviesCard__container'>
          <img className='moviesCard__img' src={picture} alt='film' />
        </div>
        <div className='moviesCard__description'>
          <h2 className='moviesCard__title'>{title}</h2>
          <div className='moviesCard__duration'>{formattedDuration}</div>
        </div>
      </a>
    </li>
  )
}
