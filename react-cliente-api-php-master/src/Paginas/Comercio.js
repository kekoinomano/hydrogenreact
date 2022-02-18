import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
const Comercio = () => {
  const { user1, setUser1 } = useContext(UserContext);
  console.log('puta');
  useEffect(() => {
    console.log('hola');
  });
  console.log(user1);
  return <div> {user1.id}</div>;
};

export default Comercio;
