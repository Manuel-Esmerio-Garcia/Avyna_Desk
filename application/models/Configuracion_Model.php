<?php

class Configuracion_Model extends CI_Model 
{
    public $ID;
    public $Nombre;
    public $Email;
	public $Telefono;
	public $Telefono_Opc;
	public $Estatus;
    public $Password;
    public $Puesto;
	public $Fecha_Registro;

	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
       // $this->load->database();
        parent::__construct();
    }

    public function CargarDatos($id){
     
        $this->db->select('*');
        $this->db->from('Usuarios');
        $this->db->where('ID', $id);
     
        return $this->db->get()->result();
    }
 
    public function Modificar($id, $data){
     	
		$this->db->where('ID', $id);
		$this->db->update('Usuario', $data);

    }
 
    public function Modificar_Password($id, $Password){
    
		$this->db->where('ID',$id);
		$this->db->update('Usuario', $Password);

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


        $this->db->trans_start(); # Starting Transaction
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $Empresa = array('Razon_Social' => $data['Razon_Social'],
                        'RFC' => $data['RFC'],
                        'Clave_Regimen_Fiscal' => $data['Clave_Regimen_Fiscal'],
                        'Descripcion_Regimen_Fiscal' => $data['Descripcion_Regimen_Fiscal'],
                        'Direccion' => $data['Direccion'],
                        'Colonia' => $data['Colonia'],
                        'Pais' => $data['Colonia'],
                        'Estado' => $data['Estado'],
                        'Municipio' => $data['Municipio'],
                        'CP' => $data['CP'],
                        'Telefono1' => $data['Telefono1'],
                        'Telefono2' => $data['Telefono2'],
                        'Contacto' => $data['Contacto'],
                        'customerNumber' => $data['customerNumber'],
                        'numExt' => $data['numExt'],
                        'numInt' =>  $data['numInt']); 


        
        $this->db->where('ID', $data['ID']);
        $this->db->update('Empresa', $Empresa);

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

    public function UpdateEmpresaCertificado($data, $id)
    {
        $this->db->trans_start(); # Starting Transaction
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 
        # Updating data
        $this->db->where('ID', $id);
        $this->db->update('Empresa', $data); 

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

}

?>