import './MoviesCard.css';


function MoviesCard(props) {
  return (
    <>
      <div className='movies-card'>
        <div className='movies-card__info'>
          <p className='movies-card__name'>{props.name}</p>
          <p className='movies-card__time'>{props.time}</p>
        </div>
        <button className='movies-card__like movies-card__like_active' />
        <img className='movies-card__image' src={props.img} alt='постер фильма' />
      </div>
    </>
  );
}

export default MoviesCard;