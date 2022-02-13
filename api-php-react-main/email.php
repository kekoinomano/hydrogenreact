<?php

include_once "cors.php";

include_once "funciones.php";

$respuesta=new stdClass();

try {
    $respuesta->exito=_email("sergioalvarezalcedo@gmail.com", "hola", "hola", false, false);

    
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    $respuesta->exito=false;
}

echo json_encode($respuesta);