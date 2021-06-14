<?php

date_default_timezone_set('America/Mexico_City');

class Recolecciones_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
        $this->load->database();
        parent::__construct();
    }

    // Obtener info Recoleccion By Guia //
    public function getinfoRecoleccionByGuia($Guia)
    {
    	
        $this->db->select('*'); 
        $this->db->from('Empaque_general');
        $this->db->where('Numero_guia',$Guia);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener info Detalle Recoleccion By Guia //
    public function getDetalleRecoleccion($Guia)
    {
    	
        $this->db->select('*'); 
        $this->db->from('Detalle_recoleccion_pedidos');
        $query = $this->db->get();
        return $query->result_array();
    }

    // Acción Agregar Recolección //
    public function AddRecoleccion($data)
    {
    	$this->db->trans_start();
		$this->db->trans_strict(FALSE);

		$this->db->select('*'); 
		$this->db->from('Detalle_recoleccion_pedidos');
		$this->db->where('idRecoleccion_pedidos IS NULL');
        $query = $this->db->get();
        $list =  $query->result_array();

		$Recoleccion_pedidos = array('idUsuario' => $data['idUsuario'],
	                                 'Fecha_hora' => date("Y-m-d H:i:s"),
	                             	 'Paqueteria' => $data['Paqueteria'],
	                             	 'Nombre_recolector' => $data['Nombre_recolector'],
	                             	 'Cantidad_paquetes' => count($list),
	                             	 'Status' => 'Pendiente');

		$this->db->insert('Recoleccion_pedidos', $Recoleccion_pedidos);
		$insert_id = $this->db->insert_id();

		$this->db->where('idRecoleccion_pedidos IS NULL');
		$this->db->set('idRecoleccion_pedidos',$insert_id);
    	$this->db->update('Detalle_recoleccion_pedidos');

		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE) {
		    # Something went wrong.
		    $this->db->trans_rollback();
		    return 0;
		} 
		else {
		    # Everything is Perfect. 
		    # Committing data to the database.
		    $this->db->trans_commit();
		    return $insert_id;
		}
    }

    // Acción Editar Recolección //
    public function btnEditarRecoleccion($data)
    {
    	$this->db->trans_start();
		$this->db->trans_strict(FALSE);

		$this->db->where('ID',$data['ID']);
		$this->db->set('Status',$data['Status']);
    	$this->db->update('Recoleccion_pedidos');

		$this->db->trans_complete();

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

    // Acción Eliminar Recolección //
    public function deleteRecoleccion($data)
    {
    	$this->db->trans_start();
		$this->db->trans_strict(FALSE);

		$this->db->where('ID',$data['ID']);
		$this->db->set('Status','Inactivo');
    	$this->db->update('Recoleccion_pedidos');

		$this->db->trans_complete();

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

    // Acción Agregar CajaGuia //
    public function AddCajaGuia($data)
    {
    	$this->db->trans_start();
		$this->db->trans_strict(FALSE);

		$Empaque_general = $this->getinfoRecoleccionByGuia($data['Guia']);
		$Detalle_recoleccion = $this->getDetalleRecoleccion($data['Guia']);

		if (!empty($Empaque_general)) {
			if (!is_int(array_search($data['Guia'], array_column($Detalle_recoleccion, 'No_guia')))){
			
				$Detalle_recoleccion_pedidos = array('No_guia' => $Empaque_general[0]['Numero_guia'],
												 'idEmpaque_general' => $Empaque_general[0]['ID']);

				$this->db->insert('Detalle_recoleccion_pedidos', $Detalle_recoleccion_pedidos);
			}
			else{
				return 3;
			}
		}
		else{
			return 2;
		}

		$this->db->trans_complete();

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

    // Acción Eliminar Detalle Recolección //
    public function DeleteDetalleRecoleccion($data)
    {
    	$this->db->trans_start();
		$this->db->trans_strict(FALSE);

		$this->db->where('ID', $data['ID']);
		$this->db->delete('Detalle_recoleccion_pedidos');

		$this->db->trans_complete();

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