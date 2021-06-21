<!-- Page Content -->
<br>

<div id="page-wrapper">
 <div class="container-fluid">

    <ul class="nav nav-tabs">
      <li class="active"><a data-toggle="tab" href="#home">Productos</a></li>
      <li><a data-toggle="tab" href="#menu1">Configuración</a></li>
    </ul>

     <div class="wrap" id="Cargando" style="display: none;">
      <div class="loading">
        <div class="bounceball"></div>
        <div class="text">&nbsp; &nbsp; Cargando...</div>
      </div>
    </div>

    <div class="tab-content">
      <div id="home" class="tab-pane fade in active">
        <br>

        <div class="col-md-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Listado de Productos</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <div class="btn-group">
                  <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-wrench"></i></button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a id="Option_Agregar_Productos">Agregar</a></li>
                    <li><a id="Option_Editar_Productos">Editar</a></li>
                    <li class="divider"></li>
                    <li><a id="Option_Eliminar_Productos">Eliminar</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="table-responsive col-lg-12">
                 <table id="Table_Productos" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Codigo</td>
                        <td>Producto</td>
                        <td>Proveedor</td>
                        <td>Marca</td>
                        <td>División</td>
                        <td>Linea</td>
                        <td>Sublinea</td>
                        <td>Descripción</td>
                        <td>Volumen</td>
                        <td>Peso</td>
                        <td>MI</td>
                        <td>Pieza Caja</td>
                        <td>Distribuidor</td>
                        <td>Salon</td>
                        <td>Publico</td>
                        <!--<td>Imagen</td>-->
                        <td>Clave Unidad</td>
                        <td>Clave Producto</td>
                        <td>Status</td>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
              </div>
            </div>
            <!-- ./box-body -->
            <div class="box-footer">
                <button class="btn btn-success" name="Agregar_Productos" id="Agregar_Productos"><span class="glyphicon glyphicon-plus"></span></button>
                <button class="btn btn-warning" name="Editar_Productos" id="Editar_Productos"><span class="glyphicon glyphicon-pencil"></span> </button>
                <button class="btn btn-danger" name="Eliminar_Productos" id="Eliminar_Productos"><span class="glyphicon glyphicon-trash"></span></button>

                <button class="btn btn-success" id="btnExportar" style="float: right;">Exportar CSV  <span class="glyphicon glyphicon-download"></span></button>
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>
      </div>

      <div id="menu1" class="tab-pane fade">
        <br>
        <div class="col-md-6">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Marcas</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <div class="btn-group">
                  <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-wrench"></i></button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a id="Option_Agregar_Marca">Agregar</a></li>
                    <li><a id="Option_Editar_Marca">Editar</a></li>
                    <li class="divider"></li>
                    <li><a id="Option_Eliminar_Marca">Eliminar</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="table-responsive col-lg-12">
                 <table id="Table_Marcas" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Marca</td>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
              </div>
            </div>
            <!-- ./box-body -->
            <div class="box-footer">
                <button class="btn btn-success btn-xs btn-flat" name="Agregar_Marca" id="Agregar_Marca"><span class="glyphicon glyphicon-plus"></span></button>
                <button class="btn btn-warning btn-xs btn-flat" name="Editar_Marca" id="Editar_Marca"><span class="glyphicon glyphicon-pencil"></span> </button>
                <button class="btn btn-danger btn-xs btn-flat" name="Eliminar_Marca" id="Eliminar_Marca"><span class="glyphicon glyphicon-trash"></span></button>
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>

        <div class="col-md-6">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Divisiones</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <div class="btn-group">
                  <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-wrench"></i></button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a id="Option_Agregar_Division">Agregar</a></li>
                    <li><a id="Option_Editar_Division">Editar</a></li>
                    <li class="divider"></li>
                    <li><a id="Option_Eliminar_Division">Eliminar</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="table-responsive col-lg-12">
                  <table id="Table_Division" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>División</td>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
              </div>
            </div>
            <!-- ./box-body -->
            <div class="box-footer">
                <button class="btn btn-success btn-xs btn-flat" name="Agregar_Division" id="Agregar_Division"><span class="glyphicon glyphicon-plus"></span></button>
                <button class="btn btn-warning btn-xs btn-flat" name="Editar_Division" id="Editar_Division"><span class="glyphicon glyphicon-pencil"></span> </button>
                <button class="btn btn-danger btn-xs btn-flat" name="Eliminar_Division" id="Eliminar_Division"><span class="glyphicon glyphicon-trash"></span></button>
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>

        <div class="col-md-6">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Lineas</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <div class="btn-group">
                  <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-wrench"></i></button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a id="Option_Agregar_Linea">Agregar</a></li>
                    <li><a id="Option_Editar_Linea">Editar</a></li>
                    <li class="divider"></li>
                    <li><a id="Option_Eliminar_Linea">Eliminar</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="table-responsive col-lg-12">
                  <table id="Table_Lineas" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Linea</td>
                        <td>Division</td>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
              </div>
            </div>
            <!-- ./box-body -->
            <div class="box-footer">
                <button class="btn btn-success btn-xs btn-flat" name="Agregar_Linea" id="Agregar_Linea"><span class="glyphicon glyphicon-plus"></span></button>
                <button class="btn btn-warning btn-xs btn-flat" name="Editar_Linea" id="Editar_Linea"><span class="glyphicon glyphicon-pencil"></span> </button>
                <button class="btn btn-danger btn-xs btn-flat" name="Eliminar_Linea" id="Eliminar_Linea"><span class="glyphicon glyphicon-trash"></span></button>
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>

        <div class="col-md-6">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Sublineas</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <div class="btn-group">
                  <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-wrench"></i></button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a id="Option_Agregar_Sublinea">Agregar</a></li>
                    <li><a id="Option_Editar_Sublinea">Editar</a></li>
                    <li class="divider"></li>
                    <li><a id="Option_Eliminar_Sublinea">Eliminar</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="table-responsive col-lg-12">
                  <table id="Table_Sublinea" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Sublinea</td>
                        <td>Linea</td>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
              </div>
            </div>
            <!-- ./box-body -->
            <div class="box-footer">
                <button class="btn btn-success btn-xs btn-flat" name="Agregar_Sublinea" id="Agregar_Sublinea"><span class="glyphicon glyphicon-plus"></span></button>
                <button class="btn btn-warning btn-xs btn-flat" name="Editar_Sublinea" id="Editar_Sublinea"><span class="glyphicon glyphicon-pencil"></span> </button>
                <button class="btn btn-danger btn-xs btn-flat" name="Eliminar_Sublinea" id="Eliminar_Sublinea"><span class="glyphicon glyphicon-trash"></span></button>
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>

      </div>
    </div>

 </div>
</div>

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" style="background-color: #367fa9; color: white;">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Agregar Productos</h4>
      </div>
      <div class="modal-body">

        <div class="container-fluid">


          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="checkbox" style="float: right;">
              <label><input type="checkbox" id="checkStatus">Inactivo</label>
            </div>
          </div>

          <div class="form-group">
            <label for="txtidNetsuite">idNetsuite:*</label>
            <input type="text" id="txtidNetsuite" class="form-control">
          </div>

          <div class="form-group">
            <label for="txt_Codigo">Codigo:*</label>
            <input type="text" id="txt_Codigo" class="form-control">
          </div>

          <div class="form-group">
            <label>Codigo Caja: *</label>
            <input type="text" id="txt_Codigo_Caja" class="form-control">
          </div>

          <div class="form-group">
            <label for="select_Proveedor">Proveedor:</label>
            <select class="form-control" id="select_Proveedor">
              <option value="">Seleccionar...</option>
            </select>
          </div>

          <div class="form-group">
            <label for="txt_Producto">Producto:*</label>
            <input type="text" id="txt_Producto" class="form-control">
          </div>

          <div class="form-group">
            <label for="select_Marca">Marca:*</label>
            <select class="form-control" id="select_Marca">
              <option value="">Seleccionar...</option>
            </select>
          </div>

          <div class="form-group">
            <label for="select_Division">División:*</label>
            <select class="form-control" id="select_Division">
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
            <label for="select_Linea">Linea:*</label>
            <select class="form-control" id="select_Linea">
              <option value="">Seleccionar...</option>
            </select>
          </div>

          <div class="form-group">
            <label for="select_Sublinea">Sublinea:*</label>
            <select class="form-control" id="select_Sublinea">
              <option value="">Seleccionar...</option>
            </select>
          </div>

           <div class="form-group">
            <label for="txt_Descripcion">Descripción:*</label>
            <textarea  id="txt_Descripcion" class="form-control" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label for="txt_Volumen">Volumen:</label>
            <input type="number" id="txt_Volumen" min="0" class="form-control">
          </div>

          <div class="form-group">
            <label for="txt_Peso">Peso:</label>
            <input type="text" id="txt_Peso" class="form-control">
          </div>

          <div class="form-group">
            <label for="txt_Ml">Ml*:</label>
            <input type="number" id="txt_Ml" class="form-control" min="0" value="0">
          </div>

          <div class="form-group">
            <label for="txt_Pieza_Caja">Piezas Caja:</label>
            <input type="number" id="txt_Pieza_Caja" class="form-control" min="0" value="0">
          </div>

          <div class="form-group">
            <label>Cantidad Por Caja:*</label>
            <input type="number" id="txt_Cantidad_Caja" class="form-control" min="1">
            <p class="help-block">Debe de ser mayor a 0.</p>
          </div>

          <div class="form-group">
            <label for="txt_Minimo_Produccion">Minimo Producción:*</label>
            <input type="number" id="txt_Minimo_Produccion" class="form-control" min="0" value="0">
          </div>

          <div class="form-group">
            <label for="txt_Minimo_Inventario">Minimo Inventario Default:*</label>
            <input type="number" id="txt_Minimo_Inventario" class="form-control" min="0" value="0">
          </div>

          <div class="form-group">
            <label for="txt_ClaveSAT">Clave Producto/Servicio SAT:*<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Escribe la clave completa. Usa la herramienta para identificarla." title=""></span></label>
            <input type="text" id="txt_ClaveSAT" class="form-control" value="53131602" readonly>
          </div>

          <div class="form-group">
            <label for="txt_Unidad_SAT">Unidad de Medida SAT:*<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Escribe la clave completa. Usa la herramienta para identificarla." title=""></span></label>
            <input type="text" id="txt_Unidad_SAT" class="form-control" value="H87" readonly>
          </div>

          <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: center; margin-top: 15px;">
            <div class="form-group">
                  <div class="alert alert-warning alert-dismissible fade in">
                      <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>
                      <i class="fa fa-info" aria-hidden="true"></i><strong> Ayuda!</strong> Buscador de claves del SAT para unidades de medida y descripciónes de Productos.<br>
                      <a target="_blank" href="http://200.57.3.89/PyS/catPyS.aspx">Buscador...</a>
                    </div>
            </div>
          </div>

          <div class="col-lg-12">
            <div class="col-lg-4">
              <div class="checkbox">
                <label><input type="checkbox" id="checkDistribuidor" value="0">Distribuidor</label>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="checkbox">
                <label><input type="checkbox" id="checkSalon" value="0">Salon</label>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="checkbox">
                <label><input type="checkbox" id="checkPublico" value="0">Publico</label>
              </div>
            </div>
          </div>

          <div class="col-lg-12">
            <hr>
          </div>

          <div class="form-group" style="display: none;">
              <label for="txt_Imagen">Imagen:</label>
              <input type="file" id="txt_Imagen" accept="image/*">

              <p class="help-block">Seleccione la imagen del producto.</p>
          </div>

          <div class="form-group">
            <p style="float: right;">* Campos Obligatorios</p>
          </div>

          
    
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-primary" style="float: right;" id="btn_Nuevo_Producto">Guardar</button>
      </div>
    </div>

  </div>
</div>


<!-- Modal -->
<div id="myModal_Editar" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" style="background-color: #e08e0b; color: white;">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Productos</h4>
      </div>
      <div class="modal-body">

        <div class="container-fluid">

          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="checkbox" style="float: right;">
              <label><input type="checkbox" id="checkStatus_Editar">Inactivo</label>
            </div>
          </div>

          <div class="form-group">
            <label for="txtidNetsuiteEditar">idNetsuite:*</label>
            <input type="text" id="txtidNetsuiteEditar" class="form-control">
          </div>

          <div class="form-group">
            <label for="txt_Codigo">Codigo:*</label>
            <input type="text" id="txt_Codigo_Editar" class="form-control">
          </div>

          <div class="form-group">
            <label>Codigo Caja: *</label>
            <input type="text" id="txt_Codigo_Caja_Editar" class="form-control">
          </div>

          <div class="form-group">
            <label for="select_Proveedor_Editar">Proveedor:</label>
            <select class="form-control" id="select_Proveedor_Editar">
              <option value="">Seleccionar...</option>
            </select>
          </div>

          <div class="form-group">
            <label for="txt_Producto_Editar">Producto:*</label>
            <input type="text" id="txt_Producto_Editar" class="form-control">
          </div>

          <div class="form-group">
            <label for="select_Marca_Editar">Marca:*</label>
            <select class="form-control" id="select_Marca_Editar">
              <option value="">Seleccionar...</option>
            </select>
          </div>

          <div class="form-group">
            <label for="select_Division_Editar">División:*</label>
            <select class="form-control" id="select_Division_Editar">
              <option value="">Seleccionar...</option>
            </select>
          </div>


          <div class="wrap" id="Cargando_Editar_Producto" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>

          <div class="form-group">
            <label for="select_Linea_Editar">Linea:*</label>
            <select class="form-control" id="select_Linea_Editar">
              <option value="">Seleccionar...</option>
            </select>
          </div>

          <div class="form-group">
            <label for="select_Sublinea_Editar">Sublinea:*</label>
            <select class="form-control" id="select_Sublinea_Editar">
              <option value="">Seleccionar...</option>
            </select>
          </div>

           <div class="form-group">
            <label for="txt_Descripcion_Editar">Descripción:*</label>
            <textarea  id="txt_Descripcion_Editar" class="form-control" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label for="txt_Volumen_Editar">Volumen:</label>
            <input type="number" id="txt_Volumen_Editar" min="0" class="form-control">
          </div>

          <div class="form-group">
            <label for="txt_Peso_Editar">Peso:</label>
            <input type="text" id="txt_Peso_Editar" class="form-control">
          </div>

          <div class="form-group">
            <label for="txt_Ml_Editar">Ml*:</label>
            <input type="number" id="txt_Ml_Editar" class="form-control" min="0" value="0">
          </div>

          <div class="form-group">
            <label for="txt_Pieza_Caja_Editar">Piezas Caja:</label>
            <input type="number" id="txt_Pieza_Caja_Editar" class="form-control" min="0" value="0">
          </div>

          <div class="form-group">
            <label>Cantidad Por Caja: *</label>
            <input type="number" id="txt_Cantidad_Caja_Editar" class="form-control">
            <p class="help-block">Debe de ser mayor a 0.</p>
          </div>

          <div class="form-group">
            <label for="txt_Minimo_Produccion_Editar">Minimo Producción:*</label>
            <input type="number" id="txt_Minimo_Produccion_Editar" class="form-control" min="0" value="0">
          </div>

          <div class="form-group">
            <label for="txt_Minimo_Inventario_Editar">Minimo Inventario Default:*</label>
            <input type="number" id="txt_Minimo_Inventario_Editar" class="form-control" min="0" value="0">
          </div>

          <div class="form-group">
            <label for="txt_ClaveSAT_Editar">Clave Producto/Servicio SAT:*<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Escribe la clave completa. Usa la herramienta para identificarla." title=""></span></label>
            <input type="text" id="txt_ClaveSAT_Editar" class="form-control" value="53131602" readonly>
          </div>

          <div class="form-group">
            <label for="txt_Unidad_SAT_Editar">Unidad de Medida SAT:*<span class="glyphicon glyphicon-question-sign left2px" data-toggle="tooltip" data-placement="top" data-original-title="Escribe la clave completa. Usa la herramienta para identificarla." title=""></span></label>
            <input type="text" id="txt_Unidad_SAT_Editar" class="form-control" value="H87" readonly>
          </div>

          <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: center; margin-top: 15px;">
            <div class="form-group">
                  <div class="alert alert-warning alert-dismissible fade in">
                      <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>
                      <i class="fa fa-info" aria-hidden="true"></i><strong> Ayuda!</strong> Buscador de claves del SAT para unidades de medida y descripciónes de Productos.<br>
                      <a target="_blank" href="http://200.57.3.89/PyS/catPyS.aspx">Buscador...</a>
                    </div>
            </div>
          </div>

          <div class="col-lg-12">
            <div class="col-lg-4">
              <div class="checkbox">
                <label><input type="checkbox" id="checkDistribuidor_Editar" value="0">Distribuidor</label>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="checkbox">
                <label><input type="checkbox" id="checkSalon_Editar" value="0">Salon</label>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="checkbox">
                <label><input type="checkbox" id="checkPublico_Editar" value="0">Publico</label>
              </div>
            </div>
          </div>

          <div class="form-group" style="display: none;">
              <label for="txt_Imagen_Editar">Imagen:</label>
              <input type="file" id="txt_Imagen_Editar" accept="image/*">

              <p class="help-block">Seleccione la imagen del producto.</p>
          </div>
    
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-warning" style="float: right;" id="btn_Editar_Producto">Guardar Cambios</button>
      </div>
    </div>

  </div>
</div>

<!-- Modal -->
<div id="Modal_Marca_Marca" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" style="background-color: #367fa9; color: white;">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Nueva Marca</h4>
      </div>
      <div class="modal-body">
          <div class="form-group">
            <label for="txt_Marca">Marca:*</label>
            <input type="text" id="txt_Marca" class="form-control">
          </div>


          <div class="wrap" id="Cargando_Agregar_Marca" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-primary" style="float: right;" id="btn_Guardar_Marca">Guardar</button>
      </div>
    </div>

  </div>
</div>


<!-- Modal -->
<div id="Modal_Marca_Marca_Editar" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" style="background-color: #e08e0b; color: white;">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Marca</h4>
      </div>
      <div class="modal-body">
          <div class="form-group">
            <label for="txt_Marca_Editar">Marca:*</label>
            <input type="text" id="txt_Marca_Editar" class="form-control">
          </div>


          <div class="wrap" id="Cargando_Agregar_Marca_Editar" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-primary" style="float: right;" id="btn_Guardar_Marca_Editar">Guardar</button>
      </div>
    </div>

  </div>
</div>


<!-- Modal -->
<div id="Modal_Division" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" style="background-color: #367fa9; color: white;">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Nueva División</h4>
      </div>
      <div class="modal-body">
          <div class="form-group">
            <label for="txt_Division">División:*</label>
            <input type="text" id="txt_Division" class="form-control">
          </div>


          <div class="wrap" id="Cargando_Agregar_Division" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-primary" style="float: right;" id="btn_Guardar_Division">Guardar</button>
      </div>
    </div>

  </div>
</div>


<!-- Modal -->
<div id="Modal_Division_Editar" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" style="background-color: #e08e0b; color: white;">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar División</h4>
      </div>
      <div class="modal-body">
          <div class="form-group">
            <label for="txt_Division_Editar">División:*</label>
            <input type="text" id="txt_Division_Editar" class="form-control">
          </div>


          <div class="wrap" id="Cargando_Editar_Division" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-primary" style="float: right;" id="btn_Guardar_Division_Editar">Guardar</button>
      </div>
    </div>

  </div>
</div>

<!-- Modal -->
<div id="Modal_Linea" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" style="background-color: #367fa9; color: white;">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Nueva Linea</h4>
      </div>
      <div class="modal-body">

          <div class="form-group">
            <label for="select_Division_Agregar_Linea">División:*</label>
            <select class="form-control" id="select_Division_Agregar_Linea">
              <option value="">Seleccionar...</option>
            </select>
          </div>

          <div class="form-group">
            <label for="txt_Linea">Linea:*</label>
            <input type="text" id="txt_Linea" class="form-control">
          </div>


          <div class="wrap" id="Cargando_Agregar_Linea" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-primary" style="float: right;" id="btn_Guardar_Linea">Guardar</button>
      </div>
    </div>

  </div>
</div>

<!-- Modal -->
<div id="Modal_Linea_Editar" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" style="background-color: #e08e0b; color: white;">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Linea</h4>
      </div>
      <div class="modal-body">

          <div class="form-group">
            <label for="select_Division_Editar_Linea">División:*</label>
            <select class="form-control" id="select_Division_Editar_Linea">
              <option value="">Seleccionar...</option>
            </select>
          </div>

          <div class="form-group">
            <label for="txt_Linea_Editar">Linea:*</label>
            <input type="text" id="txt_Linea_Editar" class="form-control">
          </div>


          <div class="wrap" id="Cargando_Editar_Linea" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-primary" style="float: right;" id="btn_Guardar_Linea_Editar">Guardar</button>
      </div>
    </div>

  </div>
</div>



<!-- Modal -->
<div id="Modal_Sublinea" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" style="background-color: #367fa9; color: white;">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Nueva Sublinea</h4>
      </div>
      <div class="modal-body">

          <div class="form-group">
            <label for="select_Linea_Agregar_Linea">Linea:*</label>
            <select class="form-control" id="select_Linea_Agregar_Linea">
              <option value="">Seleccionar...</option>
            </select>
          </div>

          <div class="form-group">
            <label for="txt_Sublinea">Sublinea:*</label>
            <input type="text" id="txt_Sublinea" class="form-control">
          </div>


          <div class="wrap" id="Cargando_Agregar_Sublinea" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-primary" style="float: right;" id="btn_Guardar_Sublinea">Guardar</button>
      </div>
    </div>

  </div>
</div>

<!-- Modal -->
<div id="Modal_Sublinea_Editar" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" style="background-color: #e08e0b; color: white;">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Sublinea</h4>
      </div>
      <div class="modal-body">

          <div class="form-group">
            <label for="select_Linea_Editar_Linea">Linea:*</label>
            <select class="form-control" id="select_Linea_Editar_Linea">
              <option value="">Seleccionar...</option>
            </select>
          </div>

          <div class="form-group">
            <label for="txt_Sublinea_Editar">Sublinea:*</label>
            <input type="text" id="txt_Sublinea_Editar" class="form-control">
          </div>


          <div class="wrap" id="Cargando_Editar_Sublinea" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>
        <button type="button" class="btn btn-primary" style="float: right;" id="btn_Guardar_Sublinea_Editar">Guardar</button>
      </div>
    </div>

  </div>
</div>