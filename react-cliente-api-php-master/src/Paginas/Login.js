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
  const elerror=useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onSubmit = async (e) => {
    let body = JSON.stringify(formData);
    alert(body);
    //Registrar(body);
    e.preventDefault();
    await axios
      .post(`${Constantes.RUTA_API}/guardar_usuario.php`, body)
      .then(function (response) {
          alert(JSON.stringify(response.data.error));
          elerror= response.data.error;
      });
  };
  const Diverror = ({elerror}) => {
    return (
    <div>{elerror}</div>
    );
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
            onChange={(e) => onChange(e)}
            className='input'
          />
        </div>
        <Diverror />

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

export default Login;
