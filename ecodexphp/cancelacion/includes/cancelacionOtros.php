<?php
    include '../includes.php';
    
    $rfcEmisor = $_POST['rfcEmisor'];
    $rfcReceptor = $_POST['rfcReceptor'];
    $UUID = $_POST['UUID'];    
    $log = "RFC Emisor: ".$rfcEmisor."<br>";
    $log .= "RFC Receptor: ".$rfcReceptor."<br>";
    $log .= "UUID: ".$UUID."<br>";

/*
 * Servicio Seguridad
 */
    $Seguridad = new Seguridad();
    $trsID = rand(1, 10000);
    $log .= "Transaction Id: " . $trsID . "<br>";
    $Token = $Seguridad->ObtenerToken($rfcEmisor, $trsID);
    $log .= "Token: " . $Token . "<br>";
/*
 * Servicio Cancelacion
 */

    $Cancelacion = new Cancelacion();
    $trsID = rand(1, 10000);

    $Cancelar = $Cancelacion->CancelaOtros($rfcEmisor, $rfcReceptor, $Token, $trsID, $UUID);
    
    $log .= $Cancelacion->Log_Conexion();
?>
