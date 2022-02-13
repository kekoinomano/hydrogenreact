import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class News {
  constructor(titulo, texto, img) {
    this.titulo = titulo;
    this.texto = texto;
    this.img = img;
  }
  porDefecto = () => {
    this.titulo = 'hola';
    this.texto = 'hola';
    this.img = 'hola';
  };
}
/* 12ce29d50ad04f50a9c82d8b7421e9a0 */
var noticia = [];
for (var i = 0; i < 10; i++) {
  noticia.push(new News(`Titulo ${i}`, `tex${i}`, `tex${i}`));
}

const Noticias = () => {
  const [datos, setDatos] = useState([]);
  console.log(noticia[0].titulo);

  return (
    <div>
      {noticia[2].porDefecto()}

      {noticia.map((resp, index) => (
        <ContenedorNoticia
          key={index}
          titulo={resp.titulo}
          texto={resp.texto}
          img={index}
        />
      ))}
    </div>
  );
};

const ContenedorNoticia = ({ titulo, texto, img }) => {
  const imagen = `https://picsum.photos/id/${img + 10}/200/300`;
  return (
    <div className='cartas'>
      <img src={imagen} width={100}></img>
      <p>{titulo}</p>
      <p>{texto}</p>
    </div>
  );
};

export default Noticias;
