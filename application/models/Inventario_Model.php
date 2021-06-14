<?php

error_reporting(E_ERROR);

class Inventario_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
       // $this->load->database();
        parent::__construct();

    }

    // Función Exportar Inventario General //
    public function csvInventarioGeneral($data)
    {
        
        $this->db->select('ID, Codigo, Producto, Descripcion, Marca, Division, Linea, Sublinea, Min, Existencias, Existencias_apartados, Faltante'); 
        $this->db->from('Inventario_producto_view');
        // Filtros Inventario General //
        if ($data['selectMarcaInvGeneral']){$this->db->where('idMarca',$data['selectMarcaInvGeneral']);}
        if ($data['selectInvDivision']){$this->db->where('idDivision',$data['selectInvDivision']);}
        if ($data['selectLineaInvGeneral']){$this->db->where('idLinea',$data['selectLineaInvGeneral']);}
        if ($data['selectSublineaInvGeneral']){$this->db->where('idSublinea',$data['selectSublineaInvGeneral']);}
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    public function csvInventarioBodega($data)
    {
        
        $this->db->select('idInventario, Codigo, Producto, Descripcion, Marca, Division, Linea, Sublinea, Min, Existencias, Existencias_apartados, Existencias_disponibles, Faltante'); 
        $this->db->from('Inventario_producto_sucursal_view');
         // Filtros Inventario General //
        if ($data['selectMarcaInvBodega']){$this->db->where('idMarca',$data['selectMarcaInvBodega']);}
        if ($data['selectDivisionInvBodega']){$this->db->where('idDivision',$data['selectDivisionInvBodega']);}
        if ($data['selectLineaInvBodega']){$this->db->where('idLinea',$data['selectLineaInvBodega']);}
        if ($data['selectSublineaInvBodega']){$this->db->where('idSublinea',$data['selectSublineaInvBodega']);}
        if ($data['selectInvBodega']){$this->db->where('idSucursal',$data['selectInvBodega']);}
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    // Función Obtener Locaciones (By idSucursal) //
    public function getLocacionesInvDetalleBodega($idSucursal)
    {
        
        $this->db->distinct();
        $this->db->select('*');
        $this->db->from('Locaciones');
        $this->db->where('idSucursal', $idSucursal);
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    // Obtener Locación (By idSucursal) //
    public function getLocacionMovimiento($idSucursal)
    {
        
        $this->db->distinct();
        $this->db->select('*');
        $this->db->from('Locaciones');
        $this->db->order_by('Locacion', 'asc');
        $this->db->where('idSucursal', $idSucursal);
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    // Obtener Inventario Detalle Locacion By idDetalleInventario //
    public function getInvDetalleLocacion($id)
    {
        
        $this->db->distinct();
        $this->db->select('*');
        $this->db->from('Detalle_inventario');
        $this->db->where('ID', $id);
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    // Modificar fecha locación Detalle Inventario //
    public function UpdateInvDetalleLocacion($data)
    {
        // Removemos Valores del arreglo $data //
        $ID = $data['ID'];
        unset($data['ID']);

        $this->db->trans_start(); # Starting Transaction
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 
        
        $this->db->where('ID',$ID);
        $this->db->update('Detalle_inventario', $data);

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

    // Modificar Detalle Inventario y Insertar Movimientos Inventario //
    public function UpdateInvDetalleBodega($data)
    {
        // Removemos Valores del arreglo $data //
        $ID = $data['ID'];
        unset($data['ID']);
        $Existencias = $data['OldExistencias'];
        unset($data['OldExistencias']);

        // Obtenemos Locación Detalle_Inventario //
        $Locacion = $this->getInvDetalleLocacion($ID);

        // Valores Movimientos Inventario //
        $Movimiento_Inventario = array('idUsuario' => $_SESSION['Avyna'][0]['ID'],
                                        'Fecha_hora' => date("Y-m-d H:i:s"),
                                        'Tipo_movimiento' => 'Bodega',
                                        'idDetalle_inventario' => $ID,
                                        'Existencias_anterior' => $Existencias,
                                        'Existencias_nuevo' => $data['Existencias'],
                                        'Locacion_anterior' => $Locacion[0]['idLocacion'],
                                        'Locacion_nuevo' => $data['idLocacion']);

        $this->db->trans_start(); # Starting Transaction
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->insert('Movimientos_Inventario', $Movimiento_Inventario);

        
        $this->db->where('ID',$ID);
        $this->db->update('Detalle_inventario', $data);

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

        // Obtener Inventario Detalle Locación (By idLocacion)//
    public function getInventarioDetalleLocacion($idLocacion)
    {
        
        $this->db->distinct();
        $this->db->select('DI.*, CA.Codigo, CA.Producto, CA.ID AS idCatalogo');
        $this->db->from('Detalle_inventario AS DI');
        $this->db->join('Inventario AS I','DI.idInventario = I.ID');
        $this->db->join('Catalogo AS CA','I.idCatalogo = CA.ID');
        $this->db->where('DI.idLocacion',$idLocacion);
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    // Mover Locación //
    public function moveLocacion($data)
    {
        $oldExistencias = $data['Existencias_old'];
        unset($data['Existencias_old']);

        $this->db->trans_begin();

        $Result = $this->getDetalleInventarioById($data['ID']);

        $Exist = intval($Result[0]['Existencias']) - intval($data['Cantidad']);

        $Movimiento_Inventario = array('idUsuario' => $_SESSION['Avyna'][0]['ID'],
                                        'Fecha_hora' => date("Y-m-d H:i:s"),
                                        'Tipo_movimiento' => 'Locacion',
                                        'idDetalle_inventario' => $data['ID'],
                                        'Existencias_anterior' => $Result[0]['Existencias'],
                                        'Existencias_nuevo' => $Exist,
                                        'Locacion_anterior' => $data['Enviar'],
                                        'Locacion_nuevo' => $data['Enviar']);

        // Insertar Movimientos Inventario //
        $this->db->insert('Movimientos_Inventario', $Movimiento_Inventario);
        $idMovimiento = $this->db->insert_id();

        $array_Detalle = array('idInventario' => $Result[0]['idInventario'],
                                'Existencias' => $data['Cantidad'],
                                'Costo_compra' => $Result[0]['Costo_compra'],
                                'Costo_compra_mx' => $Result[0]['Costo_compra_mx'],
                                'Fecha_compra' => $Result[0]['Fecha_compra'],
                                'Fecha_ingreso' => $Result[0]['Fecha_ingreso'],
                                'Pedimento' => $Result[0]['Pedimento'],
                                'Precio_distribuidor' => $Result[0]['Precio_distribuidor'],
                                'Precio_salon' => $Result[0]['Precio_salon'],
                                'Precio_publico' => $Result[0]['Precio_publico'],
                                'idLocacion' => $data['Recibe'],
                                'Existencias_apartados' => $Result[0]['Existencias_apartados']);

        $Existencias = $Result[0]['Existencias'] - $data['Cantidad'];

        // Insertar Detalle Inventario //
        $this->db->insert('Detalle_inventario', $array_Detalle);
        $insert_id = $this->db->insert_id();

        //Update Existencias //
        $this->db->where('ID', $data['ID']);
        $this->db->set('Existencias',$Existencias);
        $this->db->update('Detalle_inventario');
        //$this->db->query('UPDATE Detalle_inventario SET Existencias = '.$Existencias.' WHERE ID='.$data['ID'].'');

        $Movimiento_Inventario2 = array('idUsuario' => $_SESSION['Avyna'][0]['ID'],
                                        'Fecha_hora' => date("Y-m-d H:i:s"),
                                        'Tipo_movimiento' => 'Locacion',
                                        'idDetalle_inventario' => $insert_id,
                                        'Existencias_anterior' => 0,
                                        'Existencias_nuevo' => $data['Cantidad'],
                                        'Locacion_anterior' => $data['Enviar'],
                                        'Locacion_nuevo' => $data['Recibe']);

        // Insert Movimientos Inventario //
        $this->db->insert('Movimientos_Inventario', $Movimiento_Inventario2);

        /////////////////////////////////////////////////////
        // Validate Detalle Inventario Locación 29/07/2019 //
        /////////////////////////////////////////////////////

        $Result = $this->validateLocacion($data['ID'],$idMovimiento);

        if (!empty($Result)) {
            $this->db->where('ID', $data['ID']);
            $this->db->set('Existencias',$Existencias);
            $this->db->update('Detalle_inventario');
        }

        /////////////////////////////////////////////////////
        // Validate Detalle Inventario Locación 29/07/2019 //
        /////////////////////////////////////////////////////

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    /// Obtener Detalle Inventario By ID ///
    public function getDetalleInventarioById($id)
    {
        
        $this->db->distinct();
        $this->db->select('*');
        $this->db->from('Detalle_inventario');
        $this->db->where('ID',$id);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Validación Movimiento Locación //
    public function validateLocacion($idDetalleInventario,$idMovimiento)
    {
        
        $this->db->distinct();
        $this->db->select('*');
        $this->db->from('Detalle_inventario AS DI');
        $this->db->join('Movimientos_Inventario AS MI','DI.ID = MI.idDetalle_inventario');
        $this->db->where('DI.Existencias != MI.Existencias_nuevo');
        $this->db->where('MI.idDetalle_inventario',$idDetalleInventario);
        $this->db->where('MI.ID',$idMovimiento);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function getInfoValidate($id){
        $query = $this->db->query("select MO.*, CA.ID As idCatalogo, CA.Producto, CA.Codigo 
        from movimientos_inventario_ops MO
        INNER JOIN inventario I on MO.idInventario = I.ID
        inner join catalogo CA on I.idCatalogo = CA.ID
        where MO.ID = " . $id);
        return $query->result_array();
    }

    public function getValidateOrigin($idLocation, $idCatalogo, $idSucursal){
		$query = $this->db->query("select di.*, SUM(di.Existencias) AS ExistenciasTotal, i.idCatalogo
		from detalle_inventario di
		inner join locaciones lo on di.idLocacion = lo.ID
		inner join inventario i on di.idInventario = i.ID
		where lo.Categoria != 1
		and i.idSucursal = ".$idSucursal."
		and di.Existencias > 0
		AND di.idLocacion = ".$idLocation."
		AND i.idCatalogo =".$idCatalogo);
		return $query->result_array();
	}

    public function deleteMoveOperador($id){
        $this->db->trans_begin();

        // $this->db->where('ID',$id);
        // $this->db->delete('movimientos_inventario_ops');

        $this->db->where('ID',$id);
        $this->db->set('Status', 'Inactivo');
        $this->db->update('movimientos_inventario_ops');

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    public function getInfoOperadorById($id){
        $query = $this->db->query("select MO.*, CA.ID As idCatalogo, CA.Producto, CA.Codigo from movimientos_inventario_ops MO
        INNER JOIN inventario I on MO.idInventario = I.ID
        inner join catalogo CA on I.idCatalogo = CA.ID
        where MO.ID = " . $id);
        $result['info'] = $query->result_array();

        $query = $this->db->query("select lo.*, SUM(di.Existencias) AS Existencias, i.Cantidad_picking
		from inventario i
		inner join detalle_inventario di on i.ID = di.idInventario
		inner join locaciones lo on di.idLocacion = lo.ID
		where lo.idSucursal = 1
		and i.idCatalogo = ".$result['info'][0]['idCatalogo']." 
		and lo.Categoria = 1
		group by lo.ID");
		$result['destino'] = $query->result_array();

        $query = $this->db->query("select lo.*, SUM(di.Existencias) AS Existencias, i.Cantidad_picking, di.Fecha_ingreso
		from inventario i
		inner join detalle_inventario di on i.ID = di.idInventario
		inner join locaciones lo on di.idLocacion = lo.ID
		where lo.idSucursal = 1
		and i.idCatalogo = ".$result['info'][0]['idCatalogo']."
		and lo.Categoria != 1
		group by lo.ID
		HAVING SUM(di.Existencias) > 0
		order by di.Fecha_ingreso ASC");

		$result['origen'] =  $query->result_array();

        return $result;
    }

    public function deleteMoveOperadorRealizado($id){
        $this->db->trans_begin();

        $this->db->where('ID',$id);
        $this->db->set('Status', 'Inactivo');
        $this->db->update('movimientos_inventario_ops');
        $insert_id = $this->db->affected_rows();

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    public function saveMoveOperador($data, $id){
        $this->db->trans_begin();

        $this->db->where('ID',$id);
        $this->db->update('movimientos_inventario_ops', $data);

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    public function fetchMovimientoOperador($data){
        $order = '';
        $columns = array('MO.ID', 'C.Producto', 'MO.Cantidad_mov', 'L.Locacion', 'LO.Locacion');

        //// Get All Result ////
        $this->db->select('MO.ID, C.Producto, MO.Cantidad_mov, L.Locacion AS Locacion_Origen, LO.Locacion AS Locacion_Destino, MO.Status'); 
        $this->db->from('movimientos_inventario_ops MO');
        $this->db->join('inventario I', 'MO.idInventario = I.ID');
        $this->db->join('catalogo C', 'I.idCatalogo = C.ID');
        $this->db->join('locaciones L', 'MO.idLocacion_origen = L.ID');
        $this->db->join('locaciones LO', 'MO.idLocacion_destino = LO.ID');
        $this->db->where('MO.Status =', 'Pendiente');
        $this->db->where('I.idSucursal', $data['idSucursal']);

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('MO.ID', $data['search']['value']);
            $this->db->or_like('C.Producto', $data['search']['value']);
            $this->db->or_like('MO.Cantidad_mov', $data['search']['value']);
            $this->db->or_like('L.Locacion', $data['search']['value']);
            $this->db->or_like('LO.Locacion', $data['search']['value']);
            // $this->db->or_like('MO.Status', $data['search']['value']);
            $this->db->group_end();
        }

        if(isset($data["order"])) {
            $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
        }
        else {
            $order .= 'MO.ID DESC ';
        }

        /// Order By //
        $this->db->order_by($order);
        if($data["length"] != -1){
            $this->db->limit($data['length'],$data['start']);
        }

        $query = $this->db->get();

        $this->db->save_queries = TRUE;
        $str = $this->db->last_query();

        $result = $query->result_array();

        $this->db->save_queries = TRUE;
        $str = $this->db->last_query();

        /// get Total Value ///
        $this->db->select('MO.ID, C.Producto, MO.Cantidad_mov, L.Locacion AS Locacion_Origen, LO.Locacion AS Locacion_Destino, MO.Status'); 
        $this->db->from('movimientos_inventario_ops MO');
        $this->db->join('inventario I', 'MO.idInventario = I.ID');
        $this->db->join('catalogo C', 'I.idCatalogo = C.ID');
        $this->db->join('locaciones L', 'MO.idLocacion_origen = L.ID');
        $this->db->join('locaciones LO', 'MO.idLocacion_destino = LO.ID');
        $this->db->where('MO.Status = ', 'Pendiente');
        $this->db->where('I.idSucursal', $data['idSucursal']);
        $total = $this->db->count_all_results();

        /// get Num rows Total ///
        $this->db->select('MO.ID, C.Producto, MO.Cantidad_mov, L.Locacion AS Locacion_Origen, LO.Locacion AS Locacion_Destino, MO.Status'); 
        $this->db->from('movimientos_inventario_ops MO');
        $this->db->join('inventario I', 'MO.idInventario = I.ID');
        $this->db->join('catalogo C', 'I.idCatalogo = C.ID');
        $this->db->join('locaciones L', 'MO.idLocacion_origen = L.ID');
        $this->db->join('locaciones LO', 'MO.idLocacion_destino = LO.ID');
        $this->db->where('MO.Status = ', 'Pendiente');
        $this->db->where('I.idSucursal', $data['idSucursal']);

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('MO.ID', $data['search']['value']);
            $this->db->or_like('C.Producto', $data['search']['value']);
            $this->db->or_like('MO.Cantidad_mov', $data['search']['value']);
            $this->db->or_like('L.Locacion', $data['search']['value']);
            $this->db->or_like('LO.Locacion', $data['search']['value']);
            // $this->db->or_like('MO.Status', $data['search']['value']);
            $this->db->group_end();
        }
        /// Order By //
        $this->db->order_by($order);
        $total_filtered = $this->db->count_all_results();
    
        $dataResult = Array();
        foreach ($result as $key => $row){
            $dataTable = array();
            $dataTable[] = $row["ID"];
            $dataTable[] = $row["Producto"];
            $dataTable[] = $row["Cantidad_mov"];
            $dataTable[] = $row["Locacion_Origen"];
            $dataTable[] = $row["Locacion_Destino"];
            // $dataTable[] = $row["Status"];
            $dataResult[] = $dataTable;
        }

        $output = array(
            "draw"    => intval($data["draw"]),
            "recordsTotal"  => $total,
            "recordsFiltered" => $total_filtered,
            "data"    => $dataResult,
            "info"    => $str,
            "result"    => $result,
            "count"   => count($result)
        );

        return json_encode($output);
    }

    public function fetchMovimientoOperadorRealizados($data){
        $order = '';
        $columns = array('MO.ID', 'C.Producto', 'MO.Cantidad_mov', 'L.Locacion', 'LO.Locacion','MO.Fecha_hora_movimiento');

        //// Get All Result ////
        $this->db->select('MO.ID, C.Producto, MO.Cantidad_mov, L.Locacion AS Locacion_Origen, LO.Locacion AS Locacion_Destino, MO.Status, MO.Fecha_hora_movimiento'); 
        $this->db->from('movimientos_inventario_ops MO');
        $this->db->join('inventario I', 'MO.idInventario = I.ID');
        $this->db->join('catalogo C', 'I.idCatalogo = C.ID');
        $this->db->join('locaciones L', 'MO.idLocacion_origen = L.ID');
        $this->db->join('locaciones LO', 'MO.idLocacion_destino = LO.ID');
        $this->db->where('MO.Status != ', 'Pendiente');
        $this->db->where('MO.Status != ', 'Inactivo');
        $this->db->where('I.idSucursal', $data['idSucursal']);

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('MO.ID', $data['search']['value']);
            $this->db->or_like('C.Producto', $data['search']['value']);
            $this->db->or_like('MO.Cantidad_mov', $data['search']['value']);
            $this->db->or_like('L.Locacion', $data['search']['value']);
            $this->db->or_like('LO.Locacion', $data['search']['value']);
            $this->db->or_like('MO.Fecha_hora_movimiento', $data['search']['value']);
            // $this->db->or_like('MO.Status', $data['search']['value']);
            $this->db->group_end();
        }

        if(isset($data["order"])) {
            $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
        }
        else {
            $order .= 'MO.ID DESC ';
        }

        /// Order By //
        $this->db->order_by($order);
        if($data["length"] != -1){
            $this->db->limit($data['length'],$data['start']);
        }

        $query = $this->db->get();
        $result = $query->result_array();

        $this->db->save_queries = TRUE;
        $str = $this->db->last_query();

        /// get Total Value ///
        $this->db->select('MO.ID, C.Producto, MO.Cantidad_mov, L.Locacion AS Locacion_Origen, LO.Locacion AS Locacion_Destino, MO.Status, MO.Fecha_hora_movimiento'); 
        $this->db->from('movimientos_inventario_ops MO');
        $this->db->join('inventario I', 'MO.idInventario = I.ID');
        $this->db->join('catalogo C', 'I.idCatalogo = C.ID');
        $this->db->join('locaciones L', 'MO.idLocacion_origen = L.ID');
        $this->db->join('locaciones LO', 'MO.idLocacion_destino = LO.ID');
        $this->db->where('MO.Status != ', 'Pendiente');
        $this->db->where('MO.Status != ', 'Inactivo');
        $this->db->where('I.idSucursal', $data['idSucursal']);
        $total = $this->db->count_all_results();

        /// get Num rows Total ///
        $this->db->select('MO.ID, C.Producto, MO.Cantidad_mov, L.Locacion AS Locacion_Origen, LO.Locacion AS Locacion_Destino, MO.Status, MO.Fecha_hora_movimiento'); 
        $this->db->from('movimientos_inventario_ops MO');
        $this->db->join('inventario I', 'MO.idInventario = I.ID');
        $this->db->join('catalogo C', 'I.idCatalogo = C.ID');
        $this->db->join('locaciones L', 'MO.idLocacion_origen = L.ID');
        $this->db->join('locaciones LO', 'MO.idLocacion_destino = LO.ID');
        $this->db->where('MO.Status != ', 'Pendiente');
        $this->db->where('MO.Status != ', 'Inactivo');
        $this->db->where('I.idSucursal', $data['idSucursal']);

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('MO.ID', $data['search']['value']);
            $this->db->or_like('C.Producto', $data['search']['value']);
            $this->db->or_like('MO.Cantidad_mov', $data['search']['value']);
            $this->db->or_like('L.Locacion', $data['search']['value']);
            $this->db->or_like('LO.Locacion', $data['search']['value']);
            $this->db->or_like('MO.Fecha_hora_movimiento', $data['search']['value']);
            // $this->db->or_like('MO.Status', $data['search']['value']);
            $this->db->group_end();
        }
        /// Order By //
        $this->db->order_by($order);
        $total_filtered = $this->db->count_all_results();
    
        $dataResult = Array();
        foreach ($result as $key => $row)
        {
            $dataTable = array();
            $dataTable[] = $row["ID"];
            $dataTable[] = $row["Producto"];
            $dataTable[] = $row["Cantidad_mov"];
            $dataTable[] = $row["Locacion_Origen"];
            $dataTable[] = $row["Locacion_Destino"];
            $dataTable[] = $row["Fecha_hora_movimiento"];
            // $dataTable[] = $row["Status"];
            $dataResult[] = $dataTable;
        }

        $output = array(
            "draw"    => intval($data["draw"]),
            "recordsTotal"  => $total,
            "recordsFiltered" => $total_filtered,
            "data"    => $dataResult,
            "info"    => $str,
            "result"    => $result,
            "count"   => count($result)
        );

        return json_encode($output);
    }


    //////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    






















































    public function Get_Inventario_Bodega_Detalle($id)
    {
        $Detalle = null;

        try
        {
            
            $this->db->distinct();
            $this->db->select('DI.*, L.Locacion, L.Categoria');
            $this->db->from('Detalle_inventario AS DI');
            $this->db->join('Locaciones AS L','DI.idLocacion = L.ID','left');
            $this->db->where('DI.idInventario',$id);
            $query = $this->db->get();
            $result = $query->result_array();
            $Detalle = $result;
        }
        catch(Exception $er)
        {
            $Detalle = null;
        }

        return $Detalle;
    }

    public function GetLocacion($idSucursal)
    {
        $Locacion = null;

        try
        {
            
            $this->db->distinct();
            $this->db->select('*');
            $this->db->from('Locaciones');
            $this->db->where('idSucursal', $idSucursal);
            $query = $this->db->get();
            $result = $query->result_array();
            $Locacion = $result;
        }
        catch(Exception $er)
        {
            $Locacion = null;
        }

        return $Locacion;
    }

    public function GetDetalle_Inventario($id)
    {
        $Detalle_inventario = null;

        try
        {
            
            $this->db->distinct();
            $this->db->select('*');
            $this->db->from('Detalle_inventario');
            $this->db->where('ID',$id);
            $query = $this->db->get();
            $result = $query->result_array();
            $Detalle_inventario = $result;
        }
        catch(Exception $er)
        {
            $Detalle_inventario = null;
        }

        return $Detalle_inventario;
    }

    public function Transpaso_Locacion($data,$oldExistencias)
    {
        $this->db->trans_begin();

        $Result = $this->GetDetalle_Inventario($data['ID']);

        $Exist = floatval($oldExistencias) - floatval($data['Cantidad']);

        $Movimiento_Inventario = array('idUsuario' => $_SESSION['Avyna'][0]['ID'],
                                        'Fecha_hora' => date("Y-m-d H:i:s"),
                                        'Tipo_movimiento' => 'Locacion',
                                        'idDetalle_inventario' => $data['ID'],
                                        'Existencias_anterior' => $oldExistencias,
                                        'Existencias_nuevo' => $Exist,
                                        'Locacion_anterior' => $data['Enviar'],
                                        'Locacion_nuevo' => $data['Enviar']);

        $this->db->insert('Movimientos_Inventario', $Movimiento_Inventario);

        $array_Detalle = array('idInventario' => $Result[0]['idInventario'],
                                'Existencias' => $data['Cantidad'],
                                'Costo_compra' => $Result[0]['Costo_compra'],
                                'Costo_compra_mx' => $Result[0]['Costo_compra_mx'],
                                'Fecha_compra' => $Result[0]['Fecha_compra'],
                                'Fecha_ingreso' => $Result[0]['Fecha_ingreso'],
                                'Pedimento' => $Result[0]['Pedimento'],
                                'Precio_distribuidor' => $Result[0]['Precio_distribuidor'],
                                'Precio_salon' => $Result[0]['Precio_salon'],
                                'Precio_publico' => $Result[0]['Precio_publico'],
                                'idLocacion' => $data['Recibe'],
                                'Existencias_apartados' => $Result[0]['Existencias_apartados']);

        $Existencias = $Result[0]['Existencias'] - $data['Cantidad'];

        $this->db->insert('Detalle_inventario', $array_Detalle);
        $insert_id = $this->db->insert_id();

        $this->db->query('UPDATE Detalle_inventario SET Existencias = '.$Existencias.' WHERE ID='.$data['ID'].'');

        $Movimiento_Inventario2 = array('idUsuario' => $_SESSION['Avyna'][0]['ID'],
                                        'Fecha_hora' => date("Y-m-d H:i:s"),
                                        'Tipo_movimiento' => 'Locacion',
                                        'idDetalle_inventario' => $insert_id,
                                        'Existencias_anterior' => 0,
                                        'Existencias_nuevo' => $data['Cantidad'],
                                        'Locacion_anterior' => $data['Enviar'],
                                        'Locacion_nuevo' => $data['Recibe']);

        $this->db->insert('Movimientos_Inventario', $Movimiento_Inventario2);

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


    // ORDER BY CA.Codigo ASC

    public function GetMarca()
    {
        $Marca = null;

        try
        {
            
            $this->db->distinct();
            $this->db->select('ID, Marca');
            $this->db->from('Marcas');
            $this->db->order_by("Marca", "asc");
            $query = $this->db->get();
            $result = $query->result_array();
            $Marca = $result;
        }
        catch(Exception $er)
        {
            $Marca = null;
        }

        return $Marca;
    }

    public function GetDivision()
    {
        
        $this->db->distinct();
        $this->db->select('ID, Division');
        $this->db->from('Divisiones');
        $this->db->order_by("Division", "asc");
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    public function GetLinea()
    {
        
        $this->db->distinct();
        $this->db->select('ID, Linea');
        $this->db->from('Lineas');
        $this->db->order_by("Linea", "asc");
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    public function GetSublinea()
    {
        
        $this->db->distinct();
        $this->db->select('ID, Sublinea');
        $this->db->from('Sublineas');
        $this->db->order_by("Sublinea", "asc");
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    public function GetSucursal()
    {
        
        $this->db->distinct();
        $this->db->select('*');
        $this->db->from('Sucursales');
        $this->db->order_by("Sucursal", "asc");
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }
}