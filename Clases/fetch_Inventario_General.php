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



$columns = array('ID', 'Codigo', 'Producto', 'Descripcion', 'Marca', 'Division', 'Linea', 'Sublinea', 'Min', 'Existencias','Existencias_apartados','Faltante');

$query = "SELECT * FROM Inventario_producto_view WHERE ";

if($_POST["Marca"])
{
  if($_POST["Marca"] != 'Seleccionar...')
  {
   $query .= 'Marca = "'.$_POST["Marca"].'" AND ';
  }
}

if($_POST["Division"])
{
  if($_POST["Division"] != 'Seleccionar...')
  {
   $query .= 'Division = "'.$_POST["Division"].'" AND ';
  }
}


if($_POST["Linea"])
{
  if($_POST["Linea"] != 'Seleccionar...')
  {
    $query .= 'Linea = "'.$_POST["Linea"].'" AND ';
  }
}


if($_POST["Sublinea"])
{
  if($_POST["Sublinea"] != 'Seleccionar...')
  {
    $query .= 'Sublinea = "'.$_POST["Sublinea"].'" AND ';
  }
}

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR Codigo LIKE "%'.$_POST["search"]["value"].'%" 
  OR Producto LIKE "%'.$_POST["search"]["value"].'%" 
  OR Descripcion LIKE "%'.$_POST["search"]["value"].'%" 
  OR Marca LIKE "%'.$_POST["search"]["value"].'%"
  OR Division LIKE "%'.$_POST["search"]["value"].'%" 
  OR Linea LIKE "%'.$_POST["search"]["value"].'%" 
  OR Sublinea LIKE "%'.$_POST["search"]["value"].'%" 
  OR Min LIKE "%'.$_POST["search"]["value"].'%"
  OR Existencias LIKE "%'.$_POST["search"]["value"].'%"
  OR Existencias_apartados LIKE "%'.$_POST["search"]["value"].'%"
  OR Faltante LIKE "%'.$_POST["search"]["value"].'%")
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
 $sub_array[] = $row["Descripcion"];
 $sub_array[] = $row["Marca"];
 $sub_array[] = $row["Division"];
 $sub_array[] = $row["Linea"];
 $sub_array[] = $row["Sublinea"];
 $sub_array[] = $row["Min"];
 $sub_array[] = $row["Existencias"];
 $sub_array[] = $row["Existencias_apartados"];
 $sub_array[] = $row["Faltante"];
 $data[] = $sub_array;
}

function get_all_data($connect)
{
 $query = "SELECT * FROM Inventario_producto_view ";

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
