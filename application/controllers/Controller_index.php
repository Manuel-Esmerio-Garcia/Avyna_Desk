<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_index extends CI_Controller {


    	public function __construct() 
    {
        parent::__construct();
        
        if(!isset($_SESSION['Avyna'])){
        	redirect('Controller_Login');
        }
		$this->load->model('Configuracion_Model', 'configure');
         $this->load->model('Login_Model', 'usuario');
		$this->load->helper('form');
        
    }

	public function index()
	{

    $Titulo = array('PageTitle' => 'Avyna Cosmeticos');

    $this->load->view('Componentes/Header', $Titulo); 
	$this->load->view('Inicio/Index');
	$this->load->view('Componentes/Footer');	
    }
    
    public function indexPacking()
	{

    $Titulo = array('PageTitle' => 'Avyna Packing');

    $this->load->view('Componentes/HeaderPacking', $Titulo); 
	$this->load->view('Inicio/IndexPacking');
	$this->load->view('Componentes/Footer');	
	}

    public function Configuracion()
    {
     
        $id = $_SESSION['Avyna'][0]['ID'];

        $data['Datos'] = $this->configure->CargarDatos($id);
    		
        $Titulo = array('PageTitle' => 'Configuración del Usuario');

        $this->load->view('Componentes/Header', $Titulo); 
        $this->load->view('Inicio/Configuracion', $data);
        $this->load->view('Componentes/Footer');
    }
 
 	public function Update()
{      	     
     
     $id =  $this->input->post('ID_User');
        
    $dato = array(
		'Nombre'        => $this->input->post('Nombre_User'),
		'Email'         => $this->input->post('Email_User'),
		'Telefono'      => $this->input->post('Telefono_User'),
		'Telefono_Opc'  => $this->input->post('Telefono_Opc_User'),
		'Puesto'        => $this->input->post('Puesto_User'),
		'Estatus'       => $this->input->post('Estatus_User')
     );
     
//     print_r($dato);
			
	$this->configure->Modificar($id, $dato);
    $data['Datos'] = $this->configure->CargarDatos($id);
		
	$Titulo = array('PageTitle' => 'Configuración del Usuarios');

    $this->load->view('Componentes/Header', $Titulo); 
    $this->load->view('Inicio/Configuracion', $data);
    $this->load->view('Componentes/Footer');

  }
 
  	public function Update_Password()
{      
    $id            = $this->input->post('ID_User');
    $Confirmar     = $this->input->post('Confirmar_User');
     
    $pass = array(
    'Password'         => $this->input->post('Contraseña_User')
    );
          
		if($pass['Password'] == $Confirmar){
			
	$this->configure->Modificar_Password($id, $pass);
    $datos['Datos'] = $this->configure->CargarDatos($id);
		
    session_destroy();
	redirect('Controller_Login');
         
		}else{
			
			echo "Error al modificar";
			
		}

  }
	
}
