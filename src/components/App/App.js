import { Route, Switch } from 'react-router-dom';
import {useEffect, useState} from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import LandingTitle from '../LandingTitle/LandingTitle';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import {moviesApi} from '../../utils/MoviesApi';
import {mainApi} from '../../utils/MainApi';


function App() {

  const loggedIn = true;
  const saved = true;
  const minimal = true;
  
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(undefined);
  
  const [serverError, setServerError] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [moviesToDisplay, setMoviesToDisplay] = useState(12)

  const moreMovies = windowInnerWidth >= 1190 ? 3 : 2
  const [finalNumberOfMoviesToDisplay, setFinalNumberOfMoviesToDisplay] = useState(moviesToDisplay)
  const [shortMovie, setShortMovie] = useState(false)


  console.log('moviesToDisplay:', moviesToDisplay);
  console.log('finalNumberOfMoviesToDisplay:', finalNumberOfMoviesToDisplay);
  console.log('shortMovie:', shortMovie)

   function handleWindowWidth() {
     setTimeout(() => {
       setWindowInnerWidth(window.innerWidth)
     }, 2000)
     
   }

   useEffect(() => {
     window.addEventListener('resize', handleWindowWidth)
     return () => window.removeEventListener('resize', handleWindowWidth)
   }, [])

   useEffect(() => {
     if (1280 >= windowInnerWidth && windowInnerWidth >= 1190) {
       setMoviesToDisplay(12);
      } else if (1190 >= windowInnerWidth && windowInnerWidth >= 768) {
       setMoviesToDisplay(8);
      } else {
       setMoviesToDisplay(5);
      }
   }, [windowInnerWidth, moviesToDisplay])

   function handleMoreBtnClick() {
    setFinalNumberOfMoviesToDisplay(finalNumberOfMoviesToDisplay + moreMovies)
  }


  function filterMovies(keyWord, serverMovies) {
    const allFoundMovies = serverMovies.filter((film) => film.nameRU.toLowerCase().includes(keyWord.toLowerCase()))
    allFoundMovies.filter((film) => film.duration <= 40)
    checkIsSearchSuccessful(allFoundMovies)
    localStorage.setItem('allFoundMovies', JSON.stringify(allFoundMovies))
    localStorage.setItem('keyWord', keyWord)
    localStorage.setItem('shortMovie', shortMovie)
    setFilteredMovies(shortMovie ? allFoundMovies.filter((film) => film.duration <= 40) : allFoundMovies)
  }

  useEffect(() => {
    if (localStorage.allFoundMovies) {
      setFilteredMovies(JSON.parse(localStorage.getItem('allFoundMovies')))
    } else {
      setFilteredMovies([])
    }
    
  }, [])

 
  function checkIsSearchSuccessful(filmArr) {
   
    if (filmArr.length === 0) {
      setIsSearchSuccessful(false);
    } else {
      setIsSearchSuccessful(true)
    }
  }


  function searchMovies(keyWord) {
    setFinalNumberOfMoviesToDisplay(moviesToDisplay)
    if (!keyWord) {
      console.log('Нужно ввести ключевое слово');
    }
    
    if (initialMovies.length === 0) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((moviesArr) => {
          filterMovies(keyWord, moviesArr);
          setInitialMovies(moviesArr);
        })
        .catch((err) => {
          console.log(err)
          //setServerError(true);
          //setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
        .finally (() => {
          setIsLoading(false);
          //checkIsSearchSuccessful()
        })
    } else {
      filterMovies(keyWord, initialMovies);

      //checkIsSearchSuccessful()
    }
    
  }

  function saveFilm(film) {
    mainApi
    .saveFilm(film)
    .then((savedFilm) => setSavedMovies([savedFilm, ...savedMovies]))
    .catch((err) => console.log(err))
  }

  function deleteFilm(id) {
    mainApi
    .deleteFilm(id)
    .then((res) => {
      setSavedMovies((state) => state.filter((film) => film._id !== id))
    })
    .catch((err) => console.log(err))
  }

 //function getSavedFilms() {
 //  mainApi
 //  .getFilms()
 //  .then((savedMovies) => setSavedMovies(savedMovies))
 //  .catch((err) => console.log(err))
 //}

  useEffect(() => {
    mainApi
    .getFilms()
    .then((savedMovies) => setSavedMovies(savedMovies))
    .catch((err) => console.log(err))
  }, [])

  
  console.log('filteredMovies:', filteredMovies)
  console.log('isSearchSuccessful:', isSearchSuccessful)
  console.log('windowInnerWidth:', windowInnerWidth)
  

  return (
    <div className='wrapper'>
      <div className="root">
        <Switch>
          <Route exact path='/'>
            <Main>
              <Header />
              <Promo />
              <AboutProject >
                <LandingTitle title={'О проекте'}/>
              </AboutProject>
              <Techs>
                <LandingTitle title={'Технологии'}/>
              </Techs>
              <AboutMe>
                <LandingTitle title={'Студент'}/>
              </AboutMe>
              <Footer />
            </Main>
          </Route>
          <Route path='/movies'>
            <Movies>
              <Header loggedIn={loggedIn}/>
              <SearchForm onSearchBtn={searchMovies} setShortMovie={setShortMovie} />
              <Preloader isLoading={isLoading}/>
              <MoviesCardList filteredMovies={filteredMovies} isSearchSuccessful={isSearchSuccessful}
              serverError={serverError} saveFilm={saveFilm} handleMoreBtnClick={handleMoreBtnClick}
              finalNumberOfMoviesToDisplay={finalNumberOfMoviesToDisplay}/>
              <Footer />
            </Movies>
          </Route>
          <Route path='/saved-movies'>
            <SavedMovies>
              <Header loggedIn={loggedIn}/>
              <SearchForm />
              <MoviesCardList saved={saved} savedMovies={savedMovies} deleteFilm={deleteFilm}/>
              <Preloader />
              <Footer />
            </SavedMovies>
          </Route>
          <Route path='/profile'>
            <Profile>
              <Header loggedIn={loggedIn}/>
            </Profile>
          </Route>
          <Route path='/signup'>
            <Register>
              <Header minimal={minimal}/>
            </Register>
          </Route>
          <Route path='/signin'>
            <Login>
              <Header minimal={minimal}/>
            </Login>
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
        
      </div>
      
    </div>
  )

}

export default App;