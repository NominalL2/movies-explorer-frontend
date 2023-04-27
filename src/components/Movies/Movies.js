import './Movies.css';

import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Preloader from './Preloader/Preloader.js';

function Movies() {
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

export default Movies;