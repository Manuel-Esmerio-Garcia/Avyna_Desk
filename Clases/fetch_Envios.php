<?php 
require('Conexion.php');
//fetch.php

/*$servername 	= "prosalon4810.cloudapp.net";
$username 		= "prosalon";
$password 		= "prosalonAdmin1";
$databaseName 	= "prosalon";*/

$Conexion = new Conexion();

$connect = $Conexion->Connect();

//$connect = mysqli_connect($servername,$username,$password, $databaseName);

mysqli_set_charset($connect,"utf8");

$columns = array("ID","Nombre_cliente","Total", "Pedidos", "Status");

$query = "SELECT * FROM ventas_view2 WHERE (Status != 'Enviado' AND Status != 'Enviado_Facturado') AND Extraido = 1 AND Adeudo < Total AND ";

if ($_POST["idSucursal"] != null) {
	$query .= ' idSucursal = "'.$_POST["idSucursal"].'" AND ';
}

if (isset($_POST["search"]["value"])) 
{
	$query .= '(ID LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR Nombre_cliente LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR Total LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR Pedidos LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR Status LIKE "%'.$_POST["search"]["value"].'%") ';
}

if(isset($_POST["order"]))
{
 $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' 
 ';
}
else
{
 $query .= ' ORDER BY ID ASC ';
}

$query1 = '';

if($_POST["length"] != -1)
{
 $query1 = ' LIMIT ' . $_POST['start'] . ', ' . $_POST['length'];
}

$number_filter_row = mysqli_num_rows(mysqli_query($connect, $query));

$result = mysqli_query($connect, $query . $query1);

$data = array();

while ($row = mysqli_fetch_array($result)) 
{
	$sub_array = array();
	$sub_array[] = $row['ID'];
	$sub_array[] = $row['Nombre_cliente'];
	$sub_array[] = $row['Total'];
	$sub_array[] = $row['Pedidos'];
	$sub_array[] = $row['Status'];

	$data[] = $sub_array;
}

function get_all_data($connect)
{
	$query = "SELECT * FROM ventas_view2 WHERE (Status != 'Enviado' AND Status != 'Enviado_Facturado') AND Extraido = 1 AND Adeudo < Total";

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
