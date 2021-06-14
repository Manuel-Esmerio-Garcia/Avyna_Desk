<?php
class BaseWS {
	const RESPONSE_TIMEOUT = 120;
	protected $client;
	protected $cache;
	protected $proxy;

	function __construct($url_ws) {
		$this->cache = new nusoap_wsdlcache(WSDL_TMP, 86400);
		$wsdl = $this->cache->get($url_ws);
		if (is_null($wsdl)) {
			$wsdl = new wsdl($url_ws, '', '', '', '', 5);
			$this->cache->put($wsdl);
		}

		$this->client = new nusoap_client($wsdl, 'wsdl', '', '', '', '', 0, self::RESPONSE_TIMEOUT);
		$this->proxy = $this->client->getProxy();

		if ($this->client->getError()) {
			throw new Exception("No se pudo acceder al servicio: " . parse_url($url_ws, PHP_URL_PATH));
		}
	}

	public function Log_Conexion() {
		return '<h2>Request</h2><pre>' . htmlspecialchars($this->client->request, ENT_QUOTES) . '</pre>' .
		'<h2>Response</h2><pre>' . htmlspecialchars($this->client->response, ENT_QUOTES) . '</pre>';
	}

	protected function Call($method, $data) {
		$timing = 0;
		try {
			$start = time();
			$res = $this->client->call($method, $data);

			$timing = time() - $start;

			if (isset($res["detail"]["FallaSesion"])) {
				throw new FallaSesion($res["detail"]["FallaSesion"]);
			} elseif (isset($res['detail']['FallaValidacion'])) {
				throw new FallaValidacion($res['detail']['FallaValidacion']);
			} elseif (isset($res['detail']['FallaServicio'])) {
				throw new FallaServicio($res['detail']['FallaServicio']);
			} elseif (isset($res['detail']['ExceptionDetail']['InnerException']['Message'])) {
				$errorMensaje = $res['detail']['ExceptionDetail']['InnerException']['Message'];
				throw new Exception("SOAPException: " . $errorMensaje);
			} else if (isset($res['faultstring'])) {
				$arr = $res['faultstring'];
				$arr = array_values($arr);
				$errorMensaje = $arr[1];
				throw new Exception($errorMensaje);
			} else if (empty($res)) {
				if ($timing >= self::RESPONSE_TIMEOUT) {
					throw new TimeoutException();
				}
				throw new Exception("Error de conexión, verifique que la URL del servicio se encuentre disponible.");
			} else {

				return $res;
			}
		} catch (Exception $ex) {
			if ($ex instanceof TimeoutException || $ex instanceof FallaServicio || $ex instanceof FallaSesion || $ex instanceof FallaValidacion) {
				throw $ex;
			} else if (strpos(strtolower($ex->getMessage()), "maximum execution time") !== false) {
				throw new TimeoutException();
			} else if ($timing >= self::RESPONSE_TIMEOUT) {
				throw new TimeoutException();
			}
			throw $ex;
		}
	}
}
?>