<?php
    class Cupones_Model extends CI_Model{

        public function __construct(){
            parent::__construct();
            $this->load->database();
            $this->load->library('email');
            
        }

        public function initial(){
            
            $this->db->select('*'); 
            $this->db->from('sucursales');
            $this->db->where('Status','Activo');
            $query = $this->db->get();
            $response['Branch'] = $query->result_array();
            
            
            $this->db->select('*'); 
            $this->db->from('clientes');
            $this->db->where('Status','Activo');
            $this->db->order_by('Nombre', 'ASC');
            $query = $this->db->get();
            $response['Client'] = $query->result_array();

            return $response;
        }

        public function GenerarCoupon(){
            
            $this->db->select('*'); 
            $this->db->from('clientes_menudeo');
            $this->db->where('idCliente',$data['ID']);
            $this->db->where('Status','Activo');
            $this->db->order_by('Nombre', 'ASC');
            $query = $this->db->get();
            $response['Salon'] = $query->result_array();

            return $response;
        }

        public function getClienteMenudeo($data){
            
            $this->db->select('*'); 
            $this->db->from('clientes_menudeo');
            $this->db->where('idCliente',$data['ID']);
            $this->db->where('Status','Activo');
            $this->db->order_by('Nombre', 'ASC');
            $query = $this->db->get();
            $response['Salon'] = $query->result_array();

            return $response;
        }

        public function getCupon($data){
            
            $this->db->select('*'); 
            $this->db->from('cupones_full');
            $this->db->where('ID',$data['ID']);
            $query = $this->db->get();
            $response = $query->result_array();

            return $response;
        }
        
        public function getCuponUpdate($data){
            
            $this->db->select('*'); 
            $this->db->from('cupones_full');
            $this->db->where('ID',$data['ID']);
            $query = $this->db->get();
            $response['Cupon'] = $query->result_array();

            $this->db->select('*'); 
            $this->db->from('clientes_menudeo');
            $this->db->where('idCliente',$response['Cupon'][0]['idCliente']);
            $this->db->where('Status','Activo');
            $this->db->order_by('Nombre', 'ASC');
            $query = $this->db->get();
            $response['Salon'] = $query->result_array();

            return $response;
        }

        public function deleteCupon($data){

            $this->db->trans_begin();
            $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 
            
            $id = $data['ID'];

            $this->db->where('ID',$id);
            $this->db->set('Status','Cancelado');
            $this->db->update('cupones_full');

            if ($this->db->trans_status() === FALSE){
                $this->db->trans_rollback();
                return 0;
            }
            else{
                $this->db->trans_commit();
                return 1;
            }
        }

        public function updateCoupon($data){
            $data['Fecha'] = date("Y-m-d H:i:s"); 
            if(!$data['idCliente_menudeo']){ unset($data['idCliente_menudeo']); };

            $this->db->trans_begin();
            $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 
            
            $id = $data['ID'];
            unset($data['ID']);

            $this->db->where('ID',$id);
            $this->db->update('cupones_full', $data);

            if ($this->db->trans_status() === FALSE){
                $this->db->trans_rollback();
                return 0;
            }
            else{
                $this->db->trans_commit();
                return 1;
            }
        }

        public function saveCoupon($data){
            $data['Fecha'] = date("Y-m-d H:i:s"); 

            if(!$data['idCliente_menudeo']){ unset($data['idCliente_menudeo']); };

            $this->db->trans_begin();
            $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

            $this->db->insert('cupones_full', $data);
            
            $idCupon = $this->db->insert_id();

            if ($this->db->trans_status() === FALSE){
                $this->db->trans_rollback();
                return 0;
            }
            else{
                $this->db->trans_commit();
                return 1;
            }
        }

        public function tableCupones($data){
            $order = '';
            $columns = array('c.ID', 'c.Cupon','c.idCliente', 'cl.Nombre','c.Fecha', 'c.Fecha_inicio', 'c.Fecha_venc','c.Tipo','c.Modo','c.Monto','c.Status');
                                            
            
            $this->db->select("c.*, CONCAT(cl.Nombre,' ',cl.Apellidos) AS Distribuidor, s.ID as idSucursal, s.Sucursal"); 
            $this->db->from('cupones_full c');
            $this->db->join('clientes cl','c.idCliente = cl.ID');
            $this->db->join('sucursales as s','cl.idSucursal = s.ID');
            $this->db->where('c.idCliente_menudeo is NULL');
            if ($data['branch'] != "" && $data['branch'] != null){$this->db->where('s.ID',$data['branch']);}
            if ($data['client'] != "" && $data['client'] != null){$this->db->where('cl.ID',$data['client']);}
            if ($data['status'] != "" && $data['status'] != null){$this->db->where('c.Status',$data['status']);}
            if ($data['dateBegin']!= "" && $data['dateBegin'] != null && $data['dateEnd']!= "" && $data['dateEnd'] != null){
                $fecha_actual = date($data['dateEnd']);
                $data['dateEnd'] = date("Y-m-d",strtotime($fecha_actual."+ 1 days")); 
                $this->db->where('c.Fecha BETWEEN "'.$data["dateBegin"].'" AND "'.$data["dateEnd"].'"');
            }


            if($data["search"]["value"] !== ''){
                $this->db->group_start();
                $this->db->like('c.ID', $data['search']['value']);
                $this->db->or_like('c.Cupon', $data['search']['value']);
                $this->db->or_like('c.idCliente', $data['search']['value']);
                $this->db->or_like('cl.Nombre', $data['search']['value']);
                $this->db->or_like('c.Fecha', $data['search']['value']);
                $this->db->or_like('c.Fecha_inicio', $data['search']['value']);
                $this->db->or_like('c.Fecha_venc', $data['search']['value']);
                $this->db->or_like('c.Tipo', $data['search']['value']);
                $this->db->or_like('c.Modo', $data['search']['value']);
                $this->db->or_like('c.Monto', $data['search']['value']);
                $this->db->or_like('c.Status', $data['search']['value']);
                $this->db->group_end();
            }

            if(isset($data["order"])) {
                $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
            }
            else {
                $order .= 'c.ID DESC ';
            }

            $this->db->order_by($order);

            if($_POST["length"] != -1){
                $this->db->limit($data['length'],$data['start']);
            }

            $query = $this->db->get();

            $this->db->save_queries = TRUE;
            $str = $this->db->last_query();  

            $result = $query->result_array();

            $this->db->save_queries = TRUE;
            $str = $this->db->last_query();  

            $this->db->select("c.*, CONCAT(cl.Nombre,' ',cl.Apellidos) AS Distribuidor, s.ID as idSucursal, s.Sucursal"); 
            $this->db->from('cupones_full c');
            $this->db->join('clientes cl','c.idCliente = cl.ID');
            $this->db->join('sucursales as s','cl.idSucursal = s.ID');
            $this->db->where('c.idCliente_menudeo is NULL');
            $total = $this->db->count_all_results();


            $this->db->select("c.*, CONCAT(cl.Nombre,' ',cl.Apellidos) AS Distribuidor, s.ID as idSucursal, s.Sucursal"); 
            $this->db->from('cupones_full c');
            $this->db->join('clientes cl','c.idCliente = cl.ID');
            $this->db->join('sucursales as s','cl.idSucursal = s.ID');
            $this->db->where('c.idCliente_menudeo is NULL');
            if ($data['branch'] != "" && $data['branch'] != null){$this->db->where('s.ID',$data['branch']);}
            if ($data['client'] != "" && $data['client'] != null){$this->db->where('cl.ID',$data['client']);}
            if ($data['status'] != "" && $data['status'] != null){$this->db->where('c.Status',$data['status']);}
            if ($data['dateBegin']!= "" && $data['dateBegin'] != null && $data['dateEnd']!= "" && $data['dateEnd'] != null){
                $fecha_actual = date($data['dateEnd']);
                $data['dateEnd'] = date("Y-m-d",strtotime($fecha_actual."+ 1 days")); 
                $this->db->where('c.Fecha BETWEEN "'.$data["dateBegin"].'" AND "'.$data["dateEnd"].'"');
            }


            if($data["search"]["value"] !== ''){
                $this->db->group_start();
                $this->db->like('c.ID', $data['search']['value']);
                $this->db->or_like('c.Cupon', $data['search']['value']);
                $this->db->or_like('c.idCliente', $data['search']['value']);
                $this->db->or_like('cl.Nombre', $data['search']['value']);
                $this->db->or_like('c.Fecha', $data['search']['value']);
                $this->db->or_like('c.Fecha_inicio', $data['search']['value']);
                $this->db->or_like('c.Fecha_venc', $data['search']['value']);
                $this->db->or_like('c.Tipo', $data['search']['value']);
                $this->db->or_like('c.Modo', $data['search']['value']);
                $this->db->or_like('c.Monto', $data['search']['value']);
                $this->db->or_like('c.Status', $data['search']['value']);
                $this->db->group_end();
            }

            $this->db->order_by($order);
            $total_filtered = $this->db->count_all_results();

            $dataResult = Array();
            foreach ($result as $key => $row)
            {
                $dataTable = array();
                $dataTable[] = $row["ID"];
                $dataTable[] = $row["Cupon"];
                $dataTable[] = $row["idCliente"];
                $dataTable[] = $row["Distribuidor"];
                $dataTable[] = $row["Fecha"];
                $dataTable[] = $row["Fecha_inicio"]; 
                $dataTable[] = $row["Fecha_venc"];       
                $dataTable[] = $row["Tipo"];       
                $dataTable[] = $row["Modo"];       
                $dataTable[] = $row["Monto"];          
                $dataTable[] = $row["Status"];
                $dataResult[] = $dataTable;
            }

            $output = array(
            "draw"    => $data["draw"],
            "recordsTotal"  => $total,
            "recordsFiltered" => $total_filtered,
            "data"    => $dataResult,
            "info"    => $str,
            "result"    => $result
            );

            return json_encode($output);
        }

        public function tableCuponesSalones($data){
            $order = '';
            $columns = array('c.ID', 'c.Cupon','c.idCliente_menudeo', 'clm.Nombre', 'clm.Nivel','c.Fecha', 'c.Fecha_inicio', 'c.Fecha_venc','c.Tipo','c.Modo','c.Monto','c.Status');

            
            $this->db->select("c.*, CONCAT(clm.Nombre,' ',clm.Apellidos) AS Salon , clm.Nivel, s.ID as idSucursal, s.Sucursal"); 
            $this->db->from('cupones_full c');
            $this->db->join('clientes cl','c.idCliente = cl.ID');
            $this->db->join('clientes_menudeo clm','c.idCliente_menudeo = clm.ID');
            $this->db->join('sucursales as s','cl.idSucursal = s.ID');
            $this->db->where('c.idCliente_menudeo is NOT null');
            if ($data['branch'] != "" && $data['branch'] != null){$this->db->where('s.ID',$data['branch']);}
            if ($data['client'] != "" && $data['client'] != null){$this->db->where('cl.ID',$data['client']);}
            if ($data['status'] != "" && $data['status'] != null){$this->db->where('c.Status',$data['status']);}
            if ($data['dateBegin']!= "" && $data['dateBegin'] != null && $data['dateEnd']!= "" && $data['dateEnd'] != null){
                $fecha_actual = date($data['dateEnd']);
                $data['dateEnd'] = date("Y-m-d",strtotime($fecha_actual."+ 1 days")); 
                $this->db->where('c.Fecha BETWEEN "'.$data["dateBegin"].'" AND "'.$data["dateEnd"].'"');
            }


            if($data["search"]["value"] !== ''){
                $this->db->group_start();
                $this->db->like('c.ID', $data['search']['value']);
                $this->db->or_like('c.Cupon', $data['search']['value']);
                $this->db->or_like('c.idCliente_menudeo', $data['search']['value']);
                $this->db->or_like('clm.Nombre', $data['search']['value']);
                $this->db->or_like('clm.Nivel', $data['search']['value']);
                $this->db->or_like('c.Fecha', $data['search']['value']);
                $this->db->or_like('c.Fecha_inicio', $data['search']['value']);
                $this->db->or_like('c.Fecha_venc', $data['search']['value']);
                $this->db->or_like('c.Tipo', $data['search']['value']);
                $this->db->or_like('c.Modo', $data['search']['value']);
                $this->db->or_like('c.Monto', $data['search']['value']);
                $this->db->or_like('c.Status', $data['search']['value']);
                $this->db->group_end();
            }

            if(isset($data["order"])) {
                $order .= $columns[$data['order']['0']['column']].' '.$data['order']['0']['dir'];
            }
            else {
                $order .= 'c.ID DESC ';
            }

            $this->db->order_by($order);

            if($_POST["length"] != -1){
                $this->db->limit($data['length'],$data['start']);
            }

            $query = $this->db->get();

            $this->db->save_queries = TRUE;
            $str = $this->db->last_query();  

            $result = $query->result_array();

            $this->db->save_queries = TRUE;
            $str = $this->db->last_query();  

            $this->db->select("c.*, CONCAT(clm.Nombre,' ',clm.Apellidos) AS Salon , clm.Nivel, s.ID as idSucursal, s.Sucursal"); 
            $this->db->from('cupones_full c');
            $this->db->join('clientes cl','c.idCliente = cl.ID');
            $this->db->join('clientes_menudeo clm','c.idCliente_menudeo = clm.ID');
            $this->db->join('sucursales as s','cl.idSucursal = s.ID');
            $this->db->where('c.idCliente_menudeo is NOT null');
            $total = $this->db->count_all_results();


            $this->db->select("c.*, CONCAT(clm.Nombre,' ',clm.Apellidos) AS Salon , clm.Nivel, s.ID as idSucursal, s.Sucursal"); 
            $this->db->from('cupones_full c');
            $this->db->join('clientes cl','c.idCliente = cl.ID');
            $this->db->join('clientes_menudeo clm','c.idCliente_menudeo = clm.ID');
            $this->db->join('sucursales as s','cl.idSucursal = s.ID');
            $this->db->where('c.idCliente_menudeo is NOT null');
            if ($data['branch'] != "" && $data['branch'] != null){$this->db->where('s.ID',$data['branch']);}
            if ($data['client'] != "" && $data['client'] != null){$this->db->where('cl.ID',$data['client']);}
            if ($data['status'] != "" && $data['status'] != null){$this->db->where('c.Status',$data['status']);}
            if ($data['dateBegin']!= "" && $data['dateBegin'] != null && $data['dateEnd']!= "" && $data['dateEnd'] != null){
                $fecha_actual = date($data['dateEnd']);
                $data['dateEnd'] = date("Y-m-d",strtotime($fecha_actual."+ 1 days")); 
                $this->db->where('c.Fecha BETWEEN "'.$data["dateBegin"].'" AND "'.$data["dateEnd"].'"');
            }


            if($data["search"]["value"] !== ''){
                $this->db->group_start();
                $this->db->like('c.ID', $data['search']['value']);
                $this->db->or_like('c.Cupon', $data['search']['value']);
                $this->db->or_like('c.idCliente_menudeo', $data['search']['value']);
                $this->db->or_like('clm.Nombre', $data['search']['value']);
                $this->db->or_like('clm.Nivel', $data['search']['value']);
                $this->db->or_like('c.Fecha', $data['search']['value']);
                $this->db->or_like('c.Fecha_inicio', $data['search']['value']);
                $this->db->or_like('c.Fecha_venc', $data['search']['value']);
                $this->db->or_like('c.Tipo', $data['search']['value']);
                $this->db->or_like('c.Modo', $data['search']['value']);
                $this->db->or_like('c.Monto', $data['search']['value']);
                $this->db->or_like('c.Status', $data['search']['value']);
                $this->db->group_end();
            }

            $this->db->order_by($order);
            $total_filtered = $this->db->count_all_results();

            $dataResult = Array();
            foreach ($result as $key => $row)
            {
                $dataTable = array();
                $dataTable[] = $row["ID"];
                $dataTable[] = $row["Cupon"];
                $dataTable[] = $row["idCliente_menudeo"];
                $dataTable[] = $row["Salon"];
                $dataTable[] = $row["Nivel"];
                $dataTable[] = $row["Fecha"];
                $dataTable[] = $row["Fecha_inicio"]; 
                $dataTable[] = $row["Fecha_venc"];       
                $dataTable[] = $row["Tipo"];       
                $dataTable[] = $row["Modo"];       
                $dataTable[] = $row["Monto"];          
                $dataTable[] = $row["Status"];
                $dataResult[] = $dataTable;
            }

            $output = array(
            "draw"    => $data["draw"],
            "recordsTotal"  => $total,
            "recordsFiltered" => $total_filtered,
            "data"    => $dataResult,
            "info"    => $str,
            "result"    => $result
            );

            return json_encode($output);
        }

        // Cargar DataTable fetchRecoleccionPendientes //
        public function fetchGenerarCoupon($data){

            //// Get All Result ////
            
            $this->db->select("lpad(conv(floor(Rand()*pow(36,8)), 10, 36), 6, 0) as Cupon, clm.ID AS idSalon, concat(clm.Nombre,' ', clm.Apellidos) AS Salon, clm.Nivel, SUM(vm.Total) as Monto_Ventas, ROUND(SUM(vm.Total) * (".$data['cupon']."/100)) as Monto_Cupon"); 
            $this->db->from('ventas_menudeo vm');
            $this->db->join('clientes_menudeo clm','vm.idCliente_menudeo = clm.ID');
            $this->db->join('clientes cl','clm.idCliente = cl.ID');
            $this->db->where('cl.idSucursal',1);
            $this->db->where("vm.Tipo_app != 'Website'");
            $this->db->where('clm.Nivel',$data['nivel']);
            $this->db->where('vm.idVenta IS NOT NULL');
            if ($data['start']!= "" && $data['start'] != null && $data['end']!= "" && $data['end'] != null){
                $fecha_actual = date($data['end']);
                $data['end'] = date("Y-m-d",strtotime($fecha_actual."+ 1 days")); 
                $this->db->where('vm.Fecha_venta BETWEEN "'.$data["start"].'" AND "'.$data["end"].'"');
            }
            $this->db->group_by('clm.ID');
            $query = $this->db->get(); 
            $response = $query->result_array();

            return $response;
            
        }

        public function getClienteMenudeoGenerar($id){
            //// Get All Result ////
            
            $this->db->select("*"); 
            $this->db->from('clientes_menudeo');
            $this->db->where('ID',$id);
            $query = $this->db->get();
            $response = $query->result_array();

            return $response;
        }

        public function GenerarEnviar($data){

            $idCupones = array();

            $this->db->trans_begin();
            $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

            $fecha = date('Y-m-d');
            $nuevafecha = strtotime ( '+1 year' , strtotime ( $fecha ) ) ;
            $nuevafecha = date ( 'Y-m-d' , $nuevafecha );

            for ($i=0; $i < count($data['cupon']); $i++) { 

                $cliente = $this->getClienteMenudeoGenerar($data['idClienteMenudeo'][$i]);
                $listCupon = array('Cupon' => $data['cupon'][$i],
                                'idCliente' => $cliente[0]['idCliente'],
                                'idCliente_menudeo' => $data['idClienteMenudeo'][$i],
                                'Fecha' => date("Y-m-d H:i:s"),
                                'Fecha_inicio' => date("Y-m-d"),
                                'Fecha_venc' => $nuevafecha,
                                'Tipo' => 'Promocion',
                                'Modo' => 'Monto',
                                'Monto' => $data['monto'][$i],
                                'Status' => 'Activo'
                );

                $objectMail = array('Nombre' => $cliente[0]['Nombre'].' '.$cliente[0]['Apellidos'],
                                    'Cupon' => $data['cupon'][$i],
                                    'Email' => $cliente[0]['Email'],
                                    'Monto' => $data['monto'][$i],
                                    'Vigencia' => $nuevafecha);

                                    
                $response = 'Cupones creados con exito';
                $this->db->insert('cupones_full', $listCupon);
                array_push($idCupones, $this->db->insert_id());
		        // $result = $this->CallAPI("POST","http://integrattodev.cloudapp.net/WebServiceSendMail/MY_Email.php/SendEmail", json_encode($objectMail));

                // print_r($result);
                // exit();
            }

            if ($this->db->trans_status() === FALSE){
                $this->db->trans_rollback();
                $objectResponse = array('response' => 0,
                                    'Error' => $response,
                                    'Cupones' => null);
                return json_encode($objectResponse);
            }
            else{
                $this->db->trans_commit();
                $objectResponse = array('response' => 1,
                                    'Error' => $response,
                                    '   ' => json_encode($idCupones));
                return json_encode($objectResponse);
            }
        }

        public function CallAPI($method, $url, $data = false){
            $curl = curl_init();
    
            switch ($method){
                case "POST":
                    curl_setopt($curl, CURLOPT_POST, 1);
    
                    if ($data)
                        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                    break;
                case "PUT":
                    curl_setopt($curl, CURLOPT_PUT, 1);
                    break;
                default:
                    if ($data)
                        $url = sprintf("%s?%s", $url, http_build_query($data));
            }
    
            // Optional Authentication:
            curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
            curl_setopt($curl, CURLOPT_USERPWD, "username:password");
    
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    
            // Productivo
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        
            // Prueba
            // $headers = [
            // 	'Authorization: Basic R0VORVJBTDpHM05FUjRsMDYxMTE4JQ==',
            // 	'Cache-Control: no-cache',
            // 	'Content-Type: application/json',
            // ];
    
            // Productivo
            $headers = [
                'Cache-Control: no-cache',
                'Content-Type: application/json',
            ];
            
            curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    
            $result = curl_exec($curl);
    
            curl_close($curl);
    
            return $result;
        }
    }

?>