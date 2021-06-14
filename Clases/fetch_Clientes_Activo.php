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

$columns = array('ID', 'Nombre','Apellidos', 'Empresa','Cargo','Calle_numero','Colonia','Ciudad','Municipio','Estado','Pais','CP','RFC','Tel1','Tel2','Email','Descuento_%','Nivel','Status','Distribuidor','Referencias');

$query = "SELECT * FROM Clientes_View_Module WHERE Status = 'Activo' AND ";

if($_POST["distribuidores"])
{
  if($_POST["distribuidores"] != '' && $_POST["distribuidores"] != null)
  {
   $query .= 'idCliente = '.$_POST["distribuidores"].' AND ';
  }
}

if($_POST["nivel"]){
  if($_POST["nivel"] != '' && $_POST['nivel'] != null){
    $query .= 'Nivel = "'.$_POST["nivel"].'" AND ';
  }
}

if(isset($_POST["search"]["value"]))
{
 $query .= '
  (ID LIKE "%'.$_POST["search"]["value"].'%" 
  OR Nombre LIKE "%'.$_POST["search"]["value"].'%"
  OR Apellidos LIKE "%'.$_POST["search"]["value"].'%"
  OR Empresa LIKE "%'.$_POST["search"]["value"].'%"
  OR Cargo LIKE "%'.$_POST["search"]["value"].'%"
  OR Calle_numero LIKE "%'.$_POST["search"]["value"].'%"
  OR Colonia LIKE "%'.$_POST["search"]["value"].'%"
  OR Ciudad LIKE "%'.$_POST["search"]["value"].'%"
  OR Municipio LIKE "%'.$_POST["search"]["value"].'%"
  OR Estado LIKE "%'.$_POST["search"]["value"].'%"
  OR Pais LIKE "%'.$_POST["search"]["value"].'%"
  OR CP LIKE "%'.$_POST["search"]["value"].'%"
  OR RFC LIKE "%'.$_POST["search"]["value"].'%"
  OR Tel1 LIKE "%'.$_POST["search"]["value"].'%"
  OR Tel2 LIKE "%'.$_POST["search"]["value"].'%"
  OR Email LIKE "%'.$_POST["search"]["value"].'%"
  OR `Descuento_%` LIKE "%'.$_POST["search"]["value"].'%"
  OR Nivel LIKE "%'.$_POST["search"]["value"].'%"
  OR Status LIKE "%'.$_POST["search"]["value"].'%"
  OR Distribuidor LIKE "%'.$_POST["search"]["value"].'%"
  OR Referencias LIKE "%'.$_POST["search"]["value"].'%")
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

$queyInfo = $query;

$number_filter_row = mysqli_num_rows(mysqli_query($connect, $query));

$result = mysqli_query($connect, $query . $query1);

$data = array();

while($row = mysqli_fetch_array($result))
{
 $sub_array = array();
 $sub_array[] = $row["ID"];
 $sub_array[] = $row["Nombre"];
 $sub_array[] = $row["Apellidos"];
 $sub_array[] = $row["Empresa"];
 $sub_array[] = $row["Cargo"];
 $sub_array[] = $row["Calle_numero"];
 $sub_array[] = $row["Colonia"];
 $sub_array[] = $row["Ciudad"];
 $sub_array[] = $row["Municipio"];
 $sub_array[] = $row["Estado"];
 $sub_array[] = $row["Pais"];
 $sub_array[] = $row["CP"];
 $sub_array[] = $row["RFC"];
 $sub_array[] = $row["Tel1"];
 $sub_array[] = $row["Tel2"];
 $sub_array[] = $row["Email"];
 $sub_array[] = $row["Descuento_%"];
 $sub_array[] = $row["Nivel"];
 $sub_array[] = $row["Status"];
 $sub_array[] = $row["Distribuidor"];
 $sub_array[] = $row["Referencias"];
 $data[] = $sub_array;
}

function get_all_data($connect)
{

$query = "SELECT * FROM Clientes_View_Module WHERE Status = 'Activo' ";


if($_POST["distribuidores"])
{
    if($_POST["distribuidores"] != '')
    {
      $query .= ' AND idCliente = '.$_POST["distribuidores"];
    }
}

if($_POST["nivel"]){
  if($_POST["nivel"] != '' && $_POST['nivel'] != null){
    $query .= ' AND Nivel = "'.$_POST["nivel"].'"';
  }
}

 $result = mysqli_query($connect, $query);
 return mysqli_num_rows($result);
}

$output = array(
 "draw"    => intval($_POST["draw"]),
 "recordsTotal"  =>  get_all_data($connect),
 "recordsFiltered" => $number_filter_row,
 "data"    => $data,
 "Info" => $queyInfo
);

mysqli_close($connect); echo json_encode($output);

?>
