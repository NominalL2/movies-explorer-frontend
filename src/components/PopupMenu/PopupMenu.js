import './PopupMenu.css';

function PopupMenu(props) {
  return (
    <>
      <div className={`popup-menu ${props.isOpen && 'popup-menu_open'}`}>
        <div onClick={props.handleClosePopup} className='popup-menu__exit' />
        <nav className='popup-menu__navigation'>
          <button onClick={props.handleGoMain} className='popup-menu__button'>Главная</button>
          <button onClick={props.handleGoMovies} className='popup-menu__button'>Фильмы</button>
          <button onClick={props.handleGoSavedMovies} className='popup-menu__button'>Сохранённые фильмы</button>
        </nav>
        <div className='popup-menu__account'>
        <button onClick={props.handleGoProfile} className='popup-menu__button popup-menu__button_account'>Аккаунт</button>
        <span onClick={props.handleGoProfile} className='popup-menu__profile-icon' />
        </div>
      </div>
    </>
  );
}

export default PopupMenu;