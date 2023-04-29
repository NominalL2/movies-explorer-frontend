import './Login.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmailMessage, setErrorEmailMessage] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorEmailMessage('')
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorPasswordMessage('')
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(email === '') {
      setErrorEmailMessage('Вы пропустили это поле')
    } else {
      setErrorEmailMessage('')
    }

    if(password === '') {
      setErrorPasswordMessage('Вы пропустили это поле')
    } else {
      setErrorPasswordMessage('')
    }
  };

  const handleClickRegisterButton = () => {
    navigate('/signup')
  };

  return (
    <>
      <section className='login'>
        <div className='login__logo' />
        <h2 className='login__title'>Рады видеть!</h2>
        <form onSubmit={handleSubmit} className='login__form'>
          <div>
            <label className='login__label'>E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`login__input ${errorEmailMessage ? 'login__input_error': ''}`}
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
              className={`login__input ${errorPasswordMessage ? 'login__input_error': ''}`}
            />
            {errorPasswordMessage && <div className='login__error'>{errorPasswordMessage}</div>}
          </div>
          <button type="submit" className='login__submit'>Войти</button>
        </form>
        <div className='login__link-container'>
        <span className="login__already-logined">Ещё не зарегистрированы?</span>
        <button onClick={handleClickRegisterButton} class="login__register-button">Регистрация</button>
        </div>
      </section>
    </>
  );
}

export default Login;
