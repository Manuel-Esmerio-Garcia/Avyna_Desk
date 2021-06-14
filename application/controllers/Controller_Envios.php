<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Envios extends CI_Controller
{
  public function __construct() 
  {
      parent::__construct();

     if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

     $this->load->model('Envios_Model', 'envios');
     $this->load->model("Extracciones_Model","extracciones");
  }

  public function index()
  {
      $Titulo = array('PageTitle' => 'Envios');

      $data['Sucursal']  = $this->extracciones->Get_Sucursales();

      $this->load->view('Componentes/Header', $Titulo);    
      $this->load->view('Operaciones/Envios',$data);
      $this->load->view('Componentes/Footer');
  }

  public function Realizar_Envio()
  {
    $data    = $this->input->post();
    $result  = $this->envios->Realizar_Envio($data['ID']);

    print_r($result);
    exit();
  }

}
