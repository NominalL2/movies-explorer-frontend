import './Movies.css';

import Header from '../Header/Header.js';
import PopupMenu from '../PopupMenu/PopupMenu.js';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Preloader from './Preloader/Preloader.js';
import Footer from '../Footer/Footer.js';

function Movies() {
  return (
    <>
      <Header logged={true} />
      <PopupMenu />
      <SearchForm />
      <main className='movies'>
        <MoviesCardList />
        <Preloader />
      </main>
      <Footer />
    </>
  );
}

export default Movies;