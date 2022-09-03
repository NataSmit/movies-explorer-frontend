import { Route, Switch, useHistory, useLocation, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import LandingTitle from "../LandingTitle/LandingTitle";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import { apiAuth } from "../../utils/ApiAuth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { useCurrentWidth } from "../../hooks/useCurrentWidth";
import {SHORTMOVIESDURATION, 
        BIGSCREEN, 
        MEDIUMSCREEN, 
        SMALLSCREEN, 
        CARDSNUMBERONBIGSCREEN, 
        CARDSNUMBERONMEDIUMSCREEN,
        CARDSNUMBERONSMALLSCREEN } from '../../utils/config';

function App() {
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState({});
  const [authorized, setAuthorized] = useState(undefined);
  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState({
    successful: undefined,
    message: "",
  });
  const loggedIn = true;
  const saved = true;
  const minimal = true;
  const windowInnerWidth = useCurrentWidth();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(undefined);
  const [serverError, setServerError] = useState({
    failed: false,
    message: "",
  });
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesForRender, setSavedMoviesForRender] = useState([]);
  const [noKeyword, setNoKeyword] = useState(false);
  const [moviesToDisplay, setMoviesToDisplay] = useState(12);
  const moreMovies = windowInnerWidth >= 1190 ? 3 : 2;
  const [finalNumberOfMoviesToDisplay, setFinalNumberOfMoviesToDisplay] =
    useState(moviesToDisplay);
  const [shortMovie, setShortMovie] = useState(false);
  const [processing, setProcessing] = useState(false);

 // console.log('windowInnerWidth', windowInnerWidth)
 // console.log('moviesToDisplay', moviesToDisplay)
  console.log('authorized', authorized)
  console.log('location.pathname', location.pathname)
  console.log('shortMovie App', shortMovie)

  useEffect(() => {
    if (BIGSCREEN >= windowInnerWidth && windowInnerWidth >= MEDIUMSCREEN) {
      setMoviesToDisplay(CARDSNUMBERONBIGSCREEN);
    } else if (MEDIUMSCREEN >= windowInnerWidth && windowInnerWidth >= SMALLSCREEN) {
      setMoviesToDisplay(CARDSNUMBERONMEDIUMSCREEN);
    } else {
      setMoviesToDisplay(CARDSNUMBERONSMALLSCREEN);
    }
  }, [windowInnerWidth, moviesToDisplay]);

  useEffect(() => {
    if (shortMovie) {
      if (localStorage.allFoundMovies) {
        setFilteredMovies(filterShortMovies(JSON.parse(localStorage.getItem("allFoundMovies"))));
      } else {
        //setFilteredMovies(filterShortMovies(initialMovies));
        setFilteredMovies([]);
      }
    } else {
      if (localStorage.allFoundMovies) {
        setFilteredMovies(JSON.parse(localStorage.getItem("allFoundMovies")));
      } else {
        setFilteredMovies([]);
      }
    }
  }, [shortMovie]);

  useEffect(() => {
    if (shortMovie) {
      if (savedMovies.length === 0) {
        setSavedMoviesForRender([]);
      } else {
        setSavedMoviesForRender(filterShortMovies(savedMovies));
      }
    } else {
      if (savedMovies.length === 0) {
        setSavedMoviesForRender([]);
      } else {
        setSavedMoviesForRender(savedMovies);
      }
    }
  }, [shortMovie, savedMovies]);

  useEffect(() => {
    handleShortMovieBtn()
    getSavedMovies();
    setServerError({
      failed: false,
      message: "",
    });
    setMessage({
      successful: undefined,
      message: "",
    });

  }, []);

  useEffect(() => {
    if (localStorage.shortMovieMoviesPage) {
      setShortMovie(JSON.parse(localStorage.getItem("shortMovieMoviesPage")))
    } else {
      setShortMovie(undefined)
    }
  }, [])

  useEffect(() => {
    getSavedMovies();
  }, [authorized]);

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setSavedMoviesForRender(savedMovies);
    }
  }, [location.pathname, savedMovies])

  useEffect(() => {
    apiAuth
      .getUserData()
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          setAuthorized(true);
          history.push(location.pathname)
        } else {
          setAuthorized(false);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (location.pathname) {
      setIsSearchSuccessful(undefined);
    }

  }, [location.pathname])

  //useEffect(() => {
  //  if (location.pathname === '/movies') {
  //    setShortMovie(JSON.parse(localStorage.getItem("shortMovieMoviesPage")));
  //  }
  //}, [location.pathname])


  //---------------логика работы фильмов------------


  function handleMoreBtnClick() {
    setFinalNumberOfMoviesToDisplay(finalNumberOfMoviesToDisplay + moreMovies);
  }

  function filterMovies(keyWord, serverMovies) {
    const allFoundMovies = serverMovies.filter((film) =>
      film.nameRU.toLowerCase().includes(keyWord.toLowerCase())
    );
    checkIsSearchSuccessful(allFoundMovies);
    localStorage.setItem("allFoundMovies", JSON.stringify(allFoundMovies));
    localStorage.setItem("keyWord", keyWord);
    setFilteredMovies(
      shortMovie
        ? filterShortMovies(allFoundMovies)
        : allFoundMovies
    );
    //setFilteredMovies(allFoundMovies)
  }

  function filterShortMovies(moviesArr) {
    return moviesArr.filter((film) => film.duration <= SHORTMOVIESDURATION);
  }

  function handleShortMovieBtn() {
    localStorage.setItem("shortMovieMoviesPage", JSON.stringify(!shortMovie));
    if (shortMovie) {
      if (localStorage.allFoundMovies) {
        setFilteredMovies(
          filterShortMovies(JSON.parse(localStorage.getItem("allFoundMovies")))
        );
      } else {
        //setFilteredMovies(filterShortMovies(initialMovies));
        setFilteredMovies([]);
      }
    } else {
      if (localStorage.allFoundMovies) {
        setFilteredMovies(JSON.parse(localStorage.getItem("allFoundMovies")));
      } else {
        setFilteredMovies([]);
      }
    }
  }

  function handleShortMovieBtnOnSavedMoviesPage() {
    if (shortMovie) {
      if (savedMovies.length === 0) {
        setSavedMoviesForRender([]);
      } else {
        setSavedMoviesForRender(filterShortMovies(savedMovies));
      }
    } else {
      if (savedMovies.length === 0) {
        setSavedMoviesForRender([]);
      } else {
        setSavedMoviesForRender(savedMovies);
      }
    }
  }


  

  function checkIsSearchSuccessful(filmArr) {
    if (filmArr.length === 0) {
      setIsSearchSuccessful(false);
    } else {
      setIsSearchSuccessful(true);
    }
  }

  function searchWithinSavedMovies(keyWord) {
    const filteredSavedMovies = savedMovies.filter((film) =>
      film.nameRU.toLowerCase().includes(keyWord.toLowerCase())
    );
    checkIsSearchSuccessful(filteredSavedMovies);
    setSavedMoviesForRender(filteredSavedMovies);
  }

  function searchMovies(keyWord) {
    setFinalNumberOfMoviesToDisplay(moviesToDisplay);
    if (!keyWord) {
      setNoKeyword(true);
      return;
    } else {
      setNoKeyword(false);
    }
    if (!localStorage.initialMovies) {
      setIsLoading(true);
      setProcessing(true)
      moviesApi
        .getMovies()
        .then((moviesArr) => {
          filterMovies(keyWord, moviesArr);
          setInitialMovies(moviesArr);
          localStorage.setItem("initialMovies", JSON.stringify(moviesArr));
        })
        .catch((err) => {
          setMessage({
            successful: false,
            message:
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
          });
        })
        .finally(() => {
          setIsLoading(false);
          setProcessing(false)
        });
    } else {
      filterMovies(keyWord, JSON.parse(localStorage.getItem("initialMovies")));
    }
  }

  function saveFilm(film) {
    mainApi
      .saveFilm(film)
      .then((savedFilm) => {
        setSavedMovies([savedFilm, ...savedMovies]);
        setSavedMoviesForRender([savedFilm, ...savedMovies]);
      })
      .catch((err) => console.log("err by saving a film", err));
  }

  function deleteFilm(id) {
    mainApi
      .deleteFilm(id)
      .then((res) => {
        setSavedMovies((state) => state.filter((film) => film._id !== id));
        setSavedMoviesForRender((state) =>
          state.filter((film) => film._id !== id)
        );
      })
      .catch((err) => console.log(err));
  }

  function deleteSavedFilmFromMoviesPage(id) {
    const movieToDelete = savedMovies.find((movie) => movie.movieId === id);
    deleteFilm(movieToDelete._id);
  }

  function getSavedMovies() {
    mainApi
      .getFilms()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
        localStorage.setItem("savedMovie", JSON.stringify(savedMovies));
        setSavedMoviesForRender(savedMovies);
      })
      .catch((err) => console.log(err));
  }

  //-------------логика работы с юзером-------------

  function handleRegistration(name, email, password) {
    setProcessing(true)
    apiAuth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          setMessage({
            successful: true,
            message: "Вы успешно зарегистрировались!",
          });
          handleLogin(email, password)
        }
      })
      .catch((err) => {
        setServerError({
          failed: true,
          message: err.toString(),
        });
        setIsInfoTooltipOpen(true);
        setMessage({
          successful: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        setProcessing(false);
      })
  }

  function handleLogin(email, password) {
    setProcessing(true)
    apiAuth
      .login(password, email)
      .then((res) => {
        if (res) {
          checkUserData();
          history.push("/movies");
        }
      })
      .catch((err) => {
        setServerError({
          failed: true,
          message: err.toString(),
        });
        setAuthorized(false);
      })
      .finally(() => {
        setProcessing(false)
      })
  }

  function handleLogout() {
    apiAuth
      .logout()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setAuthorized(false);
    history.push("/");
    localStorage.removeItem("allFoundMovies");
    localStorage.removeItem("keyWord");
    localStorage.removeItem("shortMovieMoviesPage");
    localStorage.removeItem('initialMovies');
  }

  function checkUserData() {
    apiAuth
      .getUserData()
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          setAuthorized(true);
          history.push("/movies");
        } else {
          setAuthorized(false);
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
  }

  function handleUserUpdate(email, name) {
    setProcessing(true)
    mainApi
      .editProfile(email, name)
      .then((updatedUser) => {
        setIsInfoTooltipOpen(true);
        setMessage({
          successful: true,
          message: "Данные обновлены",
        });
        setCurrentUser(updatedUser);
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setMessage({
          successful: false,
          message: "Ошибка при обновлении данных",
        });
        setServerError({
          failed: true,
          message: "Указанный email уже существует",
        });
      })
      .finally(() => {
        setProcessing(false)
      })
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  return (
    <div className="wrapper">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <Switch>
            <Route exact path="/">
              <Main>
                <Header authorized={authorized} />
                <Promo />
                <AboutProject>
                  <LandingTitle title={"О проекте"} />
                </AboutProject>
                <Techs>
                  <LandingTitle title={"Технологии"} />
                </Techs>
                <AboutMe>
                  <LandingTitle title={"Студент"} />
                </AboutMe>
                <Footer />
              </Main>
            </Route>
            <ProtectedRoute exact path="/movies" authorized={authorized}>
              <Route>
                <Movies>
                  <Header loggedIn={loggedIn} />
                  <SearchForm
                    onSearchBtn={searchMovies}
                    setShortMovie={setShortMovie}
                    handleShortMovieBtn={handleShortMovieBtn}
                    processing={processing}
                  />
                  <Preloader isLoading={isLoading} />
                  <MoviesCardList
                    filteredMovies={filteredMovies}
                    isSearchSuccessful={isSearchSuccessful}
                    serverError={serverError}
                    saveFilm={saveFilm}
                    handleMoreBtnClick={handleMoreBtnClick}
                    finalNumberOfMoviesToDisplay={finalNumberOfMoviesToDisplay}
                    savedMovies={savedMovies}
                    deleteFilmFromMoviesPage={deleteSavedFilmFromMoviesPage}
                    message={message}
                    noKeyword={noKeyword}
                    savedMoviesForRender={savedMoviesForRender}
                  />
                  <Footer />
                </Movies>
              </Route>
            </ProtectedRoute>

            <ProtectedRoute exact path="/saved-movies" authorized={authorized}>
              <Route>
                <SavedMovies>
                  <Header loggedIn={loggedIn} />
                  <SearchForm
                    onSearchBtn={searchWithinSavedMovies}
                    handleShortMovieBtn={handleShortMovieBtnOnSavedMoviesPage}
                    setShortMovie={setShortMovie}
                  />
                  <MoviesCardList
                    saved={saved}
                    savedMovies={savedMovies}
                    deleteFilm={deleteFilm}
                    serverError={serverError}
                    isSearchSuccessful={isSearchSuccessful}
                    noKeyword={noKeyword}
                    message={message}
                    savedMoviesForRender={savedMoviesForRender}
                  />
                  <Preloader />
                  <Footer />
                </SavedMovies>
              </Route>
            </ProtectedRoute>

            <ProtectedRoute exact path="/profile" authorized={authorized}>
              <Route>
                <Profile
                  onExitBtn={handleLogout}
                  handleUserUpdate={handleUserUpdate}
                  serverError={serverError}
                  setServerError={setServerError}
                  processing={processing}
                >
                  <Header loggedIn={loggedIn} />
                </Profile>
              </Route>
            </ProtectedRoute>

            <Route path="/signup">
              {authorized ? <Redirect to="/" /> :
              <Register
                onRegisterBtn={handleRegistration}
                serverError={serverError}
                processing={processing}
              >
                <Header minimal={minimal} />
              </Register>
              }
            </Route>
            <Route path="/signin">
            {authorized ? <Redirect to="/" /> :
              <Login onLoginBtn={handleLogin} serverError={serverError} processing={processing}>
                <Header minimal={minimal} />
              </Login>
            }
            </Route>
            <Route path="*">
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
  );
}

export default App;
