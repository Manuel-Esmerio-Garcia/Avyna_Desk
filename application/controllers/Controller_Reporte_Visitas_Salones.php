<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Reporte_Visitas_Salones extends CI_Controller {

    public function __construct(){
        parent::__construct();
        
        if(!isset($_SESSION['Avyna'])){
        	redirect('Controller_Login');
        }
        $this->load->model('Reportes/ModelReporteVisitaSalones', 'reporte');
        $this->load->model('Cliente_Model', 'cliente');
		$this->load->helper('form');
    }

	public function index(){

        $title = array('PageTitle' => 'Reporte Visita Salones');

        $data['Distribuidor'] = $this->cliente->Get_Distribuidor();

        $this->load->view('Componentes/Header', $title); 
    	$this->load->view('Reporte/Reporte_Visitas_Salones', $data);
    	$this->load->view('Componentes/Footer');	
    }

    public function initial(){
        $data = $this->input->post();
        $info = $this->reporte->initial($data['idCliente'],$data['date']);
        print_r(json_encode($info));
    }

    public function changeWeek(){
        $data = $this->input->post();
        $info = $this->reporte->changeWeek($data['Semana'], $data['date'], $data['idCliente']);
        print_r(json_encode($info));
    }
}

?>