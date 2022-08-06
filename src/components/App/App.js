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
import Profile from '../Profile/Profile'



function App() {

  const loggedIn = true;
  const saved = true;


  return (
    <div className='wrapper'>
      <div className="root">
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
        <Movies>
          <Header loggedIn={loggedIn}/>
          <SearchForm />
          <MoviesCardList />
          <Preloader />
          <Footer />
        </Movies>
        <SavedMovies>
          <Header loggedIn={loggedIn}/>
          <SearchForm />
          <MoviesCardList saved={saved} />
          <Preloader />
          <Footer />
        </SavedMovies>
        <Profile>
          <Header loggedIn={loggedIn}/>
        </Profile>
  
      </div>
    </div>
  )

}

export default App;