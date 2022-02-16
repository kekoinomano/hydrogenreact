<?php


include_once "../cors.php";
include_once "../funciones.php";

$token = isset($_GET['token']) ? $_GET['token'] : false;
$user_id="";
$exito=false;
$db = obtenerConexion();

$get_usuario=$db->query(sprintf("SELECT user_id from reset_password WHERE token = %s",secure($token))) or _error(SQL_ERROR_THROWEN);
if($get_usuario->num_rows > 0) {
        $exito=true;
        $user = $get_usuario->fetch_assoc();
}else{
        $exito=false;
        $error="Invalid token";
}


return_json(array('exito' => $exito, 'user_id' => $user['user_id']));

?>