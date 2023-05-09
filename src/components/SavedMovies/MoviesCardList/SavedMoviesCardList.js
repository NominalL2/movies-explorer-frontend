import './SavedMoviesCardList.css';

import SavedMoviesCard from '../MoviesCard/SavedMoviesCard.js';


function SavedMoviesCardList(props) {

  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? hours + 'ч' : ''} ${mins > 0 ? mins + 'м' : ''}`;
  }

  function hadleCardClick(link) {
    window.open(link, '_blank');
  }

  return (
    <section className='saved-movies-card-list'>
      {props.cardsToShow.map((card) => {
        return <SavedMoviesCard handleCardClick={() => hadleCardClick(card.trailerLink)} card={card} time={formatTime(card.duration)} key={card.movieId} />
      })}
    </section>
  );
}

export default SavedMoviesCardList;