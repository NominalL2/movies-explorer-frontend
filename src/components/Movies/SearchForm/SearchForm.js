import './SearchForm.css';


function SearchForm() {
  return (
    <section className='searchForm'>
      <form className="searchForm__search-form">
        <input className='searchForm__input' type="text" placeholder="Фильм"></input>
        <button className='searchForm__button' type="submit"></button>
      </form>
      <p className='searchForm__switch-name'>Короткометражки</p>
      <label className="searchForm__toggle-switch">
        <input type="checkbox" className='searchForm__checkbox'></input>
        <span className="searchForm__switch-slider"></span>
      </label>
    </section>
  );
}
export default SearchForm;