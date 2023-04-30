import './Movies.css';

import Header from '../Header/Header.js';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Preloader from './Preloader/Preloader.js';
import Footer from '../Footer/Footer.js';

function Movies() {
  return (
    <>
      <Header logged={true} />
      <SearchForm />
      <main className='content'>
        <MoviesCardList />
        <Preloader />
      </main>
      <Footer />
    </>
  );
}

export default Movies;