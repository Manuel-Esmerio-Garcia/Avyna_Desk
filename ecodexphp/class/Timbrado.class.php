<?php

class Timbrado extends BaseWS {
	const INTENTOS_TIMBRAR = 3;
	const INTENTOS_OBTENER_TIMBRE = 2;

	// private $url_ws = "http://wsdext.ecodex.com.mx:4040/ServicioTimbrado.svc?wsdl";  
	private $url_ws = "http://pruebas.ecodex.com.mx:2044/ServicioTimbrado.svc?wsdl"; 

	public function __construct($url_ws = FALSE) {
		if ($url_ws) {
			$this->url_ws = $url_ws;
		}

		parent::__construct($this->url_ws);
	}

	public function TimbraXML($ComprobanteXML, $RFC, $TransaccionID, $Token) {

		$data = array(
			"ComprobanteXML" => array(
				"DatosXML" => $ComprobanteXML,
			),
			"RFC" => $RFC,
			"Token" => $Token,
			"TransaccionID" => $TransaccionID,
		);
		return $this->Timbrar($data, self::INTENTOS_TIMBRAR, self::INTENTOS_OBTENER_TIMBRE);
	}

	private function Timbrar($data, $intentos_timbrar, $intentos_recuperar) {

		try
		{
			//Manda a llamar al metodo del web services con todos los datos necesarios
			$res = $this->Call("TimbraXML", $data);

			return $res["ComprobanteXML"]["DatosXML"];

		} catch (TimeoutException $ex) {

			if ($intentos_timbrar > 0) {
				return $this->Timbrar($data, --$intentos_timbrar, $intentos_recuperar);
			}

			throw $ex;

		} catch (FallaValidacion $ex) {

			if ($intentos_timbrar < self::INTENTOS_TIMBRAR && $ex->Numero == 96) {

				while ($intentos_recuperar > 0) {

					try
					{
						return $this->ObtenerTimbrado($data['RFC'], $data['Token'], $data['TransaccionID'], $data['TransaccionID'], NULL);
					} catch (Exception $exr) {
						$intentos_recuperar--;
					}
				}
			}
			throw $ex;
		}
	}

	public function EstatusTimbrado($RFC, $Token, $TransaccionID, $TransaccionOriginal, $UUID) {
		$data = array(
			"RFC" => $RFC,
			"Token" => $Token,
			"TransaccionID" => $TransaccionID,
			"TransaccionOriginal" => $TransaccionOriginal,
			"UUID" => $UUID);

		$res = $this->Call("EstatusTimbrado", $data);
		return $res["Estatus"];
	}

	public function ObtenerTimbrado($RFC, $Token, $TransaccionID, $TransaccionOriginal, $UUID) {
		$data = array("RFC" => $RFC, "Token" => $Token, "TransaccionID" => $TransaccionID,
			"TransaccionOriginal" => $TransaccionOriginal, "UUID" => $UUID);
		$res = $this->Call("ObtenerTimbrado", $data);
		return $res["ComprobanteXML"]["DatosXML"];
	}

	public function ObtenerQRTimbrado($RFC, $Token, $TransaccionID, $UUID) {
		$data = array("RFC" => $RFC, "Token" => $Token, "TransaccionID" => $TransaccionID, "UUID" => $UUID);
		$res = $this->Call("ObtenerQRTimbrado", $data);
		return $res["QR"]["Imagen"];
	}

	/**
	NOTA: Método representativo de cómo sellar un comprobante utilizando OpenSSL.
	Los archivos utilizados son archivos de prueba que el SAT proporcionó. Se recomienda utilizar otro método para consulta de los mismo, ya que la manera
	que este método utiliza no es segura y expone dichos archivos.
	 */
	public function SellarXML($ComprobanteXML, $password = '12345678a', $dir_key_file = DROOT, $name_key_file = '20001000000200001428.key') {
		$path_key_file = $dir_key_file . DIRECTORY_SEPARATOR . $name_key_file;

		$schemaDir;
		$xsdFileName;
		$namespace;
		$xsltCadenaOriginalPath;
		$selloAttr;

		libxml_use_internal_errors(true);
		$xml = new DOMDocument();
		$xml->loadXML($ComprobanteXML);

		$tipoDocumento = $xml->childNodes->item(0)->localName;
		if ($tipoDocumento == "Comprobante") {
			
			$schemaDir = SCHEMAS_CFDI_PATH . DIRECTORY_SEPARATOR;
			$xsdPath = $schemaDir . "cfdv32.xsd";
			$namespace = "http://www.sat.gob.mx/cfd/3";
			$xsltCadenaOriginalPath = $schemaDir . "cadenaoriginal_3_2.xslt";
			$selloAttr = "sello";

		} else if ($tipoDocumento == "Retenciones") {
			$schemaDir = SCHEMAS_RETENCIONES_PATH . DIRECTORY_SEPARATOR;
			$xsdPath = $schemaDir . "retencionpagov1.xsd";
			$namespace = "http://www.sat.gob.mx/esquemas/retencionpago/1";
			$xsltCadenaOriginalPath = $schemaDir . "retenciones.xslt";
			$selloAttr = "Sello";
		} else {
			throw new Exception("Tipo de documento no soportado");
		}

		$Documento = $xml->getElementsByTagNameNS($namespace, $tipoDocumento)->item(0);

		#Valida XML
		if (!$xml->schemaValidate($xsdPath)) {
			$error_message = $this->libxml_display_errors();
			if (!empty($error_message)) {
				throw new Exception($error_message);
			}

		}

		$complementos = array();
		if ($Documento->getElementsByTagNameNS($namespace, 'Complemento')->length > 0) {
			foreach ($Documento->getElementsByTagNameNS($namespace, 'Complemento')->item(0)->childNodes as $key => $complemento) {
				$complementos[$complemento->prefix] = $Documento->getElementsByTagNameNS($namespace, 'Complemento')->item(0)
					->getElementsByTagNameNS($complemento->namespaceURI, $complemento->localName)->item(0);
			}
		}

		foreach ($complementos as $key => $complemento) {
			if (!empty($complemento)) {
				$new = new DomDocument;
				$new->appendChild($new->importNode($complemento, true));
				if (!$new->schemaValidate($schemaDir . $key . '.xsd')) {
					$error_message = $this->libxml_display_errors();
					if (!empty($error_message)) {
						throw new Exception($error_message);
					}

				}
			}
		}

		# Extraer cadena original
		$xslt = new XSLTProcessor();
		$XSL = new DOMDocument();
		$XSL->load($xsltCadenaOriginalPath, LIBXML_NOCDATA);

		$xslt->importStylesheet($XSL);

		$cadenaOriginal = $xslt->transformToXML($Documento);
		if ($cadenaOriginal === FALSE) {
			$error_message = $this->libxml_display_errors();
			if (!empty($error_message)) {
				throw new Exception($error_message);
			}

		}

		$key_pem = sys_get_temp_dir() . DIRECTORY_SEPARATOR . basename($path_key_file) . '.pem';

		if (!file_exists($key_pem)) {
			if (file_exists(OPENSSL_PATH)) {
				exec(OPENSSL_PATH . " pkcs8 -inform DER -in $path_key_file -passin pass:$password -out $key_pem");
			} else {
				throw new Exception(sprintf('El archivo "%s" no existe. Verifique el archivo "%sincludes.php" y asigne la ruta correcta', OPENSSL_PATH, DROOT));
			}

		}

		if (filesize($key_pem) > 0) {
			$priv_key = file_get_contents($key_pem);
			$pkeyid = openssl_pkey_get_private($priv_key);
			openssl_sign($cadenaOriginal, $firma, $pkeyid);

			if (!isset($firma)) {
				return FALSE;
			}

			$Documento->setAttribute($selloAttr, base64_encode($firma));

			return $xml->saveXml();
		}
		return FALSE;
	}

	private function libxml_display_errors() {
		$errors = libxml_get_errors();
		$error_message = "";
		foreach ($errors as $error) {
			$error_message .= $this->libxml_display_error($error);
		}
		libxml_clear_errors();
		return $error_message;
	}

	private function libxml_display_error($error) {
		if ($error->code == 1845) {
			return;
		}

		$return = "";
		switch ($error->level) {
		case LIBXML_ERR_WARNING:
			$return .= "[Warning $error->code]: ";
			break;
		case LIBXML_ERR_ERROR:
			$return .= "[Error $error->code]: ";
			break;
		case LIBXML_ERR_FATAL:
			$return .= "[Fatal Error $error->code]: ";
			break;
		}
		$return .= trim($error->message);

		return $return;
	}
}
?>
