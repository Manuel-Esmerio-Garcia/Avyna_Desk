<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Permisos extends CI_Controller
{
    public function __construct() 
    {
        parent::__construct();
        if(!isset($_SESSION['Avyna'])) redirect('controller_Login');
        $this->load->model('Permisos_Model', 'permisos');
        $this->load->model('Login_Model', 'login');
        $this->load->model('Fetch_Model', 'fetch');
	}

	public function index()
	{
	   $Titulo = array('PageTitle' => 'Roles');

	   $Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      'pass' =>  $_SESSION['Avyna'][0]['Password']);

	    // Refrescar Permisos e información del usuario //
	    $Session = $this->login->signIn($Usuario);

	    if ($Session != null){  
	      	// Cargar Vista Roles //
		    $this->load->view('Componentes/Header', $Titulo);    
	    	$this->load->view('Configuracion/Roles');
	    	$this->load->view('Componentes/Footer');
	    }
	    else{
	      	// Cerrar Sesión //
	      	$this->cerrarSesion($Usuario);
	    }
	}

	// Cargar DataTable Roles //
	public function fetchRoles()
	{
		$data = $this->input->post();
	    $info = $this->fetch->fetchRoles($data);
	    print_r($info);
	}

	// Cargar DataTable Permisos //
	public function fetchPermisos()
	{
	    $info = $this->permisos->fetchPermisos();
	    print_r(json_encode($info));
	}

	// Cargar DataTable Permisos Editar (By idRol) //
	public function fetchPermisosEditar()
	{
		$data = $this->input->post();
	    $info['allPermisos'] = $this->permisos->fetchPermisos();
	    $info['Permisos']    = $this->permisos->fetchPermisosRol($data['idRol']);
	    $info['Count']		 = $this->permisos->countPermisos();
	    print_r(json_encode($info));
	}

	// Cargar DataTable Permisos Rol (By idRol) //
	public function fetchPermisosRol()
	{
		$data = $this->input->post();
		$info['Permisos']    = $this->permisos->fetchPermisosRol($data['idRol']);
		print_r(json_encode($info));
	}

	// Función Agregar Rol //
	public function updateRol()
	{
		$data = $this->input->post();
	    $info = $this->permisos->updateRol($data);	    
	    print_r($info);
	}

	// Función Agregar Rol //
	public function addRol()
	{
		$data = $this->input->post();
	    $info = $this->permisos->addRol($data);
	    print_r($info);
	}

	// Función Eliminar Rol //
	public function deleteRol()
	{
		$data = $this->input->post();
	    $info = $this->permisos->deleteRol($data['idRol']);
	    print_r($info);
	}

	// Cerrar Sesión //
	public function cerrarSesion(){
	    session_destroy();
	    redirect('Controller_Login');
	}
}
