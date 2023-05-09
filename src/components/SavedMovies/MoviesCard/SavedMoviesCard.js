import './SavedMoviesCard.css';

import { mainApi } from '../../../utils/MainApi.js';
import { useState } from 'react';

function SavedMoviesCard(props) {
  const [isDelete, setIsDelete] = useState(false);

  const handleDeleteCard = () => {
    const jwt = localStorage.getItem('jwt');
    mainApi.deleteSavedMovie(jwt, props.card._id)
    .then((res) => {
      setIsDelete(true)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    isDelete ? null :
    <>
      <div className='saved-movies-card'>
        <div className='saved-movies-card__info'>
          <p onClick={props.handleCardClick} className='saved-movies-card__name'>{props.card.nameRU}</p>
          <p className='saved-movies-card__time'>{props.time}</p>
          <button onClick={handleDeleteCard} className='saved-movies-card__del' />
        </div>
        <img onClick={props.handleCardClick} className='saved-movies-card__image' src={props.card.image} alt='постер фильма' />
      </div>
    </>
  );
}

export default SavedMoviesCard;