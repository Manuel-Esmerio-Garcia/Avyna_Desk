<br>
<div id="pickOrder">
	<div class="container-fluid">
        <loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>
		<div class="row">
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="form-group">
                    <label>Seleccionar Bodega:</label>
                    <select class="form-control" v-model="branch" @change="_changeBranch">
                        <option value="">Seleccionar...</option>
                        <option v-for="(branch, index) in listBranch" :value="branch.ID">{{branch.Sucursal}}</option>
                    </select>
                </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="form-group">
                    <label>Seleccionar Extracción:</label>
                    <select class="form-control" v-model="order" @change="_changeOrder">
                        <option value="">Seleccionar...</option>
                        <option v-for="(order, index) in listExtracciones" :value="order.ID">{{order.ID + '|' + order.Fecha_venta + '|' + order.Distribuidor}}</option>
                    </select>
                </div>
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group">
                    <label>Buscador de Productos:</label>
                    <input type="text" class="form-control" ref="search" style="max-width: 400px;" v-model="search" @keyup.enter="_searchProducts">
                </div>
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="panel panel-default">
                    <div class="panel-heading">Picking</div>
                    <div class="panel-body">
                        <div class="table-responsive" style="max-height: 500px;">
                            <table class="table table-striped table-bordered table-hover" id="fetchProductsOrder" width="100%">
                                <caption>Productos del Pedido</caption>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Locacion</th>
                                        <th>Codigo</th>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(order, index) in listOrderProducts">
                                        <td>{{order.ID}}</td>
                                        <td>{{order.Locacion}}</td>
                                        <td>{{order.Codigo}}</td>
                                        <td>{{order.Producto}}</td>
                                        <td>{{order.Cantidad}}</td>
                                        <td>
                                            <button class="btn btn-primary" @click="_addProduct(order,index)"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="panel-footer">
                        <div class="container-fluid">
                            <p>Productos Restante: <span>{{CantidadRestante}}</span></p>
                            <button class="btn btn-primary" style="float: right;" @click="_realizarPicking">Realizar Picking</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="panel panel-default">
                    <div class="panel-heading">Productos Tomados</div>
                    <div class="panel-body">
                        <div class="table-responsive" style="max-height: 500px;">
                            <table class="table table-striped table-bordered table-hover" id="fetchProductsOrderAdd" width="100%">
                                <caption>Productos Tomados</caption>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Locacion</th>
                                        <th>Codigo</th>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(order, index) in listOrderProductsAdd">
                                        <td>{{order.ID}}</td>
                                        <td>{{order.Locacion}}</td>
                                        <td>{{order.Codigo}}</td>
                                        <td>{{order.Producto}}</td>
                                        <td>{{order.Cantidad}}</td>
                                        <td>
                                            <button class="btn btn-primary" @click="_deleteProduct(order,index)"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>