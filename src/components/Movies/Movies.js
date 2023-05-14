import './Movies.css';

import { useState, useEffect, useCallback } from 'react';

import Header from '../Header/Header.js';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Preloader from './Preloader/Preloader.js';
import Footer from '../Footer/Footer.js';
import Loading from '../Loading/Loading.js';

import { movieApi } from '../../utils/MoviesApi.js';
import { mainApi } from '../../utils/MainApi.js';

function Movies(props) {
  const increment = window.innerWidth < 768 ? 5 : 7;
  const [cards, setCards] = useState([]);
  const [cardsToShow, setCardsToShow] = useState([]);
  const [preloaderToShow, setPreloaderToShow] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [filterByDuration, setFilterByDuration] = useState(false);
  const [query, setQuery] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');

  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  };

  function readFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : '';
  };

  const preloaderHandleClick = () => {
    const currentLength = cardsToShow.length;
    const nextIndex = currentLength + increment;
    const nextCards = cards.slice(currentLength, nextIndex);

    setCardsToShow([...cardsToShow, ...nextCards]);

    if (nextCards.length <= increment) {
      setPreloaderToShow(false);
    }
  };

  const handleCheckboxClick = () => {
    const newValue = !filterByDuration;
    setFilterByDuration(newValue);
    saveToLocalStorage('filterByDuration', newValue);
  };

  const handleSetQuery = (query) => {
    setQuery(query);
    saveToLocalStorage('query', query);
  };

  function mergeMoviesCards(jwt, resCards) {

    return mainApi.getSavedMovies(jwt)
      .then((resSavedCards) => {
        const mergedArrayCards = resCards.map(card => {
          // Объеденяет массив картачек фильмов с массивом сохраненных карточек для того что бы потом определять лайкнута карточка или нет
          const savedCards = resSavedCards.find(savedCard => savedCard.movieId === card.id);
          return savedCards ? Object.assign({}, card, { _id: savedCards._id }) : card; // Добавляет к элементу с данными фильма поле _id если id фильма и id сохраненного фильма совпадают
        });
        return mergedArrayCards;
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const filterCardsByDucation = useCallback(() => {
    const savedCards = readFromLocalStorage('cards');
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
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    const query = readFromLocalStorage('query');
    const filterByDuration = readFromLocalStorage('filterByDuration');

    movieApi.getCards()
      .then((resCards) => {
        mergeMoviesCards(jwt, resCards)
          .then((mergedArrayCards) => {
            const filteredMovies = mergedArrayCards.filter((movie) =>
              movie.nameRU.toLowerCase().includes(query.trim().toLowerCase())
            );
            if (filteredMovies.length === 0) {
              setLoadingMessage('Ничего не найдено');
              saveToLocalStorage('cards', []);
              setCardsToShow([]);
              setCards([]);
            } else if (filterByDuration) {
              setLoadingMessage('');
              saveToLocalStorage('cards', filteredMovies);
              filterCardsByDucation();
            } else {
              setLoadingMessage('');
              setCardsToShow(filteredMovies.slice(0, increment));
              setCards(filteredMovies);
              saveToLocalStorage('cards', filteredMovies);
            }
          })
      })
      .catch((err) => {
        setLoadingMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  useEffect(() => {
    if (localStorage.getItem('filterByDuration') !== null) {
      setFilterByDuration(readFromLocalStorage('filterByDuration'));
    }
  }, []);

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
    <Header logged={props.loggedIn} handleGoMain={props.handleGoMain} />
      <main className='movies'>
        <SearchForm
          handleSetQuery={handleSetQuery}
          defaultQueryValue={readFromLocalStorage('query')}
          handleCheckboxClick={handleCheckboxClick}
          defaultCheckedValue={readFromLocalStorage('filterByDuration')}
        />
        {isLoading ? <Loading /> :
          <>
            <MoviesCardList loadingMessage={loadingMessage} cardsToShow={cardsToShow} />
            <Preloader preloaderToShow={preloaderToShow} preloaderHandleClick={preloaderHandleClick} />
          </>
        }
      </main>
      <Footer />
    </>
  );
}

export default Movies;