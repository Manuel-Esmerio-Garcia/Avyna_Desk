<!-- Page Content -->
<br>
<div class="container-fluid">
    <div class="row">

        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <label for="selectDistribuidor">Distribuidor</label>
            <select class="form-control" name="selectDistribuidor" id="selectDistribuidor" onchange="changeDistribuidor()">
                <option value="">Seleccionar...</option>
                <?php foreach ($Distribuidor as $key => $value) { ?>
                    <option value="<?php echo $value['ID']; ?>"><?php echo utf8_encode(utf8_decode($value["Nombre"])) . ' ' . utf8_encode(utf8_decode($value["Apellidos"])); ?></option>
                <?php } ?>
            </select>
        </div>

        <div class="col-lg-4 col-md-10 col-sm-10 col-xs-10">
            <div class="form-group">
                <label>Fecha:</label>
                <input type="text" class="form-control" id="txtDate"
                    autocomplete="off">
            </div>
        </div>

        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="changeDistribuidor()">
                <i class="glyphicon glyphicon-refresh"></i>
            </button>
        </div>

        <!-- Visitas del dia -->
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="display: none">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Visitas a salones el dia de hoy</h3>
                </div>
                <div class="box-body">

                <table class="table table-striped table-bordered table-hover" id="fetchCustomer" style="display: block; max-height: 380px;">
                    <thead style="width: 100%; display: inline-table;">
                        <tr>
                            <th id="txtActualDay" style="text-align: center;"  colspan="2"></th>
                        </tr>
                    </thead>
                    <tbody style="width: 100%; display: inline-table;">                    
                    </tbody>
                </table>

                </div>
                <div class="box-footer">
                </div>
            </div>
        </div>
        <!-- End visitas del dia -->

        
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

            <!-- Visitas a salones de la semana -->
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Visitas a salones en la semana</h3>
                    <div class="box-tools pull-right">
                        <span id="spanDay"></span> </br>
                        <span id="spanDate"></span>
                    </div>
                </div>
                <div class="box-body">

                    <div class="form-group">
                        <label for="selectWeek">Semana:</label>
                        <select name="selectWeek" id="selectWeek" class="form-control" onchange="changeWeek()">
                            <option value="0">Par</option>
                            <option value="1">Non</option>
                        </select>
                    </div>

                    <div class="table-responsive" style="max-height: 380px;">
                    <table class="table table-striped table-bordered table-hover" id="fetchWeek">
                        <thead>
                            <tr>
                                <th>Lunes</th>
                                <th>Martes</th>
                                <th>Miércoles</th>
                                <th>Jueves</th>
                                <th>Viernes</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    </div>
                </div>
            </div>
            <!-- End Visitas a salones de la semana -->

        </div>
        

        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                <!-- Semanas y dias con mas salones -->
                <div class="form-group box">
                    <div class="box-header with-border bg-primary" style="color: white;"> 
                        <!-- <h3 class="box-title">Semana y día con más salones visitados</h3> -->
                        <h3 class="box-title">Día con más ventas a salones en las 4 semanas últimas</h3>
                    </div>
                    <div class="box-body">
                    <table class="table table-striped table-bordered table-hover">
                        <tbody>
                            <tr>
                                <td>Semana:</td>
                                <td id="plusWeek"></td>
                            </tr>
                            <tr>
                                <td>Dia:</td>
                                <td id="plusday"></td>
                            </tr>
                            <tr>
                                <td>Salones:</td>
                                <td id="plusCount"></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="box-footer">
                    </div>
                </div>
                <!-- END Semanas y dias con mas salones -->
            </div>

            <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                <!-- Semana y día con más ventas ($) últimas 4 semanas -->
                <div class="form-group box">
                    <div class="box-header with-border bg-primary" style="color: white;">
                        <h3 class="box-title">Semana y día con más ventas ($) últimas 4 semanas</h3>
                    </div>
                    <div class="box-body">
                    <table class="table table-striped table-bordered table-hover">
                        <tbody>
                            <tr>
                                <td>Semana:</td>
                                <td id="weekSalePlus"></td>
                            </tr>
                            <tr>
                                <td>Dia:</td>
                                <td id="weekDayPlus"></td>
                            </tr>
                            <tr>
                                <td>Monto:</td>
                                <td id="SalePlus"></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="box-footer">
                    </div>
                </div>
                <!-- Semana y día con más ventas ($) últimas 4 semanas -->
            </div>
            
            <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                <!-- Semanas y dias con menos salones -->
                <div class="box">
                    <div class="box-header with-border bg-primary" style="color: white;">
                        <!-- <h3 class="box-title">Semana y día con menos salones visitados</h3> -->
                        <h3 class="box-title">Día con menos ventas a salones en las 4 semanas últimas</h3>
                    </div>
                    <div class="box-body">
                    <table class="table table-striped table-bordered table-hover">
                        <tbody>
                            <tr>
                                <td>Semana:</td>
                                <td id="lessWeek"></td>
                            </tr>
                            <tr>
                                <td>Dia:</td>
                                <td id="lessday"></td>
                            </tr>
                            <tr>
                                <td>Salones:</td>
                                <td id="lessCount"></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="box-footer">
                    </div>
                </div>
                <!-- END Semanas y dias con menos salones -->
            </div>

            <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                <!-- Semana y día con más ventas ($) últimas 4 semanas -->
                <div class="form-group box">
                    <div class="box-header with-border bg-primary" style="color: white;">
                        <h3 class="box-title">Semana y día con menos ventas ($) últimas 4 semanas</h3>
                    </div>
                    <div class="box-body">
                    <table class="table table-striped table-bordered table-hover">
                        <tbody>
                            <tr>
                                <td>Semana:</td>
                                <td id="weekSaleLess"></td>
                            </tr>
                            <tr>
                                <td>Dia:</td>
                                <td id="weekDayLess"></td>
                            </tr>
                            <tr>
                                <td>Monto:</td>
                                <td id="SaleLess"></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="box-footer">
                    </div>
                </div>
                <!-- Semana y día con más ventas ($) últimas 4 semanas -->
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div class="box box-danger">
                    <div class="box-header with-border">
                        <h3 class="box-title">Ventas ultimas 4 semanas</h3>
                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                        </div>
                    </div>
                    <div class="box-body">
                        <div id="pieChartNon">
                            <canvas id="myChart" width="400" height="400"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">Cantidad ventas de la semana ultimas 4 semanas</h3>
                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                        </div>
                    </div>
                    <div class="box-body">
                        <div id="pieChartPar">
                            <canvas id="myCant" width="400" height="400"></canvas>
                        </div>                        
                    </div>
                </div>
            </div>

        </div>
        
    </div>
</div>

