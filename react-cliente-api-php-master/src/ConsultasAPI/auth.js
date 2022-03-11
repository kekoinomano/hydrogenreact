import axios from 'axios';
import Constantes from '../Constantes';

export const isLogged = async (setUser1) => {
  //Va a islogged.php, pasándole la id del localstorage
  //Si existe un usuario con esa id en la base de datos, lo devuelve en response.data.user
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

export const LogOut = (setUser1) => {
  //Pone la variable usuario a null(no haría falta ni si quiera)
  setUser1(null);

  //Borra la cookie y refresca la página
  localStorage.removeItem('user_id');
  window.location.href = 'http://localhost:3000';
};


export const isReady = async (stripe_id, setAccount, setFile) => {

  await axios
    .get(
      `${Constantes.RUTA_API}/isready.php?id=${stripe_id}`
    )
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if (response.data.exito) {
        if(response.data.cuenta){
          setAccount(true);
        }
        if(response.data.file){
          setFile(true);
        }
      }
    });
};

export const resend_email = async (id,email, setLoader, setError) => {
  setLoader(true);
  await axios
    .get(
      `${Constantes.RUTA_API}/resend_email.php?id=${id}&email=${email}`
    )
    .then(function (response) {
      setLoader(false);
      console.log(JSON.stringify(response.data));
      if (response.data.exito) {
        console.log("Email send");
        setError("Email send succesfully. Please check your Email");
      }
    });
};

export const bank_account = async (e, stripe_id, formData, setFormData, setError, setLoader) => {
  setLoader(true);
  setFormData({ ...formData, [e.target.name]: e.target.value });
  
  console.log(formData);
  let body = JSON.stringify(formData);
  e.preventDefault();
  
  await axios
    .post(`${Constantes.RUTA_API}/guardar_banco.php?id=${stripe_id}`, body)
    .then(function (response) {
      
      console.log(JSON.stringify(response.data));
      if(response.data.exito){
        setError("Bank account save succesfully");
        setLoader(false);
      }else{
        setLoader(false);
        setError(response.data.error);
      }
    });
  
};
