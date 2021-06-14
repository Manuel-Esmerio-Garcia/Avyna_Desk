<?php


/********************************************************************/
/***   Nombre Archivo: ModelreporteSalones.php                    ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 10/01/2020         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

class ModelreporteSalones extends CI_Model {

    /********************************************************************/
    /***   Función: __construct() 	                	              ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 10/01/2020    					                  ***/
    /***   Descripción: Constructor de la clase              	      ***/
    /********************************************************************/
	public function __construct(){
        $this->load->database();
        parent::__construct();
    }
    /********************************************************************/
	/***   Función: init() 	                				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 10/01/2020    					                  ***/
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

        $contador = 0;
        $contador1 = 0;
        $contador2 = 0;
        $contador3 = 0;

        
        $this->db->select('*'); 
        $this->db->from('report_lounge_view');
        if ($data['branch'] != "" && $data['branch'] != null){$this->db->where('idSucursal',$data['branch']);}          
        
        // Distribuidores //
        if ($data['distribuidor'] != null && $data['distribuidor'] != ""){
            $this->db->group_start();
            foreach ($data['distribuidor'] as $key => $value) {
                if ($contador1 == 0) {
                    $this->db->where('ID',$value['ID']);
                    $contador1++;
                }else{
                    $this->db->or_where('ID',$value['ID']);
                }
            }
            $this->db->group_end();            
        }
        // Clientes //
        if ($data['cliente'] != null && $data['cliente'] != ""){
            $this->db->group_start();
            foreach ($data['cliente'] as $key => $value) {
                if ($contador2 == 0) {
                    $this->db->where('idCliente',$value['ID']);
                    $contador2++;
                }else{
                    $this->db->or_where('idCliente',$value['ID']);
                }
            }
            $this->db->group_end();            
        }

        $this->db->order_by('idCliente', 'ASC ');
        $query = $this->db->get();
        
        $listInvoice  = $query->result_array();
        return $listInvoice;
    }
   
}

?>