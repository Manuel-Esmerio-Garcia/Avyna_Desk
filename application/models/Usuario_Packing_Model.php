<?php
class Usuario_Packing_Model extends CI_Model{
	public function __construct(){
		parent::__construct();
		$this->load->database();
    }

    /********************************************************************/
	/***   Función: init() 	                				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 15/01/2020    					                  ***/
	/***   Descripción: Obtener Información de productos y promociones***/
	/********************************************************************/
    public function init(){

        
        $this->db->select('*'); 
        $this->db->from('Usuarios_pack');
        $query = $this->db->get();
        $response = $query->result_array();
        return $response;
    }
    /********************************************************************/
	/***   Función: create() 	                			          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 26/02/2020    					                  ***/
	/***   Descripción: Create Usuario Packing                        ***/
	/********************************************************************/
    public function create($data){

        unset($data['usuario']['ID']);
        $this->db->trans_start();
        $this->db->trans_strict(FALSE);

        $this->db->insert('Usuarios_pack', $data['usuario']);
        $insert_id = $this->db->insert_id();

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            return 0;
        } 
        else {
            $this->db->trans_commit();
            return 1;
        }
    }

    public function update($data){
        $id = $data['usuario']['ID'];
        unset($data['usuario']['ID']);
        $this->db->trans_start();
        $this->db->trans_strict(FALSE);

        $this->db->where('ID',$id);
        $this->db->update('Usuarios_pack', $data['usuario']);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            return 0;
        } 
        else {
            $this->db->trans_commit();
            return 1;
        }
    }

    public function delete($data){
        $this->db->trans_start();
        $this->db->trans_strict(FALSE);

        $this->db->where('ID',$data['id']);
        $this->db->set('Status','inactivo');
        $this->db->update('Usuarios_pack');

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            return 0;
        } 
        else {
            $this->db->trans_commit();
            return 1;
        }
    }

    public function getUsuarioByID($id){
        
        $this->db->select('*'); 
        $this->db->from('Usuarios_pack');
        $this->db->where('ID',$id);
        $query = $this->db->get();
        $response = $query->result_array();
        return $response;
    }
}

?>