<div id="coupons">
    <loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div class="form-group">
					<label for="selectBodega">Bodega:</label>
					<select name="selectBodega" id="selectBodega" class="form-control" @change="reloadTable" v-model="branch">
						<option value="">Seleccionar...</option>
				        <option v-for="item in listBranch" :value="item.ID">{{item.Sucursal}}</option>
					</select>
				</div>
			</div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<div class="form-group">
					<label for="selectDistribuidor">Distribuidor:</label>
					<select name="selectDistribuidor" id="selectDistribuidor" class="form-control" @change="reloadTable" v-model="client">
						<option value="">Seleccionar...</option>
				        <option v-for="item in listClient" :value="item.ID">{{item.Nombre + ' ' + item.Apellidos}}</option>
					</select>
				</div>
			</div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<div class="form-group">
					<label for="selectStatus">Status:</label>
					<select name="selectStatus" id="selectStatus" class="form-control" @change="reloadTable" v-model="status">
						<option value="">Seleccionar...</option>
                        <option value="Activo">Activo</option>
                        <option value="Vencido">Vencido</option>
                        <option value="Cancelado">Cancelado</option>
                        <option value="Canjeado">Canjeado</option>
					</select>
				</div>
			</div>
            <div class="col-lg-5 col-md-5 col-sm-6 col-xs-6">
                <div class="form-group">
                    <label>Desde:</label>
                    <div class="input-group input-daterange">
                        <input type="text" class="form-control" id="dateBegin" name="dateBegin"
                            autocomplete="off"
                            placeholder="<?php echo date('Y-m-d') ?>">
                        <span class="input-group-addon"><i
                                class="glyphicon glyphicon-calendar"></i></span>
                    </div>
                </div>
            </div>
            <div class="col-lg-5 col-md-5 col-sm-4 col-xs-4">
                <div class="form-group">
                    <label>Hasta:</label>
                    <div class="input-group input-daterange">
                        <input type="text" class="form-control" id="dateEnd" name="dateEnd"
                            autocomplete="off"
                            placeholder="<?php echo date('Y-m-d') ?>">
                        <span class="input-group-addon"><i
                                class="glyphicon glyphicon-calendar"></i></span>
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                <div class="form-group">
                    <button type="button" class="btn btn-primary" style="margin-top: 25px;" @click="reloadTable">
                        <i class="glyphicon glyphicon-search"></i>
                    </button>
                </div>
            </div>
            
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                <ul class="nav nav-tabs">
                    <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Distribuidores</a></li>
                    <li class=""><a href="#tab_2" data-toggle="tab" aria-expanded="false">Salones</a></li>
                </ul>
                <br>
                <div class="tab-content">
                    <div class="tab-pane active" id="tab_1">
                        <div class="box">
                            <div class="box-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" style="width: 100%" id="tableCupones">
                                        <thead>
                                            <th>ID</th>
                                            <th>Cupon</th>
                                            <th>N° Distribuidor</th>
                                            <th>Distribuidor</th>
                                            <th>Fecha</th>
                                            <th>Fecha de inicio</th>
                                            <th>Fecha de vencimiento</th>
                                            <th>Tipo</th>
                                            <th>Modo</th>
                                            <th>Monto</th>
                                            <th>Status</th>
                                        </thead>
                                        <tbody>
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="box-footer clearfix">
                                <button type="button" class="btn btn-success" @click="addCoupon"><i class="fa fa-plus" aria-hidden="true"></i></button>
                                <button type="button" class="btn btn-warning" @click="editCoupon"><i class="fa fa-edit" aria-hidden="true"></i></button>
                                <button type="button" class="btn btn-danger" @click="deleteCoupon"><i class="fa fa-remove" aria-hidden="true"></i></button>
                            </div>
                    
                        </div>
                    </div>
                    <!-- /.tab-pane -->
                    <div class="tab-pane" id="tab_2">
                        <div class="box">
                            <div class="box-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" style="width: 100%" id="tableCuponesSalones">
                                        <thead>
                                            <th>ID</th>
                                            <th>Cupon</th>
                                            <th>N° Salon</th>
                                            <th>Salon</th>
                                            <th>Tipo Salon</th>
                                            <th>Fecha</th>
                                            <th>Fecha de inicio</th>
                                            <th>Fecha de vencimiento</th>
                                            <th>Tipo</th>
                                            <th>Modo</th>
                                            <th>Monto</th>
                                            <th>Status</th>
                                        </thead>
                                        <tbody>  
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="box-footer clearfix">
                                <button type="button" class="btn btn-success" @click="addCouponSalon"><i class="fa fa-plus" aria-hidden="true"></i></button>
                                <button type="button" class="btn btn-warning" @click="editCouponSalon"><i class="fa fa-edit" aria-hidden="true"></i></button>
                                <button type="button" class="btn btn-danger" @click="deleteCouponSalon"><i class="fa fa-remove" aria-hidden="true"></i></button>

                                <button type="button" class="btn btn-primary" @click="generarCoupon" style="float: right;">Generar Cupones Automaticos</button>

                            </div>
                    
                        </div>
                    </div>
                    <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->

            </div>

        </div>
    </div>


    <div class="modal" tabindex="-1" role="dialog" id="modalCoupon">
        <loading :active="mCoupon.active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>

        <div class="modal-dialog" role="document">
            <div class="modal-content modal-sm">
                <div :class="mCoupon.header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h5 class="modal-title">{{mCoupon.tittle}}</h5>                
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="form-group">
                                <label for="txtCupon">Cupon:</label>
                                <div class="input-group">
                                    <input name="txtCupon" type="text" class="form-control" v-model="Coupon.Cupon" readonly>
                                    <span class="input-group-addon" @click="refreshCoupon"><i class="fa fa-refresh"></i></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="selectDistribuidor">Distribuidor:</label>
                                <select name="selectDistribuidor" class="form-control" v-model="Coupon.idCliente" v-if="mCoupon.vtype" @change="changeClient">
                                    <option value="">Seleccionar...</option>
                                    <option v-for="item in listClient" :value="item.ID">{{item.Nombre + ' ' + item.Apellidos}}</option>
                                </select>

                                <select name="selectDistribuidor" class="form-control" v-model="Coupon.idCliente" v-else>
                                    <option value="">Seleccionar...</option>
                                    <option v-for="item in listClient" :value="item.ID">{{item.Nombre + ' ' + item.Apellidos}}</option>
                                </select>
                            </div>
                            <div class="form-group" v-if="mCoupon.vtype">
                                <label for="selectSalon">Salon:</label>
                                <select name="selectSalon" class="form-control" v-model="Coupon.idCliente_menudeo">
                                    <option value="">Seleccionar...</option>
                                    <option v-for="item in listSalon" :value="item.ID">{{item.Nombre + ' ' + item.Apellidos}}</option>
                                </select>
                            </div>
                            <div class="form-group input-daterange">
                                <label for="txtdate">Fecha Inicio:</label>
                                <input type="text" class="form-control" id="dateInicio">
                            </div>
                            <div class="form-group input-daterange">
                                <label for="txtdate">Fecha Vencimiento:</label>
                                <input type="text" class="form-control" id="dateVencimiento">
                            </div>
                            <div class="form-group" v-if="!mCoupon.validate">
                                <label for="selectTipo">Status:</label>
                                <select name="selectTipo" class="form-control" v-model="Coupon.Status">
                                    <option value="Activo">Activo</option>
                                    <option value="Vencido">Vencido</option>
                                    <option value="Cancelado">Cancelado</option>
                                    <option value="Canjeado">Canjeado</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="selectTipo">Tipo:</label>
                                <select name="selectTipo" class="form-control" v-model="Coupon.Tipo">
                                    <option value="">Seleccionar...</option>
                                    <option value="General">General</option>
                                    <option value="Promocion">Promocion</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="selectTipo">Modo:</label>
                                <select name="selectTipo" class="form-control" v-model="Coupon.Modo">
                                    <option value="">Seleccionar...</option>
                                    <option value="Monto">Monto</option>
                                    <option value="Porcentaje">Porcentaje</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="txtMonto">Monto:</label>
                                <input name="txtMonto" type="number" class="form-control" v-model="Coupon.Monto">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" v-if="!mCoupon.vtype">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" v-if="mCoupon.validate" @click="saveCoupon">Guardar</button>
                    <button type="button" class="btn btn-warning" v-else @click="updateCoupon">Guardar Cambios</button>
                </div>
                <div class="modal-footer" v-else>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" v-if="mCoupon.validate" @click="saveCoupon">Guardar</button>
                    <button type="button" class="btn btn-warning" v-else @click="updateCoupon">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="modalGenerar">
        <loading :active="mGenerar.active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>

        <div class="modal-dialog" role="document">
            <div class="modal-content modal-lg">
                <div :class="mGenerar.header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h5 class="modal-title">{{mGenerar.tittle}}</h5>                
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label for="selectNivel">Nivel:</label>
                                    <select name="selectNivel" id="selectNivel" class="form-control" v-model="Generar.Nivel">
                                        <option value="">Seleccionar...</option>
                                        <option value="Red">Red</option>
                                        <option value="Black">Black</option>
                                        <option value="Platino">Platino</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label for="txtMonto">Monto Minimo:</label>
                                    <input name="txtMonto" type="number" class="form-control" v-model="Generar.Monto">
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label>Desde:</label>
                                    <div class="input-group input-daterange">
                                        <input type="text" class="form-control" id="FechaGStart" name="FechaGStart"
                                            autocomplete="off"
                                            placeholder="<?php echo date('Y-m-d') ?>">
                                        <span class="input-group-addon"><i
                                                class="glyphicon glyphicon-calendar"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label>Hasta:</label>
                                    <div class="input-group input-daterange">
                                        <input type="text" class="form-control" id="FechaGEnd" name="FechaGEnd"
                                            autocomplete="off"
                                            placeholder="<?php echo date('Y-m-d') ?>">
                                        <span class="input-group-addon"><i
                                                class="glyphicon glyphicon-calendar"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label for="txtCupon">% Cupon:</label>
                                    <input name="txtCupon" type="number" class="form-control" v-model="Generar.Cupon">
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <button class="btn btn-primary" type="button" style="margin-top: 23px;" @click="btnProcesar">Procesar</button>
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered table-hover" style="width: 100%" id="tableListCupones">
                                    <thead>
                                        <th>Cupon</th>
                                        <th>N° Salon</th>
                                        <th>Salon</th>
                                        <th>Tipo Salon</th>
                                        <th>Monto Ventas</th>
                                        <th>Monto Cupon</th>
                                        <th>#</th>
                                    </thead>
                                    <tbody>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="btnGenerarCupones">Generar y Enviar</button>
                </div>
            </div>
        </div>
    </div>
</div>