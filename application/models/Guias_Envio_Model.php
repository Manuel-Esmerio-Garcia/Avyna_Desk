<?php

class Guias_Envio_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
       // $this->load->database();
        parent::__construct();
    }

    public function getGuiaDescripcion($id)
    {
    	
        $this->db->select('*'); 
        $this->db->from('Guia_description');
        $this->db->where('idGuiaEnvio', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function getDireccionGuia($id)
    {
    	
        $this->db->select('*'); 
        $this->db->from('Direccion_envio_guia');
        $this->db->where('idGuiaDescription', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

}

?>