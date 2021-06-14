var tableInvDetalleBodega = null;
var tableInvBodega = null;
var tableInvLocacion = null
var tableInvDetalleLocacion = null;
var tableInvMovimiento = null;

$(document).ready(function(){

	// Cargar Libreria daterange //
	$('.input-daterange').datepicker({
	  format: "yyyy-mm-dd",
	  autoclose: true
	});

	// DataTable Inventario General //
	fetchInventarioGeneral('','','','');

	
	// Cargar Alerts Toast //
  	Toast();

	  

							  

	$("#selectOPendiente").change(function (event) {
		let idsucursal = $("#selectOPendiente").val();
		if (idsucursal != "" && idsucursal != null) {
			// DataTable Movimientos Operador Pendientes //
			fetchGlobal('fetchMovimientoOperador',5, idsucursal);
		}
		else{
			$('#fetchMovimientoOperador').DataTable().destroy();
			document.getElementById("fetchMovimientoOperador").tBodies[0].innerHTML = "";
		}
		
	});

	$("#selectOPP").change(function (event) {
		let idsucursal = $("#selectOPP").val();
		if (idsucursal != "" && idsucursal != null) {
			// DataTable Movimientos Operador Realizados //
			fetchGlobal('fetchMovimientoOperadorRealizados',6, idsucursal);
		}else{
			$('#fetchMovimientoOperadorRealizados').DataTable().destroy();
			document.getElementById("fetchMovimientoOperadorRealizados").tBodies[0].innerHTML = "";
		}
		
	});

	// Filtros Inventario General //

	// Marca Inventario General //
	$("#selectMarcaInvGeneral").change(function(event) {
		let Marca 	 = $("#selectMarcaInvGeneral").val();
		let Divicion = $("#selectInvDivisionGeneral").val();
		let Linea 	 = $("#selectLineaInvGeneral").val();
		let Sublinea = $("#selectSublineaInvGeneral").val();
		let Inventario_General    = document.getElementById("fetchInventarioGeneral"); 
		$('#fetchInventarioGeneral').DataTable().destroy();
	    Inventario_General.tBodies[0].innerHTML = "";
		fetchInventarioGeneral(Marca,Divicion,Linea,Sublinea);
	});

	// Division Inventario General //
	$("#selectInvDivisionGeneral").change(function(event) {
		let Marca 	 = $("#selectMarcaInvGeneral").val();
		let Divicion = $("#selectInvDivisionGeneral").val();
		let Linea 	 = $("#selectLineaInvGeneral").val();
		let Sublinea = $("#selectSublineaInvGeneral").val();
		let Inventario_General    = document.getElementById("fetchInventarioGeneral"); 
		$('#fetchInventarioGeneral').DataTable().destroy();
	    Inventario_General.tBodies[0].innerHTML = "";
		fetchInventarioGeneral(Marca,Divicion,Linea,Sublinea);
	});

	// Linea Inventario General //
	$("#selectLineaInvGeneral").change(function(event) {
		let Marca 	 = $("#selectMarcaInvGeneral").val();
		let Divicion = $("#selectInvDivisionGeneral").val();
		let Linea 	 = $("#selectLineaInvGeneral").val();
		let Sublinea = $("#selectSublineaInvGeneral").val();
		let Inventario_General    = document.getElementById("fetchInventarioGeneral"); 
		$('#fetchInventarioGeneral').DataTable().destroy();
	    Inventario_General.tBodies[0].innerHTML = "";
		fetchInventarioGeneral(Marca,Divicion,Linea,Sublinea);
	});

	// Sublinea Inventario General //
	$("#selectSublineaInvGeneral").change(function(event) {
		let Marca 	 = $("#selectMarcaInvGeneral").val();
		let Divicion = $("#selectInvDivisionGeneral").val();
		let Linea 	 = $("#selectLineaInvGeneral").val();
		let Sublinea = $("#selectSublineaInvGeneral").val();
		let Inventario_General    = document.getElementById("fetchInventarioGeneral"); 
		$('#fetchInventarioGeneral').DataTable().destroy();
	    Inventario_General.tBodies[0].innerHTML = "";
		fetchInventarioGeneral(Marca,Divicion,Linea,Sublinea);
	});

	// Acción Click Table Inventario Detalle Bodega //
	document.getElementById("fetchBodega").onclick = function(e){
	    tableInvBodega = e.target.parentNode;
	    cargarfetchDetalleBodega();
	}


	////////////////////////////////////////////////////////////////
	/////////////////////  Inventario Bodega ///////////////////////
	////////////////////////////////////////////////////////////////

	$("#selectInvBodega").change(function(event) {
		let Bodega = $("#selectInvBodega").val();

		if (Bodega != null && Bodega != ""){
			let Marca 	 = $("#selectMarcaInvBodega").val();
			let Divicion = $("#selectDivisionInvBodega").val();
			let Linea 	 = $("#selectLineaInvBodega").val();
			let Sublinea = $("#selectSublineaInvBodega").val();
			let InventarioBodega    = document.getElementById("fetchBodega"); 
			$('#fetchBodega').DataTable().destroy();
		    InventarioBodega.tBodies[0].innerHTML = "";
			fetchBodega(Marca,Divicion,Linea,Sublinea,Bodega);
		}else{
            let InventarioBodega    = document.getElementById("fetchBodega"); 
			$('#fetchBodega').DataTable().destroy();
		    InventarioBodega.tBodies[0].innerHTML = "";
		    $("#selectMarcaInvBodega").val('');
		    $("#selectDivisionInvBodega").val('');
		    $("#selectLineaInvBodega").val('');
		    $("#selectSublineaInvBodega").val('');
		}
	});

	// Filtros Inventario Bodega //

	// Marca Inventario Bodega //
	$("#selectMarcaInvBodega").change(function(event) {
		let Bodega = $("#selectInvBodega").val();

		if (Bodega != null && Bodega != ""){
			let Marca 	 = $("#selectMarcaInvBodega").val();
			let Divicion = $("#selectDivisionInvBodega").val();
			let Linea 	 = $("#selectLineaInvBodega").val();
			let Sublinea = $("#selectSublineaInvBodega").val();
			let InventarioBodega    = document.getElementById("fetchBodega"); 
			$('#fetchBodega').DataTable().destroy();
		    InventarioBodega.tBodies[0].innerHTML = "";
			fetchBodega(Marca,Divicion,Linea,Sublinea,Bodega);
		}else{
            let InventarioBodega    = document.getElementById("fetchBodega"); 
			$('#fetchBodega').DataTable().destroy();
		    InventarioBodega.tBodies[0].innerHTML = "";
		    $("#selectMarcaInvBodega").val('');
		    $("#selectDivisionInvBodega").val('');
		    $("#selectLineaInvBodega").val('');
		    $("#selectSublineaInvBodega").val('');
		}
	});

	// Division Inventario Bodega //
	$("#selectDivisionInvBodega").change(function(event) {
		let Bodega = $("#selectInvBodega").val();

		if (Bodega != null && Bodega != ""){
			let Marca 	 = $("#selectMarcaInvBodega").val();
			let Divicion = $("#selectDivisionInvBodega").val();
			let Linea 	 = $("#selectLineaInvBodega").val();
			let Sublinea = $("#selectSublineaInvBodega").val();
			let InventarioBodega    = document.getElementById("fetchBodega"); 
			$('#fetchBodega').DataTable().destroy();
		    InventarioBodega.tBodies[0].innerHTML = "";
			fetchBodega(Marca,Divicion,Linea,Sublinea,Bodega);
		}else{
            let InventarioBodega    = document.getElementById("fetchBodega"); 
			$('#fetchBodega').DataTable().destroy();
		    InventarioBodega.tBodies[0].innerHTML = "";
		    $("#selectMarcaInvBodega").val('');
		    $("#selectDivisionInvBodega").val('');
		    $("#selectLineaInvBodega").val('');
		    $("#selectSublineaInvBodega").val('');
		}
	});

	// Linea Inventario Bodega //
	$("#selectLineaInvBodega").change(function(event) {
		let Bodega = $("#selectInvBodega").val();

		if (Bodega != null && Bodega != ""){
			let Marca 	 = $("#selectMarcaInvBodega").val();
			let Divicion = $("#selectDivisionInvBodega").val();
			let Linea 	 = $("#selectLineaInvBodega").val();
			let Sublinea = $("#selectSublineaInvBodega").val();
			let InventarioBodega    = document.getElementById("fetchBodega"); 
			$('#fetchBodega').DataTable().destroy();
		    InventarioBodega.tBodies[0].innerHTML = "";
			fetchBodega(Marca,Divicion,Linea,Sublinea,Bodega);
		}else{
            let InventarioBodega    = document.getElementById("fetchBodega"); 
			$('#fetchBodega').DataTable().destroy();
		    InventarioBodega.tBodies[0].innerHTML = "";
		    $("#selectMarcaInvBodega").val('');
		    $("#selectDivisionInvBodega").val('');
		    $("#selectLineaInvBodega").val('');
		    $("#selectSublineaInvBodega").val('');
		}
	});

	// Sublinea Inventario Bodega //
	$("#selectSublineaInvBodega").change(function(event) {
		let Bodega = $("#selectInvBodega").val();

		if (Bodega != null && Bodega != ""){
			let Marca 	 = $("#selectMarcaInvBodega").val();
			let Divicion = $("#selectDivisionInvBodega").val();
			let Linea 	 = $("#selectLineaInvBodega").val();
			let Sublinea = $("#selectSublineaInvBodega").val();
			let InventarioBodega    = document.getElementById("fetchBodega"); 
			$('#fetchBodega').DataTable().destroy();
		    InventarioBodega.tBodies[0].innerHTML = "";
			fetchBodega(Marca,Divicion,Linea,Sublinea,Bodega);
		}else{
            let InventarioBodega    = document.getElementById("fetchBodega"); 
			$('#fetchBodega').DataTable().destroy();
		    InventarioBodega.tBodies[0].innerHTML = "";
		    $("#selectMarcaInvBodega").val('');
		    $("#selectDivisionInvBodega").val('');
		    $("#selectLineaInvBodega").val('');
		    $("#selectSublineaInvBodega").val('');
		}
	});

	// Acción click Inventario Detalle Bodega //
	document.getElementById("fetchDetalleBodega").onclick = function(e){
		tableInvDetalleBodega = e.target.parentNode;
	}

	// Botonn Editar Locacion Inventario Bodega Detalle //
	$("#btnEditarLocacion").click(function(event) {
		if (tableInvDetalleBodega != null){
			modalEditarInvDetalleBodega();
		}
		else{
	        toastr.warning('Por favor, Seleccione un detalle de inventario', 'Advertencia');
		}
	});

	// Acción Boton Guardar Cambios Inventario Detalle Bodega //
	$("#btnGuardarInvDetalleBodega").click(function(event) {

		let Fecha 	 	= $("#txtFechaIngresoBodega").val();
		let Locacion 	= $("#selectLocacionBodega").val();
		let Existencias = $("#txtExistenciasBodega").val();
		let ID 			= tableInvDetalleBodega.childNodes[3].innerHTML;
		let OldExistencias = tableInvDetalleBodega.childNodes[2].innerHTML;

		let formData = new FormData();
        formData.append("ID", ID);
        formData.append("Fecha_ingreso", Fecha);
        formData.append("idLocacion", Locacion);
        formData.append("Existencias", Existencias);
        formData.append("OldExistencias", OldExistencias);

	    $.ajax({
            url: window.dir + 'index.php/Controller_Inventario/UpdateInvDetalleBodega',
            type: 'POST',
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            timeout: 35000,
            //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display', '');
	            $('#btnCerrarInvDetalleBodega').css('display', 'none');
	            $('#loadingCerrarInvDetalleBodega').css('display', '');
	            $('#btnGuardarInvDetalleBodega').css('display', 'none');
	            $('#loadingGuardarInvDetalleBodega').css('display', '');
            },
            success: function(data)
            {
            	switch(parseInt(data.trim())){

		            case 0:
		              toastr.error('Ocurrio un error al modificar el detalle inventario.', 'Error');
		            break;

		            case 1:
		              Limpiar(1);
		              toastr.success('Detalle inventario modificado con exito.', 'Correcto');
		            break;

		            default:
		              toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
		        }
	        }
        })
        .done(function() {
            $('#loadingHeader').css('display', 'none');
            $('#btnCerrarInvDetalleBodega').css('display', '');
            $('#loadingCerrarInvDetalleBodega').css('display', 'none');
            $('#btnGuardarInvDetalleBodega').css('display', '');
            $('#loadingGuardarInvDetalleBodega').css('display', 'none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display', 'none');
            $('#btnCerrarInvDetalleBodega').css('display', '');
            $('#loadingCerrarInvDetalleBodega').css('display', 'none');
            $('#btnGuardarInvDetalleBodega').css('display', '');
            $('#loadingGuardarInvDetalleBodega').css('display', 'none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});

	///////////////////////////////////////////////////////////////////////////////
	/////////////////////////// Inventario por Locacion ///////////////////////////
	///////////////////////////////////////////////////////////////////////////////

	$("#selectBodegaLocacion").change(function(event) {
	
		let Bodega = $("#selectBodegaLocacion").val();

		if (Bodega != null && Bodega != ""){
			let TableFetchLocacion    = document.getElementById("fetchLocacion"); 
			$('#fetchLocacion').DataTable().destroy();
		    TableFetchLocacion.tBodies[0].innerHTML = "";

			fetchLocacion(Bodega);
		}
		else{
            let TableFetchLocacion    = document.getElementById("fetchLocacion"); 
			$('#fetchLocacion').DataTable().destroy();
		    TableFetchLocacion.tBodies[0].innerHTML = "";
		}
	});

	// Acción Click a la tabla Inventario Locación //
	document.getElementById("fetchLocacion").onclick = function(e)
	{
		tableInvLocacion = e.target.parentNode;

	    let formData = new FormData();
        formData.append("idLocacion", tableInvLocacion.childNodes[0].innerHTML);

	    $.ajax({
            url: window.dir + 'index.php/Controller_Inventario/getInventarioDetalleLocacion',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnEditarXLocacion').css('display','none');
                $('#loadingEditarXLocacion').css('display','');
            },
            success: function(data)
            {
	            let parsed = JSON.parse(data);
	            console.log(parsed);

	            if (parsed != null && parsed != "")
	            {
            		let table   = document.getElementById("fetchInvDetalleLocacion"); 
            		let tbody   = table.tBodies[0];

            		$('#fetchInvDetalleLocacion').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed.length; i++){

			            let row  = tbody.insertRow(i);
			            let cel1 = row.insertCell(0);
			            let cel2 = row.insertCell(1);
			            let cel3 = row.insertCell(2);
			            let cel4 = row.insertCell(3);
			            let cel5 = row.insertCell(4);

			            cel1.innerHTML = parsed[i]['ID'];
			            cel2.innerHTML = parsed[i]['Codigo'];
			            cel3.innerHTML = parsed[i]['Producto'];
			            cel4.innerHTML = parsed[i]['Fecha_ingreso'];
			            cel5.innerHTML = parsed[i]['Existencias'];
			                
			        }

			       	fetch("fetchInvDetalleLocacion");
		        }
	        }
	    })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnEditarXLocacion').css('display','');
            $('#loadingEditarXLocacion').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnEditarXLocacion').css('display','');
            $('#loadingEditarXLocacion').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	}

	// Acción Click a la tabla Inventario Detalle Locación //
	document.getElementById("fetchInvDetalleLocacion").onclick = function(e)
	{
		tableInvDetalleLocacion = e.target.parentNode;
	}

	// Abrir Modal Inventario Detalle Locación //
	$("#btnEditarXLocacion").click(function(event) {
	
		if (tableInvDetalleLocacion != null){
			$("#txtFechaIngresoLocacion").val(tableInvDetalleLocacion.childNodes[3].innerHTML);
			$("#modalEditarInvDetalleLocacion").modal("show");
		}
		else{
	        toastr.warning('Por favor, Seleccione un detalle de inventario', 'Advertencia');
		}
	});

	// Guardar Cambios Inventario Detalle Locación //
	$("#btnGuardarInvDetalleLocacion").click(function(event) {
	
		let Fecha 	 	= $("#txtFechaIngresoLocacion").val();
		let ID 			= tableInvDetalleLocacion.childNodes[0].innerHTML;

		let formData = new FormData();
        formData.append("ID", ID);
        formData.append("Fecha_ingreso", Fecha);

        $.ajax({
            url: window.dir + 'index.php/Controller_Inventario/UpdateInvDetalleLocacion',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnCerrarInvDetalleLocacion').css('display','none');
                $('#loadingCerrarInvDetalleLocacion').css('display','');
                $('#btnGuardarInvDetalleLocacion').css('display','none');
                $('#loadingGuardarInvDetalleLocacion').css('display','');
            },
            success: function(data)
            {
               console.log(data);

               switch(parseInt(data.trim())){

		            case 0:
		              toastr.error('Ocurrio un error al modificar la fecha de ingreso.', 'Error');
		            break;

		            case 1:
		              Limpiar(2);
		              toastr.success('Fecha ingreso modificada con exito.', 'Correcto');
		            break;

		            default:
		              toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
		        }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnCerrarInvDetalleLocacion').css('display','');
            $('#loadingCerrarInvDetalleLocacion').css('display','none');
            $('#btnGuardarInvDetalleLocacion').css('display','');
            $('#loadingGuardarInvDetalleLocacion').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	$('#loadingHeader').css('display','none');
            $('#btnCerrarInvDetalleLocacion').css('display','');
            $('#loadingCerrarInvDetalleLocacion').css('display','none');
            $('#btnGuardarInvDetalleLocacion').css('display','');
            $('#loadingGuardarInvDetalleLocacion').css('display','none');
            $("#modalErrorConexion").modal("show");
    	})
        .always(function() {
        });
	});

	///////////////////////////////////////////////////////////////////////////
	/////////////////////////////////// Movimientos ///////////////////////////
	///////////////////////////////////////////////////////////////////////////

	$("#selectBodegaMovimiento").change(function(event) {
		
		let Bodega   = $("#selectBodegaMovimiento").val();

		if (Bodega != null && Bodega != ""){
			$('#fetchMovimiento').DataTable().destroy();
		    document.getElementById("fetchMovimiento").tBodies[0].innerHTML = "";
			    
			searchLocacion(Bodega);
		}
		else{
			$('#fetchMovimiento').DataTable().destroy();
			document.getElementById("fetchMovimiento").tBodies[0].innerHTML = "";
		}
	});

	// Seleccionar Locacion Envio //
	$("#Select_Locacion_Envia").change(function(event) {
	
		let Bodega   = $("#selectBodegaMovimiento").val();
		let Locacion = $("#Select_Locacion_Envia").val();

		if (Bodega != null && Bodega != ""){
			if (Locacion != null && Locacion != ""){
				$('#fetchMovimiento').DataTable().destroy();
			    document.getElementById("fetchMovimiento").tBodies[0].innerHTML = "";

				fetchInvMovimiento(Bodega,Locacion);
			}
			else{
	            toastr.info('Por favor, seleccione una Locación', 'Importante'); 
				$('#fetchMovimiento').DataTable().destroy();
			    document.getElementById("fetchMovimiento").tBodies[0].innerHTML = "";
			}

		}
		else{
            toastr.warning('Por favor, seleccione una Bodega', 'Advertencia');
			$('#fetchMovimiento').DataTable().destroy();
		    document.getElementById("fetchMovimiento").tBodies[0].innerHTML = "";
		}
	});

	// Acción Click fetchMovimiento //
	document.getElementById("fetchMovimiento").onclick = function(e)
	{
		tableInvMovimiento = e.target.parentNode;
	}

	// Boton Mover Producto //
	$("#btn_Mover").click(function(event) {

		console.log(tableInvMovimiento);
		
		let Enviar = $("#Select_Locacion_Envia").val();
		let Recibe = $("#Select_Locacion_Recibe").val();

		if (Enviar != null && Enviar != "" && Recibe != null && Recibe != ""){
			if (tableInvMovimiento != null){
				$("#Mover_Mercancia").modal("show");
				$("#label_Existencias").text(tableInvMovimiento.childNodes[3].innerHTML);
				$("#number_Cantidad").val(0);
				$("#number_Cantidad").attr('max', tableInvMovimiento.childNodes[3].innerHTML);
			}
			else{
				toastr.warning('Selecciona un detalle inventario', 'Advertencia');
			}
		}
		else{
			toastr.warning('Para poder realizar el movimiento es necesario seleccionar una locacion que envia y otra que recibe', 'Advertencia');
		}
	});


















































	// Mover Producto Por Locación //
	$("#btnMoverInvDetalleLocacion").click(function(event) {

		let Cantidad 	= parseInt($("#number_Cantidad").val());
		let Enviar 	 	= $("#Select_Locacion_Envia").val();
		let Recibe 	 	= $("#Select_Locacion_Recibe").val();
		let Envia_text  = $("#Select_Locacion_Envia option:selected").text();
		let Recibe_text = $("#Select_Locacion_Recibe option:selected").text();
		let Bodega   	= $("#selectBodegaMovimiento").val();
		let Locacion 	= $("#Select_Locacion_Envia").val();

		if (tableInvMovimiento != null) {

			if (Cantidad <= parseInt(tableInvMovimiento.childNodes[3].innerHTML)){
				if (Enviar != Recibe){
					swal({
						title: "¿Esta seguro que desea mover " + Cantidad + " " + tableInvMovimiento.childNodes[2].innerHTML + " de locación?",
						text: "Locación Origen: " + Envia_text + " Locación Destino: " + Recibe_text,
						icon: "warning",
						buttons: true,
						dangerMode: true,
					})
					.then((willDelete) => {
					    if (willDelete){
						    if (Cantidad > 0){
								let formData = new FormData();
						        formData.append("ID", tableInvMovimiento.childNodes[0].innerHTML);
						        formData.append("Cantidad", Cantidad);
						        formData.append("Enviar", Enviar); 
						        formData.append("Recibe", Recibe);
						        formData.append("Existencias_old", tableInvMovimiento.childNodes[3].innerHTML);

						        $.ajax({
						            url: dir + 'index.php/Controller_Inventario/moveLocacion',
						            type: 'POST',
						            processData: false,  // tell jQuery not to process the data
						            contentType: false,
						            timeout: 35000,
						            //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
						            data: formData,
						            beforeSend : function ()
						            {
						                $('#loadingHeader').css('display','');
						                $('#btnCerrarMoverMercancia').css('display','none');
						                $('#loadingCerrarMoverMercancia').css('display','');
						                $('#btnMoverInvDetalleLocacion').css('display','none');
						                $('#loadingMoverInvDetalleLocacion').css('display','');
						            },
						            success: function(data)
						            {
					                	console.log(data);
					                	switch(parseInt(data.trim())){

								            case 0:
								              toastr.error('Ocurrio un erro al hacer el movimiento', 'Error');
								            break;

								            case 1:
								              	Limpiar(3);
								              	toastr.success('Cambio realizado con exito', 'Correcto');
								              	$('#fetchMovimiento').DataTable().destroy();
												document.getElementById("fetchMovimiento").tBodies[0].innerHTML = "";
												fetchInvMovimiento(Bodega,Locacion);
								            break;

								            default:
								              toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
								        }
						            }
					            })
					            .done(function() {
					                $('#loadingHeader').css('display','none');
					                $('#btnCerrarMoverMercancia').css('display','');
					                $('#loadingCerrarMoverMercancia').css('display','none');
					                $('#btnMoverInvDetalleLocacion').css('display','');
					                $('#loadingMoverInvDetalleLocacion').css('display','none');
					            })
					            .fail(function(jqXHR, textStatus, errorThrown) {
					            	$('#loadingHeader').css('display','none');
					                $('#btnCerrarMoverMercancia').css('display','');
					                $('#loadingCerrarMoverMercancia').css('display','none');
					                $('#btnMoverInvDetalleLocacion').css('display','');
					                $('#loadingMoverInvDetalleLocacion').css('display','none');
					                $("#modalErrorConexion").modal("show");
					        	})
					            .always(function() {
					            });
							}
							else{
								toastr.warning('No es posible cambiar el producto de locación si la cantidad es menor a 0', 'Advertencia');
							} // end if Cantidad > 0
				    	}
					});
				}
				else{
				    toastr.error('No es posible hacer el cambio de locación si es la misma', 'Error');
				}
			}
			else{
				toastr.error('La cantidad es mayor a las existencias', 'Error');
			}
		}
		else{
			toastr.warning('Seleccione una detalle inventario', 'Advertencia');
		}
	});

});

// DataTable Inventario Movimiento //
function fetchInvMovimiento(Bodega,Locacion)
{
	let dataTable = $('#fetchMovimiento').DataTable({
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
	        url: window.dir + "index.php/Controller_Inventario/fetchMovimiento",
	        type: "POST",
	        data:{
	         Bodega:Bodega, Locacion:Locacion
	        }
    	}
  	});
}

// DataTable Inventario Locación //
function fetchLocacion(Bodega)
{
	let dataTable = $('#fetchLocacion').DataTable({
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
        	url: window.dir + "index.php/Controller_Inventario/fetchLocacion",
        	type: "POST",
        	data:{
        		Bodega:Bodega
        	}
    	}
    });
}

function fetchGlobal(fetch,line, idSucursal) {
	$(`#${fetch}`).DataTable({
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
                "targets": line,
                'render': function (data, type, full, meta){
					if (line == 5) {
						return "<button class='btn btn-warning' onclick='updateMoveOperador("+ full[0] +")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button> <button class='btn btn-danger' onclick='deleteMoveOperador("+ full[0] +")'><i class='fa fa-trash-o' aria-hidden='true'></i></button>"
					}else{
						return "<button class='btn btn-danger' onclick='deleteMoveOperadorRealizador("+ full[0] +")'><i class='fa fa-trash-o' aria-hidden='true'></i></button>"
					}
                }
            }
        ],
	    "order" : [],
      	"ajax" : {
          	url: window.dir + "index.php/Controller_Inventario/" + fetch,
          	type: "POST",
			  data:{
				idSucursal:idSucursal
		  	}
	    }
    });
}

function updateMoveOperador(ID) {
	console.log(ID);

	let formData = new FormData();
	formData.append("ID", ID);

	$.ajax({
		url: dir + 'index.php/Controller_Inventario/getInfoOperadorById',
		type: 'POST',
		processData: false,  // tell jQuery not to process the data
		contentType: false,
		timeout: 35000,
		//dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		data: formData,
		beforeSend : function (){
			$('#loadingHeader').css('display','');
			$('#Cargando_Header').css('display','');
		},
		success: function(data)
		{
			let parsed = JSON.parse(data);
			console.log(parsed);
			// modalEditMoveOperador

			$("#selectMoveDestino").empty();

			const destino = document.querySelector("#selectMoveDestino");

			parsed['destino'].forEach(element => {
				const option = document.createElement('option');
				option.value = element.ID;
				option.text = element.Locacion;
				destino.appendChild(option);
			});

			$("#selectMoveOrigen").val(parsed['info'][0]['idLocacion_destino']);

			$("#selectMoveOrigen").empty();

			const origen = document.querySelector("#selectMoveOrigen");

			parsed['origen'].forEach(element => {
				const option = document.createElement('option');
				option.value = element.ID;
				option.text = element.Locacion;
				origen.appendChild(option);
			});

			$("#selectMoveOrigen").val(parsed['info'][0]['idLocacion_origen']);

			$("#numCantMove").val(parsed['info'][0]['Cantidad_mov']);

			$("#txtIdMoveOperador").val(parsed['info'][0]['ID']);

			$("#modalEditMoveOperador").modal("show");
		}
	})
	.done(function() {
		$('#loadingHeader').css('display','none');
		$('#Cargando_Header').css('display','none');
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		$('#loadingHeader').css('display','none');
		$('#Cargando_Header').css('display','none');
		$("#modalErrorConexion").modal("show");
	})
	.always(function() {
		$('#loadingHeader').css('display','none');
		$('#Cargando_Header').css('display','none');
	});
}

function btnSaveChange() {

	let Origen  = $("#selectMoveOrigen").val();
	let Destino = $("#selectMoveDestino").val();
	let Cant    = $("#numCantMove").val();
	let ID      = $("#txtIdMoveOperador").val();

	let idsucursalP = $("#selectOPendiente").val();
	let idsucursal = $("#selectOPP").val();

	if (Cant > 0 && Cant != '') {
		let formData = new FormData();
		formData.append("ID", ID);
		formData.append("idLocacion_origen", Origen);
		formData.append("idLocacion_destino", Destino);
		formData.append("Cantidad_mov", Cant);

		$.ajax({
			url: dir + 'index.php/Controller_Inventario/saveChangeMoveOperador',
			type: 'POST',
			processData: false,  // tell jQuery not to process the data
			contentType: false,
			timeout: 35000,
			//dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			data: formData,
			beforeSend : function (){
				$('#loadingHeader').css('display','');
				$('#CargandoMoveOperador').css('display','');
			},
			success: function(data)
			{
				console.log(data);
				let parsed = JSON.parse(data);

				console.log(parsed);
				console.log(parsed.response);

				switch(parseInt(parsed.response)){
					case 0:
						toastr.error(`${parsed.message}`, 'Error');
						swal("Error", `${parsed.message}`, "Error");
					break;
					case 1:
						
						Limpiar(4);
						toastr.success(`${parsed.message}`, 'Correcto');

						$('#fetchMovimientoOperador').DataTable().destroy();
						document.getElementById("fetchMovimientoOperador").tBodies[0].innerHTML = "";

						$('#fetchMovimientoOperadorRealizados').DataTable().destroy();
						document.getElementById("fetchMovimientoOperadorRealizados").tBodies[0].innerHTML = "";

						// DataTable Movimientos Operador Pendientes //
						fetchGlobal('fetchMovimientoOperador',5, idsucursalP);

						// DataTable Movimientos Operador Realizados //
						fetchGlobal('fetchMovimientoOperadorRealizados',6, idsucursal);

					break;

					case 2:
						toastr.error(`${parsed.message}`, 'Error');
						swal("Advertencia", `${parsed.message}`, "warning");
					break;

					case 3:
						toastr.error(`${parsed.message}`, 'Error');
						swal("Advertencia", `${parsed.message}`, "warning");
					break;

					default:
					  toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
				}
			}
		})
		.done(function() {
			$('#loadingHeader').css('display','none');
			$('#CargandoMoveOperador').css('display','none');
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			$('#loadingHeader').css('display','none');
			$('#CargandoMoveOperador').css('display','none');
			$("#modalErrorConexion").modal("show");
		})
		.always(function() {
			$('#loadingHeader').css('display','none');
			$('#CargandoMoveOperador').css('display','none');
		});

	}else{

	}
}

function deleteMoveOperador(ID) {
	console.log(ID);
	console.log("Delete Move");

	let idsucursalP = $("#selectOPendiente").val();
	let idsucursal = $("#selectOPP").val();

	swal({
		title: "¿Esta seguro que desea eliminar el movimiento operador con el N° " + ID + "?",
		text: "Una vez realizado este proceso el operador no podrá mover de lo locación el producto. \n y por consecuente no se sera posible extraer la venta.",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		if (willDelete) {
			let formData = new FormData();
			formData.append("ID", ID);

			$.ajax({
				url: dir + 'index.php/Controller_Inventario/deleteMoveOperador',
				type: 'POST',
				processData: false,  // tell jQuery not to process the data
				contentType: false,
				timeout: 35000,
				//dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
				data: formData,
				beforeSend : function (){
					$('#loadingHeader').css('display','');
					$('#Cargando_Header').css('display','');
				},
				success: function(data)
				{
					console.log(data);
					switch(parseInt(data.trim())){

						case 0:
							toastr.error('Ocurrio un error al eliminar el movimiento operador pendiente.', 'Error');
						break;

						case 1:
							  Limpiar(3);
							  toastr.success('Movimiento operador pendiente eliminado con éxito', 'Correcto');

							  $('#fetchMovimientoOperador').DataTable().destroy();
							  document.getElementById("fetchMovimientoOperador").tBodies[0].innerHTML = "";

							  $('#fetchMovimientoOperadorRealizados').DataTable().destroy();
							  document.getElementById("fetchMovimientoOperadorRealizados").tBodies[0].innerHTML = "";

							// DataTable Movimientos Operador Pendientes //
							fetchGlobal('fetchMovimientoOperador',5, idsucursalP);

							// DataTable Movimientos Operador Realizados //
							fetchGlobal('fetchMovimientoOperadorRealizados',6, idsucursal);
						break;

						default:
						  toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
					}
				}
			})
			.done(function() {
				$('#loadingHeader').css('display','none');
				$('#Cargando_Header').css('display','none');
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				$('#loadingHeader').css('display','none');
				$('#Cargando_Header').css('display','none');
				$("#modalErrorConexion").modal("show");
			})
			.always(function() {
				$('#loadingHeader').css('display','none');
				$('#Cargando_Header').css('display','none');
			});
		}
	  });
}

function deleteMoveOperadorRealizador(ID) {
	console.log(ID);
	console.log("Delete Move");

	let idsucursalP = $("#selectOPendiente").val();
	let idsucursal = $("#selectOPP").val();

	swal({
		title: "¿Esta seguro que desea eliminar el movimiento operador con el N° " + ID + "?",
		text: "Una vez realizado este proceso el registro del movimiento pasara a estatus inactivo.",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		if (willDelete) {
			let formData = new FormData();
			formData.append("ID", ID);

			$.ajax({
				url: dir + 'index.php/Controller_Inventario/deleteMoveOperadorRealizado',
				type: 'POST',
				processData: false,  // tell jQuery not to process the data
				contentType: false,
				timeout: 35000,
				//dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
				data: formData,
				beforeSend : function (){
					$('#loadingHeader').css('display','');
					$('#Cargando_Header').css('display','');
				},
				success: function(data)
				{
					console.log(data);
					switch(parseInt(data.trim())){

						case 0:
						  toastr.error('Ocurrio un error al modificar el movimiento operador realizado.', 'Error');
						break;

						case 1:
							  Limpiar(3);
							  toastr.success('Cambio realizado con éxito', 'Correcto');

							  $('#fetchMovimientoOperador').DataTable().destroy();
							  document.getElementById("fetchMovimientoOperador").tBodies[0].innerHTML = "";

							  $('#fetchMovimientoOperadorRealizados').DataTable().destroy();
							  document.getElementById("fetchMovimientoOperadorRealizados").tBodies[0].innerHTML = "";

								// DataTable Movimientos Operador Pendientes //
								fetchGlobal('fetchMovimientoOperador',5, idsucursalP);

								// DataTable Movimientos Operador Realizados //
								fetchGlobal('fetchMovimientoOperadorRealizados',6, idsucursal);
						break;

						default:
						  toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
					}
				}
			})
			.done(function() {
				$('#loadingHeader').css('display','none');
				$('#Cargando_Header').css('display','none');
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				$('#loadingHeader').css('display','none');
				$('#Cargando_Header').css('display','none');
				$("#modalErrorConexion").modal("show");
			})
			.always(function() {
				$('#loadingHeader').css('display','none');
				$('#Cargando_Header').css('display','none');
			});
		}
	  });
}

// DataTable Inventario General //
function fetchInventarioGeneral(Marca='', Division='', Linea='',Sublinea=''){

    let dataTable = $('#fetchInventarioGeneral').DataTable({
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
          	url: window.dir + "index.php/Controller_Inventario/fetchInventarioGeneral",
          	type: "POST",
	        data:{
	          	Marca:Marca, Division:Division, Linea:Linea, Sublinea:Sublinea
	        }
	    }
    });
}


// Función Limpiar //
function Limpiar(valor) {

	switch(valor){
		case 1:
			cargarfetchDetalleBodega();
            $("#modalEditarInvDetalleBodega").modal("hide");
            $("#txtFechaIngresoBodega").val('');
            $("#selectLocacionBodega").val('');
            $("#txtExistenciasBodega").val('');
    		tableInvDetalleBodega = null;
    		tableInvMovimiento = null;
		break;

		case 2:
			cargarfetchDetalleLocacion();
	        $("#modalEditarInvDetalleLocacion").modal("hide");
	        $("#txtFechaIngresoLocacion").val('');
	        tableInvDetalleLocacion = null;
	        tableInvMovimiento = null;
		break;

		case 3:
	        $("#Mover_Mercancia").modal("hide");
	        $("#number_Cantidad").val();
	        tableInvMovimiento = null;
		break;

		case 4:
			$("#modalEditMoveOperador").modal("hide");
			$("#txtIdMoveOperador").val("");
			$("#numCantMove").val("");
			$("#selectMoveOrigen").empty();
			$("#selectMoveDestino").empty();
		break;
	}
}

// Acción Buscar Locaciones By idSucursal //
function searchLocacion(idSucursal)
{
	let formData = new FormData();
    formData.append("idSucursal", idSucursal);

    $.ajax({
        url: dir + 'index.php/Controller_Inventario/getLocacionMovimiento',
        type: 'POST',
        processData: false,  // tell jQuery not to process the data
        contentType: false,
        timeout: 0,
        //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
        data: formData,
        beforeSend : function ()
        {
            $('#loadingHeader').css('display', '');
            $('#btn_Mover').css('display', 'none');
            $('#loadingMover').css('display', '');
        },
        success: function(data)
        {
            let parsed = JSON.parse(data);

            console.log(parsed);

            if (parsed != null && parsed != ""){
        		$("#Select_Locacion_Envia").empty();
        		$("#Select_Locacion_Recibe").empty();

        		$("#Select_Locacion_Envia").append("<option value=''>Seleccionar...</option>");
        		$("#Select_Locacion_Recibe").append("<option value=''>Seleccionar...</option>");

		        for (var i = 0; i < parsed.length; i++) 
			    {
			        $("#Select_Locacion_Envia").append("<option value='" + parsed[i]['ID'] + "'>" + parsed[i]['Locacion'] + "</option>");
			        $("#Select_Locacion_Recibe").append("<option value='" + parsed[i]['ID'] + "'>" + parsed[i]['Locacion'] + "</option>");
			    }
            }
        }
    })
    .done(function() {
        $('#loadingHeader').css('display', 'none');
        $('#btn_Mover').css('display', '');
        $('#loadingMover').css('display', 'none');
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
    	$('#loadingHeader').css('display', 'none');
        $('#btn_Mover').css('display', '');
        $('#loadingMover').css('display', 'none');

        $("#modalErrorConexion").modal("show");
	})
    .always(function() {
    });
}

// Abrir Editar Inventario Detalle Bodega //
function modalEditarInvDetalleBodega()
{	
	let Sucursal = $("#selectInvBodega").val();
	let formData = new FormData();
    formData.append("ID", Sucursal);

	 $.ajax({
	    url: window.dir + 'index.php/Controller_Inventario/getLocacionesInvDetalleBodega',
	    type: 'POST',
	    processData: false,
	    contentType: false,
	    timeout: 800000,
	    data: formData,
	    beforeSend : function ()
	    {
	        $('#loadingHeader').css('display', '');
            $('#btnEditarLocacion').css('display', 'none');
            $('#loadingEditarLocacion').css('display', '');
	    },
	    success: function(data)
	    {
	    	let parsed = JSON.parse(data);
	    	console.log(parsed);

	    	$("#selectLocacionBodega").empty();

	        for (var i = 0; i < parsed.length; i++){
		        $("#selectLocacionBodega").append("<option value='" + parsed[i]['ID'] + "'>" + parsed[i]['Locacion'] + "</option>");
		    }

		    $("#txtFechaIngresoBodega").val(tableInvDetalleBodega.childNodes[0].innerHTML);
			$("#selectLocacionBodega").val(tableInvDetalleBodega.childNodes[4].innerHTML);
			$("#txtExistenciasBodega").val(tableInvDetalleBodega.childNodes[2].innerHTML);

		    $("#modalEditarInvDetalleBodega").modal("show");
	    }
	    })
	    .done(function() {
	        $('#loadingHeader').css('display', 'none');
            $('#btnEditarLocacion').css('display', '');
            $('#loadingEditarLocacion').css('display', 'none');
	    })
	    .fail(function(jqXHR, textStatus, errorThrown) {
	    	$('#loadingHeader').css('display', 'none');
            $('#btnEditarLocacion').css('display', '');
            $('#loadingEditarLocacion').css('display', 'none');

            $("#modalErrorConexion").modal("show");
		})
	    .always(function() {
	    });
}

// Cargar Infomación Inventario Detalle Bodega //
function cargarfetchDetalleBodega()
{
	let formData = new FormData();
    formData.append("ID", tableInvBodega.childNodes[0].innerHTML);

        $.ajax({
            url: window.dir + 'index.php/Controller_Inventario/Get_Inventario_Bodega_Detalle',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 35000,
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display', '');
                $('#btnEditarLocacion').css('display', 'none');
                $('#loadingEditarLocacion').css('display', '');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);
                console.log(parsed);

	            if (parsed != null && parsed != ""){

	            	let table   = document.getElementById("fetchDetalleBodega"); 
            		let tbody    = table.tBodies[0];
            		$('#fetchDetalleBodega').DataTable().destroy();
            		table.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed['Detalle'].length; i++){
		                let row  = tbody.insertRow(i);
		                let cel1 = row.insertCell(0);
		                let cel2 = row.insertCell(1);
		                let cel3 = row.insertCell(2);
		                let cel4 = row.insertCell(3);
						let cel5 = row.insertCell(4);
						let cel6 = row.insertCell(5);

		                cel1.innerHTML = parsed['Detalle'][i]['Fecha_ingreso'];
		                cel2.innerHTML = parsed['Detalle'][i]['Locacion'];
		                cel3.innerHTML = parsed['Detalle'][i]['Existencias'];
		                cel4.innerHTML = parsed['Detalle'][i]['ID'];
		                cel5.innerHTML = parsed['Detalle'][i]['idLocacion'];
						cel5.setAttribute("hidden", true);
						cel6.innerHTML = parsed['Detalle'][i]['Categoria'];
	                }

		            fetch("fetchDetalleBodega");
	            }
            }
            })
            .done(function() {
            	$('#loadingHeader').css('display', 'none');
                $('#btnEditarLocacion').css('display', '');
                $('#loadingEditarLocacion').css('display', 'none');
            })
             .fail(function(jqXHR, textStatus, errorThrown) {
             	$('#loadingHeader').css('display', 'none');
                $('#btnEditarLocacion').css('display', '');
                $('#loadingEditarLocacion').css('display', 'none');

                $("#modalErrorConexion").modal("show");
        	})
            .always(function() { 
            });
}

// Cargar Infomación Inventario Detalle Locacion //
function cargarfetchDetalleLocacion()
{
	let formData = new FormData();
    formData.append("idLocacion", tableInvLocacion.childNodes[0].innerHTML);

    $.ajax({
        url: dir + 'index.php/Controller_Inventario/getInventarioDetalleLocacion',
        type: 'POST',
        processData: false,
        contentType: false,
        timeout: 800000,
        data: formData,
        beforeSend : function ()
        {
            $('#loadingHeader').css('display', '');
        	$('#btnEditarXLocacion').css('display', 'none');
        	$('#loadingEditarXLocacion').css('display', '');
        },
        success: function(data)
        {
            let parsed = JSON.parse(data);
            if (parsed != null && parsed != "")
            {
        		let table   = document.getElementById("fetchInvDetalleLocacion"); 
        		let tbody    = table.tBodies[0];

        		$('#fetchInvDetalleLocacion').DataTable().destroy();
        		table.tBodies[0].innerHTML = "";

    		    for (var i = 0; i < parsed.length; i++) 
                {

	                let row  = tbody.insertRow(i);
	                let cel1 = row.insertCell(0);
	                let cel2 = row.insertCell(1);
	                let cel3 = row.insertCell(2);
	                let cel4 = row.insertCell(3);
	                let cel5 = row.insertCell(4);

	                cel1.innerHTML = parsed[i]['ID'];
	                cel2.innerHTML = parsed[i]['Codigo'];
	                cel3.innerHTML = parsed[i]['Producto'];
	                cel4.innerHTML = parsed[i]['Fecha_ingreso'];
	                cel5.innerHTML = parsed[i]['Existencias'];
                
                }

	            fetch("fetchInvDetalleLocacion");
            }
        }
    })
    .done(function() {
        $('#loadingHeader').css('display', 'none');
        $('#btnEditarXLocacion').css('display', '');
        $('#loadingEditarXLocacion').css('display', 'none');
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
    	$('#loadingHeader').css('display', 'none');
        $('#btnEditarXLocacion').css('display', '');
        $('#loadingEditarXLocacion').css('display', 'none');

        $("#modalErrorConexion").modal("show");
	})
    .always(function() {
    });
}

// DataTable Inventario Bodega //
function fetchBodega(Marca='', Division='', Linea='',Sublinea='', Bodega='') {
	let dataTable = $('#fetchBodega').DataTable({
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
	    	url: window.dir + "index.php/Controller_Inventario/fetchBodega",
          	type: "POST",
	        data:{
	          	Marca:Marca, Division:Division, Linea:Linea, Sublinea:Sublinea, Bodega:Bodega
	        }
	    }
	});
}

// Global DataTable //
function fetch(table) {
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