import './Main.css';

import NavTab from './NavTab/NavTab.js';
import Promo from './Promo/Promo.js';
import Techs from './Techs/Techs.js';
import AboutMe from './AboutMe/AboutMe.js';
import Portfolio from './Portfolio/Portfolio.js';

function Main() {
  return (
    <main className='content'>
      <NavTab></NavTab>
      <Promo></Promo>
      <Techs></Techs>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
    </main>
  );
}

export default Main;