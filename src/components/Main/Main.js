import './Main.css';

import NavTab from './NavTab/NavTab.js';
import Promo from './Promo/Promo.js';
import Techs from './Techs/Techs.js';
import AboutMe from './AboutMe/AboutMe.js';
import Portfolio from './Portfolio/Portfolio.js';
import Footer from '../Footer/Footer.js';

function Main() {
  return (
    <main className='content'>
      <NavTab></NavTab>
      <Promo></Promo>
      <Techs></Techs>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
      <Footer></Footer>
    </main>
  );
}

export default Main;