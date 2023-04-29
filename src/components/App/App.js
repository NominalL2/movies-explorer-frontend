import './App.css';

import { Route, Routes, } from 'react-router-dom';

import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';

function App() {
  return (
    <>
    <div className='page'>

    <Routes>
      <Route path='/' element={<Main/>} />
      <Route path='/movies' element={<Movies/>} />
      <Route path='/saved-movies' element={<SavedMovies/>} />
      <Route path='/profile' element={<Profile name='Никита' email='pochta@yandex.ru' />} />
      <Route path='/signup' element={<Register/>} />
      <Route path='/signin' element={<Login/>} />
    </Routes>
    </div>
    </>
  );
}

export default App;
