import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constantes from '../Constantes';
import Login from './Login';
import { LogOut } from '../ConsultasAPI/auth';
import { UserContext } from './UserContext';
const Navbar = () => {
  const [logged, setLog] = useState(false);
  const [desplegar, setDesplegable] = useState(false);
  const { user1, setUser1 } = useContext(UserContext);

  return (
    <div className='callate'>
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
                <p>comercio</p>
              </li>

              {user1 ? (
                <li
                  className='nav__item'
                  style={{ marginLeft: 100 }}
                  onMouseOver={() => setDesplegable(true)}
                  onMouseLeave={() => setDesplegable(false)}
                >
                  <div to='#' className='divButon'>
                    {user1.username}
                    <DesplegbleUser
                      desplegar={desplegar}
                      user1={user1}
                      logout={() => LogOut(setUser1)}
                    />
                  </div>
                </li>
              ) : (
                <li className='nav__item' style={{ marginLeft: 100 }}>
                  <div
                    to='#'
                    onClick={() => setLog(!logged)}
                    className='divButon'
                  >
                    Sign up
                  </div>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <Login trigger={logged} setLog={setLog}></Login>
      </header>
    </div>
  );
};

const DesplegbleUser = ({ desplegar, user1, logout }) => {
  return desplegar ? (
    <div className='desplegable'>
      <Link style={{ color: 'white' }} to={`/Perfil/${user1}`}>
        <p>{user1.username}</p>
      </Link>
      <Link style={{ color: 'white' }} to='/Comercio'>
        <p>algo pondremos</p>
      </Link>
      <Link style={{ color: 'white' }} to='/Comercio'>
        <p>algo pondremos</p>
      </Link>
      <Link style={{ color: 'white' }} to='/Comercio'>
        <p>algo pondremos</p>
      </Link>

      <p onClick={logout}>Log out</p>
    </div>
  ) : null;
};

export default Navbar;
