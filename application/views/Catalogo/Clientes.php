<br>
<div id="clients">
  <loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true" :z-index="9999"></loading>
  <div class="container-fluid">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
     
    <form action="<?php echo base_url('index.php/Controller_Cliente/csvClientes') ?>" method="post" accept-charset="utf-8" target="_blank">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Clientes</h3>
          <div class="box-tools pull-right">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body">
            <div class="form-group col-lg-3 col-md-3 col-sm-3">
              <label>Distribuidor:</label>
              <select class="form-control" id="selectDistribuidor" name="selectDistribuidor" v-model="distribuidor">
                <option value="">Seleccionar...</option>
                <?php foreach ($Distribuidor as $key => $value) { ?>
                  <option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'] . " " . $value['Apellidos'] ?></option>
                <?php } ?>
              </select>
            </div>

            <div class="form-group col-lg-3 col-md-3 col-sm-3">
              <label>Nivel:</label>
              <select class="form-control" id="selectNivel" name="selectNivel">
                <option value="">Seleccionar...</option>
                <option value="null">null</option>
                <option value="Black">Black</option>
                <option value="Red">Red</option>
                <!--<?php foreach ($Nivel as $key => $value) { ?>
                  <option value="<?php echo $value['Nivel'] ?>"><?php echo $value['Nivel'] ?></option>
                <?php } ?>-->
              </select>
            </div>

            <div class="form-group col-lg-6 col-md-6 col-sm-6" style="margin-bottom: 50px;">
              <div class="checkbox">
                <label style="float: right;"><input type="checkbox" id="Mostrar_Inactivos" name="Mostrar_Inactivos">Mostrar Inactivos</label>
              </div>
            </div>
            <div class="table-responsive col-lg-12">
              <table id="Table_Clientes" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Nombre</td>
                    <td>Apellidos</td>
                    <td>Empresa</td>
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
                    <td>Descuento</td>
                    <td>Nivel</td>
                    <td>Status</td>
                    <td>Distribuidor</td>
                    <td>Referencias</td>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
                  
        </div> <!-- info -->
        <div class="box-footer">
          <button type="button" class="btn btn-success" id="Agregar_Clientes"><span class="glyphicon glyphicon-plus"></span></button>
          <button type="button" class="btn btn-warning" id="Editar_Clientes"><span class="glyphicon glyphicon-pencil"></span></button>
          <button type="button" class="btn btn-danger" id="Eliminar_Clientes"><span class="glyphicon glyphicon-trash"></span></button>

          <button type="button" class="btn btn-default" style="float: right; margin-left: 10px;" @click="_openModalUnificar">Unificar Cliente</button>
          <button type="submit" class="btn btn-success" style="float: right;"><i class="fa fa-file-excel-o" aria-hidden="true"></i></button>
        </div>
      </div>
    </form>              

      <!-- Modal Agregar Cliente -->
      <div id="Modal_Agregar" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Nuevo Cliente</h4>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="txtNombre">Nombre:*</label>
                <input type="text" class="form-control" id="txtNombre">
              </div>
              <div class="form-group">
                <label for="txt_Apellidos">Apellidos:*</label>
                <input type="text" class="form-control" id="txt_Apellidos">
              </div>
              <div class="form-group">
                <label for="txtEmpresa">Empresa:*</label>
                <input type="text" class="form-control" id="txtEmpresa">
              </div>
              <div class="form-group">
                <label for="txtCargo">Cargo:</label>
                <input type="text" class="form-control" id="txtCargo">
              </div>
              <div class="form-group">
                <label for="txtCalle">Calle:</label>
                <input type="text" class="form-control" id="txtCalle" onkeypress="return check(event)">
              </div>
              <div class="form-group">
                <label for="txtColonia">Colonia:</label>
                <input type="text" class="form-control" id="txtColonia">
              </div>
              <div class="form-group">
                <label for="txtReferencia">Referencia:</label>
                <input type="text" class="form-control" id="txtReferencia">
              </div>
              <div class="form-group">
                <label for="txtCiudad">Ciudad:</label>
                <input type="text" class="form-control" id="txtCiudad">
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
                <label for="txtRFC">RFC:</label>
                <input type="text" class="form-control" id="txtRFC">
              </div>
              <div class="form-group">
                <label for="txtTel1">Telefono 1:*</label>
                <input type="number" class="form-control" id="txtTel1" max="10">
              </div>
              <div class="form-group">
                <label for="txtTel2">Telefono 2:</label>
                <input type="number" class="form-control" id="txtTel2" min="10">
              </div>
              <div class="form-group">
                <label for="txtEmail">Email:*</label>
                <input type="email" class="form-control" id="txtEmail">
              </div>
              <div class="form-group">
                <label for="txtDescuento">Descuento:</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="txtDescuento" min="0" max="100" value="0">
                  <span class="input-group-addon">%</span>
                </div>
              </div>
              <div class="form-group">
                <label for="select_Distribuidor">Distribuidor:*</label>
                <select id="select_Distribuidor" class="form-control">
                  <option value="">Seleccionar...</option>
                  <?php foreach ($Distribuidor as $key => $value) { ?>
                    <option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'] . ' ' . $value['Apellidos'] ?></option>
                  <?php } ?>
                </select>
              </div>
              <div class="wrap" id="Cargando_Agregar" style="display: none;">
                <div class="loading">
                  <div class="bounceball"></div>
                  <div class="text">&nbsp; &nbsp; Cargando...</div>
                </div>
              </div>
              <div class="form-group">
                <label for="txtNivel">Nivel:</label>
                <input type="text" class="form-control" id="txtNivel">
              </div>

              <div class="form-group">
                <label for="txtSemana">Semana:*</label>
                  <select name="txtSemana" id="txtSemana" class="form-control">
                      <option value="">Seleccionar...</option>
                      <option value="0">Par</option>
                      <option value="1">Non</option>
                  </select>
              </div>

              <div class="form-group">
                <label for="txtDia">Dia:*</label>
                  <select name="txtDia" id="txtDia" class="form-control">
                      <option value="">Seleccionar...</option>
                      <option value="Monday">Lunes</option>
                      <option value="Tuesday">Martes</option>
                      <option value="Wednesday">Miércoles</option>
                      <option value="Thursday">Jueves</option>
                      <option value="Friday">Viernes</option>
                  </select>
              </div>

              <div class="form-group">
                <label>* Campos Obligatorios</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger btn-flat" data-dismiss="modal" style="float: left;">Cerrar</button>
              <button type="button" class="btn btn-primary btn-flat" style="float: right;" id="btn_Guardar_Cliente">Guardar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Editar Cliente -->
      <div id="Modal_Editar" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Editar Cliente</h4>
            </div>
            <div class="modal-body">
              <div class="checkbox form-group" style="margin-bottom: 50px;">
                <label style="float: right;"><input type="checkbox" id="check_Status_Editar">Inactivo</label>
              </div>
              <div class="form-group">
                <label for="txtNombre_Editar">Nombre:*</label>
                <input type="text" class="form-control" id="txtNombre_Editar">
              </div>
              <div class="form-group">
                <label for="txt_Apellidos_Editar">Apellidos:*</label>
                <input type="text" class="form-control" id="txt_Apellidos_Editar">
              </div>
              <div class="form-group">
                <label for="txtEmpresa_Editar">Empresa:*</label>
                <input type="text" class="form-control" id="txtEmpresa_Editar">
              </div>
              <div class="form-group">
                <label for="txtCargo_Editar">Cargo:</label>
                <input type="text" class="form-control" id="txtCargo_Editar">
              </div>
              <div class="form-group">
                <label for="txtCalle_Editar">Calle:</label>
                <input type="text" class="form-control" id="txtCalle_Editar" onkeypress="return check(event)">
              </div>
              <div class="form-group">
                <label for="txtColonia_Editar">Colonia:</label>
                <input type="text" class="form-control" id="txtColonia_Editar">
              </div>
              <div class="form-group">
                <label for="txtReferencia_Editar">Referencia:</label>
                <input type="text" class="form-control" id="txtReferencia_Editar">
              </div>
              <div class="form-group">
                <label for="txtCiudad_Editar">Ciudad:</label>
                <input type="text" class="form-control" id="txtCiudad_Editar">
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
                <label for="txtRFC_Editar">RFC:</label>
                <input type="text" class="form-control" id="txtRFC_Editar">
              </div>
              <div class="form-group">
                <label for="txtTel1_Editar">Telefono 1:*</label>
                <input type="number" class="form-control" id="txtTel1_Editar" max="10">
              </div>
              <div class="form-group">
                <label for="txtTel2_Editar">Telefono 2:</label>
                <input type="number" class="form-control" id="txtTel2_Editar" min="10">
              </div>
              <div class="form-group">
                <label for="txtEmail_Editar">Email:*</label>
                <input type="email" class="form-control" id="txtEmail_Editar">
              </div>
              <div class="form-group">
                <label for="txtDescuento_Editar">Descuento:</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="txtDescuento_Editar" min="0" max="100" value="0">
                  <span class="input-group-addon">%</span>
                </div>
              </div>
              <div class="form-group">
                <label for="select_Distribuidor_Editar">Distribuidor:*</label>
                <select id="select_Distribuidor_Editar" class="form-control">
                  <option value="">Seleccionar...</option>
                  <?php foreach ($Distribuidor as $key => $value) { ?>
                    <option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'] . ' ' . $value['Apellidos'] ?></option>
                  <?php } ?>
                </select>
              </div>
              <div class="wrap" id="Cargando_Editar" style="display: none;">
                <div class="loading">
                  <div class="bounceball"></div>
                  <div class="text">&nbsp; &nbsp; Cargando...</div>
                </div>
              </div>
              <div class="form-group">
                <label for="txtNivel_Editar">Nivel:</label>
                <input type="text" class="form-control" id="txtNivel_Editar">
              </div>

              <div class="form-group">
                <label for="txtSemanaEditar">Semana:*</label>
                  <select name="txtSemanaEditar" id="txtSemanaEditar" class="form-control">
                      <option value="">Seleccionar...</option>
                      <option value="0">Par</option>
                      <option value="1">Non</option>
                  </select>
              </div>

              <div class="form-group">
                <label for="txtDiaEditar">Dia:*</label>
                  <select name="txtDiaEditar" id="txtDiaEditar" class="form-control">
                      <option value="">Seleccionar...</option>
                      <option value="Monday">Lunes</option>
                      <option value="Tuesday">Martes</option>
                      <option value="Wednesday">Miércoles</option>
                      <option value="Thursday">Jueves</option>
                      <option value="Friday">Viernes</option>
                  </select>
              </div>

              <div class="form-group">
                <label>* Campos Obligatorios</label>
              </div>
  
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger btn-flat" data-dismiss="modal" style="float: left;">Cerrar</button>
              <button type="button" class="btn btn-warning btn-flat" style="float: right;" id="btn_Editar_Cliente">Guardar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Unificar Cliente -->
      <div id="modalUnificar" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <loading :active="activeModal" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true" :z-index="9999"></loading>
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 class="modal-title">Unificar Cliente</h5>
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
                          <label>Seleccionar Cliente Principal:</label>
                          <select class="form-control" v-model="idCliente" @change="_changeCliente">
                          <option value="">Seleccionar...</option>
                            <option v-for="(client, index) in objClientSelect" :value="client.ID">{{client.Nombre + " " + client.Apellidos}}</option>
                          </select>
                        </div>
  
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div class="form-group">
                            <p>Clientes Seleccionados</p>
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
                          <p>Cliente Principal: <span><b>{{nameCliente}}</b></span> </p>
                        </div>
  
                        <div class="card col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div class="card-body">
                            <div class="container-fluid">
                              <div class="table-responsive" style="max-height: 500px;">
                                <table class="table table-striped table-bordered table-hover" id="fetchClientDetails" width="100%">
                                <caption>Clientes a unificar</caption>
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









    </div>
  </div>
</div>


