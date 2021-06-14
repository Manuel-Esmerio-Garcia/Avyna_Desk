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



$columns = array('ID', 'Nombre','Apellidos','Calle_numero','Colonia','Municipio','Estado','Pais','CP','Tel1','Tel2','Email','Status');

$query = "SELECT * FROM Usuarios WHERE ";

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR Nombre LIKE "%'.$_POST["search"]["value"].'%"
  OR Apellidos LIKE "%'.$_POST["search"]["value"].'%"
  OR Calle_numero LIKE "%'.$_POST["search"]["value"].'%"
  OR Colonia LIKE "%'.$_POST["search"]["value"].'%"
  OR Municipio LIKE "%'.$_POST["search"]["value"].'%"
  OR Estado LIKE "%'.$_POST["search"]["value"].'%"
  OR Pais LIKE "%'.$_POST["search"]["value"].'%"
  OR CP LIKE "%'.$_POST["search"]["value"].'%"
  OR Tel1 LIKE "%'.$_POST["search"]["value"].'%"
  OR Tel2 LIKE "%'.$_POST["search"]["value"].'%"
  OR Email LIKE "%'.$_POST["search"]["value"].'%"
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
 $sub_array[] = $row["Nombre"];
 $sub_array[] = $row["Apellidos"];
 $sub_array[] = $row["Calle_numero"];
 $sub_array[] = $row["Colonia"];
 $sub_array[] = $row["Municipio"];
 $sub_array[] = $row["Estado"];
 $sub_array[] = $row["Pais"];
 $sub_array[] = $row["CP"];
 $sub_array[] = $row["Tel1"];
 $sub_array[] = $row["Tel2"];
 $sub_array[] = $row["Email"];
 $sub_array[] = $row["Status"];
 /*$sub_array[] = $row["Configuracion"];
 $sub_array[] = $row["Clientes"];
 $sub_array[] = $row["Distribuidores"];
 $sub_array[] = $row["Usuarios"];
 $sub_array[] = $row["Bodega"];
 $sub_array[] = $row["Productos"];
 $sub_array[] = $row["Proveedores"];
 $sub_array[] = $row["Promociones"];
 $sub_array[] = $row["Ventas"];
 $sub_array[] = $row["Compras"];
 $sub_array[] = $row["Inventario"];
 $sub_array[] = $row["Cuentas_cobrar"];
 $sub_array[] = $row["Cuentas_pagar"];
 $sub_array[] = $row["Gastos"];
 $sub_array[] = $row["Otras_salidas"];
 $sub_array[] = $row["Otras_entradas"];
 $sub_array[] = $row["Usuarios_pack"];
 $sub_array[] = $row["Puntos"];
 $sub_array[] = $row["Extracciones"];
 $sub_array[] = $row["Envios"];
 $sub_array[] = $row["Traspasos"];
 $sub_array[] = $row["Empaques"];
 $sub_array[] = $row["Reportes"];
 $sub_array[] = $row["Paises"];
 $sub_array[] = $row["Cajas"];
 $sub_array[] = $row["Factura"];
 $sub_array[] = $row["Ticket"];
 $sub_array[] = $row["Empresa"];
 $sub_array[] = $row["HelpDesk"];*/
 $data[] = $sub_array;
}

function get_all_data($connect)
{
$query = "SELECT * FROM Usuarios";

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
