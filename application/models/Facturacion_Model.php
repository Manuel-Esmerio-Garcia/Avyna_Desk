<?php

date_default_timezone_set('America/Mexico_City');

class Facturacion_Model extends CI_Model 
{
	public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // Función Exportar Inventario General //
    public function csvFactura($data)
    {
        
        $this->db->select('IDVenta,Fecha_Timbrado,Distribuidor,RFC,ID,Folio,SubtotalInvoice,ImpuestoInvoice,TotalInvoice,Status,UUID,IDIntegrador,Tipo_Factura'); 
        //$this->db->select('*');
        $this->db->from('Facturas_Facturadas');
        // Filtros Inventario General //
        if ($data['DateStartFacturas'] && $data['DateEndFacturas']){$this->db->where('Fecha_Timbrado BETWEEN "'.$data["DateStartFacturas"].'" AND "'.$data["DateEndFacturas"].'"');}
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    // Obtener Factura By idFactura //
    public function getFacturaById($idFactura){

        
        $this->db->select('*');
        $this->db->from('Factura');
        $this->db->where('ID', $idFactura);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Obtener Factura By idVenta //
    public function getFacturaByIdVenta($idVenta){

        
        $this->db->select('*');
        $this->db->from('Factura');
        $this->db->where('IDVenta', $idVenta);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Obtener Información Venta Cliente y Factura By IdVenta //
    public function getInfoGeneralFactura($idVenta){

        
        $this->db->select('F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, F.CertificadoSAT, F.FechaSAT, F.SelloSAT, F.SelloCFD, F.RFC_PAC, F.FormaPago, F.MetodoPago, F.UsoCFDI, F.Comprobante, CONCAT(CL.Nombre, " ", CL.Apellidos) AS Distribuidor, CL.regimenFiscal,
        CL.Empresa, CL.RFC, CL.CP, CL.Calle_numero, CL.Colonia, CL.Ciudad, CL.Municipio,CL.Municipio,CL.Estado,CL.Pais');
        $this->db->from('Ventas as V');
        $this->db->join('Factura as F','V.ID = F.IDVenta');
        $this->db->join('Clientes as CL','V.idCliente = CL.ID');
        $this->db->where('F.IDVenta', $idVenta);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Función Accion Cancelar Factura //

    public function updateCancelacionFactura($idFactura,$idVenta)
    {
        $this->db->trans_start(); # Starting Transaction
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        // Update Status Factura
        $this->db->where('ID', $idFactura);
        $this->db->set('Status','Cancelado');
        $this->db->update('Factura');

        # Updating data
        $this->db->where('ID', $idVenta);
        $this->db->set('Timbrado',0);
        $this->db->set('Tipo_Factura',0);
        $this->db->update('Ventas'); 

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

    // Obtener Correo del Distribuidor Para mandar Correo  By idFactura//
    public function getCorreoDistribuidor($idVenta)
    {
        
        $this->db->select('CL.Email');
        $this->db->from('Factura AS F');
        $this->db->join('Ventas as V', 'F.IDVenta = V.ID');
        $this->db->join('Clientes as CL', 'V.idCliente = CL.ID');
        $this->db->where('F.IDVenta',$idVenta);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Get Facturas Canceladas del Distribuidor //
    public function getFacturasRelacion($idCliente){

        
        $this->db->select('*');
        $this->db->from('Facturas_Relacion_View');
        $this->db->where('idCliente', $idCliente);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Obtener Toda la Información de La venta (Solo productos) //
    public function getInfoFacturaById($idVenta){

        
        $this->db->select("VM.ID, VM.Status, VM.idVenta, DVM.ID AS Detalle_Menudeo, DVM.Cantidad As Cantidad_Detalle_Menudeo, DVM.Precio_unitario AS Precio_Detalle_Menudeo, DVM.Importe AS Importe_Detalle_Menudeo, VM.Fecha_venta ,VM.Descuento, VM.Subtotal as SubtotalInvoice, VM.Impuestos as ImpuestoInvoice, VM.Total as TotalInvoice, VM.Total_desc, DVM.idCatalogo, DVM.Cantidad, DVM.Precio_unitario, DVM.Importe, CA.Codigo, CA.Producto, CA.Status as StatusCatalogo, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT, CONCAT(CL.Nombre, ' ', CL.Apellidos) AS Distribuidor, CL.Empresa, CL.CP, CL.regimenFiscal, CL.Impuesto as Imp_Cliente, VM.Compras_puntos");
        $this->db->from('Ventas_menudeo AS VM');
        $this->db->join('Ventas AS V', 'VM.idVenta = V.ID');
        $this->db->join('Detalle_venta_menudeo AS DVM', 'VM.ID = DVM.idVenta_menudeo');
        $this->db->join('Clientes AS CL', 'V.idCliente = CL.ID');
        $this->db->join('Catalogo AS CA', 'DVM.idCatalogo = CA.ID');
        $this->db->where('VM.idVenta', $idVenta);
        $this->db->where('VM.Compras_puntos !=', 1);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

        // Guardar Factura Timbrada Global //
        public function saveFacturaGlobal($factura,$data,$UUID){
            $this->db->trans_start(); # Starting Transaction
            $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well
    
            $logs_ventas_desk = array('idVenta'  => $factura['IDVenta'],
                                    'Fecha_hora' => date("Y-m-d H:i:s"),
                                    'Movimiento' => 'Facturar',
                                    'idUsuario'  => $_SESSION['Avyna'][0]['ID']);
            $this->db->insert('logs_ventas_desk', $logs_ventas_desk);
    
            $this->db->insert('Factura', $factura);
            $insert_id = $this->db->insert_id();

            //Total Listado de Productos
            $listProducts = count($data['Venta']);

            for ($i=0; $i<$listProducts; $i++){
                $this->db->where('ID', $data['Venta'][$i]['ID']);
                $this->db->set('Timbrado',1);
                $this->db->set('Tipo_Factura',1);
                $this->db->set('idFacturaGlobal', $insert_id);
                $this->db->update('Ventas');
            }
            
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
    

    // Guardar Factura Timbrada //
    public function saveFactura($factura,$data,$UUID){
        $this->db->trans_start(); # Starting Transaction
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well

        $logs_ventas_desk = array('idVenta'  => $factura['IDVenta'],
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Facturar',
                                'idUsuario'  => $_SESSION['Avyna'][0]['ID']);
        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

        $this->db->insert('Factura', $factura);
        $insert_id = $this->db->insert_id();

        if (intval($data['Formulario']['TipoFactura']) == 1) {
            
            $this->db->where('ID', $data['Venta'][0]['ID']);
            $this->db->set('Timbrado',1);
            $this->db->set('Tipo_Factura',1);
            $this->db->update('Ventas');
            $afftectedRows = $this->db->affected_rows();
        }
        else{

            $this->db->where('ID', $data['Venta'][0]['ID']);
            $this->db->set('Timbrado',1);
            $this->db->set('Tipo_Factura',2);
            $this->db->update('Ventas');
            $afftectedRows = $this->db->affected_rows(); 
        }

        if ($data['Formulario']['UUIDS'] != "" && $data['Formulario']['UUIDS'] != null){
            $relacion = explode(',', $data['Formulario']['UUIDS']);

            for ($i=0; $i < count($relacion); $i++){ 

                $UUIDRelacionado = array("UUID_Factura"      =>  $UUID,
                                        "UUIDRelacionado"   =>  $relacion[$i], 
                                        "TipoRelacion"      =>  $data['Formulario']['TipoRe']
                );  

                $this->db->insert('Factura_Relacion', $UUIDRelacionado);
            }
        }
        
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

    // Agregar Relaciones //
    public function agregarRelacion($data,$UUID){

        if ($relacion != null && $relacion != "") {

        $UUIDRelacionClear = array();

        for ($i=0; $i <=count($relacion) -1 ; $i++) 
            { 
                $UUIDRelacionado = array(

                    "UUIDFactura"      =>  $UUID,
                    "UUIDRelacionado"   =>  $relacion[$i],
                    "TipoRelacion"      =>  $tipo,

                );  

                array_push($UUIDRelacionClear,$UUIDRelacionado);
            }

        try
        {           
            
            $this->db->insert_batch('Factura_Relacion', $UUIDRelacionClear);
            $insert_id = $this->db->insert_id();
            $insertRelacion = true;

        }
        catch(Exception $er)
        {
            $insertRelacion = false;
        }

        return $insertRelacion;

        }else{

            return null;
        }
    }


    public function getAllInvoicesExceptoCanceladas(){
        $listInvoice = null;
        try
        {
            
            $this->db->select('F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, VM.ID AS IDVenta, VM.idVenta, VM.Fecha_venta ,VM.Descuento, VM.Subtotal as SubtotalInvoice, VM.Impuestos as ImpuestoInvoice, VM.Total as TotalInvoice, VM.Total_desc, CONCAT(CL.Nombre, " ", CL.Apellidos) AS Distribuidor, CL.Empresa, CL.CP, CL.regimenFiscal'); 
            $this->db->from('Ventas as V');
            $this->db->join('Factura as F', 'V.ID = F.IDVenta');
            $this->db->join('Clientes as CL', 'V.idCliente = CL.ID');
            $this->db->join('Ventas_menudeo as VM', 'V.ID = VM.idVenta');
            $this->db->Where('F.Status !=', 'Cancelado');
            $this->db->group_by('F.ID');
            $query = $this->db->get();
            $result = $query->result_array();
            $listInvoice = $result;
        }
        catch(Exception $er)
        {
            $listInvoice = null;
        }
        return $listInvoice;
    }

    public function InvoiceCanceled(){

            $listInvoiceCanceled = null;
            $check = false;

            try{


            
            $this->db->select('F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, VM.ID AS IDVenta, VM.idVenta, VM.Fecha_venta ,VM.Descuento, VM.Subtotal as SubtotalInvoice, VM.Impuestos as ImpuestoInvoice, VM.Total as TotalInvoice, VM.Total_desc, CONCAT(CL.Nombre, " ", CL.Apellidos) AS Distribuidor, CL.Empresa, CL.CP, CL.regimenFiscal'); 
            $this->db->from('Ventas as V');
            $this->db->join('Factura as F', 'V.ID = F.IDVenta');
            $this->db->join('Clientes as CL', 'V.idCliente = CL.ID');
            $this->db->join('Ventas_menudeo as VM', 'V.ID = VM.idVenta');
            $this->db->where('F.Status', 'Cancelado');
            $this->db->group_by('F.ID');
            $query = $this->db->get();
            $result = $query->result_array();
            $listInvoiceCanceled = $result;
            $check = true;

            }

            catch(Exception $er){
                $check = false;
            }

            return $listInvoiceCanceled;
    }

        /*Consulta las Todas la facturas con ID de la venta*/

    public function getAllInvoicesbyId($id){

        $listInvoice = null;
        try
        {
            
            $this->db->select("VM.ID, VM.Status, VM.idVenta, DVM.ID AS Detalle_Menudeo, DVM.Cantidad As Cantidad_Detalle_Menudeo, DVM.Precio_unitario AS Precio_Detalle_Menudeo, DVM.Importe AS Importe_Detalle_Menudeo, VM.Fecha_venta ,VM.Descuento, VM.Subtotal as SubtotalInvoice, VM.Impuestos as ImpuestoInvoice, VM.Total as TotalInvoice, VM.Total_desc, DVM.idCatalogo, DVM.Cantidad, DVM.Precio_unitario, DVM.Importe, CA.Codigo, CA.Producto, CA.Status as StatusCatalogo, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT, CONCAT(CL.Nombre, ' ', CL.Apellidos) AS Distribuidor, CL.Empresa, CL.CP, CL.regimenFiscal, CL.Impuesto as Imp_Cliente, VM.Compras_puntos");
            $this->db->from('Ventas_menudeo AS VM');
            $this->db->join('Ventas AS V', 'VM.idVenta = V.ID');
            $this->db->join('Detalle_venta_menudeo AS DVM', 'VM.ID = DVM.idVenta_menudeo');
            $this->db->join('Clientes AS CL', 'V.idCliente = CL.ID');
            $this->db->join('Catalogo AS CA', 'DVM.idCatalogo = CA.ID');
            $this->db->where('VM.idVenta', $id);
            $this->db->where('VM.Compras_puntos !=', 1);
            $query = $this->db->get();
            $result = $query->result_array();
            $listInvoice = $result;

        }
        catch(Exception $er)
        {
            $listInvoice = null;
        }

        return $listInvoice;
    }

        public function getAllInvoicesVentabyId($id){

        $listInvoice = null;
        try
        {
            
            $this->db->select("VM.ID, VM.Status, VM.idVenta, DVM.ID AS Detalle_Menudeo, DVM.Cantidad As Cantidad_Detalle_Menudeo, DVM.Precio_unitario AS Precio_Detalle_Menudeo, DVM.Importe AS Importe_Detalle_Menudeo, VM.Fecha_venta ,VM.Descuento, VM.Subtotal as SubtotalInvoice, VM.Impuestos as ImpuestoInvoice, VM.Total as TotalInvoice, VM.Total_desc, DVM.idCatalogo, DVM.Cantidad, DVM.Precio_unitario, DVM.Importe, CA.Codigo, CA.Producto, CA.Status as StatusCatalogo, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT, CONCAT(CL.Nombre, ' ', CL.Apellidos) AS Distribuidor, CL.Empresa, CL.CP, CL.regimenFiscal, CL.Impuesto as Imp_Cliente");
            $this->db->from('Ventas_menudeo AS VM');
            $this->db->join('Ventas AS V', 'VM.idVenta = V.ID');
            $this->db->join('Detalle_venta_menudeo_temp AS DVM', 'VM.ID = DVM.idVenta_menudeo');
            $this->db->join('Clientes AS CL', 'V.idCliente = CL.ID');
            $this->db->join('Catalogo AS CA', 'DVM.idCatalogo = CA.ID');
            $this->db->where('VM.idVenta', $id);
            $query = $this->db->get();
            $result = $query->result_array();
            $listInvoice = $result;
        }
        catch(Exception $er)
        {
            $listInvoice = null;
        }

        return $listInvoice;
    }

        public function GetAllDataVenta($id){

            /* 
            $this->db->select("DVMO.ID_Venta, DVMO.Compras_puntos, DVMO.ID, DVMO.idVenta_menudeo, DVMO.idCatalogo, DVMO.idPromocion, DVMO.idOferta, DVMO.Cantidad, round((DVMO.Precio_unitario - (DVMO.Precio_unitario * (O.`Desc` / 100))),2) AS Precio_unitario, round((DVMO.Importe - (DVMO.Cantidad * (DVMO.Precio_unitario * (O.`Desc` / 100)))),2) AS Importe, DVMO.Tipo, DVMO.Setoferta, CA.Producto, CA.Codigo, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT"); */

        $listInvoice = null;
        try
        {
            
            $this->db->select("DVMO.ID_Venta, DVMO.Compras_puntos, DVMO.ID, DVMO.idVenta_menudeo, DVMO.idCatalogo, DVMO.idPromocion, DVMO.idOferta, DVMO.Cantidad, round((DVMO.Precio_unitario - (DVMO.Precio_unitario * (O.`Desc` / 100))),2) AS Precio_unitario, round((DVMO.Importe - (DVMO.Cantidad * (DVMO.Precio_unitario * (O.`Desc` / 100)))),2) AS Importe, DVMO.Tipo, DVMO.Setoferta, CA.Producto, CA.Codigo, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT");
            $this->db->from('detalle_venta_menudeo_oferta AS DVMO');
            $this->db->join('Ventas_menudeo as DVM', 'DVMO.idVenta_menudeo = DVM.ID');
            $this->db->join('Ofertas as O', 'DVMO.Setoferta = O.ID');
            $this->db->join('Catalogo AS CA', 'DVMO.idCatalogo = CA.ID');
            $this->db->where('DVMO.ID_Venta', $id);
            $this->db->where('DVMO.Compras_puntos =', 0);
            $this->db->where('DVMO.Setoferta !=', 0);
            $this->db->where('DVM.Status !=', 'Inexistencias');
            $query = $this->db->get();
            $Query1 = $query->result_array();


            $this->db->select("DVMO.*, CA.Producto, CA.Codigo, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT");
            $this->db->from('detalle_venta_menudeo_oferta AS DVMO');
            $this->db->join('Ventas_menudeo as DVM', 'DVMO.idVenta_menudeo = DVM.ID');
            $this->db->join('Catalogo AS CA', 'DVMO.idCatalogo = CA.ID');
            $this->db->where('DVMO.ID_Venta', $id);
            $this->db->where('DVMO.Compras_puntos =', 0);
            $this->db->where('DVMO.Setoferta =', 0);
            $this->db->where('DVM.Status !=', 'Inexistencias');
            $query = $this->db->get();
            $Query2 = $query->result_array();


            $this->db->select("DVMO.*, CONCAT('Promocion N° ', PO.ID) AS Producto, PO.ID AS Codigo, ('Paquete') AS UnidadMedida, ('XPK') AS UnidadSAT, ('01010101') AS ClaveSAT");
            $this->db->from('detalle_venta_menudeo_oferta AS DVMO');
            $this->db->join('Ventas_menudeo as DVM', 'DVMO.idVenta_menudeo = DVM.ID');
            $this->db->join('Promociones AS PO', 'DVMO.idPromocion = PO.ID');
            $this->db->where('DVMO.ID_Venta', $id);
            $this->db->where('DVMO.Tipo =', 'Promocion');
            $this->db->where('DVM.Status !=', 'Inexistencias');
            $query = $this->db->get();
            $Query3 = $query->result_array();


            $listInvoice = array_merge($Query1,$Query2,$Query3);

        }
        catch(Exception $er)
        {
            $listInvoice = null;
        }

        return $listInvoice;
        }



    /*public function getFacturabyID($id){

        $listInvoice = null;

        try
        {
            
            $this->db->select('*');
            $this->db->from('Factura');
            $this->db->where('ID', $id);
            $query = $this->db->get();
            $result = $query->result_array();
            $listInvoice = $result;
        }
        catch(Exception $er)
        {
            $listInvoice = null;
        }

        return $listInvoice;
    }*/

    public function addNewInvoice($data)
    {

        $insertInvoice = false;

        try
        {
            if(empty($data) == false && isset($data))
            {        

                $logs_ventas_desk = array('idVenta' => $data['IDVenta'],
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Facturar',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

                $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

                
                $this->db->insert('Factura', $data);
                $insert_id = $this->db->insert_id();

                $insertInvoice = true;

            }
        }
        catch(Exception $er)
        {
            $insertInvoice = false;
        }
        return $insertInvoice;
    }

    public function UpdateStatusVenta($id,$tipo)
    {
        if ($tipo == 1) {
            
            $data = array(

                'Timbrado' => 1,
                'Tipo_Factura' => 1
            );
        }
        else
        {
            $data = array(

                'Timbrado' => 1,
                'Tipo_Factura' => 0
            );
        }
        
        $UpdateStatusVenta = false;

        try
        {
            if(empty($id) == false && isset($id) && empty($data) == false && isset($data))
            {               
                
                $this->db->where('ID', $id);
                $this->db->update('Ventas', $data);
                $afftectedRows = $this->db->affected_rows();

                $UpdateStatusVenta = true;
            }
        }
        catch(Exception $er)
        {
            $UpdateStatusVenta = false;
        }
        return $UpdateStatusVenta;
    }

    public function UpdateStatusFactura($id)
    {
        $data = array(

            'Status' => 'Cancelado'
        );

        $UpdateStatusFactura = false;

        try
        {
            if(empty($id) == false && isset($id) && empty($data) == false && isset($data))
            {               
                
                $this->db->where('ID', $id);
                $this->db->update('Factura', $data);
                $UpdateStatusFactura = true;
            }
        }
        catch(Exception $er)
        {
            $UpdateStatusFactura = false;
        }
        return $UpdateStatusFactura;
    }

    public function UpdateStatusVenta_Cancelado($id)
    {
        $data = array(
            'Timbrado' => 0,
            'Tipo_Factura' => 0
        );

        $UpdateStatusVenta = false;

        try
        {
            if(empty($id) == false && isset($id) && empty($data) == false && isset($data))
            {               
                
                $this->db->where('ID', $id);
                $this->db->update('Ventas', $data);
                $UpdateStatusVenta = true;
            }
        }
        catch(Exception $er)
        {
            $UpdateStatusVenta = false;
        }
        return $UpdateStatusVenta;
    }

    public function GetAllModal($id){

        $listModal = null;

        try
        {
            
            $this->db->select('*');
            $this->db->from('Ventas_Factura');
            $this->db->where('IDVenta', $id['ID']);
            $query = $this->db->get();
            $result = $query->result_array();
            $listModal = $result;
        }
        catch(Exception $er)
        {
            $listModal = null;
        }

        return $listModal;

    }


    public function GetAllFactura_Relacion($id){

        $listModal = null;

        try
        {
            
            $this->db->select('F.UUID,F.Serie,F.Folio,F.Fecha_Timbrado, V.Total');
            $this->db->from('Factura AS F');
            $this->db->join('Ventas AS V', 'F.IDVenta = V.ID');
            $this->db->join('Clientes AS CL', 'V.idCliente = CL.ID');
            $this->db->where('CL.ID', $id['ID_Cliente_Modal']);
            $this->db->where('F.Status', 'Cancelado');
            $query = $this->db->get();
            $result = $query->result_array();
            $listModal = $result;
        }
        catch(Exception $er)
        {
            $listModal = null;
        }

        return $listModal;

    }

    public function GetpublicoGeneral($rfc){

        $listgeneral = null;

        try
        {
            
            $this->db->select('*');
            $this->db->from('Clientes');
            $this->db->where('RFC', $rfc['RFC']);
            $query = $this->db->get();
            $result = $query->result_array();
            $listgeneral = $result;
        }
        catch(Exception $er)
        {
            $listgeneral = null;
        }

        return $listgeneral;
    }

    public function AddRelacion($relacion,$tipo,$UUID){

        if ($relacion != null && $relacion != "") {

        $UUIDRelacionClear = array();

        for ($i=0; $i <=count($relacion) -1 ; $i++) 
            { 
                $UUIDRelacionado = array(

                    "UUIDFactura"      =>  $UUID,
                    "UUIDRelacionado"   =>  $relacion[$i],
                    "TipoRelacion"      =>  $tipo,

                );  

                array_push($UUIDRelacionClear,$UUIDRelacionado);
            }

        try
        {           
            
            $this->db->insert_batch('Factura_Relacion', $UUIDRelacionClear);
            $insert_id = $this->db->insert_id();
            $insertRelacion = true;

        }
        catch(Exception $er)
        {
            $insertRelacion = false;
        }

        return $insertRelacion;

        }else{

            return null;
        }
    }


    public function getVentasById($id)
    {

        $listVenta = null;

        try
        {
            
            $this->db->select('*');
            $this->db->from('Ventas');
            $this->db->where('ID', $id);
            $query = $this->db->get();
            $result = $query->result_array();
            $listVenta = $result;
        }
        catch(Exception $er)
        {
            $listVenta = null;
        }

        return $listVenta;
    }

    public function VentasDescuentosById($id)
    {

        $listVentaOferta = null;

        try
        {
            
            $this->db->select('DVM.*');
            $this->db->from('ventas as V');
            $this->db->join('Ventas_menudeo as VM', 'V.ID = VM.idVenta');
            $this->db->join('detalle_venta_menudeo_temp as DVM', 'VM.ID = DVM.idVenta_menudeo');
            $this->db->where('V.ID', $id);
            $this->db->where('DVM.Importe <', 0);
            $query = $this->db->get();
            $result = $query->result_array();
            $listVentaOferta = $result;
        }
        catch(Exception $er)
        {
            $listVentaOferta = null;
        }

        return $listVentaOferta;

    }

    public function VentasOfertasById($id)
    {

        $list_Oferta_Venta = null;

        try
        {
            
            $this->db->select('count(DVM.Setoferta) AS Movimientos_Oferta, Sum(DVM.Importe) as Suma_Importe, DVMT.Importe AS Importe_Descuento, DVM.*');
            $this->db->from('ventas as V');
            $this->db->join('Ventas_menudeo as VM', 'V.ID = VM.idVenta');
            $this->db->join('detalle_venta_menudeo as DVM', 'VM.ID = DVM.idVenta_menudeo');
            $this->db->join('detalle_venta_menudeo_temp as DVMT', 'VM.ID = DVMT.idVenta_menudeo');
            $this->db->where('V.ID', $id);
            $this->db->where('DVM.Setoferta >', 0);
            $this->db->where('DVMT.Importe <', 0);
            $this->db->group_by('DVM.idVenta_menudeo'); 
            $query = $this->db->get();
            $result = $query->result_array();
            $list_Oferta_Venta = $result;
        }
        catch(Exception $er)
        {
            $list_Oferta_Venta = null;
        }

        return $list_Oferta_Venta;

    }

    public function Cargar_Correo_Distribuidor($id)
    {
        $GetFactura = null;
        try
        {
            
            $this->db->select('CL.Email');
            $this->db->from('Factura AS F');
            $this->db->join('Ventas as V', 'F.IDVenta = V.ID');
            $this->db->join('Clientes as CL', 'V.idCliente = CL.ID');
            $this->db->where('F.IDVenta',$id);
            $query = $this->db->get();
            $result = $query->result_array();
            $GetFactura = $result;
        }
        catch(Exception $er)
        {
            $GetFactura = null;
        }
        return $GetFactura;
    }

    public function getAllDistributorsInvoice()
    {
        $listDistributors = null;
        try
        {
            
            $this->db->select('*'); 
            $this->db->from('Distribuidor_Factura');
            $query = $this->db->get();
            $result = $query->result_array();
            $listDistributors = $result;
        }
        catch(Exception $er)
        {
            $listDistributors = null; 
        }
        return $listDistributors;
    }

}

?>