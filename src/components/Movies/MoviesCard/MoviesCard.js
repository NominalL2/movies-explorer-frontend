import './MoviesCard.css';

import { useEffect, useState } from 'react';

import { mainApi } from '../../../utils/MainApi.js';

function MoviesCard(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [cardId, setCardId] = useState(props.card._id);

  const handleCardLikeClick = () => {
    const jwt = localStorage.getItem('jwt');
    if (!isLiked) {
      mainApi.saveMovie(
        jwt,
        props.card.country,
        props.card.director,
        props.card.duration,
        props.card.year,
        props.card.description,
        props.img,
        props.card.trailerLink,
        `https://api.nomoreparties.co/${props.card.image.formats.thumbnail.url}`,
        props.card.id,
        props.card.nameRU,
        props.card.nameEN,
      )
        .then((res) => {
          setCardId(res._id);
          setIsLiked(true);
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      mainApi.deleteSavedMovie(jwt, cardId)
        .then((res) => {
          setIsLiked(false);
        })
        .catch((err) => {
          console.log(err);
        })
    }

  }

  useEffect(() => {
    if (props.card._id) {
      setIsLiked(true);
    }
  }, [props.card._id])

  return (
    <>
      <div className='movies-card'>
        <div className='movies-card__info'>
          <p onClick={props.handleCardClick} className='movies-card__name'>{props.card.nameRU}</p>
          <p className='movies-card__time'>{props.time}</p>
        </div>
        <button onClick={handleCardLikeClick} className={`movies-card__like ${isLiked && 'movies-card__like_active'}`} />
        <img onClick={props.handleCardClick} className='movies-card__image' src={props.img} alt='постер фильма' />
      </div>
    </>
  );
}

export default MoviesCard;