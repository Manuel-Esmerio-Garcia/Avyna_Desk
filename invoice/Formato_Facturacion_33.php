<?php
ob_start();
error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 0);

include 'fpdf/fpdf.php';
include 'fpdi/fpdi.php';
include('../ecodexphp/includes.php');
include('Letra.php');
require('Conexion.php');

if(isset($_GET['ID'])){

  // Declaración de Objetos //
  $now      = new DateTime();
  $pdf      = new FPDI();
  $Conexion = new Conexion();

  // Declaración de Variables //
  $id     = $_GET['ID'];
  $format = 'Formato_Factura_33_a.pdf';
  $conn   = $Conexion->Connect();
  $Tipo   = '';
  $Forma  = '';
  $Metodo = '';
  $Moneda = '';
  $Uso    = '';
  $Subtotal = '';
  $IVA    = '';

  // Creación de Querys //

  /**** Obtener Infomación Factura Por idVenta ****/
  $queryFactura   = "SELECT * FROM Pro_factura WHERE idPro_venta = ".$id." AND Status = 'Timbrado'";
  $resultFactura  = $Conexion->Query($queryFactura);

   /**** Obtener Infomación Ventas ****/
   $queryVenta   = "SELECT * FROM Pro_ventas WHERE ID = ".$id."";
   $resultVenta  = $Conexion->Query($queryVenta);

  /**** Obtener Infomación Empresa ****/
  $queryEmpresa   = "SELECT * FROM Pro_empresa WHERE ID =  1";
  $resultEmpresa  = $Conexion->Query($queryEmpresa);

  /**** Obtener Infomación Cliente ****/
  $queryCliente   = "SELECT CL.* from Pro_factura AS FA INNER JOIN Pro_ventas AS VE ON FA.idPro_venta = VE.ID INNER JOIN Pro_clientes AS CL ON VE.idPro_cliente = CL.ID WHERE VE.ID =  ".$id;
  $resultCliente  = $Conexion->Query($queryCliente);

  /**** Obtener Infomación Detalle Venta Menudeo Temp Por idVenta ****/
  $queryDetalle   = "SELECT DVM.*, CA.Codigo, CA.Producto, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT, DI.Pedimento, DV.Importe, DV.Precio_unitario, DI.Pedimento
  FROM Pro_detalle_venta_temp AS DVM 
  INNER JOIN Pro_detalle_venta AS DV ON DVM.idDetalle_venta = DV.ID 
  INNER JOIN Pro_detalle_inventario AS DI ON DVM.idDetalle_inventario = DI.ID
  INNER JOIN Pro_inventario AS PIN ON DI.idInventario = PIN.ID
  INNER JOIN Catalogo AS CA ON PIN.idCatalogo = CA.ID AND DV.idCatalogo = CA.ID
  WHERE DVM.idPro_venta = ".$id."";
  $resultDetalle  = $Conexion->Query($queryDetalle);

  // Cargar Template PDF //
  $pdf->setSourceFile($format);
  $pdf->AddPage();
  $pdf->useTemplate($pdf->importPage(1));
  
  // Escribir en la platilla PDF //
  $pdf->SetFont('Arial','', 12);
  $pdf->SetXY(130, 12);
  $pdf->Cell(30,5, utf8_decode($resultEmpresa[0]['Razon_social']),0,0,'C');

  $pdf->SetFont('Arial','', 8);

  $pdf->SetXY(150, 18);
  $pdf->Cell(30,5, utf8_decode($resultEmpresa[0]['RFC']),0,0,'L');

  $pdf->SetXY(110, 34);
  $pdf->Cell(30,5, utf8_decode($resultFactura[0]['Clave_Regimen_Fiscal']).' - '.utf8_decode($resultFactura[0]['Regimen_Fiscal']),0,0,'L');

  $pdf->SetXY(115, 31);
  $pdf->Cell(30,5,utf8_decode($resultFactura[0]['Lugar_Expedicion']) ,0,0,'L');
  
  $pdf->SetFont('Arial','', 9);
  $pdf->SetXY(132, 42);
  $pdf->Cell(30,5,utf8_decode($resultFactura[0]['Folio']),0,0,'C');

  $pdf->SetXY(132, 48);
  $pdf->Cell(30,5,utf8_decode($resultFactura[0]['Serie']),0,0,'C');

  $pdf->SetXY(143, 54);
  $pdf->Cell(60,5, date('d/m/Y h:i A', strtotime($resultFactura[0]["Fecha_timbrado"])),0,0,'L');

  if ($resultFactura[0]['Tipo_comprobante'] == "I"){
    $Tipo = "Ingreso";
  }else if ($Comprobante == "E"){
    $Tipo = "Egreso";
  }

  $pdf->SetFont('Arial','', 9);

  $pdf->SetXY(117, 26);
  $pdf->Cell(30,5, $resultFactura[0]['Tipo_comprobante']." - ".utf8_decode($Tipo),0,0,'L');


  $pdf->SetXY(36, 67);
  $pdf->Cell(172,5,utf8_decode($resultCliente[0]['Razon_social']),0,0,'L');

  $pdf->SetXY(36, 71);
  $pdf->Cell(172,5,utf8_decode($resultCliente[0]['RFC']),0,0,'L');

  $pdf->SetXY(36, 76);
  $pdf->MultiCell(170, 3, utf8_decode($resultCliente[0]['Calle_numero'].', C.P.'.$resultCliente[0]['CP'].' '.$resultCliente[0]['Colonia'].' '.$resultCliente[0]['Estado'].', '.$resultCliente[0]['Pais']), 0, 'L', false);

  switch ($resultFactura[0]['Forma_pago']) {
    case '99':
      $Forma = "Por definir";
      break;
    case '01':
      $Forma = "Efectivo";
      break;
    case '02':
      $Forma = "Cheque nominativo";
      break;
    case '03':
      $Forma = "Transferencia electrónica de fondos";
      break;
    case '04':
      $Forma = "Tarjeta de crédito";
      break;
    case '05':
      $Forma = "Monedero electrónico";
      break;
    case '06':
      $Forma = "Dinero electrónico";
      break;
    case '08':
      $Forma = "Vales de despensa";
      break;
    case '12':
      $Forma = "Dación en pago";
      break;
    case '13':
      $Forma = "Pago por subrogación";
      break;
    case '14':
      $Forma = "Pago por consignación";
      break;
    case '15':
      $Forma = "Condonación";
      break;
    case '17':
      $Forma = "Compensación";
      break;
    case '23':
      $Forma = "Novación";
      break;
    case '24':
      $Forma = "Confusión";
      break;
    case '25':
      $Forma = "Remisión de deuda";
      break;
    case '26':
      $Forma = "Prescripción o caducidad";
      break;
    case '27':
      $Forma = "A satisfacción del acreedor";
      break;
    case '28':
      $Forma = "Tarjeta de débito";
      break;
    case '29':
      $Forma = "Tarjeta de servicios";
      break;
    case '30':
      $Forma = "Aplicación de anticipos";
      break;
      case '31':
      $Forma = "Intermediario pagos";
      break;
  }

  $pdf->SetXY(46, 42);
  $pdf->Cell(172,5,$resultFactura[0]['Forma_pago']." - ".utf8_decode($Forma),0,0,'L');

  if ($resultFactura[0]['Metodo_pago'] == 'PUE'){
    $Metodo = 'Pago en una sola exhibicion';
  }else if ($MetodoPago == 'PPD'){
    $Metodo = 'Pago en parcialidades o diferido';
  }

  $pdf->SetXY(46, 50);
  $pdf->Cell(90, 3, $resultFactura[0]['Metodo_pago']." - ".$Metodo, 0,0, 'L');

  switch ($resultFactura[0]['Moneda']){     
    case 'MXN':
      $Moneda = "Peso Mexicano";
      break;
    case 'USD':
      $Moneda = "Dolar americano";
      break;
    case 'EUR':
      $Moneda = "Euro";
      break;
  }

  $pdf->SetXY(46, 54);
  $pdf->Cell(172,5,$resultFactura[0]['Moneda']." - ".$Moneda,0,0,'L');

  switch ($resultFactura[0]['Uso_CFDI']){
    case 'P01':
      $Uso = "Por definir";
    break;
    case 'G01':
      $Uso = "Adquisición de mercancias";
    break;
    case 'G02':
      $Uso = "Devoluciones, descuentos o bonificaciones";
    break;
    case 'G03':
      $Uso = "Gastos en general";
    break;
    case 'I01':
      $Uso = "Construcciones";
    break;
    case 'I02':
      $Uso = "Mobilario y equipo de oficina por inversiones";
    break;
    case 'I03':
      $Uso = "Equipo de transporte";
    break;
    case 'I04':
      $Uso = "Equipo de computo y accesorios";
    break;
    case 'I05':
      $Uso = "Dados, troqueles, moldes, matrices y herramental";
    break;
    case 'I06':
      $Uso = "Comunicaciones telefónicas";
    break;
    case 'I07':
      $Uso = "Comunicaciones satelitales";
    break;
    case 'I08':
      $Uso = "Otra maquinaria y equipo";
    break;
    case 'D01':
      $Uso = "Honorarios médicos, dentales y gastos hospitalarios";
    break;
    case 'D02':
      $Uso = "Gastos médicos por incapacidad o discapacidad";
    break;
    case 'D03':
      $Uso = "Gastos funerales";
    break;
    case 'D04':
      $Uso = "Donativos";
    break;
    case 'D05':
      $Uso = "Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)";
    break;
    case 'D06':
      $Uso = "Aportaciones voluntarias al SAR";
    break;
    case 'D07':
      $Uso = "Primas por seguros de gastos médicos";
    break;
    case 'D08':
      $Uso = "Gastos de transportación escolar obligatoria";
    break;
    case 'D09':
      $Uso = "Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones";
    break;
    case 'D10':
      $Uso = "Pagos por servicios educativos (colegiaturas)";
    break;
  }

  $pdf->SetXY(120, 70);
  $pdf->Cell(172,5,$resultFactura[0]['Uso_CFDI']." - ".utf8_decode($Uso),0,0,'L');

  $pdf->SetXY(46, 100);
  $pdf->MultiCell(168, 3, '', 0, 'L', false);

  $pdf->Cell(1);
  $pdf->Ln(2);

  foreach ($resultDetalle as $key => $value) {
    $Impuesto   = $value['Importe']  - ($value['Importe'] / 1.16);

    $pdf->SetX(15);
    $pdf->Cell(15, 5, $value['Cantidad'], 0, 0, 'C', false);
    $pdf->Cell(15, 5, $value['UnidadMedida'], 0, 0, 'C', false);
    $pdf->Cell(15, 5, $value['UnidadSAT'], 0, 0, 'C', false);
    $pdf->Cell(25, 5, $value['Codigo'], 0, 0, 'C', false);
    $pdf->Cell(57, 5, utf8_decode($value['Producto']), 0, 0, 'C', false);
    $pdf->Cell(18, 5, "$".number_format($value['Precio_unitario'],2,".",","), 0, 0, 'C', false);
    $pdf->Cell(13, 5, '$0.00', 0, 0, 'C', false);
    $pdf->Cell(13, 5, "$".number_format($Impuesto,2,".",","), 0, 0, 'C', false);
    $pdf->Cell(18, 5, "$".number_format($value['Importe'],2,".",","), 0, 0, 'C', false);  
    $pdf->Ln(5);
  }

  $num2 = new letra();
  $NumeroLetra = $num2->num2letras($resultVenta[0]['Total']);
  $pdf->Ln(5);
  $pdf->Cell(25,5,'Importe con letra: '.$NumeroLetra, 0, 0,'L');

  $Subtotal = $resultVenta[0]['Total'] / 1.16;
  $IVA      = $resultVenta[0]['Total'] - $Subtotal;

  $pdf->Ln(5);
  if ($resultVenta[0]['Observaciones'] != null && $resultVenta[0]['Observaciones'] != ""){
    $pdf->SetFont('Arial','B',9);
    $pdf->Cell(25,5,'Observaciones: ', 0, 0,'L');
    $pdf->SetFont('Arial','',9);
    $pdf->MultiCell(120,5,utf8_decode($resultVenta[0]['Observaciones']),0,'L',0);
  }

  $pdf->SetFont('Arial','B',9);
  $pdf->SetX(160);
  $pdf->Cell(25,5,"Subtotal:", 0, 0,'L');
  $pdf->Cell(25,5,"$".number_format($Subtotal,2,".",","), 0, 0,'L');
  $pdf->Ln(5);

  $pdf->SetX(160);
  $pdf->Cell(25,5,"Descuento:", 0, 0,'L');
  $pdf->Cell(25,5,"$0.00", 0, 0,'L');
  $pdf->Ln(5);
  
  $pdf->SetX(160);
  $pdf->Cell(25,5,"Impuesto:", 0, 0,'L');
  $pdf->Cell(25,5,"$".number_format($IVA,2,".",","), 0, 0,'L');
  $pdf->Ln(5);

  $pdf->SetX(160);
  $pdf->Cell(25,5,"Total:", 0, 0,'L');
  $pdf->Cell(25,5,"$".number_format($resultVenta[0]['Total'],2,".",","), 0, 0,'L');
  $pdf->Ln(10);

  $pdf->SetFont('Arial','B',9);
  $pdf->cell(15,5,"Pedimentos:",0,0,'L');
  $pdf->Ln(5);

  foreach ($resultDetalle as $key => $value) {
    $pdf->SetFont('Arial','',9);
    $pdf->Cell(15,5,$value['Pedimento'], 0, 0,'L');
    $pdf->Ln(5);
  }

  /*Cadenas del Timbrado*/
  $pdf->Ln(10);
  $pdf->SetFont('Arial','B', 8);
  $pdf->MultiCell(185,5,'Sello Digital del CFDI', 1,'L',0);
  $pdf->SetFont('Arial','', 6);
  $pdf->MultiCell(185,3,$resultFactura[0]['SelloCFD'], 1,'L',0);

  $pdf->SetFont('Arial','B', 8);
  $pdf->MultiCell(185,5,'Sello SAT:', 1,'L',0);
  $pdf->SetFont('Arial','', 6);
  $pdf->MultiCell(185,3,$resultFactura[0]['SelloSAT'], 1,'L',0);

  $pdf->SetFont('Arial','B', 8);
  $pdf->MultiCell(185,5,'Cardena Original del comprobante de certificacion digital del SAT:', 1,'L',0);
  $pdf->SetFont('Arial','', 6);
  $pdf->MultiCell(185,3,$resultFactura[0]['Sello'], 1,'L',0);
  $pdf->Ln(5);

  $pdf->SetFont('Arial','B', 8);
  $pdf->Cell(57,5,'No de Serie del Certificado del SAT:', 1,0,'L');
  $pdf->SetFont('Arial','', 8);
  $pdf->Cell(57,5,$resultFactura[0]['CertificadoSAT'], 1,0,'C');
  $pdf->SetFont('Arial','B', 8);
  $pdf->SetX(125);
  $pdf->Cell(40,5,'No Certificado del CSD:', 1, 0,'C');
  $pdf->SetFont('Arial','',8);
  $pdf->Cell(40,5,$resultEmpresa[0]['noCertificado'], 1, 0,'C');
  $pdf->Ln(5);

  $pdf->SetFont('Arial','B', 8);
  $pdf->Cell(57,5,'Fecha y hora de Certificacion:', 1,0,'L');
  $pdf->SetFont('Arial','', 8);
  $pdf->Cell(57,5,$resultFactura[0]['Fecha_timbrado'], 1,0,'C');
  $pdf->SetX(125);
  $pdf->SetFont('Arial','B', 8);
  $pdf->Cell(40,5,'Fecha y hora de emision:', 1, 0,'C');
  $pdf->SetFont('Arial','', 8);
  $pdf->Cell(40,5,$resultFactura[0]['Fecha_timbrado'], 1, 0,'C');
  $pdf->Ln(5);

  $pdf->SetFont('Arial','B', 8);
  $pdf->MultiCell(114,5,'Folio Fiscal: '. $resultFactura[0]['UUID'], 1,'L',0);
  

  $pdf->Ln(20);
  $pdf->SetFont('Arial','B', 9);
  $pdf->MultiCell(175,5,'Este es una representacion impresa de un CFDI', 0,'C',0);

  //enviamos cabezales http para no tener problemas
  header("Content-Transfer-Encoding", "binary");
  header('Cache-Control: maxage=3600'); 
  header('Pragma: public');

  ob_end_clean();
  // Mostrar Reporte PDF //
  $pdf->Output('I','format.pdf');

}

?>