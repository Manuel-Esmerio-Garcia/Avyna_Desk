<?php
class Reporte_Comisiones_Model extends CI_Model
{
	public function __construct(){
		parent::__construct();
		$this->load->database();
	}
	
	/********************************************************************/
	/***   Función: init() 	                				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 05/08/2020    					                  ***/
	/***   Descripción: Obtener Información de productos y promociones***/
	/********************************************************************/
    public function init(){

        
        $this->db->select('*'); 
        $this->db->from('Clientes');
		$this->db->order_by("Nombre", "asc");
		$this->db->where('Status','Activo');
        $query = $this->db->get();
        $response['clientes'] = $query->result_array();

        
        $this->db->select('*'); 
		$this->db->from('Sucursales');
		$this->db->where('Status','Activo');
        $query = $this->db->get();
        $response['sucursal'] = $query->result_array();

        return $response;
	}
	
	public function tableVentas($data){
		$order = '';
        $columns = array('ventas_menudeo.ID', 'ventas_menudeo.Fecha_venta','ventas_menudeo.Total_desc', 'clms.id','clms.Nombre','MontoSalon','clientes.ID','clientes.Nombre','MontoDistribuidor');
                                        
        
        $this->db->select("ventas_menudeo.ID, ventas_menudeo.Fecha_venta, ventas_menudeo.Total_desc, clms.id AS No_salon, CONCAT(clms.Nombre,' ',clms.Apellidos) AS Salon,clientes.ID AS No_distribuidor, CONCAT(clientes.Nombre,' ',clientes.Apellidos) AS Distribuidor"); 
        $this->db->from('ventas_menudeo');
        $this->db->join('ventas','ventas_menudeo.idVenta = ventas.id');
        $this->db->join('clientes_menudeo','ventas_menudeo.idCliente_menudeo = clientes_menudeo.id');
        $this->db->join('clientes_menudeo AS clms','clientes_menudeo.idSalon = clms.id');
        $this->db->join('clientes','clms.idCliente = clientes.id');
		$this->db->where("Tipo_app = 'Website'");
		$this->db->where('ventas.Adeudo <= 5');
        if ($data['dateStart']!= "" && $data['dateStart'] != null && $data['dateEnd']!= "" && $data['dateEnd'] != null){$this->db->where('ventas_menudeo.Fecha_venta <= "'.$data["dateStart"].'" AND ventas_menudeo.Fecha_venta >= "'.$data["dateEnd"].'"');}
        if ($data['distribuidor'] != "" && $data['distribuidor'] != null){$this->db->where('clientes.ID',$data['distribuidor']);}

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('ventas_menudeo.ID', $data['search']['value']);
            $this->db->or_like('ventas_menudeo.Fecha_venta', $data['search']['value']);
            $this->db->or_like('ventas_menudeo.Total_desc', $data['search']['value']);
            $this->db->or_like('clms.id', $data['search']['value']);
            $this->db->or_like('clms.Nombre', $data['search']['value']);
            $this->db->or_like('clientes.ID', $data['search']['value']);
            $this->db->or_like('clientes.Nombre', $data['search']['value']);
            $this->db->group_end();
        }

        if(isset($data["order"])) {
            $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
        }
        else {
            $order .= 'ventas_menudeo.ID DESC ';
        }

        $this->db->order_by($order);

        if($_POST["length"] != -1){
            $this->db->limit($data['length'],$data['start']);
        }

        $query = $this->db->get();
        $result = $query->result_array();

        $this->db->save_queries = TRUE;
		$str = $this->db->last_query();

        
        $this->db->select("ventas_menudeo.ID, ventas_menudeo.Fecha_venta, ventas_menudeo.Total_desc, clms.id AS No_salon, CONCAT(clms.Nombre,' ',clms.Apellidos) AS Salon,clientes.ID AS No_distribuidor, CONCAT(clientes.Nombre,' ',clientes.Apellidos) AS Distribuidor"); 
        $this->db->from('ventas_menudeo');
        $this->db->join('ventas','ventas_menudeo.idVenta = ventas.id');
        $this->db->join('clientes_menudeo','ventas_menudeo.idCliente_menudeo = clientes_menudeo.id');
        $this->db->join('clientes_menudeo AS clms','clientes_menudeo.idSalon = clms.id');
        $this->db->join('clientes','clms.idCliente = clientes.id');
		$this->db->where("Tipo_app = 'Website'");
		$this->db->where('ventas.Adeudo <= 5');
        $total = $this->db->count_all_results();


        
        $this->db->select("ventas_menudeo.ID, ventas_menudeo.Fecha_venta, ventas_menudeo.Total_desc, clms.id AS No_salon, CONCAT(clms.Nombre,' ',clms.Apellidos) AS Salon,clientes.ID AS No_distribuidor, CONCAT(clientes.Nombre,' ',clientes.Apellidos) AS Distribuidor"); 
        $this->db->from('ventas_menudeo');
        $this->db->join('ventas','ventas_menudeo.idVenta = ventas.id');
        $this->db->join('clientes_menudeo','ventas_menudeo.idCliente_menudeo = clientes_menudeo.id');
        $this->db->join('clientes_menudeo AS clms','clientes_menudeo.idSalon = clms.id');
        $this->db->join('clientes','clms.idCliente = clientes.id');
		$this->db->where("Tipo_app = 'Website'");
		$this->db->where('ventas.Adeudo <= 5');
        if ($data['dateStart']!= "" && $data['dateStart'] != null && $data['dateEnd']!= "" && $data['dateEnd'] != null){$this->db->where('ventas_menudeo.Fecha_venta <= "'.$data["dateStart"].'" AND ventas_menudeo.Fecha_venta >= "'.$data["dateEnd"].'"');}
        if ($data['distribuidor'] != "" && $data['distribuidor'] != null){$this->db->where('clientes.ID',$data['distribuidor']);}


        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('ventas_menudeo.ID', $data['search']['value']);
            $this->db->or_like('ventas_menudeo.Fecha_venta', $data['search']['value']);
            $this->db->or_like('ventas_menudeo.Total_desc', $data['search']['value']);
            $this->db->or_like('clms.id', $data['search']['value']);
            $this->db->or_like('clms.Nombre', $data['search']['value']);
            $this->db->or_like('clientes.ID', $data['search']['value']);
            $this->db->or_like('clientes.Nombre', $data['search']['value']);
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
            $dataTable[] = $row["Total_desc"];
            $dataTable[] = $row["No_salon"];
			$dataTable[] = $row["Salon"];
			$MontoComisionSalon = $row["Total_desc"] * ($data['comisionSalon'] /100);
			$dataTable[] = $MontoComisionSalon;
            $dataTable[] = $row["No_distribuidor"];
			$dataTable[] = $row["Distribuidor"];
			$MontoComisionDistribuidor = $row["Total_desc"] * ($data['comisionDistribuidor'] /100);
			$dataTable[] = $MontoComisionDistribuidor;
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

	/********************************************************************/
    /***   Función: exportReport() 	                             	  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 16/01/2020    					                  ***/
    /***   Descripción: Generar Reporte                          	  ***/
    /********************************************************************/
    public function exportReport($data){
                                        
        
        $this->db->select("ventas_menudeo.ID, ventas_menudeo.Fecha_venta, ventas_menudeo.Total_desc, clms.id AS No_salon, CONCAT(clms.Nombre,' ',clms.Apellidos) AS Salon,clientes.ID AS No_distribuidor, CONCAT(clientes.Nombre,' ',clientes.Apellidos) AS Distribuidor"); 
        $this->db->from('ventas_menudeo');
        $this->db->join('ventas','ventas_menudeo.idVenta = ventas.id');
        $this->db->join('clientes_menudeo','ventas_menudeo.idCliente_menudeo = clientes_menudeo.id');
        $this->db->join('clientes_menudeo AS clms','clientes_menudeo.idSalon = clms.id');
        $this->db->join('clientes','clms.idCliente = clientes.id');
		$this->db->where("Tipo_app = 'Website'");
		$this->db->where('ventas.Adeudo <= 5');
        if ($data['dateStart']!= "" && $data['dateStart'] != null && $data['dateEnd']!= "" && $data['dateEnd'] != null){$this->db->where('ventas_menudeo.Fecha_venta <= "'.$data["dateStart"].'" AND ventas_menudeo.Fecha_venta >= "'.$data["dateEnd"].'"');}
        if ($data['distribuidor'] != "" && $data['distribuidor'] != null){$this->db->where('clientes.ID',$data['distribuidor']);}

        $query = $this->db->get();
        $response = $query->result_array();

        return $response;
	}
	

	public function tableSalon($data){
		$order = '';
        $columns = array('clms.id', 'clms.Nombre','Monto_ventas_periodo');
                                        
        
        $this->db->select("clms.id AS No_salon, CONCAT(clms.Nombre,' ',clms.Apellidos) AS Salon, SUM(ventas_menudeo.Total_desc) AS Monto_ventas_periodo"); 
        $this->db->from('ventas_menudeo');
        $this->db->join('ventas','ventas_menudeo.idVenta = ventas.id');
        $this->db->join('clientes_menudeo','ventas_menudeo.idCliente_menudeo = clientes_menudeo.id');
        $this->db->join('clientes_menudeo AS clms','clientes_menudeo.idSalon = clms.id');
        $this->db->join('clientes','clms.idCliente = clientes.id');
		$this->db->where("Tipo_app = 'Website'");
		$this->db->where('ventas.Adeudo <= 5');
        if ($data['dateStart']!= "" && $data['dateStart'] != null && $data['dateEnd']!= "" && $data['dateEnd'] != null){$this->db->where('ventas_menudeo.Fecha_venta <= "'.$data["dateStart"].'" AND ventas_menudeo.Fecha_venta >= "'.$data["dateEnd"].'"');}

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('clms.id', $data['search']['value']);
            $this->db->or_like('clms.Nombre', $data['search']['value']);
            $this->db->or_like('SUM(ventas_menudeo.Total_desc)', $data['search']['value']);
            $this->db->group_end();
		}
		
		$this->db->group_by('clientes_menudeo.idSalon');

        if(isset($data["order"])) {
            $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
        }
        else {
            $order .= 'ventas_menudeo.ID DESC ';
        }

        $this->db->order_by($order);

        if($_POST["length"] != -1){
            $this->db->limit($data['length'],$data['start']);
        }

        $query = $this->db->get();
        $result = $query->result_array();

        $this->db->save_queries = TRUE;
		$str = $this->db->last_query();

        
        $this->db->select("clms.id AS No_salon, CONCAT(clms.Nombre,' ',clms.Apellidos) AS Salon, SUM(ventas_menudeo.Total_desc) AS Monto_ventas_periodo"); 
        $this->db->from('ventas_menudeo');
        $this->db->join('ventas','ventas_menudeo.idVenta = ventas.id');
        $this->db->join('clientes_menudeo','ventas_menudeo.idCliente_menudeo = clientes_menudeo.id');
        $this->db->join('clientes_menudeo AS clms','clientes_menudeo.idSalon = clms.id');
        $this->db->join('clientes','clms.idCliente = clientes.id');
		$this->db->where("Tipo_app = 'Website'");
		$this->db->where('ventas.Adeudo <= 5');
		$this->db->group_by('clientes_menudeo.idSalon');
        $total = $this->db->count_all_results();


        
        $this->db->select("clms.id AS No_salon, CONCAT(clms.Nombre,' ',clms.Apellidos) AS Salon, SUM(ventas_menudeo.Total_desc) AS Monto_ventas_periodo"); 
        $this->db->from('ventas_menudeo');
        $this->db->join('ventas','ventas_menudeo.idVenta = ventas.id');
        $this->db->join('clientes_menudeo','ventas_menudeo.idCliente_menudeo = clientes_menudeo.id');
        $this->db->join('clientes_menudeo AS clms','clientes_menudeo.idSalon = clms.id');
        $this->db->join('clientes','clms.idCliente = clientes.id');
		$this->db->where("Tipo_app = 'Website'");
		$this->db->where('ventas.Adeudo <= 5');
        if ($data['dateStart']!= "" && $data['dateStart'] != null && $data['dateEnd']!= "" && $data['dateEnd'] != null){$this->db->where('ventas_menudeo.Fecha_venta <= "'.$data["dateStart"].'" AND ventas_menudeo.Fecha_venta >= "'.$data["dateEnd"].'"');}


        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('clms.id', $data['search']['value']);
            $this->db->or_like('clms.Nombre', $data['search']['value']);
            $this->db->or_like('SUM(ventas_menudeo.Total_desc)', $data['search']['value']);
            $this->db->group_end();
		}
		
		$this->db->group_by('clientes_menudeo.idSalon');

        $this->db->order_by($order);
        $total_filtered = $this->db->count_all_results();

        $dataResult = Array();
        foreach ($result as $key => $row)
        {
            $dataTable = array();
            $dataTable[] = $row["No_salon"];
            $dataTable[] = $row["Salon"];
            $dataTable[] = $row["Monto_ventas_periodo"];
			$MontoComisionSalon = $row["Monto_ventas_periodo"] * ($data['comisionSalon'] /100);
			$dataTable[] = $MontoComisionSalon;
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
    
    /********************************************************************/
    /***   Función: exportReportSalon() 	                             	  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 16/01/2020    					                  ***/
    /***   Descripción: Generar Reporte                          	  ***/
    /********************************************************************/
    public function exportReportSalon($data){
                                        
        
        $this->db->select("clms.id AS No_salon, CONCAT(clms.Nombre,' ',clms.Apellidos) AS Salon, SUM(ventas_menudeo.Total_desc) AS Monto_ventas_periodo"); 
        $this->db->from('ventas_menudeo');
        $this->db->join('ventas','ventas_menudeo.idVenta = ventas.id');
        $this->db->join('clientes_menudeo','ventas_menudeo.idCliente_menudeo = clientes_menudeo.id');
        $this->db->join('clientes_menudeo AS clms','clientes_menudeo.idSalon = clms.id');
        $this->db->join('clientes','clms.idCliente = clientes.id');
		$this->db->where("Tipo_app = 'Website'");
		$this->db->where('ventas.Adeudo <= 5');
        if ($data['dateStart']!= "" && $data['dateStart'] != null && $data['dateEnd']!= "" && $data['dateEnd'] != null){$this->db->where('ventas_menudeo.Fecha_venta <= "'.$data["dateStart"].'" AND ventas_menudeo.Fecha_venta >= "'.$data["dateEnd"].'"');}
        $this->db->group_by('clientes_menudeo.idSalon');
        $this->db->order_by('ventas_menudeo.ID DESC');

        $query = $this->db->get();
        $response = $query->result_array();

        return $response;
    }
    
    public function tableDistri($data){

        $order = '';
        $columns = array('clientes.ID', 'clientes.Nombre','Monto_ventas_periodo');
                                        
        
        $this->db->select("clientes.ID AS No_distribuidor, CONCAT(clientes.Nombre,' ',clientes.Apellidos) AS Distribuidor, SUM(ventas_menudeo.Total_desc) AS Monto_ventas_periodo"); 
        $this->db->from('ventas_menudeo');
        $this->db->join('ventas','ventas_menudeo.idVenta = ventas.id');
        $this->db->join('clientes_menudeo','ventas_menudeo.idCliente_menudeo = clientes_menudeo.id');
        $this->db->join('clientes_menudeo AS clms','clientes_menudeo.idSalon = clms.id');
        $this->db->join('clientes','clms.idCliente = clientes.id');
		$this->db->where("Tipo_app = 'Website'");
		$this->db->where('ventas.Adeudo <= 5');
        if ($data['dateStart']!= "" && $data['dateStart'] != null && $data['dateEnd']!= "" && $data['dateEnd'] != null){$this->db->where('ventas_menudeo.Fecha_venta <= "'.$data["dateStart"].'" AND ventas_menudeo.Fecha_venta >= "'.$data["dateEnd"].'"');}

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('clientes.ID', $data['search']['value']);
            $this->db->or_like('clientes.Nombre', $data['search']['value']);
            $this->db->or_like('SUM(ventas_menudeo.Total_desc)', $data['search']['value']);
            $this->db->group_end();
		}
		
		$this->db->group_by('clientes.ID');

        if(isset($data["order"])) {
            $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
        }
        else {
            $order .= 'clientes.ID DESC ';
        }

        $this->db->order_by($order);

        if($_POST["length"] != -1){
            $this->db->limit($data['length'],$data['start']);
        }

        $query = $this->db->get();
        $result = $query->result_array();

        $this->db->save_queries = TRUE;
		$str = $this->db->last_query();

        
        $this->db->select("clientes.ID AS No_distribuidor, CONCAT(clientes.Nombre,' ',clientes.Apellidos) AS Distribuidor, SUM(ventas_menudeo.Total_desc) AS Monto_ventas_periodo"); 
        $this->db->from('ventas_menudeo');
        $this->db->join('ventas','ventas_menudeo.idVenta = ventas.id');
        $this->db->join('clientes_menudeo','ventas_menudeo.idCliente_menudeo = clientes_menudeo.id');
        $this->db->join('clientes_menudeo AS clms','clientes_menudeo.idSalon = clms.id');
        $this->db->join('clientes','clms.idCliente = clientes.id');
		$this->db->where("Tipo_app = 'Website'");
		$this->db->where('ventas.Adeudo <= 5');
		$this->db->group_by('clientes.ID');
        $total = $this->db->count_all_results();


        
        $this->db->select("clientes.ID AS No_distribuidor, CONCAT(clientes.Nombre,' ',clientes.Apellidos) AS Distribuidor, SUM(ventas_menudeo.Total_desc) AS Monto_ventas_periodo"); 
        $this->db->from('ventas_menudeo');
        $this->db->join('ventas','ventas_menudeo.idVenta = ventas.id');
        $this->db->join('clientes_menudeo','ventas_menudeo.idCliente_menudeo = clientes_menudeo.id');
        $this->db->join('clientes_menudeo AS clms','clientes_menudeo.idSalon = clms.id');
        $this->db->join('clientes','clms.idCliente = clientes.id');
		$this->db->where("Tipo_app = 'Website'");
		$this->db->where('ventas.Adeudo <= 5');
        if ($data['dateStart']!= "" && $data['dateStart'] != null && $data['dateEnd']!= "" && $data['dateEnd'] != null){$this->db->where('ventas_menudeo.Fecha_venta <= "'.$data["dateStart"].'" AND ventas_menudeo.Fecha_venta >= "'.$data["dateEnd"].'"');}


        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('clientes.ID', $data['search']['value']);
            $this->db->or_like('clientes.Nombre', $data['search']['value']);
            $this->db->or_like('SUM(ventas_menudeo.Total_desc)', $data['search']['value']);
            $this->db->group_end();
		}
		
		$this->db->group_by('clientes.ID');

        $this->db->order_by($order);
        $total_filtered = $this->db->count_all_results();

        $dataResult = Array();
        foreach ($result as $key => $row)
        {
            $dataTable = array();
            $dataTable[] = $row["No_distribuidor"];
            $dataTable[] = $row["Distribuidor"];
            $dataTable[] = $row["Monto_ventas_periodo"];
			$MontoComisionSalon = $row["Monto_ventas_periodo"] * ($data['comisionDistribuidor'] /100);
			$dataTable[] = $MontoComisionSalon;
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

    /********************************************************************/
    /***   Función: exportReportDistri() 	                             	  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 16/01/2020    					                  ***/
    /***   Descripción: Generar Reporte                          	  ***/
    /********************************************************************/
    public function exportReportDistri($data){
                                        
        
        $this->db->select("clientes.ID AS No_distribuidor, CONCAT(clientes.Nombre,' ',clientes.Apellidos) AS Distribuidor, SUM(ventas_menudeo.Total_desc) AS Monto_ventas_periodo"); 
        $this->db->from('ventas_menudeo');
        $this->db->join('ventas','ventas_menudeo.idVenta = ventas.id');
        $this->db->join('clientes_menudeo','ventas_menudeo.idCliente_menudeo = clientes_menudeo.id');
        $this->db->join('clientes_menudeo AS clms','clientes_menudeo.idSalon = clms.id');
        $this->db->join('clientes','clms.idCliente = clientes.id');
		$this->db->where("Tipo_app = 'Website'");
		$this->db->where('ventas.Adeudo <= 5');
        if ($data['dateStart']!= "" && $data['dateStart'] != null && $data['dateEnd']!= "" && $data['dateEnd'] != null){$this->db->where('ventas_menudeo.Fecha_venta <= "'.$data["dateStart"].'" AND ventas_menudeo.Fecha_venta >= "'.$data["dateEnd"].'"');}
        
        $this->db->group_by('clientes.ID');
        $this->db->order_by('clientes.ID DESC');

        $query = $this->db->get();
        $response = $query->result_array();

        return $response;
    }
    
}

?>