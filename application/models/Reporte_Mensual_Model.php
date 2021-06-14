<?php
class Reporte_Mensual_Model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

        public function Get_Reporte_By_Cliente($id)
        {
                /*$this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(NOW()) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -28 DAY) AND NOW()');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 0');
                //$this->db->where('v.Adeudo <= 0');
                //$this->db->where('vm.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query2 = $this->db->get();
                $query2->result_array();

                if ($query2->num_rows() == 0) {
                    
                    $Total_Mes = 0;
                }
                else
                {
                    foreach($query2->result_array() AS $row)
                    {
                        $Total_Mes = $row['Total_Mes'];
                    }
                }

                $this->db->select('(SUM(V.Total + V.Descuento) - '.$Total_Mes.') AS Total_Mes, MONTHNAME(NOW()) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -28 DAY) AND now()');
                //$this->db->where('V.Adeudo <= 0');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');
                $query = $this->db->get();
                $query->result_array();
                return $query->result_array();*/

                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(NOW()) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -28 DAY) AND NOW()');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('v.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('vm.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }

        public function Get_Reporte_By_Cliente1($id)
        {
            $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -28 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -56 DAY) AND date_add(NOW(), INTERVAL -28 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();

            /*$this->db->select('SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -28 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -56 DAY) AND date_add(NOW(), INTERVAL -28 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 0');
                $this->db->group_by('V.idCliente');
                //$this->db->limit(4);
                $query2 = $this->db->get();
                $query2->result_array();

                if ($query2->num_rows() == 0) {
                    
                    $Total_Mes = 0;
                }
                else
                {
                    foreach($query2->result_array() AS $row)
                    {
                        $Total_Mes = $row['Total_Mes'];
                    }
                }

                $this->db->select('(SUM(V.Total + V.Descuento) - '.$Total_Mes.') AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -28 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -56 DAY) AND date_add(NOW(), INTERVAL -28 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');
                $query = $this->db->get();
                $query->result_array();
                return $query->result_array();*/
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -28 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -56 DAY) AND date_add(NOW(), INTERVAL -28 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                /*$this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -28 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -56 DAY) AND date_add(NOW(), INTERVAL -28 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();*/
        }


        public function Get_Reporte_By_Cliente2($id)
        {

             $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -56 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -84 DAY) AND date_add(NOW(), INTERVAL -56 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();

            /*$this->db->select('SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -56 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -84 DAY) AND date_add(NOW(), INTERVAL -56 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 0');
                $this->db->group_by('V.idCliente');
                //$this->db->limit(4);
                $query2 = $this->db->get();
                $query2->result_array();

                if ($query2->num_rows() == 0) {
                    
                    $Total_Mes = 0;
                }
                else
                {
                    foreach($query2->result_array() AS $row)
                    {
                        $Total_Mes = $row['Total_Mes'];
                    }
                }

                $this->db->select('(SUM(V.Total + V.Descuento) - '.$Total_Mes.') AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -56 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -84 DAY) AND date_add(NOW(), INTERVAL -56 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');
                $query = $this->db->get();
                $query->result_array();
                return $query->result_array();*/

                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -56 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -84 DAY) AND date_add(NOW(), INTERVAL -56 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                /*$this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -56 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -84 DAY) AND date_add(NOW(), INTERVAL -56 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();*/
        }

        public function Get_Reporte_By_Cliente3($id)
        {

            $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -84 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -112 DAY) AND date_add(NOW(), INTERVAL -84 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();

            /*$this->db->select('SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -84 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -112 DAY) AND date_add(NOW(), INTERVAL -84 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 0');
                $this->db->group_by('V.idCliente');
                //$this->db->limit(4);
                $query2 = $this->db->get();
                $query2->result_array();

                if ($query2->num_rows() == 0) {
                    
                    $Total_Mes = 0;
                }
                else
                {
                    foreach($query2->result_array() AS $row)
                    {
                        $Total_Mes = $row['Total_Mes'];
                    }
                }

                $this->db->select('(SUM(V.Total + V.Descuento) - '.$Total_Mes.') AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -84 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -112 DAY) AND date_add(NOW(), INTERVAL -84 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');
                $query = $this->db->get();
                $query->result_array();
                return $query->result_array();*/

                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -84 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -112 DAY) AND date_add(NOW(), INTERVAL -84 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                /*$this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -84 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -112 DAY) AND date_add(NOW(), INTERVAL -84 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                $query = $this->db->get();
                return $query->result_array();*/
        }

        public function Get_Reporte_By_Cliente4($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -112 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -140 DAY) AND date_add(NOW(), INTERVAL -112 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -112 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -140 DAY) AND date_add(NOW(), INTERVAL -112 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }

        public function Get_Reporte_By_Cliente5($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -140 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -168 DAY) AND date_add(NOW(), INTERVAL -140 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -140 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -168 DAY) AND date_add(NOW(), INTERVAL -140 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }

        public function Get_Reporte_By_Cliente6($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -168 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -196 DAY) AND date_add(NOW(), INTERVAL -168 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -168 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -196 DAY) AND date_add(NOW(), INTERVAL -168 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }

        public function Get_Reporte_By_Cliente7($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -196 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -224 DAY) AND date_add(NOW(), INTERVAL -196 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -196 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -224 DAY) AND date_add(NOW(), INTERVAL -196 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }

        public function Get_Reporte_By_Cliente8($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -224 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -252 DAY) AND date_add(NOW(), INTERVAL -224 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -224 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -252 DAY) AND date_add(NOW(), INTERVAL -224 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }

        public function Get_Reporte_By_Cliente9($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -252 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -280 DAY) AND date_add(NOW(), INTERVAL -252 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -252 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -280 DAY) AND date_add(NOW(), INTERVAL -252 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }

        public function Get_Reporte_By_Cliente10($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -280 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -308 DAY) AND date_add(NOW(), INTERVAL -280 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -280 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -308 DAY) AND date_add(NOW(), INTERVAL -280 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }
        public function Get_Reporte_By_Cliente11($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -308 DAY)) AS Mes, V.*,(((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -336 DAY) AND date_add(NOW(), INTERVAL -308 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -308 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -336 DAY) AND date_add(NOW(), INTERVAL -308 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }
        public function Get_Reporte_By_Cliente12($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -336 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -364 DAY) AND date_add(NOW(), INTERVAL -336 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/

                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -336 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -364 DAY) AND date_add(NOW(), INTERVAL -336 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }
        public function Get_Reporte_By_Cliente13($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -364 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -392 DAY) AND date_add(NOW(), INTERVAL -364 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -364 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -392 DAY) AND date_add(NOW(), INTERVAL -364 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }
        public function Get_Reporte_By_Cliente14($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -392 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -420 DAY) AND date_add(NOW(), INTERVAL -392 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -392 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -420 DAY) AND date_add(NOW(), INTERVAL -392 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }
        public function Get_Reporte_By_Cliente15($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -420 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -448 DAY) AND date_add(NOW(), INTERVAL -420 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -420 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -448 DAY) AND date_add(NOW(), INTERVAL -420 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }
        public function Get_Reporte_By_Cliente16($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -448 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -476 DAY) AND date_add(NOW(), INTERVAL -448 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -448 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -476 DAY) AND date_add(NOW(), INTERVAL -448 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }
        public function Get_Reporte_By_Cliente17($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -476 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -504 DAY) AND date_add(NOW(), INTERVAL -476 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC');*/ 
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -476 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -504 DAY) AND date_add(NOW(), INTERVAL -476 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }
        public function Get_Reporte_By_Cliente18($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -504 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -532 DAY) AND date_add(NOW(), INTERVAL -504 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC'); */
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -504 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -532 DAY) AND date_add(NOW(), INTERVAL -504 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }
        public function Get_Reporte_By_Cliente19($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -532 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -560 DAY) AND date_add(NOW(), INTERVAL -532 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC'); */
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -532 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -560 DAY) AND date_add(NOW(), INTERVAL -532 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC');
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }
        public function Get_Reporte_By_Cliente20($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -560 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -588 DAY) AND date_add(NOW(), INTERVAL -560 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC'); */

                $this->db->distinct();
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -560 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -588 DAY) AND date_add(NOW(), INTERVAL -560 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC'); 
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }
        public function Get_Reporte_By_Cliente21($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -588 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -616 DAY) AND date_add(NOW(), INTERVAL -588 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC'); */
                //$this->db->limit(4);

                $this->db->distinct();
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -588 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -616 DAY) AND date_add(NOW(), INTERVAL -588 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC'); 
                $query = $this->db->get();
                return $query->result_array();
        }
        public function Get_Reporte_By_Cliente22($id)
        {
                /*$this->db->distinct();
                $this->db->select('SUM(V.Total + V.Descuento) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -616 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Fecha_ingreso)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -644 DAY) AND date_add(NOW(), INTERVAL -616 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('SUM(V.Total)', 'DESC'); */

                $this->db->distinct();
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -616 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -644 DAY) AND date_add(NOW(), INTERVAL -616 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC'); 
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }
        public function Get_Reporte_By_Cliente23($id)
        {
                $this->db->distinct();
                $this->db->select('ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, SUM(DVM.Importe) AS Total_Mes, MONTHNAME(date_add(NOW(), INTERVAL -644 DAY)) AS Mes, V.*, (((CL.Cuota_Final-CL.Cuota_Inicial)/CL.Meses_Cuota)*((TIMESTAMPDIFF(MONTH, V.Fecha_venta, CL.Banderazo)*-1)))+CL.Cuota_Inicial AS Cuota_Final'); 
                 $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -672 DAY) AND date_add(NOW(), INTERVAL -644 DAY)');
                $this->db->where('CL.ID',$id);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->where('V.Adeudo <= 0');
                $this->db->where('V.Extraido = 1');
                $this->db->where('VM.Tipo_app <>"Website"');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC'); 
                //$this->db->limit(4);
                $query = $this->db->get();
                return $query->result_array();
        }


	function Get_Top_5($idSucursal)
	{

                $this->db->limit(5);
                $this->db->select(' ROUND((sum(DVM.Importe)) - (sum(DVM.Importe) * (CL.`Descuento_%` / 100)),2) AS Total_Distr, sum(DVM.Importe) AS Total, CONCAT(CL.Nombre," " ,CL.Apellidos) AS Cliente, CL.ID'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('CL.ID != 1575 AND CL.ID != 1576 AND CL.ID != 1574 AND CL.ID != 1577');
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -28 DAY) AND now()');
                $this->db->where('CL.idSucursal',$idSucursal);
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
                $this->db->group_by('V.idCliente'); 
                $this->db->order_by('Total_Distr', 'DESC'); 
                
                $query = $this->db->get();
                return $query->result_array();
	}

        public function Get_Ventas($id,$idBloque)
        {
                
                $this->db->select('*'); 
                $this->db->from('ventasxdistribuidoresmensual');
                $this->db->where('idSucursal',$id);
                $this->db->where('idBloque',$idBloque);
                $query = $this->db->get();
                return $query->result_array();
        }

	public function Get_Ventas_By_ID_Cliente($id)
	{
                
                $this->db->select('*'); 
                $this->db->from('Detalle_Venta_Mensual');
                $this->db->where('ID_Cliente',$id);
                $query = $this->db->get();
                return $query->result_array();
	}

	public function Get_Semana1($id)
	{
		
                $this->db->select('SUM(DVM.Importe) AS Total'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('CL.idSucursal',$id);
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -28 DAY) AND now()');
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
        
        $query = $this->db->get();
        return $query->result_array();
	}

	public function Get_Semana2($id)
	{
		
                $this->db->select('SUM(DVM.Importe) AS Total'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('CL.idSucursal',$id);
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -56 DAY) AND date_add(NOW(), INTERVAL -28 DAY)');
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
        
        $query = $this->db->get();
        return $query->result_array();
	}

	public function Get_Semana3($id)
	{
		
                $this->db->select('SUM(DVM.Importe) AS Total'); 
                $this->db->from('Ventas AS V');
                $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
                $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
                $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
                $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
                $this->db->where('CL.idSucursal',$id);
                $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -84 DAY) AND date_add(NOW(), INTERVAL -56 DAY)');
                $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
        
        $query = $this->db->get();
        return $query->result_array();
	}

	public function Get_Semana4($id)
	{
		
        $this->db->select('SUM(DVM.Importe) AS Total'); 
        $this->db->from('Ventas AS V');
        $this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
        $this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
        $this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID','left');
        $this->db->join('Clientes AS CL','V.idCliente = CL.ID','left');
        $this->db->where('CL.idSucursal',$id);
        $this->db->where('V.Fecha_venta BETWEEN date_add(NOW(), INTERVAL -112 DAY) AND date_add(NOW(), INTERVAL -84 DAY)');
        $this->db->where('IF(CA.Division = 51, 0, 1) = 1');
        
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

    public function GetBloque()
    {
        
        $this->db->select('*'); 
        $this->db->from('Bloques_distribuidores');
        $this->db->where('Status','Activo');
        $query = $this->db->get();
        return $query->result_array();
    }
}

?>