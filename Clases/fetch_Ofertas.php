<?php
require('Conexion.php');
//fetch.php
//$connect = mysqli_connect("prosalon4810.cloudapp.net", "prosalon", "prosalonAdmin1", "prosalon");require('Conexion.php');
//fetch.php

/*$servername   = "prosalon4810.cloudapp.net";
$username     = "prosalon";
$password     = "prosalonAdmin1";
$databaseName   = "prosalon";*/

$Conexion = new Conexion();

$connect = $Conexion->Connect();

mysqli_set_charset($connect,"utf8");



$columns = array('ID', 'Nombre','Desc', 'Vigencia_inicial','Vigencia_final','Compra_req','Status');

$query = "SELECT * FROM Ofertas WHERE ";

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR Nombre LIKE "%'.$_POST["search"]["value"].'%"
  OR `Desc` LIKE "%'.$_POST["search"]["value"].'%"
  OR Vigencia_inicial LIKE "%'.$_POST["search"]["value"].'%"
  OR Vigencia_final LIKE "%'.$_POST["search"]["value"].'%"
  OR Compra_req LIKE "%'.$_POST["search"]["value"].'%"
  OR Status LIKE "%'.$_POST["search"]["value"].'%")
 ';
}

if(isset($_POST["order"]))
{
 $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' 
 ';
}
else
{
 $query .= 'ORDER BY ID ASC ';
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
 $sub_array[] = $row["Nombre"];
 $sub_array[] = $row["Desc"];
 $sub_array[] = $row["Vigencia_inicial"];
 $sub_array[] = $row["Vigencia_final"];
 $sub_array[] = $row["Compra_req"];
 $sub_array[] = $row["Status"];
 $data[] = $sub_array;
}

function get_all_data($connect)
{
$query = "SELECT * FROM Ofertas";

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
