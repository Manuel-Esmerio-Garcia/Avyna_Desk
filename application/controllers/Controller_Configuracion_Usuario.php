<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

class Controller_Configuracion_Usuario extends CI_Controller 
{	
	 public function __construct() 
    {
        parent::__construct();
        
        if(!isset($_SESSION['Avyna'])){
        	redirect('controller_Login');
        }
		$this->load->model('Configuracion_Model', 'configure');        
    }

	public function index()
	{

    $Titulo = array('PageTitle' => 'Configración Usuario');

    $this->load->view('Componentes/Header', $Titulo); 
	$this->load->view('Configuracion/Configuracion_Usuario');
	$this->load->view('Componentes/Footer');	
	}

}