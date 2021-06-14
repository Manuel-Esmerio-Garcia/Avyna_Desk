<?php

date_default_timezone_set('America/Mexico_City');

class Envios_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
       // $this->load->database();
        parent::__construct();
    }

    public function Realizar_Envio($id)
    {
    	$this->db->trans_start(); # Starting Transaction

		# Updating data
		$this->db->where('ID', $id);
		$this->db->set('Status','Enviado');
		$this->db->update('Ventas'); 

		$this->db->where('idVenta', $id);
		$this->db->set('Status','Enviado');
		$this->db->update('Ventas_menudeo'); 

		$logs_ventas_desk = array('idVenta' => $id,
                                'Fecha_hora' => date("Y-m-d H:i:s"),
                                'Movimiento' => 'Enviar',
                                'idUsuario' => $_SESSION['Avyna'][0]['ID']);

        $this->db->insert('logs_ventas_desk', $logs_ventas_desk);

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