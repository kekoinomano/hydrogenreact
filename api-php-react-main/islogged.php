<?php


include_once "cors.php";
include_once "funciones.php";

$token = isset($_COOKIE['user_token']) ? $_COOKIE['user_token'] : "1234";
$id = isset($_COOKIE['user_id']) ? $_COOKIE['user_id'] : "1";

return_json(array('exito' => true, 'token' => [$token, $id]));

