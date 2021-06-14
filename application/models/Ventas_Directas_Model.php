<?php
class Ventas_Directas_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
        $this->load->database();
        parent::__construct();
    }

    public function Validate_Exist($idSucursal,$Productos){

        $Contador = 1;

        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('NuevaVentaDistribuidor_web_view');
        $this->db->where('idSucursal',$idSucursal);
        $this->db->group_start();
            for ($i=0; $i < count($Productos); $i++) {
                if ($Contador == 1) {
                    $this->db->where('idCatalogo',$Productos[$i]);
                    $Contador++;
                }else{
                    $this->db->or_where('idCatalogo',$Productos[$i]);
                }
            }
        $this->db->group_end();
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    public function Get_Ventas_Menudeo($id){
        
        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('Ventas_menudeo');
        $this->db->where('idVenta',$id);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    function Get_Infomación_Detalle_Venta($id){
        
        $this->db->distinct();
        $this->db->select('DVM.*'); 
        $this->db->from('Detalle_venta_menudeo AS DVM');
        $this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
        $this->db->where('VM.idVenta',$id);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Get_Infomación_Detalle_Venta_Producto($id){
        
        $this->db->distinct();
        $this->db->select('DVM.*, CA.Division, CA.Linea, CA.Sublinea, CA.ID AS ID_Producto, CA.Producto'); 
        $this->db->from('Detalle_venta_menudeo AS DVM');
        $this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
        $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID');
        $this->db->where('VM.idVenta',$id);
        $this->db->where('DVM.idCatalogo IS NOT NULL');
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Get_Infomación_Detalle_Venta_Promociones($id){
        
        $this->db->distinct();
        $this->db->select('DVM.*,PO.Promocion, PO.ID AS IDPromocion'); 
        $this->db->from('Detalle_venta_menudeo AS DVM');
        $this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
        $this->db->join('Promociones AS PO','DVM.idPromocion = PO.ID');
        $this->db->where('VM.idVenta',$id);
        $this->db->where('DVM.idPromocion IS NOT NULL');
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Get_Infomación_Detalle_Venta_Oferta($id){
        
        $this->db->distinct();
        $this->db->select('DVM.*,PO.Nombre, PO.ID AS IDOferta'); 
        $this->db->from('Detalle_venta_menudeo AS DVM');
        $this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
        $this->db->join('Ofertas AS PO','DVM.idOferta = PO.ID');
        $this->db->where('VM.idVenta',$id);
        $this->db->where('DVM.idOferta IS NOT NULL');
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Validar Existencias Productos //
    public function validateExistenciasProductos($idSucursal,$idCatalogo)
    {
        
        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('NuevaVentaDistribuidor_web_view');
        $this->db->where('idCatalogo',$idCatalogo);
        $this->db->where('idSucursal',$idSucursal);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Validar Existencias Promocion //
    public function validateExistenciasPromo($idSucursal,$idPromo)
    {
        
        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('Productos_promociones');
        $this->db->where('idPromocion',$idPromo);
        $Productos_Promo = $this->db->count_all_results();

        
        $this->db->distinct();
        $this->db->select('ND.*'); 
        $this->db->from('Productos_promociones AS PP');
        $this->db->join('NuevaVentaDistribuidor_web_view AS ND','PP.idCatalogo = ND.idCatalogo');
        $this->db->where('PP.idPromocion',$idPromo);
        $this->db->where('ND.idSucursal',$idSucursal);
        $Inventario = $this->db->count_all_results();

        if (intval($Productos_Promo) == intval($Inventario)){
            
            $this->db->distinct();
            $this->db->select('ND.*, (ND.Existencias_disponibles - PP.Cantidad) AS Exist'); 
            $this->db->from('Productos_promociones AS PP');
            $this->db->join('NuevaVentaDistribuidor_web_view AS ND','PP.idCatalogo = ND.idCatalogo');
            $this->db->where('PP.idPromocion',$idPromo);
            $this->db->where('ND.idSucursal',$idSucursal);
            $query = $this->db->get();
            $result = $query->result_array();
        }
        else{
            $result = array();
        }

        return $result;
    }

    // Obtener Promocion By idDistribuidor y idSucursal //
    public function getPromocion($idDistribuidor,$idSucursal)
    {
        $Result = $this->db->query("SELECT * FROM Promociones_app WHERE (Excluir_Distribuidores = 0 OR idDistribuidor = ".$idDistribuidor.") AND idSucursal = ".$idSucursal." GROUP BY idPromocion ORDER BY Producto ASC");
        $query  = $Result->result_array();
        return $query;
    }

    // Obtener Oferta By idDistribuidor y idSucursal //
    public function getOfertas($idDistribuidor,$idSucursal)
    {
        $Result = $this->db->query("SELECT * FROM Ofertas_app WHERE Excluir_Distribuidores = 0 OR idDistribuidor = ".$idDistribuidor." GROUP BY ID ORDER BY Nombre ASC ");
        $query  = $Result->result_array();
        return $query;
    }

    // Obtener Detalle Oferta //
    public function getDetalleOferta($idDistribuidor,$id)
    {
        $Result = $this->db->query("SELECT * FROM Ofertas_app WHERE (Excluir_Distribuidores = 0 OR idDistribuidor = ".$idDistribuidor.") AND ID = ".$id."");
        $query  = $Result->result_array();
        return $query;
    }

    // Obtener Información Oferta //
    public function getInfoOferta($idDistribuidor,$id)
    {
        $Result = $this->db->query("SELECT * FROM Ofertas_app WHERE (Excluir_Distribuidores = 0 OR idDistribuidor = ".$idDistribuidor.") AND ID = ".$id."");
        $query  = $Result->result_array();
        return $query;
    }

    // Obtener Info Productos Promoción //
    public function getInfoPromo($id)
    {
        
        $this->db->select('CA.*'); 
        $this->db->from('Productos_promociones AS PP');
        $this->db->join('Catalogo AS CA','PP.idCatalogo = CA.ID');
        $this->db->where('PP.idPromocion',$id);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Validar Existencias Productos Ventas //
    public function validateExistencias($idSucursal,$idCatalogo)
    {
        
        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('NuevaVentaDistribuidor_web_view');
        $this->db->where('idCatalogo',$idCatalogo);
        $this->db->where('idSucursal',$idSucursal);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }








































































    public function deleteVenta($data){
        $this->db->trans_start(); # Starting Transaction
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->select('*'); 
        $this->db->from('Ventas_menudeo');
        $this->db->where('idVenta',$data['idVenta']);
        $query = $this->db->get();
        $result = $query->result_array();

        $this->db->where('idVenta_menudeo', $result[0]['ID']);
        $this->db->delete('Pagos_programados');

        $this->db->where('idVenta_menudeo', $result[0]['ID']);
        $this->db->delete('Detalle_venta_menudeo');

        $this->db->where('idVenta', $data['idVenta']);
        $this->db->delete('Ventas_menudeo');

        $this->db->where('ID', $data['idVenta']);
        $this->db->delete('Ventas'); 

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




    // Modificar Venta Clientes Directos //
    public function updateVentasMenudeo($data){

        $this->db->where('idVenta_menudeo', $data['idVentaMenudeo']);
        $this->db->delete('Pagos_programados');

        $this->db->where('idVenta_menudeo', $data['idVentaMenudeo']);
        $this->db->delete('Detalle_venta_menudeo');

        $this->db->where('idVenta', $data['idVenta']);
        $this->db->delete('Ventas_menudeo');

        $this->db->where('ID', $data['idVenta']);
        $this->db->delete('Ventas');

        if (isset($data['idCatalogo'])){
            $idCatalogo = explode(",",$data['idCatalogo']);
            $Cantidad   = explode(",",$data['Cantidad']);
            $Precio     = explode(",",$data['Precio']);
            $Importe    = explode(",",$data['Importe']);
            $SetOferta_Cata    = explode(",",$data['SetOferta_Cata']);
        }

        if (isset($data['idPromocion'])){
            $idPromocion     = explode(",",$data['idPromocion']);
            $Cantidad_Promo  = explode(",",$data['Cantidad_Promo']);
            $Precio_Promo    = explode(",",$data['Precio_Promo']);
            $Importe_Promo   = explode(",",$data['Importe_Promo']);

        }

        if (isset($data['idOferta'])){
            $idOferta        = explode(",",$data['idOferta']);
            $Cantidad_Ofe    = explode(",",$data['Cantidad_Ofe']);
            $Precio_Ofe      = explode(",",$data['Precio_Ofe']);
            $Importe_Ofe     = explode(",",$data['Importe_Ofe']);
        }

        $Subtotal   = $data['Subtotal'];
        $Impuestos  = $data['Impuestos'];
        $Descuento  = $data['Descuento'];
        $Total      = $data['Total'];
        $idSucursal = $data['idSucursal'];
        $idCliente  = $data['idCliente'];
        $Total_Real = $data['Total_Real'];

        $fecha = date('Y-m-d');
        $nuevafecha = strtotime ('+1 week' , strtotime ($fecha));
        $nuevafecha = date ('Y-m-d' , $nuevafecha);

        $fechaMes = date('Y-m-d');
        $nuevafechaMes = strtotime ('+1 month' , strtotime ($fechaMes));
        $nuevafechaMes = date ('Y-m-d' , $nuevafechaMes);

        $Venta_Menudeo = array( 'Fecha_venta' => date("Y-m-d H:i:s"),
                                'idCliente_menudeo' => $idCliente,
                                'Descuento' => $Descuento,
                                'Subtotal' => $Subtotal,
                                'Impuestos' => $Impuestos,
                                'Total' => $Total_Real,
                                'Total_desc' => $Total,
                                'Adeudo' => $Total,
                                'Extraido' => 0,
                                'Status' => 'Pendiente',
                                'Generado' => 0,
                                'Fecha_entrega' => $nuevafecha,
                                'Empaquetado' => 0,
                                'Compras_puntos' => 0,
                                'Tipo_app' => 'Web');

        $this->db->trans_begin();

        $this->db->insert('ventas_menudeo_back', $Venta_Menudeo);

        $this->db->insert('Ventas_menudeo', $Venta_Menudeo);
        $insert_id = $this->db->insert_id();

        if (isset($data['idCatalogo'])){
            if (count($idCatalogo) > 0){
                for ($i=0; $i < count($idCatalogo); $i++){ 
                    $Detalle_Venta_Menudeo = array('idVenta_menudeo' => $insert_id,
                                        'idCatalogo' => $idCatalogo[$i],
                                        'Cantidad' => $Cantidad[$i],
                                        'Precio_unitario' => $Precio[$i],
                                        'Importe' => $Importe[$i],
                                        'Tipo' => 'Producto',
                                        'Setoferta' => $SetOferta_Cata[$i]);

                    $this->db->insert('Detalle_venta_menudeo', $Detalle_Venta_Menudeo);
                    $this->db->insert('detalle_venta_menudeo_back', $Detalle_Venta_Menudeo);
                }
            }
        }

        if (isset($data['idPromocion'])){
            if (count($idPromocion) > 0){
                for ($i=0; $i < count($idPromocion); $i++){ 
                    $Detalle_Venta_Menudeo = array('idVenta_menudeo' => $insert_id,
                                        'idPromocion' =>$idPromocion[$i],
                                        'Cantidad' => $Cantidad_Promo[$i],
                                        'Precio_unitario' => $Precio_Promo[$i],
                                        'Importe' => $Importe_Promo[$i],
                                        'Tipo' => 'Promocion');

                    $this->db->insert('Detalle_venta_menudeo', $Detalle_Venta_Menudeo);
                    $this->db->insert('detalle_venta_menudeo_back', $Detalle_Venta_Menudeo);
                }
            }
        }

        if (isset($data['idOferta'])){
            if (count($idOferta) > 0){
                for ($i=0; $i < count($idOferta); $i++){ 
                    $Detalle_Venta_Menudeo = array('idVenta_menudeo' => $insert_id,
                                        'idOferta' =>$idOferta[$i],
                                        'Cantidad' => $Cantidad_Ofe[$i],
                                        'Precio_unitario' => $Precio_Ofe[$i],
                                        'Importe' => $Importe_Ofe[$i],
                                        'Tipo' => 'Oferta');

                    $this->db->insert('Detalle_venta_menudeo', $Detalle_Venta_Menudeo);
                    $this->db->insert('detalle_venta_menudeo_back', $Detalle_Venta_Menudeo);
                }
            }
        }

        $Pagos_Progra = array(  'idVenta_menudeo' => $insert_id,
                                'Fecha_pago' => $nuevafechaMes,
                                'Monto_pago' => $Total,
                                'Status' => 'Pendiente',
                                'Adeudo' => $Total);

        $this->db->insert('Pagos_programados', $Pagos_Progra);

        $info_Cliente = $this->getinfoClienteById(261);

        $Venta = array('Fecha_venta' => date("Y-m-d H:i:s"),
                        'idCliente' => 261,
                        'Descuento' => $Descuento,
                        'Subtotal' => $Subtotal,
                        'Impuestos' => $Impuestos,
                        'Total' => $Total,
                        'Adeudo' => $Total,
                        'Status' => 'Pendiente',
                        'Pedidos' => 1,
                        'Extraido' => 0,
                        'Empaquetado' => 0,
                        'Timbrado' => 0,
                        'Tipo_Factura' => 0,
                        'Cuota' => $info_Cliente[0]['Cuota'],
                        'Gastos_Admin' => 0.00,
                        'Ventas_Directas' => 1);

        $this->db->insert('Ventas', $Venta);
        $idVenta = $this->db->insert_id();

        $logs_ventas_desk = array('idVenta' => $idVenta,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Generar',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

        $this->db->query('UPDATE Ventas_menudeo SET idVenta = '.$idVenta.', Generado = 1  WHERE ID = '.$insert_id.'');

        // Calcular Referencia //
        switch(strlen($idVenta))
        {
            case 1:
                $RefVenta = "00000" . $idVenta;
                break;
            case 2:
                $RefVenta = "0000" . $idVenta;
                break;
            case 3:
                $RefVenta = "000" . $idVenta;
                break;
            case 4:
                $RefVenta = "00" . $idVenta;
                break;
            case 5:
                $RefVenta =  "0" . $idVenta;
                break;
            case 6:
                $RefVenta = $idVenta;
                break;
        }

        switch (strlen($info_Cliente[0]['ID']))
        {
            case 1:
                $RefCliente = "000" . $info_Cliente[0]['ID'];
                break;
            case 2:
                $RefCliente = "00" . $info_Cliente[0]['ID'];
                break;
            case 3:
                $RefCliente = "0" . $info_Cliente[0]['ID'];
                break;
            case 4:
                $RefCliente = "" . $info_Cliente[0]['ID'];
                break;
        }

        $Referencia = $this->getReferencia($RefVenta.$RefCliente);

        $this->db->query('UPDATE Ventas SET Referencia = "'.$Referencia.'"  WHERE ID = '.$idVenta.'');

        $logs_ventas_desk_depo = array('idVenta' => $idVenta,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Deposito',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk_depo);

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return $insert_id;
        }
    }


    public function Add_Venta_Menudeo_Editar($data){

        $cliente_menudeo = $this->Get_Info_Cliente_Menudeo($data['idCliente']);
        $Porcentaje = floatval($cliente_menudeo[0]['Descuento_%']) / 100;

        $Total_Producto = 0;
        $Total_Promo = 0;
        $Total_Oferta = 0;
        $Total_Total = 0;

        $Subtotal   = 0;
        $Impuestos  = 0;
        $Descuento  = 0;
        $Total      = 0;
        $Total_Real = 0;

        if (isset($data['idCatalogo'])){
            $idCatalogo = explode(",",$data['idCatalogo']);
            $Cantidad   = explode(",",$data['Cantidad']);
            $Precio     = explode(",",$data['Precio']);
            $Importe    = explode(",",$data['Importe']);
            $SetOferta_Cata    = explode(",",$data['SetOferta_Cata']);
        }

        if (isset($data['idPromocion'])){
            $idPromocion     = explode(",",$data['idPromocion']);
            $Cantidad_Promo  = explode(",",$data['Cantidad_Promo']);
            $Precio_Promo    = explode(",",$data['Precio_Promo']);
            $Importe_Promo   = explode(",",$data['Importe_Promo']);

        }

        if (isset($data['idOferta'])){
            $idOferta        = explode(",",$data['idOferta']);
            $Cantidad_Ofe    = explode(",",$data['Cantidad_Ofe']);
            $Precio_Ofe      = explode(",",$data['Precio_Ofe']);
            $Importe_Ofe     = explode(",",$data['Importe_Ofe']);
        }

        /// Validar Totales Venta Menudeo Antes insert ///

        if (isset($data['idCatalogo'])){
            if (count($idCatalogo) > 0){
                for ($i=0; $i < count($idCatalogo); $i++){ 
                    $Total_Producto += number_format(intval($Cantidad[$i]) * floatval($Precio[$i]), 2, '.', '');
                }
            }
        }

        if (isset($data['idPromocion'])){
            if (count($idPromocion) > 0){
                for ($i=0; $i < count($idPromocion); $i++){ 
                    $Total_Promo += number_format(intval($Cantidad_Promo[$i]) * floatval($Precio_Promo[$i]), 2, '.', '');
                }
            }
        }


        if (isset($data['idOferta'])){
            if (count($idOferta) > 0){
                for ($i=0; $i < count($idOferta); $i++){ 
                    $Total_Oferta += number_format(intval($Cantidad_Ofe[$i]) * floatval($Precio_Ofe[$i]), 2, '.', '');
                }
            }
        }

        $Total_Total = floatval($Total_Producto) + floatval($Total_Promo) + floatval($Total_Oferta);

        if (floatval($Total_Total) == floatval($data['Total'])) {
            $Descuento = floatval($Total_Total) * floatval($Porcentaje);
            $Total = floatval($Total_Total) - floatval($Descuento);
            $Subtotal = floatval($Total) / 1.16;
            $Impuestos = floatval($Total) - floatval($Subtotal);
            $Total_Real = floatval($Total_Total);
        }
        else{
            $Descuento = floatval($Total_Total) * floatval($Porcentaje);
            $Total = floatval($Total_Total) - floatval($Descuento);
            $Subtotal = floatval($Total) / 1.16;
            $Impuestos = floatval($Total) - floatval($Subtotal);
            $Total_Real = floatval($Total_Total);
        }

        $idSucursal = $data['idSucursal'];
        $idCliente = $data['idCliente'];

        $fecha = date('Y-m-d');
        $nuevafecha = strtotime ('+1 week' , strtotime ($fecha));
        $nuevafecha = date ('Y-m-d' , $nuevafecha);

        $fechaMes = date('Y-m-d');
        $nuevafechaMes = strtotime ('+1 month' , strtotime ($fechaMes));
        $nuevafechaMes = date ('Y-m-d' , $nuevafechaMes);

        $Venta_Menudeo = array( 'Fecha_venta' => date("Y-m-d H:i:s"),
                                'idCliente_menudeo' => $idCliente,
                                'Descuento' => $Descuento,
                                'Subtotal' => $Subtotal,
                                'Impuestos' => $Impuestos,
                                'Total' => $Total_Real,
                                'Total_desc' => $Total,
                                'Adeudo' => $Total,
                                'Extraido' => 0,
                                'Status' => 'Pendiente',
                                'Generado' => 0,
                                'Fecha_entrega' => $nuevafecha,
                                'Empaquetado' => 0,
                                'Compras_puntos' => 0,
                                'Tipo_app' => 'Web');

        $this->db->trans_begin();

        $this->db->query('DELETE FROM Pagos_programados where idVenta_menudeo = '.$data['idVentaMenudeo'].'');
        $this->db->query('DELETE FROM Detalle_venta_menudeo where idVenta_menudeo ='.$data['idVentaMenudeo'].'');
        $this->db->query('DELETE FROM Ventas_menudeo where ID ='.$data['idVentaMenudeo'].'');
        $this->db->query('DELETE FROM Ventas where ID ='.$data['idVenta'].'');
    
        $this->db->insert('ventas_menudeo_back', $Venta_Menudeo);
        $this->db->insert('Ventas_menudeo', $Venta_Menudeo);
        $insert_id = $this->db->insert_id();

        if (isset($data['idCatalogo'])){
            if (count($idCatalogo) > 0){
                for ($i=0; $i < count($idCatalogo); $i++){ 
                    $Detalle_Venta_Menudeo = array('idVenta_menudeo' => $insert_id,
                                        'idCatalogo' => $idCatalogo[$i],
                                        'Cantidad' => $Cantidad[$i],
                                        'Precio_unitario' => $Precio[$i],
                                        'Importe' => number_format(intval($Cantidad[$i]) * floatval($Precio[$i]), 2, '.', ''),
                                        'Tipo' => 'Producto',
                                        'Setoferta' => $SetOferta_Cata[$i]);

                    $this->db->insert('Detalle_venta_menudeo', $Detalle_Venta_Menudeo);
                    $this->db->insert('detalle_venta_menudeo_back', $Detalle_Venta_Menudeo);
                }
            }
        }

        if (isset($data['idPromocion'])){
            if (count($idPromocion) > 0){
                for ($i=0; $i < count($idPromocion); $i++){ 
                    $Detalle_Venta_Menudeo = array('idVenta_menudeo' => $insert_id,
                                        'idPromocion' =>$idPromocion[$i],
                                        'Cantidad' => $Cantidad_Promo[$i],
                                        'Precio_unitario' => $Precio_Promo[$i],
                                        'Importe' => number_format(intval($Cantidad_Promo[$i]) * floatval($Precio_Promo[$i]), 2, '.', ''),
                                        'Tipo' => 'Promocion');

                    $this->db->insert('Detalle_venta_menudeo', $Detalle_Venta_Menudeo);
                    $this->db->insert('detalle_venta_menudeo_back', $Detalle_Venta_Menudeo);
                }
            }
        }

        if (isset($data['idOferta'])){
            if (count($idOferta) > 0){
                for ($i=0; $i < count($idOferta); $i++){ 
                    $Detalle_Venta_Menudeo = array('idVenta_menudeo' => $insert_id,
                                        'idOferta' =>$idOferta[$i],
                                        'Cantidad' => $Cantidad_Ofe[$i],
                                        'Precio_unitario' => $Precio_Ofe[$i],
                                        'Importe' => number_format(intval($Cantidad_Ofe[$i]) * floatval($Precio_Ofe[$i]), 2, '.', ''),
                                        'Tipo' => 'Oferta');

                    $this->db->insert('Detalle_venta_menudeo', $Detalle_Venta_Menudeo);
                    $this->db->insert('detalle_venta_menudeo_back', $Detalle_Venta_Menudeo);
                }
            }
        }

        $Pagos_Progra = array(  'idVenta_menudeo' => $insert_id,
                                'Fecha_pago' => $nuevafechaMes,
                                'Monto_pago' => $Total,
                                'Status' => 'Pendiente',
                                'Adeudo' => $Total);

        $this->db->insert('Pagos_programados', $Pagos_Progra);

        $info_Cliente = $this->getinfoClienteById(261);

        $Venta = array('Fecha_venta' => date("Y-m-d H:i:s"),
					'idCliente' => 261,
					'Descuento' => $Descuento,
					'Subtotal' => $Subtotal,
					'Impuestos' => $Impuestos,
					'Total' => $Total,
					'Adeudo' => $Total,
					'Status' => 'Pendiente',
					'Pedidos' => 1,
					'Extraido' => 0,
					'Empaquetado' => 0,
					'Timbrado' => 0,
					'Tipo_Factura' => 0,
					'Cuota' => $info_Cliente[0]['Cuota'],
					'Gastos_Admin' => 0.00,
					'Ventas_Directas' => 1);

        $this->db->insert('Ventas', $Venta);
        $idVenta = $this->db->insert_id();

        $logs_ventas_desk = array('idVenta' => $idVenta,
							'Fecha_hora' => date("Y-m-d H:i:s"),
							'Movimiento' => 'Generar',
							'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

        $this->db->query('UPDATE Ventas_menudeo SET idVenta = '.$idVenta.', Generado = 1  WHERE ID = '.$insert_id.'');

        $Referencia = $this->getReferencia($RefVenta.$RefCliente);

        $this->db->query('UPDATE Ventas SET Referencia = "'.$Referencia.'"  WHERE ID = '.$idVenta.'');

        $logs_ventas_desk_depo = array('idVenta' => $idVenta,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Deposito',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk_depo);

        if ($this->db->trans_status() === FALSE){
                $this->db->trans_rollback();
                return 0;
        }
        else{
                $this->db->trans_commit();
                return $insert_id;
        }
    }

    public function Get_Info_Cliente_Menudeo($id){
        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('Clientes_menudeo');
        $this->db->where('ID',$id);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }


    public function Add_Venta_Menudeo($data){

        $cliente_menudeo = $this->Get_Info_Cliente_Menudeo($data['idCliente']);
        $Porcentaje = floatval($cliente_menudeo[0]['Descuento_%']) / 100;
        $Total_Producto = 0;
        $Total_Promo = 0;
        $Total_Oferta = 0;
        $Total_Total = 0;
        //$Porcentaje = floatval($cliente_menudeo[0]['Descuento_%']) / 100;

        $Subtotal   = 0;
        $Impuestos  = 0;
        $Descuento  = 0;
        $Total      = 0;
        $Total_Real = 0;

        if (isset($data['idCatalogo'])){
            $idCatalogo = explode(",",$data['idCatalogo']);
            $Cantidad   = explode(",",$data['Cantidad']);
            $Precio     = explode(",",$data['Precio']);
            $Importe    = explode(",",$data['Importe']);
            $SetOferta_Cata    = explode(",",$data['SetOferta_Cata']);
        }

        if (isset($data['idPromocion'])){
            $idPromocion     = explode(",",$data['idPromocion']);
            $Cantidad_Promo  = explode(",",$data['Cantidad_Promo']);
            $Precio_Promo    = explode(",",$data['Precio_Promo']);
            $Importe_Promo   = explode(",",$data['Importe_Promo']);

        }

        if (isset($data['idOferta'])){
            $idOferta        = explode(",",$data['idOferta']);
            $Cantidad_Ofe    = explode(",",$data['Cantidad_Ofe']);
            $Precio_Ofe      = explode(",",$data['Precio_Ofe']);
            $Importe_Ofe     = explode(",",$data['Importe_Ofe']);
        }


        /// Validar Totales Venta Menudeo Antes insert ///

        if (isset($data['idCatalogo'])){
            if (count($idCatalogo) > 0){
                for ($i=0; $i < count($idCatalogo); $i++){ 
                    $Total_Producto += number_format(intval($Cantidad[$i]) * floatval($Precio[$i]), 2, '.', '');
                }
            }
        }

        if (isset($data['idPromocion'])){
            if (count($idPromocion) > 0){
                for ($i=0; $i < count($idPromocion); $i++){ 
                    $Total_Promo += number_format(intval($Cantidad_Promo[$i]) * floatval($Precio_Promo[$i]), 2, '.', '');
                }
            }
        }


        if (isset($data['idOferta'])){
            if (count($idOferta) > 0){
                for ($i=0; $i < count($idOferta); $i++){ 
                    $Total_Oferta += number_format(intval($Cantidad_Ofe[$i]) * floatval($Precio_Ofe[$i]), 2, '.', '');
                }
            }
        }

        $Total_Total = floatval($Total_Producto) + floatval($Total_Promo) + floatval($Total_Oferta);

        if (floatval($Total_Total) == floatval($data['Total'])) {
            $Descuento = floatval($Total_Total) * floatval($Porcentaje);
            $Total = floatval($Total_Total) - floatval($Descuento);
            $Subtotal = floatval($Total) / 1.16;
            $Impuestos = floatval($Total) - floatval($Subtotal);
            $Total_Real = floatval($Total_Total);
        }
        else{
            $Descuento = floatval($Total_Total) * floatval($Porcentaje);
            $Total = floatval($Total_Total) - floatval($Descuento);
            $Subtotal = floatval($Total) / 1.16;
            $Impuestos = floatval($Total) - floatval($Subtotal);
            $Total_Real = floatval($Total_Total);
        }

        
        $idSucursal = $data['idSucursal'];
        $idCliente = $data['idCliente'];

        $fecha = date('Y-m-d');
        $nuevafecha = strtotime ('+1 week' , strtotime ($fecha));
        $nuevafecha = date ('Y-m-d' , $nuevafecha);

        $fechaMes = date('Y-m-d');
        $nuevafechaMes = strtotime ('+1 month' , strtotime ($fechaMes));
        $nuevafechaMes = date ('Y-m-d' , $nuevafechaMes);

        $Venta_Menudeo = array( 'Fecha_venta' => date("Y-m-d H:i:s"),
                                'idCliente_menudeo' => $idCliente,
                                'Descuento' => $Descuento,
                                'Subtotal' => $Subtotal,
                                'Impuestos' => $Impuestos,
                                'Total' => $Total_Real,
                                'Total_desc' => $Total,
                                'Adeudo' => $Total,
                                'Extraido' => 0,
                                'Status' => 'Pendiente',
                                'Generado' => 0,
                                'Fecha_entrega' => $nuevafecha,
                                'Empaquetado' => 0,
                                'Compras_puntos' => 0,
                                'Tipo_app' => 'Web');

        $this->db->trans_begin();

        $this->db->insert('ventas_menudeo_back', $Venta_Menudeo);
        $this->db->insert('Ventas_menudeo', $Venta_Menudeo);
        $insert_id = $this->db->insert_id();

        if (isset($data['idCatalogo'])){
            if (count($idCatalogo) > 0){
                for ($i=0; $i < count($idCatalogo); $i++){ 
                    $Detalle_Venta_Menudeo = array('idVenta_menudeo' => $insert_id,
                                        'idCatalogo' => $idCatalogo[$i],
                                        'Cantidad' => $Cantidad[$i],
                                        'Precio_unitario' => $Precio[$i],
                                        'Importe' => number_format(intval($Cantidad[$i]) * floatval($Precio[$i]), 2, '.', ''),
                                        'Tipo' => 'Producto',
                                        'Setoferta' => $SetOferta_Cata[$i]);

                    $this->db->insert('Detalle_venta_menudeo', $Detalle_Venta_Menudeo);
                    $this->db->insert('detalle_venta_menudeo_back', $Detalle_Venta_Menudeo);
                }
            }
        }

        if (isset($data['idPromocion']))
        {
            if (count($idPromocion) > 0)
            {
                for ($i=0; $i < count($idPromocion); $i++)
                { 
                    $Detalle_Venta_Menudeo = array('idVenta_menudeo' => $insert_id,
                                        'idPromocion' =>$idPromocion[$i],
                                        'Cantidad' => $Cantidad_Promo[$i],
                                        'Precio_unitario' => $Precio_Promo[$i],
                                        'Importe' => number_format(intval($Cantidad_Promo[$i]) * floatval($Precio_Promo[$i]), 2, '.', ''),
                                        'Tipo' => 'Promocion');

                    $this->db->insert('Detalle_venta_menudeo', $Detalle_Venta_Menudeo);
                    $this->db->insert('detalle_venta_menudeo_back', $Detalle_Venta_Menudeo);
                }
            }
        }

        if (isset($data['idOferta']))
        {
            if (count($idOferta) > 0)
            {
                for ($i=0; $i < count($idOferta); $i++)
                { 
                    $Detalle_Venta_Menudeo = array('idVenta_menudeo' => $insert_id,
                                        'idOferta' =>$idOferta[$i],
                                        'Cantidad' => $Cantidad_Ofe[$i],
                                        'Precio_unitario' => $Precio_Ofe[$i],
                                        'Importe' => number_format(intval($Cantidad_Ofe[$i]) * floatval($Precio_Ofe[$i]), 2, '.', ''),
                                        'Tipo' => 'Oferta');

                    $this->db->insert('Detalle_venta_menudeo', $Detalle_Venta_Menudeo);
                    $this->db->insert('detalle_venta_menudeo_back', $Detalle_Venta_Menudeo);
                }
            }
        }

        $Pagos_Progra = array(  'idVenta_menudeo' => $insert_id,
                                'Fecha_pago' => $nuevafechaMes,
                                'Monto_pago' => $Total,
                                'Status' => 'Pendiente',
                                'Adeudo' => $Total);

        $this->db->insert('Pagos_programados', $Pagos_Progra);

        $info_Cliente = $this->getinfoClienteById(261);

        $Venta = array('Fecha_venta' => date("Y-m-d H:i:s"),
                        'idCliente' => 261,
                        'Descuento' => $Descuento,
                        'Subtotal' => $Subtotal,
                        'Impuestos' => $Impuestos,
                        'Total' => $Total,
                        'Adeudo' => $Total,
                        'Status' => 'Pendiente',
                        'Pedidos' => 1,
                        'Extraido' => 0,
                        'Empaquetado' => 0,
                        'Timbrado' => 0,
                        'Tipo_Factura' => 0,
                        'Cuota' => $info_Cliente[0]['Cuota'],
                        'Gastos_Admin' => 0.00,
                        'Ventas_Directas' => 1);

        $this->db->insert('Ventas', $Venta);
        $idVenta = $this->db->insert_id();

        $logs_ventas_desk = array('idVenta' => $idVenta,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Generar',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

        $this->db->query('UPDATE Ventas_menudeo SET idVenta = '.$idVenta.', Generado = 1  WHERE ID = '.$insert_id.'');

        // Calcular Referencia //
        switch(strlen($idVenta))
        {
            case 1:
                $RefVenta = "00000" . $idVenta;
                break;
            case 2:
                $RefVenta = "0000" . $idVenta;
                break;
            case 3:
                $RefVenta = "000" . $idVenta;
                break;
            case 4:
                $RefVenta = "00" . $idVenta;
                break;
            case 5:
                $RefVenta =  "0" . $idVenta;
                break;
            case 6:
                $RefVenta = $idVenta;
                break;
        }

        switch (strlen($info_Cliente[0]['ID']))
        {
            case 1:
                $RefCliente = "000" . $info_Cliente[0]['ID'];
                break;
            case 2:
                $RefCliente = "00" . $info_Cliente[0]['ID'];
                break;
            case 3:
                $RefCliente = "0" . $info_Cliente[0]['ID'];
                break;
            case 4:
                $RefCliente = "" . $info_Cliente[0]['ID'];
                break;
        }


        $Referencia = $this->getReferencia($RefVenta.$RefCliente);

        $this->db->query('UPDATE Ventas SET Referencia = "'.$Referencia.'"  WHERE ID = '.$idVenta.'');

        $logs_ventas_desk_depo = array('idVenta' => $idVenta,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Deposito',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk_depo);

        if ($this->db->trans_status() === FALSE)
        {
                $this->db->trans_rollback();
                return 0;
        }
        else
        {
                $this->db->trans_commit();
                return $insert_id;
        }
    }

    // Agregar Venta Menudeo  //
    public function addVentaMenudeo($data)
    {
        if (isset($data['idCatalogo'])){
            $idCatalogo = explode(",",$data['idCatalogo']);
            $Cantidad   = explode(",",$data['Cantidad']);
            $Precio     = explode(",",$data['Precio']);
            $Importe    = explode(",",$data['Importe']);
            $SetOferta_Cata    = explode(",",$data['SetOferta_Cata']);
        }

        if (isset($data['idPromocion'])){
            $idPromocion     = explode(",",$data['idPromocion']);
            $Cantidad_Promo  = explode(",",$data['Cantidad_Promo']);
            $Precio_Promo    = explode(",",$data['Precio_Promo']);
            $Importe_Promo   = explode(",",$data['Importe_Promo']);

        }

        if (isset($data['idOferta'])){
            $idOferta        = explode(",",$data['idOferta']);
            $Cantidad_Ofe    = explode(",",$data['Cantidad_Ofe']);
            $Precio_Ofe      = explode(",",$data['Precio_Ofe']);
            $Importe_Ofe     = explode(",",$data['Importe_Ofe']);
        }

        $Subtotal   = $data['Subtotal'];
        $Impuestos  = $data['Impuestos'];
        $Descuento  = $data['Descuento'];
        $Total      = $data['Total'];
        $idSucursal = $data['idSucursal'];
        $idCliente  = $data['idCliente'];
        $Total_Real = $data['Total_Real'];

        $fecha = date('Y-m-d');
        $nuevafecha = strtotime ('+1 week' , strtotime ($fecha));
        $nuevafecha = date ('Y-m-d' , $nuevafecha);

        $fechaMes = date('Y-m-d');
        $nuevafechaMes = strtotime ('+1 month' , strtotime ($fechaMes));
        $nuevafechaMes = date ('Y-m-d' , $nuevafechaMes);

        $Venta_Menudeo = array( 'Fecha_venta' => date("Y-m-d H:i:s"),
                                'idCliente_menudeo' => $idCliente,
                                'Descuento' => $Descuento,
                                'Subtotal' => $Subtotal,
                                'Impuestos' => $Impuestos,
                                'Total' => $Total_Real,
                                'Total_desc' => $Total,
                                'Adeudo' => $Total,
                                'Extraido' => 0,
                                'Status' => 'Pendiente',
                                'Generado' => 0,
                                'Fecha_entrega' => $nuevafecha,
                                'Empaquetado' => 0,
                                'Compras_puntos' => 0,
                                'Tipo_app' => 'Web');

        $this->db->trans_begin();

        $this->db->insert('ventas_menudeo_back', $Venta_Menudeo);

        $this->db->insert('Ventas_menudeo', $Venta_Menudeo);
        $insert_id = $this->db->insert_id();

        if (isset($data['idCatalogo'])){
            if (count($idCatalogo) > 0){
                for ($i=0; $i < count($idCatalogo); $i++){ 
                    $Detalle_Venta_Menudeo = array('idVenta_menudeo' => $insert_id,
                                        'idCatalogo' => $idCatalogo[$i],
                                        'Cantidad' => $Cantidad[$i],
                                        'Precio_unitario' => $Precio[$i],
                                        'Importe' => $Importe[$i],
                                        'Tipo' => 'Producto',
                                        'Setoferta' => $SetOferta_Cata[$i]);

                    $this->db->insert('Detalle_venta_menudeo', $Detalle_Venta_Menudeo);
                    $this->db->insert('detalle_venta_menudeo_back', $Detalle_Venta_Menudeo);
                }
            }
        }

        if (isset($data['idPromocion'])){
            if (count($idPromocion) > 0){
                for ($i=0; $i < count($idPromocion); $i++){ 
                    $Detalle_Venta_Menudeo = array('idVenta_menudeo' => $insert_id,
                                        'idPromocion' =>$idPromocion[$i],
                                        'Cantidad' => $Cantidad_Promo[$i],
                                        'Precio_unitario' => $Precio_Promo[$i],
                                        'Importe' => $Importe_Promo[$i],
                                        'Tipo' => 'Promocion');

                    $this->db->insert('Detalle_venta_menudeo', $Detalle_Venta_Menudeo);
                    $this->db->insert('detalle_venta_menudeo_back', $Detalle_Venta_Menudeo);
                }
            }
        }

        if (isset($data['idOferta'])){
            if (count($idOferta) > 0){
                for ($i=0; $i < count($idOferta); $i++){ 
                    $Detalle_Venta_Menudeo = array('idVenta_menudeo' => $insert_id,
                                        'idOferta' =>$idOferta[$i],
                                        'Cantidad' => $Cantidad_Ofe[$i],
                                        'Precio_unitario' => $Precio_Ofe[$i],
                                        'Importe' => $Importe_Ofe[$i],
                                        'Tipo' => 'Oferta');

                    $this->db->insert('Detalle_venta_menudeo', $Detalle_Venta_Menudeo);
                    $this->db->insert('detalle_venta_menudeo_back', $Detalle_Venta_Menudeo);
                }
            }
        }

        $Pagos_Progra = array(  'idVenta_menudeo' => $insert_id,
                                'Fecha_pago' => $nuevafechaMes,
                                'Monto_pago' => $Total,
                                'Status' => 'Pendiente',
                                'Adeudo' => $Total);

        $this->db->insert('Pagos_programados', $Pagos_Progra);

        $info_Cliente = $this->getinfoClienteById(261);

        $Venta = array('Fecha_venta' => date("Y-m-d H:i:s"),
                        'idCliente' => 261,
                        'Descuento' => $Descuento,
                        'Subtotal' => $Subtotal,
                        'Impuestos' => $Impuestos,
                        'Total' => $Total,
                        'Adeudo' => $Total,
                        'Status' => 'Pendiente',
                        'Pedidos' => 1,
                        'Extraido' => 0,
                        'Empaquetado' => 0,
                        'Timbrado' => 0,
                        'Tipo_Factura' => 0,
                        'Cuota' => $info_Cliente[0]['Cuota'],
                        'Gastos_Admin' => 0.00,
                        'Ventas_Directas' => 1);

        $this->db->insert('Ventas', $Venta);
        $idVenta = $this->db->insert_id();

        $logs_ventas_desk = array('idVenta' => $idVenta,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Generar',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

        $this->db->query('UPDATE Ventas_menudeo SET idVenta = '.$idVenta.', Generado = 1  WHERE ID = '.$insert_id.'');

        // Calcular Referencia //
        switch(strlen($idVenta))
        {
            case 1:
                $RefVenta = "00000" . $idVenta;
                break;
            case 2:
                $RefVenta = "0000" . $idVenta;
                break;
            case 3:
                $RefVenta = "000" . $idVenta;
                break;
            case 4:
                $RefVenta = "00" . $idVenta;
                break;
            case 5:
                $RefVenta =  "0" . $idVenta;
                break;
            case 6:
                $RefVenta = $idVenta;
                break;
        }

        switch (strlen($info_Cliente[0]['ID']))
        {
            case 1:
                $RefCliente = "000" . $info_Cliente[0]['ID'];
                break;
            case 2:
                $RefCliente = "00" . $info_Cliente[0]['ID'];
                break;
            case 3:
                $RefCliente = "0" . $info_Cliente[0]['ID'];
                break;
            case 4:
                $RefCliente = "" . $info_Cliente[0]['ID'];
                break;
        }

        $Referencia = $this->getReferencia($RefVenta.$RefCliente);

        $this->db->query('UPDATE Ventas SET Referencia = "'.$Referencia.'"  WHERE ID = '.$idVenta.'');

        $logs_ventas_desk_depo = array('idVenta' => $idVenta,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Deposito',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk_depo);

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return $insert_id;
        }
    }

    // Obtener Info Cliente By ID //
    public function getinfoClienteById($id)
    {
    	$this->db->select('*');
        $this->db->from('Clientes');
        $this->db->where('ID', $id);
        $query = $this->db->get();
        $result = $query->result_array();
     
        return $result;
    }

    // Obtener Informacion Detalle Venta Directa //
    public function getInfoDetalleVentaDirecta($idVenta)
    {
        try{
        
            $this->db->select('DVM.*, CA.Producto AS Producto');
            $this->db->from('Ventas AS V');
            $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
            $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
            $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID');
            $this->db->where('V.ID', $idVenta);
            $query = $this->db->get();
            $Query1 = $query->result_array();


            $this->db->select('DVM.*, PO.Promocion AS Producto');
            $this->db->from('Ventas AS V');
            $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
            $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
            $this->db->join('Promociones AS PO','DVM.idPromocion = PO.ID');
            $this->db->where('V.ID', $idVenta);
            $query2 = $this->db->get();
            $Query2 = $query2->result_array();

            $this->db->select('DVM.*, O.Nombre AS Producto');
            $this->db->from('Ventas AS V');
            $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
            $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
            $this->db->join('Ofertas AS O','DVM.idOferta = O.ID');
            $this->db->where('V.ID', $idVenta);
            $query3 = $this->db->get();
            $Query3 = $query3->result_array();

            $listInvoice = array_merge($Query1,$Query2,$Query3);
        }
        catch(Exception $er)
        {
            $listInvoice = null;
        }

        return $listInvoice;
    }

    // Generar Referencia Bancaria //
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
                    $result = $this->SumaCifras($ponderador);
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

    public function SumaCifras($num)
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

    public function Validate_Venta($idVenta)
    {
        
        $this->db->select('*'); 
        $this->db->from('Pagos_clientes');
        $this->db->where('idVenta',$idVenta);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Info Ventas By IdVenta //
    public function getVentasByIdVenta($idVenta){
        
        $this->db->select('*'); 
        $this->db->from('Ventas');
        $this->db->where('ID',$idVenta);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Add_Pago($data,$Adeudo){
        $this->db->trans_begin();

        $this->db->insert('Pagos_clientes', $data);
        $insert_id = $this->db->insert_id();


        $logs_ventas_desk = array('idVenta' => $data['idVenta'],
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Deposito',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

        $this->db->where('ID',$data['idVenta']);
        $this->db->set('Status','Pagado');
        $this->db->set('Adeudo',$Adeudo);
        $this->db->update('Ventas');

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }
}
