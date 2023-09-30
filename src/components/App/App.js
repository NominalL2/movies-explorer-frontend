import './App.css';

import { useEffect, useState, useCallback } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../context/CurrentUserContext.js';

import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';
import LoggedProtectedRouteElement from '../LoggedProtectedRoute/LoggedProtectedRoute.js';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import NotFoundError from '../NotFoundError/NotFoundError.js';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  function handleTokenChange(newToken) {
    localStorage.setItem('jwt', newToken);
    setLoggedIn(true);
  }

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  const handleExit = () => {
    localStorage.clear();
    setCurrentUser(null);
    navigate('/', setLoggedIn(false));
  }

  const handleGoMain = () => {
    navigate('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className='page'>
          <Routes>
            <Route path='/' element={<Main loggedIn={loggedIn} handleGoMain={handleGoMain} />} />
            <Route path='/movies' element={<ProtectedRouteElement element={Movies} isLoading={isLoading} loggedIn={loggedIn} handleGoMain={handleGoMain} />} />
            <Route path='*' element={<NotFoundError handleGoBack={handleGoBack} />} />
          </Routes>
        </div>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
