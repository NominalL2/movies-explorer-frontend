import './Header.css';

import { useNavigate } from 'react-router-dom';

import Navigation from '../Navigation/Navigation.js';

function Header(props) {

  const navigate = useNavigate();

  const handleGoRegister = () => {
    navigate('/signup');
  }

  const handleGoLogin = () => {
    navigate('/signin');
  }

  if (!props.logged) {
    return (
      <header className='header'>
        <div onClick={props.handleGoMain} className='header__logo' />
        <div className='header__sign'>
          <button onClick={handleGoRegister} className='header__signup'>Регистрация</button>
          <button onClick={handleGoLogin} className='header__signin'>Войти</button>
        </div>
      </header>
    );
  } else {
    return (
      <header className='header'>
        <div onClick={props.handleGoMain} className='header__logo' />
        <Navigation handleGoMain={props.handleGoMain} />
      </header>
    )
  }

}

export default Header;