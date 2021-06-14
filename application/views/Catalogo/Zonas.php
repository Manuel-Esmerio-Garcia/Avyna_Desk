<!-- Page Content -->
<br>

<div id="page-wrapper">
 <div class="container-fluid">

 	<div class="col-md-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Zonas Distribuidores</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="table-responsive col-lg-12">
                 <table id="Table_Zonas" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Zona</td>
                        <td>Descripción</td>
                        <td>Población</td>
                        <td>Bloque</td>
                        <td>Distribuidor</td>
                        <td>Cuota Final</td>
                        <td>Status</td>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
              </div>
              <!-- /.row -->
            </div>
            <!-- ./box-body -->
            <div class="box-footer">
				        <button class="btn btn-success btn-xs btn-flat" id="Agregar_Zonas"><span class="glyphicon glyphicon-plus"></span></button>
                <button type="button" class="btn btn-success btn-xs btn-flat" disabled="disabled" style="display: none;" id="loading_Agregar_Zonas"><i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i></button>

                <button class="btn btn-warning btn-xs btn-flat" id="Editar_Zonas"><span class="glyphicon glyphicon-pencil"></span> </button>
                <button type="button" class="btn btn-warning btn-xs btn-flat" disabled="disabled" style="display: none;" id="loading_Editar_Zonas"><i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i></button>

                <button class="btn btn-danger btn-xs btn-flat" id="Eliminar_Zonas"><span class="glyphicon glyphicon-trash"></span></button>
                <button type="button" class="btn btn-danger btn-xs btn-flat" disabled="disabled" style="display: none;" id="loading_Eliminar_Zonas"><i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i></button>
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>

 </div>
</div>


<!-- Modal -->
<div id="Modal_Agregar" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" style="background-color: #3c8dbc; color: white;">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Agregar Zona</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="form-group">
            <label for="txtZona">Zona:*</label>
            <input type="text" name="txtZona" id="txtZona" class="form-control">
          </div>

          <div class="form-group">
            <label for="txtDescripcion">Descripción:</label>
            <textarea name="txtDescripcion" id="txtDescripcion" class="form-control" style="resize: none;"></textarea>
          </div>

          <div class="form-group">
            <label for="txtPoblacion">Población:</label>
            <input type="text" name="txtPoblacion" id="txtPoblacion" class="form-control">
          </div>

          <div class="form-group">
            <label for="textBloque">Bloque:</label>
            <select name="textBloque" id="textBloque" class="form-control">
              <option value="">Seleccionar...</option>
              <?php foreach ($Bloque as $key => $value) { ?>
                <option value="<?php echo $value['ID'] ?>"><?php echo $value['Bloque'] ?></option>
              <?php } ?>
            </select>
          </div>

          <div class="form-group">
            <label for="textCliente">Cliente:</label>
            <select name="textCliente" id="textCliente" class="form-control">
              <option value="">Seleccionar...</option>
              <?php foreach ($Cliente as $key => $value) { ?>
                <option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'].' '.$value['Apellidos'] ?></option>
              <?php } ?>
            </select>
          </div>

          <div class="form-group">
            <label for="txtCuota">Cuota Final:*</label>
            <input type="number" name="txtCuota" id="txtCuota" class="form-control">
          </div>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" id="btn_Cerrar_Agregar">Cerrar</button>
        <button type="button" class="btn btn-danger" disabled="disabled" style="display: none;" id="loading_Cerrar_Agregar"><i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i> &nbsp; Loading...</button>

        <button type="button" class="btn btn-primary" id="btn_Guardar">Guardar</button>
        <button type="button" class="btn btn-primary" disabled="disabled" style="display: none;" id="loading_Guardar"> <i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i> &nbsp; Loading...</button>
      </div>
    </div>

  </div>
</div>


<!-- Modal -->
<div id="Modal_Editar" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" style="background-color: #f0ad4e; color: white;">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Zona</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
    
          <div class="form-group">
            <div class="checkbox" style="float: right;">
              <label><input type="checkbox" id="checkStatus" value="Inactivo">Inactivo</label>
            </div>
          </div>

          <div class="form-group">
            <label for="txtZona_Editar">Zona:*</label>
            <input type="text" name="txtZona_Editar" id="txtZona_Editar" class="form-control">
          </div>

          <div class="form-group">
            <label for="txtDescripcion_Editar">Descripción:</label>
            <textarea name="txtDescripcion_Editar" id="txtDescripcion_Editar" class="form-control" style="resize: none;"></textarea>
          </div>

          <div class="form-group">
            <label for="txtPoblacion_Editar">Población:</label>
            <input type="text" name="txtPoblacion_Editar" id="txtPoblacion_Editar" class="form-control">
          </div>

          <div class="form-group">
            <label for="textBloque_Editar">Bloque:</label>
            <select name="textBloque_Editar" id="textBloque_Editar" class="form-control">
              <option value="">Seleccionar...</option>
              <?php foreach ($Bloque as $key => $value) { ?>
                <option value="<?php echo $value['ID'] ?>"><?php echo $value['Bloque'] ?></option>
              <?php } ?>
            </select>
          </div>

          <div class="form-group">
            <label for="textCliente_Editar">Cliente:</label>
            <select name="textCliente_Editar" id="textCliente_Editar" class="form-control">
              <option value="">Seleccionar...</option>
              <?php foreach ($Cliente as $key => $value) { ?>
                <option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'].' '.$value['Apellidos'] ?></option>
              <?php } ?>
            </select>
          </div>

          <div class="form-group">
            <label for="txtCuota_Editar">Cuota Final:*</label>
            <input type="number" name="txtCuota_Editar" id="txtCuota_Editar" class="form-control">
          </div>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" id="btn_Cerrar_Editar">Cerrar</button>
        <button type="button" class="btn btn-danger" disabled="disabled" style="display: none;" id="loading_Cerrar_Editar"><i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i> &nbsp; Loading...</button>

        <button type="button" class="btn btn-warning" id="btn_Editar">Guardar Cambios</button>
        <button type="button" class="btn btn-warning" disabled="disabled" style="display: none;" id="loading_Editar"> <i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i> &nbsp; Loading...</button>
      </div>
    </div>

  </div>
</div>