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
	$arrayFiles = [];*/

	require('Conexion.php');

	$Conexion = new Conexion();

	$output = "";

	$Estatico = 0;

	if(isset($_POST['IDUsuario'],$_POST['pagina']))
	{
			
		$Query = "Select T.*, CONCAT(U.Nombre, ' ' , U.Apellidos) AS Usuario from tickets AS T join Usuarios AS U on T.idUsuario_solicita = U.ID where  U.ID= " .$_POST['IDUsuario']." limit ".$Estatico.",".$_POST['pagina']."";

	}else{

		$Query = "Select T.*, CONCAT(U.Nombre, ' ' , U.Apellidos) AS Usuario from tickets AS T join Usuarios AS U on T.idUsuario_solicita = U.ID limit ".$Estatico.",".$_POST['pagina']."";
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

	$output = json_encode(array("pagina"=>$Result));
	header('Content-Length: '.strlen($output));
	header('Content-type: application/json');
	ob_clean();
	flush();
	print $output; 

?>