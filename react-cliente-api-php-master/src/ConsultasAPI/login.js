import axios from 'axios';
import Constantes from '../Constantes';


//--------------LOGIN--------------------------------------------------

export const Log = async (e, formData, setFormData, setError, setLoader) => {
  setLoader(true);
  setFormData({ ...formData, [e.target.name]: e.target.value });
  let body = JSON.stringify(formData);
  //Registrar(body);
 //alert(body);
  e.preventDefault();
  await axios
    .post(`${Constantes.RUTA_API}/login.php`, body)
    .then(function (response) {
        
        console.log(JSON.stringify(response.data));
        if(response.data.exito){
          //setError("Exito");
          localStorage.setItem("user_id", response.data.user_id);
          eval(response.data.callback);
          
        }else{
          setLoader(false);
          setError(response.data.error);
        }
    });
};

//------------------REGISTER----------------------------------

export const Reg = async (e, formData, setFormData, setError, setLoader) => {
  setLoader(true);
  setFormData({ ...formData, [e.target.name]: e.target.value });
  
  console.log(formData);
  let body = JSON.stringify(formData);
  e.preventDefault();
  
  await axios
    .post(`${Constantes.RUTA_API}/guardar_usuario.php`, body)
    .then(function (response) {
      
      console.log(JSON.stringify(response.data));
      if(response.data.exito){
        //setError("Exito");
        localStorage.setItem("user_id", response.data.user_id);
        eval(response.data.callback);
      }else{
        setLoader(false);
        setError(response.data.error);
      }
    });
  
};

//-----------------------Reset Password-----------------------------

export const Res = async (e, formData, setFormData, setError, setLoader) => {
  setLoader(true);
  setFormData({ ...formData, [e.target.name]: e.target.value });
  let body = JSON.stringify(formData);
  //Registrar(body);
  //lert(body);
  e.preventDefault();
  await axios
    .post(`${Constantes.RUTA_API}/check_email.php`, body)
    .then(function (response) {
        setLoader(false);
        console.log(JSON.stringify(response.data));
        if(response.data.exito){
          setError("Email send succesfully. Please check your Email");
          console.log(response.data.contra);
        }else{
          setError(response.data.error);
        }
    });
};


//-------------------Update Forms----------------------

export const onChange = (e, formData, setFormData) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

//---------------------Error---------------------------
export const Diverror = ({error}) => {
  return (
  <div>{error}</div>
  );
};

export const Loader = () => {
  return (
    <div className="lds-dual-ring"></div>
  );
};