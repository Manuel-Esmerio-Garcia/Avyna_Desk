
<?php

/********************************************************************/
/***   Nombre Archivo: Controller_reporteVS.php                   ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 25/05/2020         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_reporteVS extends CI_Controller {

    /********************************************************************/
    /***   Función: __construct() 	                	              ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 25/05/2020    					                  ***/
    /***   Descripción: Constructor de la clase              	      ***/
    /********************************************************************/
    public function __construct(){
        parent::__construct();
        if(!isset($_SESSION['Avyna'])) redirect('controller_Login');
        $this->load->model('Reportes/ModelreporteVS', 'reporte');
    }
    /********************************************************************/
    /***   Función: index() 	                	                  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 25/05/2020    					                  ***/
    /***   Descripción: Metodo Cargar Vista                   	      ***/
    /********************************************************************/
    public function index(){
        $Titulo = array('PageTitle' => 'Reporte Inventario vs Minimo');

        $this->load->view('Componentes/Header', $Titulo);    
        $this->load->view('Reporte/reporteVS');
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
    public function tableVS(){
        $data = $this->input->post();
		$info = $this->reporte->tableVS($data);
		print_r($info);
    }

    public function exportReport(){
        $info 	  = json_decode(file_get_contents("php://input"),true);
        $response = $this->reporte->exportReport($info);

		$delimiter = ",";
		$filename = "Reporte_Inventario_VS_Minimo.csv";
		//create a file pointer
		$f = fopen($_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/CSV/'.$filename, 'w+');
    
        //set column headers
        $fields = array('Producto', 'Existencias','Apartados', 'Disponibles','Faltante', 'En Compra','Factor Sugerido Compra','Minimo','Precio Publico','Proveedor');
        fputcsv($f, $fields, $delimiter);
         
		foreach ($response as $key => $value) {
            if (floatval($value['Factor']) <= 0) {$value['Factor'] = 0;}
			$lineData = array($value['Producto'],$value['Existencias'],$value['Existencias_apartados'],$value['Existencias_disponibles'], $value['Faltante'], $value['Total_Restante'], $value['Factor'],$value['Min'], $value['Precio_publico'],$value['Proveedor']);
            fputcsv($f, $lineData, $delimiter);
        }
        
		//set headers to download file rather than displayed
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename="' . $filename . '";');
		
		print_r(json_encode('http://'.$_SERVER['HTTP_HOST'].'/Avyna_Desk/CSV/'.$filename));
    }
}

?>
