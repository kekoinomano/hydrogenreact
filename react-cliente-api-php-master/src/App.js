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

            <Route path="/videojuegos/agregar">

              <AgregarVideojuego></AgregarVideojuego>
            </Route>
            <Route path="/videojuegos/editar/:id">
              <EditarVideojuego></EditarVideojuego>
            </Route>
            <Route path="/videojuegos/ver">
              <VerVideojuegos></VerVideojuegos>
            </Route>
            <Route path="/">
              <VerVideojuegos></VerVideojuegos>
            </Route>
            <Route component={hola} exact path="/pagar">
                
            </Route>
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
