<?php


include_once "../cors.php";
include_once "../funciones.php";
include_once "../config.php";

$datos = json_decode(file_get_contents("php://input"));
$exito=false;
$db = obtenerConexion();

$get_usuario=$db->query(sprintf("SELECT id from users WHERE email = %s",secure($datos->email))) or _error(SQL_ERROR_THROWEN);
if($get_usuario->num_rows > 0) {
        $exito=true;
        $user = $get_usuario->fetch_assoc();
}else{
        $exito=false;
        return_json(array('error' => "Invalid email"));
}

if($exito){
        $token=get_hash_token();
        $db->query(sprintf("INSERT INTO reset_password (user_id, token) VALUES (%s, %s)", secure($user['id']),secure($token))) or _error(SQL_ERROR_THROWEN);


        try {
                $mensaje="To change password, click here: " . SYS_URL . "/reset_password/" . $token;
                _email("sergioalvarezalcedo@gmail.com", "Reset password", $mensaje, false, false);
            
                
            } catch (Exception $e) {
                return_json(array('error' => "Something went wrong"));
            }
}


return_json(array('exito' => $exito));

?>