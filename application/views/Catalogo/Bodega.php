<!-- Page Content -->
<br>

<div id="page-wrapper">
  <div class="container-fluid">
 	  <div class="col-md-12">
      <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#home">Bodega</a></li>
        <li><a data-toggle="tab" href="#menu1">Configuración</a></li>
      </ul>

      <div class="tab-content">
        <div id="home" class="tab-pane fade in active">
          <br>
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Bodega</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <div class="btn-group">
                  <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-wrench"></i></button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a id="Option_Agregar_Bodega">Agregar</a></li>
                    <li><a id="Option_Editar_Bodega">Editar</a></li>
                    <li class="divider"></li>
                    <li><a id="Option_Eliminar_Bodega">Eliminar</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="table-responsive col-lg-12">
                 <table id="Table_Bodega" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Nombre</td>
                        <td>Encargado</td>
                        <td>Calle Numero</td>
                        <td>Colonia</td>
                        <td>Municipio</td>
                        <td>Estado</td>
                        <td>País</td>
                        <td>CP</td>
                        <td>Tel1</td>
                        <td>Tel2</td>
                        <td>Email</td>
                        <td>Status</td>
                        <td>Tipo</td>
                        <td>Impuesto</td>
                        <td>Contraseña</td>
                        <td>Compra Minima</td>
                        <td>Moneda</td>
                        <td>Semanas Clientes</td>
                        <td>Monto Clientes</td>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
              </div>
              <!-- /.row -->
            </div>
            <!-- ./box-body -->
            <div class="box-footer">
                <button class="btn btn-success btn-xs btn-flat" name="Agregar_Clientes" id="Agregar_Bodega"><span class="glyphicon glyphicon-plus"></span></button>
                <button class="btn btn-warning btn-xs btn-flat" name="Editar_Clientes" id="Editar_Bodega"><span class="glyphicon glyphicon-pencil"></span> </button>
                <button class="btn btn-danger btn-xs btn-flat" name="Eliminar_Clientes" id="Eliminar_Bodega"><span class="glyphicon glyphicon-trash"></span></button>

                <button class="btn btn-primary btn-xs btn-flat" name="Ver_Locaciones" id="Ver_Locaciones" style="float: right;">Ver Locaciones</button>
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>
        <div id="menu1" class="tab-pane fade">
          <br>


          <form action="<?php echo base_url('index.php/Controller_Bodega/csvInventarioGeneral') ?>" method="post" accept-charset="utf-8" target="_blank">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Productos en Bodega</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">

              <div class="form-group">
                <label for="selectBodega">Bodega:</label>
                <select name="selectBodega" id="selectBodega" class="form-control">
                  <option value="">Seleccionar...</option>
                    <?php foreach ($Sucursal as $key => $value) { ?>
                  <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
            <?php } ?>
                </select>
              </div>
              <div class="table-responsive col-lg-12">
                 <table id="Table_Productos" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Codigo</td>
                        <td>Producto</td>
                        <td>Precio Publico</td>
                        <td>Min</td>
                        <td>Existencias</td>
                        <td>Cantidad Picking</td>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
              </div>
              <!-- /.row -->
            </div>
            <!-- ./box-body -->
            <div class="box-footer">
                <button type="submit" class="btn btn-primary" style="float: right;"><span class="glyphicon glyphicon-download"></span></button>

                <button type="button" class="btn btn-success" name="Agregar_Clientes" id="Agregar_Bodega_Productos"><span class="glyphicon glyphicon-plus"></span></button>
                <button type="button" class="btn btn-warning" name="Editar_Clientes" id="Editar_Bodega_Productos"><span class="glyphicon glyphicon-pencil"></span> </button>
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>

        </form>

      </div>

    </div>
  </div>
</div>

<!-- Modal -->
<div id="myModal_Guardar" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Nueva Sucursal</h4>
      </div>
      <div class="modal-body">
        
        <div class="container-fluid">
          
          <div class="form-group">
            <div class="checkbox">
              <label style="float: right;"><input type="checkbox" id="checkAutorizar"> Autorizar Pagos</label>
              <label style="float: right; margin-right: 10px;"><input type="checkbox" id="checkExtracciones"> Extracciones Pagadas</label>
              <label style="float: right; margin-right: 10px;"><input type="checkbox" id="checkFacturacion"> Facturación</label>
            </div>
          </div>
        
          <div class="form-group">
            <label for="txtNombre">Sucursal:*</label>
            <input type="text" class="form-control" id="txtNombre">
          </div>

          <div class="form-group">
            <label for="txt_Encargado">Encargado:</label>
            <input type="text" class="form-control" id="txt_Encargado">
          </div>

          <div class="form-group">
            <label for="txtCalle">Calle:*</label>
            <input type="text" class="form-control" id="txtCalle">
          </div>

          <div class="form-group">
            <label for="txtColonia">Colonia:*</label>
            <input type="text" class="form-control" id="txtColonia">
          </div>

          <!--<div class="form-group">
            <label for="txtCiudad">Ciudad:</label>
            <input type="text" class="form-control" id="txtCiudad">
          </div>-->

          <div class="form-group">
            <label for="txtMunicipio">Municipio:*</label>
            <input type="text" class="form-control" id="txtMunicipio">
          </div>

          <div class="form-group">
            <label for="txtEstado">Estado:*</label>
            <input type="text" class="form-control" id="txtEstado">
          </div>

          <div class="form-group">
            <label for="txtPais">País:*</label>
            <input type="text" class="form-control" id="txtPais">
          </div>

          <div class="form-group">
            <label for="txtCP">CP:*</label>
            <input type="number" class="form-control" id="txtCP" maxlength="5">
          </div>

          <div class="form-group">
            <label for="txtTel1">Telefono 1:*</label>
            <input type="number" class="form-control" id="txtTel1" maxlength="10">
          </div>

          <div class="form-group">
            <label for="txtTel2">Telefono 2:</label>
            <input type="number" class="form-control" id="txtTel2" maxlength="10">
          </div>

          <div class="form-group">
            <label for="txtEmail">Email:*</label>
            <input type="Email" class="form-control" id="txtEmail">
          </div>

          <div class="form-group">
            <label for="txtTipo">Tipo:*</label>
            <input type="text" class="form-control" id="txtTipo">
          </div>

          <div class="form-group">
            <label for="txtImpuesto">Impuesto:*</label>
            <input type="number" class="form-control" id="txtImpuesto" min="0" max="100" maxlength="100" minlength="0" value="0">
          </div>

          <div class="wrap" id="Cargando_Agregar" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>

          <div class="form-group">
            <label for="SelectMoneda">Moneda:*</label>
            <select id="SelectMoneda" class="form-control">
              <option value="">Seleccionar...</option>
              <?php foreach ($Moneda as $key => $value) { ?>
                <option value="<?php echo $value['ID'] ?>"><?php echo $value['Moneda'] ?></option>
            <?php } ?>
            </select>
          </div>

          <div class="form-group">
            <label for="txtPassword">Contraseña:*</label>
            <input type="password" class="form-control" id="txtPassword">
          </div>

          <div class="form-group">
            <label for="txtCompraMinima">Compra Minima:*</label>
            <input type="number" class="form-control" id="txtCompraMinima">
          </div>

          <div class="form-group">
            <label for="txtPorcentaje">Porcentaje Puntos:*</label>
            <input type="number" class="form-control" id="txtPorcentaje">
          </div>

          <div class="form-group">
            <label for="txtDias_Vigencia">Dias Vigencia Puntos:*</label>
            <input type="number" class="form-control" id="txtDias_Vigencia">
          </div>

          <div class="form-group">
            <label for="txtSemana_Clientes_Menudeo">Semanas Clientes Menudeo:</label>
            <select id="txtSemana_Clientes_Menudeo" class="form-control">
              <option value="">Seleccionar...</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </select>
          </div>

          <div class="form-group">
            <label for="txtMonto_Clientes_Menudeo">Monto Clientes Menudeo:</label>
            <input type="number" class="form-control" id="txtMonto_Clientes_Menudeo">
          </div>

        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-primary" style="float: right;" id="btn_Guardar_Bodega">Guardar</button>
      </div>
    </div>

  </div>
</div>


<!-- Modal -->
<div id="myModal_Editar" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Sucursal</h4>
      </div>
      <div class="modal-body">
        
        <div class="container-fluid">
          
          <div class="form-group">
            <div class="checkbox">
              <label style="float: right;"><input type="checkbox" id="check_Status"> Inactivo</label>
              <label style="float: right; margin-right: 10px"><input type="checkbox" id="checkAutorizarEditar"> Autorizar Pagos</label>
              <label style="float: right; margin-right: 10px;"><input type="checkbox" id="checkExtraccionesEditar"> Extracciones Pagadas</label>
              <label style="float: right; margin-right: 10px;"><input type="checkbox" id="checkFacturacionEditar"> Facturación</label>
            </div>
          </div>

          <div class="form-group">
            <label for="txtNombre_Editar">Sucursal:*</label>
            <input type="text" class="form-control" id="txtNombre_Editar">
          </div>

          <div class="form-group">
            <label for="txt_Encargado_Editar">Encargado:</label>
            <input type="text" class="form-control" id="txt_Encargado_Editar">
          </div>

          <div class="form-group">
            <label for="txtCalle_Editar">Calle:*</label>
            <input type="text" class="form-control" id="txtCalle_Editar">
          </div>

          <div class="form-group">
            <label for="txtColonia_Editar">Colonia:*</label>
            <input type="text" class="form-control" id="txtColonia_Editar">
          </div>

          <!--<div class="form-group">
            <label for="txtCiudad">Ciudad:</label>
            <input type="text" class="form-control" id="txtCiudad">
          </div>-->

          <div class="form-group">
            <label for="txtMunicipio_Editar">Municipio:*</label>
            <input type="text" class="form-control" id="txtMunicipio_Editar">
          </div>

          <div class="form-group">
            <label for="txtEstado_Editar">Estado:*</label>
            <input type="text" class="form-control" id="txtEstado_Editar">
          </div>

          <div class="form-group">
            <label for="txtPais_Editar">País:*</label>
            <input type="text" class="form-control" id="txtPais_Editar">
          </div>

          <div class="form-group">
            <label for="txtCP_Editar">CP:*</label>
            <input type="number" class="form-control" id="txtCP_Editar" maxlength="5">
          </div>

          <div class="form-group">
            <label for="txtTel1_Editar">Telefono 1:*</label>
            <input type="number" class="form-control" id="txtTel1_Editar" maxlength="10">
          </div>

          <div class="form-group">
            <label for="txtTel2_Editar">Telefono 2:</label>
            <input type="number" class="form-control" id="txtTel2_Editar" maxlength="10">
          </div>

          <div class="form-group">
            <label for="txtEmail_Editar">Email:*</label>
            <input type="Email" class="form-control" id="txtEmail_Editar">
          </div>

          <div class="form-group">
            <label for="txtTipo_Editar">Tipo:*</label>
            <input type="text" class="form-control" id="txtTipo_Editar">
          </div>

          <div class="form-group">
            <label for="txtImpuesto_Editar">Impuesto:*</label>
            <input type="number" class="form-control" id="txtImpuesto_Editar" min="0" max="100" maxlength="100" minlength="0" value="0">
          </div>

          <div class="wrap" id="Cargando_Editar" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>

          <div class="form-group">
            <label for="SelectMoneda_Editar">Moneda:*</label>
            <select id="SelectMoneda_Editar" class="form-control">
              <option value="">Seleccionar...</option>
              <?php foreach ($Moneda as $key => $value) { ?>
                <option value="<?php echo $value['ID'] ?>"><?php echo $value['Moneda'] ?></option>
            <?php } ?>
            </select>
          </div>

          <div class="form-group">
            <label for="txtPassword_Editar">Contraseña:*</label>
            <input type="password" class="form-control" id="txtPassword_Editar">
          </div>

          <div class="form-group">
            <label for="txtCompraMinima_Editar">Compra Minima:*</label>
            <input type="number" class="form-control" id="txtCompraMinima_Editar">
          </div>

          <div class="form-group">
            <label for="txtPorcentaje_Editar">Porcentaje Puntos:*</label>
            <input type="number" class="form-control" id="txtPorcentaje_Editar">
          </div>

          <div class="form-group">
            <label for="txtDias_Vigencia_Editar">Dias Vigencia Puntos:*</label>
            <input type="number" class="form-control" id="txtDias_Vigencia_Editar">
          </div>

          <div class="form-group">
            <label for="txtSemana_Clientes_Menudeo_Editar">Semanas Clientes Menudeo:</label>
            <select id="txtSemana_Clientes_Menudeo_Editar" class="form-control">
              <option value="">Seleccionar...</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </select>
          </div>

          <div class="form-group">
            <label for="txtMonto_Clientes_Menudeo_Editar">Monto Clientes Menudeo:</label>
            <input type="number" class="form-control" id="txtMonto_Clientes_Menudeo_Editar">
          </div>

        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-warning" style="float: right;" id="btn_Editar_Bodega">Guardar Cambios</button>
      </div>
    </div>

  </div>
</div>

<!-- Modal -->
<div id="Modal_Locaciones" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Locaciones</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="table-responsive col-lg-12">
                 <table id="Table_Locaciones" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Locacion</td>
                        <td>Predeterminado</td>
                        <td>Categoria</td>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
              </div>

              <div class="wrap" id="Cargando_Locacion_Locacion" style="display: none;">
                <div class="loading">
                  <div class="bounceball"></div>
                  <div class="text">&nbsp; &nbsp; Cargando...</div>
                </div>
              </div>


        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-success btn-xs btn-flat" id="Agregar_Locacion"><span class="glyphicon glyphicon-plus"></span></button>
        <button class="btn btn-warning btn-xs btn-flat" id="Editar_Locacion"><span class="glyphicon glyphicon-pencil"></span> </button>
        <button class="btn btn-danger btn-xs btn-flat"  id="Eliminar_Locacion"><span class="glyphicon glyphicon-trash"></span></button>
      </div>
    </div>

  </div>
</div>


<!-- Modal -->
<div id="Add_Locacion" class="modal fade" role="dialog">
  <div class="modal-dialog modal-sm">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Agregar Locacion</h4>
      </div>
      <div class="modal-body">

        <div class="checkbox">
            <label style="float: right;"><input type="checkbox" id="check_Predeterminado"> Predeterminado</label>
          </div>
        
        <div class="form-group">
          <label for="Sucursal">Sucursal:*</label>
          <input type="text" class="form-control" id="Sucursal" readonly="readonly">
        </div>

        <div class="wrap" id="Cargando_Locacion" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>

        <div class="form-group">
          <label for="txtLocacion">Locación:*</label>
          <input type="text" class="form-control" id="txtLocacion">
        </div>

        <div class="form-group">
          <label for="txtCategoria">Categoria:</label>
          <input type="number" class="form-control" id="txtCategoria" value="0" min="0">
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-success" style="float: right;" id="btn_Agregar_Locacion">Agregar</button>
      </div>
    </div>

  </div>
</div>


<!-- Modal -->
<div id="Editar_Locacion_Modal" class="modal fade" role="dialog">
  <div class="modal-dialog modal-sm">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Locacion</h4>
      </div>
      <div class="modal-body">

        <div class="checkbox">
            <label style="float: right;"><input type="checkbox" id="check_Predeterminado_Editar"> Predeterminado</label>
          </div>
        
        <div class="form-group">
          <label for="Sucursal_Editar">Sucursal:*</label>
          <input type="text" class="form-control" id="Sucursal_Editar" readonly="readonly">
        </div>

        <div class="wrap" id="Cargando_Locacion_Editar" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>

        <div class="form-group">
          <label for="txtLocacion_Editar">Locación:*</label>
          <input type="text" class="form-control" id="txtLocacion_Editar">
        </div>

        <div class="form-group">
          <label for="txtCategoria_Editar">Categoria:</label>
          <input type="number" class="form-control" id="txtCategoria_Editar" value="0" min="0">
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-warning" style="float: right;" id="btn_Editar_Locacion">Guardar Cambios</button>
      </div>
    </div>

  </div>
</div>


<!-- Modal -->
<div id="Bodega_Producto_Editar" class="modal fade" role="dialog">
  <div class="modal-dialog modal-sm">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Producto</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="form-group">
            <label for="">Minimo:*</label>
            <input type="number" id="txtMinimo_Editar" class="form-control">
          </div>

          <div class="wrap" id="Cargando_Editar_Producto" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>

          <div class="form-group">
            <label for="">Precio publico:*</label>
            <input type="number" id="txtPrecioPublico_Editar" class="form-control">
          </div>

          <div class="form-group">
            <label for="">Cantidad Picking:*</label>
            <input type="number" id="txtCantidadPicking_Editar" class="form-control">
          </div>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-warning" id="btnActualizar">Actualizar</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>


<!-- Modal -->
<div id="Bodega_Producto" class="modal fade" role="dialog">
  <div class="modal-dialog modal-sm">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Agregar Producto</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="form-group">
            <label for="selectDivision">División:</label>
            <select name="selectDivision" id="selectDivision" class="form-control">
              <option value="">Seleccionar...</option>
            </select>
          </div>

          <div class="form-group">
            <label for="selectLiniea">Linea:</label>
            <select name="selectLiniea" id="selectLiniea" class="form-control">
              <option value="">Seleccionar...</option>
            </select>
          </div>

          <div class="form-group">
            <label for="selectSublinea">Sublinea:</label>
            <select name="selectSublinea" id="selectSublinea" class="form-control">
              <option value="">Seleccionar...</option>
            </select>
          </div>

          <div class="form-group">
            <label for="selectProducto">Producto:*</label>
            <select name="selectProducto" id="selectProducto" class="form-control">
              <option value="">Seleccionar...</option>
            </select>
          </div>

          <div class="wrap" id="Cargando_Agregar_Producto" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>

          <div class="form-group">
            <label for="txtMinimo">Minimo:*</label>
            <input type="number" id="txtMinimo" class="form-control" value="0">
          </div>

          <div class="form-group">
            <label for="txtPrecioPublico">Precio Publico:*</label>
            <input type="number" id="txtPrecioPublico" class="form-control" value="0" min="0">
          </div>

          <div class="form-group">
            <label for="">Cantidad Picking:*</label>
            <input type="number" id="txtCantidadPicking" class="form-control" value="0" min="0">
          </div>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="btnGuardarProducto">Agregar</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>