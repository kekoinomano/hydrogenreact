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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onSubmit = async (e) => {
    let body = JSON.stringify(formData);
    alert(body);
    Registrar(body);
    /* axios
      .post(`${Constantes.RUTA_API}/guardar_usuario.php`, body)
      .then(function (response) {
        if (response.data !== 'empty') {
          alert(JSON.stringify(response));
        }
      }); */
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
            placeholder='Nombre'
            type='text'
            id='nombre'
            name='name'
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
            placeholder='Precio'
            type='text'
            id='email'
            name='email'
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
            placeholder='Calificación'
            type='password'
            id='password'
            name='password'
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
            placeholder='Calificación'
            type='password'
            id='password2'
            name='password2'
            onChange={(e) => onChange(e)}
            className='input'
          />
        </div>

        <input
          type='submit'
          className='btn btn-primary'
          value='Iniciar sesión'
          style={{ marginTop: 20, marginLeft: '32%' }}
        />
      </form>
    </div>
  );
};

export default Login;
