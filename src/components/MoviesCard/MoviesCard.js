import React from 'react'

export default function MoviesCard({picture, title, duration, saveFilm, film}) {

  function handleSaveClick() {
    saveFilm(film);
  }

  return (
    <li className='moviesCard'>
      <button type='button' className='moviesCard__save-btn' onClick={handleSaveClick}>Сохранить</button>
      <div className='moviesCard__tick'></div>
      <div className='moviesCard__container'>
        <img className='moviesCard__img' src={picture} alt='film' />
      </div>
      <div className='moviesCard__description'>
        <h2 className='moviesCard__title'>{title}</h2>
        <div className='moviesCard__duration'>{duration}</div>
      </div>
    </li>
  )
}
