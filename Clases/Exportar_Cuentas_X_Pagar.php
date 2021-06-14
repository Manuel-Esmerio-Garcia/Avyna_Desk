<?php

ini_set( 'display_errors', 1 );
error_reporting( E_ALL );

require('Conexion.php');

$Conexion = new Conexion();

$connect = $Conexion->Connect();

$link = $Conexion->link();

mysqli_set_charset($connect,"utf8");

if ($_POST["select_Bodega"])
{

$query = "SELECT PC.idVenta, PC.Fecha, PC.Monto, CL.Nombre, CL.Apellidos FROM Pagos_clientes AS PC 
  INNER JOIN Ventas AS V ON PC.idVenta = V.ID 
  INNER JOIN Clientes AS CL ON V.idCliente = CL.ID 
  INNER JOIN Sucursales AS SU ON CL.idSucursal = SU.ID
  WHERE PC.Status = 'Pendiente'";

if($_POST["select_Bodega"])
{
 $query .= ' AND SU.ID = '.$_POST["select_Bodega"].'';
}

if($_POST["exampleFormControlSelect2"])
{
 $query .= ' AND CL.ID = '.$_POST["exampleFormControlSelect2"].'';
}

if($_POST["start_date"] && $_POST["end_date"])
{
 $query .= ' AND V.Fecha_venta BETWEEN "'.$_POST["start_date"].'" AND "'.$_POST["end_date"].'"';
}

$query .= ' ORDER BY PC.ID DESC ';



$query1 = "SELECT PC.idVenta, PC.Fecha, PC.Monto, CL.Nombre, CL.Apellidos FROM Pagos_clientes AS PC 
  INNER JOIN Ventas AS V ON PC.idVenta = V.ID 
  INNER JOIN Clientes AS CL ON V.idCliente = CL.ID 
  INNER JOIN Sucursales AS SU ON CL.idSucursal = SU.ID
  WHERE PC.Status = 'Pendiente'";

if($_POST["select_Bodega"])
{
 $query1 .= ' AND SU.ID = '.$_POST["select_Bodega"].'';
}

if($_POST["exampleFormControlSelect2"])
{
 $query1 .= ' AND CL.ID = '.$_POST["exampleFormControlSelect2"].'';
}

if($_POST["start_date"] && $_POST["end_date"])
{
 $query1 .= ' AND V.Fecha_venta BETWEEN "'.$_POST["start_date"].'" AND "'.$_POST["end_date"].'"';
}

$query1 .= ' ORDER BY PC.ID DESC ';

$Nombre_Archivo = 'Respaldos/Reporte_Cuentas_'.date("Y-m-d_H_i_s").'.csv';

if(file_exists($Nombre_Archivo))
{
    $mensaje = "El Archivo $Nombre_Archivo se ha modificado";
}

else
{
    $mensaje = "El Archivo $Nombre_Archivo se ha creado";
}

header('Content-Description: File Transfer');
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="'.$Nombre_Archivo.'"');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
 
// create a file pointer connected to the output stream
$file = fopen('php://output', 'w');

$file1 = fopen($Nombre_Archivo, 'a+');

// send the column headers
fputcsv($file, array('ID de la venta', 'Fecha Pago','Monto de Pago','Nombre Distribuidor', 'Apellidos Distribuidor'));
// send the column headers
fputcsv($file1, array('ID de la venta', 'Fecha Pago','Monto de Pago','Nombre Distribuidor', 'Apellidos Distribuidor'));

if ($rows = mysqli_query($link, $query))
{
	// loop over the rows, outputting them
	while ($row = mysqli_fetch_assoc($rows))
	{
		fputcsv($file, $row);
	}
}

if ($rows1 = mysqli_query($link, $query1))
{
	// loop over the rows, outputting them
	while ($row1 = mysqli_fetch_assoc($rows1))
	{
		fputcsv($file1, $row1);
	}

}

fclose($file);
fclose($file1);

// close the connection
mysqli_close($link);

	    
    $from = "Prosalon@no-reply.com";
    $to = "manuel@integratto.com.mx";
    $subject = "Reporte Cuentas Por Pagar";
    $message = "Cuentas por Pagar ". 'http://'.$_SERVER['HTTP_HOST'].'/Avyna_Desk/Clases/'.$Nombre_Archivo;
    $headers = "From:" . $from;
    mail($to,$subject,$message, $headers);

}
else
{
	print_r("Seleccione una Sucursal");
}

?>
