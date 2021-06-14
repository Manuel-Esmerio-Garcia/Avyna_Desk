<?php

class Zonas_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
        $this->load->database();
        parent::__construct();
    }

    public function Get_Bloque()
    {
    	
        $this->db->select('*'); 
        $this->db->from('Bloques_distribuidores');
        $this->db->where('Status', 'Activo');
        $this->db->order_by("Bloque", "ASC");
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Cliente()
    {
    	
        $this->db->select('*'); 
        $this->db->from('Clientes');
        $this->db->where('Status', 'Activo');
        $this->db->order_by("Nombre", "ASC");
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Add_Zona($data)
    {
    	$this->db->trans_start(); # Starting Transaction

		$this->db->insert('Zonas_distribuidores', $data); # Inserting data

		$this->db->trans_complete(); # Completing transaction

		if ($this->db->trans_status() === FALSE) {
		    # Something went wrong.
		    $this->db->trans_rollback();
		    return 0;
		} 
		else {
		    # Everything is Perfect. 
		    # Committing data to the database.
		    $this->db->trans_commit();
		    return 1;
		}
    }

    public function Edit_Zona($data)
    {
    	$idBloque = empty($data['idBloque']) ? NULL : $data['idBloque']; 
    	$idCliente = empty($data['idCliente']) ? NULL : $data['idCliente'];

    	if ($data['idBloque'] == 'null' && $data['idCliente'] == 'null') {
    		
    		$Zonas = array('Zona' => $data['Zona'],
    	 				'Descripcion' => $data['Descripcion'],
    	 				'Poblacion' => $data['Poblacion'],
    	 				'idBloque' => NULL,
    	 				'idCliente' => NULL,
    	 				'CuotaFinal' => $data['CuotaFinal'],
    	 				'Status' => $data['Status']);

    	}else if ($data['idCliente'] == 'null') {
    		
    		$Zonas = array('Zona' => $data['Zona'],
    	 				'Descripcion' => $data['Descripcion'],
    	 				'Poblacion' => $data['Poblacion'],
    	 				'idBloque' => $idBloque,
    	 				'idCliente' => NULL,
    	 				'CuotaFinal' => $data['CuotaFinal'],
    	 				'Status' => $data['Status']);

    	}else if ($data['idBloque'] == 'null') {
    		
    		$Zonas = array('Zona' => $data['Zona'],
    	 				'Descripcion' => $data['Descripcion'],
    	 				'Poblacion' => $data['Poblacion'],
    	 				'idBloque' => NULL,
    	 				'idCliente' => $idCliente,
    	 				'CuotaFinal' => $data['CuotaFinal'],
    	 				'Status' => $data['Status']);
    	}else{

    		$Zonas = array('Zona' => $data['Zona'],
    	 				'Descripcion' => $data['Descripcion'],
    	 				'Poblacion' => $data['Poblacion'],
    	 				'idBloque' => $idBloque,
    	 				'idCliente' => $idCliente,
    	 				'CuotaFinal' => $data['CuotaFinal'],
    	 				'Status' => $data['Status']);
    	}

    	$this->db->trans_start(); # Starting Transaction
		# Updating data
		$this->db->where('ID', $data['ID']);
		$this->db->update('Zonas_distribuidores', $Zonas); 

		$this->db->trans_complete(); # Completing transaction

		/*Optional*/

		if ($this->db->trans_status() === FALSE) {
		    # Something went wrong.
		    $this->db->trans_rollback();
		    return 0;
		} 
		else {
		    # Everything is Perfect. 
		    # Committing data to the database.
		    $this->db->trans_commit();
		    
		    return 1;
		}
    }

    public function Delete_Zona($data)
    {
    	$this->db->trans_start(); # Starting Transaction
		# Updating data
		$this->db->where('ID', $data['ID']);
		$this->db->set('Status', 'Inactivo');
		$this->db->update('Zonas_distribuidores'); 

		$this->db->trans_complete(); # Completing transaction

		/*Optional*/

		if ($this->db->trans_status() === FALSE) {
		    # Something went wrong.
		    $this->db->trans_rollback();
		    return 0;
		} 
		else {
		    # Everything is Perfect. 
		    # Committing data to the database.
		    $this->db->trans_commit();
		    return 1;
		}
    }
}

?>