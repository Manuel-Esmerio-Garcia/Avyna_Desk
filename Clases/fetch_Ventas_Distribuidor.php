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


$columns = array('ID', 'Fecha_venta', 'Cliente', 'Total','Total_real');

$query = "SELECT Pedidos_pendientes_app.*, CONCAT(Nombre_cliente,' ',Apellidos_cliente) AS Cliente, Clientes.`Descuento_%` FROM Pedidos_pendientes_app INNER JOIN Clientes ON Pedidos_pendientes_app.idCliente = Clientes.ID WHERE Fecha_venta >= DATE_SUB(NOW(), INTERVAL 2 MONTH) AND Fecha_venta <= DATE_ADD(NOW(), INTERVAL 1 DAY) AND idVenta IS NULL AND ";

if($_POST["idCliente"])
{
 $query .= 'idCliente = '.$_POST["idCliente"].'  AND ';
}

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (Pedidos_pendientes_app.ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR Pedidos_pendientes_app.Fecha_venta LIKE "%'.$_POST["search"]["value"].'%" 
  OR Pedidos_pendientes_app.Nombre_cliente LIKE "%'.$_POST["search"]["value"].'%"
  OR Pedidos_pendientes_app.Total LIKE "%'.$_POST["search"]["value"].'%"
  OR Pedidos_pendientes_app.Total_real LIKE "%'.$_POST["search"]["value"].'%")
 ';
}

if(isset($_POST["order"]))
{
 $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' 
 ';
}
else
{
 $query .= 'ORDER BY Pedidos_pendientes_app.ID DESC ';
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
 $sub_array[] = $row["Descuento_%"];;
 $sub_array[] = $row["ID"];
 $sub_array[] = $row["Fecha_venta"];
 $sub_array[] = $row["Cliente"];
 $sub_array[] = $row["Total"];
 $sub_array[] = $row["Total_real"];
 $data[] = $sub_array;
}

function get_all_data($connect)
{
$query = "SELECT Pedidos_pendientes_app.*, CONCAT(Nombre_cliente,' ',Apellidos_cliente) AS Cliente, Clientes.`Descuento_%` FROM Pedidos_pendientes_app INNER JOIN Clientes ON Pedidos_pendientes_app.idCliente = Clientes.ID WHERE Fecha_venta >= DATE_SUB(NOW(), INTERVAL 2 MONTH) AND Fecha_venta <= DATE_ADD(NOW(), INTERVAL 1 DAY) AND idVenta IS NULL AND idCliente = ".$_POST["idCliente"]."";

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
