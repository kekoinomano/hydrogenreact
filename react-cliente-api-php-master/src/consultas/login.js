import axios from 'axios';
import Constantes from '../Constantes';

export const Registrar = (body) => {
  try {
    axios
      .post(`${Constantes.RUTA_API}/guardar_usuario.php`, body)
      .then(function (response) {
        console.log(response);
      });
  } catch (err) {
    console.log(err);
  }
};
