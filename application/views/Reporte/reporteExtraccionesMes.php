<br>
<div id="extracciones">
    <div class="container-fluid">
        <loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>

        <div class="fluid-container">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="fluid-container">                       
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 table-responsive">
                                <table class="table table-striped table-bordered table-hover" id="tableExtracciones">
                                    <thead>
                                    <tr>
                                        <th class="bg-info">Producto</th>
                                        <th class="bg-info">Mes Venta</th>
                                        <th class="bg-info">Cantidad Venta</th>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <div class="panel-footer">
                        <div class="container">
                            <div id="example-2">
                                <button class="btn btn-success" type="button" @click="btnExport">Exportar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>