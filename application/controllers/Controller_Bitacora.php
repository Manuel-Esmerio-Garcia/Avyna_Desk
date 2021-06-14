<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class controller_Bitacora extends CI_Controller {


    public function __construct() 
    {
        parent::__construct();

        if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

$this->load->model('Cliente_Model', 'Cliente'); // $ Cliente = new Cliente_Model();
$this->load->model('Bitacora_Model', 'Bitacora');
}

public function index()
{
  
}

public function Crear(){

    $data['Razonsocial']= $this->Cliente->Razon_Social_Bitacora();


// Para detectar si te trae algo de la base de datos
//  print_r($data['Razonsocial']);
//  exit; 

    $Titulo = array('PageTitle' => 'Crear Bitácora');

    $this->load->view('Componentes/Header', $Titulo);    
    $this->load->view('Bitacora/CrearBitacora', $data);
    $this->load->view('Componentes/Footer');
}

public function BitacorasEmi(){

    $Bitacoras_Realizadas['BitacorasEmi'] = $this->Bitacora->SelectAllEmi();

    $Titulo = array('PageTitle' => 'Bitácoras Emitidas');

    $this->load->view('Componentes/Header', $Titulo);     
    $this->load->view('Bitacora/BitacorasEmi', $Bitacoras_Realizadas);
    $this->load->view('Componentes/Footer');
}

public function BitacorasPen(){

    $Bitacoras_Pendientes['BitacorasPen'] = $this->Bitacora->SelectAllPen();

    $Titulo = array('PageTitle' => 'Bitácoras Pendientes');

    $this->load->view('Componentes/Header', $Titulo);   
    $this->load->view('Bitacora/BitacorasPen', $Bitacoras_Pendientes);
    $this->load->view('Componentes/Footer');
}

public function BitacorasCan(){

    $Bitacoras_Canceladas['BitacorasCan'] = $this->Bitacora->SelectAllCan();

    $Titulo = array('PageTitle' => 'Bitácoras Canceladas');

    $this->load->view('Componentes/Header', $Titulo);     
    $this->load->view('Bitacora/BitacorasCan', $Bitacoras_Canceladas);
    $this->load->view('Componentes/Footer');
}
}