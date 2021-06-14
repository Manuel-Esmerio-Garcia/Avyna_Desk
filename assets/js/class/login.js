window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';

// Acción ENTER para el documento
$(document).on('keypress',function(e) {
    if(e.which == 13) {
        login();
    }
});

$( document ).ready(function() {

	$("#btn_login").click(function(event) {
		login();
	});

	// Boton OK Verificar ConexiÃ³n //
	$("#btn_OK").click(function(event) {
	    $("#modal_verifica").modal("hide");
	});

});

function login() {
	
	loadToast();
	let User = $("#username").val();
	let Pass = $("#pass").val();

	if (User != "" && User != null){

		if (Pass != "" && Pass != null){

			var formElement = document.getElementById("form-login");
            formData = new FormData(formElement);

	        $.ajax({
	        	url: window.dir + 'index.php/Controller_Login/signIn',
	        	type: 'POST',
	        	processData: false,
	            contentType: false,
	            timeout: 800000,
	           data: formData,
	           beforeSend : function ()
	            {
	                $('#loading_login').css('display','');
	                $('#btn_login').css('display','none');
	            },
	            success: function(data)
	            {
	            	console.log(data);
	            	
	            	switch(parseInt(data.trim())){

	            		case 1:
	            			loadToastSuccess();
	            			toastr.success('Usuario y Contraseña Correctos','Bienvenido');
	            		break;

	            		case 2:
	            			toastr.error('Usuario y/o contraseña incorrectos. \n Código(#0002)', 'Error');
	            		break;

	            		case 3:
	            			toastr.error('No se pudo procesar la solicitud. Por favor intente nuevamente. \n Código(#0003)', 'Error');
	            		break;

	            		case 4:
	            			toastr.warning('Las credenciales se encuentran como inactivas. \n Código(#0004)', 'Advertencia');
	            		break;

	            		case 5:
	            			toastr.warning('La sucursal a la cual esta asignado el usuario se encuentra como inactiva. \n Código(#0005)', 'Advertencia');
	            		break;

	            		default:
	            			toastr.error('Ocurrio un error inesperado. Por favor intente nuevamente. \n Código(#0006)', 'Error');
	            		break;
	            	}
	            }
	        })
	        .done(function() {
	        	$('#loading_login').css('display','none');
	            $('#btn_login').css('display','');
	        })
	        .fail(function(jqXHR, textStatus, errorThrown) {
	        	$('#loading_login').css('display','none');
	            $('#btn_login').css('display','');

	            // Abrir modal Verifique conexiÃ³n
	            $("#modal_verifica").modal('show');
            })
	        .always(function() {
	        });

		}else{
			toastr.info('El campo contraseña es necesario','Importante');
		}

	}else{
		toastr.info('El campo usuario es necesario','Importante');
	}
}

// FunciÃ³n para pre-cargar Objeto toarts
function loadToast() {
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
}

// FunciÃ³n para pre-cargar Objeto toarts Success
function loadToastSuccess() {
	
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
	  "hideMethod": "fadeOut",
	  "onHidden": function(){window.location.replace(window.dir + "index.php/Controller_index/");}
	}
}