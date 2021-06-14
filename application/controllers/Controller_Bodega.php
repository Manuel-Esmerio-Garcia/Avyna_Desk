<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Bodega extends CI_Controller {


    public function __construct() 
    {
        parent::__construct();

        if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

	$this->load->model('Bodega_Model', 'bodega'); 
	}

	public function index()
	{
	   $Titulo = array('PageTitle' => 'Bodega');

	    $data['Moneda'] = $this->bodega->Get_Moneda();
	    $data['Sucursal'] = $this->bodega->Get_Bodega();

	    $this->load->view('Componentes/Header', $Titulo);    
	    $this->load->view('Catalogo/Bodega',$data);
	    $this->load->view('Componentes/Footer');
	}

	//////////////////////////////////////////////
	/// Modificacion Nuevas Funciones Bodega ////

	// Obtener Bodega By IdSucursal//
	public function getBodegaById()
	{
		$data = $this->input->post();
		$info = $this->bodega->getBodegaById($data['idBodega']);
	    print_r(json_encode($info));
	}

	// Obtener Bodega //
	public function getBodega()
	{
		$data = $this->input->post();
		$info = $this->bodega->getBodega();
	    print_r(json_encode($info));
	}

	 // Función Crear CSV Inventario General //
	 public function csvInventarioGeneral()
	 {
	   $data = $this->input->post();
	   $info = $this->bodega->csvInventarioGeneral($data);
   
	   // output headers so that the file is downloaded rather than displayed
	   header('Content-type: text/csv');
	   header('Content-Disposition: attachment; filename="Reporte Bodega.csv"');
	   header('Pragma: no-cache');
	   header('Expires: 0');
   
	   // create a file pointer connected to the output stream
	   $file = fopen('php://output', 'w');
	   // send the column headers
	   fputcsv($file, array('ID', 'Codigo', 'Producto', 'Precio Publico', 'Min', 'Existencias'));
   
	   for ($i=0; $i < count($info); $i++){ 
		 fputcsv($file, $info[$i]);
	   }
	 }

	public function Editar_Producto()
	{
		$data = $this->input->post();

	    $info = $this->bodega->Editar_Producto($data);

	    print_r($info);
	}

	public function Agregar_Producto()
	{
		$data = $this->input->post();

	    $info = $this->bodega->Agregar_Producto($data);

	    print_r($info);
	}

	public function Get_Division()
	{
		$data = $this->input->post();

	    $info['Division'] = $this->bodega->Get_Division();

	    print_r(json_encode($info));
	}

	public function Get_Linea()
	{
		$data = $this->input->post();

	    $info['Linea'] = $this->bodega->Get_Linea($data['idDivision']);

	    print_r(json_encode($info));
	}

	public function Get_Sublinea()
	{
		$data = $this->input->post();

	    $info['Sublinea'] = $this->bodega->Get_Sublinea($data['idLinea']);

	    print_r(json_encode($info));
	}

	public function Get_Producto()
	{
		$data = $this->input->post();

	    $info['Producto'] = $this->bodega->Get_Producto($data['idSublinea']);

	    print_r(json_encode($info));
	}

	public function Get_Bodega_by_Id()
	{
		$data = $this->input->post();

	    $info['Bodega'] = $this->bodega->Get_Bodega_by_Id($data['ID']);

	    print_r(json_encode($info));
	}

	public function Eliminar_Locacion()
	{
		$data = $this->input->post();

		$Result          = $this->bodega->Eliminar_Locacion($data['ID']);

		if ($Result > 0)
	    {
	      print_r("Correcto");
	      exit();
	    }
	    else
	    {
	      print_r("Incorrecto");
	      exit();
	    }
	}

	public function Editar_Locacion(){
		$data   = $this->input->post();
		$Result = $this->bodega->Editar_Locacion($data);
		print_r($Result);
	}

	public function Agregar_Locacion()
	{
		$data = $this->input->post();
		$Result          = $this->bodega->Agregar_Locacion($data);
		print_r($Result);
	}

	public function Get_Locacion()
	{
		$data = $this->input->post();

	    $info['Locacion'] = $this->bodega->Get_Locacion($data['ID']);

	    print_r(json_encode($info));
	}

	public function Delete_Bodega()
	{
		$data = $this->input->post();

		$Result          = $this->bodega->Delete_Bodega($data['ID']);

		if ($Result > 0)
	    {
	      print_r("Correcto");
	      exit();
	    }
	    else
	    {
	      print_r("Incorrecto");
	      exit();
	    }
	}

	public function Editar_Bodega()
	{
		$data = $this->input->post();

		$Result          = $this->bodega->Editar_Bodega($data);

		if ($Result > 0)
	    {
	      print_r("Correcto");
	      exit();
	    }
	    else
	    {
	      print_r("Incorrecto");
	      exit();
	    }
	}

	public function Guardar_Bodega()
	{
		$data = $this->input->post();

		$Result          = $this->bodega->Guardar_Bodega($data);

		if ($Result > 0)
	    {
	      print_r("Correcto");
	      exit();
	    }
	    else
	    {
	      print_r("Incorrecto");
	      exit();
	    }
	}

}

?>
