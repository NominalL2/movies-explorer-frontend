import './Profile.css';

import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Profile(props) {
  const profileInfo = useContext(CurrentUserContext);

  return (
    <>
      <main className='profile'>
        <h2 className='profile__title'>{`Привет, ${profileInfo.name}!`}</h2>
        <div className='profile__container'>
          <p className='profile__label'>Имя</p>
          <p className='profile__value'>{profileInfo.name}</p>
        </div>
        <div className='profile__container'>
          <p className='profile__label'>E-mail</p>
          <p className='profile__value'>{profileInfo.email}</p>
        </div>
        <button className='profile__edit'>Редактировать</button>
        <button onClick={props.handleExit} className='profile__exit'>Выйти из аккаунта</button>
      </main>
    </>
  );
}

export default Profile;