<?php

class Division_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
       // $this->load->database();
        parent::__construct();

    }

    // Obtener Division //
    public function getDivision()
    {
    	
        $this->db->distinct();
        $this->db->select('ID, Division');
        $this->db->from('Divisiones');
        $this->db->order_by('Division', 'asc');
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }
}