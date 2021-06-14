<?php

class CrearXML{

/*$cer = shell_exec('openssl x509 -inform DER -outform PEM -in C:\wamp64\www\Prosalon\ecodexphp\aaa010101aaa.cer -pubkey -out C:\wamp64\www\Prosalon\ecodexphp\aaa010101aaa.cer.pem 2>&1');
$key = shell_exec('openssl pkcs8 -inform DER -in C:\wamp64\www\Prosalon\ecodexphp\aaa010101aaa.key -out C:\wamp64\www\Prosalon\ecodexphp\aaa010101aaa.key.pem -passin pass:12345678a 2>&1');*/


//////////////////////////////////////////////////////////
///                                                    ///
///       Función General de Creacion                  ///
///                                                    ///
///                                                    ///
//////////////////////////////////////////////////////////

function satxmlsv33($arr, $edidata=false, $dir="./tmp/",$nodo="",$addenda="") {
//ini_set("include_path",ini_get("include_path").":/u/cte/src/cfd/");
//equire_once "lib/numealet.php";        // genera el texto de un importe con letras

global $xml, $cadena_original, $sello, $texto, $ret;

error_reporting(E_ALL & ~(E_WARNING | E_NOTICE));
$this->satxmlsv33_genera_xml($arr, $edidata, $dir, $nodo, $addenda);
$this->satxmlsv33_genera_cadena_original();
$this->satxmlsv33_sella($arr);
$ret = $this->satxmlsv33_termina($arr, $dir);

return $ret;                                                                                                                                  //Retorna todo el XML generado sin timbrar

}

//////////////////////////////////////////////////////////
///                                                    ///
///       Función que ejecuta todo las funciones       ///
///                                                    ///
///                                                    ///
//////////////////////////////////////////////////////////

function satxmlsv33_genera_xml($arr, $edidata, $dir,$nodo,$addenda) {
global $xml, $ret;
$xml = new DOMdocument("1.0","UTF-8");
$this->satxmlsv33_generales($arr, $edidata, $dir,$nodo,$addenda);
$this->satxmlsv33_relacionados($arr, $edidata, $dir,$nodo,$addenda);
$this->satxmlsv33_emisor($arr, $edidata, $dir,$nodo,$addenda);
$this->satxmlsv33_receptor($arr, $edidata, $dir,$nodo,$addenda);
$this->satxmlsv33_conceptos($arr, $edidata, $dir,$nodo,$addenda);
$this->satxmlsv33_impuestos($arr, $edidata, $dir,$nodo,$addenda);
$this->satxmlsv33_complemento($arr, $edidata, $dir,$nodo,$addenda);
$ok = $this->satxmlsv33_valida();
/*if (!$ok) {
    $this->display_xml_errors();
    die("XSD");
}*/
//satxmlsv33_addenda($arr, $edidata, $dir,$nodo,$addenda);
}

//////////////////////////////////////////////////////////
///                                                    ///
///       Datos generales del comprobante              ///
///                                                    ///
///                                                    ///
//////////////////////////////////////////////////////////

function satxmlsv33_generales($arr, $edidata, $dir,$nodo,$addenda) {
global $root, $xml;
$root = $xml->createElement("cfdi:Comprobante");
$root = $xml->appendChild($root);

if ($addenda=="detallista") {
    # 12/Mar/2009   Se agrega el namespace de detallista para futurama
    $this->satxmlsv33_cargaAtt($root, array("xmlns:cfdi"=>"http://www.sat.gob.mx/cfd/3",                                                        //Crea el encabezado del XML dependiendo de la addenda a utilizar
                          "xmlns:xsi"=>"http://www.w3.org/2001/XMLSchema-instance",
                          "xmlns:detallista"=>"http://www.sat.gob.mx/detallista",
                          "xsi:schemaLocation"=>"http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd http://www.sat.gob.mx/detallista http://www.sat.gob.mx/sitio_internet/cfd/detallista/detallista.xsd"
                         )
                );
} elseif ($addenda=="cce") {
    # 6/Abr/2016   Se agrega el namespace de cce para exportaciones
    # 22/dic/2016   Se cambia el namespace de cce para exportaciones 1.1
    $this->satxmlsv33_cargaAtt($root, array("xmlns:cfdi"=>"http://www.sat.gob.mx/cfd/3",                                                        //Crea el encabezado del XML dependiendo de la addenda a utilizar
                          "xmlns:xsi"=>"http://www.w3.org/2001/XMLSchema-instance",
                          "xmlns:cce11"=>"http://www.sat.gob.mx/ComercioExterior11",
                          "xsi:schemaLocation"=>"http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd http://www.sat.gob.mx/ComercioExterior11 http://www.sat.gob.mx/sitio_internet/cfd/ComercioExterior/ComercioExterior11.xsd"
                         )
                );
} elseif ($addenda=="pago") {
    $this->satxmlsv33_cargaAtt($root, array("xmlns:cfdi"=>"http://www.sat.gob.mx/cfd/3",                                                        //Crea el encabezado del XML dependiendo de la addenda a utilizar
                          "xmlns:xsi"=>"http://www.w3.org/2001/XMLSchema-instance",
                          "xmlns:pago10"=>"http://www.sat.gob.mx/Pagos",
                          "xsi:schemaLocation"=>"http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd http://www.sat.gob.mx/Pagos http://www.sat.gob.mx/sitio_internet/cfd/Pagos/Pagos.xsd"
                         )
                );
} elseif ($addenda=="diconsa") {
    # 23/Oct/2009   Se agrega el namespace de Diconsa
    $this->satxmlsv33_cargaAtt($root, array("xmlns:cfdi"=>"http://www.sat.gob.mx/cfd/3",                                                        //Crea el encabezado del XML dependiendo de la addenda a utilizar
                          "xmlns:xsi"=>"http://www.w3.org/2001/XMLSchema-instance",
                          "xmlns:Diconsa"=>"http://www.diconsa.gob.mx/cfd",
                          "xsi:schemaLocation"=>"http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd http://www.diconsa.gob.mx/cfd http://www.diconsa.gob.mx/cfd/diconsa.xsd"
                      )
                  );
} elseif ($addenda=="superneto") {
    # 26/Ago/2010   Se agrega el namespace de SuperNeto
    $this->satxmlsv33_cargaAtt($root, array("xmlns:cfdi"=>"http://www.sat.gob.mx/cfd/3",                                                        //Crea el encabezado del XML dependiendo de la addenda a utilizar
                          "xmlns:xsi"=>"http://www.w3.org/2001/XMLSchema-instance",
                          "xmlns:ap"=>"http://www.tiendasneto.com/ap",
                          "xsi:schemaLocation"=>"http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd http://www.tiendasneto.com/ap addenda_prov.xsd"
                      )
                  );
} elseif ($addenda=="extra") {
    # 04/Ene/2012   Se agrega el namespace de Tiendas Extra
    $this->satxmlsv33_cargaAtt($root, array ("xmlns:cfdi"=>"http://www.sat.gob.mx/cfd/3",                                                        //Crea el encabezado del XML dependiendo de la addenda a utilizar
                          "xmlns:xsi"=>"http://www.w3.org/2001/XMLSchema-instance",
                          "xmlns:modelo"=>"http://www.gmodelo.com.mx/CFD/Addenda/Receptor",
                          "xsi:schemaLocation"=>"http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd http://www.gmodelo.com.mx/CFD/Addenda/Receptor https://femodelo.gmodelo.com/Addenda/ADDENDAMODELO.xsd"
                      )
                  );
} elseif ($addenda=="casaley") {
    # 26/Ago/2010   Se agrega el namespace de Casaley
    $this->satxmlsv33_cargaAtt($root, array("xmlns:cfdi"=>"http://www.sat.gob.mx/cfd/3",                                                        //Crea el encabezado del XML dependiendo de la addenda a utilizar
                          "xmlns:xsi"=>"http://www.w3.org/2001/XMLSchema-instance",
                          "xmlns:cley"=>"http://servicios.casaley.com.mx/factura_electronica",
                          "xsi:schemaLocation"=>"http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd http://servicios.casaley.com.mx/factura_electronica http://servicios.casaley.com.mx/factura_electronica/XSD_ADDENDA_CASALEY.xsd"
                      )
                  );
} else {
    $this->satxmlsv33_cargaAtt($root, array("xmlns:cfdi"=>"http://www.sat.gob.mx/cfd/3",                                                        //Crea el encabezado del XML dependiendo de la addenda a utilizar
                          "xmlns:xsi"=>"http://www.w3.org/2001/XMLSchema-instance",
                          "xsi:schemaLocation"=>"http://www.sat.gob.mx/cfd/3  http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd"
                         )
                     );
}

//* Fecha del server: */ 
//$fecha = time(); 
//* Le sumas o restas las horas de diferencia: */ 
//$movhoras = -6; 
//* Le sumamos los segundos a la variable $fecha: */ 
//$fecha = $fecha + ($movhoras * 60 * 60); 
//* Lo formateamos como vos quieras: */ 

date_default_timezone_set("America/Mexico_City");

$fecha = date("Y-m-d H:i:s"); 

$listImpuesto = count($arr['Impuesto']);

/*IVA*/
for ($i=0; $i <= $listImpuesto -1 ; $i++)
{ 
    if ($arr['Impuesto'][$i]['Tipo'] == 'Traslado')
    {
      if ($arr['Impuesto'][$i]['Impuesto'] == '002')
      {

        $Tasa = $arr['Impuesto'][$i]['Tasa_Cuota'] / 100;

        $Longitud_Tasa = strlen($Tasa);

          switch ($Longitud_Tasa)
          {
            case 3:
               $IVA = $Tasa.'00000';
              break;
            case 4:
               $IVA = $Tasa.'0000';
              break;
            case 5:
               $IVA = $Tasa.'000';
              break;
            case 6:
               $IVA = $Tasa.'00';
              break;
            case 7:
               $IVA = $Tasa.'0';
              break;
            case 8:
               $IVA = $Tasa;
              break;
            case 9:
              $IVA = substr($Tasa, 0, -1); 
              break;
            case 10:
              $IVA = substr($Tasa, 0, -2); 
              break;
          }
      }
      elseif ($arr['Impuesto'][$i]['Impuesto'] == '001')
      {

        $Tasa = $arr['Impuesto'][$i]['Tasa_Cuota'] / 100;

        $Longitud_Tasa = strlen($Tasa);

          switch ($Longitud_Tasa)
          {
            case 3:
               $ISR = $Tasa.'00000';
              break;
            case 4:
               $ISR = $Tasa.'0000';
              break;
            case 5:
               $ISR = $Tasa.'000';
              break;
            case 6:
               $ISR = $Tasa.'00';
              break;
            case 7:
               $ISR = $Tasa.'0';
              break;
            case 8:
               $ISR = $Tasa;
              break;
            case 9:
              $ISR = substr($Tasa, 0, -1); 
              break;
            case 10:
              $ISR = substr($Tasa, 0, -2); 
              break;
          }
      }
    }
    else
    {
      if ($arr['Impuesto'][$i]['Impuesto'] == '001')
      {
        $Tasa_Retencion_ISR = $arr['Impuesto'][$i]['Tasa_Cuota'] / 100;

        $Longitud_Tasa = strlen($Tasa_Retencion_ISR);

          switch ($Longitud_Tasa)
          {
            case 3:
               $RetencionISR = $Tasa_Retencion_ISR.'00000';
              break;
            case 4:
               $RetencionISR = $Tasa_Retencion_ISR.'0000';
              break;
            case 5:
               $RetencionISR = $Tasa_Retencion_ISR.'000';
              break;
            case 6:
               $RetencionISR = $Tasa_Retencion_ISR.'00';
              break;
            case 7:
               $RetencionISR = $Tasa_Retencion_ISR.'0';
              break;
            case 8:
               $RetencionISR = $Tasa_Retencion_ISR;
              break;
            case 9:
              $RetencionISR = substr($Tasa_Retencion_ISR, 0, -1); 
              break;
            case 10:
              $RetencionISR = substr($Tasa_Retencion_ISR, 0, -2); 
              break;
          }
      }
      elseif ($arr['Impuesto'][$i]['Impuesto'] == '002')
      {
        $Tasa_Retencion_IVA = $arr['Impuesto'][$i]['Tasa_Cuota'] / 100;

        $Longitud_Tasa = strlen($Tasa_Retencion_IVA);

          switch ($Longitud_Tasa)
          {
            case 3:
               $RetencionIVA = $Tasa_Retencion_IVA.'00000';
              break;
            case 4:
               $RetencionIVA = $Tasa_Retencion_IVA.'0000';
              break;
            case 5:
               $RetencionIVA = $Tasa_Retencion_IVA.'000';
              break;
            case 6:
               $RetencionIVA = $Tasa_Retencion_IVA.'00';
              break;
            case 7:
               $RetencionIVA = $Tasa_Retencion_IVA.'0';
              break;
            case 8:
               $RetencionIVA = $Tasa_Retencion_IVA;
              break;
            case 9:
              $RetencionIVA = substr($Tasa_Retencion_IVA, 0, -1); 
              break;
            case 10:
              $RetencionIVA = substr($Tasa_Retencion_IVA, 0, -2); 
              break;
          }
      }
    }
}



/*print_r($IVA."\n");
print_r($ISR."\n");
print_r($RetencionISR."\n");
print_r($RetencionIVA."\n");
exit();*/


$listProducts = count($arr['Factura']);

for ($i=0; $i <= $listProducts -1 ; $i++)
{ 
    $Importe_Sub  = $arr['Factura'][$i]['Valor_Unitario'] * $arr['Factura'][$i]['Cantidad']; 
    $SubTotal     += $Importe_Sub;
    $Descuento    += $arr['Factura'][$i]['Descuento_Movimiento'];

    $ImporteIVA   =  number_format($arr['Factura'][$i]['Importe_Movimiento'] * $IVA, 2, '.', '');
    $ImporteISR   =  number_format($arr['Factura'][$i]['Importe_Movimiento'] * $ISR, 2, '.', '');

    $Impuestos    += $ImporteIVA + $ImporteISR;

    $RetenIVA     =  number_format($arr['Factura'][$i]['Importe_Movimiento'] * $Tasa_Retencion_IVA, 2, '.', '');
    $RetenISR     =  number_format($arr['Factura'][$i]['Importe_Movimiento'] * $Tasa_Retencion_ISR, 2, '.', '');

    /*$ImporteIVA   =  $arr['Factura'][$i]['Importe_Movimiento'] * $IVA;
    $ImporteISR   =  $arr['Factura'][$i]['Importe_Movimiento'] * $ISR;

    $Impuestos    += $ImporteIVA + $ImporteISR;

    $RetenIVA     =  $arr['Factura'][$i]['Importe_Movimiento'] * $Tasa_Retencion_IVA;
    $RetenISR     =  $arr['Factura'][$i]['Importe_Movimiento'] * $RetencionISR;*/

    $Retenciones  += $RetenIVA + $RetenISR;   

      /*print_r("Importe IVA ".$ImporteIVA."\n");
      print_r("Importe ISR ".$ImporteISR."\n");
      print_r("Retencion IVA ".$RetenIVA."\n");
      print_r("Retencion ISR ".$RetenISR."\n");
      print_r("Subtotal ".$SubTotal."\n");
      print_r("Descuento ".$Descuento."\n");
      print_r("\n");
      print_r("Total Impuestos ".$Impuestos."\n");
      print_r("Total Retenciones ".$Retenciones."\n");
      exit();*/

   
}

$Subtota_Descuento  = $SubTotal - $Descuento;
$Factura            = ($Subtota_Descuento - $Retenciones) + $Impuestos;

/*print_r("Subtotal: ".number_format($SubTotal, 2, '.', '')."\n");
print_r("Descuento: ".number_format($Descuento, 2, '.', '')."\n");
print_r("Subtotal-Descuento: ".number_format($Subtota_Descuento, 2, '.', '')."\n");
print_r("Impuesto: ".number_format($Impuestos, 2, '.', '')."\n");
print_r("Total: ".number_format($Factura, 2, '.', '')."\n");

print_r("\n \n \n \n \n \n \n");*/

$Tipo_Cambio = round($arr['Factura'][0]['TipoCambio']);

$this->satxmlsv33_cargaAtt($root, array("Version"=>"3.3",
                      "Serie"=>  $arr['Factura'][0]['Serie'],
                      "Folio"=> $arr['Factura'][0]['Folio'],
                      "Fecha"=>$this->satxmlsv33_xml_fech($fecha),                                    //La fecha debe de llevar el formato necesario
                      //"Fecha"=>'2018-02-18T11:26:10',
                      "Sello"=>"@",                                                                     //Se obtiene con OpenSSL y con archivo .cer
                      "FormaPago"=> $arr['Factura'][0]['Forma_Pago'],                                    //Debe de conicidir con el catalogo del SAT
                      "MetodoPago"=> $arr['Factura'][0]['Metodo_Pago'],                                  //Debe de conicidir con el catalogo del SAT y depende de la forma de pago
                      "NoCertificado"=> $arr['Empresa'][0]['noCertificado'],                               //Se obtiene con el archivo .cer con el siguiente comando con OpenSSL (OpenSSl x509 -inform DER -outform PEM -in C:\wamp64\www\Prosalon\Sellos\CSD_Pruebas_CFDI_LAN8507268IA\CSD_Prueba_CFDI_LAN8507268IA.cer -noout -serial) serial=3230303031303030303030333030303232383136 (El resultado esta en hexadecimal).
                      "Certificado"=>"@",                                                                //Se obtiene con el archivo .cer y .key 
                      "SubTotal"=> number_format($SubTotal, 2, '.', ''),                                                     //La suma de todos los importes de los movimientos
                      "Total"=> number_format($Factura, 2, '.', ''),                                       
                      "Moneda"=> $arr['Factura'][0]['Moneda'],                                            //Debe de conicidir con el catalogo del SAT (Por omisión Quedara como MXN).
                      "Descuento"=> number_format($Descuento, 2, '.', ''),
                      "TipoCambio"=>$Tipo_Cambio,                                                                  //Dependiendo de la moneda sera necesario modificarlo (Como por omisión es MXN el tipo de cambio debe de ser 1).
                      "TipoDeComprobante"=> $arr['Factura'][0]['Tipo_Comprobante'],                            //Debe de conicidir con el catalogo del SAT (Los valores validos son I, E, N y como complemento P).
                      "LugarExpedicion"=> $arr['Factura'][0]['Lugar_Expedicion']                                           //El lugar de expedición es del CP del emisor en este caso de la empresa.
                   )
                );


}

/////////////////////////////////////////////////////////
///                                                   ///
///   Para mostrar la relacion de los CFDi's          ///
///     en caso de cancelación on notas de credito    ///
///                                                   ///
/////////////////////////////////////////////////////////

function satxmlsv33_relacionados($arr, $edidata, $dir,$nodo,$addenda) {
    global $root, $xml;

    if (empty($arr['Relacionado']) == false && isset($arr['Relacionado'])) {

      /*for ($i=0; $i <= count($arr['Relacionado'])-1; $i++) 
      { */
        $cfdis = $xml->createElement("cfdi:CfdiRelacionados");
        $cfdis = $root->appendChild($cfdis);

        for ($i=0; $i <= count($arr['Relacionado'])-1; $i++) 
        {

        $this->satxmlsv33_cargaAtt($cfdis, array("TipoRelacion"=> $arr['Relacionado'][$i]['Tipo_Relacion']));        //Debe de coicidir con el catalogo del SAT
        $cfdi = $xml->createElement("cfdi:CfdiRelacionado");
        $cfdi = $cfdis->appendChild($cfdi);
        $this->satxmlsv33_cargaAtt($cfdi, array("UUID"=>$arr['Relacionado'][$i]['UUID']));                        //Este valor es el UUID del comprobante relacionado

        }
      //}
    }
}


/////////////////////////////////////////////////////////
///                                                   ///
///                 Datos del EMISOR                  ///
///                                                   ///
///                                                   ///
/////////////////////////////////////////////////////////

function satxmlsv33_emisor($arr, $edidata, $dir,$nodo,$addenda) {
global $root, $xml;
$emisor = $xml->createElement("cfdi:Emisor");
$emisor = $root->appendChild($emisor);
$this->satxmlsv33_cargaAtt($emisor, array("Rfc"=> $arr['Factura'][0]['Emisor_RFC'],                               //El RFC del emisor debe de contar con digitos necesarios dependiendo si es persona moral o fisica
                       "Nombre"=>  $arr['Factura'][0]['Emisor'],                                      //Razón Social de la empresa (como estan registradas ante el SAT).
                       "RegimenFiscal"=> $arr['Factura'][0]['Clave_Regimen_Fiscal']                        //Debe de coicidir con el catalogo del SAT dependiendo del tipo de RFC de la empresa
                   )
                );
}


/////////////////////////////////////////////////////////
///                                                   ///
///                 Datos del RECEPTOR                ///
///                                                   ///
///                                                   ///
/////////////////////////////////////////////////////////

function satxmlsv33_receptor($arr, $edidata, $dir,$nodo,$addenda) {
global $root, $xml;
$receptor = $xml->createElement("cfdi:Receptor");
$receptor = $root->appendChild($receptor);
$nombre = $this->satxmlsv33_fix_chr($arr['Factura'][0]['Receptor']);                                       //Quita valores NO validos del nombre del cliente
$this->satxmlsv33_cargaAtt($receptor, array("Rfc"=> $arr['Factura'][0]['Receptor_RFC'],                            //RFC del cliente
                          "Nombre"=>$nombre,                                                              //Nombre del cliente
                          "UsoCFDI"=> $arr['Factura'][0]['Uso_CFDI']                                       //Debe de coicidir con el catalogo del SAT (El cliente lo proporciona a la empresa)
                      )
                  );
}

/////////////////////////////////////////////////////////
///                                                   ///
///  Detalle de los conceptos/productos de la factura ///
///                                                   ///
///                                                   ///
/////////////////////////////////////////////////////////

function satxmlsv33_conceptos($arr, $edidata, $dir,$nodo,$addenda) {
global $root, $xml, $TotalImporte;

$Importe_Factura        = 0;
$Valor_Unitario_Factura = 0;
//Se debe d e obtener desde la tabla
$IVA                    = 0;
$Contador_Retenciones   = 0;
$ContadorISR            = 0;
$ContadorIVA            = 0;
$Tipo_Factor_ISR        = 0;
$TasaoCuota_ISR         = 0;
$Tipo_Factor_IVA        = 0;
$TasaoCuota_IVA         = 0;

$conceptos = $xml->createElement("cfdi:Conceptos");
$conceptos = $root->appendChild($conceptos);
//for ($i=1; $i<=sizeof($arr['Conceptos']); $i++) {

$listImpuesto = count($arr['Impuesto']);

/*IVA*/
for ($i=0; $i <= $listImpuesto -1 ; $i++)
{ 
    if ($arr['Impuesto'][$i]['Tipo'] == 'Traslado')
    {
       $IVA         = $arr['Impuesto'][$i]['Tasa_Cuota'] / 100;
       $Impuesto    = $arr['Impuesto'][$i]['Impuesto'];
       $Tipo_Factor = $arr['Impuesto'][$i]['Tipo_Factor'];
       
       $Tasa = $arr['Impuesto'][$i]['Tasa_Cuota'] / 100;

          $Longitud_Tasa = strlen($Tasa);

          switch ($Longitud_Tasa)
          {
            case 3:
               $TasaoCuota = $Tasa.'00000';
              break;
            case 4:
               $TasaoCuota = $Tasa.'0000';
              break;
            case 5:
               $TasaoCuota = $Tasa.'000';
              break;
            case 6:
               $TasaoCuota = $Tasa.'00';
              break;
            case 7:
               $TasaoCuota = $Tasa.'0';
              break;
            case 8:
               $TasaoCuota = $Tasa;
              break;
          }

    }


  if ($arr['Impuesto'][$i]['Tipo'] != 'Traslado')
  {
    $Contador_Retenciones ++;

      if ($arr['Impuesto'][$i]['Impuesto'] == '001')
      {
        $Tipo_Factor_ISR  = $arr['Impuesto'][$i]['Tipo_Factor'];

         $Tasa_Retencion_ISR = $arr['Impuesto'][$i]['Tasa_Cuota'] / 100;

          $Longitud_Tasa = strlen($Tasa_Retencion_ISR);

          switch ($Longitud_Tasa)
          {
            case 3:
               $TasaoCuota_ISR = $Tasa_Retencion_ISR.'00000';
              break;
            case 4:
               $TasaoCuota_ISR = $Tasa_Retencion_ISR.'0000';
              break;
            case 5:
               $TasaoCuota_ISR = $Tasa_Retencion_ISR.'000';
              break;
            case 6:
               $TasaoCuota_ISR = $Tasa_Retencion_ISR.'00';
              break;
            case 7:
               $TasaoCuota_ISR = $Tasa_Retencion_ISR.'0';
              break;
            case 8:
               $TasaoCuota_ISR = $Tasa_Retencion_ISR;
              break;
            case 9:
              $TasaoCuota_ISR = substr($Tasa_Retencion_ISR, 0, -1); 
              break;
            case 10:
              $TasaoCuota_ISR = substr($Tasa_Retencion_ISR, 0, -2); 
              break;
          }

        $ContadorISR++;
      }
      
      elseif ($arr['Impuesto'][$i]['Impuesto'] == '002')
      {
        $Tipo_Factor_IVA  = $arr['Impuesto'][$i]['Tipo_Factor'];

         $Tasa_Retencion_IVA = $arr['Impuesto'][$i]['Tasa_Cuota'] / 100;

          $Longitud_Tasa = strlen($Tasa_Retencion_IVA);

          switch ($Longitud_Tasa)
          {
            case 3:
               $TasaoCuota_IVA = $Tasa_Retencion_IVA.'00000';
              break;
            case 4:
               $TasaoCuota_IVA = $Tasa_Retencion_IVA.'0000';
              break;
            case 5:
               $TasaoCuota_IVA = $Tasa_Retencion_IVA.'000';
              break;
            case 6:
               $TasaoCuota_IVA = $Tasa_Retencion_IVA.'00';
              break;
            case 7:
               $TasaoCuota_IVA = $Tasa_Retencion_IVA.'0';
              break;
            case 8:
               $TasaoCuota_IVA = $Tasa_Retencion_IVA;
              break;
            case 9:
              $TasaoCuota_IVA = substr($Tasa_Retencion_IVA, 0, -1); 
              break;
            case 10:
              $TasaoCuota_IVA = substr($Tasa_Retencion_IVA, 0, -2); 
              break;
          }

        $ContadorIVA++;
      }
  }
}

//Total Listado de Productos
$listProducts = count($arr['Factura']);

for ($i=0; $i<=$listProducts-1; $i++) {



    $concepto = $xml->createElement("cfdi:Concepto");
    $concepto = $conceptos->appendChild($concepto);
    //$prun = $arr['Conceptos'][$i]['valorUnitario'];
    $descripcion = $this->satxmlsv33_fix_chr($arr['Factura'][$i]['Producto']);                                //Quita caracteres invalidos del concepto de la factura
    $this->satxmlsv33_cargaAtt($concepto, 
        array("Cantidad"        => $arr['Factura'][$i]['Cantidad'],                                                                 //Cantidad de produto adquirido por el cliente por movimiento
              "Unidad"          => $arr['Factura'][$i]['Unidad'],                                                               //Con la nueva versión de facturacion todo producto debe de llevar una unidad de medida
              "NoIdentificacion"=> $arr['Factura'][$i]['Codigo'],                                                      //Este campo es opcional y muestra el codigo del producto
              "Descripcion"     =>$descripcion,                                                     //Descripción (nombre) del producto adquirido
              "ValorUnitario"   => number_format($arr['Factura'][$i]['Valor_Unitario'], 2, '.', ''),                                                          //Precio unitario del producto adquirido
              "Importe"         => number_format($arr['Factura'][$i]['Valor_Unitario'] * $arr['Factura'][$i]['Cantidad'], 2, '.', ''),                                                                //Este valor se obtiene al multiplicar Cantidad * ValorUnitario = Importe
              "ClaveProdServ"   => $arr['Factura'][$i]['Clave_SAT'],                                                     //Debe de concidir con el catalo del SAT (esto en todos los productos)
              "ClaveUnidad"     => $arr['Factura'][$i]['Clave_Unidad'],                                                             //Debe de concidir con el catalo del SAT y con la unidad de medida que tiene el producto
              "Descuento"       => number_format($arr['Factura'][$i]['Descuento_Movimiento'], 2, '.', '')
             )
        );
    if ($addenda!="pago")
    {

        //Traslados
        $impuestos = $xml->createElement("cfdi:Impuestos");
        $impuestos = $concepto->appendChild($impuestos);
        $traslados = $xml->createElement("cfdi:Traslados");
        $traslados = $impuestos->appendChild($traslados);
        $traslado  = $xml->createElement("cfdi:Traslado");
        $traslado  = $traslados->appendChild($traslado);

        //Retenciones
      

        //Movimientos Traslado
        $ImporteIVA = $arr['Factura'][$i]['Importe_Movimiento'] * $IVA;
        $TotalImporte += $ImporteIVA;
        $this->satxmlsv33_cargaAtt($traslado, 
            array("Base"=> $arr['Factura'][$i]['Importe_Movimiento'],                                                                //Base es igual al subtotal
                  "Impuesto"=>$Impuesto,                                                            //Debe de concidir con el catalo del SAT para este porgrama se utiliza solo el IVA por lo que el valor es 002
                  "TipoFactor"=>$Tipo_Factor,                                                         //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA por lo que el valor es Tasa
                  "TasaOCuota"=>$TasaoCuota,                                                     //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA al 16% por lo que el valor es 0.160000
                  "Importe"=> number_format($ImporteIVA, 2, '.', '')                                                             //Es igual Base * TasaOCuota es decir el IVA por cada producto
                 )
             );  

        if ($Contador_Retenciones != 0)
        {
            $retenciones = $xml->createElement("cfdi:Retenciones");
            $retenciones = $impuestos->appendChild($retenciones);

            if ($ContadorISR != 0)
            {

              $retencion   = $xml->createElement("cfdi:Retencion");
              $retencion   = $retenciones->appendChild($retencion);
              //Movimientos Retencion
            $ImporteIVA = $arr['Factura'][$i]['Importe_Movimiento'] * $Tasa_Retencion_ISR;
            $TotalImporte += $ImporteIVA;
            $this->satxmlsv33_cargaAtt($retencion, 
                array("Base"=> $arr['Factura'][$i]['Importe_Movimiento'],                                                                //Base es igual al subtotal
                      "Impuesto"=>"001",                                                            //Debe de concidir con el catalo del SAT para este porgrama se utiliza solo el IVA por lo que el valor es 002
                      "TipoFactor"=>$Tipo_Factor_ISR,                                                         //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA por lo que el valor es Tasa
                      "TasaOCuota"=>$TasaoCuota_ISR,                                                     //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA al 16% por lo que el valor es 0.160000
                      "Importe"=> number_format($ImporteIVA, 2, '.', '')                                                             //Es igual Base * TasaOCuota es decir el IVA por cada producto
                     )
                 );
            }

            if ($ContadorIVA != 0)
            {

              $retencion   = $xml->createElement("cfdi:Retencion");
              $retencion   = $retenciones->appendChild($retencion);
              //Movimientos Retencion
            $ImporteIVA = $arr['Factura'][$i]['Importe_Movimiento'] * $Tasa_Retencion_IVA;
            $TotalImporte += $ImporteIVA;
            $this->satxmlsv33_cargaAtt($retencion, 
                array("Base"=> $arr['Factura'][$i]['Importe_Movimiento'],                                                                //Base es igual al subtotal
                      "Impuesto"=>"002",                                                            //Debe de concidir con el catalo del SAT para este porgrama se utiliza solo el IVA por lo que el valor es 002
                      "TipoFactor"=>$Tipo_Factor_IVA,                                                         //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA por lo que el valor es Tasa
                      "TasaOCuota"=>$TasaoCuota_IVA,                                                     //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA al 16% por lo que el valor es 0.160000
                      "Importe"=> number_format($ImporteIVA, 2, '.', '')                                                             //Es igual Base * TasaOCuota es decir el IVA por cada producto
                     )
                 );
            }

      }
  /*$ImpuetosTotal = $xml->createElement("cfdi:Impuestos");
  $ImpuetosTotal = $root->appendChild($ImpuetosTotal);
  $ImpuetosTotal->SetAttribute("TotalImpuestosTrasladados",$TotalImporte); */

     }
}


}

/////////////////////////////////////////////////////////
///                                                   ///
///              Datos del Impuesto (IVA)             ///
///                                                   ///
///                                                   ///
/////////////////////////////////////////////////////////

function satxmlsv33_impuestos($arr, $edidata, $dir,$nodo,$addenda) {
global $root, $xml, $TotalImporte;

if ($addenda!="pago") {

    $ImpuestosComprobante = $xml->createElement("cfdi:Impuestos");
    $ImpuestosComprobante = $root->appendChild($ImpuestosComprobante);

    $Reten = $this->GetRetenciones($arr);

    if ($Reten != 0)
    {
      //Retenciones
      $retencionesImpuestos = $xml->createElement("cfdi:Retenciones");
      $retencionesImpuestos = $ImpuestosComprobante->appendChild($retencionesImpuestos);

    }


        //Traslados
    $trasladosImpuestos = $xml->createElement("cfdi:Traslados");
    $trasladosImpuestos = $ImpuestosComprobante->appendChild($trasladosImpuestos);
   
    //foreach ($arr as $TasaOCuota => $impu) {
    $listImpuesto = count($arr['Impuesto']);
    $listProducto = count($arr['Factura']);

    for ($i=0; $i <= $listProducto -1; $i++)
    { 
      $Total_Retenciones_ISR += $arr['Factura'][$i]['Retencion_ISR'];
      $Total_Retenciones_IVA += $arr['Factura'][$i]['Retencion_IVA'];
      $Total_Impuestos       += $arr['Factura'][$i]['Impuesto_Movimiento'];
    }

    $Total_Retenciones = $Total_Retenciones_ISR + $Total_Retenciones_IVA;

    for ($i=0; $i<=$listImpuesto-1; $i++)
    {
        // echo "Tasa=$TasaOCuota impu=$impu\n";

        if ($arr['Impuesto'][$i]['Tipo'] != 'Traslado')
        {

          $retenido = $xml->createElement("cfdi:Retencion");
          $retenido = $retencionesImpuestos->appendChild($retenido);

          if ($arr['Impuesto'][$i]['Impuesto'] == '002')
          {
               $this->satxmlsv33_cargaAtt($retenido, 
             array("Impuesto"=>$arr['Impuesto'][$i]['Impuesto'],                                                          //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA al 16% por lo que el valor es 0.160000
                   "Importe"=> number_format($Total_Retenciones_IVA, 2, '.', '')                                                               //Impuesto correspondiente a tods los productos a facturar
                  )
              );
          }
          else
          {
                $this->satxmlsv33_cargaAtt($retenido, 
             array("Impuesto"=>$arr['Impuesto'][$i]['Impuesto'],                                                          //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA al 16% por lo que el valor es 0.160000
                   "Importe"=> number_format($Total_Retenciones_ISR, 2, '.', '')                                                               //Impuesto correspondiente a tods los productos a facturar
                  )
              );
          }

         
        }
        else
        {

           $Tasa = $arr['Impuesto'][$i]['Tasa_Cuota'] / 100;

          $Longitud_Tasa = strlen($Tasa);

          switch ($Longitud_Tasa)
          {
            case 3:
               $TasaoCuota = $Tasa.'00000';
              break;
            case 4:
               $TasaoCuota = $Tasa.'0000';
              break;
            case 5:
               $TasaoCuota = $Tasa.'000';
              break;
            case 6:
               $TasaoCuota = $Tasa.'00';
              break;
            case 7:
               $TasaoCuota = $Tasa.'0';
              break;
            case 8:
               $TasaoCuota = $Tasa;
              break;
          }

        $traslado = $xml->createElement("cfdi:Traslado");
        $traslado = $trasladosImpuestos->appendChild($traslado);

        $this->satxmlsv33_cargaAtt($traslado, 
           array("Impuesto"=>$arr['Impuesto'][$i]['Impuesto'],                                                              //Debe de concidir con el catalo del SAT para este porgrama se utiliza solo el IVA por lo que el valor es 002
                 "TipoFactor"=>$arr['Impuesto'][$i]['Tipo_Factor'],                                                           //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA por lo que el valor es Tasa
                 "TasaOCuota"=>$TasaoCuota,                                                       //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA al 16% por lo que el valor es 0.160000
                 "Importe"=> number_format($Total_Impuestos, 2, '.', '')                                                               //Impuesto correspondiente a tods los productos a facturar
                )
            );     
        }
        
    }
    

    $ImpuestosComprobante->SetAttribute("TotalImpuestosTrasladados",number_format($Total_Impuestos, 2, '.', ''));                                   //Suma de todos los importes del IVA de todos los produtos

    $Reten = $this->GetRetenciones($arr);

    if ($Reten != 0)
    {
      $ImpuestosComprobante->SetAttribute("TotalImpuestosRetenidos",number_format($Total_Retenciones, 2, '.', ''));  
    }
    
}

}


///////////////////////////////////////////////////////////////
///                                                         ///
///     Complementos en caso que el cliente los necesite    ///
///                                                         ///
///                                                         ///
///////////////////////////////////////////////////////////////


// {{{ Complemento fiscales
function satxmlsv33_complemento($arr, $edidata, $dir,$nodo,$addenda) {
global $root, $xml;
    if ($addenda=="detallista") {
        $this->satxmlsv33_complemento_detallista($arr, $edidata, $dir, $nodo, $addenda);
    } elseif ($addenda=="cce") {
        $this->satxmlsv33_complemento_cce($arr, $edidata, $dir, $nodo, $addenda);
    } elseif ($addenda=="pago") {
        $this->satxmlsv33_complemento_pago($arr, $edidata, $dir, $nodo, $addenda);
    }
}
// }}}

// {{{ Complemento detallista
function satxmlsv33_complemento_detallista($arr, $edidata, $dir,$nodo,$addenda) {
global $root, $xml;
    $Complemento = $xml->createElement("cfdi:Complemento");
    $Complemento = $root->appendChild($Complemento);
    $detallista = $xml->createElement("detallista:detallista");
    $detallista->SetAttribute("type","SimpleInvoiceType");
    $detallista->SetAttribute("contentVersion","1.3.1");
    $detallista->SetAttribute("documentStructureVersion","AMC8.1"); 
    $detallista->SetAttribute("documentStatus","ORIGINAL");
       $requestForPaymentIdentification = $xml->createElement("detallista:requestForPaymentIdentification");
           $entityType = $xml->createElement("detallista:entityType","INVOICE");
           $entityType = $requestForPaymentIdentification->appendChild($entityType);
       $requestForPaymentIdentification = $detallista->appendChild($requestForPaymentIdentification);

       $specialInstruction = $xml->createElement("detallista:specialInstruction");
       $specialInstruction->setAttribute("code","ZZZ");
       $text = $xml->createElement("detallista:text", numealet($arr['total']));
       $tmp = $specialInstruction->appendChild($text);
       $tmp = $detallista->appendChild($specialInstruction);

       $orderIdentification = $xml->createElement("detallista:orderIdentification");
           $referenceIdentification = $xml->createElement("detallista:referenceIdentification",trim($arr['Complemento']['npec']));
           $referenceIdentification->SetAttribute("type","ON");
           $referenceIdentification = $orderIdentification->appendChild($referenceIdentification);
           $ReferenceDate = $xml->createElement("detallista:ReferenceDate",satxmlsv33_xml_fix_fech($arr['Complemento']['fpec']));
           $ReferenceDate = $orderIdentification->appendChild($ReferenceDate);
       $orderIdentification = $detallista->appendChild($orderIdentification);

       $AdditionalInformation = $xml->createElement("detallista:AdditionalInformation");
           $referenceIdentification = $xml->createElement("detallista:referenceIdentification",$arr['serie'].$arr['folio']);
           $referenceIdentification->SetAttribute("type","IV");
           $referenceIdentification = $AdditionalInformation->appendChild($referenceIdentification);
       $AdditionalInformation = $detallista->appendChild($AdditionalInformation);

       $buyer = $xml->createElement("detallista:buyer");
           $gln = $xml->createElement("detallista:gln",trim($arr['Complemento']['gln']));
           $gln = $buyer->appendChild($gln);
       $buyer = $detallista->appendChild($buyer);

       $seller = $xml->createElement("detallista:seller");
       $gln = $xml->createElement("detallista:gln",trim($arr['Complemento']['gln2']));
       $alternatePartyIdentification = $xml->createElement("detallista:alternatePartyIdentification",trim($arr['Complemento']['proveedor']));
       $alternatePartyIdentification->setAttribute("type","SELLER_ASSIGNED_IDENTIFIER_FOR_A_PARTY");
       $tmp = $seller->appendChild($gln);
       $tmp = $seller->appendChild($alternatePartyIdentification);
       $tmp = $detallista->appendChild($seller);

       if ($arr['Complemento']['ship']) {
          $shipto = $xml->createElement("detallista:shipTo");
          $gln = $xml->createElement("detallista:gln",trim($arr['Complemento']['ship'])); 
          $tmp = $shipto->appendChild($gln);
          $tmp = $detallista->appendChild($shipto);
       }

       for ($i=1; $i<=sizeof($arr['Conceptos']); $i++) {
           $lineItem = $xml->createElement("detallista:lineItem");
           $lineItem->SetAttribute("type","SimpleInvoiceLineItemType");
           $lineItem->SetAttribute("number",$i);

               $tradeItemIdentification = $xml->createElement("detallista:tradeItemIdentification");
                   $gtin = $xml->createElement("detallista:gtin",trim($arr['Conceptos'][$i]['gtin']));
                   $gtin = $tradeItemIdentification->appendChild($gtin);
               $tradeItemIdentification = $lineItem->appendChild($tradeItemIdentification);

               $alternateTradeItemIdentification = $xml->createElement("detallista:alternateTradeItemIdentification",$arr['Conceptos'][$i]['hebprod']);
               $alternateTradeItemIdentification->setAttribute("type","BUYER_ASSIGNED");
               $tmp = $lineItem->appendChild($alternateTradeItemIdentification);

               $tradeItemDescriptionInformation = $xml->createElement("detallista:tradeItemDescriptionInformation");
               $tradeItemDescriptionInformation->SetAttribute("language","ES");
                   $longText = $xml->createElement("detallista:longText",$arr['Conceptos'][$i]['descripcion']);
                   $longText = $tradeItemDescriptionInformation->appendChild($longText);
               $tradeItemDescriptionInformation = $lineItem->appendChild($tradeItemDescriptionInformation);

               $invoicedQuantity = $xml->createElement("detallista:invoicedQuantity",$arr['Conceptos'][$i]['cantidad']);
               $invoicedQuantity->SetAttribute("unitOfMeasure","CS");
               $invoicedQuantity = $lineItem->appendChild($invoicedQuantity);

               $grossPrice = $xml->createElement("detallista:grossPrice");
                   $Amount = $xml->createElement("detallista:Amount",$arr['Conceptos'][$i]['prun']);
                   $Amount = $grossPrice->appendChild($Amount);
               $grossPrice = $lineItem->appendChild($grossPrice);

               $netPrice = $xml->createElement("detallista:netPrice");
                   $Amount = $xml->createElement("detallista:Amount",$arr['Conceptos'][$i]['neto'] / $arr['Conceptos'][$i]['cantidad']);
                   $Amount = $netPrice->appendChild($Amount);
               $netPrice = $lineItem->appendChild($netPrice);

               $tradeItemTaxInformation = $xml->createElement("detallista:tradeItemTaxInformation");
                   $taxTypeDescription = $xml->createElement("detallista:taxTypeDescription","VAT");
                   $taxTypeDescription = $tradeItemTaxInformation->appendChild($taxTypeDescription);

                   $tradeItemTaxAmount = $xml->createElement("detallista:tradeItemTaxAmount");
                   $taxPercentage = $xml->createElement("detallista:taxPercentage",$arr['Conceptos'][$i]['poim']);
                       $taxPercentage = $tradeItemTaxAmount->appendChild($taxPercentage);

                       $taxAmount = $xml->createElement("detallista:taxAmount",$arr['Conceptos'][$i]['impu']);
                       $taxAmount = $tradeItemTaxAmount->appendChild($taxAmount);
                   $tradeItemTaxAmount = $tradeItemTaxInformation->appendChild($tradeItemTaxAmount);

                   $taxCategory = $xml->createElement("detallista:taxCategory","TRANSFERIDO");
                   $taxCategory = $tradeItemTaxInformation->appendChild($taxCategory);
               $tradeItemTaxInformation = $lineItem->appendChild($tradeItemTaxInformation);

               $totalLineAmount = $xml->createElement("detallista:totalLineAmount");
                   $netAmount = $xml->createElement("detallista:netAmount");
                       $Amount = $xml->createElement("detallista:Amount",$arr['Conceptos'][$i]['importe']);
                       $Amount = $netAmount->appendChild($Amount);
                   $netAmount = $totalLineAmount->appendChild($netAmount);
               $totalLineAmount = $lineItem->appendChild($totalLineAmount);

           $lineItem = $detallista->appendChild($lineItem);

       }

       $totalAmount = $xml->createElement("detallista:totalAmount");
           $Amount = $xml->createElement("detallista:Amount",$arr['total']);
           $Amount = $totalAmount->appendChild($Amount);
       $totalAmount = $detallista->appendChild($totalAmount);

    $detallista = $Complemento->appendChild($detallista);
}
// }}}

// {{{ Complemento Comercio Exterior cce
function satxmlsv33_complemento_cce($arr, $edidata, $dir,$nodo,$addenda) {
global $root, $xml;
    $Complemento = $xml->createElement("cfdi:Complemento");
    $Complemento = $root->appendChild($Complemento);
    $cce11 = $xml->createElement("cce11:ComercioExterior");
    $cce11->SetAttribute("Version","1.1");
    $cce11->SetAttribute("TipoOperacion",$arr["Complemento"]["TipoOperacion"]);
    $cce11->SetAttribute("ClaveDePedimento",$arr["Complemento"]["ClaveDePedimento"]);
    $cce11->SetAttribute("CertificadoOrigen",$arr["Complemento"]["CertificadoOrigen"]);
    $cce11->SetAttribute("Incoterm",$arr["Complemento"]["Incoterm"]);
    $cce11->SetAttribute("Subdivision",$arr["Complemento"]["Subdivision"]);
    $cce11->SetAttribute("TipoCambioUSD",$arr["Complemento"]["TipoCambioUSD"]);
    $cce11->SetAttribute("TotalUSD",$arr["Complemento"]["TotalUSD"]);
       $Receptor = $xml->createElement("cce11:Receptor");
       $Receptor->SetAttribute("NumRegIdTrib",$arr["Complemento"]["Receptor"]["NumRegIdTrib"]);
       $Receptor = $cce11->appendChild($Receptor);

       $Mercancias = $xml->createElement("cce11:Mercancias");
       for ($i=1; $i<=sizeof($arr['Conceptos']); $i++) {
           $Mercancia = $xml->createElement("cce11:Mercancia");
           $Mercancia->SetAttribute("NoIdentificacion",$arr["Conceptos"][$i]["NoIdentificacion"]);
           if ($arr["Conceptos"][$i]["FraccionArancelaria"]!="") {
               $Mercancia->SetAttribute("FraccionArancelaria",$arr["Conceptos"][$i]["FraccionArancelaria"]);
           }
           $Mercancia->SetAttribute("ValorDolares",$arr["Conceptos"][$i]["ValorDolares"]);
           $Mercancia->SetAttribute("UnidadAduana",$arr["Conceptos"][$i]["UnidadAduana"]);
           $Mercancia->SetAttribute("ValorUnitarioAduana",$arr["Conceptos"][$i]["ValorUnitarioAduana"]);
           $Mercancia->SetAttribute("CantidadAduana",$arr["Conceptos"][$i]["CantidadAduana"]);

           $Mercancia = $Mercancias->appendChild($Mercancia);
       }
       $Mercancias = $cce11->appendChild($Mercancias);

    $cce11 = $Complemento->appendChild($cce11);
}
// }}}

// {{{ Complemento Pago
function satxmlsv33_complemento_pago($arr, $edidata, $dir,$nodo,$addenda) {
global $root, $xml;
    $Complemento = $xml->createElement("cfdi:Complemento");
    $pagos = $xml->createElement("pago10:Pagos");
    $pagos->SetAttribute("Version","1.0");
    $pago = $xml->createElement("pago10:Pago");
    satxmlsv33_cargaAtt($pago, 
          array("FechaPago"=>$arr["Pago"]["FechaPago"],
                "MonedaP"=>"MXN",
                "Monto"=>$arr["Pago"]['Monto'],
                "FormaDePagoP"=>$arr["Pago"]['FormaDePagoP']
            ));
    for ($i=1; $i<=sizeof($arr['Pago']['Docto']); $i++) {
        $Docto = $xml->createElement("pago10:DoctoRelacionado");
        satxmlsv33_cargaAtt($Docto, 
          array("IdDocumento"=>$arr["Pago"]['Docto'][$i]["uuid"],
                "ImpPagado"=>$arr["Pago"]['Docto'][$i]["ImpPagado"],
                "MonedaDR"=>"MXN",
                "MetodoDePagoDR"=>"PIP",
                "NumParcialdiad"=>$arr["Pago"]['Docto'][$i]["NumParcialdiad"],
                "ImpSaldoAnt"=>$arr["Pago"]['Docto'][$i]["ImpSaldoAnt"],
                "ImpSaldoInsoluto"=>$arr["Pago"]['Docto'][$i]["ImpSaldoInsoluto"]
        ));
        $Docto = $pago->appendChild($Docto);
    }
    $pago = $pagos->appendChild($pago);
    $pagos = $Complemento->appendChild($pagos);
    $Complemento = $root->appendChild($Complemento);
}

///////////////////////////////////////////////////////////////
///           FIN   Complementos en caso que el cliente     ///
///               los necesite                              ///
///                                                         ///
///////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////
///                                                   ///
/// Funcion que carga los atributos a la etiqueta XML ///
///                                                   ///
///                                                   ///
/////////////////////////////////////////////////////////

function satxmlsv33_cargaAtt(&$nodo, $attr) {
global $xml, $sello;
$quitar = array('sello'=>1,'noCertificado'=>1,'certificado'=>1);
foreach ($attr as $key => $val) {
    for ($i=0;$i<strlen($val); $i++) {
        $a = substr($val,$i,1);
        if ($a > chr(127) && $a !== chr(219) && $a !== chr(211) && $a !== chr(209)) {
            $val = substr_replace($val, ".", $i, 1);
        }
    }
    $val = preg_replace('/\s\s+/', ' ', $val);   // Regla 5a y 5c
    $val = trim($val);                           // Regla 5b
    if (strlen($val)>0) {   // Regla 6
        $val = str_replace(array('"','>','<'),"'",$val);  // &...;
        $val = utf8_encode(str_replace("|","/",$val)); // Regla 1
        $nodo->setAttribute($key,$val);
    }
}
}

/////////////////////////////////////////////////////////////
///                                                       ///
/// Funcion que regresa la fecha con el formato necesario ///
///                                                       ///
///                                                       ///
/////////////////////////////////////////////////////////////

function satxmlsv33_xml_fech($fech) {
    $ano = substr($fech,0,4);
    $mes = substr($fech,5,2);
    $dia = substr($fech,8,2);
    $hor = substr($fech,11,2);
    $min = substr($fech,14,2);
    $seg = substr($fech,17,2);
    $aux = $ano."-".$mes."-".$dia."T".$hor.":".$min.":".$seg;
    if ($aux == "--T::")
        $aux = "";
    return ($aux);
}

//////////////////////////////////////////////////////////
///                                                    ///
/// Funcion que quita caractceres especiales a nombres ///
///                                                    ///
///                                                    ///
//////////////////////////////////////////////////////////

function satxmlsv33_fix_chr($nomb) {
    $nomb = str_replace(array(".","/")," ",$nomb);
    return ($nomb);
}

//////////////////////////////////////////////////////////
///                                                    ///
/// Valida el XML con el archivo cfdv33.xsd del SAT    ///
///                                                    ///
///                                                    ///
//////////////////////////////////////////////////////////

function satxmlsv33_valida() {
global $xml, $texto;
$xml->formatOutput=true;
$paso = new DOMDocument("1.0","UTF-8");
$texto = $xml->saveXML();
$paso->loadXML($texto);
file_put_contents("paso.xml",$texto);
$ruta = "http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd";
//$file = $ruta ."cfdv32.xsd"; 
$ok = $paso->schemaValidate($ruta);

return $ok;
}


//////////////////////////////////////////////////////////
///                                                    ///
/// Función que genera la cadena original              ///
///                                                    ///
///                                                    ///
//////////////////////////////////////////////////////////

function satxmlsv33_genera_cadena_original(){
global $xml, $cadena_original;
$paso = new DOMDocument("1.0","UTF-8");
$proc = new XSLTProcessor;
$paso->loadXML($xml->saveXML());
$xsl = new DOMDocument("1.0","UTF-8");
//http://www.sat.gob.mx/sitio_internet/cfd/3/cadenaoriginal_3_3/cadenaoriginal_3_3.xslt
//$xsl->load('http://www.sat.gob.mx/sitio_internet/cfd/3/cadenaoriginal_3_3/cadenaoriginal_3_3.xslt');
$xsl->load($_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/ecodexphp/xslt/cadenaoriginal_3_3.xslt');
$proc->importStyleSheet($xsl); 
$cadena_original = $proc->transformToXML($paso);

}


//////////////////////////////////////////////////////////
///                                                    ///
/// Función que consigue el Sello y el certificado     ///
///      del comprobante con los archivos .key y .cer  ///
///      en su formato .pem                            ///
///                                                    ///
//////////////////////////////////////////////////////////

function satxmlsv33_sella($arr) {
global $root, $cadena_original, $sello;
$certificadoKEY = $arr['Empresa'][0]['CSD_key'];                                                    //Monde del Certificado vigente a utilizar
$certificadoCER = $arr['Empresa'][0]['CSD_cer'];                                                    //Monde del Certificado vigente a utilizar
//$ruta = $_SERVER['DOCUMENT_ROOT']."/Prosalon/Sellos/CSD/";                       //Ruta donde se encuentran los archivos .pem de los CSD
$file = $certificadoKEY.".pem";                                                            // Ruta al archivo .key en su formato .pem

// Obtiene la llave privada del Certificado de Sello Digital (CSD),
//    Ojo , Nunca es la FIEL/FEA
$pkeyid = openssl_pkey_get_private(file_get_contents($file));
openssl_sign($cadena_original, $crypttext, $pkeyid, OPENSSL_ALGO_SHA256);
openssl_free_key($pkeyid);

$sello = base64_encode($crypttext);                                                               // lo codifica en formato base64

$root->setAttribute('Sello',$sello);                                                              //Carga Sello al XML

$file = $certificadoCER.".pem";                                                            // Ruta al archivo de Llave publica en su formato .pem
$datos = file($file);
$certificadoCER = ""; $carga = false;
for ($i=0; $i<sizeof($datos); $i++) {
    if (strstr($datos[$i],"END CERTIFICATE")) $carga=false;
    if ($carga) $certificadoCER .= trim($datos[$i]);
    if (strstr($datos[$i],"BEGIN CERTIFICATE")) $carga=true;
}
// El certificado como base64 lo agrega al XML para simplificar la validacion

$root->setAttribute('Certificado', $certificadoCER);                                                  //Carga certificado al XML

}

//////////////////////////////////////////////////////////
///                                                    ///
/// Función que termina y guarda el XML ya sellado     ///
///                                                    ///
///                                                    ///
//////////////////////////////////////////////////////////


function satxmlsv33_termina($arr,$dir) {
global $xml, $conn, $sello, $cadena_original;
$hoy = date("_Ymd");
$xml->formatOutput = true;
$todo = $xml->saveXML();
$dir  =  $_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/XMLs/';                                                             //Ruta donde se guardaran los archivos XML sin timbrar
//$nufa = $arr['Empresa']['RFC'].'_'.rand(0,1000);                                                         // Junta el numero de factura   serie + folio para el nombre del archivo XML a crear;
$nufa = "xml_creado"; 

$paso = $todo;
file_put_contents("todo.xml",$todo);

    $xml->formatOutput = true;
    $file=$dir.$nufa.".xml";
//    $file=$dir.$nufa.$hoy.".xml";
    $xml->save($file);

return($todo);
}

/*function satxmlsv33_termina($arr,$dir) {
global $xml, $conn, $sello, $cadena_original;
$hoy = date("_Ymd");
$xml->formatOutput = true;
$todo = $xml->saveXML();
$dir  =  $_SERVER['DOCUMENT_ROOT'].'/avynaFacturacion/Prosalon/XMLs/';                                                             //Ruta donde se guardaran los archivos XML sin timbrar
$nufa = $arr['Empresa']['RFC'].'_'.rand(0,1000);                                                         // Junta el numero de factura   serie + folio para el nombre del archivo XML a crear;

$paso = $todo;
file_put_contents("todo.xml",$todo);

    $xml->formatOutput = true;
    $file=$dir.$nufa.$hoy.".xml";
    $xml->save($file);

return($todo);
}*/

//////////////////////////////////////////////////////////
///                                                    ///
/// Funcion de validacion al crear XML                 ///
///                                                    ///
///                                                    ///
//////////////////////////////////////////////////////////

function display_xml_errors() {
    global $texto;
    $lineas = explode("\n", $texto);
    $errors = libxml_get_errors();

    foreach ($errors as $error) {
        echo display_xml_error($error, $lineas);
    }

    libxml_clear_errors();
}

//////////////////////////////////////////////////////////
///                                                    ///
/// Funcion de validacion al crear XML                 ///
///                                                    ///
///                                                    ///
//////////////////////////////////////////////////////////

function display_xml_error($error, $lineas) {
    $return  = $lineas[$error->line - 1]. "\n";
    $return .= str_repeat('-', $error->column) . "^\n";

    switch ($error->level) {
        case LIBXML_ERR_WARNING:
            $return .= "Warning $error->code: ";
            break;
                                                       
         case LIBXML_ERR_ERROR:
            $return .= "Error $error->code: ";
            break;
        case LIBXML_ERR_FATAL:
            $return .= "Fatal Error $error->code: ";
            break;
    }

    $return .= trim($error->message) .
               "\n  Linea: $error->line" .
               "\n  Columna: $error->column";
    echo "$return\n\n--------------------------------------------\n\n";
}


function GetRetenciones($arr)
{
    $Contador_Retenciones = 0;
    $listImpuesto         = count($arr['Impuesto']);

    for ($i=0; $i<=$listImpuesto-1; $i++)
    {

        if ($arr['Impuesto'][$i]['Tipo'] != 'Traslado')
        {
          $Contador_Retenciones ++;
        }
    }

    return $Contador_Retenciones;
}

}                                                                                              //Fin de la clase CrearXML

?>