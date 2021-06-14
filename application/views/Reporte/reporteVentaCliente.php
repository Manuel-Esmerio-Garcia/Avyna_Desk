<br>
<div id="reporte">
    <loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>
	<div class="container-fluid">
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
                <!-- Inicio Step 1 -->
                <div class="tab-pane fade in active" role="tabpanel" id="stepper-step-1">
                    <div class="panel panel-default">
                        <div class="panel-heading">Productos y Promociones</div>
                        <div class="panel-body">
                            <div class="container-fluid">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="col-lg-5 col-md-5">
                                        <div class="form-group">
                                            <label>Listado de Productos</label>
                                                <select multiple class="form-control" binding.value="objListProduct">
                                                    <option v-for="(product, index) in objListProduct" :value="product.ID" @click="_clickSelected(product)">{{product.ID + "  " + product.Producto}}</option>
                                                </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-2" style="text-align: center; margin-top: 30px;">
                                        <!--<div class="form-group">
                                            <button class="btn btn-default btn-sm" @click=""><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                                        </div>-->
                                        <div class="form-group">
                                            <button class="btn btn-primary btn-sm" @click="_addProduct"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                                        </div>
                                        <div class="form-group">
                                            <button class="btn btn-danger btn-sm" @click="_deleteProduct"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                    <div class="col-lg-5 col-md-5">
                                        <div class="form-group">
                                            <label>Productos Seleccionados</label>
                                                <select multiple class="form-control" binding.value="listProduct">
                                                    <option v-for="(product, index) in listProduct" :value="product.ID" @click="_clickSelected2(product,index)">{{product.ID + "  " + product.Producto}}</option>
                                                </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="col-lg-5 col-md-5">
                                        <div class="form-group">
                                            <label>Listado de Promociones</label>
                                                <select multiple class="form-control" binding.value="objListPromotion">
                                                    <option v-for="(promo, index) in objListPromotion" :value="promo.ID" @click="_clickPromoSelected(promo)">{{promo.ID + "  " + promo.Promocion}}</option>
                                                </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-2" style="text-align: center; margin-top: 30px;">
                                        <div class="form-group">
                                            <button class="btn btn-primary btn-sm" @click="_addPromo"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                                        </div>
                                        <div class="form-group">
                                            <button class="btn btn-danger btn-sm" @click="_deletePromo"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                    <div class="col-lg-5 col-md-5">
                                        <div class="form-group">
                                            <label>Promociones Seleccionados</label>
                                                <select multiple class="form-control" binding.value="listPromotion">
                                                    <option v-for="(promo, index) in listPromotion" :value="promo.ID" @click="_clickPromoSelected2(promo,index)">{{promo.ID + "  " + promo.Promocion}}</option>
                                                </select>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="panel-footer">
                            <div class="container-fluid">
                                <ul class="list-inline pull-right">
                                    <li>
                                        <a class="btn btn-primary next-step">Continuar</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Fin Step 1 -->

                <!-- Inicio Step 2 -->
                <div class="tab-pane fade" role="tabpanel" id="stepper-step-2">
                    <div class="panel panel-default">
                        <div class="panel-heading">Distribuidores y Clientes</div>
                        <div class="panel-body">
                            <div class="container-fluid">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="col-lg-5 col-md-5">
                                        <div class="form-group">
                                            <label>Listado de Distribuidores</label>
                                                <select multiple class="form-control" binding.value="objListDealers">
                                                    <option v-for="(dealers, index) in objListDealers" :value="dealers.ID" @click="_clickSelectedDealers(dealers)">{{dealers.Nombre + "  " + dealers.Apellidos}}</option>
                                                </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-2" style="text-align: center; margin-top: 30px;">
                                        <!--<div class="form-group">
                                            <button class="btn btn-default btn-sm" @click=""><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                                        </div>-->
                                        <div class="form-group">
                                            <button class="btn btn-primary btn-sm" @click="_addDealers"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                                        </div>
                                        <div class="form-group">
                                            <button class="btn btn-danger btn-sm" @click="_deleteDealers"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                    <div class="col-lg-5 col-md-5">
                                        <div class="form-group">
                                            <label>Distribuidores Seleccionados</label>
                                                <select multiple class="form-control" binding.value="listDealers">
                                                    <option v-for="(dealers, index) in listDealers" :value="dealers.ID" @click="_clickSelectedDealers2(dealers,index)">{{dealers.Nombre + "  " + dealers.Apellidos}}</option>
                                                </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="col-lg-5 col-md-5">
                                        <div class="form-group">
                                            <label>Listado de Clientes</label>
                                                <select multiple class="form-control" binding.value="objListClients">
                                                    <option v-for="(client, index) in objListClients" :value="client.ID" @click="_clickSelectedClient(client)">{{client.Nombre + "  " + client.Apellidos}}</option>
                                                </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-2" style="text-align: center; margin-top: 30px;">
                                        <div class="form-group">
                                            <button class="btn btn-primary btn-sm" @click="_addClient"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                                        </div>
                                        <div class="form-group">
                                            <button class="btn btn-danger btn-sm" @click="_deleteClient"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                    <div class="col-lg-5 col-md-5">
                                        <div class="form-group">
                                            <label>Clientes Seleccionados</label>
                                                <select multiple class="form-control" binding.value="listClients">
                                                    <option v-for="(client, index) in listClients" :value="client.ID" @click="_clickSelectedClient2(client,index)">{{client.Nombre + "  " + client.Apellidos}}</option>
                                                </select>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="panel-footer">
                            <div class="container-fluid">
                                <ul class="list-inline pull-right">
                                    <li>
                                        <a class="btn btn-default prev-step">Regresar</a>
                                    </li>
                                    <li>
                                        <a class="btn btn-primary next-step">Continuar</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Fin Step 2 -->

                <!-- Inicio Step 3 -->
                <div class="tab-pane fade" role="tabpanel" id="stepper-step-3">
                    <div class="panel panel-default">
                        <div class="panel-heading"> Información Adicional </div>
                        <div class="panel-body">
                            <div class="container-fluid">
                                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                    <div class="form-goup">
                                        <label>Fecha Inicio:</label>
                                        <datetime :bootstrap-styling="true" v-model="initialDate"></datetime>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                                    <div class="form-goup">
                                        <label>Fecha final:</label>
                                        <datetime :bootstrap-styling="true" v-model="finalDate"></datetime>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                                    <div class="form-goup">
                                        <label>Sucursal:</label>
                                        <select class="form-control" v-model="branch">
                                            <option value="">Seleccionar...</option>
                                            <option v-for="(branch, index) in listBranch" :value="branch.ID">{{branch.Sucursal}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer">
                            <div class="container-fluid">
                                <ul class="list-inline pull-right">
                                    <li>
                                        <a class="btn btn-default prev-step">Regresar</a>
                                    </li>
                                    <li>
                                        <a class="btn btn-primary" @click="_btnGenerarReporte">Generar Reporte</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Fin Step 3 -->
            </div>

        </div>
    </div>
</div>