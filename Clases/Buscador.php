
<script language="javascript"> 
function ventanaPDF(ruta) 
{ 
	alert("Mente");
window.open(ruta); 
} 

function ventanaXML(ruta) 
{ 
	alert("Mente");
window.open(ruta); 
} 
</script> 

<?php

	$dirPDF = "http://".$_SERVER['HTTP_HOST']."/avynaFacturacion/Prosalon/Formato_Factura/Formato_Factura_33.php?ID=";
	$dirXML = "http://".$_SERVER['HTTP_HOST']."/avynaFacturacion/Prosalon/Facturacion/RecuperarXML.php?ID=";
	
	$PDF = "";
	$XML = "";

	$servername = "integratto.net";
	$username = "integrat";
	$password = "fritrubi";
	$databaseName = "integrat_prosalon";

	/*$servername = "prosalon4810.cloudapp.net";
	$username = "prosalon";
	$password = "prosalonAdmin1";
	$databaseName = "prosalon";*/


	$mysqli = new mysqli($servername,$username,$password, $databaseName);
	//$conn = mysql_connect($servername,$username,$password);

	/*if($conn->connect_error)
	{
	  die("Connection failed: " . $conn->connect_error);
	}*/

	//$db_found = mysql_select_db($databaseName);
	/*FINISH DATABASE*/
	$times = 5000;
	$counterCount = 0;
	$codeNumber = "";
	$arrayCode = [];
	$arrayFiles = [];

	$salida = "";

	$query = "select F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, VM.ID AS IDVenta, VM.idVenta, VM.Fecha_venta ,VM.Descuento, VM.Subtotal as SubtotalInvoice, VM.Impuestos as ImpuestoInvoice, VM.Total as TotalInvoice, VM.Total_desc, CONCAT(CL.Nombre, ' ' , CL.Apellidos) AS Distribuidor, CL.Empresa, CL.CP, CL.regimenFiscal 
			from Ventas as V
			join Factura as F on V.ID = F.IDVenta
			join Clientes as CL on V.idCliente = CL.ID
			join Ventas_menudeo as VM on V.ID = VM.idVenta
			Where F.Status != 'Cancelado'";


			if (isset($_POST['consulta'])) {

				$q = $mysqli->real_escape_string($_POST['consulta']);

				$query = "select F.ID, F.Serie, F.Folio, F.Fecha_Timbrado as FechaInvoice, F.UUID, F.IDIntegrador, F.IDVenta AS VentaFactura, F.Status as StatusInvoice, VM.ID AS IDVenta, VM.idVenta, VM.Fecha_venta ,VM.Descuento, VM.Subtotal as SubtotalInvoice, VM.Impuestos as ImpuestoInvoice, VM.Total as TotalInvoice, VM.Total_desc, CONCAT(CL.Nombre, ' ' , CL.Apellidos) AS Distribuidor, CL.Empresa, CL.CP, CL.regimenFiscal 
			from Ventas as V
			join Factura as F on V.ID = F.IDVenta
			join Clientes as CL on V.idCliente = CL.ID
			join Ventas_menudeo as VM on V.ID = VM.idVenta
			Where F.Status != 'Cancelado' and (F.IDVenta like '%".$q."%' or VM.Fecha_venta like '%".$q."%' or CL.Nombre like '%".$q."%' or CL.Apellidos like '%".$q."%' or F.ID like '%".$q."%' or F.Folio like '%".$q."%' or VM.Subtotal like '%".$q."%' or VM.Impuestos like '%".$q."%' or VM.Total like '%".$q."%' or F.Status like '%".$q."%')";
			}


			$resultado = $mysqli->query($query); 

			if($resultado->num_rows > 0){

				$salida.="<table id='invoices-table-data' class='table table-striped table-bordered table-responsive' cellspacing='0' width='100%'>
                                        <thead>
                                            <tr class='info'>
                                                    <th>ID</th>
                                                    <th>Fecha</th>
                                                    <th>Distribuidor</th>
                                                    <th>ID Factura</th>
                                                    <th>Folio</th>
                                                    <th>Subtotal</th>
                                                    <th>Impuesto</th>
                                                    <th>Total</th>
                                                    <th>Status</th>
                                                    <th hidden='hidden'>UUID</th>
                                                    <th hidden='hidden'>IDIntegrador</th>
                                                    <th>#</th>
                                            </tr>
                                        </thead>
                                        <tbody>";

                                        while ($fila = $resultado->fetch_assoc()) {

                                        	$PDF = $dirPDF.$fila['ID'];
                                        	$XML = $dirXML.$fila['ID'];

                                        	$salida.="<tr>
                                        				<td>".$fila['idVenta']."</td>
                                        				<td>".$fila['Fecha_venta']."</td>
                                        				<td>".$fila['Distribuidor']."</td>
                                        				<td>".$fila['ID']."</td>
                                        				<td>".$fila['Folio']."</td>
                                        				<td>".$fila['SubtotalInvoice']."</td>
                                        				<td>".$fila['ImpuestoInvoice']."</td>
                                        				<td>".$fila['TotalInvoice']."</td>
                                        				<td>".$fila['StatusInvoice']."</td>
                                        				<td hidden='hidden'>".$fila['UUID']."</td>
                                        				<td hidden='hidden'>".$fila['IDIntegrador']."</td>
                                        				

                                        			</tr>";
                                        }

                                        $salida.="</tbody> 
                                        		</table>";

			}else{

				$salida.="No se Encontraron datos";

			}

			echo $salida;

			$mysqli->close();


?>