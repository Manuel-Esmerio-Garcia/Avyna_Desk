var dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.Tabla_Extracciones;
window.Tabla_Extracciones_Historial;
window.ID_Bodega;

$(document).ready(function() {

$('.input-daterange').datepicker({
  format: "yyyy-mm-dd",
  autoclose: true
});

$("#exampleFormControlSelect2").change(function(e){

	let Cliente  = $('#exampleFormControlSelect2').val();
	let Inicio   = $("#start_date").val();
	let Fin      = $("#end_date").val();

	if (Cliente != '' && Cliente != '')
	{
		if (Inicio != null && Inicio != "" && Fin != null && Fin != "")
		{
			$('#Table_Historial_Extracciones').DataTable().destroy();
    		fetch_data('yes', Inicio,Fin,Cliente,window.ID_Bodega);
		}
		else
		{
			$('#Table_Historial_Extracciones').DataTable().destroy();
    		fetch_data('no', '','',Cliente,window.ID_Bodega);
		}    	

  	}
  	else
  	{

  		if (Inicio != null && Inicio != "" && Fin != null && Fin != "")
		{
			$('#Table_Historial_Extracciones').DataTable().destroy();
    		fetch_data('yes', Inicio,Fin,'',window.ID_Bodega);
		}
		else
		{
			$('#Table_Historial_Extracciones').DataTable().destroy();
    		fetch_data('no', '','','',window.ID_Bodega);
		}  
  }

});

$("#search").click(function(){

  let start_date = $('#start_date').val();
  let end_date   = $('#end_date').val();
  let Cliente    = $('#exampleFormControlSelect2').val();

  if (start_date != '' && end_date != '')
  {
  	if (Cliente != null && Cliente != "")
  	{
  		$('#Table_Historial_Extracciones').DataTable().destroy();
		fetch_data('yes', start_date, end_date,Cliente,window.ID_Bodega);
  	}
  	else
  	{
  		$('#Table_Historial_Extracciones').DataTable().destroy();
		fetch_data('yes', start_date, end_date,'',window.ID_Bodega);
  	}   

  }else{

  	if (Cliente != null && Cliente != "")
  	{
  		$('#Table_Historial_Extracciones').DataTable().destroy();
		fetch_data('no', '', '',Cliente,window.ID_Bodega);
  	}
  	else
  	{
  		$('#Table_Historial_Extracciones').DataTable().destroy();
		fetch_data('no', '', '','',window.ID_Bodega);
  	}

  }

});

	var Table_Extracciones = document.getElementById("Table_Extracciones");
	Table_Extracciones.onclick = function(e)
	{
		    window.Tabla_Extracciones = e.target.parentNode;

		    var formData = new FormData();
            formData.append("idVenta", window.Tabla_Extracciones.childNodes[0].innerHTML);

            $.ajax({
                url: dir + 'index.php/Controller_Extracciones/Getinfo_Extracciones_Detalle',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 50000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Header').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

		            if (parsed != null && parsed != "")
		            {
                		let Extracciones_Detalle   = document.getElementById("Table_Extracciones_Detalle"); 
                		let tbody_Detalle   	   = Extracciones_Detalle.tBodies[0];

                		$('#Table_Extracciones_Detalle').DataTable().destroy();
                		Extracciones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);
			                 let cel4 = row.insertCell(3);
			                 let cel5 = row.insertCell(4);
			                 let cel6 = row.insertCell(5);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Nombre'];
			                 cel3.innerHTML = parsed['Detalle'][i]['Fecha_venta'];
			                 cel4.innerHTML = parsed['Detalle'][i]['Total'];
			                 cel5.innerHTML = parsed['Detalle'][i]['Total_desc'];
			                 cel6.innerHTML = parsed['Detalle'][i]['Extraido'];
			                
			                }

			                Crear_data_table_Extracciones_Detalle();
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


	var Table_Extracciones_Historial = document.getElementById("Table_Historial_Extracciones");
	Table_Extracciones_Historial.onclick = function(e)
	{
		    window.Tabla_Extracciones_Historial = e.target.parentNode;

		    var formData = new FormData();
            formData.append("idVenta", window.Tabla_Extracciones_Historial.childNodes[0].innerHTML);

            $.ajax({
                url: dir + 'index.php/Controller_Extracciones/Getinfo_Extracciones_Detalle',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 50000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Header').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

		            if (parsed != null && parsed != "")
		            {
                		let Extracciones_Detalle   = document.getElementById("Table_Extracciones_Historial_Detalle"); 
                		let tbody_Detalle   	   = Extracciones_Detalle.tBodies[0];

                		$('#Table_Extracciones_Historial_Detalle').DataTable().destroy();
                		Extracciones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);
			                 let cel4 = row.insertCell(3);
			                 let cel5 = row.insertCell(4);
			                 let cel6 = row.insertCell(5);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Nombre'];
			                 cel3.innerHTML = parsed['Detalle'][i]['Fecha_venta'];
			                 cel4.innerHTML = parsed['Detalle'][i]['Total'];
			                 cel5.innerHTML = parsed['Detalle'][i]['Total_desc'];
			                 cel6.innerHTML = parsed['Detalle'][i]['Extraido'];
			                
			                }

			                Crear_data_table_Extracciones_Historial_Detalle();
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


$("#btn_Refresh1").click(function(event)
{
	Refrescar_Informacion();
});



$("#btn_Refresh").click(function(event)
{
	Refrescar_Informacion();
});


	$("#Realizar_Extraccion").click(function(event)
	{
		let Contador = 0;

		let Bodega = $("#select_Bodega").val();

		if (Bodega != null && Bodega != "")
		{
			if (window.Tabla_Extracciones != null && window.Tabla_Extracciones != "")
			{

				swal({
					  title: "¿Esta seguro que desea realizar la extracción?",
					  text: "Una vez realizada la extracción se descontaran las existencias del inventario",
					  icon: "warning",
					  buttons: true,
					  dangerMode: true,
					})
					.then((willDelete) => {
					  if (willDelete) {

					    	var formData = new FormData();
				            formData.append("idVenta", window.Tabla_Extracciones.childNodes[0].innerHTML);
				            formData.append("idSucursal", Bodega);

				            $.ajax({
				                url: dir + 'index.php/Controller_Extracciones/existDetailSellTemp',
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
				                	console.log(data);

				                	if (!isNaN(data))
				                	{
				                		if (data == 9999)
				                		{
				                			toastr.options = 
				                			{
						                			"closeButton": true,
			                                        "debug": false,
			                                        "newestOnTop": true,
			                                        "progressBar": true,
			                                        "positionClass": "toast-top-right",
			                                        "preventDuplicates": true,
			                                        "onclick": null,
			                                        "showDuration": "300",
			                                        "hideDuration": "1000",
			                                        "timeOut": "850",
			                                        "extendedTimeOut": "1000",
			                                        "showEasing": "swing",
			                                        "hideEasing": "linear",
			                                        "showMethod": "fadeIn",
			                                        "hideMethod": "fadeOut",
			                                        "onHidden": function(){ Refrescar_Informacion(); Imprimir_Nota_Venta(window.Tabla_Extracciones.childNodes[0].innerHTML); Imprimir_Nota_Venta_menudeo(window.Tabla_Extracciones.childNodes[0].innerHTML);}
			                                }

	                                        toastr.success('Extración generada con exito','Correcto');
				                		}
				                		else if (data == 01)
				                		{
				                			swal("Error", "La extraccion no se puede realizar debido a que no hay detalle de la venta menudeo", "error");
				                		}

				                		else if (data == 8888)
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
						                        toastr.error('Ocurrio un error al generar la extracción por favor intente nuevamente', 'Correcto');
				                		}
				                		else if (data == 7777)
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
						                        toastr.error('Ocurrio un error al generar la extracción por favor intente nuevamente [Al regresar las existencias al inventario]', 'Error');
				                		}
				                		else if (data == 6666)
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
					                        toastr.error('Ocurrio un error al generar la extracción por favor intente nuevamente [La extracción no cuenta con movimientos de la tabla Detalle_Venta_Menudeo_Temp]', 'Error');
				                		}
				                		else if (data == 88881)
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
						                        toastr.error('Ocurrio un error al generar la extracción por favor intente nuevamente (Detalle Venta Menudeo Temp)', 'Correcto');
				                		}
				                		else if (data == 77771)
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
						                        toastr.error('Ocurrio un error al generar la extracción por favor intente nuevamente [Al regresar las existencias al inventario] (Detalle Venta Menudeo Temp)', 'Error');
				                		}
				                		else if (data == 66661)
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
					                        toastr.error('Ocurrio un error al generar la extracción por favor intente nuevamente [La extracción no cuenta con movimientos de la tabla Detalle_Venta_Menudeo_Temp] (Detalle Venta Menudeo Temp)', 'Error');
				                		}
				                		else if (data == 5555)
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
					                        toastr.error('Error Provocado', 'Error');
				                		}
				                		else if (data == 02)
				                		{
				                			swal("Error", "Al realizar el descuento de las existencias de la extracción", "error");
				                		}
				                		else if (data == 0)
				                		{
				                			swal("Diferencia de Importes", "Existe una diferencia en los importes de " + data, "info");
				                		}
				                		else
				                		{
				                			swal("Diferencia de Importes", data, "info");
				                		}
				                	}
				                	else
				                	{
				                		try {

					                		let Nombre_Productos = "";
					                		let parseJson = JSON.parse(data);

				                		if (typeof parseJson['Producto1'] != "undefined")
				                		{
				                			if (Object.keys(parseJson['Producto1']).length === 0)
					                		{

					                		}
					                		else
					                		{
					                			for (var i = 0; i < parseJson['Producto1'].length; i++)
						                		{
						                			Nombre_Productos = Nombre_Productos + parseJson['Producto1'][i] + "\n";
						                		}

						                		swal("Productos sin Pedimentos registrados del producto:", Nombre_Productos, "info");
					                		}

				                		}
				                		else if (typeof parseJson['Producto'] != "undefined")
				                		{
				                			if (Object.keys(parseJson['Producto']).length === 0)
					                		{

					                		}
					                		else
					                		{
					                			for (var i = 0; i < parseJson['Producto'].length; i++)
						                		{
						                			Nombre_Productos = Nombre_Productos + parseJson['Producto'][i] + "\n";
						                		}

						                		swal("Productos sin existencias suficientes", Nombre_Productos, "info");
					                		}

				                		}
				                		/// Continuar Validando

				                		}
										catch (error) {

											swal("Diferencia de Importes", data, "info");
										}

				                	}
				                }

					            })
					            .done(function() {
					                
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
                        toastr.warning('Por favor, seleccione una venta', 'Advertencia');
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
                        toastr.warning('Por favor, Seleccione una Bodega', 'Advertencia');
		}

	});

	$("#select_Bodega").change(function(event)
	{
		let Bodega = $("#select_Bodega").val();

		if (Bodega != null && Bodega != "")
		{
			window.ID_Bodega = Bodega;

			var formData = new FormData();
            formData.append("idSucursal", Bodega);

            $.ajax({
                url: dir + 'index.php/Controller_Extracciones/Getinfo_Extracciones',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 50000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Header').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

		            if (parsed != null && parsed != "")
		            {
		            	let Extracciones_Detalle    = document.getElementById("Table_Extracciones_Detalle"); 
                		let tbody_Detalle 			= Extracciones_Detalle.tBodies[0];

                		let Extracciones_Historial_Detalle    = document.getElementById("Table_Extracciones_Historial_Detalle"); 
                		let tbody_Historial_Detalle 		  = Extracciones_Historial_Detalle.tBodies[0];

                		$('#Table_Extracciones_Detalle').DataTable().destroy();
                		Extracciones_Detalle.tBodies[0].innerHTML = "";

                		$('#Table_Extracciones_Historial_Detalle').DataTable().destroy();
                		Extracciones_Historial_Detalle.tBodies[0].innerHTML = "";

		            	let Extracciones    = document.getElementById("Table_Extracciones"); 
                		let tbody 			= Extracciones.tBodies[0];

                		$('#Table_Extracciones').DataTable().destroy();
                		Extracciones.tBodies[0].innerHTML = "";

                		let Extracciones_Historial    = document.getElementById("Table_Historial_Extracciones"); 
                		let tbody_Historial 		  = Extracciones_Historial.tBodies[0];

                		$('#Table_Historial_Extracciones').DataTable().destroy();
                		Extracciones_Historial.tBodies[0].innerHTML = "";

						  let start_date = $('#start_date').val();
						  let end_date   = $('#end_date').val();
						  let Cliente    = $('#exampleFormControlSelect2').val();


                		    for (var i = 0; i < parsed['Extracciones'].length; i++) 
			                {

			                 let row  = tbody.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);
			                 let cel4 = row.insertCell(3);
			                 let cel5 = row.insertCell(4);
			                 let cel6 = row.insertCell(5);
			                 let cel7 = row.insertCell(6);

			                 cel1.innerHTML = parsed['Extracciones'][i]['ID'];
			                 cel2.innerHTML = parsed['Extracciones'][i]['Fecha_venta'];
			                 cel3.innerHTML = parsed['Extracciones'][i]['Nombre'];
			                 cel4.innerHTML = parsed['Extracciones'][i]['Apellidos'];
			                 cel5.innerHTML = parsed['Extracciones'][i]['Pedidos'];
			                 cel6.innerHTML = parsed['Extracciones'][i]['Total'];

			                 if (parseFloat(parsed['Extracciones'][i]['Adeudo']) <= 10){
			                 	cel7.innerHTML = "<label class='badge badge-success'>" + parsed['Extracciones'][i]['Adeudo'] + "</label>";
			                 }
			                 else{
			                 	cel7.innerHTML = "<label class='badge badge-danger'>" + parsed['Extracciones'][i]['Adeudo'] + "</label>";
			                 }
			                 
			                
			                }

			                Crear_data_table_Extracciones();

			                if (start_date != null && start_date != "" && end_date != null && end_date != "")
			                {
			                	fetch_data('yes',start_date,end_date,Cliente,window.ID_Bodega);
			                }
			                else
			                {
			                	fetch_data('no','','',Cliente,window.ID_Bodega);
			                }

			                

			                /*for (var i = 0; i < parsed['Historial'].length; i++) 
			                {

			                 let row  = tbody_Historial.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);
			                 let cel4 = row.insertCell(3);
			                 let cel5 = row.insertCell(4);
			                 let cel6 = row.insertCell(5);

			                 cel1.innerHTML = parsed['Historial'][i]['ID'];
			                 cel2.innerHTML = parsed['Historial'][i]['Fecha_venta'];
			                 cel3.innerHTML = parsed['Historial'][i]['Nombre'];
			                 cel4.innerHTML = parsed['Historial'][i]['Apellidos'];
			                 cel5.innerHTML = parsed['Historial'][i]['Pedidos'];
			                 cel6.innerHTML = parsed['Historial'][i]['Total'];
			                
			                }*/

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


$("#Eliminar_Extraccion").click(function(event) {
	
	if (window.Tabla_Extracciones_Historial != null && window.Tabla_Extracciones_Historial != "")
	{
		swal({
		  title: "¿Esta seguro que desea eliminar la extracción N° " + window.Tabla_Extracciones_Historial.childNodes[0].innerHTML + "?",
		  text: "Una vez eliminado las existencias de la extracción volveran al inventario",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {

		  	var formData = new FormData();
            formData.append("idVenta", window.Tabla_Extracciones_Historial.childNodes[0].innerHTML);

            $.ajax({
                url: dir + 'index.php/Controller_Extracciones/Eliminar_Extraccion',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 500000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Header').css('display','');
                },
                success: function(data)
                {
                   switch (data.trim())
                   {
                   	case '001':
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
                        toastr.error('No se encontro el la venta seleccionada', 'Error');
                   	break;

                   	case '002':
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
                        toastr.error('La extracción no cuenta con movimientos de la tabla Detalle_Venta_Menudeo_Temp', 'Error');
                   	break;

                   	case '003':
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
                        toastr.error('Al regresar las existencias al inventario', 'Error');
                   	break;

                   	case '9999':
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
                        toastr.success('Extracción eliminada con exito', 'Correcto');
                   	break;
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
                        toastr.warning('Por favor, Seleccione una venta', 'Advertencia');
	}
});


$("#Imprimir_Nota_Extracción").click(function(event) {

	if (window.Tabla_Extracciones_Historial != null && window.Tabla_Extracciones_Historial != "")
	{
		Imprimir_Nota_Venta(window.Tabla_Extracciones_Historial.childNodes[0].innerHTML);
		Imprimir_Nota_Venta_menudeo(window.Tabla_Extracciones_Historial.childNodes[0].innerHTML);
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
                        toastr.warning('Por favor, Seleccione una venta', 'Advertencia');
	}
});



});


function Crear_data_table_Extracciones()
{
  $('#Table_Extracciones').dataTable({
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


function Crear_data_table_Extracciones_Detalle()
{
  $('#Table_Extracciones_Detalle').dataTable({
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

function Crear_data_table_Extracciones_Historial_Detalle()
{
  $('#Table_Extracciones_Historial_Detalle').dataTable({
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



     function fetch_data(is_date_search, start_date='', end_date='', Cliente='',idBodega= window.ID_Bodega){

      var dataTable = $('#Table_Historial_Extracciones').DataTable({
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
        /*"columnDefs": [
                {
                    "targets": 7,
                    'render': function (data, type, full, meta)
                    {
                        if (full[7] == 'Cancelado')
                        {
                        	return "<label class='label label-danger'>Cancelado</label>"
                        }
                        else
                        {
                        	return "<label class='label label-success'>Pagado</label>"
                        }

                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                },

            ],*/
            
        "order" : [],
        "ajax" : {

            url: dir + "Clases/fetch_Extracciones_Historial.php",
            type: "POST",
            data:{
              is_date_search:is_date_search, start_date:start_date, end_date:end_date, Cliente:Cliente, idBodega:idBodega
            }
        }
      });
    }

    function Imprimir_Nota_Venta(id) {
    	window.open("http://integrattodev.cloudapp.net/Avyna_Notas_de_Venta/Notas_de_Venta/Notas_ventas_distribuidor.php?idVenta=" + id + "");
    }

    function Imprimir_Nota_Venta_menudeo(id) {
    	window.open("http://integrattodev.cloudapp.net/Avyna_Notas_de_Venta/Notas_de_Venta/Notas_venta_menudeo.php?idVenta=" + id + "");
    }

    function Refrescar_Informacion()
    {
    	let Bodega = $("#select_Bodega").val();

		if (Bodega != null && Bodega != "")
		{
			window.ID_Bodega = Bodega;

			var formData = new FormData();
	        formData.append("idSucursal", Bodega);

	        $.ajax({
	            url: dir + 'index.php/Controller_Extracciones/Getinfo_Extracciones',
	            type: 'POST',
	            processData: false,  // tell jQuery not to process the data
	            contentType: false,
	            timeout: 50000,
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

		            if (parsed != null && parsed != "")
		            {
		            	let Extracciones_Detalle    = document.getElementById("Table_Extracciones_Detalle"); 
	            		let tbody_Detalle 			= Extracciones_Detalle.tBodies[0];

	            		let Extracciones_Historial_Detalle    = document.getElementById("Table_Extracciones_Historial_Detalle"); 
	            		let tbody_Historial_Detalle 		  = Extracciones_Historial_Detalle.tBodies[0];

	            		$('#Table_Extracciones_Detalle').DataTable().destroy();
	            		Extracciones_Detalle.tBodies[0].innerHTML = "";

	            		$('#Table_Extracciones_Historial_Detalle').DataTable().destroy();
	            		Extracciones_Historial_Detalle.tBodies[0].innerHTML = "";

		            	let Extracciones    = document.getElementById("Table_Extracciones"); 
	            		let tbody 			= Extracciones.tBodies[0];

	            		$('#Table_Extracciones').DataTable().destroy();
	            		Extracciones.tBodies[0].innerHTML = "";

	            		let Extracciones_Historial    = document.getElementById("Table_Historial_Extracciones"); 
	            		let tbody_Historial 		  = Extracciones_Historial.tBodies[0];

	            		$('#Table_Historial_Extracciones').DataTable().destroy();
	            		Extracciones_Historial.tBodies[0].innerHTML = "";

						  let start_date = $('#start_date').val();
						  let end_date   = $('#end_date').val();
						  let Cliente    = $('#exampleFormControlSelect2').val();


	            		    for (var i = 0; i < parsed['Extracciones'].length; i++) 
			                {

			                 let row  = tbody.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);
			                 let cel4 = row.insertCell(3);
			                 let cel5 = row.insertCell(4);
							 let cel6 = row.insertCell(5);
							 let cel7 = row.insertCell(6);

			                 cel1.innerHTML = parsed['Extracciones'][i]['ID'];
			                 cel2.innerHTML = parsed['Extracciones'][i]['Fecha_venta'];
			                 cel3.innerHTML = parsed['Extracciones'][i]['Nombre'];
			                 cel4.innerHTML = parsed['Extracciones'][i]['Apellidos'];
			                 cel5.innerHTML = parsed['Extracciones'][i]['Pedidos'];
							 cel6.innerHTML = parsed['Extracciones'][i]['Total'];
							 cel7.innerHTML = parsed['Extracciones'][i]['Adeudo'];
			                
			                }

			                Crear_data_table_Extracciones();

			                if (start_date != null && start_date != "" && end_date != null && end_date != "")
			                {
			                	fetch_data('yes',start_date,end_date,Cliente,window.ID_Bodega);
			                }
			                else
			                {
			                	fetch_data('no','','',Cliente,window.ID_Bodega);
			                }

			                

			                /*for (var i = 0; i < parsed['Historial'].length; i++) 
			                {

			                 let row  = tbody_Historial.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);
			                 let cel4 = row.insertCell(3);
			                 let cel5 = row.insertCell(4);
			                 let cel6 = row.insertCell(5);

			                 cel1.innerHTML = parsed['Historial'][i]['ID'];
			                 cel2.innerHTML = parsed['Historial'][i]['Fecha_venta'];
			                 cel3.innerHTML = parsed['Historial'][i]['Nombre'];
			                 cel4.innerHTML = parsed['Historial'][i]['Apellidos'];
			                 cel5.innerHTML = parsed['Historial'][i]['Pedidos'];
			                 cel6.innerHTML = parsed['Historial'][i]['Total'];
			                
			                }*/

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