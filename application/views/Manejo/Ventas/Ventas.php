<br>
<div id="sales">
  <loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true" :z-index="9999"></loading>
  <div class="container-fluid">
    <ul class="nav nav-tabs">
      <li class="active"><a data-toggle="tab" href="#home">Nueva Venta</a></li>
      <li><a data-toggle="tab" href="#menu1">Ventas</a></li>
      <li><a data-toggle="tab" href="#menu2">Otras Salidas</a></li>
    </ul>

    <div class="tab-content">
      <div id="home" class="tab-pane fade in active">
        <h3>Nueva Venta</h3>
        <br><br><br>
        <div align="center">
          <h3 style="text-align: center;">PROXIMAMENTE</h3>
          <img src="<?php echo base_url('assets/img/Proximamente1.png') ?>" alt="" align="center">
        </div>
      </div>
      <div id="menu1" class="tab-pane fade">
        <h3>Ventas</h3>
        <div class="col-lg-12 col-md-12 col-sm-6 col-xs-6">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Ventas</h3>
            </div>
            <div class="box-body">
              <div class="container-fluid">
                <div class="col-lg-12 col-md-12 col-sm-6 col-xs-6">
                  <div class="input-daterange">
                    <div class="form-group col-md-3" style="max-width: 225px;">
                      <label for="Fecha_Inicio" class="form-control-label">Desde:</label>
                      <div class="input-group">
                        <input type="text" placeholder="<?php echo date("Y-m-d"); ?>" class="form-control" id="start_date" name="start_date">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                      </div> 
                    </div>

                    <div class="form-group col-md-3" style="max-width: 225px;">
                      <label for="Fecha_Fin" class="form-control-label">Hasta:</label>
                      <div class="input-group">
                        <input type="text" placeholder="<?php echo date("Y-m-d"); ?>" class="form-control" value="" max="<?php echo date("Y-m-d"); ?>" id="end_date" name="end_date"> <!-- <?php echo date("Y-m-d");?> Codigo Fecha -->
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                      </div>    
                    </div>
                  </div>

                  <div class="form-group col-md-2">
                    <div class="input-group">
                      <input type="submit" name="search" id="search" value="Buscar" class="btn btn-primary" style="margin-top: 25px"/>  
                    </div>    
                  </div>

                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="exampleFormControlSelect2">Distribuidor:</label>
                        <select class="form-control" id="exampleFormControlSelect2">
                          <option value="">Seleccionar...</option>
                          <?php foreach ($Distribuidor as $key => $value) { ?>
                            <option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'].' '.$value['Apellidos'] ?></option>
                          <?php } ?>
                        </select>
                      </div>
                    </div>

                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="exampleFormControlSelect3">Sucursales:</label>
                        <select class="form-control" id="exampleFormControlSelect3">
                          <option value="">Seleccionar...</option>
                          <?php foreach ($Sucursal as $key => $value) { ?>
                            <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
                          <?php } ?>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <table id="Table_Ventas_Menudeo" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                      <thead>
                        <tr>
                          <td>ID</td>
                          <td>Fecha venta</td>
                          <td>Cliente</td>
                          <td>Distribuidor</td>
                          <td>Descuento</td>
                          <td>Subtotal</td>
                          <td>Impuestos</td>
                          <td>Total</td>
                          <td>Total Descuento</td>
                          <td>Adeudo</td>
                          <td>Status</td>
                          <td>Fecha Entrega</td>
                          <td>Extraido</td>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="box-footer">
              <div class="container-fluid">
                <button class="btn btn-default" id="btn_Eliminar_Venta_Menudeo"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button class="btn btn-primary" id="btnGenerarVentaDistribuidores">Generar Venta Distribuidor</button>
                <button class="btn btn-danger"  id="Eliminar_Venta_Generada" style="float: right;">Eliminar Venta Generada</button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-12 col-md-12 col-sm-6 col-xs-6">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Detalle Venta</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div class="table-responsive col-lg-12">
                <table id="Table_Detalle_Ventas_Menudeo" class="table table-hover table-striped table-bordered table-condensed" width="100%">
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


      <div id="menu2" class="tab-pane fade">
        <h3>Otras Salidas</h3>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Otras Salidas</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div class="table-responsive col-lg-12">
                <table id="tableOthersExists" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Fecha</td>
                      <td>Usuario</td>
                      <td>Concepto</td>
                      <td>Cant. Productos</td>
                      <td>Monto</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  <tbody>
                    <!--<tr v-for="other in ObjDetailsOthersExits">
                      <td>{{other.ID}}</td>
                      <td>{{other.Fecha}}</td>
                      <td>{{other.Usuario}}</td>
                      <td>{{other.Concepto}}</td>
                      <td>{{other.Cant_Productos}}</td>
                      <td>{{other.Monto}}</td>
                      <td>{{other.Status}}</td>
                    </tr>-->
                  </tbody>
                </table>
              </div>
            </div>
            <div class="box-footer">
              <button class="btn btn-success" @click="_openModalOthers"><i class="fa fa-plus" aria-hidden="true"></i></button> 
              <button class="btn btn-danger"  @click="_deleteOthers"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>

        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Detalle Otras Salidas</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div class="table-responsive col-lg-12">
                <table id="tableDetailsOthersExists" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Producto</td>
                      <td>Locación</td>
                      <td>Cantidad</td>
                      <td>Precio Unitario</td>
                      <td>Importe</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="other in ObjDetailsOthersExits">
                      <td>{{other.idDetalleInventario}}</td>
                      <td>{{other.Producto}}</td>
                      <td>{{other.Locacion}}</td>
                      <td>{{other.Cantidad}}</td>
                      <td>{{other.Precio_Unitario}}</td>
                      <td>{{other.Importe}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>


    <!-- Modal Generar Venta Distribuidores -->
    <div id="modalVentaDistribuidores" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Generar Venta Distribuidores</h4>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="form-group">
                <label for="selectVentaDistribuidor">Distribuidor:</label>
                <select class="form-control" name="selectVentaDistribuidor" id="selectVentaDistribuidor">
                  <option value="">Seleccionar...</option>
                  <?php foreach ($Distribuidor as $key => $value) { ?>
                    <option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'].' '.$value['Apellidos'] ?></option>
                  <?php } ?>
                </select>
              </div>
              <div class="table-responsive">
                <table class="table table-bordered table-condensed table-hover table-striped" id="fetchVentasDistribuidor" width="100%">
                  <caption>Ventas Menudeo del Distribuidor</caption>
                  <thead>
                    <tr>
                      <th>Generar</th>
                      <th>ID</th>
                      <th>Fecha Venta</th>
                      <th>Cliente</th>
                      <th>Total</th>
                      <th>Total Precio Publico</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
              <div class="col-lg-12">
                <div class="col-lg-3">
                  <label>Cantidad de Pedidos:&nbsp;&nbsp; <span id="spanCantidad">0</span></label>
                </div>
                <div class="col-lg-3">
                  <label>Monto de Pedidos (Precio Publico):&nbsp;&nbsp; $<span id="spanMontoPublico">0.00</span></label>
                </div>
                <div class="col-lg-3">
                  <label>Monto de Pedidos (Precio Salon):&nbsp;&nbsp; $<span id="spanMontoSalon">0.00</span></label>
                </div>
                <div class="col-lg-3">
                  <label>Monto de Pedidos (Precio Distribuidor):&nbsp;&nbsp; $<span id="spanMontoDistribuidor">0.00</span></label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" id="btnEnviarPedido">Enviar Pedido</button>
            <button type="button" class="btn btn-success" disabled="disabled" id="loadingEnviarPedido" style="display: none;"><i class="fa fa-spinner fa-spin"></i> Loading...</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" id="btnCerrarEnviarPedido">Cerrar</button>
            <button type="button" class="btn btn-danger" disabled="disabled" id="loadingCerrarEnviarPedido" style="display: none;"><i class="fa fa-spinner fa-spin"></i> Loading...</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Generar Venta Distribuidores -->

    <!-- Modal Eliminar Venta -->
    <div id="Modal_Eliminar_Venta" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Eliminar Venta Generada</h4>
          </div>
          <div class="modal-body">
            <div class="col-lg-12">
              <div class="form-group">
                <label for="exampleFormControlSelect4">Distribuidor:</label>
                <select class="form-control" id="exampleFormControlSelect4">
                  <option value="">Seleccionar...</option>
                </select>
              </div>
            </div>

            <div class="wrap" id="Cargando_Eliminar_Venta" style="display: none;">
              <div class="loading">
                <div class="bounceball"></div>
                <div class="text">&nbsp; &nbsp; Cargando...</div>
              </div>
            </div>
            
            <div class="table-responsive col-lg-12">
              <table id="Table_Eliminar_Venta" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Fecha Venta</td>
                    <td>Descuento</td>
                    <td>Subtotal</td>
                    <td>Impuestos</td>
                    <td>Total</td>
                    <td>Adeudo</td>
                    <td>Pedidos</td>
                    <td>Status</td>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" style="float: left;" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-warning" style="float: right;" id="btn_Regresar_Venta">Regresar Venta</button>
            <button type="button" class="btn btn-danger" style="float: right;" id="btn_Eliminar_Venta">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Eliminar Venta -->

    <!-- Modal Nuevo Producto -->
    <div id="modalOthersExists" class="modal fade" role="dialog">
    <loading :active="activeModal" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true" :z-index="9999"></loading>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Registrar Otras Salidas</h4>
          </div>
          <div class="modal-body">

          <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#registro" @click="_tabRegistro">Registro</a></li>
            <li><a data-toggle="tab" href="#listado" @click="_tabListado">Listado</a></li>
          </ul>

          <div class="tab-content">
            <div id="registro" class="tab-pane fade in active">
              <br>
              <div class="container-fluid">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div class="form-group">
                      <label>Sucursal:*</label>
                      <select class="form-control" v-model="Others.idSucursal">
                        <option value="">Seleccionar...</option>
                        <option v-for="branch in ObjBranch" :value="branch.ID">{{branch.Sucursal}}</option>
                      </select>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div class="form-group">
                      <label>Concepto:*</label>
                      <input type="text" class="form-control" v-model="Others.Concepto">
                  </div>
                </div>

                <div class="col-lg-12 col-md-12">
                  <div class="table-responsive">
                    <table id="tableProducts" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                      <thead>
                        <tr>
                          <td>ID</td>
                          <td>Producto</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="product in ObjProduct">
                          <td>{{product.ID}}</td>
                          <td>{{product.Producto}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12">
                <br><br>
                  <div class="table-responsive">
                    <table id="tableLocation" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                      <thead>
                        <tr>
                          <td>ID</td>
                          <td>Locacion</td>
                          <td>Existencias</td>
                          <td>Fecha Ingreso</td>
                          <td>Cantidad</td>
                          <td>#</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="details in ObjDetailInventary">
                          <td>{{details.ID}}</td>
                          <td>{{details.Locacion}}</td>
                          <td>{{details.Existencias}}</td>
                          <td>{{details.Fecha_ingreso}}</td>
                          <td><input type="number" class="form-control" :max="details.Existencias" min="0" v-model="details.Cantidad"></td>
                          <td><button type="button" class="btn btn-success" @click="_addList(details)"><i class="fa fa-plus" aria-hidden="true"></i></button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
            <div id="listado" class="tab-pane fade">
              <br>
              <div class="container-fluid">
                <div class="col-lg-12 col-md-12">
                  <div class="table-responsive">
                    <table id="tableListProducts" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                      <thead>
                        <tr>
                          <td>ID</td>
                          <td>Locación</td>
                          <td>Producto</td>
                          <td>Cantidad</td>
                          <td>Precio Unitario</td>
                          <td>Importe</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="list in ObjListProducts">
                          <td>{{list.ID}}</td>
                          <td>{{list.Locacion}}</td>
                          <td>{{list.Producto}}</td>
                          <td>{{list.Cantidad}}</td>
                          <td>{{list.Precio_publico}}</td>
                          <td>{{list.Importe = list.Cantidad * list.Precio_publico}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12">
                  <label><b>Cantidad Productos: </b> <span>{{CalcularProducto}}</span></label>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12">
                  <label><b>Total Global: </b> <span>{{CalcularTotal}}</span></label>
                </div>

              </div>
            </div>
          </div>


          </div>
          <div class="modal-footer">
            <div class="container-fluid">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" @click="_generar">Generar</button>
            </div>

          </div>
        </div>
      </div>
    </div>


  </div>
</div>
