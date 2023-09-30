import './Footer.css';

function Footer() {
  return (
    <>
      <footer className='footer'>
        <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className='footer__copyrights'>
          <p className='footer__copyright'>© 2023</p>
          <div className='footer__social'>
            <p className='footer__copyright'>Яндекс.Практикум</p>
            <p className='footer__copyright'>Github</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;