<?php

	/*$servername = "prosalon4810.cloudapp.net";
	$username = "prosalon";
	$password = "prosalonAdmin1";
	$databaseName = "prosalon";

	$conn = mysqli_connect($servername,$username,$password, $databaseName);

	mysqli_set_charset($conn,"utf8");

	mysqli_select_db($conn, $databaseName);
	$times = 5000;
	$counterCount = 0;
	$codeNumber = "";
	$arrayCode = [];
	$arrayFiles = [];
	$output = "";*/

	require('Conexion.php');

	$Conexion = new Conexion();

		if(isset($_POST['Fecha_Inicio'],$_POST['Fecha_Fin']))
		{

			if ($_POST['Fecha_Inicio'] == "" && $_POST['Fecha_Fin'] == "") {
				
			$Query = "Select T.*, CONCAT(U.Nombre, ' ' , U.Apellidos) AS Usuario from tickets AS T join Usuarios AS U on T.idUsuario_solicita= U.ID where T.idUsuario_solicita= " . $_POST['ID'] . " limit 15";

			}else {

				$Query = "Select T.*, CONCAT(U.Nombre, ' ' , U.Apellidos) AS Usuario from tickets AS T join Usuarios AS U on T.idUsuario_solicita = U.ID where T.idUsuario_solicita= " . $_POST['ID'] . " and T.FechaHora BETWEEN '" .date('Y-m-d', strtotime($_POST['Fecha_Inicio']))."' and '".date('Y-m-d', strtotime($_POST['Fecha_Fin']))."'";

			}

			/*$sqlResult = mysqli_query($conn, $Query);

			$result = array();
			//$sqlResult = mysql_query($sqlQuery);
			if(empty($sqlResult) == false)
			{
			  $rows = mysqli_num_rows($sqlResult);
			  //$rows = mysql_num_rows($sqlResult);
			}

			while($rowTemp = mysqli_fetch_array($sqlResult, MYSQLI_ASSOC)){

				array_push($result,$rowTemp);
			}


			$rowTemp = mysqli_fetch_array($sqlResult);*/

			$Result = $Conexion->Query($Query);


			$output = json_encode(array("Fecha"=>$Result));
			header('Content-Length: '.strlen($output));
			header('Content-type: application/json');
			ob_clean();
			flush();
			print $output; 
			
		}


	?>