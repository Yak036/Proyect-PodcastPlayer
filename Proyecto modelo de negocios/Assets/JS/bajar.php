<?php
//Debes marcar las credenciales de tu servidor
    $host='localhost';
    $bd = "allstarmusic";
    $user='postgres';
    $clave='09112003aDxDGokuwily.';
//Te conectas a ella con estas etiquetas, parecido a conectarse a una Api con unaKEY
    echo '<--------VALIDANDO CONEXION-----------><br>';
    $conexion = pg_connect("host=$host dbname=$bd user=$user password=$clave");
//Verifica si se puso conectar con el servidor
    if($conexion){
        echo 'Conexion exitosa';
    }
    else{
        echo 'No se ha conectado';
    }
       //en esta variable seleccionas q quieres tomar de la base de datos en este caso SELECCIONAS el nombre DE LA TABLA usuarios
    $query="SELECT username, gmail, password FROM users";
    //Consulta es para enviarle a la conexion tu petición
    $consulta = pg_query($conexion,$query);

    //si la consulta existe y tiene mas de una respuesta la colocas
    echo '<br>----------------------BAJAR DEL SERVIDOR----------------------<br>';
    function bajarDatos($consulta){
        if($consulta){
            if(pg_num_rows($consulta)>0){
                while($obj=pg_fetch_object($consulta)){
                
                    $servUsername = $obj->username;
                    $servGmail = $obj->gmail;
                    $servPassword = $obj->password;

                    echo "El username es: $servUsername";
                    echo '<br>  El Gmail es: '.$servGmail."<br>";
                    echo "La clave es: $servPassword<br><br>";
                }
            }
        }
    }
    bajarDatos($consulta);