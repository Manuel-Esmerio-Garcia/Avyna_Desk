<?php
class Empaques_Model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	public function Get_Detalle($id)
	{
		
		$this->db->select('*'); 
		$this->db->from('Empaque_general_view');
		$this->db->where('idVenta', $id);
		$query = $this->db->get();
		return $query->result_array();
	}

	public function Get_Detalle_Venta_Menudeo($id)
	{
		
		$this->db->select('*'); 
		$this->db->from('Empaques_View');
		$this->db->where('idEmpaque_general', $id);
		$query = $this->db->get();
		return $query->result_array();
	}

	public function Get_Productos($id)
	{
		
		$this->db->select('*'); 
		$this->db->from('Productos_Empaque_View');
		$this->db->where('idEmpaque', $id);
		$query = $this->db->get();
		return $query->result_array();
	}

	public function Get_GuiasEnvios($id)
	{
		
		$this->db->select('*'); 
		$this->db->from('Guias_envios');
		$this->db->where('idEmpaquegeneral', $id);
		$query = $this->db->get();
		return $query->result_array();
	}

	public function Get_GuiasDescripcion($id)
	{
		
		$this->db->select('GD.*'); 
		$this->db->from('Guias_envios AS GE');
		$this->db->join('Guia_description AS GD','GE.ID = GD.idGuiaEnvio');
		$this->db->where('GE.idEmpaquegeneral', $id);
		$query = $this->db->get();
		return $query->result_array();
	}

	public function Get_DireccionEnvioGuia($id,$tipo)
	{
		
		$this->db->select('DEG.*'); 
		$this->db->from('Guias_envios AS GE');
		$this->db->join('Guia_description AS GD','GE.ID = GD.idGuiaEnvio');
		$this->db->join('Direccion_envio_guia AS DEG','GD.ID = DEG.idGuiaDescription');
		$this->db->where('GE.idEmpaquegeneral', $id);
		$this->db->where('DEG.tipo', $tipo);
		$query = $this->db->get();
		return $query->result_array();
	}


	public function Update_Guia($data)
	{
		$this->db->trans_begin();

		$this->db->query('UPDATE Empaque_general SET Numero_guia="'.$data['Guia'].'" WHERE ID='.$data['ID'].'');

		if ($this->db->trans_status() === FALSE)
		{
		        $this->db->trans_rollback();
		        return 0;
		}
		else
		{
		        $this->db->trans_commit();
		        return 1;
		}
	}

	public function Eliminar_Empaque($data)
	{
		$this->db->trans_begin();

		$this->db->query('DELETE DE FROM Empaque_general AS EG INNER JOIN Empaques AS E ON EG.ID = E.idEmpaque_general INNER JOIN Detalle_empaque AS DE ON E.ID = DE.idEmpaque WHERE EG.idVenta ='.$data['ID']);

		$this->db->query('DELETE E FROM Empaque_general AS EG INNER JOIN Empaques AS E ON EG.ID = E.idEmpaque_general WHERE EG.idVenta ='.$data['ID']);

		$this->db->query('DELETE DEG.* from direccion_envio_guia DEG INNER JOIN guia_description GD ON DEG.idGuiaDescription = GD.ID INNER JOIN guias_envios GE ON GD.idGuiaEnvio = GE.ID INNER JOIN Empaque_general EG ON GE.idEmpaquegeneral = EG.ID WHERE EG.idVenta ='.$data['ID']);
		$this->db->query('DELETE GD.* from guia_description GD INNER JOIN guias_envios GE ON GD.idGuiaEnvio = GE.ID INNER JOIN Empaque_general EG ON GE.idEmpaquegeneral = EG.ID WHERE EG.idVenta ='.$data['ID']);
		$this->db->query('DELETE GE.* FROM guias_envios GE INNER JOIN Empaque_general EG ON GE.idEmpaquegeneral = EG.ID WHERE EG.idVenta ='.$data['ID']);


		$this->db->query('DELETE EG FROM Empaque_general AS EG WHERE EG.idVenta ='.$data['ID']);

		$this->db->query('UPDATE Ventas_menudeo SET Empaquetado = 0 WHERE idVenta='.$data['ID'].'');
		$this->db->query('UPDATE Ventas SET Empaquetado = 0 WHERE ID='.$data['ID'].'');

		if ($this->db->trans_status() === FALSE)
		{
		        $this->db->trans_rollback();
		        return 0;
		}
		else
		{
		        $this->db->trans_commit();
		        return 1;
		}
	}
}