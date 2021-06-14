<?php

define('FPDF_FONTPATH', 'font/');
ini_set("session.auto_start", 0);
// Notificar solamente errores de ejecución
//error_reporting(E_ERROR | E_WARNING | E_PARSE);
ob_start();

require('../fpdf/fpdf.php');
require('../Conexion.php');

date_default_timezone_set('America/Mexico_City');

$Conexion = new Conexion();

if (isset($_GET['ID']) && isset($_GET['idEmpaque'])) 
{
  $ID = $_GET['ID'];
  $idEmpaque = $_GET['idEmpaque'];

  $Pedido  = "";
  $Cliente = "";

$sqlQuery = "SELECT * FROM Productos_Empaque_View WHERE idEmpaque = ". $ID; 

$sqlQuery1 = "SELECT * FROM Empaques_View WHERE idEmpaque_general = ". $idEmpaque; 

  $Result = $Conexion->Query($sqlQuery);

  foreach ($Result as $key => $value)
  {
    $Pedido      = $value['ID'];
  }

  $Result1 = $Conexion->Query($sqlQuery1);

  foreach ($Result1 as $key => $value)
  {
    $Cliente     = $value['cliente'];
  }


  $pdf = new FPDF('P','in',array(8,4));

  $pdf->AddPage();
  $pdf->Ln(0.3);
  $pdf->SetFont('Arial','',12);
  $pdf->Cell(0,0,date("Y-m-d H:m:s"),0, 0,'R', false);
  $pdf->Ln(0.3);

  $pdf->SetFont('Arial','B',12);
  $pdf->Cell(0,0,utf8_decode('Listado de Productos del pedido N°').$Pedido,0, 0,'C', false);
  $pdf->Ln(0.3);

  $pdf->SetFont('Arial','',12);
  $pdf->Cell(0,0,utf8_decode($Cliente),0, 0,'L', false);
  $pdf->Ln(0.3);

  foreach ($Result as $key => $value) 
  {
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(1,0.1,$value['Cantidad'],0,0,'L',false);
    $pdf->MultiCell(0,0.1,$value['producto'],0,'L');

    $pdf->Ln(0.2);
  }
  
  $pdf->Output();

  ob_end_flush();

}

?>