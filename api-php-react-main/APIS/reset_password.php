<?php


include_once "../cors.php";
include_once "../funciones.php";

$datos = json_decode(file_get_contents("php://input"));

if($datos->password!=$datos->password2){
        return_json(array('error' => 'Passwords are not equal'));
}
$exito=false;
$db = obtenerConexion();

$db->query(sprintf("UPDATE users SET password= %s WHERE id = %s",secure(_password_hash($datos->password)), secure($datos->id))) or _error(SQL_ERROR_THROWEN);

if($db->affected_rows){
        $exito=true;
        $db->query(sprintf("DELETE from reset_password WHERE user_id = %s",secure($datos->id))) or _error(SQL_ERROR_THROWEN);
}else{
        return_json(array('error' => 'Something went wrong'));
}

return_json(array('exito' => $exito, 'e' => $db->affected_rows));

?>