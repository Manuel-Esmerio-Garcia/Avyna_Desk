<?php
defined('BASEPATH') OR exit('No direct script access allowed');

error_reporting(E_ERROR);

class Controller_Inventario extends CI_Controller {

  public function __construct() 
  {
      parent::__construct();

     if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

      $this->load->model('Inventario_Model', 'inventario');
      $this->load->model('Marca_Model', 'marca');
      $this->load->model('Division_Model', 'division');
      $this->load->model('Linea_Model', 'linea');
      $this->load->model('Sublinea_Model', 'sublinea');
      $this->load->model('Bodega_Model', 'bodega');
      $this->load->model('Login_Model', 'login');
      $this->load->model('Fetch_Model', 'fetch');
      $this->load->helper('form');
  }

  public function index()
  {
    $Titulo = array('PageTitle' => 'Inventario');

    $data['Marca']     = $this->marca->getMarca();
    $data['Division']  = $this->division->getDivision();
    $data['Linea']     = $this->linea->getLinea();
    $data['Sublinea']  = $this->sublinea->getSublinea();
    $data['Sucursal']  = $this->bodega->getBodega();

    $Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      'pass' =>  $_SESSION['Avyna'][0]['Password']);

    // Refrescar Permisos e información del usuario //
    $Session = $this->login->signIn($Usuario);

    if ($Session != null){  
      // Cargar Vista Inventario //
    $this->load->view('Componentes/Header', $Titulo);    
    $this->load->view('Manejo/Inventario/Inventario',$data);
    $this->load->view('Componentes/Footer');
    }
    else{
      // Cerrar Sesión //
      $this->cerrarSesion($Usuario);
    }
  }

  // Cargar DataTable Inventario General //
  public function fetchInventarioGeneral()
  {
    $data = $this->input->post();
    $info = $this->fetch->fetchInventarioGeneral($data);
    print_r($info);
  }

  // Cargar DataTable Inventario Bodega //
  public function fetchBodega()
  {
    $data = $this->input->post();
    $info = $this->fetch->fetchBodega($data);
    print_r($info);
  }

  // Cargar DataTable Inventario Locación //
  public function fetchLocacion()
  {
    $data = $this->input->post();
    $info = $this->fetch->fetchLocacion($data);
    print_r($info);
  }

  // Cargar DataTable Inventario Movimiento //
  public function fetchMovimiento()
  {
    $data = $this->input->post();
    $info = $this->fetch->fetchMovimiento($data);
    print_r($info);
  }

  // Función Crear CSV Inventario General //
  public function csvInventarioGeneral()
  {
    $data = $this->input->post();
    $info = $this->inventario->csvInventarioGeneral($data);

    // output headers so that the file is downloaded rather than displayed
    header('Content-type: text/csv');
    header('Content-Disposition: attachment; filename="Reporte Inventario General.csv"');
    header('Pragma: no-cache');
    header('Expires: 0');

    // create a file pointer connected to the output stream
    $file = fopen('php://output', 'w');
    // send the column headers
    fputcsv($file, array('ID', 'Codigo', 'Producto', 'Descripcion', 'Marca', 'Division', 'Linea', 'Sublinea', 'Min', 'Existencias','Existencias_apartados','Faltante'));

    for ($i=0; $i < count($info); $i++){ 
      fputcsv($file, $info[$i]);
    }
  }

  // Función Crear CSV Inventario Bodega //
  public function csvInventarioBodega()
  {
    $data = $this->input->post();
    $info = $this->inventario->csvInventarioBodega($data);

    // output headers so that the file is downloaded rather than displayed
    header('Content-type: text/csv');
    header('Content-Disposition: attachment; filename="Reporte Inventario Bodega.csv"');
    header('Pragma: no-cache');
    header('Expires: 0');

    // create a file pointer connected to the output stream
    $file = fopen('php://output', 'w');
    // send the column headers
    fputcsv($file, array('idInventario', 'Codigo', 'Producto', 'Descripcion', 'Marca', 'Division', 'Linea', 'Sublinea', 'Min', 'Existencias','Existencias_apartados','Existencias_disponibles','Faltante'));

    for ($i=0; $i < count($info); $i++){ 
      fputcsv($file, $info[$i]);
    }
  }

  // Modificar Detalle Inventario y Insertar Movimientos Inventario //
  public function UpdateInvDetalleBodega()
  {
    $data = $this->input->post();
    $info = $this->inventario->UpdateInvDetalleBodega($data);
    print_r($info);
  }

  // Modificar fecha locación Detalle Inventario //
  public function UpdateInvDetalleLocacion()
  {
    $data = $this->input->post();
    $info = $this->inventario->UpdateInvDetalleLocacion($data);
    print_r($info);
  }

  // Obtener Inventario Detalle Locación (By idLocacion)//
  public function getInventarioDetalleLocacion()
  {
    $data = $this->input->post();
    $info = $this->inventario->getInventarioDetalleLocacion($data['idLocacion']);
    print_r(json_encode($info));
  }

  // Obtener Locacion Inventario Detalle Bodega (By idSucursal) //
  public function getLocacionesInvDetalleBodega()
  {
    $datos = $this->input->post();
    $data  = $this->inventario->getLocacionesInvDetalleBodega($datos['ID']);
    print_r(json_encode($data));
  }

  // Mover Locación //
  public function moveLocacion()
  {
    $data = $this->input->post();
    $info = $this->inventario->moveLocacion($data);
    print_r($info);
  }

  // Obtener Locación (By idSucursal) //
  public function getLocacionMovimiento()
  {
    $data = $this->input->post();
    $info = $this->inventario->getLocacionMovimiento($data['idSucursal']);
    print_r(json_encode($info));
  }

  // Cerrar Sesión //
  public function cerrarSesion(){
    session_destroy();
    redirect('Controller_Login');
  }

///////////////////////////////
///// Funciónes Anteriores ////
///////////////////////////////


  public function GetLocacion()
  {
    $data = $this->input->post();
    $info['Locacion'] = $this->inventario->GetLocacion($data['idSucursal']);

      print_r(json_encode($info));
  }

public function Get_Inventario_Bodega_Detalle()
{
  $data = $this->input->post();
  $info['Detalle'] = $this->inventario->Get_Inventario_Bodega_Detalle($data['ID']);
  print_r(json_encode($info));
}

public function Consultar_Info()
{
  $data['Locacion'] = $this->inventario->GetLocacion();
  print_r(json_encode($data));
}

public function Mover_Locacion()
{
    $data = $this->input->post();

    $Existencias = $data['Existencias_old'];
    unset($data['Existencias_old']);

    $Result          = $this->inventario->Transpaso_Locacion($data,$Existencias);

    if ($Result > 0)
    {
      print_r($Result);
    }
    else
    {
      print_r("error_Mover");
      exit();
    }
}


  public function fetchMovimientoOperador(){
    $data = $this->input->post();
    $info = $this->inventario->fetchMovimientoOperador($data);
    print_r($info);
  }

  public function fetchMovimientoOperadorRealizados(){
    $data = $this->input->post();
    $info = $this->inventario->fetchMovimientoOperadorRealizados($data);
    print_r($info);
  }

  public function saveChangeMoveOperador(){
    $output = [];
    $data = $this->input->post();
    $info = $this->inventario->getInfoValidate($data['ID']);
    $getValidateOrigin = $this->inventario->getValidateOrigin($data['idLocacion_origen'], $info[0]['idCatalogo']);

    if (count($getValidateOrigin) > 0) {
			if (intval($getValidateOrigin[0]['ExistenciasTotal']) >= intval($data['Cantidad_mov']) ) {

        $movimiento = array('idLocacion_origen' => $data['idLocacion_origen'],
          'idLocacion_destino' => $data['idLocacion_destino'],
          'Cantidad_mov' => $data['Cantidad_mov'],
          'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $response = $this->inventario->saveMoveOperador($movimiento, $data['ID']);

        if ($response == 1) {
          $output = array('response' => 1,
						'code' => 200,
						'message' => "Movimientos modificado y a la espera.");	
        }else{
          $output = array('response' => 0,
						'code' => 502,
						'message' => "Ocurrió un error al guardar el movimiento.");	
        }
						
			}else{
				$output = array('response' => 2,
						'code' => 501,
						'message' => "No cuenta con suficiente inventario para surtir la cantidad ".intval($data['Cantidad_mov']).", ya que las existencias disponibles son: ".intval($getValidateOrigin[0]['ExistenciasTotal']).". \n
									 El producto sin existencias es: ".$info[0]['Producto']." con el N° ".$info[0]['idCatalogo'].".");
			}
		}else{
			$output = array('response' => 3,
						'code' => 500,
						'message' => "El producto: ".$info[0]['Producto']." , No cuenta con detalle inventario.");
		}

    print_r(json_encode($output));
  }

  public function deleteMoveOperador() {
    $data = $this->input->post();
    $info = $this->inventario->deleteMoveOperador($data['ID']);
    print_r($info);
  }

  public function deleteMoveOperadorRealizado() {
    $data = $this->input->post();
    $info = $this->inventario->deleteMoveOperadorRealizado($data['ID']);
    print_r($info);
  }

  public function getInfoOperadorById(){
    $data = $this->input->post();
    $info = $this->inventario->getInfoOperadorById($data['ID']);
    print_r(json_encode($info));
  }

}
