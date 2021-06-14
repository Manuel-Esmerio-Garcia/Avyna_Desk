<?php 

	$servername = "prosalon4810.cloudapp.net";
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
	$output = "";

	$numSale = "";

	$PaginaActual = $_POST['Actual'];

	$QuerySale = "Select V.ID AS IDVenta, V.Fecha_venta, V.Subtotal, V.Impuestos, V.Total, V.Status AS Status_Venta, V.Extraido, CONCAT(CL.Nombre , ' ' , CL.Apellidos) AS Distribuidor, CL.* from Ventas AS V join Clientes AS CL on V.idCliente = CL.ID where V.Extraido = 1 and V.Status != 'Facturado'";

	$Sale = mysqli_query($conn, $QuerySale);

	if(empty($Sale) == false){ $numSale = mysqli_num_rows($Sale);}

	$numLotes = $_POST['Lote'];

	$numPaginas = ceil($numSale/$numLotes);

	$List = "";

	$Tabla = "";

	if ($PaginaActual > 1) 
	{
		$List = $List.'<li><a href="javascript:paginacionSale('.($PaginaActual-1).');">Anterior</a></li>';
	}

	for ($i=1; $i <=$numPaginas ; $i++) 
	{ 
		
		if ($i == $PaginaActual) 
		{
			$List = $List.'<li class="active"><a href="javascript:paginacionSale('.$i.');">'.$i.'</a></li>';
		}

		else
		{
			$List = $List.'<li><a href="javascript:paginacionSale('.$i.');">'.$i.'</a></li>';
		}
	}

	if ($PaginaActual < $numPaginas) 
	{
		$List = $List.'<li><a href="javascript:paginacionSale('.($PaginaActual+1).');">Siguiente</a></li>';
	}

	if ($PaginaActual <= 1) 
	{
		$limit = 0;
	}
	else
	{
		$limit = $numLotes*($PaginaActual-1);
	}

		$QueryLimit =  "Select V.ID AS IDVenta, V.Fecha_venta, V.Subtotal, V.Impuestos, V.Total, V.Status AS Status_Venta, V.Extraido, CONCAT(CL.Nombre , ' ' , CL.Apellidos) AS Distribuidor, CL.* from Ventas AS V join Clientes AS CL on V.idCliente = CL.ID where V.Extraido = 1 and V.Status != 'Facturado' limit ".$limit.",".$numLotes."";

	$registro = mysqli_query($conn, $QueryLimit);

	$result = array();

	while($rowTemp = mysqli_fetch_array($registro, MYSQLI_ASSOC)){

		array_push($result,$rowTemp);
	}

	$rowTemp = mysqli_fetch_array($registro);

	$output = json_encode(array("pagina"=>$result,
								"Lista" =>$List));
	header('Content-Length: '.strlen($output));
	header('Content-type: application/json');
	ob_clean();
	flush();
	print $output; 


?>