import './Promo.css';

function Promo() {
  return (
    <>
      <section className='promo' id='Promo'>
        <h2 className='promo__title'>О проекте</h2>
        <div className='promo__info'>
          <div className='promo__section'>
            <h3 className='promo__title-info'>Дипломный проект включал 5 этапов</h3>
            <p className='promo__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className='promo__section'>
            <h3 className='promo__title-info'>На выполнение диплома ушло 5 недель</h3>
            <p className='promo__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className='promo__line'>
          <div className='promo__backend'>1 неделя</div>
          <div className='promo__frontend'>4 недели</div>
        </div>
        <div className='promo__captions'>
          <p className='promo__caption-backend'>Back-end</p>
          <p className='promo__caption-frontend'>Front-end</p>
        </div>
      </section>
    </>
  );
}

export default Promo;