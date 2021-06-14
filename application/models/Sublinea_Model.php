<?php

class Sublinea_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
       // $this->load->database();
        parent::__construct();

    }

    // Obtener Sublinea //
    public function getSublinea()
    {
    	
        $this->db->distinct();
        $this->db->select('ID, Sublinea');
        $this->db->from('Sublineas');
        $this->db->order_by('Sublinea', 'asc');
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Obtener Sublinea By IdLinea//
    public function getSublineaByidLinea($idLinea)
    {
        
        $this->db->distinct();
        $this->db->select('ID, Sublinea');
        $this->db->from('Sublineas');
        $this->db->where('idLinea',$idLinea);
        $this->db->order_by('Sublinea', 'asc');
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }
}