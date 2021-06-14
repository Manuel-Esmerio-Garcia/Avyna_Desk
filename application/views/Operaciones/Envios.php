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
				<div class="form-group">
					<label for="select_Sucursal">Bodega:</label>
					<select name="select_Sucursal" id="select_Sucursal" class="form-control">
						<option value="">Seleccionar...</option>
						<?php foreach ($Sucursal as $key => $value) { ?>
				            <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
				        <?php } ?>
					</select>
				</div>
			</div>

			<div class="col-lg-12">
				<div class="box box-primary">
		            <div class="box-header with-border">
		              <h3 class="box-title">Envios</h3>

		              <div class="box-tools pull-right">
		                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
		                </button>
		              </div>
		            </div>
		            <!-- /.box-header -->
		            <div class="box-body">
		               <div class="table-responsive">
		               	<table class="table table-hover table-striped table-bordered table-condensed" id="Table_Envios" width="100%">
		               		<thead>
		               			<tr>
		               				<th>ID</th>
		               				<th>Cliente</th>
		               				<th>Total</th>
		               				<th>Pedidos</th>
		               				<th>Status</th>
		               			</tr>
		               		</thead>
		               		<tbody>
		               		</tbody>
		               	</table>
		               </div>
		            </div>
		            <div class="box-footer">
	                  <button class="btn btn-primary btn-xs btn-flat" style="float: left;" name="btn_Enviar" id="btn_Enviar">Realizar Envio</button>
	                </div>
		          </div>
			</div>
		</div>
	</div>
</div>