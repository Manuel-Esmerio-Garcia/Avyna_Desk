var tableCompras = null;
var tableFetchOrdenCompra = null;
var tableFetchAnticipo = null;
var ivaBodega = null;
var contador  = 0;
var contadorOC  = 0;
var contadorOCUpdate  = 0;

$(document).ready(function(){ 
	// Cargar DatatTable Nueva Compra //
	fetchNuevaCompra();

    // Cargar DataTable Compras //
    fetchCompras("");

	// Cargar Alerts Toast //
    Toast();

    ///////////////////////////////////////////
    ////    Nueva Orden Compra Module     /////
    //////////////////////////////////////////

    /// Acción Seleccionar Bodega ///
    $("#selectBodega").change(function (e) { 
        let Bodega = $("#selectBodega").val();

		if (Bodega != ""){
            // Limpiamos DataTable fetchPagosPendientes //
            $('#fetchOrdenCompra').DataTable().destroy();
            document.getElementById("fetchOrdenCompra").tBodies[0].innerHTML = "";
            // Cargar DataTable Ordenes Compra //
            fetchOrdenCompra(Bodega);
        }
        else{
            // Limpiamos DataTable fetchPagosPendientes //
            $('#fetchOrdenCompra').DataTable().destroy();
            document.getElementById("fetchOrdenCompra").tBodies[0].innerHTML = "";
        }
    });

    /// Acción Abrir Modal Agregar ///
    $("#btnAgregarOrden").click(function (e) {
        let Bodega = $("#selectBodega").val();

		if (Bodega != ""){
            Limpiar(3);
            // Cargar DataTable Ordenes Compra //
            fetchNuevaOC(); 
        }
        else{
            toastr.warning('Seleccione una sucursal.', 'Advertencia');
        }        
    });

    // Acción Calcular //
    $("#btnModalCalcularOC").click(function (e) { 
        CalcularOC();    
    });

    // Acción Guardar OC //
    $("#btnModalGuardarOC").click(function (e) { 
        let Bodega = $("#selectBodega").val();
        let Provee = $("#selectProveedorOC").val();
        let Total  = parseFloat($("#TotalOC").text());
        let Status = $("#StatusOC").text();
        let Cant   = parseInt($("#CantidadOC").text());
        let User   = $("#ID_Usuario").text();
        let Referencia = $("#ReferenciaOC").val();

        if (Provee != "") {
            if (contadorOC == 1) {
                if(Cant > 0 && Total > 0){

                    swal({
                        title: "¿Esta segúro que desea generar la orden de compra?",
            		    text: "Una vez generada la OC, sera visible para el proveedor",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                          
                            $('#fetchNuevaOrdenCompra').DataTable().destroy();
                            //Tabla de Servicio Ventas //
                            let table          = document.getElementById("fetchNuevaOrdenCompra");
                            let tbody          = table.getElementsByTagName("tbody")[0];

                            let idCatalogo = new Array();
                            let Cantidad   = new Array();
                            let Costo      = new Array();
                            let Importe    = new Array();

                            for (var i = 0; i < tbody.rows.length; i++){
                                if (parseInt(tbody.rows[i].childNodes[5].childNodes[0].value) != 0){
                                    idCatalogo.push(tbody.rows[i].cells[0].innerHTML);
                                    Cantidad.push(tbody.rows[i].childNodes[3].childNodes[0].value);
                                    Costo.push(tbody.rows[i].childNodes[4].childNodes[0].value);
                                    Importe.push(tbody.rows[i].childNodes[5].childNodes[0].value);
                                }
                            }

                            // Cargamos DataTable //
                            fetch("fetchNuevaOrdenCompra");

                            // Acción Ajax //
                            let formData = new FormData();
                            formData.append("idSucursal", Bodega);
                            formData.append("idUsuario",User);
                            formData.append("idProveedor", Provee);
                            formData.append("Cantidad_productos", Cant);
                            formData.append("Monto", Total);
                            formData.append("Status", Status);
                            formData.append("idCatalogo", idCatalogo);
                            formData.append("Cantidad", Cantidad);
                            formData.append("Costo", Costo);
                            formData.append("Importe", Importe);
                            formData.append('Referencia',Referencia);

                            $.ajax({
                                url: window.dir + 'index.php/Controller_Compras/addOC',
                                type: 'POST',
                                processData: false,
                                contentType: false,
                                timeout: 800000,
                                data: formData,
                                beforeSend : function ()
                                {
                                    $('#loadingHeader').css('display','');
                                    $('#btnModalCerrarOC').css('display','none');
                                    $('#loadingModalCerrarOC').css('display','');
                                    $("#btnModalGuardarOC").css('display','none');
                                    $("#loadingModalGuardarOC").css('display','');
                                    $("#btnModalCalcularOC").css('display','none');
                                    $("#loadingModalCalcularOC").css('display','');
                                },
                                success: function(data)
                                {
                                    //console.log(data);
                                    switch(parseInt(data.trim())){

                                        case 0:
                                            toastr.error('Ocurrio un error al agregar la orden de compra', 'Error');
                                        break;

                                        case 1:
                                            Limpiar(3);
                                            toastr.success('Orden de Compra agregada con exito', 'Correcto');
                                        break;

                                        default:
                                            toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                                    }
                                }
                            })
                            .done(function() {
                                $('#loadingHeader').css('display','none');
                                $('#btnModalCerrarOC').css('display','');
                                $('#loadingModalCerrarOC').css('display','none');
                                $("#btnModalGuardarOC").css('display','');
                                $("#loadingModalGuardarOC").css('display','none');
                                $("#btnModalCalcularOC").css('display','');
                                $("#loadingModalCalcularOC").css('display','none');
                            })
                            .fail(function(jqXHR, textStatus, errorThrown) {
                                $('#loadingHeader').css('display','none');
                                $('#btnModalCerrarOC').css('display','');
                                $('#loadingModalCerrarOC').css('display','none');
                                $("#btnModalGuardarOC").css('display','');
                                $("#loadingModalGuardarOC").css('display','none');
                                $("#btnModalCalcularOC").css('display','');
                                $("#loadingModalCalcularOC").css('display','none');
                                $("#modalErrorConexion").modal("show");
                            })
                            .always(function() {
                            });
                        }
                    });
                }
                else{
                    toastr.warning('No es posible generar una orden de compra con total en 0.', 'Advertencia');
                }
            }
            else{
                toastr.warning('Para continuar es necesario calcular.', 'Advertencia');  
            }
        }
        else{
            toastr.warning('Seleccione una proveedor.', 'Advertencia');
        }
    });

    // Obtener fila de la tabla Compras al dar click //
    document.getElementById("fetchOrdenCompra").onclick = function(e){
        tableFetchOrdenCompra = e.target.parentNode;

        let formData = new FormData();
        formData.append("idOC", tableFetchOrdenCompra.childNodes[0].innerHTML);

        $.ajax({
            url: window.dir + 'index.php/Controller_Compras/getDetalleOrdenCompra',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnAgregarOrden').css('display','none');
                $('#loadingAgregarOrden').css('display','');
                $('#btnEditarOrden').css('display','none');
                $('#loadingEditarOrden').css('display','');
                $('#btnEliminarOrden').css('display','none');
                $('#loadingEliminarOrden').css('display','');
                $('#btnGenerarCompraOC').css('display','none');
                $('#loadingGenerarCompra').css('display','');
                $('#btnGenerarAnticipo').css('display','none');
                $('#loadingGenerarAnticipo').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                let table = document.getElementById("fetchDetalleOrdenCompra"); 
                let tbody = table.tBodies[0];

                $('#fetchDetalleOrdenCompra').DataTable().destroy();
                table.tBodies[0].innerHTML = "";

                if (parsed != null && parsed != ""){

                    for (var i = 0; i < parsed.length; i++){

                        let row  = tbody.insertRow(i);
                        let cel1 = row.insertCell(0);
                        let cel2 = row.insertCell(1);
                        let cel3 = row.insertCell(2);
                        let cel4 = row.insertCell(3);
                        let cel5 = row.insertCell(4);
                        let cel6 = row.insertCell(5);

                        cel1.innerHTML = parsed[i]['ID'];
                        cel2.innerHTML = parsed[i]['Codigo'];
                        cel3.innerHTML = parsed[i]['Producto'];
                        cel4.innerHTML = parsed[i]['Cantidad'];
                        cel5.innerHTML = parseFloat(parsed[i]['Precio_unitario']).toFixed(2);
                        cel6.innerHTML = parseFloat(parsed[i]['Importe']).toFixed(2);
                    }

                    fetch("fetchDetalleOrdenCompra");
                }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnAgregarOrden').css('display','');
            $('#loadingAgregarOrden').css('display','none');
            $('#btnEditarOrden').css('display','');
            $('#loadingEditarOrden').css('display','none');
            $('#btnEliminarOrden').css('display','');
            $('#loadingEliminarOrden').css('display','none');
            $('#btnGenerarCompraOC').css('display','');
            $('#loadingGenerarCompra').css('display','none');
            $('#btnGenerarAnticipo').css('display','');
            $('#loadingGenerarAnticipo').css('display','none');
        })
         .fail(function(jqXHR, textStatus, errorThrown) {
            $('#loadingHeader').css('display','none');
            $('#btnAgregarOrden').css('display','');
            $('#loadingAgregarOrden').css('display','none');
            $('#btnEditarOrden').css('display','');
            $('#loadingEditarOrden').css('display','none');
            $('#btnEliminarOrden').css('display','');
            $('#loadingEliminarOrden').css('display','none');
            $('#btnGenerarCompraOC').css('display','');
            $('#loadingGenerarCompra').css('display','none');
            $('#btnGenerarAnticipo').css('display','');
            $('#loadingGenerarAnticipo').css('display','none');
            $("#modalErrorConexion").modal("show");
        })
        .always(function() {
        });
    }

















































    ////////////////////////////////
    /// Editar Orden de Compra /////
    ////////////////////////////////

    $("#btnEditarOrden").click(function (e) { 
        if (tableFetchOrdenCompra != null) {
            if (tableFetchOrdenCompra.childNodes[8].childNodes[0].innerHTML != 'Aceptada' && tableFetchOrdenCompra.childNodes[8].childNodes[0].innerHTML != 'Generada') {
                let formData = new FormData();
                formData.append("idOC", tableFetchOrdenCompra.childNodes[0].innerHTML);

                $.ajax({
                    url: window.dir + 'index.php/Controller_Compras/getEditarDetalleOrdenCompra',
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    timeout: 800000,
                    data: formData,
                    beforeSend : function ()
                    {
                        $('#loadingHeader').css('display','');
                        $('#btnAgregarOrden').css('display','none');
                        $('#loadingAgregarOrden').css('display','');
                        $('#btnEditarOrden').css('display','none');
                        $('#loadingEditarOrden').css('display','');
                        $('#btnEliminarOrden').css('display','none');
                        $('#loadingEliminarOrden').css('display','');
                        $('#btnGenerarCompraOC').css('display','none');
                        $('#loadingGenerarCompra').css('display','');
                        $('#btnGenerarAnticipo').css('display','none');
                        $('#loadingGenerarAnticipo').css('display','');
                    },
                    success: function(data)
                    {
                        let parsed = JSON.parse(data);

                        console.log(parsed);

                        let table = document.getElementById("fetchEditarOrdenCompra"); 
                        let tbody = table.tBodies[0];

                        $('#fetchEditarOrdenCompra').DataTable().destroy();
                        table.tBodies[0].innerHTML = "";

                        if (parsed['Detalle'] != null && parsed['Detalle'] != ""){

                            if (parsed['Info'][0]['Status'] != 'Generada') {
                                for (var i = 0; i < parsed['Detalle'].length; i++){

                                    let row  = tbody.insertRow(i);
                                    let cel1 = row.insertCell(0);
                                    let cel2 = row.insertCell(1);
                                    let cel3 = row.insertCell(2);
                                    let cel4 = row.insertCell(3);
                                    let cel5 = row.insertCell(4);
                                    let cel6 = row.insertCell(5);

                                    cel1.innerHTML = parsed['Detalle'][i]['ID'];
                                    cel2.innerHTML = parsed['Detalle'][i]['Codigo'];
                                    cel3.innerHTML = parsed['Detalle'][i]['Producto'];

                                    let input = document.createElement("input");
                                    input.classList.add('form-control');
                                    input.setAttribute('type', 'number');
                                    input.setAttribute('value', parsed['Detalle'][i]['Cantidad']);
                                    input.setAttribute('min', '0');
                                    input.setAttribute('style', 'max-width: 100px !important');
                                    input.addEventListener("keyup",calcularFetchEditarOrdenCompra);
                                    cel4.appendChild(input);

                                    let input2 = document.createElement("input");
                                    input2.classList.add('form-control');
                                    input2.setAttribute('type', 'number');
                                    input2.setAttribute('value', parsed['Detalle'][i]['Costo']);
                                    input2.setAttribute('min', '0');
                                    input2.setAttribute('style', 'max-width: 100px !important');
                                    input2.addEventListener("keyup",calcularFetchEditarOrdenCompra);
                                    cel5.appendChild(input2);

                                    let input3 = document.createElement("input");
                                    input3.classList.add('form-control');
                                    input3.setAttribute('type', 'number');
                                    input3.setAttribute('value', parseFloat(parsed['Detalle'][i]['Importe']));
                                    input3.setAttribute('min', '0');
                                    input3.setAttribute('style', 'max-width: 100px !important');
                                    input3.setAttribute('readonly', 'readonly');
                                    cel6.appendChild(input3);
                                }

                                $("#selectProveedorOCUpdate").val(parsed['Info'][0]['idProveedor']);
                                $("#selectProveedorOCUpdate").removeAttr('disabled');
                                $("#ReferenciaOCUpdate").val(parsed['Info'][0]['Referencia']);
                                $("#btnUpdateModalGuardarOC").css('display','');
                                $("#btnUpdateModalCalcularOC").css('display','');
                            }
                            else{

                                for (var i = 0; i < parsed['Detalle'].length; i++){

                                    let row  = tbody.insertRow(i);
                                    let cel1 = row.insertCell(0);
                                    let cel2 = row.insertCell(1);
                                    let cel3 = row.insertCell(2);
                                    let cel4 = row.insertCell(3);
                                    let cel5 = row.insertCell(4);
                                    let cel6 = row.insertCell(5);

                                    cel1.innerHTML = parsed['Detalle'][i]['ID'];
                                    cel2.innerHTML = parsed['Detalle'][i]['Codigo'];
                                    cel3.innerHTML = parsed['Detalle'][i]['Producto'];

                                    let input = document.createElement("input");
                                    input.classList.add('form-control');
                                    input.setAttribute('type', 'number');
                                    input.setAttribute('value', parsed['Detalle'][i]['Cantidad']);
                                    input.setAttribute('min', '0');
                                    input.setAttribute('style', 'max-width: 100px !important');
                                    input.setAttribute('readonly', 'readonly');
                                    input.addEventListener("keyup",calcularFetchEditarOrdenCompra);
                                    cel4.appendChild(input);

                                    let input2 = document.createElement("input");
                                    input2.classList.add('form-control');
                                    input2.setAttribute('type', 'number');
                                    input2.setAttribute('value', parsed['Detalle'][i]['Costo']);
                                    input2.setAttribute('min', '0');
                                    input2.setAttribute('style', 'max-width: 100px !important');
                                    input2.setAttribute('readonly', 'readonly');
                                    input2.addEventListener("keyup",calcularFetchEditarOrdenCompra);
                                    cel5.appendChild(input2);

                                    let input3 = document.createElement("input");
                                    input3.classList.add('form-control');
                                    input3.setAttribute('type', 'number');
                                    input3.setAttribute('value', parseFloat(parsed['Detalle'][i]['Importe']));
                                    input3.setAttribute('min', '0');
                                    input3.setAttribute('style', 'max-width: 100px !important');
                                    input3.setAttribute('readonly', 'readonly');
                                    cel6.appendChild(input3);
                                }

                                $("#selectProveedorOCUpdate").val(parsed['Info'][0]['idProveedor']);
                                $("#selectProveedorOCUpdate").attr('disabled','disabled');
                                $("#ReferenciaOCUpdate").val(parsed['Info'][0]['Referencia']);
                                $("#btnUpdateModalGuardarOC").css('display','none');
                                $("#btnUpdateModalCalcularOC").css('display','none');

                            }

                            fetch("fetchEditarOrdenCompra");
                            CalcularOCUpdate();

                            $('#StatusOCUpdate').empty();

                            if(parsed['Info'][0]['Status'] == 'Pendiente'){
                                $('#StatusOCUpdate').append('<option value="Cancelada">Cancelada</option>');
                                $('#StatusOCUpdate').append('<option value="Pendiente">Pendiente</option>');
                                $('#StatusOCUpdate').append('<option value="Aceptada">Aceptada</option>');
                                $('#StatusOCUpdate').append('<option value="Rechazada">Rechazada</option>');
                            }
                            else if(parsed['Info'][0]['Status'] == 'Cancelada'){
                                $('#StatusOCUpdate').append('<option value="Cancelada">Cancelada</option>');
                                $('#StatusOCUpdate').append('<option value="Pendiente">Pendiente</option>');
                            }
                            else if(parsed['Info'][0]['Status'] == 'Rechazada'){
                                $('#StatusOCUpdate').append('<option value="Rechazada">Rechazada</option>');
                                $('#StatusOCUpdate').append('<option value="Cancelada">Cancelada</option>');
                                $('#StatusOCUpdate').append('<option value="Pendiente">Pendiente</option>');
                            }
                            else if(parsed['Info'][0]['Status'] == 'Aceptada'){
                                $('#StatusOCUpdate').append('<option value="Aceptada">Aceptada</option>');
                                $('#StatusOCUpdate').append('<option value="Cancelada">Cancelada</option>');
                                $('#StatusOCUpdate').append('<option value="Pendiente">Pendiente</option>');
                            }
                            else{
                                $('#StatusOCUpdate').append('<option value="'+parsed['Info'][0]['Status']+'">'+parsed['Info'][0]['Status']+'</option>');
                            }

                            $("#StatusOCUpdate").val(parsed['Info'][0]['Status']);
                            $("#modalUpdateOrdenesCompra").modal("show");
                        }
                    }
                })
                .done(function() {
                    $('#loadingHeader').css('display','none');
                    $('#btnAgregarOrden').css('display','');
                    $('#loadingAgregarOrden').css('display','none');
                    $('#btnEditarOrden').css('display','');
                    $('#loadingEditarOrden').css('display','none');
                    $('#btnEliminarOrden').css('display','');
                    $('#loadingEliminarOrden').css('display','none');
                    $('#btnGenerarCompraOC').css('display','');
                    $('#loadingGenerarCompra').css('display','none');
                    $('#btnGenerarAnticipo').css('display','');
                    $('#loadingGenerarAnticipo').css('display','none');
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    $('#loadingHeader').css('display','none');
                    $('#btnAgregarOrden').css('display','');
                    $('#loadingAgregarOrden').css('display','none');
                    $('#btnEditarOrden').css('display','');
                    $('#loadingEditarOrden').css('display','none');
                    $('#btnEliminarOrden').css('display','');
                    $('#loadingEliminarOrden').css('display','none');
                    $('#btnGenerarCompraOC').css('display','');
                    $('#loadingGenerarCompra').css('display','none');
                    $('#btnGenerarAnticipo').css('display','');
                    $('#loadingGenerarAnticipo').css('display','none');
                    $("#modalErrorConexion").modal("show");
                })
                .always(function() {
                });
            }else{

                let formData = new FormData();
                formData.append("idOC", tableFetchOrdenCompra.childNodes[0].innerHTML);

                $.ajax({
                    url: window.dir + 'index.php/Controller_Compras/getEditarDetalleOrdenCompra',
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    timeout: 800000,
                    data: formData,
                    beforeSend : function ()
                    {
                        $('#loadingHeader').css('display','');
                        $('#btnAgregarOrden').css('display','none');
                        $('#loadingAgregarOrden').css('display','');
                        $('#btnEditarOrden').css('display','none');
                        $('#loadingEditarOrden').css('display','');
                        $('#btnEliminarOrden').css('display','none');
                        $('#loadingEliminarOrden').css('display','');
                        $('#btnGenerarCompraOC').css('display','none');
                        $('#loadingGenerarCompra').css('display','');
                        $('#btnGenerarAnticipo').css('display','none');
                        $('#loadingGenerarAnticipo').css('display','');
                    },
                    success: function(data)
                    {
                        let parsed = JSON.parse(data);
                        console.log(parsed);
                        
                        $('#StatusOCUpdateStatus').empty();

                        $('#StatusOCUpdateStatus').append('<option value="Aceptada">Aceptada</option>');
                        $('#StatusOCUpdateStatus').append('<option value="Generada">Generada</option>');
                        

                        $("#StatusOCUpdateStatus").val(parsed['Info'][0]['Status']);
                        $("#modalUpdateOrdenesCompraStatus").modal("show");
                    }
                })
                .done(function() {
                    $('#loadingHeader').css('display','none');
                    $('#btnAgregarOrden').css('display','');
                    $('#loadingAgregarOrden').css('display','none');
                    $('#btnEditarOrden').css('display','');
                    $('#loadingEditarOrden').css('display','none');
                    $('#btnEliminarOrden').css('display','');
                    $('#loadingEliminarOrden').css('display','none');
                    $('#btnGenerarCompraOC').css('display','');
                    $('#loadingGenerarCompra').css('display','none');
                    $('#btnGenerarAnticipo').css('display','');
                    $('#loadingGenerarAnticipo').css('display','none');
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    $('#loadingHeader').css('display','none');
                    $('#btnAgregarOrden').css('display','');
                    $('#loadingAgregarOrden').css('display','none');
                    $('#btnEditarOrden').css('display','');
                    $('#loadingEditarOrden').css('display','none');
                    $('#btnEliminarOrden').css('display','');
                    $('#loadingEliminarOrden').css('display','none');
                    $('#btnGenerarCompraOC').css('display','');
                    $('#loadingGenerarCompra').css('display','none');
                    $('#btnGenerarAnticipo').css('display','');
                    $('#loadingGenerarAnticipo').css('display','none');
                    $("#modalErrorConexion").modal("show");
                })
                .always(function() {
                });
            }
        }
        else{
            toastr.warning('Seleccione una Orden de Compra.', 'Advertencia');
        }
    });

    // Recalcular Totales //
    $("#btnUpdateModalCalcularOC").click(function (e) { 
        CalcularOCUpdate();
    });


     ////////////////////////////
    // Acción Guardar Cambios //
    $("#btnUpdateModalGuardarOCStatus").click(function (e) { 
        if (tableFetchOrdenCompra != null) {
            let Status = $("#StatusOCUpdateStatus").val();
            swal({
                title: "¿Esta segúro que desea guardar los cambios realizados a la orden de compra?",
                text: "Una vez generada la OC, sera visible para el proveedor",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {

                    // Acción Ajax //
                    let formData = new FormData();
                    formData.append("idOC", tableFetchOrdenCompra.childNodes[0].innerHTML);
                    formData.append("Status", Status);

                    $.ajax({
                        url: dir + 'index.php/Controller_Compras/UpdateOCStatus',
                        type: 'POST',
                        processData: false,
                        contentType: false,
                        timeout: 800000,
                        data: formData,
                        beforeSend : function ()
                        {
                            $('#loadingHeader').css('display','');
                            $('#btnUpdateModalCerrarOCStatus').css('display','none');
                            $('#loadingUpdateModalCerrarOCStatus').css('display','');
                            $("#btnUpdateModalGuardarOCStatus").css('display','none');
                            $("#loadingUpdateModalGuardarOCStatus").css('display','');
                        },
                        success: function(data)
                        {
                            //console.log(data);
                            switch(parseInt(data.trim())){

                                case 0:
                                    toastr.error('Ocurrio un error al guardar los cambios realizados a la orden de compra', 'Error');
                                break;

                                case 1:
                                    Limpiar(4);
                                    toastr.success('Orden de Compra modificada con exito', 'Correcto');
                                break;

                                default:
                                    toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                            }
                        }
                    })
                    .done(function() {
                        $('#loadingHeader').css('display','none');
                        $('#btnUpdateModalCerrarOCStatus').css('display','');
                        $('#loadingUpdateModalCerrarOCStatus').css('display','none');
                        $("#btnUpdateModalGuardarOCStatus").css('display','');
                        $("#loadingUpdateModalGuardarOCStatus").css('display','none');
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        $('#loadingHeader').css('display','none');
                        $('#btnUpdateModalCerrarOCStatus').css('display','');
                        $('#loadingUpdateModalCerrarOCStatus').css('display','none');
                        $("#btnUpdateModalGuardarOCStatus").css('display','');
                        $("#loadingUpdateModalGuardarOCStatus").css('display','none');
                        $("#modalErrorConexion").modal("show");
                    })
                    .always(function() {
                    });
                }
            });
        }
        else{
            toastr.warning('Seleccione una Orden de Compra.', 'Advertencia');
        }
    });

    ////////////////////////////
    // Acción Guardar Cambios //
    $("#btnUpdateModalGuardarOC").click(function (e) { 
        if (tableFetchOrdenCompra != null) {
            let Bodega = $("#selectBodega").val();
            let Provee = $("#selectProveedorOCUpdate").val();
            let Total  = parseFloat($("#TotalOCUpdate").text());
            let Status = $("#StatusOCUpdate").val();
            let Cant   = parseInt($("#CantidadOCUpdate").text());
            let User   = $("#ID_Usuario").text();
            let Referencia = $("#ReferenciaOCUpdate").val();

            if (Provee != "") {
                if (contadorOCUpdate == 1) {
                    if(Cant > 0 && Total > 0){
                        swal({
                            title: "¿Esta segúro que desea guardar los cambios realizados a la orden de compra?",
                            text: "Una vez generada la OC, sera visible para el proveedor",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                        .then((willDelete) => {
                            if (willDelete) {
                            
                                $('#fetchEditarOrdenCompra').DataTable().destroy();
                                //Tabla de Servicio Ventas //
                                let table          = document.getElementById("fetchEditarOrdenCompra");
                                let tbody          = table.getElementsByTagName("tbody")[0];

                                let idCatalogo = new Array();
                                let Cantidad   = new Array();
                                let Costo      = new Array();
                                let Importe    = new Array();

                                for (var i = 0; i < tbody.rows.length; i++){
                                    if (parseInt(tbody.rows[i].childNodes[5].childNodes[0].value) != 0){
                                        idCatalogo.push(tbody.rows[i].cells[0].innerHTML);
                                        Cantidad.push(tbody.rows[i].childNodes[3].childNodes[0].value);
                                        Costo.push(tbody.rows[i].childNodes[4].childNodes[0].value);
                                        Importe.push(tbody.rows[i].childNodes[5].childNodes[0].value);
                                    }
                                }

                                // Cargamos DataTable //
                                fetch("fetchEditarOrdenCompra");

                                // Acción Ajax //
                                let formData = new FormData();
                                formData.append("idOC", tableFetchOrdenCompra.childNodes[0].innerHTML);
                                formData.append("idSucursal", Bodega);
                                formData.append("idUsuario",User);
                                formData.append("idProveedor", Provee);
                                formData.append("Cantidad_productos", Cant);
                                formData.append("Monto", Total);
                                formData.append("Status", Status);
                                formData.append("idCatalogo", idCatalogo);
                                formData.append("Cantidad", Cantidad);
                                formData.append("Costo", Costo);
                                formData.append("Importe", Importe);
                                formData.append('Referencia',Referencia);

                                $.ajax({
                                    url: dir + 'index.php/Controller_Compras/UpdateOC',
                                    type: 'POST',
                                    processData: false,
                                    contentType: false,
                                    timeout: 800000,
                                    data: formData,
                                    beforeSend : function ()
                                    {
                                        $('#loadingHeader').css('display','');
                                        $('#btnUpdateModalCerrarOC').css('display','none');
                                        $('#loadingUpdateModalCerrarOC').css('display','');
                                        $("#btnUpdateModalGuardarOC").css('display','none');
                                        $("#loadingUpdateModalGuardarOC").css('display','');
                                        $("#btnUpdateModalCalcularOC").css('display','none');
                                        $("#loadingUpdateModalCalcularOC").css('display','');
                                    },
                                    success: function(data)
                                    {
                                        //console.log(data);
                                        switch(parseInt(data.trim())){

                                            case 0:
                                                toastr.error('Ocurrio un error al guardar los cambios realizados a la orden de compra', 'Error');
                                            break;

                                            case 1:
                                                Limpiar(4);
                                                toastr.success('Orden de Compra modificada con exito', 'Correcto');
                                            break;

                                            default:
                                                toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                                        }
                                    }
                                })
                                .done(function() {
                                    $('#loadingHeader').css('display','none');
                                    $('#btnUpdateModalCerrarOC').css('display','');
                                    $('#loadingUpdateModalCerrarOC').css('display','none');
                                    $("#btnUpdateModalGuardarOC").css('display','');
                                    $("#loadingUpdateModalGuardarOC").css('display','none');
                                    $("#btnUpdateModalCalcularOC").css('display','');
                                    $("#loadingUpdateModalCalcularOC").css('display','none');
                                })
                                .fail(function(jqXHR, textStatus, errorThrown) {
                                    $('#loadingHeader').css('display','none');
                                    $('#btnUpdateModalCerrarOC').css('display','');
                                    $('#loadingUpdateModalCerrarOC').css('display','none');
                                    $("#btnUpdateModalGuardarOC").css('display','');
                                    $("#loadingUpdateModalGuardarOC").css('display','none');
                                    $("#btnUpdateModalCalcularOC").css('display','');
                                    $("#loadingUpdateModalCalcularOC").css('display','none');
                                    $("#modalErrorConexion").modal("show");
                                })
                                .always(function() {
                                });
                            }
                        });
                    }
                    else{
                        toastr.warning('No es posible generar una orden de compra con total en 0.', 'Advertencia');
                    }
                }
                else{
                    toastr.warning('Para continuar es necesario calcular.', 'Advertencia');  
                }
            }
            else{
                toastr.warning('Seleccione una proveedor.', 'Advertencia');
            }
        }
        else{
            toastr.warning('Seleccione una Orden de Compra.', 'Advertencia');
        }
    });

    /// Acción Cancelar Orden ///
    $("#btnEliminarOrden").click(function (e) { 
        if (tableFetchOrdenCompra != null) {
            if (tableFetchOrdenCompra.childNodes[8].childNodes[0].innerHTML != 'Cancelado') {
                if (tableFetchOrdenCompra.childNodes[8].childNodes[0].innerHTML != 'Aceptada' && tableFetchOrdenCompra.childNodes[8].childNodes[0].innerHTML != 'Generada') {
                    swal({
                        title: "¿Esta seguro que desea cancelar la orden de pago?",
                        text: "Una vez cancelada la orden de compra, no sera posible continuar con la compra",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                        // Acción Ajax //
                        let formData = new FormData();
                        formData.append("idOC", tableFetchOrdenCompra.childNodes[0].innerHTML);

                        $.ajax({
                            url: dir + 'index.php/Controller_Compras/DeleteOC',
                            type: 'POST',
                            processData: false,
                            contentType: false,
                            timeout: 800000,
                            data: formData,
                            beforeSend : function ()
                            {
                                    $('#loadingHeader').css('display','');
                                    $('#btnAgregarOrden').css('display','none');
                                    $('#loadingAgregarOrden').css('display','');
                                    $('#btnEditarOrden').css('display','none');
                                    $('#loadingEditarOrden').css('display','');
                                    $('#btnEliminarOrden').css('display','none');
                                    $('#loadingEliminarOrden').css('display','');
                                    $('#btnGenerarCompraOC').css('display','none');
                                    $('#loadingGenerarCompra').css('display','');
                                    $('#btnGenerarAnticipo').css('display','none');
                                    $('#loadingGenerarAnticipo').css('display','');
                            },
                            success: function(data)
                            {
                                //console.log(data);
                                switch(parseInt(data.trim())){

                                    case 0:
                                        toastr.error('Ocurrio un error al cancelar la orden de compra', 'Error');
                                    break;

                                    case 1:
                                        Limpiar(5);
                                        toastr.success('Orden de Compra cancelada con exito', 'Correcto');
                                    break;

                                    case 2:
                                        toastr.error('La orden de compra ya fue generada', 'Error');
                                    break;

                                    default:
                                        toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                                }
                            }
                        })
                        .done(function() {
                                $('#loadingHeader').css('display','none');
                                $('#btnAgregarOrden').css('display','');
                                $('#loadingAgregarOrden').css('display','none');
                                $('#btnEditarOrden').css('display','');
                                $('#loadingEditarOrden').css('display','none');
                                $('#btnEliminarOrden').css('display','');
                                $('#loadingEliminarOrden').css('display','none');
                                $('#btnGenerarCompraOC').css('display','');
                                $('#loadingGenerarCompra').css('display','none');
                                $('#btnGenerarAnticipo').css('display','');
                                $('#loadingGenerarAnticipo').css('display','none');
                        })
                        .fail(function(jqXHR, textStatus, errorThrown) {
                                $('#loadingHeader').css('display','none');
                                $('#btnAgregarOrden').css('display','');
                                $('#loadingAgregarOrden').css('display','none');
                                $('#btnEditarOrden').css('display','');
                                $('#loadingEditarOrden').css('display','none');
                                $('#btnEliminarOrden').css('display','');
                                $('#loadingEliminarOrden').css('display','none');
                                $('#btnGenerarCompraOC').css('display','');
                                $('#loadingGenerarCompra').css('display','none');
                                $('#btnGenerarAnticipo').css('display','');
                                $('#loadingGenerarAnticipo').css('display','none');
                                $("#modalErrorConexion").modal("show");
                        })
                        .always(function() {
                        });
                        }
                    });
                }else{
                toastr.warning('La orden de compra ya tiene una o más compras asignadas.', 'Advertencia');
                }
            }
            else{
                toastr.warning('La orden de compra se encuentra como cancelado.', 'Advertencia');
            }
        }
        else{
            toastr.warning('Seleccione una Orden de Compra.', 'Advertencia');
        }
    });










































































    ///////////////////////////////////
    ///// Acción Generar Compra ///////
    $("#btnGenerarCompraOC").click(function (e) { 
        console.log(tableFetchOrdenCompra.childNodes[3].childNodes[1].innerHTML);
        if (tableFetchOrdenCompra != null) {
            if (tableFetchOrdenCompra.childNodes[8].childNodes[0].innerHTML == 'Generada' || tableFetchOrdenCompra.childNodes[8].childNodes[0].innerHTML == 'Aceptada') {

                let formData = new FormData();
                formData.append("idOC", tableFetchOrdenCompra.childNodes[0].innerHTML);

                $.ajax({
                    url: window.dir + 'index.php/Controller_Compras/getDetalleOrdenCompraRestante',
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    timeout: 800000,
                    data: formData,
                    beforeSend : function (){
                        $('#Cargando_Parcial').css('display','');
                        $('#loadingHeader').css('display','');
                        $('#btnAgregarOrden').css('display','none');
                        $('#loadingAgregarOrden').css('display','');
                        $('#btnEditarOrden').css('display','none');
                        $('#loadingEditarOrden').css('display','');
                        $('#btnEliminarOrden').css('display','none');
                        $('#loadingEliminarOrden').css('display','');
                        $('#btnGenerarCompraOC').css('display','none');
                        $('#loadingGenerarCompra').css('display','');
                        $('#btnGenerarAnticipo').css('display','none');
                        $('#loadingGenerarAnticipo').css('display','');
                    },
                    success: function(data){
                        console.log(data);

                        let parsed = JSON.parse(data);
                        let { OC, Info } = parsed;
                        let { ID, Fecha, Cliente, Proveedor, Cantidad_productos, Referencia } = Info[0];

                        document.querySelector("#txtIdOCG").innerHTML = ID;
                        document.querySelector("#txtClienteG").innerHTML = Cliente;
                        document.querySelector("#txtFechaG").innerHTML = Fecha;
                        document.querySelector("#txtProveedorG").innerHTML = Proveedor;
                        document.querySelector("#txtCantidadG").innerHTML = Cantidad_productos;
                        document.querySelector("#txtReferenciaG").innerHTML = Referencia;

                        let table = document.getElementById("tableParcialOC"); 
                        let tbody = table.tBodies[0];

                        $('#tableParcialOC').DataTable().destroy();
                        table.tBodies[0].innerHTML = "";

                        if (parsed != null && parsed != ""){
                            for (var i = 0; i < OC.length; i++){
                                let row  = tbody.insertRow(i);
                                let cel1 = row.insertCell(0);
                                let cel2 = row.insertCell(1);
                                let cel3 = row.insertCell(2);
                                let cel4 = row.insertCell(3);
                                let cel5 = row.insertCell(4);
                                let cel6 = row.insertCell(5);
                                let cel7 = row.insertCell(6);

                                cel1.innerHTML = OC[i]['ID'];
                                cel2.innerHTML = OC[i]['Producto'];
                                cel3.innerHTML = OC[i]['Cantidad'];
                                cel4.innerHTML = parseFloat(OC[i]['Precio_unitario']).toFixed(2);
                                cel5.innerHTML = parseFloat(OC[i]['Importe']).toFixed(2);
                                cel6.innerHTML = OC[i]['Restantes'];

                                let input = document.createElement('input');
                                input.min = 0;
                                input.max = parseInt(OC[i]['Restantes']);
                                input.type = 'number';
                                input.value = parseInt(OC[i]['Restantes']);
                                input.classList.add('form-control');
                                input.addEventListener('change', (e) => changeValue(e))
                                cel7.appendChild(input);
                            }

                            fetch("tableParcialOC");
                        }
                    }
                })
                .done(function() {
                    $('#Cargando_Parcial').css('display','none');
                    $('#loadingHeader').css('display','none');
                    $('#btnAgregarOrden').css('display','');
                    $('#loadingAgregarOrden').css('display','none');
                    $('#btnEditarOrden').css('display','');
                    $('#loadingEditarOrden').css('display','none');
                    $('#btnEliminarOrden').css('display','');
                    $('#loadingEliminarOrden').css('display','none');
                    $('#btnGenerarCompraOC').css('display','');
                    $('#loadingGenerarCompra').css('display','none');
                    $('#btnGenerarAnticipo').css('display','');
                    $('#loadingGenerarAnticipo').css('display','none');
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    $('#Cargando_Parcial').css('display','none');
                    $('#loadingHeader').css('display','none');
                    $('#btnAgregarOrden').css('display','');
                    $('#loadingAgregarOrden').css('display','none');
                    $('#btnEditarOrden').css('display','');
                    $('#loadingEditarOrden').css('display','none');
                    $('#btnEliminarOrden').css('display','');
                    $('#loadingEliminarOrden').css('display','none');
                    $('#btnGenerarCompraOC').css('display','');
                    $('#loadingGenerarCompra').css('display','none');
                    $('#btnGenerarAnticipo').css('display','');
                    $('#loadingGenerarAnticipo').css('display','none');
                    $("#modalErrorConexion").modal("show");
                })
                .always(function() {
                    $('#Cargando_Parcial').css('display','none');
                });
                $("#modalGenerarOC").modal("show");
            }
            else{
                toastr.info('Para generar la compra es necesario que la orden de compra este generada.', 'Importante');
            }
        }
        else{
            toastr.warning('Seleccione una Orden de Compra.', 'Advertencia');
        }
                
        
        // console.log(tableFetchOrdenCompra.childNodes[3].childNodes[1].innerHTML);
        // if (tableFetchOrdenCompra != null) {
        //     if (tableFetchOrdenCompra.childNodes[8].childNodes[0].innerHTML == 'Generada') {
        //         if (tableFetchOrdenCompra.childNodes[3].childNodes[1].innerHTML == '') {
        //             swal({
        //                 title: "¿Esta seguro que desea generar la compra?",
        //                 text: "Una vez generada no sera posible modificarla",
        //                 icon: "warning",
        //                 buttons: true,
        //                 dangerMode: true,
        //             })
        //             .then((willDelete) => {
        //                 if (willDelete) {
                          
        //                     // Acción Ajax //
        //                     let formData = new FormData();
        //                     formData.append("idOC", tableFetchOrdenCompra.childNodes[0].innerHTML);

        //                     $.ajax({
        //                         url: window.dir + 'index.php/Controller_Compras/generarCompra',
        //                         type: 'POST',
        //                         processData: false,
        //                         contentType: false,
        //                         timeout: 800000,
        //                         data: formData,
        //                         beforeSend : function ()
        //                         {
        //                             $('#loadingHeader').css('display','');
        //                             $('#btnAgregarOrden').css('display','none');
        //                             $('#loadingAgregarOrden').css('display','');
        //                             $('#btnEditarOrden').css('display','none');
        //                             $('#loadingEditarOrden').css('display','');
        //                             $('#btnEliminarOrden').css('display','none');
        //                             $('#loadingEliminarOrden').css('display','');
        //                             $('#btnGenerarCompraOC').css('display','none');
        //                             $('#loadingGenerarCompra').css('display','');
        //                             $('#btnGenerarAnticipo').css('display','none');
        //                             $('#loadingGenerarAnticipo').css('display','');
        //                         },
        //                         success: function(data)
        //                         {
        //                             //console.log(data);
        //                             switch(parseInt(data.trim())){

        //                                 case 0:
        //                                     toastr.error('Ocurrio un error al generar la compra', 'Error');
        //                                 break;

        //                                 case 1:
        //                                     Limpiar(6);
        //                                     toastr.success('Compra generada con exito', 'Correcto');
        //                                 break;

        //                                 default:
        //                                     toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
        //                             }
        //                         }
        //                     })
        //                     .done(function() {
        //                         $('#loadingHeader').css('display','none');
        //                         $('#btnAgregarOrden').css('display','');
        //                         $('#loadingAgregarOrden').css('display','none');
        //                         $('#btnEditarOrden').css('display','');
        //                         $('#loadingEditarOrden').css('display','none');
        //                         $('#btnEliminarOrden').css('display','');
        //                         $('#loadingEliminarOrden').css('display','none');
        //                         $('#btnGenerarCompraOC').css('display','');
        //                         $('#loadingGenerarCompra').css('display','none');
        //                         $('#btnGenerarAnticipo').css('display','');
        //                         $('#loadingGenerarAnticipo').css('display','none');
        //                     })
        //                     .fail(function(jqXHR, textStatus, errorThrown) {
        //                         $('#loadingHeader').css('display','none');
        //                         $('#btnAgregarOrden').css('display','');
        //                         $('#loadingAgregarOrden').css('display','none');
        //                         $('#btnEditarOrden').css('display','');
        //                         $('#loadingEditarOrden').css('display','none');
        //                         $('#btnEliminarOrden').css('display','');
        //                         $('#loadingEliminarOrden').css('display','none');
        //                         $('#btnGenerarCompraOC').css('display','');
        //                         $('#loadingGenerarCompra').css('display','none');
        //                         $('#btnGenerarAnticipo').css('display','');
        //                         $('#loadingGenerarAnticipo').css('display','none');
        //                         $("#modalErrorConexion").modal("show");
        //                     })
        //                     .always(function() {
        //                     });
        //                 }
        //             });
        //         }
        //         else{
        //             toastr.info('La orden de compra ya tiene asignada una compra.', 'Importante');
        //         }
        //     }
        //     else{
        //         toastr.info('Para generar la compra es necesario que la orden de compra este generada.', 'Importante');
        //     }
        // }
        // else{
        //     toastr.warning('Seleccione una Orden de Compra.', 'Advertencia');
        // }
    });



























    //////////////////////////////////////
    //// Acción Generar Anticipo ////////
    $("#btnGenerarAnticipo").click(function (e) { 
        if (tableFetchOrdenCompra != null) {
            if (tableFetchOrdenCompra.childNodes[8].childNodes[0].innerHTML != 'Cancelada') {

                // Acción Ajax //
                let formData = new FormData();
                formData.append("idOC", tableFetchOrdenCompra.childNodes[0].innerHTML);

                $.ajax({
                    url: window.dir + 'index.php/Controller_Compras/getInfoAnticipos',
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    timeout: 800000,
                    data: formData,
                    beforeSend : function ()
                    {
                        $('#loadingHeader').css('display','');
                        $('#btnAgregarOrden').css('display','none');
                        $('#loadingAgregarOrden').css('display','');
                        $('#btnEditarOrden').css('display','none');
                        $('#loadingEditarOrden').css('display','');
                        $('#btnEliminarOrden').css('display','none');
                        $('#loadingEliminarOrden').css('display','');
                        $('#btnGenerarCompraOC').css('display','none');
                        $('#loadingGenerarCompra').css('display','');
                        $('#btnGenerarAnticipo').css('display','none');
                        $('#loadingGenerarAnticipo').css('display','');
                    },
                    success: function(data)
                    {
                        console.log(data);
                        let parsed = JSON.parse(data);
                        console.log(parsed);
                        
                        if (parsed != null) {
                            $("#idOCAnticipo").text(parsed['Orden'][0]['ID']);
                            $("#bodegaAnticipo").text(parsed['Orden'][0]['Sucursal']);
                            $("#fechaAnticipo").text(parsed['Orden'][0]['Fecha']);
                            $("#usuarioAnticipo").text(parsed['Orden'][0]['Usuario']);
                            $("#proveedorAnticipo").text(parsed['Orden'][0]['Proveedor']);
                            $("#cantidadAnticipo").text(parsed['Orden'][0]['Cantidad_productos']);
                            $("#montoAnticipo").text(parsed['Orden'][0]['Monto']);
                            $("#statusAnticipo").text(parsed['Orden'][0]['Status']);
                        }
                        $('#fetchAnticipos').DataTable().destroy();
                        document.getElementById("fetchAnticipos").tBodies[0].innerHTML = "";
                        fetchAnticipos(parsed['Orden'][0]['ID']);
                        
                        $("#modalAddAnticipos").modal("show");
                    }
                })
                .done(function() {
                    $('#loadingHeader').css('display','none');
                    $('#btnAgregarOrden').css('display','');
                    $('#loadingAgregarOrden').css('display','none');
                    $('#btnEditarOrden').css('display','');
                    $('#loadingEditarOrden').css('display','none');
                    $('#btnEliminarOrden').css('display','');
                    $('#loadingEliminarOrden').css('display','none');
                    $('#btnGenerarCompraOC').css('display','');
                    $('#loadingGenerarCompra').css('display','none');
                    $('#btnGenerarAnticipo').css('display','');
                    $('#loadingGenerarAnticipo').css('display','none');
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    $('#loadingHeader').css('display','none');
                    $('#btnAgregarOrden').css('display','');
                    $('#loadingAgregarOrden').css('display','none');
                    $('#btnEditarOrden').css('display','');
                    $('#loadingEditarOrden').css('display','none');
                    $('#btnEliminarOrden').css('display','');
                    $('#loadingEliminarOrden').css('display','none');
                    $('#btnGenerarCompraOC').css('display','');
                    $('#loadingGenerarCompra').css('display','none');
                    $('#btnGenerarAnticipo').css('display','');
                    $('#loadingGenerarAnticipo').css('display','none');
                    $("#modalErrorConexion").modal("show");
                })
                .always(function() {
                });
            }
            else{
                toastr.info('Para generar un anticipo la orden de pago no debe de estar como cancelada.', 'Importante');
            }
        }
        else{
            toastr.warning('Seleccione una Orden de Compra.', 'Advertencia');
        }
    });

    //////////////////////////////////////
    //// Acción Abrir Modal Anticipo /////
    $("#btnAgregarAnticipo").click(function (e) { 
        $("#modalAddAnticipo").modal("show");
    });

    //////////////////////////////////////
    //// Acción Guardar Anticipo ////////
    $("#btnAddAnticipo").click(function (e) { 
        let Monto = $("#txtMontoAnticipo").val();
        let Forma = $("#selectFormaPago").val();
        let Obser = $("#txtObservacionesAnticipo").val();
        let User  = $("#ID_Usuario").text();

        if (Monto != "" && Forma != "" && Obser != "") {
            // Acción Ajax //
            let formData = new FormData();
            formData.append("idOC", tableFetchOrdenCompra.childNodes[0].innerHTML);
            formData.append("idUsuario_registro", User);
            formData.append("Monto", Monto);
            formData.append("Forma_pago", Forma);
            formData.append("Observaciones", Obser);
            formData.append("Status", 'Pagado');

            $.ajax({
                url: window.dir + 'index.php/Controller_Compras/generarAnticipo',
                type: 'POST',
                processData: false,
                contentType: false,
                timeout: 800000,
                data: formData,
                beforeSend : function ()
                {
                    $('#loadingHeader').css('display','');
                    $('#btnCerrarAddAnticipo').css('display','none');
                    $('#loadingCerrarAddAnticipo').css('display','');
                    $('#btnAddAnticipo').css('display','none');
                    $('#loadingAddAnticipo').css('display','');
                },
                success: function(data)
                {
                    console.log(data);
                    switch(parseInt(data.trim())){

                        case 0:
                            toastr.error('Ocurrio un error al generar el anticipo', 'Error');
                        break;

                        case 1:
                            Limpiar(7);
                            toastr.success('Anticipo generado con exito', 'Correcto');
                        break;

                        default:
                            toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                    }
                }
            })
            .done(function() {
                $('#loadingHeader').css('display','none');
                $('#btnCerrarAddAnticipo').css('display','');
                $('#loadingCerrarAddAnticipo').css('display','none');
                $('#btnAddAnticipo').css('display','');
                $('#loadingAddAnticipo').css('display','none');
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                $('#loadingHeader').css('display','none');
                $('#btnCerrarAddAnticipo').css('display','');
                $('#loadingCerrarAddAnticipo').css('display','none');
                $('#btnAddAnticipo').css('display','');
                $('#loadingAddAnticipo').css('display','none');
                $("#modalErrorConexion").modal("show");
            })
            .always(function() {
            });
        }
        else{
            toastr.warning('Algúnos campos obligatorios estan vacios.', 'Advertencia');
        }
    });

    // Obtener fila de la tabla Compras al dar click //
    document.getElementById("fetchAnticipos").onclick = function(e)
    {
        tableFetchAnticipo = e.target.parentNode;

        let formData = new FormData();
        formData.append("id", tableFetchAnticipo.childNodes[0].innerHTML);

        $.ajax({
            url: window.dir + 'index.php/Controller_Compras/getFacturasAnticipoByidAnticipo',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 800000,
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnAgregarAnticipo').css('display','none');
                $('#loadingAgregarAnticipo').css('display','');
                $('#btnEditarAnticipo').css('display','none');
                $('#loadingEditarAnticipo').css('display','');
                $('#btnEliminarAnticipo').css('display','none');
                $('#loadingEliminarAnticipo').css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);

                let table = document.getElementById("fetchFacturaTemp"); 
                let tbody = table.tBodies[0];

                $('#fetchFacturaTemp').DataTable().destroy();
                table.tBodies[0].innerHTML = "";

                if (parsed != null && parsed != ""){

                    for (var i = 0; i < parsed.length; i++){

                        let row  = tbody.insertRow(i);
                        let cel1 = row.insertCell(0);
                        let cel2 = row.insertCell(1);
                        let cel3 = row.insertCell(2);
                        let cel4 = row.insertCell(3);
                        let cel5 = row.insertCell(4);
                        let cel6 = row.insertCell(5);
                        let cel7 = row.insertCell(6);

                        cel1.innerHTML = parsed[i]['ID'];
                        cel2.innerHTML = parsed[i]['Fecha_Guardado'];
                        cel3.innerHTML = parsed[i]['Receptor'];
                        cel4.innerHTML = parsed[i]['Receptor_RFC'];
                        cel5.innerHTML = parseFloat(parsed[i]['Subtotal']).toFixed(2);
                        cel6.innerHTML = parseFloat(parsed[i]['Total']).toFixed(2);
                        cel7.innerHTML = parsed[i]['Status'];
                    }

                    fetch("fetchFacturaTemp");
                }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnAgregarAnticipo').css('display','');
            $('#loadingAgregarAnticipo').css('display','none');
            $('#btnEditarAnticipo').css('display','');
            $('#loadingEditarAnticipo').css('display','none');
            $('#btnEliminarAnticipo').css('display','');
            $('#loadingEliminarAnticipo').css('display','none');
        })
         .fail(function(jqXHR, textStatus, errorThrown) {
            $('#loadingHeader').css('display','none');
            $('#btnAgregarAnticipo').css('display','');
            $('#loadingAgregarAnticipo').css('display','none');
            $('#btnEditarAnticipo').css('display','');
            $('#loadingEditarAnticipo').css('display','none');
            $('#btnEliminarAnticipo').css('display','');
            $('#loadingEliminarAnticipo').css('display','none');
            $("#modalErrorConexion").modal("show");
        })
        .always(function() {
        });
    }

    ////////////////////////////////////////////
    //// Acción Abrir Modal Editar Anticipo ///
    $("#btnEditarAnticipo").click(function (e) { 
        if (tableFetchAnticipo != null) {
            $("#txtMontoAnticipoUpdate").val(tableFetchAnticipo.childNodes[3].innerHTML);
            $("#selectFormaPagoUpdate").val(tableFetchAnticipo.childNodes[4].innerHTML);
            $("#txtObservacionesAnticipoUpdate").val(tableFetchAnticipo.childNodes[5].innerHTML);
            (tableFetchAnticipo.childNodes[6].childNodes[0].innerHTML == 'Cancelado') ? $("#checkStatusAnticipo").prop('checked', true) : $("#checkStatusAnticipo").prop('checked', false);   
            $("#modalUpdateAnticipo").modal("show");
        }
        else{
            toastr.warning('Seleccione un anticipo.', 'Advertencia');
        }
    });

    ////////////////////////////////////////////
    ///// Acción Guardar Cambios Anticipos /////
    $("#btnUpdateAnticipo").click(function (e) { 
        let Monto = $("#txtMontoAnticipoUpdate").val();
        let Forma = $("#selectFormaPagoUpdate").val();
        let Obser = $("#txtObservacionesAnticipoUpdate").val();
        let User  = $("#ID_Usuario").text();
        let Status = 'Pagado';
        ($('#checkStatusAnticipo').prop('checked')) ? Status = "Cancelado" : Status = "Pagado";

        if (Monto != "" && Forma != "" && Obser != "") {
            // Acción Ajax //
            let formData = new FormData();
            formData.append("id", tableFetchAnticipo.childNodes[0].innerHTML);
            formData.append("idOC", tableFetchOrdenCompra.childNodes[0].innerHTML);
            formData.append("idUsuario_registro", User);
            formData.append("Monto", Monto);
            formData.append("Forma_pago", Forma);
            formData.append("Observaciones", Obser);
            formData.append("Status", Status);

            $.ajax({
                url: window.dir + 'index.php/Controller_Compras/UpdateAnticipo',
                type: 'POST',
                processData: false,
                contentType: false,
                timeout: 800000,
                data: formData,
                beforeSend : function ()
                {
                    $('#loadingHeader').css('display','');
                    $('#btnCerrarUpdateAnticipo').css('display','none');
                    $('#loadingCerrarUpdateAnticipo').css('display','');
                    $('#btnUpdateAnticipo').css('display','none');
                    $('#loadingUpdateAnticipo').css('display','');
                },
                success: function(data)
                {
                    console.log(data);
                    switch(parseInt(data.trim())){

                        case 0:
                            toastr.error('Ocurrio un error al guardar los cambios del anticipo', 'Error');
                        break;

                        case 1:
                            Limpiar(8);
                            toastr.success('Anticipo modificado con exito', 'Correcto');
                        break;

                        default:
                            toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                    }
                }
            })
            .done(function() {
                $('#loadingHeader').css('display','none');
                $('#btnCerrarUpdateAnticipo').css('display','');
                $('#loadingCerrarUpdateAnticipo').css('display','none');
                $('#btnUpdateAnticipo').css('display','');
                $('#loadingUpdateAnticipo').css('display','none');
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                $('#loadingHeader').css('display','none');
                $('#btnCerrarUpdateAnticipo').css('display','');
                $('#loadingCerrarUpdateAnticipo').css('display','none');
                $('#btnUpdateAnticipo').css('display','');
                $('#loadingUpdateAnticipo').css('display','none');
                $("#modalErrorConexion").modal("show");
            })
            .always(function() {
            });
        }
        else{
            toastr.warning('Algúnos campos obligatorios estan vacios.', 'Advertencia');
        }
    });

    //////////////////////////////////////
    ///// Acción Eliminar Anticipo //////
    $("#btnEliminarAnticipo").click(function (e) { 
        if (tableFetchAnticipo != null) {
            if (tableFetchAnticipo.childNodes[6].childNodes[0].innerHTML != 'Cancelado') {

                let formData = new FormData();
                formData.append("id", tableFetchAnticipo.childNodes[0].innerHTML);

                $.ajax({
                    url: window.dir + 'index.php/Controller_Compras/deleteAnticipo',
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    timeout: 800000,
                    data: formData,
                    beforeSend : function ()
                    {
                        $('#loadingHeader').css('display','');
                        $('#btnAgregarAnticipo').css('display','none');
                        $('#loadingAgregarAnticipo').css('display','');
                        $('#btnEditarAnticipo').css('display','none');
                        $('#loadingEditarAnticipo').css('display','');
                        $('#btnEliminarAnticipo').css('display','none');
                        $('#loadingEliminarAnticipo').css('display','');
                    },
                    success: function(data)
                    {
                        console.log(data);
                        switch(parseInt(data.trim())){

                            case 0:
                                toastr.error('Ocurrio un error al cancelar el anticipo', 'Error');
                            break;

                            case 1:
                                Limpiar(8);
                                toastr.success('Anticipo cancelada con exito', 'Correcto');
                            break;

                            case 2:
                                toastr.warning('El anticipo tiene facturas asignadas', 'Advertencia');
                            break;

                            default:
                                toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                        }
                    }
                })
                .done(function() {
                    $('#loadingHeader').css('display','none');
                    $('#btnAgregarAnticipo').css('display','');
                    $('#loadingAgregarAnticipo').css('display','none');
                    $('#btnEditarAnticipo').css('display','');
                    $('#loadingEditarAnticipo').css('display','none');
                    $('#btnEliminarAnticipo').css('display','');
                    $('#loadingEliminarAnticipo').css('display','none');
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    $('#loadingHeader').css('display','none');
                    $('#btnAgregarAnticipo').css('display','');
                    $('#loadingAgregarAnticipo').css('display','none');
                    $('#btnEditarAnticipo').css('display','');
                    $('#loadingEditarAnticipo').css('display','none');
                    $('#btnEliminarAnticipo').css('display','');
                    $('#loadingEliminarAnticipo').css('display','none');
                    $("#modalErrorConexion").modal("show");
                })
                .always(function() {
                });
            }
            else{
                toastr.warning('El anticipo se encuentra como cancelado.', 'Advertencia');
            }
        }
        else{
            toastr.warning('Seleccione un anticipo.', 'Advertencia');
        }
    });

    /////////////////////////////////////
    ////    Nueva Compra Module     /////
    ////////////////////////////////////

    $("#selectSucursal").change(function(event) {
    	let Bodega = $("#selectSucursal").val();

		if (Bodega != ""){

			var formData = new FormData();
			formData.append("idBodega", Bodega);

			$.ajax({
	            url: window.dir + 'index.php/Controller_Bodega/getBodegaById',
	            type: 'POST',
	            processData: false,
	            contentType: false,
	            timeout: 800000,
	            data: formData,
	            beforeSend : function ()
	            {
	                $('#loadingHeader').css('display','');
	                $('#btnCalcularCompra').css('display','none');
	                $('#loadingCalcularCompra').css('display','');
	                $("#btnGenerarCompra").css('display','none');
	                $("#loadingGenerarCompra").css('display','');
	            },
	            success: function(data)
	            { 
	                let parsed = JSON.parse(data);
	                ivaBodega = parseFloat(parsed[0]['Impuesto']) + 1;
	            }
	        })
            .done(function() {
                $('#loadingHeader').css('display','none');
                $('#btnCalcularCompra').css('display','');
	            $('#loadingCalcularCompra').css('display','none');
	            $("#btnGenerarCompra").css('display','');
	            $("#loadingGenerarCompra").css('display','none');

            })
            .fail(function(jqXHR, textStatus, errorThrown) {
            	$('#loadingHeader').css('display','none');
            	$('#btnCalcularCompra').css('display','');
	            $('#loadingCalcularCompra').css('display','none');
	            $("#btnGenerarCompra").css('display','');
	            $("#loadingGenerarCompra").css('display','none');
	            $("#modalErrorConexion").modal("show");
        	})
            .always(function() {
            });
		}
    });

    // Mostrar Total de la compra //
    $("#btnCalcularCompra").click(function(event) {
    	
    	let Sucursal = $("#selectSucursal").val();
    	let Total 	 = 0;

    	if (Sucursal != ""){

    		$('#fetchNuevaCompra').DataTable().destroy();
    		let tbody = document.querySelector("#fetchNuevaCompra").tBodies[0];

    		for (var i = 0; i < tbody.rows.length; i++) {

    			if (tbody.rows[i].childNodes[5].childNodes[0].value != 0){
    				Total += parseFloat(tbody.rows[i].childNodes[5].childNodes[0].value);
    			}
    		}

    		fetch("fetchNuevaCompra");

    		let Subtotal = parseFloat(Total / ivaBodega).toFixed(2);
			let Impuesto = parseFloat(Total - Subtotal).toFixed(2);

			$("#labelTotal").text(parseFloat(Total).toFixed(2));
			$("#labelSubtotal").text(parseFloat(Subtotal).toFixed(2));
			$("#labelImpuesto").text(parseFloat(Impuesto).toFixed(2));

			contador = 1;
			$("#btnGenerarCompra").removeAttr('disabled');
    	}
    	else{
    		toastr.warning('Seleccione una sucursal', 'Advertencia');
    	}
    });

    // Generar Compra //
    $("#btnGenerarCompra").click(function(event) {
    	
    	let Sucursal  = $("#selectSucursal").val();
    	let Proveedor = $("#selectProveedor").val();
        let Codigo    = $("#txtCodigoCompra").val();

        // Nombre Proveedor y Sucursal //
        let nameSucursal  = $("#selectSucursal option:selected").text();
        let nameProveedor = $("#selectProveedor option:selected").text();

        /// Valores Total, Subtotal y Impuestos ///
        let Subtotal  = parseFloat($("#labelSubtotal").text()).toFixed(2);
        let Impuesto  = parseFloat($("#labelImpuesto").text()).toFixed(2);
        let Total     = parseFloat($("#labelTotal").text()).toFixed(2);

    	if (Sucursal != ""){
            if (Proveedor != ""){
                if (Codigo != ""){
            		if (contador == 1){
                        if (Total > 0){
                			swal({
            				  title: "¿Esta segúro que desea generar la compra?",
            				  text: "Sucursal: " + nameSucursal + " \n   Proveedor: " + nameProveedor,
            				  icon: "warning",
            				  buttons: true,
            				  dangerMode: true,
            				})
            				.then((willDelete) => {
            				  if (willDelete) {
                                
                                $('#fetchNuevaCompra').DataTable().destroy();
                                //Tabla de Servicio Ventas //
                                let table          = document.getElementById("fetchNuevaCompra");
                                let tbody          = table.getElementsByTagName("tbody")[0];

                                let idCatalogo = new Array();
                                let Cantidad   = new Array();
                                let Costo      = new Array();
                                let Importe    = new Array();

                                for (var i = 0; i < tbody.rows.length; i++)
                                {
                                    if (parseInt(tbody.rows[i].childNodes[5].childNodes[0].value) != 0)
                                    {
                                        idCatalogo.push(tbody.rows[i].cells[0].innerHTML);
                                        Cantidad.push(tbody.rows[i].childNodes[3].childNodes[0].value);
                                        Costo.push(tbody.rows[i].childNodes[4].childNodes[0].value);
                                        Importe.push(tbody.rows[i].childNodes[5].childNodes[0].value);
                                    }
                                }

                                // Cargamos DataTable //
                                fetch("fetchNuevaCompra");

                                // Acción Ajax //
                                let formData = new FormData();
                                formData.append("idSucursal", Sucursal);
                                formData.append("idProveedor", Proveedor);
                                formData.append("Subtotal", Subtotal);
                                formData.append("Impuesto", Impuesto);
                                formData.append("Total", Total);
                                formData.append("Codigo", Codigo);
                                formData.append("idCatalogo", idCatalogo);
                                formData.append("Cantidad", Cantidad);
                                formData.append("Costo", Costo);
                                formData.append("Importe", Importe);

                                $.ajax({
                                    url: dir + 'index.php/Controller_Compras/addCompra',
                                    type: 'POST',
                                    processData: false,
                                    contentType: false,
                                    timeout: 800000,
                                    data: formData,
                                    beforeSend : function ()
                                    {
                                        $('#loadingHeader').css('display','');
                                        $('#btnCalcularCompra').css('display','none');
                                        $('#loadingCalcularCompra').css('display','');
                                        $("#btnGenerarCompra").css('display','none');
                                        $("#loadingGenerarCompra").css('display','');
                                    },
                                    success: function(data)
                                    {
                                        //console.log(data);
                                        switch(parseInt(data.trim())){

                                            case 0:
                                                toastr.error('Ocurrio un error al agregar la compra', 'Error');
                                            break;

                                            case 1:
                                                Limpiar(0);
                                                toastr.success('Compra agregada con exito', 'Correcto');
                                            break;

                                            default:
                                                toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                                        }
                                    }
                                })
                                .done(function() {
                                    $('#loadingHeader').css('display','none');
                                    $('#btnCalcularCompra').css('display','');
                                    $('#loadingCalcularCompra').css('display','none');
                                    $("#btnGenerarCompra").css('display','');
                                    $("#loadingGenerarCompra").css('display','none');
                                })
                                .fail(function(jqXHR, textStatus, errorThrown) {
                                    $('#loadingHeader').css('display','none');
                                    $('#btnCalcularCompra').css('display','');
                                    $('#loadingCalcularCompra').css('display','none');
                                    $("#btnGenerarCompra").css('display','');
                                    $("#loadingGenerarCompra").css('display','none');
                                    $("#modalErrorConexion").modal("show");
                                })
                                .always(function() {
                                    $('#Cargando_Header').css('display','none');
                                });

            				  }
            				});
                        }
                        else{
                            toastr.warning('El total de la compra debe ser mayor a 0', 'Advertencia')
                        }
            		}
            		else{
            			toastr.warning('Para continuar con la compra es necesario calcular nuevamente', 'Advertencia');
            		}
                }
                else{
                    toastr.warning('Es necesario capturar el codigo de compra', 'Advertencia');
                }
            }
            else{
                toastr.warning('Seleccione un proveedor', 'Advertencia');
            }
    	}
    	else{
    		toastr.warning('Seleccione una sucursal', 'Advertencia');
    	}
    });

    ///////////////////////////////////////////////////////////////
    /////////////////////// Compras ///////////////////////////////

    // Obtener fila de la tabla Compras al dar click //
    document.getElementById("fetchCompras").onclick = function(e)
    {
        tableCompras = e.target.parentNode;

        let formData = new FormData();
        formData.append("idCompra", tableCompras.childNodes[0].innerHTML);

        $.ajax({
            url: window.dir + 'index.php/Controller_Compras/getDetalleCompra',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 35000,
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnEliminarCompra').css('display','none');
                $('#loadingEliminarCompra').css('display','');
                $('#btnAgregarCompra').css('display','none');
                $('#loadingAgregarCompra').css('display','');
                $("#btnVerFacturas").css('display','none');
                $("#loadingVerFacturas").css('display','');
            },
            success: function(data)
            {
                let parsed = JSON.parse(data);
                //console.log(parsed);

                let table = document.getElementById("fetchDetalleCompras"); 
                let tbody = table.tBodies[0];

                $('#fetchDetalleCompras').DataTable().destroy();
                table.tBodies[0].innerHTML = "";

                if (parsed != null && parsed != ""){

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

                        cel1.innerHTML = parsed[i]['ID'];
                        cel2.innerHTML = parsed[i]['Codigo'];
                        cel3.innerHTML = parsed[i]['Producto'];
                        cel4.innerHTML = parsed[i]['Cantidad'];
                        cel5.innerHTML = parsed[i]['Costo_unitario'];
                        cel6.innerHTML = parsed[i]['Importe'];
                        cel7.innerHTML = parsed[i]['idCatalogo'];
                        cel7.setAttribute("hidden", true);
                        cel8.innerHTML = parsed[i]['idSucursal'];
                        cel8.setAttribute("hidden", true);
                        cel9.innerHTML = parsed[i]['idLocacion'];
                        cel9.setAttribute("hidden", true);
                    }

                    fetch("fetchDetalleCompras");
                }
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnEliminarCompra').css('display','');
            $('#loadingEliminarCompra').css('display','none');
            $('#btnAgregarCompra').css('display','');
            $('#loadingAgregarCompra').css('display','none');
            $("#btnVerFacturas").css('display','');
            $("#loadingVerFacturas").css('display','none');
        })
         .fail(function(jqXHR, textStatus, errorThrown) {
            $('#loadingHeader').css('display','none');
            $('#btnEliminarCompra').css('display','');
            $('#loadingEliminarCompra').css('display','none');
            $('#btnAgregarCompra').css('display','');
            $('#loadingAgregarCompra').css('display','none');
            $("#btnVerFacturas").css('display','');
            $("#loadingVerFacturas").css('display','none');
            $("#modalErrorConexion").modal("show");
        })
        .always(function() {
        });
    }


    /// Acción Eliminar Compra ///
    $("#btnEliminarCompra").click(function(event) {
        
        if (tableCompras != null){
            if (tableCompras.childNodes[8].childNodes[0].innerHTML == 'Pendiente'){

                swal({
                    title: "¿Esta segúro que desea eliminar la compra?",
                    text: "Una vez eliminada la compra no sera posible recuperarla",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete){
                        let formData = new FormData();
                        formData.append("idCompra", tableCompras.childNodes[0].innerHTML);

                        $.ajax({
                            url: window.dir + 'index.php/Controller_Compras/deleteCompra',
                            type: 'POST',
                            processData: false,  // tell jQuery not to process the data
                            contentType: false,
                            timeout: 800000,
                            //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                            data: formData,
                            beforeSend : function ()
                            {
                                $('#loadingHeader').css('display','');
                                $('#btnEliminarCompra').css('display','none');
                                $('#loadingEliminarCompra').css('display','');
                                $('#btnAgregarCompra').css('display','none');
                                $('#loadingAgregarCompra').css('display','');
                                $("#btnVerFacturas").css('display','none');
                                $("#loadingVerFacturas").css('display','');
                            },
                            success: function(data)
                            {
                                //console.log(data);
                                switch(parseInt(data.trim())){

                                    case 0:
                                        toastr.error('Ocurrio un error al eliminar la compra', 'Error');
                                    break;

                                    case 1:
                                        Limpiar(1);
                                        toastr.success('Compra eliminada con exito', 'Correcto');
                                    break;

                                    default:
                                        toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                                }
                            }
                        })
                        .done(function() {
                            $('#loadingHeader').css('display','none');
                            $('#btnEliminarCompra').css('display','');
                            $('#loadingEliminarCompra').css('display','none');
                            $('#btnAgregarCompra').css('display','');
                            $('#loadingAgregarCompra').css('display','none');
                            $("#btnVerFacturas").css('display','');
                            $("#loadingVerFacturas").css('display','none');
                        })
                        .fail(function(jqXHR, textStatus, errorThrown) {
                            $('#loadingHeader').css('display','none');
                            $('#btnEliminarCompra').css('display','');
                            $('#loadingEliminarCompra').css('display','none');
                            $('#btnAgregarCompra').css('display','');
                            $('#loadingAgregarCompra').css('display','none');
                            $("#btnVerFacturas").css('display','');
                            $("#loadingVerFacturas").css('display','none');
                            $("#modalErrorConexion").modal("show");
                        })
                        .always(function() {
                        });
                    }
                });
            }
            else{
                toastr.warning('No es posible eliminar la compra por que ya se encuentra como recibido', 'Advertencia');
            }
        }
        else{
            toastr.warning('Por favor, Seleccione una compra', 'Advertencia');
        }
    });


    ////////////////////////////////////////
    ////// Función Agregar Inventario //////

    $("#btnAgregarCompra").click(function(event) {

        if (tableCompras != null){
            if (tableCompras.childNodes[8].childNodes[0].innerHTML != 'Recibido'){

                swal({
                    title: "Esta segúro que desea agregar al inventario?",
                    text: "Una vez agregado al inventario cambiara de estatus a recibido",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {

                        $('#fetchDetalleCompras').DataTable().destroy();

                        let idCatalogo  = new Array();
                        let Cantidad    = new Array();
                        let idSucursal  = new Array();
                        let Precio      = new Array();
                        let idLocacion  = new Array();

                        //Tabla detalle compras //
                        let table  = document.getElementById("fetchDetalleCompras");
                        let tbody  = table.getElementsByTagName("tbody")[0];

                        for (var i = 0; i < tbody.rows.length; i++){
                            idCatalogo.push(tbody.rows[i].cells[6].innerHTML);
                            Cantidad.push(tbody.rows[i].cells[3].innerHTML);
                            idSucursal.push(tbody.rows[i].cells[7].innerHTML);
                            Precio.push(tbody.rows[i].cells[4].innerHTML);
                            idLocacion.push(tbody.rows[i].cells[8].innerHTML);
                        }

                        fetch("fetchDetalleCompras");
                            
                        let formData = new FormData();
                        formData.append("ID", tableCompras.childNodes[0].innerHTML);
                        formData.append("Fecha_Compra", tableCompras.childNodes[2].innerHTML);
                        formData.append("idCatalogo", idCatalogo);
                        formData.append("Cantidad", Cantidad);
                        formData.append("idSucursal", idSucursal);
                        formData.append("Precio", Precio);
                        formData.append("idLocacion", idLocacion);


                        $.ajax({
                            url: window.dir + 'index.php/Controller_Compras/addInventario',
                            type: 'POST',
                            processData: false,
                            contentType: false,
                            timeout: 800000,
                            data: formData,
                            beforeSend : function ()
                            {
                                $('#loadingHeader').css('display','');
                                $('#btnEliminarCompra').css('display','none');
                                $('#loadingEliminarCompra').css('display','');
                                $('#btnAgregarCompra').css('display','none');
                                $('#loadingAgregarCompra').css('display','');
                                $("#btnVerFacturas").css('display','none');
                                $("#loadingVerFacturas").css('display','');
                            },
                            success: function(data)
                            {
                                //console.log(data);
                                switch(parseInt(data.trim())){

                                    case 0:
                                        toastr.error('Ocurrio un error al agregar el inventario', 'Error');
                                    break;

                                    case 1:
                                        Limpiar(2);
                                        toastr.success('Inventario agregado con exito', 'Correcto');
                                    break;

                                    default:
                                        toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                                }
                            }
                        })
                        .done(function() {
                            $('#loadingHeader').css('display','none');
                            $('#btnEliminarCompra').css('display','');
                            $('#loadingEliminarCompra').css('display','none');
                            $('#btnAgregarCompra').css('display','');
                            $('#loadingAgregarCompra').css('display','none');
                            $("#btnVerFacturas").css('display','');
                            $("#loadingVerFacturas").css('display','none');
                        })
                        .fail(function(jqXHR, textStatus, errorThrown) {
                            $('#loadingHeader').css('display','none');
                            $('#btnEliminarCompra').css('display','');
                            $('#loadingEliminarCompra').css('display','none');
                            $('#btnAgregarCompra').css('display','');
                            $('#loadingAgregarCompra').css('display','none');
                            $("#btnVerFacturas").css('display','');
                            $("#loadingVerFacturas").css('display','none');
                            $("#modalErrorConexion").modal("show");
                        })
                        .always(function() {
                        });
                    }
                });
            }
            else{
                toastr.warning('No es posible agregar la compra por que ya se encuentra como recibido', 'Advertencia');
            }
        }
        else{
            toastr.warning('Por favor, Seleccione una compra', 'Advertencia');
        }
    });

    //// Acción Ver Facturas ////
    $("#btnVerFacturas").click(function (e) { 
        if (tableCompras != null) {
            let formData = new FormData();
            formData.append("ID", tableCompras.childNodes[0].innerHTML);

            $.ajax({
                url: window.dir + 'index.php/Controller_Compras/getInfoCompraById',
                type: 'POST',
                processData: false,
                contentType: false,
                timeout: 800000,
                data: formData,
                beforeSend : function ()
                {
                    $('#loadingHeader').css('display','');
                    $('#btnEliminarCompra').css('display','none');
                    $('#loadingEliminarCompra').css('display','');
                    $('#btnAgregarCompra').css('display','none');
                    $('#loadingAgregarCompra').css('display','');
                    $("#btnVerFacturas").css('display','none');
                    $("#loadingVerFacturas").css('display','');
                },
                success: function(data)
                {
                    console.log(data);
                    let parsed = JSON.parse(data);
                    console.log(parsed);
                    
                    if (parsed != null) {
                        $("#idCompra").text(parsed['Compra'][0]['ID']);
                        $("#bodegaCompra").text(parsed['Compra'][0]['Sucursal']);
                        $("#fechaCompra").text(parsed['Compra'][0]['Fecha_compra']);
                        $("#usuarioCompra").text(parsed['Compra'][0]['Usuario']);
                        $("#proveedorCompra").text(parsed['Compra'][0]['Proveedor']);
                        $("#cantidadCompra").text(parsed['Compra'][0]['Cantidad_productos']);
                        $("#montoCompra").text(parsed['Compra'][0]['Monto']);
                        $("#statusCompra").text(parsed['Compra'][0]['Status']);
                    }
                    $('#fetchFacturasCompras').DataTable().destroy();
                    document.getElementById("fetchFacturasCompras").tBodies[0].innerHTML = "";
                    fetchFacturasCompras(parsed['Compra'][0]['ID']);
                    
                    $("#modalVerFacturas").modal("show");
                }
            })
            .done(function() {
                $('#loadingHeader').css('display','none');
                $('#btnEliminarCompra').css('display','');
                $('#loadingEliminarCompra').css('display','none');
                $('#btnAgregarCompra').css('display','');
                $('#loadingAgregarCompra').css('display','none');
                $("#btnVerFacturas").css('display','');
                $("#loadingVerFacturas").css('display','none');
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                $('#loadingHeader').css('display','none');
                $('#btnEliminarCompra').css('display','');
                $('#loadingEliminarCompra').css('display','none');
                $('#btnAgregarCompra').css('display','');
                $('#loadingAgregarCompra').css('display','none');
                $("#btnVerFacturas").css('display','');
                $("#loadingVerFacturas").css('display','none');
                $("#modalErrorConexion").modal("show");
            })
            .always(function() {
            });
        }
        else{
            toastr.warning('Por favor, Seleccione una compra', 'Advertencia');
        }
    });

});

//////////////////////////////////////////////
//////////// Función Limpiar ////////////////
function Limpiar(valor) {
    switch(valor){
        case 0:
            // Limpiamos Campos //
            $("#selectProveedor").val("");
            $("#selectSucursal").val("");
            $("#txtCodigoCompra").val("");
            $("#labelSubtotal").text('0.00');
            $("#labelImpuesto").text('0.00');
            $("#labelTotal").text('0.00');
            $("#btnGenerarCompra").attr('disabled','disabled');

            // Limpiar Table Compras //
            $('#fetchCompras').DataTable().ajax.reload();

            // Limpiar Table Detalle Compra //
            $('#fetchDetalleCompras').DataTable().destroy();
            document.getElementById("fetchDetalleCompras").tBodies[0].innerHTML = "";

            // Limpiar Acción Click Table Compras //
            tableCompras = null;
            contador     = 0;

            // Cargar Table Nueva Compra //
            fetchNuevaCompra();
        break;
        case 1:

            // Limpiar Table Compras //
            $('#fetchCompras').DataTable().ajax.reload();

            // Limpiar Table Detalle Compra //
            $('#fetchDetalleCompras').DataTable().destroy();
            document.getElementById("fetchDetalleCompras").tBodies[0].innerHTML = "";

            // Limpiar Acción Click Table Compras //
            tableCompras = null;
        break;
        case 2:
            // Limpiar Table Compras //
            $('#fetchCompras').DataTable().ajax.reload();

            // Limpiar Table Detalle Compra //
            $('#fetchDetalleCompras').DataTable().destroy();
            document.getElementById("fetchDetalleCompras").tBodies[0].innerHTML = "";

            // Limpiar Acción Click Table Compras //
            tableCompras = null;
        break;

        case 3:
            $("#CantidadOC").text("0");
            $("#TotalOC").text("0.00");
            // Contador Cambios //
            contadorOC = 0;
            $("#btnModalCalcularOC").removeAttr('disabled');
            $("#btnModalGuardarOC").attr('disabled','disabled');
            $("#selectProveedor").val("");
            $("#modalAddOrdenesCompra").modal("hide");

            $('#fetchOrdenCompra').DataTable().ajax.reload();

            // Limpiar Table Detalle Orden de Compra //
            $('#fetchDetalleOrdenCompra').DataTable().destroy();
            document.getElementById("fetchDetalleOrdenCompra").tBodies[0].innerHTML = "";
            tableFetchOrdenCompra = null;
        break;

        case 4:
            $("#CantidadOCUpdate").text("0");
            $("#TotalOCUpdate").text("0.00");
            // Contador Cambios //
            contadorOCUpdate = 0;
            $("#btnUpdateModalCalcularOC").removeAttr('disabled');
            $("#btnUpdateModalGuardarOC").attr('disabled','disabled');
            $("#selectProveedorOCUpdate").val("");

            $('#fetchOrdenCompra').DataTable().ajax.reload();

            // Limpiar Table Detalle Orden de Compra //
            $('#fetchDetalleOrdenCompra').DataTable().destroy();
            document.getElementById("fetchDetalleOrdenCompra").tBodies[0].innerHTML = "";
            tableFetchOrdenCompra = null;
            $("#modalUpdateOrdenesCompra").modal('hide');
            $("#modalUpdateOrdenesCompraStatus").modal('hide');
        break;

        case 5:
            $('#fetchOrdenCompra').DataTable().ajax.reload();
            // Limpiar Table Detalle Orden de Compra //
            $('#fetchDetalleOrdenCompra').DataTable().destroy();
            document.getElementById("fetchDetalleOrdenCompra").tBodies[0].innerHTML = "";
            tableFetchOrdenCompra = null;
        break;

        case 6:
            $('#fetchOrdenCompra').DataTable().ajax.reload();
            // Limpiar Table Detalle Orden de Compra //
            $('#fetchDetalleOrdenCompra').DataTable().destroy();
            document.getElementById("fetchDetalleOrdenCompra").tBodies[0].innerHTML = "";
            $('#tableParcialOC').DataTable().destroy();
            document.getElementById("tableParcialOC").tBodies[0].innerHTML = "";
            tableFetchOrdenCompra = null;

            $("#modalGenerarOC").modal("hide");
        break;

        case 7:
            $('#fetchAnticipos').DataTable().destroy();
            document.getElementById("fetchAnticipos").tBodies[0].innerHTML = "";
            // Limpiar Table Detalle Orden de Compra //
            $('#fetchFacturaTemp').DataTable().destroy();
            document.getElementById("fetchFacturaTemp").tBodies[0].innerHTML = "";
            tableFetchAnticipo = null;
            $("#modalAddAnticipo").modal("hide");
            $("#txtMontoAnticipo").val("");
            $("#selectFormaPago").val("Efectivo");
            $("#txtObservacionesAnticipo").val("");
            fetchAnticipos($("#idOCAnticipo").text());
        break;

        case 8:
            $('#fetchAnticipos').DataTable().destroy();
            document.getElementById("fetchAnticipos").tBodies[0].innerHTML = "";
            // Limpiar Table Detalle Orden de Compra //
            $('#fetchFacturaTemp').DataTable().destroy();
            document.getElementById("fetchFacturaTemp").tBodies[0].innerHTML = "";
            tableFetchAnticipo = null;
            $("#modalUpdateAnticipo").modal("hide");
            $("#txtMontoAnticipoUpdate").val("");
            $("#selectFormaPagoUpdate").val("Efectivo");
            $("#txtObservacionesAnticipoUpdate").val("");
            fetchAnticipos($("#idOCAnticipo").text());
        break;
    }
}

//////////////////////////////////////////////
/// Acciones keyup keypress change keydown ///

var calcularFetchNuevaCompra = function(event){

	let row = this.parentNode.parentNode;
    // Obtener Importe Cantidad * Precio //
    let Importe = parseFloat(row.childNodes[3].childNodes[0].value) * parseFloat(row.childNodes[4].childNodes[0].value);
    // Imprimir Importe //
    row.childNodes[5].childNodes[0].value = Importe;

    if (contador == 1){
    	// Contador Cambios //
		contador = 0;
		$("#btnGenerarCompra").attr('disabled', 'disabled');
		// Alert Recalcular //
		toastr.info('Es necesario recalcular nuevamnete', 'Importante');
    }
    else{
    	// Contador Cambios //
		contador = 0;
		$("#btnGenerarCompra").attr('disabled', 'disabled');
    }   	
};

/////////////////////////////////////////////////////
//// Accione keyup keypress change keydown /////////

var calcularFetchEditarOrdenCompra = function(event){
    let row = this.parentNode.parentNode;
    // Obtener Importe Cantidad * Precio //
    let Importe = parseFloat(row.childNodes[3].childNodes[0].value) * parseFloat(row.childNodes[4].childNodes[0].value);
    // Imprimir Importe //
    row.childNodes[5].childNodes[0].value = Importe;

    if (contadorOCUpdate == 1){
    	// Contador Cambios //
		contadorOCUpdate = 0;
		$("#btnUpdateModalCalcularOC").attr('disabled','disabled');
        $("#btnUpdateModalGuardarOC").removeAttr('disabled');
		// Alert Recalcular //
		toastr.info('Es necesario recalcular nuevamnete', 'Importante');
    }
    else{
    	// Contador Cambios //
		contadorOCUpdate = 0;
		$("#btnUpdateModalCalcularOC").removeAttr('disabled');
        $("#btnUpdateModalGuardarOC").attr('disabled','disabled');
    }
};

//////////////////////////////////////////////
/// Acciones keyup keypress change keydown ///

var calcularFetchNuevaOrdenCompra = function(event){

    let row = this.parentNode.parentNode;

    // Obtener Importe Cantidad * Precio //
    let Importe = parseFloat(row.childNodes[3].childNodes[0].value) * parseFloat(row.childNodes[4].childNodes[0].value);
    // Imprimir Importe //
    row.childNodes[5].childNodes[0].value = Importe;

    if (contadorOC == 1){
    	// Contador Cambios //
		contadorOC = 0;
        $("#btnModalCalcularOC").attr('disabled','disabled');
        $("#btnModalGuardarOC").removeAttr('disabled');
		// Alert Recalcular //
		toastr.info('Es necesario calcular nuevamnete.', 'Importante');
    }
    else{
    	// Contador Cambios //
        contadorOC = 0;
        $("#btnModalCalcularOC").removeAttr('disabled');
        $("#btnModalGuardarOC").attr('disabled','disabled');
    }   	
};

/////////////////////////////////////////////////
///////// Acción Calcular Valores //////////////
function CalcularOC(){

    $('#fetchNuevaOrdenCompra').DataTable().destroy();
    let table = document.getElementById("fetchNuevaOrdenCompra"); 
    let tbody = table.tBodies[0];
    let CantOC  = 0;
    let TotalOC = 0;

    for (var i = 0; i < tbody.rows.length; i++){
        if(tbody.rows[i].cells[3].childNodes[0].value != 0){

            console.log(tbody.rows[i].cells[3].childNodes[0].value );

            CantOC += parseInt(tbody.rows[i].cells[3].childNodes[0].value);
            TotalOC += parseFloat(tbody.rows[i].cells[3].childNodes[0].value) * parseFloat(tbody.rows[i].cells[4].childNodes[0].value);
        }
    }

    contadorOC = 1;
    fetch("fetchNuevaOrdenCompra");
    $("#btnModalCalcularOC").attr('disabled','disabled');
    $("#btnModalGuardarOC").removeAttr('disabled');

    $("#CantidadOC").text(CantOC);
    $("#TotalOC").text(TotalOC); 

    toastr.info('Orden de compra calculada', 'Información');
}

/////////////////////////////////////////////////
///////// Acción Calcular Valores //////////////
function CalcularOCUpdate(){

    $('#fetchEditarOrdenCompra').DataTable().destroy();
    let table = document.getElementById("fetchEditarOrdenCompra"); 
    let tbody = table.tBodies[0];
    let CantOC  = 0;
    let TotalOC = 0;

    for (var i = 0; i < tbody.rows.length; i++){
        if(tbody.rows[i].cells[5].childNodes[0].value != 0){
            CantOC += parseInt(tbody.rows[i].cells[3].childNodes[0].value);
            TotalOC += parseFloat(tbody.rows[i].cells[3].childNodes[0].value) * parseFloat(tbody.rows[i].cells[4].childNodes[0].value);
        }
    }

    contadorOCUpdate = 1;
    fetch("fetchEditarOrdenCompra");
    $("#btnUpdateModalCalcularOC").attr('disabled','disabled');
    $("#btnUpdateModalGuardarOC").removeAttr('disabled');

    $("#CantidadOCUpdate").text(CantOC);
    $("#TotalOCUpdate").text(TotalOC); 

    toastr.info('Orden de compra calculada', 'Información');
}

// Cargar DataTable Nueva Compra //
function fetchNuevaCompra(){

  	$.ajax({
		url: window.dir + 'index.php/Controller_Compras/fetchNuevaCompra',
		type: 'POST',
		processData: false,
        contentType: false,
        timeout: 800000,
        beforeSend : function ()
        {
          	$('#loadingHeader').css('display','none');
            $('#btnCalcularCompra').css('display','');
            $('#loadingCalcularCompra').css('display','none');
            $("#btnGenerarCompraOC").css('display','');
            $("#loadingGenerarCompra").css('display','none');
        },
        success: function(data)
        {
        	let parsed = JSON.parse(data);
        	let table = document.getElementById("fetchNuevaCompra"); 
    		let tbody = table.tBodies[0];
    			
    		$('#fetchNuevaCompra').DataTable().destroy();
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
                cel2.innerHTML = parsed[i]['Codigo'];
                cel3.innerHTML = parsed[i]['Producto'];

                let input = document.createElement("input");
		        input.classList.add('form-control');
		        input.setAttribute('type', 'number');
		        input.setAttribute('value', '0');
		        input.setAttribute('min', '0');
		        input.addEventListener("keyup",calcularFetchNuevaCompra);
		        cel4.appendChild(input);

                let input2 = document.createElement("input");
                input2.classList.add('form-control');
                input2.setAttribute('type', 'number');
                input2.setAttribute('value', '0');
                input2.setAttribute('min', '0');
                input2.addEventListener("keyup",calcularFetchNuevaCompra);
                cel5.appendChild(input2);

                let input3 = document.createElement("input");
                input3.classList.add('form-control');
                input3.setAttribute('type', 'number');
                input3.setAttribute('value', '0');
                input3.setAttribute('min', '0');
                input3.setAttribute('readonly', 'readonly');
                cel6.appendChild(input3);
		    }

            fetch("fetchNuevaCompra");
        }
	})
	.done(function() {
		$('#loadingHeader').css('display','none');
    	$('#btnCalcularCompra').css('display','');
        $('#loadingCalcularCompra').css('display','none');
        $("#btnGenerarCompraOC").css('display','');
        $("#loadingGenerarCompra").css('display','none');
	})
	.fail(function() {
		$('#loadingHeader').css('display','none');
    	$('#btnCalcularCompra').css('display','');
        $('#loadingCalcularCompra').css('display','none');
        $("#btnGenerarCompraOC").css('display','');
        $("#loadingGenerarCompra").css('display','none');
        $("#modalErrorConexion").modal("show");
	})
	.always(function() {
	});
}

// Cargar DataTable Nueva Orden de Compra //
function fetchNuevaOC(){

    $.ajax({
        url: window.dir + 'index.php/Controller_Compras/fetchNuevaCompra',
        type: 'POST',
        processData: false,
        contentType: false,
        timeout: 800000,
        beforeSend : function ()
        {
            $('#loadingHeader').css('display','');
            $('#btnAgregarOrden').css('display','none');
            $('#loadingAgregarOrden').css('display','');
            $("#btnEditarOrden").css('display','none');
            $("#loadingEditarOrden").css('display','');
            $('#btnEliminarOrden').css('display','none');
            $('#loadingEliminarOrden').css('display','');
            $("#btnGenerarCompraOC").css('display','none');
            $("#loadingGenerarCompra").css('display','');
            $('#btnGenerarAnticipo').css('display','none');
            $('#loadingGenerarAnticipo').css('display','');
        },
        success: function(data)
        {
            let parsed = JSON.parse(data);
            let table = document.getElementById("fetchNuevaOrdenCompra"); 
            let tbody = table.tBodies[0];
              
            $('#fetchNuevaOrdenCompra').DataTable().destroy();
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
                cel2.innerHTML = parsed[i]['Codigo'];
                cel3.innerHTML = parsed[i]['Producto'];

                style="max-width: 50px !important"

                let input = document.createElement("input");
                input.classList.add('form-control');
                input.setAttribute('type', 'number');
                input.setAttribute('value', '0');
                input.setAttribute('min', '0');
                input.setAttribute('style', 'max-width: 100px !important');
                input.addEventListener("keyup",calcularFetchNuevaOrdenCompra);
                cel4.appendChild(input);

                let input2 = document.createElement("input");
                input2.classList.add('form-control');
                input2.setAttribute('type', 'number');
                input2.setAttribute('value', '0');
                input2.setAttribute('min', '0');
                input2.setAttribute('style', 'max-width: 100px !important');
                input2.addEventListener("keyup",calcularFetchNuevaOrdenCompra);
                cel5.appendChild(input2);

                let input3 = document.createElement("input");
                input3.classList.add('form-control');
                input3.setAttribute('type', 'text');
                input3.setAttribute('value', '0');
                input3.setAttribute('min', '0');
                input3.setAttribute('style', 'max-width: 100px !important');
                input3.setAttribute('readonly', 'readonly');
                cel6.appendChild(input3);
            }

            fetch("fetchNuevaOrdenCompra");
            $("#modalAddOrdenesCompra").modal("show");
        }
    })
    .done(function() {
        $('#loadingHeader').css('display','none');
        $('#btnAgregarOrden').css('display','');
        $('#loadingAgregarOrden').css('display','none');
        $("#btnEditarOrden").css('display','');
        $("#loadingEditarOrden").css('display','none');
        $('#btnEliminarOrden').css('display','');
        $('#loadingEliminarOrden').css('display','none');
        $("#btnGenerarCompraOC").css('display','');
        $("#loadingGenerarCompra").css('display','none');
        $('#btnGenerarAnticipo').css('display','');
        $('#loadingGenerarAnticipo').css('display','none');
    })
    .fail(function() {
        $('#loadingHeader').css('display','none');
        $('#btnAgregarOrden').css('display','');
        $('#loadingAgregarOrden').css('display','none');
        $("#btnEditarOrden").css('display','');
        $("#loadingEditarOrden").css('display','none');
        $('#btnEliminarOrden').css('display','');
        $('#loadingEliminarOrden').css('display','none');
        $("#btnGenerarCompraOC").css('display','');
        $("#loadingGenerarCompra").css('display','none');
        $('#btnGenerarAnticipo').css('display','');
        $('#loadingGenerarAnticipo').css('display','none');
        $("#modalErrorConexion").modal("show");
    })
    .always(function() {
    });
}

// fetchCompras //
function fetchCompras(){
    $('#fetchCompras').DataTable({
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
                "targets": 8,
                'render': function (data, type, full, meta)
                {
                    if (full[8] == 'Recibido'){
                        return "<label class='badge badge-success'>Recibido</label>"
                    }
                    else{
                        return "<label class='badge badge-warning'>Pendiente</label>"
                    }
                }
            },
        ],     
        "order" : [],
        "ajax" : {
            url: window.dir + "index.php/Controller_Compras/fetchCompras",
            type: "POST"
        }
    });
}

// fetchAnticpos //
function fetchAnticipos(idOC){
    $('#fetchAnticipos').DataTable({
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
                'render': function (data, type, full, meta)
                {
                    if (full[6] == 'Pagado'){
                        return "<label class='badge badge-success'>Pagado</label>"
                    }
                    else{
                        return "<label class='badge badge-danger'>Cancelado</label>"
                    }
                }
            },
        ],     
        "order" : [],
        "ajax" : {
            url: window.dir + "index.php/Controller_Compras/fetchAnticipos",
            type: "POST",
            data:{
                idOC:idOC
            }
        }
    });
}

// fetchFacturasCompras //
function fetchFacturasCompras(ID){
    $('#fetchFacturasCompras').DataTable({
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
                'render': function (data, type, full, meta)
                {
                    if (full[6] == 'Pagado'){
                        return "<label class='badge badge-success'>Pagado</label>"
                    }
                    else{
                        return "<label class='badge badge-danger'>Cancelado</label>"
                    }
                }
            },
        ],     
        "order" : [],
        "ajax" : {
            url: window.dir + "index.php/Controller_Compras/fetchFacturasCompras",
            type: "POST",
            data:{
                ID:ID
            }
        }
    });
}

// fetchOrdenCompra //
function fetchOrdenCompra(Bodega){
    $('#fetchOrdenCompra').DataTable({
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
                "targets": 8,
                'render': function (data, type, full, meta)
                {
                    if (full[8] == 'Pendiente'){
                        return "<label class='badge badge-warning'>"+full[8]+"</label>"
                    }
                    else if(full[8] == 'Aceptada'){
                        return "<label class='badge badge-primary'>"+full[8]+"</label>"
                    }
                    else if(full[8] == 'Generada'){
                        return "<label class='badge badge-success'>"+full[8]+"</label>"
                    }
                    else if(full[8] == 'Rechazada'){
                        return "<label class='badge badge-default'>"+full[8]+"</label>"
                    }
                    else{
                        return "<label class='badge badge-danger'>"+full[8]+"</label>"
                    }
                }
            },
        ],     
        "order" : [],
        "ajax" : {
            url: window.dir + "index.php/Controller_Compras/fetchOrdenCompra",
            type: "POST",
            data:{
                Bodega:Bodega
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


const generarCompraParcial = () => {
    $('#tableParcialOC').DataTable().destroy();
    const listParcial = document.getElementById("tableParcialOC").tBodies[0];
    let arrayID = new Array();
    let arrayCompra = new Array();
    let arrayPrecio = new Array();

    if (listParcial.rows.length > 0) {
        for (var i = 0; i < listParcial.rows.length; i++) {
            if (parseInt(listParcial.rows[i].cells[5].innerHTML) > 0){
                if (parseInt(listParcial.rows[i].cells[6].childNodes[0].value) != 0) {
                    arrayID.push(listParcial.rows[i].cells[0].innerHTML);
                    arrayPrecio.push(listParcial.rows[i].cells[3].innerHTML);
                    arrayCompra.push(listParcial.rows[i].cells[6].childNodes[0].value);
                }
            }
        }

        if (arrayID.length > 0) {
            swal({
                title: "¿Esta seguro que desea generar la compra?",
                text: "Una vez generada no sera posible modificarla",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    // Acción Ajax //
                    let formData = new FormData();
                    formData.append("idOC", tableFetchOrdenCompra.childNodes[0].innerHTML);
                    formData.append("ID", arrayID);
                    formData.append("Compra", arrayCompra);
                    formData.append("Precio", arrayPrecio);
    
                    $.ajax({
                        url: window.dir + 'index.php/Controller_Compras/generarCompraParcial',
                        type: 'POST',
                        processData: false,
                        contentType: false,
                        timeout: 800000,
                        data: formData,
                        beforeSend : function (){
                            $("#Cargando_Parcial").css('display','');
                        },
                        success: function(data){
                            console.log(data);
                            switch(parseInt(data)){
                                case 0:
                                    toastr.error('Ocurrio un error al generar la compra', 'Error');
                                break;
    
                                case 1:
                                    Limpiar(6);
                                    toastr.success('Compra parcial o completa generada con exito', 'Correcto');
                                break;
    
                                default:
                                    toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                            }
                        }
                    })
                    .done(function() {
                        $("#Cargando_Parcial").css('display','none');
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        $("#Cargando_Parcial").css('display','none');
                        $("#modalErrorConexion").modal("show");
                    })
                    .always(function() {
                        $("#Cargando_Parcial").css('display','none');
                    });
                }
            });
        }
        else{
            fetch("tableParcialOC");
            toastr.warning('No se encontro ningún producto con compra mayor a 0.','Advertencia');
        }
    }
}

const changeValue = (e) => {
    console.log(e.target.value);

    if (e.target.value != null && e.target.value != "") {
        if (parseInt(e.target.value) > parseInt(e.target.parentNode.parentNode.childNodes[5].innerHTML)) {
            e.target.value = e.target.parentNode.parentNode.childNodes[5].innerHTML;
            toastr.warning('No puede agregar más cantidad del producto ' + e.target.parentNode.parentNode.childNodes[1].innerHTML + ' que tiene la orden de compra','Advertencia');
        }
    }else{
        e.target.value = 0;
    }
    
}