window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';

window.Table_Usuario = null;

window.Eliminar_Region = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Region_Usuario").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Region_Editar = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Region_Usuario_Editar").tBodies[0];
    tbody.removeChild(row1);
}


$(document).ready(function(){ 

	console.log("ready");

	fetch_data_Usuario();

	var Table_List_Sucursal_Editar = document.getElementById("Table_Usuario");
    Table_List_Sucursal_Editar.onclick = function(e)
    {
        window.Table_Usuario = e.target.parentNode;
    }

    $("#Option_Eliminar_Usuario").click(function(event) {
    	/* Act on the event */
    	Eliminar_Funcion();
    });

    $("#Eliminar_Usuario").click(function(event) {
    	/* Act on the event */
    	Eliminar_Funcion();
    });

    $("#Agregar_Usuario").click(function(event) {
		/* Act on the event */
		$("#myModal_Usuario").modal("show");
	});

    $("#Option_Agregar_Usuario").click(function(event) {
    	/* Act on the event */
    	$("#myModal_Usuario").modal("show");
    });

	$("#Editar_Usuario").click(function(event) {
		/* Act on the event */
		Editar_Funcion();
	});

	$("#Option_Editar_Usuario").click(function(event) {
		/* Act on the event */
		Editar_Funcion();
	});

	$("#Add_Region").click(function(event) {
		/* Act on the event */
		console.log("Click");

		let Region = $("#txtRegion").val();

		if (Region != null && Region != "")
		{
				let Table_Region    = document.getElementById("Table_Region_Usuario"); 
            	let tbody    		= Table_Region.tBodies[0];

				for (var i = 0; i <= 0; i++)
                {

	                let row  = tbody.insertRow(i);
	                let cel1 = row.insertCell(0);
	                let cel2 = row.insertCell(1);

	                cel1.innerHTML = Region;

	                let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Region);
				    cel2.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);
                
                }

                $("#txtRegion").val("");
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
            toastr.success('La región esta vacia', 'Correcto');
		}
	});

	$("#Add_Region_Editar").click(function(event) {
		/* Act on the event */
		console.log("Click");

		let Region = $("#txtRegion_Editar").val();

		if (Region != null && Region != "")
		{
				let Table_Region    = document.getElementById("Table_Region_Usuario_Editar"); 
            	let tbody    		= Table_Region.tBodies[0];

				for (var i = 0; i <= 0; i++)
                {

	                let row  = tbody.insertRow(i);
	                let cel1 = row.insertCell(0);
	                let cel2 = row.insertCell(1);

	                cel1.innerHTML = Region;

	                let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Region_Editar);
				    cel2.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);
                
                }

                $("#txtRegion_Editar").val("");
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
            toastr.success('La región esta vacia', 'Correcto');
		}
	});


	$("#Asignacion_region").change(function(event) {
		/* Act on the event */
		if ($('#Asignacion_region').prop('checked') == true) 
	    {
	        $("#div_Asignacion_Region").css('display', '');
	        $("#Tabla_Asignacion").css('display','');

	    }else{

	        $("#div_Asignacion_Region").css('display', 'none');
	        $("#Tabla_Asignacion").css('display','none');
	        $("#txtRegion").val("");
	        let Table_Region   		= document.getElementById("Table_Region_Usuario"); 
			Table_Region.tBodies[0].innerHTML = "";
	    } 
	});

	$("#Asignacion_region_Editar").change(function(event) {
		/* Act on the event */
		if ($('#Asignacion_region_Editar').prop('checked') == true) 
	    {
	        $("#div_Asignacion_Region_Editar").css('display', '');
	        $("#Tabla_Asignacion_Editar").css('display','');

	    }else{

	        $("#div_Asignacion_Region_Editar").css('display', 'none');
	        $("#Tabla_Asignacion_Editar").css('display','none');
	        $("#txtRegion_Editar").val("");
	        let Table_Region   		= document.getElementById("Table_Region_Usuario_Editar"); 
			Table_Region.tBodies[0].innerHTML = "";
	    } 
	});

	$("#check_Seleccionar_Todos").click(function(event) {

		if($('#check_Seleccionar_Todos').prop('checked'))
		{
		    $("#check_Configuracion").prop('checked', true);
		    $("#check_Clientes").prop('checked', true);
		    $("#check_Distribuidores").prop('checked', true);
		    $("#check_Usuarios").prop('checked', true);
		    $("#check_Bodega").prop('checked', true);
		    $("#check_Productos").prop('checked', true);
		    $("#check_Proveedores").prop('checked', true);
		    $("#check_Promociones").prop('checked', true);
		    $("#check_Ventas").prop('checked', true);
		    $("#check_Compras").prop('checked', true); 
		    $("#check_Inventario").prop('checked', true);
		    $("#check_Editar_Inventario").prop('checked', true);
		    $("#check_Cuentas_Cobrar").prop('checked', true);
		    $("#check_Cuentas_Pagar").prop('checked', true);
		    $("#check_Gastos").prop('checked', true);
		    $("#check_Otras_Salidas").prop('checked', true);
		    $("#check_Otras_Entradas").prop('checked', true);
		    $("#check_Usuarios_Pack").prop('checked', true);
		    $("#check_Puntos").prop('checked', true);
		    $("#check_Extracciones").prop('checked', true);
		    $("#check_Envios").prop('checked', true);
		    $("#check_Traspasos").prop('checked', true);
		    $("#check_Empaques").prop('checked', true);
		    $("#check_Reportes").prop('checked', true);
		    $("#check_Paises").prop('checked', true);
		    $("#check_Cajas").prop('checked', true);
		    $("#check_Factura").prop('checked', true);
		    $("#check_Ticket").prop('checked', true);
		    $("#check_Empresa").prop('checked', true);
		    $("#check_HelpDesk").prop('checked', true);
		    $("#check_Estadistica").prop('checked', true);
		}
		else
		{
			$("#check_Configuracion").prop('checked', false);
		    $("#check_Clientes").prop('checked', false);
		    $("#check_Distribuidores").prop('checked', false);
		    $("#check_Usuarios").prop('checked', false);
		    $("#check_Bodega").prop('checked', false);
		    $("#check_Productos").prop('checked', false);
		    $("#check_Proveedores").prop('checked', false);
		    $("#check_Promociones").prop('checked', false);
		    $("#check_Ventas").prop('checked', false);
		    $("#check_Compras").prop('checked', false);
		    $("#check_Inventario").prop('checked', false);
		    $("#check_Editar_Inventario").prop('checked', false);
		    $("#check_Cuentas_Cobrar").prop('checked', false);
		    $("#check_Cuentas_Pagar").prop('checked', false);
		    $("#check_Gastos").prop('checked', false);
		    $("#check_Otras_Salidas").prop('checked', false);
		    $("#check_Otras_Entradas").prop('checked', false);
		    $("#check_Usuarios_Pack").prop('checked', false);
		    $("#check_Puntos").prop('checked', false);
		    $("#check_Extracciones").prop('checked', false);
		    $("#check_Envios").prop('checked', false);
		    $("#check_Traspasos").prop('checked', false);
		    $("#check_Empaques").prop('checked', false);
		    $("#check_Reportes").prop('checked', false);
		    $("#check_Paises").prop('checked', false);
		    $("#check_Cajas").prop('checked', false);
		    $("#check_Factura").prop('checked', false);
		    $("#check_Ticket").prop('checked', false);
		    $("#check_Empresa").prop('checked', false);
		    $("#check_HelpDesk").prop('checked', false);
		    $("#check_Estadistica").prop('checked', false);
		}

	});

	$("#check_Seleccionar_Todos_Editar").click(function(event) {

		if($('#check_Seleccionar_Todos_Editar').prop('checked'))
		{
		    $("#check_Configuracion_Editar").prop('checked', true);
		    $("#check_Clientes_Editar").prop('checked', true);
		    $("#check_Distribuidores_Editar").prop('checked', true);
		    $("#check_Usuarios_Editar").prop('checked', true);
		    $("#check_Bodega_Editar").prop('checked', true);
		    $("#check_Productos_Editar").prop('checked', true);
		    $("#check_Proveedores_Editar").prop('checked', true);
		    $("#check_Promociones_Editar").prop('checked', true);
		    $("#check_Ventas_Editar").prop('checked', true);
		    $("#check_Compras_Editar").prop('checked', true);
		    $("#check_Inventario_Editar").prop('checked', true);
		    $("#check_Editar_Inventario_Editar").prop('checked', true);
		    $("#check_Cuentas_Cobrar_Editar").prop('checked', true);
		    $("#check_Cuentas_Pagar_Editar").prop('checked', true);
		    $("#check_Gastos_Editar").prop('checked', true);
		    $("#check_Otras_Salidas_Editar").prop('checked', true);
		    $("#check_Otras_Entradas_Editar").prop('checked', true);
		    $("#check_Usuarios_Pack_Editar").prop('checked', true);
		    $("#check_Puntos_Editar").prop('checked', true);
		    $("#check_Extracciones_Editar").prop('checked', true);
		    $("#check_Envios_Editar").prop('checked', true);
		    $("#check_Traspasos_Editar").prop('checked', true);
		    $("#check_Empaques_Editar").prop('checked', true);
		    $("#check_Reportes_Editar").prop('checked', true);
		    $("#check_Paises_Editar").prop('checked', true);
		    $("#check_Cajas_Editar").prop('checked', true);
		    $("#check_Factura_Editar").prop('checked', true);
		    $("#check_Ticket_Editar").prop('checked', true);
		    $("#check_Empresa_Editar").prop('checked', true);
		    $("#check_HelpDesk_Editar").prop('checked', true);
		    $("#check_Estadistica_Editar").prop('checked', true);
		}
		else
		{
			$("#check_Configuracion_Editar").prop('checked', false);
		    $("#check_Clientes_Editar").prop('checked', false);
		    $("#check_Distribuidores_Editar").prop('checked', false);
		    $("#check_Usuarios_Editar").prop('checked', false);
		    $("#check_Bodega_Editar").prop('checked', false);
		    $("#check_Productos_Editar").prop('checked', false);
		    $("#check_Proveedores_Editar").prop('checked', false);
		    $("#check_Promociones_Editar").prop('checked', false);
		    $("#check_Ventas_Editar").prop('checked', false);
		    $("#check_Compras_Editar").prop('checked', false);
		    $("#check_Inventario_Editar").prop('checked', false);
		    $("#check_Editar_Inventario_Editar").prop('checked', false);
		    $("#check_Cuentas_Cobrar_Editar").prop('checked', false);
		    $("#check_Cuentas_Pagar_Editar").prop('checked', false);
		    $("#check_Gastos_Editar").prop('checked', false);
		    $("#check_Otras_Salidas_Editar").prop('checked', false);
		    $("#check_Otras_Entradas_Editar").prop('checked', false);
		    $("#check_Usuarios_Pack_Editar").prop('checked', false);
		    $("#check_Puntos_Editar").prop('checked', false);
		    $("#check_Extracciones_Editar").prop('checked', false);
		    $("#check_Envios_Editar").prop('checked', false);
		    $("#check_Traspasos_Editar").prop('checked', false);
		    $("#check_Empaques_Editar").prop('checked', false);
		    $("#check_Reportes_Editar").prop('checked', false);
		    $("#check_Paises_Editar").prop('checked', false);
		    $("#check_Cajas_Editar").prop('checked', false);
		    $("#check_Factura_Editar").prop('checked', false);
		    $("#check_Ticket_Editar").prop('checked', false);
		    $("#check_Empresa_Editar").prop('checked', false);
		    $("#check_HelpDesk_Editar").prop('checked', false);
		    $("#check_Estadistica_Editar").prop('checked', false);
		}

	});

	$("#btn_Guardar_Usuario_Editar").click(function(event) {
		/* Act on the event */
		let ID 		    = window.Table_Usuario.childNodes[0].innerHTML;
		let Nombre 		= $("#txtNombre_Editar").val();
		let Apellidos 	= $("#txt_Apellidos_Editar").val();
		let Calle 		= $("#txtCalle_Editar").val();
		let Colonia 	= $("#txtColonia_Editar").val();
		//let Ciudad 		= $("#txtCiudad").val();
		let Municipio 	= $("#txtMunicipio_Editar").val();
		let Estado 		= $("#txtEstado_Editar").val();
		let Pais 		= $("#txtPais_Editar").val();
		let CP 			= $("#txtCP_Editar").val();
		let Tel1 		= $("#txtTel1_Editar").val();
		let Tel2 		= $("#txtTel2_Editar").val();
		let Email 		= $("#txtEmail_Editar").val();
		let Password 	= $("#txtPaswword_Editar").val();
		let Puesto 		= $("#txtPuesto_Editar").val();
		let Rol 		= $("#txtRol_Editar").val();
		let Configuracion   = 0;
		let Clientes   		= 0;
		let Distribuidores  = 0;
		let Usuarios   		= 0;
		let Bodega   		= 0;
		let Productos   	= 0;
		let Proveedores   	= 0;
		let Promociones   	= 0;
		let Ventas   		= 0;
		let Compras   		= 0;
		let Inventario   	= 0;
		let Edit_Inventario = 0;
		let Cuentas_Cobrar  = 0;
		let Cuentas_Pagar   = 0;
		let Gastos   		= 0;
		let Otras_Salidas   = 0;
		let Otras_Entradas  = 0;
		let Usuarios_Pack   = 0;
		let Puntos   		= 0;
		let Extracciones   	= 0;
		let Envios   		= 0;
		let Traspasos   	= 0;
		let Empaques   		= 0;
		let Reportes   		= 0;
		let Paises   		= 0;
		let Cajas   		= 0;
		let Factura   		= 0;
		let Ticket   		= 0;
		let Empresa   		= 0;
		let HelpDesk   		= 0;
		let Estadistica		= 0;
		let Status          = "";
		let Region   		= "";

		if($('#check_Configuracion_Editar').prop('checked')){Configuracion = 1}else{Configuracion = 0}
		if($('#check_Clientes_Editar').prop('checked')){Clientes = 1}else{Clientes = 0}
		if($('#check_Distribuidores_Editar').prop('checked')){Distribuidores = 1}else{Distribuidores = 0}
		if($('#check_Usuarios_Editar').prop('checked')){Usuarios = 1}else{Usuarios = 0}
		if($('#check_Bodega_Editar').prop('checked')){Bodega = 1}else{Bodega = 0}
		if($('#check_Productos_Editar').prop('checked')){Productos = 1}else{Productos = 0}
		if($('#check_Proveedores_Editar').prop('checked')){Proveedores = 1}else{Proveedores = 0}
		if($('#check_Promociones_Editar').prop('checked')){Promociones = 1}else{Promociones = 0}
		if($('#check_Ventas_Editar').prop('checked')){Ventas = 1}else{Ventas = 0}
		if($('#check_Compras_Editar').prop('checked')){Compras = 1}else{Compras = 0}
		if($('#check_Inventario_Editar').prop('checked')){Inventario = 1}else{Inventario = 0}
		if($('#check_Editar_Inventario_Editar').prop('checked')){Edit_Inventario = 1}else{Edit_Inventario = 0}
		if($('#check_Cuentas_Cobrar_Editar').prop('checked')){Cuentas_Cobrar = 1}else{Cuentas_Cobrar = 0}
		if($('#check_Cuentas_Pagar_Editar').prop('checked')){Cuentas_Pagar = 1}else{Cuentas_Pagar = 0}
		if($('#check_Gastos_Editar').prop('checked')){Gastos = 1}else{Gastos = 0}
		if($('#check_Otras_Salidas_Editar').prop('checked')){Otras_Salidas = 1}else{Otras_Salidas = 0}
		if($('#check_Otras_Entradas_Editar').prop('checked')){Otras_Entradas = 1}else{Otras_Entradas = 0}
		if($('#check_Usuarios_Pack_Editar').prop('checked')){Usuarios_Pack = 1}else{Usuarios_Pack = 0}
		if($('#check_Puntos_Editar').prop('checked')){Puntos = 1}else{Puntos = 0}
		if($('#check_Extracciones_Editar').prop('checked')){Extracciones = 1}else{Extracciones = 0}
		if($('#check_Envios_Editar').prop('checked')){Envios = 1}else{Envios = 0}
		if($('#check_Traspasos_Editar').prop('checked')){Traspasos = 1}else{Traspasos = 0}
		if($('#check_Empaques_Editar').prop('checked')){Empaques = 1}else{Empaques = 0}
		if($('#check_Reportes_Editar').prop('checked')){Reportes = 1}else{Reportes = 0}
		if($('#check_Paises_Editar').prop('checked')){Paises = 1}else{Paises = 0}
		if($('#check_Cajas_Editar').prop('checked')){Cajas = 1}else{Cajas = 0}
		if($('#check_Factura_Editar').prop('checked')){Factura = 1}else{Factura = 0}
		if($('#check_Ticket_Editar').prop('checked')){Ticket = 1}else{Ticket = 0}
		if($('#check_Empresa_Editar').prop('checked')){Empresa = 1}else{Empresa = 0}
		if($('#check_HelpDesk_Editar').prop('checked')){HelpDesk = 1}else{HelpDesk = 0}
		if($('#check_Estadistica_Editar').prop('checked')){Estadistica = 1}else{Estadistica = 0}

			console.log("Cliente: " + Clientes);
			console.log("Distribuidores: " + Distribuidores);

		if ($('#Asignacion_region_Editar').prop('checked') == true) 
	    {
	        Region = $("#txtRegion_Editar").val();

	    }else{

	        Region = "";
	    }

	    if ($('#check_Status_Editar').prop('checked') == true) 
	    {
	        Status = 'Inactivo'

	    }else{

	        Status = "Activo";
	    } 

	    arrayRegion = new Array();

	    let Tabla_Region         = document.getElementById("Table_Region_Usuario_Editar");
    	let Tbody_Region         = Tabla_Region.getElementsByTagName("tbody")[0];

    	if (Tbody_Region.rows.length > 0)
    	{
    		for (var i = 0; i < Tbody_Region.rows.length; i++)
    		{
    			arrayRegion.push(Tbody_Region.rows[i].cells[0].innerHTML);
    		}

    	}

			if (Rol != null && Rol != "" && Nombre != null && Nombre != "" && Apellidos != null && Apellidos != "" && Tel1 != null && Tel1 != "" && Email != null && Email != "" && Password != null && Password != "" && Puesto != null && Puesto != "")
			{
					var formData = new FormData();
					formData.append("ID", ID);
		            formData.append("Nombre", Nombre);
		            formData.append("Apellidos", Apellidos);
		            formData.append("Password", Password);
		            formData.append("Calle_numero", Calle);
		            formData.append("Colonia", Colonia);
		            formData.append("Status", Status);
		            formData.append("Municipio", Municipio);
		            formData.append("Estado", Estado);
		            formData.append("Pais", Pais);
		            formData.append("CP", CP);
		            formData.append("Tel1", Tel1);
		            formData.append("Tel2", Tel2);
		            formData.append("Email", Email);
		            formData.append("Puesto", Puesto);
		            formData.append("Status", "Activo");
		            formData.append("Configuracion", Configuracion);
		            formData.append("Clientes", Clientes);
		            formData.append("Distribuidores", Distribuidores);
		            formData.append("Usuarios", Usuarios);
		            formData.append("Bodega", Bodega);
		            formData.append("Productos", Productos);
		            formData.append("Proveedores", Proveedores);
		            formData.append("Promociones", Promociones);
		            formData.append("Ventas", Ventas);
		            formData.append("Compras", Compras); 
		            formData.append("Inventario", Inventario);
		            formData.append("Editar_Inventario", Edit_Inventario);
		            formData.append("Cuentas_cobrar",Cuentas_Cobrar);
		            formData.append("Cuentas_pagar",Cuentas_Pagar);
		            formData.append("Gastos",Gastos);
		            formData.append("Otras_salidas",Otras_Salidas);
		            formData.append("Otras_entradas",Otras_Entradas);
		            formData.append("Usuarios_pack",Usuarios_Pack);
		            formData.append("Puntos",Puntos);
		            formData.append("Extracciones",Extracciones);
		            formData.append("Envios",Envios);
		            formData.append("Traspasos",Traspasos);
		            formData.append("Empaques",Empaques);
		            formData.append("Reportes",Reportes);
		            formData.append("Paises",Paises);
		            formData.append("Cajas",Cajas);
		            formData.append("Factura",Factura);
		            formData.append("Ticket",Ticket);
		            formData.append("HelpDesk",HelpDesk);
		            formData.append("Estadistica",Estadistica);
		            formData.append("idRol",Rol);


		            formData.append("Region",arrayRegion);


		             $.ajax({
		               url: dir + 'index.php/Controller_Usuario/Editar_Usuario',
		               type: 'POST',
		               processData: false,  // tell jQuery not to process the data
		               contentType: false,
		               timeout: 35000,
		               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		               data: formData,
		               beforeSend : function ()
		                {
		                    $('#Cargando_Add_Editar').css('display', '');
		                },
		                success: function(data)
		                {
		                    console.log(data);

		                    if (data.trim() == 'Correcto')
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
		                        toastr.success('Usuario modificado con exito', 'Correcto');

		                        Limpiar();
		                        $('#Table_Usuario').DataTable().destroy();
		                        fetch_data_Usuario();
		                    }
		                    else if (data == 'Correcto_destroy')
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
		                          "hideMethod": "fadeOut",
		                          "onHidden": function(){window.location.replace(dir + "index.php/Controller_Login/");}
		                        }
		                        // Display an error toast, with a title
		                        toastr.success('Usuario modificado con exito', 'Correcto');
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
		                        toastr.error('Ocurrio un error al guardar el usuario', 'Error');
		                    }
		                }
		           })
		           .done(function() {
		               
		               $('#Cargando_Add_Editar').css('display', 'none');
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
                        toastr.warning('Algunos campos obligatorios estan vacios', 'Advertencia');
			}
	});

	$("#btn_Guardar_Usuario").click(function(event) {
		/* Act on the event */
		let Nombre 		= $("#txtNombre").val();
		let Apellidos 	= $("#txt_Apellidos").val();
		let Calle 		= $("#txtCalle").val();
		let Colonia 	= $("#txtColonia").val();
		//let Ciudad 		= $("#txtCiudad").val();
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
		let Configuracion   = 0;
		let Clientes   		= 0;
		let Distribuidores  = 0;
		let Usuarios   		= 0;
		let Bodega   		= 0;
		let Productos   	= 0;
		let Proveedores   	= 0;
		let Promociones   	= 0;
		let Ventas   		= 0;
		let Compras   		= 0;
		let Inventario   	= 0;
		let Edit_Inventario = 0;
		let Cuentas_Cobrar  = 0;
		let Cuentas_Pagar   = 0;
		let Gastos   		= 0;
		let Otras_Salidas   = 0;
		let Otras_Entradas  = 0;
		let Usuarios_Pack   = 0;
		let Puntos   		= 0;
		let Extracciones   	= 0;
		let Envios   		= 0;
		let Traspasos   	= 0;
		let Empaques   		= 0;
		let Reportes   		= 0;
		let Paises   		= 0;
		let Cajas   		= 0;
		let Factura   		= 0;
		let Ticket   		= 0;
		let Empresa   		= 0;
		let HelpDesk   		= 0;
		let Estadistica		= 0;
		let Region   		= "";

		if($('#check_Configuracion').prop('checked')){Configuracion = 1}else{Configuracion = 0}
		if($('#check_Clientes').prop('checked')){Clientes = 1}else{Clientes = 0}
		if($('#check_Distribuidores').prop('checked')){Distribuidores = 1}else{Distribuidores = 0}
		if($('#check_Usuarios').prop('checked')){Usuarios = 1}else{Usuarios = 0}
		if($('#check_Bodega').prop('checked')){Bodega = 1}else{Bodega = 0}
		if($('#check_Productos').prop('checked')){Productos = 1}else{Productos = 0}
		if($('#check_Proveedores').prop('checked')){Proveedores = 1}else{Proveedores = 0}
		if($('#check_Promociones').prop('checked')){Promociones = 1}else{Promociones = 0}
		if($('#check_Ventas').prop('checked')){Ventas = 1}else{Ventas = 0}
		if($('#check_Compras').prop('checked')){Compras = 1}else{Compras = 0}
		if($('#check_Inventario').prop('checked')){Inventario = 1}else{Inventario = 0}
		if($('#check_Editar_Inventario').prop('checked')){Edit_Inventario = 1}else{Edit_Inventario = 0}
		if($('#check_Cuentas_Cobrar').prop('checked')){Cuentas_Cobrar = 1}else{Cuentas_Cobrar = 0}
		if($('#check_Cuentas_Pagar').prop('checked')){Cuentas_Pagar = 1}else{Cuentas_Pagar = 0}
		if($('#check_Gastos').prop('checked')){Gastos = 1}else{Gastos = 0}
		if($('#check_Otras_Salidas').prop('checked')){Otras_Salidas = 1}else{Otras_Salidas = 0}
		if($('#check_Otras_Entradas').prop('checked')){Otras_Entradas = 1}else{Otras_Entradas = 0}
		if($('#check_Usuarios_Pack').prop('checked')){Usuarios_Pack = 1}else{Usuarios_Pack = 0}
		if($('#check_Puntos').prop('checked')){Puntos = 1}else{Puntos = 0}
		if($('#check_Extracciones').prop('checked')){Extracciones = 1}else{Extracciones = 0}
		if($('#check_Envios').prop('checked')){Envios = 1}else{Envios = 0}
		if($('#check_Traspasos').prop('checked')){Traspasos = 1}else{Traspasos = 0}
		if($('#check_Empaques').prop('checked')){Empaques = 1}else{Empaques = 0}
		if($('#check_Reportes').prop('checked')){Reportes = 1}else{Reportes = 0}
		if($('#check_Paises').prop('checked')){Paises = 1}else{Paises = 0}
		if($('#check_Cajas').prop('checked')){Cajas = 1}else{Cajas = 0}
		if($('#check_Factura').prop('checked')){Factura = 1}else{Factura = 0}
		if($('#check_Ticket').prop('checked')){Ticket = 1}else{Ticket = 0}
		if($('#check_Empresa').prop('checked')){Empresa = 1}else{Empresa = 0}
		if($('#check_HelpDesk').prop('checked')){HelpDesk = 1}else{HelpDesk = 0}
		if($('#check_Estadistica').prop('checked')){Estadistica = 1}else{Estadistica = 0}

		if ($('#Asignacion_region').prop('checked') == true) 
	    {
	        Region = $("#txtRegion").val();

	    }else{

	        Region = "";
	    } 

	    arrayRegion = new Array();

	    let Tabla_Region         = document.getElementById("Table_Region_Usuario");
    	let Tbody_Region         = Tabla_Region.getElementsByTagName("tbody")[0];

    	if (Tbody_Region.rows.length > 0)
    	{
    		for (var i = 0; i < Tbody_Region.rows.length; i++)
    		{
    			arrayRegion.push(Tbody_Region.rows[i].cells[0].innerHTML);
    		}

    	}

			if (Nombre != null && Nombre != "" && Apellidos != null && Apellidos != "" && Tel1 != null && Tel1 != "" && Email != null && Email != "" && Password != null && Password != "" && Puesto != null && Puesto != "")
			{
					var formData = new FormData();
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
		            formData.append("Configuracion", Configuracion);
		            formData.append("Clientes", Clientes);
		            formData.append("Distribuidores", Distribuidores);
		            formData.append("Usuarios", Usuarios);
		            formData.append("Bodega", Bodega);
		            formData.append("Productos", Productos);
		            formData.append("Proveedores", Proveedores);
		            formData.append("Promociones", Promociones);
		            formData.append("Ventas", Ventas);
		            formData.append("Compras", Compras); 
		            formData.append("Inventario", Inventario);
		            formData.append("Editar_Inventario", Edit_Inventario);
		            formData.append("Cuentas_cobrar",Cuentas_Cobrar);
		            formData.append("Cuentas_pagar",Cuentas_Pagar);
		            formData.append("Gastos",Gastos);
		            formData.append("Otras_salidas",Otras_Salidas);
		            formData.append("Otras_entradas",Otras_Entradas);
		            formData.append("Usuarios_pack",Usuarios_Pack);
		            formData.append("Puntos",Puntos);
		            formData.append("Extracciones",Extracciones);
		            formData.append("Envios",Envios);
		            formData.append("Traspasos",Traspasos);
		            formData.append("Empaques",Empaques);
		            formData.append("Reportes",Reportes);
		            formData.append("Paises",Paises);
		            formData.append("Cajas",Cajas);
		            formData.append("Factura",Factura);
		            formData.append("Ticket",Ticket);
		            formData.append("HelpDesk",HelpDesk); Rol
		            formData.append("Estadistica",Estadistica);
		            formData.append("idRol",Rol);

		            formData.append("Region",arrayRegion);


		             $.ajax({
		               url: dir + 'index.php/Controller_Usuario/Guardar_Usuario',
		               type: 'POST',
		               processData: false,  // tell jQuery not to process the data
		               contentType: false,
		               timeout: 35000,
		               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		               data: formData,
		               beforeSend : function ()
		                {
		                    $('#Cargando_Add').css('display', '');
		                },
		                success: function(data)
		                {
		                    console.log(data);

		                    if (data.trim() == 'Correcto')
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
		                        toastr.success('Usuario almacenado con exito', 'Correcto');

		                        Limpiar();
		                        $('#Table_Usuario').DataTable().destroy();
		                        fetch_data_Usuario();
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
		                        toastr.error('Ocurrio un error al guardar el usuario', 'Error');
		                    }
		                }
		           })
		           .done(function() {
		               
		               $('#Cargando_Add').css('display', 'none');
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
                        toastr.warning('Algunos campos obligatorios estan vacios', 'Advertencia');
			}
	});

});

function Limpiar()
{

	$("#txtNombre").val("");
	$("#txt_Apellidos").val("");
	$("#txtCalle").val("");
	$("#txtColonia").val("");
	$("#txtCiudad").val("");
	$("#txtMunicipio").val("");
	$("#txtEstado").val("");
	$("#txtPais").val("");
	$("#txtCP").val("");
	$("#txtTel1").val("");
	$("#txtTel2").val("");
	$("#txtEmail").val("");
	$("#txtPaswword").val("");
	$("#txtPuesto").val("");
	$("#txtRol").val("");
	$("#check_Configuracion").prop('checked', false);
    $("#check_Clientes").prop('checked', false);
    $("#check_Distribuidores").prop('checked', false);
    $("#check_Usuarios").prop('checked', false);
    $("#check_Bodega").prop('checked', false);
    $("#check_Productos").prop('checked', false);
    $("#check_Proveedores").prop('checked', false);
    $("#check_Promociones").prop('checked', false);
    $("#check_Ventas").prop('checked', false);
    $("#check_Compras").prop('checked', false);
    $("#check_Inventario").prop('checked', false);
    $("#check_Editar_Inventario").prop('checked', false);
    $("#check_Cuentas_Cobrar").prop('checked', false);
    $("#check_Cuentas_Pagar").prop('checked', false);
    $("#check_Gastos").prop('checked', false);
    $("#check_Otras_Salidas").prop('checked', false);
    $("#check_Otras_Entradas").prop('checked', false);
    $("#check_Usuarios_Pack").prop('checked', false);
    $("#check_Puntos").prop('checked', false);
    $("#check_Extracciones").prop('checked', false);
    $("#check_Envios").prop('checked', false);
    $("#check_Traspasos").prop('checked', false);
    $("#check_Empaques").prop('checked', false);
    $("#check_Reportes").prop('checked', false);
    $("#check_Paises").prop('checked', false);
    $("#check_Cajas").prop('checked', false);
    $("#check_Factura").prop('checked', false);
    $("#check_Ticket").prop('checked', false);
    $("#check_Empresa").prop('checked', false);
    $("#check_HelpDesk").prop('checked', false);

    $("#txtNombre_Editar").val("");
	$("#txt_Apellidos_Editar").val("");
	$("#txtCalle_Editar").val("");
	$("#txtColonia_Editar").val("");
	$("#txtCiudad_Editar").val("");
	$("#txtMunicipio_Editar").val("");
	$("#txtEstado_Editar").val("");
	$("#txtPais_Editar").val("");
	$("#txtCP_Editar").val("");
	$("#txtTel1_Editar").val("");
	$("#txtTel2_Editar").val("");
	$("#txtEmail_Editar").val("");
	$("#txtPaswword_Editar").val("");
	$("#txtPuesto_Editar").val("");
	$("#txtRol_Editar").val("");
    $("#check_Configuracion_Editar").prop('checked', false);
    $("#check_Clientes_Editar").prop('checked', false);
    $("#check_Distribuidores_Editar").prop('checked', false);
    $("#check_Usuarios_Editar").prop('checked', false);
    $("#check_Bodega_Editar").prop('checked', false);
    $("#check_Productos_Editar").prop('checked', false);
    $("#check_Proveedores_Editar").prop('checked', false);
    $("#check_Promociones_Editar").prop('checked', false);
    $("#check_Ventas_Editar").prop('checked', false);
    $("#check_Compras_Editar").prop('checked', false);
    $("#check_Inventario_Editar").prop('checked', false);
    $("#check_Editar_Inventario_Editar").prop('checked', false);
    $("#check_Cuentas_Cobrar_Editar").prop('checked', false);
    $("#check_Cuentas_Pagar_Editar").prop('checked', false);
    $("#check_Gastos_Editar").prop('checked', false);
    $("#check_Otras_Salidas_Editar").prop('checked', false);
    $("#check_Otras_Entradas_Editar").prop('checked', false);
    $("#check_Usuarios_Pack_Editar").prop('checked', false);
    $("#check_Puntos_Editar").prop('checked', false);
    $("#check_Extracciones_Editar").prop('checked', false);
    $("#check_Envios_Editar").prop('checked', false);
    $("#check_Traspasos_Editar").prop('checked', false);
    $("#check_Empaques_Editar").prop('checked', false);
    $("#check_Reportes_Editar").prop('checked', false);
    $("#check_Paises_Editar").prop('checked', false);
    $("#check_Cajas_Editar").prop('checked', false);
    $("#check_Factura_Editar").prop('checked', false);
    $("#check_Ticket_Editar").prop('checked', false);
    $("#check_Empresa_Editar").prop('checked', false);
    $("#check_HelpDesk_Editar").prop('checked', false);
    $("#check_Estadistica_Editar").prop('checked', false);
    $("#check_Status_Editar").prop('checked', false);

    $("#div_Asignacion_Region_Editar").css('display', 'none');
    $("#Tabla_Asignacion_Editar").css('display','none');
    $("#txtRegion_Editar").val("");
    let Table_Region_Editar   		= document.getElementById("Table_Region_Usuario_Editar"); 
	Table_Region_Editar.tBodies[0].innerHTML = "";

	$("#myModal_Usuario_Editar").modal("hide");

    $("#div_Asignacion_Region").css('display', 'none');
    $("#Tabla_Asignacion").css('display','none');
    $("#txtRegion").val("");
    let Table_Region   		= document.getElementById("Table_Region_Usuario"); 
	Table_Region.tBodies[0].innerHTML = "";

	$("#myModal_Usuario").modal("hide");
}


 function fetch_data_Usuario(){

  var dataTable = $('#Table_Usuario').DataTable({
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

        url: dir + "Clases/fetch_Usuarios.php",
        type: "POST"
    }
  });
}

function Editar_Funcion()
{

	if (window.Table_Usuario != null && window.Table_Usuario != "")
	{
		var formData = new FormData();
			formData.append("ID", window.Table_Usuario.childNodes[0].innerHTML);
			$.ajax({
	               url: dir + 'index.php/Controller_Usuario/Get_Usuario',
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

					if (parsed != null && parsed != "")
		            {
		            	$("#txtNombre_Editar").val(parsed['Usuario'][0]['Nombre']);
						$("#txt_Apellidos_Editar").val(parsed['Usuario'][0]['Apellidos']);
						$("#txtCalle_Editar").val(parsed['Usuario'][0]['Calle_numero']);
						$("#txtColonia_Editar").val(parsed['Usuario'][0]['Colonia']);
						$("#txtMunicipio_Editar").val(parsed['Usuario'][0]['Municipio']);
						$("#txtEstado_Editar").val(parsed['Usuario'][0]['Estado']);
						$("#txtPais_Editar").val(parsed['Usuario'][0]['Pais']);
						$("#txtCP_Editar").val(parsed['Usuario'][0]['CP']);
						$("#txtTel1_Editar").val(parsed['Usuario'][0]['Tel1']);
						$("#txtTel2_Editar").val(parsed['Usuario'][0]['Tel2']);
						$("#txtEmail_Editar").val(parsed['Usuario'][0]['Email']);
						$("#txtPaswword_Editar").val(parsed['Usuario'][0]['Password']);
						$("#txtPuesto_Editar").val(parsed['Usuario'][0]['Puesto']);

						if (parsed['Usuario'][0]['idRol'] != null){
							$("#txtRol_Editar").val(parsed['Usuario'][0]['idRol']);
						}else{
							$("#txtRol_Editar").val("");
						}
						
						if(parsed['Usuario'][0]['Status'] == 'Inactivo'){$("#check_Status_Editar").prop('checked', true)}else{$("#check_Status_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Configuracion'] == 1){$("#check_Configuracion_Editar").prop('checked', true)}else{$("#check_Configuracion_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Clientes'] == 1){$("#check_Clientes_Editar").prop('checked', true)}else{$("#check_Clientes_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Distribuidores'] == 1){$("#check_Distribuidores_Editar").prop('checked', true)}else{$("#check_Distribuidores_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Usuarios'] == 1){$("#check_Usuarios_Editar").prop('checked', true)}else{$("#check_Usuarios_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Bodega'] == 1){$("#check_Bodega_Editar").prop('checked', true)}else{$("#check_Bodega_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Productos'] == 1){$("#check_Productos_Editar").prop('checked', true)}else{$("#check_Productos_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Proveedores'] == 1){$("#check_Proveedores_Editar").prop('checked', true)}else{$("#check_Proveedores_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Promociones'] == 1){$("#check_Promociones_Editar").prop('checked', true)}else{$("#check_Promociones_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Ventas'] == 1){$("#check_Ventas_Editar").prop('checked', true)}else{$("#check_Ventas_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Compras'] == 1){$("#check_Compras_Editar").prop('checked', true)}else{$("#check_Compras_Editar").prop('checked', false)}

						if(parsed['Usuario'][0]['Inventario'] == 1){$("#check_Inventario_Editar").prop('checked', true)}else{$("#check_Inventario_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Editar_Inventario'] == 1){$("#check_Editar_Inventario_Editar").prop('checked', true)}else{$("#check_Editar_Inventario_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Cuentas_cobrar'] == 1){$("#check_Cuentas_Cobrar_Editar").prop('checked', true)}else{$("#check_Cuentas_Cobrar_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Cuentas_pagar'] == 1){$("#check_Cuentas_Pagar_Editar").prop('checked', true)}else{$("#check_Cuentas_Pagar_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Gastos'] == 1){$("#check_Gastos_Editar").prop('checked', true)}else{$("#check_Gastos_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Otras_salidas'] == 1){$("#check_Otras_Salidas_Editar").prop('checked', true)}else{$("#check_Otras_Salidas_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Otras_entradas'] == 1){$("#check_Otras_Entradas_Editar").prop('checked', true)}else{$("#check_Otras_Entradas_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Usuarios_pack'] == 1){$("#check_Usuarios_Pack_Editar").prop('checked', true)}else{$("#check_Usuarios_Pack_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Puntos'] == 1){$("#check_Puntos_Editar").prop('checked', true)}else{$("#check_Puntos_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Extracciones'] == 1){$("#check_Extracciones_Editar").prop('checked', true)}else{$("#check_Extracciones_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Envios'] == 1){$("#check_Envios_Editar").prop('checked', true)}else{$("#check_Envios_Editar").prop('checked', false)}

						if(parsed['Usuario'][0]['Traspasos'] == 1){$("#check_Traspasos_Editar").prop('checked', true)}else{$("#check_Traspasos_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Empaques'] == 1){$("#check_Empaques_Editar").prop('checked', true)}else{$("#check_Empaques_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Reportes'] == 1){$("#check_Reportes_Editar").prop('checked', true)}else{$("#check_Reportes_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Paises'] == 1){$("#check_Paises_Editar").prop('checked', true)}else{$("#check_Paises_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Cajas'] == 1){$("#check_Cajas_Editar").prop('checked', true)}else{$("#check_Cajas_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Factura'] == 1){$("#check_Factura_Editar").prop('checked', true)}else{$("#check_Factura_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Ticket'] == 1){$("#check_Ticket_Editar").prop('checked', true)}else{$("#check_Ticket_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Empresa'] == 1){$("#check_Empresa_Editar").prop('checked', true)}else{$("#check_Empresa_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['HelpDesk'] == 1){$("#check_HelpDesk_Editar").prop('checked', true)}else{$("#check_HelpDesk_Editar").prop('checked', false)}
						if(parsed['Usuario'][0]['Estadistica'] == 1){$("#check_Estadistica_Editar").prop('checked', true)}else{$("#check_Estadistica_Editar").prop('checked', false)}

							let Tabla_Region         = document.getElementById("Table_Region_Usuario_Editar");
    						let Tbody_Region         = Tabla_Region.getElementsByTagName("tbody")[0];

    						Tabla_Region.tBodies[0].innerHTML = "";

    						if (parsed['Region'].length > 0)
    						{
    							$('#Asignacion_region_Editar').bootstrapToggle('on');
    							$("#div_Asignacion_Region_Editar").css('display', '');
							    $("#Tabla_Asignacion_Editar").css('display','');
							    $("#txtRegion_Editar").val("");
							    let Table_Region_Editar   		= document.getElementById("Table_Region_Usuario_Editar"); 
								Table_Region_Editar.tBodies[0].innerHTML = "";

    							for (var i = 0; i < parsed['Region'].length; i++)
								{
									let row  = Tbody_Region.insertRow(i);
					                let cel1 = row.insertCell(0);
					                let cel2 = row.insertCell(1);

					                cel1.innerHTML = parsed['Region'][i]['Region'];

					                let boton1 = document.createElement("button");
								    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
								    boton1.setAttribute('name', 'name_Productos');
								    boton1.addEventListener("click",window.Eliminar_Region_Editar);
								    cel2.appendChild(boton1);

								    let icono1 = document.createElement("span");
								    icono1.classList.add('glyphicon', 'glyphicon-trash');
								    boton1.appendChild(icono1);
								}
    						}
    						else
    						{
    							$('#Asignacion_region_Editar').bootstrapToggle('off');
    							$("#div_Asignacion_Region_Editar").css('display', 'none');
							    $("#Tabla_Asignacion_Editar").css('display','none');
							    $("#txtRegion_Editar").val("");
							    let Table_Region_Editar   		= document.getElementById("Table_Region_Usuario_Editar"); 
								Table_Region_Editar.tBodies[0].innerHTML = "";
    						}

							
					 }

	                    $("#myModal_Usuario_Editar").modal("show");
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
                        toastr.info('Seleccione a un usuario', 'Importante');
	}
}


function Eliminar_Funcion()
{
	if (window.Table_Usuario != null && window.Table_Usuario != "")
	{
		if (window.Table_Usuario.childNodes[12].childNodes[0].innerHTML == 'Activo')
		{
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
				    var formData = new FormData();
					formData.append("ID", window.Table_Usuario.childNodes[0].innerHTML);
					$.ajax({
			               url: dir + 'index.php/Controller_Usuario/Eliminar_Usuario',
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

			                    if (data.trim() == 'Correcto')
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
			                        toastr.success('Usuario eliminado con exito', 'Correcto');

			                        Limpiar();
			                        $('#Table_Usuario').DataTable().destroy();
			                        fetch_data_Usuario();
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
			                        toastr.error('Ocurrio un error al eliminar al usuario', 'Error');
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
	        toastr.info('El Usuario se encuentra como inactivo', 'Importante');
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
        toastr.info('Seleccione a un usuario', 'Importante');
	}
}