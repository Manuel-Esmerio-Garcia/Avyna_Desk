<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Proveedores extends CI_Controller {


   public function __construct() 
   {
      parent::__construct();
    if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

    $this->load->model('Moneda_Model', 'moneda');
    $this->load->model('Login_Model', 'login');
    $this->load->model('Fetch_Model', 'fetch');
    $this->load->model('Proveedores_Model', 'provee');
  }

  public function index()
  {
    $Titulo = array('PageTitle' => 'Proveedores');

    $Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      'pass' =>  $_SESSION['Avyna'][0]['Password']);

    $data['Moneda'] = $this->moneda->getMonedas();

    // Refrescar Permisos e información del usuario //
    $Session = $this->login->signIn($Usuario);

    if ($Session != null){  
      // Cargar Vista Proveedores //
      $this->load->view('Componentes/Header', $Titulo);    
      $this->load->view('Catalogo/Proveedores',$data);
      $this->load->view('Componentes/Footer');
    }
    else{
      // Cerrar Sesión //
      $this->cerrarSesion($Usuario);
    }
  }

  // Cargar DataTable fetchProveedores //
  public function fetchProveedores()
  {
    $data = $this->input->post();
    $info = $this->fetch->fetchProveedores($data);
    print_r($info);
  }

  // Acción Agregar Proveedor //
  public function AddProveedor()
  {
    $data = $this->input->post();

		$Proveedor = array('Nombre' =>  $data['Nombre'],
							'Apellidos' =>  $data['Apellidos'],
							'Empresa' =>  $data['Empresa'],
							'Cargo' =>  $data['Cargo'],
							'Calle_numero' =>  $data['Calle_numero'],
							'Colonia' =>  $data['Colonia'],
							'Ciudad' =>  $data['Ciudad'],
							'Municipio' =>  $data['Municipio'],
							'Estado' =>  $data['Estado'],
							'Pais' =>  $data['Pais'],
							'CP' =>  $data['CP'],
							'RFC' =>  $data['RFC'],
							'Tel1' =>  $data['Tel1'],
							'Tel2' =>  $data['Tel2'],
							'Email' => $data['Email'],
							'Moneda' =>  $data['Moneda'],
              'Status' =>  $data['Status']);

		$info = $this->provee->AddProveedor($Proveedor);
		print_r($info);		 
  }

  // Acción Editar Proveedor //
  public function UpdateProveedor()
  {
    $data = $this->input->post();

		$Proveedor = array('Nombre' =>  $data['Nombre'],
							'Apellidos' =>  $data['Apellidos'],
							'Empresa' =>  $data['Empresa'],
							'Cargo' =>  $data['Cargo'],
							'Calle_numero' =>  $data['Calle_numero'],
							'Colonia' =>  $data['Colonia'],
							'Ciudad' =>  $data['Ciudad'],
							'Municipio' =>  $data['Municipio'],
							'Estado' =>  $data['Estado'],
							'Pais' =>  $data['Pais'],
							'CP' =>  $data['CP'],
							'RFC' =>  $data['RFC'],
							'Tel1' =>  $data['Tel1'],
							'Tel2' =>  $data['Tel2'],
							'Email' => $data['Email'],
							'Moneda' =>  $data['Moneda'],
              'Status' =>  $data['Status']);

		$info = $this->provee->UpdateProveedor($Proveedor,$data['ID']);
		print_r($info);
  }

  // Acción Eliminar Proveedor //
  public function DeleteProveedor()
  {
    $data = $this->input->post();
		$info = $this->provee->DeleteProveedor($data['ID']);
		print_r($info);
  }

  // Cerrar Sesión //
  public function cerrarSesion(){
    session_destroy();
    redirect('Controller_Login');
  }
}
