<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Promociones extends CI_Controller {


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
    $this->load->model('Promociones_Model', 'promo');
  }

  public function index()
  {
    $Titulo = array('PageTitle' => 'Promociones');

    $data['Division']  = $this->division->getDivision();
    $data['Linea']     = $this->linea->getLinea();
    $data['Sublinea']  = $this->sublinea->getSublinea();

    $Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      'pass' =>  $_SESSION['Avyna'][0]['Password']);

    // Refrescar Permisos e información del usuario //
    $Session = $this->login->signIn($Usuario);

    if ($Session != null){  
      // Cargar Vista Promociones //
      $this->load->view('Componentes/Header', $Titulo);    
      $this->load->view('Promociones/Promociones',$data);
      $this->load->view('Componentes/Footer');
    }
    else{
      // Cerrar Sesión //
      $this->cerrarSesion($Usuario);
    }
  }

  public function getinfoProductInventary(){
    $data = $this->input->post();
    $info = $this->promo->getinfoProductInventary();
    print_r(json_encode($info));
  }

  // Cargar DataTable fetchOfertas //
  public function fetchOfertas()
  {
    $data = $this->input->post();
    $info = $this->fetch->fetchOfertas($data);
    print_r($info);
  }

  // Cargar DataTable fetchPromociones //
  public function fetchPromociones()
  {
    $data = $this->input->post();
    $info = $this->fetch->fetchPromociones($data);
    print_r($info);
  }

  //Obtener Información Inventario //
  public function getInfoInventario()
  {
      $data = $this->input->post();
      $info = $this->promo->getInfoInventario($data);
      print_r(json_encode($info));
  }
  // Agregar Promoción Duplicate //
  public function addPromocionDuplicate()
  {
    $data = $this->input->post();
    $info = $this->promo->addPromocionDuplicate($data);
    print_r($info);
  }
  
  // Guardar Promoción //
  public function addPromocion()
  {
    $data = $this->input->post();
    $info = $this->promo->addPromocion($data);
    print_r($info);
  }

  // Obtener Detalle Promoción //
  public function getDetallePromociones()
  {
    $data = $this->input->post();
    $info = $this->promo->getDetallePromociones($data['ID']);
    print_r(json_encode($info));
  }

  // Obtener Información Editar Promoción //
  public function getInfoPromocionById()
  {
      $data = $this->input->post();
      $info['Detalle']  = $this->promo->getPromocionById($data['idPromocion']);
      $info['Producto'] = $this->promo->getProductosPromoById($data['idPromocion']);
      $info['Sucursal'] = $this->promo->getAsignacionPromoById($data['idPromocion']);
      $info['Cliente']  = $this->promo->getDistribuidoresPromoById($data['idPromocion']);
      print_r(json_encode($info));
  }

  // Acción Editar Promoción //
  public function UpdatePromocion()
  {
    $data = $this->input->post();
    $info = $this->promo->UpdatePromocion($data);
    print_r($info);
  }

  // Acción Eliminar Promoción //
  public function deletePromocion()
  {
    $data = $this->input->post();
    $info = $this->promo->deletePromocion($data);
    print_r($info);
  }

  // getDivision //
  public function getDivision()
  {
    $info = $this->division->getDivision();
    print_r(json_encode($info));
  }

  // getLinea //
  public function getLinea()
  {
    $info = $this->linea->getLinea();
    print_r(json_encode($info));
    $data['Sublinea']  = $this->sublinea->getSublinea();
  }

  // getSublinea //
  public function getSublinea()
  {
    $info = $this->sublinea->getSublinea();
    print_r(json_encode($info));
  }

  // Obtener Información Oferta //
  public function getInfoOfertas()
  {
    $data = $this->input->post();
    $info['Oferta'] = $this->promo->getProductosOferta($data['idOferta']);
    $info['Regalo'] = $this->promo->getRegalosOferta($data['idOferta']);
    print_r(json_encode($info));
  }

  // Guardar Oferta //
  public function AddOferta()
  {
    $data = $this->input->post();

    if ($data['Tipo'] == 'Descuento'){
      $info = $this->promo->AddOfertaDescuento($data);
    }
    else{
      $info = $this->promo->AddOfertaRegalo($data);
    }
    print_r($info);
  }

  // Obtener Detalle Oferta Editar //
  public function getDetalleOferta()
  {
    $data = $this->input->post();
    $info['Oferta']   = $this->promo->getOfertaById($data['idOferta']);
    $info['Producto'] = $this->promo->getProductosByIdOferta($data['idOferta']);
    $info['Sucursal'] = $this->promo->getAsignacionByIdOferta($data['idOferta']);
    $info['Cliente']  = $this->promo->getDistribuidoresByIdOferta($data['idOferta']);
    $info['Regalo']   = $this->promo->getRegalosByIdOferta($data['idOferta']);
    $info['Division'] = $this->promo->getDivisionByIdOferta($data['idOferta']);
    $info['Linea']    = $this->promo->getLineaByIdOferta($data['idOferta']);
    $info['Sublinea'] = $this->promo->getSublineaByIdOferta($data['idOferta']);
    print_r(json_encode($info));
  }

  // Editar Oferta //
  public function UpdateOferta()
  {
    $data = $this->input->post();
    $info = $this->promo->UpdateOferta($data);
    print_r($info);
  }

  // Eliminar Oferta //
  public function deleteOferta()
  {
    $data = $this->input->post();
    $info = $this->promo->deleteOferta($data);
    print_r($info);
  }

  // Cerrar Sesión //
  public function cerrarSesion(){
    session_destroy();
    redirect('Controller_Login');
  }

public function get_info_Inventario()
{
    $data = $this->input->post();

    $info['Inventario']  = $this->promo->get_info_Inventario($data);

    print_r(json_encode($info));
}

public function Get_Productos_by_id()
{
    $data = $this->input->post();

    $info['Detalle']  = $this->promo->Get_Productos_by_id($data['ID']);
    $info['Producto'] = $this->promo->Get_Promociones_Producto($data['ID']);
    $info['Sucursal'] = $this->promo->Get_Asignacion_promo($data['ID']);
    $info['Cliente']  = $this->promo->Get_Distribuidores_promociones($data['ID']);

    print_r(json_encode($info));
}

public function Get_Productos_Promociones()
{
    $data = $this->input->post();

    $info['Detalle'] = $this->promo->Get_Productos_Promociones($data['ID']);

    print_r(json_encode($info));
}

public function Get_Productos_Ofertas()
{
   $data = $this->input->post();

    $info['Oferta'] = $this->promo->Get_Productos_Ofertas($data['ID']);
    $info['Regalo'] = $this->promo->Get_Productos_Regalo($data['ID']);

    print_r(json_encode($info));
}

public function Get_Distribuidores()
{
    $info['Detalle'] = $this->promo->Get_Distribuidores();

    print_r(json_encode($info));
}

public function Get_Productos()
{
   $info['Detalle'] = $this->promo->Get_Productos();

    print_r(json_encode($info));
}

public function Get_Sucursales()
{
  $info['Detalle'] = $this->promo->Get_Sucursales();

    print_r(json_encode($info));
}

public function Get_Division()
{
  $info['Detalle'] = $this->promo->Get_Division();

    print_r(json_encode($info));
}

public function Get_Linea()
{
  $info['Detalle'] = $this->promo->Get_Linea();

    print_r(json_encode($info));
}

public function Get_Sublinea()
{
  $info['Detalle'] = $this->promo->Get_Sublinea();

    print_r(json_encode($info));
}

public function Eliminar_Promocion()
{
  $data = $this->input->post();

  $result = $this->promo->Eliminar_Promocion($data);

  if ($result == 1)
  {
    print_r("Correcto");
    exit();
  }
  else
  {
    print_r("Incorrecto");
    exit();
  }
}

public function Editar_Promocion()
{
  $data = $this->input->post();

  $result = $this->promo->Editar_Promocion($data);

  if ($result == 1)
  {
    print_r("Correcto");
    exit();
  }
  else
  {
    print_r("Incorrecto");
    exit();
  }
}

public function Guardar_Promocion()
{
  $data = $this->input->post();

  $result = $this->promo->Agregar_Promocion($data);

  if ($result == 1)
  {
    print_r("Correcto");
    exit();
  }
  else
  {
    print_r("Incorrecto");
    exit();
  }

}


public function Agregar_Oferta()
{
  $data = $this->input->post();

  if ($data['Tipo'] == 'Descuento')
  {
    $result = $this->promo->Agregar_Promocion_Desc($data);
  }
  else
  {
    $result = $this->promo->Agregar_Promocion_Regalo($data);
  }

  if ($result == 1)
  {
    print_r("Correcto");
    exit();
  }
  else
  {
    print_r("Incorrecto");
    exit();
  }
}

public function Eliminar_Oferta()
{
  $data = $this->input->post();

  $result = $this->promo->Eliminar_Oferta($data);
  
  if ($result == 1)
  {
    print_r("Correcto");
    exit();
  }
  else
  {
    print_r("Incorrecto");
    exit();
  }
}


public function Editar_Oferta()
{
  $data = $this->input->post();

  $result = $this->promo->Editar_Oferta($data);
  
  if ($result == 1)
  {
    print_r("Correcto");
    exit();
  }
  else
  {
    print_r("Incorrecto");
    exit();
  }
}

public function Get_All_Detalle_Oferta()
{
  $data = $this->input->post();

    $info['Oferta']   = $this->promo->Get_Oferta_by_id($data['ID']);
    $info['Producto'] = $this->promo->Get_Productos_Oferta($data['ID']);
    $info['Sucursal'] = $this->promo->Get_Asignacion_Oferta($data['ID']);
    $info['Cliente']  = $this->promo->Get_Distribuidores_Oferta($data['ID']);
    $info['Regalo']   = $this->promo->Get_Regalos($data['ID']);
    $info['Division'] = $this->promo->Get_Division_Oferta($data['ID']);
    $info['Linea']    = $this->promo->Get_Linea_Oferta($data['ID']);
    $info['Sublinea'] = $this->promo->Get_Sublinea_Oferta($data['ID']);

    print_r(json_encode($info));
}

}