<!-- Page Content -->
<br>

<div id="page-wrapper">
 	<div class="container-fluid">
 		<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
 			<div class="box box-primary">
	            <div class="box-header with-border">
	              <h3 class="box-title">Guias Envios</h3>

	              <div class="box-tools pull-right">
	                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
	                </button>
	                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
	              </div>
	            </div>
	            <!-- /.box-header -->
	            <div class="box-body">
	              <div class="table-responsive">
	                <table class="table no-margin table-bordered table-hover" width="100%" id="table_GuiaEnvio">
	                  <thead>
	                  <tr>
	                    <th>ID</th>
	                    <th>idVenta</th>
	                    <th>Usuario Empaque</th>
	                    <th>Distribuidor</th>
	                    <th>Peso</th>
	                    <th>N° Guia</th>
	                    <th>Fecha Final</th>
	                    <th>Status</th>
	                  </tr>
	                  </thead>
	                  <tbody>
	                  </tbody>
	                </table>
	              </div>
	              <!-- /.table-responsive -->
	            </div>
	            <!-- /.box-body -->
	            <div class="box-footer clearfix">
	              <!--<a class="btn btn-sm btn-warning btn-flat" id="btn_Editar"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
	              <a class="btn btn-sm btn-danger btn-flat" id="btn_Eliminar"><i class="fa fa-trash" aria-hidden="true"></i></a>-->
	            </div>
	            <!-- /.box-footer -->
          	</div>
 		</div>

 		<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
 			<div class="box box-primary">
	            <div class="box-header with-border">
	              <h3 class="box-title">Guias Descripción</h3>

	              <div class="box-tools pull-right">
	                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
	                </button>
	                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
	              </div>
	            </div>
	            <!-- /.box-header -->
	            <div class="box-body">

	            	<div class="form-group">
						<input type="hidden" name="txtidGuiaDescripcion" id="txtidGuiaDescripcion" class="form-control">
					</div>

					<div class="form-group">
						<label for="txtInformacion">Información Adicional:</label>
						<input type="text" name="txtInformacion" id="txtInformacion" class="form-control" readonly="readonly">
					</div>

					<div class="form-group">
						<label for="txtContenido">Contenido:</label>
						<input type="text" name="txtContenido" id="txtContenido" class="form-control" readonly="readonly">
					</div>

					<div class="form-group">
						<label for="txtDescripcion">Descripción del Contenido:</label>
						<input type="text" name="txtDescripcion" id="txtDescripcion" class="form-control" readonly="readonly">
					</div>

					<div class="form-group">
						<label for="txtReferencia">Referencia:</label>
						<input type="text" name="txtReferencia" id="txtReferencia" class="form-control" readonly="readonly">
					</div>

					<div class="form-group">
						<label for="txtPeso">Peso:</label>
						<input type="text" name="txtPeso" id="txtPeso" class="form-control" readonly="readonly">
					</div>

					<div class="form-group">
						<label for="txtGuia">N° Guia:</label>
						<input type="text" name="txtGuia" id="txtGuia" class="form-control" readonly="readonly">
					</div>
	            </div>
	            <!-- /.box-body -->
	            <div class="box-footer clearfix">
					
					<button class="btn btn-primary btn-xs btn-flat" style="float: right;" name="btn_Reimprimir" id="btn_Reimprimir" disabled="disabled">Reimprimir Etiqueta</button>

	            </div>
	            <!-- /.box-footer -->
          	</div>
 		</div>


 		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="box box-primary">
	            <div class="box-header with-border">
	              <h3 class="box-title">Direcciones</h3>

	              <div class="box-tools pull-right">
	                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
	                </button>
	                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
	              </div>
	            </div>
	            <!-- /.box-header -->
	            <div class="box-body">
	              <div class="table-responsive">
	                <table class="table no-margin table-bordered table-hover" width="100%" id="table_GuiaDireccion">
	                  <thead>
	                  <tr>
	                    <th>Contacto</th>
	                    <th>Corporativo</th>
	                    <th>Numero de Cliente</th>
	                    <th>Estado</th>
	                    <th>Ciudad</th>
	                    <th>Colonia</th>
	                    <th>CP</th>
	                    <th>Dirección</th>
	                    <th>Dirección Opcional</th>
	                    <th>Celular</th>
	                    <th>Telefono</th>
	                    <th>Tipo</th>
	                  </tr>
	                  </thead>
	                  <tbody>
	                  </tbody>
	                </table>
	              </div>
	              <!-- /.table-responsive -->
	            </div>
          	</div>
 		</div>
	</div>
</div>