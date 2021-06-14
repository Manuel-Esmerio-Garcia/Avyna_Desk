var dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.ID_Insert_Factura_Generica;
window.Folio_Factura;

window.Impuesto_Traslado;
window.Retencion_IVA;
window.Retencion_ISR;

window.CFDI_Relacionado;

window.Total_Retenciones;
window.Total_Retenciones;

window.Linea_Ventas;
window.Linea_Ventas_Menudeo;


window.linea_producto;
window.objgeneral;
window.Impuesto_Factura_Valor;
window.Tipo_Factor_Factura;
window.Tasa_Cuota_Factura;
window.Impuesto_Factura_Valor_Retencion;
window.Tipo_Factor_Factura_Retencion;
window.Tasa_Cuota_Factura_Retencion;
window.Tipo_Factura;
window.Tipo_Factura_Retencion;




window.addEventListener("load",function(e)
{

    var Table_Ventas_Menudeo = document.getElementById("tabla_facturas_creadas");
    Table_Ventas_Menudeo.onclick = function(e)
    {
        window.Linea_Ventas_Menudeo = e.target.parentNode;

        let tbody = e.target.parentNode.parentNode;

        for(let x=0; x<tbody.rows.length; x++){
            tbody.rows[x].style.background = "transparent";
            tbody.rows[x].style.color = "black";
        }

        window.Linea_Ventas_Menudeo.style.background= '#1976D2';
        window.Linea_Ventas_Menudeo.style.color = "white";

        try
        {

            var ID              = window.Linea_Ventas_Menudeo.cells[0].innerHTML;
            var Fecha           = window.Linea_Ventas_Menudeo.cells[1].innerHTML;
            var Folio           = window.Linea_Ventas_Menudeo.cells[2].innerHTML;
            var Receptor        = window.Linea_Ventas_Menudeo.cells[3].innerHTML;
            var Receptor_RFC    = window.Linea_Ventas_Menudeo.cells[4].innerHTML;
            var Status          = window.Linea_Ventas_Menudeo.cells[5].innerHTML;
            var Subtotal        = window.Linea_Ventas_Menudeo.cells[6].innerHTML;
            var Impuesto        = window.Linea_Ventas_Menudeo.cells[7].innerHTML;
            var Retencion       = window.Linea_Ventas_Menudeo.cells[8].innerHTML;
            var Total           = window.Linea_Ventas_Menudeo.cells[9].innerHTML;
            //var Botones     = window.Linea_Ticket.cells[6].innerHTML;

        }catch(err)
        {
            console.log(err);
        }

    }
});


window.removeProductoFacura = function(event){
    let row = this.parentNode.parentNode;
    let tbody = document.querySelector("#Listado_Producto_Factura").tBodies[0];
    tbody.removeChild(row);
    /*Metodo Alertas en Conceptos*/
    Alerts_Conceptos();
};

window.removeImpuesto = function(event){
    let row = this.parentNode.parentNode;
    let tbody = document.querySelector("#table-Impuestos").tBodies[0];
    tbody.removeChild(row);

    Alerts_Conceptos();
};

window.Editar_Datos_Impuestos = function(event){

    let row     = this.parentNode.parentNode;
    columnas    = row.getElementsByTagName('td')[0].innerHTML;

    if($('#Traslado').is(':checked'))
        {

            $("#txt_base_traslado").val(row.getElementsByTagName('td')[0].innerHTML);
            $("#txt_Taso_cuota_traslado").val(row.getElementsByTagName('td')[3].innerHTML);
            $("#cmd_impuesto_traslado").val(row.getElementsByTagName('td')[1].innerHTML);
            $("#txt_Importe_iva_traslado").val(row.getElementsByTagName('td')[4].innerHTML);
            $("#cmd_Tipo_Factor_traslado").val(row.getElementsByTagName('td')[2].innerHTML);

        }else{

            $("#txt_base_retencion").val(row.getElementsByTagName('td')[0].innerHTML);
            $("#txt_Taso_cuota_retencion").val(row.getElementsByTagName('td')[3].innerHTML);
            $("#cmd_impuesto_retencion").val(row.getElementsByTagName('td')[1].innerHTML);
            $("#txt_Importe_iva_retencion").val(row.getElementsByTagName('td')[4].innerHTML);
            $("#Tipo_Factor_Retencion").val(row.getElementsByTagName('td')[2].innerHTML);

        }

    let tbody = document.querySelector("#table-Impuestos").tBodies[0];
    tbody.removeChild(row);

    Alerts_Conceptos();
}


window.Editar_Datos = function(event){

    let row     = this.parentNode.parentNode;
    columnas    = row.getElementsByTagName('td')[0].innerHTML;

    $("#txt_clave_sat").val(row.getElementsByTagName('td')[4].innerHTML);
    $("#txt_Cantidad").val(row.getElementsByTagName('td')[1].innerHTML);
    $("#txt_Unidad").val(row.getElementsByTagName('td')[2].innerHTML);
    $("#txt_clave_unidad").val(row.getElementsByTagName('td')[3].innerHTML);
    $("#txt_Numero_identificacion").val(row.getElementsByTagName('td')[0].innerHTML);
    $("#txt_Descripcion").val(row.getElementsByTagName('td')[5].innerHTML);
    $("#txt_Valor_Unitario").val(row.getElementsByTagName('td')[6].innerHTML);
    $("#txt_Importe").val(row.getElementsByTagName('td')[7].innerHTML);
    $("#txt_Descuento").val(row.getElementsByTagName('td')[8].innerHTML);

    let tbody = document.querySelector("#Listado_Producto_Factura").tBodies[0];
    tbody.removeChild(row);

    Alerts_Conceptos();
}

window.addEventListener("load",function(e){

    $('#cmd_RFC_Emisor').change(function(){

        var RFC = $('#cmd_RFC_Emisor').val();

    if (RFC != "" && RFC != null)
    {

        $.ajax({
            url: dir + 'index.php/Controller_Factura_Generica/GetDataEmpresById',
            type: 'POST',
            //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: {'RFC': RFC},
            success: function(data)
            {

                console.log(data);

                let parseJson = JSON.parse(data);

                 for (var i = 0; i <= parseJson['Empresa'].length -1; i++)
                {

                $('#txt_RazonSocial').val(parseJson['Empresa'][i]['Razon_Social']);
                $('#Emisor_Telefono').val(parseJson['Empresa'][i]['Telefono1']);
                $('#Emisor_Correoa').val(parseJson['Empresa'][i]['Email']);
                $("#Emisor_CP").val(parseJson['Empresa'][i]['CP']);
                $("#txt_Lugar_Expedicion").val(parseJson['Empresa'][i]['CP']);
                var Descripcion_Regimen_Fiscal  = parseJson['Empresa'][i]['Descripcion_Regimen_Fiscal'];
                var Clave_Regimen_Fiscal        = parseJson['Empresa'][i]['Clave_Regimen_Fiscal'];

                }

                var option = $('<option/>');
                option.attr({ 'value': Clave_Regimen_Fiscal }).text(Descripcion_Regimen_Fiscal);
                $('#cmb_RegimenFiscal').append(option);

            }
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    }

    else
    {
        $('#txt_RazonSocial').val("");
        $('#Emisor_Telefono').val("");
        $('#Emisor_Correoa').val("");
        $('#cmb_RegimenFiscal').text("");
        $('#cmb_RegimenFiscal').val("");
        $("#Emisor_CP").val("");
    }

    });


});

// A $( document ).ready() block.
$( document ).ready(function() {

    $("#btn_Guardar_Factura").click(function(){

        let Retencion_IVA = parseFloat($("#Retenciones_Invoice_IVA").text());
        let Retencion_ISR = parseFloat($("#Retenciones_Invoice_ISR").text());

        let Total_Retenciones_Invoice = Retencion_IVA + Retencion_ISR;

       let ID_Usuario               =  $("#ID_Usuario").text(); 
       let Emisor                   =  $("#txt_RazonSocial").val();
       let RFC_Emisor               =  $("#cmd_RFC_Emisor").val();
       let Clave_Regimen            =  $("#cmb_RegimenFiscal").val();
       let Regimen                  =  $("#cmb_RegimenFiscal").text();
       let Tipo_Comprobante         =  $("#id_Tipo_Comprobante").val();
       let RFC_Receptor             =  $("#id_RFC_receptor").val();
       let Receptor                 =  $("#id_RazonSocial_receptor").val();
       let Uso_CFDI                 =  $("#id_Tipo_Comprobante_receptor").val();
       let Uso_CFDI_Desc            =  $("#id_Tipo_Comprobante_receptor").text();
       let Correo                   =  $("#Correo_Receptor").val();

       let Subtotal                 = $("#Subtotal_Invoice").text();
       let Impuestos                = $("#Impuesto_Invoice").text();
       let Retenciones              = parseFloat(Total_Retenciones_Invoice).toFixed(2);
       let Descuento                = $("#Descuento_Invoice").text();
       let Total                    = $("#Total_Invoice").text();
       let Observaciones            = $("#Observaciones").val();

       window.Folio_Factura         = $("#txt_Lugar_Folio").val();

       let Folio                    =  $("#txt_Lugar_Folio").val();
       let Forma_Pago               =  $("#cmd_Forma_Pago").val();
       let Lugar_Expedicion         =  $("#txt_Lugar_Expedicion").val();
       let Moneda                   =  $("#cmd_Moneda").val();
       let Metodo_Pago              =  $("#cmd_Metodo_Pago").val();
       let Serie                    =  $("#txt_Serie").val();
       let Tipo_Cambio              =  $("#txt_Tipo_Cambio").val();
       let Condicion_Pago           =  $("#txt_Condicion").val();

        var ObjDate = new Date();
        var Fecha = ObjDate.getFullYear() + "-" +  parseInt(ObjDate.getMonth() + 1) + "-" +  ObjDate.getDate() + " " +  ObjDate.getHours() + ":" + ObjDate.getMinutes() + ":" + ObjDate.getSeconds();

        console.log(Fecha);

        var formData = new FormData();
        formData.append("ID_Usuario", ID_Usuario);
        formData.append("Fecha_Guardado", Fecha);
        formData.append("Folio", Folio);
        formData.append("Serie", Serie);
        formData.append("Tipo_Comprobante", Tipo_Comprobante);
        formData.append("TipoCambio", Tipo_Cambio);
        formData.append("Forma_Pago", Forma_Pago);
        formData.append("Moneda", Moneda);
        formData.append("Metodo_Pago", Metodo_Pago);
        formData.append("Receptor", Receptor);
        formData.append("Receptor_RFC", RFC_Receptor);
        formData.append("Uso_CFDI", Uso_CFDI);
        formData.append("Emisor", Emisor);
        formData.append("Emisor_RFC", RFC_Emisor);
        formData.append("Lugar_Expedicion", Lugar_Expedicion);
        formData.append("Clave_Regimen_Fiscal", Clave_Regimen);
        formData.append("Regimen_Fiscal", Regimen.trim());
        formData.append("Status", 'Guardado');
        formData.append("Observaciones", Observaciones);
        formData.append("Subtotal", Subtotal);
        formData.append("Impuesto", Impuestos);
        formData.append("Retenciones", Retenciones);
        formData.append("Descuento", Descuento);
        formData.append("Total", Total);
        formData.append("Correo",Correo);

       $.ajax({
           url: dir + 'index.php/Controller_Factura_Generica/Guardar_Factura_Generica',
           type: 'POST',
           processData: false,  // tell jQuery not to process the data
           contentType: false,
           timeout: 35000,
           //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
           data: formData,
           beforeSend : function ()
            {
                $('#loader').show();
            },
            success: function(data)
            {
                console.log(data);

                if (data != 0) {

                    window.ID_Insert_Factura_Generica = data;

                    $("#div_Timbrar_Factura").css('display', '');
                    $("#div_Guardar_Factura").css('display', 'none');

                    //swal("Correcto","La factura con el folio N° " + Folio + " fue guardada con exito", "success");
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
                          "timeOut": "2500",
                          "extendedTimeOut": "1000",
                          "showEasing": "swing",
                          "hideEasing": "linear",
                          "showMethod": "fadeIn",
                          "hideMethod": "fadeOut"
                        }
                        // Display an error toast, with a title
                        toastr.error('Hubo un problema al guardar la Factura, si el error persiste, comunicarse con soporte.', 'Error');
                }

            }
       })
       .done(function() {
           
           Insert_Detalle_Factura_Generica();
       })
       .fail(function() {
           console.log("error");
       })
       .always(function() {
       });

    });


    $("#Tab_impuestos").css('display','none');

    $('#check_relacionado').change(function(e){

        console.log("Revisado");

           if($('#check_relacionado').is(':checked'))
            {
                $("#div_Relacion").removeAttr('hidden');

            }
            else
            {
                $("#div_Relacion").attr('hidden','hidden');
                $("#div_agregar_UUID").attr('hidden','hidden');
                $("#Alert_UUID").attr('hidden','hidden');
                $('#Agregar_Relacion').attr('disabled','disabled');
                $("#cmd_Tipo_Relacion").val("");
                var Listado_UUID_Completo = document.getElementById("Listado_UUID");
                Listado_UUID_Completo.innerHTML = "";
            }
    });

    $("#cmd_Tipo_Relacion").change(function(){

        var Tipo_Relacion = $('#cmd_Tipo_Relacion').val();

        if (Tipo_Relacion != null && Tipo_Relacion != "")
        {
            $('#div_agregar_UUID').removeAttr('hidden');
            $("#Alert_UUID").removeAttr('hidden');
            $('#Agregar_Relacion').removeAttr('disabled');
        }
        else
        {
            $("#div_agregar_UUID").attr('hidden','hidden');
            $("#Alert_UUID").attr('hidden','hidden');
            $('#Agregar_Relacion').attr('disabled','disabled');
            let Listado_UUID_Completo = document.getElementById("Listado_UUID");
                Listado_UUID_Completo.innerHTML = "";
        }
    });

    $("#UUID_Relacionado").change(function(){

        var Relacion = $("#UUID_Relacionado").val();
        var Console = $("#UUID_Relacionado").val(Relacion.toUpperCase());

    });

    $("#Agregar_Relacion").click(function(){

        var Relacion = $("#UUID_Relacionado").val();

        if (Relacion.length != 36)
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
                          "timeOut": "2500",
                          "extendedTimeOut": "1000",
                          "showEasing": "swing",
                          "hideEasing": "linear",
                          "showMethod": "fadeIn",
                          "hideMethod": "fadeOut"
                        }
                        // Display an error toast, with a title
                        toastr.warning('EL campo UUID no cuenta con los caracteres necesarios', 'Advertencia');

        }
        else
        {

        //console.log(Relacion);

        var Listado_UUID = document.getElementById("Listado_UUID");

        var panel_default = document.createElement("div");
        panel_default.classList.add('alert','alert-default','alert-dismissible');
        panel_default.setAttribute('name', 'UUID');
        //panel_default.setAttribute('id', 'UUID_' + Contador);
        Listado_UUID.appendChild(panel_default);

        var panel_heading = document.createElement("a");
        panel_heading.setAttribute('class','close'); //añade texto al div creado.
        panel_heading.setAttribute('data-dismiss','alert'); //añade texto al div creado.
        panel_heading.setAttribute('aria-label','close'); //añade texto al div creado.
        panel_heading.innerHTML = "&times;";
        panel_default.appendChild(panel_heading);

        var Lista_UUID = document.createElement("strong");
        Lista_UUID.innerHTML = Relacion.toUpperCase();
        panel_default.appendChild(Lista_UUID);

        var Lista_Relacion = document.createElement("strong");
        Lista_Relacion.innerHTML = $("#cmd_Tipo_Relacion").val();
        Lista_Relacion.setAttribute('hidden', 'hidden');
        panel_default.appendChild(Lista_Relacion);

        $("#UUID_Relacionado").val("");

        }
    });


    $('#Check_Impuesto').change(function()
    {

        if($('#Check_Impuesto').is(':checked'))
        {

            $("#Tab_impuestos").css('display','');

        }
        else
        {
            $("#Tab_impuestos").css('display','none');
        }

    });


    $('#Retencion').change(function(){

        if($('#Retencion').is(':checked'))
        {

            $("#Info_Retencion").css('display','');
            $("#Info_Traslado").css('display','none');

            //$("#txt_base_traslado").val("");
            $("#txt_Taso_cuota_traslado").val("");
            $("#cmd_impuesto_traslado").val("");
            $("#txt_Importe_iva_traslado").val("");
            $("#cmd_Tipo_Factor_traslado").val("");

        }
        else
        {
            $("#Info_Retencion").css('display','none');
            $("#Info_Traslado").css('display','');

            //$("#txt_base_retencion").val("");
            $("#txt_Taso_cuota_retencion").val("");
            $("#cmd_impuesto_retencion").val("");
            $("#txt_Importe_iva_retencion").val("");
            $("#cmd_Tipo_Factor_retencion").val("");

        }

    });

    $("#UUID_Relacionado").keyup(function(event) {
        
        let UUID = $("#UUID_Relacionado").val().toUpperCase();

        $("#UUID_Relacionado").val(UUID);
    });

    /*$('#UUID_Relacionado').mask('SSSSSSSS-SSSS-SSSS-SSSS-SSSSSSSSSSSS', {
                translation: {
                    'S': {
                        pattern: /[A-F0-9]/, optional: false
                    }
                },
                placeholder: "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF"
            }); */


    $('#cmd_Moneda').change(function(){

        if ($('#cmd_Moneda').val() == 'MXN')
        {
            $('#txt_Tipo_Cambio').val(1);
            $('#txt_Tipo_Cambio').attr('readonly', 'readonly');
        }
        else
        {
            $('#txt_Tipo_Cambio').val(1);
            $('#txt_Tipo_Cambio').removeAttr('readonly')
        }
    });

    $('#Traslado').change(function(){

        if($('#Traslado').is(':checked'))
        {

            $("#Info_Traslado").css('display','');
            $("#Info_Retencion").css('display','none');

            //$("#txt_base_retencion").val("");
            $("#txt_Taso_cuota_retencion").val("");
            $("#cmd_impuesto_retencion").val("");
            $("#txt_Importe_iva_retencion").val("");
            $("#cmd_Tipo_Factor_retencion").val("");

        }
        else
        {
            $("#Info_Traslado").css('display','none');
            $("#Info_Retencion").css('display','');

            //$("#txt_base_traslado").val("");
            $("#txt_Taso_cuota_traslado").val("");
            $("#cmd_impuesto_traslado").val("");
            $("#txt_Importe_iva_traslado").val("");
            $("#cmd_Tipo_Factor_traslado").val("");
        }

    });

    $('#txt_Valor_Unitario').change(function(){

        let Valor_Unitario  = $('#txt_Valor_Unitario').val();
        let Cantidad        = $('#txt_Cantidad').val();
        let Descuento_Mov   = $('#txt_Descuento').val();

        if (Valor_Unitario != null && Valor_Unitario != "")
        {

            if (Cantidad != null && Cantidad != "") {

                if (Descuento_Mov != null && Descuento_Mov != "")
                {

                    let Importe     = 0;
                    let Descuento   = 0;

                    Descuento = Descuento_Mov / 100;

                    Importe = parseFloat(Valor_Unitario) * parseFloat(Cantidad) - ((parseFloat(Valor_Unitario) * parseFloat(Cantidad)) * Descuento).toFixed(2);

                    $('#txt_Importe').val(Importe.toFixed(2));
                }
                else
                {

                    let Importe = 0;

                    Importe = parseFloat(Valor_Unitario) * parseFloat(Cantidad).toFixed(2);

                    $('#txt_Importe').val(Importe.toFixed(2));

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
                          "timeOut": "2500",
                          "extendedTimeOut": "1000",
                          "showEasing": "swing",
                          "hideEasing": "linear",
                          "showMethod": "fadeIn",
                          "hideMethod": "fadeOut"
                        }
                        // Display an error toast, with a title
                        toastr.info('El campo Cantidad es obligatorios para calcular el importe de la factura', 'Importante');

                $('#txt_Importe').val("");
            }

        }
        else
        {

        }
    });

    $('#txt_Cantidad').change(function(){

        let Valor_Unitario  = $('#txt_Valor_Unitario').val();
        let Cantidad        = $('#txt_Cantidad').val();
        let Descuento_Mov   = $('#txt_Descuento').val();

        if (Valor_Unitario != null && Valor_Unitario != "")
        {

            if (Cantidad != null && Cantidad != "") {

                if (Descuento_Mov != null && Descuento_Mov != "")
                {

                let Importe     = 0;
                let Descuento   = 0;

                Descuento = Descuento_Mov / 100;

                Importe = parseFloat(Valor_Unitario) * parseFloat(Cantidad) - ((parseFloat(Valor_Unitario) * parseFloat(Cantidad)) * Descuento).toFixed(2);

                $('#txt_Importe').val(Importe.toFixed(2));
                }
                else
                {

                    let Importe = 0;

                    Importe = parseFloat(Valor_Unitario) * parseFloat(Cantidad).toFixed(2);

                    $('#txt_Importe').val(Importe.toFixed(2));

                }
            }
            else
            {
                toastr.info('Los campos Cantidad es obligatorios para calcular el importe de la factura', 'Importante');
                $('#txt_Importe').val("");
            }

        }
        else
        {

        }

    });

    $('#txt_Descuento').change(function(){

        let Valor_Unitario  = $('#txt_Valor_Unitario').val();
        let Cantidad        = $('#txt_Cantidad').val();
        let Descuento_Mov   = $('#txt_Descuento').val();

        if (Valor_Unitario != null && Valor_Unitario != "")
        {

            if (Cantidad != null && Cantidad != "")
            {

                if (Descuento_Mov != null && Descuento_Mov != "")
                {

                let Importe     = 0;
                let Descuento   = 0;

                Descuento = Descuento_Mov / 100;

                Importe = parseFloat(Valor_Unitario) * parseFloat(Cantidad) - ((parseFloat(Valor_Unitario) * parseFloat(Cantidad)) * Descuento).toFixed(2);

                $('#txt_Importe').val(Importe.toFixed(2));
                }
                else
                {

                    let Importe = 0;

                    Importe = parseFloat(Valor_Unitario) * parseFloat(Cantidad).toFixed(2);

                    $('#txt_Importe').val(Importe.toFixed(2));

                }

            }
            else
            {
                toastr.info('El campo Cantidad es obligatorios para calcular el importe de la factura', 'Importante');
                $('#txt_Importe').val("");
            }

        }
        else
        {

        }
    });

    /*$('#cmd_Tipo_Factor_traslado').change(function()
    {
        var Importe_Traslado = $('#cmd_Tipo_Factor_traslado').val();

        if (Importe_Traslado.length == 6)
        {
            $('#txt_Taso_cuota_traslado').attr('readonly', 'readonly');
            $('#txt_Taso_cuota_traslado').val("");

        }else{

            $('#txt_Taso_cuota_traslado').removeAttr('readonly');
        }

        if (Importe_Traslado == '')
        {
            $('#txt_Taso_cuota_traslado').attr('readonly', 'readonly');
            $('#txt_Taso_cuota_traslado').val("");

        }else{

            $('#txt_Taso_cuota_traslado').removeAttr('readonly');
        }
    }); */


    $('#Tipo_Factor_Retencion').change(function(){

        let Importe = $('#Tipo_Factor_Retencion').val();

        if (Importe.length == 6)
        {
            $('#txt_Taso_cuota_retencion').attr('readonly', 'readonly');
            $('#txt_Taso_cuota_retencion').val("");

        }else{

            $('#txt_Taso_cuota_retencion').removeAttr('readonly');
        }

        if (Importe == '')
        {
            $('#txt_Taso_cuota_retencion').attr('readonly', 'readonly');
            $('#txt_Taso_cuota_retencion').val("");

        }else{

            $('#txt_Taso_cuota_retencion').removeAttr('readonly');
        }
    });

    $("#txt_Taso_cuota_traslado").change(function(){

        let Tasa = $("#txt_Taso_cuota_traslado").val();
        let Base = $("#txt_base_traslado").val();

        let Base_Impuesto = Tasa / 100;

        let Importe = Base * Base_Impuesto;

        $("#txt_Importe_iva_traslado").val(parseFloat(Importe).toFixed(2));

    });

    $("#txt_base_traslado").change(function(){

        let Tasa = $("#txt_Taso_cuota_traslado").val();
        let Base = $("#txt_base_traslado").val();

        let Base_Impuesto = Tasa / 100;

        let Importe = Base * Base_Impuesto;

        $("#txt_Importe_iva_traslado").val(parseFloat(Importe).toFixed(2));

    });


    $("#txt_Taso_cuota_retencion").change(function(){

        let Tasa = $("#txt_Taso_cuota_retencion").val();
        let Base = $("#txt_base_retencion").val();

        let Base_Impuesto = Tasa / 100;

        let Importe = Base * Base_Impuesto;

        $("#txt_Importe_iva_retencion").val(parseFloat(Importe).toFixed(2));

    });

    $("#txt_base_retencion").change(function(){

        let Tasa = $("#txt_Taso_cuota_retencion").val();
        let Base = $("#txt_base_retencion").val();

        let Base_Impuesto = Tasa / 100;

        let Importe = Base * Base_Impuesto;

        $("#txt_Importe_iva_retencion").val(parseFloat(Importe).toFixed(2));

    });

    /*$('#Aceptar_Impuesto').click(function(){


        let Base_Traslado $("#txt_base_traslado").val();
        let Tasa_Traslado $("#txt_Taso_cuota_traslado").val();
        let Impuesto_Traslado $("#cmd_impuesto_traslado").val();
        let Importe_Iva_Traslado $("#txt_Importe_iva_traslado").val();
        let Factor_Traslado $("#cmd_Tipo_Factor_traslado").val();

    });*/

    $("#txt_Taso_cuota_traslado").change(function(){

        let Base = $("#txt_base_traslado").val();

        if (Base != null && Base != "")
        {
            let Tasa = $("#txt_Taso_cuota_traslado").val();
        }
    });


    $("#Agregar_Producto").click(function(){

       let Clave_SAT            = $("#txt_clave_sat").val();
       let Cantidad             = $("#txt_Cantidad").val();
       let Unidad               = $("#txt_Unidad").val();
       let Clave_Unidad         = $("#txt_clave_unidad").val();
       let Codigo               = $("#txt_Numero_identificacion").val();
       let Descripcion          = $("#txt_Descripcion").val();
       let Valor_Unitario       = $("#txt_Valor_Unitario").val();
       let Importe              = $("#txt_Importe").val();
       let Descuento            = $("#txt_Descuento").val();
       let Importe_Sin_Desc     = Cantidad * Valor_Unitario;
       let  Tabla               = document.querySelector("#Listado_Producto_Factura");

       if (Clave_SAT != null && Clave_SAT != "" && Cantidad != null && Cantidad != "" && Unidad != null && Unidad != "" && Clave_Unidad != null && Clave_Unidad != "" && Descripcion != null && Descripcion != "" && Valor_Unitario != null && Valor_Unitario != "")
       {

            $("#Listado_Producto_Factura").css('display','');

            let row = Tabla.tBodies[0].insertRow(document.querySelector("#Listado_Producto_Factura").tBodies[0].rows.length);
            row.setAttribute("id",document.querySelector("#Listado_Producto_Factura").tBodies[0].rows.length - 1);

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

             if (Descuento.length  == 0)
            {
                cell9.innerHTML = 0.00;
                cell10.innerHTML = 0.00;
            }
            else
            {
                let Desc            = Descuento / 100;
                cell10.innerHTML    = parseFloat(Importe_Sin_Desc * Desc).toFixed(2);
                cell9.innerHTML     = parseFloat(Descuento).toFixed(2);
            }

            var boton = document.createElement("button");
            boton.classList.add('btn', 'btn-default', 'btn-sx');
            boton.setAttribute('name', 'name_Productos');
            boton.addEventListener("click",window.removeProductoFacura);
            cell11.appendChild(boton);

            var icono = document.createElement("span");
            icono.classList.add('glyphicon', 'glyphicon-trash');
            boton.appendChild(icono);

            var boton_edit = document.createElement("button");
            boton_edit.classList.add('btn', 'btn-warning', 'btn-sx');
            boton_edit.setAttribute('name', 'name_Productos');
            //boton_edit.addEventListener("click",window.removeProductoFacura);
            boton_edit.addEventListener("click",window.Editar_Datos);
            cell11.appendChild(boton_edit);

            var icono_edit = document.createElement("span");
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

            Alerts_Conceptos();
            Valor_Base();

       }else
       {

        toastr.warning('Algunos de los datos obligatorios se encuntran vacios por favor validar estos campos', 'Advertencia');

       }

    });

    $("#Aceptar_Impuesto").click(function()
    {

        var Base          = null;
        var Tasa          = null;
        var Importe       = null;
        var IVA           = null;
        var Factor        = null;
        let Tabla        = document.querySelector("#table-Impuestos");

        if($('#Traslado').is(':checked'))
        {
            console.log("Click agregar Traslado");

            Base          = $("#txt_base_traslado").val();
            Tasa          = $("#txt_Taso_cuota_traslado").val();
            Importe       = $("#cmd_impuesto_traslado").val();
            IVA           = $("#txt_Importe_iva_traslado").val();
            Factor        = $("#cmd_Tipo_Factor_traslado").val();

            if (Base != null && Base != "" && Tasa != "" && Tasa != null && Importe != "" && Importe != null && IVA != "" && IVA != null && Factor != "" && Factor != null) {

                $("#Div_Impuesto").css('display','');

                let row = Tabla.tBodies[0].insertRow(document.querySelector("#table-Impuestos").tBodies[0].rows.length);
                row.setAttribute("id",document.querySelector("#table-Impuestos").tBodies[0].rows.length - 1);

                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                let cell6 = row.insertCell(5);
                let cell7 = row.insertCell(6);

                cell1.innerHTML = parseFloat(Base).toFixed(2);
                cell2.innerHTML = Importe;
                cell3.innerHTML = Factor;
                cell4.innerHTML = Tasa;
                cell5.innerHTML = parseFloat(IVA).toFixed(2);

                let Label = document.createElement("label");
                Label.classList.add('label','label-primary');
                Label.innerHTML = "Traslado";
                cell6.appendChild(Label);

                let boton = document.createElement("button");
                boton.classList.add('btn', 'btn-default', 'btn-sx');
                boton.setAttribute('name', 'name_Productos');
                boton.addEventListener("click",window.removeImpuesto);
                cell7.appendChild(boton);

                let icono = document.createElement("span");
                icono.classList.add('glyphicon', 'glyphicon-trash');
                boton.appendChild(icono);

                let boton_edit = document.createElement("button");
                boton_edit.classList.add('btn', 'btn-warning', 'btn-sx');
                boton_edit.setAttribute('name', 'name_Productos');
                //boton_edit.addEventListener("click",window.removeProductoFacura);
                boton_edit.addEventListener("click",window.Editar_Datos_Impuestos);
                cell7.appendChild(boton_edit);

                let icono_edit = document.createElement("span");
                icono_edit.classList.add('glyphicon', 'glyphicon-edit');
                boton_edit.appendChild(icono_edit);

                //$("#txt_base_traslado").val("");
                $("#txt_Taso_cuota_traslado").val("");
                $("#cmd_impuesto_traslado").val("");
                $("#txt_Importe_iva_traslado").val("");
                $("#cmd_Tipo_Factor_traslado").val("");

                Alerts_Conceptos();

            }else{

                toastr.info('Algunos datos obligatorios estan vacios', 'Importante');
            }

        }else{

            Base          = $("#txt_base_retencion").val();
            Tasa          = $("#txt_Taso_cuota_retencion").val();
            Importe       = $("#cmd_impuesto_retencion").val();
            IVA           = $("#txt_Importe_iva_retencion").val();
            Factor        = $("#Tipo_Factor_Retencion").val();

            if (Base != null && Base != "" && Tasa != "" && Tasa != null && Importe != "" && Importe != null && IVA != "" && IVA != null && Factor != "" && Factor != null) {

                $("#Div_Impuesto").css('display','');

                let row = Tabla.tBodies[0].insertRow(document.querySelector("#table-Impuestos").tBodies[0].rows.length);
                row.setAttribute("id",document.querySelector("#table-Impuestos").tBodies[0].rows.length - 1);

                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                let cell6 = row.insertCell(5);
                let cell7 = row.insertCell(6);

                cell1.innerHTML = Base;
                cell2.innerHTML = Importe;
                cell3.innerHTML = Factor;
                cell4.innerHTML = Tasa;
                cell5.innerHTML = IVA;

                let Label = document.createElement("label");
                Label.classList.add('label','label-success');
                Label.innerHTML = "Retención";
                cell6.appendChild(Label);

                let boton = document.createElement("button");
                boton.classList.add('btn', 'btn-default', 'btn-sx');
                boton.setAttribute('name', 'name_Productos');
                boton.addEventListener("click",window.removeImpuesto);
                cell7.appendChild(boton);

                let icono = document.createElement("span");
                icono.classList.add('glyphicon', 'glyphicon-trash');
                boton.appendChild(icono);

                let boton_edit = document.createElement("button");
                boton_edit.classList.add('btn', 'btn-warning', 'btn-sx');
                boton_edit.setAttribute('name', 'name_Productos');
                //boton_edit.addEventListener("click",window.removeProductoFacura);
                boton_edit.addEventListener("click",window.Editar_Datos_Impuestos);
                cell7.appendChild(boton_edit);

                let icono_edit = document.createElement("span");
                icono_edit.classList.add('glyphicon', 'glyphicon-edit');
                boton_edit.appendChild(icono_edit);

                //$("#txt_base_retencion").val("");
                $("#txt_Taso_cuota_retencion").val("");
                $("#cmd_impuesto_retencion").val("");
                $("#txt_Importe_iva_retencion").val("");
                $("#Tipo_Factor_Retencion").val("");

                Alerts_Conceptos();

            }else{

                toastr.info('Algunos datos obligatorios estan vacios', 'Importante');
            }
        }

    });

//tab_content33


$("#Traslado").click(function(){

    let Tabla_Productos         = document.getElementById("Listado_Producto_Factura");
    let Tbody_Productos         = Tabla_Productos.getElementsByTagName("tbody")[0];
    let Cantidad_Productos      = Tbody_Productos.getElementsByTagName("tr").length;
    let Base_Impuesto           = 0;

    for (var i = 0; i <= Tbody_Productos.rows.length - 1; i++)
    {
       Base_Impuesto += parseFloat(Tbody_Productos.rows[i].cells[7].innerText);
    }

    console.log(Base_Impuesto);

    $("#txt_base_traslado").val(Base_Impuesto);
});

$("#Retencion").click(function(){

    let Tabla_Productos         = document.getElementById("Listado_Producto_Factura");
    let Tbody_Productos         = Tabla_Productos.getElementsByTagName("tbody")[0];
    let Cantidad_Productos      = Tbody_Productos.getElementsByTagName("tr").length;
    let Base_Impuesto           = 0;

    for (var i = 0; i <= Tbody_Productos.rows.length - 1; i++)
    {
       Base_Impuesto += parseFloat(Tbody_Productos.rows[i].cells[7].innerText);
    }

    console.log(Base_Impuesto);

    $("#txt_base_retencion").val(Base_Impuesto);
});

$('#Previazualizar_Factura').click(function(){

    var Forma_Pago          = $("#cmd_Forma_Pago").val();
    var Lugar_Expedicion    = $("#txt_Lugar_Expedicion").val();
    var Moneda              = $("#cmd_Moneda").val();
    var Metodo_Pago         = $("#cmd_Metodo_Pago").val();
    var Tipo_Cambio         = $("#txt_Tipo_Cambio").val();

    let Tabla_Productos_Validar         = document.getElementById("Listado_Producto_Factura");
    let Tbody_Productos_Validar         = Tabla_Productos_Validar.getElementsByTagName("tbody")[0];
    let Cantidad_Productos_Validar      = Tbody_Productos_Validar.getElementsByTagName("tr").length;

    let Tabla_Impuestos_Validar         = document.getElementById("table-Impuestos");
    let Tbody_Impuestos_Validar         = Tabla_Impuestos_Validar.getElementsByTagName("tbody")[0];
    let Cantidad_Impuestos_Validar      = Tbody_Impuestos_Validar.getElementsByTagName("tr").length;

    if (Forma_Pago != null && Forma_Pago != "" && Lugar_Expedicion != null && Lugar_Expedicion != "" && Moneda != null && Moneda != "" && Metodo_Pago != null && Metodo_Pago != "" && Tipo_Cambio != null && Tipo_Cambio != "")
    {

    setInterval(ActualizarFecha,1000);

    let Movimientos_Factura = new Array();

    let Subtotal                    = 0.0;
    let Subtotal_Mov                = 0.0;
    let Total                       = 0.0;
    let Total_Total                 = 0.0;
    let Impuesto                    = 0.0;
    let Retencion_Total_IVA         = 0.0;
    let Retencion_Total_ISR         = 0.0;
    let Retenciones                 = 0.0;
    let Descuento_Invoice           = 0.0;
    let Importe_Desc                = 0.0;
    let Descuento_Porc              = 0.0;
    let Total_Importe_Descuento     = 0.0;
    let Total_Importe_Descuento_Mov = 0.0;

    let Tabla_Productos             = document.getElementById("Listado_Producto_Factura");
    let Tbody_Productos             = Tabla_Productos.getElementsByTagName("tbody")[0];
    let Cantidad_Productos          = Tbody_Productos.getElementsByTagName("tr").length;

    if (Cantidad_Productos > 0) {
        var array = [];
        window.objgeneral = {
            'Producto':array
        };
        for (let i = 0; i <= Tbody_Productos.rows.length -1; i++) {

            var myObj =
            {
                "Codigo":Tbody_Productos.rows[i].cells[0].innerText,
                "Cantidad":Tbody_Productos.rows[i].cells[1].innerText,
                "Unidad":Tbody_Productos.rows[i].cells[2].innerText,
                "Clave_Unidad":Tbody_Productos.rows[i].cells[3].innerText,
                "Clave_SAT":Tbody_Productos.rows[i].cells[4].innerText,
                "Descripcion":Tbody_Productos.rows[i].cells[5].innerText,
                "Precio":Tbody_Productos.rows[i].cells[6].innerText,
                "Importe":Tbody_Productos.rows[i].cells[7].innerText,
                "Descuento":Tbody_Productos.rows[i].cells[8].innerText
            };

            array.push(myObj);
        }


        console.log(array);

    }
    else
    {
        toastr.warning('Debe agregar cuándo menos un registro', 'Precaución');
    }

    let Tabla_Impuestos         = document.getElementById("table-Impuestos");
    let Tbody_Impuestos         = Tabla_Impuestos.getElementsByTagName("tbody")[0];
    let Cantidad_Impuestos      = Tbody_Impuestos.getElementsByTagName("tr").length;

    if (Cantidad_Impuestos > 0)
    {
        let array2 = [];
        window.objgeneral['Impuestos'] = array2;
        for (let i = 0; i <= Tbody_Impuestos.rows.length -1; i++) {

            myObj =
            {
                "Base":Tbody_Impuestos.rows[i].cells[0].innerText,
                "Impuesto":Tbody_Impuestos.rows[i].cells[1].innerText,
                "Tipo_Factor":Tbody_Impuestos.rows[i].cells[2].innerText,
                "Tasa_Cuota":Tbody_Impuestos.rows[i].cells[3].innerText,
                "Importe":Tbody_Impuestos.rows[i].cells[4].innerText,
                "Tipo_Importe":Tbody_Impuestos.rows[i].cells[5].childNodes[0].innerText,
            };

            array2.push(myObj);
        }

        //console.log(array2);

    }
    else
    {
        toastr.warning('No se encontro ningún impuesto o Retención', 'Precaución');
    }

    if (Cantidad_Productos_Validar != 0 && Cantidad_Impuestos_Validar != 0) {

    $("#Previazualizar_Factura").attr('href', '#tab_content33');
    $("#Modulo_Comprobante").removeClass("active");
    $("#Modulo_Factura").addClass("active");
    $("#Observaciones").val("");

    var RFC_Emisor                      = $("#cmd_RFC_Emisor").val();
    var Razon_Social_Emisor             = $("#txt_RazonSocial").val();
    var Regimen_Emisor                  = $("#cmb_RegimenFiscal").val();
    var Regimen_Emisor_Descripcion      = $("#cmb_RegimenFiscal").text();
    var Tipo_Comprobante                = $("#id_Tipo_Comprobante").val();
    var Telefono_Emisor                 = $("#Emisor_Telefono").val();
    var Correo_Emisor                   = $("#Emisor_Correoa").val();
    var CP                              = $("#Emisor_CP").val();

    var RFC_Receptor                    = $("#id_RFC_receptor").val();
    var Razon_Social_Recpetor           = $("#id_RazonSocial_receptor").val();
    var Tipo_Residencia                 = $("#id_Tipo_Residencia_receptor").val();
    var Tipo_Receptor                   = $("#id_Registro").val();
    var Tipo_Comprobante_Uso            = $("#id_Tipo_Comprobante_receptor").val();

    var Fecha_Invoice                   = $("#txt_Fecha_Hora").val();
    var Folio_Invoice                   = $("#txt_Lugar_Folio").val();
    var Forma_Pago_Invoice              = $("#cmd_Forma_Pago").val();
    var Lugar_Expedicion_Invoice        = $("#txt_Lugar_Expedicion").val();
    var Moneda_Invoice                  = $("#cmd_Moneda").val();
    var Metodo_Pago_Invoice             = $("#cmd_Metodo_Pago").val();
    var Serie_Invoice                   = $("#txt_Serie").val();
    var Tipo_Cambio_Invoice             = $("#txt_Tipo_Cambio").val();

    var Uso_Descripción                 = Uso_CFDI(Tipo_Comprobante_Uso);
    var Comprobante_Descripcion         = Comprobante(Tipo_Comprobante);
    var Forma_Pago_Descripcion          = Forma_Pago_Metodo(Forma_Pago_Invoice);
    var Moneda_Descripcion              = Moneda_Metodo(Moneda_Invoice);
    var Metodo_Pago_Descripcion         = Metodo_Pago_Metodo(Metodo_Pago_Invoice);


    /*Asignar Valores a la Visualización de la Factura*/
    $("#Emisor_Razon_Social").text(Razon_Social_Emisor);
    $("#Emisor_RFC").text(RFC_Emisor);
    $("#Emisor_Domicilio").text(CP);
    $("#Emisor_Regimen").text(Regimen_Emisor + " - " + Regimen_Emisor_Descripcion);
    $("#Emisor_Email").text(Correo_Emisor);

    $("#Receptor_Razon_Social").text(Razon_Social_Recpetor);
    $("#Receptor_RFC").text(RFC_Receptor);
    $("#Receptor_Uso").text(Tipo_Comprobante_Uso + " - " + Uso_Descripción);

    $("#Tipo_Comprobante_Factura").text(Comprobante_Descripcion + " - " + Tipo_Comprobante);
    $("#Forma_Pago_Previsualizar").text(Forma_Pago_Invoice + " - " + Forma_Pago_Descripcion);
    $("#Moneda_Previsualizar").text(Moneda_Invoice + " - " + Moneda_Descripcion);
    $("#Metodo_Pago_Previsualizar").text(Metodo_Pago_Invoice + " - " + Metodo_Pago_Descripcion);

    $("#Folio_Factura").text(Folio_Invoice);
    $("#Serie_Factura").text(Serie_Invoice);

    var tabla_Impuesto_Invoice         = document.getElementById("Movimientos_Impuestos");
    var Tbody_Impuesto_Invoice         = tabla_Impuesto_Invoice.getElementsByTagName("tbody")[0];

    Tbody_Impuesto_Invoice. innerHTML = "";

    var Base_Transalado             = [];
    var Base_Retencion              = [];

    window.Total_Retenciones        = 0;
    window.Contador_Retenciones     = 0;
    window.Retencion_IVA            = 0;
    window.Retencion_ISR            = 0;

    for (var i = 0; i <= window.objgeneral['Impuestos'].length - 1; i++)
    {       

       if (window.objgeneral['Impuestos'][i]['Tipo_Importe'] == 'Traslado')
       {
            Base_Transalado.push(window.objgeneral['Impuestos'][i]['Base']);
            Base_Transalado.push(window.objgeneral['Impuestos'][i]['Tasa_Cuota']);
            Base_Transalado.push(window.objgeneral['Impuestos'][i]['Impuesto']);
            Base_Transalado.push(window.objgeneral['Impuestos'][i]['Tipo_Factor']);

            window.Impuesto_Traslado = window.objgeneral['Impuestos'][i]['Tasa_Cuota'] / 100;

       }
       else if (window.objgeneral['Impuestos'][i]['Tipo_Importe'] == 'Retención')
       {
            Base_Retencion.push(window.objgeneral['Impuestos'][i]['Base']); 
            Base_Retencion.push(window.objgeneral['Impuestos'][i]['Tasa_Cuota']);
            Base_Retencion.push(window.objgeneral['Impuestos'][i]['Impuesto']);
            Base_Retencion.push(window.objgeneral['Impuestos'][i]['Tipo_Factor']);

            if (window.objgeneral['Impuestos'][i]['Impuesto'] == '002')
            {
                window.Retencion_IVA     = parseFloat(window.objgeneral['Impuestos'][i]['Tasa_Cuota'] / 100).toFixed(6);
            }
            else
            {
                window.Retencion_ISR     = parseFloat(window.objgeneral['Impuestos'][i]['Tasa_Cuota'] / 100).toFixed(6);
            }

            let Impuesto_Retencio = window.objgeneral['Impuestos'][i]['Importe'];

            window.Total_Retenciones += parseFloat(Impuesto_Retencio);
            //console.log(window.objgeneral['Impuestos'][i]['Importe']);
       }

    }

    console.log(window.Total_Retenciones);
    console.log("Retencion IVA " + window.Retencion_IVA);
    console.log("Retencion ISR " + window.Retencion_ISR);


    /*Agregar tabla*/

    var tabla_Productos_Invoice         = document.getElementById("Movimientos_Visualizar");
    var Tbody_Productos_Invoice         = tabla_Productos_Invoice.getElementsByTagName("tbody")[0];

    Tbody_Productos_Invoice. innerHTML = "";

    window.Contador_Retenciones = window.objgeneral['Producto'].length - 1;

    console.log("Contador " + window.Contador_Retenciones);

    for (var i = 0; i <= window.objgeneral['Producto'].length - 1; i++)
    {

        Descuento_Porc   = 0;

        let row = Tbody_Productos_Invoice.insertRow(Tbody_Productos_Invoice.rows.length);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);
        let cell9 = row.insertCell(8);

        Subtotal                    += parseFloat(window.objgeneral['Producto'][i]['Cantidad']) * parseFloat(window.objgeneral['Producto'][i]['Precio']);
        Subtotal_Mov                = parseFloat(window.objgeneral['Producto'][i]['Cantidad']) * parseFloat(window.objgeneral['Producto'][i]['Precio']);
        Descuento_Porc              = parseFloat(window.objgeneral['Producto'][i]['Descuento'] / 100);
        Monto_Descuento             = Subtotal_Mov * Descuento_Porc;
        Descuento_Invoice           += Monto_Descuento;
        Total_Importe_Descuento     += Subtotal_Mov - Monto_Descuento;
        Importe_Desc                = Subtotal_Mov - Monto_Descuento;
        //Importe_Desc                = parseFloat(window.objgeneral['Producto'][i]['Importe'] - Monto_Descuento);
        let Impuesto_Movimiento     = Importe_Desc * window.Impuesto_Traslado;
        let Mov_Retecnion_IVA       = Importe_Desc * window.Retencion_IVA;
        let Mov_Retecnion_ISR       = Importe_Desc * window.Retencion_ISR;
        Impuesto                    += Impuesto_Movimiento;
        Retencion_Total_IVA         += Mov_Retecnion_IVA;
        Retencion_Total_ISR         += Mov_Retecnion_ISR;

        cell1.innerHTML = window.objgeneral['Producto'][i]['Cantidad'];
        cell2.innerHTML = window.objgeneral['Producto'][i]['Descripcion'];
        cell3.innerHTML = window.objgeneral['Producto'][i]['Clave_Unidad'];
        cell4.innerHTML = window.objgeneral['Producto'][i]['Clave_SAT'];
        cell5.innerHTML = "$ " + parseFloat(window.objgeneral['Producto'][i]['Precio']).toFixed(2);
        cell6.innerHTML = "$ " + parseFloat(Impuesto_Movimiento).toFixed(2);
        cell7.innerHTML = "$ " + parseFloat(Mov_Retecnion_IVA).toFixed(2);
        cell8.innerHTML = "$ " + parseFloat(Mov_Retecnion_ISR).toFixed(2);
        cell9.innerHTML = "$ " + parseFloat(window.objgeneral['Producto'][i]['Importe']).toFixed(2);

    }

    Total_Total                 = ((Subtotal - Descuento_Invoice) - window.Total_Retenciones) + Impuesto;
    console.log(Total_Total);

    $("#Subtotal_Invoice").text(parseFloat(Subtotal).toFixed(2));
    $("#Impuesto_Invoice").text(parseFloat(Impuesto).toFixed(2));
    $("#Retenciones_Invoice_IVA").text(parseFloat(Retencion_Total_IVA).toFixed(2));
    $("#Retenciones_Invoice_ISR").text(parseFloat(Retencion_Total_ISR).toFixed(2));
    $("#Descuento_Invoice").text(parseFloat(Descuento_Invoice).toFixed(2));
    $("#Total_Invoice").text(parseFloat(Total_Total).toFixed(2));

    }else
    {
        toastr.warning('No se encontro ningún movimiento o impuesto en la factura', 'Precaución');
    }


    }else

    {
        toastr.info('Algunos datos obligatorios estan vacios, favor de verificarlos', 'Importante');
    }

});

































/*Movimienot de Tabs o  Pill*/

$("#tab-next").click(function(event)
{

    var RFC                     = $("#cmd_RFC_Emisor").val();
    var RazonSocial             = $("#txt_RazonSocial").val();
    var Regimen                 = $("#cmb_RegimenFiscal").val();
    var Comprobante             = $("#id_Tipo_Comprobante").val();
    var RFC_Receptor            = $("#id_RFC_receptor").val();
    var RazonSocial_Receptor    = $("#id_RazonSocial_receptor").val();

    if (RFC != null && RFC != "" && RazonSocial != null && RazonSocial != "" && Regimen != null && Regimen != "" && Comprobante != null && Comprobante != "" && RFC_Receptor != null && RFC_Receptor != "")
    {
        $("#tab-next").attr('href', '#tab_content22');
        $("#Modulo_Emisor").removeClass("active");
        $("#Modulo_Comprobante").addClass("active");
        $("#Alert_UUID").css('display','none');

    }else
    {
        toastr.info('Algunos datos obligatorios estan vacios, favor de verificarlos', 'Importante');
    }

});

$("#back-datos").click(function(event) {

    $("#Modulo_Emisor").addClass("active");
    $("#Modulo_Comprobante").removeClass("active");
    $("#tab-next").removeAttr('href');

});

$("#back-datos_2").click(function(event) {

    $("#Modulo_Comprobante").addClass("active");
    $("#Modulo_Factura").removeClass("active");
    $("#Previazualizar_Factura").removeAttr('href');   

});

$("#btn_Generar_PDF").click(function(){

    getRutaPDF(window.ID_Insert_Factura_Generica);

});

$("#btn_Generar_XML").click(function(){

    getRutaXML(window.ID_Insert_Factura_Generica);

});

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

//Validación de Campos para minimizar Errores de captura de impormación

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


$("#cmd_Tipo_Factor_traslado").change(function(){

    let Tipo_Traslado = $("#cmd_Tipo_Factor_traslado").val();

    if (Tipo_Traslado != 'Exento')
    {
        $("#txt_Taso_cuota_traslado").removeAttr('readonly');
    }
    else
    {
        $("#txt_Taso_cuota_traslado").attr('readonly', 'readonly');;
    }
});


$("#cmd_impuesto_retencion").change(function(){

    let Tasa = "Tasa";
    let Cuota = "Cuota";
    let Exento = "Exento"; 
    let Default = "Seleccionar...";

    let $cmd_Impuesto = $("#cmd_impuesto_retencion").val();

    if ($cmd_Impuesto == '001')
    {
        $("#Tipo_Factor_Retencion").empty();
        $("#Tipo_Factor_Retencion").append('<option value="">'+Default+'</option>');
        $("#Tipo_Factor_Retencion").append('<option value="'+Tasa+'">'+Tasa+'</option>');
        $("#Tipo_Factor_Retencion").append('<option value="'+Cuota+'">'+Cuota+'</option>');

        //$("#txt_Taso_cuota_retencion").val("10.00000");

        $("#Retencion_ISR").css('display','');
        $("#Retencion_IVA").css('display','none');

    }
    else if ($cmd_Impuesto == '002')
    {

        $("#Tipo_Factor_Retencion").empty();
         $("#Tipo_Factor_Retencion").append('<option value="">'+Default+'</option>');
        $("#Tipo_Factor_Retencion").append('<option value="'+Tasa+'">'+Tasa+'</option>');

        //$("#txt_Taso_cuota_retencion").val("10.66667");

        $("#Retencion_ISR").css('display','none');
        $("#Retencion_IVA").css('display','');

    }
    else if ($cmd_Impuesto == '003')
    {

        $("#Tipo_Factor_Retencion").empty();
        $("#Tipo_Factor_Retencion").append('<option value="">'+Default+'</option>');
        $("#Tipo_Factor_Retencion").append('<option value="'+Tasa+'">'+Tasa+'</option>');
        $("#Tipo_Factor_Retencion").append('<option value="'+Cuota+'">'+Cuota+'</option>');

        $("#Retencion_IVA").css('display','none');
        $("#Retencion_ISR").css('display','none');

    }
    else
    {

        $("#Tipo_Factor_Retencion").empty();
        $("#Tipo_Factor_Retencion").append('<option value="">'+Default+'</option>');

        $("#Retencion_IVA").css('display','none');
        $("#Retencion_ISR").css('display','none');

    }
});


$("#cmd_impuesto_traslado").change(function(){

    let Tasa = "Tasa";
    let Cuota = "Cuota";
    let Exento = "Exento"; 
    let Default = "Seleccionar...";

    let $cmd_Impuesto = $("#cmd_impuesto_traslado").val();

    if ($cmd_Impuesto == '001')
    {
        $("#cmd_Tipo_Factor_traslado").empty();
        $("#cmd_Tipo_Factor_traslado").append('<option value="">'+Default+'</option>');
        $("#cmd_Tipo_Factor_traslado").append('<option value="'+Tasa+'">'+Tasa+'</option>');
        $("#cmd_Tipo_Factor_traslado").append('<option value="'+Exento+'">'+Exento+'</option>');

    }
    else if ($cmd_Impuesto == '002')
    {

        $("#cmd_Tipo_Factor_traslado").empty();
        $("#cmd_Tipo_Factor_traslado").append('<option value="">'+Default+'</option>');
        $("#cmd_Tipo_Factor_traslado").append('<option value="'+Tasa+'">'+Tasa+'</option>');
        $("#cmd_Tipo_Factor_traslado").append('<option value="'+Exento+'">'+Exento+'</option>');

    }
    else if ($cmd_Impuesto == '003')
    {

        $("#cmd_Tipo_Factor_traslado").empty();
        $("#cmd_Tipo_Factor_traslado").append('<option value="">'+Default+'</option>');
        $("#cmd_Tipo_Factor_traslado").append('<option value="'+Tasa+'">'+Tasa+'</option>');
        $("#cmd_Tipo_Factor_traslado").append('<option value="'+Exento+'">'+Exento+'</option>');
        $("#cmd_Tipo_Factor_traslado").append('<option value="'+Cuota+'">'+Cuota+'</option>');

    }
    else
    {

        $("#cmd_Tipo_Factor_traslado").empty();
        $("#cmd_Tipo_Factor_traslado").append('<option value="">'+Default+'</option>');

    }
});

$("#txt_Serie").keyup(function() {
  let Serie = $("#txt_Serie").val().toUpperCase();

   $("#txt_Serie").val(Serie);
});

$("#id_RFC_receptor").keyup(function() {
  let RFC_Receptor = $("#id_RFC_receptor").val().toUpperCase();

   $("#id_RFC_receptor").val(RFC_Receptor);
});

$("#id_RFC_receptor").change(function(){

   let RFC_Receptor = $("#id_RFC_receptor").val();

    if (RFC_Receptor == 'XEXX010101000')
    {
        $("#Pais_Extrangero").css('visibility','');
        $("#Clave_Fiscal_Extrangero").css('visibility','');
        $("#id_Registro").removeAttr('disabled');
        $("#id_Tipo_Residencia_receptor").removeAttr('disabled');
    }
    else
    {
        $("#Pais_Extrangero").css('visibility','hidden');
        $("#Clave_Fiscal_Extrangero").css('visibility','hidden');
        $("#id_Registro").attr('disabled','disabled');
        $("#id_Tipo_Residencia_receptor").attr('disabled','disabled');
    }
});


/*Boton Facturar*/
$("#btn_Facturar").click(function(event) {

    console.log(window.ID_Insert_Factura_Generica);

    var ID = window.ID_Insert_Factura_Generica;

    var formData = new FormData(); 
    formData.append("ID_Factura", ID);

    console.log(window.ID_Insert_Factura_Generica);

    swal({
      title: "Importante!",
      text: "¿Esta seguro que desea timbrar la factura con el N° " + window.Folio_Factura + "?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete)
      {
        $.ajax({
            url: dir+'index.php/Controller_Factura_Generica/Facturar_Factura_General',                                               //Metodo que va a recibir los datos del formulario en PHP
            type: "post",                                                                                    //Tipo de envio de la infomación
             //dataType: "json",
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            timeout: 0,
            data:formData,
            beforeSend : function ()
            {
                $('#loader').show();
            },
            success: function(data)
            {               
               console.log(data);

               if (data == 1) {

                    //swal("Good job!", "Factura Generada Con Exito", "success");                                   //Si la factura fue creada y timbrada con exito muestra el siguiente mensaje
                    toastr.success('Factura Generada Con Exito', 'Correcto');

                    $("#btn_Facturar").css('display','none');
                    $('#btn_Generar_XML').css('display','');
                    $('#btn_Generar_PDF').removeClass('btn-primary');
                    $('#btn_Generar_PDF').addClass('btn-danger');
                    $('#btn_Mandar_Correo').css('display','');

                    $("#Alert_Documento_invalido").css('display', 'none');
                    $("#Alert_Documento_valido").css('display', '');
                    $("#back-datos_2").attr('disabled','disabled');


                   $('#back-datos_2').attr('disabled', 'disabled');
                   $('#back-datos_2').removeAttr('href');
                   //href="#tab_content22"

                   $('#Observaciones').attr('readonly', 'readonly');
                   $("#btn_Editar_Factura").css('display','none');
                    //location.reload();   

                }else{

                var Respuesta = data.split(" ");

                console.log(Respuesta[2]);

                /*Validación del PAC y mensaje de error con respecto al catalogo de matriz de errores del SAT*/

                    switch(Respuesta[2])
                    {
                        case "'DUPLICIDAD":
                        swal("ERROR DUPLICIDAD EN LA CADENA ORIGINA", "Se trata de timbrar un CFDi ya timbrado", "error");     
                        break;
                        case "XSD":
                        swal("ERROR de Validación", "Error al validar el XML con el archivo .XSD del SAT", "error");     
                        break;
                        case "301":
                        swal("ERROR", "Que no cumpla con el estándar de XML (Conforme al W3C) y con la estructura XML (XSD y complementos aplicables).", "error");     
                        break;
                        case "302":
                        swal("ERROR", "Que el sello del Emisor no sea válido", "error");     
                        break;
                        case "303":
                        swal("ERROR", "Que el CSD del Emisor no corresponda al RFC que viene como Emisor en el Comprobante.", "error");     
                        break;
                        case "304":
                        swal("ERROR", "Que el CSD del Emisor haya sido revocado, utilizando la lista de LCO.", "error");     
                        break;
                        case "305":
                        swal("ERROR", "Que la fecha de emisión esté fuera de la vigencia del CSD del Emisor.", "error");     
                        break;
                        case "306":
                        swal("ERROR", "Que la llave utilizada para sellar no corresponda a un CSD (ej. de FIEL).", "error");     
                        break;
                        case "307":
                        swal("ERROR", "Que contenga un timbre previo.", "error");     
                        break;
                        case "308":
                        swal("ERROR", "Que el CSD del Emisor no haya sido firmado por uno de los Certificados de Autoridad de SAT.", "error");     
                        break;
                        case "401":
                        swal("ERROR", "Que el rango de la fecha de generación sea mayor a 72 horas para la emisión del timbre.", "error");     
                        break;
                        case "402":
                        swal("ERROR", "Que no exista el RFC del emisor conforme al régimen autorizado (Lista de validación de régimen) LCO.", "error");     
                        break;
                        case "403":
                        swal("ERROR", "Que la fecha de emisión sea anterior al 01 de Enero 2011.", "error");     
                        break;
                        case 'CFDI33192':
                        swal("ERROR CFDI33192", "Debe haber sólo un registro con la misma combinación de impuesto, factor y tasa por cada traslado.", "error");     
                        break;
                        case 'CFDI33101':
                        swal("ERROR CFDI33101", "El campo Fecha no cumple con el patrón requerido.", "error");     
                        break;
                        case 'CFDI33102':
                        swal("ERROR CFDI33102", "El resultado de la digestión debe ser igual al resultado de la desencripción del sello.", "error");     
                        break;
                        case 'CFDI33103':
                        swal("ERROR CFDI33103", "Si existe el complemento para recepción de pagos el campo FormaPago no debe existir.", "error");     
                        break;
                        case 'CFDI33104':
                        swal("ERROR CFDI33104", "El campo FormaPago no contiene un valor del catálogo c_FormaPago.", "error");     
                        break;
                        case 'CFDI33105':
                        swal("ERROR CFDI33105", "El certificado no cumple con alguno de los valores permitidos. \n Certificado no corresponde al RFC del emisor", "error");     
                        break;
                        case 'CFDI33106':
                        swal("ERROR CFDI33106", "El valor de este campo SubTotal excede la cantidad de decimales que soporta la moneda.", "error");     
                        break;
                        case 'CFDI33107':
                        swal("ERROR CFDI33107", "El TipoDeComprobante es I,E o N, el importe registrado en el campo no es igual a la suma de los importes de los conceptos registrados.", "error");     
                        break;
                        case 'CFDI33108':
                        swal("ERROR CFDI33108", "El TipoDeComprobante es T o P y el importe no es igual a 0, o cero con decimales.", "error");     
                        break;
                        case 'CFDI33109':
                        swal("ERROR CFDI33109", "El valor registrado en el campo Descuento no es menor o igual que el campo Subtotal.", "error");     
                        break;
                        case 'CFDI33110':
                        swal("ERROR CFDI33110", "El TipoDeComprobante no es I,E o N, y un concepto incluye el campo descuento.", "error");     
                        break;
                        case 'CFDI33111':
                        swal("ERROR CFDI33111", "El valor del campo Descuento excede la cantidad de decimales que soporta la moneda.", "error");     
                        break;
                        case 'CFDI33112':
                        swal("ERROR CFDI33112", "El campo Moneda no contiene un valor del catálogo c_Moneda.", "error");     
                        break;
                        case 'CFDI33113':
                        swal("ERROR CFDI33113", "El campo TipoCambio no tiene el valor '1' y la moneda indicada es MXN.", "error");     
                        break;
                        case 'CFDI33114':
                        swal("ERROR CFDI33114", "El campo TipoCambio se debe registrar cuando el campo Moneda tiene un valor distinto de MXN y XXX.", "error");     
                        break;
                        case 'CFDI33115':
                        swal("ERROR CFDI33115", "El campo TipoCambio no se debe registrar cuando el campo Moneda tiene el valor XXX.", "error");     
                        break;
                        case 'CFDI33116':
                        swal("ERROR CFDI33116", "El campo TipoCambio no cumple con el patrón requerido.", "error");     
                        break;
                        case 'CFDI33117':
                        swal("ERROR CFDI33117", "Cuando el valor del campo TipoCambio se encuentre fuera de los límites establecidos, debe existir el campo Confirmacion.", "error");     
                        break;
                        case 'CFDI33118':
                        swal("ERROR CFDI33118", "El campo Total no corresponde con la suma del subtotal, menos los descuentos aplicables, más las contribuciones recibidas (impuestos trasladados - federales o locales, derechos, productos, aprovechamientos, aportaciones de seguridad social, contribuciones de mejoras) menos los impuestos retenidos.", "error");     
                        break;
                        case 'CFDI33119':
                        swal("ERROR CFDI33119", "Cuando el valor del campo Total se encuentre fuera de los límites establecidos, debe existir el campo Confirmacion.", "error");     
                        break;
                        case 'CFDI33120':
                        swal("ERROR CFDI33120", "El campo TipoDeComprobante, no contiene un valor del catálogo c_TipoDeComprobante.", "error");     
                        break;
                        case 'CFDI33121':
                        swal("ERROR CFDI33121", "El campo MetodoPago, no contiene un valor del catálogo c_MetodoPago.", "error");     
                        break;
                        case 'CFDI33122':
                        swal("ERROR CFDI33122", "Cuando se tiene el valor PIP en el campo MetodoPago y el valor en el campo TipoDeComprobante es I ó E, el CFDI debe contener un complemento de recibo de pago.", "error");     
                        break;
                        case 'CFDI33123':
                        swal("ERROR CFDI33123", "Se debe omitir el campo MetodoPago cuando el TipoDeComprobante es T o P.", "error");     
                        break;
                        case 'CFDI33124':
                        swal("ERROR CFDI33124", "Si existe el complemento para recepción de pagos en este CFDI el campo MetodoPago no debe existir.", "error");     
                        break;
                        case 'CFDI33125':
                        swal("ERROR CFDI33125", "El campo LugarExpedicion, no contiene un valor del catálogo c_CodigoPostal.", "error");     
                        break;
                        case 'CFDI33126':
                        swal("ERROR CFDI33126", "El campo Confirmacion no debe existir cuando los atributos TipoCambio y/o Total están dentro del rango permitido.", "error");     
                        break;
                        case 'CFDI33127':
                        swal("ERROR CFDI33127", "Número de confirmación inválido.", "error");     
                        break;
                        case 'CFDI33128':
                        swal("ERROR CFDI33128", "Número de confirmación utilizado previamente.", "error");     
                        break;
                        case 'CFDI33129':
                        swal("ERROR CFDI33129", "El campo TipoRelacion, no contiene un valor del catálogo c_TipoRelacion.", "error");     
                        break;
                        case 'CFDI33130':
                        swal("ERROR CFDI33130", "El campo RegimenFiscal, no contiene un valor del catálogo c_RegimenFiscal.", "error");     
                        break;
                        case 'CFDI33131':
                        swal("ERROR CFDI33131", "La clave del campo RegimenFiscal debe corresponder con el tipo de persona (fisica o moral).", "error");     
                        break;
                        case 'CFDI33132':
                        swal("ERROR CFDI33132", "Este RFC del receptor no existe en la lista de RFC inscritos no cancelados del SAT.", "error");     
                        break;
                        case 'CFDI33133':
                        swal("ERROR CFDI33133", "El campo ResidenciaFiscal, no contiene un valor del catálogo c_Pais.", "error");     
                        break;
                        case 'CFDI33134':
                        swal("ERROR CFDI33134", "El RFC del receptor es de un RFC registrado en el SAT o un RFC genérico nacional y existe el campo ResidenciaFiscal.", "error");     
                        break;
                        case 'CFDI33135':
                        swal("ERROR CFDI33135", "El valor del campo ResidenciaFiscal no puede ser MEX.", "error");     
                        break;
                        case 'CFDI33140':
                        swal("ERROR CFDI33140", "El campo UsoCFDI, no contiene un valor del catálogo c_UsoCFDI.", "error");     
                        break;
                        case 'CFDI33141':
                        swal("ERROR CFDI33141", "La clave del campo UsoCFDI debe corresponder con el tipo de persona (fisica o moral).", "error");     
                        break;
                        case 'CFDI33142':
                        swal("ERROR CFDI33142", "El campo ClaveProdServ, no contiene un valor del catálogo c_ClaveProdServ.", "error");     
                        break;
                        case 'CFDI33143':
                        swal("ERROR CFDI33143", "No existe el complemento requerido para el valor de ClaveProdServ.", "error");     
                        break;
                        case 'CFDI33144':
                        swal("ERROR CFDI33144", "No está declarado el impuesto relacionado con el valor de ClaveProdServ.", "error");     
                        break;
                        case 'CFDI33145':
                        swal("ERROR CFDI33145", "El campo ClaveUnidad no contiene un valor del catálogo c_ClaveUnidad.", "error");     
                        break;
                        case 'CFDI33146':
                        swal("ERROR CFDI33146", "El valor del campo ValorUnitario debe tener hasta la cantidad de decimales que soporte la moneda.", "error");     
                        break;
                        case 'CFDI33147':
                        swal("ERROR CFDI33147", "El valor valor del campo ValorUnitario debe ser mayor que cero (0) cuando el tipo de comprobante es Ingreso, Egreso o Nomina.", "error");     
                        break;
                        case 'CFDI33148':
                        swal("ERROR CFDI33148", "El valor del campo Importe debe tener hasta la cantidad de decimales que soporte la moneda.", "error");     
                        break;
                        case 'CFDI33149':
                        swal("ERROR CFDI33149", "El valor del campo Importe no se encuentra entre el limite inferior y superior permitido.", "error");     
                        break;
                        case 'CFDI33150':
                        swal("ERROR CFDI33150", "El valor del campo Descuento debe tener hasta la cantidad de decimales que tenga registrado el atributo importe del concepto.", "error");     
                        break;
                        case 'CFDI33151':
                        swal("ERROR CFDI33151", "El valor del campo Descuento es mayor que el campo Importe.", "error");     
                        break;
                        case 'CFDI33154':
                        swal("ERROR CFDI33154", "El valor del campo Base que corresponde a Traslado debe ser mayor que cero.", "error");     
                        break;
                        case 'CFDI33153':
                        swal("ERROR CFDI33153", "El valor del campo Base que corresponde a Traslado debe tener hasta la cantidad de decimales que soporte la moneda.", "error");     
                        break;
                        case 'CFDI33155':
                        swal("ERROR CFDI33155", "El valor del campo Impuesto que corresponde a Traslado no contiene un valor del catálogo c_Impuesto.", "error");     
                        break;
                        case 'CFDI33156':
                        swal("ERROR CFDI33156", "El valor del campo TipoFactor que corresponde a Traslado no contiene un valor del catálogo c_TipoFactor.", "error");     
                        break;
                        case 'CFDI33159':
                        swal("ERROR CFDI33159", "El valor del campo TasaOCuota que corresponde a Traslado no contiene un valor del catálogo c_TasaOcuota o se encuentra fuera de rango.", "error");     
                        break;
                        case 'CFDI33160':
                        swal("ERROR CFDI33160", "El valor del campo Importe que corresponde a Traslado debe tener hasta la cantidad de decimales que soporte la moneda.", "error");     
                        break;
                        case 'CFDI33172':
                        swal("ERROR CFDI33172", "El campo ClaveProdServ, no contiene un valor del catálogo c_ClaveProdServ.", "error");     
                        break;
                        case 'CFDI33173':
                        swal("ERROR CFDI33173", "El valor del campo ValorUnitario debe tener hasta la cantidad de decimales que soporte la moneda.", "error");     
                        break;
                        case 'El':
                        swal("Advertencia", "El contribuyente aun no tiene folios asignados", "warning");     
                        break;
                        default:
                        swal("ERROR !!", "Hubo un error al timbrar la factura por favor intente de nuevo", "error"); 
                    }
                }
               
            }
        })
        .done(function() {
            console.log("success");
        })
        .fail(function(jqXHR, textStatus, errorThrown ) {
            if (jqXHR.status === 0) {

              console.log('Not connect: Verify Network.');

            } else if (jqXHR.status == 404) {

              console.log('Requested page not found [404]');

            } else if (jqXHR.status == 500) {

              console.log('Internal Server Error [500].');

            } else if (textStatus === 'parsererror') {

              console.log('Requested JSON parse failed.');

            } else if (textStatus === 'timeout') {

               console.log('Time out error.');

             } else if (textStatus === 'abort') {

               console.log('Ajax request aborted.');

             } else {

               console.log('Uncaught Error: ' + jqXHR.responseText);

             }
        })
        .always(function() {
            $('#loader').hide();
        });
        
      } 

    });

});

$("#btn_Mandar_Correo").click(function(){

    $('#ModalCorreo').modal({backdrop: 'static', keyboard: false});

    var ID = window.ID_Insert_Factura_Generica;

    var formData = new FormData(); 
    formData.append("ID_Factura", ID);

    $.ajax({
        url: dir + 'index.php/Controller_Factura_Generica/Cargar_Correo',
        type: 'POST',
        processData: false,  // tell jQuery not to process the data
        contentType: false,
        timeout: 35000,
        data:formData,
        beforeSend : function ()
        {
            $('#loader').show();
        },
        success: function(data)
        {

            console.log(data);

            var arregloDeSubCadenas = [];

            if (data == "Error_Query")
            {
                toastr.warning('La factura no cuenta con correo electronico asignado', 'Advertencia');

            }else

            {

            let parseJson = JSON.parse(data);    

            let Correo = parseJson['Factura'][0]['Correo'];

            separador = ",", // un espacio en blanco

            arregloDeSubCadenas = Correo.split(separador);


            for (var i = 0; i <= arregloDeSubCadenas.length - 1; i++)
            {
                console.log(arregloDeSubCadenas[i]);

                $('#Para_Correo').tagsinput('add', arregloDeSubCadenas[i]);
            }

            }



        }
    })
    .done(function() {
        console.log("success");
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        $('#loader').hide();
    });
    

});


$("#btn_Editar_Factura").click(function(){

        let Retencion_IVA = parseFloat($("#Retenciones_Invoice_IVA").text());
        let Retencion_ISR = parseFloat($("#Retenciones_Invoice_ISR").text());

        let Total_Retenciones_Invoice = Retencion_IVA + Retencion_ISR;
        

       let ID_Usuario               =  $("#ID_Usuario_Factura").val(); 
       let Emisor                   =  $("#txt_RazonSocial").val();
       let RFC_Emisor               =  $("#cmd_RFC_Emisor").val();
       let Clave_Regimen            =  $("#cmb_RegimenFiscal").val();
       let Regimen                  =  $("#cmb_RegimenFiscal").text();
       let Tipo_Comprobante         =  $("#id_Tipo_Comprobante").val();
       let RFC_Receptor             =  $("#id_RFC_receptor").val();
       let Receptor                 =  $("#id_RazonSocial_receptor").val();
       let Uso_CFDI                 =  $("#id_Tipo_Comprobante_receptor").val();
       let Uso_CFDI_Desc            =  $("#id_Tipo_Comprobante_receptor").text();

       let Subtotal                 = $("#Subtotal_Invoice").text();
       let Impuestos                = $("#Impuesto_Invoice").text();
       //let Retenciones              = $("#Retenciones_Invoice").text();
       let Retenciones              = parseFloat(Total_Retenciones_Invoice).toFixed(2);
       let Descuento                = $("#Descuento_Invoice").text();
       let Total                    = $("#Total_Invoice").text();
       let Observaciones            = $("#Observaciones").val();

       window.Folio_Factura         = $("#txt_Lugar_Folio").val();

       let Folio                    =  $("#txt_Lugar_Folio").val();
       let Forma_Pago               =  $("#cmd_Forma_Pago").val();
       let Lugar_Expedicion         =  $("#txt_Lugar_Expedicion").val();
       let Moneda                   =  $("#cmd_Moneda").val();
       let Metodo_Pago              =  $("#cmd_Metodo_Pago").val();
       let Serie                    =  $("#txt_Serie").val();
       let Tipo_Cambio              =  $("#txt_Tipo_Cambio").val();
       let Condicion_Pago           =  $("#txt_Condicion").val();

        var ObjDate = new Date();
        var Fecha = ObjDate.getFullYear() + "-" +  parseInt(ObjDate.getMonth() + 1) + "-" +  ObjDate.getDate() + " " +  ObjDate.getHours() + ":" + ObjDate.getMinutes() + ":" + ObjDate.getSeconds();

        var formData1 = new FormData();
        formData1.append("ID", window.ID_Insert_Factura_Generica);
        formData1.append("ID_Usuario", ID_Usuario);
        formData1.append("Fecha_Guardado", Fecha);
        formData1.append("Folio", Folio);
        formData1.append("Serie", Serie);
        formData1.append("Tipo_Comprobante", Tipo_Comprobante);
        formData1.append("TipoCambio", Tipo_Cambio);
        formData1.append("Forma_Pago", Forma_Pago);
        formData1.append("Moneda", Moneda);
        formData1.append("Metodo_Pago", Metodo_Pago);
        formData1.append("Receptor", Receptor);
        formData1.append("Receptor_RFC", RFC_Receptor);
        formData1.append("Uso_CFDI", Uso_CFDI);
        formData1.append("Emisor", Emisor);
        formData1.append("Emisor_RFC", RFC_Emisor);
        formData1.append("Lugar_Expedicion", Lugar_Expedicion);
        formData1.append("Clave_Regimen_Fiscal", Clave_Regimen);
        formData1.append("Regimen_Fiscal", Regimen.trim());
        formData1.append("Status", 'Guardado');
        formData1.append("Observaciones", Observaciones);
        formData1.append("Subtotal", Subtotal);
        formData1.append("Impuesto", Impuestos);
        formData1.append("Retenciones", Retenciones);
        formData1.append("Descuento", Descuento);
        formData1.append("Total", Total);

        swal({
          title: "¿Guardar Cambios?",
          text: "Una vez guardado los cambios no sera posible restablecer la infomación",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {

           $.ajax({
           url: dir + 'index.php/Controller_Factura_Generica/Editar_Factura_Generica',
           type: 'POST',
           processData: false,  // tell jQuery not to process the data
           contentType: false,
           timeout: 35000,
           //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
           data: formData1,
           beforeSend : function ()
            {
                $('#loader').show();
            },
            success: function(data)
            {
                console.log(data);

                if (data == 'correcto') {

                    $("#div_Timbrar_Factura").css('display', '');
                    $("#div_Guardar_Factura").css('display', 'none');

                    //swal("Correcto","La factura con el folio N° " + Folio + " fue guardada con exito", "success");
                }
                else
                {
                    //swal("Error","Hubo un problema al guardar la Factura, si el error persiste, comunicarse con soporte.", "error");

                    toastr.error('Hubo un problema al guardar la Factura, si el error persiste, comunicarse con soporte.', 'Error');
                }

            }
       })
       .done(function() {
           
           Eliminar_Factura_Detalle();
       })
       .fail(function() {
           console.log("error");
       })
       .always(function() {
       });


          }
        });
});


$("#txt_clave_unidad").change(function(e){

    let Clave_Unidad = $("#txt_clave_unidad").val();

$("#txt_clave_unidad").val(Clave_Unidad.toUpperCase());

});


$("#txt_Valor_Unitario").change(function(e){

    let Clave_Unidad = $("#txt_Valor_Unitario").val();

    $("#txt_Valor_Unitario").val(parseFloat(Clave_Unidad).toFixed(2));

});


$("#txt_Importe_iva_traslado").change(function(e){

     let Importe_IVA = $("#txt_Importe_iva_traslado").val();

    $("#txt_Importe_iva_traslado").val(parseFloat(Importe_IVA).toFixed(2));

});

$("#txt_Importe_iva_retencion").change(function(e){

     let Importe_Retencion = $("#txt_Importe_iva_retencion").val();

    $("#txt_Importe_iva_retencion").val(parseFloat(Importe_Retencion).toFixed(2));

});


//Al Cargar El Documento

        fetch_data('no','','','');
        fetch_data_Timbre('no','','','');

    $('#start_date_Ventas').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });
    $('#end_date_Ventas').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });

    $("#btn_buscar_venta_fecha").click(function(){

      var start_date = $('#start_date_Ventas').val();
      var end_date = $('#end_date_Ventas').val();
      var Status = $('#cmb_status_ventas').val();

      console.log(Status);


      if (start_date != '' && end_date != '') {

        $('#tabla_facturas_creadas').DataTable().destroy();

        fetch_data('yes', start_date, end_date,Status);

      }else{
        
        $('#tabla_facturas_creadas').DataTable().destroy();
        fetch_data('no','','','');
      }

    });

          
        $('#cmb_status_ventas').trigger('change'); //This event will fire the change event. 
        $('#cmb_status_ventas').change(function(){

          var start_date = $('#start_date_Ventas').val();
          var end_date = $('#end_date_Ventas').val();
          var data= $(this).val();

          console.log(data);

              if (data != '') {

                if (start_date != '' && end_date != '') 
                {
                    $('#tabla_facturas_creadas').DataTable().destroy();

                    fetch_data('yes', start_date, end_date,data);
                }

                else
                {
                    $('#tabla_facturas_creadas').DataTable().destroy();

                    fetch_data('no', start_date, end_date,data);
                }

              }else{

                 if (start_date != '' && end_date != '') 
                {
                    $('#tabla_facturas_creadas').DataTable().destroy();

                    fetch_data('yes', start_date, end_date,data);
                }

                else
                {
                    $('#tabla_facturas_creadas').DataTable().destroy();

                    fetch_data('no', start_date, end_date,data);
                }
                
              }          
        });


        $('#Facturas_Guardar').click(function(){

            $('#tabla_facturas_creadas').DataTable().destroy();
            fetch_data('no','','','');

        });


   $('#start_date_Factura').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });
    $('#end_date_Factura').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });

    $("#btn_buscar_Factura_fecha").click(function(){

      var start_date = $('#start_date_Factura').val();
      var end_date = $('#end_date_Factura').val();
      var Status = $('#cmb_status_Factura').val();

      console.log(Status);


      if (start_date != '' && end_date != '') {

        $('#tabla_facturas_Timbradas').DataTable().destroy();

        fetch_data_Timbre('yes', start_date, end_date,Status);

      }else{
        
        $('#tabla_facturas_Timbradas').DataTable().destroy();
        fetch_data_Timbre('no','','','');
      }

    });

          
        $('#cmb_status_Factura').trigger('change'); //This event will fire the change event. 
        $('#cmb_status_Factura').change(function(){

          var start_date = $('#start_date_Factura').val();
          var end_date = $('#end_date_Factura').val();
          var data= $(this).val();

          console.log(data);

              if (data != '') {

                if (start_date != '' && end_date != '') 
                {
                    $('#tabla_facturas_Timbradas').DataTable().destroy();

                    fetch_data_Timbre('yes', start_date, end_date,data);
                }

                else
                {
                    $('#tabla_facturas_Timbradas').DataTable().destroy();

                    fetch_data_Timbre('no', start_date, end_date,data);
                }

              }else{

                 if (start_date != '' && end_date != '') 
                {
                    $('#tabla_facturas_Timbradas').DataTable().destroy();

                    fetch_data_Timbre('yes', start_date, end_date,data);
                }

                else
                {
                    $('#tabla_facturas_Timbradas').DataTable().destroy();

                    fetch_data_Timbre('no', start_date, end_date,data);
                }
                
              }          
        });


        $('#Facturas_Timbradas').click(function(){

            $('#tabla_facturas_Timbradas').DataTable().destroy();
            fetch_data_Timbre('no','','','');

        });


        toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": true,
          "progressBar": true,
          "positionClass": "toast-top-right",
          "preventDuplicates": true,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "2500",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }



});

function Valor_Base()
{
    console.log("Valor_Base");

    let Tabla_Productos         = document.getElementById("Listado_Producto_Factura");
    let Tbody_Productos         = Tabla_Productos.getElementsByTagName("tbody")[0];
    let Cantidad_Productos      = Tbody_Productos.getElementsByTagName("tr").length;
    let Base_Impuesto           = 0;

    for (var i = 0; i <= Tbody_Productos.rows.length - 1; i++)
    {
       Base_Impuesto += parseFloat(Tbody_Productos.rows[i].cells[7].innerText);
    }

    console.log(Base_Impuesto);

    $("#txt_base_traslado").val(Base_Impuesto);

    console.log(Base_Impuesto);
}

//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][[][][][][][][][]
//                      [Metodos de Editan de la base de datos]
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][[][][][][][][][]

///////////////////////////////////////////////////////////////////////////////////////
////        Metodo Editar valores a la tabla de Factura Genrica                 //////
//////////////////////////////////////////////////////////////////////////////////////

function Editar_Factura_Generica_Detalle()
{
    let Cantidad;
    let Producto;
    let Clave_Unidad;
    let Clave_SAT;
    let Valor_Unitario;
    let Impuesto;
    let Retencion;
    let Descuento;
    let Importe;

    let myObj;

    let Tabla_Productos         = document.getElementById("Listado_Producto_Factura");
    let Tbody_Productos         = Tabla_Productos.getElementsByTagName("tbody")[0];
    let Cantidad_Productos      = Tbody_Productos.getElementsByTagName("tr").length;

    let Tabla_Detalle           = document.getElementById("Movimientos_Visualizar");
    let Tbody_Detalle           = Tabla_Detalle.getElementsByTagName("tbody")[0];
    let Cantidad_Detalle        = Tbody_Detalle.getElementsByTagName("tr").length;

    var Mov_Impuesto                   = [];
    var Mov_Impuesto_Clear             = [];
    var Mov_Retenciones_IVA            = [];
    var Mov_Retenciones_IVA_Clear      = [];
    var Mov_Retenciones_ISR            = [];
    var Mov_Retenciones_ISR_Clear      = [];

    var formData                = new FormData();  

        for (let i = 0; i <= Tbody_Detalle.rows.length -1; i++) 
        {
                Mov_Impuesto[i] = Tbody_Detalle.rows[i].cells[5].innerText;

               Mov_Impuesto_Clear[i] = Mov_Impuesto[i].slice(2);

                Mov_Retenciones_IVA[i] = Tbody_Detalle.rows[i].cells[6].innerText;

               Mov_Retenciones_IVA_Clear[i] = Mov_Retenciones_IVA[i].slice(2);

                Mov_Retenciones_ISR[i] = Tbody_Detalle.rows[i].cells[7].innerText;

               Mov_Retenciones_ISR_Clear[i] = Mov_Retenciones_ISR[i].slice(2);
        }

        for (let i = 0; i <= Tbody_Productos.rows.length -1; i++) 
        {

            var person = {
                ID_Factura_Generica:window.ID_Insert_Factura_Generica, 
                Cantidad:Tbody_Productos.rows[i].cells[1].innerText, 
                Producto:Tbody_Productos.rows[i].cells[5].innerText,
                Unidad:Tbody_Productos.rows[i].cells[2].innerText,
                Clave_Unidad:Tbody_Productos.rows[i].cells[3].innerText,
                Clave_SAT:Tbody_Productos.rows[i].cells[4].innerText,
                Valor_Unitario:Tbody_Productos.rows[i].cells[6].innerText,
                Impuesto:Mov_Impuesto_Clear[i],
                Retenciones_IVA: Mov_Retenciones_IVA_Clear[i],
                Retenciones_ISR: Mov_Retenciones_ISR_Clear[i],
                Descuento:Tbody_Productos.rows[i].cells[9].innerText,
                Importe:Tbody_Productos.rows[i].cells[7].innerText
                };

            formData.append('Movimiento['+i+']', JSON.stringify(person));
        }

    let ID_Factura_Detalle = window.ID_Insert_Factura_Generica;

    $.ajax({
        url: dir + 'index.php/Controller_Factura_Generica/Editar_Factura_Generica_Detalle',
           type: 'POST',
           processData: false,  // tell jQuery not to process the data
           contentType: false,
           timeout: 35000,
           //dataType: 'json',
           data: formData,
           beforeSend : function ()
            {
            },
            success: function(data)
            {               
                console.log(data);
            }
    })
    .done(function() {
        Eliminar_Impuesto_Factura();
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {

    if (jqXHR.status === 0) {

      console.log('Not connect: Verify Network.');

    } else if (jqXHR.status == 404) {

      console.log('Requested page not found [404]');

    } else if (jqXHR.status == 500) {

      console.log('Internal Server Error [500].');

    } else if (textStatus === 'parsererror') {

      console.log('Requested JSON parse failed.');

    } else if (textStatus === 'timeout') {

       console.log('Time out error.');

     } else if (textStatus === 'abort') {

       console.log('Ajax request aborted.');

     } else {

       console.log('Uncaught Error: ' + jqXHR.responseText);

     }

    })
    .always(function() {
    });
}

///////////////////////////////////////////////////////////////////////////////////////
////     FIN Metodo Editar valores a la tabla de Factura Genrica                 //////
//////////////////////////////////////////////////////////////////////////////////////

//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][[][][][][][][][]
//                      [FIN Metodos de Editan de la base de datos]
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][[][][][][][][][]


//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][[][][][][][][][]
//                      [Metodos de Eliminar de la base de datos]
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][[][][][][][][][]

///////////////////////////////////////////////////////////////////////////////////////
////        Metodo Eliminar valores a la tabla de Impuestos Factura             //////
//////////////////////////////////////////////////////////////////////////////////////

function Eliminar_Impuesto_Factura()
{
    var formData            = new FormData();  
    formData.append("ID", window.ID_Insert_Factura_Generica);

    $.ajax({
        url: dir + 'index.php/Controller_Factura_Generica/Eliminar_Impuesto_Factura',
        type: 'POST',
        processData: false,  // tell jQuery not to process the data
        contentType: false,
        timeout: 35000,
        //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
        data: formData,
        beforeSend : function ()
            {
            },
            success: function(data)
            {               
                console.log(data);

            }
    })
    .done(function() {

        Insert_Impuestos_Factura_Generica();
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {

    if (jqXHR.status === 0) {

      console.log('Not connect: Verify Network.');

    } else if (jqXHR.status == 404) {

      console.log('Requested page not found [404]');

    } else if (jqXHR.status == 500) {

      console.log('Internal Server Error [500].');

    } else if (textStatus === 'parsererror') {

      console.log('Requested JSON parse failed.');

    } else if (textStatus === 'timeout') {

       console.log('Time out error.');

     } else if (textStatus === 'abort') {

       console.log('Ajax request aborted.');

     } else {

       console.log('Uncaught Error: ' + jqXHR.responseText);

     }

    })
    .always(function() {
        console.log("complete");

            Eliminar_Factura_Relacion();         
    });
}

///////////////////////////////////////////////////////////////////////////////////////
////       FIN Metodo Eliminar valores a la tabla de Impuestos Factura           //////
//////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
////        Metodo Eliminar valores a la tabla de Factura Detalle               //////
//////////////////////////////////////////////////////////////////////////////////////

function Eliminar_Factura_Detalle()
{
    var formData            = new FormData();  
    formData.append("ID", window.ID_Insert_Factura_Generica);

    $.ajax({
        url: dir + 'index.php/Controller_Factura_Generica/Eliminar_Factura_Detalle',
        type: 'POST',
        processData: false,  // tell jQuery not to process the data
        contentType: false,
        timeout: 35000,
        //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
        data: formData,
        beforeSend : function ()
            {
            },
            success: function(data)
            {               
                console.log(data);

            }
    })
    .done(function() {

        Insert_Detalle_Factura_Generica();

    })
    .fail( function( jqXHR, textStatus, errorThrown ) {

    if (jqXHR.status === 0) {

      console.log('Not connect: Verify Network.');

    } else if (jqXHR.status == 404) {

      console.log('Requested page not found [404]');

    } else if (jqXHR.status == 500) {

      console.log('Internal Server Error [500].');

    } else if (textStatus === 'parsererror') {

      console.log('Requested JSON parse failed.');

    } else if (textStatus === 'timeout') {

       console.log('Time out error.');

     } else if (textStatus === 'abort') {

       console.log('Ajax request aborted.');

     } else {

       console.log('Uncaught Error: ' + jqXHR.responseText);

     }

    })
    .always(function() {
        console.log("complete");
    });
}

///////////////////////////////////////////////////////////////////////////////////////
////    FIN Metodo Eliminar valores a la tabla de Factura Detalle               //////
//////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
////        Metodo Eliminar valores a la tabla de Factura Relacion  CFDI        //////
//////////////////////////////////////////////////////////////////////////////////////

function Eliminar_Factura_Relacion()
{
    var formData            = new FormData();  
    formData.append("ID", window.ID_Insert_Factura_Generica);

    $.ajax({
        url: dir + 'index.php/Controller_Factura_Generica/Eliminar_Factura_Relacion',
        type: 'POST',
        processData: false,
        contentType: false,
        timeout: 35000,
        data: formData,
        beforeSend : function ()
            {
            },
            success: function(data)
            {               
                console.log(data);

            }
    })
    .done(function() {

        Insert_CFDI_Relacionado();
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {

    if (jqXHR.status === 0) {

      console.log('Not connect: Verify Network.');

    } else if (jqXHR.status == 404) {

      console.log('Requested page not found [404]');

    } else if (jqXHR.status == 500) {

      console.log('Internal Server Error [500].');

    } else if (textStatus === 'parsererror') {

      console.log('Requested JSON parse failed.');

    } else if (textStatus === 'timeout') {

       console.log('Time out error.');

     } else if (textStatus === 'abort') {

       console.log('Ajax request aborted.');

     } else {

       console.log('Uncaught Error: ' + jqXHR.responseText);

     }

    })
    .always(function() {
        console.log("complete");
    });
    
}

///////////////////////////////////////////////////////////////////////////////////////
////    FIN Metodo Eliminar valores a la tabla de Factura Relacion  CFDI        //////
//////////////////////////////////////////////////////////////////////////////////////

//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][[][][][][][][][]
//                      [FIN Metodos de Eliminar de la base de datos]
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][[][][][][][][][]


//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][[][][][][][][][]
//                      [Metodos de Insertar a la base de datos]
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][[][][][][][][][]

///////////////////////////////////////////////////////////////////////////////////////
////        Metodo Insetar valores a la tabla de Factura Detalle Factura        //////
//////////////////////////////////////////////////////////////////////////////////////

function Insert_Detalle_Factura_Generica()
{
    let Cantidad;
    let Producto;
    let Clave_Unidad;
    let Clave_SAT;
    let Valor_Unitario;
    let Impuesto;
    let Retencion;
    let Descuento;
    let Importe;

    let myObj;

    let Tabla_Productos         = document.getElementById("Listado_Producto_Factura");
    let Tbody_Productos         = Tabla_Productos.getElementsByTagName("tbody")[0];
    let Cantidad_Productos      = Tbody_Productos.getElementsByTagName("tr").length;

    let Tabla_Detalle           = document.getElementById("Movimientos_Visualizar");
    let Tbody_Detalle           = Tabla_Detalle.getElementsByTagName("tbody")[0];
    let Cantidad_Detalle        = Tbody_Detalle.getElementsByTagName("tr").length;

    var Mov_Impuesto                   = [];
    var Mov_Impuesto_Clear             = [];
    var Mov_Retenciones_IVA            = [];
    var Mov_Retenciones_IVA_Clear      = [];
    var Mov_Retenciones_ISR            = [];
    var Mov_Retenciones_ISR_Clear      = [];

    var formData                       = new FormData();  

        for (let i = 0; i <= Tbody_Detalle.rows.length -1; i++) 
        {
                Mov_Impuesto[i] = Tbody_Detalle.rows[i].cells[5].innerText;

               Mov_Impuesto_Clear[i] = Mov_Impuesto[i].slice(2);

               Mov_Retenciones_IVA[i] = Tbody_Detalle.rows[i].cells[6].innerText;

               Mov_Retenciones_IVA_Clear[i] = Mov_Retenciones_IVA[i].slice(2);

                Mov_Retenciones_ISR[i] = Tbody_Detalle.rows[i].cells[7].innerText;

               Mov_Retenciones_ISR_Clear[i] = Mov_Retenciones_ISR[i].slice(2);
        }

        for (let i = 0; i <= Tbody_Productos.rows.length -1; i++) 
        {

            var person = {
                ID_Factura_Generica:window.ID_Insert_Factura_Generica, 
                Cantidad:Tbody_Productos.rows[i].cells[1].innerText, 
                Producto:Tbody_Productos.rows[i].cells[5].innerText,
                Unidad:Tbody_Productos.rows[i].cells[2].innerText,
                Clave_Unidad:Tbody_Productos.rows[i].cells[3].innerText,
                Clave_SAT:Tbody_Productos.rows[i].cells[4].innerText,
                Valor_Unitario:Tbody_Productos.rows[i].cells[6].innerText,
                Impuesto:Mov_Impuesto_Clear[i],
                Retenciones_IVA: Mov_Retenciones_IVA_Clear[i],
                Retenciones_ISR: Mov_Retenciones_ISR_Clear[i],
                Descuento:Tbody_Productos.rows[i].cells[9].innerText,
                Importe:Tbody_Productos.rows[i].cells[7].innerText
                };

            formData.append('Movimiento['+i+']', JSON.stringify(person));
        }

    let ID_Factura_Detalle = window.ID_Insert_Factura_Generica;

    $.ajax({
        url: dir + 'index.php/Controller_Factura_Generica/Guardar_Factura_Generica_Detalle',
           type: 'POST',
           processData: false,
           contentType: false,
           timeout: 35000,
           data: formData,
           beforeSend : function ()
            {
            },
            success: function(data)
            {               
                console.log(data);
            }
    })
    .done(function() {

        Eliminar_Impuesto_Factura();
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {

    if (jqXHR.status === 0) {

      console.log('Not connect: Verify Network.');

    } else if (jqXHR.status == 404) {

      console.log('Requested page not found [404]');

    } else if (jqXHR.status == 500) {

      console.log('Internal Server Error [500].');

    } else if (textStatus === 'parsererror') {

      console.log('Requested JSON parse failed.');

    } else if (textStatus === 'timeout') {

       console.log('Time out error.');

     } else if (textStatus === 'abort') {

       console.log('Ajax request aborted.');

     } else {

       console.log('Uncaught Error: ' + jqXHR.responseText);

     }

    })
    .always(function() {
        
    });
}

///////////////////////////////////////////////////////////////////////////////////////
////      FIN Metodo Insetar valores a la tabla de Factura Detalle Factura       //////
//////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
////            Metodo Insetar valores a la tabla de Impuestos                  //////
//////////////////////////////////////////////////////////////////////////////////////

function Insert_Impuestos_Factura_Generica()
{
    var json_arr            = JSON.stringify(window.objgeneral['Impuestos']);

    var formData            = new FormData();  
    formData.append("ID", window.ID_Insert_Factura_Generica);
    formData.append("Impuesto_Mov", json_arr);

    $.ajax({
        url: dir + 'index.php/Controller_Factura_Generica/Guardar_Impuestos_Factura_Generica',
        type: 'POST',
        processData: false,
        contentType: false,
        timeout: 35000,
        data:formData,
        beforeSend : function ()
            {
            },
            success: function(data)
            {  

                console.log(data);  

                    if (data == 1)
                    {
                        //swal("Correcto","La factura con el folio N° " + window.Folio_Factura + " fue guardada con exito", "success");
                        toastr.success("La factura con el folio N° " + window.Folio_Factura + " fue guardada con exito", 'Correcto');
                    }
                    else
                    {
                        //swal("Error","Error al almacenar los movimientos de la factura","error");
                        toastr.error('Error al almacenar los movimientos de la factura', 'Error');
                    } 
            }
    })
    .done(function() {
    
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {

    if (jqXHR.status === 0) {

      console.log('Not connect: Verify Network.');

    } else if (jqXHR.status == 404) {

      console.log('Requested page not found [404]');

    } else if (jqXHR.status == 500) {

      console.log('Internal Server Error [500].');

    } else if (textStatus === 'parsererror') {

      console.log('Requested JSON parse failed.');

    } else if (textStatus === 'timeout') {

       console.log('Time out error.');

     } else if (textStatus === 'abort') {

       console.log('Ajax request aborted.');

     } else {

       console.log('Uncaught Error: ' + jqXHR.responseText);

     }

    })
    .always(function() {
        
        $('#loader').hide();
    });
    

}

///////////////////////////////////////////////////////////////////////////////////////
////       FIN  Metodo Insetar valores a la tabla de Impuestos                  //////
//////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////
////            Metodo Insetar valores a la tabla de relacion CFDI               //////
//////////////////////////////////////////////////////////////////////////////////////

function Insert_CFDI_Relacionado()
{
    let Contador        = 0;
    var array_Relacion  = [];
    let Listado_UUID    = document.getElementById("Listado_UUID");
    let formData        = new FormData();
    let id              = window.ID_Insert_Factura_Generica;

    for(let x=0; x<Listado_UUID.childNodes.length; x++)
    {
        if(Listado_UUID.childNodes[x].tagName == "DIV")
        {
            formData.append("UUID_" + Contador ,Listado_UUID.childNodes[x].childNodes[1].innerText);
            formData.append("Tipo_" + Contador ,Listado_UUID.childNodes[x].childNodes[2].innerText);
            formData.append("ID",id);
        }

            Contador ++;
    }

    $.ajax({
        url: dir + 'index.php/Controller_Factura_Generica/Guardar_Relacion_Factura_Generica',
        type: 'POST',
        processData: false,
        contentType: false,
        timeout: 35000,
        data: formData,
        beforeSend : function ()
        {
        },
        success: function(data)
        {  

            console.log(data);      

        }
    })
    .done(function() {
        console.log("success");
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {

    if (jqXHR.status === 0) {

      console.log('Not connect: Verify Network.');

    } else if (jqXHR.status == 404) {

      console.log('Requested page not found [404]');

    } else if (jqXHR.status == 500) {

      console.log('Internal Server Error [500].');

    } else if (textStatus === 'parsererror') {

      console.log('Requested JSON parse failed.');

    } else if (textStatus === 'timeout') {

       console.log('Time out error.');

     } else if (textStatus === 'abort') {

       console.log('Ajax request aborted.');

     } else {

       console.log('Uncaught Error: ' + jqXHR.responseText);

     }

    })
    .always(function() {
        
    });
}

///////////////////////////////////////////////////////////////////////////////////////
////        FIN Metodo Insetar valores a la tabla de relacion CFDI               //////
//////////////////////////////////////////////////////////////////////////////////////

//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][[][][][][][][][]
//                      [ FIN Metodos de Insertar a la base de datos]
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][[][][][][][][][]


/*************************************************************************************/
/*************** Metodos Para agilizar el Funcionamiento de las tablas ***************/
/*************************************************************************************/


///////////////////////////////////////////////////////////////////////////////////////
////        Metodo del DataTable para la tabla de facturas creadas              //////
//////////////////////////////////////////////////////////////////////////////////////

function fetch_data(is_date_search, start_date='', end_date='',Status=''){

      var dataTable = $('#tabla_facturas_creadas').DataTable({
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
                    "targets": 11,
                    'render': function (data, type, full, meta)
                    {
                        console.log(full[0]);

                       return "<button data-toggle='tooltip' title='Ver Detalle de la Factura' type='button' id='btn_ver_"+ full[0] +"' onclick='GetVer("+full[0]+");' class='pdf btn btn-default btn-sm'><i class='fa fa-eye'></i> </button> <button data-toggle='tooltip' title='Timbrar Factura' type='button' id='btn_facturar_"+ full[0] +"' onclick='GetIDFactura("+full[0]+");' class='btn btn-success btn-sm'><i class='fa fa-credit-card'></i></button>  <button data-toggle='tooltip' title='Eliminar Factura' type='button' id='btn_eliminar_facturar_"+ full[0] +"' onclick='GetEliminarFactura("+full[0]+");' class='btn btn-danger btn-sm'><i class='fa fa-trash-o' aria-hidden='true'></i></button>";
                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                }
            ],
        "order" : [],
        "ajax" : {

            url: dir + "Clases/fetch_Facturas_Creadas.php",
            type: "POST",
            data:{
              is_date_search:is_date_search, start_date:start_date, end_date:end_date, Status:Status
            }
        }
      });
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    ////    FIN Metodo del DataTable para la tabla de facturas creadas              //////
    //////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////
    ////        Metodo del DataTable para la tabla de facturas timbradas             //////
    //////////////////////////////////////////////////////////////////////////////////////

    function fetch_data_Timbre(is_date_search, start_date='', end_date='',Status=''){

      var dataTable = $('#tabla_facturas_Timbradas').DataTable({
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
                        console.log(full[0]);

                        let info = "<button style='margin-left: 5px; margin-top: 2px;' data-toggle='tooltip' title='Generar PDF' type='button' id='btn_pdf_"+ full[0] +"' onclick='getRutaPDF("+full[0]+");' class='pdf btn btn-danger btn-sm'><i class='fa fa-file-pdf-o' aria-hidden='true'></i></button> <button style='margin-left: 5px; margin-top: 2px;' data-toggle='tooltip' title='Generar XML' type='button' id='btn_xml_"+ full[0] +"' onclick='getRutaXML("+full[0]+");' class='btn btn-primary btn-sm'><i class='fa fa-file-code-o' aria-hidden='true'></i></button> <button style='margin-left: 5px; margin-top: 2px;' data-toggle='tooltip' title='Enviar Factura' type='button' id='btn_correo_"+ full[0] +"' onclick='GetIDCorreo("+full[0]+");' class='btn btn-default btn-sm'><i class='fa fa-envelope'></i></button>";

                        if (full[5] == 'Cancelado')
                        {
                            info = "<button style='margin-left: 5px; margin-top: 2px;' data-toggle='tooltip' title='Recuperar Acuse' type='button' id='btn_Acuse_"+ full[0] +"' onclick='getAcuse_Cancelacion("+full[0]+");' class='pdf btn btn-primary btn-sm'><i class='fa fa-download'></i></button>";
                        }
                        else
                        {
                            info += "<button style='margin-left: 5px; margin-top: 2px;' data-toggle='tooltip' title='Cancelar Factura' type='button' id='btn_Cancelar_"+ full[0] +"' onclick='getCancelar_Factura("+full[0]+");' class='pdf btn btn-danger btn-sm'><i class='fa fa-ban'></i></button>";
                        }

                       return info;
                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                }
            ],
        "order" : [],
        "ajax" : {

            url: dir + "Clases/fetch_Facturas_Timbradas.php",
            type: "POST",
            data:{
              is_date_search:is_date_search, start_date:start_date, end_date:end_date, Status:Status
            }
        }
      });
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    ////    FIN Metodo del DataTable para la tabla de facturas timbradas             //////
    //////////////////////////////////////////////////////////////////////////////////////



/*************************************************************************************/
/*************** Metodos Para Pura Visualización del Documento a Timbrar *************/
/*************************************************************************************/


///////////////////////////////////////////////////////////////////////////////////////
////  Metodo Muestra los Totales de la Factura antes de Previsualizarla         //////
//////////////////////////////////////////////////////////////////////////////////////

function Alerts_Conceptos ()
{

    let Tabla_Productos         = document.getElementById("Listado_Producto_Factura");
    let Tbody_Productos         = Tabla_Productos.getElementsByTagName("tbody")[0];
    let Cantidad_Productos      = Tbody_Productos.getElementsByTagName("tr").length;

    let Tabla_Impuestos         = document.getElementById("table-Impuestos");
    let Tbody_Impuestos         = Tabla_Impuestos.getElementsByTagName("tbody")[0];
    let Cantidad_Impuestos      = Tbody_Impuestos.getElementsByTagName("tr").length;


    window.Subtotal_Factura
    window.Descuento_Factura
    window.Impuesto_Factura
    window.Retencion_Factura
    window.Total_Factura
    window.Total_Productos_Factura

    let Cantidad        = 0;
    let Precio          = 0;
    let Precio_Desc     = 0;
    let Descuento_Mov   = 0;
    let Descuento       = 0;
    let Descuento_Linea = 0;
    let Importe         = 0;
    let Impuesto_Mov    = 0;
    let Impuesto        = 0;
    let Retenciones_Mov = 0;
    let Retenciones     = 0;
    let Total_Fac       = 0;
    let Subtotal_Fac    = 0;
    let IVA_Mov         = 0;
    let IVA             = 0;
    let Importe_IVA     = 0;


    window.Impuesto_Factura_Valor               = 0;
    window.Tipo_Factor_Factura                  = 0;
    window.Tasa_Cuota_Factura                   = 0;
    window.Tipo_Factura                         = 0;

    window.Impuesto_Factura_Valor_Retencion     = 0;
    window.Tipo_Factor_Factura_Retencion        = 0;
    window.Tasa_Cuota_Factura_Retencion         = 0;
    window.Tipo_Factura_Retencion               = 0;

    for (let i = 0; i <= Tbody_Impuestos.rows.length - 1; i++)
    {
        let Tipo_Impuesto = Tbody_Impuestos.rows[i].cells[5].childNodes[0].innerText;

        if (Tipo_Impuesto == 'Traslado')
        {
            window.Tipo_Factura             = Tipo_Impuesto;
            window.Impuesto_Factura_Valor   = parseFloat(Tbody_Impuestos.rows[i].cells[1].innerText).toFixed(2);
            window.Tipo_Factor_Factura      = parseFloat(Tbody_Impuestos.rows[i].cells[2].innerText).toFixed(2);
            window.Tasa_Cuota_Factura       = parseFloat(Tbody_Impuestos.rows[i].cells[3].innerText) / 100;

        }
        else
        {
            window.Tipo_Factura_Retencion             = Tipo_Impuesto;
            window.Impuesto_Factura_Valor_Retencion   = parseFloat(Tbody_Impuestos.rows[i].cells[1].innerText).toFixed(2);
            window.Tipo_Factor_Factura_Retencion      = parseFloat(Tbody_Impuestos.rows[i].cells[2].innerText).toFixed(2);
            window.Tasa_Cuota_Factura_Retencion       = parseFloat(Tbody_Impuestos.rows[i].cells[3].innerText) / 100;

            Retenciones_Mov                           += parseFloat(Tbody_Impuestos.rows[i].cells[0].innerText).toFixed(2) * window.Tasa_Cuota_Factura_Retencion;
        }

    }

    for (let i = 0; i <= Tbody_Productos.rows.length - 1; i++)
    {

            Cantidad                        = parseFloat(Tbody_Productos.rows[i].cells[1].innerText).toFixed(2);
            Precio                          = parseFloat(Tbody_Productos.rows[i].cells[6].innerText).toFixed(2);
            Importe_Mov                     = Cantidad * Precio;
            Importe                         += Cantidad * Precio;
            Descuento_Mov                   = parseFloat(Tbody_Productos.rows[i].cells[8].innerText) / 100;
            Descuento                       = Importe_Mov * Descuento_Mov;
            Descuento_Linea                 += Importe_Mov * Descuento_Mov;
            Precio_Desc                     = Importe_Mov - Descuento;
            Subtotal_Fac                    += Precio_Desc;
            IVA_Mov                         += parseFloat(Precio_Desc * window.Tasa_Cuota_Factura);
            IVA                             = parseFloat(Precio_Desc * window.Tasa_Cuota_Factura);
            Total_Fac                       += (Precio_Desc - Retenciones_Mov) + IVA;
    }


    if (Cantidad_Productos > 0) {

        $("#Alert_Advertencia").css('display','none');
        $("#Alert_Concepto").css('display','');
        $("#Alert_Infomacion").css('display','');
        $('#Alert_Subtotal').text("$ " + parseFloat(Importe).toFixed(2));
        $('#Alert_Descuento').text("$ " + parseFloat(Descuento_Linea).toFixed(2));
        $('#Alert_Impuesto').text("$ " + parseFloat(IVA_Mov).toFixed(2));
        $('#Alert_Retencion').text("$ " + parseFloat(Retenciones_Mov).toFixed(2));
        $('#Alert_Total').text("$ " + parseFloat(Total_Fac).toFixed(2));
        $('#Alert_Total_Productos').text(Cantidad_Productos);
    }
    else if (Cantidad_Impuestos > 0)
    {
        $("#Alert_Advertencia").css('display','none');
        $("#Alert_Concepto").css('display','');
        $("#Alert_Infomacion").css('display','');
        $('#Alert_Subtotal').text("$ " + parseFloat(Importe).toFixed(2));
        $('#Alert_Descuento').text("$ " + parseFloat(Descuento_Linea).toFixed(2));
        $('#Alert_Impuesto').text("$ " + parseFloat(IVA_Mov).toFixed(2));
        $('#Alert_Retencion').text("$ " + parseFloat(Retenciones_Mov).toFixed(2));
        $('#Alert_Total').text("$ " + parseFloat(Total_Fac).toFixed(2));
        $('#Alert_Total_Productos').text(Cantidad_Productos);

    }
    else
    {
        $("#Alert_Advertencia").css('display','');
        $("#Alert_Concepto").css('display','none');
        $("#Alert_Infomacion").css('display','none');
    }
}

///////////////////////////////////////////////////////////////////////////////////////
////  FIN Metodo Muestra los Totales de la Factura antes de Previsualizarla      //////
//////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
////  Metodo Obtener Metodo de Pago para la Previsualización de la Factura      //////
//////////////////////////////////////////////////////////////////////////////////////

function Metodo_Pago_Metodo(Metodo_Pago_Invoice)
{

    var Metodo_Valor = "";

    if (Metodo_Pago_Invoice == 'PUE')
    {

        Metodo_Valor = 'Pago en una sola exhibicion';

        return Metodo_Valor;

    }else if (Metodo_Pago_Invoice == 'PPD')
    {
        Metodo_Valor = 'Pago en parcialidades o diferido';

        return Metodo_Valor;
    }

}

///////////////////////////////////////////////////////////////////////////////////////
////  FIN  Metodo Obtener Metodo de Pago para la Previsualización de la Factura  //////
//////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
////       Metodo Obtener Moneda para la Previsualización de la Factura        ////////
//////////////////////////////////////////////////////////////////////////////////////

function Moneda_Metodo(Moneda_Invoice)
{

    var Moneda_Valor = "";

     switch (Moneda_Invoice)
     {
      case 'MXN':
        Moneda_Valor = "Peso Mexicano";

        return Moneda_Valor;

        break;
      case 'USD':
        Moneda_Valor = "Dolar americano";

        return Moneda_Valor;

        break;
      case 'EUR':
        Moneda_Valor = "Euro";

        return Moneda_Valor;

        break;
      }
}


///////////////////////////////////////////////////////////////////////////////////////
////     FIN  Metodo Obtener Moneda para la Previsualización de la Factura     ////////
//////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////
////   Metodo Obtener Forma de Pago para la Previsualización de la Factura    ////////
//////////////////////////////////////////////////////////////////////////////////////

function Forma_Pago_Metodo(Forma_Pago_Invoice){

    var Forma_Valor = "";

    switch (Forma_Pago_Invoice) {
      case '99':
        Forma_Valor = "Por definir";

        return Forma_Valor;

        break;
      case '01':
        Forma_Valor = "Efectivo";

        return Forma_Valor;

        break;
      case '02':
        Forma_Valor = "Cheque nominativo";

        return Forma_Valor;

        break;
      case '03':
        Forma_Valor = "Transferencia electrónica de fondos";

        return Forma_Valor;

        break;
      case '04':
        Forma_Valor = "Tarjeta de crédito";

        return Forma_Valor;

        break;
      case '05':
        Forma_Valor = "Monedero electrónico";

        return Forma_Valor;

        break;
      case '06':
        Forma_Valor = "Dinero electrónico";

        return Forma_Valor;

        break;
      case '08':
        Forma_Valor = "Vales de despensa";

        return Forma_Valor;

        break;
      case '12':
        Forma_Valor = "Dación en pago";

        return Forma_Valor;

        break;
      case '13':
        Forma_Valor = "Pago por subrogación";

        return Forma_Valor;

        break;
      case '14':
        Forma_Valor = "Pago por consignación";

        return Forma_Valor;

        break;
      case '15':
        Forma_Valor = "Condonación";

        return Forma_Valor;

        break;
      case '17':
        Forma_Valor = "Compensación";

        return Forma_Valor;

        break;
      case '23':
        Forma_Valor = "Novación";

        return Forma_Valor;

        break;
      case '24':
        Forma_Valor = "Confusión";

        return Forma_Valor;

        break;
      case '25':
        Forma_Valor = "Remisión de deuda";

        return Forma_Valor;

        break;
      case '26':
        Forma_Valor = "Prescripción o caducidad";

        return Forma_Valor;

        break;
      case '27':
        Forma_Valor = "A satisfacción del acreedor";

        return Forma_Valor;

        break;
      case '28':
        Forma_Valor = "Tarjeta de débito";

        return Forma_Valor;

        break;
      case '29':
        Forma_Valor = "Tarjeta de servicios";

        return Forma_Valor;

        break;
      case '30':
        Forma_Valor = "Aplicación de anticipos";

        return Forma_Valor;

        break;
        case '31':
        Forma_Valor = "Intermediario pagos";

        return Forma_Valor;

        break;

    }
}

///////////////////////////////////////////////////////////////////////////////////////
//// FIN  Metodo Obtener Forma de Pago para la Previsualización de la Factura  ////////
//////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
////    Metodo Obtener Uso del CFDI para la Previsualización de la Factura    /////////
//////////////////////////////////////////////////////////////////////////////////////

function Uso_CFDI(Tipo_Comprobante){

    var Uso_Valor = "";

    switch (Tipo_Comprobante)
     {
        case 'P01':
        Uso_Valor = "Por definir";

        return Uso_Valor;

        break;
        case 'G01':
        Uso_Valor = "Adquisición de mercancias";

        return Uso_Valor;

        break;
        case 'G02':
        Uso_Valor = "Devoluciones, descuentos o bonificaciones";

        return Uso_Valor;

        break;
        case 'G03':
        Uso_Valor = "Gastos en general";

        return Uso_Valor;

        break;
        case 'I01':
        Uso_Valor = "Construcciones";

        return Uso_Valor;

        break;
        case 'I02':
        Uso_Valor = "Mobilario y equipo de oficina por inversiones";

        return Uso_Valor;

        break;
        case 'I03':
        Uso_Valor = "Equipo de transporte";

        return Uso_Valor;

        break;
        case 'I04':
        Uso_Valor = "Equipo de computo y accesorios";

        return Uso_Valor;

        break;
        case 'I05':
        Uso_Valor = "Dados, troqueles, moldes, matrices y herramental";

        return Uso_Valor;

        break;
        case 'I06':
        Uso_Valor = "Comunicaciones telefónicas";

        return Uso_Valor;

        break;
        case 'I07':
        Uso_Valor = "Comunicaciones satelitales";

        return Uso_Valor;

        break;
        case 'I08':
        Uso_Valor = "Otra maquinaria y equipo";

        return Uso_Valor;

        break;
        case 'D01':
        Uso_Valor = "Honorarios médicos, dentales y gastos hospitalarios";

        return Uso_Valor;

        break;
        case 'D02':
        Uso_Valor = "Gastos médicos por incapacidad o discapacidad";

        return Uso_Valor;

        break;
        case 'D03':
        Uso_Valor = "Gastos funerales";

        return Uso_Valor;

        break;
        case 'D04':
        Uso_Valor = "Donativos";

        return Uso_Valor;

        break;
        case 'D05':
        Uso_Valor = "Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)";

        return Uso_Valor;

        break;
        case 'D06':
        Uso_Valor = "Aportaciones voluntarias al SAR";

        return Uso_Valor;

        break;
        case 'D07':
        Uso_Valor = "Primas por seguros de gastos médicos";

        return Uso_Valor;

        break;
        case 'D08':
        Uso_Valor = "Gastos de transportación escolar obligatoria";

        return Uso_Valor;

        break;
        case 'D09':
        Uso_Valor = "Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones";

        return Uso_Valor;

        break;
        case 'D10':
        Uso_Valor = "Pagos por servicios educativos (colegiaturas)";

        return Uso_Valor;

        break;
      }

}

///////////////////////////////////////////////////////////////////////////////////////
////  FIN  Metodo Obtener Uso del CFDI para la Previsualización de la Factura  /////////
//////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
////  Metodo Obtener Tipo Comprobante para la Previsualización de la Factura  /////////
//////////////////////////////////////////////////////////////////////////////////////

function Comprobante(Comprobante){

    var Tipo_Valor = "";

    if (Comprobante == "Ingreso")
    {
      Tipo_Valor = "I";

      return Tipo_Valor;

    }else if (Comprobante == "Egreso")

    {

      Tipo_Valor = "E";

      return Tipo_Valor;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
//// FIN Metodo Obtener Tipo Comprobante para la Previsualización de la Factura  /////////
////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
/////////                        Metodo Obtener Fecha Actual              ////////////
//////////////////////////////////////////////////////////////////////////////////////

function ActualizarFecha(){

        var fecha = new Date();

        var mesok = new Array(12);
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

        $('#Fecha_Actual').text(fecha.getDate() + " de " + mesok[fecha.getMonth()] + " del " + fecha.getFullYear() + "  " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds());
    }
///////////////////////////////////////////////////////////////////////////////////////
/////////                    FIN Metodo Obtener Fecha Actual              ////////////
//////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////
/////////                        Metodo Descargar PDF                     ////////////
//////////////////////////////////////////////////////////////////////////////////////

function getRutaPDF($id)
{
    window.open(""+dir+"Clases/Reportes/Formato_Factura_Generica_33.php?ID="+$id+"");
}

///////////////////////////////////////////////////////////////////////////////////////
/////////                     FIN Metodo Descargar PDF                     ///////////
//////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////
/////////                      Metodo Descargar XML                       ////////////
//////////////////////////////////////////////////////////////////////////////////////

function getRutaXML($id)
{
    window.open(""+dir+"Clases/Recuperar_XML_Generico.php?ID="+$id+"");
}

///////////////////////////////////////////////////////////////////////////////////////
/////////                     FIN Metodo Descargar XML                     ///////////
//////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////
/////////                      Metodo Recuperar Acuse                     ////////////
//////////////////////////////////////////////////////////////////////////////////////

function getAcuse_Cancelacion(id)
{

    console.log(id);

    var formData = new FormData(); 
    formData.append("ID", id);

    swal({
      title: "¿Recuperar Acuse de Cancelación?",
      text: "",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

            $.ajax({
            url: dir + 'index.php/Controller_Factura_Generica/Acuse_Cancelacion',
            type: 'POST',
            processData: false,
            contentType: false,
            timeout: 35000,
            data: formData,
            beforeSend : function ()
            {
                $('#loader').show();
            },
            success: function(data)
            {
                console.log(data);

                if (data == 1)
                {
                    //swal("Correcto!", "Acuse descargado con exito!", "success");    
                    toastr.success('Acuse descargado con exito', 'Correcto');
                }
                else
                {
                    //swal("Error", "Ocurrio un problema al recuperar el acuse de cancelación", "error");   
                    toastr.error('Ocurrio un problema al recuperar el acuse de cancelación', 'Error'); 
                }    
            }

            })
            .done(function() {

                window.open(dir + "Clases/RecuperarAcuseGenerica.php?ID=" + id);
            })
             .fail( function( jqXHR, textStatus, errorThrown ) {

            if (jqXHR.status === 0) {

              console.log('Not connect: Verify Network.');

            } else if (jqXHR.status == 404) {

              console.log('Requested page not found [404]');

            } else if (jqXHR.status == 500) {

              console.log('Internal Server Error [500].');

            } else if (textStatus === 'parsererror') {

              console.log('Requested JSON parse failed.');

            } else if (textStatus === 'timeout') {

               console.log('Time out error.');

             } else if (textStatus === 'abort') {

               console.log('Ajax request aborted.');

             } else {

               console.log('Uncaught Error: ' + jqXHR.responseText);

             }

            })
            .always(function() {
                $('#loader').hide();
            });

      } else {
        
      }
    });
}

///////////////////////////////////////////////////////////////////////////////////////
/////////                   FIN Metodo Recuperar Acuse                     ////////////
//////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////
/////////                     Metodo Eliminar Factura Creada                ///////////
//////////////////////////////////////////////////////////////////////////////////////

function GetEliminarFactura(id)
{
    console.log(id);

    var formData = new FormData(); 
    formData.append("ID", id);

    swal({
      title: "¿Esta seguro?",
      text: "Una vez eliminada la factura no sera posible restaurarla",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

        $.ajax({
        url: dir + 'index.php/Controller_Factura_Generica/Eliminar_Factura_Creada',
        type: 'POST',
        processData: false,
        contentType: false,
        timeout: 35000,
        data: formData,
        beforeSend : function ()
        {
            $('#loader').show();
        },
        success: function(data)
        {
            console.log(data);

            if (data == 1)
            {

                toastr.options = {
                  "closeButton": true,
                  "debug": false,
                  "newestOnTop": true,
                  "progressBar": true,
                  "positionClass": "toast-top-right",
                  "preventDuplicates": true,
                  "onclick": null,
                  "showDuration": "300",
                  "hideDuration": "1000",
                  "timeOut": "2500",
                  "extendedTimeOut": "1000",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut",
                  "onHidden": function(){location.reload();}
                }

                //swal("Correcto!", "Factura Eliminada con Exito!", "success");  
                toastr.success('Factura Eliminada con Exito', 'Correcto');   

                //location.reload();
            }
            else
            {

                toastr.options = {
                          "closeButton": true,
                          "debug": false,
                          "newestOnTop": true,
                          "progressBar": true,
                          "positionClass": "toast-top-right",
                          "preventDuplicates": true,
                          "onclick": null,
                          "showDuration": "300",
                          "hideDuration": "1000",
                          "timeOut": "2500",
                          "extendedTimeOut": "1000",
                          "showEasing": "swing",
                          "hideEasing": "linear",
                          "showMethod": "fadeIn",
                          "hideMethod": "fadeOut"
                        }

                //swal("Error", "Ocurrio un problema al eliminar la factura", "error");   
                toastr.error('Ocurrio un problema al eliminar la factura', 'Error');  

            }    
        }

        })
        .done(function() {
            console.log("success");
        })
         .fail( function( jqXHR, textStatus, errorThrown ) {

        if (jqXHR.status === 0) {

          console.log('Not connect: Verify Network.');

        } else if (jqXHR.status == 404) {

          console.log('Requested page not found [404]');

        } else if (jqXHR.status == 500) {

          console.log('Internal Server Error [500].');

        } else if (textStatus === 'parsererror') {

          console.log('Requested JSON parse failed.');

        } else if (textStatus === 'timeout') {

           console.log('Time out error.');

         } else if (textStatus === 'abort') {

           console.log('Ajax request aborted.');

         } else {

           console.log('Uncaught Error: ' + jqXHR.responseText);

         }

        })
        .always(function() {
            $('#loader').hide();
        });

      } else {
    
      }
    });  
}

///////////////////////////////////////////////////////////////////////////////////////
/////////                 FIN Metodo Eliminar Factura Creada                ///////////
//////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////
/////////                     Metodo Cancelar Factura                       ///////////
//////////////////////////////////////////////////////////////////////////////////////

function getCancelar_Factura(id)
{
    console.log(id);

    var formData = new FormData(); 
    formData.append("ID", id);

    swal({
      title: "¿Esta seguro?",
      text: "Una vez cancelada la factura no sera posible restaurarla",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

        $.ajax({
        url: dir + 'index.php/Controller_Factura_Generica/Cancelar_Factura',
        type: 'POST',
        processData: false,
        contentType: false,
        timeout: 35000,
        data: formData,
        beforeSend : function ()
        {
            $('#loader').show();
        },
        success: function(data)
        {
            console.log(data);

            if (data == 1)
            {

                toastr.options = {
                  "closeButton": true,
                  "debug": false,
                  "newestOnTop": true,
                  "progressBar": true,
                  "positionClass": "toast-top-right",
                  "preventDuplicates": true,
                  "onclick": null,
                  "showDuration": "300",
                  "hideDuration": "1000",
                  "timeOut": "2500",
                  "extendedTimeOut": "1000",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut",
                  "onHidden": function(){location.reload();}
                }


                //swal("Correcto!", "Factura Cancelada con Exito!", "success");   
                toastr.success('Factura Cancelada con Exito','Correcto'); 
                
            }
            else
            {
                //swal("Error", "Ocurrio un problema al cancelar la factura", "error");   

                toastr.options = {
                          "closeButton": true,
                          "debug": false,
                          "newestOnTop": true,
                          "progressBar": true,
                          "positionClass": "toast-top-right",
                          "preventDuplicates": true,
                          "onclick": null,
                          "showDuration": "300",
                          "hideDuration": "1000",
                          "timeOut": "2500",
                          "extendedTimeOut": "1000",
                          "showEasing": "swing",
                          "hideEasing": "linear",
                          "showMethod": "fadeIn",
                          "hideMethod": "fadeOut"
                        }

                toastr.error('Ocurrio un problema al cancelar la factura','Error'); 
            }    
        }

        })
        .done(function() {
            console.log("success");
        })
         .fail( function( jqXHR, textStatus, errorThrown ) {

        if (jqXHR.status === 0) {

          console.log('Not connect: Verify Network.');

        } else if (jqXHR.status == 404) {

          console.log('Requested page not found [404]');

        } else if (jqXHR.status == 500) {

          console.log('Internal Server Error [500].');

        } else if (textStatus === 'parsererror') {

          console.log('Requested JSON parse failed.');

        } else if (textStatus === 'timeout') {

           console.log('Time out error.');

         } else if (textStatus === 'abort') {

           console.log('Ajax request aborted.');

         } else {

           console.log('Uncaught Error: ' + jqXHR.responseText);

         }

        })
        .always(function() {
            $('#loader').hide();
        });

      } else {
    
      }
    });  
}

///////////////////////////////////////////////////////////////////////////////////////
/////////                 FIN Metodo Cancelar Factura                       ///////////
//////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
/////////                     Metodo Enviar Correo                         ///////////
//////////////////////////////////////////////////////////////////////////////////////

function GetIDCorreo(id)
{

    var formData = new FormData(); 
    formData.append("ID_Factura", id);

    var Correo = "";

    $.ajax({
        url: dir + 'index.php/Controller_Factura_Generica/Cargar_Correo',
        type: 'POST',
        processData: false,  // tell jQuery not to process the data
        contentType: false,
        timeout: 35000,
        data:formData,
        beforeSend : function ()
        {
        },
        success: function(data)
        {

            console.log(data);

            if (data == "Error_Query")
            {
                //swal("Advertencia","La factura no cuenta con correo electronico asignado","warning");

                toastr.warning('La factura no cuenta con correo electronico asignado', 'Advertencia');

            }else

            {

            let parseJson = JSON.parse(data);    

            Correo = parseJson['Factura'][0]['Correo'];

            }

        }
    })
    .done(function()
    {
            let PDF = dir + "Clases/Reportes/Formato_Factura_Generica_33.php?ID="+ id;
            let XML = dir + "Clases/Recuperar_XML_Generico.php?ID="+ id;

            var formData1 = new FormData();
            formData1.append("XML", XML);
            formData1.append("PDF", PDF);
            formData1.append("ID", id);
            formData1.append("Para", Correo);

            $.ajax({
                url: dir + 'index.php/Controller_Factura_Generica/Mandar_Email',
                type: 'POST',
                processData: false,
                contentType: false,
                timeout: 35000,
                data: formData1,
                beforeSend : function ()
                {
                    $('#loader').show();
                },
                success: function(data)
                {
                    console.log(data);

                    if (data == true)
                    {
                        //swal("Correcto","El correo a sido enviado con exito","success");

                        toastr.success('El correo a sido enviado con exito', 'Correcto');
                    }
                    else
                    {
                        //swal("Error","Hubo un error al intetar enviar el correo","error");

                        toastr.error('Hubo un error al intetar enviar el correo', 'Error');
                    }

                }
            })
            .done(function() {
                console.log("success");
            })
            .fail( function( jqXHR, textStatus, errorThrown ) {

            if (jqXHR.status === 0) {

              console.log('Not connect: Verify Network.');

            } else if (jqXHR.status == 404) {

              console.log('Requested page not found [404]');

            } else if (jqXHR.status == 500) {

              console.log('Internal Server Error [500].');

            } else if (textStatus === 'parsererror') {

              console.log('Requested JSON parse failed.');

            } else if (textStatus === 'timeout') {

               console.log('Time out error.');

             } else if (textStatus === 'abort') {

               console.log('Ajax request aborted.');

             } else {

               console.log('Uncaught Error: ' + jqXHR.responseText);

             }

            })
            .always(function() {
                $('#loader').hide();
            });


    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
    });
}

///////////////////////////////////////////////////////////////////////////////////////
/////////                  FIN Metodo Enviar Correo                         ///////////
//////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////
/////////             Metodo Ver Detalle Factura Guardada                 ////////////
//////////////////////////////////////////////////////////////////////////////////////

function GetVer($id)
{
    console.log($id);
    var formData = new FormData(); 
    formData.append("ID_Factura", $id);

    $.ajax({
        url: dir + 'index.php/Controller_Factura_Generica/Ver_Detalle_Factura',
        type: 'POST',
        processData: false,
        contentType: false,
        timeout: 35000,
        data: formData,
        beforeSend : function ()
            {
                $('#loader').show();
            },
            success: function(data)
            {
                 var content = JSON.parse(data);

                var contador = 1;

                var Total_Retenciones = 0;

                let RetISR = 0;
                let RetIVA = 0;
                
                var Tabla_Movimientos_Factura = document.getElementById("Tabla_Detalle_Factura");

                Tabla_Movimientos_Factura.tBodies[0].innerHTML = "";

                for (let i = 0; i <= content['Factura'].length -1; i++) 
                {
                    var row = Tabla_Movimientos_Factura.tBodies[0].insertRow(i);   
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
                    let cell12 = row.insertCell(11);

                    cell1.innerHTML = contador;
                    cell2.innerHTML = content['Factura'][i]['Cantidad'];
                    cell3.innerHTML = content['Factura'][i]['Producto'];
                    cell4.innerHTML = content['Factura'][i]['Unidad'];
                    cell5.innerHTML = content['Factura'][i]['Clave_Unidad'];
                    cell6.innerHTML = content['Factura'][i]['Clave_SAT'];
                    cell7.innerHTML = "$" + content['Factura'][i]['Valor_Unitario'];
                    cell8.innerHTML = "$" + content['Factura'][i]['Impuesto_Movimiento'];
                    cell9.innerHTML = "$" + content['Factura'][i]['Retenciones_ISR'];
                    cell10.innerHTML = "$" + content['Factura'][i]['Retenciones_IVA'];
                    cell11.innerHTML = "$" + content['Factura'][i]['Descuento_Movimiento'];
                    cell12.innerHTML = "$" + content['Factura'][i]['Importe'];

                    RetISR += content['Factura'][i]['Retenciones_ISR'];
                    RetIVA += content['Factura'][i]['Retenciones_IVA'];

                    contador++;
                }

                Total_Retenciones = parseFloat(RetISR) + parseFloat(RetIVA);

                $("#TotalProductos").val(contador - 1 );
                $("#Subtotal").val("$" + content['Factura'][0]['Subtotal']);
                $("#Impuestos").val("$" + content['Factura'][0]['Impuesto']);
                $("#Retencion_Total").val("$" + Total_Retenciones.toFixed(2));
                $("#Descuento").val("$" + content['Factura'][0]['Descuento']);
                $("#Total").val("$" + content['Factura'][0]['Total']);

                
            }
    })
    .done(function() {
        console.log("success");
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {

    if (jqXHR.status === 0) {

      console.log('Not connect: Verify Network.');

    } else if (jqXHR.status == 404) {

      console.log('Requested page not found [404]');

    } else if (jqXHR.status == 500) {

      console.log('Internal Server Error [500].');

    } else if (textStatus === 'parsererror') {

      console.log('Requested JSON parse failed.');

    } else if (textStatus === 'timeout') {

       console.log('Time out error.');

     } else if (textStatus === 'abort') {

       console.log('Ajax request aborted.');

     } else {

       console.log('Uncaught Error: ' + jqXHR.responseText);

     }

    })
    .always(function() {
        $('#loader').hide();
    });
    

    $("#exampleModalCenter").modal('show');
}

///////////////////////////////////////////////////////////////////////////////////////
/////////        FIN  Metodo Ver Detalle Factura Guardada                 ////////////
//////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////
/////////             Metodo Timbrar Factura Guardada                     ////////////
//////////////////////////////////////////////////////////////////////////////////////

function GetIDFactura($id)
{
    var formData = new FormData(); 
    formData.append("ID_Factura", $id);

    swal({
      title: "Importante!",
      text: "¿Esta seguro que desea timbrar la factura con el N° " + $id + "?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete)
      {
        $.ajax({
            url: dir+'index.php/Controller_Factura_Generica/Facturar_Factura_General',                                               //Metodo que va a recibir los datos del formulario en PHP
            type: "post",                                                                                    //Tipo de envio de la infomación
             //dataType: "json",
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            timeout: 0,
            data:formData,
            beforeSend : function ()
            {
                $('#loader').show();
            },
            success: function(data)
            {               
               console.log(data);

               if (data == 1) {

                toastr.options = {
                  "closeButton": true,
                  "debug": false,
                  "newestOnTop": true,
                  "progressBar": true,
                  "positionClass": "toast-top-right",
                  "preventDuplicates": true,
                  "onclick": null,
                  "showDuration": "300",
                  "hideDuration": "1000",
                  "timeOut": "2500",
                  "extendedTimeOut": "1000",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut",
                  "onHidden": function(){location.reload();}
                }


                //swal("Correcto!", "Factura Cancelada con Exito!", "success");   
                toastr.success('Factura Cancelada con Exito','Correcto'); 

                }else{

                var Respuesta = data.split(" ");

                console.log(Respuesta[2]);

                /*Validación del PAC y mensaje de error con respecto al catalogo de matriz de errores del SAT*/

                    switch(Respuesta[2])
                    {
                        case "'DUPLICIDAD":
                        swal("ERROR DUPLICIDAD EN LA CADENA ORIGINA", "Se trata de timbrar un CFDi ya timbrado", "error");     
                        break;
                        case "XSD":
                        swal("ERROR de Validación", "Error al validar el XML con el archivo .XSD del SAT", "error");     
                        break;
                        case "301":
                        swal("ERROR", "Que no cumpla con el estándar de XML (Conforme al W3C) y con la estructura XML (XSD y complementos aplicables).", "error");     
                        break;
                        case "302":
                        swal("ERROR", "Que el sello del Emisor no sea válido", "error");     
                        break;
                        case "303":
                        swal("ERROR", "Que el CSD del Emisor no corresponda al RFC que viene como Emisor en el Comprobante.", "error");     
                        break;
                        case "304":
                        swal("ERROR", "Que el CSD del Emisor haya sido revocado, utilizando la lista de LCO.", "error");     
                        break;
                        case "305":
                        swal("ERROR", "Que la fecha de emisión esté fuera de la vigencia del CSD del Emisor.", "error");     
                        break;
                        case "306":
                        swal("ERROR", "Que la llave utilizada para sellar no corresponda a un CSD (ej. de FIEL).", "error");     
                        break;
                        case "307":
                        swal("ERROR", "Que contenga un timbre previo.", "error");     
                        break;
                        case "308":
                        swal("ERROR", "Que el CSD del Emisor no haya sido firmado por uno de los Certificados de Autoridad de SAT.", "error");     
                        break;
                        case "401":
                        swal("ERROR", "Que el rango de la fecha de generación sea mayor a 72 horas para la emisión del timbre.", "error");     
                        break;
                        case "402":
                        swal("ERROR", "Que no exista el RFC del emisor conforme al régimen autorizado (Lista de validación de régimen) LCO.", "error");     
                        break;
                        case "403":
                        swal("ERROR", "Que la fecha de emisión sea anterior al 01 de Enero 2011.", "error");     
                        break;
                        case 'CFDI33192':
                        swal("ERROR CFDI33192", "Debe haber sólo un registro con la misma combinación de impuesto, factor y tasa por cada traslado.", "error");     
                        break;
                        case 'CFDI33101':
                        swal("ERROR CFDI33101", "El campo Fecha no cumple con el patrón requerido.", "error");     
                        break;
                        case 'CFDI33102':
                        swal("ERROR CFDI33102", "El resultado de la digestión debe ser igual al resultado de la desencripción del sello.", "error");     
                        break;
                        case 'CFDI33103':
                        swal("ERROR CFDI33103", "Si existe el complemento para recepción de pagos el campo FormaPago no debe existir.", "error");     
                        break;
                        case 'CFDI33104':
                        swal("ERROR CFDI33104", "El campo FormaPago no contiene un valor del catálogo c_FormaPago.", "error");     
                        break;
                        case 'CFDI33105':
                        swal("ERROR CFDI33105", "El certificado no cumple con alguno de los valores permitidos. \n Certificado no corresponde al RFC del emisor", "error");     
                        break;
                        case 'CFDI33106':
                        swal("ERROR CFDI33106", "El valor de este campo SubTotal excede la cantidad de decimales que soporta la moneda.", "error");     
                        break;
                        case 'CFDI33107':
                        swal("ERROR CFDI33107", "El TipoDeComprobante es I,E o N, el importe registrado en el campo no es igual a la suma de los importes de los conceptos registrados.", "error");     
                        break;
                        case 'CFDI33108':
                        swal("ERROR CFDI33108", "El TipoDeComprobante es T o P y el importe no es igual a 0, o cero con decimales.", "error");     
                        break;
                        case 'CFDI33109':
                        swal("ERROR CFDI33109", "El valor registrado en el campo Descuento no es menor o igual que el campo Subtotal.", "error");     
                        break;
                        case 'CFDI33110':
                        swal("ERROR CFDI33110", "El TipoDeComprobante no es I,E o N, y un concepto incluye el campo descuento.", "error");     
                        break;
                        case 'CFDI33111':
                        swal("ERROR CFDI33111", "El valor del campo Descuento excede la cantidad de decimales que soporta la moneda.", "error");     
                        break;
                        case 'CFDI33112':
                        swal("ERROR CFDI33112", "El campo Moneda no contiene un valor del catálogo c_Moneda.", "error");     
                        break;
                        case 'CFDI33113':
                        swal("ERROR CFDI33113", "El campo TipoCambio no tiene el valor '1' y la moneda indicada es MXN.", "error");     
                        break;
                        case 'CFDI33114':
                        swal("ERROR CFDI33114", "El campo TipoCambio se debe registrar cuando el campo Moneda tiene un valor distinto de MXN y XXX.", "error");     
                        break;
                        case 'CFDI33115':
                        swal("ERROR CFDI33115", "El campo TipoCambio no se debe registrar cuando el campo Moneda tiene el valor XXX.", "error");     
                        break;
                        case 'CFDI33116':
                        swal("ERROR CFDI33116", "El campo TipoCambio no cumple con el patrón requerido.", "error");     
                        break;
                        case 'CFDI33117':
                        swal("ERROR CFDI33117", "Cuando el valor del campo TipoCambio se encuentre fuera de los límites establecidos, debe existir el campo Confirmacion.", "error");     
                        break;
                        case 'CFDI33118':
                        swal("ERROR CFDI33118", "El campo Total no corresponde con la suma del subtotal, menos los descuentos aplicables, más las contribuciones recibidas (impuestos trasladados - federales o locales, derechos, productos, aprovechamientos, aportaciones de seguridad social, contribuciones de mejoras) menos los impuestos retenidos.", "error");     
                        break;
                        case 'CFDI33119':
                        swal("ERROR CFDI33119", "Cuando el valor del campo Total se encuentre fuera de los límites establecidos, debe existir el campo Confirmacion.", "error");     
                        break;
                        case 'CFDI33120':
                        swal("ERROR CFDI33120", "El campo TipoDeComprobante, no contiene un valor del catálogo c_TipoDeComprobante.", "error");     
                        break;
                        case 'CFDI33121':
                        swal("ERROR CFDI33121", "El campo MetodoPago, no contiene un valor del catálogo c_MetodoPago.", "error");     
                        break;
                        case 'CFDI33122':
                        swal("ERROR CFDI33122", "Cuando se tiene el valor PIP en el campo MetodoPago y el valor en el campo TipoDeComprobante es I ó E, el CFDI debe contener un complemento de recibo de pago.", "error");     
                        break;
                        case 'CFDI33123':
                        swal("ERROR CFDI33123", "Se debe omitir el campo MetodoPago cuando el TipoDeComprobante es T o P.", "error");     
                        break;
                        case 'CFDI33124':
                        swal("ERROR CFDI33124", "Si existe el complemento para recepción de pagos en este CFDI el campo MetodoPago no debe existir.", "error");     
                        break;
                        case 'CFDI33125':
                        swal("ERROR CFDI33125", "El campo LugarExpedicion, no contiene un valor del catálogo c_CodigoPostal.", "error");     
                        break;
                        case 'CFDI33126':
                        swal("ERROR CFDI33126", "El campo Confirmacion no debe existir cuando los atributos TipoCambio y/o Total están dentro del rango permitido.", "error");     
                        break;
                        case 'CFDI33127':
                        swal("ERROR CFDI33127", "Número de confirmación inválido.", "error");     
                        break;
                        case 'CFDI33128':
                        swal("ERROR CFDI33128", "Número de confirmación utilizado previamente.", "error");     
                        break;
                        case 'CFDI33129':
                        swal("ERROR CFDI33129", "El campo TipoRelacion, no contiene un valor del catálogo c_TipoRelacion.", "error");     
                        break;
                        case 'CFDI33130':
                        swal("ERROR CFDI33130", "El campo RegimenFiscal, no contiene un valor del catálogo c_RegimenFiscal.", "error");     
                        break;
                        case 'CFDI33131':
                        swal("ERROR CFDI33131", "La clave del campo RegimenFiscal debe corresponder con el tipo de persona (fisica o moral).", "error");     
                        break;
                        case 'CFDI33132':
                        swal("ERROR CFDI33132", "Este RFC del receptor no existe en la lista de RFC inscritos no cancelados del SAT.", "error");     
                        break;
                        case 'CFDI33133':
                        swal("ERROR CFDI33133", "El campo ResidenciaFiscal, no contiene un valor del catálogo c_Pais.", "error");     
                        break;
                        case 'CFDI33134':
                        swal("ERROR CFDI33134", "El RFC del receptor es de un RFC registrado en el SAT o un RFC genérico nacional y existe el campo ResidenciaFiscal.", "error");     
                        break;
                        case 'CFDI33135':
                        swal("ERROR CFDI33135", "El valor del campo ResidenciaFiscal no puede ser MEX.", "error");     
                        break;
                        case 'CFDI33140':
                        swal("ERROR CFDI33140", "El campo UsoCFDI, no contiene un valor del catálogo c_UsoCFDI.", "error");     
                        break;
                        case 'CFDI33141':
                        swal("ERROR CFDI33141", "La clave del campo UsoCFDI debe corresponder con el tipo de persona (fisica o moral).", "error");     
                        break;
                        case 'CFDI33142':
                        swal("ERROR CFDI33142", "El campo ClaveProdServ, no contiene un valor del catálogo c_ClaveProdServ.", "error");     
                        break;
                        case 'CFDI33143':
                        swal("ERROR CFDI33143", "No existe el complemento requerido para el valor de ClaveProdServ.", "error");     
                        break;
                        case 'CFDI33144':
                        swal("ERROR CFDI33144", "No está declarado el impuesto relacionado con el valor de ClaveProdServ.", "error");     
                        break;
                        case 'CFDI33145':
                        swal("ERROR CFDI33145", "El campo ClaveUnidad no contiene un valor del catálogo c_ClaveUnidad.", "error");     
                        break;
                        case 'CFDI33146':
                        swal("ERROR CFDI33146", "El valor del campo ValorUnitario debe tener hasta la cantidad de decimales que soporte la moneda.", "error");     
                        break;
                        case 'CFDI33147':
                        swal("ERROR CFDI33147", "El valor valor del campo ValorUnitario debe ser mayor que cero (0) cuando el tipo de comprobante es Ingreso, Egreso o Nomina.", "error");     
                        break;
                        case 'CFDI33148':
                        swal("ERROR CFDI33148", "El valor del campo Importe debe tener hasta la cantidad de decimales que soporte la moneda.", "error");     
                        break;
                        case 'CFDI33149':
                        swal("ERROR CFDI33149", "El valor del campo Importe no se encuentra entre el limite inferior y superior permitido.", "error");     
                        break;
                        case 'CFDI33150':
                        swal("ERROR CFDI33150", "El valor del campo Descuento debe tener hasta la cantidad de decimales que tenga registrado el atributo importe del concepto.", "error");     
                        break;
                        case 'CFDI33151':
                        swal("ERROR CFDI33151", "El valor del campo Descuento es mayor que el campo Importe.", "error");     
                        break;
                        case 'CFDI33154':
                        swal("ERROR CFDI33154", "El valor del campo Base que corresponde a Traslado debe ser mayor que cero.", "error");     
                        break;
                        case 'CFDI33153':
                        swal("ERROR CFDI33153", "El valor del campo Base que corresponde a Traslado debe tener hasta la cantidad de decimales que soporte la moneda.", "error");     
                        break;
                        case 'CFDI33155':
                        swal("ERROR CFDI33155", "El valor del campo Impuesto que corresponde a Traslado no contiene un valor del catálogo c_Impuesto.", "error");     
                        break;
                        case 'CFDI33156':
                        swal("ERROR CFDI33156", "El valor del campo TipoFactor que corresponde a Traslado no contiene un valor del catálogo c_TipoFactor.", "error");     
                        break;
                        case 'CFDI33159':
                        swal("ERROR CFDI33159", "El valor del campo TasaOCuota que corresponde a Traslado no contiene un valor del catálogo c_TasaOcuota o se encuentra fuera de rango.", "error");     
                        break;
                        case 'CFDI33160':
                        swal("ERROR CFDI33160", "El valor del campo Importe que corresponde a Traslado debe tener hasta la cantidad de decimales que soporte la moneda.", "error");     
                        break;
                        case 'CFDI33172':
                        swal("ERROR CFDI33172", "El campo ClaveProdServ, no contiene un valor del catálogo c_ClaveProdServ.", "error");     
                        break;
                        case 'CFDI33173':
                        swal("ERROR CFDI33173", "El valor del campo ValorUnitario debe tener hasta la cantidad de decimales que soporte la moneda.", "error");     
                        break;
                        case 'El':
                        swal("Advertencia", "El contribuyente aun no tiene folios asignados", "warning");     
                        break;
                        default:
                        swal("ERROR !!", "Hubo un error al timbrar la factura por favor intente de nuevo", "error"); 
                    }
                }
               
            }
        })
        .done(function() {
            console.log("success");
        })
         .fail( function( jqXHR, textStatus, errorThrown ) {

        if (jqXHR.status === 0) {

          console.log('Not connect: Verify Network.');

        } else if (jqXHR.status == 404) {

          console.log('Requested page not found [404]');

        } else if (jqXHR.status == 500) {

          console.log('Internal Server Error [500].');

        } else if (textStatus === 'parsererror') {

          console.log('Requested JSON parse failed.');

        } else if (textStatus === 'timeout') {

           console.log('Time out error.');

         } else if (textStatus === 'abort') {

           console.log('Ajax request aborted.');

         } else {

           console.log('Uncaught Error: ' + jqXHR.responseText);

         }

        })
        .always(function() {
            $('#loader').hide();
        });
        
      } 
    });
}

///////////////////////////////////////////////////////////////////////////////////////
/////////         FIN Metodo Timbrar Factura Guardada                     ////////////
//////////////////////////////////////////////////////////////////////////////////////

function Enviar_Correo(){

    let De          = $('#De_Correo').val();
    let Para        = $('#Para_Correo').val();
    let Tema        = $('#Tema_Correo').val();
    let Mensaje     = $('#Mensaje').val();
    let PDF         = dir + "Clases/Reportes/Formato_Factura_Generica_33.php?ID="+ window.ID_Insert_Factura_Generica;
    let XML         = dir + "Clases/Recuperar_XML_Generico.php?ID="+ window.ID_Insert_Factura_Generica;

    if (De != null && De != "")
    {
        if (Para != null && Para != "")
        {
            var formData = new FormData(); 
            formData.append("De", De);
            formData.append("Para", Para);
            formData.append("Tema", Tema);
            formData.append("Mensaje", Mensaje);
            formData.append("XML", XML);
            formData.append("PDF", PDF);

            $.ajax({
                url: dir + 'index.php/Controller_Factura_Generica/Mandar_Email_Modal',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                data:formData,
                beforeSend : function ()
                {
                    $('#loader').show();
                },
                success: function(data)
                {
                    console.log(data);

                    if (data == true)
                    {
                        //swal("Correcto","El correo a sido enviado con exito","success");

                        toastr.options = {
                          "closeButton": true,
                          "debug": false,
                          "newestOnTop": true,
                          "progressBar": true,
                          "positionClass": "toast-top-right",
                          "preventDuplicates": true,
                          "onclick": null,
                          "showDuration": "300",
                          "hideDuration": "1000",
                          "timeOut": "2500",
                          "extendedTimeOut": "1000",
                          "showEasing": "swing",
                          "hideEasing": "linear",
                          "showMethod": "fadeIn",
                          "hideMethod": "fadeOut"
                        }

                        toastr.success('El correo a sido enviado con exito', 'Correcto');
                        $('#Tema_Correo').val("");
                        $('#Mensaje').val("");
                    }
                    else
                    {
                       // swal("Error","Hubo un error al intetar enviar el correo","error");

                        toastr.error('Hubo un error al intetar enviar el correo', 'Error');
                    }

                }
            })
            .done(function() {
                console.log("success");
            })
            .fail( function( jqXHR, textStatus, errorThrown ) {

                if (jqXHR.status === 0) {

                  console.log('Not connect: Verify Network.');

                } else if (jqXHR.status == 404) {

                  console.log('Requested page not found [404]');

                } else if (jqXHR.status == 500) {

                  console.log('Internal Server Error [500].');

                } else if (textStatus === 'parsererror') {

                  console.log('Requested JSON parse failed.');

                } else if (textStatus === 'timeout') {

                   console.log('Time out error.');

                 } else if (textStatus === 'abort') {

                   console.log('Ajax request aborted.');

                 } else {

                   console.log('Uncaught Error: ' + jqXHR.responseText);

                 }

                })
            .always(function() {
                $('#loader').hide();
            });
            
        }
        else
        {
            //swal("Advertencia","El campo Para es obligatorio para el vio de correo electrónico","warning");

            toastr.warning('El campo Para es obligatorio para el vio de correo electrónico', 'Advertencia');
        }
    }
    else
    {
        //swal("Advertencia","El campo De es obligatorio para el vio de correo electrónico","warning");

        toastr.warning('El campo De es obligatorio para el vio de correo electrónico', 'Advertencia');
    }
}


        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////
        ////     Eventos al Cargar por Completo la Pagina de Facturas Genericas   ////
        //////////////////////////////////////////////////////////////////////////////

$( document ).ready(function() {


    //////////////////////////////////////////////////////////////////////////////
    ////    Validación para la forma de pago y el metodo de pago del SAT      ////
    //////////////////////////////////////////////////////////////////////////////

$('#cmd_Forma_Pago').change(function(event) {

    if ($('#cmd_Forma_Pago').val() == 99) {

    $('#cmd_Metodo_Pago').val('PPD');

    //swal('Advertencia', 'Al utilizar la FORMA DE PAGO 99 es obligatorio utilizar el METODO DE PAGO, "Pago en parcialidades o diferido (PPD)"', 'warning');

    toastr.warning('Al utilizar la FORMA DE PAGO 99 es obligatorio utilizar el METODO DE PAGO, "Pago en parcialidades o diferido (PPD)"', 'Advertencia');

} else if ($('#cmd_Forma_Pago').val() != 99) {

    $('#cmd_Metodo_Pago').val('PUE');
}

});

        //////////////////////////////////////////////////////////////////////////////
        ////    Validación para la forma de pago y el metodo de pago del SAT      ////
        //////////////////////////////////////////////////////////////////////////////

$('#cmd_Metodo_Pago').change(function(event) {

 if ($('#cmd_Metodo_Pago').val() == 'PPD') {

    $('#cmd_Forma_Pago').val(99);

    //swal('Advertencia', 'Al utilizar el METODO DE PAGO, "pago en parcialidades o diferido (PPD)" es obligatorio utilizar la FORMA DE PAGO Por definir (99)', 'warning');

    toastr.warning('Al utilizar el METODO DE PAGO, "pago en parcialidades o diferido (PPD)" es obligatorio utilizar la FORMA DE PAGO Por definir (99)', 'Advertencia');

} else if ($('#cmd_Metodo_Pago').val() == 'PUE') {

    $('#cmd_Forma_Pago').val('01');

}

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

$('#De_Correo').val('manuel.integratto@gmail.com');

$("#Abrir_modal").click(function(){

    $('#ModalCorreo').modal({backdrop: 'static', keyboard: false});

});

$("#Eviar_Correo").click(function()
{
   Enviar_Correo();

});

});