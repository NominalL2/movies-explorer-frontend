import './NotFoundError.css';


function NotFoundError(props) {

  return (
    <section className='notFoundError'>
      <h2 className='notFoundError__title'>404</h2>
      <p className='notFoundError__text'>Страница не найдена</p>
      <button onClick={props.handleGoBack} className='notFoundError__exit'>Назад</button>
    </section>
  );
}

export default NotFoundError;