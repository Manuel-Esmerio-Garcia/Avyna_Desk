<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Login extends CI_Controller {

	public function __construct() 
    {
        parent::__construct();
        // Inicializa el modelo.
        $this->load->model('Login_Model', 'login');
    }
    
	public function index()
	{
		 // Si el usuario ya inicio sesion. muestra la bienvenida (home).
        if (isset($_SESSION['Avyna'])) redirect('Controller_index');
        // Muestra el formulario para logearse.
    	$this->load->view('Login/Login');
	}

	// Funtion Validar Credenciales 
	public function signIn()
	{
		$datos 	= $this->input->post();
		
		if ($datos != null && $datos != "")
		{
			$data = $this->login->signIn($datos);
			
			if ($data != null && $data != "")
			{
				if ($data[0]['Status'] == 'Activo')
				{
					print_r(1);
				}
				else
				{
					print_r(4);
					session_destroy();
				}
			}
			else
			{
				print_r(2);
				session_destroy();
			}
		}
		else
		{
			print_r(3);
			session_destroy();
		} 
	}

	public function cerrarSesion(){
		session_destroy();
		redirect('Controller_Login');
	}
}
