<!-- Page Content -->
<div class="row">
	<div class="col-lg-12">
		<br><br>
	</div>
</div>


<div id="page-wrapper">
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="box box-primary">
		            <div class="box-header with-border">
		              <h3 class="box-title">Empaques</h3>

		              <div class="box-tools pull-right">
		                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
		                </button>
		              </div>
		            </div>
		            <!-- /.box-header -->
		            <div class="box-body">
		               <div class="table-responsive">
		               	<table class="table table-hover table-striped table-bordered table-condensed" id="Table_Empaques" width="100%">
		               		<thead>
		               			<tr>
		               				<th>ID</th>
		               				<th>Fecha</th>
		               				<th>Cliente</th>
		               				<th>Status</th>
		               			</tr>
		               		</thead>
		               		<tbody>
		               		</tbody>
		               	</table>
		               </div>
		            </div>
		            <div class="box-footer">
	                  <button class="btn btn-danger btn-xs btn-flat" style="float: left;" name="Eliminar_Empaque" id="Eliminar_Empaque">Eliminar Empaque</button>
	                </div>
		          </div>
			</div>


			<!-- -->
			<div class="col-lg-4">
				<div class="box box-primary">
		            <div class="box-header with-border">
		              <h3 class="box-title">Cajas</h3>

		              <div class="box-tools pull-right">
		                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
		                </button>
		              </div>
		            </div>
		            <!-- /.box-header -->
		            <div class="box-body">
		               <div class="table-responsive">
		               	<table class="table table-hover table-striped table-bordered table-condensed" id="Table_Cajas" width="100%">
		               		<thead>
		               			<tr>
		               				<th hidden="hidden">ID</th>
		               				<th>#Caja</th>
		               				<th>#Guia</th>
		               			</tr>
		               		</thead>
		               		<tbody>
		               		</tbody>
		               	</table>
		               </div>
		            </div>
		            <div class="box-footer">
	                  <button class="btn btn-warning btn-xs btn-flat" name="Editar_Guia" id="Editar_Guia"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>

	                  <button class="btn btn-default btn-xs btn-flat" name="btn_Consultar" id="btn_Consultar"><i class="fa fa-map-marker" aria-hidden="true"></i></button>

	                  <button class="btn btn-primary btn-xs btn-flat" style="float: right;" name="btn_Reimprimir" id="btn_Reimprimir"><i class="fa fa-print" aria-hidden="true"></i></button>
	                </div>
		          </div>
			</div>


			<div class="col-lg-4">
				<div class="box box-primary">
		            <div class="box-header with-border">
		              <h3 class="box-title">Pedidos</h3>

		              <div class="box-tools pull-right">
		                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
		                </button>
		              </div>
		            </div>
		            <!-- /.box-header -->
		            <div class="box-body">
		               <div class="table-responsive">
		               	<table class="table table-hover table-striped table-bordered table-condensed" id="Table_Ventas_Menudeo" width="100%">
		               		<thead>
		               			<tr>
		               				<th hidden="hidden">ID</th>
		               				<th>Pedido Menudeo</th>
		               				<th>Cliente</th>
		               				<th>Cantidad</th>
		               				<th>#Caja</th>
		               			</tr>
		               		</thead>
		               		<tbody>
		               		</tbody>
		               	</table>
		               </div>
		            </div>
		            <div class="box-footer">
	                  <button class="btn btn-default btn-xs btn-flat" name="Imprimir_Lista" id="Imprimir_Lista"><i class="fa fa-print" aria-hidden="true"></i></button>
	                </div>
		          </div>
			</div>


			<div class="col-lg-4">
				<div class="box box-primary">
		            <div class="box-header with-border">
		              <h3 class="box-title">Productos</h3>

		              <div class="box-tools pull-right">
		                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
		                </button>
		              </div>
		            </div>
		            <!-- /.box-header -->
		            <div class="box-body">
		               <div class="table-responsive">
		               	<table class="table table-hover table-striped table-bordered table-condensed" id="Table_Productos" width="100%">
		               		<thead>
		               			<tr>
		               				<th>Producto</th>
		               				<th>Cantidad</th>
		               			</tr>
		               		</thead>
		               		<tbody>
		               		</tbody>
		               	</table>
		               </div>
		            </div>
		          </div>
			</div>

		</div>
	</div>
</div>

<!-- Modal -->
<div id="Modal_Editar_Guia" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar N° de Guia</h4>
      </div>
      <div class="modal-body">
        
        <div class="form-group">
        	<label for="">N° Guia</label>
        	<input type="number" class="form-control" id="Numero_Guia">
        </div>

        	<div class="wrap" id="Cargando_Editar_Guia" style="display: none;">
	          <div class="loading">
	            <div class="bounceball"></div>
	            <div class="text">&nbsp; &nbsp; Cargando...</div>
	          </div>
	        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-warning" style="float: right;" id="btn_Editar_Guia">Guardar Cambios</button>
      </div>
    </div>

  </div>
</div>


<!-- Modal -->
<div id="modalConsultaEstafeta" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Consulta Estafeta</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">

        	<!--<div class="form-group">
        		<img src="<?php echo base_url('assets/img/estafeta.png') ?>" alt="">
        	</div>-->

			<div class="alert alert-success alert-dismissible" id="alert_Status">
			  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
			  <strong id="EstafetaStatus"></strong> <span id="descripcion_status"></span>
			</div>

        	<div class="form-group">
        		<label for="EstafetaDestino">Destino / Progreso:</label>
        		<input type="text" name="EstafetaDestino" id="EstafetaDestino" class="form-control" readonly="readonly">
        	</div>

        	<div class="form-group" id="div_Fecha">
        		<label for="EstafetaFecha">Fecha y hora:</label>
        		<input type="text" name="EstafetaFecha" id="EstafetaFecha" class="form-control" readonly="readonly">
        	</div>

        	<div class="form-group" id="div_recibe">
        		<label for="EstafetaRecibe">Recibe:</label>
        		<input type="text" name="EstafetaRecibe" id="EstafetaRecibe" class="form-control" readonly="readonly">
        	</div>

        	<div class="form-group">
        		<label for="EstafetaTipo">Tipo paquete:</label>
        		<input type="text" name="EstafetaTipo" id="EstafetaTipo" class="form-control" readonly="readonly">
        	</div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>