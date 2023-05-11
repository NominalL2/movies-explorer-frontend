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
  const [preloaderToShow, setPreloaderToShow] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [filterByDuration, setFilterByDuration] = useState(false);
  const [query, setQuery] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');

  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function readFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : '';
  }

  const handleSearch = () => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    const query = readFromLocalStorage('saved-query');
    const filterByDuration = readFromLocalStorage('saved-filterByDuration');
    const increment = window.innerWidth < 768 ? 5 : 7;

    mainApi.getSavedMovies(jwt)
      .then((resCards) => {
        const filteredMovies = resCards.filter((movie) =>
          movie.nameRU.toLowerCase().includes(query.trim().toLowerCase())
        );
        if (filteredMovies.length === 0) {
          setLoadingMessage('Ничего не найдено');
          saveToLocalStorage('saved-cards', []);
          setCardsToShow([]);
          setCards([]);
        } else if (filterByDuration) {
          setLoadingMessage('');
          saveToLocalStorage('saved-cards', filteredMovies);
          filterCardsByDucation();
        } else {
          setLoadingMessage('');
          setCardsToShow(filteredMovies.slice(0, increment));
          setCards(filteredMovies);
          saveToLocalStorage('saved-cards', filteredMovies);
        }
      })
      .catch((err) => {
        setLoadingMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const preloaderHandleClick = () => {
    const increment = window.innerWidth < 768 ? 5 : 7;

    const currentLength = cardsToShow.length;
    const nextIndex = currentLength + increment;
    const nextCards = cards.slice(currentLength, nextIndex);

    setCardsToShow([...cardsToShow, ...nextCards]);

    if (nextCards.length < increment) {
      setPreloaderToShow(false);
    }
  };

  const handleCheckboxClick = () => {
    const newValue = !filterByDuration;
    setFilterByDuration(newValue);
    saveToLocalStorage('saved-filterByDuration', newValue);
  };

  const handleSetQuery = (query) => {
    setQuery(query);
    saveToLocalStorage('saved-query', query);
  }

  const filterCardsByDucation = useCallback(() => {
    const increment = window.innerWidth < 768 ? 5 : 7;
    const savedCards = readFromLocalStorage('saved-cards');
    const filterCards = savedCards.filter((movie) =>
      movie.duration <= 40
    );
    if (filterCards.length === 0) {
      setLoadingMessage('Ничего не найдено');
    } else {
      setLoadingMessage('');
      setCardsToShow(filterCards.slice(0, increment));
      setCards(filterCards);
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('saved-filterByDuration') !== null)
      setFilterByDuration(readFromLocalStorage('saved-filterByDuration'));
  }, [])

  useEffect(() => {
    if (cards.length <= cardsToShow.length) {
      setPreloaderToShow(false);
    } else {
      setPreloaderToShow(true);
    }
  }, [cardsToShow]);

  useEffect(() => {
    handleSearch();
  }, [filterByDuration, query]);

  return (
    <>
      <main className='saved-movies'>
        <SearchForm
          handleSetQuery={handleSetQuery}
          defaultQueryValue={readFromLocalStorage('saved-query')}
          handleCheckboxClick={handleCheckboxClick}
          defaultCheckedValue={readFromLocalStorage('saved-filterByDuration')}
        />
        {isLoading ? <Loading /> :
          <>
            <SavedMoviesCardList loadingMessage={loadingMessage} cardsToShow={cardsToShow} />
            <Preloader preloaderToShow={preloaderToShow} preloaderHandleClick={preloaderHandleClick} />
          </>
        }
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;