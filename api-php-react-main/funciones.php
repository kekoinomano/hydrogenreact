
<?php

function eliminarVideojuego($id)
{
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("DELETE FROM videojuegos WHERE id = ?");
    return $sentencia->execute([$id]);
}

function actualizarVideojuego($videojuego)
{
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("UPDATE videojuegos SET nombre = ?, precio = ?, calificacion = ? WHERE id = ?");
    return $sentencia->execute([$videojuego->nombre, $videojuego->precio, $videojuego->calificacion, $videojuego->id]);
}

function obtenerVideojuegoPorId($id)
{
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("SELECT id, nombre, precio, calificacion FROM videojuegos WHERE id = ?");
    $sentencia->execute([$id]);
    return $sentencia->fetchObject();
}

function obtenerVideojuegos()
{
    $bd = obtenerConexion();
    $sentencia = $bd->query("SELECT id, nombre, precio, calificacion FROM videojuegos");
    return $sentencia->fetchAll();
}

function guardarVideojuego($videojuego)
{
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("INSERT INTO videojuegos(nombre, precio, calificacion) VALUES (?, ?, ?)");
    return $sentencia->execute([$videojuego->nombre, $videojuego->precio, $videojuego->calificacion]);
}
function guardarUsuario($usuario)
{
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("INSERT INTO users(username, email, password) VALUES (?, ?, ?)");
    return $sentencia->execute([$usuario->nombre, $usuario->email, _password_hash($usuario->password)]);
}
/**
 * _password_hash
 * 
 * @param string $password
 * @return string
 */
function _password_hash($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}
/**
 * is_ajax
 * 
 * @return void
 */
function is_ajax() {
    if( !isset($_SERVER['HTTP_X_REQUESTED_WITH']) || ($_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') ) {
        redirect();
    }
}
function obtenerVariableDelEntorno($key)
{
    if (defined("_ENV_CACHE")) {
        $vars = _ENV_CACHE;
    } else {
        $file = "env.php";
        if (!file_exists($file)) {
            throw new Exception("El archivo de las variables de entorno ($file) no existe. Favor de crearlo");
        }
        $vars = parse_ini_file($file);
        define("_ENV_CACHE", $vars);
    }
    if (isset($vars[$key])) {
        return $vars[$key];
    } else {
        throw new Exception("La clave especificada (" . $key . ") no existe en el archivo de las variables de entorno");
    }
}
function obtenerConexion()
{
    $password = obtenerVariableDelEntorno("MYSQL_PASSWORD");
    $user = obtenerVariableDelEntorno("MYSQL_USER");
    $dbName = obtenerVariableDelEntorno("MYSQL_DATABASE_NAME");
    $dbHost = obtenerVariableDelEntorno("MYSQL_HOST");
    $database = new PDO('mysql:host='. $dbHost .';dbname=' . $dbName, $user, $password);
    $database->query("set names utf8;");
    $database->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    return $database;
}

function _email($email, $subject, $body, $is_html = false, $only_smtp = false) {
    /* set header */
    $destino="sergioalvarezalcedo@gmail.com";
    $header  = "MIME-Version: 1.0\r\n";
    $header .= 'From: Your name <info@address.com>' . "\r\n";
    //$headers = "From: " . strip_tags($destino) . "\r\n";
    //$headers .= "Reply-To: ". strip_tags($destino) . "\r\n";
    if($is_html) {
        $header .= "Content-Type: text/html; charset=\"utf-8\"\r\n";
    } else {
        $header .= "Content-Type: text/plain; charset=\"utf-8\"\r\n";
    }
    /* send email */
        /* SMTP */
        require_once('libs/PHPMailer/PHPMailer.php');
        require_once('libs/PHPMailer/SMTP.php');
        require_once('libs/PHPMailer/Exception.php');
        $mail = new PHPMailer\PHPMailer\PHPMailer;
        $mail->CharSet = "UTF-8";
        $mail->isSMTP();
        $mail->Host = "ssl0.ovh.net";
        $mail->SMTPAuth = true;
        $mail->Username = "equipo@wakeapp.org";
        $mail->Password = "wqA_vynf4R4#)p%";
        $mail->SMTPSecure = 'ssl';
        $mail->Port = "465";
        $setfrom = $mail->Username;
        $mail->setFrom("equipo@wakeapp.org", "Equipo");
        $mail->addAddress($email);
        $mail->Subject = $subject;
        if($is_html) {
            $mail->isHTML(true);
            $mail->AltBody = strip_tags($body);
        }
        $mail->Body = $body;
        if(!$mail->send()) {
            if($only_smtp) {
                return false;
            }
            /* send using mail() */
            if(!mail($email, $subject, $body, $header)) {
                return false;
            }
        }
    return true;
}
