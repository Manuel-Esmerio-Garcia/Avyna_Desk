<!-- Page Content -->
<br>
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Proveedores</h3>
                    <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i
                                class="fa fa-minus"></i></button>
                    </div>
                </div>
                <div class="box-body">
                    <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <table id="fetchProveedores"
                            class="table table-hover table-striped table-bordered table-condensed" width="100%">
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
                                    <td>Moneda</td>
                                    <td>Status</td>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
                <div class="box-footer">
                    <?php if (is_int(array_search('Proveedores_agregar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                    <button type="button" class="btn btn-success" id="btnAgregarProvee"><span
                            class="glyphicon glyphicon-plus"></span></button>
                    <button type="button" class="btn btn-success" id="loadingAgregarProvee" disabled
                        style="display: none;"><i class="fa fa-spinner fa-spin"
                            style="font-size:18px; color: white;"></i></button>
                    <?php endif ?>
                    <?php if (is_int(array_search('Proveedores_editar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                    <button type="button" class="btn btn-warning" id="btnEditarProvee"><span
                            class="glyphicon glyphicon-pencil"></span> </button>
                    <button type="button" class="btn btn-warning" id="loadingEditarProvee" disabled
                        style="display: none;"><i class="fa fa-spinner fa-spin"
                            style="font-size:18px; color: white;"></i></button>
                    <?php endif ?>
                    <?php if (is_int(array_search('Proveedores_eliminar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                    <button type="button" class="btn btn-danger" id="btnEliminarProvee"><span
                            class="glyphicon glyphicon-trash"></span></button>
                    <button type="button" class="btn btn-danger" id="loadingEliminarProvee" disabled
                        style="display: none;"><i class="fa fa-spinner fa-spin"
                            style="font-size:18px; color: white;"></i></button>
                    <?php endif ?>
                </div>
            </div>
        </div>


        <!-- Modal Agregar Proveedores -->
        <div id="modalAgregarProvee" class="modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Nuevo Proveedor</h4>
                    </div>
                    <div class="modal-body">

                        <!--<div class="checkbox form-group col-lg-12 col-md-12 col-sm-12 col-xm-12">
                            <label style="float: left;"><input type="checkbox" id="checkEntrega">Entrega</label>
                        </div>-->

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                            <label for="txtNombre">Nombre:*</label>
                            <input type="text" class="form-control" id="txtNombre">
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                            <label for="txtApellidos">Apellidos:*</label>
                            <input type="text" class="form-control" id="txtApellidos">
                        </div>

                        <!-- Dirección del Distribuidor -->
                        <div class="col-md-12 col-lg-12">
                            <p style="color: #867e7e;">Dirección del Proveedor</p>
                            <hr>
                        </div>

                        <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                            <label for="txtCP">CP:</label>
                            <input type="number" class="form-control" id="txtCP" maxlength="5">
                        </div>

                        <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                            <label for="txtColonia">Colonia:</label>
                            <input list="txtColonia" name="txtColonia" class="form-control txtColonia" type="text"
                                placeholder="Elige una colonia">
                            <datalist id="txtColonia">
                            </datalist>
                        </div>

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
                            <p style="color: #867e7e;">Información de la Empresa (Proveedor)</p>
                            <hr>
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                            <label for="txtEmpresa">Empresa (Razón Social):</label>
                            <input type="text" class="form-control" id="txtEmpresa">
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                            <label for="txtRFC">RFC:*</label>
                            <input type="text" class="form-control" id="txtRFC">
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                            <label for="txtCargo">Cargo:</label>
                            <input type="text" class="form-control" id="txtCargo">
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                            <label for="select_Moneda">Moneda:*</label>
                            <select id="select_Moneda" class="form-control">
                                <option value="">Seleccionar...</option>
                                <?php foreach ($Moneda as $key => $value) { ?>
                                <option value="<?php echo $value['ID'] ?>"><?php echo $value['Moneda'] ?></option>
                                <?php } ?>
                            </select>
                        </div>

                        <!-- Información del Distribuidor -->
                        <div class="col-md-12 col-lg-12">
                            <p style="color: #867e7e;">Información del Proveedor</p>
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
                            <input type="Email" class="form-control" id="txtEmail">
                        </div>

                        <div class="form-group">
                            <label>* Campos Obligatorios</label>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" id="btnCerrarAddProvee" data-dismiss="modal"
                            style="float: left;">Cerrar</button>
                        <button type="button" class="btn btn-danger" id="loadingCerrarAddProvee" disabled
                            style="display: none; float: left;"><i class="fa fa-spinner fa-spin"
                                style="font-size:18px; color: white;"></i> Loading...</button>

                        <button type="button" class="btn btn-primary" id="btnAddProvee">Guardar</button>
                        <button type="button" class="btn btn-primary" id="loadingAddProvee" disabled
                            style="display: none;"><i class="fa fa-spinner fa-spin"
                                style="font-size:18px; color: white;"></i> Loading...</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Editar Proveedor -->
        <div id="modalEditarProvee" class="modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-warning">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Editar Proveedor</h4>
                    </div>
                    <div class="modal-body">

                        <div class="checkbox form-group col-lg-12 col-md-12 col-sm-12 col-xm-12">
                            <label style="float: right;"><input type="checkbox" id="checkStatus">Inactivo</label>
                            <!--<label style="float: left;"><input type="checkbox" id="checkEntregaEditar">Entrega</label>-->
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                            <label for="txtNombreEditar">Nombre:*</label>
                            <input type="text" class="form-control" id="txtNombreEditar">
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                            <label for="txtApellidosEditar">Apellidos:*</label>
                            <input type="text" class="form-control" id="txtApellidosEditar">
                        </div>

                        <!-- Dirección del Distribuidor -->
                        <div class="col-md-12 col-lg-12">
                            <p style="color: #867e7e;">Dirección del Proveedor</p>
                            <hr>
                        </div>

                        <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                            <label for="txtCPEditar">CP:</label>
                            <input type="number" class="form-control" id="txtCPEditar" maxlength="5">
                        </div>

                        <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                            <label for="txtColoniaEditar">Colonia:</label>
                            <input list="txtColoniaEditar" name="txtColoniaEditar" class="form-control txtColoniaEditar" type="text"
                                placeholder="Elige una colonia">
                            <datalist id="txtColoniaEditar">
                            </datalist>
                        </div>

                        <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                            <label for="txtEstadoEditar">Estado:</label>
                            <input type="text" class="form-control" id="txtEstadoEditar">
                        </div>

                        <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                            <label for="txtPaisEditar">País:</label>
                            <input type="text" class="form-control" id="txtPaisEditar">
                        </div>

                        <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
                            <label for="txtMunicipioEditar">Municipio:</label>
                            <input type="text" class="form-control" id="txtMunicipioEditar">
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12 col-xm-12">
                            <label for="txtCiudadEditar">Ciudad:</label>
                            <input type="text" class="form-control" id="txtCiudadEditar">
                        </div>

                        <div class="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <label for="txtCalleEditar">Calle:</label>
                            <input type="text" class="form-control" id="txtCalleEditar">
                        </div>

                        <!-- Información de la Empresa -->
                        <div class="col-md-12 col-lg-12">
                            <p style="color: #867e7e;">Información de la Empresa (Proveedor)</p>
                            <hr>
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                            <label for="txtEmpresaEditar">Empresa (Razón Social):</label>
                            <input type="text" class="form-control" id="txtEmpresaEditar">
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                            <label for="txtRFCEditar">RFC:*</label>
                            <input type="text" class="form-control" id="txtRFCEditar">
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                            <label for="txtCargoEditar">Cargo:</label>
                            <input type="text" class="form-control" id="txtCargoEditar">
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                            <label for="select_MonedaEditar">Moneda:*</label>
                            <select id="select_MonedaEditar" class="form-control">
                                <option value="">Seleccionar...</option>
                                <?php foreach ($Moneda as $key => $value) { ?>
                                <option value="<?php echo $value['ID'] ?>"><?php echo $value['Moneda'] ?></option>
                                <?php } ?>
                            </select>
                        </div>

                        <!-- Información del Distribuidor -->
                        <div class="col-md-12 col-lg-12">
                            <p style="color: #867e7e;">Información del Proveedor</p>
                            <hr>
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                            <label for="txtTel1Editar">Telefono 1:</label>
                            <input type="number" class="form-control" id="txtTel1Editar" maxlength="10">
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                            <label for="txtTel2Editar">Telefono 2:</label>
                            <input type="number" class="form-control" id="txtTel2Editar" maxlength="10">
                        </div>

                        <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xm-12">
                            <label for="txtEmailEditar">Email:</label>
                            <input type="Email" class="form-control" id="txtEmailEditar">
                        </div>

                        <div class="form-group">
                            <label>* Campos Obligatorios</label>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" id="btnCerrarUpdateProvee" data-dismiss="modal"
                            style="float: left;">Cerrar</button>
                        <button type="button" class="btn btn-danger" id="loadingCerrarUpdateProvee" disabled
                            style="display: none; float: left;"><i class="fa fa-spinner fa-spin"
                                style="font-size:18px; color: white;"></i> Loading...</button>

                        <button type="button" class="btn btn-warning" id="btnUpdateProvee">Guardar Cambios</button>
                        <button type="button" class="btn btn-warning" id="loadingUpdateProvee" disabled
                            style="display: none;"><i class="fa fa-spinner fa-spin"
                                style="font-size:18px; color: white;"></i> Loading...</button>
                    </div>
                </div>
            </div>
        </div>



    </div>
</div>