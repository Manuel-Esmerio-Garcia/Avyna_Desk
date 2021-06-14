<?php

class Ventas_Model extends CI_Model 
{
	public function __construct() 
    {
       // Inicializa la Clase de la Base de Datos.
        $this->load->database();
        parent::__construct();
    }

    public function getVentasMenudeo($info){
        
        $this->db->select('*'); 
        $this->db->from('ventas_menudeo');
        $this->db->where('idCliente_menudeo',$info['idCliente']);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    // Obtener Info Ventas By IdVenta //
    public function getVentasByIdVenta($idVenta)
    {
        
        $this->db->select('*'); 
        $this->db->from('Ventas');
        $this->db->where('ID',$idVenta);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Get_Division()
    {
    	
        
        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('Divisiones');
        $this->db->order_by("Division", "ASC");
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Get_Clientes($id)
    {
        
        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('Clientes_menudeo');
        $this->db->where('idCliente',$id);
        $this->db->where('Status' , 'Activo');
        $this->db->order_by("Nombre", "ASC");
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Get_Count_Ventas($id)
    {
        
        $this->db->select('v.Timbrado'); 
        $this->db->from('Ventas as v');
        $this->db->join('ventas_menudeo as vm','v.ID = vm.idVenta');
        $this->db->where('v.idCliente',$id);
        $this->db->where('v.Adeudo <= 0');
        $this->db->where('vm.Tipo_app != "Website"');
        $this->db->group_by('v.ID');
        $this->db->order_by("v.ID", "DESC");
        $this->db->limit(5); 
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    function Get_Infomación_Venta($id)
    {
        
        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('Ventas_menudeo');
        $this->db->where('ID',$id);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    function Get_Infomación_Detalle_Venta($id)
    {
        
        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('Detalle_venta_menudeo');
        $this->db->where('idVenta_menudeo',$id);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Get_Infomación_Detalle_Venta_Producto($id)
    {
        
        $this->db->distinct();
        $this->db->select('DVM.*, CA.Division, CA.Linea, CA.Sublinea, CA.ID AS ID_Producto, CA.Producto'); 
        $this->db->from('Detalle_venta_menudeo AS DVM');
        $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID');
        $this->db->where('DVM.idVenta_menudeo',$id);
        $this->db->where('DVM.idCatalogo IS NOT NULL');
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Get_Infomación_Detalle_Venta_Promociones($id)
    {
        
        $this->db->distinct();
        $this->db->select('DVM.*,PO.Promocion, PO.ID AS IDPromocion'); 
        $this->db->from('Detalle_venta_menudeo AS DVM');
        $this->db->join('Promociones AS PO','DVM.idPromocion = PO.ID');
        $this->db->where('DVM.idVenta_menudeo',$id);
        $this->db->where('DVM.idPromocion IS NOT NULL');
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Get_Infomación_Detalle_Venta_Oferta($id)
    {
        
        $this->db->distinct();
        $this->db->select('DVM.*,PO.Nombre, PO.ID AS IDOferta'); 
        $this->db->from('Detalle_venta_menudeo AS DVM');
        $this->db->join('Ofertas AS PO','DVM.idOferta = PO.ID');
        $this->db->where('DVM.idVenta_menudeo',$id);
        $this->db->where('DVM.idOferta IS NOT NULL');
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Get_Ventas_Menudeo($idVentaMenudeo)
    {
        
        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('Ventas_menudeo');
        $this->db->where('ID',$idVentaMenudeo);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Get_Detalle_Ventas($idVentaMenudeo)
    {
        
        $this->db->distinct();
        $this->db->select('*'); 
        $this->db->from('Detalle_venta_menudeo');
        $this->db->where('idVenta_menudeo',$idVentaMenudeo);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    /// Verificar Vista ///
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





    public function getProductPromo($idPromocion){
        $this->db->select('*'); 
        $this->db->from('productos_promociones');
        $this->db->where('idPromocion',$idPromocion);

        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    /////////////////////////////////////////////////////////
    ///// Validar Existencias Promocion por idPromocion /////
    /////////////////////////////////////////////////////////
    public function validateExistenciasPromocion($idSucursal,$idPromocion, $Cantidad){

        /*
        select pp.*, IFNULL((SUM(dnv.Existencias) - pa.Cantidad), SUM(dnv.Existencias)) as disponibles , inv.idSucursal as idSucursalReal, pa.Cantidad
from catalogo ca
inner join productos_promociones pp on ca.ID = pp.idCatalogo
inner join inventario inv on ca.ID = inv.idCatalogo
inner join detalle_inventario dnv on inv.ID = dnv.idInventario
inner join sucursales s on inv.idSucursal = s.ID
left join productos_apartados_view pa on ca.ID = pa.idCatalogo and s.ID = pa.idSucursal
where inv.idSucursal = 2 and pp.idPromocion = 167
GROUP by pp.idCatalogo, pp.idPromocion;
        */

        $this->db->select('pp.*, IFNULL((SUM(dnv.Existencias) - pa.Cantidad), SUM(dnv.Existencias)) as disponibles, (pp.Cantidad * '.$Cantidad.') as Cantidad_Final'); 
        $this->db->from('catalogo ca');
        $this->db->join('productos_promociones pp','ca.ID = pp.idCatalogo');
        $this->db->join('inventario inv','ca.ID = inv.idCatalogo');
        $this->db->join('detalle_inventario dnv','inv.ID = dnv.idInventario');
        $this->db->join('sucursales s','inv.idSucursal = s.ID');
        $this->db->join('productos_apartados_view pa','ca.ID = pa.idCatalogo and s.ID = pa.idSucursal','LEFT');
        $this->db->where('inv.idSucursal',$idSucursal);
        $this->db->where('pp.idPromocion',$idPromocion);
        $this->db->group_by('pp.idCatalogo, pp.idPromocion');

        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

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
    /// Agregar Venta menudeo //
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

    public function getPromo($id){
        $this->db->select('*'); 
        $this->db->from('Promociones');
        $this->db->where('ID',$id);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function getProduct($id){
        $this->db->select('*'); 
        $this->db->from('Catalogo');
        $this->db->where('ID',$id);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
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

        $this->db->query('DELETE FROM Pagos_programados where idVenta_menudeo = '.$data['idPedido'].'');
        $this->db->query('DELETE FROM Detalle_venta_menudeo where idVenta_menudeo ='.$data['idPedido'].'');
        $this->db->query('DELETE FROM Ventas_menudeo where ID ='.$data['idPedido'].'');

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

    public function Get_Linea_By_ID($id)
    {
        
        $this->db->select('*'); 
        $this->db->from('Lineas');
        $this->db->where('idDivision',$id);
        $this->db->order_by("Linea", "ASC");
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Get_Sublinea_By_ID($id)
    {
        $this->db->select('*'); 
        $this->db->from('Sublineas');
        $this->db->where('idLinea',$id);
        $this->db->order_by("Sublinea", "ASC");
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Get_Promociones($idDistribuidor,$idSucursal)
    {
        $Result = $this->db->query("SELECT * FROM Promociones_app WHERE (Excluir_Distribuidores = 0 OR idDistribuidor = ".$idDistribuidor.") AND idSucursal = ".$idSucursal." GROUP BY idPromocion ORDER BY Producto ASC");
        $query  = $Result->result_array();
        
        return $query;
    }

    public function GetDetalle_Promo($id)
    {
        $this->db->select('CA.*'); 
        $this->db->from('Productos_promociones AS PP');
        $this->db->join('Catalogo AS CA','PP.idCatalogo = CA.ID');
        $this->db->where('PP.idPromocion',$id);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function Get_Catalogo_by_id($id)
    {
        $this->db->select('*'); 
        $this->db->from('Catalogo');
        $this->db->where('ID',$id);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    public function validateExistenciasOfertas($id,$idSucursal){

        $contador = 0;
        $listErrors = array();

        
        $this->db->select('O.*, COUNT(R.idCatalogo) AS Cantidad, R.idCatalogo, CA.Producto'); 
        $this->db->from('Ofertas AS O');
        $this->db->join('Regalos AS R','O.ID = R.idOferta');
        $this->db->join('Catalogo AS CA','R.idCatalogo = CA.ID');
        $this->db->where('R.idOferta',$id);
        $this->db->group_by('R.idCatalogo');
        $query = $this->db->get();
        $result = $query->result_array();

        if (!empty($result)) {
            foreach ($result as $key => $value) {

                
                $this->db->select('Detalle_inventario.*, SUM(Detalle_inventario.Existencias) AS Existencias_Real, Catalogo.Producto, Catalogo.ID AS idCatalogo'); 
                $this->db->from('Inventario');
                $this->db->join('Detalle_inventario','Inventario.ID = Detalle_inventario.idInventario');
                $this->db->join('Catalogo','Inventario.idCatalogo = Catalogo.ID');
                $this->db->where('Inventario.idSucursal',$idSucursal);
                $this->db->where('Detalle_inventario.Existencias > 0');
                $this->db->where('Inventario.idCatalogo',$value['idCatalogo']);
                $this->db->group_by('Inventario.idCatalogo');
                $query = $this->db->get();
                $info = $query->result_array();

                if (!empty($info)) {

                    if ($info[0]['Existencias_Real'] >= $result[0]['Cantidad']) {
                        continue;
                    }else{
                        array_push($listErrors, $info[0]['idCatalogo']." ".$info[0]['Producto']);
                        $contador++;
                    }
                }else{
                    array_push($listErrors, $result[0]['idCatalogo']." ".$result[0]['Producto']);
                    $contador++;
                }
            }

            if ($contador == 0) {
                return 0;
            }else{
                return $listErrors;
            }

        }else{
            return 0;
        }        
    }

    public function GetDetalle_Oferta($idDistribuidor,$id)
    {
        #SELECT * FROM Ofertas_app WHERE Excluir_Distribuidores = 0 OR idDistribuidor = 3

        $Result = $this->db->query("SELECT * FROM Ofertas_app WHERE (Excluir_Distribuidores = 0 OR idDistribuidor = ".$idDistribuidor.") AND ID = ".$id." GROUP BY idDivision, idLinea, idSublinea, idCatalogo, idRegalo");
        $query  = $Result->result_array();
        
        return $query;
    }

    public function Get_Ofertas($idDistribuidor,$idSucursal)
    {
        $Result = $this->db->query("SELECT * FROM Ofertas_app WHERE Excluir_Distribuidores = 0 OR idDistribuidor = ".$idDistribuidor." GROUP BY ID ORDER BY Nombre ASC ");
        $query  = $Result->result_array();
        
        return $query;
    }

    #SELECT * FROM Ofertas_app WHERE SELECT * FROM Promociones_app WHERE (Excluir_Distribuidores = 0 OR idDistribuidor = '" + idDistribuidor + "') AND idSucursal = '" + idSucursal + "'"

}