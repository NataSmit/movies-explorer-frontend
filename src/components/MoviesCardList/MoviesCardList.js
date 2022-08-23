import React from 'react';
import {useState} from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'

import { useEffect } from 'react';


export default function MoviesCardList({saved, filteredMovies, isSearchSuccessful, serverError, 
  saveFilm, savedMovies, deleteFilm, handleMoreBtnClick, finalNumberOfMoviesToDisplay}) {

  const moviesArray = saved ? savedMovies : filteredMovies

  console.log('finalNumberOfMoviesToDisplay cardList:', finalNumberOfMoviesToDisplay);
  console.log('moviesArray.length:', moviesArray.length)

   function onMoreBtnClick() {
    handleMoreBtnClick()
   }
  
  return (
    <div className='moviesCardList'>
      <ul className='moviesCardList__list'>
       
       {isSearchSuccessful === undefined || isSearchSuccessful ? '' : <li className='moviesCardList_type_message'>Ничего не найдено</li>}
       { 
       moviesArray.slice(0, finalNumberOfMoviesToDisplay).map((film) => (
       <MoviesCard picture={`${saved ? film.image : `https://api.nomoreparties.co${film.image.url}`} `} title={film.nameRU} duration={film.duration} 
       key={film.id} saveFilm={saveFilm} film={film} saved={saved} deleteFilm={deleteFilm} />)) 
       }
      </ul>
      <div className='moviesCardList__more'>
        {moviesArray.length > finalNumberOfMoviesToDisplay ? 
        <button onClick={onMoreBtnClick} className={`moviesCardList__more-btn ${saved ? 'moviesCardList__more-btn_hidden' : ''}`}>Ещё</button>
        : ''
        }
      </div>
    </div>
  )
}


