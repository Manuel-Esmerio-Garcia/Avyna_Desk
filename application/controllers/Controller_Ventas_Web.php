<?php
defined('BASEPATH') OR exit('No direct script access allowed');

date_default_timezone_set('America/Mexico_City');

ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

// Includes //
include('./Clases/XMLVentasDirectas.php');
include('./Clases/XMLGlobalVentasWeb.php');
include('./ecodexphp/includes.php');
include('./Clases/LeerCFDI.php');

class Controller_Ventas_Web extends CI_Controller {

    public function __construct(){
        parent::__construct();

        if(!isset($_SESSION['Avyna'])) redirect('Controller_Login');
        $this->load->model('Login_Model', 'login');
        $this->load->model('VentasWeb_Model', 'ventas');
        $this->load->model("Division_Model","division"); 
        $this->load->model("Linea_Model","linea");
        $this->load->model("Sublinea_Model","sublinea");
        $this->load->model("Bodega_Model","bodega");
        $this->load->model("Fetch_Model","fetch");
        $this->load->model("Cliente_Model","cliente");
        $this->load->model('Empresa_Model', 'configure');
        $this->load->model('Facturacion_Model', 'facturacion');
        $this->load->model('Ventas_Model', 'venta');
        $this->load->model('Moneda_Model', 'moneda');
        $this->load->model("Extracciones_Model","extracciones");
        $this->load->helper('form');
    }

    public function index(){
        $Titulo = array('PageTitle' => 'Ventas WEB');
        $Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                        'pass' =>  $_SESSION['Avyna'][0]['Password']);

        // Refrescar Permisos e información del usuario //
        $Session = $this->login->signIn($Usuario);

        if ($Session != null){  
            // Cargar Vista Inventario //
            $this->load->view('Componentes/Header', $Titulo);    
            $this->load->view('Operaciones/VentasWeb');
            $this->load->view('Componentes/Footer', $Titulo);
        }
        else{
            // Cerrar Sesión //
            $this->cerrarSesion($Usuario);
        }
    }

    public function Delete(){
      $info 	  = json_decode(file_get_contents("php://input"),true);
      $response = $this->ventas->Eliminar_Venta($info['ID']);
		  print_r($response);
    }

    public function DeleteAdeudo(){
      $info 	  = json_decode(file_get_contents("php://input"),true);
      $response = $this->ventas->DeleteAdeudo($info['ID']);
		  print_r($response);
    }


    public function DeleteSales(){
      $response = $this->ventas->DeleteSales();
		  print_r($response);
    }

    public function fetchVentasWeb(){
        $data = $this->input->post();
        $info = $this->ventas->fetchVentasWeb($data);
        print_r($info);
    }
    // Agregar Factura Directa //
    public function addFacturaDirecta(){
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

    function satxmlsv33_xml_fech($fech){
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

    public function GlobalInvoice(){
      $datos['Venta']       = $this->ventas->getAllVentaWeb();
      if (count($datos['Venta']) > 0) {
        $datos['Monedas']     = $this->moneda->getMonedaById('MXN');
        $datos['Empresa']     = $this->configure->getEmpresa($_SESSION['Avyna'][0]['Empresa']);

        $info                 = $this->crearXMLGlobalV33($datos);
        print_r($info);
      }else{
        print_r(4);
      }
      
    }



























































    public function crearXMLGlobalV33($data){
      $XML = new XMLGlobalVentasWeb();
    
        $rfc         = $data['Empresa'][0]['RFC'];
        $rfc_cliente = 'XAXX010101000';
        $hoy         = date("_Ymd");
        $Folio       = $data['Venta'][0]['ID'];
    
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
                  'Serie'             =>  'G',
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
                  'FormaPago'         =>  '03',
                  'MetodoPago'        =>  'PUE',
                  'UsoCFDI'           =>  'P01',
                  'Comprobante'       =>  'I',
                  'Observaciones'     =>  'Factura Global del mes '.date("F").' '.date("Y"), 
                  'Moneda'            =>  'MXN',
                  'Sello'             =>  $Sello[0],
                  'Certificado'       =>  $Certificado[0],
                  'IDUsuario'         =>  $_SESSION['Avyna'][0]['ID'],
                  'RFC_Cliente'       =>  $rfc_cliente
                );             
                  
                // Almacenamos la factura a la base de datos //
                $AddFact        = $this->facturacion->saveFacturaGlobal($data['Factura'],$data,$UUID);
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

      // Configuración del IVA //
      $IVA    = 1 + $info['Monedas'][0]['Impuesto_%'] / 100;
      $IVA_2  = $info['Monedas'][0]['Impuesto_%'] / 100;

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


      if ($info['Venta'][0]['Gastos_Admin']) {
        $gastosAdmin = floatval(number_format($info['Venta'][0]['Gastos_Admin'], 2, '.', ''));
        $gastosAdminSI = floatval($gastosAdmin / $IVA);
        $subtotalSI   = $subtotalSI + $gastosAdminSI;
        $totalCI      = $totalCI + floatval($gastosAdminSI * $IVA_2);
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
      // print_r("\n");
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

    // Validate Saldos ventas antes de facturar //
    // public function validateSaldosFactura($info){
    //   $fecha = date("Y-m-d H:i:s");
    //   $precioSI = 0;
    //   $importeSI = 0;
    //   $subtotalSI = 0;
    //   $descuentoCD = 0;
    //   $totalDesc = 0;
    //   $importeBase = 0;
    //   $descuentoCC = 0;
    //   $importeBaseCC = 0;
    //   $importeCI = 0;
    //   $totalCI = 0;
    //   $totalTimbrado = 0;
    //   $descAdicional = 0;
    //   $adicionalDescPorcentaje = 0;
      
    //   if ($info['Venta'][0]['idCliente'] == 1967 && floatval($info['TotalVenta'][0]['Total']) <= 1000) {
    //     if ($info['Venta'][0]['Gastos_Admin'] == "50.00") {
    //       $totalVenta        = floatval($info['Venta'][0]['Total']) - 150.00;
    //     }
    //     else{
    //       $totalVenta        = floatval($info['Venta'][0]['Total']) - 100;
    //     }
    //   }else{
    //     // Obtener el Descuento //
    //     if ($info['Venta'][0]['Gastos_Admin'] == "50.00") {
    //       $totalVenta        = floatval($info['Venta'][0]['Total']) - 50.00;
    //     }
    //     else{
    //       $totalVenta        = $info['Venta'][0]['Total'];
    //     }
    //   }
      
    //   if (floatval($info['Venta'][0]['descuento_adicional']) > 0.0000) {
    //     $descAdicional           = number_format(floatval($info['Venta'][0]['descuento_adicional']), 5, '.', '');
    //     $adicionalDescPorcentaje = number_format(floatval($descAdicional / 100), 5, '.', '');
    //     //$totalVenta              = $totalVenta;
    //   }
    
    //   /*Obtener el Descuento*/
    //   $descVenta         = floatval($info['Venta'][0]['Descuento']);
    //   $totalDescVenta    = floatval($info['TotalVenta'][0]['Total']);
    //   $descDistriduidor  = number_format(($descVenta / $totalDescVenta), 3, '.', '');

    //   // Configuración del IVA //
    //   $IVA    = 1 + $info['Monedas'][0]['Impuesto_%'] / 100;
    //   $IVA_2  = $info['Monedas'][0]['Impuesto_%'] / 100;

    //   $listProducts = count($info['Datos_Venta']);

    //   for ($i=0; $i<$listProducts; $i++){
    //     // Precio sin IVA //
    //     $precioSI             = number_format($info['Datos_Venta'][$i]['Precio_unitario'] / $IVA, 2, '.', '');
    //     // Importe sin IVA //
    //     $importeSI            = $info['Datos_Venta'][$i]['Cantidad'] * $precioSI;
    //     // subtotal sin IVA //
    //     $subtotalSI           += $importeSI;
    //     // Descuento Distribuidor //
    //     $descuentoCD          = number_format($importeSI * ($descDistriduidor + $adicionalDescPorcentaje), 2, '.', '');
    //     // Total Descuento Distribuidor //
    //     $totalDesc            += $descuentoCD;
    //     // Importe - descuento distribuidor //
    //     $importeBase          = $importeSI - $descuentoCD;
    //     // IVA //
    //     $importeCI            = number_format($importeBase * $IVA_2, 2, '.', '');
    //     // Total IVA //
    //     $totalCI              += $importeCI;   
    //   }

    //   if ($info['Venta'][0]['Gastos_Admin'] == "50.00") {
    //     $gastosAdmin = number_format($info['Venta'][0]['Gastos_Admin'] / $IVA, 2, '.', '');
    //     $subtotalSI   = $subtotalSI + $gastosAdmin;
    //     $totalCI      = $totalCI + number_format($gastosAdmin * $IVA_2, 2, '.', ''); 
    //   }
      
    //   $totalFactura   = ($subtotalSI - $totalDesc) + $totalCI;
    //   $totalTimbrado  = abs(round($totalFactura) - round($totalVenta));
    //   $validateABS = round($totalTimbrado);

    //   if ($validateABS > 30){
    //     return 0;
    //   }
    //     return 1;
    // }
    
    
      // Cerrar Sesión //
    public function cerrarSesion(){
        session_destroy();
        redirect('Controller_Login');
    }
}

?>