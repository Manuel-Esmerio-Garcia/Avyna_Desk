<br>
<div id="VPF">
    <div class="container-fluid">
        <loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>

        <div class="fluid-container">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="fluid-container">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="form-goup">
                                    <label>Sucursal:</label>
                                    <select class="form-control" v-model="filter.branchSelected">
                                        <option value="">Seleccionar...</option>
                                        <option v-for="(branch, index) in listBranch" :value="branch.ID">{{branch.Sucursal}}</option>
                                    </select>
                                </div>
                            </div>

                                
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                                <div class="form-goup"> 
                                    <label>Factor Sugerido Compra:</label>
                                    <input type="number" class="form-control" placeholder="Factor Sugerido Compra" @change="_cleanTable" v-model="filter.calculo" aria-label="Factor Sugerido Compra" aria-describedby="basic-addon2">
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">
                                <div class="form-goup" style="margin-top: 25px;">
                                    <button class="btn btn-info" @click="_changeFilter">Calcular</button>
                                </div>
                            </div>                              

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 table-responsive">
                            <br><br>
                                <table class="table table-striped table-bordered table-hover" id="tableVS">
                                    <caption>Listado de Ventas</caption>
                                    <thead>
                                    <tr>
                                        <th class="bg-info">Producto</th>
                                        <th class="bg-info">Existencias</th>
                                        <th class="bg-info">Apartados</th>
                                        <th class="bg-info">Disponibles</th>
                                        <th class="bg-info">Faltante</th>
                                        <th class="bg-info">En Compra</th>
                                        <th class="bg-info">Factor Sugerido Compra</th>
                                        <th class="bg-info">Minimo</th>
                                        <th class="bg-info">Precio Publico</th>
                                        <th class="bg-info">Proveedor</th>
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