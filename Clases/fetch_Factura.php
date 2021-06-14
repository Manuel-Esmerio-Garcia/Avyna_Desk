<?php
require('Conexion.php');
//fetch.php
//$connect = mysqli_connect("prosalon4810.cloudapp.net", "prosalon", "prosalonAdmin1", "prosalon");

$Conexion = new Conexion();

$connect = $Conexion->Connect();

mysqli_set_charset($connect,"utf8");

$columns = array('IDVenta', 'Fecha_Timbrado', 'Distribuidor', 'RFC','ID', 'Folio', 'SubtotalInvoice', 'ImpuestoInvoice','TotalInvoice', 'Status', 'UUID', 'IDIntegrador','Tipo_Factura');

$query = "SELECT * FROM Facturas_Facturadas1 WHERE ";

if($_POST["is_date_search"] == "yes")
{
 $query .= 'Fecha_Timbrado BETWEEN "'.$_POST["start_date"].'" AND "'.$_POST["end_date"].'" AND ';
}

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (IDVenta LIKE "%'.$_POST["search"]["value"].'%" 
  OR Fecha_Timbrado LIKE "%'.$_POST["search"]["value"].'%" 
  OR Distribuidor LIKE "%'.$_POST["search"]["value"].'%"
  OR RFC LIKE "%'.$_POST["search"]["value"].'%"
  OR ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR Folio LIKE "%'.$_POST["search"]["value"].'%" 
  OR SubtotalInvoice LIKE "%'.$_POST["search"]["value"].'%" 
  OR ImpuestoInvoice LIKE "%'.$_POST["search"]["value"].'%" 
  OR TotalInvoice LIKE "%'.$_POST["search"]["value"].'%"
  OR Status LIKE "%'.$_POST["search"]["value"].'%"
  OR UUID LIKE "%'.$_POST["search"]["value"].'%"
  OR IDIntegrador LIKE "%'.$_POST["search"]["value"].'%"
  OR Tipo_Factura LIKE "%'.$_POST["search"]["value"].'%")
 ';
}

if(isset($_POST["order"]))
{
 $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' 
 ';
}
else
{
 $query .= 'ORDER BY IDVenta DESC ';
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
 $sub_array[] = $row["IDVenta"];
 $sub_array[] = $row["Fecha_Timbrado"];
 $sub_array[] = $row["Distribuidor"];
 $sub_array[] = $row["RFC"];
 /*if ($row["Tipo_Factura"] == 1) {
    $sub_array[] = 'XAXX010101000';
 }else{
    $sub_array[] = $row["RFC"];
 }*/
 $sub_array[] = $row["ID"];
 $sub_array[] = $row["Folio"];
 $sub_array[] = $row["SubtotalInvoice"];
 $sub_array[] = $row["ImpuestoInvoice"];
 $sub_array[] = $row["TotalInvoice"];
 $sub_array[] = $row["Status"];
 $sub_array[] = $row["UUID"];
 $sub_array[] = $row["IDIntegrador"];
 $sub_array[] = $row["Tipo_Factura"];
 $data[] = $sub_array;
}

function get_all_data($connect)
{
 $query = "SELECT * FROM Facturas_Facturadas1";
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
