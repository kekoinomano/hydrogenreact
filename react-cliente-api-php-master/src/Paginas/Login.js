import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constantes from '../Constantes';
import { Registrar } from '../consultas/login';

const Login = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [formData2, setFormData2] = useState({
    email: '',
    password: ''
  });
  const [formData3, setFormData3] = useState({
    email: ''
  });
  const [error ,setError ] = useState("");

  const [ view ,setView ] = useState("register");

  const f1 = useRef();
  const f2 = useRef();
  const f3 = useRef();
  const laview = (vista, f) => {
    f.current.reset();
    setView(vista);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onChange2 = (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };
  const onChange3 = (e) => {
    setFormData3({ ...formData3, [e.target.name]: e.target.value });
  };

  const Register = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    let body = JSON.stringify(formData);
    //Registrar(body);
    e.preventDefault();
    await axios
      .post(`${Constantes.RUTA_API}/guardar_usuario.php`, body)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
          if(response.data.exito){
            setError("Exito");
            eval(response.data.callback);
          }else{
            setError(response.data.error);
          }
      });
  };
  const Login = async (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
    let body = JSON.stringify(formData2);
    //Registrar(body);
    alert(body);
    e.preventDefault();
    await axios
      .post(`${Constantes.RUTA_API}/login.php`, body)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
          if(response.data.exito){
            setError("Exito");
            eval(response.data.callback);
            
          }else{
            setError(response.data.error);
          }
      });
  };
  const Email = async (e) => {
    setFormData3({ ...formData3, [e.target.name]: e.target.value });
    let body = JSON.stringify(formData3);
    //Registrar(body);
    alert(body);
    e.preventDefault();
    await axios
      .post(`${Constantes.RUTA_API}/check_email.php`, body)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
          if(response.data.exito){
            setError("Exito");
            console.log(response.data.contra);
          }else{
            setError(response.data.error);
          }
      });
  };

  return (props.trigger) ? (
    <div className='popUp'>
      {(() => {
        if (view=='register') {
          return (
            <div className='login column is-one-third' id='register'>
        <h1 className='is-size-3'>Sign Up</h1>

        <form className='field' onSubmit={(e) => Register(e)} ref={f1}>
          <div className='form-group'>
            <label className='label' htmlFor='nombre'>
              Name:
            </label>
            <input
              autoFocus
              required
              placeholder='Username'
              type='text'
              id='nombre'
              name='username'
              onChange={(e) => onChange(e)}
              className='input'
            />
          </div>
          <div className='form-group'>
            <label className='label' htmlFor='precio'>
              Email:
            </label>
            <input
              required
              placeholder='Email'
              type='email'
              id='email'
              name='email'
              onChange={(e) => onChange(e)}
              className='input'
            />
          </div>
          <div className='form-group'>
            <label className='label' htmlFor='calificacion'>
            Password:
            </label>
            <input
              required
              placeholder='Password'
              type='password'
              id='password'
              name='password'
              onChange={(e) => onChange(e)}
              className='input'
              autoComplete='on'
            />
          </div>
          <div className='form-group'>
            <label className='label' htmlFor='calificacion'>
              Repite Password:
            </label>
            <input
              required
              placeholder='Repeat password'
              type='password'
              id='password2'
              name='password2'
              onChange={(e) => onChange(e)}
              className='input'
              autoComplete='on'
            />
          </div>
          <Diverror error={error}/>

          <input
            type='submit'
            className='btn btn-primary'
            value='Create'
            style={{ marginTop: 20}}
          />
          <button className="closeForm" onClick={() => props.setLog(false)}>Close</button>
        </form>
        <div className='form-group'>Already have an account? 
          <button style={{marginLeft: 20}} onClick={() => laview("login", f1)}>Sign In</button>
        </div>
      </div>
          )
        } else if (view=='login') {
          return (
            <div className='login column is-one-third' id='login'>
        <h1 className='is-size-3'>Sign In</h1>

        <form className='field' onSubmit={(e) => Login(e)} ref={f2}>
          <div className='form-group'>
            <label className='label' htmlFor='precio'>
              Email or username:
            </label>
            <input
              required
              placeholder='Email or Username'
              type='text'
              id='email'
              name='email'
              onChange={(e) => onChange2(e)}
              className='input'
            />
          </div>
          <div className='form-group'>
            <label className='label' htmlFor='calificacion'>
              Password:
            </label>
            <input
              required
              placeholder='Password'
              type='password'
              id='password'
              name='password'
              onChange={(e) => onChange2(e)}
              className='input'
            />
          </div>
          
          <Diverror error={error}/>
          <input
            type='submit'
            className='btn btn-primary'
            value='Log In'
            style={{ marginTop: 20}}
          />
          <button className="closeForm" onClick={() => {props.setLog(false);setView("register")}}>Close</button>
        </form>
        <div className='form-group'>Forfot your password? 
          <button style={{marginLeft: 20}} onClick={() => laview("reset_password", f2)}>Reset password</button>
        </div>
        <div className='form-group'>Don't have an account? 
          <button style={{marginLeft: 20}} onClick={() => laview("register", f2)}>Sign Up</button>
        </div>
        
      </div>
      
      
      
          )
        } else if (view=='reset_password') {
          return (
      <div className='login column is-one-third'>
        <h1 className='is-size-3'>Insert Email</h1>

        <form className='field' onSubmit={(e) => Email(e)} ref={f3}>
          <div className='form-group'>
            <label className='label' htmlFor='precio'>
              Email:
            </label>
            <input
              required
              placeholder='Email'
              type='email'
              id='email'
              name='email'
              onChange={(e) => onChange3(e)}
              className='input'
            />
          </div>
          
          <Diverror error={error}/>

          <input
            type='submit'
            className='btn btn-primary'
            value='Reset password'
            style={{ marginTop: 20}}
          />
          <button className="closeForm" onClick={() => {props.setLog(false);laview("register", f3)}}>Close</button>
        </form>
      </div>
          )
        } else {
          return (
            ''
          )
        }
      })()}
      


      
    </div>
    ): "";
  
  
};
const Diverror = ({error}) => {
  return (
  <div>{error}</div>
  );
};

export default Login;
