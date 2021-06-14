<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
class Controller_Empresa extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

		$this->load->model("Empresa_Model","empresa");
    	$this->load->model('Login_Model', 'login');

		$Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      'pass' =>  $_SESSION['Avyna'][0]['Password']);

    	// Refrescar Permisos e información del usuario //
    	$Session = $this->login->signIn($Usuario);
    	if ($Session == null){$this->cerrarSesion($Usuario);}
    	
	}

	// Obtener Empresa //
	public function getEmpresa()
	{
		$info = $this->empresa->getEmpresa($_SESSION['Avyna'][0]['Empresa']);
		print_r(json_encode($info));
	}

	// Cerrar Sesión //
	public function cerrarSesion(){
	  session_destroy();
	  redirect('Controller_Login');
	}

}
