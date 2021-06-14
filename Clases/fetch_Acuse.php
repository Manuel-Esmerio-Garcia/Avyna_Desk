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


$columns = array('ID', 'Serie', 'Folio', 'FechaInvoice', 'UUID', 'IDIntegrador', 'VentaFactura','StatusInvoice', 'IDVentaMenudeo', 'idVenta', 'Fecha_venta', 'Descuento', 'SubtotalInvoice', 'ImpuestoInvoice', 'TotalInvoice','Total_desc','Distribuidor','Empresa','CP','regimenFiscal');

$query = "SELECT * FROM Factura_Cancelada WHERE ";

if($_POST["is_date_search"] == "yes")
{
 $query .= 'FechaInvoice BETWEEN "'.$_POST["start_date"].'" AND "'.$_POST["end_date"].'" AND ';
}

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (VentaFactura LIKE "%'.$_POST["search"]["value"].'%" 
  OR Serie LIKE "%'.$_POST["search"]["value"].'%" 
  OR Distribuidor LIKE "%'.$_POST["search"]["value"].'%"
  OR ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR Folio LIKE "%'.$_POST["search"]["value"].'%" 
  OR SubtotalInvoice LIKE "%'.$_POST["search"]["value"].'%" 
  OR ImpuestoInvoice LIKE "%'.$_POST["search"]["value"].'%" 
  OR TotalInvoice LIKE "%'.$_POST["search"]["value"].'%"
  OR StatusInvoice LIKE "%'.$_POST["search"]["value"].'%"
  OR FechaInvoice LIKE "%'.$_POST["search"]["value"].'%"
  OR UUID LIKE "%'.$_POST["search"]["value"].'%"
  OR IDIntegrador LIKE "%'.$_POST["search"]["value"].'%")
 ';
}

if(isset($_POST["order"]))
{
 $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' 
 ';
}
else
{
 $query .= 'ORDER BY VentaFactura DESC ';
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
 $sub_array[] = $row["VentaFactura"];
 $sub_array[] = $row["FechaInvoice"];
 $sub_array[] = $row["Distribuidor"];
 $sub_array[] = $row["ID"];
 $sub_array[] = $row["Folio"];
 $sub_array[] = $row["SubtotalInvoice"];
 $sub_array[] = $row["ImpuestoInvoice"];
 $sub_array[] = $row["TotalInvoice"];
 $sub_array[] = $row["StatusInvoice"];
 $sub_array[] = $row["UUID"];
 $sub_array[] = $row["IDIntegrador"];
 $data[] = $sub_array;
}

function get_all_data($connect)
{
 $query = "SELECT * FROM Factura_Cancelada";
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
