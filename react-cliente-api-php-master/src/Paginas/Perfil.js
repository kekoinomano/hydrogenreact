import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Perfil = () => {
  const { username } = useParams();
  useEffect(() => {
    console.log('hola');
  });

  return (
    <div style={{ padding: 40 }}>
      <p style={{ fontSize: 30, fontWeight: 700, color: 'black' }}>
        Perfil de {username}
      </p>
      <div className='selectores'>
        <div>Comprados</div>
        <div>Prodctos</div>
        <div>En marccha</div>
      </div>
    </div>
  );
};

export default Perfil;
