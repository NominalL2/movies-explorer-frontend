import './Main.css';

import NavTab from './NavTab/NavTab.js';
import Promo from './Promo/Promo.js';

function Main() {
  return (
    <main className='content'>
      <NavTab></NavTab>
      <Promo></Promo>
    </main>
  );
}

export default Main;