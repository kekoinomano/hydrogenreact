/*

  ____          _____               _ _           _       
 |  _ \        |  __ \             (_) |         | |      
 | |_) |_   _  | |__) |_ _ _ __ _____| |__  _   _| |_ ___ 
 |  _ <| | | | |  ___/ _` | '__|_  / | '_ \| | | | __/ _ \
 | |_) | |_| | | |  | (_| | |   / /| | |_) | |_| | ||  __/
 |____/ \__, | |_|   \__,_|_|  /___|_|_.__/ \__, |\__\___|
         __/ |                               __/ |        
        |___/                               |___/         
    
____________________________________
/ Si necesitas ayuda, contáctame en \
\ https://parzibyte.me               /
 ------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
Creado por Parzibyte (https://parzibyte.me).
------------------------------------------------------------------------------------------------
Si el código es útil para ti, puedes agradecerme siguiéndome: https://parzibyte.me/blog/sigueme/
Y compartiendo mi blog con tus amigos
También tengo canal de YouTube: https://www.youtube.com/channel/UCroP4BTWjfM0CkGB6AFUoBg?sub_confirmation=1
------------------------------------------------------------------------------------------------
*/
import React from 'react';
import Constantes from "./Constantes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
class Agregarusuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {
                "nombre": "",
                "email": "",
                "password": "",
                "password2": "",
            },
        };
        // Indicarle a las funciones a quién nos referimos con "this"
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
    }
    render() {
        return (
            <div className="column is-one-third">
                <h1 className="is-size-3">Agregar usuario</h1>
                <ToastContainer></ToastContainer>
                <form className="field" onSubmit={this.manejarEnvioDeFormulario}>
                    <div className="form-group">
                        <label className="label" htmlFor="nombre">Nombre:</label>
                        <input autoFocus required placeholder="Nombre" type="text" id="nombre" onChange={this.manejarCambio} value={this.state.usuario.nombre} className="input" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="precio">Email:</label>
                        <input required placeholder="Precio" type="text" id="email" onChange={this.manejarCambio} value={this.state.usuario.email} className="input" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="calificacion">Contraseña:</label>
                        <input required placeholder="Calificación" type="password" id="password" onChange={this.manejarCambio} value={this.state.usuario.password} className="input" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="calificacion">Repite contraseña:</label>
                        <input required placeholder="Calificación" type="password" id="password2" onChange={this.manejarCambio} value={this.state.usuario.password2} className="input" />
                    </div>
                    <div className="form-group">
                        <button className="button is-success mt-2">Guardar</button>
                        &nbsp;
                        <Link to="/videojuegos/ver" className="button is-primary mt-2">Volver</Link>
                    </div>
                </form>
            </div>
        );
    }
    async manejarEnvioDeFormulario(evento) {

        evento.preventDefault();
        // Codificar nuestro usuario como JSON

        const cargaUtil = JSON.stringify(this.state.usuario);
        // ¡Y enviarlo!
        console.log(cargaUtil);
        const respuesta = await fetch(`${Constantes.RUTA_API}/guardar_usuario.php`, {
            method: "POST",
            body: cargaUtil,
        });
        const exitoso = await respuesta.json();
        if (exitoso) {
            console.log(exitoso);
            toast('usuario guardado 🎮', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState({
                usuario: {
                    nombre: "",
                    email: "",
                    password: "",
                    password2: "",
                }
            });
        } else {
            toast.error("Error guardando. Intenta de nuevo");
        }
    }
    manejarCambio(evento) {
        // Extraer la clave del estado que se va a actualizar, así como el valor
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const usuarioActualizado = state.usuario;

            // Actualizamos el valor del usuario, solo en el campo que se haya cambiado
            usuarioActualizado[clave] = valor;
            return {
                usuario: usuarioActualizado,
            }
        });
    }
}

export default Agregarusuario;