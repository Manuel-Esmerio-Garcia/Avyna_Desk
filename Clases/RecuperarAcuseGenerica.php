<?php

include('../ecodexphp/includes.php');
include('../Clases/Conexion.php');


if(isset($_GET['ID']))
{
  $ID 		= str_replace(" ","",$_GET['ID']);

  $TransaccionOriginal = 0;
  $dir = $_SERVER['DOCUMENT_ROOT']."Avyna_Desk/XMLs/Acuse_Recuperado";
  $UUID = "";
  $RFC = "";
  $fecha = date("Y-m-d"); 
	
	/*$servername = "integratto.net";
	$username = "integrat";
	$password = "fritrubi";
	$databaseName = "integrat_prosalon";*/

	$Conexion = new Conexion();

 	$conn = $Conexion->Connect();

	$sqlQuery = "";
	$sqlQuery = 'SELECT * FROM factura_timbrada WHERE ID ='. $ID; 

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
	$sqlQuery3 = 'SELECT FT.*, FG.Receptor, FG.Receptor_RFC FROM factura_timbrada AS FT INNER JOIN factura_generica AS FG ON FT.ID_Factura_Generica = FG.ID WHERE FT.ID_Factura_Generica =' . $ID; 

	$sqlResult3 = mysqli_query($conn, $sqlQuery3);

	//$sqlResult = mysql_query($sqlQuery);
	if(empty($sqlResult3) == false)
	{
	  $rows3 = mysqli_num_rows($sqlResult3);
	  //$rows = mysql_num_rows($sqlResult);
	}

	while($rowTemp3 = mysqli_fetch_array($sqlResult3))
	{

		$Cliente 		= $rowTemp3['Receptor'];
		$RFC_Cliente 	= $rowTemp3['Receptor_RFC'];

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