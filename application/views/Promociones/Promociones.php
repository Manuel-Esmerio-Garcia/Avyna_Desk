<br>
<div id="page-wrapper">
  <div class="container-fluid">

    <ul class="nav nav-tabs">
      <?php if (is_int(array_search('Promociones_promociones_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
        <li class="active"><a data-toggle="tab" href="#home">Promociones</a></li>
      <?php endif ?>
      <?php if (is_int(array_search('Promociones_ofertas_ver', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
      <li><a data-toggle="tab" href="#menu1">Ofertas</a></li>
      <?php endif ?>
    </ul>
    <br>

    <div class="tab-content">
      <!-- Promociones -->
      <div id="home" class="tab-pane fade in active">
        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Promociones</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <table id="fetchPromociones" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Nombre</td>
                      <td>Vigencia Inicial</td>
                      <td>Vigencia Final</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
            <div class="box-footer">
              <?php if (is_int(array_search('Promociones_promociones_agregar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                <button type="button" class="btn btn-success" id="btnAgregarPromo"><span class="glyphicon glyphicon-plus"></span></button>
                <button type="button" class="btn btn-success" id="loadingAgregarPromo" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
              <?php endif ?>

              <?php if (is_int(array_search('Promociones_promociones_editar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                <button type="button" class="btn btn-warning" id="btnEditarPromo"><span class="glyphicon glyphicon-pencil"></span> </button>
                <button type="button" class="btn btn-warning" id="loadingEditarPromo" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
              <?php endif ?>

              <?php if (is_int(array_search('Promociones_promociones_eliminar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                <button type="button" class="btn btn-danger" id="btnEliminarPromo"><span class="glyphicon glyphicon-trash"></span></button>
                <button type="button" class="btn btn-danger" id="loadingEliminarPromo"disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
              <?php endif ?>

              <?php if (is_int(array_search('Promociones_promociones_duplicar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                <button type="button" class="btn btn-default" id="btnDuplicarPromo">Duplicar Promoción</button>
                <button type="button" class="btn btn-default" id="loadingDuplicarPromo"disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
              <?php endif ?>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Productos de la Promoción</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <table id="fetchPromoDetalle" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Codigo</td>
                      <td>Producto</td>
                      <td>Cantidad</td>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Promociones -->

      <!-- Ofertas -->
      <div id="menu1" class="tab-pane fade">
        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Ofertas</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <table id="fetchOfertas" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Nombre</td>
                      <td>Descuento</td>
                      <td>Vigencia Inicial</td>
                      <td>Vigencia Final</td>
                      <td>Compra Requerida</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
            <div class="box-footer">
              <?php if (is_int(array_search('Promociones_ofertas_agregar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                <button type="button" class="btn btn-success" id="btnAgregarOferta"><span class="glyphicon glyphicon-plus"></span></button>
                <button type="button" class="btn btn-success" id="loadingAgregarOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
              <?php endif ?>

              <?php if (is_int(array_search('Promociones_ofertas_editar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                <button type="button" class="btn btn-warning" id="btnEditarOferta"><span class="glyphicon glyphicon-pencil"></span> </button>
                <button type="button" class="btn btn-warning" id="loadingEditarOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
              <?php endif ?>

              <?php if (is_int(array_search('Promociones_ofertas_eliminar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                <button type="button" class="btn btn-danger" id="btnEliminarOferta"><span class="glyphicon glyphicon-trash"></span></button>
                <button type="button" class="btn btn-danger" id="loadingEliminarOferta"disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
              <?php endif ?>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Productos de la Oferta</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <table id="fetchOfertaDetalle" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Codigo</td>
                      <td>Producto</td>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Regalo</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <table id="fetchRegalos" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Codigo</td>
                      <td>Producto</td>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Ofertas -->
    </div>


    <!-- Modal Agregar Promoción -->
    <div class="modal fade" id="modalAgregarPromocion" role="dialog" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" style="overflow-y: auto; max-height: 800px;">
          <div class="modal-header bg-primary">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Nuevo Kit</h4>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group">
                  <label for="txtNombre_Kit">Nombre:*</label>
                  <input type="text" name="txtNombre_Kit" id="txtNombre_Kit" class="form-control">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div class="input-daterange">
                    <div class="form-group">
                      <label for="Vigencia_Inicial_Kit" class="form-control-label">Vigencia Inicial:*</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="Vigencia_Inicial_Kit">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                      </div>    
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div class="input-daterange">
                    <div class="form-group">
                      <label for="Vigencia_Final_Kit" class="form-control-label">Vigencia Final:*</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="Vigencia_Final_Kit"> 
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                      </div>    
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label for="select_Division_Kit">División:*</label>
                  <select name="select_Division_Kit" id="select_Division_Kit" class="form-control">
                    <option value="">Seleccionar...</option>
                     <?php foreach ($Division as $key => $value) { ?>
                      <option value="<?php echo $value['ID'] ?>"><?php echo $value['Division'] ?></option>
                     <?php } ?>
                  </select>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label for="select_Linea_Kit">Linea:*</label>
                  <select name="select_Linea_Kit" id="select_Linea_Kit" class="form-control">
                    <option value="">Seleccionar...</option>
                    <?php foreach ($Linea as $key => $value) { ?>
                      <option value="<?php echo $value['ID'] ?>"><?php echo $value['Linea'] ?></option>
                    <?php } ?>
                  </select>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label for="select_Sublinea_Kit">Sublinea:*</label>
                  <select name="select_Sublinea_Kit" id="select_Sublinea_Kit" class="form-control">
                    <option value="">Seleccionar...</option>
                    <?php foreach ($Sublinea as $key => $value) { ?>
                      <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sublinea'] ?></option>
                    <?php } ?>
                  </select>
                </div>
                
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 checkbox">
                  <label style="margin-top: inherit;"><input type="checkbox" id="checkExcluirDistri">Excluir Distribuidor</label>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 checkbox">
                  <label style="margin-top: 30px;"><input type="checkbox" id="checkSalonBlack">Salon Black</label>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="divExcluirDistri" style="display: none;">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Distribuidor</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchDistribuidorKit" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Distribuidor</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnAddDistribuidorKit"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingAddDistribuidorKit" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
                    </div>
                  </div>
                </div>

                <!--- Productos Tabla Kit -->
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Productos</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchProductosKit" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Catalogo</th>
                              <th>Cantidad</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnAddProductoKit"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingAddProductoKit" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
                    </div>
                  </div>
                </div>
                <!-- Productos Tabla Kit -->

                <!--- Sucursales Tabla Kit -->
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Sucursales</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchSucursalKit" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Sucursal</th>
                              <th>Precio</th>
                              <th>Ahorro</th>
                              <th>#</th>
                              <th hidden="hidden">Identificador</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnAddSucursalKit"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingAddSucursalKit" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
                    </div>
                  </div>
                </div>
                <!-- Sucursales Tabla Kit -->
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="btnCerrarAddKit" data-dismiss="modal" style="float: left;">Cerrar</button>
            <button type="button" class="btn btn-danger" id="loadingCerrarAddKit" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

            <button type="button" class="btn btn-primary" style="float: right;" id="btnAddPromocionKit">Agregar Promoción</button>
            <button type="button" class="btn btn-primary" id="loadingAddPromocionKit" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Agregar Promoción -->
    
    <!-- Modal Agregar Distribuidor Kit -->
    <div class="modal fade" id="modalDistribuidoresKit" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Distribuidores</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListDistribuidor" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Distribuidor</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnAddListDistribuidor">Agregar</button>
            <button type="button" class="btn btn-primary" id="loadingAddListDistribuidor" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div> 

    <!-- Modal Agregar Productos Kit -->
    <div class="modal fade" id="modalProductoKit" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Productos</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListProductos" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Codigo</th>
                    <th>Producto</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnAddListProducto">Agregar</button>
            <button type="button" class="btn btn-primary" id="loadingAddListProducto" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Agregar Sucursales Kit -->
    <div class="modal fade" id="modalSucursalKit" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Sucursales</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListSucursales" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Sucursal</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnAddListSucursales">Agregar</button>
            <button type="button" class="btn btn-primary" id="loadingAddListSucursales" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal Editar Promoción -->
    <div class="modal fade" id="modalEditarKit" role="dialog" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" style="overflow-y: auto; max-height: 900px;">
          <div class="modal-header bg-warning" id="header_modal_color">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title" id="tittle_modal_duplicar">Editar Kit</h4>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="checkbox form-group" style="margin-bottom: 50px;">
                  <label style="float: right;"><input type="checkbox" id="check_Status_Kit_Editar">Inactivo</label>
                </div>
                <div class="form-group">
                  <label for="txtNombre_Kit">Nombre:*</label>
                  <input type="text" name="txtNombre_Kit_Editar" id="txtNombre_Kit_Editar" class="form-control">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div class="input-daterange">
                    <div class="form-group">
                      <label for="Vigencia_Inicial_Kit_Editar" class="form-control-label">Vigencia Inicial:*</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="Vigencia_Inicial_Kit_Editar">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                      </div>    
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div class="input-daterange">
                    <div class="form-group">
                      <label for="Vigencia_Final_Kit_Editar" class="form-control-label">Vigencia Final:*</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="Vigencia_Final_Kit_Editar">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                      </div>    
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label for="select_Division_Kit_Editar">División:*</label>
                  <select name="select_Division_Kit_Editar" id="select_Division_Kit_Editar" class="form-control">
                    <option value="">Seleccionar...</option>
                     <?php foreach ($Division as $key => $value) { ?>
                      <option value="<?php echo $value['ID'] ?>"><?php echo $value['Division'] ?></option>
                     <?php } ?>
                  </select>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label for="select_Linea_Kit_Editar">Linea:*</label>
                  <select name="select_Linea_Kit_Editar" id="select_Linea_Kit_Editar" class="form-control">
                    <option value="">Seleccionar...</option>
                    <?php foreach ($Linea as $key => $value) { ?>
                      <option value="<?php echo $value['ID'] ?>"><?php echo $value['Linea'] ?></option>
                    <?php } ?>
                  </select>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label for="select_Sublinea_Kit_Editar">Sublinea:*</label>
                  <select name="select_Sublinea_Kit_Editar" id="select_Sublinea_Kit_Editar" class="form-control">
                    <option value="">Seleccionar...</option>
                    <?php foreach ($Sublinea as $key => $value) { ?>
                      <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sublinea'] ?></option>
                    <?php } ?>
                  </select>
                </div>
                
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 checkbox">
                  <label style="margin-top: inherit;"><input type="checkbox" id="checkExcluirDistriEditar">Excluir Distribuidor</label>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 checkbox">
                  <label style="margin-top: 30px;"><input type="checkbox" id="checkSalonBlackEditar">Salon Black</label>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="divExcluirDistriEditar" style="display: none;">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Distribuidor</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchDistribuidorKitEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Distribuidor</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnUpdateDistribuidorKit"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingUpdateDistribuidorKit" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Productos</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchProductosKitEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Catalogo</th>
                              <th>Cantidad</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnUpdateProductoKit" disabled="disabled"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingUpdateProductoKit" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Sucursales</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchSucursalKitEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Sucursal</th>
                              <th>Precio</th>
                              <th>Ahorro</th>
                              <th>#</th>
                              <th hidden="hidden">identificador</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnUpdateSucursalKit"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingUpdateSucursalKit" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="btnCerrarUpdateKit" data-dismiss="modal" style="float: left;">Cerrar</button>
            <button type="button" class="btn btn-danger" id="loadingCerrarUpdateKit" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

            <button type="button" class="btn btn-warning" style="float: right;" id="btnUpdatePromocionKit">Editar Promoción</button>
            <button type="button" class="btn btn-warning" id="loadingUpdatePromocionKit" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

            <button type="button" class="btn btn-primary" style="display: none; float: right;" id="btnAddDuplicarPromo">Duplicar Promoción</button>
            <button type="button" class="btn btn-primary" id="loadingAddDuplicarPromo" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal Editar Promoción -->

    <!-- Modal Agregar Distribuidor Kit -->
    <div class="modal fade" id="modalDistribuidoresKitEditar" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-warning">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Distribuidores</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListDistribuidorEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Distribuidor</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnUpdateListDistribuidor">Agregar</button>
            <button type="button" class="btn btn-primary" id="loadingUpdateListDistribuidor" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div> 

    <!-- Modal Agregar Productos Kit -->
    <div class="modal fade" id="modalProductoKitEditar" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-warning">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Productos</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListProductosEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Codigo</th>
                    <th>Producto</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnUpdateListProducto">Agregar</button>
            <button type="button" class="btn btn-primary" id="loadingUpdateListProducto" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Agregar Sucursales Kit -->
    <div class="modal fade" id="modalSucursalKitEditar" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Sucursales</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListSucursalesEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Sucursal</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnUpdateListSucursales">Agregar</button>
            <button type="button" class="btn btn-primary" id="loadingUpdateListSucursales" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Agregar Oferta -->
    <div class="modal fade" id="modalAgregarOferta" role="dialog" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" style="overflow-y: auto; max-height: 750px;">
          <div class="modal-header bg-primary">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Nueva Oferta</h4>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                <div class="form-group">
                  <label for="txt_Nombre_Oferta">Nombre:*</label>
                  <input type="text" name="txt_Nombre_Oferta" id="txt_Nombre_Oferta" class="form-control">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div class="input-daterange">
                    <div class="form-group">
                      <label for="Vigencia_Inicial_Oferta" class="form-control-label">Vigencia Inicial:*</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="Vigencia_Inicial_Oferta">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                      </div>    
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div class="input-daterange">
                    <div class="form-group">
                      <label for="Vigencia_Final_Oferta" class="form-control-label">Vigencia Final:*</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="Vigencia_Final_Oferta">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                      </div>    
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="txtCompra_Requerida">Compra Requerida:*</label>
                  <input type="number" name="txtCompra_Requerida" id="txtCompra_Requerida" class="form-control" min="1" value="1">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <div class="radio">
                    <label><input type="radio" name="optradio" id="radio_Descuento">Descuento</label>
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <div class="radio">
                    <label><input type="radio" name="optradio" id="radio_Regalo">Regalo</label>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="divDescuento" style="display: none;">
                  <div class="form-group">
                    <label for="txtDescuento">Descuento:*</label>
                    <div class="input-group">
                      <input type="number" class="form-control" min="0" max="100" value="1" id="txtDescuento">
                      <span class="input-group-addon">%</span>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="divRegalo" style="display: none;">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Regalos</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchRegalo" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Productos</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnAddRegalo"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingAddRegalo" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                    </div>
                  </div>
                </div>

                <div class="col-md-12 checkbox">
                  <label style="margin-top: inherit;"><input type="checkbox" id="check_Excluir_Oferta">Excluir Distribuidor</label>
                </div>

                <div class="col-md-12" id="divExcluirOferta" style="display: none;">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Distribuidor</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchDistribuidorOferta" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Distribuidor</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnAddDistriOferta"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingAddDistriOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                    </div>
                  </div>
                </div>
                
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Divisiones</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchDivision" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>División</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnAddDivisionOferta"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingAddDivisionOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Linea</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchLinea" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Linea</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnAddLineaOferta"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingAddLineaOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Sublinea</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchSublinea" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Sublinea</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnAddSublineaOferta"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingAddSublineaOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Producto</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchProductosOferta" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Producto</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnAddProductoOferta"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingAddProductoOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Sucursales</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchSucursalOferta" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Sucursal</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnAddSucursalOferta"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingAddSucursalOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="btnCerrarAddOferta" data-dismiss="modal" style="float: left;">Cerrar</button>
            <button type="button" class="btn btn-danger" id="loadingCerrarAddOferta" disabled style="float: left; display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

            <button type="button" class="btn btn-primary" style="float: right;" id="btnAddOferta">Agregar Oferta</button>
            <button type="button" class="btn btn-primary" id="loadingAddOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Agregar Oferta -->

    <!-- Modal Regalos -->
    <div class="modal fade" id="modalRegalos" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Productos</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListRegalos" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Codigo</th>
                    <th>Producto</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnAddListProductoRegalo">Agregar</button>
            <button type="button" class="btn btn-primary" id="loadingAddListProductoRegalo" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Regalos -->

    <!-- Modal Distribuidor Ofertas -->
    <div class="modal fade" id="modalDistribuidoresOfertas" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Distribuidores</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListDistribuidorOferta" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Distribuidor</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnAddListDistribuidorOferta">Agregar</button>
            <button type="button" class="btn btn-primary" id="loadingAddListDistribuidorOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Distribuidor Ofertas -->
    
    <!-- Modal División Ofertas -->
    <div class="modal fade" id="modalDivision" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">División</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListDivision" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>División</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnAddListDivision">Agregar</button>
            <button type="button" class="btn btn-primary" id="loadingAddListDivision" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal División Ofertas -->

    <!-- Modal Linea Ofertas -->
    <div class="modal fade" id="modalLinea" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Lineas</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListLinea" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Linea</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnAddListLinea">Agregar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Linea Ofertas -->

    <!-- Modal Sublinea Ofertas -->
    <div class="modal fade" id="modalSublinea" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Sublinea</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListSublinea" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Sublinea</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnAddListSublinea">Agregar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Sublinea Ofertas -->
    
    <!-- Modal Producto Ofertas -->
    <div class="modal fade" id="modalProductoOferta" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Producto</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListProductoOferta" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Codigo</th>
                    <th>Producto</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnAddListProductoOferta">Agregar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Producto Ofertas -->

    <!-- Modal Sucursales Ofertas -->
    <div class="modal fade" id="modalSucursalOferta" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Sucursal</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListSucursalesOferta" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Sucursal</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnAddListSucursalesOferta">Agregar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Sucursales Ofertas -->

    <!-- Modal Editar Oferta -->
    <div class="modal fade" id="modalEditarOferta" role="dialog" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" style="overflow-y: auto; max-height: 750px;">
          <div class="modal-header bg-warning">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Editar Oferta</h4>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                <div class="checkbox form-group" style="margin-bottom: 50px;">
                  <label style="float: right;"><input type="checkbox" id="check_Status_Oferta_Editar">Inactivo</label>
                </div>

                <div class="form-group">
                  <label for="txt_Nombre_Oferta_Editar">Nombre:*</label>
                  <input type="text" name="txt_Nombre_Oferta_Editar" id="txt_Nombre_Oferta_Editar" class="form-control">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div class="input-daterange">
                    <div class="form-group">
                      <label for="Vigencia_Inicial_Oferta_Editar" class="form-control-label">Vigencia Inicial:*</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="Vigencia_Inicial_Oferta_Editar">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                      </div>    
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div class="input-daterange">
                    <div class="form-group">
                      <label for="Vigencia_Final_Oferta_Editar" class="form-control-label">Vigencia Final:*</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="Vigencia_Final_Oferta_Editar" >
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                      </div>    
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="txtCompra_Requerida_Editar">Compra Requerida:*</label>
                  <input type="number" name="txtCompra_Requerida_Editar" id="txtCompra_Requerida_Editar" class="form-control" min="1" value="1">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <div class="radio">
                    <label><input type="radio" name="optradio" id="radio_Descuento_Editar">Descuento</label>
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <div class="radio">
                    <label><input type="radio" name="optradio" id="radio_Regalo_Editar">Regalo</label>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="divDescuentoEditar" style="display: none;">
                  <div class="form-group">
                    <label for="txtDescuento_Editar">Descuento:*</label>
                    <div class="input-group">
                      <input type="number" class="form-control" min="0" max="100" value="1" id="txtDescuento_Editar">
                      <span class="input-group-addon">%</span>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="divRegaloEditar" style="display: none;">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Regalos</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchRegalosEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Productos</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnUpdateRegalo"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingUpdateRegalo" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkbox">
                  <label style="margin-top: inherit;"><input type="checkbox" id="check_Excluir_Oferta_Editar">Excluir Distribuidor</label>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="divExcluirOfertaEditar" style="display: none;">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Distribuidor</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchDistribuidorOfertaEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Distribuidor</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnUpdateDistriOferta"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingUpdateDistriOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                    </div>
                  </div>
                </div>
                
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Divisiones</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchDivisionEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>División</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnUpdateDivisionOferta"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingUpdateDivisionOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Linea</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchLineaEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Linea</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnUpdateLineaOferta"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingUpdateLineaOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Sublinea</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchSublineaEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Sublinea</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnUpdateSublineaOferta"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingUpdateSublineaOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Producto</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchProductosOfertaEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Producto</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnUpdateProductoOferta"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingUpdateProductoOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h3 class="box-title">Sucursales</h3>
                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="table-responsive">
                        <table id="fetchSucursalOfertaEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Sucursal</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="button" class="btn btn-success" id="btnUpdateSucursalOferta"><span class="glyphicon glyphicon-plus"></span></button>
                      <button type="button" class="btn btn-success" id="loadingUpdateSucursalOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="btnCerrarUpdateOferta" data-dismiss="modal" style="float: left;">Cerrar</button>
            <button type="button" class="btn btn-danger" id="loadingCerrarUpdateOferta" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>

            <button type="button" class="btn btn-warning" style="float: right;" id="btnUpdateOferta">Guardar Cambios</button>
            <button type="button" class="btn btn-warning" id="loadingUpdateOferta" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Regalos -->
    <div class="modal fade" id="modalRegalosEditar" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Productos</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListRegalosEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Codigo</th>
                    <th>Producto</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnUpdateListProductoRegalo">Agregar</button>
            <button type="button" class="btn btn-primary" id="loadingUpdateListProductoRegalo" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Regalos -->

    <!-- Modal Distribuidor Ofertas -->
    <div class="modal fade" id="modalDistribuidoresOfertasEditar" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Distribuidores</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListDistribuidorOfertaEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Distribuidor</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnUpdateListDistribuidorOferta">Agregar</button>
            <button type="button" class="btn btn-primary" id="loadingUpdateListDistribuidorOferta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Distribuidor Ofertas -->
    
    <!-- Modal División Ofertas -->
    <div class="modal fade" id="modalDivisionEditar" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">División</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListDivisionEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>División</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnUpdateListDivision">Agregar</button>
            <button type="button" class="btn btn-primary" id="loadingUpdateListDivision" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal División Ofertas -->

    <!-- Modal Linea Ofertas -->
    <div class="modal fade" id="modalLineaEditar" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Lineas</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListLineaEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Linea</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnUpdateListLinea">Agregar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Linea Ofertas -->

    <!-- Modal Sublinea Ofertas -->
    <div class="modal fade" id="modalSublineaEditar" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Sublinea</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListSublineaEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Sublinea</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnUpdateListSublinea">Agregar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Sublinea Ofertas -->
    
    <!-- Modal Producto Ofertas -->
    <div class="modal fade" id="modalProductoOfertaEditar" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Producto</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListProductoOfertaEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Codigo</th>
                    <th>Producto</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnUpdateListProductoOferta">Agregar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Producto Ofertas -->

    <!-- Modal Sucursales Ofertas -->
    <div class="modal fade" id="modalSucursalOfertaEditar" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Sucursal</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table id="fetchListSucursalesOfertaEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Sucursal</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnUpdateListSucursalesOferta">Agregar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Sucursales Ofertas -->

  </div>
</div>