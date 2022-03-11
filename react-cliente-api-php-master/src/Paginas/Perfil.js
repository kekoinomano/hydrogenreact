import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isReady } from '../ConsultasAPI/auth';
import { UserContext } from './UserContext';
import Verificar from './Verificar';
import BankAccount from './BankAccount';

const Perfil = () => {
  const [ view ,setView ] = useState(false);
  const [seller, setSeller] = useState(false);
  const [haveload, setHaveLoad] = useState(false);
  const [account, setAccount] = useState(false);
  const [verified, setVerified] = useState(false);
  const [file, setFile] = useState(false);
  const { user1, setUser1 } = useContext(UserContext);
/*
  useEffect(() => {
    alert(user1.type);
    if(user1.type=="seller"){
      setSeller(true);
      isReady(user1.stripe_id, setAccount, setFile);
      alert(account);
    }
  }, []);
*/
if(user1 && !haveload){
  setHaveLoad(true);
  console.log(user1);
  if(user1.type=="seller"){
    setSeller(true);
    isReady(user1.stripe_id, setAccount, setFile);
    //alert(account);
  }
  if (user1.verified=="1") {
    setVerified(true);
  }
  
}

  return (
    <div style={{ padding: 40 }}>
      <p style={{ fontSize: 30, fontWeight: 700, color: 'black' }}>
        Perfil de {user1.username}
      </p>
      <div className='selectores'>
        <div>Comprados</div>
        <div>Prodctos</div>
        <div>En marccha</div>
      </div>
      {(() => {
        if (view=='verificar') {
          return (
            <Verificar setView={setView}></Verificar>
          )
        }else if (view=='account') {
          return (
            <BankAccount setView={setView}></BankAccount>
          )
        }
        else if (view=='file') {
          return (
            <Verificar setView={setView}></Verificar>
          )
        }
      })()}
      
      {seller ? (
        <div>Vendedor</div>
      ) : ''}

      {verified ? (
        <div>Verificado</div>
      ) : (<div>
        <button  onClick={() => {setView("verificar")}}>Verificar</button>
      </div>
      )}
      
      {account ? (
        <div>
        <button  onClick={() => {setView("account")}}>Formulario de cuenta de banco</button>
      </div>
      ) : ''}
      {file ? (
        <div>Formulario pa subir un archivo </div>
      ) : ''}
      
    </div>
  );
};

export default Perfil;
