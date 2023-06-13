<?php

//Debes marcar las credenciales de tu servidor
$host='localhost';
$bd = "allstarmusic";
$user='postgres';
$clave='09112003aDxDGokuwily.';
//Te conectas a ella con estas etiquetas, parecido a conectarse a una Api con unaKEY
$conexion = pg_connect("host=$host dbname=$bd user=$user password=$clave");
//Verifica si se pudo conectar con el servidor
if($conexion){
    echo json_decode('Conexion exitosa');
}
else{
    echo json_decode('No se ha conectado');
}
// Aquí recibo las variables y valido que llegaron imprimiéndolos en la consola
$validUserName = $_POST['validName'];
$validPassword =$_POST['validPassword'];
$query = "SELECT username, password FROM users";
$consulta = pg_query($conexion,$query);
if($consulta){
    if(pg_num_rows($consulta)>0){
        while($obj=pg_fetch_object($consulta)){
            $servUsername = $obj->username;
            $servPassword = $obj->password;
            if($validUserName==$servUsername && $validPassword==$servPassword){
              //Hacer objeto q se envié al javascript y usarlo como si fuese una API
                class respuesta {
                    public $validacion;
                    public $userName;

                };
                echo json_encode(true);
                break;
            }
            else{
                echo json_encode(false);
                break;
            }
        }
    }
}
?>