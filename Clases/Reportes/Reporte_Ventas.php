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
	$Distribuidor      = "";
    $Direccion         = "";
    $Empresa           = "";
    $Cargo             = "";
    $Estado            = "";
    $Municipio         = "";
    $Pais              = "";
    $CP                = "";
    $Colonia           = "";

	$sqlQuery = "";
	$sqlQuery = "select V.ID, V.Fecha_venta, CONCAT(CL.Nombre, ' ', CL.Apellidos) AS Distribuidor, CL.Empresa AS Empresa_Distribuidor, CL.Cargo as Cargo_Distribuidor, CL.Calle_numero as Direccion_Distribuidor, CL.Colonia as Colonia_Distribuidor, CL.Ciudad as Ciudad_Distribuidor, CL.Municipio as Municipio_Distribuidor, CL.Estado as Estado_Distribuidor, CL.Pais as Pais_Distribuidor, CL.CP AS CP_Distribuidor, CL.RFC AS RFC_Distribuidor, CONCAT(CLM.Nombre, ' ', CLM.Apellidos) AS Cliente, CLM.Empresa, CLM.RFC, CLM.Cargo, CLM.Calle_numero, CLM.Colonia, CLM.Ciudad, CLM.Municipio, CLM.Estado, CLM.Pais, CLM.CP, VM.Fecha_venta, VM.Descuento, VM.Subtotal, VM.Impuestos, VM.Total, VM.Total_desc, V.Subtotal AS Subtotal_Venta, V.Impuestos AS Impuestos_Venta, V.Total AS Total_Venta, V.Descuento AS Descuento_Venta, VM.Status from Ventas as V INNER JOIN Ventas_menudeo as VM on V.ID = VM.idVenta INNER JOIN Clientes AS CL on V.idCliente = CL.ID INNER JOIN Clientes_menudeo AS CLM on VM.idCliente_menudeo = CLM.ID where V.ID = ". $ID;

    $Result = $Conexion->Query($sqlQuery);

  foreach ($Result as $key => $value) 
  { 

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

    $tituloReporte = "Reporte Ventas N°".$ID;

	// Se combinan las celdas A1 hasta D1, para colocar ahí el titulo del reporte
	$objPHPExcel->setActiveSheetIndex(0)
    ->mergeCells('A3:I3');

    $objPHPExcel->setActiveSheetIndex(0)
    ->mergeCells('A5:B5');

    $objPHPExcel->setActiveSheetIndex(0)
    ->mergeCells('F6:G6');

     // Se agregan los titulos del reporte
	$objPHPExcel->setActiveSheetIndex(0)
    ->setCellValue('A5','Información del Distribuidor') // Titulo del reporte
    ->setCellValue('A7',  'Nombre Distribuidor:')  //Titulo de las columnas
    ->setCellValue('B7',  $Distribuidor) //Titulo de las columnas
    ->setCellValue('A8',  'Empresa:')  //Titulo de las columnas
    ->setCellValue('B8',  $Empresa)  //Titulo de las columnas
    ->setCellValue('A9',  'Cargo:')  //Titulo de las columnas
    ->setCellValue('B9',  $Cargo)  //Titulo de las columnas
    ->setCellValue('A10',  'Dirección:')  //Titulo de las columnas
    ->setCellValue('B10',  $Direccion)  //Titulo de las columnas
    ->setCellValue('E1',  'Fecha')  //Titulo de las columnas
    ->setCellValue('F1',  date("F j, Y, g:i a"));  //Titulo de las columnas
 
	// Se agregan los titulos del reporte
	$objPHPExcel->setActiveSheetIndex(0)
    ->setCellValue('A3',$tituloReporte) // Titulo del reporte
    ->setCellValue('A12',  'ID Venta Menudeo')  //Titulo de las columnas
    ->setCellValue('B12',  'Cliente')
    ->setCellValue('C12',  'Empresa')
    ->setCellValue('D12',  'RFC')
    ->setCellValue('E12',  'Subtotal')
    ->setCellValue('F12',  'Importe')
    ->setCellValue('G12',  'Total')
    ->setCellValue('H12',  'Status')
    ->setCellValue('I12',  'Fecha');

        // Se agregan los titulos del reporte
    $objPHPExcel->setActiveSheetIndex(0)
    ->setCellValue('F6',  'Información de la Venta')
    ->setCellValue('F7',  'Subtotal')  //Titulo de las columnas
    ->setCellValue('G7',  "$".$Subtotal)
    ->setCellValue('F8',  'Importe')
    ->setCellValue('G8',  "$".$Impuestos)
    ->setCellValue('F9',  'Descuento')
    ->setCellValue('G9',  "$".$Descuento)
    ->setCellValue('F10',  'Total')
    ->setCellValue('G10',  "$".$Total);

    //Se agregan los datos de los alumnos
 
	 $i = 13; //Numero de fila donde se va a comenzar a rellenar
	 $TotalCantidad = 0;
	 $TotalImporte = 0;
	 //while ($rowTemp1 = mysqli_fetch_array($sqlResult)) 
	 foreach ($Result as $key => $value) 
	 {

	     $objPHPExcel->setActiveSheetIndex(0)
	         ->setCellValue('A'.$i, $value['ID'])
	         ->setCellValue('B'.$i, $value['Cliente'])
	         ->setCellValue('C'.$i, $value['Empresa'])
	         ->setCellValue('D'.$i, $value['RFC'])
	         ->setCellValue('E'.$i, '$'.$value['Subtotal'])
	         ->setCellValue('F'.$i, '$'.$value['Impuestos'])
	         ->setCellValue('G'.$i, $value['Total'])
             ->setCellValue('H'.$i, $value['Status'])
	         ->setCellValue('I'.$i, $value['Fecha_venta']);

	     $i++;
	 }

	 $p = $i + 5;

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

$objPHPExcel->getActiveSheet()->getStyle('A3:I3')->applyFromArray($estiloTituloReporte);
$objPHPExcel->getActiveSheet()->getStyle('A12:I12')->applyFromArray($estiloTituloColumnas);

$objPHPExcel->getActiveSheet()->setSharedStyle($estiloInformacion, "A13:I".($i-1));

$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas_Informacion,'A5:A6');
$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas_Informacion,'F6');
$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas_Informacion,'H8:H10');
$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas_Informacion,'G5:G7');
$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas_Informacion,'H1:I1');

$objPHPExcel->getActiveSheet()->setSharedStyle($Etiquetas,'A5');

for($i = 'A'; $i <= 'I'; $i++){
    $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension($i)->setAutoSize(TRUE);
}

// Se asigna el nombre a la hoja
$objPHPExcel->getActiveSheet()->setTitle('Venta N°'.$ID);
 
// Se activa la hoja para que sea la que se muestre cuando el archivo se abre
$objPHPExcel->setActiveSheetIndex(0);
 
// Inmovilizar paneles
//$objPHPExcel->getActiveSheet(0)->freezePane('A4');
$objPHPExcel->getActiveSheet(0)->freezePaneByColumnAndRow(0,12);

// Se manda el archivo al navegador web, con el nombre que se indica, en formato 2007
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="Reporte_Ventas_N°'.$ID.'.xlsx"');
header('Cache-Control: max-age=0');
 
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');
exit;

}

else{
    print_r('No hay resultados para mostrar');
}



?>