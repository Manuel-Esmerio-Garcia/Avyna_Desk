
<?php

			$servername = "prosalon4810.cloudapp.net";
			$username = "prosalon";
			$password = "prosalonAdmin1";
			$databaseName = "prosalon";


			$conn = mysqli_connect($servername,$username,$password, $databaseName);
			
			mysqli_set_charset($conn,"utf8");

			mysqli_select_db($conn, $databaseName);
			
			$times = 5000;
			$counterCount = 0;
			$codeNumber = "";
			$arrayCode = [];
			$arrayFiles = [];
			$Identificador = $_POST['ID'];

		if(isset($_POST['Fecha_Inicio'],$_POST['Fecha_Fin']))
		{

			if ($Identificador == 1) {

				if (!empty($_POST['Fecha_Inicio']) && !empty($_POST['Fecha_Fin'])) {
				
			$Query = "select V.ID AS IDVenta, V.Fecha_venta, V.Subtotal, V.Impuestos, V.Total, V.Status AS Status_Venta, V.Extraido, CONCAT(CL.Nombre , ' ' , CL.Apellidos) AS Distribuidor, CL.*
			from Ventas AS V 
			join Clientes AS CL on V.idCliente = CL.ID 
			where V.Extraido = 1 and V.Status !=  'Facturado' and V.Fecha_venta BETWEEN '".date('Y-m-d', strtotime($_POST['Fecha_Inicio']))."' and '".date('Y-m-d', strtotime($_POST['Fecha_Fin']))."'";

			}else{

				$Query = "select V.ID AS IDVenta, V.Fecha_venta, V.Subtotal, V.Impuestos, V.Total, V.Status AS Status_Venta, V.Extraido, CONCAT(CL.Nombre , ' ' , CL.Apellidos) AS Distribuidor, CL.*
			from Ventas AS V 
			join Clientes AS CL on V.idCliente = CL.ID 
			where V.Extraido = 1 and V.Status !=  'Facturado'";

			}

			$sqlResult = mysqli_query($conn, $Query);

			$result = array();
			//$sqlResult = mysql_query($sqlQuery);
			if(empty($sqlResult) == false)
			{
			  $rows = mysqli_num_rows($sqlResult);
			  //$rows = mysql_num_rows($sqlResult);
			}

			while($rowTemp = mysqli_fetch_array($sqlResult, MYSQLI_ASSOC)){

				array_push($result,$rowTemp);
			}


			$rowTemp = mysqli_fetch_array($sqlResult);
		

			$output = json_encode(array("Ventas"=>$result));
			header('Content-Length: '.strlen($output));
			header('Content-type: application/json');
			ob_clean();
			flush();
			print $output; 

			}else if($Identificador == 2){

				if (!empty($_POST['Fecha_Inicio']) && !empty($_POST['Fecha_Fin'])) {

			$Query = "select F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, VM.ID AS IDVenta, VM.idVenta, VM.Fecha_venta ,VM.Descuento, VM.Subtotal as SubtotalInvoice, VM.Impuestos as ImpuestoInvoice, VM.Total as TotalInvoice, VM.Total_desc, CONCAT(CL.Nombre, ' ' , CL.Apellidos) AS Distribuidor, CL.Empresa, CL.CP, CL.regimenFiscal 
			from Ventas as V
			join Factura as F on V.ID = F.IDVenta
			join Clientes as CL on V.idCliente = CL.ID
			join Ventas_menudeo as VM on V.ID = VM.idVenta
			Where F.Status != 'Cancelado' and  F.Fecha_Timbrado BETWEEN '".date('Y-m-d', strtotime($_POST['Fecha_Inicio'])). "' and '".date('Y-m-d', strtotime($_POST['Fecha_Fin']))."'";

				}else{

			$Query = "select F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, VM.ID AS IDVenta, VM.idVenta, VM.Fecha_venta ,VM.Descuento, VM.Subtotal as SubtotalInvoice, VM.Impuestos as ImpuestoInvoice, VM.Total as TotalInvoice, VM.Total_desc, CONCAT(CL.Nombre, ' ' , CL.Apellidos) AS Distribuidor, CL.Empresa, CL.CP, CL.regimenFiscal 
			from Ventas as V
			join Factura as F on V.ID = F.IDVenta
			join Clientes as CL on V.idCliente = CL.ID
			join Ventas_menudeo as VM on V.ID = VM.idVenta
			Where F.Status != 'Cancelado'";

				}

			$sqlResult = mysqli_query($conn, $Query);

			$result = array();
			//$sqlResult = mysql_query($sqlQuery);
			if(empty($sqlResult) == false)
			{
			  $rows = mysqli_num_rows($sqlResult);
			  //$rows = mysql_num_rows($sqlResult);
			}

			while($rowTemp = mysqli_fetch_array($sqlResult, MYSQLI_ASSOC)){

				array_push($result,$rowTemp);
			}


			$rowTemp = mysqli_fetch_array($sqlResult);
		

			$output = json_encode(array("Facturas"=>$result));
			header('Content-Length: '.strlen($output));
			header('Content-type: application/json');
			ob_clean();
			flush();
			print $output; 

			}
			else if($Identificador == 3)
			{

				if (!empty($_POST['Fecha_Inicio']) && !empty($_POST['Fecha_Fin']))
				{


					$Query = "select F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, VM.ID AS IDVenta, VM.idVenta, VM.Fecha_venta ,VM.Descuento, VM.Subtotal as SubtotalInvoice, VM.Impuestos as ImpuestoInvoice, VM.Total as TotalInvoice, VM.Total_desc, CONCAT(CL.Nombre, ' ' , CL.Apellidos) AS Distribuidor, CL.Empresa, CL.CP, CL.regimenFiscal from Ventas as V 
					join Factura as F on V.ID = F.IDVenta
					join Clientes as CL on V.idCliente = CL.ID
					join Ventas_menudeo as VM on V.ID = VM.idVenta
					where F.Status = 'Cancelado' and  F.Fecha_Timbrado BETWEEN '".date('Y-m-d', strtotime($_POST['Fecha_Inicio'])). "' and '".date('Y-m-d', strtotime($_POST['Fecha_Fin']))."'";

				}
				else
				{

					$Query = "select F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, VM.ID AS IDVenta, VM.idVenta, VM.Fecha_venta ,VM.Descuento, VM.Subtotal as SubtotalInvoice, VM.Impuestos as ImpuestoInvoice, VM.Total as TotalInvoice, VM.Total_desc, CONCAT(CL.Nombre, ' ' , CL.Apellidos) AS Distribuidor, CL.Empresa, CL.CP, CL.regimenFiscal from Ventas as V 
					join Factura as F on V.ID = F.IDVenta
					join Clientes as CL on V.idCliente = CL.ID
					join Ventas_menudeo as VM on V.ID = VM.idVenta
					where F.Status = 'Cancelado'";
			
				}

			$sqlResult = mysqli_query($conn, $Query);

			$result = array();
			//$sqlResult = mysql_query($sqlQuery);
			if(empty($sqlResult) == false)
			{
			  $rows = mysqli_num_rows($sqlResult);
			  //$rows = mysql_num_rows($sqlResult);
			}

			while($rowTemp = mysqli_fetch_array($sqlResult, MYSQLI_ASSOC)){

				array_push($result,$rowTemp);
			}


			$rowTemp = mysqli_fetch_array($sqlResult);
		

			$output = json_encode(array("FacturasCanceladas"=>$result));
			header('Content-Length: '.strlen($output));
			header('Content-type: application/json');
			ob_clean();
			flush();
			print $output; 


			}

		}else{

			print_r("Algunos de los valores es nulo");
		}



	?>