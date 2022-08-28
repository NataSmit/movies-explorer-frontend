import React from 'react';
import {useState} from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useEffect, useContext } from 'react';


export default function MoviesCardList({saved, filteredMovies, isSearchSuccessful, serverError, 
  saveFilm, savedMovies, deleteFilm, handleMoreBtnClick, finalNumberOfMoviesToDisplay}) {

  const currentUser = useContext(CurrentUserContext);
  const moviesArray = saved ? savedMovies.filter((film) => film.owner === currentUser.id) : filteredMovies
  const isMovieLiked = (id) => {
    return savedMovies.includes((savedMovie) => savedMovie.movieId === id)
  }


  
  //console.log('savedMovies cardlist', savedMovies)
  //console.log('savedMovies cardlist', savedMovies[1].movieId)
  //console.log('moviesArray cardList', moviesArray)
  //console.log('moviesArray cardList', moviesArray[1].id)

   function onMoreBtnClick() {
    handleMoreBtnClick()
   }

  
  return (
    <div className='moviesCardList'>
      <ul className='moviesCardList__list'>
       
       {isSearchSuccessful === undefined || isSearchSuccessful ? '' : <li className='moviesCardList_type_message'>Ничего не найдено</li>}
       {serverError.failed && <li className='moviesCardList_type_message'>{serverError.message}</li>}
       
       { 
       moviesArray.slice(0, finalNumberOfMoviesToDisplay).map((film) => (
       <MoviesCard picture={`${saved ? film.image : `https://api.nomoreparties.co${film.image.url}`} `} title={film.nameRU} duration={film.duration} 
       key={film.id || film.movieId} saveFilm={saveFilm} film={film} saved={saved} deleteFilm={deleteFilm} trailerLink={film.trailerLink}
       isLiked={isMovieLiked(film.id )}/>)) 
       }
      </ul>
      <div className='moviesCardList__more'>
        {moviesArray.length > finalNumberOfMoviesToDisplay ? 
        <button onClick={onMoreBtnClick} className='moviesCardList__more-btn'>Ещё</button>
        : ''
        }
      </div>
    </div>
  )
}


