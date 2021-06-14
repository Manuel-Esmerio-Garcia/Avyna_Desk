<?php defined('BASEPATH') OR exit('No direct script access allowed');

date_default_timezone_set('America/Mexico_City');

ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

// Includes //
include('./Clases/XMLVentasDirectas.php');
include('./ecodexphp/includes.php');
include('./Clases/LeerCFDI.php');

class Controller_VentasDirectas extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		if(!isset($_SESSION['Avyna'])) redirect('controller_Login');
		$this->load->model("Ventas_Directas_Model","ventas");
		$this->load->model("Division_Model","division"); 
		$this->load->model("Linea_Model","linea");
		$this->load->model("Sublinea_Model","sublinea");
		$this->load->model("Bodega_Model","bodega");
		$this->load->model("Login_Model","login");
		$this->load->model("Fetch_Model","fetch");
		$this->load->model("Cliente_Model","cliente");
        $this->load->model('Empresa_Model', 'configure');
        $this->load->model('Facturacion_Model', 'facturacion');
        $this->load->model('Ventas_Model', 'venta');
        $this->load->model('Moneda_Model', 'moneda');
        $this->load->model("Extracciones_Model","extracciones");
	}

	public function index()
	{
		$Titulo = array('PageTitle' => 'Ventas Directas');

		$info['Division'] = $this->division->getDivision();
		$info['Sucursal'] = $this->bodega->getBodega();
		$info['Clientes'] = $this->cliente->getClientesDirectos(261);

		$Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      	 'pass' 	=>  $_SESSION['Avyna'][0]['Password']);

	    // Refrescar Permisos e información del usuario //
	    $Session = $this->login->signIn($Usuario);

	    if ($Session != null){  
	      	// Cargar Vista Inventario //
	    	$this->load->view('Componentes/Header', $Titulo); 
			$this->load->view('Operaciones/Ventasdirectas', $info);
			$this->load->view('Componentes/Footer');
	    }
	    else{
	      	// Cerrar Sesión //
	      	$this->cerrarSesion($Usuario);
	    }
    }
    
    public function index_Editar($id)
	{
		$Titulo = array('PageTitle' => 'Ventas Directas');

		$info['Division'] = $this->division->getDivision();
		$info['Sucursal'] = $this->bodega->getBodega();
        $info['Clientes'] = $this->cliente->getClientesDirectos(261);

        $details = $this->ventas->Get_Infomación_Detalle_Venta($id);

        $info['DetalleOferta']      = $this->ventas->Get_Infomación_Detalle_Venta_Oferta($id);
        $info['DetalleProducto']    = $this->ventas->Get_Infomación_Detalle_Venta_Producto($id);
        $info['DetallePromocion']   = $this->ventas->Get_Infomación_Detalle_Venta_Promociones($id);
        $info['Detalle']            = $this->ventas->Get_Ventas_Menudeo($id);

        $info['ID']   = $id;
        $info['idVentaMenudeo'] = $details[0]['idVenta_menudeo'];
        $info['idClienteMenudeo'] = $info['Detalle'][0]['idCliente_menudeo'];
        $info['descClienteMenudeo'] = $info['Clientes'][0]['Descuento_%'];

		$Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      	 'pass' 	=>  $_SESSION['Avyna'][0]['Password']);

	    // Refrescar Permisos e información del usuario //
	    $Session = $this->login->signIn($Usuario);

	    if ($Session != null){  
	      	// Cargar Vista Inventario //
	    	$this->load->view('Componentes/Header', $Titulo); 
			$this->load->view('Operaciones/Ventasdirectas', $info);
			$this->load->view('Componentes/Footer');
	    }
	    else{
	      	// Cerrar Sesión //
	      	$this->cerrarSesion($Usuario);
	    }
    }
    
    public function deleteVenta(){
        $data = $this->input->post();
        $info = $this->ventas->deleteVenta($data);
        print_r($info);
    }

	// Obtener Linea By idDivision //
	public function getLineaByIdDivision()
    {
        $data = $this->input->post();
        $info = $this->linea->getLineaByIdDivision($data['idDivision']);
        print_r(json_encode($info));
    }

    // DataTable fetchProductosVenta //
    public function fetchProductosVenta()
    {
    	$data = $this->input->post();
        $info = $this->fetch->fetchProductosVenta($data);
        print_r($info);
    }

    // DataTable fetchProductosPromo //
    public function fetchProductosPromo()
    {
    	$data = $this->input->post();
        $info = $this->fetch->fetchProductosPromo($data);
        print_r($info);
    }

    // DataTable fetchVentasDirectas //
    public function fetchVentasDirectas()
    {
        $data = $this->input->post();
        $info = $this->fetch->fetchVentasDirectas($data);
        print_r($info);
    }

    // Obtener info Cliente Menudeo By idVenta //
    public function GetinfoClienteMenudeoByIdVenta()
    {
        $data = $this->input->post();
        $info = $this->cliente->GetinfoClienteMenudeoByIdVenta($data);
        print_r(json_encode($info));
    }

    // Agregar Factura Directa //
    public function addFacturaDirecta()
    {
        $data = $this->input->post();
        $datos['Invoice']     = $this->facturacion->getInfoFacturaById($data['idVenta']);
        $datos['Venta']       = $this->venta->getVentaById($data['idVenta']);
        $datos['Datos_Venta'] = $this->venta->queryFacturacion($data['idVenta']);
        $datos['Monedas']     = $this->moneda->getMonedaById('MXN');
        $datos['Empresa']     = $this->configure->getEmpresa($_SESSION['Avyna'][0]['Empresa']);
        $datos['Formulario']  = $data;
        $info                 = $this->crearXMLV33($datos);
        print_r($info);
    }
    

    // Acción Crear XML V.33 //
    public function crearXMLV33($data){ 
    $XML = new XMLVentasDirectas();

    $rfc         = $data['Empresa'][0]['RFC'];
    $rfc_cliente = $data['Formulario']['RFC'];
    $hoy         = date("_Ymd");
    $Folio       = $data['Venta'][0]['ID'];
    $data['TotalVenta'] = $this->extracciones->getTotalVentasWeb($data['Venta'][0]['ID']);

    $validate = $this->validateSaldosFactura($data);

    if ($validate == 1){

      $archivoXML = $XML->satxmlsv33($data, '', '', '', '');

      try{

        $Seguridad = new Seguridad(); //Se crea instancia de la clase Seguridad
        $trsID     = rand( 1, 10000 ); //Se genera el ID
        $Token     = $Seguridad->ObtenerToken( $rfc, $trsID ); //Se genera el token de servicio
        $Timbra    = new Timbrado(); //Se crea instancia de la clase Timbrado
        $trsID     = rand(1, 10000); //Se genera el ID
        $Token     = $Seguridad->ObtenerToken( $rfc, $trsID );  

        $ComprobanteXML = $Timbra->TimbraXML($archivoXML, $rfc, $trsID, $Token);

        if ($ComprobanteXML != null) {

          $dir  =  $_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/XMLs/XML_Timbrados/';  
          $file = $rfc.'_'.$Folio.$hoy.'.xml'; //Nombre del XML timbrado
          $fi = fopen($dir.$file,'w+'); //Se crea el archivo xml en la ruta especifica
          fwrite($fi, $ComprobanteXML); //Mandamos el archivo XML proporcionado por el PAC    
          fclose($fi); 

          $dom = new DOMDOCUMENT('1.0','utf-8'); // Creamos objeto DOM
          $dom->load($dir.$file); // Definimos la ruta de nuestro XML

          // Recorremos el XML Tag por Tag para encontrar los elementos buscados
          // Obtenemos el Machote(Estructura) del XML desde la web de SAT 
          foreach ($dom->getElementsByTagNameNS('http://www.sat.gob.mx/TimbreFiscalDigital', '*') as $elemento){
            $UUID             = $elemento->getAttribute('UUID'); 
            $noCertificadoSAT = $elemento->getAttribute('NoCertificadoSAT'); 
            $FechaTimbrado    = $elemento->getAttribute('FechaTimbrado'); 
            $selloCFD         = $elemento->getAttribute('SelloCFD');
            $selloSAT         = $elemento->getAttribute('SelloSAT');
            $RFCPAC           = $elemento->getAttribute('RfcProvCertif');
          }
                     
          if ($UUID != null && $UUID != ""){
            $XML_Datos   = new SimpleXMLElement($ComprobanteXML);
            $Sello       = explode(" ",$XML_Datos['Sello']);
            $Certificado = explode(" ",$XML_Datos['Certificado']);
            $FechaFormat = $this->satxmlsv33_xml_fech($FechaTimbrado);

            $data['Factura'] = array(
              'IDVenta'           =>  $data['Venta'][0]['ID'],
              'Serie'             =>  $datos['Formulario']['idVenta'],
              'Folio'             =>  $data['Venta'][0]['ID'],
              'Fecha_Timbrado'    =>  $FechaFormat,
              'UUID'              =>  $UUID,
              'IDIntegrador'      =>  $trsID,
              'Status'            =>  $data['Venta'][0]['Status']." - Facturado",
              'CertificadoSAT'    =>  $noCertificadoSAT,
              'FechaSAT'          =>  $FechaTimbrado,
              'SelloSAT'          =>  $selloSAT,
              'SelloCFD'          =>  $selloCFD,
              'RFC_PAC'           =>  $RFCPAC,
              'FormaPago'         =>  $data['Formulario']['Pago'],
              'MetodoPago'        =>  $data['Formulario']['Metodo'],
              'UsoCFDI'           =>  $data['Formulario']['UsoCFDi'],
              'Comprobante'       =>  'I',
              'Observaciones'     =>  $data['Formulario']['Observa'], 
              'Moneda'            =>  'MXN',
              'Sello'             =>  $Sello[0],
              'Certificado'       =>  $Certificado[0],
              'IDUsuario'         =>  $_SESSION['Avyna'][0]['ID'],
              'RFC_Cliente'       =>  $rfc_cliente
            );             
              
            // Almacenamos la factura a la base de datos //
            $AddFact        = $this->facturacion->saveFactura($data['Factura'],$data,$UUID);
            return $AddFact;
          }
          else{
            return 2;
          }
        }
        else{
          return 3;
        }
      }
      catch(Exception $er){
        print_r($er);
        return 5;
      }
    }
    else{
      return 4;
    }
  }

  // Validate Saldos ventas antes de facturar //
  public function validateSaldosFactura($info){
    $fecha = date("Y-m-d H:i:s");
    $precioSI = 0;
    $importeSI = 0;
    $subtotalSI = 0;
    $descuentoCD = 0;
    $totalDesc = 0;
    $importeBase = 0;
    $descuentoCC = 0;
    $importeBaseCC = 0;
    $importeCI = 0;
    $totalCI = 0;
    $totalTimbrado = 0;
    $descAdicional = 0;
    $adicionalDescPorcentaje = 0;
    
    /*if ($info['Venta'][0]['idCliente'] == 1967 && floatval($info['TotalVenta'][0]['Total']) <= 1000) {
      if ($info['Venta'][0]['Gastos_Admin'] == "50.00") {
        $totalVenta        = floatval($info['Venta'][0]['Total']) - 150.00;
      }
      else{
        $totalVenta        = floatval($info['Venta'][0]['Total']) - 100;
      }
    }else{
      // Obtener el Descuento //
      if ($info['Venta'][0]['Gastos_Admin'] == "50.00") {
        $totalVenta        = floatval($info['Venta'][0]['Total']) - 50.00;
      }
      else{
        $totalVenta        = $info['Venta'][0]['Total'];
      }
    }*/

    $totalVenta = $info['TotalVenta'][0]['Total'];
    
    if (intval($info['Venta'][0]['descuento_adicional']) != 0) {
      $descAdicional           = number_format(floatval($info['Venta'][0]['descuento_adicional']), 3, '.', '');
      $adicionalDescPorcentaje = number_format(floatval($descAdicional / 100), 3, '.', '');
    }
  
    /*Obtener el Descuento*/
    $descVenta         = floatval($info['Venta'][0]['Descuento']);
    $totalDescVenta    = floatval($totalVenta);
    $descDistriduidor  = number_format(($descVenta / $totalDescVenta), 3, '.', '');

    // Configuración del IVA //
    $IVA    = 1 + $info['Monedas'][0]['Impuesto_%'] / 100;
    $IVA_2  = $info['Monedas'][0]['Impuesto_%'] / 100;

    $listProducts = count($info['Datos_Venta']);

    for ($i=0; $i<$listProducts; $i++){
      // Precio sin IVA //
      $precioSI             = number_format($info['Datos_Venta'][$i]['Precio_unitario'] / $IVA, 2, '.', '');
      // Importe sin IVA //
      $importeSI            = $info['Datos_Venta'][$i]['Cantidad'] * $precioSI;
      // subtotal sin IVA //
      $subtotalSI           += $importeSI;
      // Descuento Distribuidor //
      $descuentoCD          = number_format($importeSI * ($descDistriduidor + $adicionalDescPorcentaje), 2, '.', '');
      // Total Descuento Distribuidor //
      $totalDesc            += $descuentoCD;
      // Importe - descuento distribuidor //
      $importeBase          = $importeSI - $descuentoCD;
      // IVA //
      $importeCI            = number_format($importeBase * $IVA_2, 2, '.', '');
      // Total IVA //
      $totalCI              += $importeCI;   
    }

    if ($info['Venta'][0]['Gastos_Admin'] == "50.00") {
      $gastosAdmin = number_format($info['Venta'][0]['Gastos_Admin'] / $IVA, 2, '.', '');
      $subtotalSI   = $subtotalSI + $gastosAdmin;
      $totalCI      = $totalCI + number_format($gastosAdmin * $IVA_2, 2, '.', ''); 
    }
    
    $totalFactura   = ($subtotalSI - $totalDesc) + $totalCI;

    $totalTimbrado  = abs(round($totalFactura) - round(floatval($info['Venta'][0]['Total'])));
    $validateABS = round($totalTimbrado);

    if ($validateABS <= 5){
      return 1;
    }
      return 0;
  }

    // Validación Existencias Por Producto //
    public function validateExistenciasProductos()
    {
        $data = $this->input->post();

        $idSucursal = $data['idSucursal'];
        $idCatalogo = $data['idCatalogo'];
        $Cantidad   = $data['Cantidad'];
        $Contador   = 0;
        $pila = array();

        $info = $this->ventas->validateExistenciasProductos($idSucursal,$idCatalogo);

        if (count($info) > 0){
            if ($info[0]['Existencias_disponibles'] > $Cantidad){
                $Contador  = 1;
            }
            else{
                array_push($pila, '['. $info[0]['idCatalogo'] . ']       ' . $info[0]['Producto']);
                $Contador  = 0;
            }
        }
        else{
           array_push($pila, 'Producto Inexistente'); 
           $Contador  = 0;
        }

        if ($Contador == 1){
            print_r(1);
        }
        else{
            print_r(json_encode($pila));
        }
    }

    // Validar Existencias Promociones //
    public function validateExistenciasPromo()
    {
        $data = $this->input->post();
        $idSucursal = $data['idSucursal'];
        $idPromocion = $data['idPromocion'];
        $Cantidad   = 1;
        $Contador   = 0;
        $pila = array();

        $info = $this->ventas->validateExistenciasPromo($idSucursal,$idPromocion);

        if (count($info) > 0){
            for ($i=0; $i < count($info); $i++) { 
                if (intval($info[$i]['Exist']) > 0){
                    $Contador  = 1;
                }
                else{
                    array_push($pila, '['. $info[$i]['idCatalogo'] . ']       ' . $info[$i]['Producto']);
                    $Contador  = 0;
                    break;
                }
            }
        }
        else{
           array_push($pila, 'Producto Inexistente'); 
           $Contador  = 0;
        }

        if ($Contador == 1){
            print_r(1);
        }
        else{
            print_r(json_encode($pila));
        }
    }

    // Obtener Sublinea By idLinea //
    public function getSublineaByidLinea()
    {
        $data = $this->input->post();
        $info = $this->sublinea->getSublineaByidLinea($data['idLinea']);
        print_r(json_encode($info));
    }

    // Obtener Informacion Modal Promocion //
    public function getInformacion()
    {
        $data = $this->input->post();
        $info['Promo'] = $this->ventas->getPromocion($data['id'],$data['sucursal']);
        $info['Oferta']= $this->ventas->getOfertas($data['id'],$data['sucursal']);
        print_r(json_encode($info));
    }

    // Obtener Detalle Oferta //
    public function getDetalleOferta()
    {
        $data = $this->input->post();
        $info = $this->ventas->getDetalleOferta($data['IDCliente'],$data['ID']);
        print_r(json_encode($info));
    }

    // Obtener Detalle Promocion //
    public function getInfoPromo()
    {
        $data = $this->input->post();
        $info = $this->ventas->getInfoPromo($data['ID']);
        print_r(json_encode($info));
    }

    // Obtener Información Oferta //
    public function getInfoOferta()
    {
        $data = $this->input->post();
        $info['Detalle'] = $this->ventas->getInfoOferta($data['IDCliente'],$data['ID']);
        print_r(json_encode($info));
    }

    // Validar Existencias Productos //
    public function addVentasMenudeo()
    {
        $data = $this->input->post();

        $info = $this->validateProductosVenta($data);

        if ($info == 1){
            $result = $this->ventas->addVentaMenudeo($data);
            if ($result != 0){
                print_r($result);
                exit();
            }
            else{
                print_r('Error');
                exit();
            }
        }
        else{
            print_r($info);
            exit();
        }
    }

    public function Valida_Existencias(){
      $data = $this->input->post();
      $pila = array();
      $Contador   = 0;
      $validate = 0;

      if (isset($data['idCatalogo'])){
          $idSucursal = $data['idSucursal'];
          $idCatalogo = explode(",",$data['idCatalogo']);
          $Cantidad   = explode(",",$data['Cantidad']);

          $info = $this->ventas->Validate_Exist($data['idSucursal'],$idCatalogo);

          if (count($idCatalogo) == count($info)) {
              for ($x=0; $x < count($idCatalogo); $x++) { 
                  for ($i=0; $i < count($info); $i++) { 
                      if ($idCatalogo[$x] == $info[$i]['idCatalogo']) {
                          if ($info[$i]['Existencias_disponibles'] > $Cantidad[$x]){
                              $Contador ++;
                          }
                          else{
                              array_push($pila, 'El producto  '. $info[$i]['Producto'] . ' no cuenta con suficientes existencias ');
                          }
                      }
                  }
              }
          }else{
              if (count($info) > 0) {
                  for ($x=0; $x < count($idCatalogo); $x++) { 
                      $cont = 1;
                      for ($i=0; $i < count($info); $i++) { 
                          if ($idCatalogo[$x] == $info[$i]['idCatalogo']) {
                              break;
                          }
                          else{
                              if (intval($cont) == count($info)) {
                                  array_push($pila, 'El producto  '. $idCatalogo[$x] . ' no cuenta con suficientes existencias ');
                              }
                              $cont++;
                          }
                      }
                  }
              }
              else{
                  for ($x=0; $x < count($idCatalogo); $x++) { 
                      array_push($pila, 'El producto  '. $idCatalogo[$x] . ' no cuenta con suficientes existencias ');
                  }
              }
          }

          if ($Contador == count($idCatalogo)){
              $response = $this->ventas->Add_Venta_Menudeo($data);    
              if ($response != 0){
                  print_r($response);
              }
              else{
                  print_r('Error al agregar Venta Menudeo');
              }
          }
          else{
              print_r(json_encode($pila));
          }
      }
      else{
          $response = $this->ventas->Add_Venta_Menudeo($data);    
          if ($response != 0){
              print_r($response);
          }
          else{
              print_r('Error al agregar Venta Menudeo');
          }
      }
  }



  public function Valida_Existencias_Editar(){

    $data = $this->input->post();
    $pila = array();
    $Contador   = 0;
    $validate = 0;

    if (isset($data['idCatalogo'])){
        $idSucursal = $data['idSucursal'];
        $idCatalogo = explode(",",$data['idCatalogo']);
        $Cantidad   = explode(",",$data['Cantidad']);

        $info = $this->ventas->Validate_Exist($data['idSucursal'],$idCatalogo);

        if (count($idCatalogo) == count($info)) {
            for ($x=0; $x < count($idCatalogo); $x++) { 
                for ($i=0; $i < count($info); $i++) { 
                    if ($idCatalogo[$x] == $info[$i]['idCatalogo']) {
                        if ($info[$i]['Existencias_disponibles'] > $Cantidad[$x]){
                            $Contador ++;
                        }
                        else{
                            array_push($pila, 'El producto  '. $info[$i]['Producto'] . ' no cuenta con suficientes existencias ');
                        }
                    }
                }
            }
        }else{
            if (count($info) > 0) {
                for ($x=0; $x < count($idCatalogo); $x++) { 
                    $cont = 1;
                    for ($i=0; $i < count($info); $i++) { 
                        if ($idCatalogo[$x] == $info[$i]['idCatalogo']) {
                            break;
                        }
                        else{
                            if (intval($cont) == count($info)) {
                                array_push($pila, 'El producto  '. $idCatalogo[$x] . ' no cuenta con suficientes existencias ');
                            }
                            $cont++;
                        }
                    }
                }
            }
            else{
                for ($x=0; $x < count($idCatalogo); $x++) { 
                    array_push($pila, 'El producto  '. $idCatalogo[$x] . ' no cuenta con suficientes existencias ');
                }
            }
        }

        if ($Contador == count($idCatalogo)){
            $response = $this->ventas->Add_Venta_Menudeo_Editar($data);    
            if ($response != 0){
                print_r($response);
            }
            else{
                print_r('Error al agregar Venta Menudeo');
            }
        }
        else{
            print_r(json_encode($pila));
        }
    }
    else{
        $response = $this->ventas->Add_Venta_Menudeo_Editar($data);    
        if ($response != 0){
            print_r($response);
        }
        else{
            print_r('Error al agregar Venta Menudeo');
        }
    }
}
    // Validar Existencias Productos //
    public function updateVentasMenudeo()
    {
        $data = $this->input->post();
        $info = $this->validateProductosVenta($data);

        if ($info == 1){
            $result = $this->ventas->updateVentasMenudeo($data);
            if ($result != 0){
                print_r($result);
                exit();
            }
            else{
                print_r('Error');
                exit();
            }
        }
        else{
            print_r($info);
            exit();
        }
    }

    

    // Validar Productos Venta //
    public function validateProductosVenta($data)
    {
        if (isset($data['idCatalogo']))
        {
            $idSucursal = $data['idSucursal'];
            $idCatalogo = explode(",",$data['idCatalogo']);
            $Cantidad   = explode(",",$data['Cantidad']);
            $Contador   = 0;
            $Contador2  = 0;
            $pila = array();

            for ($i=0; $i < count($idCatalogo); $i++){ 
                $info = $this->ventas->validateExistencias($data['idSucursal'],$idCatalogo[$i]);

                if (count($info) > 0){
                    if ($info[0]['Existencias_disponibles'] > $Cantidad[$i]){
                        $Contador ++;
                    }
                    else{
                        array_push($pila, '['. $info[0]['idCatalogo'] . ']       ' . $info[0]['Producto']);
                    }
                }
                else{
                   array_push($pila, '[Producto Inexistente]'); 
                }
            }
        
            if ($Contador == count($idCatalogo)){
                return 1;
            }
            else{
                return json_encode($pila);
            }
        }
        else{
            return 1;
        }
    }

    // Obtener Informacion Detalle Venta Directa //
    public function getInfoDetalleVentaDirecta()
    {
        $data = $this->input->post();
        $info = $this->ventas->getInfoDetalleVentaDirecta($data['idVenta']);
        print_r(json_encode($info));
    }

    function satxmlsv33_xml_fech($fech) 
    {
        $ano = substr($fech,0,4);
        $mes = substr($fech,5,2);
        $dia = substr($fech,8,2);
        $hor = substr($fech,11,2);
        $min = substr($fech,14,2);
        $seg = substr($fech,17,2);
        $aux = $ano."-".$mes."-".$dia." ".$hor.":".$min.":".$seg;
        if ($aux == "--T::")
            $aux = "";
        return ($aux);
    }

	// Cerrar Sesión //
	public function cerrarSesion(){
	    session_destroy();
	    redirect('Controller_Login');
    }
    
    public function Add_Pago(){
      $data = $this->input->post();

      $ID = $data['ID'];
      $Sucursal = $data['Sucursal'];
      $Cantidad = $data['Cantidad'];
      $Banco    = $data['Banco'];

      $Validate = $this->ventas->Validate_Venta($ID);

      if (count($Validate) == 0){
        try{

          // Imagen base64 enviada desde javascript en el formulario
          // En este caso, con PHP plano podriamos obtenerla usando :
          // $baseFromJavascript = $_POST['base64'];
          $baseFromJavascript = $data['Base64'];

          // Nuestro base64 contiene un esquema Data URI (data:image/png;base64,)
          // que necesitamos remover para poder guardar nuestra imagen
          // Usa explode para dividir la cadena de texto en la , (coma)
          $base_to_php = explode(',', $baseFromJavascript);
          // El segundo item del array base_to_php contiene la información que necesitamos (base64 plano)
          // y usar base64_decode para obtener la información binaria de la imagen
          $data = base64_decode($base_to_php[1]);// BBBFBfj42Pj4....

          // Proporciona una locación a la nueva imagen (con el nombre y formato especifico)
          //$filepath = "http://prosalon4810.cloudapp.net/prosalon_ftp/Pagos_distribuidores/PagoDistribuidor-".$ID.".jpg"; // or image.jpg

          $filepath = $_SERVER['DOCUMENT_ROOT'] . "/prosalon_ftp/Pagos_distribuidores/PagoDistribuidor-".$ID."-".date('Y-m-d').".jpg";

          //$filepath = "C:\Users\PC_Master_Race\Pictures\Saved Pictures\PagoDistribuidor-".$ID.".jpg";

          // Finalmente guarda la imágen en el directorio especificado y con la informacion dada
          file_put_contents($filepath, $data);

        }catch(Exception $e){

          $info = 'Excepción capturada: '.  $e->getMessage(). "\n";

        }

        $filepath2 = "http://prosalon4810.cloudapp.net:500/prosalon_ftp/Pagos_distribuidores/PagoDistribuidor-".$ID."-".date('Y-m-d').".jpg";

        //$filepath2 = "C:\Users\PC_Master_Race\Pictures\Saved Pictures\PagoDistribuidor-".$ID.".jpg";

          $exists = file_exists($filepath);

          if ($exists == true){

              $Pagos = array('idVenta' => $ID,
                          'Fecha' => date("Y-m-d H:i:s"), 
                          'Monto' => $Cantidad,
                          'Forma_pago' => 'Deposito',
                          'Observaciones' => 'Banco: '.$Banco.' Sucursal: '.$Sucursal,
                          'URL_Imagen' => $filepath2,
                          'Status' => 'Pendiente');
              
              
              $Venta = $this->ventas->getVentasByIdVenta($ID);
              $info = $this->ventas->Add_Pago($Pagos,0.00);         
          }
          else
          {
            $info = 2;
          }
      }
      else
      {
        $info = 3;
      }

      print_r($info);
    }
}