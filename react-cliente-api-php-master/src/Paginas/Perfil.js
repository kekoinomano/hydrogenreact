import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isReady } from '../ConsultasAPI/auth';
import { UserContext } from './UserContext';
import Verificar from './Verificar';
import BankAccount from './BankAccount';
import VerificationFile from './VerificationFile';
import Card from './Card';

const Perfil = (props) => {
  const [ view ,setView ] = useState(false);
  const [seller, setSeller] = useState(false);
  const [haveload, setHaveLoad] = useState(false);
  const [account, setAccount] = useState(false);
  const [ready, setReady] = useState(false);
  const [card, setCard] = useState(false);
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
  if (user1.verified=="1") {
    setVerified(true);
  }
  if(user1.type=="seller"){
    setSeller(true);
    isReady(user1.stripe_id, setAccount, setFile, setReady);
    //alert(account);
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
            <VerificationFile setView={setView}></VerificationFile>
          )
        }
        else if (view=='card') {
          return (
            <Card setView={setView} id={user1.stripe_id}></Card>
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
      
      {!account ? (
        <div>
        <button  onClick={() => {setView("account")}}>Formulario de cuenta de banco</button>
      </div>
      ) : ''}
      {!file ? (
        <div>
        <button  onClick={() => {setView("file")}}>Formulario pa subir un archivo </button>
        </div>
      ) : ''}
      {ready ? (
        <div>
        <button  onClick={() => {setView("card")}}>Pay </button>
        </div>
      ) : ''}
      
    </div>
  );
};

export default Perfil;
