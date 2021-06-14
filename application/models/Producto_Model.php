<?php
class Producto_Model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	/********************************************************************/
    /***   Función: exportReport() 	                             	  ***/
    /***   Autor: Manuel Esmerio Gacria					      	      ***/
    /***   Fecha: 16/01/2020    					                  ***/
    /***   Descripción: Generar Reporte                          	  ***/
    /********************************************************************/
    public function exportarCSV(){
        
        $this->db->select('ID,Codigo,Producto, Proveedor, ListMarca, ListDivision,ListLinea,ListSublinea,Descripcion,Volumen,Peso,Ml,Piezas_x_empaque,Distribuidor,Salon,Publico,UnidadSAT,ClaveSAT,Status'); 
        $this->db->from('View_Tabla_Productos');

        $query = $this->db->get();
        $response = $query->result_array();

        return $response;
    }
	// Obtener Productos By ID //
	public function getProductoById($id)
    {
		
		$this->db->select('*'); 
		$this->db->from('Catalogo');
		$this->db->where('ID', $id);
		$this->db->where('Status','Activo');
		$query = $this->db->get();
        $result = $query->result_array();

		return $result;
    }

    // Obtener Productos //
    public function getProductos()
    {
    	
        $this->db->select('*'); 
		$this->db->from('Catalogo');
		$this->db->where('Status','Activo');
        $query = $this->db->get();
        return $query->result_array();
    }

	public function Get_Divicion()
	{
		$Divicion = null;

			$this->db->distinct();
			$this->db->select('*'); 
			$this->db->from('Divisiones');
			$query = $this->db->get();
			$result = $query->result_array();
			$Divicion = $result;

		return $Divicion;
	}

	public function Get_Marca()
	{
		$Marca = null;

			$this->db->distinct();
			$this->db->select('*'); 
			$this->db->from('Marcas');
			$query = $this->db->get();
			$result = $query->result_array();
			$Marca = $result;

		return $Marca;
	}

	public function Get_Linea()
	{
		$Linea = null;

			$this->db->distinct();
			$this->db->select('*'); 
			$this->db->from('Lineas');
			$query = $this->db->get();
			$result = $query->result_array();
			$Linea = $result;

		return $Linea;
	}

	public function Get_Sublinea()
	{
		$Sublinea = null;

			$this->db->distinct();
			$this->db->select('*'); 
			$this->db->from('Sublineas');
			$query = $this->db->get();
			$result = $query->result_array();
			$Sublinea = $result;

		return $Sublinea;
	}

	public function Get_Proveedores()
	{
		$Proveedor = null;

			$this->db->distinct();
			$this->db->select('*'); 
			$this->db->from('Proveedores');
			$query = $this->db->get();
			$result = $query->result_array();
			$Proveedor = $result;

		return $Proveedor;
	}

	public function Get_Linea_By_ID($id)
	{
		$Linea = null;

			$this->db->distinct();
			$this->db->select('*'); 
			$this->db->from('Lineas');
			$this->db->where('ID',$id);
			$query = $this->db->get();
			$result = $query->result_array();
			$Linea = $result;

		return $Linea;
	}

	public function Get_Sublinea_By_ID($id)
	{
		$Sublinea = null;

			$this->db->distinct();
			$this->db->select('*'); 
			$this->db->from('Sublineas');
			$this->db->where('ID',$id);
			$query = $this->db->get();
			$result = $query->result_array();
			$Sublinea = $result;

		return $Sublinea;
	}

	public function Agregar_Producto($data){

		$this->db->trans_start(); # Starting Transaction
		$this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

		$this->db->insert('Catalogo', $data); 

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

	public function Editar_Producto($data,$id){

		$this->db->trans_start(); # Starting Transaction
		$this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

		$this->db->where('ID',$id);
		$this->db->update('Catalogo', $data);

		$this->db->trans_complete(); # Completing transaction

		/*Optional*/

		if ($this->db->trans_status() === FALSE) {
			# Something went wrong.
			return 0;
		} 
		else {
			# Everything is Perfect. 
			# Committing data to the database.
			$this->db->trans_commit();
			return 1;
		}
	}

	public function Get_Catalogo_By_ID($id)
	{
		$Catalogo = null;

			$this->db->distinct();
			$this->db->select('*'); 
			$this->db->from('Catalogo');
			$this->db->where('ID',$id);
			$query = $this->db->get();
			$result = $query->result_array();
			$Catalogo = $result;

		return $Catalogo;
	}

	public function Eliminar_Producto($id)
	{
		if(empty($id) == false && isset($id))
        {               
            
            $this->db->where('ID',$id);
            $this->db->set('Status','Inactivo');
            $this->db->update('Catalogo');
            $insert_id = $this->db->affected_rows();

        }
        
        return $insert_id;
	}

	public function Agregar_Marca($data)
	{
		if(empty($data) == false && isset($data))
        {               
            
            $this->db->insert('Marcas', $data);
            $insert_id = $this->db->insert_id();

        }

        return $insert_id;
	}

	public function Editar_Marca($data,$id)
	{
		if(empty($data) == false && isset($data))
        {               
            
            $this->db->where('ID',$id);
            $this->db->set('Marca',$data);
            $this->db->update('Marcas');
            $insert_id = $this->db->affected_rows();

        }
        
        return $insert_id;
	}

	public function Eliminar_Marca($id)
	{
		if(empty($id) == false && isset($id))
        {               
            
            $this->db->where('ID',$id);
            $this->db->delete('Marcas');
            $insert_id = $this->db->affected_rows();

        }
        
        return $insert_id;
	}

	public function Agregar_Division($data)
	{
		if(empty($data) == false && isset($data))
        {               
            
            $this->db->insert('Divisiones', $data);
            $insert_id = $this->db->insert_id();

        }

        return $insert_id;
	}

	public function Editar_Division($data,$id)
	{
		if(empty($data) == false && isset($data))
        {               
            
            $this->db->where('ID',$id);
            $this->db->set('Division',$data);
            $this->db->update('Divisiones');
            $insert_id = $this->db->affected_rows();

        }
        
        return $insert_id;
	}

	public function Eliminar_Division($id)
	{
		if(empty($id) == false && isset($id))
        {               
            
            $this->db->where('ID',$id);
            $this->db->delete('Divisiones');
            $insert_id = $this->db->affected_rows();

        }
        
        return $insert_id;
	}

	public function Agregar_Linea($data)
	{
		if(empty($data) == false && isset($data))
        {               
            
            $this->db->insert('Lineas', $data);
            $insert_id = $this->db->insert_id();

        }

        return $insert_id;
	}

	public function Editar_Linea($data,$id)
	{
		if(empty($data) == false && isset($data))
        {               
            
            $this->db->where('ID',$id);
            $this->db->update('Lineas',$data);
            $insert_id = $this->db->affected_rows();

        }
        
        return $insert_id;
	}

	public function Eliminar_Linea($id)
	{
		if(empty($id) == false && isset($id))
        {               
            
            $this->db->where('ID',$id);
            $this->db->delete('Lineas');
            $insert_id = $this->db->affected_rows();

        }
        
        return $insert_id;
	}

	public function Agregar_Sublinea($data)
	{
		if(empty($data) == false && isset($data))
        {               
            
            $this->db->insert('Sublineas', $data);
            $insert_id = $this->db->insert_id();

        }

        return $insert_id;
	}

	public function Editar_Sublinea($data,$id)
	{
		if(empty($data) == false && isset($data))
        {               
            
            $this->db->where('ID',$id);
            $this->db->update('Sublineas',$data);
            $insert_id = $this->db->affected_rows();

        }
        
        return $insert_id;
	}

	public function Eliminar_Sublinea($id)
	{
		if(empty($id) == false && isset($id))
        {               
            
            $this->db->where('ID',$id);
            $this->db->delete('Sublineas');
            $insert_id = $this->db->affected_rows();

        }
        
        return $insert_id;
	}
}