<?php


include_once "../cors.php";
include_once "../funciones.php";


$usuario = json_decode(file_get_contents("php://input"));

if($usuario->password!=$usuario->password2){
        return_json(array('error' => 'Passwords are not equal'));
}
if (!filter_var($usuario->email, FILTER_VALIDATE_EMAIL)) {
        return_json(array('error' => 'Invalid mail format'));
}

$db = obtenerConexion();
	
/* register user */
//sign_out();
$get_usuarios=$db->query(sprintf("SELECT username, email from users")) or _error(SQL_ERROR_THROWEN);
if($get_usuarios->num_rows > 0) {
        while($user = $get_usuarios->fetch_assoc()) {
                if($user['username']==$usuario->username){
                        return_json(array('error' => 'Username already exists'));
                }
                if($user['email']==$usuario->email){
                        return_json(array('error' => 'Email already exists'));
                }
        }
}
/* register user */
$db->query(sprintf("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", secure($usuario->username),secure($usuario->email), secure(_password_hash($usuario->password)))) or _error(SQL_ERROR_THROWEN);
$user_id = $db->insert_id;
_set_cookies($user_id, true);

$sesion_id = isset($_COOKIE['user_id']) ? $_COOKIE['user_id'] : "";
$sesion_token = isset($_COOKIE['user_token']) ? $_COOKIE['user_token'] : "";

/*
Cuando llamo a _set_cookies me guarda $_COOKIE['user_token'] y $_COOKIE['user_id']
Al recargar la página estaría disponible, pero como esto es localhost no funciona
---------
Una vez tenemos esas cookies podemos hacer una api siempre que el usuario entre a una página, 
si hay coockies-->cogemos la info del usuario
si el usuario hace log_out-->borramos las cookies
*/ 
return_json(array('exito' => true, 'token' => [$sesion_id, $sesion_token]));

