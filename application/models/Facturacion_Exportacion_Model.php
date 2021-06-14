<?php
/********************************************************************/
/***   Nombre Archivo: InvoicingModel.php	       			      ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 01/11/2019         					      ***/
/***   Proyecto: Prosalon_Desk 					                  ***/
/********************************************************************/

date_default_timezone_set('America/Mexico_City');

class Facturacion_Exportacion_Model extends CI_Model 
{
    public function __construct() 
    {
        $this->load->database();
        parent::__construct();
    }

    /********************************************************************/
	/***   Función: init() 	                				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 01/11/2019    					                  ***/
	/***   Descripción: Obtener Información de la Empresa 		      ***/
    /********************************************************************/
    public function init(){
        $this->db->reconnect();
        $this->db->select('*'); 
        $this->db->from('empresa');
        $this->db->where('ID', $_SESSION['Avyna'][0]['Empresa']);
        $query = $this->db->get();
        return $query->result_array();
    }
    /********************************************************************/
	/***   Función: getDetailsInvoice() 	            	          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 01/11/2019    					                  ***/
	/***   Descripción: Obtener Información Facturas By idVenta       ***/
	/********************************************************************/
	public function getDetailsInvoice($info){
		$this->db->reconnect();
        $this->db->select('FA.*, V.Cliente, V.RFC'); 
        $this->db->from('FacturaCCE AS FA');
        $this->db->join('Ventas_List_View AS V','FA.IDVenta = V.ID');
        $this->db->where('FA.IDVenta', $info['idVenta']);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function getInfoDetails($info){
        $this->db->reconnect();
        $this->db->select('DVM.*, CA.Codigo, CA.Producto, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT, DI.Pedimento'); 
        $this->db->from('detalle_venta_menudeo_temp AS DVM');
        $this->db->join('ventas_menudeo AS DV','DVM.idVenta_menudeo = DV.ID');
        $this->db->join('detalle_inventario AS DI','DVM.idDetalle_inventario = DI.ID');
        $this->db->join('inventario AS PIN','DI.idInventario = PIN.ID');
        $this->db->join('Catalogo AS CA','PIN.idCatalogo = CA.ID');
        $this->db->where('DV.idVenta', $info['idVenta']);
        $query = $this->db->get();
        $response =  $query->result_array();

        return $response;
    }


    public function getInvoiceByID($idFactura){
        $this->db->select('*'); 
        $this->db->from('FacturaCCE');
        $this->db->where('ID', $idFactura);
        $query = $this->db->get();
        return  $query->result_array();
    }

    public function searchUMT($fraccion){
        $this->db->select('*'); 
        $this->db->from('c_fraccionarancelaria');
        $this->db->where('c_FraccionArancelaria', $fraccion);
        $query = $this->db->get();
        return  $query->result_array();
    }
    /********************************************************************/
	/***   Función: btnInvoiceSale() 	           				      ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 01/11/2019    					                  ***/
	/***   Descripción: Abrir Modal Facturar Venta  y Obtener         ***/
	/***   Información para mostrar en la modal de la factura         ***/                 
	/********************************************************************/
	public function btnInvoiceSale($info){
        $this->db->select('*'); 
        $this->db->from('Ventas_List_View');
        $this->db->where('ID', $info['idVenta']);
        $query = $this->db->get();
        $response['Sale'] =  $query->result_array();

        $this->db->reconnect();
        $this->db->select('DVM.*, SUM(DVM.Cantidad) AS Cantidad_Real, CA.Codigo, CA.Producto, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT, DI.Pedimento, ("") AS Fraccion, ("") AS UMT'); 
        $this->db->from('Detalle_venta_menudeo_temp AS DVM');
        $this->db->join('Ventas_menudeo AS DV','DVM.idVenta_menudeo = DV.ID');
        $this->db->join('Detalle_inventario AS DI','DVM.idDetalle_inventario = DI.ID');
        $this->db->join('Inventario AS PIN','DI.idInventario = PIN.ID');
        $this->db->join('Catalogo AS CA','PIN.idCatalogo = CA.ID');
        $this->db->where('DVM.idCatalogo IS NOT NULL');
        $this->db->where('DV.idVenta', $info['idVenta']);
        $this->db->group_by("DVM.idCatalogo");
        $query = $this->db->get();
        $response['DetailSale'] =  $query->result_array();


        $this->db->reconnect();
        $this->db->select('CL.*'); 
        $this->db->from('Clientes AS CL');
        $this->db->join('Ventas AS V','CL.ID = V.idCliente');
        $this->db->where('V.ID', $info['idVenta']);
        $query = $this->db->get();
        $response['Client'] =  $query->result_array();

        $this->db->reconnect();
        $this->db->select('*'); 
        $this->db->from('Monedas');
        $this->db->where('Status', 'Activo');
        $query = $this->db->get();
        $response['Currency'] =  $query->result_array();

        return $response;
    }
    /********************************************************************/
	/***   Función: changeRelateCFDi() 	           				      ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 04/11/2019    					                  ***/
	/***   Descripción: Acción Mostrar CFDi's Relacionados            ***/
	/***   Obtener el listado de los CFDi's sin relación              ***/
	/********************************************************************/
	public function changeRelateCFDi($info){
		$this->db->reconnect();
        $this->db->select('FA.*, (0) AS Relate'); 
        $this->db->from('Pro_clientes AS CL');
        $this->db->join('Pro_ventas AS V','CL.ID = V.idPro_cliente');
        $this->db->join('Pro_factura AS FA','V.ID = FA.idPro_venta');
        $this->db->where('FA.Relacion', 0);
        $this->db->where('FA.Status', 'Cancelado');
        $this->db->where('CL.ID', $info['idCliente']);
        $query    = $this->db->get();
        $response =  $query->result_array();
        
        return $response;
    }
    /********************************************************************/
	/***   Función: btnFacturar() 	           				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 04/11/2019    					                  ***/
	/***   Descripción: Acción Facturar Venta de Ingreso              ***/
	/********************************************************************/
    public function btnFacturar($info,$relate,$Detail){
        $this->db->trans_start(); # Starting Transaction
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->insert('FacturaCCE', $info); # Inserting data
        $insert_id = $this->db->insert_id();

					foreach ($Detail as $key => $value) {
                        $Factura_Detalle = array('idFacturaCCE' => $insert_id,
                                                'idCatalogo' => $value['idCatalogo'],
                                                'Codigo' => $value['Codigo'],
                                                'Producto' => $value['Producto'],
                                                'Cantidad' => $value['Cantidad'],
                                                'Precio_Unitario' => $value['Precio_unitario'],
                                                'Importe' => $value['Importe'],
                                                'Fraccion_Arancelaria' => $value['Fraccion']);

                        $this->db->insert('DetalleFacturaCCE', $Factura_Detalle); # Inserting data
                    }
                    
        # Updating data
        $this->db->where('ID', $info['idVenta']);
        $this->db->set('Timbrado',1);
        $this->db->update('ventas'); 

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
    /********************************************************************/
	/***   Función: btnCancelarFactura() 	           				  ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 04/11/2019    					                  ***/
	/***   Descripción: Acción Cancelar Facturar Venta de Ingreso     ***/
	/********************************************************************/
    public function btnCancelarFactura($info){
        $this->db->trans_start(); # Starting Transaction
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well

        $Sale = $this->getInvoiceByID($info['idFactura']);
        
        $this->db->where('ID',$info['idFactura']);
        $this->db->set('Status','Cancelado');
        $this->db->update('FacturaCCE');
    
        $this->db->where('ID',$Sale[0]['idVenta']);
        $this->db->set('Timbrado',0);
        $this->db->update('ventas');
        
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
    /********************************************************************/
	/***   Función: fetchSale() 	                				  ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 01/11/2019    					                  ***/
	/***   Descripción: Cargar DataTable fetchSale 		 		      ***/
	/********************************************************************/
	public function fetchSale($data){
		$order = '';
        $columns = array('ID', 'Fecha','Cliente', 'Cantidad_productos','Total','Adeudo','Status');
                                        
        $this->db->reconnect();
        $this->db->select('*'); 
        $this->db->from('Ventas_List_View');
        $this->db->where('Timbrado',0);

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('ID', $data['search']['value']);
            $this->db->or_like('Fecha', $data['search']['value']);
            $this->db->or_like('Cliente', $data['search']['value']);
            $this->db->or_like('Cantidad_productos', $data['search']['value']);
            $this->db->or_like('Total', $data['search']['value']);
            $this->db->or_like('Adeudo', $data['search']['value']);
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
        $this->db->from('Ventas_List_View');
        $this->db->where('Timbrado',0);
        $total = $this->db->count_all_results();

        $this->db->select('*'); 
        $this->db->from('Ventas_List_View');
        $this->db->where('Timbrado',0);

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('ID', $data['search']['value']);
            $this->db->or_like('Fecha', $data['search']['value']);
            $this->db->or_like('Cliente', $data['search']['value']);
            $this->db->or_like('Cantidad_productos', $data['search']['value']);
            $this->db->or_like('Total', $data['search']['value']);
            $this->db->or_like('Adeudo', $data['search']['value']);
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
            $dataTable[] = $row["Fecha"];
            $dataTable[] = $row["Cliente"];
            $dataTable[] = $row["Cantidad_productos"];
            $dataTable[] = $row["Total"];
            $dataTable[] = $row["Adeudo"];
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
    /********************************************************************/
	/***   Función: fetchInvoice() 	                				  ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 01/11/2019    					                  ***/
	/***   Descripción: Cargar DataTable fetchInvoice	 		      ***/
	/********************************************************************/
	public function fetchInvoice($data){
		$order = '';
        $columns = array('ID', 'idVenta', 'Fecha','Cliente', 'Cantidad_productos','Total','Status');
                                        
        $this->db->reconnect();
        $this->db->select('*'); 
        $this->db->from('Facturas_List_View');

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('ID', $data['search']['value']);
            $this->db->or_like('idVenta', $data['search']['value']);
            $this->db->or_like('Fecha', $data['search']['value']);
            $this->db->or_like('Cliente', $data['search']['value']);
            $this->db->or_like('Cantidad_productos', $data['search']['value']);
            $this->db->or_like('Total', $data['search']['value']);
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
        $this->db->from('Facturas_List_View');
        $total = $this->db->count_all_results();

        $this->db->select('*'); 
        $this->db->from('Facturas_List_View');

        if($data["search"]["value"] !== ''){
            $this->db->group_start();
            $this->db->like('ID', $data['search']['value']);
            $this->db->or_like('idVenta', $data['search']['value']);
            $this->db->or_like('Fecha', $data['search']['value']);
            $this->db->or_like('Cliente', $data['search']['value']);
            $this->db->or_like('Cantidad_productos', $data['search']['value']);
            $this->db->or_like('Total', $data['search']['value']);
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
            $dataTable[] = $row["idVenta"];
            $dataTable[] = $row["Fecha"];
            $dataTable[] = $row["Cliente"];
            $dataTable[] = $row["Cantidad_productos"];
            $dataTable[] = $row["Total"];
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