import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList(props) {

  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? hours + 'ч' : ''} ${mins > 0 ? mins + 'м' : ''}`;
  }

  function hadleCardClick(link) {
    window.open(link, '_blank');
  }

  return (
    <section className='moviesCardList'>
      {props.cardsToShow.map((card) => {
        return <MoviesCard handleCardClick={() => hadleCardClick(card.trailerLink)} name={card.nameRU} time={formatTime(card.duration)} img={`https://api.nomoreparties.co/${card.image.url}`} key={card.id} />
      })}
    </section>
  );
}

export default MoviesCardList;