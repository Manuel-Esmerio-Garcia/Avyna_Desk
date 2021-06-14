<?php 
require('Conexion.php');
//fetch.php

/*$servername 	= "prosalon4810.cloudapp.net";
$username 		= "prosalon";
$password 		= "prosalonAdmin1";
$databaseName 	= "prosalon";*/

$Conexion = new Conexion();

$connect = $Conexion->Connect();

mysqli_set_charset($connect,"utf8");

$column = array("Ventas_menudeo.ID","CONCAT(Clientes_menudeo.Nombre, ' ' ,Clientes_menudeo.Apellidos) AS Cliente","Ventas_menudeo.Total", "Ventas_menudeo.Subtotal", "Ventas_menudeo.Impuestos", "Ventas_menudeo.Status", "Ventas_menudeo.Fecha_venta" );

$query = "
		SELECT Ventas_menudeo.*, CONCAT(Clientes_menudeo.Nombre,' ',Clientes_menudeo.Apellidos) AS Cliente FROM Ventas_menudeo 
		INNER JOIN Clientes_menudeo
		ON Ventas_menudeo.idCliente_menudeo = Clientes_menudeo.ID";

$query .= " WHERE ";

if (isset($_POST["search"]["value"])) 
{
	$query .= '(Ventas_menudeo.ID LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR Clientes_menudeo.Nombre LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR Clientes_menudeo.Apellidos LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR Ventas_menudeo.Total LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR Ventas_menudeo.Subtotal LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR Ventas_menudeo.Impuestos LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR Ventas_menudeo.Status LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR Ventas_menudeo.Fecha_venta LIKE "%'.$_POST["search"]["value"].'%") ';
}

if (isset($_POST["order"])) 
{
	$query .= 'ORDER BY '.$column[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' ';
}
else
{
	$query .= 'ORDER BY Ventas_menudeo.ID DESC ';
}

$query1 = '';

if ($_POST['length'] !=1) 
{
	$query .= 'LIMIT '.$_POST['start'].', '.$_POST['length'];
}

$Resultado = mysqli_query($connect, $query);

$number_filter_row = mysqli_num_rows($Resultado);

$result = mysqli_query($connect, $query . $query1);

$data = array();

while ($row = mysqli_fetch_array($result)) 
{
	$sub_array = array();
	$sub_array[] = $row['ID'];
	$sub_array[] = $row['Cliente'];
	$sub_array[] = $row['Total'];
	$sub_array[] = $row['Subtotal'];
	$sub_array[] = $row['Impuestos'];
	$sub_array[] = $row['Status'];
	$sub_array[] = $row['Fecha_venta'];

	$data[] = $sub_array;
}

function get_all_data($connect)
{
	$query = "SELECT Ventas_menudeo.*, CONCAT(Clientes_menudeo.Nombre,' ',Clientes_menudeo.Apellidos) AS Cliente FROM Ventas_menudeo 
		INNER JOIN Clientes_menudeo
		ON Ventas_menudeo.idCliente_menudeo = Clientes_menudeo.ID";

	$result = mysqli_query($connect, $query);

	return mysqli_num_rows($result);
}

$output = array(
			"draw"				=>	intval($_POST['draw']),
			"recordsTotal"		=>	get_all_data($connect),
			"recordsFiltered"	=>	$number_filter_row,
			"data"				=>	$data
);

mysqli_close($connect); echo json_encode($output);

?>