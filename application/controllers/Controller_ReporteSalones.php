<?php

/********************************************************************/
/***   Nombre Archivo: Controller_ReporteSalones.php              ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 10/01/2020         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_ReporteSalones extends CI_Controller {

    /********************************************************************/
    /***   Función: __construct() 	                	              ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 10/01/2020    					                  ***/
    /***   Descripción: Constructor de la clase              	      ***/
    /********************************************************************/
    public function __construct(){
        parent::__construct();
        if(!isset($_SESSION['Avyna'])) redirect('controller_Login');
        $this->load->model('Reportes/ModelreporteSalones', 'reporte');
    }
    /********************************************************************/
    /***   Función: index() 	                	                  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 10/01/2020    					                  ***/
    /***   Descripción: Metodo Cargar Vista                   	      ***/
    /********************************************************************/
    public function index(){
        $Titulo = array('PageTitle' => 'Reporte Ventas Salones');

        $this->load->view('Componentes/Header', $Titulo);    
        $this->load->view('Reporte/reporteSalones');
        $this->load->view('Componentes/Footer');
    }
    /********************************************************************/
	/***   Función: init() 	                				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/01/2020    					                  ***/
	/***   Descripción: Obtener Información de productos y promociones***/
	/********************************************************************/
    public function init(){
        $response = $this->reporte->init();
		print_r(json_encode($response));
    }
    /********************************************************************/
    /***   Función: btnGenerarReporte() 	                     	  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 21/11/2019    					                  ***/
    /***   Descripción: Generar Reporte                          	  ***/
    /********************************************************************/
    public function btnGenerarReporte(){
        $info 	  = json_decode(file_get_contents("php://input"),true);
        $response = $this->reporte->btnGenerarReporte($info);

		$delimiter = ",";
		$filename = "Reporte_Ventas_Salones.csv";
		//create a file pointer
		$f = fopen($_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/CSV/'.$filename, 'w+');
    
		//set column headers
		$fields = array('ID','Distribuidor','Nombre','Apellidos','Semana 1', 'Semana 2','Semana 3','Semana 4','Semana 5','Semana 6','Semana 7','Semana 8','Semana 9','Semana 10','Semana 11','Semana 12','Total');
        fputcsv($f, $fields, $delimiter);

		foreach ($response as $key => $value) {
            $Total = floatval($value['week1'] + $value['week2'] + $value['week3'] + $value['week4'] + $value['week5'] + $value['week6'] + $value['week7'] + $value['week8'] + $value['week9'] + $value['week10'] + $value['week11'] + $value['week12']);
            $lineData = array($value['ID'],$value['Distribuidor'],$value['Nombre'],$value['Apellidos'], $value['week1'], $value['week2'], $value['week3'], $value['week4'],$value['week5'], $value['week6'], $value['week7'], $value['week8'], $value['week9'],$value['week10'], $value['week11'], $value['week12'], $Total);
		    fputcsv($f, $lineData, $delimiter);
        }

		//set headers to download file rather than displayed
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename="' . $filename . '";');
		
		print_r(json_encode('http://'.$_SERVER['HTTP_HOST'].'/Avyna_Desk/CSV/'.$filename));
    }
    /********************************************************************/
    /***   Función: clickSelectedDealers() 	                          ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 21/11/2019    					                  ***/
    /***   Descripción: Buscar Clientes Menudeo                   	  ***/
    /********************************************************************/
    public function clickSelectedDealers(){
        $info 	  = json_decode(file_get_contents("php://input"),true);
        $response = $this->reporte->clickSelectedDealers($info);
		print_r(json_encode($response));
    }
}

?>