<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Reporte_Guia_Model extends CI_Model {

  public function __construct() 
  {
    // Inicializa la Clase de la Base de Datos.
    // $this->load->database();
    parent::__construct();

  }

  // Función Exportar Guias Envio //
  public function csvExportarReporteGuia($data)
  {
    
    $this->db->select('*'); 
    $this->db->from('Reporte_Guias_View');
    if (!empty($data['DateStartVentas']) && !empty($data['DateEndVentas'])){$this->db->where('Fecha_envio BETWEEN "'.$data["DateStartVentas"].'" AND "'.$data["DateEndVentas"].'"');}
    $query = $this->db->get();
    $result = $query->result_array();
    return $result;
  }

}

/* End of file Reporte_Guia_Model_model.php */
/* Location: ./application/models/Reporte_Guia_Model_model.php */