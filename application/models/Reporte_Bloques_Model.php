<?php
class Reporte_Bloques_Model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function GetSucursales()
	{
		
        $this->db->select('*'); 
        $this->db->from('Sucursales');
        $query = $this->db->get();
        return $query->result_array();
	}

	function Get_Top_5($idSucursal)
	{
        $this->db->limit(5);
        $this->db->select('ROUND((SUM(`dvm`.`Importe`) - (SUM(`dvm`.`Importe`) * (`cl`.`Descuento_%` / 100))), 2) AS `Total_Venta_Distr`,SUM(`dvm`.`Importe`) AS `Total_Venta`,`cl`.`idBloque` AS `idBloque`,`bd`.`Bloque` AS `Bloque`,cl.idSucursal,IF((`ca`.`Division` = 51), 0, 1) AS `Validate`'); 
        $this->db->from('Ventas AS v');
        $this->db->join('Ventas_menudeo AS vm','v.ID = vm.idVenta');
        $this->db->join('Detalle_venta_menudeo AS dvm','vm.ID = dvm.idVenta_menudeo');
        $this->db->join('Catalogo AS ca','dvm.idCatalogo = ca.ID','left');
        $this->db->join('Clientes AS cl','v.idCliente = cl.ID','left');
        $this->db->join('bloques_distribuidores AS bd','cl.idBloque = bd.ID');
        $this->db->where('v.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -28 DAY) AND now()');
        $this->db->where('cl.idSucursal',$idSucursal);
        $this->db->where('IF(ca.Division = 51, 0, 1) = 1');
        $this->db->group_by('bd.ID'); 
        $this->db->order_by('Total_Venta', 'DESC'); 
        
        $query = $this->db->get();
        return $query->result_array();
	}

	public function Get_Ventas_By_ID_Bloque($id)
	{
        
        $this->db->select('*'); 
        $this->db->from('Detalle_Venta_Bloque');
        $this->db->where('idBloque',$id);
        $query = $this->db->get();
        return $query->result_array();
	}


	public function Get_Reporte_By_Cliente($id)
    {

    	$this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(NOW()) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
             $this->db->from('Ventas AS V');
            $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
            $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
            $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
            $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
            $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -28 DAY) AND NOW()');
            $this->db->where('CL.idBloque',$id);
            $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
            $this->db->group_by('CL.idBloque'); 
            $this->db->order_by('Total_Distr', 'DESC');
            //$this->db->limit(4);
            $query = $this->db->get();
            return $query->result_array();
        }

        public function Get_Reporte_By_Cliente1($id)
        {
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -28 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -56 DAY) AND date_add(NOW(), INTERVAL -28 DAY)');
                $this->db->where('CL.idBloque',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->group_by('CL.idBloque'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }


        public function Get_Reporte_By_Cliente2($id)
        {
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -56 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -84 DAY) AND date_add(NOW(), INTERVAL -56 DAY)');
                $this->db->where('CL.idBloque',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->group_by('CL.idBloque'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }

        public function Get_Reporte_By_Cliente3($id)
        {
            $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -84 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
             $this->db->from('Ventas AS V');
            $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
            $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
            $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
            $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
            $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -112 DAY) AND date_add(NOW(), INTERVAL -84 DAY)');
            $this->db->where('CL.idBloque',$id);
            $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
            $this->db->group_by('CL.idBloque'); 
            $this->db->order_by('Total_Distr', 'DESC');
            $query = $this->db->get();
            return $query->result_array();
        }

}

?>