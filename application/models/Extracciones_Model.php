<?php

date_default_timezone_set('America/Mexico_City');

class Extracciones_Model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	public function validate31032020($idVenta){
		$this->db->distinct();
		$this->db->select('CLM.*'); 
		$this->db->from('Ventas AS V');
		$this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
		$this->db->join('Clientes_menudeo AS CLM','VM.idCliente_menudeo = CLM.ID');
		$this->db->where('V.ID', $idVenta);
		$query = $this->db->get();
		$result = $query->result_array();

		return $result;
	}

	// Obtener Informacion Extraccion By IdSucursal //
	// public function getExtraccionByIdSucursal($idSucursal)
	// {
		  
	// 	$query = $this->db->query('(select V.ID, V.Fecha_venta, CL.ID AS idDistribuidor, CL.Nombre, CL.Apellidos, V.Pedidos, V.Total, V.Adeudo, pc.Fecha
	// 	FROM Ventas AS V
	// 	JOIN Clientes AS CL ON V.idCliente = CL.ID
	// 	LEFT JOIN pagos_clientes pc ON V.ID = pc.idVenta
	// 		WHERE V.Extraido != 1
	// 		AND  CL.idSucursal = '.$idSucursal.'
	// 		and CL.ID != 1967)
		

	// 	UNION

	// 			(SELECT V.ID, V.Fecha_venta, CL.ID AS idDistribuidor, CL.Nombre, CL.Apellidos, V.Pedidos, V.Total, V.Adeudo, pc.Fecha
	// 			FROM Ventas AS V
	// 			JOIN Clientes AS CL on V.idCliente = CL.ID
	// 		LEFT JOIN pagos_clientes pc ON V.ID = pc.idVenta
	// 			WHERE V.Extraido != 1
	// 		and CL.idSucursal = '.$idSucursal.'
	// 		and CL.ID = 1967
	// 			and V.Adeudo = 0)

	// 		ORDER BY Fecha ASC');

	// 		$result = $query->result_array();
		
	// 	return $result;
	// }

	public function getExtraccionByIdSucursal($idSucursal)
	{
		  
		$query = $this->db->query('(select V.ID, V.Fecha_venta, CL.ID AS idDistribuidor, CL.Nombre, CL.Apellidos, V.Pedidos, V.Total, V.Adeudo, pc.Fecha, PR.Fecha_autorizacion AS Fecha_ref
		FROM Ventas AS V
		JOIN Clientes AS CL ON V.idCliente = CL.ID
		LEFT JOIN pagos_clientes pc ON V.ID = pc.idVenta
		LEFT JOIN pagos_referenciados PR ON V.ID = PR.idVenta
			WHERE V.Extraido != 1
			AND  CL.idSucursal = '.$idSucursal.'
			and CL.ID != 1967)
		

		UNION

				(SELECT V.ID, V.Fecha_venta, CL.ID AS idDistribuidor, CL.Nombre, CL.Apellidos, V.Pedidos, V.Total, V.Adeudo, pc.Fecha, PR.Fecha_autorizacion AS Fecha_ref
				FROM Ventas AS V
				JOIN Clientes AS CL on V.idCliente = CL.ID
			LEFT JOIN pagos_clientes pc ON V.ID = pc.idVenta
			LEFT JOIN pagos_referenciados PR ON V.ID = PR.idVenta
				WHERE V.Extraido != 1
			and CL.idSucursal = '.$idSucursal.'
			and CL.ID = 1967
				and V.Adeudo = 0)

			ORDER BY Fecha ASC');

			$result = $query->result_array();
		
		return $result;
	}

	// Obtener Historial Extraccion By IdSucursal //
	public function getHistorialByIdSucursal($idSucursal)
	{
		
		$this->db->select('V.ID, V.Fecha_venta,CL.ID AS idDistribuidor, CL.Nombre, CL.Apellidos, V.Pedidos, V.Total, V.Adeudo'); 
		$this->db->from('Ventas AS V');
		$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
		$this->db->order_by('V.ID', 'ASC'); 
		$this->db->where('V.Extraido', 'true');
		$this->db->where('CL.idSucursal', $idSucursal);
		$query = $this->db->get();
		$result = $query->result_array();

		return $result;
	}

	// Obtener Detalle Extracción //
	public function getDetalleExtraccion($idVenta)
	{
		
		$this->db->select('VM.*, CL.Nombre, CL.Apellidos, CL.idSalon'); 
		$this->db->from('Ventas_menudeo AS VM');
		$this->db->join('Ventas AS V','VM.idVenta = V.ID');
		$this->db->join('Clientes_menudeo AS CL','VM.idCliente_menudeo = CL.ID');
		$this->db->order_by('VM.ID', 'ASC'); 
		$this->db->where('V.ID', $idVenta);
		$query = $this->db->get();
		$result = $query->result_array();
		$Detalle = $result;

		return $Detalle;
	}

	public function getTotalVentasWeb($id){
		
		$this->db->select('SUM(DVM.Importe) AS Total'); 
		$this->db->from('Ventas AS V');
		$this->db->join('Ventas_menudeo AS VM','V.ID = VM.idVenta');
		$this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
		$this->db->where('V.ID', $id);
		$query = $this->db->get();
		$result = $query->result_array();

		return $result;
	}

	// Obtener información //
	public function getDetailSellTemp($idVenta)
    {
		
		$this->db->select('*'); 
		$this->db->from('existDetailSellTemView');
		$this->db->where('idVenta', $idVenta);
		$query = $this->db->get();
        $result = $query->result_array();

		return $result;  
    }

    // Delete Detalle Venta Menudeo Temp //
    public function deleteDetalleVentaMenudeoTemp($idDetalle)
    {
    	$this->db->trans_start(); # Starting Transaction
		$this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

		# Updating data
		$this->db->where('ID', $idDetalle);
		$this->db->delete('Detalle_venta_menudeo_temp');

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

    // Obtener Suma Cantidad Catalogo //
    public function sumCantCatalogo($idVenta)
    {
		
		$this->db->select('VM.idVenta, DVM.idCatalogo, CA.Producto, SUM(DVM.Cantidad) AS Cantidad, IPSS.Existencias, (IPSS.Existencias - SUM(DVM.Cantidad)) AS Real_Existencias, IF((IPSS.Existencias - SUM(DVM.Cantidad)) < 0 , "false", "true") as Validar'); 
		$this->db->from('Detalle_venta_menudeo AS DVM');
		$this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
		$this->db->join('Ventas AS V','VM.idVenta = V.ID');
		$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
		$this->db->join('Inventario_producto_sucursal_view AS IPSS','DVM.idCatalogo = IPSS.idCatalogo AND CL.idSucursal = IPSS.idSucursal');
		$this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID');
		$this->db->where('VM.idVenta', $idVenta);
		$this->db->group_by('DVM.idCatalogo');
		$query = $this->db->get();
        $result = $query->result_array();

		return $result;
    }

    // Obtener Suma Cantidad Promociones //
    public function sumCantPromociones($idVenta)
    {
		
		$this->db->select('V.ID, PP.idPromocion,PP.idCatalogo, CA.Producto, SUM(PP.Cantidad * DVM.Cantidad) AS Cantidad_Real, IPSS.Existencias, (IPSS.Existencias - SUM(PP.Cantidad * DVM.Cantidad)) AS Real_Existencias, IF((IPSS.Existencias - SUM(PP.Cantidad)) < 0 , "false", "true") as Validar'); 
		$this->db->from('Detalle_venta_menudeo AS DVM');
		$this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
		$this->db->join('Promociones AS PO','DVM.idPromocion = PO.ID');
		$this->db->join('Productos_promociones AS PP','PO.ID = PP.idPromocion');
		$this->db->join('Catalogo AS CA','PP.idCatalogo = CA.ID');
		$this->db->join('Ventas AS V','VM.idVenta = V.ID');
		$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
		$this->db->join('Inventario_producto_sucursal_view AS IPSS','CA.ID = IPSS.idCatalogo AND CL.idSucursal = IPSS.idSucursal');
		$this->db->where('DVM.idPromocion IS NOT NULL');
		$this->db->where('VM.idVenta', $idVenta);
		$this->db->group_by('PP.idCatalogo'); 
		$query = $this->db->get();
        $result = $query->result_array();

		return $result;
    }

    // Obtener Suma Cantidad Oferta //
    public function sumCantOferta($idVenta)
    {
		
		$this->db->select('V.ID, RE.idOferta, RE.idCatalogo, O.Nombre, CA.Producto, (1) AS Cantidad_Real, ISS.Existencias, (ISS.Existencias - 1) AS Real_Existencias, IF((ISS.Existencias - 1) < 0 , "false", "true") as Validar'); 
		$this->db->from('Detalle_venta_menudeo AS DVM');
		$this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
		$this->db->join('Ofertas AS O','DVM.idOferta = O.ID');
		$this->db->join('Regalos AS RE','O.ID = RE.idOferta');
		$this->db->join('Catalogo AS CA','RE.idCatalogo = CA.ID');
		$this->db->join('Ventas AS V','VM.idVenta = V.ID');
		$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
		$this->db->join('Inventario_producto_sucursal_view AS ISS','CA.ID = ISS.idCatalogo AND CL.idSucursal = ISS.idSucursal');
		$this->db->where('DVM.idOferta IS NOT NULL');
		$this->db->where('O.Tipo_Regalo', 1);
		$this->db->where('VM.idVenta', $idVenta);
		$query = $this->db->get();
        $result = $query->result_array();

		return $result;
    }

    // Validate Existencias Pedimento //
    public function validatePedimento($id)
	{
		
		$query = $this->db->query('select DVM.idCatalogo from Ventas_menudeo AS VM 
		    INNER JOIN Detalle_venta_menudeo AS DVM ON VM.ID = DVM.idVenta_menudeo
		    WHERE VM.idVenta = '.$id.' and DVM.idCatalogo is not null and DVM.idCatalogo not in (Select DVM.idCatalogo from Detalle_venta_menudeo AS DVM 
			INNER JOIN Ventas_menudeo AS VM ON DVM.idVenta_menudeo = VM.ID 
			INNER JOIN Ventas AS V ON VM.idVenta = V.ID 
			INNER JOIN Clientes AS CL ON V.idCliente = CL.ID 
			INNER JOIN Inventario_producto_sucursal_view AS IPSS ON DVM.idCatalogo = IPSS.idCatalogo AND CL.idSucursal = IPSS.idSucursal
			WHERE VM.idVenta = '.$id.' GROUP BY DVM.idCatalogo)');
			
		return $query->result_array();
	}

	// Validate Importes By IdVenta//
	public function validateImportesByIdVenta($idVenta)
    {
		
		$this->db->select('SUM(DVM.Importe) AS Importes, (V.Total + V.Descuento) AS Total_Ventas'); 
		$this->db->from('Detalle_venta_menudeo AS DVM');
		$this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
		$this->db->join('Ventas AS V','VM.idVenta = V.ID');
		$this->db->where('VM.idVenta', $idVenta);
		$query = $this->db->get();
        $result = $query->result_array();

		return $result;
    }

    // Validate Ventas Menudeo Importes By idVenta//
    public function validateVentaMenudeoByIdVenta($idVenta)
    {
		
		$this->db->select('VM.*'); 
		$this->db->from('Ventas_menudeo AS VM');
		$this->db->join('Ventas AS V','VM.idVenta = V.ID');
		$this->db->where('VM.idVenta', $idVenta);
		$query = $this->db->get();
        $result = $query->result_array();

		return $result;
    }

    // Obtener Suma Importe Ventas Menudeo //
    public function getImporteVentaMenudeo($idVentaMenudeo){
		
		$this->db->select('SUM(DVM.Importe) AS Importes'); 
		$this->db->from('Ventas_menudeo AS VM');
		$this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
		$this->db->where('VM.ID', $idVentaMenudeo);
		$query = $this->db->get();
	    $result = $query->result_array();

		return $result;
    }

    // Obtener Detalle Venta Menudeo join Ventas Menudeo By IdVenta //
    public function getDetalleVentasMenudeoByIdVenta($idVenta)
    {
		
		$this->db->select('DVM.*'); 
		$this->db->from('Ventas_menudeo AS VM');
		$this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
		$this->db->where('VM.idVenta', $idVenta);
		$query = $this->db->get();
        $result = $query->result_array();

		return $result;
    }

    // Obtener Detalle Inventario by IdCatalogo y idSucursal //
    public function getInfoDetalleInventario($idCatalogo,$idSucursal)
    {
		
		$this->db->select('I.idCatalogo, I.idSucursal, DI.*'); 
		$this->db->from('Inventario AS I');
		$this->db->join('Detalle_inventario AS DI','I.ID = DI.idInventario');
		$this->db->join('Locaciones AS LO','DI.idLocacion = LO.ID');
		$this->db->where('I.idCatalogo', $idCatalogo);
		$this->db->where('I.idSucursal', $idSucursal);
		$this->db->where('DI.Existencias > 0');
		$this->db->order_by('LO.Categoria ASC, DI.Fecha_ingreso ASC');
		$query = $this->db->get();
        $result = $query->result_array();

		return $result;
    }

    // Obtener Catalogo Promoción //
    public function getProductosPromo($idVenta,$idPromocion)
	{
		
		$this->db->select('PP.idPromocion, PP.idCatalogo, (PP.Cantidad * DVM.Cantidad) AS Cantidad, DVM.idVenta_menudeo, DVM.idOferta, DVM.Precio_unitario, DVM.Importe, I.Precio_publico, (I.Precio_publico * (PP.Cantidad * DVM.Cantidad)) AS Total'); 
		$this->db->from('Promociones AS P');
		$this->db->join('Productos_promociones AS PP','P.ID = PP.idPromocion');
		$this->db->join('Detalle_venta_menudeo AS DVM','P.ID = DVM.idPromocion');
		$this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
		$this->db->join('Ventas AS V','V.ID = VM.idVenta');
		$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
		$this->db->join('Inventario AS I','I.idCatalogo = PP.idCatalogo and I.idSucursal = CL.idSucursal');
		$this->db->where('P.ID', $idPromocion);
		$this->db->where('VM.ID', $idVenta);
		$this->db->group_by('PP.idCatalogo');
		$query = $this->db->get();
		$result = $query->result_array();

		return $result;
	}

	// Update Detalle Inventario (Existencias) (Insert Detalle Venta Menudeo Temp Back) (Insert Detalle Venta Menudeo Temp) //
	public function UpdateDetalleInventarioExistencias($id,$Existencias,$Detalle_venta_menudeo,$Cantidad)
	{
		$Importe_Real = $Cantidad * $Detalle_venta_menudeo['Precio_unitario'];

		$Detalle_Venta_Menudeo_array = array(
				'idVenta_menudeo' => $Detalle_venta_menudeo['idVenta_menudeo'],
				'idCatalogo' => $Detalle_venta_menudeo['idCatalogo'],
				'idPromocion' => $Detalle_venta_menudeo['idPromocion'],
				'idOferta' => $Detalle_venta_menudeo['idOferta'],
				'idDetalle_Inventario' => $id,
				'Cantidad' => $Cantidad,
				'Precio_unitario' => $Detalle_venta_menudeo['Precio_unitario'],
				'Importe' => $Importe_Real);

		$this->db->trans_start(); # Starting Transaction
		$this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

		$this->db->query('UPDATE Detalle_inventario SET Existencias='.$Existencias.' WHERE ID='.$id.'');
		$this->db->insert('detalle_venta_menudeo_temp_back', $Detalle_Venta_Menudeo_array);
		$this->db->insert('Detalle_venta_menudeo_temp', $Detalle_Venta_Menudeo_array);

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

	// Update Detalle Inventario (Existencias) (Insert Detalle Venta Menudeo Temp Back) (Insert Detalle Venta Menudeo Temp) //
	public function UpdateDetalleInventarioExistenciasPromo($id,$Existencias,$Detalle_venta_menudeo,$Cantidad)
	{
		$Importe_Real = $Cantidad * $Detalle_venta_menudeo['Precio_publico'];

		$Detalle_Venta_Menudeo_array = array(
				'idVenta_menudeo' => $Detalle_venta_menudeo['idVenta_menudeo'],
				'idCatalogo' => $Detalle_venta_menudeo['idCatalogo'],
				'idPromocion' => $Detalle_venta_menudeo['idPromocion'],
				'idOferta' => $Detalle_venta_menudeo['idOferta'],
				'idDetalle_Inventario' => $id,
				'Cantidad' => $Cantidad,
				'Precio_unitario' => $Detalle_venta_menudeo['Precio_publico'],
				'Importe' => $Importe_Real);

		$this->db->trans_start(); # Starting Transaction
		$this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

		$this->db->query('UPDATE Detalle_inventario SET Existencias='.$Existencias.' WHERE ID='.$id.'');
		$this->db->insert('detalle_venta_menudeo_temp_back', $Detalle_Venta_Menudeo_array);
		$this->db->insert('Detalle_venta_menudeo_temp', $Detalle_Venta_Menudeo_array);

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

	// Update Existencias Oferta //
	public function UpdateExistenciasPromo($Detalle,$idSucursal)
	{
		$this->db->trans_begin();
		$this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

		$Oferta = $this->getOferta($Detalle['idOferta']);

		if ($Oferta[0]['Tipo_Regalo'] == '1'){
			$Regalos = $this->getRegaloByIdOferta($Detalle['idOferta']);

			for ($i=0; $i < count($Regalos); $i++){ 
				$DetalleInventario = $this->getInfoDetalleInventario($Regalos[$i]['idCatalogo'],$idSucursal);

				$DetalleVentaMenudeoTemp = array(
				'idVenta_menudeo' => $Detalle['idVenta_menudeo'],
				'idCatalogo' => $Regalos[$i]['idCatalogo'],
				'idOferta' => $Detalle['idOferta'],
				'idDetalle_inventario' => $DetalleInventario[0]['ID'],
				'Cantidad' => 1,
				'Precio_unitario' => 0.00,
				'Importe' => 0.00);

				$this->db->insert('Detalle_venta_menudeo_temp', $DetalleVentaMenudeoTemp);
				$this->db->insert('detalle_venta_menudeo_temp_back', $DetalleVentaMenudeoTemp);

				$Existencias = intval($DetalleInventario[0]['Existencias'] - 1);

				$this->db->where('ID',$DetalleInventario[0]['ID']);
				$this->db->set('Existencias',$Existencias);
				$this->db->update('Detalle_inventario');
			}
		}

		$DetalleVentaMenudeoTemp = array(
			'idVenta_menudeo' => $Detalle['idVenta_menudeo'],
			'idOferta' => $Detalle['idOferta'],
			'Cantidad' => $Detalle['Cantidad'],
			'Precio_unitario' => $Detalle['Precio_unitario'],
			'Importe' => $Detalle['Importe']);

		
		$this->db->insert('Detalle_venta_menudeo_temp', $DetalleVentaMenudeoTemp);
		$this->db->insert('detalle_venta_menudeo_temp_back', $DetalleVentaMenudeoTemp);
		

		if ($this->db->trans_status() === FALSE){
		    $this->db->trans_rollback();
		    return 0;
		}
		else{
		    $this->db->trans_commit();
		    return 1;
		}
	}

	// Obtener Oferta By IdOferta //
	public function getOferta($idOferta)
	{
		
		$this->db->select('*'); 
		$this->db->from('Ofertas');
		$this->db->where('ID', $idOferta);
		$query = $this->db->get();
        $result = $query->result_array();

		return $result;
	}

	// Obtener Regalo ByIdOferta //
	public function getRegaloByIdOferta($idOferta)
	{
		
		$this->db->select('*'); 
		$this->db->from('Regalos');
		$this->db->where('idOferta', $idOferta);
		$query = $this->db->get();
        $result = $query->result_array();

		return $result;
	}

	public function getSumSubpedidos($id){
		$this->db->select('SUM(DVMT.Cantidad) AS Cantidad'); 
		$this->db->from('Ventas_menudeo AS VM');
		$this->db->join('Detalle_venta_menudeo_temp AS DVMT','VM.ID = DVMT.idVenta_menudeo');
		$this->db->where('VM.idVenta', $id);
		$query = $this->db->get();
        $result = $query->result_array();
		return $result;
	}

	// Obtener Detalle Venta Menudeo Temp By IdVenta //
	public function getDetalleVentaMenudeoTempByIdVenta($idVenta)
    {
		
		$this->db->select('DVMT.*, (DVMT.Cantidad) Restante'); 
		$this->db->from('Ventas_menudeo AS VM');
		$this->db->join('Detalle_venta_menudeo_temp AS DVMT','VM.ID = DVMT.idVenta_menudeo');
		$this->db->where('VM.idVenta', $idVenta);
		$this->db->order_by("DVMT.idVenta_menudeo", "ASC");
		$query = $this->db->get();
        $result = $query->result_array();

		return $result;
	}


    public function addSubpedido($data){
		$this->db->trans_start(); # Starting Transaction
		$this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 
		# Updating data
		$this->db->insert('subpedidos',$data);
		$insert_id = $this->db->insert_id();
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
		    return $insert_id;
		}
	}

	public function getCantidadVentasMenudeo($idVenta){


		/*
		select vm.*, SUM(dvm.Cantidad) As Cantidad from ventas_menudeo vm
		inner join detalle_venta_menudeo_temp dvm on vm.ID = dvm.idVenta_menudeo
		where vm.idVenta = 70448
		GROUP by vm.ID
		ORDER BY SUM(dvm.Cantidad) DESC;
		*/

		$this->db->select('vm.ID, SUM(dvm.Cantidad) As Cantidad, SUM(dvm.Cantidad) As Restantes'); 
		$this->db->from('ventas_menudeo vm');
		$this->db->join('detalle_venta_menudeo_temp dvm','vm.ID = dvm.idVenta_menudeo');
		$this->db->group_by('vm.ID');
		$this->db->order_by('SUM(dvm.Cantidad)', 'DESC'); 
		$this->db->where('vm.idVenta', $idVenta);
		$query = $this->db->get();
		$result = $query->result_array();
		
		return $result;
	}




    public function addDetalleSubpedido($data){
		$this->db->trans_start(); # Starting Transaction
		$this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 
		# Updating data
		$this->db->insert_batch('detalle_subpedidos',$data);
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

    // Agregar Existencias Al no generar la extracción //
    public function addExistencias($Detalle_Venta_Temp,$id)
	{
		$this->db->trans_begin();
		$this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

		for ($i=0; $i < count($Detalle_Venta_Temp); $i++){ 
			$Existencias = 0;

			if ($Detalle_Venta_Temp[$i]['idDetalle_inventario'] != null && $Detalle_Venta_Temp[$i]['idDetalle_inventario'] != ""){
				$Detalle_Inventario = $this->Get_Detalle_Inventario($Detalle_Venta_Temp[$i]['idDetalle_inventario']);
				$Existencias 		= $Detalle_Inventario[0]['Existencias'] + $Detalle_Venta_Temp[$i]['Cantidad'];

				$this->db->set('Existencias', $Existencias);
				$this->db->where('ID', $Detalle_Venta_Temp[$i]['idDetalle_inventario']);
				$this->db->update('Detalle_inventario');
				$affected = $this->db->affected_rows();

				if ($affected <= 0) {
					$this->db->query('UPDATE Detalle_inventario SET Existencias='.$Existencias.' WHERE ID='.$Detalle_Venta_Temp[$i]['idDetalle_inventario'].'');
				}
			}
		}

		/////////////////////////////////////////////////////////////////////////////////////
		///////////   Si tienes subpedidos los elimina al eliminar la extracción ////////////
		////////////////////////////////////////////////////////////////////////////////////
			$this->db->select('COUNT(ID) AS contador'); 
			$this->db->from('subpedidos');
			$this->db->where('idVenta', $id);
			$query = $this->db->get();
			$resultDelete = $query->result_array();

		if(!empty($resultDelete)){
			$this->db->query('DELETE DVMT.* FROM detalle_subpedidos AS DVMT INNER JOIN subpedidos AS SU on DVMT.idSubpedido = SU.ID WHERE SU.idVenta ='.$id.' ');
			$this->db->query('DELETE SU.* FROM subpedidos AS SU WHERE SU.idVenta ='.$id.' ');
		}
		/////////////////////////////////////////////////////////////////////////////////////
		///////////   Si tienes subpedidos los elimina al eliminar la extracción ////////////
		////////////////////////////////////////////////////////////////////////////////////
		
		$this->db->query('DELETE DVMT.* FROM Detalle_venta_menudeo_temp AS DVMT INNER JOIN Ventas_menudeo AS VM ON DVMT.idVenta_menudeo = VM.ID WHERE VM.idVenta ='.$id.' ');
		
		$this->db->set('Extraido', 0);
		$this->db->where('idVenta', $id);
		$this->db->update('Ventas_menudeo');

		$this->db->set('Extraido', 0);
		$this->db->where('ID', $id);
		$this->db->update('Ventas');


		$logs_ventas_desk = array('idVenta' => $id,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Eliminar Extraccion',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

		if ($this->db->trans_status() === FALSE){
		    $this->db->trans_rollback();
		    return 0;
		}
		else{
		    $this->db->trans_commit();
		    return 1;
		}
	}

	// Obtener Ahorro //
	public function getAhorro($idVenta)
    {
		
		$this->db->select('(SUM((DVM.Cantidad * ASP.ahorro))) AS Ahorro'); 
		$this->db->from('Detalle_venta_menudeo AS DVM');
		$this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
		$this->db->join('Promociones AS PO','DVM.idPromocion = PO.ID');
		$this->db->join('Ventas AS V','VM.idVenta = V.ID');
		$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
		$this->db->join('Sucursales AS SU','CL.idSucursal = SU.ID');
		$this->db->join('Asignacion_promo AS ASP','ASP.idPromocion = PO.ID AND ASP.idSucursal = SU.ID');
		$this->db->where('VM.idVenta', $idVenta);
		$this->db->where('DVM.idPromocion IS NOT NULL');
		$query = $this->db->get();
        $result = $query->result_array();

		return $result;
    }

    // Update Estatus Extraido 1 Ventas y Ventas Menudeo //
    public function updateExtraidoByIdVenta($idVenta)
	{
		$this->db->trans_begin();
		$this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

		$this->db->query('UPDATE Ventas SET Extraido = 1 WHERE ID='.$idVenta.'');
		$this->db->query('UPDATE Ventas_menudeo SET Extraido = 1 WHERE idVenta='.$idVenta.'');

		$logs_ventas_desk = array('idVenta' => $idVenta,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Extraer',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

		if ($this->db->trans_status() === FALSE){
		    $this->db->trans_rollback();
		    return 0;
		}
		else{
		    $this->db->trans_commit();
		    return 1;
		}
	}

	public function getHistorial($idSucursal)
	{
		
		$this->db->select('V.ID, V.Fecha_venta, CL.Nombre, CL.Apellidos, V.Pedidos, V.Total'); 
		$this->db->from('Ventas AS V');
		$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
		$this->db->order_by('V.ID', 'ASC'); 
		$this->db->where('V.Extraido', 'true');
		$this->db->where('CL.idSucursal', $idSucursal);
		$query = $this->db->get();
		$result = $query->result_array();
		
		return $result;
	}














































































	public function Get_Sucursales()
	{
		$Sucursales = null;

			$this->db->distinct();
			$this->db->select('*'); 
			$this->db->from('Sucursales');
			$this->db->order_by('Sucursal', 'ASC'); 
			$this->db->where('Status !=', 'Inactivo');
			$query = $this->db->get();
			$result = $query->result_array();
			$Sucursales = $result;

		return $Sucursales;
	}

	public function Get_Distribuidor()
	{
		$Distribuidor = null;

			$this->db->distinct();
			$this->db->select('*'); 
			$this->db->from('Clientes');
			$this->db->order_by('Nombre', 'ASC'); 
			$this->db->where('Status !=', 'Inactivo');
			$query = $this->db->get();
			$result = $query->result_array();
			$Distribuidor = $result;

		return $Distribuidor;
	}

	public function Get_Extracciones($id)
	{
		$Sucursales = null;

			$this->db->distinct();
			$this->db->select('V.ID, V.Fecha_venta, CL.Nombre, CL.Apellidos, V.Pedidos, V.Total, V.Adeudo'); 
			$this->db->from('Ventas AS V');
			$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
			$this->db->order_by('V.ID', 'ASC'); 
			$this->db->where('V.Extraido != 1');
			$this->db->where('V.Adeudo < 10');
			$this->db->where('CL.idSucursal', $id);
			$query = $this->db->get();
			$result = $query->result_array();
			$Sucursales = $result;

		return $Sucursales;
	}

	public function Get_All_Detalle_Venta_Menudeo($id)
	{
		
		$query = $this->db->query('select DVM.idCatalogo from Ventas_menudeo AS VM 
		    INNER JOIN Detalle_venta_menudeo AS DVM ON VM.ID = DVM.idVenta_menudeo
		    WHERE VM.idVenta = '.$id.' and DVM.idCatalogo is not null and DVM.idCatalogo not in (Select DVM.idCatalogo from Detalle_venta_menudeo AS DVM 
			INNER JOIN Ventas_menudeo AS VM ON DVM.idVenta_menudeo = VM.ID 
			INNER JOIN Ventas AS V ON VM.idVenta = V.ID 
			INNER JOIN Clientes AS CL ON V.idCliente = CL.ID 
			INNER JOIN Inventario_producto_sucursal_view AS IPSS ON DVM.idCatalogo = IPSS.idCatalogo AND CL.idSucursal = IPSS.idSucursal
			WHERE VM.idVenta = '.$id.' GROUP BY DVM.idCatalogo)');
			
		return $query->result_array();
	}

	public function Get_Catalogo_Promociones($idVenta,$idPromocion)
	{
  		$Promociones = null;

			
			$this->db->select('PP.idPromocion, PP.idCatalogo, (PP.Cantidad * DVM.Cantidad) AS Cantidad, DVM.idVenta_menudeo, DVM.idOferta, DVM.Precio_unitario, DVM.Importe, I.Precio_publico, (I.Precio_publico * (PP.Cantidad * DVM.Cantidad)) AS Total'); 
			$this->db->from('Promociones AS P');
			$this->db->join('Productos_promociones AS PP','P.ID = PP.idPromocion');
			$this->db->join('Detalle_venta_menudeo AS DVM','P.ID = DVM.idPromocion');
			$this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
			$this->db->join('Ventas AS V','V.ID = VM.idVenta');
			$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
			$this->db->join('Inventario AS I','I.idCatalogo = PP.idCatalogo and I.idSucursal = CL.idSucursal');
			$this->db->where('P.ID', $idPromocion);
			$this->db->where('VM.ID', $idVenta);
			$this->db->group_by('PP.idCatalogo');
			$query = $this->db->get();
			$result = $query->result_array();
			$Promociones = $result;

		return $Promociones;
	}



	public function Get_Historial_Extracciones($id)
	{
		$Sucursales = null;

			
			$this->db->select('V.ID, V.Fecha_venta, CL.Nombre, CL.Apellidos, V.Pedidos, V.Total'); 
			$this->db->from('Ventas AS V');
			$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
			$this->db->order_by('V.ID', 'ASC'); 
			$this->db->where('V.Extraido', 'true');
			$this->db->where('CL.idSucursal', $id);
			$query = $this->db->get();
			$result = $query->result_array();
			$Sucursales = $result;

		return $Sucursales;
	}

/*
select VM.*, CL.Nombre, CL.Apellidos from Ventas_menudeo AS VM INNER JOIN Ventas AS V on VM.idVenta = V.ID INNER JOIN Clientes_menudeo AS CL on VM.idCliente_menudeo = CL.ID
  where V.ID = 329
*/
	public function Get_Extracciones_Detalle($id)
	{
		$Detalle = null;

			
			$this->db->select('VM.*, CL.Nombre, CL.Apellidos'); 
			$this->db->from('Ventas_menudeo AS VM');
			$this->db->join('Ventas AS V','VM.idVenta = V.ID');
			$this->db->join('Clientes_menudeo AS CL','VM.idCliente_menudeo = CL.ID');
			$this->db->order_by('VM.ID', 'ASC'); 
			$this->db->where('V.ID', $id);
			$query = $this->db->get();
			$result = $query->result_array();
			$Detalle = $result;

		return $Detalle;
	}

	public function existDetailSellTemp($id)
    {
    	
    	$Details = null;

			
			$this->db->select('*'); 
			$this->db->from('existDetailSellTemView');
			$this->db->where('idVenta', $id);
			$query = $this->db->get();
            $result = $query->result_array();
            $Details = $result;

		return $Details;
        
    }

    public function Delete_Detail($id)
    {
    	$afftectedRows = null;

	    	$this->db->where('ID', $id);
			$this->db->delete('Detalle_venta_menudeo_temp');
			$afftectedRows = $this->db->affected_rows();

		return $afftectedRows;
    }

    public function Get_Info_Venta($id)
    {
    	$Details = null;

			
			$this->db->select('*'); 
			$this->db->from('Ventas');
			$this->db->where('ID', $id);
			$query = $this->db->get();
            $result = $query->result_array();
            $Details = $result;

		return $Details;
    }

    public function Get_Promo_Ahorro($id)
    {

    	$Details = null;

			
			$this->db->select('(SUM((DVM.Cantidad * ASP.ahorro))) AS Ahorro'); 
			$this->db->from('Detalle_venta_menudeo AS DVM');
			$this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
			$this->db->join('Promociones AS PO','DVM.idPromocion = PO.ID');
			$this->db->join('Ventas AS V','VM.idVenta = V.ID');
			$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
			$this->db->join('Sucursales AS SU','CL.idSucursal = SU.ID');
			$this->db->join('Asignacion_promo AS ASP','ASP.idPromocion = PO.ID AND ASP.idSucursal = SU.ID');
			$this->db->where('VM.idVenta', $id);
			$this->db->where('DVM.idPromocion IS NOT NULL');
			$query = $this->db->get();
            $result = $query->result_array();
            $Details = $result;

		return $Details;
    }

    public function Update_Error_Causado()
    {
    	$this->db->trans_begin();

		$this->db->query('UPDATE Detalle_venta_menudeo_temp SET Importe = 50 WHERE idVenta_menudeo = 1905 AND idCatalogo = 14');

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

    public function sumCantidadCatalogo($id)
    {

    	$Catalogo = null;

			
			$this->db->select('VM.idVenta, DVM.idCatalogo, CA.Producto, SUM(DVM.Cantidad) AS Cantidad, IPSS.Existencias, (IPSS.Existencias - SUM(DVM.Cantidad)) AS Real_Existencias, IF((IPSS.Existencias - SUM(DVM.Cantidad)) < 0 , "false", "true") as Validar'); 
			$this->db->from('Detalle_venta_menudeo AS DVM');
			$this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
			$this->db->join('Ventas AS V','VM.idVenta = V.ID');
			$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
			$this->db->join('Inventario_producto_sucursal_view AS IPSS','DVM.idCatalogo = IPSS.idCatalogo AND CL.idSucursal = IPSS.idSucursal');
			$this->db->join('Catalogo AS CA','DVM.idCatalogo = CA.ID');
			$this->db->where('VM.idVenta', $id);
			$this->db->group_by('DVM.idCatalogo');
			$query = $this->db->get();
            $result = $query->result_array();
            $Catalogo = $result;

		return $Catalogo;
    }

    public function sumCantidadCatalogoPromociones($id)
    {
    	$Catalogo = null;

			
			$this->db->select('V.ID, PP.idPromocion,PP.idCatalogo, CA.Producto, SUM(PP.Cantidad * DVM.Cantidad) AS Cantidad_Real, IPSS.Existencias, (IPSS.Existencias - SUM(PP.Cantidad * DVM.Cantidad)) AS Real_Existencias, IF((IPSS.Existencias - SUM(PP.Cantidad)) < 0 , "false", "true") as Validar'); 
			$this->db->from('Detalle_venta_menudeo AS DVM');
			$this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
			$this->db->join('Promociones AS PO','DVM.idPromocion = PO.ID');
			$this->db->join('Productos_promociones AS PP','PO.ID = PP.idPromocion');
			$this->db->join('Catalogo AS CA','PP.idCatalogo = CA.ID');
			$this->db->join('Ventas AS V','VM.idVenta = V.ID');
			$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
			$this->db->join('Inventario_producto_sucursal_view AS IPSS','IPSS on CA.ID = IPSS.idCatalogo AND CL.idSucursal = IPSS.idSucursal');
			$this->db->where('DVM.idPromocion IS NOT NULL');
			$this->db->where('VM.idVenta', $id);
			$this->db->group_by('PP.idCatalogo'); 
			$query = $this->db->get();
            $result = $query->result_array();
            $Catalogo = $result;

		return $Catalogo;
    }

    public function sumCantidadCatalogoOferta($id)
    {
    	$Catalogo = null;

			
			$this->db->select('V.ID, RE.idOferta, RE.idCatalogo, O.Nombre, CA.Producto, (1) AS Cantidad_Real, ISS.Existencias, (ISS.Existencias - 1) AS Real_Existencias, IF((ISS.Existencias - 1) < 0 , "false", "true") as Validar'); 
			$this->db->from('Detalle_venta_menudeo AS DVM');
			$this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
			$this->db->join('Ofertas AS O','DVM.idOferta = O.ID');
			$this->db->join('Regalos AS RE','O.ID = RE.idOferta');
			$this->db->join('Catalogo AS CA','RE.idCatalogo = CA.ID');
			$this->db->join('Ventas AS V','VM.idVenta = V.ID');
			$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
			$this->db->join('Inventario_producto_sucursal_view AS ISS','CA.ID = ISS.idCatalogo AND CL.idSucursal = ISS.idSucursal');
			$this->db->where('DVM.idOferta IS NOT NULL');
			$this->db->where('O.Tipo_Regalo', 1);
			$this->db->where('VM.idVenta', $id);
			$query = $this->db->get();
            $result = $query->result_array();
            $Catalogo = $result;

		return $Catalogo;
    }

    public function Validate_Importes($id)
    {
    	$Importes = null;

			
			$this->db->select('SUM(DVM.Importe) AS Importes, (V.Total + V.Descuento) AS Total_Ventas'); 
			$this->db->from('Detalle_venta_menudeo AS DVM');
			$this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
			$this->db->join('Ventas AS V','VM.idVenta = V.ID');
			$this->db->where('VM.idVenta', $id);
			$query = $this->db->get();
            $result = $query->result_array();
            $Importes = $result;

		return $Importes;
    }

    public function Validate_Venta_Menudeo_Importe($id)
    {
    	$Importes = null;

			
			$this->db->select('VM.*'); 
			$this->db->from('Ventas_menudeo AS VM');
			$this->db->join('Ventas AS V','VM.idVenta = V.ID');
			$this->db->where('VM.idVenta', $id);
			$query = $this->db->get();
            $result = $query->result_array();
            $Importes = $result;

		return $Importes;
    }

    public function Validate_Venta_Menudeo_Importe_Detalle($id)
    {
    	$Importes = null;

			
			$this->db->select('SUM(Importe) AS Importes'); 
			$this->db->from('Ventas_menudeo AS VM');
			$this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
			$this->db->where('VM.ID', $id);
			$query = $this->db->get();
            $result = $query->result_array();
            $Importes = $result;

		return $Importes;
    }

    public function Validate_Venta_Menudeo_Importe_Detalle_Comple($id)
    {
    	$Importes = null;

			
			$this->db->select('DVM.*'); 
			$this->db->from('Ventas_menudeo AS VM');
			$this->db->join('Detalle_venta_menudeo AS DVM','VM.ID = DVM.idVenta_menudeo');
			$this->db->where('VM.idVenta', $id);
			$query = $this->db->get();
            $result = $query->result_array();
            $Importes = $result;

		return $Importes;
    }

    public function Get_Detalle_Venta_Promo($id)
    {
 		$Catalogo = null;

			
			$this->db->select('V.ID, PP.idPromocion,PP.idCatalogo, (PP.Cantidad * DVM.Cantidad) AS Cantidad_Real, IPSS.Existencias'); 
			$this->db->from('Detalle_venta_menudeo AS DVM');
			$this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
			$this->db->join('Promociones AS P','DVM.idPromocion = P.ID');
			$this->db->join('Productos_promociones AS PP','P.ID = PP.idPromocion');
			$this->db->join('Ventas AS V','VM.idVenta = V.ID');
			$this->db->join('Clientes AS CL','V.idCliente = CL.ID');
			$this->db->join('Inventario_producto_sucursal_view AS IPSS','PP.idCatalogo = IPSS.idCatalogo AND CL.idSucursal = IPSS.idSucursal');
			$this->db->join('Catalogo AS CA','PP.idCatalogo = CA.ID');
			$this->db->where('DVM.idPromocion IS NOT NULL');
			$this->db->where('VM.idVenta', $id);
			$query = $this->db->get();
            $result = $query->result_array();
            $Catalogo = $result;

		return $Catalogo;
    }

    public function Get_Detalle_Venta_Existencias($idCatalogo,$idSucursal)
    {

    $Detalle_Venta = null;

			
			$this->db->select('I.idCatalogo, I.idSucursal, DI.*'); 
			$this->db->from('Inventario AS I');
			$this->db->join('Detalle_inventario AS DI','I.ID = DI.idInventario');
			$this->db->join('Locaciones AS LO','DI.idLocacion = LO.ID');
			$this->db->where('I.idCatalogo', $idCatalogo);
			$this->db->where('I.idSucursal', $idSucursal);
			$this->db->where('DI.Existencias > 0');
			$this->db->order_by('LO.Categoria ASC, DI.ID ASC');
			$query = $this->db->get();
            $result = $query->result_array();
            $Detalle_Venta = $result;

		return $Detalle_Venta;
    }

    public function GetDetalle_Venta_Menudeo_By_Id($id)
    {
    	$Venta = null;

			
			$this->db->select('*'); 
			$this->db->from('Detalle_venta_menudeo');
			$this->db->where('ID', $id);
			$query = $this->db->get();
            $result = $query->result_array();
            $Venta = $result;

		return $Venta;
    }

    public function Update_Existencias_1($id,$Existencias,$Detalle_venta_menudeo,$Cantidad)
	{
		$Importe_Real = $Cantidad * $Detalle_venta_menudeo['Precio_unitario'];

		$Detalle_Venta_Menudeo_array = array(
				'idVenta_menudeo' => $Detalle_venta_menudeo['idVenta_menudeo'],
				'idCatalogo' => $Detalle_venta_menudeo['idCatalogo'],
				'idPromocion' => $Detalle_venta_menudeo['idPromocion'],
				'idOferta' => $Detalle_venta_menudeo['idOferta'],
				'idDetalle_Inventario' => $id,
				'Cantidad' => $Cantidad,
				'Precio_unitario' => $Detalle_venta_menudeo['Precio_unitario'],
				'Importe' => $Importe_Real);
 

		$this->db->trans_begin();

		$this->db->query('UPDATE Detalle_inventario SET Existencias='.$Existencias.' WHERE ID='.$id.'');

		$this->db->insert('detalle_venta_menudeo_temp_back', $Detalle_Venta_Menudeo_array);

		$this->db->insert('Detalle_venta_menudeo_temp', $Detalle_Venta_Menudeo_array);
		$id_Insert = $this->db->insert_id();

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

    public function Update_Existencias($id,$Existencias,$Detalle_venta_menudeo)
	{
		$Detalle_Venta_Menudeo_array = array(
				'idVenta_menudeo' => $Detalle_venta_menudeo['idVenta_menudeo'],
				'idCatalogo' => $Detalle_venta_menudeo['idCatalogo'],
				'idPromocion' => $Detalle_venta_menudeo['idPromocion'],
				'idOferta' => $Detalle_venta_menudeo['idOferta'],
				'idDetalle_Inventario' => $id,
				'Cantidad' => $Detalle_venta_menudeo['Cantidad'],
				'Precio_unitario' => $Detalle_venta_menudeo['Precio_unitario'],
				'Importe' => $Detalle_venta_menudeo['Importe']);
 

		$this->db->trans_begin();

		$this->db->query('UPDATE Detalle_inventario SET Existencias='.$Existencias.' WHERE ID='.$id.'');

		$this->db->insert('detalle_venta_menudeo_temp_back', $Detalle_Venta_Menudeo_array);

		$this->db->insert('Detalle_venta_menudeo_temp', $Detalle_Venta_Menudeo_array);
		$id_Insert = $this->db->insert_id();

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

	public function Update_Venta($id)
	{
		$this->db->trans_begin();

		$this->db->query('UPDATE Ventas SET Extraido = 1 WHERE ID='.$id.'');
		$this->db->query('UPDATE Ventas_menudeo SET Extraido = 1 WHERE idVenta='.$id.'');

		$logs_ventas_desk = array('idVenta' => $id,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Extraer',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);


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

	public function Get_Detalle_Venta_Menudeo_Temp_By_ID($id)
	{
  		$DVMT = null;

			
			$this->db->select('DVM.*'); 
			$this->db->from('Detalle_venta_menudeo AS DVM');
			$this->db->join('Ventas_menudeo AS VM','DVM.idVenta_menudeo = VM.ID');
			$this->db->where('VM.idVenta', $id);
			$query = $this->db->get();
            $result = $query->result_array();
            $DVMT = $result;

		return $DVMT;
	}

	public function GetOferta_Tipo($idOferta)
	{
		$Oferta = null;

			
			$this->db->select('*'); 
			$this->db->from('Ofertas');
			$this->db->where('ID', $idOferta);
			$query = $this->db->get();
            $result = $query->result_array();
            $Oferta = $result;

		return $Oferta;
	}

	public function GetProductos_Regalo($idOferta)
	{
		$Oferta = null;

			
			$this->db->select('*'); 
			$this->db->from('Regalos');
			$this->db->where('idOferta', $idOferta);
			$query = $this->db->get();
            $result = $query->result_array();
            $Oferta = $result;

		return $Oferta;
	}


	public function Update_Existencias_Oferta($Detalle,$idSucursal)
	{
		$this->db->trans_begin();

		$Oferta = $this->GetOferta_Tipo($Detalle['idOferta']);


		if ($Oferta[0]['Tipo_Regalo'] == '1')
		{
			$Regalos = $this->GetProductos_Regalo($Detalle['idOferta']);

			for ($i=0; $i < count($Regalos); $i++)
			{ 
				$idDetalle_Inventario = $this->Get_Detalle_Venta_Existencias($Regalos[$i]['idCatalogo'],$idSucursal);

				$Detalle_Venta_Menudeo_Oferta_array1 = array(
				'idVenta_menudeo' => $Detalle['idVenta_menudeo'],
				'idCatalogo' => $Regalos[$i]['idCatalogo'],
				'idOferta' => $Detalle['idOferta'],
				'idDetalle_inventario' => $idDetalle_Inventario[0]['ID'],
				'Cantidad' => 1,
				'Precio_unitario' => 0.00,
				'Importe' => 0.00);

				$this->db->insert('Detalle_venta_menudeo_temp', $Detalle_Venta_Menudeo_Oferta_array1);
				$this->db->insert('detalle_venta_menudeo_temp_back', $Detalle_Venta_Menudeo_Oferta_array1);

				$Existencia_Real = intval($idDetalle_Inventario[0]['Existencias'] - 1);

				$this->db->where('ID',$idDetalle_Inventario[0]['ID']);
				$this->db->set('Existencias',$Existencia_Real);
				$this->db->update('Detalle_inventario');
			}
		}

			$Detalle_Venta_Menudeo_Oferta_array = array(
				'idVenta_menudeo' => $Detalle['idVenta_menudeo'],
				'idOferta' => $Detalle['idOferta'],
				'Cantidad' => $Detalle['Cantidad'],
				'Precio_unitario' => $Detalle['Precio_unitario'],
				'Importe' => $Detalle['Importe']);

		
		$this->db->insert('Detalle_venta_menudeo_temp', $Detalle_Venta_Menudeo_Oferta_array);
		$this->db->insert('detalle_venta_menudeo_temp_back', $Detalle_Venta_Menudeo_Oferta_array);
		

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

	public function Update_Existencias_Promo($id,$Existencias,$Detalle)
	{
		$Detalle_Venta_Menudeo_Promo_array = array(
				'idVenta_menudeo' => $Detalle['idVenta_menudeo'],
				'idCatalogo' => $Detalle['idCatalogo'],
				'idPromocion' => $Detalle['idPromocion'],
				'idOferta' => $Detalle['idOferta'],
				'idDetalle_Inventario' => $id,
				'Cantidad' => $Detalle['Cantidad'],
				'Precio_unitario' => $Detalle['Precio_publico'],
				'Importe' => $Detalle['Total']);
 

		$this->db->trans_begin();

		$this->db->query('UPDATE Detalle_inventario SET Existencias='.$Existencias.' WHERE ID='.$id.'');

		$this->db->insert('Detalle_venta_menudeo_temp', $Detalle_Venta_Menudeo_Promo_array);

		$this->db->insert('detalle_venta_menudeo_temp_back', $Detalle_Venta_Menudeo_Promo_array);

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

	public function Update_Existencias_Promo_1($id,$Existencias,$Detalle,$Cantidad)
	{
		$Importe_Real = $Cantidad * $Detalle['Precio_publico'];
		
		$Detalle_Venta_Menudeo_Promo_array = array(
				'idVenta_menudeo' => $Detalle['idVenta_menudeo'],
				'idCatalogo' => $Detalle['idCatalogo'],
				'idPromocion' => $Detalle['idPromocion'],
				'idOferta' => $Detalle['idOferta'],
				'idDetalle_Inventario' => $id,
				'Cantidad' => $Cantidad,
				'Precio_unitario' => $Detalle['Precio_publico'],
				'Importe' => $Importe_Real);
 

		$this->db->trans_begin();

		$this->db->query('UPDATE Detalle_inventario SET Existencias='.$Existencias.' WHERE ID='.$id.'');

		$this->db->insert('Detalle_venta_menudeo_temp', $Detalle_Venta_Menudeo_Promo_array);

		$this->db->insert('detalle_venta_menudeo_temp_back', $Detalle_Venta_Menudeo_Promo_array);

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

    public function Get_All_Detalle_Menudeo($id)
    {
    	/* select DVM.* from Ventas_menudeo AS VM INNER JOIN Detalle_venta_menudeo DVM on VM.ID = DVM.idVenta_menudeo where VM.idVenta = 674;
    	*/

    	$Detalle_Venta = null;

			
			$this->db->select('DVM.*'); 
			$this->db->from('Ventas_menudeo AS VM');
			$this->db->join('Detalle_venta_menudeo DVM','VM.ID = DVM.idVenta_menudeo');
			$this->db->where('VM.idVenta', $id);
			$query = $this->db->get();
            $result = $query->result_array();
            $Detalle_Venta = $result;

		return $Detalle_Venta;
    }

    public function Get_Producto_By_id($id)
    {
    	
    	$Producto = null;

			
			$this->db->select('*'); 
			$this->db->from('Catalogo');
			$this->db->where('ID', $id);
			$query = $this->db->get();
            $result = $query->result_array();
            $Producto = $result;

		return $Producto;
    }


    public function Get_Detalle_Venta_Menudeo_Temp_By_IdVenta($id)
    {
    	/*select DVMT.* from Ventas_menudeo AS VM
  INNER JOIN Detalle_venta_menudeo_temp AS DVMT ON VM.ID = DVMT.idVenta_menudeo
  WHERE VM.idVenta = 364;*/

  		$Detalle = null;

			
			$this->db->select('DVMT.*'); 
			$this->db->from('Ventas_menudeo AS VM');
			$this->db->join('Detalle_venta_menudeo_temp AS DVMT','VM.ID = DVMT.idVenta_menudeo');
			$this->db->where('VM.idVenta', $id);
			$query = $this->db->get();
            $result = $query->result_array();
            $Detalle = $result;

		return $Detalle;
    }

    public function Get_Detalle_Inventario($id)
    {
    	/*select DVMT.* from Ventas_menudeo AS VM
  INNER JOIN Detalle_venta_menudeo_temp AS DVMT ON VM.ID = DVMT.idVenta_menudeo
  WHERE VM.idVenta = 364;*/

  		$Detalle = null;

			
			$this->db->select('*'); 
			$this->db->from('Detalle_inventario');
			$this->db->where('ID', $id);
			$query = $this->db->get();
            $result = $query->result_array();
            $Detalle = $result;

		return $Detalle;
    }

    public function Agregar_Existencias($Detalle_Venta_Temp,$id)
	{
		$this->db->trans_begin();

		for ($i=0; $i < count($Detalle_Venta_Temp); $i++)
		{ 
			$Existencias = 0;

			if ($Detalle_Venta_Temp[$i]['idDetalle_inventario'] != null && $Detalle_Venta_Temp[$i]['idDetalle_inventario'] != "")
			{
				$Detalle_Inventario = $this->Get_Detalle_Inventario($Detalle_Venta_Temp[$i]['idDetalle_inventario']);

				$Existencias = $Detalle_Inventario[0]['Existencias'] + $Detalle_Venta_Temp[$i]['Cantidad'];

				$this->db->query('UPDATE Detalle_inventario SET Existencias='.$Existencias.' WHERE ID='.$Detalle_Venta_Temp[$i]['idDetalle_inventario'].'');
				
			}

		}
		
		$this->db->query('DELETE DVMT.* FROM Detalle_venta_menudeo_temp AS DVMT INNER JOIN Ventas_menudeo AS VM ON DVMT.idVenta_menudeo = VM.ID WHERE VM.idVenta ='.$id.' ');
		$this->db->query('UPDATE Ventas_menudeo SET Extraido = 0 WHERE idVenta='.$id.'');
		$this->db->query('UPDATE Ventas SET Extraido = 0 WHERE ID='.$id.'');

		$logs_ventas_desk = array('idVenta' => $id,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Eliminar Extraccion',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

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

	public function getLocationDestino1($idCatalogo){
		$query = $this->db->query("select di.*, lo.Categoria, i.Cantidad_picking, lo.Locacion
		FROM inventario i
		INNER JOIN detalle_inventario di on i.ID = di.idInventario
		INNER JOIN locaciones lo on di.idLocacion = lo.ID
		where i.idCatalogo = ".$idCatalogo."
		and di.Existencias > 0
		and lo.Categoria != 1
		order by di.ID ASC");

		return $query->result_array();
	}

	public function getLocationOrigen($idInventario,$idSucusal){
		$query = $this->db->query("SELECT detalle_inventario.*,SUM(Existencias) AS Existencias_locacion, locaciones.ID as idLocacion, locaciones.Locacion, inventario.Cantidad_picking, IF(inventario.Cantidad_picking >= SUM(Existencias), inventario.Cantidad_picking,SUM(Existencias)) ShowExistencias 
		FROM detalle_inventario 
		JOIN inventario ON detalle_inventario.idInventario = inventario.ID 
		JOIN locaciones ON detalle_inventario.idLocacion = locaciones.ID 
		WHERE idInventario = ".$idInventario." 
		AND inventario.idSucursal = ".$idSucusal."
		AND Existencias <> 0 
		AND Categoria <> 1 
		GROUP BY locaciones.ID
		ORDER BY Categoria, Fecha_ingreso, detalle_inventario.ID");
		return $query->result_array();
	}

	public function getLocationOrigenCatalogo($idCatalogo,$idSucusal){
		$query = $this->db->query("SELECT detalle_inventario.*,SUM(Existencias) AS Existencias_locacion, locaciones.ID as idLocacion, locaciones.Locacion, inventario.Cantidad_picking, IF(inventario.Cantidad_picking >= SUM(Existencias), inventario.Cantidad_picking,SUM(Existencias)) ShowExistencias 
		FROM detalle_inventario 
		JOIN inventario ON detalle_inventario.idInventario = inventario.ID 
		JOIN locaciones ON detalle_inventario.idLocacion = locaciones.ID 
		WHERE inventario.idCatalogo = ".$idCatalogo." 
		AND inventario.idSucursal = ".$idSucusal."
		AND Existencias <> 0 
		AND Categoria <> 1 
		GROUP BY locaciones.ID
		ORDER BY Categoria, Fecha_ingreso, detalle_inventario.ID");

		return $query->result_array();
	}

	public function getLocationDestino($idInventario, $idSucusal){
		$query = $this->db->query("(SELECT locaciones.id, locaciones.Locacion 
		FROM detalle_inventario JOIN locaciones ON detalle_inventario.idLocacion = locaciones.ID 
		WHERE idInventario = ".$idInventario." 
		AND Categoria = 1
		AND idSucursal = ".$idSucusal."
		ORDER BY detalle_inventario.ID DESC
		LIMIT 1)
		UNION (SELECT locaciones.id, locaciones.Locacion FROM locaciones WHERE Categoria = 1 AND idSucursal = ".$idSucusal.");");
		// HAVING SUM(di.Existencias) > 0");

		return $query->result_array();
	}

	public function getLocationDestinoCatalogo($idCatalogo, $idSucusal)	{
		$query = $this->db->query("(SELECT locaciones.id, locaciones.Locacion 
		FROM detalle_inventario 
    	JOIN locaciones ON detalle_inventario.idLocacion = locaciones.ID 
    	JOIN inventario I ON detalle_inventario.idInventario = I.ID
		WHERE I.idCatalogo =  ".$idCatalogo."
		AND locaciones.Categoria = 1
		AND locaciones.idSucursal = ".$idSucusal." and I.idSucursal = ".$idSucusal."
		ORDER BY detalle_inventario.ID DESC
		LIMIT 1)
		UNION (SELECT locaciones.id, locaciones.Locacion FROM locaciones WHERE Categoria = 1 AND idSucursal = ".$idSucusal.")");
		// HAVING SUM(di.Existencias) > 0");

		return $query->result_array();
	}

	public function getValidateOrigin($idLocation, $idCatalogo, $idSucursal){
		$query = $this->db->query("select di.*, SUM(di.Existencias) AS ExistenciasTotal, i.idCatalogo
		from detalle_inventario di
		inner join locaciones lo on di.idLocacion = lo.ID
		inner join inventario i on di.idInventario = i.ID
		where lo.Categoria != 1
		and i.idSucursal = ".$idSucursal."
		and di.Existencias > 0
		AND di.idLocacion = ".$idLocation."
		AND i.idCatalogo =".$idCatalogo);
		return $query->result_array();
	}



public function getInfoCategoria($idVenta, $idSucursal){
		// Get Query Productos
		$query = $this->db->query("SELECT inventario_existencias_cat1_view.id, detalle_venta_menudeo.idCatalogo, catalogo.Codigo, catalogo.Producto, inventario.Cantidad_picking, Existencias_totales, SUM(Cantidad) AS Cantidad_producto, if(Existencias_totales >= SUM(Cantidad), 1, 0) as validate, inventario.ID as idInventario
		FROM detalle_venta_menudeo 
		JOIN ventas_menudeo ON detalle_venta_menudeo.idVenta_menudeo = ventas_menudeo.ID
		JOIN inventario_existencias_cat1_view ON detalle_venta_menudeo.idCatalogo = inventario_existencias_cat1_view.idCatalogo 
		AND inventario_existencias_cat1_view.idSucursal = ".$idSucursal."
		JOIN catalogo ON detalle_venta_menudeo.idCatalogo = catalogo.ID 
    JOIN inventario on detalle_venta_menudeo.idCatalogo = inventario.idCatalogo and inventario.idSucursal = ".$idSucursal."
		and inventario_existencias_cat1_view.idCatalogo = catalogo.ID
		WHERE ventas_menudeo.idVenta = ".$idVenta."
		GROUP BY detalle_venta_menudeo.idCatalogo;");

		$response['product'] = $query->result_array();

		$query = $this->db->query("SELECT inventario_existencias_cat1_view.id, productos_promociones.idCatalogo, catalogo.Codigo, catalogo.Producto, inventario.Cantidad_picking, Existencias_totales, SUM(detalle_venta_menudeo.Cantidad * productos_promociones.Cantidad) AS Cantidad_producto, if(Existencias_totales >= SUM(detalle_venta_menudeo.Cantidad * productos_promociones.Cantidad), 1, 0) as validate, inventario.ID as idInventario
		FROM detalle_venta_menudeo 
		JOIN productos_promociones ON detalle_venta_menudeo.idPromocion = productos_promociones.idPromocion
		JOIN ventas_menudeo ON detalle_venta_menudeo.idVenta_menudeo = ventas_menudeo.ID 
		LEFT JOIN inventario_existencias_cat1_view ON productos_promociones.idCatalogo = inventario_existencias_cat1_view.idCatalogo 
		AND inventario_existencias_cat1_view.idSucursal = ".$idSucursal." 
		left JOIN catalogo on productos_promociones.idCatalogo = catalogo.ID
		LEFT JOIN inventario ON productos_promociones.idCatalogo = inventario.idCatalogo AND inventario.idSucursal = ".$idSucursal."
		WHERE idVenta = ".$idVenta."
		GROUP BY productos_promociones.idCatalogo");

		$response['promo'] = $query->result_array();

		return $response;
	}

	public function getInventario($idCatalogo, $idSucursal){
		$query = $this->db->query("select * from inventario where idCatalogo = ".$idCatalogo." and idSucursal = ".$idSucursal.";");
		return $query->result_array();
	}

	public function addMoveInventary($info){
		$this->db->trans_begin();

		$this->db->insert('movimientos_inventario_ops', $info);

		$this->db->save_queries = TRUE;

		if ($this->db->trans_status() === FALSE){
		        $this->db->trans_rollback();
		        return 0;
		}
		else{
		        $this->db->trans_commit();
		        return 1;
		}
	}


}

?>