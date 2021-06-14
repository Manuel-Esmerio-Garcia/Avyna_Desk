<?php

class ClienteWeb_Model extends CI_Model {

	public function __construct(){
        parent::__construct();
    }

    public function ShowPassword($idCliente){
        
        $this->db->select('*'); 
        $this->db->from('clientes_menudeo');
        $this->db->where('ID',$idCliente);
        $query = $this->db->get(); 
        return $query->result_array(); 
    }

    public function getSalones(){
        
        $this->db->select('*'); 
        $this->db->from('Salones');
        $query = $this->db->get(); 
        return $query->result_array();        
    }

    public function Insert($data){

        $Descuento = $data['Cliente']['Descuento'];
        unset($data['Cliente']['Descuento']);

        $data['Cliente']['Descuento_%'] = $Descuento;

        $this->db->trans_start();
        $this->db->trans_strict(FALSE);

        $this->db->insert('Clientes_menudeo', $data['Cliente']);

        $this->db->trans_complete();
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

    public function Update($data){

        $ID = $data['Cliente']['ID'];
        unset($data['Cliente']['ID']);

        $Descuento = $data['Cliente']['Descuento'];
        unset($data['Cliente']['Descuento']);

        $data['Cliente']['Descuento_%'] = $Descuento;

        $this->db->trans_start();
        $this->db->trans_strict(FALSE);

        $this->db->where('ID',$ID);
        $this->db->update('Clientes_menudeo', $data['Cliente']);

        $this->db->trans_complete();
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

    public function Delete($data){

        $this->db->trans_start();
        $this->db->trans_strict(FALSE);

        $this->db->where('ID',$data['ID']);
        $this->db->set('Status','Inactivo');
        $this->db->update('Clientes_menudeo');

        $this->db->trans_complete();
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

    public function fetchClientes($data){
        $order = '';
        $columns = array('CLM.ID', 'CLM.Nombre', "CLM.Apellidos", 'CLM.RFC', 'CLM.Empresa', 'CLM.Cargo', 'CLM.Calle_numero', 'CLM.Colonia', 'CLM.Ciudad', 'CLM.Municipio', 'CLM.Estado', 'CLM.Pais', 'CLM.CP','CLM.Tel1','CLM.Tel2','CLM.Email','CLM.Descuento_%','CLM.Nivel','CLM.idSalon', 'CLM.Status');
    
        
        $this->db->select('CLM.*'); 
        $this->db->from('Clientes_menudeo AS CLM');
        //$this->db->where("idDistribuidor",1967);
        $this->db->where("CLM.idCliente",1967);
    
        if($data["search"]["value"] !== ''){
          $this->db->group_start();
          $this->db->like('CLM.ID', $data['search']['value']);
          $this->db->or_like('CLM.Nombre', $data['search']['value']); 
          $this->db->or_like('CLM.Apellidos', $data['search']['value']);
          $this->db->or_like('CLM.RFC', $data['search']['value']);
          $this->db->or_like('CLM.Empresa', $data['search']['value']);
          $this->db->or_like('CLM.Cargo', $data['search']['value']);
          $this->db->or_like('CLM.Calle_numero', $data['search']['value']);
          $this->db->or_like('CLM.Colonia', $data['search']['value']);
          $this->db->or_like('CLM.Ciudad', $data['search']['value']);
          $this->db->or_like('CLM.Municipio', $data['search']['value']);
          $this->db->or_like('CLM.Estado', $data['search']['value']);
          $this->db->or_like('CLM.Pais', $data['search']['value']);
          $this->db->or_like('CLM.CP', $data['search']['value']);
          $this->db->or_like('CLM.Tel1', $data['search']['value']);
          $this->db->or_like('CLM.Tel2', $data['search']['value']);
          $this->db->or_like('CLM.Email', $data['search']['value']);
          $this->db->or_like('CLM.Descuento_%', $data['search']['value']);
          $this->db->or_like('CLM.Nivel', $data['search']['value']);
          $this->db->or_like('CLM.idSalon', $data['search']['value']);
          $this->db->or_like('CLM.Status', $data['search']['value']);
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
    
        $this->db->select('CLM.*'); 
        $this->db->from('Clientes_menudeo AS CLM');
        //$this->db->where("idDistribuidor",1967);
        $this->db->where("CLM.idCliente",1967);

        $total = $this->db->count_all_results();
    
        $this->db->select('CLM.*'); 
        $this->db->from('Clientes_menudeo AS CLM');
        //$this->db->where("idDistribuidor",1967);
        $this->db->where("CLM.idCliente",1967);
    
        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('CLM.ID', $data['search']['value']);
            $this->db->or_like('CLM.Nombre', $data['search']['value']); 
            $this->db->or_like('CLM.Apellidos', $data['search']['value']);
            $this->db->or_like('CLM.RFC', $data['search']['value']);
            $this->db->or_like('CLM.Empresa', $data['search']['value']);
            $this->db->or_like('CLM.Cargo', $data['search']['value']);
            $this->db->or_like('CLM.Calle_numero', $data['search']['value']);
            $this->db->or_like('CLM.Colonia', $data['search']['value']);
            $this->db->or_like('CLM.Ciudad', $data['search']['value']);
            $this->db->or_like('CLM.Municipio', $data['search']['value']);
            $this->db->or_like('CLM.Estado', $data['search']['value']);
            $this->db->or_like('CLM.Pais', $data['search']['value']);
            $this->db->or_like('CLM.CP', $data['search']['value']);
            $this->db->or_like('CLM.Tel1', $data['search']['value']);
            $this->db->or_like('CLM.Tel2', $data['search']['value']);
            $this->db->or_like('CLM.Email', $data['search']['value']);
            $this->db->or_like('CLM.Descuento_%', $data['search']['value']);
            $this->db->or_like('CLM.Nivel', $data['search']['value']);
            $this->db->or_like('CLM.idSalon', $data['search']['value']);
            $this->db->or_like('CLM.Status', $data['search']['value']);
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
          $dataTable[] = $row["RFC"];
          $dataTable[] = $row["Empresa"];
          $dataTable[] = $row["Cargo"];
          $dataTable[] = $row["Calle_numero"];
          $dataTable[] = $row["Colonia"];
          $dataTable[] = $row["Ciudad"];
          $dataTable[] = $row["Municipio"];
          $dataTable[] = $row["Estado"];
          $dataTable[] = $row["Pais"];
          $dataTable[] = $row["CP"];
          $dataTable[] = $row["Tel1"];
          $dataTable[] = $row["Tel2"];
          $dataTable[] = $row["Email"];
          $dataTable[] = $row["Descuento_%"];
          $dataTable[] = $row["Nivel"];
          $dataTable[] = $row["idSalon"];
          $dataTable[] = $row["Status"];
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
}

?>