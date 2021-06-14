<?php

include('../ecodexphp/includes.php');
include('../Clases/Conexion.php');

if(isset($_GET['ID'])){

  	$ID = str_replace(" ","",$_GET['ID']);
	$TransaccionOriginal = 0;
	$RFC_Cliente         = "";
	$dir   		= "C:/Avyna_Desk/XMLs/";
	$UUID  		= "";
	$RFC   		= "";
	$trsID      = 0;
	$fecha 		= date("Y-m-d");  
  	$Conexion   = new Conexion();
  	$conn = $Conexion->Connect();

	$sqlQuery = 'SELECT * FROM Factura WHERE IDVenta ='. $ID; 
	$sqlResult = mysqli_query($conn, $sqlQuery);

	if(empty($sqlResult) == false){
	$rows = mysqli_num_rows($sqlResult);
	}

	if ($rows == 0){
	print_r("El ID de la venta no esta asociado a una factura");
	exit();
	}

	while($rowTemp = mysqli_fetch_array($sqlResult)){
		$UUID 					= $rowTemp['UUID'];
		$TransaccionOriginal	= $rowTemp['IDIntegrador'];
	}


	$sqlQuery2 = 'SELECT * FROM Empresa where ID = 1'; 
	$sqlResult2 = mysqli_query($conn, $sqlQuery2);

	while($rowTemp2 = mysqli_fetch_array($sqlResult2)){
		$RFC = $rowTemp2['RFC'];
	}

	$sqlQuery3 = ' SELECT F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, F.CertificadoSAT, F.FechaSAT, F.SelloSAT, F.SelloCFD, F.RFC_PAC, F.FormaPago, F.MetodoPago, F.UsoCFDI, F.Comprobante, CONCAT(CL.Nombre, " ", CL.Apellidos) AS Distribuidor, CL.regimenFiscal,
        CL.Empresa, CL.RFC, CL.CP, CL.Calle_numero, CL.Colonia, CL.Ciudad, CL.Municipio,CL.Municipio,CL.Estado,CL.Pais
			from Ventas as V join Factura as F ON V.ID = F.IDVenta join Clientes as CL ON V.idCliente = CL.ID where F.IDVenta = ' . $ID; 
	$sqlResult3 = mysqli_query($conn, $sqlQuery3);

	while($rowTemp3 = mysqli_fetch_array($sqlResult3)){
		$Cliente = $rowTemp3['Distribuidor'];
		$RFC_Cliente = $rowTemp3['RFC'];
	}

	try{

		$Seguridad = new Seguridad();
		$trsIDN = rand(1, 10000);
		$Token = $Seguridad->ObtenerToken($RFC, $trsIDN);
		$Repositorio = new Repositorio();
		$trsIDN = rand(1, 10000);
		$timbre = $Repositorio->ObtenerComprobante($RFC, $Token, $trsIDN, $trsID, $UUID);
		$Repositorio->Log_Conexion();

		 $name = 'Factura';
		 $file = 'Factura.xml';
		 $fi   = fopen($file,'w+');
		 fwrite($fi, $timbre);    
		 fclose($fi);

        header("Content-disposition: attachment; filename=".$name."_".$RFC_Cliente."_".$fecha.".xml");
        header("Content-type: text/xml");
        readfile($file);

    }catch(FallaValidacion $er){
        print_r($er->__toString());
    	exit();
            
         return  $er->__toString();
    }

    mysqli_close($conn);
}

?>