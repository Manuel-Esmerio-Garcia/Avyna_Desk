
<br>
<div id="page-wrapper">
	<div class="container-fluid">
		<div id="page-wrapper">
 			<div class="container-fluid">
				
				<!-- Filtrado Tickets del Usuario -->
					<div class="col-lg-12">
							<div class="col-lg-3">
								<input type="hidden" name="ID_Ticket" id="ID_Ticket" value="<?php echo $_SESSION['Avyna'][0]['ID']?>">

								<label>Desde:</label>
								<div class="input-group">
									<input type="text" name="Ticket_Desde" id="Ticket_Desde" class="form-control">
									<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
								</div>
							</div>
							<div class="col-lg-3">
								<label>Hasta:</label>
								<div class="input-group">
									<input type="text" name="Ticket_Hasta" id="Ticket_Hasta" class="form-control" max="<?php echo date("Y-m-d"); ?>">
									<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
								</div>
							</div>
							<div class="col-lg-1">
								<div class="form-group">
									<input type="submit" name="Ticket_Buscar" id="Ticket_Buscar" class="btn btn-info btn-sm" value="Buscar" style="margin-top: 25px;">
								</div>
							</div>

						<div class="col-lg-3">
							<div class="form-group">
								<label>Estatus:</label>
								<select id="Ticket_cmb_Estatus" name="Ticket_cmb_Estatus" class="form-control">
									<option value="">Seleccionar...</option>
									<option value="Resuelto">Resuelto</option>
									<option value="Pendiente">Pendiente</option>
									<option value="En Proceso">En proceso</option>
								</select>
							</div>
						</div>
					</div>  
					<!-- End Filtrado Tickets del Usuario -->

					<div class="wrap" id="Cargando" style="display: none;">
			          <div class="loading">
			            <div class="bounceball"></div>
			            <div class="text">&nbsp; &nbsp; Cargando...</div>
			          </div>
			        </div>

					
					<!-- Tabla de Tickets del Usuario -->
						<div class="col-md-12">
						        <div class="box">
						            <div class="box-header with-border">
						              <h3 class="box-title">Tickets Creados</h3>
						            </div>
						            <!-- /.box-header -->
						            <div class="box-body">
						              <div class="table-responsive">
										<table id="Tabla_Ticket" class="table table-striped table-bordered table-hover table-condensed" width="100%">
							    			<thead>
							                    <tr>
							                        <th width="25">ID</th>
							                        <th width="150">Fecha</th>
							                        <th width="150">Titulo</th>	                   
							                        <th>Descripción</th>
							                        <th width="50">Status</th>
							                        <th width="50">ID Usuario</th>
							                    </tr>
							                </thead>	          
							                <tbody>	                                  
							    			</tbody>
										</table>

									</div>
						            </div>
						            <!-- /.box-body -->
						            <div class="box-footer clearfix">

						            	<button name="Nuevo_Ticket" id="Nuevo_Ticket" class="btn btn-success" data-toggle="modal" data-target="#NuevoTicket">Nuevo</button>
				    		
						    		 	<button name="Editar_Ticket" id="Editar_Ticket" class="btn btn-warning" data-toggle="modal">Editar</button>
						    		
						    		 	<button name="Ver_Tickets" id="Ver_Tickets" class="btn btn-primary">Ver Comentarios</button>

						            </div>
						          </div>
						        </div>
						</div>
					<!-- End Tabla de Tickets del Usuario -->

 			</div>
 		</div>
 	</div>
 </div>


 	  <div class="modal fade" id="EditarTicketModal" tabindex="-1" aria-hidden="true" role="dialog">
			    <div class="modal-dialog">
			    
			      <!-- Modal content-->
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Editar Ticket</h4>
			        </div>
			        <div class="modal-body">
			          <form>
				        	<div class="row">
				        		<div class="col-lg-12">
				        			<div class="form-group" align="right">
				        				<label>Fecha: </label>
				        				<label id="edit_dateTicket"><?php echo date('Y-m-d H:i:s');?></label>
				        			</div>
				        			<div class="form-group">
				        				<label>Titulo / Problema:</label>
				        				<input type="text" name="edit_TituloTicket" id="edit_TituloTicket" class="form-control" required="required">
				        			</div>

				   
				        			<div class="form-group">
				        				<label>Descripción:</label>
				        				<textarea name="edit_DescripcionTicket" id="edit_DescripcionTicket" class="form-control" rows="5" placeholder="Descrición del problema Presentado..."></textarea>
				        			</div>
				        		
				        			<input type="hidden" name="edit_id_userTicket" id="edit_id_userTicket" value="<?php echo $_SESSION['Avyna'][0]['ID']?>" readonly>
				        		</div>
				        	</div>
				        </form>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-warning" data-dismiss="modal" id="GuardarModalTicket">Guardar Cambios</button>
			          <button type="button" class="btn btn-danger" data-dismiss="modal">Salir</button>
			        </div>
			      </div>
			      
			    </div>
			  </div>

			  <!-- Modal -->
			  <div class="modal fade" id="NuevoTicket" role="dialog">
			    <div class="modal-dialog">
			    
			      <!-- Modal content-->
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Nuevo Ticket</h4>
			        </div>
			        <div class="modal-body">
			          <form>
				        	<div class="row">
				        		<div class="col-lg-12">
				        			<div class="form-group" align="right">
				        				<label>Fecha: </label>
				        				<label id="new_date"><?php echo date('Y-m-d H:i:s');?></label>
				        			</div>
				        			<div class="form-group">
				        				<label>Titulo / Problema:</label>
				        				<input type="text" name="new_Titulo" id="new_Titulo" class="form-control" required="required">
				        			</div>

				        			<div class="form-group">
				        				<label>Descripción:</label>
				        				<textarea name="new_Descripcion" id="new_Descripcion" class="form-control" rows="5" placeholder="Descrición del problema Presentado..."></textarea>
				        			</div>
				        			<input type="hidden" name="new_id_user" id="new_id_user" value="<?php echo $_SESSION['Avyna'][0]['ID']?>" readonly>
				        		</div>
				        	</div>
				        </form>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-success" data-dismiss="modal" id="GuardarModalnew">Guardar Ticket</button>
			          <button type="button" class="btn btn-danger" data-dismiss="modal">Salir</button>
			        </div>
			      </div>
			      
			    </div>
			  </div>


			  <!-- Modal Comentar Ticket -->
					<div id="VerTickets" tabindex="-1" class="modal fade" aria-labelledby="VerTickets" aria-hidden="true" style="margin-left: auto; margin-right: auto;" role="dialog">
					  <div class="modal-dialog modal-lg" role="document">
					    <div class="modal-content">
					      <div class="modal-header">
					        <button type="button" class="close" data-dismiss="modal">&times;</button>
					        <h4 class="modal-title"><label id="Title_Ver_Tickets"></label></h4>
					      </div>
					      <div class="modal-body">
					        <div class="row">
					        	<form id="form_Ver_Tickets" action="#" method="post">
					        		<div class="col-lg-12">
					        			<div class="col-lg-8">
					        					<input type="hidden" name="ID_Ver_Tickets" id="ID_Ver_Tickets" class="form-control">
					        					<input type="hidden" name="Session_Ver_Tickets" id="Session_Ver_Tickets" class="form-control" value="<?php echo $Usuario['Nombre'].' '.$Usuario['Apellidos'] ?>">
					        			</div>
					        			<div class="col-lg-4">
					        				<div class="form-group" align="right">
					        					<label>Fecha: </label>
					        					<label name="Fecha_Ver_Tickets" id="Fecha_Ver_Tickets"><?php echo date('Y-m-d H:i:s'); ?></label>
					        				</div>
					        			</div>
					        		</div>
					        	<div id="ScrollDiv_Ver" style="width: 100%; height: 500px; overflow-y: scroll; border: 1px solid #ddd; background: #f1f1f1">
							        <div class="col-lg-12" id="divacordeon_Ver">
										
									</div>
								</div>
					     
					        	</form>
					        </div>
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-danger" data-dismiss="modal">Salir</button>
					      </div>
					    </div>

					  </div>
					</div>

	