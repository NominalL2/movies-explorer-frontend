import './Header.css';

import { useNavigate } from 'react-router-dom';

function Header(props) {

  const navigate = useNavigate();

  const handleGoLogo = () => {
    navigate('/');
  }

  const handleGoMovies = () => {
    navigate('/movies');
  }

  const handleGoSavedMovies = () => {
    navigate('/saved-movies');
  }

  const handleGoProfile = () => {
    navigate('/profile');
  }

  const handleGoRegister = () => {
    navigate('/signup');
  }

  const handleGoLogin = () => {
    navigate('/signin');
  }

  if (!props.logged) {
    return (
      <header className='header'>
        <div onClick={handleGoLogo} className='header__logo' />
        <div className='header__sign'>
          <button onClick={handleGoRegister} className='header__signup'>Регистрация</button>
          <button onClick={handleGoLogin} className='header__signin'>Войти</button>
        </div>
      </header>
    );
  } else {
    return (
      <header className='header header_logged'>
        <div onClick={handleGoLogo} className='header__logo' />
        <nav className='header__navigation'>
          <div className='header__movies'>
            <button onClick={handleGoMovies} className='header__link'>Фильмы</button>
            <button onClick={handleGoSavedMovies} className='header__link'>Сохранённые фильмы</button>
          </div>
          <div className='header__account'>
            <button onClick={handleGoProfile} className='header__link'>Аккаунт</button>
            <span onClick={handleGoProfile} className='header__icon' />
          </div>
        </nav>
      </header>
    )
  }

}

export default Header;