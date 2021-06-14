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



$columns = array('idVenta', 'Fecha','Monto','Status', 'ID', 'Fecha_venta', 'Nombre', 'Apellidos','Total');

$query = "SELECT PC.*, CL.Nombre, CL.Apellidos, V.Fecha_venta,V.Total FROM Pagos_clientes AS PC 
  INNER JOIN Ventas AS V ON PC.idVenta = V.ID 
  INNER JOIN Clientes AS CL ON V.idCliente = CL.ID 
  INNER JOIN Sucursales AS SU ON CL.idSucursal = SU.ID
  WHERE PC.Status = 'Pendiente' AND ";

if($_POST["idBodega"])
{
 $query .= 'SU.ID = "'.$_POST["idBodega"].'" AND ';
}

if($_POST["Cliente"])
{
 $query .= 'CL.ID = "'.$_POST["Cliente"].'" AND ';
}

if($_POST["is_date_search"] == "yes")
{
 $query .= 'V.Fecha_venta BETWEEN "'.$_POST["start_date"].'" AND "'.$_POST["end_date"].'" AND ';
}


if(isset($_POST["search"]["value"]))
{
 $query .= '
  (PC.idVenta LIKE "%'.$_POST["search"]["value"].'%" 
  OR PC.Fecha LIKE "%'.$_POST["search"]["value"].'%" 
  OR PC.Monto LIKE "%'.$_POST["search"]["value"].'%" 
  OR PC.Status LIKE "%'.$_POST["search"]["value"].'%" 
  OR PC.ID LIKE "%'.$_POST["search"]["value"].'%"
  OR V.Fecha_venta LIKE "%'.$_POST["search"]["value"].'%" 
  OR CL.Nombre LIKE "%'.$_POST["search"]["value"].'%"
  OR CL.Apellidos LIKE "%'.$_POST["search"]["value"].'%"
  OR V.Total LIKE "%'.$_POST["search"]["value"].'%")
 ';
}

if(isset($_POST["order"]))
{
 $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' 
 ';
}
else
{
 $query .= 'ORDER BY PC.idVenta ASC ';
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
 $sub_array[] = $row["idVenta"];
 $sub_array[] = $row["Fecha"];
 $sub_array[] = $row["Monto"];
 $sub_array[] = $row["Status"];
 $sub_array[] = $row["ID"];
 $sub_array[] = $row["Fecha_venta"];
 $sub_array[] = $row["Nombre"];
 $sub_array[] = $row["Apellidos"];
 $sub_array[] = $row["Total"];

 $data[] = $sub_array;
}

function get_all_data($connect)
{
 $query = "SELECT PC.*, CL.Nombre, CL.Apellidos, V.Fecha_venta,V.Total FROM Pagos_clientes AS PC 
  INNER JOIN Ventas AS V ON PC.idVenta = V.ID 
  INNER JOIN Clientes AS CL ON V.idCliente = CL.ID 
  INNER JOIN Sucursales AS SU ON CL.idSucursal = SU.ID
  WHERE PC.Status = 'Pendiente' AND SU.ID = ".$_POST["idBodega"];

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
