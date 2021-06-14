<?php
  ini_set('memory_limit', '-1');
  ini_set('max_execution_time', 0);

  $now = new DateTime();    // MySQL datetime format

  include '../fpdf/fpdf.php';
  include '../fpdi/fpdi.php';
  include('../../Clases/Letra.php');

  require('../../Clases/Conexion.php');
  //include('../dompdf/dompdf.php');

  $Conexion = new Conexion(); 

  if(isset($_GET['ID'])){

    $ID              = $_GET['ID'];
    $Formato_Español = 'Formato_Factura_33_a.pdf';
    $Formato_Ingles  = '';
    $idioma          = 'ES'; 


    $conn            = $Conexion->Connect();

    // Get Información Venta //
    $queryGetVenta   = "SELECT * FROM Ventas WHERE ID = ".$ID;
    $resultGetVenta  = $Conexion->Query($queryGetVenta);

    // Get Información Factura //
    $queryGetFactura  = "SELECT * FROM Factura WHERE IDVenta = ".$ID;
    $resultGetFactura = $Conexion->Query($queryGetFactura);

    // Validar Información //
    if ($resultGetVenta[0]['idCliente'] != 261 && $resultGetVenta[0]['idCliente'] != 1967) {
      $queryInfoInvoice = "SELECT F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, F.CertificadoSAT, F.FechaSAT, F.SelloSAT, F.SelloCFD, F.RFC_PAC, F.FormaPago, F.MetodoPago, F.UsoCFDI, F.Comprobante, F.Moneda,F.Observaciones,F.Sello,F.Certificado, V.ID AS IDVenta, CONCAT(CL.Nombre, ' ', CL.Apellidos) AS Distribuidor, CL.regimenFiscal,
        CL.Empresa, CL.RFC, CL.CP, CL.Calle_numero, CL.Colonia, CL.Ciudad, CL.Municipio,CL.Municipio,CL.Estado,CL.Pais, V.Descuento as Descuento_Venta, V.Total AS Total_Venta, V.Tipo_Factura
        from Ventas AS V 
        join Factura as F ON V.ID = F.IDVenta 
        join Clientes as CL ON V.idCliente = CL.ID 
        where F.IDVenta = " . $ID;      
    }
    else{
      $queryInfoInvoice = "SELECT F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, F.CertificadoSAT, F.FechaSAT, F.SelloSAT, F.SelloCFD, F.RFC_PAC, F.FormaPago, F.MetodoPago, F.UsoCFDI, F.Comprobante, F.Moneda,F.Observaciones,F.Sello,F.Certificado, VM.ID AS IDVenta, CONCAT(CL.Nombre, ' ', CL.Apellidos) AS Distribuidor, CL.Empresa, CL.RFC, CL.CP, CL.Calle_numero, CL.Colonia, CL.Ciudad, CL.Municipio,CL.Municipio,CL.Estado,CL.Pais ,VM.Descuento,VM.Subtotal,VM.Impuestos,VM.Total,VM.Total_desc,V.Descuento as Descuento_Venta, V.Total AS Total_Venta, V.Tipo_Factura
        FROM Ventas as V 
        INNER JOIN Factura as F ON V.ID = F.IDVenta 
        INNER JOIN Clientes as C ON V.idCliente = C.ID 
        INNER JOIN Ventas_menudeo as VM ON V.ID = VM.idVenta
        INNER JOIN Clientes_menudeo as CL ON VM.idCliente_menudeo = CL.ID 
        WHERE F.IDVenta = " . $ID;
    }

    $resultInfoInvoice = $Conexion->Query($queryInfoInvoice);

    // Get Productos //
    $queryGetProducto = "SELECT CA.ID, CA.Codigo, CA.Producto, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT, DVM.Cantidad, DVM.Precio_unitario, DVM.Importe
      FROM Ventas as V 
      INNER JOIN Ventas_menudeo as VM ON V.ID = VM.idVenta 
      INNER JOIN detalle_venta_menudeo_oferta AS DVM on VM.ID = DVM.idVenta_menudeo 
      INNER JOIN Catalogo AS CA on CA.ID = DVM.idCatalogo
      WHERE V.ID = " .  $ID;

    $resultGetProducto = $Conexion->Query($queryGetProducto);

    // Get Información Promoción //
    $queryGetPromo = "SELECT DVMO.*, P.Promocion, ('XPK') AS ClaveUnidad, (01010101) AS ClaveProdServ 
      FROM detalle_venta_menudeo_oferta AS DVMO 
      INNER JOIN promociones AS P ON DVMO.idPromocion = P.ID 
      WHERE DVMO.idCatalogo IS NULL AND DVMO.ID_Venta = " . $ID;

    $resultGetPromo = $Conexion->Query($queryGetPromo);

    foreach ($resultInfoInvoice as $key => $value) {

      $ID_Factura           = $value['ID'];
      $ID_Empresa           = $value['VentaFactura'];
      $UUID                 = $value['UUID'];
      $Fecha_Emision        = $value['FechaInvoice'];
      $CertificadoSAT       = $value['CertificadoSAT'];
      $FechaSAT             = $value['FechaSAT'];
      $SelloSAT             = $value['SelloSAT'];
      $SelloCFD             = $value['SelloCFD'];
      $RFC_PAC              = $value['RFC_PAC'];
      $FormaPago            = $value['FormaPago'];
      $MetodoPago           = $value['MetodoPago'];
      $Comprobante          = $value['Comprobante'];
      $Moneda               = $value['Moneda'];
      $Observaciones        = $value['Observaciones'];
      $Folio                = $value['Folio'];
      $Serie                = $value['Serie'];
      $Sello                = $value['Sello'];
      $Certificado          = $value['Certificado'];
      $Descuento            = $value['Descuento_Venta'];
      // $Subtotal             = $value['Subtotal'];
      // $Impuestos            = $value['Impuestos'];
      // $Total                = $value['Total'];
      $Total_Venta          = $value['Total_Venta'];
      // $Total_desc           = $value['Total_desc'];
      // $numberIdCatalogo     = intval($value["idCatalogo"]);

      if ($value['Tipo_Factura'] == 1){
          $RFC_Cliente          = 'XAXX010101000';
          $UsoCFDI              = 'G01';
          $Empresa              = 'Publico en General';
          $direccion            = '';
      }
      else{
          $RFC_Cliente          = $value['RFC'];
          $UsoCFDI              = $value['UsoCFDI'];
          $Empresa              = $value['Empresa'];
          $direccion            = $value["Calle_numero"] . ' '. $value["Colonia"] . ' ' . $value["CP"] . ' '. $value["Municipio"] . ' ' . $value["Estado"];
      }
      
      $fecha                = date('d/m/Y h:i A', strtotime($value["FechaInvoice"]));
    }


    $queryGetMoneda  = "SELECT * FROM Monedas WHERE ClaveSAT = '".$Moneda."'";
    $resultGetMoneda = $Conexion->Query($queryGetMoneda);

    $queryGetEmpresa  = "SELECT * FROM Empresa WHERE ID = 1";
    $resultGetEmpresa = $Conexion->Query($queryGetEmpresa);

    foreach ($resultGetEmpresa as $key => $value) {
      $Emisor_RFC                 = $value['RFC'];
      $Emisor_Empresa             = $value['Razon_Social'];
      $Emisor_Clave_Regimen       = $value['Clave_Regimen_Fiscal'];
      $Emisor_Descripcion_Regimen = $value['Descripcion_Regimen_Fiscal'];
      $Emisor_Direccion           = $value['Direccion'];
      $Emisor_Colonia             = $value['Colonia'];
      $Emisor_Pais                = $value['Pais'];
      $Emisor_Estado              = $value['Estado'];
      $Emisor_Municipio           = $value['Municipio'];
      $Emisor_CP                  = $value['CP'];
      $Emisor_Certificado         = $value['noCertificado'];
    }


    $queryTotalFila = "SELECT COUNT(*) as Total 
      FROM Ventas as V 
      join Factura as F ON V.ID = F.IDVenta 
      join Clientes as CL ON V.idCliente = CL.ID 
      join Ventas_menudeo as VM ON V.ID = VM.idVenta 
      join Detalle_venta_menudeo_temp AS DVM on VM.ID = DVM.idVenta_menudeo 
      join Catalogo AS CA on CA.ID = DVM.idCatalogo 
      where F.IDVenta = " . $ID;

    $resultTotalFila = $Conexion->Query($queryTotalFila);

    // $queryRelacion = "SELECT * FROM Factura_Relacion WHERE UUID_Factura = '".$UUID."'";
    // $resultRelacion = $Conexion->Query($queryRelacion);

    $pdf = new FPDI();

    if($idioma == "ES"){
      $pdf->setSourceFile($Formato_Español);
    }
    else if($idioma == "EN"){
      $pdf->setSourceFile($Formato_Ingles);
    }

    //agregamos una pagina
    $pdf->AddPage();
    // seleccionamos la primera pagina del docuemnto importado
    $tplIdx = $pdf->importPage(1);
    // usamos la pagina importado como template
    $pdf->useTemplate($tplIdx);
    // importamos el documento

    $pdf->SetFont('Arial','', 12);
    $pdf->SetXY(130, 12);
    $pdf->Cell(30,5, utf8_decode($Emisor_Empresa),0,0,'C');

    $pdf->SetFont('Arial','', 8);

    $pdf->SetXY(150, 18);
    $pdf->Cell(30,5, $Emisor_RFC,0,0,'L');

    $pdf->SetXY(110, 34);
    $pdf->Cell(30,5, $Emisor_Clave_Regimen.' - '.utf8_decode($Emisor_Descripcion_Regimen),0,0,'L');

    $pdf->SetXY(115, 31);
    $pdf->Cell(30,5,$Emisor_CP ,0,0,'L');
    
    $pdf->SetFont('Arial','', 9);
    $pdf->SetXY(132, 42);
    $pdf->Cell(30,5,$Folio,0,0,'C');

    $pdf->SetXY(132, 48);
    $pdf->Cell(30,5,$Serie,0,0,'C');
    
    $pdf->SetXY(143, 54);
    $pdf->Cell(60,5, $fecha,0,0,'L');

    if ($Comprobante == "I"){
      $Tipo_Valor = "Ingreso";
    }else if ($Comprobante == "E"){
      $Tipo_Valor = "Egreso";
    }

    $pdf->SetFont('Arial','', 9);

    $pdf->SetXY(117, 26);
    $pdf->Cell(30,5, $Comprobante." - ".$Tipo_Valor,0,0,'L');
 

    $pdf->SetXY(36, 67);
    $pdf->Cell(172,5,utf8_decode($Empresa),0,0,'L');

    $pdf->SetXY(36, 71);
    $pdf->Cell(172,5,$RFC_Cliente,0,0,'L');

    $pdf->SetXY(36, 76);
    $pdf->MultiCell(170, 3, utf8_decode($direccion), 0, 'L', false);

    switch ($FormaPago) {
      case '99':
        $Forma_Valor = "Por definir";
        break;
      case '01':
        $Forma_Valor = "Efectivo";
        break;
      case '02':
        $Forma_Valor = "Cheque nominativo";
        break;
      case '03':
        $Forma_Valor = "Transferencia electrónica de fondos";
        break;
      case '04':
        $Forma_Valor = "Tarjeta de crédito";
        break;
      case '05':
        $Forma_Valor = "Monedero electrónico";
        break;
      case '06':
        $Forma_Valor = "Dinero electrónico";
        break;
      case '08':
        $Forma_Valor = "Vales de despensa";
        break;
      case '12':
        $Forma_Valor = "Dación en pago";
        break;
      case '13':
        $Forma_Valor = "Pago por subrogación";
        break;
      case '14':
        $Forma_Valor = "Pago por consignación";
        break;
      case '15':
        $Forma_Valor = "Condonación";
        break;
      case '17':
        $Forma_Valor = "Compensación";
        break;
      case '23':
        $Forma_Valor = "Novación";
        break;
      case '24':
        $Forma_Valor = "Confusión";
        break;
      case '25':
        $Forma_Valor = "Remisión de deuda";
        break;
      case '26':
        $Forma_Valor = "Prescripción o caducidad";
        break;
      case '27':
        $Forma_Valor = "A satisfacción del acreedor";
        break;
      case '28':
        $Forma_Valor = "Tarjeta de débito";
        break;
      case '29':
        $Forma_Valor = "Tarjeta de servicios";
        break;
      case '30':
        $Forma_Valor = "Aplicación de anticipos";
        break;
        case '31':
        $Forma_Valor = "Intermediario pagos";
        break;

    }

    $pdf->SetXY(46, 42);
    $pdf->Cell(172,5,$FormaPago." - ".utf8_decode($Forma_Valor),0,0,'L');

    if ($MetodoPago == 'PUE'){

        $Metodo_Valor = 'Pago en una sola exhibicion';

    }else if ($MetodoPago == 'PPD'){
        $Metodo_Valor = 'Pago en parcialidades o diferido';
    }

    $pdf->SetXY(46, 50);
    $pdf->Cell(90, 3, $MetodoPago." - ".$Metodo_Valor, 0,0, 'L');

    switch ($Moneda){     
      case 'MXN':
        $Moneda_Valor = "Peso Mexicano";
        break;
      case 'USD':
        $Moneda_Valor = "Dolar americano";
        break;
      case 'EUR':
        $Moneda_Valor = "Euro";
        break;
    }

    $pdf->SetXY(46, 54);
    $pdf->Cell(172,5,$Moneda." - ".$Moneda_Valor,0,0,'L');

    switch ($UsoCFDI){
      case 'P01':
      $Uso_Valor = "Por definir";
      break;
      case 'G01':
      $Uso_Valor = "Adquisición de mercancias";
      break;
      case 'G02':
      $Uso_Valor = "Devoluciones, descuentos o bonificaciones";
      break;
      case 'G03':
      $Uso_Valor = "Gastos en general";
      break;
      case 'I01':
      $Uso_Valor = "Construcciones";
      break;
      case 'I02':
      $Uso_Valor = "Mobilario y equipo de oficina por inversiones";
      break;
      case 'I03':
      $Uso_Valor = "Equipo de transporte";
      break;
      case 'I04':
      $Uso_Valor = "Equipo de computo y accesorios";
      break;
      case 'I05':
      $Uso_Valor = "Dados, troqueles, moldes, matrices y herramental";
      break;
      case 'I06':
      $Uso_Valor = "Comunicaciones telefónicas";
      break;
      case 'I07':
      $Uso_Valor = "Comunicaciones satelitales";
      break;
      case 'I08':
      $Uso_Valor = "Otra maquinaria y equipo";
      break;
      case 'D01':
      $Uso_Valor = "Honorarios médicos, dentales y gastos hospitalarios";
      break;
      case 'D02':
      $Uso_Valor = "Gastos médicos por incapacidad o discapacidad";
      break;
      case 'D03':
      $Uso_Valor = "Gastos funerales";
      break;
      case 'D04':
      $Uso_Valor = "Donativos";
      break;
      case 'D05':
      $Uso_Valor = "Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)";
      break;
      case 'D06':
      $Uso_Valor = "Aportaciones voluntarias al SAR";
      break;
      case 'D07':
      $Uso_Valor = "Primas por seguros de gastos médicos";
      break;
      case 'D08':
      $Uso_Valor = "Gastos de transportación escolar obligatoria";
      break;
      case 'D09':
      $Uso_Valor = "Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones";
      break;
      case 'D10':
      $Uso_Valor = "Pagos por servicios educativos (colegiaturas)";
      break;
    }

    $pdf->SetXY(120, 70);
    $pdf->Cell(172,5,$UsoCFDI." - ".utf8_decode($Uso_Valor),0,0,'L');

    $pdf->SetXY(46, 100);
    $pdf->MultiCell(168, 3, '', 0, 'L', false);

    $pdf->Cell(1);
    $pdf->Ln(2);


    foreach ($resultGetProducto as $key => $value) {
      $Codigo                 = $value['Codigo'];
      $Producto               = $value['Producto'];
      $UnidadMedida           = $value['UnidadMedida'];
      $UnidadSAT              = $value['UnidadSAT'];
      $ClaveSAT               = $value['ClaveSAT'];
      $Importe                = $value['Importe'];
      $Cantidad               = $value['Cantidad'];
      $Precio_unitario        = $value['Precio_unitario'];
      $Unidad                 = $value['UnidadMedida'];

      $Impuestos_Movimiento   = $Importe  - ($Importe / 1.16);

      $pdf->SetX(15);
      $pdf->Cell(15, 5, $Cantidad, 0, 0, 'C', false);
      $pdf->Cell(15, 5, $Unidad, 0, 0, 'C', false);
      $pdf->Cell(15, 5, $UnidadSAT, 0, 0, 'C', false);
      $pdf->Cell(25, 5, $Codigo, 0, 0, 'C', false);
      $pdf->Cell(57, 5, utf8_decode($Producto), 0, 0, 'C', false);
      $pdf->Cell(18, 5, "$".number_format($Precio_unitario,2,".",","), 0, 0, 'C', false);
      $pdf->Cell(13, 5, '$0.00', 0, 0, 'C', false);
      $pdf->Cell(13, 5, "$".number_format($Impuestos_Movimiento,2,".",","), 0, 0, 'C', false);
      $pdf->Cell(18, 5, "$".number_format($Importe,2,".",","), 0, 0, 'C', false);  
      $pdf->Ln(5);
    }

    foreach ($resultGetPromo as $key => $value) {
      $Producto               = $value['Promocion'];
      $UnidadSAT              = $value['ClaveUnidad'];
      $ClaveSAT               = $value['ClaveProdServ'];
      $Importe                = $value['Importe'];
      $Cantidad               = $value['Cantidad'];
      $Precio_unitario        = $value['Precio_unitario'];
      $Impuestos_Movimiento   = $Importe  - ($Importe / 1.16);

      $pdf->SetX(15);
      $pdf->Cell(15, 5, $Cantidad, 0, 0, 'C', false);
      $pdf->Cell(15, 5, '', 0, 0, 'C', false);
      $pdf->Cell(15, 5, $UnidadSAT, 0, 0, 'C', false);
      $pdf->Cell(25, 5, '', 0, 0, 'C', false);
      $pdf->Cell(57, 5, utf8_decode($Producto), 0, 0, 'C', false);
      $pdf->Cell(18, 5, "$".number_format($Precio_unitario,2,".",","), 0, 0, 'C', false);
      $pdf->Cell(13, 5, '$0.00', 0, 0, 'C', false);
      $pdf->Cell(13, 5, "$".number_format($Impuestos_Movimiento,2,".",","), 0, 0, 'C', false);
      $pdf->Cell(18, 5, "$".number_format($Importe,2,".",","), 0, 0, 'C', false);  
      $pdf->Ln(5);
    }

    $num2 = new letra();
    $NumeroLetra = $num2->num2letras($Total_Venta);
    $pdf->Ln(5);
    $pdf->Cell(25,5,'Importe con letra: '.$NumeroLetra, 0, 0,'L');

    $IVA = floatval($resultGetMoneda[0]['Impuesto_%']) / 100;
    $IVA2 = $IVA + 1;

    $Subtotal_Venta = $Total_Venta / $IVA2;
    $Impuestos_Venta = $Total_Venta - $Subtotal_Venta;

    $pdf->Ln(5);

    if ($Observaciones != null && $Observaciones != ""){
      $pdf->SetFont('Arial','B',9);
      $pdf->Cell(25,5,'Observaciones: ', 0, 0,'L');
      $pdf->SetFont('Arial','',9);
      $pdf->MultiCell(120,5,utf8_decode($Observaciones),0,'L',0);
    }


    $pdf->SetFont('Arial','B',9);
    $pdf->SetX(160);
    $pdf->Cell(25,5,"Subtotal:", 0, 0,'L');
    $pdf->Cell(25,5,"$".number_format($Subtotal_Venta,2,".",","), 0, 0,'L');
    $pdf->Ln(5);

    $pdf->SetX(160);
    $pdf->Cell(25,5,"Descuento:", 0, 0,'L');
    $pdf->Cell(25,5,"$".$Descuento, 0, 0,'L');
    $pdf->Ln(5);
    
    $pdf->SetX(160);
    $pdf->Cell(25,5,"Impuesto:", 0, 0,'L');
    $pdf->Cell(25,5,"$".number_format($Impuestos_Venta,2,".",","), 0, 0,'L');
    $pdf->Ln(5);

    $pdf->SetX(160);
    $pdf->Cell(25,5,"Total:", 0, 0,'L');
    $pdf->Cell(25,5,"$".number_format($Total_Venta,2,".",","), 0, 0,'L');
    $pdf->Ln(10);

    // if(!empty($resultRelacion)){
    //   $pdf->SetFont('Arial','B',9);
    //   $pdf->cell(15,5,"CFDI's Relacionados",0,0,'L');
    //   $pdf->Ln(5);

    //   foreach ($resultRelacion as $key => $value) {
    //     $pdf->SetFont('Arial','',9);
    //     $pdf->Cell(15,5,$value['TipoRelacion']." - ".$value['UUIDRelacionado'], 0, 0,'L');
    //     $pdf->Ln(5);
    //   }
    // }
  
    /*Cadenas del Timbrado*/
    $pdf->Ln(10);
    $pdf->SetFont('Arial','B', 8);
    $pdf->MultiCell(185,5,'Sello Digital del CFDI', 1,'L',0);
    $pdf->SetFont('Arial','', 6);
    $pdf->MultiCell(185,3,$SelloCFD, 1,'L',0);

    $pdf->SetFont('Arial','B', 8);
    $pdf->MultiCell(185,5,'Sello SAT:', 1,'L',0);
    $pdf->SetFont('Arial','', 6);
    $pdf->MultiCell(185,3,$SelloSAT, 1,'L',0);

    $pdf->SetFont('Arial','B', 8);
    $pdf->MultiCell(185,5,'Cardena Original del comprobante de certificacion digital del SAT:', 1,'L',0);
    $pdf->SetFont('Arial','', 6);
    $pdf->MultiCell(185,3,$Sello, 1,'L',0);
    $pdf->Ln(5);

    $pdf->SetFont('Arial','B', 8);
    $pdf->Cell(57,5,'No de Serie del Certificado del SAT:', 1,0,'L');
    $pdf->SetFont('Arial','', 8);
    $pdf->Cell(57,5,$CertificadoSAT, 1,0,'C');
    $pdf->SetFont('Arial','B', 8);
    $pdf->SetX(125);
    $pdf->Cell(40,5,'No Certificado del CSD:', 1, 0,'C');
    $pdf->SetFont('Arial','',8);
    $pdf->Cell(40,5,$Emisor_Certificado, 1, 0,'C');
    $pdf->Ln(5);

    $pdf->SetFont('Arial','B', 8);
    $pdf->Cell(57,5,'Fecha y hora de Certificacion:', 1,0,'L');
    $pdf->SetFont('Arial','', 8);
    $pdf->Cell(57,5,$FechaSAT, 1,0,'C');
    $pdf->SetX(125);
    $pdf->SetFont('Arial','B', 8);
    $pdf->Cell(40,5,'Fecha y hora de emision:', 1, 0,'C');
    $pdf->SetFont('Arial','', 8);
    $pdf->Cell(40,5,$Fecha_Emision, 1, 0,'C');
    $pdf->Ln(5);

    $pdf->SetFont('Arial','B', 8);
    $pdf->MultiCell(114,5,'Folio Fiscal: '. $UUID, 1,'L',0);

    $pdf->Ln(20);
    $pdf->SetFont('Arial','B', 9);
    $pdf->MultiCell(175,5,'Este es una representacion impresa de un CFDI', 0,'C',0);

    //enviamos cabezales http para no tener problemas
    header("Content-Transfer-Encoding", "binary");
    header('Cache-Control: maxage=3600'); 
    header('Pragma: public');

    //enviamos el documento creado con un nombre nuevo y forzamos su descarga.
    $pdf->Output('Factura-N.pdf', 'I');
  }
?>