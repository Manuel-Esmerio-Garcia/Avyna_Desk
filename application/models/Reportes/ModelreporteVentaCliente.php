<?php


/********************************************************************/
/***   Nombre Archivo: modelreporteVentaCliente.php               ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 20/11/2019         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

class ModelreporteVentaCliente extends CI_Model {

    /********************************************************************/
    /***   Función: __construct() 	                	              ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 20/11/2019    					                  ***/
    /***   Descripción: Constructor de la clase              	      ***/
    /********************************************************************/
	public function __construct(){
        $this->load->database();
        parent::__construct();
    }
    /********************************************************************/
	/***   Función: init() 	                				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 20/11/2019    					                  ***/
	/***   Descripción: Obtener Información de productos y promociones***/
	/********************************************************************/
    public function init(){
        
        //$this->db->limit(80);
        $this->db->select('*'); 
        $this->db->from('Catalogo');
        $query = $this->db->get();
        $response['catalogo'] = $query->result_array();

        
        $this->db->select('*'); 
        $this->db->from('Promociones');
        $query = $this->db->get();
        $response['promociones'] = $query->result_array();

        
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
    /***   Función: clickSelectedDealers() 	                          ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 21/11/2019    					                  ***/
    /***   Descripción: Buscar Clientes Menudeo                   	  ***/
    /********************************************************************/
    public function clickSelectedDealers($data){
        
        $this->db->select('*'); 
        $this->db->from('Clientes_menudeo');
        $this->db->order_by("Nombre", "asc");
        $this->db->where('idCliente',$data['idCliente']);
        $query = $this->db->get();
        $response = $query->result_array();

        return $response;
    }
    /********************************************************************/
    /***   Función: btnGenerarReporte() 	                     	  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 21/11/2019    					                  ***/
    /***   Descripción: Generar Reporte                          	  ***/
    /********************************************************************/
    public function btnGenerarReporte($data){
        if ($data['producto'] != null && $data['producto'] != ""){
            $contador = 0;
            $contador1 = 0;
            $contador2 = 0;
            $contador3 = 0;
            
            $this->db->select('V.ID AS idVenta, CA.Producto, ("") AS Promocion, CLM.*, DVM.Cantidad, CL.Nombre AS Distribuidor_Nombre, CL.Apellidos AS Distribuidor_Apellidos,V.Fecha_venta'); 
            $this->db->from('Detalle_venta_menudeo AS DVM');
            $this->db->join('Ventas_menudeo AS VM', 'DVM.idVenta_menudeo = VM.ID');
            $this->db->join('Ventas AS V', 'VM.idVenta = V.ID');
            $this->db->join('Clientes AS CL', 'V.idCliente = CL.ID');
            $this->db->join('Clientes_menudeo AS CLM', 'VM.idCliente_menudeo = CLM.ID');
            $this->db->join('Catalogo AS CA', 'DVM.idCatalogo = CA.ID','Left');
            if ($data['branch'] != "" && $data['branch'] != null){$this->db->where('CL.idSucursal',$data['branch']);}
            if ($data['valiate']){$this->db->where('V.Fecha_venta BETWEEN "'.$data["initial"].'" AND "'.$data["final"].'"');}
        
            $this->db->group_start();
            foreach ($data['producto'] as $key => $value) {
                if ($contador3 == 0) {
                    $this->db->where('DVM.idCatalogo',$value['ID']);
                    $contador3++;
                }else{
                    $this->db->or_where('DVM.idCatalogo',$value['ID']);
                }
            }
            $this->db->group_end();            
            
            // Distribuidores //
            if ($data['distribuidor'] != null && $data['distribuidor'] != ""){
                $this->db->group_start();
                foreach ($data['distribuidor'] as $key => $value) {
                    if ($contador1 == 0) {
                        $this->db->where('CL.ID',$value['ID']);
                        $contador1++;
                    }else{
                        $this->db->or_where('CL.ID',$value['ID']);
                    }
                }
                $this->db->group_end();            
            }
            // Clientes //
            if ($data['cliente'] != null && $data['cliente'] != ""){
                $this->db->group_start();
                foreach ($data['cliente'] as $key => $value) {
                    if ($contador2 == 0) {
                        $this->db->where('CLM.ID',$value['ID']);
                        $contador2++;
                    }else{
                        $this->db->or_where('CLM.ID',$value['ID']);
                    }
                }
                $this->db->group_end();            
            }
            $query = $this->db->get();

            $listInvoice  = $query->result_array();
            if ($data['promocion'] != null && $data['promocion'] != ""){
                $response2 = $this->btnGenerarReportePromo($data);
                $listInvoice = array_merge($listInvoice,$response2);
            }
            
            return $listInvoice;
        }else{
            $response = $this->btnGenerarReportePromo($data);            
            return $response;
        }
    }
    /********************************************************************/
    /***   Función: btnGenerarReportePromo()                     	  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 21/11/2019    					                  ***/
    /***   Descripción: Generar Reporte                          	  ***/
    /********************************************************************/
    public function btnGenerarReportePromo($data){
        if ($data['promocion'] != null && $data['promocion'] != ""){
            $contador = 0;
            $contador1 = 0;
            $contador2 = 0;
            $contador3 = 0;
            
            $this->db->select('V.ID AS idVenta, ("") AS Producto, PO.Promocion, CLM.*, DVM.Cantidad, CL.Nombre AS Distribuidor_Nombre, CL.Apellidos AS Distribuidor_Apellidos,V.Fecha_venta'); 
            $this->db->from('Detalle_venta_menudeo AS DVM');
            $this->db->join('Ventas_menudeo AS VM', 'DVM.idVenta_menudeo = VM.ID');
            $this->db->join('Ventas AS V', 'VM.idVenta = V.ID');
            $this->db->join('Clientes AS CL', 'V.idCliente = CL.ID');
            $this->db->join('Clientes_menudeo AS CLM', 'VM.idCliente_menudeo = CLM.ID');
            $this->db->join('Promociones AS PO', 'DVM.idPromocion = PO.ID','Left');
            if ($data['branch'] != "" && $data['branch'] != null){$this->db->where('CL.idSucursal',$data['branch']);}
            if ($data['valiate']){$this->db->where('V.Fecha_venta BETWEEN "'.$data["initial"].'" AND "'.$data["final"].'"');}
            
            $this->db->group_start();
            foreach ($data['promocion'] as $key => $value) {
                if ($contador == 0) {
                    $this->db->where('DVM.idPromocion',$value['ID']);
                    $contador++;
                }else{
                    $this->db->or_where('DVM.idPromocion',$value['ID']);
                }
            }
            $this->db->group_end();      

            // Distribuidores //
            if ($data['distribuidor'] != null && $data['distribuidor'] != ""){
                $this->db->group_start();
                foreach ($data['distribuidor'] as $key => $value) {
                    if ($contador1 == 0) {
                        $this->db->where('CL.ID',$value['ID']);
                        $contador1++;
                    }else{
                        $this->db->or_where('CL.ID',$value['ID']);
                    }
                }
                $this->db->group_end();            
            }
            // Clientes //
            if ($data['cliente'] != null && $data['cliente'] != ""){
                $this->db->group_start();
                foreach ($data['cliente'] as $key => $value) {
                    if ($contador2 == 0) {
                        $this->db->where('CLM.ID',$value['ID']);
                        $contador2++;
                    }else{
                        $this->db->or_where('CLM.ID',$value['ID']);
                    }
                }
                $this->db->group_end();            
            }
            $query = $this->db->get();

            print_r($this->db->last_query());
            $response = $query->result_array();
            
            return $response;
        }
    }
}

?>