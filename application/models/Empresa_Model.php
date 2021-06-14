<?php
class Empresa_Model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	// Obtener Empresa //
	public function getEmpresa($id)
	{
		
		$this->db->select('*'); 
		$this->db->from('Empresa');
		$this->db->where('ID', $id );
		$query = $this->db->get();
		return $query->result_array();	
	}

		public function DatosEmpresa($id){

		$check = false;
		$listEmpresa = null;

		try{


			
			$this->db->select('*'); 
			$this->db->from('Empresa');
			$this->db->where('ID', $id );
			$query = $this->db->get();
			$result = $query->result_array();
			$listEmpresa = $result;
			$check = true;

			}

			catch(Exception $er)
			{
				$check = false;
			}

			return $listEmpresa;
	}

	public function CrearEmpresa($data){

		$check = false; 
		try
		{
			if(empty($data) == false && isset($data))
			{
				
				$this->db->insert('Empresa', $data);
				$check = true;
			}
		}
		catch(Exception $er)
		{
			$userObject = null;
		}
		return $check; 
	}

	public function updateEmpresa($data){

		$check = false; 
		try
		{
			if(empty($data) == false && isset($data))
			{
				
				$this->db->where('ID', $data['ID']);
				$this->db->set('Razon_Social', $data['Razon_Social']);
				$this->db->set('RFC', $data['RFC']);
				$this->db->set('Clave_Regimen_Fiscal', $data['Clave_Regimen_Fiscal']);
				$this->db->set('Descripcion_Regimen_Fiscal', $data['Descripcion_Regimen_Fiscal']);		
				$this->db->set('Direccion', $data['Direccion']);
				$this->db->set('Colonia', $data['Colonia']);
				$this->db->set('Pais', $data['Colonia']);
				$this->db->set('Estado', $data['Estado']);
				$this->db->set('Municipio', $data['Municipio']);
				$this->db->set('CP', $data['CP']);
				$this->db->set('Telefono1', $data['Telefono1']);
				$this->db->set('Telefono2', $data['Telefono2']);
				$this->db->update('Empresa', $data);

				$check = true;
			}
		}
		catch(Exception $er)
		{
			$userObject = null;
		}
		return $check; 
	}

		public function UpdateEmpresaCertificado($data, $id){

		$UpdateCertificado = false; 
		try
		{
			if(empty($id) == false && isset($id) && empty($data) == false && isset($data))
			{
				if($id > 0)
				{
					
					$this->db->where('ID', $id);
					$this->db->set('Pass_CSD', $data['Contraseña']);
					$this->db->set('CSD_cer', $data['CER']);
					$this->db->set('CSD_key', $data['KEY']);
					$this->db->set('noCertificado', $data['Certificado']);		
					$this->db->set('Vigencia_Desde', $data['Desde']);
					$this->db->set('Vigencia_Hasta', $data['Hasta']);
					$this->db->update('Empresa');
					$UpdateCertificado = true;
				}
			}
		}
		catch(Exception $er)
		{
			$UpdateCertificado = false; 
		}
		return $UpdateCertificado;
	}
}

?>