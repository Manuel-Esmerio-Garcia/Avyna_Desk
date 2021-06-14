<?php

include('../ecodexphp/includes.php');
include('../Clases/Conexion.php');

if(isset($_GET['ID']))
{

  $ID = str_replace(" ","",$_GET['ID']);

  $TransaccionOriginal = 0;
  $RFC_Cliente         = "";
  $dir = $_SERVER['DOCUMENT_ROOT'].'/Facturacion/XMLs/XML_Timbrados/'; 
  $UUID = "";
  $RFC = "";
  $fecha = date("Y-m-d"); 
  $Total = 0;
  $XML_Datos = "";
  $Total_Venta = 0;
  $Total_Timbre_Factura = 0;
  $Descuento = 0;

  $Conexion = new Conexion();

  $conn = $Conexion->Connect();

	$sqlQuery = 'SELECT * FROM Factura WHERE IDVenta ='. $ID; 

	$sqlResult = mysqli_query($conn, $sqlQuery);

	  if(empty($sqlResult) == false)
	  {
	    $rows = mysqli_num_rows($sqlResult);
	  }

	  if ($rows == 0) 
	  {
	     print_r("El ID de la venta no esta asociado a una factura");
	     exit();
	  }

	while($rowTemp = mysqli_fetch_array($sqlResult))
	{
		$UUID 					= $rowTemp['UUID'];
		$TransaccionOriginal	= $rowTemp['IDIntegrador'];
	}


	$sqlQuery2 = 'SELECT * FROM Empresa where ID = 1'; 

	$sqlResult2 = mysqli_query($conn, $sqlQuery2);

	while($rowTemp2 = mysqli_fetch_array($sqlResult2))
	{
		$RFC = $rowTemp2['RFC'];
	}

	$sqlQuery3 = ' SELECT F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, F.CertificadoSAT, F.FechaSAT, F.SelloSAT, F.SelloCFD, F.RFC_PAC, F.FormaPago, F.MetodoPago, F.UsoCFDI, F.Comprobante, CONCAT(CL.Nombre, " ", CL.Apellidos) AS Distribuidor, CL.regimenFiscal,
        CL.Empresa, CL.RFC, CL.CP, CL.Calle_numero, CL.Colonia, CL.Ciudad, CL.Municipio,CL.Municipio,CL.Estado,CL.Pais
			from Ventas as V join Factura as F ON V.ID = F.IDVenta join Clientes as CL ON V.idCliente = CL.ID where F.IDVenta = ' . $ID; 

	$sqlResult3 = mysqli_query($conn, $sqlQuery3);

	while($rowTemp3 = mysqli_fetch_array($sqlResult3))
	{
		$Cliente = $rowTemp3['Distribuidor'];
		$RFC_Cliente = $rowTemp3['RFC'];
	}


	$sqlQuery4 = 'SELECT * FROM Ventas WHERE ID ='. $ID; 

	$sqlResult4 = mysqli_query($conn, $sqlQuery4);

	  if(empty($sqlResult4) == false)
	  {
	    $rows4 = mysqli_num_rows($sqlResult4);
	  }

	while($rowTemp4 = mysqli_fetch_array($sqlResult4))
	{
		$Total_Venta 					= $rowTemp4['Total'];
	}

	try{

			/*$Seguridad = new Seguridad();																					//Se crea instancia de la clase Seguridad
            $TransaccionID = rand( 1, 10000 );																						//Se genera el ID
            $Token = $Seguridad->ObtenerToken( $RFC, $TransaccionID );																//Se genera el token de servicio

            $ObtenerXML = new Repositorio();

            $ResultadoWS = $ObtenerXML->ObtenerComprobante($RFC, $Token, $TransaccionID, $TransaccionOriginal, $UUID);*/

            $Seguridad = new Seguridad();
			$trsIDN = rand(1, 10000);
			//$log .= "Transaction Id: " . $trsIDN . "<br>";
			$Token = $Seguridad->ObtenerToken($RFC, $trsIDN);

			//$log .= "Token: " . $Token . "<br>";

			/*
			 * Repositorio
			 */
			$Repositorio = new Repositorio();
			$trsIDN = rand(1, 10000);
			$timbre = $Repositorio->ObtenerComprobante($RFC, $Token, $trsIDN, 0, $UUID);
			$Repositorio->Log_Conexion();

            $XML_Datos = new SimpleXMLElement($timbre);

            $Total = explode(" ",$XML_Datos['Total']);
            $Descuento = explode(" ",$XML_Datos['Descuento']);

            $Total_Timbre_Factura = abs($Total[0] - $Total_Venta);

            if ($Total_Timbre_Factura > 20)
            {
            	 echo('<div class="alert alert-danger"><strong>Error</strong> Los saldos NO conciden.' . "\n" .' Total XML:'.$Total[0] . "\n" .' Total Venta: '.$Total_Venta. "\n" .' Diferencia: '.$Total_Timbre_Factura . "\n" .' Descuento: ' . $Descuento[0] .'</div>');
        		exit; 
            }
            else
            {
            	
            	echo('<div class="alert alert-success"><strong>Correcto</strong> Los saldos coiciden.' . "\n" .' Total XML:'.$Total[0] . "\n" .' Total Venta: '.$Total_Venta. "\n" .' Diferencia: '.$Total_Timbre_Factura . "\n" .' Descuento: ' . $Descuento[0] .'</div>');
        		exit; 
            }


        }catch(FallaValidacion $er){
            
            return  $er->__toString();


        }

        mysqli_close($conn);

}

  ?>

<script language="JavaScript"> 
  function Correcto() { 
       alert("Saldos Correctos"); 
  } 

  function Incorrecto() { 
       alert("Saldos Incorrectos"); 
  } 
 </script> 