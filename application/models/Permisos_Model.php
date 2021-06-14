<?php

	date_default_timezone_set('America/Mexico_City');

	class Permisos_Model extends CI_Model 
	{
		public function __construct() 
	    {
	        parent::__construct();
	    }

	    // Obtener Roles Activos //
	    public function getRoles()
	    {
	    	
	        $this->db->select('*'); 
	        $this->db->from('Roles');
	        $this->db->where('Status','Activo');
	        $query = $this->db->get();
	        return $query->result_array();
	    }

	    // Obtener Permisos Activos //
	    public function fetchPermisos()
	    {
	    	
	        $this->db->select('*'); 
	        $this->db->from('Permisos');
	        $this->db->where('Status','Activo');
	        $query = $this->db->get();
	        return $query->result_array();
	    }

	    // Obtener Permisos Activos (By idRol) //
	    public function fetchPermisosRol($idrol)
	    {
	    	
	        $this->db->select('P.*'); 
	        $this->db->from('Asignacion_Permisos AS AP');
	        $this->db->join('Permisos AS P','AP.idPermiso = P.ID');
	        $this->db->where('P.Status','Activo');
	        $this->db->where('AP.idRol',$idrol);
	        $query = $this->db->get();
	        return $query->result_array();
	    }

	    // Transactions Agregar Rol //
	    public function addRol($data)
	    {
			$idPermiso = explode(",", $data['idPermisos']);

			$this->db->trans_start();
			$this->db->trans_strict(FALSE);

			$Roles = array('Rol' => $data['Rol'],
							'Status' => 'Activo');

			// Insert Roles //
			$this->db->insert('Roles', $Roles);
			$idRol = $this->db->insert_id();

			for ($i=0; $i < count($idPermiso); $i++){ 
				
				$Permisos = array('idRol' => $idRol,
									'idPermiso' => $idPermiso[$i]);

				// Insert Permisos //
				$this->db->insert('Asignacion_Permisos', $Permisos);
			}

			$this->db->trans_complete();

			if ($this->db->trans_status() === FALSE) {
				$this->db->trans_rollback();
				return 0;
			} 
			else {
				$this->db->trans_commit();
				return 1;
			}
	    }

	    // Transactions Modificar Rol //
	    public function updateRol($data)
	    {

			$idPermiso = explode(",", $data['idPermisos']);

			$this->db->trans_start();
			$this->db->trans_strict(FALSE);

			// Delete Permisos Asignados al rol //
			$this->db->where('idRol', $data['idRol']);
			$this->db->delete('Asignacion_Permisos');

			for ($i=0; $i < count($idPermiso); $i++){ 
				
				$Permisos = array('idRol' => $data['idRol'],
									'idPermiso' => $idPermiso[$i]);

				// Insert Permisos //
				$this->db->insert('Asignacion_Permisos', $Permisos);
			}

			$this->db->trans_complete();

			if ($this->db->trans_status() === FALSE) {
				$this->db->trans_rollback();
				return 0;
			} 
			else {
				$this->db->trans_commit();
				return 1;
			}
	    }

	    // Transactions Eliminar Rol //
	    public function deleteRol($idrol)
	    {
	    	$this->db->trans_start();
			$this->db->trans_strict(FALSE);

			// Update Roles //
			$this->db->where('ID',$idrol);
			$this->db->set('Status', 'Inactivo');
			$this->db->update('Roles');

			$this->db->trans_complete();

			if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
			    return 0;
			} 
			else {
			    $this->db->trans_commit();
			    return 1;
			}
	    }

	    // Validar Rol Existente //
	    public function validateRol($rol)
	    {
	    	
	        $this->db->select('ID'); 
	        $this->db->from('Roles');
	        $this->db->like('Rol', $rol);
	        return $this->db->get()->num_rows();	         
	    }

	    // Validar Rol Existente  ignarando idRol Seleccionado//
	    public function validateRolEditar($rol,$idrol)
	    {
	    	
	        $this->db->select('*'); 
	        $this->db->from('Roles');
	        $this->db->like('Rol', $rol);
	        $this->db->where('ID !=', $idrol);
	        return $this->db->get()->num_rows();	         
	    }

	    // Obtener N° Total de Permisos Existentes //
	    public function countPermisos()
	    {
	    	
	        $this->db->select('*'); 
	        $this->db->from('Permisos');
	        $this->db->where('Status','Activo');
	        return $this->db->get()->num_rows();	         
	    }
	}
?>
