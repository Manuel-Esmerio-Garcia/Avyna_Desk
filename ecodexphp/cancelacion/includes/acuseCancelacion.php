<?php
    include '../includes.php';
    
    $rfc = $_POST['rfc'];
    $UUID = $_POST['UUID'];    
    $log = "RFC: ".$rfc."<br>";

/*
 * Servicio Seguridad
 */
    $Seguridad = new Seguridad();
    $trsID = rand(1, 10000);
    $log .= "Transaction Id: " . $trsID . "<br>";
    $Token = $Seguridad->ObtenerToken($rfc, $trsID);
    $log .= "Token: " . $Token . "<br>";
/*
 * Servicio Cancelacion
 */

    $Cancelacion = new Cancelacion();
    $trsID = rand(1, 10000);
    
    $Acuse = $Cancelacion->RecuperarAcuses($rfc, $Token, $trsID, $UUID);
    
    $log .= $Cancelacion->Log_Conexion();
?>
