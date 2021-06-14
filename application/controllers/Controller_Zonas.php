<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

class Controller_Zonas extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();

		if(!isset($_SESSION['Avyna'])){
        	redirect('controller_Login');
        }

		$this->load->model("Zonas_Model","zonas");
	}

	public function index()
	{
		$Titulo = array('PageTitle' => 'Zonas Distribuidores');

		$data['Bloque']  = $this->zonas->Get_Bloque();
		$data['Cliente']  = $this->zonas->Get_Cliente();

	    $this->load->view('Componentes/Header', $Titulo); 
		$this->load->view('Catalogo/Zonas',$data);
		$this->load->view('Componentes/Footer');	
	}

	public function Add_Zona()
	{
		$data = $this->input->post();
	    $info = $this->zonas->Add_Zona($data);
	    print_r($info);
	}

	public function Edit_Zona()
	{
		$data = $this->input->post();
	    $info = $this->zonas->Edit_Zona($data);
	    print_r($info);
	}

	public function Delete_Zona()
	{
		$data = $this->input->post();
	    $info = $this->zonas->Delete_Zona($data);
	    print_r($info);
	}

}