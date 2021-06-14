<?php defined('BASEPATH') OR exit('No direct script access allowed');

date_default_timezone_set('America/Mexico_City');

ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

// Includes //
include('./Clases/CrearXML.php');
include('./ecodexphp/includes.php');
include('./Clases/LeerCFDI.php');
//include('./Clases/RecuperarAcuses.php');

class Controller_Factura extends CI_Controller 
{
    public function __construct() 
    {
      parent::__construct();
      if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

	    $this->load->model('Empresa_Model', 'configure');
      $this->load->model('Distribuidores_Model', 'distribuidor');
      $this->load->model('Login_Model', 'login');
      $this->load->model('Facturacion_Model', 'Facturacion');
      $this->load->model('Moneda_Model', 'moneda');
      $this->load->model('Ventas_Model', 'ventas');
      $this->load->model("Extracciones_Model","extracciones");
      $this->load->model('Fetch_Model', 'fetch');
    }

	public function index()
	{
    $Titulo = array('PageTitle' => 'Facturación');

    $Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      'pass' =>  $_SESSION['Avyna'][0]['Password']);

    // Refrescar Permisos e información del usuario //
    $Session = $this->login->signIn($Usuario);

    if ($Session != null){  
      // Cargar Vista Inventario //
      $this->load->view('Componentes/Header', $Titulo); 
      $this->load->view('Manejo/Facturacion/Factura');
      $this->load->view('Componentes/Footer');
    }
    else{
      // Cerrar Sesión //
      $this->cerrarSesion($Usuario);
    }	
  }
  
  // Función Crear CSV Inventario General //
  public function csvFactura()
  {
    $data = $this->input->post();
    $info = $this->Facturacion->csvFactura($data);

    // output headers so that the file is downloaded rather than displayed
    header('Content-type: text/csv');
    header('Content-Disposition: attachment; filename="ReporteFactura Timbradas.csv"');
    header('Pragma: no-cache');
    header('Expires: 0');

    // create a file pointer connected to the output stream
    $file = fopen('php://output', 'w+');
    // send the column headers
    
    fputcsv($file, array('IDVenta', 'Fecha_Timbrado', 'Distribuidor', 'RFC', 'ID', 'Folio', 'SubtotalInvoice', 'ImpuestoInvoice','TotalInvoice', 'Status', 'UUID', 'IDIntegrador','Tipo_Factura'));

    for ($i=0; $i < count($info); $i++){ 
      fputcsv($file, $info[$i]);
    }
  }

  // DataTable fetchVentas //
  public function fetchVentas()
  {
    $data = $this->input->post();
    $info = $this->fetch->fetchVentas($data);
    print_r($info);
  }

  // DataTable fetchFacturasCanceladas //
  public function fetchFacturasCanceladas()
  {
    $data = $this->input->post();
    $info = $this->fetch->fetchFacturasCanceladas($data);
    print_r($info);
  }

  // DataTable fetchFacturas //
  public function fetchFacturas()
  {
    $data = $this->input->post();
    $info = $this->fetch->fetchFacturas($data);
    print_r($info);
  }

  // Accion Cancelar Factura //
  public function cancelFactura()
  {
    $data = $this->input->post();
    $factura = $this->Facturacion->getFacturaById($data['idFactura']);
    $empresa = $this->configure->getEmpresa($_SESSION['Avyna'][0]['Empresa']);

    try{

      $UUID      = $factura[0]['UUID'];
      $RFC       = $empresa[0]['RFC'];
      $idVenta   = $factura[0]['IDVenta'];
      $idFactura = $factura[0]['ID'];

      $Seguridad = new Seguridad(); //Se crea instancia de la clase Seguridad
      $trsID = rand( 1, 10000 );    //Se genera el ID
      $Token = $Seguridad->ObtenerToken( $RFC , $trsID ); //Se genera el token de servicio

      $Cancelacion = new Cancelacion(); //Se crea instancia de la clase Cancelacion
      $TransaccionID = rand( 1, 10000 );

      // Cancelación masiva //
      $arr = explode(",",$UUID);    
      $ListaCancelar["guid"] = array();
      foreach ($arr as $key => $value) {
          array_push($ListaCancelar["guid"], $value);
      }                                                                                   

      $Cancelar = $Cancelacion->CancelaMultiple($RFC, $Token, $TransaccionID, $ListaCancelar);

      if ($Cancelar['Estatus'] != 'No Cancelable' && $Cancelar['Estatus'] != 'Solicitud rechazada'){

        $info = $this->Facturacion->updateCancelacionFactura($idFactura,$idVenta);

        print_r($info);
      }
      else{
          print_r(2);
      }
    }
    catch(FallaValidacion $er){
        print_r($er->__toString());
    }
  }

  // Obtener Correo del Distribuidor Para mandar Correo  By idFactura//
  public function getCorreoDistribuidor()
  {
    $data = $this->input->post();
    $info = $this->Facturacion->getCorreoDistribuidor($data['idVenta']);
    print_r(json_encode($info));        
  }

  // Mandar Correo al Distribuidor //
  public function sendMail()
  {
      $data = $this->input->post();
      $str  = str_replace(",", ";", $data['Para']);

      $to       = $str;
      $subject  = 'Envio del CFDI con el Folio '.$data['idVenta'];
      $message  = '
      <html>
      <head>
      <title>HTML</title>
      </head>
      <body>
      <a href="'.$data['XML'].'" target="_blank">Descargar XML</a>.
      <a href="'.$data['PDF'].'" target="_blank">Descargar PDF</a>.
      </body>
      </html>';
      $headers  = 'From: facturacion@avyna.info' . "\r\n" .
                  'MIME-Version: 1.0' . "\r\n" .
                  'Content-type: text/html; charset=utf-8';

      (mail($to, $subject, $message, $headers)) ? print_r(1) : print_r(0);
  }


  /// Obtener Acuse de Cancelación SAT ///
  public function getAcuseSAT()
  {
    $data = $this->input->post();
    $factura = $this->Facturacion->getFacturaById($data['idFactura']);
    $empresa = $this->configure->getEmpresa($_SESSION['Avyna'][0]['Empresa']);

    $UUID       = $factura[0]['UUID'];
    $Integrador = $factura[0]['IDIntegrador'];
    $RFC        = $empresa[0]['RFC'];
    $idVenta    = $factura[0]['IDVenta'];
    $idFactura  = $factura[0]['ID'];
                                
    $Seguridad = new Seguridad();
    $trsID = rand(1, 10000);
    $Token = $Seguridad->ObtenerToken($RFC, $trsID);

    $Cancelacion = new Cancelacion();
    $trsID = rand(1, 10000);
    $Acuse = $Cancelacion->RecuperarAcuses($RFC, $Token, $trsID, $UUID);

    if (empty($Acuse) == false && isset($Acuse)){ 

      $dir  = $_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/XMLs/Acuse_Recuperado/';
      $file = 'Acuse_'.$RFC.'_'.$UUID.'_'.$idFactura.'.xml'; //Nombre del XML timbrado
      $fi   = fopen($dir.$file,'w+'); //Se crea el archivo xml en la ruta especifica
      fwrite($fi, $Acuse['AcuseXML']); //Mandamos el archivo XML proporcionado por el PAC    
      fclose($fi);

      print_r(1);
    }
    else{
      print_r(0);
    }
  }

  // Get Facturas Canceladas del Distribuidor //
  public function getFacturasRelacion()
  {
    $data = $this->input->post();
    $info = $this->Facturacion->getFacturasRelacion($data['idCliente']);
    print_r(json_encode($info));
  }

  // Acción Facturar //
  public function facturarCFDi()
  {
    $data = $this->input->post();

    $Validate       = $this->ventas->getVentaById($data['idVenta']);

    if (floatval($Validate[0]['Adeudo']) > 0) {
      print_r(9999);
    }else{
      $datos['Invoice']     = $this->Facturacion->getInfoFacturaById($data['idVenta']);
      $datos['Venta']       = $this->ventas->getVentaById($data['idVenta']);
      $datos['Monedas']     = $this->moneda->getMonedaById($data['Moneda']);
      $datos['Datos_Venta'] = $this->ventas->queryFacturacion($data['idVenta']);
      $datos['Empresa']     = $this->configure->getEmpresa($_SESSION['Avyna'][0]['Empresa']);
      $datos['Formulario']  = $data;
      // $datos['Cliente']     = $this->ventas->queryCliente($datos['Venta'][0]['idCliente']);
      $info                 = $this->crearXMLV33($datos);


      print_r($info);
    }    
  }

  // Acción Crear XML V.33 //
  function crearXMLV33($data){ 
    $XML = new CrearXML();

    $rfc         = $data['Empresa'][0]['RFC'];
    $rfc_cliente = $data['Formulario']['RFC'];
    $hoy         = date("_Ymd");
    $Folio       = $data['Venta'][0]['ID'];
    $data['TotalVenta'] = $this->extracciones->getTotalVentasWeb($data['Venta'][0]['ID']);

    $validate = $this->validateSaldosFactura($data);

    if ($validate == 1){

      $archivoXML = $XML->satxmlsv33($data, '', '', '', '');

      // print_r($archivoXML);
      // exit();
      
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
              'Serie'             =>  '',
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
              'FormaPago'         =>  $data['Formulario']['ForPago'],
              'MetodoPago'        =>  $data['Formulario']['MetPago'],
              'UsoCFDI'           =>  $data['Formulario']['UsoCFDi'],
              'Comprobante'       =>  $data['Formulario']['Compro'],
              'Observaciones'     =>  $data['Formulario']['Observa'],
              'Moneda'            =>  $data['Formulario']['Moneda'],
              'Sello'             =>  $Sello[0],
              'Certificado'       =>  $Certificado[0],
              'IDUsuario'         =>  $_SESSION['Avyna'][0]['ID'],
              'RFC_Cliente'       =>  $rfc_cliente
            );             
              
            // Almacenamos la factura a la base de datos //
            $AddFact        = $this->Facturacion->saveFactura($data['Factura'],$data,$UUID);
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
    $subtotalSI_Testing = 0;
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
    $gastosAdmin = 0;
    $gastosEnvio = 0;
    
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
      $descAdicional           = number_format(floatval($info['Venta'][0]['descuento_adicional']), 8, '.', '');
      $adicionalDescPorcentaje = number_format(floatval($descAdicional / 100), 8, '.', '');
    }
    /*Obtener el Descuento*/
    $descVenta         = floatval($info['Venta'][0]['Descuento']);
    $descDistriduidor  = number_format(($descVenta / $totalVenta), 4, '.', '');
    // $descDistriduidor  = number_format(($info['Cliente'][0]['Descuento_%'] / 100), 3, '.', '');

    // Configuración del IVA //
    $IVA    = 1 + $info['Monedas'][0]['Impuesto_%'] / 100;
    $IVA_2  = $info['Monedas'][0]['Impuesto_%'] / 100;


    if (($descDistriduidor + $adicionalDescPorcentaje) < 1) {
      
      $listProducts = count($info['Datos_Venta']);

      for ($i=0; $i<$listProducts; $i++){
        // Precio sin IVA //
        $precioSI             = number_format($info['Datos_Venta'][$i]['Precio_unitario'] / $IVA, 6, '.', '');
        // Importe sin IVA //
        $importeSI            = $info['Datos_Venta'][$i]['Cantidad'] * $precioSI;

        $subtotalSI_Testing   = $subtotalSI_Testing + $info['Datos_Venta'][$i]['Cantidad'] * $precioSI;
        // subtotal sin IVA //
        $subtotalSI           += $importeSI;
        // Descuento Distribuidor //
        $descuentoCD          = number_format($importeSI * ($descDistriduidor + $adicionalDescPorcentaje), 6, '.', '');
        // Total Descuento Distribuidor //
        $totalDesc            += $descuentoCD;
        // Importe - descuento distribuidor //
        $importeBase          = $importeSI - $descuentoCD;
        // IVA //
        $importeCI            = number_format($importeBase * $IVA_2, 6, '.', '');
        // Total IVA //
        $totalCI              += $importeCI;   
      }
    }

    if ($info['Venta'][0]['idCliente'] != 1967 && $info['Venta'][0]['Ventas_Directas'] == 1) {
      $gastosEnvio = number_format(100 / $IVA, 2, '.', '');
      $subtotalSI   = $subtotalSI + $gastosEnvio;
      $totalCI      = $totalCI + number_format($gastosEnvio * $IVA_2, 2, '.', '');
    }
    
    // if ($info['Venta'][0]['Gastos_Admin']) {
    //   $gastosAdmin = floatval(number_format($info['Venta'][0]['Gastos_Admin'], 2, '.', ''));
    //   $gastosAdminSI = floatval($gastosAdmin / $IVA);
    //   $subtotalSI   = $subtotalSI + $gastosAdminSI;
    //   $totalCI      = $totalCI + floatval($gastosAdminSI * $IVA_2);
    // }

    if ($info['Venta'][0]['Gastos_Admin'] == "50.00") {
      $gastosAdmin = number_format($info['Venta'][0]['Gastos_Admin'] / $IVA, 2, '.', '');
      $subtotalSI   = $subtotalSI + $gastosAdmin;
      $totalCI      = $totalCI + number_format($gastosAdmin * $IVA_2, 2, '.', ''); 
    }

    // $totalFactura   = ($subtotalSI - $totalDesc) + $totalCI;

    $totalFactura   = ($subtotalSI - $totalDesc) + $totalCI;

    if ($info['Venta'][0]['idCliente'] == 1967 && floatval($info['TotalVenta'][0]['Total']) <= 1000) {
      $totalTimbrado  = abs(round( $totalFactura, 2, PHP_ROUND_HALF_UP) - round(floatval($info['Venta'][0]['Total']) - 100));
    }else{
      $totalTimbrado  = abs(round( $totalFactura, 2, PHP_ROUND_HALF_UP) - round(floatval($info['Venta'][0]['Total'])));
    }

    // if ($info['Venta'][0]['idCliente'] == 1967 && floatval($info['TotalVenta'][0]['Total']) <= 1000) {
    //   $totalTimbrado  = abs(round( $totalFactura, 2, PHP_ROUND_HALF_UP) - round(floatval($info['Venta'][0]['Total']) - 100));
    // }else{
    //   $totalTimbrado  = abs(round( $totalFactura, 2, PHP_ROUND_HALF_UP) - round(floatval($info['Venta'][0]['Total'])));
    // }
    // $totalTimbrado  = abs(round($totalFactura) - round(floatval($info['Venta'][0]['Total'])));
    $validateABS = round($totalTimbrado);

    

    // print_r('Gastos Admin : '. $gastosAdmin);
    // print_r("\n");
    // print_r('IVA: '. $IVA);
    // print_r("\n");
    // print_r('Sub: '. $subtotalSI_Testing);
    // print_r("\n");
    // print_r("\n");
    // print_r("\n");
    // print_r("\n");
    // print_r("\n");
    // print_r('Subtotal SI: '. $subtotalSI);
    // print_r("\n");
    // print_r('Total IVA: '. $totalCI);
    // print_r("\n");
    // print_r("Total Descuento: " . $totalDesc);
    // print_r("\n");
    // print_r("\n");
    // print_r("info: ". intval($validateABS) <= 5);
    // print_r("\n");
    // print_r("\n");
    // print_r("Descuento %: " . ($descDistriduidor + $adicionalDescPorcentaje));
    // print_r("\n");
    // print_r("Total Descuento: " . $totalDesc);
    // print_r("\n");
    // print_r("Total Calculado: " . $totalFactura);
    // print_r("\n");
    // print_r("Total Venta: " . $info['Venta'][0]['Total']);
    // print_r("\n");
    // print_r("Diferencia: " . $totalTimbrado);
    // print_r("\n");
    // print_r("Diferencia sin decimales: " . $validateABS);
    // print_r("\n");
    // print_r("Desc Adicional: " . $adicionalDescPorcentaje);
    // print_r("\n");
    // print_r("Desc Distr: " . $descDistriduidor);
    // print_r("\n");
    // print_r($info['TotalVenta'][0]['Total']);
    // print_r("\n");
    // exit();

    if (intval($validateABS) <= 5){
      return 1;
    }
      return 0;
  }






































  // Cerrar Sesión //
  public function cerrarSesion(){
    session_destroy();
    redirect('Controller_Login');
  }

    public function getVentasMenudeoInvoice(){

        $check = true;
        $id = null;
        $delimiter = array();

        try
        {
            $data = $this->input->post();
            $id = $data['txt_modal_IdVenta'];

                $datos['Invoice']       = $this->Facturacion->getAllInvoicesbyId($id);
                $datos['Venta']         = $this->Facturacion->getVentasById($id);
                $datos['Monedas']       = $this->Moneda->getMonedaById($data['txt_Moneda']);
                $datos['Datos_Venta']   = $this->Facturacion->GetAllDataVenta($id);
                

                $Empresa                = $this->configure->DatosEmpresa($_SESSION['Avyna'][0]['Empresa']);

                foreach ($Empresa as $value) {
                    
                    $datos['Empresa'] = array(

                        "ID"                            =>  $value['ID'],
                        "Razon_Social"                  =>  $value['Razon_Social'],
                        "RFC"                           =>  $value['RFC'],
                        "Clave_Regimen_Fiscal"          =>  $value['Clave_Regimen_Fiscal'],
                        "Regimen_Fiscal"                =>  $value['Descripcion_Regimen_Fiscal'],
                        "Pass_CSD"                      =>  $value['Pass_CSD'],
                        "CSD_cer"                       =>  $value['CSD_cer'],
                        "CSD_key"                       =>  $value['CSD_key'],
                        "noCertificado"                 =>  $value['noCertificado'],
                        "Direccion"                     =>  $value['Direccion'],
                        "Colonia"                       =>  $value['Colonia'],
                        "Pais"                          =>  $value['Pais'],
                        "Estado"                        =>  $value['Estado'],
                        "Municipio"                     =>  $value['Municipio'],
                        "CP"                            =>  $value['CP'],
                        "Telefono1"                     =>  $value['Telefono1'],
                        "Telefono2"                     =>  $value['Telefono2'],
                        "Email"                         =>  $value['Email'],
                        "Vigencia_Desde"                =>  $value['Vigencia_Desde'],
                        "Vigencia_Hasta"                =>  $value['Vigencia_Hasta']

                    );
                }


                if ($data['txt_factura_rfc'] == 'XAXX010101000') 
                {
                    $datos['Formulario'] = array(

                        "ID_Cliente"                    =>  $data['txt_id_cliente_sale'],
                        "Serie"                         =>  $data['txt_factura_serie'],
                        "Folio"                         =>  $data['txt_factura_folio'],
                        "Razon_Social"                  =>  $data['txt_factura_Razon_Social'],
                        "RFC"                           =>  $data['txt_factura_rfc'],
                        "IDVenta"                       =>  $data['txt_modal_IdVenta'],
                        "Observaciones"                 =>  $data['txt_area'],
                        "Comprobante"                   =>  $data['txt_Comprobante'],
                        "Moneda"                        =>  $data['txt_Moneda'],
                        "Condicionpago"                 =>  $data['txt_Condicion_Pago'],
                        "Direccion"                     =>  $data['txt_factura_direccion'],
                        "Colonia"                       =>  $data['txt_factura_colonia'],
                        "Pais"                          =>  $data['txt_factura_pais'],
                        "Estado"                        =>  $data['txt_factura_estado'],
                        "Municipio"                     =>  $data['txt_factura_municipio'],
                        "CP"                            =>  $data['txt_factura_cp'],
                        "FormaPago"                     =>  $data['txt_Forma_Pago'],
                        "MetodoPago"                    =>  "PUE",
                        "UsoCFDi"                       =>  "P01",
                        "Ciudad"                        =>  $data['txt_factura_ciudad']

                    );

                    $datos['Tipo_Factura_Venta'] = 1;

                }
                else
                {

                    $datos['Formulario'] = array(

                        "ID_Cliente"                    =>  $data['txt_id_cliente_sale'],
                        "Serie"                         =>  $data['txt_factura_serie'],
                        "Folio"                         =>  $data['txt_factura_folio'],
                        "Razon_Social"                  =>  $data['txt_factura_Razon_Social'],
                        "RFC"                           =>  $data['txt_factura_rfc'],
                        "IDVenta"                       =>  $data['txt_modal_IdVenta'],
                        "Observaciones"                 =>  $data['txt_area'],
                        "Comprobante"                   =>  $data['txt_Comprobante'],
                        "Moneda"                        =>  $data['txt_Moneda'],
                        "Condicionpago"                 =>  $data['txt_Condicion_Pago'],
                        "Direccion"                     =>  $data['txt_factura_direccion'],
                        "Colonia"                       =>  $data['txt_factura_colonia'],
                        "Pais"                          =>  $data['txt_factura_pais'],
                        "Estado"                        =>  $data['txt_factura_estado'],
                        "Municipio"                     =>  $data['txt_factura_municipio'],
                        "CP"                            =>  $data['txt_factura_cp'],
                        "FormaPago"                     =>  $data['txt_Forma_Pago'],
                        "MetodoPago"                    =>  $data['txt_Metodo_Pago'],
                        "UsoCFDi"                       =>  $data['txt_Uso_cfdi'],
                        "Ciudad"                        =>  $data['txt_factura_ciudad']

                    );

                    $datos['Tipo_Factura_Venta'] = 0;
                }

                    $datos['Relacionado'] = array();

                    for ($i = 0; $i <= count($data['Relacion'])-1; $i++) 
                    { 
                        
                            array_push($datos['Relacionado'],$data['Relacion'][$i]);
                    }

                    $datos['Tipo_Relacion'] = array(

                        "Tipo_Relacion"     =>  $data['txt_TipoRelacion']

                    );

                $info = $this->crearXMLFactura($datos);                                         //Mandamos los datos obtenidos al metodo de crear XML ya sellado y timbrado

                /*if ($info === "Error_Totales")
                {
                    print_r("Error_Totales");
                    exit();
                }*/
        }
        catch(Exception $er)
        {
            echo $er;
        }

        print_r($info);
        exit();    
    }


    public function datosModalFactura(){

        $data['formulario'] = $this->input->post();

        return $data['formulario'];
    }

    public function Validar_Saldos($info)
    {

          $fecha = date("Y-m-d H:i:s"); 
          $Importe_Factura_Sin    = 0;
          $Importe_Factura        = 0;
          $Valor_Unitario_Factura = 0;

          $Valor_Unitario_Factura = 0;
          $Importe_Factura_Sin = 0;
          $Total_Subtotales = 0;
          $Descuento_Factura = 0;
          $Total_Descuentos = 0;
          $Base_Impuestos = 0;
          $ImporteIVA = 0;
          $TotalImporte = 0;
          $TotalImporte_Factura = 0;
          $Factura = 0;
          $Total_Timbre_Factura = 0;

          /*Obtener el Descuento*/
          $Total_Venta        = $info['Venta'][0]['Total'];
          $Descuento_Venta    = $info['Venta'][0]['Descuento'];
          $Total_Venta_Des    = $Total_Venta + $Descuento_Venta;
          $Descuento_1_sin    = $Descuento_Venta / $Total_Venta_Des;
          $Descuento_1        = number_format($Descuento_1_sin, 3, '.', '');


          //IVA
          $IVA    = 1 + $info['Monedas'][0]['Impuesto_%'] / 100;
          $IVA_2  = $info['Monedas'][0]['Impuesto_%'] / 100;

          if (empty($info['Datos_Venta'])) 
          {
            //Total Listado de Productos
            $listProducts = count($info['Invoice']);

            for ($i=0; $i<=$listProducts-1; $i++) 
            {
                $Valor_Unitario_Factura     = number_format($info['Invoice'][$i]['Precio_unitario'] / $IVA, 2, '.', '');
                $Importe_Factura_Sin        = $info['Invoice'][$i]['Cantidad_Detalle_Menudeo'] * $Valor_Unitario_Factura;
                $Total_Subtotales           += $Importe_Factura_Sin;
                $Descuento_Factura          = number_format($Importe_Factura_Sin * $Descuento_1, 2, '.', '');
                $Total_Descuentos           += $Descuento_Factura;
                $Base_Impuestos             = $Importe_Factura_Sin - $Descuento_Factura;

                $ImporteIVA = number_format($Base_Impuestos * $IVA_2, 2, '.', '');
                $TotalImporte += $ImporteIVA;
                $TotalImporte_Factura = $TotalImporte;

            }

                $Factura              = ($Total_Subtotales - $Total_Descuentos) + $TotalImporte_Factura;

                print_r("Total 2: " . ($Total_Subtotales - $Total_Descuentos));
                print_r("\n");
                print_r("Total Calc 2: " . $TotalImporte_Factura);
                print_r("\n");
                print_r("Diferencia 2: " . $Factura);
                print_r("\n");

                $Total_Timbre_Factura = abs($Factura - $info['Venta'][0]['Total']);

                $infoTest = round($Total_Timbre_Factura);

                if ($infoTest > 10)
                {
                  return "Falta_Saldo";
                }
                  return "Correcto";
          }
          else
          {
              $listProducts = count($info['Datos_Venta']);

              for ($i=0; $i<=$listProducts-1; $i++) 
              {
                  $Valor_Unitario_Factura     = number_format($info['Datos_Venta'][$i]['Precio_unitario'] / $IVA, 2, '.', '');
                  $Importe_Factura_Sin        = $info['Datos_Venta'][$i]['Cantidad'] * $Valor_Unitario_Factura;
                  $Total_Subtotales           += $Importe_Factura_Sin;
                  $Descuento_Factura          = number_format($Importe_Factura_Sin * $Descuento_1, 2, '.', '');
                  $Total_Descuentos           += $Descuento_Factura;
                  $Base_Impuestos             = $Importe_Factura_Sin - $Descuento_Factura;

                  $ImporteIVA = number_format($Base_Impuestos * $IVA_2, 2, '.', '');
                  $TotalImporte += $ImporteIVA;
                  $TotalImporte_Factura = $TotalImporte;

              }
                  $Factura              = ($Total_Subtotales - $Total_Descuentos) + $TotalImporte_Factura;

                  print_r("Subtotal: " . $Total_Subtotales);
                  print_r("\n");
                  print_r("Descuento: " .  $Total_Descuentos);
                  print_r("\n");
                  print_r("IVA: " . $TotalImporte_Factura);
                  print_r("\n");
                  print_r("Total: " . $Factura);
                  print_r("\n");
                  print_r("Descuento %:" . $Descuento_1);
                  print_r("\n");
                  print_r("Venta:" . $info['Venta'][0]['Total']);
                  print_r("\n");
                  print_r("Dif:" . ($Factura - $info['Venta'][0]['Total']));
                  print_r("\n");

                  $Total_Timbre_Factura = abs($Factura - $info['Venta'][0]['Total']);

                  $infoTest = round($Total_Timbre_Factura);

                  if ($infoTest > 10)
                  {
                    return "Falta_Saldo";
                  }
                    return "Correcto";
          }
    }
    

  function crearXMLFactura($data)
  {  
        $XML = new CrearXML();

        $rfc            = $data['Empresa']['RFC'];
        $rfc_cliente    = $data['Formulario']['RFC'];

        $arr = $data;
        $edidata = '';
        $nodo = '';
        $addenda = '';
        $dir = '';
        $hoy = date("_Ymd");
        $Folio = $data['Venta'][0]['ID'];

        $validate_Saldo = $this->Validar_Saldos($data);

        if ($validate_Saldo == 'Correcto')
        {

            $archivoXML = $XML->satxmlsv33($arr, $edidata, $dir, $nodo, $addenda);                                          //Se hace uso de la clase CrearXML ;
            
                try{

                    $Seguridad = new Seguridad();                                                                                   //Se crea instancia de la clase Seguridad
                    $trsID = rand( 1, 10000 );                                                //Se genera el ID
                    $Token = $Seguridad->ObtenerToken( $rfc, $trsID );                                                              //Se genera el token de servicio

                    $Timbra = new Timbrado();                                                                                       //Se crea instancia de la clase Timbrado
                    $trsID = rand(1, 10000);                                                                                    //Se genera el ID
                    $Token = $Seguridad->ObtenerToken( $rfc, $trsID );  

                        try{

                            $ComprobanteXML = $Timbra->TimbraXML($archivoXML, $rfc, $trsID, $Token);


                             if ($ComprobanteXML != null && $ComprobanteXML != "") {

                            $dir  =  $_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/XMLs/XML_Timbrados/';  
                            $file = $rfc.'_'.$Folio.$hoy.'.xml';                                                    //Nombre del XML timbrado
                            $fi = fopen($dir.$file,'w+');                                                                           //Se crea el archivo xml en la ruta especifica
                            fwrite($fi, $ComprobanteXML);                                                                               //Mandamos el archivo XML proporcionado por el PAC    
                            fclose($fi); 

                                $dom = new DOMDOCUMENT('1.0','utf-8');// Creamos objeto DOM

                                $dom->load($dir.$file); // Definimos la ruta de nuestro XML
                                // Recorremos el XML Tag por Tag para encontrar los elementos buscados
                                // Obtenemos el Machote(Estructura) del XML desde la web de SAT 
                                foreach ($dom->getElementsByTagNameNS('http://www.sat.gob.mx/TimbreFiscalDigital', '*') as $elemento) 
                                {
         
                                $UUID             = $elemento->getAttribute('UUID'); 
                                $noCertificadoSAT = $elemento->getAttribute('NoCertificadoSAT'); 
                                $FechaTimbrado    = $elemento->getAttribute('FechaTimbrado'); 
                                $selloCFD         = $elemento->getAttribute('SelloCFD');
                                $selloSAT         = $elemento->getAttribute('SelloSAT');
                                $RFCPAC           = $elemento->getAttribute('RfcProvCertif');

                                }

                                
                            if ($UUID != null && $UUID != "") 
                            {

                                $XML_Datos = new SimpleXMLElement($ComprobanteXML);


                                    $Sello = explode(" ",$XML_Datos['Sello']);
                                    $Certificado = explode(" ",$XML_Datos['Certificado']);

                                $FechaFormat = $this->satxmlsv33_xml_fech($FechaTimbrado);

                                $data['Factura'] = array(
                                'IDVenta'           =>  $data['Venta'][0]['ID'],
                                'Serie'             =>  $datos['Formulario']['Serie'],
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
                                'FormaPago'         =>  $data['Formulario']['FormaPago'],
                                'MetodoPago'        =>  $data['Formulario']['MetodoPago'],
                                'UsoCFDI'           =>  $data['Formulario']['UsoCFDi'],
                                'Comprobante'       =>  $data['Formulario']['Comprobante'],
                                'Observaciones'     =>  $data['Formulario']['Observaciones'],
                                'Moneda'            =>  $data['Formulario']['Moneda'],
                                'Sello'             =>  $Sello[0],
                                'Certificado'       =>  $Certificado[0],
                                'IDUsuario'         =>  $_SESSION['Avyna'][0]['ID'],
                                'RFC_Cliente'       =>  $rfc_cliente
                                );             
            

                                //Almacenamos la factura a la base de datos
                                $UpdateSale = null;
                                $AddFact        = $this->Facturacion->addNewInvoice($data['Factura']);

                                if ($data['Tipo_Factura_Venta'] == 1){

                                  $UpdateSale     = $this->Facturacion->UpdateStatusVenta($data['Venta'][0]['ID'],1);

                                }else{

                                  $UpdateSale     = $this->Facturacion->UpdateStatusVenta($data['Venta'][0]['ID'],0);
                                }
                                //$UpdateSale     = $this->Facturacion->UpdateStatusVenta($data['Venta'][0]['ID']);
                                $CheckRelacion  = $this->Facturacion->AddRelacion($data['Relacionado'],$data['Tipo_Relacion']['Tipo_Relacion'],$UUID);

                                if (empty($AddFact) == false && isset($AddFact) && empty($UpdateSale) == false && isset($UpdateSale)) 
                                {
                                    $check = true;                                              //Se consume el WebService

                                return $check;
                                    
                                }
                                else
                                {
                                    print_r("Error al agregar Factura");
                                
                                    $check = false;

                                    return $check;
                                }

                            }else
                            {

                                print_r("Error de Timbre");
                                
                                    $check = false;

                                    return $check;
                            }

                            }else{

                                echo "Error de Timbre";
                                $check = false;

                                    return $check;
                            }

                            }catch(FallaValidacion $er)
                            {
                                print_r($er->__toString());
                                return  $er->__toString();
                            }

                }catch(FallaValidacion $er)
                {
                    print_r($er->__toString());
                    echo $er;

                }
        }
        else
        {
            return "Error_Totales";
        }

  }

  public function CancelarFactura(){

    $check = true;
    $hoy = date("_Ymd");

        try
        {
            $data = $this->input->post();

            foreach ($data as $key => $value) {

                $ID = $value;

            }

            if(empty($data) == false && isset($data))
            {
                $Factura = $this->Facturacion->getFacturabyID($ID);

                $Empresa = $this->configure->DatosEmpresa($_SESSION['Avyna'][0]['Empresa']);

                foreach ($Factura as $value) {
                    
                    $datos['Factura'] = array(

                        "ID"                        =>  $value['ID'],
                        "IDVenta"                   =>  $value['IDVenta'],
                        "Serie"                     =>  $value['Serie'],
                        "Folio"                     =>  $value['Folio'],
                        "Fecha_Timbrado"            =>  $value['Fecha_Timbrado'],
                        "UUID"                      =>  $value['UUID'],
                        "IDIntegrador"              =>  $value['IDIntegrador'],
                        "Status"                    =>  $value['Status']
                        

                    );

                    $ID_Venta_Total = $value['IDVenta'];
                }


                foreach ($Empresa as $value) {
                    
                    $datos['Empresa'] = array(

                        "ID"                            =>  $value['ID'],
                        "Razon_Social"                  =>  $value['Razon_Social'],
                        "RFC"                           =>  $value['RFC'],
                        "Clave_Regimen_Fiscal"          =>  $value['Clave_Regimen_Fiscal'],
                        "Regimen_Fiscal"                =>  $value['Descripcion_Regimen_Fiscal'],
                        "Pass_CSD"                      =>  $value['Pass_CSD'],
                        "CSD_cer"                       =>  $value['CSD_cer'],
                        "CSD_key"                       =>  $value['CSD_key'],
                        "noCertificado"                 =>  $value['noCertificado'],
                        "Direccion"                     =>  $value['Direccion'],
                        "Colonia"                       =>  $value['Colonia'],
                        "Pais"                          =>  $value['Pais'],
                        "Estado"                        =>  $value['Estado'],
                        "Municipio"                     =>  $value['Municipio'],
                        "CP"                            =>  $value['CP'],
                        "Telefono1"                     =>  $value['Telefono1'],
                        "Telefono2"                     =>  $value['Telefono2'],
                        "Email"                         =>  $value['Email'],
                        "Vigencia_Desde"                =>  $value['Vigencia_Desde'],
                        "Vigencia_Hasta"                =>  $value['Vigencia_Hasta']

                    );
                }

                //$dataEmpresa2 = json_encode($dataEmpresa);
                    
                    try{

                        $UUID       = $datos['Factura']['UUID'];
                        $ID_Factura = $datos['Factura']['ID'];
                        $RFC        = $datos['Empresa']['RFC'];

                            $Seguridad = new Seguridad();                                                                                   //Se crea instancia de la clase Seguridad
                            $trsID = rand( 1, 10000 );                                                                                      //Se genera el ID
                            $Token = $Seguridad->ObtenerToken( $RFC , $trsID );                                                             //Se genera el token de servicio

                            $Cancelacion = new Cancelacion();                                                                               //Se crea instancia de la clase Cancelacion
                            $TransaccionID = rand( 1, 10000 );  
                                $arr = explode(",",$UUID);
                                $ListaCancelar = array();    
                                $ListaCancelar["guid"] = array();
                                foreach ($arr as $key => $value) {
                                    array_push($ListaCancelar["guid"], $value);
                                }                                                                                   

                                $Cancelar = $Cancelacion->CancelaMultiple($RFC, $Token, $TransaccionID, $ListaCancelar);
                                
                                    if ($Cancelar['Estatus'] != 'No Cancelable' && $Cancelar['Estatus'] != 'Solicitud rechazada') 
                                    {

                                        $Estatus        = $this->Facturacion->UpdateStatusFactura($ID_Factura);
                                        $Status_Venta   = $this->Facturacion->UpdateStatusVenta_Cancelado($ID_Venta_Total);

                                        echo $check;
                                    }
                                    else
                                    {

                                        echo "Error_Cancelacion";
                                    }

                                //$Status_Venta     = $this->Facturacion->UpdateStatusVenta_Cancelado($ID_Venta_Total);

                               

                        }catch(FallaValidacion $er)
                        {
                            print_r($er->__toString());
                            exit();
                            return  $er->__toString();
                        }

            }
        }
        catch(Exception $er)
        {
            print_r($er->__toString());
            exit();
            $check = false;
        }
  }


//Obtner el Acuse de Cancelación del SAT por medio del id de la factura 
  public function getAcuseSATbyId(){

    $check = true;
    $UUID = null;
    $IdIntegrador = null;
    $RFC = null;

        try
        {
            $data = $this->input->post();

            if(empty($data) == false && isset($data))
            {

                foreach ($data as $key => $value) { $ID = $value; }

                    $datos = $this->Facturacion->getFacturabyID($ID);

                    $Empresa = $this->configure->DatosEmpresa($_SESSION['Avyna'][0]['Empresa']);


                        if(empty($datos) == false && isset($datos))
                        {

                            foreach ($datos as $key => $value)
                            {

                                $UUID           = $value['UUID'];
                                $IdIntegrador   = $value['IDIntegrador'];
                            }

                            foreach ($Empresa as $value)
                            {
                    
                                $RFC = $value['RFC'];
                            }
                                
                                    $Seguridad = new Seguridad();
                                    $trsID = rand(1, 10000);
                                    $Token = $Seguridad->ObtenerToken($RFC, $trsID);

                                    $Cancelacion = new Cancelacion();
                                    $trsID = rand(1, 10000);
                                    $Acuse = $Cancelacion->RecuperarAcuses($RFC, $Token, $trsID, $UUID);

                                        if (empty($Acuse) == false && isset($Acuse))
                                        {       
                                            $dir  =  $_SERVER['DOCUMENT_ROOT'].'/Avyna_New/XMLs/XML_Timbrados/Acuse_Cancelacion/';                          //Ruta donde se almacenan los archivos ya timbrados
                                            $file = 'Acuse_'.$RFC.'_'.$UUID.'_'.$ID.'.xml';                                                                 //Nombre del XML timbrado
                                            $fi = fopen($dir.$file,'w+');                                                                                   //Se crea el archivo xml en la ruta especifica
                                            fwrite($fi, $Acuse['AcuseXML']);                                                                                //Mandamos el archivo XML proporcionado por el PAC    
                                            fclose($fi);

                                        echo $check;

                                    }
                                    else
                                    {

                                        echo "Error_Acuse";

                                    }

                        }

                }

        }
        catch(FallaValidacion $er)
        {
            print_r($er->__toString());
            exit();
            $check = false;
        }

  }

  public function GetAllInvoicesCanceled ()
  {
        $ID_Cliente = $this->input->post();
        $data       = $this->Facturacion->GetAllFactura_Relacion($ID_Cliente);

        if ($data != null && $data != "") 
        {
            print_r(json_encode($arrayName = array('info' => $data)));
        }
  }


  public function GetPublicoGeneral()
  {

    $RFC_Cliente = $this->input->post();
    $data       = $this->Facturacion->GetpublicoGeneral($RFC_Cliente);

        if ($data != null && $data != "") 
        {
            print_r(json_encode($arrayName = array('general' => $data)));
        }   
  }


  public function Cargar_Correo_Distribuidor()
  {
        $data = $this->input->post();

        if ($data != null && $data != "")
        {
            $info = $this->Facturacion->Cargar_Correo_Distribuidor($data['ID_Factura']);

            if ($info != null && $info != "")
            {
                print_r(json_encode($arrayName = array('Factura' => $info)));
            }
            else
            {
                print_r("Error_Query");
            }
        }
        else
        {
            print_r("Error_Correo");
        }
  }


    public function Mandar_Email()
    {
        $ruta = $this->input->post();

        $str = str_replace(",", ";", $ruta['Para']);

        if ($ruta != null && $ruta != "")
        {
            $to       = $str;
            $subject  = 'Envio del CFDI con el Folio '.$ruta['idVenta'];
            $message  = '
            <html>
            <head>
            <title>HTML</title>
            </head>
            <body>
            <a href="'.$ruta['XML'].'" target="_blank">Descargar XML</a>.
            <a href="'.$ruta['PDF'].'" target="_blank">Descargar PDF</a>.
            </body>
            </html>';
            $headers  = 'From: manuel@integratto.com.mx' . "\r\n" .
                        'MIME-Version: 1.0' . "\r\n" .
                        'Content-type: text/html; charset=utf-8';
            if(mail($to, $subject, $message, $headers))

                print_r(1);

            else

                print_r(0);
        }
        else
        {
            print_r("Error_Correo");
        }
    }



    public function satxmlsv33_xml_fech($fech) 
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

}

?>