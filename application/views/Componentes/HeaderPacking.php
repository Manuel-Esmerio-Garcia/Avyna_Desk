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

			<div class="wrapper">
				<!-- header index -->
				<header class="main-header">
					<!-- Logo -->
					<a href="<?php echo site_url('Controller_index'); ?>" class="logo">
						<!-- mini logo for sidebar mini 50x50 pixels -->
						<span class="logo-mini"><b>A</b>VY</span>
						<!-- logo for regular state and mobile devices -->
						<span class="logo-lg"><b>Avyna</b> Packing</span>
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
	              						<span class="hidden-xs"><?php echo $_SESSION['Avyna'][0]['Nombre'].' '.$_SESSION['Avyna'][0]['Apellido']; ?></span>
	            					</a>
									<ul class="dropdown-menu">
										<!-- User image -->
										<li class="user-header">
											<img src="<?php echo base_url('assets/img/user2-160x160.jpg') ?>" class="img-circle" alt="User Image">
											<p>
												<?php echo $_SESSION['Avyna'][0]['Nombre']; ?>
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
						<!-- Inicio Menu lateral -->
						<ul class="sidebar-menu">
							<li class="header">NAVEGACIÓN PRINCIPAL</li>
							<li class="active treeview">
								<a href="<?php echo site_url('Controller_index'); ?>">
									<i class="fa fa-home"></i> <span> Inicio</span>
								</a>
							</li>

                            <li><a id="picking" href="#"><i class="fa fa-circle-o text-default"></i> Picking</a></li>
                            <li id="loadingPicking" style="display: none;"><a href="#"><i class="fa fa-spinner fa-spin"></i> Picking</a></li>
							
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

				