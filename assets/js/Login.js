window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';

$( document ).ready(function() {

	console.log("Pagina Cargada con exito");

	$("#Inicar_Sesion").click(function(e){

	let Usuario    = $("#Email").val();
	let Contrasena = $("#Password").val();

	if (Usuario != null && Usuario != "")
	{
		if (Contrasena != null && Contrasena != "")
		{
			var formData = new FormData();
	        formData.append("Usuario", Usuario);
	        formData.append("Constrasena", Contrasena);

	        $.ajax({
	        	url: dir + 'index.php/Controller_Login/Validar',
	        	type: 'POST',
	        	processData: false,  // tell jQuery not to process the data
	            contentType: false,
	            timeout: 35000,
	           //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	           data: formData,
	           beforeSend : function ()
	            {
	                $('#Cargando').css('display','');
	            },
	            success: function(data)
	            {
	            	console.log(data);

	            	if (data == 1)
	            	{

	            		toastr.options = {
                                          "closeButton": true,
                                          "debug": false,
                                          "newestOnTop": true,
                                          "progressBar": true,
                                          "positionClass": "toast-top-right",
                                          "preventDuplicates": true,
                                          "onclick": null,
                                          "showDuration": "300",
                                          "hideDuration": "1000",
                                          "timeOut": "1500",
                                          "extendedTimeOut": "1000",
                                          "showEasing": "swing",
                                          "hideEasing": "linear",
                                          "showMethod": "fadeIn",
                                          "hideMethod": "fadeOut",
                                          "onHidden": function(){window.location.replace(dir + "index.php/Controller_index/");}
                                        }

	            		// Display a warning toast, with no title
						toastr.success('Usuario y Contraseña Correctos','Bienvenido');
						
	            	}
	            	else if (data == 2)
	            	{

	            		toastr.options = {
						  "closeButton": true,
						  "debug": false,
						  "newestOnTop": true,
						  "progressBar": true,
						  "positionClass": "toast-top-right",
						  "preventDuplicates": true,
						  "onclick": null,
						  "showDuration": "300",
						  "hideDuration": "1000",
						  "timeOut": "1000",
						  "extendedTimeOut": "1000",
						  "showEasing": "swing",
						  "hideEasing": "linear",
						  "showMethod": "fadeIn",
						  "hideMethod": "fadeOut"
						}
	            		// Display an error toast, with a title
						toastr.error('Usuario y/o Contraseña Incorrectos', 'Error');
	            	}
	            	else if (data == 3)
	            	{

	            		toastr.options = {
						  "closeButton": true,
						  "debug": false,
						  "newestOnTop": true,
						  "progressBar": true,
						  "positionClass": "toast-top-right",
						  "preventDuplicates": true,
						  "onclick": null,
						  "showDuration": "300",
						  "hideDuration": "1000",
						  "timeOut": "1000",
						  "extendedTimeOut": "1000",
						  "showEasing": "swing",
						  "hideEasing": "linear",
						  "showMethod": "fadeIn",
						  "hideMethod": "fadeOut"
						}
	            		// Display an error toast, with a title
						toastr.error('Error inesperado. No se pudo procesar la solicitud', 'Error');
	            	}
	            	else if (data == 4)
	            	{

	            		toastr.options = {
							  "closeButton": true,
							  "debug": false,
							  "newestOnTop": true,
							  "progressBar": true,
							  "positionClass": "toast-top-right",
							  "preventDuplicates": true,
							  "onclick": null,
							  "showDuration": "300",
							  "hideDuration": "1000",
							  "timeOut": "1000",
							  "extendedTimeOut": "1000",
							  "showEasing": "swing",
							  "hideEasing": "linear",
							  "showMethod": "fadeIn",
							  "hideMethod": "fadeOut"
							}
	            		// Display an error toast, with a title
						toastr.info('La cuenta del usuraio se encuentra como inactiva', 'Importante');
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
	        	$('#Cargando').css('display','none');
	        });
	        
		}
		else
		{
			// Display a warning toast, with no title
			toastr.info('El campo contraseña es necesario','Importante');
		}

	}
	else
	{
		// Display a warning toast, with no title
		toastr.info('El campo usuario es necesario','Importante');
	}

	});

});