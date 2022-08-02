import Header from '../Header/Header';
import Main from '../Main/Main';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import LandingTitle from '../LandingTitle/LandingTitle';
import Techs from '../Techs/Techs';


function App() {
  return (
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
      </Main>

    </div>
  )

}

export default App;