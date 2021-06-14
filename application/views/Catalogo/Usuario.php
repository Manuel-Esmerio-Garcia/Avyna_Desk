<!-- Page Content -->
<br>

<div id="page-wrapper">
 <div class="container-fluid">

 	<div class="col-md-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Usuarios</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <div class="btn-group">
                  <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-wrench"></i></button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a id="Option_Agregar_Usuario">Agregar</a></li>
                    <li><a id="Option_Editar_Usuario">Editar</a></li>
                    <li class="divider"></li>
                    <li><a id="Option_Eliminar_Usuario">Eliminar</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="table-responsive col-lg-12">
                 <table id="Table_Usuario" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Nombre</td>
                        <td>Apellidos</td>
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
                        <!--<td>#</td>-->
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
				 <button class="btn btn-success btn-xs btn-flat" name="Agregar_Usuario" id="Agregar_Usuario"><span class="glyphicon glyphicon-plus"></span></button>
                <button class="btn btn-warning btn-xs btn-flat" name="Editar_Usuario" id="Editar_Usuario"><span class="glyphicon glyphicon-pencil"></span> </button>
                <button class="btn btn-danger btn-xs btn-flat" name="Eliminar_Usuario" id="Eliminar_Usuario"><span class="glyphicon glyphicon-trash"></span></button>
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>

 </div>
</div>

<!-- Modal -->
<div id="myModal_Usuario" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Nuevo Usuario</h4>
      </div>
      <div class="modal-body">

        <div class="container-fluid">
        
        <div class="form-group">
          <label for="txtNombre">Nombre:*</label>
          <input type="text" class="form-control" id="txtNombre">
        </div>

        <div class="form-group">
          <label for="txt_Apellidos">Apellidos:*</label>
          <input type="text" class="form-control" id="txt_Apellidos">
        </div>

        <div class="form-group">
          <label for="txtCalle">Calle:</label>
          <input type="text" class="form-control" id="txtCalle">
        </div>

        <div class="form-group">
          <label for="txtColonia">Colonia:</label>
          <input type="text" class="form-control" id="txtColonia">
        </div>

        <div class="form-group">
          <label for="txtMunicipio">Municipio:</label>
          <input type="text" class="form-control" id="txtMunicipio">
        </div>

        <div class="form-group">
          <label for="txtEstado">Estado:</label>
          <input type="text" class="form-control" id="txtEstado">
        </div>

        <div class="form-group">
          <label for="txtPais">País:</label>
          <input type="text" class="form-control" id="txtPais">
        </div>

        <div class="form-group">
          <label for="txtCP">CP:</label>
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
          <input type="text" class="form-control" id="txtEmail">
        </div>

        <div class="form-group">
          <label for="txtPaswword">Password:*</label>
          <input type="password" class="form-control" id="txtPaswword">
        </div>

        <div class="wrap" id="Cargando_Add" style="display: none;">
          <div class="loading">
            <div class="bounceball"></div>
            <div class="text">&nbsp; &nbsp; Cargando...</div>
          </div>
        </div>

        <div class="form-group">
          <label for="txtPuesto">Puesto:*</label>
          <input type="text" class="form-control" id="txtPuesto">
        </div>

        <div class="form-group">
          <label>Rol:*</label>
          <select class="form-control" name="txtRol" id="txtRol">
            <option value="">Seleccionar...</option>
            <?php foreach ($Rol as $key => $value) { ?>
              <option value="<?php echo $value['ID'] ?>"><?php echo $value['Rol'] ?></option>
            <?php } ?>
          </select>
        </div>

        <div class="col-md-12">

          <div class="form-group">
            <label><input type="checkbox" id="check_Seleccionar_Todos">&nbsp; Seleccionar Todos </label>
          </div>

          <div id="div_Restricciones" style="height: 200px; width: 100%; overflow-y: auto;">
          
            <label><input type="checkbox" id="check_Configuracion">&nbsp; Configuración </label><br>
            <label><input type="checkbox" id="check_Clientes">&nbsp; Clientes </label><br>
            <label><input type="checkbox" id="check_Distribuidores">&nbsp; Distribuidores </label><br>
            <label><input type="checkbox" id="check_Usuarios">&nbsp; Usuarios </label><br>
            <label><input type="checkbox" id="check_Bodega">&nbsp; Bodega </label><br>
            <label><input type="checkbox" id="check_Productos">&nbsp; Productos </label><br>
            <label><input type="checkbox" id="check_Proveedores">&nbsp; Proveedores </label><br>
            <label><input type="checkbox" id="check_Promociones">&nbsp; Promociones </label><br>
            <label><input type="checkbox" id="check_Ventas">&nbsp; Ventas </label><br>
            <label><input type="checkbox" id="check_Compras">&nbsp; Compras </label><br>
            <label><input type="checkbox" id="check_Inventario">&nbsp; Inventario </label><br>
            <label><input type="checkbox" id="check_Editar_Inventario">&nbsp; Editar Inventario </label><br>
            <label><input type="checkbox" id="check_Cuentas_Cobrar">&nbsp; Cuentas Cobrar </label><br>
            <label><input type="checkbox" id="check_Cuentas_Pagar">&nbsp; Cuentas Pagar </label><br>
            <label><input type="checkbox" id="check_Gastos">&nbsp; Gastos </label><br>
            <label><input type="checkbox" id="check_Otras_Salidas">&nbsp; Otras Salidas </label><br>
            <label><input type="checkbox" id="check_Otras_Entradas">&nbsp; Otras Entradas </label><br>
            <label><input type="checkbox" id="check_Usuarios_Pack">&nbsp; Usuarios Pack </label><br>
            <label><input type="checkbox" id="check_Puntos">&nbsp; Puntos </label><br>
            <label><input type="checkbox" id="check_Extracciones">&nbsp; Extracciones </label><br>
            <label><input type="checkbox" id="check_Envios">&nbsp; Envios </label><br>
            <label><input type="checkbox" id="check_Traspasos">&nbsp; Traspasos </label><br>
            <label><input type="checkbox" id="check_Empaques">&nbsp; Empaques </label><br>
            <label><input type="checkbox" id="check_Reportes">&nbsp; Reportes </label><br>
            <label><input type="checkbox" id="check_Paises">&nbsp; Paises </label><br>
            <label><input type="checkbox" id="check_Cajas">&nbsp; Cajas </label><br>
            <label><input type="checkbox" id="check_Factura">&nbsp; Factura </label><br>
            <label><input type="checkbox" id="check_Ticket">&nbsp; Ticket </label><br>
            <label><input type="checkbox" id="check_Empresa">&nbsp; Empresa </label><br>
            <label><input type="checkbox" id="check_HelpDesk">&nbsp; HelpDesk </label><br>
            <label><input type="checkbox" id="check_Estadistica">&nbsp; Estadistica </label><br>

          </div>
        </div>

        <br>

        <div class="form-group col-md-12">
          <br>
          <label style="float: right;"><input type="checkbox" data-toggle="toggle" id="Asignacion_region">&nbsp; Asignación Región </label>
        </div>

        <br>

        <div id="div_Asignacion_Region" style="display: none;">
          <div class="form-group">
            <label for="txtRegion">Región:*</label>
            <div class="input-group">
                <input type="text" class="form-control" id="txtRegion">
                <span class="input-group-addon" id="Add_Region"><i class="fa fa-plus"></i></span>
              </div>
          </div>
        </div>


        <div class="col-md-12 table-responsive" id="Tabla_Asignacion" style="display: none;">
          <table id="Table_Region_Usuario" class="table table-hover table-striped table-bordered table-condensed" width="100%">
            <thead>
              <tr>
                <td>Región</td>
                <td>#</td>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>

        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>

        <button type="button" class="btn btn-primary" style="float: right;" id="btn_Guardar_Usuario">Guardar</button>
      </div>
    </div>

  </div>
</div>





<!-- Modal -->
<div id="myModal_Usuario_Editar" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Usuario</h4>
      </div>
      <div class="modal-body">

        <div class="container-fluid">

          <label style="float: right;"><input type="checkbox" id="check_Status_Editar">&nbsp; Inactivo </label><br>
        
        <div class="form-group">
          <label for="txtNombre_Editar">Nombre:*</label>
          <input type="text" class="form-control" id="txtNombre_Editar">
        </div>

        <div class="form-group">
          <label for="txt_Apellidos_Editar">Apellidos:*</label>
          <input type="text" class="form-control" id="txt_Apellidos_Editar">
        </div>

        <div class="form-group">
          <label for="txtCalle_Editar">Calle:</label>
          <input type="text" class="form-control" id="txtCalle_Editar">
        </div>

        <div class="form-group">
          <label for="txtColonia_Editar">Colonia:</label>
          <input type="text" class="form-control" id="txtColonia_Editar">
        </div>

        <div class="form-group">
          <label for="txtMunicipio_Editar">Municipio:</label>
          <input type="text" class="form-control" id="txtMunicipio_Editar">
        </div>

        <div class="form-group">
          <label for="txtEstado_Editar">Estado:</label>
          <input type="text" class="form-control" id="txtEstado_Editar">
        </div>

        <div class="form-group">
          <label for="txtPais_Editar">País:</label>
          <input type="text" class="form-control" id="txtPais_Editar">
        </div>

        <div class="form-group">
          <label for="txtCP_Editar">CP:</label>
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
          <input type="text" class="form-control" id="txtEmail_Editar">
        </div>

        <div class="form-group">
          <label for="txtPaswword_Editar">Password:*</label>
          <input type="password" class="form-control" id="txtPaswword_Editar">
        </div>

        <div class="wrap" id="Cargando_Add_Editar" style="display: none;">
          <div class="loading">
            <div class="bounceball"></div>
            <div class="text">&nbsp; &nbsp; Cargando...</div>
          </div>
        </div>

        <div class="form-group">
          <label for="txtPuesto_Editar">Puesto:*</label>
          <input type="text" class="form-control" id="txtPuesto_Editar">
        </div>

        <div class="form-group">
          <label>Rol:*</label>
          <select class="form-control" name="txtRol_Editar" id="txtRol_Editar">
            <option value="">Seleccionar...</option>
            <?php foreach ($Rol as $key => $value) { ?>
              <option value="<?php echo $value['ID'] ?>"><?php echo $value['Rol'] ?></option>
            <?php } ?>
          </select>
        </div>

        <div class="col-md-12">

          <div class="form-group">
            <label><input type="checkbox" id="check_Seleccionar_Todos_Editar">&nbsp; Seleccionar Todos </label>
          </div>

          <div id="div_Restricciones_Editar" style="height: 200px; width: 100%; overflow-y: auto;">
          
            <label><input type="checkbox" id="check_Configuracion_Editar">&nbsp; Configuración </label><br>
            <label><input type="checkbox" id="check_Clientes_Editar">&nbsp; Clientes </label><br>
            <label><input type="checkbox" id="check_Distribuidores_Editar">&nbsp; Distribuidores </label><br>
            <label><input type="checkbox" id="check_Usuarios_Editar">&nbsp; Usuarios </label><br>
            <label><input type="checkbox" id="check_Bodega_Editar">&nbsp; Bodega </label><br>
            <label><input type="checkbox" id="check_Productos_Editar">&nbsp; Productos </label><br>
            <label><input type="checkbox" id="check_Proveedores_Editar">&nbsp; Proveedores </label><br>
            <label><input type="checkbox" id="check_Promociones_Editar">&nbsp; Promociones </label><br>
            <label><input type="checkbox" id="check_Ventas_Editar">&nbsp; Ventas </label><br>
            <label><input type="checkbox" id="check_Compras_Editar">&nbsp; Compras </label><br>
            <label><input type="checkbox" id="check_Inventario_Editar">&nbsp; Inventario </label><br>
            <label><input type="checkbox" id="check_Editar_Inventario_Editar">&nbsp; Editar Inventario </label><br>
            <label><input type="checkbox" id="check_Cuentas_Cobrar_Editar">&nbsp; Cuentas Cobrar </label><br>
            <label><input type="checkbox" id="check_Cuentas_Pagar_Editar">&nbsp; Cuentas Pagar </label><br>
            <label><input type="checkbox" id="check_Gastos_Editar">&nbsp; Gastos </label><br>
            <label><input type="checkbox" id="check_Otras_Salidas_Editar">&nbsp; Otras Salidas </label><br>
            <label><input type="checkbox" id="check_Otras_Entradas_Editar">&nbsp; Otras Entradas </label><br>
            <label><input type="checkbox" id="check_Usuarios_Pack_Editar">&nbsp; Usuarios Pack </label><br>
            <label><input type="checkbox" id="check_Puntos_Editar">&nbsp; Puntos </label><br>
            <label><input type="checkbox" id="check_Extracciones_Editar">&nbsp; Extracciones </label><br>
            <label><input type="checkbox" id="check_Envios_Editar">&nbsp; Envios </label><br>
            <label><input type="checkbox" id="check_Traspasos_Editar">&nbsp; Traspasos </label><br>
            <label><input type="checkbox" id="check_Empaques_Editar">&nbsp; Empaques </label><br>
            <label><input type="checkbox" id="check_Reportes_Editar">&nbsp; Reportes </label><br>
            <label><input type="checkbox" id="check_Paises_Editar">&nbsp; Paises </label><br>
            <label><input type="checkbox" id="check_Cajas_Editar">&nbsp; Cajas </label><br>
            <label><input type="checkbox" id="check_Factura_Editar">&nbsp; Factura </label><br>
            <label><input type="checkbox" id="check_Ticket_Editar">&nbsp; Ticket </label><br>
            <label><input type="checkbox" id="check_Empresa_Editar">&nbsp; Empresa </label><br>
            <label><input type="checkbox" id="check_HelpDesk_Editar">&nbsp; HelpDesk </label><br>
            <label><input type="checkbox" id="check_Estadistica_Editar">&nbsp; Estadistica </label><br>

          </div>
        </div>

        <br>

        <div class="form-group col-md-12">
          <br>
          <label style="float: right;"><input type="checkbox" data-toggle="toggle" id="Asignacion_region_Editar">&nbsp; Asignación Región </label>
        </div>

        <br>

        <div id="div_Asignacion_Region_Editar" style="display: none;">
          <div class="form-group">
            <label for="txtRegion_Editar">Región:*</label>
            <div class="input-group">
                <input type="text" class="form-control" id="txtRegion_Editar">
                <span class="input-group-addon" id="Add_Region_Editar"><i class="fa fa-plus"></i></span>
              </div>
          </div>
        </div>


        <div class="col-md-12 table-responsive" id="Tabla_Asignacion_Editar" style="display: none;">
          <table id="Table_Region_Usuario_Editar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
            <thead>
              <tr>
                <td>Región</td>
                <td>#</td>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>

        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>

        <button type="button" class="btn btn-warning" style="float: right;" id="btn_Guardar_Usuario_Editar">Guardar Cambios</button>
      </div>
    </div>

  </div>
</div>