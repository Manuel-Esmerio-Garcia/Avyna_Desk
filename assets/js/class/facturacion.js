var FETCHVENTAS = null;
var FETCHVFACTURASCANCELADAS = null;
var FETCHFACTURAS = null;

$(document).ready(function(){ 

	// Cargar DataTable Ventas //
	fetchVentas('no','','');

	// Cargar DataTable Facturas Canceladas ///
	fetchFacturasCanceladas('no','','');

	// Cargar DataTable Facturas ///
	fetchFacturas('no','','');

	// Cargar Libreria DatePicker //
	$('.input-daterange').datepicker({
      format: "yyyy-mm-dd",
      autoclose: true
	});
	
	$("#searchFacturas").click(function(){
		let start_date = $('#DateStartFacturas').val();
		let end_date   = $('#DateEndFacturas').val();
		if (start_date != '' && end_date != '') {
		  $('#fetchFacturas').DataTable().destroy();
		  fetchFacturas('yes', start_date, end_date);
		}else{
		  $('#fetchFacturas').DataTable().destroy();
		  fetchFacturas('no','','');
		}
	});

	$("#searchVentas").click(function(){
		let start_date = $('#DateStartVentas').val();
		let end_date   = $('#DateEndVentas').val();
		if (start_date != '' && end_date != '') {
		  $('#fetchVentas').DataTable().destroy();
		  fetchVentas('yes', start_date, end_date);
		}else{
		  $('#fetchVentas').DataTable().destroy();
		  fetchVentas('no','','');
		}
	});

	$("#searchFacturasCanceladas").click(function(){
		let start_date = $('#DateStartFacturasCanceladas').val();
		let end_date   = $('#DateEndFacturasCanceladas').val();
		if (start_date != '' && end_date != '') {
		  $('#fetchFacturasCanceladas').DataTable().destroy();
		  fetchFacturasCanceladas('yes', start_date, end_date);
		}else{
		  $('#fetchFacturasCanceladas').DataTable().destroy();
		  fetchFacturasCanceladas('no','','');
		}
	});

    // Sincronizar Fecha //
    setInterval(ActualizarFecha,1000);

	///////////////////////
    ////// Facturas ///////
    ///////////////////////

    // Acción leer click Facturas //
    document.getElementById("fetchFacturas").onclick = function(e){
    	FETCHFACTURAS = e.target.parentNode;
    }

    $("#btnCancelarFactura").click(function(event) {
    	
    	if (FETCHFACTURAS != null){
    		swal({
				title: "¿Estás seguro que desea cancelar la factura del distribuidor " + FETCHFACTURAS.cells[2].innerHTML + "?",
                text: "Esta acción cancelara la factura en el sistema y en SAT",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			})
			.then((willDelete) => {
				if (willDelete) {

					let formData = new FormData();
                	formData.append("idFactura", FETCHFACTURAS.cells[4].innerHTML);

					$.ajax({
	                    url: window.dir + 'index.php/Controller_Factura/cancelFactura',
	                    type: "post",
	                    processData: false,
	                    contentType: false,
	                    timeout: 800000,
	                    data:formData,
	                    beforeSend : function ()
	                    {
	                    	$('#loadingHeader').css('display','');
	                    	$('#btnCancelarFactura').css('display','none');
	                    	$('#loadingCancelarFacturar').css('display','');
	                    },    
	                    success: function(data){

	                    	switch(parseInt(data.trim())){
			                 	case 0:
			                 		toastr.error('Ocurrio un error al moficiar la factura y la venta', 'Error');
			                 	break;

			                 	case 1:
			                 		Limpiar(1);
			                 		toastr.success('La factura fue cancelado con exito','Correcto'); 
			                 	break;

			                 	case 2:
			                 		toastr.error('Ocurrio un error al cancelar la factura en el PAC', 'Error'); 
			                 	break;

			                 	default:
			                 		toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
			                }  
	                    }
                    })
                    .done( function (data, status) {
                    	$('#loadingHeader').css('display','none');
	                    $('#btnCancelarFactura').css('display','');
	                    $('#loadingCancelarFacturar').css('display','none');
                    })
                    .fail( function( jqXHR, textStatus, errorThrown ) {
                    	$('#loadingHeader').css('display','none');
	                    $('#btnCancelarFactura').css('display','');
	                    $('#loadingCancelarFacturar').css('display','none');
	                    $("#modalErrorConexion").modal("show");
			        })
			        .always(function() {
			        });
				}
			});
    	}
    	else{
    		toastr.warning('Seleccione la factura que desea cancelar','Advertencia'); 
    	}
    });

    ////////////////////////////
    /// Facturas Canceladas ////
    ////////////////////////////

    // Acción leer click Facturas //
    document.getElementById("fetchFacturasCanceladas").onclick = function(e){
    	FETCHVFACTURASCANCELADAS = e.target.parentNode;
    }

    $("#btnAcuse").click(function(event) {
    	
    	if (FETCHVFACTURASCANCELADAS != null) {

            let formData = new FormData();
            formData.append("idFactura", FETCHVFACTURASCANCELADAS.cells[3].innerHTML);

            $.ajax({
                url: window.dir + 'index.php/Controller_Factura/getAcuseSAT',
                type: "post",
                processData: false,
                contentType: false,
                timeout: 800000,
                data:formData,
                beforeSend : function ()
                {
                    $('#loadingHeader').css('display','');
                    $('#btnAcuse').css('display','none');
                    $('#loadingAcuse').css('display','');
                },       
                success: function(data){

                	switch(parseInt(data.trim())){
	                 	case 0:
	                 		toastr.error('Ocurrio un error al consultar el acuse de cancelación del SAT', 'Error');
	                 	break;

	                 	case 1:
	                 		window.open(window.dir + "Clases/RecuperarAcuse.php?ID=" + FETCHVFACTURASCANCELADAS.cells[3].innerHTML);
	                 		Limpiar(1);
	                 		toastr.success('Acuse de Cancelación del SAT recuperado con exito','Correcto');
	                 	break;

	                 	default:
	                 		toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
	                }  
                }
            })
            .done( function (data, status) {
                $('#loadingHeader').css('display','none');
                $('#btnAcuse').css('display','');
                $('#loadingAcuse').css('display','none');
            })
            .fail( function( jqXHR, textStatus, errorThrown ) {
            	$('#loadingHeader').css('display','none');
                $('#btnAcuse').css('display','');
                $('#loadingAcuse').css('display','none');
                $("#modalErrorConexion").modal("show");
            });
        }
        else{
            toastr.warning('Seleccione la factura de la cual necesita el Acuse de cancelación','Advertencia'); 
        }
    });


    ///////////////////////
    /// Ventas Factura ////
    ///////////////////////

    // Acción leer click Vetas //
    document.getElementById("fetchVentas").onclick = function(e){
    	FETCHVENTAS = e.target.parentNode;
    }

    // Abrir Modal Facturar //
    $("#btnFacturar").click(function(event) {
    	if (FETCHVENTAS != null){

    		$.ajax({
	            url: window.dir + 'index.php/Controller_Empresa/getEmpresa',
	            type: 'POST',
	            processData: false,
                contentType: false,
                timeout: 800000,
	            beforeSend : function ()
	            {
	                $('#loadingHeader').css('display','');
	                $('#btnFacturar').css('display','none');
	                $('#loadingFacturar').css('display','');
	            },
	            success: function(data)
	            {
	                let parsed = JSON.parse(data);

	                if (parsed != null){
	                	if (parsed[0]['noCertificado'] != ""){
		                    $('#modalFacturar').modal('show');

		                    $('#checkRelacion').prop('checked', false);                                                   //Mostramos modal con los datos obtenidos de la venta  
		                    $('#divRelacion').css('display', 'none');
		                    $('#txtTipoRelacion').attr('disabled', 'disabled');
		                    $('#divListFactura').css('display', 'none');
		                    $('#checkPublico').prop('checked', false);
		                    $('#txtCP').removeAttr('readonly');
		                    $('#txtPais').removeAttr('readonly');
		                    $('#selectUsoCFDi').removeAttr('disabled');
		                    $('#selectMetodoPago').removeAttr('disabled');
		                    $('#alertFormaPago').css('display','none');
		                    document.getElementById("fetchRelacionFacturas").tBodies[0].innerHTML = "";

		                    ///////////////////////////////////////////////////////////////////////////
		                    $('#headerModalFactura').text("Venta N°  " + FETCHVENTAS.cells[0].innerHTML + "            " + FETCHVENTAS.cells[3].innerHTML);
                			$('#txtFolio').val(FETCHVENTAS.cells[0].innerHTML);
                		
                			document.getElementById("fetchInfoVenta").tBodies[0].innerHTML = "";

	                        //////////////////////////////////////////////////////////////////////////////
	                        ////    Pasamos infomación a campos de la modal facturación               ////
	                        //////////////////////////////////////////////////////////////////////////////

			                $('#txtRazonSocial').val(FETCHVENTAS.cells[3].innerHTML);
			                $('#txtRFC').val(FETCHVENTAS.cells[10].innerHTML);
			                $('#txtPC').val(FETCHVENTAS.cells[9].innerHTML);
			                $('#txtPais').val(FETCHVENTAS.cells[8].innerHTML);
			                //$('#txt_modal_IdVenta').val(linea_Factura.cells[0].innerHTML);
			                //$('#txt_id_cliente_sale').val(linea_Factura.cells[11].innerHTML);

			                let table = document.getElementById("fetchInfoVenta"); 
				        	let tbody = table.tBodies[0];

							for (var i = 0; i <= 0; i++){

				                let row  = tbody.insertRow(i);
				                let cel1 = row.insertCell(0);
                				let cel2 = row.insertCell(1);
                				let cel3 = row.insertCell(2);
				                let cel4 = row.insertCell(3);
				                let cel5 = row.insertCell(4);
				                let cel6 = row.insertCell(5);
				                let cel7 = row.insertCell(6);
				                let cel8 = row.insertCell(7);

				                cel1.innerHTML = FETCHVENTAS.cells[0].innerHTML;
				                cel2.innerHTML = FETCHVENTAS.cells[1].innerHTML;
				                cel3.innerHTML = FETCHVENTAS.cells[2].innerHTML;
				                cel4.innerHTML = FETCHVENTAS.cells[3].innerHTML;
				                cel5.innerHTML = FETCHVENTAS.cells[4].innerHTML;
				                cel6.innerHTML = FETCHVENTAS.cells[5].innerHTML;
				                cel7.innerHTML = FETCHVENTAS.cells[6].innerHTML;
				                cel8.innerHTML = FETCHVENTAS.cells[7].innerHTML;
				            }
	                	}
	                	else{
	                		toastr.warning('La empresa no cuenta con los certificados necesarios para la facturación','Advertencia');
	                	}
	                }
	            }
	        })
	        .done(function() {
	        	$('#loadingHeader').css('display','none');
	        	$('#btnFacturar').css('display','');
	        	$('#loadingFacturar').css('display','none');
	        })
	        .fail( function( jqXHR, textStatus, errorThrown ) {
	        	$('#loadingHeader').css('display','none');
	        	$('#btnFacturar').css('display','');
	        	$('#loadingFacturar').css('display','none');
	        	$("#modalErrorConexion").modal("show");
	        })
	        .always(function() {
	        });
    	}
    	else{
    		toastr.warning('Seleccione una venta','Advertencia');
    	}
    });

	/// Acción CheckBox Publico en General ///
	$('#checkPublico').change(function() {
        if($('#checkPublico').prop('checked')) {
        	$('#txtRazonSocial').val('Publico General');
          	$('#txtRFC').val('XAXX010101000');
          	$('#txtPC').attr('readonly', 'readonly');
          	$('#txtPais').attr('readonly', 'readonly');
          	$('#selectUsoCFDi').val('P01');
          	$('#selectUsoCFDi').attr('disabled', 'disabled');
          	$('#selectMetodoPago').val('PUE');
          	$('#selectMetodoPago').attr('disabled', 'disabled');
          	$('#alertFormaPago').css('display','');
        }
        else{
            $('#txtRazonSocial').val(FETCHVENTAS.cells[3].innerHTML);
            $('#txtRFC').val(FETCHVENTAS.cells[10].innerHTML);
            $('#txtPC').val(FETCHVENTAS.cells[9].innerHTML);
            $('#txtPais').val(FETCHVENTAS.cells[8].innerHTML);
            $('#txtPC').removeAttr('readonly');
            $('#txtPais').removeAttr('readonly');
            $('#selectUsoCFDi').removeAttr('disabled');
            $('#selectMetodoPago').removeAttr('disabled');
            $('#alertFormaPago').css('display','none');
    	}    
    });

	/// Change Forma de Pago ///
    $('#selectFormaPago').change(function(event) {
    	($('#selectFormaPago').val() == 99) ? $('#selectMetodoPago').val('PPD') : $('#selectMetodoPago').val('PUE');	 
	});

	/// Change Metodo Pago ///
	$('#selectMetodoPago').change(function(event) {
 		($('#selectMetodoPago').val() == 'PPD') ? $('#selectFormaPago').val('99') : $('#selectFormaPago').val('01');
	});

    /// Funcion para de validación para el tipo de relacion  ///
    $('#checkRelacion').change(function(event) 
    {
    	if($('#checkRelacion').prop('checked')){
    		$('#divRelacion').css('display', '');
            $('#txtTipoRelacion').removeAttr('disabled');
            $('#txtTipoRelacion').val('');
    	}
    	else{
    		$('#divRelacion').css('display', 'none');
            $('#txtTipoRelacion').attr('disabled', 'disabled');
            $('#divListFactura').css('display', 'none');
            $('#fetchRelacionFacturas').DataTable().destroy();
            document.getElementById("fetchRelacionFacturas").tBodies[0].innerHTML = "";
    	}
    });

    /// Función Select Tipo Relación ///
    $('#txtTipoRelacion').change(function(event) 
    {
        if ($('#txtTipoRelacion').val() == '04'){

            let formData = new FormData();
            formData.append("idCliente", FETCHVENTAS.cells[11].innerHTML);

            $.ajax({
		        url: window.dir + 'index.php/Controller_Factura/getFacturasRelacion',
		        type: "post",
                processData: false,
                contentType: false,
                timeout: 800000,
                data:formData,
		        beforeSend : function ()
		        {
		            $('#loadingHeader').css('display','');
		            $('#btnCerrarModalFacturar').css('display','none');
		            $('#loadingCerrarModalFacturar').css('display','');
		            $('#btnFacturarModal').css('display','none');
		            $('#loadingFacturarModal').css('display','');
		        },                                                                                 
		        success: function(data)
		        {
            		let parsed = JSON.parse(data);  

            		$('#fetchRelacionFacturas').DataTable().destroy();
            		document.getElementById("fetchRelacionFacturas").tBodies[0].innerHTML = "";

            		for (let i = 0; i < parsed.length; i++){
	                    let row = document.getElementById("fetchRelacionFacturas").tBodies[0].insertRow(i);   

	                    let cel0 = row.insertCell(0);
	                    let cel1 = row.insertCell(1);
	                    let cel2 = row.insertCell(2);
	                    let cel3 = row.insertCell(3);
	                    let cel4 = row.insertCell(4);
	                    let cel5 = row.insertCell(5);

	                    let txt3 = document.createElement("input");  // Create with DOM

	                    let checkbox = document.createElement("input");
	                    checkbox.setAttribute("type","checkbox");
	                    checkbox.setAttribute("value",parsed[i]['UUID']);
	                    cel0.appendChild(checkbox);
	                    cel1.innerHTML = parsed[i]['UUID'];
	                    cel2.innerHTML = parsed[i]['Serie'];
	                    cel3.innerHTML = parsed[i]['Folio'];
	                    cel4.innerHTML = parsed[i]['Fecha_Timbrado'];
	                    cel5.innerHTML = "$" + parsed[i]['Total'];
                	}

            		$('#divListFactura').css('display', '');

            		fetch("fetchRelacionFacturas");     
    			}
		    })
		    .done(function() {
		        $('#loadingHeader').css('display','none');
	            $('#btnCerrarModalFacturar').css('display','');
	            $('#loadingCerrarModalFacturar').css('display','none');
	            $('#btnFacturarModal').css('display','');
	            $('#loadingFacturarModal').css('display','none');
		    })
		    .fail(function() {
		        $('#loadingHeader').css('display','none');
	            $('#btnCerrarModalFacturar').css('display','');
	            $('#loadingCerrarModalFacturar').css('display','none');
	            $('#btnFacturarModal').css('display','');
	            $('#loadingFacturarModal').css('display','none');
	            $("#modalErrorConexion").modal("show");
		    })
		    .always(function() {
		    });                   
        }
        else{
            $('#divListFactura').css('display', 'none');

            $('#fetchRelacionFacturas').DataTable().destroy();
           	document.getElementById("fetchRelacionFacturas").tBodies[0].innerHTML = "";
        }
    });

    $("#btnFacturarModal").click(function(event) {
    	
    	let RazonSocial = $("#txtRazonSocial").val();
    	let RFC 		= $("#txtRFC").val();
    	let Relacion    = 0;
    	let TipoFac     = 0;

    	if (RazonSocial != ""){
    		if (RFC != ""){

    			swal({
				  title: "¡Importante!",
				  text: "¿Esta segúro que desea facturar la venta con el N° " + FETCHVENTAS.cells[0].innerHTML + "?",
				  icon: "warning",
				  buttons: true,
				  dangerMode: true,
				})
				.then((willDelete) => {
				  	if (willDelete) {
				    
					    let idVenta = FETCHVENTAS.cells[0].innerHTML;
					    let idClien = FETCHVENTAS.cells[11].innerHTML;
					    let Fecha 	= $("#txtFecha").val();
					    let Serie 	= $("#txtSerie").val();
					    let Folio 	= $("#txtFolio").val();
					    let Razon 	= $("#txtRazonSocial").val();
					    let RFC   	= $("#txtRFC").val();
					    let CP    	= $("#txtPC").val();
					    let Pais  	= $("#txtPais").val();
					    let UsoCFDi = $("#selectUsoCFDi").val();
					    let ForPago = $("#selectFormaPago").val();
					    let MetPago = $("#selectMetodoPago").val();
					    let ConPago = $("#txtCondicionPago").val();
					    let Moneda  = $("#txtMoneda").val();
					    let Compro  = $("#txtComprobante").val();
					    let Observa = $("#txtObservaciones").val();
					    let UUIDS   = new Array();

					    // Acción leer Tabla Facturas Relación //
					    $('#fetchRelacionFacturas').DataTable().destroy();
					    let tbody   = document.getElementById("fetchRelacionFacturas").getElementsByTagName("tbody")[0];
					    fetch("fetchRelacionFacturas");
					    // Acción leer Tabla Facturas Relación //

					    $('#checkRelacion').prop('checked') ? Relacion = 1 : Relacion = 0;
					    $('#checkPublico').prop('checked') ? TipoFac = 1 : TipoFac = 2;

					    if (tbody.rows.length > 0){
					    	if (tbody.rows[0].cells[0].innerHTML != 'Lo sentimos. No se encontraron registros.'){
					    		for (var i = 0; i < tbody.rows.length; i++){
									if (tbody.rows[i].cells[0].childNodes[0].checked == true){
										UUIDS.push(tbody.rows[i].cells[0].childNodes[0].value);
									}
								}
					    	}
					    }

					    let formData = new FormData();
			            formData.append("idVenta", idVenta);
			            formData.append('idCliente', idClien);
			            formData.append("Fecha", Fecha);
			            formData.append("Serie", Serie);
			            formData.append("Folio", Folio);
			            formData.append("Razon", Razon);
			            formData.append("RFC", RFC);
			            formData.append("CP", CP);
			            formData.append("Pais", Pais);
			            formData.append("UsoCFDi", UsoCFDi);
			            formData.append("ForPago", ForPago);
			            formData.append("MetPago", MetPago);
			            formData.append("ConPago", ConPago);
			            formData.append("Moneda", Moneda);
			            formData.append("Compro", Compro);
			            formData.append("Observa", Observa);
			            formData.append('TipoFactura',TipoFac);

			            if (Relacion == 1 && UUIDS != null){
			            	formData.append("TipoRe", '04');
			            	formData.append("UUIDS", UUIDS);
			            }

			            $.ajax({
				            url: window.dir + 'index.php/Controller_Factura/facturarCFDi',
				            type: 'POST',
				            processData: false,
				            contentType: false,
				            timeout: 35000,
				            data: formData,
				            beforeSend : function ()
				            {
				                $('#loadingHeader').css('display','');
				                $('#btnCerrarModalFacturar').css('display','none');
				                $('#loadingCerrarModalFacturar').css('display','');
				                $('#btnFacturarModal').css('display','none');
				                $('#loadingFacturarModal').css('display','');
				            },
				            success: function(data)
				            {
				            	console.log(data);
				            	switch(parseInt(data.trim())){
				                 	case 0:
				                 		Limpiar(2);
				                 		toastr.error('Ocurrio un error al registrar la factura en el sistema', 'Error');
				                 	break;

				                 	case 1:
				                 		Limpiar(2);
				                 		toastr.success('Factura timbrada con exito','Correcto');
				                 	break;

				                 	case 2:
				                 		Limpiar(2);
				                 		toastr.error('Ocurrio un error al leer el UUID de la factura timbrada','Error');
				                 	break;

				                 	case 3:
				                 		toastr.error('Ocurrio un error al obtener el XML timbrado','Error');
				                 	break;

				                 	case 4:
				                 		toastr.error('Los saldos de la venta no conciden con los calculados','Error');
				                 	break;

				                 	case 9999:
				                 		toastr.error('La venta no puede ser facturada, ya que tiene adeudo.','Error');
				                 	break;

				                 	default:
				                 		toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
				                }
				            }
			            })
					    .done(function() {
					        $('#loadingHeader').css('display','none');
			                $('#btnCerrarModalFacturar').css('display','');
			                $('#loadingCerrarModalFacturar').css('display','none');
			                $('#btnFacturarModal').css('display','');
			                $('#loadingFacturarModal').css('display','none');
					    })
					    .fail(function(jqXHR, textStatus, errorThrown) {
					    	$('#loadingHeader').css('display','none');
			                $('#btnCerrarModalFacturar').css('display','');
			                $('#loadingCerrarModalFacturar').css('display','none');
			                $('#btnFacturarModal').css('display','');
			                $('#loadingFacturarModal').css('display','none');
			                $("#modalErrorConexion").modal("show");
					    })
					    .always(function() {
					    });
				  	}
				});
    		}
    		else{
    			toastr.warning('El cliente no cuenta con un RFC','Advertencia');
    		}
    	}
    	else{
    		toastr.warning('El cliente no cuenta con una razón social','Advertencia');
    	}
    });
});

function Limpiar(valor) {

	switch(valor){

		case 1:
			$('#fetchVentas').DataTable().ajax.reload();
			$('#fetchFacturas').DataTable().ajax.reload();
			$('#fetchFacturasCanceladas').DataTable().ajax.reload();

			FETCHVENTAS = null;
			FETCHVFACTURASCANCELADAS = null;
			FETCHFACTURAS = null;
		break;

		case 2:
			$('#fetchVentas').DataTable().ajax.reload();
			$('#fetchFacturas').DataTable().ajax.reload();
			$('#fetchFacturasCanceladas').DataTable().ajax.reload();

			FETCHVENTAS = null;
			FETCHVFACTURASCANCELADAS = null;
			FETCHFACTURAS = null;

			$("#modalFacturar").modal("hide");
			$("#txtSerie").val("");
			$("#txtFolio").val("");
			$("#txtRazonSocial").val("");
			$("#txtRFC").val("");
			$("#txtPC").val("");
			$("#txtPais").val("");
			$("#selectUsoCFDi").val("P01");
			$("#selectFormaPago").val("01");
			$("#selectMetodoPago").val("PUE");
			$("#txtCondicionPago").val("");
			$("#txtMoneda").val("MXN");
			$("#txtComprobante").val("I");
			$("#txtObservaciones").val("");
			$('#divRelacion').css('display', 'none');
            $('#txtTipoRelacion').attr('disabled', 'disabled');
            $('#divListFactura').css('display', 'none');
            $('#fetchRelacionFacturas').DataTable().destroy();
            document.getElementById("fetchRelacionFacturas").tBodies[0].innerHTML = "";
            document.getElementById("fetchFacturas").tBodies[0].innerHTML = "";
		break;
	}

}

function fetchVentas(is_date_search, start_date='', end_date=''){
  	let dataTable = $('#fetchVentas').DataTable({
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
	        url: window.dir + "index.php/Controller_Factura/fetchVentas",
	        type: "POST",
	        data:{
	          is_date_search:is_date_search, start_date:start_date, end_date:end_date
	        }
    	}
    });
}

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
        "select": true
    });
}

function fetchFacturasCanceladas(is_date_search, start_date='', end_date=''){

  	let dataTable = $('#fetchFacturasCanceladas').DataTable({
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
	        url: window.dir + "index.php/Controller_Factura/fetchFacturasCanceladas",
	        type: "POST",
	        data:{
	          is_date_search:is_date_search, start_date:start_date, end_date:end_date
	        }
	    }
	});
}


function fetchFacturas(is_date_search, start_date='', end_date=''){

  	let dataTable = $('#fetchFacturas').DataTable({
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
                  if (full[12] == 1){
                     return "<label class='badge badge-warning'>Publico General</label>"
                  }
                  else{
                     return "<label class='badge badge-success'>Cliente</label>"
                  }
                }
            },
            {
                "targets": 13,
                'render': function (data, type, full, meta)
                {
                   return " <div class='form-group'> <button data-toggle='tooltip' title='Ver PDF' type='button' onclick='getRutaPDF("+full[0]+");' class='pdf btn btn-danger btn-xs'><i class='fa fa-file-pdf-o' aria-hidden='true'></i> </button></div>  <div class='form-group'><button data-toggle='tooltip' title='Descargar XML' type='button' onclick='getRutaXML("+full[0]+");' class='btn btn-primary btn-xs'><i class='fa fa-file-code-o' aria-hidden='true'></i></button></div>  <div class='form-group'><button data-toggle='tooltip' title='Enviar Factura' type='button' onclick='GetIDCorreo("+full[0]+");' class='btn btn-default btn-xs'><spam class='glyphicon glyphicon-envelope'></spam></button></div> <div class='form-group'><button data-toggle='tooltip' title='Validar Saldos' type='button' onclick='getValidateSaldos("+full[0]+");' class='btn btn-warning btn-xs'><i class='fa fa-money' aria-hidden='true'></i></button></div>";
                }
            }
        ],
	    "order" : [],
	    "ajax" : {
	        url: window.dir + "index.php/Controller_Factura/fetchFacturas",
	        type: "POST",
	        data:{
	          is_date_search:is_date_search, start_date:start_date, end_date:end_date
	        }
	    }
    });
}

////////////////////////// Funciones Para La Tabla De Facturas ///////////////////////////////////////
function getRutaPDF(idVenta){
    window.open(""+window.dir+"Clases/Reportes/Formato_Facturacion_33.php?ID="+idVenta+"");
}

function getRutaXML(idVenta){
    window.open(""+window.dir+"Clases/RecuperarXML.php?ID="+idVenta+"");
}

function getValidateSaldos(idVenta){
    window.open(""+window.dir+"Clases/ValidateSaldos.php?ID="+idVenta+"");
}

function GetIDCorreo(idVenta)
{
    let formData = new FormData(); 
    formData.append("idVenta", idVenta);

    let Correo = "";

    $.ajax({
        url: window.dir + 'index.php/Controller_Factura/getCorreoDistribuidor',
        type: 'POST',
        processData: false,  // tell jQuery not to process the data
        contentType: false,
        timeout: 800000,
        data:formData,
        beforeSend : function ()
        {
        	$('#loadingHeader').css('display','');
            $('#btnCancelarFactura').css('display','none');
            $('#loadingCancelarFacturar').css('display','');
        },
        success: function(data)
        {
            let parsed = JSON.parse(data);
	        console.log(parsed);

	        if (parsed[0]['Email'] != ""){
	        	Correo = parsed[0]['Email'];
	        }
	        else{
	        	toastr.warning('El distribuidor no cuenta con el campo correo electrónico','Advertencia');
	        }
        }
    })
    .done(function()
    {
        if (Correo != ""){
        	sendMail(Correo,idVenta);
        }
        else{
        	$('#loadingHeader').css('display','none');
        	$('#btnCancelarFactura').css('display','');
        	$('#loadingCancelarFacturar').css('display','none');
        }
    })
    .fail(function() {
        $('#loadingHeader').css('display','none');
        $('#btnCancelarFactura').css('display','');
        $('#loadingCancelarFacturar').css('display','none');
        $("#modalErrorConexion").modal("show");
    })
    .always(function() {
    });
}

function sendMail(Correo,idVenta) {
	let PDF = window.dir + "Formato_Factura/Formato_Factura_Generica_33.php?ID="+ idVenta;
    let XML = window.dir + "Facturacion/Recuperar_XML_Generico.php?ID="+ idVenta;

    let formData = new FormData();
    formData.append("XML", XML);
    formData.append("PDF", PDF);
    formData.append("idVenta", idVenta);
    formData.append("Para", Correo);

    $.ajax({
        url: window.dir + 'index.php/Controller_Factura/sendMail',
        type: 'POST',
        processData: false,
        contentType: false,
        timeout: 800000,
        data: formData,
        success: function(data)
        {
        	console.log(data);

            switch(parseInt(data.trim())){
             	case 0:
             		toastr.error('Hubo un error al intetar enviar el correo al distribuidor','Error');
             	break;

             	case 1:
             		toastr.success('Correo enviado con exito al distribuidor','Correcto');
             	break;

             	default:
             		toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
            }  
        }
    })
    .done(function() {
        $('#loadingHeader').css('display','none');
        $('#btnCancelarFactura').css('display','');
        $('#loadingCancelarFacturar').css('display','none');
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {
    	$('#loadingHeader').css('display','none');
        $('#btnCancelarFactura').css('display','');
        $('#loadingCancelarFacturar').css('display','none');
        $("#modalErrorConexion").modal("show");
    })
    .always(function() {
    });
}


function ActualizarFecha(){

    let fecha = new Date();

    let mesok = new Array(12);
    mesok[0]="Enero";
    mesok[1]="Febrero";
    mesok[2]="Marzo";
    mesok[3]="Abril";
    mesok[4]="Mayo";
    mesok[5]="Junio";
    mesok[6]="Julio";
    mesok[7]="Agosto";
    mesok[8]="Septiembre";
    mesok[9]="Octubre";
    mesok[10]="Noviembre";
    mesok[11]="Diciembre";

    $('#txtFecha').text(fecha.getDate() + " de " + mesok[fecha.getMonth()] + " del " + fecha.getFullYear() + "  " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds());
}