import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [logged, setLog] = useState(false);

  return (
    <header className='site-header'>
      <div className='wrapper site-header__wrapper'>
        <Link to='/' className='brand'>
          Hydrogeno baby
        </Link>
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
              <p onClick={() => setLog(!logged)}>About=???</p>
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
                {logged ? 'Log Out' : 'Log in'}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
