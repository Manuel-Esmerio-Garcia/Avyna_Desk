<?php

class Seguridad extends BaseWS {

	private $integrador = '2b3a8764-d586-4543-9b7e-82834443f219';
	private $idAltaEmisores = 'DF627BC3-A872-4806-BF37-DBD040CBAC7C';
	private $url_ws = "http://pruebas.ecodex.com.mx:2044/ServicioSeguridad.svc?wsdl";
	// private $integrador = '0aaabbe9-0123-44ee-b5d0-a8305e2bdf99';
	// private $idAltaEmisores = '7A3E13A1-1BD3-4E71-8109-4FED13A7791F';
	// private $url_ws = "http://wsdext.ecodex.com.mx:4040/ServicioSeguridad.svc?wsdl";

	//$data = Array con keys "integrador", "idAltaEmisores" y "url_ws"
	public function __construct(array $data = null) {
		if ($data != null) {
			foreach ($data as $key => $value) {
				if (isset($this->$key)) {
					$this->$key = $value;
				}

			}
		}
		parent::__construct($this->url_ws);
	}

	public function ObtenerToken($RFC, $TransaccionID, $altaEmisor = FALSE) {
		$data = array("RFC" => $RFC, "TransaccionID" => $TransaccionID);
		$res = $this->Call("ObtenerToken", $data);

		if ($altaEmisor) {
			$tohash = $this->integrador . "|" . $this->idAltaEmisores . "|" . $res["Token"];
		} else {
			$tohash = $this->integrador . "|" . $res["Token"];
		}

		return sha1(utf8_encode($tohash));
	}

}
?>
