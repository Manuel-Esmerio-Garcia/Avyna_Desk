<?php

	/*$servername = "prosalon4810.cloudapp.net";
	$username = "prosalon";
	$password = "prosalonAdmin1";
	$databaseName = "prosalon";

	$conn = mysqli_connect($servername,$username,$password, $databaseName) or die('No se puede conectar: '. mysql_error());

	mysqli_set_charset($conn,"utf8");

	mysqli_select_db($conn, $databaseName) or die('No se pudo seleccionar la base de datos');*/

	require('Conexion.php');

	$Conexion = new Conexion();


		if(isset($_POST['Status']))
		{

			if ($_POST['Status'] == "") {
				
				$Query = "Select T.*, CONCAT(U.Nombre, ' ' , U.Apellidos) AS Usuario from tickets AS T join Usuarios AS U on T.idUsuario_solicita = U.ID limit 5";

			}else {

				$Query = "Select T.*, CONCAT(U.Nombre, ' ' , U.Apellidos) AS Usuario from tickets AS T join Usuarios AS U on T.idUsuario_solicita = U.ID where T.Status = '" . $_POST['Status'] ."'";

			}

			/*$sqlResult = mysqli_query($conn, $Query)  or die('Consulta fallida: ' . mysql_error());

			$result = array();*/
			//$sqlResult = mysql_query($sqlQuery);
			/*if(empty($sqlResult) == false)
			{
			  $rows = mysqli_num_rows($sqlResult);
			  //$rows = mysql_num_rows($sqlResult);
			}*/

			$Result = $Conexion->Query($Query);

			/*while($rowTemp = mysqli_fetch_array($sqlResult, MYSQLI_ASSOC)){

				array_push($result,$rowTemp);
			}*/


			$output = json_encode(array("Status"=>$Result));
			
			header('Content-Length: '.strlen($output));
			header('Content-type: application/json');
			ob_clean();
			flush();
			print $output;

			
		}

			// Cerrar la conexión
			mysql_close($conn);


	?>