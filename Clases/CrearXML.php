<?php

date_default_timezone_set("America/Mexico_City");

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
/*$ok = $this->satxmlsv33_valida();
if (!$ok) {
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
  global $root, $xml, $fecha, $totalVenta, $globalDesc , $descAdicional, $descVenta, $gastosEnvio, $totalDescVenta, $descDistriduidor, $IVA, $IVA_2, $listProducts, $gastosAdmin, $totalFactura, $adicionalDescPorcentaje, $subtotalSI,  $totalDesc , $totalCI;
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

  $precioSI = 0;
  $importeSI = 0;
  $descuentoCD = 0;
  $importeBase = 0;
  $descuentoCC = 0;
  $totalDescCC = 0;
  $importeBaseCC = 0;
  $importeCI = 0;

  $fecha = date("Y-m-d H:i:s"); 

  // Obtener Total Venta Para Calcular El Descuento //
  /*if ($arr['Venta'][0]['Gastos_Admin'] == "50.00") {
    $totalVenta        = floatval($arr['TotalVenta'][0]['Total']) - 50.00;
  }
  else{
    $totalVenta        = $arr['TotalVenta'][0]['Total'];
  }*/

  $totalVenta        = $arr['TotalVenta'][0]['Total'];

  if (intval($arr['Venta'][0]['descuento_adicional']) != 0) {
    $descAdicional           = number_format(floatval($arr['Venta'][0]['descuento_adicional']), 8, '.', '');
    $adicionalDescPorcentaje = number_format(floatval($descAdicional / 100), 8, '.', '');
  }

  /*Obtener el Descuento*/
  $descVenta         = floatval($arr['Venta'][0]['Descuento']);
  $descDistriduidor  = number_format(($descVenta / $totalVenta), 6, '.', '');


  $globalDesc = $adicionalDescPorcentaje + $descDistriduidor;

  //IVA
  $IVA    = 1 + $arr['Monedas'][0]['Impuesto_%'] / 100;
  $IVA_2  = $arr['Monedas'][0]['Impuesto_%'] / 100;

  //Total Listado de Productos
  $listProducts = count($arr['Datos_Venta']);

  if (($descDistriduidor + $adicionalDescPorcentaje) < 1) {
    for ($i=0; $i<$listProducts; $i++){
      // Precio sin IVA //
      $precioSI             = number_format($arr['Datos_Venta'][$i]['Precio_unitario'] / $IVA, 6, '.', '');
      // Importe sin IVA //
      $importeSI            = $arr['Datos_Venta'][$i]['Cantidad'] * $precioSI;
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

  if ($arr['Venta'][0]['idCliente'] != 1967 && $arr['Venta'][0]['Ventas_Directas'] == 1) {
    $gastosEnvio = number_format(100 / $IVA, 6, '.', '');
    $subtotalSI   = $subtotalSI + $gastosEnvio;
    $totalCI      = $totalCI + number_format($gastosEnvio * $IVA_2, 6, '.', '');
  }

  if ($arr['Venta'][0]['Gastos_Admin'] == "50.00") {
    $gastosAdmin = number_format($arr['Venta'][0]['Gastos_Admin'] / $IVA, 2, '.', '');
    $subtotalSI   = $subtotalSI + $gastosAdmin;
    $totalCI      = $totalCI + number_format($gastosAdmin * $IVA_2, 2, '.', ''); 
  }

  if ($arr['Venta'][0]['idCliente'] == 1967 && floatval($arr['TotalVenta'][0]['Total']) <= 1000) {
    $gastosEnvio = number_format(100 / $IVA, 2, '.', '');
    $subtotalSI   = $subtotalSI + $gastosEnvio;
    $totalCI      = $totalCI + number_format($gastosEnvio * $IVA_2, 2, '.', ''); 
}

  // $totalFactura        = ($subtotalSI - $totalDesc) + $totalCI;
  $totalFactura        = (number_format( $subtotalSI, 2, '.', '') - number_format( $totalDesc, 2, '.', '')) + number_format( $totalCI, 2, '.', '');


  //  print_r($subtotalSI);
  // print_r("\n");
  // print_r($totalDesc);
  // print_r("\n");
  // print_r($totalCI);
  // print_r("\n");
  // print_r($totalFactura);
  // exit();

  if (($descDistriduidor + $adicionalDescPorcentaje) < 1) {

    $this->satxmlsv33_cargaAtt($root, 
      array("Version"=>"3.3",
        "Serie"=>  $arr['Formulario']['Serie'],
        "Folio"=> $arr['Formulario']['Folio'],
        "Fecha"=>$this->satxmlsv33_xml_fech($fecha),
        "Sello"=>"@",
        "FormaPago"=> $arr['Formulario']['ForPago'],
        "MetodoPago"=> $arr['Formulario']['MetPago'],
        "NoCertificado"=> $arr['Empresa'][0]['noCertificado'],
        "Certificado"=>"@", 
        "SubTotal"=> number_format( $subtotalSI, 2, '.', ''),
        "Total"=> bcdiv( $totalFactura, '1',2) ,
        "Moneda"=> $arr['Formulario']['Moneda'],
        "Descuento"=> number_format( $totalDesc, 2, '.', ''),
        "TipoDeComprobante"=> $arr['Formulario']['Compro'],
        "LugarExpedicion"=> $arr['Empresa'][0]['CP']
      )
    );
  }
  else{
    $this->satxmlsv33_cargaAtt($root, 
      array("Version"=>"3.3",
        "Serie"=>  $arr['Formulario']['Serie'],
        "Folio"=> $arr['Formulario']['Folio'],
        "Fecha"=>$this->satxmlsv33_xml_fech($fecha),
        "Sello"=>"@",
        "FormaPago"=> $arr['Formulario']['ForPago'],
        "MetodoPago"=> $arr['Formulario']['MetPago'],
        "NoCertificado"=> $arr['Empresa'][0]['noCertificado'],
        "Certificado"=>"@", 
        "SubTotal"=> number_format( $subtotalSI, 2, '.', ''),
        "Total"=> bcdiv( $totalFactura, '1',2) ,
        "Moneda"=> $arr['Formulario']['Moneda'],
        // "Descuento"=> number_format(round( $totalDesc, 2, PHP_ROUND_HALF_UP), 2, '.', ''),
        "TipoDeComprobante"=> $arr['Formulario']['Compro'],
        "LugarExpedicion"=> $arr['Empresa'][0]['CP']
      )
    );
  }

  // if (($descDistriduidor + $adicionalDescPorcentaje) < 1) {

  //   $this->satxmlsv33_cargaAtt($root, 
  //     array("Version"=>"3.3",
  //       "Serie"=>  $arr['Formulario']['Serie'],
  //       "Folio"=> $arr['Formulario']['Folio'],
  //       "Fecha"=>$this->satxmlsv33_xml_fech($fecha),
  //       "Sello"=>"@",
  //       "FormaPago"=> $arr['Formulario']['ForPago'],
  //       "MetodoPago"=> $arr['Formulario']['MetPago'],
  //       "NoCertificado"=> $arr['Empresa'][0]['noCertificado'],
  //       "Certificado"=>"@", 
  //       "SubTotal"=> number_format(round( $subtotalSI, 2, PHP_ROUND_HALF_UP), 2, '.', ''),
  //       "Total"=> number_format(round( $totalFactura, 2, PHP_ROUND_HALF_UP), 2, '.', ''),
  //       "Moneda"=> $arr['Formulario']['Moneda'],
  //       "Descuento"=> number_format(round( $totalDesc, 2, PHP_ROUND_HALF_UP), 2, '.', ''),
  //       "TipoDeComprobante"=> $arr['Formulario']['Compro'],
  //       "LugarExpedicion"=> $arr['Empresa'][0]['CP']
  //     )
  //   );
  // }
  // else{
  //   $this->satxmlsv33_cargaAtt($root, 
  //     array("Version"=>"3.3",
  //       "Serie"=>  $arr['Formulario']['Serie'],
  //       "Folio"=> $arr['Formulario']['Folio'],
  //       "Fecha"=>$this->satxmlsv33_xml_fech($fecha),
  //       "Sello"=>"@",
  //       "FormaPago"=> $arr['Formulario']['ForPago'],
  //       "MetodoPago"=> $arr['Formulario']['MetPago'],
  //       "NoCertificado"=> $arr['Empresa'][0]['noCertificado'],
  //       "Certificado"=>"@", 
  //       "SubTotal"=> number_format(round( $subtotalSI, 2, PHP_ROUND_HALF_UP), 2, '.', ''),
  //       "Total"=> number_format(round( $totalFactura, 2, PHP_ROUND_HALF_UP), 2, '.', ''),
  //       "Moneda"=> $arr['Formulario']['Moneda'],
  //       // "Descuento"=> number_format(round( $totalDesc, 2, PHP_ROUND_HALF_UP), 2, '.', ''),
  //       "TipoDeComprobante"=> $arr['Formulario']['Compro'],
  //       "LugarExpedicion"=> $arr['Empresa'][0]['CP']
  //     )
  //   );
  // }

}

/////////////////////////////////////////////////////////
///                                                   ///
///   Para mostrar la relacion de los CFDi's          ///
///     en caso de cancelación on notas de credito    ///
///                                                   ///
/////////////////////////////////////////////////////////

function satxmlsv33_relacionados($arr, $edidata, $dir,$nodo,$addenda) {
  global $root, $xml;

  if ($arr['Formulario']['UUIDS'] != "" && $arr['Formulario']['UUIDS'] != null) {
    $relacion = explode(',', $arr['Formulario']['UUIDS']);
    $cfdis = $xml->createElement("cfdi:CfdiRelacionados");
    $cfdis = $root->appendChild($cfdis);
    $this->satxmlsv33_cargaAtt($cfdis, array("TipoRelacion"=> $arr['Formulario']['TipoRe']));

    for ($i=0; $i < count($relacion); $i++){
      $cfdi = $xml->createElement("cfdi:CfdiRelacionado");
      $cfdi = $cfdis->appendChild($cfdi);
      $this->satxmlsv33_cargaAtt($cfdi, array("UUID"=>$relacion[$i]));                        //Este valor es el UUID del comprobante relacionado
    }
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
  $this->satxmlsv33_cargaAtt($emisor, 
    array("Rfc"=> $arr['Empresa'][0]['RFC'],
      "Nombre"=>  $arr['Empresa'][0]['Razon_Social'],
      "RegimenFiscal"=> $arr['Empresa'][0]['Clave_Regimen_Fiscal']
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
  $nombre = $this->satxmlsv33_fix_chr($arr['Formulario']['Razon']);
  $this->satxmlsv33_cargaAtt($receptor, 
    array("Rfc"=> $arr['Formulario']['RFC'],
      "Nombre"=>$nombre,
      "UsoCFDI"=> $arr['Formulario']['UsoCFDi']
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
  global $root, $xml, $globalDesc, $descDistriduidor, $IVA, $IVA_2, $listProducts, $gastosEnvio, $gastosAdmin, $adicionalDescPorcentaje, $totalDesc;
 
  $precioSI = 0;
  $importeSI = 0;
  $descuentoCD = 0;
  $importeBase = 0;
  $descuentoCC = 0;
  $importeBaseCC = 0;
  $importeCI = 0;
  $subtotalSI = 0;
  $totalCI = 0;

  $conceptos = $xml->createElement("cfdi:Conceptos");
  $conceptos = $root->appendChild($conceptos);



  if (intval($globalDesc) < 1) {
    for ($i=0; $i<$listProducts; $i++){
      // Precio sin IVA //
      $precioSI             = number_format($arr['Datos_Venta'][$i]['Precio_unitario'] / $IVA, 6, '.', '');
      // Importe sin IVA //
      $importeSI            = $arr['Datos_Venta'][$i]['Cantidad'] * $precioSI;
      // Descuento Distribuidor //
      $descuentoCD          = number_format($importeSI * ($descDistriduidor + $adicionalDescPorcentaje), 6, '.', '');
      // Importe - descuento distribuidor //
      $importeBase          = $importeSI - $descuentoCD;
      // IVA //
      $importeCI            = number_format($importeBase * $IVA_2, 6, '.', ''); 

      $concepto = $xml->createElement("cfdi:Concepto");
        $concepto = $conceptos->appendChild($concepto);
        $descripcion = $this->satxmlsv33_fix_chr($arr['Datos_Venta'][$i]['Producto']);
        $this->satxmlsv33_cargaAtt($concepto, 
          array("Cantidad"=> $arr['Datos_Venta'][$i]['Cantidad'],
            "Unidad"=> $arr['Datos_Venta'][$i]['UnidadMedida'],
            "NoIdentificacion"=> $arr['Datos_Venta'][$i]['Codigo'],
            "Descripcion"=>$descripcion,
            "ValorUnitario"=> number_format($precioSI, 6, '.', ''),
            "Importe"=> number_format($importeSI, 6, '.', ''),
            "ClaveProdServ"=> $arr['Datos_Venta'][$i]['ClaveSAT'],
            "ClaveUnidad"=> $arr['Datos_Venta'][$i]['UnidadSAT'],
            "Descuento"=> number_format($descuentoCD, 6, '.', '')
          )
      );

      if ($addenda!="pago") {
        $impuestos = $xml->createElement("cfdi:Impuestos");
        $impuestos = $concepto->appendChild($impuestos);
        $traslados = $xml->createElement("cfdi:Traslados");
        $traslados = $impuestos->appendChild($traslados);
        $traslado = $xml->createElement("cfdi:Traslado");
        $traslado = $traslados->appendChild($traslado);
        $this->satxmlsv33_cargaAtt($traslado, 
          array("Base"=> number_format($importeBase, 6, '.', ''),
            "Impuesto"=>"002",
            "TipoFactor"=>"Tasa",
            "TasaOCuota"=>'0.160000',
            "Importe"=> number_format($importeCI, 6, '.', '')
          )
        );
      }
    }
  }

  
  if ($arr['Venta'][0]['idCliente'] != 1967 && $arr['Venta'][0]['Ventas_Directas'] == 1) {
    $concepto = $xml->createElement("cfdi:Concepto");
    $concepto = $conceptos->appendChild($concepto);
    $descripcion = $this->satxmlsv33_fix_chr("Gastos de envío");
    $this->satxmlsv33_cargaAtt($concepto, 
        array("Cantidad"=> "1",
            "Unidad"=> "Servicio",
            "NoIdentificacion"=> "",
            "Descripcion"=>$descripcion,
            "ValorUnitario"=> $gastosEnvio,
            "Importe"=> $gastosEnvio,
            "ClaveProdServ"=> "78102200",
            "ClaveUnidad"=> "E48"
        )
    );

    if ($addenda!="pago") {
        $impuestos = $xml->createElement("cfdi:Impuestos");
        $impuestos = $concepto->appendChild($impuestos);
        $traslados = $xml->createElement("cfdi:Traslados");
        $traslados = $impuestos->appendChild($traslados);
        $traslado = $xml->createElement("cfdi:Traslado");
        $traslado = $traslados->appendChild($traslado);
        $importeGACISE = number_format($gastosEnvio * $IVA_2, 2, '.', ''); 
        $this->satxmlsv33_cargaAtt($traslado, 
            array("Base"=> number_format($gastosEnvio, 2, '.', ''),
            "Impuesto"=>"002",
            "TipoFactor"=>"Tasa",
            "TasaOCuota"=>'0.160000',
            "Importe"=> $importeGACISE
            )
        );
    }
  }

  ////////////////////////////////////////////////
  /// Agregar Concepto Gastos Administrativos ///
  ///////////////////////////////////////////////
  if ($arr['Venta'][0]['Gastos_Admin'] == "50.00") {
    
    $concepto = $xml->createElement("cfdi:Concepto");
    $concepto = $conceptos->appendChild($concepto);
    $descripcion = $this->satxmlsv33_fix_chr("Gastos Administrativos");
    $this->satxmlsv33_cargaAtt($concepto, 
      array("Cantidad"=> "1",
        "Unidad"=> "",
        "NoIdentificacion"=> "",
        "Descripcion"=>"Gastos Administrativos",
        "ValorUnitario"=> $gastosAdmin,
        "Importe"=> $gastosAdmin,
        "ClaveProdServ"=> "01010101",
        "ClaveUnidad"=> "E48"
      )
    );

    if ($addenda!="pago") {
      $impuestos = $xml->createElement("cfdi:Impuestos");
      $impuestos = $concepto->appendChild($impuestos);
      $traslados = $xml->createElement("cfdi:Traslados");
      $traslados = $impuestos->appendChild($traslados);
      $traslado = $xml->createElement("cfdi:Traslado");
      $traslado = $traslados->appendChild($traslado);
      $importeGACI = number_format($gastosAdmin * $IVA_2, 2, '.', ''); 
      $this->satxmlsv33_cargaAtt($traslado, 
        array("Base"=> number_format($gastosAdmin, 2, '.', ''),
          "Impuesto"=>"002",
          "TipoFactor"=>"Tasa",
          "TasaOCuota"=>'0.160000',
          "Importe"=> $importeGACI
        )
      );
    }
  }
  ////////////////////////////////////////////////
  /// Agregar Concepto Gastos Administrativos ///
  ///////////////////////////////////////////////


    ////////////////////////////////////////////////
    /// Agregar Concepto Gastos de envio ///
    ///////////////////////////////////////////////
    if ($arr['Venta'][0]['idCliente'] == 1967 && floatval($arr['TotalVenta'][0]['Total']) <= 1000) {
        
      $concepto = $xml->createElement("cfdi:Concepto");
      $concepto = $conceptos->appendChild($concepto);
      $descripcion = $this->satxmlsv33_fix_chr("Gastos de envío");
      $this->satxmlsv33_cargaAtt($concepto, 
          array("Cantidad"=> "1",
              "Unidad"=> "Servicio",
              "NoIdentificacion"=> "",
              "Descripcion"=>$descripcion,
              "ValorUnitario"=> $gastosEnvio,
              "Importe"=> $gastosEnvio,
              "ClaveProdServ"=> "78102200",
              "ClaveUnidad"=> "E48"
          )
      );

      if ($addenda!="pago") {
          $impuestos = $xml->createElement("cfdi:Impuestos");
          $impuestos = $concepto->appendChild($impuestos);
          $traslados = $xml->createElement("cfdi:Traslados");
          $traslados = $impuestos->appendChild($traslados);
          $traslado = $xml->createElement("cfdi:Traslado");
          $traslado = $traslados->appendChild($traslado);
          $importeGACISE = number_format($gastosEnvio * $IVA_2, 2, '.', ''); 
          $this->satxmlsv33_cargaAtt($traslado, 
              array("Base"=> number_format($gastosEnvio, 2, '.', ''),
              "Impuesto"=>"002",
              "TipoFactor"=>"Tasa",
              "TasaOCuota"=>'0.160000',
              "Importe"=> $importeGACISE
              )
          );
      }
  }
  ////////////////////////////////////////////////
  /// Agregar Concepto Gastos Administrativos ///
  ///////////////////////////////////////////////

}

/////////////////////////////////////////////////////////
///                                                   ///
///              Datos del Impuesto (IVA)             ///
///                                                   ///
///                                                   ///
/////////////////////////////////////////////////////////

function satxmlsv33_impuestos($arr, $edidata, $dir,$nodo,$addenda) {
  global $root, $xml, $totalCI;


  if ($addenda!="pago"){
    $ImpuestosComprobante = $xml->createElement("cfdi:Impuestos");
    $ImpuestosComprobante = $root->appendChild($ImpuestosComprobante);
    $trasladosImpuestos = $xml->createElement("cfdi:Traslados");
    $trasladosImpuestos = $ImpuestosComprobante->appendChild($trasladosImpuestos);
    $traslado = $xml->createElement("cfdi:Traslado");
    $traslado = $trasladosImpuestos->appendChild($traslado);    

    $this->satxmlsv33_cargaAtt($traslado, 
      array("Impuesto"=>"002",
        "TipoFactor"=>"Tasa",
        "TasaOCuota"=>'0.160000',
        "Importe"=> number_format( $totalCI, 2, '.', '')
      )
    );
      
    $ImpuestosComprobante->SetAttribute("TotalImpuestosTrasladados",number_format( $totalCI, 2, '.', ''));
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
  //$ruta = $_SERVER['DOCUMENT_ROOT'].'/Facturacion/ecodexphp/schemas/cfdi/cfdv33.xsd'; 
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

/*function satxmlsv33_genera_cadena_original(){
global $xml, $cadena_original;
$paso = new DOMDocument("1.0","UTF-8");
$proc = new XSLTProcessor;
$paso->loadXML($xml->saveXML());
$xsl = new DOMDocument("1.0","UTF-8");
//http://www.sat.gob.mx/sitio_internet/cfd/3/cadenaoriginal_3_3/cadenaoriginal_3_3.xslt
$xsl->load('http://www.sat.gob.mx/sitio_internet/cfd/3/cadenaoriginal_3_3/cadenaoriginal_3_3.xslt');
//$xsl->load($_SERVER['DOCUMENT_ROOT'].'/Prosalon/ecodexphp/xslt/cadenaoriginal_3_3.xslt');
$proc->importStyleSheet($xsl); 
$cadena_original = $proc->transformToXML($paso);
}*/


function satxmlsv33_genera_cadena_original() {
global $xml, $cadena_original;
  try{
    /*print_r("Paso 1");
    print_r("\n");*/
    $paso = new DOMDocument("1.0","UTF-8");
    $paso->loadXML($xml->saveXML());
    $xsl = new DOMDocument("1.0","UTF-8");
    /*print_r("XML (paso)");
    print_r("\n");
    print_r($paso);
    print_r("\n");

    print_r("Paso 2");
    print_r("\n");*/
    //$xsl->load('http://omawww.sat.gob.mx/sitio_internet/cfd/3/cadenaoriginal_3_3/cadenaoriginal_3_3.xslt');
    $xsl->load('http://omawww.sat.gob.mx/sitio_internet/cfd/3/cadenaoriginal_3_3/cadenaoriginal_3_3.xslt');
    //$xsl->load($file);
    $proc = new XSLTProcessor;
    $proc->importStyleSheet($xsl); 

    /*print_r("proc (proc)");
    print_r("\n");
    print_r($proc);
    print_r("\n");

    print_r("Paso 3");
    print_r("\n");*/
    $cadena_original = $proc->transformToXML($paso);

  }
  catch(Exception $ex){
    print_r("Exception");
    print_r("\n");
    print_r($ex);
    exit();
  }

  /*print_r("Paso 4");
  print_r("\n");
  print_r($cadena_original);
  print_r("\n");
  print_r("\n");
  print_r("\n");
  print_r("\n");
  print_r("\n");
  print_r("\n");*/
}

/*function satxmlsv33_genera_cadena_original() {
global $xml, $cadena_original;
$paso = new DOMDocument("1.0","UTF-8");
$paso->loadXML($xml->saveXML());
$xsl = new DOMDocument("1.0","UTF-8");
$xsl->load('http://omawww.sat.gob.mx/sitio_internet/cfd/3/cadenaoriginal_3_3/cadenaoriginal_3_3.xslt');
$proc = new XSLTProcessor;
$proc->importStyleSheet($xsl); 
$cadena_original = $proc->transformToXML($paso);
}*/

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


// $certificadoCER = 'C:\wamp64\www\Avyna_Desk\Sellos\CSD\00001000000411008341.cer';
// $certificadoKEY = 'C:\wamp64\www\Avyna_Desk\Sellos\CSD\CSD_Avyna_Cosmeticos,_SA_de_CV_ACO140605RN0_20180529_123920.key';
//$ruta = $_SERVER['DOCUMENT_ROOT']."/Prosalon/Sellos/CSD/";                       //Ruta donde se encuentran los archivos .pem de los CSD
$file = $certificadoKEY.".pem";                                                            // Ruta al archivo .key en su formato .pem

// Obtiene la llave privada del Certificado de Sello Digital (CSD),
//    Ojo , Nunca es la FIEL/FEA
/*print_r("Paso 1.0");
print_r(" \n");
print_r("file: ".$file);
print_r(" \n");*/
$pkeyid = openssl_pkey_get_private(file_get_contents($file));

/*print_r("Paso 1.5");
print_r(" \n");
print_r("pkeyid: ".$pkeyid);
print_r("\n");*/
openssl_sign($cadena_original, $crypttext, $pkeyid, OPENSSL_ALGO_SHA256);
openssl_free_key($pkeyid);

/*print_r("Paso 2.0");
print_r(" \n");
print_r("cadena_original: ".$cadena_original);
print_r(" \n");*/

$sello = base64_encode($crypttext);                                                           // lo codifica en formato base64
$root->setAttribute('Sello',$sello);                                                       //Carga Sello al XML

/*print_r("Paso 3.0");
print_r(" \n");
print_r("sello: ".$sello);
print_r(" \n");*/

$file = $certificadoCER.".pem";                                                               // Ruta al archivo de Llave publica en su formato .pem
$datos = file($file);
$certificadoCER = ""; $carga = false;
for ($i=0; $i<sizeof($datos); $i++) {
    if (strstr($datos[$i],"END CERTIFICATE")) $carga=false;
    if ($carga) $certificadoCER .= trim($datos[$i]);
    if (strstr($datos[$i],"BEGIN CERTIFICATE")) $carga=true;
}
// El certificado como base64 lo agrega al XML para simplificar la validacion

$root->setAttribute('Certificado', $certificadoCER);                                                  //Carga certificado al XML
  
  /*print_r("Paso 4.0");
  print_r(" \n");
  print_r("certificadoCER: ".$certificadoCER);
  print_r(" \n");*/
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
$dir  =  $_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/XMLs/';
                                                   //Ruta donde se guardaran los archivos XML sin timbrar
//$nufa = $arr['Empresa']['RFC'].'_'.rand(0,1000);                                                         // Junta el numero de factura   serie + folio para el nombre del archivo XML a crear;
$nufa = "xml_creado"; 

$paso = $todo;
file_put_contents("todo.xml",$todo);
chmod("todo.xml", 0777);

    $xml->formatOutput = true;
    $file=$dir.$nufa.".xml";
//    $file=$dir.$nufa.$hoy.".xml";
    $xml->save($file);

    chmod($file, 0777);

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

}                                                                                              //Fin de la clase CrearXML

?>