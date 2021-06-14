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



$columns = array('ID', 'Codigo','Producto', 'Proveedor', 'ListMarca', 'ListDivision','ListLinea','ListSublinea','Descripcion','Volumen','Peso','Ml','Piezas_x_empaque','Distribuidor','Salon','Publico','UnidadSAT','ClaveSAT','Status');

$query = "SELECT * FROM View_Tabla_Productos WHERE ";

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR Codigo LIKE "%'.$_POST["search"]["value"].'%" 
  OR Producto LIKE "%'.$_POST["search"]["value"].'%" 
  OR Proveedor LIKE "%'.$_POST["search"]["value"].'%"
  OR ListMarca LIKE "%'.$_POST["search"]["value"].'%" 
  OR ListDivision LIKE "%'.$_POST["search"]["value"].'%" 
  OR ListLinea LIKE "%'.$_POST["search"]["value"].'%"
  OR ListSublinea LIKE "%'.$_POST["search"]["value"].'%" 
  OR Descripcion LIKE "%'.$_POST["search"]["value"].'%" 
  OR Volumen LIKE "%'.$_POST["search"]["value"].'%"
  OR Peso LIKE "%'.$_POST["search"]["value"].'%" 
  OR Ml LIKE "%'.$_POST["search"]["value"].'%" 
  OR Piezas_x_empaque LIKE "%'.$_POST["search"]["value"].'%"
  OR Distribuidor LIKE "%'.$_POST["search"]["value"].'%" 
  OR Salon LIKE "%'.$_POST["search"]["value"].'%"
  OR Publico LIKE "%'.$_POST["search"]["value"].'%"
  OR UnidadSAT LIKE "%'.$_POST["search"]["value"].'%"
  OR ClaveSAT LIKE "%'.$_POST["search"]["value"].'%"
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
 $sub_array[] = $row["Codigo"];
 $sub_array[] = $row["Producto"];
 $sub_array[] = $row["Proveedor"];
 $sub_array[] = $row["ListMarca"];
 $sub_array[] = $row["ListDivision"];
 $sub_array[] = $row["ListLinea"];
 $sub_array[] = $row["ListSublinea"];
 $sub_array[] = $row["Descripcion"];
 $sub_array[] = $row["Volumen"];
 $sub_array[] = $row["Peso"];
 $sub_array[] = $row["Ml"];
 $sub_array[] = $row["Piezas_x_empaque"];
 $sub_array[] = $row["Distribuidor"];
 $sub_array[] = $row["Salon"];
 $sub_array[] = $row["Publico"];
 $sub_array[] = $row["UnidadSAT"];
 $sub_array[] = $row["ClaveSAT"];
 $sub_array[] = $row["Status"];

 $data[] = $sub_array;
}

function get_all_data($connect)
{
$query = "SELECT * FROM View_Tabla_Productos";

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
