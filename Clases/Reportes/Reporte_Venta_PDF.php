<?php

define('FPDF_FONTPATH', 'font/');
ini_set("session.auto_start", 0);
// Notificar solamente errores de ejecución
//error_reporting(E_ERROR | E_WARNING | E_PARSE);

ob_start();

require('../fpdf/fpdf.php');
require('../Conexion.php');

$Conexion = new Conexion();

/*DATABASE REQUEST*/
  
  /*$servername   = "integratto.net";
  $username     = "integrat";
  $password     = "fritrubi";
  $databaseName = "integrat_prosalon";

  $conn = mysqli_connect($servername,$username,$password, $databaseName);

  mysqli_set_charset($conn,"utf8");

  mysqli_select_db($conn, $databaseName);*/


if (isset($_GET['ID'])) 
{
  $ID = $_GET['ID'];

  $sqlQuery = "";
  $sqlQuery = "select V.ID, V.Fecha_venta, CONCAT(CL.Nombre, ' ', CL.Apellidos) AS Distribuidor, CL.Empresa AS Empresa_Distribuidor, CL.Cargo as Cargo_Distribuidor, CL.Calle_numero as Direccion_Distribuidor, CL.Colonia as Colonia_Distribuidor, CL.Ciudad as Ciudad_Distribuidor, CL.Municipio as Municipio_Distribuidor, CL.Estado as Estado_Distribuidor, CL.Pais as Pais_Distribuidor, CL.CP AS CP_Distribuidor, CL.RFC AS RFC_Distribuidor, CONCAT(CLM.Nombre, ' ', CLM.Apellidos) AS Cliente, CLM.Empresa, CLM.RFC, CLM.Cargo, CLM.Calle_numero, CLM.Colonia, CLM.Ciudad, CLM.Municipio, CLM.Estado, CLM.Pais, CLM.CP, VM.Fecha_venta, VM.Descuento, VM.Subtotal, VM.Impuestos, VM.Total, VM.Total_desc, V.Subtotal AS Subtotal_Venta, V.Impuestos AS Impuestos_Venta, V.Total AS Total_Venta, V.Descuento AS Descuento_Venta, VM.Status from Ventas as V INNER JOIN Ventas_menudeo as VM on V.ID = VM.idVenta INNER JOIN Clientes AS CL on V.idCliente = CL.ID INNER JOIN Clientes_menudeo AS CLM on VM.idCliente_menudeo = CLM.ID where V.ID = ". $ID; 

  $Result = $Conexion->Query($sqlQuery);

  foreach ($Result as $key => $value) {
    
        $Distribuidor      = $value['Distribuidor'];
        $Direccion         = $value['Direccion_Distribuidor'];
        $Empresa           = $value['Empresa_Distribuidor'];
        $Cargo             = $value['Cargo_Distribuidor'];
        $Estado            = $value['Estado_Distribuidor'];
        $Municipio         = $value['Municipio_Distribuidor'];
        $Pais              = $value['Pais_Distribuidor'];
        $CP                = $value['CP_Distribuidor'];
        $Colonia           = $value['Colonia_Distribuidor'];
        $Ciudad            = $value['Ciudad_Distribuidor'];

        $Subtotal          = $value['Subtotal_Venta'];
        $Impuestos         = $value['Impuestos_Venta'];
        $Total             = $value['Total_Venta'];
        $Descuento         = $value['Descuento_Venta'];
  }

  $pdf = new FPDF();
  $pdf->AddPage();
  $pdf->SetFont('Arial','',10);
  $pdf->Cell(0,10,date("Y-m-d H:m:s"),0, 0,'R', false);
  $pdf->Ln(2);

  $pdf->SetFont('Arial','B',16);
  $pdf->Cell(0,10,'Reporte Ventas',0, 0,'C', false);
  $pdf->Ln(15);

  $pdf->SetFont('Arial','B',12);
  $pdf->Cell(75,5,utf8_decode("Información del Distribuidor"),0, 0,'C', false);
  $pdf->SetXY(95,27);
  $pdf->Cell(125,5,utf8_decode("Información de la Venta"),0, 0,'C', false);
  $pdf->Ln(5);

  $pdf->SetFont('Arial','',10);
  $pdf->Cell(37.5,5,"Nombre Distribuidor:",0, 0,'L', false);
  $pdf->Cell(80,5,$Distribuidor,0, 0,'L', false);
  $pdf->Cell(40,5,"Subtotal:",0, 0,'L', false);
  $pdf->Cell(40,5,"$".$Subtotal,0, 0,'L', false);
  $pdf->Ln(5);

  $pdf->Cell(37.5,5,"Empresa:",0, 0,'L', false);
  $pdf->Cell(80,5,$Empresa,0, 0,'L', false);
  $pdf->Cell(40,5,"Impuesto:",0, 0,'L', false);
  $pdf->Cell(40,5,"$".$Impuestos,0, 0,'L', false);
  $pdf->Ln(5);

  $pdf->Cell(37.5,5,"Cargo:",0, 0,'L', false);
  $pdf->Cell(80,5,$Cargo,0, 0,'L', false);
  $pdf->Cell(40,5,"Descuento:",0, 0,'L', false);
  $pdf->Cell(40,5,"$".$Descuento,0, 0,'L', false);
  $pdf->Ln(5);

  $pdf->SetXY(127.5,47);
  $pdf->Cell(40,5,"Total:",0, 0,'L', false);
  $pdf->Cell(40,5,"$".$Total,0, 0,'L', false);
  $pdf->Ln(20);

  $pdf->SetX(5);
  $pdf->Cell(10,10,"ID",1,0,'C',false);
  $pdf->Cell(40,10,"Cliente",1,0,'C',false);
  $pdf->Cell(40,10,"Empresa",1,0,'C',false);
  $pdf->Cell(30,10,"RFC",1,0,'C',false);
  $pdf->Cell(15,10,"Sub.",1,0,'C',false);
  $pdf->Cell(15,10,"Imp.",1,0,'C',false);
  $pdf->Cell(15,10,"Total",1,0,'C',false);
  $pdf->Cell(30,10,"Status",1,0,'C',false);
  //$pdf->Cell(22,10,"Fecha",1,0,'C',false);

  foreach ($Result as $key => $value) 
  {

  $pdf->Ln(10);
  $pdf->SetX(5);
  $pdf->SetFont('Arial','',8);
  $pdf->Cell(10,5,$value['ID'],0,0,'C',false);
  $pdf->Cell(40,5,$value['Cliente'],0,0,'C',false);
  $pdf->Cell(40,5,$value['Empresa'],0,0,'C',false);
  $pdf->Cell(30,5,$value['RFC'],0,0,'C',false);
  $pdf->Cell(15,5,"$".$value['Subtotal'],0,0,'C',false);
  $pdf->Cell(15,5,"$".$value['Impuestos'],0,0,'C',false);
  $pdf->Cell(15,5,"$".$value['Total'],0,0,'C',false);
  $pdf->Cell(30,5,$value['Status'],0,0,'C',false);
  //$pdf->Cell(22,5,"Fecha",1,0,'C',false);

  }

  $pdf->Ln(35);
  $pdf->SetX(160);
  $pdf->SetFont('Arial','',10);
  $pdf->Cell(10,5,"Subtotal",0,0,'R',false);
  $pdf->Cell(10,5,"$".$Subtotal,0,0,'L',false);
  $pdf->Ln(5);
  $pdf->SetX(160);
  $pdf->Cell(10,5,"Impuestos",0,0,'R',false);
  $pdf->Cell(10,5,"$".$Impuestos,0,0,'L',false);
  $pdf->Ln(5);
  $pdf->SetX(160);
  $pdf->Cell(10,5,"Descuento",0,0,'R',false);
  $pdf->Cell(10,5,"$".$Descuento,0,0,'L',false);
  $pdf->Ln(5);
  $pdf->SetX(160);
  $pdf->Cell(10,5,"Total",0,0,'R',false);
  $pdf->Cell(10,5,"$".$Total,0,0,'L',false);


  $pdf->Output();

  ob_end_flush();

}

?>