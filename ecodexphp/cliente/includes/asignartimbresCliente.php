<?php
include '../includes.php';

$rfc = $_POST['rfc'];
$timbres = $_POST['timbres'];

$log = "RFC: " . $rfc . "<br>";

/*
 * Seguridad
 */
$Seguridad = new Seguridad();
$trsID = rand(1, 10000);
$log .= "Transaction Id: " . $trsID . "<br>";
$Token = $Seguridad->ObtenerToken($rfc, $trsID);
$log .= "Token: " . $Token . "<br>";

/*
 * Servicio Cliente
 */

$Cliente = new Cliente();
$trsID = rand(1, 10000);
$Asignacion = $Cliente->AsignacionTimbres($rfc, $timbres, $Token, $trsID);
$log .= $Cliente->Log_Conexion();
?>
