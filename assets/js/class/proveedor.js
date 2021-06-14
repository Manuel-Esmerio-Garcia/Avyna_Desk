var FETCHPROVEEDORES = null;

$(document).ready(function() {

    // Validate Solo Numeros //
	$('.input-number').on('input', function () { 
		this.value = this.value.replace(/[^0-9]/g,'');
	});

	// Cargra DataTable Proveedores //
	fetchProveedores();

	/////////////////////////////
	//// Agregar Proveedores  ///
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
                $("#btnCerrarAddProvee").css('display', 'none');
                $("#loadingCerrarAddProvee").css('display', '');
                $("#btnAddProvee").css('display', 'none');
                $("#loadingAddProvee").css('display', '');
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
            $("#btnCerrarAddProvee").css('display', '');
            $("#loadingCerrarAddProvee").css('display', 'none');
            $("#btnAddProvee").css('display', '');
            $("#loadingAddProvee").css('display', 'none');
        })
        .fail(function () {
            $("#loadingHeader").css('display', 'none');
            $("#btnCerrarAddProvee").css('display', '');
            $("#loadingCerrarAddProvee").css('display', 'none');
            $("#btnAddProvee").css('display', '');
            $("#loadingAddProvee").css('display', 'none');

            // Abrir modal Verifique conexión
            $("#modalErrorConexion").modal("show");
        })
        .always(function () {
        });
    });*/

	// Abrir Modal Agregar Proveedor //
	$("#btnAgregarProvee").click(function(e) {
		$("#modalAgregarProvee").modal("show");
    });
    
    // Acción agregar proveedor //
    $("#btnAddProvee").click(function(e){

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
        let idMoneda = $("#select_Moneda").val();
        //let Entrega  = 0;
        
        //($('#checkEntrega').prop('checked')) ? Entrega = 1 : Entrega = 0;

		if (Nombre != "" && Apellidos != "" && RFC != "" && Empresa != "" && idMoneda != "" && Calle != "" && Colonia != "" && Ciudad != "" && CP != "" && Estado != "" && Municipio != "" && RFC != "" && Tel1 != "" && Email != "") {

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
            formData.append("Status", 'Activo');
            formData.append("Moneda", idMoneda);
            //formData.append("Entrega",Entrega);

            $.ajax({
                url: window.dir + 'index.php/Controller_Proveedores/AddProveedor',
                type: 'POST',
                processData: false,
                contentType: false,
                timeout: 800000,
                data: formData,
                beforeSend: function () {
                    $("#loadingHeader").css('display', '');
                    $("#btnCerrarAddProvee").css('display', 'none');
                    $("#loadingCerrarAddProvee").css('display', '');
                    $("#btnAddProvee").css('display', 'none');
                    $("#loadingAddProvee").css('display', '');
                },
                success: function (data) {
                    console.log(data);

                    switch (parseInt(data.trim())) {

                        case 0:
                            toastr.error('Ocurrio un error al crear al proveedor', 'Error');
                            break;

                        case 1:
                            Limpiar(1);
                            toastr.success('Proveedor agregado con exito', 'Correcto');
                            break;

                        default:
                            toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                    }
                }
            })
            .done(function () {
                $("#loadingHeader").css('display', 'none');
                $("#btnCerrarAddProvee").css('display', '');
                $("#loadingCerrarAddProvee").css('display', 'none');
                $("#btnAddProvee").css('display', '');
                $("#loadingAddProvee").css('display', 'none');
            })
            .fail(function () {
                $("#loadingHeader").css('display', 'none');
                $("#btnCerrarAddProvee").css('display', '');
                $("#loadingCerrarAddProvee").css('display', 'none');
                $("#btnAddProvee").css('display', '');
                $("#loadingAddProvee").css('display', 'none');
                // Abrir modal Verifique conexión
                $("#modalErrorConexion").modal("show");
            })
            .always(function () {
            });
        } else {
            toastr.error('Algunos campos obligatorios estan vacios', 'Error');
        }
    });

    // Acción Click DataTable Proveedores //
	document.getElementById("fetchProveedores").onclick = function (e) {
        FETCHPROVEEDORES = e.target.parentNode;
    }

    // Abrir Modal Editar Proveedor //
    $("#btnEditarProvee").click(function (e){  
        if (FETCHPROVEEDORES != null) {

            /*if (FETCHPROVEEDORES.childNodes[11].innerHTML != null && FETCHPROVEEDORES.childNodes[11].innerHTML != "") {
                WebServices(FETCHPROVEEDORES.childNodes[11].innerHTML);
            }*/
            
            $("#txtNombreEditar").val(FETCHPROVEEDORES.childNodes[1].innerHTML);
            $("#txtApellidosEditar").val(FETCHPROVEEDORES.childNodes[2].innerHTML);
            $("#txtEmpresaEditar").val(FETCHPROVEEDORES.childNodes[3].innerHTML);
            $("#txtCargoEditar").val(FETCHPROVEEDORES.childNodes[4].innerHTML);
            $("#txtCalleEditar").val(FETCHPROVEEDORES.childNodes[5].innerHTML);
            $(".txtColoniaEditar").val(FETCHPROVEEDORES.childNodes[6].innerHTML);
            $("#txtCiudadEditar").val(FETCHPROVEEDORES.childNodes[7].innerHTML);
            $("#txtMunicipioEditar").val(FETCHPROVEEDORES.childNodes[8].innerHTML);
            $("#txtEstadoEditar").val(FETCHPROVEEDORES.childNodes[9].innerHTML);
            $("#txtPaisEditar").val(FETCHPROVEEDORES.childNodes[10].innerHTML);
            $("#txtCPEditar").val(FETCHPROVEEDORES.childNodes[11].innerHTML);
            $("#txtRFCEditar").val(FETCHPROVEEDORES.childNodes[12].innerHTML);
            $("#txtTel1Editar").val(FETCHPROVEEDORES.childNodes[13].innerHTML);
            $("#txtTel2Editar").val(FETCHPROVEEDORES.childNodes[14].innerHTML);
            $("#txtEmailEditar").val(FETCHPROVEEDORES.childNodes[15].innerHTML);
            $("#select_MonedaEditar").val(FETCHPROVEEDORES.childNodes[16].childNodes[1].innerHTML);
            (FETCHPROVEEDORES.childNodes[17].childNodes[0].innerHTML == 'Inactivo') ? $("#checkStatus").prop('checked', true) : $("#checkStatus").prop('checked', false);
            //(FETCHPROVEEDORES.childNodes[16].childNodes[2].innerHTML == 1) ? $("#checkEntregaEditar").prop('checked', true) : $("#checkEntregaEditar").prop('checked', false);

            $("#modalEditarProvee").modal("show");
        }
        else{
            toastr.warning('Seleccione a un proveedor.', 'Advertencia');
        }
    });

    //Consumir WebServices Codigo Postal Editar Usuario
	/*$("#txtCPEditar").change(function (event) {

		let CP = $("#txtCPEditar").val();
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
                $("#btnCerrarUpdateProvee").css('display', 'none');
                $("#loadingCerrarUpdateProvee").css('display', '');
                $("#btnUpdateProvee").css('display', 'none');
                $("#loadingUpdateProvee").css('display', '');
            },
            success: function (data) {
                console.log(data);

                if (data.estado != null && data.estado != "") {
                    $("#txtPaisEditar").val("México");
                    $("#txtEstadoEditar").val(data.estado);
                    $("#txtMunicipioEditar").val(data.municipio);
                    $("#txtColoniaEditar").empty();

                    for (var i = 0; i < data.colonias.length; i++) {
                        $("#txtColoniaEditar").append("<option value='" + data.colonias[i] + "'>" + data.colonias[i] + "</option>");
                    }

                    $("#txtEstadoEditar").attr('readonly', 'readonly');
                    $("#txtMunicipioEditar").attr('readonly', 'readonly');
                    $("#txtPaisEditar").attr('readonly', 'readonly');
                } else {
                    //$("#txtEstado_Editar").val("");
                    //$("#txtMunicipio_Editar").val("");
                    //$("#txtPais_Editar").val("");
                    $("#txtEstadoEditar").removeAttr('readonly');
                    $("#txtMunicipioEditar").removeAttr('readonly');
                    $("#txtPaisEditar").removeAttr('readonly');
                    $("#txtColoniaEditar").empty();
                }
            }
        })
        .done(function () {
            $("#loadingHeader").css('display', 'none');
            $("#btnCerrarUpdateProvee").css('display', '');
            $("#loadingCerrarUpdateProvee").css('display', 'none');
            $("#btnUpdateProvee").css('display', '');
            $("#loadingUpdateProvee").css('display', 'none');
        })
        .fail(function () {
            $("#loadingHeader").css('display', 'none');
            $("#btnCerrarUpdateProvee").css('display', '');
            $("#loadingCerrarUpdateProvee").css('display', 'none');
            $("#btnUpdateProvee").css('display', '');
            $("#loadingUpdateProvee").css('display', 'none');

            // Abrir modal Verifique conexión
            $("#modalErrorConexion").modal("show");
        })
        .always(function () {});
    });*/
    
    // Acción editar proveedor //
    $("#btnUpdateProvee").click(function(e){

        let Nombre = $("#txtNombreEditar").val();
		let Apellidos = $("#txtApellidosEditar").val();
		let Empresa = $("#txtEmpresaEditar").val();
		let Cargo = $("#txtCargoEditar").val();
		let Calle = $("#txtCalleEditar").val();
		let Colonia = $(".txtColoniaEditar").val();
		let Ciudad = $("#txtCiudadEditar").val();
		let Municipio = $("#txtMunicipioEditar").val();
		let Estado = $("#txtEstadoEditar").val();
		let Pais = $("#txtPaisEditar").val();
		let CP = $("#txtCPEditar").val();
		let RFC = $("#txtRFCEditar").val();
		let Tel1 = $("#txtTel1Editar").val();
		let Tel2 = $("#txtTel2Editar").val();
		let Email = $("#txtEmailEditar").val();
        let idMoneda = $("#select_MonedaEditar").val();
        //let Entrega = 0;
        let Status = '';

        //($('#checkEntregaEditar').prop('checked')) ? Entrega = 1 : Entrega = 0;
        ($('#checkStatus').prop('checked')) ? Status = "Inactivo" : Status = "Activo";

		if (Nombre != "" && Apellidos != "" && RFC != "" && Empresa != "" && idMoneda != "" && Calle != "" && Colonia != "" && Ciudad != "" && CP != "" && Estado != "" && Municipio != "" && RFC != "" && Tel1 != "" && Email != "") {
            
            let formData = new FormData();
            formData.append("ID", FETCHPROVEEDORES.childNodes[0].innerHTML);
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
            formData.append("Status", Status);
            formData.append("Moneda", idMoneda);
            //formData.append("Entrega", Entrega);

            $.ajax({
                url: window.dir + 'index.php/Controller_Proveedores/UpdateProveedor',
                type: 'POST',
                processData: false,
                contentType: false,
                timeout: 800000,
                data: formData,
                beforeSend: function () {
                    $("#loadingHeader").css('display', '');
                    $("#btnCerrarUpdateProvee").css('display', 'none');
                    $("#loadingCerrarUpdateProvee").css('display', '');
                    $("#btnUpdateProvee").css('display', 'none');
                    $("#loadingUpdateProvee").css('display', '');
                },
                success: function (data) {
                    console.log(data);

                    switch (parseInt(data.trim())) {

                        case 0:
                            toastr.error('Ocurrio un error al modificar al proveedor', 'Error');
                            break;

                        case 1:
                            Limpiar(2);
                            toastr.success('Proveedor modificado con exito', 'Correcto');
                            break;

                        default:
                            toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                    }
                }
            })
            .done(function () {
                $("#loadingHeader").css('display', 'none');
                $("#btnCerrarUpdateProvee").css('display', '');
                $("#loadingCerrarUpdateProvee").css('display', 'none');
                $("#btnUpdateProvee").css('display', '');
                $("#loadingUpdateProvee").css('display', 'none');
            })
            .fail(function () {
                $("#loadingHeader").css('display', 'none');
                $("#btnCerrarUpdateProvee").css('display', '');
                $("#loadingCerrarUpdateProvee").css('display', 'none');
                $("#btnUpdateProvee").css('display', '');
                $("#loadingUpdateProvee").css('display', 'none');
                // Abrir modal Verifique conexión
                $("#modalErrorConexion").modal("show");
            })
            .always(function () {
            });
        } else {
            toastr.error('Algunos campos obligatorios estan vacios', 'Error');
        }
    });

    // Acción Eliminar Proveedor //
    $("#btnEliminarProvee").click(function (e) { 
        
        if (FETCHPROVEEDORES != null) {
            if (FETCHPROVEEDORES.childNodes[17].childNodes[0].innerHTML != 'Inactivo') {
                swal({
                    title: "¿Esta seguro que desea eliminar al proveedor?",
                    text: "Una vez eliminado el proveedor pasara a un estatus como inactivo",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {

                        let formData = new FormData();
                        formData.append("ID", FETCHPROVEEDORES.childNodes[0].innerHTML);
            
                        $.ajax({
                            url: window.dir + 'index.php/Controller_Proveedores/DeleteProveedor',
                            type: 'POST',
                            processData: false,
                            contentType: false,
                            timeout: 800000,
                            data: formData,
                            beforeSend: function () {
                                $("#loadingHeader").css('display', '');
                                $("#btnAgregarProvee").css('display', 'none');
                                $("#loadingAgregarProvee").css('display', '');
                                $("#btnEditarProvee").css('display', 'none');
                                $("#loadingEditarProvee").css('display', '');
                                $("#btnEliminarProvee").css('display', 'none');
                                $("#loadingEliminarProvee").css('display', '');
                            },
                            success: function (data) {
                                console.log(data);
            
                                switch (parseInt(data.trim())) {
            
                                    case 0:
                                        toastr.error('Ocurrio un error al eliminar al proveedor', 'Error');
                                        break;
            
                                    case 1:
                                        Limpiar(2);
                                        toastr.success('Proveedor eliminado con exito', 'Correcto');
                                        break;
            
                                    default:
                                        toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                                }
                            }
                        })
                        .done(function () {
                            $("#loadingHeader").css('display', 'none');
                            $("#btnAgregarProvee").css('display', '');
                            $("#loadingAgregarProvee").css('display', 'none');
                            $("#btnEditarProvee").css('display', '');
                            $("#loadingEditarProvee").css('display', 'none');
                            $("#btnEliminarProvee").css('display', '');
                            $("#loadingEliminarProvee").css('display', 'none');
                        })
                        .fail(function () {
                            $("#loadingHeader").css('display', 'none');
                            $("#btnAgregarProvee").css('display', '');
                            $("#loadingAgregarProvee").css('display', 'none');
                            $("#btnEditarProvee").css('display', '');
                            $("#loadingEditarProvee").css('display', 'none');
                            $("#btnEliminarProvee").css('display', '');
                            $("#loadingEliminarProvee").css('display', 'none');
                            // Abrir modal Verifique conexión
                            $("#modalErrorConexion").modal("show");
                        })
                        .always(function () {
                        });
                    }
                  });
            }
            else{
                toastr.warning('El proveedor selecionado, se encuentra como inactivo.','Advertencia');
            }
        }
        else{
            toastr.warning('Seleccione a un proveedor.', 'Advertencia');
        }
        
    });
});

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
            $("#select_Moneda").val("");
            $("#txtEstado").removeAttr('readonly');
            $("#txtMunicipio").removeAttr('readonly');
            $("#txtPais").removeAttr('readonly');
            $("#txtColonia").empty();
            $("#modalAgregarProvee").modal("hide");
            $("#fetchProveedores").DataTable().ajax.reload();
            FETCHPROVEEDORES = null;
        break;
        case 2:
            $("#txtNombreEditar").val("");
            $("#txtApellidosEditar").val("");
            $("#txtEmpresaEditar").val("");
            $("#txtCargoEditar").val("");
            $("#txtCalleEditar").val("");
            $(".txtColoniaEditar").val("");
            $("#txtCiudadEditar").val("");
            $("#txtMunicipioEditar").val("");
            $("#txtEstadoEditar").val("");
            $("#txtPaisEditar").val("");
            $("#txtCPEditar").val("");
            $("#txtRFCEditar").val("");
            $("#txtTel1Editar").val("");
            $("#txtTel2Editar").val("");
            $("#txtEmailEditar").val("");
            $("#select_MonedaEditar").val("");
            $("#txtEstadoEditar").removeAttr('readonly');
            $("#txtMunicipioEditar").removeAttr('readonly');
            $("#txtPaisEditar").removeAttr('readonly');
            $("#txtColoniaEditar").empty();
            $("#modalEditarProvee").modal("hide");
            $("#fetchProveedores").DataTable().ajax.reload();
            FETCHPROVEEDORES = null;
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
			$("#btnCerrarUpdateProvee").css('display', 'none');
			$("#loadingCerrarUpdateProvee").css('display', '');
			$("#btnUpdateProvee").css('display', 'none');
			$("#loadingUpdateProvee").css('display', '');
		},
		success: function (data) {
			console.log(data);

			if (data.estado != null && data.estado != "") {//
				$("#txtPaisEditar").val("México");
				$("#txtEstadoEditar").val(data.estado);
				$("#txtMunicipioEditar").val(data.municipio);
				$("#txtColoniaEditar").empty();

				for (var i = 0; i < data.colonias.length; i++) {
					$("#txtColoniaEditar").append("<option value='" + data.colonias[i] + "'>" + data.colonias[i] + "</option>");
				}

				$("#txtEstadoEditar").attr('readonly', 'readonly');
				$("#txtMunicipioEditar").attr('readonly', 'readonly');
				$("#txtPaisEditar").attr('readonly', 'readonly');
			}
			else {
				//$("#txtEstado_Editar").val("");
				//$("#txtMunicipio_Editar").val("");
				//$("#txtPais_Editar").val("");
				$("#txtEstadoEditar").removeAttr('readonly');
				$("#txtMunicipioEditar").removeAttr('readonly');
				$("#txtPaisEditar").removeAttr('readonly');
				$("#txtColoniaEditar").empty();
			}
		}
	})
	.done(function () {
		$("#loadingHeader").css('display', 'none');
		$("#btnCerrarUpdateProvee").css('display', '');
		$("#loadingCerrarUpdateProvee").css('display', 'none');
		$("#btnUpdateProvee").css('display', '');
		$("#loadingUpdateProvee").css('display', 'none');
	})
	.fail(function () {
		$("#loadingHeader").css('display', 'none');
		$("#btnCerrarUpdateProvee").css('display', '');
		$("#loadingCerrarUpdateProvee").css('display', 'none');
		$("#btnUpdateProvee").css('display', '');
		$("#loadingUpdateProvee").css('display', 'none');

		// Abrir modal Verifique conexión
		$("#modalErrorConexion").modal("show");
	})
	.always(function () {
	});
}

// Cargar DataTable Proveedores //
function fetchProveedores() {
	let dataTable = $("#fetchProveedores").DataTable({
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
			targets: 17,
			render: function (data, type, full, meta) {
				if (full[17] == "Activo") {
					return "<label class='badge badge-success'>Activo</label>";
				} else {
					return "<label class='badge badge-danger'>Inactivo</label>";
				}
			}
		}],
		order: [],
		ajax: {
			url: window.dir + "index.php/Controller_Proveedores/fetchProveedores",
			type: "POST"
		}
	});
}