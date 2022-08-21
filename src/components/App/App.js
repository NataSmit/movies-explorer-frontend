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
  const [message, setMessage] = useState('');
  const [serverError, setServerError] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [moviesToDisplay, setMoviesToDisplay] = useState(undefined)
  const [moreBtnState, setMoreBtnState] = useState(true)

  function handleWindowWidth() {
    setTimeout(() => {
      setWindowInnerWidth(window.innerWidth)
    }, 2000)
    
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowWidth)
    return () => window.removeEventListener('resize', handleWindowWidth)
  }, [windowInnerWidth])

  function defineMoviesQuantity(windowInnerWidth) {
    if (1280 >= windowInnerWidth && windowInnerWidth >= 1190) {
    setMoviesToDisplay(12);
   } else if (1190 >= windowInnerWidth && windowInnerWidth >= 768) {
    setMoviesToDisplay(8);
   } else {
    setMoviesToDisplay(5);
   }

  }

  useEffect(() => {
    defineMoviesQuantity(windowInnerWidth)
  }, [windowInnerWidth, moviesToDisplay])



  function filterMovies(keyWord, serverMovies) {
    const allFilteredMovies = serverMovies.filter((film) => film.nameRU.toLowerCase().includes(keyWord.toLowerCase()))
    localStorage.setItem('allFilteredMovies', JSON.stringify(allFilteredMovies))
    defineMoviesQuantity(windowInnerWidth)
    setMoreBtnState((allFilteredMovies.length > moviesToDisplay) ? true : false)
    setFilteredMovies(allFilteredMovies.slice(0, moviesToDisplay))
  }

  function handleMoreBtnClick() {
    const allFilteredMovies = JSON.parse(localStorage.allFilteredMovies);
    
  }

  function checkIsSearchSuccessful() {
   
    if (filteredMovies.length === 0) {
      setIsSearchSuccessful(false);
      setMessage('Ничего не найдено');
    } else {
      setIsSearchSuccessful(true)
    }
  }

  useEffect(() => {
    checkIsSearchSuccessful()
  }, [isSearchSuccessful, filteredMovies])

  function searchMovies(keyWord) {
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
          checkIsSearchSuccessful()
        })
    } else {
      filterMovies(keyWord, initialMovies);
      checkIsSearchSuccessful()
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

  console.log('moviesToDisplay:', moviesToDisplay)
  console.log('filteredMovies:', filteredMovies)
  console.log('isSearchSuccessful:', isSearchSuccessful)
  console.log('windowInnerWidth:', windowInnerWidth)
  console.log('moreBtnState:', moreBtnState)

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
              <SearchForm onSearchBtn={searchMovies} filterMovies={filterMovies}/>
              <Preloader isLoading={isLoading}/>
              <MoviesCardList filteredMovies={filteredMovies} isSearchSuccessful={isSearchSuccessful} message={message}
              serverError={serverError} saveFilm={saveFilm} handleMoreBtnClick={handleMoreBtnClick} moreBtnState={moreBtnState}/>
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