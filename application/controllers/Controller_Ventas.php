<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Ventas extends CI_Controller {


   public function __construct() 
   {
    parent::__construct();

   if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

    //$this->load->model('Cliente_Model', 'cliente');
   $this->load->model("Extracciones_Model","extracciones");
    $this->load->model('Ventas_Model', 'ventas');
    $this->load->model('Bodega_Model', 'bodega');
    $this->load->model('Distribuidores_Model', 'cliente');
    $this->load->helper('form');
}
  /********************************************************************/
  /***   Función: tableOthersExists() 	                				    ***/
  /***   Autor: Manuel Esmerio Gacria			        		      	      ***/
  /***   Fecha: 30/12/2019              					                  ***/
  /***   Descripción: Obtener Información de las Otras Salidas      ***/
  /********************************************************************/
  public function tableOthersExists(){
    $data = $this->input->post();
    $info = $this->ventas->tableOthersExists($data);
    print_r($info);
  }

  /********************************************************************/
  /***   Función: getDetailsOthers() 	                				      ***/
  /***   Autor: Manuel Esmerio Gacria			        		      	      ***/
  /***   Fecha: 30/12/2019              					                  ***/
  /***   Descripción: Obtener Detalle Otras Salidas                 ***/
  /********************************************************************/
  public function getDetailsOthers(){
    $info 	  = json_decode(file_get_contents("php://input"),true);
		$response = $this->ventas->getDetailsOthers($info);
		print_r(json_encode($response));
  }

  /********************************************************************/
  /***   Función: getLocations() 	                				          ***/
  /***   Autor: Manuel Esmerio Gacria			        		      	      ***/
  /***   Fecha: 30/12/2019              					                  ***/
  /***   Descripción: Obtener Detalle Otras Salidas                 ***/
  /********************************************************************/
  public function getLocations(){
    $info 	  = json_decode(file_get_contents("php://input"),true);
		$response = $this->ventas->getLocations($info);
		print_r(json_encode($response));
  }

  /********************************************************************/
  /***   Función: _openModalOthers() 	                	            ***/
  /***   Autor: Manuel Esmerio Gacria					      	              ***/
  /***   Fecha: 30/12/2019    					                            ***/
  /***   Descripción: Abrir Modal Otras Salidas        		          ***/
  /********************************************************************/
  public function openModalOthers(){
    $response = $this->ventas->openModalOthers();
		print_r(json_encode($response));
  }

  /********************************************************************/
  /***   Función: generar() 	                        	            ***/
  /***   Autor: Manuel Esmerio Gacria					      	              ***/
  /***   Fecha: 02/01/2020    					                            ***/
  /***   Descripción: Generar Otras Salidas            		          ***/
  /********************************************************************/
  public function generar(){
    $info 	  = json_decode(file_get_contents("php://input"),true);
		$response = $this->ventas->generar($info);
		print_r($response);
  }

  /********************************************************************/
  /***   Función: deleteOthers() 	                        	        ***/
  /***   Autor: Manuel Esmerio Gacria					      	              ***/
  /***   Fecha: 02/01/2020    					                            ***/
  /***   Descripción: Cancelar Otras Salidas           		          ***/
  /********************************************************************/
  public function deleteOthers(){
    $info 	  = json_decode(file_get_contents("php://input"),true);
		$response = $this->ventas->deleteOthers($info);
		print_r($response);
  }

public function index()
{

  $Titulo = array('PageTitle' => 'Ventas');

    $data['Sucursal']      = $this->extracciones->Get_Sucursales();
    $data['Distribuidor']  = $this->extracciones->Get_Distribuidor();

    $this->load->view('Componentes/Header', $Titulo);    
   $this->load->view('Manejo/Ventas/Ventas',$data);
   $this->load->view('Componentes/Footer');

}

public function Getinfo_Detalle_Venta_Menudeo()
{
    $data = $this->input->post();

    $info['Detalle'] = $this->ventas->Get_Detalle_Ventas_Menudeo($data['ID']);

    print_r(json_encode($info));
}

public function Get_Distribuidor()
{
      $data['Distribuidor']  = $this->extracciones->Get_Distribuidor();
      print_r(json_encode($data));
}

public function Eliminar_Venta()
{
  $data = $this->input->post();
  $Distribuidor   = $this->cliente->getDistribuidoresById($data['idDistribuidor']);
  $Bodega         = $this->bodega->getBodegaById($Distribuidor[0]['idSucursal']);
  $Ventas         = $this->ventas->getVentaById($data['ID']);

  if ($Bodega[0]['Permitir_Facturacion'] == 1) {
    if ($Ventas[0]['Timbrado'] == 0) {
      $info      = $this->ventas->Eliminar_Venta($data['ID']);
    }
    else{
      print_r(2);
      exit();
    }
  }
  else{
    $info      = $this->ventas->Eliminar_Venta($data['ID']);
  }
  
  print_r($info);

}

public function regresarVenta()
{
  $data = $this->input->post();
  $Distribuidor   = $this->cliente->getDistribuidoresById($data['idDistribuidor']);
  $Bodega         = $this->bodega->getBodegaById($Distribuidor[0]['idSucursal']);
  $Ventas         = $this->ventas->getVentaById($data['ID']);

  if ($Bodega[0]['Permitir_Facturacion'] == 1) {
    if ($Ventas[0]['Timbrado'] == 0) {
      $info      = $this->ventas->regresarVenta($data['ID']);
    }
    else{
      print_r(2);
      exit();
    }
  }
  else{
    $info      = $this->ventas->regresarVenta($data['ID']);
  }
  
  print_r($info);

}










































public function Eliminar_Venta_menudeo()
{
  $data = $this->input->post();

  $result      = $this->ventas->Eliminar_Venta_Menudeo($data['ID']);

  if ($result == 1)
  {
    print_r($result);
  }
  else
  {
    print_r("error_Eliminar");
    exit();
  }
}

public function Get_Count_Ventas()
{
    $data     = $this->input->post();
    $Contador['Contador'] = 0;

    $Contador['Cliente'] = $this->ventas->getClienteById($data['idCliente']);

    print_r(json_encode($Contador));
    exit();

    /*if ($Contador['Cliente'][0]['Facturacion'] == 1)
    {        
        $info = $this->ventas->Get_Count_Ventas($Contador['Cliente'][0]['ID']);

        for ($i=0; $i < count($info); $i++)
        { 
            if ($info[$i]['Timbrado'] == 0)
            {
                $Contador['Contador'] = 1;
                break;
            }
            else
            {
                $Contador['Contador'] = 0;
            }
        }

        print_r(json_encode($Contador));
        exit();
    }
    else
    {
        print_r(json_encode($Contador));
        exit();
    }*/
}

  public function enviarPedido()
  {
      $data = $this->input->post();

      //$Cliente = $this->ventas->getClienteById($data['idCliente']);

      //Validación no aplicable
      /*if (intval($Cliente[0]['Minimo_Compra']) == 'No aplica')
      {        
          if (floatval($data['Compra_minima']) >= floatval($Cliente[0]['Compra_minima'])) 
          {*/
              unset($data['Compra_minima']);
              $info  = $this->ventas->enviarPedido($data);
              print_r($info);  
          /*}
          else
          {
              print_r("3");
              exit();
          }*/
      /*}
      else
      {
          unset($data['Compra_minima']);
          $info  = $this->ventas->enviarPedido($data);
          print_r($info); 
      } */      
  }

}