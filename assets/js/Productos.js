window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.Table_Producto = null;
window.Table_Marcas = null;
window.Table_Division = null;
window.Table_Linea = null;
window.Table_Sublinea = null;

$(document).ready(function() {

	fetch_data();
	fetch_data_Marca();
	fetch_data_Division();
	fetch_data_Linea();
	fetch_data_Sublinea();

	var Producto = document.getElementById("Table_Productos");
	Producto.onclick = function(e)
	{
	    window.Table_Producto = e.target.parentNode;
	}

	var Marca_t = document.getElementById("Table_Marcas");
	Marca_t.onclick = function(e)
	{
	    window.Table_Marcas = e.target.parentNode;
	}

	var Division = document.getElementById("Table_Division");
	Division.onclick = function(e)
	{
	    window.Table_Division = e.target.parentNode;
	}

	var Linea = document.getElementById("Table_Lineas");
	Linea.onclick = function(e)
	{
	    window.Table_Linea = e.target.parentNode;
	}

	var Sublinea = document.getElementById("Table_Sublinea");
	Sublinea.onclick = function(e)
	{
	    window.Table_Sublinea = e.target.parentNode;
	}

	/////////////////////////////////////////////////////////////////////
		// Marca
	/////////////////////////////////////////////////////////////////////
	$("#Option_Agregar_Marca").click(function(event) {
		$("#Modal_Marca_Marca").modal("show");
	});

	$("#Agregar_Marca").click(function(event) {
		$("#Modal_Marca_Marca").modal("show");
	});

	$("#Option_Editar_Marca").click(function(event) {
		Editar_Marca();
	});

	$("#Editar_Marca").click(function(event) {
		Editar_Marca();
	});

	$("#Option_Eliminar_Marca").click(function(event) {
		Eliminar_Marca();
	});

	$("#Eliminar_Marca").click(function(event) {
		Eliminar_Marca();
	});

	/////////////////////////////////////////////////////////////////////
		// Division
	/////////////////////////////////////////////////////////////////////
	$("#Option_Agregar_Division").click(function(event) {
		$("#Modal_Division").modal("show");
	});

	$("#Agregar_Division").click(function(event) {
		$("#Modal_Division").modal("show");
	});

	$("#Option_Editar_Division").click(function(event) {
		Editar_Division();
	});

	$("#Editar_Division").click(function(event) {
		Editar_Division();
	});
	
	$("#Option_Eliminar_Division").click(function(event) {
		Eliminar_Division();
	});

	$("#Eliminar_Division").click(function(event) {
		Eliminar_Division();
	});


	/////////////////////////////////////////////////////////////////////
	/// Linea

	$("#Option_Agregar_Linea").click(function(event) {
		Agregar_Linea();
	});

	$("#Agregar_Linea").click(function(event) {
		Agregar_Linea();
	});

	$("#Option_Editar_Linea").click(function(event) {
		Editar_Linea();
	});

	$("#Editar_Linea").click(function(event) {
		Editar_Linea();
	});

	$("#Option_Eliminar_Linea").click(function(event) {
		Eliminar_Linea();
	});

	$("#Eliminar_Linea").click(function(event) {
		Eliminar_Linea();
	});
	

	/////////////////////////////////////////////////////////////////////
	/// Sublinea

	$("#Option_Agregar_Sublinea").click(function(event) {
		Agregar_Sublinea();
	});

	$("#Agregar_Sublinea").click(function(event) {
		Agregar_Sublinea();
	});

	$("#Option_Editar_Sublinea").click(function(event) {
		Editar_Sublinea();
	});

	$("#Editar_Sublinea").click(function(event) {
		Editar_Sublinea();
	});

	$("#Option_Eliminar_Sublinea").click(function(event) {
		Eliminar_Sublinea();
	});

	$("#Eliminar_Sublinea").click(function(event) {
		Eliminar_Sublinea();
	});

	


	/////////////////////////////////////////////////////////////////////
		// End Marca
	/////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////
		// Producto
	/////////////////////////////////////////////////////////////////////

	$("#Agregar_Productos").click(function(event) {
		Nuevo_Producto();
	});

	$("#Option_Agregar_Productos").click(function(event) {
		Nuevo_Producto();
	});

	$("#Editar_Productos").click(function(event) {
		Editar_Producto();
	});

	$("#Option_Editar_Productos").click(function(event) {
		Editar_Producto();
	});

	$("#Eliminar_Productos").click(function(event) {
		Eliminar_Producto();
	});

	$("#Option_Eliminar_Productos").click(function(event) {
		Eliminar_Producto();
	});

	$("#btnExportar").click(function (e) { 
		
		$.ajax({
			url: dir + 'index.php/Controller_Productos/exportarCSV',
			type: 'POST',
			processData: false,  // tell jQuery not to process the data
			contentType: false,
			timeout: 35000,
			beforeSend : function ()
			{
				$('#Cargando_Header').css('display','');
			},
			success: function(data)
			{
				console.log(data);
				forceFileDownload(data, 'Reporte_Productos');
			}
		})
		.done(function() {
			console.log("success");
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
		})
		.always(function() {
			$('#Cargando_Header').css('display','none');
		});
	});
	/////////////////////////////////////////////////////////////////////
		// End Producto
	/////////////////////////////////////////////////////////////////////

	$("#btn_Editar_Producto").click(function(event) {

		let Status 			= "";
		let Codigo 			= $("#txt_Codigo_Editar").val();
		let Proveedor 		= $("#select_Proveedor_Editar").val();
		let Producto 		= $("#txt_Producto_Editar").val();
		let Marca 			= $("#select_Marca_Editar").val();
		let Division 		= $("#select_Division_Editar").val();
		let Linea 			= $("#select_Linea_Editar").val();
		let Sublinea  		= $("#select_Sublinea_Editar").val();
		let Descripcion 	= $("#txt_Descripcion_Editar").val();
		let Volumen 		= $("#txt_Volumen_Editar").val();
		let Peso 			= $("#txt_Peso_Editar").val();
		let Ml 				= $("#txt_Ml_Editar").val();
		let Piezas 			= $("#txt_Pieza_Caja_Editar").val();
		let Min_Produccion 	= $("#txt_Minimo_Produccion_Editar").val();
		let Min_Inventario 	= $("#txt_Minimo_Inventario_Editar").val();
		let ClaveSAT 		= $("#txt_ClaveSAT_Editar").val();
		let UnidadSAT 		= $("#txt_Unidad_SAT_Editar").val();
		let Distribuidor	= 0;
		let Salon 			= 0;
		let Publico 		= 0;
		let Imagen 			= $("#txt_Imagen_Editar").val();
		let CodigoCaja 		= $("#txt_Codigo_Caja_Editar").val();
		let CantidadCaja 	= $("#txt_Cantidad_Caja_Editar").val();

		if( $('#checkStatus_Editar').prop('checked'))
		{
	    	Status = "Inactivo";
		}
		else
		{
			Status = "Activo";
		}

		if( $('#checkDistribuidor_Editar').prop('checked'))
		{
	    	Distribuidor = 1;
		}
		else
		{
			Distribuidor = 0;
		}

		if( $('#checkSalon_Editar').prop('checked'))
		{
	    	Salon = 1;
		}
		else
		{
			Salon = 0;
		}

		if( $('#checkPublico_Editar').prop('checked'))
		{
	    	Publico = 1;
		}
		else
		{
			Publico = 0;
		}

		if (CodigoCaja != null && CodigoCaja != "" && CantidadCaja != null && CantidadCaja != "" &&  CantidadCaja > 0 && Codigo != null && Codigo != "" && Producto != null && Producto != "" && Marca != null && Marca != "" && Division != null && Division != "" && Linea != null && Linea != "" && Sublinea != null && Sublinea != "" && Ml != null && Ml != "" && ClaveSAT != null && ClaveSAT != "" && UnidadSAT != null && UnidadSAT != "" && Min_Produccion != null && Min_Produccion != "" && Min_Inventario != null && Min_Inventario != "" )
		{

			if (ClaveSAT.length == 8)
			{
				if (UnidadSAT.length == 3)
				{

					var formData = new FormData();
					formData.append("Codigo", Codigo);
			    	formData.append("idProveedor", Proveedor);
			    	formData.append("Producto", Producto);
			    	formData.append("Marca", Marca);
			    	formData.append("Division", Division);
			    	formData.append("Linea", Linea);
			    	formData.append("Sublinea", Sublinea);
			    	formData.append("Descripcion", Descripcion);
			    	formData.append("Volumen", Volumen);
			    	formData.append("Peso", Peso);
			    	formData.append("Ml", Ml);
			    	formData.append("Piezas_x_empaque", Piezas);
			    	formData.append("Minimo_produccion", Min_Produccion);
			    	formData.append("Minimo_inventario_default", Min_Inventario);
			    	formData.append("Distribuidor", Distribuidor);
			    	formData.append("Salon", Salon);
			    	formData.append("Publico", Publico);
			    	formData.append("Status", Status);
			    	formData.append("Imagen", Imagen);
			    	formData.append("UnidadMedida", 'Pieza');
			    	formData.append("ClaveSAT", ClaveSAT);
			    	formData.append("UnidadSAT", UnidadSAT);		
					formData.append("ID", window.Table_Producto.childNodes[0].innerHTML);
					formData.append("CodigoCaja", CodigoCaja);
			    	formData.append("CantidadCaja", CantidadCaja);   	

			    	$.ajax({
						url: dir + 'index.php/Controller_Productos/Editar_Producto',
						type: 'POST',
						processData: false,  // tell jQuery not to process the data
			            contentType: false,
			            timeout: 35000,
			            //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			            data: formData,
			            beforeSend : function ()
			            {
			                $('#Cargando_Editar_Producto').css('display','');
			            },
			            success: function(data)
			            {
			            	console.log(data);

			            	if (!isNaN(data))
			            	{
			            		if (data > 0)
			            		{
			            			toastr.options = {
					                "closeButton": true,
					                "debug": false,
					                "newestOnTop": true,
					                "progressBar": true,
					                "positionClass": "toast-top-right",
					                "preventDuplicates": false,
					                "onclick": null,
					                "showDuration": "300",
					                "hideDuration": "1000",
					                "timeOut": "700",
					                "extendedTimeOut": "1000",
					                "showEasing": "swing",
					                "hideEasing": "linear",
					                "showMethod": "fadeIn",
					                "hideMethod": "fadeOut"
					                }

					        	toastr.success('Producto editado con exito', 'Correcto');

						        	$('#Table_Productos').DataTable().destroy();
						        	fetch_data();

						        	$("#myModal_Editar").modal("hide");
						        	Limpar();

						        	window.Table_Producto = null;
			            		}
			            		else if (data == 99999)
			            		{
			            			toastr.options = {
					                "closeButton": true,
					                "debug": false,
					                "newestOnTop": true,
					                "progressBar": true,
					                "positionClass": "toast-top-right",
					                "preventDuplicates": false,
					                "onclick": null,
					                "showDuration": "300",
					                "hideDuration": "1000",
					                "timeOut": "700",
					                "extendedTimeOut": "1000",
					                "showEasing": "swing",
					                "hideEasing": "linear",
					                "showMethod": "fadeIn",
					                "hideMethod": "fadeOut"
					                }

					        	toastr.info('Filas afectadas 0', 'Infomación');

					        	window.Table_Producto = null;
			            		}
			            		else
			            		{
			            		toastr.options = {
					                "closeButton": true,
					                "debug": false,
					                "newestOnTop": true,
					                "progressBar": true,
					                "positionClass": "toast-top-right",
					                "preventDuplicates": false,
					                "onclick": null,
					                "showDuration": "300",
					                "hideDuration": "1000",
					                "timeOut": "700",
					                "extendedTimeOut": "1000",
					                "showEasing": "swing",
					                "hideEasing": "linear",
					                "showMethod": "fadeIn",
					                "hideMethod": "fadeOut"
					                }

					        	toastr.error('Ocurrio un error al editar el producto', 'Error');
			            		}
			            	}
			            	else
			            	{
			            		toastr.options = {
					                "closeButton": true,
					                "debug": false,
					                "newestOnTop": true,
					                "progressBar": true,
					                "positionClass": "toast-top-right",
					                "preventDuplicates": false,
					                "onclick": null,
					                "showDuration": "300",
					                "hideDuration": "1000",
					                "timeOut": "700",
					                "extendedTimeOut": "1000",
					                "showEasing": "swing",
					                "hideEasing": "linear",
					                "showMethod": "fadeIn",
					                "hideMethod": "fadeOut"
					                }

					        	toastr.error('Ocurrio un error al editar el producto', 'Error');
			            	}
			            }
					})
					.done(function() {
						console.log("success");
					})
					.fail(function(jqXHR, textStatus, errorThrown) {

			             if (jqXHR.status === 0)
			             {

			              console.log('Not connect: Verify Network.');
			              location.reload();  

			            } else if (jqXHR.status == 404) {

			              console.log('Requested page not found [404]');

			            } else if (jqXHR.status == 500) {

			              console.log('Internal Server Error [500].');

			            } else if (textStatus === 'parsererror') {

			              console.log('Requested JSON parse failed.');

			            } else if (textStatus === 'timeout') {

			               console.log('Time out error.');

			             } else if (textStatus === 'abort') {

			               console.log('Ajax request aborted.');

			             } else {

			               console.log('Uncaught Error: ' + jqXHR.responseText);

			             }
			        	})
			     		.always(function() {
			     			$('#Cargando_Editar_Producto').css('display','none');
			     		});
				}
				else
				{
					toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        	toastr.warning('La unidad de medida esta mal formada', 'Advertencia');
				}
			}
			else
			{
				toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "700",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

        	toastr.warning('La clave producto servicio no esta bien formada', 'Advertencia');
			}

		}
		else
		{
			toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "700",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

        toastr.warning('Algunos campos obligatorios estan vacios', 'Advertencia');
		}
	});

	$("#btn_Nuevo_Producto").click(function(event) {
		
		let Status 			= "";
		let Codigo 			= $("#txt_Codigo").val();
		let Proveedor 		= $("#select_Proveedor").val();
		let Producto 		= $("#txt_Producto").val();
		let Marca 			= $("#select_Marca").val();
		let Division 		= $("#select_Division").val();
		let Linea 			= $("#select_Linea").val();
		let Sublinea  		= $("#select_Sublinea").val();
		let Descripcion 	= $("#txt_Descripcion").val();
		let Volumen 		= $("#txt_Volumen").val();
		let Peso 			= $("#txt_Peso").val();
		let Ml 				= $("#txt_Ml").val();
		let Piezas 			= $("#txt_Pieza_Caja").val();
		let Min_Produccion 	= $("#txt_Minimo_Produccion").val();
		let Min_Inventario 	= $("#txt_Minimo_Inventario").val();
		let ClaveSAT 		= $("#txt_ClaveSAT").val();
		let UnidadSAT 		= $("#txt_Unidad_SAT").val();
		let CodigoCaja 		= $("#txt_Codigo_Caja").val();
		let CantidadCaja	= $("#txt_Cantidad_Caja").val();
		let Distribuidor	= 0;
		let Salon 			= 0;
		let Publico 		= 0;
		let Imagen 			= $("#txt_Imagen").val();

		if( $('#checkStatus').prop('checked'))
		{
	    	Status = "Inactivo";
		}
		else
		{
			Status = "Activo";
		}

		if( $('#checkDistribuidor').prop('checked'))
		{
	    	Distribuidor = 1;
		}
		else
		{
			Distribuidor = 0;
		}

		if( $('#checkSalon').prop('checked'))
		{
	    	Salon = 1;
		}
		else
		{
			Salon = 0;
		}

		if( $('#checkPublico').prop('checked'))
		{
	    	Publico = 1;
		}
		else
		{
			Publico = 0;
		}

		if (CodigoCaja != null && CodigoCaja != "" && CantidadCaja != null && CantidadCaja != "" && CantidadCaja > 0 && Codigo != null && Codigo != "" && Producto != null && Producto != "" && Marca != null && Marca != "" && Division != null && Division != "" && Linea != null && Linea != "" && Sublinea != null && Sublinea != "" && Ml != null && Ml != "" && ClaveSAT != null && ClaveSAT != "" && UnidadSAT != null && UnidadSAT != "" && Min_Produccion != null && Min_Produccion != "" && Min_Inventario != null && Min_Inventario != "" )
		{

			if (ClaveSAT.length == 8)
			{
				if (UnidadSAT.length == 3)
				{

					var formData = new FormData();
					formData.append("Codigo", Codigo);
			    	formData.append("idProveedor", Proveedor);
			    	formData.append("Producto", Producto);
			    	formData.append("Marca", Marca);
			    	formData.append("Division", Division);
			    	formData.append("Linea", Linea);
			    	formData.append("Sublinea", Sublinea);
			    	formData.append("Descripcion", Descripcion);
			    	formData.append("Volumen", Volumen);
			    	formData.append("Peso", Peso);
			    	formData.append("Ml", Ml);
			    	formData.append("Piezas_x_empaque", Piezas);
			    	formData.append("Minimo_produccion", Min_Produccion);
			    	formData.append("Minimo_inventario_default", Min_Inventario);
			    	formData.append("Distribuidor", Distribuidor);
			    	formData.append("Salon", Salon);
			    	formData.append("Publico", Publico);
			    	formData.append("Status", Status);
			    	formData.append("Imagen", Imagen);
			    	formData.append("UnidadMedida", 'Pieza');
			    	formData.append("ClaveSAT", ClaveSAT);
					formData.append("UnidadSAT", UnidadSAT);
					formData.append("CodigoCaja", CodigoCaja);
			    	formData.append("CantidadCaja", CantidadCaja);			    	

			    	$.ajax({
						url: dir + 'index.php/Controller_Productos/Agregar_Producto',
						type: 'POST',
						processData: false,  // tell jQuery not to process the data
			            contentType: false,
			            timeout: 35000,
			            //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			            data: formData,
			            beforeSend : function ()
			            {
			                $('#Cargando_Agregar_Producto').css('display','');
			            },
			            success: function(data)
			            {
			            	console.log(data);

			            	if (!isNaN(data))
			            	{
			            		if (data == 1){
			            			toastr.options = {
					                "closeButton": true,
					                "debug": false,
					                "newestOnTop": true,
					                "progressBar": true,
					                "positionClass": "toast-top-right",
					                "preventDuplicates": false,
					                "onclick": null,
					                "showDuration": "300",
					                "hideDuration": "1000",
					                "timeOut": "700",
					                "extendedTimeOut": "1000",
					                "showEasing": "swing",
					                "hideEasing": "linear",
					                "showMethod": "fadeIn",
					                "hideMethod": "fadeOut"
					                }

					        	toastr.success('Producto creado con exito', 'Correcto');

						        	$('#Table_Productos').DataTable().destroy();
						        	fetch_data();

						        	$("#myModal").modal("hide");
						        	Limpar();
			            		}
			            		else{
			            		toastr.options = {
					                "closeButton": true,
					                "debug": false,
					                "newestOnTop": true,
					                "progressBar": true,
					                "positionClass": "toast-top-right",
					                "preventDuplicates": false,
					                "onclick": null,
					                "showDuration": "300",
					                "hideDuration": "1000",
					                "timeOut": "700",
					                "extendedTimeOut": "1000",
					                "showEasing": "swing",
					                "hideEasing": "linear",
					                "showMethod": "fadeIn",
					                "hideMethod": "fadeOut"
					                }

					        	toastr.error('Ocurrio un error al crear el producto', 'Error');
			            		}
			            	}
			            	else
			            	{
			            		toastr.options = {
					                "closeButton": true,
					                "debug": false,
					                "newestOnTop": true,
					                "progressBar": true,
					                "positionClass": "toast-top-right",
					                "preventDuplicates": false,
					                "onclick": null,
					                "showDuration": "300",
					                "hideDuration": "1000",
					                "timeOut": "700",
					                "extendedTimeOut": "1000",
					                "showEasing": "swing",
					                "hideEasing": "linear",
					                "showMethod": "fadeIn",
					                "hideMethod": "fadeOut"
					                }

					        	toastr.error('Ocurrio un error al crear el producto', 'Error');
			            	}
			            }
					})
					.done(function() {
						console.log("success");
					})
					.fail(function(jqXHR, textStatus, errorThrown) {

			             if (jqXHR.status === 0)
			             {

			              console.log('Not connect: Verify Network.');
			              location.reload();  

			            } else if (jqXHR.status == 404) {

			              console.log('Requested page not found [404]');

			            } else if (jqXHR.status == 500) {

			              console.log('Internal Server Error [500].');

			            } else if (textStatus === 'parsererror') {

			              console.log('Requested JSON parse failed.');

			            } else if (textStatus === 'timeout') {

			               console.log('Time out error.');

			             } else if (textStatus === 'abort') {

			               console.log('Ajax request aborted.');

			             } else {

			               console.log('Uncaught Error: ' + jqXHR.responseText);

			             }
			        	})
			     		.always(function() {
			     			$('#Cargando_Agregar_Producto').css('display','none');
			     		});
				}
				else
				{
					toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        	toastr.warning('La unidad de medida esta mal formada', 'Advertencia');
				}
			}
			else
			{
				toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "700",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

        	toastr.warning('La clave producto servicio no esta bien formada', 'Advertencia');
			}

		}
		else
		{
			toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "700",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

        toastr.warning('Algunos campos obligatorios estan vacios', 'Advertencia');
		}
	});


///////////////////////////////////////////////////////////////////////
/// Acciones Botones Marca
//////////////////////////////////////////////////////////////////////

$("#btn_Guardar_Marca").click(function(event) {

let Marca = $("#txt_Marca").val();
	if (Marca != null && Marca != "")
	{

	var formData = new FormData();
	formData.append("Marca", Marca);

	 $.ajax({
	    url: dir + 'index.php/Controller_Productos/Agregar_Marca',
	    type: 'POST',
	    processData: false,  // tell jQuery not to process the data
	    contentType: false,
	    timeout: 35000,
	    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	    data: formData,
	    beforeSend : function ()
	    {
	        $('#Cargando_Agregar_Marca').css('display','');
	    },
	    success: function(data)
	    {
	    	if (!isNaN(data))
	    	{
	    		if (data > 0)
	    		{
	    			toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        	toastr.success('Marca Creada con exito', 'Correcto');

		        	$('#Table_Marcas').DataTable().destroy();
		        	fetch_data_Marca();

		        	$("#Modal_Marca_Marca").modal("hide");
		        	Limpar();

		        	window.Table_Marcas = null;
	    		}
	    		else
	    		{
	    			toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        toastr.error('Filas afectadas 0', 'Error');
	    		}
	    	}
	    	else
	    	{
	    		toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        toastr.error('Ocurrio un error ' + data, 'Error');
	    	}
	    }
	    })
	    .done(function() {
	        console.log("success");
	    })
	     .fail(function(jqXHR, textStatus, errorThrown) {

	     if (jqXHR.status === 0)
	     {

	      console.log('Not connect: Verify Network.');
	      location.reload();  

	    } else if (jqXHR.status == 404) {

	      console.log('Requested page not found [404]');

	    } else if (jqXHR.status == 500) {

	      console.log('Internal Server Error [500].');

	    } else if (textStatus === 'parsererror') {

	      console.log('Requested JSON parse failed.');

	    } else if (textStatus === 'timeout') {

	       console.log('Time out error.');

	     } else if (textStatus === 'abort') {

	       console.log('Ajax request aborted.');

	     } else {

	       console.log('Uncaught Error: ' + jqXHR.responseText);

	     }
		})
	    .always(function() {
	        $('#Cargando_Agregar_Marca').css('display','none');
	    });
	}
	else
	{
		toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "700",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            }

    	toastr.warning('EL campo marca esta vacio', 'Advertencia');
	}
});


$("#btn_Guardar_Marca_Editar").click(function(event) {

	let Marca = $("#txt_Marca_Editar").val();
	if (Marca != null && Marca != "")
	{

	var formData = new FormData();
	formData.append('ID', window.Table_Marcas.childNodes[0].innerHTML);
	formData.append("Marca", Marca);

	 $.ajax({
	    url: dir + 'index.php/Controller_Productos/Editar_Marca',
	    type: 'POST',
	    processData: false,  // tell jQuery not to process the data
	    contentType: false,
	    timeout: 35000,
	    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	    data: formData,
	    beforeSend : function ()
	    {
	        $('#Cargando_Agregar_Marca_Editar').css('display','');
	    },
	    success: function(data)
	    {
	    	console.log(data);

        	if (!isNaN(data))
        	{
        		if (data > 0)
        		{
        			toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        	toastr.success('Marca editada con exito', 'Correcto');

		        	$('#Table_Marcas').DataTable().destroy();
		        	fetch_data_Marca();

		        	$("#Modal_Marca_Marca_Editar").modal("hide");
		        	Limpar();

		        	window.Table_Marcas = null;
        		}
        		else if (data == 99999)
        		{
        			toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        	toastr.info('Filas afectadas 0', 'Infomación');

	        	window.Table_Marcas = null;
        		}
        		else
        		{
        		toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        	toastr.error('Ocurrio un error al editar la marca', 'Error');
        		}
        	}
        	else
        	{
        		toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        	toastr.error('Ocurrio un error al editar la marca', 'Error');
        	}
	    }
	    })
	    .done(function() {
	        console.log("success");
	    })
	     .fail(function(jqXHR, textStatus, errorThrown) {

	     if (jqXHR.status === 0)
	     {

	      console.log('Not connect: Verify Network.');
	      location.reload();  

	    } else if (jqXHR.status == 404) {

	      console.log('Requested page not found [404]');

	    } else if (jqXHR.status == 500) {

	      console.log('Internal Server Error [500].');

	    } else if (textStatus === 'parsererror') {

	      console.log('Requested JSON parse failed.');

	    } else if (textStatus === 'timeout') {

	       console.log('Time out error.');

	     } else if (textStatus === 'abort') {

	       console.log('Ajax request aborted.');

	     } else {

	       console.log('Uncaught Error: ' + jqXHR.responseText);

	     }
		})
	    .always(function() {
	        $('#Cargando_Agregar_Marca_Editar').css('display','none');
	    });
	}
	else
	{
		toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "700",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            }

    	toastr.warning('EL campo marca esta vacio', 'Advertencia');
	}
});


//////////////////////////////////////////////////////////////////////////////////
//////////// División

$("#btn_Guardar_Division").click(function(event) {

let Division = $("#txt_Division").val();
	if (Division != null && Division != "")
	{

	var formData = new FormData();
	formData.append("Division", Division);

	 $.ajax({
	    url: dir + 'index.php/Controller_Productos/Agregar_Division',
	    type: 'POST',
	    processData: false,  // tell jQuery not to process the data
	    contentType: false,
	    timeout: 35000,
	    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	    data: formData,
	    beforeSend : function ()
	    {
	        $('#Cargando_Agregar_Division').css('display','');
	    },
	    success: function(data)
	    {
	    	if (!isNaN(data))
	    	{
	    		if (data > 0)
	    		{
	    			toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        	toastr.success('Division creada con exito', 'Correcto');

		        	$('#Table_Division').DataTable().destroy();
		        	fetch_data_Division();

		        	$("#Modal_Division").modal("hide");
		        	Limpar();

		        	window.Table_Division = null;
	    		}
	    		else
	    		{
	    			toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        toastr.error('Filas afectadas 0', 'Error');
	    		}
	    	}
	    	else
	    	{
	    		toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        toastr.error('Ocurrio un error ' + data, 'Error');
	    	}
	    }
	    })
	    .done(function() {
	        console.log("success");
	    })
	     .fail(function(jqXHR, textStatus, errorThrown) {

	     if (jqXHR.status === 0)
	     {

	      console.log('Not connect: Verify Network.');
	      location.reload();  

	    } else if (jqXHR.status == 404) {

	      console.log('Requested page not found [404]');

	    } else if (jqXHR.status == 500) {

	      console.log('Internal Server Error [500].');

	    } else if (textStatus === 'parsererror') {

	      console.log('Requested JSON parse failed.');

	    } else if (textStatus === 'timeout') {

	       console.log('Time out error.');

	     } else if (textStatus === 'abort') {

	       console.log('Ajax request aborted.');

	     } else {

	       console.log('Uncaught Error: ' + jqXHR.responseText);

	     }
		})
	    .always(function() {
	        $('#Cargando_Agregar_Division').css('display','none');
	    });
	}
	else
	{
		toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "700",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            }

    	toastr.warning('EL campo marca esta vacio', 'Advertencia');
	}
});

$("#btn_Guardar_Division_Editar").click(function(event) {

	let Division = $("#txt_Division_Editar").val();
	if (Division != null && Division != "")
	{

	var formData = new FormData();
	formData.append('ID', window.Table_Division.childNodes[0].innerHTML);
	formData.append("Division", Division);

	 $.ajax({
	    url: dir + 'index.php/Controller_Productos/Editar_Division',
	    type: 'POST',
	    processData: false,  // tell jQuery not to process the data
	    contentType: false,
	    timeout: 35000,
	    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	    data: formData,
	    beforeSend : function ()
	    {
	        $('#Cargando_Editar_Division').css('display','');
	    },
	    success: function(data)
	    {
	    	console.log(data);

        	if (!isNaN(data))
        	{
        		if (data > 0)
        		{
        			toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        	toastr.success('Division editada con exito', 'Correcto');

		        	$('#Table_Division').DataTable().destroy();
		        	fetch_data_Division();

		        	$("#Modal_Division_Editar").modal("hide");
		        	Limpar();

		        	window.Table_Division = null;
        		}
        		else if (data == 99999)
        		{
        			toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        	toastr.info('Filas afectadas 0', 'Infomación');

	        	window.Table_Marcas = null;
        		}
        		else
        		{
        		toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        	toastr.error('Ocurrio un error al editar la marca', 'Error');
        		}
        	}
        	else
        	{
        		toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        	toastr.error('Ocurrio un error al editar la marca', 'Error');
        	}
	    }
	    })
	    .done(function() {
	        console.log("success");
	    })
	     .fail(function(jqXHR, textStatus, errorThrown) {

	     if (jqXHR.status === 0)
	     {

	      console.log('Not connect: Verify Network.');
	      location.reload();  

	    } else if (jqXHR.status == 404) {

	      console.log('Requested page not found [404]');

	    } else if (jqXHR.status == 500) {

	      console.log('Internal Server Error [500].');

	    } else if (textStatus === 'parsererror') {

	      console.log('Requested JSON parse failed.');

	    } else if (textStatus === 'timeout') {

	       console.log('Time out error.');

	     } else if (textStatus === 'abort') {

	       console.log('Ajax request aborted.');

	     } else {

	       console.log('Uncaught Error: ' + jqXHR.responseText);

	     }
		})
	    .always(function() {
	        $('#Cargando_Editar_Division').css('display','none');
	    });
	}
	else
	{
		toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "700",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            }

    	toastr.warning('EL campo marca esta vacio', 'Advertencia');
	}
});

///////////////////////////////////////////////////////////////////////////
// Linea

$("#btn_Guardar_Linea").click(function(event) {

	let Division = $("#select_Division_Agregar_Linea").val();
	let Linea 	 = $("#txt_Linea").val();

	if (Division != null && Division != "" && Linea != null && Linea != "")
	{

	var formData = new FormData();
	formData.append("idDivision", Division);
	formData.append("Linea", Linea);

	 $.ajax({
	    url: dir + 'index.php/Controller_Productos/Agregar_Linea',
	    type: 'POST',
	    processData: false,  // tell jQuery not to process the data
	    contentType: false,
	    timeout: 35000,
	    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	    data: formData,
	    beforeSend : function ()
	    {
	        $('#Cargando_Agregar_Linea').css('display','');
	    },
	    success: function(data)
	    {
	    	if (!isNaN(data))
	    	{
	    		if (data > 0)
	    		{
	    			toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        	toastr.success('Linea creada con exito', 'Correcto');

		        	$('#Table_Lineas').DataTable().destroy();
		        	fetch_data_Linea();

		        	$("#Modal_Linea").modal("hide");
		        	Limpar();

		        	window.Table_Linea = null;
	    		}
	    		else
	    		{
	    			toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        toastr.error('Filas afectadas 0', 'Error');
	    		}
	    	}
	    	else
	    	{
	    		toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        toastr.error('Ocurrio un error ' + data, 'Error');
	    	}
	    }
	    })
	    .done(function() {
	        console.log("success");
	    })
	     .fail(function(jqXHR, textStatus, errorThrown) {

	     if (jqXHR.status === 0)
	     {

	      console.log('Not connect: Verify Network.');
	      location.reload();  

	    } else if (jqXHR.status == 404) {

	      console.log('Requested page not found [404]');

	    } else if (jqXHR.status == 500) {

	      console.log('Internal Server Error [500].');

	    } else if (textStatus === 'parsererror') {

	      console.log('Requested JSON parse failed.');

	    } else if (textStatus === 'timeout') {

	       console.log('Time out error.');

	     } else if (textStatus === 'abort') {

	       console.log('Ajax request aborted.');

	     } else {

	       console.log('Uncaught Error: ' + jqXHR.responseText);

	     }
		})
	    .always(function() {
	        $('#Cargando_Agregar_Linea').css('display','none');
	    });
	}
	else
	{
		toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "700",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            }

    	toastr.warning('EL campo división y/o linea estan vacios', 'Advertencia');
	}
});

$("#btn_Guardar_Linea_Editar").click(function(event) {


	let Division = $("#select_Division_Editar_Linea").val();
	let Linea 	 = $("#txt_Linea_Editar").val();

	if (window.Table_Linea != null && window.Table_Linea != "")
	{

			if (Division != null && Division != "" && Linea != null && Linea != "")
			{

			var formData = new FormData();
			formData.append("idDivision", Division);
			formData.append("Linea", Linea);
			formData.append("ID", window.Table_Linea.childNodes[0].innerHTML);

			 $.ajax({
			    url: dir + 'index.php/Controller_Productos/Editar_Linea',
			    type: 'POST',
			    processData: false,  // tell jQuery not to process the data
			    contentType: false,
			    timeout: 35000,
			    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			    data: formData,
			    beforeSend : function ()
			    {
			        $('#Cargando_Editar_Linea').css('display','');
			    },
			    success: function(data)
			    {
			    	if (!isNaN(data))
			    	{
			    		if (data > 0)
			    		{
			    			toastr.options = {
			                "closeButton": true,
			                "debug": false,
			                "newestOnTop": true,
			                "progressBar": true,
			                "positionClass": "toast-top-right",
			                "preventDuplicates": false,
			                "onclick": null,
			                "showDuration": "300",
			                "hideDuration": "1000",
			                "timeOut": "700",
			                "extendedTimeOut": "1000",
			                "showEasing": "swing",
			                "hideEasing": "linear",
			                "showMethod": "fadeIn",
			                "hideMethod": "fadeOut"
			                }

			        	toastr.success('Linea creada con exito', 'Correcto');

				        	$('#Table_Lineas').DataTable().destroy();
				        	fetch_data_Linea();

				        	$("#Modal_Linea_Editar").modal("hide");
				        	Limpar();

				        	window.Table_Linea = null;
			    		}
			    		else
			    		{
			    			toastr.options = {
			                "closeButton": true,
			                "debug": false,
			                "newestOnTop": true,
			                "progressBar": true,
			                "positionClass": "toast-top-right",
			                "preventDuplicates": false,
			                "onclick": null,
			                "showDuration": "300",
			                "hideDuration": "1000",
			                "timeOut": "700",
			                "extendedTimeOut": "1000",
			                "showEasing": "swing",
			                "hideEasing": "linear",
			                "showMethod": "fadeIn",
			                "hideMethod": "fadeOut"
			                }

			        toastr.error('Filas afectadas 0', 'Error');
			    		}
			    	}
			    	else
			    	{
			    		toastr.options = {
			                "closeButton": true,
			                "debug": false,
			                "newestOnTop": true,
			                "progressBar": true,
			                "positionClass": "toast-top-right",
			                "preventDuplicates": false,
			                "onclick": null,
			                "showDuration": "300",
			                "hideDuration": "1000",
			                "timeOut": "700",
			                "extendedTimeOut": "1000",
			                "showEasing": "swing",
			                "hideEasing": "linear",
			                "showMethod": "fadeIn",
			                "hideMethod": "fadeOut"
			                }

			        toastr.error('Ocurrio un error ' + data, 'Error');
			    	}
			    }
			    })
			    .done(function() {
			        console.log("success");
			    })
			     .fail(function(jqXHR, textStatus, errorThrown) {

			     if (jqXHR.status === 0)
			     {

			      console.log('Not connect: Verify Network.');
			      location.reload();  

			    } else if (jqXHR.status == 404) {

			      console.log('Requested page not found [404]');

			    } else if (jqXHR.status == 500) {

			      console.log('Internal Server Error [500].');

			    } else if (textStatus === 'parsererror') {

			      console.log('Requested JSON parse failed.');

			    } else if (textStatus === 'timeout') {

			       console.log('Time out error.');

			     } else if (textStatus === 'abort') {

			       console.log('Ajax request aborted.');

			     } else {

			       console.log('Uncaught Error: ' + jqXHR.responseText);

			     }
				})
			    .always(function() {
			        $('#Cargando_Editar_Linea').css('display','none');
			    });
			}
			else
			{
				toastr.options = {
		            "closeButton": true,
		            "debug": false,
		            "newestOnTop": true,
		            "progressBar": true,
		            "positionClass": "toast-top-right",
		            "preventDuplicates": false,
		            "onclick": null,
		            "showDuration": "300",
		            "hideDuration": "1000",
		            "timeOut": "700",
		            "extendedTimeOut": "1000",
		            "showEasing": "swing",
		            "hideEasing": "linear",
		            "showMethod": "fadeIn",
		            "hideMethod": "fadeOut"
		            }

		    	toastr.warning('EL campo división y/o linea estan vacios', 'Advertencia');
			}
		}
		else
		{
			toastr.options = {
		            "closeButton": true,
		            "debug": false,
		            "newestOnTop": true,
		            "progressBar": true,
		            "positionClass": "toast-top-right",
		            "preventDuplicates": false,
		            "onclick": null,
		            "showDuration": "300",
		            "hideDuration": "1000",
		            "timeOut": "700",
		            "extendedTimeOut": "1000",
		            "showEasing": "swing",
		            "hideEasing": "linear",
		            "showMethod": "fadeIn",
		            "hideMethod": "fadeOut"
		            }

		    	toastr.warning('Seleccione una linea', 'Advertencia');
		}
});


///////////////////////////////////////////////////////////////////////////
// Sublinea

$("#btn_Guardar_Sublinea").click(function(event) {

	let Linea = $("#select_Linea_Agregar_Linea").val();
	let Sublinea 	 = $("#txt_Sublinea").val();

	if (Sublinea != null && Sublinea != "" && Linea != null && Linea != "")
	{

	var formData = new FormData();
	formData.append("idLinea", Linea);
	formData.append("Sublinea", Sublinea);

	 $.ajax({
	    url: dir + 'index.php/Controller_Productos/Agregar_Sublinea',
	    type: 'POST',
	    processData: false,  // tell jQuery not to process the data
	    contentType: false,
	    timeout: 35000,
	    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	    data: formData,
	    beforeSend : function ()
	    {
	        $('#Cargando_Agregar_Sublinea').css('display','');
	    },
	    success: function(data)
	    {
	    	if (!isNaN(data))
	    	{
	    		if (data > 0)
	    		{
	    			toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        	toastr.success('Linea creada con exito', 'Correcto');

		        	$('#Table_Sublinea').DataTable().destroy();
		        	fetch_data_Sublinea();

		        	$("#Modal_Sublinea").modal("hide");
		        	Limpar();

		        	window.Table_Sublinea = null;
	    		}
	    		else
	    		{
	    			toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        toastr.error('Filas afectadas 0', 'Error');
	    		}
	    	}
	    	else
	    	{
	    		toastr.options = {
	                "closeButton": true,
	                "debug": false,
	                "newestOnTop": true,
	                "progressBar": true,
	                "positionClass": "toast-top-right",
	                "preventDuplicates": false,
	                "onclick": null,
	                "showDuration": "300",
	                "hideDuration": "1000",
	                "timeOut": "700",
	                "extendedTimeOut": "1000",
	                "showEasing": "swing",
	                "hideEasing": "linear",
	                "showMethod": "fadeIn",
	                "hideMethod": "fadeOut"
	                }

	        toastr.error('Ocurrio un error ' + data, 'Error');
	    	}
	    }
	    })
	    .done(function() {
	        console.log("success");
	    })
	     .fail(function(jqXHR, textStatus, errorThrown) {

	     if (jqXHR.status === 0)
	     {

	      console.log('Not connect: Verify Network.');
	      location.reload();  

	    } else if (jqXHR.status == 404) {

	      console.log('Requested page not found [404]');

	    } else if (jqXHR.status == 500) {

	      console.log('Internal Server Error [500].');

	    } else if (textStatus === 'parsererror') {

	      console.log('Requested JSON parse failed.');

	    } else if (textStatus === 'timeout') {

	       console.log('Time out error.');

	     } else if (textStatus === 'abort') {

	       console.log('Ajax request aborted.');

	     } else {

	       console.log('Uncaught Error: ' + jqXHR.responseText);

	     }
		})
	    .always(function() {
	        $('#Cargando_Agregar_Sublinea').css('display','none');
	    });
	}
	else
	{
		toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "700",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            }

    	toastr.warning('EL campo linea y/o sublinea estan vacios', 'Advertencia');
	}
});


$("#btn_Guardar_Sublinea_Editar").click(function(event) {


	let Linea 		 = $("#select_Linea_Editar_Linea").val();
	let Sublinea 	 = $("#txt_Sublinea_Editar").val();

	if (window.Table_Sublinea != null && window.Table_Sublinea != "")
	{

			if (Linea != null && Linea != "" && Sublinea != null && Sublinea != "")
			{

			var formData = new FormData();
			formData.append("idLinea", Linea);
			formData.append("Sublinea", Sublinea);
			formData.append("ID", window.Table_Sublinea.childNodes[0].innerHTML);

			 $.ajax({
			    url: dir + 'index.php/Controller_Productos/Editar_Sublinea',
			    type: 'POST',
			    processData: false,  // tell jQuery not to process the data
			    contentType: false,
			    timeout: 35000,
			    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			    data: formData,
			    beforeSend : function ()
			    {
			        $('#Cargando_Editar_Sublinea').css('display','');
			    },
			    success: function(data)
			    {
			    	if (!isNaN(data))
			    	{
			    		if (data > 0)
			    		{
			    			toastr.options = {
			                "closeButton": true,
			                "debug": false,
			                "newestOnTop": true,
			                "progressBar": true,
			                "positionClass": "toast-top-right",
			                "preventDuplicates": false,
			                "onclick": null,
			                "showDuration": "300",
			                "hideDuration": "1000",
			                "timeOut": "700",
			                "extendedTimeOut": "1000",
			                "showEasing": "swing",
			                "hideEasing": "linear",
			                "showMethod": "fadeIn",
			                "hideMethod": "fadeOut"
			                }

			        	toastr.success('Sublineas creada con exito', 'Correcto');

				        	$('#Table_Sublinea').DataTable().destroy();
				        	fetch_data_Sublinea();

				        	$("#Modal_Sublinea_Editar").modal("hide");
				        	Limpar();

				        	window.Table_Sublinea = null;
			    		}
			    		else
			    		{
			    			toastr.options = {
			                "closeButton": true,
			                "debug": false,
			                "newestOnTop": true,
			                "progressBar": true,
			                "positionClass": "toast-top-right",
			                "preventDuplicates": false,
			                "onclick": null,
			                "showDuration": "300",
			                "hideDuration": "1000",
			                "timeOut": "700",
			                "extendedTimeOut": "1000",
			                "showEasing": "swing",
			                "hideEasing": "linear",
			                "showMethod": "fadeIn",
			                "hideMethod": "fadeOut"
			                }

			        toastr.error('Filas afectadas 0', 'Error');
			    		}
			    	}
			    	else
			    	{
			    		toastr.options = {
			                "closeButton": true,
			                "debug": false,
			                "newestOnTop": true,
			                "progressBar": true,
			                "positionClass": "toast-top-right",
			                "preventDuplicates": false,
			                "onclick": null,
			                "showDuration": "300",
			                "hideDuration": "1000",
			                "timeOut": "700",
			                "extendedTimeOut": "1000",
			                "showEasing": "swing",
			                "hideEasing": "linear",
			                "showMethod": "fadeIn",
			                "hideMethod": "fadeOut"
			                }

			        toastr.error('Ocurrio un error ' + data, 'Error');
			    	}
			    }
			    })
			    .done(function() {
			        console.log("success");
			    })
			     .fail(function(jqXHR, textStatus, errorThrown) {

			     if (jqXHR.status === 0)
			     {

			      console.log('Not connect: Verify Network.');
			      location.reload();  

			    } else if (jqXHR.status == 404) {

			      console.log('Requested page not found [404]');

			    } else if (jqXHR.status == 500) {

			      console.log('Internal Server Error [500].');

			    } else if (textStatus === 'parsererror') {

			      console.log('Requested JSON parse failed.');

			    } else if (textStatus === 'timeout') {

			       console.log('Time out error.');

			     } else if (textStatus === 'abort') {

			       console.log('Ajax request aborted.');

			     } else {

			       console.log('Uncaught Error: ' + jqXHR.responseText);

			     }
				})
			    .always(function() {
			        $('#Cargando_Editar_Sublinea').css('display','none');
			    });
			}
			else
			{
				toastr.options = {
		            "closeButton": true,
		            "debug": false,
		            "newestOnTop": true,
		            "progressBar": true,
		            "positionClass": "toast-top-right",
		            "preventDuplicates": false,
		            "onclick": null,
		            "showDuration": "300",
		            "hideDuration": "1000",
		            "timeOut": "700",
		            "extendedTimeOut": "1000",
		            "showEasing": "swing",
		            "hideEasing": "linear",
		            "showMethod": "fadeIn",
		            "hideMethod": "fadeOut"
		            }

		    	toastr.warning('EL campo linea y/o sublinea estan vacios', 'Advertencia');
			}
		}
		else
		{
			toastr.options = {
		            "closeButton": true,
		            "debug": false,
		            "newestOnTop": true,
		            "progressBar": true,
		            "positionClass": "toast-top-right",
		            "preventDuplicates": false,
		            "onclick": null,
		            "showDuration": "300",
		            "hideDuration": "1000",
		            "timeOut": "700",
		            "extendedTimeOut": "1000",
		            "showEasing": "swing",
		            "hideEasing": "linear",
		            "showMethod": "fadeIn",
		            "hideMethod": "fadeOut"
		            }

		    	toastr.warning('Seleccione una sublinea', 'Advertencia');
		}
});

});


function Eliminar_Producto()
{
	if (window.Table_Producto != null && window.Table_Producto != "")
	{
		swal({
		  title: "¿Esta seguro que desea eliminar el producto seleccionado?",
		  text: "Una vez eliminado pasara con estatus de inactivo",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {

		  	if (window.Table_Producto.childNodes[18].childNodes[0].innerHTML != 'Inactivo')
		  	{		   
				   var formData = new FormData();
					formData.append("idCatalogo", window.Table_Producto.childNodes[0].innerHTML);

					 $.ajax({
					    url: dir + 'index.php/Controller_Productos/Eliminar_Producto',
					    type: 'POST',
					    processData: false,  // tell jQuery not to process the data
					    contentType: false,
					    timeout: 35000,
					    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
					    data: formData,
					    beforeSend : function ()
					    {
					        $('#Cargando_Header').css('display','');
					    },
					    success: function(data)
					    {
					    	if (!isNaN(data))
					    	{
					    		if (data > 0)
					    		{
					    			toastr.options = {
					                "closeButton": true,
					                "debug": false,
					                "newestOnTop": true,
					                "progressBar": true,
					                "positionClass": "toast-top-right",
					                "preventDuplicates": false,
					                "onclick": null,
					                "showDuration": "300",
					                "hideDuration": "1000",
					                "timeOut": "700",
					                "extendedTimeOut": "1000",
					                "showEasing": "swing",
					                "hideEasing": "linear",
					                "showMethod": "fadeIn",
					                "hideMethod": "fadeOut"
					                }

					        	toastr.success('Producto eliminado con exito', 'Correcto');

						        	$('#Table_Productos').DataTable().destroy();
						        	fetch_data();

						        	$("#myModal").modal("hide");
						        	Limpar();

						        	window.Table_Producto = null;
					    		}
					    		else
					    		{
					    			toastr.options = {
					                "closeButton": true,
					                "debug": false,
					                "newestOnTop": true,
					                "progressBar": true,
					                "positionClass": "toast-top-right",
					                "preventDuplicates": false,
					                "onclick": null,
					                "showDuration": "300",
					                "hideDuration": "1000",
					                "timeOut": "700",
					                "extendedTimeOut": "1000",
					                "showEasing": "swing",
					                "hideEasing": "linear",
					                "showMethod": "fadeIn",
					                "hideMethod": "fadeOut"
					                }

					        toastr.error('Filas afectadas 0', 'Error');
					    		}
					    	}
					    	else
					    	{
					    		toastr.options = {
					                "closeButton": true,
					                "debug": false,
					                "newestOnTop": true,
					                "progressBar": true,
					                "positionClass": "toast-top-right",
					                "preventDuplicates": false,
					                "onclick": null,
					                "showDuration": "300",
					                "hideDuration": "1000",
					                "timeOut": "700",
					                "extendedTimeOut": "1000",
					                "showEasing": "swing",
					                "hideEasing": "linear",
					                "showMethod": "fadeIn",
					                "hideMethod": "fadeOut"
					                }

					        toastr.error('Ocurrio un error ' + data, 'Error');
					    	}
					    }
					    })
					    .done(function() {
					        console.log("success");
					    })
					     .fail(function(jqXHR, textStatus, errorThrown) {

					     if (jqXHR.status === 0)
					     {

					      console.log('Not connect: Verify Network.');
					      location.reload();  

					    } else if (jqXHR.status == 404) {

					      console.log('Requested page not found [404]');

					    } else if (jqXHR.status == 500) {

					      console.log('Internal Server Error [500].');

					    } else if (textStatus === 'parsererror') {

					      console.log('Requested JSON parse failed.');

					    } else if (textStatus === 'timeout') {

					       console.log('Time out error.');

					     } else if (textStatus === 'abort') {

					       console.log('Ajax request aborted.');

					     } else {

					       console.log('Uncaught Error: ' + jqXHR.responseText);

					     }
						})
					    .always(function() {
					        $('#Cargando_Header').css('display','none');
					    });
				}
				else
				{
					toastr.options = {
		                "closeButton": true,
		                "debug": false,
		                "newestOnTop": true,
		                "progressBar": true,
		                "positionClass": "toast-top-right",
		                "preventDuplicates": false,
		                "onclick": null,
		                "showDuration": "300",
		                "hideDuration": "1000",
		                "timeOut": "700",
		                "extendedTimeOut": "1000",
		                "showEasing": "swing",
		                "hideEasing": "linear",
		                "showMethod": "fadeIn",
		                "hideMethod": "fadeOut"
		                }

		        toastr.warning('El producto ya se encuentra como inactivo', 'Advertencia');
				}
		  } 
		});
	}
	else
	{
		toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "700",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

        toastr.warning('Seleccione un producto', 'Advertencia');
	}
}


function Editar_Producto()
{
	if (window.Table_Producto != null && window.Table_Producto != "")
	{
		var formData = new FormData();
		formData.append("idCatalogo", window.Table_Producto.childNodes[0].innerHTML);

		 $.ajax({
		    url: dir + 'index.php/Controller_Productos/Consultar_Info_Editar',
		    type: 'POST',
		    processData: false,  // tell jQuery not to process the data
		    contentType: false,
		    timeout: 35000,
		    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		    data: formData,
		    beforeSend : function ()
		    {
		        $('#Cargando_Header').css('display','');
		    },
		    success: function(data)
		    {
				let parsed = JSON.parse(data);
				
				console.log(parsed);

		    	$("#select_Proveedor_Editar").empty();
		        $("#select_Marca_Editar").empty();
		        $("#select_Division_Editar").empty();
		        $("#select_Linea_Editar").empty();
		        $("#select_Sublinea_Editar").empty();

		        $("#select_Proveedor_Editar").append("<option value=''>Seleccionar...</option>");
		        $("#select_Marca_Editar").append("<option value=''>Seleccionar...</option>");
		        $("#select_Division_Editar").append("<option value=''>Seleccionar...</option>");
		        $("#select_Linea_Editar").append("<option value=''>Seleccionar...</option>");
		        $("#select_Sublinea_Editar").append("<option value=''>Seleccionar...</option>");

		        for (var i = 0; i < parsed['Proveedores'].length; i++) 
			    {
			        $("#select_Proveedor_Editar").append("<option value='" + parsed['Proveedores'][i]['ID'] + "'>" + parsed['Proveedores'][i]['Nombre'] + " " + parsed['Proveedores'][i]['Apellidos'] + "</option>");
			    }

			    for (var i = 0; i < parsed['Division'].length; i++) 
			    {
			        $("#select_Division_Editar").append("<option value='" + parsed['Division'][i]['ID'] + "'>" + parsed['Division'][i]['Division'] + "</option>");
			    }

			    for (var i = 0; i < parsed['Marca'].length; i++) 
			    {
			        $("#select_Marca_Editar").append("<option value='" + parsed['Marca'][i]['ID'] + "'>" + parsed['Marca'][i]['Marca'] + "</option>");
			    }

			    for (var i = 0; i < parsed['Linea'].length; i++) 
			    {
			        $("#select_Linea_Editar").append("<option value='" + parsed['Linea'][i]['ID'] + "'>" + parsed['Linea'][i]['Linea'] +"</option>");
			    }

			   	for (var i = 0; i < parsed['Sublinea'].length; i++) 
			    {
			        $("#select_Sublinea_Editar").append("<option value='" + parsed['Sublinea'][i]['ID'] + "'>" + parsed['Sublinea'][i]['Sublinea'] +"</option>");
			    }

			    $("#txt_Codigo_Editar").val(parsed['Catalogo'][0]['Codigo']);
				$("#select_Proveedor_Editar").val(parsed['Catalogo'][0]['idProveedor']);
				$("#txt_Producto_Editar").val(parsed['Catalogo'][0]['Producto']);
				$("#select_Marca_Editar").val(parsed['Catalogo'][0]['Marca']);
				$("#select_Division_Editar").val(parsed['Catalogo'][0]['Division']);
				$("#select_Linea_Editar").val(parsed['Catalogo'][0]['Linea']);
				$("#select_Sublinea_Editar").val(parsed['Catalogo'][0]['Sublinea']);
				$("#txt_Descripcion_Editar").val(parsed['Catalogo'][0]['Descripcion']);
				$("#txt_Volumen_Editar").val(parsed['Catalogo'][0]['Volumen']);
				$("#txt_Peso_Editar").val(parsed['Catalogo'][0]['Peso']);
				$("#txt_Ml_Editar").val(parsed['Catalogo'][0]['Ml']);
				$("#txt_Pieza_Caja_Editar").val(parsed['Catalogo'][0]['Piezas_x_empaque']);
				$("#txt_Minimo_Produccion_Editar").val(parsed['Catalogo'][0]['Minimo_produccion']);
				$("#txt_Minimo_Inventario_Editar").val(parsed['Catalogo'][0]['Minimo_inventario_default']);
				$("#txt_ClaveSAT_Editar").val(parsed['Catalogo'][0]['ClaveSAT']);
				$("#txt_Unidad_SAT_Editar").val(parsed['Catalogo'][0]['UnidadSAT']);
				$("#txt_Imagen_Editar").val(parsed['Catalogo'][0]['Imagen']);

				$("#txt_Codigo_Caja_Editar").val(parsed['Catalogo'][0]['CodigoCaja']);
				$("#txt_Cantidad_Caja_Editar").val(parsed['Catalogo'][0]['CantidadCaja']);

				if (parsed['Catalogo'][0]['Distribuidor'] == 1)
				{
					$('#checkDistribuidor_Editar').prop('checked',true);
				}
				else
				{
					$('#checkDistribuidor_Editar').prop('checked',false);
				}

				if (parsed['Catalogo'][0]['Status'] == 'Inactivo')
				{
					$('#checkStatus_Editar').prop('checked',true);
				}
				else
				{
					$('#checkStatus_Editar').prop('checked',false);
				}

				if (parsed['Catalogo'][0]['Salon'] == 1)
				{
					$('#checkSalon_Editar').prop('checked',true);
				}
				else
				{
					$('#checkSalon_Editar').prop('checked',false);
				}

				if (parsed['Catalogo'][0]['Publico'] == 1)
				{
					$('#checkPublico_Editar').prop('checked',true);
				}
				else
				{
					$('#checkPublico_Editar').prop('checked',false);
				}

			    $("#myModal_Editar").modal("show");
		    }
		    })
		    .done(function() {
		        console.log("success");
		    })
		     .fail(function(jqXHR, textStatus, errorThrown) {

		     if (jqXHR.status === 0)
		     {

		      console.log('Not connect: Verify Network.');
		      location.reload();  

		    } else if (jqXHR.status == 404) {

		      console.log('Requested page not found [404]');

		    } else if (jqXHR.status == 500) {

		      console.log('Internal Server Error [500].');

		    } else if (textStatus === 'parsererror') {

		      console.log('Requested JSON parse failed.');

		    } else if (textStatus === 'timeout') {

		       console.log('Time out error.');

		     } else if (textStatus === 'abort') {

		       console.log('Ajax request aborted.');

		     } else {

		       console.log('Uncaught Error: ' + jqXHR.responseText);

		     }
			})
		    .always(function() {
		        $('#Cargando_Header').css('display','none');
		    });
	}
	else
	{
		toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "700",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

        toastr.warning('Seleccione un producto', 'Advertencia');
	}
}

function Nuevo_Producto()
{
	var formData = new FormData();
    //formData.append("idVenta", window.Tabla_Extracciones_Historial.childNodes[0].innerHTML);

 $.ajax({
    url: dir + 'index.php/Controller_Productos/Consultar_Info',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 35000,
    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
    data: formData,
    beforeSend : function ()
    {
        $('#Cargando_Header').css('display','');
    },
    success: function(data)
    {
    	let parsed = JSON.parse(data);

    	$("#select_Proveedor").empty();
        $("#select_Marca").empty();
        $("#select_Division").empty();
        $("#select_Linea").empty();
        $("#select_Sublinea").empty();

        $("#select_Proveedor").append("<option value=''>Seleccionar...</option>");
        $("#select_Marca").append("<option value=''>Seleccionar...</option>");
        $("#select_Division").append("<option value=''>Seleccionar...</option>");
        $("#select_Linea").append("<option value=''>Seleccionar...</option>");
        $("#select_Sublinea").append("<option value=''>Seleccionar...</option>");

        for (var i = 0; i < parsed['Proveedores'].length; i++) 
	    {
	        $("#select_Proveedor").append("<option value='" + parsed['Proveedores'][i]['ID'] + "'>" + parsed['Proveedores'][i]['Nombre'] + " " + parsed['Proveedores'][i]['Apellidos'] + "</option>");
	    }

	    for (var i = 0; i < parsed['Division'].length; i++) 
	    {
	        $("#select_Division").append("<option value='" + parsed['Division'][i]['ID'] + "'>" + parsed['Division'][i]['Division'] + "</option>");
	    }

	    for (var i = 0; i < parsed['Marca'].length; i++) 
	    {
	        $("#select_Marca").append("<option value='" + parsed['Marca'][i]['ID'] + "'>" + parsed['Marca'][i]['Marca'] + "</option>");
	    }

	    for (var i = 0; i < parsed['Linea'].length; i++) 
	    {
	        $("#select_Linea").append("<option value='" + parsed['Linea'][i]['ID'] + "'>" + parsed['Linea'][i]['Linea'] +"</option>");
	    }

	   	for (var i = 0; i < parsed['Sublinea'].length; i++) 
	    {
	        $("#select_Sublinea").append("<option value='" + parsed['Sublinea'][i]['ID'] + "'>" + parsed['Sublinea'][i]['Sublinea'] +"</option>");
	    }

	    $("#myModal").modal("show");
    }
    })
    .done(function() {
        console.log("success");
    })
     .fail(function(jqXHR, textStatus, errorThrown) {

     if (jqXHR.status === 0)
     {

      console.log('Not connect: Verify Network.');
      location.reload();  

    } else if (jqXHR.status == 404) {

      console.log('Requested page not found [404]');

    } else if (jqXHR.status == 500) {

      console.log('Internal Server Error [500].');

    } else if (textStatus === 'parsererror') {

      console.log('Requested JSON parse failed.');

    } else if (textStatus === 'timeout') {

       console.log('Time out error.');

     } else if (textStatus === 'abort') {

       console.log('Ajax request aborted.');

     } else {

       console.log('Uncaught Error: ' + jqXHR.responseText);

     }
	})
    .always(function() {
        $('#Cargando_Header').css('display','none');
    });
	
}

//////////////////////////////////////////////////////////////////////
////// 	Funciones para la Marca
//////////////////////////////////////////////////////////////////////

function Editar_Marca()
{

	if (window.Table_Marcas != null && window.Table_Marcas != "")
	{
		$("#Modal_Marca_Marca_Editar").modal("show");
		$("#txt_Marca_Editar").val(window.Table_Marcas.childNodes[1].innerHTML);
	}
	else
	{
		toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "700",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

        toastr.warning('Seleccione una Marca', 'Advertencia');
	}
}

function Eliminar_Marca()
{
	if (window.Table_Marcas != null && window.Table_Marcas != "")
	{
		swal({
			  title: "¿Esta seguro que desea eliminar esta marca?",
			  text: "Si la marca ya esta asignada a un producto no sera posible eliminarla",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {

			  	var formData = new FormData();
				formData.append("ID", window.Table_Marcas.childNodes[0].innerHTML);

				 $.ajax({
				    url: dir + 'index.php/Controller_Productos/Eliminar_Marca',
				    type: 'POST',
				    processData: false,  // tell jQuery not to process the data
				    contentType: false,
				    timeout: 35000,
				    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
				    data: formData,
				    beforeSend : function ()
				    {
				        $('#Cargando_Header').css('display','');
				    },
				    success: function(data)
				    {
				    	if (!isNaN(data))
				    	{
				    		if (data > 0)
				    		{
				    			toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        	toastr.success('Marca eliminado con exito', 'Correcto');

					        	$('#Table_Marcas').DataTable().destroy();
					        	fetch_data_Marca();

					        	Limpar();

					        	window.Table_Marcas = null;
				    		}
				    		else if (data == 99999)
				    		{
				    			toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        	toastr.warning('La Marca se encuentra asignada a un producto', 'Advertencia');
				    		}
				    		else
				    		{
				    			toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        toastr.error('Filas afectadas 0', 'Error');
				    		}
				    	}
				    	else
				    	{
				    		toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        toastr.error('Ocurrio un error ' + data, 'Error');
				    	}
				    }
				    })
				    .done(function() {
				        console.log("success");
				    })
				     .fail(function(jqXHR, textStatus, errorThrown) {

				     if (jqXHR.status === 0)
				     {

				      console.log('Not connect: Verify Network.');
				      location.reload();  

				    } else if (jqXHR.status == 404) {

				      console.log('Requested page not found [404]');

				    } else if (jqXHR.status == 500) {

				      console.log('Internal Server Error [500].');

				    } else if (textStatus === 'parsererror') {

				      console.log('Requested JSON parse failed.');

				    } else if (textStatus === 'timeout') {

				       console.log('Time out error.');

				     } else if (textStatus === 'abort') {

				       console.log('Ajax request aborted.');

				     } else {

				       console.log('Uncaught Error: ' + jqXHR.responseText);

				     }
					})
				    .always(function() {
				        $('#Cargando_Header').css('display','none');
				    });
			   
			  }
			});
	}
	else
	{
		toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "700",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

        toastr.warning('Seleccione una Marca', 'Advertencia');
	}
}

////////////////////////////////////////////////////////////////////////////
///// Funciones División

function Editar_Division()
{
	if (window.Table_Division != null && window.Table_Division != "")
	{
		$("#Modal_Division_Editar").modal("show");
		$("#txt_Division_Editar").val(window.Table_Division.childNodes[1].innerHTML);
	}
	else
	{
		toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "700",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

        toastr.warning('Seleccione una División', 'Advertencia');
	}
}

function Eliminar_Division()
{
	if (window.Table_Division != null && window.Table_Division != "")
	{
		swal({
			  title: "¿Esta seguro que desea eliminar esta división?",
			  text: "Si la división ya esta asignada a un producto no sera posible eliminarla",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {

			  	var formData = new FormData();
				formData.append("ID", window.Table_Division.childNodes[0].innerHTML);

				 $.ajax({
				    url: dir + 'index.php/Controller_Productos/Eliminar_Division',
				    type: 'POST',
				    processData: false,  // tell jQuery not to process the data
				    contentType: false,
				    timeout: 35000,
				    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
				    data: formData,
				    beforeSend : function ()
				    {
				        $('#Cargando_Header').css('display','');
				    },
				    success: function(data)
				    {
				    	if (!isNaN(data))
				    	{
				    		if (data > 0)
				    		{
				    			toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        	toastr.success('Marca eliminado con exito', 'Correcto');

					        	$('#Table_Division').DataTable().destroy();
					        	fetch_data_Division();

					        	Limpar();

					        	window.Table_Division = null;
				    		}
				    		else if (data == 99999)
				    		{
				    			toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        	toastr.warning('La división se encuentra asignada a un producto', 'Advertencia');
				    		}
				    		else
				    		{
				    			toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        toastr.error('Filas afectadas 0', 'Error');
				    		}
				    	}
				    	else
				    	{
				    		toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        toastr.error('Ocurrio un error ' + data, 'Error');
				    	}
				    }
				    })
				    .done(function() {
				        console.log("success");
				    })
				     .fail(function(jqXHR, textStatus, errorThrown) {

				     if (jqXHR.status === 0)
				     {

				      console.log('Not connect: Verify Network.');
				      location.reload();  

				    } else if (jqXHR.status == 404) {

				      console.log('Requested page not found [404]');

				    } else if (jqXHR.status == 500) {

				      console.log('Internal Server Error [500].');

				    } else if (textStatus === 'parsererror') {

				      console.log('Requested JSON parse failed.');

				    } else if (textStatus === 'timeout') {

				       console.log('Time out error.');

				     } else if (textStatus === 'abort') {

				       console.log('Ajax request aborted.');

				     } else {

				       console.log('Uncaught Error: ' + jqXHR.responseText);

				     }
					})
				    .always(function() {
				        $('#Cargando_Header').css('display','none');
				    });
			   
			  }
			});
	}
	else
	{
		toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "700",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

        toastr.warning('Seleccione una División', 'Advertencia');
	}
}

//////////////////////////////////////////////////////////////////////////////////
/// Funciones Linea

function Agregar_Linea()
{
	var formData = new FormData();
    //formData.append("idVenta", window.Tabla_Extracciones_Historial.childNodes[0].innerHTML);

 $.ajax({
    url: dir + 'index.php/Controller_Productos/Consultar_Info',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 35000,
    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
    data: formData,
    beforeSend : function ()
    {
        $('#Cargando_Header').css('display','');
    },
    success: function(data)
    {
    	let parsed = JSON.parse(data);

        $("#select_Division_Agregar_Linea").empty();

        $("#select_Division_Agregar_Linea").append("<option value=''>Seleccionar...</option>");

	    for (var i = 0; i < parsed['Division'].length; i++) 
	    {
	        $("#select_Division_Agregar_Linea").append("<option value='" + parsed['Division'][i]['ID'] + "'>" + parsed['Division'][i]['Division'] + "</option>");
	    }

	    $("#Modal_Linea").modal("show");
    }
    })
    .done(function() {
        console.log("success");
    })
     .fail(function(jqXHR, textStatus, errorThrown) {

     if (jqXHR.status === 0)
     {

      console.log('Not connect: Verify Network.');
      location.reload();  

    } else if (jqXHR.status == 404) {

      console.log('Requested page not found [404]');

    } else if (jqXHR.status == 500) {

      console.log('Internal Server Error [500].');

    } else if (textStatus === 'parsererror') {

      console.log('Requested JSON parse failed.');

    } else if (textStatus === 'timeout') {

       console.log('Time out error.');

     } else if (textStatus === 'abort') {

       console.log('Ajax request aborted.');

     } else {

       console.log('Uncaught Error: ' + jqXHR.responseText);

     }
	})
    .always(function() {
        $('#Cargando_Header').css('display','none');
    });
}

function Editar_Linea()
{
	if (window.Table_Linea != null && window.Table_Linea != "")
	{
		var formData = new FormData();
		formData.append("ID", window.Table_Linea.childNodes[0].innerHTML);

		 $.ajax({
		    url: dir + 'index.php/Controller_Productos/Consultar_Info_Linea',
		    type: 'POST',
		    processData: false,  // tell jQuery not to process the data
		    contentType: false,
		    timeout: 35000,
		    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		    data: formData,
		    beforeSend : function ()
		    {
		        $('#Cargando_Header').css('display','');
		    },
		    success: function(data)
		    {
		    	console.log(data);

		    	let parsed = JSON.parse(data);

		        $("#select_Division_Editar_Linea").empty();

		        $("#select_Division_Editar_Linea").append("<option value=''>Seleccionar...</option>");

			    for (var i = 0; i < parsed['Division'].length; i++) 
			    {
			        $("#select_Division_Editar_Linea").append("<option value='" + parsed['Division'][i]['ID'] + "'>" + parsed['Division'][i]['Division'] + "</option>");
			    }

			    $("#select_Division_Editar_Linea").val(parsed['Linea'][0]['idDivision']);

			    $("#txt_Linea_Editar").val(parsed['Linea'][0]['Linea']);

			    $("#Modal_Linea_Editar").modal("show");
		    }
		    })
		    .done(function() {
		        console.log("success");
		    })
		     .fail(function(jqXHR, textStatus, errorThrown) {

		     if (jqXHR.status === 0)
		     {

		      console.log('Not connect: Verify Network.');
		      location.reload();  

		    } else if (jqXHR.status == 404) {

		      console.log('Requested page not found [404]');

		    } else if (jqXHR.status == 500) {

		      console.log('Internal Server Error [500].');

		    } else if (textStatus === 'parsererror') {

		      console.log('Requested JSON parse failed.');

		    } else if (textStatus === 'timeout') {

		       console.log('Time out error.');

		     } else if (textStatus === 'abort') {

		       console.log('Ajax request aborted.');

		     } else {

		       console.log('Uncaught Error: ' + jqXHR.responseText);

		     }
			})
		    .always(function() {
		        $('#Cargando_Header').css('display','none');
		    });
	}
	else
	{
		toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "700",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

        toastr.warning('Seleccione una Linea', 'Advertencia');
	}
}

function Eliminar_Linea()
{
	if (window.Table_Linea != null && window.Table_Linea != "")
	{
		swal({
			  title: "¿Esta seguro que desea eliminar esta Linea?",
			  text: "Si la linea ya esta asignada a un producto no sera posible eliminarla",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {

			  	var formData = new FormData();
				formData.append("ID", window.Table_Linea.childNodes[0].innerHTML);

				 $.ajax({
				    url: dir + 'index.php/Controller_Productos/Eliminar_Linea',
				    type: 'POST',
				    processData: false,  // tell jQuery not to process the data
				    contentType: false,
				    timeout: 35000,
				    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
				    data: formData,
				    beforeSend : function ()
				    {
				        $('#Cargando_Header').css('display','');
				    },
				    success: function(data)
				    {
				    	if (!isNaN(data))
				    	{
				    		if (data > 0)
				    		{
				    			toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        	toastr.success('Linea eliminado con exito', 'Correcto');

					        	$('#Table_Lineas').DataTable().destroy();
					        	fetch_data_Linea();

					        	Limpar();

					        	window.Table_Linea = null;
				    		}
				    		else if (data == 99999)
				    		{
				    			toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        	toastr.warning('La linea se encuentra asignada a un producto', 'Advertencia');
				    		}
				    		else
				    		{
				    			toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        toastr.error('Filas afectadas 0', 'Error');
				    		}
				    	}
				    	else
				    	{
				    		toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        toastr.error('Ocurrio un error ' + data, 'Error');
				    	}
				    }
				    })
				    .done(function() {
				        console.log("success");
				    })
				     .fail(function(jqXHR, textStatus, errorThrown) {

				     if (jqXHR.status === 0)
				     {

				      console.log('Not connect: Verify Network.');
				      location.reload();  

				    } else if (jqXHR.status == 404) {

				      console.log('Requested page not found [404]');

				    } else if (jqXHR.status == 500) {

				      console.log('Internal Server Error [500].');

				    } else if (textStatus === 'parsererror') {

				      console.log('Requested JSON parse failed.');

				    } else if (textStatus === 'timeout') {

				       console.log('Time out error.');

				     } else if (textStatus === 'abort') {

				       console.log('Ajax request aborted.');

				     } else {

				       console.log('Uncaught Error: ' + jqXHR.responseText);

				     }
					})
				    .always(function() {
				        $('#Cargando_Header').css('display','none');
				    });
			   
			  }
			});
	}
	else
	{
		toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "700",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

        toastr.warning('Seleccione una Linea', 'Advertencia');
	}
}

//////////////////////////////////////////////////////////////////////////////////
/// Funciones Sublinea

function Agregar_Sublinea()
{
	var formData = new FormData();
    //formData.append("idVenta", window.Tabla_Extracciones_Historial.childNodes[0].innerHTML);

 $.ajax({
    url: dir + 'index.php/Controller_Productos/Consultar_Info',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 35000,
    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
    data: formData,
    beforeSend : function ()
    {
        $('#Cargando_Header').css('display','');
    },
    success: function(data)
    {
    	let parsed = JSON.parse(data);

        $("#select_Linea_Agregar_Linea").empty();

        $("#select_Linea_Agregar_Linea").append("<option value=''>Seleccionar...</option>");

	    for (var i = 0; i < parsed['Linea'].length; i++) 
	    {
	        $("#select_Linea_Agregar_Linea").append("<option value='" + parsed['Linea'][i]['ID'] + "'>" + parsed['Linea'][i]['Linea'] + "</option>");
	    }

	    $("#Modal_Sublinea").modal("show");
    }
    })
    .done(function() {
        console.log("success");
    })
     .fail(function(jqXHR, textStatus, errorThrown) {

     if (jqXHR.status === 0)
     {

      console.log('Not connect: Verify Network.');
      location.reload();  

    } else if (jqXHR.status == 404) {

      console.log('Requested page not found [404]');

    } else if (jqXHR.status == 500) {

      console.log('Internal Server Error [500].');

    } else if (textStatus === 'parsererror') {

      console.log('Requested JSON parse failed.');

    } else if (textStatus === 'timeout') {

       console.log('Time out error.');

     } else if (textStatus === 'abort') {

       console.log('Ajax request aborted.');

     } else {

       console.log('Uncaught Error: ' + jqXHR.responseText);

     }
	})
    .always(function() {
        $('#Cargando_Header').css('display','none');
    });
}

function Editar_Sublinea()
{
	if (window.Table_Sublinea != null && window.Table_Sublinea != "")
	{
		var formData = new FormData();
		formData.append("ID", window.Table_Sublinea.childNodes[0].innerHTML);

		 $.ajax({
		    url: dir + 'index.php/Controller_Productos/Consultar_Info_Sublinea',
		    type: 'POST',
		    processData: false,  // tell jQuery not to process the data
		    contentType: false,
		    timeout: 35000,
		    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		    data: formData,
		    beforeSend : function ()
		    {
		        $('#Cargando_Header').css('display','');
		    },
		    success: function(data)
		    {
		    	console.log(data);

		    	let parsed = JSON.parse(data);

		        $("#select_Linea_Editar_Linea").empty();

		        $("#select_Linea_Editar_Linea").append("<option value=''>Seleccionar...</option>");

			    for (var i = 0; i < parsed['Linea'].length; i++) 
			    {
			        $("#select_Linea_Editar_Linea").append("<option value='" + parsed['Linea'][i]['ID'] + "'>" + parsed['Linea'][i]['Linea'] + "</option>");
			    }

			    $("#select_Linea_Editar_Linea").val(parsed['Sublinea'][0]['idLinea']);

			    $("#txt_Sublinea_Editar").val(parsed['Sublinea'][0]['Sublinea']);

			    $("#Modal_Sublinea_Editar").modal("show");
		    }
		    })
		    .done(function() {
		        console.log("success");
		    })
		     .fail(function(jqXHR, textStatus, errorThrown) {

		     if (jqXHR.status === 0)
		     {

		      console.log('Not connect: Verify Network.');
		      location.reload();  

		    } else if (jqXHR.status == 404) {

		      console.log('Requested page not found [404]');

		    } else if (jqXHR.status == 500) {

		      console.log('Internal Server Error [500].');

		    } else if (textStatus === 'parsererror') {

		      console.log('Requested JSON parse failed.');

		    } else if (textStatus === 'timeout') {

		       console.log('Time out error.');

		     } else if (textStatus === 'abort') {

		       console.log('Ajax request aborted.');

		     } else {

		       console.log('Uncaught Error: ' + jqXHR.responseText);

		     }
			})
		    .always(function() {
		        $('#Cargando_Header').css('display','none');
		    });
	}
	else
	{
		toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "700",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

        toastr.warning('Seleccione una Sublinea', 'Advertencia');
	}
}


function Eliminar_Sublinea()
{
	if (window.Table_Sublinea != null && window.Table_Sublinea != "")
	{
		swal({
			  title: "¿Esta seguro que desea eliminar esta sublinea?",
			  text: "Si la sublinea ya esta asignada a un producto no sera posible eliminarla",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {

			  	var formData = new FormData();
				formData.append("ID", window.Table_Sublinea.childNodes[0].innerHTML);

				 $.ajax({
				    url: dir + 'index.php/Controller_Productos/Eliminar_Sublinea',
				    type: 'POST',
				    processData: false,  // tell jQuery not to process the data
				    contentType: false,
				    timeout: 35000,
				    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
				    data: formData,
				    beforeSend : function ()
				    {
				        $('#Cargando_Header').css('display','');
				    },
				    success: function(data)
				    {
				    	if (!isNaN(data))
				    	{
				    		if (data > 0)
				    		{
				    			toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        	toastr.success('Sublinea eliminado con exito', 'Correcto');

					        	$('#Table_Sublinea').DataTable().destroy();
					        	fetch_data_Sublinea();

					        	Limpar();

					        	window.Table_Sublinea = null;
				    		}
				    		else if (data == 99999)
				    		{
				    			toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        	toastr.warning('La sublinea se encuentra asignada a un producto', 'Advertencia');
				    		}
				    		else
				    		{
				    			toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        toastr.error('Filas afectadas 0', 'Error');
				    		}
				    	}
				    	else
				    	{
				    		toastr.options = {
				                "closeButton": true,
				                "debug": false,
				                "newestOnTop": true,
				                "progressBar": true,
				                "positionClass": "toast-top-right",
				                "preventDuplicates": false,
				                "onclick": null,
				                "showDuration": "300",
				                "hideDuration": "1000",
				                "timeOut": "700",
				                "extendedTimeOut": "1000",
				                "showEasing": "swing",
				                "hideEasing": "linear",
				                "showMethod": "fadeIn",
				                "hideMethod": "fadeOut"
				                }

				        toastr.error('Ocurrio un error ' + data, 'Error');
				    	}
				    }
				    })
				    .done(function() {
				        console.log("success");
				    })
				     .fail(function(jqXHR, textStatus, errorThrown) {

				     if (jqXHR.status === 0)
				     {

				      console.log('Not connect: Verify Network.');
				      location.reload();  

				    } else if (jqXHR.status == 404) {

				      console.log('Requested page not found [404]');

				    } else if (jqXHR.status == 500) {

				      console.log('Internal Server Error [500].');

				    } else if (textStatus === 'parsererror') {

				      console.log('Requested JSON parse failed.');

				    } else if (textStatus === 'timeout') {

				       console.log('Time out error.');

				     } else if (textStatus === 'abort') {

				       console.log('Ajax request aborted.');

				     } else {

				       console.log('Uncaught Error: ' + jqXHR.responseText);

				     }
					})
				    .always(function() {
				        $('#Cargando_Header').css('display','none');
				    });
			   
			  }
			});
	}
	else
	{
		toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "700",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

        toastr.warning('Seleccione una Sublinea', 'Advertencia');
	}
}


function Limpar() {
	

		$("#txt_Codigo").val('');
		$("#select_Proveedor").val('');
		$("#txt_Producto").val('');
		$("#select_Marca").val('');
		$("#select_Division").val('');
		$("#select_Linea").val('');
		$("#select_Sublinea").val('');
		$("#txt_Descripcion").val('');
		$("#txt_Volumen").val(0);
		$("#txt_Peso").val(0);
		$("#txt_Ml").val(0);
		$("#txt_Pieza_Caja").val(0);
		$("#txt_Minimo_Produccion").val(0);
		$("#txt_Minimo_Inventario").val(0);
		$("#txt_ClaveSAT").val('');
		$("#txt_Unidad_SAT").val('');
		$("#txt_Imagen").val('');

		$('#checkStatus').removeAttr('checked');
		$('#checkDistribuidor').removeAttr('checked');
		$('#checkSalon').removeAttr('checked');
		$('#checkPublico').removeAttr('checked');



		$("#txt_Codigo_Editar").val('');
		$("#select_Proveedor_Editar").val('');
		$("#txt_Producto_Editar").val('');
		$("#select_Marca_Editar").val('');
		$("#select_Division_Editar").val('');
		$("#select_Linea_Editar").val('');
		$("#select_Sublinea_Editar").val('');
		$("#txt_Descripcion_Editar").val('');
		$("#txt_Volumen_Editar").val(0);
		$("#txt_Peso_Editar").val(0);
		$("#txt_Ml_Editar").val(0);
		$("#txt_Pieza_Caja_Editar").val(0);
		$("#txt_Minimo_Produccion_Editar").val(0);
		$("#txt_Minimo_Inventario_Editar").val(0);
		$("#txt_ClaveSAT_Editar").val('');
		$("#txt_Unidad_SAT_Editar").val('');
		$("#txt_Imagen_Editar").val('');

		$('#checkStatus_Editar').removeAttr('checked');
		$('#checkDistribuidor_Editar').removeAttr('checked');
		$('#checkSalon_Editar').removeAttr('checked');
		$('#checkPublico_Editar').removeAttr('checked');

		$("#txt_Marca").val('');
		$("#txt_Marca_Editar").val('');

		$("#txt_Division").val('');
		$("#txt_Division_Editar").val('');

		$("#select_Division_Agregar_Linea").val('');
		$("#txt_Linea").val('');

		$("#select_Division_Editar_Linea").val('');
		$("#txt_Linea_Editar").val('');

		$("#select_Linea_Agregar_Linea").val('');
		$("#txt_Sublinea").val('');

		$("#select_Linea_Editar_Linea").val('');
		$("#txt_Sublinea_Editar").val('');
}


	function fetch_data(){

	var dataTable = $('#Table_Productos').DataTable({
	"processing" : true,
	"serverSide" : true,
	"language":{
	   "lengthMenu":"Mostrar _MENU_ registros por página.",
	   "zeroRecords": "Lo sentimos. No se encontraron registros.",
	         "info": "Mostrando página _PAGE_ de _PAGES_",
	         "infoEmpty": "No hay registros aún.",
	         "infoFiltered": "(filtrados de un total de _MAX_ registros)",
	         "search" : "Búsqueda",
	         "LoadingRecords": "Cargando ...",
	         "Processing": "Procesando...",
	         "SearchPlaceholder": "Comience a teclear...",
	         "paginate": {
	 "previous": "Anterior",
	 "next": "Siguiente", 
	 }
	  },
  	"dom":"<'row'<'form-inline' <'col-sm-offset-5'l>>>"
                               +"<'row' <'form-inline' <'col-sm-1'f>>>"
                               +"<rt>"
                               +"<'row'<'form-inline'"
                               +" <'col-sm-6 col-md-6 col-lg-6'B>"
                               +"<'col-sm-6 col-md-6 col-lg-6'p>>>",
    "buttons":[
      //'copy','csv','excel','pdf'
              'excelHtml5',
              'csvHtml5',
              'pdfHtml5'
    ],
	"select": true,
	"columnDefs": [
	        {
	            "targets": 18,
	            'render': function (data, type, full, meta)
	            {
	                if (full[18] == 'Inactivo')
	                {
	                	return "<label class='label label-danger'>Inactivo</label>"
	                }
	                else
	                {
	                	return "<label class='label label-success'>Activo</label>"
	                }

	            }
	            //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
	        },
	        {
	            "targets": 13,
	            'render': function (data, type, full, meta)
	            {
	                if (full[13] == 1)
	                {
	                	return "<input type='checkbox' checked disabled>"
	                }
	                else
	                {
	                	return "<input type='checkbox' disabled>"
	                }

	            }
	            //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
	        },
	             {
	            "targets": 14,
	            'render': function (data, type, full, meta)
	            {
	                if (full[14] == 1)
	                {
	                	return "<input type='checkbox' checked disabled>"
	                }
	                else
	                {
	                	return "<input type='checkbox' disabled>"
	                }

	            }
	            //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
	        },
	             {
	            "targets": 15,
	            'render': function (data, type, full, meta)
	            {
	                if (full[15] == 1)
	                {
	                	return "<input type='checkbox' checked disabled>"
	                }
	                else
	                {
	                	return "<input type='checkbox' disabled>"
	                }

	            }
	            //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
	        },

	    ],
	    
	"order" : [],
	"ajax" : {

	    url: dir + "Clases/fetch_Productos.php",
	    type: "POST",
	}
	});
	}

	function fetch_data_Marca() {
		var dataTable = $('#Table_Marcas').DataTable({
			"processing" : true,
			"serverSide" : true,
			"language":{
			   "lengthMenu":"Mostrar _MENU_ registros por página.",
			   "zeroRecords": "Lo sentimos. No se encontraron registros.",
			         "info": "Mostrando página _PAGE_ de _PAGES_",
			         "infoEmpty": "No hay registros aún.",
			         "infoFiltered": "(filtrados de un total de _MAX_ registros)",
			         "search" : "Búsqueda",
			         "LoadingRecords": "Cargando ...",
			         "Processing": "Procesando...",
			         "SearchPlaceholder": "Comience a teclear...",
			         "paginate": {
			 "previous": "Anterior",
			 "next": "Siguiente", 
			 }
			  },
			"select": true,	    
			"order" : [],
			"ajax" : {

			    url: dir + "Clases/fetch_Marca.php",
			    type: "POST",
			}
			});
	}

	function fetch_data_Division() {
		var dataTable = $('#Table_Division').DataTable({
			"processing" : true,
			"serverSide" : true,
			"language":{
			   "lengthMenu":"Mostrar _MENU_ registros por página.",
			   "zeroRecords": "Lo sentimos. No se encontraron registros.",
			         "info": "Mostrando página _PAGE_ de _PAGES_",
			         "infoEmpty": "No hay registros aún.",
			         "infoFiltered": "(filtrados de un total de _MAX_ registros)",
			         "search" : "Búsqueda",
			         "LoadingRecords": "Cargando ...",
			         "Processing": "Procesando...",
			         "SearchPlaceholder": "Comience a teclear...",
			         "paginate": {
			 "previous": "Anterior",
			 "next": "Siguiente", 
			 }
			  },
			"select": true,	    
			"order" : [],
			"ajax" : {

			    url: dir + "Clases/fetch_Division.php",
			    type: "POST",
			}
			});
	}

	function fetch_data_Linea()
	{
		var dataTable = $('#Table_Lineas').DataTable({
			"processing" : true,
			"serverSide" : true,
			"language":{
			   "lengthMenu":"Mostrar _MENU_ registros por página.",
			   "zeroRecords": "Lo sentimos. No se encontraron registros.",
			         "info": "Mostrando página _PAGE_ de _PAGES_",
			         "infoEmpty": "No hay registros aún.",
			         "infoFiltered": "(filtrados de un total de _MAX_ registros)",
			         "search" : "Búsqueda",
			         "LoadingRecords": "Cargando ...",
			         "Processing": "Procesando...",
			         "SearchPlaceholder": "Comience a teclear...",
			         "paginate": {
			 "previous": "Anterior",
			 "next": "Siguiente", 
			 }
			  },
			"select": true,	    
			"order" : [],
			"ajax" : {

			    url: dir + "Clases/fetch_Linea.php",
			    type: "POST",
			}
			});
	}

	function fetch_data_Sublinea()
	{
		var dataTable = $('#Table_Sublinea').DataTable({
			"processing" : true,
			"serverSide" : true,
			"language":{
			   "lengthMenu":"Mostrar _MENU_ registros por página.",
			   "zeroRecords": "Lo sentimos. No se encontraron registros.",
			         "info": "Mostrando página _PAGE_ de _PAGES_",
			         "infoEmpty": "No hay registros aún.",
			         "infoFiltered": "(filtrados de un total de _MAX_ registros)",
			         "search" : "Búsqueda",
			         "LoadingRecords": "Cargando ...",
			         "Processing": "Procesando...",
			         "SearchPlaceholder": "Comience a teclear...",
			         "paginate": {
			 "previous": "Anterior",
			 "next": "Siguiente", 
			 }
			  },
			"select": true,	    
			"order" : [],
			"ajax" : {

			    url: dir + "Clases/fetch_Sublinea.php",
			    type: "POST",
			}
			});
	}

	function forceFileDownload(response,name){
		//const url = window.URL.createObjectURL(new Blob([response.data]))
		const url = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/CSV/' + name + '.csv';
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', name + '.csv') //or any other extension
		document.body.appendChild(link)
		link.click()
	}

	function valida(e){
    tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla==8){
        return true;
    }
        
    // Patron de entrada, en este caso solo acepta numeros
    patron =/[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}