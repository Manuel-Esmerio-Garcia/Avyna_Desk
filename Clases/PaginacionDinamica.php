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

	$numTickets = "";

	$PaginaActual = $_POST['Actual'];

	if (isset($_POST['ID'])) {

	$QueryTickets = "Select * from tickets where idUsuario_solicita = ".$_POST['ID'];

	}else{ $QueryTickets = "Select * from tickets"; }



	//$Tickets = mysqli_query($conn, $QueryTickets);

	if(empty($Conexion->mysql_Query($QueryTickets)) == false){ $numTickets = $Conexion->Num_rows($QueryTickets);}

	$numLotes = $_POST['Lote'];

	$numPaginas = ceil($numTickets/$numLotes);

	$List = "";

	$Tabla = "";

	if (isset($_POST['ID'])) 
	{

	if ($PaginaActual > 1) 
	{
		$List = $List.'<li><a href="javascript:paginacionTickets('.($PaginaActual-1).');">Anterior</a></li>';
	}

	for ($i=1; $i <=$numPaginas ; $i++) 
	{ 
		
		if ($i == $PaginaActual) 
		{
			$List = $List.'<li class="active"><a href="javascript:paginacionTickets('.$i.');">'.$i.'</a></li>';
		}

		else
		{
			$List = $List.'<li><a href="javascript:paginacionTickets('.$i.');">'.$i.'</a></li>';
		}
	}

	if ($PaginaActual < $numPaginas) 
	{
		$List = $List.'<li><a href="javascript:paginacionTickets('.($PaginaActual+1).');">Siguiente</a></li>';
	}

	if ($PaginaActual <= 1) 
	{
		$limit = 0;
	}
	else
	{
		$limit = $numLotes*($PaginaActual-1);
	}

	}
	else
	{
		if ($PaginaActual > 1) 
	{
		$List = $List.'<li><a href="javascript:paginacionTicketsHelpDesk('.($PaginaActual-1).');">Anterior</a></li>';
	}

	for ($i=1; $i <=$numPaginas ; $i++) 
	{ 
		
		if ($i == $PaginaActual) 
		{
			$List = $List.'<li class="active"><a href="javascript:paginacionTicketsHelpDesk('.$i.');">'.$i.'</a></li>';
		}

		else
		{
			$List = $List.'<li><a href="javascript:paginacionTicketsHelpDesk('.$i.');">'.$i.'</a></li>';
		}
	}

	if ($PaginaActual < $numPaginas) 
	{
		$List = $List.'<li><a href="javascript:paginacionTicketsHelpDesk('.($PaginaActual+1).');">Siguiente</a></li>';
	}

	if ($PaginaActual <= 1) 
	{
		$limit = 0;
	}
	else
	{
		$limit = $numLotes*($PaginaActual-1);
	}

	}

	if (isset($_POST['ID'])) 
	{

		$QueryLimit =  "Select T.*, CONCAT(U.Nombre, ' ' , U.Apellidos) AS Usuario from tickets AS T join Usuarios AS U on T.idUsuario_solicita = U.ID where  T.idUsuario_solicita= " .$_POST['ID']." limit ".$limit.",".$numLotes."";

	}
	else
	{
		$QueryLimit =  "Select T.*, CONCAT(U.Nombre, ' ' , U.Apellidos) AS Usuario from tickets AS T join Usuarios AS U on T.idUsuario_solicita = U.ID limit ".$limit.",".$numLotes."";
	}

	/*$registro = mysqli_query($conn, $QueryLimit);

	$result = array();

	while($rowTemp = mysqli_fetch_array($registro, MYSQLI_ASSOC)){

		array_push($result,$rowTemp);
	}

	$rowTemp = mysqli_fetch_array($registro);*/

	$Result = $Conexion->Query($QueryLimit);

	$output = json_encode(array("pagina"=>$Result,
								"Lista" =>$List));
	header('Content-Length: '.strlen($output));
	header('Content-type: application/json');
	ob_clean();
	flush();
	print $output; 


?>