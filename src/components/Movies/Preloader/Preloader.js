import './Preloader.css';

import React from 'react';


function Preloader(props) {
  return (
    <>
      <section className='preloader' >
        {props.preloaderToShow && <button onClick={props.preloaderHandleClick} className='preloader__button'>Еще</button>}
      </section >
    </>
  );
}
export default Preloader;