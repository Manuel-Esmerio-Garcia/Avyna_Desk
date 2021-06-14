<?php

class LeerCFDI {

	/**
	 * Namespaces
	 */
	private $namespaces;

	/**
	 * Archivo XML
	 */
	private $xml;

	/**
	 * Serie del CFDI
	 */
	private $serie;

	/**
	 * Folio del CFDI
	 */
	private $folio;

	/**
	 * RFC del emisor
	 */
	private $rfcEmisor;

	/**
	 * RFC del receptor
	 */
	private $rfcReceptor;

	/**
	 * Fecha del CFDI
	 */
	private $fecha;

	/**
	 * Total del CFDI
	 */
	private $total;

	/**
	 * Tipo de comprobante
	 */
	private $tipoComprobante;

	/**
	 * UUID del CFDI
	 */
	private $uuid;

	/**
	 * archivoXML Ruta del archivo XML
	 */
	function cargaXml($archivoXML) {

		if (file_exists($archivoXML)) {
			libxml_use_internal_errors(true);
			$this->$xml = new SimpleXMLElement($archivoXML, null, true);

			print_r($this->$xml);

			$this->$namespaces = $this->$xml->getNamespaces(true);
		} else {
			throw new Exception("Error al cargar archivo XML, verifique que el archivo exista.", 1);
		}

	}

	/**
	 * Obtener el RFC del Emisor
	 */
	function rfcEmisor() {

		foreach ($this->xml->xpath('//cfdi:Comprobante//cfdi:Emisor') as $emisor) {
			$this->rfcEmisor = $emisor['rfc'] != "" ? $emisor['rfc'] : $emisor['Rfc'];
		}

		return $this->rfcEmisor;
	}

	/**
	 * Obtener el RFC del Receptor
	 */
	function rfcReceptor() {

		foreach ($this->xml->xpath('//cfdi:Comprobante//cfdi:Receptor') as $receptor) {
			$this->rfcReceptor = $receptor['rfc'] != "" ? $receptor['rfc'] : $receptor['Rfc'];
		}

		return $this->rfcReceptor;
	}

	/**
	 * Obtener el RFC  del CFDI
	 */
	function total() {

		foreach ($this->xml->xpath('//cfdi:Comprobante') as $comprobante) {
			$this->total = $comprobante['total'] != "" ? $comprobante['total'] : $comprobante['Total'];
		}
		return $this->total;
	}

	/**
	 * Obtener la serie del CFDI
	 */
	function serie() {

		foreach ($this->xml->xpath('//cfdi:Comprobante') as $comprobante) {
			$this->serie = $comprobante['serie'] != "" ? $comprobante['serie'] : $comprobante['Serie'];
		}

		return $this->serie;
	}

	/**
	 * Obtener elfolio del CFDI
	 */
	function folio() {

		foreach ($this->xml->xpath('//cfdi:Comprobante') as $comprobante) {
			$this->folio = $comprobante['folio'] != "" ? $comprobante['folio'] : $comprobante['Folio'];
		}

		return $this->folio;
	}

	/**
	 * Obtener el la fecha del CFDI
	 */
	function fecha() {

		foreach ($this->xml->xpath('//cfdi:Comprobante') as $comprobante) {
			$this->fecha = $comprobante['fecha'] != "" ? $comprobante['fecha'] : $comprobante['Fecha'];
		}

		return $this->fecha;
	}

	/**
	 * Obtener el tipo del comprobante del  CFDI (Ingreso o Egreso);
	 */
	function tipoComprobante() {

		foreach ($this->$xml->xpath('//cfdi:Comprobante') as $comprobante) {
			$this->$tipoComprobante = $comprobante['tipoDeComprobante'] != "" ? $comprobante['tipoDeComprobante'] : $comprobante['TipoDeComprobante'];
		}

		if (strcmp(strtolower($this->$tipoComprobante), 'ingreso') == 0 || strcmp(strtolower($this->$tipoComprobante), 'i') == 0) {
			$this->$tipoComprobante = "I";
		} else {
			$this->$tipoComprobante = "E";
		}

		return $this->$tipoComprobante;
	}

	/**
	 * Obtener el UUID de la factura
	 */
	function uuid() {

		$this->$xml->registerXPathNamespace('t', $this->$namespaces['tfd']);

		foreach ($this->$xml->xpath('//t:TimbreFiscalDigital') as $tfd) {
			$this->$uuid = "{$tfd['UUID']}";
		}

		return $this->$uuid;
	}

}

?>