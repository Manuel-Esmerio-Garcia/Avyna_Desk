<?php
defined('BASEPATH') or exit('No direct script access allowed');

date_default_timezone_set('America/Mexico_City');

ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

class Controller_Reporte_Guia extends CI_Controller
{
    
  public function __construct()
  {
    parent::__construct();

    if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

		$this->load->model("Reporte_Guia_Model","reporte");
		$this->load->model('Login_Model', 'login');
		$this->load->model('Fetch_Model', 'fetch');
  }

  public function index()
  {
    $Titulo = array('PageTitle' => 'Reporte Guias Estafeta');

		$Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      'pass' =>  $_SESSION['Avyna'][0]['Password']);

		// Refrescar Permisos e información del usuario //
		$Session = $this->login->signIn($Usuario);

		if ($Session != null){  
			// Cargar Vista Distribuidores //
			$this->load->view('Componentes/Header', $Titulo); 
			$this->load->view('Reporte/Reporte_Guia');
			$this->load->view('Componentes/Footer');
		}
		else{
			// Cerrar Sesión //
			$this->cerrarSesion($Usuario);
		}	
  }

  // Cargar Datatable Reporte Guia //
  public function fetchReporteGuia()
  {
	  $data = $this->input->post();
    $info = $this->fetch->fetchReporteGuia($data);
    print_r($info); 
  }

  // Descargar CSV Exportar Reporte Guia //
  public function csvExportarReporteGuia()
  {
	  $data = $this->input->post();
    $info = $this->reporte->csvExportarReporteGuia($data);

    // output headers so that the file is downloaded rather than displayed
    header('Content-type: text/csv');
    header('Content-Disposition: attachment; filename="Reporte Guias Envio.csv"');
    header('Pragma: no-cache');
    header('Expires: 0');

    // create a file pointer connected to the output stream
    $file = fopen('php://output', 'w');
    // send the column headers
    fputcsv($file, array('Numero_de_Guia', 'Destinatario','Razon_Social_Destinatario', 'Destino','Peso','Descripcion_de_Contenido','Garantia','Fecha_envio'));

    for ($i=0; $i < count($info); $i++){ 
      fputcsv($file, $info[$i]);
    }
  }

  // Cerrar Sesión //
	public function cerrarSesion(){
    session_destroy();
    redirect('Controller_Login');
  }

}
