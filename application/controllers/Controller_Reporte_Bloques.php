<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

class Controller_Reporte_Bloques extends CI_Controller 
{
	public $usermain = null;

	public function __construct()
	{
		parent::__construct();
        
        if(!isset($_SESSION['Avyna'])){
        	redirect('controller_Login');
        }
		$this->load->model('Reporte_Bloques_Model', 'bloques');
		//$this->load->model('Reporte_Venta_Model', 'Reporte');
	}

	public function index()
	{
		$Titulo = array('PageTitle' => 'Reporte Bloques Distribuidor');

		$Reportes['Sucursal'] = $this->bloques->GetSucursales();

	    $this->load->view('Componentes/Header', $Titulo); 
		$this->load->view('Reporte/Reporte_Bloques',$Reportes);
		$this->load->view('Componentes/Footer');	
	}

	public function Get_Top_5_Bloques()
	{
		  $data = $this->input->post();
		  $info['bloques'] = $this->bloques->Get_Top_5($data['idSucursal']);
		  print_r(json_encode($info));
	}

	public function Get_Ventas_By_ID_Bloque()
	{
		$data = $this->input->post();
	    $info['Ventas'] = $this->bloques->Get_Ventas_By_ID_Bloque($data['idBloque']);
	  	print_r(json_encode($info));
	}


	public function Get_Reporte_By_Cliente()
	{
		$data = $this->input->post();

		  $info['Cliente'] = $this->bloques->Get_Reporte_By_Cliente($data['idBloque']);
		  $info['Cliente1'] = $this->bloques->Get_Reporte_By_Cliente1($data['idBloque']);
		  $info['Cliente2'] = $this->bloques->Get_Reporte_By_Cliente2($data['idBloque']);
		  $info['Cliente3'] = $this->bloques->Get_Reporte_By_Cliente3($data['idBloque']);
		  print_r(json_encode($info));
	}

}

?>