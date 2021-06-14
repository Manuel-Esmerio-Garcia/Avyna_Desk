<div id="page-wrapper">
	<div class="container-fluid">

		<ul class="nav nav-tabs">
		    <li class="active"><a data-toggle="tab" href="#Factura-generica-tab-link">Factura Generica</a></li>
		    <li><a data-toggle="tab" href="#clientes-factura-generica-tab-link">Facturas Creadas</a></li>
		    <li><a data-toggle="tab" href="#clientes-factura-Facturadas-tab-link">Facturas Timbradas</a></li>
		</ul>

		<div class="tab-content">
		<br>
			<!-- Tab Factura Generica -->
			<div id="Factura-generica-tab-link" class="tab-pane fade in active">
				<p>Factura Generica</p>
		        <ul class="nav nav-tabs">
				    <li id="Modulo_Emisor" role="presentation" class="active"><a id="home-tabb" href="#tab_content11" role="tab" data-toggle="tab" aria-controls="home" aria-expanded="true">Emisor/Receptor</a>                               </li>
                    <li id="Modulo_Comprobante" role="presentation" class=""><a role="tab" href="#tab_content22" id="profile-tabb" data-toggle="tab" aria-controls="profile" aria-expanded="false">Comprobante</a>
                    </li>
                    <li id="Modulo_Factura"  role="presentation" class=""><a  role="tab" href="#tab_content33" id="profile-tabb3" data-toggle="tab" aria-controls="profile" aria-expanded="false">Previsualizar</a>
                    </li>
				</ul>

				<div class="tab-content">
				<br>
					<!-- Tab Emisor -->
					<div id="tab_content11" class="tab-pane fade in active" aria-labelledby="home-tab">
						
						<!-- Panel Datos del emisor -->
						<div class="panel panel-default">
						  	<div class="panel-heading">
						  		<h4 class="panel-title">
						  			Datos del emisor
						  		</h4>
						  	</div>
						  	<div class="panel-body">
						  		<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" style="max-width: 300px;">
						  			<label for="txtRFC">RFC:*</label>
						  			<input type="text" class="form-control" id="txtRFC" value="<?php echo $Empresa[0]['RFC'] ?>" readonly>
						  		</div>

						  		<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
						  			<label for="txtEmpresa">Nombre o razón social:</label>
						  			<input type="text" class="form-control" id="txtEmpresa" value="<?php echo $Empresa[0]['Razon_Social'] ?>" readonly>
						  		</div>

						  		<div class="form-group col-lg-8 col-md-8 col-sm-12 col-xs-12">
						  			<label for="selectRegimen">Régimen fiscal:* <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Selecciona el régimen fiscal al que le aplicarás la factura." title=""></span></label>
						  			<select name="selectRegimen" id="selectRegimen" class="form-control">
						  				<option value="601">601 General de Ley Personas Morales</option>
						  			</select>
						  		</div>

						  		<div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
						  			<label for="selectTipo">Tipo de Factura:* <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Consulta la guía de llenado para saber más sobre los tipos de factura." title=""></span></label>
						  			<select name="selectTipo" id="selectTipo" class="form-control">
						  				<option value="I">I Ingreso</option>
						  			</select>
						  		</div>

						  	</div>
						</div>

						<!-- Panel Datos del receptor -->
						<div class="panel panel-default">
						  	<div class="panel-heading">
						  		<h4 class="panel-title">
						  			Datos del receptor
						  		</h4>
						  	</div>
						  	<div class="panel-body">

						  		<div class="form-group col-lg-8 col-md-8 col-sm-12 col-xs-12">
						  			<label for="selectClienteFrecuente">Cliente frecuente:* <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Selecciona un cliente de la lista, si no aparece, selecciona 'Otro' para registrar uno distinto." title=""></span></label>
						  			<select name="selectClienteFrecuente" id="selectClienteFrecuente" class="form-control">
						  				<option value="">Seleccionar...</option>
						  				<option value="XAXX010101000">XAXX010101000 PUBLICO EN GENERAL</option>
						  			</select>
						  		</div>

						  		<div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
						  			<label for="selectUsoCFDi">Uso de la factura:* <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Selecciona el uso que el receptor le dará a la factura. Consulta la guía de llenado para saber más." title=""></span></label>
						  			<select name="selectUsoCFDi" id="selectUsoCFDi" class="form-control">
						  				<option value="">Seleccionar...</option>
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
								
								<div class="info" style="display: none;">
							  		<div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
							  			<label for="txtRFCReceptor">RFC:* <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Escribe el RFC de tu cliente; si no lo conoce usa XEXX010101000 si es extranjero o XAXX010101000 si es nacional." title=""></span></label>
							  			<input type="text" class="form-control" id="txtRFCReceptor">
							  		</div>

							  		<div class="form-group col-lg-8 col-md-8 col-sm-12 col-xs-12">
							  			<label for="txtEmpresaReceptor">Nombre o razón social:* <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Registra el nombre de tu cliente, si no lo conoces se puede omitir." title=""></span></label>
							  			<input type="text" class="form-control" id="txtEmpresaReceptor">
							  		</div>
								</div>

						  	</div>
						</div>

						<div class="pull-left text-muted text-vertical-align-button">
                            * Campos obligatorios
                        </div>

                        <div class="pull-right form-group">
                            <button class="btn btn-primary" type="button" role="tab" id="tab-next" data-toggle="tab" aria-controls="profile" aria-expanded="false">Siguiente</button>
                        </div>
					</div>
					<!-- Tab Emisor -->

					<!-- Tab Comprobante -->
					<div id="tab_content22" class="tab-pane fade">
						<!-- Panel Comprobante -->
						<div class="panel panel-default">
						  	<div class="panel-heading">
						  		<h4 class="panel-title">
						  			Comprobante
						  		</h4>
						  	</div>
						  	<div class="panel-body">

						  		<div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
						  			<label for="txtFecha">Fecha y hora de expedición:*<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Registra la fecha y hora de la venta, verifica que corresponde con tu horario local." title=""></span></label>
						  			<?php $Fecha = date("Y-m-d H:m:s");
	                                      $Fecha_Complete = satxmlsv33_xml_fech($Fecha);
	                                ?>
						  			<input type="text" class="form-control" id="txtFecha" value="<?php echo $Fecha_Complete ?>" readonly>
						  		</div>

						  		<div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
						  			<label for="txtCP">Código postal:* <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Registra el código postal del lugar de expedición de la factura (domicilio de la matriz o de la sucursal)" title=""></span></label>
						  			<input type="text" class="form-control" id="txtCP">
						  		</div>

						  		<div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
						  			<label for="selectMoneda">Moneda:* <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Selecciona la moneda de los importes de la factura." title=""></span></label>
						  			<select name="selectMoneda" id="selectMoneda" class="form-control">
						  				<option value="MXN">MXN Peso Mexicano</option>
						  			</select>
						  		</div>

						  		<div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
						  			<label for="selectFormaPago">Forma de pago: <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Selecciona la forma en que el receptor paga la factura, si la pagará después usa '99 Por definir'." title=""></span></label>
						  			<select name="selectFormaPago" id="selectFormaPago" class="form-control">
						  				<option value="">Seleccionar...</option>
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

						  		<div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
						  			<label for="selectMetodoPago">Método de pago: <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Selecciona si se paga en una exhibición, a plazos o diferido. Si la pagará después usa la clave PPD." title=""></span></label>
						  			<select name="selectMetodoPago" id="selectMetodoPago" class="form-control">
						  				<option value="">Seleccionar...</option>
                                        <option value="PUE">PUE - Pago en una sola exhibición</option>
                                        <option value="PPD">PPD - Pago en parcialidades o diferido</option>
						  			</select>
						  		</div>

						  		<div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
						  			<label for="txtTipoCambio">Tipo de cambio: <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Registra el número de pesos que equivalen a una unidad de la moneda extranjera." title=""></span></label>
						  			<input type="text" name="txtTipoCambio" id="txtTipoCambio" class="form-control">
						  		</div>

						  		<div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
						  			<label for="txtSerie">Serie: <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Número de serie de la factura que usas para control interno, generalmente se usan letras" title=""></span></label>
						  			<input type="text" name="txtSerie" id="txtSerie" class="form-control">
						  		</div>

						  		<div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
						  			<label for="txtFolio">Folio: <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Número de folio de la factura que usas para control interno, generalmente se usan números." title=""></span></label>
						  			<input type="text" name="txtFolio" id="txtFolio" class="form-control">
						  		</div>

						  		<div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
						  			<label for="txtConfirmacion">Confirmación: <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Se debe registrar la clave de confirmación que entregue el SAT, para expedir una factura electrónica que registra un tipo de cambio o un total fuera del rango establecido." title=""></span></label>
						  			<input type="text" name="txtConfirmacion" id="txtConfirmacion" class="form-control" readonly>
						  		</div>
						
								<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
						  			<label for="txtCondiciones">Condiciones de pago: <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Registra las condiciones comerciales aplicables para el pago de la factura, por ejemplo plazos o políticas de crédito." title=""></span></label>
						  			<input type="text" name="txtCondiciones" id="txtCondiciones" class="form-control" readonly>
						  		</div>  		

						  	</div>
						</div>

						<!-- Panel CFDi Relacionados -->
						<div class="panel panel-default">
						  	<div class="panel-heading">
						  		<h4 class="panel-title">
                					<input class="check-box" data-val="true" data-val-required="The Facturas relacionadas field is required." id="EditarCfdiRelacionados" name="EditarCfdiRelacionados" type="checkbox" value="false">
                					<label class="control-label" for="EditarCfdiRelacionados">Facturas relacionadas:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Consulta la guía de llenado para ver ejemplos." title=""></span></label>
            					</h4>
						  	</div>
						  	<div class="panel-body">

						  		<div class="form-group col-lg-8 col-md-8 col-sm-12 col-xs-12">
						  			<label for="selectTipoRelacion">Tipo de relación:* <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Selecciona el efecto de esta factura sobre la relacionada." title=""></span></label>
						  			<select name="selectTipoRelacion" id="selectTipoRelacion" class="form-control" disabled>
						  				<option value="">Seleccionar...</option>
                                        <option value="04">04 Sustitución de los CFDI previos</option>
						  			</select>
						  		</div>

						  		<div class="form-group col-lg-8 col-md-8 col-sm-12 col-xs-12 UUID" style="display: none;">
						            <div class="form-group">
						                <label class="control-label" for="UUID">Folio fiscal<span class="required-validation-error">*</span>:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Registra el folio fiscal de la factura relacionada." title=""></span></label>
						                <input class="form-control text-box single-line valid" data-val="true" data-val-regex="Longitud y/o formato de datos inválidos." data-val-regex-pattern="[a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}" data-val-required="Este campo es obligatorio." id="UUID" name="UUID" type="text" value="" placeholder="FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF" maxlength="36" autocomplete="off" aria-required="true" aria-describedby="UUID-error" aria-invalid="false">
						                <small><span class="form-text form-text-error field-validation-valid" data-valmsg-for="UUID" data-valmsg-replace="true"></span></small>
						            </div>
						        </div>

							    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						  			<div class="clearfix form-group">
				                        <div class="pull-left text-muted text-vertical-align-button">
				                            * Campos obligatorios
				                        </div>
				                        <div class="pull-right">
				                            <button class="btn btn-primary" type="button" id="btnAceptarRelacion" disabled>Nuevo</button>
				                            <button class="btn btn-default" type="button" id="btnCancelarRelacion" style="display: none;">Cancelar</button>
				                            <button class="btn btn-primary" type="button" id="btnAddRelacion" style="display: none;">Agregar</button>
				                        </div>
				                    </div>
							    </div>

						  	</div>
						</div>























						<!-- Panel Conceptos -->
						<div class="panel panel-default">
						  	<div class="panel-heading">
						  		<h4 class="panel-title">
                					Conceptos
            					</h4>
						  	</div>
						  	<div class="panel-body">

						  		<div style="display: none;" id="divConcepto">
						  			<ul class="nav nav-tabs">
	                					<li class="active"><a data-toggle="tab" href="#home">Nuevo Concepto</a></li>
	                					<li id="Tab_impuestos" style="display: none;"><a data-toggle="tab" href="#impuesto">Impuesto</a></li>
	              					</ul>
	              					<br>

	              					<div class="tab-content">
	              						<!-- Tab Nuevo Concepto -->
                						<div id="home" class="tab-pane fade in active">
					                      	<div class="col-md-4 col-sm-4 col-xs-4">
					                          	<div class="form-group">
					                              	<label class="control-label" for="ClaveProdServ">Clave de producto o servicio<span class="required-validation-error">*</span>:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Escribe la clave completa. Usa la herramienta para identificarla." title=""></span></label>
					                              	<input type="text" name="txt_clave_sat" id="txt_clave_sat" class="form-control input-number" maxlength="8" minlength="8">
					               	           	</div>
					                      	</div>

					                      	<div class="col-md-4 col-sm-4 col-xs-4">
						                      	<div class="form-group">
						                          	<label class="control-label" for="ClaveUnidad">Clave de unidad<span class="required-validation-error">*</span>:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Escribe la clave completa. Usa la herramienta para identificarla." title=""></span></label>
						                          	<input type="text" name="txt_clave_unidad" id="txt_clave_unidad" class="form-control" maxlength="3" minlength="3">
						                      	</div>
						                    </div>

					                      	<div class="col-md-4 col-sm-4 col-xs-4">
					                          	<div class="form-group">
					                              	<label class="control-label" for="Cantidad">Cantidad<span class="required-validation-error">*</span>:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Registra la cantidad de bienes o servicios que correspondan a este concepto." title=""></span></label>
					                              	<input type="text" name="txt_Cantidad" id="txt_Cantidad" class="form-control input-number">
					                          	</div>
					                      	</div>

								          	<div class="col-md-4 col-sm-4 col-xs-4">
								              	<div class="form-group">
								                  	<label class="control-label" for="Unidad">Unidad:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Registra la unidad de medida del bien o servicio propia de tu operación, debe corresponder con la  descripción. Se puede omitir." title=""></span></label>
								                  	<input type="text" name="txt_Unidad" id="txt_Unidad" class="form-control">
								              	</div>
								          	</div>
                    
						                    <div class="col-md-8 col-sm-8 col-xs-8">
						                      	<div class="form-group">
						                          	<label class="control-label" for="NoIdentificacion">Número de identificación:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Registra opcionalmente el código de barras, número de parte, SKU o clave equivalente, propio de tu operación." title=""></span></label>
						                          	<input type="text" name="txt_Numero_identificacion" id="txt_Numero_identificacion" class="form-control" maxlength="250">
						                      	</div>
						                    </div>

							                <div class="col-md-12 col-sm-12 col-xs-12">
							                  	<div class="form-group">
							                     	<label class="control-label" for="Descripcion">Descripción<span class="required-validation-error">*</span>:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Registra la descripción del bien o servicio propia de tu operación." title=""></span></label>
							                      	<input type="text" name="txt_Descripcion" id="txt_Descripcion" class="form-control" maxlength="250">
							                  	</div>
							                </div>

						                    <div class="col-md-4 col-sm-4 col-xs-4">
						                        <label class="control-label" for="ValorUnitario">Valor unitario<span class="required-validation-error">*</span>:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Registra el valor o precio unitario del bien o servicio." title=""></span></label>
						                        <input type="text" name="txt_Valor_Unitario" id="txt_Valor_Unitario" onkeypress="return filterFloat_Decimal(event,this);" class="form-control">
						                    </div>

						                    <div class="col-md-4 col-sm-4 col-xs-4">
						                        <label class="control-label" for="Importe">Importe<span class="required-validation-error">*</span>:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Es el importe total de los bienes o servicios, se obtiene al multiplicar la cantidad por el valor unitario." title=""></span></label>
						                        <input type="text" name="txt_Importe" id="txt_Importe" class="form-control" readonly>
						                    </div>

						                    <div class="col-md-4 col-sm-4 col-xs-4">
						                      	<label class="control-label" for="Descuento">Descuento:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Registra el importe de los descuentos aplicables al concepto." title=""></span></label>
						                      	<div class="input-group">
						                        	<input type="number" name="txt_Descuento" id="txt_Descuento" class="form-control" onkeypress="return filterFloat_Decimal(event,this);" maxlength="3">
						                          	<span class="input-group-addon">%</span>
						                      	</div>
						                    </div>

							                <div class="col-md-3 col-sm-3 col-xs-3">
							                    <div class="form-group" style="margin-top: 15px;">
							                        <h3>Adicionales</h3>
							                    </div>
							                    <div class="form-check">
							                        <input type="checkbox" class="form-check-input" id="Check_Impuesto" disabled>
							                        <label class="control-label" for="Check_Impuesto">Impuestos:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Marca el recuadro si este concepto tiene impuestos." title=""></span></label>
							                    </div>
							                </div>

							                <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: center; margin-top: 15px;">
							                  	<div class="form-group">
							                        <div class="alert alert-info alert-dismissible fade in">
							                            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
							                            Buscador de claves del SAT para unidades de medida y descripciónes de Productos.<br>
							                            <a target="_blank" href="http://200.57.3.89/PyS/catPyS.aspx">Buscador...</a>
							                        </div>
							                  	</div>
							                </div>
                						</div>
                						<!-- End Tab Nuevo Concepto -->

                						<div id="impuesto" class="tab-pane fade">
                						</div>
                					</div>
						  		</div>

						  		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						  			<div class="clearfix form-group">
				                        <div class="pull-left text-muted text-vertical-align-button">
				                            * Campos obligatorios
				                        </div>
				                        <div class="pull-right">
				                            <button class="btn btn-primary" type="button" id="btnAddConcepto">Nuevo</button>
				                            <button class="btn btn-default" type="button" id="btnCancelar" style="display: none;">Cancelar</button>
				                            <button class="btn btn-primary" type="button" id="btnAddMovimiento" style="display: none;">Agregar</button>
				                        </div>
				                    </div>
							    </div>

							    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="divListProductos" style="margin-top: 15px; display: none;">
		              				<div class="form-group">
				                        <div class="table table-responsive">
				                            <table id="fetchListProducto" class="table table-sm table-hover table-bordered table-striped">
				                              <thead>
				                                <tr>
				                                  <th scope="col">Codigo</th>
				                                  <th scope="col">Cantidad</th>
				                                  <th scope="col">Unidad</th>
				                                  <th scope="col">Clave Unidad</th>
				                                  <th scope="col">Clave Producto</th>
				                                  <th scope="col">Descripción</th>
				                                  <th scope="col">Valor Unitario</th>
				                                  <th scope="col">Importe</th>
				                                  <th scope="col">Desc. %</th>
				                                  <th scope="col">Desc.</th>
				                                  <th scope="col">#</th>
				                                  <th scope="col" hidden>Unidad</th>
				                                </tr>
				                              </thead>
				                              <tbody></tbody>
				                            </table>
				                        </div>
		             				</div>
								</div>

						  	</div>
						</div>

						<div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
							<!-- Panel Impuestos Transladados -->
							<div class="panel panel-default" style="display: none;">
							  	<div class="panel-heading">
							  		<h4 class="panel-title">
	                					Impuestos trasladados: <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Es la suma de los impuestos trasladados, agrupados por impuesto, y en su caso tasa, que se desprenden de los conceptos." title=""></span>
	            					</h4>
							  	</div>
							  	<div class="panel-body">
							  	</div>
							</div>

							<!-- Panel Impuestos retenidos -->
							<div class="panel panel-default" style="display: none;">
							  	<div class="panel-heading">
							  		<h4 class="panel-title">
	                					Impuestos retenidos: <span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Es la suma de los impuestos retenidos, agrupados por impuesto, que se desprenden de los conceptos." title=""></span>
	            					</h4>
							  	</div>
							  	<div class="panel-body">
							  	</div>
							</div>

						</div>

						<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							
							<div class="panel-group">
					            <div class="panel panel-default">
					                <div class="panel-collapse collapse in">
					                    <div class="panel-body">
					                        <div class="row">
					                            <div class="col-md-12">
					                                <div class="form-group">
					                                    <label class="control-label" for="SubTotal">Subtotal<span class="required-validation-error">*</span>:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Es la suma de los importes de los conceptos." title=""></span></label>
					                                    <input class="form-control derecha text-box single-line" data-val="true" data-val-regex="El campo debe contener máximo 18 enteros y 6 decimales." data-val-regex-pattern="[0-9]{1,18}(.[0-9]{1,6})?" data-val-required="Este campo es obligatorio." id="SubTotal" name="SubTotal" type="text" value="0.00" readonly="readonly">
					                                    <small><span class="field-validation-valid form-text form-text-error" data-valmsg-for="SubTotal" data-valmsg-replace="true"></span></small>
					                                </div>
					                            </div>
					                        </div>
					                        <div class="row">
					                            <div class="col-md-12">
					                                <div class="form-group">
					                                    <label class="control-label" for="Descuento">Descuento:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Es la suma de los descuentos registrados en los conceptos." title=""></span></label>
					                                    <input class="form-control derecha text-box single-line" data-val="true" data-val-regex="El campo debe contener máximo 18 enteros y 6 decimales." data-val-regex-pattern="[0-9]{1,18}(.[0-9]{1,6})?" id="Descuento" name="Descuento" type="text" value="0.00" readonly="readonly">
					                                    <small><span class="field-validation-valid form-text form-text-error" data-valmsg-for="Descuento" data-valmsg-replace="true"></span></small>
					                                </div>
					                            </div>
					                        </div>
					                        <div class="row">
					                            <div class="col-md-12">
					                                <div class="form-group">
					                                    <label class="control-label" for="Impuestos_TotalImpuestosTrasladados">IVA (16%):<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Es la suma de los impuestos trasladados que se desprenden de los conceptos." title=""></span></label>
					                                    <input class="form-control derecha text-box single-line" data-val="true" data-val-regex="El campo debe contener máximo 18 enteros y 6 decimales." data-val-regex-pattern="[0-9]{1,18}(.[0-9]{1,6})?" id="Impuestos_TotalImpuestosTrasladados" name="Impuestos.TotalImpuestosTrasladados" type="text" value="0.00" readonly="readonly">
					                                    <small><span class="field-validation-valid form-text form-text-error" data-valmsg-for="Impuestos.TotalImpuestosTrasladados" data-valmsg-replace="true"></span></small>
					                                </div>
					                            </div>
					                        </div>
					                        <div class="row" style="display: none;">
					                            <div class="col-md-12">
					                                <div class="form-group">
					                                    <label class="control-label" for="Impuestos_TotalImpuestosRetenidos">Total de impuestos retenidos:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Es la suma de los impuestos retenidos que se desprenden de los conceptos." title=""></span></label>
					                                    <input class="form-control derecha text-box single-line" data-val="true" data-val-regex="El campo debe contener máximo 18 enteros y 6 decimales." data-val-regex-pattern="[0-9]{1,18}(.[0-9]{1,6})?" id="Impuestos_TotalImpuestosRetenidos" name="Impuestos.TotalImpuestosRetenidos" type="text" value="0.00" readonly="readonly">
					                                    <small><span class="field-validation-valid form-text form-text-error" data-valmsg-for="Impuestos.TotalImpuestosRetenidos" data-valmsg-replace="true"></span></small>
					                                </div>
					                            </div>
					                        </div>
					                        <div class="row">
					                            <div class="col-md-12">
					                                <div class="form-group">
					                                    <label class="control-label" for="Total">Total<span class="required-validation-error">*</span>:<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Es la suma del subtotal menos los descuentos más los impuestos trasladados menos los impuestos retenidos." title=""></span></label>
					                                    <input class="form-control derecha text-box single-line" data-val="true" data-val-regex="El campo debe contener máximo 18 enteros y 6 decimales." data-val-regex-pattern="[0-9]{1,18}(.[0-9]{1,6})?" data-val-required="Este campo es obligatorio." id="Total" name="Total" type="text" value="0.00" readonly="readonly">
					                                    <small><span class="field-validation-valid form-text form-text-error" data-valmsg-for="Total" data-valmsg-replace="true"></span></small>
					                                </div>
					                            </div>
					                        </div>
					                    </div>
					                </div>
					            </div>
					        </div>
						</div>

						<div class="clearfix form-group">
	                        <div class="pull-left text-muted text-vertical-align-button">
	                            * Campos obligatorios
	                        </div>
	                        <div class="pull-right">
	                            <button class="btn btn-default" type="button">Atrás</button>
	                            <button class="btn btn-default" type="button">Sellar comprobante</button>
	                            <button class="btn btn-primary" type="button">Siguiente</button>
	                        </div>
	                    </div>

					</div>
					<!-- Tab Comprobante -->
					
					<!-- Tab Previsualizar -->
					<div id="tab_content33" class="tab-pane fade">
					</div>
					<!-- Tab Presualizar -->

				</div>

			</div>
			<!-- Tab Factura Generica -->

			<!-- Tab Facturas Creadas -->
			<div id="clientes-factura-generica-tab-link" class="tab-pane fade">
				<p>Facturas Creadas</p>
			</div>
			<!-- Tab Facturas Creadas -->
			
			<!-- Tab Facturas Timbradas -->
			<div id="clientes-factura-Facturadas-tab-link" class="tab-pane fade">
				<p>Facturas Timbradas</p>
			</div>
			<!-- Tab Facturas Timbradas -->
		</div>
	</div>
</div>

<?php

    function satxmlsv33_xml_fech($fech)
    {
	    $ano = substr($fech,0,4);
	    $mes = substr($fech,5,2);
	    $dia = substr($fech,8,2);
	    $hor = substr($fech,11,2);
	    $min = substr($fech,14,2);
	    $seg = substr($fech,17,2);
	    $aux = $ano."-".$mes."-".$dia."T".$hor.":".$min.":".$seg;
	    if ($aux == "--T::")
	        $aux = "";
	    return ($aux);
    }
?>