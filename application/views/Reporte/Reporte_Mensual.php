
<br>
<div id="page-wrapper">
	<div class="container-fluid">
		<div id="page-wrapper">

			<form action="<?php echo base_url('Clases/Exportar_Reporte_Mensual.php') ?>" method="post" accept-charset="utf-8">

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
		              <h3 class="box-title">Ventas 4 Meses</h3>

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
		              <h3 class="box-title">Ventas Mensuales</h3>

		              <div class="box-tools pull-right">
		                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
		                </button>
		              </div>
		            </div>
		            <!-- /.box-header -->
		            <div class="box-body">
					
					<div class="row">
						<div class="col-md-12">
							<div class="form-group">
								<label for="select_Bloque">Bloques Distribuidor:*</label>
								<select name="select_Bloque" id="select_Bloque" class="form-control">
									<option value="">Seleccionar...</option>
									<?php foreach ($Bloque as $key => $value) { ?>
					  					<option value="<?php echo $value['ID']; ?>"><?php echo utf8_encode(utf8_decode($value["Bloque"])); ?></option>
					  				<?php } ?>
								</select>
							</div>				
						</div>		            	

		              <div class="table-responsive col-md-12">
		                <table class="table table-striped table-bordered table-hover table-responsive" id="Table_Venta_Semanal">
		                  <thead>
		                  <tr>
		                    <th>ID Distrib.</th>
		                    <th>Distribuidor</th>
							<th>Alias</th>
							<th>Coordinador</th>
							<th>Director</th>
		                    <th>Ciudad</th>
		                    <th>Estado</th>
		                    <th>Region</th>
		                    <th>Zona</th>
		                    <th>Dia Envío</th>
		                    <th>Total Venta (Precio Publico)</th>
		                    <th>Total Venta Distribuidor (Precio Publico)</th>
		                    <th>Cuota</th>
							<th>Fecha</th>
		                    <th>Porcentaje</th>
		                    <th>Bloque</th>
		                    <th>Cuota Final</th>
		                    <th>#</th>
		                  </tr>
		                  </thead>
		                  <tbody>
		                  </tbody>
		                </table>
		              </div>

		            </div>
		              <!-- /.table-responsive -->
		            </div>
		            <!-- /.box-body -->
		            <div class="box-footer clearfix">
		            	<button type="submit" class="btn btn-primary btn-flat" style="float: right;">Exportar</button>
		            </div>
		            <!-- /.box-footer -->
		          </div>
			</div>

		</form>
				
 		</div>
 	</div>
</div>

<!-- Modal Ficha -->
<div class="modal" tabindex="-1" role="dialog" id="modalFicha">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-primary">
	  	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h5 class="modal-title">Ficha del Cliente</h5>
      </div>
      <div class="modal-body row">
        <div class="fluid-container">
			
			<div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
				<p><h5 id="txtDistribuidor"></h5> 
			</div>

			<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				<h5 id="txtidDistribuidor" style="float: right;"></h5></p>
			</div>

			<div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<table class="table table-striped table-bordered table-hover table-responsive">
					<tbody>
						<tr>
							<th>SALONES ACTIVOS (12 SEMANAS)</th>
							<td id="txtCantidadSalones" style="text-align: center;"></td>
						</tr>
						<tr>
							<th>SALONES ACTIVOS (TRIMESTRE ANTERIOR)</th>
							<td id="txtCantidadSalonesTrimestral" style="text-align: center;"></td>
						</tr>
						<tr>
							<th>SALONES NUEVOS (12 SEMANAS)</th>
							<td id="txtNuevoSalones12" style="text-align: center;"></td>
						</tr>
						<tr>
							<th>SALONES ADICIONALES (12 SEMANAS)</th>
							<td id="txtSalonesAdicionales12" style="text-align: center;"></td>
						</tr>
						<tr>
							<th>PERDIDA SALONES MENSUAL</th>
							<td id="txtPerdidaSalones" style="text-align: center;"></td>
						</tr>
						<tr>
							<th>SALONES NUEVOS (4 SEMANAS)</th>
							<td id="txtNuevoSalones" style="text-align: center;"></td>
						</tr>
						<tr>
							<th>VENTAS POR MES (4 SEMANAS)</th>
							<td id="txtVentasMes" style="text-align: center;"></td>
						</tr>
						<tr>
							<th>VENTAS CLIENTES NUEVOS MES (4 SEMANAS)</th>
							<td id="txtVentasNuevoSalones" style="text-align: center;"></td>
						</tr>
						<tr>
							<th>VENTAS MES ANTERIOR (4 SEMANAS - 8 SEMANAS)</th>
							<td id="txtVentasMesAnterior" style="text-align: center;"></td>
						</tr>
						<tr>
							<th>CANTIDAD SALONES CON VENTA ULTIMAS (4 SEMANAS)</th>
							<td id="txtUltimasVentas" style="text-align: center;"></td>
						</tr>
						<tr>
							<th>CANTIDAD SALONES CON VENTA MES ANTERIOR (8 - 4 SEMANAS)</th>
							<td id="txtUltimasVentasMes" style="text-align: center;"></td>
						</tr>
						<tr>
							<th>VENTAS ULTIMAS (12 SEMANAS)</th>
							<td id="txtUltimasVentas12" style="text-align: center;"></td>
						</tr>
						<tr>
							<th>PROMEDIO VENTAS POR SALON</th>
							<td id="txtPromedioVentas" style="text-align: center;"></td>
						</tr>

						<!--<tr>
							<th>PROMEDIO VENTAS POR SALON ANTERIOR</th>
							<td id="txtPromedioVentasAnt" style="text-align: center;"></td>
						</tr>-->

						<tr>
							<th> CLIENTES ACTIVOS RED (12 SEMANAS)</th>
							<td id="txtActiveRed" style="text-align: center;"></td>
						</tr>
						<tr>
							<th>CLIENTES ACTIVOS BLACK (12 SEMANAS)</th>
							<td id="txtActiveBlack" style="text-align: center;"></td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>
      </div>
      <div class="modal-footer">
	  	<div class="fluid-container">
        	<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
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

		<div class="container-fluid">
			
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
		            <th>Total S/Descuento</th>
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
        <h4 class="modal-title">Ventas Mensuales</h4>
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
        
        <div class="box-body pocoyo"  style="height:500px !important;">
		    <canvas id="Grafica_Linea_Cliente" style="width: 100% !important; height: 100% !important;"></canvas>
		</div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>