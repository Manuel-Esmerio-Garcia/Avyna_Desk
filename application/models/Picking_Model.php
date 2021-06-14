<?php

	date_default_timezone_set('America/Mexico_City');

	class Picking_Model extends CI_Model{

		public function __construct(){
	        parent::__construct();
        }

        /********************************************************************/
        /***   Función: getExtracciones() 	           			          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/02/2020    					                  ***/
        /***   Descripción: Obtener Información de la Empresa 		      ***/
        /********************************************************************/
        public function getExtracciones($info){
            
            $this->db->select('Ventas.ID, Ventas.Fecha_venta, CONCAT(Clientes.Nombre, " ", Clientes.Apellidos) AS Distribuidor'); 
            $this->db->from('Ventas');
            $this->db->join('Clientes','Ventas.idCliente = Clientes.ID');
            $this->db->where('Ventas.Extraido = 1');
            $this->db->where('Ventas.Picking = 0');
            $this->db->where('Clientes.idSucursal',$info['branch']);
            $query = $this->db->get();
            return $query->result_array();
        }
        
        /********************************************************************/
        /***   Función: changeOrder() 	                		          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/02/2020    					                  ***/
        /***   Descripción: Acción Cambiar Extracción          		      ***/
        /********************************************************************/
        public function changeOrder($info){
            
            $this->db->select('Detalle_venta_menudeo_temp.ID, Locaciones.Locacion, Catalogo.Codigo, Catalogo.Producto, Detalle_venta_menudeo_temp.Cantidad'); 
            $this->db->from('Detalle_venta_menudeo_temp');
            $this->db->join('Ventas_menudeo','Detalle_venta_menudeo_temp.idVenta_menudeo = Ventas_menudeo.ID');
            $this->db->join('Detalle_inventario','Detalle_venta_menudeo_temp.idDetalle_inventario = Detalle_inventario.ID');
            $this->db->join('Locaciones','Detalle_inventario.idLocacion = Locaciones.ID');
            $this->db->join('Catalogo','Detalle_venta_menudeo_temp.idCatalogo = Catalogo.ID');
            $this->db->where('Ventas_menudeo.idVenta',$info['order']);
            $query = $this->db->get();
            return $query->result_array();
        }

        /********************************************************************/
        /***   Función: realizarPicking() 	                	          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 06/02/2020    					                  ***/
        /***   Descripción: Acción Realizar Picking          		      ***/
        /********************************************************************/
        public function realizarPicking($info){
            $this->db->trans_start();
            $this->db->trans_strict(FALSE);

            $this->db->where("ID", $info['idOrder']);
            $this->db->set('Picking', 1);
            $this->db->update('Ventas');

            $this->db->trans_complete();

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
        /***   Función: searchProducts() 	                	          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 06/02/2020    					                  ***/
        /***   Descripción: Acción Buscar Productos         		      ***/
        /********************************************************************/
        public function searchProducts($info){
            
            $this->db->select('Detalle_venta_menudeo_temp.ID, Locaciones.Locacion, Catalogo.Codigo, Catalogo.Producto, Detalle_venta_menudeo_temp.Cantidad'); 
            $this->db->from('Detalle_venta_menudeo_temp');
            $this->db->join('Ventas_menudeo','Detalle_venta_menudeo_temp.idVenta_menudeo = Ventas_menudeo.ID');
            $this->db->join('Detalle_inventario','Detalle_venta_menudeo_temp.idDetalle_inventario = Detalle_inventario.ID');
            $this->db->join('Locaciones','Detalle_inventario.idLocacion = Locaciones.ID');
            $this->db->join('Catalogo','Detalle_venta_menudeo_temp.idCatalogo = Catalogo.ID');
            $this->db->group_start();
            $this->db->like('Catalogo.Codigo', $info['search']);
            $this->db->group_end();
            $this->db->where('Ventas_menudeo.idVenta',$info['order']);
            $query = $this->db->get();
            return $query->result_array();
        }
    }

?>