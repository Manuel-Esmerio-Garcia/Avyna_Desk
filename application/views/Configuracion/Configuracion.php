
<br>
<div id="page-wrapper">
	<div class="container-fluid">

		<div id="tab-content" class="tab-content">
            <ul id="tab-list-test" class="nav nav-tabs" role="tablist">
                <li id="Configuracion-tab-sub1" class="active"><a href="#Configuracion-tab-link2" role="tab" data-toggle="tab">Configuración de la Empresa</a></li>
            </ul>
			<div id="tab-content-sub" class="tab-content">
				<div id="Configuracion-tab-link2" class="tab-pane active" width="100%" height="100%">
				    <div class="col-md-12" style="margin-top: 15px;">
						<div class="box">
					        <div class="box-header with-border">
					            <h3 class="box-title">Configuración General</h3>
					        </div>

							<div class="box-body">
					        	<hr>
									<h4><p>Datos Fiscales</p></h4>
                                <hr> 

                        		<div class="col-md-12">
                           			<input type="hidden" id="idEmpresa" name="idEmpresa">

                           			<div class="form-group">
	                                    <label for="Razon_Social">Razón Social:</label>
	                                    <input type="text" class="form-control" id="Razon_Social" name=Razon_Social>
	                                </div>

	                                <div class="alert alert-info alert-dismissible">
	                                  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
	                                  <i class="icon fa fa-info"></i>
	                                  <strong>Importante!</strong> Una vez emitida la primera factura, no sera posible modificar el RFC de la empresa.
	                                </div>

	                                <div class="form-group">
	                                    <label for="RFC">RFC:</label>
	                                    <input type="text" class="form-control" id="RFC" name="RFC">
	                                </div>

	                                <div class="form-group">
	                                    <label for="cmbRegimenFiscal" class="form-control-label">Regimen Fiscal*:</label>
	                                    <select class="form-control" id="cmbRegimenFiscal"  name="cmbRegimenFiscal" required>
	                                    	<option value="">Seleccionar...</option>
		                                    <option value="601">General de Ley Personas Morales</option>
		                                    <option value="603">Personas Morales con Fines no Lucrativos</option>
		                                    <option value="609">Consolidación</option>
		                                    <option value="610">Residentes en el Extranjero sin Establecimiento Permanente en México</option>
		                                    <option value="620">Sociedades Cooperativas de Producción que optan por diferir sus ingresos</option>
		                                    <option value="622">Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras</option>
		                                    <option value="623">Opcional para Grupos de Sociedades</option>
		                                    <option value="624">Coordinados</option>
		                                    <option value="628">Hidrocarburos</option>
		                                    <option value="607">Régimen de Enajenación o Adquisición de Bienes</option>
		                                    <option value="605">Sueldos y Salarios e Ingresos Asimilados a Salarios</option>
		                                    <option value="606">Arrendamiento</option>
		                                    <option value="608">Demás ingresos</option>
		                                    <option value="610">Residentes en el Extranjero sin Establecimiento Permanente en México</option>
		                                    <option value="611">Ingresos por Dividendos (socios y accionistas)</option>
		                                    <option value="612">Personas Físicas con Actividades Empresariales y Profesionales</option>
		                                    <option value="614">Ingresos por intereses</option>
		                                    <option value="616">Sin obligaciones fiscales</option>
		                                    <option value="621">Incorporación Fiscal</option>
		                                    <option value="622">Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras</option>
		                                    <option value="629">De los Regímenes Fiscales Preferentes y de las Empresas Multinacionales</option>
		                                    <option value="630">Enajenación de acciones en bolsa de valores</option>
		                                    <option value="615">Régimen de los ingresos por obtención de premios</option>
	                                    </select>
	                                </div>

	                                <input type="hidden" id="cer">
                                	<input type="hidden" id="key">

                                	<hr>
                                    	<h4><p>Dirección Origen</p></h4>
                                    <hr>

                                    <div class="col-md-6">
                                    	<div class="form-group">
                                            <label for="Contacto">Contacto*:</label>
                                            <input type="text" class="form-control" id="Contacto" name="Contacto">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                    	<div class="form-group">
                                            <label for="customerNumber">Customer Number*:</label>
                                            <input type="text" class="form-control" id="customerNumber" name="customerNumber">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                    	<div class="form-group">
                                            <label for="CP">Codigo Postal*:</label>
                                            <input type="text" class="form-control" id="CP" name="CP">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                    	<div class="form-group">
                                            <label for="Pais">País*:</label>
                                            <input type="text" class="form-control" id="Pais" name="Pais">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                    	<div class="form-group">
                                            <label for="Estado">Estado:</label>
                                            <input type="text" class="form-control" id="Estado" name="Estado">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                    	<div class="form-group">
                                            <label for="Municipio">Municipio:</label>
                                            <input type="text" class="form-control" id="Municipio" name="Municipio">
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                    	<div class="form-group">
                                            <label for="Colonia">Colonia:</label>
                                            <select name="Colonia" id="Colonia" class="form-control">
                                            	<option value="">Seleccionar...</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                    	<div class="form-group">
                                            <label for="Direccion">Dirección:</label>
                                            <input type="text" class="form-control" id="Direccion" name="Direccion">
                                        </div>
                                    </div>

                                    <div class="col-md-2">
                                    	<div class="numExt">
                                            <label for="message-text">N° Ext:</label>
                                            <input type="text" class="form-control" id="numExt" name="numExt">
                                        </div>
                                    </div>

                                    <div class="col-md-2">
                                    	<div class="form-group">
                                            <label for="numInt">N° Int:</label>
                                            <input type="text" class="form-control" id="numInt" name="numInt">
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="Telefono1">Telefono:</label>
                                            <input type="text" class="form-control" id="Telefono1" name="Telefono1">
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="Telefono2">Celular:</label>
                                            <input type="text" class="form-control" id="Telefono2" name="Telefono2">
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="Email">Correo Electrónico:</label>
                                            <input type="text" class="form-control" id="Email" name="Email">
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <button type="button" id="GuardarConfiguracion" class="btn btn-warning">Guardar Cambios</button>
                                    </div>
                        		</div>

                                <div class="col-md-12">
                                    
                                    <hr>
                                        <h4><p>Información Estafeta</p></h4>
                                    <hr>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="idEstafeta">ID Estafeta:</label>
                                            <input type="text" class="form-control" id="idEstafeta" name="idEstafeta">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="idSuscriptor">Identificador Suscriptor:</label>
                                            <input type="text" class="form-control" id="idSuscriptor" name="idSuscriptor">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="Usuario_Estafeta">Usuario Estafeta:</label>
                                        <input type="text" class="form-control" id="Usuario_Estafeta" name="Usuario_Estafeta">
                                    </div>

                                    <div class="form-group">
                                        <label for="Contraseña_Estafeta">Contraseña:</label>
                                        <input type="password" class="form-control" id="Contraseña_Estafeta" name="Contraseña_Estafeta">
                                    </div>                                    

                                </div>

                                <div class="col-md-12" style="margin-top: 50px;">
                                	<hr/> 
                                    <h4><p>Configuración Certificados de Sello Digital</p></h4>
                                    <hr/> 
                                </div>
				                                                
                            	<form id="form_Valida_CSD" action="#" enctype="multipart/form-data">

                                    <div class="form-group">
                                        <label for="message-text">Certificado .cer:</label>
                                        <input type="file" id="CSD_cer" accept=".cer" name="RutaCer">
                                    </div>

                                    <div class="form-group">
                                        <label for="message-text">Certificado .key:</label>
                                        <input type="file" id="CSD_key" accept=".key" name="RutaKey">
                                    </div>

                                    <div class="form-group">
                                        <input type="button" id="ValidarCSD" value="Validar" class="btn btn-sm btn-primary">
                                    </div>

                                    <div class="form-group">
                                        <input type="button" id="EliminarCSD" value="Eliminar" class="btn btn-sm btn-danger">
                                    </div>

                                    <div class="form-group">
                                        <label for="message-text">Contraseña:</label>
                                        <input type="password" class="form-control" id="Contraseña" name="Contraseña">
                                    </div>

                                    <div class="form-group">
                                        <label for="message-text">Confirmación de Contraseña:</label>
                                        <input type="password" class="form-control" id="Confir_Contraseña" name="Confir_Contraseña">
                                    </div>

                                    <div class="form-group">
                                        <label for="message-text">N° Certificado:</label>
                                        <input type="text" class="form-control" id="Certificado" readonly>
                                    </div>

                                    <div class="form-group">
                                         <label for="message-text">Vigencia Desde:</label>
                                         <input type="text" class="form-control" id="Desde" name="Desde" readonly>
                                    </div>

                                    <div class="form-group">
                                        <label for="message-text">Vigencia Hasta:</label>
                                        <input type="text" class="form-control" id="Hasta" name="Hasta" readonly>
                                    </div>

                                </form>  <!-- End form CSD -->
	                        </div>
				            <!-- /.box-body -->
						</div>
					</div>
				</div> <!-- End Tab Configuraciób Gebral de la empresa -->
			</div>  <!--  End subTab -->
 		</div>
	</div>
</div>