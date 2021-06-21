<?php

class Bodega_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
       // $this->load->database();
        parent::__construct();
    }

    // Obtener Sucursales (By idSucursal) //
    public function getBodegaById($idSucursal)
    {
        
        $this->db->select('*'); 
        $this->db->from('Sucursales');
        $this->db->where('ID',$idSucursal);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Sucursales Activas //
    public function getBodega()
    {
        
        $this->db->select('*'); 
        $this->db->from('Sucursales');
        $this->db->where('Status','Activo');
        $query = $this->db->get();
        return $query->result_array();
    }

    // Función Exportar Inventario General //
    public function csvInventarioGeneral($data)
    {
        
        $this->db->select('idCatalogo, Codigo, Producto, Precio_publico, Min, Existencias'); 
        $this->db->from('Inventario_producto_sucursal_view');
        // Filtros Inventario General //
        if ($data['selectBodega']){$this->db->where('idSucursal',$data['selectBodega']);}
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    public function Get_Moneda()
    {
    	
        $this->db->select('*'); 
        $this->db->from('Monedas');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Eliminar_Locacion($id)
    {
        $this->db->trans_begin();

        
        $this->db->where('ID',$id);
        $this->db->delete('Locaciones');

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

    public function Editar_Locacion($data){
    	$ID = $data['ID'];

    	$this->db->trans_begin();
        
        $this->db->where('ID',$ID);
        $this->db->update('Locaciones',$data);

        if ($data['Predeterminado'] == 1){
            // Cambiamos la locación predeterminada //
            $this->db->where('idSucursal',$data['idSucursal']);
            $this->db->set('Predeterminado',0);
            $this->db->update('Locaciones');

            $this->db->where('ID',$ID);
            $this->db->set('Predeterminado',1);
            $this->db->update('Locaciones');

            $this->db->where('ID',$data['idSucursal']);
            $this->db->set('idLocacion_Predeterminada',$ID);
            $this->db->update('Sucursales');
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

    public function Editar_Producto($data)
    {
        $ID = $data['ID'];
        unset($data['ID']);

        $this->db->trans_begin();


        
        $this->db->where('ID',$ID);
        $this->db->update('Inventario',$data);

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

    public function Agregar_Producto($data)
    {
        $this->db->trans_begin();

        $Info = $this->Get_Producto_Inventario($data['idSucursal'],$data['idCatalogo']);

        if ($Info) {
            
            return 3;
        }

        $Inventario = array('idCatalogo' => $data['idCatalogo'],
                            'idSucursal' => $data['idSucursal'],
                            'Min' => $data['Min'],
                            'Precio_publico' => $data['Precio_publico'],
                            'Cantidad_picking' => $data['Cantidad_picking']);

        
        $this->db->insert('Inventario', $Inventario);
        $insert_id = $this->db->insert_id();


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

    public function Get_Producto_Inventario($idSucursal,$idCatalogo)
    {
        
        $this->db->select('*'); 
        $this->db->from('Inventario');
        $this->db->where('idSucursal',$idSucursal);
        $this->db->where('idCatalogo',$idCatalogo);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Agregar_Locacion($data){
        $this->db->trans_begin();
        
        $this->db->insert('Locaciones', $data);
        $insert_id = $this->db->insert_id();

    	if ($data['Predeterminado'] == 1){
            // Cambiamos la locación predeterminada //
            $this->db->where('idSucursal',$data['idSucursal']);
            $this->db->set('Predeterminado',0);
            $this->db->update('Locaciones');

            $this->db->where('ID',$insert_id);
            $this->db->set('Predeterminado',1);
            $this->db->update('Locaciones');
            
            $this->db->where('ID',$data['idSucursal']);
            $this->db->set('idLocacion_Predeterminada',$insert_id);
            $this->db->update('Sucursales');
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

    public function Get_Bodega_by_Id($id)
    {
    	
        $this->db->select('*'); 
        $this->db->from('Sucursales');
        $this->db->where('ID',$id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Bodega()
    {
        
        $this->db->select('*'); 
        $this->db->from('Sucursales');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Locacion($id)
    {
    	
        $this->db->select('*'); 
        $this->db->from('Locaciones');
        $this->db->where('idSucursal',$id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Delete_Bodega($id)
    {
    	$this->db->trans_begin();

        
        $this->db->where('ID',$id);
        $this->db->set('Status','Inactivo');
        $this->db->update('Sucursales');

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

    public function Editar_Bodega($data){
    	$ID = $data['ID'];
    	unset($data['ID']);

    	$this->db->trans_begin();        
        $this->db->where('ID',$ID);
        $this->db->update('Sucursales', $data);

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    public function Guardar_Bodega($data){
    	$this->db->trans_begin();
        $this->db->insert('Sucursales', $data);
        $insert_id = $this->db->insert_id();

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    public function Get_Division()
    {
        
        $this->db->select('*'); 
        $this->db->from('Divisiones');
        $this->db->order_by("Division", "asc");
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Linea($id)
    {
        
        $this->db->select('*'); 
        $this->db->from('Lineas');
        $this->db->where('idDivision',$id);
        $this->db->order_by("Linea", "asc");
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Sublinea($id)
    {
        
        $this->db->select('*'); 
        $this->db->from('Sublineas');
        $this->db->where('idLinea',$id);
        $this->db->order_by("Sublinea", "asc");
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Producto($id)
    {
        
        $this->db->select('*'); 
        $this->db->from('Catalogo');
        $this->db->where('Sublinea',$id);
        $this->db->order_by("Producto", "asc");
        $query = $this->db->get();
        return $query->result_array();
    }

}

?>