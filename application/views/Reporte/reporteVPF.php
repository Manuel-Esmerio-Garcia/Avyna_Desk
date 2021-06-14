<br>
<div id="VPF">
    <div class="container-fluid">
        <loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>

        <div class="fluid-container">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="fluid-container">
                            <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">
                                <div class="form-goup">
                                    <label>Fecha Inicio:</label>
                                    <datetime :bootstrap-styling="true" v-model="filter.initialDate"></datetime>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
                                <div class="form-goup">
                                    <label>Fecha Fin:</label>
                                    <datetime :bootstrap-styling="true" v-model="filter.endDate"></datetime>
                                </div>
                            </div>
                            <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2">
                                <div class="form-goup">
                                    <button type="button" class="btn btn-primary" style="margin-top: 23px;" @click="_changeFilter"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                            <div class="col-lg-1 col-md-1 col-sm-6 col-xs-6">
                                <div class="form-goup">
                                    <label>Timbrado:</label>
                                    <select class="form-control" v-model="filter.timbrado" @change="_changeFilter">
                                        <option value="">N/A</option>
                                        <option value="1">Si</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">
                                <div class="form-goup">
                                    <label>Sucursal:</label>
                                    <select class="form-control" v-model="filter.branchSelected" @change="_changeFilter">
                                        <option value="">Seleccionar...</option>
                                        <option v-for="(branch, index) in listBranch" :value="branch.ID">{{branch.Sucursal}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div class="form-goup">
                                    <label>Distribuidor:</label>
                                    <select class="form-control" v-model="filter.dealerSelected" @change="_changeFilter">
                                        <option value="">Seleccionar...</option>
                                        <option v-for="(dealers, index) in objListDealers" :value="dealers.ID">{{dealers.Nombre + "  " + dealers.Apellidos}}</option>
                                    </select>
                                </div>
                            </div>
                            

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 table-responsive">
                            <br><br>
                                <table class="table table-striped table-bordered table-hover" id="tableVPF">
                                    <caption>Listado de Ventas</caption>
                                    <thead>
                                    <tr>
                                        <th class="bg-info">ID</th>
                                        <th class="bg-info">Fecha Venta</th>
                                        <th class="bg-info">Distribuidor</th>
                                        <th class="bg-info">Sucursal</th>
                                        <th class="bg-info">Total (Precio Distribuidor)</th>
                                        <th class="bg-info">Subtotal</th>
                                        <th class="bg-info">Impuesto</th>
                                        <th class="bg-info">Status</th>
                                        <th class="bg-info">Timbrado</th>
                                        <th class="bg-warning">Fecha Pago</th>
                                        <th class="bg-warning">Monto Pago</th>
                                        <th class="bg-warning">Banco</th>
                                        <th class="bg-danger">Fecha Factura</th>
                                        <th class="bg-danger">Monto Factura</th>
                                        <th class="bg-danger">Tipo Factura</th>
                                        <th class="bg-danger">UUID</th>
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