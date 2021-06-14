<?php
class ModelreporteVS extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	
	public function init(){
        
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
        
        $this->db->select('ipsv.*,('.$data['calculo'].' * Faltante) AS Factor, IF(pdc.Restante_Total IS NULL,0,pdc.Restante_Total) AS Total_Restante'); 
        $this->db->from('inventario_producto_sucursal_view ipsv');
        $this->db->join('Restante_VS_Reporte_View pdc','ipsv.idCatalogo = pdc.idCatalogo','LEFT');
        if ($data['sucursal'] != "" && $data['sucursal'] != null){$this->db->where('ipsv.idSucursal',$data['sucursal']);}
        
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
	public function tableVS($data){

		$order = '';
        $columns = array('Producto', 'Existencias','Existencias_apartados', 'Existencias_disponibles','Faltante', 'Total_Restante','Factor','Min','Precio_publico');
                                        
        
        $this->db->select('ipsv.*,('.$data['calculo'].' * Faltante) AS Factor, IF(pdc.Restante_Total IS NULL,0,pdc.Restante_Total) AS Total_Restante'); 
        $this->db->from('inventario_producto_sucursal_view ipsv');
        $this->db->join('Restante_VS_Reporte_View pdc','ipsv.idCatalogo = pdc.idCatalogo','LEFT');
        if ($data['sucursal'] != "" && $data['sucursal'] != null){$this->db->where('ipsv.idSucursal',$data['sucursal']);}


        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('ipsv.Producto', $data['search']['value']);
            $this->db->or_like('ipsv.Existencias', $data['search']['value']);
            $this->db->or_like('ipsv.Existencias_apartados', $data['search']['value']);
            $this->db->or_like('ipsv.Existencias_disponibles', $data['search']['value']);
            $this->db->or_like('ipsv.Faltante', $data['search']['value']);
            $this->db->or_like('IF(pdc.Restante_Total IS NULL,0,pdc.Restante_Total)', $data['search']['value']);
            $this->db->or_like('('.$data['calculo'].' * Faltante)', $data['search']['value']);
            $this->db->or_like('ipsv.Min', $data['search']['value']);
            $this->db->or_like('ipsv.Precio_publico', $data['search']['value']);
            $this->db->group_end();
        }

        if(isset($data["order"])) {
            $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
        }
        else {
            $order .= 'ipsv.Producto DESC ';
        }

        $this->db->order_by($order);

        if($_POST["length"] != -1){
            $this->db->limit($data['length'],$data['start']);
        }

        $query = $this->db->get();

        $this->db->save_queries = TRUE;
        $str = $this->db->last_query();  

        $result = $query->result_array();

        $this->db->save_queries = TRUE;
        $str = $this->db->last_query();  

        $this->db->select('ipsv.*,('.$data['calculo'].' * Faltante) AS Factor, IF(pdc.Restante_Total IS NULL,0,pdc.Restante_Total) AS Total_Restante'); 
        $this->db->from('inventario_producto_sucursal_view ipsv');
        $this->db->join('Restante_VS_Reporte_View pdc','ipsv.idCatalogo = pdc.idCatalogo','LEFT');
        $total = $this->db->count_all_results();


        $this->db->select('ipsv.*,('.$data['calculo'].' * Faltante) AS Factor, IF(pdc.Restante_Total IS NULL,0,pdc.Restante_Total) AS Total_Restante'); 
        $this->db->from('inventario_producto_sucursal_view ipsv');
        $this->db->join('Restante_VS_Reporte_View pdc','ipsv.idCatalogo = pdc.idCatalogo','LEFT');
        if ($data['sucursal'] != "" && $data['sucursal'] != null){$this->db->where('ipsv.idSucursal',$data['sucursal']);}

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('ipsv.Producto', $data['search']['value']);
            $this->db->or_like('ipsv.Existencias', $data['search']['value']);
            $this->db->or_like('ipsv.Existencias_apartados', $data['search']['value']);
            $this->db->or_like('ipsv.Existencias_disponibles', $data['search']['value']);
            $this->db->or_like('ipsv.Faltante', $data['search']['value']);
            $this->db->or_like('IF(pdc.Restante_Total IS NULL,0,pdc.Restante_Total)', $data['search']['value']);
            $this->db->or_like('('.$data['calculo'].' * Faltante)', $data['search']['value']);
            $this->db->or_like('ipsv.Min', $data['search']['value']);
            $this->db->or_like('ipsv.Precio_publico', $data['search']['value']);
            $this->db->group_end();
        }

        $this->db->order_by($order);
        $total_filtered = $this->db->count_all_results();

        $dataResult = Array();
        foreach ($result as $key => $row)
        {
            $dataTable = array();
            $dataTable[] = $row["Producto"];
            $dataTable[] = $row["Existencias"];
            $dataTable[] = $row["Existencias_apartados"];
            $dataTable[] = $row["Existencias_disponibles"];
            $dataTable[] = $row["Faltante"];
            $dataTable[] = $row["Total_Restante"];
            if(floatval($row["Factor"]) > 0){
                $dataTable[] =  $row['Factor'];
            }else{
                $dataTable[] =  0.00;
            }            
            $dataTable[] = $row["Min"];
            $dataTable[] = $row["Precio_publico"];
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