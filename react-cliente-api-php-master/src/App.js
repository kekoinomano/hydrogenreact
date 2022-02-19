import Hola from './CheckoutForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import {browserHistory, Route, Router, Switch} from 'react-router';
//import { Fragment } from 'react';
import Home from './Paginas/Home';
import Noticias from './Paginas/Noticias';
import Login from './Paginas/Login';
import Comercio from './Paginas/Comercio';
import Perfil from './Paginas/Perfil';
import Navbar from './Paginas/Navbar';
import Reset_password from './Paginas/Reset_password';
import { UserContext } from './Paginas/UserContext';
import { useState, useEffect } from 'react';
import { isLogged } from './ConsultasAPI/auth';
import axios from 'axios';
import Constantes from './Constantes';

const App = () => {
  const [user1, setUser1] = useState(false);

  //MIRAR FUNCION USEMEMO() -- https://www.youtube.com/watch?v=lhMKvyLRWo0&t=455s

  useEffect(() => {
    isLogged(setUser1);
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ user1, setUser1 }}>
        <Router>
          <Navbar />
          <div className='espacioNav'>
            <Switch>
              {/* <Route exact path='/usuarios/agregar'>
              <Agregarusuario></Agregarusuario>
            </Route>
            <Route exact path='/videojuegos/agregar'>
              <AgregarVideojuego></AgregarVideojuego>
            </Route>
            <Route exact path='/videojuegos/editar/:id'>
              <EditarVideojuego></EditarVideojuego>
            </Route>
            <Route exact path='/videojuegos/ver'>
              <VerVideojuegos></VerVideojuegos>
            </Route> */}

              <Route exact path='/' component={Home} />
              <Route exact path='/Noticias' component={Noticias} />
              <Route exact path='/Login' component={Login} />
              <Route exact path='/Comercio' component={Comercio} />
              <Route exact path='/Perfil/:username' component={Perfil} />
              <Route path='/reset_password/:token' component={Reset_password} />
              <Route component={Hola} exact path='/pagar' />
            </Switch>
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default App;
