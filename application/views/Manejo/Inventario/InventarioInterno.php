<div id="inventary">
    <div class="container-fluid">
        <loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="fluid-container">

                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="form-goup">
                                <label>Bodega:</label>
                                <select class="form-control" v-model="branchSelected" @change="_changeBranch">
                                    <option value="">Seleccionar...</option>
                                    <option v-for="(branch, index) in listBranch" :value="branch.ID">{{branch.Sucursal}}</option>
                                </select>
                            </div>
                        </div>                        

                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 table-responsive">
                            <br><br>
                            <table class="table table-striped table-bordered table-hover" id="fetchInventary">
                                <caption>Inventario Interno</caption>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Bodega</th>
                                        <th>Productos</th>
                                        <th>Existencias</th>
                                        <th>Minimo</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <div class="panel-footer">
                    <div class="fluid-container">
                    <?php if (is_int(array_search('Inventario_interno_agregar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                        <button class="btn btn-success" @click="_modalAddInventary"><i class="fa fa-plus" aria-hidden="true"></i></button>
                    <?php endif ?>
                    <?php if (is_int(array_search('Inventario_interno_editar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                        <button class="btn btn-warning" @click="_modalUpdateInventary"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                    <?php endif ?>
                    <?php if (is_int(array_search('Inventario_interno_eliminar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                        <button class="btn btn-danger" @click="_deleteInventary"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <?php endif ?>

                    <?php if (is_int(array_search('Inventario_interno_extraer', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                        <button class="btn btn-primary" @click="_btnExtraerProduct" style="float:right;"> Extracciones</button>
                    <?php endif ?>
                    </div>
                </div>
            </div>


            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="fluid-container">                      

                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 table-responsive">
                            <br><br>
                            <table class="table table-striped table-bordered table-hover" id="fetchInternalInventary">
                                <caption>Detalle Inventario Interno</caption>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Existencias</th>
                                        <th>Fecha Ingreso</th>
                                        <th>Lote</th>
                                        <th>Locación</th>
                                        <th>Costo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(details, index) in listDetailsInventary">
                                        <td>{{details.ID}}</td>
                                        <td>{{details.Existencias}}</td>
                                        <td>{{details.Fecha_ingreso}}</td>
                                        <td>{{details.Lote}}</td>
                                        <td>{{details.Locacion}}</td>
                                        <td>{{details.Costo}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <div class="panel-footer">
                    <div class="fluid-container">
                        <?php if (is_int(array_search('Inventario_interno_detalle_agregar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                            <button class="btn btn-success" @click="_modalAddDetailsInventary"><i class="fa fa-plus" aria-hidden="true"></i></button>
                        <?php endif ?>
                        <?php if (is_int(array_search('Inventario_interno_detalle_editar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                            <button class="btn btn-warning" @click="_modalUpdateDetailsInventary"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                        <?php endif ?>
                        <?php if (is_int(array_search('Inventario_interno_detalle_elimnar', array_column($_SESSION['Permisos'], 'Permiso')))): ?>
                            <button class="btn btn-danger" @click="_deleteDetailsInventary"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        <?php endif ?>
                    </div>
                </div>
            </div>


            <div class="modal" tabindex="-1" role="dialog" id="modalAddInventary">
                <loading :active="activeModal" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-primary" v-if="validate == 0">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 class="modal-title">Nuevo Inventario Interno</h5>
                        </div>

                        <div class="modal-header bg-warning" v-else>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 class="modal-title">Editar Inventario Interno</h5>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">

                                <div class="form-group" style="margin-bottom: 15px;" v-if="validate != 0">
                                    <div class="checkbox" style="float: right;">
                                        <label><input type="checkbox" :value="checkStatus" v-model="checkStatus" style="float: right;">Inactivo</label>
                                    </div>
                                </div>

                                <div class="form-goup" style="margin-bottom: 15px;">
                                    <label>Bodega:</label>
                                    <select class="form-control" v-model="addBranch">
                                        <option value="">Seleccionar...</option>
                                        <option v-for="(branch, index) in listBranch" :value="branch.ID">{{branch.Sucursal}}</option>
                                    </select>
                                </div>

                                <div class="form-goup" style="margin-bottom: 15px;">
                                    <label>Producto:</label>
                                    <input type="text" class="form-control" v-model="addProduct">
                                </div>

                                <div class="form-goup" style="margin-bottom: 15px;">
                                    <label>Existencias:</label>
                                    <input type="number" class="form-control" min="0" v-model="addStock" disabled>
                                </div>

                                <div class="form-goup" style="margin-bottom: 15px;">
                                    <label>Minimo:</label>
                                    <input type="number" class="form-control" v-model="addMin">
                                </div>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" @click="_addInventary"  v-if="validate == 0">Guardar</button>
                            <button type="button" class="btn btn-warning" @click="_updateInventary"  v-else>Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Modal Details Inventary -->
            <div class="modal" tabindex="-1" role="dialog" id="modalAddDetailsInventary">
                <loading :active="activeModalDetails" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-primary" v-if="validateDetails == 0">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 class="modal-title">Nuevo Detalle Inventario Interno</h5>
                        </div>

                        <div class="modal-header bg-warning" v-else>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 class="modal-title">Editar Detalle Inventario Interno</h5>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">

                                <div class="form-goup" style="margin-bottom: 15px;" v-if="validateDetails != 0">
                                    <label>Fecha de Ingreso:</label>
                                    <datetime v-model="addDate" :bootstrap-styling="true"></datetime>
                                </div>

                                <div class="form-goup" style="margin-bottom: 15px;">
                                    <label>Existencias:</label>
                                    <input type="number" class="form-control" v-model="addExistencias">
                                </div>

                                <div class="form-goup" style="margin-bottom: 15px;">
                                    <label>Lote:</label>
                                    <input type="text" class="form-control" v-model="addLote">
                                </div>

                                <div class="form-goup" style="margin-bottom: 15px;">
                                    <label>Locación:</label>
                                    <input type="text" class="form-control" v-model="addLocation">
                                </div>

                                <div class="form-goup" style="margin-bottom: 15px;">
                                    <label>Costo:</label>
                                    <input type="number" class="form-control" v-model.number="addCost">
                                </div>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" @click="_addSaveAddDetails"  v-if="validateDetails == 0">Guardar</button>
                            <button type="button" class="btn btn-warning" @click="_updateDetails"  v-else>Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal Cantidad Extraer -->
            <div id="modalExtraer" class="modal fade" role="dialog"> 
                <loading :active="activeModalCantidad" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-primary">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Cantidad a extraer</h4>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="form-group">
                                    <label> Cantidad: </label>
                                    <input type="number" class="form-control" :max="cantidad" min="0" v-model.number="txtCantidad">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" @click="_btnExtraer">Extraer</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</div>
