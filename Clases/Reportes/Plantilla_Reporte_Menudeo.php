	<!DOCTYPE html>
	<html lang="es">
	<head>
		<meta charset="utf-8">

		<title>Plantilla PDF</title>
		
		<style type="text/css">

		html{font-family:sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
			body{margin:0}
			.table-bordered td,.table-bordered th{border:1px solid #ddd!important}}@font-face{font-family:'Glyphicons Halflings';src:url(../fonts/glyphicons-halflings-regular.eot);src:url(../fonts/glyphicons-halflings-regular.eot?#iefix) format('embedded-opentype'),url(../fonts/glyphicons-halflings-regular.woff2) format('woff2'),url(../fonts/glyphicons-halflings-regular.woff) format('woff'),url(../fonts/glyphicons-halflings-regular.ttf) format('truetype'),url(../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular) format('svg')}text-align: 

			.table{width:100%;max-width:100%;margin-bottom:20px}
			.table>tbody>tr>td,.table>tbody>tr>th,.table>tfoot>tr>td,.table>tfoot>tr>th,.table>thead>tr>td,.table>thead>tr>th{padding:8px;line-height:1.42857143;vertical-align:top;border-top:1px solid #ddd}
			.table>thead>tr>th{vertical-align:bottom;border-bottom:2px solid #ddd}
			.table>caption+thead>tr:first-child>td,.table>caption+thead>tr:first-child>th,.table>colgroup+thead>tr:first-child>td,.table>colgroup+thead>tr:first-child>th,.table>thead:first-child>tr:first-child>td,.table>thead:first-child>tr:first-child>th{border-top:0}
			.table>tbody+tbody{border-top:2px solid #ddd}
			.table .table{background-color:#fff}
			.table-condensed>tbody>tr>td,.table-condensed>tbody>tr>th,.table-condensed>tfoot>tr>td,.table-condensed>tfoot>tr>th,.table-condensed>thead>tr>td,.table-condensed>thead>tr>th{padding:5px}
			.table-bordered{border:1px solid #ddd}
			.table-bordered>tbody>tr>td,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>td,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border:1px solid #ddd}
			.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}
			.table-striped>tbody>tr:nth-of-type(odd){background-color:#f9f9f9}
			.table-hover>tbody>tr:hover{background-color:#f5f5f5}

		</style>
	</head>
	<body>

		<?php 

		include('PHPExcel/PHPExcel.php');
		$ID = $_GET['ID'];

		//if(isset($_GET['ID']))
		if(isset($ID))
		{

		$servername = "integratto.net";
		$username = "integrat";
		$password = "fritrubi";
		$databaseName = "integrat_prosalon";

		$Total_Productos = 0;
		$Total_Importe = 0;

		$connect = mysqli_connect($servername,$username,$password, $databaseName);

		mysqli_set_charset($connect,"utf8");

		$sqlQuery = "";
		$sqlQuery = "Select DIS.Empresa, DIS.Cargo, DIS.RFC, DIS.Dia_entrega, DIS.Puntos,DIS.`Descuento_%`, DIS.Fecha_ingreso, CONCAT(CL.Nombre,' ',CL.Apellidos) as Cliente, CONCAT(DIS.Nombre,' ',DIS.Apellidos) AS Distribuidor, CL.Empresa AS Empresa_CL, CL.Cargo AS Cargo_CL, CL.RFC AS RFC_CL, CL.`Descuento_%` AS Descuento_CL, CL.Nivel AS Nivel_CL, SU.Sucursal, VM.ID, VM.Descuento, VM.Subtotal, VM.Impuestos, VM.Total, VM.Total_desc, VM.Adeudo, VM.Fecha_entrega, VM.Fecha_venta, DVM.Cantidad, DVM.Precio_unitario, DVM.Importe, CA.Codigo, CA.Producto, CA.UnidadMedida, CA.UnidadSAT, CA.ClaveSAT 
			  from Ventas_menudeo AS VM 
			  INNER JOIN Detalle_venta_menudeo AS DVM 
			  ON VM.ID = DVM.idVenta_menudeo 
			  INNER JOIN Catalogo AS CA 
			  ON DVM.idCatalogo = CA.ID 
			  INNER JOIN Clientes_menudeo as CL 
			  on VM.idCliente_menudeo = CL.ID
			  INNER JOIN Ventas as V 
			  on VM.idVenta = V.ID
			  INNER JOIN Clientes as DIS
			  ON V.idCliente = DIS.ID
			  INNER JOIN Sucursales as SU
			  ON DIS.idSucursal = SU.ID
	  		  WHERE VM.ID = ". $ID; 

		$sqlResult = mysqli_query($connect, $sqlQuery);

		//$sqlResult = mysql_query($sqlQuery);
		if(empty($sqlResult) == false)
		{
		  $rows = mysqli_num_rows($sqlResult);
		  //$rows = mysql_num_rows($sqlResult);
		}

		$result = array();

		while($rowTemp = mysqli_fetch_array($sqlResult))
		{
			$Fecha_Venta = $rowTemp['Fecha_venta'];
			$Descuento = $rowTemp['Descuento'];
			$Subtotal = $rowTemp['Subtotal'];
			$Impuestos = $rowTemp['Impuestos'];
			$Total = $rowTemp['Total'];

			$Empresa_Dis = $rowTemp['Empresa'];
			$Distribuidor = $rowTemp['Distribuidor'];
			$Cargo_Dis = $rowTemp['Cargo'];
			$Dia_Entrega = $rowTemp['Dia_entrega'];
			$Sucursal = $rowTemp['Sucursal'];
			$Puntos = $rowTemp['Puntos'];
			$RFC = $rowTemp['RFC'];

			$Sucursal = $rowTemp['Sucursal'];

			$Empresa = $rowTemp['Empresa_CL'];
			$Cliente = $rowTemp['Cliente'];
			$Cargo = $rowTemp['Cargo_CL'];
			$RFC = $rowTemp['RFC_CL'];
			$Descuento = $rowTemp['Descuento_CL'];
			$Nivel = $rowTemp['Nivel_CL'];

			array_push($result,$rowTemp);
		}

	}
	else
	{
    print_r('No hay resultados para mostrar');
	}

		?>

			
<div><?php date("Y-m-d H:i:s") ?></div>
<div style='float: left; text-align: center;'><h2>Reporte de Ventas Menudeo</h2></div>

<div style='float: left'>
<table>
  		<tbody>
  			<tr style='color: white;'>
  				<td colspan='2' style='text-align: center; background-color: #448AFF'>Infomación del Distribuidor</td>
  			</tr>
  			<tr>
  				<td>Empresa:</td>
  				<td style='text-align: center;'><?php echo strtoupper($Empresa_Dis); ?></td>
  			</tr>
  			<tr>
  				<td>RFC:</td>
  				<td style='text-align: center;'><?php echo strtoupper($RFC); ?></td>
  			</tr>
  			<tr>
  				<td>Distribuidor:</td>
  				<td style='text-align: center;'><?php echo strtoupper($Distribuidor); ?></td>
  			</tr>
  			<tr>
  				<td>Cargo:</td>
  				<td style='text-align: center;'><?php echo strtoupper($Cargo_Dis); ?></td>
  			</tr>
  			<tr>
  				<td>Dia de Entrega:</td>
  				<td style='text-align: center;'><?php echo strtoupper($Dia_Entrega); ?></td>
  			</tr>
  			<tr>
  				<td>Sucursal:</td>
  				<td style='text-align: center;'><?php echo strtoupper($Sucursal); ?></td>
  			</tr>
  			<tr>
  				<td>Puntos:</td>
  				<td style='text-align: center;'><?php echo strtoupper($Puntos); ?></td>
  			</tr>
  			<!--<tr>
  				<td>Descueto:</td>
  				<td>15%</td>
  			</tr>-->
  		</tbody>
</table>
</div>

<div style='float: left; margin-left: 500px; margin-top: 80px; position: absolute;'>
	<table>
  		<tbody>
  			<tr style='color: white;'>
  				<td colspan='2' style='text-align: center; background-color: #448AFF'>Infomación del Distribuidor</td>
  			</tr>
  			<tr>
  				<td>Empresa:</td>
  				<td style='text-align: center;'><?php echo strtoupper($Empresa); ?></td>
  			</tr>
  			<tr>
  				<td>RFC:</td>
  				<td style='text-align: center;'><?php echo strtoupper($RFC); ?></td>
  			</tr>
  			<tr>
  				<td>Cliente:</td>
  				<td style='text-align: center;'><?php echo strtoupper($Cliente); ?></td>
  			</tr>
  			<tr>
  				<td>Cargo:</td>
  				<td style='text-align: center;'><?php echo strtoupper($Cargo); ?></td>
  			</tr>
  			<tr>
  				<td>Descuento:</td>
  				<td style='text-align: center;'><?php echo strtoupper($Descuento); ?></td>
  			</tr>
  			<tr>
  				<td>Nivel:</td>
  				<td style='text-align: center;'><?php echo strtoupper($Nivel); ?></td>
  			</tr>
  		</tbody>
  	</table>
</div>

<div style="margin-top: 15px;">
		<table class="table table-striped table-bordered table-condensed">
			<thead>
				<tr style="color: white; background-color: #448AFF;">
					<td>Codigo</td>
					<td>Producto</td>
					<td>Cantidad</td>
					<td>Unidad de Medida</td>
					<td>Precio Unitario</td>
					<td>Importe</td>
					<td>Unidad SAT</td>
					<td>Clave SAT</td>
				</tr>
			</thead>
			<tbody>
				<?php foreach ($result as $key => $value) { ?>

				<?php $Total_Productos += $value['Cantidad'];
					  $Total_Importe += $value['Importe']; ?>
				<tr>
					<td><?php echo $value['Codigo'] ?></td>
					<td><?php echo $value['Producto'] ?></td>
					<td><?php echo $value['Cantidad'] ?></td>
					<td><?php echo $value['UnidadMedida'] ?></td>
					<td><?php echo '$'.$value['Precio_unitario'] ?></td>
					<td><?php echo '$'.$value['Importe'] ?></td>
					<td><?php echo $value['UnidadSAT'] ?></td>
					<td><?php echo $value['ClaveSAT'] ?></td>
				</tr>
				<?php } ?>
			</tbody>
		</table>
</div>

	<div style='float: left; margin-top: 10px;'>
			<table class="table table-striped table-bordered">
				<tbody>
					<tr>
						<td style="background-color: #448AFF; color: white;">Productos Totales:</td>
						<td><?php echo $Total_Productos ?></td>
					</tr>
				</tbody>
			</table>
	</div>

		<div style='float: left'>
			<table class="table table-striped table-bordered">
				<tbody>
					<tr>
						<td style="background-color: #448AFF; color: white;">Importe Total Productos:</td>
						<td><?php echo "$".$Total_Importe ?></td>
					</tr>
				</tbody>
			</table>
		</div>

		<div style='float: left; margin-left: 500px;'>
			<table class="table table-striped table-bordered">
				<tbody>
					<tr>
						<td style="background-color: #448AFF; color: white;">Subtotal:</td>
						<td><?php echo "$".$Subtotal ?></td>
					</tr>
					<tr>
						<td style="background-color: #448AFF; color: white;">Impuestos:</td>
						<td><?php echo "$".$Impuestos ?></td>
					</tr>
					<tr>
						<td style="background-color: #448AFF; color: white;">Descuentos:</td>
						<td><?php echo "$".$Descuento ?></td>
					</tr>
					<tr>
						<td style="background-color: #448AFF; color: white;">Total:</td>
						<td><?php echo "$".$Total ?></td>
					</tr>
				</tbody>
			</table>
		</div>

	</body>
	</html>