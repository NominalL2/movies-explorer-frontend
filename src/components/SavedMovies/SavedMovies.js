import './SavedMovies.css';

import { useState, useEffect } from 'react';

import SearchForm from '../Movies/SearchForm/SearchForm.js';
import SavedMoviesCardList from './MoviesCardList/SavedMoviesCardList.js';
import Preloader from '../Movies/Preloader/Preloader.js';
import Footer from '../Footer/Footer.js';
import Loading from '../Loading/Loading.js';

import { mainApi } from '../../utils/MainApi.js';


function SavedMovies() {
  const [cards, setCards] = useState([])
  const [cardsToShow, setCardsToShow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const preloaderHandleClick = () => {
    const currentLength = cardsToShow.length;
    const nextIndex = currentLength + 7;
    const nextCards = cards.slice(currentLength, nextIndex);

    setCardsToShow([...cardsToShow, ...nextCards]);
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    mainApi.getSavedMovies(jwt)
      .then((res) => {
        setCardsToShow(res.slice(0, 7));
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  });

  return (
    isLoading ? <Loading /> :
      <>
        <main className='saved-movies'>
          <SearchForm />
          <SavedMoviesCardList cardsToShow={cardsToShow} />
          <Preloader preloaderHandleClick={preloaderHandleClick} />
        </main>
        <Footer />
      </>
  );
}

export default SavedMovies;