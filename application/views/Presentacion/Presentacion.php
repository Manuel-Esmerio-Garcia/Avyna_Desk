<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

	<!DOCTYPE html>
	<html lang="">

	<head>
		<meta charset="utf-8">
		<title>Inicio de Sesión Xirec Consultores</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">

		<!-- CSS -->
		<link rel='stylesheet' href='http://fonts.googleapis.com/css?family=PT+Sans:400,700'>
		<link href="<?php echo base_url('assets/vendor/bootstrap/css/bootstrap.min.css') ?>" rel="stylesheet">
		<link href="<?php echo base_url('assets/distNew/css/Presentacion.css') ?>" rel="stylesheet">
		<link href="<?php echo base_url('assets/vendor/font-awesome/css/font-awesome.min.css') ?>" rel="stylesheet" type="text/css">

		<script src="<?php echo base_url('assets/js/jquery-3.2.1.js') ?>"></script>
		<script src="<?php echo base_url('assets/vendor/bootstrap/js/bootstrap.min.js') ?>"></script>
		<!-- Presentación -->
		<script src="<?php echo base_url('assets/distNew/js/Presentacion.js') ?>"></script>

	</head>

	<body>

		<!-- Page Content -->
		<div class="row">
			<div class="col-lg-12">
				<br><br>
			</div>
		</div>
		<div id="page-wrapper">
			<div class="container-fluid">
				<div class="row">

					<section style="background:#efefe9;">
						<div class="container">
							<div class="row">
								<div class="board">
									<!-- <h2>Welcome to IGHALO!<sup>™</sup></h2>-->
									<div class="board-inner">
										<ul class="nav nav-tabs" id="myTab1">
											<div class="liner"></div>
											<li class="active">
												<a href="#home" data-toggle="tab" title="welcome">
													<span class="round-tabs one">
                              <i class="glyphicon glyphicon-book"></i>
                      </span>
												</a>
											</li>

											<li class="disabled">
												<a href="#profile" data-toggle="tab" title="profile">
													<span class="round-tabs two">
                         <i class="glyphicon glyphicon-user"></i>
                     </span>
												</a>
											</li>
											<li class="disabled">
												<a href="#messages" data-toggle="tab" title="bootsnipp goodies">
													<span class="round-tabs three">
                          <i class="glyphicon glyphicon-gift"></i>
                     </span> </a>
											</li>

											<li class="disabled">
												<a href="#settings" data-toggle="tab" title="blah blah">
													<span class="round-tabs four">
                              <i class="glyphicon glyphicon-comment"></i>
                         </span>
												</a>
											</li>

											<li class="disabled">
												<a href="#doner" data-toggle="tab" title="completed">
													<span class="round-tabs five">
                              <i class="glyphicon glyphicon-ok"></i>
                         </span> </a>
											</li>

										</ul>
									</div>

									<div class="tab-content" style="background-color: #fff">
										<div class="tab-pane fade in active" id="home">

											<h3 class="head text-center">Welcome to Bootsnipp<sup>™</sup></h3>
											<p class="narrow text-center">
												Lorem ipsum dolor sit amet, his ea mollis fabellas principes. Quo mazim facilis tincidunt ut, utinam saperet facilisi an vim.
											</p>

											<form class="form-horizontal text-center" id="home_form" name="home_form" role="form">
												<fieldset>
													<button type="submit" href="#profile" name="home_form" class="btn-submit btn btn-success btn-outline-rounded green"> Next tab <span style="margin-left:10px;" class="glyphicon glyphicon-send"></span></button>
												</fieldset>
											</form>

										</div>
										<div class="tab-pane fade" id="profile">
											<h3 class="head text-center">Create a Bootsnipp<sup>™</sup> Profile</h3>
											<p class="narrow text-center">
												Lorem ipsum dolor sit amet, his ea mollis fabellas principes. Quo mazim facilis tincidunt ut, utinam saperet facilisi an vim.
											</p>

											<form class="form-horizontal text-center" id="profile_form" name="profile_form" role="form">
												<fieldset>
													<button type="submit" href="#messages" name="profile_form" class="btn-submit btn btn-success btn-outline-rounded green"> Next tab <span style="margin-left:10px;" class="glyphicon glyphicon-send"></span></button>
												</fieldset>
											</form>

										</div>
										<div class="tab-pane fade" id="messages">
											<h3 class="head text-center">Bootsnipp goodies</h3>
											<p class="narrow text-center">
												Lorem ipsum dolor sit amet, his ea mollis fabellas principes. Quo mazim facilis tincidunt ut, utinam saperet facilisi an vim.
											</p>

											<form class="form-horizontal text-center" id="messages_form" name="messages_form" role="form">
												<fieldset>
													<button type="submit" href="#settings" name="messages_form" class="btn-submit btn btn-success btn-outline-rounded green"> Next tab <span style="margin-left:10px;" class="glyphicon glyphicon-send"></span></button>
												</fieldset>
											</form>
										</div>
										<div class="tab-pane fade" id="settings">
											<h3 class="head text-center">Drop comments!</h3>
											<p class="narrow text-center">
												Lorem ipsum dolor sit amet, his ea mollis fabellas principes. Quo mazim facilis tincidunt ut, utinam saperet facilisi an vim.
											</p>

											<form class="form-horizontal text-center" id="settings_form" name="settings_form" role="form">
												<fieldset>
													<button type="submit" href="#doner" name="settings_form" class="btn-submit btn btn-success btn-outline-rounded green"> Next tab <span style="margin-left:10px;" class="glyphicon glyphicon-send"></span></button>
												</fieldset>
											</form>
										</div>
										<div class="tab-pane fade" id="doner">
											<div class="text-center">
												<i class="img-intro icon-checkmark-circle"></i>
											</div>
											<h3 class="head text-center">thanks for staying tuned! <span style="color:#f48260;">♥</span> Bootstrap</h3>
											<p class="narrow text-center">
												Lorem ipsum dolor sit amet, his ea mollis fabellas principes. Quo mazim facilis tincidunt ut, utinam saperet facilisi an vim.
											</p>
										</div>
										<div class="clearfix"></div>
									</div>

								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>

	</body>

	</html>