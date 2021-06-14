<?php

/********************************************************************/
/***   Nombre Archivo: Controller_reporteVentaCliente.php         ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 20/11/2019         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_reporteVentaCliente extends CI_Controller {

    /********************************************************************/
    /***   Función: __construct() 	                	              ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 20/11/2019    					                  ***/
    /***   Descripción: Constructor de la clase              	      ***/
    /********************************************************************/
    public function __construct(){
        parent::__construct();
        if(!isset($_SESSION['Avyna'])) redirect('controller_Login');
        $this->load->model('Reportes/ModelreporteVentaCliente', 'reporte');
    }
    /********************************************************************/
    /***   Función: index() 	                	                  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 20/11/2019    					                  ***/
    /***   Descripción: Metodo Cargar Vista                   	      ***/
    /********************************************************************/
    public function index(){
        $Titulo = array('PageTitle' => 'Reporte Venta Cliente');

        $this->load->view('Componentes/Header', $Titulo);    
        $this->load->view('Reporte/reporteVentaCliente');
        $this->load->view('Componentes/Footer');
    }
    /********************************************************************/
	/***   Función: init() 	                				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 20/11/2019    					                  ***/
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
		$filename = "Venta_Clientes.csv";
		//create a file pointer
		$f = fopen($_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/CSV/'.$filename, 'w+');
    
		//set column headers
		$fields = array('idVenta','Producto','Promocion','Cantidad','idClienteMenudeo', 'Nombre','Apellidos','Empresa','Cargo','Calle_numero','Colonia','Ciudad','Municipio','Estado','Pais','CP','RFC','Tel1','Tel2','Email','Descuento','idCliente','Status','Nivel','Dia_visita','Asignado','Distribuidor_Nombre','Distribuidor_Apellidos','Fecha_Venta');
		fputcsv($f, $fields, $delimiter);

		foreach ($response as $key => $value) {
			$lineData = array($value['idVenta'],$value['Producto'],$value['Promocion'],$value['Cantidad'], $value['ID'], $value['Nombre'], $value['Apellidos'], $value['Empresa'],$value['Cargo'], $value['Calle_numero'], $value['Colonia'], $value['Ciudad'], $value['Municipio'],$value['Estado'], $value['Pais'], $value['CP'], $value['RFC'], $value['Tel1'],$value['Tel2'], $value['Email'], $value['Descuento_%'], $value['idCliente'], $value['Status'],$value['Nivel'], $value['Dia_visita'], $value['Asignado'],$value['Distribuidor_Nombre'], $value['Distribuidor_Apellidos'],$value['Fecha_venta']);
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