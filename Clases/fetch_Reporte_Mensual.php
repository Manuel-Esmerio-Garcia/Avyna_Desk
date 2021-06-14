<?php
require('Conexion.php');
//fetch.php
//$connect = mysqli_connect("prosalon4810.cloudapp.net", "prosalon", "prosalonAdmin1", "prosalon");

$Conexion = new Conexion();

$connect = $Conexion->Connect();

$Contador = 1;

mysqli_set_charset($connect,"utf8");

$columns = array('ID', 'Cliente','Alias', 'Coordinador', 'Director', 'Ciudad','Estado','Region','Zona','Dia_Pedido', 'Total_Venta', 'Total_Venta_Distr','Cuota','Fecha','Procentaje','Bloque','Cuota_Final');

$query = "SELECT * FROM ventasxdistribuidoresmensual WHERE idSucursal = ".$_POST['idSucursal']." AND ";

if($_POST["idBloques"])
{
 $query .= 'idBloque = "'.$_POST["idBloques"].'" AND ';
}

/*if (isset($_POST['Region']))
{
	if (count($_POST['Region']) > 0)
	{
		for ($i=0; $i < count($_POST['Region']); $i++)
		{ 
			if ($Contador == count($_POST['Region']))
			{
				$query .= 'Region = "'.$_POST['Region'][$i].'" AND ';
				$Contador++;
			}
			else
			{
				$query .= 'Region = "'.$_POST['Region'][$i].'" OR ';
				$Contador++;
			}
			
		}
	}
}*/

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR Cliente LIKE "%'.$_POST["search"]["value"].'%" 
  OR Alias LIKE "%'.$_POST["search"]["value"].'%"
  OR Coordinador LIKE "%'.$_POST["search"]["value"].'%"
  OR Director LIKE "%'.$_POST["search"]["value"].'%"
  OR Ciudad LIKE "%'.$_POST["search"]["value"].'%"
  OR Estado LIKE "%'.$_POST["search"]["value"].'%"
  OR Region LIKE "%'.$_POST["search"]["value"].'%"
  OR Zona LIKE "%'.$_POST["search"]["value"].'%"
  OR Dia_Pedido LIKE "%'.$_POST["search"]["value"].'%"
  OR Total_Venta LIKE "%'.$_POST["search"]["value"].'%" 
  OR Total_Venta_Distr LIKE "%'.$_POST["search"]["value"].'%"
  OR Cuota LIKE "%'.$_POST["search"]["value"].'%"
  OR Fecha LIKE "%'.$_POST["search"]["value"].'%"
  OR Procentaje LIKE "%'.$_POST["search"]["value"].'%" 
  OR Bloque LIKE "%'.$_POST["search"]["value"].'%"
  OR Cuota_Final LIKE "%'.$_POST["search"]["value"].'%") 
 ';
}

if(isset($_POST["order"]))
{
 $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' 
 ';
}
else
{
 $query .= 'ORDER BY ID DESC  ';
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
 $sub_array[] = $row["Cliente"];
 $sub_array[] = $row["Alias"];
 $sub_array[] = $row["Coordinador"];
 $sub_array[] = $row["Director"];
 $sub_array[] = $row["Ciudad"];
 $sub_array[] = $row["Estado"];
 $sub_array[] = $row["Region"];
 $sub_array[] = $row["Zona"];
 $sub_array[] = $row["Dia_Pedido"];
 $sub_array[] = $row["Total_Venta"];
 $sub_array[] = $row["Total_Venta_Distr"];
 $sub_array[] = $row["Cuota"];
 $sub_array[] = $row["Fecha"];
 if ($row["Procentaje"] != null && $row["Procentaje"] != "") {
 	$sub_array[] = $row["Procentaje"].'%';
 }
 else{
 	$sub_array[] = '0%';
 } 
 $sub_array[] = $row["Bloque"];
 $sub_array[] = $row["Cuota_Final"];
 $data[] = $sub_array;
}

function get_all_data($connect)
{
 $query = "SELECT * FROM ventasxdistribuidoresmensual WHERE idSucursal = ".$_POST['idSucursal'];
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
