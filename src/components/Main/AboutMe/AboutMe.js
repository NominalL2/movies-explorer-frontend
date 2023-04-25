import './AboutMe.css';

function AboutMe() {
  return (
    <>
      <section className='aboutMe'>
        <h2 className='aboutMe__title'>Студент</h2>
        <div className='aboutMe__me'>
          <div>
            <h3 className='abouthMe__name'>Никита</h3>
            <p className='aboutMe__info'>Фронтенд-разработчик, 18 лет</p>
            <p className='abouthMe__text'>Мне больше всего нравится в&nbsp;веб-разработке возможность создавать что-то полезное и&nbsp;уникальное, используя свои знания и&nbsp;навыки.
              Чтобы изучить новую сферу, я&nbsp;читаю блоги о&nbsp;веб-разработке и&nbsp;прохожу курсы на&nbsp;онлайн-платформах. Кроме того, я&nbsp;создаю свои собственные проекты, чтобы улучшать свои навыки и&nbsp;набираться опыта.</p>
            <p className='abouthMe__git'>Githab</p>
          </div>
          <div className='aboutMe__image'></div>
        </div>
      </section>
    </>
  );
}

export default AboutMe;