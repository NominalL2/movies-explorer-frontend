import './SavedMovies.css';

import { useState, useEffect, useCallback } from 'react';

import Header from '../Header/Header.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import SavedMoviesCardList from './MoviesCardList/SavedMoviesCardList.js';
import Preloader from '../Movies/Preloader/Preloader.js';
import Footer from '../Footer/Footer.js';
import Loading from '../Loading/Loading.js';

import { mainApi } from '../../utils/MainApi.js';


function SavedMovies(props) {
  const [cards, setCards] = useState([])
  const [cardsToShow, setCardsToShow] = useState([]);
  const [preloaderToShow, setPreloaderToShow] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [filterByDuration, setFilterByDuration] = useState(false);
  const [query, setQuery] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');


  const handleSearch = () => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    const increment = window.innerWidth < 768 ? 5 : 7;

    mainApi.getSavedMovies(jwt)
      .then((resCards) => {
        const filteredMovies = resCards.filter((movie) =>
          movie.nameRU.toLowerCase().includes(query.trim().toLowerCase())
        );
        if (filteredMovies.length === 0) {
          setLoadingMessage('Ничего не найдено');
          setCardsToShow([]);
          setCards([]);
        } else if (filterByDuration) {
          setLoadingMessage('');
          setCards(filteredMovies);
          filterCardsByDucation();
        } else {
          setLoadingMessage('');
          setCardsToShow(filteredMovies.slice(0, increment));
          setCards(filteredMovies);
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
  };

  const handleSetQuery = (query) => {
    setQuery(query);
  };

  const filterCardsByDucation = useCallback(() => {
    const increment = window.innerWidth < 768 ? 5 : 7;
    const filterCards = cards.filter((movie) =>
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
      <main className='saved-movies'>
        <SearchForm
          handleSetQuery={handleSetQuery}
          defaultQueryValue=''
          handleCheckboxClick={handleCheckboxClick}
          defaultCheckedValue={false}
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