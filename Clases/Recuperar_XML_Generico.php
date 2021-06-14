<?php

include('../ecodexphp/includes.php');
include('../Clases/Conexion.php');

if(isset($_GET['ID']))
{

  $ID = str_replace(" ","",$_GET['ID']);

  $TransaccionOriginal = 0;
  $dir = "C:/Avyna_Desk/XMLs/";
  $UUID = "";
  $RFC = "";
  $fecha = date("Y-m-d"); 

  $Conexion = new Conexion();

  $conn = $Conexion->Connect();
	
	/*$servername = "prosalon4810.cloudapp.net";
	$username = "prosalon";
	$password = "prosalonAdmin1";
	$databaseName = "prosalon";


	$conn = mysqli_connect($servername,$username,$password, $databaseName);

	mysqli_select_db($conn, $databaseName);*/

	$sqlQuery = 'SELECT FG.*,FG.ID AS ID_Factura, FD.Cantidad, FD.Producto, FD.Unidad, FD.Clave_Unidad, FD.Clave_SAT, FD.Valor_Unitario, FD.Impuesto AS Impuesto_Movimiento, FD.Retenciones_IVA, FD.Retenciones_ISR, FD.Descuento AS Descuento_Movimiento, FD.Importe AS Importe_Movimiento, FT.Fecha_Timbrado, FT.UUID, FT.IDIntegrador, FT.Status, FT.Certificado_SAT, FT.Fecha_SAT, FT.SelloSAT, FT.SelloCFD, FT.RFC_PAC, FT.Sello, FT.Certificado, E.Direccion, E.Colonia, E.Pais, E.Estado, E.Municipio, E.CP, E.noCertificado FROM factura_generica AS FG INNER JOIN factura_detalle AS FD ON FG.ID = FD.ID_Factura_Generica INNER JOIN factura_timbrada AS FT ON FG.ID = FT.ID_Factura_Generica INNER JOIN Empresa AS E ON FG.Emisor_RFC = E.RFC WHERE FG.ID = '. $ID; 

	$sqlResult = mysqli_query($conn, $sqlQuery);

	  if(empty($sqlResult) == false)
	  {
	    $rows = mysqli_num_rows($sqlResult);
	  }

	  if ($rows == 0) 
	  {
	     print_r("N° de factura no existe");
	     exit();
	  }

	while($rowTemp = mysqli_fetch_array($sqlResult))
	{
		$UUID 					= $rowTemp['UUID'];
		$TransaccionOriginal	= $rowTemp['IDIntegrador'];
		$RFC 		 			= $rowTemp['Emisor_RFC'];
	}

	$sqlQuery3 = 'SELECT FG.*,FG.ID AS ID_Factura, FD.Cantidad, FD.Producto, FD.Unidad, FD.Clave_Unidad, FD.Clave_SAT, FD.Valor_Unitario, FD.Impuesto AS Impuesto_Movimiento, FD.Retenciones_IVA, FD.Retenciones_ISR, FD.Descuento AS Descuento_Movimiento, FD.Importe AS Importe_Movimiento, FT.Fecha_Timbrado, FT.UUID, FT.IDIntegrador, FT.Status, FT.Certificado_SAT, FT.Fecha_SAT, FT.SelloSAT, FT.SelloCFD, FT.RFC_PAC, FT.Sello, FT.Certificado, E.Direccion, E.Colonia, E.Pais, E.Estado, E.Municipio, E.CP, E.noCertificado FROM factura_generica AS FG INNER JOIN factura_detalle AS FD ON FG.ID = FD.ID_Factura_Generica INNER JOIN factura_timbrada AS FT ON FG.ID = FT.ID_Factura_Generica INNER JOIN Empresa AS E ON FG.Emisor_RFC = E.RFC WHERE FG.ID = ' . $ID; 

	$sqlResult3 = mysqli_query($conn, $sqlQuery3);

	while($rowTemp3 = mysqli_fetch_array($sqlResult3))
	{
		$Cliente = $rowTemp3['Receptor'];
		$RFC_Cliente = $rowTemp3['Receptor_RFC'];
	}

	try{

			$Seguridad = new Seguridad();																					//Se crea instancia de la clase Seguridad
            $TransaccionID = rand( 1, 10000 );																						//Se genera el ID
            $Token = $Seguridad->ObtenerToken( $RFC, $TransaccionID );																//Se genera el token de servicio

            $ObtenerXML = new Repositorio();

            $ResultadoWS = $ObtenerXML->ObtenerComprobante($RFC, $Token, $TransaccionID, $TransaccionOriginal, $UUID);


            		 $name = 'Factura';
            		 $file = 'Factura.xml';  													//Nombre del XML timbrado
            		 $fi   = fopen($file,'w+');																			//Se crea el archivo xml en la ruta especifica
            		 fwrite($fi, $ResultadoWS);																				//Mandamos el archivo XML proporcionado por el P|AC    
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