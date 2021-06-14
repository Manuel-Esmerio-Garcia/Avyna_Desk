<br>
<div id="reporte">
    <loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>
	<div class="container-fluid">
        <div class="fluid-container">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="fluid-container">    
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <br>
                                <div class="form-goup">
                                    <label>Sucursal:</label>
                                    <select class="form-control" v-model="branch" @change="_changeBranch">
                                        <option value="">Seleccionar...</option>
                                        <option v-for="(branch, index) in listBranch" :value="branch.ID">{{branch.Sucursal}}</option>
                                    </select>
                                </div>
                                <br>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="table-responsive">
                                    <table id="fetchExtracciones" class="table table-striped table-bordered" style="width: 100%">
                                        <caption></caption>
                                        <thead>
                                            <th>ID</th>
                                            <th>Fecha</th>
                                            <th>Usuario</th>
                                            <th>Producto</th>
                                            <th>Locacion</th>
                                            <th>Lote</th>
                                            <th>Cantidad</th>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(list, index) in listExtraccion">
                                                <td>{{list.ID}}</td>
                                                <td>{{list.Fecha_hora}}</td>
                                                <td>{{list.Usuario}}</td>
                                                <td>{{list.Producto}}</td>
                                                <td>{{list.Locacion}}</td>
                                                <td>{{list.Lote}}</td>
                                                <td>{{list.Cantidad}}</td>
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
    </div>
</div>