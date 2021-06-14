<?php
class Moneda_Model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	// Obtener todas las monedas //
	public function getMonedas()
	{
		
		$this->db->select('*'); 
		$this->db->from('Monedas');
		$query = $this->db->get();
		$result = $query->result_array();
		return $result;
	}

	public function getMonedaById($ClaveSAT)
	{
		
		$this->db->select('*'); 
		$this->db->from('Monedas');
		$this->db->where('ClaveSAT', $ClaveSAT);
		$query = $this->db->get();
		$result = $query->result_array();
		return $result;
	}

}