var FETCHPAGOSREALIZADOS = null;
var FETCHPAGOSPENDIENTES = null;
var FETCHPAGOSREALIZADOS = null;

var Singleton = 0;

$(document).ready(function(){ 

	// Cargar Alerts Toast //
  	Toast();

  	// Cargar DatePicker //
  	$('.input-daterange').datepicker({
	  format: "yyyy-mm-dd",
	  autoclose: true
	});

	////////////////////////
	/// Pagos Realizados //
	///////////////////////


	// Select Bodega //
	$("#select_Bodega").change(function(event) {
		
		let Bodega 		 = $("#select_Bodega").val();
		let DateStart 	 = $("#dateStart").val();
		let DateEnd 	 = $("#dateEnd").val();
		let Distribuidor = $("#selectDistribuidor").val();

		// Limpiamos DataTable fetchPagosRealizados //
		$('#fetchPagosRealizados').DataTable().destroy();
		document.getElementById("fetchPagosRealizados").tBodies[0].innerHTML = "";

		if (Bodega != ""){
			if (DateStart != "" && DateEnd != ""){
				fetchPagosRealizados('yes',DateStart,DateEnd,Distribuidor,Bodega);
			}
			else{
				fetchPagosRealizados('no','','',Distribuidor,Bodega);
			}
		}
		else{
			toastr.warning('Seleccione una sucursal', 'Advertencia');
		}
	});

	// select Cliente (Distribuidor) //
	$("#selectDistribuidor").change(function(event) {
		
		let Bodega 		 = $("#select_Bodega").val();
		let DateStart 	 = $("#dateStart").val();
		let DateEnd 	 = $("#dateEnd").val();
		let Distribuidor = $("#selectDistribuidor").val();

		// Limpiamos DataTable fetchPagosRealizados //
		$('#fetchPagosRealizados').DataTable().destroy();
		document.getElementById("fetchPagosRealizados").tBodies[0].innerHTML = "";

		if (Bodega != ""){
			if (DateStart != "" && DateEnd != ""){
				fetchPagosRealizados('yes',DateStart,DateEnd,Distribuidor,Bodega);
			}
			else{
				fetchPagosRealizados('no','','',Distribuidor,Bodega);
			}
		}
		else{
			toastr.warning('Seleccione una sucursal', 'Advertencia');
		}

	});

	// Click Buscar por Fechas //
	$("#search_Realizado").click(function(event) {
		
		let Bodega 		 = $("#select_Bodega").val();
		let DateStart 	 = $("#dateStart").val();
		let DateEnd 	 = $("#dateEnd").val();
		let Distribuidor = $("#selectDistribuidor").val();

		// Limpiamos DataTable fetchPagosRealizados //
		$('#fetchPagosRealizados').DataTable().destroy();
		document.getElementById("fetchPagosRealizados").tBodies[0].innerHTML = "";

		if (Bodega != ""){
			if (DateStart != "" && DateEnd != ""){
				fetchPagosRealizados('yes',DateStart,DateEnd,Distribuidor,Bodega);
			}
			else{
				fetchPagosRealizados('no','','',Distribuidor,Bodega);
			}
		}
		else{
			toastr.warning('Seleccione una sucursal', 'Advertencia');
		}

	});

	// Leer click DataTable Pagos Realizados //
	document.getElementById("fetchPagosRealizados").onclick = function(e)
	{
		FETCHPAGOSREALIZADOS = e.target.parentNode;
	}

	// Recharzar Pago //
	$("#btnRechazarPago").click(function(event) {

		if (FETCHPAGOSREALIZADOS != null){
			if (FETCHPAGOSREALIZADOS.childNodes[3].childNodes[0].innerHTML == "Confirmado"){
				swal({
					title: "¿Esta seguro que desea rechazar el pago del cliente?",
					text: "Si el pago tiene relacionado una referencia bancaria se descuadrara los pagos del cliente del sistema con el del banco \n ¿Desea Continuar?",
					icon: "warning",
					buttons: true,
					dangerMode: true,
				})
				.then((willDelete) => {
				  	if (willDelete) {

					  	let formData = new FormData();
			            formData.append("ID", FETCHPAGOSREALIZADOS.childNodes[0].innerHTML);
			            formData.append("Monto", FETCHPAGOSREALIZADOS.childNodes[2].innerHTML);
			            formData.append("ID_Pago", FETCHPAGOSREALIZADOS.childNodes[4].innerHTML);

			            $.ajax({
			                url: window.dir + 'index.php/Controller_Cuentas_x_Pagar/rechazarPago',
			                type: 'POST',
			                processData: false,  // tell jQuery not to process the data
			                contentType: false,
			                timeout: 800000,
			                data: formData,
			                beforeSend : function ()
			                {
			                    $('#loadingHeader').css('display','');
			                    $('#btnRechazarPago').css('display','none');
			                    $('#loadingRechazarPago').css('display','');
			                },
			                success: function(data)
			                {
			                    console.log(data);
			                	switch(parseInt(data.trim())){

						            case 0:
						              toastr.error('Ocurrio un erro al rechazar el pago', 'Error');
						            break;

						            case 1:
						              	//Limpiar(1);
						              	toastr.success('Pago rechazado con exito', 'Correcto');
						              	$('#fetchPagosRealizados').DataTable().ajax.reload();
						            break;

						            default:
						              toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
						        }
			                }
			            })
			            .done(function() {
			                $('#loadingHeader').css('display','none');
			                $('#btnRechazarPago').css('display','');
			                $('#loadingRechazarPago').css('display','none');
			            })
			            .fail(function(jqXHR, textStatus, errorThrown) {
			            	$('#loadingHeader').css('display','none');
			            	$('#btnRechazarPago').css('display','');
			            	$('#loadingRechazarPago').css('display','none');
			            	$("#modalErrorConexion").modal("show");
			        	})
			            .always(function() {
			            });
				    }
				});
			}
			else{
		        toastr.warning('El pago ya se encuentra como cancelado o rechazado', 'Advertencia');
			}
		}
		else{
		    toastr.warning('Seleccione un pago cliente', 'Advertencia');
		}
	});

	///////////////////////////////////////////////////////////////////////////
	//////////////////////////////  Pagos Pendientes //////////////////////////
	///////////////////////////////////////////////////////////////////////////

	$("#select_Bodega_Pendientes").change(function(event) {
		
		let Bodega 		 = $("#select_Bodega_Pendientes").val();
		let DateStart 	 = $("#dateStartPendiente").val();
		let DateEnd 	 = $("#dateEndPendiente").val();
		let Distribuidor = $("#selectDistribuidorPendiente").val();

		// Limpiamos DataTable fetchPagosPendientes //
		$('#fetchPagosPendientes').DataTable().destroy();
		document.getElementById("fetchPagosPendientes").tBodies[0].innerHTML = "";

		if (Bodega != ""){
			if (DateStart != "" && DateEnd != ""){
				fetchPagosPendientes('yes',DateStart,DateEnd,Distribuidor,Bodega);
			}
			else{
				fetchPagosPendientes('no','','',Distribuidor,Bodega);
			}
		}
		else{
			toastr.warning('Seleccione una sucursal', 'Advertencia');
		}
	});

	// select Cliente (Distribuidor) Pagos Pendientes//
	$("#selectDistribuidorPendiente").change(function(event) {
		
		let Bodega 		 = $("#select_Bodega_Pendientes").val();
		let DateStart 	 = $("#dateStartPendiente").val();
		let DateEnd 	 = $("#dateEndPendiente").val();
		let Distribuidor = $("#selectDistribuidorPendiente").val();

		// Limpiamos DataTable fetchPagosPendientes //
		$('#fetchPagosPendientes').DataTable().destroy();
		document.getElementById("fetchPagosPendientes").tBodies[0].innerHTML = "";

		if (Bodega != ""){
			if (DateStart != "" && DateEnd != ""){
				fetchPagosPendientes('yes',DateStart,DateEnd,Distribuidor,Bodega);
			}
			else{
				fetchPagosPendientes('no','','',Distribuidor,Bodega);
			}
		}
		else{
			toastr.warning('Seleccione una sucursal', 'Advertencia');
		}

	});

	// Click Buscar por Fechas Pagos Pendientes//
	$("#searchPendientes").click(function(event) {
		
		let Bodega 		 = $("#select_Bodega_Pendientes").val();
		let DateStart 	 = $("#dateStartPendiente").val();
		let DateEnd 	 = $("#dateEndPendiente").val();
		let Distribuidor = $("#selectDistribuidorPendiente").val();

		// Limpiamos DataTable fetchPagosPendientes //
		$('#fetchPagosPendientes').DataTable().destroy();
		document.getElementById("fetchPagosPendientes").tBodies[0].innerHTML = "";

		if (Bodega != ""){
			if (DateStart != "" && DateEnd != ""){
				fetchPagosPendientes('yes',DateStart,DateEnd,Distribuidor,Bodega);
			}
			else{
				fetchPagosPendientes('no','','',Distribuidor,Bodega);
			}
		}
		else{
			toastr.warning('Seleccione una sucursal', 'Advertencia');
		}

	});

	// Leer click DataTable fetchPagosRealizados //
	document.getElementById("tbodyPagosRealizados").onclick = function(e)
	{

		FETCHPAGOSREALIZADOS = e.target.parentNode;

	    let formData = new FormData();
        formData.append("idPagosCliente", FETCHPAGOSREALIZADOS.childNodes[4].innerHTML);

        $.ajax({
            url: window.dir + 'index.php/Controller_Cuentas_x_Pagar/getImagen',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnRechazarPago').css('display','none');
                $('#loadingRechazarPago').css('display','');
            },
            success: function(data)
            {
				console.log(data);

				if (data) {
					let parsed = JSON.parse(data);

					if (parsed[0]['URL_Imagen'] != null && parsed[0]['URL_Imagen'] != ""){
						$("#Div_Imagen_R").empty();
						let image = document.createElement("img");
						image.setAttribute("src",parsed[0]['URL_Imagen']);
						image.setAttribute("style",'max-width:50%');

						$("#Div_Imagen_R").append(image);
						$("#label_Banco_R").text(parsed[0]['Observaciones']);
						$("#label_Cantidad_R").text(parsed[0]['Monto']);
					}
					else{
						$("#Div_Imagen_R").empty();
						let image = document.createElement("img");
						image.setAttribute("src",window.dir + 'assets/img/noimage.png');
						image.setAttribute("style",'max-width:50%');

						$("#Div_Imagen_R").append(image);
						$("#label_Banco_R").text(parsed[0]['Observaciones']);
						$("#label_Cantidad_R").text(parsed[0]['Monto']);
						toastr.info('El pago no cuenta imagen', 'Información');
					}
				}
            }
        })
        .done(function() {
        	$('#loadingHeader').css('display','none');
            $('#btnRechazarPago').css('display','');
            $('#loadingRechazarPago').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnRechazarPago').css('display','');
            $('#loadingRechazarPago').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
            $('#Cargando_Header').css('display','none');
        });
	}

	// Leer click DataTable fetchPagosRealizados //
  	document.getElementById("fetchPagosPendientes").onclick = function(e)
	{
		FETCHPAGOSPENDIENTES = e.target.parentNode;

	    let formData = new FormData();
        formData.append("idPagosCliente", FETCHPAGOSPENDIENTES.childNodes[4].innerHTML);

        $.ajax({
            url: window.dir + 'index.php/Controller_Cuentas_x_Pagar/getImagen',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnConfirmarPago').css('display','none');
                $('#loadingConfirmarPago').css('display','');
                $('#btnConfirmarTodosPago').css('display','none');
                $('#loadingConfirmarTodosPago').css('display','');
                $('#btnExportar').css('display','none');
                $('#loadingExportar').css('display','');
                $('#btnRechazarPagoPendiente').css('display','none');
                $('#loadingRechazarPagoPendiente').css('display','');
            },
            success: function(data)
            {
                console.log(data);
                let parsed = JSON.parse(data);

                if (parsed[0]['URL_Imagen'] != null && parsed[0]['URL_Imagen'] != ""){
                	$("#Div_Imagen").empty();
                	let image = document.createElement("img");
                    image.setAttribute("src",parsed[0]['URL_Imagen']);
                    image.setAttribute("style",'max-width:50%');

                    $("#Div_Imagen").append(image);
                    $("#label_Banco").text(parsed[0]['Observaciones']);
                	$("#label_Cantidad").text(parsed[0]['Monto']);
                }
                else{
                	$("#Div_Imagen").empty();
                	let image = document.createElement("img");
                    image.setAttribute("src",window.dir + 'assets/img/noimage.png');
                    image.setAttribute("style",'max-width:50%');

                    $("#Div_Imagen").append(image);
                    $("#label_Banco").text(parsed[0]['Observaciones']);
                	$("#label_Cantidad").text(parsed[0]['Monto']);
                    toastr.info('El pago no cuenta imagen', 'Información');
                }
            }
        })
        .done(function() {
        	$('#loadingHeader').css('display','none');
            $('#btnConfirmarPago').css('display','');
            $('#loadingConfirmarPago').css('display','none');
            $('#btnConfirmarTodosPago').css('display','');
            $('#loadingConfirmarTodosPago').css('display','none');
            $('#btnExportar').css('display','');
            $('#loadingExportar').css('display','none');
            $('#btnRechazarPagoPendiente').css('display','');
            $('#loadingRechazarPagoPendiente').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnConfirmarPago').css('display','');
            $('#loadingConfirmarPago').css('display','none');
            $('#btnConfirmarTodosPago').css('display','');
            $('#loadingConfirmarTodosPago').css('display','none');
            $('#btnExportar').css('display','');
            $('#loadingExportar').css('display','none');
            $('#btnRechazarPagoPendiente').css('display','');
            $('#loadingRechazarPagoPendiente').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
            $('#Cargando_Header').css('display','none');
        });			       
	}


	// Boton Confirmar Pago //
	$("#btnConfirmarPago").click(function(event) {
		
		let Bodega = $("#select_Bodega_Pendientes").val();

		if (Bodega != ""){

			swal({
			  title: "¿Esta seguro que desea Confirmar el pago?",
			  text: "Una vez hecho esto, no sera posible restablecer el pago",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
				if (willDelete) {
			   		if (FETCHPAGOSPENDIENTES != null){

			   			let formData = new FormData();
			            formData.append("ID", FETCHPAGOSPENDIENTES.childNodes[4].innerHTML);
			            formData.append("idVenta", FETCHPAGOSPENDIENTES.childNodes[0].innerHTML);

			            $.ajax({
			                url: window.dir + 'index.php/Controller_Cuentas_x_Pagar/confirmarPago',
			                type: 'POST',
			                processData: false,
			                contentType: false,
			                timeout: 800000,
			                data: formData,
			                beforeSend : function ()
			                {
			                    $('#loadingHeader').css('display','');
				                $('#btnConfirmarPago').css('display','none');
				                $('#loadingConfirmarPago').css('display','');
				                $('#btnConfirmarTodosPago').css('display','none');
				                $('#loadingConfirmarTodosPago').css('display','');
				                $('#btnExportar').css('display','none');
				                $('#loadingExportar').css('display','');
				                $('#btnRechazarPagoPendiente').css('display','none');
				                $('#loadingRechazarPagoPendiente').css('display','');
			                },
			                success: function(data)
			                {
			                    console.log(data);

			                    switch(parseInt(data.trim())){

						            case 0:
						              toastr.error('Ocurrio un error al modificar la venta asociada al pago.', 'Error');
						            break;

						            case 1:
						              Limpiar(1);
						              toastr.success('Pago confirmado con exito.', 'Correcto');
						            break;

						            case 2:
						              toastr.error('Ocurrio al confirmar el pago del cliente.', 'Error');
						            break;

						            default:
						              toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
						        }
			                }
			            })
			            .done(function() {
			                $('#loadingHeader').css('display','none');
				            $('#btnConfirmarPago').css('display','');
				            $('#loadingConfirmarPago').css('display','none');
				            $('#btnConfirmarTodosPago').css('display','');
				            $('#loadingConfirmarTodosPago').css('display','none');
				            $('#btnExportar').css('display','');
				            $('#loadingExportar').css('display','none');
				            $('#btnRechazarPagoPendiente').css('display','');
				            $('#loadingRechazarPagoPendiente').css('display','none');
			            })
				        .fail(function(jqXHR, textStatus, errorThrown) {
				        	$('#loadingHeader').css('display','none');
				            $('#btnConfirmarPago').css('display','');
				            $('#loadingConfirmarPago').css('display','none');
				            $('#btnConfirmarTodosPago').css('display','');
				            $('#loadingConfirmarTodosPago').css('display','none');
				            $('#btnExportar').css('display','');
				            $('#loadingExportar').css('display','none');
				            $('#btnRechazarPagoPendiente').css('display','');
				            $('#loadingRechazarPagoPendiente').css('display','none');
				            $("#modalErrorConexion").modal("show");
			        	})
			            .always(function() {
			            });
			   		}
			   		else{
			   			toastr.warning('Seleccione el pago del cliente que desea confirmar', 'Advertencia');
			   		}
				}
			});
		}
		else{
			toastr.warning('Seleccione una sucursal', 'Advertencia');
		}
	});
	
	//Boton Confirmar todos los pagos //
	$("#btnConfirmarTodosPago").click(function(event) {
	
		let Bodega = $("#select_Bodega_Pendientes").val();

		if (Bodega != ""){

			swal({
			  title: "¿Esta seguro que desea confirmar todos pagos?",
			  text: "Una vez confirmados los pagos los status pasaran como confirmado",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  	if (willDelete) {
			    
				    let Fecha_Desde  = $("#dateStartPendiente").val();
					let Fecha_Hasta  = $("#dateEndPendiente").val();
					let Distribuidor = $("#selectDistribuidorPendiente").val();

					let formData = new FormData();
			        formData.append("Fecha_Desde", Fecha_Desde);
			        formData.append("Fecha_Hasta", Fecha_Hasta);
			        formData.append("Distribuidor", Distribuidor);
			        formData.append("idBodega", Bodega);

			        $.ajax({
			            url: window.dir + 'index.php/Controller_Cuentas_x_Pagar/confirmarTodosPago',
			            type: 'POST',
			            processData: false,
			            contentType: false,
			            timeout: 800000,
			            data: formData,
			            beforeSend : function ()
			            {
			                $('#loadingHeader').css('display','');
			                $('#btnConfirmarPago').css('display','none');
			                $('#loadingConfirmarPago').css('display','');
			                $('#btnConfirmarTodosPago').css('display','none');
			                $('#loadingConfirmarTodosPago').css('display','');
			                $('#btnExportar').css('display','none');
			                $('#loadingExportar').css('display','');
			                $('#btnRechazarPagoPendiente').css('display','none');
			                $('#loadingRechazarPagoPendiente').css('display','');
			            },
			            success: function(data)
			            {
			                console.log(data);

		                    switch(parseInt(data.trim())){

					            case 0:
					              toastr.error('Ocurrio un error al confirmar todos los pagos', 'Error');
					            break;

					            case 1:
					              Limpiar(1);
					              toastr.success('Pagos confirmados con exito', 'Correcto');
					            break;

					            default:
					              toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
					        }							
			            }
		            })
		            .done(function() {
		                $('#loadingHeader').css('display','none');
			            $('#btnConfirmarPago').css('display','');
			            $('#loadingConfirmarPago').css('display','none');
			            $('#btnConfirmarTodosPago').css('display','');
			            $('#loadingConfirmarTodosPago').css('display','none');
			            $('#btnExportar').css('display','');
			            $('#loadingExportar').css('display','none');
			            $('#btnRechazarPagoPendiente').css('display','');
			            $('#loadingRechazarPagoPendiente').css('display','none');
		            })
		            .fail(function(jqXHR, textStatus, errorThrown) {
		            	$('#loadingHeader').css('display','none');
			            $('#btnConfirmarPago').css('display','');
			            $('#loadingConfirmarPago').css('display','none');
			            $('#btnConfirmarTodosPago').css('display','');
			            $('#loadingConfirmarTodosPago').css('display','none');
			            $('#btnExportar').css('display','');
			            $('#loadingExportar').css('display','none');
			            $('#btnRechazarPagoPendiente').css('display','');
			            $('#loadingRechazarPagoPendiente').css('display','none');
			            $("#modalErrorConexion").modal("show");
		        	})
		            .always(function() {
		            });
			    }
			});		
		}
		else{
		    toastr.warning('Por favor seleccione una sucursal', 'Advertencia');
		}

	});

	// Boton Rechazar Pago //
	$("#btnRechazarPagoPendiente").click(function(event) {
		
		let Bodega = $("#").val();

		if (Bodega != ""){

			swal({
				title: "¿Esta seguro que desea Rechazar el pago?",
				text: "Una vez hecho esto, no sera posible restablecer el pago",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			})
			.then((willDelete) => {
			  	if (willDelete) {
			   
				   if (FETCHPAGOSPENDIENTES != null){

				   		let formData = new FormData();
			            formData.append("ID", FETCHPAGOSPENDIENTES.childNodes[4].innerHTML);
			            formData.append("idVenta", FETCHPAGOSPENDIENTES.childNodes[0].innerHTML);

			            $.ajax({
			                url: window.dir + 'index.php/Controller_Cuentas_x_Pagar/rechazarPagoPendiente',
			                type: 'POST',
			                processData: false,
			                contentType: false,
			                timeout: 800000,
			                data: formData,
			                beforeSend : function ()
			                {
			                    $('#loadingHeader').css('display','');
				                $('#btnConfirmarPago').css('display','none');
				                $('#loadingConfirmarPago').css('display','');
				                $('#btnConfirmarTodosPago').css('display','none');
				                $('#loadingConfirmarTodosPago').css('display','');
				                $('#btnExportar').css('display','none');
				                $('#loadingExportar').css('display','');
				                $('#btnRechazarPagoPendiente').css('display','none');
				                $('#loadingRechazarPagoPendiente').css('display','');
			                },
			                success: function(data)
			                {
			                    console.log(data);

			                    switch(parseInt(data.trim())){

						            case 0:
						              toastr.error('Ocurrio un error al rechazar el pago.', 'Error');
						            break;

						            case 1:
						              Limpiar(1);
						              toastr.success('Pago rechazado con exito.', 'Correcto');
						            break;

						            default:
						              toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
						        }			
			                }
			            })
			            .done(function() {
			                $('#loadingHeader').css('display','none');
				            $('#btnConfirmarPago').css('display','');
				            $('#loadingConfirmarPago').css('display','none');
				            $('#btnConfirmarTodosPago').css('display','');
				            $('#loadingConfirmarTodosPago').css('display','none');
				            $('#btnExportar').css('display','');
				            $('#loadingExportar').css('display','none');
				            $('#btnRechazarPagoPendiente').css('display','');
				            $('#loadingRechazarPagoPendiente').css('display','none');
			            })
			            .fail(function(jqXHR, textStatus, errorThrown) {
			            	$('#loadingHeader').css('display','none');
				            $('#btnConfirmarPago').css('display','');
				            $('#loadingConfirmarPago').css('display','none');
				            $('#btnConfirmarTodosPago').css('display','');
				            $('#loadingConfirmarTodosPago').css('display','none');
				            $('#btnExportar').css('display','');
				            $('#loadingExportar').css('display','none');
				            $('#btnRechazarPagoPendiente').css('display','');
				            $('#loadingRechazarPagoPendiente').css('display','none');
				            $("#modalErrorConexion").modal("show");
			        	})
			            .always(function() {
			            });
				    }
				    else{
				        toastr.warning('Seleccione un pago cliente', 'Advertencia');
				    }
			  	}
			});
		}
		else{
			toastr.warning('Seleccione una sucursal', 'Advertencia');
		}
	});


	///////////////////////////////////////////////////////////////////////////
	////////////////////////////// Reportes Pagos  ////////////////////////////
	///////////////////////////////////////////////////////////////////////////

	$("#select_Reporte_Pago").change(function(event) {
		
		let Bodega 		 = $("#select_Reporte_Pago").val();
		let DateStart 	 = $("#dateReportePago").val();

		// Limpiamos DataTable fetchReportePagos //
		$('#fetchReportePagos').DataTable().destroy();
		document.getElementById("fetchReportePagos").tBodies[0].innerHTML = "";

		if (Bodega != ""){
			fetchReportePagos(DateStart,Bodega);
		}
		else{
			toastr.warning('Seleccione una sucursal', 'Advertencia');
		}
	});

	/////////////////// Acción Change Fecha Busqueda /////////////////////////////
	$("#dateReportePago").change(function(event) {
		
		let Bodega 		 = $("#select_Reporte_Pago").val();
		let DateStart 	 = $("#dateReportePago").val();

		// Limpiamos DataTable fetchReportePagos //
		$('#fetchReportePagos').DataTable().destroy();
		document.getElementById("fetchReportePagos").tBodies[0].innerHTML = "";

		if (Bodega != ""){
			fetchReportePagos(DateStart,Bodega);
		}
		else{
			toastr.warning('Seleccione una sucursal', 'Advertencia');
		}
		
	});

});

function Limpiar(valor) {
	
	switch(valor){
        case 1:
	        $('#fetchPagosPendientes').DataTable().ajax.reload();
			$("#Div_Imagen").empty();
	        $("#label_Banco").text("");
	    	$("#label_Cantidad").text("");
	    	$("#selectDistribuidorPendiente").val("");
	    	$('#dateStartPendiente').val("");
	  		$('#dateEndPendiente').val("");
	  		FETCHPAGOSPENDIENTES = null;
        break;
    }
}

function fetchPagosRealizados(is_date_search, start_date='', end_date='', Cliente='',idBodega=''){

	let dataTable = $('#fetchPagosRealizados').DataTable({
	    "processing" : true,
	    "serverSide" : true,
	    "language":{
	        "lengthMenu":"Mostrar _MENU_ registros por página.",
	        "zeroRecords": "Lo sentimos. No se encontraron registros.",
	        "info": "Mostrando página _PAGE_ de _PAGES_",
	        "infoEmpty": "No hay registros aún.",
	        "infoFiltered": "(filtrados de un total de _MAX_ registros)",
	        "search" : "Búsqueda",
	        "loadingRecords": "Cargando ...",
	        "processing": "Procesando...",
	        "searchPlaceholder": "Comience a teclear...",
	        "paginate": {
				"previous": "Anterior",
				"next": "Siguiente", 
	 		}
	    },
	    "select": true,
	    "columnDefs": [
	        {
	            "targets": 3,
	            'render': function (data, type, full, meta)
	            {
	                if (full[3] == 'Confirmado'){
	                	return "<label class='badge badge-success'>Confirmado</label>"
	                }
	                else if (full[3] == 'Cancelado'){
	                	return "<label class='badge badge-danger'>Cancelado</label>"
	                }
	                else if (full[3] == 'Rechazado'){
	                	return "<label class='badge badge-warning'>Rechazado</label>"
	                }
	            },
	        }
	    ], 
	    "order" : [],
	    "ajax" : {
	        url: window.dir + "index.php/Controller_Cuentas_x_Pagar/fetchPagosRealizados",
	        type: "POST",
	        data:{
	          is_date_search:is_date_search, start_date:start_date, end_date:end_date, Cliente:Cliente, idBodega:idBodega
	        }
	    }
  	});
}

function fetchPagosPendientes(is_date_search, start_date='', end_date='', Cliente='',idBodega=''){

  	let dataTable = $('#fetchPagosPendientes').DataTable({
	    "processing" : true,
	    "serverSide" : true,
	    "language":{
	       "lengthMenu":"Mostrar _MENU_ registros por página.",
	       "zeroRecords": "Lo sentimos. No se encontraron registros.",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros aún.",
            "infoFiltered": "(filtrados de un total de _MAX_ registros)",
            "search" : "Búsqueda",
            "loadingRecords": "Cargando ...",
            "processing": "Procesando...",
            "searchPlaceholder": "Comience a teclear...",
            "paginate": {
    			"previous": "Anterior",
    			"next": "Siguiente", 
    		}
        },
	    "select": true,
	    "columnDefs": [
            {
                "targets": 3,
                'render': function (data, type, full, meta)
                {
                    if (full[3] == 'Pendiente'){
                    	return "<label class='badge badge-warning'>Pendiente</label>"
                    }
                },
            }
        ],
	    "order" : [],
	    "ajax" : {
	        url: window.dir + "index.php/Controller_Cuentas_x_Pagar/fetchPagosPendientes",
	        type: "POST",
	        data:{
	          is_date_search:is_date_search, start_date:start_date, end_date:end_date, Cliente:Cliente, idBodega:idBodega
	        }
    	}
    });
}

function fetchReportePagos(start_date='',idBodega=''){

  	let dataTable = $('#fetchReportePagos').DataTable({
	    "processing" : true,
	    "serverSide" : true,
	    "language":{
	       "lengthMenu":"Mostrar _MENU_ registros por página.",
	       "zeroRecords": "Lo sentimos. No se encontraron registros.",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros aún.",
            "infoFiltered": "(filtrados de un total de _MAX_ registros)",
            "search" : "Búsqueda",
            "loadingRecords": "Cargando ...",
            "processing": "Procesando...",
            "searchPlaceholder": "Comience a teclear...",
            "paginate": {
    			"previous": "Anterior",
    			"next": "Siguiente", 
    		}
        },
	    "select": true,
	    "order" : [],
	    "ajax" : {
	        url: window.dir + "index.php/Controller_Cuentas_x_Pagar/fetchReportePagos",
	        type: "POST",
	        data:{
	          start_date:start_date, idBodega:idBodega
	        }
    	}
    });
}

function fetchCuentasXPagar(is_date_search, start_date='', end_date='', idBodega=''){

	let dataTable = $('#fetchCuentasXPagar').DataTable({
	  "processing" : true,
	  "serverSide" : true,
	  "language":{
		 "lengthMenu":"Mostrar _MENU_ registros por página.",
		 "zeroRecords": "Lo sentimos. No se encontraron registros.",
		  "info": "Mostrando página _PAGE_ de _PAGES_",
		  "infoEmpty": "No hay registros aún.",
		  "infoFiltered": "(filtrados de un total de _MAX_ registros)",
		  "search" : "Búsqueda",
		  "loadingRecords": "Cargando ...",
		  "processing": "Procesando...",
		  "searchPlaceholder": "Comience a teclear...",
		  "paginate": {
			  "previous": "Anterior",
			  "next": "Siguiente", 
		  }
	  },
	  "select": true,
	  "columnDefs": [
		  {
			  "targets": 6,
			  'render': function (data, type, full, meta)
			  {
				return "<button class='btn btn-primary' onclick='ProcesarVenta("+ full[0] +")' >Procesar Pago</button>"
			  },
		  }
	  ],
	  "order" : [],
	  "ajax" : {
		  url: window.dir + "index.php/Controller_Cuentas_x_Pagar/fetchCuentasXPagar",
		  type: "POST",
		  data:{
			is_date_search:is_date_search, start_date:start_date, end_date:end_date, idBodega:idBodega
		  }
	  }
  });
}

/////////////////////////
/// Cuentas X Pagar   //
////////////////////////

const btnSearch = ( e ) => {
	const branch = document.querySelector("#selectBranch").value;
	const dateStart = document.querySelector("#dateReferenciaStart").value;
	const dateEnd = document.querySelector("#dateReferenciaEnd").value;

	if (branch != "") {
		if (dateStart != "" && dateEnd != "") {
			$('#fetchCuentasXPagar').DataTable().destroy();
			document.getElementById("fetchCuentasXPagar").tBodies[0].innerHTML = "";
			fetchCuentasXPagar('yes', dateStart, dateEnd, branch);			
		}else{
			toastr.warning('Para este proceso, es necesario asignar un rango de fechas.', 'Advertencia');
		}
	}else{
		toastr.warning('Seleccione una sucursal.', 'Advertencia');
	}
}

const ProcesarVenta = ( idVenta ) => {

	const branch = document.querySelector("#selectBranch").value;
	const dateStart = document.querySelector("#dateReferenciaStart").value;
	const dateEnd = document.querySelector("#dateReferenciaEnd").value;

	swal({
		title: "¿Realmente desea registrar la venta como pagada?",
		text: "Una vez realizado este proceso la venta sera pagada por completo",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((willDelete) => {
		if (willDelete) {
			let formData = new FormData();
			formData.append("idVenta", idVenta);

			$.ajax({
				url: window.dir + 'index.php/Controller_Cuentas_x_Pagar/procesarVenta',
				type: 'POST',
				processData: false,
				contentType: false,
				timeout: 800000,
				data: formData,
				beforeSend : function (){
					$('#loadingHeader').css('display','');
					$('#btnPagoReferenciado').css('display','none');
					$('#loadingPagoReferenciado').css('display','');
				},
				success: function(data){
					console.log(data);
					if (data == 1) {
						$('#fetchCuentasXPagar').DataTable().destroy();
						document.getElementById("fetchCuentasXPagar").tBodies[0].innerHTML = "";
						fetchCuentasXPagar('yes', dateStart, dateEnd, branch);	
						toastr.success('Pago procesado con exito.', 'Correcto');
					}else{
						toastr.warning('Ocurrio un error al procesar el pago.', 'Error');
					}
				}
			})
			.done(function() {
				$('#loadingHeader').css('display','none');
				$('#btnPagoReferenciado').css('display','');
				$('#loadingPagoReferenciado').css('display','none');
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				$('#loadingHeader').css('display','none');
				$('#btnPagoReferenciado').css('display','');
				$('#loadingPagoReferenciado').css('display','none');
				$("#modalErrorConexion").modal("show");
			})
			.always(function() {
				$('#loadingHeader').css('display','none');
				$('#btnPagoReferenciado').css('display','');
				$('#loadingPagoReferenciado').css('display','none');
			});
		}
	});
}

function forceFileDownload(response,filename){
	//const url = window.URL.createObjectURL(new Blob([response.data]))
	const url = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/CSV/' + filename + '.txt';
	const link = document.createElement('a')
	link.href = url
	link.setAttribute('download', filename + '.txt') //or any other extension
	document.body.appendChild(link);
	link.click();
}

const btnWebServiceBanregio = ( e ) => {

	swal({
		title: "¿Esta segúro que desea procesar pagos referenciados?",
		text: "Este proceso se realiza de manera automatica",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((willDelete) => {
		if (willDelete) {
			const branch = document.querySelector("#selectBranch").value;
			const dateStart = document.querySelector("#dateReferenciaStart").value;
			const dateEnd = document.querySelector("#dateReferenciaEnd").value;

			if (branch != "") {
				if (dateStart != "" && dateEnd != "") {
					console.log("Click Procesar info");
					
					let formData = new FormData();
					formData.append("idSucursal", branch);
					formData.append("FechaStart", dateStart);
					formData.append("FechaEnd", dateEnd);

					$.ajax({
						url: window.dir + 'index.php/Controller_Cuentas_x_Pagar/btnWebServiceBanregio',
						type: 'POST',
						processData: false,
						contentType: false,
						timeout: 800000,
						data: formData,
						beforeSend : function (){
							$('#loadingHeader').css('display','');
							$('#btnPagoReferenciado').css('display','none');
							$('#loadingPagoReferenciado').css('display','');
						},
						success: function(data){
							console.log(data);

							console.log(JSON.parse(data));

							const { code, message } = JSON.parse(data);

							if (code == 1) {
								const { Reporte } = JSON.parse(data);

								forceFileDownload(Reporte, 'Denegado_Carga');

								$('#fetchCuentasXPagar').DataTable().destroy();
								document.getElementById("fetchCuentasXPagar").tBodies[0].innerHTML = "";
								fetchCuentasXPagar('yes', dateStart, dateEnd, branch);	
								toastr.success(message, 'Correcto');
							}else if(code == 0){
								const { Reporte } = JSON.parse(data);

								forceFileDownload(Reporte, 'Denegado_Carga');

								$('#fetchCuentasXPagar').DataTable().destroy();
								document.getElementById("fetchCuentasXPagar").tBodies[0].innerHTML = "";
								fetchCuentasXPagar('yes', dateStart, dateEnd, branch);	
								toastr.warning(message, 'Error');
							}else{
								console.log('Dentro del else');
								toastr.error(message, 'Error');
							}
						}
					})
					.done(function() {
						$('#loadingHeader').css('display','none');
						$('#btnPagoReferenciado').css('display','');
						$('#loadingPagoReferenciado').css('display','none');
					})
					.fail(function(jqXHR, textStatus, errorThrown) {
						$('#loadingHeader').css('display','none');
						$('#btnPagoReferenciado').css('display','');
						$('#loadingPagoReferenciado').css('display','none');
						$("#modalErrorConexion").modal("show");
					})
					.always(function() {
						$('#loadingHeader').css('display','none');
						$('#btnPagoReferenciado').css('display','');
						$('#loadingPagoReferenciado').css('display','none');
					});
					
				}else{
					toastr.warning('Para este proceso, es necesario asignar un rango de fechas.', 'Advertencia');
				}
			}else{
				toastr.warning('Seleccione una sucursal.', 'Advertencia');
			}
		}
	});
}

// const btnWebServiceBanregio = ( e ) => {

// 	swal({
// 		title: "¿Esta segúro que desea procesar pagos referenciados?",
// 		text: "Este proceso se realiza de manera automatica",
// 		icon: "warning",
// 		buttons: true,
// 		dangerMode: true,
// 	})
// 	.then((willDelete) => {
// 		if (willDelete) {
// 			const branch = document.querySelector("#selectBranch").value;
// 			const dateStart = document.querySelector("#dateReferenciaStart").value;
// 			const dateEnd = document.querySelector("#dateReferenciaEnd").value;

// 			if (branch != "") {
// 				if (dateStart != "" && dateEnd != "") {
// 					console.log("Click Procesar info");
					
// 					let formData = new FormData();
// 					formData.append("idSucursal", branch);
// 					formData.append("FechaStart", dateStart);
// 					formData.append("FechaEnd", dateEnd);

// 					$.ajax({
// 						url: window.dir + 'index.php/Controller_Cuentas_x_Pagar/btnWebServiceBanregio',
// 						type: 'POST',
// 						processData: false,
// 						contentType: false,
// 						timeout: 800000,
// 						data: formData,
// 						beforeSend : function (){
// 							$('#loadingHeader').css('display','');
// 							$('#btnPagoReferenciado').css('display','none');
// 							$('#loadingPagoReferenciado').css('display','');
// 						},
// 						success: function(data){
// 							console.log(data);

// 							const { code, message } = JSON.parse(data);

// 							if (code == 1) {
// 								$('#fetchCuentasXPagar').DataTable().destroy();
// 								document.getElementById("fetchCuentasXPagar").tBodies[0].innerHTML = "";
// 								fetchCuentasXPagar('yes', dateStart, dateEnd, branch);	
// 								toastr.success(message, 'Correcto');
// 							}else{
// 								toastr.warning(message, 'Error');
// 							}
// 						}
// 					})
// 					.done(function() {
// 						$('#loadingHeader').css('display','none');
// 						$('#btnPagoReferenciado').css('display','');
// 						$('#loadingPagoReferenciado').css('display','none');
// 					})
// 					.fail(function(jqXHR, textStatus, errorThrown) {
// 						$('#loadingHeader').css('display','none');
// 						$('#btnPagoReferenciado').css('display','');
// 						$('#loadingPagoReferenciado').css('display','none');
// 						$("#modalErrorConexion").modal("show");
// 					})
// 					.always(function() {
// 						$('#loadingHeader').css('display','none');
// 						$('#btnPagoReferenciado').css('display','');
// 						$('#loadingPagoReferenciado').css('display','none');
// 					});
					
// 				}else{
// 					toastr.warning('Para este proceso, es necesario asignar un rango de fechas.', 'Advertencia');
// 				}
// 			}else{
// 				toastr.warning('Seleccione una sucursal.', 'Advertencia');
// 			}
// 		}
// 	});
// }
