<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_Guias_Envio extends CI_Controller {


    public function __construct() 
    {
        parent::__construct();

        if(!isset($_SESSION['Avyna'])){
        	redirect('controller_Login');
        }

		$this->load->model('Guias_Envio_Model', 'guias');
		$this->load->model('Empaques_Model','empaque');
	}

	public function index()
	{
	  	$Titulo = array('PageTitle' => 'Guias Envio');

	    $this->load->view('Componentes/Header', $Titulo);    
	    $this->load->view('Manejo/GuiasEnvio/GuiasEnvio');
	    $this->load->view('Componentes/Footer', $Titulo);
	}

	public function getGuiaDescripcion()
	{
		$data = $this->input->post();
		$info['GuiaDescripcion'] = $this->guias->getGuiaDescripcion($data['ID']);

		if ($info['GuiaDescripcion'] != null)
		{
			$info['DireccionGuia'] = $this->guias->getDireccionGuia($info['GuiaDescripcion'][0]['ID']);
		}

		print_r(json_encode($info));
	}

	public function PrintGlobalLabel(){
		$info = $this->input->post();

		if (strlen($info['Guia']) === 22) {
			$this->PrintEstafeta($info);
		}else if (strlen($info['Guia']) === 12) {
		// }else{
			$this->PrintAPMP($info);
		}
	}

	public function PrintAPMP($info){
		$NamePDF = 'guiaprintAMPM';

		$data = array('Guia' => $info['Guia'], 'TipoImpresion' => 2);
		// Prueba //
		// $result = $this->CallAPI("POST","http://qaptpak.grupoampm.com/ws/api/Documentacion/EtiquetaEnvio", json_encode($data));
		// Productivo
		$result = $this->CallAPI("POST","https://tpak.grupoampm.com/ws/api/Documentacion/EtiquetaEnvio", json_encode($data));

		if (!empty($result)) {
			if (strlen($result) >= 8000) {
				$Guia = $result;
	
				$dir  = $_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/ESTAFETA/'; 
				$file = $dir.$NamePDF.'.pdf';
				file_put_contents($file, $Guia);
	
				// $archivo = fopen($dir.$NamePDF.'_'.$info['Guia'].'.pdf',"w+b");
				// fwrite($archivo, $Guia);
				// fflush($archivo);
				// fclose($archivo);
	
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
			'Content-Type: application/json',
		];
		
		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

		$result = curl_exec($curl);

		curl_close($curl);

		return $result;
	}

	public function PrintEstafeta($info){

		//$NumGuia = $info['Guia'];
		$NamePDF = 'guiaprint';

		$Estafeta['GuiasEnvios'] 		= $this->empaque->Get_GuiasEnvios($info['ID']);
		$Estafeta['GuiasDescripcion'] 	= $this->empaque->Get_GuiasDescripcion($info['ID']);
		$Estafeta['Origen'] 			= $this->empaque->Get_DireccionEnvioGuia($info['ID'],'origen');
		$Estafeta['Destino'] 			= $this->empaque->Get_DireccionEnvioGuia($info['ID'],'destino');

		if ($Estafeta['GuiasEnvios'] != null)
		{

			try {
			    $opts = array(
			        'http' => array(
			            'user_agent' => 'PHPSoapClient'
			        )
			    );
			    $context = stream_context_create($opts);

			    $wsdlUrl = 'https://label.estafeta.com/EstafetaLabel20/services/EstafetaLabelWS?wsdl';
			    $soapClientOptions = array(
			        'stream_context' => $context,
			        'cache_wsdl' => WSDL_CACHE_NONE
			    );

			    $client 		 = new SoapClient($wsdlUrl, $soapClientOptions);

			    	$params = array(
					  "customerNumber" => $Estafeta['GuiasEnvios'][0]['customerNumber'],
					  "login" => $Estafeta['GuiasEnvios'][0]['login'],
					  "paperType" => $Estafeta['GuiasEnvios'][0]['paperType'],
					  "password" => $Estafeta['GuiasEnvios'][0]['password'],
					  "quadrant" => $Estafeta['GuiasEnvios'][0]['quadrant'],
					  "reprintLabelDescriptionList" => array(
					  	'aditionalInfo' => $Estafeta['GuiasDescripcion'][0]['aditionalInfo'],
					  	'content' => $Estafeta['GuiasDescripcion'][0]['content'],
					  	'contentDescription' => $Estafeta['GuiasDescripcion'][0]['contentDescription'],
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
					  "reprintLabelDescriptionListCount" => $Estafeta['GuiasEnvios'][0]['labelDescriptionListCount'],
					  "suscriberId" => $Estafeta['GuiasEnvios'][0]['suscriberId'],
					  "valid" => $Estafeta['GuiasEnvios'][0]['valid'],
					);

			    $result = $client->reprintLabel($params);//llamamos al métdo que nos interesa con los parámetros

			    if ($result->globalResult->resultCode == 0 && $result->globalResult->resultDescription == 'OK')
			    {
			    	$Guia = $result->labelPDF;
			    	$binary = $Guia;

			    	$decoded = $Guia;
			    	$dir  =  $_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk/ESTAFETA/'; 
					$file = $dir.$NamePDF.'.pdf';
					file_put_contents($file, $decoded);

					if (file_exists($file)) {
					    header('Content-Description: File Transfer');
					    header('Content-Type: application/octet-stream');
					    header('Content-Disposition: attachment; filename="'.basename($file).'"');
					    header('Expires: 0');
					    header('Cache-Control: must-revalidate');
					    header('Pragma: public');
					    //header('Content-Length: ' . filesize($file));

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

?>