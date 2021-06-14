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



$columns = array('ID', 'Zona','Descripcion', 'Poblacion', 'Bloque','Cliente', 'CuotaFinal', 'Status');

$query = "SELECT * FROM View_Zona_Distribuidor WHERE ";

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR Zona LIKE "%'.$_POST["search"]["value"].'%"
  OR Descripcion LIKE "%'.$_POST["search"]["value"].'%"
  OR Poblacion LIKE "%'.$_POST["search"]["value"].'%"
  OR Bloque LIKE "%'.$_POST["search"]["value"].'%"
  OR Cliente LIKE "%'.$_POST["search"]["value"].'%"
  OR CuotaFinal LIKE "%'.$_POST["search"]["value"].'%"
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
 $sub_array[] = $row["Zona"];
 $sub_array[] = $row["Descripcion"];
 $sub_array[] = $row["Poblacion"];
 $sub_array[] = ($row["Bloque"] == "") ? $row["Bloque"] : $row["Bloque"].'<span hidden="hidden">'.$row["idBloque"].'</span>';
 $sub_array[] = ($row["Cliente"] == "") ? $row["Cliente"] : $row["Cliente"].'<span hidden="hidden">'.$row["idCliente"].'</span>';

 //$sub_array[] = $row["Bloque"].'<span hidden="hidden">'.$row["idBloque"].'</span>';
 //$sub_array[] = $row["Cliente"].'<span hidden="hidden">'.$row["idCliente"].'</span>';
 $sub_array[] = $row["CuotaFinal"];
 $sub_array[] = $row["Status"];
 $data[] = $sub_array;
}

function get_all_data($connect)
{
$query = "SELECT * FROM View_Zona_Distribuidor";

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
