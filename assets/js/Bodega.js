var dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.Global_Tabla_Bodega = null;
window.Global_Tabla_Locacion = null;
window.Global_Tabla_Bodega_Producto = null;

$(document).ready(function(){

console.log("Ready");

	fetch_data();

	$("#Option_Agregar_Bodega").click(function(event) {
		/* Act on the event */
		$("#myModal_Guardar").modal("show");
	});

	$("#Agregar_Bodega").click(function(event) {
		/* Act on the event */
		$("#myModal_Guardar").modal("show");
	});

	$("#Option_Editar_Bodega").click(function(event) {
		/* Act on the event */

		funtion_Editar();
	});

	$("#Editar_Bodega").click(function(event) {
		/* Act on the event */

		funtion_Editar();
	});

	$("#Option_Eliminar_Bodega").click(function(event) {
		/* Act on the event */
		funtion_Eliminar();
	});

	$("#Eliminar_Bodega").click(function(event) {
		/* Act on the event */
		funtion_Eliminar();
	});

	$("#Ver_Locaciones").click(function(event) {
		/* Act on the event */
		funtion_Locaciones();
	});

	$("#btn_Guardar_Bodega").click(function(event) {
		/* Act on the event */

		let idNetsuite 			= $("#txtIdNetsuite").val();
		let Nombre 				= $("#txtNombre").val();
		let Encargado 			= $("#txt_Encargado").val();
		let Calle 				= $("#txtCalle").val();
		let Colonia 			= $("#txtColonia").val();
		let Municipio 			= $("#txtMunicipio").val();
		let Estado 				= $("#txtEstado").val();
		let Pais 				= $("#txtPais").val();
		let CP 					= $("#txtCP").val();
		let Tel1 				= $("#txtTel1").val();
		let Tel2 				= $("#txtTel2").val();
		let Email 				= $("#txtEmail").val();
		let Tipo 				= $("#txtTipo").val();
		let Impuesto 			= parseFloat($("#txtImpuesto").val()) / 100;
		let Moneda				= $("#SelectMoneda").val();
		let Password 			= $("#txtPassword").val();
		let Compra_minima 		= $("#txtCompraMinima").val();
		let Porcentaje 			= $("#txtPorcentaje").val();
		let Dias_Vigencia 		= $("#txtDias_Vigencia").val();
		let Semanas_Clientes    = $("#txtSemana_Clientes_Menudeo").val();
		let Monto_Clientes 		= $("#txtMonto_Clientes_Menudeo").val();
		let Autorizar 			= 0;
		let Extracciones 		= 0;
		let Facturacion 		= 0;

		($('#checkAutorizar').prop('checked')) ? Autorizar = 1 : Autorizar = 0;
		($('#checkExtracciones').prop('checked')) ? Extracciones = 1 : Extracciones = 0;
		($('#checkFacturacion').prop('checked')) ? Facturacion = 1 : Facturacion = 0;
        
		if (Nombre != null && Nombre != "" && Calle != null && Calle != "" && Colonia != null && Colonia != "" && Municipio != null && Municipio != "" && Estado != null && Estado != "" && Pais != null && Pais != "" && CP != null && CP != "" && Tel1 != null && Tel1 != "" && Email != null && Email != "" && Tipo != null && Tipo != "" && Moneda != null && Moneda != "" && Password != null && Password != "" && Compra_minima != null && Compra_minima != "" && Porcentaje != null && Porcentaje != "" && Dias_Vigencia != null && Dias_Vigencia != "")
		{
			var formData = new FormData();
			formData.append("idNetsuite", idNetsuite);
            formData.append("Sucursal", Nombre);
            formData.append("Encargado", Encargado);
            formData.append("Calle_numero", Calle);
            formData.append("Colonia", Colonia);
            formData.append("Municipio", Municipio);
            formData.append("Estado", Estado);
            formData.append("Pais", Pais);
            formData.append("CP", CP);
            formData.append("Tel1", Tel1);
            formData.append("Tel2", Tel2);
            formData.append("CP", CP);
            formData.append("Tel1", Tel1);
            formData.append("Tel2", Tel2);
            formData.append("Email", Email);
            formData.append("Status", 'Activo');
            formData.append("Tipo", Tipo);
            formData.append("Impuesto", Impuesto);
            formData.append("Moneda", Moneda);
            formData.append("Password", Password);
            formData.append("Compra_minima", Compra_minima);
            formData.append("Porcentaje_puntos", Porcentaje);
            formData.append("Dias_vigencia_puntos", Dias_Vigencia);
            formData.append("Semanas_clientes_menudeo", Semanas_Clientes);
			formData.append("Monto_clientes_menudeo", Monto_Clientes);
			formData.append("Autorizar_pagos", Autorizar);
			formData.append("Extracciones_pagadas", Extracciones);
			formData.append("Permitir_Facturacion", Facturacion);



	            $.ajax({
	               url: dir + 'index.php/Controller_Bodega/Guardar_Bodega',
	               type: 'POST',
	               processData: false,  // tell jQuery not to process the data
	               contentType: false,
	               timeout: 35000,
	               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	               data: formData,
	               beforeSend : function ()
	                {
	                    $('#Cargando_Agregar').css('display', '');
	                },
	                success: function(data)
	                {
	                    console.log(data);

	                    if(parseInt(data) === 1){

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
	                          "timeOut": "800",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.success('Bodega agregada con exito', 'Correcto');

	                        Limpiar();
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
	                          "timeOut": "800",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.error('Ocurrio un error al crear la bodega', 'Error');
	                    }
	                }
	           })
	           .done(function() {
	               
	               $('#Cargando_Agregar').css('display', 'none');
	           })
	           .fail(function() {
	               console.log("error");
	           })
	           .always(function() {
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
              "timeOut": "800",
              "extendedTimeOut": "1000",
              "showEasing": "swing",
              "hideEasing": "linear",
              "showMethod": "fadeIn",
              "hideMethod": "fadeOut"
            }
            // Display an error toast, with a title
            toastr.warning('Algúnos campos obligatorios estan vacios', 'Advertencia');
		}
	});
































































	$("#btn_Editar_Bodega").click(function(event) {
		/* Act on the event */

		let idNetsuite 				= $("#txtIdNetsuiteEditar").val();
		let Nombre 				= $("#txtNombre_Editar").val();
		let Encargado 			= $("#txt_Encargado_Editar").val();
		let Calle 				= $("#txtCalle_Editar").val();
		let Colonia 			= $("#txtColonia_Editar").val();
		let Municipio 			= $("#txtMunicipio_Editar").val();
		let Estado 				= $("#txtEstado_Editar").val();
		let Pais 				= $("#txtPais_Editar").val();
		let CP 					= $("#txtCP_Editar").val();
		let Tel1 				= $("#txtTel1_Editar").val();
		let Tel2 				= $("#txtTel2_Editar").val();
		let Email 				= $("#txtEmail_Editar").val();
		let Tipo 				= $("#txtTipo_Editar").val();
		let Impuesto 			= parseFloat($("#txtImpuesto_Editar").val()) / 100;
		let Moneda				= $("#SelectMoneda_Editar").val();
		let Password 			= $("#txtPassword_Editar").val();
		let Compra_minima 		= $("#txtCompraMinima_Editar").val();
		let Porcentaje 			= $("#txtPorcentaje_Editar").val();
		let Dias_Vigencia 		= $("#txtDias_Vigencia_Editar").val();
		let Semanas_Clientes    = $("#txtSemana_Clientes_Menudeo_Editar").val();
		let Monto_Clientes 		= $("#txtMonto_Clientes_Menudeo_Editar").val();
		let Status 				= "";
		let Autorizar 			= 0;
		let Extracciones 		= 0;
		let Facturacion 		= 0;

		($('#checkAutorizarEditar').prop('checked')) ? Autorizar = 1 : Autorizar = 0;
		($('#checkExtraccionesEditar').prop('checked')) ? Extracciones = 1 : Extracciones = 0;
		($('#checkFacturacionEditar').prop('checked')) ? Facturacion = 1 : Facturacion = 0;

		if($('#check_Status').prop('checked'))
        {
            Status = "Inactivo";
        }
        else
        {
            Status = "Activo";
        }

		if (Nombre != null && Nombre != "" && Calle != null && Calle != "" && Colonia != null && Colonia != "" && Municipio != null && Municipio != "" && Estado != null && Estado != "" && Pais != null && Pais != "" && CP != null && CP != "" && Tel1 != null && Tel1 != "" && Email != null && Email != "" && Tipo != null && Tipo != "" && Moneda != null && Moneda != "" && Password != null && Password != "" && Compra_minima != null && Compra_minima != "" && Porcentaje != null && Porcentaje != "" && Dias_Vigencia != null && Dias_Vigencia != "")
		{
			var formData = new FormData();
			formData.append("ID", window.Global_Tabla_Bodega.childNodes[0].innerHTML);
			formData.append("idNetsuite", idNetsuite);
            formData.append("Sucursal", Nombre);
            formData.append("Encargado", Encargado);
            formData.append("Calle_numero", Calle);
            formData.append("Colonia", Colonia);
            formData.append("Municipio", Municipio);
            formData.append("Estado", Estado);
            formData.append("Pais", Pais);
            formData.append("CP", CP);
            formData.append("Tel1", Tel1);
            formData.append("Tel2", Tel2);
            formData.append("CP", CP);
            formData.append("Tel1", Tel1);
            formData.append("Tel2", Tel2);
            formData.append("Email", Email);
            formData.append("Status", Status);
            formData.append("Tipo", Tipo);
            formData.append("Impuesto", Impuesto);
            formData.append("Moneda", Moneda);
            formData.append("Password", Password);
            formData.append("Compra_minima", Compra_minima);
            formData.append("Porcentaje_puntos", Porcentaje);
            formData.append("Dias_vigencia_puntos", Dias_Vigencia);
            formData.append("Semanas_clientes_menudeo", Semanas_Clientes);
			formData.append("Monto_clientes_menudeo", Monto_Clientes);
			formData.append("Autorizar_pagos", Autorizar);
			formData.append("Extracciones_pagadas", Extracciones);
			formData.append("Permitir_Facturacion", Facturacion);


	            $.ajax({
	               url: dir + 'index.php/Controller_Bodega/Editar_Bodega',
	               type: 'POST',
	               processData: false,  // tell jQuery not to process the data
	               contentType: false,
	               timeout: 35000,
	               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	               data: formData,
	               beforeSend : function ()
	                {
	                    $('#Cargando_Editar').css('display', '');
	                },
	                success: function(data)
	                {
	                    console.log(data);

	                    if(parseInt(data) === 1){

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
	                          "timeOut": "800",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.success('Cambios guardados con exito', 'Correcto');

	                        Limpiar();
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
	                          "timeOut": "800",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.error('Ocurrio un error al modificar la bodega', 'Error');
	                    }
	                }
	           })
	           .done(function() {
	               
	               $('#Cargando_Editar').css('display', 'none');
	           })
	           .fail(function() {
	               console.log("error");
	           })
	           .always(function() {
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
              "timeOut": "800",
              "extendedTimeOut": "1000",
              "showEasing": "swing",
              "hideEasing": "linear",
              "showMethod": "fadeIn",
              "hideMethod": "fadeOut"
            }
            // Display an error toast, with a title
            toastr.warning('Algúnos campos obligatorios estan vacios', 'Advertencia');
		}
	});

	var Table_Bodega = document.getElementById("Table_Bodega");
    Table_Bodega.onclick = function(e)
    {
        window.Global_Tabla_Bodega = e.target.parentNode;
    }

    var Table_Locacion = document.getElementById("Table_Locaciones");
    Table_Locacion.onclick = function(e)
    {
        window.Global_Tabla_Locacion = e.target.parentNode;
    }


    $("#Agregar_Locacion").click(function(event) {
    	/* Act on the event */
    	$("#Add_Locacion").modal("show");

    	$("#Sucursal").val(window.Global_Tabla_Bodega.childNodes[1].innerHTML);
    	$("#txtCategoria").val(window.Global_Tabla_Bodega.childNodes[3].innerHTML);
    });

    $("#Editar_Locacion").click(function(event) {
    	if (window.Global_Tabla_Locacion != null){
    		$("#Editar_Locacion_Modal").modal("show");
	    	$("#Sucursal_Editar").val(window.Global_Tabla_Bodega.childNodes[1].innerHTML);
	    	$("#txtLocacion_Editar").val(window.Global_Tabla_Locacion.childNodes[1].innerHTML);
			$("#txtCategoria_Editar").val(window.Global_Tabla_Locacion.childNodes[3].innerHTML);
			
	    	if (window.Global_Tabla_Locacion.childNodes[2].childNodes[0].value == 1){
	    		$('#check_Predeterminado_Editar').prop('checked',true);
	    	}
	    	else{
	    		$('#check_Predeterminado_Editar').prop('checked',false);
	    	}
    	}
    	else{
			// Display an error toast, with a title
			toastr.info('Seleccione una locación', 'Importante');
    	}
    });

    $("#Eliminar_Locacion").click(function(event)
    {

    	if (window.Global_Tabla_Locacion != null)
    	{

	    	swal({
				  title: "¿Esta segúro que desea eliminar la locación?",
				  text: "Una vez eliminado no sera posible restaurarlo",
				  icon: "warning",
				  buttons: true,
				  dangerMode: true,
				})
				.then((willDelete) => {
				  if (willDelete)
				  {
					    var formData = new FormData();
					    formData.append('ID',window.Global_Tabla_Locacion.childNodes[0].innerHTML);

				        $.ajax({
				           url: dir + 'index.php/Controller_Bodega/Eliminar_Locacion',
				           type: 'POST',
				           processData: false,  // tell jQuery not to process the data
				           contentType: false,
				           timeout: 35000,
				           //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
				           data: formData,
				           beforeSend : function ()
				            {
				                $('#Cargando_Locacion_Locacion').css('display', '');
				            },
				            success: function(data)
				            {
				                console.log(data);

				            if(data == "Correcto")
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
				                  "timeOut": "800",
				                  "extendedTimeOut": "1000",
				                  "showEasing": "swing",
				                  "hideEasing": "linear",
				                  "showMethod": "fadeIn",
				                  "hideMethod": "fadeOut"
				                }
				                // Display an error toast, with a title
				                toastr.success('Locación eliminada con exito', 'Correcto');

				                //$("#Editar_Locacion_Modal").modal("hide");

							    funtion_Locaciones2();

							    //$("#Sucursal_Editar").val("");
				    			//$("#txtLocacion_Editar").val("");
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
				                  "timeOut": "800",
				                  "extendedTimeOut": "1000",
				                  "showEasing": "swing",
				                  "hideEasing": "linear",
				                  "showMethod": "fadeIn",
				                  "hideMethod": "fadeOut"
				                }
				                // Display an error toast, with a title
				                toastr.error('La locación tiene asignado información', 'Error');
				            }
				            }
				       })
				       .done(function() {
				           
				           $('#Cargando_Locacion_Locacion').css('display', 'none');
				       })
				       .fail(function() {
				           console.log("error");
				       })
				       .always(function() {
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
	                  "timeOut": "800",
	                  "extendedTimeOut": "1000",
	                  "showEasing": "swing",
	                  "hideEasing": "linear",
	                  "showMethod": "fadeIn",
	                  "hideMethod": "fadeOut"
	                }
	                // Display an error toast, with a title
	                toastr.info('Seleccione una locación', 'Importante');
	    	}
    });

    $("#btn_Editar_Locacion").click(function(event) {

    	let ID 		 = window.Global_Tabla_Bodega.childNodes[0].innerHTML;
    	let ID_Locacion		 = window.Global_Tabla_Locacion.childNodes[0].innerHTML;
    	let Sucursal  = $("#Sucursal_Editar").val();
    	let Locacion  = $("#txtLocacion_Editar").val();
    	let Categoria = $("#txtCategoria_Editar").val();
    	let Predeterminado = 0;

    	if($('#check_Predeterminado_Editar').prop('checked')){
            Predeterminado = 1;
        }
        else{
            Predeterminado = 0;
        }

    	var formData = new FormData();
    	formData.append('ID',ID_Locacion);
        formData.append("idSucursal", ID);
        formData.append("Locacion", Locacion);
        formData.append("Predeterminado", Predeterminado);
        formData.append("Categoria", Categoria);

        $.ajax({
           url: dir + 'index.php/Controller_Bodega/Editar_Locacion',
           type: 'POST',
           processData: false,
           contentType: false,
           timeout: 35000,
           data: formData,
           beforeSend : function (){
                $('#Cargando_Locacion_Editar').css('display', '');
            },
            success: function(data){
				if(data == 1){
					toastr.success('Locación modicada con exito', 'Correcto');
					$("#Editar_Locacion_Modal").modal("hide");
					funtion_Locaciones2();
					$("#Sucursal_Editar").val("");
					$("#txtLocacion_Editar").val("");
				}
				else
				{
					toastr.error('Ocurrio un error al modificar la locación', 'Error');
				}
            }
       })
       .done(function() {
           $('#Cargando_Locacion_Editar').css('display', 'none');
       })
       .fail(function() {
           console.log("error");
       })
       .always(function() {
       });
    });

    $("#btn_Agregar_Locacion").click(function(event) {
    	let ID 		 = window.Global_Tabla_Bodega.childNodes[0].innerHTML;
    	let Sucursal = $("#Sucursal").val();
    	let Locacion = $("#txtLocacion").val();
    	let Categoria = $("#txtCategoria").val();
    	let Predeterminado = 0;

    	($('#check_Predeterminado').prop('checked')) ? Predeterminado = 1 : Predeterminado = 0;
        
    	let formData = new FormData();
        formData.append("idSucursal", ID);
        formData.append("Locacion", Locacion);
        formData.append("Predeterminado", Predeterminado);
        formData.append("Categoria", Categoria);

        $.ajax({
            url: window.dir + 'index.php/Controller_Bodega/Agregar_Locacion',
            type: 'POST',
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            timeout: 800000,
            data: formData,
            beforeSend : function ()
            {
                $('#Cargando_Locacion').css('display', '');
            },
            success: function(data)
            {
	            if(data == 1){
	                toastr.success('Locación agregada con exito', 'Correcto');
	                $("#Add_Locacion").modal("hide");
				    funtion_Locaciones2();
				    $("#Sucursal").val("");
	    			$("#txtLocacion").val("");
	            }
	            else{
	                toastr.error('Ocurrio un error al agregar la locación', 'Error');
	            }
            }
       })
       .done(function() {
           $('#Cargando_Locacion').css('display', 'none');
       })
       .fail(function() {
           console.log("error");
       })
       .always(function() {
       });
    });




    //////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

    $("#selectBodega").change(function(event) {

    	let Bodega = $("#selectBodega").val();
    	
    	if (Bodega != null && Bodega != "")
    	{
    		let bodega    = document.getElementById("Table_Productos"); 
			$('#Table_Productos').DataTable().destroy();
		    bodega.tBodies[0].innerHTML = "";

		    fetch_data_producto(Bodega);
    	}
    	else
    	{
    		let bodega    = document.getElementById("Table_Productos"); 
			$('#Table_Productos').DataTable().destroy();
		    bodega.tBodies[0].innerHTML = "";
    	}
    });

    var Table_Bodega_Producto = document.getElementById("Table_Productos");
    Table_Bodega_Producto.onclick = function(e)
    {
        window.Global_Tabla_Bodega_Producto = e.target.parentNode;

        console.log(window.Global_Tabla_Bodega_Producto.childNodes[0].childNodes[1].innerHTML);
        console.log(window.Global_Tabla_Bodega_Producto.childNodes[0].childNodes[2].innerHTML);

    }

    $("#Editar_Bodega_Productos").click(function(event) {
    	
    	if (window.Global_Tabla_Bodega_Producto != null)
    	{
    		$("#txtMinimo_Editar").val(window.Global_Tabla_Bodega_Producto.childNodes[4].childNodes[0].value);
    		$("#txtPrecioPublico_Editar").val(window.Global_Tabla_Bodega_Producto.childNodes[3].innerHTML);
			$("#txtCantidadPicking_Editar").val(window.Global_Tabla_Bodega_Producto.childNodes[6].innerHTML);
    		$("#Bodega_Producto_Editar").modal("show");
    	}
    	else
    	{
    		toastr.warning('Seleccione un producto de la bodega', 'Advertencia');
    	}
    });

    $("#Agregar_Bodega_Productos").click(function(event) {

    	let Bodega = $("#selectBodega").val();
    	
    	if (Bodega != null && Bodega != "")
    	{

	    	var formData = new FormData();

	        $.ajax({
	           url: dir + 'index.php/Controller_Bodega/Get_Division',
	           type: 'POST',
	           processData: false,  // tell jQuery not to process the data
	           contentType: false,
	           timeout: 35000,
	           //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	           data: formData,
	           beforeSend : function ()
	            {
	                $('#Cargando_Header').css('display', '');
	            },
	            success: function(data)
	            {
	                console.log(data);

			    	let parsed = JSON.parse(data);

			    	$("#selectDivision").empty();

			    	$("#selectDivision").append("<option value=''>Seleccionar...</option>");

			        for (var i = 0; i < parsed['Division'].length; i++) 
				    {
				        $("#selectDivision").append("<option value='" + parsed['Division'][i]['ID'] + "'>" + parsed['Division'][i]['Division'] + "</option>");
				    }

	                $("#Bodega_Producto").modal("show");
	            }
	       })
	       .done(function() {
	           
	           $('#Cargando_Header').css('display', 'none');
	       })
	       .fail(function() {
	           console.log("error");
	       })
	       .always(function() {
	       });

	    }
	    else
	    {
	    	toastr.warning('Seleccione una bodega', 'Advertencia');
	    }
    	
    });

    $("#selectDivision").change(function(event) {
    	
    	let Division = $("#selectDivision").val();

    	if (Division != null && Division != "")
    	{
    		$("#selectLiniea").empty();
	    	$("#selectSublinea").empty();
	    	$("#selectProducto").empty();

	    	$("#selectLiniea").append("<option value=''>Seleccionar...</option>");
	    	$("#selectSublinea").append("<option value=''>Seleccionar...</option>");
	    	$("#selectProducto").append("<option value=''>Seleccionar...</option>");

	    	var formData = new FormData();
	    	formData.append("idDivision", Division);

	        $.ajax({
	           url: dir + 'index.php/Controller_Bodega/Get_Linea',
	           type: 'POST',
	           processData: false,  // tell jQuery not to process the data
	           contentType: false,
	           timeout: 35000,
	           //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	           data: formData,
	           beforeSend : function ()
	            {
	                $('#Cargando_Agregar_Producto').css('display', '');
	            },
	            success: function(data)
	            {
	                console.log(data);

			    	let parsed = JSON.parse(data);

			    	$("#selectLiniea").empty();

			    	$("#selectLiniea").append("<option value=''>Seleccionar...</option>");

			        for (var i = 0; i < parsed['Linea'].length; i++) 
				    {
				        $("#selectLiniea").append("<option value='" + parsed['Linea'][i]['ID'] + "'>" + parsed['Linea'][i]['Linea'] + "</option>");
				    }
	            }
	       })
	       .done(function() {
	           
	           $('#Cargando_Agregar_Producto').css('display', 'none');
	       })
	       .fail(function() {
	           console.log("error");
	       })
	       .always(function() {
	       });

	    }
	    else
	    {
	    	$("#selectLiniea").empty();
	    	$("#selectSublinea").empty();
	    	$("#selectProducto").empty();

	    	$("#selectLiniea").append("<option value=''>Seleccionar...</option>");
	    	$("#selectSublinea").append("<option value=''>Seleccionar...</option>");
	    	$("#selectProducto").append("<option value=''>Seleccionar...</option>");
	    }
    });

    $("#selectLiniea").change(function(event) {
    	
    	let Linea = $("#selectLiniea").val();

    	if (Linea != null && Linea != "")
    	{

    		$("#selectSublinea").empty();
	    	$("#selectProducto").empty();

	    	$("#selectSublinea").append("<option value=''>Seleccionar...</option>");
	    	$("#selectProducto").append("<option value=''>Seleccionar...</option>");

	    	var formData = new FormData();
	    	formData.append("idLinea", Linea);

	        $.ajax({
	           url: dir + 'index.php/Controller_Bodega/Get_Sublinea',
	           type: 'POST',
	           processData: false,  // tell jQuery not to process the data
	           contentType: false,
	           timeout: 35000,
	           //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	           data: formData,
	           beforeSend : function ()
	            {
	                $('#Cargando_Agregar_Producto').css('display', '');
	            },
	            success: function(data)
	            {
	                console.log(data);

			    	let parsed = JSON.parse(data);

			    	$("#selectSublinea").empty();

			    	$("#selectSublinea").append("<option value=''>Seleccionar...</option>");

			        for (var i = 0; i < parsed['Sublinea'].length; i++) 
				    {
				        $("#selectSublinea").append("<option value='" + parsed['Sublinea'][i]['ID'] + "'>" + parsed['Sublinea'][i]['Sublinea'] + "</option>");
				    }
	            }
	       })
	       .done(function() {
	           
	           $('#Cargando_Agregar_Producto').css('display', 'none');
	       })
	       .fail(function() {
	           console.log("error");
	       })
	       .always(function() {
	       });
	    }
	    else
	    {
	    	$("#selectSublinea").empty();
	    	$("#selectProducto").empty();

	    	$("#selectSublinea").append("<option value=''>Seleccionar...</option>");
	    	$("#selectProducto").append("<option value=''>Seleccionar...</option>");
	    }
    });


    $("#selectSublinea").change(function(event) {
    	
    	let Sublinea = $("#selectSublinea").val();

    	if (Sublinea != null && Sublinea != "")
    	{

    		$("#selectProducto").empty();

	    	$("#selectProducto").append("<option value=''>Seleccionar...</option>");

	    	var formData = new FormData();
	    	formData.append("idSublinea", Sublinea);

	        $.ajax({
	           url: dir + 'index.php/Controller_Bodega/Get_Producto',
	           type: 'POST',
	           processData: false,  // tell jQuery not to process the data
	           contentType: false,
	           timeout: 35000,
	           //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	           data: formData,
	           beforeSend : function ()
	            {
	                $('#Cargando_Agregar_Producto').css('display', '');
	            },
	            success: function(data)
	            {
	                console.log(data);

			    	let parsed = JSON.parse(data);

			    	$("#selectProducto").empty();

			    	$("#selectProducto").append("<option value=''>Seleccionar...</option>");

			        for (var i = 0; i < parsed['Producto'].length; i++) 
				    {
				        $("#selectProducto").append("<option value='" + parsed['Producto'][i]['ID'] + "'>" + parsed['Producto'][i]['Producto'] + "</option>");
				    }
	            }
	       })
	       .done(function() {
	           
	           $('#Cargando_Agregar_Producto').css('display', 'none');
	       })
	       .fail(function() {
	           console.log("error");
	       })
	       .always(function() {
	       });

	    }
	    else
	    {
	    	$("#selectProducto").empty();

	    	$("#selectProducto").append("<option value=''>Seleccionar...</option>");
	    }
    });

    $("#btnActualizar").click(function(event) {

    	console.log("click");

    	let Min = $("#txtMinimo_Editar").val();
    	let Precio_publico = $("#txtPrecioPublico_Editar").val();
		let Cantidad_picking = $("#txtCantidadPicking_Editar").val();

    	if (Min != null && Min != "" && Precio_publico != null && Precio_publico != "")
    	{
    	
	    	var formData = new FormData();
	        formData.append("Min", Min);
	        formData.append("Precio_publico", Precio_publico);
			formData.append("Cantidad_picking", Cantidad_picking);
	        formData.append("ID", window.Global_Tabla_Bodega_Producto.childNodes[0].childNodes[2].innerHTML);

	        $.ajax({
	           url: dir + 'index.php/Controller_Bodega/Editar_Producto',
	           type: 'POST',
	           processData: false,  // tell jQuery not to process the data
	           contentType: false,
	           timeout: 35000,
	           //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	           data: formData,
	           beforeSend : function ()
	            {
	                $('#Cargando_Editar_Producto').css('display', '');
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
			                  "timeOut": "800",
			                  "extendedTimeOut": "1000",
			                  "showEasing": "swing",
			                  "hideEasing": "linear",
			                  "showMethod": "fadeIn",
			                  "hideMethod": "fadeOut"
			                }
			                // Display an error toast, with a title
			                toastr.success('Producto actualizado con exito', 'Correcto');

			                $("#Bodega_Producto_Editar").modal("hide");

			                let Bodega = $("#selectBodega").val();

			                let bodega    = document.getElementById("Table_Productos"); 
							$('#Table_Productos').DataTable().destroy();
						    bodega.tBodies[0].innerHTML = "";

						    fetch_data_producto(Bodega);

						    window.Global_Tabla_Bodega_Producto = null;
	                }
	                else
	                {
	                	toastr.error('Ocurrio un error al actualizar el producto', 'Error');
	                }
	            }
	       })
	       .done(function() {
	           
	           $('#Cargando_Editar_Producto').css('display', 'none');
	       })
	       .fail(function() {
	           console.log("error");
	       })
	       .always(function() {
	       });

	    }
	    else
	    {
	    	toastr.info('Algunos campos obligatorios estan vacios', 'Importante');
	    }

    });


    $("#btnGuardarProducto").click(function(event) {
    	
    	

    	let Min = $("#txtMinimo").val();
    	let Precio_publico = $("#txtPrecioPublico").val();
		let Cantidad_picking = $("#txtCantidadPicking").val();
    	let Producto = $("#selectProducto").val();
    	let Bodega = $("#selectBodega").val();

    	if (Producto != null && Producto != "" && Min != null && Min != "" && Precio_publico != null && Precio_publico != "")
    	{
	    	var formData = new FormData();
	        formData.append("Min", Min);
	        formData.append("Precio_publico", Precio_publico);
			formData.append("Cantidad_picking", Cantidad_picking);
	        formData.append("idCatalogo", Producto);
	        formData.append("idSucursal", Bodega);

	        $.ajax({
	           url: dir + 'index.php/Controller_Bodega/Agregar_Producto',
	           type: 'POST',
	           processData: false,  // tell jQuery not to process the data
	           contentType: false,
	           timeout: 35000,
	           //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	           data: formData,
	           beforeSend : function ()
	            {
	                $('#Cargando_Agregar_Producto').css('display', '');
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
			                  "timeOut": "800",
			                  "extendedTimeOut": "1000",
			                  "showEasing": "swing",
			                  "hideEasing": "linear",
			                  "showMethod": "fadeIn",
			                  "hideMethod": "fadeOut"
			                }
			                // Display an error toast, with a title
			                toastr.success('Producto agregado con exito', 'Correcto');

			                $("#Bodega_Producto").modal("hide");

			                let Bodega1 = $("#selectBodega").val();

			                let bodega    = document.getElementById("Table_Productos"); 
							$('#Table_Productos').DataTable().destroy();
						    bodega.tBodies[0].innerHTML = "";

						    fetch_data_producto(Bodega1);
						    window.Global_Tabla_Bodega_Producto = null;

						    Limpiar();
	                }
	                else if (data == 3)
	                {
	                	toastr.warning('El producto ya se encuentra agregado a la sucursal', 'Advertencia');
	                }
	                else
	                {
	                	toastr.error('Ocurrio un error al agregar el producto', 'Error');
	                }
	            }
	       })
	       .done(function() {
	           
	           $('#Cargando_Agregar_Producto').css('display', 'none');
	       })
	       .fail(function() {
	           console.log("error");
	       })
	       .always(function() {
	       });

	    }
	    else
	    {
	    	toastr.info('Algunos campos obligatorios estan vacios', 'Importante');
	    }

    });

});

function myFunction(idInventario,value) { 

	
	console.log(idInventario);
	console.log(value);

	var formData = new FormData();
	formData.append("Min", value);
	formData.append("ID", idInventario);

	$.ajax({
		url: dir + 'index.php/Controller_Bodega/Editar_Producto',
		type: 'POST',
		processData: false,  // tell jQuery not to process the data
		contentType: false,
		timeout: 35000,
		//dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		data: formData,
		beforeSend : function (){
			$('#Cargando_Header').css('display', '');
		},
		success: function(data){
			console.log(data);
			switch (parseInt(data)) {
				case 1:
						toastr.success('Minimo modificado con exito', 'Correcto');
					break;
				case 0:
						toastr.error('Ocurrio un error al modificar el minimo', 'Error');
					break;
			}
		}
	})
	.done(function() {
		$('#Cargando_Header').css('display', 'none');
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
	});
 }

function fetch_data_producto(idSucursal) {
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
		"select": true,     
		"order" : [],
		"ajax" : {

		    url: dir + "Clases/fetch_Bodega_Producto.php",
		    type: "POST",
		    data:{
              idSucursal:idSucursal
            }
		}
		});
	}


//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


function Limpiar() {

	$("#txtIdNetsuite").val("");
	$("#txtNombre").val("");
    $("#txt_Encargado").val("");
    $("#txtCalle").val("");
    $("#txtColonia").val("");
    $("#txtMunicipio").val("");
    $("#txtEstado").val("");
    $("#txtPais").val("");
    $("#txtCP").val("");
    $("#txtTel1").val("");
    $("#txtTel2").val("");
    $("#txtEmail").val("");
    $("#txtTipo").val("");
    $("#txtImpuesto").val("");
    $("#SelectMoneda").val("");
    $("#txtPassword").val("");
    $("#txtCompraMinima").val("");
    $("#txtPorcentaje").val("");
    $("#txtDias_Vigencia").val("");
    $("#txtSemana_Clientes_Menudeo").val("");
    $("#txtMonto_Clientes_Menudeo").val("0");

    $("#myModal_Guardar").modal("hide");
	
	$("#txtIdNetsuiteEditar").val("");
    $("#txtNombre_Editar").val("");
    $("#txt_Encargado_Editar").val("");
    $("#txtCalle_Editar").val("");
    $("#txtColonia_Editar").val("");
    $("#txtMunicipio_Editar").val("");
    $("#txtEstado_Editar").val("");
    $("#txtPais_Editar").val("");
    $("#txtCP_Editar").val("");
    $("#txtTel1_Editar").val("");
    $("#txtTel2_Editar").val("");
    $("#txtEmail_Editar").val("");
    $("#txtTipo_Editar").val("");
    $("#txtImpuesto_Editar").val("");
    $("#SelectMoneda_Editar").val("");
    $("#txtPassword_Editar").val("");
    $("#txtCompraMinima_Editar").val("");
    $("#txtPorcentaje_Editar").val("");
    $("#txtDias_Vigencia_Editar").val("");
    $("#txtSemana_Clientes_Menudeo_Editar").val("");
    $("#txtMonto_Clientes_Menudeo_Editar").val("0");

    $("#selectDivision").empty();
    $("#selectLiniea").empty();
	$("#selectSublinea").empty();
	$("#selectProducto").empty();

	$("#selectDivision").append("<option value=''>Seleccionar...</option>");
	$("#selectLiniea").append("<option value=''>Seleccionar...</option>");
	$("#selectSublinea").append("<option value=''>Seleccionar...</option>");
	$("#selectProducto").append("<option value=''>Seleccionar...</option>");

	$("#txtMinimo").val("0");
	$("#txtPrecioPublico").val("0");
	$("#txtCantidadPicking").val("0");

    $("#myModal_Editar").modal("hide");

    let bodega    = document.getElementById("Table_Bodega"); 
	$('#Table_Bodega').DataTable().destroy();
    bodega.tBodies[0].innerHTML = "";

    window.Global_Tabla_Bodega = null;

    fetch_data();
}

function fetch_data() {
	$('#Table_Bodega').DataTable().destroy();
	var dataTable = $('#Table_Bodega').DataTable({
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
                    "targets": 12,
                    'render': function (data, type, full, meta)
                    {
                        if (full[12] == 'Activo')
                        {
                        	return "<label class='label label-success'>Activo</label>"
                        }
                        else
                        {
                        	return "<label class='label label-danger'>Inactivo</label>"
                        }

                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                },

            ],       
		"order" : [],
		"ajax" : {

		    url: dir + "Clases/fetch_Bodega.php",
		    type: "POST",
		}
		});
	}


	function funtion_Editar()
	{
		if (window.Global_Tabla_Bodega != null)
		{
			 var formData = new FormData();
            formData.append("ID", window.Global_Tabla_Bodega.childNodes[0].innerHTML);

            $.ajax({
               url: dir + 'index.php/Controller_Bodega/Get_Bodega_by_Id',
               type: 'POST',
               processData: false,  // tell jQuery not to process the data
               contentType: false,
               timeout: 35000,
               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
               data: formData,
               beforeSend : function ()
                {
                    $('#Cargando_Header').css('display', '');
                },
                success: function(data)
                {
                    console.log(data);

                    let parsed = JSON.parse(data);

                    console.log(parsed);

                    if (parsed != null && parsed != "")
                    {
                        for (var i = 0; i < parsed['Bodega'].length; i++) 
                        {
							$("#txtIdNetsuiteEditar").val(parsed['Bodega'][i]['idNetsuite']);
                            $("#txtNombre_Editar").val(parsed['Bodega'][i]['Sucursal']);
                            $("#txt_Encargado_Editar").val(parsed['Bodega'][i]['Encargado']);
                            $("#txtCalle_Editar").val(parsed['Bodega'][i]['Calle_numero']);
                            $("#txtColonia_Editar").val(parsed['Bodega'][i]['Colonia']);
                            $("#txtMunicipio_Editar").val(parsed['Bodega'][i]['Municipio']);
                            $("#txtEstado_Editar").val(parsed['Bodega'][i]['Estado']);
                            $("#txtPais_Editar").val(parsed['Bodega'][i]['Pais']);
                            $("#txtCP_Editar").val(parsed['Bodega'][i]['CP']);
                            $("#txtTel1_Editar").val(parsed['Bodega'][i]['Tel1']);
                            $("#txtTel2_Editar").val(parsed['Bodega'][i]['Tel2']);
                            $("#txtEmail_Editar").val(parsed['Bodega'][i]['Email']);
                            $("#txtTipo_Editar").val(parsed['Bodega'][i]['Tipo']);
                            $("#txtImpuesto_Editar").val(parsed['Bodega'][i]['Impuesto']);
                            $("#SelectMoneda_Editar").val(parsed['Bodega'][i]['Moneda']);
                            $("#txtPassword_Editar").val(parsed['Bodega'][i]['Password']);
                            $("#txtCompraMinima_Editar").val(parsed['Bodega'][i]['Compra_minima']);
                            $("#txtPorcentaje_Editar").val(parsed['Bodega'][i]['Porcentaje_puntos']);
                            $("#txtDias_Vigencia_Editar").val(parsed['Bodega'][i]['Dias_vigencia_puntos']);
                            $("#txtSemana_Clientes_Menudeo_Editar").val(parsed['Bodega'][i]['Semanas_clientes_menudeo']);
                            $("#txtMonto_Clientes_Menudeo_Editar").val(parsed['Bodega'][i]['Monto_clientes_menudeo']);

                            if (parsed['Bodega'][i]['Status'] == 'Inactivo')
                            {
                                $("#check_Status").prop('checked', true);
                            }
                            else
                            {
                                $("#check_Status").prop('checked', false);
							}

							(parsed['Bodega'][i]['Autorizar_pagos'] == 1) ? $("#checkAutorizarEditar").prop('checked', true) : $("#checkAutorizarEditar").prop('checked', false);
							(parsed['Bodega'][i]['Extracciones_pagadas'] == 1) ? $("#checkExtraccionesEditar").prop('checked', true) : $("#checkExtraccionesEditar").prop('checked', false);
							(parsed['Bodega'][i]['Permitir_Facturacion'] == 1) ? $("#checkFacturacionEditar").prop('checked', true) : $("#checkFacturacionEditar").prop('checked', false);

                        }

                        $("#myModal_Editar").modal("show");
                    }
                }
           })
           .done(function() {
               
               $('#Cargando_Header').css('display', 'none');
           })
           .fail(function() {
               console.log("error");
           })
           .always(function() {
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
	          "timeOut": "800",
	          "extendedTimeOut": "1000",
	          "showEasing": "swing",
	          "hideEasing": "linear",
	          "showMethod": "fadeIn",
	          "hideMethod": "fadeOut"
	        }
	        // Display an error toast, with a title
	        toastr.warning('Seleccione una bodega', 'Advertencia');
		}
	}


	function funtion_Eliminar()
	{
		if (window.Global_Tabla_Bodega != null)
		{

			if (window.Global_Tabla_Bodega.childNodes[12].childNodes[0].innerHTML == 'Activo')
			{

				swal({
				  title: "¿Esta seguro que desea eliminar la bodega?",
				  text: "Una vez eliminada pasara a estatus inactiva",
				  icon: "warning",
				  buttons: true,
				  dangerMode: true,
				})
				.then((willDelete) => {
				  if (willDelete)
				  {
				    var formData = new FormData();
		            formData.append("ID", window.Global_Tabla_Bodega.childNodes[0].innerHTML);

		            $.ajax({
		               url: dir + 'index.php/Controller_Bodega/Delete_Bodega',
		               type: 'POST',
		               processData: false,  // tell jQuery not to process the data
		               contentType: false,
		               timeout: 35000,
		               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		               data: formData,
		               beforeSend : function ()
		                {
		                    $('#Cargando_Header').css('display', '');
		                },
		                success: function(data)
		                {
		                    console.log(data);

	                    if(data == "Correcto")
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
	                          "timeOut": "800",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.success('Sucursal eliminada con exito', 'Correcto');

	                        Limpiar();
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
	                          "timeOut": "800",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.error('Ocurrio un error al eliminar la bodega', 'Error');
	                    }
		                }
		           })
		           .done(function() {
		               
		               $('#Cargando_Header').css('display', 'none');
		           })
		           .fail(function() {
		               console.log("error");
		           })
		           .always(function() {
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
		          "timeOut": "800",
		          "extendedTimeOut": "1000",
		          "showEasing": "swing",
		          "hideEasing": "linear",
		          "showMethod": "fadeIn",
		          "hideMethod": "fadeOut"
		        }
		        // Display an error toast, with a title
		        toastr.warning('La bodega ya se encuentra como inactiva', 'Advertencia');
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
	          "timeOut": "800",
	          "extendedTimeOut": "1000",
	          "showEasing": "swing",
	          "hideEasing": "linear",
	          "showMethod": "fadeIn",
	          "hideMethod": "fadeOut"
	        }
	        // Display an error toast, with a title
	        toastr.warning('Seleccione una bodega', 'Advertencia');
		}
	}


	function funtion_Locaciones()
	{
		if (window.Global_Tabla_Bodega != null)
		{
			var formData = new FormData();
	        formData.append("ID", window.Global_Tabla_Bodega.childNodes[0].innerHTML);

	        $.ajax({
	           url: dir + 'index.php/Controller_Bodega/Get_Locacion',
	           type: 'POST',
	           processData: false,  // tell jQuery not to process the data
	           contentType: false,
	           timeout: 35000,
	           //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	           data: formData,
	           beforeSend : function ()
	            {
	                $('#Cargando_Header').css('display', '');
	            },
	            success: function(data)
	            {
	                console.log(data);

	                let parsed = JSON.parse(data);

	                let Locacion    = document.getElementById("Table_Locaciones"); 
					$('#Table_Locaciones').DataTable().destroy();
				    Locacion.tBodies[0].innerHTML = "";

	                if (parsed != null && parsed != "")
                    {
                    	let Bodega       = document.getElementById("Table_Locaciones"); 
						let tbody 		 = Bodega.tBodies[0];

                        for (var i = 0; i < parsed['Locacion'].length; i++) 
                        {
                        	let row  = tbody.insertRow(i);
			                let cel1 = row.insertCell(0);
			                let cel2 = row.insertCell(1);
			                let cel3 = row.insertCell(2);
			                let cel4 = row.insertCell(3);

			                cel1.innerHTML = parsed['Locacion'][i]['ID'];
			                cel2.innerHTML = parsed['Locacion'][i]['Locacion'];

			                if (parsed['Locacion'][i]['Predeterminado'] == 1)
			                {
			                	let input = document.createElement("input");
							    //input.classList.add('form-control');
							    input.setAttribute('type', 'checkbox');
							    input.setAttribute('checked','');
							    input.setAttribute('value',1);
							    cel3.appendChild(input);
			                }
			                else
			                {
			                	let input = document.createElement("input");
							    //input.classList.add('form-control');
							    input.setAttribute('type', 'checkbox');
							    input.setAttribute('value',0);
							    //input.setAttribute('checked');
							    cel3.appendChild(input);
			                }

			                cel4.innerHTML = parsed['Locacion'][i]['Categoria'];
                        }

                        Crear_data_Locacion();

                        $("#Modal_Locaciones").modal("show");
                    }
	            }
	       })
	       .done(function() {
	           
	           $('#Cargando_Header').css('display', 'none');
	       })
	       .fail(function() {
	           console.log("error");
	       })
	       .always(function() {
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
	          "timeOut": "800",
	          "extendedTimeOut": "1000",
	          "showEasing": "swing",
	          "hideEasing": "linear",
	          "showMethod": "fadeIn",
	          "hideMethod": "fadeOut"
	        }
	        // Display an error toast, with a title
	        toastr.warning('Seleccione una bodega', 'Advertencia');
	    }
	}

	function funtion_Locaciones2()
	{
		if (window.Global_Tabla_Bodega != null)
		{
			var formData = new FormData();
	        formData.append("ID", window.Global_Tabla_Bodega.childNodes[0].innerHTML);

	        $.ajax({
	           url: dir + 'index.php/Controller_Bodega/Get_Locacion',
	           type: 'POST',
	           processData: false,  // tell jQuery not to process the data
	           contentType: false,
	           timeout: 35000,
	           //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	           data: formData,
	           beforeSend : function ()
	            {
	                $('#Cargando_Header').css('display', '');
	            },
	            success: function(data)
	            {
	                console.log(data);

	                let parsed = JSON.parse(data);

	                let Locacion    = document.getElementById("Table_Locaciones"); 
					$('#Table_Locaciones').DataTable().destroy();
				    Locacion.tBodies[0].innerHTML = "";

	                if (parsed != null && parsed != "")
                    {
                    	let Bodega       = document.getElementById("Table_Locaciones"); 
						let tbody 		 = Bodega.tBodies[0];

                        for (var i = 0; i < parsed['Locacion'].length; i++) 
                        {
                        	let row  = tbody.insertRow(i);
			                let cel1 = row.insertCell(0);
			                let cel2 = row.insertCell(1);
			                let cel3 = row.insertCell(2);
			                let cel4 = row.insertCell(3);

			                cel1.innerHTML = parsed['Locacion'][i]['ID'];
			                cel2.innerHTML = parsed['Locacion'][i]['Locacion'];

			                if (parsed['Locacion'][i]['Predeterminado'] == 1)
			                {
			                	let input = document.createElement("input");
							    //input.classList.add('form-control');
							    input.setAttribute('type', 'checkbox');
							    input.setAttribute('checked','');
							    cel3.appendChild(input);
			                }
			                else
			                {
			                	let input = document.createElement("input");
							    //input.classList.add('form-control');
							    input.setAttribute('type', 'checkbox');
							    //input.setAttribute('checked');
							    cel3.appendChild(input);
			                }

			                cel4.innerHTML = parsed['Locacion'][i]['Categoria'];
                        }

                        Crear_data_Locacion();
                    }
	            }
	       })
	       .done(function() {
	           
	           $('#Cargando_Header').css('display', 'none');
	       })
	       .fail(function() {
	           console.log("error");
	       })
	       .always(function() {
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
	          "timeOut": "800",
	          "extendedTimeOut": "1000",
	          "showEasing": "swing",
	          "hideEasing": "linear",
	          "showMethod": "fadeIn",
	          "hideMethod": "fadeOut"
	        }
	        // Display an error toast, with a title
	        toastr.warning('Seleccione una bodega', 'Advertencia');
	    }
	}

	function Crear_data_Locacion() {
	
	$('#Table_Locaciones').dataTable({
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