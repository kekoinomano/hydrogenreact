<?php
/*

  ____          _____               _ _           _       
 |  _ \        |  __ \             (_) |         | |      
 | |_) |_   _  | |__) |_ _ _ __ _____| |__  _   _| |_ ___ 
 |  _ <| | | | |  ___/ _` | '__|_  / | '_ \| | | | __/ _ \
 | |_) | |_| | | |  | (_| | |   / /| | |_) | |_| | ||  __/
 |____/ \__, | |_|   \__,_|_|  /___|_|_.__/ \__, |\__\___|
         __/ |                               __/ |        
        |___/                               |___/         
    
____________________________________
/ Si necesitas ayuda, contáctame en \
\ https://parzibyte.me               /
 ------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
Creado por Parzibyte (https://parzibyte.me).
------------------------------------------------------------------------------------------------
Si el código es útil para ti, puedes agradecerme siguiéndome: https://parzibyte.me/blog/sigueme/
Y compartiendo mi blog con tus amigos
También tengo canal de YouTube: https://www.youtube.com/channel/UCroP4BTWjfM0CkGB6AFUoBg?sub_confirmation=1
------------------------------------------------------------------------------------------------
*/ ?>
<?php


include_once "cors.php";

if(isset($_POST)){
        $nombre=$_POST;
}else{
        $nombre="no";
}


$usuario = json_decode(file_get_contents("php://input"));



include_once "funciones.php";
$bd = obtenerConexion();
$sentencia = $bd->prepare("INSERT INTO users(username, email, password) VALUES (?, ?, ?)");
$resultado=$sentencia->execute([$usuario->nombre, $usuario->email, _password_hash($usuario->password)]);
$respuesta=new stdClass();
$respuesta->nombre=$nombre;
if($resultado){
        $respuesta->exito=true;
}else{
        $respuesta->exito=false;
}
/*
$resultado= new stdClass();
$resultado->error=true;
if($sentencia){
        $resultado->error=false;
}else{
        $resultado->error=true;
}
*/
//$resultado = guardarUsuario($usuario);

echo json_encode($respuesta);
