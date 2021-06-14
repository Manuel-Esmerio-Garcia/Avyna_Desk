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



$columns = array('ID', 'Locacion', 'Fecha_ingreso', 'Existencias', 'Existencias_apartados');

$query = "SELECT * FROM Locaciones_sucursal_view WHERE idSucursal = ".$_POST["Bodega"]." AND ";

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR Locacion LIKE "%'.$_POST["search"]["value"].'%" 
  OR Fecha_ingreso LIKE "%'.$_POST["search"]["value"].'%" 
  OR Existencias LIKE "%'.$_POST["search"]["value"].'%" 
  OR Existencias_apartados LIKE "%'.$_POST["search"]["value"].'%")
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
 $sub_array[] = $row["Locacion"];
 $sub_array[] = $row["Fecha_ingreso"];
 $sub_array[] = $row["Existencias"];
 $sub_array[] = $row["Existencias_apartados"];
 $data[] = $sub_array;
}

function get_all_data($connect)
{
$query = "SELECT * FROM Locaciones_sucursal_view WHERE idSucursal = ".$_POST["Bodega"];

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
