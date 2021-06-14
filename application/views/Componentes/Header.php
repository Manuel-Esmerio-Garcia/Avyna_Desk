<?php defined('BASEPATH') OR exit('No direct script access allowed');?>
<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
			<title><?php echo $PageTitle ?></title>
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/bootstrap.min.css') ?>">
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/font-awesome.min.css') ?>">
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/ionicons.min.css') ?>">
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/AdminLTE.min.css') ?>">
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/_all-skins.min.css') ?>">
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/blue.css') ?>">
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/morris.css') ?>">
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/jquery-jvectormap-1.2.2.css') ?>">
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/bootstrap3-wysihtml5.min.css') ?>">
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/bootstrap-datetimepicker.min.css') ?>">
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/datatables.min.css') ?>"/>
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/bootstrap-toggle.min.css') ?>"/>
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/toastr.css') ?>">
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/Cargando.css') ?>">
			<link rel="stylesheet" href="<?php echo base_url('assets/css/plantilla/picker.css') ?>">
			<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/jquery.steps.css') ?>">

			<link rel="stylesheet" href="https://unpkg.com/highlightjs@9.12.0/styles/github.css">
			
			<!-- Cargar Style badge -->
			<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/class/style.css')?>">
			
			<!-- Validación Cargar CSS Facturación Update 08/07/2019-->
			<?php if($PageTitle == 'Facturación'){?><link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/class/wizard.css')?>"><?php }?>
			<!-- Validación Cargar CSS Facturación Update 08/07/2019-->

			<!-- Js de Reporte Venta Cliente -->
			<?php if ($PageTitle == 'Reporte Venta Cliente'){ ?>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
			<?php }?>

			<!-- Preloading -->
			<div id="loader">
			    <svg width="70" height="20">
				    <circle cx="10" cy="10" r="0">
				       <animate attributeName="r" from="0" to="10" values="0;10;10;10;0" dur="1000ms" repeatCount="indefinite"/>
				    </circle>
				    <circle cx="35" cy="10" r="0">
				       <animate attributeName="r" from="0" to="10" values="0;10;10;10;0" begin="200ms" dur="1000ms" repeatCount="indefinite"/>
				    </circle>
				    <circle cx="60" cy="10" r="0">
				       <animate attributeName="r" from="0" to="10" values="0;10;10;10;0" begin="400ms" dur="1000ms" repeatCount="indefinite"/>
				    </circle>
			    </svg>
			</div>
		    <style>
		        svg {position: fixed; top: 0; left: 0; right: 0; bottom: 0; margin: auto;}
		       	circle { fill: #51bbbd; }
		       	#loader{display: none; width: 100%;	height: 100%; background: rgba(255,255,255,.6); position: fixed; flex-flow: row; justify-content: center; align-items: center; top: 0; z-index: 999;}
		    </style>
		</head>
		<body class="hold-transition skin-blue sidebar-mini">
			<!-- Cargando -->
			<div class="wrap" id="Cargando_Header" style="display: none;">
		      <div class="loading">
		        <div class="bounceball"></div>
		        <div class="text">&nbsp; &nbsp; Cargando...</div>
		      </div>
		    </div>
			
			<!-- Tabla Region -->
			<div class="table-responsive" style="display: none;">
				<table id="Table_Header_Region">
					<thead>
						<tr>
							<th>Region</th>
						</tr>
					</thead>
					<tbody>
						<?php for ($i=0; $i < count($_SESSION['Region']); $i++){ ?>
							<tr>
								<td><?php echo $_SESSION['Region'][$i]['Region'] ?></td>
							</tr>
				        <?php } ?>
					</tbody>
				</table>
			</div>

			<div class="wrapper">
				<!-- header index -->
				<header class="main-header">
					<!-- Logo -->
					<a href="<?php echo site_url('Controller_index'); ?>" class="logo">
						<!-- mini logo for sidebar mini 50x50 pixels -->
						<span class="logo-mini"><b>A</b>VY</span>
						<!-- logo for regular state and mobile devices -->
						<span class="logo-lg"><b>Avyna</b> Cosmeticos</span>
					</a>
					<!-- Header Navbar: style can be found in header.less -->
					<nav class="navbar navbar-static-top">
						<!-- Sidebar toggle button-->
						<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
							<span class="sr-only">Toggle navigation</span>
						</a>
						<div class="navbar-custom-menu">
							<ul class="nav navbar-nav">
								<li class="dropdown user user-menu">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown">
	              						<img src="<?php echo base_url('assets/img/user2-160x160.jpg') ?>" class="user-image" alt="User Image">
	              						<span class="hidden-xs"><?php echo $_SESSION['Avyna'][0]['Nombre'].' '.$_SESSION['Avyna'][0]['Apellidos']; ?></span>
	              						<small><?php echo $_SESSION['Avyna'][0]['Puesto']; ?></small>
	            					</a>
									<ul class="dropdown-menu">
										<!-- User image -->
										<li class="user-header">
											<img src="<?php echo base_url('assets/img/user2-160x160.jpg') ?>" class="img-circle" alt="User Image">
											<p>
												<?php echo $_SESSION['Avyna'][0]['Nombre']; ?>
												<?php echo $_SESSION['Avyna'][0]['Puesto']; ?>
											</p>
											<p id="ID_Usuario" hidden="hidden"><?php echo $_SESSION['Avyna'][0]['ID'];?></p>
										</li>
										<!-- Menu Footer-->
										<li class="user-footer">
											<div class="pull-left">
												<a href="<?php echo site_url('Controller_Configuracion_Usuario'); ?>" class="btn btn-default"><i class="fa fa-gear fa-fw"></i> Configuración</a>
											</div>
											<div class="pull-right">
												<a id="cerrarSesion2" class="btn btn-default"><i class="fa fa-sign-out fa-fw"></i> Cerrar Sesión</a>
												<a id="loadingCerrarSesion2" class="btn btn-default" style="display: none;"><i class="fa fa-spinner fa-spin"></i> Cerrar Sesión</a>
											</div>
										</li>
									</ul>
								</li>
								<li>
									<a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
								</li>
								<!-- Spinner Loading nav -->
								<li style="display: none;" id="loadingHeader">
									<a><i class="fa fa-spinner fa-spin" style="font-size:24px"></i></a>
								</li>
								<!-- Spinner Loading nav -->
							</ul>
						</div>
					</nav>
				</header>

				<!-- Left side column. contains the logo and sidebar -->
				<aside class="main-sidebar">
					<!-- sidebar: style can be found in sidebar.less -->
					<section class="sidebar">
						<!-- Sidebar user panel -->
						<div class="user-panel">
							<div class="pull-left image">
								<img src="<?php echo base_url('assets/img/user2-160x160.jpg') ?>" class="img-circle" alt="User Image">
							</div>
							<div class="pull-left info">
								<p><?php echo $_SESSION['Avyna'][0]['Nombre'];?></p>
								<a href="#"><i class="fa fa-circle text-success"></i> Online</a>
							</div>
						</div>
						<!-- search form -->
						<form action="#" method="get" class="sidebar-form">
							<div class="input-group">
								<input type="text" name="q" class="form-control" placeholder="Buscar...">
								<span class="input-group-btn">
	                				<button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
	             				</span>
							</div>
						</form>
						<!-- Inicio Menu lateral -->
						<ul class="sidebar-menu">
							<li class="header">NAVEGACIÓN PRINCIPAL</li>
							<li class="active treeview">
								<a href="<?php echo site_url('Controller_index'); ?>">
									<i class="fa fa-home"></i> <span> Inicio</span>
								</a>
							</li>

							<!-- Validación Permisos Promoción -->
							<?php if (count($_SESSION['Permisos']) > 0){
								if (is_int(array_search('Promociones', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
									<li><a id="promociones" href="#"><i class="fa fa-circle-o"></i> <span>Promociones</span></a></li>
									<li id="loadingPromociones" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> <span>Promociones</span></a></li>
								<?php }
							}?>								
							<!-- Validación Permisos Promoción -->

							<!-- Validación Permisos Cupones -->
							<?php if (count($_SESSION['Permisos']) > 0){
								if (is_int(array_search('Cupones', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
									<li><a id="cupones" href="#"><i class="fa fa-circle-o"></i> <span>Cupones</span></a></li>
									<li id="loadingCupones" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> <span>Cupones</span></a></li>
								<?php }
							}?>								
							<!-- Validación Permisos Cupones -->
							
							<!-- START Validación Manejo -->
							<li class="treeview">
								<a href="#">
									<i class="fa fa-dot-circle-o" aria-hidden="true"></i><span>Manejo</span>
									<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
								</a>
								<ul class="treeview-menu">
									<!-- Validación Permisos Ventas -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if ($_SESSION['Avyna'][0]['Ventas'] == 1) { ?>
											<li><a id="ventas"><i class="fa fa-circle-o"></i> Ventas</a></li>
											<li id="loadingVentas" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Ventas</a></li>
										<?php }
									}?>								
									<!-- Validación Permisos Ventas -->

									<!-- Validación Permisos Compras -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Compras', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="compras" href="#"><i class="fa fa-circle-o"></i> Compras</a></li>
											<li id="loadingCompras" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Compras</a></li>
										<?php }
									}?>								
									<!-- Validación Permisos Compras -->

									<!-- Validación Permisos Inventario Interno -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('InventarioInterno', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="inventarioInterno" href="#"><i class="fa fa-circle-o"></i> Inventario Interno</a></li>
											<li id="loadingInventarioInterno" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Inventario Intenro</a></li>
										<?php }
									}?>								
									<!-- Validación Permisos Inventario Interno -->

									<!-- Validación Permisos Inventario -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Inventario', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="inventario" href="#"><i class="fa fa-circle-o"></i> Inventario</a></li>
											<li id="loadingInventario" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Inventario</a></li>
										<?php }
									}?>								
									<!-- Validación Permisos Inventario -->

									<!-- Validación Permisos Cuentas Por Cobrar -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Cuentas_x_cobrar', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="cuentas" href="#"><i class="fa fa-circle-o text-default"></i> Cuentas x Cobrar</a></li>
											<li id="loadingCuentas" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Cuentas x Cobrar</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Cuentas Por Cobrar -->

									<!-- Validación Permisos Facturacion -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Facturacion', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="facturacion" href="#"><i class="fa fa-circle-o text-default"></i> Facturación</a></li>
											<li id="loadingFacturacion" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Facturación</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Facturacion -->

									<!-- Validación Permisos Facturacion de Exportación -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Facturacion_expo', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="facturacionExportacion" href="#" onclick="handleClick('facturacionExportacion','loadingFacturacionExportacion','Controller_Factura_Exportacion')"><i class="fa fa-circle-o text-default"></i> Facturación Exportación</a></li>
											<li id="loadingFacturacionExportacion" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Facturación Exportación</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Facturacion de Exportación -->

									<!-- Validación Permisos Facturacion Generica -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Factura Generica', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="facturaGenerica" href="#"><i class="fa fa-circle-o text-default"></i> Factura Generica</a></li>
											<li id="loadingFacturaGenerica" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Factura Generica</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Facturacion Generica -->

									<!-- Validación Permisos Guias Envio -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Guias envio', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="guiasEnvio"  href="#"><i class="fa fa-circle-o text-default"></i> Guias Envios</a></li>									
											<li id="loadingGuiasEnvio" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Guias Envios</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Guias Envio -->
								</ul>
							</li>
							<!-- END Validación Manejo -->

							<!-- START Validación Operaciones -->
							<li class="treeview">
								<a href="#">
									<i class="fa fa-tasks" aria-hidden="true"></i> <span>Operaciones</span>
									<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
								</a>
								<ul class="treeview-menu">
									<!-- Validación Permisos Ventas Web -->
									<?php if (count($_SESSION['Permisos']) > 0){
											if (is_int(array_search('Ventas Web', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
												<li><a id="ventasWeb" href="#"><i class="fa fa-circle-o text-default"></i> Ventas Web</a></li>
												<li id="loadingVentasWeb" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Ventas Web</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Ventas Web -->

									<!-- Validación Permisos Ventas Directas -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Ventas Directas', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="ventasDirectas" href="#"><i class="fa fa-circle-o text-default"></i> Ventas Directas</a></li>
											<li id="loadingVentasDirectas" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Ventas Directas</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Ventas Directas -->

									<!-- Validación Permisos Extracciones -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Extracciones', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="extracciones" href="#"><i class="fa fa-circle-o text-default"></i> Extracciones</a></li>
											<li id="loadingExtracciones" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Extracciones</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Extracciones -->

									<!-- Validación Permisos Empaques -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Empaques', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="Empaques"><i class="fa fa-circle-o text-default"></i> Empaques</a></li>
											<li id="loadingEmpaques" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Empaques</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Empaques -->

									<!-- Validación Permisos Recolección -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Recolecciones', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="recolecciones" href="#"><i class="fa fa-circle-o text-default"></i> Recolecciones</a></li>
											<li id="loadingRecolecciones" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Recolecciones</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Recolección -->

									<!-- Validación Permisos Picking -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Picking', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="picking" href="#"><i class="fa fa-circle-o text-default"></i> Picking</a></li>
											<li id="loadingPicking" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Picking</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Picking -->

									<!-- Validación Envios -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Envios', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="Envios"><i class="fa fa-circle-o text-default"></i> Envios</a></li>
											<li id="loadingEnvios" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Envios</a></li>
										<?php }
									}?>
								</ul>
							</li>
							<!-- END Validación Operaciones -->

							<!-- Validación Catalogo -->
							<li class="treeview">
								<a href="#">
									<i class="fa fa-dropbox" aria-hidden="true"></i> <span>Catalogo</span>
									<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
								</a>
								<ul class="treeview-menu">
									<!-- Validación Permisos Bodega -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Bodega', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="Bodega" href="#"><i class="fa fa-circle-o text-default"></i> Bodega</a></li>
											<li id="loadingBodega" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Bodega</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Bodega -->
									
									<!-- Validación Permisos Usuarios -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Usuarios', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="Usuarios" href="#"><i class="fa fa-circle-o text-default"></i> Usuarios</a></li>
											<li id="loadingUsuarios" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Usuarios</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Usuarios -->

									<!-- Validación Permisos Productos -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Productos', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="Productos" href="#"><i class="fa fa-circle-o text-default"></i> Productos</a></li>
											<li id="loadingProductos" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Productos</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Productos -->

									<!-- Validación Permisos Usuarios Packing -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Usuario_Packing', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="usuarioPacking" href="#"><i class="fa fa-circle-o text-default"></i> Usuarios Packing</a></li>
											<li id="loadingUsuarioPacking" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Usuarios Packing</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Usuarios Packing -->

									<!-- Validación Permisos Proveedores -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Proveedores', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="proveedores" href="#"><i class="fa fa-circle-o text-default"></i> Proveedores</a></li>
											<li id="loadingProveedores" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Proveedores</a></li>
										<?php }
									}?>						
									<!-- Validación Permisos Proveedores -->

									<!-- Validación Permisos Distribuidores -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Distribuidores', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="distribuidor" href="#"><i class="fa fa-circle-o text-default"></i> Distribuidores</a></li>
											<li id="loadingDistribuidor" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Distribuidores</a></li>
										<?php }
									}?>						
									<!-- Validación Permisos Distribuidores -->

									<!-- Validación Permisos Clientes -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Clientes', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="Clientes"><i class="fa fa-circle-o text-default"></i> Clientes</a></li>
											<li id="loadingClientes" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Clientes</a></li>
										<?php }
									}?>						
									<!-- Validación Permisos Clientes -->

									<!-- Validación Permisos Clientes Web -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Clientes Web', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="clientesWeb" href="#"><i class="fa fa-circle-o text-default"></i> Clientes Web</a></li>
											<li id="loadingClientesWeb" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Clientes Web</a></li>
										<?php }
									}?>	
									<!-- Validación Permisos Clientes Web -->

									<!-- Validación Permisos Bloques -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Bloques', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="Bloques"><i class="fa fa-circle-o text-default"></i> Bloques Distribuidores</a></li>
											<li id="loadingBloques" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Bloques Distribuidores</a></li>
										<?php }
									}?>	
									<!-- Validación Permisos Bloques -->

									<!-- Validación Permisos Zonas -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Zonas', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="Zonas"><i class="fa fa-circle-o text-default"></i> Zonas Distribuidores</a></li>
											<li id="loadingZonas" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Zonas Distribuidores</a></li>
										<?php }
									}?>	
									<!-- Validación Permisos Zonas -->

								</ul>
							</li>
							<!-- END Validación Catalogo -->

							<!-- START Validación Tickets -->
							<li class="treeview">
								<a href="#">
									<i class="fa fa-ticket" aria-hidden="true"></i> <span>Ticket</span>
									<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
								</a>
								<ul class="treeview-menu">

									<!-- Validación Permisos HelpDesk -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('HelpDesk', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="HelpDesk"><i class="fa fa-circle-o text-default"></i> HelpDesk</a></li>
											<li id="loadingHelpDesk" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> HelpDesk</a></li>
										<?php }
									}?>	
									<!-- Validación Permisos HelpDesk -->

									<!-- Validación Permisos Ticket -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Ticket', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li><a id="Ticket"><i class="fa fa-circle-o text-default"></i> Ticket</a></li>
											<li id="loadingTicket" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Ticket</a></li>
										<?php }
									}?>	
									<!-- Validación Permisos Ticket -->
								</ul>
							</li>
							<!-- END Validación Tickets -->

							<!-- START Validación Configuración -->
							<li class="treeview">
								<a href="#">
									<i class="fa fa-cogs" aria-hidden="true"></i> <span>Configuración</span>
									<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
								</a>
								<ul class="treeview-menu">
									<!-- Opción Configuración Update 20/06/2019 -->
									<!-- Validación Permisos Roles -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Roles', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li id="roles"><a href="#"><i class="fa fa-circle-o" aria-hidden="true"></i> Roles</a></li>
											<li id="loadingRoles" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Roles</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Roles -->
									<!-- Opción Configuración Update 20/06/2019 -->

									<!-- Validación Permisos Roles -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Configuracion', array_column($_SESSION['listPermisos'], 'Modulo')))){?>
											<li id="Configuracion"><a href="#"><i class="fa fa-circle-o" aria-hidden="true"></i> Configuración General</a></li>
											<li id="loadingConfiguracion" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Configuración General</a></li>
										<?php }
									}?>
									<!-- Validación Permisos Roles -->

								</ul>
							</li>
							<!-- END Validación Configuración -->

							<!-- Validación Reportes -->
							<li class="treeview">
								<a href="#">
									<i class="fa fa-bar-chart" aria-hidden="true"></i> <span>Reportes</span>
									<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
								</a>
								<ul class="treeview-menu">
									<!-- Validación Permisos Reporte Guia -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Reportes', array_column($_SESSION['listPermisos'], 'Modulo')))){
											if (is_int(array_search('Reportes_Guias', array_column($_SESSION['Permisos'], 'Permiso')))){ ?>
												<li><a id="reporteGuia" href="#"><i class="fa fa-circle-o text-default"></i> Reporte Guia</a></li>
												<li id="loadingReporteGuia" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Reporte Guia</a></li>
										<?php }
										}
									}?>
									<!-- Validación Permisos Reporte Guia -->

									<!-- Validación Permisos Reporte Extracciones Int -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Reportes', array_column($_SESSION['listPermisos'], 'Modulo')))){
											if (is_int(array_search('Reportes_Extracciones_Int', array_column($_SESSION['Permisos'], 'Permiso')))){ ?>
												<li><a id="reporteExtraccionesInt" href="#"><i class="fa fa-circle-o text-default"></i> Reporte Extracciones Int.</a></li>
												<li id="loadingReporteExtraccionesInt" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Reporte Extracciones Int.</a></li>
										<?php }
										}
									}?>
									<!-- Validación Permisos Reporte Extracciones Int -->
								
									<!-- Validación Permisos Reporte Venta Cliente -->
									<?php if (count($_SESSION['Permisos']) > 0){
											if (is_int(array_search('Reportes', array_column($_SESSION['listPermisos'], 'Modulo')))){
												if (is_int(array_search('Reporte_venta_cliente_ver', array_column($_SESSION['Permisos'], 'Permiso')))){ ?>
													<li><a id="reporteCliente" href="#"><i class="fa fa-circle-o"></i> Reporte Venta Cliente</a></li>
													<li id="loadingreporteCliente" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Reporte Venta Cliente</a></li>
											<?php }
										}
									}?>					
									<!-- Validación Permisos Reporte Venta Cliente -->

									<!-- Validación Permisos Reporte Venta Salones -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Reportes', array_column($_SESSION['listPermisos'], 'Modulo')))){
											if (is_int(array_search('Reporte_ventas_salones_ver', array_column($_SESSION['Permisos'], 'Permiso')))){ ?>
												<li><a id="reporteSalones" href="#"><i class="fa fa-circle-o"></i> Reporte Ventas Salones</a></li>
												<li id="loadingreporteSalones" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Reporte Ventas Salones</a></li>
											<?php }
										}
									}?>					
									<!-- Validación Permisos Reporte Venta Salones -->

									<!-- Validación Permisos Reporte Venta X Salon -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Reportes', array_column($_SESSION['listPermisos'], 'Modulo')))){
											if (is_int(array_search('Reporte_ventas_x _salones_ver', array_column($_SESSION['Permisos'], 'Permiso')))){ ?>
												<li><a id="reportexSalones" href="#"><i class="fa fa-circle-o"></i> Reporte Ventas x Salones</a></li>
												<li id="loadingreportexSalones" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Reporte Ventas x Salones</a></li>
											<?php }
										}
									}?>						
									<!-- Validación Permisos Reporte Venta X Salon -->

									<!-- Validación Permisos Reporte Ventas -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Reportes', array_column($_SESSION['listPermisos'], 'Modulo')))){
											if (is_int(array_search('Reporte_ventas', array_column($_SESSION['Permisos'], 'Permiso')))){ ?>
												<li><a id="reporteVentas" href="#"><i class="fa fa-circle-o"></i> Reporte Ventas</a></li>
												<li id="loadingreporteVentas" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Reporte Ventas</a></li>
											<?php }
										}
									}?>						
									<!-- Validación Permisos Reporte Ventas -->

									<!-- Validación Permisos Reporte VFP -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Reportes', array_column($_SESSION['listPermisos'], 'Modulo')))){
											if (is_int(array_search('Reporte_VPF', array_column($_SESSION['Permisos'], 'Permiso')))){ ?>
												<li><a id="reporteVPF" href="#"><i class="fa fa-circle-o"></i> Reporte VPF</a></li>
												<li id="loadingreporteVPF" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Reporte VPF</a></li>
											<?php }
										}
									}?>					
									<!-- Validación Permisos Reporte VFP -->

									<!-- Validación Permisos Reporte Inventario VS Minimo -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Reportes', array_column($_SESSION['listPermisos'], 'Modulo')))){
											if (is_int(array_search('Reporte_VS', array_column($_SESSION['Permisos'], 'Permiso')))){ ?>
												<li><a id="reporteVS" href="#"><i class="fa fa-circle-o"></i> Reporte Inventario vs Minimo</a></li>
												<li id="loadingreporteVS" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Reporte Inventario vs Minimo</a></li>
											<?php }
										}
									}?>						
									<!-- Validación Permisos Reporte Inventario VS Minimo -->

									<!-- Validación Permisos Reporte Extracciones Productos Por Mes -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Reportes', array_column($_SESSION['listPermisos'], 'Modulo')))){
											if (is_int(array_search('Reporte_Extracciones', array_column($_SESSION['Permisos'], 'Permiso')))){ ?>
												<li><a id="reporteExtraccionesMes" href="#"><i class="fa fa-circle-o"></i> Extracciones Productos por Mes</a></li>
												<li id="loadingreporteExtraccionesMes" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Extracciones Productos por Mes</a></li>
											<?php }
										}
									}?>						
									<!-- Validación Permisos Reporte Extracciones Productos Por Mes -->

									<!-- Validación Permisos Reporte por Comisión -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Reportes', array_column($_SESSION['listPermisos'], 'Modulo')))){
											if (is_int(array_search('Reporte_Comisiones', array_column($_SESSION['Permisos'], 'Permiso')))){ ?>
												<li><a id="reportexComision" href="#"><i class="fa fa-circle-o"></i> Reporte por Comisión</a></li>
												<li id="loadingreportexComision" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Reporte por Comisión</a></li>
										<?php }
										}
									}?>
									<!-- Validación Permisos Reporte Por Comisión -->

									<!-- Validación Permisos Reporte Ventas Por Distribuidor Semanal -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Reportes', array_column($_SESSION['listPermisos'], 'Modulo')))){
											if (is_int(array_search('Reporte_Dist_Semanal', array_column($_SESSION['Permisos'], 'Permiso')))){ ?>
												<li><a id="reporteXDistSemanal" href="#"><i class="fa fa-circle-o text-default"></i> Ventas x Dist. Semanal</a></li>
												<li id="loadingreporteXDistSemanal" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Ventas x Dist. Semanal</a></li>
										<?php }
										}
									}?>
									<!-- Validación Permisos Reporte Ventas Por Distribuidor Semanal -->

									<!-- Validación Permisos Reporte Ventas Por Distribuidor Mensual -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Reportes', array_column($_SESSION['listPermisos'], 'Modulo')))){
											if (is_int(array_search('Reporte_Distr_Mensual', array_column($_SESSION['Permisos'], 'Permiso')))){ ?>
												<li><a id="reporteXDistMensual" href="#"><i class="fa fa-circle-o text-default"></i> Ventas x Dist. Mensual</a></li>
												<li id="loadingreporteXDistMensual" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Ventas x Dist. Mensual</a></li>
										<?php }
										}
									}?>
									<!-- Validación Permisos Reporte Ventas Por Distribuidor Mensual -->

									<!-- Validación Permisos Reporte por Distribuidor -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Reportes', array_column($_SESSION['listPermisos'], 'Modulo')))){
											if (is_int(array_search('Reporte_Dist_Bloques', array_column($_SESSION['Permisos'], 'Permiso')))){ ?>
												<li><a id="reporteXBloques" href="#"><i class="fa fa-circle-o text-default"></i> Bloques por distribuidor</a></li>
												<li id="loadingreporteXBloques" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Bloques por distribuidor</a></li>
										<?php }
										}
									}?>
									<!-- Validación Permisos Reporte Por Distribuidor -->	

									<!-- Validación Permisos Reporte Visitas Salones -->
									<?php if (count($_SESSION['Permisos']) > 0){
										if (is_int(array_search('Reportes', array_column($_SESSION['listPermisos'], 'Modulo')))){
											if (is_int(array_search('Reporte_Visita_Salones', array_column($_SESSION['Permisos'], 'Permiso')))){ ?>
												<li><a id="reporteVisitaSalones" href="#"><i class="fa fa-circle-o text-default"></i> Visitas Salones</a></li>
												<li id="loadingreporteVisitaSalones" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Visitas Salones</a></li>
										<?php }
										}
									}?>
									<!-- Validación Permisos Reporte Visitas Salones -->

								</ul>
							</li>
							<!-- END Validación Reportes -->
							
							<!-- Boton Cerrar Sesión -->
							<li class="treeview">
								<li id="cerrarSesion"><a href="#"><i class="fa fa-power-off" aria-hidden="true"></i> <span> Cerrar Sesión</span></a></li>
								<li id="loadingCerrarSesion" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> <span> Cerrar Sesión</span></a></li>
							</li>
							<!-- Boton Cerrar Sesión -->

						</ul>
					</section>
				</aside>

				<!-- Content Wrapper. Contains page content -->
				<div class="content-wrapper">
					<!-- Content Header (Page header) -->
					<section class="content-header">
						<h1><?php echo $PageTitle ?></h1>
						<br>
						<ol class="breadcrumb">
							<li>
								<a href="<?php echo site_url('Controller_index'); ?>"><i class="fa fa-home"></i> Inicio</a>
							</li>
							<li class="active">
								<?php echo $PageTitle ?>
							</li>
						</ol>
					</section>

					<!-- Modal -->
					<div id="modalErrorConexion" class="modal fade" role="dialog">
					  <div class="modal-dialog">
					    <!-- Modal content-->
					    <div class="modal-content" style="color: white; background-color: #222d32;">
					      <div class="modal-header">
					        <h4 class="modal-title">Error de Conexión</h4>
					      </div>
					      <div class="modal-body">
					        <p>No se puede establecer conexión con la red. Verifica la conexión de datos y vuelve a intentarlo. </p>
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-danger" data-dismiss="modal">OK</button>
					      </div>
					    </div>
					  </div>
					</div>

				