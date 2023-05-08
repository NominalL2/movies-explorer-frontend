import './Movies.css';

import { useState, useEffect } from 'react';

import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Preloader from './Preloader/Preloader.js';
import Footer from '../Footer/Footer.js';
import Loading from '../Loading/Loading.js';

import { movieApi } from '../../utils/MoviesApi.js';

function Movies() {
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
    movieApi.getCards()
      .then((res) => {
        setCardsToShow(res.slice(0, 7));
        setCards(res)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  return (
    isLoading ? <Loading /> :
    <>
      <main className='movies'>
        <SearchForm />
        <MoviesCardList cardsToShow={cardsToShow} />
        <Preloader preloaderHandleClick={preloaderHandleClick} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;