var FETCHLISTDISTRIBUIDOR = null;
var FETCHLISTPRODUCTO     = null;
var FETCHLISTSUCURSALES   = null;
var FETCHPROMOCIONES 	  = null;
var FETCHLISTSUCURSALESEDITAR = null;
var FETCHLISTPRODUCTOEDITAR   = null;
var	FETCHLISTDISTRIBUIDOREDITAR = null; 

var TIPOOFERTA 					= null;
var FETCHOFERTAS 				= null;

var	FETCHLISTREGALOS 			= null; 
var FETCHLISTDISTRIBUIDOROFERTA = null;
var FETCHLISTDIVISION 			= null;
var FETCHLISTLINEA 				= null;
var FETCHLISTSUBLINEA 			= null;
var FETCHLISTPRODUCTOOFERTA 	= null;

var	FETCHLISTREGALOSEDITAR 			  = null; 
var FETCHLISTDISTRIBUIDOROFERTAEDITAR = null;
var FETCHLISTDIVISIONEDITAR 		  = null;
var FETCHLISTLINEAEDITAR 			  = null;
var FETCHLISTSUBLINEAEDITAR 		  = null;
var FETCHLISTPRODUCTOOFERTAEDITAR 	  = null;

$(document).ready(function(){ 

	// Cargar Alerts Toast //
  	Toast();

  	// Cargar DataTable //
  	fetchOfertas();
	fetchPromociones();

  	// Cargar Fecha //
  	$('.input-daterange').datepicker({
      format: "yyyy-mm-dd",
      autoclose: true
    });

  	/////////////////////////////////////
  	/////// Agregar Promoción Tab ///////
  	/////////////////////////////////////

  	document.getElementById("fetchPromociones").onclick = function(e)
    {
        FETCHPROMOCIONES = e.target.parentNode;

        let formData = new FormData();
        formData.append("ID", FETCHPROMOCIONES.childNodes[0].innerHTML);

        $.ajax({
            url: window.dir + 'index.php/Controller_Promociones/getDetallePromociones',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnAgregarPromo').css('display','none');
                $('#loadingAgregarPromo').css('display','');
                $('#btnEditarPromo').css('display','none');
                $('#loadingEditarPromo').css('display','');
                $('#btnEliminarPromo').css('display','none');
                $('#loadingEliminarPromo').css('display','');
                $('#btnDuplicarPromo').css('display','none');
                $('#loadingDuplicarPromo').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);
                console.log(parsed);

	            if (parsed != null && parsed != ""){
	            	
            		let table = document.getElementById("fetchPromoDetalle"); 
            		let tbody = table.tBodies[0];

            		$('#fetchPromoDetalle').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++){

	                 let row  = tbody.insertRow(i);
	                 let cel1 = row.insertCell(0);
	                 let cel2 = row.insertCell(1);
	                 let cel3 = row.insertCell(2);
	                 let cel4 = row.insertCell(3);

	                 cel1.innerHTML = parsed[i]['ID'];
	                 cel2.innerHTML = parsed[i]['Codigo'];
	                 cel3.innerHTML = parsed[i]['Producto'];
	                 cel4.innerHTML = parsed[i]['Cantidad'];
	                
	                }

	                fetch("fetchPromoDetalle");
	            }
            }
        })
        .done(function() {
        	$('#loadingHeader').css('display','none');
            $('#btnAgregarPromo').css('display','');
            $('#loadingAgregarPromo').css('display','none');
            $('#btnEditarPromo').css('display','');
            $('#loadingEditarPromo').css('display','none');
            $('#btnEliminarPromo').css('display','');
            $('#loadingEliminarPromo').css('display','none');
            $('#btnDuplicarPromo').css('display','');
            $('#loadingDuplicarPromo').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnAgregarPromo').css('display','');
            $('#loadingAgregarPromo').css('display','none');
            $('#btnEditarPromo').css('display','');
            $('#loadingEditarPromo').css('display','none');
            $('#btnEliminarPromo').css('display','');
            $('#loadingEliminarPromo').css('display','none');
            $('#btnDuplicarPromo').css('display','');
            $('#loadingDuplicarPromo').css('display','none');

            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
    }

  	// Checkbox Excluir Distribuidores //
  	$("#checkExcluirDistri").click(function(event) {
    	
    	if ($('#checkExcluirDistri').prop('checked')){
		    $("#divExcluirDistri").css('display','');
		}
		else{

			let table = document.getElementById("fetchDistribuidorKit");
    		let tbody = table.getElementsByTagName("tbody")[0];

    		if (tbody.rows.length > 0){
    		 	swal({
					title: "¿Esta segúro?",
					text: "Se encuentran distribuidores agregados a la promoción si continúa todos los distribuidores agregados previamente seran eliminas de la tabla \n \n \n ¿Desea Continuar con el proceso?",
					icon: "warning",
					buttons: true,
					dangerMode: true,
				})
				.then((willDelete) => {
				  	if (willDelete) {
				    	tbody.innerHTML = "";
				    	$("#divExcluirDistri").css('display','none');
				  	} 
				  	else{
				  		$("#checkExcluirDistri").prop('checked', true);
				    	$("#divExcluirDistri").css('display','');
				  	}
				});
    		}
    		else{
    		 	$("#divExcluirDistri").css('display','none');
    		}
		}
    });

    // Acción Excluir Distribuidores Agregar Kit //
    $("#btnAddDistribuidorKit").click(function(event) {

        $.ajax({
            url: window.dir + 'index.php/Controller_Distribuidores/getDistribuidores',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnAddDistribuidorKit').css('display','none');
                $('#loadingAddDistribuidorKit').css('display','');
                $('#btnAddProductoKit').css('display','none');
                $('#loadingAddProductoKit').css('display','');
                $('#btnAddSucursalKit').css('display','none');
                $('#loadingAddSucursalKit').css('display','');
                $('#btnCerrarAddKit').css('display','none');
                $('#loadingCerrarAddKit').css('display','');
                $('#btnAddPromocionKit').css('display','none');
                $('#loadingAddPromocionKit').css('display','');
            },
            success: function(data)
            {	
                let parsed = JSON.parse(data);

                $("#modalDistribuidoresKit").modal("show");

	            if (parsed != null && parsed != ""){
            		let table = document.getElementById("fetchListDistribuidor"); 
            		let tbody = table.tBodies[0];

            		$('#fetchListDistribuidor').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

            		for (var i = 0; i < parsed.length; i++){

		                 let row  = tbody.insertRow(i);
		                 let cel1 = row.insertCell(0);
		                 let cel2 = row.insertCell(1);

		                 cel1.innerHTML = parsed[i]['ID'];
		                 cel2.innerHTML = parsed[i]['Nombre'] + parsed[i]['Apellidos'];  
		            }

		            fetch("fetchListDistribuidor");
	            }
            }
        })
        .done(function() {
        	$('#loadingHeader').css('display','none');
            $('#btnAddDistribuidorKit').css('display','');
            $('#loadingAddDistribuidorKit').css('display','none');
            $('#btnAddProductoKit').css('display','');
            $('#loadingAddProductoKit').css('display','none');
            $('#btnAddSucursalKit').css('display','');
            $('#loadingAddSucursalKit').css('display','none');
            $('#btnCerrarAddKit').css('display','');
            $('#loadingCerrarAddKit').css('display','none');
            $('#btnAddPromocionKit').css('display','');
            $('#loadingAddPromocionKit').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnAddDistribuidorKit').css('display','');
            $('#loadingAddDistribuidorKit').css('display','none');
            $('#btnAddProductoKit').css('display','');
            $('#loadingAddProductoKit').css('display','none');
            $('#btnAddSucursalKit').css('display','');
            $('#loadingAddSucursalKit').css('display','none');
            $('#btnCerrarAddKit').css('display','');
            $('#loadingCerrarAddKit').css('display','none');
            $('#btnAddPromocionKit').css('display','');
            $('#loadingAddPromocionKit').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
    });

    // Acción click fetchListDistribuidor //
    document.getElementById("fetchListDistribuidor").onclick = function(e)
    {
        FETCHLISTDISTRIBUIDOR = e.target.parentNode;
    }

    // Excluir Distribuidor Kit //
    $("#btnAddListDistribuidor").click(function(event) {
    	
    	if (FETCHLISTDISTRIBUIDOR != null){

    		let table = document.getElementById("fetchDistribuidorKit"); 
			let tbody = table.tBodies[0];
    		let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
			    if (FETCHLISTDISTRIBUIDOR.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
				    Contador ++;
			    }
		    }

			if (Contador > 0){
			    toastr.error('El distribuidor ya se encuentra agregado', 'Error');
			}
			else{

			    for (var i = 0; i <= 0; i++){

				    let row  = tbody.insertRow(i);
			        let cel1 = row.insertCell(0);
			        let cel2 = row.insertCell(1);
			        let cel3 = row.insertCell(2);

			        cel1.innerHTML = FETCHLISTDISTRIBUIDOR.childNodes[0].innerHTML;
					cel2.innerHTML = FETCHLISTDISTRIBUIDOR.childNodes[1].innerHTML;

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteDistribuidorKit);
				    cel3.appendChild(boton);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono1);

			        toastr.success('Distribuidor agregado con exito', 'Correcto');
				}
			}
    	}
    	else{
	        toastr.warning('Seleccione a un distribuidor', 'Advertencia');
    	}
    });

    // Agregar Producto Kit //
    $("#btnAddProductoKit").click(function(event) {

        $.ajax({
            url: window.dir + 'index.php/Controller_Productos/getProductos',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnAddDistribuidorKit').css('display','none');
                $('#loadingAddDistribuidorKit').css('display','');
                $('#btnAddProductoKit').css('display','none');
                $('#loadingAddProductoKit').css('display','');
                $('#btnAddSucursalKit').css('display','none');
                $('#loadingAddSucursalKit').css('display','');
                $('#btnCerrarAddKit').css('display','none');
                $('#loadingCerrarAddKit').css('display','');
                $('#btnAddPromocionKit').css('display','none');
                $('#loadingAddPromocionKit').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalProductoKit").modal("show");

	            if (parsed != null && parsed != ""){

            		let table   = document.getElementById("fetchListProductos"); 
            		let tbody   = table.tBodies[0];

            		$('#fetchListProductos').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++){

	                 let row  = tbody.insertRow(i);
	                 let cel1 = row.insertCell(0);
	                 let cel2 = row.insertCell(1);
	                 let cel3 = row.insertCell(2);

	                 cel1.innerHTML = parsed[i]['ID'];
	                 cel2.innerHTML = parsed[i]['Codigo'];
	                 cel3.innerHTML = parsed[i]['Producto'];
	                
	                }

	                fetch("fetchListProductos");
	            }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnAddDistribuidorKit').css('display','');
            $('#loadingAddDistribuidorKit').css('display','none');
            $('#btnAddProductoKit').css('display','');
            $('#loadingAddProductoKit').css('display','none');
            $('#btnAddSucursalKit').css('display','');
            $('#loadingAddSucursalKit').css('display','none');
            $('#btnCerrarAddKit').css('display','');
            $('#loadingCerrarAddKit').css('display','none');
            $('#btnAddPromocionKit').css('display','');
            $('#loadingAddPromocionKit').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnAddDistribuidorKit').css('display','');
            $('#loadingAddDistribuidorKit').css('display','none');
            $('#btnAddProductoKit').css('display','');
            $('#loadingAddProductoKit').css('display','none');
            $('#btnAddSucursalKit').css('display','');
            $('#loadingAddSucursalKit').css('display','none');
            $('#btnCerrarAddKit').css('display','');
            $('#loadingCerrarAddKit').css('display','none');
            $('#btnAddPromocionKit').css('display','');
            $('#loadingAddPromocionKit').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
    });

    // Acción click fetchListProductos //
    document.getElementById("fetchListProductos").onclick = function(e)
    {
        FETCHLISTPRODUCTO = e.target.parentNode;
    }

    // Boton Agregar Producto //
    $("#btnAddListProducto").click(function(event) {
    	
    	if (FETCHLISTPRODUCTO != null){

    		let table = document.getElementById("fetchProductosKit"); 
			let tbody = table.tBodies[0];

    		let tableSucursal = document.getElementById("fetchSucursalKit");
    		let tbodySucursal = tableSucursal.getElementsByTagName("tbody")[0];

    		let Contador = 0;

    		if (tbodySucursal.rows.length > 0){
    			for (var i = 0; i < tbodySucursal.rows.length ; i++){		      
				    tbodySucursal.rows[i].cells[5].innerHTML = 0;
			    }
    		}

			for (var i = 0; i < tbody.rows.length ; i++){		      
			    if (FETCHLISTPRODUCTO.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
		            Contador ++;
				}
		    }

			if (Contador > 0){
				toastr.error('El producto ya se encuentra agregado', 'Error');
			}
			else{

				for (var i = 0; i <= 0; i++){

			        let row  = tbody.insertRow(i);
		            let cel1 = row.insertCell(0);
		            let cel2 = row.insertCell(1);
		            let cel3 = row.insertCell(2);
		            let cel4 = row.insertCell(3);

				    cel1.innerHTML = FETCHLISTPRODUCTO.childNodes[0].innerHTML;
					cel2.innerHTML = FETCHLISTPRODUCTO.childNodes[2].innerHTML;

					let input = document.createElement("input");
				    input.classList.add('form-control');
				    input.setAttribute('type', 'number');
				    input.setAttribute('min', '1');
				    input.setAttribute('value', '1');
				    input.addEventListener("keypress",calcularAhorro);
				    cel3.appendChild(input);

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteProductoKit);
				    cel4.appendChild(boton);

				    let icono = document.createElement("span");
				    icono.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono);
				    
				    toastr.success('Producto agregado con exito', 'Correcto');
				}
			}	
    	}
    	else{
	        toastr.warning('Seleccione un producto', 'Advertencia');
    	}
    });

    // Boton Agregar Sucursal //
    $("#btnAddSucursalKit").click(function(event) {
	
        $.ajax({
            url: window.dir + 'index.php/Controller_Bodega/getBodega',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnAddDistribuidorKit').css('display','none');
                $('#loadingAddDistribuidorKit').css('display','');
                $('#btnAddProductoKit').css('display','none');
                $('#loadingAddProductoKit').css('display','');
                $('#btnAddSucursalKit').css('display','none');
                $('#loadingAddSucursalKit').css('display','');
                $('#btnCerrarAddKit').css('display','none');
                $('#loadingCerrarAddKit').css('display','');
                $('#btnAddPromocionKit').css('display','none');
                $('#loadingAddPromocionKit').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalSucursalKit").modal("show");

	            if (parsed != null && parsed != ""){
            		let table = document.getElementById("fetchListSucursales"); 
            		let tbody = table.tBodies[0];

            		$('#fetchListSucursales').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++){

	                	let row  = tbody.insertRow(i);
	                	let cel1 = row.insertCell(0);
	                	let cel2 = row.insertCell(1);

	                	cel1.innerHTML = parsed[i]['ID'];
	                	cel2.innerHTML = parsed[i]['Sucursal'];
	                
	                }

	                fetch("fetchListSucursales");
	            }
            }
        })
        .done(function() {
        	$('#loadingHeader').css('display','none');
            $('#btnAddDistribuidorKit').css('display','');
            $('#loadingAddDistribuidorKit').css('display','none');
            $('#btnAddProductoKit').css('display','');
            $('#loadingAddProductoKit').css('display','none');
            $('#btnAddSucursalKit').css('display','');
            $('#loadingAddSucursalKit').css('display','none');
            $('#btnCerrarAddKit').css('display','');
            $('#loadingCerrarAddKit').css('display','none');
            $('#btnAddPromocionKit').css('display','');
            $('#loadingAddPromocionKit').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnAddDistribuidorKit').css('display','');
            $('#loadingAddDistribuidorKit').css('display','none');
            $('#btnAddProductoKit').css('display','');
            $('#loadingAddProductoKit').css('display','none');
            $('#btnAddSucursalKit').css('display','');
            $('#loadingAddSucursalKit').css('display','none');
            $('#btnCerrarAddKit').css('display','');
            $('#loadingCerrarAddKit').css('display','none');
            $('#btnAddPromocionKit').css('display','');
            $('#loadingAddPromocionKit').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});

	// Acción click fetchListSucursales //
    document.getElementById("fetchListSucursales").onclick = function(e)
    {
        FETCHLISTSUCURSALES = e.target.parentNode;
    }

	// Agregar Sucursal a la Promoción //
	$("#btnAddListSucursales").click(function(event) {

		if (FETCHLISTSUCURSALES != null){

    		let table = document.getElementById("fetchSucursalKit"); 
			let tbody = table.tBodies[0];
    		let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
				if (FETCHLISTSUCURSALES.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
					Contador ++;
				}
			}

			if (Contador > 0){
				toastr.error('La sucursal ya se encuentra agregado', 'Error');
			}
			else{
				      	
				for (var i = 0; i <= 0; i++){
			       	let row  = tbody.insertRow(i);
		           	let cel1 = row.insertCell(0);
		           	let cel2 = row.insertCell(1);
		           	let cel3 = row.insertCell(2);
		           	let cel4 = row.insertCell(3);
		           	let cel5 = row.insertCell(4);
		           	let cel6 = row.insertCell(5);

		           	cel1.innerHTML = FETCHLISTSUCURSALES.childNodes[0].innerHTML;
				   	cel2.innerHTML = FETCHLISTSUCURSALES.childNodes[1].innerHTML;

			    	let input = document.createElement("input");
			    	input.classList.add('form-control');
			    	input.setAttribute('type', 'number');
			    	input.setAttribute('min', '1');
			    	input.setAttribute('value', '1');
			    	input.addEventListener("keypress",keyPressFuntion);
			    	cel3.appendChild(input);

				    let input2 = document.createElement("input");
				    input2.classList.add('form-control');
				    input2.setAttribute('type', 'number');
				    input2.setAttribute('min', '1');
				    input2.setAttribute('value', '1');
				    input2.setAttribute('readonly','readonly');
				    cel4.appendChild(input2);

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger');
				    boton1.setAttribute('style', 'margin-right: 5px');
				    boton1.addEventListener("click",deleteSucursalKit);
				    cel5.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

				    let boton2 = document.createElement("button");
				    boton2.classList.add('btn', 'btn-default');
				    boton2.addEventListener("click",calcularAhorroSucursal);
				    cel5.appendChild(boton2);

				    let icono2 = document.createElement("span");
				    icono2.classList.add('glyphicon', 'glyphicon-refresh');
				    boton2.appendChild(icono2);

				    cel6.innerHTML = 0;
				    cel6.setAttribute("hidden", true);

				    toastr.success('Producto agregado con exito', 'Correcto');
				}
			}
    	}
    	else
    	{
	        toastr.warning('Seleccione un producto', 'Advertencia');
    	}
	});

  	// Acción Boton Agregar Promoción //
  	$("#btnAgregarPromo").click(function(event) {
  		$("#modalAgregarPromocion").modal("show");
  	});

  	// Acción Guardar Promoción //
  	$("#btnAddPromocionKit").click(function(event) {
    	
    	let Nombre   = $("#txtNombre_Kit").val();
    	let Inicial  = $("#Vigencia_Inicial_Kit").val();
    	let Final    = $("#Vigencia_Final_Kit").val();
    	let Division = $("#select_Division_Kit").val();
    	let Linea    = $("#select_Linea_Kit").val();
    	let Sublinea = $("#select_Sublinea_Kit").val();
    	let Bandera  = 0;
		let Black    = 0;
    	let Contador = 0;

    	array_Producto = new Array();
	    array_Clientes = new Array();
	    array_Sucursal = new Array();
	    array_Cantidad = new Array();
	    array_Precio   = new Array();
	    array_Ahorro   = new Array();

    	let Tabla_Clientes = document.getElementById("fetchDistribuidorKit");
    	let Tbody_Clientes = Tabla_Clientes.getElementsByTagName("tbody")[0];

    	let Tabla_Producto = document.getElementById("fetchProductosKit");
    	let Tbody_Producto = Tabla_Producto.getElementsByTagName("tbody")[0];

    	let Tabla_Sucursal = document.getElementById("fetchSucursalKit");
    	let Tbody_Sucursal = Tabla_Sucursal.getElementsByTagName("tbody")[0];

    	if (Nombre != null && Nombre != "" && Inicial != null && Inicial != "" && Final != null && Final != ""){

    		if (Tbody_Producto.rows.length > 0 && Tbody_Sucursal.rows.length > 0){
    			for (var i = 0; i < Tbody_Producto.rows.length ; i++){		      
				    array_Producto.push(Tbody_Producto.rows[i].cells[0].innerHTML);
				    array_Cantidad.push(Tbody_Producto.rows[i].cells[2].childNodes[0].value);
			    }

			    for (var i = 0; i < Tbody_Clientes.rows.length ; i++){		      
				    array_Clientes.push(Tbody_Clientes.rows[i].cells[0].innerHTML);
			    }

			    for (var i = 0; i < Tbody_Sucursal.rows.length ; i++){		      
				    array_Sucursal.push(Tbody_Sucursal.rows[i].cells[0].innerHTML);
				    array_Precio.push(Tbody_Sucursal.rows[i].cells[2].childNodes[0].value);
				    array_Ahorro.push(Tbody_Sucursal.rows[i].cells[3].childNodes[0].value);

				    console.log(Tbody_Sucursal.rows[i].cells[5].innerHTML);
				    console.log(Tbody_Sucursal.rows[i].cells[5].innerHTML == 0);

				    if (Tbody_Sucursal.rows[i].cells[5].innerHTML == 0){
				    	Contador = 1;
				    }
				    else{
				    	Contador = 0;
				    }
			    }

			    if ($('#checkExcluirDistri').prop('checked')){
				    Bandera = 1;
				}
				else{
					Bandera = 0;
				}

				if ($('#checkSalonBlack').prop('checked')){
				    Black = 1;
				}
				else{
					Black = 0;
				}

				if (Contador == 0){

				    let formData = new FormData();
		            formData.append("Nombre", Nombre);
		            formData.append("Vigencia_Inicial", Inicial);
		            formData.append("Vigencia_Final", Final);
		            formData.append("Division", Division);
		            formData.append("Linea", Linea);
		            formData.append("Sublinea", Sublinea);
		            formData.append("Distribuidor", array_Clientes);
		            formData.append("Producto", array_Producto);
		            formData.append("Sucursal", array_Sucursal);
		            formData.append("Excluir", Bandera);
		            formData.append("Cantidad", array_Cantidad);
		            formData.append("Precio", array_Precio);
		            formData.append("Ahorro", array_Ahorro);
					formData.append("Salon_black", Black);

		            $.ajax({
		                url: window.dir + 'index.php/Controller_Promociones/addPromocion',
		                type: 'POST',
		                processData: false,
		                contentType: false,
		                timeout: 800000,
		                data: formData,
		                beforeSend : function ()
		                {
		                    $('#loadingHeader').css('display','');
			                $('#btnAddDistribuidorKit').css('display','none');
			                $('#loadingAddDistribuidorKit').css('display','');
			                $('#btnAddProductoKit').css('display','none');
			                $('#loadingAddProductoKit').css('display','');
			                $('#btnAddSucursalKit').css('display','none');
			                $('#loadingAddSucursalKit').css('display','');
			                $('#btnCerrarAddKit').css('display','none');
			                $('#loadingCerrarAddKit').css('display','');
			                $('#btnAddPromocionKit').css('display','none');
			                $('#loadingAddPromocionKit').css('display','');
		                },
		                success: function(data)
		                {
		                    console.log(data);

		                    switch(parseInt(data.trim())){

                                case 0:
                                    toastr.error('Ocurrio un error al agregar la promoción', 'Error');
                                break;

                                case 1:
                                    Limpiar(0);
                                    toastr.success('Promoción agregada con exito', 'Correcto');
                                break;

                                default:
                                    toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                            }
		                }
		           })
		           .done(function() {
		           		$('#loadingHeader').css('display','none');
			            $('#btnAddDistribuidorKit').css('display','');
			            $('#loadingAddDistribuidorKit').css('display','none');
			            $('#btnAddProductoKit').css('display','');
			            $('#loadingAddProductoKit').css('display','none');
			            $('#btnAddSucursalKit').css('display','');
			            $('#loadingAddSucursalKit').css('display','none');
			            $('#btnCerrarAddKit').css('display','');
			            $('#loadingCerrarAddKit').css('display','none');
			            $('#btnAddPromocionKit').css('display','');
			            $('#loadingAddPromocionKit').css('display','none');
		           })
		           .fail(function() {
		                $('#loadingHeader').css('display','none');
			            $('#btnAddDistribuidorKit').css('display','');
			            $('#loadingAddDistribuidorKit').css('display','none');
			            $('#btnAddProductoKit').css('display','');
			            $('#loadingAddProductoKit').css('display','none');
			            $('#btnAddSucursalKit').css('display','');
			            $('#loadingAddSucursalKit').css('display','none');
			            $('#btnCerrarAddKit').css('display','');
			            $('#loadingCerrarAddKit').css('display','none');
			            $('#btnAddPromocionKit').css('display','');
			            $('#loadingAddPromocionKit').css('display','none');
			            $("#modalErrorConexion").modal("show");
		           })
		           .always(function() {
		           });
			    }
			    else{
			    	toastr.warning('Para continuar es necesario recalcular el ahorro de las sucursales', 'Advertencia');
			    }
    		}
    		else{
		        toastr.warning('Por lo menos debe de agregar a productos y sucursal', 'Advertencia');
    		}
    	}
    	else{
	        toastr.warning('Algúnos campos obligatorios estan vacios', 'Advertencia');
    	}
    });


	////////////////////////////////
	////// Editar Promociones //////
	///////////////////////////////

	$("#btnEditarPromo").click(function(event) {

		if (FETCHPROMOCIONES != null){

			let formData = new FormData();
            formData.append("idPromocion", FETCHPROMOCIONES.childNodes[0].innerHTML);

            $.ajax({
                url: window.dir + 'index.php/Controller_Promociones/getInfoPromocionById',
                type: 'POST',
                processData: false,
                contentType: false,
                timeout: 800000,
                data: formData,
                beforeSend : function ()
                {
                    $('#loadingHeader').css('display','');
		            $('#btnAgregarPromo').css('display','none');
		            $('#loadingAgregarPromo').css('display','');
		            $('#btnEditarPromo').css('display','none');
		            $('#loadingEditarPromo').css('display','');
		            $('#btnEliminarPromo').css('display','none');
		            $('#loadingEliminarPromo').css('display','');
                    $('#btnDuplicarPromo').css('display','none');
                    $('#loadingDuplicarPromo').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);
                    console.log(parsed);

		            if (parsed != null && parsed != ""){

		            	let Producto        	= document.getElementById("fetchProductosKitEditar"); 
						let tbody_Producto  	= Producto.tBodies[0];

						let Distribuidor        = document.getElementById("fetchDistribuidorKitEditar"); 
						let tbody_Distribuidor  = Distribuidor.tBodies[0];

						let Sucursales        	= document.getElementById("fetchSucursalKitEditar"); 
						let tbody_Sucursales  	= Sucursales.tBodies[0];

						$("#fetchDistribuidorKitEditar").DataTable().destroy();
					    Distribuidor.tBodies[0].innerHTML = "";

					    $("#fetchProductosKitEditar").DataTable().destroy();
					    Producto.tBodies[0].innerHTML = "";

					    $("#fetchSucursalKitEditar").DataTable().destroy();
					    Sucursales.tBodies[0].innerHTML = "";

                		$("#txtNombre_Kit_Editar").val(parsed['Detalle'][0]['Promocion']);
                		$("#Vigencia_Inicial_Kit_Editar").val(parsed['Detalle'][0]['Vigencia_inicial']);
                		$("#Vigencia_Final_Kit_Editar").val(parsed['Detalle'][0]['Vigencia_final']);
                		$("#select_Division_Kit_Editar").val(parsed['Detalle'][0]['idDivision']);
                		$("#select_Linea_Kit_Editar").val(parsed['Detalle'][0]['idLinea']);
                		$("#select_Sublinea_Kit_Editar").val(parsed['Detalle'][0]['idSublinea']);

                		if (parsed['Detalle'][0]['Status'] == 'Inactivo'){
                			$("#check_Status_Kit_Editar").prop('checked', true);
                		}
                		else{
                			$("#check_Status_Kit_Editar").prop('checked', false);
                		}

                		if (parsed['Detalle'][0]['Excluir_Distribuidores'] == 1){
                			$("#checkExcluirDistriEditar").prop('checked', true);
                			$("#divExcluirDistriEditar").css('display', '');
                		}
                		else{
                			$("#checkExcluirDistriEditar").prop('checked', false);
                			$("#divExcluirDistriEditar").css('display','none');
                		}

						if (parsed['Detalle'][0]['Salon_black'] == 1){
                			$("#checkSalonBlackEditar").prop('checked', true);
                		}
                		else{
                			$("#checkSalonBlackEditar").prop('checked', false);
                		}

                		// Cargar Tabla  fetchProductosKitEditar //
                		for (var i = 0; i < parsed['Producto'].length; i++){
					        let row  = tbody_Producto.insertRow(i);
				            let cel1 = row.insertCell(0);
				            let cel2 = row.insertCell(1);
				            let cel3 = row.insertCell(2);
				            let cel4 = row.insertCell(3);

				            cel1.innerHTML = parsed['Producto'][i]['ID_Catalogo'];
						    cel2.innerHTML = parsed['Producto'][i]['Producto'];

						    let input2 = document.createElement("input");
						    input2.classList.add('form-control');
						    input2.setAttribute('type', 'number');
						    input2.setAttribute('min', '1');
						    input2.setAttribute('value', parsed['Producto'][i]['Cantidad']);
                            input2.setAttribute('readonly', 'readonly');
						    input2.addEventListener("keypress",calcularAhorroSucursalEditar2);
						    cel3.appendChild(input2);

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger');
						    boton1.addEventListener("click",deleteProductoKitEditar);
                            boton1.setAttribute('disabled', 'disabled');
						    cel4.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);
						}

						// Cargar Tabla fetchSucursalKitEditar //
						for (var i = 0; i < parsed['Sucursal'].length; i++){
					        let row  = tbody_Sucursales.insertRow(i);
				            let cel1 = row.insertCell(0);
				            let cel2 = row.insertCell(1);
				            let cel3 = row.insertCell(2);
				            let cel4 = row.insertCell(3);
				            let cel5 = row.insertCell(4);
				            let cel6 = row.insertCell(5);

				            cel1.innerHTML = parsed['Sucursal'][i]['ID_Sucursal'];
						    cel2.innerHTML = parsed['Sucursal'][i]['Sucursal'];

						    let input = document.createElement("input");
						    input.classList.add('form-control');
						    input.setAttribute('type', 'number');
						    input.setAttribute('min', '1');
						    input.setAttribute('value', parsed['Sucursal'][i]['precio']);
						    input.addEventListener("keypress",calcularAhorroSucursalEditar);
                            input.setAttribute('readonly', 'readonly');
						    cel3.appendChild(input);

						    let input2 = document.createElement("input");
						    input2.classList.add('form-control');
						    input2.setAttribute('type', 'number');
						    input2.setAttribute('min', '1');
						    input2.setAttribute('value', parsed['Sucursal'][i]['ahorro']);
						    input2.setAttribute('readonly', 'readonly');
						    cel4.appendChild(input2);

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger');
						    boton1.setAttribute('style', 'margin-right: 5px');
						    boton1.addEventListener("click",deleteSucursalKitEditar);
                            boton1.setAttribute('disabled', 'disabled');
						    cel5.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

						    let boton2 = document.createElement("button");
						    boton2.classList.add('btn', 'btn-default');
						    boton2.addEventListener("click",calcularAhorroSucursalEditar);
						    cel5.appendChild(boton2);

						    let icono2 = document.createElement("span");
						    icono2.classList.add('glyphicon', 'glyphicon-refresh');
						    boton2.appendChild(icono2);

						    cel6.innerHTML = 1;
							cel6.setAttribute("hidden", true);
						}

						if (parsed['Sucursal'].length > 0){

							// Cargar Tabla fetchDistribuidorKitEditar //
							for (var i = 0; i < parsed['Cliente'].length; i++){
						        let row  = tbody_Distribuidor.insertRow(i);
					            let cel1 = row.insertCell(0);
					            let cel2 = row.insertCell(1);
					            let cel3 = row.insertCell(2);

					            cel1.innerHTML = parsed['Cliente'][i]['ID_Cliente'];
							    cel2.innerHTML = parsed['Cliente'][i]['Cliente'];

							   	let boton1 = document.createElement("button");
							    boton1.classList.add('btn', 'btn-danger');
							    boton1.addEventListener("click",deleteDistribuidorKitEditar);
							    cel3.appendChild(boton1);

							    let icono1 = document.createElement("span");
							    icono1.classList.add('glyphicon', 'glyphicon-trash');
							    boton1.appendChild(icono1);
							}
						}

                        $("#btnUpdatePromocionKit").css('display', '');
                        $("#loadingUpdatePromocionKit").css('display', 'none');
                        $("#btnAddDuplicarPromo").css('display', 'none');
                        $("#loadingAddDuplicarPromo").css('display', 'none');
                        $("#header_modal_color").removeClass("bg-primary").addClass("bg-warning");
                        $("#tittle_modal_duplicar").text('Editar Promoción');
                        $("#btnUpdateProductoKit").attr('disabled', 'disabled');
                        $("#btnAddDuplicarPromo").attr('disabled', 'disabled');
                        $("#btnUpdatePromocionKit").removeAttr('disabled');

                		$("#modalEditarKit").modal("show");
		            }
                }
	            })
	            .done(function() {
	            	$('#loadingHeader').css('display','none');
		            $('#btnAgregarPromo').css('display','');
		            $('#loadingAgregarPromo').css('display','none');
		            $('#btnEditarPromo').css('display','');
		            $('#loadingEditarPromo').css('display','none');
		            $('#btnEliminarPromo').css('display','');
		            $('#loadingEliminarPromo').css('display','none');
                    $('#btnDuplicarPromo').css('display','');
                    $('#loadingDuplicarPromo').css('display','none');
	            })
	            .fail(function(jqXHR, textStatus, errorThrown) {
	            	$('#loadingHeader').css('display','none');
		            $('#btnAgregarPromo').css('display','');
		            $('#loadingAgregarPromo').css('display','none');
		            $('#btnEditarPromo').css('display','');
		            $('#loadingEditarPromo').css('display','none');
		            $('#btnEliminarPromo').css('display','');
		            $('#loadingEliminarPromo').css('display','none');
                    $('#btnDuplicarPromo').css('display','');
                    $('#loadingDuplicarPromo').css('display','none');

		            $("#modalErrorConexion").modal("show");
	        	})
	            .always(function() {
	            });
		}
		else{
		    toastr.warning('Seleccione una promoción', 'Advertencia');
		}
	});
























































































    //////////////////////////////////
    ////// Duplicar Promociones //////
    /////////////////////////////////

    $("#btnDuplicarPromo").click(function(event) {

        if (FETCHPROMOCIONES != null){

            let formData = new FormData();
            formData.append("idPromocion", FETCHPROMOCIONES.childNodes[0].innerHTML);

            $.ajax({
                url: window.dir + 'index.php/Controller_Promociones/getInfoPromocionById',
                type: 'POST',
                processData: false,
                contentType: false,
                timeout: 800000,
                data: formData,
                beforeSend : function ()
                {
                    $('#loadingHeader').css('display','');
                    $('#btnAgregarPromo').css('display','none');
                    $('#loadingAgregarPromo').css('display','');
                    $('#btnEditarPromo').css('display','none');
                    $('#loadingEditarPromo').css('display','');
                    $('#btnEliminarPromo').css('display','none');
                    $('#loadingEliminarPromo').css('display','');
                    $('#btnDuplicarPromo').css('display','none');
                    $('#loadingDuplicarPromo').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);
                    console.log(parsed);

                    if (parsed != null && parsed != ""){

                        let Producto            = document.getElementById("fetchProductosKitEditar"); 
                        let tbody_Producto      = Producto.tBodies[0];

                        let Distribuidor        = document.getElementById("fetchDistribuidorKitEditar"); 
                        let tbody_Distribuidor  = Distribuidor.tBodies[0];

                        let Sucursales          = document.getElementById("fetchSucursalKitEditar"); 
                        let tbody_Sucursales    = Sucursales.tBodies[0];

                        $("#fetchDistribuidorKitEditar").DataTable().destroy();
                        Distribuidor.tBodies[0].innerHTML = "";

                        $("#fetchProductosKitEditar").DataTable().destroy();
                        Producto.tBodies[0].innerHTML = "";

                        $("#fetchSucursalKitEditar").DataTable().destroy();
                        Sucursales.tBodies[0].innerHTML = "";

                        $("#txtNombre_Kit_Editar").val(parsed['Detalle'][0]['Promocion'] + '(2)');
                        $("#Vigencia_Inicial_Kit_Editar").val(parsed['Detalle'][0]['Vigencia_inicial']);
                        $("#Vigencia_Final_Kit_Editar").val(parsed['Detalle'][0]['Vigencia_final']);
                        $("#select_Division_Kit_Editar").val(parsed['Detalle'][0]['idDivision']);
                        $("#select_Linea_Kit_Editar").val(parsed['Detalle'][0]['idLinea']);
                        $("#select_Sublinea_Kit_Editar").val(parsed['Detalle'][0]['idSublinea']);

                        if (parsed['Detalle'][0]['Status'] == 'Inactivo'){
                            $("#check_Status_Kit_Editar").prop('checked', true);
                        }
                        else{
                            $("#check_Status_Kit_Editar").prop('checked', false);
                        }

                        if (parsed['Detalle'][0]['Excluir_Distribuidores'] == 1){
                            $("#checkExcluirDistriEditar").prop('checked', true);
                            $("#divExcluirDistriEditar").css('display', '');
                        }
                        else{
                            $("#checkExcluirDistriEditar").prop('checked', false);
                            $("#divExcluirDistriEditar").css('display','none');
                        }

						if (parsed['Detalle'][0]['Salon_black'] == 1){
                            $("#checkSalonBlackEditar").prop('checked', true);
                        }
                        else{
                            $("#checkSalonBlackEditar").prop('checked', false);
                        }

						

                        // Cargar Tabla  fetchProductosKitEditar //
                        for (var i = 0; i < parsed['Producto'].length; i++){
                            let row  = tbody_Producto.insertRow(i);
                            let cel1 = row.insertCell(0);
                            let cel2 = row.insertCell(1);
                            let cel3 = row.insertCell(2);
                            let cel4 = row.insertCell(3);

                            cel1.innerHTML = parsed['Producto'][i]['ID_Catalogo'];
                            cel2.innerHTML = parsed['Producto'][i]['Producto'];

                            let input2 = document.createElement("input");
                            input2.classList.add('form-control');
                            input2.setAttribute('type', 'number');
                            input2.setAttribute('min', '1');
                            input2.setAttribute('value', parsed['Producto'][i]['Cantidad']);
                            input2.addEventListener("keypress",calcularAhorroSucursalEditar2);
                            cel3.appendChild(input2);

                            let boton1 = document.createElement("button");
                            boton1.classList.add('btn', 'btn-danger');
                            boton1.addEventListener("click",deleteProductoKitEditar);
                            cel4.appendChild(boton1);

                            let icono1 = document.createElement("span");
                            icono1.classList.add('glyphicon', 'glyphicon-trash');
                            boton1.appendChild(icono1);
                        }

                        // Cargar Tabla fetchSucursalKitEditar //
                        for (var i = 0; i < parsed['Sucursal'].length; i++){
                            let row  = tbody_Sucursales.insertRow(i);
                            let cel1 = row.insertCell(0);
                            let cel2 = row.insertCell(1);
                            let cel3 = row.insertCell(2);
                            let cel4 = row.insertCell(3);
                            let cel5 = row.insertCell(4);
                            let cel6 = row.insertCell(5);

                            cel1.innerHTML = parsed['Sucursal'][i]['ID_Sucursal'];
                            cel2.innerHTML = parsed['Sucursal'][i]['Sucursal'];

                            let input = document.createElement("input");
                            input.classList.add('form-control');
                            input.setAttribute('type', 'number');
                            input.setAttribute('min', '1');
                            input.setAttribute('value', parsed['Sucursal'][i]['precio']);
                            input.addEventListener("keypress",calcularAhorroSucursalEditar);
                            cel3.appendChild(input);

                            let input2 = document.createElement("input");
                            input2.classList.add('form-control');
                            input2.setAttribute('type', 'number');
                            input2.setAttribute('min', '1');
                            input2.setAttribute('value', parsed['Sucursal'][i]['ahorro']);
                            cel4.appendChild(input2);

                            let boton1 = document.createElement("button");
                            boton1.classList.add('btn', 'btn-danger');
                            boton1.setAttribute('style', 'margin-right: 5px');
                            boton1.addEventListener("click",deleteSucursalKitEditar);
                            cel5.appendChild(boton1);

                            let icono1 = document.createElement("span");
                            icono1.classList.add('glyphicon', 'glyphicon-trash');
                            boton1.appendChild(icono1);

                            let boton2 = document.createElement("button");
                            boton2.classList.add('btn', 'btn-default');
                            boton2.addEventListener("click",calcularAhorroSucursalEditar);
                            cel5.appendChild(boton2);

                            let icono2 = document.createElement("span");
                            icono2.classList.add('glyphicon', 'glyphicon-refresh');
                            boton2.appendChild(icono2);

                            cel6.innerHTML = 1;
                            cel6.setAttribute("hidden", true);
                        }

                        if (parsed['Sucursal'].length > 0){

                            // Cargar Tabla fetchDistribuidorKitEditar //
                            for (var i = 0; i < parsed['Cliente'].length; i++){
                                let row  = tbody_Distribuidor.insertRow(i);
                                let cel1 = row.insertCell(0);
                                let cel2 = row.insertCell(1);
                                let cel3 = row.insertCell(2);

                                cel1.innerHTML = parsed['Cliente'][i]['ID_Cliente'];
                                cel2.innerHTML = parsed['Cliente'][i]['Cliente'];

                                let boton1 = document.createElement("button");
                                boton1.classList.add('btn', 'btn-danger');
                                boton1.addEventListener("click",deleteDistribuidorKitEditar);
                                cel3.appendChild(boton1);

                                let icono1 = document.createElement("span");
                                icono1.classList.add('glyphicon', 'glyphicon-trash');
                                boton1.appendChild(icono1);
                            }
                        }

                        $("#btnUpdatePromocionKit").css('display', 'none');
                        $("#loadingUpdatePromocionKit").css('display', 'none');
                        $("#btnAddDuplicarPromo").css('display', '');
                        $("#loadingAddDuplicarPromo").css('display', 'none');
                        $("#header_modal_color").removeClass("bg-warning").addClass("bg-primary");
                        $("#tittle_modal_duplicar").text('Duplicar Promoción');
                        $("#btnUpdateProductoKit").removeAttr('disabled');
                        $("#btnUpdatePromocionKit").attr('disabled', 'disabled');
                        $("#btnAddDuplicarPromo").removeAttr('disabled');

                        $("#modalEditarKit").modal("show");
                    }
                }
                })
                .done(function() {
                    $('#loadingHeader').css('display','none');
                    $('#btnAgregarPromo').css('display','');
                    $('#loadingAgregarPromo').css('display','none');
                    $('#btnEditarPromo').css('display','');
                    $('#loadingEditarPromo').css('display','none');
                    $('#btnEliminarPromo').css('display','');
                    $('#loadingEliminarPromo').css('display','none');
                    $('#btnDuplicarPromo').css('display','');
                    $('#loadingDuplicarPromo').css('display','none');
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    $('#loadingHeader').css('display','none');
                    $('#btnAgregarPromo').css('display','');
                    $('#loadingAgregarPromo').css('display','none');
                    $('#btnEditarPromo').css('display','');
                    $('#loadingEditarPromo').css('display','none');
                    $('#btnEliminarPromo').css('display','');
                    $('#loadingEliminarPromo').css('display','none');
                    $('#btnDuplicarPromo').css('display','');
                    $('#loadingDuplicarPromo').css('display','none');

                    $("#modalErrorConexion").modal("show");
                })
                .always(function() {
                });
        }
        else{
            toastr.warning('Seleccione una promoción', 'Advertencia');
        }
    });

	// Acción click fetchListSucursalesEditar //
    document.getElementById("fetchListSucursalesEditar").onclick = function(e)
    {
        FETCHLISTSUCURSALESEDITAR = e.target.parentNode;
    }

	// Agregar Sucursal a la Promoción //
	$("#btnUpdateListSucursales").click(function(event) {

		if (FETCHLISTSUCURSALESEDITAR != null){

    		let table = document.getElementById("fetchSucursalKitEditar"); 
			let tbody = table.tBodies[0];
    		let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
				if (FETCHLISTSUCURSALESEDITAR.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
					Contador ++;
				}
			}

			if (Contador > 0){
				toastr.error('La sucursal ya se encuentra agregado', 'Error');
			}
			else{
				      	
				for (var i = 0; i <= 0; i++){
			       	let row  = tbody.insertRow(i);
		           	let cel1 = row.insertCell(0);
		           	let cel2 = row.insertCell(1);
		           	let cel3 = row.insertCell(2);
		           	let cel4 = row.insertCell(3);
		           	let cel5 = row.insertCell(4);
		           	let cel6 = row.insertCell(5);

		           	cel1.innerHTML = FETCHLISTSUCURSALESEDITAR.childNodes[0].innerHTML;
				   	cel2.innerHTML = FETCHLISTSUCURSALESEDITAR.childNodes[1].innerHTML;

			    	let input = document.createElement("input");
			    	input.classList.add('form-control');
			    	input.setAttribute('type', 'number');
			    	input.setAttribute('min', '1');
			    	input.setAttribute('value', '1');
			    	input.addEventListener("keypress",keyPressFuntion);
			    	cel3.appendChild(input);

				    let input2 = document.createElement("input");
				    input2.classList.add('form-control');
				    input2.setAttribute('type', 'number');
				    input2.setAttribute('min', '1');
				    input2.setAttribute('value', '1');
				    input2.setAttribute('readonly','readonly');
				    cel4.appendChild(input2);

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger');
				    boton1.setAttribute('style', 'margin-right: 5px');
				    boton1.addEventListener("click",deleteSucursalKitEditar);
				    cel5.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

				    let boton2 = document.createElement("button");
				    boton2.classList.add('btn', 'btn-default');
				    boton2.addEventListener("click",calcularAhorroSucursalEditar);
				    cel5.appendChild(boton2);

				    let icono2 = document.createElement("span");
				    icono2.classList.add('glyphicon', 'glyphicon-refresh');
				    boton2.appendChild(icono2);

				    cel6.innerHTML = 0;
				    cel6.setAttribute("hidden", true);

				    toastr.success('Producto agregado con exito', 'Correcto');
				}
			}
    	}
    	else
    	{
	        toastr.warning('Seleccione un producto', 'Advertencia');
    	}
	});

	// Checkbox Excluir Distribuidores Editar //
  	$("#checkExcluirDistriEditar").click(function(event) {
    	
    	if ($('#checkExcluirDistriEditar').prop('checked')){
		    $("#divExcluirDistriEditar").css('display','');
		}
		else{

			let table = document.getElementById("fetchDistribuidorKitEditar");
    		let tbody = table.getElementsByTagName("tbody")[0];

    		if (tbody.rows.length > 0){
    		 	swal({
					title: "¿Esta segúro?",
					text: "Se encuentran distribuidores agregados a la promoción si continúa todos los distribuidores agregados previamente seran eliminas de la tabla \n \n \n ¿Desea Continuar con el proceso?",
					icon: "warning",
					buttons: true,
					dangerMode: true,
				})
				.then((willDelete) => {
				  	if (willDelete) {
				    	tbody.innerHTML = "";
				    	$("#divExcluirDistriEditar").css('display','none');
				  	} 
				  	else{
				  		$("#checkExcluirDistriEditar").prop('checked', true);
				    	$("#divExcluirDistriEditar").css('display','');
				  	}
				});
    		}
    		else{
    		 	$("#divExcluirDistriEditar").css('display','none');
    		}
		}
    });

    // Acción Excluir Distribuidores Agregar Kit //
    $("#btnUpdateDistribuidorKit").click(function(event) {

        $.ajax({
            url: window.dir + 'index.php/Controller_Distribuidores/getDistribuidores',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnUpdateDistribuidorKit').css('display','none');
                $('#loadingUpdateDistribuidorKit').css('display','');
                $('#btnUpdateProductoKit').css('display','none');
                $('#loadingUpdateProductoKit').css('display','');
                $('#btnUpdateSucursalKit').css('display','none');
                $('#loadingUpdateSucursalKit').css('display','');
                $('#btnCerrarUpdateKit').css('display','none');
                $('#loadingCerrarUpdateKit').css('display','');
                $('#btnUpdatePromocionKit').css('display','none');
                $('#loadingUpdatePromocionKit').css('display','');
            },
            success: function(data)
            {	
                let parsed = JSON.parse(data);

                $("#modalDistribuidoresKitEditar").modal("show");

	            if (parsed != null && parsed != ""){
            		let table = document.getElementById("fetchListDistribuidorEditar"); 
            		let tbody = table.tBodies[0];

            		$('#fetchListDistribuidorEditar').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

            		for (var i = 0; i < parsed.length; i++){

		                 let row  = tbody.insertRow(i);
		                 let cel1 = row.insertCell(0);
		                 let cel2 = row.insertCell(1);

		                 cel1.innerHTML = parsed[i]['ID'];
		                 cel2.innerHTML = parsed[i]['Nombre'] + parsed[i]['Apellidos'];  
		            }

		            fetch("fetchListDistribuidorEditar");
	            }
            }
        })
        .done(function() {
        	$('#loadingHeader').css('display','none');
            $('#btnUpdateDistribuidorKit').css('display','');
            $('#loadingUpdateDistribuidorKit').css('display','none');
            $('#btnUpdateProductoKit').css('display','');
            $('#loadingUpdateProductoKit').css('display','none');
            $('#btnUpdateSucursalKit').css('display','');
            $('#loadingUpdateSucursalKit').css('display','none');
            $('#btnCerrarUpdateKit').css('display','');
            $('#loadingCerrarUpdateKit').css('display','none');
            $('#btnUpdatePromocionKit').css('display','');
            $('#loadingUpdatePromocionKit').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnUpdateDistribuidorKit').css('display','');
            $('#loadingUpdateDistribuidorKit').css('display','none');
            $('#btnUpdateProductoKit').css('display','');
            $('#loadingUpdateProductoKit').css('display','none');
            $('#btnUpdateSucursalKit').css('display','');
            $('#loadingUpdateSucursalKit').css('display','none');
            $('#btnCerrarUpdateKit').css('display','');
            $('#loadingCerrarUpdateKit').css('display','none');
            $('#btnUpdatePromocionKit').css('display','');
            $('#loadingUpdatePromocionKit').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
    });

    // Acción click fetchListDistribuidorEditar //
    document.getElementById("fetchListDistribuidorEditar").onclick = function(e)
    {
        FETCHLISTDISTRIBUIDOREDITAR = e.target.parentNode;
    }

    // Agregar Distribuidor Kit Editar //
    $("#btnUpdateListDistribuidor").click(function(event) {
    	
    	if (FETCHLISTDISTRIBUIDOREDITAR != null){

    		let table = document.getElementById("fetchDistribuidorKitEditar"); 
			let tbody = table.tBodies[0];
    		let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
			    if (FETCHLISTDISTRIBUIDOREDITAR.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
				    Contador ++;
			    }
		    }

			if (Contador > 0){
			    toastr.error('El distribuidor ya se encuentra agregado', 'Error');
			}
			else{

			    for (var i = 0; i <= 0; i++){

				    let row  = tbody.insertRow(i);
			        let cel1 = row.insertCell(0);
			        let cel2 = row.insertCell(1);
			        let cel3 = row.insertCell(2);

			        cel1.innerHTML = FETCHLISTDISTRIBUIDOREDITAR.childNodes[0].innerHTML;
					cel2.innerHTML = FETCHLISTDISTRIBUIDOREDITAR.childNodes[1].innerHTML;

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteDistribuidorKitEditar);
				    cel3.appendChild(boton);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono1);

			        toastr.success('Distribuidor agregado con exito', 'Correcto');
				}
			}
    	}
    	else{
	        toastr.warning('Seleccione a un distribuidor', 'Advertencia');
    	}
    });

    // Agregar Producto Kit Editar //
    $("#btnUpdateProductoKit").click(function(event) {

        $.ajax({
            url: window.dir + 'index.php/Controller_Productos/getProductos',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnUpdateDistribuidorKit').css('display','none');
                $('#loadingUpdateDistribuidorKit').css('display','');
                $('#btnUpdateProductoKit').css('display','none');
                $('#loadingUpdateProductoKit').css('display','');
                $('#btnUpdateSucursalKit').css('display','none');
                $('#loadingUpdateSucursalKit').css('display','');
                $('#btnCerrarUpdateKit').css('display','none');
                $('#loadingCerrarUpdateKit').css('display','');
                $('#btnUpdatePromocionKit').css('display','none');
                $('#loadingUpdatePromocionKit').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalProductoKitEditar").modal("show");

	            if (parsed != null && parsed != ""){

            		let table   = document.getElementById("fetchListProductosEditar"); 
            		let tbody   = table.tBodies[0];

            		$('#fetchListProductosEditar').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++){

	                 let row  = tbody.insertRow(i);
	                 let cel1 = row.insertCell(0);
	                 let cel2 = row.insertCell(1);
	                 let cel3 = row.insertCell(2);

	                 cel1.innerHTML = parsed[i]['ID'];
	                 cel2.innerHTML = parsed[i]['Codigo'];
	                 cel3.innerHTML = parsed[i]['Producto'];
	                
	                }

	                fetch("fetchListProductosEditar");
	            }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnUpdateDistribuidorKit').css('display','');
            $('#loadingUpdateDistribuidorKit').css('display','none');
            $('#btnUpdateProductoKit').css('display','');
            $('#loadingUpdateProductoKit').css('display','none');
            $('#btnUpdateSucursalKit').css('display','');
            $('#loadingUpdateSucursalKit').css('display','none');
            $('#btnCerrarUpdateKit').css('display','');
            $('#loadingCerrarUpdateKit').css('display','none');
            $('#btnUpdatePromocionKit').css('display','');
            $('#loadingUpdatePromocionKit').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnUpdateDistribuidorKit').css('display','');
            $('#loadingUpdateDistribuidorKit').css('display','none');
            $('#btnUpdateProductoKit').css('display','');
            $('#loadingUpdateProductoKit').css('display','none');
            $('#btnUpdateSucursalKit').css('display','');
            $('#loadingUpdateSucursalKit').css('display','none');
            $('#btnCerrarUpdateKit').css('display','');
            $('#loadingCerrarUpdateKit').css('display','none');
            $('#btnUpdatePromocionKit').css('display','');
            $('#loadingUpdatePromocionKit').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
    });


     // Acción click fetchListProductos //
    document.getElementById("fetchListProductosEditar").onclick = function(e)
    {
        FETCHLISTPRODUCTOEDITAR = e.target.parentNode;
    }

    // Boton Agregar Producto //
    $("#btnUpdateListProducto").click(function(event) {
    	
    	if (FETCHLISTPRODUCTOEDITAR != null){

    		let table = document.getElementById("fetchProductosKitEditar"); 
			let tbody = table.tBodies[0];

    		let tableSucursal = document.getElementById("fetchSucursalKitEditar");
    		let tbodySucursal = tableSucursal.getElementsByTagName("tbody")[0];

    		let Contador = 0;

    		if (tbodySucursal.rows.length > 0){
    			for (var i = 0; i < tbodySucursal.rows.length ; i++){		      
				    tbodySucursal.rows[i].cells[5].innerHTML = 0;
			    }
    		}

			for (var i = 0; i < tbody.rows.length ; i++){		      
			    if (FETCHLISTPRODUCTOEDITAR.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
		            Contador ++;
				}
		    }

			if (Contador > 0){
				toastr.error('El producto ya se encuentra agregado', 'Error');
			}
			else{

				for (var i = 0; i <= 0; i++){

			        let row  = tbody.insertRow(i);
		            let cel1 = row.insertCell(0);
		            let cel2 = row.insertCell(1);
		            let cel3 = row.insertCell(2);
		            let cel4 = row.insertCell(3);

				    cel1.innerHTML = FETCHLISTPRODUCTOEDITAR.childNodes[0].innerHTML;
					cel2.innerHTML = FETCHLISTPRODUCTOEDITAR.childNodes[2].innerHTML;

					let input = document.createElement("input");
				    input.classList.add('form-control');
				    input.setAttribute('type', 'number');
				    input.setAttribute('min', '1');
				    input.setAttribute('value', '1');
				    input.addEventListener("keypress",calcularAhorroEditar);
				    cel3.appendChild(input);

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteProductoKitEditar);
				    cel4.appendChild(boton);

				    let icono = document.createElement("span");
				    icono.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono);
				    
				    toastr.success('Producto agregado con exito', 'Correcto');
				}
			}	
    	}
    	else{
	        toastr.warning('Seleccione un producto', 'Advertencia');
    	}
    });

    // Boton Agregar Sucursal Editar //
    $("#btnUpdateSucursalKit").click(function(event) {
	
        $.ajax({
            url: window.dir + 'index.php/Controller_Bodega/getBodega',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnUpdateDistribuidorKit').css('display','none');
                $('#loadingUpdateDistribuidorKit').css('display','');
                $('#btnUpdateProductoKit').css('display','none');
                $('#loadingUpdateProductoKit').css('display','');
                $('#btnUpdateSucursalKit').css('display','none');
                $('#loadingUpdateSucursalKit').css('display','');
                $('#btnCerrarUpdateKit').css('display','none');
                $('#loadingCerrarUpdateKit').css('display','');
                $('#btnUpdatePromocionKit').css('display','none');
                $('#loadingUpdatePromocionKit').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalSucursalKitEditar").modal("show");

	            if (parsed != null && parsed != ""){
            		let table = document.getElementById("fetchListSucursalesEditar"); 
            		let tbody = table.tBodies[0];

            		$('#fetchListSucursalesEditar').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++){

	                	let row  = tbody.insertRow(i);
	                	let cel1 = row.insertCell(0);
	                	let cel2 = row.insertCell(1);

	                	cel1.innerHTML = parsed[i]['ID'];
	                	cel2.innerHTML = parsed[i]['Sucursal'];
	                
	                }

	                fetch("fetchListSucursalesEditar");
	            }
            }
        })
        .done(function() {
        	$('#loadingHeader').css('display','none');
            $('#btnUpdateDistribuidorKit').css('display','');
            $('#loadingUpdateDistribuidorKit').css('display','none');
            $('#btnUpdateProductoKit').css('display','');
            $('#loadingUpdateProductoKit').css('display','none');
            $('#btnUpdateSucursalKit').css('display','');
            $('#loadingUpdateSucursalKit').css('display','none');
            $('#btnCerrarUpdateKit').css('display','');
            $('#loadingCerrarUpdateKit').css('display','none');
            $('#btnUpdatePromocionKit').css('display','');
            $('#loadingUpdatePromocionKit').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnUpdateDistribuidorKit').css('display','');
            $('#loadingUpdateDistribuidorKit').css('display','none');
            $('#btnUpdateProductoKit').css('display','');
            $('#loadingUpdateProductoKit').css('display','none');
            $('#btnUpdateSucursalKit').css('display','');
            $('#loadingUpdateSucursalKit').css('display','none');
            $('#btnCerrarUpdateKit').css('display','');
            $('#loadingCerrarUpdateKit').css('display','none');
            $('#btnUpdatePromocionKit').css('display','');
            $('#loadingUpdatePromocionKit').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});

	// Acción click fetchListSucursales //
    document.getElementById("fetchListSucursalesEditar").onclick = function(e)
    {
        FETCHLISTSUCURSALESEDITAR = e.target.parentNode;
    }

    // Acción Guardar Cambios Promociones //
    $("#btnUpdatePromocionKit").click(function(event) {
    	
    	let Nombre   = $("#txtNombre_Kit_Editar").val();
    	let Inicial  = $("#Vigencia_Inicial_Kit_Editar").val();
    	let Final    = $("#Vigencia_Final_Kit_Editar").val();
    	let Division = $("#select_Division_Kit_Editar").val();
    	let Linea    = $("#select_Linea_Kit_Editar").val();
    	let Sublinea = $("#select_Sublinea_Kit_Editar").val();
    	let Bandera  = 0;
		let Black    = 0;
    	let Status   = "";
    	let Contador = 0;

    	array_Producto = new Array();
	    array_Clientes = new Array();
	    array_Sucursal = new Array();
	    array_Cantidad = new Array();
	    array_Precio   = new Array();
	    array_Ahorro   = new Array();

    	let Tabla_Clientes = document.getElementById("fetchDistribuidorKitEditar");
    	let Tbody_Clientes = Tabla_Clientes.getElementsByTagName("tbody")[0];

    	let Tabla_Producto = document.getElementById("fetchProductosKitEditar");
    	let Tbody_Producto = Tabla_Producto.getElementsByTagName("tbody")[0];

    	let Tabla_Sucursal = document.getElementById("fetchSucursalKitEditar");
    	let Tbody_Sucursal = Tabla_Sucursal.getElementsByTagName("tbody")[0];

    	if (Nombre != null && Nombre != "" && Inicial != null && Inicial != "" && Final != null && Final != ""){

    		if (Tbody_Producto.rows.length > 0 && Tbody_Sucursal.rows.length > 0){

    			for (var i = 0; i < Tbody_Producto.rows.length ; i++){		      
				    array_Producto.push(Tbody_Producto.rows[i].cells[0].innerHTML);
				    array_Cantidad.push(Tbody_Producto.rows[i].cells[2].childNodes[0].value);
			    }

			    for (var i = 0; i < Tbody_Clientes.rows.length ; i++){		      
				    array_Clientes.push(Tbody_Clientes.rows[i].cells[0].innerHTML);
			    }

			    for (var i = 0; i < Tbody_Sucursal.rows.length ; i++){		      
				    array_Sucursal.push(Tbody_Sucursal.rows[i].cells[0].innerHTML);
				    array_Precio.push(Tbody_Sucursal.rows[i].cells[2].childNodes[0].value);
				    array_Ahorro.push(Tbody_Sucursal.rows[i].cells[3].childNodes[0].value);

				    console.log(Tbody_Sucursal.rows[i].cells[5].innerHTML);
				    console.log(Tbody_Sucursal.rows[i].cells[5].innerHTML == 0);

				    if (Tbody_Sucursal.rows[i].cells[5].innerHTML == 0){
				    	Contador = 1;
				    }
				    else{
				    	Contador = 0;
				    }
			    }

			    if ($('#checkExcluirDistriEditar').prop('checked')){
				    Bandera = 1;
				}
				else{
					Bandera = 0;
				}

				if ($('#checkSalonBlackEditar').prop('checked')){
				    Black = 1;
				}
				else{
					Black = 0;
				}

				if ($('#check_Status_Kit_Editar').prop('checked')){
					Status = "Inactivo";
				}
				else{
					Status = "Activo";
				}

				if (Contador == 0){
					let formData = new FormData();
				    formData.append("ID", FETCHPROMOCIONES.childNodes[0].innerHTML);
		            formData.append("Nombre", Nombre);
		            formData.append("Vigencia_Inicial", Inicial);
		            formData.append("Vigencia_Final", Final);
		            formData.append("Division", Division);
		            formData.append("Linea", Linea);
		            formData.append("Sublinea", Sublinea);
		            formData.append("Distribuidor", array_Clientes);
		            formData.append("Producto", array_Producto);
		            formData.append("Sucursal", array_Sucursal);
		            formData.append("Excluir", Bandera);
		            formData.append("Cantidad", array_Cantidad);
		            formData.append("Precio", array_Precio);
		            formData.append("Ahorro", array_Ahorro);
		            formData.append("Status", Status);
					formData.append("Salon_black", Black);

		            $.ajax({
		               url: window.dir + 'index.php/Controller_Promociones/UpdatePromocion',
		               type: 'POST',
		               processData: false,  // tell jQuery not to process the data
		               contentType: false,
		               timeout: 35000,
		               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		               data: formData,
		               beforeSend : function ()
		                {
		                    $('#loadingHeader').css('display','');
			                $('#btnUpdateDistribuidorKit').css('display','none');
			                $('#loadingUpdateDistribuidorKit').css('display','');
			                $('#btnUpdateProductoKit').css('display','none');
			                $('#loadingUpdateProductoKit').css('display','');
			                $('#btnUpdateSucursalKit').css('display','none');
			                $('#loadingUpdateSucursalKit').css('display','');
			                $('#btnCerrarUpdateKit').css('display','none');
			                $('#loadingCerrarUpdateKit').css('display','');
			                $('#btnUpdatePromocionKit').css('display','none');
			                $('#loadingUpdatePromocionKit').css('display','');
		                },
		                success: function(data)
		                {
		                    console.log(data);

		                    switch(parseInt(data.trim())){

                                case 0:
                                    toastr.error('Ocurrio un error al modificar la promoción', 'Error');
                                break;

                                case 1:
                                    Limpiar(1);
                                    toastr.success('Promoción modificada con exito', 'Correcto');
                                break;

                                default:
                                    toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                            }
		                }
		            })
		            .done(function() {
		               	$('#loadingHeader').css('display','none');
			            $('#btnUpdateDistribuidorKit').css('display','');
			            $('#loadingUpdateDistribuidorKit').css('display','none');
			            $('#btnUpdateProductoKit').css('display','');
			            $('#loadingUpdateProductoKit').css('display','none');
			            $('#btnUpdateSucursalKit').css('display','');
			            $('#loadingUpdateSucursalKit').css('display','none');
			            $('#btnCerrarUpdateKit').css('display','');
			            $('#loadingCerrarUpdateKit').css('display','none');
			            $('#btnUpdatePromocionKit').css('display','');
			            $('#loadingUpdatePromocionKit').css('display','none');
		            })
		            .fail(function() {
		               	$('#loadingHeader').css('display','none');
			            $('#btnUpdateDistribuidorKit').css('display','');
			            $('#loadingUpdateDistribuidorKit').css('display','none');
			            $('#btnUpdateProductoKit').css('display','');
			            $('#loadingUpdateProductoKit').css('display','none');
			            $('#btnUpdateSucursalKit').css('display','');
			            $('#loadingUpdateSucursalKit').css('display','none');
			            $('#btnCerrarUpdateKit').css('display','');
			            $('#loadingCerrarUpdateKit').css('display','none');
			            $('#btnUpdatePromocionKit').css('display','');
			            $('#loadingUpdatePromocionKit').css('display','none');
			            $("#modalErrorConexion").modal("show");
		            })
		            .always(function() {
		            });

				}else{
					toastr.warning('Para continuar es necesario recalcular el ahorro de las sucursales', 'Advertencia');
				}
    		}
    		else{
		        toastr.warning('Por lo menos debe de agregar a productos y sucursal', 'Advertencia');
    		}
    	}
    	else{
	        toastr.warning('Algúnos campos obligatorios estan vacios', 'Advertencia');
    	}
    });


























































































    // Acción Guardar Cambios Promociones //
    $("#btnAddDuplicarPromo").click(function(event) {
        
        let Nombre   = $("#txtNombre_Kit_Editar").val();
        let Inicial  = $("#Vigencia_Inicial_Kit_Editar").val();
        let Final    = $("#Vigencia_Final_Kit_Editar").val();
        let Division = $("#select_Division_Kit_Editar").val();
        let Linea    = $("#select_Linea_Kit_Editar").val();
        let Sublinea = $("#select_Sublinea_Kit_Editar").val();
        let Bandera  = 0;
		let Black    = 0;
        let Status   = "";
        let Contador = 0;

        array_Producto = new Array();
        array_Clientes = new Array();
        array_Sucursal = new Array();
        array_Cantidad = new Array();
        array_Precio   = new Array();
        array_Ahorro   = new Array();

        let Tabla_Clientes = document.getElementById("fetchDistribuidorKitEditar");
        let Tbody_Clientes = Tabla_Clientes.getElementsByTagName("tbody")[0];

        let Tabla_Producto = document.getElementById("fetchProductosKitEditar");
        let Tbody_Producto = Tabla_Producto.getElementsByTagName("tbody")[0];

        let Tabla_Sucursal = document.getElementById("fetchSucursalKitEditar");
        let Tbody_Sucursal = Tabla_Sucursal.getElementsByTagName("tbody")[0];

        if (Nombre != null && Nombre != "" && Inicial != null && Inicial != "" && Final != null && Final != ""){

            if (Tbody_Producto.rows.length > 0 && Tbody_Sucursal.rows.length > 0){

                for (var i = 0; i < Tbody_Producto.rows.length ; i++){            
                    array_Producto.push(Tbody_Producto.rows[i].cells[0].innerHTML);
                    array_Cantidad.push(Tbody_Producto.rows[i].cells[2].childNodes[0].value);
                }

                for (var i = 0; i < Tbody_Clientes.rows.length ; i++){            
                    array_Clientes.push(Tbody_Clientes.rows[i].cells[0].innerHTML);
                }

                for (var i = 0; i < Tbody_Sucursal.rows.length ; i++){            
                    array_Sucursal.push(Tbody_Sucursal.rows[i].cells[0].innerHTML);
                    array_Precio.push(Tbody_Sucursal.rows[i].cells[2].childNodes[0].value);
                    array_Ahorro.push(Tbody_Sucursal.rows[i].cells[3].childNodes[0].value);

                    console.log(Tbody_Sucursal.rows[i].cells[5].innerHTML);
                    console.log(Tbody_Sucursal.rows[i].cells[5].innerHTML == 0);

                    if (Tbody_Sucursal.rows[i].cells[5].innerHTML == 0){
                        Contador = 1;
                    }
                    else{
                        Contador = 0;
                    }
                }

                if ($('#checkExcluirDistriEditar').prop('checked')){
                    Bandera = 1;
                }
                else{
                    Bandera = 0;
                }

				if ($('#checkSalonBlackEditar').prop('checked')){
				    Black = 1;
				}
				else{
					Black = 0;
				}

                if ($('#check_Status_Kit_Editar').prop('checked')){
                    Status = "Inactivo";
                }
                else{
                    Status = "Activo";
                }

                if (Contador == 0){
                    let formData = new FormData();
                    formData.append("Nombre", Nombre);
                    formData.append("Vigencia_Inicial", Inicial);
                    formData.append("Vigencia_Final", Final);
                    formData.append("Division", Division);
                    formData.append("Linea", Linea);
                    formData.append("Sublinea", Sublinea);
                    formData.append("Distribuidor", array_Clientes);
                    formData.append("Producto", array_Producto);
                    formData.append("Sucursal", array_Sucursal);
                    formData.append("Excluir", Bandera);
                    formData.append("Cantidad", array_Cantidad);
                    formData.append("Precio", array_Precio);
                    formData.append("Ahorro", array_Ahorro);
                    formData.append("Status", Status);
					formData.append("Salon_black", Black);

                    $.ajax({
                       url: window.dir + 'index.php/Controller_Promociones/addPromocion',
                       type: 'POST',
                       processData: false,  // tell jQuery not to process the data
                       contentType: false,
                       timeout: 35000,
                       //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                       data: formData,
                       beforeSend : function ()
                        {
                            $('#loadingHeader').css('display','');
                            $('#btnUpdateDistribuidorKit').css('display','none');
                            $('#loadingUpdateDistribuidorKit').css('display','');
                            $('#btnUpdateProductoKit').css('display','none');
                            $('#loadingUpdateProductoKit').css('display','');
                            $('#btnUpdateSucursalKit').css('display','none');
                            $('#loadingUpdateSucursalKit').css('display','');
                            $('#btnCerrarUpdateKit').css('display','none');
                            $('#loadingCerrarUpdateKit').css('display','');
                            $('#btnAddDuplicarPromo').css('display','none');
                            $('#loadingAddDuplicarPromo').css('display','');
                        },
                        success: function(data)
                        {
                            console.log(data);

                            switch(parseInt(data.trim())){

                                case 0:
                                    toastr.error('Ocurrio un error al modificar la promoción', 'Error');
                                break;

                                case 1:
                                    Limpiar(1);
                                    toastr.success('Promoción modificada con exito', 'Correcto');
                                break;

                                default:
                                    toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                            }
                        }
                    })
                    .done(function() {
                        $('#loadingHeader').css('display','none');
                        $('#btnUpdateDistribuidorKit').css('display','');
                        $('#loadingUpdateDistribuidorKit').css('display','none');
                        $('#btnUpdateProductoKit').css('display','');
                        $('#loadingUpdateProductoKit').css('display','none');
                        $('#btnUpdateSucursalKit').css('display','');
                        $('#loadingUpdateSucursalKit').css('display','none');
                        $('#btnCerrarUpdateKit').css('display','');
                        $('#loadingCerrarUpdateKit').css('display','none');
                        $('#btnAddDuplicarPromo').css('display','');
                        $('#loadingAddDuplicarPromo').css('display','none');
                    })
                    .fail(function() {
                        $('#loadingHeader').css('display','none');
                        $('#btnUpdateDistribuidorKit').css('display','');
                        $('#loadingUpdateDistribuidorKit').css('display','none');
                        $('#btnUpdateProductoKit').css('display','');
                        $('#loadingUpdateProductoKit').css('display','none');
                        $('#btnUpdateSucursalKit').css('display','');
                        $('#loadingUpdateSucursalKit').css('display','none');
                        $('#btnCerrarUpdateKit').css('display','');
                        $('#loadingCerrarUpdateKit').css('display','none');
                        $('#btnAddDuplicarPromo').css('display','');
                        $('#loadingAddDuplicarPromo').css('display','none');
                        $("#modalErrorConexion").modal("show");
                    })
                    .always(function() {
                    });

                }else{
                    toastr.warning('Para continuar es necesario recalcular el ahorro de las sucursales', 'Advertencia');
                }
            }
            else{
                toastr.warning('Por lo menos debe de agregar a productos y sucursal', 'Advertencia');
            }
        }
        else{
            toastr.warning('Algúnos campos obligatorios estan vacios', 'Advertencia');
        }
    });

	
	// Boton Eliminar Promoción //
	$("#btnEliminarPromo").click(function(event) {
		
		if (FETCHPROMOCIONES != null){

			if (FETCHPROMOCIONES.childNodes[4].childNodes[0].innerHTML == 'Activo'){

				swal({
				  	title: "¿Esta segúro que desea eliminar la promoción?",
				  	text: "Una vez eliminado pasara con a estatus inactivo",
				  	icon: "warning",
				  	buttons: true,
				  	dangerMode: true,
				})
				.then((willDelete) => {
				  	if (willDelete) {

				  		let formData = new FormData();
			            formData.append("idPromocion", FETCHPROMOCIONES.childNodes[0].innerHTML);

			            $.ajax({
			                url: window.dir + 'index.php/Controller_Promociones/deletePromocion',
			                type: 'POST',
			                processData: false,  // tell jQuery not to process the data
			                contentType: false,
			                timeout: 35000,
			                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			                data: formData,
			                beforeSend : function ()
			                {
			                    $('#loadingHeader').css('display','');
			                    $('#btnAgregarPromo').css('display','none');
			                    $('#loadingAgregarPromo').css('display','');
			                    $('#btnEditarPromo').css('display','none');
			                    $('#loadingEditarPromo').css('display','');
			                    $('#btnEliminarPromo').css('display','none');
			                    $('#loadingEliminarPromo').css('display','');
                                $('#btnDuplicarPromo').css('display','none');
                                $('#loadingDuplicarPromo').css('display','');
			                },
			                success: function(data)
			                {
			                	console.log(data);

			                    switch(parseInt(data.trim())){

	                                case 0:
	                                    toastr.error('Ocurrio un error al eliminar la promoción', 'Error');
	                                break;

	                                case 1:
	                                    Limpiar(2);
	                                    toastr.success('Promoción eliminada con exito', 'Correcto');
	                                break;

	                                default:
	                                    toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
	                            }
			                }
			            })
			            .done(function() {
			                $('#loadingHeader').css('display','none');
		                    $('#btnAgregarPromo').css('display','');
		                    $('#loadingAgregarPromo').css('display','none');
		                    $('#btnEditarPromo').css('display','');
		                    $('#loadingEditarPromo').css('display','none');
		                    $('#btnEliminarPromo').css('display','');
		                    $('#loadingEliminarPromo').css('display','none');
                            $('#btnDuplicarPromo').css('display','');
                            $('#loadingDuplicarPromo').css('display','none');
			            })
			            .fail(function(jqXHR, textStatus, errorThrown) {
			             	$('#loadingHeader').css('display','none');
		                    $('#btnAgregarPromo').css('display','');
		                    $('#loadingAgregarPromo').css('display','none');
		                    $('#btnEditarPromo').css('display','');
		                    $('#loadingEditarPromo').css('display','none');
		                    $('#btnEliminarPromo').css('display','');
		                    $('#loadingEliminarPromo').css('display','none');
                            $('#btnDuplicarPromo').css('display','');
                            $('#loadingDuplicarPromo').css('display','none');

		                    $("#modalErrorConexion").modal("show");
			        	})
			            .always(function() {
			            });
				  	}
				});
			}
			else{
	            toastr.warning('La promoción se encuentra como inactiva', 'Advertencia');
			}		
    	}
    	else{
	        toastr.warning('Seleccione un producto', 'Advertencia');
    	}
	});


	////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////  Ofertas Tab  ///////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////

	// Acción Click Table Ofertas //
	document.getElementById("fetchOfertas").onclick = function(e)
    {
        FETCHOFERTAS = e.target.parentNode;

        let formData = new FormData();
        formData.append("idOferta", FETCHOFERTAS.childNodes[0].innerHTML);

        $.ajax({
            url: window.dir + 'index.php/Controller_Promociones/getInfoOfertas',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnAgregarOferta').css('display','none');
                $('#loadingAgregarOferta').css('display','');
                $('#btnEditarOferta').css('display','none');
                $('#loadingEditarOferta').css('display','');
                $('#btnEliminarOferta').css('display','none');
                $('#loadingEliminarOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

	            if (parsed != null && parsed != ""){

            		let tableProducto = document.getElementById("fetchOfertaDetalle"); 
            		let tbodyProducto = tableProducto.tBodies[0];

            		let tableRegalo = document.getElementById("fetchRegalos"); 
            		let tbodyRegalo = tableRegalo.tBodies[0];

            		$('#fetchOfertaDetalle').DataTable().destroy();
            		tableProducto.tBodies[0].innerHTML = "";

            		$('#fetchRegalos').DataTable().destroy();
            		tableRegalo.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed['Oferta'].length; i++){

	                 	let row  = tbodyProducto.insertRow(i);
	                 	let cel1 = row.insertCell(0);
	                 	let cel2 = row.insertCell(1);
	                 	let cel3 = row.insertCell(2);

	                 	cel1.innerHTML = parsed['Oferta'][i]['ID'];
	                 	cel2.innerHTML = parsed['Oferta'][i]['Codigo'];
	                 	cel3.innerHTML = parsed['Oferta'][i]['Producto'];	                
	                }

	                for (var i = 0; i < parsed['Regalo'].length; i++){

	                 	let row  = tbodyRegalo.insertRow(i);
	                 	let cel1 = row.insertCell(0);
	                 	let cel2 = row.insertCell(1);
	                 	let cel3 = row.insertCell(2);

	                 	cel1.innerHTML = parsed['Regalo'][i]['ID'];
	                 	cel2.innerHTML = parsed['Regalo'][i]['Codigo'];
	                 	cel3.innerHTML = parsed['Regalo'][i]['Producto'];	                
	                }

		            fetch("fetchOfertaDetalle");
		            fetch("fetchRegalos");
	            }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnAgregarOferta').css('display','');
            $('#loadingAgregarOferta').css('display','none');
            $('#btnEditarOferta').css('display','');
            $('#loadingEditarOferta').css('display','none');
            $('#btnEliminarOferta').css('display','');
            $('#loadingEliminarOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnAgregarOferta').css('display','');
            $('#loadingAgregarOferta').css('display','none');
            $('#btnEditarOferta').css('display','');
            $('#loadingEditarOferta').css('display','none');
            $('#btnEliminarOferta').css('display','');
            $('#loadingEliminarOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
    }


	// Boton Abrir Modal Agregar //
	$("#btnAgregarOferta").click(function(event) {
		$("#modalAgregarOferta").modal("show");
	});

	/// Radio Descuento checked ///
	$("#radio_Descuento").click(function(event) {
    	
    	if ($('#radio_Descuento').prop('checked')){

		    let table = document.getElementById("fetchRegalo");
    		let tbody = table.getElementsByTagName("tbody")[0];

    		if (tbody.rows.length > 0){
    		 	swal({
					  title: "¿Esta segúro?",
					  text: "Se encuentran regalos agregados a la oferta si continúa todos los regalos agregados previamente seran eliminas de la tabla \n \n \n ¿Desea Continuar con el proceso?",
					  icon: "warning",
					  buttons: true,
					  dangerMode: true,
					})
					.then((willDelete) => {
					  	if (willDelete) {

					    	tbody.innerHTML = "";
					    	$("#divRegalo").css('display','none');
		    				$("#divDescuento").css('display','');
		    				TIPOOFERTA = "Descuento";
					  	} 
					  	else{
					  		$("#radio_Regalo").prop('checked', true);
					    	$("#divRegalo").css('display','');
					    	$("#divDescuento").css('display','none');

					    	TIPOOFERTA = "Regalo";
					  	}
					});
    		}
    		else{
    		 	$("#divRegalo").css('display','none');
		    	$("#divDescuento").css('display','');
		    	TIPOOFERTA = "Descuento";
		    }
		}
    });

	/// Radio Regalo checked ///
	$("#radio_Regalo").click(function(event) {
    	
    	if ($('#radio_Regalo').prop('checked')){
    		$("#txtDescuento").val(0);
		    $("#divRegalo").css('display','');
		    $("#divDescuento").css('display','none');
		    TIPOOFERTA = "Regalo";
		}

    });

	// Boton Agregar Regalo //
    $("#btnAddRegalo").click(function(event) {
	
        $.ajax({
            url: window.dir + 'index.php/Controller_Productos/getProductos',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnAddRegalo').css('display','none');
                $('#loadingAddRegalo').css('display','');
                $('#btnAddDistriOferta').css('display','none');
                $('#loadingAddDistriOferta').css('display','');
                $('#btnAddDivisionOferta').css('display','none');
                $('#loadingAddDivisionOferta').css('display','');
                $('#btnAddLineaOferta').css('display','none');
                $('#loadingAddLineaOferta').css('display','');
                $('#btnAddSublineaOferta').css('display','none');
                $('#loadingAddSublineaOferta').css('display','');
                $('#btnAddProductoOferta').css('display','none');
                $('#loadingAddProductoOferta').css('display','');
                $('#btnAddSucursalOferta').css('display','none');
                $('#loadingAddSucursalOferta').css('display','');
                $('#btnCerrarAddOferta').css('display','none');
                $('#loadingCerrarAddOferta').css('display','');
                $('#btnAddOferta').css('display','none');
                $('#loadingAddOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalRegalos").modal("show");

	            if (parsed != null && parsed != ""){

            		let table   = document.getElementById("fetchListRegalos"); 
            		let tbody   = table.tBodies[0];

            		$('#fetchListRegalos').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

            		for (var i = 0; i < parsed.length; i++){

		                let row  = tbody.insertRow(i);
		                let cel1 = row.insertCell(0);
		                let cel2 = row.insertCell(1);
						let cel3 = row.insertCell(2);

		                cel1.innerHTML = parsed[i]['ID'];
		                cel2.innerHTML = parsed[i]['Codigo'];
						cel3.innerHTML = parsed[i]['Producto'];
		            }

		            fetch("fetchListRegalos");
	            }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnAddRegalo').css('display','');
            $('#loadingAddRegalo').css('display','none');
            $('#btnAddDistriOferta').css('display','');
            $('#loadingAddDistriOferta').css('display','none');
            $('#btnAddDivisionOferta').css('display','');
            $('#loadingAddDivisionOferta').css('display','none');
            $('#btnAddLineaOferta').css('display','');
            $('#loadingAddLineaOferta').css('display','none');
            $('#btnAddSublineaOferta').css('display','');
            $('#loadingAddSublineaOferta').css('display','none');
            $('#btnAddProductoOferta').css('display','');
            $('#loadingAddProductoOferta').css('display','none');
            $('#btnAddSucursalOferta').css('display','');
            $('#loadingAddSucursalOferta').css('display','none');
            $('#btnCerrarAddOferta').css('display','');
            $('#loadingCerrarAddOferta').css('display','none');
            $('#btnAddOferta').css('display','');
            $('#loadingAddOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnAddRegalo').css('display','');
            $('#loadingAddRegalo').css('display','none');
            $('#btnAddDistriOferta').css('display','');
            $('#loadingAddDistriOferta').css('display','none');
            $('#btnAddDivisionOferta').css('display','');
            $('#loadingAddDivisionOferta').css('display','none');
            $('#btnAddLineaOferta').css('display','');
            $('#loadingAddLineaOferta').css('display','none');
            $('#btnAddSublineaOferta').css('display','');
            $('#loadingAddSublineaOferta').css('display','none');
            $('#btnAddProductoOferta').css('display','');
            $('#loadingAddProductoOferta').css('display','none');
            $('#btnAddSucursalOferta').css('display','');
            $('#loadingAddSucursalOferta').css('display','none');
            $('#btnCerrarAddOferta').css('display','');
            $('#loadingCerrarAddOferta').css('display','none');
            $('#btnAddOferta').css('display','');
            $('#loadingAddOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});

	// Acción click fetchListRegalos //
    document.getElementById("fetchListRegalos").onclick = function(e)
    {
        FETCHLISTREGALOS = e.target.parentNode;
    }

	/// Agregar fetchListRegalos ///
	$("#btnAddListProductoRegalo").click(function(event) {
    	
    	if (FETCHLISTREGALOS != null){

    		let table = document.getElementById("fetchRegalo"); 
			let tbody = table.tBodies[0];

	      	for (var i = 0; i <= 0; i++){

		        let row  = tbody.insertRow(i);
	            let cel1 = row.insertCell(0);
	            let cel2 = row.insertCell(1);
	            let cel3 = row.insertCell(2);

	            cel1.innerHTML = FETCHLISTREGALOS.childNodes[0].innerHTML;
			    cel2.innerHTML = FETCHLISTREGALOS.childNodes[2].innerHTML;

			   	let boton = document.createElement("button");
			    boton.classList.add('btn', 'btn-danger');
			    boton.addEventListener("click",deleteRegalo);
			    cel3.appendChild(boton);

			    let icono = document.createElement("span");
			    icono.classList.add('glyphicon', 'glyphicon-trash');
			    boton.appendChild(icono);

	            toastr.success('Producto agregado con exito', 'Correcto');
			}
    	}
    	else{
	        toastr.warning('Seleccione un producto', 'Advertencia');
    	}
    });

    /// Excluir Distribuidor Oferta ///
    $("#check_Excluir_Oferta").click(function(event) {
    	
    	if ($('#check_Excluir_Oferta').prop('checked')){
		    $("#divExcluirOferta").css('display','');
		}
		else{

			let table = document.getElementById("fetchDistribuidorOferta");
    		let tbody = table.getElementsByTagName("tbody")[0];

    		if (tbody.rows.length > 0)
    		{
    		 	swal({
				  	title: "¿Esta segúro?",
				  	text: "Se encuentran distribuidores agregados a la oferta si continúa todos los distribuidores agregados previamente seran eliminas de la tabla \n \n \n ¿Desea Continuar con el proceso?",
				  	icon: "warning",
				  	buttons: true,
				  	dangerMode: true,
				})
				.then((willDelete) => {
				  	if (willDelete) {

				    	tbody.innerHTML = "";
				    	$("#divExcluirOferta").css('display','none');

				  	} 
				  	else{
				  	$("#check_Excluir_Oferta").prop('checked', true);
				    $("#divExcluirOferta").css('display','');
				  	}
				});
    		}
    		else{
    		 	$("#divExcluirOferta").css('display','none');
    		}
		}
    });

    // Acción click fetchListDistribuidoresOfertas //
    document.getElementById("fetchListDistribuidorOferta").onclick = function(e)
    {
        FETCHLISTDISTRIBUIDOROFERTA = e.target.parentNode;
    }

    // Boton agregar Distribuidor //
    $("#btnAddDistriOferta").click(function(event) {

        $.ajax({
            url: window.dir + 'index.php/Controller_Distribuidores/getDistribuidores',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnAddRegalo').css('display','none');
                $('#loadingAddRegalo').css('display','');
                $('#btnAddDistriOferta').css('display','none');
                $('#loadingAddDistriOferta').css('display','');
                $('#btnAddDivisionOferta').css('display','none');
                $('#loadingAddDivisionOferta').css('display','');
                $('#btnAddLineaOferta').css('display','none');
                $('#loadingAddLineaOferta').css('display','');
                $('#btnAddSublineaOferta').css('display','none');
                $('#loadingAddSublineaOferta').css('display','');
                $('#btnAddProductoOferta').css('display','none');
                $('#loadingAddProductoOferta').css('display','');
                $('#btnAddSucursalOferta').css('display','none');
                $('#loadingAddSucursalOferta').css('display','');
                $('#btnCerrarAddOferta').css('display','none');
                $('#loadingCerrarAddOferta').css('display','');
                $('#btnAddOferta').css('display','none');
                $('#loadingAddOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalDistribuidoresOfertas").modal("show");

	            if (parsed != null && parsed != ""){

            		let table   = document.getElementById("fetchListDistribuidorOferta"); 
            		let tbody   = table.tBodies[0];

            		$('#fetchListDistribuidorOferta').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++){

	                	let row  = tbody.insertRow(i);
	                 	let cel1 = row.insertCell(0);
	                 	let cel2 = row.insertCell(1);

	                 	cel1.innerHTML = parsed[i]['ID'];
	                 	cel2.innerHTML = parsed[i]['Nombre'] + parsed[i]['Apellidos'];
	                }

		            fetch("fetchListDistribuidorOferta");
	            }
            }
        })
        .done(function() {
        	$('#loadingHeader').css('display','none');
            $('#btnAddRegalo').css('display','');
            $('#loadingAddRegalo').css('display','none');
            $('#btnAddDistriOferta').css('display','');
            $('#loadingAddDistriOferta').css('display','none');
            $('#btnAddDivisionOferta').css('display','');
            $('#loadingAddDivisionOferta').css('display','none');
            $('#btnAddLineaOferta').css('display','');
            $('#loadingAddLineaOferta').css('display','none');
            $('#btnAddSublineaOferta').css('display','');
            $('#loadingAddSublineaOferta').css('display','none');
            $('#btnAddProductoOferta').css('display','');
            $('#loadingAddProductoOferta').css('display','none');
            $('#btnAddSucursalOferta').css('display','');
            $('#loadingAddSucursalOferta').css('display','none');
            $('#btnCerrarAddOferta').css('display','');
            $('#loadingCerrarAddOferta').css('display','none');
            $('#btnAddOferta').css('display','');
            $('#loadingAddOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnAddRegalo').css('display','');
            $('#loadingAddRegalo').css('display','none');
            $('#btnAddDistriOferta').css('display','');
            $('#loadingAddDistriOferta').css('display','none');
            $('#btnAddDivisionOferta').css('display','');
            $('#loadingAddDivisionOferta').css('display','none');
            $('#btnAddLineaOferta').css('display','');
            $('#loadingAddLineaOferta').css('display','none');
            $('#btnAddSublineaOferta').css('display','');
            $('#loadingAddSublineaOferta').css('display','none');
            $('#btnAddProductoOferta').css('display','');
            $('#loadingAddProductoOferta').css('display','none');
            $('#btnAddSucursalOferta').css('display','');
            $('#loadingAddSucursalOferta').css('display','none');
            $('#btnCerrarAddOferta').css('display','');
            $('#loadingCerrarAddOferta').css('display','none');
            $('#btnAddOferta').css('display','');
            $('#loadingAddOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
    });

	/// Agregar Distribuidor Oferta ///
	$("#btnAddListDistribuidorOferta").click(function(event) {
    	
    	if (FETCHLISTDISTRIBUIDOROFERTA != null){

    		let table = document.getElementById("fetchDistribuidorOferta"); 
			let tbody = table.tBodies[0];

    		let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
			    if (FETCHLISTDISTRIBUIDOROFERTA.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
				    Contador ++;
			    }
		    }

			if (Contador > 0){
				toastr.error('El distribuidor ya se encuentra agregado', 'Error');
			}
			else{

		      	for (var i = 0; i <= 0; i++){
			       	let row  = tbody.insertRow(i);
		           	let cel1 = row.insertCell(0);
		           	let cel2 = row.insertCell(1);
		           	let cel3 = row.insertCell(2);

		           	cel1.innerHTML = FETCHLISTDISTRIBUIDOROFERTA.childNodes[0].innerHTML;
				   	cel2.innerHTML = FETCHLISTDISTRIBUIDOROFERTA.childNodes[1].innerHTML;

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteDistribuidorOferta);
				    cel3.appendChild(boton);

				    let icono = document.createElement("span");
				    icono.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono);

		            toastr.success('Distribuidor agregado con exito', 'Correcto');
				}
		    }
    	}
    	else{
	        toastr.warning('Seleccione a un distribuidor', 'Advertencia');
    	}
    });

    /// Boton Agregar División ///
    $("#btnAddDivisionOferta").click(function(event) {

        $.ajax({
            url: window.dir + 'index.php/Controller_Promociones/getDivision',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnAddRegalo').css('display','none');
                $('#loadingAddRegalo').css('display','');
                $('#btnAddDistriOferta').css('display','none');
                $('#loadingAddDistriOferta').css('display','');
                $('#btnAddDivisionOferta').css('display','none');
                $('#loadingAddDivisionOferta').css('display','');
                $('#btnAddLineaOferta').css('display','none');
                $('#loadingAddLineaOferta').css('display','');
                $('#btnAddSublineaOferta').css('display','none');
                $('#loadingAddSublineaOferta').css('display','');
                $('#btnAddProductoOferta').css('display','none');
                $('#loadingAddProductoOferta').css('display','');
                $('#btnAddSucursalOferta').css('display','none');
                $('#loadingAddSucursalOferta').css('display','');
                $('#btnCerrarAddOferta').css('display','none');
                $('#loadingCerrarAddOferta').css('display','');
                $('#btnAddOferta').css('display','none');
                $('#loadingAddOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalDivision").modal("show");

		        if (parsed != null && parsed != ""){

            		let table   = document.getElementById("fetchListDivision"); 
            		let tbody   = table.tBodies[0];

            		$('#fetchListDivision').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++){

	                	let row  = tbody.insertRow(i);
	                	let cel1 = row.insertCell(0);
	                	let cel2 = row.insertCell(1);

	                	cel1.innerHTML = parsed[i]['ID'];
	                	cel2.innerHTML = parsed[i]['Division'];
	                }

	                fetch("fetchListDivision");
		        }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnAddRegalo').css('display','');
            $('#loadingAddRegalo').css('display','none');
            $('#btnAddDistriOferta').css('display','');
            $('#loadingAddDistriOferta').css('display','none');
            $('#btnAddDivisionOferta').css('display','');
            $('#loadingAddDivisionOferta').css('display','none');
            $('#btnAddLineaOferta').css('display','');
            $('#loadingAddLineaOferta').css('display','none');
            $('#btnAddSublineaOferta').css('display','');
            $('#loadingAddSublineaOferta').css('display','none');
            $('#btnAddProductoOferta').css('display','');
            $('#loadingAddProductoOferta').css('display','none');
            $('#btnAddSucursalOferta').css('display','');
            $('#loadingAddSucursalOferta').css('display','none');
            $('#btnCerrarAddOferta').css('display','');
            $('#loadingCerrarAddOferta').css('display','none');
            $('#btnAddOferta').css('display','');
            $('#loadingAddOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnAddRegalo').css('display','');
            $('#loadingAddRegalo').css('display','none');
            $('#btnAddDistriOferta').css('display','');
            $('#loadingAddDistriOferta').css('display','none');
            $('#btnAddDivisionOferta').css('display','');
            $('#loadingAddDivisionOferta').css('display','none');
            $('#btnAddLineaOferta').css('display','');
            $('#loadingAddLineaOferta').css('display','none');
            $('#btnAddSublineaOferta').css('display','');
            $('#loadingAddSublineaOferta').css('display','none');
            $('#btnAddProductoOferta').css('display','');
            $('#loadingAddProductoOferta').css('display','none');
            $('#btnAddSucursalOferta').css('display','');
            $('#loadingAddSucursalOferta').css('display','none');
            $('#btnCerrarAddOferta').css('display','');
            $('#loadingCerrarAddOferta').css('display','none');
            $('#btnAddOferta').css('display','');
            $('#loadingAddOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
            $('#Cargando_Modal_Oferta').css('display','none');
        });
	});

    // Acción click fetchListDivisionOfertas //
    document.getElementById("fetchListDivision").onclick = function(e)
    {
        FETCHLISTDIVISION = e.target.parentNode;
    }

    /// Agregar Division //
    $("#btnAddListDivision").click(function(event) {
	
		if (FETCHLISTDIVISION != null){

    		let table       = document.getElementById("fetchDivision"); 
			let tbody 		 = table.tBodies[0];

    		let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
			    if (FETCHLISTDIVISION.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
				    Contador ++;
			    }
		    }

		    if (Contador > 0){
		            toastr.error('La división ya se encuentra agregado', 'Error');
		    }
		    else{

				for (var i = 0; i <= 0; i++){

			        let row  = tbody.insertRow(i);
		            let cel1 = row.insertCell(0);
		            let cel2 = row.insertCell(1);
		            let cel3 = row.insertCell(2);

		            cel1.innerHTML = FETCHLISTDIVISION.childNodes[0].innerHTML;
				    cel2.innerHTML = FETCHLISTDIVISION.childNodes[1].innerHTML;

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteDivision);
				    cel3.appendChild(boton);

				    let icono = document.createElement("span");
				    icono.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono);

		            toastr.success('División agregado con exito', 'Correcto');
				}
			}
    	}
    	else{
	        toastr.warning('Seleccione una División', 'Advertencia');
    	}
	});

	// Acción click fetchListLinea //
    document.getElementById("fetchListLinea").onclick = function(e)
    {
        FETCHLISTLINEA = e.target.parentNode;
    }

    // Boton agregar Lineas //
    $("#btnAddLineaOferta").click(function(event) {
        $.ajax({
            url: window.dir + 'index.php/Controller_Promociones/getLinea',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnAddRegalo').css('display','none');
                $('#loadingAddRegalo').css('display','');
                $('#btnAddDistriOferta').css('display','none');
                $('#loadingAddDistriOferta').css('display','');
                $('#btnAddDivisionOferta').css('display','none');
                $('#loadingAddDivisionOferta').css('display','');
                $('#btnAddLineaOferta').css('display','none');
                $('#loadingAddLineaOferta').css('display','');
                $('#btnAddSublineaOferta').css('display','none');
                $('#loadingAddSublineaOferta').css('display','');
                $('#btnAddProductoOferta').css('display','none');
                $('#loadingAddProductoOferta').css('display','');
                $('#btnAddSucursalOferta').css('display','none');
                $('#loadingAddSucursalOferta').css('display','');
                $('#btnCerrarAddOferta').css('display','none');
                $('#loadingCerrarAddOferta').css('display','');
                $('#btnAddOferta').css('display','none');
                $('#loadingAddOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalLinea").modal("show");

	            if (parsed != null && parsed != ""){

            		let table   = document.getElementById("fetchListLinea"); 
            		let tbody   = table.tBodies[0];

            		$('#fetchListLinea').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++) 
	                {
	                 	let row  = tbody.insertRow(i);
	                 	let cel1 = row.insertCell(0);
	                 	let cel2 = row.insertCell(1);

	                 	cel1.innerHTML = parsed[i]['ID'];
	                 	cel2.innerHTML = parsed[i]['Linea'];
	                }

		            fetch("fetchListLinea");
	            }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnAddRegalo').css('display','');
            $('#loadingAddRegalo').css('display','none');
            $('#btnAddDistriOferta').css('display','');
            $('#loadingAddDistriOferta').css('display','none');
            $('#btnAddDivisionOferta').css('display','');
            $('#loadingAddDivisionOferta').css('display','none');
            $('#btnAddLineaOferta').css('display','');
            $('#loadingAddLineaOferta').css('display','none');
            $('#btnAddSublineaOferta').css('display','');
            $('#loadingAddSublineaOferta').css('display','none');
            $('#btnAddProductoOferta').css('display','');
            $('#loadingAddProductoOferta').css('display','none');
            $('#btnAddSucursalOferta').css('display','');
            $('#loadingAddSucursalOferta').css('display','none');
            $('#btnCerrarAddOferta').css('display','');
            $('#loadingCerrarAddOferta').css('display','none');
            $('#btnAddOferta').css('display','');
            $('#loadingAddOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnAddRegalo').css('display','');
            $('#loadingAddRegalo').css('display','none');
            $('#btnAddDistriOferta').css('display','');
            $('#loadingAddDistriOferta').css('display','none');
            $('#btnAddDivisionOferta').css('display','');
            $('#loadingAddDivisionOferta').css('display','none');
            $('#btnAddLineaOferta').css('display','');
            $('#loadingAddLineaOferta').css('display','none');
            $('#btnAddSublineaOferta').css('display','');
            $('#loadingAddSublineaOferta').css('display','none');
            $('#btnAddProductoOferta').css('display','');
            $('#loadingAddProductoOferta').css('display','none');
            $('#btnAddSucursalOferta').css('display','');
            $('#loadingAddSucursalOferta').css('display','none');
            $('#btnCerrarAddOferta').css('display','');
            $('#loadingCerrarAddOferta').css('display','none');
            $('#btnAddOferta').css('display','');
            $('#loadingAddOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});

	// Agregar Linea //
	$("#btnAddListLinea").click(function(event) {
	
		if (FETCHLISTLINEA != null){

    		let table = document.getElementById("fetchLinea"); 
			let tbody = table.tBodies[0];

    		let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
			    if (FETCHLISTLINEA.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
				    Contador ++;
			    }
		    }

		    if (Contador > 0){
				toastr.error('La linea ya se encuentra agregado', 'Error');
			}
			else{

		      	for (var i = 0; i <= 0; i++){

			       	let row  = tbody.insertRow(i);
		           	let cel1 = row.insertCell(0);
		           	let cel2 = row.insertCell(1);
		           	let cel3 = row.insertCell(2);

		           	cel1.innerHTML = FETCHLISTLINEA.childNodes[0].innerHTML;
				   	cel2.innerHTML = FETCHLISTLINEA.childNodes[1].innerHTML;

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteLinea);
				    cel3.appendChild(boton);

				    let icono = document.createElement("span");
				    icono.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono);

		            toastr.success('Linea agregado con exito', 'Correcto');
				}
			}
    	}
    	else{
	        toastr.warning('Seleccione una Linea', 'Advertencia');
    	}
	});

	// Acción click fetchListSublinea //
    document.getElementById("fetchListSublinea").onclick = function(e)
    {
        FETCHLISTSUBLINEA = e.target.parentNode;
    }

    // Boton agregar Sublinea //
    $("#btnAddSublineaOferta").click(function(event) {
        $.ajax({
            url: window.dir + 'index.php/Controller_Promociones/getSublinea',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnAddRegalo').css('display','none');
                $('#loadingAddRegalo').css('display','');
                $('#btnAddDistriOferta').css('display','none');
                $('#loadingAddDistriOferta').css('display','');
                $('#btnAddDivisionOferta').css('display','none');
                $('#loadingAddDivisionOferta').css('display','');
                $('#btnAddLineaOferta').css('display','none');
                $('#loadingAddLineaOferta').css('display','');
                $('#btnAddSublineaOferta').css('display','none');
                $('#loadingAddSublineaOferta').css('display','');
                $('#btnAddProductoOferta').css('display','none');
                $('#loadingAddProductoOferta').css('display','');
                $('#btnAddSucursalOferta').css('display','none');
                $('#loadingAddSucursalOferta').css('display','');
                $('#btnCerrarAddOferta').css('display','none');
                $('#loadingCerrarAddOferta').css('display','');
                $('#btnAddOferta').css('display','none');
                $('#loadingAddOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalSublinea").modal("show");

	            if (parsed != null && parsed != ""){

            		let table   = document.getElementById("fetchListSublinea"); 
            		let tbody   = table.tBodies[0];

            		$('#fetchListSublinea').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++) 
	                {
	                 	let row  = tbody.insertRow(i);
	                 	let cel1 = row.insertCell(0);
	                 	let cel2 = row.insertCell(1);

	                 	cel1.innerHTML = parsed[i]['ID'];
	                 	cel2.innerHTML = parsed[i]['Sublinea'];
	                }

		            fetch("fetchListSublinea");
	            }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnAddRegalo').css('display','');
            $('#loadingAddRegalo').css('display','none');
            $('#btnAddDistriOferta').css('display','');
            $('#loadingAddDistriOferta').css('display','none');
            $('#btnAddDivisionOferta').css('display','');
            $('#loadingAddDivisionOferta').css('display','none');
            $('#btnAddLineaOferta').css('display','');
            $('#loadingAddLineaOferta').css('display','none');
            $('#btnAddSublineaOferta').css('display','');
            $('#loadingAddSublineaOferta').css('display','none');
            $('#btnAddProductoOferta').css('display','');
            $('#loadingAddProductoOferta').css('display','none');
            $('#btnAddSucursalOferta').css('display','');
            $('#loadingAddSucursalOferta').css('display','none');
            $('#btnCerrarAddOferta').css('display','');
            $('#loadingCerrarAddOferta').css('display','none');
            $('#btnAddOferta').css('display','');
            $('#loadingAddOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnAddRegalo').css('display','');
            $('#loadingAddRegalo').css('display','none');
            $('#btnAddDistriOferta').css('display','');
            $('#loadingAddDistriOferta').css('display','none');
            $('#btnAddDivisionOferta').css('display','');
            $('#loadingAddDivisionOferta').css('display','none');
            $('#btnAddLineaOferta').css('display','');
            $('#loadingAddLineaOferta').css('display','none');
            $('#btnAddSublineaOferta').css('display','');
            $('#loadingAddSublineaOferta').css('display','none');
            $('#btnAddProductoOferta').css('display','');
            $('#loadingAddProductoOferta').css('display','none');
            $('#btnAddSucursalOferta').css('display','');
            $('#loadingAddSucursalOferta').css('display','none');
            $('#btnCerrarAddOferta').css('display','');
            $('#loadingCerrarAddOferta').css('display','none');
            $('#btnAddOferta').css('display','');
            $('#loadingAddOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});

	// Agregar Sublinea //
	$("#btnAddListSublinea").click(function(event) {
	
		if (FETCHLISTSUBLINEA != null){

    		let table = document.getElementById("fetchSublinea"); 
			let tbody = table.tBodies[0];

    		let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
			    if (FETCHLISTSUBLINEA.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
				    Contador ++;
			    }
		    }

		    if (Contador > 0){
				toastr.error('La sublinea ya se encuentra agregado', 'Error');
			}
			else{

		      	for (var i = 0; i <= 0; i++){

			       	let row  = tbody.insertRow(i);
		           	let cel1 = row.insertCell(0);
		           	let cel2 = row.insertCell(1);
		           	let cel3 = row.insertCell(2);

		           	cel1.innerHTML = FETCHLISTSUBLINEA.childNodes[0].innerHTML;
				   	cel2.innerHTML = FETCHLISTSUBLINEA.childNodes[1].innerHTML;

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteSublinea);
				    cel3.appendChild(boton);

				    let icono = document.createElement("span");
				    icono.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono);

		            toastr.success('Sublinea agregado con exito', 'Correcto');
				}
			}
    	}
    	else{
	        toastr.warning('Seleccione una sublinea', 'Advertencia');
    	}
	});

	// Acción click fetchListProductoOferta //
    document.getElementById("fetchListProductoOferta").onclick = function(e)
    {
        FETCHLISTPRODUCTOOFERTA = e.target.parentNode;
    }

    $("#btnAddProductoOferta").click(function(event) {
	
        $.ajax({
            url: window.dir + 'index.php/Controller_Productos/getProductos',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnAddRegalo').css('display','none');
                $('#loadingAddRegalo').css('display','');
                $('#btnAddDistriOferta').css('display','none');
                $('#loadingAddDistriOferta').css('display','');
                $('#btnAddDivisionOferta').css('display','none');
                $('#loadingAddDivisionOferta').css('display','');
                $('#btnAddLineaOferta').css('display','none');
                $('#loadingAddLineaOferta').css('display','');
                $('#btnAddSublineaOferta').css('display','none');
                $('#loadingAddSublineaOferta').css('display','');
                $('#btnAddProductoOferta').css('display','none');
                $('#loadingAddProductoOferta').css('display','');
                $('#btnAddSucursalOferta').css('display','none');
                $('#loadingAddSucursalOferta').css('display','');
                $('#btnCerrarAddOferta').css('display','none');
                $('#loadingCerrarAddOferta').css('display','');
                $('#btnAddOferta').css('display','none');
                $('#loadingAddOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalProductoOferta").modal("show");

	            if (parsed != null && parsed != ""){

            		let table = document.getElementById("fetchListProductoOferta"); 
            		let tbody = table.tBodies[0];

            		$('#fetchListProductoOferta').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++){

	                 	let row  = tbody.insertRow(i);
	                 	let cel1 = row.insertCell(0);
	                 	let cel2 = row.insertCell(1);
	                 	let cel3 = row.insertCell(2);

	                 	cel1.innerHTML = parsed[i]['ID'];
	                 	cel2.innerHTML = parsed[i]['Codigo'];
	                 	cel3.innerHTML = parsed[i]['Producto'];
	                }

		            fetch("fetchListProductoOferta");
	            }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnAddRegalo').css('display','');
            $('#loadingAddRegalo').css('display','none');
            $('#btnAddDistriOferta').css('display','');
            $('#loadingAddDistriOferta').css('display','none');
            $('#btnAddDivisionOferta').css('display','');
            $('#loadingAddDivisionOferta').css('display','none');
            $('#btnAddLineaOferta').css('display','');
            $('#loadingAddLineaOferta').css('display','none');
            $('#btnAddSublineaOferta').css('display','');
            $('#loadingAddSublineaOferta').css('display','none');
            $('#btnAddProductoOferta').css('display','');
            $('#loadingAddProductoOferta').css('display','none');
            $('#btnAddSucursalOferta').css('display','');
            $('#loadingAddSucursalOferta').css('display','none');
            $('#btnCerrarAddOferta').css('display','');
            $('#loadingCerrarAddOferta').css('display','none');
            $('#btnAddOferta').css('display','');
            $('#loadingAddOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnAddRegalo').css('display','');
            $('#loadingAddRegalo').css('display','none');
            $('#btnAddDistriOferta').css('display','');
            $('#loadingAddDistriOferta').css('display','none');
            $('#btnAddDivisionOferta').css('display','');
            $('#loadingAddDivisionOferta').css('display','none');
            $('#btnAddLineaOferta').css('display','');
            $('#loadingAddLineaOferta').css('display','none');
            $('#btnAddSublineaOferta').css('display','');
            $('#loadingAddSublineaOferta').css('display','none');
            $('#btnAddProductoOferta').css('display','');
            $('#loadingAddProductoOferta').css('display','none');
            $('#btnAddSucursalOferta').css('display','');
            $('#loadingAddSucursalOferta').css('display','none');
            $('#btnCerrarAddOferta').css('display','');
            $('#loadingCerrarAddOferta').css('display','none');
            $('#btnAddOferta').css('display','');
            $('#loadingAddOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});

	// Acción Agregar Producto //
	$("#btnAddListProductoOferta").click(function(event) {
	
		if (FETCHLISTPRODUCTOOFERTA != null){

    		let table = document.getElementById("fetchProductosOferta"); 
			let tbody = table.tBodies[0];

	    	let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
				if (FETCHLISTPRODUCTOOFERTA.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
					Contador ++;
				}
			}

			if (Contador > 0){
				toastr.error('El producto ya se encuentra agregado', 'Error');
			}
			else{

		      	for (var i = 0; i <= 0; i++){

			       	let row  = tbody.insertRow(i);
		           	let cel1 = row.insertCell(0);
		           	let cel2 = row.insertCell(1);
		           	let cel3 = row.insertCell(2);

		           	cel1.innerHTML = FETCHLISTPRODUCTOOFERTA.childNodes[0].innerHTML;
				   	cel2.innerHTML = FETCHLISTPRODUCTOOFERTA.childNodes[1].innerHTML;

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteProductosOferta);
				    cel3.appendChild(boton);

				    let icono = document.createElement("span");
				    icono.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono);

		            toastr.success('Producto agregado con exito', 'Correcto');
				}
		    }		
	    }
	    else{
		    toastr.warning('Seleccione una producto', 'Advertencia');
	    }
	});

	// Acción click fetchListSucursalOferta //
    document.getElementById("fetchListSucursalesOferta").onclick = function(e)
    {
        FETCHLISTSUCURSALESOFERTA = e.target.parentNode;
    }

    // Boton Abrir Modal Sucursal Oferta //
	$("#btnAddSucursalOferta").click(function(event) {
	
        $.ajax({
            url: window.dir + 'index.php/Controller_Bodega/getBodega',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnAddRegalo').css('display','none');
                $('#loadingAddRegalo').css('display','');
                $('#btnAddDistriOferta').css('display','none');
                $('#loadingAddDistriOferta').css('display','');
                $('#btnAddDivisionOferta').css('display','none');
                $('#loadingAddDivisionOferta').css('display','');
                $('#btnAddLineaOferta').css('display','none');
                $('#loadingAddLineaOferta').css('display','');
                $('#btnAddSublineaOferta').css('display','none');
                $('#loadingAddSublineaOferta').css('display','');
                $('#btnAddProductoOferta').css('display','none');
                $('#loadingAddProductoOferta').css('display','');
                $('#btnAddSucursalOferta').css('display','none');
                $('#loadingAddSucursalOferta').css('display','');
                $('#btnCerrarAddOferta').css('display','none');
                $('#loadingCerrarAddOferta').css('display','');
                $('#btnAddOferta').css('display','none');
                $('#loadingAddOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalSucursalOferta").modal("show");

	            if (parsed != null && parsed != ""){

            		let table = document.getElementById("fetchListSucursalesOferta"); 
            		let tbody = table.tBodies[0];

            		$('#fetchListSucursalesOferta').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++){

	                 	let row  = tbody.insertRow(i);
	                 	let cel1 = row.insertCell(0);
	                 	let cel2 = row.insertCell(1);

	                 	cel1.innerHTML = parsed[i]['ID'];
	                 	cel2.innerHTML = parsed[i]['Sucursal'];	                
	                }

	                fetch("fetchListSucursalesOferta");
	            }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnAddRegalo').css('display','');
            $('#loadingAddRegalo').css('display','none');
            $('#btnAddDistriOferta').css('display','');
            $('#loadingAddDistriOferta').css('display','none');
            $('#btnAddDivisionOferta').css('display','');
            $('#loadingAddDivisionOferta').css('display','none');
            $('#btnAddLineaOferta').css('display','');
            $('#loadingAddLineaOferta').css('display','none');
            $('#btnAddSublineaOferta').css('display','');
            $('#loadingAddSublineaOferta').css('display','none');
            $('#btnAddProductoOferta').css('display','');
            $('#loadingAddProductoOferta').css('display','none');
            $('#btnAddSucursalOferta').css('display','');
            $('#loadingAddSucursalOferta').css('display','none');
            $('#btnCerrarAddOferta').css('display','');
            $('#loadingCerrarAddOferta').css('display','none');
            $('#btnAddOferta').css('display','');
            $('#loadingAddOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnAddRegalo').css('display','');
            $('#loadingAddRegalo').css('display','none');
            $('#btnAddDistriOferta').css('display','');
            $('#loadingAddDistriOferta').css('display','none');
            $('#btnAddDivisionOferta').css('display','');
            $('#loadingAddDivisionOferta').css('display','none');
            $('#btnAddLineaOferta').css('display','');
            $('#loadingAddLineaOferta').css('display','none');
            $('#btnAddSublineaOferta').css('display','');
            $('#loadingAddSublineaOferta').css('display','none');
            $('#btnAddProductoOferta').css('display','');
            $('#loadingAddProductoOferta').css('display','none');
            $('#btnAddSucursalOferta').css('display','');
            $('#loadingAddSucursalOferta').css('display','none');
            $('#btnCerrarAddOferta').css('display','');
            $('#loadingCerrarAddOferta').css('display','none');
            $('#btnAddOferta').css('display','');
            $('#loadingAddOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});
	
	// Acción Agregar Oferta //
	$("#btnAddListSucursalesOferta").click(function(event) {
	
		if (FETCHLISTSUCURSALESOFERTA != null){

    		let table = document.getElementById("fetchSucursalOferta"); 
			let tbody = table.tBodies[0];

    		let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
			    if (FETCHLISTSUCURSALESOFERTA.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
				    Contador ++;
			    }
		    }

			if (Contador > 0){
				toastr.error('El sucusal ya se encuentra agregado', 'Error');
			}
			else{
				      	
		      	for (var i = 0; i <= 0; i++){

			        let row  = tbody.insertRow(i);
		            let cel1 = row.insertCell(0);
		            let cel2 = row.insertCell(1);
		            let cel3 = row.insertCell(2);

		            cel1.innerHTML = FETCHLISTSUCURSALESOFERTA.childNodes[0].innerHTML;
				    cel2.innerHTML = FETCHLISTSUCURSALESOFERTA.childNodes[1].innerHTML;

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteSucursalOferta);
				    cel3.appendChild(boton);

				    let icono = document.createElement("span");
				    icono.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono);

		            toastr.success('Sucursal agregado con exito', 'Correcto');
				}
		    }
    	}
    	else{
	        toastr.warning('Seleccione una sucursal', 'Advertencia');
    	}
	});

	// Acción Agregar Oferta //
	$("#btnAddOferta").click(function(event) {

		let Nombre  = $("#txt_Nombre_Oferta").val();
		let Inicial = $("#Vigencia_Inicial_Oferta").val();
		let Final   = $("#Vigencia_Final_Oferta").val();
		let Compra  = $("#txtCompra_Requerida").val();
		let Tipo 	= TIPOOFERTA;
		let Excluir = 0;

		if ($('#check_Excluir_Oferta').prop('checked')){
		    Excluir = 1;	
		}
		else{
			Excluir = 0;
		}

		array_Producto = new Array();
	    array_Clientes = new Array();
	    array_Regalos  = new Array();
	    array_Division = new Array();
	    array_Linea    = new Array();
	    array_Sublinea = new Array();
	    array_Sucursal = new Array();

	    let Tabla_Producto = document.getElementById("fetchProductosOferta");
    	let Tbody_Producto = Tabla_Producto.getElementsByTagName("tbody")[0];

    	let Tabla_Clientes = document.getElementById("fetchDistribuidorOferta");
    	let Tbody_Clientes = Tabla_Clientes.getElementsByTagName("tbody")[0];

    	let Tabla_Regalos  = document.getElementById("fetchRegalo");
    	let Tbody_Regalos  = Tabla_Regalos.getElementsByTagName("tbody")[0];

    	let Tabla_Division = document.getElementById("fetchDivision");
    	let Tbody_Division = Tabla_Division.getElementsByTagName("tbody")[0];

    	let Tabla_Linea    = document.getElementById("fetchLinea");
    	let Tbody_Linea    = Tabla_Linea.getElementsByTagName("tbody")[0];

    	let Tabla_Sublinea = document.getElementById("fetchSublinea");
    	let Tbody_Sublinea = Tabla_Sublinea.getElementsByTagName("tbody")[0];

    	let Tabla_Sucursal = document.getElementById("fetchSucursalOferta");
    	let Tbody_Sucursal = Tabla_Sucursal.getElementsByTagName("tbody")[0];

		if (Nombre != null && Nombre != "" && Inicial != null && Inicial != "" && Final != null && Final != "" && Compra != null && Compra != ""){
			
			if (Tbody_Sucursal.rows.length > 0){

				if (Tbody_Producto.rows.length > 0){
					for (var i = 0; i < Tbody_Producto.rows.length ; i++){		      
					    array_Producto.push(Tbody_Producto.rows[i].cells[0].innerHTML);
				    }
				}
				
				if (Tbody_Clientes.rows.length > 0){
				    for (var i = 0; i < Tbody_Clientes.rows.length ; i++){		      
					    array_Clientes.push(Tbody_Clientes.rows[i].cells[0].innerHTML);
				    }
				}

				if (Tbody_Division.rows.length > 0){
				    for (var i = 0; i < Tbody_Division.rows.length ; i++){		      
					    array_Division.push(Tbody_Division.rows[i].cells[0].innerHTML);
				    }
				}

				if (Tbody_Linea.rows.length > 0){
				    for (var i = 0; i < Tbody_Linea.rows.length ; i++){		      
					    array_Linea.push(Tbody_Linea.rows[i].cells[0].innerHTML);
				    }
				}

				if (Tbody_Sublinea.rows.length > 0){
				    for (var i = 0; i < Tbody_Sublinea.rows.length ; i++){		      
					    array_Sublinea.push(Tbody_Sublinea.rows[i].cells[0].innerHTML);
				    }
				}

				if (Tbody_Sucursal.rows.length > 0){
				    for (var i = 0; i < Tbody_Sucursal.rows.length ; i++){		      
					    array_Sucursal.push(Tbody_Sucursal.rows[i].cells[0].innerHTML);
				    }
				}

				if (Tipo == 'Descuento'){

					let Descuento = $("#txtDescuento").val();

					if (Descuento != null && Descuento != ""){

						let formData = new FormData();
			            formData.append("Nombre", Nombre);
			            formData.append("Tipo_Desc", 1);
			            formData.append("Tipo_Regalo", 0);
			            formData.append("Desc", Descuento);
			            formData.append("Vigencia_inicial", Inicial);
			            formData.append("Vigencia_final", Final);
			            formData.append("Compra_req", Compra);
			            formData.append("Excluir", Excluir);
			            formData.append("Status", "Activo");
			            formData.append("Tipo", Tipo);

			            formData.append("Distribuidor", array_Clientes);
			            formData.append("Producto", array_Producto);
			            formData.append("Sucursal", array_Sucursal);
			            formData.append("Division", array_Division);
			            formData.append("Linea", array_Linea);
			            formData.append("Sublinea", array_Sublinea);

			            $.ajax({
			                url: window.dir + 'index.php/Controller_Promociones/AddOferta',
			                type: 'POST',
			                processData: false,
			                contentType: false,
			                timeout: 800000,
			                data: formData,
			                beforeSend : function ()
			                {
			                    $('#loadingHeader').css('display','');
				                $('#btnAddRegalo').css('display','none');
				                $('#loadingAddRegalo').css('display','');
				                $('#btnAddDistriOferta').css('display','none');
				                $('#loadingAddDistriOferta').css('display','');
				                $('#btnAddDivisionOferta').css('display','none');
				                $('#loadingAddDivisionOferta').css('display','');
				                $('#btnAddLineaOferta').css('display','none');
				                $('#loadingAddLineaOferta').css('display','');
				                $('#btnAddSublineaOferta').css('display','none');
				                $('#loadingAddSublineaOferta').css('display','');
				                $('#btnAddProductoOferta').css('display','none');
				                $('#loadingAddProductoOferta').css('display','');
				                $('#btnAddSucursalOferta').css('display','none');
				                $('#loadingAddSucursalOferta').css('display','');
				                $('#btnCerrarAddOferta').css('display','none');
				                $('#loadingCerrarAddOferta').css('display','');
				                $('#btnAddOferta').css('display','none');
				                $('#loadingAddOferta').css('display','');
			                },
			                success: function(data)
			                {
				                switch(parseInt(data.trim())){

                                    case 0:
                                        toastr.error('Ocurrio un error al agregar la oferta', 'Error');
                                    break;

                                    case 1:
                                        Limpiar(3);
                                        toastr.success('Oferta agregada con exito', 'Correcto');
                                    break;

                                    default:
                                        toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                                }
				            }
			            })
			            .done(function() {
			                $('#loadingHeader').css('display','none');
				            $('#btnAddRegalo').css('display','');
				            $('#loadingAddRegalo').css('display','none');
				            $('#btnAddDistriOferta').css('display','');
				            $('#loadingAddDistriOferta').css('display','none');
				            $('#btnAddDivisionOferta').css('display','');
				            $('#loadingAddDivisionOferta').css('display','none');
				            $('#btnAddLineaOferta').css('display','');
				            $('#loadingAddLineaOferta').css('display','none');
				            $('#btnAddSublineaOferta').css('display','');
				            $('#loadingAddSublineaOferta').css('display','none');
				            $('#btnAddProductoOferta').css('display','');
				            $('#loadingAddProductoOferta').css('display','none');
				            $('#btnAddSucursalOferta').css('display','');
				            $('#loadingAddSucursalOferta').css('display','none');
				            $('#btnCerrarAddOferta').css('display','');
				            $('#loadingCerrarAddOferta').css('display','none');
				            $('#btnAddOferta').css('display','');
				            $('#loadingAddOferta').css('display','none');
			            })
			            .fail(function(jqXHR, textStatus, errorThrown) {
			            	$('#loadingHeader').css('display','none');
				            $('#btnAddRegalo').css('display','');
				            $('#loadingAddRegalo').css('display','none');
				            $('#btnAddDistriOferta').css('display','');
				            $('#loadingAddDistriOferta').css('display','none');
				            $('#btnAddDivisionOferta').css('display','');
				            $('#loadingAddDivisionOferta').css('display','none');
				            $('#btnAddLineaOferta').css('display','');
				            $('#loadingAddLineaOferta').css('display','none');
				            $('#btnAddSublineaOferta').css('display','');
				            $('#loadingAddSublineaOferta').css('display','none');
				            $('#btnAddProductoOferta').css('display','');
				            $('#loadingAddProductoOferta').css('display','none');
				            $('#btnAddSucursalOferta').css('display','');
				            $('#loadingAddSucursalOferta').css('display','none');
				            $('#btnCerrarAddOferta').css('display','');
				            $('#loadingCerrarAddOferta').css('display','none');
				            $('#btnAddOferta').css('display','');
				            $('#loadingAddOferta').css('display','none');
				            $("#modalErrorConexion").modal("show");
			        	})
			            .always(function() {
			            });
					}
					else{
					    toastr.warning('Debe de capturar el descuento de la oferta', 'Advertencia');
					}
				}
				else{

					if (Tbody_Regalos.rows.length > 0){

						for (var i = 0; i < Tbody_Regalos.rows.length ; i++){		      
							array_Regalos.push(Tbody_Regalos.rows[i].cells[0].innerHTML);
						}

					    let formData = new FormData();
			            formData.append("Nombre", Nombre);
			            formData.append("Tipo_Desc", 0);
			            formData.append("Tipo_Regalo", 1);
			            formData.append("Desc", 0);
			            formData.append("Vigencia_inicial", Inicial);
			            formData.append("Vigencia_final", Final);
			            formData.append("Compra_req", Compra);
			            formData.append("Excluir", Excluir);
			            formData.append("Status", "Activo");
			            formData.append("Tipo", Tipo);

			            formData.append("Distribuidor", array_Clientes);
			            formData.append("Producto", array_Producto);
			            formData.append("Sucursal", array_Sucursal);
			            formData.append("Division", array_Division);
			            formData.append("Linea", array_Linea);
			            formData.append("Sublinea", array_Sublinea);
			            formData.append("Regalo", array_Regalos);

					    $.ajax({
			                url: window.dir + 'index.php/Controller_Promociones/AddOferta',
			                type: 'POST',
			                processData: false,  // tell jQuery not to process the data
			                contentType: false,
			                timeout: 800000,
			                data: formData,
			                beforeSend : function ()
			                {
			                    $('#loadingHeader').css('display','');
				                $('#btnAddRegalo').css('display','none');
				                $('#loadingAddRegalo').css('display','');
				                $('#btnAddDistriOferta').css('display','none');
				                $('#loadingAddDistriOferta').css('display','');
				                $('#btnAddDivisionOferta').css('display','none');
				                $('#loadingAddDivisionOferta').css('display','');
				                $('#btnAddLineaOferta').css('display','none');
				                $('#loadingAddLineaOferta').css('display','');
				                $('#btnAddSublineaOferta').css('display','none');
				                $('#loadingAddSublineaOferta').css('display','');
				                $('#btnAddProductoOferta').css('display','none');
				                $('#loadingAddProductoOferta').css('display','');
				                $('#btnAddSucursalOferta').css('display','none');
				                $('#loadingAddSucursalOferta').css('display','');
				                $('#btnCerrarAddOferta').css('display','none');
				                $('#loadingCerrarAddOferta').css('display','');
				                $('#btnAddOferta').css('display','none');
				                $('#loadingAddOferta').css('display','');
			                },
			                success: function(data)
			                {
				                switch(parseInt(data.trim())){

                                    case 0:
                                        toastr.error('Ocurrio un error al agregar la oferta', 'Error');
                                    break;

                                    case 1:
                                        Limpiar(3);
                                        toastr.success('Oferta agregada con exito', 'Correcto');
                                    break;

                                    default:
                                        toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                                }
				            }
			            })
			            .done(function() {
			                $('#loadingHeader').css('display','none');
				            $('#btnAddRegalo').css('display','');
				            $('#loadingAddRegalo').css('display','none');
				            $('#btnAddDistriOferta').css('display','');
				            $('#loadingAddDistriOferta').css('display','none');
				            $('#btnAddDivisionOferta').css('display','');
				            $('#loadingAddDivisionOferta').css('display','none');
				            $('#btnAddLineaOferta').css('display','');
				            $('#loadingAddLineaOferta').css('display','none');
				            $('#btnAddSublineaOferta').css('display','');
				            $('#loadingAddSublineaOferta').css('display','none');
				            $('#btnAddProductoOferta').css('display','');
				            $('#loadingAddProductoOferta').css('display','none');
				            $('#btnAddSucursalOferta').css('display','');
				            $('#loadingAddSucursalOferta').css('display','none');
				            $('#btnCerrarAddOferta').css('display','');
				            $('#loadingCerrarAddOferta').css('display','none');
				            $('#btnAddOferta').css('display','');
				            $('#loadingAddOferta').css('display','none');
			            })
			            .fail(function(jqXHR, textStatus, errorThrown) {
			            	$('#loadingHeader').css('display','none');
				            $('#btnAddRegalo').css('display','');
				            $('#loadingAddRegalo').css('display','none');
				            $('#btnAddDistriOferta').css('display','');
				            $('#loadingAddDistriOferta').css('display','none');
				            $('#btnAddDivisionOferta').css('display','');
				            $('#loadingAddDivisionOferta').css('display','none');
				            $('#btnAddLineaOferta').css('display','');
				            $('#loadingAddLineaOferta').css('display','none');
				            $('#btnAddSublineaOferta').css('display','');
				            $('#loadingAddSublineaOferta').css('display','none');
				            $('#btnAddProductoOferta').css('display','');
				            $('#loadingAddProductoOferta').css('display','none');
				            $('#btnAddSucursalOferta').css('display','');
				            $('#loadingAddSucursalOferta').css('display','none');
				            $('#btnCerrarAddOferta').css('display','');
				            $('#loadingCerrarAddOferta').css('display','none');
				            $('#btnAddOferta').css('display','');
				            $('#loadingAddOferta').css('display','none');
				            $("#modalErrorConexion").modal("show");
			        	})
			            .always(function() {
			            });
					}
					else{
					    toastr.warning('Debe de agregar por lo menos un regalo', 'Advertencia');
					}
				}
			}
			else{
	            toastr.warning('Debe de seleccionar por lo menos una sucursal', 'Advertencia');
			}	
		}
		else{
	        toastr.warning('Algúnos campos obligatorios estan vacios', 'Advertencia');
		}
	});

	/////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////// EDITAR OFERTAS /////////////////////////////////

	/// Radio Descuento checked ///
	$("#radio_Descuento_Editar").click(function(event) {
    	
    	if ($('#radio_Descuento_Editar').prop('checked')){

		    let table = document.getElementById("fetchRegalo");
    		let tbody = table.getElementsByTagName("tbody")[0];

    		if (tbody.rows.length > 0){
    		 	swal({
					  title: "¿Esta segúro?",
					  text: "Se encuentran regalos agregados a la oferta si continúa todos los regalos agregados previamente seran eliminas de la tabla \n \n \n ¿Desea Continuar con el proceso?",
					  icon: "warning",
					  buttons: true,
					  dangerMode: true,
					})
					.then((willDelete) => {
					  	if (willDelete) {

					    	tbody.innerHTML = "";
					    	$("#divRegaloEditar").css('display','none');
		    				$("#divDescuentoEditar").css('display','');
		    				TIPOOFERTA = "Descuento";
					  	} 
					  	else{
					  		$("#radio_Regalo_Editar").prop('checked', true);
					    	$("#divRegaloEditar").css('display','');
					    	$("#divDescuentoEditar").css('display','none');

					    	TIPOOFERTA = "Regalo";
					  	}
					});
    		}
    		else{
    		 	$("#divRegaloEditar").css('display','none');
		    	$("#divDescuentoEditar").css('display','');
		    	TIPOOFERTA = "Descuento";
		    }
		}
    });

	/// Radio Regalo checked ///
	$("#radio_Regalo_Editar").click(function(event) {
    	
    	if ($('#radio_Regalo_Editar').prop('checked')){
    		$("#txtDescuento_Editar").val(0);
		    $("#divRegaloEditar").css('display','');
		    $("#divDescuentoEditar").css('display','none');
		    TIPOOFERTA = "Regalo";
		}

    });

	/// Excluir Distribuidor Oferta ///
    $("#check_Excluir_Oferta_Editar").click(function(event) {
    	
    	if ($('#check_Excluir_Oferta_Editar').prop('checked')){
		    $("#divExcluirOfertaEditar").css('display','');
		}
		else{

			let table = document.getElementById("fetchDistribuidorOfertaEditar");
    		let tbody = table.getElementsByTagName("tbody")[0];

    		if (tbody.rows.length > 0)
    		{
    		 	swal({
				  	title: "¿Esta segúro?",
				  	text: "Se encuentran distribuidores agregados a la oferta si continúa todos los distribuidores agregados previamente seran eliminas de la tabla \n \n \n ¿Desea Continuar con el proceso?",
				  	icon: "warning",
				  	buttons: true,
				  	dangerMode: true,
				})
				.then((willDelete) => {
				  	if (willDelete) {

				    	tbody.innerHTML = "";
				    	$("#divExcluirOfertaEditar").css('display','none');

				  	} 
				  	else{
				  	$("#check_Excluir_Oferta_Editar").prop('checked', true);
				    $("#divExcluirOfertaEditar").css('display','');
				  	}
				});
    		}
    		else{
    		 	$("#divExcluirOfertaEditar").css('display','none');
    		}
		}
    });

    // Abrir Modal Editar Oferta //
    $("#btnEditarOferta").click(function(event) {
    	
    	if (FETCHOFERTAS != null){

			let formData = new FormData();
	        formData.append("idOferta", FETCHOFERTAS.childNodes[0].innerHTML);

	        $.ajax({
                url: window.dir + 'index.php/Controller_Promociones/getDetalleOferta',
                type: 'POST',
                processData: false,
                contentType: false,
                timeout: 800000,
                data: formData,
                beforeSend : function ()
                {
                    $('#loadingHeader').css('display','');
                    $('#btnAgregarOferta').css('display','none');
                    $('#loadingAgregarOferta').css('display','');
                    $('#btnEditarOferta').css('display','none');
                    $('#loadingEditarOferta').css('display','');
                    $('#btnEliminarOferta').css('display','none');
                    $('#loadingEliminarOferta').css('display','');
                },
                success: function(data)
                {
	                let parsed = JSON.parse(data);

			        if (parsed != null && parsed != ""){

		            	let Regalo = document.getElementById("fetchRegalosEditar"); 
						$('#fetchRegalosEditar').DataTable().destroy();
					    Regalo.tBodies[0].innerHTML = "";

					    let Cliente = document.getElementById("fetchDistribuidorOfertaEditar"); 
						$('#fetchDistribuidorOfertaEditar').DataTable().destroy();
					    Cliente.tBodies[0].innerHTML = "";

					    let Division = document.getElementById("fetchDivisionEditar"); 
						$('#fetchDivisionEditar').DataTable().destroy();
					    Division.tBodies[0].innerHTML = "";

					    let Linea = document.getElementById("fetchLineaEditar"); 
						$('#fetchLineaEditar').DataTable().destroy();
					    Linea.tBodies[0].innerHTML = "";

					    let Sublinea = document.getElementById("fetchSublineaEditar"); 
						$('#fetchSublineaEditar').DataTable().destroy();
					    Sublinea.tBodies[0].innerHTML = "";

					    let Producto = document.getElementById("fetchProductosOfertaEditar"); 
						$('#fetchProductosOfertaEditar').DataTable().destroy();
					    Producto.tBodies[0].innerHTML = "";

					    let Sucursales = document.getElementById("fetchSucursalOfertaEditar"); 
						$('#fetchSucursalOfertaEditar').DataTable().destroy();
					    Sucursales.tBodies[0].innerHTML = "";

		            	let Regalo_table = document.getElementById("fetchRegalosEditar"); 
						let tbody_Regalo = Regalo_table.tBodies[0];

						let Distribuidor_table = document.getElementById("fetchDistribuidorOfertaEditar"); 
						let tbody_Distribuidor = Distribuidor_table.tBodies[0];

						let Division_table = document.getElementById("fetchDivisionEditar"); 
						let tbody_Division = Division_table.tBodies[0];

						let Linea_table = document.getElementById("fetchLineaEditar"); 
						let tbody_Linea = Linea_table.tBodies[0];

						let Sublinea_table = document.getElementById("fetchSublineaEditar"); 
						let tbody_Sublinea = Sublinea_table.tBodies[0];

						let Producto_table = document.getElementById("fetchProductosOfertaEditar"); 
						let tbody_Producto = Producto_table.tBodies[0];

						let Sucursal_table = document.getElementById("fetchSucursalOfertaEditar"); 
						let tbody_Sucursal = Sucursal_table.tBodies[0];

						$("#txt_Nombre_Oferta_Editar").val(parsed['Oferta'][0]['Nombre']);
						$("#Vigencia_Inicial_Oferta_Editar").val(parsed['Oferta'][0]['Vigencia_inicial']);
						$("#Vigencia_Final_Oferta_Editar").val(parsed['Oferta'][0]['Vigencia_final']);
						$("#txtCompra_Requerida_Editar").val(parsed['Oferta'][0]['Compra_req']);
						$("#txtDescuento_Editar").val(parsed['Oferta'][0]['Desc']);

						if (parsed['Oferta'][0]['Tipo_Desc'] == 1){

							$("#radio_Descuento_Editar").prop('checked', true);
							$("#radio_Regalo_Editar").prop('checked', false);
							$("#divRegaloEditar").css('display','none');
							$("#divDescuentoEditar").css('display','');
						}
						else if (parsed['Oferta'][0]['Tipo_Regalo'] == 1){

							$("#radio_Regalo_Editar").prop('checked', true);
							$("#radio_Descuento_Editar").prop('checked', false);
							$("#divRegaloEditar").css('display','');
							$("#divDescuentoEditar").css('display','none');

							for (var i = 0; i < parsed['Regalo'].length; i++){

						       	let row  = tbody_Regalo.insertRow(i);
					           	let cel1 = row.insertCell(0);
					           	let cel2 = row.insertCell(1);
					           	let cel3 = row.insertCell(2);

					           	cel1.innerHTML = parsed['Regalo'][i]['ID_Catalogo'];
							   	cel2.innerHTML = parsed['Regalo'][i]['Producto'];

							   	let boton = document.createElement("button");
							    boton.classList.add('btn', 'btn-danger');
							    boton.addEventListener("click",deleteRegaloEditar);
							    cel3.appendChild(boton);

							    let icono = document.createElement("span");
							    icono.classList.add('glyphicon', 'glyphicon-trash');
							    boton.appendChild(icono);
							}
						}

						if (parsed['Oferta'][0]['Excluir_Distribuidores'] == 1){

							$("#check_Excluir_Oferta_Editar").prop('checked',true);
							$("#divExcluirOfertaEditar").css('display', '');

							for (var i = 0; i < parsed['Cliente'].length; i++){

						       	let row  = tbody_Distribuidor.insertRow(i);
					           	let cel1 = row.insertCell(0);
					           	let cel2 = row.insertCell(1);
					           	let cel3 = row.insertCell(2);

					           	cel1.innerHTML = parsed['Cliente'][i]['ID_Cliente'];
							   	cel2.innerHTML = parsed['Cliente'][i]['Cliente'];

							   	let boton = document.createElement("button");
							    boton.classList.add('btn', 'btn-danger');
							    boton.addEventListener("click",deleteDistribuidorOfertaEditar);
							    cel3.appendChild(boton);

							    let icono = document.createElement("span");
							    icono.classList.add('glyphicon', 'glyphicon-trash');
							    boton.appendChild(icono);
							}
						}
						else{
							$("#check_Excluir_Oferta_Editar").prop('checked',false);
							$("#divExcluirOfertaEditar").css('display', 'none');
						}

						if (parsed['Oferta'][0]['Status'] == 'Inactivo'){
	                		$("#check_Status_Oferta_Editar").prop('checked', true);
	                	}
	                	else{
	                		$("#check_Status_Oferta_Editar").prop('checked', false);
	                	}

	                	for (var i = 0; i < parsed['Division'].length; i++){

					       	let row  = tbody_Division.insertRow(i);
				           	let cel1 = row.insertCell(0);
				           	let cel2 = row.insertCell(1);
				           	let cel3 = row.insertCell(2);

				           	cel1.innerHTML = parsed['Division'][i]['ID_Division'];
						   	cel2.innerHTML = parsed['Division'][i]['Division'];

						   	let boton = document.createElement("button");
						    boton.classList.add('btn', 'btn-danger');
						    boton.addEventListener("click",deleteDivisionEditar);
						    cel3.appendChild(boton);

						    let icono = document.createElement("span");
						    icono.classList.add('glyphicon', 'glyphicon-trash');
						    boton.appendChild(icono);
						}

						for (var i = 0; i < parsed['Linea'].length; i++){

					       	let row  = tbody_Linea.insertRow(i);
				           	let cel1 = row.insertCell(0);
				           	let cel2 = row.insertCell(1);
				           	let cel3 = row.insertCell(2);

				           	cel1.innerHTML = parsed['Linea'][i]['ID_Linea'];
						   	cel2.innerHTML = parsed['Linea'][i]['Linea'];

						   	let boton = document.createElement("button");
						    boton.classList.add('btn', 'btn-danger');
						    boton.addEventListener("click",deleteLineaEditar);
						    cel3.appendChild(boton);

						    let icono = document.createElement("span");
						    icono.classList.add('glyphicon', 'glyphicon-trash');
						    boton.appendChild(icono);
						}

						for (var i = 0; i < parsed['Sublinea'].length; i++){

					       	let row  = tbody_Sublinea.insertRow(i);
				           	let cel1 = row.insertCell(0);
				           	let cel2 = row.insertCell(1);
				           	let cel3 = row.insertCell(2);

				           	cel1.innerHTML = parsed['Sublinea'][i]['ID_Sublinea'];
						   	cel2.innerHTML = parsed['Sublinea'][i]['Sublinea'];

						   	let boton = document.createElement("button");
						    boton.classList.add('btn', 'btn-danger');
						    boton.addEventListener("click",deleteSublineaEditar);
						    cel3.appendChild(boton);

						    let icono = document.createElement("span");
						    icono.classList.add('glyphicon', 'glyphicon-trash');
						    boton.appendChild(icono);
						}

						for (var i = 0; i < parsed['Producto'].length; i++){

					       	let row  = tbody_Producto.insertRow(i);
				           	let cel1 = row.insertCell(0);
				           	let cel2 = row.insertCell(1);
				           	let cel3 = row.insertCell(2);

				           	cel1.innerHTML = parsed['Producto'][i]['ID_Producto'];
						   	cel2.innerHTML = parsed['Producto'][i]['Producto'];

						   	let boton = document.createElement("button");
						    boton.classList.add('btn', 'btn-danger');
						    boton.addEventListener("click",deleteProductosOfertaEditar);
						    cel3.appendChild(boton);

						    let icono = document.createElement("span");
						    icono.classList.add('glyphicon', 'glyphicon-trash');
						    boton.appendChild(icono);
						}

						for (var i = 0; i < parsed['Sucursal'].length; i++){

					       	let row  = tbody_Sucursal.insertRow(i);
				           	let cel1 = row.insertCell(0);
				           	let cel2 = row.insertCell(1);
				           	let cel3 = row.insertCell(2);

				           	cel1.innerHTML = parsed['Sucursal'][i]['ID_Sucursal'];
						   	cel2.innerHTML = parsed['Sucursal'][i]['Sucursal'];

						   	let boton = document.createElement("button");
						    boton.classList.add('btn', 'btn-danger');
						    boton.addEventListener("click",deleteSucursalOfertaEditar);
						    cel3.appendChild(boton);

						    let icono = document.createElement("span");
						    icono.classList.add('glyphicon', 'glyphicon-trash');
						    boton.appendChild(icono);
						}

	                	$("#modalEditarOferta").modal("show");
			        }
	            }
            })
            .done(function() {
                $('#loadingHeader').css('display','none');
                $('#btnAgregarOferta').css('display','');
                $('#loadingAgregarOferta').css('display','none');
                $('#btnEditarOferta').css('display','');
                $('#loadingEditarOferta').css('display','none');
                $('#btnEliminarOferta').css('display','');
                $('#loadingEliminarOferta').css('display','none');
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
            	$('#loadingHeader').css('display','none');
                $('#btnAgregarOferta').css('display','');
                $('#loadingAgregarOferta').css('display','none');
                $('#btnEditarOferta').css('display','');
                $('#loadingEditarOferta').css('display','none');
                $('#btnEliminarOferta').css('display','');
                $('#loadingEliminarOferta').css('display','none');
                $("#modalErrorConexion").modal("show");
        	})
            .always(function() {
            });
		}
		else{
	        toastr.warning('Seleccione una oferta', 'Advertencia');
		}
    });

	//////////////////////////////////////////////////////////////////////////////
	// Boton Agregar Regalo //
    $("#btnUpdateRegalo").click(function(event) {
	
        $.ajax({
            url: window.dir + 'index.php/Controller_Productos/getProductos',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnUpdateRegalo').css('display','none');
                $('#loadingUpdateRegalo').css('display','');
                $('#btnUpdateDistriOferta').css('display','none');
                $('#loadingUpdateDistriOferta').css('display','');
                $('#btnUpdateDivisionOferta').css('display','none');
                $('#loadingUpdateDivisionOferta').css('display','');
                $('#btnUpdateLineaOferta').css('display','none');
                $('#loadingUpdateLineaOferta').css('display','');
                $('#btnUpdateSublineaOferta').css('display','none');
                $('#loadingUpdateSublineaOferta').css('display','');
                $('#btnUpdateProductoOferta').css('display','none');
                $('#loadingUpdateProductoOferta').css('display','');
                $('#btnUpdateSucursalOferta').css('display','none');
                $('#loadingUpdateSucursalOferta').css('display','');
                $('#btnCerrarUpdateOferta').css('display','none');
                $('#loadingCerrarUpdateOferta').css('display','');
                $('#btnUpdateOferta').css('display','none');
                $('#loadingUpdateOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalRegalosEditar").modal("show");

	            if (parsed != null && parsed != ""){

            		let table   = document.getElementById("fetchListRegalosEditar"); 
            		let tbody   = table.tBodies[0];

            		$('#fetchListRegalosEditar').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

            		for (var i = 0; i < parsed.length; i++){

		                let row  = tbody.insertRow(i);
		                let cel1 = row.insertCell(0);
		                let cel2 = row.insertCell(1);
		                let cel3 = row.insertCell(2);

		                cel1.innerHTML = parsed[i]['ID'];
		                cel2.innerHTML = parsed[i]['Codigo'];
		                cel3.innerHTML = parsed[i]['Producto'];
		            }

		            fetch("fetchListRegalosEditar");
	            }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnUpdateRegalo').css('display','');
            $('#loadingUpdateRegalo').css('display','none');
            $('#btnUpdateDistriOferta').css('display','');
            $('#loadingUpdateDistriOferta').css('display','none');
            $('#btnUpdateDivisionOferta').css('display','');
            $('#loadingUpdateDivisionOferta').css('display','none');
            $('#btnUpdateLineaOferta').css('display','');
            $('#loadingUpdateLineaOferta').css('display','none');
            $('#btnUpdateSublineaOferta').css('display','');
            $('#loadingUpdateSublineaOferta').css('display','none');
            $('#btnUpdateProductoOferta').css('display','');
            $('#loadingUpdateProductoOferta').css('display','none');
            $('#btnUpdateSucursalOferta').css('display','');
            $('#loadingUpdateSucursalOferta').css('display','none');
            $('#btnCerrarUpdateOferta').css('display','');
            $('#loadingCerrarUpdateOferta').css('display','none');
            $('#btnUpdateOferta').css('display','');
            $('#loadingUpdateOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnUpdateRegalo').css('display','');
            $('#loadingUpdateRegalo').css('display','none');
            $('#btnUpdateDistriOferta').css('display','');
            $('#loadingUpdateDistriOferta').css('display','none');
            $('#btnUpdateDivisionOferta').css('display','');
            $('#loadingUpdateDivisionOferta').css('display','none');
            $('#btnUpdateLineaOferta').css('display','');
            $('#loadingUpdateLineaOferta').css('display','none');
            $('#btnUpdateSublineaOferta').css('display','');
            $('#loadingUpdateSublineaOferta').css('display','none');
            $('#btnUpdateProductoOferta').css('display','');
            $('#loadingUpdateProductoOferta').css('display','none');
            $('#btnUpdateSucursalOferta').css('display','');
            $('#loadingUpdateSucursalOferta').css('display','none');
            $('#btnCerrarUpdateOferta').css('display','');
            $('#loadingCerrarUpdateOferta').css('display','none');
            $('#btnUpdateOferta').css('display','');
            $('#loadingUpdateOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});

	// Acción click fetchListRegalos //
    document.getElementById("fetchListRegalosEditar").onclick = function(e)
    {
        FETCHLISTREGALOSEDITAR = e.target.parentNode;
    }

	/// Agregar fetchListRegalos ///
	$("#btnUpdateListProductoRegalo").click(function(event) {
    	
    	if (FETCHLISTREGALOSEDITAR != null){

    		let table = document.getElementById("fetchRegalosEditar"); 
			let tbody = table.tBodies[0];

	      	for (var i = 0; i <= 0; i++){

		        let row  = tbody.insertRow(i);
	            let cel1 = row.insertCell(0);
	            let cel2 = row.insertCell(1);
	            let cel3 = row.insertCell(2);

	            cel1.innerHTML = FETCHLISTREGALOSEDITAR.childNodes[0].innerHTML;
			    cel2.innerHTML = FETCHLISTREGALOSEDITAR.childNodes[2].innerHTML;

			   	let boton = document.createElement("button");
			    boton.classList.add('btn', 'btn-danger');
			    boton.addEventListener("click",deleteRegaloEditar);
			    cel3.appendChild(boton);

			    let icono = document.createElement("span");
			    icono.classList.add('glyphicon', 'glyphicon-trash');
			    boton.appendChild(icono);

	            toastr.success('Producto agregado con exito', 'Correcto');
			}
    	}
    	else{
	        toastr.warning('Seleccione un producto', 'Advertencia');
    	}

    });

    // Acción click fetchListProductoOferta //
    document.getElementById("fetchListProductoOfertaEditar").onclick = function(e)
    {
        FETCHLISTPRODUCTOOFERTAEDITAR = e.target.parentNode;
    }

    $("#btnUpdateProductoOferta").click(function(event) {
	
        $.ajax({
            url: window.dir + 'index.php/Controller_Productos/getProductos',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnUpdateRegalo').css('display','none');
                $('#loadingUpdateRegalo').css('display','');
                $('#btnUpdateDistriOferta').css('display','none');
                $('#loadingUpdateDistriOferta').css('display','');
                $('#btnUpdateDivisionOferta').css('display','none');
                $('#loadingUpdateDivisionOferta').css('display','');
                $('#btnUpdateLineaOferta').css('display','none');
                $('#loadingUpdateLineaOferta').css('display','');
                $('#btnUpdateSublineaOferta').css('display','none');
                $('#loadingUpdateSublineaOferta').css('display','');
                $('#btnUpdateProductoOferta').css('display','none');
                $('#loadingUpdateProductoOferta').css('display','');
                $('#btnUpdateSucursalOferta').css('display','none');
                $('#loadingUpdateSucursalOferta').css('display','');
                $('#btnCerrarUpdateOferta').css('display','none');
                $('#loadingCerrarUpdateOferta').css('display','');
                $('#btnUpdateOferta').css('display','none');
                $('#loadingUpdateOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalProductoOfertaEditar").modal("show");

	            if (parsed != null && parsed != ""){

            		let table = document.getElementById("fetchListProductoOfertaEditar"); 
            		let tbody = table.tBodies[0];

            		$('#fetchListProductoOfertaEditar').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++){

	                 	let row  = tbody.insertRow(i);
	                 	let cel1 = row.insertCell(0);
	                 	let cel2 = row.insertCell(1);
	                 	let cel3 = row.insertCell(2);

	                 	cel1.innerHTML = parsed[i]['ID'];
	                 	cel2.innerHTML = parsed[i]['Codigo'];
	                 	cel3.innerHTML = parsed[i]['Producto'];
	                }

		            fetch("fetchListProductoOfertaEditar");
	            }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnUpdateRegalo').css('display','');
            $('#loadingUpdateRegalo').css('display','none');
            $('#btnUpdateDistriOferta').css('display','');
            $('#loadingUpdateDistriOferta').css('display','none');
            $('#btnUpdateDivisionOferta').css('display','');
            $('#loadingUpdateDivisionOferta').css('display','none');
            $('#btnUpdateLineaOferta').css('display','');
            $('#loadingUpdateLineaOferta').css('display','none');
            $('#btnUpdateSublineaOferta').css('display','');
            $('#loadingUpdateSublineaOferta').css('display','none');
            $('#btnUpdateProductoOferta').css('display','');
            $('#loadingUpdateProductoOferta').css('display','none');
            $('#btnUpdateSucursalOferta').css('display','');
            $('#loadingUpdateSucursalOferta').css('display','none');
            $('#btnCerrarUpdateOferta').css('display','');
            $('#loadingCerrarUpdateOferta').css('display','none');
            $('#btnUpdateOferta').css('display','');
            $('#loadingUpdateOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnUpdateRegalo').css('display','');
            $('#loadingUpdateRegalo').css('display','none');
            $('#btnUpdateDistriOferta').css('display','');
            $('#loadingUpdateDistriOferta').css('display','none');
            $('#btnUpdateDivisionOferta').css('display','');
            $('#loadingUpdateDivisionOferta').css('display','none');
            $('#btnUpdateLineaOferta').css('display','');
            $('#loadingUpdateLineaOferta').css('display','none');
            $('#btnUpdateSublineaOferta').css('display','');
            $('#loadingUpdateSublineaOferta').css('display','none');
            $('#btnUpdateProductoOferta').css('display','');
            $('#loadingUpdateProductoOferta').css('display','none');
            $('#btnUpdateSucursalOferta').css('display','');
            $('#loadingUpdateSucursalOferta').css('display','none');
            $('#btnCerrarUpdateOferta').css('display','');
            $('#loadingCerrarUpdateOferta').css('display','none');
            $('#btnUpdateOferta').css('display','');
            $('#loadingUpdateOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});

	// Acción Agregar Producto //
	$("#btnUpdateListProductoOferta").click(function(event) {
	
		if (FETCHLISTPRODUCTOOFERTAEDITAR != null){

    		let table = document.getElementById("fetchProductosOfertaEditar"); 
			let tbody = table.tBodies[0];

	    	let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
				if (FETCHLISTPRODUCTOOFERTAEDITAR.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
					Contador ++;
				}
			}

			if (Contador > 0){
				toastr.error('El producto ya se encuentra agregado', 'Error');
			}
			else{

		      	for (var i = 0; i <= 0; i++){

			       	let row  = tbody.insertRow(i);
		           	let cel1 = row.insertCell(0);
		           	let cel2 = row.insertCell(1);
		           	let cel3 = row.insertCell(2);

		           	cel1.innerHTML = FETCHLISTPRODUCTOOFERTAEDITAR.childNodes[0].innerHTML;
				   	cel2.innerHTML = FETCHLISTPRODUCTOOFERTAEDITAR.childNodes[1].innerHTML;

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteProductosOfertaEditar);
				    cel3.appendChild(boton);

				    let icono = document.createElement("span");
				    icono.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono);

		            toastr.success('Producto agregado con exito', 'Correcto');
				}
		    }		
	    }
	    else{
		    toastr.warning('Seleccione una producto', 'Advertencia');
	    }
	});

	// Acción click fetchListSucursalOferta //
    document.getElementById("fetchListSucursalesOfertaEditar").onclick = function(e)
    {
        FETCHLISTSUCURSALESOFERTAEDITAR = e.target.parentNode;
    }

    // Boton Abrir Modal Sucursal Oferta //
	$("#btnUpdateSucursalOferta").click(function(event) {
	
        $.ajax({
            url: window.dir + 'index.php/Controller_Bodega/getBodega',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnUpdateRegalo').css('display','none');
                $('#loadingUpdateRegalo').css('display','');
                $('#btnUpdateDistriOferta').css('display','none');
                $('#loadingUpdateDistriOferta').css('display','');
                $('#btnUpdateDivisionOferta').css('display','none');
                $('#loadingUpdateDivisionOferta').css('display','');
                $('#btnUpdateLineaOferta').css('display','none');
                $('#loadingUpdateLineaOferta').css('display','');
                $('#btnUpdateSublineaOferta').css('display','none');
                $('#loadingUpdateSublineaOferta').css('display','');
                $('#btnUpdateProductoOferta').css('display','none');
                $('#loadingUpdateProductoOferta').css('display','');
                $('#btnUpdateSucursalOferta').css('display','none');
                $('#loadingUpdateSucursalOferta').css('display','');
                $('#btnCerrarUpdateOferta').css('display','none');
                $('#loadingCerrarUpdateOferta').css('display','');
                $('#btnUpdateOferta').css('display','none');
                $('#loadingUpdateOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalSucursalOfertaEditar").modal("show");

	            if (parsed != null && parsed != ""){

            		let table = document.getElementById("fetchListSucursalesOfertaEditar"); 
            		let tbody = table.tBodies[0];

            		$('#fetchListSucursalesOfertaEditar').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++){

	                 	let row  = tbody.insertRow(i);
	                 	let cel1 = row.insertCell(0);
	                 	let cel2 = row.insertCell(1);

	                 	cel1.innerHTML = parsed[i]['ID'];
	                 	cel2.innerHTML = parsed[i]['Sucursal'];	                
	                }

	                fetch("fetchListSucursalesOfertaEditar");
	            }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnUpdateRegalo').css('display','');
            $('#loadingUpdateRegalo').css('display','none');
            $('#btnUpdateDistriOferta').css('display','');
            $('#loadingUpdateDistriOferta').css('display','none');
            $('#btnUpdateDivisionOferta').css('display','');
            $('#loadingUpdateDivisionOferta').css('display','none');
            $('#btnUpdateLineaOferta').css('display','');
            $('#loadingUpdateLineaOferta').css('display','none');
            $('#btnUpdateSublineaOferta').css('display','');
            $('#loadingUpdateSublineaOferta').css('display','none');
            $('#btnUpdateProductoOferta').css('display','');
            $('#loadingUpdateProductoOferta').css('display','none');
            $('#btnUpdateSucursalOferta').css('display','');
            $('#loadingUpdateSucursalOferta').css('display','none');
            $('#btnCerrarUpdateOferta').css('display','');
            $('#loadingCerrarUpdateOferta').css('display','none');
            $('#btnUpdateOferta').css('display','');
            $('#loadingUpdateOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnUpdateRegalo').css('display','');
            $('#loadingUpdateRegalo').css('display','none');
            $('#btnUpdateDistriOferta').css('display','');
            $('#loadingUpdateDistriOferta').css('display','none');
            $('#btnUpdateDivisionOferta').css('display','');
            $('#loadingUpdateDivisionOferta').css('display','none');
            $('#btnUpdateLineaOferta').css('display','');
            $('#loadingUpdateLineaOferta').css('display','none');
            $('#btnUpdateSublineaOferta').css('display','');
            $('#loadingUpdateSublineaOferta').css('display','none');
            $('#btnUpdateProductoOferta').css('display','');
            $('#loadingUpdateProductoOferta').css('display','none');
            $('#btnUpdateSucursalOferta').css('display','');
            $('#loadingUpdateSucursalOferta').css('display','none');
            $('#btnCerrarUpdateOferta').css('display','');
            $('#loadingCerrarUpdateOferta').css('display','none');
            $('#btnUpdateOferta').css('display','');
            $('#loadingUpdateOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});
	
	// Acción Agregar Oferta //
	$("#btnUpdateListSucursalesOferta").click(function(event) {
	
		if (FETCHLISTSUCURSALESOFERTAEDITAR != null){

    		let table = document.getElementById("fetchSucursalOfertaEditar"); 
			let tbody = table.tBodies[0];

    		let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
			    if (FETCHLISTSUCURSALESOFERTAEDITAR.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
				    Contador ++;
			    }
		    }

			if (Contador > 0){
				toastr.error('El sucusal ya se encuentra agregado', 'Error');
			}
			else{
				      	
		      	for (var i = 0; i <= 0; i++){

			        let row  = tbody.insertRow(i);
		            let cel1 = row.insertCell(0);
		            let cel2 = row.insertCell(1);
		            let cel3 = row.insertCell(2);

		            cel1.innerHTML = FETCHLISTSUCURSALESOFERTAEDITAR.childNodes[0].innerHTML;
				    cel2.innerHTML = FETCHLISTSUCURSALESOFERTAEDITAR.childNodes[1].innerHTML;

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteSucursalOfertaEditar);
				    cel3.appendChild(boton);

				    let icono = document.createElement("span");
				    icono.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono);

		            toastr.success('Sucursal agregado con exito', 'Correcto');
				}
		    }
    	}
    	else{
	        toastr.warning('Seleccione una sucursal', 'Advertencia');
    	}
	});

	// Acción click fetchListDistribuidoresOfertas //
    document.getElementById("fetchListDistribuidorOfertaEditar").onclick = function(e)
    {
        FETCHLISTDISTRIBUIDOROFERTAEDITAR = e.target.parentNode;
    }

    // Boton agregar Distribuidor //
    $("#btnUpdateDistriOferta").click(function(event) {

        $.ajax({
            url: window.dir + 'index.php/Controller_Distribuidores/getDistribuidores',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnUpdateRegalo').css('display','none');
                $('#loadingUpdateRegalo').css('display','');
                $('#btnUpdateDistriOferta').css('display','none');
                $('#loadingUpdateDistriOferta').css('display','');
                $('#btnUpdateDivisionOferta').css('display','none');
                $('#loadingUpdateDivisionOferta').css('display','');
                $('#btnUpdateLineaOferta').css('display','none');
                $('#loadingUpdateLineaOferta').css('display','');
                $('#btnUpdateSublineaOferta').css('display','none');
                $('#loadingUpdateSublineaOferta').css('display','');
                $('#btnUpdateProductoOferta').css('display','none');
                $('#loadingUpdateProductoOferta').css('display','');
                $('#btnUpdateSucursalOferta').css('display','none');
                $('#loadingUpdateSucursalOferta').css('display','');
                $('#btnCerrarUpdateOferta').css('display','none');
                $('#loadingCerrarUpdateOferta').css('display','');
                $('#btnUpdateOferta').css('display','none');
                $('#loadingUpdateOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalDistribuidoresOfertasEditar").modal("show");

	            if (parsed != null && parsed != ""){

            		let table   = document.getElementById("fetchListDistribuidorOfertaEditar"); 
            		let tbody   = table.tBodies[0];

            		$('#fetchListDistribuidorOfertaEditar').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++){

	                	let row  = tbody.insertRow(i);
	                 	let cel1 = row.insertCell(0);
	                 	let cel2 = row.insertCell(1);

	                 	cel1.innerHTML = parsed[i]['ID'];
	                 	cel2.innerHTML = parsed[i]['Nombre'] + parsed[i]['Apellidos'];
	                }

		            fetch("fetchListDistribuidorOfertaEditar");
	            }
            }
        })
        .done(function() {
        	$('#loadingHeader').css('display','none');
            $('#btnUpdateRegalo').css('display','');
            $('#loadingUpdateRegalo').css('display','none');
            $('#btnUpdateDistriOferta').css('display','');
            $('#loadingUpdateDistriOferta').css('display','none');
            $('#btnUpdateDivisionOferta').css('display','');
            $('#loadingUpdateDivisionOferta').css('display','none');
            $('#btnUpdateLineaOferta').css('display','');
            $('#loadingUpdateLineaOferta').css('display','none');
            $('#btnUpdateSublineaOferta').css('display','');
            $('#loadingUpdateSublineaOferta').css('display','none');
            $('#btnUpdateProductoOferta').css('display','');
            $('#loadingUpdateProductoOferta').css('display','none');
            $('#btnUpdateSucursalOferta').css('display','');
            $('#loadingUpdateSucursalOferta').css('display','none');
            $('#btnCerrarUpdateOferta').css('display','');
            $('#loadingCerrarUpdateOferta').css('display','none');
            $('#btnUpdateOferta').css('display','');
            $('#loadingUpdateOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnUpdateRegalo').css('display','');
            $('#loadingUpdateRegalo').css('display','none');
            $('#btnUpdateDistriOferta').css('display','');
            $('#loadingUpdateDistriOferta').css('display','none');
            $('#btnUpdateDivisionOferta').css('display','');
            $('#loadingUpdateDivisionOferta').css('display','none');
            $('#btnUpdateLineaOferta').css('display','');
            $('#loadingUpdateLineaOferta').css('display','none');
            $('#btnUpdateSublineaOferta').css('display','');
            $('#loadingUpdateSublineaOferta').css('display','none');
            $('#btnUpdateProductoOferta').css('display','');
            $('#loadingUpdateProductoOferta').css('display','none');
            $('#btnUpdateSucursalOferta').css('display','');
            $('#loadingUpdateSucursalOferta').css('display','none');
            $('#btnCerrarUpdateOferta').css('display','');
            $('#loadingCerrarUpdateOferta').css('display','none');
            $('#btnUpdateOferta').css('display','');
            $('#loadingUpdateOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
    });

	/// Agregar Distribuidor Oferta ///
	$("#btnUpdateListDistribuidorOferta").click(function(event) {
    	
    	if (FETCHLISTDISTRIBUIDOROFERTAEDITAR != null){

    		let table = document.getElementById("fetchDistribuidorOfertaEditar"); 
			let tbody = table.tBodies[0];

    		let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
			    if (FETCHLISTDISTRIBUIDOROFERTAEDITAR.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
				    Contador ++;
			    }
		    }

			if (Contador > 0){
				toastr.error('El distribuidor ya se encuentra agregado', 'Error');
			}
			else{

		      	for (var i = 0; i <= 0; i++){
			       	let row  = tbody.insertRow(i);
		           	let cel1 = row.insertCell(0);
		           	let cel2 = row.insertCell(1);
		           	let cel3 = row.insertCell(2);

		           	cel1.innerHTML = FETCHLISTDISTRIBUIDOROFERTAEDITAR.childNodes[0].innerHTML;
				   	cel2.innerHTML = FETCHLISTDISTRIBUIDOROFERTAEDITAR.childNodes[1].innerHTML;

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteDistribuidorOfertaEditar);
				    cel3.appendChild(boton);

				    let icono = document.createElement("span");
				    icono.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono);

		            toastr.success('Distribuidor agregado con exito', 'Correcto');
				}
		    }
    	}
    	else{
	        toastr.warning('Seleccione a un distribuidor', 'Advertencia');
    	}
    });

    /// Boton Agregar División ///
    $("#btnUpdateDivisionOferta").click(function(event) {

        $.ajax({
            url: window.dir + 'index.php/Controller_Promociones/getDivision',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnUpdateRegalo').css('display','none');
                $('#loadingUpdateRegalo').css('display','');
                $('#btnUpdateDistriOferta').css('display','none');
                $('#loadingUpdateDistriOferta').css('display','');
                $('#btnUpdateDivisionOferta').css('display','none');
                $('#loadingUpdateDivisionOferta').css('display','');
                $('#btnUpdateLineaOferta').css('display','none');
                $('#loadingUpdateLineaOferta').css('display','');
                $('#btnUpdateSublineaOferta').css('display','none');
                $('#loadingUpdateSublineaOferta').css('display','');
                $('#btnUpdateProductoOferta').css('display','none');
                $('#loadingUpdateProductoOferta').css('display','');
                $('#btnUpdateSucursalOferta').css('display','none');
                $('#loadingUpdateSucursalOferta').css('display','');
                $('#btnCerrarUpdateOferta').css('display','none');
                $('#loadingCerrarUpdateOferta').css('display','');
                $('#btnUpdateOferta').css('display','none');
                $('#loadingUpdateOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalDivisionEditar").modal("show");

		        if (parsed != null && parsed != ""){

            		let table   = document.getElementById("fetchListDivisionEditar"); 
            		let tbody   = table.tBodies[0];

            		$('#fetchListDivisionEditar').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++){

	                	let row  = tbody.insertRow(i);
	                	let cel1 = row.insertCell(0);
	                	let cel2 = row.insertCell(1);

	                	cel1.innerHTML = parsed[i]['ID'];
	                	cel2.innerHTML = parsed[i]['Division'];
	                }

	                fetch("fetchListDivisionEditar");
		        }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnUpdateRegalo').css('display','');
            $('#loadingUpdateRegalo').css('display','none');
            $('#btnUpdateDistriOferta').css('display','');
            $('#loadingUpdateDistriOferta').css('display','none');
            $('#btnUpdateDivisionOferta').css('display','');
            $('#loadingUpdateDivisionOferta').css('display','none');
            $('#btnUpdateLineaOferta').css('display','');
            $('#loadingUpdateLineaOferta').css('display','none');
            $('#btnUpdateSublineaOferta').css('display','');
            $('#loadingUpdateSublineaOferta').css('display','none');
            $('#btnUpdateProductoOferta').css('display','');
            $('#loadingUpdateProductoOferta').css('display','none');
            $('#btnUpdateSucursalOferta').css('display','');
            $('#loadingUpdateSucursalOferta').css('display','none');
            $('#btnCerrarUpdateOferta').css('display','');
            $('#loadingCerrarUpdateOferta').css('display','none');
            $('#btnUpdateOferta').css('display','');
            $('#loadingUpdateOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnUpdateRegalo').css('display','');
            $('#loadingUpdateRegalo').css('display','none');
            $('#btnUpdateDistriOferta').css('display','');
            $('#loadingUpdateDistriOferta').css('display','none');
            $('#btnUpdateDivisionOferta').css('display','');
            $('#loadingUpdateDivisionOferta').css('display','none');
            $('#btnUpdateLineaOferta').css('display','');
            $('#loadingUpdateLineaOferta').css('display','none');
            $('#btnUpdateSublineaOferta').css('display','');
            $('#loadingUpdateSublineaOferta').css('display','none');
            $('#btnUpdateProductoOferta').css('display','');
            $('#loadingUpdateProductoOferta').css('display','none');
            $('#btnUpdateSucursalOferta').css('display','');
            $('#loadingUpdateSucursalOferta').css('display','none');
            $('#btnCerrarUpdateOferta').css('display','');
            $('#loadingCerrarUpdateOferta').css('display','none');
            $('#btnUpdateOferta').css('display','');
            $('#loadingUpdateOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});

    // Acción click fetchListDivisionOfertas //
    document.getElementById("fetchListDivisionEditar").onclick = function(e)
    {
        FETCHLISTDIVISIONEDITAR = e.target.parentNode;
    }

    /// Agregar Division //
    $("#btnUpdateListDivision").click(function(event) {
	
		if (FETCHLISTDIVISIONEDITAR != null){

    		let table       = document.getElementById("fetchDivisionEditar"); 
			let tbody 		 = table.tBodies[0];

    		let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
			    if (FETCHLISTDIVISIONEDITAR.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
				    Contador ++;
			    }
		    }

		    if (Contador > 0){
		            toastr.error('La división ya se encuentra agregado', 'Error');
		    }
		    else{

				for (var i = 0; i <= 0; i++){

			        let row  = tbody.insertRow(i);
		            let cel1 = row.insertCell(0);
		            let cel2 = row.insertCell(1);
		            let cel3 = row.insertCell(2);

		            cel1.innerHTML = FETCHLISTDIVISIONEDITAR.childNodes[0].innerHTML;
				    cel2.innerHTML = FETCHLISTDIVISIONEDITAR.childNodes[1].innerHTML;

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteDivisionEditar);
				    cel3.appendChild(boton);

				    let icono = document.createElement("span");
				    icono.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono);

		            toastr.success('División agregado con exito', 'Correcto');
				}
			}
    	}
    	else{
	        toastr.warning('Seleccione una División', 'Advertencia');
    	}
	});

	// Acción click fetchListLinea //
    document.getElementById("fetchListLineaEditar").onclick = function(e)
    {
        FETCHLISTLINEAEDITAR = e.target.parentNode;
    }

    // Boton agregar Lineas //
    $("#btnUpdateLineaOferta").click(function(event) {
        $.ajax({
            url: window.dir + 'index.php/Controller_Promociones/getLinea',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnUpdateRegalo').css('display','none');
                $('#loadingUpdateRegalo').css('display','');
                $('#btnUpdateDistriOferta').css('display','none');
                $('#loadingUpdateDistriOferta').css('display','');
                $('#btnUpdateDivisionOferta').css('display','none');
                $('#loadingUpdateDivisionOferta').css('display','');
                $('#btnUpdateLineaOferta').css('display','none');
                $('#loadingUpdateLineaOferta').css('display','');
                $('#btnUpdateSublineaOferta').css('display','none');
                $('#loadingUpdateSublineaOferta').css('display','');
                $('#btnUpdateProductoOferta').css('display','none');
                $('#loadingUpdateProductoOferta').css('display','');
                $('#btnUpdateSucursalOferta').css('display','none');
                $('#loadingUpdateSucursalOferta').css('display','');
                $('#btnCerrarUpdateOferta').css('display','none');
                $('#loadingCerrarUpdateOferta').css('display','');
                $('#btnUpdateOferta').css('display','none');
                $('#loadingUpdateOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalLineaEditar").modal("show");

	            if (parsed != null && parsed != ""){

            		let table   = document.getElementById("fetchListLineaEditar"); 
            		let tbody   = table.tBodies[0];

            		$('#fetchListLineaEditar').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++) 
	                {
	                 	let row  = tbody.insertRow(i);
	                 	let cel1 = row.insertCell(0);
	                 	let cel2 = row.insertCell(1);

	                 	cel1.innerHTML = parsed[i]['ID'];
	                 	cel2.innerHTML = parsed[i]['Linea'];
	                }

		            fetch("fetchListLineaEditar");
	            }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnUpdateRegalo').css('display','');
            $('#loadingUpdateRegalo').css('display','none');
            $('#btnUpdateDistriOferta').css('display','');
            $('#loadingUpdateDistriOferta').css('display','none');
            $('#btnUpdateDivisionOferta').css('display','');
            $('#loadingUpdateDivisionOferta').css('display','none');
            $('#btnUpdateLineaOferta').css('display','');
            $('#loadingUpdateLineaOferta').css('display','none');
            $('#btnUpdateSublineaOferta').css('display','');
            $('#loadingUpdateSublineaOferta').css('display','none');
            $('#btnUpdateProductoOferta').css('display','');
            $('#loadingUpdateProductoOferta').css('display','none');
            $('#btnUpdateSucursalOferta').css('display','');
            $('#loadingUpdateSucursalOferta').css('display','none');
            $('#btnCerrarUpdateOferta').css('display','');
            $('#loadingCerrarUpdateOferta').css('display','none');
            $('#btnUpdateOferta').css('display','');
            $('#loadingUpdateOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnUpdateRegalo').css('display','');
            $('#loadingUpdateRegalo').css('display','none');
            $('#btnUpdateDistriOferta').css('display','');
            $('#loadingUpdateDistriOferta').css('display','none');
            $('#btnUpdateDivisionOferta').css('display','');
            $('#loadingUpdateDivisionOferta').css('display','none');
            $('#btnUpdateLineaOferta').css('display','');
            $('#loadingUpdateLineaOferta').css('display','none');
            $('#btnUpdateSublineaOferta').css('display','');
            $('#loadingUpdateSublineaOferta').css('display','none');
            $('#btnUpdateProductoOferta').css('display','');
            $('#loadingUpdateProductoOferta').css('display','none');
            $('#btnUpdateSucursalOferta').css('display','');
            $('#loadingUpdateSucursalOferta').css('display','none');
            $('#btnCerrarUpdateOferta').css('display','');
            $('#loadingCerrarUpdateOferta').css('display','none');
            $('#btnUpdateOferta').css('display','');
            $('#loadingUpdateOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});

	// Agregar Linea //
	$("#btnUpdateListLinea").click(function(event) {
	
		if (FETCHLISTLINEAEDITAR != null){

    		let table = document.getElementById("fetchLineaEditar"); 
			let tbody = table.tBodies[0];

    		let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
			    if (FETCHLISTLINEAEDITAR.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
				    Contador ++;
			    }
		    }

		    if (Contador > 0){
				toastr.error('La linea ya se encuentra agregado', 'Error');
			}
			else{

		      	for (var i = 0; i <= 0; i++){

			       	let row  = tbody.insertRow(i);
		           	let cel1 = row.insertCell(0);
		           	let cel2 = row.insertCell(1);
		           	let cel3 = row.insertCell(2);

		           	cel1.innerHTML = FETCHLISTLINEAEDITAR.childNodes[0].innerHTML;
				   	cel2.innerHTML = FETCHLISTLINEAEDITAR.childNodes[1].innerHTML;

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteLineaEditar);
				    cel3.appendChild(boton);

				    let icono = document.createElement("span");
				    icono.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono);

		            toastr.success('Linea agregado con exito', 'Correcto');
				}
			}
    	}
    	else{
	        toastr.warning('Seleccione una Linea', 'Advertencia');
    	}
	});

	// Acción click fetchListSublinea //
    document.getElementById("fetchListSublineaEditar").onclick = function(e)
    {
        FETCHLISTSUBLINEAEDITAR = e.target.parentNode;
    }

    // Boton agregar Sublinea //
    $("#btnUpdateSublineaOferta").click(function(event) {
        $.ajax({
            url: window.dir + 'index.php/Controller_Promociones/getSublinea',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnUpdateRegalo').css('display','none');
                $('#loadingUpdateRegalo').css('display','');
                $('#btnUpdateDistriOferta').css('display','none');
                $('#loadingUpdateDistriOferta').css('display','');
                $('#btnUpdateDivisionOferta').css('display','none');
                $('#loadingUpdateDivisionOferta').css('display','');
                $('#btnUpdateLineaOferta').css('display','none');
                $('#loadingUpdateLineaOferta').css('display','');
                $('#btnUpdateSublineaOferta').css('display','none');
                $('#loadingUpdateSublineaOferta').css('display','');
                $('#btnUpdateProductoOferta').css('display','none');
                $('#loadingUpdateProductoOferta').css('display','');
                $('#btnUpdateSucursalOferta').css('display','none');
                $('#loadingUpdateSucursalOferta').css('display','');
                $('#btnCerrarUpdateOferta').css('display','none');
                $('#loadingCerrarUpdateOferta').css('display','');
                $('#btnUpdateOferta').css('display','none');
                $('#loadingUpdateOferta').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                $("#modalSublineaEditar").modal("show");

	            if (parsed != null && parsed != ""){

            		let table   = document.getElementById("fetchListSublineaEditar"); 
            		let tbody   = table.tBodies[0];

            		$('#fetchListSublineaEditar').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++) 
	                {
	                 	let row  = tbody.insertRow(i);
	                 	let cel1 = row.insertCell(0);
	                 	let cel2 = row.insertCell(1);

	                 	cel1.innerHTML = parsed[i]['ID'];
	                 	cel2.innerHTML = parsed[i]['Sublinea'];
	                }

		            fetch("fetchListSublineaEditar");
	            }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnUpdateRegalo').css('display','');
            $('#loadingUpdateRegalo').css('display','none');
            $('#btnUpdateDistriOferta').css('display','');
            $('#loadingUpdateDistriOferta').css('display','none');
            $('#btnUpdateDivisionOferta').css('display','');
            $('#loadingUpdateDivisionOferta').css('display','none');
            $('#btnUpdateLineaOferta').css('display','');
            $('#loadingUpdateLineaOferta').css('display','none');
            $('#btnUpdateSublineaOferta').css('display','');
            $('#loadingUpdateSublineaOferta').css('display','none');
            $('#btnUpdateProductoOferta').css('display','');
            $('#loadingUpdateProductoOferta').css('display','none');
            $('#btnUpdateSucursalOferta').css('display','');
            $('#loadingUpdateSucursalOferta').css('display','none');
            $('#btnCerrarUpdateOferta').css('display','');
            $('#loadingCerrarUpdateOferta').css('display','none');
            $('#btnUpdateOferta').css('display','');
            $('#loadingUpdateOferta').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnUpdateRegalo').css('display','');
            $('#loadingUpdateRegalo').css('display','none');
            $('#btnUpdateDistriOferta').css('display','');
            $('#loadingUpdateDistriOferta').css('display','none');
            $('#btnUpdateDivisionOferta').css('display','');
            $('#loadingUpdateDivisionOferta').css('display','none');
            $('#btnUpdateLineaOferta').css('display','');
            $('#loadingUpdateLineaOferta').css('display','none');
            $('#btnUpdateSublineaOferta').css('display','');
            $('#loadingUpdateSublineaOferta').css('display','none');
            $('#btnUpdateProductoOferta').css('display','');
            $('#loadingUpdateProductoOferta').css('display','none');
            $('#btnUpdateSucursalOferta').css('display','');
            $('#loadingUpdateSucursalOferta').css('display','none');
            $('#btnCerrarUpdateOferta').css('display','');
            $('#loadingCerrarUpdateOferta').css('display','none');
            $('#btnUpdateOferta').css('display','');
            $('#loadingUpdateOferta').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});

	// Agregar Sublinea //
	$("#btnUpdateListSublinea").click(function(event) {
	
		if (FETCHLISTSUBLINEAEDITAR != null){

    		let table = document.getElementById("fetchSublineaEditar"); 
			let tbody = table.tBodies[0];

    		let Contador = 0;

			for (var i = 0; i < tbody.rows.length ; i++){		      
			    if (FETCHLISTSUBLINEAEDITAR.childNodes[0].innerHTML == tbody.rows[i].cells[0].innerHTML){
				    Contador ++;
			    }
		    }

		    if (Contador > 0){
				toastr.error('La sublinea ya se encuentra agregado', 'Error');
			}
			else{

		      	for (var i = 0; i <= 0; i++){

			       	let row  = tbody.insertRow(i);
		           	let cel1 = row.insertCell(0);
		           	let cel2 = row.insertCell(1);
		           	let cel3 = row.insertCell(2);

		           	cel1.innerHTML = FETCHLISTSUBLINEAEDITAR.childNodes[0].innerHTML;
				   	cel2.innerHTML = FETCHLISTSUBLINEAEDITAR.childNodes[1].innerHTML;

				   	let boton = document.createElement("button");
				    boton.classList.add('btn', 'btn-danger');
				    boton.addEventListener("click",deleteSublineaEditar);
				    cel3.appendChild(boton);

				    let icono = document.createElement("span");
				    icono.classList.add('glyphicon', 'glyphicon-trash');
				    boton.appendChild(icono);

		            toastr.success('Sublinea agregado con exito', 'Correcto');
				}
			}
    	}
    	else{
	        toastr.warning('Seleccione una sublinea', 'Advertencia');
    	}
	});

	// Acción Modificar Oferta //
	$("#btnUpdateOferta").click(function(event) {

		let Nombre 		= $("#txt_Nombre_Oferta_Editar").val();
		let Inicial		= $("#Vigencia_Inicial_Oferta_Editar").val();
		let Final  		= $("#Vigencia_Final_Oferta_Editar").val();
		let Compra 		= $("#txtCompra_Requerida_Editar").val();
		let Descuento 	= "";
		let Tipo_Desc   = 0;
		let Tipo_Regalo = 0;
		let Status 		= "";
		let Excluir     = 0;

		let Tabla_Regalo         = document.getElementById("fetchRegalosEditar");
	    let Tbody_Regalo         = Tabla_Regalo.getElementsByTagName("tbody")[0];

	    let Tabla_Producto       = document.getElementById("fetchProductosOfertaEditar");
	    let Tbody_Producto       = Tabla_Producto.getElementsByTagName("tbody")[0];

	    let Tabla_Cliente        = document.getElementById("fetchDistribuidorOfertaEditar");
	    let Tbody_Cliente        = Tabla_Cliente.getElementsByTagName("tbody")[0];

	    let Tabla_Division       = document.getElementById("fetchDivisionEditar");
	    let Tbody_Division       = Tabla_Division.getElementsByTagName("tbody")[0];

	    let Tabla_Linea          = document.getElementById("fetchLineaEditar");
	    let Tbody_Linea          = Tabla_Linea.getElementsByTagName("tbody")[0];

	    let Tabla_Sublinea       = document.getElementById("fetchSublineaEditar");
	    let Tbody_Sublinea       = Tabla_Sublinea.getElementsByTagName("tbody")[0];

	    let Tabla_Sucursal       = document.getElementById("fetchSucursalOfertaEditar");
	    let Tbody_Sucursal       = Tabla_Sucursal.getElementsByTagName("tbody")[0];

		let Regalo   = new Array();
		let Cliente  = new Array();
		let Producto = new Array();
		let Division = new Array();
		let Linea    = new Array();
		let Sublinea = new Array();
		let Sucursal = new Array();

		if ($("#check_Excluir_Oferta_Editar").prop('checked')){
			Excluir = 1;
		}
		else{
			Excluir = 0;
		}

		if ($("#check_Status_Oferta_Editar").prop('checked')){
			Status = "Inactivo";
		}
		else{
			Status = "Activo";
		}

		if ($('#radio_Descuento_Editar').prop('checked')){
	    	Descuento 	= $("#txtDescuento_Editar").val();
	    	Tipo_Desc 	= 1;
	    	Tipo_Regalo = 0;
	    }

	    if ($('#radio_Regalo_Editar').prop('checked')){
	    	Tipo_Desc 	= 0;
	    	Tipo_Regalo = 1;
	    }

    	if (Tipo_Regalo == 1){

			if (Nombre != null && Nombre != "" && Inicial != null && Inicial != "" && Final != null && Final != "" && Compra != null && Compra != ""){
			
				if (Tbody_Regalo.rows.length > 0 && Tbody_Sucursal.rows.length > 0){

					if (Tbody_Producto.rows.length > 0){
						for (var i = 0; i < Tbody_Producto.rows.length; i++){
							Producto.push(Tbody_Producto.rows[i].cells[0].innerHTML);
						}
					}

					if (Tbody_Cliente.rows.length > 0){
						for (var i = 0; i < Tbody_Cliente.rows.length; i++){
							Cliente.push(Tbody_Cliente.rows[i].cells[0].innerHTML);
						}
					}

					if (Tbody_Division.rows.length > 0){
						for (var i = 0; i < Tbody_Division.rows.length; i++){
							Division.push(Tbody_Division.rows[i].cells[0].innerHTML);
						}
					}

					if (Tbody_Linea.rows.length > 0){
						for (var i = 0; i < Tbody_Linea.rows.length; i++){
							Linea.push(Tbody_Linea.rows[i].cells[0].innerHTML);
						}
					}

					if (Tbody_Sublinea.rows.length > 0){
						for (var i = 0; i < Tbody_Sublinea.rows.length; i++){
							Sublinea.push(Tbody_Sublinea.rows[i].cells[0].innerHTML);
						}
					}

					if (Tbody_Sucursal.rows.length > 0){
						for (var i = 0; i < Tbody_Sucursal.rows.length; i++){
							Sucursal.push(Tbody_Sucursal.rows[i].cells[0].innerHTML);
						}
					}

					for (var i = 0; i < Tbody_Regalo.rows.length ; i++){		
				    	for (var i = 0; i < Tbody_Regalo.rows.length; i++){      
					    	Regalo.push(Tbody_Regalo.rows[i].cells[0].innerHTML);
					    }
				    }

					let formData = new FormData();
					formData.append("ID", FETCHOFERTAS.childNodes[0].innerHTML);
		            formData.append("Nombre", Nombre);
		            formData.append("Tipo_Desc", Tipo_Desc);
		            formData.append("Tipo_Regalo", Tipo_Regalo);
		            formData.append("Desc", Descuento);
		            formData.append("Vigencia_inicial", Inicial);
		            formData.append("Vigencia_final", Final);
		            formData.append("Compra_req", Compra);
		            formData.append("Excluir", Excluir);
		            formData.append("Status", Status);
		            formData.append("Tipo", 'Regalo');

		            formData.append("Distribuidor", Cliente);
		            formData.append("Producto", Producto);
		            formData.append("Sucursal", Sucursal);
		            formData.append("Division", Division);
		            formData.append("Linea", Linea);
		            formData.append("Sublinea", Sublinea);
		            formData.append("Regalo", Regalo);

		            $.ajax({
		                url: window.dir + 'index.php/Controller_Promociones/UpdateOferta',
		                type: 'POST',
		                processData: false,
		                contentType: false,
		                timeout: 800000,
		                data: formData,
		                beforeSend : function ()
		                {
		                    $('#loadingHeader').css('display','');
			                $('#btnUpdateRegalo').css('display','none');
			                $('#loadingUpdateRegalo').css('display','');
			                $('#btnUpdateDistriOferta').css('display','none');
			                $('#loadingUpdateDistriOferta').css('display','');
			                $('#btnUpdateDivisionOferta').css('display','none');
			                $('#loadingUpdateDivisionOferta').css('display','');
			                $('#btnUpdateLineaOferta').css('display','none');
			                $('#loadingUpdateLineaOferta').css('display','');
			                $('#btnUpdateSublineaOferta').css('display','none');
			                $('#loadingUpdateSublineaOferta').css('display','');
			                $('#btnUpdateProductoOferta').css('display','none');
			                $('#loadingUpdateProductoOferta').css('display','');
			                $('#btnUpdateSucursalOferta').css('display','none');
			                $('#loadingUpdateSucursalOferta').css('display','');
			                $('#btnCerrarUpdateOferta').css('display','none');
			                $('#loadingCerrarUpdateOferta').css('display','');
			                $('#btnUpdateOferta').css('display','none');
			                $('#loadingUpdateOferta').css('display','');
		                },
		                success: function(data)
		                {
		                    switch(parseInt(data.trim())){

                                case 0:
                                    toastr.error('Ocurrio un error al modificar la oferta', 'Error');
                                break;

                                case 1:
                                    Limpiar(4);
                                    toastr.success('Oferta modificada con exito', 'Correcto');
                                break;

                                default:
                                    toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                            }
		                }
		            })
		            .done(function() {
		                $('#loadingHeader').css('display','none');
			            $('#btnUpdateRegalo').css('display','');
			            $('#loadingUpdateRegalo').css('display','none');
			            $('#btnUpdateDistriOferta').css('display','');
			            $('#loadingUpdateDistriOferta').css('display','none');
			            $('#btnUpdateDivisionOferta').css('display','');
			            $('#loadingUpdateDivisionOferta').css('display','none');
			            $('#btnUpdateLineaOferta').css('display','');
			            $('#loadingUpdateLineaOferta').css('display','none');
			            $('#btnUpdateSublineaOferta').css('display','');
			            $('#loadingUpdateSublineaOferta').css('display','none');
			            $('#btnUpdateProductoOferta').css('display','');
			            $('#loadingUpdateProductoOferta').css('display','none');
			            $('#btnUpdateSucursalOferta').css('display','');
			            $('#loadingUpdateSucursalOferta').css('display','none');
			            $('#btnCerrarUpdateOferta').css('display','');
			            $('#loadingCerrarUpdateOferta').css('display','none');
			            $('#btnUpdateOferta').css('display','');
			            $('#loadingUpdateOferta').css('display','none');
		            })
		            .fail(function(jqXHR, textStatus, errorThrown) {
		            	$('#loadingHeader').css('display','none');
			            $('#btnUpdateRegalo').css('display','');
			            $('#loadingUpdateRegalo').css('display','none');
			            $('#btnUpdateDistriOferta').css('display','');
			            $('#loadingUpdateDistriOferta').css('display','none');
			            $('#btnUpdateDivisionOferta').css('display','');
			            $('#loadingUpdateDivisionOferta').css('display','none');
			            $('#btnUpdateLineaOferta').css('display','');
			            $('#loadingUpdateLineaOferta').css('display','none');
			            $('#btnUpdateSublineaOferta').css('display','');
			            $('#loadingUpdateSublineaOferta').css('display','none');
			            $('#btnUpdateProductoOferta').css('display','');
			            $('#loadingUpdateProductoOferta').css('display','none');
			            $('#btnUpdateSucursalOferta').css('display','');
			            $('#loadingUpdateSucursalOferta').css('display','none');
			            $('#btnCerrarUpdateOferta').css('display','');
			            $('#loadingCerrarUpdateOferta').css('display','none');
			            $('#btnUpdateOferta').css('display','');
			            $('#loadingUpdateOferta').css('display','none');
			            $("#modalErrorConexion").modal("show");
		        	})
		            .always(function() {
		            });

				}
				else{
	            	toastr.info('Seleccione por lo menos un regalo y una sucursal para continuar', 'Importante');
				}
			}
			else{
	            toastr.warning('Algunos campos obligatorios estan vacios', 'Advertencia');
			}
    	}
    	else{

    		if (Nombre != null && Nombre != "" && Inicial != null && Inicial != "" && Final != null && Final != "" && Compra != null && Compra != ""){

    			if (Tbody_Sucursal.rows.length > 0 && Descuento != null && Descuento != ""){

					if (Tbody_Producto.rows.length > 0){
						for (var i = 0; i < Tbody_Producto.rows.length; i++){
							Producto.push(Tbody_Producto.rows[i].cells[0].innerHTML);
						}
					}

					if (Tbody_Cliente.rows.length > 0){
						for (var i = 0; i < Tbody_Cliente.rows.length; i++){
							Cliente.push(Tbody_Cliente.rows[i].cells[0].innerHTML);
						}
					}

					if (Tbody_Division.rows.length > 0){
						for (var i = 0; i < Tbody_Division.rows.length; i++){
							Division.push(Tbody_Division.rows[i].cells[0].innerHTML);
						}
					}

					if (Tbody_Linea.rows.length > 0){
						for (var i = 0; i < Tbody_Linea.rows.length; i++){
							Linea.push(Tbody_Linea.rows[i].cells[0].innerHTML);
						}
					}

					if (Tbody_Sublinea.rows.length > 0){
						for (var i = 0; i < Tbody_Sublinea.rows.length; i++){
							Sublinea.push(Tbody_Sublinea.rows[i].cells[0].innerHTML);
						}
					}

					if (Tbody_Sucursal.rows.length > 0){
						for (var i = 0; i < Tbody_Sucursal.rows.length; i++){
							Sucursal.push(Tbody_Sucursal.rows[i].cells[0].innerHTML);
						}
					}

					let formData = new FormData();
					formData.append("ID", FETCHOFERTAS.childNodes[0].innerHTML);
		            formData.append("Nombre", Nombre);
		            formData.append("Tipo_Desc", Tipo_Desc);
		            formData.append("Tipo_Regalo", Tipo_Regalo);
		            formData.append("Desc", Descuento);
		            formData.append("Vigencia_inicial", Inicial);
		            formData.append("Vigencia_final", Final);
		            formData.append("Compra_req", Compra);
		            formData.append("Excluir", Excluir);
		            formData.append("Status", Status);
		            formData.append("Tipo", 'Descuento');

		            formData.append("Distribuidor", Cliente);
		            formData.append("Producto", Producto);
		            formData.append("Sucursal", Sucursal);
		            formData.append("Division", Division);
		            formData.append("Linea", Linea);
		            formData.append("Sublinea", Sublinea);
		            formData.append("Regalo", Regalo);

		            $.ajax({
		                url: window.dir + 'index.php/Controller_Promociones/UpdateOferta',
		                type: 'POST',
		                processData: false,  // tell jQuery not to process the data
		                contentType: false,
		                timeout: 35000,
		                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		                data: formData,
		                beforeSend : function ()
		                {
		                    $('#loadingHeader').css('display','');
			                $('#btnUpdateRegalo').css('display','none');
			                $('#loadingUpdateRegalo').css('display','');
			                $('#btnUpdateDistriOferta').css('display','none');
			                $('#loadingUpdateDistriOferta').css('display','');
			                $('#btnUpdateDivisionOferta').css('display','none');
			                $('#loadingUpdateDivisionOferta').css('display','');
			                $('#btnUpdateLineaOferta').css('display','none');
			                $('#loadingUpdateLineaOferta').css('display','');
			                $('#btnUpdateSublineaOferta').css('display','none');
			                $('#loadingUpdateSublineaOferta').css('display','');
			                $('#btnUpdateProductoOferta').css('display','none');
			                $('#loadingUpdateProductoOferta').css('display','');
			                $('#btnUpdateSucursalOferta').css('display','none');
			                $('#loadingUpdateSucursalOferta').css('display','');
			                $('#btnCerrarUpdateOferta').css('display','none');
			                $('#loadingCerrarUpdateOferta').css('display','');
			                $('#btnUpdateOferta').css('display','none');
			                $('#loadingUpdateOferta').css('display','');
		                },
		                success: function(data)
		                {
		                    switch(parseInt(data.trim())){

                                case 0:
                                    toastr.error('Ocurrio un error al modificar la oferta', 'Error');
                                break;

                                case 1:
                                    Limpiar(4);
                                    toastr.success('Oferta modificada con exito', 'Correcto');
                                break;

                                default:
                                    toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                            }
		                }
		            })
		            .done(function() {
		                $('#loadingHeader').css('display','none');
			            $('#btnUpdateRegalo').css('display','');
			            $('#loadingUpdateRegalo').css('display','none');
			            $('#btnUpdateDistriOferta').css('display','');
			            $('#loadingUpdateDistriOferta').css('display','none');
			            $('#btnUpdateDivisionOferta').css('display','');
			            $('#loadingUpdateDivisionOferta').css('display','none');
			            $('#btnUpdateLineaOferta').css('display','');
			            $('#loadingUpdateLineaOferta').css('display','none');
			            $('#btnUpdateSublineaOferta').css('display','');
			            $('#loadingUpdateSublineaOferta').css('display','none');
			            $('#btnUpdateProductoOferta').css('display','');
			            $('#loadingUpdateProductoOferta').css('display','none');
			            $('#btnUpdateSucursalOferta').css('display','');
			            $('#loadingUpdateSucursalOferta').css('display','none');
			            $('#btnCerrarUpdateOferta').css('display','');
			            $('#loadingCerrarUpdateOferta').css('display','none');
			            $('#btnUpdateOferta').css('display','');
			            $('#loadingUpdateOferta').css('display','none');
		            })
		            .fail(function(jqXHR, textStatus, errorThrown) {
		            	$('#loadingHeader').css('display','none');
			            $('#btnUpdateRegalo').css('display','');
			            $('#loadingUpdateRegalo').css('display','none');
			            $('#btnUpdateDistriOferta').css('display','');
			            $('#loadingUpdateDistriOferta').css('display','none');
			            $('#btnUpdateDivisionOferta').css('display','');
			            $('#loadingUpdateDivisionOferta').css('display','none');
			            $('#btnUpdateLineaOferta').css('display','');
			            $('#loadingUpdateLineaOferta').css('display','none');
			            $('#btnUpdateSublineaOferta').css('display','');
			            $('#loadingUpdateSublineaOferta').css('display','none');
			            $('#btnUpdateProductoOferta').css('display','');
			            $('#loadingUpdateProductoOferta').css('display','none');
			            $('#btnUpdateSucursalOferta').css('display','');
			            $('#loadingUpdateSucursalOferta').css('display','none');
			            $('#btnCerrarUpdateOferta').css('display','');
			            $('#loadingCerrarUpdateOferta').css('display','none');
			            $('#btnUpdateOferta').css('display','');
			            $('#loadingUpdateOferta').css('display','none');
			            $("#modalErrorConexion").modal("show");
		        	})
		            .always(function() {
		            });
				}
				else{
	            	toastr.info('Seleccione por lo menos una sucursal y el % del descuento para continuar', 'Importante');
				}
    		}
    		else{
	        	toastr.warning('Algunos campos obligatorios estan vacios', 'Advertencia');
    		}
    	}
	});

	// Acción Eliminar Oferta //
	$("#btnEliminarOferta").click(function(event) {
		
		if (FETCHOFERTAS != null){

			if (FETCHOFERTAS.childNodes[6].childNodes[0].innerHTML != 'Inactivo'){
				swal({
				  	title: "¿Esta segúro que desea eliminar la oferta?",
				  	text: "Una vez eliminado pasara con a estatus inactivo",
				  	icon: "warning",
				  	buttons: true,
				  	dangerMode: true,
				})
				.then((willDelete) => {
				  	if (willDelete) {

				  		let formData = new FormData();
			            formData.append("idOferta", FETCHOFERTAS.childNodes[0].innerHTML);

			            $.ajax({
			                url: window.dir + 'index.php/Controller_Promociones/deleteOferta',
			                type: 'POST',
			                processData: false,
			                contentType: false,
			                timeout: 800000,
			                data: formData,
			                beforeSend : function ()
			                {
			                	$('#loadingHeader').css('display','');
					            $('#btnAgregarOferta').css('display','none');
					            $('#loadingAgregarOferta').css('display','');
					            $('#btnEditarOferta').css('display','none');
					            $('#loadingEditarOferta').css('display','');
					            $('#btnEliminarOferta').css('display','none');
					            $('#loadingEliminarOferta').css('display','');
			                },
			                success: function(data)
			                {
			                	switch(parseInt(data.trim())){

	                                case 0:
	                                    toastr.error('Ocurrio un error al eliminar la oferta', 'Error');
	                                break;

	                                case 1:
	                                    Limpiar(4);
	                                    toastr.success('Oferta eliminada con exito', 'Correcto');
	                                break;

	                                default:
	                                    toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
	                            }
			                }
			            })
			            .done(function() {
			            	$('#loadingHeader').css('display','none');
				            $('#btnAgregarOferta').css('display','');
				            $('#loadingAgregarOferta').css('display','none');
				            $('#btnEditarOferta').css('display','');
				            $('#loadingEditarOferta').css('display','none');
				            $('#btnEliminarOferta').css('display','');
				            $('#loadingEliminarOferta').css('display','none');
			            })
			            .fail(function(jqXHR, textStatus, errorThrown) {
			            	$('#loadingHeader').css('display','none');
				            $('#btnAgregarOferta').css('display','');
				            $('#loadingAgregarOferta').css('display','none');
				            $('#btnEditarOferta').css('display','');
				            $('#loadingEditarOferta').css('display','none');
				            $('#btnEliminarOferta').css('display','');
				            $('#loadingEliminarOferta').css('display','none');
				            $("#modalErrorConexion").modal("show");
			        	})
			            .always(function() {
			            });
				  	}
				});
			}
			else{
	            toastr.warning('La oferta se encuentra como Inactiva', 'Advertencia');
			}
		}
		else{
	        toastr.warning('Seleccione una oferta', 'Advertencia');
		}
	}); 


});

function Limpiar(valor) {

	let tableDistribuidor = null;
	let tableProducto = null;
	let tableSucursal = null;
	let tableDetalle  = null;

	let Regalo 			= null;
	let Cliente 		= null;
	let Division 		= null;
	let Linea 			= null;
	let Sublinea 		= null;
	let Producto 		= null;
	let Sucursales 		= null;
	let OfertasDetalle 	= null;
	let Regalos 		= null;

	switch(valor){

		case 0:
			$("#modalAgregarPromocion").modal("hide");

			tableDistribuidor = document.getElementById("fetchDistribuidorKit"); 
			$('#fetchDistribuidorKit').DataTable().destroy();
		    tableDistribuidor.tBodies[0].innerHTML = "";

		    tableProducto = document.getElementById("fetchProductosKit"); 
			$('#fetchProductosKit').DataTable().destroy();
		    tableProducto.tBodies[0].innerHTML = "";

		    tableSucursal = document.getElementById("fetchSucursalKit"); 
			$('#fetchSucursalKit').DataTable().destroy();
		    tableSucursal.tBodies[0].innerHTML = "";

		    tableDetalle = document.getElementById("fetchPromoDetalle"); 
            $('#fetchPromoDetalle').DataTable().destroy();
            tableDetalle.tBodies[0].innerHTML = "";

		    $('#fetchPromociones').DataTable().ajax.reload();

			$("#txtNombre_Kit").val("");
		   	$("#Vigencia_Inicial_Kit").val("");
		   	$("#Vigencia_Final_Kit").val("");
		   	$("#select_Division_Kit").val("");
		   	$("#select_Linea_Kit").val("");
		   	$("#select_Sublinea_Kit").val("");

		   	FETCHLISTDISTRIBUIDOR = null;
			FETCHLISTPRODUCTO     = null;
			FETCHLISTSUCURSALES   = null;
			FETCHPROMOCIONES 	  = null;
		break;

		case 1:
			$("#modalEditarKit").modal("hide");

			tableDistribuidor = document.getElementById("fetchDistribuidorKitEditar"); 
			$('#fetchDistribuidorKitEditar').DataTable().destroy();
		    tableDistribuidor.tBodies[0].innerHTML = "";

		    tableProducto = document.getElementById("fetchProductosKitEditar"); 
			$('#fetchProductosKitEditar').DataTable().destroy();
		    tableProducto.tBodies[0].innerHTML = "";

		    tableSucursal = document.getElementById("fetchSucursalKitEditar"); 
			$('#fetchSucursalKitEditar').DataTable().destroy();
		    tableSucursal.tBodies[0].innerHTML = "";

		    tableDetalle = document.getElementById("fetchPromoDetalle"); 
            $('#fetchPromoDetalle').DataTable().destroy();
            tableDetalle.tBodies[0].innerHTML = "";

		    $('#fetchPromociones').DataTable().ajax.reload();

			$("#txtNombre_Kit_Editar").val("");
		   	$("#Vigencia_Inicial_Kit_Editar").val("");
		   	$("#Vigencia_Final_Kit_Editar").val("");
		   	$("#select_Division_Kit_Editar").val("");
		   	$("#select_Linea_Kit_Editar").val("");
		   	$("#select_Sublinea_Kit_Editar").val("");

		   	FETCHLISTDISTRIBUIDOREDITAR = null;
			FETCHLISTPRODUCTOEDITAR     = null;
			FETCHLISTSUCURSALESEDITAR   = null;
			FETCHPROMOCIONES 			= null;
		break;

		case 2:
		    tableDetalle = document.getElementById("fetchPromoDetalle"); 
            $('#fetchPromoDetalle').DataTable().destroy();
            tableDetalle.tBodies[0].innerHTML = "";

		    $('#fetchPromociones').DataTable().ajax.reload();

			FETCHPROMOCIONES = null;
		break;

		case 3:
			$("#txt_Nombre_Oferta").val("");
			$("#Vigencia_Inicial_Oferta").val("");
			$("#Vigencia_Final_Oferta").val("");
			$("#txtCompra_Requerida").val("1");
			$("#txtDescuento").val("0");

			$("#radio_Descuento").prop('checked', false);
			$("#radio_Regalo").prop('checked', false);
			$("#check_Excluir_Oferta").prop('checked',false);
			$("#divExcluirOferta").css('display', 'none');
			$("#divRegalo").css('display','none');
			$("#divDescuento").css('display','none');

			$("#modalAgregarOferta").modal("hide");

			TIPOOFERTA 					= null;
			FETCHOFERTAS 				= null;
			FETCHLISTREGALOS			= null;
			FETCHLISTDISTRIBUIDOROFERTA = null;
			FETCHLISTDIVISION 			= null;
			FETCHLISTLINEA 			 	= null;
			FETCHLISTSUBLINEA	 		= null;
			FETCHLISTPRODUCTOOFERTA	 	= null;

			Regalo = document.getElementById("fetchRegalo"); 
			$('#fetchRegalo').DataTable().destroy();
		    Regalo.tBodies[0].innerHTML = "";

		    Cliente = document.getElementById("fetchDistribuidorOferta"); 
			$('#fetchDistribuidorOferta').DataTable().destroy();
		    Cliente.tBodies[0].innerHTML = "";

		    Division = document.getElementById("fetchDivision"); 
			$('#fetchDivision').DataTable().destroy();
		    Division.tBodies[0].innerHTML = "";

		    Linea = document.getElementById("fetchLinea"); 
			$('#fetchLinea').DataTable().destroy();
		    Linea.tBodies[0].innerHTML = "";

		    Sublinea = document.getElementById("fetchSublinea"); 
			$('#fetchSublinea').DataTable().destroy();
		    Sublinea.tBodies[0].innerHTML = "";

		    Producto = document.getElementById("fetchProductosOferta"); 
			$('#fetchProductosOferta').DataTable().destroy();
		    Producto.tBodies[0].innerHTML = "";

		    Sucursales = document.getElementById("fetchSucursalOferta"); 
			$('#fetchSucursalOferta').DataTable().destroy();
		    Sucursales.tBodies[0].innerHTML = "";

		    OfertasDetalle = document.getElementById("fetchOfertaDetalle"); 
			$('#fetchOfertaDetalle').DataTable().destroy();
		    OfertasDetalle.tBodies[0].innerHTML = "";

		    Regalos = document.getElementById("fetchRegalos"); 
			$('#fetchRegalos').DataTable().destroy();
		    Regalos.tBodies[0].innerHTML = "";

		    $('#fetchOfertas').DataTable().ajax.reload();
		break;

		case 4:
			$("#txt_Nombre_Oferta_Editar").val("");
			$("#Vigencia_Inicial_Oferta_Editar").val("");
			$("#Vigencia_Final_Oferta_Editar").val("");
			$("#txtCompra_Requerida_Editar").val("1");
			$("#txtDescuento_Editar").val("0");

			$("#radio_Descuento_Editar").prop('checked', false);
			$("#radio_Regalo_Editar").prop('checked', false);
			$("#check_Excluir_Oferta_Editar").prop('checked',false);
			$("#divExcluirOfertaEditar").css('display', 'none');
			$("#divRegaloEditar").css('display','none');
			$("#divDescuentoEditar").css('display','none');

			$("#modalEditarOferta").modal("hide");

			TIPOOFERTA 				  		  = null;
			FETCHOFERTA 				  	  = null;
			FETCHLISTREGALOSEDITAR			  = null;
			FETCHLISTDISTRIBUIDOROFERTAEDITAR = null;
			FETCHLISTDIVISIONEDITAR 		  = null;
			FETCHLISTLINEAEDITAR 			  = null;
			FETCHLISTSUBLINEAEDITAR	 		  = null;
			FETCHLISTPRODUCTOOFERTAEDITAR	  = null;

			Regalo = document.getElementById("fetchRegalosEditar"); 
			$('#fetchRegalosEditar').DataTable().destroy();
		    Regalo.tBodies[0].innerHTML = "";

		    Cliente = document.getElementById("fetchDistribuidorOfertaEditar"); 
			$('#fetchDistribuidorOfertaEditar').DataTable().destroy();
		    Cliente.tBodies[0].innerHTML = "";

		    Division = document.getElementById("fetchDivisionEditar"); 
			$('#fetchDivisionEditar').DataTable().destroy();
		    Division.tBodies[0].innerHTML = "";

		    Linea = document.getElementById("fetchLineaEditar"); 
			$('#fetchLineaEditar').DataTable().destroy();
		    Linea.tBodies[0].innerHTML = "";

		    Sublinea = document.getElementById("fetchSublineaEditar"); 
			$('#fetchSublineaEditar').DataTable().destroy();
		    Sublinea.tBodies[0].innerHTML = "";

		    Producto = document.getElementById("fetchProductosOfertaEditar"); 
			$('#fetchProductosOfertaEditar').DataTable().destroy();
		    Producto.tBodies[0].innerHTML = "";

		    Sucursales = document.getElementById("fetchSucursalOfertaEditar"); 
			$('#fetchSucursalOfertaEditar').DataTable().destroy();
		    Sucursales.tBodies[0].innerHTML = "";

		    OfertasDetalle = document.getElementById("fetchOfertaDetalle"); 
			$('#fetchOfertaDetalle').DataTable().destroy();
		    OfertasDetalle.tBodies[0].innerHTML = "";

		    Regalos = document.getElementById("fetchRegalos"); 
			$('#fetchRegalos').DataTable().destroy();
		    Regalos.tBodies[0].innerHTML = "";

		    $('#fetchOfertas').DataTable().ajax.reload();
		break;
	}
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

function fetchOfertas() {

	let dataTable = $('#fetchOfertas').DataTable({
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
                'render': function (data, type, full, meta){
                    if (full[6] == 'Activo'){
                    	return "<label class='badge badge-success'>Activo</label>"
                    }
                    else{
                    	return "<label class='badge badge-danger'>Inactivo</label>"
                    }
                }
            },

        ],    
    	"order" : [],
    	"ajax" : {
        	url: window.dir + "index.php/Controller_Promociones/fetchOfertas",
        	type: "POST"
    	}
  	});
}

function fetchPromociones() {

	let dataTable = $('#fetchPromociones').DataTable({
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
                "targets": 4,
                'render': function (data, type, full, meta)
                {
                    if (full[4] == 'Activo'){
                    	return "<label class='badge badge-success'>Activo</label>"
                    }
                    else{
                    	return "<label class='badge badge-danger'>Inactivo</label>"
                    }

                }
            },

        ],    
    	"order" : [],
    	"ajax" : {
        	url: window.dir + "index.php/Controller_Promociones/fetchPromociones",
        	type: "POST"
    	}
  	});
}

///////////////////////////////////////////////////////////////////////
var deleteDistribuidorKit = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchDistribuidorKit").tBodies[0];
    tbody.removeChild(row);
}

var deleteProductoKit = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchProductosKit").tBodies[0];
	let tableSucursal = document.getElementById("fetchSucursalKit");
    let tbodySucursal = tableSucursal.getElementsByTagName("tbody")[0];

	for (var i = 0; i < tbodySucursal.rows.length ; i++){	
	    tbodySucursal.rows[i].cells[5].innerHTML = 0;
    }

    tbody.removeChild(row);
}

var calcularAhorro = function (event)
{
	let table = document.getElementById("fetchSucursalKit");
    let tbody = table.getElementsByTagName("tbody")[0];

	for (var i = 0; i < tbody.rows.length ; i++){	
	    tbody.rows[i].cells[5].innerHTML = 0;
    }
}

var calcularAhorroEditar = function (event)
{
	let table = document.getElementById("fetchSucursalKitEditar");
    let tbody = table.getElementsByTagName("tbody")[0];

	for (var i = 0; i < tbody.rows.length ; i++){	
	    tbody.rows[i].cells[5].innerHTML = 0;
    }
}

// Eliminar Sucursal Kit //
var deleteSucursalKit = function (event) {
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchSucursalKit").tBodies[0];
    tbody.removeChild(row);
}

// Calcular Ahorro Sucursal //
var calcularAhorroSucursal = function (event)
{
	let row = this.parentNode.parentNode;
	let identidicador = row.childNodes[5].innerHTML;

	if (identidicador == 0){

		let tbody = document.querySelector("#fetchSucursalKit").tBodies[0];
		let id_Sucursal   = row.childNodes[0].innerHTML;
		let Precio_ahorro = row.childNodes[2].childNodes[0].value;
		let Ahorro = 0;

		array_ID = new Array();
		array_Cantidad = new Array();
		let Importe = 0;
	    
	    let tableProducto = document.getElementById("fetchProductosKit");
	    let tbodyProducto = tableProducto.getElementsByTagName("tbody")[0];

	    if (tbodyProducto.rows.length > 0){

	    	for (var i = 0; i < tbodyProducto.rows.length ; i++){		   
		    	array_ID.push(tbodyProducto.rows[i].cells[0].innerHTML);   
			    array_Cantidad.push(tbodyProducto.rows[i].cells[2].childNodes[0].value);
			}

		    let formData = new FormData();
            formData.append("idCatalogo", array_ID);
            formData.append("Cantidad", array_Cantidad);
            formData.append("idSucursal", id_Sucursal);

            $.ajax({
               url: window.dir + 'index.php/Controller_Promociones/getInfoInventario',
               type: 'POST',
               processData: false,
               contentType: false,
               timeout: 800000,
               data: formData,
               beforeSend : function ()
                {
                	$('#loadingHeader').css('display','');
	                $('#btnAddDistribuidorKit').css('display','none');
	                $('#loadingAddDistribuidorKit').css('display','');
	                $('#btnAddProductoKit').css('display','none');
	                $('#loadingAddProductoKit').css('display','');
	                $('#btnAddSucursalKit').css('display','none');
	                $('#loadingAddSucursalKit').css('display','');
	                $('#btnCerrarAddKit').css('display','none');
	                $('#loadingCerrarAddKit').css('display','');
	                $('#btnAddPromocionKit').css('display','none');
	                $('#loadingAddPromocionKit').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);	
                    Importe = parsed['Importe'];
		            Ahorro = parseFloat(Importe) - parseFloat(Precio_ahorro);
		            row.childNodes[3].childNodes[0].value = parseFloat(Ahorro).toFixed(2);
		            row.childNodes[5].innerHTML = 1;
                }
            })
            .done(function() {
	           	$('#loadingHeader').css('display','none');
	            $('#btnAddDistribuidorKit').css('display','');
	            $('#loadingAddDistribuidorKit').css('display','none');
	            $('#btnAddProductoKit').css('display','');
	            $('#loadingAddProductoKit').css('display','none');
	            $('#btnAddSucursalKit').css('display','');
	            $('#loadingAddSucursalKit').css('display','none');
	            $('#btnCerrarAddKit').css('display','');
	            $('#loadingCerrarAddKit').css('display','none');
	            $('#btnAddPromocionKit').css('display','');
	            $('#loadingAddPromocionKit').css('display','none');
            })
            .fail(function() {
               	$('#loadingHeader').css('display','none');
	            $('#btnAddDistribuidorKit').css('display','');
	            $('#loadingAddDistribuidorKit').css('display','none');
	            $('#btnAddProductoKit').css('display','');
	            $('#loadingAddProductoKit').css('display','none');
	            $('#btnAddSucursalKit').css('display','');
	            $('#loadingAddSucursalKit').css('display','none');
	            $('#btnCerrarAddKit').css('display','');
	            $('#loadingCerrarAddKit').css('display','none');
	            $('#btnAddPromocionKit').css('display','');
	            $('#loadingAddPromocionKit').css('display','none');
	            $("#modalErrorConexion").modal("show");
            })
            .always(function() {
            });
	      
	    }else{
	    	toastr.warning('Tiene que ver por lo menos un producto agregado', 'Advertencia');
		}
	}
}

// Acción Key Press //
var keyPressFuntion = function (event) {
	let row = this.parentNode.parentNode;
	row.childNodes[5].innerHTML = 0;
}

// Acción Key Press //
var keyPressFuntionEditar = function (event) {
	let row = this.parentNode.parentNode;
	row.childNodes[5].innerHTML = 0;
}

////////////////////////////////////////////////////////////////////////////////////////////////

var deleteDistribuidorKitEditar = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchDistribuidorKitEditar").tBodies[0];
    tbody.removeChild(row);
}

var deleteProductoKitEditar = function (event)
{
	let row   = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchProductosKitEditar").tBodies[0];

	let Tabla_Sucursal = document.getElementById("fetchSucursalKitEditar");
    let Tbody_Sucursal = Tabla_Sucursal.getElementsByTagName("tbody")[0];

	for (var i = 0; i < Tbody_Sucursal.rows.length ; i++){	
	    Tbody_Sucursal.rows[i].cells[5].innerHTML = 0;
    }

    tbody.removeChild(row);
}

var deleteSucursalKitEditar = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchSucursalKitEditar").tBodies[0];
    tbody.removeChild(row);
}

var calcularAhorroSucursalEditar = function (event)
{
	let row = this.parentNode.parentNode;
	let identidicador = row.childNodes[5].innerHTML;

	if (identidicador == 0){

		let tbody = document.querySelector("#fetchSucursalKitEditar").tBodies[0];
		let id_Sucursal = row.childNodes[0].innerHTML;
		let Precio_ahorro = row.childNodes[2].childNodes[0].value;
		let Ahorro = 0;

		array_ID 	   = new Array();
		array_Cantidad = new Array();
		let Importe    = 0;
	    
	    let Tabla_Productos = document.getElementById("fetchProductosKitEditar");
	    let Tbody_Productos = Tabla_Productos.getElementsByTagName("tbody")[0];

	    if (Tbody_Productos.rows.length > 0){
	    	for (var i = 0; i < Tbody_Productos.rows.length ; i++){		   
		    	array_ID.push(Tbody_Productos.rows[i].cells[0].innerHTML);   
			    array_Cantidad.push(Tbody_Productos.rows[i].cells[2].childNodes[0].value);
			}
			    let formData = new FormData();
	            formData.append("idCatalogo", array_ID);
	            formData.append("Cantidad", array_Cantidad);
	            formData.append("idSucursal", id_Sucursal);

	            $.ajax({
	               url: window.dir + 'index.php/Controller_Promociones/getInfoInventario',
	               type: 'POST',
	               processData: false,
	               contentType: false,
	               timeout: 800000,
	               data: formData,
	               beforeSend : function ()
	                {
	                    $('#loadingHeader').css('display','');
		                $('#btnUpdateDistribuidorKit').css('display','none');
		                $('#loadingUpdateDistribuidorKit').css('display','');
		                $('#btnUpdateProductoKit').css('display','none');
		                $('#loadingUpdateProductoKit').css('display','');
		                $('#btnUpdateSucursalKit').css('display','none');
		                $('#loadingUpdateSucursalKit').css('display','');
		                $('#btnCerrarUpdateKit').css('display','none');
		                $('#loadingCerrarUpdateKit').css('display','');
		                $('#btnUpdatePromocionKit').css('display','none');
		                $('#loadingUpdatePromocionKit').css('display','');
	                },
	                success: function(data)
	                {
	                    let parsed = JSON.parse(data);	
	                    Importe = parsed['Importe'];
			            Ahorro = parseFloat(Importe) - parseFloat(Precio_ahorro);
			            row.childNodes[3].childNodes[0].value = parseFloat(Ahorro).toFixed(2);
			            row.childNodes[5].innerHTML = 1;
	                }
	            })
	            .done(function() {
	           		$('#loadingHeader').css('display','none');
	            	$('#btnUpdateDistribuidorKit').css('display','');
	            	$('#loadingUpdateDistribuidorKit').css('display','none');
	            	$('#btnUpdateProductoKit').css('display','');
	            	$('#loadingUpdateProductoKit').css('display','none');
	            	$('#btnUpdateSucursalKit').css('display','');
	            	$('#loadingUpdateSucursalKit').css('display','none');
	            	$('#btnCerrarUpdateKit').css('display','');
	            	$('#loadingCerrarUpdateKit').css('display','none');
	            	$('#btnUpdatePromocionKit').css('display','');
	            	$('#loadingUpdatePromocionKit').css('display','none');
	            })
	            .fail(function() {
	                $('#loadingHeader').css('display','none');
		            $('#btnUpdateDistribuidorKit').css('display','');
		            $('#loadingUpdateDistribuidorKit').css('display','none');
		            $('#btnUpdateProductoKit').css('display','');
		            $('#loadingUpdateProductoKit').css('display','none');
		            $('#btnUpdateSucursalKit').css('display','');
		            $('#loadingUpdateSucursalKit').css('display','none');
		            $('#btnCerrarUpdateKit').css('display','');
		            $('#loadingCerrarUpdateKit').css('display','none');
		            $('#btnUpdatePromocionKit').css('display','');
		            $('#loadingUpdatePromocionKit').css('display','none');
		            $("#modalErrorConexion").modal("show");
	            })
	            .always(function() {
	            });
	    }else{

	    	toastr.warning('Tiene que ver por lo menos un producto agregado', 'Advertencia');
	    }
	}
}

var calcularAhorroSucursalEditar2 = function (event)
{
	let table = document.getElementById("fetchSucursalKitEditar");
    let tbody = table.getElementsByTagName("tbody")[0];

	for (var i = 0; i < tbody.rows.length ; i++){	
	    tbody.rows[i].cells[5].innerHTML = 0;
    }
}


////////////////////////////////////////////////////////////////////////////
////////////////////////////// Ofertas /////////////////////////////////////

var deleteRegalo = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchRegalo").tBodies[0];
    tbody.removeChild(row);
}

var deleteDistribuidorOferta = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchDistribuidorOferta").tBodies[0];
    tbody.removeChild(row);
}

var deleteDivision = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchDivision").tBodies[0];
    tbody.removeChild(row);
}

var deleteLinea = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchLinea").tBodies[0];
    tbody.removeChild(row);
}

var deleteSublinea = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchSublinea").tBodies[0];
    tbody.removeChild(row);
}

var deleteProductosOferta = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchProductosOferta").tBodies[0];
    tbody.removeChild(row);
}

var deleteSucursalOferta = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchSucursalOferta").tBodies[0];
    tbody.removeChild(row);
}

//////////// Editar ////////////

var deleteRegaloEditar = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchRegalosEditar").tBodies[0];
    tbody.removeChild(row);
}

var deleteDistribuidorOfertaEditar = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchDistribuidorOfertaEditar").tBodies[0];
    tbody.removeChild(row);
}

var deleteDivisionEditar = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchDivisionEditar").tBodies[0];
    tbody.removeChild(row);
}

var deleteLineaEditar = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchLineaEditar").tBodies[0];
    tbody.removeChild(row);
}

var deleteSublineaEditar = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchSublineaEditar").tBodies[0];
    tbody.removeChild(row);
}

var deleteProductosOfertaEditar = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchProductosOfertaEditar").tBodies[0];
    tbody.removeChild(row);
}

var deleteSucursalOfertaEditar = function (event)
{
	let row = this.parentNode.parentNode;
	let tbody = document.querySelector("#fetchSucursalOfertaEditar").tBodies[0];
    tbody.removeChild(row);
}