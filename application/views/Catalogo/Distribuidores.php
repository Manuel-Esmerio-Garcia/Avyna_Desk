<br>
<div id="dealer">
  <loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true" :z-index="9999"></loading>
  <div class="container-fluid">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Distribuidores</h3>
          <div class="box-tools pull-right">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body">
          <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <table id="fetchDistribuidores" class="table table-hover table-striped table-bordered table-condensed" width="100%">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Nombre</td>
                  <td>Apellidos</td>
                  <td>Empresa</td>
                  <td>Alias</td>
                  <td>Coordinador</td>
                  <td>Director</td>
                  <td>Cargo</td>
                  <td>Calle Numero</td>
                  <td>Colonia</td>
                  <td>Ciudad</td>
                  <td>Municipio</td>
                  <td>Estado</td>
                  <td>País</td>
                  <td>CP</td>
                  <td>RFC</td>
                  <td>Tel1</td>
                  <td>Tel2</td>
                  <td>Email</td>
                  <td>Status</td>
                  <td>Descuento</td>
                  <td>Dia Entrega</td>
                  <td>Región</td>
                  <td>Bodega</td>
                  <td>Cuota</td>
                  <td>Fecha Ingreso</td>
                  <td>Clientes x dia</td>
                  <td>Bloque</td>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
        <div class="box-footer">
          <?php if (is_int(array_search('Distribuidores_agregar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
				    <button type="button" class="btn btn-success" id="btnAgregarDistri"><span class="glyphicon glyphicon-plus"></span></button>
            <button type="button" class="btn btn-success" id="loadingAgregarDistri" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
          <?php endif ?>
          <?php if (is_int(array_search('Distribuidores_editar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
            <button type="button" class="btn btn-warning" id="btnEditarDistri"><span class="glyphicon glyphicon-pencil"></span> </button>
            <button type="button" class="btn btn-warning" id="loadingEditarDistri" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
          <?php endif ?>
          <?php if (is_int(array_search('Distribuidores_eliminar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
            <button type="button" class="btn btn-danger"  id="btnEliminarDistri"><span class="glyphicon glyphicon-trash"></span></button>
            <button type="button" class="btn btn-danger" id="loadingEliminarDistri" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
          <?php endif ?>

          <!--<button class="btn btn-default" style="float: right;" @click="_openModalUnificar">Unificar Cliente</button>-->
        </div>
      </div>
    </div>

    
    <!-- Tabla de Direcciones de envio -->
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Direcciones de envio</h3>
          <div class="box-tools pull-right">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body">
          <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <table id="fetchDireccionEnvio" class="table table-hover table-striped table-bordered table-condensed" width="100%">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Calle</td>
                  <td>Numero Ext.</td>
                  <td>Numero Int.</td>
                  <td>Pais</td>
                  <td>Estado</td>
                  <td>Municipio</td>
                  <td>Ciudad</td>
                  <td>Colonia</td>
                  <td>CP</td>
                  <td>Contacto</td>
                  <td>Empresa</td>
                  <td>Tel</td>
                  <td>Celular</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
        <div class="box-footer">
          <?php if (is_int(array_search('Distribuidores_direccion_agregar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
            <button type="button" class="btn btn-success" id="btnAgregarDireccion"><span class="glyphicon glyphicon-plus"></span></button>
            <button type="button" class="btn btn-success" id="loadingAgregarDireccion" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
          <?php endif ?>
          <?php if (is_int(array_search('Distribuidores_direccion_editar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
            <button type="button" class="btn btn-warning" id="btnEditarDireccion"><span class="glyphicon glyphicon-pencil"></span> </button>
            <button type="button" class="btn btn-warning" id="loadingEditarDireccion" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
          <?php endif ?>
          <?php if (is_int(array_search('Distribuidores_direccion_eliminar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
            <button type="button" class="btn btn-danger"  id="btnEliminarDireccion"><span class="glyphicon glyphicon-trash"></span></button>
            <button type="button" class="btn btn-danger" id="loadingEliminarDireccion" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
          <?php endif ?>
        </div>
      </div>
    </div>

    <!-- Modal Agregar Distribuidor -->
    <div id="modalAgregarDistri" class="modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Nuevo Distribuidor</h4>
          </div>
          <div class="modal-body">

            <div class="checkbox form-group col-lg-12 col-md-12 col-sm-12 col-xm-12">
              <label style="float: right;"><input type="checkbox" id="check_Envio_Local" checked="checked">Envío Paqueteria &nbsp;</label>
              <label style="float: right;"><input type="checkbox" id="check_Generar_Puntos">Generar Puntos &nbsp;</label>
              <label style="float: right;"><input type="checkbox" id="check_Facturacion" checked="checked">Facturación &nbsp;</label>
              <label style="float: right;"><input type="checkbox" id="check_Minimo_Compra" checked="checked">Minimo Compra &nbsp;</label>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtNombre">Nombre:*</label>
              <input type="text" class="form-control" id="txtNombre">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtApellidos">Apellidos:*</label>
              <input type="text" class="form-control" id="txtApellidos">
            </div>

            <div class="form-group col-lg-4 col-md-4 col-sm-12 col-xm-12">
              <label for="txtAlias">Alias:</label>
              <input type="text" class="form-control" id="txtAlias">
            </div>

            <div class="form-group col-lg-4 col-md-4 col-sm-12 col-xm-12">
              <label for="txtCoordinador">Coordinador:</label>
              <input type="text" class="form-control" id="txtCoordinador">
            </div>

            <div class="form-group col-lg-4 col-md-4 col-sm-12 col-xm-12">
              <label for="txtDirector">Director:</label>
              <input type="text" class="form-control" id="txtDirector">
            </div>
            
            <!-- Dirección del Distribuidor -->
            <div class="col-md-12 col-lg-12">
              <p style="color: #867e7e;">Dirección del Distribuidor</p>
              <hr>
            </div>

            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <label for="txtCP">CP:</label>
              <input type="number" class="form-control" id="txtCP" maxlength="5">
            </div>

            <!--<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <label for="txtColonia">Colonia:</label>
              <select name="txtColonia" id="txtColonia" class="form-control">
              </select>
            </div>-->
            
            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <label for="txtColonia">Colonia:</label>
              <input list="txtColonia" name="txtColonia" class="form-control txtColonia" type="text" placeholder="Elige una colonia">
              <datalist id="txtColonia">
              </datalist>
            </div>

            <!--<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <label for="txtColonia">Colonia:</label>
              <input type="text" name="txtColonia" id="txtColonia" class="form-control">
            </div>-->

            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <label for="txtEstado">Estado:</label>
              <input type="text" class="form-control" id="txtEstado">
            </div>
            
            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <label for="txtPais">País:</label>
              <input type="text" class="form-control" id="txtPais">
            </div>

            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <label for="txtMunicipio">Municipio:</label>
              <input type="text" class="form-control" id="txtMunicipio">
            </div>

            <div class="form-group col-lg-4 col-md-4 col-sm-12 col-xm-12">
              <label for="txtCiudad">Ciudad:</label>
              <input type="text" class="form-control" id="txtCiudad">
            </div>
            
            <div class="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <label for="txtCalle">Calle:</label>
              <input type="text" class="form-control" id="txtCalle">
            </div>

            <!-- Información de la Empresa -->
            <div class="col-md-12 col-lg-12">
              <p style="color: #867e7e;">Información de la Empresa (Distribuidor)</p>
              <hr>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtEmpresa">Empresa (Razón Social):</label>
              <input type="text" class="form-control" id="txtEmpresa">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtRFC">RFC:*</label>
              <input type="text" class="form-control" id="txtRFC" oninput="validarInput(this)">
              <pre id="resultado"></pre>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtCargo">Cargo:</label>
              <input type="text" class="form-control" id="txtCargo">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="select_Sucursal">Sucursal:*</label>
              <select id="select_Sucursal" class="form-control">
                <option value="">Seleccionar...</option>
                <?php foreach ($Bodega as $key => $value) { ?>
                  <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
                <?php } ?>
              </select>
            </div>

            <!-- Información del Distribuidor -->
            <div class="col-md-12 col-lg-12">
              <p style="color: #867e7e;">Información del Distribuidor</p>
              <hr>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtTel1">Telefono 1:</label>
              <input type="number" class="form-control" id="txtTel1" maxlength="10">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtTel2">Telefono 2:</label>
              <input type="number" class="form-control" id="txtTel2" maxlength="10">
            </div>

            <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xm-12">
              <label for="txtEmail">Email:</label>
              <input type="Email" class="form-control" id="txtEmail" autocomplete="off">
            </div>

            <!-- Configuración del Distribuidor -->
            <div class="col-md-12 col-lg-12">
              <p style="color: #867e7e;">Configuración del Distribuidor</p>
              <hr>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtDescuento">Descuento:</label>
              <div class="input-group">
                <input type="number" class="form-control" id="txtDescuento" min="0" max="100">
                <span class="input-group-addon">%</span>
              </div>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="select_Entrega">Dia de Entrega:*</label>
              <select id="select_Entrega" class="form-control">
                <option value="">Seleccionar...</option>
                <option value="LUN">Lunes</option>
                <option value="MAR">Martes</option>
                <option value="MIE">Miercoles</option>
                <option value="JUE">Jueves</option>
                <option value="VIE">Viernes</option>
                <option value="SAB">Sabado</option>
                <option value="DOM">Domingo</option>
              </select>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtRegion">Región</label>
              <input type="text" class="form-control" id="txtRegion">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtZona">Zona:</label>
              <input type="text" class="form-control" id="txtZona">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="select_Idioma">Idioma:*</label>
              <select id="select_Idioma" class="form-control">
                <option value="">Seleccionar...</option>
                <option value="ES">Español</option>
                <option value="EN">Inglés</option>
              </select>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtImpuesto">Impuesto:</label>
              <div class="input-group">
                <input type="number" class="form-control" id="txtImpuesto" min="0" max="100">
                <span class="input-group-addon">%</span>
              </div>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtMinimoEnvio">Minimo Envio:</label>
              <input type="number" class="form-control" id="txtMinimoEnvio">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="select_Bloque">Bloque:*</label>
              <select id="select_Bloque" class="form-control">
                <option value="">Seleccionar...</option>
                <?php foreach ($Bloque as $key => $value) { ?>
                  <option value="<?php echo $value['ID'] ?>"><?php echo $value['Bloque'] ?></option>
                <?php } ?>
              </select>
            </div>

            <!-- Configuración de Cuotas -->
            <div class="col-md-12 col-lg-12">
              <p style="color: #867e7e;">Configuración de Cuotas</p>
              <hr>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtCuota">Cuota:</label>
              <input type="number" class="form-control" id="txtCuota" value="0" readonly="readonly">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtCuota_Inicial">Cuota Inicial:</label>
              <input type="number" class="form-control" id="txtCuota_Inicial" value="0">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtCuota_Final">Cuota Final:</label>
              <input type="number" class="form-control" id="txtCuota_Final" value="0">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtMeses_Cuota">Meses para llegar a la cuota:</label>
              <input type="number" class="form-control" id="txtMeses_Cuota" value="0">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtMeses_Actuales">Meses Actuales:</label>
              <input type="number" class="form-control" id="txtMeses_Actuales" value="0">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtClientes_x_dia">Clientes Por Dia:</label>
              <input type="number" class="form-control" id="txtClientes_x_dia" value="0" min="0">
            </div>

            <div class="form-group input-daterange col-lg-12 col-md-12 col-sm-12 col-xm-12">
              <label>Banderazo:</label>
              <input type="text" class="form-control" id="txtBanderazo" autocomplete="off">
            </div>

            <!-- Administrador de Contraseñas -->
            <div class="col-md-12 col-lg-12">
              <p style="color: #867e7e;">Administrador de Contraseñas</p>
              <hr>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label for="txtPaswword">Contraseña:*</label>
              <input type="password" class="form-control" id="txtPaswword" autocomplete="off">
              <span class="help-block" id="validatePassword" style="display: none;">La contraseña no coicide.</span>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label for="txtConfirmacion">Confirmación:*</label>
              <input type="password" class="form-control" id="txtConfirmacion" autocomplete="off">
              <span class="help-block" id="validateConfirmacion" style="display: none;">La contraseña no coicide.</span>
            </div>

            <!-- Restricciones de División -->
            <div class="col-md-12 col-lg-12">
              <p style="color: #867e7e;">Restricciones de División</p>
              <hr>
            </div>

            <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xm-12">
              <label for="selectDivision">División:</label>
              <select id="selectDivision" class="form-control">
                <option value="">Seleccionar...</option>
                <?php foreach ($Division as $key => $value) { ?>
                  <option value="<?php echo $value['ID'] ?>"><?php echo $value['Division'] ?></option>
                <?php } ?>
              </select>

              <button type="button" class="btn btn-success btn-xs" id="btnAgregarDivision"><span class="glyphicon glyphicon-plus"></span></button>
              <button type="button" class="btn btn-success btn-xs" id="loadingAgregarDivision" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
            
            </div>
            
            <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xm-12">
              <table id="fetchDivisiones" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <caption>Divisiones restringidas al distribuidor</caption>
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

            <div class="form-group">
              <label>* Campos Obligatorios</label>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="btnCerrarAddDistri" data-dismiss="modal" style="float: left;">Cerrar</button>
            <button type="button" class="btn btn-danger" id="loadingCerrarAddDistri" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
            
            <button type="button" class="btn btn-primary" id="btnAddDistri">Guardar</button>
            <button type="button" class="btn btn-primary" id="loadingAddDistri" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Editar Distribuidores -->
    <div id="modalEditarDistri" class="modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-warning">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Editar Distribuidor</h4>
          </div>
          <div class="modal-body">
            <div class="checkbox form-group col-lg-12 col-md-12 col-sm-12 col-xm-12">
              <label style="float: right;"><input type="checkbox" id="check_Status">Inactivo</label>
              <label style="float: left;"><input type="checkbox" id="check_Generar_Puntos_Editar">Generar Puntos</label>
            </div>
            
            <div class="checkbox form-group col-lg-12 col-md-12 col-sm-12 col-xm-12">
              <label style="float: right;"><input type="checkbox" id="check_Envio_Local_Editar">Envío Paqueteria &nbsp;</label>
              <label style="float: right;"><input type="checkbox" id="check_Facturacion_Editar">Facturación &nbsp;</label>
              <label style="float: right;"><input type="checkbox" id="check_Minimo_Compra_Editar">Minimo Compra &nbsp;</label>
            </div>
            
            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtNombre_Editar">Nombre:*</label>
              <input type="text" class="form-control" id="txtNombre_Editar">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtApellidos_Editar">Apellidos:*</label>
              <input type="text" class="form-control" id="txtApellidos_Editar">
            </div>

            <div class="form-group col-lg-4 col-md-4 col-sm-12 col-xm-12">
              <label for="txtAlias_Editar">Alias:</label>
              <input type="text" class="form-control" id="txtAlias_Editar">
            </div>

            <div class="form-group col-lg-4 col-md-4 col-sm-12 col-xm-12">
              <label for="txtCoordinador_Editar">Coordinador:</label>
              <input type="text" class="form-control" id="txtCoordinador_Editar">
            </div>

            <div class="form-group col-lg-4 col-md-4 col-sm-12 col-xm-12">
              <label for="txtDirector_Editar">Director:</label>
              <input type="text" class="form-control" id="txtDirector_Editar">
            </div>

            <!-- Dirección del Distribuidor -->
            <div class="col-md-12 col-lg-12">
              <p style="color: #867e7e;">Dirección del Distribuidor</p>
              <hr>
            </div>

            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <label for="txtCP_Editar">CP:</label>
              <input type="number" class="form-control" id="txtCP_Editar" maxlength="5">
            </div>

            <!--<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <label for="txtColonia_Editar">Colonia:</label>
              <select name="txtColonia_Editar" id="txtColonia_Editar" class="form-control">
              </select>
            </div>-->

            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <label for="txtColonia_Editar">Colonia:</label>
              <input list="txtColonia_Editar" name="txtColonia_Editar" class="form-control txtColonia_Editar" type="text" placeholder="Elige una colonia">
              <datalist id="txtColonia_Editar">
              </datalist>
            </div>

            <!--<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <label for="txtColonia_Editar">Colonia:</label>
              <input type="text" name="txtColonia_Editar" id="txtColonia_Editar" class="form-control">
            </div>-->

            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <label for="txtEstado_Editar">Estado:</label>
              <input type="text" class="form-control" id="txtEstado_Editar">
            </div>
            
            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <label for="txtPais_Editar">País:</label>
              <input type="text" class="form-control" id="txtPais_Editar">
            </div>

            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <label for="txtMunicipio_Editar">Municipio:</label>
              <input type="text" class="form-control" id="txtMunicipio_Editar">
            </div>

            <div class="form-group col-lg-4 col-md-4 col-sm-12 col-xm-12">
              <label for="txtCiudad_Editar">Ciudad:</label>
              <input type="text" class="form-control" id="txtCiudad_Editar">
            </div>
            
            <div class="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <label for="txtCalle_Editar">Calle:</label>
              <input type="text" class="form-control" id="txtCalle_Editar">
            </div>

            <!-- Información de la Empresa -->
            <div class="col-md-12 col-lg-12">
              <p style="color: #867e7e;">Información de la Empresa (Distribuidor)</p>
              <hr>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtEmpresa_Editar">Empresa (Razón Social):</label>
              <input type="text" class="form-control" id="txtEmpresa_Editar">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtRFC_Editar">RFC:*</label>
              <input type="text" class="form-control" id="txtRFC_Editar" oninput="validarInputEdit(this)">
              <pre id="resultadoEdit" ></pre>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtCargo_Editar">Cargo:</label>
              <input type="text" class="form-control" id="txtCargo_Editar">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="select_Sucursal_Editar">Sucursal:*</label>
              <select id="select_Sucursal_Editar" class="form-control">
                <option value="">Seleccionar...</option>
                <?php foreach ($Bodega as $key => $value) { ?>
                  <option value="<?php echo $value['ID'] ?>"><?php echo $value['Sucursal'] ?></option>
                <?php } ?>
              </select>
            </div>

            <!-- Información del Distribuidor -->
            <div class="col-md-12 col-lg-12">
              <p style="color: #867e7e;">Información del Distribuidor</p>
              <hr>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtTel1_Editar">Telefono 1:</label>
              <input type="number" class="form-control" id="txtTel1_Editar" maxlength="10">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtTel2_Editar">Telefono 2:</label>
              <input type="number" class="form-control" id="txtTel2_Editar" maxlength="10">
            </div>

            <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xm-12">
              <label for="txtEmail_Editar">Email:</label>
              <input type="Email" class="form-control" id="txtEmail_Editar">
            </div>

            <!-- Configuración del Distribuidor -->
            <div class="col-md-12 col-lg-12">
              <p style="color: #867e7e;">Configuración del Distribuidor</p>
              <hr>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtDescuento_Editar">Descuento:</label>
              <div class="input-group">
                <input type="number" class="form-control" id="txtDescuento_Editar" min="0" max="100">
                <span class="input-group-addon">%</span>
              </div>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="select_Entrega_Editar">Dia de Entrega:*</label>
              <select id="select_Entrega_Editar" class="form-control">
                <option value="">Seleccionar...</option>
                <option value="LUN">Lunes</option>
                <option value="MAR">Martes</option>
                <option value="MIE">Miercoles</option>
                <option value="JUE">Jueves</option>
                <option value="VIE">Viernes</option>
                <option value="SAB">Sabado</option>
                <option value="DOM">Domingo</option>
              </select>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtRegion_Editar">Región</label>
              <input type="text" class="form-control" id="txtRegion_Editar">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtZona_Editar">Zona:</label>
              <input type="text" class="form-control" id="txtZona_Editar">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="select_Idioma_Editar">Idioma:*</label>
              <select id="select_Idioma_Editar" class="form-control">
                <option value="">Seleccionar...</option>
                <option value="ES">Español</option>
                <option value="EN">Inglés</option>
              </select>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtImpuesto_Editar">Impuesto:</label>
              <div class="input-group">
                <input type="number" class="form-control" id="txtImpuesto_Editar" min="0" max="100">
                <span class="input-group-addon">%</span>
              </div>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtMinimoEnvio_Editar">Minimo Envio:</label>
              <input type="number" class="form-control" id="txtMinimoEnvio_Editar">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="select_Bloque_Editar">Bloque:*</label>
              <select id="select_Bloque_Editar" class="form-control">
                <option value="">Seleccionar...</option>
                <?php foreach ($Bloque as $key => $value) { ?>
                  <option value="<?php echo $value['ID'] ?>"><?php echo $value['Bloque'] ?></option>
                <?php } ?>
              </select>
            </div>

            <!-- Configuración de Cuotas -->
            <div class="col-md-12 col-lg-12">
              <p style="color: #867e7e;">Configuración de Cuotas</p>
              <hr>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtCuota_Editar">Cuota:</label>
              <input type="number" class="form-control" id="txtCuota_Editar" value="0" readonly="readonly">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtCuota_Inicial_Editar">Cuota Inicial:</label>
              <input type="number" class="form-control" id="txtCuota_Inicial_Editar" value="0">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtCuota_Final_Editar">Cuota Final:</label>
              <input type="number" class="form-control" id="txtCuota_Final_Editar" value="0">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtMeses_Cuota_Editar">Meses para llegar a la cuota:</label>
              <input type="number" class="form-control" id="txtMeses_Cuota_Editar" value="0">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtMeses_Actuales_Editar">Meses Actuales:</label>
              <input type="number" class="form-control" id="txtMeses_Actuales_Editar" value="0">
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
              <label for="txtClientes_x_dia_Editar">Clientes Por Dia:</label>
              <input type="number" class="form-control" id="txtClientes_x_dia_Editar" value="0" min="0">
            </div>

            <div class="form-group input-daterange col-lg-12 col-md-12 col-sm-12 col-xm-12">
              <label>Banderazo:</label>
              <input type="text" class="form-control" id="txtBanderazo_Editar" autocomplete="off">
            </div>

            <!-- Administrador de Contraseñas -->
            <div class="col-md-12 col-lg-12">
              <p style="color: #867e7e;">Administrador de Contraseñas</p>
              <hr>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label for="txtPaswword_Editar">Contraseña:*</label>
              <input type="password" class="form-control" id="txtPaswword_Editar">
              <span class="help-block" id="validatePasswordEditar" style="display: none;">La contraseña no coicide.</span>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label for="txtConfirmacion_Editar">Confirmación:*</label>
              <input type="password" class="form-control" id="txtConfirmacion_Editar">
              <span class="help-block" id="validateConfirmacionEditar" style="display: none;">La contraseña no coicide.</span>
            </div>

             <!-- Restricciones de División -->
             <div class="col-md-12 col-lg-12">
              <p style="color: #867e7e;">Restricciones de División</p>
              <hr>
            </div>

            <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xm-12">
              <label for="selectDivision_Editar">División:</label>
              <select id="selectDivision_Editar" class="form-control">
                <option value="">Seleccionar...</option>
                <?php foreach ($Division as $key => $value) { ?>
                  <option value="<?php echo $value['ID'] ?>"><?php echo $value['Division'] ?></option>
                <?php } ?>
              </select>

              <button type="button" class="btn btn-success btn-xs" id="btnAgregarDivisionEditar"><span class="glyphicon glyphicon-plus"></span></button>
              <button type="button" class="btn btn-success btn-xs" id="loadingAgregarDivisionEditar" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
            </div>

            <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xm-12">
              <table id="fetchDivisionesEditar" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <caption>Divisiones restringidas al distribuidor</caption>
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
            <div class="form-group">
              <label>* Campos Obligatorios</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="btnCerrarUpdateDistri" data-dismiss="modal" style="float: left;">Cerrar</button>
            <button type="button" class="btn btn-danger" id="loadingCerrarUpdateDistri" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
            
            <button type="button" class="btn btn-warning" id="btnUpdateDistri">Guardar Cambios</button>
            <button type="button" class="btn btn-warning" id="loadingUpdateDistri" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Agregar Dirección -->
    <div id="modalAddDireccion" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Nuevo Dirección de Envio</h4>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="checkbox form-group" style="margin-bottom: 50px;">
                  <label style="float: right;"><input type="checkbox" id="checkOcurre">Ocurre</label>
              </div>
              
              <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                <label for="txtContacto_Envio">Nombre Completo de Persona que Recoge:*</label>
                <input type="text" class="form-control" id="txtContacto_Envio" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>

              <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                <label for="txtEmpresa_Envio">Razón Social que Recibe Paquete:*</label>
                <input type="text" class="form-control" id="txtEmpresa_Envio" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>

              <!-- Dirección del Distribuidor -->
              <div class="col-md-12 col-lg-12">
                <p style="color: #867e7e;">Dirección del Destino</p>
                <hr>
              </div>

              <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label for="txtCP_Envio">CP:</label>
                <input type="number" class="form-control" id="txtCP_Envio" maxlength="5">
              </div>

              <!--<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label for="txtColonia_Envio">Colonia:</label>
                <select name="txtColonia_Envio" id="txtColonia_Envio" class="form-control" maxlength="30" onkeyup="ValidateEstafeta(this)">
                </select>
              </div>-->

              <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label for="txtColonia_Envio">Colonia:</label>
                <input list="txtColonia_Envio" name="txtColonia_Envio" class="form-control txtColonia_Envio" type="text" placeholder="Elige una colonia">
                <datalist id="txtColonia_Envio">
                </datalist>
              </div>

              <!--<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label for="txtColonia_Envio">Colonia:</label>
                <input type="text" name="txtColonia_Envio" id="txtColonia_Envio" class="form-control">
              </div>-->

              <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label for="txtEstado_Envio">Estado:</label>
                <input type="text" class="form-control" id="txtEstado_Envio" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>
              
              <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label for="txtPais_Envio">País:</label>
                <input type="text" class="form-control" id="txtPais_Envio" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>

              <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label for="txtMunicipio_Envio">Municipio:</label>
                <input type="text" class="form-control" id="txtMunicipio_Envio" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>

              <div class="form-group col-lg-4 col-md-4 col-sm-12 col-xm-12">
                <label for="txtCiudad_Envio">Ciudad:</label>
                <input type="text" class="form-control" id="txtCiudad_Envio" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>
              
              <div class="form-group col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label for="txtCalle_Envio">Calle:</label>
                <input type="text" class="form-control" id="txtCalle_Envio" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>

              <div class="form-group col-md-3 col-lg-3 col-sm-6 col-xs-6">
                <label for="txtNumext_Envio">Numero Ext.:*</label>
                <input type="text" class="form-control" id="txtNumext_Envio" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>

              <div class="form-group col-md-3 col-lg-3 col-sm-6 col-xs-6">
                <label for="txtNumint_Envio">Numero Int.:</label>
                <input type="text" class="form-control" id="txtNumint_Envio" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>

              <div class="col-md-12 col-lg-12">
                <p style="color: #867e7e;">Información del Destino</p>
                <hr>
              </div>

              <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                <label for="txtTel_Envio">Telefono:</label>
                <input type="text" class="form-control input-number" id="txtTel_Envio" maxlength="10">
              </div>

              <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                <label for="txtCel_Envio">Celular:</label>
                <input type="text" class="form-control input-number" id="txtCel_Envio" maxlength="10">
              </div>

              <div class="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12">
                <label>* Campos Obligatorios</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="btnCerrarAddDireccion" data-dismiss="modal" style="float: left;">Cerrar</button>
            <button type="button" class="btn btn-danger" id="loadingCerrarAddDireccion" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>

            <button type="button" class="btn btn-primary" id="btnAddDireccion">Guardar</button>
            <button type="button" class="btn btn-primary" id="loadingAddDireccion" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal Editar Dirección -->
    <div id="modalUpdateDireccion" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-warning">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Editar Dirección de Envio</h4>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="checkbox form-group col-lg-12 col-md-12 col-sm-12 col-xm-12">
                <label style="float: right; margin-left: 5px;"><input type="checkbox" value="" id="checkStatus">Inactivo</label>
                <label style="float: right;"><input type="checkbox" id="checkOcurreEditar">Ocurre</label>
              </div>
              
              <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                <label for="txtContacto_Envio_Editar">Nombre Completo de Persona que Recoge:*</label>
                <input type="text" class="form-control" id="txtContacto_Envio_Editar" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>

              <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                <label for="txtEmpresa_Envio_Editar">Razón Social que Recibe Paquete:*</label>
                <input type="text" class="form-control" id="txtEmpresa_Envio_Editar" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>

              <!-- Dirección del Distribuidor -->
              <div class="col-md-12 col-lg-12">
                <p style="color: #867e7e;">Dirección del Destino</p>
                <hr>
              </div>

              <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label for="txtCP_Envio_Editar">CP:</label>
                <input type="number" class="form-control" id="txtCP_Envio_Editar" maxlength="5">
              </div>

              <!--<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label for="txtColonia_Envio_Editar">Colonia:</label>
                <select name="txtColonia_Envio_Editar" id="txtColonia_Envio_Editar" class="form-control" maxlength="30" onkeyup="ValidateEstafeta(this)">
                </select>
              </div>-->

              <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label for="txtColonia_Envio_Editar">Colonia:</label>
                <input list="txtColonia_Envio_Editar" name="txtColonia_Envio_Editar" class="form-control txtColonia_Envio_Editar" type="text" placeholder="Elige una colonia">
                <datalist id="txtColonia_Envio_Editar">
                </datalist>
              </div>

              <!--<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label for="txtColonia_Envio_Editar">Colonia:</label>
                <input type="text" name="txtColonia_Envio_Editar" id="txtColonia_Envio_Editar" class="form-control">
              </div>-->

              <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label for="txtEstado_Envio_Editar">Estado:</label>
                <input type="text" class="form-control" id="txtEstado_Envio_Editar" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>
              
              <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label for="txtPais_Envio_Editar">País:</label>
                <input type="text" class="form-control" id="txtPais_Envio_Editar" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>

              <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label for="txtMunicipio_Envio_Editar">Municipio:</label>
                <input type="text" class="form-control" id="txtMunicipio_Envio_Editar" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>

              <div class="form-group col-lg-4 col-md-4 col-sm-12 col-xm-12">
                <label for="txtCiudad_Envio_Editar">Ciudad:</label>
                <input type="text" class="form-control" id="txtCiudad_Envio_Editar" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>
              
              <div class="form-group col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label for="txtCalle_Envio_Editar">Calle:</label>
                <input type="text" class="form-control" id="txtCalle_Envio_Editar" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>

              <div class="form-group col-md-3 col-lg-3 col-sm-6 col-xs-6">
                <label for="txtNumext_Envio_Editar">Numero Ext.:*</label>
                <input type="text" class="form-control" id="txtNumext_Envio_Editar" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>

              <div class="form-group col-md-3 col-lg-3 col-sm-6 col-xs-6">
                <label for="txtNumint_Envio_Editar">Numero Int.:</label>
                <input type="text" class="form-control" id="txtNumint_Envio_Editar" maxlength="30" onkeyup="ValidateEstafeta(this)">
              </div>

              <div class="col-md-12 col-lg-12">
                <p style="color: #867e7e;">Información del Destino</p>
                <hr>
              </div>

              <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                <label for="txtTel_Envio_Editar">Telefono:</label>
                <input type="text" class="form-control input-number" id="txtTel_Envio_Editar" maxlength="10">
              </div>

              <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                <label for="txtCel_Envio_Editar">Celular:</label>
                <input type="text" class="form-control input-number" id="txtCel_Envio_Editar" maxlength="10">
              </div>

              <div class="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12">
                <label>* Campos Obligatorios</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="btnCerrarUpdateDireccion" data-dismiss="modal" style="float: left;">Cerrar</button>
            <button type="button" class="btn btn-danger" id="loadingCerrarUpdateDireccion" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>

            <button type="button" class="btn btn-warning" id="btnUpdateDireccion">Guardar Cambios</button>
            <button type="button" class="btn btn-warning" id="loadingUpdateDireccion" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Unificar Cliente -->
    <!--<div id="modalUnificar" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <loading :active="activeModal" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true" :z-index="9999"></loading>
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 class="modal-title">Unificar Distribuidor</h5>
            </div>
            <div class="modal-body">
              <div class="containter-fluid">          
                <div class="stepper container-fluid">
                  <ul class="nav nav-tabs nav-justified" role="tablist">
                    <li role="presentation" class="active">
                      <a class="persistant-disabled" href="#stepper-step-1" data-toggle="tab" aria-controls="stepper-step-1" role="tab" title="Step 1">
                        <span class="round-tab">1</span>
                      </a>
                    </li>
                    <li role="presentation" class="disabled">
                      <a class="persistant-disabled" href="#stepper-step-2" data-toggle="tab" aria-controls="stepper-step-2" role="tab" title="Step 2">
                        <span class="round-tab">2</span>
                      </a>
                    </li>
                    <li role="presentation" class="disabled">
                      <a class="persistant-disabled" href="#stepper-step-3" data-toggle="tab" aria-controls="stepper-step-3" role="tab" title="Step 3">
                        <span class="round-tab">3</span>
                      </a>
                    </li>
                  </ul>

                  <div class="tab-content">
                    <div class="tab-pane fade in active" role="tabpanel" id="stepper-step-1">
                      <table class="table table-striped table-bordered table-hover" id="fetchClients" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Nombre</th>
                              <th>Empresa</th>
                              <th>#</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="client in objClient">
                              <td>{{client.ID}}</td>
                              <td>{{client.Nombre + " " + client.Apellidos}}</td>
                              <td>{{client.Empresa}}</td>
                              <td>
                                <input type="checkbox" class="form-check-input validateClient" v-model="client.validate">
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      <br>
                      <ul class="list-inline pull-right">
                        <li>
                          <a class="btn btn-primary next-step" @click="_validateSelectClient">Continuar</a>
                        </li>
                      </ul>
                    </div>

                    <div class="tab-pane fade" role="tabpanel" id="stepper-step-2">
                        <div class="form-group">
                          <label>Seleccionar Distribuidor Principal:</label>
                          <select class="form-control" v-model="idCliente" @change="_changeCliente">
                          <option value="">Seleccionar...</option>
                            <option v-for="(client, index) in objClientSelect" :value="client.ID">{{client.Nombre + " " + client.Apellidos}}</option>
                          </select>
                        </div>
  
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div class="form-group">
                            <p>Distribuidores Seleccionados</p>
                          </div>
                          <hr>
                        </div>
  
                        <div class="card col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div class="card-body">
                            <div class="container-fluid">
                              <div class="table-responsive" style="max-height: 500px;">
                                <table class="table table-striped table-bordered table-hover" id="fetchClientsList" width="100%">
                                  <thead>
                                    <tr>
                                      <th>ID</th>
                                      <th>Nombre</th>
                                      <th>Empresa</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="client in objClientSelect">
                                      <td>{{client.ID}}</td>
                                      <td>{{client.Nombre + " " + client.Apellidos}}</td>
                                      <td>{{client.Empresa}}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      <br>
                      <ul class="list-inline pull-right">
                        <li>
                          <a class="btn btn-default prev-step">Regresar</a>
                        </li>
                        <li>
                          <a class="btn btn-primary next-step">Continuar</a>
                        </li>
                      </ul>
                    </div>

                    <div class="tab-pane fade" role="tabpanel" id="stepper-step-3">
                        <div class="alert alert-warning" role="alert" style="background-color: #fff3cd!important; border-color: #fff3cd !important; color: #856404 !important;">
                          <strong>¡Importante!</strong> La información a unificar es la siguiente.
                        </div>
  
                        <div class="form-group">
                          <p>Distribuidor Principal: <span><b>{{nameCliente}}</b></span> </p>
                        </div>
  
                        <div class="card col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div class="card-body">
                            <div class="container-fluid">
                              <div class="table-responsive" style="max-height: 500px;">
                                <table class="table table-striped table-bordered table-hover" id="fetchClientDetails" width="100%">
                                <caption>Distribuidores a unificar</caption>
                                  <thead>
                                    <tr>
                                      <th>ID</th>
                                      <th>Nombre</th>
                                      <th>Empresa</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="client in objClientSelect" v-show="idCliente != client.ID">
                                      <td>{{client.ID}}</td>
                                      <td>{{client.Nombre + " " + client.Apellidos}}</td>
                                      <td>{{client.Empresa}}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      <br>
                      <br>
                      <ul class="list-inline pull-right">
                        <li>
                          <a class="btn btn-default prev-step">Regresar</a>
                        </li>
                        <li>
                          <a class="btn btn-primary" @click="_btnUnificar">Unificar</a>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>-->
    </div>
</div>
