import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constantes from '../Constantes';
import { Log, Reg, Res, onChange, Diverror } from '../ConsultasAPI/login';

const Login = (props) => {
  //Creamos los 3 datos de los formularios
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

  //Variable error y vista
  const [error ,setError ] = useState("");
  const [ view ,setView ] = useState("login");

  //Reseteamos los formularios siempre que se cambia de vista
  const f1 = useRef();
  const f2 = useRef();
  const f3 = useRef();
  const laview = (vista, f) => {
    console.log(f.current);
    f.current.reset();
    setView(vista);
  };

  return (props.trigger) ? (
    <div className='popUp'>
      {(() => {
        if (view=='register') {
          return (
            <div className='login column is-one-third' id='register'>
        <h1 className='is-size-3'>Sign Up</h1>
        <button className="closeForm" onClick={() => props.setLog(false)}>X</button>

        <form className='field' onSubmit={(e) => Reg(e, formData, setFormData, setError)} ref={f1}>
          <div className='form-group'>
            <label className='label' htmlFor='nombre'>
              Username:
            </label>
            <input
              autoFocus
              required
              placeholder='Username'
              type='text'
              id='nombre'
              name='username'
              onChange={(e) => onChange(e, formData, setFormData)}
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
              onChange={(e) => onChange(e, formData, setFormData)}
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
              onChange={(e) => onChange(e, formData, setFormData)}
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
              onChange={(e) => onChange(e, formData, setFormData)}
              className='input'
              autoComplete='on'
            />
          </div>
          <Diverror error={error}/>

          <input
            type='submit'
            className='divButon'
            value='Create'
            style={{ marginTop: 20}}
          />
        </form>
        <div className='form-group'>Already have an account? 
          <Link to='#' style={{marginLeft: 20}} onClick={() => laview("login", f1)}>Sign In</Link>
        </div>
      </div>
          )
        } else if (view=='login') {
          return (
            <div className='login column is-one-third' id='login'>
        <h1 className='is-size-3'>Sign In</h1>
        <button className="closeForm" onClick={() => {props.setLog(false);setView("register")}}>X</button>

        <form className='field' onSubmit={(e) => Log(e, formData2, setFormData2, setError)} ref={f2}>
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
              onChange={(e) => onChange(e, formData2, setFormData2)}
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
              onChange={(e) => onChange(e, formData2, setFormData2)}
              className='input'
            />
          </div>
          
          <Diverror error={error}/>
          <input
            type='submit'
            className='divButon'
            value='Log In'
            style={{ marginTop: 20}}
          />
          
        </form>
        <div className='form-group'>Forgot your password? 
          <Link to='#' style={{marginLeft: 20}} onClick={() => laview("reset_password", f2)}>Reset password</Link>
        </div>
        <div className='form-group'>Don't have an account? 
          <Link to ='#' style={{marginLeft: 20}} onClick={() => laview("register", f2)}>Sign Up</Link>
        </div>
        
      </div>
      
      
      
          )
        } else if (view=='reset_password') {
          return (
      <div className='login column is-one-third'>
        <h1 className='is-size-3'>Insert Email</h1>
        <button className="closeForm" onClick={() => {props.setLog(false);laview("register", f3)}}>X</button>

        <form className='field' onSubmit={(e) => Res(e, formData3, setFormData3, setError)} ref={f3}>
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
              onChange={(e) => onChange(e, formData3, setFormData3)}
              className='input'
            />
          </div>
          
          <Diverror error={error}/>

          <input
            type='submit'
            className='divButon'
            value='Reset password'
            style={{ marginTop: 20}}
          />
          
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


export default Login;
