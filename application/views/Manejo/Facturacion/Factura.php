<br>
<div id="page-wrapper">
  <div class="container-fluid">

    <ul class="nav nav-tabs">
    <?php if (is_int(array_search('Nueva_factura_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <li class="active"><a data-toggle="tab" href="#home">Ventas</a></li>
    <?php endif ?>
    <?php if (is_int(array_search('Facturas_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <li><a data-toggle="tab" href="#menu1">Facturas</a></li>
    <?php endif ?>
    <?php if (is_int(array_search('Facturas_canceladas_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <li><a data-toggle="tab" href="#menu2">Facturas Canceladas</a></li>
    <?php endif ?>
    </ul>

    <div class="tab-content">
      <br>
      <!-- Ventas Tab -->
      <?php if (is_int(array_search('Nueva_factura_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <div id="home" class="tab-pane fade in active">
        <div class="container-fluid">
          <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12">
            <div class="form-group input-daterange">
              <label for="DateStartVentas">Desde:</label>
              <div class="input-group">
                <input type="text" class="form-control" id="DateStartVentas" name="DateStartVentas">
                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
              </div>    
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col-sm-10 col-xs-10">
            <div class="form-group input-daterange">
              <label for="DateEndVentas">Hasta:</label>
              <div class="input-group">
                <input type="text" class="form-control" id="DateEndVentas" name="DateEndVentas">
                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
              </div>    
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col-sm-2 col-xs-2">
            <div class="form-group">
              <div class="input-group">
                <button type="button" id="searchVentas" class="btn btn-primary" style="margin-top: 25px">Buscar</button>
              </div>    
            </div>
          </div>
        </div>

        <!-- Tabla de Ventas -->
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title">Ventas</h3>
            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
          </div>
          <div class="box-body">
            <div class="table-responsive">
              <table id="fetchVentas" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Razón Social</th>
                    <th>Subtotal</th>
                    <th>Impuesto</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>País</th>
                    <th>C.P.</th>
                    <th>RFC</th>
                    <th>ID Cliente</th>
                    <th>Venta Directa</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <?php if (is_int(array_search('Nueva_factura_facturar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
          <div class="box-footer clearfix">
            <button type="button" id="btnFacturar" class="btn btn-success">Facturar</button>
            <button type="button" id="loadingFacturar" class="btn btn-success" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
          <?php endif ?>
        </div>
      </div>
      <?php endif ?>
      <!-- Ventas Tab -->

      <!-- Facturas Tab -->
      <?php if (is_int(array_search('Facturas_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <div id="menu1" class="tab-pane fade">
      <form action="<?php echo base_url('index.php/Controller_Factura/csvFactura') ?>" method="post" accept-charset="utf-8" target="_blank">
        <div class="container-fluid">
          <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12">
            <div class="form-group input-daterange">
              <label for="DateStartFacturas">Desde:</label>
              <div class="input-group">
                <input type="text" class="form-control" id="DateStartFacturas" name="DateStartFacturas">
                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
              </div>    
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col-sm-10 col-xs-10">
            <div class="form-group input-daterange">
              <label for="DateEndFacturas">Hasta:</label>
              <div class="input-group">
                <input type="text" class="form-control" id="DateEndFacturas" name="DateEndFacturas">
                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
              </div>    
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col-sm-2 col-xs-2">
            <div class="form-group">
              <div class="input-group">
                <button type="button" id="searchFacturas" class="btn btn-primary" style="margin-top: 25px">Buscar</button>
              </div>    
            </div>
          </div>
        </div>

        <!-- Tabla de Facturas -->
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title">Facturas</h3>
            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
          </div>
          <div class="box-body">
            <div class="table-responsive">
              <table id="fetchFacturas" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th> 
                    <th>Fecha</th> 
                    <th>Distribuidor</th>
                    <th>RFC</th>
                    <th>ID Factura</th>
                    <th>Folio</th>
                    <th>Subtotal</th>
                    <th>Impuesto</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>UUID</th>
                    <th>IDIntegrador</th>
                    <th>Tipo Facturación</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <?php if (is_int(array_search('Facturas_cancelar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
          <div class="box-footer clearfix">
            <button type="button" id="btnCancelarFactura" class="btn btn-danger">Cancelar Factura</button>
            <button type="button" id="loadingCancelarFacturar" class="btn btn-danger" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
            
            <button type="submit" class="btn btn-success" style="float:right;">Exportar</button>
          </div>
          <?php endif ?>
        </div>
        </form>
      </div>
      <?php endif ?>
      <!-- Facturacion Tab -->

      <!-- Facturas Canceladas Tab -->
      <?php if (is_int(array_search('Facturas_canceladas_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <div id="menu2" class="tab-pane fade">
        <div class="container-fluid">
          <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12">
            <div class="form-group input-daterange">
              <label for="DateStartFacturasCanceladas">Desde:</label>
              <div class="input-group">
                <input type="text" class="form-control" id="DateStartFacturasCanceladas" name="DateStartFacturasCanceladas">
                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
              </div>    
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col-sm-10 col-xs-10">
            <div class="form-group input-daterange">
              <label for="DateEndFacturasCanceladas">Hasta:</label>
              <div class="input-group">
                <input type="text" class="form-control" id="DateEndFacturasCanceladas" name="DateEndFacturasCanceladas">
                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
              </div>    
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col-sm-2 col-xs-2">
            <div class="form-group">
              <div class="input-group">
                <button type="button" id="searchFacturasCanceladas" class="btn btn-primary" style="margin-top: 25px">Buscar</button>
              </div>    
            </div>
          </div>
        </div>

        <!-- Tabla de Facturas -->
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title">Facturas Canceladas</h3>
            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
          </div>
          <div class="box-body">
            <div class="table-responsive">
              <table id="fetchFacturasCanceladas" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th> 
                    <th>Fecha</th> 
                    <th>Distribuidor</th>
                    <th>ID Factura</th>
                    <th>Folio</th>
                    <th>Subtotal</th>
                    <th>Impuesto</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>UUID</th>
                    <th>IDIntegrador</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <?php if (is_int(array_search('Facturas_canceladas_recuperar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
          <div class="box-footer clearfix">
            <button type="button" id="btnAcuse" class="btn btn-danger">Recuperar Acuse del SAT</button>
            <button type="button" id="loadingAcuse" class="btn btn-danger" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
          <?php endif ?>
        </div>

      </div>
      <?php endif ?>
      <!-- Facturas Canceladas Tab -->

    </div>

    <div id="modalFacturar" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <i id="loadingModalFacturar" class="fa fa-spinner fa-spin" style="font-size:18px; color: white; float: right; display: none;"></i>
            <button id="btnCerrarModalFacturarM" type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title" id="headerModalFactura"></h4>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <!-- Wizard -->
              <div class="form-group">
                <label id="txtFecha" style="float: right;"></label>
                <br>
              </div>
              <hr>
              <div class="col-md-8 col-lg-8 col-sm-12 col-xs-12">
                <div class="form-group">
                  <img src="<?php echo base_url();?>assets/img/Logo.png" width="250px" height="50px">
                </div>
              </div>
              <div class="col-md-2 col-lg-2 col-sm-6 col-xs-6">
                <div class="form-group">
                  <label>Serie:</label>
                  <input type="text" id="txtSerie" name="txtSerie" class="form-control">
                </div>
              </div>
              <div class="col-md-2 col-lg-2 col-sm-6 col-xs-6">
                <div class="form-group">
                  <label>Folio:</label>
                  <input type="text" id="txtFolio" name="txtFolio" class="form-control" readonly>
                </div>
              </div>

              <!-- Información del Cliente -->
              <div class="form-group">
                <p>Información del Cliente</p>
              </div>                
              <hr>

              <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
                <div style="float: right;">
                  <input type="checkbox" name="checkPublico" id="checkPublico" class="form-check-input">
                  <label class="form-check-label" for="checkPublico" style="color: black;">Publico en General</label>
                </div>
              </div>
              <div class="col-md-3 col-lg-3 col-sm-6 col-xs-6">
                <div class="form-group">
                  <label for="txtRazonSocial" class="form-control-label">Razon Social*:</label>
                  <input class="form-control" id="txtRazonSocial" name="txtRazonSocial" type="text" required="required" readonly>
                </div>
              </div>
              <div class="col-md-3 col-lg-3 col-sm-6 col-xs-6">
                <div class="form-group">
                  <label for="txtRFC" class="form-control-label">RFC*:</label>
                  <input class="form-control" id="txtRFC" name="txtRFC" type="text" required="required" readonly>
                </div>
              </div>
              <div class="col-md-3 col-lg-3 col-sm-6 col-xs-6">
                <div class="form-group">
                  <label for="txtPC" class="form-control-label">C.P.*:</label>
                  <input class="form-control" id="txtPC" name="txtPC" type="text" required="required">
                </div>
              </div>
              <div class="col-md-3 col-lg-3 col-sm-6 col-xs-6">
                <div class="form-group">
                  <label for="txtPais" class="form-control-label">País:</label>
                  <input class="form-control" id="txtPais" name="txtPais" type="text">
                </div>
              </div>

              <div class="table-responsive col-md-12 col-lg-12 col-xs-12 col-sm-12">
                <table id="fetchInfoVenta" class="table table-striped table-bordered" width="100%">
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
                  <tbody></tbody>
                </table> 
              </div>

              <div class="form-group">
                <p>Complementos</p>
                <hr>
              </div>

              <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                  <div class="form-group">
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
                  <!-- Alerta de la forma de pago Publico en general -->
                  <div class="alert alert-warning alert-dismissible" id="alertFormaPago" style="display: none;">
                      <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                      <strong>Forma de Pago Publico en General!</strong> Se debe de colocar la forma de pago con la cual se pago la mayor parte del comprobante.
                  </div>
                  <div class="form-group">
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
                  <div class="form-group">
                    <label for="selectMetodoPago" class="form-control-label">Metodo de Pago*:</label>
                    <select class="form-control" id="selectMetodoPago" name="selectMetodoPago" type="text">
                      <option value="PUE">PUE - Pago en una sola exhibición</option>
                      <option value="PPD">PPD - Pago en parcialidades o diferido</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="txtCondicionPago" class="form-control-label">Condición de Pago:</label>
                    <input class="form-control" id="txtCondicionPago" name="txtCondicionPago" type="text">
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="txtMoneda" class="form-control-label">Moneda*:</label>
                    <select class="form-control" id="txtMoneda" name="txtMoneda" type="text">
                      <option value="MXN">MXN - Peso Mexicano</option>
                      <!--<option value="USD" disabled>USD - Dolar americano</option>-->
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="txtComprobante" class="form-control-label">Tipo de Comprobante*:</label>
                    <select class="form-control" id="txtComprobante" name="txtComprobante" type="text" readonly>
                      <option value="I">I - Ingreso</option>
                      <!--<option value="E" disabled>E - Egreso</option>
                      <option value="T" disabled>T - Translado</option>
                      <option value="N" disabled>N - Nómina</option>
                      <option value="P" disabled>P - Pago</option>-->
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="txtObservaciones" class="form-control-label">Observaciones de la Factura:</label>
                    <textarea class="form-control" id="txtObservaciones" name="txtObservaciones" type="text" rows="5" placeholder="Observaciones dentro del PDF"></textarea>
                  </div>        
                </div>
                
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <p>Relacionar CFDI's (Para CFDI's Cancelados)</p>
                    <hr>
                  </div>

                  <div class="form-check">
                    <input type="checkbox" name="checkRelacion" id="checkRelacion" class="form-check-input" value="0">
                    <label class="form-check-label" for="checkRelacion" style="color: black;">Relacionar CFDI's</label>
                  </div>

                  <div class="form-group" id="divRelacion" style="display: none;">
                    <label for="txtTipoRelacion" class="form-control-label">Tipo de Relación:</label>
                    <select class="form-control" id="txtTipoRelacion" name="txtTipoRelacion" type="text">
                      <option value="">Seleccionar ...</option>
                      <!--<option value="01" disabled>01 - Nota de crédito de los documentos relacionados</option>
                      <option value="02" disabled>02 - Nota de débito de los documentos relacionados</option>
                      <option value="03" disabled>03 - Devolución de mercancía sobre facturas o traslados previos</option>-->
                      <option value="04">04 - Sustitución de los CFDI previos</option>
                      <!--<option value="05" disabled>05 - Traslados de mercancias facturados previamente</option>
                      <option value="06" disabled>06 - Factura generada por los traslados previos</option>
                      <option value="07" disabled>07 - CFDI por aplicación de anticipo</option>
                      <option value="08" disabled>08 - Factura generada por pagos en parcialidades</option>
                      <option value="09" disabled>09 - Factura generada por pagos diferidos</option>-->
                    </select>
                  </div>

                  <div class="form-group" id="divListFactura" style="display: none;">
                    <table id="fetchRelacionFacturas" class="table table-striped table-bordered" width="100%">
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
                      <tbody></tbody>
                    </table> 
                  </div>
                </div>
                
              </div>
            </div>
            <!-- Wizard -->
          </div>
          <div class="modal-footer">
            <button type="button" id="btnCerrarModalFacturar" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            <button type="button" id="loadingCerrarModalFacturar" class="btn btn-danger" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

            <button type="button" id="btnFacturarModal" class="btn btn-success">Facturar</button>
            <button type="button" id="loadingFacturarModal" class="btn btn-success" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Facturar Wizards --->

  </div>
</div>