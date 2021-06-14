<div id="page-wrapper">
  <div class="container-fluid">
    
    <ul class="nav nav-tabs">
      <?php if (is_int(array_search('Inventario_General_Ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
        <li class="active"><a data-toggle="tab" href="#home">Inventario General</a></li>
      <?php endif ?>
      <?php if (is_int(array_search('Inventario_Bodega_Ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <li><a data-toggle="tab" href="#menu1">Inventario Bodega</a></li>
      <?php endif ?>
      <?php if (is_int(array_search('Inventario_Locacion_Ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <li><a data-toggle="tab" href="#menu2">Inventario Por Locación</a></li>
      <?php endif ?>
      <?php if (is_int(array_search('Movimientos_Locacion_Mover', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <li><a data-toggle="tab" href="#menu3">Movimientos Locación</a></li>
      <?php endif ?>
      <?php if (is_int(array_search('Movimientos_Operador_Pendientes', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <li><a data-toggle="tab" href="#menu4">Movimientos Operador Pendientes</a></li>
      <?php endif ?>
      <?php if (is_int(array_search('Movimientos_Operador_Realizados', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <li><a data-toggle="tab" href="#menu5">Movimientos Operador Realizados</a></li>
      <?php endif ?>
    </ul>

    <div class="tab-content">
      <br>
      <?php if (is_int(array_search('Inventario_General_Ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <!-- Tab Inventario General -->
      <div id="home" class="tab-pane fade in active">
        <form action="<?php echo base_url('index.php/Controller_Inventario/csvInventarioGeneral') ?>" method="post" accept-charset="utf-8" target="_blank">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Inventario General</h3>
                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                </div>
            </div>
            <div class="box-body">
              <div class="container-fluid">
                <!-- Marca -->
                <div class="col-lg-3">
                  <div class="form-group">
                    <label for="selectMarcaInvGeneral">Marca:</label>
                    <select class="form-control" id="selectMarcaInvGeneral" name="selectMarcaInvGeneral">
                      <option value="">Seleccionar...</option>
                      <?php foreach ($Marca as $key => $value) { ?>
                        <option value="<?php echo $value['ID'] ?>"><?php echo $value['Marca'] ?></option>
                      <?php } ?>
                    </select>
                  </div>
                </div>
                <!-- División -->
                <div class="col-lg-3">
                  <div class="form-group">
                    <label for="selectInvDivisionGeneral">División:</label>
                    <select class="form-control" id="selectInvDivisionGeneral" name="selectInvDivisionGeneral">
                      <option value="">Seleccionar...</option>
                      <?php foreach ($Division as $key => $value) { ?>
                        <option value="<?php echo $value['ID'] ?>"><?php echo $value['Division'] ?></option>
                      <?php } ?>
                    </select>
                  </div>
                </div>
                <!-- Linea -->
                <div class="col-lg-3">
                  <div class="form-group">
                    <label for="selectLineaInvGeneral">Linea:</label>
                    <select class="form-control" id="selectLineaInvGeneral" name="selectLineaInvGeneral">
                      <option value="">Seleccionar...</option>
                      <?php foreach ($Linea as $key => $value) { ?>
                        <option value="<?php echo $value['ID'] ?>"><?php echo $value['Linea'] ?></option>
                      <?php } ?>
                    </select>
                  </div>
                </div>
                <!-- Sublinea -->
                <div class="col-lg-3">
                  <div class="form-group">
                    <label for="selectSublineaInvGeneral">Sublinea:</label>
                    <select class="form-control" id="selectSublineaInvGeneral" name="selectSublineaInvGeneral">
                      <option value="">Seleccionar...</option>
                      <?php foreach ($Sublinea as $key => $value) { ?>
                        <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sublinea']?></option>
                      <?php } ?>
                    </select>
                  </div>
                </div>
                <!-- Table Inventario General -->
                <div class="table-responsive col-lg-12">
                  <table id="fetchInventarioGeneral" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Codigo</td>
                        <td>Producto</td>
                        <td>Descripción</td>
                        <td>Marca</td>
                        <td>División</td>
                        <td>Linea</td>
                        <td>Sublinea</td>
                        <td>Min</td>
                        <td>Existencias</td>
                        <td>Existencias apartados</td>
                        <td>Faltante</td>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>

              </div>
            </div>
            <?php if (is_int(array_search('Inventario_General_Exportar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
            <div class="box-footer">
              <button type="submit" class="btn btn-success" id="btnInventarioGeneralExportar">Exportar</button>
            </div>
            <?php endif ?>
          </div>
        </form>
      </div>
      <!-- Tab Inventario General -->
      <?php endif ?>
      
      <?php if (is_int(array_search('Inventario_Bodega_Ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <!-- Inventario Bodega -->
      <div id="menu1" class="tab-pane fade">
        <form action="<?php echo base_url('index.php/Controller_Inventario/csvInventarioBodega') ?>" method="post" accept-charset="utf-8" target="_blank">
          <div class="col-lg-12 form-group">
            <label for="selectInvBodega">Sucursal:</label>
            <select class="form-control" id="selectInvBodega" name="selectInvBodega">
              <option value="">Seleccionar...</option>
              <?php foreach ($Sucursal as $key => $value) { ?>
                <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
              <?php } ?>
            </select>
          </div>

          <div class="col-md-12 col-lg-12">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">Inventario Bodega</h3>
                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                </div>
              </div>
              <div class="box-body">
                <div class="container-fluid">
                  <!-- Marca -->
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label for="selectMarcaInvBodega">Marca:</label>
                      <select class="form-control" id="selectMarcaInvBodega" name="selectMarcaInvBodega">
                        <option value="">Seleccionar...</option>
                        <?php foreach ($Marca as $key => $value) { ?>
                          <option value="<?php echo $value['ID'] ?>"><?php echo $value['Marca'] ?></option>
                        <?php } ?>
                      </select>
                    </div>
                  </div>
                  <!-- División -->
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label for="selectDivisionInvBodega">División:</label>
                      <select class="form-control" id="selectDivisionInvBodega" name="selectDivisionInvBodega">
                        <option value="">Seleccionar...</option>
                        <?php foreach ($Division as $key => $value) { ?>
                          <option value="<?php echo $value['ID'] ?>"><?php echo $value['Division'] ?></option>
                        <?php } ?>
                      </select>
                    </div>
                  </div>
                  <!-- Linea -->
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label for="selectLineaInvBodega">Linea:</label>
                      <select class="form-control" id="selectLineaInvBodega" name="selectLineaInvBodega">
                        <option value="">Seleccionar...</option>
                        <?php foreach ($Linea as $key => $value) { ?>
                          <option value="<?php echo $value['ID'] ?>"><?php echo $value['Linea'] ?></option>
                        <?php } ?>
                      </select>
                    </div>
                  </div>
                  <!-- Sublinea -->
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label for="selectSublineaInvBodega">Sublinea:</label>
                      <select class="form-control" id="selectSublineaInvBodega" name="selectSublineaInvBodega">
                        <option value="">Seleccionar...</option>
                        <?php foreach ($Sublinea as $key => $value) { ?>
                          <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sublinea']?></option>
                        <?php } ?>
                      </select>
                    </div>
                  </div>
                  <!-- Tabla Inventario Bodega -->
                  <div class="table-responsive col-lg-12">
                    <table id="fetchBodega" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                      <thead>
                        <tr>
                          <td>ID</td>
                          <td>Codigo</td>
                          <td>Producto</td>
                          <td>Descripción</td>
                          <td>Marca</td>
                          <td>División</td>
                          <td>Linea</td>
                          <td>Sublinea</td>
                          <td>Min</td>
                          <td>Existencias</td>
                          <td>Existencias apartados</td>
                          <td>Existencias disponibles</td>
                          <td>Faltante</td>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                </div>
              </div>
              <?php if (is_int(array_search('Inventario_Bodega_Exportar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
              <div class="box-footer">
                <button type="submit" class="btn btn-success" id="btnInventarioBodegaExportar">Exportar</button>
              </div>
              <?php endif ?>
            </div>
          </div>
          <!-- Tabla Inventario Detalle Bodega -->
          <div class="col-md-12 col-lg-12">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">Inventario Detalle</h3>
                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                </div>
              </div>
              <div class="box-body">
                <div class="container-fluid">
                  <div class="table-responsive">
                    <table id="fetchDetalleBodega" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                      <thead>
                        <tr>
                          <td>Fecha de Ingreso</td>
                          <td>Locación</td>
                          <td>Existencias</td>
                          <td>N° Detalle Inventario</td>
                          <td hidden="hidden">idLocacion</td>
                          <td>Categoria</td>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="box-footer">
                <?php if (is_int(array_search('Inventario_Bodega_Editar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                 <button type="button" class="btn btn-warning" id="btnEditarLocacion" style="float: left;"><i class="fa fa-edit" aria-hidden="true"></i></button>
                 <button type="button" name="loadingEditarLocacion" id="loadingEditarLocacion" class="btn btn-warning" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                <?php endif ?>
              </div>
            </div>
          </div>
        </form>
      </div>
      <?php endif ?>
      <!-- Inventario Bodega -->
      
      <!-- Inventario Locacion -->
      <?php if (is_int(array_search('Inventario_Locacion_Ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <div id="menu2" class="tab-pane fade">
        <div class="col-lg-12 form-group">
          <label for="selectBodegaLocacion">Sucursal:</label>
          <select class="form-control" id="selectBodegaLocacion">
            <option value="">Seleccionar...</option>
            <?php foreach ($Sucursal as $key => $value) { ?>
              <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
            <?php } ?>
          </select>
        </div>

        <div class="col-md-12 col-lg-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Inventario Por Locación</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div class="container-fluid">
                <div class="table-responsive">
                  <table id="fetchLocacion" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Locación</td>
                        <td>Fecha Ingreso</td>
                        <td>Existencias</td>
                        <td>Existencias Apartados</td>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12 col-lg-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Inventario Detalle</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div class="container-fluid">
                <div class="table-responsive">
                  <table id="fetchInvDetalleLocacion" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Codigo</td>
                        <td>Producto</td>
                        <td>Fecha Ingreso</td>
                        <td>Existencias</td>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="box-footer">
              <?php if (is_int(array_search('Inventario_Locacion_Editar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
               <button class="btn btn-warning" id="btnEditarXLocacion" style="float: left;"><i class="fa fa-edit" aria-hidden="true"></i></button>
               <button type="button" name="loadingEditarXLocacion" id="loadingEditarXLocacion" class="btn btn-warning" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
              <?php endif ?>
            </div>
          </div>
        </div>
      </div>
      <?php endif ?>
      <!-- Inventario Locacion -->
      <!-- Mover Producto -->
      <?php if (is_int(array_search('Movimientos_Locacion_Mover', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <div id="menu3" class="tab-pane fade">
        <div class="col-lg-12 form-group">
          <label for="selectBodegaMovimiento">Sucursal:</label>
          <select class="form-control" id="selectBodegaMovimiento">
            <option value="">Seleccionar...</option>
            <?php foreach ($Sucursal as $key => $value) { ?>
              <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
            <?php } ?>
          </select>
        </div>

        <div class="col-lg-6 form-group">
          <label for="Select_Locacion_Envia">Locaciones Envia:</label>
          <select class="form-control" id="Select_Locacion_Envia">
            <option value="">Seleccionar...</option>
          </select>
        </div>

        <div class="col-lg-6 form-group">
          <label for="Select_Locacion_Recibe">Locacion Recibe:</label>
          <select class="form-control" id="Select_Locacion_Recibe">
            <option value="">Seleccionar...</option>
          </select>
        </div>

        <div class="col-md-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Detalle Inventario Locacion (Mover Productos)</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div class="container-fluid">
                <div class="table-responsive col-lg-12">
                  <table id="fetchMovimiento" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Codigo</td>
                        <td>Producto</td>
                        <td>Existencias</td>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="box-footer">
               <button class="btn btn-primary" id="btn_Mover" style="float: right;">Mover Producto</button>
               <button type="button" name="loadingMover" id="loadingMover" class="btn btn-primary" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
            </div>
          </div>
        </div>
      </div>
      <?php endif ?>
      <!-- Mover Producto -->

      <!-- Mover Operador Pendientes -->
      <?php if (is_int(array_search('Movimientos_Operador_Pendientes', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
        <div id="menu4" class="tab-pane fade">
          <div class="col-lg-12 form-group">
            <label for="selectOPendiente">Sucursal:</label>
            <select class="form-control" id="selectOPendiente" name="selectOPendiente">
              <option value="">Seleccionar...</option>
              <?php foreach ($Sucursal as $key => $value) { ?>
                <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
              <?php } ?>
            </select>
          </div>

          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">Movimientos Pendientes</h3>
                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                </div>
              </div>
              <div class="box-body">
                <div class="container-fluid">
                  <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <table id="fetchMovimientoOperador" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                      <thead>
                        <tr>
                          <td>ID</td>
                          <td>Producto</td>
                          <td>Cantidad</td>
                          <td>Locacion Origen</td>
                          <td>Locacion Destino</td>
                          <td>#</td>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <?php endif ?>
      <!-- Mover Operador Pendientes -->

      <!-- Mover Operador Pendientes -->
      <?php if (is_int(array_search('Movimientos_Operador_Realizados', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
        <div id="menu5" class="tab-pane fade">
          <div class="col-lg-12 form-group">
            <label for="selectOPP">Sucursal:</label>
            <select class="form-control" id="selectOPP" name="selectOPP">
              <option value="">Seleccionar...</option>
              <?php foreach ($Sucursal as $key => $value) { ?>
                <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
              <?php } ?>
            </select>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">Movimientos Realizados</h3>
                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                </div>
              </div>
              <div class="box-body">
                <div class="container-fluid">
                  <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <table id="fetchMovimientoOperadorRealizados" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                      <thead>
                        <tr>
                          <td>ID</td>
                          <td>Producto</td>
                          <td>Cantidad</td>
                          <td>Locacion Origen</td>
                          <td>Locacion Destino</td>
                          <td>Fecha HR Mov</td>
                          <td>#</td>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <?php endif ?>
      <!-- Mover Operador Pendientes -->

    </div>

    <!-- Modal Editar Detalle Inventario -->
    <div id="modalEditMoveOperador" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-warning">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Modificar Movimiento Operador</h4>
          </div>
          <div class="modal-body">
            <div class="container-fluid">

            <div class="wrap" id="CargandoMoveOperador" style="display: none;">
              <div class="loading">
                <div class="bounceball"></div>
                <div class="text">&nbsp; &nbsp; Cargando...</div>
              </div>
            </div>

            <input type="hidden" id="txtIdMoveOperador" hidden>

              <div class="form-group">
                <label for="selectMoveOrigen">Locación Origen:</label>
                <select id="selectMoveOrigen" class="form-control">
                </select>
              </div>

              <div class="form-group">
                <label for="selectMoveDestino">Locación Destino:</label>
                <select id="selectMoveDestino" class="form-control">
                </select>
              </div>

              <div class="form-group">
                <label for="numCantMove">Cantidad Movimiento:</label>
                <input type="number" id="numCantMove" class="form-control">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-warning" onclick="btnSaveChange()">Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Editar Detalle Inventario -->


    <!--///////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
    <!--////////////////////////////////////         Modales Inventario       /////////////////////////////////////////-->
    <!--///////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
    
    <!-- Modal Editar Detalle Inventario -->
    <div id="modalEditarInvDetalleBodega" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-warning">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Editar Detalle Inventario</h4>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="input-daterange">
                <div class="form-group">
                  <label for="txtFechaIngresoBodega" class="form-control-label">Fecha de Ingreso:</label>
                  <div class="input-group">
                    <input type="text" placeholder="<?php echo date("Y-m-d"); ?>" class="form-control" id="txtFechaIngresoBodega" name="start_date">
                    <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                  </div>    
                </div>
              </div>

              <div class="form-group">
                <label for="selectLocacionBodega">Locación:</label>
                <select id="selectLocacionBodega" class="form-control">
                </select>
              </div>

              <div class="form-group">
                <label for="txtExistenciasBodega">Existencias:</label>
                <input type="number" id="txtExistenciasBodega" class="form-control">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal" id="btnCerrarInvDetalleBodega">Cerrar</button>
            <button type="button" name="loadingCerrarInvDetalleBodega" id="loadingCerrarInvDetalleBodega" class="btn btn-danger" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>

            <button type="button" class="btn btn-warning" id="btnGuardarInvDetalleBodega">Guardar Cambios</button>
            <button type="button" name="loadingGuardarInvDetalleBodega" id="loadingGuardarInvDetalleBodega" class="btn btn-warning" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Editar Detalle Inventario -->

    <!-- Modal Editar Detalle Inventario Locacion -->
    <div id="modalEditarInvDetalleLocacion" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-warning">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Editar Detalle Inventario</h4>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="input-daterange">
                <div class="form-group">
                  <label for="txtFechaIngresoLocacion" class="form-control-label">Fecha de Ingreso:</label>
                  <div class="input-group">
                    <input type="text" placeholder="<?php echo date("Y-m-d"); ?>" class="form-control" id="txtFechaIngresoLocacion" name="start_date">
                    <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                  </div>    
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="btnCerrarInvDetalleLocacion" data-dismiss="modal">Cerrar</button>
            <button type="button" name="loadingCerrarInvDetalleLocacion" id="loadingCerrarInvDetalleLocacion" class="btn btn-danger" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>

            <button type="button" class="btn btn-warning" id="btnGuardarInvDetalleLocacion">Guardar Cambios</button>
            <button type="button" name="loadingGuardarInvDetalleLocacion" id="loadingGuardarInvDetalleLocacion" class="btn btn-warning" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Editar Detalle Inventario Locacion -->

    <!-- Modal Mover Mercancia -->
    <div id="Mover_Mercancia" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Transpaso de Locación</h4>
          </div>
          <div class="modal-body">
            <div class="wrap" id="Cargando_Transpaso" style="display: none;">
              <div class="loading">
                <div class="bounceball"></div>
                <div class="text">&nbsp; &nbsp; Cargando...</div>
              </div>
            </div>

            <label id="label_Existencias" hidden="hidden"></label>

            <div class="form-group">
              <label>Cantidad:</label>
              <input type="number" id="number_Cantidad" min="0" class="form-control">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal" id="btnCerrarMoverMercancia">Cerrar</button>
            <button type="button" name="loadingCerrarMoverMercancia" id="loadingCerrarMoverMercancia" class="btn btn-danger" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>

            <button type="button" class="btn btn-primary" id="btnMoverInvDetalleLocacion">Mover</button>
            <button type="button" name="loadingMoverInvDetalleLocacion" id="loadingMoverInvDetalleLocacion" class="btn btn-primary" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Mover Mercancia -->
  </div>
</div>
