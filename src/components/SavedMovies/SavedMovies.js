import './SavedMovies.css';

import { useState, useEffect, useCallback } from 'react';

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
  const [filterByDuration, setFilterByDuration] = useState(false);

  const preloaderHandleClick = () => {
    const currentLength = cardsToShow.length;
    const nextIndex = currentLength + 7;
    const nextCards = cards.slice(currentLength, nextIndex);

    setCardsToShow([...cardsToShow, ...nextCards]);
  };

  const handleCheckboxClick = () => {
    setFilterByDuration(!filterByDuration);
  }


  const handleSearch = (query) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    mainApi.getSavedMovies(jwt)
      .then((res) => {
        const filteredMovies = res.filter((movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase())
        );
        setCardsToShow(filteredMovies.slice(0, 7));
        setCards(filteredMovies)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const getCards = useCallback(() => {
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
  }, [])

  const filterCardsByDucation = useCallback((cards) => {
    const filterCards = cards.filter((movie) =>
      movie.duration <= 40
    );
    setCardsToShow(filterCards.slice(0, 7));
    setCards(filterCards)
  }, [])

  useEffect(() => {
    getCards()
  }, [getCards]);

  useEffect(() => {
    setIsLoading(true);
    if (filterByDuration) {
      filterCardsByDucation(cards);
      setIsLoading(false);
    } else {
      getCards();
    }

  }, [filterByDuration]);

  return (
    <>
      <main className='saved-movies'>
        <SearchForm handleSearch={handleSearch} handleCheckboxClick={handleCheckboxClick} />
        {isLoading ? <Loading /> :
          <>
            <SavedMoviesCardList cardsToShow={cardsToShow} />
            <Preloader preloaderHandleClick={preloaderHandleClick} />
          </>
        }
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;