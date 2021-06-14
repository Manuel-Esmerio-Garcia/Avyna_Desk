<?php

include('../ecodexphp/includes.php');
include('../Clases/Conexion.php');


if(isset($_GET['ID']))
{
  $ID = str_replace(" ","",$_GET['ID']);

  $TransaccionOriginal = 0;
  $dir = $_SERVER['DOCUMENT_ROOT']."Avyna_Desk/XMLs/Acuse_Recuperado";
  $UUID = "";
  $RFC = "";
  $fecha = date("Y-m-d"); 
  $Conexion = new Conexion();

 	$conn = $Conexion->Connect();

	$sqlQuery = "";
	$sqlQuery = 'SELECT * FROM Factura WHERE ID ='. $ID; 

	$sqlResult = mysqli_query($conn, $sqlQuery);

	//$sqlResult = mysql_query($sqlQuery);
	if(empty($sqlResult) == false)
	{
	  $rows = mysqli_num_rows($sqlResult);
	  //$rows = mysql_num_rows($sqlResult);
	}

	while($rowTemp = mysqli_fetch_array($sqlResult))
	{

		$UUID = $rowTemp['UUID'];

	}

$sqlQuery= "";
$sqlQuery2 = 'SELECT * FROM Empresa'; 

	$sqlResult2 = mysqli_query($conn, $sqlQuery2);

	//$sqlResult = mysql_query($sqlQuery);
	if(empty($sqlResult2) == false)
	{
	  $rows2 = mysqli_num_rows($sqlResult2);
	  //$rows = mysql_num_rows($sqlResult);
	}

	while($rowTemp2 = mysqli_fetch_array($sqlResult2))
	{

		$RFC = $rowTemp2['RFC'];
	}

	$sqlQuery3 = "";
	$sqlQuery3 = 'SELECT F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, F.CertificadoSAT, F.FechaSAT, F.SelloSAT, F.SelloCFD, F.RFC_PAC, F.FormaPago, F.MetodoPago, F.UsoCFDI, F.Comprobante, VM.ID AS IDVenta, CONCAT(CL.Nombre, " ", CL.Apellidos) AS Distribuidor, CL.regimenFiscal,
        CL.Empresa, CL.RFC, CL.CP, CL.Calle_numero, CL.Colonia, CL.Ciudad, CL.Municipio,CL.Municipio,CL.Estado,CL.Pais ,CA.Codigo, CA.Producto, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT,DVM.Importe ,DVM.Cantidad,DVM.Precio_unitario,DVM.idCatalogo,VM.Descuento,VM.Subtotal,VM.Impuestos,VM.Total,VM.Total_desc
			from Ventas as V join Factura as F ON V.ID = F.IDVenta join Clientes as CL ON V.idCliente = CL.ID join Ventas_menudeo as VM ON V.ID = VM.idVenta join Detalle_venta_menudeo_temp AS DVM on VM.ID = DVM.idVenta_menudeo join Catalogo AS CA on CA.ID = DVM.idCatalogo
      			where F.ID = ' . $ID; 

	$sqlResult3 = mysqli_query($conn, $sqlQuery3);

	//$sqlResult = mysql_query($sqlQuery);
	if(empty($sqlResult3) == false)
	{
	  $rows3 = mysqli_num_rows($sqlResult3);
	  //$rows = mysql_num_rows($sqlResult);
	}

	while($rowTemp3 = mysqli_fetch_array($sqlResult3))
	{

		$Cliente = $rowTemp3['Distribuidor'];
		$RFC_Cliente = $rowTemp3['RFC'];

	}


	try{

			$Seguridad = new Seguridad();																					//Se crea instancia de la clase Seguridad
            $TransaccionID = rand( 1, 10000 );																						//Se genera el ID
            $Token = $Seguridad->ObtenerToken( $RFC, $TransaccionID );																//Se genera el token de servicio

            $Cancelacion = new Cancelacion();
			$trsID = rand(1, 10000);

			 	$Acuse = $Cancelacion->RecuperarAcuses($RFC, $Token, $trsID, $UUID);

			 		$name = 'Acuse_de_Cancelacion';
    				$file = 'Acuse_de_Cancelacion.xml';  													//Nombre del XML timbrado
            		$fi   = fopen($file,'w+');																			//Se crea el archivo xml en la ruta especifica
            		fwrite($fi, $Acuse['AcuseXML']);																				//Mandamos el archivo XML proporcionado por el PAC    
            		fclose($fi);

            		header("Content-disposition: attachment; filename=".$name."_".$RFC_Cliente."_".$fecha.".xml");
					header("Content-type: text/xml");
					readfile($file);




        }catch(FallaValidacion $er){

            //Muestra todo el request del servidor
            print_r($er->__toString());
            exit();
            
            return  $er->__toString();


        }

        mysqli_close($conn);

}

  ?>