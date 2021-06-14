<?php
class RestApi {
	private $baseAdress;
	const ACTION_TOKEN = '/Token?version=2';
	const GRAND_TYPE = 'authorization_token';
	const ACTION_DOCUMENTOS = '/api/Documentos';
	const ACTION_CERTIFICADOS_CLAVE = '/api/Certificados/Clave';
	const ID_INTEGRADOR = '2b3a8764-d586-4543-9b7e-82834443f219';
	private $verboseLog;

	public function __construct($serviceURI = 'https://pruebasapi.ecodex.com.mx') {
		$this->baseAdress = $serviceURI;
	}

	public function GetToken($rfc) {
		$data = array('rfc' => $rfc, 'grant_type' => self::GRAND_TYPE);
		$res = $this->CallAPI("POST", $this->baseAdress . self::ACTION_TOKEN, $data);
		return json_decode($res);
	}

	public function GetTokenFileGet($rfc) {
		$data = array('rfc' => $rfc, 'grant_type' => self::GRAND_TYPE);
		$res = $this->CallApiFileGet("POST", $this->baseAdress . self::ACTION_TOKEN, $data);
		return json_decode($res);
	}

	public function GetDocumentos($token, $limit = 100) {
		$url = $this->baseAdress . self::ACTION_DOCUMENTOS;
		$res = $this->CallAPI("GET", $url, array('limit' => $limit), $token);
		return json_decode($res);
	}

	public function GetDocumento($token, $hash) {
		$url = sprintf("%s%s/%s", $this->baseAdress, self::ACTION_DOCUMENTOS, $hash);
		$res = $this->CallAPI("GET", $url, FALSE, $token);
		if (@simplexml_load_string($res) !== FALSE) {
			return $res;
		}
		return json_decode($res);
	}

	public function GetDocumentosFileGet($token, $limit = 100) {
		$url = $this->baseAdress . self::ACTION_DOCUMENTOS;
		$res = $this->CallApiFileGet("GET", $url, array('limit' => $limit), $token);
		return json_decode($res);
	}

	public function GetDocumentoFileGet($token, $hash) {
		$url = sprintf("%s%s/%s", $this->baseAdress, self::ACTION_DOCUMENTOS, $hash);
		$res = $this->CallApiFileGet("GET", $url, FALSE, $token);
		if (@simplexml_load_string($res) !== FALSE) {
			return $res;
		}
		return json_decode($res);
	}

	public function GetClaveCertificado($token) {
		$res = $this->CallAPI("GET", $this->baseAdress . self::ACTION_CERTIFICADOS_CLAVE, FALSE, $token);
		return json_decode($res);
	}

	public function GetClaveCertificadoFileGet($token) {
		$res = $this->CallApiFileGet("GET", $this->baseAdress . self::ACTION_CERTIFICADOS_CLAVE, FALSE, $token);
		return json_decode($res);
	}

	public function Log_Conexion() {
		if (!empty($this->verboseLog)) {
			return "Información de conexión:<pre>" . htmlspecialchars($this->verboseLog) . "</pre>";
		}

		return NULL;
	}

	private function CallAPI($method, $url, $data = FALSE, $token = FALSE) {
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_VERBOSE, TRUE);
		$verbose = fopen('php://temp', 'rw+');
		curl_setopt($curl, CURLOPT_STDERR, $verbose);
		switch ($method) {
		case "POST":
			curl_setopt($curl, CURLOPT_POST, 1);

			if ($data) {
				curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
			}

			break;
		case "DELETE":
			curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");
			if ($data) {
				curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
			}

			break;
		default:
			if ($data) {
				$url = sprintf("%s?%s", $url, http_build_query($data));
			}

		}

		// Authentication:
		if ($token) {
			$headers = array(sprintf("Authorization: %s %s", $token->token_type, $token->access_token), sprintf("X-Auth-Token: %s", sha1(self::ID_INTEGRADOR . "|" . $token->service_token)));
			curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
		}

		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		$protocol = parse_url($url, PHP_URL_SCHEME);
		if (strtolower($protocol) == 'https') {
			curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
			curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
		}

		$result = curl_exec($curl);

		rewind($verbose);
		$this->verboseLog = stream_get_contents($verbose);

		curl_close($curl);

		return $result;
	}

	private function CallApiFileGet($method, $url, $data = FALSE, $token = FALSE) {
		$protocol = 'http';
		$opts = array($protocol => array(
			'method' => $method,
			'header' => 'Content-type: application/x-www-form-urlencoded',
			'ignore_errors' => TRUE,
		),
		);

		if ($data) {
			$opts[$protocol]['content'] = http_build_query($data);
		}

		if ($token) {
			$opts[$protocol]['header'] .=
			sprintf("\r\nAuthorization: %s %s", $token->token_type, $token->access_token) .
			sprintf("\r\nX-Auth-Token: %s", sha1(self::ID_INTEGRADOR . "|" . $token->service_token));
		}

		$context = stream_context_create($opts);

		$result = file_get_contents($url, false, $context);

		$this->verboseLog = implode("\r\n", $http_response_header);

		return $result;
	}
}
?>