<?php


/********************************************************************/
/***   Nombre Archivo: ModelreportexSalones.php                   ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 23/01/2020         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

class ModelreportexSalones extends CI_Model {

    /********************************************************************/
    /***   Función: __construct() 	                	              ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 23/01/2020    					                  ***/
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

        
        $this->db->select('Nivel'); 
        $this->db->from('Clientes_menudeo');
        $this->db->group_by('Nivel');
        $query = $this->db->get();
        $response['nivel'] = $query->result_array();

        return $response;
    }

    /********************************************************************/
    /***   Función: exportReport() 	                             	  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 23/01/2020    					                  ***/
    /***   Descripción: Generar Reporte                          	  ***/
    /********************************************************************/

    public function exportReport($data){
        
        $this->db->select("clm.ID, clm.Nombre, clm.Apellidos, clm.Nivel, CONCAT(cl.Nombre, ' ', cl.Apellidos) AS Distribuidores, SUM(vm.Total) AS TotalPeriodo, vm.Fecha_venta"); 
        $this->db->from('Clientes_menudeo AS clm');
        $this->db->join('Clientes AS cl', 'clm.idCliente = cl.ID');
        $this->db->join('Ventas_menudeo AS vm', 'clm.ID = vm.idCliente_menudeo');
        if ($data['initialDate']!= "" && $data['initialDate'] != null && $data['endDate']!= "" && $data['endDate'] != null){$this->db->where('Fecha_venta BETWEEN "'.$data["initialDate"].'" AND "'.$data["endDate"].'"');}
        if ($data['customer']) {$this->db->where('cl.ID',$data['customer']);}
        if ($data['nivel']) {$this->db->where('clm.Nivel',$data['nivel']);}
        $this->db->group_by('clm.ID');
        $query = $this->db->get();
        $response = $query->result_array();

        return $response;
    }

    /********************************************************************/
	/***   Función: fetchVentasXSalones() 	                    	  ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 23/01/2020    					                  ***/
	/***   Descripción: Cargar DataTable fetchVentasXSalones 	      ***/
    /********************************************************************/
	public function fetchVentasXSalones($data){

		$order = '';
        $columns = array('clm.ID', 'clm.Nombre','clm.Apellidos', 'clm.Nivel', 'Distribuidores','TotalPeriodo');

        
        $this->db->select("clm.ID, clm.Nombre, clm.Apellidos, clm.Nivel, CONCAT(cl.Nombre, ' ', cl.Apellidos) AS Distribuidores, SUM(vm.Total) AS TotalPeriodo, vm.Fecha_venta"); 
        $this->db->from('Clientes_menudeo AS clm');
        $this->db->join('Clientes AS cl', 'clm.idCliente = cl.ID');
        $this->db->join('Ventas_menudeo AS vm', 'clm.ID = vm.idCliente_menudeo');
        if ($data['initialDate']!= "" && $data['initialDate'] != null && $data['endDate']!= "" && $data['endDate'] != null){$this->db->where('Fecha_venta BETWEEN "'.$data["initialDate"].'" AND "'.$data["endDate"].'"');}
        if ($data['customer']) {$this->db->where('cl.ID',$data['customer']);}
        if ($data['nivel']) {$this->db->where('clm.Nivel',$data['nivel']);}

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('clm.ID', $data['search']['value']);
            $this->db->or_like('clm.Nombre', $data['search']['value']);
            $this->db->or_like('clm.Apellidos', $data['search']['value']);
            $this->db->or_like('clm.Nivel', $data['search']['value']);
            $this->db->or_like('cl.Nombre', $data['search']['value']);
            $this->db->or_like('cl.Apellidos', $data['search']['value']);
            $this->db->or_like('vm.Total', $data['search']['value']);
            $this->db->group_end();
        }

        $this->db->group_by('clm.ID');

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

        $this->db->select("clm.ID, clm.Nombre, clm.Apellidos, clm.Nivel, CONCAT(cl.Nombre, ' ', cl.Apellidos) AS Distribuidores, SUM(vm.Total) AS TotalPeriodo, vm.Fecha_venta"); 
        $this->db->from('Clientes_menudeo AS clm');
        $this->db->join('Clientes AS cl', 'clm.idCliente = cl.ID');
        $this->db->join('Ventas_menudeo AS vm', 'clm.ID = vm.idCliente_menudeo');
        $this->db->group_by('clm.ID');
        $total = $this->db->count_all_results();


        $this->db->select("clm.ID, clm.Nombre, clm.Apellidos, clm.Nivel, CONCAT(cl.Nombre, ' ', cl.Apellidos) AS Distribuidores, SUM(vm.Total) AS TotalPeriodo, vm.Fecha_venta"); 
        $this->db->from('Clientes_menudeo AS clm');
        $this->db->join('Clientes AS cl', 'clm.idCliente = cl.ID');
        $this->db->join('Ventas_menudeo AS vm', 'clm.ID = vm.idCliente_menudeo');
        if ($data['initialDate']!= "" && $data['initialDate'] != null && $data['endDate']!= "" && $data['endDate'] != null){$this->db->where('Fecha_venta BETWEEN "'.$data["initialDate"].'" AND "'.$data["endDate"].'"');}
        if ($data['customer']) {$this->db->where('cl.ID',$data['customer']);}
        if ($data['nivel']) {$this->db->where('clm.Nivel',$data['nivel']);}

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('clm.ID', $data['search']['value']);
            $this->db->or_like('clm.Nombre', $data['search']['value']);
            $this->db->or_like('clm.Apellidos', $data['search']['value']);
            $this->db->or_like('clm.Nivel', $data['search']['value']);
            $this->db->or_like('cl.Nombre', $data['search']['value']);
            $this->db->or_like('cl.Apellidos', $data['search']['value']);
            $this->db->or_like('vm.Total', $data['search']['value']);
            $this->db->group_end();
        }

        $this->db->group_by('clm.ID');

        $this->db->order_by($order);
        $total_filtered = $this->db->count_all_results();

        $dataResult = Array();
        foreach ($result as $key => $row)
        {
            $dataTable = array();
            $dataTable[] = $row["ID"];
            $dataTable[] = $row["Nombre"];
            $dataTable[] = $row["Apellidos"];
            $dataTable[] = $row["Nivel"];
            $dataTable[] = $row["Distribuidores"];
            $dataTable[] = $row["TotalPeriodo"];
            $dataResult[] = $dataTable;
        }

        $output = array(
        "draw"    => $data["draw"],
        "recordsTotal"  => $total,
        "recordsFiltered" => $total_filtered,
        "data"    => $dataResult,
        "result"    => $result
        );

        return json_encode($output);
	}
}

?>