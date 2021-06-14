<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Productos extends CI_Controller {


   public function __construct() 
   {
    parent::__construct();

   if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

    //$this->load->model('Cliente_Model', 'cliente');
    $this->load->model('Producto_Model', 'producto');
    $this->load->helper('form');
}

public function index()
{

  $Titulo = array('PageTitle' => 'Productos');

    $this->load->view('Componentes/Header', $Titulo);    
   $this->load->view('Catalogo/Productos');
   $this->load->view('Componentes/Footer');

}

public function getProductos()
{
  $info = $this->producto->getProductos();
  print_r(json_encode($info));
}

public function exportarCSV(){
  $response = $this->producto->exportarCSV();

  $delimiter = ",";
  $filename = "Reporte_Productos.csv";
  //create a file pointer
  $f = fopen($_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/CSV/'.$filename, 'w+');
  
  //set column headers
  $fields = array('ID', 'Codigo','Producto', 'Proveedor','Marca','División','Linea','Sublinea','Descripción','Volumen','Peso','MI','Pieza Caja','Distribuidor','Salon','Public','Clave Unidad','Clave Producto','Status');
      fputcsv($f, $fields, $delimiter);
        
  foreach ($response as $key => $value) {
    $lineData = array($value['ID'], strval('No '.$value['Codigo']),$value['Producto'],$value['Proveedor'], $value['ListMarca'], $value['ListDivision'], $value['ListLinea'], $value['ListSublinea'],$value['Descripcion'], $value['Volumen'], $value['Peso'], $value['Ml'], $value['Piezas_x_empaque'],$value['Distribuidor'], $value['Salon'], $value['Publico'], $value['UnidadSAT'], $value['ClaveSAT'], $value['Status']);
    fputcsv($f, $lineData, $delimiter);
  }
  //set headers to download file rather than displayed
  header('Content-Type: text/csv');
  header('Content-Disposition: attachment; filename="' . $filename . '";');
  
  print_r(json_encode('http://'.$_SERVER['HTTP_HOST'].'/Avyna_Desk/CSV/'.$filename));
}

public function Consultar_Info()
{
  $data = $this->input->post();

  $info['Division']     = $this->producto->Get_Divicion();
  $info['Marca']        = $this->producto->Get_Marca();
  $info['Linea']        = $this->producto->Get_Linea();
  $info['Sublinea']     = $this->producto->Get_Sublinea();
  $info['Proveedores']  = $this->producto->Get_Proveedores();

    print_r(json_encode($info));
}

public function Consultar_Info_Linea()
{
  $data = $this->input->post();

  $info['Division']     = $this->producto->Get_Divicion();
  $info['Linea']        = $this->producto->Get_Linea_By_ID($data['ID']);

  print_r(json_encode($info));
}

public function Consultar_Info_Sublinea()
{
  $data = $this->input->post();

  $info['Linea']        = $this->producto->Get_Linea();
  $info['Sublinea']     = $this->producto->Get_Sublinea_By_ID($data['ID']);

  print_r(json_encode($info));
}

public function Consultar_Info_Editar()
{
   $data = $this->input->post();

  $info['Division']     = $this->producto->Get_Divicion();
  $info['Marca']        = $this->producto->Get_Marca();
  $info['Linea']        = $this->producto->Get_Linea();
  $info['Sublinea']     = $this->producto->Get_Sublinea();
  $info['Proveedores']  = $this->producto->Get_Proveedores();
  $info['Catalogo']     = $this->producto->Get_Catalogo_By_ID($data['idCatalogo']);

  print_r(json_encode($info));
}

public function Agregar_Producto()
{
  $data = $this->input->post();

  $response    = $this->producto->Agregar_Producto($data);

  print_r($response);
}

public function Editar_Producto()
{
   $data = $this->input->post();

   $ID = $data['ID'];

   unset($data['ID']);

  $response    = $this->producto->Editar_Producto($data,$ID);

  print_r($response);
}

public function Eliminar_Producto()
{
  $data = $this->input->post();

  $idProducto    = $this->producto->Eliminar_Producto($data['idCatalogo']);

  if ($idProducto > 0)
  {
    print_r($idProducto);
  }
  else
  {
    print_r("error_Eliminar_Producto");
    exit();
  }
}

public function Agregar_Marca()
{
  $data = $this->input->post();

  $idMarca    = $this->producto->Agregar_Marca($data);

  if ($idMarca > 0)
  {
    print_r($idMarca);
  }
  else
  {
    print_r("error_Agregar_Marca");
    exit();
  }
}

public function Editar_Marca()
{
   $data = $this->input->post();

   $ID = $data['ID'];

   unset($data['ID']);

  $idMarca    = $this->producto->Editar_Marca($data['Marca'],$ID);

  if ($idMarca > 0)
  {
    print_r($idMarca);
  }
  elseif ($idMarca == 0)
  {
    print_r(99999);
  }
  else
  {
    print_r("error_Editar_Marca");
    exit();
  }
}

public function Eliminar_Marca()
{
  $data = $this->input->post();

  $idMarca    = $this->producto->Eliminar_Marca($data['ID']);

  if ($idMarca > 0)
  {
    print_r($idMarca);
  }
  elseif ($idMarca == 0)
  {
    print_r(99999);
  }
  else
  {
    print_r("error_Eliminar_Marca");
    exit();
  }
}

public function Agregar_Division()
{
   $data = $this->input->post();

  $idDivision    = $this->producto->Agregar_Division($data);

  if ($idDivision > 0)
  {
    print_r($idDivision);
  }
  else
  {
    print_r("error_Agregar_Division");
    exit();
  }
}

public function Editar_Division()
{
  $data = $this->input->post();

   $ID = $data['ID'];

   unset($data['ID']);

  $idDivision    = $this->producto->Editar_Division($data['Division'],$ID);

  if ($idDivision > 0)
  {
    print_r($idDivision);
  }
  elseif ($idDivision == 0)
  {
    print_r(99999);
  }
  else
  {
    print_r("error_Editar_Division");
    exit();
  }
}

public function Eliminar_Division()
{
  $data = $this->input->post();

  $idDivision    = $this->producto->Eliminar_Division($data['ID']);

  if ($idDivision > 0)
  {
    print_r($idDivision);
  }
  elseif ($idDivision == 0)
  {
    print_r(99999);
  }
  else
  {
    print_r("error_Eliminar_Division");
    exit();
  }
}

public function Agregar_Linea()
{
  $data = $this->input->post();

  $idLinea    = $this->producto->Agregar_Linea($data);

  if ($idLinea > 0)
  {
    print_r($idLinea);
  }
  else
  {
    print_r("error_Agregar_Linea");
    exit();
  }
}

public function Editar_Linea()
{
  $data = $this->input->post();

   $ID = $data['ID'];

   unset($data['ID']);

  $idLinea    = $this->producto->Editar_Linea($data,$ID);

  if ($idLinea > 0)
  {
    print_r($idLinea);
  }
  elseif ($idLinea == 0)
  {
    print_r(99999);
  }
  else
  {
    print_r("error_Editar_Linea");
    exit();
  }
}

public function Eliminar_Linea()
{
  $data = $this->input->post();

  $idLinea    = $this->producto->Eliminar_Linea($data['ID']);

  if ($idLinea > 0)
  {
    print_r($idLinea);
  }
  elseif ($idLinea == 0)
  {
    print_r(99999);
  }
  else
  {
    print_r("error_Eliminar_Linea");
    exit();
  }
}

public function Agregar_Sublinea()
{
  $data = $this->input->post();

  $idSublinea    = $this->producto->Agregar_Sublinea($data);

  if ($idSublinea > 0)
  {
    print_r($idSublinea);
  }
  else
  {
    print_r("error_Agregar_Sublinea");
    exit();
  }
}

public function Editar_Sublinea()
{
  $data = $this->input->post();

   $ID = $data['ID'];

   unset($data['ID']);

  $idSublinea    = $this->producto->Editar_Sublinea($data,$ID);

  if ($idSublinea > 0)
  {
    print_r($idSublinea);
  }
  elseif ($idSublinea == 0)
  {
    print_r(99999);
  }
  else
  {
    print_r("error_Editar_Sublinea");
    exit();
  }
}

public function Eliminar_Sublinea()
{
  $data = $this->input->post();

  $idSublinea    = $this->producto->Eliminar_Sublinea($data['ID']);

  if ($idSublinea > 0)
  {
    print_r($idSublinea);
  }
  elseif ($idSublinea == 0)
  {
    print_r(99999);
  }
  else
  {
    print_r("error_Eliminar_Sublinea");
    exit();
  }
}

}