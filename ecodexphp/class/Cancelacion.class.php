<?php

class Cancelacion extends BaseWS {

	// private $url_ws = "http://wsdext.ecodex.com.mx:4040/ServicioCancelacion.svc?wsdl";  
	private $url_ws = "http://pruebas.ecodex.com.mx:2044/ServicioCancelacion.svc?wsdl";  

	public function __construct($url_ws = FALSE) {
		if ($url_ws) {
			$this->url_ws = $url_ws;
		}

		parent::__construct($this->url_ws);
	}

	public function CancelaMultiple($RFC, $Token, $TransaccionID, $UUIDs) {
		$data = array("RFC" => $RFC, "Token" => $Token, "TransaccionID" => $TransaccionID, "ListaCancelar" => $UUIDs);
		$res = $this->Call("CancelaMultiple", $data);
		return $res["Resultado"]["ResultadoCancelacion"];
	}

	public function RecuperarAcuses($RFC, $Token, $TransaccionID, $UUID) {
		$data = array("RFC" => $RFC, "Token" => $Token, "TransaccionID" => $TransaccionID, "UUID" => $UUID);
		$res = $this->Call("RecuperarAcuses", $data);
		return $res;
	}

	public function CancelaOtros($RFCEmisor, $RFCReceptor, $Token, $TransaccionID, $UUID) {
		$data = array("RFCEmisor" => $RFCEmisor, "RFCReceptor" => $RFCReceptor, "Token" => $Token,
			"TransaccionID" => $TransaccionID, "UUID" => $UUID);
		$res = $this->Call("CancelaOtros", $data);
		return $res["Resultado"]["ResultadoCancelacion"];
	}

}

?>
