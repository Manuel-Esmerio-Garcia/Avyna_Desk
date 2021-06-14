<?php
include '../includes.php';

$rfc = $_POST['rfc'];
$UUID = $_POST['UUID'];
if (empty($_POST['trsID'])) {
	$trsID = 0;
} else {
	$trsID = $_POST['trsID'];
}
$log = "RFC: " . $rfc . "<br>";
$log .= "UUID: " . $UUID . "<br>";

/*
 * Seguridad
 */
$Seguridad = new Seguridad();
$trsIDN = rand(1, 10000);
$log .= "Transaction Id: " . $trsIDN . "<br>";
$Token = $Seguridad->ObtenerToken($rfc, $trsIDN);
$log .= "Token: " . $Token . "<br>";

/*
 * Servicio Repositorio
 */

$Repositorio = new Repositorio();
$trsIDN = rand(1, 10000);
$Estado = $Repositorio->EstatusComprobante($rfc, $Token, $trsIDN, $trsID, $UUID);
$log .= $Repositorio->Log_Conexion();
if (is_array($Estado)) {
	$log .= "Code: " . $Estado['Codigo'] . "<br>";
	$log .= "Description: " . $Estado['Descripcion'] . "<br>";
}
?>
