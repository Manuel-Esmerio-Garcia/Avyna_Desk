<?php
class Reporte_Venta_Model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function getallVentas()
	{
		$allventas = null;

		try
		{
			
			$this->db->select("*"); 
			$this->db->from('Reporte_Vetas');
			//$this->db->limit(15);
			$query = $this->db->get();
			$result = $query->result_array();
			$allventas = $result;
		}
		catch(Exception $er)
		{
			$allventas = null;
		}
		return $allventas;
	}

	function getallVentasMenudeo()
	{
		$allventasmenudeo = null;

		try
		{
			
			$this->db->select("VM.ID,  CONCAT(CL.Nombre,' ',CL.Apellidos) as Cliente, VM.Subtotal, VM.Impuestos, VM.Total, VM.Status, VM.Fecha_venta"); 
			$this->db->from('Ventas_menudeo as VM');
			$this->db->join('Clientes_menudeo as CL', 'VM.idCliente_menudeo = CL.ID');
			//$this->db->limit(15);
			$query = $this->db->get();
			$result = $query->result_array();
			$allventasmenudeo = $result;
		}
		catch(Exception $er)
		{
			$allventasmenudeo = null;
		}
		return $allventasmenudeo;	
	}

	function getallVentasbyID($id)
	{
		$allventasbyid = null;

		try
		{
			
			$this->db->select("VM.*, CONCAT(CL.Nombre, ' ' ,CL.Apellidos) AS Cliente"); 
			$this->db->from('Ventas_menudeo as VM');
			$this->db->join('Clientes_menudeo as CL', 'VM.idCliente_menudeo = CL.ID');
			$this->db->where('idVenta',$id);
			//$this->db->limit(15);
			$query = $this->db->get();
			$result = $query->result_array();
			$allventasbyid = $result;
		}
		catch(Exception $er)
		{
			$allventasbyid = null;
		}
		return $allventasbyid;	
	}

	function getallVentasMenudeobyID($id)
	{
		$allventasmenudeobyid = null;

		try
		{
			
			$this->db->select('VM.ID, DVM.Cantidad, DVM.Precio_unitario, DVM.Importe, CA.Codigo, CA.Producto'); 
			$this->db->from('Ventas_menudeo AS VM');
			$this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
			$this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID');
			$this->db->where('VM.ID',$id);
			//$this->db->limit(15);
			$query = $this->db->get();
			$result = $query->result_array();
			$allventasmenudeobyid = $result;
		}
		catch(Exception $er)
		{
			$allventasmenudeobyid = null;
		}
		return $allventasmenudeobyid;
	}

	function getReporteMenudeo($id)
	{
		$ReporteMenudeo = null;

		try
		{
			
			$this->db->select('CL.*, VM.ID, VM.Descuento, VM.Subtotal, VM.Impuestos, VM.Total, VM.Total_desc, VM.Adeudo, VM.Fecha_entrega, VM.Fecha_venta, DVM.Cantidad, DVM.Precio_unitario, DVM.Importe, CA.Codigo, CA.Producto'); 
			$this->db->from('Ventas_menudeo AS VM');
			$this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
			$this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID');
			$this->db->join('Clientes_menudeo as CL','VM.idCliente_menudeo = CL.ID');
			$this->db->where('VM.ID',$id);
			//$this->db->limit(15);
			$query = $this->db->get();
			$result = $query->result_array();
			$ReporteMenudeo = $result;
		}
		catch(Exception $er)
		{
			$ReporteMenudeo = null;
		}
		return $ReporteMenudeo;
	}



	/*Filtrado del reporte*/

	function getgroupbysucursal()
	{
		$sucursalgroupby = null;

		try
		{
			
			$this->db->select("*"); 
			$this->db->from('Sucursales');
			$this->db->group_by('Sucursal');
			$query = $this->db->get();
			$result = $query->result_array();
			$sucursalgroupby = $result;
		}
		catch(Exception $er)
		{
			$sucursalgroupby = null;
		}
		return $sucursalgroupby;
	}

	function getgroupbystatus()
	{
		$ventasgroupby = null;

		try
		{
			
			$this->db->select("*"); 
			$this->db->from('Ventas');
			$this->db->group_by('Status');
			$query = $this->db->get();
			$result = $query->result_array();
			$ventasgroupby = $result;
		}
		catch(Exception $er)
		{
			$ventasgroupby = null;
		}
		return $ventasgroupby;
	}

	function getgroupbystatusMenudeo(){
		
		$ventasgroupby = null;

		try
		{
			
			$this->db->select("Status"); 
			$this->db->from('Ventas_menudeo');
			$this->db->group_by('Status');
			$query = $this->db->get();
			$result = $query->result_array();
			$ventasgroupby = $result;
		}
		catch(Exception $er)
		{
			$ventasgroupby = null;
		}
		return $ventasgroupby;
	}


	function getallDetalleVentas($id){


		$detalleventas = null;

		try
		{
			
			$this->db->select("CA.ID, CA.Codigo, CA.Producto, DVM.Cantidad, DVM.Precio_unitario, DVM.Importe, V.Descuento, V.Subtotal, V.Impuestos, V.Total, VM.Descuento as Descuento_Menudeo, VM.Subtotal as Subtotal_Menudeo, VM.Impuestos as Impuestos_Menudeo, VM.Total as Total_Menudeo"); 
			$this->db->from('Ventas AS V');
			$this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
			$this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
			$this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID');
			$this->db->where('V.ID',$id);
			$query = $this->db->get();
			$result = $query->result_array();
			$detalleventas = $result;
		}
		catch(Exception $er)
		{
			$detalleventas = null;
		}
		return $detalleventas;
	}

}

?>