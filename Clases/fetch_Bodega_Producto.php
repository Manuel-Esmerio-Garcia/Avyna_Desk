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



$columns = array('idCatalogo', 'Codigo','Producto', 'Precio_publico','Min','Existencias', 'Cantidad_picking');

#select SU.*, MO.Moneda AS Moneda_Name from Sucursales AS SU INNER JOIN Monedas AS MO ON SU.Moneda = MO.ID;

$query = "SELECT * FROM Inventario_producto_sucursal_view WHERE ";

if($_POST["idSucursal"])
{
 $query .= 'idSucursal = "'.$_POST["idSucursal"].'" AND ';
}

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (idCatalogo LIKE "%'.$_POST["search"]["value"].'%" 
  OR Codigo LIKE "%'.$_POST["search"]["value"].'%"
  OR Producto LIKE "%'.$_POST["search"]["value"].'%"
  OR Precio_publico LIKE "%'.$_POST["search"]["value"].'%"
  OR Min LIKE "%'.$_POST["search"]["value"].'%"
  OR Existencias LIKE "%'.$_POST["search"]["value"].'%")
 ';
}

if(isset($_POST["order"]))
{
 $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' 
 ';
}
else
{
 $query .= 'ORDER BY idCatalogo DESC ';
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
 $sub_array[] = ' <span>'.$row["idCatalogo"].'</span><span hidden="hidden">'.$row["idInventario"].'</span>';
 $sub_array[] = $row["Codigo"];
 $sub_array[] = $row["Producto"];
 $sub_array[] = $row["Precio_publico"];
 $sub_array[] = '<input type="text" class="form-control" value="'.$row["Min"].'" onchange="myFunction('.$row["idInventario"].',this.value)">';
 $sub_array[] = $row["Existencias"];
 $sub_array[] = $row['Cantidad_picking'];
 $data[] = $sub_array;
}

function get_all_data($connect)
{
$query = "SELECT * FROM Inventario_producto_sucursal_view";

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
