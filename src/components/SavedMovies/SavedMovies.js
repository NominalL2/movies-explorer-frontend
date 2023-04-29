import './SavedMovies.css';

import Header from '../Header/Header.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Preloader from '../Movies/Preloader/Preloader.js';
import Footer from '../Footer/Footer.js';

function SavedMovies() {
  return (
    <>
    <Header />
      <SearchForm />
      <main className='content'>
        <MoviesCardList />
        <Preloader />
      </main>
      <Footer></Footer>
    </>
  );
}

export default SavedMovies;