import './App.css';

import { Route, Routes, } from 'react-router-dom';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Footer from '../Footer/Footer.js';

function App() {
  return (
    <>
    <div className='page'>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Main/>} />
      <Route path='/movies' element={<Movies/>} />
      <Route path='saved-movies' element={<SavedMovies/>} />
    </Routes>
    <Footer></Footer>
    </div>
    </>
  );
}

export default App;
