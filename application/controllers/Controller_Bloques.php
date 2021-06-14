<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

class Controller_Bloques extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();

		if(!isset($_SESSION['Avyna'])){
        	redirect('controller_Login');
        }

		$this->load->model("Bloques_Model","bloques");
	}

	public function index()
	{
		$Titulo = array('PageTitle' => 'Bloques Distribuidores');

	    $this->load->view('Componentes/Header', $Titulo); 
		$this->load->view('Catalogo/Bloques');
		$this->load->view('Componentes/Footer');	
	}

	public function AddBloques()
	{
		$data = $this->input->post();
  		$info = $this->bloques->AddBloques($data);
 		print_r($info);
	}

	public function EditBloques()
	{
		$data = $this->input->post();
  		$info = $this->bloques->EditBloques($data);
 		print_r($info);
	}

	public function DeleteBloques()
	{
		$data = $this->input->post();
  		$info = $this->bloques->DeleteBloques($data);
 		print_r($info);
	}

}

?>