
<?php

/********************************************************************/
/***   Nombre Archivo: Controller_reporteVS.php                   ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 25/05/2020         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Reporte_Extracciones_Mes extends CI_Controller {

    /********************************************************************/
    /***   Función: __construct() 	                	              ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 25/05/2020    					                  ***/
    /***   Descripción: Constructor de la clase              	      ***/
    /********************************************************************/
    public function __construct(){
        parent::__construct();
        if(!isset($_SESSION['Avyna'])) redirect('Controller_Login');
        $this->load->model('Reportes/ModelreporteExtraccionesMes', 'reporte');
    }
    /********************************************************************/
    /***   Función: index() 	                	                  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 25/05/2020    					                  ***/
    /***   Descripción: Metodo Cargar Vista                   	      ***/
    /********************************************************************/
    public function index(){
        $Titulo = array('PageTitle' => 'Reporte Extracciones Productos por Mes');

        $this->load->view('Componentes/Header', $Titulo);    
        $this->load->view('Reporte/reporteExtraccionesMes');
        $this->load->view('Componentes/Footer',$Titulo);
    }

    public function init(){
        $response = $this->reporte->init();
		print_r(json_encode($response));
    }

    /********************************************************************/
    /***   Función: tableVPF() 	                	                  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 15/01/2020    					                  ***/
    /***   Descripción: Metodo Cargar DataTable VPF          	      ***/
    /********************************************************************/
    public function tableExtracciones(){
        $data = $this->input->post();
		$info = $this->reporte->tableExtracciones($data);
		print_r($info);
    }

    public function exportReport(){
        $response = $this->reporte->exportReport();

		$delimiter = ",";
		$filename = "Reporte_Extracciones_x_Mes.csv";
		//create a file pointer
		$f = fopen($_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/CSV/'.$filename, 'w+');
    
		//set column headers
		$fields = array('Producto', 'MES_VENTA','CANTIDAD_VENTA');
        fputcsv($f, $fields, $delimiter);
         
		foreach ($response as $key => $value) {
			$lineData = array($value['Producto'],$value['MES_VENTA'],$value['CANTIDAD_VENTA']);
			fputcsv($f, $lineData, $delimiter);
		}
		//set headers to download file rather than displayed
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename="' . $filename . '";');
		
		print_r(json_encode('http://'.$_SERVER['HTTP_HOST'].'/Avyna_Desk/CSV/'.$filename));
    }
}

?>
