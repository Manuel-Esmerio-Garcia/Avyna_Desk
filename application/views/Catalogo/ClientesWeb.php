<br>
<div id="clientsweb">
    <loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true" :z-index="9999"></loading>
    <div class="container-fluid">
 	    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Clientes WEB</h3>
                    <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    </div>
                </div>
                <div class="box-body">					  	
                    <div class="container-fluid">

                        <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <table id="fetchClientes" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                                <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Nombre</td>
                                    <td>Apellidos</td>
                                    <td>RFC</td>
                                    <td>Empresa</td>
                                    <td>Cargo</td>
                                    <td>Calle Numero</td>
                                    <td>Colonia</td>
                                    <td>Ciudad</td>
                                    <td>Municipio</td>
                                    <td>Estado</td>
                                    <td>País</td>
                                    <td>CP</td>
                                    <td>Tel1</td>
                                    <td>Tel2</td>
                                    <td>Email</td>
                                    <td>Descuento</td>
                                    <td>Nivel</td>
                                    <td>N° Salon</td>
                                    <td>Status</td>
                                    <td>#</td>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="box-footer">
                    <button type="button" class="btn btn-success" @click="_addModal"><span class="glyphicon glyphicon-plus"></span></button>
                    <button type="button" class="btn btn-warning" @click="_addModalEditar"><span class="glyphicon glyphicon-pencil"></span></button>
                    <button type="button" class="btn btn-danger"  @click="_addModalEliminar"><span class="glyphicon glyphicon-trash"></span></button>
                </div>
            </div>

        </div>

    <!-- Modal Agregar Cliente -->
      <div id="ModalAddCliente" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
        <loading :active="activeModal" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true" :z-index="9999"></loading>

        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-primary" v-if="validate == 0">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Nuevo Cliente</h4>
            </div>
            <div class="modal-header bg-warning" v-else>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Editar Cliente</h4>
            </div>
            <div class="modal-body">

            <div class="form-check" v-if="validate != 0" style="float: right;">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="ValidateStatus">
                <label class="form-check-label" for="exampleCheck1">Inactivo</label>
            </div>

              <div class="form-group">
                <label for="txtNombre">Nombre:*</label>
                <input type="text" class="form-control" id="txtNombre" v-model="Cliente.Nombre">
              </div>
              <div class="form-group">
                <label for="txt_Apellidos">Apellidos:*</label>
                <input type="text" class="form-control" id="txt_Apellidos" v-model="Cliente.Apellidos">
              </div>
              <div class="form-group">
                <label for="txtEmpresa">Empresa:</label>
                <input type="text" class="form-control" id="txtEmpresa" v-model="Cliente.Empresa">
              </div>
              <div class="form-group">
                <label for="txtCargo">Cargo:</label>
                <input type="text" class="form-control" id="txtCargo" v-model="Cliente.Cargo">
              </div>
              <div class="form-group">
                <label for="txtCalle">Calle:</label>
                <input type="text" class="form-control" id="txtCalle" onkeypress="return check(event)" v-model="Cliente.Calle_numero">
              </div>
              <div class="form-group">
                <label for="txtColonia">Colonia:</label>
                <input type="text" class="form-control" id="txtColonia" v-model="Cliente.Colonia">
              </div>
              <div class="form-group">
                <label for="txtCiudad">Ciudad:</label>
                <input type="text" class="form-control" id="txtCiudad" v-model="Cliente.Ciudad">
              </div>
              <div class="form-group">
                <label for="txtMunicipio">Municipio:</label>
                <input type="text" class="form-control" id="txtMunicipio" v-model="Cliente.Municipio">
              </div>
              <div class="form-group">
                <label for="txtEstado">Estado:</label>
                <input type="text" class="form-control" id="txtEstado" v-model="Cliente.Estado">
              </div>
              <div class="form-group">
                <label for="txtPais">País:</label>
                <input type="text" class="form-control" id="txtPais" v-model="Cliente.Pais">
              </div>
              <div class="form-group">
                <label for="txtCP">CP:</label>
                <input type="number" class="form-control" id="txtCP" maxlength="5" v-model="Cliente.CP">
              </div>
              <div class="form-group">
                <label for="txtRFC">RFC:</label>
                <input type="text" class="form-control" id="txtRFC" v-model="Cliente.RFC">
              </div>
              <div class="form-group">
                <label for="txtTel1">Telefono 1:*</label>
                <input type="number" class="form-control" id="txtTel1" max="10" v-model="Cliente.Tel1">
              </div>
              <div class="form-group">
                <label for="txtTel2">Telefono 2:</label>
                <input type="number" class="form-control" id="txtTel2" min="10" v-model="Cliente.Tel2">
              </div>
              <div class="form-group">
                <label for="txtEmail">Email:*</label>
                <input type="email" class="form-control" id="txtEmail" v-model="Cliente.Email">
              </div>
              <div class="form-group">
                <label for="txtDescuento">Descuento:</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="txtDescuento" min="0" max="100" value="0" v-model="Cliente.Descuento">
                  <span class="input-group-addon">%</span>
                </div>
              </div>
              <div class="form-group">
                <label for="select_Salon">idSalon:</label>
                <input type="number" class="form-control" id="select_Salon" v-model="Cliente.idSalon">
              </div>
              <div class="form-group">
                <label for="txtNivel">Nivel:</label>
                <input type="text" class="form-control" id="txtNivel" v-model="Cliente.Nivel">
              </div>
              <div class="form-group">
                <label>* Campos Obligatorios</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal" style="float: left;">Cerrar</button>

              <button type="button" class="btn btn-primary" style="float: right;" v-if="validate == 0" @click="_addCliente">Guardar</button>
              <button type="button" class="btn btn-warning" style="float: right;" v-else @click="_updateCliente">Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>

    </div>
</div>