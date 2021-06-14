<?php
defined('BASEPATH') OR exit('No direct script access allowed');

error_reporting(E_ERROR);

class Controller_InventarioInterno extends CI_Controller {

    public function __construct(){
        parent::__construct();

        if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

        $this->load->model('InventarioInterno_Model', 'inventario');
        $this->load->model('Login_Model', 'login');
        $this->load->model('Fetch_Model', 'fetch');
    }

    public function index(){
        $Titulo = array('PageTitle' => 'Inventario Interno');

        $Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      'pass' =>  $_SESSION['Avyna'][0]['Password']);

        // Refrescar Permisos e información del usuario //
        $Session = $this->login->signIn($Usuario);

        if ($Session != null){  
            // Cargar Vista Inventario //
            $this->load->view('Componentes/Header', $Titulo);    
            $this->load->view('Manejo/Inventario/InventarioInterno');
            $this->load->view('Componentes/Footer');
        }
        else{
            // Cerrar Sesión //
            $this->cerrarSesion($Usuario);
        }
    }

    /********************************************************************/
	/***   Función: init() 	                				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Obtener Información Sucursales                ***/
	/********************************************************************/
    public function init(){
        $response = $this->inventario->init();
		print_r(json_encode($response));
    }
    /********************************************************************/
	/***   Función: fetchInventary() 	             		          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Cargar DataTable                              ***/
    /********************************************************************/   
    public function fetchInventary(){
        $data = $this->input->post();
		$info = $this->inventario->fetchInventary($data);
		print_r($info);
    }
    /********************************************************************/
	/***   Función: searching() 	             		              ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Cargar DataTable                              ***/
    /********************************************************************/ 
    public function searching(){
        $data 	  = json_decode(file_get_contents("php://input"),true);
		$info = $this->inventario->searching($data);
		print_r(json_encode($info));
    }
    /********************************************************************/
	/***   Función: addInventary() 	             		              ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Cargar DataTable                              ***/
    /********************************************************************/ 
    public function addInventary(){
        $data 	  = json_decode(file_get_contents("php://input"),true);
		$info = $this->inventario->addInventary($data);
		print_r(json_encode($info));
    }
    /********************************************************************/
	/***   Función: updateInventary() 	             		          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Cargar DataTable                              ***/
    /********************************************************************/ 
    public function updateInventary(){
        $data 	  = json_decode(file_get_contents("php://input"),true);
		$info = $this->inventario->updateInventary($data);
		print_r(json_encode($info));
    }
    /********************************************************************/
	/***   Función: deleteInventary() 	             		          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Cargar DataTable                              ***/
    /********************************************************************/ 
    public function deleteInventary(){
        $data 	  = json_decode(file_get_contents("php://input"),true);
		$info = $this->inventario->deleteInventary($data);
		print_r(json_encode($info));
    }
    /********************************************************************/
	/***   Función: addDetailsInventary() 	                          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Cargar DataTable                              ***/
    /********************************************************************/
    public function addDetailsInventary(){
        $data 	  = json_decode(file_get_contents("php://input"),true);
		$info = $this->inventario->addDetailsInventary($data);
		print_r(json_encode($info));
    }
    /********************************************************************/
	/***   Función: updateDetailsInventary() 	                      ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Cargar DataTable                              ***/
    /********************************************************************/
    public function updateDetailsInventary(){
        $data 	  = json_decode(file_get_contents("php://input"),true);
		$info = $this->inventario->updateDetailsInventary($data);
		print_r($info);
    }
    /********************************************************************/
	/***   Función: deleteDetailsInventary() 	                      ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Cargar DataTable                              ***/
    /********************************************************************/
    public function deleteDetailsInventary(){
        $data 	  = json_decode(file_get_contents("php://input"),true);
		$info = $this->inventario->deleteDetailsInventary($data);
		print_r($info);
    }
    /********************************************************************/
	/***   Función: btnExtraer() 	                                  ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Extraer Inventario Interno                    ***/
    /********************************************************************/
    public function btnExtraer(){
        $data 	  = json_decode(file_get_contents("php://input"),true);
		$info = $this->inventario->btnExtraer($data);
		print_r($info);
    }
    

    public function getInfoUpdateInventary()
    {
        $data 	  = json_decode(file_get_contents("php://input"),true);
		$info = $this->inventario->getInfoUpdateInventary($data);
		print_r(json_encode($info));
    }

}