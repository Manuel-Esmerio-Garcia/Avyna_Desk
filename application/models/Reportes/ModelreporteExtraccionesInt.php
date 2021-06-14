<?php


/********************************************************************/
/***   Nombre Archivo: ModelreporteExtraccionesInt.php            ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 25/02/2020         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

class ModelreporteExtraccionesInt extends CI_Model {

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
        $this->db->from('Sucursales');
        $query = $this->db->get();
        $response = $query->result_array();
        return $response;
    }

    public function getExtracciones($info){
        
        $this->db->select('EX.ID, EX.Cantidad, EX.Fecha_hora, CONCAT(U.Nombre, " ", U.Apellidos) AS Usuario, II.Producto, DII.Locacion, DII.Lote'); 
        $this->db->from('extracciones_inventario_interno AS EX');
        $this->db->join('Usuarios AS U','EX.idUsuario = U.ID');
        $this->db->join('detalle_inventario_interno AS DII','EX.idDetalle_inventario_interno = DII.ID');
        $this->db->join('inventario_interno AS II', 'DII.idInventarioInterno = II.ID');
        $this->db->where('II.idSucursal', $info['branch']);
        $query = $this->db->get();
        $response = $query->result_array();
        return $response;
    }
}

?>