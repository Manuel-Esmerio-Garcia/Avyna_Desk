<br>
<div id="usuariopacking">
	<loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100"
		:background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true" :z-index="9999"></loading>
	<div class="container-fluid">
		<div class="box box-default">
			<div class="box-header with-border">
				<h3 class="box-title">Usuarios Packing</h3>

				<div class="box-tools pull-right">
					<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
					</button>
					<button type="button" class="btn btn-box-tool" data-widget="remove"><i
							class="fa fa-times"></i></button>
				</div>
			</div>
			<!-- /.box-header -->
			<div class="box-body">
				<div class="row">
					<div class="container-fluid">
						<div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<table id="fetchUserPack"
								class="table table-hover table-striped table-bordered table-condensed" width="100%">
								<caption>Listado de Usuarios Packing</caption>
								<thead>
									<th>ID</th>
									<th>Usuario</th>
									<th>Nombre</th>
									<th>Apellido</th>
									<th>Telefono</th>
									<th>Correo</th>
									<th>Tipo</th>
									<th>Status</th>
								</thead>
								<tbody>
									<tr v-for="(user, index) in listUsers">
										<td>{{user.ID}}</td>
										<td>{{user.Usuario}}</td>
										<td>{{user.Nombre}}</td>
										<td>{{user.Apellido}}</td>
										<td>{{user.Telefono}}</td>
										<td>{{user.Correo}}</td>
										<td v-if="user.Tipo == 1"><label class="label label-primary">Packing</label>
										</td>
										<td v-else><label class="label label-warning">Picking</label></td>
										<td v-if="user.Status == 'activo'"><label
												class="label label-success">Activo</label></td>
										<td v-else><label class="label label-danger">Inactivo</label></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<!-- /.row -->
			</div>
			<!-- /.box-body -->
			<div class="box-footer">
				<div class="row">
					<div class="container-fluid">
						<?php if (is_int(array_search('Usuario_packing_agregar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
						<button class="btn btn-success" @click="addModalUser"><span class="glyphicon glyphicon-plus"></span></button>
						<?php endif ?>
						<?php if (is_int(array_search('Usuario_packing_editar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
						<button class="btn btn-warning" @click="updateModalUser"><span class="glyphicon glyphicon-pencil"></span> </button>
						<?php endif ?>
						<?php if (is_int(array_search('Usuario_packing_eliminar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
						<button class="btn btn-danger"  @click="deleteUser"><span class="glyphicon glyphicon-trash"></span></button>
						<?php endif ?>
					</div>
				</div>
			</div>
			<!-- /.footer -->
		</div>


		<div class="modal" tabindex="-1" role="dialog" id="modalUsuarioPacking">
        <loading :active="activeModal" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100"
            :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true" :z-index="9999"></loading>
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header bg-primary" v-if="validate == 0">
						<h5 class="modal-title">Agregar Usuario Packing</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-header bg-warning" v-else>
						<h5 class="modal-title">Editar Usuario Packing</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="container-fluid">
								<div v-if="validate == 1">
									<div class="form-group" style="float: right;">
										<input type="checkbox" v-model="Status">
  										<label> Inactivo</label><br>
									</div>
								</div>
								<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<label>Usuario:</label>
									<input type="text" class="form-control" v-model="User.Usuario">
								</div>
								<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<label>Password:</label>
									<input type="password" class="form-control" v-model="User.Password">
								</div>
								<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<label>Nombre:</label>
									<input type="text" class="form-control" v-model="User.Nombre">
								</div>
								<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<label>Apellidos:</label>
									<input type="text" class="form-control" v-model="User.Apellido">
								</div>
								<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<label>Telefono:</label>
									<input type="text" class="form-control" v-model="User.Telefono">
								</div>
								<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<label>Correo:</label>
									<input type="text" class="form-control" v-model="User.Correo">
								</div>
								<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<label>Tipo:</label>
									<select class="form-control" v-model="User.Tipo">
										<option value="1">Packing</option>
										<option value="2">Picking</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
						<button type="button" class="btn btn-primary" v-if="validate == 0" @click="btnSaveUsuario">Guardar</button>
						<button type="button" class="btn btn-warning" v-else @click="btnUpdateUsuario">Guardar Cambios</button>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>
