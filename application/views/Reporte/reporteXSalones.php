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
                                <div class="form-goup">
                                    <label>Fecha Inicio:</label>
                                    <datetime :bootstrap-styling="true" v-model="filter.initialDate"></datetime>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-10 col-xs-10">
                                <div class="form-goup">
                                    <label>Fecha Fin:</label>
                                    <datetime :bootstrap-styling="true" v-model="filter.endDate"></datetime>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <div class="form-goup">
                                    <button type="button" class="btn btn-primary" style="margin-top: 23px;" @click="_changeFilter"><i class="fa fa-search"></i></button>
                                </div>
                            </div> 

                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <br>
                                <div class="form-goup">
                                    <label>Distribuidor:</label>
                                    <select class="form-control" v-model="filter.customer" @change="_changeCustomer">
                                        <option value="">Seleccionar...</option>
                                        <option v-for="(customer, index) in objCustomer" :value="customer.ID">{{customer.Nombre + ' ' + customer.Apellidos}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <br>
                                <div class="form-goup">
                                    <label>Nivel:</label>
                                    <select class="form-control" v-model="filter.nivel" @change="_changeLevel">
                                        <option value="">Seleccionar...</option>
                                        <option v-for="(level, index) in objLevel" :value="level.Nivel">{{level.Nivel}}</option>
                                    </select>
                                </div>
                            </div>                          

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 table-responsive">
                            <br><br>
                                <table class="table table-striped table-bordered table-hover" id="fetchVentasXSalones">
                                    <caption>Listado de Ventas</caption>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre Cliente</th>
                                        <th>Apellidos Cliente</th>
                                        <th>Nivel</th>
                                        <th>Distribuidor</th>
                                        <th>Monto Ventas Periodo (Precio Publico)</th>
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
                            <button class="btn btn-success" @click="_exportReport">Exportar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>



