import './MoviesCard.css';

function MoviesCard(props) {
  return (
    <>
      <div className='moviesCard'>
        <div className='moviesCard__info'>
          <p className='moviesCard__name'>{props.name}</p>
          <p className='moviesCard__time'>{props.time}</p>
          <div className='moviesCard__like moviesCard__like_active' />
        </div>
        <img className='moviesCard__image' src={props.img} alt='постер фильма' />
      </div>
    </>
  );
}

export default MoviesCard;