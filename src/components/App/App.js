import { Route, Switch } from 'react-router-dom';
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


function App() {

  const loggedIn = true;
  const saved = true;
  const minimal = true;
 

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
              <SearchForm />
              <MoviesCardList />
              <Preloader />
              <Footer />
            </Movies>
          </Route>
          <Route path='/saved-movies'>
            <SavedMovies>
              <Header loggedIn={loggedIn}/>
              <SearchForm />
              <MoviesCardList saved={saved} />
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