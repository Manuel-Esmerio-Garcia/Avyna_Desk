<?php
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 0);

$now = new DateTime();    // MySQL datetime format

include '../fpdf/fpdf.php';
include '../fpdi/fpdi.php';
include('../../ecodexphp/includes.php');
include('../Letra.php');

require('../Conexion.php');
//include('../dompdf/dompdf.php');

$Conexion = new Conexion(); 

if(isset($_GET['ID']))
{
  $ID = $_GET['ID'];

  $Formato_Español = 'Formato_Factura_33_a.pdf';
  $Formato_Ingles  = '';
  $idioma = 'ES';                                   //Este valor debera cambiar segun el idioma


  $Cliente                        = null;
  $RFC_Cliente                    = null;
  $Domicilio                      = null;
  $Emisor_RFC                     = null;
  $Emisor_Empresa                 = null;
  $Emisor_Clave_Regimen           = null;
  $Emisor_Descripcion_Regimen     = null;
  $Emisor_Direccion               = null;
  $Emisor_Colonia                 = null;
  $Emisor_Pais                    = null;
  $Emisor_Estado                  = null;
  $Emisor_Municipio               = null;
  $Emisor_CP                      = null;
  $Emisor_Certificado             = null;
  $FormaPago                      = null;
  $MetodoPago                     = null;
  $valor                          = 0;
  $TotalImpuesto                  = 0;
  $UUID                           = null;
  $Fecha_Emision                  = null;
  $CertificadoSAT                 = null;
  $FechaSAT                       = null;
  $SelloSAT                       = null;
  $SelloCFD                       = null;
  $RFC_PAC                        = null;
  $FormaPago                      = null;
  $MetodoPago                     = null;
  $UsoCFDI                        = null;
  $Comprobante                    = null;
  $Moneda                         = null;
  $Observaciones                  = null;
  $Folio                          = null;
  $Serie                          = null;
  $Unidad                         = null;
  $Sello                          = null;
  $Certificado                    = null;
  $UUID_Relacionado               = null;
  $rowsRelacion                   = 0;

  /*DATABASE REQUEST*/
  
  /*$servername = "prosalon4810.cloudapp.net";
  $username = "prosalon";
  $password = "prosalonAdmin1";
  $databaseName = "prosalon";*/

  $conn = $Conexion->Connect();

  $QueryRFC   = "SELECT RFC_Cliente FROM Factura WHERE IDVenta = ".$ID;

  $ResultRFC  = mysqli_query($conn, $QueryRFC);

  if(empty($ResultRFC) == false)
  {
    $rows = mysqli_num_rows($ResultRFC);
  }

  if ($rows == 0) 
  {
     print_r("El ID de la venta no esta asociado a una factura");
     exit();
  }

   while($rfc = mysqli_fetch_array($ResultRFC))
  {
    $RFC_Cliente           = $rfc['RFC_Cliente'];
  }

  if ($RFC_Cliente != 'XAXX010101000') {

  $sqlQuery = "SELECT F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, F.CertificadoSAT, F.FechaSAT, F.SelloSAT, F.SelloCFD, F.RFC_PAC, F.FormaPago, F.MetodoPago, F.UsoCFDI, F.Comprobante, F.Moneda,F.Observaciones,F.Sello,F.Certificado, VM.ID AS IDVenta, CONCAT(CL.Nombre, ' ', CL.Apellidos) AS Distribuidor, CL.regimenFiscal,
        CL.Empresa, CL.RFC, CL.CP, CL.Calle_numero, CL.Colonia, CL.Ciudad, CL.Municipio,CL.Municipio,CL.Estado,CL.Pais ,CA.Codigo, CA.Producto, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT,DVM.Importe ,DVM.Cantidad,DVM.Precio_unitario,DVM.idCatalogo,VM.Descuento,VM.Subtotal,VM.Impuestos,VM.Total,VM.Total_desc,V.Descuento as Descuento_Venta, V.Total AS Total_Venta
      from Ventas as V join Factura as F ON V.ID = F.IDVenta join Clientes as CL ON V.idCliente = CL.ID join Ventas_menudeo as VM ON V.ID = VM.idVenta join Detalle_venta_menudeo_temp AS DVM on VM.ID = DVM.idVenta_menudeo join Catalogo AS CA on CA.ID = DVM.idCatalogo
            where F.IDVenta = " . $ID; 
  }
  else
  {

  $sqlQuery = "SELECT F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, F.CertificadoSAT, F.FechaSAT, F.SelloSAT, F.SelloCFD, F.RFC_PAC, F.FormaPago, F.MetodoPago, F.UsoCFDI, F.Comprobante, F.Moneda,F.Observaciones,F.Sello,F.Certificado, VM.ID AS IDVenta, CONCAT(CL.Nombre, ' ', CL.Apellidos) AS Distribuidor, CL.regimenFiscal,
        CL.Empresa, CL.RFC, CL.CP, CL.Calle_numero, CL.Colonia, CL.Ciudad, CL.Municipio,CL.Municipio,CL.Estado,CL.Pais ,CA.Codigo, CA.Producto, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT,DVM.Importe ,DVM.Cantidad,DVM.Precio_unitario,DVM.idCatalogo,VM.Descuento,VM.Subtotal,VM.Impuestos,VM.Total,VM.Total_desc,V.Descuento as Descuento_Venta, V.Total AS Total_Venta
      from Ventas as V join Factura as F ON V.ID = F.IDVenta join Clientes as CL ON F.RFC_Cliente = CL.RFC join Ventas_menudeo as VM ON V.ID = VM.idVenta join Detalle_venta_menudeo_temp AS DVM on VM.ID = DVM.idVenta_menudeo join Catalogo AS CA on CA.ID = DVM.idCatalogo
            where F.IDVenta = " . $ID;
  }

  $sqlResult      = mysqli_query($conn, $sqlQuery);
  $sqlMovimientos = mysqli_query($conn, $sqlQuery);

  if(empty($sqlResult) == false)
  {
    $rows = mysqli_num_rows($sqlResult);
  }

  while($rowTemp = mysqli_fetch_array($sqlResult))
  {
    $ID_Factura           = $rowTemp['ID'];
    $ID_Empresa           = $rowTemp['VentaFactura'];
    $UUID                 = $rowTemp['UUID'];
    $Fecha_Emision        = $rowTemp['FechaInvoice'];
    $CertificadoSAT       = $rowTemp['CertificadoSAT'];
    $FechaSAT             = $rowTemp['FechaSAT'];
    $SelloSAT             = $rowTemp['SelloSAT'];
    $SelloCFD             = $rowTemp['SelloCFD'];
    $RFC_PAC              = $rowTemp['RFC_PAC'];
    $FormaPago            = $rowTemp['FormaPago'];
    $MetodoPago           = $rowTemp['MetodoPago'];
    $UsoCFDI              = $rowTemp['UsoCFDI'];
    $Comprobante          = $rowTemp['Comprobante'];
    $Moneda               = $rowTemp['Moneda'];
    $Observaciones        = $rowTemp['Observaciones'];
    $Folio                = $rowTemp['Folio'];
    $Serie                = $rowTemp['Serie'];
    $Sello                = $rowTemp['Sello'];
    $Certificado          = $rowTemp['Certificado'];
    $Empresa              = $rowTemp['Empresa'];
    $Descuento            = $rowTemp['Descuento_Venta'];
    $Subtotal             = $rowTemp['Subtotal'];
    $Impuestos            = $rowTemp['Impuestos'];
    $Total                = $rowTemp['Total'];
    $Total_Venta          = $rowTemp['Total_Venta'];
    $Total_desc           = $rowTemp['Total_desc'];
    $numberIdCatalogo     = intval($rowTemp["idCatalogo"]);
    $RFC_Cliente          = $rowTemp['RFC'];
    $direccion            = $rowTemp["Calle_numero"] . ' '. $rowTemp["Colonia"] . ' ' . $rowTemp["CP"] . ' '. $rowTemp["Municipio"] . ' ' . $rowTemp["Estado"];
    $fecha                = date('d/m/Y h:i A', strtotime($rowTemp["FechaInvoice"]));
    //$total_producto = $total_producto + intval($rowTemp["Cantidad"]);
  }

  $QueryMoneda = "SELECT * FROM Monedas where ClaveSAT = '".$Moneda."'";
  $sqlMoneda = mysqli_query($conn, $QueryMoneda);
  while($ResultMoneda = mysqli_fetch_array($sqlMoneda))
  {
      $IVA    =  $ResultMoneda['Impuesto_%'] / 100;
  }

  $sqlQuery3 = "SELECT * FROM Empresa WHERE ID = 1";
  $sqlResult3 = mysqli_query($conn, $sqlQuery3);
  while($row3 = mysqli_fetch_array($sqlResult3))
  {

      $Emisor_RFC                 = $row3['RFC'];
      $Emisor_Empresa             = $row3['Razon_Social'];
      $Emisor_Clave_Regimen       = $row3['Clave_Regimen_Fiscal'];
      $Emisor_Descripcion_Regimen = $row3['Descripcion_Regimen_Fiscal'];
      $Emisor_Direccion           = $row3['Direccion'];
      $Emisor_Colonia             = $row3['Colonia'];
      $Emisor_Pais                = $row3['Pais'];
      $Emisor_Estado              = $row3['Estado'];
      $Emisor_Municipio           = $row3['Municipio'];
      $Emisor_CP                  = $row3['CP'];
      $Emisor_Certificado         = $row3['noCertificado'];
  }


  $sqlQuery2 = "SELECT COUNT(*) as Total from Ventas as V join Factura as F ON V.ID = F.IDVenta join Clientes as CL ON V.idCliente = CL.ID join Ventas_menudeo as VM ON V.ID = VM.idVenta join Detalle_venta_menudeo_temp AS DVM on VM.ID = DVM.idVenta_menudeo join Catalogo AS CA on CA.ID = DVM.idCatalogo where F.IDVenta =" . $ID;
  $sqlResult2 = mysqli_query($conn, $sqlQuery2);
  while($row2 = mysqli_fetch_array($sqlResult2))
  {
    $totalFilas = $row2['Total'];
  }

  $pdf = new FPDI();

  if($idioma == "ES")
  {
    $pdf->setSourceFile($Formato_Español);
  }
  else if($idioma == "EN")
  {
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

    if ($Comprobante == "I") 
    {
      $Tipo_Valor = "Ingreso";

    }else if ($Comprobante == "E") 

    {
      
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

    if ($MetodoPago == 'PUE') 
    {

        $Metodo_Valor = 'Pago en una sola exhibicion';

    }else if ($MetodoPago == 'PPD') 
    {
        $Metodo_Valor = 'Pago en parcialidades o diferido';
    }


    $pdf->SetXY(46, 50);
    $pdf->Cell(90, 3, $MetodoPago." - ".$Metodo_Valor, 0,0, 'L');

     switch ($Moneda) 
     {     
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

    switch ($UsoCFDI) 
     {
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

    while($Movimiento = mysqli_fetch_array($sqlMovimientos))
    {
      $Codigo                 = $Movimiento['Codigo'];
      $Producto               = $Movimiento['Producto'];
      $UnidadMedida           = $Movimiento['UnidadMedida'];
      $UnidadSAT              = $Movimiento['UnidadSAT'];
      $ClaveSAT               = $Movimiento['ClaveSAT'];
      $Importe                = $Movimiento['Importe'];
      $Cantidad               = $Movimiento['Cantidad'];
      $Precio_unitario        = $Movimiento['Precio_unitario'];
      $Unidad                 = $Movimiento['UnidadMedida'];
      $Impuestos_Movimiento   = $Importe * $IVA;


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

    $num2 = new letra();
    $NumeroLetra = $num2->num2letras($Total_Venta);
    $pdf->Ln(5);
    $pdf->Cell(25,5,'Importe con letra: '.$NumeroLetra, 0, 0,'L');

    if ($IVA == 0.16) {
        
        $IVA_Valor = 1.16;

        $Subtotal_Venta = $Total_Venta / $IVA_Valor;
    }

    $Impuestos_Venta = $Total_Venta - $Subtotal_Venta;

      $pdf->Ln(5);

      if ($Observaciones != null && $Observaciones != "") 
      {
        $pdf->SetFont('Arial','B',9);
        $pdf->Cell(25,5,'Observaciones: ', 0, 0,'L');
        $pdf->SetFont('Arial','',9);
        $pdf->MultiCell(120,5,utf8_decode($Observaciones),0,'L',0);
      }

      /*$Seguridad = new Seguridad();                                         //Se crea instancia de la clase Seguridad
      $trsID = rand( 1, 10000 );                          //Se genera el ID
      $Token = $Seguridad->ObtenerToken( $Emisor_RFC, $trsID );                                //Se genera el token de servicio

      $Timbra = new Timbrado();                                           //Se crea instancia de la clase Timbrado
      $trsID = rand(1, 10000);                                            //Se genera el ID
      $Token = $Seguridad->ObtenerToken($Emisor_RFC, $trsID );

      $CodigoQR = $Timbra->ObtenerQRTimbrado($Emisor_RFC, $Token, $UUID);

      print_r($CodigoQR);
      exit(); */


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

      $sqlQuery4 = "SELECT * FROM Factura_Relacion WHERE UUID_Factura = '".$UUID."'";

     $sqlResult4        = mysqli_query($conn, $sqlQuery4);
     $sqlResultRelacion = mysqli_query($conn, $sqlQuery4);

      while($rowTemp1 = mysqli_fetch_array($sqlResultRelacion, MYSQL_ASSOC))
      {
          $UUID_Relacionado = $rowTemp1['UUIDRelacionado'];

      }

    if($UUID_Relacionado != null && $UUID_Relacionado != "")
    {
        $pdf->SetFont('Arial','B',9);
        $pdf->cell(15,5,"CFDI's Relacionados",0,0,'L');
        $pdf->Ln(5);

      while($rowTemp1 = mysqli_fetch_array($sqlResult4))
      {
        $pdf->SetFont('Arial','',9);
        $pdf->Cell(15,5,$rowTemp1['TipoRelacion']." - ".$rowTemp1['UUIDRelacionado'], 0, 0,'L');
        $pdf->Ln(5);
      }

    }
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
$pdf->Output('I', 'Factura-N-'.$ID.'-'.str_replace(" ", "_", $RFC_Cliente).'-'.str_replace(" ", "_", $Cliente).'.pdf');
//$pdf->Output('recibos.pdf', 'D');

}

?>