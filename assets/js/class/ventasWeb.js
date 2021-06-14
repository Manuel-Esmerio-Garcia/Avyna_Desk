$(document).ready(function(){
    console.log("Ready");

        // Boton Facturar //
    $("#btnFacturar").click(function(event) {
        
        let RFC     = $("#txtRFCInfo").val();
        let Empresa = $("#txtClienteInfo").val();
        let CP      = $("#txtCPInfo").val();
        let UsoCFDi = $("#selectUsoCFDi").val();
        let Pago    = $("#selectFormaPago").val();
        let Metodo  = $("#selectMetodoPago").val();
        let Observa = $("#txtObservacionesInfo").val();
        
        if (RFC != "" && Empresa != "") {

            let formData = new FormData();
            formData.append("RFC", RFC);
            formData.append("Empresa", Empresa);
            formData.append("CP", CP);
            formData.append("idVenta", globalVenta);
            formData.append("idClienteMenudeo", 1967);
            formData.append("UsoCFDi", UsoCFDi);
            formData.append("Pago", Pago);
            formData.append("Metodo", Metodo);
            formData.append("Observa", Observa);

            $.ajax({
                url: window.dir + 'index.php/Controller_Ventas_Web/addFacturaDirecta',
                type: 'POST',
                processData: false,
                contentType: false,
                timeout: 8000000,
                data: formData,
                beforeSend : function ()
                {
                    $('#loadingHeader').css('display','');
                    $('#btnCerrarModalInfo').css('display','none');
                    $('#loadingCerrarModalInfo').css('display','');
                    $('#btnFacturar').css('display','none');
                    $('#loadingFacturar').css('display','');                       
                },
                success: function(data)
                {
                    console.log(data);

                    switch(parseInt(data.trim())){
                        case 0:
                            Limpiar(3);
                            toastr.error('Ocurrio un error al registrar la factura en el sistema', 'Error');
                        break;

                        case 1:
                            Limpiar(3);
                            toastr.success('Factura timbrada con exito','Correcto');
                        break;

                        case 2:
                            Limpiar(3);
                            toastr.error('Ocurrio un error al leer el UUID de la factura timbrada','Error');
                        break;

                        case 3:
                            toastr.error('Ocurrio un error al obtener el XML timbrado','Error');
                        break;

                        case 4:
                            toastr.error('Los saldos de la venta no conciden con los calculados','Error');
                        break;

                        default:
                            toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                    }
                }
            })
            .done(function() {
                $('#loadingHeader').css('display','none');
                $('#btnCerrarModalInfo').css('display','');
                $('#loadingCerrarModalInfo').css('display','none');
                $('#btnFacturar').css('display','');
                $('#loadingFacturar').css('display','none');
            })
            .fail(function() {
                console.log("fail");
                $('#loadingHeader').css('display','none');
                $('#btnCerrarModalInfo').css('display','');
                $('#loadingCerrarModalInfo').css('display','none');
                $('#btnFacturar').css('display','');
                $('#loadingFacturar').css('display','none');
            })
            .always(function() {
            });
        }
        else{
            toastr.warning('Algúnos campos obligatorio se encuentran vacio.', 'Warning');
        }
    });
});

///// Acción Descargar XML y PDF //////
function Descargar(row) {
    window.open(""+window.dir+"Clases/Reportes/Formato_Facturacion_33.php?ID="+row.childNodes[0].innerHTML+"");
    window.open(""+window.dir+"Clases/RecuperarXML.php?ID="+row.childNodes[0].innerHTML+"");
}

function Entregar(row) {
    window.open("http://integrattodev.cloudapp.net/WebServiceSendMail/SendEntrega.php?idVenta="+row.childNodes[0].innerHTML+"",'_blank');
    $('#fetchVentasWeb').DataTable().ajax.reload();
}

///// Abrir Modal Facturar //////
function Facturar(row){

    globalVenta = row.childNodes[0].innerHTML;
    globalidClienteMenudeo = row.childNodes[2].innerHTML;
    Adeudo = row.childNodes[5].innerHTML;
    Extraido = row.childNodes[7].childNodes[0].innerHTML;

    if (parseFloat(Adeudo) == 0 && Extraido == 'Extraido') {

        $("#modalInfoCliente").modal("show");

        let formData = new FormData();
        formData.append("idVenta", row.childNodes[0].innerHTML);
        formData.append("idClienteMenudeo", row.childNodes[2].innerHTML);

        $.ajax({
            url: window.dir + 'index.php/Controller_VentasDirectas/GetinfoClienteMenudeoByIdVenta',
            type: 'POST',
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            timeout: 800000,
            data: formData,
            beforeSend : function ()
            {
                $('#loadingHeader').css('display','');
                $('#btnCerrarModalInfo').css('display','none');
                $('#loadingCerrarModalInfo').css('display','');
                $('#btnFacturar').css('display','none');
                $('#loadingFacturar').css('display','');
            },
            success: function(data)
            {
                console.log(data);
                let parsed = JSON.parse(data);

                $("#txtClienteInfo").val(parsed[0]['Empresa']);
                $("#txtRFCInfo").val(parsed[0]['RFC']);
                $("#txtCPInfo").val(parsed[0]['CP']);
                $(".txtColoniaInfo").val(parsed[0]['Colonia']);
            }
        })
        .done(function() {
            $('#loadingHeader').css('display','none');
            $('#btnCerrarModalInfo').css('display','');
            $('#loadingCerrarModalInfo').css('display','none');
            $('#btnFacturar').css('display','');
            $('#loadingFacturar').css('display','none');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            $('#loadingHeader').css('display','none');
            $('#btnCerrarModalInfo').css('display','');
            $('#loadingCerrarModalInfo').css('display','none');
            $('#btnFacturar').css('display','');
            $('#loadingFacturar').css('display','none');
            $("#modalErrorConexion").modal("show");
        })
        .always(function() {
        });
    }
    else{
        toastr.warning('No es posible facturar una venta con adeudo o sin extraer', 'Warning');
    }
}

// Función Limpiar //
function Limpiar(valor) {
    switch (valor) {
        case 3:
            $("#txtClienteInfo").val('');
            $("#txtRFCInfo").val('');
            $("#txtCPInfo").val('');
            $("#txtColoniaInfo").val('');
            $("#txtEstadoInfo").val('');
            $("#txtPaisInfo").val('');
            $("#txtMunicipioInfo").val('');
            $("#selectUsoCFDi").val('P01');
            $("#selectFormaPago").val('01');
            $("#selectMetodoPago").val('PUE');
            $("#txtObservacionesInfo").val('');

            $("#txtEstado").val("");
            $("#txtMunicipio").val("");
            $("#txtPais").val("");
            $("#txtEstado").removeAttr('readonly');
            $("#txtMunicipio").removeAttr('readonly');
            $("#txtPais").removeAttr('readonly');
            $("#txtColonia").empty();

            $("#modalInfoCliente").modal("hide");

            globalVenta = null;
            globalidClienteMenudeo = null;

            $('#fetchVentasWeb').DataTable().ajax.reload();
        break;
    }
}