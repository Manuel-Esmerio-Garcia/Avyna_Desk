<br>
<div id="page-wrapper">
 <div class="container-fluid">
    <ul class="nav nav-tabs">
      <?php if (is_int(array_search('Ordenes_compras_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <li class="active"><a data-toggle="tab" href="#orden">Ordenes Compra</a></li>
      <?php endif ?>
      <?php if (is_int(array_search('Nueva_compra_guardar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <li><a data-toggle="tab" href="#home">Nueva Compra</a></li>
      <?php endif ?>
      <?php if (is_int(array_search('Compras_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <li><a data-toggle="tab" href="#menu1">Compras</a></li>
      <?php endif ?>
      <?php if (is_int(array_search('Modificar_compra_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <li><a data-toggle="tab" href="#menu2">Modificar Compra</a></li>
      <?php endif ?>
      <?php if (is_int(array_search('Otras_entradas_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <li><a data-toggle="tab" href="#menu3">Otras Entradas</a></li>
      <?php endif ?>
    </ul>
    <div class="tab-content">
      <br>

      <!-- Nueva Orden Compra Tab -->
      <?php if (is_int(array_search('Ordenes_compras_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <div id="orden" class="tab-pane fade in active">
        <div class="col-md-6 col-lg-6">
           <div class="form-group">
             <label>Bodega:</label>
             <select name="selectBodega" class="form-control" id="selectBodega">
               <option value="">Seleccionar...</option>
                <?php foreach ($Bodega as $key => $value) { ?>
                  <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal']?></option>
                <?php } ?>
             </select>
           </div>
        </div>
        
        <!-- Tabla Ordenes Compra -->
        <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Ordenes de Compra</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                <div class="btn-group">
                  <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown"><i class="fa fa-wrench"></i></button>
                </div>
              </div>
            </div>
            <div class="box-body">
              <div class="table-responsive">
                <table id="fetchOrdenCompra" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Bodega</td>
                      <td>Usuario</td>
                      <td>Fecha</td>
                      <td>Proveedor</td>
                      <td>Referencia OC</td>
                      <td>Cantidad Productos</td>
                      <td>Monto</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
            <div class="box-footer">
              
              <?php if (is_int(array_search('Ordenes_compras_agregar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
              <button type="button" class="btn btn-success" id="btnAgregarOrden"><span
                      class="glyphicon glyphicon-plus"></span></button>
              <button type="button" class="btn btn-success" id="loadingAgregarOrden" disabled
                  style="display: none;"><i class="fa fa-spinner fa-spin"
                      style="font-size:18px; color: white;"></i></button>
              <?php endif ?>
              <?php if (is_int(array_search('Ordenes_compras_editar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
              <button type="button" class="btn btn-warning" id="btnEditarOrden"><span
                      class="glyphicon glyphicon-pencil"></span> </button>
              <button type="button" class="btn btn-warning" id="loadingEditarOrden" disabled
                  style="display: none;"><i class="fa fa-spinner fa-spin"
                      style="font-size:18px; color: white;"></i></button>
              <?php endif ?>
              <?php if (is_int(array_search('Ordenes_compras_eliminar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
              <button type="button" class="btn btn-danger" id="btnEliminarOrden"><span
                      class="glyphicon glyphicon-trash"></span></button>
              <button type="button" class="btn btn-danger" id="loadingEliminarOrden" disabled
                  style="display: none;"><i class="fa fa-spinner fa-spin"
                      style="font-size:18px; color: white;"></i></button>
              <?php endif ?>

              <?php if (is_int(array_search('Ordenes_compras_generar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
              <button type="button" class="btn btn-primary" id="btnGenerarCompraOC">Generar Compra</button>
              <button type="button" class="btn btn-primary" id="loadingGenerarCompra" disabled
                  style="display: none;"><i class="fa fa-spinner fa-spin"
                      style="font-size:18px; color: white;"></i> Loading...</button>
              <?php endif ?>

              <?php if (is_int(array_search('Ordenes_compras_anticipo', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
              <button type="button" class="btn btn-default" id="btnGenerarAnticipo">Anticipos OC</button>
              <button type="button" class="btn btn-default" id="loadingGenerarAnticipo" disabled
                  style="display: none;"><i class="fa fa-spinner fa-spin"
                      style="font-size:18px; color: white;"></i> Loading...</button>
              <?php endif ?>

            </div>
          </div>
        </div>

        <!-- Tabla Detalle Ordenes Compra -->
        <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Productos en la orden de compra</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                <div class="btn-group">
                  <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown"><i class="fa fa-wrench"></i></button>
                </div>
              </div>
            </div>
            <div class="box-body">
              <div class="table-responsive">
                <table id="fetchDetalleOrdenCompra" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Codigo</td>
                      <td>Producto</td>
                      <td>Cantidad</td>
                      <td>Precio Unitario</td>
                      <td>Importe</td>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
      <?php endif ?>
      <!-- Nueva Orden de Compra Tab -->

      <!-- Nueva Compra Tab -->
      <?php if (is_int(array_search('Nueva_compra_guardar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <div id="home" class="tab-pane fade in">
        <div class="col-md-6 col-lg-6">
           <div class="form-group">
             <label>Proveedores:</label>
             <select name="selectProveedor" class="form-control" id="selectProveedor">
               <option value="">Seleccionar...</option>
                <?php foreach ($Proveedor as $key => $value) { ?>
                  <option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'].' '.$value['Apellidos']. ' | '. $value['Currency'] ?></option>
                <?php } ?>
             </select>
           </div>
        </div>
       
        <div class="col-md-6 col-lg-6">
           <div class="form-group">
             <label>Bodega:</label>
             <select name="selectSucursal" class="form-control" id="selectSucursal">
               <option value="">Seleccionar...</option>
                <?php foreach ($Bodega as $key => $value) { ?>
                  <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
                <?php } ?>
             </select>
           </div>
        </div>

        <div class="col-md-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Nueva Compra</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                <div class="btn-group">
                  <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown"><i class="fa fa-wrench"></i></button>
                </div>
              </div>
            </div>
            <div class="box-body">
              <div class="table-responsive">
                <table id="fetchNuevaCompra" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                  <caption>
                    <label for="txtCodigoCompra">Codigo Compra:</label>
                    <input type="text" name="txtCodigoCompra" id="txtCodigoCompra">
                    <button type="button" data-toggle="tooltip" data-placement="top" title="Agregar Proveedor" class="btn btn-default btn-xs" id="Agregar_Proveedor" style="margin-bottom: 5px;">
                      <span class="glyphicon glyphicon-user"></span> 
                    </button>
                  </caption>
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Codigo</td>
                      <td>Producto</td>
                      <td>Cantidad</td>
                      <td>Costo</td>
                      <td>Importe</td>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
            <div class="box-footer">
              
              <div class="col-lg-3 col-md-3">
                <button class="btn btn-default" name="btnCalcularCompra" id="btnCalcularCompra" style="float: left;">Calcular Compra</button>
                <button type="button" name="loadingCalcularCompra" id="loadingCalcularCompra" class="btn btn-default" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
              </div>

              <div class="col-lg-3 col-md-3">
                <button class="btn btn-primary" name="btnGenerarCompra" id="btnGenerarCompra" style="float: left;" disabled>Generar Compra</button>
                <button type="button" name="loadingGenerarCompra" id="loadingGenerarCompra" class="btn btn-primary" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
              </div>

              <div class="col-lg-2 col-md-2">
                <div class="form-group">
                  <label>Subtotal: $ <span id="labelSubtotal">0.00</span></label>
                </div>
              </div>
              <div class="col-lg-2 col-md-2">
                <div class="form-group">
                  <label>Impuesto: $ <span id="labelImpuesto">0.00</span></label>
                </div>
              </div>
              <div class="col-lg-2 col-md-2">
                <div class="form-group">
                  <label>Total: $ <span id="labelTotal">0.00</span></label>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <?php endif ?>
      <!-- Nueva Compra Tab -->

      <!-- Compra Tab -->
      <?php if (is_int(array_search('Compras_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <div id="menu1" class="tab-pane fade">
        <div class="col-md-12 col-lg-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Compras</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                <div class="btn-group">
                  <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown"><i class="fa fa-wrench"></i></button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a id="Option_Eliminar_Compra">Eliminar</a></li>
                    <li><a id="Option_Agregar_Inventario">Agregar a Inventario</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="box-body">
              <div class="table-responsive col-lg-12">
                <table id="fetchCompras" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Codigo</td>
                      <td>Fecha Compra</td>
                      <td>Proveedores Item</td>
                      <td>Subtotal</td>
                      <td>Impuestos</td>
                      <td>Total</td>
                      <td>Adeudo</td>
                      <td>Status</td>
                      <td>Bodega</td>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
            <div class="box-footer">
              <?php if (is_int(array_search('Compras_eliminar', array_column($_SESSION['Permisos'], 'Permiso')))): ?> 
              <button type="button" class="btn btn-danger" style="float: left;" name="btnEliminarCompra" id="btnEliminarCompra">Eliminar</button>
              <button type="button" name="loadingEliminarCompra" id="loadingEliminarCompra" class="btn btn-danger" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
              <?php endif ?>

              <?php if (is_int(array_search('Compras_ver_facturas', array_column($_SESSION['Permisos'], 'Permiso')))): ?>  
              <button type="button" class="btn btn-default" id="btnVerFacturas" style="float: right; margin-left: 5px;">Ver Facturas</button>
              <button type="button" class="btn btn-default" id="loadingVerFacturas" disabled style="display: none; float: right; margin-left: 5px;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: black;"></i> Loading...</button>
              <?php endif ?>
              
              <?php if (is_int(array_search('Compras_agregar_inventario', array_column($_SESSION['Permisos'], 'Permiso')))): ?>  
              <button type="button" class="btn btn-primary" style="float: right;" name="btnAgregarCompra" id="btnAgregarCompra">Agregar a Inventario</button>
              <button type="button" name="loadingAgregarCompra" id="loadingAgregarCompra" class="btn btn-primary" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
              <?php endif ?>
              
            </div>
          </div>
        </div>

        <div class="col-md-12 col-lg-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Detalle Compras</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div class="table-responsive col-lg-12">
                <table id="fetchDetalleCompras" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Codigo</td>
                      <td>Producto</td>
                      <td>Cantidad</td>
                      <td>Costo Unitario</td>
                      <td>Importes</td>
                      <td hidden="hidden">idCatalogo</td>
                      <td hidden="hidden">idSucursal</td>
                      <td hidden="hidden">idLocacion</td>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <?php endif ?>
      <!-- Compra Tab -->

      <!-- Modificar Compra Tab -->
      <?php if (is_int(array_search('Modificar_compra_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <div id="menu2" class="tab-pane fade">
        <br><br><br>
        <div align="center">
          <h3 style="text-align: center;">PROXIMAMENTE</h3>
          <img src="<?php echo base_url('assets/img/Proximamente1.png') ?>" alt="" align="center">
        </div>
      </div>
      <?php endif ?>
      <!-- Modificar Compra Tab -->

      <!-- Otras Entradas Tab -->
      <?php if (is_int(array_search('Otras_entradas_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <div id="menu3" class="tab-pane fade">
        <br><br><br>
        <div align="center">
          <h3 style="text-align: center;">PROXIMAMENTE</h3>
          <img src="<?php echo base_url('assets/img/Proximamente1.png') ?>" alt="" align="center">
        </div>
      </div>
      <?php endif ?>
      <!-- Otras Entradas Tab -->

    </div>
  </div>
</div>


<!-- Modal Agregar Ordenes de Compra-->
  <div id="modalAddOrdenesCompra" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Nueva Orden de Compra</h4>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="col-md-6 col-lg-6">
              <div class="form-group">
                <label>Proveedores:</label>
                <select name="selectProveedorOC" class="form-control" id="selectProveedorOC">
                  <option value="">Seleccionar...</option>
                    <?php foreach ($Proveedor as $key => $value) { ?>
                      <option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'].' '.$value['Apellidos']. ' | '. $value['Currency'] ?></option>
                    <?php } ?>
                </select>
              </div>
            </div>

            <div class="col-md-6 col-lg-6">
              <div class="form-group">
                <label>Referencia:</label>
                <input type="text" name="ReferenciaOC" class="form-control" id="ReferenciaOC">
              </div>
            </div>
            
            <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <div class="box">
                <div class="box-header with-border">
                  <h3 class="box-title">Nueva Orden de Compra</h3>
                  <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <div class="btn-group">
                      <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown"><i class="fa fa-wrench"></i></button>
                    </div>
                  </div>
                </div>
                <div class="box-body">
                  <div class="table-responsive">
                    <table id="fetchNuevaOrdenCompra" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                      <thead>
                        <tr>
                          <td>ID</td>
                          <td>Codigo</td>
                          <td>Producto</td>
                          <td>Cantidad</td>
                          <td>Costo</td>
                          <td>Importe</td>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                  
                  <hr><hr>

                  <div class="col-lg-4 col-md-4 col-sm-4">
                    <div class="form-group">
                      <label>Cantidad de Producto: <span id="CantidadOC">0</span></label>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4">
                    <div class="form-group">
                      <label>Total: $<span id="TotalOC">0</span></label>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4">
                  <div class="form-group">
                      <label>Status: <span id="StatusOC" class="badge badge-danger">Pendiente</span></label>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-danger" id="btnModalCerrarOC" data-dismiss="modal">Cancelar</button>
          <button type="button" id="loadingModalCerrarOC" class="btn btn-danger" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

          <button class="btn btn-primary" id="btnModalGuardarOC" disabled>Guardar</button>
          <button type="button" id="loadingModalGuardarOC" class="btn btn-primary" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          
          <button class="btn btn-default" id="btnModalCalcularOC">Calcular OC</button>
          <button type="button" id="loadingModalCalcularOC" class="btn btn-default" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: black;"></i> Loading...</button>
        
        </div>
      </div>

    </div>
  </div>


  <!-- Modal Agregar Ordenes de Compra-->
<div id="modalUpdateOrdenesCompraStatus" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-sm">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header bg-warning">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Orden de Compra Generada o Aceptada</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <!-- <div class="col-md-6 col-lg-6">
            <div class="form-group">
              <label>Proveedores:</label>
              <select name="selectProveedorOCUpdateStatus" class="form-control" id="selectProveedorOCUpdate">
                <option value="">Seleccionar...</option>
                  <?php foreach ($Proveedor as $key => $value) { ?>
                    <option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'].' '.$value['Apellidos']. ' | '. $value['Currency'] ?></option>
                  <?php } ?>
              </select>
            </div>
          </div>

          <div class="col-md-6 col-lg-6">
            <div class="form-group">
              <label>Referencia:</label>
              <input type="text" name="ReferenciaOCUpdateStatus" class="form-control" id="ReferenciaOCUpdate">
            </div>
          </div> -->
          
          <div class="col-12 form-group">
            <label for="StatusOCUpdateStatus">Status:</label>
            <select id="StatusOCUpdateStatus" class="form-control"></select>
          </div>
          
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" id="btnUpdateModalCerrarOCStatus" data-dismiss="modal">Cancelar</button>
        <button type="button" id="loadingUpdateModalCerrarOCStatus" class="btn btn-danger" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

        <button class="btn btn-warning" id="btnUpdateModalGuardarOCStatus">Guardar Cambios</button>
        <button type="button" id="loadingUpdateModalGuardarOCStatus" class="btn btn-warning" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
     
      </div>
    </div>

  </div>
</div>

<!-- Modal Agregar Ordenes de Compra-->
<div id="modalUpdateOrdenesCompra" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header bg-warning">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Orden de Compra</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="col-md-6 col-lg-6">
            <div class="form-group">
              <label>Proveedores:</label>
              <select name="selectProveedorOCUpdate" class="form-control" id="selectProveedorOCUpdate">
                <option value="">Seleccionar...</option>
                  <?php foreach ($Proveedor as $key => $value) { ?>
                    <option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'].' '.$value['Apellidos']. ' | '. $value['Currency'] ?></option>
                  <?php } ?>
              </select>
            </div>
          </div>

          <div class="col-md-6 col-lg-6">
            <div class="form-group">
              <label>Referencia:</label>
              <input type="text" name="ReferenciaOCUpdate" class="form-control" id="ReferenciaOCUpdate">
            </div>
          </div>
          
          <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">Editar Orden de Compra</h3>
                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                  <div class="btn-group">
                    <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown"><i class="fa fa-wrench"></i></button>
                  </div>
                </div>
              </div>
              <div class="box-body">
                <div class="table-responsive">
                  <table id="fetchEditarOrdenCompra" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Codigo</td>
                        <td>Producto</td>
                        <td>Cantidad</td>
                        <td>Costo</td>
                        <td>Importe</td>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
                
                <hr><hr>

                <div class="col-lg-4 col-md-4 col-sm-4">
                  <div class="form-group">
                    <label>Cantidad de Producto: <span id="CantidadOCUpdate">0</span></label>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <div class="form-group">
                    <label>Total: $<span id="TotalOCUpdate">0</span></label>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                <div class="form-group">
                    <label for="StatusOCUpdate">Status:</label>
                    <select id="StatusOCUpdate" class="form-control">
                    </select>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" id="btnUpdateModalCerrarOC" data-dismiss="modal">Cancelar</button>
        <button type="button" id="loadingUpdateModalCerrarOC" class="btn btn-danger" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

        <button class="btn btn-warning" id="btnUpdateModalGuardarOC" disabled>Guardar Cambios</button>
        <button type="button" id="loadingUpdateModalGuardarOC" class="btn btn-warning" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
        
        <button class="btn btn-default" id="btnUpdateModalCalcularOC">Calcular OC</button>
        <button type="button" id="loadingUpdateModalCalcularOC" class="btn btn-default" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: black;"></i> Loading...</button>
      
      </div>
    </div>

  </div>
</div>

<!-- Modal Agregar Anticipos-->
<div id="modalAddAnticipos" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header bg-danger">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Anticipos (Pagos) OC</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">

          <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>OC#: <span id="idOCAnticipo"></span></label>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Bodega: <span id="bodegaAnticipo"></span></label>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Fecha: <span id="fechaAnticipo"></span></label>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Usuario: <span id="usuarioAnticipo"></span></label>
              </div>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Proveedor: <span id="proveedorAnticipo"></span></label>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Cant. Productos: <span id="cantidadAnticipo"></span></label>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Monto: $<span id="montoAnticipo"></span></label>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Status: <span id="statusAnticipo"></span></label>
              </div>
            </div>
          </div>
          
          <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">Anticipos</h3>
                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                </div>
              </div>
              <div class="box-body">
                <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <table id="fetchAnticipos" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Fecha</td>
                        <td>Usuario</td>
                        <td>Monto</td>
                        <td>Forma de Pago</td>
                        <td>Observaciones</td>
                        <td>Status</td>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
              <div class="box-footer">
              <?php if (is_int(array_search('Compras_anticipos_agregar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                <button type="button" class="btn btn-success" id="btnAgregarAnticipo"><span
                        class="glyphicon glyphicon-plus"></span></button>
                <button type="button" class="btn btn-success" id="loadingAgregarAnticipo" disabled
                    style="display: none;"><i class="fa fa-spinner fa-spin"
                        style="font-size:18px; color: white;"></i></button>
              <?php endif ?>
              <?php if (is_int(array_search('Compras_anticipos_editar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                <button type="button" class="btn btn-warning" id="btnEditarAnticipo"><span
                        class="glyphicon glyphicon-pencil"></span> </button>
                <button type="button" class="btn btn-warning" id="loadingEditarAnticipo" disabled
                    style="display: none;"><i class="fa fa-spinner fa-spin"
                        style="font-size:18px; color: white;"></i></button>
              <?php endif ?>
              <?php if (is_int(array_search('Compras_anticipos_eliminar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>          
                <button type="button" class="btn btn-danger" id="btnEliminarAnticipo"><span
                        class="glyphicon glyphicon-trash"></span></button>
                <button type="button" class="btn btn-danger" id="loadingEliminarAnticipo" disabled
                    style="display: none;"><i class="fa fa-spinner fa-spin"
                        style="font-size:18px; color: white;"></i></button>
              <?php endif ?>
              </div>
            </div>
          </div>

          <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">Facturas Anticipos (Temporales)</h3>
                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                </div>
              </div>
              <div class="box-body">
                <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <table id="fetchFacturaTemp" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Fecha</td>
                        <td>Razón Social</td>
                        <td>RFC</td>
                        <td>Subtotal</td>
                        <td>Total</td>
                        <td>Status</td>
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
    </div>




  </div>
</div>

<!-- Modal Agregar Anticipo -->
<div id="modalAddAnticipo" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Nuevo Anticipo</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label for="txtMontoAnticipo">Monto:</label>
            <input type="text" class="form-control" id="txtMontoAnticipo">
          </div>
          <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label for="selectFormaPago">Forma de Pago:</label>
            <select class="form-control" id="selectFormaPago">
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta de crédito">Tarjeta de crédito</option>
            </select>
          </div>
          <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <label for="txtObservacionesAnticipo">Observaciones:</label>
            <textarea class="form-control" id="txtObservacionesAnticipo" cols="20" rows="10"></textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" id="btnCerrarAddAnticipo" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-danger" id="loadingCerrarAddAnticipo" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

        <button type="button" class="btn btn-primary" id="btnAddAnticipo">Guardar</button>
        <button type="button" class="btn btn-primary" id="loadingAddAnticipo" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Modificar Anticipo -->
<div id="modalUpdateAnticipo" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header bg-warning">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Anticipo</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="checkbox form-group col-lg-12 col-md-12 col-sm-12 col-xm-12">
            <label style="float: right;"><input type="checkbox" id="checkStatusAnticipo">Cancelado</label>
          </div>

          <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label for="txtMontoAnticipoUpdate">Monto:</label>
            <input type="text" class="form-control" id="txtMontoAnticipoUpdate">
          </div>
          <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label for="selectFormaPagoUpdate">Forma de Pago:</label>
            <select class="form-control" id="selectFormaPagoUpdate">
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta de crédito">Tarjeta de crédito</option>
              <!--<option value="02">02 - Cheque nominativo</option>
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
              <option value="99">99 - Por definir</option>-->
            </select>
          </div>
          <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <label for="txtObservacionesAnticipoUpdate">Observaciones:</label>
            <textarea class="form-control" id="txtObservacionesAnticipoUpdate" cols="20" rows="10"></textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" id="btnCerrarUpdateAnticipo" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-danger" id="loadingCerrarUpdateAnticipo" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

        <button type="button" class="btn btn-warning" id="btnUpdateAnticipo">Guardar Cambios</button>
        <button type="button" class="btn btn-warning" id="loadingUpdateAnticipo" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Ver Factura -->
<div id="modalVerFacturas" class="modal fade" role="dialog">
  <div class="modal-dialog modal-lg">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Facturas Compras</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Compra#: <span id="idCompra"></span></label>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Bodega: <span id="bodegaCompra"></span></label>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Fecha: <span id="fechaCompra"></span></label>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Usuario: <span id="usuarioCompra"></span></label>
              </div>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Proveedor: <span id="proveedorCompra"></span></label>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Cant. Productos: <span id="cantidadCompra"></span></label>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Monto: $<span id="montoCompra"></span></label>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="form-group">
                    <label>Status: <span id="statusCompra"></span></label>
              </div>
            </div>
          </div>

          <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">Facturas</h3>
                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                </div>
              </div>
              <div class="box-body">
                <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <table id="fetchFacturasCompras" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Fecha</td>
                        <td>Razón Social</td>
                        <td>RFC</td>
                        <td>Subtotal</td>
                        <td>Total</td>
                        <td>Status</td>
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
    </div>
  </div>
</div>

<!-- Modal Ver OC -->
<div id="modalGenerarOC" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      <!-- Cargando -->
			<div class="wrap" id="Cargando_Parcial" style="display: none;">
        <div class="loading">
          <div class="bounceball"></div>
          <div class="text">&nbsp; &nbsp; Cargando...</div>
        </div>
      </div>

      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span></button>
        <h4 class="modal-title">Compra Parcial</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                  <span><b> Orden de Compra N° </b></span><span id="txtIdOCG"></span>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                  <span><b> Cliente: </b></span><span id="txtClienteG"></span>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                  <span><b> Cantidad Productos: </b></span><span id="txtCantidadG"></span>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                  <span><b> Fecha: </b></span><span id="txtFechaG"></span>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                  <span><b> Proveedor: </b></span><span id="txtProveedorG"></span>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                  <span><b> Referencia OC: </b></span><span id="txtReferenciaG"></span>
                </div>
                <br>

                <div class="col-lg-12 col-md-12 col-sm.12 col-xs-12 table-responsive" style="margin-top: 25px;">
                  <table class="table table-hover table-striped table-bordered table-condensed" id="tableParcialOC">
                    <thead>
                      <th>ID</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                      <th>Importe</th>
                      <th>Restantes</th>
                      <th>A Comprar</th>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" onclick="generarCompraParcial()">Generar Compra Parcial</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>