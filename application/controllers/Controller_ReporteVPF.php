<?php

/********************************************************************/
/***   Nombre Archivo: Controller_ReporteVPF.php                  ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 15/01/2020         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_ReporteVPF extends CI_Controller {

    /********************************************************************/
    /***   Función: __construct() 	                	              ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 15/01/2020    					                  ***/
    /***   Descripción: Constructor de la clase              	      ***/
    /********************************************************************/
    public function __construct(){
        parent::__construct();
        if(!isset($_SESSION['Avyna'])) redirect('controller_Login');
        $this->load->model('Reportes/ModelreporteVPF', 'vpf');
    }
    /********************************************************************/
    /***   Función: index() 	                	                  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 15/01/2020    					                  ***/
    /***   Descripción: Metodo Cargar Vista                   	      ***/
    /********************************************************************/
    public function index(){
        $Titulo = array('PageTitle' => 'Reporte VPF (Ventas, Pagos, Facturas)');

        $this->load->view('Componentes/Header', $Titulo);    
        $this->load->view('Reporte/reporteVPF');
        $this->load->view('Componentes/Footer');
    }
    /********************************************************************/
	/***   Función: init() 	                				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 15/01/2020    					                  ***/
	/***   Descripción: Obtener Información de productos y promociones***/
	/********************************************************************/
    public function init(){
        $response = $this->vpf->init();
		print_r(json_encode($response));
    }
    /********************************************************************/
    /***   Función: tableVPF() 	                	                  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 15/01/2020    					                  ***/
    /***   Descripción: Metodo Cargar DataTable VPF          	      ***/
    /********************************************************************/
    public function tableVPF(){
        $data = $this->input->post();
		$info = $this->vpf->tableVPF($data);
		print_r($info);
    }
    /********************************************************************/
    /***   Función: exportReport() 	                             	  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 16/01/2020    					                  ***/
    /***   Descripción: Generar Reporte                          	  ***/
    /********************************************************************/
    public function exportReport(){
        $info 	  = json_decode(file_get_contents("php://input"),true);
        $response = $this->vpf->exportReport($info);

		$delimiter = ",";
		$filename = "Reporte_VPF.csv";
		//create a file pointer
		$f = fopen($_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/CSV/'.$filename, 'w+');
    
		//set column headers
		$fields = array('ID', 'Fecha_venta','Nombre', 'Sucursal','Total','Subtotal','Impuestos','Status','Timbrado','Fecha','Monto','Observaciones','Fecha_Timbrado','Fecha_Timbrado','Total','Tipo_Factura','UUID');
        fputcsv($f, $fields, $delimiter);
         
		foreach ($response as $key => $value) {
			$lineData = array($value['ID'],$value['Fecha_venta'],$value['Distribuidor'],$value['Sucursal'], $value['Total'], $value['Subtotal'], $value['Impuestos'], $value['Status'],$value['Timbrado'], $value['Fecha_pago'], $value['Monto'], $value['Observaciones'], $value['Fecha_Timbrado'],$value['Fecha_Timbrado'], $value['Monto_factura'], $value['Tipo_Factura'], $value['UUID']);
			fputcsv($f, $lineData, $delimiter);
		}
		//set headers to download file rather than displayed
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename="' . $filename . '";');
		
		print_r(json_encode('http://'.$_SERVER['HTTP_HOST'].'/Avyna_Desk/CSV/'.$filename));
    }
}

?>