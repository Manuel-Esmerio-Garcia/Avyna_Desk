<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

date_default_timezone_set('America/Mexico_City');

class Controller_Distribuidores extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();

		if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

		$this->load->model("Distribuidores_Model","distribuidor");
		$this->load->model("Extracciones_Model","extracciones");
		$this->load->model("Division_Model","division");
		$this->load->model('Bodega_Model', 'bodega');
		$this->load->model('Login_Model', 'login');
		$this->load->model('Fetch_Model', 'fetch');
	}

	public function index()
	{
		$Titulo = array('PageTitle' => 'Distribuidores');

		$data['Bodega']  	= $this->bodega->getBodega();
		$data['Division']   = $this->division->getDivision();
		$data['Bloque']  	= $this->distribuidor->getBloque();

		$Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      'pass' =>  $_SESSION['Avyna'][0]['Password']);

		// Refrescar Permisos e información del usuario //
		$Session = $this->login->signIn($Usuario);

		if ($Session != null){  
			// Cargar Vista Distribuidores //
			$this->load->view('Componentes/Header', $Titulo); 
			$this->load->view('Catalogo/Distribuidores',$data);
			$this->load->view('Componentes/Footer');
		}
		else{
			// Cerrar Sesión //
			$this->cerrarSesion($Usuario);
		}	
	}

	/********************************************************************/
	/***   Función: btnUnificar() 	                	              ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 19/11/2019    					                  ***/
	/***   Descripción: Boton Unificar Cliente                        ***/
	/********************************************************************/
	public function btnUnificar(){
		$data = json_decode(file_get_contents("php://input"),true);
		$info = $this->distribuidor->btnUnificar($data);
		print_r($info);
	}

	// Obtener Distribuidores //
	public function getDistribuidores()
	{
		$data = $this->input->post();
		$info = $this->distribuidor->getDistribuidores();
	    print_r(json_encode($info));
	}

	// Cargar DataTable Distribuidores //
	public function fetchDistribuidores()
	{
		$data = $this->input->post();
		$info = $this->fetch->fetchDistribuidores($data);
	    print_r($info);
	}

	// Guardar Distribuidor //
	public function AddDistribuidor()
	{
		$data = $this->input->post();
		$AsignasionDivision = explode(",", $data['idDivision']);

		$Distribuidor = array('Nombre' =>  $data['Nombre'],
							'Apellidos' =>  $data['Apellidos'],
							'Empresa' =>  $data['Empresa'],
							'Alias' =>  $data['Alias'],
							'Coordinador' =>  $data['Coordinador'],
							'Director' =>  $data['Director'],
							'Cargo' =>  $data['Cargo'],
							'Calle_numero' =>  $data['Calle_numero'],
							'Colonia' =>  $data['Colonia'],
							'Ciudad' =>  $data['Ciudad'],
							'Municipio' =>  $data['Municipio'],
							'Estado' =>  $data['Estado'],
							'Pais' =>  $data['Pais'],
							'CP' =>  $data['CP'],
							'RFC' =>  $data['RFC'],
							'Tel1' =>  $data['Tel1'],
							'Tel2' =>  $data['Tel2'],
							'Email' => $data['Email'],
							'Descuento_%' =>  $data['Descuento_%'],
							'Status' =>  $data['Status'],
							'idSucursal' =>  $data['idSucursal'],
							'Contrasena' =>  $data['Contrasena'],
							'Dia_entrega' =>  $data['Dia_entrega'],
							'Region' => $data['Region'],
							'Zona' => $data['Zona'],
							'Puntos' => 0,
							'Idioma' => $data['Idioma'],
							'Fecha_ingreso' => date("Y-m-d"),
							'Impuesto' => $data['Impuesto'],
							'Generar_puntos' => $data['Generar_puntos'],
							'Minimo_envio' =>  $data['MinimoEnvio'],
							'Cuota' =>  $data['Cuota'],
							'Facturacion' =>  $data['Facturacion'],
							'Minimo_Compra' =>  $data['Minimo_Compra'],
							'Cuota_Inicial' =>  $data['Cuota_Inicial'],
							'Cuota_Final' =>  $data['Cuota_Final'],
							'Meses_Actuales' =>  $data['Meses_Actual'],
							'Meses_Cuota' =>  $data['Meses_Cuota'],
							'idBloque' =>  $data['idBloque'],
							'Guia_Envio_Auto' =>  $data['Guia_Envio_Auto'],
							'Banderazo' =>  $data['Banderazo']);

		$info = $this->distribuidor->AddDistribuidor($Distribuidor,$AsignasionDivision);

		print_r($info);		 
	}

	// Obtener Información Dirección Envio //
	public function getInfoDireccionEnvio()
	{	
		$data = $this->input->post();
		$info = $this->distribuidor->getInfoDireccionEnvio($data['idCliente']);
	    print_r(json_encode($info));
	}

	// Obtener Distribuidor By ID //
	public function getDistribuidorById()
	{
		$data = $this->input->post();
	    $info['Cliente']    = $this->distribuidor->getDistribuidorById($data['idCliente']);
	    $info['Asignacion'] = $this->distribuidor->getAsignacionDivision($data['idCliente']);
	    print_r(json_encode($info));
	}

	// Update Distribuidor //
	public function UpdateDistribuidor()
	{
		$data = $this->input->post(); 

		$fecha = date('Y-m-d');
        $fechainicial = new DateTime($fecha);
        $fechafinal = new DateTime($data['Banderazo']);
        $diferencia = $fechainicial->diff($fechafinal);
        $meses = ( $diferencia->y * 12 ) + $diferencia->m;

		if (intval($data['Meses_Cuota']) == 0){
            $Cuota_Mensual = ((floatval($data['Cuota_Final']) - floatval($data['Cuota_Inicial'])) / 1) * intval($meses) + floatval($data['Cuota_Inicial']);
        }
        else{
            $Cuota_Mensual = ((floatval($data['Cuota_Final']) - floatval($data['Cuota_Inicial'])) / intval($data['Meses_Cuota'])) * intval($meses) + floatval($data['Cuota_Inicial']);
        }


		$AsignasionDivision = explode(",", $data['idDivision']);

		$Distribuidor = array('Nombre' =>  $data['Nombre'],
							'Apellidos' =>  $data['Apellidos'],
							'Empresa' =>  $data['Empresa'],
							'Alias' =>  $data['Alias'],
							'Coordinador' =>  $data['Coordinador'],
							'Director' =>  $data['Director'],
							'Cargo' =>  $data['Cargo'],
							'Calle_numero' =>  $data['Calle_numero'],
							'Colonia' =>  $data['Colonia'],
							'Ciudad' =>  $data['Ciudad'],
							'Municipio' =>  $data['Municipio'],
							'Estado' =>  $data['Estado'],
							'Pais' =>  $data['Pais'],
							'CP' =>  $data['CP'],
							'RFC' =>  $data['RFC'],
							'Tel1' =>  $data['Tel1'],
							'Tel2' =>  $data['Tel2'],
							'Email' => $data['Email'],
							'Descuento_%' =>  $data['Descuento_%'],
							'Status' =>  $data['Status'],
							'idSucursal' =>  $data['idSucursal'],
							'Contrasena' =>  $data['Contrasena'],
							'Dia_entrega' =>  $data['Dia_entrega'],
							'Region' => $data['Region'],
							'Zona' => $data['Zona'],
							'Puntos' => $data['Puntos'],
							'Idioma' => $data['Idioma'],
							'Impuesto' => $data['Impuesto'],
							'Generar_puntos' => $data['Generar_puntos'],
							'Minimo_envio' =>  $data['MinimoEnvio'],
							'Cuota' =>  $Cuota_Mensual,
							'Facturacion' =>  $data['Facturacion'],
							'Minimo_Compra' =>  $data['Minimo_Compra'],
							'Cuota_Inicial' =>  $data['Cuota_Inicial'],
							'Cuota_Final' =>  $data['Cuota_Final'],
							'Meses_Actuales' =>  $meses,
							'Meses_Cuota' =>  $data['Meses_Cuota'],
							'idBloque' =>  $data['idBloque'],
							'Guia_Envio_Auto' =>  $data['Guia_Envio_Auto'],
							'Banderazo' => $data['Banderazo']);


		$info = $this->distribuidor->UpdateDistribuidor($Distribuidor,$data['ID'],$AsignasionDivision);
		print_r($info);
	}

	// Eliminar Distribuidor //
	public function deleteDistrbuidor()
	{
		$data = $this->input->post();
		$info = $this->distribuidor->deleteDistrbuidor($data['ID']);
	    print_r($info);
	}

	// Accion Agregar Dirección Envio //
	public function Add_Direccion()
	{
		$data = $this->input->post();
		$info = $this->distribuidor->Add_Direccion($data);
	    print_r($info);
	}

	// Obtener Direcciones Envio By idCliente //
	public function getDirecciones()
	{
		$data = $this->input->post();
		$info = $this->distribuidor->getDirecciones($data['ID']);
	    print_r(json_encode($info));
	}

	// Acción Modificar Dirección Envio //
	public function Update_Direccion()
	{
		$data = $this->input->post();
		$info = $this->distribuidor->Update_Direccion($data);
	    print_r($info);
	}

	// Cerrar Sesión //
	public function cerrarSesion(){
	    session_destroy();
	    redirect('Controller_Login');
	}

	public function Get_Direcion_Envio()
	{
		$data = $this->input->post();
		$info['Direccion'] = $this->distribuidor->Get_Direcion_Envio($data['ID']);
	    print_r(json_encode($info));
	}

	

	public function delete_Direccion()
	{
		$data = $this->input->post();
		$info = $this->distribuidor->delete_Direccion($data);
	    print_r($info);
	}

	public function getDirrecion()
	{
		$data = $this->input->post();
		$info = $this->distribuidor->getDirrecion($data['id']);
	    print_r(json_encode($info));
	}

	public function Guardar_Distribuidor()
	{
		$data = $this->input->post();

		$AsignasionDivision = explode(",", $data['idDivision']);

		$Distribuidor = array('Nombre' =>  $data['Nombre'],
							'Apellidos' =>  $data['Apellidos'],
							'Empresa' =>  $data['Empresa'],
							'Cargo' =>  $data['Cargo'],
							'Calle_numero' =>  $data['Calle_numero'],
							'Colonia' =>  $data['Colonia'],
							'Ciudad' =>  $data['Ciudad'],
							'Municipio' =>  $data['Municipio'],
							'Estado' =>  $data['Estado'],
							'Pais' =>  $data['Pais'],
							'CP' =>  $data['CP'],
							'RFC' =>  $data['RFC'],
							'Tel1' =>  $data['Tel1'],
							'Tel2' =>  $data['Tel2'],
							'Email' => $data['Email'],
							'Descuento_%' =>  $data['Descuento_%'],
							'Status' =>  $data['Status'],
							'idSucursal' =>  $data['idSucursal'],
							'Contrasena' =>  $data['Contrasena'],
							'Dia_entrega' =>  $data['Dia_entrega'],
							'Region' => $data['Region'],
							'Zona' => $data['Zona'],
							'Puntos' => 0,
							'Idioma' => $data['Idioma'],
							'Fecha_ingreso' => $data['Fecha_ingreso'],
							'Impuesto' => $data['Impuesto'],
							'Generar_puntos' => $data['Generar_puntos'],
							'Minimo_envio' =>  $data['MinimoEnvio'],
							'Cuota' =>  $data['Cuota'],
							'Facturacion' =>  $data['Facturacion'],
							'Minimo_Compra' =>  $data['Minimo_Compra'],
							'Cuota_Inicial' =>  $data['Cuota_Inicial'],
							'Cuota_Final' =>  $data['Cuota_Final'],
							'Meses_Actuales' =>  $data['Meses_Actual'],
							'Meses_Cuota' =>  $data['Meses_Cuota'],
							'idBloque' =>  $data['idBloque']);

		  $Result          = $this->distribuidor->Add_Distribuidor($Distribuidor,$AsignasionDivision);

		  if ($Result == 1)
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

	public function Editar_Distribuidor()
	{
		$data = $this->input->post();

		print_r($data);
		exit();

		$AsignasionDivision = explode(",", $data['idDivision']);

		$Distribuidor = array('Nombre' =>  $data['Nombre'],
							'Apellidos' =>  $data['Apellidos'],
							'Empresa' =>  $data['Empresa'],
							'Cargo' =>  $data['Cargo'],
							'Calle_numero' =>  $data['Calle_numero'],
							'Colonia' =>  $data['Colonia'],
							'Ciudad' =>  $data['Ciudad'],
							'Municipio' =>  $data['Municipio'],
							'Estado' =>  $data['Estado'],
							'Pais' =>  $data['Pais'],
							'CP' =>  $data['CP'],
							'RFC' =>  $data['RFC'],
							'Tel1' =>  $data['Tel1'],
							'Tel2' =>  $data['Tel2'],
							'Email' => $data['Email'],
							'Descuento_%' =>  $data['Descuento_%'],
							'Status' =>  $data['Status'],
							'idSucursal' =>  $data['idSucursal'],
							'Contrasena' =>  $data['Contrasena'],
							'Dia_entrega' =>  $data['Dia_entrega'],
							'Region' => $data['Region'],
							'Zona' => $data['Zona'],
							'Puntos' => $data['Puntos'],
							'Idioma' => $data['Idioma'],
							'Fecha_ingreso' => $data['Fecha_ingreso'],
							'Impuesto' => $data['Impuesto'],
							'Generar_puntos' => $data['Generar_puntos'],
							'Minimo_envio' =>  $data['MinimoEnvio'],
							'Cuota' =>  $data['Cuota'],
							'Facturacion' =>  $data['Facturacion'],
							'Minimo_Compra' =>  $data['Minimo_Compra'],
							'Cuota_Inicial' =>  $data['Cuota_Inicial'],
							'Cuota_Final' =>  $data['Cuota_Final'],
							'Meses_Actuales' =>  $data['Meses_Actual'],
							'Meses_Cuota' =>  $data['Meses_Cuota'],
							'idBloque' =>  $data['idBloque']);

		  $Result          = $this->distribuidor->Update_Distribuidor($Distribuidor,$data['ID'],$AsignasionDivision);

		  if ($Result == 1)
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

	public function Eliminar_Distribuidor()
	{
		$data = $this->input->post();

		$Result          = $this->distribuidor->Eliminar_Distribuidor($data['ID']);

		  if ($Result > 0)
		  {
		  	print_r("Correcto");
		  	exit();
		  }
		  else if ($Resul == 0)
		  {
		  	print_r("neutro");
		  	exit();
		  }
		  else
		  {
		  	print_r("Incorrecto");
		  	exit();
		  }
	}

	public function Get_Distribuidor_by_Id()
	{
		$data = $this->input->post();

	    $info['Cliente']    = $this->distribuidor->Get_Distribuidor_by_Id($data['ID']);
	    $info['Asignacion'] = $this->distribuidor->getAsignacionDivision($data['ID']);

	    print_r(json_encode($info));
	}

}