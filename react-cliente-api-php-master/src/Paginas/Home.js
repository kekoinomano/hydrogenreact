import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import energia from '../img/energia.gif';
const Home = () => {
  return (
    <div className='homePage'>
      <div className='portada'>
        <div className='flex-item'>
          <div className='rec'></div>
          <Link to='/'>El hydriogeno</Link>
          <br />
          <p>En tu casa y en la Mia easy</p>
        </div>
        <div className='flex-item'>
          <img src={energia} alt='loading...' width={550} />
        </div>
      </div>
      <br />
      <div className='portada'>
        <div className='flex-item'>
          <p>goooooolaxod miis muertos</p>
        </div>
        <div className='flex-item'>hola</div>
      </div>
      <br />
      <div className='portada'>
        <div className='flex-item'>
          <p>goooooolaxod miis muertos</p>
        </div>
        <div className='flex-item'>hola</div>
      </div>
    </div>
  );
};

export default Home;
