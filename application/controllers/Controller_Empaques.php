<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);
libxml_disable_entity_loader(false);

class Controller_Empaques extends CI_Controller 
{	
	public $usermain = null;

	public function __construct()
	{
		parent::__construct();

		if(!isset($_SESSION['Avyna'])) redirect('controller_Login');
		$this->load->model("Empaques_Model","empaque");

	}

	public function index()
	{
		$Titulo = array('PageTitle' => 'Empaques');

	    $this->load->view('Componentes/Header', $Titulo); 
		$this->load->view('Operaciones/Empaques');
		$this->load->view('Componentes/Footer');	
	}

	public function Empaque_general_view()
	{
		$data = $this->input->post();

	    $info['Detalle'] = $this->empaque->Get_Detalle($data['ID']);

	    print_r(json_encode($info));
	}

	public function Empaques_View()
	{
		$data = $this->input->post();

	    $info['Detalle'] = $this->empaque->Get_Detalle_Venta_Menudeo($data['ID']);

	    print_r(json_encode($info));
	}

	public function Productos_Empaque_View()
	{
		$data = $this->input->post();

	    $info['Detalle'] = $this->empaque->Get_Productos($data['ID']);

	    print_r(json_encode($info));
	}

	public function Editar_Guia()
	{
		$data = $this->input->post();

	    $Result= $this->empaque->Update_Guia($data);

	    if ($Result != 0)
	    {
	    	print_r($Result);
	    }
	    else
	    {
	    	print_r("error_Editar");
	    	exit();
	    }
	}

	public function Eliminar_Empaque()
	{
		$data = $this->input->post();

	    $Result = $this->empaque->Eliminar_Empaque($data);

	    if ($Result != 0)
	    {
	    	print_r($Result);
	    }
	    else
	    {
	    	print_r("error_Eliminar");
	    	exit();
	    }
	}

	public function Consultar_Estafeta()
	{
		$info = $this->input->post();

	try {
		    $opts = array(
		        'http' => array(
		            'user_agent' => 'PHPSoapClient'
		        )
		    );
		    $context = stream_context_create($opts);

		    $wsdlUrl = 'https://trackingqa.estafeta.com/Service.asmx?wsdl';
		    $soapClientOptions = array(
		        'stream_context' => $context,
		        'cache_wsdl' => WSDL_CACHE_NONE
		    );

		    $client 		 = new SoapClient($wsdlUrl, $soapClientOptions);

			// Arreglo de guías a consultar 
			$waylbills = array(); 
			$waylbills[0] = $info['Guia'];
			 
			// Se llena Objeto WaybillRange 
			$WaybillRange = new StdClass(); 
			$WaybillRange->initialWaybill = ''; 
			$WaybillRange->finalWaybill = ''; 
			 
			// Se llena objeto WaybillList, se trata guías de 22 dígitos 
			$WaybillList = new StdClass(); 
			$WaybillList->waybillType = 'G'; 
			$WaybillList->waybills = $waylbills; 
			 
			// Se llena objeto SearchType, se indica que se trata de una lista de guías 
			$SearchType = new StdClass(); 
			$SearchType->waybillRange = $WaybillRange; 
			$SearchType->waybillList = $WaybillList;
			$SearchType->type = 'L'; 

			// Se llena objeto HistoryConfiguration, se indica que se requiere toda la historia de las guías 
			$HistoryConfiguration = new StdClass; 
			$HistoryConfiguration->includeHistory = 1; 
			$HistoryConfiguration->historyType = 'ALL'; 
			 
			// Se llena objeto Filter, se indica que no se requiere el filtro por estado actual de las guías 
			$Filter =  new StdClass; 
			$Filter->filterInformation = 0; 
			//$Filter->filterType = 'DELIVERED'; 
			 
			// Se llena objeto SearchConfiguration, se indican parámetros adicionales a la búsqueda 
			$SearchConfiguration = new StdClass(); 
			$SearchConfiguration->includeDimensions = 1; 
			$SearchConfiguration->includeWaybillReplaceData = 0; 
			$SearchConfiguration->includeReturnDocumentData = 0; 
			$SearchConfiguration->includeMultipleServiceData = 0; 
			$SearchConfiguration->includeInternationalData = 0; 
			$SearchConfiguration->includeSignature = 0; 
			$SearchConfiguration->includeCustomerInfo = 1; 
			$SearchConfiguration->historyConfiguration = $HistoryConfiguration; 
			$SearchConfiguration->filterType= $Filter;

			// Se instancía al método del web service para consulta de guías 
			$result = $client->ExecuteQuery(array( 
			    'suscriberId'=>25,  
			    'login'=>'Usuario1', 
			    'password'=> '1GCvGIu$', 
			    'searchType' => $SearchType, 
			    'searchConfiguration' => $SearchConfiguration    
			    )    
			);

			//Se imprime resultado obtenido de la consulta al ws 

			if ($result->ExecuteQueryResult->errorCode == 0)
			{
				print_r(json_encode($result->ExecuteQueryResult->trackingData->TrackingData));
				exit();
			}
			else
			{
				print_r(json_encode($result->ExecuteQueryResult->errorCode));
				exit();
			}
		}
		catch(Exception $e) {
		    echo $e->getMessage();
		}
	}

	public function PrintGlobalLabel(){
		$info = $this->input->post();

		if (strlen($info['Guia']) === 22) {
			$this->PrintEstafeta($info);
		// }else if (strlen($info['Guia']) === 12) {
		}else{
			$this->PrintAPMP($info);
		}
	}

	public function PrintAPMP($info){
		$NamePDF = 'guiaprintAMPM';

		$data = array("Guia" => $info['Guia'], "TipoImpresion" => 2);
		// Prueba //
		// $result = $this->CallAPI("POST","http://qaptpak.grupoampm.com/ws/api/Documentacion/EtiquetaEnvio", json_encode($data));
		// Productivo
		$result = $this->CallAPI("POST","https://tpak.grupoampm.com/ws/api/Documentacion/EtiquetaEnvio", json_encode($data));

		try{
			
			if (!empty($result)) {
				if (strlen($result) >= 8000) {
					$Guia = $result;

					$dir  = $_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/ESTAFETA/'; 
					$file = $dir.$NamePDF.'.pdf';
					file_put_contents($file, $Guia);

					$archivo = fopen($dir.$NamePDF.'_'.$info['Guia'].'.pdf',"w+b");
					fwrite($archivo, $Guia);
					fflush($archivo);
					fclose($archivo);

					if (file_exists($file)) {
						header('Content-Description: File Transfer');
						header('Content-Type: application/octet-stream');
						header('Content-Disposition: attachment; filename="'.basename($file).'"');
						header('Expires: 0');
						header('Cache-Control: must-revalidate');
						header('Pragma: public');

						$response = array('code' => 0);
						print_r( json_encode($response) );
					}
				}
				else{			
					$objResult = json_decode($result);
					$response = array('code' => $objResult->msgNo,
									'message' => $objResult->msg);
					print_r( json_encode($response) );
				}
			}else{
				$response = array('code' => 12345,
									'message' => 'Ocurrio un error al consumir la REST API');
				print_r( json_encode($response) );
			}
		}
		catch(Exception $e){
			echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		}
	}

	public function CallAPI($method, $url, $data = false){
		$curl = curl_init();

		switch ($method){
			case "POST":
				curl_setopt($curl, CURLOPT_POST, 1);

				if ($data)
					curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
				break;
			case "PUT":
				curl_setopt($curl, CURLOPT_PUT, 1);
				break;
			default:
				if ($data)
					$url = sprintf("%s?%s", $url, http_build_query($data));
		}

		// Optional Authentication:
		curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($curl, CURLOPT_USERPWD, "username:password");

		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

		// Productivo
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	
		// Prueba
		// $headers = [
		// 	'Authorization: Basic R0VORVJBTDpHM05FUjRsMDYxMTE4JQ==',
		// 	'Cache-Control: no-cache',
		// 	'Content-Type: application/json',
		// ];

		// Productivo
		$headers = [
			'Authorization: Basic UFJPU0FMT05BVlk6UHIwNTRsMG40dlkkQS0lMTc=',
			'Cache-Control: no-cache',
			'Content-Type: application/json'
		];
		
		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

		$result = curl_exec($curl);

		curl_close($curl);

		return $result;
	}


	public function PrintEstafeta($info){
		$NamePDF = 'guiaprint';

		$Estafeta['GuiasEnvios'] 		= $this->empaque->Get_GuiasEnvios($info['ID']);
		$Estafeta['GuiasDescripcion'] 	= $this->empaque->Get_GuiasDescripcion($info['ID']);
		$Estafeta['Origen'] 			= $this->empaque->Get_DireccionEnvioGuia($info['ID'],'origen');
		$Estafeta['Destino'] 			= $this->empaque->Get_DireccionEnvioGuia($info['ID'],'destino');

		if ($Estafeta['GuiasEnvios'] != null){
			try {
			    $opts = array(
			        'http' => array(
			            'user_agent' => 'PHPSoapClient'
			        ),
			        'ssl' => array(
			        	'verify_peer' => false,
			        	'verify_peer_name' => false,
			        	'allow_self_signed' => true
			        )
			    );
			    $context = stream_context_create($opts);

			    $wsdlUrl = 'https://label.estafeta.com/EstafetaLabel20/services/EstafetaLabelWS?wsdl';
			    $soapClientOptions = array(
			        'stream_context' => $context,
			        'cache_wsdl' => WSDL_CACHE_NONE
			    );

			    $client 		 = new SoapClient($wsdlUrl, $soapClientOptions);

			    /////////////////////// Prueba ////////////////////////////////
			    /*Array
				(
					[customerNumber] => 0000000
					[login] => prueba1
					[paperType] => 2
					[password] => lAbeL_K_11
					[quadrant] => 0
					[reprintLabelDescriptionList] => Array
						(
							[aditionalInfo] => OPERACION5
							[content] => JOYAS
							[contentDescription] => 
							[costCenter] => 12345
							[deliveryToEstafetaOffice] => 0
							[destinationInfoReprint] => Array
								(
									[address1] => MAIZALES
									[address2] => 35
									[cellPhone] => 4444444
									[city] => COYOACAN
									[contactName] => JAVIER SANCHEZ
									[corporateName] => CHICOLOAPAN SA DE CV
									[customerNumber] => 0000000
									[neighborhood] => CENTRO
									[phoneNumber] => 777777
									[state] => ESTADO DE MEXICO
									[valid] => 1
									[zipCode] => 02130
								)

							[originInfoReprint] => Array
								(
									[address1] => CALLE 5 
									[address2] => 29
									[cellPhone] => 9999999
									[city] => TLALPAN
									[contactName] => JANET OIDOR
									[corporateName] => ALTAS SA DE CV
									[customerNumber] => 0000000
									[neighborhood] => CENTRO
									[phoneNumber] => 888888
									[state] => DF
									[valid] => 1
									[zipCode] => 02300
								)

							[originZipCodeForRouting] => 02130
							[parcelNumber] => 8050000000130700451614
							[parcelTypeId] => 4
							[reference] => FRENTE AL SANBORNS
							[valid] => 1
							[weight] => 5.00
						)

					[reprintLabelDescriptionListCount] => 0
					[suscriberId] => 28
					[valid] => 1
				)
								$params1 = array(
									"customerNumber" => '0000000',
									"login" => 'prueba1',
									"paperType" => 2,
									"password" => 'lAbeL_K_11',
									"quadrant" => 0,
									"reprintLabelDescriptionList" => array(
										'aditionalInfo' => 'OPERACION5',
										'content' => 'JOYAS',
										'contentDescription' => ,
										'costCenter' => '12345',
										'deliveryToEstafetaOffice' => 0,
										'destinationInfoReprint' => array(
										"address1" => 'MAIZALES',
										"address2" => '35',
										"cellPhone" => '4444444',
										"city" => 'COYOACAN',
										"contactName" => 'JAVIER SANCHEZ',
										"corporateName" => 'CHICOLOAPAN SA DE CV',
										"customerNumber" => '0000000',
										"neighborhood" => 'CENTRO',
										"phoneNumber" => '777777',
										"state" => 'ESTADO DE MEXICO',
										"valid" => 1,
										"zipCode" => '02130'
										),
										'originInfoReprint' => array(
										"address1" => ,
										"address2" => ,
										"cellPhone" => ,
										"city" => ,
										"contactName" => ,
										"corporateName" => ,
										"customerNumber" => ,
										"neighborhood" => ,
										"phoneNumber" => ,
										"state" => ,
										"valid" => ,
										"zipCode" => 
										),

										'originZipCodeForRouting' => $Estafeta['GuiasDescripcion'][0]['originZipCodeForRouting'],
										'parcelNumber' => '8050000000130700451614',
										'parcelTypeId' => $Estafeta['GuiasDescripcion'][0]['parcelTypeId'],
										'reference' => $Estafeta['GuiasDescripcion'][0]['reference'],
										'valid' => $Estafeta['GuiasDescripcion'][0]['valid'],
										'weight' => $Estafeta['GuiasDescripcion'][0]['weight']
									),
									"reprintLabelDescriptionListCount" => $Estafeta['GuiasEnvios'][0]['labelDescriptionListCount'],
									"suscriberId" => $Estafeta['GuiasEnvios'][0]['suscriberId'],
									"valid" => $Estafeta['GuiasEnvios'][0]['valid'],
									);*/

			    	$params = array(
					  "customerNumber" => $Estafeta['GuiasEnvios'][0]['customerNumber'],
					  "login" => $Estafeta['GuiasEnvios'][0]['login'],
					  "paperType" => $Estafeta['GuiasEnvios'][0]['paperType'],
					  "password" => $Estafeta['GuiasEnvios'][0]['password'],
					  "quadrant" => $Estafeta['GuiasEnvios'][0]['quadrant'],
					  "reprintLabelDescriptionList" => array(
					  	'aditionalInfo' => $Estafeta['GuiasDescripcion'][0]['aditionalInfo'],
					  	'content' => $Estafeta['GuiasDescripcion'][0]['content'],
					  	//'contentDescription' => $Estafeta['GuiasDescripcion'][0]['contentDescription'],
					  	'costCenter' => $Estafeta['GuiasDescripcion'][0]['costCenter'],
					  	'deliveryToEstafetaOffice' => $Estafeta['GuiasDescripcion'][0]['deliveryToEstafetaOffice'],
					    'destinationInfoReprint' => array(
					       "address1" => $Estafeta['Destino'][0]['address1'],
					       "address2" => $Estafeta['Destino'][0]['address2'],
					       "cellPhone" => $Estafeta['Destino'][0]['cellPhone'],
					       "city" => $Estafeta['Destino'][0]['city'],
					       "contactName" => $Estafeta['Destino'][0]['contactName'],
					       "corporateName" => $Estafeta['Destino'][0]['corporateName'],
					       "customerNumber" => $Estafeta['Destino'][0]['customerNumber'],
					       "neighborhood" => $Estafeta['Destino'][0]['neighborhood'],
					       "phoneNumber" => $Estafeta['Destino'][0]['phoneNumber'],
					       "state" => $Estafeta['Destino'][0]['state'],
					       "valid" => $Estafeta['Destino'][0]['valid'],
					       "zipCode" => $Estafeta['Destino'][0]['zipCode']
					     ),
					    'originInfoReprint' => array(
					       "address1" => $Estafeta['Origen'][0]['address1'],
					       "address2" => $Estafeta['Origen'][0]['address2'],
					       "cellPhone" => $Estafeta['Origen'][0]['cellPhone'],
					       "city" => $Estafeta['Origen'][0]['city'],
					       "contactName" => $Estafeta['Origen'][0]['contactName'],
					       "corporateName" => $Estafeta['Origen'][0]['corporateName'],
					       "customerNumber" => $Estafeta['Origen'][0]['customerNumber'],
					       "neighborhood" => $Estafeta['Origen'][0]['neighborhood'],
					       "phoneNumber" => $Estafeta['Origen'][0]['phoneNumber'],
					       "state" => $Estafeta['Origen'][0]['state'],
					       "valid" => $Estafeta['Origen'][0]['valid'],
					       "zipCode" => $Estafeta['Origen'][0]['zipCode']
					     ),

					    'originZipCodeForRouting' => $Estafeta['GuiasDescripcion'][0]['originZipCodeForRouting'],
					  	'parcelNumber' => $Estafeta['GuiasDescripcion'][0]['parcelNumber'],
					  	'parcelTypeId' => $Estafeta['GuiasDescripcion'][0]['parcelTypeId'],
					  	'reference' => $Estafeta['GuiasDescripcion'][0]['reference'],
					  	'valid' => $Estafeta['GuiasDescripcion'][0]['valid'],
					  	'weight' => $Estafeta['GuiasDescripcion'][0]['weight']
					  ),
					  "reprintLabelDescriptionListCount" => intval($Estafeta['GuiasEnvios'][0]['labelDescriptionListCount']),
					  "suscriberId" => $Estafeta['GuiasEnvios'][0]['suscriberId'],
					  "valid" => $Estafeta['GuiasEnvios'][0]['valid'],
					);

					print_r(json_encode($params));
					exit();

				$result = $client->reprintLabel($params);//llamamos al métdo que nos interesa con los parámetros

			    if ($result->globalResult->resultCode == 0 && $result->globalResult->resultDescription == 'OK'){
			    	$Guia = $result->labelPDF;
			    	$dir  =  $_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/ESTAFETA/'; 
					$file = $dir.$NamePDF.'.pdf';
					file_put_contents($file, $Guia);

					if (file_exists($file)) {
					    header('Content-Description: File Transfer');
					    header('Content-Type: application/octet-stream');
					    header('Content-Disposition: attachment; filename="'.basename($file).'"');
					    header('Expires: 0');
					    header('Cache-Control: must-revalidate');
						header('Pragma: public');
						
						$response = array('code' => $result->globalResult->resultCode);
						print_r( json_encode($response) );
					}
			    }
			    else{
					$response = array('code' => $result->globalResult->resultCode);
					print_r( json_encode($response) );
			    }
			}
			catch(Exception $e) {
			    echo $e->getMessage();
			}
		}
		else{
			$response = array('code' => 1001);
			print_r( json_encode($response) );
		}
	}

}