import Nav from "./Nav";
import AgregarVideojuego from "./AgregarVideojuego";
import VerVideojuegos from "./VerVideojuegos";
import EditarVideojuego from "./EditarVideojuego";
import CheckoutForm from "./CheckoutForm";

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
            <Route component={hola} exact path="/pagar" />
          </Switch>
          <Link to="/pagar">Pagar</Link>
          

        </div>
      </div>
    </div>
  );
}
const hola=()=>{
  return(
    
    <div>hola{console.log("hola")}</div>
  )
}
export default App;
