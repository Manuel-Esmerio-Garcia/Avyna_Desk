<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

class Controller_Reporte_Venta extends CI_Controller 
{
	public $usermain = null;

	public function __construct()
	{
		parent::__construct();
        
        if(!isset($_SESSION['Avyna'])){
        	redirect('controller_Login');
        }
		$this->load->model('Reporte_Venta_Model', 'Reporte');
	}

	public function index()
	{
		$Titulo = array('PageTitle' => 'Reporte Venta');

		//$Reportes['Ventas'] = $this->Reporte->getallVentas();
		//$Reportes['VentasMenudeo'] = $this->Reporte->getallVentasMenudeo();
		$Reportes['Sucursales'] = $this->Reporte->getgroupbysucursal();
		$Reportes['Status'] = $this->Reporte->getgroupbystatus();
		$Reportes['Status_Menudeo'] = $this->Reporte->getgroupbystatusMenudeo();

	    $this->load->view('Componentes/Header', $Titulo); 
		$this->load->view('Reporte/Reporte_Venta',$Reportes);
		$this->load->view('Componentes/Footer');	
	}

	public function Get_info_Ventas()
	{
		$Ventas['ventas'] = $this->Reporte->getallVentas();

		print_r(json_encode($Ventas));
	}

	public function GetVentasMenudeo(){

		$check = false;

			try{

			$data = $this->input->post();

			if ($data != null) {
				
				$Ventas['ventas_menudeo'] = $this->Reporte->getallVentasMenudeobyID($data['ID']);

			}

		}catch(Exeption $er){

			$check = false;
		}

		print_r(json_encode($Ventas));
	}

	public function GetDetalle_Venta_Menudeo(){

		$check = false;

			try{

			$data = $this->input->post();

			if ($data != null) {
				
				$DetalleVentas['detalle_ventas_menudeo'] = $this->Reporte->getallDetalleVentas($data['ID']);

			}

		}catch(Exeption $er){

			$check = false;
		}

		echo json_encode($DetalleVentas);
	}

		public function GetVentas(){

		$check = false;

			try{

			$data = $this->input->post();

			if ($data != null) {
				
				$Ventas['ventas'] = $this->Reporte->getallVentasbyID($data['ID']);

			}

		}catch(Exeption $er){

			$check = false;
		}

		print_r(json_encode($Ventas));
	}
}