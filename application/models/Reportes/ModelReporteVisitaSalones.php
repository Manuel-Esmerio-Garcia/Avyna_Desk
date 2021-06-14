

<?php
date_default_timezone_set('America/Mexico_City');

class ModelReporteVisitaSalones extends CI_Model{

    public function __construct(){
        $this->load->database();
        parent::__construct();
    }

    public function initial($idCliente, $date){
        $this->db->save_queries = TRUE;

        $result['mondayCustomer'] = [];
        $result['tuesdayCustomer'] = [];
        $result['wednesdayCustomer'] = [];
        $result['thursdayCustomer'] = [];
        $result['fridayCustomer'] = [];

        // Listado clientes del dia //
        $this->db->select("cl.*, SUM(vm.Total) AS Total");
        $this->db->from("Clientes_menudeo cl");
        $this->db->join("ventas_menudeo vm", "cl.ID = vm.idCliente_menudeo");
        $this->db->where("cl.idCliente", $idCliente);
        $this->db->where("cl.Dia = DATE_FORMAT('".$date."','%W')");
        $this->db->where("cl.Semana = MOD(WEEK('".$date."',0),2)");
        $this->db->where("cl.Status","Activo");
        $this->db->where("vm.idVenta is not null");
        $this->db->where("vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'");
        $this->db->group_by("cl.ID");
        $query = $this->db->get();
        $result['Customer'] = $query->result_array();

        // Listado semana clientes del dia//
        $this->db->limit(1);
        $this->db->select("Dia, Semana, COUNT(ID) As Contador");
        $this->db->from("Clientes_menudeo");
        $this->db->where("idCliente", $idCliente);
        $this->db->where("Semana = MOD(WEEK('".$date."',0),2)");
        $this->db->where("Status","Activo");
        $this->db->group_by("Dia");
        $this->db->order_by('Contador','DESC');
        $query = $this->db->get();
        $result['weekCustomer'] = $query->result_array();

        // Listado semana clientes del dia Lunes//
        $query = $this->db->query("select cl.*, (1) AS Info
              from clientes_menudeo cl
              left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Monday'
              and vm.idVenta is not null
              and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
              GROUP by cl.ID

              UNION ALL

            select cl.*, (0) AS Info
              from clientes_menudeo cl
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Monday'
              and cl.ID not in (select cl.ID
                from clientes_menudeo cl
                left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
                where cl.idCliente = ".$idCliente."
                and cl.Semana = MOD(WEEK('".$date."',0),2)
                and cl.Status = 'Activo'
                and cl.Dia = 'Monday'
                and vm.idVenta is not null
                and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
                GROUP by cl.ID)
              GROUP by cl.ID
              ORDER BY Info DESC");

        $mondayCustomer12 = $query->result_array();

        $query = $this->db->query("select cl.*, SUM(vm.Total) AS Total
            from clientes_menudeo cl
            left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
            where cl.idCliente = ".$idCliente."
            and cl.Semana = MOD(WEEK('".$date."',0),2)
            and cl.Status = 'Activo'
            and cl.Dia = 'Monday'
            and vm.idVenta is not null
            and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
            GROUP by cl.ID

            UNION ALL

          select cl.*, (0.00) as Total
            from clientes_menudeo cl
            where cl.idCliente = ".$idCliente."
            and cl.Semana = MOD(WEEK('".$date."',0),2)
            and cl.Status = 'Activo'
            and cl.Dia = 'Monday'
            and cl.ID not in (select cl.ID
              from clientes_menudeo cl
              left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Monday'
              and vm.idVenta is not null
              and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
              GROUP by cl.ID)
            GROUP by cl.ID");



        $mondayCustomer = $query->result_array();

        foreach ($mondayCustomer12 as $key => $value) {
          foreach ($mondayCustomer as $keys => $values) {
            if($value['ID'] == $values['ID']){
              $monday = array('ID' => $values['ID'],
                'Nombre' => $values['Nombre'],
                'Apellidos' => $values['Apellidos'],
                'Semana' => $values['Semana'],
                'Dia' => $values['Dia'],
                'Nivel' => $values['Nivel'],
                'Total' => $values['Total'],
                'Info' =>  $value['Info']
              );

              array_push($result['mondayCustomer'], $monday);
              break;
            }
          }
        }

        // Listado semana clientes del dia Martes//
        $query = $this->db->query("select cl.*, (1) AS Info
              from clientes_menudeo cl
              left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Tuesday'
              and vm.idVenta is not null
              and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
              GROUP by cl.ID

              UNION ALL

            select cl.*, (0) AS Info
              from clientes_menudeo cl
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Tuesday'
              and cl.ID not in (select cl.ID
                from clientes_menudeo cl
                left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
                where cl.idCliente = ".$idCliente."
                and cl.Semana = MOD(WEEK('".$date."',0),2)
                and cl.Status = 'Activo'
                and cl.Dia = 'Tuesday'
                and vm.idVenta is not null
                and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
                GROUP by cl.ID)
              GROUP by cl.ID
              ORDER BY Info DESC");

        $tuesdayCustomer12 = $query->result_array();

        $query = $this->db->query("select cl.*, SUM(vm.Total) AS Total
            from clientes_menudeo cl
            left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
            where cl.idCliente = ".$idCliente."
            and cl.Semana = MOD(WEEK('".$date."',0),2)
            and cl.Status = 'Activo'
            and cl.Dia = 'Tuesday'
            and vm.idVenta is not null
            and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
            GROUP by cl.ID

            UNION ALL

          select cl.*, (0.00) as Total
            from clientes_menudeo cl
            where cl.idCliente = ".$idCliente."
            and cl.Semana = MOD(WEEK('".$date."',0),2)
            and cl.Status = 'Activo'
            and cl.Dia = 'Tuesday'
            and cl.ID not in (select cl.ID
              from clientes_menudeo cl
              left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Tuesday'
              and vm.idVenta is not null
              and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
              GROUP by cl.ID)
            GROUP by cl.ID");

        $tuesdayCustomer = $query->result_array();

        foreach ($tuesdayCustomer12 as $key => $value) {
          foreach ($tuesdayCustomer as $keys => $values) {
            if($value['ID'] == $values['ID']){
              $tuesday = array('ID' => $values['ID'],
                'Nombre' => $values['Nombre'],
                'Apellidos' => $values['Apellidos'],
                'Semana' => $values['Semana'],
                'Dia' => $values['Dia'],
                'Nivel' => $values['Nivel'],
                'Total' => $values['Total'],
                'Info' =>  $value['Info']
              );
  
              array_push($result['tuesdayCustomer'], $tuesday);
              break;
            }
          }
        }

        // Listado semana clientes del dia Miércoles//
        $query = $this->db->query("select cl.*, (1) AS Info
              from clientes_menudeo cl
              left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Wednesday'
              and vm.idVenta is not null
              and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
              GROUP by cl.ID

              UNION ALL

            select cl.*, (0) AS Info
              from clientes_menudeo cl
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Wednesday'
              and cl.ID not in (select cl.ID
                from clientes_menudeo cl
                left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
                where cl.idCliente = ".$idCliente."
                and cl.Semana = MOD(WEEK('".$date."',0),2)
                and cl.Status = 'Activo'
                and cl.Dia = 'Wednesday'
                and vm.idVenta is not null
                and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
                GROUP by cl.ID)
              GROUP by cl.ID
              ORDER BY Info DESC");

        $wednesdayCustomer12 = $query->result_array();

        $query = $this->db->query("select cl.*, SUM(vm.Total) AS Total
            from clientes_menudeo cl
            left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
            where cl.idCliente = ".$idCliente."
            and cl.Semana = MOD(WEEK('".$date."',0),2)
            and cl.Status = 'Activo'
            and cl.Dia = 'Wednesday'
            and vm.idVenta is not null
            and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
            GROUP by cl.ID

            UNION ALL

          select cl.*, (0.00) as Total
            from clientes_menudeo cl
            where cl.idCliente = ".$idCliente."
            and cl.Semana = MOD(WEEK('".$date."',0),2)
            and cl.Status = 'Activo'
            and cl.Dia = 'Wednesday'
            and cl.ID not in (select cl.ID
              from clientes_menudeo cl
              left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Wednesday'
              and vm.idVenta is not null
              and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
              GROUP by cl.ID)
            GROUP by cl.ID");

        $wednesdayCustomer = $query->result_array();

        foreach ($wednesdayCustomer12 as $key => $value) {
          foreach ($wednesdayCustomer as $keys => $values) {
            if($value['ID'] == $values['ID']){
              $wednesday = array('ID' => $values['ID'],
                'Nombre' => $values['Nombre'],
                'Apellidos' => $values['Apellidos'],
                'Semana' => $values['Semana'],
                'Dia' => $values['Dia'],
                'Nivel' => $values['Nivel'],
                'Total' => $values['Total'],
                'Info' =>  $value['Info']
              );
  
              array_push($result['wednesdayCustomer'], $wednesday);
              break;
            }
          }
        }

        // Listado semana clientes del dia Jueves//
        $query = $this->db->query("select cl.*, (1) AS Info
              from clientes_menudeo cl
              left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Thursday'
              and vm.idVenta is not null
              and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
              GROUP by cl.ID

              UNION ALL

            select cl.*, (0) AS Info
              from clientes_menudeo cl
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Thursday'
              and cl.ID not in (select cl.ID
                from clientes_menudeo cl
                left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
                where cl.idCliente = ".$idCliente."
                and cl.Semana = MOD(WEEK('".$date."',0),2)
                and cl.Status = 'Activo'
                and cl.Dia = 'Thursday'
                and vm.idVenta is not null
                and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
                GROUP by cl.ID)
              GROUP by cl.ID
              ORDER BY Info DESC");

        $thursdayCustomer12 = $query->result_array();

        $query = $this->db->query("select cl.*, SUM(vm.Total) AS Total
            from clientes_menudeo cl
            left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
            where cl.idCliente = ".$idCliente."
            and cl.Semana = MOD(WEEK('".$date."',0),2)
            and cl.Status = 'Activo'
            and cl.Dia = 'Thursday'
            and vm.idVenta is not null
            and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
            GROUP by cl.ID

            UNION ALL

          select cl.*, (0.00) as Total
            from clientes_menudeo cl
            where cl.idCliente = ".$idCliente."
            and cl.Semana = MOD(WEEK('".$date."',0),2)
            and cl.Status = 'Activo'
            and cl.Dia = 'Thursday'
            and cl.ID not in (select cl.ID
              from clientes_menudeo cl
              left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Thursday'
              and vm.idVenta is not null
              and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
              GROUP by cl.ID)
            GROUP by cl.ID");

        $thursdayCustomer = $query->result_array();

        foreach ($thursdayCustomer12 as $key => $value) {
          foreach ($thursdayCustomer as $keys => $values) {
            if($value['ID'] == $values['ID']){
              $thursday = array('ID' => $values['ID'],
                'Nombre' => $values['Nombre'],
                'Apellidos' => $values['Apellidos'],
                'Semana' => $values['Semana'],
                'Dia' => $values['Dia'],
                'Nivel' => $values['Nivel'],
                'Total' => $values['Total'],
                'Info' =>  $value['Info']
              );
  
              array_push($result['thursdayCustomer'], $thursday);
              break;
            }
          }
        }

        // Listado semana clientes del dia Viernes//
        $query = $this->db->query("select cl.*, (1) AS Info
              from clientes_menudeo cl
              left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Friday'
              and vm.idVenta is not null
              and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
              GROUP by cl.ID

              UNION ALL

            select cl.*, (0) AS Info
              from clientes_menudeo cl
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Friday'
              and cl.ID not in (select cl.ID
                from clientes_menudeo cl
                left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
                where cl.idCliente = ".$idCliente."
                and cl.Semana = MOD(WEEK('".$date."',0),2)
                and cl.Status = 'Activo'
                and cl.Dia = 'Friday'
                and vm.idVenta is not null
                and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
                GROUP by cl.ID)
              GROUP by cl.ID
              ORDER BY Info DESC");

        $fridayCustomer12 = $query->result_array();

        $query = $this->db->query("select cl.*, SUM(vm.Total) AS Total
            from clientes_menudeo cl
            left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
            where cl.idCliente = ".$idCliente."
            and cl.Semana = MOD(WEEK('".$date."',0),2)
            and cl.Status = 'Activo'
            and cl.Dia = 'Friday'
            and vm.idVenta is not null
            and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
            GROUP by cl.ID

            UNION ALL

          select cl.*, (0.00) as Total
            from clientes_menudeo cl
            where cl.idCliente = ".$idCliente."
            and cl.Semana = MOD(WEEK('".$date."',0),2)
            and cl.Status = 'Activo'
            and cl.Dia = 'Friday'
            and cl.ID not in (select cl.ID
              from clientes_menudeo cl
              left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
              where cl.idCliente = ".$idCliente."
              and cl.Semana = MOD(WEEK('".$date."',0),2)
              and cl.Status = 'Activo'
              and cl.Dia = 'Friday'
              and vm.idVenta is not null
              and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
              GROUP by cl.ID)
            GROUP by cl.ID");

        $fridayCustomer = $query->result_array();

        foreach ($fridayCustomer12 as $key => $value) {
          foreach ($fridayCustomer as $keys => $values) {
            if($value['ID'] == $values['ID']){
              $friday = array('ID' => $values['ID'],
                'Nombre' => $values['Nombre'],
                'Apellidos' => $values['Apellidos'],
                'Semana' => $values['Semana'],
                'Dia' => $values['Dia'],
                'Nivel' => $values['Nivel'],
                'Total' => $values['Total'],
                'Info' =>  $value['Info']
              );
  
              array_push($result['fridayCustomer'], $friday);
              break;
            }
          }
        }

        // Semana y dia con mas salones visitados "SEMANA"//
        $this->db->limit(1);
        $this->db->select("CL.Dia, count(CL.Dia) AS info, CL.Semana");
        $this->db->from("Clientes_menudeo CL");
        $this->db->join("ventas_menudeo VM", "CL.ID = VM.idCliente_menudeo");
        $this->db->where("CL.idCliente", $idCliente);
        $this->db->where("VM.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'");
        $this->db->where("VM.idVenta IS NOT NULL");
        $this->db->where("CL.Dia IS NOT NULL AND CL.Dia != '' AND CL.Dia != 'undefined'");
        $this->db->group_by(array("CL.Dia", "CL.Semana"));
        $this->db->order_by('count(CL.Dia)','DESC');
        $query = $this->db->get();
        $result['dayPlus'] = $query->result_array();

        // Semana y dia con menos salones visitados //

        $this->db->limit(1);
        $this->db->select("CL.Dia, count(CL.Dia) AS info, CL.Semana");
        $this->db->from("Clientes_menudeo CL");
        $this->db->join("ventas_menudeo VM", "CL.ID = VM.idCliente_menudeo");
        $this->db->where("CL.idCliente", $idCliente);
        $this->db->where("VM.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'");
        $this->db->where("VM.idVenta IS NOT NULL");
        $this->db->where("CL.Dia IS NOT NULL AND CL.Dia != '' AND CL.Dia != 'undefined'");
        $this->db->group_by(array("CL.Dia", "CL.Semana"));
        $this->db->order_by('count(CL.Dia)','ASC');
        $query = $this->db->get();
        $result['dayLess'] = $query->result_array();

        // Semanas y dia con mas ventas //

        $this->db->limit(1);
        $this->db->select("CL.*, SUM(vm.Total) AS TotalGlobal");
        $this->db->from("Clientes_menudeo CL");
        $this->db->join("ventas_menudeo VM", "CL.ID = VM.idCliente_menudeo");
        $this->db->where("idCliente", $idCliente);
        $this->db->where("VM.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'");
        $this->db->where("VM.idVenta IS NOT NULL");
        $this->db->where("CL.Dia IS NOT NULL AND CL.Dia != '' AND CL.Dia != 'undefined'");
        $this->db->group_by("CL.Semana, CL.Dia");
        $this->db->order_by('SUM(vm.Total)','DESC');
        $query = $this->db->get();
        $result['plusSales'] = $query->result_array();

        // Semanas y dia con menos ventas //
        $this->db->limit(1);
        $this->db->select("CL.*, SUM(vm.Total) AS TotalGlobal");
        $this->db->from("Clientes_menudeo CL");
        $this->db->join("ventas_menudeo VM", "CL.ID = VM.idCliente_menudeo");
        $this->db->where("idCliente", $idCliente);
        $this->db->where("VM.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'");
        $this->db->where("VM.idVenta IS NOT NULL");
        $this->db->where("CL.Dia IS NOT NULL AND CL.Dia != '' AND CL.Dia != 'undefined'");
        $this->db->group_by("CL.Semana, CL.Dia");
        $this->db->order_by('SUM(vm.Total)','ASC');
        $query = $this->db->get();
        $result['lessSales'] = $query->result_array();

        // Gráfica Non //
        $query = $this->db->query("
          SELECT * FROM (
            select CL.*, (0.00) AS TotalGlobal, (0) AS Cantidad
              from Clientes_menudeo CL
                where CL.Dia not in (
                  select CLI.Dia
                    from Clientes_menudeo CLI
                    join ventas_menudeo VM on CLI.ID = VM.idCliente_menudeo
                      where idCliente = ".$idCliente."
                      and VM.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
                      and VM.idVenta IS NOT NULL
                      and (Dia IS NOT NULL and Dia != '' and Dia != 'undefined')
                      and CLI.Semana = 1
                    group by CLI.Semana, CLI.Dia
                )
              and (Dia IS NOT NULL and Dia != '' and Dia != 'undefined')
              and Semana = 1
            group by Semana, Dia

            Union ALL

          select CLI.*, SUM(vm.Total) AS TotalGlobal, COUNT(VM.ID) AS Cantidad
            from Clientes_menudeo CLI
              join ventas_menudeo VM on CLI.ID = VM.idCliente_menudeo
                where idCliente = ".$idCliente."
                and VM.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
                and VM.idVenta IS NOT NULL
                and (Dia IS NOT NULL and Dia != '' and Dia != 'undefined')
                and CLI.Semana = 1
              group by CLI.Semana, CLI.Dia) Datos
              order by FIELD(Dia,'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')");
        $result['chartNon'] = $query->result_array();

        // Gráfica Par Cantidad //
        $this->db->select("VM.*, CL.Semana, CL.Dia");
        $this->db->from("ventas_menudeo VM");
        $this->db->join("clientes_menudeo CL", "VM.idCliente_menudeo = CL.ID");
        $this->db->where("idCliente", $idCliente);
        $this->db->where("VM.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'");
        $this->db->where("VM.idVenta IS NOT NULL");
        $this->db->where("CL.Semana", 1);
        $this->db->group_by("VM.idCliente_menudeo");
        $this->db->order_by("FIELD(CL.Dia,'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')");
        $query = $this->db->get();
        $result['chartNonCant'] = $query->result_array();

        // Gráfica par //
        $query = $this->db->query("
          SELECT * FROM (
            select CL.*, (0.00) AS TotalGlobal, (0) AS Cantidad
              from Clientes_menudeo CL
                where CL.Dia not in (
                  select CLI.Dia
                    from Clientes_menudeo CLI
                    join ventas_menudeo VM on CLI.ID = VM.idCliente_menudeo
                      where idCliente = ".$idCliente."
                      and VM.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
                      and VM.idVenta IS NOT NULL
                      and (Dia IS NOT NULL and Dia != '' and Dia != 'undefined')
                      and CLI.Semana = 0
                    group by CLI.Semana, CLI.Dia
                )
              and (Dia IS NOT NULL and Dia != '' and Dia != 'undefined')
              and Semana = 0
            group by Semana, Dia

            Union ALL

          select CLI.*, SUM(vm.Total) AS TotalGlobal, COUNT(VM.ID) AS Cantidad
            from Clientes_menudeo CLI
              join ventas_menudeo VM on CLI.ID = VM.idCliente_menudeo
                where idCliente = ".$idCliente."
                and VM.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
                and VM.idVenta IS NOT NULL
                and (Dia IS NOT NULL and Dia != '' and Dia != 'undefined')
                and CLI.Semana = 0
              group by CLI.Semana, CLI.Dia) Datos
              order by FIELD(Dia,'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')");

        $result['chartPar'] = $query->result_array();

        // Gráfica Par Cantidad //
        $this->db->select("VM.*, CL.Semana, CL.Dia");
        $this->db->from("ventas_menudeo VM");
        $this->db->join("clientes_menudeo CL", "VM.idCliente_menudeo = CL.ID");
        $this->db->where("idCliente", $idCliente);
        $this->db->where("VM.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'");
        $this->db->where("VM.idVenta IS NOT NULL");
        $this->db->where("CL.Semana", 0);
        $this->db->group_by("VM.idCliente_menudeo");
        $this->db->order_by("FIELD(CL.Dia,'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')");
        $query = $this->db->get();
        $result['chartParCant'] = $query->result_array();

        $this->db->select("MOD(WEEK('".$date."',0),2) AS getWeek");
        $query = $this->db->get();
        $result['getInfo'] = $query->result_array();

        return $result;

    }




































    public function changeWeek($semana, $date, $idCliente){

        $result['mondayCustomer'] = [];
        $result['tuesdayCustomer'] = [];
        $result['wednesdayCustomer'] = [];
        $result['thursdayCustomer'] = [];
        $result['fridayCustomer'] = [];

        $this->db->limit(1);
        $this->db->select("Dia, Semana, COUNT(ID) As Contador");
        $this->db->from("Clientes_menudeo");
        $this->db->where("idCliente", $idCliente);
        $this->db->where("Semana = ".$semana."");
        $this->db->where("Status","Activo");
        $this->db->group_by("Dia");
        $this->db->order_by('Contador','DESC');
        $query = $this->db->get();
        $result['weekCustomer'] = $query->result_array();

      // Listado semana clientes del dia Lunes//
      $query = $this->db->query("select cl.*, (1) AS Info
        from clientes_menudeo cl
        left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
        where cl.idCliente = ".$idCliente."
        and cl.Semana = ".$semana."
        and cl.Status = 'Activo'
        and cl.Dia = 'Monday'
        and vm.idVenta is not null
        and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
        GROUP by cl.ID

        UNION ALL

      select cl.*, (0) AS Info
        from clientes_menudeo cl
        where cl.idCliente = ".$idCliente."
        and cl.Semana = ".$semana."
        and cl.Status = 'Activo'
        and cl.Dia = 'Monday'
        and cl.ID not in (select cl.ID
          from clientes_menudeo cl
          left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
          where cl.idCliente = ".$idCliente."
          and cl.Semana = ".$semana."
          and cl.Status = 'Activo'
          and cl.Dia = 'Monday'
          and vm.idVenta is not null
          and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
          GROUP by cl.ID)
        GROUP by cl.ID
        ORDER BY Info DESC");

      $mondayCustomer12 = $query->result_array();

      $query = $this->db->query("select cl.*, SUM(vm.Total) AS Total
          from clientes_menudeo cl
          left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
          where cl.idCliente = ".$idCliente."
          and cl.Semana = ".$semana."
          and cl.Status = 'Activo'
          and cl.Dia = 'Monday'
          and vm.idVenta is not null
          and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
          GROUP by cl.ID

          UNION ALL

        select cl.*, (0.00) as Total
          from clientes_menudeo cl
          where cl.idCliente = ".$idCliente."
          and cl.Semana = ".$semana."
          and cl.Status = 'Activo'
          and cl.Dia = 'Monday'
          and cl.ID not in (select cl.ID
            from clientes_menudeo cl
            left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
            where cl.idCliente = ".$idCliente."
            and cl.Semana = ".$semana."
            and cl.Status = 'Activo'
            and cl.Dia = 'Monday'
            and vm.idVenta is not null
            and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
            GROUP by cl.ID)
          GROUP by cl.ID");



      $mondayCustomer = $query->result_array();

      foreach ($mondayCustomer12 as $key => $value) {
        foreach ($mondayCustomer as $keys => $values) {
          if($value['ID'] == $values['ID']){
            $monday = array('ID' => $values['ID'],
              'Nombre' => $values['Nombre'],
              'Apellidos' => $values['Apellidos'],
              'Semana' => $values['Semana'],
              'Dia' => $values['Dia'],
              'Nivel' => $values['Nivel'],
              'Total' => $values['Total'],
              'Info' =>  $value['Info']
            );

            array_push($result['mondayCustomer'], $monday);
            break;
          }
        }
      }

      // Listado semana clientes del dia Martes//
      $query = $this->db->query("select cl.*, (1) AS Info
            from clientes_menudeo cl
            left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
            where cl.idCliente = ".$idCliente."
            and cl.Semana = ".$semana."
            and cl.Status = 'Activo'
            and cl.Dia = 'Tuesday'
            and vm.idVenta is not null
            and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
            GROUP by cl.ID

            UNION ALL

          select cl.*, (0) AS Info
            from clientes_menudeo cl
            where cl.idCliente = ".$idCliente."
            and cl.Semana = ".$semana."
            and cl.Status = 'Activo'
            and cl.Dia = 'Tuesday'
            and cl.ID not in (select cl.ID
              from clientes_menudeo cl
              left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
              where cl.idCliente = ".$idCliente."
              and cl.Semana = ".$semana."
              and cl.Status = 'Activo'
              and cl.Dia = 'Tuesday'
              and vm.idVenta is not null
              and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
              GROUP by cl.ID)
            GROUP by cl.ID
            ORDER BY Info DESC");

      $tuesdayCustomer12 = $query->result_array();

      $query = $this->db->query("select cl.*, SUM(vm.Total) AS Total
          from clientes_menudeo cl
          left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
          where cl.idCliente = ".$idCliente."
          and cl.Semana = ".$semana."
          and cl.Status = 'Activo'
          and cl.Dia = 'Tuesday'
          and vm.idVenta is not null
          and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
          GROUP by cl.ID

          UNION ALL

        select cl.*, (0.00) as Total
          from clientes_menudeo cl
          where cl.idCliente = ".$idCliente."
          and cl.Semana = ".$semana."
          and cl.Status = 'Activo'
          and cl.Dia = 'Tuesday'
          and cl.ID not in (select cl.ID
            from clientes_menudeo cl
            left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
            where cl.idCliente = ".$idCliente."
            and cl.Semana = ".$semana."
            and cl.Status = 'Activo'
            and cl.Dia = 'Tuesday'
            and vm.idVenta is not null
            and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
            GROUP by cl.ID)
          GROUP by cl.ID");

      $tuesdayCustomer = $query->result_array();

      foreach ($tuesdayCustomer12 as $key => $value) {
        foreach ($tuesdayCustomer as $keys => $values) {
          if($value['ID'] == $values['ID']){
            $tuesday = array('ID' => $values['ID'],
              'Nombre' => $values['Nombre'],
              'Apellidos' => $values['Apellidos'],
              'Semana' => $values['Semana'],
              'Dia' => $values['Dia'],
              'Nivel' => $values['Nivel'],
              'Total' => $values['Total'],
              'Info' =>  $value['Info']
            );

            array_push($result['tuesdayCustomer'], $tuesday);
            break;
          }
        }
      }

      // Listado semana clientes del dia Miércoles//
      $query = $this->db->query("select cl.*, (1) AS Info
            from clientes_menudeo cl
            left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
            where cl.idCliente = ".$idCliente."
            and cl.Semana = ".$semana."
            and cl.Status = 'Activo'
            and cl.Dia = 'Wednesday'
            and vm.idVenta is not null
            and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
            GROUP by cl.ID

            UNION ALL

          select cl.*, (0) AS Info
            from clientes_menudeo cl
            where cl.idCliente = ".$idCliente."
            and cl.Semana = ".$semana."
            and cl.Status = 'Activo'
            and cl.Dia = 'Wednesday'
            and cl.ID not in (select cl.ID
              from clientes_menudeo cl
              left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
              where cl.idCliente = ".$idCliente."
              and cl.Semana = ".$semana."
              and cl.Status = 'Activo'
              and cl.Dia = 'Wednesday'
              and vm.idVenta is not null
              and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
              GROUP by cl.ID)
            GROUP by cl.ID
            ORDER BY Info DESC");

      $wednesdayCustomer12 = $query->result_array();

      $query = $this->db->query("select cl.*, SUM(vm.Total) AS Total
          from clientes_menudeo cl
          left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
          where cl.idCliente = ".$idCliente."
          and cl.Semana = ".$semana."
          and cl.Status = 'Activo'
          and cl.Dia = 'Wednesday'
          and vm.idVenta is not null
          and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
          GROUP by cl.ID

          UNION ALL

        select cl.*, (0.00) as Total
          from clientes_menudeo cl
          where cl.idCliente = ".$idCliente."
          and cl.Semana = ".$semana."
          and cl.Status = 'Activo'
          and cl.Dia = 'Wednesday'
          and cl.ID not in (select cl.ID
            from clientes_menudeo cl
            left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
            where cl.idCliente = ".$idCliente."
            and cl.Semana = ".$semana."
            and cl.Status = 'Activo'
            and cl.Dia = 'Wednesday'
            and vm.idVenta is not null
            and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
            GROUP by cl.ID)
          GROUP by cl.ID");

      $wednesdayCustomer = $query->result_array();

      foreach ($wednesdayCustomer12 as $key => $value) {
        foreach ($wednesdayCustomer as $keys => $values) {
          if($value['ID'] == $values['ID']){
            $wednesday = array('ID' => $values['ID'],
              'Nombre' => $values['Nombre'],
              'Apellidos' => $values['Apellidos'],
              'Semana' => $values['Semana'],
              'Dia' => $values['Dia'],
              'Nivel' => $values['Nivel'],
              'Total' => $values['Total'],
              'Info' =>  $value['Info']
            );

            array_push($result['wednesdayCustomer'], $wednesday);
            break;
          }
        }
      }

      // Listado semana clientes del dia Jueves//
      $query = $this->db->query("select cl.*, (1) AS Info
            from clientes_menudeo cl
            left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
            where cl.idCliente = ".$idCliente."
            and cl.Semana = ".$semana."
            and cl.Status = 'Activo'
            and cl.Dia = 'Thursday'
            and vm.idVenta is not null
            and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
            GROUP by cl.ID

            UNION ALL

          select cl.*, (0) AS Info
            from clientes_menudeo cl
            where cl.idCliente = ".$idCliente."
            and cl.Semana = ".$semana."
            and cl.Status = 'Activo'
            and cl.Dia = 'Thursday'
            and cl.ID not in (select cl.ID
              from clientes_menudeo cl
              left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
              where cl.idCliente = ".$idCliente."
              and cl.Semana = ".$semana."
              and cl.Status = 'Activo'
              and cl.Dia = 'Thursday'
              and vm.idVenta is not null
              and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
              GROUP by cl.ID)
            GROUP by cl.ID
            ORDER BY Info DESC");

      $thursdayCustomer12 = $query->result_array();

      $query = $this->db->query("select cl.*, SUM(vm.Total) AS Total
          from clientes_menudeo cl
          left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
          where cl.idCliente = ".$idCliente."
          and cl.Semana = ".$semana."
          and cl.Status = 'Activo'
          and cl.Dia = 'Thursday'
          and vm.idVenta is not null
          and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
          GROUP by cl.ID

          UNION ALL

        select cl.*, (0.00) as Total
          from clientes_menudeo cl
          where cl.idCliente = ".$idCliente."
          and cl.Semana = ".$semana."
          and cl.Status = 'Activo'
          and cl.Dia = 'Thursday'
          and cl.ID not in (select cl.ID
            from clientes_menudeo cl
            left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
            where cl.idCliente = ".$idCliente."
            and cl.Semana = ".$semana."
            and cl.Status = 'Activo'
            and cl.Dia = 'Thursday'
            and vm.idVenta is not null
            and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
            GROUP by cl.ID)
          GROUP by cl.ID");

      $thursdayCustomer = $query->result_array();

      foreach ($thursdayCustomer12 as $key => $value) {
        foreach ($thursdayCustomer as $keys => $values) {
          if($value['ID'] == $values['ID']){
            $thursday = array('ID' => $values['ID'],
              'Nombre' => $values['Nombre'],
              'Apellidos' => $values['Apellidos'],
              'Semana' => $values['Semana'],
              'Dia' => $values['Dia'],
              'Nivel' => $values['Nivel'],
              'Total' => $values['Total'],
              'Info' =>  $value['Info']
            );

            array_push($result['thursdayCustomer'], $thursday);
            break;
          }
        }
      }

      // Listado semana clientes del dia Viernes//
      $query = $this->db->query("select cl.*, (1) AS Info
            from clientes_menudeo cl
            left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
            where cl.idCliente = ".$idCliente."
            and cl.Semana = ".$semana."
            and cl.Status = 'Activo'
            and cl.Dia = 'Friday'
            and vm.idVenta is not null
            and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
            GROUP by cl.ID

            UNION ALL

          select cl.*, (0) AS Info
            from clientes_menudeo cl
            where cl.idCliente = ".$idCliente."
            and cl.Semana = ".$semana."
            and cl.Status = 'Activo'
            and cl.Dia = 'Friday'
            and cl.ID not in (select cl.ID
              from clientes_menudeo cl
              left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
              where cl.idCliente = ".$idCliente."
              and cl.Semana = ".$semana."
              and cl.Status = 'Activo'
              and cl.Dia = 'Friday'
              and vm.idVenta is not null
              and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -84 DAY) AND '".$date."'
              GROUP by cl.ID)
            GROUP by cl.ID
            ORDER BY Info DESC");

      $fridayCustomer12 = $query->result_array();

      $query = $this->db->query("select cl.*, SUM(vm.Total) AS Total
          from clientes_menudeo cl
          left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
          where cl.idCliente = ".$idCliente."
          and cl.Semana = ".$semana."
          and cl.Status = 'Activo'
          and cl.Dia = 'Friday'
          and vm.idVenta is not null
          and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
          GROUP by cl.ID

          UNION ALL

        select cl.*, (0.00) as Total
          from clientes_menudeo cl
          where cl.idCliente = ".$idCliente."
          and cl.Semana = ".$semana."
          and cl.Status = 'Activo'
          and cl.Dia = 'Friday'
          and cl.ID not in (select cl.ID
            from clientes_menudeo cl
            left join ventas_menudeo vm on cl.ID = vm.idCliente_menudeo
            where cl.idCliente = ".$idCliente."
            and cl.Semana = ".$semana."
            and cl.Status = 'Activo'
            and cl.Dia = 'Friday'
            and vm.idVenta is not null
            and vm.Fecha_venta BETWEEN date_add('".$date."', INTERVAL -28 DAY) AND '".$date."'
            GROUP by cl.ID)
          GROUP by cl.ID");

      $fridayCustomer = $query->result_array();

      foreach ($fridayCustomer12 as $key => $value) {
        foreach ($fridayCustomer as $keys => $values) {
          if($value['ID'] == $values['ID']){
            $friday = array('ID' => $values['ID'],
              'Nombre' => $values['Nombre'],
              'Apellidos' => $values['Apellidos'],
              'Semana' => $values['Semana'],
              'Dia' => $values['Dia'],
              'Nivel' => $values['Nivel'],
              'Total' => $values['Total'],
              'Info' =>  $value['Info']
            );

            array_push($result['fridayCustomer'], $friday);
            break;
          }
        }
      }
    
      return $result;
      
    }
}

?>