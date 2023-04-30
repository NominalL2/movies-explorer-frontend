import './Profile.css';

import Header from '../Header/Header.js';

function Profile(props) {
  return (
    <>
    <Header logged={true} />
      <main className='profile'>
        <h2 className='profile__title'>{`Привет, ${props.name}!`}</h2>
        <div className='profile__container'>
          <p className='profile__label'>Имя</p>
          <p className='profile__value'>{props.name}</p>
        </div>
        <div className='profile__container'>
          <p className='profile__label'>E-mail</p>
          <p className='profile__value'>{props.email}</p>
        </div>
        <button className='profile__edit'>Редактировать</button>
        <button className='profile__exit'>Выйти из аккаунта</button>
      </main>
    </>
  );
}

export default Profile;