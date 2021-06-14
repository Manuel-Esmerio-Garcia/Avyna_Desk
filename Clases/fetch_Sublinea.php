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



$columns = array('ID', 'Sublinea','Linea');

$query = "SELECT SU.*, LI.Linea FROM Sublineas AS SU INNER JOIN Lineas AS LI ON SU.idLinea = LI.ID WHERE ";

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (SU.ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR SU.Sublinea LIKE "%'.$_POST["search"]["value"].'%"
  OR LI.Linea LIKE "%'.$_POST["search"]["value"].'%")
 ';
}

if(isset($_POST["order"]))
{
 $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' 
 ';
}
else
{
 $query .= 'ORDER BY SU.ID ASC ';
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
 $sub_array[] = $row["Sublinea"];
 $sub_array[] = $row["Linea"];

 $data[] = $sub_array;
}

function get_all_data($connect)
{
$query = "SELECT SU.*, LI.Linea FROM Sublineas AS SU INNER JOIN Lineas AS LI ON SU.idLinea = LI.ID ";

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
