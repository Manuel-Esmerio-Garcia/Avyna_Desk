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

$Timbra = new Timbrado();
$trsID = rand(1, 10000);
$qr = $Timbra->ObtenerQRTimbrado($rfc, $Token, $trsID, $UUID);
$log .= "QR: " . $qr;
?>
