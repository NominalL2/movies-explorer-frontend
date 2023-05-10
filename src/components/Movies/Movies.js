import './Movies.css';

import { useState, useEffect, useCallback } from 'react';

import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Preloader from './Preloader/Preloader.js';
import Footer from '../Footer/Footer.js';
import Loading from '../Loading/Loading.js';

import { movieApi } from '../../utils/MoviesApi.js';
import { mainApi } from '../../utils/MainApi.js';

function Movies() {
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

  function mergeMoviesCards(jwt, resCards) {
    return mainApi.getSavedMovies(jwt)
      .then((resSavedCards) => {
        const mergedArrayCards = resCards.map(card => {
          // Объеденяет массив картачек фильмов с массивом сохраненных карточек для того что бы потом определять лайкнута карточка или нет
          const savedCards = resSavedCards.find(savedCard => savedCard.movieId === card.id);
          return savedCards ? Object.assign({}, card, { _id: savedCards._id }) : card; // Добавляет к элементу с данными фильма поле _id если id фильма и id сохраненного фильма совпадают
        });
        setCardsToShow(mergedArrayCards.slice(0, 7));
        setCards(mergedArrayCards);
        return mergedArrayCards;
      })
      .catch(() => {
        // Если сохраненных фильмов нет, то просто возвращает массив с фильмами
        setCardsToShow(resCards.slice(0, 7));
        setCards(resCards);
      })
  }

  const getCards = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    movieApi.getCards()
      .then((resCards) => {
        mergeMoviesCards(jwt, resCards);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  const filterCardsByDucation = useCallback((cards) => {
    const filterCards = cards.filter((movie) =>
      movie.duration <= 40
    );
    setCardsToShow(filterCards.slice(0, 7));
    setCards(filterCards)
  }, [])

  const handleSearch = (query) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    movieApi.getCards()
      .then((resCards) => {
        mergeMoviesCards(jwt, resCards)
          .then((mergedArrayCards) => {
            if (filterByDuration) {
              const filteredMovies = mergedArrayCards.filter((movie) =>
                movie.nameRU.toLowerCase().includes(query.toLowerCase())
              );
              filterCardsByDucation(filteredMovies);
              setIsLoading(false);
            } else {
              const filteredMovies = mergedArrayCards.filter((movie) =>
                movie.nameRU.toLowerCase().includes(query.toLowerCase())
              );
              setCardsToShow(filteredMovies.slice(0, 7));
              setCards(filteredMovies)
            }
          })
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  useEffect(() => {
    getCards()
  }, [getCards]);

  useEffect(() => {
    setIsLoading(true);
    if (filterByDuration) {
      filterCardsByDucation(cards);
      setIsLoading(false);
    } else {
      getCards()
    }

  }, [filterByDuration]);

  return (
    <>
      <main className='movies'>
        <SearchForm handleSearch={handleSearch} handleCheckboxClick={handleCheckboxClick} />
        {isLoading ? <Loading /> :
          <>
            <MoviesCardList cardsToShow={cardsToShow} />
            <Preloader preloaderHandleClick={preloaderHandleClick} />
          </>
        }
      </main>
      <Footer />
    </>
  );
}

export default Movies;