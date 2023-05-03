import './Portfolio.css';

function Portfolio() {
  return (
    <>
      <section className='portfolio'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__links'>
        <li className='portfolio__element'>
        <a className='portfolio__link' href='https://github.com/NominalL/how-to-learn' target="_blank" rel="noreferrer">
          <p className='portfolio__text'>Статичный сайт</p>
          <div className='portfolio__icon'></div>
        </a>
        </li>
        <li className='portfolio__element'>
        <a className='portfolio__link' href='https://github.com/NominalL/russian-travel' target="_blank" rel="noreferrer">
          <p className='portfolio__text'>Адаптивный сайт</p>
          <div className='portfolio__icon'></div>
        </a>
        </li>
        <li className='portfolio__element'>
        <a className='portfolio__link portfolio__link_last' href='https://github.com/NominalL2/react-mesto-auth' target="_blank" rel="noreferrer">
          <p className='portfolio__text'>Одностраничное приложение</p>
          <div className='portfolio__icon'></div>
        </a>
        </li>
        </ul>
      </section>
    </>
  );
}

export default Portfolio;