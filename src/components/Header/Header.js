import './Header.css';

import Navigation from '../Navigation/Navigation.js';

function Header(props) {

    return (
      <header className='header'>
        <div onClick={props.handleGoMain} className='header__logo' />
        <Navigation handleGoMain={props.handleGoMain} />
      </header>
    )
}

export default Header;