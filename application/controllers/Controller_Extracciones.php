<?php defined('BASEPATH') OR exit('No direct script access allowed');

date_default_timezone_set('America/Mexico_City');

ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

class Controller_Extracciones extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		if(!isset($_SESSION['Avyna'])) redirect('controller_Login');
		$this->load->model("Extracciones_Model","extracciones");
		$this->load->model("Bodega_Model","bodega");
		$this->load->model("Distribuidores_Model","distribuidores"); 
		$this->load->model("Ventas_Model","ventas");
		$this->load->model("Producto_Model","catalogo");
		$this->load->model("Login_Model","login");
		$this->load->model("Fetch_Model","fetch");

		$this->load->library('encryption');
	}

	public function index()
	{
		$Titulo = array('PageTitle' => 'Extracciones');

		$data['Extracciones']  = $this->bodega->getBodega();
		$data['Distribuidor']  = $this->distribuidores->getDistribuidores();

		$Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                      	 'pass' 	=>  $_SESSION['Avyna'][0]['Password']);

	    // Refrescar Permisos e información del usuario //
	    $Session = $this->login->signIn($Usuario);

	    if ($Session != null){  
	      	// Cargar Vista Inventario //
	    	$this->load->view('Componentes/Header', $Titulo); 
			$this->load->view('Operaciones/Extracciones',$data);
			$this->load->view('Componentes/Footer');
	    }
	    else{
	      	// Cerrar Sesión //
	      	$this->cerrarSesion($Usuario);
	    }
	}

	// Obtener Informacion Extracciones By IdSucursal //
	public function getInfoExtracciones()
	{
		$data = $this->input->post();
		$info['Extraccion'] = $this->extracciones->getExtraccionByIdSucursal($data['idSucursal']);
		$info['Sucursal']   = $this->bodega->getBodegaById($data['idSucursal']);
		print_r(json_encode($info));
	}

	// Obtener Detalle Extracción //
	public function getDetalleExtraccion()
	{
		$data = $this->input->post();
		$info = $this->extracciones->getDetalleExtraccion($data['idVenta']);
		print_r(json_encode($info));
	}

	public function getIDEncryption(){
		$nonceValue = 'DCA37CDF0DD1E2450A32275FDC030D7F';// use nonce that generated while using OAuth.
		$data = $this->input->post();

		$output = $this->encryption->encrypt($data['idVenta'],$nonceValue);

		print_r($output);
	}

































































// public function pullApart(){
// 	global $indexSubpedido, $indexCantProdSubpedido, $listSubpedidos, $listVentasMenudeo;

// 	$listVentasMenudeo = $this->getVentasMenudeoRestante();

// 	if (count($listVentasMenudeo) != 0) {

// 		$listResult = $this->getValidateRestantesCompletos($listVentasMenudeo);

// 		if ($listResult != false) {

// 			$subpedidosList = array('ID' => $indexSubpedido,
// 											'idVentaMenudeo' => $listVentasMenudeo[$listResult['position']]['ID'],
// 											'Cantidad' => 250,
// 											'Restante' => 250);

// 			array_push($listSubpedidos, $subpedidosList);

// 			$listVentasMenudeo[$listResult['position']]['Restantes'] =  intval($listVentasMenudeo[$listResult['position']]['Restantes']) - 250;
// 			$indexSubpedido ++;
// 			$indexCantProdSubpedido = 250;
// 			$this->pullApart();

// 		}else{
// 			for ($i=0; $i < count($listVentasMenudeo); $i++) { 
// 				if ($listVentasMenudeo[$i]['Restantes'] <= $indexCantProdSubpedido) {

// 					$subpedidosList = array('ID' => $indexSubpedido,
// 											'idVentaMenudeo' => $listVentasMenudeo[$i]['ID'],
// 											'Cantidad' => $listVentasMenudeo[$i]['Restantes'],
// 											'Restante' => $listVentasMenudeo[$i]['Restantes']);

// 					array_push($listSubpedidos, $subpedidosList);

// 					$indexCantProdSubpedido -= intval($listVentasMenudeo[$i]['Restantes']);
// 					$listVentasMenudeo[$i]['Restantes'] -= intval($listVentasMenudeo[$i]['Restantes']);
// 				}
// 			}

// 			$indexSubpedido++;
// 			$indexCantProdSubpedido = 250;
// 			$this->pullApart();
// 		}

// 	}else{
// 		return;
// 	}
// }

public function pullApart(){
	global $indexSubpedido, $indexCantProdSubpedido, $listSubpedidos, $listVentasMenudeo;

	$listVentasMenudeo = $this->getVentasMenudeoRestante();

	if (count($listVentasMenudeo) != 0) {

		$listResult = $this->getValidateRestantesCompletos($listVentasMenudeo);

		$cantRestantes = $this->getCantRestantes($listVentasMenudeo);

		if ($listResult != false) {

			//////// Agregar 30 Adicional //////////
			if ($cantRestantes <= 280) {
				$subpedidosList = array('ID' => $indexSubpedido,
											'idVentaMenudeo' => $listVentasMenudeo[$listResult['position']]['ID'],
											'Cantidad' => $cantRestantes,
											'Restante' => $cantRestantes);

				array_push($listSubpedidos, $subpedidosList);

				$listVentasMenudeo[$listResult['position']]['Restantes'] =  intval($listVentasMenudeo[$listResult['position']]['Restantes']) - $cantRestantes;
				
			}else{
				$subpedidosList = array('ID' => $indexSubpedido,
											'idVentaMenudeo' => $listVentasMenudeo[$listResult['position']]['ID'],
											'Cantidad' => 250,
											'Restante' => 250);

				array_push($listSubpedidos, $subpedidosList);

				$listVentasMenudeo[$listResult['position']]['Restantes'] =  intval($listVentasMenudeo[$listResult['position']]['Restantes']) - 250;
			}
			
			$indexSubpedido ++;
			$indexCantProdSubpedido = 250;
			$this->pullApart();

		}else{
			//////// Agregar 30 Adicional //////////
			($cantRestantes <= 280) ? $indexCantProdSubpedido = $cantRestantes : $indexCantProdSubpedido = 250;

			for ($i=0; $i < count($listVentasMenudeo); $i++) { 
				if ($listVentasMenudeo[$i]['Restantes'] <= $indexCantProdSubpedido) {

					$subpedidosList = array('ID' => $indexSubpedido,
											'idVentaMenudeo' => $listVentasMenudeo[$i]['ID'],
											'Cantidad' => $listVentasMenudeo[$i]['Restantes'],
											'Restante' => $listVentasMenudeo[$i]['Restantes']);

					array_push($listSubpedidos, $subpedidosList);

					$indexCantProdSubpedido -= intval($listVentasMenudeo[$i]['Restantes']);
					$listVentasMenudeo[$i]['Restantes'] -= intval($listVentasMenudeo[$i]['Restantes']);
				}
			}

			$indexSubpedido++;
			$indexCantProdSubpedido = 250;
			$this->pullApart();
		}

	}else{
		return;
	}
}

public function getVentasMenudeoRestante(){
	global $listVentasMenudeo;
	$responseList = [];
	for ($i=0; $i < count($listVentasMenudeo); $i++) { 
		if (intval($listVentasMenudeo[$i]['Restantes']) > 0) {
			array_push($responseList, $listVentasMenudeo[$i]);
		}
	}

	return $responseList;
}

public function getValidateRestantesCompletos($listVentasMenudeoParam){
	for ($i=0; $i < count($listVentasMenudeoParam); $i++) { 
		if (intval($listVentasMenudeoParam[$i]['Restantes']) > 250) {
			return array('position' => $i);
		}
	}

	return false;
}

public function getCantRestantes($list){
	$Cant = 0;
	for ($i=0; $i < count($list); $i++) { 
		if (intval($list[$i]['Restantes']) > 0) {
			$Cant += intval($list[$i]['Restantes']);
		}
	}

	return $Cant;
}


public function addSubpedido($idVenta){
	global $CantidadTotal, $listAllInfo;

	$listSubpedidosRestantes = $this->getSubpedidosRestantes();

	if (count($listSubpedidosRestantes) != 0) {
		
		//////// Agregar Subpedidos   ///////////
		$subpedidos = array(
			'idVenta' => $idVenta,
			'Cantidad_productos' => $CantidadTotal,
			'Fecha_hora_empaque' => date("Y-m-d H:i:s"),
			'Status' => 'Pendiente'
		);

		$idSubpedido = $this->extracciones->addSubpedido($subpedidos);
		for ($i=0; $i < count($listSubpedidosRestantes); $i++) { 

			$insertBatch = [];
			$restante = $listSubpedidosRestantes[$i]['Restante'];
			$listDetalleVentaRestantes = $this->getDetalleVentaRestantes($listSubpedidosRestantes[$i]['idVentaMenudeo']);

			for ($j=0; $j < count($listDetalleVentaRestantes); $j++) { 

				if ($listDetalleVentaRestantes[$j]['Restante'] >= $restante) {
					$detalleSubpedidoAnt = array(
						'idSubpedido' => $idSubpedido,
						'idDetalle_venta_menudeo_temp' => $listDetalleVentaRestantes[$j]['ID'],
						'Cantidad' => $restante,
						'Status' => 'Pendiente'
					);

					array_push($insertBatch, $detalleSubpedidoAnt);
					$this->extracciones->addDetalleSubpedido($insertBatch);			
					$insertBatch = [];

					$listDetalleVentaRestantes[$j]['Restante'] -= $restante;
					$restante = 0;
					break;

				}else{

					$detalleSubpedidoAnt = array(
						'idSubpedido' => $idSubpedido,
						'idDetalle_venta_menudeo_temp' => $listDetalleVentaRestantes[$j]['ID'],
						'Cantidad' => $listDetalleVentaRestantes[$j]['Restante'],
						'Status' => 'Pendiente'
					);

					array_push($insertBatch, $detalleSubpedidoAnt);

					// $this->extracciones->addDetalleSubpedido($detalleSubpedidoAnt);

					$restante -= intval($listDetalleVentaRestantes[$j]['Restante']);
					$listDetalleVentaRestantes[$j]['Restante'] = 0;
				}
			}

			$this->extracciones->addDetalleSubpedido($insertBatch);			
			$insertBatch = [];

			$listSubpedidosRestantes[$i]['Restante'] = 0;
			$this->updateArrayGlobal($listDetalleVentaRestantes);
			
			
		}

		$this->addSubpedido($idVenta);

	}else{
		return;
	}
}


public function getSubpedidosRestantes(){
	global $listSubpedidos, $indexSub, $indexSubpedido, $CantidadTotal;
	$arraySubpedido = [];
	if ($indexSub < $indexSubpedido) {

		for ($i=0; $i < count($listSubpedidos); $i++) { 
			if ($listSubpedidos[$i]['ID'] == $indexSub && $listSubpedidos[$i]['Restante'] > 0) {
				array_push($arraySubpedido, $listSubpedidos[$i]);
			}
		}

		$CantidadTotal = array_sum(array_column($arraySubpedido, 'Cantidad'));
	}

	$indexSub++;

	return $arraySubpedido;
}

public function getDetalleVentaRestantes($idVentaMenudeo){
	global $listAllInfo;

	$arrayInfo = [];

	for ($i=0; $i < count($listAllInfo); $i++) { 
		if ($listAllInfo[$i]['idVenta_menudeo'] == $idVentaMenudeo && $listAllInfo[$i]['Restante'] > 0) {
			array_push($arrayInfo, $listAllInfo[$i]);
		}
	}

	return $arrayInfo;
}

public function updateArrayGlobal($listUpdated){
	global $listAllInfo;
	for ($i=0; $i < count($listUpdated); $i++) { 
		$found_key = array_search($listUpdated[$i]['ID'], array_column($listAllInfo, 'ID'));
		$listAllInfo[$found_key]['Restante'] = $listUpdated[$i]['Restante'];
	}
}

public function validateCategoria($data){
	$output = array();

	$getInfoCategoria = $this->extracciones->getInfoCategoria($data['idVenta'], $data['idSucursal']);

	$filter = array_filter($getInfoCategoria['product'], function ($var) {
		return ($var['validate'] == '0');
	});

	$filterPromo = array_filter($getInfoCategoria['promo'], function ($var) {
		return ($var['validate'] == '0');
	});

	if (count($filter) == 0 && count($filterPromo) == 0) {
		$output = array('response' => 1,
						'code' => 200,
						'message' => "Categoria 1 con suficientes existencias.");
		return $output;
	}else{

		$output = array('response' => 0,
						'code' => 300,
						'message' => "Categoria 1 NO cuenta con suficientes existencias.",
						'info' => []);

		foreach ($filter as $key => $value) {

			$locationDestination = $this->extracciones->getLocationDestino($value['idInventario'],$data['idSucursal']);
			$locationOrigin 	 = $this->extracciones->getLocationOrigen($value['idInventario'], $data['idSucursal']);

			$list   = array(
				'idInventario' => $value['idInventario'],
				'idCatalogo' => $value['idCatalogo'],
				'Producto' => $value['Producto'],
				'Codigo' => $value['Codigo'],
				'Cantidad_picking' => $value['Cantidad_Picking'],
				'listLocationDestination' => $locationDestination,
				'listLocationOrigin' => $locationOrigin
			);

			array_push($output['info'], $list);
		}

		$Products = array_column($output['info'], 'idCatalogo');

		foreach ($filterPromo as $key => $value) {

			if (!in_array($value['idCatalogo'], $Products)) {

				$locationDestination = $this->extracciones->getLocationDestino($value['idInventario'],$data['idSucursal']);
				$locationOrigin 	 = $this->extracciones->getLocationOrigen($value['idInventario'], $data['idSucursal']);
				
				$getInventario 	 = $this->extracciones->getInventario($value['idCatalogo'], $data['idSucursal']);

				$list   = array(
					'idInventario' => $getInventario[0]['ID'],
					'idCatalogo' => $value['idCatalogo'],
					'Producto' => $value['Producto'],
					'Codigo' => $value['Codigo'],
					'Cantidad_picking' => $value['Cantidad_Picking'],
					'listLocationDestination' => $locationDestination,
					'listLocationOrigin' => $locationOrigin
				);

				array_push($output['info'], $list);
			}
		}

		return $output;
	}
}

public function addMovimiento(){
	$output = array();
	$contador = 0;
	$data = $this->input->post();
	$info = json_decode($data['data']);

	// foreach ($info as $key => $value) {
	// 	$getValidateOrigin = $this->extracciones->getValidateOrigin($value->idLocationOrigin, $value->idCatalogo);

	// 	if (count($getValidateOrigin) > 0) {
	// 		if (intval($getValidateOrigin[0]['ExistenciasTotal']) >= intval($value->CantMove) ) {
	// 			$contador++;					
	// 		}else{
	// 			$output = array('response' => 2,
	// 					'code' => 501,
	// 					'message' => "No cuenta con suficiente inventario para surtir la cantidad ".intval($value->CantMove).", ya que las existencias disponibles son: ".intval($getValidateOrigin[0]['ExistenciasTotal']).". \n
	// 								 El producto sin existencias es: ".$value->Producto." con el N° ".$value->idCatalogo.".");
	// 			break;
	// 		}
	// 	}else{
	// 		$output = array('response' => 3,
	// 					'code' => 500,
	// 					'message' => "El producto: ".$value->Producto." , No cuenta con detalle inventario.");
	// 		break;
	// 	}
	// }


	// if ($contador == count($info)) {

		foreach ($info as $key => $value) {
			$movimientos_inventario_ops = array(
				'idInventario' => $value->idInventario,
				'idLocacion_origen' => $value->idLocationOrigin,
				'idLocacion_destino' => $value->idLocationDestination,
				'Cantidad_mov' => $value->CantMove,
				'idUsuario' => $_SESSION['Avyna'][0]['ID'],
				'Fecha_hora_registro' => date("Y-m-d"),
				'Status' => 'Pendiente');

				// Agregar Movimientos
				$this->extracciones->addMoveInventary($movimientos_inventario_ops);
		}

		$output = array('response' => 1,
						'code' => 200,
						'message' => "Movimientos agregados y en espera.");
	// }

	print_r(json_encode($output));
}

	// Generar Extracción //
	public function getDetailSellTemp(){
		global $indexSubpedido, $indexCantProdSubpedido, $listSubpedidos, $listVentasMenudeo, $indexSub, $listAllInfo, $CantidadTotal;

		$nonceValue = 'DCA37CDF0DD1E2450A32275FDC030D7F';// use nonce that generated while using OAuth.
		$data = $this->input->post();

		$validateExtrac = $this->extracciones->validate31032020($data['idVenta']);

		if ($data['idDistribuidor'] == '1967' && ($validateExtrac[0]['idSalon'] == 0 || $validateExtrac[0]['idSalon'] == null)) {
			print_r(1500);
			exit();
		}else{

			//////  Validate Locacion Categoria 1 /////////

			$getInfoCategoria = $this->validateCategoria($data);

			if ($getInfoCategoria['response'] == 1 && $getInfoCategoria['code'] == 200) {

				// Solo elimina la info de detalle ventas menudeo temp en caso que encuentre resultados
				// $info = $this->extracciones->getDetailSellTemp($data['idVenta']);

				$info = $this->extracciones->getDetalleVentaMenudeoTempByIdVenta($data['idVenta']);

				if (!empty($info)){

					$Des_Existencias = $this->extracciones->addExistencias($info,$data['idVenta']);
					
					if ($Des_Existencias == 1){

						$Catalogo  = $this->extracciones->sumCantCatalogo($data['idVenta']);
						$Promocion = $this->extracciones->sumCantPromociones($data['idVenta']);
						$Oferta    = $this->extracciones->sumCantOferta($data['idVenta']);

						$resultValidate = $this->validateExtraccion($Catalogo, $Promocion, $Oferta, $data['idVenta'],$data['idSucursal'],$data['idDistribuidor']);

						if (intval($resultValidate) == 9999) {

							//////////////////////////////////////////////////////////////////
							///////////////   Proceso de subpedidos para picking    //////////
							//////////////////////////////////////////////////////////////////

							$sumCantidadSubpedidos = $this->extracciones->getSumSubpedidos($data['idVenta']);

							if(intval($sumCantidadSubpedidos[0]['Cantidad']) > 280){

								$listVentasMenudeo    = $this->extracciones->getCantidadVentasMenudeo($data['idVenta']);
								$listAllInfo   		  = $this->extracciones->getDetalleVentaMenudeoTempByIdVenta($data['idVenta']);

								$listSubpedidos = [];
								$indexSubpedido = 0;
								$indexSub = 0;
								$CantidadTotal = 0;
								$indexCantProdSubpedido = 250;

								$this->pullApart();
								$this->addSubpedido($data['idVenta']);

							}
							else{
								//////////////////////////////////////// Subpedido con menos de 250 productos ///////////////////////////////////////////////

								$listSubpedidosTemp = $this->extracciones->getDetalleVentaMenudeoTempByIdVenta($data['idVenta']);

								$subpedidos = array(
									'idVenta' => $data['idVenta'],
									'Cantidad_productos' => intval($sumCantidadSubpedidos[0]['Cantidad']),
									'Fecha_hora_empaque' => date("Y-m-d H:i:s"),
									'Status' => 'Pendiente'
								);

								$sumCount = 0;
								$ContDetails = 1;

								$listBatchDetalle = [];

								///////////////////////////////////////////////////
								////////////   Insert Info Extracción /////////////
								///////////////////////////////////////////////////

								$idSubpedido = $this->extracciones->addSubpedido($subpedidos);

								for ($i=0; $i < count($listSubpedidosTemp) ; $i++) { 
									if (intval($listSubpedidosTemp[$i]['Cantidad'] > 0)) {

										$detalleSubpedidoAnt = array(
											'idSubpedido' => $idSubpedido,
											'idDetalle_venta_menudeo_temp' => $listSubpedidosTemp[$i]['ID'],
											'Cantidad' => $listSubpedidosTemp[$i]['Cantidad'],
											'Status' => 'Pendiente'
										);

										array_push($listBatchDetalle, $detalleSubpedidoAnt);
									}
								}

								$this->extracciones->addDetalleSubpedido($listBatchDetalle);

							}
						}

						$output = array('response' => $resultValidate,
										'idVenta' => $this->encryption->encrypt($data['idVenta'],$nonceValue));

						print_r(json_encode($output));
					}else{
						$output = array('response' => 2500,
										'idVenta' => $this->encryption->encrypt($data['idVenta'],$nonceValue));

						print_r(json_encode($output));
					}
				}
				else{

					$Catalogo  = $this->extracciones->sumCantCatalogo($data['idVenta']);
					$Promocion = $this->extracciones->sumCantPromociones($data['idVenta']);
					$Oferta    = $this->extracciones->sumCantOferta($data['idVenta']);

					$resultValidate = $this->validateExtraccion($Catalogo, $Promocion, $Oferta, $data['idVenta'],$data['idSucursal'],$data['idDistribuidor']);

					if (intval($resultValidate) == 9999) {

						//////////////////////////////////////////////////////////////////
						///////////////   Proceso de subpedidos para picking    //////////
						//////////////////////////////////////////////////////////////////

						$sumCantidadSubpedidos = $this->extracciones->getSumSubpedidos($data['idVenta']);

						if(intval($sumCantidadSubpedidos[0]['Cantidad']) > 280){

							$listVentasMenudeo    = $this->extracciones->getCantidadVentasMenudeo($data['idVenta']);
							$listAllInfo   		  = $this->extracciones->getDetalleVentaMenudeoTempByIdVenta($data['idVenta']);

							$listSubpedidos = [];
							$indexSubpedido = 0;
							$indexSub = 0;
							$CantidadTotal = 0;
							$indexCantProdSubpedido = 250;

							$this->pullApart();
							$this->addSubpedido($data['idVenta']);
						}
						else{
							//////////////////////////////////////// Subpedido con menos de 250 productos ///////////////////////////////////////////////

							$listBatchDetalle = [];
							$listSubpedidosTemp = $this->extracciones->getDetalleVentaMenudeoTempByIdVenta($data['idVenta']);

							$subpedidos = array(
								'idVenta' => $data['idVenta'],
								'Cantidad_productos' => intval($sumCantidadSubpedidos[0]['Cantidad']),
								'Fecha_hora_empaque' => date("Y-m-d H:i:s"),
								'Status' => 'Pendiente'
							);

							///////////////////////////////////////////////////
							////////////   Insert Info Extracción /////////////
							///////////////////////////////////////////////////

							$idSubpedido = $this->extracciones->addSubpedido($subpedidos);

							for ($i=0; $i < count($listSubpedidosTemp) ; $i++) { 
								if (intval($listSubpedidosTemp[$i]['Cantidad'] > 0)) {

									$detalleSubpedidoAnt = array(
										'idSubpedido' => $idSubpedido,
										'idDetalle_venta_menudeo_temp' => $listSubpedidosTemp[$i]['ID'],
										'Cantidad' => $listSubpedidosTemp[$i]['Cantidad'],
										'Status' => 'Pendiente'
									);

									array_push($listBatchDetalle, $detalleSubpedidoAnt);
								}
							}

							$this->extracciones->addDetalleSubpedido($listBatchDetalle);

						}
					}

					$output = array('response' => $resultValidate,
									'idVenta' => $this->encryption->encrypt($data['idVenta'],$nonceValue));

					print_r(json_encode($output));
				}

			}else{
				print_r(json_encode($getInfoCategoria));
			}
		}
	}

	// Validate Existencias Pedimento //
	public function validatePedimento($id)
	{
		$info = $this->extracciones->validatePedimento($id);

		if (empty($info)){
			return 1;
		}
		else{
			return $info;
		}
	}



























































































	public function validateExtraccion($Catalogo, $Promociones, $Oferta, $id, $idSucursal, $idDistribuidor){
		$Contador_Catalogo  = 0;
		$Cantidad 			= 0;
		$Cantidad_Promocion = 0;
		$Extra_Contador 	= 0;
		$Bandera_CKGO 	    = 0;
		$idCatalogo 		= array();
		$Producto 			= array();
		$Sin_Existencias 	= array();

		$Valida_Pedimento = $this->validatePedimento($id);

		if ($Valida_Pedimento == 1){

			for ($i=0; $i < count($Catalogo); $i++){ 
				if ($Catalogo[$i]['Validar'] != "true"){
					array_push($idCatalogo,$Catalogo[$i]['idCatalogo']);
					array_push($Producto,$Catalogo[$i]['Producto']);
					$Contador_Catalogo ++;
				}
			}

			if (!empty($Promociones)){
				for ($i=0; $i < count($Promociones); $i++){ 
					if ($Promociones[$i]['Validar'] != "true"){
						array_push($idCatalogo,$Promociones[$i]['idCatalogo']);
						array_push($Producto,$Promociones[$i]['Producto']);
						$Contador_Catalogo ++;
					}
				}
			}

			if (!empty($Oferta)){
				for ($i=0; $i < count($Oferta); $i++){ 
					if ($Oferta[$i]['Validar'] != "true"){
						array_push($idCatalogo,$Oferta[$i]['idCatalogo']);
						array_push($Producto,$Oferta[$i]['Nombre']);
						$Contador_Catalogo ++;
					}
				}
			}

			if ($Contador_Catalogo > 0){
				$Sin_Existencias['idCatalogo'] = $idCatalogo;
				$Sin_Existencias['Producto'] = $Producto;

				return json_encode($Sin_Existencias);
			}
			else{

				// Get Total importes detalle ventas menudeo y total + descuento de la venta //
				$Info_Importes  	= $this->extracciones->validateImportesByIdVenta($id);
				// Get Ventas menudeo by idVenta //
				$info_Venta_Menudeo = $this->extracciones->validateVentaMenudeoByIdVenta($id);
				// Get detalle ventas menudeo by idVenta //
				$Importe_Detalle_Comple = $this->extracciones->getDetalleVentasMenudeoByIdVenta($id);
				// Suma Importes Detalle Venta Menudeo //
				$TotalVentasWeb         = $this->extracciones->getTotalVentasWeb($id);

				for ($i=0; $i < count($info_Venta_Menudeo); $i++){ 
					// get Suma de importes detalle venta menudeo by idVentaMenudeo //
					$Importe_Detalle_Simple = $this->extracciones->getImporteVentaMenudeo($info_Venta_Menudeo[$i]['ID']);
					
					if ($idDistribuidor == 1967 && floatval($TotalVentasWeb[0]['Total']) < 1000) {
						$Total_Desc_Simple   = abs(floatval(($info_Venta_Menudeo[$i]['Total'] - 100)) - floatval($Importe_Detalle_Simple[0]['Importes']));
					}else{
						$Total_Desc_Simple = abs($info_Venta_Menudeo[$i]['Total'] - $Importe_Detalle_Simple[0]['Importes']);
					}

					if ($Total_Desc_Simple > 100){
						return 'Venta Menudeo  N° '. $info_Venta_Menudeo[$i]['ID'] .' no coinciden los totales';
					}
					else{
						if ($Total_Desc_Simple > 1 && $idDistribuidor != 1967){
							return 'Venta Menudeo  N° '. $info_Venta_Menudeo[$i]['ID'] .' no coinciden los totales';
						}
						else{
							continue;
						}
					}
				}

				for ($y=0; $y < count($Importe_Detalle_Comple); $y++){ 
					$Imp_Cal = $Importe_Detalle_Comple[$y]['Cantidad'] * $Importe_Detalle_Comple[$y]['Precio_unitario'];
					$Tol_Cal = abs($Imp_Cal - $Importe_Detalle_Comple[$y]['Importe']);

					if ($Tol_Cal > 1){
						return 'Venta Menudeo 2 N° '. $Importe_Detalle_Comple[$y]['idVenta_menudeo'] .' no coinciden los totales'."\n".'Cantidad: ' . $Importe_Detalle_Comple[$y]['Cantidad'] . "\n" . 'Precio Unitario: ' . $Importe_Detalle_Comple[$y]['Precio_unitario'] . "\n" .'Importe: ' .$Importe_Detalle_Comple[$y]['Importe']. "\n" .'ID Detalle Venta Menudeo: ' . $Importe_Detalle_Comple[$y]['ID'] . "\n" . 'Diferencia: ' . $Tol_Cal;
					}
					else{
						continue;
					}
				}

				$Contador = 0;

				if (!empty($Info_Importes)){

					$Contador = 9999;

					// Get detalle venta menudeo by idVenta //
					$Detalle_Venta_Menudeo  = $this->extracciones->getDetalleVentasMenudeoByIdVenta($id);

					if (!empty($Detalle_Venta_Menudeo)){
						// 
						$Validated_Producto = $this->validateExistenciasProductosReal($Detalle_Venta_Menudeo,$idSucursal);
						$Validated_Promo    = $this->validateExistenciasPromoReal($Detalle_Venta_Menudeo,$idSucursal);

						if ($Validated_Producto == 99999 && $Validated_Promo == 99999){
							for ($i=0; $i < count($Detalle_Venta_Menudeo); $i++){ 

								$Cantidad 		= 0;
								$Cantidad_Info 	= 0;
								$Cantidad_Insert = 0;

								if (!empty($Detalle_Venta_Menudeo[$i]['idCatalogo'])){

									/*if ($Detalle_Venta_Menudeo[$i]['idCatalogo'] == 681 || $Detalle_Venta_Menudeo[$i]['idCatalogo'] == 671) {
										$Bandera_CKGO = 1;
									}*/

									$Detalle_Venta_Existencias  = $this->extracciones->getInfoDetalleInventario($Detalle_Venta_Menudeo[$i]['idCatalogo'],$idSucursal);

									for ($x=0; $x < count($Detalle_Venta_Existencias); $x++){ 
										
										if ($Detalle_Venta_Existencias[$x]['Existencias'] >= ($Detalle_Venta_Menudeo[$i]['Cantidad'] - $Cantidad)){

											$Cantidad_Venta = $Detalle_Venta_Menudeo[$i]['Cantidad'] - $Cantidad;
											$Existencias 	= $Detalle_Venta_Existencias[$x]['Existencias'] - $Cantidad_Venta;
											$Update  		= $this->extracciones->UpdateDetalleInventarioExistencias($Detalle_Venta_Existencias[$x]['ID'],$Existencias,$Detalle_Venta_Menudeo[$i],$Cantidad_Venta);

											$Cantidad 		= 0;
											$Cantidad_Insert = 0;

											if ($Update != 0){
												$Contador = 9999;
											}
											else{
												$Contador = 2;
												return $Contador;
											}

											break;
										}
										else{

											$Cantidad 	+= intval($Detalle_Venta_Existencias[$x]['Existencias']);
											$Cantidad_Insert = $Detalle_Venta_Existencias[$x]['Existencias'];

											$Update  	= $this->extracciones->UpdateDetalleInventarioExistencias($Detalle_Venta_Existencias[$x]['ID'],0,$Detalle_Venta_Menudeo[$i],$Cantidad_Insert);

											if ($Update != 0){
												$Contador = 9999;
											}
											else{
												$Contador = 2;
												return $Contador;
											}

											$Cantidad_Info += $Cantidad;

											/*if ($Detalle_Venta_Existencias[$x]['idCatalogo'] == '1246' || $Detalle_Venta_Existencias[$x]['idCatalogo'] == '1247') {
												print_r($Detalle_Venta_Existencias[$x]['ID'] . " Existencia: " . $Detalle_Venta_Existencias[$x]['Existencias']);
												print_r("\n");
												print_r($Detalle_Venta_Existencias[$x]['ID'] . " Cantidad: " . $Cantidad);
												print_r("\n");
												print_r($Detalle_Venta_Existencias[$x]['ID'] . " Total Descontar: " . $Detalle_Venta_Menudeo[$i]['Cantidad']);
												print_r("\n");
												print_r($Detalle_Venta_Existencias[$x]['ID'] . " Contador Validate: " . $Cantidad_Info);
												print_r("\n");
												print_r("\n");
												print_r("\n");
											}*/

											if($Cantidad == $Detalle_Venta_Menudeo[$i]['Cantidad']){break;}														
										}
									}
								}
								elseif (!empty($Detalle_Venta_Menudeo[$i]['idPromocion'])){

									$Detalle_Venta_Promo  = $this->extracciones->getProductosPromo($Detalle_Venta_Menudeo[$i]['idVenta_menudeo'],$Detalle_Venta_Menudeo[$i]['idPromocion']);

									for ($q=0; $q < count($Detalle_Venta_Promo); $q++){ 
										$Detalle_Venta_Existencias_Promo  = $this->extracciones->getInfoDetalleInventario($Detalle_Venta_Promo[$q]['idCatalogo'],$idSucursal);

										/*if ($Detalle_Venta_Promo[$q]['idCatalogo'] == 681 || $Detalle_Venta_Promo[$q]['idCatalogo'] == 671) {
											$Bandera_CKGO = 1;
										}*/

										$Cantidad_Promocion = 0;
										$Cantidad_Promocion_Insertar = 0;
										$Cantidad_Info_Promo = 0;

										for ($w=0; $w < count($Detalle_Venta_Existencias_Promo); $w++){ 
											if ($Detalle_Venta_Existencias_Promo[$w]['Existencias'] >= ($Detalle_Venta_Promo[$q]['Cantidad'] - $Cantidad_Promocion)){

												$Cantidad_Venta_Promo = intval($Detalle_Venta_Promo[$q]['Cantidad']) - intval($Cantidad_Promocion);
												$Existencias_Promo 	  = $Detalle_Venta_Existencias_Promo[$w]['Existencias'] - $Cantidad_Venta_Promo;
												$Update_Promo  		  = $this->extracciones->UpdateDetalleInventarioExistenciasPromo($Detalle_Venta_Existencias_Promo[$w]['ID'],$Existencias_Promo,$Detalle_Venta_Promo[$q],$Cantidad_Venta_Promo);

												$Cantidad_Promocion = 0;
												$Cantidad_Promocion_Insertar = 0;

												if ($Update_Promo != 0){
													$Contador = 9999;
												}
												else{
													$Contador = 2;
													return $Contador;
												}

												break;
											}
											else{

												$Cantidad_Promocion 	+= intval($Detalle_Venta_Existencias_Promo[$w]['Existencias']);
												$Cantidad_Promocion_Insertar = $Detalle_Venta_Existencias_Promo[$w]['Existencias'];
												$Update_Promo  	= $this->extracciones->UpdateDetalleInventarioExistenciasPromo($Detalle_Venta_Existencias_Promo[$w]['ID'],0,$Detalle_Venta_Promo[$q],$Cantidad_Promocion_Insertar);

												if ($Update_Promo != 0){
													$Contador = 9999;
												}
												else{
													$Contador = 2;
													return $Contador;
												}

												$Cantidad_Info_Promo += $Cantidad_Promocion;

												if ($Cantidad_Promocion == $Detalle_Venta_Promo[$q]['Cantidad']){break;}
											}
										}
									}
											
								}
								else{
									$Update_Promo  	= $this->extracciones->UpdateExistenciasPromo($Detalle_Venta_Menudeo[$i],$idSucursal);

									if ($Update_Promo != 0){
										$Contador = 9999;
									}
									else{
										$Contador = 2;
										return $Contador;
									}
								}

							}
						}
						else{

							if ($Validated_Producto == 99999){
								print_r("Cantidad Inexistente (Promoción) del producto en con ID " . $Validated_Promo);
								exit();
							}
							elseif ($Validated_Promo == 99999){
								print_r("Cantidad Inexistente del producto con ID " . $Validated_Producto);
								exit();
							}
							else{
								print_r("Cantidad Inexistente del producto con ID: " . $Validated_Producto .  "\n" .' Cantidad Inexistente (Promoción) del producto en con ID ' . $Validated_Promo);
								exit();
							}
									
						}								
								
					}
					else{
						$Contador = 1;
					}

					if ($Contador == 9999){

						$Total_Importes_DVMT = 0;
						$Total_Real_DVMT = 0;
						$DVMT_Informacion  	= $this->extracciones->getDetalleVentaMenudeoTempByIdVenta($id);

						for ($index=0; $index < count($DVMT_Informacion); $index++){ 
							$Importe_Real = intval($DVMT_Informacion[$index]['Cantidad']) * floatval($DVMT_Informacion[$index]['Precio_unitario']);
							$Importe_Unreal = floatval($DVMT_Informacion[$index]['Importe']);
							$Total_Importes_DVMT += floatval($DVMT_Informacion[$index]['Importe']);
							$Total_Real_DVMT += intval($DVMT_Informacion[$index]['Cantidad']) * floatval($DVMT_Informacion[$index]['Precio_unitario']);

							$DiferenciaTotal = abs($Total_Real_DVMT - $Total_Importes_DVMT);

							if($DiferenciaTotal > 1){
								$DiferenciaImport = abs($Importe_Real - $Importe_Unreal);
								if ($DiferenciaImport > 1){
									continue;
								}
								else{
	
									/*print_r("\n");
									print_r("\n");
									print_r($DVMT_Informacion[$index]);
									print_r("\n");
									print_r("\n");
									print_r("ERROR Pincipal");
									print_r("\n");
									print_r("ID DVMT : " .$DVMT_Informacion[$index]['ID']);
									print_r("\n");
									print_r("idCatalogo DVMT : " .$DVMT_Informacion[$index]['idCatalogo']);
									print_r("\n");
									print_r("idVenta_menudeo DVMT : " .$DVMT_Informacion[$index]['idVenta_menudeo']);
									print_r("\n");
									print_r("Cantidad * precio unitario DVM: " .$Importe_Real);
									print_r("\n");
									print_r("Importe DVM: " . $Importe_Unreal);
									print_r("\n");*/
	
	
									$Detalle_Venta_Temp = $this->extracciones->getDetalleVentaMenudeoTempByIdVenta($id);
	
									if (!empty($Detalle_Venta_Temp)){
										$Des_Existencias = $this->extracciones->addExistencias($Detalle_Venta_Temp,$id);
	
										if ($Des_Existencias != 0){
											return 8888;
										}
										else{
											return 7777;
										}
									}
									else{
										return 6666;
									}
								}
							}							
							
						}

						$Ahorro_Venta = $this->extracciones->getAhorro($id);
						$Info_Venta = $this->ventas->getVentaById($id);
						$DifTotal = 0;

						if ($Ahorro_Venta[0]['Ahorro'] != null && $Ahorro_Venta[0]['Ahorro'] != ""){

							$Total_Venta_Calculado = $Total_Importes_DVMT - $Ahorro_Venta[0]['Ahorro'];
							$Diferencia   = abs((floatval(($TotalVentasWeb[0]['Total']))) - floatval($Total_Venta_Calculado));

							/*if ($idDistribuidor == 1967 && floatval($TotalVentasWeb[0]['Total']) <= 1000) {
								$DifTotal   = abs((floatval( ($TotalVentasWeb[0]['Total'] - 100 ))) - floatval($Info_Venta[0]['Gastos_Admin']));
							}else{
								$DifTotal   = abs((floatval($TotalVentasWeb[0]['Total'])) - floatval($Info_Venta[0]['Gastos_Admin']));
							}
							$Diferencia = abs($DifTotal - $Total_Venta_Calculado);*/

							/*print_r("\n");
							print_r("\n");
							print_r("\n");
							print_r("\n");
							print_r("\n");
							print_r("ERROR Ahorro");
							print_r("\n");
							print_r("Ahorro de la Venta: " .$Ahorro_Venta[0]['Ahorro']);
							print_r("\n");
							print_r("Total Detalle Venta Menudeo: " . $Total_Importes_DVMT);
							print_r("\n");
							print_r("Total Venta: " . $Info_Venta[0]['Total']);
							print_r("\n");
							print_r("Total Calculado: " . $Total_Venta_Calculado);
							print_r("\n");
							print_r("Diferencia: " . $Diferencia);
							print_r("\n");
							print_r("Descuento: " . $Info_Venta[0]['Descuento']);
							print_r("\n");
							print_r("Gastos Admin: " . $Info_Venta[0]['Gastos_Admin']);
							print_r("\n");
							print_r("Total + Descuento - Gastos_Admin: " . $DifTotal);*/

							if ($Diferencia > 10){
											
								$Detalle_Venta_Temp = $this->extracciones->getDetalleVentaMenudeoTempByIdVenta($id);

								if (!empty($Detalle_Venta_Temp)){
									$Des_Existencias = $this->extracciones->addExistencias($Detalle_Venta_Temp,$id);

									if ($Des_Existencias != 0){
										return 88881;
									}
									else{
										return 77771;
									}
								}
								else{
									return 66661;
								}
							}
						}
						else{

							$Total_Venta_Calculado = floatval($Total_Importes_DVMT) - 0.00;
							$Diferencia   = abs((floatval(($TotalVentasWeb[0]['Total']))) - floatval($Total_Venta_Calculado));


							/*if ($idDistribuidor == 1967 && floatval($TotalVentasWeb[0]['Total']) <= 1000) {
								$DifTotal   = abs((floatval(($TotalVentasWeb[0]['Total']))) - floatval($Info_Venta[0]['Gastos_Admin']));
							}else{
								$DifTotal   = abs((floatval($TotalVentasWeb[0]['Total'])) - floatval($Info_Venta[0]['Gastos_Admin']));
							}*/

							//$Diferencia = abs($DifTotal - $Total_Venta_Calculado);

							/*print_r("\n");
							print_r("\n");
							print_r("\n");
							print_r("\n");
							print_r("ERROR Normal");
							print_r("\n");
							print_r("Ahorro de la Venta: " .$Ahorro_Venta[0]['Ahorro']);
							print_r("\n");
							print_r("Total Detalle Venta Menudeo: " . $Total_Importes_DVMT);
							print_r("\n");
							print_r("Total Venta: " . $Info_Venta[0]['Total']);
							print_r("\n");
							print_r("Total Calculado: " . $Total_Venta_Calculado);
							print_r("\n");
							print_r("Diferencia: " . $Diferencia);
							print_r("\n");
							print_r("Descuento: " . $Info_Venta[0]['Descuento']);
							print_r("\n");
							print_r("Gastos Admin: " . $Info_Venta[0]['Gastos_Admin']);
							print_r("\n");
							print_r("Total + Descuento - Gastos_Admin: " . $DifTotal);*/

							if ($Diferencia > 10){

								$Detalle_Venta_Temp = $this->extracciones->getDetalleVentaMenudeoTempByIdVenta($id);

								if (!empty($Detalle_Venta_Temp)){
									$Des_Existencias = $this->extracciones->addExistencias($Detalle_Venta_Temp,$id);

									if ($Des_Existencias != 0){
										return 88881;
									}
									else{
										return 77771;
									}
								}
								else{
									return 66661;
								}
							}
						}
						
						$Update_Venta  	= $this->extracciones->updateExtraidoByIdVenta($id);

						if ($Update_Venta != 0){
							$Contador = 9999;
						}
						else{
							$Contador = 3;
						}

						return $Contador;
					}	
				}
			}
		}
		else{

			$idCatalogo = array();
			$Producto 	= array();

			for ($i=0; $i < count($Valida_Pedimento); $i++){ 
				$Producto_by_id = $this->catalogo->getProductoById($Valida_Pedimento[$i]['idCatalogo']);

				if ($Producto_by_id != null){
					array_push($idCatalogo,$Valida_Pedimento[$i]['idCatalogo']);
					array_push($Producto,$Producto_by_id[0]['Producto']);
				}
			}

			$Sin_Existencias['idCatalogo1'] = $idCatalogo;
			$Sin_Existencias['Producto1'] = $Producto;

			return json_encode($Sin_Existencias);
		}
		return $Contador;
	}

	// Validar Existencias Productos //
	public function validateExistenciasProductosReal($info,$idSucursal)
	{
		$Contador = 0;
		for ($i=0; $i < count($info); $i++){ 
			if (!empty($info[$i]['idCatalogo'])){
				$Detalle_Venta_Existencias  = $this->extracciones->getInfoDetalleInventario($info[$i]['idCatalogo'],$idSucursal);

				if(empty($Detalle_Venta_Existencias)){
					$Contador = 0;

					return $info[$i]['idCatalogo'];
				}
				else{
					$Contador = 99999;
				}
			}
			else{
				$Contador = 99999;
			}
		}
		return $Contador;
	}

	// Validar Existencias Promociones //
	public function validateExistenciasPromoReal($info,$idSucursal)
	{
		$Contador = 0;
		for ($i=0; $i < count($info); $i++){ 
			if (!empty($info[$i]['idPromocion'])){
				$Detalle_Venta_Promo  = $this->extracciones->getProductosPromo($info[$i]['idVenta_menudeo'],$info[$i]['idPromocion']);

				for ($q=0; $q < count($Detalle_Venta_Promo); $q++){ 
					$Detalle_Venta_Existencias_Promo  = $this->extracciones->getInfoDetalleInventario($Detalle_Venta_Promo[$q]['idCatalogo'],$idSucursal);

					if(empty($Detalle_Venta_Existencias_Promo)){
						$Contador = 0;
						return $Detalle_Venta_Promo[$q]['idCatalogo'];
					}
					else{
						$Contador = 99999;
					}
				}
			}
			else{
				$Contador = 99999;
			}
		}
		return $Contador;
	}


	// Obtener Historial Extracción //
	public function getHistorialExtraccion()
	{
		$data = $this->input->post();
		$info    = $this->extracciones->getHistorial($data['idSucursal']);
		print_r(json_encode($info));
	}

	// Cargar DataTable fetchHistorial //
	public function fetchHistorial()
	{
		$data = $this->input->post();
		$info = $this->fetch->fetchHistorial($data);
		print_r($info);
	}

	// Acción Eliminar Extracción //
	public function deleteExtraccion()
	{
		$data   = $this->input->post();
		$Venta  =  $this->ventas->getVentaById($data['idVenta']); 
		$Bodega = $this->bodega->getBodegaById($data['idBodega']);

		if ($Bodega[0]['Permitir_Facturacion'] == 1) {
			if ($Venta[0]['Timbrado'] == 0) {
				$Detalle_Venta_Temp = $this->extracciones->getDetalleVentaMenudeoTempByIdVenta($data['idVenta']);
				if (!empty($Detalle_Venta_Temp)){
					$Des_Existencias = $this->extracciones->addExistencias($Detalle_Venta_Temp,$data['idVenta']);
					if ($Des_Existencias != 0){
						print_r(9999);
						exit();
					}
					else{
						print_r(3);
						exit();
					}
				}
				else{
					print_r(2);
					exit();
				}
			}
			else{
				print_r(1);
				exit();
			}
		}
		else{
			$Detalle_Venta_Temp = $this->extracciones->getDetalleVentaMenudeoTempByIdVenta($data['idVenta']);
			if (!empty($Detalle_Venta_Temp)){
				$Des_Existencias = $this->extracciones->addExistencias($Detalle_Venta_Temp,$data['idVenta']);
				if ($Des_Existencias != 0){
					print_r(9999);
					exit();
				}
				else{
					print_r(3);
					exit();
				}
			}
			else{
				print_r(2);
				exit();
			}
		}
	}

	// Cerrar Sesión //
	public function cerrarSesion(){
	    session_destroy();
	    redirect('Controller_Login');
	}

	public function Getinfo_Extracciones()
	{
		$data = $this->input->post();

		$info['Extracciones'] = $this->extracciones->Get_Extracciones($data['idSucursal']);
		$info['Historial']    = $this->extracciones->Get_Historial_Extracciones($data['idSucursal']);

		print_r(json_encode($info));
	}

	public function Getinfo_Extracciones_Detalle()
	{
		$data = $this->input->post();

		$info['Detalle'] = $this->extracciones->Get_Extracciones_Detalle($data['idVenta']);

		print_r(json_encode($info));
	}


	public function existDetailSellTemp()
	{
		$data = $this->input->post();

		$info = $this->extracciones->existDetailSellTemp($data['idVenta']);

		if (empty($info))
		{
			$Catalogo  = $this->extracciones->sumCantidadCatalogo($data['idVenta']);
			$Promocion = $this->extracciones->sumCantidadCatalogoPromociones($data['idVenta']);
			$Oferta    = $this->extracciones->sumCantidadCatalogoOferta($data['idVenta']);

			$Result_Valida_Existencias = $this->Validar_Existencias($Catalogo, $Promocion, $Oferta, $data['idVenta'],$data['idSucursal']);

			if (is_int($Result_Valida_Existencias))
			{
				print_r($Result_Valida_Existencias);
			}
			else
			{
				print_r($Result_Valida_Existencias);
			}
			

		}
		else
		{
			for ($i=0; $i < count($info); $i++)
			{ 
				$Delete_Detail  += $this->extracciones->Delete_Detail($info[$i]['ID']);
			}

			if ($Delete_Detail == count($info))
			{
				$Catalogo  = $this->extracciones->sumCantidadCatalogo($data['idVenta']);
				$Promocion = $this->extracciones->sumCantidadCatalogoPromociones($data['idVenta']);
				$Oferta    = $this->extracciones->sumCantidadCatalogoOferta($data['idVenta']);

				$Result_Valida_Existencias = $this->Validar_Existencias($Catalogo, $Promocion, $Oferta, $data['idVenta'],$data['idSucursal']);

				if (is_int($Result_Valida_Existencias))
				{
					print_r($Result_Valida_Existencias);
				}
				else
				{
					print_r($Result_Valida_Existencias);
				}
				
			}
		}

	}

	public function Validar_Existe_Pedimento($id)
	{
		$All_Detalle     = $this->extracciones->Get_All_Detalle_Venta_Menudeo($id);

		if (empty($All_Detalle))
		{
			return 'Correcto';
		}
		else
		{
			return $All_Detalle;
		}
		
	}


	public function Validate_Existencias_Productos_Real($info,$idSucursal){
		$Contador = 0;
		for ($i=0; $i < count($info); $i++){ 
			if (!empty($info[$i]['idCatalogo'])){
				$Detalle_Venta_Existencias  = $this->extracciones->Get_Detalle_Venta_Existencias($info[$i]['idCatalogo'],$idSucursal);

				if(empty($Detalle_Venta_Existencias)){
					$Contador = 0;
					return $info[$i]['idCatalogo'];
				}
				else{
					$Contador = 99999;
				}
			}
			else{
				$Contador = 99999;
			}
		}
		return $Contador;
	}

	public function Validate_Existencias_Promo_Real($info,$idSucursal){
		$Contador = 0;

		for ($i=0; $i < count($info); $i++){ 
			if (!empty($info[$i]['idPromocion'])){
				$Detalle_Venta_Promo  = $this->extracciones->Get_Catalogo_Promociones($info[$i]['idVenta_menudeo'],$info[$i]['idPromocion']);

				for ($q=0; $q < count($Detalle_Venta_Promo); $q++){ 
					$Detalle_Venta_Existencias_Promo  = $this->extracciones->Get_Detalle_Venta_Existencias($Detalle_Venta_Promo[$q]['idCatalogo'],$idSucursal);

					if(empty($Detalle_Venta_Existencias_Promo)){
						$Contador = 0;
						return $Detalle_Venta_Promo[$q]['idCatalogo'];
					}
					else{
						$Contador = 99999;
					}
				}
			}
			else{
				$Contador = 99999;
			}
			
		}
		return $Contador;
	}

	///////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////
	public function Validar_Existencias($Catalogo, $Promociones, $Oferta, $id, $idSucursal){

		$Contador_Catalogo  = 0;
		$Cantidad = 0;
		$Cantidad_Promocion = 0;
		$Extra_Contador =0;
		$idCatalogo = array();
		$Producto = array();
		$Sin_Existencias = array();


		$Valida_Pedimento = $this->Validar_Existe_Pedimento($id);

		if ($Valida_Pedimento == 'Correcto'){

			if (!empty($Catalogo)){
				for ($i=0; $i < count($Catalogo); $i++){ 
					if ($Catalogo[$i]['Validar'] != "true"){
						array_push($idCatalogo,$Catalogo[$i]['idCatalogo']);
						array_push($Producto,$Catalogo[$i]['Producto']);
						$Contador_Catalogo ++;
					}
				}
			}

			if (!empty($Promociones)){
				for ($i=0; $i < count($Promociones); $i++){ 
					if ($Promociones[$i]['Validar'] != "true"){
						array_push($idCatalogo,$Promociones[$i]['idCatalogo']);
						array_push($Producto,$Promociones[$i]['Producto']);
						$Contador_Catalogo ++;
					}
				}
			}

			if (!empty($Oferta)){
				for ($i=0; $i < count($Oferta); $i++){ 
					if ($Oferta[$i]['Validar'] != "true"){
						array_push($idCatalogo,$Oferta[$i]['idCatalogo']);
						array_push($Producto,$Oferta[$i]['Nombre']);
						$Contador_Catalogo ++;
					}
				}
			}

			// Encontro productos sin existencias y regresa el listado de productos sin existencias //
			if ($Contador_Catalogo > 0){
				$Sin_Existencias['idCatalogo'] = $idCatalogo;
				$Sin_Existencias['Producto'] = $Producto;
				return json_encode($Sin_Existencias);
			}
			else{
				// Sumar importes detalle ventas menudeo y sumar Total + descuento de la venta ///
				$Info_Importes  = $this->extracciones->Validate_Importes($id);
				// Get Ventas Menudeo by idVenta //
				$info_Venta_Menudeo = $this->extracciones->Validate_Venta_Menudeo_Importe($id);
				// Get Detalle ventas menudeo by idVenta
				$Importe_Detalle_Comple = $this->extracciones->Validate_Venta_Menudeo_Importe_Detalle_Comple($id);

				/// Validar totales ventas menudeo y totales detalle ventas menudeo ///
				for ($i=0; $i < count($info_Venta_Menudeo); $i++){ 
					$Importe_Detalle_Simple = $this->extracciones->Validate_Venta_Menudeo_Importe_Detalle($info_Venta_Menudeo[$i]['ID']);
					$Total_Desc_Simple = abs($info_Venta_Menudeo[$i]['Total'] - $Importe_Detalle_Simple[0]['Importes']);
					if ($Total_Desc_Simple > 1){
						return 'Venta Menudeo  N° '. $info_Venta_Menudeo[$i]['ID'] .' no coinciden los totales';
					}
					else{
						continue;
					}
				}

				// Validar Importes correctos en detalle ventas menudeo ///
				for ($y=0; $y < count($Importe_Detalle_Comple); $y++){ 
					$Imp_Cal = $Importe_Detalle_Comple[$y]['Cantidad'] * $Importe_Detalle_Comple[$y]['Precio_unitario'];
					$Tol_Cal = abs($Imp_Cal - $Importe_Detalle_Comple[$y]['Importe']);
					if ($Tol_Cal > 1){
						return 'Venta Menudeo 2 N° '. $Importe_Detalle_Comple[$y]['idVenta_menudeo'] .' no coinciden los totales'."\n".'Cantidad: ' . $Importe_Detalle_Comple[$y]['Cantidad'] . "\n" . 'Precio Unitario: ' . $Importe_Detalle_Comple[$y]['Precio_unitario'] . "\n" .
							'Importe: ' .$Importe_Detalle_Comple[$y]['Importe']. "\n" .'ID Detalle Venta Menudeo: ' . $Importe_Detalle_Comple[$y]['ID'] . "\n" . 'Diferencia: ' . $Tol_Cal;
					}
					else{
						continue;
					}
				}

				// Bandera //
				$Contador = 0;

				if (!empty($Info_Importes)){
					$Contador = 9999;

					// Get Detalle ventas menudeo by idVenta //
					$Detalle_Venta_Menudeo  = $this->extracciones->Get_All_Detalle_Menudeo($id);

					if (!empty($Detalle_Venta_Menudeo)){
						// Validar existencias productos //
						$Validated_Producto = $this->Validate_Existencias_Productos_Real($Detalle_Venta_Menudeo,$idSucursal);
						// Validar existencias promociones //
						$Validated_Promo    = $this->Validate_Existencias_Promo_Real($Detalle_Venta_Menudeo,$idSucursal);

						if ($Validated_Producto == 99999 && $Validated_Promo == 99999){

							for ($i=0; $i < count($Detalle_Venta_Menudeo); $i++){ 
								$Cantidad 		= 0;
								$Cantidad_Info 	= 0;
								$Cantidad_Insert = 0;

								if (!empty($Detalle_Venta_Menudeo[$i]['idCatalogo'])){
											$Detalle_Venta_Existencias  = $this->extracciones->Get_Detalle_Venta_Existencias($Detalle_Venta_Menudeo[$i]['idCatalogo'],$idSucursal);

											for ($x=0; $x < count($Detalle_Venta_Existencias); $x++)
											{ 
												if ($Detalle_Venta_Existencias[$x]['Existencias'] >= ($Detalle_Venta_Menudeo[$i]['Cantidad'] - $Cantidad))
												{

													$Cantidad_Venta = $Detalle_Venta_Menudeo[$i]['Cantidad'] - $Cantidad;

													$Existencias 	= $Detalle_Venta_Existencias[$x]['Existencias'] - $Cantidad_Venta;
													$Update  		= $this->extracciones->Update_Existencias_1($Detalle_Venta_Existencias[$x]['ID'],$Existencias,$Detalle_Venta_Menudeo[$i],$Cantidad_Venta);

													$Cantidad 		= 0;
													$Cantidad_Insert = 0;

													if ($Update != 0)
													{
														$Contador = 9999;
													}
													else
													{
														$Contador = 02;
														return $Contador;
													}

													break;
												}
												else
												{

													$Cantidad 	+= intval($Detalle_Venta_Existencias[$x]['Existencias']);
													$Cantidad_Insert = $Detalle_Venta_Existencias[$x]['Existencias'];

													$Update  	= $this->extracciones->Update_Existencias_1($Detalle_Venta_Existencias[$x]['ID'],0,$Detalle_Venta_Menudeo[$i],$Cantidad_Insert);

													if ($Update != 0)
													{
														$Contador = 9999;
													}
													else
													{
														$Contador = 02;
														return $Contador;
													}


													$Cantidad_Info += $Cantidad;


													if ($Cantidad_Info == $Detalle_Venta_Menudeo[$i]['Cantidad'])
													{
														break;
													}

														
												}
											}
										}
										elseif (!empty($Detalle_Venta_Menudeo[$i]['idPromocion']))
										{

											$Detalle_Venta_Promo  = $this->extracciones->Get_Catalogo_Promociones($Detalle_Venta_Menudeo[$i]['idVenta_menudeo'],$Detalle_Venta_Menudeo[$i]['idPromocion']);

											for ($q=0; $q < count($Detalle_Venta_Promo); $q++)
											{ 
												$Detalle_Venta_Existencias_Promo  = $this->extracciones->Get_Detalle_Venta_Existencias($Detalle_Venta_Promo[$q]['idCatalogo'],$idSucursal);

												$Cantidad_Promocion = 0;
												$Cantidad_Promocion_Insertar = 0;
												$Cantidad_Info_Promo = 0;

												for ($w=0; $w < count($Detalle_Venta_Existencias_Promo); $w++)
												{ 
													if ($Detalle_Venta_Existencias_Promo[$w]['Existencias'] >= ($Detalle_Venta_Promo[$q]['Cantidad'] - $Cantidad_Promocion))
													{
														$Cantidad_Venta_Promo = intval($Detalle_Venta_Promo[$q]['Cantidad']) - intval($Cantidad_Promocion);

														$Existencias_Promo 	  = $Detalle_Venta_Existencias_Promo[$w]['Existencias'] - $Cantidad_Venta_Promo;
														$Update_Promo  		  = $this->extracciones->Update_Existencias_Promo_1($Detalle_Venta_Existencias_Promo[$w]['ID'],$Existencias_Promo,$Detalle_Venta_Promo[$q],$Cantidad_Venta_Promo);

														$Cantidad_Promocion = 0;
														$Cantidad_Promocion_Insertar = 0;

														if ($Update_Promo != 0)
														{
															$Contador = 9999;
														}
														else
														{
															$Contador = 02;
															return $Contador;
														}

														break;
													}
													else
													{

														$Cantidad_Promocion 	+= intval($Detalle_Venta_Existencias_Promo[$w]['Existencias']);
														$Cantidad_Promocion_Insertar = $Detalle_Venta_Existencias_Promo[$w]['Existencias'];

														$Update_Promo  	= $this->extracciones->Update_Existencias_Promo_1($Detalle_Venta_Existencias_Promo[$w]['ID'],0,$Detalle_Venta_Promo[$q],$Cantidad_Promocion_Insertar);

														if ($Update_Promo != 0)
														{
															$Contador = 9999;
														}
														else
														{
															$Contador = 02;
															return $Contador;
														}

														$Cantidad_Info_Promo += $Cantidad_Promocion;

														if ($Cantidad_Info_Promo == $Detalle_Venta_Promo[$q]['Cantidad'])
														{
															break;
														}
													}
												}
											}
											
										}
										else
										{
											$Update_Promo  	= $this->extracciones->Update_Existencias_Oferta($Detalle_Venta_Menudeo[$i],$idSucursal);

												if ($Update_Promo != 0)
												{
													$Contador = 9999;
												}
												else
												{
													$Contador = 02;
													return $Contador;
												}
										}

									}
								}
								else
								{

									if ($Validated_Producto == 99999)
									{
										print_r("Cantidad Inexistente (PromociÃ³n) del producto en con ID " . $Validated_Promo);
										exit();
									}
									elseif ($Validated_Promo == 99999) {

										print_r("Cantidad Inexistente del producto con ID " . $Validated_Producto);
										exit();
									}
									else
									{
										print_r("Cantidad Inexistente del producto con ID: " . $Validated_Producto .  "\n" .' Cantidad Inexistente (PromociÃ³n) del producto en con ID ' . $Validated_Promo);
										exit();
									}
									
								}								
								
							}
							else
							{
								$Contador = 01;
							}

							if ($Contador == 9999)
							{
								$Total_Importes_DVMT = 0;

									$DVMT_Informacion  	= $this->extracciones->Get_Detalle_Venta_Menudeo_Temp_By_IdVenta($id);

									print_r($DVMT_Informacion);
									exit();

									for ($i=0; $i < count($DVMT_Informacion); $i++)
									{ 
										$Importe_Real = floatval($DVMT_Informacion[$i]['Cantidad']) * floatval($DVMT_Informacion[$i]['Precio_unitario']);

										$Total_Importes_DVMT += floatval($DVMT_Informacion[$i]['Importe']);

										if (trim($Importe_Real) != trim(floatval($DVMT_Informacion[$i]['Importe'])))
										{
											$Detalle_Venta_Temp = $this->extracciones->Get_Detalle_Venta_Menudeo_Temp_By_IdVenta($id);

											if (!empty($Detalle_Venta_Temp))
											{
												$Des_Existencias = $this->extracciones->Agregar_Existencias($Detalle_Venta_Temp,$id);

												if ($Des_Existencias != 0)
												{
													return 8888;
												}
												else
												{
													return 7777;
												}
											}
											else
											{
												return 6666;
											}
										}
									}

									$Ahorro_Venta = $this->extracciones->Get_Promo_Ahorro($id);

									$Info_Venta = $this->extracciones->Get_Info_Venta($id);

									if ($Ahorro_Venta[0]['Ahorro'] != null && $Ahorro_Venta[0]['Ahorro'] != "")
									{

										$Total_Venta_Calculado = $Total_Importes_DVMT - $Ahorro_Venta[0]['Ahorro'];

										$Diferencia = abs(($Info_Venta[0]['Total'] + $Info_Venta[0]['Descuento']) - $Total_Venta_Calculado);

										if ($Diferencia > 10)
										{											
											$Detalle_Venta_Temp = $this->extracciones->Get_Detalle_Venta_Menudeo_Temp_By_IdVenta($id);

											if (!empty($Detalle_Venta_Temp))
											{
												$Des_Existencias = $this->extracciones->Agregar_Existencias($Detalle_Venta_Temp,$id);

												if ($Des_Existencias != 0)
												{
													return 88881;
												}
												else
												{
													return 77771;
												}
											}
											else
											{
												return 66661;
											}
										}
									}
									else
									{
										$Total_Venta_Calculado = floatval($Total_Importes_DVMT) - 0.00;

										$Diferencia = abs(($Info_Venta[0]['Total'] + $Info_Venta[0]['Descuento']) - $Total_Venta_Calculado);

										if ($Diferencia > 10)
										{
											$Detalle_Venta_Temp = $this->extracciones->Get_Detalle_Venta_Menudeo_Temp_By_IdVenta($id);

											if (!empty($Detalle_Venta_Temp))
											{
												$Des_Existencias = $this->extracciones->Agregar_Existencias($Detalle_Venta_Temp,$id);

												if ($Des_Existencias != 0)
												{
													return 88881;
												}
												else
												{
													return 77771;
												}
											}
											else
											{
												return 66661;
											}
										}
									}


								$Update_Venta  	= $this->extracciones->Update_Venta($id);

								if ($Update_Venta != 0)
								{
									$Contador = 9999;
								}
								else
								{
									$Contador = 03;
								}
								
								return $Contador;
							}							
						
					}
			}

		}
		else{
			$idCatalogo = array();
			$Producto 	= array();

			for ($i=0; $i < count($Valida_Pedimento); $i++){ 
				$Producto_by_id = $this->extracciones->Get_Producto_By_id($Valida_Pedimento[$i]['idCatalogo']);

				if ($Producto_by_id != null){
					array_push($idCatalogo,$Valida_Pedimento[$i]['idCatalogo']);
					array_push($Producto,$Producto_by_id[0]['Producto']);
				}	
			}

			$Sin_Existencias['idCatalogo1'] = $idCatalogo;
			$Sin_Existencias['Producto1'] = $Producto;

			return json_encode($Sin_Existencias);
		}

		return $Contador;
	}


	public function Validar_Existencias12($Catalogo, $Promociones,$id,$idSucursal)
	{
		$Contador_Catalogo  = 0;
		$Cantidad = 0;
		$Cantidad_Promocion = 0;
		$Extra_Contador =0;
		$idCatalogo = array();
		$Producto = array();
		$Sin_Existencias = array();


		$Valida_Pedimento = $this->Validar_Existe_Pedimento($id);

		if ($Valida_Pedimento == 'Correcto')
		{
			for ($i=0; $i < count($Catalogo); $i++)
			{ 
				if ($Catalogo[$i]['Validar'] != "true")
				{
					array_push($idCatalogo,$Catalogo[$i]['idCatalogo']);
					array_push($Producto,$Catalogo[$i]['Producto']);
					$Contador_Catalogo ++;
				}
			}

			if (!empty($Promociones))
			{

				for ($i=0; $i < count($Promociones); $i++)
				{ 
					if ($Promociones[$i]['Validar'] != "true")
					{
						array_push($idCatalogo,$Promociones[$i]['idCatalogo']);
						array_push($Producto,$Promociones[$i]['Producto']);
						$Contador_Catalogo ++;
					}
				}

			}

			if ($Contador_Catalogo > 0)
			{
				$Sin_Existencias['idCatalogo'] = $idCatalogo;
				$Sin_Existencias['Producto'] = $Producto;

				return json_encode($Sin_Existencias);
			}
			else
			{
					$Info_Importes  = $this->extracciones->Validate_Importes($id);

					$info_Venta_Menudeo = $this->extracciones->Validate_Venta_Menudeo_Importe($id);

					for ($i=0; $i < count($info_Venta_Menudeo); $i++)
					{ 
						$Importe_Detalle_Simple = $this->extracciones->Validate_Venta_Menudeo_Importe_Detalle($info_Venta_Menudeo[$i]['ID']);

						$Total_Desc_Simple = abs($info_Venta_Menudeo[$i]['Total'] - $Importe_Detalle_Simple[0]['Importes']);

						if ($Total_Desc_Simple > 1)
						{
							return 'Venta Menudeo N° '. $info_Venta_Menudeo[$i]['ID'] .' no coinciden los totales';
						}
						else
						{
							continue;
						}
					}

					$Contador = 0;

					if (!empty($Info_Importes))
					{
						if ($Info_Importes[0]['Importes'] == $Info_Importes[0]['Total_Ventas'])
						{
							$Contador = 9999;

							$Detalle_Venta_Menudeo  = $this->extracciones->Get_All_Detalle_Menudeo($id);

							if (!empty($Detalle_Venta_Menudeo))
							{
								for ($i=0; $i < count($Detalle_Venta_Menudeo); $i++)
								{ 
									if (!empty($Detalle_Venta_Menudeo[$i]['idCatalogo']))
									{
										$Detalle_Venta_Existencias  = $this->extracciones->Get_Detalle_Venta_Existencias($Detalle_Venta_Menudeo[$i]['idCatalogo'],$idSucursal);

										for ($x=0; $x < count($Detalle_Venta_Existencias); $x++)
										{ 
											
											if ($Detalle_Venta_Existencias[$x]['Existencias'] >= $Detalle_Venta_Menudeo[$i]['Cantidad'] - $Cantidad)
											{
												$Cantidad_Venta = $Detalle_Venta_Menudeo[$i]['Cantidad'] - $Cantidad;
												$Existencias 	= $Detalle_Venta_Existencias[$x]['Existencias'] - $Cantidad_Venta;
												$Update  		= $this->extracciones->Update_Existencias($Detalle_Venta_Existencias[$x]['ID'],$Existencias,$Detalle_Venta_Menudeo[$i]);

												print_r($Update);
												print_r("\n");

												$Cantidad 		= 0;

												if ($Update != 0)
												{
													$Contador = 9999;
												}
												else
												{
													$Contador = 02;
													return $Contador;
												}

												break;
											}
											else
											{
												$Cantidad 	= $Detalle_Venta_Existencias[$x]['Existencias'];
												$Update  	= $this->extracciones->Update_Existencias($Detalle_Venta_Existencias[$x]['ID'],0,$Detalle_Venta_Menudeo[$i]);

												if ($Update != 0)
												{
													$Contador = 9999;
												}
												else
												{
													$Contador = 02;
													return $Contador;
												}
											}

										}
									}
								} // fin for

								exit();

								for ($i=0; $i < count($Detalle_Venta_Menudeo); $i++)
								{
									if (!empty($Detalle_Venta_Menudeo[$i]['idPromocion']))
									{
										$Detalle_Venta_Promo  = $this->extracciones->Get_Catalogo_Promociones($Detalle_Venta_Menudeo[$i]['idVenta_menudeo'],$Detalle_Venta_Menudeo[$i]['idPromocion']);

										for ($q=0; $q < count($Detalle_Venta_Promo); $q++)
										{ 
											$Detalle_Venta_Existencias_Promo  = $this->extracciones->Get_Detalle_Venta_Existencias($Detalle_Venta_Promo[$q]['idCatalogo'],$idSucursal);

											for ($w=0; $w < count($Detalle_Venta_Existencias_Promo); $w++)
											{ 
												if ($Detalle_Venta_Existencias_Promo[$w]['Existencias'] >= $Detalle_Venta_Promo[$q]['Cantidad'] - $Cantidad_Promocion)
												{

													$Cantidad_Venta_Promo = $Detalle_Venta_Promo[$q]['Cantidad'] - $Cantidad_Promocion;
													$Existencias_Promo 	  = $Detalle_Venta_Existencias_Promo[$w]['Existencias'] - $Cantidad_Venta_Promo;
													$Update_Promo  		  = $this->extracciones->Update_Existencias_Promo($Detalle_Venta_Existencias_Promo[$w]['ID'],$Existencias_Promo,$Detalle_Venta_Promo[$q]);

													$Cantidad_Promocion = 0;

													if ($Update_Promo != 0)
													{
														$Contador = 9999;
													}
													else
													{
														$Contador = 02;
														return $Contador;
													}

													break;
												}
												else
												{
													$Cantidad_Promocion 	= $Detalle_Venta_Existencias_Promo[$w]['Existencias'];
													$Update_Promo  	= $this->extracciones->Update_Existencias_Promo($Detalle_Venta_Existencias_Promo[$w]['ID'],0,$Detalle_Venta_Promo[$q]);

													if ($Update_Promo != 0)
													{
														$Contador = 9999;
													}
													else
													{
														$Contador = 02;
														return $Contador;
													}
												}
											}
										}
										
									}
									else
									{
										$Update_Promo  	= $this->extracciones->Update_Existencias_Oferta($Detalle_Venta_Menudeo[$i],$idSucursal);

											if ($Update_Promo != 0)
											{
												$Contador = 9999;
											}
											else
											{
												$Contador = 02;
												return $Contador;
											}
									}
								} // fin for
								
							}
							else
							{
								$Contador = 01;
							}

							if ($Contador == 9999)
							{

								$Update_Venta  	= $this->extracciones->Update_Venta($id);

								if ($Update_Venta != 0)
								{
									$Contador = 9999;
								}
								else
								{
									$Contador = 03;
								}
								
								return $Contador;
							}							
							
						}
						else
						{
							$Diferencia = $Info_Importes[0]['Importes'] - $Info_Importes[0]['Total_Ventas'];
							return number_format($Diferencia,2);
						}
					}
			}

		}
		else
		{
			$idCatalogo = array();
			$Producto 	= array();

			for ($i=0; $i < count($Valida_Pedimento); $i++)
			{ 
				$Producto_by_id = $this->extracciones->Get_Producto_By_id($Valida_Pedimento[$i]['idCatalogo']);

				if ($Producto_by_id != null)
				{
					array_push($idCatalogo,$Valida_Pedimento[$i]['idCatalogo']);
					array_push($Producto,$Producto_by_id[0]['Producto']);
				}

					
			}

			$Sin_Existencias['idCatalogo1'] = $idCatalogo;
			$Sin_Existencias['Producto1'] = $Producto;

			return json_encode($Sin_Existencias);
		}
	}


	public function Eliminar_Extraccion()
	{
		$data = $this->input->post();

		if (!empty($data))
		{
			$Detalle_Venta_Temp = $this->extracciones->Get_Detalle_Venta_Menudeo_Temp_By_IdVenta($data['idVenta']);

			if (!empty($Detalle_Venta_Temp))
			{
				$Des_Existencias = $this->extracciones->Agregar_Existencias($Detalle_Venta_Temp,$data['idVenta']);

				if ($Des_Existencias != 0)
				{
					print_r('9999');
					exit();
				}
				else
				{
					print_r('003');
					exit();
				}
			}
			else
			{
				print_r('002');
				exit();
			}
		}
		else
		{
			print_r('001');
			exit();
		}
	
	}

	/*public function Regresar_Existencias($Detalle_Venta_Temp)
	{
		for ($i=0; $i < count($Detalle_Venta_Temp); $i++)
		{ 
			if ($Detalle_Venta_Temp[$i]['idDetalle_inventario'] != null && $Detalle_Venta_Temp[$i]['idDetalle_inventario'] != "")
			{
				# code...
			}
		}
	}*/

}
