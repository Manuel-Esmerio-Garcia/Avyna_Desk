var FETCHDISTRIBUIDORES = null;
var FETCHDIRECCIONESENVIO = null;

const getmonth = (mouth) => (String(mouth).length == 1) ? `0${ mouth }` : mouth;
const getday = (day) => (String(day).length == 1) ? `0${ day }` : day;

$(document).ready(function () {

	// Validate Solo Numeros //
	$('.input-number').on('input', function () { 
		this.value = this.value.replace(/[^0-9]/g,'');
	});

	// Cargar Libreria DatePicker //
	$('.input-daterange').datepicker({
		format: "yyyy-mm-dd",
		autoclose: true
	});

	var dt = new Date();
	$("#txtBanderazo").val(`${ dt.getFullYear() }-${ getmonth(dt.getMonth() + 1)}-${ getday(dt.getDate()) }`);

	// Cargra DataTable Distribuidores //
	fetchDistribuidores();

	/////////////////////////////
	//// Agregar Distribuidor ///
	/////////////////////////////

	//Consumir WebServices Codigo Postal Agregar Usuario
	/*$("#txtCP").change(function (event) {

		let CP = $("#txtCP").val();
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
					$("#btnCerrarAddDistri").css('display', 'none');
					$("#loadingCerrarAddDistri").css('display', '');
					$("#btnAddDistri").css('display', 'none');
					$("#loadingAddDistri").css('display', '');
				},
				success: function (data) {
					console.log(data);

					if (data.estado != null && data.estado != "") {
						$("#txtPais").val("México");
						$("#txtEstado").val(data.estado);
						$("#txtMunicipio").val(data.municipio);
						$("#txtColonia").empty();

						for (var i = 0; i < data.colonias.length; i++) {
							$("#txtColonia").append("<option value='" + data.colonias[i] + "'>" + data.colonias[i] + "</option>");
						}

						$("#txtEstado").attr('readonly', 'readonly');
						$("#txtMunicipio").attr('readonly', 'readonly');
						$("#txtPais").attr('readonly', 'readonly');
					} else {
						$("#txtEstado").val("");
						$("#txtMunicipio").val("");
						$("#txtPais").val("");
						$("#txtEstado").removeAttr('readonly');
						$("#txtMunicipio").removeAttr('readonly');
						$("#txtPais").removeAttr('readonly');
						$("#txtColonia").empty();
					}
				}
			})
			.done(function () {
				$("#loadingHeader").css('display', 'none');
				$("#btnCerrarAddDistri").css('display', '');
				$("#loadingCerrarAddDistri").css('display', 'none');
				$("#btnAddDistri").css('display', '');
				$("#loadingAddDistri").css('display', 'none');
			})
			.fail(function () {
				$("#loadingHeader").css('display', 'none');
				$("#btnCerrarAddDistri").css('display', '');
				$("#loadingCerrarAddDistri").css('display', 'none');
				$("#btnAddDistri").css('display', '');
				$("#loadingAddDistri").css('display', 'none');

				// Abrir modal Verifique conexión
				$("#modalErrorConexion").modal("show");
			})
			.always(function () {});
	});*/

	$("#btnAgregarDistri").click(function (e) {
		$("#modalAgregarDistri").modal("show");
	});

	// Validate Password //
	$("#txtPaswword").change(function (event) {
		let Password = $("#txtPaswword").val();
		let Confirmacion = $("#txtConfirmacion").val();

		if (Password != "") {
			if (Confirmacion != "") {
				if (Password == Confirmacion) {
					$("#validatePassword").css('display', 'none');
					$("#validateConfirmacion").css('display', 'none');
				} else {
					$("#validatePassword").removeClass('hide');
					$("#validatePassword").css('display', '');
					$("#validateConfirmacion").removeClass('hide');
					$("#validateConfirmacion").css('display', '');
				}
			} else {
				$("#validatePassword").css('display', 'none');
				$("#validateConfirmacion").css('display', 'none');
			}
		} else {
			$("#validatePassword").css('display', 'none');
			$("#validateConfirmacion").css('display', 'none');
		}
	});

	// Validate Password //
	$("#txtConfirmacion").change(function (event) {
		let Password = $("#txtPaswword").val();
		let Confirmacion = $("#txtConfirmacion").val();

		if (Confirmacion != "") {
			if (Password != "") {
				if (Password == Confirmacion) {
					$("#validatePassword").css('display', 'none');
					$("#validateConfirmacion").css('display', 'none');
				} else {
					$("#validatePassword").removeClass('hide');
					$("#validatePassword").css('display', '');
					$("#validateConfirmacion").removeClass('hide');
					$("#validateConfirmacion").css('display', '');
				}
			} else {
				$("#validatePassword").css('display', 'none');
				$("#validateConfirmacion").css('display', 'none');
			}
		} else {
			$("#validatePassword").css('display', 'none');
			$("#validateConfirmacion").css('display', 'none');
		}
	});


	/// Agregar Division AL Distribuidor ///
	$("#btnAgregarDivision").click(function (event) {

		let idDivision = $("#selectDivision").val();
		let Division = $("#selectDivision option:selected").text();
		let Contador = 0;

		if (idDivision != "") {

			let tbody = document.getElementById("fetchDivisiones").tBodies[0];

			if (tbody.rows.length > 0) {

				for (var i = 0; i < tbody.rows.length; i++) {
					if (tbody.rows[i].cells[0].innerHTML == idDivision) {
						Contador = 1;
					}
				}

				if (Contador == 0) {

					for (var i = 0; i <= 0; i++) {
						let row = tbody.insertRow(i);
						let cel1 = row.insertCell(0);
						let cel2 = row.insertCell(1);
						let cel3 = row.insertCell(2);

						cel1.innerHTML = idDivision;
						cel2.innerHTML = Division;

						let boton = document.createElement("button");
						boton.classList.add('btn', 'btn-danger', 'btn-xs');
						boton.addEventListener("click", eliminarDivision);
						cel3.appendChild(boton);

						let icono = document.createElement("span");
						icono.classList.add('glyphicon', 'glyphicon-trash');
						boton.appendChild(icono);
					}

					$("#selectDivision").val("");
				} else {
					toastr.warning('La división ya esta agregada', 'Advertencia');
				}
			} else {

				for (var i = 0; i <= 0; i++) {
					let row = tbody.insertRow(i);
					let cel1 = row.insertCell(0);
					let cel2 = row.insertCell(1);
					let cel3 = row.insertCell(2);

					cel1.innerHTML = idDivision;
					cel2.innerHTML = Division;

					let boton = document.createElement("button");
					boton.classList.add('btn', 'btn-danger', 'btn-xs');
					boton.addEventListener("click", eliminarDivision);
					cel3.appendChild(boton);

					let icono = document.createElement("span");
					icono.classList.add('glyphicon', 'glyphicon-trash');
					boton.appendChild(icono);
				}

				$("#selectDivision").val("");
			}
		} else {
			toastr.warning('Seleccione una división', 'Advertencia');
		}
	});

	////////////////////////////////////////////////////
	/////////// Confirguracoín Cuotas //////////////////
	$("#txtCuota_Inicial").change(function (event) {
		let Cuota = 0;
		let CI = parseInt($("#txtCuota_Inicial").val());
		let CF = parseInt($("#txtCuota_Final").val());
		let MLC = parseInt($("#txtMeses_Cuota").val());
		let MA = parseInt($("#txtMeses_Actuales").val());

		if (MLC != null && MLC != "" && MLC > 0) {
			Cuota = (((CF - CI) / MLC) * MA) + CI;
		} else {
			Cuota = (((CF - CI) / 1) * MA) + CI;
		}

		$("#txtCuota").val(parseFloat(Cuota).toFixed(2));
	});

	$("#txtCuota_Final").change(function (event) {
		let Cuota = 0;
		let CI = parseInt($("#txtCuota_Inicial").val());
		let CF = parseInt($("#txtCuota_Final").val());
		let MLC = parseInt($("#txtMeses_Cuota").val());
		let MA = parseInt($("#txtMeses_Actuales").val());

		if (MLC != null && MLC != "" && MLC > 0) {
			Cuota = (((CF - CI) / MLC) * MA) + CI;
		} else {
			Cuota = (((CF - CI) / 1) * MA) + CI;
		}
		$("#txtCuota").val(parseFloat(Cuota).toFixed(2));
	});

	$("#txtMeses_Cuota").change(function (event) {
		let Cuota = 0;
		let CI = parseInt($("#txtCuota_Inicial").val());
		let CF = parseInt($("#txtCuota_Final").val());
		let MLC = parseInt($("#txtMeses_Cuota").val());
		let MA = parseInt($("#txtMeses_Actuales").val());

		if (MLC != null && MLC != "" && MLC > 0) {
			Cuota = (((CF - CI) / MLC) * MA) + CI;
		} else {
			Cuota = (((CF - CI) / 1) * MA) + CI;
		}

		$("#txtCuota").val(parseFloat(Cuota).toFixed(2));
	});

	$("#txtMeses_Actuales").change(function (event) {
		let Cuota = 0;
		let CI = parseInt($("#txtCuota_Inicial").val());
		let CF = parseInt($("#txtCuota_Final").val());
		let MLC = parseInt($("#txtMeses_Cuota").val());
		let MA = parseInt($("#txtMeses_Actuales").val());

		if (MLC != null && MLC != "" && MLC > 0) {
			Cuota = (((CF - CI) / MLC) * MA) + CI;
		} else {
			Cuota = (((CF - CI) / 1) * MA) + CI;
		}

		$("#txtCuota").val(parseFloat(Cuota).toFixed(2));
	});


	//////////////////////////////////////////////
	/////////////// Editar Cuotas ////////////////

	$("#txtCuota_Inicial_Editar").change(function (event) {
		let Cuota = 0;
		let CI = parseInt($("#txtCuota_Inicial_Editar").val());
		let CF = parseInt($("#txtCuota_Final_Editar").val());
		let MLC = parseInt($("#txtMeses_Cuota_Editar").val());
		let MA = parseInt($("#txtMeses_Actuales_Editar").val());

		if (MLC != null && MLC != "" && MLC > 0) {
			Cuota = (((CF - CI) / MLC) * MA) + CI;
		} else {
			Cuota = (((CF - CI) / 1) * MA) + CI;
		}

		$("#txtCuota_Editar").val(parseFloat(Cuota).toFixed(2));
	});

	$("#txtCuota_Final_Editar").change(function (event) {
		let Cuota = 0;
		let CI = parseInt($("#txtCuota_Inicial_Editar").val());
		let CF = parseInt($("#txtCuota_Final_Editar").val());
		let MLC = parseInt($("#txtMeses_Cuota_Editar").val());
		let MA = parseInt($("#txtMeses_Actuales_Editar").val());

		if (MLC != null && MLC != "" && MLC > 0) {
			Cuota = (((CF - CI) / MLC) * MA) + CI;
		} else {
			Cuota = (((CF - CI) / 1) * MA) + CI;
		}

		$("#txtCuota_Editar").val(parseFloat(Cuota).toFixed(2));
	});

	$("#txtMeses_Cuota_Editar").change(function (event) {
		let Cuota = 0;
		let CI = parseInt($("#txtCuota_Inicial_Editar").val());
		let CF = parseInt($("#txtCuota_Final_Editar").val());
		let MLC = parseInt($("#txtMeses_Cuota_Editar").val());
		let MA = parseInt($("#txtMeses_Actuales_Editar").val());

		if (MLC != null && MLC != "" && MLC > 0) {
			Cuota = (((CF - CI) / MLC) * MA) + CI;
		} else {
			Cuota = (((CF - CI) / 1) * MA) + CI;
		}

		$("#txtCuota_Editar").val(parseFloat(Cuota).toFixed(2));
	});

	$("#txtMeses_Actuales_Editar").change(function (event) {
		let Cuota = 0;
		let CI = parseInt($("#txtCuota_Inicial_Editar").val());
		let CF = parseInt($("#txtCuota_Final_Editar").val());
		let MLC = parseInt($("#txtMeses_Cuota_Editar").val());
		let MA = parseInt($("#txtMeses_Actuales_Editar").val());

		if (MLC != null && MLC != "" && MLC > 0) {
			Cuota = (((CF - CI) / MLC) * MA) + CI;
		} else {
			Cuota = (((CF - CI) / 1) * MA) + CI;
		}

		$("#txtCuota_Editar").val(parseFloat(Cuota).toFixed(2));
	});

	// Habilitar Div Coordinadores //
	$("#check_Coordinador_Editar").click(function (event) {

		if ($('#check_Coordinador_Editar').prop('checked') == true) {
			$("#div_Asignacion_region").css('display', '');
		} else {
			$("#div_Asignacion_region").css('display', 'none');
		}
	});

	/// Acción Agregar Distribuidor ///
	$("#btnAddDistri").click(function (event) {

		let Nombre = $("#txtNombre").val();
		let Apellidos = $("#txtApellidos").val();
		let Empresa = $("#txtEmpresa").val();
		let Alias   = $("#txtAlias").val();
		let Coordinador   = $("#txtCoordinador").val();
		let Director   = $("#txtDirector").val();
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
		let idSucursal = $("#select_Sucursal").val();
		let Contrasena = $("#txtPaswword").val();
		let Confirmacion = $("#txtConfirmacion").val();
		let Entrega = $("#select_Entrega").val();
		let Region = $("#txtRegion").val();
		let Zona = $("#txtZona").val();
		let Idioma = $("#select_Idioma").val();
		let Impuesto = $("#txtImpuesto").val();
		let MinimoEnvio = $("#txtMinimoEnvio").val();
		let Cuota = $("#txtCuota").val();;
		let Cuota_Inicial = $("#txtCuota_Inicial").val();
		let Cuota_Final = $("#txtCuota_Final").val();
		let Meses_Cuota = $("#txtMeses_Cuota").val();
		let Meses_Actual = $("#txtMeses_Actuales").val();
		let Clientes_x_dia = $("#txtClientes_x_dia").val();
		let idBloque = $("#select_Bloque").val();
		let validateRFC = rfcValido(RFC);
		let Banderazo = $("#txtBanderazo").val();

		let Puntos = 0;
		let Facturacion = 1;
		let Minimo = 1;
		let Envio = 1;

		let ObjDate = new Date();
		let AsignacionDivision = new Array();

		let tbody = document.getElementById("fetchDivisiones").tBodies[0];
		let Fecha = ObjDate.getFullYear() + "-" + parseInt(ObjDate.getMonth() + 1) + "-" + ObjDate.getDate() + " " + ObjDate.getHours() + ":" + ObjDate.getMinutes() + ":" + ObjDate.getSeconds();

		($('#check_Generar_Puntos').prop('checked')) ? Puntos = 1: Puntos = 0;
		($('#check_Facturacion').prop('checked')) ? Facturacion = 1: Facturacion = 0;
		($('#check_Minimo_Compra').prop('checked')) ? Minimo = 1: Minimo = 0;
		($('#check_Envio_Local').prop('checked')) ? Envio = 1: Envio = 0;

		///////////////////////////////////////////////////////
		//// Agregar Asignación División Update 04/07/2019 ////
		///////////////////////////////////////////////////////
		if (tbody.rows.length > 0) {
			for (var i = 0; i < tbody.rows.length; i++) {
				AsignacionDivision.push(tbody.rows[i].cells[0].innerHTML);
			}
		}
		///////////////////////////////////////////////////////
		//// Agregar Asignación División Update 04/07/2019 ////
		///////////////////////////////////////////////////////

		if (Contrasena == Confirmacion) {
			if (Nombre != "" && Apellidos != "" && RFC != "" && Contrasena != "" && idSucursal != "" && Idioma != "" && Entrega != "" && idBloque != "" && Banderazo != "") {
				if (validateRFC) {
					let formData = new FormData();
					formData.append("Nombre", Nombre);
					formData.append("Apellidos", Apellidos);
					formData.append("Empresa", Empresa);
					formData.append("Alias", Alias);
					formData.append("Coordinador", Coordinador);
					formData.append("Director", Director);
					formData.append("Cargo", Cargo);
					formData.append("Calle_numero", Calle);
					formData.append("Colonia", Colonia);
					formData.append("Ciudad", Ciudad);
					formData.append("Municipio", Municipio);
					formData.append("Estado", Estado);
					formData.append("Pais", Pais);
					formData.append("CP", CP);
					formData.append("RFC", validateRFC);
					formData.append("Tel1", Tel1);
					formData.append("Tel2", Tel2);
					formData.append("Email", Email);
					formData.append("Descuento_%", Descuento);
					formData.append("Status", 'Activo');
					formData.append("idSucursal", idSucursal);
					formData.append("Contrasena", Contrasena);
					formData.append("Dia_entrega", Entrega);
					formData.append("Region", Region);
					formData.append("Zona", Zona);
					formData.append("Idioma", Idioma);
					formData.append("Impuesto", Impuesto);
					formData.append("Generar_puntos", Puntos);
					formData.append("MinimoEnvio", MinimoEnvio);
					formData.append("Cuota", Cuota);
					formData.append("Facturacion", Facturacion);
					formData.append("Minimo_Compra", Minimo);
					formData.append("Cuota_Inicial", Cuota_Inicial);
					formData.append("Cuota_Final", Cuota_Final);
					formData.append("Meses_Actual", Meses_Actual);
					formData.append("Meses_Cuota", Meses_Cuota);
					formData.append("Clientes_x_dia", Clientes_x_dia);
					formData.append("idBloque", idBloque);
					formData.append("Guia_Envio_Auto", Envio);
					formData.append("idDivision", AsignacionDivision);
					formData.append("Banderazo", Banderazo);

					$.ajax({
							url: window.dir + 'index.php/Controller_Distribuidores/AddDistribuidor',
							type: 'POST',
							processData: false,
							contentType: false,
							timeout: 800000,
							data: formData,
							beforeSend: function () {
								$("#loadingHeader").css('display', '');
								$("#btnCerrarAddDistri").css('display', 'none');
								$("#loadingCerrarAddDistri").css('display', '');
								$("#btnAddDistri").css('display', 'none');
								$("#loadingAddDistri").css('display', '');
							},
							success: function (data) {
								console.log(data);

								switch (parseInt(data.trim())) {

									case 0:
										toastr.error('Ocurrio un error al crear al distribuidor', 'Error');
										break;

									case 1:
										Limpiar(1);
										toastr.success('Distribuidor agregado con exito', 'Correcto');
										break;

									default:
										toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
								}
							}
						})
						.done(function () {
							$("#loadingHeader").css('display', 'none');
							$("#btnCerrarAddDistri").css('display', '');
							$("#loadingCerrarAddDistri").css('display', 'none');
							$("#btnAddDistri").css('display', '');
							$("#loadingAddDistri").css('display', 'none');
						})
						.fail(function () {
							$("#loadingHeader").css('display', 'none');
							$("#btnCerrarAddDistri").css('display', '');
							$("#loadingCerrarAddDistri").css('display', 'none');
							$("#btnAddDistri").css('display', '');
							$("#loadingAddDistri").css('display', 'none');
							// Abrir modal Verifique conexión
							$("#modalErrorConexion").modal("show");
						})
						.always(function () {});
				}else{
					toastr.error('El RFC esta incorrecto o no tiene el formato necesario.', 'Error');
				}
			} else {
				toastr.error('Algunos campos obligatorios estan vacios', 'Error');
			}
		} else {
			toastr.warning('Las Contraseñas no coinciden', 'Advertencia');
		}
	});

	// Acción Click DataTable Distribuidores //
	document.getElementById("fetchDistribuidores").onclick = function (e) {
		FETCHDISTRIBUIDORES = e.target.parentNode;

		let formData = new FormData();
		formData.append("idCliente", FETCHDISTRIBUIDORES.childNodes[0].innerHTML);

		$.ajax({
            url: window.dir + 'index.php/Controller_Distribuidores/getInfoDireccionEnvio',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            data: formData,
            beforeSend: function () {
                $('#loadingHeader').css('display', '');
                $('#btnAgregarDistri').css('display', 'none');
                $('#loadingAgregarDistri').css('display', '');
                $('#btnEditarDistri').css('display', 'none');
                $('#loadingEditarDistri').css('display', '');
                $('#btnEliminarDistri').css('display', 'none');
                $('#loadingEliminarDistri').css('display', '');
                $('#btnAgregarDireccion').css('display', 'none');
                $('#loadingAgregarDireccion').css('display', '');
                $('#btnEditarDireccion').css('display', 'none');
                $('#loadingEditarDireccion').css('display', '');
                $('#btnEliminarDireccion').css('display', 'none');
                $('#loadingEliminarDireccion').css('display', '');
            },
            success: function (data) {
                let parsed = JSON.parse(data);

                if (parsed != null && parsed != "") {
                    let Direccion_Envio = document.getElementById("fetchDireccionEnvio");
                    let tbody_Detalle = Direccion_Envio.tBodies[0];

                    $('#fetchDireccionEnvio').DataTable().destroy();
                    Direccion_Envio.tBodies[0].innerHTML = "";

                    for (var i = 0; i < parsed.length; i++) {

                        let row = tbody_Detalle.insertRow(i);
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
                        let cel12 = row.insertCell(11);
                        let cel13 = row.insertCell(12);
                        let cel14 = row.insertCell(13);
						let cel15 = row.insertCell(14);

                        cel1.innerHTML = parsed[i]['ID'];
                        cel2.innerHTML = parsed[i]['Calle'];
                        cel3.innerHTML = parsed[i]['Numext'];
                        cel4.innerHTML = parsed[i]['Numint'];
                        cel5.innerHTML = parsed[i]['Pais'];
                        cel6.innerHTML = parsed[i]['Estado'];
                        cel7.innerHTML = parsed[i]['Municipio'];
                        cel8.innerHTML = parsed[i]['Ciudad'];
                        cel9.innerHTML = parsed[i]['Colonia'];
                        cel10.innerHTML = parsed[i]['CP'];
                        cel11.innerHTML = parsed[i]['Contacto'];
                        cel12.innerHTML = parsed[i]['Empresa'];
                        cel13.innerHTML = parsed[i]['Tel'];
                        cel14.innerHTML = parsed[i]['Cel'];

                        (parsed[i]['Status'] == 'Activo') ? cel15.innerHTML = '<label class="badge badge-success">' + parsed[i]['Status'] + '</label>': cel15.innerHTML = '<label class="badge badge-danger">' + parsed[i]['Status'] + '</label>';
                    }

                    fetch("fetchDireccionEnvio");
				}
				else{
					$('#fetchDireccionEnvio').DataTable().destroy();
					document.getElementById("fetchDireccionEnvio").tBodies[0].innerHTML = "";
				}
            }
        })
        .done(function () {
            $('#loadingHeader').css('display', 'none');
            $('#btnAgregarDistri').css('display', '');
            $('#loadingAgregarDistri').css('display', 'none');
            $('#btnEditarDistri').css('display', '');
            $('#loadingEditarDistri').css('display', 'none');
            $('#btnEliminarDistri').css('display', '');
            $('#loadingEliminarDistri').css('display', 'none');
            $('#btnAgregarDireccion').css('display', '');
            $('#loadingAgregarDireccion').css('display', 'none');
            $('#btnEditarDireccion').css('display', '');
            $('#loadingEditarDireccion').css('display', 'none');
            $('#btnEliminarDireccion').css('display', '');
            $('#loadingEliminarDireccion').css('display', 'none');
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
			$('#loadingHeader').css('display', 'none');
            $('#btnAgregarDistri').css('display', '');
            $('#loadingAgregarDistri').css('display', 'none');
            $('#btnEditarDistri').css('display', '');
            $('#loadingEditarDistri').css('display', 'none');
            $('#btnEliminarDistri').css('display', '');
            $('#loadingEliminarDistri').css('display', 'none');
            $('#btnAgregarDireccion').css('display', '');
            $('#loadingAgregarDireccion').css('display', 'none');
            $('#btnEditarDireccion').css('display', '');
            $('#loadingEditarDireccion').css('display', 'none');
            $('#btnEliminarDireccion').css('display', '');
            $('#loadingEliminarDireccion').css('display', 'none');
			// Abrir modal Verifique conexión
			$("#modalErrorConexion").modal("show");
        })
        .always(function () {
        });
	}

	// Abrir modal Editar Distribuidor //
	$("#btnEditarDistri").click(function (e) { 
		
		if(FETCHDISTRIBUIDORES != null){

			let formData = new FormData();
            formData.append("idCliente", window.FETCHDISTRIBUIDORES.childNodes[0].innerHTML);

            $.ajax({
               	url: dir + 'index.php/Controller_Distribuidores/getDistribuidorById',
               	type: 'POST',
               	processData: false,
               	contentType: false,
               	timeout: 800000,
               	data: formData,
               	beforeSend : function ()
                {
                    $('#loadingHeader').css('display', '');
					$('#btnAgregarDistri').css('display', 'none');
					$('#loadingAgregarDistri').css('display', '');
					$('#btnEditarDistri').css('display', 'none');
					$('#loadingEditarDistri').css('display', '');
					$('#btnEliminarDistri').css('display', 'none');
					$('#loadingEliminarDistri').css('display', '');
					$('#btnAgregarDireccion').css('display', 'none');
					$('#loadingAgregarDireccion').css('display', '');
					$('#btnEditarDireccion').css('display', 'none');
					$('#loadingEditarDireccion').css('display', '');
					$('#btnEliminarDireccion').css('display', 'none');
					$('#loadingEliminarDireccion').css('display', '');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);
                    document.getElementById("fetchDivisionesEditar").tBodies[0].innerHTML = "";
					let tbody = document.getElementById("fetchDivisionesEditar").tBodies[0];
					
					console.log(parsed);

                    if (parsed != null && parsed != ""){

						(parsed['Cliente'][0]['Status'] == 'Inactivo') ? $("#check_Status").prop('checked', true) : $("#check_Status").prop('checked', false);

                    	(parsed['Cliente'][0]['Generar_puntos'] == 1) ? $("#check_Generar_Puntos_Editar").prop('checked', true) : $("#check_Generar_Puntos_Editar").prop('checked', false);

                    	(parsed['Cliente'][0]['Facturacion'] == 1) ? $("#check_Facturacion_Editar").prop('checked', true) : $("#check_Facturacion_Editar").prop('checked', false);

                    	(parsed['Cliente'][0]['Minimo_Compra'] == 1) ? $("#check_Minimo_Compra_Editar").prop('checked', true) : $("#check_Minimo_Compra_Editar").prop('checked', false);

						(parsed['Cliente'][0]['Guia_Envio_Auto'] == 1) ? $("#check_Envio_Local_Editar").prop('checked', true) : $("#check_Envio_Local_Editar").prop('checked', false);

                        ///////////////////////////////////////////////////////
                        //// Agregar Asignación División Update 04/07/2019 ////
                        ///////////////////////////////////////////////////////

                        if (parsed['Asignacion'].length > 0){
                          for (var i = 0; i < parsed['Asignacion'].length; i++){

							let row  = tbody.insertRow(i);
                            let cel1 = row.insertCell(0);
                            let cel2 = row.insertCell(1);
                            let cel3 = row.insertCell(2);

                            cel1.innerHTML = parsed['Asignacion'][i]['idDivision'];
                            cel2.innerHTML = parsed['Asignacion'][i]['Division'];

                            let boton = document.createElement("button");
                            boton.classList.add('btn', 'btn-danger', 'btn-xs');
                            boton.addEventListener("click",eliminarDivisionEditar);
                            cel3.appendChild(boton);

                            let icono = document.createElement("span");
                            icono.classList.add('glyphicon', 'glyphicon-trash');
                            boton.appendChild(icono);
                          }
                        }

                        ///////////////////////////////////////////////////////
                        //// Agregar Asignación División Update 04/07/2019 ////
                        ///////////////////////////////////////////////////////

                        //WebServices(parsed['Cliente'][0]['CP']);
                        $("#txtNombre_Editar").val(parsed['Cliente'][0]['Nombre']);
                        $("#txtApellidos_Editar").val(parsed['Cliente'][0]['Apellidos']);
						$("#txtEmpresa_Editar").val(parsed['Cliente'][0]['Empresa']);
						$("#txtAlias_Editar").val(parsed['Cliente'][0]['Alias']);
						$("#txtCoordinador_Editar").val(parsed['Cliente'][0]['Coordinador']);
						$("#txtDirector_Editar").val(parsed['Cliente'][0]['Director']);
                        $("#txtCargo_Editar").val(parsed['Cliente'][0]['Cargo']);
                        $("#txtCalle_Editar").val(parsed['Cliente'][0]['Calle_numero']);
                        $("#txtCiudad_Editar").val(parsed['Cliente'][0]['Ciudad']);
                        $("#txtCP_Editar").val(parsed['Cliente'][0]['CP']);
                        $("#txtRFC_Editar").val(parsed['Cliente'][0]['RFC']);
                        $("#txtTel1_Editar").val(parsed['Cliente'][0]['Tel1']);
                        $("#txtTel2_Editar").val(parsed['Cliente'][0]['Tel2']);
                        $("#txtEmail_Editar").val(parsed['Cliente'][0]['Email']);
                        $("#txtDescuento_Editar").val(parsed['Cliente'][0]['Descuento_%']);
						$("#select_Entrega_Editar").val(parsed['Cliente'][0]['Dia_entrega']);
                        $("#txtRegion_Editar").val(parsed['Cliente'][0]['Region']);
						$("#txtZona_Editar").val(parsed['Cliente'][0]['Zona']);
						$("#txtPaswword_Editar").val(parsed['Cliente'][0]['Contrasena']);
						$("#txtConfirmacion_Editar").val(parsed['Cliente'][0]['Contrasena']);
						$("#select_Idioma_Editar").val(parsed['Cliente'][0]['Idioma']);
						$("#txtImpuesto_Editar").val(parsed['Cliente'][0]['Impuesto']);
						$("#txtMinimoEnvio_Editar").val(parsed['Cliente'][0]['Minimo_envio']);
						$("#txtPuntos_Editar").val(parsed['Cliente'][0]['Puntos']);
						$("#select_Sucursal_Editar").val(parsed['Cliente'][0]['idSucursal']);
						$("#txtCuota_Editar").val(parsed['Cliente'][0]['Cuota']);
						$("#txtCuota_Inicial_Editar").val(parsed['Cliente'][0]['Cuota_Inicial']);
						$("#txtCuota_Final_Editar").val(parsed['Cliente'][0]['Cuota_Final']);
						$("#txtMeses_Cuota_Editar").val(parsed['Cliente'][0]['Meses_Cuota']);
						$("#txtMeses_Actuales_Editar").val(parsed['Cliente'][0]['Meses_Actuales']);
						$("#txtClientes_x_dia_Editar").val(parsed['Cliente'][0]['Clientes_x_dia']);
						$("#select_Bloque_Editar").val(parsed['Cliente'][0]['idBloque']);
						$("#txtEstado_Editar").val(parsed['Cliente'][0]['Estado']);
						$("#txtMunicipio_Editar").val(parsed['Cliente'][0]['Municipio']);
						$("#txtPais_Editar").val(parsed['Cliente'][0]['Pais']);
						$(".txtColonia_Editar").val(parsed['Cliente'][0]['Colonia']);
						$("#txtBanderazo_Editar").val(parsed['Cliente'][0]['Banderazo']);

						validarInputLoad(parsed['Cliente'][0]['RFC']);

						$("#modalEditarDistri").modal("show");
                    }
                }
           	})
           	.done(function() {
				$('#loadingHeader').css('display', 'none');
				$('#btnAgregarDistri').css('display', '');
				$('#loadingAgregarDistri').css('display', 'none');
				$('#btnEditarDistri').css('display', '');
				$('#loadingEditarDistri').css('display', 'none');
				$('#btnEliminarDistri').css('display', '');
				$('#loadingEliminarDistri').css('display', 'none');
				$('#btnAgregarDireccion').css('display', '');
				$('#loadingAgregarDireccion').css('display', 'none');
				$('#btnEditarDireccion').css('display', '');
				$('#loadingEditarDireccion').css('display', 'none');
				$('#btnEliminarDireccion').css('display', '');
				$('#loadingEliminarDireccion').css('display', 'none');
           	})
           	.fail(function() {
				$('#loadingHeader').css('display', 'none');
				$('#btnAgregarDistri').css('display', '');
				$('#loadingAgregarDistri').css('display', 'none');
				$('#btnEditarDistri').css('display', '');
				$('#loadingEditarDistri').css('display', 'none');
				$('#btnEliminarDistri').css('display', '');
				$('#loadingEliminarDistri').css('display', 'none');
				$('#btnAgregarDireccion').css('display', '');
				$('#loadingAgregarDireccion').css('display', 'none');
				$('#btnEditarDireccion').css('display', '');
				$('#loadingEditarDireccion').css('display', 'none');
				$('#btnEliminarDireccion').css('display', '');
				$('#loadingEliminarDireccion').css('display', 'none');
				// Abrir modal Verifique conexión
				$("#modalErrorConexion").modal("show");
           	})
           	.always(function() {
           	});
		}
		else{
			toastr.warning('Seleccione a un distribuidor', 'Advertencia');
		}
	});

	//Consumir WebServices Codigo Postal Editar Usuario
	/*$("#txtCP_Editar").change(function (event) {

		let CP = $("#txtCP_Editar").val();
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
					$("#btnCerrarUpdateDistri").css('display', 'none');
					$("#loadingCerrarUpdateDistri").css('display', '');
					$("#btnUpdateDistri").css('display', 'none');
					$("#loadingUpdateDistri").css('display', '');
				},
				success: function (data) {
					console.log(data);

					if (data.estado != null && data.estado != "") {
						$("#txtPais_Editar").val("México");
						$("#txtEstado_Editar").val(data.estado);
						$("#txtMunicipio_Editar").val(data.municipio);
						$("#txtColonia_Editar").empty();

						for (var i = 0; i < data.colonias.length; i++) {
							$("#txtColonia_Editar").append("<option value='" + data.colonias[i] + "'>" + data.colonias[i] + "</option>");
						}

						$("#txtEstado_Editar").attr('readonly', 'readonly');
						$("#txtMunicipio_Editar").attr('readonly', 'readonly');
						$("#txtPais_Editar").attr('readonly', 'readonly');
					} else {
						//$("#txtEstado_Editar").val("");
						//$("#txtMunicipio_Editar").val("");
						//$("#txtPais_Editar").val("");
						$("#txtEstado_Editar").removeAttr('readonly');
						$("#txtMunicipio_Editar").removeAttr('readonly');
						$("#txtPais_Editar").removeAttr('readonly');
						$("#txtColonia_Editar").empty();
					}
				}
			})
			.done(function () {
				$("#loadingHeader").css('display', 'none');
				$("#btnCerrarUpdateDistri").css('display', '');
				$("#loadingCerrarUpdateDistri").css('display', 'none');
				$("#btnUpdateDistri").css('display', '');
				$("#loadingUpdateDistri").css('display', 'none');
			})
			.fail(function () {
				$("#loadingHeader").css('display', 'none');
				$("#btnCerrarUpdateDistri").css('display', '');
				$("#loadingCerrarUpdateDistri").css('display', 'none');
				$("#btnUpdateDistri").css('display', '');
				$("#loadingUpdateDistri").css('display', 'none');

				// Abrir modal Verifique conexión
				$("#modalErrorConexion").modal("show");
			})
			.always(function () {});
	});*/

	// Validate Password Editar Distribuidor //
	$("#txtPaswword_Editar").change(function (event) {
		let Password = $("#txtPaswword_Editar").val();
		let Confirmacion = $("#txtConfirmacion_Editar").val();

		if (Password != "") {
			if (Confirmacion != "") {
				if (Password == Confirmacion) {
					$("#validatePasswordEditar").css('display', 'none');
					$("#validateConfirmacionEditar").css('display', 'none');
				} else {
					$("#validatePasswordEditar").removeClass('hide');
					$("#validatePasswordEditar").css('display', '');
					$("#validateConfirmacionEditar").removeClass('hide');
					$("#validateConfirmacionEditar").css('display', '');
				}
			} else {
				$("#validatePasswordEditar").css('display', 'none');
				$("#validateConfirmacionEditar").css('display', 'none');
			}
		} else {
			$("#validatePasswordEditar").css('display', 'none');
			$("#validateConfirmacionEditar").css('display', 'none');
		}
	});

	// Validate Password Editar Distribuidor//
	$("#txtConfirmacion_Editar").change(function (event) {
		let Password = $("#txtPaswword_Editar").val();
		let Confirmacion = $("#txtConfirmacion_Editar").val();

		if (Confirmacion != "") {
			if (Password != "") {
				if (Password == Confirmacion) {
					$("#validatePasswordEditar").css('display', 'none');
					$("#validateConfirmacionEditar").css('display', 'none');
				} else {
					$("#validatePasswordEditar").removeClass('hide');
					$("#validatePasswordEditar").css('display', '');
					$("#validateConfirmacionEditar").removeClass('hide');
					$("#validateConfirmacionEditar").css('display', '');
				}
			} else {
				$("#validatePasswordEditar").css('display', 'none');
				$("#validateConfirmacion").css('display', 'none');
			}
		} else {
			$("#validatePasswordEditar").css('display', 'none');
			$("#validateConfirmacionEditar").css('display', 'none');
		}
	});

	/// Editar Division AL Distribuidor ///
	$("#btnAgregarDivisionEditar").click(function (event) {

		let idDivision = $("#selectDivision_Editar").val();
		let Division = $("#selectDivision_Editar option:selected").text();
		let Contador = 0;

		if (idDivision != "") {

			let tbody = document.getElementById("fetchDivisionesEditar").tBodies[0];

			if (tbody.rows.length > 0) {

				for (var i = 0; i < tbody.rows.length; i++) {
					if (tbody.rows[i].cells[0].innerHTML == idDivision) {
						Contador = 1;
					}
				}

				if (Contador == 0) {

					for (var i = 0; i <= 0; i++) {
						let row = tbody.insertRow(i);
						let cel1 = row.insertCell(0);
						let cel2 = row.insertCell(1);
						let cel3 = row.insertCell(2);

						cel1.innerHTML = idDivision;
						cel2.innerHTML = Division;

						let boton = document.createElement("button");
						boton.classList.add('btn', 'btn-danger', 'btn-xs');
						boton.addEventListener("click", eliminarDivisionEditar);
						cel3.appendChild(boton);

						let icono = document.createElement("span");
						icono.classList.add('glyphicon', 'glyphicon-trash');
						boton.appendChild(icono);
					}

					$("#selectDivision_Editar").val("");
				} else {
					toastr.warning('La división ya esta agregada', 'Advertencia');
				}
			} else {

				for (var i = 0; i <= 0; i++) {
					let row = tbody.insertRow(i);
					let cel1 = row.insertCell(0);
					let cel2 = row.insertCell(1);
					let cel3 = row.insertCell(2);

					cel1.innerHTML = idDivision;
					cel2.innerHTML = Division;

					let boton = document.createElement("button");
					boton.classList.add('btn', 'btn-danger', 'btn-xs');
					boton.addEventListener("click", eliminarDivisionEditar);
					cel3.appendChild(boton);

					let icono = document.createElement("span");
					icono.classList.add('glyphicon', 'glyphicon-trash');
					boton.appendChild(icono);
				}

				$("#selectDivision_Editar").val("");
			}
		} else {
			toastr.warning('Seleccione una división', 'Advertencia');
		}
	});

	// Boton Modificar Distribuidor //
	$("#btnUpdateDistri").click(function (e) { 

		let Nombre      = $("#txtNombre_Editar").val();
        let Apellidos   = $("#txtApellidos_Editar").val();
		let Empresa     = $("#txtEmpresa_Editar").val();
		let Alias       = $("#txtAlias_Editar").val();
		let Coordinador = $("#txtCoordinador_Editar").val();
		let Director    = $("#txtDirector_Editar").val();
        let Cargo       = $("#txtCargo_Editar").val();
        let Calle       = $("#txtCalle_Editar").val();
        let Colonia     = $(".txtColonia_Editar").val();
        let Ciudad      = $("#txtCiudad_Editar").val();
        let Municipio   = $("#txtMunicipio_Editar").val();
        let Estado      = $("#txtEstado_Editar").val();
        let Pais        = $("#txtPais_Editar").val();
        let CP          = $("#txtCP_Editar").val();
        let RFC         = $("#txtRFC_Editar").val();
        let Tel1        = $("#txtTel1_Editar").val();
        let Tel2        = $("#txtTel2_Editar").val();
        let Email       = $("#txtEmail_Editar").val();
        let Descuento   = $("#txtDescuento_Editar").val();
        let idSucursal  = $("#select_Sucursal_Editar").val();
        let Contrasena  = $("#txtPaswword_Editar").val();
		let Confirmacion= $("#txtConfirmacion_Editar").val();
		let Entrega     = $("#select_Entrega_Editar").val();
        let Region      = $("#txtRegion_Editar").val();
        let Zona        = $("#txtZona_Editar").val();
        let Idioma      = $("#select_Idioma_Editar").val();
        let Impuesto    = $("#txtImpuesto_Editar").val();
        let MinimoEnvio = $("#txtMinimoEnvio_Editar").val();
        let Puntos      = $("#txtPuntos_Editar").val();
        let Cuota       = $("#txtCuota_Editar").val();
        let Generar     = 0;
        let Status      = "";
        let Cuota_Inicial = $("#txtCuota_Inicial_Editar").val();
        let Cuota_Final   = $("#txtCuota_Final_Editar").val();
        let Meses_Cuota   = $("#txtMeses_Cuota_Editar").val();
        let Meses_Actual  = $("#txtMeses_Actuales_Editar").val();
        let Facturacion   = 1;
		let Minimo        = 1;
		let Envio         = 0;
		let validateRFC = rfcValido(RFC);
        let tbody = document.getElementById("fetchDivisionesEditar").tBodies[0];
        let AsignacionDivision 	= new Array();
        let Clientes_x_dia      = $("#txtClientes_x_dia_Editar").val();
		let idBloque = $("#select_Bloque_Editar").val();
		let Banderazo = $("#txtBanderazo_Editar").val();
		
        ($('#check_Generar_Puntos_Editar').prop('checked')) ? Generar = 1 : Generar = 0;

        ($('#check_Status').prop('checked')) ? Status = "Inactivo" : Status = "Activo";

        ($('#check_Facturacion_Editar').prop('checked')) ? Facturacion = 1 : Facturacion = 0;
        
		($('#check_Minimo_Compra_Editar').prop('checked')) ? Minimo = 1 : Minimo = 0;

		($('#check_Envio_Local_Editar').prop('checked')) ? Envio = 1 : Envio = 0;
		
        ///////////////////////////////////////////////////////
        //// Agregar Asignación División Update 04/07/2019 ////
		///////////////////////////////////////////////////////
		
		console.log(tbody.rows.length);

        if (tbody.rows.length > 0){
          for (var i = 0; i < tbody.rows.length ; i++){
            AsignacionDivision.push(tbody.rows[i].cells[0].innerHTML);
          }
        }

        ///////////////////////////////////////////////////////
        //// Agregar Asignación División Update 04/07/2019 ////
		///////////////////////////////////////////////////////
		if (Contrasena == Confirmacion) {
			if (Nombre != "" && Apellidos != "" && RFC != "" && Contrasena != "" && idSucursal != "" && Idioma != "" && Entrega != "" && idBloque != "" && Banderazo != "") {
				if(validateRFC){
					let fdUpdate = new FormData();
					fdUpdate.append("ID", FETCHDISTRIBUIDORES.childNodes[0].innerHTML);
					fdUpdate.append("Nombre", Nombre);
					fdUpdate.append("Apellidos", Apellidos);
					fdUpdate.append("Empresa", Empresa);
					fdUpdate.append("Alias", Alias);
					fdUpdate.append("Coordinador", Coordinador);
					fdUpdate.append("Director", Director);
					fdUpdate.append("Cargo", Cargo);
					fdUpdate.append("Calle_numero", Calle);
					fdUpdate.append("Colonia", Colonia);
					fdUpdate.append("Ciudad", Ciudad);
					fdUpdate.append("Municipio", Municipio);
					fdUpdate.append("Estado", Estado);
					fdUpdate.append("Pais", Pais);
					fdUpdate.append("CP", CP);
					fdUpdate.append("RFC", validateRFC);
					fdUpdate.append("Tel1", Tel1);
					fdUpdate.append("Tel2", Tel2);
					fdUpdate.append("Email", Email);
					fdUpdate.append("Descuento_%", Descuento);
					fdUpdate.append("Status", Status);
					fdUpdate.append("idSucursal", idSucursal);
					fdUpdate.append("Contrasena", Contrasena);
					fdUpdate.append("Dia_entrega", Entrega);
					fdUpdate.append("Region", Region);
					fdUpdate.append("Zona", Zona);
					fdUpdate.append("Idioma", Idioma);
					fdUpdate.append("Impuesto", Impuesto);
					fdUpdate.append("Generar_puntos", Generar);
					fdUpdate.append("Puntos", Puntos);
					fdUpdate.append("MinimoEnvio",MinimoEnvio);
					fdUpdate.append("Cuota",Cuota);
					fdUpdate.append("Facturacion",Facturacion);
					fdUpdate.append("Minimo_Compra",Minimo);
					fdUpdate.append("Cuota_Inicial",Cuota_Inicial);
					fdUpdate.append("Cuota_Final",Cuota_Final);
					fdUpdate.append("Meses_Actual",Meses_Actual);
					fdUpdate.append("Meses_Cuota",Meses_Cuota);
					fdUpdate.append('Clientes_x_dia',Clientes_x_dia);
					fdUpdate.append('idBloque',idBloque);
					fdUpdate.append('Guia_Envio_Auto',Envio);
					fdUpdate.append("idDivision",AsignacionDivision);
					fdUpdate.append('Banderazo', Banderazo);

					$.ajax({
						url: window.dir + 'index.php/Controller_Distribuidores/UpdateDistribuidor',
						type: 'POST',
						processData: false,
						contentType: false,
						timeout: 800000,
						data: fdUpdate,
						beforeSend : function ()
						{
							$('#loadingHeader').css('display', '');
							$('#btnCerrarUpdateDistri').css('display', 'none');
							$('#loadingCerrarUpdateDistri').css('display', '');
							$('#btnUpdateDistri').css('display', 'none');
							$('#loadingUpdateDistri').css('display', '');
						},
						success: function(data)
						{
							console.log(data);

							switch (parseInt(data.trim())) {

								case 0:
									toastr.error('Ocurrio un error al modificar al distribuidor', 'Error');
									break;

								case 1:
									Limpiar(2);
									toastr.success('Distribuidor modificado con exito', 'Correcto');
									break;

								default:
									toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
							}
						}
					})
					.done(function() {
						$('#loadingHeader').css('display', 'none');
						$('#btnCerrarUpdateDistri').css('display', '');
						$('#loadingCerrarUpdateDistri').css('display', 'none');
						$('#btnUpdateDistri').css('display', '');
						$('#loadingUpdateDistri').css('display', 'none');
					})
					.fail(function() {
						$('#loadingHeader').css('display', 'none');
						$('#btnCerrarUpdateDistri').css('display', '');
						$('#loadingCerrarUpdateDistri').css('display', 'none');
						$('#btnUpdateDistri').css('display', '');
						$('#loadingUpdateDistri').css('display', 'none');
						$("#modalErrorConexion").modal("show");
					})
					.always(function() {
					});
				}else{
					toastr.error('El RFC esta incorrecto o no tiene el formato necesario.', 'Error');
				}
        	}
        	else{
            	toastr.error('Algunos campos obligatorios estan vacios', 'Error');
			}
		}
		else{
			toastr.warning('Las contraseñas no coinciden', 'Advertencia');
		}
	});

	/////////////////////////////////
	////  Eliminar Distribuidor  ////
	/////////////////////////////////

	$("#btnEliminarDistri").click(function (e) { 
		
		if (FETCHDISTRIBUIDORES != null) {
			if (FETCHDISTRIBUIDORES.childNodes[16].childNodes[0].innerHTML == 'Activo') {
				
				swal({
					title: "¿Esta seguro que desea eliminar al distribuidor?",
					text: "Una vez eliminada pasara a un estatus como inactivo",
					icon: "warning",
					buttons: true,
					dangerMode: true,
				})
				.then((willDelete) => {
					if (willDelete) {
					  
						let formData = new FormData();
						formData.append("ID", window.FETCHDISTRIBUIDORES.childNodes[0].innerHTML);
  
						$.ajax({
							url: window.dir + 'index.php/Controller_Distribuidores/deleteDistrbuidor',
							type: 'POST',
							processData: false,
							contentType: false,
							timeout: 800000,
							data: formData,
							beforeSend : function ()
							{
								$('#loadingHeader').css('display', '');
								$('#btnAgregarDistri').css('display', 'none');
								$('#loadingAgregarDistri').css('display', '');
								$('#btnEditarDistri').css('display', 'none');
								$('#loadingEditarDistri').css('display', '');
								$('#btnEliminarDistri').css('display', 'none');
								$('#loadingEliminarDistri').css('display', '');
								$('#btnAgregarDireccion').css('display', 'none');
								$('#loadingAgregarDireccion').css('display', '');
								$('#btnEditarDireccion').css('display', 'none');
								$('#loadingEditarDireccion').css('display', '');
								$('#btnEliminarDireccion').css('display', 'none');
								$('#loadingEliminarDireccion').css('display', '');
							},
							success: function(data)
							{
								console.log(data);
  
								switch (parseInt(data.trim())) {

									case 0:
										toastr.error('Ocurrio un error al eliminar al distribuidor', 'Error');
										break;
		
									case 1:
										Limpiar(3);
										toastr.success('Distribuidor eliminado con exito', 'Correcto');
										break;
		
									default:
										toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
								}
							}
						})
						.done(function() {
							$('#loadingHeader').css('display', 'none');
							$('#btnAgregarDistri').css('display', '');
							$('#loadingAgregarDistri').css('display', 'none');
							$('#btnEditarDistri').css('display', '');
							$('#loadingEditarDistri').css('display', 'none');
							$('#btnEliminarDistri').css('display', '');
							$('#loadingEliminarDistri').css('display', 'none');
							$('#btnAgregarDireccion').css('display', '');
							$('#loadingAgregarDireccion').css('display', 'none');
							$('#btnEditarDireccion').css('display', '');
							$('#loadingEditarDireccion').css('display', 'none');
							$('#btnEliminarDireccion').css('display', '');
							$('#loadingEliminarDireccion').css('display', 'none');
						})
						.fail(function() {
							$('#loadingHeader').css('display', 'none');
							$('#btnAgregarDistri').css('display', '');
							$('#loadingAgregarDistri').css('display', 'none');
							$('#btnEditarDistri').css('display', '');
							$('#loadingEditarDistri').css('display', 'none');
							$('#btnEliminarDistri').css('display', '');
							$('#loadingEliminarDistri').css('display', 'none');
							$('#btnAgregarDireccion').css('display', '');
							$('#loadingAgregarDireccion').css('display', 'none');
							$('#btnEditarDireccion').css('display', '');
							$('#loadingEditarDireccion').css('display', 'none');
							$('#btnEliminarDireccion').css('display', '');
							$('#loadingEliminarDireccion').css('display', 'none');
							// Abrir modal Verifique conexión
							$("#modalErrorConexion").modal("show");
						})
						.always(function() {
						});
  
					}
			  	});
			}
			else{
				toastr.warning('El distribuidor se encuentra como inactivo', 'Advertencia');
			}
		}
		else{
			toastr.warning('Seleccione a un distribuidor', 'Advertencia');
		}
		
	});


	///////////////////////////////////
	/// Agregar Dirección Envio  //////
	///////////////////////////////////

	$("#btnAgregarDireccion").click(function (e) { 
		if (FETCHDISTRIBUIDORES != null) {
			$("#modalAddDireccion").modal("show");
		}
		else{
			toastr.warning('Seleccione a un distribuidor', 'Advertencia');
		}
	});

	//Consumir WebServices Codigo Postal Agregar Dirección Envio //
	$("#txtCP_Envio").change(function (event) {

		let CP = $("#txtCP_Envio").val();
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
				$("#btnCerrarAddDireccion").css('display', 'none');
				$("#loadingCerrarAddDireccion").css('display', '');
				$("#btnAddDireccion").css('display', 'none');
				$("#loadingAddDireccion").css('display', '');
			},
			success: function (data) {
				console.log(data);

				if (data.estado != null && data.estado != "") {
					$("#txtPais_Envio").val("México");
					$("#txtEstado_Envio").val(data.estado);
					$("#txtMunicipio_Envio").val(data.municipio);
					$("#txtColonia_Envio").empty();

					for (var i = 0; i < data.colonias.length; i++) {
						$("#txtColonia_Envio").append("<option value='" + data.colonias[i] + "'>" + data.colonias[i] + "</option>");
					}

					$("#txtEstado_Envio").attr('readonly', 'readonly');
					$("#txtMunicipio_Envio").attr('readonly', 'readonly');
					$("#txtPais_Envio").attr('readonly', 'readonly');
				} else {
					$("#txtEstado_Envio").val("");
					$("#txtMunicipio_Envio").val("");
					$("#txtPais_Envio").val("");
					$("#txtEstado_Envio").removeAttr('readonly');
					$("#txtMunicipio_Envio").removeAttr('readonly');
					$("#txtPais_Envio").removeAttr('readonly');
					$("#txtColonia_Envio").empty();
				}
			}
		})
		.done(function () {
			$("#loadingHeader").css('display', 'none');
			$("#btnCerrarAddDireccion").css('display', '');
			$("#loadingCerrarAddDireccion").css('display', 'none');
			$("#btnAddDireccion").css('display', '');
			$("#loadingAddDireccion").css('display', 'none');
		})
		.fail(function () {
			$("#loadingHeader").css('display', 'none');
			$("#btnCerrarAddDireccion").css('display', '');
			$("#loadingCerrarAddDireccion").css('display', 'none');
			$("#btnAddDireccion").css('display', '');
			$("#loadingAddDireccion").css('display', 'none');

			// Abrir modal Verifique conexión
			$("#modalErrorConexion").modal("show");
		})
		.always(function () {});
	});

	// Acción Agregar Dirección Envio a Distribuidor //
	$("#btnAddDireccion").click(function(event) {

		let Contacto = $("#txtContacto_Envio").val();
		let Empresa  = $("#txtEmpresa_Envio").val();
		let Calle    = $("#txtCalle_Envio").val();
		let Numext   = $("#txtNumext_Envio").val();
		let Numint   = $("#txtNumint_Envio").val();
		let Colonia  = $(".txtColonia_Envio").val();
		let Ciudad   = $("#txtCiudad_Envio").val();
		let Municipio = $("#txtMunicipio_Envio").val();
		let Estado   = $("#txtEstado_Envio").val();
		let Pais     = $("#txtPais_Envio").val();
		let CP       = $("#txtCP_Envio").val();
		let Tel      = $("#txtTel_Envio").val();
		let Cel      = $("#txtCel_Envio").val();
		let Ocurre   = 0;
  
		($('#checkOcurre').prop('checked')) ?  Ocurre = 1 : Ocurre = 0;
  
		if (Contacto != "" && Empresa != "" && Calle != "" && Numext != "" && Colonia != "" && Ciudad != "" && Municipio != "" && Estado != "" && Pais != "" && CP != ""){
			let formData = new FormData();
			formData.append("Contacto", Contacto);
			formData.append("Empresa", Empresa);
			formData.append("Calle", Calle);
			formData.append("Numext", Numext);
			formData.append("Numint", Numint);
			formData.append("Colonia", Colonia);
			formData.append("Ciudad", Ciudad);
			formData.append("Municipio", Municipio);
			formData.append("Estado", Estado);
			formData.append("Pais", Pais);
			formData.append("CP", CP);
			formData.append("Tel", Tel);
			formData.append("Cel", Cel);
			formData.append("idCliente", FETCHDISTRIBUIDORES.childNodes[0].innerHTML);
			formData.append("Status", 'Activo');
			formData.append("Ocurre", Ocurre);
  
		  	$.ajax({
				url: window.dir + 'index.php/Controller_Distribuidores/Add_Direccion',
				type: 'POST',
				processData: false,
				contentType: false,
				timeout: 800000,
				data: formData,
				beforeSend : function ()
				{
					$("#loadingHeader").css('display', '');
					$("#btnCerrarAddDireccion").css('display', 'none');
					$("#loadingCerrarAddDireccion").css('display', '');
					$("#btnAddDireccion").css('display', 'none');
					$("#loadingAddDireccion").css('display', '');
				},
				success: function(data)
				{
					console.log(data);

					switch (parseInt(data.trim())) {

						case 0:
							toastr.error('Ocurrio un error al agregar la dirección', 'Error');
							break;

						case 1:
							getDirecciones(FETCHDISTRIBUIDORES.childNodes[0].innerHTML);
							Limpiar(4);
							toastr.success('Dirección de envio agregada con exito', 'Correcto');
							break;

						default:
							toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
					}
			  	}
			})
			.done(function() {
				$("#loadingHeader").css('display', 'none');
				$("#btnCerrarAddDireccion").css('display', '');
				$("#loadingCerrarAddDireccion").css('display', 'none');
				$("#btnAddDireccion").css('display', '');
				$("#loadingAddDireccion").css('display', 'none');
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				$("#loadingHeader").css('display', 'none');
				$("#btnCerrarAddDireccion").css('display', '');
				$("#loadingCerrarAddDireccion").css('display', 'none');
				$("#btnAddDireccion").css('display', '');
				$("#loadingAddDireccion").css('display', 'none');

				// Abrir modal Verifique conexión
				$("#modalErrorConexion").modal("show");
			})
			.always(function() {
			});
		}
		else{
			toastr.error('Algunos campos obligatorios estan vacios', 'Error');
		}
	});

	///////////////////////////////
	/// Editar Dirección Envio ////
	///////////////////////////////

	// Acción Click DataTable Direcciones Envio //
	document.getElementById("fetchDireccionEnvio").onclick = function (e) {
		FETCHDIRECCIONESENVIO = e.target.parentNode;
	}

	// Abrir Modal Editar Dirección Envio //
	$("#btnEditarDireccion").click(function (e) { 
		if (FETCHDIRECCIONESENVIO != null) {
			
			let formData = new FormData();
			formData.append("id", FETCHDIRECCIONESENVIO.childNodes[0].innerHTML);

			$.ajax({
				url: window.dir + 'index.php/Controller_Distribuidores/getDirrecion',
				type: 'POST',
				processData: false,
				contentType: false,
				timeout: 800000,
				data: formData,
				beforeSend : function ()
				{
					$('#loadingHeader').css('display', '');
					$('#btnAgregarDistri').css('display', 'none');
					$('#loadingAgregarDistri').css('display', '');
					$('#btnEditarDistri').css('display', 'none');
					$('#loadingEditarDistri').css('display', '');
					$('#btnEliminarDistri').css('display', 'none');
					$('#loadingEliminarDistri').css('display', '');
					$('#btnAgregarDireccion').css('display', 'none');
					$('#loadingAgregarDireccion').css('display', '');
					$('#btnEditarDireccion').css('display', 'none');
					$('#loadingEditarDireccion').css('display', '');
					$('#btnEliminarDireccion').css('display', 'none');
					$('#loadingEliminarDireccion').css('display', '');
				},
				success: function(data)
				{
					let parsed = JSON.parse(data);
					console.log(parsed);

					if (parsed != null && parsed != ""){

					WebServicesEnvio(parsed[0]['CP']);

					$("#txtContacto_Envio_Editar").val(parsed[0]['Contacto']);
					$("#txtEmpresa_Envio_Editar").val(parsed[0]['Empresa']);
					$("#txtCalle_Envio_Editar").val(parsed[0]['Calle']);
					$("#txtNumext_Envio_Editar").val(parsed[0]['Numext']);
					$("#txtNumint_Envio_Editar").val(parsed[0]['Numint']);
					$(".txtColonia_Envio_Editar").val(parsed[0]['Colonia']);
					$("#txtCiudad_Envio_Editar").val(parsed[0]['Ciudad']);
					$("#txtCP_Envio_Editar").val(parsed[0]['CP']);
					$("#txtTel_Envio_Editar").val(parsed[0]['Tel']);
					$("#txtCel_Envio_Editar").val(parsed[0]['Cel']);
					$("#txtEstado_Envio_Editar").val(parsed[0]['Estado']);
					$("#txtMunicipio_Envio_Editar").val(parsed[0]['Municipio']);
					$("#txtPais_Envio_Editar").val(parsed[0]['Pais']);

					(parsed[0]['Status'] == 'Inactivo') ? $("#checkStatus").prop("checked", true) : $("#checkStatus").prop("checked", false);
					(parsed[0]['Ocurre'] == 1) ? $("#checkOcurreEditar").prop("checked", true) : $("#checkOcurreEditar").prop("checked", false);
					
					$("#modalUpdateDireccion").modal("show");
				}
				}
			})
			.done(function() {
				$('#loadingHeader').css('display', 'none');
				$('#btnAgregarDistri').css('display', '');
				$('#loadingAgregarDistri').css('display', 'none');
				$('#btnEditarDistri').css('display', '');
				$('#loadingEditarDistri').css('display', 'none');
				$('#btnEliminarDistri').css('display', '');
				$('#loadingEliminarDistri').css('display', 'none');
				$('#btnAgregarDireccion').css('display', '');
				$('#loadingAgregarDireccion').css('display', 'none');
				$('#btnEditarDireccion').css('display', '');
				$('#loadingEditarDireccion').css('display', 'none');
				$('#btnEliminarDireccion').css('display', '');
				$('#loadingEliminarDireccion').css('display', 'none');
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				$('#loadingHeader').css('display', 'none');
				$('#btnAgregarDistri').css('display', '');
				$('#loadingAgregarDistri').css('display', 'none');
				$('#btnEditarDistri').css('display', '');
				$('#loadingEditarDistri').css('display', 'none');
				$('#btnEliminarDistri').css('display', '');
				$('#loadingEliminarDistri').css('display', 'none');
				$('#btnAgregarDireccion').css('display', '');
				$('#loadingAgregarDireccion').css('display', 'none');
				$('#btnEditarDireccion').css('display', '');
				$('#loadingEditarDireccion').css('display', 'none');
				$('#btnEliminarDireccion').css('display', '');
				$('#loadingEliminarDireccion').css('display', 'none');
				// Abrir modal Verifique conexión
				$("#modalErrorConexion").modal("show");
			})
			.always(function() {
			});        
		}
		else{
			toastr.warning('Seleccione una dirección de envio', 'Advertencia');
		}
		
	});

	//Consumir WebServices Codigo Postal Agregar Dirección Envio //
	$("#txtCP_Envio_Editar").change(function (event) {

		let CP = $("#txtCP_Envio_Editar").val();
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
				$("#btnCerrarUpdateDireccion").css('display', 'none');
				$("#loadingCerrarUpdateDireccion").css('display', '');
				$("#btnUpdateDireccion").css('display', 'none');
				$("#loadingUpdateDireccion").css('display', '');
			},
			success: function (data) {
				console.log(data);

				if (data.estado != null && data.estado != "") {
					$("#txtPais_Envio_Editar").val("México");
					$("#txtEstado_Envio_Editar").val(data.estado);
					$("#txtMunicipio_Envio_Editar").val(data.municipio);
					$("#txtColonia_Envio_Editar").empty();

					for (var i = 0; i < data.colonias.length; i++) {
						$("#txtColonia_Envio_Editar").append("<option value='" + data.colonias[i] + "'>" + data.colonias[i] + "</option>");
					}

					$("#txtEstado_Envio_Editar").attr('readonly', 'readonly');
					$("#txtMunicipio_Envio_Editar").attr('readonly', 'readonly');
					$("#txtPais_Envio_Editar").attr('readonly', 'readonly');
				} else {
					$("#txtEstado_Envio_Editar").val("");
					$("#txtMunicipio_Envio_Editar").val("");
					$("#txtPais_Envio_Editar").val("");
					$("#txtEstado_Envio_Editar").removeAttr('readonly');
					$("#txtMunicipio_Envio_Editar").removeAttr('readonly');
					$("#txtPais_Envio_Editar").removeAttr('readonly');
					$("#txtColonia_Envio_Editar").empty();
				}
			}
		})
		.done(function () {
			$("#loadingHeader").css('display', 'none');
			$("#btnCerrarUpdateDireccion").css('display', '');
			$("#loadingCerrarUpdateDireccion").css('display', 'none');
			$("#btnUpdateDireccion").css('display', '');
			$("#loadingUpdateDireccion").css('display', 'none');
		})
		.fail(function () {
			$("#loadingHeader").css('display', 'none');
			$("#btnCerrarUpdateDireccion").css('display', '');
			$("#loadingCerrarUpdateDireccion").css('display', 'none');
			$("#btnUpdateDireccion").css('display', '');
			$("#loadingUpdateDireccion").css('display', 'none');

			// Abrir modal Verifique conexión
			$("#modalErrorConexion").modal("show");
		})
		.always(function () {});
	});

	/// Acción Modificar Dirección Envio //
	$("#btnUpdateDireccion").click(function(event) {
      
		let Contacto = $("#txtContacto_Envio_Editar").val();
		let Empresa  = $("#txtEmpresa_Envio_Editar").val();
		let Calle    = $("#txtCalle_Envio_Editar").val();
		let Numext   = $("#txtNumext_Envio_Editar").val();
		let Numint   = $("#txtNumint_Envio_Editar").val();
		let Colonia  = $(".txtColonia_Envio_Editar").val();
		let Ciudad   = $("#txtCiudad_Envio_Editar").val();
		let Municipio = $("#txtMunicipio_Envio_Editar").val();
		let Estado   = $("#txtEstado_Envio_Editar").val();
		let Pais     = $("#txtPais_Envio_Editar").val();
		let CP       = $("#txtCP_Envio_Editar").val();
		let Tel      = $("#txtTel_Envio_Editar").val();
		let Cel      = $("#txtCel_Envio_Editar").val();
		let Status   = '';
		let Ocurre   = 0;
  
		($('#checkOcurreEditar').prop('checked')) ? Ocurre = 1 : Ocurre = 0;
		
		if (Contacto != "" && Empresa != "" && Calle != "" && Numext != "" && Colonia != "" && Ciudad != "" && Municipio != "" && Estado != "" && Pais != "" && CP != ""){
  
		  ($('#checkStatus').prop('checked')) ? Status = 'Inactivo' : Status = 'Activo';
		  
			let formData = new FormData();
			formData.append("ID", FETCHDIRECCIONESENVIO.childNodes[0].innerHTML);
			formData.append("Contacto", Contacto);
			formData.append("Empresa", Empresa);
			formData.append("Calle", Calle);
			formData.append("Numext", Numext);
			formData.append("Numint", Numint);
			formData.append("Colonia", Colonia);
			formData.append("Ciudad", Ciudad);
			formData.append("Municipio", Municipio);
			formData.append("Estado", Estado);
			formData.append("Pais", Pais);
			formData.append("CP", CP);
			formData.append("Tel", Tel);
			formData.append("Cel", Cel);
			formData.append("idCliente", FETCHDISTRIBUIDORES.childNodes[0].innerHTML);
			formData.append("Status", Status);
			formData.append("Ocurre", Ocurre);
  
		  	$.ajax({
				url: window.dir + 'index.php/Controller_Distribuidores/Update_Direccion',
				type: 'POST',
				processData: false,
				contentType: false,
				timeout: 800000,
				data: formData,
				beforeSend : function ()
				{
					$("#loadingHeader").css('display', '');
					$("#btnCerrarUpdateDireccion").css('display', 'none');
					$("#loadingCerrarUpdateDireccion").css('display', '');
					$("#btnUpdateDireccion").css('display', 'none');
					$("#loadingUpdateDireccion").css('display', '');
				},
				success: function(data)
				{
					console.log(data);
	
					switch (parseInt(data.trim())) {

						case 0:
							toastr.error('Ocurrio un error al modificar la dirección', 'Error');
							break;

						case 1:
							getDirecciones(FETCHDISTRIBUIDORES.childNodes[0].innerHTML);
							Limpiar(5);
							toastr.success('Dirección de envio modificada con exito', 'Correcto');
							break;

						default:
							toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
					}
			  	}
			})
			.done(function() {
				$("#loadingHeader").css('display', 'none');
				$("#btnCerrarUpdateDireccion").css('display', '');
				$("#loadingCerrarUpdateDireccion").css('display', 'none');
				$("#btnUpdateDireccion").css('display', '');
				$("#loadingUpdateDireccion").css('display', 'none');
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				$("#loadingHeader").css('display', 'none');
				$("#btnCerrarUpdateDireccion").css('display', '');
				$("#loadingCerrarUpdateDireccion").css('display', 'none');
				$("#btnUpdateDireccion").css('display', '');
				$("#loadingUpdateDireccion").css('display', 'none');

				// Abrir modal Verifique conexión
				$("#modalErrorConexion").modal("show");
			})
			.always(function() {
			});
		}
		else{
			toastr.error('Algunos campos obligatorios estan vacios', 'Error');
		}
	});

	////////////////////////////////////// 
	///// Eliminar Dirección Envio  //////
	/////////////////////////////////////

	$("#btnEliminarDireccion").click(function(event) {
      
		if (FETCHDIRECCIONESENVIO != null && FETCHDISTRIBUIDORES != null)
		{
		  	if (FETCHDIRECCIONESENVIO.childNodes[14].childNodes[0].innerHTML != "Inactivo")
		  	{
				let formData = new FormData();
				formData.append("ID", FETCHDIRECCIONESENVIO.childNodes[0].innerHTML);
	
				$.ajax({
					url: window.dir + 'index.php/Controller_Distribuidores/delete_Direccion',
					type: 'POST',
					processData: false,
					contentType: false,
					timeout: 800000,
					data: formData,
					beforeSend : function ()
					{
						$('#loadingHeader').css('display', '');
						$('#btnAgregarDistri').css('display', 'none');
						$('#loadingAgregarDistri').css('display', '');
						$('#btnEditarDistri').css('display', 'none');
						$('#loadingEditarDistri').css('display', '');
						$('#btnEliminarDistri').css('display', 'none');
						$('#loadingEliminarDistri').css('display', '');
						$('#btnAgregarDireccion').css('display', 'none');
						$('#loadingAgregarDireccion').css('display', '');
						$('#btnEditarDireccion').css('display', 'none');
						$('#loadingEditarDireccion').css('display', '');
						$('#btnEliminarDireccion').css('display', 'none');
						$('#loadingEliminarDireccion').css('display', '');
					},
					success: function(data)
					{
						console.log(data);

						switch (parseInt(data.trim())) {

							case 0:
								toastr.error('Ocurrio un error al eliminar la dirección', 'Error');
								break;
	
							case 1:
								getDirecciones(FETCHDISTRIBUIDORES.childNodes[0].innerHTML);
								Limpiar(4);
								toastr.success('Dirección de envio eliminada con exito', 'Correcto');
								break;
	
							default:
								toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
						}
					}
				})
				.done(function() {
					$('#loadingHeader').css('display', 'none');
					$('#btnAgregarDistri').css('display', '');
					$('#loadingAgregarDistri').css('display', 'none');
					$('#btnEditarDistri').css('display', '');
					$('#loadingEditarDistri').css('display', 'none');
					$('#btnEliminarDistri').css('display', '');
					$('#loadingEliminarDistri').css('display', 'none');
					$('#btnAgregarDireccion').css('display', '');
					$('#loadingAgregarDireccion').css('display', 'none');
					$('#btnEditarDireccion').css('display', '');
					$('#loadingEditarDireccion').css('display', 'none');
					$('#btnEliminarDireccion').css('display', '');
					$('#loadingEliminarDireccion').css('display', 'none');
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					$('#loadingHeader').css('display', 'none');
					$('#btnAgregarDistri').css('display', '');
					$('#loadingAgregarDistri').css('display', 'none');
					$('#btnEditarDistri').css('display', '');
					$('#loadingEditarDistri').css('display', 'none');
					$('#btnEliminarDistri').css('display', '');
					$('#loadingEliminarDistri').css('display', 'none');
					$('#btnAgregarDireccion').css('display', '');
					$('#loadingAgregarDireccion').css('display', 'none');
					$('#btnEditarDireccion').css('display', '');
					$('#loadingEditarDireccion').css('display', 'none');
					$('#btnEliminarDireccion').css('display', '');
					$('#loadingEliminarDireccion').css('display', 'none');
					// Abrir modal Verifique conexión
					$("#modalErrorConexion").modal("show");
				})
				.always(function() {	
				});
			}
			else{
				toastr.info('La dirección ya se encuentra como inactiva', 'Importante');
			}
		}
		else{
		  toastr.info('Selecciona una dirección', 'Importante');
		}
	});

});

function Limpiar(valor) {
	switch (valor) {
		case 1:
			var dt = new Date();
			$("#txtBanderazo").val(`${ dt.getFullYear() }-${ getmonth(dt.getMonth() + 1)}-${ getday(dt.getDate()) }`);

			$("#txtNombre").val("");
			$("#txtApellidos").val("");
			$("#txtEmpresa").val("");
			$("#txtAlias").val("");
			$("#txtCoordinador").val("");
			$("#txtDirector").val("");
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
			$("#select_Sucursal").val("");
			$("#txtPaswword").val("");
			$("#txtConfirmacion").val("");
			$("#select_Entrega").val("");
			$("#txtRegion").val("");
			$("#txtZona").val("");
			$("#select_Idioma").val("");
			$("#txtImpuesto").val("");
			$("#txtMinimoEnvio").val("");
			$("#txtClientes_x_dia").val("20");
			$("#select_Bloque").val("");
			$("#txtCuota").val(0);
			$("#txtCuota_Inicial").val(0);
			$("#txtCuota_Final").val(0);
			$("#txtMeses_Cuota").val(0);
			$("#txtMeses_Actuales").val(0);
			$("#modalAgregarDistri").modal("hide");

			$('#fetchDistribuidores').DataTable().ajax.reload();
			$('#fetchDireccionEnvio').DataTable().destroy();
			document.getElementById("fetchDireccionEnvio").tBodies[0].innerHTML = "";
			document.getElementById("fetchDivisiones").tBodies[0].innerHTML = "";
			FETCHDISTRIBUIDORES = null;
		break;

		case 2:
			$("#txtNombre_Editar").val("");
			$("#txtApellidos_Editar").val("");
			$("#txtEmpresa_Editar").val("");
			$("#txtAlias_Editar").val("");
			$("#txtCoordinador_Editar").val("");
			$("#txtDirector_Editar").val("");
			$("#txtCargo_Editar").val("");
			$("#txtCalle_Editar").val("");
			$(".txtColonia_Editar").val("");
			$("#txtCiudad_Editar").val("");
			$("#txtMunicipio_Editar").val("");
			$("#txtEstado_Editar").val("");
			$("#txtPais_Editar").val("");
			$("#txtCP_Editar").val("");
			$("#txtRFC_Editar").val("");
			$("#txtTel1_Editar").val("");
			$("#txtTel2_Editar").val("");
			$("#txtEmail_Editar").val("");
			$("#txtDescuento_Editar").val("");
			$("#select_Sucursal_Editar").val("");
			$("#txtPaswword_Editar").val("");
			$("#txtConfirmacion_Editar").val("");
			$("#select_Entrega_Editar").val("");
			$("#txtRegion_Editar").val("");
			$("#txtZona_Editar").val("");
			$("#select_Idioma_Editar").val("");
			$("#txtImpuesto_Editar").val("");
			$("#txtMinimoEnvio_Editar").val("");
			$("#txtClientes_x_dia_Editar").val("20");
			$("#select_Bloque_Editar").val("");
			$("#txtCuota_Editar").val(0);
			$("#txtCuota_Inicial_Editar").val(0);
			$("#txtCuota_Final_Editar").val(0);
			$("#txtMeses_Cuota_Editar").val(0);
			$("#txtMeses_Actuales_Editar").val(0);
			$("#txtBanderazo_Editar").val("");
			$("#modalEditarDistri").modal("hide");

			$('#fetchDistribuidores').DataTable().ajax.reload();
			$('#fetchDireccionEnvio').DataTable().destroy();
			document.getElementById("fetchDireccionEnvio").tBodies[0].innerHTML = "";
			document.getElementById("fetchDivisionesEditar").tBodies[0].innerHTML = "";
			FETCHDISTRIBUIDORES = null;
		break;

		case 3:
			$('#fetchDistribuidores').DataTable().ajax.reload();
			$('#fetchDireccionEnvio').DataTable().destroy();
			document.getElementById("fetchDireccionEnvio").tBodies[0].innerHTML = "";
			FETCHDISTRIBUIDORES = null;
		break;

		case 4:
			$("#txtContacto_Envio").val("");
			$("#txtEmpresa_Envio").val("");
			$("#txtCalle_Envio").val("");
			$("#txtNumext_Envio").val("");
			$("#txtNumint_Envio").val("");
			$(".txtColonia_Envio").val("");
			$("#txtCiudad_Envio").val("");
			$("#txtMunicipio_Envio").val("");
			$("#txtEstado_Envio").val("");
			$("#txtPais_Envio").val("");
			$("#txtCP_Envio").val("");
			$("#txtTel_Envio").val("");
			$("#txtCel_Envio").val("");
			
			$('#fetchDireccionEnvio').DataTable().destroy();
			document.getElementById("fetchDireccionEnvio").tBodies[0].innerHTML = "";
			$("#modalAddDireccion").modal("hide");
			FETCHDIRECCIONESENVIO = null;
		break;

		case 5:
			$("#txtContacto_Envio_Editar").val("");
			$("#txtEmpresa_Envio_Editar").val("");
			$("#txtCalle_Envio_Editar").val("");
			$("#txtNumext_Envio_Editar").val("");
			$("#txtNumint_Envio_Editar").val("");
			$(".txtColonia_Envio_Editar").val("");
			$("#txtCiudad_Envio_Editar").val("");
			$("#txtMunicipio_Envio_Editar").val("");
			$("#txtEstado_Envio_Editar").val("");
			$("#txtPais_Envio_Editar").val("");
			$("#txtCP_Envio_Editar").val("");
			$("#txtTel_Envio_Editar").val("");
			$("#txtCel_Envio_Editar").val("");
			
			$('#fetchDireccionEnvio').DataTable().destroy();
			document.getElementById("fetchDireccionEnvio").tBodies[0].innerHTML = "";
			$("#modalUpdateDireccion").modal("hide");
			FETCHDIRECCIONESENVIO = null;
		break;

		default:
			break;
	}
}

// Obtener CP Editar Distribuidor //
function WebServices(CP) {

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
			$("#btnCerrarUpdateDistri").css('display', 'none');
			$("#loadingCerrarUpdateDistri").css('display', '');
			$("#btnUpdateDistri").css('display', 'none');
			$("#loadingUpdateDistri").css('display', '');
		},
		success: function (data) {
			console.log(data);

			if (data.estado != null && data.estado != "") {//
				$("#txtPais_Editar").val("México");
				$("#txtEstado_Editar").val(data.estado);
				$("#txtMunicipio_Editar").val(data.municipio);
				$("#txtColonia_Editar").empty();

				for (var i = 0; i < data.colonias.length; i++) {
					$("#txtColonia_Editar").append("<option value='" + data.colonias[i] + "'>" + data.colonias[i] + "</option>");
				}

				$("#txtEstado_Editar").attr('readonly', 'readonly');
				$("#txtMunicipio_Editar").attr('readonly', 'readonly');
				$("#txtPais_Editar").attr('readonly', 'readonly');
			}
			else {
				//$("#txtEstado_Editar").val("");
				//$("#txtMunicipio_Editar").val("");
				//$("#txtPais_Editar").val("");
				$("#txtEstado_Editar").removeAttr('readonly');
				$("#txtMunicipio_Editar").removeAttr('readonly');
				$("#txtPais_Editar").removeAttr('readonly');
				$("#txtColonia_Editar").empty();
			}
		}
	})
	.done(function () {
		$("#loadingHeader").css('display', 'none');
		$("#btnCerrarUpdateDistri").css('display', '');
		$("#loadingCerrarUpdateDistri").css('display', 'none');
		$("#btnUpdateDistri").css('display', '');
		$("#loadingUpdateDistri").css('display', 'none');
	})
	.fail(function () {
		$("#loadingHeader").css('display', 'none');
		$("#btnCerrarUpdateDistri").css('display', '');
		$("#loadingCerrarUpdateDistri").css('display', 'none');
		$("#btnUpdateDistri").css('display', '');
		$("#loadingUpdateDistri").css('display', 'none');

		// Abrir modal Verifique conexión
		$("#modalErrorConexion").modal("show");
	})
	.always(function () {
	});
}

// Obtener CP Editar Dirección Envio //
function WebServicesEnvio(CP) {

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
			$("#btnCerrarUpdateDireccion").css('display', 'none');
			$("#loadingCerrarUpdateDireccion").css('display', '');
			$("#btnUpdateDireccion").css('display', 'none');
			$("#loadingUpdateDireccion").css('display', '');
		},
		success: function (data) {
			console.log(data);

			if (data.estado != null && data.estado != "") {
				$("#txtPais_Envio_Editar").val("México");
				$("#txtEstado_Envio_Editar").val(data.estado);
				$("#txtMunicipio_Envio_Editar").val(data.municipio);
				$("#txtColonia_Envio_Editar").empty();

				for (var i = 0; i < data.colonias.length; i++) {
					$("#txtColonia_Envio_Editar").append("<option value='" + data.colonias[i] + "'>" + data.colonias[i] + "</option>");
				}

				$("#txtEstado_Envio_Editar").attr('readonly', 'readonly');
				$("#txtMunicipio_Envio_Editar").attr('readonly', 'readonly');
				$("#txtPais_Envio_Editar").attr('readonly', 'readonly');
			}
			else {
				//$("#txtEstado_Envio_Editar").val("");
				//$("#txtMunicipio_Envio_Editar").val("");
				//$("#txtPais_Envio_Editar").val("");
				$("#txtEstado_Envio_Editar").removeAttr('readonly');
				$("#txtMunicipio_Envio_Editar").removeAttr('readonly');
				$("#txtPais_Envio_Editar").removeAttr('readonly');
				$("#txtColonia_Envio_Editar").empty();
			}
		}
	})
	.done(function () {
		$("#loadingHeader").css('display', 'none');
		$("#btnCerrarUpdateDireccion").css('display', '');
		$("#loadingCerrarUpdateDireccion").css('display', 'none');
		$("#btnUpdateDireccion").css('display', '');
		$("#loadingUpdateDireccion").css('display', 'none');
	})
	.fail(function () {
		$("#loadingHeader").css('display', 'none');
		$("#btnCerrarUpdateDireccion").css('display', '');
		$("#loadingCerrarUpdateDireccion").css('display', 'none');
		$("#btnUpdateDireccion").css('display', '');
		$("#loadingUpdateDireccion").css('display', 'none');

		// Abrir modal Verifique conexión
		$("#modalErrorConexion").modal("show");
	})
	.always(function () {
	});
}

function fetch(table)
{
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

// Cargar DataTable Distribuidor //
function fetchDistribuidores() {
	let dataTable = $("#fetchDistribuidores").DataTable({
		/** add this */
        initComplete: function() {
            $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off');
        },
		 /****** add this */
		autoFill: false,
		processing: true,
		serverSide: true,
		language: {
			lengthMenu: "Mostrar _MENU_ registros por página.",
			zeroRecords: "Lo sentimos. No se encontraron registros.",
			info: "Mostrando página _PAGE_ de _PAGES_",
			infoEmpty: "No hay registros aún.",
			infoFiltered: "(filtrados de un total de _MAX_ registros)",
			search: "Búsqueda",
			loadingRecords: "Cargando ...",
			processing: "Procesando...",
			searchPlaceholder: "Comience a teclear...",
			paginate: {
				previous: "Anterior",
				next: "Siguiente"
			}
		},
		select: true,
		columnDefs: [{
			targets: 19,
			render: function (data, type, full, meta) {
				if (full[19] == "Activo") {
					return "<label class='badge badge-success'>Activo</label>";
				} else {
					return "<label class='badge badge-danger'>Inactivo</label>";
				}
			}
		}],
		order: [],
		ajax: {
			url: window.dir + "index.php/Controller_Distribuidores/fetchDistribuidores",
			type: "POST"
		}
	});
}

// Cargar Tabla Direcciones Envio //
function getDirecciones(id) {

    let formData = new FormData();
    formData.append("ID", id);

	$.ajax({
		url: window.dir + 'index.php/Controller_Distribuidores/getDirecciones',
		type: 'POST',
		processData: false,
		contentType: false,
		timeout: 800000,
		data: formData,
		beforeSend : function ()
		{
			$('#loadingHeader').css('display', '');
			$('#btnAgregarDistri').css('display', 'none');
			$('#loadingAgregarDistri').css('display', '');
			$('#btnEditarDistri').css('display', 'none');
			$('#loadingEditarDistri').css('display', '');
			$('#btnEliminarDistri').css('display', 'none');
			$('#loadingEliminarDistri').css('display', '');
			$('#btnAgregarDireccion').css('display', 'none');
			$('#loadingAgregarDireccion').css('display', '');
			$('#btnEditarDireccion').css('display', 'none');
			$('#loadingEditarDireccion').css('display', '');
			$('#btnEliminarDireccion').css('display', 'none');
			$('#loadingEliminarDireccion').css('display', '');
		},
		success: function(data)
		{
			let parsed = JSON.parse(data);

			if (parsed != null && parsed != "")
			{
				let tbody     = document.getElementById("fetchDireccionEnvio").tBodies[0];
				$('#fetchDireccionEnvio').DataTable().destroy();
				document.getElementById("fetchDireccionEnvio").tBodies[0].innerHTML = "";

				for (var i = 0; i < parsed.length; i++){

					let row  = tbody.insertRow(i);
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
					let cel12 = row.insertCell(11);
					let cel13 = row.insertCell(12);
					let cel14 = row.insertCell(13);
					let cel15 = row.insertCell(14);

					cel1.innerHTML = parsed[i]['ID'];
					cel2.innerHTML = parsed[i]['Calle'];
					cel3.innerHTML = parsed[i]['Numext'];
					cel4.innerHTML = parsed[i]['Numint'];
					cel5.innerHTML = parsed[i]['Pais'];
					cel6.innerHTML = parsed[i]['Estado'];
					cel7.innerHTML = parsed[i]['Municipio'];
					cel8.innerHTML = parsed[i]['Ciudad'];
					cel9.innerHTML = parsed[i]['Colonia'];
					cel10.innerHTML = parsed[i]['CP'];
					cel11.innerHTML = parsed[i]['Contacto'];
					cel12.innerHTML = parsed[i]['Empresa'];
					cel13.innerHTML = parsed[i]['Tel'];
					cel14.innerHTML = parsed[i]['Cel'];

					if (parsed[i]['Status'] == 'Activo'){
						cel15.innerHTML = '<label class="badge badge-success">' + parsed[i]['Status'] + '</label>';
					}
					else{
						cel15.innerHTML = '<label class="badge badge-danger">' + parsed[i]['Status'] + '</label>';
					}
					
				}

				fetch("fetchDireccionEnvio");
			}
		}
	})
	.done(function() {
		$('#loadingHeader').css('display', 'none');
		$('#btnAgregarDistri').css('display', '');
		$('#loadingAgregarDistri').css('display', 'none');
		$('#btnEditarDistri').css('display', '');
		$('#loadingEditarDistri').css('display', 'none');
		$('#btnEliminarDistri').css('display', '');
		$('#loadingEliminarDistri').css('display', 'none');
		$('#btnAgregarDireccion').css('display', '');
		$('#loadingAgregarDireccion').css('display', 'none');
		$('#btnEditarDireccion').css('display', '');
		$('#loadingEditarDireccion').css('display', 'none');
		$('#btnEliminarDireccion').css('display', '');
		$('#loadingEliminarDireccion').css('display', 'none');
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		$('#loadingHeader').css('display', 'none');
		$('#btnAgregarDistri').css('display', '');
		$('#loadingAgregarDistri').css('display', 'none');
		$('#btnEditarDistri').css('display', '');
		$('#loadingEditarDistri').css('display', 'none');
		$('#btnEliminarDistri').css('display', '');
		$('#loadingEliminarDistri').css('display', 'none');
		$('#btnAgregarDireccion').css('display', '');
		$('#loadingAgregarDireccion').css('display', 'none');
		$('#btnEditarDireccion').css('display', '');
		$('#loadingEditarDireccion').css('display', 'none');
		$('#btnEliminarDireccion').css('display', '');
		$('#loadingEliminarDireccion').css('display', 'none');
		// Abrir modal Verifique conexión
		$("#modalErrorConexion").modal("show");
	})
	.always(function() {	
	});
}

var eliminarDivision = function (event) {
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchDivisiones").tBodies[0];
	tbody.removeChild(row);
}


var eliminarDivisionEditar = function (event) {
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchDivisionesEditar").tBodies[0];
	tbody.removeChild(row);
}

function ValidateEstafeta(e) {
	if (e.value.length > 30) {
		toastr.warning('Este campo no puede se mas largo que 30 caracteres', 'Advertencia');
	}
}

//Función para validar un RFC
// Devuelve el RFC sin espacios ni guiones si es correcto
// Devuelve false si es inválido
// (debe estar en mayúsculas, guiones y espacios intermedios opcionales)
function rfcValido(rfc, aceptarGenerico = true) {
    const re       = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
    var   validado = rfc.match(re);

    if (!validado)  //Coincide con el formato general del regex?
        return false;

    //Separar el dígito verificador del resto del RFC
    const digitoVerificador = validado.pop(),
          rfcSinDigito      = validado.slice(1).join(''),
          len               = rfcSinDigito.length,

    //Obtener el digito esperado
          diccionario       = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
          indice            = len + 1;
    var   suma,
          digitoEsperado;

    if (len == 12) suma = 0
    else suma = 481; //Ajuste para persona moral

    for(var i=0; i<len; i++)
        suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
    digitoEsperado = 11 - suma % 11;
    if (digitoEsperado == 11) digitoEsperado = 0;
    else if (digitoEsperado == 10) digitoEsperado = "A";

    //El dígito verificador coincide con el esperado?
    // o es un RFC Genérico (ventas a público general)?
    if ((digitoVerificador != digitoEsperado)
     && (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
        return false;
    else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
        return false;
    return rfcSinDigito + digitoVerificador;
}


//Handler para el evento cuando cambia el input
// -Lleva la RFC a mayúsculas para validarlo
// -Elimina los espacios que pueda tener antes o después
function validarInput(input) {
    var rfc         = input.value.trim().toUpperCase(),
        resultado   = document.getElementById("resultado"),
        valido;
        
    var rfcCorrecto = rfcValido(rfc);   // ⬅️ Acá se comprueba
  
    if (rfcCorrecto) {
    	valido = "Válido";
      resultado.classList.add("ok");
    } else {
    	valido = "No válido"
    	resultado.classList.remove("ok");
    }
        
    resultado.innerText = "RFC: " + rfc 
                        + "\nResultado: " + rfcCorrecto
                        + "\nFormato: " + valido;
}

//Handler para el evento cuando cambia el input
// -Lleva la RFC a mayúsculas para validarlo
// -Elimina los espacios que pueda tener antes o después
function validarInputEdit(input) {
    var rfc         = input.value.trim().toUpperCase(),
        resultado   = document.getElementById("resultadoEdit"),
        valido;
        
    var rfcCorrecto = rfcValido(rfc);   // ⬅️ Acá se comprueba
  
    if (rfcCorrecto) {
    	valido = "Válido";
      resultado.classList.add("ok");
    } else {
    	valido = "No válido"
    	resultado.classList.remove("ok");
    }
        
    resultado.innerText = "RFC: " + rfc 
                        + "\nResultado: " + rfcCorrecto
                        + "\nFormato: " + valido;
}


//Handler para el evento cuando cambia el input
// -Lleva la RFC a mayúsculas para validarlo
// -Elimina los espacios que pueda tener antes o después
function validarInputLoad(RFC) {
    var rfc         = '',
        resultado   = document.getElementById("resultadoEdit"),
        valido;

        if (RFC != '' && RFC != null) {
        	rfc = RFC.trim().toUpperCase();
        }
        
    var rfcCorrecto = rfcValido(rfc);   // ⬅️ Acá se comprueba
  
    if (rfcCorrecto) {
    	valido = "Válido";
      resultado.classList.add("ok");
    } else {
    	valido = "No válido"
    	resultado.classList.remove("ok");
    }
        
    resultado.innerText = "RFC: " + rfc 
                        + "\nResultado: " + rfcCorrecto
                        + "\nFormato: " + valido;
}