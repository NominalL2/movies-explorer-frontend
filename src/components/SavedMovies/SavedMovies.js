import './SavedMovies.css';

import Header from '../Header/Header.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import SavedMoviesCardList from './MoviesCardList/SavedMoviesCardList.js';
import Preloader from '../Movies/Preloader/Preloader.js';
import Footer from '../Footer/Footer.js';

function SavedMovies() {
  return (
    <>
      <Header logged={true} />
      <SearchForm />
      <main className='saved-movies'>
        <SavedMoviesCardList />
        <Preloader />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;