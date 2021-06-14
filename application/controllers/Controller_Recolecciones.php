<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Recolecciones extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		if(!isset($_SESSION['Avyna'])) redirect('controller_Login');
		$this->load->model("Recolecciones_Model","recoleccion");;
		$this->load->model("Login_Model","login");
		$this->load->model("Fetch_Model","fetch");
	}

	public function index()
	{
		$Titulo = array('PageTitle' => 'Recolecciones');

		$Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      	 'pass' 	=>  $_SESSION['Avyna'][0]['Password']);

	    // Refrescar Permisos e información del usuario //
	    $Session = $this->login->signIn($Usuario);

	    if ($Session != null){  
	      	// Cargar Vista Inventario //
	    	$this->load->view('Componentes/Header', $Titulo); 
			$this->load->view('Operaciones/Recolecciones');
			$this->load->view('Componentes/Footer');
	    }
	    else{
	      	// Cerrar Sesión //
	      	$this->cerrarSesion($Usuario);
	    }
	}

	// Cargar DataTable fetchRecoleccion //
	public function fetchRecoleccion()
	{
		$data = $this->input->post();
		$info = $this->fetch->fetchRecoleccion($data);
	    print_r($info);
	}

	// Cargar DataTable fetchRecoleccionPendientes //
	public function fetchRecoleccionPendientes()
	{
		$data = $this->input->post();
		$info = $this->fetch->fetchRecoleccionPendientes($data);
	    print_r($info);
	}

	// Cargar DataTable fetchListGuia //
	public function fetchListGuia()
	{
		$data = $this->input->post();
		$info = $this->fetch->fetchListGuia($data);
	    print_r($info);
	}

	// Cargar DataTable fetchDetalleRecoleccion //
	public function fetchDetalleRecoleccion()
	{
		$data = $this->input->post();
		$info = $this->fetch->fetchDetalleRecoleccion($data);
	    print_r($info);
	}

	// Acción Agregar Recolección //
	public function AddRecoleccion()
	{
		$data = $this->input->post();
		$info = $this->recoleccion->AddRecoleccion($data);
	    print_r($info);
	}

	// Acción Editar Recolección //
	public function btnEditarRecoleccion()
	{
		$data = $this->input->post();
		$info = $this->recoleccion->btnEditarRecoleccion($data);
	    print_r($info);
	}

	// Acción Eliminar Recolección //
	public function deleteRecoleccion()
	{
		$data = $this->input->post();
		$info = $this->recoleccion->deleteRecoleccion($data);
	    print_r($info);
	}

	// Acción Agregar CajaGuia //
	public function AddCajaGuia()
	{
		$data = $this->input->post();
		$info = $this->recoleccion->AddCajaGuia($data);
	    print_r($info);
	}

	// Acción Eliminar Detalle Recolección //
	public function DeleteDetalleRecoleccion()
	{
		$data = $this->input->post();
		$info = $this->recoleccion->DeleteDetalleRecoleccion($data);
	    print_r($info);
	}

	// Cerrar Sesión //
	public function cerrarSesion(){
	    session_destroy();
	    redirect('Controller_Login');
	}
}