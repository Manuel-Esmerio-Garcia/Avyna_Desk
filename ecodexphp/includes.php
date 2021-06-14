<?php 
	define("DROOT", __DIR__ . DIRECTORY_SEPARATOR );
	define("WSDL_TMP", __DIR__ . DIRECTORY_SEPARATOR . "wsdlcache");
	define("OPENSSL_PATH", "C:\OpenSSL-Win64\bin\openssl.exe");
	define("SCHEMAS_CFDI_PATH", DROOT . 'schemas' . DIRECTORY_SEPARATOR . 'cfdi');
	define("SCHEMAS_RETENCIONES_PATH", DROOT . 'schemas' . DIRECTORY_SEPARATOR . 'retenciones');

	
	include_once DROOT . 'lib' . DIRECTORY_SEPARATOR . 'nusoap.php';
	include_once DROOT . 'lib' . DIRECTORY_SEPARATOR . 'class.wsdlcache.php';
	require_once DROOT . 'class' . DIRECTORY_SEPARATOR . 'BaseWS.php';
	require_once DROOT . 'class' . DIRECTORY_SEPARATOR . 'Seguridad.class.php';
	require_once DROOT . 'class' . DIRECTORY_SEPARATOR . 'Cancelacion.class.php';
	require_once DROOT . 'class' . DIRECTORY_SEPARATOR . 'Cliente.class.php';	
	require_once DROOT . 'class' . DIRECTORY_SEPARATOR . 'Repositorio.class.php';
	require_once DROOT . 'class' . DIRECTORY_SEPARATOR . 'Timbrado.class.php';
	include_once DROOT . 'class' . DIRECTORY_SEPARATOR . 'FallaSesion.php';
	include_once DROOT . 'class' . DIRECTORY_SEPARATOR . 'FallaValidacion.php';
	include_once DROOT . 'class' . DIRECTORY_SEPARATOR . 'FallaServicio.php';
	include_once DROOT . 'class' . DIRECTORY_SEPARATOR . 'TimeoutException.php';
	include_once DROOT . 'class' . DIRECTORY_SEPARATOR . 'RestApi.php';
?>