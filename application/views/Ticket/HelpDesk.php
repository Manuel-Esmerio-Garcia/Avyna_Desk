
<br>
<div id="page-wrapper">
	<div class="container-fluid">
		<div id="page-wrapper">
 			<div class="container-fluid">

				<div class="col-lg-12">
								<div class="col-lg-2">
									<label>Desde:</label>
									<div class="input-group">
										<input type="text" name="Ticket_HelpDesk_Desde" id="Ticket_HelpDesk_Desde" class="form-control">
										<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
									</div>
								</div>
								<div class="col-lg-2">
									<label>Hasta:</label>
									<div class="input-group">
										<input type="text" name="Ticket_HelpDesk_Hasta" id="Ticket_HelpDesk_Hasta" class="form-control" max="<?php echo date("Y-m-d"); ?>" >
										<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
									</div>
								</div>
								<div class="col-lg-2">
									<div class="form-group">
										<input type="submit" name="Ticket_HelpDesk_Buscar" id="Ticket_HelpDesk_Buscar" class="btn btn-info btn-sm" value="Buscar" style="margin-top: 25px;">
									</div>
								</div>

							<div class="col-lg-3">
								<div class="form-group">
									<label>Estatus:</label>
									<select id="Ticket_HelpDesk_cmb_Estatus" name="Ticket_HelpDesk_cmb_Estatus" class="form-control">
										<option value="">Seleccionar...</option>
										<option value="Resuelto">Resuelto</option>
										<option value="Pendiente">Pendiente</option>
										<option value="En Proceso">En proceso</option>
									</select>
								</div>
							</div>
							<div class="col-lg-3">
								<div class="form-group">
									<label>Usuario:</label>
									<select id="Ticket_HelpDesk_cmb_Usuario" name="Ticket_HelpDesk_cmb_Usuario" class="form-control">
										<option value="">Seleccionar...</option>
										<?php foreach ($Filtro as $value) {  ?>
											<option value="<?php echo $value['ID'] ?>"><?php echo $value['Usuario'] ?></option>

										<?php } ?>
									</select>
								</div>
							</div>
						</div>



							<div class="col-md-12">
						        <div class="box">
						            <div class="box-header with-border">
						              <h3 class="box-title">HelpDesk</h3>
						            </div>
						            <!-- /.box-header -->
						            <div class="box-body">
						              <div class="table-responsive">
			                			<table id="Table_Ticket_HelpDesk" class="table table-striped table-bordered table-responsive table-hover table-condensed" cellspacing="0" width="100%">
			                    			<thead>
				                                <tr>
				                                    <th width="20">ID</th>
				                                    <th width="150">Fecha</th>
				                                    <th width="200">Usuario</th>
				                                    <th width="150">Titulo</th>
				                                    <th>Descripción</th>
				                                    <th width="50">Status</th>
				                                    <th width="25">ID Usuario</th>
				                                </tr>
				                            </thead>
				                            <tbody>	                            		
			                    			</tbody>
			                			</table>

			                		   </div>
						            </div>
						            <!-- /.box-body -->
						            <div class="box-footer clearfix">
						            	<button name="Editar_Ticket_HelpDesk" id="Editar_Ticket_HelpDesk" class="btn btn-success" data-toggle="modal">Comentar Ticket</button>
						            </div>
						          </div>
						        </div>
		        </div>
	 		</div>
	 	</div>
	 </div>


	 <div class="wrap" id="Cargando" style="display: none;">
      <div class="loading">
        <div class="bounceball"></div>
        <div class="text">&nbsp; &nbsp; Cargando...</div>
      </div>
    </div>



	 <!-- Modal Comentar Ticket -->
					<div id="ComentarTicket" tabindex="-1" data-backdrop="static" data-keyboard="false" class="modal fade" aria-labelledby="ComentarTicket" aria-hidden="true" style="margin-left: auto; margin-right: auto;" role="dialog">
					  <div class="modal-dialog" role="document">
					    <div class="modal-content">
					      <div class="modal-header">
					        <button type="button" class="close" data-dismiss="modal">&times;</button>
					        <h4 class="modal-title"><label id="Title_edit_model"></label></h4>
					      </div>
					      <div class="modal-body">
					        <div class="row">
					        	<form id="form_edit_Ticket" action="#" method="post">
					        		<div class="col-lg-12">
					        			<div class="col-lg-8">
					        					<input type="hidden" name="edit_ID" id="edit_ID" class="form-control">
					        					<input type="hidden" name="ID_Session" id="ID_Session" class="form-control" value="<?php echo $Usuario['Nombre'].' '.$Usuario['Apellidos'] ?>">
					        			</div>
					        			<div class="col-lg-4">
					        				<div class="form-group" align="right">
					        					<label>Fecha: </label>
					        					<label name="edit_Fecha" id="edit_Fecha"><?php echo date('Y-m-d H:i:s'); ?></label>
					        				</div>
					        			</div>
					        		</div>
					        		<div class="col-lg-12">
					        			<div class="form-group">
					        				<label>Titulo:</label>
					        				<input type="text" name="edit_Titulo" id="edit_Titulo" class="form-control">
					        			</div>
					        			<div class="form-group">
					        				<div id="ContenerdorID" style="width: 100%; height: 200px; overflow-y: scroll; border: 1px solid #ddd; background: #f1f1f1">
					        					<div class="panel-group" id="acordeon">
											  
											  	</div>
											  </div>
										</div>

										 <div class="wrap" id="Cargando_Comentario_HelpDesk" style="display: none;">
									      <div class="loading">
									        <div class="bounceball"></div>
									        <div class="text">&nbsp; &nbsp; Cargando...</div>
									      </div>
									    </div>
					        			
					        			<div class="form-group" style="float: right;">
					        				<label>Agregar Comentario:</label>
					        				<input type="checkbox" checked data-toggle="toggle" class="off" data-size="small" name="Add_Comentario" id="Add_Comentario">
					        			</div>

					        			 <div class="wrap" id="Cargando_Comentar" style="display: none;">
								          <div class="loading">
								            <div class="bounceball"></div>
								            <div class="text">&nbsp; &nbsp; Cargando...</div>
								          </div>
								        </div>

					        			<div class="form-group" id="Comentario" name="Comentario" hidden="hidden">
					        				<label>Titulo del Comentario:</label>
					        				<input type="text" name="titulo_Comentario" id="titulo_Comentario" class="form-control" required>
					        				<label>Comentario:</label>
					        				<textarea type="text" name="edit_Comentario" id="edit_Comentario" class="form-control" rows="8" placeholder="Comentarios del Ticket"></textarea>
					        			</div>
					        			<div class="form-group">
					        				<label>Status:</label>
					        				<select class="form-control" id="edit_cmb_new_Status">
					        					<option value="Resuelto">Resuelto</option>
        										<option value="Pendiente">Pendiente</option>
        										<option value="En Proceso">En proceso</option>
					        				</select>
					        			</div>
					        		</div>
					        	</form>
					        </div>
					      </div>
					      <div class="modal-footer">
					      	<button type="button" class="btn btn-warning" id="Guardar_Cambios_Help" name="Guardar_Cambios_Help">Guardar Cambios</button>
					        <button type="button" class="btn btn-danger" data-dismiss="modal">Salir</button>
					      </div>
					    </div>

					  </div>
					</div>



        			<!-- Modal Comentar Ticket -->
					<div id="EditarTicketHelpDesk" tabindex="-1" class="modal fade" aria-labelledby="EditarTicketHelpDesk" aria-hidden="true" style="margin-left: auto; margin-right: auto;" role="dialog">
					  <div class="modal-dialog" role="document">
					    <div class="modal-content">
					      <div class="modal-header">
					        <button type="button" class="close" data-dismiss="modal">&times;</button>
					        <h4 class="modal-title"><label id="Title_edit_HelpDesk"></label></h4>
					      </div>
					      <div class="modal-body">
					        <div class="row">
					        	<form id="form_comentar_Ticket" action="#" method="post">
					        		<div class="col-lg-12">
					        			<div class="col-lg-8">
					        					<input type="hidden" name="comentar_ID" id="comentar_ID" class="form-control">
					        					<input type="hidden" name="ID_Session_comentar" id="ID_Session_comentar" class="form-control" value="<?php echo $Usuario['Nombre'].' '.$Usuario['Apellidos'] ?>">
					        			</div>
					        			<div class="col-lg-4">
					        				<div class="form-group" align="right">
					        					<label>Fecha: </label>
					        					<label name="edit_Fecha_comentar" id="edit_Fecha_comentar"><?php echo date('Y-m-d H:i:s'); ?></label>
					        				</div>
					        			</div>
					        		</div>
					        	<div id="ScrollDiv" style="width: 100%; height: 500px; overflow-y: scroll; border: 1px solid #ddd; background: #f1f1f1">
							        <div class="col-lg-12" id="divacordeon">
						
									</div>
								</div>
					     
					        	</form>
					        </div>
					      </div>
					      <div class="modal-footer">
					      	<!--<button type="button" class="btn btn-warning" data-dismiss="modal" id="Guardar_Cambios_comentar" name="Guardar_Cambios_comentar">Guardar Cambios</button>-->
					        <button type="button" class="btn btn-danger" data-dismiss="modal">Salir</button>
					      </div>
					    </div>

					  </div>
					</div>