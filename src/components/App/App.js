import Header from '../Header/Header';
import Main from '../Main/Main';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import LandingTitle from '../LandingTitle/LandingTitle';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';




function App() {
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
  
      </div>
    </div>
  )

}

export default App;