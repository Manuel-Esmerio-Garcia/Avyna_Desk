<?php


/********************************************************************/
/***   Nombre Archivo: ModelreporteVPF.php                        ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 15/01/2020         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

class ModelreporteVPF extends CI_Model {

    /********************************************************************/
    /***   Función: __construct() 	                	              ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 15/01/2020    					                  ***/
    /***   Descripción: Constructor de la clase              	      ***/
    /********************************************************************/
	public function __construct(){
        $this->load->database();
        parent::__construct();
    }
    /********************************************************************/
	/***   Función: init() 	                				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 15/01/2020    					                  ***/
	/***   Descripción: Obtener Información de productos y promociones***/
	/********************************************************************/
    public function init(){

        
        $this->db->select('*'); 
        $this->db->from('Clientes');
        $this->db->order_by("Nombre", "asc");
        $query = $this->db->get();
        $response['clientes'] = $query->result_array();

        
        $this->db->select('*'); 
        $this->db->from('Sucursales');
        $query = $this->db->get();
        $response['sucursal'] = $query->result_array();

        return $response;
    }
    /********************************************************************/
    /***   Función: exportReport() 	                             	  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 16/01/2020    					                  ***/
    /***   Descripción: Generar Reporte                          	  ***/
    /********************************************************************/
    public function exportReport($data){
        
        $this->db->select('V.ID, V.Fecha_venta, CONCAT(CL.Nombre," ",CL.Apellidos) AS Distribuidor, SU.Sucursal, V.Total, V.Subtotal, V.Impuestos, V.Status, V.Timbrado, PA.Fecha AS Fecha_pago, PA.Monto, PA.Observaciones, FA.Fecha_Timbrado, V.Total AS Monto_factura, V.Tipo_Factura, FA.UUID, SU.ID AS idSucursal, CL.ID AS idDistribuidor'); 
        $this->db->from('Ventas AS V');
        $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
        $this->db->join('sucursales AS SU','CL.idSucursal = SU.ID');
        $this->db->join('pagos_clientes AS PA','V.ID = PA.idVenta','left');
        $this->db->join('factura AS FA','V.ID = FA.IDVenta','left');
        $this->db->where('FA.Status != "Cancelado"');
        if ($data['initialDate']!= "" && $data['initialDate'] != null && $data['endDate']!= "" && $data['endDate'] != null){$this->db->where('V.Fecha_venta BETWEEN "'.$data["initialDate"].'" AND "'.$data["endDate"].'"');}
        if ($data['sucursal'] != "" && $data['sucursal'] != null){$this->db->where('SU.ID',$data['sucursal']);}
        if ($data['distribuidor'] != "" && $data['distribuidor'] != null){$this->db->where('CL.ID',$data['distribuidor']);}
        if ($data['timbrado'] != "" && $data['timbrado'] != null){$this->db->where('V.Timbrado',$data['timbrado']);}

        $query = $this->db->get();
        $response = $query->result_array();

        return $response;
    }
    /********************************************************************/
	/***   Función: tableVPF() 	                		     		  ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 15/01/2020    					                  ***/
	/***   Descripción: Cargar DataTable tableVPF    	 		      ***/
    /********************************************************************/
	public function tableVPF($data){

		$order = '';
        $columns = array('V.ID', 'V.Fecha_venta','CL.Nombre', 'SU.Sucursal','V.Total','V.Subtotal','V.Impuestos','V.Status','V.Timbrado','PA.Fecha','PA.Monto','PA.Observaciones','FA.Fecha_Timbrado','FA.Fecha_Timbrado','V.Total','V.Tipo_Factura','FA.UUID');
                                        
        
        $this->db->select('V.ID, V.Fecha_venta, CONCAT(CL.Nombre," ",CL.Apellidos) AS Distribuidor, SU.Sucursal, V.Total, V.Subtotal, V.Impuestos, V.Status, V.Timbrado, PA.Fecha AS Fecha_pago, PA.Monto, PA.Observaciones, FA.Fecha_Timbrado, V.Total AS Monto_factura, V.Tipo_Factura, FA.UUID, SU.ID AS idSucursal, CL.ID AS idDistribuidor'); 
        $this->db->from('Ventas AS V');
        $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
        $this->db->join('sucursales AS SU','CL.idSucursal = SU.ID');
        $this->db->join('pagos_clientes AS PA','V.ID = PA.idVenta','left');
        $this->db->join('factura AS FA','V.ID = FA.IDVenta','left');
        $this->db->where('FA.Status != "Cancelado"');
        if ($data['initialDate']!= "" && $data['initialDate'] != null && $data['endDate']!= "" && $data['endDate'] != null){$this->db->where('V.Fecha_venta BETWEEN "'.$data["initialDate"].'" AND "'.$data["endDate"].'"');}
        if ($data['sucursal'] != "" && $data['sucursal'] != null){$this->db->where('SU.ID',$data['sucursal']);}
        if ($data['distribuidor'] != "" && $data['distribuidor'] != null){$this->db->where('CL.ID',$data['distribuidor']);}
        if ($data['timbrado'] != "" && $data['timbrado'] != null){$this->db->where('V.Timbrado',$data['timbrado']);}

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('V.ID', $data['search']['value']);
            $this->db->or_like('V.Fecha_venta', $data['search']['value']);
            $this->db->or_like('CL.Nombre', $data['search']['value']);
            $this->db->or_like('CL.Apellidos', $data['search']['value']);
            $this->db->or_like('SU.Sucursal', $data['search']['value']);
            $this->db->or_like('V.Total', $data['search']['value']);
            $this->db->or_like('V.Subtotal', $data['search']['value']);
            $this->db->or_like('V.Impuestos', $data['search']['value']);
            $this->db->or_like('V.Status', $data['search']['value']);
            $this->db->or_like('V.Timbrado', $data['search']['value']);
            $this->db->or_like('PA.Fecha', $data['search']['value']);
            $this->db->or_like('PA.Monto', $data['search']['value']);
            $this->db->or_like('PA.Observaciones', $data['search']['value']);
            $this->db->or_like('FA.Fecha_Timbrado', $data['search']['value']);
            $this->db->or_like('V.Tipo_Factura', $data['search']['value']);
            $this->db->or_like('FA.UUID', $data['search']['value']);
            $this->db->group_end();
        }

        if(isset($data["order"])) {
            $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
        }
        else {
            $order .= 'V.ID DESC ';
        }

        $this->db->order_by($order);

        if($_POST["length"] != -1){
            $this->db->limit($data['length'],$data['start']);
        }

        $query = $this->db->get();
        $result = $query->result_array();

        $this->db->save_queries = TRUE;
        $str = $this->db->last_query();    

        $this->db->select('V.ID, V.Fecha_venta, CONCAT(CL.Nombre," ",CL.Apellidos) AS Distribuidor, SU.Sucursal, V.Total, V.Subtotal, V.Impuestos, V.Status, V.Timbrado, PA.Fecha AS Fecha_pago, PA.Monto, PA.Observaciones, FA.Fecha_Timbrado, V.Total AS Monto_factura, V.Tipo_Factura, FA.UUID, SU.ID AS idSucursal, CL.ID AS idDistribuidor'); 
        $this->db->from('Ventas AS V');
        $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
        $this->db->join('sucursales AS SU','CL.idSucursal = SU.ID');
        $this->db->join('pagos_clientes AS PA','V.ID = PA.idVenta','left');
        $this->db->join('factura AS FA','V.ID = FA.IDVenta','left');
        $this->db->where('FA.Status != "Cancelado"');
        $total = $this->db->count_all_results();


        $this->db->select('V.ID, V.Fecha_venta, CONCAT(CL.Nombre," ",CL.Apellidos) AS Distribuidor, SU.Sucursal, V.Total, V.Subtotal, V.Impuestos, V.Status, V.Timbrado, PA.Fecha AS Fecha_pago, PA.Monto, PA.Observaciones, FA.Fecha_Timbrado, V.Total AS Monto_factura, V.Tipo_Factura, FA.UUID, SU.ID AS idSucursal, CL.ID AS idDistribuidor'); 
        $this->db->from('Ventas AS V');
        $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
        $this->db->join('sucursales AS SU','CL.idSucursal = SU.ID');
        $this->db->join('pagos_clientes AS PA','V.ID = PA.idVenta','left');
        $this->db->join('factura AS FA','V.ID = FA.IDVenta','left');
        $this->db->where('FA.Status != "Cancelado"');
        if ($data['initialDate']!= "" && $data['initialDate'] != null && $data['endDate']!= "" && $data['endDate'] != null){$this->db->where('V.Fecha_venta BETWEEN "'.$data["initialDate"].'" AND "'.$data["endDate"].'"');}
        if ($data['sucursal'] != "" && $data['sucursal'] != null){$this->db->where('SU.ID',$data['sucursal']);}
        if ($data['distribuidor'] != "" && $data['distribuidor'] != null){$this->db->where('CL.ID',$data['distribuidor']);}
        if ($data['timbrado'] != "" && $data['timbrado'] != null){$this->db->where('V.Timbrado',$data['timbrado']);}

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('V.ID', $data['search']['value']);
            $this->db->or_like('V.Fecha_venta', $data['search']['value']);
            $this->db->or_like('CL.Nombre', $data['search']['value']);
            $this->db->or_like('CL.Apellidos', $data['search']['value']);
            $this->db->or_like('SU.Sucursal', $data['search']['value']);
            $this->db->or_like('V.Total', $data['search']['value']);
            $this->db->or_like('V.Subtotal', $data['search']['value']);
            $this->db->or_like('V.Impuestos', $data['search']['value']);
            $this->db->or_like('V.Status', $data['search']['value']);
            $this->db->or_like('V.Timbrado', $data['search']['value']);
            $this->db->or_like('PA.Fecha', $data['search']['value']);
            $this->db->or_like('PA.Monto', $data['search']['value']);
            $this->db->or_like('PA.Observaciones', $data['search']['value']);
            $this->db->or_like('FA.Fecha_Timbrado', $data['search']['value']);
            $this->db->or_like('V.Tipo_Factura', $data['search']['value']);
            $this->db->or_like('FA.UUID', $data['search']['value']);
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
            $dataTable[] = $row["Distribuidor"];
            $dataTable[] = $row["Sucursal"];
            $dataTable[] = $row["Total"];
            $dataTable[] = $row["Subtotal"];
            $dataTable[] = $row["Impuestos"];
            $dataTable[] = $row["Status"];
            $dataTable[] = $row["Timbrado"];
            $dataTable[] = $row["Fecha_pago"];
            $dataTable[] = $row["Monto"];
            $dataTable[] = $row["Observaciones"];
            $dataTable[] = $row["Fecha_Timbrado"];
            $dataTable[] = $row["Monto_factura"];
            $dataTable[] = $row["Tipo_Factura"];
            $dataTable[] = $row["UUID"];
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
}

?>