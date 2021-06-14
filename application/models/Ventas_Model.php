<?php

date_default_timezone_set('America/Mexico_City');

class Ventas_Model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
    }

    public function queryCliente($id){
        $this->db->select('*'); 
        $this->db->from('Clientes');
        $this->db->where('ID',$id);
        $query = $this->db->get(); 
        return $query->result_array();
    }

    public function getVentasMes($id){
        
        $this->db->select('SUM(Ventas_menudeo.Total_desc) AS Total'); 
        $this->db->from('Ventas_menudeo');
        $this->db->join('Clientes_menudeo','Ventas_menudeo.idCliente_menudeo = Clientes_menudeo.ID');
        $this->db->join('Ventas','Ventas_menudeo.idVenta = Ventas.ID');
        $this->db->where('Clientes_menudeo.idCliente',$id);
        $this->db->where('Clientes_menudeo.Status', 'Activo');
        $this->db->where('Ventas.Fecha_venta >= NOW() - INTERVAL 4 WEEK');
        $query = $this->db->get(); 
        return $query->result_array();
    }

    public function getVentasSalonesMes($id){
        
        $this->db->select('SUM(Ventas_menudeo.Total_desc) AS Total'); 
        $this->db->from('Clientes_menudeo');
        $this->db->join('Ventas_menudeo','Ventas_menudeo.idCliente_menudeo = Clientes_menudeo.ID','left');
        $this->db->where('Clientes_menudeo.idCliente',$id);
        $this->db->where('Clientes_menudeo.Status', 'Activo');
        $this->db->where('Fecha_registro >= NOW() - INTERVAL 4 WEEK');
        $query = $this->db->get(); 
        return $query->result_array();
    }

    public function getVentasSalonesMesAnterior($id){
        
        $this->db->select('SUM(Ventas_menudeo.Total_desc) AS Total'); 
        $this->db->from('Ventas_menudeo');
        $this->db->join('Clientes_menudeo','Ventas_menudeo.idCliente_menudeo = Clientes_menudeo.ID');
        $this->db->join('Ventas','Ventas_menudeo.idVenta = Ventas.ID');
        $this->db->where('Clientes_menudeo.idCliente',$id);
        $this->db->where('Clientes_menudeo.Status', 'Activo');
        $this->db->where('Ventas.Fecha_venta >= NOW() - INTERVAL 8 WEEK');
        $this->db->where('Ventas.Fecha_venta <= NOW() - INTERVAL 4 WEEK');
        $query = $this->db->get(); 
        return $query->result_array();
    }

    public function getUltimasVentasSalones($id){
        
        $this->db->select('*'); 
        $this->db->from('Ventas_menudeo');
        $this->db->join('Clientes_menudeo','Ventas_menudeo.idCliente_menudeo = Clientes_menudeo.ID');
        $this->db->join('Ventas','Ventas_menudeo.idVenta = Ventas.ID');
        $this->db->where('Clientes_menudeo.idCliente',$id);
        $this->db->where('Clientes_menudeo.Status', 'Activo');
        $this->db->where('Ventas.Fecha_venta >= NOW() - INTERVAL 4 WEEK');
        $this->db->group_by('Ventas_menudeo.idCliente_menudeo');
        $query = $this->db->get(); 
        return $query->num_rows();
    }

    public function getUltimasVentas($id){
        
        $this->db->select('SUM(Ventas_menudeo.Total_desc) AS Total'); 
        $this->db->from('Ventas_menudeo');
        $this->db->join('Clientes_menudeo','Ventas_menudeo.idCliente_menudeo = Clientes_menudeo.ID');
        $this->db->join('Ventas','Ventas_menudeo.idVenta = Ventas.ID');
        $this->db->where('Clientes_menudeo.idCliente',$id);
        $this->db->where('Clientes_menudeo.Status', 'Activo');
        $this->db->where('Ventas.Fecha_venta >= NOW() - INTERVAL 12 WEEK');
        $query = $this->db->get(); 
        return $query->result_array();
    }

    public function getUltimasVentasMes($id){
        
        $this->db->select('*'); 
        $this->db->from('Ventas_menudeo');
        $this->db->join('Clientes_menudeo','Ventas_menudeo.idCliente_menudeo = Clientes_menudeo.ID');
        $this->db->join('Ventas','Ventas_menudeo.idVenta = Ventas.ID');
        $this->db->where('Clientes_menudeo.idCliente',$id);
        $this->db->where('Clientes_menudeo.Status', 'Activo');
        $this->db->where('Ventas.Fecha_venta >= NOW() - INTERVAL 8 WEEK');
        $this->db->where('Ventas.Fecha_venta <= NOW() - INTERVAL 4 WEEK');
        $this->db->group_by('Ventas_menudeo.idCliente_menudeo');
        $query = $this->db->get(); 
        return $query->num_rows();
    }

    public function getActiveRed($id){
        
        $this->db->select('*'); 
        $this->db->from('Ventas_menudeo');
        $this->db->join('Clientes_menudeo','Ventas_menudeo.idCliente_menudeo = Clientes_menudeo.ID');
        $this->db->join('Ventas','Ventas_menudeo.idVenta = Ventas.ID');
        $this->db->where('Clientes_menudeo.idCliente',$id);
        $this->db->where('Clientes_menudeo.Status', 'Activo');
        $this->db->where('Ventas.Fecha_venta >= NOW() - INTERVAL 12 WEEK');
        $this->db->where("(Clientes_menudeo.Nivel = 'RED' or Clientes_menudeo.Nivel = 'Red')");
        $this->db->group_by('Ventas_menudeo.idCliente_menudeo');
        $query = $this->db->get(); 
        return $query->num_rows();
    }

    public function getActiveBlack($id){
        
        $this->db->select('*'); 
        $this->db->from('Ventas_menudeo');
        $this->db->join('Clientes_menudeo','Ventas_menudeo.idCliente_menudeo = Clientes_menudeo.ID');
        $this->db->join('Ventas','Ventas_menudeo.idVenta = Ventas.ID');
        $this->db->where('Clientes_menudeo.idCliente',$id);
        $this->db->where('Clientes_menudeo.Status', 'Activo');
        $this->db->where('Ventas.Fecha_venta >= NOW() - INTERVAL 12 WEEK');
        $this->db->where("(Clientes_menudeo.Nivel = 'BLACK' or Clientes_menudeo.Nivel = 'Black')");
        $this->db->group_by('Ventas_menudeo.idCliente_menudeo');
        $query = $this->db->get(); 
        return $query->num_rows();
    }

    

    /********************************************************************/
    /***   Función: tableOthersExists() 	                		   ***/
    /***   Autor: Manuel Esmerio Gacria			        		      ***/
    /***   Fecha: 30/12/2019              					          ***/
    /***   Descripción: Obtener Información de las Otras Salidas      ***/
    /********************************************************************/
    public function tableOthersExists($data){
        $order = '';
        $columns = array('ID', 'Fecha', 'Usuario', 'Concepto', 'Cant_Productos', 'Monto', 'Status');

        
        $this->db->select('*'); 
        $this->db->from('Otras_Salidas_View');

        if($data["search"]["value"] !== ''){
        $this->db->group_start();
        $this->db->like('ID', $data['search']['value']);
        $this->db->or_like('Fecha', $data['search']['value']);
        $this->db->or_like('Usuario', $data['search']['value']);
        $this->db->or_like('Concepto', $data['search']['value']);
        $this->db->or_like('Cant_Productos', $data['search']['value']);
        $this->db->or_like('Monto', $data['search']['value']);
        $this->db->or_like('Status', $data['search']['value']);
        $this->db->group_end();
        }

        if(isset($data["order"])) {
        $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
        }
        else {
        $order .= 'ID DESC ';
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
        
        $this->db->select('*'); 
        $this->db->from('Otras_Salidas_View');
        $total = $this->db->count_all_results();

        /// get Num rows Total ///
        
        $this->db->select('*'); 
        $this->db->from('Otras_Salidas_View');

        if($data["search"]["value"] !== ''){
        $this->db->group_start();
        $this->db->like('ID', $data['search']['value']);
        $this->db->or_like('Fecha', $data['search']['value']);
        $this->db->or_like('Usuario', $data['search']['value']);
        $this->db->or_like('Concepto', $data['search']['value']);
        $this->db->or_like('Cant_Productos', $data['search']['value']);
        $this->db->or_like('Monto', $data['search']['value']);
        $this->db->or_like('Status', $data['search']['value']);
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
        $dataTable[] = $row["Fecha"];
        $dataTable[] = $row["Usuario"];
        $dataTable[] = $row["Concepto"];
        $dataTable[] = $row["Cant_Productos"];
        $dataTable[] = $row["Monto"];
        $dataTable[] = $row["Status"];
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

    /********************************************************************/
    /***   Función: getDetailsOthers() 	                		      ***/
    /***   Autor: Manuel Esmerio Gacria			        		      ***/
    /***   Fecha: 30/12/2019              					          ***/
    /***   Descripción: Obtener Detalle Otras Salidas                 ***/
    /********************************************************************/
    public function getDetailsOthers($data){
        
        $this->db->select('DOS.*, CA.Producto, LO.Locacion, DI.ID AS idDetalleInventario');
        $this->db->from('Detalle_Otras_Salidas AS DOS');
        $this->db->join('Detalle_inventario AS DI','DOS.idDetalle_Inventario = DI.ID');
        $this->db->join('Inventario AS I','DI.idInventario = I.ID');
        $this->db->join('Locaciones AS LO','DI.idLocacion = LO.ID');
        $this->db->join('Catalogo AS CA','I.idCatalogo = CA.ID');
        $this->db->where('DOS.idOtras_Salidas', $data['id']);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    /********************************************************************/
    /***   Función: _openModalOthers() 	                	          ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 30/12/2019    					                  ***/
    /***   Descripción: Abrir Modal Otras Salidas        		      ***/
    /********************************************************************/
    public function openModalOthers(){
        
        $this->db->select('*');
        $this->db->from('Sucursales');
        $this->db->where('Status', 'Activo');
        $query = $this->db->get();
        $result['Sucursal'] = $query->result_array();

        
        $this->db->limit('80');
        $this->db->select('*');
        $this->db->from('Catalogo');
        $this->db->where('Status', 'Activo');
        $query = $this->db->get();
        $result['Producto'] = $query->result_array();

        return $result;
    }

    /********************************************************************/
    /***   Función: getLocations() 	                				  ***/
    /***   Autor: Manuel Esmerio Gacria			        		      ***/
    /***   Fecha: 30/12/2019              					          ***/
    /***   Descripción: Generar Otras Salidas                         ***/
    /********************************************************************/
    public function getLocations($data){
        
        $this->db->select('DI.*, LO.Locacion,(0) as Cantidad, CA.Producto, CA.ID AS idCatalogo, I.Precio_publico, (0) AS Importe');
        $this->db->from('Inventario AS I');
        $this->db->join('Detalle_inventario AS DI', 'I.ID = DI.idInventario');
        $this->db->join('Locaciones AS LO', 'DI.idLocacion = LO.ID');
        $this->db->join('Catalogo AS CA','I.idCatalogo = CA.ID');
        $this->db->where('I.idCatalogo',$data['idProducto']);
        $this->db->where('I.idSucursal',$data['idSucursal']);
        $this->db->where('DI.Existencias > 0');

        $query  = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    /********************************************************************/
    /***   Función: generar() 	                        	          ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 02/01/2020    					                  ***/
    /***   Descripción: Agregar producto                		      ***/
    /********************************************************************/
    public function generar($data){

        $Otras_Ofertas = array('idUsuario' => $_SESSION['Avyna'][0]['ID'],
                                'Fecha' => date("Y-m-d H:i:s"),
                                'Concepto' => $data['concepto'],
                                'Cant_productos' => $data['cantidad'],
                                'Monto' => $data['total'],
                                'Status' => 'Aceptada',
                                'idSucursal' => $data['idSucursal']);

        $this->db->trans_start();
        $this->db->trans_strict(FALSE);

        $this->db->insert('Otras_Salidas', $Otras_Ofertas);
        $insert_id = $this->db->insert_id();

        foreach ($data['info'] as $key => $value) {
            
            
            $this->db->select('*');
            $this->db->from('Detalle_inventario');
            $this->db->where('ID', $value['ID']);
            $query = $this->db->get();
            $DetailsInventary = $query->result_array();

            $Detalle_Otras_Salidas = array('idOtras_Salidas' => $insert_id,
                                        'idDetalle_Inventario' => $value['ID'],
                                        'Cantidad' => $value['Cantidad'],
                                        'Precio_Unitario' => $value['Precio_publico'],
                                        'Importe' => $value['Importe']);
            $this->db->insert('Detalle_Otras_Salidas', $Detalle_Otras_Salidas);

            $Existencias = intval($DetailsInventary[0]['Existencias']) - intval($value['Cantidad']);

            $this->db->where("ID", $value['ID']);
            $this->db->set('Existencias', $Existencias);
            $this->db->update('Detalle_inventario');
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

    /********************************************************************/
    /***   Función: deleteOthers() 	                        	      ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 02/01/2020    					                  ***/
    /***   Descripción: Cancelar Otras Salidas           		      ***/
    /********************************************************************/
    public function deleteOthers($data){

        
        $this->db->select('*');
        $this->db->from('Detalle_Otras_Salidas');
        $this->db->where('idOtras_Salidas', $data['id']);
        $query = $this->db->get();
        $result = $query->result_array();

        $this->db->trans_start();
        $this->db->trans_strict(FALSE);

        foreach ($result as $key => $value) {

            
            $this->db->select('*');
            $this->db->from('Detalle_inventario');
            $this->db->where('ID', $value['idDetalle_Inventario']);
            $query = $this->db->get();
            $DetailsInventary = $query->result_array();

            $Existencias = intval($DetailsInventary[0]['Existencias']) + intval($value['Cantidad']);

            $this->db->where("ID", $value['idDetalle_Inventario']);
            $this->db->set('Existencias', $Existencias);
            $this->db->update('Detalle_inventario');
        }

        $this->db->where("ID", $data['id']);
        $this->db->set('Status', 'Cancelada');
        $this->db->update('Otras_Salidas');

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

    // Modificar Status y Adeudo Venta //
    public function updateVentaPago($id,$Adeudo)
    {
        $this->db->trans_start(); # Starting Transaction
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        if($Adeudo <= 0){

            # Updating data
            $this->db->where("ID", $id);
            $this->db->set('Adeudo', $Adeudo);
            $this->db->set('Status', 'Pagado');
            $this->db->update('Ventas');
        }
        else{

            $this->db->where("ID", $id);
            $this->db->set('Adeudo', $Adeudo);
            $this->db->set('Status', 'Adeudo');
            $this->db->update('Ventas');
        }

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

    // Obtener Información Venta //
    public function getVentaById($idVenta)
    {
        
        $this->db->select('*');
        $this->db->from('Ventas');
        $this->db->where('ID', $idVenta);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Obtener Información Ventas Query Facturación //
    public function queryFacturacion($idVenta){

        
        $this->db->select("DVMO.ID_Venta, DVMO.Compras_puntos, DVMO.ID, DVMO.idVenta_menudeo, DVMO.idCatalogo, DVMO.idPromocion, DVMO.idOferta, DVMO.Cantidad, round((DVMO.Precio_unitario - (DVMO.Precio_unitario * (O.`Desc` / 100))),2) AS Precio_unitario, round((DVMO.Importe - (DVMO.Cantidad * (DVMO.Precio_unitario * (O.`Desc` / 100)))),2) AS Importe, DVMO.Tipo, DVMO.Setoferta, CA.Producto, CA.Codigo, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT");
        $this->db->from('detalle_venta_menudeo_oferta AS DVMO');
        $this->db->join('Ventas_menudeo as DVM', 'DVMO.idVenta_menudeo = DVM.ID');
        $this->db->join('Ofertas as O', 'DVMO.Setoferta = O.ID');
        $this->db->join('Catalogo AS CA', 'DVMO.idCatalogo = CA.ID');
        $this->db->where('DVMO.ID_Venta', $idVenta);
        $this->db->where('DVMO.Compras_puntos =', 0);
        $this->db->where('DVMO.Setoferta !=', 0);
        $this->db->where('DVM.Status !=', 'Inexistencias');
        $query = $this->db->get();
        $Query1 = $query->result_array();

        $this->db->select("DVMO.*, CA.Producto, CA.Codigo, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT");
        $this->db->from('detalle_venta_menudeo_oferta AS DVMO');
        $this->db->join('Ventas_menudeo as DVM', 'DVMO.idVenta_menudeo = DVM.ID');
        $this->db->join('Catalogo AS CA', 'DVMO.idCatalogo = CA.ID');
        $this->db->where('DVMO.ID_Venta', $idVenta);
        $this->db->where('DVMO.Compras_puntos =', 0);
        $this->db->where('DVMO.Setoferta =', 0);
        $this->db->where('DVM.Status !=', 'Inexistencias');
        $query = $this->db->get();
        $Query2 = $query->result_array();

        $this->db->select("DVMO.*, CONCAT('Promocion N° ', PO.ID) AS Producto, PO.ID AS Codigo, ('Paquete') AS UnidadMedida, ('XPK') AS UnidadSAT, ('01010101') AS ClaveSAT");
        $this->db->from('detalle_venta_menudeo_oferta AS DVMO');
        $this->db->join('Ventas_menudeo as DVM', 'DVMO.idVenta_menudeo = DVM.ID');
        $this->db->join('Promociones AS PO', 'DVMO.idPromocion = PO.ID');
        $this->db->where('DVMO.ID_Venta', $idVenta);
        $this->db->where('DVMO.Tipo =', 'Promocion');
        $this->db->where('DVM.Status !=', 'Inexistencias');
        $query = $this->db->get();
        $Query3 = $query->result_array();

        $info = array_merge($Query1,$Query2,$Query3);

        return $info;
    }


	public function Get_Detalle_Ventas_Menudeo($id)
	{
		$Productos = null;

			$this->db->distinct();
			$this->db->select('DVM.*, CA.Codigo, CA.Producto'); 
			$this->db->from('Detalle_venta_menudeo AS DVM');
			$this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID');
			$this->db->where('DVM.idVenta_menudeo', $id);
            $query = $this->db->get();
            $Query1 = $query->result_array();

            $this->db->distinct();
            $this->db->select("DVM.*, ('N/A') AS Codigo, OF.Nombre AS Producto"); 
            $this->db->from('Detalle_venta_menudeo AS DVM');
            $this->db->join('Ofertas AS OF','DVM.idOferta = OF.ID');
            $this->db->where('DVM.idVenta_menudeo', $id);
            $query = $this->db->get();
            $Query2 = $query->result_array();

            $this->db->distinct();
            $this->db->select("DVM.*, ('N/A') AS Codigo, PRO.Promocion AS Producto"); 
            $this->db->from('Detalle_venta_menudeo AS DVM');
            $this->db->join('Promociones AS PRO','DVM.idPromocion = PRO.ID');
            $this->db->where('DVM.idVenta_menudeo', $id);
            $query = $this->db->get();
            $Query3 = $query->result_array();

            $listInvoice = array_merge($Query1,$Query2,$Query3);

		return $listInvoice;
	}

	public function getClienteById($id)
	{
		$this->db->distinct();
		$this->db->select('CL.*, SU.Compra_minima'); 
		$this->db->from('Clientes AS CL');
        $this->db->join('Sucursales AS SU','CL.idSucursal = SU.ID');
		$this->db->where('CL.ID', $id);
		$query = $this->db->get();
		$result = $query->result_array();

		return $result;
	}

	public function Eliminar_Venta($id)
	{
		$this->db->trans_begin();
        $this->db->trans_strict(FALSE);

        $this->db->select('*'); 
        $this->db->from('cupones_full');
        $this->db->where("idVenta", $id);
        $queryCupon = $this->db->get()->result_array(); 

        if (!empty($queryCupon)) {
            $this->db->set('idVenta', 'NULL', false);
            $this->db->set('Status', 'Activo');
            $this->db->where('ID', $queryCupon[0]['ID']);
            $this->db->update('cupones_full');
        }

		$this->db->query('DELETE FROM Pagos_clientes WHERE idVenta ='.$id.'');
		$this->db->query('DELETE FROM Balance_puntos WHERE idVenta ='.$id.'');
		$this->db->query('DELETE PP.* FROM Ventas AS V INNER JOIN Ventas_menudeo AS VM ON V.ID = VM.idVenta INNER JOIN Pagos_programados AS PP ON VM.ID = PP.idVenta_menudeo WHERE V.ID ='.$id.'');
		$this->db->query('DELETE DVM.* FROM Ventas_menudeo AS VM INNER JOIN Detalle_venta_menudeo AS DVM ON VM.ID = DVM.idVenta_menudeo WHERE VM.idVenta ='.$id.'');
		$this->db->query('DELETE FROM Ventas_menudeo WHERE idVenta ='.$id.'');
		$this->db->query('DELETE FROM Ventas WHERE ID ='.$id.'');

		$logs_ventas_desk = array('idVenta' => $id,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Eliminar',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

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

    public function regresarVenta($id)
    {
        $this->db->trans_begin();
        $this->db->trans_strict(FALSE);

        $this->db->select('*'); 
        $this->db->from('Ventas_menudeo');
        $this->db->where('idVenta', $id);
        $query = $this->db->get();
        $Ventas_Menudeo = $query->result_array();

        for ($i=0; $i < count($Ventas_Menudeo); $i++) { 
            
            $this->db->where('ID', $Ventas_Menudeo[$i]['ID']);
            $this->db->set('idVenta', NULL);
            $this->db->set('Generado', 0);
            $this->db->update('Ventas_menudeo');
        }

        $this->db->select('*'); 
        $this->db->from('cupones_full');
        $this->db->where("idVenta", $id);
        $queryCupon = $this->db->get()->result_array(); 

        if (!empty($queryCupon)) {
            $this->db->set('idVenta', 'NULL', false);
            $this->db->set('Status', 'Activo');
            $this->db->where('ID', $queryCupon[0]['ID']);
            $this->db->update('cupones_full');
        }

        $this->db->query('DELETE FROM Ventas WHERE ID ='.$id.'');

        $logs_ventas_desk = array('idVenta' => $id,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Regresar Venta',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

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

	public function Eliminar_Venta_Menudeo($id)
	{
		$this->db->trans_begin();

		$this->db->query('DELETE PP.* FROM Ventas_menudeo AS VM INNER JOIN Pagos_programados AS PP ON VM.ID = PP.idVenta_menudeo WHERE VM.ID ='.$id.'');
		$this->db->query('DELETE DVM.* FROM Ventas_menudeo AS VM INNER JOIN Detalle_venta_menudeo AS DVM ON VM.ID = DVM.idVenta_menudeo WHERE VM.ID ='.$id.'');
		$this->db->query('DELETE FROM Ventas_menudeo WHERE ID ='.$id.'');

		$logs_ventas_desk = array('idVenta' => $id,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Eliminar Venta Menudeo',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

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


	public function Get_Venta_By_ID($id)
	{
		$Venta = null;

			$this->db->select('*'); 
			$this->db->from('Ventas');
			$this->db->where('ID', $id);
			$query = $this->db->get();
			$result = $query->result_array();
			$Venta = $result;

		return $Venta;
	}

	public function Get_Factura_By_ID($id)
	{
		$Factura = null;

			$this->db->select('*'); 
			$this->db->from('Factura');
			$this->db->where('IDVenta', $id);
			$query = $this->db->get();
			$result = $query->result_array();
			$Factura = $result;

			if (empty($Factura))
			{
				return 0;
			}
			else{

				return 1;
			}
	}

	public function getInfoCliente($id)
    {
        $this->db->select('*');
        $this->db->from('Clientes');
        $this->db->where('ID', $id);
        $query = $this->db->get();
        $result = $query->result_array();
     
        return $result;
    }

    public function Get_Count_Ventas($idCliente)
    {
        $this->db->select('*');
        $this->db->from('Venta');
        $this->db->where('idCliente', $idCliente);
        $query = $this->db->get();
        $result = $query->result_array();
     
        return $result;
    }

	public function enviarPedido($data)
    {
        $idPedidos = explode(",",$data['idPedido']);
        $Referencia = '';

        // Fechas Y Cuota Mensual
        $idCliente = $data['idCliente'];
        $info_Cliente = $this->getInfoCliente($idCliente);

        $fecha = date('Y-m-d');

        $fechainicial = new DateTime($fecha);

        $fechafinal = new DateTime($info_Cliente[0]['Banderazo']);

        $diferencia = $fechainicial->diff($fechafinal);

        $meses = ( $diferencia->y * 12 ) + $diferencia->m;

        if (intval($info_Cliente[0]['Meses_Cuota']) == 0)
        {
            $Cuota_Mensual = ((floatval($info_Cliente[0]['Cuota_Final']) - floatval($info_Cliente[0]['Cuota_Inicial'])) / 1) * intval($meses) + floatval($info_Cliente[0]['Cuota_Inicial']);
        }
        else
        {
            $Cuota_Mensual = ((floatval($info_Cliente[0]['Cuota_Final']) - floatval($info_Cliente[0]['Cuota_Inicial'])) / intval($info_Cliente[0]['Meses_Cuota'])) * intval($meses) + floatval($info_Cliente[0]['Cuota_Inicial']);
        }

        if ($data['idSucursal'] != 1)
        {
            $Venta = array('Fecha_venta' => date("Y-m-d H:i:s"),
                        'idCliente' => $data['idCliente'],
                        'Descuento' => $data['Descuento'],
                        'Subtotal' => $data['Subtotal'],
                        'Impuestos' => $data['Impuesto'],
                        'Total' => $data['Total'],
                        'Adeudo' => $data['Adeudo'],
                        'Status' => $data['Status'],
                        'Pedidos' => $data['Pedidos'],
                        'Extraido' => $data['Extraido'],
                        'Empaquetado' => $data['Empaquetado'],
                        'Timbrado' => 1,
                        'Tipo_Factura' => $data['Tipo_Factura'],
                        'Cuota' => $info_Cliente[0]['Cuota']);
        }
        else
        {
            $Venta = array('Fecha_venta' => date("Y-m-d H:i:s"),
                        'idCliente' => $data['idCliente'],
                        'Descuento' => $data['Descuento'],
                        'Subtotal' => $data['Subtotal'],
                        'Impuestos' => $data['Impuesto'],
                        'Total' => $data['Total'],
                        'Adeudo' => $data['Adeudo'],
                        'Status' => $data['Status'],
                        'Pedidos' => $data['Pedidos'],
                        'Extraido' => $data['Extraido'],
                        'Empaquetado' => $data['Empaquetado'],
                        'Timbrado' => $data['Timbrado'],
                        'Tipo_Factura' => $data['Tipo_Factura'],
                        'Cuota' => $info_Cliente[0]['Cuota']);
        }

        $this->db->trans_begin();

        #DELETE FROM table_name WHERE some_column = some_value

        $this->db->insert('Ventas', $Venta);
        $insert_id = $this->db->insert_id();

        $logs_ventas_desk = array('idVenta' => $insert_id,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Generar',
                                'idUsuario' => $idCliente);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

        $this->db->query('UPDATE Clientes SET Meses_Actuales = '.$meses.', Cuota = '.$Cuota_Mensual.'  WHERE ID = '.$idCliente.'');

        for ($i=0; $i < count($idPedidos); $i++)
        { 
            $this->db->query('UPDATE Ventas_menudeo SET idVenta = '.$insert_id.', Generado = 1  WHERE ID = '.$idPedidos[$i].'');
        }

        ///////////////////////////////////////////////////
        ////////     Obtener Referencia ID Venta //////////
        ///////////////////////////////////////////////////
        switch(strlen($insert_id)){
            case 1:
                $RefVenta = "000000" . $insert_id;
                break;
            case 2:
                $RefVenta = "00000" . $insert_id;
                break;
            case 3:
                $RefVenta = "0000" . $insert_id;
                break;
            case 4:
                $RefVenta = "000" . $insert_id;
                break;
            case 5:
                $RefVenta =  "00" . $insert_id;
                break;
            case 6:
                $RefVenta = "0" . $insert_id;
                break;
            case 7:
                $RefVenta = $insert_id;
                break;
        }

        ///////////////////////////////////////////////////
        ////////     Obtener Referencia ID Cliente ////////
        ///////////////////////////////////////////////////
        switch (strlen(trim($data['idCliente']))){
            case 1:
                $RefCliente = "0000" . $data['idCliente'];
            case 2:
                $RefCliente = "000" . $data['idCliente'];
                break;
            case 3:
                $RefCliente = "00" . $data['idCliente'];
                break;
            case 4:
                $RefCliente = "0" . $data['idCliente'];
                break;
            case 5:
                $RefCliente = $data['idCliente'];
                break;
        }
        ///////////////////////////////////////////////////
        ////////     Obtener Referencia Monto Venta ///////
        ///////////////////////////////////////////////////
        switch (strlen(intval(trim($data['Total'])))){
            case 1:
                $RefMonto = "00000" . intval(trim($data['Total']));
                break;
            case 2:
                $RefMonto = "0000" . intval(trim($data['Total']));
                break;
            case 3:
                $RefMonto = "000" . intval(trim($data['Total']));
                break;
            case 4:
                $RefMonto = "00" . intval(trim($data['Total']));
                break;
            case 5:
                $RefMonto = "0" . intval(trim($data['Total']));
                break;
            case 6:
                $RefMonto = intval(trim($data['Total']));
                break;
        }

        ////////////////////////////////////////////////////////////////////////////////////
        ////////  Obtener Referencia Fecha Limite Pago (1 dias despues de la venta) ////////
        ////////////////////////////////////////////////////////////////////////////////////
        // $fechaActual = date("dmy");
        // $RefFecha = (date("d")+1).date("m").date("y");

        if(strlen(date("d")+1) <= 1){
            $dia = "0".(date("d")+1);
        }else{
            $dia = date("d")+1;
        }
        $RefFecha = ($dia).''.date("m").date("y");

        ////////////////////////////////////////////////////////////////////////////////////////////
        ////////  Obtener Referencia Fecha Juliana Limite Pago (1 dias despues de la venta) ////////
        ///////////////////////////////////////////////////////////////////////////////////////////
        //calculo timestam de las dos fechas
        // $dtjuliana = mktime(0,0,0,01,01,2013);
        // $mañana = mktime(0, 0, 0, date("m")  , date("d")+1, date("Y"));
        // // resto a una fecha la otra
        // $segundos_diferencia = $dtjuliana - $mañana;
        // // convertimos segundos en dias
        // $dias_diferencia = $segundos_diferencia / (60 * 60 * 24);

        // $fecha_juliana = (($dia -1) + ((date("m") -1) * 31) + ((date("Y") - (2013)) * 372);
        $fecha_juliana = ((date("d")+1) -1) + ((date("m") -1) * 31) + ((date("Y") - (2013)) * 372);


        $RefVerificadorImporte = $this->getVerificadorImporte(intval(trim($data['Total'])));

        $Referencia = $this->getReferencia($RefCliente.''.$RefVenta.''.$RefMonto.''.$RefFecha.''.$fecha_juliana.''.$RefVerificadorImporte);

        $this->db->query('UPDATE Ventas SET Referencia = "'.$Referencia.'"  WHERE ID = '.$insert_id.'');

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

    //////////////////////////////////////////////////////
    //// Obtener Verificar de Importe Referencia /////////
    //////////////////////////////////////////////////////

    public function getVerificadorImporte($Monto){

        if (strlen($Monto) > 0){
            $contador = 1;
            $result = 0;
            $arrayReverse = array_reverse(str_split($Monto));
            
            for ($i = 0; $i < count($arrayReverse); $i++) {
                if($contador == 7){
                    $result += intval($arrayReverse[$i]) * $contador;
                    $contador = 3;
                }else if($contador == 3){
                    $result += intval($arrayReverse[$i]) * $contador;
                    $contador = 1;
                }
                else{
                    $result += intval($arrayReverse[$i]) * $contador;
                    $contador = 7;
                }
            }
            
            return intval($result) % 10;
        }
    }

    public function getReferenciaBanregio($referencia){
        if (strlen($referencia) > 0){
            $contador = 2;
            $result = 0;
            $arrayReverse = array_reverse(str_split($referencia));
            
            for ($i = 0; $i < count($arrayReverse); $i++) {
                if($contador == 2){
                    $result += $this->sumaCifras(intval($arrayReverse[$i]) * $contador);
                    $contador = 1;
                }
                else{
                    $result += $this->sumaCifras(intval($arrayReverse[$i]) * $contador);
                    $contador = 2;
                }
            }
            
            return $referencia . intval($result) % 10;
        }
        else{
            return 'Campo referencia vacio';
        }
    }


    public function getReferencia($referencia)
    {
        $DV = 0;
        $contador = 0;
        $ponderador = 0;
        $result = 0;

        if (strlen($referencia) > 0)
        {
            $arrayLinea          = str_split($referencia);

            $arrayPond           = array();
            $arrayponderador     = 0;

            for ($i=0; $i < count($arrayLinea); $i++)
            { 
                if ((count($arrayLinea) % 2) == 0)
                {
                    if ($contador == 0)
                    {
                        $arrayPond[$i] = 1;
                        $contador      = 1;
                    }
                    else
                    {
                        $arrayPond[$i] = 2;
                        $contador      = 0;
                    }
                }
                else
                {
                    if ($contador == 0)
                    {
                        $arrayPond[$i] = 2;
                        $contador = 1;
                    }
                    else
                    {
                        $arrayPond[$i] = 1;
                        $contador = 0;
                    }
                }
            }


            for ($x=0; $x < count($arrayLinea); $x++)
            { 
                $ponderador = $arrayLinea[$x] * $arrayPond[$x];

                if ($ponderador >= 10)
                {
                    $result = $this->sumaCifras($ponderador);
                    $arrayponderador += $result;
                }
                else
                {
                   $arrayponderador += $ponderador; 
                }
            }

            $DV = 10 - ($arrayponderador % 10);

            if ($DV == 10)
            {
                $DV = 0;
            }

            return $referencia.$DV;
        }
        else
        {
            return "Campo referencia vacio";
        }
    }


    public function sumaCifras($num)
    {
        $acum = 0;

        while ($num != 0)
        {
            $cifras = $num % 10;
            $acum += $cifras;
            $num = $num / 10;
        }

        return $acum;
    }

}