<?php

include('PHPExcel/PHPExcel.php');
$ID = $_GET['ID'];

//if(isset($_GET['ID']))
if(isset($ID))
{
    require('../Conexion.php');

    $Conexion = new Conexion();

	$fila = "";
	$tituloReporte = ""; 
	$titulosColumnas = "";
	$Descuento = 0;
	$Total_Venta = 0;
	$Impuestos = 0;
	$Subtotal = 0;
	$Clientes_menudeo = "";
	$Distribuidor = "";

	$sqlQuery = "";
	$sqlQuery = "Select CL.*, CONCAT(CL.Nombre,' ',CL.Apellidos) as Cliente, CONCAT(DIS.Nombre,' ',DIS.Apellidos) AS Distribuidor, VM.ID, VM.Descuento, VM.Subtotal, VM.Impuestos, VM.Total, VM.Total_desc, VM.Adeudo, VM.Fecha_entrega, VM.Fecha_venta, DVM.Cantidad, DVM.Precio_unitario, DVM.Importe, CA.Codigo, CA.Producto, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT 
		  from Ventas_menudeo AS VM INNER JOIN Detalle_venta_menudeo AS DVM ON VM.ID = DVM.idVenta_menudeo INNER JOIN Catalogo AS CA ON DVM.idCatalogo = CA.ID INNER JOIN Clientes_menudeo as CL on VM.idCliente_menudeo = CL.ID INNER JOIN Ventas as V on VM.idVenta = V.ID INNER JOIN Clientes as DIS ON V.idCliente = DIS.ID WHERE VM.ID = ". $ID; 


	$Result = $Conexion->Query($sqlQuery);

    foreach ($Result as $key => $value) 
    { 
		$Descuento        = $value['Descuento'];
		$Total_Venta      = $value['Total'];
		$Impuestos        = $value['Impuestos'];
		$Subtotal         = $value['Subtotal'];
		$Clientes_menudeo = $value['Cliente'];
		$Distribuidor     = $value['Distribuidor'];
	}

	//Objeto de PHPExcel
	$objPHPExcel  = new PHPExcel();
	
	// Se asignan las propiedades del libro
	$objPHPExcel->getProperties()->setCreator("Integratto") // Nombre del autor
    ->setLastModifiedBy("Codedrinks") //Ultimo usuario que lo modificó
    ->setTitle("Reporte Excel con PHP y MySQL") // Titulo
    ->setSubject("Reporte Excel con PHP y MySQL") //Asunto
    ->setDescription("Reporte de alumnos") //Descripción
    ->setKeywords("reporte alumnos carreras") //Etiquetas
    ->setCategory("Reporte excel"); //Categorias

    $tituloReporte = "Reporte Ventas Menudeo N°".$ID;
	$titulosColumnas = array('Codigo', 'Producto', 'Cantidad', 'Unidad Medida', 'Precio Unitario', 'Importe', 'Unidad SAT', 'Clave Producto SAT');

	// Se combinan las celdas A1 hasta D1, para colocar ahí el titulo del reporte
	$objPHPExcel->setActiveSheetIndex(0)
    ->mergeCells('A3:H3');

    $objPHPExcel->setActiveSheetIndex(0)
    ->mergeCells('F5:H5');

    $objPHPExcel->setActiveSheetIndex(0)
    ->mergeCells('A5:C5');

     $objPHPExcel->setActiveSheetIndex(0)
    ->mergeCells('G7:H7');

     $objPHPExcel->setActiveSheetIndex(0)
    ->mergeCells('G6:H6');

    // Se agregan los titulos del reporte
	$objPHPExcel->setActiveSheetIndex(0)
    ->setCellValue('F5','Información del Cliente Menudeo') // Titulo del reporte
    ->setCellValue('F6',  'N° de Venta')  //Titulo de las columnas
    ->setCellValue('G6',  $ID)  //Titulo de las columnas
    ->setCellValue('F7',  'Nombre')  //Titulo de las columnas
    ->setCellValue('G7',  $Clientes_menudeo)  //Titulo de las columnas
    ->setCellValue('G10',  'Total')  //Titulo de las columnas
    ->setCellValue('H10', '$'.$Total_Venta)  //Titulo de las columnas
    ->setCellValue('G8',  'Subtotal')  //Titulo de las columnas
    ->setCellValue('H8',  '$'.$Subtotal)  //Titulo de las columnas
    ->setCellValue('G9', 'Impuesto')  //Titulo de las columnas
    ->setCellValue('H9', '$'.$Impuestos)  //Titulo de las columnas
    /*->setCellValue('G10',  'Descuento')  //Titulo de las columnas
    ->setCellValue('H11',  $Descuento)  //Titulo de las columnas*/
    ->setCellValue('G1',  'Fecha')  //Titulo de las columnas
    ->setCellValue('H1',  date("F j, Y, g:i a"));  //Titulo de las columnas

     // Se agregan los titulos del reporte
	$objPHPExcel->setActiveSheetIndex(0)
    ->setCellValue('A5','Información del Distribuidor') // Titulo del reporte
    ->setCellValue('A7',  'Nombre Distribuidor')  //Titulo de las columnas
    ->setCellValue('B7',  $Distribuidor);  //Titulo de las columnas
 
	// Se agregan los titulos del reporte
	$objPHPExcel->setActiveSheetIndex(0)
    ->setCellValue('A3',$tituloReporte) // Titulo del reporte
    ->setCellValue('A12',  'Codigo')  //Titulo de las columnas
    ->setCellValue('B12',  'Producto')
    ->setCellValue('C12',  'Cantidad')
    ->setCellValue('D12',  'Unidad de Medida')
    ->setCellValue('E12',  'Precio Unitario')
    ->setCellValue('F12',  'Importe')
    ->setCellValue('G12',  'Unidad SAT')
    ->setCellValue('H12',  'Clave Producto SAT');

    //Se agregan los datos de los alumnos
 
	 $i = 13; //Numero de fila donde se va a comenzar a rellenar
	 $TotalCantidad = 0;
	 $TotalImporte = 0;
	 //while ($rowTemp1 = mysqli_fetch_array($sqlResult)) 
	 foreach ($Result as $key => $value) 
     {

	 	$TotalCantidad += $value['Cantidad'];
	 	$TotalImporte += $value['Importe'];

	     $objPHPExcel->setActiveSheetIndex(0)
	         ->setCellValue('A'.$i, $value['Codigo'])
	         ->setCellValue('B'.$i, $value['Producto'])
	         ->setCellValue('C'.$i, $value['Cantidad'])
	         ->setCellValue('D'.$i, $value['UnidadMedida'])
	         ->setCellValue('E'.$i, '$'.$value['Precio_unitario'])
	         ->setCellValue('F'.$i, '$'.$value['Importe'])
	         ->setCellValue('G'.$i, $value['UnidadSAT'])
	         ->setCellValue('H'.$i, $value['ClaveSAT']);

	     $i++;
	 }

	 $p = $i + 5;

	  $objPHPExcel->setActiveSheetIndex(0)
	  		 ->mergeCells('A'.$p.':B'.$p)
	  		 ->setCellValue('A'.$p, 'Productos Totales:')
	         ->setCellValue('C'.$p, $TotalCantidad)
			 ->mergeCells('D'.$p.':E'.$p)
	         ->setCellValue('D'.$p, "Importe Total Productos:")
	         ->setCellValue('F'.$p, '$'.$TotalImporte);

	 $estiloTituloReporte = array(
    'font' => array(
        'name'      => 'Verdana',
        'bold'      => true,
        'italic'    => false,
        'strike'    => false,
        'size' 		=> 16,
        'color'     => array(
            'rgb' => 'FFFFFF'
        )
    ),
    'fill' => array(
      'type'  => PHPExcel_Style_Fill::FILL_SOLID,
      'color' => array(
            'argb' => '1B4F72')
  ),
    'borders' => array(
        'allborders' => array(
            'style' => PHPExcel_Style_Border::BORDER_NONE
        )
    ),
    'alignment' => array(
        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
        'rotation' => 0,
        'wrap' => TRUE
    )
);
 
$estiloTituloColumnas = array(
    'font' => array(
        'name'  => 'Arial',
        'bold'  => true,
        'color' => array(
            'rgb' => '000000'
        )
    ),
    'fill' => array(
        'type'       => PHPExcel_Style_Fill::FILL_GRADIENT_LINEAR,
  'rotation'   => 90,
        'startcolor' => array(
            'rgb' => 'c47cf2'
        ),
        'endcolor' => array(
            'argb' => 'FF431a5d'
        )
    ),
    'borders' => array(
        'top' => array(
            'style' => PHPExcel_Style_Border::BORDER_MEDIUM ,
            'color' => array(
                'rgb' => '143860'
            )
        ),
        'bottom' => array(
            'style' => PHPExcel_Style_Border::BORDER_MEDIUM ,
            'color' => array(
                'rgb' => '143860'
            )
        )
    ),
    'alignment' =>  array(
        'horizontal'=> PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        'vertical'  => PHPExcel_Style_Alignment::VERTICAL_CENTER,
        'wrap'      => TRUE
    )
);
 
$estiloInformacion = new PHPExcel_Style();
$estiloInformacion->applyFromArray( array(
    'font' => array(
        'name'  => 'Arial',
        'color' => array(
            'rgb' => '000000'
        )
    ),
    'fill' => array(
  'type'  => PHPExcel_Style_Fill::FILL_SOLID,
  'color' => array(
            'argb' => 'EBF5FB')
  ),
    'borders' => array(
        'left' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN ,
      'color' => array(
              'rgb' => 'D6EAF8'
            )
        )
    )
));

$Totales = new PHPExcel_Style();
$Totales->applyFromArray( array(
    'font' => array(
        'name'  => 'Arial',
        'bold'  => true,
        'color' => array(
            'rgb' => '000000'
        )
    ),
    'fill' => array(
  'type'  => PHPExcel_Style_Fill::FILL_SOLID,
  'color' => array(
            'argb' => 'FFFFFF')
  ),
    'alignment' => array(
        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_RIGHT,
        'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
        'rotation' => 0,
        'wrap' => TRUE
    )
));

$Etiquetas = new PHPExcel_Style();
$Etiquetas->applyFromArray( array(
    'font' => array(
        'name'  => 'Arial',
        'bold'  => true,
        'color' => array(
            'rgb' => 'FFFFFF'
        )
    ),
    'fill' => array(
  'type'  => PHPExcel_Style_Fill::FILL_SOLID,
  'color' => array(
            'argb' => '1A5276')
  ),
    'alignment' => array(
        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
        'rotation' => 0,
        'wrap' => TRUE
    )
));

$Etiquetas_Informacion = new PHPExcel_Style();
$Etiquetas_Informacion->applyFromArray( array(
    'font' => array(
        'name'  => 'Arial',
        'bold'  => true,
        'size'  => 12,
        'color' => array(
            'rgb' => '000000'
        )
    ),
    'fill' => array(
  'type'  => PHPExcel_Style_Fill::FILL_SOLID,
  'color' => array(
            'argb' => 'FFFFFF')
  ),
    'alignment' => array(
        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
        'rotation' => 0,
        'wrap' => TRUE
    )
));

$objPHPExcel->getActiveSheet()->getStyle('A3:H3')->applyFromArray($estiloTituloReporte);
$objPHPExcel->getActiveSheet()->getStyle('A12:H12')->applyFromArray($estiloTituloColumnas);

$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas,'A'.$p.':B'.$p);
$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas,'D'.$p.':E'.$p);
$objPHPExcel->getActiveSheet()->setSharedStyle($Totales,'C'.$p);
$objPHPExcel->getActiveSheet()->setSharedStyle($Totales,'F'.$p);

$objPHPExcel->getActiveSheet()->setSharedStyle($estiloInformacion, "A13:H".($i-1));

$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas_Informacion,'A5:A7');
$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas_Informacion,'G8:G10');
$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas_Informacion,'F5:F7');
$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas_Informacion,'G8:G10');
$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas_Informacion,'G1:H1');

$objPHPExcel->getActiveSheet()->setSharedStyle($Totales,'G6:G7');
$objPHPExcel->getActiveSheet()->setSharedStyle($Totales,'H8:H10');
$objPHPExcel->getActiveSheet()->setSharedStyle($Totales,'B7');

$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas,'A5');
$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas,'F5');



for($i = 'A'; $i <= 'H'; $i++){
    $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension($i)->setAutoSize(TRUE);
}

// Se asigna el nombre a la hoja
$objPHPExcel->getActiveSheet()->setTitle('Venta Menudeo N°'.$ID);
 
// Se activa la hoja para que sea la que se muestre cuando el archivo se abre
$objPHPExcel->setActiveSheetIndex(0);
 
// Inmovilizar paneles
//$objPHPExcel->getActiveSheet(0)->freezePane('A4');
$objPHPExcel->getActiveSheet(0)->freezePaneByColumnAndRow(0,12);

// Se manda el archivo al navegador web, con el nombre que se indica, en formato 2007
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="Reporte_Ventas_Menudeo_N°'.$ID.'.xlsx"');
header('Cache-Control: max-age=0');
 
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');
exit;

}

else{
    print_r('No hay resultados para mostrar');
}



?>