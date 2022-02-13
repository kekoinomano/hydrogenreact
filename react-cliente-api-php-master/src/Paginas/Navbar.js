import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [datos, setDatos] = useState([]);

  return (
    <header className='site-header'>
      <div className='wrapper site-header__wrapper'>
        <a href='#' className='brand'>
          hydrogeno baby
        </a>
        <nav className='nav'>
          <button className='nav__toggle' aria-expanded='false' type='button'>
            menu
          </button>
          <ul className='nav__wrapper'>
            <li className='nav__item'>
              <Link to='/Noticias'>News</Link>
            </li>
            <li className='nav__item'>
              <Link to='/Comercio'>Comercio</Link>
            </li>
            <li className='nav__item'>
              <Link to='/Login'>About us</Link>
            </li>
            <li className='nav__item' style={{ marginLeft: 100 }}>
              <Link
                to='/Login'
                style={{
                  backgroundColor: 'black',
                  padding: '15px 30px 15px 30px',
                  color: 'white',
                }}
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
