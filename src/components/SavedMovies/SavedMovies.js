import './SavedMovies.css';

import SearchForm from '../Movies/SearchForm/SearchForm.js';
import SavedMoviesCardList from './MoviesCardList/SavedMoviesCardList.js';
import Preloader from '../Movies/Preloader/Preloader.js';
import Footer from '../Footer/Footer.js';

function SavedMovies() {
  return (
    <>
      <main className='saved-movies'>
        <SearchForm />
        <SavedMoviesCardList />
        <Preloader />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;