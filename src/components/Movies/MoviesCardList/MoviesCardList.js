import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard.js';

import image from "../../../images/moviesCard/img/movie.png"

function MoviesCardList() {
  return (
    <section className='moviesCardList'>
      <MoviesCard name='33 слова о дизайне' time='1ч 42м' img={image} />
      <MoviesCard name='33 слова о дизайне' time='1ч 42м' img={image} />
      <MoviesCard name='33 слова о дизайне' time='1ч 42м' img={image} />
      <MoviesCard name='33 слова о дизайне' time='1ч 42м' img={image} />
      <MoviesCard name='33 слова о дизайне' time='1ч 42м' img={image} />
      <MoviesCard name='33 слова о дизайне' time='1ч 42м' img={image} />
      <MoviesCard name='33 слова о дизайне' time='1ч 42м' img={image} />
    </section>
  );
}

export default MoviesCardList;