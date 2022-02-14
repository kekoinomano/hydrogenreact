
import Hola from './CheckoutForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import { Fragment } from 'react';
import Home from './Paginas/Home';
import Noticias from './Paginas/Noticias';
import Login from './Paginas/Login';
import Comercio from './Paginas/Comercio';
import Navbar from './Paginas/Navbar';

const App = () => {
  return (
    <div>
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

            <Route component={Hola} exact path='/pagar' />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
