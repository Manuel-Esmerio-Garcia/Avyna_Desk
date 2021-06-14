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

$columns = array("ID","FechaHora","Usuario", "Titulo", "Descripcion", "Status", "idUsuario_solicita" );

$query = " SELECT T.*, CONCAT(U.Nombre, ' ', U.Apellidos) AS Usuario FROM tickets AS T INNER JOIN Usuarios AS U ON T.idUsuario_solicita = U.ID WHERE";

if($_POST["is_date_search"] == "yes")
{
 $query .= ' T.FechaHora BETWEEN "'.$_POST["start_date"].'" AND "'.$_POST["end_date"].'" AND ';
}

if ($_POST["Status"] != null) {
	$query .= ' T.Status = "'.$_POST["Status"].'" AND';
}

if($_POST["Usuario"] != null)
{
 $query .= ' T.idUsuario_solicita = '.$_POST["Usuario"].' AND ';
}

if (isset($_POST["search"]["value"])) 
{
	$query .= '(T.ID LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR T.FechaHora LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR Nombre LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR Apellidos LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR T.Titulo LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR T.Descripcion LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR T.Status LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR T.idUsuario_solicita LIKE "%'.$_POST["search"]["value"].'%") ';
}

if(isset($_POST["order"]))
{
 $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' 
 ';
}
else
{
 $query .= ' ORDER BY T.ID DESC ';
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
	$sub_array[] = $row['FechaHora'];
	$sub_array[] = $row['Usuario'];
	$sub_array[] = $row['Titulo'];
	$sub_array[] = $row['Descripcion'];
	$sub_array[] = $row['Status'];
	$sub_array[] = $row['idUsuario_solicita'];

	$data[] = $sub_array;
}

function get_all_data($connect)
{
	$query = "SELECT T.*, CONCAT(U.Nombre, ' ', U.Apellidos) AS Usuario FROM tickets AS T INNER JOIN Usuarios AS U ON T.idUsuario_solicita = U.ID";

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
