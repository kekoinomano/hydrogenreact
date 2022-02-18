import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constantes from '../Constantes';
import Login from './Login';

const Navbar = () => {
  const [logged, setLog] = useState(false);
  const [iflogged, setifLog] = useState(false);
  const [desplegar, setDesplegable] = useState(false);
  const [user, setUser] = useState('');

  const xxx = () => {
    alert('user:', user);
  };
  useEffect(() => {
    isLogged(setifLog, setUser);
    console.log('ejecutado');
  }, []);

  console.log(user);
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
                <p>About</p>
              </li>

              {iflogged ? (
                <li
                  className='nav__item'
                  style={{ marginLeft: 100 }}
                  onMouseOver={() => setDesplegable(true)}
                  onMouseLeave={() => setDesplegable(false)}
                >
                  <div
                    to='#'
                    className='divButon'
                    /*  onClick={() => setDesplegable(!desplegar)} */
                  >
                    {user}
                    <DesplegbleUser
                      desplegar={desplegar}
                      user={user}
                      logout={() => LogOut()}
                    />
                    {/* onClick={() => LogOut()} */}
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

const DesplegbleUser = ({ desplegar, user, logout }) => {
  return desplegar ? (
    <div className='desplegable'>
      <Link style={{ color: 'white' }} to={`/Perfil/${user}`}>
        <p>{user}</p>
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

const isLogged = async (setifLog, setUser) => {
  await axios
    .get(
      `${Constantes.RUTA_API}/islogged.php?id=${localStorage.getItem(
        'user_id'
      )}`
    )
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if (response.data.exito) {
        setifLog(true);
        setUser(response.data.user.username);
      }
    });
};
const LogOut = () => {
  localStorage.removeItem('user_id');
  window.location.href = 'http://localhost:3000';
};

export default Navbar;
