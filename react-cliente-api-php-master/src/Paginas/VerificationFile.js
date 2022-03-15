import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constantes from '../Constantes';
import { UserContext } from './UserContext';
import { verification_file } from '../ConsultasAPI/auth';
import { Diverror, Loader, onChange } from '../ConsultasAPI/login';

const VerificationFile = (props) => {
  const [formData, setFormData] = useState({
    fileToUpload: '',
  });
  const [file, setFile] = useState(false);
  const changeHandler = (event) => {
		setFile(event.target.files[0]);
    setFormData({ ...formData, fileToUpload: event.target.files[0]});
		//alert(file);
	};

  //Variable error, vista y cargador
  const [error ,setError ] = useState("");
  const [loader ,setLoader ] = useState(false);
  const { user1, setUser1 } = useContext(UserContext);

  return (
    <div className='popUp'>
      <div className='login column is-one-third' id='register'>
        <h1 className='is-size-3'>Bank Account</h1>
        <button className="closeForm" onClick={() => {props.setView(false);setError('')}}>X</button>
        <form className='field' encType="multipart/form-data" onSubmit={(e) => verification_file(e, user1.stripe_id, formData, setFormData, setError, setLoader)}>
          <div className='form-group'>
            <label className='label' htmlFor='nombre'>
              File:
            </label>
            <input type="file" name="fileToUpload" required  onChange={(e) => changeHandler(e)} />
          </div>
          
                  
          <Diverror error={error}/>
          {loader ?(
            <Loader></Loader>
          ):(
            <input
            type='submit'
            className='divButon'
            value='Create'
            style={{ marginTop: 20}}
          />
          )}
          
        </form>
        
      </div>


    
    </div>
    );
  
  
};


export default VerificationFile;
