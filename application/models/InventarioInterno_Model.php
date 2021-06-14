<?php

error_reporting(E_ERROR);

class InventarioInterno_Model extends CI_Model {

	public function __construct(){
        // Inicializa la Clase de la Base de Datos.
        $this->load->database();
        parent::__construct();
    }

    /********************************************************************/
	/***   Función: init() 	                				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Obtener Información Sucursales                ***/
	/********************************************************************/
    public function init(){

        
        $this->db->select('*'); 
        $this->db->from('Sucursales');
        $query = $this->db->get();
        $response = $query->result_array();

        return $response;
    }
    /********************************************************************/
	/***   Función: searching() 	             		              ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Cargar DataTable                              ***/
    /********************************************************************/ 
    public function searching($data){
        
        $this->db->select('*'); 
        $this->db->from('detalle_inventario_interno');
        $this->db->where('idInventarioInterno',$data['ID']);
        $query = $this->db->get();
        $response = $query->result_array();

        return $response;
    }

    /********************************************************************/
	/***   Función: btnExtraer() 	                                  ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Extraer Inventario Interno                    ***/
    /********************************************************************/
    public function btnExtraer($data){
        $Restante = 0;
        $this->db->trans_start();
        $this->db->trans_strict(FALSE);
        
        
        $this->db->select('*'); 
        $this->db->from('detalle_inventario_interno');
        $this->db->where('idInventarioInterno',$data['idInventarioInterno']);
        $this->db->where('Existencias > 0');
        $this->db->order_by('ID','ASC');
        $query = $this->db->get();
        $details = $query->result_array();

        foreach ($details as $key => $value) {
            if (intval($value['Existencias']) >= intval($data['Cantidad'] - $Restante)) {
                $Existencias = intval($value['Existencias']) - intval($data['Cantidad'] - $Restante);

                $ExtraccionInventario = array('Fecha_hora' => date("Y-m-d H:i:s"),
                                        'idUsuario' => $_SESSION['Avyna'][0]['ID'],
                                        'idDetalle_inventario_interno' => $value['ID'],
                                        'Cantidad' => intval($data['Cantidad'] - $Restante));

                $this->db->insert('extracciones_inventario_interno', $ExtraccionInventario);

                $this->db->where('ID',$value['ID']);
                $this->db->set('Existencias', $Existencias);
		        $this->db->update('detalle_inventario_interno');

                break;
            }else{
                $Restante = intval($value['Existencias']);

                $ExtraccionInventario = array('Fecha_hora' => date("Y-m-d H:i:s"),
                                        'idUsuario' => $_SESSION['Avyna'][0]['ID'],
                                        'idDetalle_inventario_interno' => $value['ID'],
                                        'Cantidad' => $value['Existencias']);

                $this->db->insert('extracciones_inventario_interno', $ExtraccionInventario);

                $this->db->where('ID',$value['ID']);
                $this->db->set('Existencias', 0);
		        $this->db->update('detalle_inventario_interno');

                continue;
            }
        }

		$this->db->trans_complete(); # Completing transaction

		if ($this->db->trans_status() === FALSE) {
		    $this->db->trans_rollback();
		    return 0;
		} 
		else {
		    $this->db->trans_commit();
		    return 1;
		}
    }

    public function addInventary($data){
        $this->db->trans_start();
		$this->db->trans_strict(FALSE);

		$this->db->insert('inventario_interno', $data);

		$this->db->trans_complete(); # Completing transaction

		if ($this->db->trans_status() === FALSE) {
		    $this->db->trans_rollback();
		    return 0;
		} 
		else {
		    $this->db->trans_commit();
		    return 1;
		}
    }


    public function addDetailsInventary($data){
        $this->db->trans_start();
		$this->db->trans_strict(FALSE);

		$this->db->insert('detalle_inventario_interno', $data);

		$this->db->trans_complete(); # Completing transaction

		if ($this->db->trans_status() === FALSE) {
		    $this->db->trans_rollback();
		    return 0;
		} 
		else {
		    $this->db->trans_commit();
		    return 1;
		}
    }

    public function updateDetailsInventary($data){
        $this->db->trans_start();
        $this->db->trans_strict(FALSE);
        
        $ID = $data['ID'];
        unset($data['ID']);

        $this->db->where('ID',$ID);
		$this->db->update('detalle_inventario_interno', $data);

		$this->db->trans_complete(); # Completing transaction

		if ($this->db->trans_status() === FALSE) {
		    $this->db->trans_rollback();
		    return 0;
		} 
		else {
		    $this->db->trans_commit();
		    return 1;
		}
    }

    public function updateInventary($data){
        $this->db->trans_start();
        $this->db->trans_strict(FALSE);
        
        $ID = $data['ID'];
        unset($data['ID']);

        $this->db->where('ID',$ID);
		$this->db->update('inventario_interno', $data);

		$this->db->trans_complete(); # Completing transaction

		if ($this->db->trans_status() === FALSE) {
		    $this->db->trans_rollback();
		    return 0;
		} 
		else {
		    $this->db->trans_commit();
		    return 1;
		}
    }

    /********************************************************************/
	/***   Función: deleteDetailsInventary() 	                      ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Cargar DataTable                              ***/
    /********************************************************************/
    public function deleteDetailsInventary($data){
        $this->db->trans_start();
        $this->db->trans_strict(FALSE);
        
        $this->db->where('ID',$data['ID']);
        $this->db->set('Existencias',0);
		$this->db->update('detalle_inventario_interno');

		$this->db->trans_complete(); # Completing transaction

		if ($this->db->trans_status() === FALSE) {
		    $this->db->trans_rollback();
		    return 0;
		} 
		else {
		    $this->db->trans_commit();
		    return 1;
		}
    }

    public function deleteInventary($data){
        $this->db->trans_start();
        $this->db->trans_strict(FALSE);
        
        $this->db->where('ID',$data['ID']);
        $this->db->set('Status','Inactivo');
		$this->db->update('inventario_interno');

		$this->db->trans_complete(); # Completing transaction

		if ($this->db->trans_status() === FALSE) {
		    $this->db->trans_rollback();
		    return 0;
		} 
		else {
		    $this->db->trans_commit();
		    return 1;
		}
    }

    public function getInfoUpdateInventary($data)
    {
        
        $this->db->select('*'); 
        $this->db->from('inventario_interno_view');
        $this->db->where('ID',$data['ID']);
        $this->db->where('idSucursal',$data['idSucursal']);
        $query = $this->db->get();
        $response = $query->result_array();

        return $response;
    }
    /********************************************************************/
	/***   Función: fetchInventary() 	             		          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/02/2020    					                  ***/
	/***   Descripción: Cargar DataTable                              ***/
    /********************************************************************/
    public function fetchInventary($data){
        $order = '';
        $columns = array('ID', 'Sucursal','Producto','Existencias', 'Minimo','Status');
                                        
        
        $this->db->select('*'); 
        $this->db->from('inventario_interno_view');
        if ($data['sucursal'] != "" && $data['sucursal'] != null){$this->db->where('idSucursal',$data['sucursal']);}

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('ID', $data['search']['value']);
            $this->db->or_like('Sucursal', $data['search']['value']);
            $this->db->or_like('Producto', $data['search']['value']);
            $this->db->or_like('Existencias', $data['search']['value']);
            $this->db->or_like('Minimo', $data['search']['value']);
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
        $result = $query->result_array();

        $this->db->save_queries = TRUE;
        $str = $this->db->last_query();    

        $this->db->select('*'); 
        $this->db->from('inventario_interno_view');
        $total = $this->db->count_all_results();


        $this->db->select('*'); 
        $this->db->from('inventario_interno_view');        
        if ($data['sucursal'] != "" && $data['sucursal'] != null){$this->db->where('idSucursal',$data['sucursal']);}

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('ID', $data['search']['value']);
            $this->db->or_like('Sucursal', $data['search']['value']);
            $this->db->or_like('Producto', $data['search']['value']);
            $this->db->or_like('Existencias', $data['search']['value']);
            $this->db->or_like('Minimo', $data['search']['value']);
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
            $dataTable[] = $row["Producto"];
            $dataTable[] = $row["Existencias"];
            $dataTable[] = $row["Minimo"];
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
}