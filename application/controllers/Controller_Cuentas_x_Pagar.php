<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Cuentas_x_Pagar extends CI_Controller {


   public function __construct() 
   {
    parent::__construct();

   if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

    $this->load->model("Distribuidores_Model","distribuidor");
    $this->load->model("Bodega_Model","bodega");
    $this->load->model("Fetch_Model","fetch");
    $this->load->model("Login_Model","login");
    $this->load->model("Cuentas_x_Pagar_Model","cuentas");
    $this->load->model("Ventas_Model","ventas");
    $this->load->helper('form');
    }

    public function index()
    {
        $Titulo = array('PageTitle' => 'Cuentas x Cobrar');

        $data['Distribuidor']  = $this->distribuidor->getDistribuidores();
        $data['Bodega']        = $this->bodega->getBodega();

        $Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      'pass' =>  $_SESSION['Avyna'][0]['Password']);

        // Refrescar Permisos e información del usuario //
        $Session = $this->login->signIn($Usuario);

        if ($Session != null){  
          // Cargar Vista Inventario //
          $this->load->view('Componentes/Header', $Titulo);    
          $this->load->view('Manejo/CuentasxPagar/CuentasxPagar',$data);
          $this->load->view('Componentes/Footer');
        }
        else{
          // Cerrar Sesión //
          $this->cerrarSesion($Usuario);
        }
    }

    // Cargar DataTable Pagos Realizados //
    public function fetchPagosRealizados()
    {
      $data = $this->input->post();
      $info = $this->fetch->fetchPagosRealizados($data);
      print_r($info);
    }

    // Rechazar Pago //
    public function rechazarPago()
    {
      $data = $this->input->post();
      $info = $this->cuentas->rechazarPago($data);
      print_r($info);
    }

    // Cargar DataTable Pagos Pendientes //
    public function fetchPagosPendientes()
    {
      $data = $this->input->post();
      $info = $this->fetch->fetchPagosPendientes($data);
      print_r($info);
    }

     public function btnWebServiceBanregio(){
      $denegado = array();

      $filename = 'Denegado_Carga.txt';
      $archivo = fopen($_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/CSV/'.$filename, 'w+');

      $info = $this->input->post();
      $Contador = 0;

      $data = array(
        "header" => array(
          "sequence" => "token", "title" => "Banregio"), 
        "body" => array(
          "request" => array(
            "customer" => "008741",
            "service" => "CH-IENTO-0301",
            "parameters" => array(
              "parameter" => [
                array(
                  "key" => "cliente",
                  "value" => "13303148"
                ),
                array(
                  "key" => "cuentaNumero",
                  "value" => "139976150013"
                ),
                array(
                  "key" => "movimientoNatural",
                  "value" => ""
                ),
                array(
                  "key" => "tipoConsulta",
                  "value" => "C1"
                ),
                array(
                  "key" => "fechaInicial",
                  // "value" => "2020-07-01T00:00:00.000"
                  "value" => $info['FechaStart']."T00:00:00.000"
                ),
                array(
                  "key" => "fechaFinal",
                  // "value" => "2020-07-06T00:00:00.000"
                  "value" => $info['FechaEnd']."T00:00:00.000"
                )
              ]
            )
      )));

      $curl = curl_init();

      curl_setopt($curl, CURLOPT_URL, "https://10.1.72.71:8081/v1");
      curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 0);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($curl, CURLOPT_SSLVERSION,1);
      curl_setopt($curl, CURLOPT_FRESH_CONNECT, 1);
      curl_setopt($curl, CURLOPT_FORBID_REUSE, 1);
  
  
      // Optional Authentication:
      curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
      curl_setopt($curl, CURLOPT_USERPWD, "BR13303148:9SkQsZfsl;Cr");
  
      // IMPORTANTISIMO estas dos opciones con valor false. Usaras tu certificado, como bien me aclaro xev, aunque no se comprobara la firma de este. En muchas paginas te dicen QUE JAMAS se deben poner false por que entonces de que sirve un certificado que supuestamente usas por motivos de seguridad, que te saltes la comprobacion por parte de una autoridad certificadora de que este es un certificado firmado y bla bla bla bla... false y te funcionara la autenticacion usando tu clave y tu certificado, que es lo que deseamos, al menos en este caso. Quiza en otros como bien dicen JAMAS habra que establecerlo a false. Otro dia lo debatimos 
      // Tampoco es necesario usar CURLOPT_CAINFO, ni CURLOPT_CAPATH. por que no queremos verificar la firma del certificado,ni buscar un ca-bundle.crt actualizado, ni modificar tu php.ini para indicar la ruta absoluta de este... entre 2 y 4 dias de investigacion en google para un beginner como yo
   
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  
      curl_setopt($curl, CURLOPT_POST, 1);
      curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
  
      //Header
      $headers = [
          'Cache-Control: no-cache',
          'Content-Type: application/json'
      ];
  
      curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
      curl_setopt($curl, CURLOPT_HEADER, 0);// Incluir el Header en la respuesta
  
  
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //Autenticarte mediante tu certificado y la clave privada
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      $mipass = 'V7L_tCfj19aV5gZ5Z4'; //El pass que usaste en la conversion del certificado pfx a pem, y que te habran proporcionado
      $clientfile = getcwd().'/Certificados/certificateCer.pem'; // el archivo de certificado en formato .pem (para tu Apache). Ojo a los slash... es una ruta... y hay quien se los come y dice que no le funciona
      $keyfile = getcwd().'/Certificados/key.pem'; //el archivo que contiene la clave privada para autenticarte.
      
      curl_setopt($curl, CURLOPT_SSLCERT, $clientfile); //Nombre del fichero que contiene un certificado con formato PEM.
      curl_setopt($curl, CURLOPT_SSLCERTPASSWD, $mipass);
      
      curl_setopt($curl, CURLOPT_SSLKEY, $keyfile); //Nombre del fichero que contiene la clave privada SSL.
      curl_setopt($curl, CURLOPT_SSLKEYPASSWD, $mipass);
      
      
      //Ejecutamos el curl y almacenamos la respuesta y errores de cUrl en variables
      $responseWS = curl_exec($curl); // Aqui obtendras la respuesta del web service 
      $strerror = curl_error($curl); // Aqui obtendras informacion del error si ha habido alguno. En mi caso unos cuantos OPENSSL_ERROR
      
      //Cerramos nuesta sesión
      curl_close($curl);

      if ($responseWS) {

        $responseWS = json_decode($responseWS);

        if ($responseWS->body->response->code == 200) {
          if (count($responseWS->body->response->description) > 0) {
            if (!isset($responseWS->body->response->description[0]->error)){
              for ($i=0; $i < count($responseWS->body->response->description) ; $i++) { 
                $referencia = explode(",", trim($responseWS->body->response->description[$i]->descripcion));
                $venta = $this->cuentas->getVentasByReferencia(trim(end($referencia))); 

                if (!empty($venta)) {

                  if (number_format(floatval($responseWS->body->response->description[$i]->cantidadMovimiento), 2, '.', '') == number_format((floatval($venta[0]['Adeudo'])), 2, '.', '')) {

                    $pagosReferencia = 
                    array('idVenta' => $venta[0]['ID'],
                      'sequence' => $responseWS->header->sequence,
                      'movimientoCuenta' => $responseWS->body->response->description[$i]->movimientoCuenta,
                      'numeroMovimiento' => $responseWS->body->response->description[$i]->numeroMovimiento,
                      'consecutivoMovimiento' => $responseWS->body->response->description[$i]->consecutivoMovimiento,
                      'fechaVal' => $responseWS->body->response->description[$i]->fechaVal,
                      'descripcion' => $responseWS->body->response->description[$i]->descripcion,
                      'referencia' => $responseWS->body->response->description[$i]->referencia,
                      'referenciaExterna' => $responseWS->body->response->description[$i]->referenciaExterna,
                      'referenciaBanco' => $responseWS->body->response->description[$i]->referenciaBanco,
                      'referenciaPersona' => $responseWS->body->response->description[$i]->referenciaPersona,
                      'usuario' => $responseWS->body->response->description[$i]->usuario->numero,
                      'tipoMovimiento' => $responseWS->body->response->description[$i]->tipoMovimiento,
                      'medioTransaccion' => $responseWS->body->response->description[$i]->medioTransaccion,
                      'fechaMovimiento' => $responseWS->body->response->description[$i]->fechaMovimiento,
                      'movimientoTipoDescripcion' => $responseWS->body->response->description[$i]->movimientoTipoDescripcion,
                      'cantidadMovimiento' => $responseWS->body->response->description[$i]->cantidadMovimiento,
                      'Fecha_autorizacion' => date("Y-m-d H:i:s")
                    );
    
                    $validate = $this->cuentas->addPagoReferencia($pagosReferencia);
    
                    if ($validate == 1) {  
                      $this->cuentas->updateVentaReferencia($venta[0]['ID']);
                      $Contador++;
                    }            
                  }
                  else{
                    if (number_format((floatval($venta[0]['Adeudo'])), 2, '.', '') > 0) {
                      // Error de Totales 
                      fputs($archivo,"\n");
                      fputs($archivo,"\n");
                      fputs($archivo,"----------- ERROR TOTALES -------------------");
                      fputs($archivo,"\n");
                      fputs($archivo, '*.- N° Venta: ' . $venta[0]['ID']);
                      fputs($archivo,"\n");
                      fputs($archivo, '*.- Adeudo: $' . $venta[0]['Adeudo']);
                      fputs($archivo,"\n");
                      fputs($archivo, '*.- Monto Pagado: $' . number_format(floatval($responseWS->body->response->description[$i]->cantidadMovimiento), 2, '.', ''));
                      fputs($archivo,"\n");
                      fputs($archivo,"----------- ERROR TOTALES -------------------");

                    }else{
                      // Error PAGO SIN ADEUDO 
                      fputs($archivo,"\n");
                      fputs($archivo,"\n");
                      fputs($archivo,"----------- ERROR PAGO SIN ADEUDO -------------------");
                      fputs($archivo,"\n");
                      fputs($archivo, '*.- N° Venta: ' . $venta[0]['ID']);
                      fputs($archivo,"\n");
                      fputs($archivo, '*.- Adeudo: $' . $venta[0]['Adeudo']);
                      fputs($archivo,"\n");
                      fputs($archivo, '*.- Monto Pagado: $' . number_format(floatval($responseWS->body->response->description[$i]->cantidadMovimiento), 2, '.', ''));
                      fputs($archivo,"\n");
                      fputs($archivo,"----------- ERROR PAGO SIN ADEUDO -------------------");
                    }
                  }
                }else{
                  // Error de Totales 
                    fputs($archivo,"\n");
                    fputs($archivo,"\n");
                    fputs($archivo,"----------- ERROR REFERENCIA -------------------");
                    fputs($archivo,"\n");
                    fputs($archivo, '*.- Referencia: ' . $responseWS->body->response->description[$i]->descripcion);
                    fputs($archivo,"\n");
                    fputs($archivo, '*.- Fecha: ' . $responseWS->body->response->description[$i]->fechaVal);
                    fputs($archivo,"\n");
                    fputs($archivo, '*.- Monto Pagado: $' . number_format(floatval($responseWS->body->response->description[$i]->cantidadMovimiento), 2, '.', ''));
                    fputs($archivo,"\n");
                    fputs($archivo,"----------- ERROR REFERENCIA -------------------");
                }
              }
            }
            else{
              $response = array('code' => 4,'message' => $responseWS->body->response->description[0]->error);
              print_r(json_encode($response));
              exit();
            }          
          }else{
            $response = array('code' => 3,'message' => 'No se encontraron movimientos en ese rango de fechas.');
            print_r(json_encode($response));
            exit();
          }
  
          if ($Contador != 0) {

            fclose($archivo);
            header('Content-Type: text/csv');
            header('Content-Disposition: attachment; filename="' . $filename . '";');
    
            $response = array('code' => 1,'message' => 'Pagos procesados exitosamente.','Reporte' => json_encode('http://'.$_SERVER['HTTP_HOST'].'/Avyna_Desk/CSV/'.$filename));
            print_r(json_encode($response));
            exit();
            
          }else{

            fclose($archivo);
            header('Content-Type: text/csv');
            header('Content-Disposition: attachment; filename="' . $filename . '";');

            $response = array('code' => 0,'message' => 'No se encontraron ningúna venta con referencia valida de BANREGIO.','Reporte' => json_encode('http://'.$_SERVER['HTTP_HOST'].'/Avyna_Desk/CSV/'.$filename));
            print_r(json_encode($response));
            exit();
          }
        }
        else{
          $response = array('code' => 2,'message' => 'Ocurrio un error con el webservice codigo de error: ' . $responseWS->body->response->code);
            print_r(json_encode($response));
            exit();
        }
      }else{
        $response = array('code' => 2,'message' => 'Ocurrio un error con el webservice codigo de error: ' . $strerror);
            print_r(json_encode($response));
            exit();
      }
      
    }

    // public function btnWebServiceBanregio(){
    //   $info = $this->input->post();
    //   $Contador = 0;

    //   $data = array(
    //     "header" => array(
    //       "sequence" => "token", "title" => "Banregio"), 
    //     "body" => array(
    //       "request" => array(
    //         "customer" => "008741",
    //         "service" => "CH-IENTO-0301",
    //         "parameters" => array(
    //           "parameter" => [
    //             array(
    //               "key" => "cliente",
    //               "value" => "13303148"
    //             ),
    //             array(
    //               "key" => "cuentaNumero",
    //               "value" => "139976150013"
    //             ),
    //             array(
    //               "key" => "movimientoNatural",
    //               "value" => ""
    //             ),
    //             array(
    //               "key" => "tipoConsulta",
    //               "value" => "C1"
    //             ),
    //             array(
    //               "key" => "fechaInicial",
    //               // "value" => "2020-07-01T00:00:00.000"
    //               "value" => $info['FechaStart']."T00:00:00.000"
    //             ),
    //             array(
    //               "key" => "fechaFinal",
    //               // "value" => "2020-07-06T00:00:00.000"
    //               "value" => $info['FechaEnd']."T00:00:00.000"
    //             )
    //           ]
    //         )
    //   )));

    //   $curl = curl_init();

    //   curl_setopt($curl, CURLOPT_URL, "https://10.1.72.71:8081/v1");
    //   curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 0);
    //   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    //   curl_setopt($curl, CURLOPT_SSLVERSION,1);
    //   curl_setopt($curl, CURLOPT_FRESH_CONNECT, 1);
    //   curl_setopt($curl, CURLOPT_FORBID_REUSE, 1);
  
  
    //   // Optional Authentication:
    //   curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    //   curl_setopt($curl, CURLOPT_USERPWD, "BR13303148:9SkQsZfsl;Cr");
  
    //   // IMPORTANTISIMO estas dos opciones con valor false. Usaras tu certificado, como bien me aclaro xev, aunque no se comprobara la firma de este. En muchas paginas te dicen QUE JAMAS se deben poner false por que entonces de que sirve un certificado que supuestamente usas por motivos de seguridad, que te saltes la comprobacion por parte de una autoridad certificadora de que este es un certificado firmado y bla bla bla bla... false y te funcionara la autenticacion usando tu clave y tu certificado, que es lo que deseamos, al menos en este caso. Quiza en otros como bien dicen JAMAS habra que establecerlo a false. Otro dia lo debatimos 
    //   // Tampoco es necesario usar CURLOPT_CAINFO, ni CURLOPT_CAPATH. por que no queremos verificar la firma del certificado,ni buscar un ca-bundle.crt actualizado, ni modificar tu php.ini para indicar la ruta absoluta de este... entre 2 y 4 dias de investigacion en google para un beginner como yo
   
    //   curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    //   curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  
    //   curl_setopt($curl, CURLOPT_POST, 1);
    //   curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
  
    //   //Header
    //   $headers = [
    //       'Cache-Control: no-cache',
    //       'Content-Type: application/json'
    //   ];
  
    //   curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    //   curl_setopt($curl, CURLOPT_HEADER, 0);// Incluir el Header en la respuesta
  
  
    //   //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //   //Autenticarte mediante tu certificado y la clave privada
    //   //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //   $mipass = 'V7L_tCfj19aV5gZ5Z4'; //El pass que usaste en la conversion del certificado pfx a pem, y que te habran proporcionado
    //   $clientfile = getcwd().'/Certificados/certificateCer.pem'; // el archivo de certificado en formato .pem (para tu Apache). Ojo a los slash... es una ruta... y hay quien se los come y dice que no le funciona
    //   $keyfile = getcwd().'/Certificados/key.pem'; //el archivo que contiene la clave privada para autenticarte.
      
    //   curl_setopt($curl, CURLOPT_SSLCERT, $clientfile); //Nombre del fichero que contiene un certificado con formato PEM.
    //   curl_setopt($curl, CURLOPT_SSLCERTPASSWD, $mipass);
      
    //   curl_setopt($curl, CURLOPT_SSLKEY, $keyfile); //Nombre del fichero que contiene la clave privada SSL.
    //   curl_setopt($curl, CURLOPT_SSLKEYPASSWD, $mipass);
      
      
    //   //Ejecutamos el curl y almacenamos la respuesta y errores de cUrl en variables
    //   $responseWS = curl_exec($curl); // Aqui obtendras la respuesta del web service 
    //   $strerror = curl_error($curl); // Aqui obtendras informacion del error si ha habido alguno. En mi caso unos cuantos OPENSSL_ERROR
      
    //   //Cerramos nuesta sesión
    //   curl_close($curl);

    //   // print_r($responseWS);
    //   // print_r($strerror);
    //   // exit();

    //   if ($responseWS) {

    //     $responseWS = json_decode($responseWS);

    //     if ($responseWS->body->response->code == 200) {
    //       if (count($responseWS->body->response->description) > 0) {
    //         if (!isset($responseWS->body->response->description[0]->error)){
    //           for ($i=0; $i < count($responseWS->body->response->description) ; $i++) { 
    //             $referencia = explode(",", trim($responseWS->body->response->description[$i]->descripcion));
    //             $venta = $this->cuentas->getVentasByReferencia(trim(end($referencia))); 
    //             if (!empty($venta)) {
    //               if (number_format(floatval($responseWS->body->response->description[$i]->cantidadMovimiento), 2, '.', '') >= number_format((floatval($venta[0]['Adeudo']) - 5), 2, '.', '')) {
    //                 $pagosReferencia = 
    //                 array('idVenta' => $venta[0]['ID'],
    //                   'sequence' => $responseWS->header->sequence,
    //                   'movimientoCuenta' => $responseWS->body->response->description[$i]->movimientoCuenta,
    //                   'numeroMovimiento' => $responseWS->body->response->description[$i]->numeroMovimiento,
    //                   'consecutivoMovimiento' => $responseWS->body->response->description[$i]->consecutivoMovimiento,
    //                   'fechaVal' => $responseWS->body->response->description[$i]->fechaVal,
    //                   'descripcion' => $responseWS->body->response->description[$i]->descripcion,
    //                   'referencia' => $responseWS->body->response->description[$i]->referencia,
    //                   'referenciaExterna' => $responseWS->body->response->description[$i]->referenciaExterna,
    //                   'referenciaBanco' => $responseWS->body->response->description[$i]->referenciaBanco,
    //                   'referenciaPersona' => $responseWS->body->response->description[$i]->referenciaPersona,
    //                   'usuario' => $responseWS->body->response->description[$i]->usuario->numero,
    //                   'tipoMovimiento' => $responseWS->body->response->description[$i]->tipoMovimiento,
    //                   'medioTransaccion' => $responseWS->body->response->description[$i]->medioTransaccion,
    //                   'fechaMovimiento' => $responseWS->body->response->description[$i]->fechaMovimiento,
    //                   'movimientoTipoDescripcion' => $responseWS->body->response->description[$i]->movimientoTipoDescripcion,
    //                   'cantidadMovimiento' => $responseWS->body->response->description[$i]->cantidadMovimiento,
    //                   'Fecha_autorizacion' => date("Y-m-d H:i:s")
    //                 );
    
    //                 $validate = $this->cuentas->addPagoReferencia($pagosReferencia);
    
    //                 if ($validate == 1) {  
    //                   $this->cuentas->updateVentaReferencia($venta[0]['ID']);
    //                   $Contador++;
    //                 }            
    //               }
    //             }
    //           }
    //         }
    //         else{
    //           $response = array('code' => 4,'message' => $responseWS->body->response->description[0]->error);
    //           print_r(json_encode($response));
    //         }          
    //       }else{
    //         $response = array('code' => 3,'message' => 'No se encontraron movimientos en ese rango de fechas.');
    //         print_r(json_encode($response));
    //       }
  
    //       if ($Contador != 0) {
    //         $response = array('code' => 1,'message' => 'Pagos procesados exitosamente.');
    //         print_r(json_encode($response));
    //       }else{
    //         $response = array('code' => 0,'message' => 'No se encontraron ningúna venta con referencia valida de BANREGIO.');
    //         print_r(json_encode($response));
    //       }
    //     }
    //     else{
    //       $response = array('code' => 2,'message' => 'Ocurrio un error con el webservice codigo de error: ' . $responseWS->body->response->code);
    //         print_r(json_encode($response));
    //     }
    //   }else{
    //     $response = array('code' => 2,'message' => 'Ocurrio un error con el webservice codigo de error: ' . $strerror);
    //         print_r(json_encode($response));
    //   }
      
    // }

    public function procesarVenta(){
      $info = $this->input->post();
      $response = $this->cuentas->updateVentaReferencia($info['idVenta']);
      print_r($response);
    }

    // Cargar DataTable Reporte Pagos //
    public function fetchReportePagos()
    {
      $data = $this->input->post();
      $info = $this->fetch->fetchReportePagos($data);
      print_r($info);
    }

    public function fetchCuentasXPagar(){
      $data = $this->input->post();
      $info = $this->fetch->fetchCuentasXPagar($data);
      print_r($info);
    }
    
    // Obtener Imagen del Pago //
    public function getImagen()
    {
      $data = $this->input->post();
      $info = $this->cuentas->getImagen($data['idPagosCliente']);
      print_r(json_encode($info));
    }

    // Confirmar Pago Cliente //
    public function confirmarPago()
    {
      $data          = $this->input->post();
      $ConfirmarPago = $this->cuentas->confirmarPago($data['ID']);

      if ($ConfirmarPago == 1) {
        $Venta  = $this->ventas->getVentaById($data['idVenta']);
        $Pago   = $this->cuentas->getPagoCliente($data['ID']);

        // Eliminamos del arreglo la imagen que negera problemas //
        unset($Pago[0]['URL_Imagen']);
        $Adeudo = $Venta[0]['Adeudo'] - $Pago[0]['Monto'];

        // Update Status Venta Según el Adeudo //
        $info = $this->ventas->updateVentaPago($data['idVenta'],$Adeudo);
        print_r($info);
      }
      else{
        print_r(2);
      }
    }

    // Confirmar todos los Pagos //
    public function confirmarTodosPago()
    {
      $data = $this->input->post();
      $result = $this->cuentas->confirmarTodosPago($data);
      print_r($result);
    }

    // Rechar Pago Pendiente //
    public function rechazarPagoPendiente()
    {
      $data = $this->input->post();
      $info = $this->cuentas->rechazarPagoPendiente($data['ID'],$data['idVenta']);
      print_r($info);
    }

    //Exportar Pagos Pendientes //
    public function csvPagosPendientes()
    {
      $data = $this->input->post();
      $info = $this->cuentas->csvPagosPendientes($data);

      $Nombre_Archivo = $_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/Clases/Respaldos/Reporte_Cuentas_'.date("Y-m-d_H_i_s").'.csv';
      $Realnamefile   = 'Reporte_Cuentas_'.date("Y-m-d_H_i_s").'.csv';

      if(file_exists($Nombre_Archivo)){
        $mensaje = "El Archivo $Nombre_Archivo se ha modificado";
      }

      else{
        $mensaje = "El Archivo $Nombre_Archivo se ha creado";
      }

      header('Content-Description: File Transfer');
      header('Content-Type: text/csv');
      header('Content-Disposition: attachment; filename="'.$Realnamefile.'"');
      header('Expires: 0');
      header('Cache-Control: must-revalidate');
      header('Pragma: public');

      // create a file pointer connected to the output stream
      $file = fopen('php://output', 'w');
      $file1 = fopen($Nombre_Archivo, 'a+');

      // send the column headers
      fputcsv($file, array('ID de la venta', 'Fecha Pago','Monto de Pago','Nombre Distribuidor', 'Apellidos Distribuidor'));
      // send the column headers
      fputcsv($file1, array('ID de la venta', 'Fecha Pago','Monto de Pago','Nombre Distribuidor', 'Apellidos Distribuidor'));

      for ($i=0; $i < count($info); $i++){ 
        fputcsv($file, $info[$i]);
      }

      for ($i=0; $i < count($info); $i++){ 
        fputcsv($file1, $info[$i]);
      }

      fclose($file);
      fclose($file1);

      $from = "Prosalon@no-reply.com";
      $to = "aldom@integratto.com.mx";
      $subject = "Reporte Cuentas Por Pagar";
      $message = "Cuentas por Pagar ".$Nombre_Archivo;
      $headers = "From:" . $from;
      mail($to,$subject,$message, $headers);
    }

    // Exportar Reporte Pagos //
    public function csvReportePagos()
    {
      $data = $this->input->post();
      $info = $this->cuentas->csvReportePagos($data);

      // output headers so that the file is downloaded rather than displayed
      header('Content-type: text/csv');
      header('Content-Disposition: attachment; filename="Reporte Pagos Realizados.csv"');
       
      // do not cache the file
      header('Pragma: no-cache');
      header('Expires: 0');
       
      // create a file pointer connected to the output stream
      $file = fopen('php://output', 'w');

      // send the column headers
      fputcsv($file, array('No de Venta', 'Fecha', 'Monto','idDistribuidor', 'Nombre','Apellidos','Referencia'));

      for ($i=0; $i < count($info); $i++){ 
        fputcsv($file, $info[$i]);
      }

      fclose($file);
    }



































    public function Confirmar_Todos_Pago()
    {
      $data = $this->input->post();
      $result = $this->cuentas->Confirmar_Todos_Pago($data);
      print_r($result);
    }

    public function Rechazar_Pago_Realizado()
    {
      $data = $this->input->post();

      $Respuesta = $this->cuentas->Rechazar_Pago_Realizado($data);

      if ($Respuesta == 1)
      {
        print_r("Correcta");
        exit();
      }
      else
      {
        print_r("Incorrecta");
        exit();
      }
    }

    public function GetImagen_Cuentas()
    {
      $data = $this->input->post();

      $info['Imagen'] = $this->cuentas->GetImagen_Cuentas($data['ID']);

      print_r(json_encode($info));
    }

    public function Rechazar_Pago()
    {
      $data = $this->input->post();

      $info = $this->cuentas->Rechazar_Pago($data['ID'],$data['idVenta']);

      if ($info == 1)
      {
        print_r("Correcto");
        exit();
      }
      else
      {
        print_r("Error_Update_Rechazar");
        exit();
      }
    }

    public function Confirmar_Pago()
    {
      $data = $this->input->post();

      $info = $this->cuentas->Confirmar_Pago($data['ID']);

      if ($info > 0)
      {
        $Venta = $this->cuentas->Get_Venta($data['idVenta']);
        $Pago  = $this->cuentas->Get_Pago($data['ID']);

        $Adeudo = $Venta[0]['Adeudo'] - $Pago[0]['Monto'];

        if ($Adeudo <= 0)
        {
            $Update_Venta = $this->cuentas->Update_Venta2($data['idVenta'],$Adeudo);
        }
        else
        {
            $Update_Venta = $this->cuentas->Update_Venta($data['idVenta'],$Adeudo);
        }

        if ($Update_Venta > 0)
        {
          print_r("Correcto");
          exit();
        }
        else
        {
          print_r("Error_Update_Venta");
          exit();
        }
      }
      else
      {
        print_r("Error_Update_Confirmar");
        exit();
      }
    }
}