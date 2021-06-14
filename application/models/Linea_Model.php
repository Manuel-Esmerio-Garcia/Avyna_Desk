<?php

class Linea_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
       // $this->load->database();
        parent::__construct();

    }

    // Obtener Linea //
    public function getLinea()
    {
    	
        $this->db->distinct();
        $this->db->select('ID, Linea');
        $this->db->from('Lineas');
        $this->db->order_by('Linea', 'asc');
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Obtener Linea By idDivision//
    public function getLineaByIdDivision($id)
    {
        
        $this->db->distinct();
        $this->db->select('ID, Linea');
        $this->db->from('Lineas');
        $this->db->where('idDivision',$id);
        $this->db->order_by('Linea', 'asc');
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }
}