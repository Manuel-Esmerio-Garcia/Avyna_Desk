<?php
class Reporte_Semanal_Model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

        public function Get_Reporte_By_Cliente($id)
        {
                
                $this->db->select('*'); 
                $this->db->from('Ventas');
                $this->db->where('idCliente',$id);
                $this->db->order_by('ID', 'DESC'); 
                $this->db->limit(50);
                $query = $this->db->get();
                return $query->result_array();
        }

	function Get_Top_5($idSucursal)
	{
        $this->db->distinct();
        $this->db->select('SUM(V.Total) AS Total_Distr, SUM(V.Total + V.Descuento) AS Total, CONCAT(CL.Nombre," " ,CL.Apellidos) AS Cliente, CL.ID'); 
        $this->db->from('Ventas AS V');
        $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
        $this->db->where('CL.ID != 1575 AND CL.ID != 1576 AND CL.ID != 1574 AND CL.ID != 1577');
        $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -7 DAY) AND now()');
        $this->db->where('CL.idSucursal',$idSucursal);
        $this->db->group_by('V.idCliente'); 
        $this->db->order_by('SUM(V.Total)', 'DESC'); 
        $this->db->limit(5);
        $query = $this->db->get();
        return $query->result_array();
	}

        public function Get_Ventas($id)
        {
                
                $this->db->select('*'); 
                $this->db->from('ventasxdistribuidoressemanales');
                $this->db->where('idSucursal',$id);
                $query = $this->db->get();
                return $query->result_array();
        }

	public function Get_Ventas_By_ID_Cliente($id)
	{
                
                $this->db->select('*'); 
                $this->db->from('Detalle_Venta_Semanal');
                $this->db->where('ID_Cliente',$id);
                $query = $this->db->get();
                return $query->result_array();
	}

	public function Get_Semana1($id)
	{
		
                $this->db->select('SUM(V.Total + V.Descuento) AS Total'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('CL.idSucursal',$id);
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -7 DAY) AND now()');
        
        $query = $this->db->get();
        return $query->result_array();
	}

	public function Get_Semana2($id)
	{
		
                $this->db->select('SUM(V.Total + V.Descuento) AS Total'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('CL.idSucursal',$id);
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -14 DAY) AND date_add(NOW(), INTERVAL -7 DAY)');
        
        $query = $this->db->get();
        return $query->result_array();
	}

	public function Get_Semana3($id)
	{
		
                $this->db->select('SUM(V.Total + V.Descuento) AS Total'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('CL.idSucursal',$id);
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -21 DAY) AND date_add(NOW(), INTERVAL -14 DAY)');
        
        $query = $this->db->get();
        return $query->result_array();
	}

	public function Get_Semana4($id)
	{
		
        $this->db->select('SUM(V.Total + V.Descuento) AS Total'); 
        $this->db->from('Ventas AS V');
        $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
        $this->db->where('CL.idSucursal',$id);
        $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -28 DAY) AND date_add(NOW(), INTERVAL -21 DAY)');
        
        $query = $this->db->get();
        return $query->result_array();
	}

	function GetSucursales()
	{
		
        $this->db->select('*'); 
        $this->db->from('Sucursales');
        $query = $this->db->get();
        return $query->result_array();
	}
}

?>