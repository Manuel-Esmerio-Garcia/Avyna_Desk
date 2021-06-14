<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Usuario_Packing extends CI_Controller {


   public function __construct(){
    parent::__construct();

     if(!isset($_SESSION['Avyna'])) redirect('Controller_Login');

      $this->load->model('Usuario_Packing_Model', 'usuario');
      $this->load->model('Permisos_Model', 'permisos');
      $this->load->model('Login_Model', 'login');
      $this->load->model('Fetch_Model', 'fetch');
    	$this->load->helper('form');
    }

  public function index(){      
    $Titulo = array('PageTitle' => 'Usuarios Packing');

    $info['Rol']  = $this->permisos->getRoles();

    $Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      'pass' =>  $_SESSION['Avyna'][0]['Password']);

    // Refrescar Permisos e información del usuario //
    $Session = $this->login->signIn($Usuario);

    if ($Session != null){  
      // Cargar Vista Inventario //
      $this->load->view('Componentes/Header', $Titulo);    
      $this->load->view('Catalogo/Usuario_Packing',$info);
      $this->load->view('Componentes/Footer');
    }
    else{
      // Cerrar Sesión //
      $this->cerrarSesion($Usuario);
    }
  }

  /**************************************************************/
	/***   Función: init() 	                				            ***/
	/***   Autor: Manuel Esmerio Gacria					      	        ***/
	/***   Fecha: 26/02/2020    					                      ***/
	/***   Descripción: Obtener Información Usuarios Packing    ***/
	/**************************************************************/
    public function init(){
        $response = $this->usuario->init();
		print_r(json_encode($response));
    }
  /**********************************************************/
	/***   Función: create() 	                			        ***/
	/***   Autor: Manuel Esmerio Gacria					      	    ***/
	/***   Fecha: 26/02/2020    					                  ***/
	/***   Descripción: Create Usuario Packing              ***/
	/**********************************************************/
    public function create(){
      $info 	  = json_decode(file_get_contents("php://input"),true);
      $response = $this->usuario->create($info);
		  print_r($response);
    }

    public function getUsuarioByID(){
      $info 	  = json_decode(file_get_contents("php://input"),true);
      $response = $this->usuario->getUsuarioByID($info['id']);
		  print_r(json_encode($response));
    }

    public function update(){
      $info 	  = json_decode(file_get_contents("php://input"),true);
      $response = $this->usuario->update($info);
		  print_r($response);
    }

    public function delete(){
      $info 	  = json_decode(file_get_contents("php://input"),true);
      $response = $this->usuario->delete($info);
		  print_r($response);
    }

   // Cerrar Sesión //
	public function cerrarSesion(){
        session_destroy();
        redirect('Controller_Login');
    }
}

?>