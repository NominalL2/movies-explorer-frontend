import './Register.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { mainApi } from '../../utils/MainApi.js';

function Register(props) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorNameMessage, setErrorNameMessage] = useState('');
  const [errorEmailMessage, setErrorEmailMessage] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const [errorFormMessage, setErrorFormMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mainApi.register(name, email, password)
    .then((res) => {
      mainApi.login(email, password)
      .then((res) => {
        console.log(res.token);
        props.handleTokenChange(res.token);
        navigate('/movies');
      })
    })
    .catch((err) => {
      setErrorFormMessage(err);
    })
  };

  const handleClickloginButton = () => {
    navigate('/signin')
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
    if (password === '') {
      setErrorPasswordMessage('Вы не заполнили это поле');
      setIsFormValid(false);
    } else {
      setErrorPasswordMessage('');
    }
  }, [password]);

  useEffect(() => {
    const nameRegex = /^[a-zA-Zа-яА-Я\s-]*$/;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (name !== '' && email !== '' && password !== '' && nameRegex.test(name) && emailRegex.test(email)) {
      setIsFormValid(true);
    }
  }, [name, email, password])

  useEffect(() => {
    setErrorNameMessage('');
    setErrorEmailMessage('');
    setErrorPasswordMessage('');
  }, []);

  return (
    <>
      <main className='register'>
        <div className='register__logo' />
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form onSubmit={handleSubmit} className='register__form'>
          <div>
            <label className='register__label'>Имя</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className={`register__input ${errorNameMessage ? 'register__input_error' : ''}`}
            />
            {errorNameMessage && <div className='register__error'>{errorNameMessage}</div>}
          </div>
          <div>
            <label className='register__label'>E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`register__input ${errorEmailMessage ? 'register__input_error' : ''}`}
            />
            {errorEmailMessage && <div className='register__error'>{errorEmailMessage}</div>}
          </div>
          <div>
            <label className='register__label'>Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`register__input ${errorPasswordMessage ? 'register__input_error' : ''}`}
            />
            {errorPasswordMessage && <div className='register__error'>{errorPasswordMessage}</div>}
          </div>
          {errorFormMessage && <div className='register__error-submit'>{errorFormMessage}</div>}
          <button type="submit" disabled={!isFormValid} className={`register__submit ${!isFormValid && 'register__submit_disabled'} ${errorFormMessage && 'register__submit_error'}`}>Зарегистрироваться</button>
        </form>
        <div className='register__link-container'>
          <span className="register__already-registered">Уже зарегистрированы?</span>
          <button onClick={handleClickloginButton} className="register__login-button">Войти</button>
        </div>
      </main>
    </>
  );
}

export default Register;
