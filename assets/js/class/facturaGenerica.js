
$(document).ready(function(){

	// Comprobar cuando cambia un checkbox
	// Accion Click EditarCfdiRelacionados 
	$("#EditarCfdiRelacionados").on('change', function() {
	    if ($(this).is(':checked')){
	        $("#selectTipoRelacion").removeAttr('disabled');
	    	$("#btnAceptarRelacion").removeAttr('disabled');
	    }else {
	        $("#selectTipoRelacion").attr('disabled','disabled');
	    	$("#btnAceptarRelacion").attr('disabled','disabled');
	    }
	});

	// Acción Abrir Concepto //
	$("#btnAddConcepto").click(function(event) {
		$("#divConcepto").css('display','');
		$("#btnAddConcepto").css('display','none');
		$("#btnCancelar").css('display','');
		$("#btnAddMovimiento").css('display','');
	});

	// Acción Abrir Concepto //
	$("#btnCancelar").click(function(event) {
		$("#divConcepto").css('display','none');
		$("#btnAddConcepto").css('display','');
		$("#btnCancelar").css('display','none');
		$("#btnAddMovimiento").css('display','none');

		$("#txt_clave_sat").val('');
		$("#txt_clave_unidad").val('');
		$("#txt_Cantidad").val('');
		$("#txt_Unidad").val('');
		$("#txt_Numero_identificacion").val('');
		$("#txt_Descripcion").val('');
		$("#txt_Valor_Unitario").val('');
		$("#txt_Importe").val('');
		$("#txt_Descuento").val('');
	});

	// Mostrar Pestaña Impuesto //
	$('#Check_Impuesto').on('change', function() {

        if ($(this).is(':checked')){
            $("#Tab_impuestos").css('display','');
        }
        else{
            $("#Tab_impuestos").css('display','none');
        }
    });

	// UpperCase RFC Receptor //
   	$("#id_RFC_receptor").keyup(function() {
	  	let RFC_Receptor = $("#id_RFC_receptor").val().toUpperCase();
	   	$("#id_RFC_receptor").val(RFC_Receptor);
	});

	// Acción Siguiente Emisor/Receptor //
	$("#tab-next").click(function(event)
	{
	    let RFC                     = $("#txtRFC").val();
	    let RazonSocial             = $("#txtEmpresa").val();
	    let Regimen                 = $("#selectRegimen").val();
	    let Comprobante             = $("#selectTipo").val();
	    let RFC_Receptor            = $("#txtRFCReceptor").val();
	    let RazonSocial_Receptor    = $("#txtEmpresaReceptor").val();
	    let ClienteRecomendado      = $("#selectClienteFrecuente").val();

	    if (ClienteRecomendado != ""){
	    	if (RFC != "" && RazonSocial != "" && Regimen != "" && Comprobante != "" && ClienteRecomendado != ""){
	    		$("#tab-next").attr('href', '#tab_content22');
		        $("#Modulo_Emisor").removeClass("active");
		        $("#Modulo_Comprobante").addClass("active");
		        $("#Alert_UUID").css('display','none');
	    	}
	    	else{
	    		toastr.info('Algunos datos obligatorios estan vacios, favor de verificarlos', 'Importante');
	    	}
	    }
	    else{
	    	if (RFC != "" && RazonSocial != "" && Regimen != "" && Comprobante != "" && RFC_Receptor != ""){
		        $("#tab-next").attr('href', '#tab_content22');
		        $("#Modulo_Emisor").removeClass("active");
		        $("#Modulo_Comprobante").addClass("active");
		        $("#Alert_UUID").css('display','none');
		    }
		    else{
		        toastr.info('Algunos datos obligatorios estan vacios, favor de verificarlos', 'Importante');
		    }
	    }
	});

	// Acción Agregar Producto //
	$("#btnAddMovimiento").click(function(){

       let Clave_SAT            = $("#txt_clave_sat").val();
       let Cantidad             = $("#txt_Cantidad").val();
       let Unidad               = $("#txt_Unidad").val();
       let Clave_Unidad         = $("#txt_clave_unidad").val();
       let Codigo               = $("#txt_Numero_identificacion").val();
       let Descripcion          = $("#txt_Descripcion").val();
       let Valor_Unitario       = $("#txt_Valor_Unitario").val();
       let Importe              = $("#txt_Importe").val();
       let Descuento            = $("#txt_Descuento").val();
       let Desc            		= Descuento / 100;
       let Importe_Sin_Desc     = Cantidad * Valor_Unitario;
       let  Tabla               = document.querySelector("#fetchListProducto");

       if (Clave_SAT != null && Clave_SAT != "" && Cantidad != null && Cantidad != "" && Unidad != null && Unidad != "" && Clave_Unidad != null && Clave_Unidad != "" && Descripcion != null && Descripcion != "" && Valor_Unitario != null && Valor_Unitario != "")
       {

            $("#fetchListProducto").css('display','');

            let row = Tabla.tBodies[0].insertRow(document.querySelector("#fetchListProducto").tBodies[0].rows.length);
            row.setAttribute("id",document.querySelector("#fetchListProducto").tBodies[0].rows.length - 1);

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);
            let cell7 = row.insertCell(6);
            let cell8 = row.insertCell(7);
            let cell9 = row.insertCell(8);
            let cell10 = row.insertCell(9);
            let cell11 = row.insertCell(10);

            cell1.innerHTML = Codigo;
            cell2.innerHTML = Cantidad;
            cell3.innerHTML = Unidad;
            cell4.innerHTML = Clave_Unidad;
            cell5.innerHTML = Clave_SAT;
            cell6.innerHTML = Descripcion;
            cell7.innerHTML = parseFloat(Valor_Unitario).toFixed(2);
            cell8.innerHTML = parseFloat(Importe).toFixed(2);

             if (Descuento.length  == 0){
                cell9.innerHTML  = 0.00;
                cell10.innerHTML = 0.00;
            }
            else{
                cell10.innerHTML    = parseFloat(Importe_Sin_Desc * Desc).toFixed(2);
                cell9.innerHTML     = parseFloat(Descuento).toFixed(2);
            }

            let boton = document.createElement("button");
            boton.classList.add('btn', 'btn-danger', 'btn-sx'); 
            boton.style.marginRight = "10px";
            boton.addEventListener("click",eliminarMovimiento);
            cell11.appendChild(boton);

            let icono = document.createElement("span");
            icono.classList.add('glyphicon', 'glyphicon-trash');
            boton.appendChild(icono);

            let boton_edit = document.createElement("button");
            boton_edit.classList.add('btn', 'btn-warning', 'btn-sx');
            boton_edit.addEventListener("click",editarMovimiento);
            cell11.appendChild(boton_edit);

            let icono_edit = document.createElement("span");
            icono_edit.classList.add('glyphicon', 'glyphicon-edit');
            boton_edit.appendChild(icono_edit);

            $("#txt_clave_sat").val("");
            $("#txt_Cantidad").val("");
            $("#txt_Unidad").val("");
            $("#txt_clave_unidad").val("");
            $("#txt_Numero_identificacion").val("");
            $("#txt_Descripcion").val("");
            $("#txt_Valor_Unitario").val("");
            $("#txt_Importe").val("");
            $("#txt_Descuento").val("");
            $("#divListProductos").css('display', '');

            CalcularTotal();
            //Alerts_Conceptos();
            //Valor_Base();

       }else{
        toastr.warning('Algunos de los datos obligatorios se encuntran vacios por favor validar estos campos', 'Advertencia');
       }
    });

	// Acción Change Input Valor Unitario //
    $('#txt_Valor_Unitario').change(function(){
        let Valor_Unitario  = $('#txt_Valor_Unitario').val();
        let Cantidad        = $('#txt_Cantidad').val();
        let Descuento_Mov   = $('#txt_Descuento').val();

        if (Valor_Unitario != ""){
            if (Cantidad != ""){
                if (Descuento_Mov != ""){
                    let Importe     = 0;
                    let Descuento   = 0;
                    Descuento = Descuento_Mov / 100;
                    Importe = parseFloat(Valor_Unitario) * parseFloat(Cantidad) - ((parseFloat(Valor_Unitario) * parseFloat(Cantidad)) * Descuento).toFixed(2);
                    $('#txt_Importe').val(Importe.toFixed(2));
                }
                else{

                    let Importe = 0;
                    Importe = parseFloat(Valor_Unitario) * parseFloat(Cantidad).toFixed(2);
                    $('#txt_Importe').val(Importe.toFixed(2));
                }
            }
            else{
                toastr.info('El campo cantidad es obligatorios para calcular el importe de la factura', 'Importante');
                $('#txt_Importe').val("");
            }
        }
    });

    // Acción Change Input Cantidad //
    $('#txt_Cantidad').change(function(){

        let Valor_Unitario  = $('#txt_Valor_Unitario').val();
        let Cantidad        = $('#txt_Cantidad').val();
        let Descuento_Mov   = $('#txt_Descuento').val();

        if (Valor_Unitario != ""){
            if (Cantidad != ""){
                if (Descuento_Mov != ""){

	                let Importe     = 0;
	                let Descuento   = 0;
	                Descuento = Descuento_Mov / 100;
	                Importe = parseFloat(Valor_Unitario) * parseFloat(Cantidad) - ((parseFloat(Valor_Unitario) * parseFloat(Cantidad)) * Descuento).toFixed(2);
	                $('#txt_Importe').val(Importe.toFixed(2));

                }
                else{

                    let Importe = 0;
                    Importe = parseFloat(Valor_Unitario) * parseFloat(Cantidad).toFixed(2);
                    $('#txt_Importe').val(Importe.toFixed(2));
                }
            }
            else{
                toastr.info('Los campos Cantidad es obligatorios para calcular el importe de la factura', 'Importante');
                $('#txt_Importe').val("");
            }
        }
    });

    // Acción Change Input Descuento //
    $('#txt_Descuento').change(function(){

        let Valor_Unitario  = $('#txt_Valor_Unitario').val();
        let Cantidad        = $('#txt_Cantidad').val();
        let Descuento_Mov   = $('#txt_Descuento').val();

        if (Valor_Unitario != ""){
            if (Cantidad != null && Cantidad != ""){
                if (Descuento_Mov != null && Descuento_Mov != ""){

	                let Importe     = 0;
	                let Descuento   = 0;
	                Descuento = Descuento_Mov / 100;
	                Importe = parseFloat(Valor_Unitario) * parseFloat(Cantidad) - ((parseFloat(Valor_Unitario) * parseFloat(Cantidad)) * Descuento).toFixed(2);
	                $('#txt_Importe').val(Importe.toFixed(2));
                }
                else{

                    let Importe = 0;
                    Importe = parseFloat(Valor_Unitario) * parseFloat(Cantidad).toFixed(2);
                    $('#txt_Importe').val(Importe.toFixed(2));
                }
            }
            else{
                toastr.info('El campo cantidad es obligatorios para calcular el importe de la factura', 'Importante');
                $('#txt_Importe').val("");
            }
        }
    });

    /// Acción Mostar CFDi Relacionados ///
    $("#btnAceptarRelacion").click(function(event) {
    	$("#btnAceptarRelacion").css('display','none');
    	$("#btnCancelarRelacion").css('display','');
    	$("#btnAddRelacion").css('display','');
    	$(".UUID").css('display','');
    });

    /// Acción Cancelar CFDi Relacionados ///
    $("#btnCancelarRelacion").click(function(event) {
    	$("#btnAceptarRelacion").css('display','');
    	$("#btnCancelarRelacion").css('display','none');
    	$("#btnAddRelacion").css('display','none');
    	$(".UUID").css('display','none');
    });


    //////////////////////////////////////////////////////////////////////////////
	////            Validación de Campos para la Facturación                  ////
	//////////////////////////////////////////////////////////////////////////////

	$('#txt_clave_sat').on('input', function () {
	    this.value = this.value.replace(/[^0-9]/g,'');
	});

	$('#txt_Cantidad').on('input', function () {
	    this.value = this.value.replace(/[^0-9]/g,'');
	});

	$('#txt_Valor_Unitario').on('input', function () {
	    this.value = this.value.replace(/[^0-9-.]/g,'');
	});

	$('#txt_Descuento').on('input', function () {
	    this.value = this.value.replace(/[^0-9]/g,'');
	});

    $("#UUID").keypress(function(event) {
        validate = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(this.value);
        console.log(validate);
    });
});

var eliminarMovimiento = function(event){
    let row = this.parentNode.parentNode;
    let tbody = document.querySelector("#fetchListProducto").tBodies[0];
    tbody.removeChild(row);
    /*Metodo Alertas en Conceptos*/
    Alerts_Conceptos();
};

var editarMovimiento = function(event){
    let row     = this.parentNode.parentNode;

    $("#txt_clave_sat").val(row.childNodes[4].innerHTML);
    $("#txt_Cantidad").val(row.childNodes[1].innerHTML);
    $("#txt_Unidad").val(row.childNodes[2].innerHTML);
    $("#txt_clave_unidad").val(row.childNodes[3].innerHTML);
    $("#txt_Numero_identificacion").val(row.childNodes[0].innerHTML);
    $("#txt_Descripcion").val(row.childNodes[5].innerHTML);
    $("#txt_Valor_Unitario").val(row.childNodes[6].innerHTML);
    $("#txt_Importe").val(row.childNodes[7].innerHTML);
    $("#txt_Descuento").val(row.childNodes[8].innerHTML);

    let tbody = document.querySelector("#fetchListProducto").tBodies[0];
    tbody.removeChild(row);
    Alerts_Conceptos();
}

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

// Calcular Totales //
function CalcularTotal() {

	let Tabla_Productos    = document.getElementById("fetchListProducto");
    let Tbody_Productos    = Tabla_Productos.getElementsByTagName("tbody")[0];
    let Cantidad_Productos = Tbody_Productos.getElementsByTagName("tr").length;

    let Cantidad        = 0;
    let ValorUnitario   = 0;
    let Importe     	= 0;
    let Descuento   	= 0;
    let Subtotal    	= 0;
    let IVA 			= 0;
    let Total       	= 0;

    for (let i = 0; i < Tbody_Productos.rows.length; i++){
        Cantidad       = parseFloat(Tbody_Productos.rows[i].cells[1].innerText).toFixed(2);
        ValorUnitario  = parseFloat(Tbody_Productos.rows[i].cells[6].innerText).toFixed(2);
        Importe        += Cantidad * ValorUnitario;
        Descuento      += parseFloat(Tbody_Productos.rows[i].cells[9].innerText);
        Subtotal       = parseFloat(Importe) - parseFloat(Descuento);
        IVA 		   = parseFloat(Subtotal * 0.16);
        Total          = parseFloat(Subtotal + IVA);
    }

    if (Cantidad_Productos > 0) {
        $('#SubTotal').val("$ " + parseFloat(Subtotal).toFixed(2));
        $('#Descuento').val("$ " + parseFloat(Descuento).toFixed(2));
        $('#Impuestos_TotalImpuestosTrasladados').val("$ " + parseFloat(IVA).toFixed(2));
        $('#Impuestos_TotalImpuestosRetenidos').val("$ " + parseFloat(0.00).toFixed(2));
        $('#Total').val("$ " + parseFloat(Total).toFixed(2));
    }
    else{
        $('#SubTotal').val("$ 0.00");
        $('#Descuento').val("$ 0.00");
        $('#Impuestos_TotalImpuestosTrasladados').val("$ 0.00");
        $('#Impuestos_TotalImpuestosRetenidos').val("$ 0.00");
        $('#Total').val("$ 0.00");
    }
}