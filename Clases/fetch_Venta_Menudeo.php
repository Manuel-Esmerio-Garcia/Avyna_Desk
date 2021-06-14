<?php

ini_set('memory_limit', '-1');
set_time_limit(500);

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



$columns = array('ID', 'Fecha_venta','Cliente','Distribuidor','Descuento','Subtotal','Impuestos','Total','Total_desc','Adeudo','Status','Fecha_entrega','Extraido');

$query = "SELECT * FROM view_table_ventas_menudeo2 WHERE "; 

if($_POST["idSucursal"])
{
 $query .= 'idSucursal = "'.$_POST["idSucursal"].'" AND ';
}

if($_POST["Cliente"])
{
 $query .= 'idDistribuidor = "'.$_POST["Cliente"].'" AND ';
}

if($_POST["is_date_search"] == "yes")
{
 $query .= 'Fecha_venta BETWEEN "'.$_POST["start_date"].'" AND "'.$_POST["end_date"].'" AND ';
}

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR Fecha_venta LIKE "%'.$_POST["search"]["value"].'%"
  OR Cliente LIKE "%'.$_POST["search"]["value"].'%"
  OR Distribuidor LIKE "%'.$_POST["search"]["value"].'%"
  OR Descuento LIKE "%'.$_POST["search"]["value"].'%"
  OR Subtotal LIKE "%'.$_POST["search"]["value"].'%"
  OR Impuestos LIKE "%'.$_POST["search"]["value"].'%"
  OR Total LIKE "%'.$_POST["search"]["value"].'%"
  OR Total_desc LIKE "%'.$_POST["search"]["value"].'%"
  OR Adeudo LIKE "%'.$_POST["search"]["value"].'%"
  OR Status LIKE "%'.$_POST["search"]["value"].'%"
  OR Fecha_entrega LIKE "%'.$_POST["search"]["value"].'%"
  OR Extraido LIKE "%'.$_POST["search"]["value"].'%")
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
 $sub_array[] = $row["Fecha_venta"];
 $sub_array[] = $row["Cliente"];
 $sub_array[] = $row["Distribuidor"];
 $sub_array[] = $row["Descuento"];
 $sub_array[] = $row["Subtotal"];
 $sub_array[] = $row["Impuestos"];
 $sub_array[] = $row["Total"];
 $sub_array[] = $row["Total_desc"];
 $sub_array[] = $row["Adeudo"];
 $sub_array[] = $row["Status"];
 $sub_array[] = $row["Fecha_entrega"];
 $sub_array[] = $row["Extraido"];

 $data[] = $sub_array;
}

function get_all_data($connect)
{
$query = "SELECT * FROM view_table_ventas_menudeo2";

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
