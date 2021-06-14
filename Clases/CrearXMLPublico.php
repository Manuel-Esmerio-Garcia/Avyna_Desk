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
global $root, $xml, $TotalImporte_Factura;
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

date_default_timezone_set("America/Mexico_City");

$fecha = date("Y-m-d H:i:s"); 

$Importe_Factura_Sin    = 0;
$Importe_Factura        = 0;
$Valor_Unitario_Factura = 0;
$Base_Impuestos         = 0;

/*Obtener el Descuento*/
$Total_Venta        = $arr['Venta'][0]['Total'];
$Descuento_Venta    = $arr['Venta'][0]['Descuento'];
$Total_Venta_Des    = $Total_Venta + $Descuento_Venta;
$Descuento_1_sin    = $Descuento_Venta / $Total_Venta_Des;
$Descuento_1        = number_format($Descuento_1_sin, 3, '.', '');


//IVA
$IVA    = 1 + $arr['Monedas'][0]['Impuesto_%'] / 100;
$IVA_2  = $arr['Monedas'][0]['Impuesto_%'] / 100;


if (empty($arr['Datos_Venta'])) 
{

  //Total Listado de Productos
  $listProducts = count($arr['Invoice']);

  for ($i=0; $i<=$listProducts-1; $i++) 
  {

      $Valor_Unitario_Factura     = number_format($arr['Invoice'][$i]['Precio_unitario'] / $IVA, 2, '.', '');
      $Importe_Factura_Sin        = $arr['Invoice'][$i]['Cantidad_Detalle_Menudeo'] * $Valor_Unitario_Factura;
      $Total_Subtotales           += $Importe_Factura_Sin;
      $Descuento_Factura          = number_format($Importe_Factura_Sin * $Descuento_1, 2, '.', '');
      $Total_Descuentos           += $Descuento_Factura;
      $Base_Impuestos             = $Importe_Factura_Sin - $Descuento_Factura;

      $ImporteIVA = number_format($Base_Impuestos * $IVA_2, 2, '.', '');
      $TotalImporte += $ImporteIVA;
      $TotalImporte_Factura = $TotalImporte;

  }


      $Factura              = ($Total_Subtotales - $Total_Descuentos) + $TotalImporte_Factura;

      $Total_Timbre_Factura = abs($Factura - $arr['Venta'][0]['Total']);

  $this->satxmlsv33_cargaAtt($root, array("Version"=>"3.3",
                        "Serie"=>  $arr['Formulario']['Serie'],
                        "Folio"=> $arr['Formulario']['Folio'],
                        "Fecha"=>$this->satxmlsv33_xml_fech($fecha),                                    //La fecha debe de llevar el formato necesario
                        //"Fecha"=>'2018-02-18T11:26:10',
                        "Sello"=>"@",                                                                     //Se obtiene con OpenSSL y con archivo .cer
                        "FormaPago"=> $arr['Formulario']['FormaPago'],                                    //Debe de conicidir con el catalogo del SAT
                        "MetodoPago"=> $arr['Formulario']['MetodoPago'],                                  //Debe de conicidir con el catalogo del SAT y depende de la forma de pago
                        "NoCertificado"=> $arr['Empresa']['noCertificado'],                               //Se obtiene con el archivo .cer con el siguiente comando con OpenSSL (OpenSSl x509 -inform DER -outform PEM -in C:\wamp64\www\Prosalon\Sellos\CSD_Pruebas_CFDI_LAN8507268IA\CSD_Prueba_CFDI_LAN8507268IA.cer -noout -serial) serial=3230303031303030303030333030303232383136 (El resultado esta en hexadecimal).
                        "Certificado"=>"@",                                                                //Se obtiene con el archivo .cer y .key 
                        "SubTotal"=> $Total_Subtotales,                                                     //La suma de todos los importes de los movimientos
                        "Total"=> number_format($Factura, 2, '.', ''),                                       
                        "Moneda"=> $arr['Formulario']['Moneda'],                                            //Debe de conicidir con el catalogo del SAT (Por omisión Quedara como MXN).
                        "Descuento"=>$Total_Descuentos,
                        "TipoCambio"=>$Tipo_Cambio,                                                                  //Dependiendo de la moneda sera necesario modificarlo (Como por omisión es MXN el tipo de cambio debe de ser 1).
                        "TipoDeComprobante"=> $arr['Formulario']['Comprobante'],                            //Debe de conicidir con el catalogo del SAT (Los valores validos son I, E, N y como complemento P).
                        "LugarExpedicion"=> $arr['Empresa']['CP']                                           //El lugar de expedición es del CP del emisor en este caso de la empresa.
                     )
                  );  

}else

{

  //Total Listado de Productos
  $listProducts = count($arr['Datos_Venta']);

  for ($i=0; $i<=$listProducts-1; $i++) 
  {

      //$TEST += $arr['Datos_Venta'][$i]['Cantidad'] * ($arr['Datos_Venta'][$i]['Precio_unitario'] / $IVA); bcdiv($Importe_Factura_Sin * $Descuento_1,'1',2);number_format($Descuento_1_sin, 2, '.', '');


      $Valor_Unitario_Factura     = number_format($arr['Datos_Venta'][$i]['Precio_unitario'] / $IVA, 2, '.', '');
      $Importe_Factura_Sin        = $arr['Datos_Venta'][$i]['Cantidad'] * $Valor_Unitario_Factura;
      $Total_Subtotales           += $Importe_Factura_Sin;
      $Descuento_Factura          = number_format($Importe_Factura_Sin * $Descuento_1, 2, '.', '');
      $Total_Descuentos           += $Descuento_Factura;
      $Base_Impuestos             = $Importe_Factura_Sin - $Descuento_Factura;

      $ImporteIVA = number_format($Base_Impuestos * $IVA_2, 2, '.', '');
      $TotalImporte += $ImporteIVA;
      $TotalImporte_Factura = $TotalImporte;

  }


      $Factura              = ($Total_Subtotales - $Total_Descuentos) + $TotalImporte_Factura;

      $Total_Timbre_Factura = abs($Factura - $arr['Venta'][0]['Total']);

  $this->satxmlsv33_cargaAtt($root, array("Version"=>"3.3",
                        "Serie"=>  $arr['Formulario']['Serie'],
                        "Folio"=> $arr['Formulario']['Folio'],
                        "Fecha"=>$this->satxmlsv33_xml_fech($fecha),                                    //La fecha debe de llevar el formato necesario
                        //"Fecha"=>'2018-02-18T11:26:10',
                        "Sello"=>"@",                                                                     //Se obtiene con OpenSSL y con archivo .cer
                        "FormaPago"=> $arr['Formulario']['FormaPago'],                                    //Debe de conicidir con el catalogo del SAT
                        "MetodoPago"=> $arr['Formulario']['MetodoPago'],                                  //Debe de conicidir con el catalogo del SAT y depende de la forma de pago
                        "NoCertificado"=> $arr['Empresa']['noCertificado'],                               //Se obtiene con el archivo .cer con el siguiente comando con OpenSSL (OpenSSl x509 -inform DER -outform PEM -in C:\wamp64\www\Prosalon\Sellos\CSD_Pruebas_CFDI_LAN8507268IA\CSD_Prueba_CFDI_LAN8507268IA.cer -noout -serial) serial=3230303031303030303030333030303232383136 (El resultado esta en hexadecimal).
                        "Certificado"=>"@",                                                                //Se obtiene con el archivo .cer y .key 
                        "SubTotal"=> $Total_Subtotales,                                                     //La suma de todos los importes de los movimientos
                        "Total"=> number_format($Factura, 2, '.', ''),                                       
                        "Moneda"=> $arr['Formulario']['Moneda'],                                            //Debe de conicidir con el catalogo del SAT (Por omisión Quedara como MXN).
                        "Descuento"=>$Total_Descuentos,
                        "TipoCambio"=>$Tipo_Cambio,                                                                  //Dependiendo de la moneda sera necesario modificarlo (Como por omisión es MXN el tipo de cambio debe de ser 1).
                        "TipoDeComprobante"=> $arr['Formulario']['Comprobante'],                            //Debe de conicidir con el catalogo del SAT (Los valores validos son I, E, N y como complemento P).
                        "LugarExpedicion"=> $arr['Empresa']['CP']                                           //El lugar de expedición es del CP del emisor en este caso de la empresa.
                     )
                  );

  } //End else Datos_venta diferente a vacio


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
        $this->satxmlsv33_cargaAtt($cfdis, array("TipoRelacion"=> $arr['Tipo_Relacion']['Tipo_Relacion']));        //Debe de coicidir con el catalogo del SAT
        for ($i=0; $i <= count($arr['Relacionado'])-1; $i++) 
        {
        $cfdi = $xml->createElement("cfdi:CfdiRelacionado");
        $cfdi = $cfdis->appendChild($cfdi);
        $this->satxmlsv33_cargaAtt($cfdi, array("UUID"=>$arr['Relacionado'][$i]));                        //Este valor es el UUID del comprobante relacionado
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
$this->satxmlsv33_cargaAtt($emisor, array("Rfc"=> $arr['Empresa']['RFC'],                               //El RFC del emisor debe de contar con digitos necesarios dependiendo si es persona moral o fisica
                       "Nombre"=>  $arr['Empresa']['Razon_Social'],                                      //Razón Social de la empresa (como estan registradas ante el SAT).
                       "RegimenFiscal"=> $arr['Empresa']['Clave_Regimen_Fiscal']                        //Debe de coicidir con el catalogo del SAT dependiendo del tipo de RFC de la empresa
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
$nombre = $this->satxmlsv33_fix_chr($arr['Formulario']['Empresa']);                                       //Quita valores NO validos del nombre del cliente
$this->satxmlsv33_cargaAtt($receptor, array("Rfc"=> $arr['Formulario']['RFC'],                            //RFC del cliente
                          "Nombre"=>$nombre,                                                              //Nombre del cliente
                          "UsoCFDI"=> $arr['Formulario']['UsoCFDi']                                       //Debe de coicidir con el catalogo del SAT (El cliente lo proporciona a la empresa)
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
global $root, $xml;

$Importe_Factura_Sin    = 0;
$Importe_Factura        = 0;
$Valor_Unitario_Factura = 0;
$Base_Impuestos         = 0;

/*Obtener el Descuento*/
$Total_Venta        = $arr['Venta'][0]['Total'];
$Descuento_Venta    = $arr['Venta'][0]['Descuento'];
$Total_Venta_Des    = $Total_Venta + $Descuento_Venta;
$Descuento_1_sin    = $Descuento_Venta / $Total_Venta_Des;
$Descuento_1        = number_format($Descuento_1_sin, 2, '.', '');


//IVA
$IVA    = 1 + $arr['Monedas'][0]['Impuesto_%'] / 100;
$IVA_2  = $arr['Monedas'][0]['Impuesto_%'] / 100;

$conceptos = $xml->createElement("cfdi:Conceptos");
$conceptos = $root->appendChild($conceptos);
//for ($i=1; $i<=sizeof($arr['Conceptos']); $i++) {


if (empty($arr['Datos_Venta'])) {

  //Total Listado de Productos
    $listProducts = count($arr['Invoice']);

    $Contador = 0;

    for ($i=0; $i<=$listProducts-1; $i++) 
    {

      if ($arr['Invoice'][$i]['Precio_unitario'] != 0) 
      {

        $Valor_Unitario_Factura     = number_format($arr['Invoice'][$i]['Precio_unitario'] / $IVA, 2, '.', '');
        $Importe_Factura_Sin        = $arr['Invoice'][$i]['Cantidad_Detalle_Menudeo'] * $Valor_Unitario_Factura;
        $Descuento_Factura          = number_format($Importe_Factura_Sin * $Descuento_1, 2, '.', '');
        $Base_Impuestos             = $Importe_Factura_Sin - $Descuento_Factura;

        $Total_Subtotal_ += $Base_Impuestos * $IVA_2;



        $concepto = $xml->createElement("cfdi:Concepto");
        $concepto = $conceptos->appendChild($concepto);
        //$prun = $arr['Conceptos'][$i]['valorUnitario'];
        $descripcion = $this->satxmlsv33_fix_chr($arr['Invoice'][$i]['Producto']);                                //Quita caracteres invalidos del concepto de la factura
        $this->satxmlsv33_cargaAtt($concepto, 
            array("Cantidad"=> $arr['Invoice'][$i]['Cantidad_Detalle_Menudeo'],                                                                 //Cantidad de produto adquirido por el cliente por movimiento
                  "Unidad"=> $arr['Invoice'][$i]['UnidadMedida'],                                                               //Con la nueva versión de facturacion todo producto debe de llevar una unidad de medida
                  "NoIdentificacion"=> $arr['Invoice'][$i]['Codigo'],                                                      //Este campo es opcional y muestra el codigo del producto
                  "Descripcion"=>$descripcion,                                                     //Descripción (nombre) del producto adquirido
                  "ValorUnitario"=> number_format($Valor_Unitario_Factura, 2, '.', ''),                                                          //Precio unitario del producto adquirido
                  "Importe"=> number_format($Importe_Factura_Sin, 2, '.', ''),                                                                //Este valor se obtiene al multiplicar Cantidad * ValorUnitario = Importe
                  "ClaveProdServ"=> $arr['Invoice'][$i]['ClaveSAT'],                                                     //Debe de concidir con el catalo del SAT (esto en todos los productos)
                  "ClaveUnidad"=> $arr['Invoice'][$i]['UnidadSAT'],                                                           //Debe de concidir con el catalo del SAT y con la unidad de medida que tiene el producto
                  "Descuento"=> number_format($Descuento_Factura, 2, '.', '')
                 )
            );
        if ($addenda!="pago") {
            $impuestos = $xml->createElement("cfdi:Impuestos");
            $impuestos = $concepto->appendChild($impuestos);
            $traslados = $xml->createElement("cfdi:Traslados");
            $traslados = $impuestos->appendChild($traslados);
            $traslado = $xml->createElement("cfdi:Traslado");
            $traslado = $traslados->appendChild($traslado);
            $ImporteIVA = number_format($Base_Impuestos * $IVA_2, 2, '.', '');
            $TotalImporte += $ImporteIVA;
            $this->satxmlsv33_cargaAtt($traslado, 
                array("Base"=> number_format($Base_Impuestos, 2, '.', ''),                                                                //Base es igual al subtotal
                      "Impuesto"=>"002",                                                            //Debe de concidir con el catalo del SAT para este porgrama se utiliza solo el IVA por lo que el valor es 002
                      "TipoFactor"=>"Tasa",                                                         //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA por lo que el valor es Tasa
                      "TasaOCuota"=>'0.160000',                                                     //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA al 16% por lo que el valor es 0.160000
                      "Importe"=> number_format($ImporteIVA, 2, '.', '')                                                              //Es igual Base * TasaOCuota es decir el IVA por cada producto
                     )
                 );

      /*$ImpuetosTotal = $xml->createElement("cfdi:Impuestos");
      $ImpuetosTotal = $root->appendChild($ImpuetosTotal);
      $ImpuetosTotal->SetAttribute("TotalImpuestosTrasladados",$TotalImporte); */

        }

        }else
        {
            $Contador++;
        }
    }

}else{

    //Total Listado de Productos
    $listProducts = count($arr['Datos_Venta']);

    $Contador = 0;

    for ($i=0; $i<=$listProducts-1; $i++) 
    {

      if ($arr['Datos_Venta'][$i]['Precio_unitario'] != 0) 
      {

        $Valor_Unitario_Factura     = number_format($arr['Datos_Venta'][$i]['Precio_unitario'] / $IVA, 2, '.', '');
        $Importe_Factura_Sin        = $arr['Datos_Venta'][$i]['Cantidad'] * $Valor_Unitario_Factura;
        $Descuento_Factura          = number_format($Importe_Factura_Sin * $Descuento_1, 2, '.', '');
        $Base_Impuestos             = $Importe_Factura_Sin - $Descuento_Factura;

        $Total_Subtotal_ += $Base_Impuestos * $IVA_2;



        $concepto = $xml->createElement("cfdi:Concepto");
        $concepto = $conceptos->appendChild($concepto);
        //$prun = $arr['Conceptos'][$i]['valorUnitario'];
        $descripcion = $this->satxmlsv33_fix_chr($arr['Datos_Venta'][$i]['Producto']);                                //Quita caracteres invalidos del concepto de la factura
        $this->satxmlsv33_cargaAtt($concepto, 
            array("Cantidad"=> $arr['Datos_Venta'][$i]['Cantidad'],                                                                 //Cantidad de produto adquirido por el cliente por movimiento
                  "Unidad"=> $arr['Datos_Venta'][$i]['UnidadMedida'],                                                               //Con la nueva versión de facturacion todo producto debe de llevar una unidad de medida
                  "NoIdentificacion"=> $arr['Datos_Venta'][$i]['Codigo'],                                                      //Este campo es opcional y muestra el codigo del producto
                  "Descripcion"=>$descripcion,                                                     //Descripción (nombre) del producto adquirido
                  "ValorUnitario"=> number_format($Valor_Unitario_Factura, 2, '.', ''),                                                          //Precio unitario del producto adquirido
                  "Importe"=> number_format($Importe_Factura_Sin, 2, '.', ''),                                                                //Este valor se obtiene al multiplicar Cantidad * ValorUnitario = Importe
                  "ClaveProdServ"=> $arr['Datos_Venta'][$i]['ClaveSAT'],                                                     //Debe de concidir con el catalo del SAT (esto en todos los productos)
                  "ClaveUnidad"=> $arr['Datos_Venta'][$i]['UnidadSAT'],                                                           //Debe de concidir con el catalo del SAT y con la unidad de medida que tiene el producto
                  "Descuento"=> number_format($Descuento_Factura, 2, '.', '')
                 )
            );
        if ($addenda!="pago") {
            $impuestos = $xml->createElement("cfdi:Impuestos");
            $impuestos = $concepto->appendChild($impuestos);
            $traslados = $xml->createElement("cfdi:Traslados");
            $traslados = $impuestos->appendChild($traslados);
            $traslado = $xml->createElement("cfdi:Traslado");
            $traslado = $traslados->appendChild($traslado);
            $ImporteIVA = number_format($Base_Impuestos * $IVA_2, 2, '.', '');
            $TotalImporte += $ImporteIVA;
            $this->satxmlsv33_cargaAtt($traslado, 
                array("Base"=> number_format($Base_Impuestos, 2, '.', ''),                                                                //Base es igual al subtotal
                      "Impuesto"=>"002",                                                            //Debe de concidir con el catalo del SAT para este porgrama se utiliza solo el IVA por lo que el valor es 002
                      "TipoFactor"=>"Tasa",                                                         //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA por lo que el valor es Tasa
                      "TasaOCuota"=>'0.160000',                                                     //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA al 16% por lo que el valor es 0.160000
                      "Importe"=> number_format($ImporteIVA, 2, '.', '')                                                              //Es igual Base * TasaOCuota es decir el IVA por cada producto
                     )
                 );

      /*$ImpuetosTotal = $xml->createElement("cfdi:Impuestos");
      $ImpuetosTotal = $root->appendChild($ImpuetosTotal);
      $ImpuetosTotal->SetAttribute("TotalImpuestosTrasladados",$TotalImporte); */

        }

        }else
        {
            $Contador++;
        }
    }

} //Fin Else if Datos_Venta es vacio


}

/////////////////////////////////////////////////////////
///                                                   ///
///              Datos del Impuesto (IVA)             ///
///                                                   ///
///                                                   ///
/////////////////////////////////////////////////////////

function satxmlsv33_impuestos($arr, $edidata, $dir,$nodo,$addenda) {
global $root, $xml, $TotalImporte_Factura;

$IVA_2  = $arr['Monedas'][0]['Impuesto_%'] / 100;
$IVA    = 1 + $arr['Monedas'][0]['Impuesto_%'] / 100;

/*Obtener el Descuento*/
$Total_Venta_IVA       = $arr['Venta'][0]['Total'];
$Descuento_Venta_IVA    = $arr['Venta'][0]['Descuento'];
$Total_Venta_Des_IVA    = $Total_Venta_IVA + $Descuento_Venta_IVA;
$Descuento_1_sin_IVA    = $Descuento_Venta_IVA / $Total_Venta_Des_IVA;
$Descuento_1_IVA        = number_format($Descuento_1_sin_IVA, 2, '.', '');

//$IVA = '.16';



if ($addenda!="pago") 
{

  if (empty($arr['Datos_Venta'])) 
  {

    $ImpuestosComprobante = $xml->createElement("cfdi:Impuestos");
    $ImpuestosComprobante = $root->appendChild($ImpuestosComprobante);
    $trasladosImpuestos = $xml->createElement("cfdi:Traslados");
    $trasladosImpuestos = $ImpuestosComprobante->appendChild($trasladosImpuestos);
    //foreach ($arr as $TasaOCuota => $impu) {
    $listProducts_IVA = count($arr['Invoice']);

    for ($i=0; $i<=$listProducts_IVA-1; $i++) {
        // echo "Tasa=$TasaOCuota impu=$impu\n";
        $Valor_Unitario_Factura_IVA     = number_format($arr['Invoice'][$i]['Precio_unitario'] / $IVA, 2, '.', '');
        $Importe_Factura_Sin_IVA        = $arr['Invoice'][$i]['Cantidad_Detalle_Menudeo'] * $Valor_Unitario_Factura_IVA;
        $Descuento_Factura_IVA          = number_format($Importe_Factura_Sin_IVA * $Descuento_1_IVA, 2, '.', '');
        $Base_Impuestos_IVA             = $Importe_Factura_Sin_IVA - $Descuento_Factura_IVA;

        $Total_Subtotal += $Base_Impuestos_IVA;

        $ImporteIVA_IVA = number_format($Base_Impuestos_IVA * $IVA_2, 2, '.', '');
        $TotalImporteIVA_IVA += $ImporteIVA_IVA;


        }

        $traslado = $xml->createElement("cfdi:Traslado");
        $traslado = $trasladosImpuestos->appendChild($traslado);

        $this->satxmlsv33_cargaAtt($traslado, 
           array("Impuesto"=>"002",                                                              //Debe de concidir con el catalo del SAT para este porgrama se utiliza solo el IVA por lo que el valor es 002
                 "TipoFactor"=>"Tasa",                                                           //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA por lo que el valor es Tasa
                 "TasaOCuota"=>'0.160000',                                                       //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA al 16% por lo que el valor es 0.160000
                 "Importe"=> number_format($TotalImporteIVA_IVA, 2, '.', '')                                                                //Impuesto correspondiente a tods los productos a facturar
                )
            );
    

    $ImpuestosComprobante->SetAttribute("TotalImpuestosTrasladados",number_format($TotalImporteIVA_IVA, 2, '.', ''));                                   //Suma de todos los importes del IVA de todos los produtos

    
  }else{

    $ImpuestosComprobante = $xml->createElement("cfdi:Impuestos");
    $ImpuestosComprobante = $root->appendChild($ImpuestosComprobante);
    $trasladosImpuestos = $xml->createElement("cfdi:Traslados");
    $trasladosImpuestos = $ImpuestosComprobante->appendChild($trasladosImpuestos);
    //foreach ($arr as $TasaOCuota => $impu) {
    $listProducts_IVA = count($arr['Datos_Venta']);

    for ($i=0; $i<=$listProducts_IVA-1; $i++) {
        // echo "Tasa=$TasaOCuota impu=$impu\n";
        $Valor_Unitario_Factura_IVA     = number_format($arr['Datos_Venta'][$i]['Precio_unitario'] / $IVA, 2, '.', '');
        $Importe_Factura_Sin_IVA        = $arr['Datos_Venta'][$i]['Cantidad'] * $Valor_Unitario_Factura_IVA;
        $Descuento_Factura_IVA          = number_format($Importe_Factura_Sin_IVA * $Descuento_1_IVA, 2, '.', '');
        $Base_Impuestos_IVA             = $Importe_Factura_Sin_IVA - $Descuento_Factura_IVA;

        $Total_Subtotal += $Base_Impuestos_IVA;

        $ImporteIVA_IVA = number_format($Base_Impuestos_IVA * $IVA_2, 2, '.', '');
        $TotalImporteIVA_IVA += $ImporteIVA_IVA;


        }

        $traslado = $xml->createElement("cfdi:Traslado");
        $traslado = $trasladosImpuestos->appendChild($traslado);

        $this->satxmlsv33_cargaAtt($traslado, 
           array("Impuesto"=>"002",                                                              //Debe de concidir con el catalo del SAT para este porgrama se utiliza solo el IVA por lo que el valor es 002
                 "TipoFactor"=>"Tasa",                                                           //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA por lo que el valor es Tasa
                 "TasaOCuota"=>'0.160000',                                                       //Debe de concidir con el catalo del SAT para este programa se utiliza solo el IVA al 16% por lo que el valor es 0.160000
                 "Importe"=> number_format($TotalImporteIVA_IVA, 2, '.', '')                                                                //Impuesto correspondiente a tods los productos a facturar
                )
            );
    

    $ImpuestosComprobante->SetAttribute("TotalImpuestosTrasladados",number_format($TotalImporteIVA_IVA, 2, '.', ''));                                   //Suma de todos los importes del IVA de todos los produtos

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
$xsl->load('http://omawww.sat.gob.mx/sitio_internet/cfd/3/cadenaoriginal_3_3/cadenaoriginal_3_3.xslt');
//$xsl->load($_SERVER['DOCUMENT_ROOT'].'/Prosalon/ecodexphp/xslt/cadenaoriginal_3_3.xslt');
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
$certificadoKEY = $arr['Empresa']['CSD_key'];                                                    //Monde del Certificado vigente a utilizar
$certificadoCER = $arr['Empresa']['CSD_cer'];                                                    //Monde del Certificado vigente a utilizar
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

}                                                                                              //Fin de la clase CrearXML

?>