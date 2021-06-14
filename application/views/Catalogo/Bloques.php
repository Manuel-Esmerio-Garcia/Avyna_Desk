<!-- Page Content -->
<br>

<div id="page-wrapper">
 <div class="container-fluid">

 	<div class="col-md-12">
          <div class="box">
            <div class="box-header with-border">
              <h3 class="box-title">Bloques Distribuidores</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <div class="btn-group">
                  <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-wrench"></i></button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a id="Option_Agregar_Distribuidor">Agregar</a></li>
                    <li><a id="Option_Editar_Distribuidor">Editar</a></li>
                    <li class="divider"></li>
                    <li><a id="Option_Eliminar_Distribuidor">Eliminar</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="table-responsive col-lg-12">
                 <table id="Table_Bloques" class="table table-hover table-striped table-bordered table-condensed" width="100%">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Bloque</td>
                        <td>Descripción</td>
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
				        <button class="btn btn-success btn-xs btn-flat" id="Agregar_Bloques"><span class="glyphicon glyphicon-plus"></span></button>
                <button class="btn btn-warning btn-xs btn-flat" id="Editar_Bloques"><span class="glyphicon glyphicon-pencil"></span> </button>
                <button class="btn btn-danger btn-xs btn-flat" id="Eliminar_Bloques"><span class="glyphicon glyphicon-trash"></span></button>
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
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Agregar Bloques</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="form-group">
            <label for="txtBloque">Bloque:</label>
            <input type="text" id="txtBloque" class="form-control">
          </div>

          <div class="wrap" id="Cargando_Agregar" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>

          <div class="form-group">
            <label for="txtDescripcion">Descripción:</label>
            <textarea id="txtDescripcion" class="form-control" style="resize: none;"></textarea>
          </div>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="btn_Guardar_Bloque">Guardar</button>
      </div>
    </div>

  </div>
</div>


<!-- Modal -->
<div id="Modal_Editar" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Bloques</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">

          <div class="form-group">
            <div class="checkbox" style="float: right;">
              <label><input id="check_Status" type="checkbox"> Inactivo</label>
            </div>
          </div>

          <div class="form-group">
            <label for="txtBloque_Editar">Bloque:</label>
            <input type="text" id="txtBloque_Editar" class="form-control">
          </div>

          <div class="wrap" id="Cargando_Editar" style="display: none;">
            <div class="loading">
              <div class="bounceball"></div>
              <div class="text">&nbsp; &nbsp; Cargando...</div>
            </div>
          </div>

          <div class="form-group">
            <label for="txtDescripcion_Editar">Descripción:</label>
            <textarea id="txtDescripcion_Editar" class="form-control" style="resize: none;"></textarea>
          </div>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-warning" id="btn_Editar_Bloque">Guardar Cambios</button>
      </div>
    </div>

  </div>
</div>