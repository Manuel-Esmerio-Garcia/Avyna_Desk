<?php
include '../includes.php';

$rfc = $_POST['rfc'];
$UUID = $_POST['UUID'];
$trsID;
$log = "RFC: " . $rfc . "<br>";
$log .= "UUID: " . $UUID . "<br>";

/*
 * Seguridad
 */
$Seguridad = new Seguridad();
$trsID = rand(1, 10000);
$log .= "Transaction Id: " . $trsID . "<br>";
$Token = $Seguridad->ObtenerToken($rfc, $trsID);
$log .= "Token: " . $Token . "<br>";

$Repositorio = new Repositorio();
$trsID = rand(1, 10000);
try {
	$qr = $Repositorio->ObtenerQR($rfc, $Token, $trsID, $UUID);
} catch (Exception $ex) {
	$Repositorio->Log_Conexion();
}

$log .= "QR: " . $qr;

$Repositorio->Log_Conexion();

?>
