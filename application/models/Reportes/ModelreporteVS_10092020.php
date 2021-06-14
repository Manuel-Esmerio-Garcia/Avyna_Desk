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
        
        $this->db->select('inv.*,('.$data['calculo'].' * Faltante) AS Factor, IF(SUM(doc.Cantidad) IS NULL,0,SUM(doc.Cantidad)) AS Total_Restante, CONCAT(p.Nombre," ",p.Apellidos) AS Proveedor, IF(oc.Status = "Aceptada" OR oc.Status = "Generada", SUM(doc.Cantidad),"Sin Aceptar o Generar") AS Aceptadas_Generadas'); 
        $this->db->from('ordenes_compra_vs oc');
        $this->db->join('detalle_orden_compra doc','oc.ID = doc.idOrden_compra');
        $this->db->join('inventario_producto_sucursal_view inv','doc.idCatalogo = inv.idCatalogo','RIGHT');
        $this->db->join('catalogo ca','inv.idCatalogo = ca.ID','LEFT');
        $this->db->join('proveedores p','ca.idProveedor = p.ID','LEFT'); 
        // $this->db->group_start();
        //     $this->db->where('oc.Status','Aceptada');
        //     $this->db->or_where('oc.Status','Generada');
        // $this->db->group_end();
        if ($data['sucursal'] != "" && $data['sucursal'] != null){$this->db->where('inv.idSucursal',$data['sucursal']);}
        $this->db->group_by('inv.idCatalogo'); 
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


        
// SELECT `inv`.*, (15 * Faltante) AS Factor, IF(SUM(doc.Cantidad) IS NULL, 0, SUM(doc.Cantidad)) AS Total_Restante, CONCAT(p.Nombre, " ", p.Apellidos) AS Proveedor, 
// IF(oc.Status = "Aceptada" OR oc.Status = "Generada", SUM(doc.Cantidad), "Sin Aceptar o Generar") AS Aceptadas_Generadas 
// FROM `ordenes_compra_vs` `oc` 
// JOIN `detalle_orden_compra` `doc` ON `oc`.`ID` = `doc`.`idOrden_compra` 
// RIGHT JOIN `inventario_producto_sucursal_view` `inv` ON `doc`.`idCatalogo` = `inv`.`idCatalogo` 
// LEFT JOIN `proveedores` `p` ON `oc`.`idProveedor` = `p`.`ID` 
// WHERE `inv`.`idSucursal` = '1' 
// GROUP BY `inv`.`idCatalogo` 
// ORDER BY `inv`.`Producto` DESC 

		$order = '';
        $columns = array('Producto', 'Existencias','Existencias_apartados', 'Existencias_disponibles','Faltante', 'Total_Restante','Factor','Min','Precio_publico','Nombre');
        
        $this->db->select('inv.*,('.$data['calculo'].' * Faltante) AS Factor, IF(SUM(doc.Cantidad) IS NULL,0,SUM(doc.Cantidad)) AS Total_Restante, CONCAT(p.Nombre," ",p.Apellidos) AS Proveedor, IF(oc.Status = "Aceptada" OR oc.Status = "Generada", SUM(doc.Cantidad),"Sin Aceptar o Generar") AS Aceptadas_Generadas'); 
        $this->db->from('ordenes_compra_vs oc');
        $this->db->join('detalle_orden_compra doc','oc.ID = doc.idOrden_compra');
        $this->db->join('inventario_producto_sucursal_view inv','doc.idCatalogo = inv.idCatalogo','RIGHT');
        $this->db->join('catalogo ca','inv.idCatalogo = ca.ID','LEFT');
        $this->db->join('proveedores p','ca.idProveedor = p.ID','LEFT'); 
        // $this->db->group_start();
        //     $this->db->where('oc.Status','Aceptada');
        //     $this->db->or_where('oc.Status','Generada');
        // $this->db->group_end();
        if ($data['sucursal'] != "" && $data['sucursal'] != null){$this->db->where('inv.idSucursal',$data['sucursal']);}


        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('inv.Producto', $data['search']['value']);
            $this->db->or_like('inv.Existencias', $data['search']['value']);
            $this->db->or_like('inv.Existencias_apartados', $data['search']['value']);
            $this->db->or_like('inv.Existencias_disponibles', $data['search']['value']);
            $this->db->or_like('inv.Faltante', $data['search']['value']);
            $this->db->or_like('IF(SUM(doc.Cantidad) IS NULL,0,SUM(doc.Cantidad))', $data['search']['value']);
            $this->db->or_like('('.$data['calculo'].' * Faltante)', $data['search']['value']);
            $this->db->or_like('inv.Min', $data['search']['value']);
            $this->db->or_like('inv.Precio_publico', $data['search']['value']);
            $this->db->or_like('p.Nombre', $data['search']['value']);
            $this->db->group_end();
        }

        $this->db->group_by('inv.idCatalogo'); 

        if(isset($data["order"])) {
            $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
        }
        else {
            $order .= 'inv.Producto DESC ';
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
    
        $this->db->select('inv.*,('.$data['calculo'].' * Faltante) AS Factor, IF(SUM(doc.Cantidad) IS NULL,0,SUM(doc.Cantidad)) AS Total_Restante, CONCAT(p.Nombre," ",p.Apellidos) AS Proveedor, IF(oc.Status = "Aceptada" OR oc.Status = "Generada", SUM(doc.Cantidad),"Sin Aceptar o Generar") AS Aceptadas_Generadas'); 
        $this->db->from('ordenes_compra_vs oc');
        $this->db->join('detalle_orden_compra doc','oc.ID = doc.idOrden_compra');
        $this->db->join('inventario_producto_sucursal_view inv','doc.idCatalogo = inv.idCatalogo','RIGHT');
        $this->db->join('catalogo ca','inv.idCatalogo = ca.ID','LEFT');
        $this->db->join('proveedores p','ca.idProveedor = p.ID','LEFT'); 
        // $this->db->where('oc.idCompra_avyna is null');
        // $this->db->group_start();
        //     $this->db->where('oc.Status','Aceptada');
        //     $this->db->or_where('oc.Status','Generada');
        // $this->db->group_end();
        if ($data['sucursal'] != "" && $data['sucursal'] != null){$this->db->where('inv.idSucursal',$data['sucursal']);}
        $this->db->group_by('inv.idCatalogo'); 
        $total = $this->db->count_all_results();


        $this->db->select('inv.*,('.$data['calculo'].' * Faltante) AS Factor, IF(SUM(doc.Cantidad) IS NULL,0,SUM(doc.Cantidad)) AS Total_Restante, CONCAT(p.Nombre," ",p.Apellidos) AS Proveedor, IF(oc.Status = "Aceptada" OR oc.Status = "Generada", SUM(doc.Cantidad),"Sin Aceptar o Generar") AS Aceptadas_Generadas'); 
        $this->db->from('ordenes_compra_vs oc');
        $this->db->join('detalle_orden_compra doc','oc.ID = doc.idOrden_compra');
        $this->db->join('inventario_producto_sucursal_view inv','doc.idCatalogo = inv.idCatalogo','RIGHT');
        $this->db->join('catalogo ca','inv.idCatalogo = ca.ID','LEFT');
        $this->db->join('proveedores p','ca.idProveedor = p.ID','LEFT'); 
        // $this->db->group_start();
        //     $this->db->where('oc.Status','Aceptada');
        //     $this->db->or_where('oc.Status','Generada');
        // $this->db->group_end();
        if ($data['sucursal'] != "" && $data['sucursal'] != null){$this->db->where('inv.idSucursal',$data['sucursal']);}


        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('inv.Producto', $data['search']['value']);
            $this->db->or_like('inv.Existencias', $data['search']['value']);
            $this->db->or_like('inv.Existencias_apartados', $data['search']['value']);
            $this->db->or_like('inv.Existencias_disponibles', $data['search']['value']);
            $this->db->or_like('inv.Faltante', $data['search']['value']);
            $this->db->or_like('IF(SUM(doc.Cantidad) IS NULL,0,SUM(doc.Cantidad))', $data['search']['value']);
            $this->db->or_like('('.$data['calculo'].' * Faltante)', $data['search']['value']);
            $this->db->or_like('inv.Min', $data['search']['value']);
            $this->db->or_like('inv.Precio_publico', $data['search']['value']);
            $this->db->or_like('p.Nombre', $data['search']['value']);
            $this->db->group_end();
        }

        $this->db->group_by('inv.idCatalogo'); 
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
            $dataTable[] = $row["Proveedor"];
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