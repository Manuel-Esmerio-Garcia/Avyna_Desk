<div id="invoice">
	<loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true" :z-index="9999"></loading>
	<div class="container-fluid">
		<div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Ventas por Facturar</a></li>
              <li class=""><a href="#tab_2" data-toggle="tab" aria-expanded="false">Ventas Facturadas</a></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="tab_1">

                    <div class="box">
                        <div class="box-body">
                            <div class="table-responsive col-lg-12 col-md-12 col-sm-12">
                                <table id="fetchSale" class="table table-striped table-bordered table-hover table-sm" style="width: 100%">
                                    <caption>Ventas Por Facturar</caption>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Fecha</th>
                                        <th>Cliente</th>
                                        <th>Cantidad Producto</th>
                                        <th>Monto</th>
                                        <th>Adeudo</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        <div class="box-footer clearfix">
                            <button class="btn btn-success" style="float: right;" @click="_btnInvoiceSale">Generar Factura</button>
                        </div>
                    </div>
              </div>
              <!-- /.tab-pane -->
              <div class="tab-pane" id="tab_2">
                <div class="box">
                    <div class="box-header with-border">
                        <h3 class="box-title">Ventas Timbradas</h3>
                        <div class="box-tools pull-right">
                          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                        </div>
                    </div>
                    <div class="box-body">
                        <div class="table-responsive col-lg-12 col-md-12 col-sm-12">
                            <table id="fetchInvoice" class="table table-striped table-bordered table-hover table-sm" style="width: 100%">
                                <caption>Ventas Timbradas</caption>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>N° Venta</th>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>Cantidad Producto</th>
                                    <th>Monto</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="box-footer clearfix">
                        <button class="btn btn-danger" @click="_btnCancelarFactura" style="float: right;" v-if="StatusSelect != '' && StatusSelect == 'Timbrado'">Cancelar Factura</button>

                        <button class="btn btn-danger" @click="_RecuperarAcuse" v-if="StatusSelect != '' && StatusSelect == 'Cancelado'">Recuperar Acuse</button>
                        <button class="btn btn-primary" @click="_RecuperarXML" v-if="StatusSelect != '' && StatusSelect == 'Timbrado'"><i class='fa fa-file-code-o' aria-hidden='true'></i></button>
                        <button class="btn btn-danger" @click="_RecuperarPDF" v-if="StatusSelect != '' && StatusSelect == 'Timbrado'"><i class='fa fa-file-pdf-o' aria-hidden='true'></i></button>
                    </div>
                </div>

              </div>
              <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
        </div>

        <!-- Modal Facturación -->
		<div id="modalInvoice" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" style="overflow-y:auto;">
			<loading :active="activeModal" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true" :z-index="9999"></loading>
			<div class="modal-dialog modal-lg" role="document" style="max-width: 1000px !important;">
				<div class="modal-content">
                    <div class="modal-header bg-primary">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 class="modal-title">{{invoice.tittle}}</h3>
                    </div>
                    <div class="modal-body">
                        <div class="fluid-container">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label style="float: right;">{{invoice.date}}</label>
                                    <br>
                                    <hr>
                                </div>
                                <hr>
                            </div>
                            <div class="col-md-8 col-lg-8 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <p>Avyna Cosméticos </p>
                                    <!--<img src="<?php echo base_url();?>assets/images/AdminLTELogo.png" width="250px" height="50px">-->
                                </div>
                            </div>
                            <div class="col-md-2 col-lg-2 col-sm-6 col-xs-6">
                                <div class="form-group">
                                    <label>Serie: <i class="fa fa-question-circle" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Número de serie de la factura que usas para control interno, generalmente se usan letras."></i></label>
                                    <input type="text" class="form-control" v-model="invoice.serie">
                                </div>
                            </div>
                            <div class="col-md-2 col-lg-2 col-sm-6 col-xs-6">
                                <div class="form-group">
                                    <label>Folio: <i class="fa fa-question-circle" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Número de folio de la factura que usas para control interno, generalmente se usan números."></i></label>
                                    <input type="text" v-model="objSale.ID" class="form-control" readonly>
                                </div>
                            </div>
                            <hr>
                            <!-- Información del Cliente -->
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <p>Información del Cliente</p>
                                </div>
                                <hr>
                            </div>         
                            <div class="col-md-3 col-lg-3 col-sm-6 col-xs-6">
                                <div class="form-group">
                                    <label class="form-control-label">Razon Social*:</label>
                                    <input class="form-control" v-model="objClient.Empresa" type="text" readonly>
                                </div>
                            </div>
                            <div class="col-md-3 col-lg-3 col-sm-6 col-xs-6">
                                <div class="form-group">
                                    <label class="form-control-label">N° Registro Tributario*:</label>
                                    <input class="form-control" v-model="objClient.RFC" type="text" readonly>
                                </div>
                            </div>
                            <div class="col-md-3 col-lg-3 col-sm-6 col-xs-6">
                                <div class="form-group">
                                    <label class="form-control-label">RFC*:</label>
                                    <input class="form-control" value="XEXX010101000" type="text" readonly>
                                </div>
                            </div>
                            <div class="col-md-3 col-lg-3 col-sm-6 col-xs-6">
                                <div class="form-group">
                                    <label class="form-control-label">Residencia Fiscal*:</label>
                                    <input class="form-control" value="USA" type="text" readonly>
                                </div>
                            </div>                        
                            <!-- Complementos -->
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <p>Información de la venta</p>
                                </div>
                                <hr>
                            </div>
                            
                            <div class="table-responsive col-md-12 col-lg-12 col-xs-12 col-sm-12">
                                <table id="fetchInfoVenta" class="table table-striped table-bordered" width="100%">
                                    <caption>Información de la venta</caption>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Fecha</th>
                                            <th>Distribuidor</th>
                                            <th>Razón Social</th>
                                            <th>Subtotal</th>
                                            <th>Impuesto</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{objSale.ID}}</td>
                                            <td>{{objSale.Fecha}}</td>
                                            <td>{{objSale.Cliente}}</td>
                                            <td>{{objSale.Razon_social}}</td>
                                            <td>{{objSale.Subtotal}}</td>
                                            <td>{{objSale.Impuestos}}</td>
                                            <td>{{objSale.Total}}</td>
                                            <td>{{objSale.Status}}</td>
                                        </tr>
                                    </tbody>
                                </table> 
                            </div>
                            
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6"></div>
    
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                <div class="form-group">
                                    <label class="form-control-label">Tipo de Cambio*:</label>
                                    <input class="form-control" type="number" v-model="invoice.typeChange">
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                <div class="form-group">
                                    <label class="form-control-label">Total USD:</label>
                                    <input class="form-control" type="number" v-model="CalcularTotal">
                                </div>
                            </div>
                            
                            <div class="table-responsive col-md-12 col-lg-12 col-xs-12 col-sm-12">
                                <table id="fetchInfoDetailVenta" class="table table-striped table-bordered" width="100%">
                                    <caption>Movimientos de la venta</caption>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Codigo</th>
                                            <th>Producto</th>
                                            <th>Cant.</th>
                                            <th>P. Unitario</th>
                                            <th>Importe</th>
                                            <th>Fracción Arancelaria</th>
                                            <th>UMT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in objDetails">
                                            <td>{{item.ID}}</td>
                                            <td>{{item.Codigo}}</td>
                                            <td>{{item.Producto}}</td>
                                            <td>{{item.Cantidad_Real}}</td>
                                            <td><input type="number" class="form-control" v-model="item.Precio_unitario" style=""></td>
                                            <td>{{item.Importe = item.Cantidad_Real * item.Precio_unitario}}</td>
                                            <td><input type="text" class="form-control" @change="validateUMT(item,item.Fraccion)" v-model="item.Fraccion"></td>
                                            <td><input type="text"  class="form-control" v-model="item.UMT" readonly></td>
                                        </tr>
                                    </tbody>
                                </table> 
                            </div>
                            
                            <!-- Complementos -->
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <p>Complementos</p>
                                </div>
                                <hr>
                            </div>
    
                            <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                                <div class="form-group">
                                    <label class="form-control-label">Uso del CFDi*: <i class="fa fa-question-circle" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Selecciona el uso que el receptor le dará a la factura. Consulta la guía de llenado para saber más."></i></label>
                                    <select class="form-control" v-model="invoice.useCFDi">
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
                            </div>
    
                            <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                                <div class="form-group">
                                    <label class="form-control-label">Forma de Pago*: <i class="fa fa-question-circle" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Selecciona la forma en que el receptor paga la factura, si la pagará después usa '99 Por definir'."></i></label>
                                    <select class="form-control" v-model="invoice.wayToPay" @change="_changeWayPay">
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
                            </div>
                            <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                                <div class="form-group">
                                    <label class="form-control-label">Método de Pago*: <span class="fa fa-question-circle" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Selecciona si se paga en una exhibición, a plazos o diferido. Si la pagará después usa la clave PPD."></i></label>
                                    <select class="form-control" v-model="invoice.methodOfPayment" @change="_changeMethodPayment">
                                        <option value="PUE">PUE - Pago en una sola exhibición</option>
                                        <option value="PPD">PPD - Pago en parcialidades o diferido</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                                <div class="form-group">
                                    <label class="form-control-label">Condición de Pago: <i class="fa fa-question-circle" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Registra las condiciones comerciales aplicables para el pago de la factura, por ejemplo plazos o políticas de crédito."></i></label>
                                    <input class="form-control" type="text" v-model="invoice.paymentCondition">
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                                <div class="form-group">
                                    <label class="form-control-label">Moneda*: <i class="fa fa-question-circle" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Selecciona la moneda de los importes de la factura."></i></label>
                                    <select class="form-control" v-model="invoice.currency">
                                        <option v-for="(currency, index) in objCurrency" :disabled="currency.ClaveSAT != 'USD'" :value="currency.ClaveSAT">{{currency.ClaveSAT + "-" + currency.Moneda}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                                <div class="form-group">
                                    <label class="form-control-label">Tipo de Comprobante*: <i class="fa fa-question-circle" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Consulta la guía de llenado para saber más sobre los tipos de factura."></i></label>
                                    <select class="form-control" v-model="invoice.voucher">
                                        <option value="I">I - Ingreso</option>
                                        <option value="E" disabled>E - Egreso</option>
                                        <option value="T" disabled>T - Translado</option>
                                        <option value="N" disabled>N - Nómina</option>
                                        <option value="P" disabled>P - Pago</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                                <div class="form-group">
                                    <label class="form-control-label">Observaciones de la Factura:</label>
                                    <textarea class="form-control" rows="5" placeholder="Observaciones dentro del PDF" v-model="invoice.observations"></textarea>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                                <!-- Alerta de la forma de pago Publico en general -->
                                <div class="alert alert-warning alert-dismissible" style="margin-top: 35px;">
                                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                    <strong>Forma de Pago Publico en General!</strong> Se debe de colocar la forma de pago con la cual se pago la mayor parte del comprobante.
                                </div>
                            </div>
    
                            <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <p>Relacionar CFDI's (Para CFDI's Cancelados)</p>
                                    <hr>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12"> 
                                <div class="form-check" style="float: right;">
                                    <input type="checkbox" class="form-check-input" v-model="invoice.relateCFDi" @change="_changeRelateCFDi">
                                    <label class="form-check-label" style="color: black;">Relacionar CFDI's</label>
                                </div>
                                <br>
                            </div>
                            <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" v-show="invoice.validateType">
                                <div class="form-group">
                                    <label class="form-control-label">Tipo de Relación: <i class="fa fa-question-circle" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Selecciona el efecto de esta factura sobre la relacionada."></i></label>
                                    <select class="form-control" v-model="invoice.typeOfRelationship">
                                        <option value="">Seleccionar ...</option>
                                        <option value="01" disabled>01 - Nota de crédito de los documentos relacionados</option>
                                        <option value="02" disabled>02 - Nota de débito de los documentos relacionados</option>
                                        <option value="03" disabled>03 - Devolución de mercancía sobre facturas o traslados previos</option>
                                        <option value="04">04 - Sustitución de los CFDI previos</option>
                                        <option value="05" disabled>05 - Traslados de mercancias facturados previamente</option>
                                        <option value="06" disabled>06 - Factura generada por los traslados previos</option>
                                        <option value="07" disabled>07 - CFDI por aplicación de anticipo</option>
                                        <option value="08" disabled>08 - Factura generada por pagos en parcialidades</option>
                                        <option value="09" disabled>09 - Factura generada por pagos diferidos</option>
                                    </select>
                                </div>
                                <!-- Table CDFi Cancelados -->
                                <div class="form-group">
                                    <table id="tableRelateCFDi" class="table table-striped table-bordered" width="100%">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>UUID</th>
                                            <th>Serie</th>
                                            <th>Folio</th>
                                            <th>Fecha</th>
                                            <th>Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(cfdi, index) in objCFDiRelate">
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" class="form-check-input CFDi" v-model="cfdi.Relate">
                                                    </div>
                                                </td>
                                                <td>{{cfdi.UUID}}</td>
                                                <td>{{cfdi.Serie}}</td>
                                                <td>{{cfdi.Folio}}</td>
                                                <td>{{cfdi.Fecha_timbrado}}</td>
                                                <td>{{cfdi.Total}}</td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-success" @click="_btnFacturar">Facturar</button>
                    </div>
                </div>
            </div>
        </div>
		


	</div>
</div>