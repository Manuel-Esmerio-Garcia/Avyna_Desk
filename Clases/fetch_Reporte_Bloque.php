<?php
require('Conexion.php');
//fetch.php
//$connect = mysqli_connect("prosalon4810.cloudapp.net", "prosalon", "prosalonAdmin1", "prosalon");

$Conexion = new Conexion();

$connect = $Conexion->Connect();

$Contador = 1;

mysqli_set_charset($connect,"utf8");

$columns = array('idBloque', 'Bloque', 'Total_Venta','Total_Venta_Distr');

$query = "SELECT * FROM Reporte_Ventas_x_Bloque WHERE idSucursal = ".$_POST['idSucursal']." AND ";


if(isset($_POST["search"]["value"]))
{
 $query .= '
  (idBloque LIKE "%'.$_POST["search"]["value"].'%" 
  OR Bloque LIKE "%'.$_POST["search"]["value"].'%" 
  OR Total_Venta LIKE "%'.$_POST["search"]["value"].'%"
  OR Total_Venta_Distr LIKE "%'.$_POST["search"]["value"].'%") 
 ';
}

if(isset($_POST["order"]))
{
 $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' 
 ';
}
else
{
 $query .= 'ORDER BY idBloque DESC  ';
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
 $sub_array[] = $row["idBloque"];
 $sub_array[] = $row["Bloque"];
 $sub_array[] = $row["Total_Venta"];
 $sub_array[] = $row["Total_Venta_Distr"];
 $data[] = $sub_array;
}

function get_all_data($connect)
{
 $query = "SELECT * FROM Reporte_Ventas_x_Bloque WHERE idSucursal = ".$_POST['idSucursal'];
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
