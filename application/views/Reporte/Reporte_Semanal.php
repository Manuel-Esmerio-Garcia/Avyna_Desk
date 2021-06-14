
<br>
<div id="page-wrapper">
	<div class="container-fluid">
		<div id="page-wrapper">

			<div class="col-md-12">
				<div class="form-group">
					<label for="select_Sucursal">Sucursal:*</label>
					<select name="select_Sucursal" id="select_Sucursal" class="form-control">
						<option value="">Seleccionar...</option>
						<?php foreach ($Sucursal as $key => $value) { ?>
		  					<option value="<?php echo $value['ID']; ?>"><?php echo utf8_encode(utf8_decode($value["Sucursal"])); ?></option>
		  				<?php } ?>
					</select>
				</div>				
			</div>

			<div class="col-md-12">
				<div class="col-md-6">
		          <!-- AREA CHART -->
		          <div class="box box-primary collapsed-box">
		            <div class="box-header with-border">
		              <h3 class="box-title">Top 5 Ventas</h3>

		              <div class="box-tools pull-right">
		                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i>
		                </button>
		                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
		              </div>
		            </div>
		            <div class="box-body">
		              <div class="chart">
		                <canvas id="Grafica_Saldo" width="400" height="400"></canvas>
		              </div>
		            </div>
		            <!-- /.box-body -->
		          </div>
		          <!-- /.box -->
		          </div>

		          <div class="col-md-6">
		          	          <!-- DONUT CHART -->
		          <div class="box box-danger collapsed-box">
		            <div class="box-header with-border">
		              <h3 class="box-title">Ventas en el Mes</h3>

		              <div class="box-tools pull-right">
		                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i>
		                </button>
		                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
		              </div>
		            </div>
		            <div class="box-body">
		              <canvas id="Grafica_Mes" width="400" height="400"></canvas>
		              </div>
		            </div>
		            <!-- /.box-body -->
		          </div>
		          <!-- /.box -->
			</div>


			<div class="col-md-12">
				<div class="box box-info">
		            <div class="box-header with-border">
		              <h3 class="box-title">Ventas de la semana</h3>

		              <div class="box-tools pull-right">
		                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
		                </button>
		              </div>
		            </div>
		            <!-- /.box-header -->
		            <div class="box-body">
		              <div class="table-responsive">
		                <table class="table table-striped table-bordered table-hover table-responsive" id="Table_Venta_Semanal">
		                  <thead>
		                  <tr>
		                    <th>ID Distrib.</th>
		                    <th>Distribuidor</th>
							<th>Alias</th>
		                    <th>Ciudad</th>
		                    <th>Estado</th>
		                    <th>Region</th>
		                    <th>Zona</th>
		                    <th>Dia Envío</th>
		                    <th>Total Venta (Precio Distribuidor)</th>
		                    <th>Total Venta Distribuidor (Precio Distribuidor)</th>
		                    <th>#</th>
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
		            	<button type="button" class="btn btn-primary btn-flat" style="float: right;" id="exportar">Exportar</button>
		            </div>
		            <!-- /.box-footer -->
		          </div>
			</div>
				
 		</div>
 	</div>
</div>

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog modal-lg">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Detalle Ventas Cliente</h4>
      </div>
      <div class="modal-body">

      	<div class="wrap" id="Cargando_Exportar" style="display: none;">
          <div class="loading">
            <div class="bounceball"></div>
            <div class="text">&nbsp; &nbsp; Cargando...</div>
          </div>
        </div>
        
        <div class="table-responsive">
	        <table class="table table-striped table-bordered table-hover table-responsive" id="Table_Venta_Semanal_Detalle">
	          <thead>
	          <tr>
	            <th>ID</th>
	            <th>Fecha venta</th>
	            <th>Distribuidor</th>
	            <th>Descuento</th>
	            <th>Subtotal</th>
	            <th>Impuestos</th>
	            <th>Total</th>
	            <th>Adeudo</th>
	            <th>Status</th>
	          </tr>
	          </thead>
	          <tbody>
	          </tbody>
	        </table>
	      </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>


<div id="myModal_Exportar" class="modal fade" role="dialog">
  <div class="modal-dialog modal-lg">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Ventas Semanales</h4>
      </div>
      <div class="modal-body">
        
        <div class="table-responsive">
	        <table class="table table-striped table-bordered table-hover table-responsive" id="Table_Venta_Semanal_Exportar">
	          <thead>
	          <tr>
	            <th>ID Distrib.</th>
	            <th>Distribuidor</th>
				<th>Alias</th>
	            <th>Ciudad</th>
                <th>Estado</th>
                <th>Region</th>
                <th>Zona</th>
	            <th>Dia Envío</th>
	            <th>Total Venta</th>
	            <th>Total Venta Distribuidor</th>
	          </tr>
	          </thead>
	          <tbody>
	          </tbody>
	        </table>
	      </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>


<div id="myModal_Grafica_Cliente" class="modal fade" role="dialog">
  <div class="modal-dialog" id="div_dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title" id="titulo_Modal">Grafica</h4>
      </div>
      <div class="modal-body">
        
        <div class="box-body pocoyo" style="height:500px !important;">
		    <canvas id="Grafica_Linea_Cliente" style="width: 100% !important; height: 100% !important;"></canvas>
		</div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>