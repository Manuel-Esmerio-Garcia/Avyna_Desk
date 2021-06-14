<?php

/********************************************************************/
/***   Nombre Archivo: Controller_ReportexVentas.php              ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 23/01/2020         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_ReportexVentas extends CI_Controller {

    /********************************************************************/
    /***   Función: __construct() 	                	              ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 23/01/2020    					                  ***/
    /***   Descripción: Constructor de la clase              	      ***/
    /********************************************************************/
    public function __construct(){
        parent::__construct();
        if(!isset($_SESSION['Avyna'])) redirect('controller_Login');
        $this->load->model('Reportes/ModelreportexSalones', 'reporte');
    }
    /********************************************************************/
    /***   Función: index() 	                	                  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 23/01/2020    					                  ***/
    /***   Descripción: Metodo Cargar Vista                   	      ***/
    /********************************************************************/
    public function index(){
        $Titulo = array('PageTitle' => 'Reporte Ventas x Salones');

        $this->load->view('Componentes/Header', $Titulo);    
        $this->load->view('Reporte/reporteXSalones');
        $this->load->view('Componentes/Footer');
    }

    /********************************************************************/
	/***   Función: init() 	                				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 15/01/2020    					                  ***/
	/***   Descripción: Obtener Información de productos y promociones***/
	/********************************************************************/
    public function init(){
        $response = $this->reporte->init();
		print_r(json_encode($response));
    }

    /********************************************************************/
    /***   Función: fetchVentasXSalones() 	                          ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 23/01/2020    					                  ***/
    /***   Descripción: Metodo Cargar DataTable Ventas x salones      ***/
    /********************************************************************/
    public function fetchVentasXSalones(){
        $data = $this->input->post();
		$info = $this->reporte->fetchVentasXSalones($data);
		print_r($info);
    }
    /********************************************************************/
    /***   Función: exportReport() 	                             	  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 23/01/2020    					                  ***/
    /***   Descripción: Generar Reporte                          	  ***/
    /********************************************************************/
    public function exportReport(){
        $info 	  = json_decode(file_get_contents("php://input"),true);
        $response = $this->reporte->exportReport($info);

		$delimiter = ",";
		$filename = "Reporte_Ventas_x_Salones.csv";
		//create a file pointer
		$f = fopen($_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/CSV/'.$filename, 'w+');
    
		//set column headers
		$fields = array('ID', ' Nombre','Apellidos', 'Nivel', 'Distribuidores','Total Periodo');
        fputcsv($f, $fields, $delimiter);
         
		foreach ($response as $key => $value) {
			$lineData = array($value['ID'],utf8_decode($value['Nombre']),utf8_decode($value['Apellidos']),utf8_decode($value['Nivel']),utf8_decode($value['Distribuidores']), floatval($value['TotalPeriodo']));
			fputcsv($f, $lineData, $delimiter);
		}
		//set headers to download file rather than displayed
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename="' . $filename . '";');
		
		print_r(json_encode('http://'.$_SERVER['HTTP_HOST'].'/Avyna_Desk/CSV/'.$filename));
    }

}


?>