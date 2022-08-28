import React from 'react';
import { useState } from 'react';

export default function MoviesCard({picture, title, duration, saveFilm, film, saved, deleteFilm, trailerLink, 
  isLiked}) {
   
  const [addedToFafourites, setAddedToFafourites] = useState(false);
  console.log('isLiked' , isLiked)
 
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

  return (
    <li className='moviesCard'>
      {
        saved 
         ? <button className='moviesCard__delete-btn' onClick={handleDeleteClick}></button> 
         : 
         <>
          <button type='button' className={`${addedToFafourites ? 'moviesCard__save-btn_hidden' : 'moviesCard__save-btn'}`} 
          onClick={handleSaveClick}>Сохранить</button>
          <div className={`moviesCard__tick ${addedToFafourites ? 'moviesCard__tick_visible' : ''}`}></div>
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
