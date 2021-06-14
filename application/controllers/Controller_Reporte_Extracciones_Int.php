<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

class Controller_Reporte_Extracciones_Int extends CI_Controller 
{
	public function __construct()
	{
		parent::__construct();
        
        if(!isset($_SESSION['Avyna'])){
        	redirect('Controller_Login');
        }
		$this->load->model('Reportes/ModelreporteExtraccionesInt', 'report');
	}

	public function index(){
		$Titulo = array('PageTitle' => 'Reporte Extracciones Interno');
	    $this->load->view('Componentes/Header', $Titulo); 
		$this->load->view('Reporte/Reporte_Extracciones_Int',$Reportes);
		$this->load->view('Componentes/Footer');	
    }

    /********************************************************************/
	/***   Función: init() 	                				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 25/02/2020    					                  ***/
	/***   Descripción: Obtener Información de Sucursales             ***/
	/********************************************************************/
    public function init(){
        $response = $this->report->init();
		print_r(json_encode($response));
    }

    public function getExtracciones(){
        $info 	  = json_decode(file_get_contents("php://input"),true);
        $response = $this->report->getExtracciones($info);
        print_r(json_encode($response));
    }
}

?>