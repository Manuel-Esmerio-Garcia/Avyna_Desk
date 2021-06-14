<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Clientes_Web extends CI_Controller {


    public function __construct(){
        parent::__construct();

        if(!isset($_SESSION['Avyna'])) redirect('Controller_Login');

        $this->load->model('ClienteWeb_Model', 'cliente');
    }

    public function index(){
        $Titulo = array('PageTitle' => 'Clientes Web');

        $this->load->view('Componentes/Header', $Titulo);    
        $this->load->view('Catalogo/ClientesWeb');
        $this->load->view('Componentes/Footer');

    }

    public function ShowPassword(){
        $secreto = 'echoslineNefas1809';

        $data     = $this->input->post();
        $info     = $this->cliente->ShowPassword($data['idCliente']);
        $Password = openssl_decrypt($info[0]['Password'], "AES-128-ECB", $secreto);
        print_r($Password);
    }

    public function fetchClientes(){
        $data = $this->input->post();
        $info = $this->cliente->fetchClientes($data);
        print_r($info);
    }

    public function Insert(){
        $info 	  = json_decode(file_get_contents("php://input"),true);
        $response = $this->cliente->Insert($info);
		print_r($response);
    }

    public function Update(){
        $info 	  = json_decode(file_get_contents("php://input"),true);
        $response = $this->cliente->Update($info);
		print_r($response);
    }
    
    public function Delete(){
        $info 	  = json_decode(file_get_contents("php://input"),true);
        $response = $this->cliente->Delete($info);
		print_r($response);
    }  

}

?>