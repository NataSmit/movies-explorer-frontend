import React from 'react'

export default function MoviesCard({picture, title, duration}) {
  return (
    <li className='moviesCardList__item'>
      <div className='moviesCardList__item-container'>
        <img className='moviesCardList__item-img' src={picture} alt='film' />
      </div>
      <div className='moviesCardList__item-description'>
        <h2 className='moviesCardList__item-title'>{title}</h2>
        <div className='moviesCardList__item-duration'>{duration}</div>
      </div>
    </li>
  )
}
