import { Route, Switch, useHistory } from 'react-router-dom';
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
import {apiAuth} from '../../utils/ApiAuth';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";
import InfoTooltip from "../InfoTooltip/InfoTooltip";


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [authorized, setAuthorized] = useState(false)
  
  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState({ successful: false, message: "" });
  const loggedIn = true;
  const saved = true;
  const minimal = true;
  
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(undefined);
  const [serverError, setServerError] = useState({ failed: false, message: "" });
  const [savedMovies, setSavedMovies] = useState([]);

  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [moviesToDisplay, setMoviesToDisplay] = useState(12)

  const moreMovies = windowInnerWidth >= 1190 ? 3 : 2
  const [finalNumberOfMoviesToDisplay, setFinalNumberOfMoviesToDisplay] = useState(moviesToDisplay)
  const [shortMovie, setShortMovie] = useState(false)

  console.log('savedMovies:', savedMovies);
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
    checkLocalStorage()
    setServerError({
      failed: false,
      message: ''
    })
  }, [])

  function checkLocalStorage() {
    if (localStorage.allFoundMovies) {
      setFilteredMovies(JSON.parse(localStorage.getItem('allFoundMovies')))
    } else {
      setFilteredMovies([])
    }
  }

 
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


  //function handleRegistration(name, email, password) {
  //  apiAuth
  //  .register(name, email, password)
  //  .then((res) => console.log(res))
  //  .catch((err) => console.log(err))
  //}

  function handleRegistration(name, email, password) {
    apiAuth
    .register(name, email, password)
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          setMessage({
            successful: true,
            message: "Вы успешно зарегистрировались!",
          });
        }
      })
      .catch((err) => {
        console.log(err)
        console.log(typeof err)
        setServerError({
          failed: true,
          message: err.toString()
        })
        setIsInfoTooltipOpen(true);
        setMessage({
          successful: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });

      })
      
  }
  
  function handleLogin(email, password) {
    apiAuth
    .login(password, email)
    .then((res) => {
      if (res.token) {
        UserDataCheck()
        checkLocalStorage()
      }
    })
    .catch((err) => {
      setServerError({
        failed: true,
        message: err.toString()
      })
    })
  }

  function handleLogout() {
    apiAuth
    .logout()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    setAuthorized(false)
    redirectToLogin()
    localStorage.removeItem('allFoundMovies')
    localStorage.removeItem('keyWord')
    localStorage.removeItem('shortMovie')
  }
 
  useEffect(() => {
    UserDataCheck()
  }, [])

  function UserDataCheck() {
    apiAuth
    .getUserData()
    .then((user) => {
      if (user) {
        setCurrentUser(user)
        setAuthorized(true)
        history.push("/movies")
      } else {
        setAuthorized(false)
      }
      
    })
    .catch((err) => console.log(err))
  }

  function handleUserUpdate (email, name) {
    mainApi
    .editProfile(email, name)
    .then((updatedUser) => {
      setIsInfoTooltipOpen(true);
      setMessage({
        successful: true,
        message: "Данные обновлены",
      });
      setCurrentUser(updatedUser)
    })
    .catch((err) => console.log(err))
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
    redirectToLoginAfterRegistration();
  }

  function redirectToLoginAfterRegistration() {
    if (message.successful) {
      redirectToLogin();
    }
  }

  function redirectToRegistration() {
    history.push("/signup");
  }

  function redirectToLogin() {
    history.push("/signin");
  }

  return (
    <div className='wrapper'>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <Switch>
            <Route exact path='/'>
              <Main>
                <Header authorized={authorized}/>
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
            <ProtectedRoute path='/movies' authorized={authorized}>
              <Route >
                <Movies>
                  <Header loggedIn={loggedIn}/>
                  <SearchForm onSearchBtn={searchMovies} setShortMovie={setShortMovie} />
                  <Preloader isLoading={isLoading}/>
                  <MoviesCardList filteredMovies={filteredMovies}  isSearchSuccessful={isSearchSuccessful}
                  serverError={serverError} saveFilm={saveFilm} handleMoreBtnClick={handleMoreBtnClick}
                  finalNumberOfMoviesToDisplay={finalNumberOfMoviesToDisplay}/>
                  <Footer />
                </Movies>
              </Route>
            </ProtectedRoute>

            <ProtectedRoute path='/saved-movies' authorized={authorized}>        
              <Route >
                <SavedMovies>
                  <Header loggedIn={loggedIn}/>
                  <SearchForm />
                  <MoviesCardList saved={saved} savedMovies={savedMovies} deleteFilm={deleteFilm}/>
                  <Preloader />
                  <Footer />
                </SavedMovies>
              </Route>
            </ProtectedRoute>

            <ProtectedRoute path='/profile' authorized={authorized}>
              <Route >
                <Profile onExitBtn={handleLogout} handleUserUpdate={handleUserUpdate}>
                  <Header loggedIn={loggedIn}/>
                </Profile>
              </Route>
            </ProtectedRoute>

            <Route path='/signup'>
              <Register onRegisterBtn={handleRegistration} serverError={serverError}>
                <Header minimal={minimal}/>
              </Register>
            </Route>
            <Route path='/signin'>
              <Login onLoginBtn={handleLogin} serverError={serverError}>
                <Header minimal={minimal}/>
              </Login>
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
          
        </div>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltip}
          message={message.message}
          successful={message.successful}
        />
      </CurrentUserContext.Provider>  
    </div>
  )

}

export default App;