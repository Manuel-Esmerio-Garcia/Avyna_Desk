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



$columns = array('ID', 'Nombre','Encargado', 'Calle_numero','Colonia','Municipio','Estado','Pais','CP','Tel1','Tel2','Email','Status','Tipo','Impuesto','Password','Compra_minima','Moneda_Name', 'Semanas_clientes_menudeo', 'Monto_clientes_menudeo');

#select SU.*, MO.Moneda AS Moneda_Name from Sucursales AS SU INNER JOIN Monedas AS MO ON SU.Moneda = MO.ID;

$query = "SELECT SU.*, MO.Moneda AS Moneda_Name FROM Sucursales AS SU INNER JOIN Monedas AS MO ON SU.Moneda = MO.ID WHERE ";

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (SU.ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR SU.Sucursal LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Encargado LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Calle_numero LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Colonia LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Municipio LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Estado LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Pais LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.CP LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Tel1 LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Tel2 LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Email LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Status LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Tipo LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Impuesto LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Password LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Compra_minima LIKE "%'.$_POST["search"]["value"].'%"
  OR MO.Moneda LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Semanas_clientes_menudeo LIKE "%'.$_POST["search"]["value"].'%"
  OR SU.Monto_clientes_menudeo LIKE "%'.$_POST["search"]["value"].'%")
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
 $sub_array[] = $row["Sucursal"];
 $sub_array[] = $row["Encargado"];
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
 $sub_array[] = $row["Tipo"];
 $sub_array[] = $row["Impuesto"];
 $sub_array[] = $row["Password"];
 $sub_array[] = $row["Compra_minima"];
 $sub_array[] = $row["Moneda_Name"];
 $sub_array[] = $row["Semanas_clientes_menudeo"];
 $sub_array[] = $row["Monto_clientes_menudeo"];
 $data[] = $sub_array;
}

function get_all_data($connect)
{
$query = "SELECT SU.*, MO.Moneda AS Moneda_Name FROM Sucursales AS SU INNER JOIN Monedas AS MO ON SU.Moneda = MO.ID";

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
