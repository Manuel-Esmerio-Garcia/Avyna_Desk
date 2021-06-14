var FETCHRECOLECCIONGLOBAL = null;

$(document).ready(function(){

	// Cargar Libreria DatePicker //
	$('.input-daterange').datepicker({
      format: "yyyy-mm-dd",
      autoclose: true
    });

    // Cargar DataTable Recolecciones //
    fetchRecoleccion('no','','');

    // Cargar DataTable Recolecciones Pendientes //
    fetchRecoleccionPendientes('no','','');

    // Acción leer click Recolección //
    document.getElementById("fetchRecoleccion").onclick = function(e){
    	FETCHRECOLECCIONGLOBAL = e.target.parentNode;

    	$('#fetchDetalleRecoleccion').DataTable().destroy();
    	document.querySelector("#fetchDetalleRecoleccion").tBodies[0] = "";
    	fetchDetalleRecoleccion(FETCHRECOLECCIONGLOBAL.childNodes[0].innerHTML);
    }

    // Acción Buscar Recolecciones por fecha //
	$("#searchRecoleccion").click(function(event) {
		let DateSt = $('#DateStartRecolector').val();
  		let DateEn = $('#DateEndRecolector').val();

		if (DateSt != '' && DateEn != ''){
			$('#fetchRecoleccion').DataTable().destroy();
			fetchRecoleccion('yes', DateSt,DateEn);
		}
		else{
			$('#fetchRecoleccion').DataTable().destroy();
			fetchRecoleccion('no','', '');
		}
	});

	// Acción Buscar Recolecciones Pendientes por Fecha //
	$("#searchRecoleccionPendientes").click(function(event) {
		let DateSt = $('#DateStartRecolectorPendientes').val();
  		let DateEn = $('#DateEndRecolectorPendientes').val();

		if (DateSt != '' && DateEn != ''){
			$('#fetchRecoleccionPendientes').DataTable().destroy();
			fetchRecoleccionPendientes('yes', DateSt,DateEn);
		}
		else{
			$('#fetchRecoleccionPendientes').DataTable().destroy();
			fetchRecoleccionPendientes('no','', '');
		}
	});

    // Acción Abrir Modal Recolección //
    $("#btnAgregarRecoleccion").click(function(event) {
    	setTimeout(function() { $('#txtGuia').focus() }, 300);
    	$("#modalAddRecolecciones").modal("show");
    	$("#fetchListGuia").DataTable().destroy();
    	fetchListGuia();
    });

    // Press ENTER Input txtGuia //
    $('#txtGuia').keypress(function(e){

    	let NoGuia = $("#txtGuia").val();
	    let keycode = (e.keyCode ? e.keyCode : e.which);
	    if(keycode == 13){

	    	if (NoGuia.length == 22 || NoGuia.length == 12) {
	        
		        let guia = $("#txtGuia").val();
				let formData = new FormData();
	      		formData.append("Guia", guia);

	      		$.ajax({
	      			url: window.dir + 'index.php/Controller_Recolecciones/AddCajaGuia',
	      			type: 'POST',
			      	processData: false,
			      	contentType: false,
			      	timeout: 800000,
			      	data: formData,
			      	beforeSend : function ()
			      	{
				        $('#loadingHeader').css('display', '');
				        $('#btnCerrarRecoleccionGuia').css('display', 'none');
				        $('#loadingCerrarRecoleccionGuia').css('display', '');
				        $('#btnSiguiente').css('display', 'none');
				        $('#loadingSiguiente').css('display', '');
	      			},
			      	success: function(data)
			      	{
			      		console.log(data);

			      		switch(parseInt(data.trim())){

	                        case 0:
	                        	Limpiar(0);
	                            toastr.error('Ocurrio un error al recolectar la caja por el N° guia '+ guia +'', 'Error');
	                        break;

	                        case 1:
	                            Limpiar(0);
	                            Registrar();
	                            toastr.success('N° guia registrada con exito', 'Correcto');
	                        break;

	                        case 2:
	                        	Limpiar(0);
	                            toastr.error('No se encontro un empaque con el N° guia '+ guia +'', 'Error');
	                        break;

	                        case 3:
	                        	Limpiar(0);
	                            toastr.warning('El N° Guia '+ guia +' ya se encuentra registrado', 'Advertencia');
	                        break;

	                        default:
	                        	Limpiar(0);
	                            toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
	                    }
	      			}
	      		})
	      		.done(function() {
			        $('#loadingHeader').css('display', 'none');
			        $('#btnCerrarRecoleccionGuia').css('display', '');
			        $('#loadingCerrarRecoleccionGuia').css('display', 'none');
			        $('#btnSiguiente').css('display', '');
			        $('#loadingSiguiente').css('display', 'none');
	  			})
	      		.fail(function(jqXHR, textStatus, errorThrown) {
	        		$('#loadingHeader').css('display', 'none');
			        $('#btnCerrarRecoleccionGuia').css('display', '');
			        $('#loadingCerrarRecoleccionGuia').css('display', 'none');
			        $('#btnSiguiente').css('display', '');
			        $('#loadingSiguiente').css('display', 'none');
			        $("#modalErrorConexion").modal("show");
	      		});
	      	}
	      	else{
	      		Limpiar(0);
	      		toastr.warning('El N° de Guia no cuenta con la longitud apropiada.', 'Advertencia');
	      	}
	    }
	});

	// Acción Boton Siguiente //
	$("#btnSiguiente").click(function(event) {
		setTimeout(function() { $('#txtRecolector').focus(); ContarGuia(); }, 300);
		$("#modalNextRecolecciones").modal("show");
	});

	// Acción Cerrar Modal Guardar Recoleccion //
	$("#btnCerrarNext").click(function(event) {
		Limpiar(0);
		Registrar();
	});

	// Acción Guardar Recolecciones //
	$("#btnAddRecoleccion").click(function(event) {
	
		let Cant 	   = $("#labelCantGuia").text();
		let Recolector = $("#txtRecolector").val();
		let idUsuario  = $("#ID_Usuario").text();

		let formData = new FormData();
  		formData.append("Cantidad_paquetes", Cant);
  		formData.append("Nombre_recolector", Recolector);
  		formData.append("idUsuario", idUsuario);
  		formData.append("Paqueteria", 'ESTAFETA');

  		$.ajax({
  			url: window.dir + 'index.php/Controller_Recolecciones/AddRecoleccion',
  			type: 'POST',
	      	processData: false,
	      	contentType: false,
	      	timeout: 800000,
	      	data: formData,
	      	beforeSend : function ()
	      	{
		        $('#loadingHeader').css('display', '');
		        $('#btnCerrarRecoleccionGuia').css('display', 'none');
		        $('#loadingCerrarRecoleccionGuia').css('display', '');
		        $('#btnSiguiente').css('display', 'none');
		        $('#loadingSiguiente').css('display', '');
		        $('#btnCerrarNext').css('display', 'none');
		        $('#loadingCerrarNext').css('display', '');
		        $('#btnAddRecoleccion').css('display', 'none');
		        $('#loadingAddRecoleccion').css('display', '');
  			},
	      	success: function(data)
	      	{
				  console.log(data);
				  
				  if (parseInt(data.trim()) > 0) {
					window.open("http://integrattodev.cloudapp.net/WebServiceSendMail/SendGuia.php?idRecoleccion="+parseInt(data.trim())+"",'_blank');
					Limpiar(1);
					toastr.success('Recolección agregada con exito', 'Correcto');
				  }else{
					toastr.error('Ocurrio un error al generar la recolección', 'Error');
				  }
  			}
  		})
  		.done(function() {
	        $('#loadingHeader').css('display', 'none');
	        $('#btnCerrarRecoleccionGuia').css('display', '');
	        $('#loadingCerrarRecoleccionGuia').css('display', 'none');
	        $('#btnSiguiente').css('display', '');
	        $('#loadingSiguiente').css('display', 'none');
	        $('#btnCerrarNext').css('display', '');
	        $('#loadingCerrarNext').css('display', 'none');
	        $('#btnAddRecoleccion').css('display', '');
	        $('#loadingAddRecoleccion').css('display', 'none');
		})
  		.fail(function(jqXHR, textStatus, errorThrown) {
    		$('#loadingHeader').css('display', 'none');
	        $('#btnCerrarRecoleccionGuia').css('display', '');
	        $('#loadingCerrarRecoleccionGuia').css('display', 'none');
	        $('#btnSiguiente').css('display', '');
	        $('#loadingSiguiente').css('display', 'none');
	        $('#btnCerrarNext').css('display', '');
	        $('#loadingCerrarNext').css('display', 'none');
	        $('#btnAddRecoleccion').css('display', '');
	        $('#loadingAddRecoleccion').css('display', 'none');
	        $("#modalErrorConexion").modal("show");
  		});
	});

	// Abrir Modal Editar Recolección //
	$("#btnEditarRecoleccion").click(function(event) {
		if (FETCHRECOLECCIONGLOBAL != null){
			$("#modalEditarRecolecciones").modal("show");
		}
		else{
			toastr.warning('Seleccione la recolección que desea modificar.', 'Advertencia');
		}
	});

	// Acción Editar Recolección //
	$("#btnUpdateRecoleccion").click(function(event) {
		
		if (FETCHRECOLECCIONGLOBAL != null){

			let Status = $("#selectStatus").val();
			let formData = new FormData();
	  		formData.append("ID", FETCHRECOLECCIONGLOBAL.childNodes[0].innerHTML);
	  		formData.append("Status", Status);

	  		$.ajax({
	  			url: window.dir + 'index.php/Controller_Recolecciones/btnEditarRecoleccion',
	  			type: 'POST',
		      	processData: false,
		      	contentType: false,
		      	timeout: 800000,
		      	data: formData,
		      	beforeSend : function ()
		      	{
			        $('#loadingHeader').css('display', '');
			        $('#btnAgregarRecoleccion').css('display', 'none');
			        $('#loadingAgregarRecoleccion').css('display', '');
			        $('#btnEditarRecoleccion').css('display', 'none');
			        $('#loadingEditarRecoleccion').css('display', '');
			        $('#btnEliminarRecoleccion').css('display', 'none');
			        $('#loadingEliminarRecoleccion').css('display', '');
			        $('#btnCerrarEditar').css('display', 'none');
			        $('#loadingCerrarEditar').css('display', '');
			        $('#btnUpdateRecoleccion').css('display', 'none');
			        $('#loadingUpdateRecoleccion').css('display', '');
	  			},
		      	success: function(data)
		      	{
		      		console.log(data);

		      		switch(parseInt(data.trim())){

	                    case 0:
	                        toastr.error('Ocurrio un error al modificar la recolección', 'Error');
	                    break;

	                    case 1:
	                        Limpiar(3);
	                        toastr.success('Recolección modificada con exito', 'Correcto');
	                    break;

	                    default:
	                        toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
	                }
	  			}
	  		})
	  		.done(function() {
		        $('#loadingHeader').css('display', 'none');
		        $('#btnAgregarRecoleccion').css('display', '');
		        $('#loadingAgregarRecoleccion').css('display', 'none');
		        $('#btnEditarRecoleccion').css('display', '');
		        $('#loadingEditarRecoleccion').css('display', 'none');
		        $('#btnEliminarRecoleccion').css('display', '');
		        $('#loadingEliminarRecoleccion').css('display', 'none');
		        $('#btnCerrarEditar').css('display', '');
		        $('#loadingCerrarEditar').css('display', 'none');
		        $('#btnUpdateRecoleccion').css('display', '');
		        $('#loadingUpdateRecoleccion').css('display', 'none');
			})
	  		.fail(function(jqXHR, textStatus, errorThrown) {
	    		$('#loadingHeader').css('display', 'none');
		        $('#btnAgregarRecoleccion').css('display', '');
		        $('#loadingAgregarRecoleccion').css('display', 'none');
		        $('#btnEditarRecoleccion').css('display', '');
		        $('#loadingEditarRecoleccion').css('display', 'none');
		        $('#btnEliminarRecoleccion').css('display', '');
		        $('#loadingEliminarRecoleccion').css('display', 'none');
		        $('#btnCerrarEditar').css('display', '');
		        $('#loadingCerrarEditar').css('display', 'none');
		        $('#btnUpdateRecoleccion').css('display', '');
		        $('#loadingUpdateRecoleccion').css('display', 'none');
		        $("#modalErrorConexion").modal("show");
	  		});
		}
		else{
			toastr.warning('Seleccione la recolección que desea modificar.', 'Advertencia');
		}
	});

	// Acción Eliminar Recolección //
	$("#btnEliminarRecoleccion").click(function(event) {
		
		if (FETCHRECOLECCIONGLOBAL != null){
			if (FETCHRECOLECCIONGLOBAL.childNodes[5].childNodes[0].innerHTML != 'Inactivo'){

				let formData = new FormData();
		  		formData.append("ID", FETCHRECOLECCIONGLOBAL.childNodes[0].innerHTML);

		  		$.ajax({
		  			url: window.dir + 'index.php/Controller_Recolecciones/deleteRecoleccion',
		  			type: 'POST',
			      	processData: false,
			      	contentType: false,
			      	timeout: 800000,
			      	data: formData,
			      	beforeSend : function ()
			      	{
				        $('#loadingHeader').css('display', '');
				        $('#btnAgregarRecoleccion').css('display', 'none');
				        $('#loadingAgregarRecoleccion').css('display', '');
				        $('#btnEditarRecoleccion').css('display', 'none');
				        $('#loadingEditarRecoleccion').css('display', '');
				        $('#btnEliminarRecoleccion').css('display', 'none');
				        $('#loadingEliminarRecoleccion').css('display', '');
		  			},
			      	success: function(data)
			      	{
			      		console.log(data);

			      		switch(parseInt(data.trim())){

		                    case 0:
		                        toastr.error('Ocurrio un error al eliminar la recolección', 'Error');
		                    break;

		                    case 1:
		                        Limpiar(2);
		                        toastr.success('Recolección eliminada con exito', 'Correcto');
		                    break;

		                    default:
		                        toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
		                }
		  			}
		  		})
		  		.done(function() {
			        $('#loadingHeader').css('display', 'none');
			        $('#btnAgregarRecoleccion').css('display', '');
			        $('#loadingAgregarRecoleccion').css('display', 'none');
			        $('#btnEditarRecoleccion').css('display', '');
			        $('#loadingEditarRecoleccion').css('display', 'none');
			        $('#btnEliminarRecoleccion').css('display', '');
			        $('#loadingEliminarRecoleccion').css('display', 'none');
				})
		  		.fail(function(jqXHR, textStatus, errorThrown) {
		    		$('#loadingHeader').css('display', 'none');
			        $('#btnAgregarRecoleccion').css('display', '');
			        $('#loadingAgregarRecoleccion').css('display', 'none');
			        $('#btnEditarRecoleccion').css('display', '');
			        $('#loadingEditarRecoleccion').css('display', 'none');
			        $('#btnEliminarRecoleccion').css('display', '');
			        $('#loadingEliminarRecoleccion').css('display', 'none');
			        $("#modalErrorConexion").modal("show");
		  		});
			}
			else{
				toastr.warning('La rrecolección seleccionada se encuentra ya se encuentra eliminada.', 'Advertencia');
			}
		}
		else{
			toastr.warning('Seleccione la recolección que desea eliminar.', 'Advertencia');
		}
	});

	// Acción Imprimir Reporte //
	$("#btnImprimirReporte").click(function(event) {

		if (FETCHRECOLECCIONGLOBAL != null){
			printReporteRecoleccion(FETCHRECOLECCIONGLOBAL.childNodes[0].innerHTML);
		}
		else{
			toastr.warning('Seleccione la recolección que desea eliminar.', 'Advertencia');
		}
	});
});

// Función Imprimir PDF Recolección //
function printReporteRecoleccion(idRecoleccion){
    window.open(""+window.dir+"Clases/Reportes/Reporte_Recoleccion.php?idRecoleccion="+idRecoleccion+"");
}

// Contar Guia //
function ContarGuia() {
	$('#fetchListGuia').DataTable().destroy();
    //Tabla de Lista de Guias //
    let tbody = document.getElementById("fetchListGuia").getElementsByTagName("tbody")[0];
    let contador = 0;

    for (var i = 0; i < tbody.rows.length; i++){
        contador ++;
    }

    fetchListGuia();
    $("#labelCantGuia").text(contador);
}

// Acción Registrar //
function Registrar() {
	$('#fetchListGuia').DataTable().ajax.reload();
}

// Función limpiar //
function Limpiar(valor) {
	switch(valor){
        case 0:
        	$('#txtGuia').val("");
            setTimeout(function() { $('#txtGuia').focus() }, 300);
        break;

        case 1:
        	$('#txtGuia').val("");
            $("#txtRecolector").val("");
            $('#fetchListGuia').DataTable().ajax.reload();
            $('#fetchRecoleccion').DataTable().ajax.reload();
            $("#modalAddRecolecciones").modal("hide");
            $("#modalNextRecolecciones").modal("hide");
        break;

        case 2:
            $('#fetchRecoleccion').DataTable().ajax.reload();
            FETCHRECOLECCIONGLOBAL = null;
        break;

        case 3:
            $('#fetchRecoleccion').DataTable().ajax.reload();
            $("#selectStatus").val("");
            $("#modalEditarRecolecciones").modal("hide");
            FETCHRECOLECCIONGLOBAL = null;
        break;
    }
}

// Acción Eliminar Detalle Recolección //
function deleteDetalleRecoleccion(ID,guia) {

	let formData = new FormData();
	formData.append("ID", ID);

	$.ajax({
		url: window.dir + 'index.php/Controller_Recolecciones/DeleteDetalleRecoleccion',
		type: 'POST',
	  	processData: false,
	  	contentType: false,
	  	timeout: 800000,
	  	data: formData,
	  	beforeSend : function ()
	  	{
	        $('#loadingHeader').css('display', '');
	        $('#btnCerrarRecoleccionGuia').css('display', 'none');
	        $('#loadingCerrarRecoleccionGuia').css('display', '');
	        $('#btnSiguiente').css('display', 'none');
	        $('#loadingSiguiente').css('display', '');
			},
	  	success: function(data)
	  	{
	  		console.log(data);

	  		switch(parseInt(data.trim())){

	            case 0:
	            	Limpiar(0);
	                toastr.error('Ocurrio un error al eliminar la caja por el N° guia '+ guia +'', 'Error');
	            break;

	            case 1:
	                Limpiar(0);
	                Registrar();
	                toastr.success('N° guia eliminada con exito', 'Correcto');
	            break;

	            default:
	            	Limpiar(0);
	                toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
	        }
		}
	})
	.done(function() {
	    $('#loadingHeader').css('display', 'none');
	    $('#btnCerrarRecoleccionGuia').css('display', '');
	    $('#loadingCerrarRecoleccionGuia').css('display', 'none');
	    $('#btnSiguiente').css('display', '');
	    $('#loadingSiguiente').css('display', 'none');
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		$('#loadingHeader').css('display', 'none');
	    $('#btnCerrarRecoleccionGuia').css('display', '');
	    $('#loadingCerrarRecoleccionGuia').css('display', 'none');
	    $('#btnSiguiente').css('display', '');
	    $('#loadingSiguiente').css('display', 'none');
	    $("#modalErrorConexion").modal("show");
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


// Cargar DataTable fetchListGuia //
function fetchListGuia() {
	console.log('Click');
	let dataTable =  $("#fetchListGuia").DataTable({
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
			targets: 3,
			render: function (data, type, full, meta) {
				return '<button type="button" class="btn btn-danger" onclick="deleteDetalleRecoleccion('+full[0]+','+full[1]+');"><span class="glyphicon glyphicon-trash"></span></button>';
			}
		}],
		order: [],
		ajax: {
			url: window.dir + "index.php/Controller_Recolecciones/fetchListGuia",
			type: "POST"
		}
	});
}

// Cargar DataTable Recolecciones //
function fetchRecoleccion(is_date_search, start_date='', end_date='') {
	let dataTable = $("#fetchRecoleccion").DataTable({
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
			targets: 5,
			render: function (data, type, full, meta) {
				if (full[5] == "Recolectado") {
					return "<label class='badge badge-info'>"+full[5]+"</label>";
				} else if (full[5] == "Pendiente"){
					return "<label class='badge badge-warning'>"+full[5]+"</label>";
				} else if (full[5] == "Pendiente y Recolectado"){
					return "<label class='badge badge-default'>"+full[5]+"</label>";
				}else{
					return "<label class='badge badge-danger'>"+full[5]+"</label>";
				}
			}
		},
		{
			targets: 6,
			render: function (data, type, full, meta) {
				return 'N/A'
				//return "<button class='btn btn-primary' onclick='Enviar(this.parentNode.parentNode)'>Enviar Correos</button>";
			}
		}],
		order: [],
		ajax: {
			url: window.dir + "index.php/Controller_Recolecciones/fetchRecoleccion",
			type: "POST",
			data:{
	          is_date_search:is_date_search, start_date:start_date, end_date:end_date
	        }
		}
	});
}


function Enviar(row) {
	console.log(row.childNodes[0].innerHTML);

	swal({
		title: "¿Esta seguro que desea enviar el correo de recolección a los clientes?",
		text: "Es te proceso mandara un correo acada cliente de esta recolección",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((willDelete) => {
		if (willDelete) {
			window.open("http://integrattodev.cloudapp.net/WebServiceSendMail/SendGuia.php?idRecoleccion="+row.childNodes[0].innerHTML+"",'_blank');
    		$('#fetchRecoleccion').DataTable().ajax.reload();
		}
	});
}


// Cargar DataTable Detalle Recolecciones //
function fetchDetalleRecoleccion(idRecoleccion) {
	let dataTable = $("#fetchDetalleRecoleccion").DataTable({
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
		order: [],
		ajax: {
			url: window.dir + "index.php/Controller_Recolecciones/fetchDetalleRecoleccion",
			type: "POST",
			data:{
	          idRecoleccion:idRecoleccion
	        }
		}
	});
}


// Cargar DataTable Recolecciones Pendientes //
function fetchRecoleccionPendientes(is_date_search, start_date='', end_date='') {
	let dataTable = $("#fetchRecoleccionPendientes").DataTable({
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
		order: [],
		ajax: {
			url: window.dir + "index.php/Controller_Recolecciones/fetchRecoleccionPendientes",
			type: "POST",
			data:{
	          is_date_search:is_date_search, start_date:start_date, end_date:end_date
	        }
		}
	});
}
