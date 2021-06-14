var dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.Tabla_Bodega = null;
window.Tabla_Detalle_Bodega = null;
window.Tabla_Bodega_Locacion = null;
window.Tabla_Detalle_Bodega_Locacion = null;
window.Tabla_Mover_Locacion = null;

$(document).ready(function(){

$('.input-daterange').datepicker({
  format: "yyyy-mm-dd",
  autoclose: true
});

	fetch_data('','','','');

$("#exampleFormControlSelect").change(function(event) {

	let Marca 	 = $("#exampleFormControlSelect option:selected").text();
	let Divicion = $("#exampleFormControlSelect2 option:selected").text();
	let Linea 	 = $("#exampleFormControlSelect3 option:selected").text();
	let Sublinea = $("#exampleFormControlSelect4 option:selected").text();

	let Inventario_General    = document.getElementById("Table_Inventario_General"); 
	$('#Table_Inventario_General').DataTable().destroy();
    Inventario_General.tBodies[0].innerHTML = "";

	fetch_data(Marca,Divicion,Linea,Sublinea);

});

$("#exampleFormControlSelect2").change(function(event) {

	let Marca 	 = $("#exampleFormControlSelect option:selected").text();
	let Divicion = $("#exampleFormControlSelect2 option:selected").text();
	let Linea 	 = $("#exampleFormControlSelect3 option:selected").text();
	let Sublinea = $("#exampleFormControlSelect4 option:selected").text();

	let Inventario_General    = document.getElementById("Table_Inventario_General"); 
	$('#Table_Inventario_General').DataTable().destroy();
    Inventario_General.tBodies[0].innerHTML = "";

	fetch_data(Marca,Divicion,Linea,Sublinea);

});

$("#exampleFormControlSelect3").change(function(event) {

	let Marca 	 = $("#exampleFormControlSelect option:selected").text();
	let Divicion = $("#exampleFormControlSelect2 option:selected").text();
	let Linea 	 = $("#exampleFormControlSelect3 option:selected").text();
	let Sublinea = $("#exampleFormControlSelect4 option:selected").text();

	let Inventario_General    = document.getElementById("Table_Inventario_General"); 
	$('#Table_Inventario_General').DataTable().destroy();
    Inventario_General.tBodies[0].innerHTML = "";

	fetch_data(Marca,Divicion,Linea,Sublinea);

});

$("#exampleFormControlSelect4").change(function(event) {

	let Marca 	 = $("#exampleFormControlSelect option:selected").text();
	let Divicion = $("#exampleFormControlSelect2 option:selected").text();
	let Linea 	 = $("#exampleFormControlSelect3 option:selected").text();
	let Sublinea = $("#exampleFormControlSelect4 option:selected").text();

	let Inventario_General    = document.getElementById("Table_Inventario_General"); 
	$('#Table_Inventario_General').DataTable().destroy();
    Inventario_General.tBodies[0].innerHTML = "";

	fetch_data(Marca,Divicion,Linea,Sublinea);

});


////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
/// Inventario Bodega

$("#Select_Sucursal_Bodega").change(function(event) {
	
	let Bodega = $("#Select_Sucursal_Bodega").val();

		if (Bodega != null && Bodega != "")
		{
			let Marca 	 = $("#exampleFormControlSelect5 option:selected").text();
			let Divicion = $("#exampleFormControlSelect6 option:selected").text();
			let Linea 	 = $("#exampleFormControlSelect7 option:selected").text();
			let Sublinea = $("#exampleFormControlSelect8 option:selected").text();

			let Inventario_Bodega    = document.getElementById("Table_Inventario_Bodega"); 
			$('#Table_Inventario_Bodega').DataTable().destroy();
		    Inventario_Bodega.tBodies[0].innerHTML = "";

			fetch_data_Bodega(Marca,Divicion,Linea,Sublinea,Bodega);
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
            toastr.warning('Por favor, seleccione una Bodega', 'Advertencia');

            let Inventario_Bodega    = document.getElementById("Table_Inventario_Bodega"); 
			$('#Table_Inventario_Bodega').DataTable().destroy();
		    Inventario_Bodega.tBodies[0].innerHTML = "";

		    $("#exampleFormControlSelect5").val('');
		    $("#exampleFormControlSelect6").val('');
		    $("#exampleFormControlSelect7").val('');
		    $("#exampleFormControlSelect8").val('');
		}
});

$("#exampleFormControlSelect5").change(function(event) {

	let Bodega = $("#Select_Sucursal_Bodega").val();

		if (Bodega != null && Bodega != "")
		{
			let Marca 	 = $("#exampleFormControlSelect5 option:selected").text();
			let Divicion = $("#exampleFormControlSelect6 option:selected").text();
			let Linea 	 = $("#exampleFormControlSelect7 option:selected").text();
			let Sublinea = $("#exampleFormControlSelect8 option:selected").text();

			let Inventario_Bodega    = document.getElementById("Table_Inventario_Bodega"); 
			$('#Table_Inventario_Bodega').DataTable().destroy();
		    Inventario_Bodega.tBodies[0].innerHTML = "";

			fetch_data_Bodega(Marca,Divicion,Linea,Sublinea,Bodega);
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
            toastr.warning('Por favor, seleccione una Bodega', 'Advertencia');

            let Inventario_Bodega    = document.getElementById("Table_Inventario_Bodega"); 
			$('#Table_Inventario_Bodega').DataTable().destroy();
		    Inventario_Bodega.tBodies[0].innerHTML = "";

		    $("#exampleFormControlSelect5").val('');
		    $("#exampleFormControlSelect6").val('');
		    $("#exampleFormControlSelect7").val('');
		    $("#exampleFormControlSelect8").val('');
		}

});

$("#exampleFormControlSelect6").change(function(event) {

	let Bodega = $("#Select_Sucursal_Bodega").val();

		if (Bodega != null && Bodega != "")
		{
			let Marca 	 = $("#exampleFormControlSelect5 option:selected").text();
			let Divicion = $("#exampleFormControlSelect6 option:selected").text();
			let Linea 	 = $("#exampleFormControlSelect7 option:selected").text();
			let Sublinea = $("#exampleFormControlSelect8 option:selected").text();

			let Inventario_Bodega    = document.getElementById("Table_Inventario_Bodega"); 
			$('#Table_Inventario_Bodega').DataTable().destroy();
		    Inventario_Bodega.tBodies[0].innerHTML = "";

			fetch_data_Bodega(Marca,Divicion,Linea,Sublinea,Bodega);
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
            toastr.warning('Por favor, seleccione una Bodega', 'Advertencia');

            let Inventario_Bodega    = document.getElementById("Table_Inventario_Bodega"); 
			$('#Table_Inventario_Bodega').DataTable().destroy();
		    Inventario_Bodega.tBodies[0].innerHTML = "";

		    $("#exampleFormControlSelect5").val('');
		    $("#exampleFormControlSelect6").val('');
		    $("#exampleFormControlSelect7").val('');
		    $("#exampleFormControlSelect8").val('');
		}

});

$("#exampleFormControlSelect7").change(function(event) {

	let Bodega = $("#Select_Sucursal_Bodega").val();

		if (Bodega != null && Bodega != "")
		{
			let Marca 	 = $("#exampleFormControlSelect5 option:selected").text();
			let Divicion = $("#exampleFormControlSelect6 option:selected").text();
			let Linea 	 = $("#exampleFormControlSelect7 option:selected").text();
			let Sublinea = $("#exampleFormControlSelect8 option:selected").text();

			let Inventario_Bodega    = document.getElementById("Table_Inventario_Bodega"); 
			$('#Table_Inventario_Bodega').DataTable().destroy();
		    Inventario_Bodega.tBodies[0].innerHTML = "";

			fetch_data_Bodega(Marca,Divicion,Linea,Sublinea,Bodega);
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
            toastr.warning('Por favor, seleccione una Bodega', 'Advertencia');

            let Inventario_Bodega    = document.getElementById("Table_Inventario_Bodega"); 
			$('#Table_Inventario_Bodega').DataTable().destroy();
		    Inventario_Bodega.tBodies[0].innerHTML = "";

		    $("#exampleFormControlSelect5").val('');
		    $("#exampleFormControlSelect6").val('');
		    $("#exampleFormControlSelect7").val('');
		    $("#exampleFormControlSelect8").val('');
		}

});

$("#exampleFormControlSelect8").change(function(event) {

	let Bodega = $("#Select_Sucursal_Bodega").val();

		if (Bodega != null && Bodega != "")
		{
			let Marca 	 = $("#exampleFormControlSelect5 option:selected").text();
			let Divicion = $("#exampleFormControlSelect6 option:selected").text();
			let Linea 	 = $("#exampleFormControlSelect7 option:selected").text();
			let Sublinea = $("#exampleFormControlSelect8 option:selected").text();

			let Inventario_Bodega    = document.getElementById("Table_Inventario_Bodega"); 
			$('#Table_Inventario_Bodega').DataTable().destroy();
		    Inventario_Bodega.tBodies[0].innerHTML = "";

			fetch_data_Bodega(Marca,Divicion,Linea,Sublinea,Bodega);
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
            toastr.warning('Por favor, seleccione una Bodega', 'Advertencia');

            let Inventario_Bodega    = document.getElementById("Table_Inventario_Bodega"); 
			$('#Table_Inventario_Bodega').DataTable().destroy();
		    Inventario_Bodega.tBodies[0].innerHTML = "";

		    $("#exampleFormControlSelect5").val('');
		    $("#exampleFormControlSelect6").val('');
		    $("#exampleFormControlSelect7").val('');
		    $("#exampleFormControlSelect8").val('');
		}

});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// Inventario por Locacion

$("#Select_Sucursal_Bodega_Locacion").change(function(event) {
	
	let Bodega = $("#Select_Sucursal_Bodega_Locacion").val();

		if (Bodega != null && Bodega != "")
		{
			let Inventario_Bodega_Locacion    = document.getElementById("Table_Inventario_Locacion"); 
			$('#Table_Inventario_Locacion').DataTable().destroy();
		    Inventario_Bodega_Locacion.tBodies[0].innerHTML = "";

			fetch_data_Bodega_Locacion(Bodega);
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
            toastr.warning('Por favor, seleccione una Bodega', 'Advertencia');

            let Inventario_Bodega_Locacion    = document.getElementById("Table_Inventario_Locacion"); 
			$('#Table_Inventario_Locacion').DataTable().destroy();
		    Inventario_Bodega_Locacion.tBodies[0].innerHTML = "";
		}
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Movimientos

$("#Select_Sucursal_Bodega_Moviminetos").change(function(event) {
	
		let Bodega   = $("#Select_Sucursal_Bodega_Moviminetos").val();
		//let Locacion = $("#Select_Locacion_Envia").val();

		if (Bodega != null && Bodega != "")
		{
			let Inventario_Mover    = document.getElementById("Table_Mover_Producto"); 
			$('#Table_Mover_Producto').DataTable().destroy();
		    Inventario_Mover.tBodies[0].innerHTML = "";
			    
			Buscar_Locacion_Sucursal(Bodega);

			if (Locacion != null && Locacion != "")
			{
				let Inventario_Mover    = document.getElementById("Table_Mover_Producto"); 
				$('#Table_Mover_Producto').DataTable().destroy();
			    Inventario_Mover.tBodies[0].innerHTML = "";

				fetch_data_Mover(Bodega,Locacion);
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
	            toastr.info('Por favor, seleccione una Locación', 'Importante');

				let Inventario_Mover    = document.getElementById("Table_Mover_Producto"); 
				$('#Table_Mover_Producto').DataTable().destroy();
			    Inventario_Mover.tBodies[0].innerHTML = "";
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
            toastr.warning('Por favor, seleccione una Bodega', 'Advertencia');

			let Inventario_Mover    = document.getElementById("Table_Mover_Producto"); 
			$('#Table_Mover_Producto').DataTable().destroy();
		    Inventario_Mover.tBodies[0].innerHTML = "";
		}

});


$("#Select_Locacion_Envia").change(function(event) {
	
		let Bodega   = $("#Select_Sucursal_Bodega_Moviminetos").val();
		let Locacion = $("#Select_Locacion_Envia").val();

		if (Bodega != null && Bodega != "")
		{
			if (Locacion != null && Locacion != "")
			{
				let Inventario_Mover    = document.getElementById("Table_Mover_Producto"); 
				$('#Table_Mover_Producto').DataTable().destroy();
			    Inventario_Mover.tBodies[0].innerHTML = "";

				fetch_data_Mover(Bodega,Locacion);
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
	            toastr.info('Por favor, seleccione una Locación', 'Importante');

				let Inventario_Mover    = document.getElementById("Table_Mover_Producto"); 
				$('#Table_Mover_Producto').DataTable().destroy();
			    Inventario_Mover.tBodies[0].innerHTML = "";
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
            toastr.warning('Por favor, seleccione una Bodega', 'Advertencia');

			let Inventario_Mover    = document.getElementById("Table_Mover_Producto"); 
			$('#Table_Mover_Producto').DataTable().destroy();
		    Inventario_Mover.tBodies[0].innerHTML = "";
		}

});

$("#btn_Editar_Locacion").click(function(event) {
	
	if (window.Tabla_Detalle_Bodega != null && window.Tabla_Detalle_Bodega != "")
	{
		Cargar_Editar_Detalle();

		$("#Edit_Fecha_Ingreso").val(window.Tabla_Detalle_Bodega.childNodes[0].innerHTML);
		$("#Edit_Locacion").val(window.Tabla_Detalle_Bodega.childNodes[4].innerHTML);
		$("#Edit_Existencias").val(window.Tabla_Detalle_Bodega.childNodes[2].innerHTML);
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
        toastr.warning('Por favor, Seleccione un detalle de inventario', 'Advertencia');
	}
});


$("#btn_Editar_x_Locacion").click(function(event) {
	
	if (window.Tabla_Detalle_Bodega_Locacion != null && window.Tabla_Detalle_Bodega_Locacion != "")
	{

		$("#Edit_Fecha_Ingreso_Locacion").val(window.Tabla_Detalle_Bodega_Locacion.childNodes[3].innerHTML);
		$("#Editar_Detalle_Inventario_Locacion").modal("show");
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
        toastr.warning('Por favor, Seleccione un detalle de inventario', 'Advertencia');
	}
});

$("#btn_Guardar_Cambios_Detalle").click(function(event) {
	
		let Fecha 	 	= $("#Edit_Fecha_Ingreso").val();
		let Locacion 	= $("#Edit_Locacion").val();
		let Existencias = $("#Edit_Existencias").val();
		let ID 			= window.Tabla_Detalle_Bodega.childNodes[3].innerHTML;
		let OldExistencias = window.Tabla_Detalle_Bodega.childNodes[2].innerHTML;

		var formData = new FormData();
        formData.append("ID", ID);
        formData.append("Fecha_ingreso", Fecha);
        formData.append("idLocacion", Locacion);
        formData.append("Existencias", Existencias);
        formData.append("OldExistencias", OldExistencias);


        $.ajax({
            url: dir + 'index.php/Controller_Inventario/Update_Detalle_Venta_Menudeo',
            type: 'POST',
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            timeout: 35000,
            //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: formData,
            beforeSend : function ()
            {
                $('#Cargando_Edit_Inventario').css('display','');
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
			              "timeOut": "850",
			              "extendedTimeOut": "1000",
			              "showEasing": "swing",
			              "hideEasing": "linear",
			              "showMethod": "fadeIn",
			              "hideMethod": "fadeOut"
			            }
			            // Display an error toast, with a title
			            toastr.success('Detalle Inventario editado con exito', 'Correcto');

			            Cargar_Info();

			            $("#Editar_Detalle_Inventario").modal("hide");
			            $("#Edit_Fecha_Ingreso").val('');
			            $("#Edit_Locacion").val('');
			            $("#Edit_Existencias").val('');

	            		window.Tabla_Detalle_Bodega = null;
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
				            toastr.warning('Filas afectadas 0', 'Advertencia');
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
			            toastr.warning('Ocurrio un error al editar el detalle inventario ' + data, 'Advertencia');
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
                $('#Cargando_Edit_Inventario').css('display','none');
            });
});

$("#btn_Guardar_Cambios_Detalle_Locacion").click(function(event) {
	
		let Fecha 	 	= $("#Edit_Fecha_Ingreso_Locacion").val();
		let ID 			= window.Tabla_Detalle_Bodega_Locacion.childNodes[0].innerHTML;

		var formData = new FormData();
        formData.append("ID", ID);
        formData.append("Fecha_ingreso", Fecha);

        $.ajax({
            url: dir + 'index.php/Controller_Inventario/Update_Detalle_Venta_Menudeo',
            type: 'POST',
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            timeout: 35000,
            //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: formData,
            beforeSend : function ()
            {
                $('#Cargando_Edit_Inventario_Locacion').css('display','');
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
			              "timeOut": "850",
			              "extendedTimeOut": "1000",
			              "showEasing": "swing",
			              "hideEasing": "linear",
			              "showMethod": "fadeIn",
			              "hideMethod": "fadeOut"
			            }
			            // Display an error toast, with a title
			            toastr.success('Detalle Inventario editado con exito', 'Correcto');

			            Cargar_Info_Locacion();

			            $("#Editar_Detalle_Inventario_Locacion").modal("hide");
			            $("#Edit_Fecha_Ingreso_Locacion").val('');

	            		window.Tabla_Detalle_Bodega_Locacion = null;

	            		window.Tabla_Bodega_Locacion = null;
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
				            toastr.warning('Filas afectadas 0', 'Advertencia');
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
			            toastr.warning('Ocurrio un error al editar el detalle inventario ' + data, 'Advertencia');
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
                $('#Cargando_Edit_Inventario_Locacion').css('display','none');
            });
});

$("#btn_Mover").click(function(event) {

	let Enviar = $("#Select_Locacion_Envia").val();
	let Recibe = $("#Select_Locacion_Recibe").val();

	if (Enviar != null && Enviar != "" && Recibe != null && Recibe != "")
	{
		if (window.Tabla_Mover_Locacion != null && window.Tabla_Mover_Locacion != "")
		{
			$("#Mover_Mercancia").modal("show");
			$("#label_Existencias").text(window.Tabla_Mover_Locacion.childNodes[3].innerHTML);
			$("#number_Cantidad").val(0);
			$("#number_Cantidad").attr('max', window.Tabla_Mover_Locacion.childNodes[3].innerHTML);
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
				            toastr.warning('Selecciona un producto', 'Advertencia');

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
				            toastr.warning('Para poder realizar el movimiento es necesario seleccionar una locacion que envia y otra que recibe', 'Advertencia');
	}
});








































































































$("#btn_Mover_Locacion_Locacion").click(function(event) {

	let Cantidad 	= parseInt($("#number_Cantidad").val());
	let Enviar 	 	= $("#Select_Locacion_Envia").val();
	let Recibe 	 	= $("#Select_Locacion_Recibe").val();
	let Envia_text  = $("#Select_Locacion_Envia option:selected").text();
	let Recibe_text = $("#Select_Locacion_Recibe option:selected").text();
	let Bodega   	= $("#Select_Sucursal_Bodega_Moviminetos").val();
	let Locacion 	= $("#Select_Locacion_Envia").val();
	let Inventario_Mover    = document.getElementById("Table_Mover_Producto"); 

	console.log(Cantidad);
	console.log(window.Tabla_Mover_Locacion.childNodes[3].innerHTML);

	if (Cantidad <= parseInt(window.Tabla_Mover_Locacion.childNodes[3].innerHTML))
	{
		if (Enviar != Recibe)
		{
			swal({
				  title: "¿Esta seguro que desea mover " + Cantidad + " " + window.Tabla_Mover_Locacion.childNodes[2].innerHTML + " de locación?",
				  text: "Locación Origen: " + Envia_text + " Locación Destino: " + Recibe_text,
				  icon: "warning",
				  buttons: true,
				  dangerMode: true,
				})
				.then((willDelete) => {
				  if (willDelete)
				  {
				    if (Cantidad > 0) 
					{
						var formData = new FormData();
				        formData.append("ID", window.Tabla_Mover_Locacion.childNodes[0].innerHTML);
				        formData.append("Cantidad", Cantidad);
				        formData.append("Enviar", Enviar); 
				        formData.append("Recibe", Recibe);
				        formData.append("Existencias_old", window.Tabla_Mover_Locacion.childNodes[3].innerHTML);

				        $.ajax({
				            url: dir + 'index.php/Controller_Inventario/Mover_Locacion',
				            type: 'POST',
				            processData: false,  // tell jQuery not to process the data
				            contentType: false,
				            timeout: 35000,
				            //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
				            data: formData,
				            beforeSend : function ()
				            {
				                $('#Cargando_Transpaso').css('display','');
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
								              "timeOut": "850",
								              "extendedTimeOut": "1000",
								              "showEasing": "swing",
								              "hideEasing": "linear",
								              "showMethod": "fadeIn",
								              "hideMethod": "fadeOut"
								            }
								            // Display an error toast, with a title
								            toastr.success('Cambio de almacen correcto', 'Correcto');

											$('#Table_Mover_Producto').DataTable().destroy();
					    					Inventario_Mover.tBodies[0].innerHTML = "";

											fetch_data_Mover(Bodega,Locacion);

								            $("#Mover_Mercancia").modal("hide");
								            $("#number_Cantidad").val();
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
						              "timeOut": "850",
						              "extendedTimeOut": "1000",
						              "showEasing": "swing",
						              "hideEasing": "linear",
						              "showMethod": "fadeIn",
						              "hideMethod": "fadeOut"
						            }
						            // Display an error toast, with a title
						            toastr.error('Ocurrio un erro al hacer el movimiento', 'Error');

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
				                $('#Cargando_Transpaso').css('display','none');
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
								            toastr.warning('Mo es posible cambiar el producto de locación si la cantidad es menor a 0', 'Advertencia');

					} // end if Cantidad > 0
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
		            toastr.error('No es posible hacer el cambio de locación si es la misma', 'Error');
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
		            toastr.error('La cantidad es mayor a las existencias', 'Error');
	}
});





var Table_DetalleBodega = document.getElementById("Table_Inventario_Detalle_Bodega");
Table_DetalleBodega.onclick = function(e)
{
	    window.Tabla_Detalle_Bodega = e.target.parentNode;
}

var Table_DetalleBodega_Locacion = document.getElementById("Table_Inventario_Detalle_Locacion");
Table_DetalleBodega_Locacion.onclick = function(e)
{
	    window.Tabla_Detalle_Bodega_Locacion = e.target.parentNode;
}


var Table_Mover = document.getElementById("Table_Mover_Producto");
Table_Mover.onclick = function(e)
{
	    window.Tabla_Mover_Locacion = e.target.parentNode;

	    console.log(window.Tabla_Mover_Locacion);
}

var Table_Bodega = document.getElementById("Table_Inventario_Bodega");
Table_Bodega.onclick = function(e)
{
	    window.Tabla_Bodega = e.target.parentNode;

	    console.log(window.Tabla_Bodega.childNodes[0].innerHTML);

	    var formData = new FormData();
        formData.append("ID", window.Tabla_Bodega.childNodes[0].innerHTML);

        $.ajax({
            url: dir + 'index.php/Controller_Inventario/Get_Inventario_Bodega_Detalle',
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

	            if (parsed != null && parsed != "")
	            {
            		let Bodega_Detalle   = document.getElementById("Table_Inventario_Detalle_Bodega"); 
            		let tbody_Detalle    = Bodega_Detalle.tBodies[0];

            		$('#Table_Inventario_Detalle_Bodega').DataTable().destroy();
            		Bodega_Detalle.tBodies[0].innerHTML = "";

            		    for (var i = 0; i < parsed['Detalle'].length; i++) 
		                {

		                 let row  = tbody_Detalle.insertRow(i);
		                 let cel1 = row.insertCell(0);
		                 let cel2 = row.insertCell(1);
		                 let cel3 = row.insertCell(2);
		                 let cel4 = row.insertCell(3);
		                 let cel5 = row.insertCell(4);

		                 cel1.innerHTML = parsed['Detalle'][i]['Fecha_compra'];
		                 cel2.innerHTML = parsed['Detalle'][i]['Locacion'];
		                 cel3.innerHTML = parsed['Detalle'][i]['Existencias'];
		                 cel4.innerHTML = parsed['Detalle'][i]['ID'];
		                 cel4.setAttribute("hidden", true);
		                 cel5.innerHTML = parsed['Detalle'][i]['idLocacion'];
		                 cel5.setAttribute("hidden", true);
		                
		                }

		                Crear_data_table_Bodega_Detalle();
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

///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//// Table Locacion

var Table_Bodega_Locacion = document.getElementById("Table_Inventario_Locacion");
Table_Bodega_Locacion.onclick = function(e)
{
	    window.Tabla_Bodega_Locacion = e.target.parentNode;

	    var formData = new FormData();
        formData.append("ID", window.Tabla_Bodega_Locacion.childNodes[0].innerHTML);

        $.ajax({
            url: dir + 'index.php/Controller_Inventario/Get_Inventario_Bodega_Detalle_Location',
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

	            if (parsed != null && parsed != "")
	            {
            		let Bodega_Detalle   = document.getElementById("Table_Inventario_Detalle_Locacion"); 
            		let tbody_Detalle    = Bodega_Detalle.tBodies[0];

            		$('#Table_Inventario_Detalle_Locacion').DataTable().destroy();
            		Bodega_Detalle.tBodies[0].innerHTML = "";

            		    for (var i = 0; i < parsed['Detalle'].length; i++) 
		                {

		                 let row  = tbody_Detalle.insertRow(i);
		                 let cel1 = row.insertCell(0);
		                 let cel2 = row.insertCell(1);
		                 let cel3 = row.insertCell(2);
		                 let cel4 = row.insertCell(3);
		                 let cel5 = row.insertCell(4);

		                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
		                 cel2.innerHTML = parsed['Detalle'][i]['Codigo'];
		                 cel3.innerHTML = parsed['Detalle'][i]['Producto'];
		                 cel4.innerHTML = parsed['Detalle'][i]['Fecha_ingreso'];
		                 cel5.innerHTML = parsed['Detalle'][i]['Existencias'];
		                
		                }

		                Crear_data_table_Bodega_Detalle_Locacion();
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

 function fetch_data(Marca='', Division='', Linea='',Sublinea=''){

  var dataTable = $('#Table_Inventario_General').DataTable({
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
    "ajax" : {

        url: dir + "Clases/fetch_Inventario_General.php",
        type: "POST",
        data:{
          Marca:Marca, Division:Division, Linea:Linea, Sublinea:Sublinea
        }
    }
  });
}


 function fetch_data_Bodega(Marca='', Division='', Linea='',Sublinea='',Bodega=''){

  var dataTable = $('#Table_Inventario_Bodega').DataTable({
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
    "ajax" : {

        url: dir + "Clases/fetch_Inventario_Bodega.php",
        type: "POST",
        data:{
          Marca:Marca, Division:Division, Linea:Linea, Sublinea:Sublinea, Bodega:Bodega
        }
    }
  });
}

function Crear_data_table_Bodega_Detalle()
{
  $('#Table_Inventario_Detalle_Bodega').dataTable({
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
  });
}

function Crear_data_table_Bodega_Detalle_Locacion() {

	$('#Table_Inventario_Detalle_Locacion').dataTable({
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
  });
}

function fetch_data_Bodega_Locacion(Bodega)
{
	var dataTable = $('#Table_Inventario_Locacion').DataTable({
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

        url: dir + "Clases/fetch_Inventario_Bodega_Locacion.php",
        type: "POST",
        data:{
         Bodega:Bodega
        }
    }
  });
}

function fetch_data_Mover(Bodega,Locacion)
{
	var dataTable = $('#Table_Mover_Producto').DataTable({
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

        url: dir + "Clases/fetch_Inventario_Mover.php",
        type: "POST",
        data:{
         Bodega:Bodega, Locacion:Locacion
        }
    }
  });
}


function Cargar_Editar_Detalle()
{
	let Sucursal = $("#Select_Sucursal_Bodega").val();
	var formData = new FormData();
    formData.append("ID", Sucursal);

 $.ajax({
    url: dir + 'index.php/Controller_Inventario/Consultar_Info2',
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

    	$("#Edit_Locacion").empty();

        for (var i = 0; i < parsed['Locacion'].length; i++) 
	    {
	        $("#Edit_Locacion").append("<option value='" + parsed['Locacion'][i]['ID'] + "'>" + parsed['Locacion'][i]['Locacion'] + "</option>");
	    }

	    $("#Edit_Locacion").val(window.Tabla_Detalle_Bodega.childNodes[4].innerHTML);

	    $("#Editar_Detalle_Inventario").modal("show");
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

function Cargar_Info_Locacion()
{
	console.log(window.Tabla_Bodega_Locacion);

	 var formData = new FormData();
    formData.append("ID", window.Tabla_Bodega_Locacion.childNodes[0].innerHTML);

    $.ajax({
        url: dir + 'index.php/Controller_Inventario/Get_Inventario_Bodega_Detalle_Location',
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

            if (parsed != null && parsed != "")
            {
        		let Bodega_Detalle   = document.getElementById("Table_Inventario_Detalle_Locacion"); 
        		let tbody_Detalle    = Bodega_Detalle.tBodies[0];

        		$('#Table_Inventario_Detalle_Locacion').DataTable().destroy();
        		Bodega_Detalle.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed['Detalle'].length; i++) 
	                {

	                 let row  = tbody_Detalle.insertRow(i);
	                 let cel1 = row.insertCell(0);
	                 let cel2 = row.insertCell(1);
	                 let cel3 = row.insertCell(2);
	                 let cel4 = row.insertCell(3);
	                 let cel5 = row.insertCell(4);

	                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
	                 cel2.innerHTML = parsed['Detalle'][i]['Codigo'];
	                 cel3.innerHTML = parsed['Detalle'][i]['Producto'];
	                 cel4.innerHTML = parsed['Detalle'][i]['Fecha_ingreso'];
	                 cel5.innerHTML = parsed['Detalle'][i]['Existencias'];
	                
	                }

	                Crear_data_table_Bodega_Detalle_Locacion();
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

function Cargar_Info()
{
	console.log(window.Tabla_Bodega);
	 var formData = new FormData();
        formData.append("ID", window.Tabla_Bodega.childNodes[0].innerHTML);

        console.log(window.Tabla_Bodega.childNodes[0].innerHTML);

        $.ajax({
            url: dir + 'index.php/Controller_Inventario/Get_Inventario_Bodega_Detalle',
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

	            if (parsed != null && parsed != "")
	            {

	            	let Bodega_Detalle   = document.getElementById("Table_Inventario_Detalle_Bodega"); 
            		let tbody_Detalle    = Bodega_Detalle.tBodies[0];

            		$('#Table_Inventario_Detalle_Bodega').DataTable().destroy();
            		Bodega_Detalle.tBodies[0].innerHTML = "";

            		    for (var i = 0; i < parsed['Detalle'].length; i++) 
		                {

		                 let row  = tbody_Detalle.insertRow(i);
		                 let cel1 = row.insertCell(0);
		                 let cel2 = row.insertCell(1);
		                 let cel3 = row.insertCell(2);
		                 let cel4 = row.insertCell(3);

		                 cel1.innerHTML = parsed['Detalle'][i]['Fecha_compra'];
		                 cel2.innerHTML = parsed['Detalle'][i]['Locacion'];
		                 cel3.innerHTML = parsed['Detalle'][i]['Existencias'];
		                 cel4.innerHTML = parsed['Detalle'][i]['ID'];
		                 cel4.setAttribute("hidden", true);
		                
		                }

		                Crear_data_table_Bodega_Detalle();
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


function Buscar_Locacion_Sucursal(idSucursal)
{
	var formData = new FormData();
        formData.append("idSucursal", idSucursal);

        $.ajax({
            url: dir + 'index.php/Controller_Inventario/GetLocacion',
            type: 'POST',
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            timeout: 0,
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

	            if (parsed != null && parsed != "")
	            {
            		$("#Select_Locacion_Envia").empty();
            		$("#Select_Locacion_Recibe").empty();

            		$("#Select_Locacion_Envia").append("<option value=''>Seleccionar...</option>");
            		$("#Select_Locacion_Recibe").append("<option value=''>Seleccionar...</option>");

			        for (var i = 0; i < parsed['Locacion'].length; i++) 
				    {
				        $("#Select_Locacion_Envia").append("<option value='" + parsed['Locacion'][i]['ID'] + "'>" + parsed['Locacion'][i]['Locacion'] + "</option>");
				        $("#Select_Locacion_Recibe").append("<option value='" + parsed['Locacion'][i]['ID'] + "'>" + parsed['Locacion'][i]['Locacion'] + "</option>");
				    }

	            }

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
		            toastr.info('Por favor, seleccione una Bodega', 'Advertencia');
            }
            })
            .done(function() {
                console.log("success");
            })
             .fail(function(jqXHR, textStatus, errorThrown) {

             if (jqXHR.status === 0)
             {

              console.log('Not connect: Verify Network.');

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