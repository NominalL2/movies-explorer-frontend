import './MoviesCard.css';

import { useEffect, useState } from 'react';

function MoviesCard(props) {
  const [isLiked, setIsLiked] = useState(false);

  const handleCardLikeClick = () => {
    if (!isLiked) {
          setIsLiked(true);
    } else {
          setIsLiked(false);
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