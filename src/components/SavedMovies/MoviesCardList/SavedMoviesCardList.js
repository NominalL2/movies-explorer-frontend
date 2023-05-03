import './SavedMoviesCardList.css';

import SavedMoviesCard from '../MoviesCard/SavedMoviesCard.js';

import image from "../../../images/moviesCard/img/movie.png"

function SavedMoviesCardList() {
  return (
    <section className='saved-movies-card-list'>
      <SavedMoviesCard name='33 слова о дизайне' time='1ч 42м' img={image} />
      <SavedMoviesCard name='33 слова о дизайне' time='1ч 42м' img={image} />
      <SavedMoviesCard name='33 слова о дизайне' time='1ч 42м' img={image} />
      <SavedMoviesCard name='33 слова о дизайне' time='1ч 42м' img={image} />
      <SavedMoviesCard name='33 слова о дизайне' time='1ч 42м' img={image} />
      <SavedMoviesCard name='33 слова о дизайне' time='1ч 42м' img={image} />
      <SavedMoviesCard name='33 слова о дизайне' time='1ч 42м' img={image} />
    </section>
  );
}

export default SavedMoviesCardList;