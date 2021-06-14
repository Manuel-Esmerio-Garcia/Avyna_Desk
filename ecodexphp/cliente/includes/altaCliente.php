<?php
include '../includes.php';

extract($_POST);

$log = "RFC Integrador: ".$rfcintegrador."<br>";
$log .= "EMISOR: <br>";
$log .= "-RFC: ".$rfcemisor."<br>";
$log .= "-Razón Social: ".$razonsocial."<br>";
$log .= "-Correo Electrónico: ".$email."<br>";

/*
 * Seguridad
 */
    $Seguridad = new Seguridad();
    $trsID = rand(1, 10000);
    $log .= "Transaction Id: ".$trsID."<br>";
    try
    {
    	$Token = $Seguridad->ObtenerToken( $rfcintegrador, $trsID, TRUE );    
	} catch(Exception $ex) {
		$log .= $Seguridad->Log_Conexion();
	}
    $log .= "Token: " . $Token . "<br>";                

/*
 * Servicio Cliente
 */

    $Cliente = new Cliente();
    $trsID = rand( 1, 10000 );
    $Registro = $Cliente->Registrar( $rfcintegrador, $rfcemisor, $razonsocial, $email, $Token, $trsID );   
    $log .= $Cliente->Log_Conexion();
?>
