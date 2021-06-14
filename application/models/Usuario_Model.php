<?php
class Usuario_Model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

    //// Validar Correo Usuario ////
    public function validateCorreo($Email)
    {
        
        $this->db->select('Email'); 
        $this->db->from('Usuarios');
        $this->db->where('Email', $Email);            
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    public function validateCorreoEditar($data)
    {
        
        $this->db->select('*'); 
        $this->db->from('Usuarios');
        $this->db->where('Email', $data['Email']); 
        $this->db->where('ID !=', $data['idUsuario']);            
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    // Obtener Usuario By IdUsuario //
    public function getUsuarioById($idUsuario)
    {
        
        $this->db->select('*'); 
        $this->db->from('Usuarios');
        $this->db->where('ID', $idUsuario);            
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    // Obtener Regiones By IdUsuario //
    public function getRegionById($idUsuario)
    {
        
        $this->db->select('*'); 
        $this->db->from('Asignacion_region');
        $this->db->where('idUsuario', $idUsuario);            
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    // Model Funcion Guardar //
    public function addUsuario($data,$Region)
    {
        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well

        
        $this->db->insert('Usuarios', $data);
        $insert_id = $this->db->insert_id();

        if ($Region != null){
            for ($i=0; $i < count($Region); $i++){ 
                $Asignar_Region = array('idUsuario' => $insert_id,
                                'Region' => $Region[$i]);
                $this->db->insert('Asignacion_region', $Asignar_Region);
            }
        }

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    // Acción Modificar Usuario //
    public function updateUsuario($data,$Region)
    {
        $ID = $data['ID'];
        unset($data['ID']);

        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well

        
        $this->db->where('ID',$ID);
        $this->db->update('Usuarios', $data);

        $this->db->query('DELETE FROM Asignacion_region WHERE idUsuario = '.$ID.'');

        if ($Region != null){
            for ($i=0; $i < count($Region); $i++){ 
                $arrayName = array('idUsuario' => $ID,
                                'Region' => $Region[$i]);
                $this->db->insert('Asignacion_region', $arrayName);
            }
        }

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    // Acción Eliminar Usuario //
    public function deleteUsuario($idUsuario)
    {
        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well

        
        $this->db->where('ID',$idUsuario);
        $this->db->set('Status', 'Inactivo');
        $this->db->update('Usuarios');

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }




    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////

	public function Get_Usuario($id)
	{
		
        $this->db->select('*'); 
        $this->db->from('Usuarios');
        $this->db->where('ID',$id);
        $query = $this->db->get();
        return $query->result_array();
	}

	public function Get_Region($id)
	{
		
        $this->db->select('*'); 
        $this->db->from('Asignacion_region');
        $this->db->where('idUsuario',$id);
        $query = $this->db->get();
        return $query->result_array();
	}

	public function Eliminar_Usuario($id)
	{
		$this->db->trans_begin();

        
        $this->db->where('ID',$id);
        $this->db->set('Status', 'Inactivo');
        $this->db->update('Usuarios');

        if ($this->db->trans_status() === FALSE)
        {
                $this->db->trans_rollback();
                return 0;
        }
        else
        {
                $this->db->trans_commit();
                return 1;
        }
	}

	public function Editar_Usuario($data,$Region,$ID)
	{
		$this->db->trans_begin();

        
        $this->db->where('ID',$ID);
        $this->db->update('Usuarios', $data);

        $this->db->query('DELETE FROM Asignacion_region WHERE idUsuario = '.$ID.'');

        if ($Region != null)
        {
            for ($i=0; $i < count($Region); $i++)
            { 
                $arrayName = array('idUsuario' => $ID,
                                'Region' => $Region[$i]);

                $this->db->insert('Asignacion_region', $arrayName);
            }
        }

        if ($this->db->trans_status() === FALSE)
        {
                $this->db->trans_rollback();
                return 0;
        }
        else
        {
                $this->db->trans_commit();
                return 1;
        }
	}

	public function Guardar_Usuario($data,$Region)
	{
		$this->db->trans_begin();

        
        $this->db->insert('Usuarios', $data);
        $insert_id = $this->db->insert_id();


        if ($Region != null)
        {
            for ($i=0; $i < count($Region); $i++)
            { 
            	$arrayName = array('idUsuario' => $insert_id,
             					'Region' => $Region[$i]);

            	$this->db->insert('Asignacion_region', $arrayName);
            }
        }

        if ($this->db->trans_status() === FALSE)
        {
                $this->db->trans_rollback();
                return 0;
        }
        else
        {
                $this->db->trans_commit();
                return 1;
        }
	}
}