<?php

date_default_timezone_set('America/Mexico_City');

class Compras_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
       // $this->load->database();
        parent::__construct();
    }

    // Acción Agregar OC //
    public function addOC($data)
    {
        $idCatalogo = array();
        $Cantidad   = array();
        $Costo      = array();
        $Importe    = array();

        $idCatalogo = explode(",", $data['idCatalogo']);
        $Cantidad   = explode(",", $data['Cantidad']);
        $Costo      = explode(",", $data['Costo']);
        $Importe    = explode(",", $data['Importe']);

        $this->db->trans_begin();

        $OC = array('idSucursal' => $data['idSucursal'],
					'idUsuario' => $data['idUsuario'],
					'Fecha' => date("Y-m-d H:i:s"),
					'idProveedor' => $data['idProveedor'],
					'Cantidad_productos' => $data['Cantidad_productos'],
					'Monto' => $data['Monto'],
                    'Status' => $data['Status'],
                    'Referencia' => $data['Referencia'],
                    'idCliente' => '1');

        $this->db->insert('Ordenes_compra', $OC);
        $insert_id = $this->db->insert_id();

        for ($i=0; $i < count($idCatalogo); $i++){ 

            $Detalle_orden_compra = array('idOrden_compra' => $insert_id,
                                    'idCatalogo' => $idCatalogo[$i],
                                    'Cantidad' => $Cantidad[$i],
                                    'Precio_unitario' => $Costo[$i],
                                    'Importe' => $Importe[$i],
                                    'Restantes' => $Cantidad[$i]);

            $this->db->insert('Detalle_orden_compra',$Detalle_orden_compra);
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
    
    /// Acción Editar OC //
    public function UpdateOCStatus($data)
    {

        $this->db->trans_begin();

        $OC = array('Status' => $data['Status']);

        $this->db->where('ID',$data['idOC']);
        $this->db->update('Ordenes_compra', $OC);

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }


    /// Acción Editar OC //
    public function UpdateOC($data)
    {
        $idCatalogo = array();
        $Cantidad   = array();
        $Costo      = array();
        $Importe    = array();

        $idCatalogo = explode(",", $data['idCatalogo']);
        $Cantidad   = explode(",", $data['Cantidad']);
        $Costo      = explode(",", $data['Costo']);
        $Importe    = explode(",", $data['Importe']);

        $this->db->trans_begin();

        $OC = array('idSucursal' => $data['idSucursal'],
					'idUsuario' => $data['idUsuario'],
					'Fecha' => date("Y-m-d H:i:s"),
					'idProveedor' => $data['idProveedor'],
					'Cantidad_productos' => $data['Cantidad_productos'],
					'Monto' => $data['Monto'],
                    'Status' => $data['Status'],
                    'Referencia' => $data['Referencia']);

        $this->db->where('ID',$data['idOC']);
        $this->db->update('Ordenes_compra', $OC);

        $this->db->where('idOrden_compra', $data['idOC']);
        $this->db->delete('Detalle_orden_compra');

        for ($i=0; $i < count($idCatalogo); $i++){ 

            $Detalle_orden_compra = array('idOrden_compra' => $data['idOC'],
                                    'idCatalogo' => $idCatalogo[$i],
                                    'Cantidad' => $Cantidad[$i],
                                    'Precio_unitario' => $Costo[$i],
                                    'Importe' => $Importe[$i],
                                    'Restantes' => $Cantidad[$i]);

            $this->db->insert('Detalle_orden_compra',$Detalle_orden_compra);
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

    // Acción Eliminar OC //
    public function DeleteOC($id)
    {
        $this->db->trans_begin();

        $this->db->where('ID',$id);
        $this->db->set('Status','Cancelado');
        $this->db->update('Ordenes_compra');

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    public function getDetalleOrdenCompraById($id){
        $this->db->select('*'); 
        $this->db->from('Detalle_orden_compra');
        $this->db->where('ID', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function generarCompraParcial($data){

        $Orden    = $this->getOrdenCompraById($data['idOC']);
        $idDetalleOC = explode(",", $data['ID']);
        $Compra = explode(",", $data['Compra']);
        $Precio = explode(",", $data['Precio']);
        $TotalCompraParcial = 0;

        for ($i=0; $i < count($idDetalleOC); $i++) { 
            $TotalCompraParcial += intval($Compra[$i]) * floatval($Precio[$i]);
        }

        $Subtotal = number_format((floatval($TotalCompraParcial / 1.16)), 2, '.', '');
        $Impuesto = number_format((floatval($TotalCompraParcial - $Subtotal)), 2, '.', '');

        $Compras = array('Fecha_compra' => date("Y-m-d H:i:s"),
                        'idProveedor' => $Orden[0]['idProveedor'],
                        'Subtotal' => number_format($Subtotal, 2, '.', '') ,
                        'Impuestos' => number_format($Impuesto, 2, '.', ''),
                        'Total' => number_format($TotalCompraParcial, 2, '.', ''),
                        'Total_mx' => number_format($TotalCompraParcial, 2, '.', ''),
                        'Adeudo' => number_format($TotalCompraParcial, 2, '.', ''),
                        'Status' => 'Pendiente',
                        'idSucursal' => $Orden[0]['idSucursal'],
                        'Codigo_compra' => $Orden[0]['ID']);

        $this->db->trans_start(); # Starting Transaction
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->insert('Compras', $Compras);
        $insert_id = $this->db->insert_id();

        for ($i=0; $i < count($idDetalleOC); $i++){ 

            $details    = $this->getDetalleOrdenCompraById($idDetalleOC[$i]);

            $Detalle_compras = array('idCompra' => $insert_id,
                                    'idCatalogo' => $details[0]['idCatalogo'],
                                    'Cantidad' => $Compra[$i],
                                    'Costo_unitario' => $Precio[$i],
                                    'Costo_unitario_mx' => $Precio[$i],
                                    'Importe' => intval($Compra[$i]) * floatval($Precio[$i]),
                                    'Importe_mx' => intval($Compra[$i]) * floatval($Precio[$i]));
            $this->db->insert('Detalle_compras',$Detalle_compras);

            $Restantes = intval($details[0]['Restantes']) - intval($Compra[$i]);

            $this->db->set('Restantes', $Restantes);
            $this->db->where('ID', $idDetalleOC[$i]);
            $this->db->update('detalle_orden_compra');
        }

        // $this->db->set('Status', 'Generada');
        $this->db->set('idCompra_avyna', $insert_id);
        $this->db->where('ID', $data['idOC']);
        $this->db->update('ordenes_compra');

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

    // Acción Generar Compra //
    public function generarCompra($id)
    {
        $detalle  = $this->getDetalleOrdenCompra($id);
        $Orden    = $this->getOrdenCompraById($id);
        $Subtotal = floatval($Orden[0]['Monto'] / 1.16);
        $Impuesto = floatval($Orden[0]['Monto'] - $Subtotal);

        $Compras = array('Fecha_compra' => date("Y-m-d H:i:s"),
                        'idProveedor' => $Orden[0]['idProveedor'],
                        'Subtotal' => number_format($Subtotal, 2, '.', '') ,
                        'Impuestos' => number_format($Impuesto, 2, '.', ''),
                        'Total' => $Orden[0]['Monto'],
                        'Total_mx' => $Orden[0]['Monto'],
                        'Adeudo' => $Orden[0]['Monto'],
                        'Status' => 'Pendiente',
                        'idSucursal' => $Orden[0]['idSucursal'],
                        'Codigo_compra' => $Orden[0]['ID']);

        $this->db->trans_start(); # Starting Transaction
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->insert('Compras', $Compras); # Inserting data
        $insert_id = $this->db->insert_id();

        for ($i=0; $i < count($detalle); $i++){ 

            $Detalle_compras = array('idCompra' => $insert_id,
                                    'idCatalogo' => $detalle[$i]['idCatalogo'],
                                    'Cantidad' => $detalle[$i]['Cantidad'],
                                    'Costo_unitario' => $detalle[$i]['Precio_unitario'],
                                    'Costo_unitario_mx' => $detalle[$i]['Precio_unitario'],
                                    'Importe' => $detalle[$i]['Importe'],
                                    'Importe_mx' => $detalle[$i]['Importe']);

            $this->db->insert('Detalle_compras',$Detalle_compras);
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

    // Obtener Detalle OC By idOC //
    public function getDetalleOrdenCompra($idOrdenCompra){
        
        $this->db->select('DOC.*, CA.Codigo, CA.Producto'); 
        $this->db->from('Detalle_orden_compra AS DOC');
        $this->db->join('Catalogo AS CA','DOC.idCatalogo = CA.ID');
        $this->db->where('DOC.idOrden_compra', $idOrdenCompra);
        $query = $this->db->get();
        return $query->result_array();
    }

     // Obtener Detalle OC By idOC //
     public function getDetalleOrdenCompraRestante($idOrdenCompra){
         
         $this->db->select('DOC.*, CA.Codigo, CA.Producto'); 
         $this->db->from('Detalle_orden_compra AS DOC');
         $this->db->join('Catalogo AS CA','DOC.idCatalogo = CA.ID');
         $this->db->where('Restantes > 0');
         $this->db->where('DOC.idOrden_compra', $idOrdenCompra);
         $query = $this->db->get();
         $response['OC'] = $query->result_array();

         $this->db->select("oc.ID, oc.Fecha, s.Sucursal AS Cliente, CONCAT(p.Nombre, ' ', p.Apellidos) AS Proveedor, oc.Cantidad_productos, oc.Referencia"); 
         $this->db->from('ordenes_compra oc');
         $this->db->join('sucursales s','oc.idCliente = s.ID');
         $this->db->join('proveedores p','oc.idProveedor = p.ID');
         $this->db->where('oc.ID', $idOrdenCompra);
         $query = $this->db->get();
         $response['Info'] = $query->result_array();

         return $response;
     }

    // Agregar Compra //
    public function addCompra($data)
    {
        $idCatalogo = array();
        $Cantidad   = array();
        $Costo      = array();
        $Importe    = array();

        $idCatalogo = explode(",", $data['idCatalogo']);
        $Cantidad   = explode(",", $data['Cantidad']);
        $Costo      = explode(",", $data['Costo']);
        $Importe    = explode(",", $data['Importe']);

        $this->db->trans_begin();

        $Sucursales = $this->Get_Sucursales($data['idSucursal']);

        $Compra = array('Fecha_compra' => date("Y-m-d H:i:s"),
                            'idProveedor' => $data['idProveedor'],
                            'Subtotal' => $data['Subtotal'],
                            'Impuestos' => $data['Impuesto'],
                            'Total' => $data['Total'],
                            'Total_mx' => $data['Total'],
                            'Adeudo' => $data['Total'],
                            'Status' => 'Pendiente',
                            'idSucursal' => $data['idSucursal'],
                            'Codigo_compra' => $data['Codigo']);

        $this->db->insert('Compras', $Compra);
        $insert_id = $this->db->insert_id();

        for ($i=0; $i < count($idCatalogo); $i++){ 

            $Detalle_compras = array('idCompra' => $insert_id,
                                    'idCatalogo' => $idCatalogo[$i],
                                    'Cantidad' => $Cantidad[$i],
                                    'Costo_unitario' => $Costo[$i],
                                    'Costo_unitario_mx' => $Costo[$i],
                                    'Importe' => $Importe[$i],
                                    'Importe_mx' => $Importe[$i],
                                    'idLocacion' => $Sucursales[0]['idLocacion_Predeterminada']);

            $this->db->insert('Detalle_compras',$Detalle_compras);
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

    // Obtener Detalle Compra //
    public function getDetalleCompra($idCompra)
    {
        
        $this->db->select('DC.*, CA.Codigo, CA.Producto,C.idSucursal'); 
        $this->db->from('Detalle_compras AS DC');
        $this->db->join('Catalogo AS CA','DC.idCatalogo = CA.ID');
        $this->db->join('Compras AS C','DC.idCompra = C.ID');
        $this->db->where('DC.idCompra', $idCompra);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Lista de Productos Editar OC //
    public function getEditarDetalleOrdenCompra($idOrdenCompra)
    {

        
        $this->db->select('CA.ID, CA.Codigo, CA.Producto, (0) AS Cantidad, (0) AS Costo, (0) AS Importe'); 
        $this->db->from('Catalogo AS CA');
        $this->db->where('CA.ID NOT IN (select idCatalogo from Detalle_orden_compra where idOrden_compra = '.$idOrdenCompra.')');
        $query = $this->db->get();
        $Query1 = $query->result_array();

        
        $this->db->select('CA.ID, CA.Codigo, CA.Producto, DOC.Cantidad, DOC.Precio_unitario AS Costo, DOC.Importe'); 
        $this->db->from('Detalle_orden_compra AS DOC');
        $this->db->join('Catalogo AS CA','DOC.idCatalogo = CA.ID');
        $this->db->where('DOC.idOrden_compra',$idOrdenCompra);
        $query = $this->db->get();
        $Query2 = $query->result_array();

        return array_merge($Query1,$Query2);

    }

    // Obtener info Orden de Comrpa By ID //
    public function getOrdenCompraById($id)
    {
        
        $this->db->select('*'); 
        $this->db->from('Ordenes_compra');
        $this->db->where('ID', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener info Orden de Comrpa By ID Anticipo //
    public function getOrdenCompraByIdAnticipo($id)
    {  
        $this->db->select("OC.*, SU.Sucursal, CONCAT(US.Nombre,' ',US.Apellidos) AS Usuario, CONCAT(PR.Nombre,' ',PR.Apellidos) AS Proveedor"); 
        $this->db->from('Ordenes_compra AS OC');
        $this->db->join('Sucursales AS SU','OC.idSucursal = SU.ID');
        $this->db->join('Usuarios AS US','OC.idUsuario = US.ID');
        $this->db->join('Proveedores AS PR','OC.idProveedor = PR.ID');
        $this->db->where('OC.ID', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener info Factura Compra //
    public function getInfoCompraById($id)
    {  
        $this->db->select("CO.*, OC.Monto, OC.Cantidad_productos, CONCAT(PR.Nombre,' ',PR.Apellidos) AS Proveedor, CONCAT(US.Nombre,' ',US.Apellidos) AS Usuario, SU.Sucursal"); 
        $this->db->from('Compras AS CO');
        $this->db->join('Ordenes_compra AS OC','CO.ID = OC.idCompra_avyna');
        $this->db->join('Sucursales AS SU','CO.idSucursal = SU.ID');
        $this->db->join('Usuarios AS US','OC.idUsuario = US.ID');
        $this->db->join('Proveedores AS PR','CO.idProveedor = PR.ID');
        $this->db->where('CO.ID', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    /// Obtener Anticipos By idOC ///
    public function getAnticiposByIdOC($id)
    {    
        $this->db->select("AN.*, CONCAT(US.Nombre,' ',US.Apellidos) AS Usuario"); 
        $this->db->from('Anticipos_OC AS AN');
        $this->db->join('Usuarios AS US','AN.idUsuario_registro = US.ID');
        $this->db->where('AN.idOC', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtner FacturasTemp By idAnticipo //
    public function getFacturasAnticipoByidAnticipo($id)
    {
        $this->db->select("*"); 
        $this->db->from('factura_anticipo');
        $this->db->where('idAnticipo_oc', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    /// Agregar Anticipo ///
    public function generarAnticipo($data)
    {
        $this->db->trans_begin();

        $Anticipos = array('idOC' => $data['idOC'],
                        'idUsuario_registro' => $data['idUsuario_registro'],
                        'Fecha_hora' => date("Y-m-d H:i:s"),
                        'Monto' => $data['Monto'],
                        'Forma_pago' => $data['Forma_pago'],
                        'Observaciones' => $data['Observaciones'],
                        'Status' => $data['Status']);
   
        $this->db->insert('Anticipos_OC', $Anticipos);
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

    // Modificar Anticipo //
    public function UpdateAnticipo($data)
    {
        $this->db->trans_begin();

        $Anticipos = array('idOC' => $data['idOC'],
                        'idUsuario_registro' => $data['idUsuario_registro'],
                        'Fecha_hora' => date("Y-m-d H:i:s"),
                        'Monto' => $data['Monto'],
                        'Forma_pago' => $data['Forma_pago'],
                        'Observaciones' => $data['Observaciones'],
                        'Status' => $data['Status']);

        $this->db->where('ID',$data['id']);
        $this->db->Update('Anticipos_OC', $Anticipos);
       
        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    /// Acción Cancelar Anticipo ///
    public function deleteAnticipo($data)
    {
        $this->db->trans_begin();

        $this->db->where('ID',$data['id']);
        $this->db->set('Status','Cancelado');
        $this->db->Update('Anticipos_OC');
       
        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    // Obtener IfnomacionFactura Anticipo //
    public function getInfoFacturasAnticipos($data)
    {
        
        $this->db->select('*'); 
        $this->db->from('factura_anticipo');
        $this->db->where('idAnticipo_oc', $data['id']);
        $query = $this->db->get();
        return $query->num_rows();
    }

    // Acción Eliminar Compra //
    public function deleteCompra($idCompra)
    {
        $this->db->trans_start(); # Starting Transaction
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        // Eliminar Detalle Compra y Compra //
        $this->db->query('DELETE FROM Detalle_compras WHERE idCompra ='.$idCompra.'');
        $this->db->query('DELETE FROM Compras WHERE ID ='.$idCompra.'');

        $this->db->trans_complete(); # Completing transaction

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

    // Acción Agregar Inventario //
    public function addInventario($data)
    {
        $idCatalogo = array();
        $idSucursal = array();
        $Cantidad   = array();
        $Precio     = array();
        $idLocacion = array();

        $idCatalogo = explode(",", $data['idCatalogo']);
        $idSucursal = explode(",", $data['idSucursal']);
        $Cantidad   = explode(",", $data['Cantidad']);
        $Precio     = explode(",", $data['Precio']);
        $idLocacion = explode(",", $data['idLocacion']);

        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        for ($i=0; $i < count($idCatalogo) ; $i++){ 

            $Inventario = $this->Get_Inventario($idCatalogo[$i],$idSucursal[$i]);
            $Sucursales = $this->Get_Sucursales($idSucursal[$i]);

            if (count($Inventario) > 0){

                $Detalle_compras = array('idInventario' => $Inventario[0]['ID'],
                                        'Existencias' => $Cantidad[$i],
                                        'Costo_compra' => $Precio[$i],
                                        'Costo_compra_mx' => $Precio[$i],
                                        'Fecha_compra' => $data['Fecha_Compra'],
                                        'Fecha_ingreso' => date("Y-m-d H:i:s"),
                                        'Pedimento' => 'Pedimento',
                                        'Precio_distribuidor' => 0.00,
                                        'Precio_salon' => 0.00,
                                        'Precio_publico' => 0.00,
                                        'idLocacion' => $Sucursales[0]['idLocacion_Predeterminada'],
                                        'Existencias_apartados' => '');

                $this->db->insert('Detalle_inventario',$Detalle_compras);
            }
            else{

                $Inventario = array('idCatalogo' => $idCatalogo[$i],
                                        'idSucursal' => $idSucursal[$i],
                                        'Min' => 0,
                                        'Precio_publico' => $Precio[$i],
                                        'Cantidad_puntos' => 0);

                $this->db->insert('Inventario', $Inventario);
                $insert_id = $this->db->insert_id();

                if ($insert_id > 0){

                    $Detalle_compras = array('idInventario' => $insert_id,
                                        'Existencias' => $Cantidad[$i],
                                        'Costo_compra' => $Precio[$i],
                                        'Costo_compra_mx' => $Precio[$i],
                                        'Fecha_compra' => $data['Fecha_Compra'],
                                        'Fecha_ingreso' => date("Y-m-d H:i:s"),
                                        'Pedimento' => 'Pedimento',
                                        'Precio_distribuidor' => 0.00,
                                        'Precio_salon' => 0.00,
                                        'Precio_publico' => 0.00,
                                        'idLocacion' => $Sucursales[0]['idLocacion_Predeterminada'],
                                        'Existencias_apartados' => '');

                    $this->db->insert('Detalle_inventario',$Detalle_compras);
                }
            }
        }

        $this->db->query('UPDATE Compras SET Status = "Recibido" WHERE ID='.$data['ID'].'');

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

    /////////////////////////////////////
    //////// Funciones Viejas ///////////
    

    public function Get_Detalle_Compra($id)
    {
        
        $this->db->select('DC.*, CA.Codigo, CA.Producto,C.idSucursal'); 
        $this->db->from('Detalle_compras AS DC');
        $this->db->join('Catalogo AS CA','DC.idCatalogo = CA.ID');
        $this->db->join('Compras AS C','DC.idCompra = C.ID');
        $this->db->where('DC.idCompra', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Delete_Compra($id)
    {
        $this->db->trans_begin();

        $this->db->query('DELETE FROM Detalle_compras WHERE idCompra ='.$id.'');
        $this->db->query('DELETE FROM Compras WHERE ID ='.$id.'');

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

    public function Get_Inventario($idCatalogo,$idSucursal)
    {
        
        $this->db->select('*'); 
        $this->db->from('Inventario');
        $this->db->where('idCatalogo', $idCatalogo);
        $this->db->where('idSucursal', $idSucursal);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function getProveedor() 
    {
        
        $this->db->select('PRO.*, MO.Moneda AS Currency'); 
        $this->db->from('Proveedores AS PRO');
        $this->db->join('Monedas AS MO','PRO.Moneda = MO.ID');
        $this->db->where ('PRO.Status','Activo');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function getBodega() 
    {
        
        $this->db->select('*'); 
        $this->db->from('Sucursales');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Catalogo()
    {   
        
        $this->db->select('*'); 
        $this->db->from('Catalogo');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Bodega($idBodega)
    {
        
        $this->db->select('*'); 
        $this->db->from('Sucursales');
        $this->db->where('ID',$idBodega);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Sucursales($idSucursal)
    {
        
        $this->db->select('*'); 
        $this->db->from('Sucursales');
        $this->db->where('ID', $idSucursal);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Add_Compra($data)
    {
        $idCatalogo = array();
        $Cantidad   = array();
        $Costo      = array();
        $Importe    = array();

        $idCatalogo = explode(",", $data['idCatalogo']);
        $Cantidad   = explode(",", $data['Cantidad']);
        $Costo      = explode(",", $data['Costo']);
        $Importe    = explode(",", $data['Importe']);

        $this->db->trans_begin();

        $Sucursales = $this->Get_Sucursales($data['idSucursal']);

        $Compra = array('Fecha_compra' => date("Y-m-d H:i:s"),
                            'idProveedor' => $data['idProveedor'],
                            'Subtotal' => $data['Subtotal'],
                            'Impuestos' => $data['Impuesto'],
                            'Total' => $data['Total'],
                            'Total_mx' => $data['Total'],
                            'Adeudo' => $data['Total'],
                            'Status' => 'Pendiente',
                            'idSucursal' => $data['idSucursal'],
                            'Codigo_compra' => $data['Codigo']);

        $this->db->insert('Compras', $Compra);
        $insert_id = $this->db->insert_id();


        for ($i=0; $i < count($idCatalogo); $i++)
        { 
            $Detalle_compras = array('idCompra' => $insert_id,
                                    'idCatalogo' => $idCatalogo[$i],
                                    'Cantidad' => $Cantidad[$i],
                                    'Costo_unitario' => $Costo[$i],
                                    'Costo_unitario_mx' => $Costo[$i],
                                    'Importe' => $Importe[$i],
                                    'Importe_mx' => $Importe[$i],
                                    'idLocacion' => $Sucursales[0]['idLocacion_Predeterminada']);

            $this->db->insert('Detalle_compras',$Detalle_compras);
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

    public function Agregar_Detalle($data)
    {
        $idCatalogo = array();
        $idSucursal = array();
        $Cantidad   = array();
        $Precio     = array();
        $idLocacion = array();

        $idCatalogo = explode(",", $data['idCatalogo']);
        $idSucursal = explode(",", $data['idSucursal']);
        $Cantidad   = explode(",", $data['Cantidad']);
        $Precio     = explode(",", $data['Precio']);
        $idLocacion = explode(",", $data['idLocacion']);

        $this->db->trans_begin();

        for ($i=0; $i < count($idCatalogo) ; $i++)
        { 
            $Inventario = $this->Get_Inventario($idCatalogo[$i],$idSucursal[$i]);
            $Sucursales = $this->Get_Sucursales($idSucursal[$i]);

            if (count($Inventario) > 0)
            {

                $Detalle_compras = array('idInventario' => $Inventario[0]['ID'],
                                        'Existencias' => $Cantidad[$i],
                                        'Costo_compra' => $Precio[$i],
                                        'Costo_compra_mx' => $Precio[$i],
                                        'Fecha_compra' => $data['Fecha_Compra'],
                                        'Fecha_ingreso' => date("Y-m-d H:i:s"),
                                        'Pedimento' => 'Pedimento',
                                        'Precio_distribuidor' => 0.00,
                                        'Precio_salon' => 0.00,
                                        'Precio_publico' => 0.00,
                                        'idLocacion' => $Sucursales[0]['idLocacion_Predeterminada'],
                                        'Existencias_apartados' => '');

                $this->db->insert('Detalle_inventario',$Detalle_compras);
            }
            else
            {
                $Inventario = array('idCatalogo' => $idCatalogo[$i],
                                        'idSucursal' => $idSucursal[$i],
                                        'Min' => 0,
                                        'Precio_publico' => $Precio[$i],
                                        'Cantidad_puntos' => 0);

                $this->db->insert('Inventario', $Inventario);
                $insert_id = $this->db->insert_id();

                if ($insert_id > 0)
                {
                    $Detalle_compras = array('idInventario' => $insert_id,
                                        'Existencias' => $Cantidad[$i],
                                        'Costo_compra' => $Precio[$i],
                                        'Costo_compra_mx' => $Precio[$i],
                                        'Fecha_compra' => $data['Fecha_Compra'],
                                        'Fecha_ingreso' => date("Y-m-d H:i:s"),
                                        'Pedimento' => 'Pedimento',
                                        'Precio_distribuidor' => 0.00,
                                        'Precio_salon' => 0.00,
                                        'Precio_publico' => 0.00,
                                        'idLocacion' => $Sucursales[0]['idLocacion_Predeterminada'],
                                        'Existencias_apartados' => '');

                    $this->db->insert('Detalle_inventario',$Detalle_compras);
                }

            }
        }

        $this->db->query('UPDATE Compras SET Status = "Recibido" WHERE ID='.$data['ID'].'');

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

?>