import './Navigation.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PopupMenu from '../PopupMenu/PopupMenu.js';

function Navigation(props) {

  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function handleOpenPopup() {
    setIsPopupOpen(true);
  }

  function handleClosePopup() {
    setIsPopupOpen(false);
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

  return (
    <>
      <nav className='navigation'>
        <div className='navigation__movies'>
          <button onClick={handleGoMovies} className='navigation__button'>Фильмы</button>
          <button onClick={handleGoSavedMovies} className='navigation__button'>Сохранённые фильмы</button>
        </div>
        <div className='navigation__account'>
          <button onClick={handleGoProfile} className='navigation__button'>Аккаунт</button>
          <span onClick={handleGoProfile} className='navigation__profile-icon' />
        </div>
        <div onClick={handleOpenPopup} className='navigation__nav-icon' />
      </nav>
      <PopupMenu
        handleClosePopup={handleClosePopup}
        handleGoMovies={handleGoMovies}
        handleGoProfile={handleGoProfile}
        handleGoSavedMovies={handleGoSavedMovies}
        handleGoMain={props.handleGoMain}
        isOpen={isPopupOpen} />
    </>
  )

}

export default Navigation;