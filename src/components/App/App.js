import './App.css';

import { Route, Routes, useNavigate } from 'react-router-dom';

import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import NotFoundError from '../NotFoundError/NotFoundError.js';

function App() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <>
      <div className='page'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile name='Виталий' email='pochta@yandex.ru' />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
          <Route path='*' element={<NotFoundError handleGoBack={handleGoBack} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
