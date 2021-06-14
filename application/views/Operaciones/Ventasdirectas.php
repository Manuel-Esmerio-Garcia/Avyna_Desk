<div id="page-wrapper">
	<div class="container-fluid">

	<?php if (isset($ID)) { ?>
		<ul class="nav nav-tabs">
		  <li class="active"><a data-toggle="tab" href="#home">Ventas Directas</a></li>
		</ul>
	<?php }else{ ?>
		<ul class="nav nav-tabs">
		  <li class="active"><a data-toggle="tab" href="#home">Ventas Directas</a></li>
		  <li><a data-toggle="tab" href="#menu1">Ventas Directas Anteriores</a></li>
		</ul>
	<?php } ?>
		<br>

		<div class="tab-content">
		  <div id="home" class="tab-pane fade in active">

		  	<?php if (isset($ID)) { ?>
				<input type="hidden" class="form-control" id="idVenta" value="<?php echo $ID ?>">
				<input type="hidden" class="form-control" id="idVentaMenudeo" value="<?php echo $idVentaMenudeo ?>">
				<input type="hidden" class="form-control" id="idClienteMenudeo" value="<?php echo $idClienteMenudeo ?>">
			<?php } ?>

			<div class="row">
				<div class="col-lg-12">
					<div class="box">
				      	<div class="box-header with-border">
				        	<h3 class="box-title">Productos</h3>
				        	<div class="box-tools pull-right">
				          		<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
				        	</div>
				      	</div>
				      	<div class="box-body">

				      		<div class="col-lg-10 col-md-10 col-sm-8 col-xs-8">
				      			<div class="form-group">
						      		<label for="select_Cliente_Venta">Cliente:*</label>
						      		<select id="select_Cliente_Venta" class="form-control">
						      			<option value="">Seleccionar...</option>
						      			<?php foreach ($Clientes as $key => $value) { ?>
							            	<option value="<?php echo $value['ID'] ?>"><?php echo $value['Nombre'] . ' ' . $value['Apellidos'] ?></option>
							            <?php } ?>
						      		</select>
						      	</div>
				      		</div>

				      		<div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
								<button type="button" class="btn btn-default" id="btnAddNewCliente" style="margin-top: 25px;"><span class="glyphicon glyphicon-plus-sign"></span></button>
				      		</div>

				      		<!-- Tabla División -->
				      		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				      			<h4><b>División &nbsp; &nbsp; &nbsp;</b> <span class="glyphicon glyphicon-refresh" id="refrescar"></span></h4>
				      			<div class="table-responsive">
				      				<table class="table table-bordered table-hover table-striped table-condensed">
									  <tbody>
									    <tr>
								    		<?php foreach ($Division as $key => $value) { ?>
								            	<td onclick="marcar(this)" class="tdDivision"><?php echo $value['Division'] ?><span hidden="hidden"><?php echo $value['ID'] ?></span></td>
								            <?php } ?>
									    </tr>
									  </tbody>
									</table>
				      			</div>
				      		</div>
							
							<!-- Tabla Linea -->
				      		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				      			<h4><b>Linea</b></h4>
				      			<div class="table-responsive">
				      				<table class="table table-bordered table-hover table-striped table-condensed" id="fetchLinea">
									  <tbody>
									    <tr id="trLinea">
									    </tr>
									  </tbody>
									</table>
				      			</div>
				      		</div>
							
							<!-- Tabla Sublinea -->
				      		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				      			<h4><b>Sublinea</b></h4>
				      			<div class="table-responsive">
				      				<table class="table table-bordered table-hover table-striped table-condensed" id="fetchSublinea">
									  <tbody>
									    <tr id="trSublinea">
									    </tr>
									  </tbody>
									</table>
				      			</div>
				      		</div>

					      	<ul class="nav nav-tabs">
							  <li class="active"><a data-toggle="tab" href="#home1">Productos</a></li>
							  <li><a data-toggle="tab" href="#menu11">Promociones</a></li>
							</ul>

							<?php if (isset($ID)) { ?>
								<p id="Descuento_Cliente_Menudeo" hidden="hidden"><?php echo $descClienteMenudeo ?></p>
							<?php }else{ ?>
								<p id="Descuento_Cliente_Menudeo" hidden="hidden"></p>
							<?php } ?>

							<div class="tab-content">
								<!-- Tab Productos -->
							  	<div id="home1" class="tab-pane fade in active">
							    	<h3>Productos</h3>
							    	<div class="table-responsive">
							           	<table class="table table-striped table-bordered table-hover" id="fetchProductosVenta" width="100%">
							            	<thead>
							             		<tr>
									              <th>ID</th>
									              <th>Producto</th>
									              <th>División</th>
									              <th>Linea</th>
									              <th>Sublinea</th>
									              <th>Precio Unitario</th>
									              <th>Cantidad</th>
									              <th>#</th>
							             		</tr>
							            	</thead>
							            	<tbody></tbody>
							            </table>
						        	</div>
							  	</div>
								
								<!-- Tab Promociones -->
							  	<div id="menu11" class="tab-pane fade">
							    	<h3>Promociones</h3>
								    <div class="table-responsive col-lg-12">
							           	<table class="table table-striped table-bordered table-hover" id="fetchProductosPromo" width="100%">
							            	<thead>
							             		<tr>
									              <th>ID</th>
									              <th>Promoción</th>
									              <th>División</th>
									              <th>Linea</th>
									              <th>Sublinea</th>
									              <th>Precio Promoción</th>
									              <th>Cantidad</th>
									              <th>#</th>
							             		</tr>
							            	</thead>
							            	<tbody></tbody>
							            </table>
							        </div>
							  	</div>
							</div>
				      	</div>
				        <div class="box-footer">
				      		<button type="button" class="btn btn-danger" id="btnVerPromocion" style="float: right;">Ver Promociones</button>
				      		<button type="button" class="btn btn-danger" id="loadingVerPromocion" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading... </button>
				    	</div>
				  	</div>
			  	</div>
				
				<!-- Tabla Productos de la Venta -->
			  	<div class="col-lg-12">
					<div class="box">
				      	<div class="box-header with-border">
				        	<h3 class="box-title">Productos de la Venta</h3>
					        <div class="box-tools pull-right">
					          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
					        </div>
				      	</div>
				      	<div class="box-body">
				          	<div class="table-responsive col-lg-12">	  
				           		<table class="table table-striped table-bordered table-hover" id="fetchListProductosAdd" width="100%">
				            		<thead>
				             			<tr>
							              <th>ID</th>
							              <th>Producto</th>
							              <th>Cantidad</th>
							              <th>Precio Unitario</th>
							              <th>Importe</th>
							              <th>#</th>
							              <th hidden="hidden">Identificador</th>
							              <th hidden="hidden">idDivision</th>
							              <th hidden="hidden">idLinea</th>
							              <th hidden="hidden">idSublinea</th>
							              <th hidden="hidden">SetOferta</th>
				             			</tr>
				            		</thead>
				            		<?php if (isset($DetalleProducto)){?>
				            			<tbody>
				            			<?php foreach ($DetalleProducto as $key => $value) {?>
											<tr>
												<td><?php echo $value['ID_Producto'] ?></td>
												<td><?php echo $value['Producto'] ?></td>
												<td><?php echo $value['Cantidad'] ?></td>
												<td><?php echo $value['Precio_unitario'] ?></td>
												<td><?php echo $value['Importe'] ?></td>
												<td><button class="btn btn-danger btn-xs btn-flat" onclick="Eliminar_Producto_Funcion(this.parentNode.parentNode,'<?php echo $value['Setoferta'] ?>');"><span class="glyphicon glyphicon-trash"></span></i></button></td>
												<td hidden="hidden">0</td>
												<td hidden="hidden"><?php echo $value['Division'] ?></td>
												<td hidden="hidden"><?php echo $value['Linea'] ?></td>
												<td hidden="hidden"><?php echo $value['Sublinea'] ?></td>
												<td hidden="hidden"><?php echo $value['Setoferta'] ?></td>
											</tr>
				            			<?php } ?>

					            		<?php foreach ($DetallePromocion as $key => $value) {?>
											<tr>
												<td><?php echo $value['IDPromocion'] ?></td>
												<td><?php echo $value['Promocion'] ?></td>
												<td><?php echo $value['Cantidad'] ?></td>
												<td><?php echo $value['Precio_unitario'] ?></td>
												<td><?php echo $value['Importe'] ?></td>
												<td><button class="btn btn-danger btn-xs btn-flat" onclick="Eliminar_Producto_Funcion(this.parentNode.parentNode,0);"><span class="glyphicon glyphicon-trash"></span></i></button></td>
												<td hidden="hidden">1</td>
												<td hidden="hidden">0</td>
												<td hidden="hidden">0</td>
												<td hidden="hidden">0</td>
												<td hidden="hidden">0</td>
											</tr>
					            		<?php } ?>

					            		<?php foreach ($DetalleOferta as $key => $value) {?>
											<tr style="background: antiquewhite;">
												<td><?php echo $value['IDOferta'] ?></td>
												<td><?php echo $value['Nombre'] ?></td>
												<td><?php echo $value['Cantidad'] ?></td>
												<td><?php echo $value['Precio_unitario'] ?></td>
												<td><?php echo $value['Importe'] ?></td>
												<td><button class="btn btn-danger btn-xs btn-flat" onclick="Eliminar_Producto_Oferta_Funcion(this.parentNode.parentNode,0);"><span class="glyphicon glyphicon-trash"></span></i></button></td>
												<td hidden="hidden">3</td>
												<td hidden="hidden"></td>
												<td hidden="hidden"></td>
												<td hidden="hidden"></td>
												<td hidden="hidden"><?php echo $value['IDOferta'] ?></td>
											</tr>
					            		<?php } ?>
				            			</tbody>
				            		<?php }else { ?>
										<tbody></tbody>
				            		<?php } ?>
				           		</table>
				          	</div>
							
							<!-- Información Venta -->
					        <div class="form-group">
					          	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					            	<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
					            		<label>Subtotal:&nbsp;&nbsp; $<span id="labelSubtotal">0.00</span></label>
					            	</div>
					            	<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
					            		<label>Impuestos:&nbsp;&nbsp; $<span id="labelImpuestos">0.00</span></label>
					            	</div>
					            	<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
					            		<label>Descuento:&nbsp;&nbsp; $<span id="labelDescuento">0.00</span></label>
					            	</div>
					            	<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
					            		<label>Total:&nbsp;&nbsp; $<span id="labelVentas">0.00</span></label>
					            	</div>
					            </div>
					        </div>
				        </div>
				      	<div class="box-footer">
						  <?php if (isset($ID)) { ?>
							<button type="button" class="btn btn-warning" id="btnUpdateVenta" style="float: right;">Editar la venta</button>
							<button type="button" class="btn btn-warning" id="loadingUpdateVenta" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading... </button>
						  <?php }else{ ?>
							<button type="button" class="btn btn-primary" id="btnAddVenta" style="float: right;">Agregar a la venta</button>
							<button type="button" class="btn btn-primary" id="loadingAddVenta" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading... </button>
						  <?php } ?>
						</div>
				  	</div>
			  	</div>
		 	</div>
		  </div>
		  
		  <!-- End Tab Ventas Directas -->
		  <div id="menu1" class="tab-pane fade">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div class="box">
			      	<div class="box-header with-border">
			        	<h3 class="box-title">Ventas Directas Anterior</h3>
			        	<div class="box-tools pull-right">
			          		<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
			        	</div>
			      	</div>
			      	<div class="box-body">					  	
						<div class="container-fluid">
							<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div class="col-md-4 col-lg-4 col-sm-12 col-xs-12">
						            <div class="form-group input-daterange">
						              <label for="DateStartVentasDirectas">Desde:</label>
						              <div class="input-group">
						                <input type="text" class="form-control" id="DateStartVentasDirectas" name="DateStartVentasDirectas">
						                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
						              </div>    
						            </div>
						        </div>
						        <div class="col-md-4 col-lg-4 col-sm-10 col-xs-10">
						            <div class="form-group input-daterange">
						              <label for="DateEndVentasDirectas">Hasta:</label>
						              <div class="input-group">
						                <input type="text" class="form-control" id="DateEndVentasDirectas" name="DateEndVentasDirectas">
						                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
						              </div>    
						            </div>
						        </div>
						        <div class="col-md-4 col-lg-4 col-sm-2 col-xs-2">
						            <div class="form-group">
						              <div class="input-group">
						                <button type="button" id="searchVentasDirectas" class="btn btn-primary" style="margin-top: 25px">Buscar</button>
						              </div>    
						            </div>
						        </div>
						    </div>

							<div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
					           	<table class="table table-striped table-bordered table-hover" id="fetchVentasDirectas" width="100%">
					           		<caption>Ventas Directas Anteriores</caption>
					            	<thead>
					             		<tr>
							              <th>ID</th>
							              <th>Fecha</th>
							              <th>Cliente</th>
							              <th>Monto</th>
										  <th>Adeudo</th>
							              <th>Status</th>
							              <th>Extraido</th>
							              <th>#</th>
					             		</tr>
					            	</thead>
					            	<tbody></tbody>
					            </table>
				        	</div>
						</div>
			      	</div>
			  	</div>
		  	</div>

		  	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div class="box">
			      	<div class="box-header with-border">
			        	<h3 class="box-title">Detalle de la Ventas Directas</h3>
			        	<div class="box-tools pull-right">
			          		<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
			        	</div>
			      	</div>
			      	<div class="box-body">					  	
						<div class="container-fluid">
							<div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
					           	<table class="table table-striped table-bordered table-hover" id="fetchDetalleVentasDirectas" width="100%">
					           		<caption>Ventas Directas Anteriores</caption>
					            	<thead>
					             		<tr>
							              <th>ID</th>
							              <th>Producto</th>
							              <th>Cantidad</th>
							              <th>Precio Unitario</th>
							              <th>Importe</th>
					             		</tr>
					            	</thead>
					            	<tbody></tbody>
					            </table>
				        	</div>
						</div>
			      	</div>
			  	</div>
		  	</div>
		  </div>
		  <!-- End Tab Historial -->
		</div>

		
		<!-- Modal -->
		<div id="modalInfoCliente" class="modal fade" role="dialog">
		  <div class="modal-dialog">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-header bg-primary">
		        <button type="button" class="close" data-dismiss="modal">&times;</button>
		        <h4 class="modal-title">Información Cliente</h4>
		      </div>
		      <div class="modal-body">
		        <div class="container-fluid">
		        	<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
		        		<label for="txtClienteInfo">Razón Social:</label>
		        		<input type="text" class="form-control" id="txtClienteInfo" name="txtClienteInfo">
		        	</div>

		        	<div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
		        		<label for="txtRFCInfo">RFC:</label>
		        		<input type="text" class="form-control" id="txtRFCInfo" name="txtRFCInfo">
		        	</div>

		        	<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtCPInfo">CP:*</label>
		              <input type="number" class="form-control" id="txtCPInfo" maxlength="5">
		            </div>
		            
		            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtColoniaInfo">Colonia:</label>
		              <input list="txtColoniaInfo" name="txtColoniaInfo" class="form-control txtColonia" type="text" placeholder="Elige una colonia">
		              <datalist id="txtColoniaInfo">
		              </datalist>
		            </div>

		            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtEstadoInfo">Estado:</label>
		              <input type="text" class="form-control" id="txtEstadoInfo">
		            </div>
		            
		            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtPaisInfo">País:</label>
		              <input type="text" class="form-control" id="txtPaisInfo">
		            </div>

		            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtMunicipioInfo">Municipio:</label>
		              <input type="text" class="form-control" id="txtMunicipioInfo">
		            </div>

					<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
	                    <label for="selectUsoCFDi" class="form-control-label">Uso del CFDi*:</label>
	                    <select class="form-control" id="selectUsoCFDi" name="selectUsoCFDi" type="text">
	                      <option value="P01">P01 - Por definir</option>
	                      <option value="G01">G01 - Adquisición de mercancias</option>
	                      <option value="G02">G02 - Devoluciones, descuentos o bonificaciones</option>
	                      <option value="G03">G03 - Gastos en general</option>
	                      <option value="I01">I01 - Construcciones</option>
	                      <option value="I02">I02 - Mobilario y equipo de oficina por inversiones</option>
	                      <option value="I03">I03 - Equipo de transporte</option>
	                      <option value="I04">I04 - Equipo de computo y accesorios</option>
	                      <option value="I05">I05 - Dados, troqueles, moldes, matrices y herramental</option>
	                      <option value="I06">I06 - Comunicaciones telefónicas</option>
	                      <option value="I07">I07 - Comunicaciones satelitales</option>
	                      <option value="I08">I08 - Otra maquinaria y equipo</option>
	                      <option value="D01">D01 - Honorarios médicos, dentales y gastos hospitalarios</option>
	                      <option value="D02">D02 - Gastos médicos por incapacidad o discapacidad</option>
	                      <option value="D03">D03 - Gastos funerales</option>
	                      <option value="D04">D04 - Donativos</option>
	                      <option value="D05">D05 - Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)</option>
	                      <option value="D06">D06 - Aportaciones voluntarias al SAR</option>
	                      <option value="D07">D07 - Primas por seguros de gastos médicos</option>
	                      <option value="D08">D08 - Gastos de transportación escolar obligatoria</option>
	                      <option value="D09">D09 - Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones</option>
	                      <option value="D10">D10 - Pagos por servicios educativos (colegiaturas)</option>
	                    </select>
	                </div>
					
					<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
	                    <label for="selectFormaPago" class="form-control-label">Forma de Pago*:</label>
	                    <select class="form-control" id="selectFormaPago" name="selectFormaPago" type="text">
	                      <option value="01">01 - Efectivo</option>
	                      <option value="02">02 - Cheque nominativo</option>
	                      <option value="03">03 - Transferencia electrónica de fondos</option>
	                      <option value="04">04 - Tarjeta de crédito</option>
	                      <option value="05">05 - Monedero electrónico</option>
	                      <option value="06">06 - Dinero electrónico</option>
	                      <option value="08">08 - Vales de despensa</option>
	                      <option value="12">12 - Dación en pago</option>
	                      <option value="13">13 - Pago por subrogación</option>
	                      <option value="14">14 - Pago por consignación</option>
	                      <option value="15">15 - Condonación</option>
	                      <option value="17">17 - Compensación</option>
	                      <option value="23">23 - Novación</option>
	                      <option value="24">24 - Confusión</option>
	                      <option value="25">25 - Remisión de deuda</option>
	                      <option value="26">26 - Prescripción o caducidad</option>
	                      <option value="27">27 - A satisfacción del acreedor</option>
	                      <option value="28">28 - Tarjeta de débito</option>
	                      <option value="29">29 - Tarjeta de servicios</option>
	                      <option value="30">30 - Aplicación de anticipos</option>
	                      <option value="31">31 - Intermediario pagos</option>
	                      <option value="99">99 - Por definir</option>
	                    </select>
	                </div>

                  	<div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
	                    <label for="selectMetodoPago" class="form-control-label">Metodo de Pago*:</label>
	                    <select class="form-control" id="selectMetodoPago" name="selectMetodoPago" type="text">
	                      <option value="PUE">PUE - Pago en una sola exhibición</option>
	                      <option value="PPD">PPD - Pago en parcialidades o diferido</option>
	                    </select>
                  	</div>

		            <div class="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12">
		              <label for="txtObservacionesInfo">Observaciones:</label>
		              <textarea class="form-control" id="txtObservacionesInfo"></textarea>
		            </div>

		        </div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-danger" id="btnCerrarModalInfo" style="float: left;" data-dismiss="modal">Cerrar</button>
		        <button type="button" class="btn btn-danger" id="loadingCerrarModalInfo" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading... </button>

		        <button type="button" class="btn btn-primary" id="btnFacturar" style="float: right;">Facturar</button>
		        <button type="button" class="btn btn-primary" id="loadingFacturar" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading... </button>
		      </div>
		    </div>

		  </div>
		</div>


	 	<!-- Modal Promociones -->
		<div id="modalPromociones" class="modal fade" role="dialog">
		  	<div class="modal-dialog modal-lg">
		    	<div class="modal-content">
		      		<div class="modal-header">
		        		<button type="button" class="close" data-dismiss="modal">&times;</button>
		        		<h4 class="modal-title">Promociones</h4>
		      		</div>
		      		<div class="modal-body">
		        		<div class="container-fluid">
				        	<ul class="nav nav-tabs">
							  <li class="active"><a data-toggle="tab" href="#home33">Promociones</a></li>
							  <li><a data-toggle="tab" href="#menu33">Ofertas</a></li>
							</ul>

							<div class="tab-content">
								<!-- Tab Promociones -->
					  			<div id="home33" class="tab-pane fade in active">
					  				<br>
					  				<!-- Promociones -->
					    			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div class="box">
							      			<div class="box-header with-border">
							        			<h3 class="box-title">Promociones</h3>
							        			<div class="box-tools pull-right">
							          				<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
							        			</div>
							      			</div>
							    			<div class="box-body">
							        			<div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">	  
							        				<table class="table table-striped table-bordered table-hover" id="fetchPromociones" width="100%">
							            				<thead>
							             					<tr>
										             			<th>ID</th>
										              			<th>Promoción</th>
										              			<th>Precio</th>
										              			<th>#</th>
							             					</tr>
							            				</thead>
							            				<tbody></tbody>
							            			</table>
							        			</div>
							    			</div>
										</div>
									</div>
									<!-- Listado de Productos de la promoción -->
									<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div class="box">
							      			<div class="box-header with-border">
							        			<h3 class="box-title">Productos de la Promoción</h3>
							        			<div class="box-tools pull-right">
							          				<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
							        			</div>
							      			</div>
							    			<div class="box-body">
							        			<div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">  
							        				<table class="table table-striped table-bordered table-hover" id="fetchPromocionProducto" width="100%">
							            				<thead>
							             					<tr>
										             			<th>ID</th>
										              			<th>Producto</th>
							             					</tr>
							            				</thead>
							            				<tbody></tbody>
							           				</table>
							        			</div>
							    			</div>
										</div>
									</div>
					  			</div>
								
								<!-- Tab Ofertas -->
					  			<div id="menu33" class="tab-pane fade">
					    			<br>
					    			<div class="col-lg-12">
										<div class="box">
							      			<div class="box-header with-border">
							        			<h3 class="box-title">Ofertas</h3>
							        			<div class="box-tools pull-right">
							          				<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
							        			</div>
							      			</div>
							    			<div class="box-body">
							        			<div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">	  
							        				<table class="table table-striped table-bordered table-hover" id="fetchOfertas" width="100%">
							            				<thead>
										             		<tr>
										             			<th>ID</th>
										              			<th>Oferta</th>
										              			<th>Compra Requerida</th>
										              			<th hidden="hidden">Tipo_Desc</th>
										              			<th hidden="hidden">Tipo_Regalo</th>
										              			<th>#</th>
										             		</tr>
							            				</thead>
							            				<tbody></tbody>
							            			</table>
							        			</div>
							    			</div>
										</div>
									</div>

				        			<input type="hidden" class="form-control" id="txt_Tipo">

									<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" id="Div_Descuento" style="display: none;">
											<div class="form-group">
												<label for="txt_Descuento">Descuento:</label>
									        	<div class="input-group">
									                <input type="number" class="form-control" readonly="readonly" id="txt_Descuento">
									                <span class="input-group-addon">%</span>
									            </div>
								        	</div>
								        </div>
								        <div class="col-lg-4"></div>
								        <div class="col-lg-4"></div>
									</div>

							        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="display: none;" id="Div_Regalo">
										<div class="box collapsed-box">
										    <div class="box-header with-border">
										        <h3 class="box-title">Regalo</h3>
										        <div class="box-tools pull-right">
										        	<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>
										        </div>
										    </div>
										    <div class="box-body">
										        <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">		  
										        	<table class="table table-striped table-bordered table-hover" id="ofeRegalo" width="100%">
										            	<thead>
										             		<tr>
										             			<th>ID</th>
										              			<th>Producto</th>
										             		</tr>
										            	</thead>
										            	<tbody></tbody>
										            </table>
										        </div>
										    </div>
										</div>
									</div>

									<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
										<div class="box collapsed-box">
										    <div class="box-header with-border">
										        <h3 class="box-title">División</h3>
										        <div class="box-tools pull-right">
										          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>
										        </div>
										    </div>
										    <div class="box-body">
										        <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
										        	<table class="table table-striped table-bordered table-hover" id="ofeDivision" width="100%">
										            	<thead>
										             		<tr>
										             			<th>ID</th>
										              			<th>División</th>
										             		</tr>
										            	</thead>
										            	<tbody></tbody>
										            </table>
										        </div>
										    </div>
										</div>
									</div>

									<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
										<div class="box collapsed-box">
										    <div class="box-header with-border">
										        <h3 class="box-title">Linea</h3>
										        <div class="box-tools pull-right">
										          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>
										        </div>
										    </div>
										    <div class="box-body">
										        <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">		  
										        	<table class="table table-striped table-bordered table-hover" id="ofeLinea" width="100%">
										            	<thead>
										             		<tr>
										             			<th>ID</th>
										              			<th>Linea</th>
										             		</tr>
										            	</thead>
										            	<tbody></tbody>
										            </table>
										        </div>
										    </div>
										</div>
									</div>

									<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
										<div class="box collapsed-box">
										    <div class="box-header with-border">
										        <h3 class="box-title">Sublinea</h3>
										        <div class="box-tools pull-right">
										          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>
										        </div>
										    </div>
										    <div class="box-body">
										        <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">	  
										        	<table class="table table-striped table-bordered table-hover" id="ofeSublinea" width="100%">
										            	<thead>
										             		<tr>
										             			<th>ID</th>
										              			<th>Sublinea</th>
										             		</tr>
										            	</thead>
										            	<tbody></tbody>
										            </table>
										        </div>
										    </div>
										</div>
									</div>

									<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div class="box collapsed-box">
										    <div class="box-header with-border">
										        <h3 class="box-title">Productos</h3>
										        <div class="box-tools pull-right">
										          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>
										        </div>
										    </div>
										    <div class="box-body">
										        <div class="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
										        	<table class="table table-striped table-bordered table-hover" id="ofeProductos" width="100%">
										            	<thead>
										             		<tr>
										             			<th>ID</th>
										              			<th>Producto</th>
										             		</tr>
										            	</thead>
										            	<tbody></tbody>
										            </table>
										        </div>
										    </div>
										</div>
									</div>
				  				</div>
							</div>
		        		</div>	
		      		</div>
		      		<div class="modal-footer">
		        		<button type="button" class="btn btn-danger" id="btnCerrarModalPromo" data-dismiss="modal" style="float: left;">Cerrar</button>
		        		<button type="button" class="btn btn-danger" id="loadingCerrarModalPromo" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading... </button>
		      		</div>
		    	</div>
		  	</div>
		</div>


		<!-- Modal -->
		<div id="modalAddCliente" class="modal fade" role="dialog">
		  <div class="modal-dialog">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-header bg-primary">
		        <button type="button" class="close" data-dismiss="modal">&times;</button>
		        <h4 class="modal-title">Agregar Cliente Menudeo</h4>
		      </div>
		      <div class="modal-body">
		        <div class="container-fluid">
		        	
		    		<div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
                	  <label for="txtNombre">Nombre:*</label>
                	  <input type="text" class="form-control" id="txtNombre">
            		</div>

		            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
		              <label for="txtApellidos">Apellidos:*</label>
		              <input type="text" class="form-control" id="txtApellidos">
		            </div>
            
		            <!-- Dirección del Distribuidor -->
		            <div class="col-md-12 col-lg-12">
		              <p style="color: #867e7e;">Dirección del Cliente</p>
		              <hr>
		            </div>

		            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtCP">CP:*</label>
		              <input type="number" class="form-control" id="txtCP" maxlength="5">
		            </div>
		            
		            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtColonia">Colonia:</label>
		              <input list="txtColonia" name="txtColonia" class="form-control txtColonia" type="text" placeholder="Elige una colonia">
		              <datalist id="txtColonia">
		              </datalist>
		            </div>

		            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtEstado">Estado:</label>
		              <input type="text" class="form-control" id="txtEstado">
		            </div>
		            
		            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtPais">País:</label>
		              <input type="text" class="form-control" id="txtPais">
		            </div>

		            <div class="form-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
		              <label for="txtMunicipio">Municipio:</label>
		              <input type="text" class="form-control" id="txtMunicipio">
		            </div>

		            <div class="form-group col-lg-4 col-md-4 col-sm-12 col-xm-12">
		              <label for="txtCiudad">Ciudad:</label>
		              <input type="text" class="form-control" id="txtCiudad">
		            </div>
		            
		            <div class="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12">
		              <label for="txtCalle">Calle y Numero:</label>
		              <input type="text" class="form-control" id="txtCalle" onkeypress="return check(event)" maxlength="30">
		            </div>

		            <!-- Información de la Empresa -->
		            <div class="col-md-12 col-lg-12">
		              <p style="color: #867e7e;">Información de la Empresa (Distribuidor)</p>
		              <hr>
		            </div>

		            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
		              <label for="txtEmpresa">Empresa (Razón Social):*</label>
		              <input type="text" class="form-control" id="txtEmpresa">
		            </div>

		            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
		              <label for="txtRFC">RFC:*</label>
		              <input type="text" class="form-control" id="txtRFC">
		            </div>

		            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
		              <label for="txtCargo">Cargo:</label>
		              <input type="text" class="form-control" id="txtCargo">
		            </div>

		            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
		              <label>Descuento:</label>
		              <select class="form-control" id="txtDescuento">
		              	<option value="">Seleccionar...</option>
						<option value="0">0</option>
		              	<option value="1">1</option>
		              	<option value="2">2</option>
		              	<option value="3">3</option>
		              	<option value="4">4</option>
		              	<option value="5">5</option>
		              	<option value="6">6</option>
		              	<option value="7">7</option>
		              	<option value="8">8</option>
		              	<option value="9">9</option>
		              	<option value="10">10</option>
		              	<option value="11">11</option>
		              	<option value="12">12</option>
		              	<option value="13">13</option>
		              	<option value="14">14</option>
		              	<option value="15">15</option>
		              	<option value="16">16</option>
		              	<option value="17">17</option>
		              	<option value="18">18</option>
		              	<option value="19">19</option>
		              	<option value="20">20</option>
		              	<option value="21">21</option>
		              	<option value="22">22</option>
		              	<option value="23">23</option>
		              	<option value="24">24</option>
		              	<option value="25">25</option>
		              	<option value="26">26</option>
		              	<option value="27">27</option>
		              	<option value="28">28</option>
		              	<option value="29">29</option>
		              	<option value="30">30</option>
		              </select>
		              <!--<div class="input-group">
		                <input type="number" class="form-control" id="txtDescuento" value="0" min="0" max="100" readonly>
		                <span class="input-group-addon">%</span>
		              </div>-->
		            </div>

		            <!-- Información del Distribuidor -->
		            <div class="col-md-12 col-lg-12">
		              <p style="color: #867e7e;">Información del Cliente</p>
		              <hr>
		            </div>

		            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
		              <label for="txtTel1">Telefono 1:*</label>
		              <input type="number" class="form-control" id="txtTel1" maxlength="10">
		            </div>

		            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
		              <label for="txtTel2">Telefono 2:</label>
		              <input type="number" class="form-control" id="txtTel2" maxlength="10">
		            </div>

		            <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xm-12">
		              <label for="txtEmail">Email:*</label>
		              <input type="Email" class="form-control" id="txtEmail">
		            </div>

		            <!-- Configuración del Distribuidor -->
		            <div class="col-md-12 col-lg-12">
		              <p style="color: #867e7e;">Configuración del Cliente</p>
		              <hr>
		            </div>

		            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
		              <label for="select_Distribuidor">Distribuidor:*</label>
		              <select id="select_Distribuidor" class="form-control" readonly>
		                <option value="261">Clientes Directos</option>
		              </select>
		            </div>

		            <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xm-12">
		              <label for="txtNivel">Nivel:*</label>
		              <input type="text" class="form-control" id="txtNivel">
		            </div>

		        </div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-danger" id="btnCerrarAddCliente" style="float: left;" data-dismiss="modal">Cerrar</button>
				<button type="button" class="btn btn-danger" id="loadingCerrarAddCliente" disabled style="display: none; float: left;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading... </button>

		        <button type="button" class="btn btn-primary" id="btnAddCliente" style="float: right;">Guardar</button>
		        <button type="button" class="btn btn-primary" id="loadingAddCliente" disabled style="display: none; float: right;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading... </button>
		      </div>
		    </div>

		  </div>
		</div>
































































		<!-- Modal Vista Previa Venta-->
		<div id="modalVistaPreviaVenta" class="modal fade" role="dialog">
		  	<div class="modal-dialog modal-sm">
		    	<div class="modal-content">
		      		<div class="modal-header bg-primary">
		        		<button type="button" class="close" data-dismiss="modal">&times;</button>
		        		<h4 class="modal-title">Información de la Venta</h4>
		      		</div>
		      		<div class="modal-body">
		        		<div class="form-group">
		        			<label>Subtotal: </label>
		        			<div class="input-group">
			        			<span class="input-group-addon">$</span>
			        			<input type="number" class="form-control" readonly="readonly" id="text_Subtotal">
			      			</div>
		        		</div>

				        <div class="form-group">
				        	<label>Impuestos: </label>
				        	<div class="input-group">
					        	<span class="input-group-addon">$</span>
					        	<input type="number" class="form-control" readonly="readonly" id="text_Impuestos">
					      	</div>
				        </div>

				        <div class="form-group">
				        	<label>Descuento: </label>
				        	<div class="input-group">
					        	<span class="input-group-addon">$</span>
					        	<input type="number" class="form-control" readonly="readonly" id="text_Descuento">
					      	</div>
				        </div>

				        <div class="form-group">
				        	<label>Total: </label>
				        	<div class="input-group">
					        	<span class="input-group-addon">$</span>
					        	<input type="number" class="form-control" readonly="readonly" id="text_Total">
					      	</div>
				        </div>

		        		<input type="hidden" class="form-control" id="text_Total_Real">
		      		</div>
		      		<div class="modal-footer" style="text-align: center;">
					  <?php if (isset($ID)) { ?>
						<button type="button" class="btn btn-warning" id="btnModificarVenta">Finalizar Venta</button>
						<button type="button" class="btn btn-warning" id="loadingModificarVenta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading... </button>
					  <?php }else{ ?>
						<button type="button" class="btn btn-primary" id="btnRealizarVenta">Finalizar Venta</button>
						<button type="button" class="btn btn-primary" id="loadingRealizarVenta" disabled style="display: none;"><i class="fa fa-spinner fa-spin" style="font-size:18px; color: white;"></i> Loading... </button>
					  <?php } ?>	

		      		</div>
		    	</div>
		 	</div>
		</div>

		<!-- Modal Cobro -->
		<div id="modalPagosClient" class="modal" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Pagos Cliente</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="fluid-container">
						<form method="post" accept-charset="utf-8" enctype="multipart/form-data"  id="formdata">
							<p id="PagoVenta" style="display:none;"></p>
							<div class="col-lg-4">
								<div class="form-group">
									<label for="Cantidad_Pagar">Cantidad a Pagar</label>
									<div class="input-group">
										<span class="input-group-addon">$</span>
										<input type="number" class="form-control" id="Cantidad_Pagar" min="0" disabled>
									</div>
								</div>
							</div>

							<div class="col-lg-4">
								<div class="form-group">
									<label for="Banco">Banco</label>
									<!--<input type="text" class="form-control" id="Banco">-->
									<select name="Banco" id="Banco" class="form-control">
										<option value="">Seleccionar...</option>
										<option value="BANAMEX">BANAMEX</option>
										<option value="BANCOMEXT">BANCOMEXT</option>
										<option value="BANOBRAS">BANOBRAS</option>
										<option value="BBVA BANCOMER">BBVA BANCOMER</option>
										<option value="SANTANDER">SANTANDER</option>
										<option value="BANJERCITO">BANJERCITO</option>
										<option value="HSBC">HSBC</option>
										<option value="BAJIO">BAJIO</option>
										<option value="IXE">IXE</option>
										<option value="INBURSA">INBURSA</option>
										<option value="INTERACCIONES">INTERACCIONES</option>
										<option value="MIFEL">MIFEL</option>
										<option value="SCOTIABANK">SCOTIABANK</option>
										<option value="BANREGIO">BANREGIO</option>
										<option value="INVEX">INVEX</option>
										<option value="BANSI">BANSI</option>
										<option value="AFIRME">AFIRME</option>
										<option value="BANORTE/IXE">BANORTE/IXE</option>
										<option value="THE ROYAL BANK">THE ROYAL BANK</option>
										<option value="AMERICAN EXPRESS">AMERICAN EXPRESS</option>
										<option value="BAMSA">BAMSA</option>
										<option value="TOKYO">TOKYO</option>
										<option value="JP MORGAN">JP MORGAN</option>
										<option value="BMONEX">BMONEX</option>
										<option value="VE POR MAS">VE POR MAS</option>
										<option value="ING">ING</option>
										<option value="DEUTSCHE">DEUTSCHE</option>
										<option value="CREDIT SUISSE">CREDIT SUISSE</option>
										<option value="AZTECA">AZTECA</option>
										<option value="AUTOFIN">AUTOFIN</option>
										<option value="BARCLAYS">BARCLAYS</option>
										<option value="COMPARTAMOS">COMPARTAMOS</option>
										<option value="BANCO FAMSA">BANCO FAMSA</option>
										<option value="BMULTIVA">BMULTIVA</option>
										<option value="ACTINVER">ACTINVER</option>
										<option value="WAL-MART">WAL-MART</option>
										<option value="NAFIN">NAFIN</option>
										<option value="INTERCAM BANCO">INTERCAM BANCO</option>
										<option value="BANCOPPEL">BANCOPPEL</option>
										<option value="ABC CAPITAL">ABC CAPITAL</option>
										<option value="UBS BANK">UBS BANK</option>
										<option value="CONSUBANCO">CONSUBANCO</option>
										<option value="VOLKSWAGEN">VOLKSWAGEN</option>
										<option value="CIBANCO">CIBANCO</option>
										<option value="BBASE">BBASE</option>
										<option value="BANKAOOL">BANKAOOL</option>
										<option value="PAGATODO">PAGATODO</option>
										<option value="FORJADORES">FORJADORES</option>
										<option value="INMOBILIARIO">INMOBILIARIO</option>
										<option value="DONDÉ">DONDÉ</option>
										<option value="BANCREA">BANCREA</option>
										<option value="PROGRESO">PROGRESO</option>
										<option value="BANCO FINTERRA">BANCO FINTERRA</option>
										<option value="ICBC">ICBC</option>
										<option value="SABADELL">SABADELL</option>
										<option value="SHINHAN">SHINHAN</option>
										<option value="MIZUHO BANK">MIZUHO BANK</option>
										<option value="BANK OF CHINA">BANK OF CHINA</option>
										<option value="BANCO S3">BANCO S3</option>
										<option value="BANSEFI">BANSEFI</option>
										<option value="HIPOTECARIA FEDERAL">HIPOTECARIA FEDERAL</option>
										<option value="MONEXCB">MONEXCB</option>
										<option value="GBM">GBM</option>
										<option value="MASARI">MASARI</option>
										<option value="VALUE">VALUE</option>
										<option value="ESTRUCTURADORES">ESTRUCTURADORES</option>
										<option value="TIBER">TIBER</option>
										<option value="VECTOR">VECTOR</option>
										<option value="B&B">B&B</option>
										<option value="ACCIVAL">ACCIVAL</option>
										<option value="MERRILL LYNCH">MERRILL LYNCH</option>
										<option value="FINAMEX">FINAMEX</option>
										<option value="VALMEX">VALMEX</option>
										<option value="UNICA">UNICA</option>
										<option value="MAPFRE">MAPFRE</option>
										<option value="PROFUTURO">PROFUTURO</option>
										<option value="CB ACTINVER">CB ACTINVER</option>
										<option value="OACTIN">OACTIN</option>
										<option value="SKANDIA">SKANDIA</option>
										<option value="CBDEUTSCHE">CBDEUTSCHE</option>
										<option value="ZURICH">ZURICH</option>
										<option value="ZURICHVI">ZURICHVI</option>
										<option value="SU CASITA">SU CASITA</option>
										<option value="CB INTERCAM">CB INTERCAM</option>
										<option value="CI BOLSA">CI BOLSA</option>
										<option value="BULLTICK CB">BULLTICK CB</option>
										<option value="STERLING">STERLING</option>
										<option value="FINCOMUN">FINCOMUN</option>
										<option value="HDI SEGUROS">HDI SEGUROS</option>
										<option value="ORDER">ORDER</option>
										<option value="AKALA">AKALA</option>
										<option value="CB JPMORGAN">CB JPMORGAN</option>
										<option value="REFORMA">REFORMA</option>
										<option value="STP">STP</option>
										<option value="TELECOMM">TELECOMM</option>
										<option value="EVERCORE">EVERCORE</option>
										<option value="SKANDIA">SKANDIA</option>
										<option value="SEGMTY">SEGMTY</option>
										<option value="ASEA">ASEA</option>
										<option value="KUSPIT">KUSPIT</option>
										<option value="SOFIEXPRESS">SOFIEXPRESS</option>
										<option value="UNAGRA">UNAGRA</option>
										<option value="OPCIONES EMPRESARIALES DEL NOROESTE">OPCIONES EMPRESARIALES DEL NOROESTE</option>
										<option value="LIBERTAD">LIBERTAD</option>
										<option value="CLS">CLS</option>
										<option value="INDEVAL">INDEVAL</option>
										<option value="PayPal">PayPal</option>
										<option value="Wells fargo">Wells fargo</option>
									</select>
								</div>
							</div>

							<div class="wrap" id="Cargando_Cobro" style="display: none;">
								<div class="loading">
									<div class="bounceball"></div>
									<div class="text">&nbsp; &nbsp; Cargando...</div>
								</div>
							</div>

							<div class="col-lg-4">
								<div class="form-group">
									<label for="Sucursal">Sucursal</label>
									<input type="text" class="form-control" id="Sucursal">
								</div>
							</div>

							<div class="col-lg-12">
								<div class="form-group">
								<label for="file-input">Cargar Imagen</label>
								<input type="file" id="file-input" accept="image/*">

								<p class="help-block">Seleccione la imagen del comprobante de pago.</p>

								<br/>
									<img id="imgSalida" width="30%" height="30%" src="" />
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
					<button type="button" class="btn btn-primary" id="Registrar_Pago">Realizar Pagos</button>
				</div>
				</div>
			</div>
		</div>

	</div>
</div>