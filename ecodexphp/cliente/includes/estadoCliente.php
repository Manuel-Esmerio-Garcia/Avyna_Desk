<?php
include '../includes.php';

$rfc = $_POST['rfc'];                        
$log = "RFC: " . $rfc . "<br>";            

/*
 * Seguridad
 */
    $Seguridad = new Seguridad();
    $trsID = rand(1, 10000);
    $log .= "Transaction Id: ".$trsID."<br>";
    $Token = $Seguridad->ObtenerToken( $rfc, $trsID );
    $log .= "Token: ".$Token."<br>";                

/*
 * Servicio Cliente
 */

    $Cliente = new Cliente();
    $trsID = rand(1, 10000);
    $Estatus = $Cliente->EstatusCuenta($rfc, $Token, $trsID);
    $log .= $Cliente->Log_Conexion();
    if( is_array( $Estatus ) )
    {
        $assignedEstatus=$Estatus["assigned"];
        $remainingEstatus=$Estatus["remaining"];
        $usedEstatus=$Estatus["used"];
        $startDateEstatus=$Estatus["startDate"];
        $endDateEstatus=$Estatus["endDate"];
        $descriptionEstatus=$Estatus["description"];                        
    }                          
?>
