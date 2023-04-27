import './SavedMovies.css';

import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Preloader from '../Movies/Preloader/Preloader.js';

function SavedMovies() {
  return (
    <>
      <SearchForm />
      <main className='content'>
        <MoviesCardList />
        <Preloader />
      </main>
    </>
  );
}

export default SavedMovies;