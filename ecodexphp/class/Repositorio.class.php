<?php
class Repositorio extends BaseWS {

	// private $url_ws = "http://wsdext.ecodex.com.mx:4040/ServicioRepositorio.svc?wsdl"; 
	private $url_ws = "http://pruebas.ecodex.com.mx:2044/ServicioRepositorio.svc?wsdl"; 

	function __construct($url_ws = FALSE) {
		if ($url_ws) {
			$this->url_ws = $url_ws;
		}

		parent::__construct($this->url_ws);
	}

	public function EstatusComprobante($RFC, $Token, $TransaccionID, $TransaccionOriginal, $UUID) {
		$data = array(
			"RFC" => $RFC,
			"Token" => $Token,
			"TransaccionID" => $TransaccionID,
			"TransaccionOriginal" => $TransaccionOriginal,
			"UUID" => $UUID);
		$res = $this->client->call("EstatusComprobante", $data);
		return $res["Estatus"];
	}

	public function ObtenerComprobante($RFC, $Token, $TransaccionID, $TransaccionOriginal, $UUID) {
		$data = array("RFC" => $RFC, "Token" => $Token, "TransaccionID" => $TransaccionID,
			"TransaccionOriginal" => $TransaccionOriginal, "UUID" => $UUID);
		$res = $this->Call("ObtenerComprobante", $data);
		return $res["ComprobanteXML"]["DatosXML"];
	}

	public function ObtenerQR($RFC, $Token, $TransaccionID, $UUID) {
		$data = array("RFC" => $RFC, "Token" => $Token, "TransaccionID" => $TransaccionID, "UUID" => $UUID);
		$res = $this->client->call("ObtenerQR", $data);
		return $res["QR"]["Imagen"];
	}
}
?>
