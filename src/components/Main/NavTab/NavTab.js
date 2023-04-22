import './NavTab.css';

function NavTab() {
  return (
    <section className='navTab'>
      <h1 className='navTab__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <nav className='navTab__navBar'>
      <button className='navTab__navButton'>О проекте</button>
      <button className='navTab__navButton'>Технологии</button>
      <button className='navTab__navButton'>Студент</button>
      </nav>
    </section>
  );
}

export default NavTab;