<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

class Controller_Reporte_Semanal extends CI_Controller 
{
	public $usermain = null;

	public function __construct()
	{
		parent::__construct();
        
        if(!isset($_SESSION['Avyna'])){
        	redirect('controller_Login');
        }
		$this->load->model('Reporte_Semanal_Model', 'Reporte');
		//$this->load->model('Reporte_Venta_Model', 'Reporte');
	}

	public function index()
	{
		$Titulo = array('PageTitle' => 'Ventas Por Distribuidor Semanal');

		$Reportes['Sucursal'] = $this->Reporte->GetSucursales();

	    $this->load->view('Componentes/Header', $Titulo); 
		$this->load->view('Reporte/Reporte_Semanal',$Reportes);
		$this->load->view('Componentes/Footer');	
	}

	public function Get_Reporte_By_Cliente()
	{
		$data = $this->input->post();

		  $info['Cliente'] = $this->Reporte->Get_Reporte_By_Cliente($data['idCliente']);

		  print_r(json_encode($info));
	}

	public function Get_Top_5_Clientes_Saldo()
	{
		  $data = $this->input->post();

		  $info['Cliente'] = $this->Reporte->Get_Top_5($data['idSucursal']);

		  print_r(json_encode($info));
	}

	function Get_Ventas_By_ID_Cliente()
	{
		$data = $this->input->post();

		  $info['Ventas'] = $this->Reporte->Get_Ventas_By_ID_Cliente($data['idCliente']);

		  print_r(json_encode($info));
	}

	public function Get_Grafica_Linea()
	{
		$data = $this->input->post();

		  $info['Semana1'] = $this->Reporte->Get_Semana1($data['idSucursal']);
		  $info['Semana2'] = $this->Reporte->Get_Semana2($data['idSucursal']);
		  $info['Semana3'] = $this->Reporte->Get_Semana3($data['idSucursal']);
		  $info['Semana4'] = $this->Reporte->Get_Semana4($data['idSucursal']);

		  print_r(json_encode($info));
	}

	public function Get_Ventas()
	{
		$data = $this->input->post();

		  $info['Ventas'] = $this->Reporte->Get_Ventas($data['idSucursal']);

		  print_r(json_encode($info));
	}

}