import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constantes from '../Constantes';
import Login from './Login';

const Navbar = () => {
  const [logged, setLog] = useState(false);
  
  
  useEffect(()=>{
    isLogged();
}, [])
  
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
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {logged ? <div><div className="login" onClick={() => setLog(logged)}><Login/></div><div className='popUp' onClick={() => setLog(!logged)}></div></div>: ''}
    </header>
    
  );
};
const isLogged = async () => {

  await axios
    .get(`${Constantes.RUTA_API}/islogged.php`)
    .then(function (response) {
        console.log(JSON.stringify(response.data.token));
        if(response.data.exito){
          //console.log("Hurra");
        }
    });
};


export default Navbar;
