import './SearchForm.css';


function SearchForm() {
  return (
    <section className='searchForm'>
      <form className="searchForm__search-form">
        <input className='searchForm__input' type="text" placeholder="Фильм" required></input>
        <button className='searchForm__button' type="submit"></button>
      </form>
      <div className='searchForm__switch-container'>
      <p className='searchForm__switch-name'>Короткометражки</p>
      <label className="searchForm__toggle-switch">
        <input type="checkbox" className='searchForm__checkbox'></input>
        <span className="searchForm__switch-slider"></span>
      </label>
      </div>
    </section>
  );
}
export default SearchForm;