<?php
class Cuentas_x_Pagar_Model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	// Rechazar Pago //
	public function rechazarPago($data)
	{
		$this->db->trans_begin();
		$this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

		$Venta = $this->getVentaById($data['ID']);

		$Adeudo = $Venta[0]['Adeudo'] + $data['Monto'];

		$this->db->query('UPDATE Pagos_clientes SET Status = "Rechazado" WHERE ID ='.$data['ID_Pago'].'');
		$this->db->query('UPDATE Ventas SET Adeudo = ' . $Adeudo . ' WHERE ID ='.$data['ID'].'');

		if ($this->db->trans_status() === FALSE){
	        $this->db->trans_rollback();
	        return 0;
		}
		else{
	        $this->db->trans_commit();
	        return 1;
		}
	}

	public function updateVentaReferencia($idVenta){
		$this->db->trans_begin();
		$this->db->trans_strict(FALSE);

		$this->db->where("ID", $idVenta);
		$this->db->set('Adeudo', 0);
		$this->db->set('Status', 'Pagado');
		$this->db->update('ventas');

		if ($this->db->trans_status() === FALSE){
	        $this->db->trans_rollback();
	        return 0;
		}
		else{
	        $this->db->trans_commit();
	        return 1;
		}
	}

	public function addPagoReferencia($pago){
		$this->db->trans_begin();
		$this->db->trans_strict(FALSE);

		$this->db->insert('pagos_referenciados',$pago);


		if ($this->db->trans_status() === FALSE){
	        $this->db->trans_rollback();
	        return 0;
		}
		else{
	        $this->db->trans_commit();
	        return 1;
		}
	}

	public function getVentasByReferencia($Referencia){
		$this->db->select('*'); 
		$this->db->from('Ventas');
		$this->db->where('Referencia', trim($Referencia));
		$query = $this->db->get();
		return $query->result_array();
	}

	// Obtener Venta By idVenta //
	public function getVentaById($id)
	{
		
		$this->db->select('*'); 
		$this->db->from('Ventas');
		$this->db->where('ID', $id);
		$query = $this->db->get();
		return $query->result_array();
	}

	// Obtener Imagen Pago Cliente //
	public function getImagen($idPagoCliente)
	{
		
		$this->db->select('*'); 
		$this->db->from('Pagos_clientes');
		$this->db->where('ID', $idPagoCliente);
		$query = $this->db->get();
		return $query->result_array();
	}

	// Confirmar Pago // 
	public function confirmarPago($id)
	{
		$this->db->trans_start(); # Starting Transaction
		$this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

		# Updating data
		$this->db->where("ID", $id);
		$this->db->set('Status', 'Confirmado');
		$this->db->update('Pagos_clientes');

		$this->db->trans_complete(); # Completing transaction

		/*Optional*/

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

	// Obtener Pago By idPagoCliente //
	public function getPagoCliente($idPagoCliente)
	{
		
		$this->db->select('*'); 
		$this->db->from('Pagos_clientes');
		$this->db->where('ID', $idPagoCliente);
		$query = $this->db->get();
		return $query->result_array();
	}

	// Confirmar todos los pagos //
	public function confirmarTodosPago($data)
	{
		$this->db->trans_start(); # Starting Transaction
		$this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

		$sql = "UPDATE Pagos_clientes AS PC JOIN Ventas AS V ON PC.idVenta = V.ID JOIN Clientes AS CL ON V.idCliente = CL.ID JOIN Sucursales AS SU ON CL.idSucursal = SU.ID SET V.Adeudo = IF(PC.Monto >= V.Adeudo,  0 , (V.Adeudo - PC.Monto)), V.Status = IF(PC.Monto >= V.Adeudo, 'Pagado' , 'Adeudo' ), PC.Status = 'Confirmado' WHERE PC.Status = 'Pendiente' AND SU.ID = ". $data['idBodega'];

		if ($data['Distribuidor']){
			$sql .= ' AND CL.ID = '.$data["Distribuidor"].'';
		}

		if ($data['Fecha_Desde'] && $data['Fecha_Hasta']){
			$sql .= ' AND V.Fecha_venta BETWEEN '. $data['Fecha_Desde'] .' AND ' . $data['Fecha_Hasta'];
		}

		$this->db->query($sql);		
		$this->db->trans_complete(); # Completing transaction

		/*Optional*/

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

	// Rechar Pago Pendiente //
	public function rechazarPagoPendiente($id,$idVenta)
	{
		$this->db->trans_start(); # Starting Transaction
		
		$this->db->where("ID", $id);
		$this->db->set('Status', 'Rechazado');
		$this->db->update('Pagos_clientes');

		$this->db->where("ID", $idVenta);
		$this->db->set('Status', 'Adeudo');
		$this->db->update('Ventas');

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

	// Exportar Pagos Pendientes //
	public function csvPagosPendientes($data)
	{
		//// Get All Result ////
	    
	    $this->db->select('PC.idVenta, PC.Fecha, PC.Monto, CL.Nombre, CL.Apellidos'); 
	    $this->db->from('Pagos_clientes AS PC');
	    $this->db->join('Ventas AS V','PC.idVenta = V.ID');
	    $this->db->join('Clientes AS CL','V.idCliente = CL.ID');
	    $this->db->where('PC.Status ', 'Pendiente');
	    $this->db->where('CL.idSucursal',$data['select_Bodega_Pendientes']);

	    // Filtros Inventario General //
	    if ($data['selectDistribuidorPendiente']){$this->db->where('CL.ID',$data['selectDistribuidorPendiente']);}
	    if ($data['dateStartPendiente'] != "" && $data['dateEndPendiente'] != ""){$this->db->where('V.Fecha_venta BETWEEN "'.$data["dateStartPendiente"]."00:00:00".'" AND "'.$data["dateEndPendiente"]."23:59:59".'"');}
	    $query = $this->db->get();
        $result = $query->result_array();
        return $result;
	}

	// Exportar Reporte Pagos //
	public function csvReportePagos($data)
	{
		fputcsv($file, array('N° de Venta', 'Fecha', 'Monto', 'idDistribuidor', 'Nombre','Apellidos', 'Referencia'));

		//// Get All Result ////
	    $this->db->distinct();
	    $this->db->select('idVenta, Fecha, Monto, idDistribuidores, Nombre, Apellidos, Referencia'); 
    	$this->db->from('ReportePagosClientesReferenciaView');

	    // Filtros Inventario General //
		if ($data['select_Reporte_Pago']){$this->db->where('idSucursal',$data['select_Reporte_Pago']);}
		
		if ($data['dateReportePago']){
			$this->db->group_start();
			$this->db->like('Fecha', $data["dateReportePago"]);
			$this->db->group_end();
		}

	    $this->db->order_by('idVenta DESC ');

		$query = $this->db->get();
		
		$this->db->save_queries = TRUE;
	$str = $this->db->last_query();

        $result = $query->result_array();
        return $result;
	}



























	public function Confirmar_Todos_Pago($data)
	{
		$this->db->trans_start(); # Starting Transaction
		$this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 


		$sql = "UPDATE Pagos_clientes AS PC JOIN Ventas AS V ON PC.idVenta = V.ID JOIN Clientes AS CL ON V.idCliente = CL.ID JOIN Sucursales AS SU ON CL.idSucursal = SU.ID SET V.Adeudo = IF(PC.Monto >= V.Adeudo,  0 , (V.Adeudo - PC.Monto)), V.Status = IF(PC.Monto >= V.Adeudo, 'Pagado' , 'Adeudo' ), PC.Status = 'Confirmado' WHERE PC.Status = 'Pendiente' AND SU.ID = ". $data['idBodega'];


		if ($data['Distribuidor'])
		{
			$sql .= ' AND CL.ID = '.$data["Distribuidor"].'';
		}

		if ($data['Fecha_Desde'] && $data['Fecha_Hasta'])
		{
			$sql .= ' AND V.Fecha_venta BETWEEN '. $data['Fecha_Desde'] .' AND ' . $data['Fecha_Hasta'];
		}

		$this->db->query($sql);		

		$this->db->trans_complete(); # Completing transaction

		/*Optional*/

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

	public function GetImagen_Cuentas($id)
	{
		
		$this->db->select('*'); 
		$this->db->from('Pagos_clientes');
		$this->db->where('ID', $id);
		$query = $this->db->get();
		return $query->result_array();	
	}

	public function Confirmar_Pago($id)
	{
		$Update_Pago = false;

		try
		{
			$this->db->where("ID", $id);
			$this->db->set('Status', 'Confirmado');
			$this->db->update('Pagos_clientes');
			$Update_Pago = $this->db->affected_rows();
		}
		catch(Exception $er)
		{
			$Update_Pago = false;
		}
		return $Update_Pago;
	}

	public function Rechazar_Pago($id,$idVenta)
	{

		$this->db->trans_start(); # Starting Transaction
		
		$this->db->where("ID", $id);
		$this->db->set('Status', 'Rechazado');
		$this->db->update('Pagos_clientes');

		$this->db->where("ID", $idVenta);
		$this->db->set('Status', 'Adeudo');
		$this->db->update('Ventas');

		$this->db->trans_complete(); # Completing transaction

		/*Optional*/

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

	public function Update_Venta($id,$Adeudo)
	{
		$Update_Venta = false;

		try
		{
			$this->db->where("ID", $id);
			$this->db->set('Adeudo', $Adeudo);
			$this->db->set('Status', 'Adeudo');
			$this->db->update('Ventas');
			$Update_Venta = $this->db->affected_rows();
		}
		catch(Exception $er)
		{
			$Update_Venta = false;
		}
		return $Update_Venta;
	}


	public function Update_Venta2($id,$Adeudo)
	{
		$Update_Venta = false;

		try
		{
			$this->db->where("ID", $id);
			$this->db->set('Adeudo', $Adeudo);
			$this->db->set('Status', 'Pagado');
			$this->db->update('Ventas');
			$Update_Venta = $this->db->affected_rows();
		}
		catch(Exception $er)
		{
			$Update_Venta = false;
		}
		return $Update_Venta;
	}
	public function Get_Venta($id)
	{
		
		$this->db->select('*'); 
		$this->db->from('Ventas');
		$this->db->where('ID', $id);
		$query = $this->db->get();
		return $query->result_array();
	}

	public function Get_Pago($id)
	{
		
		$this->db->select('*'); 
		$this->db->from('Pagos_clientes');
		$this->db->where('ID', $id);
		$query = $this->db->get();
		return $query->result_array();
	}

	public function Get_Venta_by_ID($id)
	{
		
		$this->db->select('*'); 
		$this->db->from('Ventas');
		$this->db->where('ID', $id);
		$query = $this->db->get();
		return $query->result_array();
	}

	public function Rechazar_Pago_Realizado($data)
	{
		$this->db->trans_begin();

		$Venta = $this->Get_Venta_by_ID($data['ID']);

		$Adeudo = $Venta[0]['Adeudo'] + $data['Monto'];

		$this->db->query('UPDATE Pagos_clientes SET Status = "Rechazado" WHERE ID ='.$data['ID_Pago'].'');

		$this->db->query('UPDATE Ventas SET Adeudo = ' . $Adeudo . ' WHERE ID ='.$data['ID'].'');

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