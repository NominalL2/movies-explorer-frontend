import './Preloader.css';


function Preloader(props) {
  return (
    <section className='preloader'>
      <button onClick={props.preloaderHandleClick} className='preloader__button'>Еще</button>
    </section>
  );
}
export default Preloader;