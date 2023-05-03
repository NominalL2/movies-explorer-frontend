import './NavTab.css';

function NavTab() {


  return (
    <section className='navTab'>
      <h1 className='navTab__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <nav className='navTab__navBar'>
      <a className='navTab__navButton' href='#Promo'>О проекте</a>
      <a className='navTab__navButton' href='#Techs'>Технологии</a>
      <a className='navTab__navButton' href='#AbhoutMe'>Студент</a>
      </nav>
    </section>
  );
}

export default NavTab;