<?php
/********************************************************************/
/***   Nombre Archivo: InvoicingCCEController.php				  ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 05/05/2020         					      ***/
/***   Proyecto: Prosalon_Desk 					                  ***/
/********************************************************************/

defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

include('./ecodexphp/includes.php');

class Controller_Factura_Exportacion extends CI_Controller {

	public function __construct(){
        parent::__construct();
		$this->load->model('Facturacion_Exportacion_Model', 'invoicing');
		$this->load->model('Facturacion/invoiceIncomeCCEModel','invoice');
	}
	
	/********************************************************************/
	/***   Función: index() 	                				      ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 01/11/2019    					                  ***/
	/***   Descripción: Carga la vista de facturación 	 		      ***/
	/********************************************************************/
	public function index(){
		if (!isset($_SESSION['Avyna'])) redirect('controller_Login');
		
        $title = array('PageTitle' => 'Facturación Exportación');
        $this->load->view('Componentes/Header', $title);
		$this->load->view('Manejo/Facturacion/Factura_Exportacion.vue');
		$this->load->view('Componentes/Footer', $title);
	}
	/********************************************************************/
	/***   Función: init() 	                				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 01/11/2019    					                  ***/
	/***   Descripción: Obtener Información de la Empresa 		      ***/
	/********************************************************************/
	public function init(){
		$response = $this->invoicing->init();
		print_r(json_encode($response));
	}
	public function searchUMT(){
		$info 	  = json_decode(file_get_contents("php://input"),true);
		$response = $this->invoicing->searchUMT($info['fraccion']);
		print_r(json_encode($response));
	}
	/********************************************************************/
	/***   Función: getDetailsInvoice() 	            	          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 01/11/2019    					                  ***/
	/***   Descripción: Obtener Información Facturas By idVenta       ***/
	/********************************************************************/
	public function getDetailsInvoice(){
		$info 	  = json_decode(file_get_contents("php://input"),true);
		$response = $this->invoicing->getDetailsInvoice($info);
		print_r(json_encode($response));
	}
	/********************************************************************/
	/***   Función: btnInvoiceSale() 	           				      ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 01/11/2019    					                  ***/
	/***   Descripción: Abrir Modal Facturar Venta  y Obtener         ***/
	/***   Información para mostrar en la modal de la factura         ***/                 
	/********************************************************************/
	public function btnInvoiceSale(){
		$info 	  = json_decode(file_get_contents("php://input"),true);
		$response = $this->invoicing->btnInvoiceSale($info);
		print_r(json_encode($response));
	}
	/********************************************************************/
	/***   Función: changeRelateCFDi() 	           				      ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 04/11/2019    					                  ***/
	/***   Descripción: Acción Mostrar CFDi's Relacionados            ***/
	/***   Obtener el listado de los CFDi's sin relación              ***/
	/********************************************************************/
	public function changeRelateCFDi(){
		$info 	  = json_decode(file_get_contents("php://input"),true);
		$response = $this->invoicing->changeRelateCFDi($info);
		print_r(json_encode($response));
	}
	/********************************************************************/
	/***   Función: btnFacturar() 	           				          ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 04/11/2019    					                  ***/
	/***   Descripción: Acción Facturar Venta de Ingreso              ***/
	/********************************************************************/
	public function btnFacturar(){
		$info 	         = json_decode(file_get_contents("php://input"),true);
		$hoy = date("Y-m-d");

		$xml      = $this->invoice->satxmlsv33($info, '', '', '', 'cce');

		try{

			$Seguridad = new Seguridad(); //Se crea instancia de la clase Seguridad
			$trsID     = rand( 1, 10000 ); //Se genera el ID
			$Token     = $Seguridad->ObtenerToken($info['Company']['RFC'], $trsID ); //Se genera el token de servicio
			$Timbra    = new Timbrado(); //Se crea instancia de la clase Timbrado
			$trsID     = rand(1, 10000); //Se genera el ID
			$Token     = $Seguridad->ObtenerToken($info['Company']['RFC'], $trsID );  	
			$ComprobanteXML = $Timbra->TimbraXML($xml, $info['Company']['RFC'], $trsID, $Token);

			if ($ComprobanteXML != null) {
	
				$dir  =  $_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/XMLs/XML_Timbrados/Exportacion';  
				$file = 'XEXX010101000_'.$info['Sale']['ID'].$hoy.'.xml'; //Nombre del XML timbrado
				$fi = fopen($dir.$file,'w+'); //Se crea el archivo xml en la ruta especifica
				fwrite($fi, $ComprobanteXML); //Mandamos el archivo XML proporcionado por el PAC    
				fclose($fi); 
		
				$dom = new DOMDOCUMENT('1.0','utf-8'); // Creamos objeto DOM
				$dom->load($dir.$file); // Definimos la ruta de nuestro XML
		
				// Recorremos el XML Tag por Tag para encontrar los elementos buscados
				// Obtenemos el Machote(Estructura) del XML desde la web de SAT 
				foreach ($dom->getElementsByTagNameNS('http://www.sat.gob.mx/TimbreFiscalDigital', '*') as $elemento){
					$UUID             = $elemento->getAttribute('UUID'); 
					$noCertificadoSAT = $elemento->getAttribute('NoCertificadoSAT'); 
					$FechaTimbrado    = $elemento->getAttribute('FechaTimbrado'); 
					$selloCFD         = $elemento->getAttribute('SelloCFD');
					$selloSAT         = $elemento->getAttribute('SelloSAT');
					$RFCPAC           = $elemento->getAttribute('RfcProvCertif');
				}
							
				if ($UUID != null && $UUID != ""){
					$XML_Datos   = new SimpleXMLElement($ComprobanteXML);
					$Sello       = explode(" ",$XML_Datos['Sello']);
					$Certificado = explode(" ",$XML_Datos['Certificado']);
					$FechaFormat = $this->satxmlsv33_xml_fech($FechaTimbrado);
		
					$facturaIngresos = array(
						'idVenta'         =>  $info['Sale']['ID'],
						'idUsuario'       =>  $_SESSION['Avyna'][0]['ID'],
						'Fecha_timbrado'      =>  $FechaTimbrado,
						'Folio'    			  =>  $info['Sale']['ID'],
						'Serie'               =>  $info['Invoice']['serie'],
						'Tipo_comprobante'    =>  $info['Invoice']['voucher'],
						'Tipo_cambio'         =>  $info['Invoice']['typeChange'],
						'Forma_pago'    	  =>  $info['Invoice']['wayToPay'],
						'Moneda'          	  =>  $info['Invoice']['currency'],
						'Metodo_Pago'         =>  $info['Invoice']['methodOfPayment'],
						'Receptor'            =>  $info['Client']['Empresa'],
						'Receptor_RFC'        =>  $info['Client']['RFC'],
						'Uso_CFDI'         	  =>  $info['Invoice']['useCFDi'],
						'Emisor'        	  =>  $info['Company']['Razon_Social'],
						'Emisor_RFC'          =>  $info['Company']['RFC'],
						'Lugar_Expedicion'    =>  $info['Company']['CP'],
						'Clave_Regimen_Fiscal'=>  $info['Company']['Clave_Regimen_Fiscal'],
						'Regimen_Fiscal'      =>  $info['Company']['Descripcion_Regimen_Fiscal'],
						'Status'              =>  'Timbrado',
						'Observaciones'       =>  $info['Invoice']['observations'],
						'Subtotal'            =>  $info['Sale']['Subtotal'],
						'Impuesto'            =>  $info['Sale']['Impuestos'],
						'Retenciones'         =>  '0.00',
						'Descuento'           =>  $info['Sale']['Descuento'],
						'Total'         	  =>  $info['Sale']['Total'],
						'Correo'         	  =>  $info['Client']['Correo'],
						'UUID'       		  =>  $UUID,
						'IDIntegrador'        =>  $trsID,
						'CertificadoSAT'      =>  $noCertificadoSAT,
						'SelloSAT'       	  =>  $selloSAT,
						'SelloCFD'       	  =>  $selloCFD,
						'RFC_PAC'       	  =>  $RFCPAC,
						'Sello'       		  =>  $Sello[0],
						'Certificado'         =>  $Certificado[0],
						'Relacion' 			  =>  0
					);

					// Almacenamos la factura a la base de datos //
					$response        = $this->invoicing->btnFacturar($facturaIngresos,$info['Relate'],$info['Details']);
					print_r($response);
				}
				else{
					print_r(2);
				}
			}
			else{
				print_r(3);
			}
		}
		catch(Exception $er){
			print_r(4);
			print_r("\n");
			print_r($er);
		}
	}
	/********************************************************************/
	/***   Función: btnCancelarFactura() 	           				  ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 04/11/2019    					                  ***/
	/***   Descripción: Acción Cancelar Facturar Venta de Ingreso     ***/
	/********************************************************************/
	public function btnCancelarFactura(){
		$info 			 = json_decode(file_get_contents("php://input"),true);
		try{

            $CCE = $this->invoicing->getInvoiceByID($info['idFactura']);

			$UUID       = $CCE[0]['UUID'];
			$RFC        = $info['Company']['RFC'];
			$idFactura  = $info['idFactura'];
	
			$Seguridad = new Seguridad(); //Se crea instancia de la clase Seguridad
			$trsID = rand( 1, 10000 );    //Se genera el ID
			$Token = $Seguridad->ObtenerToken( $RFC , $trsID ); //Se genera el token de servicio
	
			$Cancelacion = new Cancelacion(); //Se crea instancia de la clase Cancelacion
			$TransaccionID = rand( 1, 10000 );
	
			// Cancelación masiva //
			$arr = explode(",",$UUID);    
			$ListaCancelar["guid"] = array();
			foreach ($arr as $key => $value) {
				array_push($ListaCancelar["guid"], $value);
			}                                                                                   
	
			$Cancelar = $Cancelacion->CancelaMultiple($RFC, $Token, $TransaccionID, $ListaCancelar);
	
			if ($Cancelar['Estatus'] != 'No Cancelable' && $Cancelar['Estatus'] != 'Solicitud rechazada'){
				$response = $this->invoicing->btnCancelarFactura($info);
				print_r($response);
			}
			else{
				print_r(2);
			}
		}
		catch(FallaValidacion $er){
			print_r($er->__toString());
		}
	}
	/********************************************************************/
	/***   Función: satxmlsv33_xml_fech() 	                		  ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 04/11/2019    					                  ***/
	/***   Descripción: Convertir fecha Timbrado SAT a formato 	      ***/
	/***   Mysql para su inserción              		 		      ***/
	/********************************************************************/
	public function satxmlsv33_xml_fech($fech){
		$ano = substr($fech,0,4);
		$mes = substr($fech,5,2);
		$dia = substr($fech,8,2);
		$hor = substr($fech,11,2);
		$min = substr($fech,14,2);
		$seg = substr($fech,17,2);
		$aux = $ano."-".$mes."-".$dia." ".$hor.":".$min.":".$seg;
		if ($aux == "--T::")
			$aux = "";
		return ($aux);
    }
	/********************************************************************/
	/***   Función: fetchSale() 	                				  ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 01/11/2019    					                  ***/
	/***   Descripción: Cargar DataTable fetchSale 		 		      ***/
	/********************************************************************/
	public function fetchSale(){
		$data = $this->input->post();
		$info = $this->invoicing->fetchSale($data);
		print_r($info);
	}
	/********************************************************************/
	/***   Función: fetchInvoice() 	                				  ***/
	/***   Autor: Manuel Esmerio Gacria					      	      ***/
	/***   Fecha: 01/11/2019    					                  ***/
	/***   Descripción: Cargar DataTable fetchInvoice			      ***/
	/********************************************************************/
	public function fetchInvoice(){
		$data = $this->input->post();
		$info = $this->invoicing->fetchInvoice($data);
		print_r($info);
	}

}
