<?php

class Proveedores_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
       // $this->load->database();
        parent::__construct();
    }

    // Obtener Proveedores By ID //
	public function getProveedorById($id)
    {
		
		$this->db->select('*'); 
		$this->db->from('Proveedores');
		$this->db->where('ID', $id);
		$query = $this->db->get();
        $result = $query->result_array();

		return $result;
    }

    // Obtener Proveedores //
    public function getProdveedores()
    {
    	
        $this->db->select('*'); 
        $this->db->from('Proveedores');
        $query = $this->db->get();
        return $query->result_array();
    }

    // Acción agregar proveedor //
    public function AddProveedor($data)
    {
        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->insert('Proveedores', $data);

        if ($this->db->trans_status() === FALSE)        {
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    // Acción editar proveedor //
    public function UpdateProveedor($data,$id)
    {
        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->where('ID',$id);
        $this->db->update('Proveedores', $data);

        if ($this->db->trans_status() === FALSE)        {
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    // Acción eliminar proveedor //
    public function DeleteProveedor($id)
    {
        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->where('ID',$id);
        $this->db->set('Status','Inactivo');
        $this->db->update('Proveedores');

        if ($this->db->trans_status() === FALSE)        {
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }
}