<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
class Controller_Cupones extends CI_Controller {	
	public function __construct(){
		parent::__construct();
		if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

		$this->load->model("Cupones_Model","cupones");
		$this->load->model('Login_Model', 'login');
		
		$Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],'pass' =>  $_SESSION['Avyna'][0]['Password']);

    	// Refrescar Permisos e información del usuario //
    	$Session = $this->login->signIn($Usuario);
    	if ($Session == null){$this->cerrarSesion($Usuario);}
	}

	// Obtener Empresa //
	public function index(){
		$Titulo = array('PageTitle' => 'Cupones');

		$Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],'pass' =>  $_SESSION['Avyna'][0]['Password']);

		// Refrescar Permisos e información del usuario //
		$Session = $this->login->signIn($Usuario);

		if ($Session != null){  
			// Cargar Vista Distribuidores //
			$this->load->view('Componentes/Header', $Titulo); 
			$this->load->view('Cupones/Cupones');
			$this->load->view('Componentes/Footer',$Titulo);
		}
		else{
			// Cerrar Sesión //
			$this->cerrarSesion();
		}
	}

	public function tableCupones(){
		$data = $this->input->post();
		$info = $this->cupones->tableCupones($data);
		print_r($info);
	}

	public function tableCuponesSalones(){
		$data = $this->input->post();
		$info = $this->cupones->tableCuponesSalones($data);
		print_r($info);
	}

	public function saveCoupon(){
		$data 	  = json_decode(file_get_contents("php://input"),true);
		$info = $this->cupones->saveCoupon($data);
		print_r($info);
	}

	public function updateCoupon(){
		$data 	  = json_decode(file_get_contents("php://input"),true);
		$info = $this->cupones->updateCoupon($data);
		print_r($info);
	}

	public function deleteCupon(){
		$data 	  = json_decode(file_get_contents("php://input"),true);
		$info = $this->cupones->deleteCupon($data);
		print_r($info);
	}

	public function getCuponUpdate(){
		$data = json_decode(file_get_contents("php://input"),true);
		$info = $this->cupones->getCuponUpdate($data);
		print_r(json_encode($info));
	}

	public function GenerarEnviar(){
		$data = json_decode(file_get_contents("php://input"),true);
		$info = $this->cupones->GenerarEnviar($data);
		print_r($info);
	}

	public function fetchGenerarCoupon(){
		$data = json_decode(file_get_contents("php://input"),true);
		$info = $this->cupones->fetchGenerarCoupon($data);
		print_r(json_encode($info));
	}

	public function getCupon(){
		$data 	  = json_decode(file_get_contents("php://input"),true);
		$info = $this->cupones->getCupon($data);
		print_r(json_encode($info));
	}

	public function getClienteMenudeo(){
		$data 	  = json_decode(file_get_contents("php://input"),true);
		$info = $this->cupones->getClienteMenudeo($data);
		print_r(json_encode($info));
	}

	public function initial(){
		$response = $this->cupones->initial();
		print_r(json_encode($response));
	}

	// Cerrar Sesión //
	public function cerrarSesion(){
	  session_destroy();
	  redirect('Controller_Login');
	}

}
