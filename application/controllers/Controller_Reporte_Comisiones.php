<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

class Controller_Reporte_Comisiones extends CI_Controller 
{
	public function __construct()
	{
		parent::__construct();
        
        if(!isset($_SESSION['Avyna'])){
        	redirect('Controller_Login');
        }
		$this->load->model('Reportes/Reporte_Comisiones_Model', 'comision');
	}

	public function index(){
		$Titulo = array('PageTitle' => 'Reporte Por Comisión');

	    $this->load->view('Componentes/Header', $Titulo); 
		$this->load->view('Reporte/Reporte_Comisiones');
		$this->load->view('Componentes/Footer');	
	}
	
	public function init(){
		$response = $this->comision->init();
		print_r(json_encode($response));
	}

	public function tableVentas(){
		$data = $this->input->post();
		$info = $this->comision->tableVentas($data);
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
        $response = $this->comision->exportReport($info);

		$delimiter = ",";
		$filename = "Reporte_Comisiones_Ventas.csv";
		//create a file pointer
		$f = fopen($_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/CSV/'.$filename, 'w+');
    
		//set column headers
        $fields = array('ID', 'Fecha_venta','Total', utf8_decode('N° Salon'),'Salon',utf8_decode('Monto Comisión Salon'),utf8_decode('N° Distribuidor'),'Distribuidor',utf8_decode('Monto Comisión Distribuidor'));
		fputcsv($f, $fields, $delimiter);
         
		foreach ($response as $key => $value) {

			$MontoComisionSalon = $value["Total_desc"] * ($info['comisionSalon'] /100);
			$MontoComisionDistribuidor = $value["Total_desc"] * ($info['comisionDistribuidor'] /100);

			$lineData = array($value['ID'],
			$value['Fecha_venta'],
			$value['Total_desc'],
			$value['No_salon'], 
			utf8_encode($value['Salon']),
			$MontoComisionSalon,
			$value['No_distribuidor'], 
			utf8_encode($value['Distribuidor']),
			$MontoComisionDistribuidor);
			fputcsv($f, $lineData, $delimiter);
		}
		//set headers to download file rather than displayed
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename="' . $filename . '";');
		
		print_r(json_encode('http://'.$_SERVER['HTTP_HOST'].'/Avyna_Desk/CSV/'.$filename));
	}
	

	public function tableSalon(){
		$data = $this->input->post();
		$info = $this->comision->tableSalon($data);
		print_r($info);
	}

	/********************************************************************/
    /***   Función: exportReportSalon() 	                       	  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 16/01/2020    					                  ***/
    /***   Descripción: Generar Reporte                          	  ***/
    /********************************************************************/
    public function exportReportSalon(){
        $info 	  = json_decode(file_get_contents("php://input"),true);
        $response = $this->comision->exportReportSalon($info);

		$delimiter = ",";
		$filename = "Reporte_Comisiones_Salones.csv";
		//create a file pointer
		$f = fopen($_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/CSV/'.$filename, 'w+');
    
		//set column headers
        $fields = array(utf8_decode('N° Salon'),'Salon','Monto Ventas en Pedido',utf8_decode('Monto Comisión Salon'));
		fputcsv($f, $fields, $delimiter);
         
		foreach ($response as $key => $value) {

			$MontoComisionSalon = $value["Monto_ventas_periodo"] * ($info['comisionSalon'] /100);

			$lineData = array(
			$value['No_salon'], 
			utf8_encode($value['Salon']),
			$value['Monto_ventas_periodo'],
			$MontoComisionSalon);
			fputcsv($f, $lineData, $delimiter);
		}
		//set headers to download file rather than displayed
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename="' . $filename . '";');
		
		print_r(json_encode('http://'.$_SERVER['HTTP_HOST'].'/Avyna_Desk/CSV/'.$filename));
	}


	public function tableDistri(){
		$data = $this->input->post();
		$info = $this->comision->tableDistri($data);
		print_r($info);
	}

	public function exportReportDistri(){
		$info 	  = json_decode(file_get_contents("php://input"),true);
		$response = $this->comision->exportReportDistri($info);

		$delimiter = ",";
		$filename = "Reporte_Comisiones_Distribuidores.csv";
		//create a file pointer
		$f = fopen($_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/CSV/'.$filename, 'w+');
    
		//set column headers
        $fields = array(utf8_decode('N° Distribuidor'),'Distribuidor','Monto Ventas en Pedido',utf8_decode('Monto Comisión Distribuidor'));
		fputcsv($f, $fields, $delimiter);
         
		foreach ($response as $key => $value) {

			$MontoComisionDistri = $value["Monto_ventas_periodo"] * ($info['comisionDistribuidor'] /100);

			$lineData = array(
			$value['No_distribuidor'], 
			utf8_encode($value['Distribuidor']),
			$value['Monto_ventas_periodo'],
			$MontoComisionDistri);
			fputcsv($f, $lineData, $delimiter);
		}
		//set headers to download file rather than displayed
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename="' . $filename . '";');
		
		print_r(json_encode('http://'.$_SERVER['HTTP_HOST'].'/Avyna_Desk/CSV/'.$filename));
	}
    
}

?>