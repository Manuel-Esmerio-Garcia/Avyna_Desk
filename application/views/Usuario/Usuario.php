<div id="page-wrapper">
  <div class="container-fluid">
    <div class="row">
      <!-- Panel Info -->
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h4 class="panel-title">
          <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
          <a data-toggle="collapse" href="#collapse0"> Datos del Usuario <span class="glyphicon glyphicon-chevron-up pull-right"></span></a>
          </h4>
        </div>
        <div id="collapse0" class="panel-collapse collapse in">
          <?= form_open("Controller_Usuario/Guardar")?>
          <div class="panel-body">
            <div class="col-lg-12">
             <div class="checkbox" align="right">
              <label><input type="checkbox" name="Estatus_User" value=""> Inactivo</label>
             </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="label label-default">Nombre Completo:</label>
                <input type="text" class="form-control" name="Nombre_User" placeholder="Nombre Completo" value="" maxlength="50" required>
              </div>

              <div class="form-group">
                <label class="label label-default">Correo Electrónico Empresarial (Usuario Inicio de Sesión):</label>
                <input type="email" class="form-control" name="Email_User" placeholder="Correo Electrónico Empresarial  (Usuario Inicio de Sesión)" value="" maxlength="50" required>
              </div>

              <div class="form-group">
                <label class="label label-default">Telefono Empresarial:</label>
                <input type="tel" class="form-control" name="Telefono_User" placeholder="Telefono Empresarial" onkeypress="ValidaSoloNumeros()" value="" maxlength="13">
              </div>

              <div class="form-group">
                <label class="label label-default">Fecha de Nacimiento:</label>
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Fecha de Nacimiento" id="datepicker" readonly>
                  <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="label label-default">Telefono Opcional:</label>
                <input type="tel" class="form-control" name="Telefono_Opc_User" placeholder="Telefono Opcional" value="" maxlength="13">
              </div>
              <div class="form-group">
                <label class="label label-default">Puesto:</label>
                <select class="form-control" name="Puesto_User">
                  <option>Administrador</option>
                  <option>Asesor</option>
                </select>
              </div>
              <div class="form-group">
                <label class="label label-default">Rol:</label>
                <select class="form-control" name="Rol_User">
                  <option value="">Seleccionar...</option>
                  <?php foreach ($Rol as $key => $value) { ?>
                    <option value="<?php echo $value['ID'] ?>"><?php echo $value['Rol'] ?></option>
                  <?php } ?>
                </select>
              </div>
              <div class="form-group">
                <label class="label label-default">Contraseña:</label>
                <input type="password" class="form-control" name="Contraseña_User" placeholder="Contraseña" maxlength="50" required>
              </div>
              <div class="form-group">
                <label class="label label-default">Confirmar Contraseña:</label>
                <input type="password" class="form-control" name="ConfirmarContraseña_User" placeholder="Confirmar Contraseña" maxlength="50" required>
              </div>
            </div>
          </div>
          <div class="panel-footer">
            <div class="pull-right">
              <input type="submit" class="btn btn-primary" value='Agregar Usuario'>
            </div>
          </div>
          <?= form_close() ?>
        </div>
      <!-- FIN Linea de Codigo para Desplegar Formulario -->
      </div>

      <div class="panel panel-info">
        <div class="panel-heading">
          <h4 class="panel-title">
            <span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
            <a data-toggle="collapse" href="#collapse6"> &nbsp; Listado de Usuario <span class="glyphicon glyphicon-chevron-up pull-right"></span></a>
          </h4>
        </div>
        <div id="collapse6" class="panel-collapse collapse in">
          <div class="panel-body">
            <div id="ListaCliente">
              <table class="table table-bordered table-striped table-hover">
                <thead>
                  <tr class="info">
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Contraseña</th>
                    <th>Puesto</th>
                    <th><em class="fa fa-cog"></em></th>
                  </tr>
                </thead>
                <tbody>
                  <?php foreach ($Datos as $value) : ?>
                  <tr>
                    <td class="text-center"><?php echo $value->ID ?></td>
                    <td><?php echo $value->Nombre ?></td>
                    <td><?php echo $value->Email ?></td>
                    <td><?php echo $value->Password ?></td>
                    <td><?php echo $value->Puesto ?></td>
                    <td>
                      <a><button class="btn btn-default btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></a>
                      <a><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></span></button></a>
                    </td>
                  </tr>
                  <?php endforeach; ?>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Ventanas Modales -->
      <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header" style="background-color: #ec971f">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
              <h4 class="modal-title custom_align" id="Heading" style="text-align: center; color: white">Editar Usuario</h4>
            </div>
            <div class="modal-body">
              <div class="checkbox" align="right">
                <label><input type="checkbox" name="M_Estatus_User" value=""> Inactivo</label>
              </div>
              <div class="form-group">
                <label class="label label-default">Nombre Completo:</label>
                <input class="form-control" type="text" name="M_Nombre_User" placeholder="Nombre Completo" value="" maxlength="50" required>
              </div>
              <div class="form-group">
                <label class="label label-default">Correo Electrónico:</label>
                <input class="form-control" type="email" name="M_Email_User" placeholder="Correo Electrónico" value="" maxlength="50" required>
              </div>
              <div class="form-group">
                <label class="label label-default">Telefono:</label>
                <input type="tel" class="form-control" name="M_Telefono_User" placeholder="Telefono" value="" maxlength="13">
              </div>
              <div class="form-group">
                <label class="label label-default">Telefono Opcional:</label>
                <input type="tel" class="form-control" name="M_Telefono_Opc_User" placeholder="Telefono Opcional" value="" maxlength="13">
              </div>
              <div class="form-group">
                <label class="label label-default">Puesto:</label>
                <select class="form-control" name="M_Puesto_User">
                  <option>Administrador</option>
                  <option>Asesor</option>
                </select>
              </div>
              <div class="form-group">
                <label class="label label-default">Rol:</label>
                <select class="form-control" name="M_Rol_User">
                  <option value="">Seleccionar...</option>
                  <?php foreach ($Rol as $key => $value) { ?>
                    <option value="<?php echo $value['ID'] ?>"><?php echo $value['Rol'] ?></option>
                  <?php } ?>
                </select>
              </div>
             
              <hr>
              <div class="alert alert-warning">
                <h4 style="text-align: center;"> Cambiar Contraseña</h4>
              </div>

              <div class="form-group">
                <label class="label label-default">Contraseña:</label>
                <input type="password" class="form-control" name="Contraseña_User" placeholder="Contraseña" maxlength="50">
              </div>

              <div class="form-group">
                <label class="label label-default">Confirmar Contraseña:</label>
                <input type="password" class="form-control" name="ConfirmarContraseña_User" placeholder="Confirmar Contraseña" maxlength="50">
              </div>
            </div>
            <div class="modal-footer ">
              <button type="button" class="btn btn-warning btn-lg"><span class="glyphicon glyphicon-ok-sign"></span> Modificar</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="delete" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
              <h4 class="modal-title custom_align" id="Heading">Eliminar Usuario</h4>
            </div>
            <div class="modal-body" align="center">
              <div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> ¿Está seguro de que desea eliminar este registro?</div>
            </div>
            <div class="modal-footer ">
             <button type="button" class="btn btn-success"><span class="glyphicon glyphicon-ok-sign"></span> Si</button>
             <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> No</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>