import axios from 'axios';
import Constantes from '../Constantes';

export const isLogged = async (setUser1) => {
  await axios
    .get(
      `${Constantes.RUTA_API}/islogged.php?id=${localStorage.getItem(
        'user_id'
      )}`
    )
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if (response.data.exito) {
        setUser1(response.data.user);
      }
    });
};
// AQUI TIENE QUE BORRAR LA COKIE NO KEKO?
export const LogOut = (setUser1) => {
  setUser1(null);

  localStorage.removeItem('user_id');
  window.location.href = 'http://localhost:3000';
};
/*
const Login = async (e) => {
  setFormData2({ ...formData2, [e.target.name]: e.target.value });
  let body = JSON.stringify(formData2);
  //Registrar(body);
  //alert(body);
  e.preventDefault();
  await axios
    .post(`${Constantes.RUTA_API}/login.php`, body)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if (response.data.exito) {
        setError('Exito');
        localStorage.setItem('user_id', response.data.user_id);
        eval(response.data.callback);
      } else {
        setError(response.data.error);
      }
    });
};
 */
