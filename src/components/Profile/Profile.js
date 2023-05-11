import './Profile.css';

import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

import { mainApi } from '../../utils/MainApi.js';

function Profile(props) {
  const profileInfo = useContext(CurrentUserContext);

  const [name, setName] = useState(profileInfo.name);
  const [email, setEmail] = useState(profileInfo.email);
  const [titleGreetingName, setTitleGreetingName] = useState(profileInfo.name);
  const [errorNameMessage, setErrorNameMessage] = useState('');
  const [errorEmailMessage, setErrorEmailMessage] = useState('');
  const [errorFormMessage, setErrorFormMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [successFormMessage, setsuccessFormMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const jwt = localStorage.getItem('jwt');
    mainApi.patchUser(jwt, name, email)
      .then((res) => {
        setTitleGreetingName(name)
        setsuccessFormMessage('Данные изменены');
      })
      .catch((err) => {
        setErrorFormMessage(err);
      })
  };

  useEffect(() => {
    const nameRegex = /^[a-zA-Zа-яА-Я\s-]*$/;
    if (name === '') {
      setErrorNameMessage('Вы не заполнили это поле');
      setIsFormValid(false);
    } else if (!nameRegex.test(name)) {
      setErrorNameMessage('Введите корректное имя');
      setIsFormValid(false);
    } else {
      setErrorNameMessage('');
    }
  }, [name]);

  useEffect(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email === '') {
      setErrorEmailMessage('Вы не заполнили это поле');
      setIsFormValid(false);
    } else if (!emailRegex.test(email)) {
      setErrorEmailMessage('Введите корректный email');
      setIsFormValid(false);
    } else {
      setErrorEmailMessage('');
    }
  }, [email]);

  useEffect(() => {
    const nameRegex = /^[a-zA-Zа-яА-Я\s-]*$/;

    if (name !== '' && nameRegex.test(name) && name !== profileInfo.name) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [name])

  useEffect(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (email !== '' && emailRegex.test(email) && email !== profileInfo.email) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [email])

  useEffect(() => {
    setErrorNameMessage('');
    setErrorEmailMessage('');
    setErrorFormMessage('');
    setsuccessFormMessage('');
  }, []);

  return (
    <>
      <main className='profile'>
        <h2 className='profile__title'>{`Привет, ${titleGreetingName}!`}</h2>
        <div className='profile__container'>
          <p className='profile__label'>Имя</p>
          <input
            defaultValue={profileInfo.name}
            type='text'
            onChange={handleNameChange}
            placeholder='Введите Имя'
            className={`profile__value ${errorNameMessage ? 'profile__value_error' : ''}`} />
          {errorNameMessage && <span className='profile__error'>{errorNameMessage}</span>}
        </div>
        <div className='profile__container'>
          <p className='profile__label'>E-mail</p>
          <input
            defaultValue={profileInfo.email}
            type='Введите email'
            onChange={handleEmailChange}
            placeholder='Почта'
            className={`profile__value ${errorEmailMessage ? 'profile__value_error' : ''}`} />
          {errorEmailMessage && <span className='profile__error'>{errorEmailMessage}</span>}
        </div>
        {successFormMessage && <span className='profile__form-success'>{successFormMessage}</span>}
        {errorFormMessage && <span className='profile__form-error'>{errorFormMessage}</span>}
        <button onClick={handleSubmit} disabled={!isFormValid} className={`profile__edit ${!isFormValid && 'profile__edit_disabled'}`} >Редактировать</button>
        <button onClick={props.handleExit} className='profile__exit'>Выйти из аккаунта</button>
      </main>
    </>
  );
}

export default Profile;