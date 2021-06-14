<?php

class Marca_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
       // $this->load->database();
        parent::__construct();

    }

    // Obtener Marca //
    public function getMarca()
    {
    	
        $this->db->distinct();
        $this->db->select('ID, Marca');
        $this->db->from('Marcas');
        $this->db->order_by('Marca', 'asc');
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }
}