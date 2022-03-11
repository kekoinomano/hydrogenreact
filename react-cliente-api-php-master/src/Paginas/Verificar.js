import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constantes from '../Constantes';
import { UserContext } from './UserContext';
import { resend_email } from '../ConsultasAPI/auth';
import { Diverror, Loader } from '../ConsultasAPI/login';

const Verificar = (props) => {


  //Variable error, vista y cargador
  const [error ,setError ] = useState("");
  const [loader ,setLoader ] = useState(false);
  const { user1, setUser1 } = useContext(UserContext);

  return (
    <div className='popUp'>
      <div className='login column is-one-third' id='register'>
        <h1 className='is-size-3'>Verify email</h1>
        <button className="closeForm" onClick={() => {props.setView(false);setError('')}}>X</button>
        <div>Click here to receive an email to {user1.email} for verify your email </div>
        {loader ?(
          <Loader></Loader>
        ):(
          <button className='divButon'onClick={() => {resend_email(user1.id, user1.email, setLoader, setError)}} >Send</button>
        )}
        <Diverror error={error}/>
        
      </div>


    
    </div>
    );
  
  
};


export default Verificar;
