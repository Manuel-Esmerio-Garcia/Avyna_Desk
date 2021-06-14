<?php

require('Conexion.php');
require('./fpdf/fpdf.php');

ob_start();

$Conexion = new Conexion();

$connect = $Conexion->Connect();

mysqli_set_charset($connect,"utf8");


if(isset($_GET["IdVenta"])) {


 $id = $_GET["IdVenta"];


//$id =1101;

  $sql = "SELECT VM.*, CONCAT(CL.Nombre, ' ', CL.Apellidos) AS Cliente FROM Ventas_menudeo AS VM INNER JOIN Clientes_menudeo AS CL ON VM.idCliente_menudeo = CL.ID
 WHERE VM.ID = ".$id;

  $result = mysqli_query( $connect, $sql ) or die ( "Algo ha ido mal en la consulta a la base de datos");

  //echo $result;
  $fila = $result->fetch_array();


  $pdf = new FPDF('P','mm','A4');
  $pdf->AddPage();
  $pdf->SetFont('Arial','B',10);

  $pdf->Image('Logo.png' , 8 ,0, 70 , 38,'PNG');
  $pdf->Ln(15);

  $pdf->SetFont('Helvetica','I',8);
  $pdf->Cell(68,5,"Fecha: " . $fila['Fecha_venta'],0,1,'R');

  $pdf->SetFont('Arial','B',10);
  $pdf->Cell(68,5,utf8_decode("Avyna Cosméticos SA de CV"),0,1,'C');
  $pdf->SetFont('Helvetica','I',8);
  $pdf->MultiCell(68,4,utf8_decode("RFC: ACO140605RNO \n TEL: 31885308"),0,'C');
  $pdf->Ln(2);


    /*Cliente que inicio sesión*/
  $pdf->Cell(68,3,utf8_decode('Cliente: '.$fila['Cliente']),0,1,'L');

  $pdf->SetFont('Helvetica','B',8);

  $pdf->Cell(68,3,utf8_decode('N° Venta : '.$fila['ID']),0,1,'R');

  $pdf->Ln(2);

  $pdf->SetFont('Arial','',8);
  $pdf->cell(6,5,'Cant',1,0,'C');
  $pdf->Cell(40,5,'Producto',1,0,'C');
  $pdf->Cell(11,5,'Val/U',1,0,'C');
  $pdf->Cell(11,5,'Valor',1,0,'C');

  $pdf->Ln(5);
  $sql = "SELECT DVM.*,CA.Producto FROM Ventas_menudeo as VM 
INNER JOIN Detalle_venta_menudeo AS DVM ON VM.ID = DVM.idVenta_menudeo
INNER JOIN Catalogo AS CA ON DVM.idCatalogo = CA.ID WHERE VM.ID = ".$id." UNION " ."
  SELECT DVM.*, O.Nombre AS Producto FROM Ventas_menudeo as VM 
INNER JOIN Detalle_venta_menudeo AS DVM ON VM.ID = DVM.idVenta_menudeo
INNER JOIN Ofertas AS O ON DVM.idOferta = O.ID WHERE VM.ID = ".$id." UNION " ."
SELECT DVM.*,PO.Promocion AS Producto FROM Ventas_menudeo as VM 
INNER JOIN Detalle_venta_menudeo AS DVM ON VM.ID = DVM.idVenta_menudeo
INNER JOIN Promociones AS PO ON DVM.idPromocion = PO.ID WHERE VM.ID = ".$id;

$Detalle_venta_menudeo = $Conexion->Query($sql);

  $result = mysqli_query( $connect, $sql ) or die ( "Algo ha ido mal en la consulta a la base de datos");

  $row_cnt = $result->num_rows;

if ($row_cnt != 0)
{
  foreach ($Detalle_venta_menudeo as $key => $value)
  {
      $pdf->cell(6,5,$value['Cantidad'],0,0,'C');
      $pdf->Cell(40,5,utf8_decode($value['Producto']),0,0,'C');
      $pdf->Cell(11,5,$value['Precio_unitario'],0,0,'C');
      $pdf->Cell(11,5,number_format($value['Importe'], 2, '.', ''),0,0,'C');
      $pdf->Ln(4);
    }
}

  $pdf->SetFont('Arial','',8);
  $pdf->Ln(2);
  $pdf->cell(68,0,'',1,0,'L');
  $pdf->Ln(1);


  $pdf->cell(38,6,'',0,0,'L');
  $pdf->cell(15,6,'Descuento',0,0,'L');
  $pdf->Cell(15,6,$fila['Descuento'],0,0,'R');
  $pdf->Ln(3);

  $pdf->cell(38,6,'',0,0,'L');
  $pdf->cell(15,6,'Subtotal',0,0,'L');
  $pdf->Cell(15,6,$fila['Subtotal'],0,0,'R');
  $pdf->Ln(3);

  $pdf->cell(38,6,'',0,0,'L');
  $pdf->cell(15,6,'Impuestos',0,0,'L');
  $pdf->Cell(15,6,$fila['Impuestos'],0,0,'R');
  $pdf->Ln(3);

  $pdf->cell(38,6,'',0,0,'L');
  $pdf->cell(15,6,'Total',0,0,'L');
  $pdf->SetFont('Arial','B',8);
  $pdf->Cell(15,6,$fila['Total_desc'],0,0,'R');
  $pdf->Ln(5);

  $pdf->cell(68,0,'',1,0,'L');
  $pdf->Ln(2);

  $pdf->SetFont('Helvetica','I',10);
  $pdf->cell(68,6,'**** Gracias por su compra ****',0,0,'C');
  $pdf->Ln(6);

  $pdf->SetFont('Helvetica','I',8);
  $pdf->cell(68,6,utf8_decode('visítanos en : www.mx.avyna.info'),0,0,'C');

  //$pdf->Cell(68,6,"Impuestos ".$fila['iva'],1,1,'R');
  //$pdf->Cell(68,6,"Total ".$fila['Total'],1,1,'R');

  $pdf->Output('I','boleta.pdf');

}else {
 echo "Venta no existe";
}

?>
