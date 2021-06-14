<?php
class Cliente extends BaseWS {

	private $url_ws = "http://wsdext.ecodex.com.mx:4040/ServicioClientes.svc?wsdl";  
	// private $url_ws = "http://pruebas.ecodex.com.mx:2044/ServicioClientes.svc?wsdl"; 

	public function __construct($url_ws = FALSE) {
		if ($url_ws) {
			$this->url_ws = $url_ws;
		}

		parent::__construct($this->url_ws);
	}

	public function EstatusCuenta($RFC, $Token, $TransaccionID) {
		$data = array('RFC' => $RFC, 'Token' => $Token, 'TransaccionID' => $TransaccionID);
		$res = $this->Call('EstatusCuenta', $data);

		$results = array(
			'assigned' => $res['Estatus']['TimbresAsignados'],
			'remaining' => $res['Estatus']['TimbresDisponibles'],
			'used' => $res['Estatus']['TimbresAsignados'] - $res['Estatus']['TimbresDisponibles'],
			'startDate' => $res['Estatus']['FechaInicio'],
			'endDate' => $res['Estatus']['FechaFin'],
			'description' => $res['Estatus']['Descripcion'],
		);
		return $results;
	}

	public function Registrar($RFCIntegrador, $RFCEmisor, $RazonSocialEmisor, $CorreoElectronicoEmisor, $Token, $TransaccionID) {
		$Emisor = array(
			'RFC' => $RFCEmisor,
			'RazonSocial' => $RazonSocialEmisor,
			'CorreoElectronico' => $CorreoElectronicoEmisor,
		);
		$data = array('Emisor' => $Emisor, 'RfcIntegrador' => $RFCIntegrador, 'Token' => $Token,
			'TransaccionID' => $TransaccionID);
		$res = $this->Call('Registrar', $data);
		return $res['Respuesta'];
	}

	public function AsignacionTimbres($RFC, $TimbresAsignar, $Token, $TransaccionId) {
		$data = array('RFC' => $RFC, 'TimbresAsignar' => $TimbresAsignar, 'Token' => $Token,
			'TransaccionId' => $TransaccionId);
		$res = $this->Call('AsignacionTimbres', $data);
		return $res;
	}
}
?>
