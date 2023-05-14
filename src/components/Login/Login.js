import './Login.css'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { mainApi } from '../../utils/MainApi.js';

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmailMessage, setErrorEmailMessage] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const [errorFormMessage, setErrorFormMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mainApi.login(email, password)
      .then((res) => {
        props.handleTokenChange(res.token);
        navigate('/movies');
      })
      .catch((err) => {
        setErrorFormMessage(err);
      })
  };

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
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (email !== '' && password !== '' && emailRegex.test(email)) {
      setIsFormValid(true);
    }
  }, [email, password])

  useEffect(() => {
    setErrorEmailMessage('');
    setErrorPasswordMessage('');
  }, []);

  const handleClickRegisterButton = () => {
    navigate('/signup')
  };

  return (
    <>
      <main className='login'>
        <div className='login__logo' onClick={props.handleGoMain} />
        <h2 className='login__title'>Рады видеть!</h2>
        <form onSubmit={handleSubmit} className='login__form'>
          <div>
            <label className='login__label'>E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`login__input ${errorEmailMessage ? 'login__input_error' : ''}`}
            />
            {errorEmailMessage && <div className='login__error'>{errorEmailMessage}</div>}
          </div>
          <div>
            <label className='login__label'>Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`login__input ${errorPasswordMessage ? 'login__input_error' : ''}`}
            />
            {errorPasswordMessage && <div className='login__error'>{errorPasswordMessage}</div>}
          </div>
          {errorFormMessage && <div className='login__error-submit'>{errorFormMessage}</div>}
          <button type="submit" disabled={!isFormValid} className={`login__submit ${!isFormValid && 'login__submit_disabled'} ${errorFormMessage && 'login__submit_error'}`}>Войти</button>
        </form>
        <div className='login__link-container'>
          <span className="login__already-logined">Ещё не зарегистрированы?</span>
          <button onClick={handleClickRegisterButton} className="login__register-button">Регистрация</button>
        </div>
      </main>
    </>
  );
}

export default Login;
