<?php

class Cliente_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
       // $this->load->database();
        parent::__construct();
    }

    public function Get_Info_Cliente($idCliente){
        $this->db->select('*'); 
        $this->db->from('Clientes_menudeo');
        $this->db->where('ID',$idCliente);
        $query = $this->db->get(); 
        return $query->result_array();
    }

    // Obtener Clientes Menudeo (Clientes Directos) //
    public function getCantidadSalones($id){
        
        $this->db->select('*'); 
        $this->db->from('Ventas_menudeo');
        $this->db->join('Clientes_menudeo','Ventas_menudeo.idCliente_menudeo = Clientes_menudeo.ID');
        $this->db->join('Ventas','Ventas_menudeo.idVenta = Ventas.ID');
        $this->db->where('Ventas.Fecha_venta >= NOW() - INTERVAL 12 WEEK');
        $this->db->where('Clientes_menudeo.idCliente',$id);
        $this->db->where('Clientes_menudeo.Status','Activo');
        $this->db->group_by('Ventas_menudeo.idCliente_menudeo');
        //print_r($this->db->last_query()); 
        //print_r($this->db->get_compiled_select());
        $query = $this->db->get(); 
        return $query->num_rows();
    }

    // Obtener Clientes Menudeo (Clientes Directos) //
    public function getCantidadSalonesTrimestral($id){
        
        $this->db->select('*'); 
        $this->db->from('Ventas_menudeo');
        $this->db->join('Clientes_menudeo','Ventas_menudeo.idCliente_menudeo = Clientes_menudeo.ID');
        $this->db->join('Ventas','Ventas_menudeo.idVenta = Ventas.ID');
        $this->db->where('Ventas.Fecha_venta >= (NOW() - INTERVAL 24 WEEK)');
        $this->db->where('Ventas.Fecha_venta <= (NOW() - INTERVAL 12 WEEK)');
        $this->db->where('Clientes_menudeo.idCliente',$id);
        $this->db->where('Clientes_menudeo.Status','Activo');
        $this->db->group_by('Ventas_menudeo.idCliente_menudeo');
        //print_r($this->db->last_query()); 
        //print_r($this->db->get_compiled_select());
        $query = $this->db->get(); 
        return $query->num_rows();
    }

    public function getCantidadNuevoSalones($id){
        
        $this->db->select('*'); 
        $this->db->from('Clientes_menudeo');
        $this->db->where('idCliente',$id);
        $this->db->where('Status','Activo');
        $this->db->where('Fecha_registro >= NOW() - INTERVAL 4 WEEK');
        $query = $this->db->get(); 
        return $query->num_rows();
    }

    public function getCantidadNuevoSalones12($id){
        
        $this->db->select('*'); 
        $this->db->from('Clientes_menudeo');
        $this->db->where('idCliente',$id);
        $this->db->where('Status','Activo');
        $this->db->where('Fecha_registro >= NOW() - INTERVAL 12 WEEK');
        $query = $this->db->get(); 
        return $query->num_rows();
    }

    public function GetNivel(){
        
        $this->db->select('Nivel'); 
        $this->db->from('Clientes_menudeo');
        $this->db->group_by('Nivel');
        $query = $this->db->get(); 
        return $query->result_array();
    }

    /********************************************************************/
	/***   Función: csvClientes() 	                	              ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 21/02/2020    					                  ***/
	/***   Descripción: Exportar Cliente  CSV                         ***/
	/********************************************************************/
    public function csvClientes($data){
        
        $this->db->select('ID, Nombre, Apellidos, Empresa, Cargo, Calle_numero, Colonia, Ciudad, Municipio, Estado, Pais, CP, RFC, Tel1, Tel2, Email, Descuento_%, Nivel, Status, Distribuidor'); 
        $this->db->from('Clientes_View_Module');
        // Filtros Inventario General //
        if ($data['selectDistribuidor']){$this->db->where('idCliente',$data['selectDistribuidor']);}
        if ($data['selectNivel']){$this->db->where('Nivel',$data['selectNivel']);}
        if (!isset($data['Mostrar_Inactivos'])){$this->db->where('Status','Activo');}
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
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
            if($value['ID'] != null && $value['ID'] != ""){
                if ($data['idCliente'] != $value['ID']) {
                    $this->db->where('idCliente_menudeo',$value['ID']);
                    $this->db->set('idCliente_menudeo',$data['idCliente']);
                    $this->db->update('Ventas_menudeo');
                    $insert_id = $this->db->affected_rows();

                    $this->db->query('UPDATE Clientes_menudeo SET Status = "Inactivo" WHERE ID ='.$value['ID'].'');
                }
            }
        }

        if($data['idCliente'] != null && $data['idCliente'] != ""){

            $this->db->query('UPDATE Clientes_menudeo SET Status = "Activo" WHERE ID ='.$data['idCliente'].'');
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

    // Obtener Clientes Menudeo (Clientes Directos) //
    public function getClientesDirectos($id)
    {
        
        $this->db->select('*'); 
        $this->db->from('Clientes_menudeo');
        $this->db->order_by('Nombre', 'ASC'); 
        $this->db->where('idCliente',$id);
        $this->db->where('Status','Activo');
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Clientes Menudeo (Clientes Directos) //
    public function getClientesByIdDistrbuidor($id){
        
        $this->db->select('*'); 
        $this->db->from('Clientes_menudeo');
        $this->db->order_by('Nombre', 'ASC'); 
        $this->db->where('idCliente',$id);
        $this->db->where('Status','Activo');
        $query = $this->db->get();
        return $query->result_array();
    }

    // Acción Guardar Cliente Menudeo //
    public function AddClienteMenudeo($data)
    {
        $this->db->trans_start();
        $this->db->trans_strict(FALSE); 
        $this->db->insert('Clientes_menudeo', $data);
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

    // Obtener Cliente Menudeo By ID //
    public function getClientesMenudeosById($id)
    {
        
        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('Clientes_menudeo');
        $this->db->where('ID',$id);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Obtener info Cliente Menudeo By idVenta //
    public function GetinfoClienteMenudeoByIdVenta($data)
    {
        
        $this->db->distinct();
        $this->db->select('C.*'); 
        $this->db->from('Ventas AS V');
        $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
        $this->db->join('Clientes_menudeo AS C','CL.ID = C.idCliente');
        $this->db->where('V.ID',$data['idVenta']);
        $this->db->where('C.ID',$data['idClienteMenudeo']);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }


    public function Get_Distribuidor(){        
        $this->db->select('*'); 
        $this->db->from('Clientes');
        $this->db->where('Status','Activo');
        $this->db->order_by('Nombre','ASC');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_All_Distribuidor(){        
        $this->db->select('*'); 
        $this->db->from('Clientes');
        $this->db->where('Status','Activo');
        $this->db->order_by('Nombre','ASC');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function getSalonByIdCliete($idCliente){
        $this->db->select('*'); 
        $this->db->from('salones');
        $this->db->where('idCliente', $idCliente);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Add_Cliente($data){        
        $this->db->insert('Clientes_menudeo', $data);
        $insert_id = $this->db->insert_id();
        return $insert_id;
    }

    public function AddSalon($data){        
        $this->db->insert('salones', $data);
        $insert_id = $this->db->insert_id();
        return $insert_id;
    }

    public function AddUsuarioSalon($data){        
        $this->db->insert('usuario_salones', $data);
        $insert_id = $this->db->insert_id();
        return $insert_id;
    }

    public function AddCajaSalones($data){        
        $this->db->insert('cajas_salones', $data);
        $insert_id = $this->db->insert_id();
        return $insert_id;
    }

    public function Get_Top_5_Clientes()
    {
        
        $this->db->distinct();
        $this->db->select('COUNT(V.idCliente) AS Total, CONCAT(CL.Nombre," ",CL.Apellidos) AS Cliente'); 
        $this->db->from('Ventas AS V');
        $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
        $this->db->where('CL.ID != 1575 AND CL.ID != 1576 AND CL.ID != 1574 AND CL.ID != 1577');
        $this->db->group_by('V.idCliente'); 
        $this->db->order_by('COUNT(V.idCliente)', 'DESC'); 
        $this->db->limit(5);
        $query = $this->db->get();
        return $query->result_array();


    }

    public function Update_Cliente($data,$id)
    {
        if(empty($data) == false && isset($data))
        {               
            
            $this->db->where('ID',$id);
            $this->db->update('Clientes_menudeo', $data);
            $insert_id = $this->db->affected_rows();

        }
        
        return $insert_id;
    }

    public function Eliminar_Cliente($id){

        if($id != '' && !empty($id)){
            $this->db->trans_begin();

            $this->db->query('UPDATE Clientes_menudeo SET Status = "Inactivo" WHERE ID ='.$id.'');

            if ($this->db->trans_status() === FALSE){
                $this->db->trans_rollback();
                return 0;
            }
            else{
                $this->db->trans_commit();
                return 1;
            }
        }else{
            return 0;
        }
    }
}
