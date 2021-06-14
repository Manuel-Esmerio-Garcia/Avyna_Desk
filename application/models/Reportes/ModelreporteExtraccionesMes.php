<?php
class ModelreporteExtraccionesMes extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	/********************************************************************/
    /***   Función: exportReport() 	                             	  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 16/01/2020    					                  ***/
    /***   Descripción: Generar Reporte                          	  ***/
    /********************************************************************/
    public function exportReport(){
        
        $this->db->select('*'); 
		$this->db->from('ReporteExtraccionesMesView');

        $query = $this->db->get();
        $response = $query->result_array();

        return $response;
    }
	
	public function tableExtracciones($data){
		$order = '';
		$columns = array('Producto', 'MES_VENTA','CANTIDAD_VENTA');
		
        
        $this->db->select('*'); 
		$this->db->from('ReporteExtraccionesMesView');

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('Producto', $data['search']['value']);
            $this->db->or_like('MES_VENTA', $data['search']['value']);
            $this->db->or_like('CANTIDAD_VENTA', $data['search']['value']);
            $this->db->group_end();
        }

        if(isset($data["order"])) {
            $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
        }
        else {
            $order .= '';
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
		$this->db->from('ReporteExtraccionesMesView');
        $total = $this->db->count_all_results();


        $this->db->select('*'); 
		$this->db->from('ReporteExtraccionesMesView');

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('Producto', $data['search']['value']);
            $this->db->or_like('MES_VENTA', $data['search']['value']);
            $this->db->or_like('CANTIDAD_VENTA', $data['search']['value']);
            $this->db->group_end();
        }

        $this->db->order_by($order);
        $total_filtered = $this->db->count_all_results();

        $dataResult = Array();
        foreach ($result as $key => $row)
        {
            $dataTable = array();
            $dataTable[] = $row["Producto"];
            $dataTable[] = $row["MES_VENTA"];
            $dataTable[] = $row["CANTIDAD_VENTA"];
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