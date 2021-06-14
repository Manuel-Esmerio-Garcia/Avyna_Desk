var FETCHUSUARIO   		 = null;
var validateCorreo 		 = null;
var validateCorreoEditar = 1;

$(document).ready(function(){

	fetchUsuario();

	$("#btnAgregarUsuario").click(function(event) {
		// Abrir Modal Agregar Usuario //
		$("#modalAgregarUsuario").modal("show");
	});

	// Validate Password //
	$("#txtPaswword").change(function(event) {
		let Password 	 = $("#txtPaswword").val();
		let Confirmacion = $("#txtConfirmacion").val();

		if (Password != ""){
			if (Confirmacion != ""){
				if (Password == Confirmacion){

				}else{
					$("#validatePassword").removeClass('hide');
					$("#validatePassword").css('display','');
					$("#validateConfirmacion").removeClass('hide');
					$("#validateConfirmacion").css('display','');
				}
			}else{
				$("#validatePassword").css('display','none');
				$("#validateConfirmacion").css('display','none');
			}
		}else{
			$("#validatePassword").css('display','none');
			$("#validateConfirmacion").css('display','none');
		}
	});

	// Validate Password //
	$("#txtConfirmacion").change(function(event) {
		let Password 	 = $("#txtPaswword").val();
		let Confirmacion = $("#txtConfirmacion").val();

		if (Confirmacion != ""){
			if (Password != ""){
				if (Password == Confirmacion){

				}else{
					$("#validatePassword").removeClass('hide');
					$("#validatePassword").css('display','');
					$("#validateConfirmacion").removeClass('hide');
					$("#validateConfirmacion").css('display','');
				}
			}else{
				$("#validatePassword").css('display','none');
				$("#validateConfirmacion").css('display','none');
			}
		}else{
			$("#validatePassword").css('display','none');
			$("#validateConfirmacion").css('display','none');
		}
	});

	// Acción Check Región Toggle button //
	$("#Asignacion_region").change(function(event) {
		/* Act on the event */
		if ($('#Asignacion_region').prop('checked') == true) 
	    {
	        $("#divCheckRegion").css('display', '');
	        $("#divRegionUsuario").css('display','');

	    }else{

	        $("#divCheckRegion").css('display', 'none');
	        $("#divRegionUsuario").css('display','none');
	        $("#txtRegion").val("");
	        let Table_Region   		= document.getElementById("fetchRegionUsuario"); 
			Table_Region.tBodies[0].innerHTML = "";
	    } 
	});

	/// Acción Agregar Región  ////
	$("#Add_Region").click(function(event) {
		let Region = $("#txtRegion").val();

		if (Region != null && Region != ""){
			let Table_Region    = document.getElementById("fetchRegionUsuario"); 
        	let tbody    		= Table_Region.tBodies[0];

			for (var i = 0; i <= 0; i++){

                let row  = tbody.insertRow(i);
                let cel1 = row.insertCell(0);
                let cel2 = row.insertCell(1);

                cel1.innerHTML = Region;
                let boton1 = document.createElement("button");
			    boton1.classList.add('btn', 'btn-danger');
			    boton1.addEventListener("click",clickEliminarRegion);
			    cel2.appendChild(boton1);
			    let icono1 = document.createElement("span");
			    icono1.classList.add('glyphicon', 'glyphicon-trash');
			    boton1.appendChild(icono1);
            }

            $("#txtRegion").val("");
		}
		else{
            toastr.success('La región esta vacia', 'Correcto');
		}
	});

	// Asignar Puesto Según el Rol //
	$("#txtRol").change(function(event) {
		let idRol  = $("#txtRol").val();
		let txtRol = $("#txtRol option:selected").text();
		(idRol != "")?$("#txtPuesto").val(txtRol):$("#txtPuesto").val("");
	});

	//Validar Correo Inexistente
	$("#txtEmail").change(function(event) {

		let Correo = this.value;

		if (Correo != "" && Correo != null){
			let Validate = caracteresCorreoValido(this.value,'#validateCorreo');

			if (Validate == true){

				let formData = new FormData();
			    formData.append("Email", Correo);

			    $.ajax({
			      	url: window.dir + 'index.php/controller_Usuario/validateCorreo',
			      	type: 'POST',
			      	processData: false,  // tell jQuery not to process the data
			      	contentType: false,
			      	timeout: 800000,
			      	data: formData,
			      	beforeSend : function ()
			      	{
			        	$("#loadingHeader").css('display', '');
			        	$("#btnCerrarAdd").css('display', 'none');
			        	$("#loadingCerrarAdd").css('display', '');
			        	$("#btnAddUsuario").css('display', 'none');
			        	$("#loadingAddUsuario").css('display', '');
			      	},
			      	success: function(data)
			      	{
			      		console.log(data);
			      		let parsed = JSON.parse(data);

				      	if (parsed != null && parsed != ""){
							$("#validateCorreo").css('display','');
							$("#validateCorreo").removeClass('hide');
							validateCorreo = 0;
				      	}
				      	else{
							$("#validateCorreo").css('display','none');
							validateCorreo = 1;
				      	}
			      	}
			    })
			    .done(function() {
			      	$("#loadingHeader").css('display', 'none');
			        $("#btnCerrarAdd").css('display', '');
			        $("#loadingCerrarAdd").css('display', 'none');
			        $("#btnAddUsuario").css('display', '');
			        $("#loadingAddUsuario").css('display', 'none');
			    })
			    .fail(function() {
		            $("#loadingHeader").css('display', 'none');
			        $("#btnCerrarAdd").css('display', '');
			        $("#loadingCerrarAdd").css('display', 'none');
			        $("#btnAddUsuario").css('display', '');
			        $("#loadingAddUsuario").css('display', 'none');

			        // Abrir modal Verifique conexión
		    		$("#modalErrorConexion").modal("show");
			    })
			    .always(function() {
			    });
			}
			else{
				$("#validateCorreo").css('display','');
				$("#validateCorreo").removeClass('hide');
				validateCorreo = 0;
			}
		}
		else{
	    	$("#validateCorreo").css('display','none');
		}
	});


	//Consumir WebServices Codigo Postal Agregar Usuario
	$("#txtCP").change(function(event) {

		let CP = $("#txtCP").val();

		let formData = new FormData();
	    formData.append("CP", CP);

	    $.ajax({
	        url: 'https://api-codigos-postales.herokuapp.com/v2/codigo_postal/' + CP,
	        type: 'GET',
	        processData: false,  // tell jQuery not to process the data
	        contentType: false,
	        timeout: 800000,
	        beforeSend : function ()
	        {
		        $("#loadingHeader").css('display', '');
		        $("#btnCerrarAdd").css('display', 'none');
		        $("#loadingCerrarAdd").css('display', '');
		        $("#btnAddUsuario").css('display', 'none');
		        $("#loadingAddUsuario").css('display', '');
	        },
	        success: function(data)
	        {
	      		console.log(data);

	            if (data.estado != null && data.estado != "")
	            {
	            	$("#txtPais").val("México");
	            	$("#txtEstado").val(data.estado);
	            	$("#txtMunicipio").val(data.municipio);
	            	$("#txtColonia").empty();

	            	for (var i = 0; i < data.colonias.length; i++){
	            		$("#txtColonia").append("<option value='" + data.colonias[i] + "'>" + data.colonias[i] + "</option>");
	            	}

	            	$("#txtEstado").attr('readonly', 'readonly');
					$("#txtMunicipio").attr('readonly', 'readonly');
					$("#txtPais").attr('readonly', 'readonly');
	            }
	            else
	            {
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
	    .done(function() {
	      	$("#loadingHeader").css('display', 'none');
	        $("#btnCerrarAdd").css('display', '');
	        $("#loadingCerrarAdd").css('display', 'none');
	        $("#btnAddUsuario").css('display', '');
	        $("#loadingAddUsuario").css('display', 'none');
	    })
	    .fail(function() {
            $("#loadingHeader").css('display', 'none');
	        $("#btnCerrarAdd").css('display', '');
	        $("#loadingCerrarAdd").css('display', 'none');
	        $("#btnAddUsuario").css('display', '');
	        $("#loadingAddUsuario").css('display', 'none');

	        // Abrir modal Verifique conexión
		    $("#modalErrorConexion").modal("show");
	    })
	    .always(function() {
	    });
	});


	//////// Agregar Usuario ////////
	$("#btnAddUsuario").click(function(event) {
		let Nombre 		= $("#txtNombre").val();
		let Apellidos 	= $("#txtApellidos").val();
		let Calle 		= $("#txtCalle").val();
		let Colonia 	= $("#txtColonia").val();
		let Municipio 	= $("#txtMunicipio").val();
		let Estado 		= $("#txtEstado").val();
		let Pais 		= $("#txtPais").val();
		let CP 			= $("#txtCP").val();
		let Tel1 		= $("#txtTel1").val();
		let Tel2 		= $("#txtTel2").val();
		let Email 		= $("#txtEmail").val();
		let Password 	= $("#txtPaswword").val();
		let Puesto 		= $("#txtPuesto").val();
		let Rol 		= $("#txtRol").val();
		let Region   	= "";

		// Arrau Regiones //
		arrayRegion 	= new Array();

		($('#Asignacion_region').prop('checked') == true) ? Region = $("#txtRegion").val() : Region = "";
	    
	    let table = document.getElementById("fetchRegionUsuario");
    	let tbody = table.getElementsByTagName("tbody")[0];

    	if (tbody.rows.length > 0){
    		for (var i = 0; i < tbody.rows.length; i++){
    			arrayRegion.push(tbody.rows[i].cells[0].innerHTML);
    		}
    	}

		if (Nombre != "" && Apellidos != "" && Tel1 != "" && Email != "" && Password != "" && Rol != "" && validateCorreo == 1){

			let formData = new FormData();
            formData.append("Nombre", Nombre);
            formData.append("Apellidos", Apellidos);
            formData.append("Password", Password);
            formData.append("Calle_numero", Calle);
            formData.append("Colonia", Colonia);
            formData.append("Status", 'Activo');
            formData.append("Municipio", Municipio);
            formData.append("Estado", Estado);
            formData.append("Pais", Pais);
            formData.append("CP", CP);
            formData.append("Tel1", Tel1);
            formData.append("Tel2", Tel2);
            formData.append("Email", Email);
            formData.append("Puesto", Puesto);
            formData.append("Status", "Activo");
            formData.append("idRol",Rol);
            formData.append("Region",arrayRegion);

	        $.ajax({
	            url: window.dir + 'index.php/Controller_Usuario/addUsuario',
	            type: 'POST',
                processData: false,
	            contentType: false,
	            timeout: 800000,
	            data: formData,
	            beforeSend : function ()
	            {
	                $('#loadingHeader').css('display', '');
	                $('#btnCerrarAdd').css('display', 'none');
	                $('#loadingCerrarAdd').css('display', '');
	                $('#btnAddUsuario').css('display', 'none');
	                $('#loadingAddUsuario').css('display', '');
	            },
	            success: function(data)
	            {
	                 console.log(data);

	                switch(parseInt(data.trim())){
	                 	case 0:
	                 		toastr.error('Ocurrio un error al guardar el usuario', 'Error');
	                 	break;

	                 	case 1:
	                 		Limpiar(1);
	                 		toastr.success('Usuario guardado con exito', 'Correcto');
	                 	break;

	                 	default:
	                 		toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
	                }   
	            }
            })
            .done(function() {
                $('#loadingHeader').css('display', 'none');
                $('#btnCerrarAdd').css('display', '');
                $('#loadingCerrarAdd').css('display', 'none');
                $('#btnAddUsuario').css('display', '');
                $('#loadingAddUsuario').css('display', 'none');
            })
            .fail(function() {
                $('#loadingHeader').css('display', 'none');
                $('#btnCerrarAdd').css('display', '');
                $('#loadingCerrarAdd').css('display', 'none');
                $('#btnAddUsuario').css('display', '');
                $('#loadingAddUsuario').css('display', 'none');
                // Abrir modal Verifique conexión
		    	$("#modalErrorConexion").modal("show");
            })
            .always(function() {
            });
		}
		else{
            toastr.warning('Algunos campos obligatorios estan vacios', 'Advertencia');
		}
	});

	/////////////////////////////////////////////////////////////////////////////////////
	///////////////////// Editar Usuario Modulo MEG 02/07/2019 //////////////////////////

	/// leer fetchUsuario al dar click //
	document.getElementById("fetchUsuario").onclick = function(e)
    {
        FETCHUSUARIO = e.target.parentNode;
    }

    // Acción cargar info Usuario Modal Editar Usuario //
    $("#btnEditarUsuario").click(function(event) {
    	
    	if (FETCHUSUARIO != null){

			let formData = new FormData();
			formData.append("idUsuario", FETCHUSUARIO.childNodes[0].innerHTML);

			$.ajax({
	            url: window.dir + 'index.php/Controller_Usuario/getInfoUsuario',
                type: 'POST',
                processData: false,
                contentType: false,
                timeout: 800000,
                data: formData,
                beforeSend : function ()
                {
                    $("#loadingHeader").css('display', '');
			        $("#btnAgregarUsuario").css('display', 'none');
			        $("#loadingAgregarUsuario").css('display', '');
			        $("#btnEditarUsuario").css('display', 'none');
			        $("#loadingEditarUsuario").css('display', '');
			        $("#btnEliminarUsuario").css('display', 'none');
			        $("#loadingEliminarUsuario").css('display', '');
                },
                success: function(data)
                {
	                let parsed = JSON.parse(data);
	                console.log(parsed);

					if (parsed != null){

						cargarCP(parsed['User'][0]['CP']);

		            	$("#txtNombreEditar").val(parsed['User'][0]['Nombre']);
						$("#txtApellidosEditar").val(parsed['User'][0]['Apellidos']);
						$("#txtCalleEditar").val(parsed['User'][0]['Calle_numero']);
						$("#txtColoniaEditar").val(parsed['User'][0]['Colonia']);
						$("#txtMunicipioEditar").val(parsed['User'][0]['Municipio']);
						$("#txtEstadoEditar").val(parsed['User'][0]['Estado']);
						$("#txtPaisEditar").val(parsed['User'][0]['Pais']);
						$("#txtCPEditar").val(parsed['User'][0]['CP']);
						$("#txtTel1Editar").val(parsed['User'][0]['Tel1']);
						$("#txtTel2Editar").val(parsed['User'][0]['Tel2']);
						$("#txtEmailEditar").val(parsed['User'][0]['Email']);
						$("#txtPuestoEditar").val(parsed['User'][0]['Puesto']);
						$("#txtRolEditar").val(parsed['User'][0]['idRol']);

						(parsed['User'][0]['idRol'] != null) ? $("#txtRolEditar").val(parsed['User'][0]['idRol']) : $("#txtRolEditar").val("");
						(parsed['User'][0]['Status'] == 'Inactivo') ? $("#checkStatus").prop('checked', true) : $("#checkStatus").prop('checked', false);
						
						let table = document.getElementById("fetchRegionUsuarioEditar");
						let tbody = table.getElementsByTagName("tbody")[0];

						if (parsed['Regi'].length > 0){

							$('#Asignacion_regionEditar').bootstrapToggle('on');
							$("#divCheckRegionEditar").css('display', '');
						    $("#divRegionUsuarioEditar").css('display','');
						    $("#txtRegionEditar").val("");
							table.tBodies[0].innerHTML = "";

							for (var i = 0; i < parsed['Regi'].length; i++){
								let row  = tbody.insertRow(i);
				                let cel1 = row.insertCell(0);
				                let cel2 = row.insertCell(1);

				                cel1.innerHTML = parsed['Regi'][i]['Region'];

				                let boton1 = document.createElement("button");
							    boton1.classList.add('btn', 'btn-danger',);
							    boton1.addEventListener("click",clickEliminarRegionEditar);
							    cel2.appendChild(boton1);

							    let icono1 = document.createElement("span");
							    icono1.classList.add('glyphicon', 'glyphicon-trash');
							    boton1.appendChild(icono1);
							}
						}
						else{
							$('#Asignacion_regionEditar').bootstrapToggle('off');
							$("#divCheckRegionEditar").css('display', 'none');
						    $("#divRegionUsuarioEditar").css('display','none');
						    $("#txtRegionEditar").val("");
							table.tBodies[0].innerHTML = "";
						}
					}

	                $("#modalEditarUsuario").modal("show");
	            }
	        })
	        .done(function() {
	            $("#loadingHeader").css('display', 'none');
		        $("#btnAgregarUsuario").css('display', '');
		        $("#loadingAgregarUsuario").css('display', 'none');
		        $("#btnEditarUsuario").css('display', '');
		        $("#loadingEditarUsuario").css('display', 'none');
		        $("#btnEliminarUsuario").css('display', '');
		        $("#loadingEliminarUsuario").css('display', 'none');
	        })
	        .fail(function() {
	            $("#loadingHeader").css('display', 'none');
		        $("#btnAgregarUsuario").css('display', '');
		        $("#loadingAgregarUsuario").css('display', 'none');
		        $("#btnEditarUsuario").css('display', '');
		        $("#loadingEditarUsuario").css('display', 'none');
		        $("#btnEliminarUsuario").css('display', '');
		        $("#loadingEliminarUsuario").css('display', 'none');
		        // Abrir modal Verifique conexión
		    	$("#modalErrorConexion").modal("show");
	        })
	        .always(function() {
	        });
		}
		else{
            toastr.warning('Seleccione a un usuario', 'Advertencia');
		}
    });

	$("#txtCPEditar").change(function(event) {
		
		let CP = $("#txtCPEditar").val();

		let formData = new FormData();
	    formData.append("CP", CP);

	    $.ajax({
	        url: 'https://api-codigos-postales.herokuapp.com/v2/codigo_postal/' + CP,
	        type: 'GET',
	        processData: false,  // tell jQuery not to process the data
	        contentType: false,
	        timeout: 800000,
	        beforeSend : function ()
	        {
		        $("#loadingHeader").css('display', '');
		        $("#btnCerrarEditar").css('display', 'none');
		        $("#loadingCerrarEditar").css('display', '');
		        $("#btnEditarUsuarioModal").css('display', 'none');
		        $("#loadingEditarUsuarioModal").css('display', '');
	        },
	        success: function(data)
	        {
	      		console.log(data);

	            if (data.estado != null && data.estado != "")
	            {
	            	$("#txtPaisEditar").val("México");
	            	$("#txtEstadoEditar").val(data.estado);
	            	$("#txtMunicipioEditar").val(data.municipio);
	            	$("#txtColoniaEditar").empty();

	            	for (var i = 0; i < data.colonias.length; i++){
	            		$("#txtColoniaEditar").append("<option value='" + data.colonias[i] + "'>" + data.colonias[i] + "</option>");
	            	}

	            	$("#txtEstadoEditar").attr('readonly', 'readonly');
					$("#txtMunicipioEditar").attr('readonly', 'readonly');
					$("#txtPaisEditar").attr('readonly', 'readonly');
	            }
	            else
	            {
	            	$("#txtEstadoEditar").val("");
	            	$("#txtMunicipioEditar").val("");
	            	$("#txtPaisEditar").val("");
	            	$("#txtEstadoEditar").removeAttr('readonly');
					$("#txtMunicipioEditar").removeAttr('readonly');
					$("#txtPaisEditar").removeAttr('readonly');
					$("#txtColoniaEditar").empty();
	            }
	    	}
	    })
	    .done(function() {
	      	$("#loadingHeader").css('display', 'none');
	        $("#btnCerrarEditar").css('display', '');
	        $("#loadingCerrarEditar").css('display', 'none');
	        $("#btnEditarUsuarioModal").css('display', '');
	        $("#loadingEditarUsuarioModal").css('display', 'none');
	    })
	    .fail(function() {
            $("#loadingHeader").css('display', 'none');
	        $("#btnCerrarEditar").css('display', '');
	        $("#loadingCerrarEditar").css('display', 'none');
	        $("#btnEditarUsuarioModal").css('display', '');
	        $("#loadingEditarUsuarioModal").css('display', 'none');

	        // Abrir modal Verifique conexión
		    $("#modalErrorConexion").modal("show");
	    })
	    .always(function() {
	    });
	});

	// Validate Password //
	$("#txtPaswwordEditar").change(function(event) {
		let Password 	 = $("#txtPaswwordEditar").val();
		let Confirmacion = $("#txtConfirmacionEditar").val();

		if (Password != ""){
			if (Confirmacion != ""){
				if (Password == Confirmacion){

				}else{
					$("#validatePasswordEditar").removeClass('hide');
					$("#validatePasswordEditar").css('display','');
					$("#validateConfirmacionEditar").removeClass('hide');
					$("#validateConfirmacionEditar").css('display','');
				}
			}else{
				$("#validatePasswordEditar").css('display','none');
				$("#validateConfirmacionEditar").css('display','none');
			}
		}else{
			$("#validatePasswordEditar").css('display','none');
			$("#validateConfirmacionEditar").css('display','none');
		}
	});

	// Validate Password //
	$("#txtConfirmacionEditar").change(function(event) {
		let Password 	 = $("#txtPaswwordEditar").val();
		let Confirmacion = $("#txtConfirmacionEditar").val();

		if (Confirmacion != ""){
			if (Password != ""){
				if (Password == Confirmacion){

				}else{
					$("#validatePasswordEditar").removeClass('hide');
					$("#validatePasswordEditar").css('display','');
					$("#validateConfirmacionEditar").removeClass('hide');
					$("#validateConfirmacionEditar").css('display','');
				}
			}else{
				$("#validatePasswordEditar").css('display','none');
				$("#validateConfirmacionEditar").css('display','none');
			}
		}else{
			$("#validatePasswordEditar").css('display','none');
			$("#validateConfirmacionEditar").css('display','none');
		}
	});

	// Asignar Puesto Según el Rol //
	$("#txtRolEditar").change(function(event) {
		let idRol  = $("#txtRolEditar").val();
		let txtRol = $("#txtRolEditar option:selected").text();
		(idRol != "")?$("#txtPuestoEditar").val(txtRol):$("#txtPuestoEditar").val("");
	});

	//Validar Correo Inexistente
	$("#txtEmailEditar").change(function(event) {

		let Correo = this.value;

		if (Correo != "" && Correo != null){
			let Validate = caracteresCorreoValido(this.value,'#validateCorreoEditar');

			if (Validate == true){

				let formData = new FormData();
			    formData.append("Email", Correo);
			    formData.append("idUsuario", FETCHUSUARIO.childNodes[0].innerHTML);

			    $.ajax({
			      	url: window.dir + 'index.php/controller_Usuario/validateCorreoEditar',
			      	type: 'POST',
			      	processData: false,  // tell jQuery not to process the data
			      	contentType: false,
			      	timeout: 800000,
			      	data: formData,
			      	beforeSend : function ()
			      	{
			        	$("#loadingHeader").css('display', '');
			        	$("#btnCerrarEditar").css('display', 'none');
			        	$("#loadingCerrarEditar").css('display', '');
			        	$("#btnEditarUsuarioModal").css('display', 'none');
			        	$("#loadingEditarUsuarioModal").css('display', '');
			      	},
			      	success: function(data)
			      	{
			      		console.log(data);
			      		let parsed = JSON.parse(data);

				      	if (parsed != null && parsed != ""){
							$("#validateCorreoEditar").css('display','');
							$("#validateCorreoEditar").removeClass('hide');
							validateCorreoEditar = 0;
				      	}
				      	else{
							$("#validateCorreoEditar").css('display','none');
							validateCorreoEditar = 1;
				      	}
			      	}
			    })
			    .done(function() {
			      	$("#loadingHeader").css('display', 'none');
			        $("#btnCerrarEditar").css('display', '');
			        $("#loadingCerrarEditar").css('display', 'none');
			        $("#btnEditarUsuarioModal").css('display', '');
			        $("#loadingEditarUsuarioModal").css('display', 'none');
			    })
			    .fail(function() {
		            $("#loadingHeader").css('display', 'none');
			        $("#btnCerrarEditar").css('display', '');
			        $("#loadingCerrarEditar").css('display', 'none');
			        $("#btnEditarUsuarioModal").css('display', '');
			        $("#loadingEditarUsuarioModal").css('display', 'none');

			        // Abrir modal Verifique conexión
		    		$("#modalErrorConexion").modal("show");
			    })
			    .always(function() {
			    });
			}
			else{
				$("#validateCorreoEditar").css('display','');
				$("#validateCorreoEditar").removeClass('hide');
				validateCorreoEditar = 0;
			}
		}
		else{
	    	$("#validateCorreoEditar").css('display','none');
		}
	});


	//////// Editar Usuario ////////
	$("#btnEditarUsuarioModal").click(function(event) {

		let Nombre 		= $("#txtNombreEditar").val();
		let Apellidos 	= $("#txtApellidosEditar").val();
		let Calle 		= $("#txtCalleEditar").val();
		let Colonia 	= $("#txtColoniaEditar").val();
		let Municipio 	= $("#txtMunicipioEditar").val();
		let Estado 		= $("#txtEstadoEditar").val();
		let Pais 		= $("#txtPaisEditar").val();
		let CP 			= $("#txtCPEditar").val();
		let Tel1 		= $("#txtTel1Editar").val();
		let Tel2 		= $("#txtTel2Editar").val();
		let Email 		= $("#txtEmailEditar").val();
		let Puesto 		= $("#txtPuestoEditar").val();
		let Rol 		= $("#txtRolEditar").val();
		let Region   	= "";
		let Status      = "";

		let Password      = $("#txtPaswwordEditar").val(); 
		let Confirmacion  = $("#txtConfirmacionEditar").val();

		// Arrau Regiones //
		arrayRegion 	= new Array();

		($('#Asignacion_regionEditar').prop('checked') == true) ? Region = $("#txtRegionEditar").val() : Region = "";
		($('#check_Status_Editar').prop('checked') == true) ? Status = 'Inactivo' : Status = "Activo";
	    
	    let table = document.getElementById("fetchRegionUsuarioEditar");
    	let tbody = table.getElementsByTagName("tbody")[0];

    	if (tbody.rows.length > 0){
    		for (var i = 0; i < tbody.rows.length; i++){
    			arrayRegion.push(tbody.rows[i].cells[0].innerHTML);
    		}
    	}

		if (Nombre != "" && Apellidos != "" && Tel1 != "" && Email != "" && Rol != "" && validateCorreoEditar == 1){

			let formData = new FormData();
			formData.append("ID", FETCHUSUARIO.childNodes[0].innerHTML);
    		formData.append("Nombre", Nombre);
            formData.append("Apellidos", Apellidos);
            formData.append("Calle_numero", Calle);
            formData.append("Colonia", Colonia);
            formData.append("Municipio", Municipio);
            formData.append("Estado", Estado);
            formData.append("Pais", Pais);
            formData.append("CP", CP);
            formData.append("Tel1", Tel1);
            formData.append("Tel2", Tel2);
            formData.append("Email", Email);
            formData.append("Puesto", Puesto);
            formData.append("Status", Status);
            formData.append("idRol",Rol);
            formData.append("Region",arrayRegion);

			if (Password != "" && Confirmacion != ""){
				if (Password == Confirmacion){
					formData.append("Password", Password);
				}
				else{
					return toastr.warning('Las Contraseñas no coidicen', 'Advertencia');
				}
			}

	        $.ajax({
	            url: window.dir + 'index.php/Controller_Usuario/updateUsuario',
	            type: 'POST',
                processData: false,
	            contentType: false,
	            timeout: 800000,
	            data: formData,
	            beforeSend : function ()
	            {
	                $('#loadingHeader').css('display', '');
	                $('#btnCerrarAdd').css('display', 'none');
	                $('#loadingCerrarAdd').css('display', '');
	                $('#btnAddUsuario').css('display', 'none');
	                $('#loadingAddUsuario').css('display', '');
	            },
	            success: function(data)
	            {
	                console.log(data);

	                switch(parseInt(data.trim())){
	                 	case 0:
	                 		toastr.error('Ocurrio un error al modificar al usuario', 'Error');
	                 	break;

	                 	case 1:
	                 		Limpiar(2);
	                 		toastr.success('Usuario modificado con exito', 'Correcto');
	                 	break;

	                 	default:
	                 		toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
	                }   
	            }
            })
            .done(function() {
                $('#loadingHeader').css('display', 'none');
                $('#btnCerrarAdd').css('display', '');
                $('#loadingCerrarAdd').css('display', 'none');
                $('#btnAddUsuario').css('display', '');
                $('#loadingAddUsuario').css('display', 'none');
            })
            .fail(function() {
                $('#loadingHeader').css('display', 'none');
                $('#btnCerrarAdd').css('display', '');
                $('#loadingCerrarAdd').css('display', 'none');
                $('#btnAddUsuario').css('display', '');
                $('#loadingAddUsuario').css('display', 'none');
                // Abrir modal Verifique conexión
		    	$("#modalErrorConexion").modal("show");
            })
            .always(function() {
            });
		}
		else{
            toastr.warning('Algunos campos obligatorios estan vacios', 'Advertencia');
		}
	});

	/// Habilitar Regiones Editar ///
	$("#Asignacion_regionEditar").change(function(event) {
		/* Act on the event */
		if ($('#Asignacion_regionEditar').prop('checked') == true) 
	    {
	        $("#divCheckRegionEditar").css('display', '');
	        $("#divRegionUsuarioEditar").css('display','');

	    }else{

	        $("#divCheckRegionEditar").css('display', 'none');
	        $("#divRegionUsuarioEditar").css('display','none');
	        $("#txtRegionEditar").val("");
	        document.getElementById("fetchRegionUsuarioEditar").tBodies[0].innerHTML = "";
	    } 
	});

	/// Agregar Region Al Usuario ///
	$("#Add_RegionEditar").click(function(event) {

		let Region = $("#txtRegionEditar").val();

		if (Region != ""){
			let table  = document.getElementById("fetchRegionUsuarioEditar"); 
        	let tbody  = table.tBodies[0];

			for (var i = 0; i <= 0; i++){
                let row  = tbody.insertRow(i);
                let cel1 = row.insertCell(0);
                let cel2 = row.insertCell(1);

                cel1.innerHTML = Region;

                let boton = document.createElement("button");
			    boton.classList.add('btn', 'btn-danger');
			    boton.addEventListener("click",clickEliminarRegionEditar);
			    cel2.appendChild(boton);

			    let icono = document.createElement("span");
			    icono.classList.add('glyphicon', 'glyphicon-trash');
			    boton.appendChild(icono);
            }
            $("#txtRegionEditar").val("");
		}
		else{
            toastr.warning('El campo región se encuentra vacio', 'Advertencia');
		}
	});

	// Boton Eliminar Cliente //
	$("#btnEliminarUsuario").click(function(event) {
		
		if (FETCHUSUARIO != null){
			if (FETCHUSUARIO.childNodes[12].childNodes[0].innerHTML != 'Inactivo'){
				swal({
					title: "¿Esta seguro que desea eliminar al usuario?",
					text: "Una vez eliminado el usuario pasara como estatus inactivo",
					icon: "warning",
					buttons: true,
					dangerMode: true,
				})
				.then((willDelete) => {
				  	if (willDelete)
				  	{
					    let formData = new FormData();
						formData.append("idUsuario", FETCHUSUARIO.childNodes[0].innerHTML);
						$.ajax({
			              	url: window.dir + 'index.php/Controller_Usuario/deleteUsuario',
			                type: 'POST',
			                processData: false,
			                contentType: false,
			                timeout: 800000,
			                data: formData,
			                beforeSend : function ()
			                {
			                    $("#loadingHeader").css('display', '');
						        $("#btnAgregarUsuario").css('display', 'none');
						        $("#loadingAgregarUsuario").css('display', '');
						        $("#btnEditarUsuario").css('display', 'none');
						        $("#loadingEditarUsuario").css('display', '');
						        $("#btnEliminarUsuario").css('display', 'none');
						        $("#loadingEliminarUsuario").css('display', '');
			                },
			                success: function(data)
			                {
				                console.log(data);

				                switch(parseInt(data.trim())){
				                 	case 0:
				                 		toastr.error('Ocurrio un error al eliminar al usuario', 'Error');
				                 	break;

				                 	case 1:
				                 		Limpiar(3);
				                 		toastr.success('Usuario eliminado con exito', 'Correcto');
				                 	break;

				                 	default:
				                 		toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
				                }
				            }
			            })
			            .done(function() {
			                $("#loadingHeader").css('display', 'none');
					        $("#btnAgregarUsuario").css('display', '');
					        $("#loadingAgregarUsuario").css('display', 'none');
					        $("#btnEditarUsuario").css('display', '');
					        $("#loadingEditarUsuario").css('display', 'none');
					        $("#btnEliminarUsuario").css('display', '');
					        $("#loadingEliminarUsuario").css('display', 'none');
			            })
			            .fail(function() {
			            	$("#loadingHeader").css('display', 'none');
					        $("#btnAgregarUsuario").css('display', '');
					        $("#loadingAgregarUsuario").css('display', 'none');
					        $("#btnEditarUsuario").css('display', '');
					        $("#loadingEditarUsuario").css('display', 'none');
					        $("#btnEliminarUsuario").css('display', '');
					        $("#loadingEliminarUsuario").css('display', 'none');
					        // Abrir modal Verifique conexión
					    	$("#modalErrorConexion").modal("show");
			            })
			            .always(function() {
			            });
				  	} 
				});
			}
			else{
				toastr.warning('El usuario se encuentra como inactivo', 'Advertencia');
			}
		}
		else{
			toastr.warning('Seleccione a un usuario', 'Advertencia');
		}
	});

});

// Acciones Botones tabla Regiones Eliminar Region //
clickEliminarRegion = function (event){
	document.querySelector("#fetchRegionUsuario").tBodies[0].removeChild(this.parentNode.parentNode);
}

// Acciones Botones tabla Regiones Eliminar Region //
clickEliminarRegionEditar = function (event){
	document.querySelector("#fetchRegionUsuarioEditar").tBodies[0].removeChild(this.parentNode.parentNode);
}

// Cargar CP Modal Editar //
function cargarCP(CP) {

	if (CP != ""){
		let formData = new FormData();
	    formData.append("CP", CP);

	    $.ajax({
	        url: 'https://api-codigos-postales.herokuapp.com/v2/codigo_postal/' + CP,
	        type: 'GET',
	        processData: false,  // tell jQuery not to process the data
	        contentType: false,
	        timeout: 800000,
	        beforeSend : function ()
	        {
		        $("#loadingHeader").css('display', '');
		        $("#btnCerrarEditar").css('display', 'none');
		        $("#loadingCerrarEditar").css('display', '');
		        $("#btnEditarUsuarioModal").css('display', 'none');
		        $("#loadingEditarUsuarioModal").css('display', '');
	        },
	        success: function(data)
	        {
	      		console.log(data);

	            if (data.estado != null && data.estado != ""){

	            	$("#txtPaisEditar").val("México");
	            	$("#txtEstadoEditar").val(data.estado);
	            	$("#txtMunicipioEditar").val(data.municipio);
	            	$("#txtColoniaEditar").empty();

	            	for (var i = 0; i < data.colonias.length; i++){
	            		$("#txtColoniaEditar").append("<option value='" + data.colonias[i] + "'>" + data.colonias[i] + "</option>");
	            	}

	            	$("#txtEstadoEditar").attr('readonly', 'readonly');
					$("#txtMunicipioEditar").attr('readonly', 'readonly');
					$("#txtPaisEditar").attr('readonly', 'readonly');
	            }
	    	}
	    })
	    .done(function() {
	      	$("#loadingHeader").css('display', 'none');
	        $("#btnCerrarEditar").css('display', '');
	        $("#loadingCerrarEditar").css('display', 'none');
	        $("#btnEditarUsuarioModal").css('display', '');
	        $("#loadingEditarUsuarioModal").css('display', 'none');
	    })
	    .fail(function() {
	        $("#loadingHeader").css('display', 'none');
	        $("#btnCerrarEditar").css('display', '');
	        $("#loadingCerrarEditar").css('display', 'none');
	        $("#btnEditarUsuarioModal").css('display', '');
	        $("#loadingEditarUsuarioModal").css('display', 'none');

	        // Abrir modal Verifique conexión
		    $("#modalErrorConexion").modal("show");
	    })
	    .always(function() {
	    });
	}
}

// Función Limpiar //
function Limpiar(valor) {
	
	switch(valor){

		case 1:
			$('#fetchUsuario').DataTable().ajax.reload();
			$("#txtNombre").val("");
			$("#txtApellidos").val("");
			$("#txtCalle").val("");
			$("#txtColonia").val("");
			$("#txtMunicipio").val("");
			$("#txtEstado").val("");
			$("#txtPais").val("");
			$("#txtCP").val("");
			$("#txtTel1").val("");
			$("#txtTel2").val("");
			$("#txtEmail").val("");
			$("#txtPaswword").val("");
			$("#txtConfirmacion").val("");
			$("#txtPuesto").val("");
			$("#txtRol").val("");

			$("#Asignacion_region").prop('checked', false);
			$("#divCheckRegion").css('display', 'none');
		    $("#divRegionUsuario").css('display','none');
		    $("#txtRegion").val("");
		    document.getElementById("fetchRegionUsuario").tBodies[0].innerHTML = "";
		    FETCHUSUARIO = null;
			$("#modalAgregarUsuario").modal("hide");
		break;

		case 2:
			$('#fetchUsuario').DataTable().ajax.reload();
			$("#txtNombreEditar").val("");
			$("#txtApellidosEditar").val("");
			$("#txtCalleEditar").val("");
			$("#txtColoniaEditar").val("");
			$("#txtMunicipioEditar").val("");
			$("#txtEstadoEditar").val("");
			$("#txtPaisEditar").val("");
			$("#txtCPEditar").val("");
			$("#txtTel1Editar").val("");
			$("#txtTel2Editar").val("");
			$("#txtEmailEditar").val("");
			$("#txtPaswwordEditar").val("");
			$("#txtConfirmacionEditar").val("");
			$("#txtPuestoEditar").val("");
			$("#txtRolEditar").val("");

			$("#Asignacion_regionEditar").prop('checked', false);
			$("#divCheckRegionEditar").css('display', 'none');
		    $("#divRegionUsuarioEditar").css('display','none');
		    $("#txtRegionEditar").val("");
		    document.getElementById("fetchRegionUsuario").tBodies[0].innerHTML = "";
			$("#modalEditarUsuario").modal("hide");
			FETCHUSUARIO = null;
			location.reload();
		break;

		case 3:
		$('#fetchUsuario').DataTable().ajax.reload();
		FETCHUSUARIO = null;
		break;
	}
}

function fetchUsuario(){
  	let dataTable = $('#fetchUsuario').DataTable({
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
                "targets": 12,
                'render': function (data, type, full, meta)
                {
                    if (full[12] == 'Activo')
                    {
                    	return "<label class='badge badge-success'>Activo</label>"
                    }
                    else
                    {
                    	return "<label class='badge badge-danger'>Inactivo</label>"
                    }
                }       
	        },

	    ],  
	    "order" : [],
	    "ajax" : {
	        url: window.dir + "index.php/Controller_Usuario/fetchUsuario",
	        type: "POST"
	    }
	});
}