import './SavedMoviesCard.css';

function SavedMoviesCard(props) {
  return (
    <>
      <div className='saved-movies-card'>
        <div className='saved-movies-card__info'>
          <p className='saved-movies-card__name'>{props.name}</p>
          <p className='saved-movies-card__time'>{props.time}</p>
          <button className='saved-movies-card__del' />
        </div>
        <img className='saved-movies-card__image' src={props.img} alt='постер фильма' />
      </div>
    </>
  );
}

export default SavedMoviesCard;