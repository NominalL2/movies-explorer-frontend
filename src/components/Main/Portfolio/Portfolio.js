import './Portfolio.css';

function Portfolio() {
  return (
    <>
      <section className='portfolio'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <a className='portfolio__link' href='#'>
          <p className='portfolio__text'>Статичный сайт</p>
          <div className='portfolio__icon'></div>
        </a>
        <a className='portfolio__link' href='#'>
          <p className='portfolio__text'>Адаптивный сайт</p>
          <div className='portfolio__icon'></div>
        </a>
        <a className='portfolio__link portfolio__link_last' href='#'>
          <p className='portfolio__text'>Одностраничное приложение</p>
          <div className='portfolio__icon'></div>
        </a>
      </section>
    </>
  );
}

export default Portfolio;