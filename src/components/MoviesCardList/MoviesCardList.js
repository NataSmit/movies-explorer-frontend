import React from 'react';
import {useState} from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'
import film1 from '../../images/films/pic__COLOR_pic.png';
import film2 from '../../images/films/pic__COLOR_pic-4.png';
import film3 from '../../images/films/pic__COLOR_pic-8.png';
import film4 from '../../images/films/pic__COLOR_pic-1.png';
import film5 from '../../images/films/pic__COLOR_pic-5.png';
import film6 from '../../images/films/pic__COLOR_pic-9.png';
import film7 from '../../images/films/pic__COLOR_pic-2.png';
import film8 from '../../images/films/pic__COLOR_pic-6.png';
import film9 from '../../images/films/pic__COLOR_pic-10.png';
import film10 from '../../images/films/pic__COLOR_pic-3.png';
import film11 from '../../images/films/pic__COLOR_pic-7.png';
import film12 from '../../images/films/pic__COLOR_pic-11.png';


export default function MoviesCardList({saved, filteredMovies, isSearchSuccessful, message, serverError, 
  saveFilm, savedMovies, deleteFilm, handleMoreBtnClick, moreBtnState}) {
  
  const moviesArray = saved ? savedMovies : filteredMovies
  
  return (
    <div className='moviesCardList'>
      <ul className='moviesCardList__list'>
       
       {isSearchSuccessful  ? '' : <li className='moviesCardList_type_message'>{message}</li>}
       { 
       moviesArray.map((film) => (
       <MoviesCard picture={`${saved ? film.image : `https://api.nomoreparties.co${film.image.url}`} `} title={film.nameRU} duration={film.duration} 
       key={film.id} saveFilm={saveFilm} film={film} saved={saved} deleteFilm={deleteFilm} />)) 
       }
      </ul>
      <div className='moviesCardList__more'>
        {moreBtnState &&
        <button onClick={handleMoreBtnClick} className={`moviesCardList__more-btn ${saved ? 'moviesCardList__more-btn_hidden' : ''}`}>Ещё</button>
        }
      </div>
    </div>
  )
}


//<MoviesCard picture={film1} title={'33 слова о дизайне'} duration={'1ч 17м'} />
//<MoviesCard picture={film2} title={'Киноальманах «100 лет дизайна'} duration={'1ч 17м'} />
//<MoviesCard picture={film3} title={'В погоне за Бенкси'} duration={'1ч 17м'} />
//<MoviesCard picture={film4} title={'Баския: Взрыв реальности'} duration={'1ч 17м'} />
//<MoviesCard picture={film5} title={'Бег это свобода'} duration={'1ч 17м'} />
//<MoviesCard picture={film6} title={'Книготорговцы'} duration={'1ч 17м'} />
//<MoviesCard picture={film7} title={'Когда я думаю о Германии ночью'} duration={'1ч 17м'} />
//<MoviesCard picture={film8} title={'Gimme Danger: История Игги и The Stooges'} duration={'1ч 17м'} />
//<MoviesCard picture={film9} title={'Дженис: Маленькая девочка грустит'} duration={'1ч 17м'} />
//<MoviesCard picture={film10} title={'Соберись перед прыжком'} duration={'1ч 17м'} />
//<MoviesCard picture={film11} title={'Пи Джей Харви: A dog called money'} duration={'1ч 17м'} />
//<MoviesCard picture={film12} title={'По волнам: Искусство звука в кино'} duration={'1ч 17м'} />
