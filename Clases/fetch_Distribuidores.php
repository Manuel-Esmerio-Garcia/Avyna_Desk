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

$columns = array('ID', 'Nombre','Apellidos', 'Empresa','Cargo','Calle_numero','Colonia','Ciudad','Municipio','Estado','Pais','CP','RFC','Tel1','Tel2','Email','Status','Descuento_%','Dia_entrega','Region','Sucursal','Cuota','Fecha_ingreso','Clientes_x_dia','Bloque');

$query = "SELECT * FROM Distribuidor_View_Module WHERE ";

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR Nombre LIKE "%'.$_POST["search"]["value"].'%"
  OR Apellidos LIKE "%'.$_POST["search"]["value"].'%"
  OR Empresa LIKE "%'.$_POST["search"]["value"].'%"
  OR Cargo LIKE "%'.$_POST["search"]["value"].'%"
  OR Calle_numero LIKE "%'.$_POST["search"]["value"].'%"
  OR Colonia LIKE "%'.$_POST["search"]["value"].'%"
  OR Ciudad LIKE "%'.$_POST["search"]["value"].'%"
  OR Municipio LIKE "%'.$_POST["search"]["value"].'%"
  OR Estado LIKE "%'.$_POST["search"]["value"].'%"
  OR Pais LIKE "%'.$_POST["search"]["value"].'%"
  OR CP LIKE "%'.$_POST["search"]["value"].'%"
  OR RFC LIKE "%'.$_POST["search"]["value"].'%"
  OR Tel1 LIKE "%'.$_POST["search"]["value"].'%"
  OR Tel2 LIKE "%'.$_POST["search"]["value"].'%"
  OR Email LIKE "%'.$_POST["search"]["value"].'%"
  OR Status LIKE "%'.$_POST["search"]["value"].'%"
  OR `Descuento_%` LIKE "%'.$_POST["search"]["value"].'%"
  OR Dia_entrega LIKE "%'.$_POST["search"]["value"].'%"
  OR Region LIKE "%'.$_POST["search"]["value"].'%"
  OR Sucursal LIKE "%'.$_POST["search"]["value"].'%"
  OR Cuota LIKE "%'.$_POST["search"]["value"].'%"
  OR Fecha_ingreso LIKE "%'.$_POST["search"]["value"].'%"
  OR Clientes_x_dia LIKE "%'.$_POST["search"]["value"].'%"
  OR Bloque LIKE "%'.$_POST["search"]["value"].'%")';
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
 $sub_array[] = $row["Nombre"];
 $sub_array[] = $row["Apellidos"];
 $sub_array[] = $row["Empresa"];
 $sub_array[] = $row["Cargo"];
 $sub_array[] = $row["Calle_numero"];
 $sub_array[] = $row["Colonia"];
 $sub_array[] = $row["Ciudad"];
 $sub_array[] = $row["Municipio"];
 $sub_array[] = $row["Estado"];
 $sub_array[] = $row["Pais"];
 $sub_array[] = $row["CP"];
 $sub_array[] = $row["RFC"];
 $sub_array[] = $row["Tel1"];
 $sub_array[] = $row["Tel2"];
 $sub_array[] = $row["Email"];
 $sub_array[] = $row["Status"];
 $sub_array[] = $row["Descuento_%"];
 $sub_array[] = $row["Dia_entrega"];
 $sub_array[] = $row["Region"];
 $sub_array[] = $row["Sucursal"];
 $sub_array[] = $row["Cuota"];
 $sub_array[] = $row["Fecha_ingreso"];
 $sub_array[] = $row["Clientes_x_dia"];
 $sub_array[] = $row["Bloque"];
 $data[] = $sub_array;
}

function get_all_data($connect)
{
$query = "SELECT * FROM Distribuidor_View_Module";

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
