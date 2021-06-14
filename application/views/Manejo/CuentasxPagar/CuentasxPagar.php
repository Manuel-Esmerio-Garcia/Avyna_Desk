<br>

<div id="page-wrapper">
  <div class="container-fluid">
    <ul class="nav nav-tabs">
      <?php if (is_int(array_search('Cuentas_x_cobrar_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
        <li class="active"><a data-toggle="tab" href="#home">Cuentas x Cobrar</a></li>
      <?php endif ?>
      <?php if (is_int(array_search('Pagos_realizados_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
        <li><a data-toggle="tab" href="#menu1">Pagos Realizados</a></li>
      <?php endif ?>
      <?php if (is_int(array_search('Pagos_pendientes_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
        <li><a data-toggle="tab" href="#menu2">Pagos Pendientes</a></li>
      <?php endif ?>
      <?php if (is_int(array_search('Reporte_x_cobrar_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
        <li><a data-toggle="tab" href="#menu3">Reporte x Cobrar</a></li>
      <?php endif ?>
      <?php if (is_int(array_search('Reporte_pagos_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
        <li><a data-toggle="tab" href="#menu4">Reporte Pagos</a></li>
      <?php endif ?>
    </ul>

    <div class="tab-content">
    <br>
      <!-- Cuentas x Cobrar Cuentas_x_cobrar_ver -->
      <?php if (is_int(array_search('Cuentas_x_cobrar_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
        <div id="home" class="tab-pane fade in active">
          <div class="form-group">
            <label>Bodega:</label>
            <select name="selectBranch" id="selectBranch" onchange="btnSearch()" class="form-control">
              <option value="">Seleccionar...</option>
              <?php foreach ($Bodega as $key => $value) { ?>
                <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
              <?php } ?>
            </select>
          </div>

          <div class="col-md-12 col-sm-12 col-xs-12 col-lg-12">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">Cuentas Por Cobrar</h3>
                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                </div>
              </div>
              <div class="box-body">
                <div class="container-fluid">
                  <div class="input-daterange">
                    <div class="form-group col-lg-5 col-md-5 col-sm-12 col-xs-12">
                      <label for="dateReferenciaStart" class="form-control-label">Desde:</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="dateReferenciaStart" name="dateReferenciaStart" autocomplete="off">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                      </div>    
                    </div>
                    <div class="form-group col-lg-5 col-md-5 col-sm-10 col-xs-10">
                      <label for="dateReferenciaEnd" class="form-control-label">Hasta:</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="dateReferenciaEnd" name="dateReferenciaEnd" autocomplete="off">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                      </div>    
                    </div>
                  </div>

                  <div class="form-group col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    <div class="input-group">
                      <input type="button" name="search" value="Buscar" onclick="btnSearch()" class="btn btn-primary btn-flat" style="margin-top: 25px"/>  
                    </div>    
                  </div>

                </div>

                <div class="table-responsive">
                  <table id="fetchCuentasXPagar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID de la Venta</td>
                        <td>Distribuidor</td>
                        <td>Fecha</td>
                        <td>Total</td>
                        <td>Adeudo</td>
                        <td>Referencia</td>
                        <td>#</td>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
              <!-- <?php if (is_int(array_search('Pagos_realizados_rechazar', array_column($_SESSION['Permisos'], 'Permiso')))): ?> -->
                <div class="box-footer">
                  <button type="button" class="btn btn-primary" style="float: right;" id="btnPagoReferenciado" onclick="btnWebServiceBanregio()">Procesar pago referenciados</button>
                  <button type="button" class="btn btn-primary" style="float: right; display: none;" disabled id="loadingPagoReferenciado"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
                </div>
              <!-- <?php endif ?> -->
            </div>
          </div>

        </div>
      <?php endif ?>
      <!-- Cuentas x Cobrar -->

      <!-- Pagos Realizados -->
      <?php if (is_int(array_search('Pagos_realizados_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
        <div id="menu1" class="tab-pane fade">
          <div class="form-group">
            <label>Bodega:</label>
            <select name="select_Bodega" id="select_Bodega" class="form-control">
              <option value="">Seleccionar...</option>
              <?php foreach ($Bodega as $key => $value) { ?>
                      <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
                  <?php } ?>
            </select>
          </div>

          <div class="col-md-8 col-sm-12 col-xs-12 col-lg-8">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">Pagos Realizados</h3>
                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                </div>
              </div>
              <div class="box-body">
                <div class="container-fluid">
                  <div class="input-daterange">
                    <div class="form-group col-md-3" style="max-width: 225px;">
                      <label for="Fecha_Inicio" class="form-control-label">Desde:</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="dateStart" name="dateStart" autocomplete="off">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                      </div>    
                    </div>
                    <div class="form-group col-md-3" style="max-width: 225px;">
                      <label for="Fecha_Fin" class="form-control-label">Hasta:</label>
                      <div class="input-group">
                        <input type="text" class="form-control" max="<?php echo date("Y-m-d"); ?>" id="dateEnd" name="dateEnd" autocomplete="off">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                      </div>    
                    </div>
                  </div>

                  <div class="form-group col-md-2">
                    <div class="input-group">
                      <input type="button" name="search" id="search_Realizado" value="Buscar" class="btn btn-primary btn-flat" style="margin-top: 25px"/>  
                    </div>    
                  </div>

                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="selectDistribuidor">Distribuidor:</label>
                      <select class="form-control" id="selectDistribuidor">
                        <option value="">Seleccionar...</option>
                        <?php foreach ($Distribuidor as $key => $value) { ?>
                          <option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'].' '.$value['Apellidos'] ?></option>
                        <?php } ?>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="table-responsive">
                  <table id="fetchPagosRealizados" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID de la Venta</td>
                        <td>Fecha Pago</td>
                        <td>Monto de Pago</td>
                        <td>Status</td>
                        <td>ID de Pago</td>
                        <td>Fecha venta</td>
                        <td>idDistribuidor</td>
                        <td>Nombre del Distribuidor</td>
                        <td>Apellidos del Distribuidor</td>
                        <td>Total</td>
                        <td>Observaciones</td>
                      </tr>
                    </thead>
                    <tbody id="tbodyPagosRealizados"></tbody>
                  </table>
                </div>
              </div>
              <?php if (is_int(array_search('Pagos_realizados_rechazar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                <div class="box-footer">
                  <button type="button" class="btn btn-danger" style="float: left;" id="btnRechazarPago">Rechazar Pago</button>
                  <button type="button" id="loadingRechazarPago" class="btn btn-danger" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
                </div>
              <?php endif ?>
            </div>
          </div>

          <div class="col-md-12 col-sm-12 col-lg-4 col-xs-12">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">Imagen</h3>
                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                </div>
              </div>
              <div class="box-body">
                <label style="float: left;">Banco: <span id="label_Banco_R"></span></label>
                <label style="float: right;">Cantidad: $<span id="label_Cantidad_R"></span></label>
                <div class="col-lg-12" id="Div_Imagen_R" align="center"></div>
              </div>
            </div>
          </div>

        </div>
      <?php endif ?>
      <!-- Pagos Realizados -->

      <!-- Pagos Pendientes -->
      <?php if (is_int(array_search('Pagos_pendientes_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
        <div id="menu2" class="tab-pane fade">
          <form action="<?php echo base_url('index.php/Controller_Cuentas_x_Pagar/csvPagosPendientes') ?>" method="post" accept-charset="utf-8" method="post" accept-charset="utf-8">
            <div class="form-group">
              <label>Bodega:</label>
              <select name="select_Bodega_Pendientes" id="select_Bodega_Pendientes" class="form-control">
                <option value="">Seleccionar...</option>
                <?php foreach ($Bodega as $key => $value) { ?>
                        <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
                    <?php } ?>
              </select>
            </div>

            <div class="col-md-8 col-sm-12 col-xs-12 col-lg-8">
              <div class="box">
                <div class="box-header with-border">
                  <h3 class="box-title">Pagos Pendientes</h3>
                  <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                  </div>
                </div>
                <div class="box-body">
                  <div class="container-fluid">
                    <div class="col-lg-12">
                      <div class="input-daterange">
                        <div class="form-group col-md-3 col-lg-3 col-sm-6 col-xs-12" style="max-width: 225px;">
                          <label for="Fecha_Inicio" class="form-control-label">Desde:</label>
                          <div class="input-group">
                            <input type="text" class="form-control" id="dateStartPendiente" name="dateStartPendiente" autocomplete="off">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                          </div>    
                        </div>
                        <div class="form-group col-md-3 col-lg-3 col-sm-6 col-xs-12" style="max-width: 225px;">
                          <label for="Fecha_Fin" class="form-control-label">Hasta:</label>
                          <div class="input-group">
                            <input type="text" class="form-control" max="<?php echo date("Y-m-d"); ?>" id="dateEndPendiente" name="dateEndPendiente" autocomplete="off">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                          </div>    
                        </div>
                      </div>
                      <div class="form-group col-md-2 col-lg-2 col-sm-6 col-xs-12">
                        <div class="input-group">
                          <input type="button" name="searchPendientes" id="searchPendientes" value="Buscar" class="btn btn-primary btn-flat" style="margin-top: 25px"/>  
                        </div>    
                      </div>

                      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="form-group">
                          <label for="selectDistribuidorPendiente">Distribuidor:</label>
                          <select class="form-control" id="selectDistribuidorPendiente" name="selectDistribuidorPendiente">
                            <option value="">Seleccionar...</option>
                            <?php foreach ($Distribuidor as $key => $value) { ?>
                              <option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'].' '.$value['Apellidos'] ?></option>
                            <?php } ?>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="table-responsive col-lg-12">
                      <table id="fetchPagosPendientes" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                        <thead>
                          <tr>
                            <td>ID de la Venta</td>
                            <td>Fecha Pago</td>
                            <td>Monto de Pago</td>
                            <td>Status</td>
                            <td>ID de Pago</td>
                            <td>Fecha venta</td>
                            <td>Nombre del Distribuidor</td>
                            <td>Apellidos del Distribuidor</td>
                            <td>Total</td>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="box-footer">
                  <?php if (is_int(array_search('Pagos_pendientes_confirmar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                    <button type="button" class="btn btn-primary" id="btnConfirmarPago">Confirmar Pago</button>
                    <button type="button" class="btn btn-primary" id="loadingConfirmarPago"  disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
                  <?php endif ?>
                  <?php if (is_int(array_search('Pagos_pendientes_confirmartodos', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                    <button type="button" class="btn btn-default" id="btnConfirmarTodosPago">Confirmar Todos los Pagos</button>
                    <button type="button" class="btn btn-default" id="loadingConfirmarTodosPago" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
                  <?php endif ?>
                  <?php if (is_int(array_search('Pagos_pendientes_exportar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                    <button type="submit" class="btn btn-success" style="float: right; margin-left: 5px;" id="btnExportar">Exportar</button>
                    <button type="button" class="btn btn-success" style="float: right; margin-left: 5px; display: none;" id="loadingExportar" disabled><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
                  <?php endif ?>
                  <?php if (is_int(array_search('Pagos_pendientes_rechazar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                    <button type="button" class="btn btn-danger" style="float: right;" id="btnRechazarPagoPendiente">Rechazar Pago</button>
                    <button type="button" class="btn btn-danger" style="float: right; display: none;" id="loadingRechazarPagoPendiente" disabled><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
                  <?php endif ?>
                </div>
              </div>
            </div>

            <div class="col-md-12 col-sm-12 col-lg-4 col-xs-12">
              <div class="box">
                <div class="box-header with-border">
                  <h3 class="box-title">Imagen</h3>
                  <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                  </div>
                </div>
                <div class="box-body">
                  <label style="float: left;">Banco: <span id="label_Banco"></span></label>
                  <label style="float: right;">Cantidad: $<span id="label_Cantidad"></span></label>
                  <div class="col-lg-12" id="Div_Imagen" align="center"></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      <?php endif ?>
      <!-- Pagos Pendientes -->

      <!-- Reporte x Cobrar -->
      <?php if (is_int(array_search('Reporte_x_cobrar_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
        <div id="menu3" class="tab-pane fade">
          <h3>Reporte x Cobrar</h3>
          <br>
          <div align="center">
            <h3 style="text-align: center;">PROXIMAMENTE</h3>
            <img src="<?php echo base_url('assets/img/Proximamente1.png') ?>" alt="" align="center">
          </div>
        </div>
      <?php endif ?>

      <!-- Reporte Pagos -->
      <?php if (is_int(array_search('Reporte_pagos_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
        <div id="menu4" class="tab-pane fade">
          <form action="<?php echo base_url('index.php/Controller_Cuentas_x_Pagar/csvReportePagos') ?>" method="post" accept-charset="utf-8" method="post" accept-charset="utf-8">
            <div class="form-group">
              <label>Bodega:</label>
              <select name="select_Reporte_Pago" id="select_Reporte_Pago" class="form-control">
                <option value="">Seleccionar...</option>
                <?php foreach ($Bodega as $key => $value) { ?>
                        <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
                    <?php } ?>
              </select>
            </div>

            <div class="col-md-12 col-sm-12 col-xs-12 col-lg-12">
              <div class="box">
                <div class="box-header with-border">
                  <h3 class="box-title">Reporte Pagos</h3>
                  <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                  </div>
                </div>
                <div class="box-body">
                  <div class="container-fluid">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div class="input-daterange">
                        <div class="form-group col-md-4 col-lg-4 col-sm-6 col-xs-12" style="max-width: 225px;">
                          <label for="dateReportePago" class="form-control-label">Fecha de Consulta:</label>
                          <div class="input-group">
                            <input type="text" class="form-control" autocomplete="off" id="dateReportePago" name="dateReportePago">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                          </div>    
                        </div>
                      </div>
                    </div>

                    <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <table id="fetchReportePagos" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                        <thead>
                          <tr>
                            <td>N° de Venta</td>
                            <td>Fecha</td>
                            <td>Monto de Pago</td>
                            <td>idDistribuidor</td>
                            <td>Nombre</td>
                            <td>Apellidos</td>
                            <td>#</td>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="box-footer">
                  <button type="submit" class="btn btn-success" style="float: right; margin-left: 5px;" id="btnExportarPagos">Exportar</button>
                  <button type="button" class="btn btn-success" style="float: right; margin-left: 5px; display: none;" id="loadingExportarPagos" disabled><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      <?php endif ?>


    </div>
  </div>
</div>