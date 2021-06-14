<?php
require('Conexion.php');

$Conexion = new Conexion();

$connect = $Conexion->Connect();

$link = $Conexion->link();

mysqli_set_charset($connect,"utf8");

if ($_POST['select_Sucursal'])
{

//query the database
$query = "SELECT ID, CONVERT(Cliente USING utf8), CONVERT(Alias USING utf8), CONVERT(Coordinador USING utf8), CONVERT(Director USING utf8), CONVERT(Ciudad USING utf8), CONVERT(Estado USING utf8), CONVERT(Region USING utf8), CONVERT(Zona USING utf8), Dia_Pedido, Total_Venta, Total_Venta_Distr, Cuota, Procentaje, Bloque, Cuota_Final FROM ventasxdistribuidoresmensual WHERE idSucursal = ".$_POST['select_Sucursal']."";

if($_POST["select_Bloque"])
{
 $query .= ' AND idBloque = '.$_POST["select_Bloque"].'';
}

$query .= ' ORDER BY ID DESC ';

// output headers so that the file is downloaded rather than displayed
header('Content-type: text/csv');
header('Content-Disposition: attachment; filename="Reporte Mensual.csv"');
 
// do not cache the file
header('Pragma: no-cache');
header('Expires: 0');
 
// create a file pointer connected to the output stream
$file = fopen('php://output', 'w');

// send the column headers
fputcsv($file, array('ID', 'Cliente','Alias', 'Coordinador', 'Director', 'Ciudad','Estado','Region','Zona','Dia_Pedido', 'Total_Venta', 'Total_Venta_Distr','Cuota','Porcentaje','Bloque','Cuota Final'));

if ($rows = mysqli_query($link, $query))
{
// loop over the rows, outputting them
while ($row = mysqli_fetch_assoc($rows))
{
fputcsv($file, $row);
}

}

// close the connection
mysqli_close($link);

}
else
{
	print_r("Error Sucursal");
}

?>
