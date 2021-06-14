<?php

class Bloques_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
        $this->load->database();
        parent::__construct();
    }

    public function AddBloques($data)
    {
    	$this->db->trans_start(); # Starting Transaction

		$this->db->insert('Bloques_distribuidores', $data); # Inserting data

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

    public function EditBloques($data)
    {
    	$Bloques = array('Bloque' => $data['Bloque'],
    	 				'Descripcion' => $data['Descripcion'],
    	 				'Status' => $data['Status']);

    	$this->db->trans_start(); # Starting Transaction
		# Updating data
		$this->db->where('ID', $data['ID']);
		$this->db->update('Bloques_distribuidores', $Bloques); 

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

    public function DeleteBloques($data)
    {
    	$Bloques = array('Status' => 'Inactivo');

    	$this->db->trans_start(); # Starting Transaction
		# Updating data
		$this->db->where('ID', $data['ID']);
		$this->db->update('Bloques_distribuidores', $Bloques); 

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