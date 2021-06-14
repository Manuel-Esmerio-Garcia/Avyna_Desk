<?php

class Promociones_Model extends CI_Model 
{
	public function __construct() 
    {
        // Inicializa la Clase de la Base de Datos.
       // $this->load->database();
        parent::__construct();
    }

    public function getinfoProductInventary(){
        
        $this->db->select('*'); 
        $this->db->from('Inventario_producto_view');
        $query = $this->db->get();
        return $query->result_array();
    }

    //Obtener Información Inventario //
    public function getInfoInventario($data)
    {
        $Importe = 0;
        $idCatalogo = explode(",",$data['idCatalogo']);
        $Cantidad   = explode(",",$data['Cantidad']);
        $idSucursal = $data['idSucursal'];

        for ($i=0; $i < count($idCatalogo); $i++){ 

            
            $this->db->select('*'); 
            $this->db->from('Inventario');
            $this->db->where('idCatalogo', $idCatalogo[$i]);
            $this->db->where('idSucursal', $idSucursal);
            $query = $this->db->get();
            $result = $query->result_array();

            $Importe += floatval($result[0]['Precio_publico']) * intval($Cantidad[$i]);
        }

        $arrayImporte = array('Importe' => $Importe);
        return $arrayImporte;
    }

    // Acción Guardar Promoción //
    public function addPromocion($data)
    {
        $Cliente  = array();
        $Producto = array();
        $Sucursal = array();
        $Cantidad = array();
        $Precio   = array();
        $Ahorro   = array();

        ($data['Distribuidor'] != null) ? $Cliente  = explode(",", $data['Distribuidor']) : "";
        ($data['Producto'] != null) ? $Producto  = explode(",", $data['Producto']) : "";
        ($data['Sucursal'] != null) ? $Sucursal  = explode(",", $data['Sucursal']) : "";
        ($data['Cantidad'] != null) ? $Cantidad  = explode(",", $data['Cantidad']) : "";
        ($data['Precio'] != null) ? $Precio  = explode(",", $data['Precio']) : "";
        ($data['Ahorro'] != null) ? $Ahorro  = explode(",", $data['Ahorro']) : "";

        $Division = null;
        $Linea    = null;
        $Sublinea = null;

        ($data['Division'] != "") ? $Division = $data['Division'] : "";
        ($data['Linea'] != "") ? $Linea = $data['Linea'] : "";
        ($data['Sublinea'] != "") ? $Sublinea = $data['Sublinea'] : "";

        $Promociones = array(
                'idDivision' => $Division,
                'idLinea' => $Linea,
                'idSublinea' => $Sublinea,
                'Promocion' => $data['Nombre'],
                'Cantidad' => '',
                'Vigencia_inicial' => $data['Vigencia_Inicial'],
                'Vigencia_final' => $data['Vigencia_Final'],
                'Precio_promo' => '',
                'Status' => 'Activo',
                'Excluir_Distribuidores' => $data['Excluir'],
                'Ahorro' => '',
                'Salon_black' => $data['Salon_black']);
 

        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->insert('Promociones', $Promociones);
        $insert_id = $this->db->insert_id();

        for ($i=0; $i < count($Cliente) ; $i++){ 
            $array_Clientes = array(
                'idPromocion' => $insert_id,
                'idDistribuidor' => $Cliente[$i]);

            $this->db->insert('Distribuidores_promociones', $array_Clientes);
        }

        for ($x=0; $x < count($Producto) ; $x++){ 
            $array_Producto = array(
                'idPromocion' => $insert_id,
                'idCatalogo' => $Producto[$x],
                'Cantidad' => $Cantidad[$x]);

            $this->db->insert('Productos_promociones', $array_Producto);
        }

        for ($y=0; $y < count($Sucursal) ; $y++){ 
            $array_Sucursal = array(
                'idPromocion' => $insert_id,
                'idSucursal' => $Sucursal[$y],
                'precio' => $Precio[$y],
                'ahorro' => $Ahorro[$y]);

            $this->db->insert('Asignacion_promo', $array_Sucursal);
        }

        if ($this->db->trans_status() === FALSE){
                $this->db->trans_rollback();
                return 0;
        }
        else{
                $this->db->trans_commit();
                return 1;
        }
    }

    // Obtener Detalle Promoción //
    public function getDetallePromociones($id)
    {
        
        $this->db->select('PP.*, CA.Codigo, CA.Producto'); 
        $this->db->from('Productos_promociones AS PP');
        $this->db->join('Catalogo AS CA','PP.idCatalogo = CA.ID');
        $this->db->where('PP.idPromocion', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Promoción By ID //
    public function getPromocionById($idPromocion)
    {
        
        $this->db->select('*'); 
        $this->db->from('Promociones');
        $this->db->where('ID', $idPromocion);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Productos de la promoción By IdPromoción //
    public function getProductosPromoById($idPromocion)
    {
        
        $this->db->select('PP.*, CA.Codigo, CA.Producto, CA.ID AS ID_Catalogo'); 
        $this->db->from('Productos_promociones AS PP');
        $this->db->join('Catalogo AS CA','PP.idCatalogo = CA.ID');
        $this->db->where('PP.idPromocion', $idPromocion);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Asignación Promoción //
    public function getAsignacionPromoById($idPromocion)
    {
        
        $this->db->select('AP.*, S.Sucursal, S.ID AS ID_Sucursal'); 
        $this->db->from('Asignacion_promo AS AP');
        $this->db->join('Sucursales AS S','AP.idSucursal = S.ID');
        $this->db->where('AP.idPromocion', $idPromocion);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Distribuidores Promoción //
    public function getDistribuidoresPromoById($idPromocion)
    {
        
        $this->db->select('DP.*, CONCAT(CL.Nombre," ",CL.Apellidos) AS Cliente, CL.ID AS ID_Cliente'); 
        $this->db->from('Distribuidores_promociones AS DP');
        $this->db->join('Clientes AS CL','DP.idDistribuidor = CL.ID');
        $this->db->where('DP.idPromocion', $idPromocion);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Acción Editar Promoción //
    public function UpdatePromocion($data)
    {
        $Cliente  = array();
        $Producto = array();
        $Sucursal = array();
        $Cantidad = array();
        $Precio   = array();
        $Ahorro   = array();
        $Division = null;
        $Linea    = null;
        $Sublinea = null;

        if ($data['Distribuidor'] != null){
            $Cliente  = explode(",", $data['Distribuidor']);
        }

        if ($data['Producto'] != null){
            $Producto  = explode(",", $data['Producto']);
        }

        if ($data['Sucursal'] != null){
            $Sucursal  = explode(",", $data['Sucursal']);
        }

        if ($data['Cantidad'] != null){
            $Cantidad  = explode(",", $data['Cantidad']);
        }

        if ($data['Precio'] != null){
            $Precio  = explode(",", $data['Precio']);
        }

        if ($data['Ahorro'] != null){
            $Ahorro  = explode(",", $data['Ahorro']);
        }

        if ($data['Division'] != ""){
            $Division = $data['Division'];
        }

        if ($data['Linea'] != ""){
            $Linea = $data['Linea'];
        }

        if ($data['Sublinea'] != ""){
            $Sublinea = $data['Sublinea'];
        }

        $Promociones = array(
                'idDivision' => $Division,
                'idLinea' => $Linea,
                'idSublinea' => $Sublinea,
                'Promocion' => $data['Nombre'],
                'Cantidad' => '',
                'Vigencia_inicial' => $data['Vigencia_Inicial'],
                'Vigencia_final' => $data['Vigencia_Final'],
                'Precio_promo' => '',
                'Status' => $data['Status'],
                'Excluir_Distribuidores' => $data['Excluir'],
                'Ahorro' => '',
                'Salon_black' => $data['Salon_black']);
 

        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->query('DELETE FROM Asignacion_promo WHERE idPromocion = '.$data['ID'].'');
        $this->db->query('DELETE FROM Productos_promociones WHERE idPromocion = '.$data['ID'].'');
        $this->db->query('DELETE FROM Distribuidores_promociones WHERE idPromocion = '.$data['ID'].'');

        $this->db->where('ID',$data['ID']);
        $this->db->update('Promociones', $Promociones);

        for ($i=0; $i < count($Cliente) ; $i++){ 
            $array_Clientes = array(
                'idPromocion' => $data['ID'],
                'idDistribuidor' => $Cliente[$i]);

            $this->db->insert('Distribuidores_promociones', $array_Clientes);
        }

        for ($x=0; $x < count($Producto) ; $x++){ 
            $array_Producto = array(
                'idPromocion' => $data['ID'],
                'idCatalogo' => $Producto[$x],
                'Cantidad' => $Cantidad[$x]);

            $this->db->insert('Productos_promociones', $array_Producto);
        }

        for ($y=0; $y < count($Sucursal) ; $y++){ 
            $array_Sucursal = array(
                'idPromocion' => $data['ID'],
                'idSucursal' => $Sucursal[$y],
                'precio' => $Precio[$y],
                'ahorro' => $Ahorro[$y]);

            $this->db->insert('Asignacion_promo', $array_Sucursal);
        }

        if ($this->db->trans_status() === FALSE){
                $this->db->trans_rollback();
                return 0;
        }
        else{
                $this->db->trans_commit();
                return 1;
        }
    }

    // Acción Eliminar Promoción //
    public function deletePromocion($data)
    {
        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->where('ID',$data['idPromocion']);
        $this->db->set('Status','Inactivo');
        $this->db->update('Promociones');

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    // Obtener Productos de la oferta By idOferta //
    public function getProductosOferta($idOferta)
    {
        
        $this->db->select('PO.*, CA.Codigo, CA.Producto'); 
        $this->db->from('Productos_ofertas AS PO');
        $this->db->join('Catalogo AS CA','PO.idProducto = CA.ID');
        $this->db->where('PO.idOferta', $idOferta);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Regalos de la oferta By idOferta //
    public function getRegalosOferta($idOferta)
    {
        
        $this->db->select('R.*, CA.Codigo, CA.Producto'); 
        $this->db->from('Regalos AS R');
        $this->db->join('Catalogo AS CA','R.idCatalogo = CA.ID');
        $this->db->where('R.idOferta', $idOferta);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Agregar Oferta Descuento //
    public function AddOfertaDescuento($data)
    {
        $Cliente  = array();
        $Producto = array();
        $Sucursal = array();
        $Division = array();
        $Linea    = array();
        $Sublinea = array();

        if ($data['Distribuidor'] != null){
            $Cliente  = explode(",", $data['Distribuidor']);
        }

        if ($data['Producto'] != null){
            $Producto = explode(",", $data['Producto']);
        }

        if ($data['Division'] != null){
            $Division = explode(",", $data['Division']);
        }

        if ($data['Linea'] != null){
            $Linea = explode(",", $data['Linea']);
        }

        if ($data['Sublinea'] != null){
            $Sublinea = explode(",", $data['Sublinea']);
        }

        if ($data['Sucursal'] != null){
            $Sucursal = explode(",", $data['Sucursal']);
        }

        $Oferta = array(
                'Nombre' => $data['Nombre'],
                'Tipo_Desc' => $data['Tipo_Desc'],
                'Tipo_Regalo' => $data['Tipo_Regalo'],
                '`Desc`' => $data['Desc'],
                'Vigencia_inicial' => $data['Vigencia_inicial'],
                'Vigencia_final' => $data['Vigencia_final'],
                'Compra_req' => $data['Compra_req'],
                'Excluir_Distribuidores' => $data['Excluir'],
                'Status' => $data['Status']);
 

        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->insert('Ofertas', $Oferta);
        $insert_id = $this->db->insert_id();

        if (count($Cliente) > 0){
            for ($i=0; $i < count($Cliente) ; $i++){ 
                $array_Clientes = array(
                    'idOferta' => $insert_id,
                    'idDistribuidor' => $Cliente[$i]);

                $this->db->insert('Distribuidores_ofertas', $array_Clientes);
            }
        }

        if (count($Producto) > 0){
            for ($x=0; $x < count($Producto) ; $x++){ 
                $array_Producto = array(
                    'idOferta' => $insert_id,
                    'idProducto' => $Producto[$x]);

                $this->db->insert('Productos_ofertas', $array_Producto);
            }
        }


        if (count($Sucursal) > 0){
            for ($y=0; $y < count($Sucursal) ; $y++){ 
                $array_Sucursal = array(
                    'idOferta' => $insert_id,
                    'idSucursal' => $Sucursal[$y]);

                $this->db->insert('Asignacion_oferta', $array_Sucursal);
            }
        }

        if (count($Division) > 0){
            for ($q=0; $q < count($Division) ; $q++){ 
                $array_Division = array(
                    'idOferta' => $insert_id,
                    'idDivision' => $Division[$q]);

                $this->db->insert('Divisiones_ofertas', $array_Division);
            }
        }

        
        if (count($Linea) > 0){
            for ($e=0; $e < count($Linea) ; $e++){ 
                $array_Linea = array(
                    'idOferta' => $insert_id,
                    'idLinea' => $Linea[$e]);

                $this->db->insert('Lineas_ofertas', $array_Linea);
            }
        }

        if (count($Sublinea) > 0){
            for ($r=0; $r < count($Sublinea) ; $r++){ 
                $array_Sublinea = array(
                    'idOferta' => $insert_id,
                    'idSublinea' => $Sublinea[$r]);

                $this->db->insert('Sublineas_ofertas', $array_Sublinea);
            }
        }

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    // Agregar Oferta Regalo //
    public function AddOfertaRegalo($data)
    {
        $Cliente  = array();
        $Producto = array();
        $Sucursal = array();
        $Division = array();
        $Linea    = array();
        $Sublinea = array();
        $Regalos = array();

        if ($data['Distribuidor'] != null){
            $Cliente  = explode(",", $data['Distribuidor']);
        }

        if ($data['Producto'] != null){
            $Producto = explode(",", $data['Producto']);
        }

        if ($data['Division'] != null){
            $Division = explode(",", $data['Division']);
        }

        if ($data['Linea'] != null){
            $Linea = explode(",", $data['Linea']);
        }

        if ($data['Sublinea'] != null){
            $Sublinea = explode(",", $data['Sublinea']);
        }

        if ($data['Sucursal'] != null){
            $Sucursal = explode(",", $data['Sucursal']);
        }

        if ($data['Regalo'] != null){
            $Regalos = explode(",", $data['Regalo']);
        }

        $Oferta = array(
                'Nombre' => $data['Nombre'],
                'Tipo_Desc' => $data['Tipo_Desc'],
                'Tipo_Regalo' => $data['Tipo_Regalo'],
                '`Desc`' => $data['Desc'],
                'Vigencia_inicial' => $data['Vigencia_inicial'],
                'Vigencia_final' => $data['Vigencia_final'],
                'Compra_req' => $data['Compra_req'],
                'Excluir_Distribuidores' => $data['Excluir'],
                'Status' => $data['Status']);
 

        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->insert('Ofertas', $Oferta);
        $insert_id = $this->db->insert_id();

        if (count($Cliente) > 0){
            for ($i=0; $i < count($Cliente) ; $i++){ 
                $array_Clientes = array(
                    'idOferta' => $insert_id,
                    'idDistribuidor' => $Cliente[$i]);

                $this->db->insert('Distribuidores_ofertas', $array_Clientes);
            }
        }

        if (count($Producto) > 0){
            for ($x=0; $x < count($Producto) ; $x++){ 
                $array_Producto = array(
                    'idOferta' => $insert_id,
                    'idProducto' => $Producto[$x]);

                $this->db->insert('Productos_ofertas', $array_Producto);
            }
        }

        if (count($Sucursal) > 0){
            for ($y=0; $y < count($Sucursal) ; $y++){ 
                $array_Sucursal = array(
                    'idOferta' => $insert_id,
                    'idSucursal' => $Sucursal[$y]);

                $this->db->insert('Asignacion_oferta', $array_Sucursal);
            }
        }

        if (count($Division) > 0){
            for ($q=0; $q < count($Division) ; $q++){ 
                $array_Division = array(
                    'idOferta' => $insert_id,
                    'idDivision' => $Division[$q]);

                $this->db->insert('Divisiones_ofertas', $array_Division);
            }
        }

        if (count($Linea) > 0){
            for ($e=0; $e < count($Linea) ; $e++){ 
                $array_Linea = array(
                    'idOferta' => $insert_id,
                    'idLinea' => $Linea[$e]);

                $this->db->insert('Lineas_ofertas', $array_Linea);
            }
        }

        if (count($Sublinea) > 0){
            for ($r=0; $r < count($Sublinea) ; $r++){ 
                $array_Sublinea = array(
                    'idOferta' => $insert_id,
                    'idSublinea' => $Sublinea[$r]);

                $this->db->insert('Sublineas_ofertas', $array_Sublinea);
            }
        }

        if (count($Regalos) > 0){
            for ($u=0; $u < count($Regalos) ; $u++){ 
                $array_Regalo = array(
                    'idOferta' => $insert_id,
                    'idCatalogo' => $Regalos[$u]);

                $this->db->insert('Regalos', $array_Regalo);
            }
        }

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
    public function getOfertaById($idOferta)
    {
        
        $this->db->select('*'); 
        $this->db->from('Ofertas');
        $this->db->where('ID', $idOferta);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Productos By IdOferta //
    public function getProductosByIdOferta($idOferta)
    {
        
        $this->db->select('PO.*, CA.Codigo, CA.Producto, CA.ID AS ID_Producto'); 
        $this->db->from('Productos_ofertas AS PO');
        $this->db->join('Catalogo AS CA','PO.idProducto = CA.ID');
        $this->db->where('PO.idOferta', $idOferta);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Sucursales By IdOferta //
    public function getAsignacionByIdOferta($idOferta)
    {
        
        $this->db->select('AO.*, SU.Sucursal, SU.ID AS ID_Sucursal'); 
        $this->db->from('Asignacion_oferta AS AO');
        $this->db->join('Sucursales AS SU','AO.idSucursal = SU.ID');
        $this->db->where('AO.idOferta', $idOferta);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Distribuidor By IdOferta //
    public function getDistribuidoresByIdOferta($idOferta)
    {
        
        $this->db->select('AO.*, CONCAT(CL.Nombre," ",CL.Apellidos) AS Cliente, CL.ID AS ID_Cliente'); 
        $this->db->from('Distribuidores_ofertas AS AO');
        $this->db->join('Clientes AS CL','AO.idDistribuidor = CL.ID');
        $this->db->where('AO.idOferta', $idOferta);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Regalos By IdOferta //
    public function getRegalosByIdOferta($idOferta)
    {
        
        $this->db->select('AO.*, CA.Producto, CA.ID AS ID_Catalogo'); 
        $this->db->from('Regalos AS AO');
        $this->db->join('Catalogo AS CA','AO.idCatalogo = CA.ID');
        $this->db->where('AO.idOferta', $idOferta);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Division By IdOferta //
    public function getDivisionByIdOferta($idOferta)
    {
        
        $this->db->select('AO.*, DI.Division, DI.ID AS ID_Division'); 
        $this->db->from('Divisiones_ofertas AS AO');
        $this->db->join('Divisiones AS DI','AO.idDivision = DI.ID');
        $this->db->where('AO.idOferta', $idOferta);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Linea By IdOferta //
    public function getLineaByIdOferta($idOferta)
    {
        
        $this->db->select('AO.*, DI.Linea, DI.ID AS ID_Linea'); 
        $this->db->from('Lineas_ofertas AS AO');
        $this->db->join('Lineas AS DI','AO.idLinea = DI.ID');
        $this->db->where('AO.idOferta', $idOferta);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Obtener Sublinea By IdOferta //
    public function getSublineaByIdOferta($idOferta)
    {
        
        $this->db->select('AO.*, DI.Sublinea, DI.ID AS ID_Sublinea'); 
        $this->db->from('Sublineas_ofertas AS AO');
        $this->db->join('Sublineas AS DI','AO.idSublinea = DI.ID');
        $this->db->where('AO.idOferta', $idOferta);
        $query = $this->db->get();
        return $query->result_array();
    }

    // Acción Editar Oferta //
    public function UpdateOferta($data)
    {
        $Cliente  = array();
        $Producto = array();
        $Sucursal = array();
        $Division = array();
        $Linea    = array();
        $Sublinea = array();
        $Regalos = array();

        if ($data['Distribuidor'] != null){
            $Cliente  = explode(",", $data['Distribuidor']);
        }

        if ($data['Producto'] != null){
            $Producto = explode(",", $data['Producto']);
        }

        if ($data['Division'] != null){
            $Division = explode(",", $data['Division']);
        }

        if ($data['Linea'] != null){
            $Linea = explode(",", $data['Linea']);
        }

        if ($data['Sublinea'] != null){
            $Sublinea = explode(",", $data['Sublinea']);
        }

        if ($data['Sucursal'] != null){
            $Sucursal = explode(",", $data['Sucursal']);
        }

        if ($data['Regalo'] != null){
            $Regalos = explode(",", $data['Regalo']);
        }

        $Oferta = array(
                'Nombre' => $data['Nombre'],
                'Tipo_Desc' => $data['Tipo_Desc'],
                'Tipo_Regalo' => $data['Tipo_Regalo'],
                '`Desc`' => $data['Desc'],
                'Vigencia_inicial' => $data['Vigencia_inicial'],
                'Vigencia_final' => $data['Vigencia_final'],
                'Compra_req' => $data['Compra_req'],
                'Excluir_Distribuidores' => $data['Excluir'],
                'Status' => $data['Status']);
 

        $this->db->trans_begin();
        $this->db->trans_strict(FALSE); # See Note 01. If you wish can remove as well 

        $this->db->where('ID',$data['ID']);
        $this->db->update('Ofertas', $Oferta);
        $insert_id = $this->db->affected_rows();

        ////////// DELETE ///////

        $this->db->where('idOferta', $data['ID']);
        $this->db->delete('Distribuidores_ofertas');

        $this->db->where('idOferta', $data['ID']);
        $this->db->delete('Productos_ofertas');

        $this->db->where('idOferta', $data['ID']);
        $this->db->delete('Asignacion_oferta');

        $this->db->where('idOferta', $data['ID']);
        $this->db->delete('Divisiones_ofertas');

        $this->db->where('idOferta', $data['ID']);
        $this->db->delete('Lineas_ofertas');

        $this->db->where('idOferta', $data['ID']);
        $this->db->delete('Sublineas_ofertas');

        $this->db->where('idOferta', $data['ID']);
        $this->db->delete('Regalos');

        if (count($Cliente) > 0){
            for ($i=0; $i < count($Cliente) ; $i++){ 
                $array_Clientes = array(
                    'idOferta' => $data['ID'],
                    'idDistribuidor' => $Cliente[$i]);

                $this->db->insert('Distribuidores_ofertas', $array_Clientes);
            }
        }

        if (count($Producto) > 0){
            for ($x=0; $x < count($Producto) ; $x++){ 
                $array_Producto = array(
                    'idOferta' => $data['ID'],
                    'idProducto' => $Producto[$x]);

                $this->db->insert('Productos_ofertas', $array_Producto);
            }
        }


        if (count($Sucursal) > 0){
            for ($y=0; $y < count($Sucursal) ; $y++){ 
                $array_Sucursal = array(
                    'idOferta' => $data['ID'],
                    'idSucursal' => $Sucursal[$y]);

                $this->db->insert('Asignacion_oferta', $array_Sucursal);
            }
        }

        if (count($Division) > 0){
            for ($q=0; $q < count($Division) ; $q++){ 
                $array_Division = array(
                    'idOferta' => $data['ID'],
                    'idDivision' => $Division[$q]);

                $this->db->insert('Divisiones_ofertas', $array_Division);
            }
        }

        
        if (count($Linea) > 0){
            for ($e=0; $e < count($Linea) ; $e++){ 
                $array_Linea = array(
                    'idOferta' => $data['ID'],
                    'idLinea' => $Linea[$e]);

                $this->db->insert('Lineas_ofertas', $array_Linea);
            }
        }

        if (count($Sublinea) > 0){
            for ($r=0; $r < count($Sublinea) ; $r++){ 
                $array_Sublinea = array(
                    'idOferta' => $data['ID'],
                    'idSublinea' => $Sublinea[$r]);

                $this->db->insert('Sublineas_ofertas', $array_Sublinea);
            }
        }

        if (count($Regalos) > 0){
            for ($u=0; $u < count($Regalos) ; $u++){ 
                $array_Regalo = array(
                    'idOferta' => $data['ID'],
                    'idCatalogo' => $Regalos[$u]);

                $this->db->insert('Regalos', $array_Regalo);
            }
        }

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    // Eliminar Oferta //
    public function deleteOferta($data)
    {
        $this->db->trans_begin();
        $this->db->trans_strict(FALSE);
        
        $this->db->query('UPDATE Ofertas SET Status = "Inactivo" WHERE ID ='.$data['idOferta'].'');

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return 0;
        }
        else{
            $this->db->trans_commit();
            return 1;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////

    public function Get_Productos_by_id($id)
    {
        
        $this->db->select('*'); 
        $this->db->from('Promociones');
        $this->db->where('ID', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Promociones_Producto($id)
    {
        
        $this->db->select('PP.*, CA.Codigo, CA.Producto, CA.ID AS ID_Catalogo'); 
        $this->db->from('Productos_promociones AS PP');
        $this->db->join('Catalogo AS CA','PP.idCatalogo = CA.ID');
        $this->db->where('PP.idPromocion', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function get_info_Inventario($data)
    {
        $Importe = 0;
        $idCatalogo = explode(",",$data['idCatalogo']);
        $Cantidad = explode(",",$data['Cantidad']);
        $idSucursal = $data['idSucursal'];

        for ($i=0; $i < count($idCatalogo); $i++)
        { 
            
            $this->db->select('*'); 
            $this->db->from('Inventario');
            $this->db->where('idCatalogo', $idCatalogo[$i]);
            $this->db->where('idSucursal', $idSucursal);
            $query = $this->db->get();
            $result = $query->result_array();

            /*print_r("idCatalogo: " . $idCatalogo[$i]);
            print_r("\n");
            print_r("\n");
            print_r("Cantidad: " . $Cantidad[$i]);
            print_r("\n");
            print_r("\n");
            print_r("Precio Unitario: " . $result[0]['Precio_publico']);
            print_r("\n");
            print_r("\n");
            print_r("Importe: " . floatval($result[0]['Precio_publico']) * intval($Cantidad[$i]));*/

            $Importe += floatval($result[0]['Precio_publico']) * intval($Cantidad[$i]);

            /*print_r("\n");
            print_r("\n");
            print_r("Total: " . $Importe);
            print_r("\n");
            print_r("\n");*/
        }

        /*print_r("\n");
        print_r("\n");
        print_r("\n");
        print_r("\n");
        print_r("Total: " . $Importe);
        exit();*/

        $arrayImporte = array('Importe' => $Importe);

        return $arrayImporte;

    }

    public function Get_Asignacion_promo($id)
    {
        
        $this->db->select('AP.*, S.Sucursal, S.ID AS ID_Sucursal'); 
        $this->db->from('Asignacion_promo AS AP');
        $this->db->join('Sucursales AS S','AP.idSucursal = S.ID');
        $this->db->where('AP.idPromocion', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Distribuidores_promociones($id)
    {
        
        $this->db->select('DP.*, CONCAT(CL.Nombre," ",CL.Apellidos) AS Cliente, CL.ID AS ID_Cliente'); 
        $this->db->from('Distribuidores_promociones AS DP');
        $this->db->join('Clientes AS CL','DP.idDistribuidor = CL.ID');
        $this->db->where('DP.idPromocion', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Productos_Promociones($id)
    {
    	#select PP.*, CA.Codigo, CA.Producto from Productos_promociones AS PP INNER JOIN Catalogo AS CA ON PP.idCatalogo = CA.ID;
    	
        $this->db->select('PP.*, CA.Codigo, CA.Producto'); 
        $this->db->from('Productos_promociones AS PP');
        $this->db->join('Catalogo AS CA','PP.idCatalogo = CA.ID');
        $this->db->where('PP.idPromocion', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Productos_Ofertas($id)
    {
    	# select PO.*, CA.Codigo, CA.Producto from Productos_ofertas PO INNER JOIN Catalogo AS CA ON PO.idProducto = CA.ID;

    	
        $this->db->select('PO.*, CA.Codigo, CA.Producto'); 
        $this->db->from('Productos_ofertas AS PO');
        $this->db->join('Catalogo AS CA','PO.idProducto = CA.ID');
        $this->db->where('PO.idOferta', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Productos_Regalo($id)
    {
    	#select R.*, CA.Codigo, CA.Producto from Regalos R INNER JOIN Catalogo AS CA ON R.idCatalogo = CA.ID;

    	
        $this->db->select('R.*, CA.Codigo, CA.Producto'); 
        $this->db->from('Regalos AS R');
        $this->db->join('Catalogo AS CA','R.idCatalogo = CA.ID');
        $this->db->where('R.idOferta', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Division()
    {
    	
        $this->db->select('*'); 
        $this->db->from('Divisiones');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Linea()
    {
    	
        $this->db->select('*'); 
        $this->db->from('Lineas');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Sublinea()
    {
    	
        $this->db->select('*'); 
        $this->db->from('Sublineas');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Distribuidores()
    {
    	
        $this->db->select('*'); 
        $this->db->from('Clientes');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Productos()
    {
    	
        $this->db->select('*'); 
        $this->db->from('Catalogo');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Sucursales()
    {
    	
        $this->db->select('*'); 
        $this->db->from('Sucursales');
        $query = $this->db->get();
        return $query->result_array();
    }

    /*public function Get_Division()
    {
        
        $this->db->select('*'); 
        $this->db->from('Divisiones');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Linea()
    {
        
        $this->db->select('*'); 
        $this->db->from('Lineas');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Sublinea()
    {
        
        $this->db->select('*'); 
        $this->db->from('Sublineas');
        $query = $this->db->get();
        return $query->result_array();
    }*/

    public function Eliminar_Oferta($data)
    {
        $this->db->trans_begin();

        $this->db->query('UPDATE Ofertas SET Status = "Inactivo" WHERE ID ='.$data['ID'].'');

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

    public function Eliminar_Promocion($data)
    {
        $this->db->trans_begin();

        $this->db->query('UPDATE Promociones SET Status = "Inactivo" WHERE ID ='.$data['ID'].'');

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

    public function Editar_Promocion($data)
    {
        $Cliente  = array();
        $Producto = array();
        $Sucursal = array();
        $Cantidad = array();
        $Precio   = array();
        $Ahorro   = array();

        if ($data['Distribuidor'] != null)
        {
            $Cliente  = explode(",", $data['Distribuidor']);
        }

        if ($data['Producto'] != null)
        {
            $Producto  = explode(",", $data['Producto']);
        }

        if ($data['Sucursal'] != null)
        {
            $Sucursal  = explode(",", $data['Sucursal']);
        }

        if ($data['Cantidad'] != null)
        {
            $Cantidad  = explode(",", $data['Cantidad']);
        }

        if ($data['Precio'] != null)
        {
            $Precio  = explode(",", $data['Precio']);
        }

        if ($data['Ahorro'] != null)
        {
            $Ahorro  = explode(",", $data['Ahorro']);
        }

        $Division = null;
        $Linea    = null;
        $Sublinea = null;

        if ($data['Division'] != "")
        {
            $Division = $data['Division'];
        }

        if ($data['Linea'] != "")
        {
            $Linea = $data['Linea'];
        }

        if ($data['Sublinea'] != "")
        {
            $Sublinea = $data['Sublinea'];
        }

        /*$Cliente  = explode(",", $data['Distribuidor']);
        $Producto = explode(",", $data['Producto']);
        $Sucursal = explode(",", $data['Sucursal']);
        $Cantidad = explode(",", $data['Cantidad']);
        $Precio   = explode(",", $data['Precio']);
        $Ahorro   = explode(",", $data['Ahorro']);*/

        $Promociones = array(
                'idDivision' => $Division,
                'idLinea' => $Linea,
                'idSublinea' => $Sublinea,
                'Promocion' => $data['Nombre'],
                'Cantidad' => '',
                'Vigencia_inicial' => $data['Vigencia_Inicial'],
                'Vigencia_final' => $data['Vigencia_Final'],
                'Precio_promo' => '',
                'Status' => $data['Status'],
                'Excluir_Distribuidores' => $data['Excluir'],
                'Ahorro' => '');
 

        $this->db->trans_begin();

        $this->db->query('DELETE FROM Asignacion_promo WHERE idPromocion = '.$data['ID'].'');
        $this->db->query('DELETE FROM Productos_promociones WHERE idPromocion = '.$data['ID'].'');
        $this->db->query('DELETE FROM Distribuidores_promociones WHERE idPromocion = '.$data['ID'].'');

        $this->db->where('ID',$data['ID']);
        $this->db->update('Promociones', $Promociones);

        for ($i=0; $i < count($Cliente) ; $i++)
        { 
            $array_Clientes = array(
                'idPromocion' => $data['ID'],
                'idDistribuidor' => $Cliente[$i]);

            $this->db->insert('Distribuidores_promociones', $array_Clientes);
        }

        for ($x=0; $x < count($Producto) ; $x++)
        { 
            $array_Producto = array(
                'idPromocion' => $data['ID'],
                'idCatalogo' => $Producto[$x],
                'Cantidad' => $Cantidad[$x]);

            $this->db->insert('Productos_promociones', $array_Producto);
        }

        for ($y=0; $y < count($Sucursal) ; $y++)
        { 
            $array_Sucursal = array(
                'idPromocion' => $data['ID'],
                'idSucursal' => $Sucursal[$y],
                'precio' => $Precio[$y],
                'ahorro' => $Ahorro[$y]);

            $this->db->insert('Asignacion_promo', $array_Sucursal);
        }

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

    public function Agregar_Promocion($data)
    {
    	$Cliente  = array();
    	$Producto = array();
    	$Sucursal = array();
    	$Cantidad = array();
    	$Precio   = array();
    	$Ahorro   = array();

        if ($data['Distribuidor'] != null)
        {
            $Cliente  = explode(",", $data['Distribuidor']);
        }

        if ($data['Producto'] != null)
        {
            $Producto  = explode(",", $data['Producto']);
        }

        if ($data['Sucursal'] != null)
        {
            $Sucursal  = explode(",", $data['Sucursal']);
        }

        if ($data['Cantidad'] != null)
        {
            $Cantidad  = explode(",", $data['Cantidad']);
        }

        if ($data['Precio'] != null)
        {
            $Precio  = explode(",", $data['Precio']);
        }

        if ($data['Ahorro'] != null)
        {
            $Ahorro  = explode(",", $data['Ahorro']);
        }

    	/*$Producto = explode(",", $data['Producto']);
    	$Sucursal = explode(",", $data['Sucursal']);
    	$Cantidad = explode(",", $data['Cantidad']);
    	$Precio   = explode(",", $data['Precio']);
    	$Ahorro   = explode(",", $data['Ahorro']);*/

        $Division = null;
        $Linea    = null;
        $Sublinea = null;

        if ($data['Division'] != "")
        {
            $Division = $data['Division'];
        }

        if ($data['Linea'] != "")
        {
            $Linea = $data['Linea'];
        }

        if ($data['Sublinea'] != "")
        {
            $Sublinea = $data['Sublinea'];
        }

    	$Promociones = array(
				'idDivision' => $Division,
				'idLinea' => $Linea,
				'idSublinea' => $Sublinea,
				'Promocion' => $data['Nombre'],
				'Cantidad' => '',
				'Vigencia_inicial' => $data['Vigencia_Inicial'],
				'Vigencia_final' => $data['Vigencia_Final'],
				'Precio_promo' => '',
				'Status' => 'Activo',
				'Excluir_Distribuidores' => $data['Excluir'],
				'Ahorro' => '');
 

		$this->db->trans_begin();

		//$this->db->query('UPDATE Detalle_inventario SET Existencias='.$Existencias.' WHERE ID='.$id.'');
		$this->db->insert('Promociones', $Promociones);
		$insert_id = $this->db->insert_id();

		for ($i=0; $i < count($Cliente) ; $i++)
		{ 
			$array_Clientes = array(
				'idPromocion' => $insert_id,
				'idDistribuidor' => $Cliente[$i]);

			$this->db->insert('Distribuidores_promociones', $array_Clientes);
		}

		for ($x=0; $x < count($Producto) ; $x++)
		{ 
			$array_Producto = array(
				'idPromocion' => $insert_id,
				'idCatalogo' => $Producto[$x],
				'Cantidad' => $Cantidad[$x]);

			$this->db->insert('Productos_promociones', $array_Producto);
		}

		for ($y=0; $y < count($Sucursal) ; $y++)
		{ 
			$array_Sucursal = array(
				'idPromocion' => $insert_id,
				'idSucursal' => $Sucursal[$y],
				'precio' => $Precio[$y],
				'ahorro' => $Ahorro[$y]);

			$this->db->insert('Asignacion_promo', $array_Sucursal);
		}

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

    public function Agregar_Promocion_Desc($data)
    {
        $Cliente  = array();
        $Producto = array();
        $Sucursal = array();
        $Division = array();
        $Linea    = array();
        $Sublinea = array();

        if ($data['Distribuidor'] != null)
        {
            $Cliente  = explode(",", $data['Distribuidor']);
        }

        if ($data['Producto'] != null)
        {
            $Producto = explode(",", $data['Producto']);
        }

        if ($data['Division'] != null)
        {
            $Division = explode(",", $data['Division']);
        }

        if ($data['Linea'] != null)
        {
            $Linea = explode(",", $data['Linea']);
        }

        if ($data['Sublinea'] != null)
        {
            $Sublinea = explode(",", $data['Sublinea']);
        }

        if ($data['Sucursal'] != null)
        {
            $Sucursal = explode(",", $data['Sucursal']);
        }

        /*$Cliente  = explode(",", $data['Distribuidor']);
        $Producto = explode(",", $data['Producto']);
        $Sucursal = explode(",", $data['Sucursal']);
        $Division = explode(",", $data['Division']);
        $Linea    = explode(",", $data['Linea']);
        $Sublinea = explode(",", $data['Sublinea']);*/

        $Oferta = array(
                'Nombre' => $data['Nombre'],
                'Tipo_Desc' => $data['Tipo_Desc'],
                'Tipo_Regalo' => $data['Tipo_Regalo'],
                '`Desc`' => $data['Desc'],
                'Vigencia_inicial' => $data['Vigencia_inicial'],
                'Vigencia_final' => $data['Vigencia_final'],
                'Compra_req' => $data['Compra_req'],
                'Excluir_Distribuidores' => $data['Excluir'],
                'Status' => $data['Status']);
 

        $this->db->trans_begin();

        //$this->db->query('UPDATE Detalle_inventario SET Existencias='.$Existencias.' WHERE ID='.$id.'');
        $this->db->insert('Ofertas', $Oferta);
        $insert_id = $this->db->insert_id();

        if (count($Cliente) > 0)
        {
            for ($i=0; $i < count($Cliente) ; $i++)
            { 
                $array_Clientes = array(
                    'idOferta' => $insert_id,
                    'idDistribuidor' => $Cliente[$i]);

                $this->db->insert('Distribuidores_ofertas', $array_Clientes);
            }
        }

        if (count($Producto) > 0)
        {
            for ($x=0; $x < count($Producto) ; $x++)
            { 
                $array_Producto = array(
                    'idOferta' => $insert_id,
                    'idProducto' => $Producto[$x]);

                $this->db->insert('Productos_ofertas', $array_Producto);
            }
        }


        if (count($Sucursal) > 0)
        {
            for ($y=0; $y < count($Sucursal) ; $y++)
            { 
                $array_Sucursal = array(
                    'idOferta' => $insert_id,
                    'idSucursal' => $Sucursal[$y]);

                $this->db->insert('Asignacion_oferta', $array_Sucursal);
            }
        }

        if (count($Division) > 0)
        {
            for ($q=0; $q < count($Division) ; $q++)
            { 
                $array_Division = array(
                    'idOferta' => $insert_id,
                    'idDivision' => $Division[$q]);

                $this->db->insert('Divisiones_ofertas', $array_Division);
            }
        }

        
        if (count($Linea) > 0)
        {
            for ($e=0; $e < count($Linea) ; $e++)
            { 
                $array_Linea = array(
                    'idOferta' => $insert_id,
                    'idLinea' => $Linea[$e]);

                $this->db->insert('Lineas_ofertas', $array_Linea);
            }
        }

        if (count($Sublinea) > 0)
        {
            for ($r=0; $r < count($Sublinea) ; $r++)
            { 
                $array_Sublinea = array(
                    'idOferta' => $insert_id,
                    'idSublinea' => $Sublinea[$r]);

                $this->db->insert('Sublineas_ofertas', $array_Sublinea);
            }
        }

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


    public function Agregar_Promocion_Regalo($data)
    {
        $Cliente  = array();
        $Producto = array();
        $Sucursal = array();
        $Division = array();
        $Linea    = array();
        $Sublinea = array();
        $Regalos = array();

        if ($data['Distribuidor'] != null)
        {
            $Cliente  = explode(",", $data['Distribuidor']);
        }

        if ($data['Distribuidor'] != null)
        {
            $Producto = explode(",", $data['Producto']);
        }

        if ($data['Division'] != null)
        {
            $Division = explode(",", $data['Division']);
        }

        if ($data['Linea'] != null)
        {
            $Linea = explode(",", $data['Linea']);
        }

        if ($data['Sublinea'] != null)
        {
            $Sublinea = explode(",", $data['Sublinea']);
        }

        if ($data['Sucursal'] != null)
        {
            $Sucursal = explode(",", $data['Sucursal']);
        }

        if ($data['Regalo'] != null)
        {
            $Regalos = explode(",", $data['Regalo']);
        }

        /*$Cliente  = explode(",", $data['Distribuidor']);
        $Producto = explode(",", $data['Producto']);
        $Sucursal = explode(",", $data['Sucursal']);
        $Division = explode(",", $data['Division']);
        $Linea    = explode(",", $data['Linea']);
        $Sublinea = explode(",", $data['Sublinea']);
        $Regalos  = explode(",", $data['Regalo']);*/

        $Oferta = array(
                'Nombre' => $data['Nombre'],
                'Tipo_Desc' => $data['Tipo_Desc'],
                'Tipo_Regalo' => $data['Tipo_Regalo'],
                '`Desc`' => $data['Desc'],
                'Vigencia_inicial' => $data['Vigencia_inicial'],
                'Vigencia_final' => $data['Vigencia_final'],
                'Compra_req' => $data['Compra_req'],
                'Excluir_Distribuidores' => $data['Excluir'],
                'Status' => $data['Status']);
 

        $this->db->trans_begin();

        //$this->db->query('UPDATE Detalle_inventario SET Existencias='.$Existencias.' WHERE ID='.$id.'');
        $this->db->insert('Ofertas', $Oferta);
        $insert_id = $this->db->insert_id();

        if (count($Cliente) > 0)
        {
            for ($i=0; $i < count($Cliente) ; $i++)
            { 
                $array_Clientes = array(
                    'idOferta' => $insert_id,
                    'idDistribuidor' => $Cliente[$i]);

                $this->db->insert('Distribuidores_ofertas', $array_Clientes);
            }
        }

        if (count($Producto) > 0)
        {
            for ($x=0; $x < count($Producto) ; $x++)
            { 
                $array_Producto = array(
                    'idOferta' => $insert_id,
                    'idProducto' => $Producto[$x]);

                $this->db->insert('Productos_ofertas', $array_Producto);
            }
        }


        if (count($Sucursal) > 0)
        {
            for ($y=0; $y < count($Sucursal) ; $y++)
            { 
                $array_Sucursal = array(
                    'idOferta' => $insert_id,
                    'idSucursal' => $Sucursal[$y]);

                $this->db->insert('Asignacion_oferta', $array_Sucursal);
            }
        }

        if (count($Division) > 0)
        {
            for ($q=0; $q < count($Division) ; $q++)
            { 
                $array_Division = array(
                    'idOferta' => $insert_id,
                    'idDivision' => $Division[$q]);

                $this->db->insert('Divisiones_ofertas', $array_Division);
            }
        }

        
        if (count($Linea) > 0)
        {
            for ($e=0; $e < count($Linea) ; $e++)
            { 
                $array_Linea = array(
                    'idOferta' => $insert_id,
                    'idLinea' => $Linea[$e]);

                $this->db->insert('Lineas_ofertas', $array_Linea);
            }
        }

        if (count($Sublinea) > 0)
        {
            for ($r=0; $r < count($Sublinea) ; $r++)
            { 
                $array_Sublinea = array(
                    'idOferta' => $insert_id,
                    'idSublinea' => $Sublinea[$r]);

                $this->db->insert('Sublineas_ofertas', $array_Sublinea);
            }
        }

        if (count($Regalos) > 0)
        {
            for ($u=0; $u < count($Regalos) ; $u++)
            { 
                $array_Regalo = array(
                    'idOferta' => $insert_id,
                    'idCatalogo' => $Regalos[$u]);

                $this->db->insert('Regalos', $array_Regalo);
            }
        }

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

    public function Editar_Oferta($data)
    {
        $Cliente  = array();
        $Producto = array();
        $Sucursal = array();
        $Division = array();
        $Linea    = array();
        $Sublinea = array();
        $Regalos = array();

        if ($data['Distribuidor'] != null)
        {
            $Cliente  = explode(",", $data['Distribuidor']);
        }

        if ($data['Producto'] != null)
        {
            $Producto = explode(",", $data['Producto']);
        }

        if ($data['Division'] != null)
        {
            $Division = explode(",", $data['Division']);
        }

        if ($data['Linea'] != null)
        {
            $Linea = explode(",", $data['Linea']);
        }

        if ($data['Sublinea'] != null)
        {
            $Sublinea = explode(",", $data['Sublinea']);
        }

        if ($data['Sucursal'] != null)
        {
            $Sucursal = explode(",", $data['Sucursal']);
        }

        if ($data['Regalo'] != null)
        {
            $Regalos = explode(",", $data['Regalo']);
        }

        $Oferta = array(
                'Nombre' => $data['Nombre'],
                'Tipo_Desc' => $data['Tipo_Desc'],
                'Tipo_Regalo' => $data['Tipo_Regalo'],
                '`Desc`' => $data['Desc'],
                'Vigencia_inicial' => $data['Vigencia_inicial'],
                'Vigencia_final' => $data['Vigencia_final'],
                'Compra_req' => $data['Compra_req'],
                'Excluir_Distribuidores' => $data['Excluir'],
                'Status' => $data['Status']);
 

        $this->db->trans_begin();

        //$this->db->query('UPDATE Detalle_inventario SET Existencias='.$Existencias.' WHERE ID='.$id.'');
        $this->db->where('ID',$data['ID']);
        $this->db->update('Ofertas', $Oferta);
        $insert_id = $this->db->affected_rows();

        ////////// DELETE ///////

        $this->db->where('idOferta', $data['ID']);
        $this->db->delete('Distribuidores_ofertas');

        $this->db->where('idOferta', $data['ID']);
        $this->db->delete('Productos_ofertas');

        $this->db->where('idOferta', $data['ID']);
        $this->db->delete('Asignacion_oferta');

        $this->db->where('idOferta', $data['ID']);
        $this->db->delete('Divisiones_ofertas');

        $this->db->where('idOferta', $data['ID']);
        $this->db->delete('Lineas_ofertas');

        $this->db->where('idOferta', $data['ID']);
        $this->db->delete('Sublineas_ofertas');

        $this->db->where('idOferta', $data['ID']);
        $this->db->delete('Regalos');

        if (count($Cliente) > 0)
        {
            for ($i=0; $i < count($Cliente) ; $i++)
            { 
                $array_Clientes = array(
                    'idOferta' => $data['ID'],
                    'idDistribuidor' => $Cliente[$i]);

                $this->db->insert('Distribuidores_ofertas', $array_Clientes);
            }
        }

        if (count($Producto) > 0)
        {
            for ($x=0; $x < count($Producto) ; $x++)
            { 
                $array_Producto = array(
                    'idOferta' => $data['ID'],
                    'idProducto' => $Producto[$x]);

                $this->db->insert('Productos_ofertas', $array_Producto);
            }
        }


        if (count($Sucursal) > 0)
        {
            for ($y=0; $y < count($Sucursal) ; $y++)
            { 
                $array_Sucursal = array(
                    'idOferta' => $data['ID'],
                    'idSucursal' => $Sucursal[$y]);

                $this->db->insert('Asignacion_oferta', $array_Sucursal);
            }
        }

        if (count($Division) > 0)
        {
            for ($q=0; $q < count($Division) ; $q++)
            { 
                $array_Division = array(
                    'idOferta' => $data['ID'],
                    'idDivision' => $Division[$q]);

                $this->db->insert('Divisiones_ofertas', $array_Division);
            }
        }

        
        if (count($Linea) > 0)
        {
            for ($e=0; $e < count($Linea) ; $e++)
            { 
                $array_Linea = array(
                    'idOferta' => $data['ID'],
                    'idLinea' => $Linea[$e]);

                $this->db->insert('Lineas_ofertas', $array_Linea);
            }
        }

        if (count($Sublinea) > 0)
        {
            for ($r=0; $r < count($Sublinea) ; $r++)
            { 
                $array_Sublinea = array(
                    'idOferta' => $data['ID'],
                    'idSublinea' => $Sublinea[$r]);

                $this->db->insert('Sublineas_ofertas', $array_Sublinea);
            }
        }

        if (count($Regalos) > 0)
        {
            for ($u=0; $u < count($Regalos) ; $u++)
            { 
                $array_Regalo = array(
                    'idOferta' => $data['ID'],
                    'idCatalogo' => $Regalos[$u]);

                $this->db->insert('Regalos', $array_Regalo);
            }
        }

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

    public function Get_Oferta_by_id($id)
    {
        
        $this->db->select('*'); 
        $this->db->from('Ofertas');
        $this->db->where('ID', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Productos_Oferta($id)
    {
        
        $this->db->select('PO.*, CA.Codigo, CA.Producto, CA.ID AS ID_Producto'); 
        $this->db->from('Productos_ofertas AS PO');
        $this->db->join('Catalogo AS CA','PO.idProducto = CA.ID');
        $this->db->where('PO.idOferta', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Asignacion_Oferta($id)
    {
        
        $this->db->select('AO.*, SU.Sucursal, SU.ID AS ID_Sucursal'); 
        $this->db->from('Asignacion_oferta AS AO');
        $this->db->join('Sucursales AS SU','AO.idSucursal = SU.ID');
        $this->db->where('AO.idOferta', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Distribuidores_Oferta($id)
    {
        
        $this->db->select('AO.*, CONCAT(CL.Nombre," ",CL.Apellidos) AS Cliente, CL.ID AS ID_Cliente'); 
        $this->db->from('Distribuidores_ofertas AS AO');
        $this->db->join('Clientes AS CL','AO.idDistribuidor = CL.ID');
        $this->db->where('AO.idOferta', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Regalos($id)
    {
        
        $this->db->select('AO.*, CA.Producto, CA.ID AS ID_Catalogo'); 
        $this->db->from('Regalos AS AO');
        $this->db->join('Catalogo AS CA','AO.idCatalogo = CA.ID');
        $this->db->where('AO.idOferta', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Division_Oferta($id)
    {
        
        $this->db->select('AO.*, DI.Division, DI.ID AS ID_Division'); 
        $this->db->from('Divisiones_ofertas AS AO');
        $this->db->join('Divisiones AS DI','AO.idDivision = DI.ID');
        $this->db->where('AO.idOferta', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Linea_Oferta($id)
    {
        
        $this->db->select('AO.*, DI.Linea, DI.ID AS ID_Linea'); 
        $this->db->from('Lineas_ofertas AS AO');
        $this->db->join('Lineas AS DI','AO.idLinea = DI.ID');
        $this->db->where('AO.idOferta', $id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function Get_Sublinea_Oferta($id)
    {
        
        $this->db->select('AO.*, DI.Sublinea, DI.ID AS ID_Sublinea'); 
        $this->db->from('Sublineas_ofertas AS AO');
        $this->db->join('Sublineas AS DI','AO.idSublinea = DI.ID');
        $this->db->where('AO.idOferta', $id);
        $query = $this->db->get();
        return $query->result_array();
    }
}
