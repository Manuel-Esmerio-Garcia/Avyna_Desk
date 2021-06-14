window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.Tabla_Compras = null;
window.Impue    = null;

$(document).ready(function(){ 

	fetch_data_Compra();

	GetCatalogo();

	window.Obtener_Cantidad = function(event)
	{
		$("#div_Total_Compra").css('display','none');
		$("#Calcular_Total").css('display','');

	    let row = this.parentNode.parentNode;

		if (this.value != null && this.value != "")
		{
			if (row.childNodes[4].childNodes[0].value != null && row.childNodes[4].childNodes[0].value != "")
			{
				let Importe = parseInt(this.value) * parseInt(row.childNodes[4].childNodes[0].value);
				row.childNodes[5].childNodes[0].value = Importe;

				//Get_Cantidad_Existencias();
			}
		}
		else
		{
			this.value = 0;
		}
	};

	window.Obtener_Cantidad_Costo = function(event)
	{
		$("#div_Total_Compra").css('display','none');
		$("#Calcular_Total").css('display','');

	    let row = this.parentNode.parentNode;

		if (this.value != null && this.value != "")
		{
			if (row.childNodes[3].childNodes[0].value != null && row.childNodes[3].childNodes[0].value != "")
			{
				let Importe = parseInt(this.value) * parseInt(row.childNodes[3].childNodes[0].value);
				row.childNodes[5].childNodes[0].value = Importe;

				//Get_Cantidad_Existencias();
			}
		}
		else
		{
			this.value = 0;
		}
	};

	$("#select_Bodega").click(function(event) {
		
		$("#div_Total_Compra").css('display','none');
		$("#Calcular_Total").css('display','');

	});

	$("#Aceptar_Compra").click(function(event) {
		
		let Bodega    = $("#select_Bodega").val();
		let Proveedor = $("#select_Proveedor").val();
		let Subtotal  = parseFloat($("#Subtotal_Compra").text()).toFixed(2);
		let Impuesto  = parseFloat($("#Impuesto_Compra").text()).toFixed(2);
		let Total 	  = parseFloat($("#Total_Compra").text()).toFixed(2);
		let Codigo    = $("#txt_Codigo_Compra").val();

		if (Bodega != null && Bodega != "" && Proveedor != null && Proveedor != "" && Codigo != null && Codigo != "")
		{
			if (Total > 0)
			{

				$('#Table_Nueva_Compras').DataTable().destroy();

				//Tabla de Servicio Ventas //
			    let Tabla_Productos          = document.getElementById("Table_Nueva_Compras");
			    let Tbody_Productos          = Tabla_Productos.getElementsByTagName("tbody")[0];

			    let idCatalogo = new Array();
		    	let Cantidad   = new Array();
		    	let Costo      = new Array();
		        let Importe    = new Array();

		        for (var i = 0; i < Tbody_Productos.rows.length; i++)
		        {
		        	if ($("#txtImporte" + i).val() != 0)
		        	{
			        	idCatalogo.push(Tbody_Productos.rows[i].cells[0].innerHTML);
			        	Cantidad.push($("#txtCantidad" + i).val());
			        	Costo.push($("#txtCosto" + i).val());
			        	Importe.push($("#txtImporte" + i).val());
			        }
		        }

		        GetCatalogo();

				var formData = new FormData();
				formData.append("idSucursal", Bodega);
				formData.append("idProveedor", Proveedor);
				formData.append("Subtotal", Subtotal);
				formData.append("Impuesto", Impuesto);
				formData.append("Total", Total);
				formData.append("Codigo", Codigo);

				formData.append("idCatalogo", idCatalogo);
				formData.append("Cantidad", Cantidad);
				formData.append("Costo", Costo);
				formData.append("Importe", Importe);

				$.ajax({
		            url: dir + 'index.php/Controller_Compras/Add_Compra',
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
		                if (data == 1)
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

					            $("#select_Proveedor").val("");
					            $("#select_Bodega").val("");
					            $("#txt_Codigo_Compra").val("");

					            $("#Subtotal_Compra").text(0.00);
					            $("#Impuesto_Compra").text(0.00);
					            $("#Total_Compra").text(0.00);

					            $("#div_Total_Compra").css('display','none');
								$("#Calcular_Total").css('display','');
					            // Display an error toast, with a title
					            toastr.success('Compra agregada con exito', 'Correcto');

					            let Compras   = document.getElementById("Table_Compras"); 
			            		$('#Table_Compras').DataTable().destroy();
			            		Compras.tBodies[0].innerHTML = "";


			            		let Compras_Detalle   = document.getElementById("Table_Detalle_Compras"); 
			            		$('#Table_Detalle_Compras').DataTable().destroy();
			            		Compras_Detalle.tBodies[0].innerHTML = "";

			            		window.Tabla_Compras = null;

			            		fetch_data_Compra();
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
					            toastr.error('Ocurrio un error al crear la compra', 'Error');
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
		            toastr.warning('El total de la compra debe ser mayor a 0', 'Advertencia');
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
            toastr.warning('Seleccione un proveedor, una bodega y el codigo de la compra para continuar con la compra', 'Advertencia');
		}
	});


	$("#Calcular_Total").click(function(event) {

		let Bodega = $("#select_Bodega").val();

		if (Bodega != null && Bodega != "")
		{

			var formData = new FormData();
			formData.append("idBodega", Bodega);

			$.ajax({
	            url: dir + 'index.php/Controller_Compras/Get_Bodega',
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

	                window.Impue = parseFloat(parsed['Bodega'][0]['Impuesto']) + 1;  

	                Get_Cantidad_Existencias(window.Impue);

					$("#div_Total_Compra").css('display','');
					$("#Calcular_Total").css('display','none');
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
            toastr.warning('seleccione una bodega', 'Advertencia');
		}
		
		/*Get_Cantidad_Existencias();

		$("#Cargando_Header").css('display','');

		setTimeout(function()
		{ 
			$("#Cargando_Header").css('display','none'); 
			$("#div_Total_Compra").css('display','');
			$("#Calcular_Total").css('display','none');
 		}, 3000);*/
	});


	$("#Agregar_Inventario").click(function(event) {

		console.log(window.Tabla_Compras.childNodes[8].childNodes[0].innerHTML);

		if (window.Tabla_Compras != null && window.Tabla_Compras != "")
		{
			if (window.Tabla_Compras.childNodes[8].childNodes[0].innerHTML != 'Recibido')
			{
					swal({
					  title: "Esta segúro que desea agregar al inventario?",
					  text: "Una vez agregado al inventario cambiara de estatus a recibido",
					  icon: "warning",
					  buttons: true,
					  dangerMode: true,
					})
					.then((willDelete) => {
					  if (willDelete) {

					  		$('#Table_Detalle_Compras').DataTable().destroy();

					  	    let idCatalogo  = new Array();
					  	    let Cantidad	= new Array();
					  	    let idSucursal	= new Array();
					  	    let Precio	    = new Array();
					  	    let idLocacion  = new Array();

					  	    //Tabla de Productos Ventas //
						    let Tabla_Productos         = document.getElementById("Table_Detalle_Compras");
						    let Tbody_Productos         = Tabla_Productos.getElementsByTagName("tbody")[0];

						    for (var i = 0; i < Tbody_Productos.rows.length; i++)
            				{
            					idCatalogo.push(Tbody_Productos.rows[i].cells[6].innerHTML);
            					Cantidad.push(Tbody_Productos.rows[i].cells[3].innerHTML);
            					idSucursal.push(Tbody_Productos.rows[i].cells[7].innerHTML);
            					Precio.push(Tbody_Productos.rows[i].cells[4].innerHTML);
            					idLocacion.push(Tbody_Productos.rows[i].cells[8].innerHTML);
            				}

            				Crear_data_table_Compras_Detalle();
					    
					    	var formData = new FormData();
					        formData.append("ID", window.Tabla_Compras.childNodes[0].innerHTML);
					        formData.append("Fecha_Compra", window.Tabla_Compras.childNodes[2].innerHTML);
					        formData.append("idCatalogo", idCatalogo);
					        formData.append("Cantidad", Cantidad);
					        formData.append("idSucursal", idSucursal);
					        formData.append("Precio", Precio);
					        formData.append("idLocacion", idLocacion);


					        $.ajax({
					            url: dir + 'index.php/Controller_Compras/Agregar_Inventario',
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
								            toastr.success('Compra agregada con exito al inventario', 'Correcto');

								            let Compras   = document.getElementById("Table_Compras"); 
						            		$('#Table_Compras').DataTable().destroy();
						            		Compras.tBodies[0].innerHTML = "";


						            		let Compras_Detalle   = document.getElementById("Table_Detalle_Compras"); 
						            		$('#Table_Detalle_Compras').DataTable().destroy();
						            		Compras_Detalle.tBodies[0].innerHTML = "";

						            		window.Tabla_Compras = null;

						            		fetch_data_Compra();
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
								            toastr.error('Ocurrio un error al agregar la compra al inventario', 'Error');
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
		            toastr.warning('No es posible agregar la compra por que ya se encuentra como recibido', 'Advertencia');
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
            toastr.warning('Por favor, Seleccione una compra', 'Advertencia');
		}
		
	});

	$("#Eliminar_Compras").click(function(event) {
		
		if (window.Tabla_Compras != null && window.Tabla_Compras != "")
		{
			if (window.Tabla_Compras.childNodes[8].childNodes[0].innerHTML == 'Pendiente')
			{

				swal({
					  title: "¿Esta segúro que desea eliminar la compra?",
					  text: "Una vez eliminada la compra no sera posible recuperarla",
					  icon: "warning",
					  buttons: true,
					  dangerMode: true,
					})
					.then((willDelete) => {
					  if (willDelete) 
					  {
						  	var formData = new FormData();
					        formData.append("ID", window.Tabla_Compras.childNodes[0].innerHTML);

					        $.ajax({
					            url: dir + 'index.php/Controller_Compras/Delete_Compra',
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
					                if (data == 'Correcto')
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
								            toastr.success('Compra eliminada con exito', 'Correcto');

								                let Compras   = document.getElementById("Table_Compras"); 
							            		$('#Table_Compras').DataTable().destroy();
							            		Compras.tBodies[0].innerHTML = "";


							            		let Compras_Detalle   = document.getElementById("Table_Detalle_Compras"); 
							            		$('#Table_Detalle_Compras').DataTable().destroy();
							            		Compras_Detalle.tBodies[0].innerHTML = "";

							            		window.Tabla_Compras = null;

							            		fetch_data_Compra();
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
								            toastr.error('Ocurrio un problema al eliminar la compra', 'Error');
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
		            toastr.warning('No es posible eliminar la compra por que ya se encuentra como recibido', 'Advertencia');
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
            toastr.warning('Por favor, Seleccione una compra', 'Advertencia');
		}
	});

	var Table_Compras = document.getElementById("Table_Compras");
	Table_Compras.onclick = function(e)
	{
	    window.Tabla_Compras = e.target.parentNode;

	    var formData = new FormData();
        formData.append("ID", window.Tabla_Compras.childNodes[0].innerHTML);

        $.ajax({
            url: dir + 'index.php/Controller_Compras/Get_Detalle_Compra',
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
            		let Compras_Detalle   = document.getElementById("Table_Detalle_Compras"); 
            		let tbody_Detalle   	   = Compras_Detalle.tBodies[0];

            		$('#Table_Detalle_Compras').DataTable().destroy();
            		Compras_Detalle.tBodies[0].innerHTML = "";

            		    for (var i = 0; i < parsed['Detalle'].length; i++) 
		                {

		                 let row  = tbody_Detalle.insertRow(i);
		                 let cel1 = row.insertCell(0);
		                 let cel2 = row.insertCell(1);
		                 let cel3 = row.insertCell(2);
		                 let cel4 = row.insertCell(3);
		                 let cel5 = row.insertCell(4);
		                 let cel6 = row.insertCell(5);
		                 let cel7 = row.insertCell(6);
		                 let cel8 = row.insertCell(7);
		                 let cel9 = row.insertCell(8);

		                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
		                 cel2.innerHTML = parsed['Detalle'][i]['Codigo'];
		                 cel3.innerHTML = parsed['Detalle'][i]['Producto'];
		                 cel4.innerHTML = parsed['Detalle'][i]['Cantidad'];
		                 cel5.innerHTML = parsed['Detalle'][i]['Costo_unitario'];
		                 cel6.innerHTML = parsed['Detalle'][i]['Importe'];
		                 cel7.innerHTML = parsed['Detalle'][i]['idCatalogo'];
		                 cel7.setAttribute("hidden", true);
		                 cel8.innerHTML = parsed['Detalle'][i]['idSucursal'];
		                 cel8.setAttribute("hidden", true);
		                 cel9.innerHTML = parsed['Detalle'][i]['idLocacion'];
		                 cel9.setAttribute("hidden", true);
		                
		                }

		                Crear_data_table_Compras_Detalle();
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

function Crear_data_table_Compras_Detalle()
{
  $('#Table_Detalle_Compras').dataTable({
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


 function fetch_data_Compra(){

  var dataTable = $('#Table_Compras').DataTable({
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
                    "targets": 8,
                    'render': function (data, type, full, meta)
                    {
                        if (full[8] == 'Recibido')
                        {
                        	return "<label class='label label-success'>Recibido</label>"
                        }
                        else
                        {
                        	return "<label class='label label-warning'>Pendiente</label>"
                        }

                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                },

            ],     
    "order" : [],
    "ajax" : {

        url: dir + "Clases/fetch_Compras.php",
        type: "POST"
    }
  });
}


 function fetch_data_Nueva_Compra(){

  var dataTable = $('#Table_Nueva_Compras').DataTable({
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
                        return  "<input type='number' class='form-control' value='0' min='0' onkeyup='" + window.Obtener_Importe +"'>"
                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                },

                {
                    "targets": 4,
                    'render': function (data, type, full, meta)
                    {
                        return  "<input type='number' class='form-control' value='0' min='0'>"
                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                },

                {
                    "targets": 5,
                    'render': function (data, type, full, meta)
                    {
                        return  "<input type='number' class='form-control' value='0' min='0' readonly>"
                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                },

            ],     
    "order" : [],
    "ajax" : {

        url: dir + "Clases/fetch_Nuevo_Compra.php",
        type: "POST"
    }
  });
}

function GetCatalogo()
{
	var formData = new FormData();

	$.ajax({
		url: window.dir + 'index.php/Controller_Compras/Get_Catalogo',
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

        		let Productos       = document.getElementById("Table_Nueva_Compras"); 
    			let tbody = Productos.tBodies[0];
    			
    			$('#Table_Nueva_Compras').DataTable().destroy();

    			Productos.tBodies[0].innerHTML = "";

    			  for (var i = 0; i <= parsed['Catalogo'].length -1; i++) 
		          {

		                   let row  = tbody.insertRow(i);
		                   let cel1 = row.insertCell(0);
		                   let cel2 = row.insertCell(1);
		                   let cel3 = row.insertCell(2);
		                   let cel4 = row.insertCell(3);
		                   let cel5 = row.insertCell(4);
		                   let cel6 = row.insertCell(5);

		                   cel1.innerHTML = parsed['Catalogo'][i]['ID'];
		                   cel2.innerHTML = parsed['Catalogo'][i]['Codigo'];
		                   cel3.innerHTML = parsed['Catalogo'][i]['Producto'];

		                    let input = document.createElement("input");
		    		        input.classList.add('form-control');
		    		        input.setAttribute('type', 'number');
		    		        input.setAttribute('value', '0');
		    		        input.setAttribute('min', '0');
		    		        input.setAttribute('id', 'txtCantidad' + i);
		    		        input.addEventListener("keyup",window.Obtener_Cantidad);
		    		        cel4.appendChild(input);

			                let input2 = document.createElement("input");
			                input2.classList.add('form-control');
			                input2.setAttribute('type', 'number');
			                input2.setAttribute('value', '0');
			                input2.setAttribute('min', '0');
			                input2.setAttribute('id', 'txtCosto' + i);
			                input2.addEventListener("keyup",window.Obtener_Cantidad_Costo);
			                cel5.appendChild(input2);


			                let input3 = document.createElement("input");
			                input3.classList.add('form-control');
			                input3.setAttribute('type', 'number');
			                input3.setAttribute('value', '0');
			                input3.setAttribute('min', '0');
			                input3.setAttribute('id', 'txtImporte' + i);
			                input3.setAttribute('readonly', 'readonly');
			                cel6.appendChild(input3);
 
		          }

             GetDatatable_Catalogo();
        }
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		$('#Cargando_Header').css('display','none');
	});
	
}


function GetDatatable_Catalogo()
{
	$('#Table_Nueva_Compras').DataTable({
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

function Get_Cantidad_Existencias(iva)
{
	let Total_Existencias 	= 0;
   $('#Table_Nueva_Compras').DataTable().destroy();
	let tbody = document.querySelector("#Table_Nueva_Compras").tBodies[0];

	for (var i = 0; i < tbody.rows.length; i++)
	{
		console.log($("#txtImporte" + i).val());

		if ($("#txtImporte" + i).val() != 0)
		{
			Total_Existencias += parseInt($("#txtImporte" + i).val());
		}
		else
		{
			Total_Existencias += parseInt(0);
		}
	}

	console.log(iva);

	let Subtotal = parseFloat(Total_Existencias / iva).toFixed(2);
	let Impuesto = parseFloat(Total_Existencias - Subtotal).toFixed(2);

	$("#Total_Compra").text(parseFloat(Total_Existencias).toFixed(2));
	$("#Subtotal_Compra").text(parseFloat(Subtotal).toFixed(2));
	$("#Impuesto_Compra").text(parseFloat(Impuesto).toFixed(2));

	GetDatatable_Catalogo();

}