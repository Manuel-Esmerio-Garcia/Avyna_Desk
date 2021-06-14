window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.ID_Bodega;
window.Tabla_Pagos_Global = null;
window.Tabla_Realizados_Global = null;

$(document).ready(function(){ 

$('.input-daterange').datepicker({
  format: "yyyy-mm-dd",
  autoclose: true
});

$("#Confirmar_Todos_Pago").click(function(event) {
	
	if (window.ID_Bodega != null && window.ID_Bodega != "")
	{
		swal({
		  title: "¿Esta seguro que desea confirmar todos pagos?",
		  text: "Una vez confirmados los pagos los status pasaran como confirmado",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		    
		    let Fecha_Desde  = $("#start_date").val();
			let Fecha_Hasta  = $("#end_date").val();
			let Distribuidor = $("#exampleFormControlSelect2").val();
			let idBodega     = window.ID_Bodega;

			var formData = new FormData();
	        formData.append("Fecha_Desde", Fecha_Desde);
	        formData.append("Fecha_Hasta", Fecha_Hasta);
	        formData.append("Distribuidor", Distribuidor);
	        formData.append("idBodega", idBodega);

	        $.ajax({
	            url: dir + 'index.php/Controller_Cuentas_x_Pagar/Confirmar_Todos_Pago',
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

	                if (data == 1)
	                {
	                	let Cliente  = $('#exampleFormControlSelect2').val();
						let Inicio   = $("#start_date").val();
						let Fin      = $("#end_date").val();

						if (Inicio != null && Inicio != "" && Fin != null && Fin != "")
						{
							$('#Table_Pagos_Pendientes').DataTable().destroy();
				    		fetch_data('yes', Inicio,Fin,Cliente,window.ID_Bodega);
						}
						else
						{
							$('#Table_Pagos_Pendientes').DataTable().destroy();
				    		fetch_data('no', '','',Cliente,window.ID_Bodega);
						}

						// Display an error toast, with a title
		                toastr.success('Pagos confirmados con exito', 'Correcto');
	                }
	                else
	                {
	                	// Display an error toast, with a title
		                toastr.error('Ocurrio un error al confirmar todos los pagos', 'Error');
	                }
	            }

	            })
	            .done(function() {
	                $('#Cargando_Header').css('display','none');
	            })
	            .fail(function(jqXHR, textStatus, errorThrown) {
	        	})
	            .always(function() {
	            });

		  }
		});		
	}
	else
	{
	    // Display an error toast, with a title
	    toastr.warning('Por favor seleccione una bodega', 'Advertencia');
	}

});

$("#exampleFormControlSelect2").change(function(e){

	if (window.ID_Bodega != null && window.ID_Bodega != "")
	{

		let Cliente  = $('#exampleFormControlSelect2').val();
		let Inicio   = $("#start_date").val();
		let Fin      = $("#end_date").val();

		if (Cliente != '' && Cliente != null)
		{
			if (Inicio != null && Inicio != "" && Fin != null && Fin != "")
			{
				$('#Table_Pagos_Pendientes').DataTable().destroy();
	    		fetch_data('yes', Inicio,Fin,Cliente,window.ID_Bodega);

	    				$("#Div_Imagen").empty();
				        $("#label_Banco").text("");
				    	$("#label_Cantidad").text("");
			}
			else
			{
				$('#Table_Pagos_Pendientes').DataTable().destroy();
	    		fetch_data('no', '','',Cliente,window.ID_Bodega);

	    				$("#Div_Imagen").empty();
				        $("#label_Banco").text("");
				    	$("#label_Cantidad").text("");
			}    	

	  	}
	  	else
	  	{

	  		if (Inicio != null && Inicio != "" && Fin != null && Fin != "")
			{
				$('#Table_Pagos_Pendientes').DataTable().destroy();
	    		fetch_data('yes', Inicio,Fin,'',window.ID_Bodega);

	    				$("#Div_Imagen").empty();
				        $("#label_Banco").text("");
				    	$("#label_Cantidad").text("");
			}
			else
			{
				$('#Table_Pagos_Pendientes').DataTable().destroy();
	    		fetch_data('no', '','','',window.ID_Bodega);

	    				$("#Div_Imagen").empty();
				        $("#label_Banco").text("");
				    	$("#label_Cantidad").text("");
			}  
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
	                          "timeOut": "850",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.warning('Por favor seleccione una bodega', 'Advertencia');
	}

});



$("#exampleFormControlSelect2_Realizado").change(function(e){

	if (window.ID_Bodega != null && window.ID_Bodega != "")
	{

		let Cliente  = $('#exampleFormControlSelect2_Realizado').val();
		let Inicio   = $("#start_date_Realizado").val();
		let Fin      = $("#end_date_Realizado").val();

		if (Cliente != '' && Cliente != null)
		{
			if (Inicio != null && Inicio != "" && Fin != null && Fin != "")
			{
				$('#Table_Pagos_Realizados').DataTable().destroy();
	    		fetch_data_Realizado('yes', Inicio,Fin,Cliente,window.ID_Bodega);
			}
			else
			{
				$('#Table_Pagos_Realizados').DataTable().destroy();
	    		fetch_data_Realizado('no', '','',Cliente,window.ID_Bodega);
			}    	

	  	}
	  	else
	  	{

	  		if (Inicio != null && Inicio != "" && Fin != null && Fin != "")
			{
				$('#Table_Pagos_Realizados').DataTable().destroy();
	    		fetch_data_Realizado('yes', Inicio,Fin,'',window.ID_Bodega);
			}
			else
			{
				$('#Table_Pagos_Realizados').DataTable().destroy();
	    		fetch_data_Realizado('no', '','','',window.ID_Bodega);
			}  
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
	                          "timeOut": "850",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.warning('Por favor seleccione una bodega', 'Advertencia');
	}

});

$("#search_Realizado").click(function(){

	if (window.ID_Bodega != null && window.ID_Bodega != "")
	{
		  let start_date = $('#start_date_Realizado').val();
		  let end_date   = $('#end_date_Realizado').val();
		  let Cliente    = $('#exampleFormControlSelect2_Realizado').val();

		  if (start_date != '' && end_date != '')
		  {
		  	if (Cliente != null && Cliente != "")
		  	{
		  		$('#Table_Pagos_Realizados').DataTable().destroy();
				fetch_data_Realizado('yes', start_date, end_date,Cliente,window.ID_Bodega);
		  	}
		  	else
		  	{
		  		$('#Table_Pagos_Realizados').DataTable().destroy();
				fetch_data_Realizado('yes', start_date, end_date,'',window.ID_Bodega);
		  	}   

		  }else{

		  	if (Cliente != null && Cliente != "")
		  	{
		  		$('#Table_Pagos_Realizados').DataTable().destroy();
				fetch_data_Realizado('no', '', '',Cliente,window.ID_Bodega);
		  	}
		  	else
		  	{
		  		$('#Table_Pagos_Realizados').DataTable().destroy();
				fetch_data_Realizado('no', '', '','',window.ID_Bodega);
		  	}

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
	                          "timeOut": "850",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.warning('Por favor seleccione una bodega', 'Advertencia');
		}

});


$("#search").click(function(){

	if (window.ID_Bodega != null && window.ID_Bodega != "")
	{
		  let start_date = $('#start_date').val();
		  let end_date   = $('#end_date').val();
		  let Cliente    = $('#exampleFormControlSelect2').val();

		  if (start_date != '' && end_date != '')
		  {
		  	if (Cliente != null && Cliente != "")
		  	{
		  		$('#Table_Pagos_Pendientes').DataTable().destroy();
				fetch_data('yes', start_date, end_date,Cliente,window.ID_Bodega);

							$("#Div_Imagen").empty();
					        $("#label_Banco").text("");
					    	$("#label_Cantidad").text("");
		  	}
		  	else
		  	{
		  		$('#Table_Pagos_Pendientes').DataTable().destroy();
				fetch_data('yes', start_date, end_date,'',window.ID_Bodega);

							$("#Div_Imagen").empty();
					        $("#label_Banco").text("");
					    	$("#label_Cantidad").text("");
		  	}   

		  }else{

		  	if (Cliente != null && Cliente != "")
		  	{
		  		$('#Table_Pagos_Pendientes').DataTable().destroy();
				fetch_data('no', '', '',Cliente,window.ID_Bodega);

							$("#Div_Imagen").empty();
					        $("#label_Banco").text("");
					    	$("#label_Cantidad").text("");
		  	}
		  	else
		  	{
		  		$('#Table_Pagos_Pendientes').DataTable().destroy();
				fetch_data('no', '', '','',window.ID_Bodega);

							$("#Div_Imagen").empty();
					        $("#label_Banco").text("");
					    	$("#label_Cantidad").text("");
		  	}

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
	                          "timeOut": "850",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.warning('Por favor seleccione una bodega', 'Advertencia');
		}

});

$("#select_Bodega").change(function(event)
{
	let Bodega 	   = $("#select_Bodega").val();
	let start_date = $('#start_date').val();
  	let end_date   = $('#end_date').val();
  	let Cliente    = $('#exampleFormControlSelect2').val();

  	let start_date_Realizado = $('#start_date_Realizado').val();
  	let end_date_Realizado   = $('#end_date_Realizado').val();
  	let Cliente_Realizado    = $('#exampleFormControlSelect2_Realizado').val();

  	let Pago_Pendiente   = document.getElementById("Table_Pagos_Pendientes"); 
    let tbody_Detalle    = Pago_Pendiente.tBodies[0];

    let Pago_Realizado   = document.getElementById("Table_Pagos_Realizados"); 
    let tbody_Realizado  = Pago_Realizado.tBodies[0];

	if (Bodega != null && Bodega != "")
	{
		window.ID_Bodega = Bodega;

		  if (start_date != '' && end_date != '')
		  {
		  	if (Cliente != null && Cliente != "")
		  	{
		  		$('#Table_Pagos_Pendientes').DataTable().destroy();
		  		Pago_Pendiente.tBodies[0].innerHTML = "";
				fetch_data('yes', start_date, end_date,Cliente,window.ID_Bodega);

						$("#Div_Imagen").empty();
				        $("#label_Banco").text("");
				    	$("#label_Cantidad").text("");
		  	}
		  	else
		  	{
		  		$('#Table_Pagos_Pendientes').DataTable().destroy();
		  		Pago_Pendiente.tBodies[0].innerHTML = "";
				fetch_data('yes', start_date, end_date,'',window.ID_Bodega);

						$("#Div_Imagen").empty();
				        $("#label_Banco").text("");
				    	$("#label_Cantidad").text("");
		  	}   

		  }else{

		  	if (Cliente != null && Cliente != "")
		  	{
		  		$('#Table_Pagos_Pendientes').DataTable().destroy();
		  		Pago_Pendiente.tBodies[0].innerHTML = "";
				fetch_data('no', '', '',Cliente,window.ID_Bodega);

						$("#Div_Imagen").empty();
				        $("#label_Banco").text("");
				    	$("#label_Cantidad").text("");
		  	}
		  	else
		  	{
		  		$('#Table_Pagos_Pendientes').DataTable().destroy();
		  		Pago_Pendiente.tBodies[0].innerHTML = "";
				fetch_data('no', '', '','',window.ID_Bodega);

						$("#Div_Imagen").empty();
				        $("#label_Banco").text("");
				    	$("#label_Cantidad").text("");
		  	}

		  }



		  ////////////////////////////////////////////////////////////////////

		  if (start_date_Realizado != '' && end_date_Realizado != '')
		  {
		  	if (Cliente_Realizado != null && Cliente_Realizado != "")
		  	{
		  		$('#Table_Pagos_Realizados').DataTable().destroy();
		  		Pago_Realizado.tBodies[0].innerHTML = "";
				fetch_data_Realizado('yes', start_date_Realizado, end_date_Realizado,Cliente_Realizado,window.ID_Bodega);
		  	}
		  	else
		  	{
		  		$('#Table_Pagos_Realizados').DataTable().destroy();
		  		Pago_Realizado.tBodies[0].innerHTML = "";
				fetch_data_Realizado('yes', start_date_Realizado, end_date_Realizado,'',window.ID_Bodega);
		  	}   

		  }else{

		  	if (Cliente != null && Cliente != "")
		  	{
		  		$('#Table_Pagos_Realizados').DataTable().destroy();
		  		Pago_Realizado.tBodies[0].innerHTML = "";
				fetch_data_Realizado('no', '', '',Cliente_Realizado,window.ID_Bodega);
		  	}
		  	else
		  	{
		  		$('#Table_Pagos_Realizados').DataTable().destroy();
		  		Pago_Realizado.tBodies[0].innerHTML = "";
				fetch_data_Realizado('no', '', '','',window.ID_Bodega);
		  	}

		  }
	}
	else
	{
		$('#Table_Pagos_Pendientes').DataTable().destroy();
		Pago_Pendiente.tBodies[0].innerHTML = "";

		$("#Div_Imagen").empty();
        $("#label_Banco").text("");
    	$("#label_Cantidad").text("");

    	$("#exampleFormControlSelect2").val("");
    	$('#start_date').val("");
  		$('#end_date').val("");

  		$('#Table_Pagos_Realizados').DataTable().destroy();
		Pago_Realizado.tBodies[0].innerHTML = "";

  		$("#exampleFormControlSelect2_Realizado").val("");
    	$('#start_date_Realizado').val("");
  		$('#end_date_Realizado').val("");

	}
});


$("#Confirmar_Pago").click(function(event) {
	
	swal({
	  title: "¿Esta seguro que desea Confirmar el pago?",
	  text: "Una vez hecho esto, no sera posible restablecer el pago",
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	})
	.then((willDelete) => {
	  if (willDelete) {
	   
	   if (window.Tabla_Pagos_Global != null && window.Tabla_Pagos_Global != "")
	   {
	   		var formData = new FormData();
            formData.append("ID", window.Tabla_Pagos_Global.childNodes[4].innerHTML);
            formData.append("idVenta", window.Tabla_Pagos_Global.childNodes[0].innerHTML);

            $.ajax({
                url: dir + 'index.php/Controller_Cuentas_x_Pagar/Confirmar_Pago',
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

                    if (data = "Correcto")
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
	          "timeOut": "850",
	          "extendedTimeOut": "1000",
	          "showEasing": "swing",
	          "hideEasing": "linear",
	          "showMethod": "fadeIn",
	          "hideMethod": "fadeOut",
	          "onHidden": function(){ Refrescar_Informacion();}
	        }
	        // Display an error toast, with a title
	        toastr.success('Pago confirmado con exito', 'Correcto');
                    }
                    else if (data = "Error_Update_Venta")
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
	          "timeOut": "850",
	          "extendedTimeOut": "1000",
	          "showEasing": "swing",
	          "hideEasing": "linear",
	          "showMethod": "fadeIn",
	          "hideMethod": "fadeOut"
	        }
	        // Display an error toast, with a title
	        toastr.error('Error Modificar Venta', 'Error');
                    }
                    else if (data = "Error_Update_Confirmar")
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
	          "timeOut": "850",
	          "extendedTimeOut": "1000",
	          "showEasing": "swing",
	          "hideEasing": "linear",
	          "showMethod": "fadeIn",
	          "hideMethod": "fadeOut"
	        }
	        // Display an error toast, with a title
	        toastr.error('Update Confirmación', 'Error');
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
	          "timeOut": "850",
	          "extendedTimeOut": "1000",
	          "showEasing": "swing",
	          "hideEasing": "linear",
	          "showMethod": "fadeIn",
	          "hideMethod": "fadeOut"
	        }
	        // Display an error toast, with a title
	        toastr.warning('Seleccione un pago cliente', 'Advertencia');
	   }

	  }
	});

});

$("#Rechazar_Pago_Realizado").click(function(event) {

	console.log("click");
	
	if (window.Tabla_Realizados_Global != null)
	{
		if (window.Tabla_Realizados_Global.childNodes[3].childNodes[0].innerHTML == "Confirmado")
		{
			swal({
				  title: "¿Esta seguro que desea rechazar el pago del cliente?",
				  text: "Si el pago tiene relacionado una referencia bancaria se descuadrara los pagos del cliente del sistema con el del banco \n ¿Desea Continuar?",
				  icon: "warning",
				  buttons: true,
				  dangerMode: true,
				})
				.then((willDelete) => {
				  if (willDelete) {

				  	var formData = new FormData();
		            formData.append("ID", window.Tabla_Realizados_Global.childNodes[0].innerHTML);
		            formData.append("Monto", window.Tabla_Realizados_Global.childNodes[2].innerHTML);
		            formData.append("ID_Pago", window.Tabla_Realizados_Global.childNodes[4].innerHTML);

		            $.ajax({
		                url: dir + 'index.php/Controller_Cuentas_x_Pagar/Rechazar_Pago_Realizado',
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

		                    if (data == 'Correcta')
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
							          "timeOut": "850",
							          "extendedTimeOut": "1000",
							          "showEasing": "swing",
							          "hideEasing": "linear",
							          "showMethod": "fadeIn",
							          "hideMethod": "fadeOut",
	          						  "onHidden": function(){ Refrescar_Informacion_Realizado();}
							        }
							        // Display an error toast, with a title
							        toastr.success('Pago del cliente rechazado con exito', 'Correcto');
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
							          "timeOut": "850",
							          "extendedTimeOut": "1000",
							          "showEasing": "swing",
							          "hideEasing": "linear",
							          "showMethod": "fadeIn",
							          "hideMethod": "fadeOut"
							        }
							        // Display an error toast, with a title
							        toastr.error('Ocurrio un error al rechazar el pago del cliente', 'Error');
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
	          "timeOut": "850",
	          "extendedTimeOut": "1000",
	          "showEasing": "swing",
	          "hideEasing": "linear",
	          "showMethod": "fadeIn",
	          "hideMethod": "fadeOut"
	        }
	        // Display an error toast, with a title
	        toastr.warning('El pago ya se encuentra como cancelado o rechazado', 'Advertencia');
	        //El pago ya se encuentra como cancelado o rechazado
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
	          "timeOut": "850",
	          "extendedTimeOut": "1000",
	          "showEasing": "swing",
	          "hideEasing": "linear",
	          "showMethod": "fadeIn",
	          "hideMethod": "fadeOut"
	        }
	        // Display an error toast, with a title
	        toastr.warning('Seleccione un pago cliente', 'Advertencia');
	}
});


$("#Rechazar_Pago").click(function(event) {
		
	swal({
	  title: "¿Esta seguro que desea Rechazar el pago?",
	  text: "Una vez hecho esto, no sera posible restablecer el pago",
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	})
	.then((willDelete) => {
	  if (willDelete) {
	   
	   if (window.Tabla_Pagos_Global != null && window.Tabla_Pagos_Global != "")
	   {
	   		var formData = new FormData();
            formData.append("ID", window.Tabla_Pagos_Global.childNodes[4].innerHTML);
            formData.append("idVenta", window.Tabla_Pagos_Global.childNodes[0].innerHTML);

            $.ajax({
                url: dir + 'index.php/Controller_Cuentas_x_Pagar/Rechazar_Pago',
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

                                      if (data = "Correcto")
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
	          "timeOut": "850",
	          "extendedTimeOut": "1000",
	          "showEasing": "swing",
	          "hideEasing": "linear",
	          "showMethod": "fadeIn",
	          "hideMethod": "fadeOut",
	          "onHidden": function(){ Refrescar_Informacion();}
	        }
	        // Display an error toast, with a title
	        toastr.success('Pago rechazado con exito', 'Correcto');
                    }
                    else if (data = "Error_Update_Venta")
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
	          "timeOut": "850",
	          "extendedTimeOut": "1000",
	          "showEasing": "swing",
	          "hideEasing": "linear",
	          "showMethod": "fadeIn",
	          "hideMethod": "fadeOut"
	        }
	        // Display an error toast, with a title
	        toastr.error('Error Modificar Venta', 'Error');
                    }
                    else if (data = "Error_Update_Rechazar")
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
	          "timeOut": "850",
	          "extendedTimeOut": "1000",
	          "showEasing": "swing",
	          "hideEasing": "linear",
	          "showMethod": "fadeIn",
	          "hideMethod": "fadeOut"
	        }
	        // Display an error toast, with a title
	        toastr.error('Update Rechazar', 'Error');
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
	          "timeOut": "850",
	          "extendedTimeOut": "1000",
	          "showEasing": "swing",
	          "hideEasing": "linear",
	          "showMethod": "fadeIn",
	          "hideMethod": "fadeOut"
	        }
	        // Display an error toast, with a title
	        toastr.warning('Seleccione un pago cliente', 'Advertencia');
	   }

	  }
});


});






	var Table_Realizados = document.getElementById("Table_Pagos_Realizados");
	Table_Realizados.onclick = function(e)
	{
		window.Tabla_Realizados_Global = e.target.parentNode;
	}



	var Table_Pagos = document.getElementById("Table_Pagos_Pendientes");
	Table_Pagos.onclick = function(e)
	{
		    window.Tabla_Pagos_Global = e.target.parentNode;

		    console.log(window.Tabla_Pagos_Global);

		    if (window.Tabla_Pagos_Global.childNodes[0].innerHTML != 'ID de la Venta')
		    {
				    var formData = new FormData();
		            formData.append("ID", window.Tabla_Pagos_Global.childNodes[4].innerHTML);

		            $.ajax({
		                url: dir + 'index.php/Controller_Cuentas_x_Pagar/GetImagen_Cuentas',
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

		                    if (data != null && data != "")
		                    {
		                    	let parsed = JSON.parse(data);

			                    if (parsed['Imagen'][0]['URL_Imagen'] != null && parsed['Imagen'][0]['URL_Imagen'] != "")
			                    {
			                    	$("#Div_Imagen").empty();
			                    	let image = document.createElement("img");
				                    image.setAttribute("src",parsed['Imagen'][0]['URL_Imagen']);
				                    image.setAttribute("style",'max-width:50%');

				                    $("#Div_Imagen").append(image);
				                    $("#label_Banco").text(parsed['Imagen'][0]['Observaciones']);
			                    	$("#label_Cantidad").text(parsed['Imagen'][0]['Monto']);
			                    }
			                    else
			                    {
			                    	$("#Div_Imagen").empty();
			                    	let image = document.createElement("img");
				                    image.setAttribute("src",window.dir + 'assets/img/noimage.png');
				                    image.setAttribute("style",'max-width:50%');

				                    $("#Div_Imagen").append(image);
				                    $("#label_Banco").text(parsed['Imagen'][0]['Observaciones']);
			                    	$("#label_Cantidad").text(parsed['Imagen'][0]['Monto']);


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
			                          "timeOut": "850",
			                          "extendedTimeOut": "1000",
			                          "showEasing": "swing",
			                          "hideEasing": "linear",
			                          "showMethod": "fadeIn",
			                          "hideMethod": "fadeOut"
			                        }
			                        // Display an error toast, with a title
			                        toastr.info('El pago no cuenta imagen', 'Información');
			                    }
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

	}

});


 function fetch_data(is_date_search, start_date='', end_date='', Cliente='',idBodega= window.ID_Bodega){

  var dataTable = $('#Table_Pagos_Pendientes').DataTable({
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
    "columnDefs": [
            {
                "targets": 3,
                'render': function (data, type, full, meta)
                {
                    if (full[3] == 'Pendiente')
                    {
                    	return "<label class='label label-warning'>Pendiente</label>"
                    }
                },
                //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
            }/*,
            {
            	"targets": 2,
                'render': function (data, type, full, meta)
                {
                    
                    return "$ " + full[2]
                }
            },
            {
            	"targets": 8,
                'render': function (data, type, full, meta)
                {
                    
                    return "$ " + full[8]
                }
            }*/

        ],
        
    "order" : [],
    "ajax" : {

        url: dir + "Clases/fetch_Cuentas_Pagar.php",
        type: "POST",
        data:{
          is_date_search:is_date_search, start_date:start_date, end_date:end_date, Cliente:Cliente, idBodega:idBodega
        }
    }
  });
}


 function fetch_data_Realizado(is_date_search, start_date='', end_date='', Cliente='',idBodega= window.ID_Bodega){

  var dataTable = $('#Table_Pagos_Realizados').DataTable({
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
    "columnDefs": [
            {
                "targets": 3,
                'render': function (data, type, full, meta)
                {
                    if (full[3] == 'Confirmado')
                    {
                    	return "<label class='label label-success'>Confirmado</label>"
                    }
                    else if (full[3] == 'Cancelado')
                    {
                    	return "<label class='label label-danger'>Cancelado</label>"
                    }
                    else if (full[3] == 'Rechazado')
                    {
                    	return "<label class='label label-warning'>Rechazado</label>"
                    }

                },
                //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
            }/*,
            {
            	"targets": 2,
                'render': function (data, type, full, meta)
                {
                    
                    return "$ " + full[2]
                }
            },
            {
            	"targets": 8,
                'render': function (data, type, full, meta)
                {
                    
                    return "$ " + full[8]
                }
            }*/

        ],
        
    "order" : [],
    "ajax" : {

        url: dir + "Clases/fetch_Pagos_Realizados.php",
        type: "POST",
        data:{
          is_date_search:is_date_search, start_date:start_date, end_date:end_date, Cliente:Cliente, idBodega:idBodega
        }
    }
  });
}

function Refrescar_Informacion_Realizado()
{
		$('#Table_Pagos_Realizados').DataTable().destroy();
		let Pago_Realizado   = document.getElementById("Table_Pagos_Realizados"); 
		Pago_Realizado.tBodies[0].innerHTML = "";

		fetch_data_Realizado('no', '','','',window.ID_Bodega);

  		$("#exampleFormControlSelect2_Rechazado").val("");
    	$('#start_date_Rechazado').val("");
  		$('#end_date_Rechazado').val("");


		window.Tabla_Realizados_Global = null;
}

function Refrescar_Informacion()
{
		$('#Table_Pagos_Pendientes').DataTable().destroy();
		let Pago_Pendiente   = document.getElementById("Table_Pagos_Pendientes"); 
		Pago_Pendiente.tBodies[0].innerHTML = "";

		$("#Div_Imagen").empty();
        $("#label_Banco").text("");
    	$("#label_Cantidad").text("");

    	fetch_data('no', '','','',window.ID_Bodega);

    	$("#exampleFormControlSelect2").val("");
    	$('#start_date').val("");
  		$('#end_date').val("");

  		window.Tabla_Pagos_Global = null;
}