<?php

require("Conexion.php");
//fetch.php
//$connect = mysqli_connect("prosalon4810.cloudapp.net", "prosalon", "prosalonAdmin1", "prosalon");

$Conexion = new Conexion();

$connect = $Conexion->Connect();

mysqli_set_charset($connect,"utf8");


$columns = array('ID', 'FechaHora', 'Titulo', 'Descripcion', 'Status', 'idUsuario_solicita');

$query = "SELECT * FROM tickets WHERE ";

if($_POST["is_date_search"] == "yes")
{
 $query .= 'FechaHora BETWEEN "'.$_POST["start_date"].'" AND "'.$_POST["end_date"].'" AND ';
}

if ($_POST["Status"] != null) {
	$query .= 'Status = "'.$_POST["Status"].'" AND ';
}

if($_POST["Usuario"] != null)
{
 $query .= 'idUsuario_solicita = '.$_POST["Usuario"].' AND ';
}

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR FechaHora LIKE "%'.$_POST["search"]["value"].'%" 
  OR Titulo LIKE "%'.$_POST["search"]["value"].'%" 
  OR Descripcion LIKE "%'.$_POST["search"]["value"].'%" 
  OR Status LIKE "%'.$_POST["search"]["value"].'%" 
  OR idUsuario_solicita LIKE "%'.$_POST["search"]["value"].'%")
 ';
}

if(isset($_POST["order"]))
{
 $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' 
 ';
}
else
{
 $query .= 'ORDER BY FechaHora DESC ';
}

$query1 = '';

if($_POST["length"] != -1)
{
 $query1 = 'LIMIT ' . $_POST['start'] . ', ' . $_POST['length'];
}

$number_filter_row = mysqli_num_rows(mysqli_query($connect, $query));

$result = mysqli_query($connect, $query . $query1);

$data = array();

while($row = mysqli_fetch_array($result))
{
 $sub_array = array();
 $sub_array[] = $row["ID"];
 $sub_array[] = $row["FechaHora"];
 $sub_array[] = $row["Titulo"];
 $sub_array[] = $row["Descripcion"];
 $sub_array[] = $row["Status"];
 $sub_array[] = $row["idUsuario_solicita"];
 $data[] = $sub_array;
}

function get_all_data($connect)
{
 $query = "SELECT * FROM tickets WHERE idUsuario_solicita = ".$_POST['Usuario']."";
 $result = mysqli_query($connect, $query);
 return mysqli_num_rows($result);
}

$output = array(
 "draw"    => intval($_POST["draw"]),
 "recordsTotal"  =>  get_all_data($connect),
 "recordsFiltered" => $number_filter_row,
 "data"    => $data
);

mysqli_close($connect); echo json_encode($output);

?>
