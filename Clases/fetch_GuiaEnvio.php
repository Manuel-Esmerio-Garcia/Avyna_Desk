<?php 
require('Conexion.php');

$Conexion = new Conexion();

$connect = $Conexion->Connect();

//$connect = mysqli_connect($servername,$username,$password, $databaseName);

mysqli_set_charset($connect,"utf8");

$columns = array("ID","idVenta","Usuario", "Distribuidor", "Peso", "Numero_guia", "Fecha_final", "Status");

$query = "SELECT GE.ID, EG.idVenta, CONCAT(UP.Nombre,' ',UP.Apellido) AS Usuario, CONCAT(CL.Nombre,' ',CL.Apellidos) AS Distribuidor, EG.Peso, EG.Numero_guia, EG.Fecha_final, EG.Status, EG.ID AS idEmpaquegeneral FROM Guias_envios AS GE INNER JOIN Empaque_general AS EG ON GE.idEmpaquegeneral = EG.ID INNER JOIN Ventas AS V ON EG.idVenta = V.ID INNER JOIN Clientes AS CL ON V.idCliente = CL.ID INNER JOIN Usuarios_pack AS UP ON EG.idUsuario_empaque = UP.ID WHERE ";

if (isset($_POST["search"]["value"])) 
{
	$query .= '(GE.ID LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR EG.idVenta LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR UP.Nombre LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR CL.Nombre LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR EG.Peso LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR EG.Numero_guia LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR EG.Fecha_final LIKE "%'.$_POST["search"]["value"].'%" ';
	$query .= 'OR EG.Status LIKE "%'.$_POST["search"]["value"].'%") ';
}

if(isset($_POST["order"]))
{
 $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' 
 ';
}
else
{
 $query .= ' ORDER BY GE.ID ASC ';
}

$query1 = '';

if($_POST["length"] != -1)
{
 $query1 = ' LIMIT ' . $_POST['start'] . ', ' . $_POST['length'];
}

$number_filter_row = mysqli_num_rows(mysqli_query($connect, $query));

$result = mysqli_query($connect, $query . $query1);

$data = array();

while ($row = mysqli_fetch_array($result)) 
{
	$sub_array = array();
	$sub_array[] = $row['ID'];
	$sub_array[] = $row['idVenta'].'<span hidden="hidden">'.$row['idEmpaquegeneral'].'</span>';
	$sub_array[] = $row['Usuario'];
	$sub_array[] = $row['Distribuidor'];
	$sub_array[] = $row['Peso'];
	$sub_array[] = $row['Numero_guia'];
	$sub_array[] = $row['Fecha_final'];
	$sub_array[] = $row['Status'];

	$data[] = $sub_array;
}

function get_all_data($connect)
{
	$query = "SELECT GE.ID, EG.idVenta, CONCAT(UP.Nombre,' ',UP.Apellido) AS Usuario, CONCAT(CL.Nombre,' ',CL.Apellidos) AS Distribuidor, EG.Peso, EG.Numero_guia, EG.Fecha_final, EG.Status, EG.ID AS idEmpaquegeneral FROM Guias_envios AS GE INNER JOIN Empaque_general AS EG ON GE.idEmpaquegeneral = EG.ID INNER JOIN Ventas AS V ON EG.idVenta = V.ID INNER JOIN Clientes AS CL ON V.idCliente = CL.ID INNER JOIN Usuarios_pack AS UP ON EG.idUsuario_empaque = UP.ID";

	$result = mysqli_query($connect, $query);

	return mysqli_num_rows($result);
}

$output = array(
			"draw"				=>	intval($_POST['draw']),
			"recordsTotal"		=>	get_all_data($connect),
			"recordsFiltered"	=>	$number_filter_row,
			"data"				=>	$data
);

mysqli_close($connect); echo json_encode($output);

?>
