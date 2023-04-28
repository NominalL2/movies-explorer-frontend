import './App.css';

import { Route, Routes, } from 'react-router-dom';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';

function App() {
  return (
    <>
    <div className='page'>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Main/>} />
      <Route path='/movies' element={<Movies/>} />
      <Route path='/saved-movies' element={<SavedMovies/>} />
      <Route path='/profile' element={<Profile name='Никита' email='pochta@yandex.ru' />} />
    </Routes>
    </div>
    </>
  );
}

export default App;
