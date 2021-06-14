<br>
<div id="Comisiones">
	<div class="container-fluid">
		<div id="page-wrapper">
			<div class="container-fluid">

				<ul class="nav nav-tabs">
					<li class="active"><a data-toggle="tab" href="#Venta">Comisiones por Venta</a></li>
					<li><a data-toggle="tab" href="#Salon">Comisiones por Salon</a></li>
					<li><a data-toggle="tab" href="#Distribuidor">Comisiones por Distribuidores</a></li>
				</ul>

				<div class="tab-content">
					<div id="Venta" class="tab-pane fade in active">
						<h3>Comisiones por Venta</h3>
						<hr>
						<div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
							<div class="form-group">
								<label>Desde:</label>
								<div class="input-group input-daterange">
									<input type="text" class="form-control" id="end_date_Ventas" name="dateEnd"
										autocomplete="off"
										placeholder="<?php echo date('Y-m-d') ?>">
									<span class="input-group-addon"><i
											class="glyphicon glyphicon-calendar"></i></span>
								</div>
							</div>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">
							<div class="form-group">
								<label>Hasta:</label>
								<div class="input-group input-daterange">
									<input type="text" class="form-control" id="start_date_Ventas" name="dateBegin"
										autocomplete="off"
										placeholder="<?php echo date('Y-m-d') ?>">
									<span class="input-group-addon"><i
											class="glyphicon glyphicon-calendar"></i></span>
								</div>
							</div>
						</div>
						
						<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
							<div class="form-group">
								<button type="button" class="btn btn-primary" style="margin-top: 25px;" @click="_btnsearch">
									<i class="glyphicon glyphicon-search"></i>
								</button>
							</div>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
							<label>Distribuidor:</label>
							<div class="form-group">
								<select class="form-control" v-model="comision_venta.distribuidor">
									<option value="">Seleccionar...</option>
									<option :value="item.ID" v-for="item in listClient">{{item.Nombre + " " + item.Apellidos}}</option>
								</select>
							</div>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
							<label>% Comisión Salon:</label>
							<div class="form-group">
								<input type="number" class="form-control" v-model="comision_venta.comisionSalon">
							</div>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
							<label>% Comisión Distribuidor:</label>
							<div class="form-group">
								<input type="number" class="form-control" v-model="comision_venta.comisionDistribuidor">
							</div>
						</div>

						<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div class="panel panel-primary">
								<div class="panel-body">
									<div class="row">
										<div class="container-fluid table-responsive">
											<table class="table table-striped table-bordered table-hover" style="width: 100%" id="tableVentas">
												<caption>Pedido</caption>
												<thead>
													<th>ID</th>
													<th>Fecha</th>
													<th>Total</th>
													<th>N° Salon</th>
													<th>Salon</th>
													<th>Monto Comisión Salon (Precio Salon)</th>
													<th>N° Distribuidor</th>
													<th>Distribuidor</th>
													<th>Monto Comisión Distribuidores (Precio Salon)</th>
												</thead>
												<tbody>
													
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="panel-footer">
									<button type="button" class="btn btn-success" @click="_btnExport">Exportar</button>
								</div>
							</div>
						</div>
									
					</div>

					<div id="Salon" class="tab-pane fade">
						<h3>Comisiones por Salon</h3>
						<hr>
						<div class="col-lg-3 col-md-3 col-sm-4 col-xs-4">
							<div class="form-group">
								<label>Desde:</label>
								<div class="input-group input-daterange">
									<input type="text" class="form-control" id="end_date_Salon"
										autocomplete="off"
										placeholder="<?php echo date('Y-m-d') ?>">
									<span class="input-group-addon"><i
											class="glyphicon glyphicon-calendar"></i></span>
								</div>
							</div>
						</div>
						<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
							<div class="form-group">
								<label>Hasta:</label>
								<div class="input-group input-daterange">
									<input type="text" class="form-control" id="start_date_Salon"
										autocomplete="off"
										placeholder="<?php echo date('Y-m-d') ?>">
									<span class="input-group-addon"><i
											class="glyphicon glyphicon-calendar"></i></span>
								</div>
							</div>
						</div>
						<div class="col-lg-3 col-md-3 col-sm-2 col-xs-2">
							<div class="form-group">
								<button type="button" class="btn btn-primary" style="margin-top: 25px;" @click="_btnsearchSalon">
									<i class="glyphicon glyphicon-search"></i>
								</button>
							</div>
						</div>
						<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
							<label>% Comisión Salon:</label>
							<div class="form-group">
								<input type="number" class="form-control" v-model="comision_Salon.comisionSalon" @keyup.enter="_btnsearchSalon">
							</div>
						</div>

						<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div class="panel panel-primary">
								<div class="panel-body">
									<div class="row">
										<div class="container-fluid table-responsive">
											<table class="table table-striped table-bordered table-hover" id="tableSalon" style="width: 100%">
												<caption>Pedido</caption>
												<thead>
													<th>N° Salon</th>
													<th>Salon</th>
													<th>Monto Ventas en Pedido (Precio Salon)</th>
													<th>Monto Comisión Salon (Precio Salon)</th>
												</thead>
												<tbody>
													
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="panel-footer">
									<button type="button" class="btn btn-warning" @click="_btnSendEmailSalon">Enviar Correos</button>
									<button type="button" class="btn btn-success" @click="_btnExportSalon">Exportar</button>
								</div>
							</div>
						</div>
					</div>

					<div id="Distribuidor" class="tab-pane fade">
						<h3>Comisiones por Distribuidores</h3>
						<hr>

						<div class="col-lg-3 col-md-3 col-sm-4 col-xs-4">
							<div class="form-group">
								<label>Desde:</label>
								<div class="input-group input-daterange">
									<input type="text" class="form-control" id="end_date_Distri"
										autocomplete="off"
										placeholder="<?php echo date('Y-m-d') ?>">
									<span class="input-group-addon"><i
											class="glyphicon glyphicon-calendar"></i></span>
								</div>
							</div>
						</div>
						<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
							<div class="form-group">
								<label>Hasta:</label>
								<div class="input-group input-daterange">
									<input type="text" class="form-control" id="start_date_Distri"
										autocomplete="off"
										placeholder="<?php echo date('Y-m-d') ?>">
									<span class="input-group-addon"><i
											class="glyphicon glyphicon-calendar"></i></span>
								</div>
							</div>
						</div>
						<div class="col-lg-3 col-md-3 col-sm-2 col-xs-2">
							<div class="form-group">
								<button type="button" class="btn btn-primary" style="margin-top: 25px;" @click="_btnsearchDistri">
									<i class="glyphicon glyphicon-search"></i>
								</button>
							</div>
						</div>
						<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
							<label>% Comisión Distribuidores:</label>
							<div class="form-group">
								<input type="number" class="form-control" v-model="comision_Distr.comisionDistribuidor" @keyup.enter="_btnsearchDistri">
							</div>
						</div>

						<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div class="panel panel-primary">
								<div class="panel-body">
									<div class="row">
										<div class="container-fluid table-responsive">
											<table class="table table-striped table-bordered table-hover" style="width: 100%" id="tableDistri">
												<caption>Pedido</caption>
												<thead>
													<th>N° Distribuidor</th>
													<th>Distribuidor</th>
													<th>Monto Ventas en Pedido (Precio Salon)</th>
													<th>Monto Comisión Salon (Precio Salon)</th>
												</thead>
												<tbody>
													
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="panel-footer">
									<button type="button" class="btn btn-warning" @click="_btnSendEmailDistri">Enviar Correos</button>
									<button type="button" class="btn btn-success" @click="_btnExportDistri">Exportar</button>
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>
		</div>
	</div>
</div>
