<?php defined('BASEPATH') OR exit('No direct script access allowed');

date_default_timezone_set('America/Mexico_City');

ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

class Fetch_Model extends CI_Model 
{


  public function fetchCuentasXPagar($data){
    $order = '';

    $columns = array('v.ID', 'cl.Nombre','v.Fecha_venta', 'v.Total', 'v.Adeudo', 'v.Referencia');

    //// Get All Result ////
    
    $this->db->select("v.*, CONCAT(cl.Nombre, ' ', cl.Apellidos) AS Distribuidor"); 
    $this->db->from('ventas v');
    $this->db->join('clientes cl','v.idCliente = cl.ID');
    $this->db->where('v.Adeudo > 0');
    $this->db->where('v.Referencia != "0"');

   // Filtros Inventario General //
   if ($data['idBodega']){$this->db->where('cl.idSucursal',$data['idBodega']);}
      if ($data['is_date_search'] == "yes"){$this->db->where('v.Fecha_venta BETWEEN "'.$data["start_date"].' 00:00:00" AND "'.$data["end_date"].' 23:59:59"');}

   // if ($data['is_date_search'] == "yes"){$this->db->where('v.Fecha_venta BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}


    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('v.ID', $data['search']['value']);
      $this->db->or_like('cl.Nombre', $data['search']['value']);
      $this->db->or_like('v.Fecha_venta', $data['search']['value']);
      $this->db->or_like('v.Total', $data['search']['value']);
      $this->db->or_like('v.Adeudo', $data['search']['value']);
      $this->db->or_like('v.Referencia', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'v.ID DESC ';
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
    $this->db->select("v.*, CONCAT(cl.Nombre, ' ', cl.Apellidos) AS Distribuidor"); 
    $this->db->from('ventas v');
    $this->db->join('clientes cl','v.idCliente = cl.ID');
    $this->db->where('v.Adeudo > 0');
    $this->db->where('v.Referencia != "0"');

    // Filtros Inventario General //
    if ($data['idBodega']){$this->db->where('cl.idSucursal',$data['idBodega']);}
       if ($data['is_date_search'] == "yes"){$this->db->where('v.Fecha_venta BETWEEN "'.$data["start_date"].' 00:00:00" AND "'.$data["end_date"].' 23:59:59"');}

    // if ($data['is_date_search'] == "yes"){$this->db->where('v.Fecha_venta BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}

    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    $this->db->select("v.*, CONCAT(cl.Nombre, ' ', cl.Apellidos) AS Distribuidor"); 
    $this->db->from('ventas v');
    $this->db->join('clientes cl','v.idCliente = cl.ID');
    $this->db->where('v.Adeudo > 0');
    $this->db->where('v.Referencia != "0"');

    // Filtros Inventario General //
    if ($data['idBodega']){$this->db->where('cl.idSucursal',$data['idBodega']);}
       if ($data['is_date_search'] == "yes"){$this->db->where('v.Fecha_venta BETWEEN "'.$data["start_date"].' 00:00:00" AND "'.$data["end_date"].' 23:59:59"');}

    // if ($data['is_date_search'] == "yes"){$this->db->where('v.Fecha_venta BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}

    if($data["search"]["value"] !== ''){
     $this->db->group_start();
     $this->db->like('v.ID', $data['search']['value']);
     $this->db->or_like('cl.Nombre', $data['search']['value']);
     $this->db->or_like('v.Fecha_venta', $data['search']['value']);
     $this->db->or_like('v.Total', $data['search']['value']);
     $this->db->or_like('v.Adeudo', $data['search']['value']);
     $this->db->or_like('v.Referencia', $data['search']['value']);
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
      $dataTable[] = $row["Distribuidor"];
      $dataTable[] = $row["Fecha_venta"];
      $dataTable[] = $row["Total"];
      $dataTable[] = $row["Adeudo"];
      $dataTable[] = $row["Referencia"];
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


  // dataTable Modulo Roles 20/06/2019//
	public function fetchRoles($data)
	{
		$order = '';
    $columns = array('ID', 'Rol','Status');

    
    $this->db->select('*'); 
    $this->db->from('Roles');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Rol', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'ID ASC ';
    }

    $this->db->order_by($order);
    if($_POST["length"] != -1){
      $this->db->limit($data['length'],$data['start']);
    }
    $query = $this->db->get();
    $result = $query->result_array();

    $this->db->select('*'); 
    $this->db->from('Roles');
    $total = $this->db->count_all_results();

    $this->db->select('*'); 
    $this->db->from('Roles');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Rol', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->group_end();
    }
    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();

    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["ID"];
      $dataTable[] = $row["Rol"];
      $dataTable[] = $row["Status"];
      $dataResult[] = $dataTable;
    }

    $output = array(
     "draw"    => $data["draw"],
     "recordsTotal"  => $total,
     "recordsFiltered" => $total_filtered,
     "data"    => $dataResult
    );

    return json_encode($output);
	}
  // dataTable Modulo Roles 20/06/2019//


  //////////////////////////////////////////////////////
  ///////////////// Inventario Module //////////////////

  // dataTable Modulo Inventario General 26/06/2019//
  public function fetchInventarioGeneral($data)
  {
    $order = '';
    $columns = array('ID', 'Codigo', 'Producto', 'Descripcion', 'Marca', 'Division', 'Linea', 'Sublinea', 'Min', 'Existencias','Existencias_apartados','Faltante');

    
    $this->db->select('*'); 
    $this->db->from('Inventario_producto_view');
    $this->db->where("Status","Activo");

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Codigo', $data['search']['value']);
      $this->db->or_like('Producto', $data['search']['value']);
      $this->db->or_like('Descripcion', $data['search']['value']);
      $this->db->or_like('Marca', $data['search']['value']);
      $this->db->or_like('Division', $data['search']['value']);
      $this->db->or_like('Linea', $data['search']['value']);
      $this->db->or_like('Sublinea', $data['search']['value']);
      $this->db->or_like('Min', $data['search']['value']);
      $this->db->or_like('Existencias', $data['search']['value']);
      $this->db->or_like('Existencias_apartados', $data['search']['value']);
      $this->db->or_like('Faltante', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'ID ASC ';
    }

    // Filtros Inventario General //
    if ($data['Marca']){$this->db->where('idMarca',$data['Marca']);}
    if ($data['Division']){$this->db->where('idDivision',$data['Division']);}
    if ($data['Linea']){$this->db->where('idLinea',$data['Linea']);}
    if ($data['Sublinea']){$this->db->where('idSublinea',$data['Sublinea']);}

    $this->db->order_by($order);
    if($_POST["length"] != -1){
      $this->db->limit($data['length'],$data['start']);
    }
    $query = $this->db->get();
    $result = $query->result_array();

    $this->db->save_queries = TRUE;
    $str = $this->db->last_query();

    $this->db->select('*'); 
    $this->db->from('Inventario_producto_view');
    $this->db->where("Status","Activo");
    $total = $this->db->count_all_results();

    $this->db->select('*'); 
    $this->db->from('Inventario_producto_view');
    $this->db->where("Status","Activo");

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Codigo', $data['search']['value']);
      $this->db->or_like('Producto', $data['search']['value']);
      $this->db->or_like('Descripcion', $data['search']['value']);
      $this->db->or_like('Marca', $data['search']['value']);
      $this->db->or_like('Division', $data['search']['value']);
      $this->db->or_like('Linea', $data['search']['value']);
      $this->db->or_like('Sublinea', $data['search']['value']);
      $this->db->or_like('Min', $data['search']['value']);
      $this->db->or_like('Existencias', $data['search']['value']);
      $this->db->or_like('Existencias_apartados', $data['search']['value']);
      $this->db->or_like('Faltante', $data['search']['value']);
      $this->db->group_end();
    }
// Filtros Inventario General //
    if ($data['Marca']){$this->db->where('idMarca',$data['Marca']);}
    if ($data['Division']){$this->db->where('idDivision',$data['Division']);}
    if ($data['Linea']){$this->db->where('idLinea',$data['Linea']);}
    if ($data['Sublinea']){$this->db->where('idSublinea',$data['Sublinea']);}

    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();

    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["ID"];
      $dataTable[] = $row["Codigo"];
      $dataTable[] = $row["Producto"];
      $dataTable[] = $row["Descripcion"];
      $dataTable[] = $row["Marca"];
      $dataTable[] = $row["Division"];
      $dataTable[] = $row["Linea"];
      $dataTable[] = $row["Sublinea"];
      $dataTable[] = $row["Min"];
      $dataTable[] = $row["Existencias"];
      $dataTable[] = $row["Existencias_apartados"];
      $dataTable[] = $row["Faltante"];
      $dataResult[] = $dataTable;
    }

    $output = array(
     "draw"    => $data["draw"],
     "recordsTotal"  => $total,
     "recordsFiltered" => $total_filtered,
     "data"    => $dataResult,
     "info"    => $str
    );

    return json_encode($output);
  }
  // dataTable Modulo Inventario General 26/06/2019//

  // dataTable Modulo Inventario Bodega 26/06/2019//
  public function fetchBodega($data)
  {
    $order = '';
    $columns = array('idInventario', 'Codigo', 'Producto', 'Descripcion', 'Marca', 'Division', 'Linea', 'Sublinea', 'Min', 'Existencias','Existencias_apartados','Existencias_disponibles','Faltante');

    
    $this->db->select('*'); 
    $this->db->from('Inventario_producto_sucursal_view');
    $this->db->where('Status','Activo');
    $this->db->where('idSucursal',$data['Bodega']);

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('idInventario', $data['search']['value']);
      $this->db->or_like('Codigo', $data['search']['value']);
      $this->db->or_like('Producto', $data['search']['value']);
      $this->db->or_like('Descripcion', $data['search']['value']);
      $this->db->or_like('Marca', $data['search']['value']);
      $this->db->or_like('Division', $data['search']['value']);
      $this->db->or_like('Linea', $data['search']['value']);
      $this->db->or_like('Sublinea', $data['search']['value']);
      $this->db->or_like('Min', $data['search']['value']);
      $this->db->or_like('Existencias', $data['search']['value']);
      $this->db->or_like('Existencias_apartados', $data['search']['value']);
      $this->db->or_like('Existencias_disponibles', $data['search']['value']);
      $this->db->or_like('Faltante', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
       $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
       $order .= 'ID ASC ';
    }

    // Filtros Inventario General //
    if ($data['Marca']){$this->db->where('idMarca',$data['Marca']);}
    if ($data['Division']){$this->db->where('idDivision',$data['Division']);}
    if ($data['Linea']){$this->db->where('idLinea',$data['Linea']);}
    if ($data['Sublinea']){$this->db->where('idSublinea',$data['Sublinea']);}

    $this->db->order_by($order);
    if($_POST["length"] != -1){
      $this->db->limit($data['length'],$data['start']);
    }
    $query = $this->db->get();
    $result = $query->result_array();

    $this->db->save_queries = TRUE;
    $str = $this->db->last_query();

    $this->db->select('*'); 
    $this->db->from('Inventario_producto_sucursal_view');
    $this->db->where('Status','Activo');
    $this->db->where('idSucursal',$data['Bodega']);
    $total = $this->db->count_all_results();

    $this->db->select('*'); 
    $this->db->from('Inventario_producto_sucursal_view');
    $this->db->where('Status','Activo');
    $this->db->where('idSucursal',$data['Bodega']);

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('idInventario', $data['search']['value']);
      $this->db->or_like('Codigo', $data['search']['value']);
      $this->db->or_like('Producto', $data['search']['value']);
      $this->db->or_like('Descripcion', $data['search']['value']);
      $this->db->or_like('Marca', $data['search']['value']);
      $this->db->or_like('Division', $data['search']['value']);
      $this->db->or_like('Linea', $data['search']['value']);
      $this->db->or_like('Sublinea', $data['search']['value']);
      $this->db->or_like('Min', $data['search']['value']);
      $this->db->or_like('Existencias', $data['search']['value']);
      $this->db->or_like('Existencias_apartados', $data['search']['value']);
      $this->db->or_like('Existencias_disponibles', $data['search']['value']);
      $this->db->or_like('Faltante', $data['search']['value']);
      $this->db->group_end();
    }
// Filtros Inventario General //
    if ($data['Marca']){$this->db->where('idMarca',$data['Marca']);}
    if ($data['Division']){$this->db->where('idDivision',$data['Division']);}
    if ($data['Linea']){$this->db->where('idLinea',$data['Linea']);}
    if ($data['Sublinea']){$this->db->where('idSublinea',$data['Sublinea']);}

    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();

    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["idInventario"];
      $dataTable[] = $row["Codigo"];
      $dataTable[] = $row["Producto"];
      $dataTable[] = $row["Descripcion"];
      $dataTable[] = $row["Marca"];
      $dataTable[] = $row["Division"];
      $dataTable[] = $row["Linea"];
      $dataTable[] = $row["Sublinea"];
      $dataTable[] = $row["Min"];
      $dataTable[] = $row["Existencias"];
      $dataTable[] = $row["Existencias_apartados"];
      $dataTable[] = $row["Existencias_disponibles"];
      $dataTable[] = $row["Faltante"];
      $dataResult[] = $dataTable;
    }

    $output = array(
     "draw"    => $data["draw"],
     "recordsTotal"  => $total,
     "recordsFiltered" => $total_filtered,
     "data"    => $dataResult,
     "info"    => $str
    );

    return json_encode($output);
  }
  // dataTable Modulo Inventario Bodega 26/06/2019//

  // dataTable Modulo Inventario Locación 27/06/2019//
  public function fetchLocacion($data)
  {
    $order = '';
    $columns = array('ID', 'Locacion', 'Fecha_ingreso', 'Existencias', 'Existencias_apartados');

    
    $this->db->select('*'); 
    $this->db->from('Locaciones_sucursal_view');
    $this->db->where('idSucursal',$data['Bodega']);

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Locacion', $data['search']['value']);
      $this->db->or_like('Fecha_ingreso', $data['search']['value']);
      $this->db->or_like('Existencias', $data['search']['value']);
      $this->db->or_like('Existencias_apartados', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'ID ASC ';
    }

    $this->db->order_by($order);

    if($_POST["length"] != -1){
      $this->db->limit($data['length'],$data['start']);
    }
    $query = $this->db->get();
    $result = $query->result_array();

    $this->db->save_queries = TRUE;
    $str = $this->db->last_query();

    $this->db->select('*'); 
    $this->db->from('Locaciones_sucursal_view');
    $this->db->where('idSucursal',$data['Bodega']);
    $total = $this->db->count_all_results();

    $this->db->select('*'); 
    $this->db->from('Locaciones_sucursal_view');
    $this->db->where('idSucursal',$data['Bodega']);

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Locacion', $data['search']['value']);
      $this->db->or_like('Fecha_ingreso', $data['search']['value']);
      $this->db->or_like('Existencias', $data['search']['value']);
      $this->db->or_like('Existencias_apartados', $data['search']['value']);
      $this->db->group_end();
    }
    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();

    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["ID"];
      $dataTable[] = $row["Locacion"];
      $dataTable[] = $row["Fecha_ingreso"];
      $dataTable[] = $row["Existencias"];
      $dataTable[] = $row["Existencias_apartados"];
      $dataResult[] = $dataTable;
    }

    $output = array(
     "draw"    => $data["draw"],
     "recordsTotal"  => $total,
     "recordsFiltered" => $total_filtered,
     "data"    => $dataResult,
     "info"    => $str
    );

    return json_encode($output);
  }
  // dataTable Modulo Inventario Locación 27/06/2019//

  // dataTable Modulo Inventario Movimiento 27/06/2019//
  public function fetchMovimiento($data)
  {
    $order = '';
    $columns = array('ID', 'Codigo', 'Producto', 'Existencias');

    
    $this->db->select('*'); 
    $this->db->from('Detalle_invetario_locaciones_view');
    $this->db->where('idSucursal',$data['Bodega']);
    $this->db->where('idLocacion',$data['Locacion']);

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Codigo', $data['search']['value']);
      $this->db->or_like('Producto', $data['search']['value']);
      $this->db->or_like('Existencias', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'ID DESC ';
    }

    $this->db->order_by($order);
    if($_POST["length"] != -1){
      $this->db->limit($data['length'],$data['start']);
    }
    $query = $this->db->get();
    $result = $query->result_array();

    $this->db->save_queries = TRUE;
    $str = $this->db->last_query();

    $this->db->select('*'); 
    $this->db->from('Detalle_invetario_locaciones_view');
    $this->db->where('idSucursal',$data['Bodega']);
    $this->db->where('idLocacion',$data['Locacion']);
    $total = $this->db->count_all_results();

    $this->db->select('*'); 
    $this->db->from('Detalle_invetario_locaciones_view');
    $this->db->where('idSucursal',$data['Bodega']);
    $this->db->where('idLocacion',$data['Locacion']);

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Codigo', $data['search']['value']);
      $this->db->or_like('Producto', $data['search']['value']);
      $this->db->or_like('Existencias', $data['search']['value']);
      $this->db->group_end();
    }
    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();

    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["ID"];
      $dataTable[] = $row["Codigo"];
      $dataTable[] = $row["Producto"];
      $dataTable[] = $row["Existencias"];
      $dataResult[] = $dataTable;
    }

    $output = array(
     "draw"    => $data["draw"],
     "recordsTotal"  => $total,
     "recordsFiltered" => $total_filtered,
     "data"    => $dataResult,
     "info"    => $str,
     "result"    => $result
    );

    return json_encode($output);
  }

  ////////////////////////////////////////////////////
  ///////////////// Compras Module //////////////////
  ///////////////////////////////////////////////////

  public function fetchOrdenCompra($data)
  {
    $order = '';
    $columns = array('ID', 'Sucursal','Usuario', 'Fecha','Proveedor','Referencia','Cantidad_productos','Monto','Status');

    
    $this->db->select('*'); 
    $this->db->from('Ordenes_compra_view');
    $this->db->where('idSucursal',$data['Bodega']);

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Sucursal', $data['search']['value']);
      $this->db->or_like('Usuario', $data['search']['value']);
      $this->db->or_like('Fecha', $data['search']['value']);
      $this->db->or_like('Proveedor', $data['search']['value']);
      $this->db->or_like('Referencia', $data['search']['value']);
      $this->db->or_like('Cantidad_productos', $data['search']['value']);
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

    $this->db->order_by($order);

    if($_POST["length"] != -1){
      $this->db->limit($data['length'],$data['start']);
    }

    $query = $this->db->get();
    $this->db->save_queries = TRUE;
    $str1 = $this->db->last_query(); 

    $result = $query->result_array();

    $this->db->save_queries = TRUE;
    $str = $this->db->last_query();    

    $this->db->select('*'); 
    $this->db->from('Ordenes_compra_view');
    $this->db->where('idSucursal',$data['Bodega']);
    $total = $this->db->count_all_results();

    $this->db->select('*'); 
    $this->db->from('Ordenes_compra_view');
    $this->db->where('idSucursal',$data['Bodega']);

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Sucursal', $data['search']['value']);
      $this->db->or_like('Usuario', $data['search']['value']);
      $this->db->or_like('Fecha', $data['search']['value']);
      $this->db->or_like('Proveedor', $data['search']['value']);
      $this->db->or_like('Referencia', $data['search']['value']);
      $this->db->or_like('Cantidad_productos', $data['search']['value']);
      $this->db->or_like('Monto', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->group_end();
    }

    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();

    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["ID"];
      $dataTable[] = $row["Sucursal"];
      $dataTable[] = $row["Usuario"];
      $dataTable[] = $row["Fecha"].'<span hidden="hidden">'.$row['idCompra_avyna'].'</span>';
      $dataTable[] = $row["Proveedor"];
      $dataTable[] = $row["Referencia"];
      $dataTable[] = $row["Cantidad_productos"];
      $dataTable[] = $row["Monto"];
      $dataTable[] = $row["Status"];
      $dataResult[] = $dataTable;
    }

    $output = array(
     "draw"    => $data["draw"],
     "recordsTotal"  => $total,
     "recordsFiltered" => $total_filtered,
     "data"    => $dataResult,
     "info"    => $str,
     "result"    => $result
    );

    return json_encode($output);
  }

  ////////////////////////////
  //// Pestaña de Compra /////
  public function fetchCompras($data)
  {
    $order = '';
    $columns = array('ID', 'Codigo_compra','Fecha_compra', 'Proveedores','Subtotal','Impuestos','Total','Adeudo','Status','Sucursal');

    
    $this->db->select('*'); 
    $this->db->from('Compras_View_Module');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Codigo_compra', $data['search']['value']);
      $this->db->or_like('Fecha_compra', $data['search']['value']);
      $this->db->or_like('Proveedores', $data['search']['value']);
      $this->db->or_like('Subtotal', $data['search']['value']);
      $this->db->or_like('Impuestos', $data['search']['value']);
      $this->db->or_like('Total', $data['search']['value']);
      $this->db->or_like('Adeudo', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->or_like('Sucursal', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
       $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
       $order .= 'ID DESC ';
    }

    $this->db->order_by($order);

    if($_POST["length"] != -1){
      $this->db->limit($data['length'],$data['start']);
    }

    $query = $this->db->get();
    $result = $query->result_array();

    $this->db->save_queries = TRUE;
    $str = $this->db->last_query();    

    $this->db->select('*'); 
    $this->db->from('Compras_View_Module');
    $total = $this->db->count_all_results();

    $this->db->select('*'); 
    $this->db->from('Compras_View_Module');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Codigo_compra', $data['search']['value']);
      $this->db->or_like('Fecha_compra', $data['search']['value']);
      $this->db->or_like('Proveedores', $data['search']['value']);
      $this->db->or_like('Subtotal', $data['search']['value']);
      $this->db->or_like('Impuestos', $data['search']['value']);
      $this->db->or_like('Total', $data['search']['value']);
      $this->db->or_like('Adeudo', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->or_like('Sucursal', $data['search']['value']);
      $this->db->group_end();
    }

    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();

    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["ID"];
      $dataTable[] = $row["Codigo_compra"];
      $dataTable[] = $row["Fecha_compra"];
      $dataTable[] = $row["Proveedores"];
      $dataTable[] = $row["Subtotal"];
      $dataTable[] = $row["Impuestos"];
      $dataTable[] = $row["Total"];
      $dataTable[] = $row["Adeudo"];
      $dataTable[] = $row["Status"];
      $dataTable[] = $row["Sucursal"];
      $dataResult[] = $dataTable;
    }

    $output = array(
     "draw"    => $data["draw"],
     "recordsTotal"  => $total,
     "recordsFiltered" => $total_filtered,
     "data"    => $dataResult,
     "info"    => $str,
     "result"    => $result
    );

    return json_encode($output);
  }


  /////////////////////////////////
  /////// Usuario Module //////////

  public function fetchUsuario($data)
  {
    $order = '';
    $columns = array('ID', 'Nombre','Apellidos','Calle_numero','Colonia','Municipio','Estado','Pais','CP','Tel1','Tel2','Email','Status');

    
    $this->db->select('*'); 
    $this->db->from('Usuarios');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Nombre', $data['search']['value']);
      $this->db->or_like('Apellidos', $data['search']['value']);
      $this->db->or_like('Calle_numero', $data['search']['value']);
      $this->db->or_like('Colonia', $data['search']['value']);
      $this->db->or_like('Municipio', $data['search']['value']);
      $this->db->or_like('Estado', $data['search']['value']);
      $this->db->or_like('Pais', $data['search']['value']);
      $this->db->or_like('CP', $data['search']['value']);
      $this->db->or_like('Tel1', $data['search']['value']);
      $this->db->or_like('Tel2', $data['search']['value']);
      $this->db->or_like('Email', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
       $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
       $order .= 'ID DESC ';
    }

    $this->db->order_by($order);
    if($data["length"] != -1){
      $this->db->limit($data['length'],$data['start']);
    }
    $query = $this->db->get();
    $result = $query->result_array();

    $this->db->save_queries = TRUE;
    $str = $this->db->last_query();

    $this->db->select('*'); 
    $this->db->from('Usuarios');
    $total = $this->db->count_all_results();

     $this->db->select('*'); 
    $this->db->from('Usuarios');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Nombre', $data['search']['value']);
      $this->db->or_like('Apellidos', $data['search']['value']);
      $this->db->or_like('Calle_numero', $data['search']['value']);
      $this->db->or_like('Colonia', $data['search']['value']);
      $this->db->or_like('Municipio', $data['search']['value']);
      $this->db->or_like('Estado', $data['search']['value']);
      $this->db->or_like('Pais', $data['search']['value']);
      $this->db->or_like('CP', $data['search']['value']);
      $this->db->or_like('Tel1', $data['search']['value']);
      $this->db->or_like('Tel2', $data['search']['value']);
      $this->db->or_like('Email', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->group_end();
    }

    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();

    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["ID"];
      $dataTable[] = $row["Nombre"];
      $dataTable[] = $row["Apellidos"];
      $dataTable[] = $row["Calle_numero"];
      $dataTable[] = $row["Colonia"];
      $dataTable[] = $row["Municipio"];
      $dataTable[] = $row["Estado"];
      $dataTable[] = $row["Pais"];
      $dataTable[] = $row["CP"];
      $dataTable[] = $row["Tel1"];
      $dataTable[] = $row["Tel2"];
      $dataTable[] = $row["Email"];
      $dataTable[] = $row["Status"];
      $dataResult[] = $dataTable;
    }

    $output = array(
     "draw"    => $data["draw"],
     "recordsTotal"  => $total,
     "recordsFiltered" => $total_filtered,
     "data"    => $dataResult,
     "info"    => $str,
     "result"    => $result
    );

    return json_encode($output);
  }


  ////////////////////////////////////////////////////////////
  ///////////////// Cuentas x Cobrar Module //////////////////

  public function fetchPagosRealizados($data)
  {
    $order = '';
    $columns = array('PC.idVenta', 'PC.Fecha','PC.Monto','PC.Status', 'PC.ID', 'V.Fecha_venta', 'CL.ID', 'CL.Nombre', 'CL.Apellidos','V.Total');

    //// Get All Result ////
    
    $this->db->select('PC.*, CL.ID AS idDistribuidor, CL.Nombre, CL.Apellidos, V.Fecha_venta,V.Total'); 
    $this->db->from('Pagos_clientes AS PC');
    $this->db->join('Ventas AS V','PC.idVenta = V.ID');
    $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
    $this->db->where('PC.Status !=', 'Pendiente');
    $this->db->where('CL.idSucursal',$data['idBodega']);

    // Filtros Inventario General //
    if ($data['Cliente']){$this->db->where('CL.ID',$data['Cliente']);}
    if ($data['is_date_search'] == "yes"){$this->db->where('V.Fecha_venta BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('PC.idVenta', $data['search']['value']);
      $this->db->or_like('PC.Fecha', $data['search']['value']);
      $this->db->or_like('PC.Monto', $data['search']['value']);
      $this->db->or_like('PC.Status', $data['search']['value']);
      $this->db->or_like('PC.ID', $data['search']['value']);
      $this->db->or_like('V.Fecha_venta', $data['search']['value']);
      $this->db->or_like('CL.ID', $data['search']['value']);
      $this->db->or_like('CL.Nombre', $data['search']['value']);
      $this->db->or_like('CL.Apellidos', $data['search']['value']);
      $this->db->or_like('V.Total', $data['search']['value']);
      $this->db->or_like('PC.Observaciones', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'PC.ID DESC ';
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
    $this->db->select('PC.*, CL.ID AS idDistribuidor, CL.Nombre, CL.Apellidos, V.Fecha_venta,V.Total'); 
    $this->db->from('Pagos_clientes AS PC');
    $this->db->join('Ventas AS V','PC.idVenta = V.ID');
    $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
    $this->db->where('PC.Status !=', 'Pendiente');
    $this->db->where('CL.idSucursal',$data['idBodega']);
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    $this->db->select('PC.*, CL.ID AS idDistribuidor, CL.Nombre, CL.Apellidos, V.Fecha_venta,V.Total'); 
    $this->db->from('Pagos_clientes AS PC');
    $this->db->join('Ventas AS V','PC.idVenta = V.ID');
    $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
    $this->db->where('PC.Status !=', 'Pendiente');
    $this->db->where('CL.idSucursal',$data['idBodega']);

    // Filtros Inventario General //
    if ($data['Cliente']){$this->db->where('CL.ID',$data['Cliente']);}
    if ($data['is_date_search'] == "yes"){$this->db->where('V.Fecha_venta BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('PC.idVenta', $data['search']['value']);
      $this->db->or_like('PC.Fecha', $data['search']['value']);
      $this->db->or_like('PC.Monto', $data['search']['value']);
      $this->db->or_like('PC.Status', $data['search']['value']);
      $this->db->or_like('PC.ID', $data['search']['value']);
      $this->db->or_like('V.Fecha_venta', $data['search']['value']);
      $this->db->or_like('CL.ID', $data['search']['value']);
      $this->db->or_like('CL.Nombre', $data['search']['value']);
      $this->db->or_like('CL.Apellidos', $data['search']['value']);
      $this->db->or_like('V.Total', $data['search']['value']);
      $this->db->or_like('PC.Observaciones', $data['search']['value']);
      $this->db->group_end();
    }
    /// Order By //
    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();
  
    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["idVenta"];
      $dataTable[] = $row["Fecha"];
      $dataTable[] = $row["Monto"];
      $dataTable[] = $row["Status"];
      $dataTable[] = $row["ID"];
      $dataTable[] = $row["Fecha_venta"];
      $dataTable[] = $row["idDistribuidor"];
      $dataTable[] = $row["Nombre"];
      $dataTable[] = $row["Apellidos"];
      $dataTable[] = $row["Total"];
      $dataTable[] = $row["Observaciones"];
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

  /// Pagos Pendientes ///

  public function fetchPagosPendientes($data)
  {
    $order = '';
    $columns = array('idVenta', 'Fecha','Monto','Status', 'ID', 'Fecha_venta', 'Nombre', 'Apellidos','Total');

    //// Get All Result ////
    
    $this->db->select('PC.*, CL.Nombre, CL.Apellidos, V.Fecha_venta,V.Total'); 
    $this->db->from('Pagos_clientes AS PC');
    $this->db->join('Ventas AS V','PC.idVenta = V.ID');
    $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
    $this->db->where('PC.Status ', 'Pendiente');
    $this->db->where('CL.idSucursal',$data['idBodega']);

    // Filtros Inventario General //
    if ($data['Cliente']){$this->db->where('CL.ID',$data['Cliente']);}
    if ($data['is_date_search'] == "yes"){$this->db->where('V.Fecha_venta BETWEEN "'.$data["start_date"]." 00:00:00".'" AND "'.$data["end_date"]." 23:59:59".'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('PC.idVenta', $data['search']['value']);
      $this->db->or_like('PC.Fecha', $data['search']['value']);
      $this->db->or_like('PC.Monto', $data['search']['value']);
      $this->db->or_like('PC.Status', $data['search']['value']);
      $this->db->or_like('PC.ID', $data['search']['value']);
      $this->db->or_like('V.Fecha_venta', $data['search']['value']);
      $this->db->or_like('CL.Nombre', $data['search']['value']);
      $this->db->or_like('CL.Apellidos', $data['search']['value']);
      $this->db->or_like('V.Total', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'PC.ID DESC ';
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
    $this->db->select('PC.*, CL.Nombre, CL.Apellidos, V.Fecha_venta,V.Total'); 
    $this->db->from('Pagos_clientes AS PC');
    $this->db->join('Ventas AS V','PC.idVenta = V.ID');
    $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
    $this->db->where('PC.Status', 'Pendiente');
    $this->db->where('CL.idSucursal',$data['idBodega']);
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    $this->db->select('PC.*, CL.Nombre, CL.Apellidos, V.Fecha_venta,V.Total'); 
    $this->db->from('Pagos_clientes AS PC');
    $this->db->join('Ventas AS V','PC.idVenta = V.ID');
    $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
    $this->db->where('PC.Status', 'Pendiente');
    $this->db->where('CL.idSucursal',$data['idBodega']);

    // Filtros Inventario General //
    if ($data['Cliente']){$this->db->where('CL.ID',$data['Cliente']);}
    // if ($data['is_date_search'] == "yes"){$this->db->where('V.Fecha_venta BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}
    if ($data['is_date_search'] == "yes"){$this->db->where('V.Fecha_venta BETWEEN "'.$data["start_date"]." 00:00:00".'" AND "'.$data["end_date"]." 23:59:59".'"');}

    
    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('PC.idVenta', $data['search']['value']);
      $this->db->or_like('PC.Fecha', $data['search']['value']);
      $this->db->or_like('PC.Monto', $data['search']['value']);
      $this->db->or_like('PC.Status', $data['search']['value']);
      $this->db->or_like('PC.ID', $data['search']['value']);
      $this->db->or_like('V.Fecha_venta', $data['search']['value']);
      $this->db->or_like('CL.Nombre', $data['search']['value']);
      $this->db->or_like('CL.Apellidos', $data['search']['value']);
      $this->db->or_like('V.Total', $data['search']['value']);
      $this->db->group_end();
    }
    /// Order By //
    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();
  
    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["idVenta"];
      $dataTable[] = $row["Fecha"];
      $dataTable[] = $row["Monto"];
      $dataTable[] = $row["Status"];
      $dataTable[] = $row["ID"];
      $dataTable[] = $row["Fecha_venta"];
      $dataTable[] = $row["Nombre"];
      $dataTable[] = $row["Apellidos"];
      $dataTable[] = $row["Total"];
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

  // DataTable Reporte Pagos //
  public function fetchReportePagos($data)
  {
    $order = '';
    $columns = array('idVenta', 'Fecha','Monto', 'idDistribuidores', 'Nombre', 'Apellidos','Referencia');

    //// Get All Result ////
    $this->db->select('*'); 
    $this->db->from('ReportePagosClientesReferenciaView');

    // Filtros Inventario General //
    if ($data['idBodega']){$this->db->where('idSucursal',$data['idBodega']);}
    
    if ($data['start_date']){
      $this->db->group_start();
      $this->db->like('Fecha', $data["start_date"]);
      $this->db->group_end();
    }

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('idVenta', $data['search']['value']);
      $this->db->or_like('Fecha', $data['search']['value']);
      $this->db->or_like('Monto', $data['search']['value']);
      $this->db->or_like('idDistribuidores', $data['search']['value']);
      $this->db->or_like('Nombre', $data['search']['value']);
      $this->db->or_like('Apellidos', $data['search']['value']);
      $this->db->or_like('Referencia', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'idVenta DESC ';
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

    

    /// get Total Value ///
    $this->db->select('*'); 
    $this->db->from('ReportePagosClientesReferenciaView');
    // Filtros Inventario General //
    if ($data['idBodega']){$this->db->where('idSucursal',$data['idBodega']);}
    
    if ($data['start_date']){
      $this->db->group_start();
      $this->db->like('Fecha', $data["start_date"]);
      $this->db->group_end();
    }
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    $this->db->select('*'); 
    $this->db->from('ReportePagosClientesReferenciaView');

    // Filtros Inventario General //
    if ($data['idBodega']){$this->db->where('idSucursal',$data['idBodega']);}
    if ($data['start_date']){
      $this->db->group_start();
      $this->db->like('Fecha', $data["start_date"]);
      $this->db->group_end();
    }

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('idVenta', $data['search']['value']);
      $this->db->or_like('Fecha', $data['search']['value']);
      $this->db->or_like('Monto', $data['search']['value']);
      $this->db->or_like('idDistribuidores', $data['search']['value']);
      $this->db->or_like('Nombre', $data['search']['value']);
      $this->db->or_like('Apellidos', $data['search']['value']);
      $this->db->or_like('Referencia', $data['search']['value']);
      $this->db->group_end();
    }
    /// Order By //
    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();
  
    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["idVenta"];
      $dataTable[] = $row["Fecha"];
      $dataTable[] = $row["Monto"];
      $dataTable[] = $row["idDistribuidores"];
      $dataTable[] = $row["Nombre"];
      $dataTable[] = $row["Apellidos"];
      if($row["Referencia"] == 'Pago Referenciado'){
        $dataTable[] = '<span class="label label-success">'.$row["Referencia"].'</span>';
      }else{
        $dataTable[] = '<span class="label label-warning">'.$row["Referencia"].'</span>';
      }
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
  // public function fetchReportePagos($data)
  // {
  //   $order = '';
  //   $columns = array('idVenta', 'Fecha','Monto', 'idDistribuidores', 'Nombre', 'Apellidos','Referencia');

  //   //// Get All Result ////
  //   $this->db->distinct();
  //   $this->db->select('*'); 
  //   $this->db->from('ReportePagosClientesReferenciaView');

  //   // Filtros Inventario General //
  //   if ($data['idBodega']){$this->db->where('idSucursal',$data['idBodega']);}
    
  //   if ($data['start_date']){
  //     $this->db->group_start();
  //     $this->db->like('Fecha', $data["start_date"]);
  //     $this->db->group_end();
  //   }

  //   if($data["search"]["value"] !== ''){
  //     $this->db->group_start();
  //     $this->db->like('idVenta', $data['search']['value']);
  //     $this->db->or_like('Fecha', $data['search']['value']);
  //     $this->db->or_like('Monto', $data['search']['value']);
  //     $this->db->or_like('idDistribuidores', $data['search']['value']);
  //     $this->db->or_like('Nombre', $data['search']['value']);
  //     $this->db->or_like('Apellidos', $data['search']['value']);
  //     $this->db->or_like('Referencia', $data['search']['value']);
  //     $this->db->group_end();
  //   }

  //   if(isset($data["order"])) {
  //     $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
  //   }
  //   else {
  //     $order .= 'idVenta DESC ';
  //   }

  //   /// Order By //
  //   $this->db->order_by($order);
  //   if($data["length"] != -1){
  //     $this->db->limit($data['length'],$data['start']);
  //   }
  //   $query = $this->db->get();

  //   $this->db->save_queries = TRUE;
  //   $str = $this->db->last_query();
  //   $result = $query->result_array();

    

  //   /// get Total Value ///
  //   $this->db->distinct();
  //   $this->db->select('*'); 
  //   $this->db->from('ReportePagosClientesReferenciaView');

  //   // Filtros Inventario General //
  //   if ($data['idBodega']){$this->db->where('idSucursal',$data['idBodega']);}
  //   if ($data['start_date']){$this->db->where('Fecha = "'.$data["start_date"].'"');}
  //   $total = $this->db->count_all_results();

  //   /// get Num rows Total ///
  //   $this->db->distinct();
  //   $this->db->select('*'); 
  //   $this->db->from('ReportePagosClientesReferenciaView');

  //   // Filtros Inventario General //
  //   if ($data['idBodega']){$this->db->where('idSucursal',$data['idBodega']);}
  //   if ($data['start_date']){$this->db->where('Fecha = "'.$data["start_date"].'"');}

  //   if($data["search"]["value"] !== ''){
  //     $this->db->group_start();
  //     $this->db->like('idVenta', $data['search']['value']);
  //     $this->db->or_like('Fecha', $data['search']['value']);
  //     $this->db->or_like('Monto', $data['search']['value']);
  //     $this->db->or_like('idDistribuidores', $data['search']['value']);
  //     $this->db->or_like('Nombre', $data['search']['value']);
  //     $this->db->or_like('Apellidos', $data['search']['value']);
  //     $this->db->or_like('Referencia', $data['search']['value']);
  //     $this->db->group_end();
  //   }
  //   /// Order By //
  //   $this->db->order_by($order);
  //   $total_filtered = $this->db->count_all_results();
  
  //   $dataResult = Array();
  //   foreach ($result as $key => $row)
  //   {
  //     $dataTable = array();
  //     $dataTable[] = $row["idVenta"];
  //     $dataTable[] = $row["Fecha"];
  //     $dataTable[] = $row["Monto"];
  //     $dataTable[] = $row["idDistribuidores"];
  //     $dataTable[] = $row["Nombre"];
  //     $dataTable[] = $row["Apellidos"];
  //     if($row["Referencia"] == 'Pago Referenciado'){
  //       $dataTable[] = '<span class="label label-success">'.$row["Referencia"].'</span>';
  //     }else{
  //       $dataTable[] = '<span class="label label-warning">'.$row["Referencia"].'</span>';
  //     }
  //     $dataResult[] = $dataTable;
  //   }

  //   $output = array(
  //    "draw"    => intval($data["draw"]),
  //    "recordsTotal"  => $total,
  //    "recordsFiltered" => $total_filtered,
  //    "data"    => $dataResult,
  //    "info"    => $str,
  //    "result"    => $result,
  //    "count"   => count($result)
  //   );

  //   return json_encode($output);
  // }

  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////  Facturación Module //////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////


  /// Facturacion Ventas  ///
  public function fetchVentas($data)
  {
    $order = '';
    $columns = array('IDVenta', 'Fecha_venta', 'Distribuidor', 'Empresa', 'Subtotal', 'Impuestos', 'Total','Status_Venta','Pais', 'CP','RFC','idCliente', 'Ventas_Directas');

    //// Get All Result ////
    
    $this->db->select('*'); 
    $this->db->from('Ventas_Factura');

    // Filtros Facturacion Ventas Fechas //
    if ($data['is_date_search'] == "yes"){$this->db->where('Fecha_venta BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('IDVenta', $data['search']['value']);
      $this->db->or_like('Fecha_venta', $data['search']['value']);
      $this->db->or_like('Distribuidor', $data['search']['value']);
      $this->db->or_like('Empresa', $data['search']['value']);
      $this->db->or_like('Subtotal', $data['search']['value']);
      $this->db->or_like('Impuestos', $data['search']['value']);
      $this->db->or_like('Total', $data['search']['value']);
      $this->db->or_like('Status_Venta', $data['search']['value']);
      $this->db->or_like('Pais', $data['search']['value']);
      $this->db->or_like('CP', $data['search']['value']);
      $this->db->or_like('RFC', $data['search']['value']);
      $this->db->or_like('idCliente', $data['search']['value']);
      $this->db->or_like('Ventas_Directas', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'IDVenta DESC ';
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
    $this->db->from('Ventas_Factura');
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    $this->db->select('*'); 
    $this->db->from('Ventas_Factura');

    // Filtros Inventario General //
    if ($data['is_date_search'] == "yes"){$this->db->where('Fecha_venta BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('IDVenta', $data['search']['value']);
      $this->db->or_like('Fecha_venta', $data['search']['value']);
      $this->db->or_like('Distribuidor', $data['search']['value']);
      $this->db->or_like('Empresa', $data['search']['value']);
      $this->db->or_like('Subtotal', $data['search']['value']);
      $this->db->or_like('Impuestos', $data['search']['value']);
      $this->db->or_like('Total', $data['search']['value']);
      $this->db->or_like('Status_Venta', $data['search']['value']);
      $this->db->or_like('Pais', $data['search']['value']);
      $this->db->or_like('CP', $data['search']['value']);
      $this->db->or_like('RFC', $data['search']['value']);
      $this->db->or_like('idCliente', $data['search']['value']);
      $this->db->or_like('Ventas_Directas', $data['search']['value']);
      $this->db->group_end();
    }
    /// Order By //
    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();
  
    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["IDVenta"];
      $dataTable[] = $row["Fecha_venta"];
      $dataTable[] = $row["Distribuidor"];
      $dataTable[] = $row["Empresa"];
      $dataTable[] = $row["Subtotal"];
      $dataTable[] = $row["Impuestos"];
      $dataTable[] = $row["Total"];
      $dataTable[] = $row["Status_Venta"];
      $dataTable[] = $row["Pais"];
      $dataTable[] = $row["CP"];
      $dataTable[] = $row["RFC"];
      $dataTable[] = $row["idCliente"];
      $dataTable[] = (intval($row["Ventas_Directas"]) == 0)? '<span class="label label-primary">Normal</span>': '<span class="label label-danger">Venta Directa</span>';
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

  /// Facturas Canceladas ///
  public function fetchFacturasCanceladas($data)
  {
    $order = '';
    $columns = array('VentaFactura', 'FechaInvoice', 'Distribuidor', 'ID', 'Folio', 'SubtotalInvoice', 'ImpuestoInvoice','TotalInvoice', 'StatusInvoice', 'UUID', 'IDIntegrador');

    //// Get All Result ////
    
    $this->db->select('*'); 
    $this->db->from('Factura_Cancelada');

    // Filtros Facturacion Ventas Fechas //
    if ($data['is_date_search'] == "yes"){$this->db->where('FechaInvoice BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('VentaFactura', $data['search']['value']);
      $this->db->or_like('FechaInvoice', $data['search']['value']);
      $this->db->or_like('Distribuidor', $data['search']['value']);
      $this->db->or_like('ID', $data['search']['value']);
      $this->db->or_like('Folio', $data['search']['value']);
      $this->db->or_like('SubtotalInvoice', $data['search']['value']);
      $this->db->or_like('ImpuestoInvoice', $data['search']['value']);
      $this->db->or_like('TotalInvoice', $data['search']['value']);
      $this->db->or_like('StatusInvoice', $data['search']['value']);
      $this->db->or_like('UUID', $data['search']['value']);
      $this->db->or_like('IDIntegrador', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'VentaFactura DESC ';
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
    $this->db->from('Factura_Cancelada');
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    $this->db->select('*'); 
    $this->db->from('Factura_Cancelada');

    // Filtros Inventario General //
    if ($data['is_date_search'] == "yes"){$this->db->where('FechaInvoice BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('VentaFactura', $data['search']['value']);
      $this->db->or_like('FechaInvoice', $data['search']['value']);
      $this->db->or_like('Distribuidor', $data['search']['value']);
      $this->db->or_like('ID', $data['search']['value']);
      $this->db->or_like('Folio', $data['search']['value']);
      $this->db->or_like('SubtotalInvoice', $data['search']['value']);
      $this->db->or_like('ImpuestoInvoice', $data['search']['value']);
      $this->db->or_like('TotalInvoice', $data['search']['value']);
      $this->db->or_like('StatusInvoice', $data['search']['value']);
      $this->db->or_like('UUID', $data['search']['value']);
      $this->db->or_like('IDIntegrador', $data['search']['value']);
      $this->db->group_end();
    }
    /// Order By //
    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();
  
    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["VentaFactura"];
      $dataTable[] = $row["FechaInvoice"];
      $dataTable[] = $row["Distribuidor"];
      $dataTable[] = $row["ID"];
      $dataTable[] = $row["Folio"];
      $dataTable[] = $row["SubtotalInvoice"];
      $dataTable[] = $row["ImpuestoInvoice"];
      $dataTable[] = $row["TotalInvoice"];
      $dataTable[] = $row["StatusInvoice"];
      $dataTable[] = $row["UUID"];
      $dataTable[] = $row["IDIntegrador"];
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

  /// Facturas Realizadas //
  public function fetchFacturas($data)
  {
    $order = '';
    $columns = array('IDVenta', 'Fecha_Timbrado', 'Distribuidor', 'RFC', 'ID', 'Folio', 'SubtotalInvoice', 'ImpuestoInvoice','TotalInvoice', 'Status', 'UUID', 'IDIntegrador','Tipo_Factura');

    //// Get All Result ////
    
    $this->db->select('*'); 
    $this->db->from('Facturas_Facturadas');

    // Filtros Facturacion Ventas Fechas //
    if ($data['is_date_search'] == "yes"){$this->db->where('Fecha_Timbrado BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('IDVenta', $data['search']['value']);
      $this->db->or_like('Fecha_Timbrado', $data['search']['value']);
      $this->db->or_like('Distribuidor', $data['search']['value']);
      $this->db->or_like('RFC', $data['search']['value']);
      $this->db->or_like('ID', $data['search']['value']);
      $this->db->or_like('Folio', $data['search']['value']);
      $this->db->or_like('SubtotalInvoice', $data['search']['value']);
      $this->db->or_like('ImpuestoInvoice', $data['search']['value']);
      $this->db->or_like('TotalInvoice', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->or_like('UUID', $data['search']['value']);
      $this->db->or_like('IDIntegrador', $data['search']['value']);
      $this->db->or_like('Tipo_Factura', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'IDVenta DESC ';
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
    $this->db->from('Facturas_Facturadas');
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    $this->db->select('*'); 
    $this->db->from('Facturas_Facturadas');

    // Filtros Inventario General //
    if ($data['is_date_search'] == "yes"){$this->db->where('Fecha_Timbrado BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('IDVenta', $data['search']['value']);
      $this->db->or_like('Fecha_Timbrado', $data['search']['value']);
      $this->db->or_like('Distribuidor', $data['search']['value']);
      $this->db->or_like('RFC', $data['search']['value']);
      $this->db->or_like('ID', $data['search']['value']);
      $this->db->or_like('Folio', $data['search']['value']);
      $this->db->or_like('SubtotalInvoice', $data['search']['value']);
      $this->db->or_like('ImpuestoInvoice', $data['search']['value']);
      $this->db->or_like('TotalInvoice', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->or_like('UUID', $data['search']['value']);
      $this->db->or_like('IDIntegrador', $data['search']['value']);
      $this->db->or_like('Tipo_Factura', $data['search']['value']);
      $this->db->group_end();
    }
    /// Order By //
    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();
  
    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["IDVenta"];
      $dataTable[] = $row["Fecha_Timbrado"];
      $dataTable[] = $row["Distribuidor"];
      if ($row["Tipo_Factura"] == 1) {
        $dataTable[] = 'XAXX010101000';
      }else{
        $dataTable[] = $row["RFC"];
      }
      $dataTable[] = $row["ID"];
      $dataTable[] = $row["Folio"];
      $dataTable[] = $row["SubtotalInvoice"];
      $dataTable[] = $row["ImpuestoInvoice"];
      $dataTable[] = $row["TotalInvoice"];
      $dataTable[] = $row["Status"];
      $dataTable[] = $row["UUID"];
      $dataTable[] = $row["IDIntegrador"];
      $dataTable[] = $row["Tipo_Factura"];
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

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  //////////////////// Module Extracción //////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  
  public function fetchHistorial($data)
  {
    $order = '';
    $columns = array('V.ID', 'V.Fecha_venta', 'CL.Nombre', 'CL.Apellidos', 'V.Pedidos', 'V.Total');

    //// Get All Result ////
    
    $this->db->select('V.ID, V.Fecha_venta, CL.Nombre, CL.Apellidos, V.Pedidos, V.Total'); 
    $this->db->from('Ventas AS V');
    $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
    $this->db->where('V.Extraido', 1);
    $this->db->where('CL.idSucursal', $data['Bodega']);

    // Filtros Facturacion Ventas Fechas //
    if ($data['Distri']){$this->db->where('CL.ID',$data['Distri']);}
    if ($data['date'] == "yes"){$this->db->where('V.Fecha_venta BETWEEN "'.$data["DateSt"].'" AND "'.$data["DateEn"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('V.ID', $data['search']['value']);
      $this->db->or_like('V.Fecha_venta', $data['search']['value']);
      $this->db->or_like('CL.Nombre', $data['search']['value']);
      $this->db->or_like('CL.Apellidos', $data['search']['value']);
      $this->db->or_like('V.Pedidos', $data['search']['value']);
      $this->db->or_like('V.Total', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'V.ID ASC ';
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
    $this->db->select('V.ID, V.Fecha_venta, CL.Nombre, CL.Apellidos, V.Pedidos, V.Total'); 
    $this->db->from('Ventas AS V');
    $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
    $this->db->where('V.Extraido', 1);
    $this->db->where('CL.idSucursal', $data['Bodega']);
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    $this->db->select('V.ID, V.Fecha_venta, CL.Nombre, CL.Apellidos, V.Pedidos, V.Total'); 
    $this->db->from('Ventas AS V');
    $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
    $this->db->where('V.Extraido', 1);
    $this->db->where('CL.idSucursal', $data['Bodega']);

    // Filtros Inventario General //
    if ($data['Distri']){$this->db->where('CL.ID',$data['Distri']);}
    if ($data['date'] == "yes"){$this->db->where('V.Fecha_venta BETWEEN "'.$data["DateSt"].'" AND "'.$data["DateEn"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('V.ID', $data['search']['value']);
      $this->db->or_like('V.Fecha_venta', $data['search']['value']);
      $this->db->or_like('CL.Nombre', $data['search']['value']);
      $this->db->or_like('CL.Apellidos', $data['search']['value']);
      $this->db->or_like('V.Pedidos', $data['search']['value']);
      $this->db->or_like('V.Total', $data['search']['value']);
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
      $dataTable[] = $row["Fecha_venta"];
      $dataTable[] = $row["Nombre"];
      $dataTable[] = $row["Apellidos"];
      $dataTable[] = $row["Pedidos"];
      $dataTable[] = $row["Total"];
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

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  ////////////////// Module Promociones ///////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  public function fetchPromociones($data)
  {
    $order = '';
    $columns = array('ID', 'Promocion','Vigencia_inicial', 'Vigencia_final','Status');

    //// Get All Result ////
    
    $this->db->select('*'); 
    $this->db->from('Promociones');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Promocion', $data['search']['value']);
      $this->db->or_like('Vigencia_inicial', $data['search']['value']);
      $this->db->or_like('Vigencia_final', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'ID ASC ';
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
    $this->db->from('Promociones');
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    $this->db->select('*'); 
    $this->db->from('Promociones');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Promocion', $data['search']['value']);
      $this->db->or_like('Vigencia_inicial', $data['search']['value']);
      $this->db->or_like('Vigencia_final', $data['search']['value']);
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
      $dataTable[] = $row["Promocion"];
      $dataTable[] = $row["Vigencia_inicial"];
      $dataTable[] = $row["Vigencia_final"];
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

  /// Fetch Ofertas //
  public function fetchOfertas($data)
  {
    $order = '';
    $columns = array('ID', 'Nombre','Desc', 'Vigencia_inicial','Vigencia_final','Compra_req','Status');

    //// Get All Result ////
    
    $this->db->select('*'); 
    $this->db->from('Ofertas');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Nombre', $data['search']['value']);
      $this->db->or_like('Desc', $data['search']['value']);
      $this->db->or_like('Vigencia_inicial', $data['search']['value']);
      $this->db->or_like('Vigencia_final', $data['search']['value']);
      $this->db->or_like('Compra_req', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'ID ASC ';
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
    $this->db->from('Ofertas');
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    $this->db->select('*'); 
    $this->db->from('Ofertas');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Nombre', $data['search']['value']);
      $this->db->or_like('Desc', $data['search']['value']);
      $this->db->or_like('Vigencia_inicial', $data['search']['value']);
      $this->db->or_like('Vigencia_final', $data['search']['value']);
      $this->db->or_like('Compra_req', $data['search']['value']);
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
      $dataTable[] = $row["Nombre"];
      $dataTable[] = $row["Desc"];
      $dataTable[] = $row["Vigencia_inicial"];
      $dataTable[] = $row["Vigencia_final"];
      $dataTable[] = $row["Compra_req"];
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

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  ////////////////// Module Distribuidor //////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  // FetchDistribuidores //
  public function fetchDistribuidores($data)
  {
    $order = '';
    $columns = array('ID', 'Nombre','Apellidos', 'Empresa','Alias', 'Coordinador', 'Director', 'Cargo','Calle_numero','Colonia','Ciudad','Municipio','Estado','Pais','CP','RFC','Tel1','Tel2','Email','Status','Descuento_%','Dia_entrega','Region','Sucursal','Cuota','Fecha_ingreso','Clientes_x_dia','Bloque');

    //// Get All Result ////
    
    $this->db->select('*'); 
    $this->db->from('Distribuidor_View_Module');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Nombre', $data['search']['value']);
      $this->db->or_like('Apellidos', $data['search']['value']);
      $this->db->or_like('Empresa', $data['search']['value']);
      $this->db->or_like('Alias', $data['search']['value']);
      $this->db->or_like('Coordinador', $data['search']['value']);
      $this->db->or_like('Director', $data['search']['value']);
      $this->db->or_like('Cargo', $data['search']['value']);
      $this->db->or_like('Calle_numero', $data['search']['value']);
      $this->db->or_like('Colonia', $data['search']['value']);
      $this->db->or_like('Ciudad', $data['search']['value']);
      $this->db->or_like('Municipio', $data['search']['value']);
      $this->db->or_like('Estado', $data['search']['value']);
      $this->db->or_like('Pais', $data['search']['value']);
      $this->db->or_like('CP', $data['search']['value']);
      $this->db->or_like('RFC', $data['search']['value']);
      $this->db->or_like('Tel1', $data['search']['value']);
      $this->db->or_like('Tel2', $data['search']['value']);
      $this->db->or_like('Email', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->or_like('`Descuento_%`', $data['search']['value']);
      $this->db->or_like('Dia_entrega', $data['search']['value']);
      $this->db->or_like('Region', $data['search']['value']);
      $this->db->or_like('Sucursal', $data['search']['value']);
      $this->db->or_like('Cuota', $data['search']['value']);
      $this->db->or_like('Fecha_ingreso', $data['search']['value']);
      $this->db->or_like('Clientes_x_dia', $data['search']['value']);
      $this->db->or_like('Bloque', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'ID ASC ';
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
    $this->db->from('Distribuidor_View_Module');
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    $this->db->select('*'); 
    $this->db->from('Distribuidor_View_Module');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Nombre', $data['search']['value']);
      $this->db->or_like('Apellidos', $data['search']['value']);
      $this->db->or_like('Empresa', $data['search']['value']);
      $this->db->or_like('Alias', $data['search']['value']);
      $this->db->or_like('Coordinador', $data['search']['value']);
      $this->db->or_like('Director', $data['search']['value']);
      $this->db->or_like('Cargo', $data['search']['value']);
      $this->db->or_like('Calle_numero', $data['search']['value']);
      $this->db->or_like('Colonia', $data['search']['value']);
      $this->db->or_like('Ciudad', $data['search']['value']);
      $this->db->or_like('Municipio', $data['search']['value']);
      $this->db->or_like('Estado', $data['search']['value']);
      $this->db->or_like('Pais', $data['search']['value']);
      $this->db->or_like('CP', $data['search']['value']);
      $this->db->or_like('RFC', $data['search']['value']);
      $this->db->or_like('Tel1', $data['search']['value']);
      $this->db->or_like('Tel2', $data['search']['value']);
      $this->db->or_like('Email', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->or_like('`Descuento_%`', $data['search']['value']);
      $this->db->or_like('Dia_entrega', $data['search']['value']);
      $this->db->or_like('Region', $data['search']['value']);
      $this->db->or_like('Sucursal', $data['search']['value']);
      $this->db->or_like('Cuota', $data['search']['value']);
      $this->db->or_like('Fecha_ingreso', $data['search']['value']);
      $this->db->or_like('Clientes_x_dia', $data['search']['value']);
      $this->db->or_like('Bloque', $data['search']['value']);
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
      $dataTable[] = $row["Nombre"];
      $dataTable[] = $row["Apellidos"];
      $dataTable[] = $row["Empresa"];
      $dataTable[] = $row["Alias"];
      $dataTable[] = $row["Coordinador"];
      $dataTable[] = $row["Director"];
      $dataTable[] = $row["Cargo"];
      $dataTable[] = $row["Calle_numero"];
      $dataTable[] = $row["Colonia"];
      $dataTable[] = $row["Ciudad"];
      $dataTable[] = $row["Municipio"];
      $dataTable[] = $row["Estado"];
      $dataTable[] = $row["Pais"];
      $dataTable[] = $row["CP"];
      $dataTable[] = $row["RFC"];
      $dataTable[] = $row["Tel1"];
      $dataTable[] = $row["Tel2"];
      $dataTable[] = $row["Email"];
      $dataTable[] = $row["Status"];
      $dataTable[] = $row["`Descuento_%`"];
      $dataTable[] = $row["Dia_entrega"];
      $dataTable[] = $row["Region"];
      $dataTable[] = $row["Sucursal"];
      $dataTable[] = $row["Cuota"];
      $dataTable[] = $row["Fecha_ingreso"];
      $dataTable[] = $row["Clientes_x_dia"];
      $dataTable[] = $row["Bloque"];
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

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  ////////////////// Module Reporte Guia //////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  // Datatable Reporte Guia //
  public function fetchReporteGuia($data)
  {
    $order = '';
    $columns = array('Numero_de_Guia', 'Destinatario','Razon_Social_Destinatario', 'Destino','Peso','Descripcion_de_Contenido','Garantia','Fecha_envio');

    //// Get All Result ////
    
    $this->db->select('*'); 
    $this->db->from('Reporte_Guias_View');

    // Filtros Inventario General //
    if ($data['datetime'] == "yes"){$this->db->where('Fecha_envio BETWEEN "'.$data["desde"].'" AND "'.$data["hasta"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('Numero_de_Guia', $data['search']['value']);
      $this->db->or_like('Destinatario', $data['search']['value']);
      $this->db->or_like('Razon_Social_Destinatario', $data['search']['value']);
      $this->db->or_like('Destino', $data['search']['value']);
      $this->db->or_like('Peso', $data['search']['value']);
      $this->db->or_like('Descripcion_de_Contenido', $data['search']['value']);
      $this->db->or_like('Garantia', $data['search']['value']);
      $this->db->or_like('Fecha_envio', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
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
    $this->db->from('Reporte_Guias_View');

    // Filtros Inventario General //
    if ($data['datetime'] == "yes"){$this->db->where('Fecha_envio BETWEEN "'.$data["desde"].'" AND "'.$data["hasta"].'"');}
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    
    $this->db->select('*'); 
    $this->db->from('Reporte_Guias_View');
    // Filtros Inventario General //
    if ($data['datetime'] == "yes"){$this->db->where('Fecha_envio BETWEEN "'.$data["desde"].'" AND "'.$data["hasta"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('Numero_de_Guia', $data['search']['value']);
      $this->db->or_like('Destinatario', $data['search']['value']);
      $this->db->or_like('Razon_Social_Destinatario', $data['search']['value']);
      $this->db->or_like('Destino', $data['search']['value']);
      $this->db->or_like('Peso', $data['search']['value']);
      $this->db->or_like('Descripcion_de_Contenido', $data['search']['value']);
      $this->db->or_like('Garantia', $data['search']['value']);
      $this->db->or_like('Fecha_envio', $data['search']['value']);
      $this->db->group_end();
    }
    
    /// Order By //
    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();
  
    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["Numero_de_Guia"];
      $dataTable[] = $row["Destinatario"];
      $dataTable[] = $row["Razon_Social_Destinatario"];
      $dataTable[] = $row["Destino"];
      $dataTable[] = $row["Peso"];
      $dataTable[] = $row["Descripcion_de_Contenido"];
      $dataTable[] = $row["Garantia"];
      $dataTable[] = $row["Fecha_envio"];
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

  // Cargar DataTable Productos Ventas //
  public function fetchProductosVenta($data)
  {
    $order = '';
    $columns = array('idCatalogo', 'Producto','Division', 'Linea', 'Sublinea','Precio_publico');

    //// Get All Result ////
    
    $this->db->select('*'); 
    $this->db->from('Productos_App_Distribuidores');
    $this->db->where('idDivision IN (select idDivision from Asignacion_clientes_division where idCliente ='.$data['idCliente'].')');

    // Filtros Inventario General //
    if ($data['idSucursal']){$this->db->where('idSucursal',$data['idSucursal']);}
    if ($data['division']){$this->db->where('idDivision',$data['division']);}
    if ($data['linea']){$this->db->where('idLinea',$data['linea']);}
    if ($data['sublinea']){$this->db->where('idSublinea',$data['sublinea']);}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('idCatalogo', $data['search']['value']);
      $this->db->or_like('Producto', $data['search']['value']);
      $this->db->or_like('Division', $data['search']['value']);
      $this->db->or_like('Linea', $data['search']['value']);
      $this->db->or_like('Sublinea', $data['search']['value']);
      $this->db->or_like('Precio_publico', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
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
    $this->db->from('Productos_App_Distribuidores');
    $this->db->where('idDivision IN (select idDivision from Asignacion_clientes_division where idCliente ='.$data['idCliente'].')');

    // Filtros Inventario General //
    if ($data['idSucursal']){$this->db->where('idSucursal',$data['idSucursal']);}
    if ($data['division']){$this->db->where('idDivision',$data['division']);}
    if ($data['linea']){$this->db->where('idLinea',$data['linea']);}
    if ($data['sublinea']){$this->db->where('idSublinea',$data['sublinea']);}
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    
    $this->db->select('*'); 
    $this->db->from('Productos_App_Distribuidores');
    $this->db->where('idDivision IN (select idDivision from Asignacion_clientes_division where idCliente ='.$data['idCliente'].')');

    // Filtros Inventario General //
    if ($data['idSucursal']){$this->db->where('idSucursal',$data['idSucursal']);}
    if ($data['division']){$this->db->where('idDivision',$data['division']);}
    if ($data['linea']){$this->db->where('idLinea',$data['linea']);}
    if ($data['sublinea']){$this->db->where('idSublinea',$data['sublinea']);}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('idCatalogo', $data['search']['value']);
      $this->db->or_like('Producto', $data['search']['value']);
      $this->db->or_like('Division', $data['search']['value']);
      $this->db->or_like('Linea', $data['search']['value']);
      $this->db->or_like('Sublinea', $data['search']['value']);
      $this->db->or_like('Precio_publico', $data['search']['value']);
      $this->db->group_end();
    }
    
    /// Order By //
    $this->db->order_by($order);
    $total_filtered = $this->db->count_all_results();
  
    $dataResult = Array();
    foreach ($result as $key => $row)
    {
      $dataTable = array();
      $dataTable[] = $row["idCatalogo"];
      $dataTable[] = $row["Producto"];
      $dataTable[] = $row["Division"]."<span hidden='hidden'>".$row["idDivision"]."</span>";
      $dataTable[] = $row["Linea"]."<span hidden='hidden'>".$row["idLinea"]."</span>";
      $dataTable[] = $row["Sublinea"]."<span hidden='hidden'>".$row["idSublinea"]."</span>";
      $dataTable[] = $row["Precio_publico"];
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

  // Cargar DataTable Promociones Venta //
  public function fetchProductosPromo($data)
  {
    $order = '';
    $columns = array('idPromocion', 'Promocion','Division','Linea','Sublinea','precio');

    //// Get All Result ////
    
    $this->db->select('*'); 
    $this->db->from('promociones_web_view');
    $this->db->where('(Excluir_Distribuidores = 0 OR idDistribuidor = '.$_POST["idCliente"].')');

    // Filtros Inventario General //
    if ($data['idSucursal']){$this->db->where('idSucursal',$data['idSucursal']);}
    if ($data['division']){$this->db->where('idDivision',$data['division']);}
    if ($data['linea']){$this->db->where('idLinea',$data['linea']);}
    if ($data['sublinea']){$this->db->where('idSublinea',$data['sublinea']);}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Promocion', $data['search']['value']);
      $this->db->or_like('Division', $data['search']['value']);
      $this->db->or_like('Linea', $data['search']['value']);
      $this->db->or_like('Sublinea', $data['search']['value']);
      $this->db->or_like('precio', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
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
    $this->db->from('promociones_web_view');
    $this->db->where('(Excluir_Distribuidores = 0 OR idDistribuidor = '.$_POST["idCliente"].')');

    // Filtros Inventario General //
    if ($data['idSucursal']){$this->db->where('idSucursal',$data['idSucursal']);}
    if ($data['division']){$this->db->where('idDivision',$data['division']);}
    if ($data['linea']){$this->db->where('idLinea',$data['linea']);}
    if ($data['sublinea']){$this->db->where('idSublinea',$data['sublinea']);}
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    
    $this->db->select('*'); 
    $this->db->from('promociones_web_view');
    $this->db->where('(Excluir_Distribuidores = 0 OR idDistribuidor = '.$_POST["idCliente"].')');

    // Filtros Inventario General //
    if ($data['idSucursal']){$this->db->where('idSucursal',$data['idSucursal']);}
    if ($data['division']){$this->db->where('idDivision',$data['division']);}
    if ($data['linea']){$this->db->where('idLinea',$data['linea']);}
    if ($data['sublinea']){$this->db->where('idSublinea',$data['sublinea']);}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Promocion', $data['search']['value']);
      $this->db->or_like('Division', $data['search']['value']);
      $this->db->or_like('Linea', $data['search']['value']);
      $this->db->or_like('Sublinea', $data['search']['value']);
      $this->db->or_like('precio', $data['search']['value']);
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
      $dataTable[] = $row["Promocion"];
      $dataTable[] = $row["Division"]. "<span hidden='hidden'>".$row["idDivision"]."</span>";
      $dataTable[] = $row["Linea"]. "<span hidden='hidden'>".$row["idLinea"]."</span>";
      $dataTable[] = $row["Sublinea"]. "<span hidden='hidden'>".$row["idSublinea"]."</span>";
      $dataTable[] = $row["precio"];
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

  //////////////////////////////////////////
  ///// Cargar DataTable Recolecciones /////
  //////////////////////////////////////////

  // Cargar DataTable Recolecciones //
  public function fetchRecoleccion($data)
  {
    $order = '';
    $columns = array('ID', 'Usuario','Fecha','Nombre_recolector','Cantidad_paquetes','Status');

    //// Get All Result ////
    
    $this->db->select('*'); 
    $this->db->from('Recoleccion_pedidos_view');

    // Filtros Inventario General //
    if ($data['is_date_search'] == "yes"){$this->db->where('Fecha_hora BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Usuario', $data['search']['value']);
      $this->db->or_like('Fecha_hora', $data['search']['value']);
      $this->db->or_like('Nombre_recolector', $data['search']['value']);
      $this->db->or_like('Cantidad_paquetes', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
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
    $this->db->from('Recoleccion_pedidos_view');

    // Filtros Inventario General //
    if ($data['is_date_search'] == "yes"){$this->db->where('Fecha_hora BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    
    $this->db->select('*'); 
    $this->db->from('Recoleccion_pedidos_view');

    // Filtros Inventario General //
    if ($data['is_date_search'] == "yes"){$this->db->where('Fecha_hora BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Usuario', $data['search']['value']);
      $this->db->or_like('Fecha_hora', $data['search']['value']);
      $this->db->or_like('Nombre_recolector', $data['search']['value']);
      $this->db->or_like('Cantidad_paquetes', $data['search']['value']);
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
      $dataTable[] = $row["Usuario"];
      $dataTable[] = $row["Fecha_hora"];
      $dataTable[] = $row["Nombre_recolector"];
      $dataTable[] = $row["Cantidad_paquetes"];
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

  // Cargar DataTable fetchListGuia //
  public function fetchListGuia($data)
  {
    $order = '';
    $columns = array('ID', 'No_guia','idEmpaque_general');

    //// Get All Result ////
    
    $this->db->select('*'); 
    $this->db->from('Detalle_recoleccion_pedidos');
    $this->db->where('idRecoleccion_pedidos IS NULL');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('No_guia', $data['search']['value']);
      $this->db->or_like('idEmpaque_general', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
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
    $this->db->from('Detalle_recoleccion_pedidos');
    $this->db->where('idRecoleccion_pedidos IS NULL');

    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    
    $this->db->select('*'); 
    $this->db->from('Detalle_recoleccion_pedidos');
    $this->db->where('idRecoleccion_pedidos IS NULL');


    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('No_guia', $data['search']['value']);
      $this->db->or_like('idEmpaque_general', $data['search']['value']);
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
      $dataTable[] = $row["No_guia"];
      $dataTable[] = $row["idEmpaque_general"];
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

    // Cargar DataTable fetchDetalleRecoleccion //
  public function fetchDetalleRecoleccion($data)
  {
    $order = '';
    $columns = array('ID', 'No_guia','idEmpaque_general', 'idVenta', 'Distribuidor', 'Fecha_empaque', 'Fecha_pedido');

    //// Get All Result ////
    
    $this->db->select('*'); 
    $this->db->from('Detalle_recoleccion_view');
    $this->db->where('idRecoleccion_pedidos',$data['idRecoleccion']);

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('No_guia', $data['search']['value']);
      $this->db->or_like('idEmpaque_general', $data['search']['value']);
      $this->db->or_like('idVenta', $data['search']['value']);
      $this->db->or_like('Distribuidor', $data['search']['value']);
      $this->db->or_like('Fecha_empaque', $data['search']['value']);
      $this->db->or_like('Fecha_pedido', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
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
    $this->db->from('Detalle_recoleccion_view');
    $this->db->where('idRecoleccion_pedidos',$data['idRecoleccion']);

    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    
    $this->db->select('*'); 
    $this->db->from('Detalle_recoleccion_view');
    $this->db->where('idRecoleccion_pedidos',$data['idRecoleccion']);


    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('No_guia', $data['search']['value']);
      $this->db->or_like('idEmpaque_general', $data['search']['value']);
      $this->db->or_like('idVenta', $data['search']['value']);
      $this->db->or_like('Distribuidor', $data['search']['value']);
      $this->db->or_like('Fecha_empaque', $data['search']['value']);
      $this->db->or_like('Fecha_pedido', $data['search']['value']);
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
      $dataTable[] = $row["No_guia"];
      $dataTable[] = $row["idEmpaque_general"];
      $dataTable[] = $row["idVenta"];
      $dataTable[] = $row["Distribuidor"];
      $dataTable[] = $row["Fecha_empaque"];
      $dataTable[] = $row["Fecha_pedido"];
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

    // Cargar DataTable fetchRecoleccionPendientes //
  public function fetchRecoleccionPendientes($data)
  {
    $order = '';
    $columns = array('ID', 'No_guia','idVenta','Distribuidor','Fecha_empaque','Fecha_pedido');

    //// Get All Result ////
    
    $this->db->select('R.*'); 
    $this->db->from('Recolecciones_pendientes_view AS R');
    $this->db->join('detalle_recoleccion_pedidos AS D','R.ID = D.idEmpaque_general','left');
    $this->db->where(' D.No_guia IS NULL');
    $this->db->where("R.Fecha_pedido >= '2021-06-07'");
    $this->db->where('R.Guia_Envio_Auto != 0');

    // Filtros Inventario General //
    if ($data['is_date_search'] == "yes"){$this->db->where('R.Fecha_empaque BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('R.ID', $data['search']['value']);
      $this->db->or_like('R.No_guia', $data['search']['value']);
      $this->db->or_like('R.idVenta', $data['search']['value']);
      $this->db->or_like('R.Distribuidor', $data['search']['value']);
      $this->db->or_like('R.Fecha_empaque', $data['search']['value']);
      $this->db->or_like('R.Fecha_pedido', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
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
    
    $this->db->select('R.*'); 
    $this->db->from('Recolecciones_pendientes_view AS R');
    $this->db->join('detalle_recoleccion_pedidos AS D','R.ID = D.idEmpaque_general','left');
    $this->db->where('D.No_guia IS NULL');
    $this->db->where("R.Fecha_pedido >= '2021-06-07'");
    $this->db->where('R.Guia_Envio_Auto != 0');

    // Filtros Inventario General //
    if ($data['is_date_search'] == "yes"){$this->db->where('R.Fecha_empaque BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    
    $this->db->select('R.*'); 
    $this->db->from('Recolecciones_pendientes_view AS R');
    $this->db->join('detalle_recoleccion_pedidos AS D','R.ID = D.idEmpaque_general','left');
    $this->db->where(' D.No_guia IS NULL');
    $this->db->where("R.Fecha_pedido >= '2021-06-07'");
    $this->db->where('R.Guia_Envio_Auto != 0');

    // Filtros Inventario General //
    if ($data['is_date_search'] == "yes"){$this->db->where('R.Fecha_empaque BETWEEN "'.$data["start_date"].'" AND "'.$data["end_date"].'"');}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('R.ID', $data['search']['value']);
      $this->db->or_like('R.No_guia', $data['search']['value']);
      $this->db->or_like('R.idVenta', $data['search']['value']);
      $this->db->or_like('R.Distribuidor', $data['search']['value']);
      $this->db->or_like('R.Fecha_empaque', $data['search']['value']);
      $this->db->or_like('R.Fecha_pedido', $data['search']['value']);
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
      $dataTable[] = $row["No_guia"];
      $dataTable[] = $row["idVenta"];
      $dataTable[] = $row["Distribuidor"];
      $dataTable[] = $row["Fecha_empaque"];
      $dataTable[] = $row["Fecha_pedido"];
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

  // Cargar DataTable fetchVentasDirectas //

  public function fetchVentasDirectas($data)
  {
    $order = '';
    $columns = array('ID', 'Fecha','Cliente','Total','Adeudo','Status','Extraido');

    //// Get All Result ////
    
    $this->db->select('*'); 
    $this->db->from('Ventas_Directas_Anteriores_View');
    $this->db->where('idCliente', $data['idCliente']);

    // Filtros Inventario General //
    if ($data['is_date_search'] == "yes"){$this->db->where("Fecha BETWEEN '".$data["start_date"]."' AND '".$data["end_date"]."'");}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Fecha', $data['search']['value']);
      $this->db->or_like('Cliente', $data['search']['value']);
      $this->db->or_like('Total', $data['search']['value']);
      $this->db->or_like('Adeudo', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->or_like('Extraido', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
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
    $this->db->from('Ventas_Directas_Anteriores_View');
    $this->db->where('idCliente', $data['idCliente']);

    // Filtros Inventario General //
    if ($data['is_date_search'] == "yes"){$this->db->where("Fecha BETWEEN '".$data["start_date"]."' AND '".$data["end_date"]."'");}
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    
    $this->db->select('*'); 
    $this->db->from('Ventas_Directas_Anteriores_View');
    $this->db->where('idCliente', $data['idCliente']);

    // Filtros Inventario General //
    if ($data['is_date_search'] == "yes"){$this->db->where("Fecha BETWEEN '".$data["start_date"]."' AND '".$data["end_date"]."'");}

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Fecha', $data['search']['value']);
      $this->db->or_like('Cliente', $data['search']['value']);
      $this->db->or_like('Total', $data['search']['value']);
      $this->db->or_like('Adeudo', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->or_like('Extraido', $data['search']['value']);
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
      $dataTable[] = $row["Cliente"]."<span hidden='hidden'>".$row["idClienteMenudeo"]."</span>";
      $dataTable[] = $row["Total"];
      $dataTable[] = $row["Adeudo"];
      $dataTable[] = $row["Status"];
      $dataTable[] = $row["Extraido"];
      $dataTable[] = $row["Timbrado"];
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



  // DataTable fetchProveedores//
  public function fetchProveedores($data)
  {
    $order = '';
    $columns = array('ID', 'Nombre','Apellidos', 'Empresa','Cargo','Calle_numero','Colonia','Ciudad','Municipio','Estado','Pais','CP','RFC','Tel1','Tel2','Email','Monedas','Status');

    //// Get All Result ////
    
    $this->db->select('*'); 
    $this->db->from('Proveedores_View_Module');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Nombre', $data['search']['value']);
      $this->db->or_like('Apellidos', $data['search']['value']);
      $this->db->or_like('Empresa', $data['search']['value']);
      $this->db->or_like('Cargo', $data['search']['value']);
      $this->db->or_like('Calle_numero', $data['search']['value']);
      $this->db->or_like('Colonia', $data['search']['value']);
      $this->db->or_like('Ciudad', $data['search']['value']);
      $this->db->or_like('Municipio', $data['search']['value']);
      $this->db->or_like('Estado', $data['search']['value']);
      $this->db->or_like('Pais', $data['search']['value']);
      $this->db->or_like('CP', $data['search']['value']);
      $this->db->or_like('RFC', $data['search']['value']);
      $this->db->or_like('Tel1', $data['search']['value']);
      $this->db->or_like('Tel2', $data['search']['value']);
      $this->db->or_like('Email', $data['search']['value']);
      $this->db->or_like('Monedas', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'ID ASC ';
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
    $this->db->from('Proveedores_View_Module');
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    $this->db->select('*'); 
    $this->db->from('Proveedores_View_Module');

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Nombre', $data['search']['value']);
      $this->db->or_like('Apellidos', $data['search']['value']);
      $this->db->or_like('Empresa', $data['search']['value']);
      $this->db->or_like('Cargo', $data['search']['value']);
      $this->db->or_like('Calle_numero', $data['search']['value']);
      $this->db->or_like('Colonia', $data['search']['value']);
      $this->db->or_like('Ciudad', $data['search']['value']);
      $this->db->or_like('Municipio', $data['search']['value']);
      $this->db->or_like('Estado', $data['search']['value']);
      $this->db->or_like('Pais', $data['search']['value']);
      $this->db->or_like('CP', $data['search']['value']);
      $this->db->or_like('RFC', $data['search']['value']);
      $this->db->or_like('Tel1', $data['search']['value']);
      $this->db->or_like('Tel2', $data['search']['value']);
      $this->db->or_like('Email', $data['search']['value']);
      $this->db->or_like('Monedas', $data['search']['value']);
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
      $dataTable[] = $row["Nombre"];
      $dataTable[] = $row["Apellidos"];
      $dataTable[] = $row["Empresa"];
      $dataTable[] = $row["Cargo"];
      $dataTable[] = $row["Calle_numero"];
      $dataTable[] = $row["Colonia"];
      $dataTable[] = $row["Ciudad"];
      $dataTable[] = $row["Municipio"];
      $dataTable[] = $row["Estado"];
      $dataTable[] = $row["Pais"];
      $dataTable[] = $row["CP"];
      $dataTable[] = $row["RFC"];
      $dataTable[] = $row["Tel1"];
      $dataTable[] = $row["Tel2"];
      $dataTable[] = $row["Email"];
      $dataTable[] = $row["Monedas"]."<span hidden='hidden'>".$row['Moneda']."</span>"."<span hidden='hidden'>".$row['Entrega']."</span>";
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

  public function fetchAnticipos($data)
  {
    $order = '';
    $columns = array('ID', 'Fecha_hora','Usuario', 'Monto','Forma_pago','Observaciones','Status');

    //// Get All Result ////
    
    $this->db->select("*"); 
    $this->db->from('Anticipos_OC_view');
    $this->db->where('idOC', $data['idOC']);

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Fecha_hora', $data['search']['value']);
      $this->db->or_like('Usuario', $data['search']['value']);
      $this->db->or_like('Monto', $data['search']['value']);
      $this->db->or_like('Forma_pago', $data['search']['value']);
      $this->db->or_like('Observaciones', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'ID ASC ';
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
    $this->db->select("*"); 
    $this->db->from('Anticipos_OC_view');
    $this->db->where('idOC', $data['idOC']);
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    $this->db->select("*"); 
    $this->db->from('Anticipos_OC_view');
    $this->db->where('idOC', $data['idOC']);

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Fecha_hora', $data['search']['value']);
      $this->db->or_like('Usuario', $data['search']['value']);
      $this->db->or_like('Monto', $data['search']['value']);
      $this->db->or_like('Forma_pago', $data['search']['value']);
      $this->db->or_like('Observaciones', $data['search']['value']);
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
      $dataTable[] = $row["Fecha_hora"];
      $dataTable[] = $row["Usuario"];
      $dataTable[] = $row["Monto"];
      $dataTable[] = $row["Forma_pago"];
      $dataTable[] = $row["Observaciones"];
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

  // fetchFacturasCompras //
  public function fetchFacturasCompras($data)
  {
    $order = '';
    $columns = array('ID', 'Fecha_Timbrado','Empresa', 'RFC','Subtotal','Total','Status');

    //// Get All Result ////
    
    $this->db->select("*"); 
    $this->db->from('Facturar_compras_view');
    $this->db->where('idCompra', $data['ID']);

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Fecha_Timbrado', $data['search']['value']);
      $this->db->or_like('Empresa', $data['search']['value']);
      $this->db->or_like('RFC', $data['search']['value']);
      $this->db->or_like('Subtotal', $data['search']['value']);
      $this->db->or_like('Total', $data['search']['value']);
      $this->db->or_like('Status', $data['search']['value']);
      $this->db->group_end();
    }

    if(isset($data["order"])) {
      $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
    }
    else {
      $order .= 'ID ASC ';
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
    $this->db->select("*"); 
    $this->db->from('Facturar_compras_view');
    $this->db->where('idCompra', $data['ID']);
    $total = $this->db->count_all_results();

    /// get Num rows Total ///
    $this->db->select("*"); 
    $this->db->from('Facturar_compras_view');
    $this->db->where('idCompra', $data['ID']);

    if($data["search"]["value"] !== ''){
      $this->db->group_start();
      $this->db->like('ID', $data['search']['value']);
      $this->db->or_like('Fecha_Timbrado', $data['search']['value']);
      $this->db->or_like('Empresa', $data['search']['value']);
      $this->db->or_like('RFC', $data['search']['value']);
      $this->db->or_like('Subtotal', $data['search']['value']);
      $this->db->or_like('Total', $data['search']['value']);
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
      $dataTable[] = $row["Fecha_Timbrado"];
      $dataTable[] = $row["Empresa"];
      $dataTable[] = $row["RFC"];
      $dataTable[] = $row["Subtotal"];
      $dataTable[] = $row["Total"];
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

}

?>

