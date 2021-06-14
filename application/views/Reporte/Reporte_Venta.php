<br>
<div id="page-wrapper">
	<div class="container-fluid">
		<div id="page-wrapper">
			<div class="container-fluid">

				<ul class="nav nav-tabs">
					<li class="active"><a data-toggle="tab" href="#General">General</a></li>
					<li><a data-toggle="tab" href="#Venta_Menudeo">Ventas Menudeo</a></li>
				</ul>

				<div class="tab-content">
					<div id="General" class="tab-pane fade in active">
						<h3>Reporte General</h3>
						<hr>
						<form action="<?php echo base_url('Clases/Exportar_Reporte_Ventas.php') ?>" method="post"
							accept-charset="utf-8">
							<div class="col-sm-2">
								<div class="form-group">
									<label>Desde:</label>
									<div class="input-group">
										<input type="text" class="form-control" id="start_date_Ventas" name="dateBegin"
											autocomplete="off"
											placeholder="<?php echo date('Y-m-d') ?>">
										<span class="input-group-addon"><i
												class="glyphicon glyphicon-calendar"></i></span>
									</div>
								</div>
							</div>
							<div class="col-sm-2">
								<div class="form-group">
									<label>Hasta:</label>
									<div class="input-group">
										<input type="text" class="form-control" id="end_date_Ventas" name="dateEnd"
											autocomplete="off"
											placeholder="<?php echo date('Y-m-d') ?>">
										<span class="input-group-addon"><i
												class="glyphicon glyphicon-calendar"></i></span>
									</div>
								</div>
							</div>
							<div class="col-sm-1">
								<div class="form-group">
									<input type="button" name="btn_buscar_venta_fecha" id="btn_buscar_venta_fecha"
										class="btn btn-info" value="Buscar" style="margin-top: 25px;">
								</div>
							</div>

							<div class="col-sm-3">
								<label>Sucursal:</label>
								<div class="form-group">
									<select class="form-control" id="cmb_sucursal_ventas" name="selectBranch">
										<option value="">Seleccionar...</option>
										<?php foreach ($Sucursales as $key => $value) { ?>
										<option value="<?php echo $value['Sucursal']; ?>">
											<?php echo utf8_encode(utf8_decode($value["Sucursal"])); ?></option>
										<?php } ?>
									</select>
								</div>
							</div>
							<div class="col-sm-3">
								<label>Status:</label>
								<div class="form-group">
									<select class="form-control" id="cmb_status_ventas" name="selectStatus">
										<option value="">Seleccionar...</option>
										<?php foreach ($Status as $key => $value) { ?>
										<option value="<?php echo $value['Status'] ?>">
											<?php echo utf8_encode(utf8_decode($value["Status"])); ?></option>
										<?php } ?>
									</select>
								</div>
							</div>

							<div class="row">
								<!-- PANEL DATOS CLIENTES -->
								<div class="col-lg-12">
									<!-- Panel Info -->
									<div class="panel panel-default">
										<div class="panel-heading">
											<h4 class="panel-title">
												<span class="glyphicon glyphicon-th" aria-hidden="true"></span>

												<a data-toggle="collapse" href="#collapse0"> Ventas Generadas <span
														class="glyphicon glyphicon-chevron-up pull-right"
														style="margin-right: 10px;"></span></a>


											</h4>
										</div>

										<!-- Linea de Codigo para Desplegar Formulario -->
										<div id="collapse0" class="panel-collapse collapse in">

											<div class="panel-body">

												<div class="wrap" id="Cargando_Venta" style="display: none;">
													<div class="loading">
														<div class="bounceball"></div>
														<div class="text">&nbsp; &nbsp; Cargando...</div>
													</div>
												</div>

												<div class="col-lg-12 col-md-12 col-sm-12">
													<div class="table-responsive">
														<table id="table_reporte_ventas"
															class="table table-striped table-bordered table-responsive"
															width="100%">
															<thead>
																<tr class="bg-primary">
																	<td>ID</td>
																	<td>Distribuidor</td>
																	<td>Sucursal</td>
																	<td>Total (Precio Salon)</td>
																	<td>Status</td>
																	<td>Fecha</td>
																</tr>
															</thead>
															<tbody>
															</tbody>
														</table>
													</div>
													<br>
													<div class="col-lg-4 col-md-4 col-sm-12">
														<div class="form-group">
															<label>Totales:</label>
															<input type="text" class="form-control" id="SumaTotales"
																disabled style="max-width: 300px;">
														</div>
													</div>
													<div class="col-lg-4 col-md-4 col-sm-12">
														<div class="form-group">
															<label>Subtotales:</label>
															<input type="text" class="form-control" id="SumaSubtotales"
																disabled style="max-width: 300px;">
														</div>
													</div>
													<div class="col-lg-4 col-md-4 col-sm-12">
														<div class="form-group">
															<label>Impuestos:</label>
															<input type="text" class="form-control" id="SumaImpuestos"
																disabled style="max-width: 300px;">
														</div>
													</div>
												</div>

											</div>

											<div class="panel-footer">
												<button type="button" class="btn btn-primary"
													name="Ver_Detalle_Venta" id="Ver_Detalle_Venta">Ver Detalle de la
													Venta Menudeo</button>
												<!--<button type="button" class="btn btn-danger btn-xs" data-toggle="tooltip" title="Descargar PDF" name="Genera_reporte_PDF_Ventas" id="Genera_reporte_PDF_Ventas"><i class="fa fa-file-pdf-o"></i></button>
						           <button type="button" class="btn btn-success btn-xs" name="Genera_reporte_Excel_Ventas" id="Genera_reporte_Excel_Ventas" data-toggle="tooltip" title="Descargar Excel"><i class="fa fa-file-excel-o"></i></button>-->

												<button type="submit" class="btn btn-success"
													style="float: right;">Exportar</button>
											</div>

										</div>
										<!-- FIN Linea de Codigo para Desplegar Formulario -->
									</div>
									<!-- FIN Panel Info -->
								</div>
								<!-- FIN PANEL DATOS CLIENTES -->
							</div>


							<div class="row">

								<!-- PANEL DATOS CLIENTES -->
								<div class="col-lg-12">
									<!-- Panel Info -->
									<div class="panel panel-default">
										<div class="panel-heading">
											<h4 class="panel-title">
												<span class="glyphicon glyphicon-th" aria-hidden="true"></span>

												<a data-toggle="collapse" href="#collapse1"> Ventas Meundeo <span
														class="glyphicon glyphicon-chevron-up pull-right"
														style="margin-right: 10px;"></span></a>


											</h4>
										</div>

										<!-- Linea de Codigo para Desplegar Formulario -->
										<div id="collapse1" class="panel-collapse collapse in">

											<div class="panel-body">

												<div class="table-responsive">
													<table id="table_reporte_ventas_menudeo_ventas"
														class="table table-striped table-bordered table-responsive"
														style="width: 100%">
														<thead>
															<tr class="bg-info">
																<td>ID</td>
																<td>Cliente</td>
																<td>Subtotal</td>
																<td>Impuestos</td>
																<td>Total (Precio Publico)</td>
																<td>Status</td>
																<td>Fecha</td>
															</tr>
														</thead>
														<tbody>

														</tbody>
													</table>
												</div>
											</div>

										</div>
										<!-- FIN Linea de Codigo para Desplegar Formulario -->
									</div>
									<!-- FIN Panel Info -->
								</div>
								<!-- FIN PANEL DATOS CLIENTES -->
							</div>
						</form>							
					</div>

					<div id="Venta_Menudeo" class="tab-pane fade">
						<h3>Reporte Ventas Menudeo</h3>
						<hr>
						<div class="container-fluid">
							<div class="row">
								<div class="col-sm-2">
									<div class="form-group">
										<label>Desde:</label>
										<div class="input-group">
											<input type="text" class="form-control" id="start_date_Ventas_Menudeo"
												placeholder="<?php echo date('Y-m-d') ?>">
											<span class="input-group-addon"><i
													class="glyphicon glyphicon-calendar"></i></span>
										</div>
									</div>
								</div>
								<div class="col-sm-2">
									<div class="form-group">
										<label>Hasta:</label>
										<div class="input-group">
											<input type="text" class="form-control" id="end_date_Ventas_Menudeo"
												placeholder="<?php echo date('Y-m-d') ?>">
											<span class="input-group-addon"><i
													class="glyphicon glyphicon-calendar"></i></span>
										</div>
									</div>
								</div>
								<div class="col-sm-1">
									<div class="form-group">
										<input type="button" name="btn_buscar_venta_fecha_Menudeo"
											id="btn_buscar_venta_fecha_Menudeo" class="btn btn-info" value="Buscar"
											style="margin-top: 25px;">
									</div>
								</div>

								<!--<div class="col-sm-3">
						  		<label>Sucursal:</label>
						  		<div class="form-group">
						  			<select class="form-control" id="cmb_sucursal_ventas_Menudeo">
						  				<option>Seleccionar...</option>
						  				<?php foreach ($Sucursales as $key => $value) { ?>
						  					<option value="<?php $value['ID'] ?>"><?php echo utf8_encode(utf8_decode($value["Sucursal"])); ?></option>
						  				<?php } ?>
						  			</select>
						  		</div>
						  	</div>-->
								<div class="col-sm-3">
									<label>Status:</label>
									<div class="form-group">
										<select class="form-control" id="cmb_status_ventas_Menudeo">
											<option value="">Seleccionar...</option>
											<?php foreach ($Status_Menudeo as $key => $value) { ?>
											<option value="<?php echo $value['Status'] ?>">
												<?php echo utf8_encode(utf8_decode($value["Status"])); ?></option>
											<?php } ?>
										</select>
									</div>
								</div>
							</div>


							<div class="row">
								<div class="col-lg-12">
									<!-- Panel Info -->
									<div class="panel panel-default">
										<div class="panel-heading">
											<h4 class="panel-title">
												<span class="glyphicon glyphicon-th" aria-hidden="true"></span>

												<a data-toggle="collapse" href="#collapse2"> Ventas Menudeo <span
														class="glyphicon glyphicon-chevron-up pull-right"
														style="margin-right: 10px;"></span></a>


											</h4>
										</div>

										<!-- Linea de Codigo para Desplegar Formulario -->
										<div id="collapse2" class="panel-collapse collapse in">

											<div class="panel-body">

												<div class="wrap" id="Cargando_Menudeo" style="display: none;">
													<div class="loading">
														<div class="bounceball"></div>
														<div class="text">&nbsp; &nbsp; Cargando...</div>
													</div>
												</div>

												<div class="table-responsive">
													<table id="table_reporte_ventas_menudeo"
														class="table table-striped table-bordered table-responsive"
														style="width: 100%">
														<thead>
															<tr class="bg-primary">
																<td>ID</td>
																<td>Cliente</td>
																<td>Total</td>
																<td>Subtotal</td>
																<td>Impuesto</td>
																<td>Status</td>
																<td>Fecha</td>
															</tr>
														</thead>
														<tbody>
														</tbody>
													</table>
												</div>
											</div>

											<div class="panel-footer">
												<button class="btn btn-danger btn-xs" data-toggle="tooltip"
													title="Descargar PDF" name="Genera_reporte_PDF"
													id="Genera_reporte_PDF"><i class="fa fa-file-pdf-o"></i></button>
												<button class="btn btn-success btn-xs" name="Genera_reporte_Excel"
													id="Genera_reporte_Excel" data-toggle="tooltip"
													title="Descargar Excel"><i class="fa fa-file-excel-o"></i></button>
											</div>

										</div>
										<!-- FIN Linea de Codigo para Desplegar Formulario -->
									</div>
									<!-- FIN Panel Info -->
								</div>


								<div class="col-lg-12">
									<!-- Panel Info -->
									<div class="panel panel-default">
										<div class="panel-heading">
											<h4 class="panel-title">
												<span class="glyphicon glyphicon-th" aria-hidden="true"></span>

												<a data-toggle="collapse" href="#collapse3"> Listado de Productos <span
														class="glyphicon glyphicon-chevron-up pull-right"
														style="margin-right: 10px;"></span></a>


											</h4>
										</div>

										<!-- Linea de Codigo para Desplegar Formulario -->
										<div id="collapse3" class="panel-collapse collapse in">

											<div class="panel-body">

												<div class="table-responsive">
													<table id="table_reporte_ventas_menudeo_productos"
														class="table table-striped table-bordered table-responsive"
														style="width: 100%">
														<thead>
															<tr class="bg-info">
																<td>ID</td>
																<td>Codigo</td>
																<td>Producto</td>
																<td>Cantidad</td>
																<td>Precio Unitario</td>
																<td>Importe</td>
																<!--<td>Status</td>-->
															</tr>
														</thead>
														<tbody>

														</tbody>
													</table>
												</div>
											</div>

										</div>
										<!-- FIN Linea de Codigo para Desplegar Formulario -->
									</div>
									<!-- FIN Panel Info -->
								</div>


							</div>

						</div>
					</div>


					<!-- Modal -->
					<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
						aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
							<div class="modal-content">
								<div class="modal-header" style="background-color: #1565C0; color: white;">
									<button type="button" class="close" data-dismiss="modal" aria-label="Close"
										style="color: white;">
										<span aria-hidden="true">&times;</span>
									</button>
									<img src="<?php echo base_url(); ?>assets/img/Detalle.png" style="float: left;"
										width="50px" height="50px">
									<h3 class="modal-title" id="exampleModalLongTitle"
										style="text-align: center; font-size: large;">Detalle de la Venta Menudeo</h3>

								</div>
								<div class="modal-body">
									<table id="Tabla_Detalle_Venta"
										class="table table-bordered table-striped table-hover" style="width: 100%">
										<thead>
											<tr class="bg-primary">
												<td>ID</td>
												<td>Codigo</td>
												<td>Producto</td>
												<td>Cantidad</td>
												<td>Precio Unitario</td>
												<td>Importe</td>
											</tr>
										</thead>
										<tbody>

										</tbody>
									</table>

									<hr>
									<div class="row">
										<div class="col-md-4 col-sm-4">
											<div class="panel panel-info">
												<div class="panel-heading">Información Venta Menudeo</div>
												<div class="panel-body">
													<div class="form-group">
														<label class="label label-default">Total de Productos</label>
														<input type="text" id="TotalProductos" class="form-control"
															placeholder="" readonly>
													</div>
													<div class="form-group">
														<label class="label label-default">Total Importes
															Productos</label>
														<input type="text" id="TotalImporte" class="form-control"
															placeholder="" readonly>
													</div>
												</div>
											</div>

											<!--<div class="alert alert-success alert-dismissible fade in">
								    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
								    <strong>Importante</strong> 
								    <br>
								    Información relevante a la venta N° <p id="numID"></p>
								 </div>-->
										</div>
										<div class="col-md-4 col-sm-4">
											<div class="panel panel-info">
												<div class="panel-heading">Totales Venta Menudeo</div>
												<div class="panel-body">
													<div class="form-group">
														<label class="label label-default">Subtotal Ventas
															Menudeo</label>
														<input type="text" id="Subtotal_Menudeo" class="form-control"
															placeholder="" readonly>
													</div>
													<div class="form-group">
														<label class="label label-default">Impuestos Ventas
															Menudeo</label>
														<input type="text" id="Impuestos_Menudeo" class="form-control"
															placeholder="" readonly>
													</div>
													<div class="form-group">
														<label class="label label-default">Descuento Ventas
															Menudeo</label>
														<input type="text" id="Descuento_Menudeo" class="form-control"
															placeholder="" readonly>
													</div>
													<div class="form-group">
														<label class="label label-default">Total Ventas Menudeo</label>
														<input type="text" id="Total_Menudeo" class="form-control"
															placeholder="" readonly>
													</div>
												</div>
											</div>
										</div>
										<div class="col-md-4 col-sm-4">
											<div class="panel panel-info">
												<div class="panel-heading">Totales Venta</div>
												<div class="panel-body">
													<div class="form-group">
														<label class="label label-default">Subtotal Ventas</label>
														<input type="text" id="Subtotal" class="form-control"
															placeholder="" readonly>
													</div>
													<div class="form-group">
														<label class="label label-default">Impuestos Ventas</label>
														<input type="text" id="Impuestos" class="form-control"
															placeholder="" readonly>
													</div>
													<div class="form-group">
														<label class="label label-default">Descuento Ventas</label>
														<input type="text" id="Descuento" class="form-control"
															placeholder="" readonly>
													</div>
													<div class="form-group">
														<label class="label label-default">Total Ventas</label>
														<input type="text" id="Total" class="form-control"
															placeholder="" readonly>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
								</div>
							</div>
						</div>
					</div>


				</div>

			</div>
		</div>
	</div>
</div>



<!-- Modal -->
<div id="myModal_Exportar" class="modal fade" role="dialog">
	<div class="modal-dialog modal-lg">

		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Exportanción</h4>
			</div>
			<div class="modal-body">

				<div class="wrap" id="Cargando_Menudeo_Expo" style="display: none;">
					<div class="loading">
						<div class="bounceball"></div>
						<div class="text">&nbsp; &nbsp; Cargando...</div>
					</div>
				</div>

				<div class="table-responsive">
					<table id="table_reporte_ventas_Expo" class="table table-striped table-bordered table-responsive"
						width="100%">
						<thead>
							<tr class="bg-primary">
								<td>ID</td>
								<td>Distribuidor</td>
								<td>Sucursal</td>
								<td>Total</td>
								<td>Subtotal</td>
								<td>Impuesto</td>
								<td>Status</td>
								<td>Fecha</td>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>

	</div>
</div>
