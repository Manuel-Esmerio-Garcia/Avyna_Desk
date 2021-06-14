<!-- Page Content -->
<div class="row">
	<div class="col-lg-12">
		<br><br>
	</div>
</div>
<div id="page-wrapper">
	<div class="container-fluid">
		<div class="row">

			<!-- PANEL DATOS CLIENTES -->
			<div class="col-lg-12">
				<!-- Panel Info -->
				<div class="panel panel-info">
					<div class="panel-heading">
						<h4 class="panel-title">
							<span class="glyphicon glyphicon-user" aria-hidden="true"></span>
							<a data-toggle="collapse" href="#collapse0"> Configuración de Usuario <span class="glyphicon glyphicon-chevron-up pull-right"></span></a>
						</h4>
					</div>

					<!-- Linea de Codigo para Desplegar Formulario -->
					<div id="collapse0" class="panel-collapse collapse in">
						<div class="panel-body">

							<form>
        
                               <?php foreach ($Datos as $key => $value) : ?>

								<div class="col-lg-12">
									<div class="checkbox" align="right">
										<label><input type="checkbox" name="Estatus_User" id="Estatus_User" value="" <?php if ($value->Status != 'Activo') { echo 'checked'; } ?> disabled> Inactivo</label>
									</div>
								</div>

								<div class="col-lg-12 col-md-12">
									<div class="col-lg-6 col-md-6">
										<div class="form-group">
											<label class="label label-default">Nombre:</label>
											<input type="text" class="form-control" name="Nombre_User" id="Nombre_User" value="<?php echo $value->Nombre?>">
										</div>
									</div>
									<div class="col-lg-6 col-md-6">
										<div class="form-group">
											<label class="label label-default">Apellidos:</label>
											<input type="text" class="form-control" name="Apellidos_User" id="Apellidos_User" value="<?php echo $value->Apellidos?>">
										</div>
									</div>
								</div>

								<!-- Domicilio del Usuario -->

								<div class="col-lg-12 col-md-12">
									<div class="col-lg-6 col-md-6">
										<div class="form-group">
											<label class="label label-default">Domicio:</label>
											<input type="text" class="form-control" name="Domicilio_User" id="Domicilio_User" value="<?php echo $value->Calle_numero?>">
										</div>
									</div>
									<div class="col-lg-6 col-md-6">
										<div class="form-group">
											<label class="label label-default">Colonia:</label>
											<input type="text" class="form-control" name="Colonia_User" id="Colonia_User" value="<?php echo $value->Colonia?>">
										</div>
									</div>
								</div>

								<div class="col-lg-12 col-md-12">
									<div class="col-lg-3 col-md-3">
										<div class="form-group">
											<label class="label label-default">Municipio:</label>
											<input type="text" class="form-control" name="Municipio_User" id="Municipio_User" value="<?php echo $value->Municipio?>">
										</div>
									</div>
									<div class="col-lg-3 col-md-3">
										<div class="form-group">
											<label class="label label-default">Estado:</label>
											<input type="text" class="form-control" name="Estado_User" id="Estado_User" value="<?php echo $value->Estado?>">
										</div>
									</div>
									<div class="col-lg-3 col-md-3">
										<div class="form-group">
											<label class="label label-default">País:</label>
											<input type="text" class="form-control" name="Pais_User" id="Pais_User" value="<?php echo $value->Pais?>">
										</div>
									</div>
									<div class="col-lg-3 col-md-3">
										<div class="form-group">
											<label class="label label-default">CP:</label>
											<input type="text" class="form-control" name="CP_User" id="CP_User" value="<?php echo $value->CP?>">
										</div>
									</div>
								</div>

								<div class="col-lg-12 col-md-12">
									<div class="col-lg-3 col-md-3">
										<div class="form-group">
											<label class="label label-default">Telefono 1:</label>
											<input type="text" class="form-control" name="Telefono1_User" id="Telefono1_User" value="<?php echo $value->Tel1?>">
										</div>
									</div>
									<div class="col-lg-3 col-md-3">
										<div class="form-group">
											<label class="label label-default">Telefono 2:</label>
											<input type="text" class="form-control" name="Telefono2_User" id="Telefono2_User" value="<?php echo $value->Tel2?>">
										</div>
									</div>
									<div class="col-lg-3 col-md-3">
										<div class="form-group">
											<label class="label label-default">Correo Electrónico:</label>
											<input type="email" class="form-control" name="Email_User" id="Email_User" value="<?php echo $value->Email?>">
										</div>
									</div>
									<div class="col-lg-3 col-md-3">
										<div class="form-group">
											<label class="label label-default">Puesto:</label>
											<select class="form-control" name="Puesto_User" readonly>
	  										<?php echo '<option>'; echo $value->Puesto;  echo '</option>';?>
	 										 </select>
										</div>
									</div>
								</div>

								<div class="col-lg-12 col-md-12">
									<div class="form-group">
										<button type="button" class="btn btn-warning" data-title="Edit" data-toggle="modal" data-target="#edit" style="float: right;"><span class="glyphicon glyphicon-cog"></span> Configurar</button>
									</div>
								</div>
										
								<?php endforeach; ?>

							</form>

						</div>
					</div>
					<!-- FIN Linea de Codigo para Desplegar Formulario -->
				</div>
				<!-- FIN Panel Info -->
			</div>



			<!-- PANEL DATOS CLIENTES -->
			<div class="col-lg-12">
				<!-- Panel Info -->
				<div class="panel panel-warning">
					<div class="panel-heading">
						<h4 class="panel-title">
							<span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
							<a data-toggle="collapse" href="#collapse1"> Cambiar Contraseña <span class="glyphicon glyphicon-chevron-up pull-right"></span></a>
						</h4>
					</div>

					<!-- Linea de Codigo para Desplegar Formulario -->
					<div id="collapse1" class="panel-collapse collapse in">
						<div class="panel-body">

							<div class="col-lg-12">
								
								<div class="form-group">
									<input type="text" name="ID_User" class="form-control" style="display:none;" value="<?php echo $_SESSION['Avyna'][0]['ID']; ?>">
								</div>

								<div class="form-group col-lg-4">
										<label class="label label-default">Contraseña Actual:</label>
										<input type="password" class="form-control" name="Contraseña_Actual_User" id="Contraseña_Actual_User" placeholder="Contraseña Actual" value="" maxlength="50" required>
								</div>
			
								<div class="form-group col-lg-4">
										<label class="label label-default">Nueva Contraseña:</label>
										<input type="password" class="form-control" name="Nueva_Contraseña_User" id="Nueva_Contraseña_User" placeholder="Nueva Contraseña" value="" maxlength="50" required>
								</div>
									
								<div class="form-group col-lg-4">
									<label class="label label-default">Confirmar Contraseña:</label>
									<input type="password" class="form-control" name="Confirmar_User" id="Confirmar_User" placeholder="Confirmar Contraseña" value="" maxlength="50" required>
								</div>
							
									<div class="form-group text-center" style="float: right;">
										<button type="button" class="btn btn-warning"><span class="glyphicon glyphicon-lock"></span> Cambiar Contraseña</button>
									</div>
									
							</div>
						</div>
					</div>
					<!-- FIN Linea de Codigo para Desplegar Formulario -->
				</div>
				<!-- FIN Panel Info -->
			</div>
			

			<!-- Ventanas Modales -->
			<div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
							<h4 class="modal-title custom_align" id="Heading">Configurar Perfil</h4>
						</div>
						<div class="modal-body">
						
						<?php foreach ($Datos as $key => $value) : ?>
						
							<div class="form-group">
								<input type="text" name="ID_User" class="form-control" style="display:none;" value="<?php echo $_SESSION['Avyna'][0]['ID']; ?>">
							</div>
						
							<div class="checkbox" align="right">
								<label><input type="checkbox" name="Estatus_User" value="" <?php if ($value->Status != "Activo") { echo 'checked'; } ?> disabled> Inactivo</label>
							</div>
													
							<div class="form-group">
								<label class="label label-default">Nombre Completo:</label>
								<input class="form-control" type="text" name="Nombre_User" placeholder="Nombre Completo" value="<?php echo $value->Nombre ?>" maxlength="50" readonly>
							</div>
							<div class="form-group">
								<label class="label label-default">Correo Electrónico:</label>
								<input class="form-control" type="email" name="Email_User" placeholder="Correo Electrónico" value="<?php echo $value->Email ?>" maxlength="50" readonly>
							</div>
							<div class="form-group">
								<label class="label label-default">Telefono:</label>
								<input type="tel" class="form-control" name="Telefono_User" placeholder="Telefono" value="<?php echo $value->Tel1 ?>" maxlength="13" >
							</div>

							<div class="form-group">
								<label class="label label-default">Telefono Opcional:</label>
								<input type="tel" class="form-control" name="Telefono_Opc_User" placeholder="Telefono Opcional" value="<?php echo $value->Tel2 ?>" maxlength="13" >
							</div>
							<div class="form-group">
								<label class="label label-default">Puesto:</label>
								<select class="form-control" name="Puesto_User" readonly>
  										
  										
    									<?php echo '<option>'; echo $value->Puesto ?>  <?php echo '</option>';?>
    										<!--<option>Consultor</option>
    										<option>Vendedor</option> -->
 										 </select>
							</div>
							
						</div>
						<div class="modal-footer ">
							<input type="submit" class="btn btn-warning btn-lg" style="width: 100%;" value="Modificar">
						</div>
						
						<?php endforeach; ?>
						
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal-dialog -->
			</div>

			<!-- /.row -->
		</div>
		<!-- /.container-fluid -->
	</div>
</div>
<!-- /#page-wrapper -->
