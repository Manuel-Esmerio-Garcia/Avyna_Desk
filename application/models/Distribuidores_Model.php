<?php
date_default_timezone_set('America/Mexico_City');

class Distribuidores_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
       // $this->load->database();
        parent::__construct();
    }

    /********************************************************************/
	/***   Función: btnUnificar() 	                	              ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 19/11/2019    					                  ***/
	/***   Descripción: Boton Unificar Cliente                        ***/
	/********************************************************************/
	public function btnUnificar($data){
        $this->db->trans_begin();

        foreach ($data['listClient'] as $key => $value) {
            if ($data['idCliente'] != $value['ID']) {
                $this->db->where('idCliente',$value['ID']);
                $this->db->set('idCliente',$data['idCliente']);
                $this->db->update('Ventas');
                $insert_id = $this->db->affected_rows();

                $this->db->query('UPDATE Clientes SET Status = "Inactivo" WHERE ID ='.$value['ID'].'');
            }
        }

        $this->db->query('UPDATE Clientes SET Status = "Activo" WHERE ID ='.$data['idCliente'].'');

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
	}

    // Obtener Distribuidores Activos //
    public function getDistribuidores()
    {
        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('Clientes');
        $this->db->order_by('Nombre', 'ASC'); 
        $this->db->where('Status !=', 'Inactivo');
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Obtener Distribuidores Activos By ID //
    public function getDistribuidoresById($id)
    {
        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('Clientes');
        $this->db->order_by('Nombre', 'ASC');
        $this->db->where('ID',$id);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Obtener Bloque Distribuidor //
    public function getBloque()
    {
        
        $this->db->select('*'); 
        $this->db->from('Bloques_distribuidores');
        $this->db->where('Status', 'Activo');
        $query = $this->db->get();

        return $query->result_array();
    }

    // Obtener Asignación Division //
    public function getAsignacionDivision($id)
    {
        
        $this->db->select('ACD.*, D.Division'); 
        $this->db->from('Asignacion_clientes_division AS ACD');
        $this->db->join('Divisiones AS D','ACD.idDivision = D.ID');
        $this->db->where('ACD.idCliente', $id);
        $query = $this->db->get();
        return $query->result_array();
    }


    /// Obtener Vista Distribuidor_Sucursal ///
    public function getViewDistribuidoresFactura()
    {
        
        $this->db->select('*'); 
        $this->db->from('Distribuidor_Factura');
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    /// Agregar Distribuidor ///
    public function AddDistribuidor($data,$Asignasion)
    {
        $Meses = $data['Meses_Actual'];

        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        
        $this->db->insert('Clientes', $data);
        $idDistribuidor = $this->db->insert_id();

        if($Asignasion[0] != null && $Asignasion[0] != ""){
            for ($i=0; $i < count($Asignasion); $i++) {
                $listAsignasion = array('idCliente' => $idDistribuidor,
                                    'idDivision' => $Asignasion[$i]);
                $this->db->insert('Asignacion_clientes_division', $listAsignasion);
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

    // Obtener Informarción Dirección Envio //
    public function getInfoDireccionEnvio($idCliente)
    {
        
        $this->db->select('*'); 
        $this->db->from('Direcciones_envio');
        $this->db->where('idCliente', $idCliente);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Información del Distribuidor By ID //
    public function getDistribuidorById($idCliente)
    {
    	
        $this->db->select('*'); 
        $this->db->from('Clientes');
        $this->db->where('ID', $idCliente);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Update Distribuidor //
    public function UpdateDistribuidor($data,$id,$Asignasion)
    {
        $Meses = $data['Meses_Actuales'];
        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->where('ID',$id);
        $this->db->update('Clientes', $data);

        $this->db->where('idCliente', $id);
        $this->db->delete('Asignacion_clientes_division');

        if($Asignasion[0] != null && $Asignasion[0] != ""){
            for ($i=0; $i < count($Asignasion); $i++) {
                $listAsignasion = array('idCliente' => $id,
                                    'idDivision' => $Asignasion[$i]);

                $this->db->insert('Asignacion_clientes_division', $listAsignasion);
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

    // Eliminar Distribuidor //
    public function deleteDistrbuidor($id)
    {
        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->where('ID',$id);
        $this->db->set('Status','Inactivo');
        $this->db->update('Clientes');

        $this->db->where('idCliente',$id);
        $this->db->set('idCliente',NULL);
        $this->db->update('Zonas_distribuidores');

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    // Acción Agregar Dirección Envio //
    public function Add_Direccion($data)
    {
        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->insert('Direcciones_envio', $data);

        if ($this->db->trans_status() === FALSE)        {
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    // Obtener Direcciones Envio By idCliente //
    public function getDirecciones($id)
    {
        
        $this->db->select('*'); 
        $this->db->from('Direcciones_envio');
        $this->db->where('idCliente', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Acción Modificar Dirección Envio //
    public function Update_Direccion($data)
    {
        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $id = $data['ID'];
        unset($data['ID']);

        $this->db->where('ID',$id);
        $this->db->update('Direcciones_envio',$data);

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }



























    public function Add_Distribuidor($data,$Asignasion)
    {
        $Meses = $data['Meses_Actual'];
        $fecha_actual = date("Y-m-d");

        //sumo 1 mes //
        $Fecha_ingreso =  date("Y-m-d",strtotime($fecha_actual."- ".$Meses." month"));

        $this->db->trans_begin();

        
        $this->db->insert('Clientes', $data);
        $idDistribuidor = $this->db->insert_id();

        $this->db->where('ID',$idDistribuidor);
        $this->db->set('Fecha_ingreso',$Fecha_ingreso);
        $this->db->update('Clientes');

        if($Asignasion[0] != null && $Asignasion[0] != ""){

            $Contador = count($Asignasion);

            for ($i=0; $i < $Contador; $i++) {
                
                $listAsignasion = array('idCliente' => $idDistribuidor,
                                    'idDivision' => $Asignasion[$i]);
                $this->db->insert('Asignacion_clientes_division', $listAsignasion);
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

    public function Get_Distribuidor_by_Id($id)
    {
    	
        $this->db->select('*'); 
        $this->db->from('Clientes');
        $this->db->where('ID', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Direcion_Envio($id)
    {
        
        $this->db->select('*'); 
        $this->db->from('Direcciones_envio');
        $this->db->where('idCliente', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Update_Distribuidor($data,$id,$Asignasion)
    {   
        $Meses = $data['Meses_Actuales'];
        $fecha_actual = date("Y-m-d");
        //sumo 1 mes
        $Fecha_ingreso =  date("Y-m-d",strtotime($fecha_actual."- ".$Meses." month"));
        
        $this->db->trans_begin();

        $this->db->where('ID',$id);
        $this->db->update('Clientes', $data);

        $this->db->where('ID',$id);
        $this->db->set('Fecha_ingreso',$Fecha_ingreso);
        $this->db->update('Clientes');

        $this->db->where('idCliente', $id);
        $this->db->delete('Asignacion_clientes_division');

        if($Asignasion[0] != null && $Asignasion[0] != ""){

            $Contador = count($Asignasion);

            for ($i=0; $i < $Contador; $i++) {
                
                $listAsignasion = array('idCliente' => $id,
                                    'idDivision' => $Asignasion[$i]);

                $this->db->insert('Asignacion_clientes_division', $listAsignasion);
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

    public function Eliminar_Distribuidor($id)
    {

        $this->db->trans_begin();

        $this->db->where('ID',$id);
        $this->db->set('Status','Inactivo');
        $this->db->update('Clientes');

        $this->db->where('idCliente',$id);
        $this->db->set('idCliente',NULL);
        $this->db->update('Zonas_distribuidores');

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

    public function getDirrecion($id)
    {
        
        $this->db->select('*'); 
        $this->db->from('Direcciones_envio');
        $this->db->where('ID', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Bloques()
    {
        
        $this->db->select('*'); 
        $this->db->from('Bloques_distribuidores');
        $this->db->where('Status', 'Activo');
        $query = $this->db->get();
        return $query->result_array();
    }


    public function delete_Direccion($data)
    {
        $this->db->trans_begin();

        $this->db->where('ID',$data['ID']);
        $this->db->set('Status','Inactivo');
        $this->db->update('Direcciones_envio');

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