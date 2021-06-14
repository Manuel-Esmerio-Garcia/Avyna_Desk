<?php

define('FPDF_FONTPATH', 'font/');
ini_set("session.auto_start", 0);
// Notificar solamente errores de ejecución
//error_reporting(E_ERROR | E_WARNING | E_PARSE);

ob_start();

require('../fpdf/fpdf.php');
require('../Conexion.php');

$Conexion = new Conexion();

$Fecha_Venta      = "";
$Descuento        = "";
$Subtotal         = "";
$Impuestos        = "";
$Total            = "";
$Empresa_Dis      = "";
$Distribuidor     = "";
$Cargo_Dis        = "";
$Dia_Entrega      = "";
$Sucursal         = "";
$Puntos           = "";
$RFC_Dis          = "";
$Sucursal         = "";
$Empresa          = "";
$Cliente          = "";
$Cargo            = "";
$RFC              = "";
$Descuento        = "";
$Nivel            = "";

$Total_Productos		= "";
$Total_Importe			= "";

if (isset($_GET['ID'])) 
{
  $ID = $_GET['ID'];

$sqlQuery = "Select DIS.Empresa, DIS.Cargo, DIS.RFC, DIS.Dia_entrega, DIS.Puntos,DIS.`Descuento_%`, DIS.Fecha_ingreso, CONCAT(CL.Nombre,' ',CL.Apellidos) as Cliente, CONCAT(DIS.Nombre,' ',DIS.Apellidos) AS Distribuidor, CL.Empresa AS Empresa_CL, CL.Cargo AS Cargo_CL, CL.RFC AS RFC_CL, CL.`Descuento_%` AS Descuento_CL, CL.Nivel AS Nivel_CL, SU.Sucursal, VM.ID, VM.Descuento, VM.Subtotal, VM.Impuestos, VM.Total, VM.Total_desc, VM.Adeudo, VM.Fecha_entrega, VM.Fecha_venta, DVM.Cantidad, DVM.Precio_unitario, DVM.Importe, CA.Codigo, CA.Producto, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT from 
Ventas_menudeo AS VM 
INNER JOIN Detalle_venta_menudeo AS DVM ON VM.ID = DVM.idVenta_menudeo 
INNER JOIN Catalogo AS CA ON DVM.idCatalogo = CA.ID 
INNER JOIN Clientes_menudeo as CL on VM.idCliente_menudeo = CL.ID 
INNER JOIN Ventas as V on VM.idVenta = V.ID 
INNER JOIN Clientes as DIS ON V.idCliente = DIS.ID 
INNER JOIN Sucursales as SU ON DIS.idSucursal = SU.ID WHERE VM.ID = ". $ID; 

  $Result = $Conexion->Query($sqlQuery);

  foreach ($Result as $key => $value) {
    
  $Fecha_Venta 			= $value['Fecha_venta'];
	$Descuento 				= $value['Descuento'];
	$Subtotal 				= $value['Subtotal'];
	$Impuestos 				= $value['Impuestos'];
	$Total 					  = $value['Total'];

	$Empresa_Dis 			= $value['Empresa'];
	$Distribuidor 		= $value['Distribuidor'];
	$Cargo_Dis 				= $value['Cargo'];
	$Dia_Entrega 			= $value['Dia_entrega'];
	$Sucursal 				= $value['Sucursal'];
	$Puntos 				  = $value['Puntos'];
	$RFC_Dis 				  = $value['RFC'];

	$Sucursal 				= $value['Sucursal'];

	$Empresa 				  = $value['Empresa_CL'];
	$Cliente 				  = $value['Cliente'];
	$Cargo 					  = $value['Cargo_CL'];
	$RFC 					    = $value['RFC_CL'];
	$Descuento 			  = $value['Descuento_CL'];
	$Nivel 					  = $value['Nivel_CL'];
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
  $pdf->Cell(40,5,"Nombre Cliente:",0, 0,'L', false);
  $pdf->Cell(40,5,$Cliente,0, 0,'L', false);
  $pdf->Ln(5);

  $pdf->Cell(37.5,5,"Empresa:",0, 0,'L', false);
  $pdf->Cell(80,5,$Empresa_Dis,0, 0,'L', false);
  $pdf->Cell(40,5,"Empresa:",0, 0,'L', false);
  $pdf->Cell(40,5,$Empresa,0, 0,'L', false);
  $pdf->Ln(5);

  $pdf->Cell(37.5,5,"Cargo:",0, 0,'L', false);
  $pdf->Cell(80,5,$Cargo_Dis,0, 0,'L', false);
  $pdf->Cell(40,5,"Cargo:",0, 0,'L', false);
  $pdf->Cell(40,5,$Cargo,0, 0,'L', false);
  $pdf->Ln(5);

  $pdf->Cell(37.5,5,"RFC:",0, 0,'L', false);
  $pdf->Cell(80,5,$RFC_Dis,0, 0,'L', false);
  $pdf->Cell(40,5,"RFC:",0, 0,'L', false);
  $pdf->Cell(40,5,$RFC,0, 0,'L', false);
  $pdf->Ln(5);

  $pdf->Cell(37.5,5,"Sucursal:",0, 0,'L', false);
  $pdf->Cell(80,5,utf8_decode($Sucursal),0, 0,'L', false);
  $pdf->Cell(40,5,"Descuento:",0, 0,'L', false);
  $pdf->Cell(40,5,$Descuento,0, 0,'L', false);
  $pdf->Ln(5);

  $pdf->Cell(37.5,5,"Puntos:",0, 0,'L', false);
  $pdf->Cell(80,5,$Puntos,0, 0,'L', false);
  $pdf->Cell(40,5,"Nivel:",0, 0,'L', false);
  $pdf->Cell(40,5,$Nivel,0, 0,'L', false);
  $pdf->Ln(15);

  $pdf->SetX(8);
  $pdf->Cell(30,10,"Codigo",1,0,'C',false);
  $pdf->Cell(50,10,"Producto",1,0,'C',false);
  $pdf->Cell(10,10,"Cant.",1,0,'C',false);
  $pdf->Cell(15,10,"Unidad",1,0,'C',false);
  $pdf->Cell(15,10,"Precio",1,0,'C',false);
  $pdf->Cell(20,10,"Importe",1,0,'C',false);
  $pdf->Cell(20,10,"Unidad SAT",1,0,'C',false);
  $pdf->Cell(30,10,"Clave SAT",1,0,'C',false);
  //$pdf->Cell(22,10,"Fecha",1,0,'C',false);

  foreach ($Result as $key => $value) 
  {

  $pdf->Ln(10);
  $pdf->SetX(8);
  $pdf->SetFont('Arial','',8);
  $pdf->Cell(30,5,$value['Codigo'],0,0,'C',false);
  $pdf->Cell(50,5,$value['Producto'],0,0,'C',false);
  $pdf->Cell(10,5,$value['Cantidad'],0,0,'C',false);
  $pdf->Cell(15,5,$value['UnidadMedida'],0,0,'C',false);
  $pdf->Cell(15,5,"$".$value['Precio_unitario'],0,0,'C',false);
  $pdf->Cell(20,5,"$".$value['Importe'],0,0,'C',false);
  $pdf->Cell(20,5,$value['UnidadSAT'],0,0,'C',false);
  $pdf->Cell(30,5,$value['ClaveSAT'],0,0,'C',false);

  $Total_Productos	+=	$value['Cantidad'];
  $Total_Importe	+=	$value['Importe'];

  }

  $pdf->Ln(35);
  $pdf->SetX(45);
  $pdf->SetFont('Arial','',10);
  $pdf->Cell(10,5,"Productos Totales:",0,0,'R',false);
  $pdf->Cell(10,5,$Total_Productos,0,0,'L',false);
  $pdf->Ln(5);

  $pdf->SetX(45);
  $pdf->Cell(10,5,"Importe Total Productos:",0,0,'R',false);
  $pdf->Cell(10,5,"$".$Total_Importe,0,0,'L',false);
  $pdf->Ln(5);

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