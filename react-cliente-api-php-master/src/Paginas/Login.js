import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constantes from '../Constantes';
import { Registrar } from '../consultas/login';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error ,setError ] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    let body = JSON.stringify(formData);
    //Registrar(body);
    e.preventDefault();
    await axios
      .post(`${Constantes.RUTA_API}/guardar_usuario.php`, body)
      .then(function (response) {
          console.log(JSON.stringify(response.data.error));
          if(response.data.exito){

          }
          setError(response.data.error);
      });
  };

  return (
    <div className='column is-one-third'>
      <h1 className='is-size-3'>Agregar usuario</h1>

      <form className='field' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <label className='label' htmlFor='nombre'>
            Nombre:
          </label>
          <input
            autoFocus
            required
            placeholder='Username'
            type='text'
            id='nombre'
            name='username'
            autoComplete='on'
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
            type='text'
            id='email'
            name='email'
            autoComplete='on'
            onChange={(e) => onChange(e)}
            className='input'
          />
        </div>
        <div className='form-group'>
          <label className='label' htmlFor='calificacion'>
            Contraseña:
          </label>
          <input
            required
            placeholder='Password'
            type='password'
            id='password'
            name='password'
            autoComplete='on'
            onChange={(e) => onChange(e)}
            className='input'
          />
        </div>
        <div className='form-group'>
          <label className='label' htmlFor='calificacion'>
            Repite contraseña:
          </label>
          <input
            required
            placeholder='Repeat password'
            type='password'
            id='password2'
            name='password2'
            autoComplete='on'
            onChange={(e) => onChange(e)}
            className='input'
          />
        </div>
        <Diverror error={error}/>

        <input
          type='submit'
          className='btn btn-primary'
          value='Iniciar sesión'
          style={{ marginTop: 20}}
        />
      </form>
    </div>
  );
  
  
};
const Diverror = ({error}) => {
  return (
  <div>{error}</div>
  );
};

export default Login;
