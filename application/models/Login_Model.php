<?php

date_default_timezone_set('America/Mexico_City');

class Login_Model extends CI_Model 
{
    public function __construct() 
    {
       // Inicializa la Clase de la Base de Datos.
        $this->load->database();
        $this->load->library('user_agent');
        parent::__construct();
    }

    // Valición Credenciales //
    public function signIn($data)
    {
        
        $this->db->select('U.*, E.noCertificado, E.Clave_Regimen_Fiscal'); 
        $this->db->from('Usuarios AS U');
        $this->db->Join('Empresa AS E','U.Empresa = E.ID');
        $this->db->where('U.Email', $data['username']);
        $this->db->where('U.Password', $data['pass']);
        $this->db->where('E.ID', 1);
        $query = $this->db->get();
        $result = $query->result_array();
        $listUsuario = $result;

        if ($listUsuario != null)
        {                  
            $this->getPermisos($data['username'],$data['pass']);
            $this->listPermisos($data['username'],$data['pass']);
            $this->asignacionRegion($listUsuario[0]['ID']);
            $_SESSION['Avyna'] = $listUsuario;

            return $listUsuario;
        }
        else
        {
            return $listUsuario;
        }        
    }

    // Obtener Regiones del _Usuario //
    public function asignacionRegion($id)
    {
        
        $this->db->select('*'); 
        $this->db->from('Asignacion_region');
        $this->db->where('idUsuario',$id);
        $query = $this->db->get();
        $result = $query->result_array();
        $region = $result;

        $_SESSION['Region'] = $region;
    }

    // Obtener Permisos del Usuario //
    public function getPermisos($email,$password)
    {
        
        $this->db->select('P.*'); 
        $this->db->from('Usuarios AS U');
        $this->db->Join('Empresa AS E','U.Empresa = E.ID');
        $this->db->Join('Asignacion_Permisos AS AP','U.idRol = AP.idRol');
        $this->db->Join('Permisos AS P','AP.idPermiso = P.ID');
        $this->db->where('U.Email', $email);
        $this->db->where('U.Password', $password);
        $this->db->where('P.Status', 'Activo');
        $this->db->where('E.ID', 1);
        $query = $this->db->get();
        $result = $query->result_array();

        $_SESSION['Permisos'] = $result;
    }

    // Obtener listado de permisos agrupado por Modulo //
    public function listPermisos($email,$password)
    {
        
        $this->db->select('P.*'); 
        $this->db->from('Usuarios AS U');
        $this->db->Join('Empresa AS E','U.Empresa = E.ID');
        $this->db->Join('Asignacion_Permisos AS AP','U.idRol = AP.idRol');
        $this->db->Join('Permisos AS P','AP.idPermiso = P.ID');
        $this->db->where('U.Email', $email);
        $this->db->where('U.Password', $password);
        $this->db->where('P.Status', 'Activo');
        $this->db->where('E.ID', 1);
        $this->db->group_by('P.Modulo');
        $query = $this->db->get();
        $result = $query->result_array();

        $_SESSION['listPermisos'] = $result;
    }
}