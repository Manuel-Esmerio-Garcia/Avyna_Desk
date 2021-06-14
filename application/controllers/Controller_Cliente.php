<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Cliente extends CI_Controller {


   public function __construct() 
   {
      parent::__construct();

     if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

     $this->load->model('Cliente_Model', 'cliente');
  }

  public function index()
  {
      $Titulo = array('PageTitle' => 'Clientes');

      $data['Distribuidor'] = $this->cliente->Get_All_Distribuidor();

      $this->load->view('Componentes/Header', $Titulo);    
      $this->load->view('Catalogo/Clientes',$data);
      $this->load->view('Componentes/Footer');

  }

  /********************************************************************/
	/***   Función: csvClientes() 	                	                ***/
	/***   Autor: Manuel Esmerio Gacria					      	              ***/
	/***   Fecha: 21/02/2020    					                            ***/
	/***   Descripción: Exportar Cliente  CSV                         ***/
	/********************************************************************/
  public function csvClientes(){
    $data = $this->input->post();
    $info = $this->cliente->csvClientes($data);

    // output headers so that the file is downloaded rather than displayed
    header('Content-type: text/csv');
    header('Content-Disposition: attachment; filename="Reporte Clientes.csv"');
    header('Pragma: no-cache');
    header('Expires: 0');

    // create a file pointer connected to the output stream
    $file = fopen('php://output', 'w');
    // send the column headers
    fputcsv($file, array('ID', 'Nombre', 'Apellidos', 'Empresa', 'Cargo', 'Calle Numero', 'Colonia', 'Ciudad', 'Municipio', 'Estado','Pais','CP', 'RFC', 'Tel1', 'Tel2', 'Email','Descuento','Nivel','Status','Distribuidor'));

    for ($i=0; $i < count($info); $i++){ 
      fputcsv($file, $info[$i]);
    }
  }

  /********************************************************************/
	/***   Función: btnUnificar() 	                	                ***/
	/***   Autor: Manuel Esmerio Gacria					      	              ***/
	/***   Fecha: 19/11/2019    					                            ***/
	/***   Descripción: Boton Unificar Cliente                        ***/
	/********************************************************************/
	public function btnUnificar(){
		$data = json_decode(file_get_contents("php://input"),true);
		$info = $this->cliente->btnUnificar($data);
		print_r($info);
	}

  // Obtener Clientes Menudeo By Distyribuidor Clientes Directos //
  public function getClientesDirectos()
  {
    $info = $this->cliente->getClientesDirectos(261);
    print_r(json_encode($info));
  }

  public function getClientesByIdDistrbuidor(){
    $data = json_decode(file_get_contents("php://input"),true);
    $info = $this->cliente->getClientesByIdDistrbuidor($data['idDistribuidor']);
    print_r(json_encode($info));
  }

  // Obtener Cliente Menudeo By ID //
  public function getClientesMenudeosById()
  {
    $data = $this->input->post();
    $info = $this->cliente->getClientesMenudeosById($data['ID']);
    print_r(json_encode($info));
  }

  // Acción Agregar Cliente Menudeo //
  public function AddClienteMenudeo()
  {
    $data = $this->input->post();
    unset($data[0]);
    $info = $this->cliente->AddClienteMenudeo($data);
    print_r($info);
  }

  // Acción Agregar Cliente Menudeo //
  public function AddClienteMenudeoVentas(){
    $data = $this->input->post();
    unset($data[0]);
    $info = $this->cliente->AddClienteMenudeo($data);
    print_r($info);
  }

  public function Get_Info_Cliente(){
    $data = $this->input->post();
    $info = $this->cliente->Get_Info_Cliente($data['idCliente']);
    print_r(json_encode($info));
  }

public function Get_Top_5_Clientes()
{
  $data = $this->input->post();

  $info['Cliente'] = $this->cliente->Get_Top_5_Clientes();

  print_r(json_encode($info));
}

public function Eliminar_Clientes()
{
  $data = $this->input->post();

    $Result          = $this->cliente->Eliminar_Cliente($data['ID']);

      if ($Result  == 1)
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

public function Editar_Cliente()
{
  $data = $this->input->post();
  $Cliente = array();
  if (trim($data['Nivel']) == 'Black' || trim($data['Nivel']) == 'black' || trim($data['Nivel']) == 'BLACK') {

    $getSalon = $this->cliente->getSalonByIdCliete($data['ID']);

    if (empty($getSalon)) {

      $Salon = array('Salon' =>  $data['Empresa'],
      'Direccion' =>  $data['Calle_numero'].' '.$data['Colonia'].' '.$data['Ciudad'].' '.$data['Estado'].' '.$data['Pais'].' '.$data['CP'],
      'Encargado' =>  $data['Nombre']. ' '. $data['Apellidos'],
      'Telefono' =>  $data['Tel1'],
      'Correo' =>  $data['Email'],
      'Status' =>  'Activo',
      'idDistribuidor' => intval($data['idCliente']),
      'idCliente' => $data['ID']); 

      $ResultSalon          = $this->cliente->AddSalon($Salon);

      $userSalon = array('Nombre' =>  $data['Nombre'],
      'Apellidos' =>  $data['Apellidos'],
      'Password' =>  '12345',
      'Calle_numero' =>  $data['Calle_numero'],
      'Colonia' =>  $data['Colonia'],
      'Municipio' =>  $data['Municipio'],
      'Estado' =>  $data['Estado'],
      'Pais' =>  $data['Pais'],
      'CP' =>  $data['CP'],
      'Tel1' =>  $data['Tel1'],
      'Tel2' =>  $data['Tel2'],
      'Email' => $data['Email'],
      'Status' =>  $data['Status'],
      'IDSalon' =>  $ResultSalon,
      'Puesto' =>  'Administrador');

      $ResultUser          = $this->cliente->AddUsuarioSalon($userSalon);

      $caja = array('Nombre' =>  $data['Empresa'],
      'idSalon' =>  $ResultSalon,
      'Saldo_Inicial' =>  0.00,
      'Saldo_Final' =>  0.00);

      $ResultCaja          = $this->cliente->AddCajaSalones($caja);

      $Cliente = array('Nombre' =>  $data['Nombre'],
              'Apellidos' =>  $data['Apellidos'],
              'Empresa' =>  $data['Empresa'],
              'Cargo' =>  $data['Cargo'],
              'Calle_numero' =>  $data['Calle_numero'],
              'Colonia' =>  $data['Colonia'],
              'Referencias' =>  $data['Referencias'],
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
              'idCliente' =>  $data['idCliente'],
              'Nivel' =>  $data['Nivel'],
              'Semana' =>  $data['Semana'],
              'Dia' =>  $data['Dia'],
              'idSalon' => $ResultSalon);

    }
    else{
      $Cliente = array('Nombre' =>  $data['Nombre'],
              'Apellidos' =>  $data['Apellidos'],
              'Empresa' =>  $data['Empresa'],
              'Cargo' =>  $data['Cargo'],
              'Calle_numero' =>  $data['Calle_numero'],
              'Colonia' =>  $data['Colonia'],
              'Referencias' =>  $data['Referencias'],
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
              'idCliente' =>  $data['idCliente'],
              'Nivel' =>  $data['Nivel'],
              'Semana' =>  $data['Semana'],
              'Dia' =>  $data['Dia']);
    }
  }
  else{

    $Cliente = array('Nombre' =>  $data['Nombre'],
              'Apellidos' =>  $data['Apellidos'],
              'Empresa' =>  $data['Empresa'],
              'Cargo' =>  $data['Cargo'],
              'Calle_numero' =>  $data['Calle_numero'],
              'Colonia' =>  $data['Colonia'],
              'Referencias' =>  $data['Referencias'],
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
              'idCliente' =>  $data['idCliente'],
              'Nivel' =>  $data['Nivel'],
              'Semana' =>  $data['Semana'],
              'Dia' =>  $data['Dia']);
  }

  $response          = $this->cliente->Update_Cliente($Cliente,$data['ID']);

  if ($response > 0){
    print_r("Correcto");
    exit();
  }
  else{
    print_r("Incorrecto");
    exit();
  }
}

public function Guardar_Cliente(){
  $data = $this->input->post();

  $Cliente = array('Nombre' =>  $data['Nombre'],
  'Apellidos' =>  $data['Apellidos'],
  'Empresa' =>  $data['Empresa'],
  'Cargo' =>  $data['Cargo'],
  'Calle_numero' =>  $data['Calle_numero'],
  'Colonia' =>  $data['Colonia'],
  'Referencias' =>  $data['Referencias'],
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
  'idCliente' =>  $data['idCliente'],
  'Nivel' =>  $data['Nivel'],
  'Semana' =>  $data['Semana'],
  'Dia' =>  $data['Dia'],
  'Fecha_registro' =>  date("Y-m-d"));

  $Result          =  $this->cliente->Add_Cliente($Cliente);

  if (trim($data['Nivel']) == 'Black' || trim($data['Nivel']) == 'black' || trim($data['Nivel']) == 'BLACK') {

    $Salon = array('Salon' =>  $data['Empresa'],
    'Direccion' =>  $data['Calle_numero'].' '.$data['Colonia'].' '.$data['Ciudad'].' '.$data['Estado'].' '.$data['Pais'].' '.$data['CP'],
    'Encargado' =>  $data['Nombre']. ' '. $data['Apellidos'],
    'Telefono' =>  $data['Tel1'],
    'Correo' =>  $data['Email'],
    'Status' =>  'Activo',
    'idDistribuidor' => intval($data['idCliente']),
    'idCliente' => $Result); 

    $ResultSalon          = $this->cliente->AddSalon($Salon);

    $userSalon = array('Nombre' =>  $data['Nombre'],
    'Apellidos' =>  $data['Apellidos'],
    'Password' =>  '12345',
    'Calle_numero' =>  $data['Calle_numero'],
    'Colonia' =>  $data['Colonia'],
    'Municipio' =>  $data['Municipio'],
    'Estado' =>  $data['Estado'],
    'Pais' =>  $data['Pais'],
    'CP' =>  $data['CP'],
    'Tel1' =>  $data['Tel1'],
    'Tel2' =>  $data['Tel2'],
    'Email' => $data['Email'],
    'Status' =>  $data['Status'],
    'IDSalon' =>  $ResultSalon,
    'Puesto' =>  'Administrador');

    $ResultUser          = $this->cliente->AddUsuarioSalon($userSalon);

    $caja = array('Nombre' =>  $data['Empresa'],
    'idSalon' =>  $ResultSalon,
    'Saldo_Inicial' =>  0.00,
    'Saldo_Final' =>  0.00);

    $ResultCaja          = $this->cliente->AddCajaSalones($caja);

  }

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