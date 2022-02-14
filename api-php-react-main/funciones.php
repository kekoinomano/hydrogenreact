
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
    require_once('config.php');
    $password = DB_PASSWORD;
    $user = DB_USER;
    $dbName = DB_NAME;
    $dbHost = DB_HOST;
    $db = new mysqli($dbHost, $user, $password, $dbName);
    $db->set_charset('utf8');
    if(mysqli_connect_error()) {
        _error(DB_ERROR);
    }

    return $db;
}

function _email($email, $subject, $body, $is_html = false, $only_smtp = false) {
    /* set header */
    require_once('config.php');
    require_once('libs/PHPMailer/PHPMailer.php');
    require_once('libs/PHPMailer/SMTP.php');
    require_once('libs/PHPMailer/Exception.php');
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
        
        $mail = new PHPMailer\PHPMailer\PHPMailer;
        $mail->CharSet = "UTF-8";
        $mail->isSMTP();
        $mail->Host = MAIL_HOST;
        $mail->SMTPAuth = MAIL_SMTPAuth;
        $mail->Username = MAIL_DIRECTION;
        $mail->Password = MAIL_PASSWORD;
        $mail->SMTPSecure = MAIL_SMTPSecure;
        $mail->Port = MAIL_Port;
        $setfrom = $mail->Username;
        $mail->setFrom($setfrom, "Hydrogen Team");
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


/* ------------------------------- */
/* Error */
/* ------------------------------- */

/**
 * _error
 * 
 * @return void
 */
function _error() {
    $args = func_get_args();
    if(count($args) > 1) {
        $title = $args[0];
        $message = $args[1];
    } else {
        switch ($args[0]) {
            case 'DB_ERROR':
                $title = "Database Error";
                $message = "<div class='text-left'><h1>"."Error establishing a database connection"."</h1>
                            <p>"."This either means that the username and password information in your config.php file is incorrect or we can't contact the database server at localhost. This could mean your host's database server is down."."</p>
                            <ul>
                                <li>"."Are you sure you have the correct username and password?"."</li>
                                <li>"."Are you sure that you have typed the correct hostname?"."</li>
                                <li>"."Are you sure that the database server is running?"."</li>
                            </ul>
                            <p>"."If you're unsure what these terms mean you should probably contact your host. If you still need help you can always visit the"." <a href='http://support.zamblek.com'>"."Sngine Support".".</a></p>
                            </div>";
                break;

            case 'SQL_ERROR':
                $title = __("Database Error");
                $message = __("An error occurred while writing to database. Please try again later");
                if(DEBUGGING) {
                    $backtrace = debug_backtrace();
                    $line=$backtrace[0]['line'];
                    $file=$backtrace[0]['file'];
                    $message .= "<br><br><small>This error function was called from line $line in file $file</small>";
                }
                break;

            case 'SQL_ERROR_THROWEN':
                $message = __("An error occurred while writing to database. Please try again later");
                if(DEBUGGING) {
                    $backtrace = debug_backtrace();
                    $line=$backtrace[0]['line'];
                    $file=$backtrace[0]['file'];
                    $message .= "<br><br><small>This error function was called from line $line in file $file</small>";
                }
                throw new Exception($message);
                break;

            case '404':
                header('HTTP/1.0 404 Not Found');
                $title = __("404 Not Found");
                $message = __("The requested URL was not found on this server. That's all we know");
                if(DEBUGGING) {
                    $backtrace = debug_backtrace();
                    $line=$backtrace[0]['line'];
                    $file=$backtrace[0]['file'];
                    $message .= "<br><br><small>This error function was called from line $line in file $file</small>";
                }
                break;

            case '400':
                header('HTTP/1.0 400 Bad Request');
                if(DEBUGGING) {
                    $backtrace = debug_backtrace();
                    $line=$backtrace[0]['line'];
                    $file=$backtrace[0]['file'];
                    exit("This error function was called from line $line in file $file");
                }
                exit;

            case '403':
                header('HTTP/1.0 403 Access Denied');
                if(DEBUGGING) {
                    $backtrace = debug_backtrace();
                    $line=$backtrace[0]['line'];
                    $file=$backtrace[0]['file'];
                    exit("This error function was called from line $line in file $file");
                }
                exit;
            
            default:
                $title = __("Error");
                $message = __("There is some thing went wrong");
                if(DEBUGGING) {
                    $backtrace = debug_backtrace();
                    $line=$backtrace[0]['line'];
                    $file=$backtrace[0]['file'];
                    $message .= "<br><br>"."<small>This error function was called from line $line in file $file</small>";
                }
                break;
        }
    }
    echo '<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>'.$title.'</title>
                <style type="text/css">
                    html {
                        background: #f1f1f1;
                    }
                    body {
                        color: #555;
                        font-family: "Open Sans", Arial,sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                    .error-title {
                        background: #ce3426;
                        color: #fff;
                        text-align: center;
                        font-size: 34px;
                        font-weight: 100;
                        line-height: 50px;
                        padding: 60px 0;
                    }
                    .error-message {
                        margin: 1em auto;
                        padding: 1em 2em;
                        max-width: 600px;
                        font-size: 1em;
                        line-height: 1.8em;
                        text-align: center;
                    }
                    .error-message .code,
                    .error-message p {
                        margin-top: 0;
                        margin-bottom: 1.3em;
                    }
                    .error-message .code {
                        font-family: Consolas, Monaco, monospace;
                        background: rgba(0, 0, 0, 0.7);
                        padding: 10px;
                        color: rgba(255, 255, 255, 0.7);
                        word-break: break-all;
                        border-radius: 2px;
                    }
                    h1 {
                        font-size: 1.2em;
                    }
                    
                    ul li {
                        margin-bottom: 1em;
                        font-size: 0.9em;
                    }
                    a {
                        color: #ce3426;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                    .button {
                        background: #f7f7f7;
                        border: 1px solid #cccccc;
                        color: #555;
                        display: inline-block;
                        text-decoration: none;
                        margin: 0;
                        padding: 5px 10px;
                        cursor: pointer;
                        -webkit-border-radius: 3px;
                        -webkit-appearance: none;
                        border-radius: 3px;
                        white-space: nowrap;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing:    border-box;
                        box-sizing:         border-box;

                        -webkit-box-shadow: inset 0 1px 0 #fff, 0 1px 0 rgba(0,0,0,.08);
                        box-shadow: inset 0 1px 0 #fff, 0 1px 0 rgba(0,0,0,.08);
                        vertical-align: top;
                    }

                    .button.button-large {
                        height: 29px;
                        line-height: 28px;
                        padding: 0 12px;
                    }

                    .button:hover,
                    .button:focus {
                        background: #fafafa;
                        border-color: #999;
                        color: #222;
                        text-decoration: none;
                    }

                    .button:focus  {
                        -webkit-box-shadow: 1px 1px 1px rgba(0,0,0,.2);
                        box-shadow: 1px 1px 1px rgba(0,0,0,.2);
                    }

                    .button:active {
                        background: #eee;
                        border-color: #999;
                        color: #333;
                        -webkit-box-shadow: inset 0 2px 5px -3px rgba( 0, 0, 0, 0.5 );
                        box-shadow: inset 0 2px 5px -3px rgba( 0, 0, 0, 0.5 );
                    }
                    .text-left {
                        text-align: left;
                    }
                    .text-center {
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="error-title">'.$title.'</div>
                <div class="error-message">'.$message.'</div>
            </body>
            </html>';
    exit;
}

/* ------------------------------- */
/* Security */
/* ------------------------------- */

/**
 * secure
 * 
 * @param string $value
 * @param string $type
 * @param boolean $quoted
 * @return string
 */
function secure($value, $type = "", $quoted = true) {
    $db=obtenerConexion();
    if($value !== 'null') {

        /* Convert all applicable characters to HTML entities */
        $value = htmlentities($value, ENT_QUOTES, 'utf-8');
        // [2] Safe SQL
        $value = $db->real_escape_string($value);
        switch ($type) {
            case 'int':
                $value = ($quoted)? "'".intval($value)."'" : intval($value);
                break;
            case 'datetime':
                $value = ($quoted)? "'".set_datetime($value)."'" : set_datetime($value);
                break;
            case 'search':
                if($quoted) {
                    $value = (!is_empty($value))? "'%".$value."%'" : "''";
                } else {
                    $value = (!is_empty($value))? "'%%".$value."%%'" : "''";
                }
                break;
            default:
                $value = (!is_empty($value))? "'".$value."'" : "''";
                break;
        }
    }
    return $value;

    
}
/**
 * is_empty
 * 
 * @param string $value
 * @return boolean
 */
function is_empty($value) {
    if(strlen(trim(preg_replace('/\xc2\xa0/',' ',$value))) == 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * return_json
 * 
 * @param array $response
 * @return json
 */
function return_json($response = array()) {
    header('Content-Type: application/json');
    exit(json_encode($response));
}
function today(){
    // time config
    date_default_timezone_set( 'UTC' );
    $time = time();
    $minutes_to_add = 0;
    $DateTime = new DateTime();
    $DateTime->add(new DateInterval('PT' . $minutes_to_add . 'M'));
    $date = $DateTime->format('Y-m-d H:i:s');
    return $date;
}
function get_hash_token() {
    return md5(time()*rand(1, 9999));
}
/**
 * get_browser
 * 
 * @return string
 */
function get_user_browser() {
    $browser = "Unknown Browser";
    $browser_array = array(
        '/msie/i'       =>  'Internet Explorer',
        '/firefox/i'    =>  'Firefox',
        '/safari/i'     =>  'Safari',
        '/chrome/i'     =>  'Chrome',
        '/edge/i'       =>  'Edge',
        '/opera/i'      =>  'Opera',
        '/netscape/i'   =>  'Netscape',
        '/maxthon/i'    =>  'Maxthon',
        '/konqueror/i'  =>  'Konqueror',
        '/mobile/i'     =>  'Handheld Browser'
    );
    foreach($browser_array as $regex => $value) {
        if(preg_match($regex, $_SERVER['HTTP_USER_AGENT'])) {
            $browser = $value;
        }
    }
    return $browser;
}
function get_user_os() {
    $os_platform = "Unknown OS Platform";
    $os_array = array(
        '/windows nt 10/i'      =>  'Windows 10',
        '/windows nt 6.3/i'     =>  'Windows 8.1',
        '/windows nt 6.2/i'     =>  'Windows 8',
        '/windows nt 6.1/i'     =>  'Windows 7',
        '/windows nt 6.0/i'     =>  'Windows Vista',
        '/windows nt 5.2/i'     =>  'Windows Server 2003/XP x64',
        '/windows nt 5.1/i'     =>  'Windows XP',
        '/windows xp/i'         =>  'Windows XP',
        '/windows nt 5.0/i'     =>  'Windows 2000',
        '/windows me/i'         =>  'Windows ME',
        '/win98/i'              =>  'Windows 98',
        '/win95/i'              =>  'Windows 95',
        '/win16/i'              =>  'Windows 3.11',
        '/macintosh|mac os x/i' =>  'Mac OS X',
        '/mac_powerpc/i'        =>  'Mac OS 9',
        '/linux/i'              =>  'Linux',
        '/ubuntu/i'             =>  'Ubuntu',
        '/iphone/i'             =>  'iPhone',
        '/ipod/i'               =>  'iPod',
        '/ipad/i'               =>  'iPad',
        '/android/i'            =>  'Android',
        '/blackberry/i'         =>  'BlackBerry',
        '/webos/i'              =>  'Mobile'
    );
    foreach($os_array as $regex => $value) {
        if(preg_match($regex, $_SERVER['HTTP_USER_AGENT'])) {
            $os_platform = $value;
        }
    }   
    return $os_platform;
}
function get_user_ip() {
    /* handle CloudFlare IP addresses */
    return (isset($_SERVER["HTTP_CF_CONNECTING_IP"])?$_SERVER["HTTP_CF_CONNECTING_IP"]:$_SERVER['REMOTE_ADDR']);
}
/**
 * sign_out
 * 
 * @return void
 */
function sign_out() {
    $date=today();
    $db=obtenerConexion();
    /* delete the session */
    $db->query(sprintf("DELETE FROM users_sessions WHERE session_token = %s AND user_id = %s", secure($_COOKIE["user_token"]), secure($_COOKIE["user_id"], 'int') )) or _error(SQL_ERROR_THROWEN);
    /* destroy the session */
    session_destroy();
    /* unset the cookies */
    unset($_COOKIE["user_id"]);
    unset($_COOKIE["user_token"]);
    setcookie("user_id", NULL, -1, '/');
    setcookie("user_token", NULL, -1, '/');
}


function _set_cookies($user_id, $remember = false, $path = '/') {
    $date=today();
    $db=obtenerConexion();
    /* generate new token */
    $session_token = get_hash_token();
    /* set cookies */
    if($remember) {
        $expire = time()+2592000;
        setcookie("user_id", $user_id, $expire, $path);
        setcookie("user_token", $session_token, $expire, $path);
    }else {
        setcookie("user_id", $user_id, 0, $path);
        setcookie("user_token", $session_token, 0, $path);
    }
    /* insert user token */
    $db->query(sprintf("INSERT INTO users_sessions (session_token, session_date, user_id, user_browser, user_os, user_ip) VALUES (%s, %s, %s, %s, %s, %s)", secure($session_token), secure($date), secure($user_id, 'int'), secure(get_user_browser()), secure(get_user_os()), secure(get_user_ip()) )) or _error(SQL_ERROR_THROWEN);
    /* update last login time */
    //$db->query(sprintf("UPDATE users SET user_last_login = %s WHERE user_id = %s", secure($date), secure($user_id, 'int') )) or _error(SQL_ERROR);
}


?>