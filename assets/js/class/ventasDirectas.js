var idClienteDirectos  = null;
var idSucursal 		   = 1;
var idCliente  		   = 261;

var globalVenta = null;
var globalidClienteMenudeo = null;
var globalFetchVentasDirectas = null;

///////////////////////////
var globalLinea = null;
var globalDivision = null;

//////////////////////////
var fetchTablaPromocion = null;
var fetchTablaOfertas = null;

$( document ).ready(function() {

	if($("#idVenta").val() != "" && $("#idVenta").val() != null){
		calcular();
		let idCliente = $("#idClienteMenudeo").val();
		$("#select_Cliente_Venta").val(idCliente);
	}

	// Cargar Libreria DatePicker //
	$('.input-daterange').datepicker({
      format: "yyyy-mm-dd",
      autoclose: true
	});
	
	$('#file-input').change(function(e) {
		addImage(e); 
	});

	$("#Registrar_Pago").click(function(event) {
		let Banco    = $("#Banco").val();
		let Sucursal = $("#Sucursal").val();
		let Cantidad = $("#Cantidad_Pagar").val();
		let URL      = document.getElementById('imgSalida').src;
		let idVenta  = $("#PagoVenta").text();
		let file = $("#file-input")[0].files[0];

		if (Banco != null && Banco != "" && Sucursal != null && Sucursal != "" && Cantidad != null && Cantidad != "" && idVenta != null && idVenta != ""){
			if (typeof file === 'undefined'){
				toastr.warning('Algunos campos obligatorios estan vacios', 'Advertencia');
			}
			else{
				var formData = new FormData();
				formData.append("ID", idVenta);
				formData.append("Banco", Banco);
				formData.append("Sucursal", Sucursal);
				formData.append("Cantidad", Cantidad);
				formData.append("Nombre_Imagen", file.name);
				formData.append("Base64", URL);

				$.ajax({
					url: window.dir + 'index.php/Controller_VentasDirectas/Add_Pago',
					type: 'POST',
					processData: false,
					contentType: false,
					timeout: 800000,
					data: formData,
					beforeSend : function ()
					{
						$('#Cargando_Cobro').css('display','');
					},
					success: function(data)
					{
						console.log(data);
						if (data == 1){
							toastr.success('Pago registrado con exito', 'Correcto');
							Limpiar(4);
						}
						else if (data == 2){
							toastr.warning('Ocurrio un error al almacenar la imagen', 'Advertencia');
						}
						else if (data == 3){
							toastr.info('Ya se encuentra capturado un pago de la venta', 'Importante');
						}
						else if (data == 4){
							toastr.warning('No se encontro una venta asignada al pago', 'Advertencia');
						}
						else{
							toastr.error('Ocurrio una error al subir el pago de la venta', 'Error');
						}
					}
				})
				.done(function() {
				console.log("success");
				})
				.fail(function() {
				console.log("error");
				})
				.always(function() {
					$('#Cargando_Cobro').css('display','none');
				});
			}
		}
	});

	// Validate Solo Numeros //
	$('.input-number').on('input', function () { 
		this.value = this.value.replace(/[^0-9]/g,'');
	});

	 // Acción Buscar Recolecciones por fecha //
	$("#searchVentasDirectas").click(function(event) {
		let DateSt = $('#DateStartVentasDirectas').val();
  		let DateEn = $('#DateEndVentasDirectas').val();

		if (DateSt != '' && DateEn != ''){
			$('#fetchVentasDirectas').DataTable().destroy();
			fetchVentasDirectas('yes', DateSt,DateEn,idCliente);
		}
		else{
			$('#fetchVentasDirectas').DataTable().destroy();
			fetchVentasDirectas('no','', '',idCliente);
		}
	});

	// Acción Guardar Cliente Menudeo //
	$("#btnAddCliente").click(function(event) {

		let Nombre = $("#txtNombre").val();
		let Apellidos = $("#txtApellidos").val();
		let Empresa = $("#txtEmpresa").val();
		let Cargo = $("#txtCargo").val();
		let Calle = $("#txtCalle").val();
		let Colonia = $(".txtColonia").val();
		let Ciudad = $("#txtCiudad").val();
		let Municipio = $("#txtMunicipio").val();
		let Estado = $("#txtEstado").val();
		let Pais = $("#txtPais").val();
		let CP = $("#txtCP").val();
		let RFC = $("#txtRFC").val();
		let Tel1 = $("#txtTel1").val();
		let Tel2 = $("#txtTel2").val();
		let Email = $("#txtEmail").val();
		let Descuento = $("#txtDescuento").val();
		let idDistribuidor = $("#select_Distribuidor").val();
		let Nivel = $("#txtNivel").val();

		let Dia_visita = 0;
		let Asignado = 0;
		let Contador = 0;

		for (let i = 0; i < Calle.length; i++) {
			let chart = Calle.charAt(i);
			let validate = Number.isInteger(parseInt(chart));

			if (validate) {
				Contador ++;
			}
		}

		if (Contador != 0) {
			if (Nombre != "" && Apellidos != "" && RFC != "" && idDistribuidor != "" && Empresa != "" && CP != "" && Tel1 != "" && Email != "" && Nivel != "") {

				let formData = new FormData();
				formData.append("Nombre", Nombre);
				formData.append("Apellidos", Apellidos);
				formData.append("Empresa", Empresa);
				formData.append("Cargo", Cargo);
				formData.append("Calle_numero", Calle);
				formData.append("Colonia", Colonia);
				formData.append("Ciudad", Ciudad);
				formData.append("Municipio", Municipio);
				formData.append("Estado", Estado);
				formData.append("Pais", Pais);
				formData.append("CP", CP);
				formData.append("RFC", RFC);
				formData.append("Tel1", Tel1);
				formData.append("Tel2", Tel2);
				formData.append("Email", Email);
				formData.append("Descuento_%", Descuento);
				formData.append("idCliente", idDistribuidor);
				formData.append("Status", 'Activo');
				formData.append("Nivel", Nivel);
				formData.append("Dia_visita", Dia_visita);
				formData.append("Asignado", Asignado);

				$.ajax({
					url: window.dir + 'index.php/Controller_Cliente/AddClienteMenudeo',
					type: 'POST',
					processData: false,
					contentType: false,
					timeout: 800000,
					data: formData,
					beforeSend: function () {
						$("#loadingHeader").css('display', '');
						$("#btnCerrarAddCliente").css('display', 'none');
						$("#loadingCerrarAddCliente").css('display', '');
						$("#btnAddCliente").css('display', 'none');
						$("#loadingAddCliente").css('display', '');
					},
					success: function (data) {
						console.log(data);

						switch (parseInt(data.trim())) {

							case 0:
								toastr.error('Ocurrio un error al crear al cliente menudeo', 'Error');
								break;

							case 1:
								Limpiar(1);
								toastr.success('Cliente menudeo agregado con exito', 'Correcto');
								break;

							default:
								toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
						}
					}
				})
				.done(function () {
					$("#loadingHeader").css('display', 'none');
					$("#btnCerrarAddCliente").css('display', '');
					$("#loadingCerrarAddCliente").css('display', 'none');
					$("#btnAddCliente").css('display', '');
					$("#loadingAddCliente").css('display', 'none');
				})
				.fail(function () {
					$("#loadingHeader").css('display', 'none');
					$("#btnCerrarAddCliente").css('display', '');
					$("#loadingCerrarAddCliente").css('display', 'none');
					$("#btnAddCliente").css('display', '');
					$("#loadingAddCliente").css('display', 'none');
					// Abrir modal Verifique conexión
					$("#modalErrorConexion").modal("show");
				})
				.always(function () {
				});
			}
			else{
				toastr.warning('Algúnos campos obligatorios se encuentran vacios', 'Advertencia');
			}
		}else{
			toastr.warning('El campo calle debe de llevar por lo menos un numero', 'Advertencia');
		}
	});

	///// Cargar Tabla Productos /////
	$('#fetchProductosVenta').DataTable().destroy();
	document.getElementById("fetchProductosVenta").tBodies[0].innerHTML = "";
	fetchProductosVenta('','','',idSucursal,idCliente);

	///// Cargar Tabla Promociones /////
	$('#fetchProductosPromo').DataTable().destroy();
	document.getElementById("fetchProductosPromo").tBodies[0].innerHTML = "";
	fetchProductosPromo('','','',idSucursal,idCliente);

	///// Cargar Tabla Ventas Directas Anteriores /////
	$('#fetchVentasDirectas').DataTable().destroy();
	document.getElementById("fetchVentasDirectas").tBodies[0].innerHTML = "";
	fetchVentasDirectas('','','',idCliente);

	// Refrescar División //
	$("#refrescar").click(function(event) {

		globalDivision = null;
		globalLinea = null;

		$(".tdDivision").removeAttr('style');
		
		let trSublinea = document.getElementById("trSublinea");
		trSublinea.innerHTML = "";

		let trLinea = document.getElementById("trLinea");
		trLinea.innerHTML = "";

		let Tabla_Ventas         = document.getElementById("fetchProductosVenta");
		let Tbody_Ventas         = Tabla_Ventas.getElementsByTagName("tbody")[0];

		let Tabla_Promo         = document.getElementById("fetchProductosPromo");
		let Tbody_Promo         = Tabla_Promo.getElementsByTagName("tbody")[0];

		$('#fetchProductosVenta').DataTable().destroy();
		Tbody_Ventas.innerHTML = "";

		$('#fetchProductosPromo').DataTable().destroy();
		Tbody_Promo.innerHTML = "";

		fetchProductosVenta('','','',idSucursal,idCliente);
		fetchProductosPromo('','','',idSucursal,idCliente);
	});

	///// Ver Promociones y Ofertas /////
	$("#btnVerPromocion").click(function(event) {
		let formData = new FormData();
	    formData.append("sucursal", idSucursal);
	    formData.append("id", idCliente);

		$.ajax({
	        url: window.dir + 'index.php/Controller_VentasDirectas/getInformacion',
	        type: 'POST',
	        processData: false,  // tell jQuery not to process the data
	        contentType: false,
	        timeout: 800000,
	        data: formData,
	        beforeSend : function ()
	        {
	            $('#loadingHeader').css('display','');
                $('#btnVerPromocion').css('display','none');
                $('#loadingVerPromocion').css('display','');
                $('#btnAddVenta').css('display','none');
                $('#loadingAddVenta').css('display','');
	        },
	        success: function(data)
	        {
	          	let parsed = JSON.parse(data);

				if (parsed != null && parsed != ""){
		        	let table_Promocion         = document.getElementById("fetchPromociones"); 
					let tbody_Promocion   		= table_Promocion.tBodies[0];

					let table_Oferta         = document.getElementById("fetchOfertas"); 
					let tbody_Oferta   		 = table_Oferta.tBodies[0];

					$('#fetchPromociones').DataTable().destroy();
					table_Promocion.tBodies[0].innerHTML = "";

					$('#fetchOfertas').DataTable().destroy();
					table_Oferta.tBodies[0].innerHTML = "";

					for (var i = 0; i < parsed['Promo'].length; i++){
	                   let row  = tbody_Promocion.insertRow(i);
	                   let cel1 = row.insertCell(0);
	                   let cel2 = row.insertCell(1);
	                   let cel3 = row.insertCell(2);
	                   let cel4 = row.insertCell(3);

	                   cel1.innerHTML = parsed['Promo'][i]['idPromocion'];
	                   cel2.innerHTML = parsed['Promo'][i]['Promocion'];
	                   cel3.innerHTML = parsed['Promo'][i]['Precio_promo'];

	                    let boton = document.createElement("button");
				        boton.classList.add('btn', 'btn-success','btn-xs');
				        boton.addEventListener("click",AddPromo);
				        cel4.appendChild(boton);

				        let icono = document.createElement("span");
				        icono.classList.add('glyphicon', 'glyphicon-plus');
				        boton.appendChild(icono);
	                }

	                for (var i = 0; i < parsed['Oferta'].length; i++){
	                   let row  = tbody_Oferta.insertRow(i);
	                   let cel1 = row.insertCell(0);
	                   let cel2 = row.insertCell(1);
	                   let cel3 = row.insertCell(2);
	                   let cel4 = row.insertCell(3);
	                   let cel5 = row.insertCell(4);
	                   let cel6 = row.insertCell(5);

	                   cel1.innerHTML = parsed['Oferta'][i]['ID'];
	                   cel2.innerHTML = parsed['Oferta'][i]['Nombre'];
	                   cel3.innerHTML = parsed['Oferta'][i]['Compra_req'];
	                   cel4.innerHTML = parsed['Oferta'][i]['Tipo_Desc'];
	                   cel4.setAttribute("hidden","hidden");
	                   cel5.innerHTML = parsed['Oferta'][i]['Tipo_Regalo'];
	                   cel5.setAttribute("hidden","hidden");

	                    let boton = document.createElement("button");
				        boton.classList.add('btn', 'btn-success','btn-xs');
				        boton.addEventListener("click",AddOferta);
				        cel6.appendChild(boton);

				        let icono = document.createElement("span");
				        icono.classList.add('glyphicon', 'glyphicon-plus');
				        boton.appendChild(icono);
	                }

	                fetch("fetchPromociones");
	                fetch("fetchOfertas");

	                $("#modalPromociones").modal("show");
		        }
	        }
	    })
	    .done(function() {
	        $('#loadingHeader').css('display','none');
            $('#btnVerPromocion').css('display','');
            $('#loadingVerPromocion').css('display','none');
            $('#btnAddVenta').css('display','');
            $('#loadingAddVenta').css('display','none');
	    })
	    .fail(function() {
	        $('#loadingHeader').css('display','none');
            $('#btnVerPromocion').css('display','');
            $('#loadingVerPromocion').css('display','none');
            $('#btnAddVenta').css('display','');
            $('#loadingAddVenta').css('display','none');
            $("#modalErrorConexion").modal("show");
	    })
	    .always(function() {
	    });
	});
	
	// Obtener Informacion tabla promoción //
	document.getElementById("fetchPromociones").onclick = function(e)
	{
		fetchTablaPromocion = e.target.parentNode;

		let formData = new FormData();
		formData.append("ID", fetchTablaPromocion.childNodes[0].innerHTML);

		$.ajax({
        	url: window.dir + 'index.php/Controller_VentasDirectas/getInfoPromo',
        	type: 'POST',
        	processData: false,  // tell jQuery not to process the data
	        contentType: false,
	        timeout: 800000,
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnCerrarModalPromo').css('display','none');
                $('#loadingCerrarModalPromo').css('display','');            
            },
            success: function(data)
            {
			    let parsed = JSON.parse(data);

            	if (parsed != null && parsed != ""){
            		
                    let Productos       = document.getElementById("fetchPromocionProducto"); 
					let tbody 			= Productos.tBodies[0];

					 $('#fetchPromocionProducto').DataTable().destroy();

					Productos.tBodies[0].innerHTML = "";

					for (var i = 0; i < parsed.length; i++){

	                   let row  = tbody.insertRow(i);
	                   let cel1 = row.insertCell(0);
	                   let cel2 = row.insertCell(1);

	                   cel1.innerHTML = parsed[i]['ID'];
	                   cel2.innerHTML = parsed[i]['Producto'];
                    }

                    if (tbody.rows.length > 0){
                    	fetch("fetchPromocionProducto");
                    }
                }
            }
        })
        .done(function() {
        	$('#loadingHeader').css('display','none');
            $('#btnCerrarModalPromo').css('display','');
            $('#loadingCerrarModalPromo').css('display','none');  
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnCerrarModalPromo').css('display','');
            $('#loadingCerrarModalPromo').css('display','none');
            $("#modalErrorConexion").modal("show");
		})
		.always(function() {
		});
	}

	// Obtener Informacion tabla ofertas //
	document.getElementById("fetchOfertas").onclick = function(e)
	{
		fetchTablaOfertas = e.target.parentNode;

		if (fetchTablaOfertas.childNodes[0].nodeName == 'TD'){

    		let formData = new FormData();
        	formData.append("ID", fetchTablaOfertas.childNodes[0].innerHTML);
        	formData.append("IDCliente", idCliente);

			$.ajax({
	        	url: window.dir + 'index.php/Controller_VentasDirectas/getInfoOferta',
	        	type: 'POST',
	        	processData: false,  // tell jQuery not to process the data
		        contentType: false,
		        timeout: 800000,
	            data: formData,
	            beforeSend : function ()
	            {
	                $('#loadingHeader').css('display','');
	                $('#btnCerrarModalPromo').css('display','none');
	                $('#loadingCerrarModalPromo').css('display','');
	            },
	            success: function(data)
	            {
	            	let parsed = JSON.parse(data);

	            	let Tipo_Desc   	= fetchTablaOfertas.childNodes[3].innerHTML;
	            	let Tipo_Regalo 	= fetchTablaOfertas.childNodes[4].innerHTML;

	            	let Tabla_Di        = document.getElementById("ofeDivision"); 
					let Tbody_Di 		= Tabla_Di.tBodies[0];
					$('#ofeDivision').DataTable().destroy();
					Tabla_Di.tBodies[0].innerHTML = "";

					let Tabla_Li        = document.getElementById("ofeLinea"); 
					let Tbody_Li 		= Tabla_Li.tBodies[0];
					$('#ofeLinea').DataTable().destroy();
					Tabla_Li.tBodies[0].innerHTML = "";

					let Tabla_Su        = document.getElementById("ofeSublinea"); 
					let Tbody_Su 		= Tabla_Su.tBodies[0];
					$('#ofeSublinea').DataTable().destroy();
					Tabla_Su.tBodies[0].innerHTML = "";

					let Tabla_Po        = document.getElementById("ofeProductos"); 
					let Tbody_Po 		= Tabla_Po.tBodies[0];
					$('#ofeProductos').DataTable().destroy();
					Tabla_Po.tBodies[0].innerHTML = "";

					let Tabla_Re        = document.getElementById("ofeRegalo"); 
					let Tbody_Re 		= Tabla_Re.tBodies[0];
					$('#ofeRegalo').DataTable().destroy();
					Tabla_Re.tBodies[0].innerHTML = "";

					let Contador_1 = 0;
					let Contador_2 = 0;
					let Contador_3 = 0;
					let Contador_4 = 0;
					let Contador_5 = 0;

	            	if (parsed['Detalle'] != null && parsed['Detalle'] != ""){
	            		if (Tipo_Desc == 1){
	            			$("#Div_Descuento").css('display', '');
	            			$("#Div_Regalo").css('display', 'none');
	            			$("#txt_Tipo").val('Descuento');
	            			$("#txt_Descuento").val(parsed['Detalle'][0]['Desc']);
	            		}
	            		else if (Tipo_Regalo == 1){
	            			$("#Div_Regalo").css('display','');
	            			$("#Div_Descuento").css('display', 'none');
	            			$("#txt_Tipo").val('Regalo');
	            			$("#txt_Descuento").val("");
	            		}

	            		for (var i = 0; i < parsed['Detalle'].length; i++){
							if (parsed['Detalle'][i]['idDivision'] != null){
								let Tabla_D       = document.getElementById("ofeDivision"); 
								let Tbody_D 		= Tabla_D.tBodies[0];

								let row  = Tbody_D.insertRow(Contador_1);
		                   		let cel1 = row.insertCell(0);
		                   		let cel2 = row.insertCell(1);

		                   		cel1.innerHTML = parsed['Detalle'][i]['idDivision'];
		                   		cel2.innerHTML = parsed['Detalle'][i]['Division'];

		                   		Contador_1++;
							}

							if (parsed['Detalle'][i]['idLinea'] != null){
								let Tabla_L       = document.getElementById("ofeLinea"); 
								let Tbody_L 		= Tabla_L.tBodies[0];

								let row  = Tbody_L.insertRow(Contador_2);
		                   		let cel1 = row.insertCell(0);
		                   		let cel2 = row.insertCell(1);

		                   		cel1.innerHTML = parsed['Detalle'][i]['idLinea'];
		                   		cel2.innerHTML = parsed['Detalle'][i]['Linea'];

		                   		Contador_2++;
							}

							if (parsed['Detalle'][i]['idSublinea'] != null){
								let Tabla_S       = document.getElementById("ofeSublinea"); 
								let Tbody_S 		= Tabla_S.tBodies[0];

								let row  = Tbody_S.insertRow(Contador_3);
		                   		let cel1 = row.insertCell(0);
		                   		let cel2 = row.insertCell(1);

		                   		cel1.innerHTML = parsed['Detalle'][i]['idSublinea'];
		                   		cel2.innerHTML = parsed['Detalle'][i]['Sublinea'];

		                   		Contador_3++;
							}

							if (parsed['Detalle'][i]['idCatalogo'] != null){
								console.log(i);

								let Tabla_P       = document.getElementById("ofeProductos"); 
								let Tbody_P 		= Tabla_P.tBodies[0];

								let row  = Tbody_P.insertRow(Contador_4);
		                   		let cel1 = row.insertCell(0);
		                   		let cel2 = row.insertCell(1);

		                   		cel1.innerHTML = parsed['Detalle'][i]['idCatalogo'];
		                   		cel2.innerHTML = parsed['Detalle'][i]['Producto'];

		                   		Contador_4++;
							}

							if (parsed['Detalle'][i]['idRegalo'] != null){
								let Tabla_R       = document.getElementById("ofeRegalo"); 
								let Tbody_R 		= Tabla_R.tBodies[0];

								let row  = Tbody_R.insertRow(Contador_5);
		                   		let cel1 = row.insertCell(0);
		                   		let cel2 = row.insertCell(1);

		                   		cel1.innerHTML = parsed['Detalle'][i]['idRegalo'];
		                   		cel2.innerHTML = parsed['Detalle'][i]['Regalo'];

		                   		Contador_5++;
							}
				        }
			        }
				}
	        })
	        .done(function() {
	        	$('#loadingHeader').css('display','none');
	            $('#btnCerrarModalPromo').css('display','');
	            $('#loadingCerrarModalPromo').css('display','none');
	        })
	        .fail(function(jqXHR, textStatus, errorThrown) {
	        	$('#loadingHeader').css('display','none');
	            $('#btnCerrarModalPromo').css('display','');
	            $('#loadingCerrarModalPromo').css('display','none');
	            $("#modalErrorConexion").modal("show");
	        })
     		.always(function() {
     		});
	    }
	}

	// Acción Abrir Modal Cliente //
	$("#btnAddNewCliente").click(function(event) {
		$("#modalAddCliente").modal("show");
	});

	//
	$("#select_Cliente_Venta").change(function(event) {
		let ID_Cliente_Menudeo = $("#select_Cliente_Venta").val();

		if (ID_Cliente_Menudeo != null && ID_Cliente_Menudeo != ""){

			let formData = new FormData();
		    formData.append("ID", ID_Cliente_Menudeo);

			$.ajax({
		        url: window.dir + 'index.php/controller_Cliente/getClientesMenudeosById',
		        type: 'POST',
		        processData: false,
		        contentType: false,
		        timeout: 800000,
		        data: formData,
		        beforeSend : function ()
		        {
		            $('#loadingHeader').css('display','');
	                $('#btnVerPromocion').css('display','none');
	                $('#loadingVerPromocion').css('display','');
	                $('#btnAddVenta').css('display','none');
	                $('#loadingAddVenta').css('display','');
		        },
		        success: function(data)
		        {
		          	let parsed = JSON.parse(data);

					if (parsed != null && parsed != ""){
			        	$("#Descuento_Cliente_Menudeo").text(parsed[0]['Descuento_%']);
			        	calcular();
			        }
		        }
		    })
		    .done(function() {
		        $('#loadingHeader').css('display','none');
	            $('#btnVerPromocion').css('display','');
	            $('#loadingVerPromocion').css('display','none');
	            $('#btnAddVenta').css('display','');
	            $('#loadingAddVenta').css('display','none');
		    })
		    .fail(function() {
		        $('#loadingHeader').css('display','none');
	            $('#btnVerPromocion').css('display','');
	            $('#loadingVerPromocion').css('display','none');
	            $('#btnAddVenta').css('display','');
	            $('#loadingAddVenta').css('display','none');
	            $("#modalErrorConexion").modal("show");
		    })
		    .always(function() {
		    });
		}
		else{
			$("#Descuento_Cliente_Menudeo").text("");
			calcular();
		}
	});

	// Boton Abrir info Venta //
	$("#btnUpdateVenta").click(function (event) {
		$('#fetchListProductosAdd').DataTable().destroy();
		let Productos    = document.getElementById("fetchListProductosAdd"); 
		let Tbody 		 = Productos.tBodies[0];
		let Procentaje   = parseFloat($("#Descuento_Cliente_Menudeo").text()) / 100;
		let Total_Real 	 = 0;
		let Descuento 	 = 0;
		let Subtotal 	 = 0;
		let Impuestos  	 = 0;
		let Total 		 = 0;
		let Cliente      = $("#select_Cliente_Venta").val();

		if (Tbody.rows.length > 0){
			if (Cliente != null && Cliente != ""){

				for (var i = 0; i < Tbody.rows.length; i++){
					console.log(Tbody.rows[i].cells[4].innerHTML);
					Total_Real += parseFloat(Tbody.rows[i].cells[4].innerHTML);
				}

				console.log("Total_Real: " + Total_Real);

				Descuento 	= Total_Real * Procentaje;
				Total 		= Total_Real - Descuento;
				Subtotal 	= Total / 1.16;
				Impuestos 	= Total - Subtotal;

				console.log("Descuento: " + Descuento);
				console.log("Total: " + Total);
				console.log("Subtotal: " + Subtotal);
				console.log("Impuestos: " + Impuestos);

				$("#text_Subtotal").val(parseFloat(Subtotal).toFixed(2));
				$("#text_Impuestos").val(parseFloat(Impuestos).toFixed(2));
				$("#text_Descuento").val(parseFloat(Descuento).toFixed(2));
				$("#text_Total").val(Math.round(parseFloat(Total).toFixed(2)));
				$("#text_Total_Real").val(Math.round(parseFloat(Total_Real).toFixed(2)));

				$("#modalVistaPreviaVenta").modal("show");
			}
			else{
	            toastr.warning('Debe de seleccionar por lo menos a un cliente menudeo', 'Advertencia');
			}
		}
		else{
	         toastr.warning('No se encuentra ningún producto o promoción registrado', 'Advertencia');
		}

		fetch("fetchListProductosAdd");
	})

	// Boton Abrir info Venta //
	$("#btnAddVenta").click(function(event)
	{
		$('#fetchListProductosAdd').DataTable().destroy();
		let Productos    = document.getElementById("fetchListProductosAdd"); 
		let Tbody 		 = Productos.tBodies[0];
		let Procentaje   = parseFloat($("#Descuento_Cliente_Menudeo").text()) / 100;
		let Total_Real 	 = 0;
		let Descuento 	 = 0;
		let Subtotal 	 = 0;
		let Impuestos  	 = 0;
		let Total 		 = 0;
		let Cliente      = $("#select_Cliente_Venta").val();

		if (Tbody.rows.length > 0){
			if (Cliente != null && Cliente != ""){

				for (var i = 0; i < Tbody.rows.length; i++){
					Total_Real += parseFloat(Tbody.rows[i].cells[4].innerHTML);
				}

				Descuento 	= Total_Real * Procentaje;
				Total 		= Total_Real - Descuento;
				Subtotal 	= Total / 1.16;
				Impuestos 	= Total - Subtotal;

				$("#text_Subtotal").val(parseFloat(Subtotal).toFixed(2));
				$("#text_Impuestos").val(parseFloat(Impuestos).toFixed(2));
				$("#text_Descuento").val(parseFloat(Descuento).toFixed(2));
				$("#text_Total").val(Math.round(parseFloat(Total).toFixed(2)));
				$("#text_Total_Real").val(Math.round(parseFloat(Total_Real).toFixed(2)));

				$("#modalVistaPreviaVenta").modal("show");
			}
			else{
	            toastr.warning('Debe de seleccionar por lo menos a un cliente menudeo', 'Advertencia');
			}
		}
		else{
	         toastr.warning('No se encuentra ningún producto o promoción registrado', 'Advertencia');
		}

		fetch("fetchListProductosAdd");
	});

	$("#btnModificarVenta").click(function(event) {

		$('#fetchListProductosAdd').DataTable().destroy();
		let Productos       = document.getElementById("fetchListProductosAdd"); 
		let Tbody 			= Productos.tBodies[0];
		let Procentaje = 0;
		let idSucursal = 1;
		let idVenta        = $("#idVenta").val();

		/// Obtenemos el discuento del cliente menudeo ///
		if ($("#Descuento_Cliente_Menudeo").text() != null && $("#Descuento_Cliente_Menudeo").text() != "") {
			Procentaje = parseFloat($("#Descuento_Cliente_Menudeo").text()) / 100;
		}

		let Total_Real = 0;
		let Total_Real_Importe = 0;

		let array_IDCatalogo = new Array();
		let array_Cantidad = new Array();
		let array_Precio = new Array();
		let array_Importe = new Array();
		let array_SetOferta_Cata = new Array();

		let array_IDPromocion = new Array();
		let array_Cantidad_Promo = new Array();
		let array_Precio_Promo = new Array();
		let array_Importe_Promo = new Array();
		let array_SetOferta_Promo = new Array();

		let array_IDOferta = new Array();
		let array_Cantidad_Oferta = new Array();
		let array_Precio_Ofe = new Array();
		let array_Importe_Ofe = new Array();

		if (Tbody.rows.length > 0) {

			swal({
				title: "¿Segúro que desea modificar la venta menudeo?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			})
			.then((willDelete) => {
			if (willDelete){

				///// Validación Cargar Productos /////
				for (var i = 0; i < Tbody.rows.length; i++) {

					Total_Real += parseInt(Tbody.rows[i].cells[2].innerHTML) * parseFloat(Tbody.rows[i].cells[3].innerHTML);
					Total_Real_Importe += parseFloat(Tbody.rows[i].cells[4].innerHTML);

					if (Tbody.rows[i].cells[2].innerHTML != 0 && Tbody.rows[i].cells[4].innerHTML != 0) {
						if (Tbody.rows[i].cells[6].innerHTML == 0) {
							array_IDCatalogo.push(Tbody.rows[i].cells[0].innerHTML);
							array_Cantidad.push(Tbody.rows[i].cells[2].innerHTML);
							array_Precio.push(Tbody.rows[i].cells[3].innerHTML);
							array_Importe.push(parseInt(Tbody.rows[i].cells[2].innerHTML) * parseFloat(Tbody.rows[i].cells[3].innerHTML));
							array_SetOferta_Cata.push(Tbody.rows[i].cells[10].innerHTML);
						} 
						if (Tbody.rows[i].cells[6].innerHTML == 1) {
							array_IDPromocion.push(Tbody.rows[i].cells[0].innerHTML);
							array_Cantidad_Promo.push(Tbody.rows[i].cells[2].innerHTML);
							array_Precio_Promo.push(Tbody.rows[i].cells[3].innerHTML);
							array_Importe_Promo.push(parseInt(Tbody.rows[i].cells[2].innerHTML) * parseFloat(Tbody.rows[i].cells[3].innerHTML));
							array_SetOferta_Promo.push(Tbody.rows[i].cells[10].innerHTML);
						} 
						if (Tbody.rows[i].cells[6].innerHTML == 3) {
							array_IDOferta.push(Tbody.rows[i].cells[0].innerHTML);
							array_Cantidad_Oferta.push(Tbody.rows[i].cells[2].innerHTML);
							array_Precio_Ofe.push(Tbody.rows[i].cells[3].innerHTML);
							array_Importe_Ofe.push(parseInt(Tbody.rows[i].cells[2].innerHTML) * parseFloat(Tbody.rows[i].cells[3].innerHTML));
						}
					}
					else{
						if (Tbody.rows[i].cells[6].innerHTML == 3) {
							array_IDOferta.push(Tbody.rows[i].cells[0].innerHTML);
							array_Cantidad_Oferta.push(Tbody.rows[i].cells[2].innerHTML);
							array_Precio_Ofe.push(Tbody.rows[i].cells[3].innerHTML);
							array_Importe_Ofe.push(parseInt(Tbody.rows[i].cells[2].innerHTML) * parseFloat(Tbody.rows[i].cells[3].innerHTML));
						}
					}						
				}


				let Descuento =  Total_Real * Procentaje;
				let Total = Total_Real - Descuento;
				let Subtotal = Total / 1.16;
				let Impuestos = Total - Subtotal;
				let Total_R = Math.round(parseFloat(Total_Real).toFixed(2));
				let idCliente = $("#select_Cliente_Venta").val();

				let idVenta        = $("#idVenta").val();
				let idVentaMenudeo = $("#idVentaMenudeo").val();

			    let formData = new FormData();

			    if (array_IDCatalogo != null && array_IDCatalogo != ""){
			      	formData.append("idCatalogo", array_IDCatalogo);
			      	formData.append("Cantidad", array_Cantidad);
			      	formData.append("Precio", array_Precio);
			      	formData.append("Importe", array_Importe);
			      	formData.append("SetOferta_Cata", array_SetOferta_Cata);
				}

			    if (array_IDPromocion != null && array_IDPromocion != ""){
			      	formData.append("idPromocion", array_IDPromocion);
			      	formData.append("Cantidad_Promo", array_Cantidad_Promo);
			      	formData.append("Precio_Promo", array_Precio_Promo);
			      	formData.append("Importe_Promo", array_Importe_Promo);
			    }
			      
			    if (array_IDOferta != null && array_IDOferta != ""){
				    formData.append("idOferta", array_IDOferta);
				    formData.append("Cantidad_Ofe", array_Cantidad_Oferta);
				    formData.append("Precio_Ofe", array_Precio_Ofe);
				    formData.append("Importe_Ofe", array_Importe_Ofe);
				}

			    formData.append("idSucursal", idSucursal);
				formData.append("Subtotal", Subtotal);
				formData.append("Procentaje", Procentaje);
			    formData.append("Impuestos", Impuestos);
			    formData.append("Descuento", Descuento);
			    formData.append("Total", Total);
			    formData.append("Total_Real", Total_R);
				formData.append("idCliente", idCliente);
				formData.append("idVenta", idVenta);
			    formData.append("idVentaMenudeo", idVentaMenudeo);

				$.ajax({
			        url: window.dir + 'index.php/Controller_VentasDirectas/Valida_Existencias_Editar',
			        type: 'POST',
			        processData: false,
			        contentType: false,
			        timeout: 8000000,
			        data: formData,
			        beforeSend : function ()
			        {
			            $('#loadingHeader').css('display','');
			            $('#btnModificarVenta').css('display','none');
			            $('#loadingModificarVenta').css('display','');			           
			        },
			        success: function(data){

						console.log(data);
						
						if (!isNaN(data)) {
							openTab("" + dir + "Clases/Imprimir_Ticket.php?IdVenta=" + data + "");
							$("#modalVistaPreviaVenta").modal("hide");
							Limpiar(2);
							
							setTimeout(function(){ window.location.replace(window.dir + 'index.php/Controller_VentasDirectas'); }, 3000);
						}
						else if (data == "Error") {
							toastr.error('Ocurrio un error al almacenar la venta en el sistema', 'Error');
						}
						else{
							let parsed = JSON.parse(data);
							let Info_Completa = "";
							parsed.forEach(function (element) {
								Info_Completa = Info_Completa + "\n" + element;
							});
							swal("Error", "Algunos productos no cuentan con existencias suficientes para concluir la venta \n" + Info_Completa, "error");
							toastr.error('Algunos productos no cuentan con existencias suficientes para concluir la venta', 'Error');
						}
			        }
			    })
			    .done(function() {
			    	$('#loadingHeader').css('display','none');
		            $('#btnModificarVenta').css('display','');
		            $('#loadingModificarVenta').css('display','none');
			    })
			    .fail(function() {
			    	$('#loadingHeader').css('display','none');
		            $('#btnModificarVenta').css('display','');
		            $('#loadingModificarVenta').css('display','none');
		            $("#modalErrorConexion").modal("show");
			    })
			    .always(function() {
			    });
			}
		});
		}else{
			toastr.warning('No se encuentra ningún producto o promoción registrado', 'Advertencia');
		}
	});

	// Add Venta Menudeo //
	$("#btnRealizarVenta").click(function(event) {

		$('#fetchListProductosAdd').DataTable().destroy();
		let Productos = document.getElementById("fetchListProductosAdd");
		let Tbody = Productos.tBodies[0];
		let Procentaje = 0;
		let idSucursal = 1;

		/// Obtenemos el discuento del cliente menudeo ///
		if ($("#Descuento_Cliente_Menudeo").text() != null && $("#Descuento_Cliente_Menudeo").text() != "") {
			Procentaje = parseFloat($("#Descuento_Cliente_Menudeo").text()) / 100;
		}

		let Total_Real = 0;
		let Total_Real_Importe = 0;

		let array_IDCatalogo = new Array();
		let array_Cantidad = new Array();
		let array_Precio = new Array();
		let array_Importe = new Array();
		let array_SetOferta_Cata = new Array();

		let array_IDPromocion = new Array();
		let array_Cantidad_Promo = new Array();
		let array_Precio_Promo = new Array();
		let array_Importe_Promo = new Array();
		let array_SetOferta_Promo = new Array();

		let array_IDOferta = new Array();
		let array_Cantidad_Oferta = new Array();
		let array_Precio_Ofe = new Array();
		let array_Importe_Ofe = new Array();

		swal({
			title: "¿Segúro que desea registrar la venta menudeo?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete){

				for (var i = 0; i < Tbody.rows.length; i++){
					Total_Real += parseInt(Tbody.rows[i].cells[2].innerHTML) * parseFloat(Tbody.rows[i].cells[3].innerHTML);
					Total_Real_Importe += parseFloat(Tbody.rows[i].cells[4].innerHTML);
					
					if (Tbody.rows[i].cells[2].innerHTML != 0 && Tbody.rows[i].cells[4].innerHTML != 0) {
						if (Tbody.rows[i].cells[6].innerHTML == 0) {
							array_IDCatalogo.push(Tbody.rows[i].cells[0].innerHTML);
							array_Cantidad.push(Tbody.rows[i].cells[2].innerHTML);
							array_Precio.push(Tbody.rows[i].cells[3].innerHTML);
							array_Importe.push(parseInt(Tbody.rows[i].cells[2].innerHTML) * parseFloat(Tbody.rows[i].cells[3].innerHTML));
							array_SetOferta_Cata.push(Tbody.rows[i].cells[10].innerHTML);
						}
						if (Tbody.rows[i].cells[6].innerHTML == 1) {
							array_IDPromocion.push(Tbody.rows[i].cells[0].innerHTML);
							array_Cantidad_Promo.push(Tbody.rows[i].cells[2].innerHTML);
							array_Precio_Promo.push(Tbody.rows[i].cells[3].innerHTML);
							array_Importe_Promo.push(parseInt(Tbody.rows[i].cells[2].innerHTML) * parseFloat(Tbody.rows[i].cells[3].innerHTML));
							array_SetOferta_Promo.push(Tbody.rows[i].cells[10].innerHTML);
						}
						if (Tbody.rows[i].cells[6].innerHTML == 3) {
							array_IDOferta.push(Tbody.rows[i].cells[0].innerHTML);
							array_Cantidad_Oferta.push(Tbody.rows[i].cells[2].innerHTML);
							array_Precio_Ofe.push(Tbody.rows[i].cells[3].innerHTML);
							array_Importe_Ofe.push(parseInt(Tbody.rows[i].cells[2].innerHTML) * parseFloat(Tbody.rows[i].cells[3].innerHTML));
						}
					}
					else{
						if (Tbody.rows[i].cells[6].innerHTML == 3) {
							array_IDOferta.push(Tbody.rows[i].cells[0].innerHTML);
							array_Cantidad_Oferta.push(Tbody.rows[i].cells[2].innerHTML);
							array_Precio_Ofe.push(Tbody.rows[i].cells[3].innerHTML);
							array_Importe_Ofe.push(parseInt(Tbody.rows[i].cells[2].innerHTML) * parseFloat(Tbody.rows[i].cells[3].innerHTML));
						}
					}
				}

				let Descuento =  Total_Real * Procentaje;
				let Total = Total_Real - Descuento;
				let Subtotal = Total / 1.16;
				let Impuestos = Total - Subtotal;
				let Total_R = Math.round(parseFloat(Total_Real).toFixed(2));
				let idCliente = $("#select_Cliente_Venta").val();

			    let formData = new FormData();

			    if (array_IDCatalogo != null && array_IDCatalogo != ""){
			      	formData.append("idCatalogo", array_IDCatalogo);
			      	formData.append("Cantidad", array_Cantidad);
			      	formData.append("Precio", array_Precio);
			      	formData.append("Importe", array_Importe);
			      	formData.append("SetOferta_Cata", array_SetOferta_Cata);
				}

			    if (array_IDPromocion != null && array_IDPromocion != ""){
			      	formData.append("idPromocion", array_IDPromocion);
			      	formData.append("Cantidad_Promo", array_Cantidad_Promo);
			      	formData.append("Precio_Promo", array_Precio_Promo);
			      	formData.append("Importe_Promo", array_Importe_Promo);
			    }
			      
			    if (array_IDOferta != null && array_IDOferta != ""){
				    formData.append("idOferta", array_IDOferta);
				    formData.append("Cantidad_Ofe", array_Cantidad_Oferta);
				    formData.append("Precio_Ofe", array_Precio_Ofe);
				    formData.append("Importe_Ofe", array_Importe_Ofe);
				}

			    formData.append("idSucursal", idSucursal);
				formData.append("Subtotal", Subtotal);
				formData.append("Procentaje", Procentaje);
				formData.append("Impuestos", Impuestos);
				formData.append("Descuento", Descuento);
				formData.append("Total", Total);
				formData.append("Total_Real", Total_R);
				formData.append("idCliente", idCliente);

				$.ajax({
			        url: window.dir + 'index.php/Controller_VentasDirectas/Valida_Existencias',
			        type: 'POST',
			        processData: false,
			        contentType: false,
			        timeout: 8000000,
			        data: formData,
			        beforeSend : function ()
			        {
			            $('#loadingHeader').css('display','');
			            $('#btnRealizarVenta').css('display','none');
			            $('#loadingRealizarVenta').css('display','');			           
			        },
			        success: function(data){

						console.log(data);
						
						if (!isNaN(data)) {
							openTab("" + dir + "Clases/Imprimir_Ticket.php?IdVenta=" + data + "");
							toastr.success('Productos con existencias suficientes', 'Correcto');
							$("#modalVistaPreviaVenta").modal("hide");
							Limpiar(2);
						} 
						else if (data == "Error"){
							toastr.error('Ocurrio un error al almacenar la venta en el sistema', 'Error');
						}
						else{
							let parsed = JSON.parse(data);
							console.log(parsed);
							let Info_Completa = "";
							parsed.forEach(function (element) {
								Info_Completa = Info_Completa + "\n" + element;
							});
							swal("Error", "Algunos productos no cuentan con existencias suficientes para concluir la venta \n" + Info_Completa, "error");
							toastr.error('Algunos productos no cuentan con existencias suficientes para concluir la venta', 'Error');
						}

			          	// if (parseInt(data.trim()) != 0 && !isNaN(data.trim())){

				        //   	toastr.options = {
			            //         "closeButton": true,
			            //         "debug": false,
			            //         "newestOnTop": true,
			            //         "progressBar": true,
			            //         "positionClass": "toast-top-right",
			            //         "preventDuplicates": false,
			            //         "onclick": null,
			            //         "showDuration": "300",
			            //         "hideDuration": "1000",
			            //         "timeOut": "850",
			            //         "extendedTimeOut": "1000",
			            //         "showEasing": "swing",
			            //         "hideEasing": "linear",
			            //         "showMethod": "fadeIn",
			            //         "hideMethod": "fadeOut",
	                    //         "onHidden": function(){openTab(""+window.dir+"Clases/Imprimir_Ticket.php?IdVenta=" + parseInt(data.trim()) + "");}
			            //     }

		                // 	toastr.success('Productos con existencias suficientes', 'Correcto');

		                // 	$("#modalVistaPreviaVenta").modal("hide");
		                // 	Limpiar(2);
			          	// }
			          	// else if (parseInt(data.trim()) == 0){
		                // 	toastr.error('Ocurrio un error al almacenar la venta en el sistema', 'Error');
			          	// }
			          	// else{
				        //   	let parsed = JSON.parse(data);
				        //   	let Info_Completa = "";

				        //   	parsed.forEach(function(element)
				        //   	{
						// 	  console.log(element);
						// 	  Info_Completa = Info_Completa + "\n" + element;
						// 	});

						// 	swal("Error", "Algunos productos no cuentan con existencias suficientes para concluir la venta \n" + Info_Completa, "error");
		                // 	toastr.error('Algunos productos no cuentan con existencias suficientes para concluir la venta', 'Error');
			          	// }
			        }
			    })
			    .done(function() {
			    	$('#loadingHeader').css('display','none');
		            $('#btnRealizarVenta').css('display','');
		            $('#loadingRealizarVenta').css('display','none');
			    })
			    .fail(function() {
			    	$('#loadingHeader').css('display','none');
		            $('#btnRealizarVenta').css('display','');
		            $('#loadingRealizarVenta').css('display','none');
		            $("#modalErrorConexion").modal("show");
			    })
			    .always(function() {
			    });
			}
		});
	});
	// $("#btnRealizarVenta").click(function(event) {

	// 	swal({
	// 		title: "¿Segúro que desea registrar la venta menudeo?",
	// 		icon: "warning",
	// 		buttons: true,
	// 		dangerMode: true,
	// 	})
	// 	.then((willDelete) => {
	// 		if (willDelete)
	// 		{
	// 		  	$('#fetchListProductosAdd').DataTable().destroy();
	// 		  	let Productos       = document.getElementById("fetchListProductosAdd"); 
	// 			let Tbody 			= Productos.tBodies[0];

	// 			let array_IDCatalogo = new Array();
	// 			let array_Cantidad   = new Array();
	// 			let array_Precio 	 = new Array();
	// 			let array_Importe    = new Array();
	// 			let array_SetOferta_Cata  = new Array();

	// 			let array_IDPromocion 	   = new Array();
	// 			let array_Cantidad_Promo   = new Array();
	// 			let array_Precio_Promo 	   = new Array();
	// 			let array_Importe_Promo    = new Array();
	// 			let array_SetOferta_Promo  = new Array();

	// 			let array_IDOferta 	   	   = new Array();
	// 			let array_Cantidad_Oferta  = new Array();
	// 			let array_Precio_Ofe 	   = new Array();
	// 			let array_Importe_Ofe      = new Array();


	// 			for (var i = 0; i < Tbody.rows.length; i++){
	// 				if (Tbody.rows[i].cells[6].innerHTML == 0){
	// 					array_IDCatalogo.push(Tbody.rows[i].cells[0].innerHTML);
	// 					array_Cantidad.push(Tbody.rows[i].cells[2].innerHTML);
	// 					array_Precio.push(Tbody.rows[i].cells[3].innerHTML);
	// 					array_Importe.push(Tbody.rows[i].cells[4].innerHTML);
	// 					array_SetOferta_Cata.push(Tbody.rows[i].cells[10].innerHTML);
	// 				}
	// 				else if (Tbody.rows[i].cells[6].innerHTML == 1){
	// 					array_IDPromocion.push(Tbody.rows[i].cells[0].innerHTML);
	// 					array_Cantidad_Promo.push(Tbody.rows[i].cells[2].innerHTML);
	// 					array_Precio_Promo.push(Tbody.rows[i].cells[3].innerHTML);
	// 					array_Importe_Promo.push(Tbody.rows[i].cells[4].innerHTML);
	// 					array_SetOferta_Promo.push(Tbody.rows[i].cells[10].innerHTML);
	// 				}
	// 				else if (Tbody.rows[i].cells[6].innerHTML == 3){
	// 					array_IDOferta.push(Tbody.rows[i].cells[0].innerHTML);
	// 					array_Cantidad_Oferta.push(Tbody.rows[i].cells[2].innerHTML);
	// 					array_Precio_Ofe.push(Tbody.rows[i].cells[3].innerHTML);
	// 					array_Importe_Ofe.push(Tbody.rows[i].cells[4].innerHTML);
	// 				}
	// 			}

	// 			let Subtotal  = $("#text_Subtotal").val();
	// 			let Impuestos = $("#text_Impuestos").val();
	// 			let Descuento = $("#text_Descuento").val();
	// 			let Total 	  = $("#text_Total").val();
	// 			let Total_R   = $("#text_Total_Real").val();
	// 			let idCliente = $("#select_Cliente_Venta").val();

	// 		    let formData = new FormData();

	// 		    if (array_IDCatalogo != null && array_IDCatalogo != ""){
	// 		      	formData.append("idCatalogo", array_IDCatalogo);
	// 		      	formData.append("Cantidad", array_Cantidad);
	// 		      	formData.append("Precio", array_Precio);
	// 		      	formData.append("Importe", array_Importe);
	// 		      	formData.append("SetOferta_Cata", array_SetOferta_Cata);
	// 			}


	// 		    if (array_IDPromocion != null && array_IDPromocion != ""){
	// 		      	formData.append("idPromocion", array_IDPromocion);
	// 		      	formData.append("Cantidad_Promo", array_Cantidad_Promo);
	// 		      	formData.append("Precio_Promo", array_Precio_Promo);
	// 		      	formData.append("Importe_Promo", array_Importe_Promo);
	// 		    }
			      
	// 		    if (array_IDOferta != null && array_IDOferta != ""){
	// 			    formData.append("idOferta", array_IDOferta);
	// 			    formData.append("Cantidad_Ofe", array_Cantidad_Oferta);
	// 			    formData.append("Precio_Ofe", array_Precio_Ofe);
	// 			    formData.append("Importe_Ofe", array_Importe_Ofe);
	// 			}

	// 		    formData.append("idSucursal", idSucursal);
	// 		    formData.append("Subtotal", Subtotal);
	// 		    formData.append("Impuestos", Impuestos);
	// 		    formData.append("Descuento", Descuento);
	// 		    formData.append("Total", Total);
	// 		    formData.append("Total_Real", Total_R);
	// 		    formData.append("idCliente", idCliente);

	// 			$.ajax({
	// 		        url: window.dir + 'index.php/Controller_VentasDirectas/addVentasMenudeo',
	// 		        type: 'POST',
	// 		        processData: false,
	// 		        contentType: false,
	// 		        timeout: 8000000,
	// 		        data: formData,
	// 		        beforeSend : function ()
	// 		        {
	// 		            $('#loadingHeader').css('display','');
	// 		            $('#btnRealizarVenta').css('display','none');
	// 		            $('#loadingRealizarVenta').css('display','');			           
	// 		        },
	// 		        success: function(data)
	// 		        {

	// 		        	console.log(data);

	// 		          	if (parseInt(data.trim()) != 0 && !isNaN(data.trim())){

	// 			          	toastr.options = {
	// 		                    "closeButton": true,
	// 		                    "debug": false,
	// 		                    "newestOnTop": true,
	// 		                    "progressBar": true,
	// 		                    "positionClass": "toast-top-right",
	// 		                    "preventDuplicates": false,
	// 		                    "onclick": null,
	// 		                    "showDuration": "300",
	// 		                    "hideDuration": "1000",
	// 		                    "timeOut": "850",
	// 		                    "extendedTimeOut": "1000",
	// 		                    "showEasing": "swing",
	// 		                    "hideEasing": "linear",
	// 		                    "showMethod": "fadeIn",
	// 		                    "hideMethod": "fadeOut",
	//                             "onHidden": function(){openTab(""+window.dir+"Clases/Imprimir_Ticket.php?IdVenta=" + parseInt(data.trim()) + "");}
	// 		                }

	// 	                	toastr.success('Productos con existencias suficientes', 'Correcto');

	// 	                	$("#modalVistaPreviaVenta").modal("hide");
	// 	                	Limpiar(2);
	// 		          	}
	// 		          	else if (parseInt(data.trim()) == 0){
	// 	                	toastr.error('Ocurrio un error al almacenar la venta en el sistema', 'Error');
	// 		          	}
	// 		          	else{
	// 			          	let parsed = JSON.parse(data);
	// 			          	let Info_Completa = "";

	// 			          	parsed.forEach(function(element)
	// 			          	{
	// 						  console.log(element);
	// 						  Info_Completa = Info_Completa + "\n" + element;
	// 						});

	// 						swal("Error", "Algunos productos no cuentan con existencias suficientes para concluir la venta \n" + Info_Completa, "error");
	// 	                	toastr.error('Algunos productos no cuentan con existencias suficientes para concluir la venta', 'Error');
	// 		          	}
	// 		        }
	// 		    })
	// 		    .done(function() {
	// 		    	$('#loadingHeader').css('display','none');
	// 	            $('#btnRealizarVenta').css('display','');
	// 	            $('#loadingRealizarVenta').css('display','none');
	// 		    })
	// 		    .fail(function() {
	// 		    	$('#loadingHeader').css('display','none');
	// 	            $('#btnRealizarVenta').css('display','');
	// 	            $('#loadingRealizarVenta').css('display','none');
	// 	            $("#modalErrorConexion").modal("show");
	// 		    })
	// 		    .always(function() {
	// 		    });
	// 		}
	// 	});
	// });

	// Boton Facturar //
	$("#btnFacturar").click(function(event) {
		
		let RFC 	= $("#txtRFCInfo").val();
		let Empresa = $("#txtClienteInfo").val();
		let CP 		= $("#txtCPInfo").val();
		let UsoCFDi	= $("#selectUsoCFDi").val();
		let Pago    = $("#selectFormaPago").val();
		let Metodo  = $("#selectMetodoPago").val();
		let Observa = $("#txtObservacionesInfo").val();

		let formData = new FormData();
		formData.append("RFC", RFC);
	    formData.append("Empresa", Empresa);
	    formData.append("CP", CP);
	    formData.append("idVenta", globalVenta);
	    formData.append("idClienteMenudeo", globalidClienteMenudeo);
	    formData.append("UsoCFDi", UsoCFDi);
	    formData.append("Pago", Pago);
	    formData.append("Metodo", Metodo);
	    formData.append("Observa", Observa);

		$.ajax({
	        url: window.dir + 'index.php/Controller_VentasDirectas/addFacturaDirecta',
	        type: 'POST',
	        processData: false,
	        contentType: false,
	        timeout: 8000000,
	        data: formData,
	        beforeSend : function ()
	        {
	            $('#loadingHeader').css('display','');
	            $('#btnCerrarModalInfo').css('display','none');
	            $('#loadingCerrarModalInfo').css('display','');
	            $('#btnFacturar').css('display','none');
	            $('#loadingFacturar').css('display','');			           
	        },
	        success: function(data)
	        {
	        	console.log(data);

	        	switch(parseInt(data.trim())){
                 	case 0:
                 		Limpiar(3);
                 		toastr.error('Ocurrio un error al registrar la factura en el sistema', 'Error');
                 	break;

                 	case 1:
                 		Limpiar(3);
                 		toastr.success('Factura timbrada con exito','Correcto');
                 	break;

                 	case 2:
                 		Limpiar(3);
                 		toastr.error('Ocurrio un error al leer el UUID de la factura timbrada','Error');
                 	break;

                 	case 3:
                 		toastr.error('Ocurrio un error al obtener el XML timbrado','Error');
                 	break;

                 	case 4:
                 		toastr.error('Los saldos de la venta no conciden con los calculados','Error');
                 	break;

                 	default:
                 		toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                }
            }
	    })
	    .done(function() {
	    	$('#loadingHeader').css('display','none');
            $('#btnCerrarModalInfo').css('display','');
            $('#loadingCerrarModalInfo').css('display','none');
            $('#btnFacturar').css('display','');
	        $('#loadingFacturar').css('display','none');
	    })
	    .fail(function() {
	    	$('#loadingHeader').css('display','none');
            $('#btnCerrarModalInfo').css('display','');
            $('#loadingCerrarModalInfo').css('display','none');
            $('#btnFacturar').css('display','');
	        $('#loadingFacturar').css('display','none');

            $("#modalErrorConexion").modal("show");
	    })
	    .always(function() {
	    });
	});

	/// Change Forma de Pago ///
    $('#selectFormaPago').change(function(event) {
    	($('#selectFormaPago').val() == 99) ? $('#selectMetodoPago').val('PPD') : $('#selectMetodoPago').val('PUE');	 
	});

	/// Change Metodo Pago ///
	$('#selectMetodoPago').change(function(event) {
 		($('#selectMetodoPago').val() == 'PPD') ? $('#selectFormaPago').val('99') : $('#selectFormaPago').val('01');
	});

	// Obtener Informacion tabla promoción //
	document.getElementById("fetchVentasDirectas").onclick = function(e)
	{
		globalFetchVentasDirectas = e.target.parentNode;

		let formData = new FormData();
		formData.append("idVenta", globalFetchVentasDirectas.childNodes[0].innerHTML);

		$.ajax({
	        url: window.dir + 'index.php/Controller_VentasDirectas/getInfoDetalleVentaDirecta',
	        type: 'POST',
	        processData: false,
	        contentType: false,
	        timeout: 8000000,
	        data: formData,
	        beforeSend : function ()
	        {
	            $('#loadingHeader').css('display','');		           
	        },
	        success: function(data)
	        {
				let parsed = JSON.parse(data);
				
				console.log(parsed);

	        	let table = document.getElementById("fetchDetalleVentasDirectas");
                let tbody = table.tBodies[0];

                $('#fetchDetalleVentasDirectas').DataTable().destroy();
				table.tBodies[0].innerHTML = "";
				
				console.log(parsed.length);

                for (var i = 0; i < parsed.length; i++) {

                    let row = tbody.insertRow(i);
                    let cel1 = row.insertCell(0);
                    let cel2 = row.insertCell(1);
                    let cel3 = row.insertCell(2);
                    let cel4 = row.insertCell(3);
                    let cel5 = row.insertCell(4);

                    cel1.innerHTML = parsed[i]['ID'];
                    cel2.innerHTML = parsed[i]['Producto'];
                    cel3.innerHTML = parsed[i]['Cantidad'];
                    cel4.innerHTML = parsed[i]['Precio_unitario'];
                    cel5.innerHTML = parsed[i]['Importe'];
                }

                fetch("fetchDetalleVentasDirectas");
            }
	    })
	    .done(function() {
	    	$('#loadingHeader').css('display','none');
	    })
	    .fail(function() {
	    	$('#loadingHeader').css('display','none');
            $("#modalErrorConexion").modal("show");
	    })
	    .always(function() {
	    });
	}

});

function check(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8 || tecla == 32 || tecla == 241) {
        return true;
    }

    // Patron de entrada, en este caso solo acepta numeros y letras
    patron = /[A-Za-z0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

// Agregar Promoción //
var AddPromo = function (event){
	
	let row = this.parentNode.parentNode;

	let formData = new FormData();
	formData.append("idSucursal", idSucursal);
	formData.append("idPromocion", row.childNodes[0].innerHTML);

	$.ajax({
  		url: window.dir + 'index.php/Controller_VentasDirectas/validateExistenciasPromo',
  		type: 'POST',
  		processData: false,  // tell jQuery not to process the data
        contentType: false,
        timeout: 800000,
        data: formData,
        beforeSend : function ()
        {
            $('#loadingHeader').css('display','');
            $('#btnVerPromocion').css('display','none');
            $('#loadingVerPromocion').css('display','');
            $('#btnAddVenta').css('display','none');
            $('#loadingAddVenta').css('display','');
        },
        success: function(data)
        {
        	console.log(data);

        	if (parseInt(data.trim()) == 1){

				let ID 		 = row.childNodes[0].innerHTML;
				let Producto = row.childNodes[1].innerHTML;
				let Precio 	 = row.childNodes[2].innerHTML;
				let Cantidad = 1;
				let Importe  = parseFloat(Cantidad * Precio).toFixed(2);
				let Contador = 0;
				let Segundo_Cantidad = 0;
				let Fila_Eliminar = "";
				let idDivision          = null;
				let idLinea          	= null;
				let idSublinea          = null;

				let Productos       = document.getElementById("fetchListProductosAdd"); 
				let Tbody 			= Productos.tBodies[0];

				if (Tbody.rows.length > 0){
					for (var i = 0; i < Tbody.rows.length; i++){
						if (ID == Tbody.rows[i].cells[0].innerHTML && Tbody.rows[i].cells[6].innerHTML == 1){
							Contador = 1;
							Segundo_Cantidad = Tbody.rows[i].cells[2].innerHTML;
							Fila_Eliminar = Tbody.rows[i];
							break;
						}
						else{
							Contador = 0;
						}
					}

					if (Contador == 1){

						$('#fetchListProductosAdd').DataTable().destroy();

						let Cantidad_Total = parseInt(Cantidad) + parseInt(Segundo_Cantidad);
						console.log(Cantidad_Total);
						let Importe_Total = parseFloat(Cantidad_Total * Precio).toFixed(2);
						let tbody = document.querySelector("#fetchListProductosAdd").tBodies[0];
			    		tbody.removeChild(Fila_Eliminar);

			    		for (var i = 0; i <= 0; i++){
					       let row  = Tbody.insertRow(i);
					       row.style.background="aliceblue";
					       let cel1 = row.insertCell(0);
					       let cel2 = row.insertCell(1);
					       let cel3 = row.insertCell(2);
					       let cel4 = row.insertCell(3);
					       let cel5 = row.insertCell(4);
					       let cel6 = row.insertCell(5);
					       let cel7 = row.insertCell(6);
					       let cel8 = row.insertCell(7);
						   let cel9 = row.insertCell(8);
						   let cel10 = row.insertCell(9);
						   let cel11 = row.insertCell(10);


					       cel1.innerHTML = ID;
						   cel2.innerHTML = Producto;
						   cel3.innerHTML = Cantidad_Total;
						   cel4.innerHTML = Precio;
						   cel5.innerHTML = Importe_Total;
						   cel7.innerHTML = 1;
						   cel7.setAttribute("hidden","hidden");
						   cel8.innerHTML = idDivision;
						   cel8.setAttribute("hidden","hidden");
						   cel9.innerHTML = idLinea;
						   cel9.setAttribute("hidden","hidden");
						   cel10.innerHTML = idSublinea;
						   cel10.setAttribute("hidden","hidden");
						   cel11.innerHTML = 0;
						   cel11.setAttribute("hidden","hidden");

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs');
						    boton1.addEventListener("click",eliminarProducto);
						    cel6.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);
						}

						fetch("fetchListProductosAdd");
						calcular();
					}
					else{

						$('#fetchListProductosAdd').DataTable().destroy();

						for (var i = 0; i <= 0; i++){
					       let row  = Tbody.insertRow(i);
					       row.style.background="aliceblue";
					       let cel1 = row.insertCell(0);
					       let cel2 = row.insertCell(1);
					       let cel3 = row.insertCell(2);
					       let cel4 = row.insertCell(3);
					       let cel5 = row.insertCell(4);
					       let cel6 = row.insertCell(5);
					       let cel7 = row.insertCell(6);
					       let cel8 = row.insertCell(7);
						   let cel9 = row.insertCell(8);
						   let cel10 = row.insertCell(9);
						   let cel11 = row.insertCell(10);

					       cel1.innerHTML = ID;
						   cel2.innerHTML = Producto;
						   cel3.innerHTML = Cantidad;
						   cel4.innerHTML = Precio;
						   cel5.innerHTML = Importe;
						   cel7.innerHTML = 1;
						   cel7.setAttribute("hidden","hidden");
						   cel8.innerHTML = idDivision;
						   cel8.setAttribute("hidden","hidden");
						   cel9.innerHTML = idLinea;
						   cel9.setAttribute("hidden","hidden");
						   cel10.innerHTML = idSublinea;
						   cel10.setAttribute("hidden","hidden");
						   cel11.innerHTML = 0;
						   cel11.setAttribute("hidden","hidden");

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs');
						    boton1.addEventListener("click",eliminarProducto);
						    cel6.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);
						}

						fetch("fetchListProductosAdd");
						calcular();
					}
				}
				else{

					$('#fetchListProductosAdd').DataTable().destroy();

					for (var i = 0; i <= 0; i++){
				       let row  = Tbody.insertRow(i);
				       row.style.background="aliceblue";
				       let cel1 = row.insertCell(0);
				       let cel2 = row.insertCell(1);
				       let cel3 = row.insertCell(2);
				       let cel4 = row.insertCell(3);
				       let cel5 = row.insertCell(4);
				       let cel6 = row.insertCell(5);
				       let cel7 = row.insertCell(6);
				       let cel8 = row.insertCell(7);
					   let cel9 = row.insertCell(8);
					   let cel10 = row.insertCell(9);
					   let cel11 = row.insertCell(10);

				       cel1.innerHTML = ID;
					   cel2.innerHTML = Producto;
					   cel3.innerHTML = Cantidad;
					   cel4.innerHTML = Precio;
					   cel5.innerHTML = Importe;
					   cel7.innerHTML = 1;
					   cel7.setAttribute("hidden","hidden");
					   cel8.innerHTML = idDivision;
					   cel8.setAttribute("hidden","hidden");
					   cel9.innerHTML = idLinea;
					   cel9.setAttribute("hidden","hidden");
					   cel10.innerHTML = idSublinea;
					   cel10.setAttribute("hidden","hidden");
					   cel11.innerHTML = 0;
					   cel11.setAttribute("hidden","hidden");

					   	let boton1 = document.createElement("button");
					    boton1.classList.add('btn', 'btn-danger', 'btn-xs');
					    boton1.addEventListener("click",eliminarProducto);
					    cel6.appendChild(boton1);

					    let icono1 = document.createElement("span");
					    icono1.classList.add('glyphicon', 'glyphicon-trash');
					    boton1.appendChild(icono1);
					}

					fetch("fetchListProductosAdd");
					calcular();
				}	
			    toastr.success('Promoción agregado', 'Correcto');
			}
			else{
				swal("Advertencia", "El Producto " + data + " no cuenta con existencias disponibles", "error");
			}
		}
  	})
  	.done(function() {
  		$('#loadingHeader').css('display','none');
        $('#btnVerPromocion').css('display','');
        $('#loadingVerPromocion').css('display','none');
        $('#btnAddVenta').css('display','');
        $('#loadingAddVenta').css('display','none');
  	})
  	.fail(function(jqXHR, textStatus, errorThrown) {
  		$('#loadingHeader').css('display','none');
        $('#btnVerPromocion').css('display','');
        $('#loadingVerPromocion').css('display','none');
        $('#btnAddVenta').css('display','');
        $('#loadingAddVenta').css('display','none');
        $("#modalErrorConexion").modal("show");
    })
    .always(function() {
    });	
}

///// Acción Descargar XML y PDF //////
function Descargar(row) {
	window.open(""+window.dir+"Clases/Reportes/Formato_Facturacion_33_Ventas_Directas.php?ID="+row.childNodes[0].innerHTML+"");
	window.open(""+window.dir+"Clases/RecuperarXML.php?ID="+row.childNodes[0].innerHTML+"");
}


////// Acción Pagar ///////
function Pagar(row) {
	$("#modalPagosClient").modal("show");
	$("#PagoVenta").text(row.childNodes[0].innerHTML);
	$("#Cantidad_Pagar").val(row.childNodes[4].innerHTML);
}

////// Acción Editar ////////
function Editar(row) {
	console.log(row.childNodes[6].childNodes[0].innerHTML);
	window.location.replace(window.dir + 'index.php/Controller_VentasDirectas/index_Editar/' + row.childNodes[0].innerHTML);
}


function Eliminar_Producto_Oferta_Funcion(row) {

	$('#fetchListProductosAdd').DataTable().destroy();
	let tbody = document.querySelector("#fetchListProductosAdd").tBodies[0];
	for (var i = 0; i < tbody.rows.length; i++) {
		console.log(tbody.rows[i].cells[10].innerHTML);
		if (row.childNodes[0].innerHTML == tbody.rows[i].cells[10].innerHTML) {
			tbody.rows[i].cells[10].innerHTML = 0;
		}
	}
	tbody.removeChild(row);
	if (tbody.rows.length > 0) {
		fetch("fetchListProductosAdd");
	}
	calcular();
}


function Eliminar_Producto_Funcion(row,Setoferta) {
	$('#fetchListProductosAdd').DataTable().destroy();
	let tbody = document.querySelector("#fetchListProductosAdd").tBodies[0];
	if (Setoferta == 0) {
		tbody.removeChild(row);
		toastr.success('El producto eliminado con exito', 'Correcto');
		if (tbody.rows.length > 0) {fetch("fetchListProductosAdd");}
		calcular();
	} else {
		toastr.error('El producto ya tiene una oferta asignada', 'Incorrecto');
		if (tbody.rows.length > 0) {fetch("fetchListProductosAdd");}
		calcular();
	}
}

////// Acción Eliminar ////////
function Remove(row) {
	console.log(row.childNodes[0].innerHTML);
	swal({
		title: "¿Esta seguro que desea eliminar la venta?",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		if (willDelete) {

			let formData = new FormData();
			formData.append("idVenta", row.childNodes[0].innerHTML);

			$.ajax({
				url: window.dir + 'index.php/Controller_VentasDirectas/deleteVenta',
				type: 'POST',
				processData: false,
				contentType: false,
				timeout: 800000,
				data: formData,
			  beforeSend : function ()
			  {
				  $("#Cargando_Header").css('display','');
				  $('#loadingHeader').css('display','');
				  $('#btnVerPromocion').css('display','none');
				  $('#loadingVerPromocion').css('display','');
				  $('#btnAddVenta').css('display','none');
				  $('#loadingAddVenta').css('display','');
			  },
			  success: function(data)
			  {
				  console.log(data.trim());
				  switch (parseInt(data.trim())) {
					case 1:
						toastr.success('Venta eliminada con exito', 'Correcto');
						Limpiar(2);						
					break;
					case 0:
						toastr.error('Ocurrio un error al tratar de eliminar la venta', 'Correcto');
					break;
				  }
			  }
			})
			.done(function() {
				$("#Cargando_Header").css('display','none');
				$('#loadingHeader').css('display','none');
			  $('#btnVerPromocion').css('display','');
			  $('#loadingVerPromocion').css('display','none');
			  $('#btnAddVenta').css('display','');
			  $('#loadingAddVenta').css('display','none');
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				$("#Cargando_Header").css('display','none');
				$('#loadingHeader').css('display','none');
			  $('#btnVerPromocion').css('display','');
			  $('#loadingVerPromocion').css('display','none');
			  $('#btnAddVenta').css('display','');
			  $('#loadingAddVenta').css('display','none');
			  $("#modalErrorConexion").modal("show");
		  })
		  .always(function() {
			$("#Cargando_Header").css('display','none');
		  });	
		}
	});
}

function addImage(e){
	var file = e.target.files[0],
	imageType = /image.*/;

	if (!file.type.match(imageType))
		return;

	var reader = new FileReader();
	reader.onload = fileOnload;
	reader.readAsDataURL(file);
}
  
function fileOnload(e) {
	var result=e.target.result;
	$('#imgSalida').attr("src",result);
}

///// Abrir Modal Facturar //////
function Facturar(row){

	console.log(row.childNodes[2].childNodes[1].innerHTML);

	globalVenta = row.childNodes[0].innerHTML;
	globalidClienteMenudeo = row.childNodes[2].childNodes[1].innerHTML;

	$("#modalInfoCliente").modal("show");

	let formData = new FormData();
	formData.append("idVenta", row.childNodes[0].innerHTML);
	formData.append("idClienteMenudeo", row.childNodes[2].childNodes[1].innerHTML);

	$.ajax({
  		url: window.dir + 'index.php/Controller_VentasDirectas/GetinfoClienteMenudeoByIdVenta',
  		type: 'POST',
  		processData: false,  // tell jQuery not to process the data
        contentType: false,
        timeout: 800000,
        data: formData,
        beforeSend : function ()
        {
            $('#loadingHeader').css('display','');
            $('#btnCerrarModalInfo').css('display','none');
            $('#loadingCerrarModalInfo').css('display','');
            $('#btnFacturar').css('display','none');
            $('#loadingFacturar').css('display','');
        },
        success: function(data)
        {
        	console.log(data);
        	let parsed = JSON.parse(data);

        	$("#txtClienteInfo").val(parsed[0]['Empresa']);
        	$("#txtRFCInfo").val(parsed[0]['RFC']);
        	$("#txtCPInfo").val(parsed[0]['CP']);
        	$(".txtColoniaInfo").val(parsed[0]['Colonia']);
		}
  	})
  	.done(function() {
  		$('#loadingHeader').css('display','none');
        $('#btnCerrarModalInfo').css('display','');
        $('#loadingCerrarModalInfo').css('display','none');
        $('#btnFacturar').css('display','');
        $('#loadingFacturar').css('display','none');
  	})
  	.fail(function(jqXHR, textStatus, errorThrown) {
  		$('#loadingHeader').css('display','none');
        $('#btnCerrarModalInfo').css('display','');
        $('#loadingCerrarModalInfo').css('display','none');
        $('#btnFacturar').css('display','');
        $('#loadingFacturar').css('display','none');
        $("#modalErrorConexion").modal("show");
    })
    .always(function() {
    });
}

///// Agregar Oferta /////
var AddOferta = function (event){
	
	let row = this.parentNode.parentNode;

	let division = new Array();
	let Linea 	 = new Array();
	let Sublinea = new Array();
	let Producto = new Array();
	let Regalo   = new Array();

	let Total_Compra = 0;

	let ID_Catalogo     = new Array();
	let Catalogo        = new Array();
	let Importe         = new Array();
	let idDivision      = new Array();
	let idLinea         = new Array();
	let idSublinea      = new Array();
	let SetOferta       = new Array();

	let Productos       = document.getElementById('fetchListProductosAdd'); 
	let Tbody 			= document.getElementById('fetchListProductosAdd').tBodies[0];

	let ID_Oferta = row.childNodes[0].innerHTML;
	let Oferta    = row.childNodes[1].innerHTML;
	let Cantidad_Ofe  = 0;
	let Precio_Ofe    = 0;
	let Importe_Ofe   = 0;
	let Contador_Agregar = 0;
	let Oferta_Aplicada = 0;
	let Desc_Porcentaje = 0;

	if (Tbody.rows.length > 0)
	{
		let formData = new FormData();
    	formData.append("ID", row.childNodes[0].innerHTML);
    	formData.append("IDCliente", idCliente);

		$.ajax({
	    	url: window.dir + 'index.php/Controller_VentasDirectas/getDetalleOferta',
	    	type: 'POST',
	    	processData: false,  // tell jQuery not to process the data
	        contentType: false,
	        timeout: 800000,
	        data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnCerrarModalPromo').css('display','none');
                $('#loadingCerrarModalPromo').css('display',''); 
            },
            success: function(data)
            {
		        let parsed = JSON.parse(data);

            	$('#fetchListProductosAdd').DataTable().destroy();
            	let Productos1       = document.getElementById('fetchListProductosAdd'); 
				let Tbody1 			= document.getElementById('fetchListProductosAdd').tBodies[0];

            	let Tabla_Di       = document.getElementById("ofeDivision"); 
				let Tbody_Di 		= Tabla_Di.tBodies[0];

				let Tabla_Li       = document.getElementById("ofeLinea"); 
				let Tbody_Li 		= Tabla_Li.tBodies[0];

				let Tabla_Su       = document.getElementById("ofeSublinea"); 
				let Tbody_Su 		= Tabla_Su.tBodies[0];

				let Tabla_Po       = document.getElementById("ofeProductos"); 
				let Tbody_Po 		= Tabla_Po.tBodies[0];

				let Tabla_Re       = document.getElementById("ofeRegalo"); 
				let Tbody_Re 		= Tabla_Re.tBodies[0];

            	if (parsed != null && parsed != ""){
					for (var i = 0; i < parsed.length; i++){
						if (parsed[i]['idDivision'] != null){
							division.push(parsed[i]['idDivision']);
						}

						if (parsed[i]['idLinea'] != null){
							Linea.push(parsed[i]['idLinea']);
						}

						if (parsed[i]['idSublinea'] != null){
							Sublinea.push(parsed[i]['idSublinea']);
						}

						if (parsed[i]['idCatalogo'] != null){
							Producto.push(parsed[i]['idCatalogo']);
						}

						if (parsed[i]['idRegalo'] != null){
							Regalo.push(parsed[i]['idRegalo']);
						}
		            }

		            for (var i = 0; i < Tbody1.rows.length; i++){
						let Contador = 0;

						if (Tbody1.rows[i].cells[6].innerHTML == 0 && Tbody1.rows[i].cells[10].innerHTML == 0){
							if (Contador == 0){
								for (var x = 0; x < division.length; x++){
									if (Tbody1.rows[i].cells[7].innerHTML == division[x]){
										Total_Compra += parseFloat(Tbody1.rows[i].cells[4].innerHTML);
										Contador = 1;
										break;
									}
									else{
										Contador = 0;
									}
								}
							}

							if (Contador == 0){
								for (var y = 0; y < Linea.length; y++){
									if (Tbody1.rows[i].cells[8].innerHTML == Linea[y]){
										Total_Compra += parseFloat(Tbody1.rows[i].cells[4].innerHTML);
										Contador = 1;
										break;
									}
									else{
										Contador = 0;
									}
								}
							}

							if (Contador == 0){
								for (var t = 0; t < Sublinea.length; t++){
									if (Tbody1.rows[i].cells[9].innerHTML == Sublinea[t]){
										Total_Compra += parseFloat(Tbody1.rows[i].cells[4].innerHTML);
										Contador = 1;
										break;
									}
									else{
										Contador = 0;
									}
								}
							}

							if (Contador == 0){
								for (var x = 0; x < Producto.length; x++){
									if (Tbody1.rows[i].cells[0].innerHTML == Producto[x]){
										Total_Compra += parseFloat(Tbody1.rows[i].cells[4].innerHTML);
										Contador = 1;
										break;
									}
									else{
										Contador = 0;
									}
								}
							}
						}
					}

					if (Total_Compra >= parseFloat(parsed[0]['Compra_req'])){
						Desc_Porcentaje = parseFloat(parsed[0]['Desc'] / 100);
						Oferta_Aplicada = -1 * (Total_Compra * Desc_Porcentaje);

						for (var i = 0; i < Tbody1.rows.length; i++){
							let Contador = 0;

							if (Tbody1.rows[i].cells[6].innerHTML == 0 && Tbody1.rows[i].cells[10].innerHTML == 0){

								if (Contador == 0){
									for (var x = 0; x < division.length; x++){
										if (Tbody1.rows[i].cells[7].innerHTML == division[x]){
											Tbody1.rows[i].cells[10].innerHTML = ID_Oferta;
											Contador = 1;
											break;
										}
										else{
											Contador = 0;
										}
									}
								}

								if (Contador == 0){
									for (var y = 0; y < Linea.length; y++){
										if (Tbody1.rows[i].cells[8].innerHTML == Linea[y]){
											Tbody1.rows[i].cells[10].innerHTML = ID_Oferta;
											Contador = 1;
											break;
										}
										else{
											Contador = 0;
										}
									}
								}

								if (Contador == 0){
									for (var t = 0; t < Sublinea.length; t++){
										if (Tbody1.rows[i].cells[9].innerHTML == Sublinea[t]){
											Tbody1.rows[i].cells[10].innerHTML = ID_Oferta;
											Contador = 1;
											break;
										}
										else{
											Contador = 0;
										}
									}
								}

								if (Contador == 0){
									for (var x = 0; x < Producto.length; x++){
										if (Tbody1.rows[i].cells[0].innerHTML == Producto[x]){
											Tbody1.rows[i].cells[10].innerHTML = ID_Oferta;
											Contador = 1;
											break;
										}
										else{
											Contador = 0;
										}
									}
								}
							}
						}

						for (var i = 0; i < Tbody1.rows.length; i++){
							if (ID_Oferta == Tbody1.rows[i].cells[0].innerHTML){
								Contador_Agregar = 1;
								Segundo_Cantidad = Tbody1.rows[i].cells[2].innerHTML;
								Fila_Eliminar = Tbody1.rows[i];
								break;
							}
							else{
								Contador_Agregar = 0;
							}
						}

						if (Contador_Agregar == 1){

							let Cantidad_Total = parseInt(Cantidad_Ofe) + parseInt(Segundo_Cantidad);
							let Importe_Total = parseFloat(Cantidad_Total * Precio_Ofe).toFixed(2);
							let tbody = document.querySelector("#fetchListProductosAdd").tBodies[0];
				    		tbody.removeChild(Fila_Eliminar);

						    for (var i = 0; i <= 0; i++){
						       	let row  = Tbody1.insertRow(i);
						       	row.style.background="antiquewhite";
						       	let cel1 = row.insertCell(0);
						       	let cel2 = row.insertCell(1);
						       	let cel3 = row.insertCell(2);
						       	let cel4 = row.insertCell(3);
						       	let cel5 = row.insertCell(4);
						       	let cel6 = row.insertCell(5);
						       	let cel7 = row.insertCell(6);
						       	let cel8 = row.insertCell(7);
							   	let cel9 = row.insertCell(8);
							   	let cel10 = row.insertCell(9);
							   	let cel11 = row.insertCell(10);

						       	cel1.innerHTML = ID_Oferta;
							   	cel2.innerHTML = Oferta;
							   	cel3.innerHTML = Cantidad_Total;
							   	cel4.innerHTML = Oferta_Aplicada;
							   	cel5.innerHTML = Oferta_Aplicada;
							   	cel7.innerHTML = 3;
							   	cel7.setAttribute("hidden","hidden");
							   	cel8.innerHTML = idDivision;
							   	cel8.setAttribute("hidden","hidden");
							   	cel9.innerHTML = idLinea;
							   	cel9.setAttribute("hidden","hidden");
							   	cel10.innerHTML = idSublinea;
							   	cel10.setAttribute("hidden","hidden");
							   	cel11.innerHTML = ID_Oferta;
							   	cel11.setAttribute("hidden","hidden");

							   	let boton1 = document.createElement("button");
							    boton1.classList.add('btn', 'btn-danger', 'btn-xs');
							    boton1.addEventListener("click",eliminarProductoOferta);
							    cel6.appendChild(boton1);

							    let icono1 = document.createElement("span");
							    icono1.classList.add('glyphicon', 'glyphicon-trash');
							    boton1.appendChild(icono1);
							}

							fetch("fetchListProductosAdd");
							calcular();
						}
						else{
							
							for (var i = 0; i <= 0; i++){
						       	let row  = Tbody1.insertRow(i);
						       	row.style.background="antiquewhite";
						       	let cel1 = row.insertCell(0);
						       	let cel2 = row.insertCell(1);
						       	let cel3 = row.insertCell(2);
						       	let cel4 = row.insertCell(3);
						       	let cel5 = row.insertCell(4);
						       	let cel6 = row.insertCell(5);
						       	let cel7 = row.insertCell(6);
						       	let cel8 = row.insertCell(7);
							   	let cel9 = row.insertCell(8);
							   	let cel10 = row.insertCell(9);
							   	let cel11 = row.insertCell(10);

						       	cel1.innerHTML = ID_Oferta;
							   	cel2.innerHTML = Oferta;
							   	cel3.innerHTML = 1;
							   	cel4.innerHTML = Oferta_Aplicada;
							   	cel5.innerHTML = Oferta_Aplicada;
							   	cel7.innerHTML = 3;
							   	cel7.setAttribute("hidden","hidden");
							   	cel8.innerHTML = idDivision;
							   	cel8.setAttribute("hidden","hidden");
							   	cel9.innerHTML = idLinea;
							   	cel9.setAttribute("hidden","hidden");
							   	cel10.innerHTML = idSublinea;
							   	cel10.setAttribute("hidden","hidden");
							   	cel11.innerHTML = ID_Oferta;
							   	cel11.setAttribute("hidden","hidden");

							   	let boton1 = document.createElement("button");
							    boton1.classList.add('btn', 'btn-danger', 'btn-xs');
							    boton1.addEventListener("click",eliminarProductoOferta);
							    cel6.appendChild(boton1);

							    let icono1 = document.createElement("span");
							    icono1.classList.add('glyphicon', 'glyphicon-trash');
							    boton1.appendChild(icono1);
							}

							fetch("fetchListProductosAdd");
							calcular();
						}

						toastr.success('Oferta agregada con exito', 'Correcto');
					}
					else{
						toastr.error('No cumple con la compra requerida', 'Error');
					}
		        }
		    }
	    })
	    .done(function() {
	    	$('#loadingHeader').css('display','none');
            $('#btnCerrarModalPromo').css('display','');
            $('#loadingCerrarModalPromo').css('display','none');
	    })
	    .fail(function(jqXHR, textStatus, errorThrown) {
	    	$('#loadingHeader').css('display','none');
            $('#btnCerrarModalPromo').css('display','');
            $('#loadingCerrarModalPromo').css('display','none');
            $("#modalErrorConexion").modal("show");
	    })
	 	.always(function() {
	 	});
	}
	else{
        toastr.error('No tiene ningún producto agregado', 'Error');
	}
}

// Función Limpiar //
function Limpiar(valor) {
	switch (valor) {
		case 1:
			$("#txtNombre").val("");
			$("#txtApellidos").val("");
			$("#txtEmpresa").val("");
			$("#txtCargo").val("");
			$("#txtCalle").val("");
			$(".txtColonia").val("");
			$("#txtCiudad").val("");
			$("#txtMunicipio").val("");
			$("#txtEstado").val("");
			$("#txtPais").val("");
			$("#txtCP").val("");
			$("#txtRFC").val("");
			$("#txtTel1").val("");
			$("#txtTel2").val("");
			$("#txtEmail").val("");
			$("#txtDescuento").val("");
			$("#select_Distribuidor").val(261);
			$("#txtNivel").val("");
			$("#modalAddCliente").modal("hide");
			RefrescarDistribuidores();
		break;

		case 2:
			$("#text_Subtotal").val("");
			$("#text_Impuestos").val("");
			$("#text_Descuento").val("");
			$("#text_Total").val("");
			$("#text_Total_Real").val("");

			$("#labelSubtotal").text("0.00");
		    $("#labelImpuestos").text("0.00");
		    $("#labelDescuento").text("0.00");
		    $("#labelVentas").text("0.00");
			$("#select_Cliente_Venta").val("");

			$('#fetchProductosVenta').DataTable().destroy();
			fetchProductosVenta('','','',idSucursal,idCliente);

			idClienteDirectos  = null;
			idSucursal 		   = 1;
			idCliente  		   = 261;

			///////////////////////////
			globalLinea 	= null;
			globalDivision  = null;

			//////////////////////////
			fetchTablaPromocion = null;
			fetchTablaOfertas 	= null;

			$('#fetchListProductosAdd').DataTable().destroy();
			document.getElementById("fetchListProductosAdd").tBodies[0].innerHTML = "";

			///// Cargar Tabla Ventas Directas Anteriores /////
			$('#fetchVentasDirectas').DataTable().destroy();
			document.getElementById("fetchVentasDirectas").tBodies[0].innerHTML = "";
			fetchVentasDirectas('','','',idCliente);

		break;

		case 3:
			$("#txtClienteInfo").val('');
			$("#txtRFCInfo").val('');
			$("#txtCPInfo").val('');
			$("#txtColoniaInfo").val('');
			$("#txtEstadoInfo").val('');
			$("#txtPaisInfo").val('');
			$("#txtMunicipioInfo").val('');
			$("#selectUsoCFDi").val('P01');
			$("#selectFormaPago").val('01');
			$("#selectMetodoPago").val('PUE');
			$("#txtObservacionesInfo").val('');

			$("#txtEstado").val("");
			$("#txtMunicipio").val("");
			$("#txtPais").val("");
			$("#txtEstado").removeAttr('readonly');
			$("#txtMunicipio").removeAttr('readonly');
			$("#txtPais").removeAttr('readonly');
			$("#txtColonia").empty();

			$("#modalInfoCliente").modal("hide");

			globalVenta = null;
			globalidClienteMenudeo = null;

			$('#fetchVentasDirectas').DataTable().destroy();
			document.getElementById("fetchVentasDirectas").tBodies[0].innerHTML = "";
			fetchVentasDirectas('','','',idCliente);

		break;

		case 4:
			$("#modalPagosClient").modal("hide");
			$("#Cantidad_Pagar").val("");
			$("#Banco").val("");
			$("#Sucursal").val("");
			$("#file-input").val("");
			$("#PagoVenta").text("");
			$('#imgSalida').attr("src",'');

			globalVenta = null;
			globalidClienteMenudeo = null;

			$('#fetchProductosVenta').DataTable().destroy();
			fetchProductosVenta('','','',idSucursal,idCliente);

			idClienteDirectos  = null;
			idSucursal 		   = 1;
			idCliente  		   = 261;

			///////////////////////////
			globalLinea 	= null;
			globalDivision  = null;

			//////////////////////////
			fetchTablaPromocion = null;
			fetchTablaOfertas 	= null;

			$('#fetchVentasDirectas').DataTable().destroy();
			document.getElementById("fetchVentasDirectas").tBodies[0].innerHTML = "";
			fetchVentasDirectas('','','',idCliente);
		break;
	}
}

// Acción Refrescar Distribuidores //
function RefrescarDistribuidores() {
	$.ajax({
  		url: window.dir + 'index.php/controller_Cliente/getClientesDirectos',
  		type: 'POST',
  		processData: false,
        contentType: false,
        timeout: 800000,
        beforeSend : function ()
        {
            $('#loadingHeader').css('display','');
            $('#btnVerPromocion').css('display','none');
            $('#loadingVerPromocion').css('display','');
            $('#btnAddVenta').css('display','none');
            $('#loadingAddVenta').css('display','');
        },
        success: function(data)
        {
        	let parsed = JSON.parse(data);
        	console.log(parsed);

        	$('#select_Cliente_Venta').empty();
        	$("#select_Cliente_Venta").append('<option value="">Seleccionar...</option>');

        	for (var i = 0; i < parsed.length; i++){
        		$("#select_Cliente_Venta").append('<option value='+parsed[i]['ID']+'>'+parsed[i]['Nombre']+' '+parsed[i]['Apellidos']+'</option>');
        	}
		}
  	})
  	.done(function() {
  		$('#loadingHeader').css('display','none');
        $('#btnVerPromocion').css('display','');
        $('#loadingVerPromocion').css('display','none');
        $('#btnAddVenta').css('display','');
        $('#loadingAddVenta').css('display','none');
  	})
  	.fail(function(jqXHR, textStatus, errorThrown) {
  		$('#loadingHeader').css('display','none');
        $('#btnVerPromocion').css('display','');
        $('#loadingVerPromocion').css('display','none');
        $('#btnAddVenta').css('display','');
        $('#loadingAddVenta').css('display','none');
        $("#modalErrorConexion").modal("show");
    })
    .always(function() {
    });	
}

///// Funcion Agregar Producto a la Venta /////
function AddProducto(row){

	console.log(row);

	let idDivision_Agregar = row.childNodes[2].childNodes[1].innerHTML;
    let idLinea_Agregar    = row.childNodes[3].childNodes[1].innerHTML;
    let idSublinea_Agregar = row.childNodes[4].childNodes[1].innerHTML;

	if (idDivision_Agregar != null && idLinea_Agregar != null && idSublinea_Agregar != null){
		if (row.childNodes[6].childNodes[0].value != null && row.childNodes[6].childNodes[0].value != "" && row.childNodes[6].childNodes[0].value != "0"){	
					
			/*let formData = new FormData();
			formData.append("idSucursal", idSucursal);
			formData.append("idCatalogo", row.childNodes[0].innerHTML);
			formData.append("Cantidad", row.childNodes[6].childNodes[0].value);

			$.ajax({
		  		url: window.dir + 'index.php/Controller_VentasDirectas/validateExistenciasProductos',
		  		type: 'POST',
		  		processData: false,
	            contentType: false,
	            timeout: 800000,
	            data: formData,
	            beforeSend : function ()
	            {
	                $('#loadingHeader').css('display','');
	                $('#btnVerPromocion').css('display','none');
	                $('#loadingVerPromocion').css('display','');
	                $('#btnAddVenta').css('display','none');
	                $('#loadingAddVenta').css('display','');
	            },
	            success: function(data){
			        console.log(data);

			        if (parseInt(data.trim()) == 1){*/

	            		let ID 		 			= row.childNodes[0].innerHTML;
						let Producto 			= row.childNodes[1].innerHTML;
						let Precio 	 			= row.childNodes[5].innerHTML;
						let Cantidad 			= row.childNodes[6].childNodes[0].value;
						let Importe  			= parseFloat(Cantidad * Precio).toFixed(2);
						let Contador 			= 0;
						let Segundo_Cantidad 	= 0;
						let Fila_Eliminar 		= "";
						let idDivision          = idDivision_Agregar;
						let idLinea          	= idLinea_Agregar;
						let idSublinea          = idSublinea_Agregar;
						let ID_Oferta 			= 0;

						let Productos       = document.getElementById("fetchListProductosAdd"); 
						let Tbody 			= Productos.tBodies[0];

						if (Tbody.rows.length > 0){
							for (var i = 0; i < Tbody.rows.length; i++){
								if (ID == Tbody.rows[i].cells[0].innerHTML && Tbody.rows[i].cells[6].innerHTML == 0){
									Contador = 1;
									Segundo_Cantidad 	= Tbody.rows[i].cells[2].innerHTML;
									Fila_Eliminar 		= Tbody.rows[i];
									ID_Oferta 			= Tbody.rows[i].cells[10].innerHTML;
									break;
								}
								else{
									Contador = 0;
								}
							}

							if (Contador == 1){
								$('#fetchListProductosAdd').DataTable().destroy();

								let Cantidad_Total = parseInt(Cantidad) + parseInt(Segundo_Cantidad);
								let Importe_Total = parseFloat(Cantidad_Total * Precio).toFixed(2);
								let tbody = document.querySelector("#fetchListProductosAdd").tBodies[0];
					    		tbody.removeChild(Fila_Eliminar);

							    for (var i = 0; i <= 0; i++){
							       	let row  = Tbody.insertRow(i);
							       	let cel1 = row.insertCell(0);
							       	let cel2 = row.insertCell(1);
							       	let cel3 = row.insertCell(2);
							       	let cel4 = row.insertCell(3);
							       	let cel5 = row.insertCell(4);
							       	let cel6 = row.insertCell(5);
							       	let cel7 = row.insertCell(6);
							       	let cel8 = row.insertCell(7);
							       	let cel9 = row.insertCell(8);
							       	let cel10 = row.insertCell(9);
							       	let cel11 = row.insertCell(10);

							       	cel1.innerHTML = ID;
								   	cel2.innerHTML = Producto;
								   	cel3.innerHTML = Cantidad_Total;
								   	cel4.innerHTML = Precio;
								   	cel5.innerHTML = Importe_Total;

								   	let boton1 = document.createElement("button");
								    boton1.classList.add('btn', 'btn-danger','btn-xs');
								    boton1.addEventListener("click",eliminarProducto);
								    cel6.appendChild(boton1);

								    let icono1 = document.createElement("span");
								    icono1.classList.add('glyphicon', 'glyphicon-trash');
								    boton1.appendChild(icono1);

								   	cel7.innerHTML = 0;
							   	   	cel7.setAttribute("hidden","hidden");
							   	   	cel8.innerHTML = idDivision;
							   	   	cel8.setAttribute("hidden","hidden");
							   	   	cel9.innerHTML = idLinea;
							   	   	cel9.setAttribute("hidden","hidden");
							   	   	cel10.innerHTML = idSublinea;
							   	   	cel10.setAttribute("hidden","hidden");
							   	   	cel11.innerHTML = ID_Oferta;
							   	   	cel11.setAttribute("hidden","hidden");
								}

								fetch("fetchListProductosAdd");
								calcular();
							}
							else{
								$('#fetchListProductosAdd').DataTable().destroy();

								for (var i = 0; i <= 0; i++){
							       	let row  = Tbody.insertRow(i);
							       	let cel1 = row.insertCell(0);
							       	let cel2 = row.insertCell(1);
							       	let cel3 = row.insertCell(2);
							       	let cel4 = row.insertCell(3);
							       	let cel5 = row.insertCell(4);
							       	let cel6 = row.insertCell(5);
							       	let cel7 = row.insertCell(6);
							       	let cel8 = row.insertCell(7);
							       	let cel9 = row.insertCell(8);
							       	let cel10 = row.insertCell(9);
							       	let cel11 = row.insertCell(10);

							       	cel1.innerHTML = ID;
								   	cel2.innerHTML = Producto;
								   	cel3.innerHTML = Cantidad;
								   	cel4.innerHTML = Precio;
								   	cel5.innerHTML = Importe;
								   	cel7.innerHTML = 0;
							   	   	cel7.setAttribute("hidden","hidden");
							   	   	cel8.innerHTML = idDivision;
							   	   	cel8.setAttribute("hidden","hidden");
							   	   	cel9.innerHTML = idLinea;
							   	   	cel9.setAttribute("hidden","hidden");
							   	   	cel10.innerHTML = idSublinea;
							   	   	cel10.setAttribute("hidden","hidden");
							   	   	cel11.innerHTML = ID_Oferta;
							   	   	cel11.setAttribute("hidden","hidden");

								   	let boton1 = document.createElement("button");
								    boton1.classList.add('btn', 'btn-danger','btn-xs');
								    boton1.addEventListener("click",eliminarProducto);
								    cel6.appendChild(boton1);

								    let icono1 = document.createElement("span");
								    icono1.classList.add('glyphicon', 'glyphicon-trash');
								    boton1.appendChild(icono1);
								}

								fetch("fetchListProductosAdd");
								calcular();
							}
						}
						else{
							$('#fetchListProductosAdd').DataTable().destroy();

							for (var i = 0; i <= 0; i++){
						       	let row  = Tbody.insertRow(i);
						       	let cel1 = row.insertCell(0);
						       	let cel2 = row.insertCell(1);
						       	let cel3 = row.insertCell(2);
						       	let cel4 = row.insertCell(3);
						       	let cel5 = row.insertCell(4);
						       	let cel6 = row.insertCell(5);
						       	let cel7 = row.insertCell(6);
						       	let cel8 = row.insertCell(7);
							   	let cel9 = row.insertCell(8);
							   	let cel10 = row.insertCell(9);
							   	let cel11 = row.insertCell(10);

						       	cel1.innerHTML = ID;
							   	cel2.innerHTML = Producto;
							   	cel3.innerHTML = Cantidad;
							   	cel4.innerHTML = Precio;
							   	cel5.innerHTML = Importe;
							   	cel7.innerHTML = 0;
							   	cel7.setAttribute("hidden","hidden");
							   	cel8.innerHTML = idDivision;
						   	   	cel8.setAttribute("hidden","hidden");
						   	   	cel9.innerHTML = idLinea;
						   	   	cel9.setAttribute("hidden","hidden");
						   	   	cel10.innerHTML = idSublinea;
						   	   	cel10.setAttribute("hidden","hidden");
						   	   	cel11.innerHTML = ID_Oferta;
							   	cel11.setAttribute("hidden","hidden");

							   	let boton1 = document.createElement("button");
							    boton1.classList.add('btn', 'btn-danger','btn-xs');
							    boton1.addEventListener("click",eliminarProducto);
							    cel6.appendChild(boton1);

							    let icono1 = document.createElement("span");
							    icono1.classList.add('glyphicon', 'glyphicon-trash');
							    boton1.appendChild(icono1);
							}

							fetch("fetchListProductosAdd");
							calcular();
						}

						toastr.success('Producto agregado', 'Correcto');
			        /*}
			        else if (data == '["Producto Inexistente"]'){
			            toastr.error('Producto inexistente en el inventario', 'Error');
			        }
			        else{
			            toastr.warning('Existencias Insuficientes', 'Advertencia');
			        }
			    }
		  	})
		  	.done(function() {
		  		$('#loadingHeader').css('display','none');
                $('#btnVerPromocion').css('display','');
                $('#loadingVerPromocion').css('display','none');
                $('#btnAddVenta').css('display','');
                $('#loadingAddVenta').css('display','none');
		  	})
		  	.fail(function(jqXHR, textStatus, errorThrown) {
		  		$('#loadingHeader').css('display','none');
                $('#btnVerPromocion').css('display','');
                $('#loadingVerPromocion').css('display','none');
                $('#btnAddVenta').css('display','');
                $('#loadingAddVenta').css('display','none');
                $("#modalErrorConexion").modal("show");
	        })
	        .always(function() {
	        });	*/		        		
		}
		else{
            toastr.info('El campo cantidad no puede estar vacio', 'Importante');
		}
	}
	else{
        toastr.info('Seleccione un producto', 'Importante');
	}
}

// Agregar Promoción a la venta //
function AddPromocion(row) {

	if (row.childNodes[6].childNodes[0].value != null && row.childNodes[6].childNodes[0].value != "" && row.childNodes[6].childNodes[0].value != "0"){
		let formData = new FormData();
		formData.append("idSucursal", idSucursal);
		formData.append("idPromocion", row.childNodes[0].innerHTML);

		$.ajax({
	  		url: window.dir + 'index.php/Controller_VentasDirectas/validateExistenciasPromo',
	  		type: 'POST',
	  		processData: false,  // tell jQuery not to process the data
	        contentType: false,
	        timeout: 800000,
	        data: formData,
	        beforeSend : function ()
	        {
	            $('#loadingHeader').css('display','');
                $('#btnVerPromocion').css('display','none');
                $('#loadingVerPromocion').css('display','');
                $('#btnAddVenta').css('display','none');
                $('#loadingAddVenta').css('display','');
	        },
	        success: function(data)
	        {
	        	if (parseInt(data.trim()) == 1){

	        		let idDivision_Agregar = row.childNodes[2].childNodes[1].innerHTML;
				    let idLinea_Agregar    = row.childNodes[3].childNodes[1].innerHTML;
				    let idSublinea_Agregar = row.childNodes[4].childNodes[1].innerHTML;

					let ID 		 			= row.childNodes[0].innerHTML;
					let Producto 			= row.childNodes[1].innerHTML;
					let Precio 	 			= row.childNodes[5].innerHTML;
					let Cantidad 			= row.childNodes[6].childNodes[0].value;
					let Importe  			= parseFloat(Cantidad * Precio).toFixed(2);
					let Contador 			= 0;
					let Segundo_Cantidad 	= 0;
					let Fila_Eliminar 		= "";
					let idDivision          = idDivision_Agregar;
					let idLinea          	= idLinea_Agregar;
					let idSublinea          = idSublinea_Agregar;
					let ID_Oferta 			= 0;

					let Productos       = document.getElementById("fetchListProductosAdd"); 
					let Tbody 			= Productos.tBodies[0];

					if (Tbody.rows.length > 0){
						for (var i = 0; i < Tbody.rows.length; i++){
							if (ID == Tbody.rows[i].cells[0].innerHTML && Tbody.rows[i].cells[6].innerHTML == 1){
								Contador = 1;
								Segundo_Cantidad 	= Tbody.rows[i].cells[2].innerHTML;
								Fila_Eliminar 		= Tbody.rows[i];
								ID_Oferta 			= Tbody.rows[i].cells[10].innerHTML;
								break;
							}
							else{
								Contador = 0;
							}
						}

						if (Contador == 1){
							$('#fetchListProductosAdd').DataTable().destroy();

							let Cantidad_Total = parseInt(Cantidad) + parseInt(Segundo_Cantidad);
							console.log(Cantidad_Total);
							let Importe_Total = parseFloat(Cantidad_Total * Precio).toFixed(2);
							let tbody = document.querySelector("#fetchListProductosAdd").tBodies[0];
				    		tbody.removeChild(Fila_Eliminar);

				    		for (var i = 0; i <= 0; i++){
						       let row  = Tbody.insertRow(i);
						       row.style.background="aliceblue";
						       let cel1 = row.insertCell(0);
						       let cel2 = row.insertCell(1);
						       let cel3 = row.insertCell(2);
						       let cel4 = row.insertCell(3);
						       let cel5 = row.insertCell(4);
						       let cel6 = row.insertCell(5);
						       let cel7 = row.insertCell(6);
						       let cel8 = row.insertCell(7);
						       let cel9 = row.insertCell(8);
						       let cel10 = row.insertCell(9);
						       let cel11 = row.insertCell(10);

						       cel1.innerHTML = ID;
							   cel2.innerHTML = Producto;
							   cel3.innerHTML = Cantidad_Total;
							   cel4.innerHTML = Precio;
							   cel5.innerHTML = Importe_Total;

							   	let boton1 = document.createElement("button");
							    boton1.classList.add('btn', 'btn-danger','btn-xs');
							    boton1.addEventListener("click",eliminarProducto);
							    cel6.appendChild(boton1);

							    let icono1 = document.createElement("span");
							    icono1.classList.add('glyphicon', 'glyphicon-trash');
							    boton1.appendChild(icono1);

							   cel7.innerHTML = 1;
						   	   cel7.setAttribute("hidden","hidden");
						   	   cel8.innerHTML = idDivision;
						   	   cel8.setAttribute("hidden","hidden");
						   	   cel9.innerHTML = idLinea;
						   	   cel9.setAttribute("hidden","hidden");
						   	   cel10.innerHTML = idSublinea;
						   	   cel10.setAttribute("hidden","hidden");
						   	   cel11.innerHTML = ID_Oferta;
						   	   cel11.setAttribute("hidden","hidden");
							}

							fetch("fetchListProductosAdd");
							calcular();

						}
						else{
							$('#fetchListProductosAdd').DataTable().destroy();

							for (var i = 0; i <= 0; i++){
						       let row  = Tbody.insertRow(i);
						       row.style.background="aliceblue";
						       let cel1 = row.insertCell(0);
						       let cel2 = row.insertCell(1);
						       let cel3 = row.insertCell(2);
						       let cel4 = row.insertCell(3);
						       let cel5 = row.insertCell(4);
						       let cel6 = row.insertCell(5);
						       let cel7 = row.insertCell(6);
						       let cel8 = row.insertCell(7);
						       let cel9 = row.insertCell(8);
						       let cel10 = row.insertCell(9);
						       let cel11 = row.insertCell(10);

						       cel1.innerHTML = ID;
							   cel2.innerHTML = Producto;
							   cel3.innerHTML = Cantidad;
							   cel4.innerHTML = Precio;
							   cel5.innerHTML = Importe;
							   cel7.innerHTML = 1;
						   	   cel7.setAttribute("hidden","hidden");
						   	   cel8.innerHTML = idDivision;
						   	   cel8.setAttribute("hidden","hidden");
						   	   cel9.innerHTML = idLinea;
						   	   cel9.setAttribute("hidden","hidden");
						   	   cel10.innerHTML = idSublinea;
						   	   cel10.setAttribute("hidden","hidden");
						   	   cel11.innerHTML = ID_Oferta;
						   	   cel11.setAttribute("hidden","hidden");


							   	let boton1 = document.createElement("button");
							    boton1.classList.add('btn', 'btn-danger','btn-xs');
							    boton1.addEventListener("click",eliminarProducto);
							    cel6.appendChild(boton1);

							    let icono1 = document.createElement("span");
							    icono1.classList.add('glyphicon', 'glyphicon-trash');
							    boton1.appendChild(icono1);
							}

							fetch("fetchListProductosAdd");
							calcular();
						}
					}
					else{
						$('#fetchListProductosAdd').DataTable().destroy();

						for (var i = 0; i <= 0; i++){
					       let row  = Tbody.insertRow(i);
					       row.style.background="aliceblue";
					       let cel1 = row.insertCell(0);
					       let cel2 = row.insertCell(1);
					       let cel3 = row.insertCell(2);
					       let cel4 = row.insertCell(3);
					       let cel5 = row.insertCell(4);
					       let cel6 = row.insertCell(5);
					       let cel7 = row.insertCell(6);
					       let cel8 = row.insertCell(7);
						   let cel9 = row.insertCell(8);
						   let cel10 = row.insertCell(9);
						   let cel11 = row.insertCell(10);

					       cel1.innerHTML = ID;
						   cel2.innerHTML = Producto;
						   cel3.innerHTML = Cantidad;
						   cel4.innerHTML = Precio;
						   cel5.innerHTML = Importe;
						   cel7.innerHTML = 1;
						   cel7.setAttribute("hidden","hidden");
						   cel8.innerHTML = idDivision;
					   	   cel8.setAttribute("hidden","hidden");
					   	   cel9.innerHTML = idLinea;
					   	   cel9.setAttribute("hidden","hidden");
					   	   cel10.innerHTML = idSublinea;
					   	   cel10.setAttribute("hidden","hidden");
					   	   cel11.innerHTML = ID_Oferta;
						   cel11.setAttribute("hidden","hidden");

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger','btn-xs');
						    boton1.addEventListener("click",eliminarProducto);
						    cel6.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);
						}

						fetch("fetchListProductosAdd");
						calcular();
					}
				        toastr.success('Promoción agregado', 'Correcto');
	        	}
				else{
					swal("Advertencia", "El Producto " + data + " no cuenta con existencias disponibles", "error");
				}
	        }
	  	})
	  	.done(function() {
	  		$('#loadingHeader').css('display','none');
            $('#btnVerPromocion').css('display','');
            $('#loadingVerPromocion').css('display','none');
            $('#btnAddVenta').css('display','');
            $('#loadingAddVenta').css('display','none');
	  	})
	  	.fail(function(jqXHR, textStatus, errorThrown) {
	  		$('#loadingHeader').css('display','none');
            $('#btnVerPromocion').css('display','');
            $('#loadingVerPromocion').css('display','none');
            $('#btnAddVenta').css('display','');
            $('#loadingAddVenta').css('display','none');
            $("#modalErrorConexion").modal("show");
	    })
	    .always(function() {
	    });	
	}
	else{
        toastr.info('El campo cantidad no puede estar vacio', 'Importante');
	}
}

// Eliminar Productos Tabla fetchProductosVentas //
var eliminarProducto = function(event){

	$('#fetchListProductosAdd').DataTable().destroy();

    let row = this.parentNode.parentNode;
    let tbody = document.querySelector("#fetchListProductosAdd").tBodies[0];

    if (row.childNodes[10].innerHTML == 0){
    	tbody.removeChild(row);

	    if (tbody.rows.length > 0){
	      fetch("fetchListProductosAdd");
	    }
	    calcular();
    }
    else{
        toastr.error('El producto ya tiene una oferta asignada', 'Error');
    }
};

// Calcular Total de Productos Agregados a la venta //

// Calcular Total de Productos Agregados a la venta //
function calcular() {

	$('#fetchListProductosAdd').DataTable().destroy();
	let Productos    = document.getElementById("fetchListProductosAdd"); 
	let Tbody 		 = Productos.tBodies[0];
	let TbodyCalculate = Productos.tBodies[0];
	let Procentaje 	 = 0;
	let Total_validate = 0;

	let Total_Real = 0;
	let Total_Real_Importe = 0;
	let Total_validate_2 = 0;
	let Descuento = 0;
	let Subtotal = 0;
	let Impuestos = 0;
	let Total = 0;
	let Cliente      = $("#select_Cliente_Venta").val();

	///////////////////////////////////////////////////////////////////////////////////////
	////////////     Validación Importes //////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////
	if (Tbody.rows.length > 0) {
		for (var i = 0; i < Tbody.rows.length; i++) {
			if (Tbody.rows[i].cells[2].innerHTML != 0 && Tbody.rows[i].cells[4].innerHTML != 0) {
				Total_validate = parseInt(Tbody.rows[i].cells[2].innerHTML) * parseFloat(Tbody.rows[i].cells[3].innerHTML);
				if (parseFloat(Total_validate) != parseFloat(Tbody.rows[i].cells[4].innerHTML)) {
					Tbody.rows[i].cells[4].innerHTML = Total_validate;
				}
			}
		}
	}	
	///////////////////////////////////////////////////////////////////////////////////////
	////////////     Validación Importes //////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////

	/// Obtenemos el discuento del cliente menudeo ///
	if ($("#Descuento_Cliente_Menudeo").text() != null && $("#Descuento_Cliente_Menudeo").text() != "") {
		Procentaje = parseFloat($("#Descuento_Cliente_Menudeo").text()) / 100;
	}

	// Obtener Total de la venta recorriendo cada prodcto agregado //
	if (TbodyCalculate.rows.length > 0) {
		for (var i = 0; i < TbodyCalculate.rows.length; i++) {
			if (TbodyCalculate.rows[i].cells[2].innerHTML != 0 && TbodyCalculate.rows[i].cells[4].innerHTML != 0) {
				Total_Real += parseInt(TbodyCalculate.rows[i].cells[2].innerHTML) * parseFloat(TbodyCalculate.rows[i].cells[3].innerHTML);
				Total_Real_Importe += parseFloat(TbodyCalculate.rows[i].cells[4].innerHTML);
				Total_validate_2 = parseInt(TbodyCalculate.rows[i].cells[2].innerHTML) * parseFloat(TbodyCalculate.rows[i].cells[3].innerHTML);

				if (parseFloat(Total_validate_2) != parseFloat(TbodyCalculate.rows[i].cells[4].innerHTML)) {
					TbodyCalculate.rows[i].cells[4].innerHTML = Total_validate_2;
				}				
			}
		}

		console.log('Total Real (Cantidad * Precio): ' + Total_Real);
		console.log('Total Real (Importe): ' + Total_Real_Importe);

		Descuento 	= Total_Real * Procentaje;
		Total 		= Total_Real - Descuento;
		Subtotal 	= Total / 1.16;
		Impuestos 	= Total - Subtotal;

		$("#labelSubtotal").text(parseFloat(Subtotal).toFixed(2));
		$("#labelImpuestos").text(parseFloat(Impuestos).toFixed(2));
		$("#labelDescuento").text(parseFloat(Descuento).toFixed(2));
		$("#labelVentas").text((parseFloat(Total).toFixed(2)));
	}
	else{
	    toastr.warning('No se encuentra ningún producto o promoción registrado', 'Advertencia');
	}

	fetch("fetchListProductosAdd");
}
// function calcular() {

// 	$('#fetchListProductosAdd').DataTable().destroy();
// 	let Productos    = document.getElementById("fetchListProductosAdd"); 
// 	let Tbody 		 = Productos.tBodies[0];
// 	let Procentaje 	 = 0;
// 	let Total_Real 	 = 0;
// 	let Descuento 	 = 0;
// 	let Subtotal 	 = 0;
// 	let Impuestos  	 = 0;
// 	let Total 		 = 0;
// 	let Cliente      = $("#select_Cliente_Venta").val();

// 	if ($("#Descuento_Cliente_Menudeo").text() != ""){
// 		Procentaje   = parseFloat($("#Descuento_Cliente_Menudeo").text()) / 100;
// 	}

// 	if (Tbody.rows.length > 0){

// 		for (var i = 0; i < Tbody.rows.length; i++){ Total_Real += parseFloat(Tbody.rows[i].cells[4].innerHTML);}

// 		Descuento 	= Total_Real * Procentaje;
// 		Total 		= Total_Real - Descuento;
// 		Subtotal 	= Total / 1.16;
// 		Impuestos 	= Total - Subtotal;

// 		$("#labelSubtotal").text(parseFloat(Subtotal).toFixed(2));
// 		$("#labelImpuestos").text(parseFloat(Impuestos).toFixed(2));
// 		$("#labelDescuento").text(parseFloat(Descuento).toFixed(2));
// 		$("#labelVentas").text((parseFloat(Total).toFixed(2)));
// 	}
// 	else{
// 		$("#labelSubtotal").text("0.00");
// 		$("#labelImpuestos").text("0.00");
// 		$("#labelDescuento").text("0.00");
// 		$("#labelVentas").text("0.00");

// 	    toastr.warning('No se encuentra ningún producto o promoción registrado', 'Advertencia');
// 	}

// 	fetch("fetchListProductosAdd");
// }

var eliminarProductoOferta = function(event){

	$('#fetchListProductosAdd').DataTable().destroy();

    let row = this.parentNode.parentNode;
    let tbody = document.querySelector("#fetchListProductosAdd").tBodies[0];

    let Productos_Lista       = document.getElementById("fetchListProductosAdd"); 
	let Tbody_Lista 		  = Productos_Lista.tBodies[0];
	
	for (var i = 0; i < Tbody_Lista.rows.length; i++){
		if (row.childNodes[0].innerHTML == Tbody_Lista.rows[i].cells[10].innerHTML){
			Tbody_Lista.rows[i].cells[10].innerHTML = 0;
		}
	}

    tbody.removeChild(row);

    if (tbody.rows.length > 0){
      fetch("fetchListProductosAdd");
    }
    calcular();
};

// Acción click table División //
function marcar(obj) {
	globalDivision = obj;
	$(".tdDivision").removeAttr('style');
  	obj.style.background = (obj.style.background=='') ? '#0088cc' : '';
  	obj.style.color      = (obj.style.color=='') ? '#fff' : '';

  	let idDivision     		 = obj.childNodes[1].innerHTML;
	let Tabla_Ventas   		 = document.getElementById("fetchProductosVenta");
	let Tbody_Ventas   		 = Tabla_Ventas.getElementsByTagName("tbody")[0];

	let Tabla_Ventas_Promo   = document.getElementById("fetchProductosPromo");
	let Tbody_Ventas_Promo   = Tabla_Ventas_Promo.getElementsByTagName("tbody")[0];

	let Tabla_Linea          = document.getElementById("fetchLinea");
	let Tbody_Linea          = Tabla_Linea.getElementsByTagName("tbody")[0];

	let Tabla_Sublinea       = document.getElementById("fetchSublinea");
	let Tbody_Sublinea       = Tabla_Sublinea.getElementsByTagName("tbody")[0];

	if (idDivision != null){

		let formData = new FormData();
		formData.append("idDivision", idDivision);

		$.ajax({
	  		url: window.dir + 'index.php/Controller_VentasDirectas/getLineaByIdDivision',
	  		type: 'POST',
	  		processData: false,  // tell jQuery not to process the data
	        contentType: false,
	        timeout: 800000,
	        data: formData,
	        beforeSend : function ()
	        {
	            $('#loadingHeader').css('display','');
	            $('#btnVerPromocion').css('display','none');
	            $('#loadingVerPromocion').css('display','');
	            $('#btnAddVenta').css('display','none');
	            $('#loadingAddVenta').css('display','');
	        },
	        success: function(data)
	        {
	        	let parsed     = JSON.parse(data);
				let trSublinea = document.getElementById("trSublinea");
				trSublinea.innerHTML = "";

				let trLinea = document.getElementById("trLinea");
				trLinea.innerHTML = "";

				if (parsed.length > 0){

					for (var i = 0; i < parsed.length; i++){
						let td  = document.createElement("td");
						td.innerHTML = parsed[i]['Linea'];
						td.classList.add('tdLinea');
						td.addEventListener("click",cargarLinea);
						trLinea.appendChild(td);

						let span = document.createElement("span");
						span.innerHTML = parsed[i]['ID'];
						span.setAttribute('hidden', 'hidden');
						td.appendChild(span);
					}

					Tbody_Ventas.innerHTML = "";
					$('#fetchProductosVenta').DataTable().destroy();
					Tbody_Ventas.innerHTML = "";
					fetchProductosVenta(idDivision,'','',idSucursal,idCliente);

					Tbody_Ventas_Promo.innerHTML = "";
					$('#fetchProductosPromo').DataTable().destroy();
					Tbody_Ventas_Promo.innerHTML = "";
					fetchProductosPromo(idDivision,'','',idSucursal,idCliente);

		            toastr.success('Lineas Cargadas con exito', 'Correcto');

				}
				else{
		            toastr.error('La división no cuenta con lineas asignadas', 'Error');
				}
			}
	  	})
	  	.done(function() {
	  		$('#loadingHeader').css('display','none');
	        $('#btnVerPromocion').css('display','');
	        $('#loadingVerPromocion').css('display','none');
	        $('#btnAddVenta').css('display','');
	        $('#loadingAddVenta').css('display','none');
	  	})
	  	.fail(function(jqXHR, textStatus, errorThrown) {
	  		$('#loadingHeader').css('display','none');
	        $('#btnVerPromocion').css('display','');
	        $('#loadingVerPromocion').css('display','none');
	        $('#btnAddVenta').css('display','');
	        $('#loadingAddVenta').css('display','none');
	        $("#modalErrorConexion").modal("show");
	    })
	    .always(function() {
	    });

		/*$.post(window.dir + 'index.php/Controller_VentasDirectas/getLineaByIdDivision', {idDivision: idDivision}, function(data, textStatus, xhr) {

			let parsed = JSON.parse(data);

			let trSublinea = document.getElementById("trSublinea");
			trSublinea.innerHTML = "";

			let trLinea = document.getElementById("trLinea");
			trLinea.innerHTML = "";

			if (parsed.length > 0){

				for (var i = 0; i < parsed.length; i++){
					let td  = document.createElement("td");
					td.innerHTML = parsed[i]['Linea'];
					td.classList.add('tdLinea');
					td.addEventListener("click",cargarLinea);
					trLinea.appendChild(td);

					let span = document.createElement("span");
					span.innerHTML = parsed[i]['ID'];
					span.setAttribute('hidden', 'hidden');
					td.appendChild(span);
				}

				Tbody_Ventas.innerHTML = "";
				$('#fetchProductosVenta').DataTable().destroy();
				Tbody_Ventas.innerHTML = "";
				fetchProductosVenta(idDivision,'','',idSucursal,idCliente);

				Tbody_Ventas_Promo.innerHTML = "";
				$('#fetchProductosPromo').DataTable().destroy();
				Tbody_Ventas_Promo.innerHTML = "";
				fetchProductosPromo(idDivision,'','',idSucursal,idCliente);

	            toastr.success('Lineas Cargadas con exito', 'Correcto');

			}
			else{
	            toastr.error('La división no cuenta con lineas asignadas', 'Error');
			}
		}); */
	}
	else{
		Tbody_Linea.innerHTML = "";
		Tbody_Sublinea.innerHTML = "";

		Tbody_Ventas.innerHTML = "";
		$('#fetchProductosVenta').DataTable().destroy();
		Tbody_Ventas.innerHTML = "";
		fetchProductosVenta('','','',idSucursal,idCliente);

		Tbody_Ventas_Promo.innerHTML = "";
		$('#fetchProductosPromo').DataTable().destroy();
		Tbody_Ventas_Promo.innerHTML = "";
		fetchProductosPromo('','','',idSucursal,idCliente);
	}
}

// Acción Cargar Sublinea  al dar click a la Linea//
var cargarLinea = function(event){

	globalLinea = this.childNodes[1].innerHTML;

	$(".tdLinea").removeAttr('style');
  	this.style.background = (this.style.background=='') ? '#0088cc' : '';
  	this.style.color = (this.style.color=='') ? '#fff' : '';

	let idLinea    = this.childNodes[1].innerHTML;
	let idDivision = globalDivision.childNodes[1].innerHTML;

	let Tabla_Ventas         = document.getElementById("fetchProductosVenta");
	let Tbody_Ventas         = Tabla_Ventas.getElementsByTagName("tbody")[0];

	let Tabla_Ventas_Promo   = document.getElementById("fetchProductosPromo");
	let Tbody_Ventas_Promo   = Tabla_Ventas_Promo.getElementsByTagName("tbody")[0];

	let Tabla_Sublinea       = document.getElementById("fetchSublinea");
	let Tbody_Sublinea       = Tabla_Sublinea.getElementsByTagName("tbody")[0];

	if (idLinea != null){

		let formData = new FormData();
		formData.append("idLinea", idLinea);

		$.ajax({
	  		url: window.dir + 'index.php/Controller_VentasDirectas/getSublineaByidLinea',
	  		type: 'POST',
	  		processData: false,  // tell jQuery not to process the data
	        contentType: false,
	        timeout: 800000,
	        data: formData,
	        beforeSend : function ()
	        {
	            $('#loadingHeader').css('display','');
	            $('#btnVerPromocion').css('display','none');
	            $('#loadingVerPromocion').css('display','');
	            $('#btnAddVenta').css('display','none');
	            $('#loadingAddVenta').css('display','');
	        },
	        success: function(data)
	        {
	        	let parsed     = JSON.parse(data);
				let trSublinea = document.getElementById("trSublinea");
				trSublinea.innerHTML = "";

				if (parsed.length > 0){
					for (var i = 0; i < parsed.length; i++){
						let td  = document.createElement("td");
						td.innerHTML = parsed[i]['Sublinea'];
						td.classList.add('tdSublinea');
						td.addEventListener("click",cargarSublinea);
						trSublinea.appendChild(td);

						let span = document.createElement("span");
						span.innerHTML = parsed[i]['ID'];
						span.setAttribute('hidden', 'hidden');
						td.appendChild(span);
					}

					Tbody_Ventas.innerHTML = "";
					$('#fetchProductosVenta').DataTable().destroy();
					Tbody_Ventas.innerHTML = "";
					fetchProductosVenta(idDivision,idLinea,'',idSucursal,idCliente);

					Tbody_Ventas_Promo.innerHTML = "";
					$('#fetchProductosPromo').DataTable().destroy();
					Tbody_Ventas_Promo.innerHTML = "";
					fetchProductosPromo(idDivision,idLinea,'',idSucursal,idCliente);

		            toastr.success('Lineas Cargadas con exito', 'Correcto');
				}
				else{
			        toastr.error('La división no cuenta con lineas asignadas', 'Error');
				}
			}
	  	})
	  	.done(function() {
	  		$('#loadingHeader').css('display','none');
	        $('#btnVerPromocion').css('display','');
	        $('#loadingVerPromocion').css('display','none');
	        $('#btnAddVenta').css('display','');
	        $('#loadingAddVenta').css('display','none');
	  	})
	  	.fail(function(jqXHR, textStatus, errorThrown) {
	  		$('#loadingHeader').css('display','none');
	        $('#btnVerPromocion').css('display','');
	        $('#loadingVerPromocion').css('display','none');
	        $('#btnAddVenta').css('display','');
	        $('#loadingAddVenta').css('display','none');
	        $("#modalErrorConexion").modal("show");
	    })
	    .always(function() {
	    });

		/*$.post(window.dir + 'index.php/Controller_VentasDirectas/getSublineaByidLinea', {idLinea: idLinea}, function(data, textStatus, xhr) {

			let parsed = JSON.parse(data);

			let trSublinea = document.getElementById("trSublinea");
			trSublinea.innerHTML = "";

			if (parsed.length > 0){
				for (var i = 0; i < parsed.length; i++){
					let td  = document.createElement("td");
					td.innerHTML = parsed[i]['Sublinea'];
					td.classList.add('tdSublinea');
					td.addEventListener("click",cargarSublinea);
					trSublinea.appendChild(td);

					let span = document.createElement("span");
					span.innerHTML = parsed[i]['ID'];
					span.setAttribute('hidden', 'hidden');
					td.appendChild(span);
				}

				Tbody_Ventas.innerHTML = "";
				$('#fetchProductosVenta').DataTable().destroy();
				Tbody_Ventas.innerHTML = "";
				fetchProductosVenta(idDivision,idLinea,'',idSucursal,idCliente);

				Tbody_Ventas_Promo.innerHTML = "";
				$('#fetchProductosPromo').DataTable().destroy();
				Tbody_Ventas_Promo.innerHTML = "";
				fetchProductosPromo(idDivision,idLinea,'',idSucursal,idCliente);

	            toastr.success('Lineas Cargadas con exito', 'Correcto');
			}
			else{
		        toastr.error('La división no cuenta con lineas asignadas', 'Error');
			}
		});*/
	}
	else{
		Tbody_Sublinea.innerHTML = "";
		Tbody_Ventas.innerHTML = "";
		$('#fetchProductosVenta').DataTable().destroy();
		Tbody_Ventas.innerHTML = "";
		fetchProductosVenta(idDivision,'','',idSucursal,idCliente);

		Tbody_Ventas_Promo.innerHTML = "";
		$('#fetchProductosPromo').DataTable().destroy();
		Tbody_Ventas_Promo.innerHTML = "";
		fetchProductosPromo(idDivision,'','',idSucursal,idCliente);
	}
};


// Acción Cargar Linea Al dar click a la división //
var cargarSublinea = function(event){

	$(".tdSublinea").removeAttr('style');
  	this.style.background = (this.style.background=='') ? '#0088cc' : '';
  	this.style.color = (this.style.color=='') ? '#fff' : '';

  	let idLinea 	= globalLinea;
	let idDivision  = globalDivision.childNodes[1].innerHTML;
	let idSublinea  = this.childNodes[1].innerHTML;

	let Tabla_Ventas         = document.getElementById("fetchProductosVenta");
	let Tbody_Ventas         = Tabla_Ventas.getElementsByTagName("tbody")[0];

	let Tabla_Ventas_Promo   = document.getElementById("fetchProductosPromo");
	let Tbody_Ventas_Promo   = Tabla_Ventas_Promo.getElementsByTagName("tbody")[0];

	if (idSublinea != null){
		Tbody_Ventas.innerHTML = "";
		$('#fetchProductosVenta').DataTable().destroy();
		Tbody_Ventas.innerHTML = "";			
		fetchProductosVenta(idDivision,idLinea,idSublinea,idSucursal,idCliente);

		Tbody_Ventas_Promo.innerHTML = "";
		$('#fetchProductosPromo').DataTable().destroy();
		Tbody_Ventas_Promo.innerHTML = "";
		fetchProductosPromo(idDivision,idLinea,idSublinea,idSucursal,idCliente);
	}
	else{
		Tbody_Ventas.innerHTML = "";
		$('#fetchProductosVenta').DataTable().destroy();
		Tbody_Ventas.innerHTML = "";
		fetchProductosVenta(idDivision,idLinea,'',idSucursal,idCliente);

		Tbody_Ventas_Promo.innerHTML = "";
		$('#fetchProductosPromo').DataTable().destroy();
		Tbody_Ventas_Promo.innerHTML = "";
		fetchProductosPromo(idDivision,idLinea,'',idSucursal,idCliente);
	}
};

// Crear DataTable Generico //
function fetch(table){
	$('#'+table).dataTable({
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
	});
}

// DataTable fetchProductosVenta //
function fetchProductosVenta(division='', linea='', sublinea='', idSucursal=idSucursal, idCliente=idCliente) {
	$('#fetchProductosVenta').DataTable({
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
                    return "<input type='number' style='max-width: 55px;' class='form-control' min='1' value='1' id='txt_Cantidad_table" + full[0] + "' onchange='window.Agregar_Cantidad'></input>"
                }
            },
            {
            	"targets": 7,
                'render': function (data, type, full, meta)
                {
                    return "<button class='btn btn-success btn-xs' onclick='AddProducto(this.parentNode.parentNode)'><i class='fa fa-plus' aria-hidden='true'></i></button>"
                }
            }
        ],
        "order" : [],
        "ajax" : {
            url: window.dir + 'index.php/Controller_VentasDirectas/fetchProductosVenta',
            type: "POST",
            data:{
              division:division, linea:linea, sublinea:sublinea, idSucursal:idSucursal, idCliente:idCliente
            }
        }
    });
}

function fetchProductosPromo(division='', linea='', sublinea='', idSucursal=idSucursal, idCliente=idCliente)
{
    $('#fetchProductosPromo').DataTable({
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
                    return "<input type='number' style='max-width: 55px;' class='form-control' min='1' value='1' id='txt_Cantidad_table" + full[0] + "' onchange='window.Agregar_Cantidad'></input>"
                }
            },
            {
            	"targets": 7,
                'render': function (data, type, full, meta)
                {
                    return "<button class='btn btn-success btn-xs' onclick='AddPromocion(this.parentNode.parentNode)'><i class='fa fa-plus' aria-hidden='true'></i></button>"
                }
            }
        ],
        "order" : [],
        "ajax" : {
            url: window.dir + 'index.php/Controller_VentasDirectas/fetchProductosPromo',
            type: "POST",
            data:{
              division:division, linea:linea, sublinea:sublinea, idSucursal:idSucursal, idCliente:idCliente
            }
        }
    });
}

// Cargar DataTable Ventas Directas Anteriores //
function fetchVentasDirectas(is_date_search='', start_date='', end_date='', idCliente=idCliente)
{
	console.log(idCliente);

    $('#fetchVentasDirectas').DataTable({
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
                "targets": 5,
                'render': function (data, type, full, meta)
                {
                	return full[5]
                }
            },
            {
            	"targets": 6,
                'render': function (data, type, full, meta)
                {
                	if (full[6] == 1){
                		return "<label class='badge badge-success'>Extraido</label>"
                	}
                	else{
                		return "<label class='badge badge-danger'>No Extraido</label>"
                	}
                }
            },
            {
            	"targets": 7,
                'render': function (data, type, full, meta)
                {	
					if (parseFloat(full[4]) != 0.00) {
						return "<button class='btn btn-success btn-sm' onclick='Pagar(this.parentNode.parentNode)'><i class='fa fa-money' aria-hidden='true'></i></button> <button class='btn btn-warning btn-sm' onclick='Editar(this.parentNode.parentNode)'><i class='fa fa-edit' aria-hidden='true'></i></button> <button class='btn btn-danger btn-sm' onclick='Remove(this.parentNode.parentNode)'><i class='fa fa-remove' aria-hidden='true'></i></button>"
					}else{
						if (full[7] == 1){
							return "<button class='btn btn-default btn-sm' onclick='Descargar(this.parentNode.parentNode)'>Descargar</button>"
						}
						else{
							return "<button class='btn btn-primary btn-sm' onclick='Facturar(this.parentNode.parentNode)'>Facturar</button>"
						}
					}
                }
            }
        ],
        "order" : [],
        "ajax" : {
            url: window.dir + 'index.php/Controller_VentasDirectas/fetchVentasDirectas',
            type: "POST",
            data:{
              is_date_search:is_date_search, start_date:start_date, end_date:end_date,idCliente:idCliente
            }
        }
    });
}

// Función CP Información //
/*function CPInfo(CP) {
	let formData = new FormData();
	formData.append("CP", CP);

	$.ajax({
		url: 'https://api-codigos-postales.herokuapp.com/v2/codigo_postal/' + CP,
		type: 'GET',
		processData: false, // tell jQuery not to process the data
		contentType: false,
		timeout: 800000,
		beforeSend: function () {
			$("#loadingHeader").css('display', '');
			$("#btnCerrarModalInfo").css('display', 'none');
			$("#loadingCerrarModalInfo").css('display', '');
			$("#btnFacturar").css('display', 'none');
			$("#loadingFacturar").css('display', '');
		},
		success: function (data) {
			console.log(data);

			if (data.estado != null && data.estado != "") {
				$("#txtPaisInfo").val("México");
				$("#txtEstadoInfo").val(data.estado);
				$("#txtMunicipioInfo").val(data.municipio);
				$("#txtColoniaInfo").empty();

				for (var i = 0; i < data.colonias.length; i++) {
					$("#txtColoniaInfo").append("<option value='" + data.colonias[i] + "'>" + data.colonias[i] + "</option>");
				}

				$("#txtEstadoInfo").attr('readonly', 'readonly');
				$("#txtMunicipioInfo").attr('readonly', 'readonly');
				$("#txtPaisInfo").attr('readonly', 'readonly');
			} else {
				$("#txtEstadoInfo").val("");
				$("#txtMunicipioInfo").val("");
				$("#txtPaisInfo").val("");
				$("#txtEstadoInfo").removeAttr('readonly');
				$("#txtMunicipioInfo").removeAttr('readonly');
				$("#txtPaisInfo").removeAttr('readonly');
				$("#txtColoniaInfo").empty();
			}
		}
	})
	.done(function () {
		$("#loadingHeader").css('display', 'none');
		$("#btnCerrarModalInfo").css('display', '');
		$("#loadingCerrarModalInfo").css('display', 'none');
		$("#btnFacturar").css('display', '');
		$("#loadingFacturar").css('display', 'none');
	})
	.fail(function () {
		$("#loadingHeader").css('display', 'none');
		$("#btnCerrarModalInfo").css('display', '');
		$("#loadingCerrarModalInfo").css('display', 'none');
		$("#btnFacturar").css('display', '');
		$("#loadingFacturar").css('display', 'none');

		// Abrir modal Verifique conexión
		$("#modalErrorConexion").modal("show");
	})
	.always(function () {
	});
}*/

function openTab(url) {
   // Create link in memory
   var a = window.document.createElement("a");
   a.target = '_blank';
   a.href = url;

   // Dispatch fake click
   var e = window.document.createEvent("MouseEvents");
   e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
   a.dispatchEvent(e);
};