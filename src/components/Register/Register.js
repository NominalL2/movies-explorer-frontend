import './Register.css'

import { useState} from 'react';
import { useNavigate } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorNameMessage, setErrorNameMessage] = useState('');
  const [errorEmailMessage, setErrorEmailMessage] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrorNameMessage('')
  };

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
    if(name === '') {
      setErrorNameMessage('Вы пропустили это поле')
    } else {
      setErrorNameMessage('')
    }

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

  const handleClickloginButton = () => {
    navigate('/signin')
  };

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
              className={`register__input ${errorNameMessage ? 'register__input_error': ''}`}
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
              className={`register__input ${errorEmailMessage ? 'register__input_error': ''}`}
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
              className={`register__input ${errorPasswordMessage ? 'register__input_error': ''}`}
            />
            {errorPasswordMessage && <div className='register__error'>{errorPasswordMessage}</div>}
          </div>
          <button type="submit" className='register__submit'>Зарегистрироваться</button>
        </form>
        <div className='register__link-container'>
        <span className="register__already-registered">Уже зарегистрированы?</span>
        <button onClick={handleClickloginButton} class="register__login-button">Войти</button>
        </div>
      </main>
    </>
  );
}

export default Register;
