<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class controller_Presentacion extends CI_Controller {


    	public function __construct() 
    {
        parent::__construct();
        
        if(!isset($_SESSION['Avyna'])){
        	redirect('controller_Login');
        }
    }

	public function index()
	{

    $Titulo = array('PageTitle' => 'Introducción');

    $this->load->view('Componentes/Header', $Titulo); 
	$this->load->view('Presentacion/Presentacion');
	$this->load->view('Componentes/Footer');	
	}

}
