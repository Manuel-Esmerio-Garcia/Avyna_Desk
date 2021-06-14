<br>
<div id="page-wrapper">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
			    <div class="box">
				    <div class="box-header with-border">
						<h3 class="box-title">Roles</h3>
						<!-- Spinner Loading nav -->
						<div style="display: none; float: right;" id="loadingBoxRoles">
							<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
						</div>
						<!-- Spinner Loading nav -->
					</div>
					<div class="box-body">
						<div class="table-responsive">
							<table id="fetchRoles" class="table table-striped table-bordered table-hover table-condensed" width="100%">
							    <thead>
				                    <tr>
				                        <th>ID</th>
				                        <th>Rol</th>
				                        <th>Status</th>
				                    </tr>
				                </thead>	          
				                <tbody>	                                  
				    			</tbody>
							</table>
						</div>
					</div>
					<div class="box-footer clearfix">
						<!-- Boton Agregar Rol -->
						<button type="button" name="btnAgregar" id="btnAgregar" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span></button>
						<button type="button" name="loadingAgregar" id="loadingAgregar" class="btn btn-success" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>

						<!-- Boton Editar Rol -->
						<button type="button" name="btnEditar" id="btnEditar" class="btn btn-warning"><span class="glyphicon glyphicon-pencil"></span></button>
						<button type="button" name="loadingEditar" id="loadingEditar" class="btn btn-warning" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>

						<!-- Boton Eliminar Rol -->
						<button type="button" name="btnEliminar" id="btnEliminar" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></button>
						<button type="button" name="loadingEliminar" id="loadingEliminar" class="btn btn-danger" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
					</div>
				</div>
			</div>

			<!-- Permisos del Rol -->
			<div class="col-md-12">
			    <div class="box">
				    <div class="box-header with-border">
						<h3 class="box-title">Permisos</h3>
						<!-- Spinner Loading nav -->
						<div style="display: none; float: right;" id="loadingBoxPermisos">
							<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
						</div>
						<!-- Spinner Loading nav -->
					</div>
					<div class="box-body">
						<div class="table-responsive">
							<table id="fetchPermisosRol" class="table table-striped table-bordered table-hover table-condensed" width="100%">
							    <thead>
				                    <tr>
				                        <th>ID</th>
				                        <th>Modulo</th>
				                        <th>Permiso</th>
				                    </tr>
				                </thead>	          
				                <tbody>	                              
				    			</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<!-- End Permiso del Rol -->
		</div>

		<!-- Modal Agregar Rol-->
		<div id="modalAgregar" class="modal fade" role="dialog">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header bg-primary">
		        <i class="fa fa-spinner fa-spin" style="font-size:20px; float: right; display: none;" id="loadingModalAgregar"></i>
		        <h4 class="modal-title">Agregar Rol</h4>
		      </div>
		      <div class="modal-body">
		       <div class="container-fluid">
		       	<div class="form-group">
		       		<!-- Alert Rol Existente -->
		       		<div class="alertb alertb-danger" role="alert" id="alertRolDanger" style="display: none;">
		       		  <strong><span class="glyphicon glyphicon-warning-sign"></span>&nbsp; Advertencia</strong>
					  El rol capturado es invalido (Ya existe en el sistema).
					</div>

		       		<label for="txtRol">Rol:*</label>
		       		<input type="text" name="txtRol" id="txtRol" class="form-control">
		       	</div>

		       	<div class="form-group">
		       		<label>Permisos:*</label>
		       		<div class="checkbox" style="float: right;">
                        <label><input type="checkbox" id="checkTodos" value="">Seleccionar todo</label>
                    </div>
		       	</div>

		       	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 table-responsive">
		       		<table id="fetchPermisos" class="table table-striped table-bordered table-hover table-condensed" width="100%">
		       			<caption>Permisos a asignar</caption>
		       			<thead>
		       				<tr>
		       					<th>ID</th>
		       					<th>Modulo</th>
		       					<th>Permiso</th>
		       					<th>#</th>
		       				</tr>
		       			</thead>
		       			<tbody>
		       			</tbody>
		       		</table>
		       	</div>

		       </div>
		      </div>
		      <div class="modal-footer">

		      	<p class="text-obligatorio">Campos Obligatorios *</p>

		        <button type="button" class="btn btn-danger" id="btnCerrarAgregar" data-dismiss="modal">Cerrar</button>
		        <button type="button" name="loadingCerrarAgregar" id="loadingCerrarAgregar" class="btn btn-danger" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

		        <button type="button" class="btn btn-primary" id="btnAgregarRol">Guardar</button>
		        <button type="button" name="loadingAgregarRol" id="loadingAgregarRol" class="btn btn-primary" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
		      </div>
		    </div>

		  </div>
		</div>
		<!-- Modal Agregar Rol-->


		<!-- Modal Editar Rol-->
		<div id="modalEditar" class="modal fade" role="dialog">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header bg-warning">
		        <i class="fa fa-spinner fa-spin" style="font-size:20px; float: right; display: none;" id="loadingModalEditar"></i>
		        <h4 class="modal-title">Editar Rol</h4>
		      </div>
		      <div class="modal-body">
		       <div class="container-fluid">

		       	<div class="form-group">
		       		<div class="checkbox" style="float: right;">
                        <label><input type="checkbox" id="checkStatusEditar" value="">Inactivo</label>
                    </div>
		       	</div>

		       	<div class="form-group">
		       		<!-- Alert Rol Existente -->
		       		<div class="alertb alertb-danger" role="alert" id="alertRolDangerEditar" style="display: none;">
		       		  <strong><span class="glyphicon glyphicon-warning-sign"></span>&nbsp; Advertencia</strong>
					  El rol capturado es invalido (Ya existe en el sistema).
					</div>

		       		<label for="txtRol">Rol:*</label>
		       		<input type="text" name="txtRolEditar" id="txtRolEditar" class="form-control">
		       	</div>

		       	<div class="form-group">
		       		<label>Permisos:*</label>
		       		<div class="checkbox" style="float: right;">
                        <label><input type="checkbox" id="checkTodosEditar" value="">Seleccionar todo</label>
                    </div>
		       	</div>

		       	<div class=" col-lg-12 col-md-12 col-sm-12 col-xs-12 table-responsive">
		       		<table id="fetchPermisosEditar" class="table table-striped table-bordered table-hover table-condensed" width="100%">
		       			<caption>Permisos a asignar</caption>
		       			<thead>
		       				<tr>
		       					<th>ID</th>
		       					<th>Modulo</th>
		       					<th>Permiso</th>
		       					<th>#</th>
		       				</tr>
		       			</thead>
		       			<tbody>
		       			</tbody>
		       		</table>
		       	</div>

		       </div>
		      </div>
		      <div class="modal-footer">

		      	<p class="text-obligatorio">Campos Obligatorios *</p>

		        <button type="button" class="btn btn-danger" id="btnCerrarEditar" data-dismiss="modal">Cerrar</button>
		        <button type="button" name="loadingCerrarAgregar" id="loadingCerrarEditar" class="btn btn-danger" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

		        <button type="button" class="btn btn-warning" id="btnEditarRol">Guardar Cambios</button>
		        <button type="button" name="loadingAgregarRol" id="loadingEditarRol" class="btn btn-warning" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
		      </div>
		    </div>

		  </div>
		</div>
		<!-- Modal Editar Rol-->
	</div>
</div>