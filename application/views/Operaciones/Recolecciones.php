<br>
<div id="page-wrapper">
	<div class="container-fluid">
		<div class="row">

			<ul class="nav nav-tabs">
			  <li class="active"><a data-toggle="tab" href="#home">Recolecciones</a></li>
			  <li><a data-toggle="tab" href="#menu1">Recolecciones Pendientes</a></li>			
			</ul>
			<br>

			<div class="tab-content">
			  <div id="home" class="tab-pane fade in active">
			    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div class="box">
				      	<div class="box-header with-border">
				        	<h3 class="box-title">Recolecciones</h3>
				        	<div class="box-tools pull-right">
				          		<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
				        	</div>
				      	</div>
				      	<div class="box-body">					  	
							<div class="container-fluid">
								<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div class="col-md-4 col-lg-4 col-sm-12 col-xs-12">
							            <div class="form-group input-daterange">
							              <label for="DateStartRecolector">Desde:</label>
							              <div class="input-group">
							                <input type="text" class="form-control" id="DateStartRecolector" name="DateStartRecolector">
							                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
							              </div>    
							            </div>
							        </div>
							        <div class="col-md-4 col-lg-4 col-sm-10 col-xs-10">
							            <div class="form-group input-daterange">
							              <label for="DateEndRecolector">Hasta:</label>
							              <div class="input-group">
							                <input type="text" class="form-control" id="DateEndRecolector" name="DateEndRecolector">
							                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
							              </div>    
							            </div>
							        </div>
							        <div class="col-md-4 col-lg-4 col-sm-2 col-xs-2">
							            <div class="form-group">
							              <div class="input-group">
							                <button type="button" id="searchRecoleccion" class="btn btn-primary" style="margin-top: 25px">Buscar</button>
							              </div>    
							            </div>
							        </div>
							    </div>

								<div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
						           	<table class="table table-striped table-bordered table-hover" id="fetchRecoleccion" width="100%">
						           		<caption>Recolecciones Realizadas</caption>
						            	<thead>
						             		<tr>
								              <th>ID</th>
								              <th>Usuario</th>
								              <th>Fecha</th>
								              <th>Nombre Recolector</th>
								              <th>Cant. Paquetes</th>
								              <th>Status</th>
											  <th>#</th>
						             		</tr>
						            	</thead>
						            	<tbody></tbody>
						            </table>
					        	</div>
							</div>
				      	</div>
				        <div class="box-footer">
						    <button type="button" class="btn btn-success" id="btnAgregarRecoleccion"><span class="glyphicon glyphicon-plus"></span></button>
				            <button type="button" class="btn btn-success" id="loadingAgregarRecoleccion" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
				        
				            <button type="button" class="btn btn-warning" id="btnEditarRecoleccion"><span class="glyphicon glyphicon-pencil"></span> </button>
				            <button type="button" class="btn btn-warning" id="loadingEditarRecoleccion" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
				        
				            <button type="button" class="btn btn-danger"  id="btnEliminarRecoleccion"><span class="glyphicon glyphicon-trash"></span></button>
				            <button type="button" class="btn btn-danger" id="loadingEliminarRecoleccion" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
				    	</div>
				  	</div>
			  	</div>


			  	<!-- Detalle Recolecciones -->
			  	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div class="box">
				      	<div class="box-header with-border">
				        	<h3 class="box-title">Detalle Recolección</h3>
				        	<div class="box-tools pull-right">
				          		<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
				        	</div>
				      	</div>
				      	<div class="box-body">					  	
							<div class="container-fluid">
								<div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
						           	<table class="table table-striped table-bordered table-hover" id="fetchDetalleRecoleccion" width="100%">
						           		<caption>Detalle Recolección</caption>
						            	<thead>
						             		<tr>
								              <th>ID</th>
								              <th>Guia</th>
								              <th>Empaque</th>
								              <th>idVenta</th>
								              <th>Distribuidor</th>
								              <th>Fecha Empaque</th>
								              <th>Fecha Pedido</th>
						             		</tr>
						            	</thead>
						            	<tbody></tbody>
						            </table>
					        	</div>
							</div>
				      	</div>
				      	 <div class="box-footer">
						    <button type="button" class="btn btn-default" id="btnImprimirReporte">Imprimir Reporte</button>
				            <button type="button" class="btn btn-default" id="loadingImprimirReporte" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
				    	</div>
				  	</div>
			  	</div>
			  </div>
			  <!-- End Tab Recoleccines -->

			  <div id="menu1" class="tab-pane fade">
			    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div class="box">
				      	<div class="box-header with-border">
				        	<h3 class="box-title">Recolecciones Pendientes</h3>
				        	<div class="box-tools pull-right">
				          		<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
				        	</div>
				      	</div>
				      	<div class="box-body">					  	
							<div class="container-fluid">
								<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div class="col-md-4 col-lg-4 col-sm-12 col-xs-12">
							            <div class="form-group input-daterange">
							              <label for="DateStartRecolectorPendientes">Desde:</label>
							              <div class="input-group">
							                <input type="text" class="form-control" id="DateStartRecolectorPendientes" name="DateStartRecolectorPendientes">
							                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
							              </div>    
							            </div>
							        </div>
							        <div class="col-md-4 col-lg-4 col-sm-10 col-xs-10">
							            <div class="form-group input-daterange">
							              <label for="DateEndRecolectorPendientes">Hasta:</label>
							              <div class="input-group">
							                <input type="text" class="form-control" id="DateEndRecolectorPendientes" name="DateEndRecolectorPendientes">
							                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
							              </div>    
							            </div>
							        </div>
							        <div class="col-md-4 col-lg-4 col-sm-2 col-xs-2">
							            <div class="form-group">
							              <div class="input-group">
							                <button type="button" id="searchRecoleccionPendientes" class="btn btn-primary" style="margin-top: 25px">Buscar</button>
							              </div>    
							            </div>
							        </div>
							    </div>

								<div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
						           	<table class="table table-striped table-bordered table-hover" id="fetchRecoleccionPendientes" width="100%">
						           		<caption>Recolecciones Pendientes</caption>
						            	<thead>
						             		<tr>
								              <th>ID</th>
								              <th>Guia</th>
								              <th>idVenta</th>
								              <th>Distribuidor</th>
								              <th>Fecha Empaque</th>
								              <th>Fecha Pedido</th>
						             		</tr>
						            	</thead>
						            	<tbody></tbody>
						            </table>
					        	</div>
							</div>
				      	</div>
				  	</div>
			  	</div>
			  </div>
			  <!-- End Tab Recolecciones Pendientes -->
			</div>

			

		  	<!-- Modal Agregar Recolecciones -->
			<div id="modalAddRecolecciones" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
			  	<div class="modal-dialog">

				    <!-- Modal content-->
				    <div class="modal-content">
				      	<div class="modal-header bg-primary">
				        	<button type="button" class="close" data-dismiss="modal">&times;</button>
				        	<h4 class="modal-title" style="text-align: center;">Detalle Recolección</h4>
				      	</div>
				      	<div class="modal-body">
					        <div class="container-fluid">
					        	<div class="form-group">
					        		<label for="txtGuia">Guia:</label>
					        		<input type="text" class="form-control input-number" id="txtGuia" name="txtGuia" min="22" max="22">
					        	</div>

					        	<div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
						           	<table class="table table-striped table-bordered table-hover" id="fetchListGuia" width="100%">
						           		<caption>Cajas recolectadas</caption>
						            	<thead>
						             		<tr>
						             			<th>ID</th>
								              	<th>Guia</th>
								              	<th>Empaque</th>
								              	<th>#</th>
						             		</tr>
						            	</thead>
						            	<tbody></tbody>
						            </table>
					        	</div>
					        </div>
				      	</div>
				      	<div class="modal-footer">
				        	<button type="button" class="btn btn-danger" id="btnCerrarRecoleccionGuia" data-dismiss="modal" style="float: left;">Cerrar</button>
				        	<button type="button" class="btn btn-danger" id="loadingCerrarRecoleccionGuia" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

				        	<button type="button" class="btn btn-primary" id="btnSiguiente" style="float: right;">Siguiente</button>
				        	<button type="button" class="btn btn-primary" id="loadingSiguiente" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
				      	</div>
				    </div>

			  	</div>
			</div>

			<!-- Modal Siguiente Recolecciones -->
			<div id="modalNextRecolecciones" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
			  	<div class="modal-dialog">

				    <!-- Modal content-->
				    <div class="modal-content">
				      	<div class="modal-header bg-primary">
				        	<button type="button" class="close" data-dismiss="modal">&times;</button>
				        	<h4 class="modal-title" style="text-align: center;">Información Recolección</h4>
				      	</div>
				      	<div class="modal-body">
					        <div class="container-fluid">
					        	<div class="form-group">
					        		<label>N° Guias escaneados: <span id="labelCantGuia"></span></label>
					        	</div>

					        	<div class="form-group">
					        		<label for="txtRecolector">Recolector:</label>
					        		<input type="text" class="form-control" id="txtRecolector" name="txtRecolector">
					        	</div>
					        </div>
				      	</div>
				      	<div class="modal-footer">
				        	<button type="button" class="btn btn-danger" id="btnCerrarNext" data-dismiss="modal" style="float: left;">Cerrar</button>
				        	<button type="button" class="btn btn-danger" id="loadingCerrarNext" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

				        	<button type="button" class="btn btn-primary" id="btnAddRecoleccion" style="float: right;">Guardar</button>
				        	<button type="button" class="btn btn-primary" id="loadingAddRecoleccion" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
				      	</div>
				    </div>

			  	</div>
			</div>


			<!-- Modal Editar Recolecciones -->
			<div id="modalEditarRecolecciones" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
			  	<div class="modal-dialog">

				    <!-- Modal content-->
				    <div class="modal-content">
				      	<div class="modal-header bg-warning">
				        	<button type="button" class="close" data-dismiss="modal">&times;</button>
				        	<h4 class="modal-title" style="text-align: center;">Editar Recolecciones</h4>
				      	</div>
				      	<div class="modal-body">
					        <div class="container-fluid">
					        	<div class="form-group">
					        		<label for="selectStatus">Status:</label>
					        		<select name="selectStatus" id="selectStatus" class="form-control">
					        			<option value="">Seleccionar...</option>
					        			<option value="Pendiente">Pendiente</option>
					        			<option value="Recolectado">Recolectado</option>
					        			<option value="Pendiente y Recolectado">Pendiente y Recolectado</option>
					        		</select>
					        	</div>
					        </div>
				      	</div>
				      	<div class="modal-footer">
				        	<button type="button" class="btn btn-danger" id="btnCerrarEditar" data-dismiss="modal" style="float: left;">Cerrar</button>
				        	<button type="button" class="btn btn-danger" id="loadingCerrarEditar" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

				        	<button type="button" class="btn btn-warning" id="btnUpdateRecoleccion" style="float: right;">Guardar Cambios</button>
				        	<button type="button" class="btn btn-warning" id="loadingUpdateRecoleccion" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
				      	</div>
				    </div>

			  	</div>
			</div>

		</div>
	</div>
</div>