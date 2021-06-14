<?php defined('BASEPATH') OR exit('No direct script access allowed');
/*ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR); */

class Controller_Compras extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

		$this->load->model("Compras_Model","compras");
		$this->load->model('Bodega_Model', 'bodega'); 
		$this->load->model('Login_Model', 'login');
		$this->load->model('Fetch_Model', 'fetch');
		$this->load->model('Producto_Model','producto');
		$this->load->model('Proveedores_Model','proveedor');
	}

	public function index()
	{
		$Titulo = array('PageTitle' => 'Compras');
		$data['Proveedor'] = $this->compras->getProveedor();
		$data['Bodega']    = $this->bodega->getBodega();

		$Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      'pass' =>  $_SESSION['Avyna'][0]['Password']);

	    // Refrescar Permisos e información del usuario //
	    $Session = $this->login->signIn($Usuario);

	    if ($Session != null){  
	      	// Cargar Vista Inventario //
		    $this->load->view('Componentes/Header', $Titulo); 
			$this->load->view('Manejo/Compras/Compras', $data);
			$this->load->view('Componentes/Footer');
	    }
	    else{
	      	// Cerrar Sesión //
	      	$this->cerrarSesion($Usuario);
	    }	
	}

	// Cargar DataTable Ordenes de Compra //
	public function fetchOrdenCompra()
	{
		$data = $this->input->post();
	    $info = $this->fetch->fetchOrdenCompra($data);
	    print_r($info);
	}

	// Cargar DataTable Nueva Compra //
	public function fetchNuevaCompra()
	{
		$data = $this->input->post();
	    $info = $this->producto->getProductos();
	    print_r(json_encode($info));
	}

	// Cargar DataTable Compras //
	public function fetchCompras()
	{
		$data = $this->input->post();
	    $info = $this->fetch->fetchCompras($data);
	    print_r($info);
	}

	// fetchAnticipos //
	public function fetchAnticipos()
	{
		$data = $this->input->post();
	    $info = $this->fetch->fetchAnticipos($data);
	    print_r($info);
	}

	// fetchFacturasCompras //
	public function fetchFacturasCompras()
	{
		$data = $this->input->post();
	    $info = $this->fetch->fetchFacturasCompras($data);
	    print_r($info);
	}

	// Obtener Facturas Temp By id Anticipo //
	public function getFacturasAnticipoByidAnticipo()
	{
		$data = $this->input->post();
	    $info = $this->compras->getFacturasAnticipoByidAnticipo($data['id']);
	    print_r(json_encode($info));
	}

	// get Susucrsal By ID //
	public function getBodegaById()
	{
		$data = $this->input->post();
	    $info = $this->bodega->getBodegaById();
	    print_r(json_encode($info));
	}

	// Agregar Compra //
	public function addCompra()
	{
		$data = $this->input->post();
		$info = $this->compras->addCompra($data);
		print_r($info);
	}

	// Obtener Detalle Compra //
	public function getDetalleCompra()
	{
		$data = $this->input->post();
	    $info = $this->compras->getDetalleCompra($data['idCompra']);
	    print_r(json_encode($info));
	}

	// Acción Eliminar Compra //
	public function deleteCompra()
	{
		$data = $this->input->post();
		$info = $this->compras->deleteCompra($data['idCompra']);
		print_r($info);
	}

	// Acción Agregar Inventario //
	public function addInventario()
	{
		$data = $this->input->post();
		$info = $this->compras->addInventario($data);
		print_r($info);
	}

	// Acción Guardar OC //
	public function addOC()
	{
		$data = $this->input->post();
		$info = $this->compras->addOC($data);
		print_r($info);
	}

	

	// Acción Editar OC //
	public function UpdateOCStatus()
	{
		$data = $this->input->post();
		$info = $this->compras->UpdateOCStatus($data);
		print_r($info);
	}

	// Acción Editar OC //
	public function UpdateOC()
	{
		$data = $this->input->post();
		$info = $this->compras->UpdateOC($data);
		print_r($info);
	}

	// Acción Eliminar OC //
	public function DeleteOC()
	{
		$data = $this->input->post();
		$info = $this->compras->DeleteOC($data['idOC']);
		print_r($info);
	}

	// Acción Generar Compra //
	public function generarCompraParcial(){
		$data = $this->input->post();
		$info = $this->compras->generarCompraParcial($data);
		print_r($info);
	}

	// Acción Generar Compra //
	public function generarCompra()
	{
		$data = $this->input->post();
		$info = $this->compras->generarCompra($data['idOC']);
		print_r($info);
	}

	// Obtener Info Anticipos //
	public function getInfoAnticipos()
	{
		$data = $this->input->post();
		$info['Orden'] 	  = $this->compras->getOrdenCompraByIdAnticipo($data['idOC']);
		$info['Anticipo'] = $this->compras->getAnticiposByIdOC($data['idOC']);
		print_r(json_encode($info));
	}

	// Obtener Info Facturas Compra //
	public function getInfoCompraById()
	{
		$data = $this->input->post();
		$info['Compra'] 	  = $this->compras->getInfoCompraById($data['ID']);
		print_r(json_encode($info));
	}

	// Agregar Anticipo //
	public function generarAnticipo()
	{
		$data = $this->input->post();
		$info = $this->compras->generarAnticipo($data);
		print_r($info);
	}

	// Modificar Anticipo //
	public function UpdateAnticipo()
	{
		$data = $this->input->post();
		$info = $this->compras->UpdateAnticipo($data);
		print_r($info);
	}

	 /// Acción Cancelar Anticipo ///
	public function deleteAnticipo()
	{
		$data 	  = $this->input->post();
		$validate = $this->compras->getInfoFacturasAnticipos($data);
		
		if ($validate <= 0) {
			$info 	  = $this->compras->deleteAnticipo($data);
			print_r($info);
		}
		else{
			print_r(2);
		}		
	}

	// Obtener Detalle Orden de Compra //
	public function getDetalleOrdenCompra(){
		$data = $this->input->post();
		$info = $this->compras->getDetalleOrdenCompra($data['idOC']);
		print_r(json_encode($info));
	}

	// Obtener Detalle Orden de Compra //
	public function getDetalleOrdenCompraRestante(){
		$data = $this->input->post();
		$info = $this->compras->getDetalleOrdenCompraRestante($data['idOC']);
		print_r(json_encode($info));
	}

	// Obtener Info Editar OC //
	public function getEditarDetalleOrdenCompra()
	{
		$data = $this->input->post();
		$info['Detalle'] = $this->compras->getEditarDetalleOrdenCompra($data['idOC']);
		$info['Info']    = $this->compras->getOrdenCompraById($data['idOC']);
		print_r(json_encode($info));
	}

	// Cerrar Sesión //
	public function cerrarSesion(){
	    session_destroy();
	    redirect('Controller_Login');
	}



	//////////////////////////
	//// Funciones Viejas ////
	//////////////////////////

	public function Get_Detalle_Compra()
	{
		$data = $this->input->post();

	    $info['Detalle'] = $this->compras->Get_Detalle_Compra($data['ID']);

	    print_r(json_encode($info));
	}

	public function Get_Catalogo()
	{
		$data = $this->input->post();
	    $Cata['Catalogo'] = $this->compras->Get_Catalogo();
	    print_r(json_encode($Cata));
	}

	public function Get_Bodega()
	{
		$data = $this->input->post();
		$info['Bodega'] = $this->compras->Get_Bodega($data['idBodega']);

	    print_r(json_encode($info));
	}

	public function Add_Compra()
	{
		$data = $this->input->post();

		$result = $this->compras->Add_Compra($data);

		print_r($result);
		exit();
	}

	public function Delete_Compra()
	{
		$data = $this->input->post();

		$Result = $this->compras->Delete_Compra($data['ID']);

		if ($Result == 1)
		{
			print_r("Correcto");
			exit();
		}
		else
		{
			print_r("Error");
			exit();
		}
	}

	public function Agregar_Inventario()
	{
		$data = $this->input->post();

		$Result = $this->compras->Agregar_Detalle($data);

		print_r($Result);
	}

}
