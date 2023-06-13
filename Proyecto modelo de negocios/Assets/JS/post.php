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
    echo 'Conexion exitosa';
}
else{
    echo '<script>No se ha conectado<script>';
}
//'------------SACAR DATOS DEL JAVASCRIPT--------------';
//declaras las variables y las sacas del html poniendo el "name" de esa etiqueta
//los valores q se les transfieran a esas variables tendrán los mismos aquí
$nombreApellido = $_POST['nombreApellido'];
$nombreUsuario = $_POST['nombreUsuario'];
$gmail = $_POST['gmail'];
$passwordd = $_POST['password'];
//esto INSERTA EN LA TABLA users los datos mencionados entre paréntesis y sus VALORES son los q están en el otro paréntesis
$sql="INSERT INTO users (nombre,username,gmail,password) values('$nombreApellido','$nombreUsuario','$gmail','$passwordd')";
pg_query($conexion,$sql);
// Verificación del resultado
echo json_encode("El nombre es: $nombreApellido
El usuario es: $nombreUsuario
El Gmail es: $gmail
La clave es: $passwordd");
?>