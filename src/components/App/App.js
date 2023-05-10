import './App.css';

import { useEffect, useState, useCallback } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../context/CurrentUserContext.js';

import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';

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
    localStorage.removeItem('jwt');
    navigate('/', setLoggedIn(false));
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
  }, [])

  useEffect(() => {
    checkToken()
  }, [checkToken])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className='page'>
          <Header logged={loggedIn} />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/movies' element={<ProtectedRouteElement element={Movies} isLoading={isLoading} loggedIn={loggedIn} />} />
            <Route path='/saved-movies' element={<ProtectedRouteElement element={SavedMovies} isLoading={isLoading} loggedIn={loggedIn} />} />
            <Route path='/profile' element={<ProtectedRouteElement element={Profile} isLoading={isLoading} loggedIn={loggedIn} name='Виталий' email='pochta@yandex.ru' handleExit={handleExit} />} />
            <Route path='/signup' element={<Register handleTokenChange={handleTokenChange} />} />
            <Route path='/signin' element={<Login handleTokenChange={handleTokenChange} />} />
            <Route path='*' element={<NotFoundError handleGoBack={handleGoBack} />} />
          </Routes>
        </div>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
