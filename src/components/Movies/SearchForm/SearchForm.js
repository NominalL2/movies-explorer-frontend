import './SearchForm.css';

import { useState } from 'react';

function SearchForm(props) {
  const [query, setQuery] = useState('');
  const [errorQueryMessage, setErrorQueryMessage] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
    setErrorQueryMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query !== '') {
      setErrorQueryMessage('');
      props.handleSetQuery(query);
    } else {
      setErrorQueryMessage('Нужно ввести ключевое слово');
    }
  };

  return (
    <>
      <section className='searchForm'>
        <form onSubmit={handleSubmit} className="searchForm__search-form">
          <input
            onChange={handleChange}
            className={`searchForm__input ${errorQueryMessage && 'searchForm__input_error'}`}
            type="text"
            placeholder={errorQueryMessage ? errorQueryMessage : 'Фильм'}
            defaultValue={props.defaultQueryValue}
          ></input>
          <button className='searchForm__button' type="submit"></button>
        </form>
        <div className='searchForm__switch-container'>
          <p className='searchForm__switch-name'>Короткометражки</p>
          <label className="searchForm__toggle-switch">
            <input
              onClick={props.handleCheckboxClick}
              type="checkbox"
              className='searchForm__checkbox'
              defaultChecked={props.defaultCheckedValue}
            ></input>
            <span className="searchForm__switch-slider"></span>
          </label>
        </div>
      </section>
    </>
  );
}
export default SearchForm;