<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class controller_Usuario extends CI_Controller {


   public function __construct() 
   {
    parent::__construct();

     if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

      $this->load->model('Usuario_Model', 'usuario');
      $this->load->model('Permisos_Model', 'permisos');
      $this->load->model('Login_Model', 'login');
      $this->load->model('Fetch_Model', 'fetch');
    	$this->load->helper('form');
    }

  public function index()
  {      
    $Titulo = array('PageTitle' => 'Usuarios');

    $info['Rol']  = $this->permisos->getRoles();

    $Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      'pass' =>  $_SESSION['Avyna'][0]['Password']);

    // Refrescar Permisos e información del usuario //
    $Session = $this->login->signIn($Usuario);

    if ($Session != null){  
      // Cargar Vista Inventario //
      $this->load->view('Componentes/Header', $Titulo);    
      $this->load->view('Catalogo/Usuario',$info);
      $this->load->view('Componentes/Footer');
    }
    else{
      // Cerrar Sesión //
      $this->cerrarSesion($Usuario);
    }
  }

  // Cargar DataTable Usaurio //
  public function fetchUsuario()
  {
    $data = $this->input->post();
    $info = $this->fetch->fetchUsuario($data);
    print_r($info);
  }

  // Validar Correo Igual en la BD //
  public function validateCorreo()
  {
    $data = $this->input->post();
    $info = $this->usuario->validateCorreo($data['Email']);
    print_r(json_encode($info));
  }

  // Validar Correo Igual al editar en la BD //
  public function validateCorreoEditar()
  {
    $data = $this->input->post();
    $info = $this->usuario->validateCorreoEditar($data);
    print_r(json_encode($info));
  }

  // Obtener Usuario By IdUsuario //
  public function getInfoUsuario()
  {
    $data = $this->input->post();
    $info['User'] = $this->usuario->getUsuarioById($data['idUsuario']);
    $info['Regi'] = $this->usuario->getRegionById($data['idUsuario']);
    print_r(json_encode($info));
  }

  // Agregar Usuario //
  public function addUsuario()
  {
    $data = $this->input->post();

    // Validamos si Region esta vacio //
    ($data['Region'] != null) ? $Region = explode(",", $data['Region']) : $Region  = null;
    unset($data['Region']);

    // Model Funcion Guardar //
    $info = $this->usuario->addUsuario($data,$Region);
    print_r($info);
  }
  // Editar Usuario //
  public function updateUsuario()
  {
    $data = $this->input->post();

    // Validamos si Region esta vacio //
    ($data['Region'] != null) ? $Region = explode(",", $data['Region']) : $Region  = null;
    unset($data['Region']);

    $info = $this->usuario->updateUsuario($data,$Region);
    print_r($info);
  }

  // Eliminar Usuario //
  public function deleteUsuario()
  {
    $data = $this->input->post();
    $info = $this->usuario->deleteUsuario($data['idUsuario']);
    print_r($info);
  }

  // Cerrar Sesión //
	public function cerrarSesion(){
    session_destroy();
    redirect('Controller_Login');
  }








  public function Get_Usuario()
  {
    $data = $this->input->post();

    $info['Usuario']  = $this->usuario->Get_Usuario($data['ID']);
    $info['Region']   = $this->usuario->Get_Region($data['ID']);
    print_r(json_encode($info));
  }

  public function Eliminar_Usuario()
  {
    $data = $this->input->post();

    $Result          = $this->usuario->Eliminar_Usuario($data['ID']);

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

  public function Editar_Usuario()
  {
    $data = $this->input->post();

    $ID = $data['ID'];

    unset($data['ID']);

      if ($data['Region'] != null)
      {
        $Region  = explode(",", $data['Region']);

        unset($data['Region']);
      }
      else
      {
         $Region  = null;
         unset($data['Region']);
      } 

    $Result          = $this->usuario->Editar_Usuario($data,$Region,$ID);

      if ($Result == 1)
      {

        if ($ID == $_SESSION['Avyna'][0]['ID'])
        {
          session_destroy();
          print_r("Correcto_destroy");
          exit();
        }
        else
        {
          print_r("Correcto");
          exit();
        }
        
      }
      else
      {
        print_r("Incorrecto");
        exit();
      }
  }

  public function Guardar_Usuario()
  {
    $data = $this->input->post();

    if ($data['Region'] != null)
    {
      $Region  = explode(",", $data['Region']);

      unset($data['Region']);
    }
    else
    {
       $Region  = null;
       unset($data['Region']);
    }  

    $Result          = $this->usuario->Guardar_Usuario($data,$Region);

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
	

}