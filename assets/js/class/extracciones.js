var FETCHEXTRACCIONES = null;
var FETCHHISTORIAL    = null;
var EXTRACCIONESPAGADAS  = false;
var listLocationOriginGlobal = [];


function updateValue(e) {
	// console.log(e.target);
	// console.log(e.target.parentNode);
	// console.log(e.target.value);
	// let cantidadPicking = $(this).find(':selected').data('val');
	// console.log(e.target.parentNode);
	// console.log(e.target.parentNode.parentNode);
	// console.log(e.target.parentNode.parentNode.childNodes[4].childNodes[0].value);
	const select = e.target;
	const cantidadPicking = select.querySelector(':checked').getAttribute('data-val');
	e.target.parentNode.parentNode.childNodes[4].childNodes[0].value = cantidadPicking;
}


$(document).ready(function() {

	$('.input-daterange').datepicker({
	  format: "yyyy-mm-dd",
	  autoclose: true
	});

	///////////////////////////////////
	/////    Extracciones Tab    //////
	///////////////////////////////////

	// Refrescar Tabla Extracciones //
	$("#btnRefresh").click(function(event) {
		refreshExtraccion();
	});

	// Refrescar Tabla Historial Extracciones //
	$("#btnRefreshHistorial").click(function(event) {
		let Bodega = $("#selectBodegaHistorial").val();
		let Distri = $("#selectDistribuidor").val();
		let DateSt = $('#DateStartVentas').val();
  		let DateEn = $('#DateEndVentas').val();

		if (Bodega != ""){

			if (DateSt != '' && DateEn != ''){
				$('#fetchHistorial').DataTable().destroy();
				fetchHistorial('yes', DateSt,DateEn,Distri,Bodega);
			}
			else{
				$('#fetchHistorial').DataTable().destroy();
				fetchHistorial('no','', '',Distri,Bodega);
			}
		}
		else{

			$('#fetchHistorial').DataTable().destroy();
    		document.getElementById("fetchHistorial").tBodies[0].innerHTML = "";
		}
	});

	// Seleccionar Sucursal //
	$("#selectBodega").change(function(event)
	{
		let Bodega = $("#selectBodega").val();

		if (Bodega != ""){

			let formData = new FormData();
            formData.append("idSucursal", Bodega);

            $.ajax({
                url: window.dir + 'index.php/Controller_Extracciones/getInfoExtracciones',
                type: 'POST',
                processData: false,
                contentType: false,
                timeout: 800000,
                data: formData,
                beforeSend : function ()
                {
                    $('#loadingHeader').css('display','');
                    $('#btnRealizarExtraccion').css('display','none');
                    $('#loadingRealizarExtraccion').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);
	            	let table  = document.getElementById("fetchExtracciones"); 
					let tbody  = table.tBodies[0];

            		$('#fetchExtracciones').DataTable().destroy();
            		document.getElementById("fetchExtracciones").tBodies[0].innerHTML = "";

            		$('#fetchDetalleExtracciones').DataTable().destroy();
    				document.getElementById("fetchDetalleExtracciones").tBodies[0].innerHTML = "";

            		for (var i = 0; i < parsed['Extraccion'].length; i++){

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

		                cel1.innerHTML = parsed['Extraccion'][i]['ID'];
						cel2.innerHTML = parsed['Extraccion'][i]['Fecha_venta'];
						cel3.innerHTML = parsed['Extraccion'][i]['idDistribuidor'];
		                cel4.innerHTML = parsed['Extraccion'][i]['Nombre'];
						cel5.innerHTML = parsed['Extraccion'][i]['Fecha'];
						cel6.innerHTML = parsed['Extraccion'][i]['Fecha_ref'];
		                cel7.innerHTML = parsed['Extraccion'][i]['Pedidos'];
						cel8.innerHTML = parsed['Extraccion'][i]['Total'];


						if (parseFloat(parsed['Extraccion'][i]['Adeudo']) <= 10){
			                cel9.innerHTML = "<label class='badge badge-success'>" + parsed['Extraccion'][i]['Adeudo'] + "</label>";
			            }
			            else{
			                cel9.innerHTML = "<label class='badge badge-danger'>" + parsed['Extraccion'][i]['Adeudo'] + "</label>";
			            }   
					}
					
					EXTRACCIONESPAGADAS =  (parsed['Sucursal'][0]['Extracciones_pagadas'] == 1) ? true : false;

		            fetch("fetchExtracciones");
                }
	        })
            .done(function() {
                $('#loadingHeader').css('display','none');
                $('#btnRealizarExtraccion').css('display','');
                $('#loadingRealizarExtraccion').css('display','none');

            })
            .fail(function(jqXHR, textStatus, errorThrown) {
            	$('#loadingHeader').css('display','none');
                $('#btnRealizarExtraccion').css('display','');
                $('#loadingRealizarExtraccion').css('display','none');
                $("#modalErrorConexion").modal("show");
        	})
            .always(function() {
            });
		}
		else{

			$('#fetchExtracciones').DataTable().destroy();
    		document.getElementById("fetchExtracciones").tBodies[0].innerHTML = "";

    		$('#fetchDetalleExtracciones').DataTable().destroy();
			document.getElementById("fetchDetalleExtracciones").tBodies[0].innerHTML = "";
			
			EXTRACCIONESPAGADAS = false;
		}
	});

	// Acción Click DataTable Extracciones //
	document.getElementById("fetchExtracciones").onclick = function(e)
	{
		FETCHEXTRACCIONES = e.target.parentNode;

		let formData = new FormData();
        formData.append("idVenta", FETCHEXTRACCIONES.childNodes[0].innerHTML);

        $.ajax({
            url: window.dir + 'index.php/Controller_Extracciones/getDetalleExtraccion',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnRealizarExtraccion').css('display','none');
                $('#loadingRealizarExtraccion').css('display','');
            },
            success: function(data)
            {
				let parsed = JSON.parse(data);
				console.log(parsed);
        		let table = document.getElementById("fetchDetalleExtracciones"); 
				let tbody = table.tBodies[0];

				if (parsed != null) {
					if (FETCHEXTRACCIONES.childNodes[2].innerHTML == '1967' && (parsed[0]['idSalon'] == 0 || parsed[0]['idSalon'] == null)) {
						$('#btnRealizarExtraccion').css('display','none');
						toastr.error('El cliente de la venta WEB no tiene un salon asignado.', 'Error');
					}else{
						$('#btnRealizarExtraccion').css('display','');
					}
	
					$('#fetchDetalleExtracciones').DataTable().destroy();
						table.tBodies[0].innerHTML = "";
		
						for (var i = 0; i < parsed.length; i++){
		
							let row  = tbody.insertRow(i);
							let cel1 = row.insertCell(0);
							let cel2 = row.insertCell(1);
							let cel3 = row.insertCell(2);
							let cel4 = row.insertCell(3);
							let cel5 = row.insertCell(4);
							let cel6 = row.insertCell(5);
		
							cel1.innerHTML = parsed[i]['ID'];
							cel2.innerHTML = parsed[i]['Nombre'];
							cel3.innerHTML = parsed[i]['Fecha_venta'];
							cel4.innerHTML = parsed[i]['Total'];
							cel5.innerHTML = parsed[i]['Total_desc'];
							cel6.innerHTML = parsed[i]['Extraido'];
						}
		
					   fetch("fetchDetalleExtracciones");
				}
				else{
					$('#btnRealizarExtraccion').css('display','none');
					toastr.error('La venta no cuenta con Ventas Menudeo.', 'Error');
				}				

            }
        })
        .done(function() {
        	$('#loadingHeader').css('display','none');
            $('#loadingRealizarExtraccion').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnRealizarExtraccion').css('display','');
            $('#loadingRealizarExtraccion').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	}














































































































	// Boton Extraer Pedido //
	$("#btnRealizarExtraccion").click(function(event) {

		let Contador = 0;
		let Bodega   = $("#selectBodega").val();

		// console.log(EXTRACCIONESPAGADAS);

		if (Bodega != ""){
			if (FETCHEXTRACCIONES != null){
				if(parseFloat(FETCHEXTRACCIONES.childNodes[8].childNodes[0].innerHTML) <= 10 || !EXTRACCIONESPAGADAS){
					
					swal({
						title: "¿Esta seguro que desea realizar la extracción?",
						text: "Una vez realizada la extracción se descontaran las existencias del inventario",
						icon: "warning",
						buttons: true,
						dangerMode: true,
					})
					.then((willDelete) => {
						if (willDelete) {
							let formData = new FormData();
							formData.append("idVenta", FETCHEXTRACCIONES.childNodes[0].innerHTML);
							formData.append("idSucursal", Bodega);
							formData.append("idDistribuidor", FETCHEXTRACCIONES.childNodes[2].innerHTML);

							$.ajax({
								url: window.dir + 'index.php/Controller_Extracciones/getDetailSellTemp',
								type: 'POST',
								processData: false,
								contentType: false,
								timeout: 800000,
								data: formData,
								beforeSend : function ()
								{
									$('#loadingHeader').css('display','');
									$('#btnRealizarExtraccion').css('display','none');
									$('#loadingRealizarExtraccion').css('display','');
								},
								success: function(data)
								{
									let parsed = JSON.parse(data);

									console.log(parsed);
									
									if (!isNaN(parsed.response)){

										switch(parseInt(parsed.response)){

											case 0:

												
													$('#fetchListLocation').DataTable().destroy();
													document.getElementById("fetchListLocation").tBodies[0].innerHTML = "";
													let tbody       = document.getElementById("fetchListLocation").tBodies[0]; 

													for (let i = 0; i < parsed['info'].length; i++){

														if (parsed['info'][i]['listLocationOrigin'].length > 0) {

															let row  = tbody.insertRow(i);
															let cel1 = row.insertCell(0);
															let cel2 = row.insertCell(1);
															let cel3 = row.insertCell(2);
															let cel4 = row.insertCell(3);
															let cel5 = row.insertCell(4);
															let cel6 = row.insertCell(5);

															cel1.innerHTML = parsed['info'][i]['idCatalogo'];
															cel2.innerHTML = parsed['info'][i]['Producto'];

															if (parsed['info'][i]['listLocationOrigin'].length > 0){
																let select = document.createElement("select");
																select.setAttribute("class", "form-control");
																select.addEventListener('change', updateValue);
																cel3.appendChild(select);

																for (let x = 0; x < parsed['info'][i]['listLocationOrigin'].length; x++) {
																	let option = document.createElement("option");
																	option.value = parsed['info'][i]['listLocationOrigin'][x]['idLocacion'];
																	option.text = parsed['info'][i]['listLocationOrigin'][x]['Locacion'];
																	option.dataset.val = parsed['info'][i]['listLocationOrigin'][x]['ShowExistencias']; 
																	select.appendChild(option);
																}
															}

															if (parsed['info'][i]['listLocationDestination'].length > 0){
																let select = document.createElement("select");
																select.setAttribute("class", "form-control");
																cel4.appendChild(select);

																// let optionG = document.createElement("option");
																// optionG.value = "";
																// optionG.text = "Seleccionar....";
																// select.appendChild(optionG);

																for (let x = 0; x < parsed['info'][i]['listLocationDestination'].length; x++) {
																	let option = document.createElement("option");
																	option.value = parsed['info'][i]['listLocationDestination'][x]['id'];
																	option.text = parsed['info'][i]['listLocationDestination'][x]['Locacion'];
																	select.appendChild(option);
																}
															}

															if (parsed['info'][i]['Cantidad_picking'] != null && parsed['info'][i]['Cantidad_picking'] != "") {
																let input = document.createElement("input");
																input.setAttribute("class", "form-control");
																input.setAttribute("type", "number");
																input.setAttribute("min", "0");
																input.setAttribute("value", parsed['info'][i]['listLocationOrigin'][0]['ShowExistencias']);
																cel5.appendChild(input);
															}else{
																let input = document.createElement("input");
																input.setAttribute("class", "form-control");
																input.setAttribute("type", "number");
																input.setAttribute("min", "0");
																input.setAttribute("value", parsed['info'][i]['listLocationOrigin'][0]['ShowExistencias']);
																cel5.appendChild(input);
															}

															cel6.innerHTML = parsed['info'][i]['idInventario'];
															cel6.setAttribute("hidden", "hidden");

														}else{
															toastr.error('No se encontraron locaciones Orígenes con existencias del producto: ' + parsed['info'][i]['Producto'], 'Error');
															break;
														}
													}

													$("#modalListLocation").modal("show");

													fetch('fetchListLocation');
												
												

											toastr.error('Categoria 1 en locacion 0', 'Error');
											break;

											case 1:
											toastr.error('La extracción no se puede realizar debido a que no hay detalle de la venta menudeo.', 'Error');
											break;

											case 2:
											toastr.error('Al realizar el descuento de las existencias de la extracción.', 'Error');
											break;

											case 3:
											toastr.error('Ocurrio un error al modificar el status de la venta.', 'Error');
											break;

											case 9999:

											/*if (FETCHEXTRACCIONES.childNodes[2].innerHTML == 1967) {
												window.open("http://integrattodev.cloudapp.net/WebServiceSendMail/SendMail.php?idVenta="+FETCHEXTRACCIONES.childNodes[0].innerHTML+"",'_blank');
											}*/

											Limpiar(1,parsed.idVenta);
											toastr.success('Extración generada con exito.', 'Correcto');
											break;

											case 8888:
											Limpiar(2,null);
											toastr.error('Ocurrio un error al generar la extracción por favor intente nuevamente', 'Error');
											break;

											case 7777:
											toastr.error('Ocurrio un error al generar la extracción por favor intente nuevamente', 'Error');
											break;

											case 6666:
											toastr.error('Ocurrio un error al generar la extracción por favor intente nuevamente', 'Error');
											break;

											case 88881:
											Limpiar(2,null);
											toastr.error('Ocurrio un error al generar la extracción por favor intente nuevamente', 'Error');
											break;

											case 77771:
											toastr.error('Ocurrio un error al generar la extracción por favor intente nuevamente', 'Error');
											break;

											case 66661:
											toastr.error('Ocurrio un error al generar la extracción por favor intente nuevamente', 'Error');
											break;

											case 1500:
											toastr.error('El cliente NO tiene una sucursal asignada.', 'Error');
											break;	
											
											case 2500:
											toastr.error('Ocurrio un error al eliminar los registros de detalle venta menudeo temp.', 'Error');
											break;	

											default:
											toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
										}
									}
									else{
										try {
											let Nombre_Productos = "";
											let parseJson = JSON.parse(data);

											if (typeof parseJson['Producto1'] != "undefined"){
												if (Object.keys(parseJson['Producto1']).length === 0){

												}
												else{
													for (var i = 0; i < parseJson['Producto1'].length; i++){
														Nombre_Productos = Nombre_Productos + parseJson['Producto1'][i] + "\n";
													}

													swal("Productos sin Pedimentos registrados del producto:", Nombre_Productos, "info");
												}
											}
											else if (typeof parseJson['Producto'] != "undefined"){
												if (Object.keys(parseJson['Producto']).length === 0){

												}
												else{
													for (var i = 0; i < parseJson['Producto'].length; i++){
														Nombre_Productos = Nombre_Productos + parseJson['Producto'][i] + "\n";
													}

													swal("Productos sin existencias suficientes", Nombre_Productos, "info");
												}
											}

										}
										catch (error){

											swal("Diferencia de Importes", data, "info");
										}
									}
								}
							})
							.done(function() {
								$('#loadingHeader').css('display','none');
								$('#btnRealizarExtraccion').css('display','');
								$('#loadingRealizarExtraccion').css('display','none');
							})
							.fail(function(jqXHR, textStatus, errorThrown) {
								$('#loadingHeader').css('display','none');
								$('#btnRealizarExtraccion').css('display','');
								$('#loadingRealizarExtraccion').css('display','none');
								$("#modalErrorConexion").modal("show");
							})
							.always(function() {
							});
						}
					});
				}
				else{
					toastr.error('Al venta tiene un adeudo mayor a 10', 'Error');
				}
			}
		}
	});

	//////////////////////////////////
	/// Historial Extracciones Tab ///
	//////////////////////////////////

	// Acción Click DataTable Extracciones //
	document.getElementById("fetchHistorial").onclick = function(e)
	{
		FETCHHISTORIAL = e.target.parentNode;
	}

	// Acción Bodega Historial //
	$("#selectBodegaHistorial").change(function(event) {
		let Bodega = $("#selectBodegaHistorial").val();
		let Distri = $("#selectDistribuidor").val();
		let DateSt = $('#DateStartVentas').val();
  		let DateEn = $('#DateEndVentas').val();

		if (Bodega != ""){

			if (DateSt != '' && DateEn != ''){
				$('#fetchHistorial').DataTable().destroy();
				fetchHistorial('yes', DateSt,DateEn,Distri,Bodega);
			}
			else{
				$('#fetchHistorial').DataTable().destroy();
				fetchHistorial('no','', '',Distri,Bodega);
			}
		}
		else{

			$('#fetchHistorial').DataTable().destroy();
    		document.getElementById("fetchHistorial").tBodies[0].innerHTML = "";
		}
	});

	// Acción Distribuidor //
	$("#selectDistribuidor").change(function(event) {
		let Bodega = $("#selectBodegaHistorial").val();
		let Distri = $("#selectDistribuidor").val();
		let DateSt = $('#DateStartVentas').val();
  		let DateEn = $('#DateEndVentas').val();

		if (Bodega != ""){

			if (DateSt != '' && DateEn != ''){
				$('#fetchHistorial').DataTable().destroy();
				fetchHistorial('yes', DateSt,DateEn,Distri,Bodega);
			}
			else{
				$('#fetchHistorial').DataTable().destroy();
				fetchHistorial('no','', '',Distri,Bodega);
			}
		}
		else{

			$('#fetchHistorial').DataTable().destroy();
    		document.getElementById("fetchHistorial").tBodies[0].innerHTML = "";
		}
	});

	// Acción Buscar Historial Extracción //
	$("#searchVentas").click(function(event) {
		let Bodega = $("#selectBodegaHistorial").val();
		let Distri = $("#selectDistribuidor").val();
		let DateSt = $('#DateStartVentas').val();
  		let DateEn = $('#DateEndVentas').val();

		if (Bodega != ""){

			if (DateSt != '' && DateEn != ''){
				$('#fetchHistorial').DataTable().destroy();
				fetchHistorial('yes', DateSt,DateEn,Distri,Bodega);
			}
			else{
				$('#fetchHistorial').DataTable().destroy();
				fetchHistorial('no','', '',Distri,Bodega);
			}
		}
		else{

			$('#fetchHistorial').DataTable().destroy();
    		document.getElementById("fetchHistorial").tBodies[0].innerHTML = "";
		}
	});


	$("#btnEliminarExtraccion").click(function(event) {
	
		if (FETCHHISTORIAL != null){

			swal({
			  	title: "¿Esta seguro que desea eliminar la extracción N° " + FETCHHISTORIAL.childNodes[0].innerHTML + "?",
			  	text: "Una vez eliminado las existencias de la extracción volveran al inventario",
			  	icon: "warning",
			  	buttons: true,
			  	dangerMode: true,
			})
			.then((willDelete) => {
			  	if (willDelete) {

			  		let Bodega = $("#selectBodegaHistorial").val();

				  	let formData = new FormData();
		            formData.append("idVenta", FETCHHISTORIAL.childNodes[0].innerHTML);
		            formData.append("idBodega", Bodega);

		            $.ajax({
		                url: window.dir + 'index.php/Controller_Extracciones/deleteExtraccion',
		                type: 'POST',
		                processData: false,
		                contentType: false,
		                timeout: 8000000,
		                data: formData,
		                beforeSend : function ()
		                {
		                    $('#loadingHeader').css('display','');
		                    $('#btnEliminarExtraccion').css('display','none');
		                    $('#loadingEliminarExtraccion').css('display','');
		                    $('#btnImprimir').css('display','none');
		                    $('#loadingImprimir').css('display','');
		                },
		                success: function(data)
		                {
		                	console.log(data);

		                	switch(parseInt(data.trim())){

		                		case 9999:
		                			Limpiar(3,null);
		                			toastr.success('Extracción eliminada con exito', 'Correcto');
		                		break;

		                		case 3:
		                			toastr.error('Ocurrio un error al regresar las existencias al inventario', 'Error');
		                		break;

		                		case 2:
		                			toastr.error('La extracción no cuenta con movimientos de la tabla detalle venta menudeo temp', 'Error');
		                		break;

		                		case 1:
		                			toastr.error('La extracción ya se encuentra timbrada', 'Error');
		                		break;
		                	}
	                	}
		            })
		            .done(function() {
		                $('#loadingHeader').css('display','none');
	                    $('#btnEliminarExtraccion').css('display','');
	                    $('#loadingEliminarExtraccion').css('display','none');
	                    $('#btnImprimir').css('display','');
	                    $('#loadingImprimir').css('display','none');
		            })
		             .fail(function(jqXHR, textStatus, errorThrown) {
		             	$('#loadingHeader').css('display','none');
	                    $('#btnEliminarExtraccion').css('display','');
	                    $('#loadingEliminarExtraccion').css('display','none');
	                    $('#btnImprimir').css('display','');
	                    $('#loadingImprimir').css('display','none');
	                    $("#modalErrorConexion").modal("show");
		        	})
		            .always(function() {
		            });
			  	}
			});
		}
		else{
            toastr.warning('Por favor, Seleccione una venta', 'Advertencia');
		}
	});

	$("#btnImprimir").click(function(event) {
		if (FETCHHISTORIAL != null){
			let formData = new FormData();
			formData.append("idVenta", FETCHHISTORIAL.childNodes[0].innerHTML);

			$.ajax({
				url: window.dir + 'index.php/Controller_Extracciones/getIDEncryption',
				type: 'POST',
				processData: false,
				contentType: false,
				timeout: 8000000,
				data: formData,
				beforeSend : function ()
				{
					$('#loadingHeader').css('display','');
					$('#btnEliminarExtraccion').css('display','none');
					$('#loadingEliminarExtraccion').css('display','');
					$('#btnImprimir').css('display','none');
					$('#loadingImprimir').css('display','');
				},
				success: function(data)
				{
					console.log(data);
					PrintNotaVenta(data);
					PrintNotaVentaMenudeo(data);
					PrintNotaPicking(data);
				}
			})
			.done(function() {
				$('#loadingHeader').css('display','none');
				$('#btnEliminarExtraccion').css('display','');
				$('#loadingEliminarExtraccion').css('display','none');
				$('#btnImprimir').css('display','');
				$('#loadingImprimir').css('display','none');
			})
				.fail(function(jqXHR, textStatus, errorThrown) {
				$('#loadingHeader').css('display','none');
				$('#btnEliminarExtraccion').css('display','');
				$('#loadingEliminarExtraccion').css('display','none');
				$('#btnImprimir').css('display','');
				$('#loadingImprimir').css('display','none');
				$("#modalErrorConexion").modal("show");
			})
			.always(function() {
			});
		}
		else{
	        toastr.warning('Por favor, Seleccione una venta', 'Advertencia');
		}
	});
});

function fetchHistorial(date,DateSt,DateEn,Distri,Bodega) {
	let dataTable = $('#fetchHistorial').DataTable({
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
	    "order" : [],
	    "ajax" : {
	    	url: window.dir + "index.php/Controller_Extracciones/fetchHistorial",
          	type: "POST",
	        data:{
	          	date:date, DateSt:DateSt, DateEn:DateEn, Distri:Distri, Bodega:Bodega
	        }
	    }
	});
}

function fetch(table)
{
  	$('#'+table).dataTable({
		"order": [],
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

function Limpiar(valor,idVenta) {

	switch(valor){
		case 1:
			refreshExtraccion();
			PrintNotaVenta(idVenta);
			PrintNotaVentaMenudeo(idVenta);
			PrintNotaPicking(idVenta);
			FETCHEXTRACCIONES = null;
		break;

		case 2:
			refreshExtraccion();
			FETCHEXTRACCIONES = null;
		break;

		case 3:
			refreshExtraccion();
			$('#fetchHistorial').DataTable().ajax.reload();
			FETCHHISTORIAL = null;
		break;
	}
}

function PrintNotaVenta(idVenta) {
	window.open("http://integrattodev.cloudapp.net/Avyna_Notas_de_Venta/Notas_de_Venta/Notas_ventas_distribuidor.php?idVenta=" + idVenta + "");
}

function PrintNotaVentaMenudeo(idVenta) {
	window.open("http://integrattodev.cloudapp.net/Avyna_Notas_de_Venta/Notas_de_Venta/Notas_venta_menudeo.php?idVenta=" + idVenta + "");
}

function PrintNotaPicking(idVenta) {
	window.open("http://integrattodev.cloudapp.net/Avyna_Notas_de_Venta/Notas_de_Venta/Notas_venta_picking.php?idVenta=" + idVenta + "");
}


function refreshExtraccion() {
	
	let Bodega = $("#selectBodega").val();

	if (Bodega != ""){

		let formData = new FormData();
        formData.append("idSucursal", Bodega);

        $.ajax({
            url: window.dir + 'index.php/Controller_Extracciones/getInfoExtracciones',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnRealizarExtraccion').css('display','none');
                $('#loadingRealizarExtraccion').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);
            	let table  = document.getElementById("fetchExtracciones"); 
        		let tbody  = table.tBodies[0];

        		$('#fetchExtracciones').DataTable().destroy();
        		document.getElementById("fetchExtracciones").tBodies[0].innerHTML = "";

        		for (var i = 0; i < parsed['Extraccion'].length; i++){

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

	                cel1.innerHTML = parsed['Extraccion'][i]['ID'];
					cel2.innerHTML = parsed['Extraccion'][i]['Fecha_venta'];
					cel3.innerHTML = parsed['Extraccion'][i]['idDistribuidor'];
	                cel4.innerHTML = parsed['Extraccion'][i]['Nombre'];
					cel5.innerHTML = parsed['Extraccion'][i]['Fecha'];
					cel6.innerHTML = parsed['Extraccion'][i]['Fecha_ref'];
	                cel7.innerHTML = parsed['Extraccion'][i]['Pedidos'];
					cel8.innerHTML = parsed['Extraccion'][i]['Total'];

					if (parseFloat(parsed['Extraccion'][i]['Adeudo']) <= 10){
		                cel9.innerHTML = "<label class='badge badge-success'>" + parsed['Extraccion'][i]['Adeudo'] + "</label>";
		            }
		            else{
		                cel9.innerHTML = "<label class='badge badge-danger'>" + parsed['Extraccion'][i]['Adeudo'] + "</label>";
		            }      
	            }

	            fetch("fetchExtracciones");
	            $('#fetchDetalleExtracciones').DataTable().destroy();
				document.getElementById("fetchDetalleExtracciones").tBodies[0].innerHTML = "";
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnRealizarExtraccion').css('display','');
            $('#loadingRealizarExtraccion').css('display','none');

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnRealizarExtraccion').css('display','');
            $('#loadingRealizarExtraccion').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	}
	else{

		$('#fetchExtracciones').DataTable().destroy();
		document.getElementById("fetchExtracciones").tBodies[0].innerHTML = "";

		$('#fetchDetalleExtracciones').DataTable().destroy();
		document.getElementById("fetchDetalleExtracciones").tBodies[0].innerHTML = "";
	}
}

function addMoveLocation() {

	let listRequest = [];
	let Contador = 0;

	let idSucursal = $("#selectBodega").val();

	$('#fetchListLocation').DataTable().destroy();
	let Tbody       = document.getElementById("fetchListLocation").tBodies[0];

	if (Tbody.rows.length > 0) {		

		for (let i = 0; i < Tbody.rows.length; i++) {
			let idCatalogo   = Tbody.rows[i].cells[0].innerHTML;
			let Producto   = Tbody.rows[i].cells[1].innerHTML;
			let idLocationOrigin	  = Tbody.rows[i].cells[2].childNodes[0].value;
			let idLocationDestination = Tbody.rows[i].cells[3].childNodes[0].value;
			let CantMove 			  = Tbody.rows[i].cells[4].childNodes[0].value;
			let idInventario 		  = Tbody.rows[i].cells[5].innerHTML;
			let picking 			  = Tbody.rows[i].cells[2].querySelector(':checked').getAttribute('data-val');

			list = {
				'idInventario': idInventario, 
				'idCatalogo' : idCatalogo,
				'Producto': Producto,
				'idLocationOrigin': idLocationOrigin,
				'idLocationDestination' : idLocationDestination,
				'CantMove' : CantMove,
				'CantidadPicking': picking
			}

			listRequest.push(list);

			if (Tbody.rows[i].cells[4].childNodes[0].value <= 0) {
				swal(`Cant Movimiento no puede ser menor o igual a 0 \n en el producto: ${Tbody.rows[i].cells[1].innerHTML}`);
				Contador++;
				break;
			}

			if (parseInt(CantMove) > parseInt(picking)) {
				swal(`Se esta tratando de sacra mas producto del que tienen en existencias producto: ${Tbody.rows[i].cells[1].innerHTML}`);
				Contador++;
				break;
			}
		}
	}

	if (Contador == 0) {
		swal({
			title: "¿Esta seguro que desea realizar los movimientos de locación?",
			text: "Una vez realizado este proceso, el inventario con sus locaciones se verán afectados.",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {

				let formData = new FormData();
				formData.append("data", JSON.stringify(listRequest));
				formData.append("idSucursal", idSucursal);
		
				$.ajax({
					url: window.dir + 'index.php/Controller_Extracciones/addMovimiento',
					type: 'POST',
					processData: false,
					contentType: false,
					timeout: 800000,
					data: formData,
					beforeSend : function ()
					{
						$('#loadingHeader').css('display','');
						$('#LoadLocationMove').css('display','');
					},
					success: function(data){
						console.log(data)
						let parsed = JSON.parse(data);
						console.log(parsed);

						switch (parsed.code) {
							case 200:
								swal("Correcto", `${parsed.message} \n  \n El proceso esta en espera de movimiento de locación.`, "success");
								$("#modalListLocation").modal("hide");

								$('#fetchListLocation').DataTable().destroy();
								document.getElementById("fetchListLocation").tBodies[0].innerHTML = "";

								break;
							case 501:
								swal("Advertencia", `${parsed.message}`, "warning");
								break;
							case 500:
								swal("Error", `${parsed.message}`, "error");
								break;
							// case value:
					
							// 	break;
							// case value:
				
							// 	break;
							// case value:
			
							// 	break;
							// case value:
		
							// 	break;
						}
						
					}
				})
				.done(function() {
					$('#loadingHeader').css('display','none');
					$('#LoadLocationMove').css('display','none');
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					$('#loadingHeader').css('display','none');
					$('#LoadLocationMove').css('display','none');
					$("#modalErrorConexion").modal("show");
				})
				.always(function() {
					$('#loadingHeader').css('display','none');
					$('#LoadLocationMove').css('display','none');
				});
			}
		});
	}
}

