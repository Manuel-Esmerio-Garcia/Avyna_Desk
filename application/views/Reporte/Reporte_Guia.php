<br>
<div id="page-wrapper">
	<div class="container-fluid">
		<form action="<?php echo base_url('index.php/Controller_Reporte_Guia/csvExportarReporteGuia') ?>" method="post" accept-charset="utf-8">
			<div class="col-md-12">
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Reportes Guias Envio</h3>
						<div class="box-tools pull-right">
							<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
						</div>
					</div>
					<div class="box-body">

					<div class="col-md-4 col-lg-4 col-sm-12 col-xs-12">
						<div class="form-group">
							<label for="DateStartVentas">Desde:</label>
								<div class="input-group docs-picker">
									<input type="text" class="form-control date-desde" id="DateStartVentas" name="DateStartVentas">
									<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
								</div>    
						</div>
					</div>
					<div class="col-md-4 col-lg-4 col-sm-8 col-xs-8">
						<div class="form-group">
							<label for="DateEndVentas">Hasta:</label>
								<div class="input-group docs-picker">
									<input type="text" class="form-control date-hasta" id="DateEndVentas" name="DateEndVentas">
									<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
								</div>    
						</div>
					</div>
					<div class="col-md-4 col-lg-4 col-sm-4 col-xs-4">
						<div class="form-group">
							<div class="input-group">
								<button type="button" id="searchGuias" class="btn btn-primary" style="margin-top: 25px">Buscar</button>
							</div>    
						</div>
					</div>

						<div class="table-responsive col-md-12">
							<table class="table table-striped table-bordered table-hover table-responsive" id="fetchReporteGuia">
								<thead>
								<tr>
								<th>N° Guia</th>
								<th>idDestinatario</th>
								<th>Razón Social Destinatario</th>
								<th>Destino</th>
								<th>Peso</th>
								<th>Descripción Contenido</th>
								<th>Garantia</th>
								<th>Fecha Envio</th>
								</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
					<div class="box-footer clearfix">
						<button type="submit" class="btn btn-primary btn-flat" style="float: right;">Exportar</button>
					</div>
				</div>
			</div>
		</form>
    </div>  
</div>
