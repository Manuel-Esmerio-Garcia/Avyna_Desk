<div id="VentasWeb">
<loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>

	<div class="container-fluid">

        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Ventas WEB</h3>
                    <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    </div>
                </div>
                <div class="box-body">					  	
                    <div class="container-fluid">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                <div class="form-group input-daterange">
                                    <label for="DateStartVentasDirectas">Desde:</label>
                                    <div class="input-group"> 
                                    <input type="text" class="form-control" id="DateStartVentasWeb" name="DateStartVentasDirectas" v-model="start_date" autocomplete="off">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                                    </div>    
                                </div>
                            </div>
                            <div class="col-md-4 col-lg-4 col-sm-10 col-xs-10">
                                <div class="form-group input-daterange">
                                    <label for="DateEndVentasDirectas">Hasta:</label>
                                    <div class="input-group">
                                    <input type="text" class="form-control" id="DateEndVentasWeb" name="DateEndVentasDirectas" v-model="end_date" autocomplete="off">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                                    </div>    
                                </div>
                            </div>
                            <div class="col-md-4 col-lg-4 col-sm-2 col-xs-2">
                                <div class="form-group">
                                    <div class="input-group">
                                    <button type="button" @click="_BuscarDate" class="btn btn-primary" style="margin-top: 25px">Buscar</button>
                                    </div>    
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">

							<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div class="form-check" style="float: right;">
									<input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="checkit" @change="_actionCheckit">
									<label class="form-check-label" for="exampleCheck1">Mostrar Ventas Sin Transacción</label>
								</div>
							</div>

                            <table class="table table-striped table-bordered table-hover" id="fetchVentasWeb" width="100%">
                                <caption>Ventas Web</caption>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Fecha</th>
                                        <th>N° Cliente Menudeo</th>
                                        <th>Cliente Menudeo</th>
                                        <th>Monto</th>
                                        <th>Adeudo</th>
                                        <th>Status</th>
                                        <th>Extraido</th>
										<th>PAYPAL</th>
                                        <th>N° Pago</th>
										<th>N° Orden</th>
                                        <th>N° Salon</th>
                                        <th>Salon</th>
                                        <th>N° Distribuidor</th>
                                        <th>Distribuidor</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>

				<div class="box-footer">
					<button class="btn btn-danger" @click="_btnEliminar"><i class="fa fa-trash" aria-hidden="true"></i></button>
					
					<button class="btn bg-maroon margin" style="margin-left: 10px;" @click="_btnDeleteSales">Eliminar ventas pendientes</button>
					<button class="btn btn-outline-primary" style="float: right; margin-left: 10px;" @click="_btnSubir">Subir archivo Entrega ESTAFETA</button>
					<button class="btn btn-primary" style="float: right; margin-left: 10px;" @click="_btnEnviarRecordatorio">Enviar recordatorio clientes con adeudo</button>
					<button class="btn btn-success" style="float: right;" @click="_btnFacturaGlobal">Generar Factura Global</button>
					<?php if ($_SESSION['Avyna'][0]['Email'] == 'gsierra@avyna.info' || $_SESSION['Avyna'][0]['Email'] == 'paty@avyna.info' || $_SESSION['Avyna'][0]['Email'] == 'jabreu@avyna.info' || $_SESSION['Avyna'][0]['Email'] == 'manuel@integratto.com.mx') { ?>
						<button class="btn btn-warning" @click="_btnEliminarAdeudo">Eliminar Adeudo</button>
					<?php } ?>
				</div>
            </div>
        </div>

		<div class="modal" id="modalSubirArchvio" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<form method="POST" action="http://integrattodev.cloudapp.net/WebServiceSendMail/SendEntregaGlobal.php" accept=".xlsx,.xls" enctype="multipart/form-data" target="_blank">
						<div class="modal-header bg-primary">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
							<h3 class="modal-title">Subir archivo ESTAFETA</h3>
						</div>
						<div class="modal-body">
							<div class="form-group">
								<label for="exampleFormControlFile1">Archivo ESTAFETA:</label>
								<input type="file" class="form-control-file" name="fileEstafeta" id="exampleFormControlFile1" required>
							</div>
							
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
							<button type="submit" class="btn btn-primary" @clik="actionUpload">Subir</button>
						</div>
					</form>
				</div>
			</div>
		</div>

        <!-- Modal -->
		<div id="modalInfoCliente" class="modal fade" role="dialog">
		  <div class="modal-dialog">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-header bg-primary">
		        <button type="button" class="close" data-dismiss="modal">&times;</button>
		        <h4 class="modal-title">Información Cliente</h4>
		      </div>
		      <div class="modal-body">
		        <div class="container-fluid">

					<div class="alert alert-warning" role="alert" id="alertInvoice" style="display: none;">
						No es posible facturar esta venta ya que el cliente no cuenta con RFC y/o razón social
					</div>

		        	<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
		        		<label for="txtClienteInfo">Razón Social:</label>
		        		<input type="text" class="form-control" id="txtClienteInfo" name="txtClienteInfo">
		        	</div>

		        	<div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
		        		<label for="txtRFCInfo">RFC:</label>
		        		<input type="text" class="form-control" id="txtRFCInfo" name="txtRFCInfo">
		        	</div>

		        	<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtCPInfo">CP:</label>
		              <input type="number" class="form-control" id="txtCPInfo" maxlength="5">
		            </div>
		            
		            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtColoniaInfo">Colonia:</label>
		              <input list="txtColoniaInfo" name="txtColoniaInfo" class="form-control txtColonia" type="text" placeholder="Elige una colonia">
		              <datalist id="txtColoniaInfo">
		              </datalist>
		            </div>

		            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtEstadoInfo">Estado:</label>
		              <input type="text" class="form-control" id="txtEstadoInfo">
		            </div>
		            
		            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtPaisInfo">País:</label>
		              <input type="text" class="form-control" id="txtPaisInfo">
		            </div>

		            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtMunicipioInfo">Municipio:</label>
		              <input type="text" class="form-control" id="txtMunicipioInfo">
		            </div>

					<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
	                    <label for="selectUsoCFDi" class="form-control-label">Uso del CFDi*:</label>
	                    <select class="form-control" id="selectUsoCFDi" name="selectUsoCFDi" type="text">
	                      <option value="P01">P01 - Por definir</option>
	                      <option value="G01">G01 - Adquisición de mercancias</option>
	                      <option value="G02">G02 - Devoluciones, descuentos o bonificaciones</option>
	                      <option value="G03">G03 - Gastos en general</option>
	                      <option value="I01">I01 - Construcciones</option>
	                      <option value="I02">I02 - Mobilario y equipo de oficina por inversiones</option>
	                      <option value="I03">I03 - Equipo de transporte</option>
	                      <option value="I04">I04 - Equipo de computo y accesorios</option>
	                      <option value="I05">I05 - Dados, troqueles, moldes, matrices y herramental</option>
	                      <option value="I06">I06 - Comunicaciones telefónicas</option>
	                      <option value="I07">I07 - Comunicaciones satelitales</option>
	                      <option value="I08">I08 - Otra maquinaria y equipo</option>
	                      <option value="D01">D01 - Honorarios médicos, dentales y gastos hospitalarios</option>
	                      <option value="D02">D02 - Gastos médicos por incapacidad o discapacidad</option>
	                      <option value="D03">D03 - Gastos funerales</option>
	                      <option value="D04">D04 - Donativos</option>
	                      <option value="D05">D05 - Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)</option>
	                      <option value="D06">D06 - Aportaciones voluntarias al SAR</option>
	                      <option value="D07">D07 - Primas por seguros de gastos médicos</option>
	                      <option value="D08">D08 - Gastos de transportación escolar obligatoria</option>
	                      <option value="D09">D09 - Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones</option>
	                      <option value="D10">D10 - Pagos por servicios educativos (colegiaturas)</option>
	                    </select>
	                </div>
					
					<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
	                    <label for="selectFormaPago" class="form-control-label">Forma de Pago*:</label>
	                    <select class="form-control" id="selectFormaPago" name="selectFormaPago" type="text">
	                      <option value="01">01 - Efectivo</option>
	                      <option value="02">02 - Cheque nominativo</option>
	                      <option value="03">03 - Transferencia electrónica de fondos</option>
	                      <option value="04">04 - Tarjeta de crédito</option>
	                      <option value="05">05 - Monedero electrónico</option>
	                      <option value="06">06 - Dinero electrónico</option>
	                      <option value="08">08 - Vales de despensa</option>
	                      <option value="12">12 - Dación en pago</option>
	                      <option value="13">13 - Pago por subrogación</option>
	                      <option value="14">14 - Pago por consignación</option>
	                      <option value="15">15 - Condonación</option>
	                      <option value="17">17 - Compensación</option>
	                      <option value="23">23 - Novación</option>
	                      <option value="24">24 - Confusión</option>
	                      <option value="25">25 - Remisión de deuda</option>
	                      <option value="26">26 - Prescripción o caducidad</option>
	                      <option value="27">27 - A satisfacción del acreedor</option>
	                      <option value="28">28 - Tarjeta de débito</option>
	                      <option value="29">29 - Tarjeta de servicios</option>
	                      <option value="30">30 - Aplicación de anticipos</option>
	                      <option value="31">31 - Intermediario pagos</option>
	                      <option value="99">99 - Por definir</option>
	                    </select>
	                </div>

                  	<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
	                    <label for="selectMetodoPago" class="form-control-label">Metodo de Pago*:</label>
	                    <select class="form-control" id="selectMetodoPago" name="selectMetodoPago" type="text">
	                      <option value="PUE">PUE - Pago en una sola exhibición</option>
	                      <option value="PPD">PPD - Pago en parcialidades o diferido</option>
	                    </select>
                  	</div>

		            <div class="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12">
		              <label for="txtObservacionesInfo">Observaciones:</label>
		              <textarea class="form-control" id="txtObservacionesInfo"></textarea>
		            </div>

		        </div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-danger" id="btnCerrarModalInfo" style="float: left;" data-dismiss="modal">Cerrar</button>
		        <button type="button" class="btn btn-danger" id="loadingCerrarModalInfo" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading... </button>

		        <button type="button" class="btn btn-primary" id="btnFacturar" style="float: right;">Facturar</button>
		        <button type="button" class="btn btn-primary" id="loadingFacturar" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading... </button>
		      </div>
		    </div>

		  </div>
		</div>

    </div>
</div>