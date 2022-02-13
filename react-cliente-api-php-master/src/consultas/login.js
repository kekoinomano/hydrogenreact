import axios from 'axios';
import Constantes from '../Constantes';

export const Registrar = (body) => {
  try {
    axios
      .post(`${Constantes.RUTA_API}/guardar_usuario.php`, body)
      .then(function (response) {
        if (response.data !== 'empty') {
          alert(JSON.stringify(response));
        }
      });
  } catch (err) {}
};
