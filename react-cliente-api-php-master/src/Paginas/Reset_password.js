import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constantes from '../Constantes';




const Reset_password = (props) => {

  const [formData, setFormData] = useState({
    password: '',
    password2: '',
    id: ''
  });
  //alert(props.match.params.token);
  const [error ,setError ] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    check_token(props.match.params.token, formData, setFormData);
}, [])


  const Reset = async (e) => {
    let body = JSON.stringify(formData);
    alert(body);
    e.preventDefault();
    await axios
      .post(`${Constantes.RUTA_API}/reset_password.php`, body)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
          if(response.data.exito){
            setError("Exito");
            localStorage.setItem("user_id", response.data.user_id);
            eval(response.data.callback);
          }else{
            setError(response.data.error);
          }
      });
  };

  return (
      <div className='column is-one-third'>
        <h1 className='is-size-3'>Reset Password</h1>

        <form className='field' onSubmit={(e) => Reset(e)}>
          <div className='form-group'>
            <label className='label' htmlFor='password'>
              Password:
            </label>
            <input
              autoFocus
              required
              placeholder='Password'
              type='password'
              id='password'
              name='password'
              autoComplete='new-password'
              onChange={(e) => onChange(e)}
              className='input'
            />
          </div>
          <div className='form-group'>
            <label className='label' htmlFor='password2'>
              Repeat password:
            </label>
            <input
              required
              placeholder='Repeat password'
              type='password'
              id='password2'
              name='password2'
              autoComplete='new-password'
              onChange={(e) => onChange(e)}
              className='input'
            />
          </div>
          
          <Diverror error={error}/>

          <input
            type='submit'
            className='divButon'
            value='Change password'
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
const check_token = async (eltoken, formData, setFormData) => {

  await axios
    .get(`${Constantes.RUTA_API}/check_token.php?token=${eltoken}`)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        if(response.data.exito){
          console.log(response.data.user_id);
          setFormData({ ...formData, id: response.data.user_id });
        }
    });
};

export default Reset_password;
