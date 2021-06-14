<?php
require('Conexion.php');

$Conexion = new Conexion();

$connect = $Conexion->Connect();

$link = $Conexion->link();

mysqli_set_charset($connect,"utf8");

if ($_POST['select_Sucursal'])
{

//query the database
$query = "SELECT idBloque, Bloque, Total_Venta, Total_Venta_Distr FROM Reporte_Ventas_x_Bloque WHERE idSucursal = ".$_POST['select_Sucursal']."";


$query .= ' ORDER BY idBloque DESC ';

// output headers so that the file is downloaded rather than displayed
header('Content-type: text/csv');
header('Content-Disposition: attachment; filename="Reporte Bloque.csv"');
 
// do not cache the file
header('Pragma: no-cache');
header('Expires: 0');
 
// create a file pointer connected to the output stream
$file = fopen('php://output', 'w');

// send the column headers
fputcsv($file, array('ID', 'Bloque', 'Total Venta','Total Venta Distribuidores'));

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
