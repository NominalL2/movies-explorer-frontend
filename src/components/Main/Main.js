import './Main.css';

import Header from '../Header/Header.js';
import NavTab from './NavTab/NavTab.js';
import Promo from './Promo/Promo.js';
import Techs from './Techs/Techs.js';
import AboutMe from './AboutMe/AboutMe.js';
import Portfolio from './Portfolio/Portfolio.js';
import Footer from '../Footer/Footer.js';

function Main() {
  return (
    <>
      <Header logged={false} />
      <main className='main'>
        <NavTab />
        <Promo />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;