import './App.css';

import { useEffect, useState, useCallback } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../context/CurrentUserContext.js';

import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';
import LoggedProtectedRouteElement from '../LoggedProtectedRoute/LoggedProtectedRoute.js';

import { mainApi } from '../../utils/MainApi.js';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import NotFoundError from '../NotFoundError/NotFoundError.js';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  function handleTokenChange(newToken) {
    localStorage.setItem('jwt', newToken);
    setLoggedIn(true);
  }

  const checkToken = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    try {
      await mainApi.checkToken(jwt);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }, []);

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

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    mainApi.getUser(jwt)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [loggedIn])

  useEffect(() => {
    checkToken();
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className='page'>
          <Routes>
            <Route path='/' element={<Main loggedIn={loggedIn} handleGoMain={handleGoMain} />} />
            <Route path='/movies' element={<ProtectedRouteElement element={Movies} isLoading={isLoading} loggedIn={loggedIn} handleGoMain={handleGoMain} />} />
            <Route path='/saved-movies' element={<ProtectedRouteElement element={SavedMovies} isLoading={isLoading} loggedIn={loggedIn} handleGoMain={handleGoMain} />} />
            <Route path='/profile' element={<ProtectedRouteElement element={Profile} isLoading={isLoading} loggedIn={loggedIn} handleGoMain={handleGoMain} handleExit={handleExit} />} />
            <Route path='/signup' element={<LoggedProtectedRouteElement element={Register} handleTokenChange={handleTokenChange} handleGoMain={handleGoMain} isLoading={isLoading} loggedIn={loggedIn} />} />
            <Route path='/signin' element={<LoggedProtectedRouteElement element={Login} handleTokenChange={handleTokenChange} handleGoMain={handleGoMain} isLoading={isLoading} loggedIn={loggedIn} />} />
            <Route path='*' element={<NotFoundError handleGoBack={handleGoBack} />} />
          </Routes>
        </div>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
