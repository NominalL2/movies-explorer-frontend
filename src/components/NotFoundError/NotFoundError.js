import './NotFoundError.css';


function NotFoundError(props) {

  return (
    <main className='notFoundError'>
      <h2 className='notFoundError__title'>404</h2>
      <p className='notFoundError__text'>Страница не найдена</p>
      <button onClick={props.handleGoBack} className='notFoundError__exit'>Назад</button>
    </main>
  );
}

export default NotFoundError;