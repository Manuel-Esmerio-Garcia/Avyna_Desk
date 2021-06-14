<?php
  ini_set('memory_limit', '-1');
  ini_set('max_execution_time', 0);
  define('FPDF_FONTPATH', 'font/');
  ini_set("session.auto_start", 0);

  date_default_timezone_set('America/Mexico_City');

  ob_start();

  // include //
  include '../fpdf/fpdf.php';
  // require //
  require('../../Clases/Conexion.php');
  
  // Crear Objeto Conexión //
  $Conexion = new Conexion();
  $conn     = $Conexion->Connect();

  // Validación idRecoleccion isset //
  if(isset($_GET['idRecoleccion'])){

    $idRecoleccion = $_GET['idRecoleccion'];

    $query  = "SELECT * FROM Reporte_Recoleccion_View WHERE idRecoleccion = ".$idRecoleccion;
    $Result = $Conexion->Query($query);

    $pdf = new FPDF();
    $pdf->AddPage('L');

    // Agregamos Logo Avyna //
    $pdf->Image('Logo.png',135,5,-300);
    $pdf->Ln(10);

    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(275,5,utf8_decode('Reporte Recolección'),1,0,'C');

    // Encabezado //
    $pdf->SetFont('Arial','B',10);
    $pdf->Ln(5);
    $pdf->Cell(40,5,utf8_decode('N° Guia'),1,0,'C',false);
    $pdf->Cell(15,5,'Dest.',1,0,'C',false);
    $pdf->Cell(70,5,utf8_decode('Razón Social'),1,0,'C',false);
    $pdf->Cell(50,5,'Destino',1,0,'C',false);
    $pdf->Cell(15,5,'Peso',1,0,'C',false);
    $pdf->Cell(35,5,utf8_decode('Descripción'),1,0,'C',false);
    $pdf->Cell(20,5,utf8_decode('Garantia'),1,0,'C',false);
    $pdf->Cell(30,5,'Fecha',1,0,'C',false);

    $pdf->SetFont('Arial','',8);

    foreach ($Result as $key => $value) {
      $pdf->Ln(5);
      $pdf->Cell(40,5,$value['Guia'],1,0,'C',false);
      $pdf->Cell(15,5,$value['Destinatario'],1,0,'C',false);
      $pdf->Cell(70,5,$value['Razon_Social'],1,0,'C',false);
      $pdf->Cell(50,5,$value['Destino'],1,0,'C',false);
      $pdf->Cell(15,5,$value['Peso'],1,0,'C',false);
      $pdf->Cell(35,5,$value['Descripcion'],1,0,'C',false);
      $pdf->Cell(20,5,$value['Garantia'],1,0,'C',false);
      $pdf->Cell(30,5,$value['Fecha_envio'],1,0,'C',false);
    }

    $pdf->SetY(175);
    $pdf->Cell(140,5,utf8_decode('Firma Encargado Avyna'),0,0,'C',false);
    $pdf->Cell(140,5,'Firma Recolector',0,0,'C',false);
    $pdf->Ln(5);
    $pdf->Cell(140,5,'_____________________________',0,0,'C',false);
    $pdf->Cell(140,5,'_____________________________',0,0,'C',false);

    //enviamos el documento creado con un nombre nuevo y forzamos su descarga.
    $pdf->Output();

    ob_end_flush();
    
  }

?>