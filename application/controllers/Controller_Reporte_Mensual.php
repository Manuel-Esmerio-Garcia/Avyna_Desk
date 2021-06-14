<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

class Controller_Reporte_Mensual extends CI_Controller 
{
	public $usermain = null;

	public function __construct()
	{
		parent::__construct();
        
        if(!isset($_SESSION['Avyna'])){
        	redirect('controller_Login');
        }
		$this->load->model('Reporte_Mensual_Model', 'Reporte');
		$this->load->model('Distribuidores_Model', 'Cliente');
		$this->load->model('Cliente_Model', 'ClientesMenudeo');
		$this->load->model('Ventas_Model', 'VentasMenudeo');
	}

	public function index()
	{
		$Titulo = array('PageTitle' => 'Ventas Por Distribuidor Mensual');

		$Reportes['Sucursal'] = $this->Reporte->GetSucursales();
		$Reportes['Bloque'] = $this->Reporte->GetBloque();

	    $this->load->view('Componentes/Header', $Titulo); 
		$this->load->view('Reporte/Reporte_Mensual',$Reportes);
		$this->load->view('Componentes/Footer');	
	}

	public function getInfoFichaCliente(){
		$data = $this->input->post();
		$info['Distribuidor'] = $this->Cliente->getDistribuidoresById($data['idCliente']);
		$info['CantidadSalones'] = $this->ClientesMenudeo->getCantidadSalones($data['idCliente']);
		$info['CantidadSalonesTrimestral'] = $this->ClientesMenudeo->getCantidadSalonesTrimestral($data['idCliente']);
		$info['CantidadNuevoSalones'] = $this->ClientesMenudeo->getCantidadNuevoSalones($data['idCliente']); 
		$info['CantidadNuevoSalones12'] = $this->ClientesMenudeo->getCantidadNuevoSalones12($data['idCliente']);
		$info['TotalVentasMes'] = $this->VentasMenudeo->getVentasMes($data['idCliente']);
		$info['VentasSalones'] = $this->VentasMenudeo->getVentasSalonesMes($data['idCliente']);
		$info['VentasSalonesAnteriores'] = $this->VentasMenudeo->getVentasSalonesMesAnterior($data['idCliente']); 
		$info['UltimasVentasSalones'] = $this->VentasMenudeo->getUltimasVentasSalones($data['idCliente']);  
		$info['UltimasVentas'] = $this->VentasMenudeo->getUltimasVentas($data['idCliente']);

		$info['UltimasVentasMes'] = $this->VentasMenudeo->getUltimasVentasMes($data['idCliente']); 
		$info['ActiveRed'] = $this->VentasMenudeo->getActiveRed($data['idCliente']);  
		$info['ActiveBlack'] = $this->VentasMenudeo->getActiveBlack($data['idCliente']);
		

		print_r(json_encode($info));
	}

	public function Get_Reporte_By_Cliente()
	{
		$data = $this->input->post();

		  $info['Cliente'] = $this->Reporte->Get_Reporte_By_Cliente($data['idCliente']);
		  $info['Cliente1'] = $this->Reporte->Get_Reporte_By_Cliente1($data['idCliente']);
		  $info['Cliente2'] = $this->Reporte->Get_Reporte_By_Cliente2($data['idCliente']);
		  $info['Cliente3'] = $this->Reporte->Get_Reporte_By_Cliente3($data['idCliente']);
		  $info['Cliente4'] = $this->Reporte->Get_Reporte_By_Cliente4($data['idCliente']);
		  $info['Cliente5'] = $this->Reporte->Get_Reporte_By_Cliente5($data['idCliente']);
		  $info['Cliente6'] = $this->Reporte->Get_Reporte_By_Cliente6($data['idCliente']);
		  $info['Cliente7'] = $this->Reporte->Get_Reporte_By_Cliente7($data['idCliente']);
		  $info['Cliente8'] = $this->Reporte->Get_Reporte_By_Cliente8($data['idCliente']);
		  $info['Cliente9'] = $this->Reporte->Get_Reporte_By_Cliente9($data['idCliente']);
		  $info['Cliente10'] = $this->Reporte->Get_Reporte_By_Cliente10($data['idCliente']);
		  $info['Cliente11'] = $this->Reporte->Get_Reporte_By_Cliente11($data['idCliente']);
		  $info['Cliente12'] = $this->Reporte->Get_Reporte_By_Cliente12($data['idCliente']);
		  $info['Cliente13'] = $this->Reporte->Get_Reporte_By_Cliente13($data['idCliente']);
		  $info['Cliente14'] = $this->Reporte->Get_Reporte_By_Cliente14($data['idCliente']);
		  $info['Cliente15'] = $this->Reporte->Get_Reporte_By_Cliente15($data['idCliente']);
		  $info['Cliente16'] = $this->Reporte->Get_Reporte_By_Cliente16($data['idCliente']);
		  $info['Cliente17'] = $this->Reporte->Get_Reporte_By_Cliente17($data['idCliente']);
		  $info['Cliente18'] = $this->Reporte->Get_Reporte_By_Cliente18($data['idCliente']);
		  $info['Cliente19'] = $this->Reporte->Get_Reporte_By_Cliente19($data['idCliente']);
		  $info['Cliente20'] = $this->Reporte->Get_Reporte_By_Cliente20($data['idCliente']);
		  $info['Cliente21'] = $this->Reporte->Get_Reporte_By_Cliente21($data['idCliente']);
		  $info['Cliente22'] = $this->Reporte->Get_Reporte_By_Cliente22($data['idCliente']);
		  $info['Cliente23'] = $this->Reporte->Get_Reporte_By_Cliente23($data['idCliente']);



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

		  $info['Ventas'] = $this->Reporte->Get_Ventas($data['idSucursal'],$data['idBloques']);

		  print_r(json_encode($info));
	}

}