<?php
class VentasWeb_Model extends CI_Model{
	public function __construct(){
        // Inicializa la Clase de la Base de Datos.
        $this->load->database();
        parent::__construct();
    }

    public function getAllVentaWeb(){
      
      $this->db->select('*'); 
      $this->db->from('Ventas_Web_View'); 
      $this->db->where("idDistribuidor",1967);
      $this->db->where("Timbrado",0);
      $this->db->where("Adeudo",0);
      $this->db->where('MONTH(Fecha_venta) = MONTH(NOW())');
      $query = $this->db->get(); 
      return $query->result_array();
    }

    public function DeleteAdeudo($id){
      $this->db->trans_begin();
      $this->db->trans_strict(FALSE);

      $data = array(
        'Status' => 'Pagado',
        'Adeudo' => 0,
        'idOrden' => 'Pagado por Administrador '. $_SESSION['Avyna'][0]['Nombre'],
        'idPago' => 'Pagado por Administrador '. $_SESSION['Avyna'][0]['Nombre']);

      
      $this->db->where('ID',$id);
      $this->db->update('Ventas', $data);

      if ($this->db->trans_status() === FALSE){
        $this->db->trans_rollback();
        return 0;
      }
      else{
        $this->db->trans_commit();
        return 1;
      }
    }

    public function DeleteSales(){
      $this->db->trans_begin();
      $this->db->trans_strict(FALSE);


      $query = $this->db->query("SELECT V.*, (DATEDIFF(NOW(),V.Fecha_venta)) AS INFO, VM.Tipo_app 
      FROM ventas V
      JOIN ventas_menudeo VM on V.ID = VM.idVenta
      WHERE V.idCliente = 1967
      AND V.Adeudo = V.Total
      AND (V.idPago IS NULL OR V.idPago = '')
      AND (V.idOrden IS NULL OR V.idOrden = '')
      AND V.Extraido = 0
      AND V.Timbrado = 0
      AND (V.Status = 'Pendiente' OR V.Status = 'Adeudo')
      OR (VM.Tipo_app = 'Website' 
      AND V.Adeudo = V.Total 
      AND (V.idPago IS NULL OR V.idPago = '') 
      AND (V.idOrden IS NULL OR V.idOrden = '') 
      AND V.Extraido = 0
      AND V.Timbrado = 0
      AND (V.Status = 'Pendiente' OR V.Status = 'Adeudo'))
      GROUP by V.ID
      HAVING DATEDIFF(NOW(),V.Fecha_venta) > 6");

      $sales = $query->result_array();

      foreach ($sales as $key => $value) {
        if (intval($value['INFO']) > 6 ) {
          if (floatval($value['descuento_adicional']) > 0.00) {
            $this->db->select('*'); 
            $this->db->from('cupones_full');
            $this->db->where("idVenta", $value['ID']);
            $queryCupon = $this->db->get()->result_array(); 

            if (!empty($queryCupon)) {
              $this->db->set('idVenta', 'NULL', false);
              $this->db->set('Status', 'Activo');
              $this->db->where('ID', $queryCupon[0]['ID']);
              $this->db->update('cupones_full');
            }
          }         

          $this->db->query('DELETE FROM Pagos_clientes WHERE idVenta ='.$value['ID'].'');
          $this->db->query('DELETE FROM Balance_puntos WHERE idVenta ='.$value['ID'].'');
          $this->db->query('DELETE PP.* FROM Ventas AS V INNER JOIN Ventas_menudeo AS VM ON V.ID = VM.idVenta INNER JOIN Pagos_programados AS PP ON VM.ID = PP.idVenta_menudeo WHERE V.ID ='.$value['ID'].'');
          $this->db->query('DELETE DVM.* FROM Ventas_menudeo AS VM INNER JOIN Detalle_venta_menudeo AS DVM ON VM.ID = DVM.idVenta_menudeo WHERE VM.idVenta ='.$value['ID'].'');
          $this->db->query('DELETE FROM Ventas_menudeo WHERE idVenta ='.$value['ID'].'');
          $this->db->query('DELETE FROM Ventas WHERE ID ='.$value['ID'].'');

          $logs_ventas_desk = array('idVenta' => $value['ID'],
                                      'Fecha_hora' => date("Y-m-d H:i:s"),
                                      'Movimiento' => 'Eliminar',
                                      'idUsuario' => $_SESSION['Avyna'][0]['ID']);

          $this->db->insert('logs_ventas_desk', $logs_ventas_desk);
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

    public function Eliminar_Venta($id){
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

    public function fetchVentasWeb($data){
        $order = '';
        $columns = array('ID', 'Fecha_venta', "idClienteMenudeo", 'Cliente_Menudeo', 'Total', 'Adeudo', 'Status', 'Extraido', 'Paypal_sin_confirmar', 'idPago', 'idOrden', 'idSalon', 'Salon','idDistribuidor','Distribuidor','Timbrado');
    
        
        $this->db->select('*'); 
        $this->db->from('Ventas_Web_View'); 
        $this->db->group_start();
          $this->db->where("idDistribuidor",1967);
          $this->db->or_where("Tipo_app", "Website");
        $this->db->group_end();
        if ($data['checkit'] == 'false'){
          $this->db->where("idPago IS NOT NULL");
          $this->db->where("idOrden IS NOT NULL");
        }

        // Filtros Inventario General //
        if ($data['is_date_search'] == "yes"){$this->db->where("Fecha_venta BETWEEN '".$data["start_date"]."' AND '".$data["end_date"]."'");}
    
        if($data["search"]["value"] !== ''){
          $this->db->group_start();
          $this->db->like('ID', $data['search']['value']);
          $this->db->or_like('Fecha_venta', $data['search']['value']); 
          $this->db->or_like('idClienteMenudeo', $data['search']['value']);
          $this->db->or_like('Cliente_Menudeo', $data['search']['value']);
          $this->db->or_like('Total', $data['search']['value']);
          $this->db->or_like('Adeudo', $data['search']['value']);
          $this->db->or_like('Status', $data['search']['value']);
          $this->db->or_like('Extraido', $data['search']['value']); 
          $this->db->or_like('Paypal_sin_confirmar', $data['search']['value']);
          $this->db->or_like('idPago', $data['search']['value']);
          $this->db->or_like('idOrden', $data['search']['value']);
          $this->db->or_like('idSalon', $data['search']['value']);
          $this->db->or_like('Salon', $data['search']['value']);
          $this->db->or_like('idDistribuidor', $data['search']['value']);
          $this->db->or_like('Distribuidor', $data['search']['value']);
          $this->db->or_like('Timbrado', $data['search']['value']);
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
        $this->db->from('Ventas_Web_View'); 
        $this->db->group_start();
          $this->db->where("idDistribuidor",1967);
          $this->db->or_where("Tipo_app", "Website");
        $this->db->group_end();
        if ($data['checkit'] == 'false'){
          $this->db->where("idPago IS NOT NULL");
          $this->db->where("idOrden IS NOT NULL");
        }
        //$this->db->where("idDistribuidor",100008);
        // Filtros Inventario General //
        if ($data['is_date_search'] == "yes"){$this->db->where("Fecha_venta BETWEEN '".$data["start_date"]."' AND '".$data["end_date"]."'");}
        $total = $this->db->count_all_results();
    
        $this->db->select('*'); 
        $this->db->from('Ventas_Web_View'); 
        $this->db->group_start();
          $this->db->where("idDistribuidor",1967);
          $this->db->or_where("Tipo_app", "Website");
        $this->db->group_end();
        if ($data['checkit'] == 'false'){
          $this->db->where("idPago IS NOT NULL");
          $this->db->where("idOrden IS NOT NULL");
        }
        //$this->db->where("idDistribuidor",100008);
        // Filtros Inventario General //
        if ($data['is_date_search'] == "yes"){$this->db->where("Fecha_venta BETWEEN '".$data["start_date"]."' AND '".$data["end_date"]."'");}
    
        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('ID', $data['search']['value']);
            $this->db->or_like('Fecha_venta', $data['search']['value']);
            $this->db->or_like('idClienteMenudeo', $data['search']['value']);
            $this->db->or_like('Cliente_Menudeo', $data['search']['value']);
            $this->db->or_like('Total', $data['search']['value']);
            $this->db->or_like('Adeudo', $data['search']['value']);
            $this->db->or_like('Status', $data['search']['value']);
            $this->db->or_like('Extraido', $data['search']['value']);
            $this->db->or_like('Paypal_sin_confirmar', $data['search']['value']);
            $this->db->or_like('idPago', $data['search']['value']);
            $this->db->or_like('idOrden', $data['search']['value']);
            $this->db->or_like('idSalon', $data['search']['value']);
            $this->db->or_like('Salon', $data['search']['value']);
            $this->db->or_like('idDistribuidor', $data['search']['value']);
            $this->db->or_like('Distribuidor', $data['search']['value']);
            $this->db->or_like('Timbrado', $data['search']['value']);
            $this->db->group_end();
          }
    
        $this->db->order_by($order);
        $total_filtered = $this->db->count_all_results();
    
        $dataResult = Array();
        foreach ($result as $key => $row)
        {
          $dataTable = array();
          $dataTable[] = $row["ID"];
          $dataTable[] = $row["Fecha_venta"];
          $dataTable[] = $row["idClienteMenudeo"];
          $dataTable[] = $row["Cliente_Menudeo"];
          $dataTable[] = $row["Total"];
          $dataTable[] = $row["Adeudo"];
          $dataTable[] = $row["Status"];
          $dataTable[] = $row["Extraido"];
          $dataTable[] = $row["Paypal_sin_confirmar"];
          $dataTable[] = $row["idPago"];
          $dataTable[] = $row["idOrden"];
          $dataTable[] = $row["idSalon"];
          $dataTable[] = $row["Salon"];
          $dataTable[] = $row["idDistribuidor"];
          $dataTable[] = $row["Distribuidor"];
          $dataTable[] = $row["Timbrado"];
          $dataTable[] = $row["Entregado"];
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

      // Guardar Factura Timbrada //
      public function saveFactura($factura,$data,$UUID)
      {
          $this->db->trans_start(); # Starting Transaction
          $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well
  
          $logs_ventas_desk = array('idVenta'  => $factura['IDVenta'],
                                  'Fecha_hora' => date("Y-m-d H:i:s"),
                                  'Movimiento' => 'Facturar',
                                  'idUsuario'  => $_SESSION['Avyna'][0]['ID']);
          $this->db->insert('logs_ventas_desk', $logs_ventas_desk);
  
          $this->db->insert('Factura', $factura);
          $insert_id = $this->db->insert_id();
  
          $listProducts = count($data['Venta']);

          for ($i=0; $i<$listProducts; $i++){

            $this->db->where('ID', $data['Venta'][$i]['ID']);
            $this->db->set('Timbrado',1);
            $this->db->set('Tipo_Factura',1);
            $this->db->set('idFacturaGlobal',$insert_id);
            $this->db->update('Ventas');
            $afftectedRows = $this->db->affected_rows();

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
  
}

?>