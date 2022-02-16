<?php


include_once "../cors.php";
include_once "../funciones.php";


$usuario = json_decode(file_get_contents("php://input"));
$exito=false;
$error="";
$user="";

if (!filter_var($usuario->email, FILTER_VALIDATE_EMAIL)) {
        return_json(array('error' => 'Invalid mail format'));
}

$db = obtenerConexion();
	
/* register user */
//sign_out();
$get_usuarios=$db->query(sprintf("SELECT * from users WHERE email = %s",secure($usuario->email))) or _error(SQL_ERROR_THROWEN);
if($get_usuarios->num_rows > 0) {
        $exito=true;
        $user = $get_usuarios->fetch_assoc();
}else{
        $exito=false;
        $error="Invalid credentials";
}
if($exito){
        if(!password_verify($usuario->password, $user['password'])){
                $exito=false;
                $error="Invalid credentials";     
        }
}
$igual=password_verify($usuario->password, $user['password']);

return_json(array('exito' => $exito, 'user' => $user, 'error'=> $error));

