import Nav from "./Nav";
import AgregarVideojuego from "./AgregarVideojuego";
import VerVideojuegos from "./VerVideojuegos";
import EditarVideojuego from "./EditarVideojuego";
import Agregarusuario from "./register";
import Hola from "./CheckoutForm";


import {
  Switch,
  Route,
  Link,
} from "react-router-dom";



function App() {

  return (
    <div>
      <Nav></Nav>
      <div className="section">
        <div className="columns">
          <Switch>
          <Route exact path="/usuarios/agregar">
              <Agregarusuario></Agregarusuario>
            </Route>
            <Route exact path="/videojuegos/agregar">

              <AgregarVideojuego></AgregarVideojuego>
            </Route>
            <Route exact path="/videojuegos/editar/:id">
              <EditarVideojuego></EditarVideojuego>
            </Route>
            <Route exact path="/videojuegos/ver">
              <VerVideojuegos></VerVideojuegos>
            </Route>

            <Route exact path="/">
              <VerVideojuegos></VerVideojuegos>
            </Route>
            <Route component={Hola} exact path="/pagar" />
          </Switch>
          
        </div>
      </div>
    </div>
  );
}

export default App;
