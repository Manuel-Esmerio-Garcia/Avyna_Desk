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



$columns = array('ID', 'Codigo_compra','Fecha_compra', 'Proveedores','Subtotal','Impuestos','Total','Adeudo','Status','Sucursal');

$query = "SELECT * FROM Compras_View_Module WHERE ";

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR Codigo_compra LIKE "%'.$_POST["search"]["value"].'%"
  OR Fecha_compra LIKE "%'.$_POST["search"]["value"].'%"
  OR Proveedores LIKE "%'.$_POST["search"]["value"].'%"
  OR Subtotal LIKE "%'.$_POST["search"]["value"].'%"
  OR Impuestos LIKE "%'.$_POST["search"]["value"].'%"
  OR Total LIKE "%'.$_POST["search"]["value"].'%"
  OR Adeudo LIKE "%'.$_POST["search"]["value"].'%"
  OR Status LIKE "%'.$_POST["search"]["value"].'%"
  OR Sucursal LIKE "%'.$_POST["search"]["value"].'%")
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
 $sub_array[] = $row["Codigo_compra"];
 $sub_array[] = $row["Fecha_compra"];
 $sub_array[] = $row["Proveedores"];
 $sub_array[] = $row["Subtotal"];
 $sub_array[] = $row["Impuestos"];
 $sub_array[] = $row["Total"];
 $sub_array[] = $row["Adeudo"];
 $sub_array[] = $row["Status"];
 $sub_array[] = $row["Sucursal"];
 $data[] = $sub_array;
}

function get_all_data($connect)
{
$query = "SELECT * FROM Compras_View_Module";

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
