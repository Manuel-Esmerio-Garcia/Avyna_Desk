<br>
<div id="page-wrapper">
  	<div class="container-fluid">
		<ul class="nav nav-tabs">
		<?php if (is_int(array_search('Extracciones_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
	  		<li class="active"><a data-toggle="tab" href="#home">Extracciones</a></li>
	  	<?php endif ?>
	  	<?php if (is_int(array_search('Extracciones_historial_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
	  		<li><a data-toggle="tab" href="#menu1">Historial de Extracciones</a></li>
	  	<?php endif ?>
		</ul>
		<br>
		<div class="tab-content">
			<?php if (is_int(array_search('Extracciones_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
			<!-- Extracciones tab -->
			<div id="home" class="tab-pane fade in active">
				<!-- fetchExtracciones -->
				<div class="form-group">
					<label>Bodega:</label>
					<select name="selectBodega" id="selectBodega" class="form-control">
						<option value="">Seleccionar...</option>
						<?php foreach ($Extracciones as $key => $value) { ?>
				            <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
				        <?php } ?>
					</select>
				</div>
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div class="box box-primary">
			            <div class="box-header with-border">
			              	<h3 class="box-title">Extracción</h3>
			              	<div class="box-tools pull-right">
			              		<button type="button" class="btn btn-box-tool" id="btnRefresh" data-toggle="tooltip" data-original-title="Refrescar"><i class="fa fa-refresh"></i></button>
			                	<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
			              	</div>
			            </div>
			            <div class="box-body">
			               	<div class="table-responsive">
				               	<table class="table table-hover table-striped table-bordered table-condensed" id="fetchExtracciones" width="100%">
				               		<thead>
				               			<tr>
				               				<th>ID</th>
				               				<th>Fecha Venta</th>
											<th>N° Distribuidor</th>
				               				<th>Distribuidor Nombre</th>
				               				<th>Fecha Pago</th>
				               				<th>Fecha Pago Referencia</th>
				               				<th>Pedidos</th>
				               				<th>Total</th>
											<th>Adeudo</th>
				               			</tr>
				               		</thead>
				               		<tbody></tbody>
				               	</table>
			                </div>
			            </div>
			            <?php if (is_int(array_search('Extracciones_realizar_extracion', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
			            <div class="box-footer">
		                  	<button class="btn btn-primary" id="btnRealizarExtraccion">Realizar Extracción</button>
		                  	<button type="button" id="loadingRealizarExtraccion" class="btn btn-primary" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
		                </div>
		            	<?php endif ?>
			        </div>
				</div>
				<!-- fetchDetalleExtracciones -->
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div class="box box-primary">
					    <div class="box-header with-border">
					        <h3 class="box-title">Detalle de la Extracción</h3>
				            <div class="box-tools pull-right">
				                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
				            </div>
					    </div>
					    <div class="box-body">
					        <div class="table-responsive">
					            <table class="table table-hover table-striped table-bordered table-condensed" id="fetchDetalleExtracciones" width="100%">
				               		<thead>
				               			<tr>
				               				<th>ID</th>
				               				<th>Cliente menudeo item</th>
				               				<th>Fecha Venta</th>
				               				<th>Total</th>
				               				<th>Total Descuento</th>
				               				<th>Extraido</th>
				               			</tr>
				               		</thead>
				               		<tbody></tbody>
				               	</table>
					        </div>
					    </div>
					</div>
				</div>
			</div>
			<!-- Extracciones tab -->
			<?php endif ?>
			
			<?php if (is_int(array_search('Extracciones_historial_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
			<!-- Historial Extracciones tab -->
			<div id="menu1" class="tab-pane fade">
				<div class="form-group">
					<label>Bodega:</label>
					<select name="selectBodegaHistorial" id="selectBodegaHistorial" class="form-control">
						<option value="">Seleccionar...</option>
						<?php foreach ($Extracciones as $key => $value) { ?>
				            <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
				        <?php } ?>
					</select>
				</div>
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div class="box box-primary">
					    <div class="box-header with-border">
					        <h3 class="box-title">Extracción</h3>
					        <div class="box-tools pull-right">
				              	<button type="button" class="btn btn-box-tool" id="btnRefreshHistorial" data-toggle="tooltip" data-original-title="Refrescar"><i class="fa fa-refresh"></i></button>
				                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
					        </div>
					    </div>
					    <div class="box-body">
							<div class="container-fluid">
								<div class="col-md-4 col-lg-4 col-sm-12 col-xs-12">
						            <div class="form-group input-daterange">
						              <label for="DateStartVentas">Desde:</label>
						              <div class="input-group">
						                <input type="text" class="form-control" id="DateStartVentas" name="DateStartVentas">
						                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
						              </div>    
						            </div>
						        </div>
						        <div class="col-md-4 col-lg-4 col-sm-10 col-xs-10">
						            <div class="form-group input-daterange">
						              <label for="DateEndVentas">Hasta:</label>
						              <div class="input-group">
						                <input type="text" class="form-control" id="DateEndVentas" name="DateEndVentas">
						                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
						              </div>    
						            </div>
						        </div>
						        <div class="col-md-4 col-lg-4 col-sm-2 col-xs-2">
						            <div class="form-group">
						              <div class="input-group">
						                <button type="button" id="searchVentas" class="btn btn-primary" style="margin-top: 25px">Buscar</button>
						              </div>    
						            </div>
						        </div>
						    </div>
						    <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
								<div class="form-group">
								    <label for="selectDistribuidor">Distribuidor:</label>
								    <select class="form-control" id="selectDistribuidor">
								        <option value="">Seleccionar...</option>
							        	<?php foreach ($Distribuidor as $key => $value) { ?>
							        		<option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'].' '.$value['Apellidos'] ?></option>
							          	<?php } ?>
								    </select>
								</div>
							</div>
					        <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
					            <div class="table-responsive">
					               	<table class="table table-hover table-striped table-bordered table-condensed" id="fetchHistorial" width="100%">
					               		<thead>
					               			<tr>
					               				<th>ID</th>
					               				<th>Fecha Venta</th>
					               				<th>Distribuidor Nombre</th>
					               				<th>Distribuidor Apellidos</th>
					               				<th>Pedidos</th>
					               				<th>Total</th>
					               			</tr>
					               		</thead>
					               		<tbody></tbody>
					               	</table>
					            </div>
					        </div>
					    </div>
				        <div class="box-footer">
				        	<?php if (is_int(array_search('Extracciones_historial_eliminar_extracion', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
			                <button class="btn btn-danger" style="float: left;" id="btnEliminarExtraccion">Eliminar Extracción</button>
			                <button type="button" id="loadingEliminarExtraccion" class="btn btn-danger" disabled style="float: left;display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
			                <?php endif ?>
							
							<?php if (is_int(array_search('Extracciones_historial_imprimir_nota', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
			                <button class="btn btn-default" style="float: right;" id="btnImprimir">Imprimir Nota Extracción</button>
			                <button type="button" id="loadingImprimir" class="btn btn-default" disabled style="float: right; display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
			            	<?php endif ?>
			            </div>
					</div>
				</div>
			</div>
			<!-- Historial Extracciones tab -->
			<?php endif ?>
		</div>
	</div>
</div>


<div class="modal fade in" id="modalListLocation" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">×</span></button>
				<h4 class="modal-title">Movimientos sugeridos locación</h4>
			</div>
			<div class="modal-body">

				<div class="wrap" id="LoadLocationMove" style="display: none;">
				<div class="loading">
					<div class="bounceball"></div>
					<div class="text">&nbsp; &nbsp; Cargando...</div>
				</div>
				</div>

				<div class="fluid-container">
					<div class="table-responsive">
						<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<table class="table table-hover table-striped table-bordered table-condensed" id="fetchListLocation" width="100%">
								<thead>
									<th>ID</th>
									<th>Producto</th>
									<th>Locación Origen</th>
									<th>Locación Destino</th>
									<th>Cant Movimiento</th>
									<th hidden='hidden'>idInventario</th>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
				</div>
				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Cerrar</button>
				<button type="button" class="btn btn-primary" onclick="addMoveLocation()">Generar Movimientos</button>
			</div>
		</div>
	<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>