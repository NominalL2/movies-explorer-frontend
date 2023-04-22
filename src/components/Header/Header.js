import './Header.css';

function Header() {
  return (
    <header className='header'>
      <div className='header__logo'></div>
      <div className='header__sign'>
      <p className='header__signup'>Регистрация</p>
      <button className='header__signin'>Войти</button>
      </div>
    </header>
  );
}

export default Header;