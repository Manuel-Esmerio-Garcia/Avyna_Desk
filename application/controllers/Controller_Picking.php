<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Picking extends CI_Controller {


    public function __construct(){
        parent::__construct();
        if(!isset($_SESSION['Avyna'])) redirect('Controller_Login');
        $this->load->model('Picking_Model', 'picking');
        $this->load->model('Login_Model', 'login');
        $this->load->model('Bodega_Model', 'bodega');
    }

	public function index(){

        $Titulo  = array('PageTitle' => 'Picking');
        $Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                        'pass' =>  $_SESSION['Avyna'][0]['Password']);

        // Refrescar Permisos e información del usuario //
        $Session = $this->login->signIn($Usuario);

        if ($Session != null){  
        // Cargar Vista Inventario //
        $this->load->view('Componentes/Header', $Titulo);    
        $this->load->view('Operaciones/Picking');
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
    /***   Fecha: 05/02/2020    					                  ***/
    /***   Descripción: Obtener Información de la Empresa 		      ***/
    /********************************************************************/
    public function init(){
        $response = $this->bodega->getBodega();
		print_r(json_encode($response));
    }

    /********************************************************************/
    /***   Función: changeBranch() 	                	              ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 05/02/2020    					                  ***/
    /***   Descripción: Acción Obtener Extracciones By idSucursal     ***/
    /********************************************************************/
    public function changeBranch(){
        $info 	  = json_decode(file_get_contents("php://input"),true);
        $response = $this->picking->getExtracciones($info);
		print_r(json_encode($response));
    }

    /********************************************************************/
    /***   Función: changeOrder() 	                		          ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 05/02/2020    					                  ***/
    /***   Descripción: Acción Cambiar Extracción          		      ***/
    /********************************************************************/
    public function changeOrder(){
        $info 	  = json_decode(file_get_contents("php://input"),true);
        $response = $this->picking->changeOrder($info);
		print_r(json_encode($response));
    }

    /********************************************************************/
    /***   Función: realizarPicking() 	                	          ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 06/02/2020    					                  ***/
    /***   Descripción: Acción Realizar Picking          		      ***/
    /********************************************************************/
    public function realizarPicking(){
        $info 	  = json_decode(file_get_contents("php://input"),true);
        $response = $this->picking->realizarPicking($info);
		print_r(json_encode($response));
    }

    /********************************************************************/
    /***   Función: searchProducts() 	                	          ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 06/02/2020    					                  ***/
    /***   Descripción: Acción Buscar Productos         		      ***/
    /********************************************************************/
    public function searchProducts(){
        $info 	  = json_decode(file_get_contents("php://input"),true);
        $response = $this->picking->searchProducts($info);
		print_r(json_encode($response));
    }
    
    public function cerrarSesion(){
        session_destroy();
        redirect('Controller_Login');
    }

}