<?php

include('../ecodexphp/includes.php');
include('Conexion.php');

if(isset($_GET['ID'])){

	// Declaración de Objetos //
	$Conexion = new Conexion();

	// Declaración de Variables //
	$id     = $_GET['ID'];
	$conn   = $Conexion->Connect();

	// Creación de Querys //

	/**** Obtener Infomación Factura Por idVenta ****/
	$queryFactura   = "SELECT * FROM FacturaCCE WHERE ID = ".$id." AND Status = 'Timbrado'";
	$resultFactura  = $Conexion->Query($queryFactura);

	/**** Obtener Infomación Empresa ****/
	$queryEmpresa   = "SELECT * FROM Empresa WHERE ID =  1";
	$resultEmpresa  = $Conexion->Query($queryEmpresa);

	/**** Obtener Infomación Cliente ****/
	$queryCliente   = "SELECT CL.* from FacturaCCE AS FA INNER JOIN Ventas AS VE ON FA.idVenta = VE.ID INNER JOIN Clientes AS CL ON VE.idCliente = CL.ID WHERE FA.ID =  ".$id;
	$resultCliente  = $Conexion->Query($queryCliente);

	try{
		$Seguridad = new Seguridad();
		$trsIDN = rand(1, 10000);
		$Token = $Seguridad->ObtenerToken($resultEmpresa[0]['RFC'], $trsIDN);
		$Repositorio = new Repositorio();
		$trsIDN = rand(1, 10000);
		$timbre = $Repositorio->ObtenerComprobante($resultEmpresa[0]['RFC'], $Token, $trsIDN, $resultFactura[0]['IDIntegrador'], $resultFactura[0]['UUID']);
		$Repositorio->Log_Conexion();

		$file = 'Factura.xml';
		$fi   = fopen($file,'w+');
		fwrite($fi, $timbre);    
		fclose($fi);

        header("Content-disposition: attachment; filename=Factura_".$resultCliente[0]['RFC']."_".date("Y-m-d H:i:s").".xml");
        header("Content-type: text/xml");
        readfile($file);

    }catch(FallaValidacion $er){
        print_r($er->__toString());
    }
    mysqli_close($conn);
}

?>