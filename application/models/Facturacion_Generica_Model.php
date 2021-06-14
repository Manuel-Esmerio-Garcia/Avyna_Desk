<?php
class Facturacion_Generica_Model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	// Obetener Factura Generica Status != Guardado //
	public function getInfoFacturaGenericaByStatus()
	{
		
		$this->db->select('*'); 
		$this->db->from('factura_generica');
		$this->db->where('Status !=','Guardado');
		$this->db->group_by('Status');
		$query = $this->db->get();
		$result = $query->result_array();

		return $result;
	}

	public function GetRFCEmpresa()
	{
		$listInvoice = null;
		try
		{
			
			$this->db->select('RFC'); 
			$this->db->from('Empresa');
			$query = $this->db->get();
			$result = $query->result_array();
			$listInvoice = $result;
		}
		catch(Exception $er)
		{
			$listInvoice = null;
		}
		return $listInvoice;
	}


	public function GetAllEmpresaById($RFC)
	{
		$listEmpresa = null;
		try
		{
			
			$this->db->select('*'); 
			$this->db->from('Empresa');
			$this->db->where('RFC', $RFC );
			$query = $this->db->get();
			$result = $query->result_array();
			$listEmpresa = $result;

		}
		catch(Exception $er)
		{
			$listEmpresa = null;
		}
		return $listEmpresa;
	}


	public function Guardar_Factura($data)
	{
		$insertInvoice = false;

		try
		{
			if(empty($data) == false && isset($data))
			{				
				$this->db->insert('factura_generica', $data);
				$insert_id = $this->db->insert_id();
				$insertInvoice = true;

			}
		}
		catch(Exception $er)
		{
			$insertInvoice = false;
		}

		return $insert_id;
	}


	public function Guardar_Factura_Detalle($data)
	{
		$insertGuardar_Factura_Detalle = false;
		$Total_Movimientos  = array();

		try
		{
			if(empty($data) == false && isset($data))
			{		

				for ($i=0; $i <= count($data) -1 ; $i++)
				{ 
					$Movimiento = array('ID_Factura_Generica' => $data[$i]['ID_Factura_Generica'],
										'Cantidad' => $data[$i]['Cantidad'],
										'Producto' => $data[$i]['Producto'],
										'Unidad' => $data[$i]['Unidad'],
										'Clave_Unidad' => $data[$i]['Clave_Unidad'],
										'Clave_SAT' => $data[$i]['Clave_SAT'],
										'Valor_Unitario' => $data[$i]['Valor_Unitario'],
										'Impuesto' => $data[$i]['Impuesto'],
										'Retenciones_IVA' => $data[$i]['Retenciones_IVA'],
										'Retenciones_ISR' => $data[$i]['Retenciones_ISR'],
										'Descuento' => $data[$i]['Descuento'],
										'Importe' => $data[$i]['Importe']);

					array_push($Total_Movimientos,$Movimiento);
				}

				$this->db->insert_batch('factura_detalle', $Total_Movimientos);
				$insert_id = $this->db->insert_id();

				if ($insert_id != null && $insert_id != "")
				{
					$insertGuardar_Factura_Detalle = true;
				}
				else
				{
					$insertGuardar_Factura_Detalle = false;
				}

			}
		}
		catch(Exception $er)
		{
			$insertGuardar_Factura_Detalle = false;
		}

		return $insertGuardar_Factura_Detalle;
	}

	public function Guardar_Factura_Impuesto($data)
	{
		$insertImpuesto = false;

		try
		{
			if(empty($data) == false && isset($data))
			{				
				$this->db->insert_batch('factura_impuesto', $data);
				$insert_id = $this->db->insert_id();
				$insertImpuesto = true;

			}
		}
		catch(Exception $er)
		{
			$insertImpuesto = false;
		}

		return $insertImpuesto;
	}

	public function Guardar_Relacion_Factura($data)
	{
		$insertImpuesto = false;

		try
		{
			if(empty($data) == false && isset($data))
			{				
				$this->db->insert_batch('factura_relacion_generica', $data);
				$insert_id = $this->db->insert_id();
				$insertImpuesto = true;

			}
		}
		catch(Exception $er)
		{
			$insertImpuesto = false;
		}

		return $insertImpuesto;
	}


	public function Eliminar_Factura_Creada($ID)
	{
		$this->Eliminar_Factura_Relacion($ID);
		$this->Eliminar_Impuesto_Factura($ID);
		$this->Eliminar_Factura_Detalle($ID);
		$this->db->where("ID",$ID);
		$this->db->delete('factura_generica');
		$Afectado = $this->db->affected_rows();

		return $Afectado;
	}

	public function Eliminar_Impuesto_Factura($ID)
	{
		$this->db->where("ID_Factura_Generica",$ID);
		$this->db->delete('factura_impuesto');
		$Afectado = $this->db->affected_rows();

		return $Afectado;
	}

	public function Eliminar_Factura_Relacion($ID)
	{
		$this->db->where("ID_Factura_Generica",$ID);
		$this->db->delete('factura_relacion_generica');
		$Afectado = $this->db->affected_rows();

		return $Afectado;
	}

	public function Eliminar_Factura_Detalle($ID)
	{
		$this->db->where("ID_Factura_Generica",$ID);
		$this->db->delete('factura_detalle');
		$Afectado = $this->db->affected_rows();

		return $Afectado;
	}


	public function Editar_Factura($data,$id)
	{
		$insertInvoice = 'fallo';

		try
		{
			if(empty($data) == false && isset($data))
			{				
				$this->db->replace('factura_generica', $data);
				$this->db->where('ID',$id);
				$insertInvoice = 'correcto';

			}
		}
		catch(Exception $er)
		{
			$insertInvoice = 'fallo';
		}

		return $insertInvoice;
	}


	public function Editar_Factura_Detalle($data,$id)
	{

		$insert_Editar_Factura_Detalle = 'fallo';
		$Contador 					   = 0;
		$Total_Movimientos  = array();

		$Movimientos_Detalle = $this->get_Detalle_Factura($id);

		try
		{
			if(empty($data) == false && isset($data))
			{		

				for ($i=0; $i <= count($data) -1 ; $i++)
				{ 
					

					if ($Movimientos_Detalle[$i]['ID'] != null && $Movimientos_Detalle[$i]['ID'] != "")
					{
						$this->db->where("ID",$Movimientos_Detalle[$i]['ID']);
						$update_id = $this->db->update('factura_detalle', $data[$i]);
						$Contador ++;
					}
					else
					{
						$this->db->insert('factura_detalle', $data[$i]);
						$insert_id = $this->db->insert_id();
						$Contador ++;
					}

				}

			}

			if ($Contador == count($data))
			{
				$insert_Editar_Factura_Detalle = 'Correcto';
			}
			else
			{
				$insert_Editar_Factura_Detalle = 'fallo';
			}

		}
		catch(Exception $er)
		{
			$insert_Editar_Factura_Detalle = 'fallo';
		}

		return $insert_Editar_Factura_Detalle;
	}


	public function get_Detalle_Factura($id)
	{
		$listFacturar = null;
		try
		{
			
			$this->db->select('*'); 
			$this->db->from('factura_detalle');
			$this->db->where('ID_Factura_Generica', $id);
			$query = $this->db->get();
			$result = $query->result_array();
			$listFacturar = $result;
		}
		catch(Exception $er)
		{
			$listFacturar = null;
		}
		return $listFacturar;
	}


	public function Facturar($id)
	{
		$listFacturar = null;
		try
		{
			
			$this->db->select('*'); 
			$this->db->from('Factura_Generica_Data');
			$this->db->where('ID_Factura', $id);
			$query = $this->db->get();
			$result = $query->result_array();
			$listFacturar = $result;
		}
		catch(Exception $er)
		{
			$listFacturar = null;
		}
		return $listFacturar;
	}

	public function FacturaRelacion($id)
	{
		$listFacturarRelacion = null;
		try
		{
			
			$this->db->select('*'); 
			$this->db->from('factura_relacion_generica');
			$this->db->where('ID_Factura_Generica', $id);
			$query = $this->db->get();
			$result = $query->result_array();
			$listFacturarRelacion = $result;
		}
		catch(Exception $er)
		{
			$listFacturarRelacion = null;
		}
		return $listFacturarRelacion;
	}


	public function Facturar_Impuesto($id)
	{
		$listFacturarImpuesto = null;
		try
		{
			
			$this->db->select('*'); 
			$this->db->from('factura_impuesto');
			$this->db->where('ID_Factura_Generica', $id);
			$query = $this->db->get();
			$result = $query->result_array();
			$listFacturarImpuesto = $result;
		}
		catch(Exception $er)
		{
			$listFacturarImpuesto = null;
		}
		return $listFacturarImpuesto;
	}

	public function Guardar_Factura_Timbrada($data)
	{
		$insertInvoice = false;

		try
		{
			if(empty($data) == false && isset($data))
			{				
				
				$this->db->insert('factura_timbrada', $data);
				$insert_id = $this->db->insert_id();

				if ($insert_id != 0)
				{
					$insertInvoice = true;
				}

				else
				{
					$insertInvoice = false;
				}
			}
		}
		catch(Exception $er)
		{
			$insertInvoice = false;
		}
		return $insertInvoice;
	}

	public function AddRelacion($relacion,$tipo,$UUID){

		$UUIDRelacionClear = array();

		for ($i=0; $i <=count($relacion) -1 ; $i++) 
			{ 
				/*array_push($UUIDRelacionado,$UUID);
				array_push($UUIDRelacionado,$relacion[$i]);
				array_push($UUIDRelacionado,$tipo);*/

				$UUIDRelacionado = array(

					"UUID_Factura"  	=>	$UUID,
					"UUIDRelacionado"	=> 	$relacion[$i],
					"TipoRelacion"		=>	$tipo,

				);	

				array_push($UUIDRelacionClear,$UUIDRelacionado);
			}

		try
		{			
			
			$this->db->insert_batch('Factura_Relacion', $UUIDRelacionClear);
			$insert_id = $this->db->insert_id();
			$insertRelacion = true;

		}
		catch(Exception $er)
		{
			$insertRelacion = false;
		}

		return $insertRelacion;
	}

	public function GetStatus()
	{
		$listFacturar_Generica = null;
		try
		{
			
			$this->db->select('*'); 
			$this->db->from('factura_generica');
			$this->db->where('Status !=','Guardado');
			$this->db->group_by('Status');
			$query = $this->db->get();
			$result = $query->result_array();
			$listFacturar_Generica = $result;
		}
		catch(Exception $er)
		{
			$listFacturar_Generica = null;
		}
		return $listFacturar_Generica;

	}

	public function Update_Factura_Status($id)
	{
		$listFacturar_Generica_status = null;
		try
		{
			$this->db->where('ID',$id);
			$this->db->set('Status', 'Timbrado');
			$this->db->set('Timbrado', 1);
			$listFacturar_Generica_status = $this->db->update('factura_generica');
		}
		catch(Exception $er)
		{
			$listFacturar_Generica_status = null;
		}
		return $listFacturar_Generica_status;
	}

	public function Get_all_Factura($id)
	{
		$GetFactura = null;
		try
		{
			$this->db->select('fg.*, fd.Cantidad, fd.Producto, fd.Unidad, fd.Clave_Unidad, fd.Clave_SAT, fd.Valor_Unitario, fd.Impuesto as Impuesto_Movimiento, fd.Retenciones_IVA, fd.Retenciones_ISR, fd.Descuento as Descuento_Movimiento, fd.Importe');
			$this->db->from('factura_generica AS fg');
			$this->db->join('factura_detalle as fd','fg.ID = fd.ID_Factura_Generica');
			$this->db->where('fg.ID',$id);
			$query = $this->db->get();
			$result = $query->result_array();
			$GetFactura = $result;
		}
		catch(Exception $er)
		{
			$GetFactura = null;
		}
		return $GetFactura;
	}


	public function Cargar_Correo($id)
	{

		$GetFactura = null;
		try
		{
			$this->db->select('*');
			$this->db->from('factura_generica');
			$this->db->where('ID',$id['ID_Factura']);
			$query = $this->db->get();
			$result = $query->result_array();
			$GetFactura = $result;
		}
		catch(Exception $er)
		{
			$GetFactura = null;
		}
		return $GetFactura;
	}


	public function getFacturabyID($id)
	{
		$GetFacturaCancelar = null;
		try
		{
			$this->db->select('*');
			$this->db->from('factura_timbrada');
			$this->db->where('ID_Factura_Generica',$id);
			$query = $this->db->get();
			$result = $query->result_array();
			$GetFacturaCancelar = $result;
		}
		catch(Exception $er)
		{
			$GetFacturaCancelar = null;
		}
		return $GetFacturaCancelar;
	}

	public function UpdateStatusFactura($id)
	{
		$data = array(

			'Status' => 'Cancelado'
		);

		$StatusFactura = false;

		try
		{
			if(empty($id) == false && isset($id) && empty($data) == false && isset($data))
			{				
				
				$this->db->where('ID', $id);
				$this->db->update('factura_timbrada', $data);
				$StatusFactura = true;

				
				$this->db->where('ID', $id);
				$this->db->update('factura_generica', $data);
				$StatusFactura = true;
			}
		}
		catch(Exception $er)
		{
			$StatusFactura = false;
		}
		return $StatusFactura;
	}


	
}

?>