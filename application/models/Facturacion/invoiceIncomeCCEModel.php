<?php

date_default_timezone_set('America/Mexico_City');

class InvoiceIncomeCCEModel extends CI_Model
{

    //////////////////////////////////////////////////////////
    ///                                                    ///
    ///       Función General de Creacion                  ///
    ///                                                    ///
    ///                                                    ///
    //////////////////////////////////////////////////////////

    function satxmlsv33($arr, $edidata=false, $dir="./tmp/",$nodo="",$addenda="") {

        $arr['Client']['Calle_numero'] = 'SWAYNE AVE #600';
        $arr['Client']['RFC'] = '814412149';
        $arr['Client']['Colonia'] = 'FORT WORTH';
        $arr['Client']['Municipio'] = 'TARRANT';
        $arr['Client']['Estado'] = 'TX';
        $arr['Client']['Pais'] = 'USA';
        $arr['Client']['CP'] = '76111';

    
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
        global $root, $xml, $TotalImporte_Factura, $descDistriduidor;
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
                                "xmlns:cce11"=>"http://www.sat.gob.mx/ComercioExterior11",                                                              // http://omawww.sat.gob.mx/sitio_internet/cfd/ComercioExterior11/ComercioExterior11.xsd
                                "xsi:schemaLocation"=>"http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd http://www.sat.gob.mx/ComercioExterior11 http://www.sat.gob.mx/sitio_internet/cfd/ComercioExterior11/ComercioExterior11.xsd"
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
    
        $fecha = date("Y-m-d H:i:s"); 

        $descDistriduidor = number_format($arr['Client']['Descuento_%'] / 100, 6, '.', '');

        foreach ($arr['Details'] as $key => $value) {
            $Subtotal       += number_format($value['Cantidad_Real'] * $value['Precio_unitario'], 6, '.', '');
            $Importe        = number_format($value['Cantidad_Real'] * $value['Precio_unitario'], 6, '.', '');
            $descuentoCD    = number_format($Importe * ($descDistriduidor), 6, '.', '');
            $totalDesc      += $descuentoCD;
        }

        $Total             = floatval($Subtotal) - floatval($totalDesc);
    
        $this->satxmlsv33_cargaAtt($root, 
            array("Version"=>"3.3",
            "Serie"=>  $arr['Invoice']['serie'],
            "Folio"=> $arr['Sale']['ID'],
            "Fecha"=>$this->satxmlsv33_xml_fech($fecha),
            "Sello"=>"@",
            "FormaPago"=> $arr['Invoice']['wayToPay'],
            "MetodoPago"=> $arr['Invoice']['methodOfPayment'],
            "NoCertificado"=> $arr['Company']['noCertificado'],
            "Certificado"=>"@", 
            "SubTotal"=> number_format($Subtotal, 2, '.', ''),
            "Total"=> number_format($Total, 2, '.', ''),
            "Moneda"=> $arr['Invoice']['currency'],
            "Descuento"=> number_format( $totalDesc, 2, '.', ''),
            "TipoCambio"=>$arr['Invoice']['typeChange'],
            "TipoDeComprobante"=> $arr['Invoice']['voucher'],
            "LugarExpedicion"=> $arr['Company']['CP'],
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
    
        if ($arr['Relate'] != "" && $arr['Relate'] != null) {
            $cfdis = $xml->createElement("cfdi:CfdiRelacionados");
            $cfdis = $root->appendChild($cfdis);
            $this->satxmlsv33_cargaAtt($cfdis, array("TipoRelacion"=> $arr['Invoice']['typeOfRelationship']));
        
            foreach ($arr['Relate'] as $key => $value) {
                $cfdi = $xml->createElement("cfdi:CfdiRelacionado");
                $cfdi = $cfdis->appendChild($cfdi);
                $this->satxmlsv33_cargaAtt($cfdi, array("UUID"=>$value["UUID"]));
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
        $nombre = $this->satxmlsv33_fix_chr($arr['Company']['Razon_Social']);
        $this->satxmlsv33_cargaAtt($emisor, 
            array("Rfc"=> $arr['Company']['RFC'],
            "Nombre"=>  $nombre,
            "RegimenFiscal"=> $arr['Company']['Clave_Regimen_Fiscal']
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
        $nombre = $this->satxmlsv33_fix_chr($arr['Client']['Empresa']);
        $this->satxmlsv33_cargaAtt($receptor, 
            array("Rfc"=> 'XEXX010101000',
                "Nombre"=>$nombre,
                "NumRegIdTrib"=> $arr['Client']['RFC'],
                "ResidenciaFiscal"=> 'USA',
                "UsoCFDI"=> $arr['Invoice']['useCFDi']
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
        global $root, $xml, $descDistriduidor;

        $conceptos = $xml->createElement("cfdi:Conceptos");
        $conceptos = $root->appendChild($conceptos);

        foreach ($arr['Details'] as $key => $value) {

            $Importe        = number_format($value['Cantidad_Real'] * $value['Precio_unitario'], 6, '.', '');
            $descuentoCD    = number_format($importeSI * $descDistriduidor, 6, '.', '');

            $ImporteBase = $Importe - $descuentoCD;

            $concepto = $xml->createElement("cfdi:Concepto");
            $concepto = $conceptos->appendChild($concepto);
            $descripcion = $this->satxmlsv33_fix_chr($value['Producto']);
            $this->satxmlsv33_cargaAtt($concepto, 
                array("Cantidad"=> $value['Cantidad_Real'],
                    "Unidad"=> $value['UnidadMedida'],
                    "NoIdentificacion"=> $value['ID'],
                    "Descripcion"=>$descripcion,
                    "ValorUnitario"=> number_format($value['Precio_unitario'], 6, '.', ''),
                    "Importe"=> number_format($Importe, 6, '.', ''),
                    "ClaveProdServ"=> $value['ClaveSAT'],
                    "ClaveUnidad"=> $value['UnidadSAT'],
                    "Descuento"=> number_format($descuentoCD, 6, '.', '')
                )
            );
        
            if ($addenda == "") {
                $impuestos = $xml->createElement("cfdi:Impuestos");
                $impuestos = $concepto->appendChild($impuestos);
                $traslados = $xml->createElement("cfdi:Traslados");
                $traslados = $impuestos->appendChild($traslados);
                $traslado = $xml->createElement("cfdi:Traslado");
                $traslado = $traslados->appendChild($traslado);
                $this->satxmlsv33_cargaAtt($traslado, 
                    array("Base"=> number_format($ImporteBase, 2, '.', ''),
                        "Impuesto"=>"002",
                        "TipoFactor"=>"Tasa",
                        "TasaOCuota"=> '0.000000',
                        "Importe"=> number_format($ImporteBase, 2, '.', '')
                    )
                );
            }

            /*$InformacionAduanera  = $xml->createElement("cfdi:InformacionAduanera");
            $InformacionAduanera  = $concepto->appendChild($InformacionAduanera );
            $this->satxmlsv33_cargaAtt_pedimento($InformacionAduanera, 
                array("NumeroPedimento"=> $value['Pedimento'])
            );*/
        }
    }
    
    /////////////////////////////////////////////////////////
    ///                                                   ///
    ///              Datos del Impuesto (IVA)             ///
    ///                                                   ///
    ///                                                   ///
    /////////////////////////////////////////////////////////
    
    function satxmlsv33_impuestos($arr, $edidata, $dir,$nodo,$addenda) {
        global $root, $xml;

        if ($addenda == '') {
            //IVA
            $DesglozarIVA = 1 + $arr['Currency']['Impuesto_%'] / 100;
            $ObtenerIVA   = $arr['Currency']['Impuesto_%'] / 100;

            foreach ($arr['Details'] as $key => $value) {

                $Precio_Sin_IVA  = number_format($value['Precio_unitario'] / $DesglozarIVA, 2, '.', '');
                $Importe_Sin_IVA = number_format($value['Cantidad_Real'] * $Precio_Sin_IVA, 2, '.', '');
                $Subtotal       += number_format($Importe_Sin_IVA, 2, '.', '');
                $Importe_IVA     = number_format($Importe_Sin_IVA * $ObtenerIVA, 2, '.', '');
                $Total_IVA      += number_format($Importe_IVA, 2, '.', '');
            }
            
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
                        "TasaOCuota"=>$ObtenerIVA.'0000',
                        "Importe"=> number_format($Total_IVA, 2, '.', '')
                    )
                );
            
                $ImpuestosComprobante->SetAttribute("TotalImpuestosTrasladados",$Total_IVA);
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

        foreach ($arr['Details'] as $key => $value) {
            $Importe        += number_format($value['Cantidad_Real'] * $value['Precio_unitario'], 6, '.', '');
            $descuentoCD    += number_format($importeSI * $descDistriduidor, 6, '.', '');
        }

        $Total = number_format($Importe - $descuentoCD, 6, '.', '');

        $Complemento = $xml->createElement("cfdi:Complemento");
        $Complemento = $root->appendChild($Complemento);
        $cce11 = $xml->createElement("cce11:ComercioExterior");
        $cce11->SetAttribute("Version","1.1");
        $cce11->SetAttribute("TipoOperacion","2");
        $cce11->SetAttribute("ClaveDePedimento","A1");
        $cce11->SetAttribute("CertificadoOrigen","0");
        $cce11->SetAttribute("Incoterm","DDP");
        $cce11->SetAttribute("Subdivision","0");
        $cce11->SetAttribute("TipoCambioUSD",$arr["Invoice"]["typeChange"]);
        $cce11->SetAttribute("TotalUSD",number_format($Total, 2, '.', ''));

           $Emisor = $xml->createElement("cce11:Emisor");
                $Domicilio = $xml->createElement("cce11:Domicilio");
                $Domicilio->SetAttribute("Referencia","México"); 
                $Domicilio->SetAttribute("Pais","MEX");
                $Domicilio->SetAttribute("NumeroInterior","35");
                $Domicilio->SetAttribute("Municipio","097");
                $Domicilio->SetAttribute("Localidad","11");
                $Domicilio->SetAttribute("Estado","JAL");
                $Domicilio->SetAttribute("Colonia","4060");
                $Domicilio->SetAttribute("CodigoPostal","45645");
                $Domicilio->SetAttribute("Calle","Industria Electrica");
                $Domicilio = $Emisor->appendChild($Domicilio);
           $Emisor = $cce11->appendChild($Emisor);

           $calle = explode("#",$arr['Client']['Calle_numero']);

           $numero = explode(" ",$calle[1]);

           $Receptor = $xml->createElement("cce11:Receptor");
                $DomicilioR = $xml->createElement("cce11:Domicilio");
                $DomicilioR->SetAttribute("Pais","USA");
                $DomicilioR->SetAttribute("Municipio",$arr['Client']['Municipio']);
                $DomicilioR->SetAttribute("Localidad","11");
                $DomicilioR->SetAttribute("Estado",$arr['Client']['Estado']);
                $DomicilioR->SetAttribute("CodigoPostal",$arr['Client']['CP']);
                $DomicilioR->SetAttribute("Calle",$calle[0]);
                $DomicilioR->SetAttribute("NumeroExterior",$numero[0]);

                if (isset($numero[1])) {
                    $DomicilioR->SetAttribute("NumeroInterior",$numero[1]);
                }
                
                $DomicilioR = $Receptor->appendChild($DomicilioR);
           $Receptor = $cce11->appendChild($Receptor);
    
           $Mercancias = $xml->createElement("cce11:Mercancias");

           foreach ($arr['Details'] as $key => $value) {

               $Mercancia = $xml->createElement("cce11:Mercancia");
               $Mercancia->SetAttribute("NoIdentificacion",$value["ID"]);
               if ($value["Fraccion"]!="") {
                   $Mercancia->SetAttribute("FraccionArancelaria",trim($value["Fraccion"]));
               }
               $Mercancia->SetAttribute("ValorDolares", number_format($value['Cantidad_Real'] * $value['Precio_unitario'], 2, '.', ''));
               if ($value["UMT"] != "N/A") {
                $Mercancia->SetAttribute("UnidadAduana",$value["UMT"]);
               }               
               $Mercancia->SetAttribute("ValorUnitarioAduana",$value["Precio_unitario"]);
               $Mercancia->SetAttribute("CantidadAduana",$value["Cantidad_Real"]);
    
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

    /////////////////////////////////////////////////////////
    ///                                                   ///
    /// Funcion que carga los atributos a la etiqueta XML ///
    ///              Pedimento                            ///
    ///                                                   ///
    /////////////////////////////////////////////////////////
    
    function satxmlsv33_cargaAtt_pedimento(&$nodo, $attr) {
        global $xml, $sello;
        $quitar = array('sello'=>1,'noCertificado'=>1,'certificado'=>1);
        foreach ($attr as $key => $val) {
            for ($i=0;$i<strlen($val); $i++) {
                $a = substr($val,$i,1);
                if ($a > chr(127) && $a !== chr(219) && $a !== chr(211) && $a !== chr(209)) {
                    $val = substr_replace($val, ".", $i, 1);
                }
            }
            //$val = preg_replace('/\s\s+/', ' ', $val);   // Regla 5a y 5c
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
    
    function satxmlsv33_genera_cadena_original() {
        global $xml, $cadena_original;
        $paso = new DOMDocument("1.0","UTF-8");
        $paso->loadXML($xml->saveXML());
        $xsl = new DOMDocument("1.0","UTF-8");
        $xsl->load('http://omawww.sat.gob.mx/sitio_internet/cfd/3/cadenaoriginal_3_3/cadenaoriginal_3_3.xslt');
        $proc = new XSLTProcessor;
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
        // $certificadoKEY = $arr['Company']['CSD_key'];
        // $certificadoCER = $arr['Company']['CSD_cer']; 
        $certificadoKEY = 'C:\wamp64\www\Avyna_Desk\Sellos\CSD\CSD_Avyna_Cosmeticos,_SA_de_CV_ACO140605RN0_20180529_123920.key';
        $certificadoCER = 'C:\wamp64\www\Avyna_Desk\Sellos\CSD\00001000000411008341.cer';

        $file = $certificadoKEY.".pem"; 
        $pkeyid = openssl_pkey_get_private(file_get_contents($file));
        
        openssl_sign($cadena_original, $crypttext, $pkeyid, OPENSSL_ALGO_SHA256);
        openssl_free_key($pkeyid);
        
        $sello = base64_encode($crypttext);
        $root->setAttribute('Sello',$sello);
        $file = $certificadoCER.".pem";
        $datos = file($file);
        $certificadoCER = ""; $carga = false;
        for ($i=0; $i<sizeof($datos); $i++) {
            if (strstr($datos[$i],"END CERTIFICATE")) $carga=false;
            if ($carga) $certificadoCER .= trim($datos[$i]);
            if (strstr($datos[$i],"BEGIN CERTIFICATE")) $carga=true;
        }
        $root->setAttribute('Certificado', $certificadoCER);
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
        $dir  =  $_SERVER['DOCUMENT_ROOT'].'/Prosalon_Desk/XMLs/';                                                             //Ruta donde se guardaran los archivos XML sin timbrar
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
}

?>