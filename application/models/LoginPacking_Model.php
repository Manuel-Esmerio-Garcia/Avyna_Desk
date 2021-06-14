<?php

date_default_timezone_set('America/Mexico_City');

class LoginPacking_Model extends CI_Model 
{
    public function __construct() 
    {
       // Inicializa la Clase de la Base de Datos.
        $this->load->database();
        $this->load->library('user_agent');
        parent::__construct();
    }

    // Valición Credenciales //
    public function signIn($data){
        
        $this->db->select('*'); 
        $this->db->from('Usuarios_pack');
        $this->db->where('Usuario', $data['username']);
        $this->db->where('Password', $data['pass']);
        $query = $this->db->get();
        $listUsuario = $query->result_array();
        
        $_SESSION['Avyna'] = $listUsuario;

        return $listUsuario;
    }
}