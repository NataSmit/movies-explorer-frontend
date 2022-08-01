import Header from '../Header/Header';
import Main from '../Main/Main';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';


function App() {
  return (
    <div className="root">
      <Main>
        <Header />
        <Promo />
        <AboutProject />
      </Main>

    </div>
  )

}

export default App;