<?php
    include '../includes.php';
    $rfc = $_POST['rfc'];
    $UUIDs = $_POST['UUIDs'];    
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
    $arr = explode(",",$UUIDs);
    $ListaCancelar = array();    
    $ListaCancelar["guid"] = array();
    foreach ($arr as $key => $value) {
        array_push($ListaCancelar["guid"], $value);
    }

    $Cancelar = $Cancelacion->CancelaMultiple($rfc, $Token, $trsID, $ListaCancelar);
    
    $log .= $Cancelacion->Log_Conexion();
?>
