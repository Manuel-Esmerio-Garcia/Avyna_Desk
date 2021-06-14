var ID;
var linea_Factura;
var linea_Cancelar;
window.linea_Factura_Realizadas;
var dataTable;
var ID_Facturas_Btn;
var dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.content;

        //////////////////////////////////////////////////////////////////////////////
        ////    DataTable de la tabla de Clientes                                 ////
        //////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {
    
    fetch_data('no','','');
    fetch_data_Cancelado('no','','');
    

    $('.input-daterange').datepicker({
      format: "yyyy-mm-dd",
      autoclose: true
    });

    /*Input fecha Facturas Canceladas*/

    $('#start_date_Cancelada').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });
    $('#end_date_Cancelada').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });

    /*Input fecha Facturas*/

    $('#start_date_Cancelar').datepicker({
        format : "yyyy-mm-dd",
        autoclose: true
    });
    $('#end_date_Cancelar').datepicker({
        format : "yyyy-mm-dd",
        autoclose: true
    });


    /* Btn Boton Buscar ventas */

    $("#search").click(function(){

      var start_date = $('#start_date').val();
      var end_date = $('#end_date').val();

      if (start_date != '' && end_date != '') {

        $('#sales-table-data').DataTable().destroy();

        fetch_data('yes', start_date, end_date);

      }else{
        
        $('#sales-table-data').DataTable().destroy();
        fetch_data('no','','');
      }

    });


    /*Btn Boton Buscar Facturas Canceladas*/

    $("#search_Cancelada").click(function(){

      var start_date = $('#start_date_Cancelada').val();
      var end_date = $('#end_date_Cancelada').val();

      if (start_date != '' && end_date != '') {

        $('#invoices-table-canceled-data').DataTable().destroy();

        fetch_data_Cancelado('yes', start_date, end_date);

      }else{
        
        $('#invoices-table-canceled-data').DataTable().destroy();
        fetch_data_Cancelado('no','','');
      }

    });

  });




    function fetch_data(is_date_search, start_date='', end_date=''){

      console.log(" dentro del fetch_data metodo");

      var dataTable = $('#sales-table-data').DataTable({
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
        "order" : [],
        "ajax" : {

            url: dir + "Clases/fetch_Ventas.php",
            type: "POST",
            data:{
              is_date_search:is_date_search, start_date:start_date, end_date:end_date
            }
        }
      });
    }


    function fetch_data_Cancelado(is_date_search, start_date='', end_date=''){

      console.log(" dentro del fetch_data metodo cancelado");

      var dataTable = $('#invoices-table-canceled-data').DataTable({
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
        "order" : [],
        "ajax" : {

            url: dir + "Clases/fetch_Acuse.php",
            type: "POST",
            data:{
              is_date_search:is_date_search, start_date:start_date, end_date:end_date
            }
        }
      });
    }

window.addEventListener("load",function(e){

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

        $('#text_factura_fecha').text(fecha.getDate() + " de " + mesok[fecha.getMonth()] + " del " + fecha.getFullYear() + "  " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds());
    }

    var mitabla = document.getElementById("sales-table-data");
    mitabla.onclick = function(e){
        linea_Factura = e.target.parentNode;

        ////////////////////////////////////////////////////////////////////////////////////////
        ////    Se toman los datos de la venta seleccionada para pasarlos a la modal        ////
        ////////////////////////////////////////////////////////////////////////////////////////

        var IdSales     = linea_Factura.cells[0].innerHTML;
        var Fecha       = linea_Factura.cells[1].innerHTML;
        var Nombre      = linea_Factura.cells[2].innerHTML;
        var Empresa     = linea_Factura.cells[3].innerHTML;
        var Subtotal    = linea_Factura.cells[4].innerHTML;
        var Impuesto    = linea_Factura.cells[5].innerHTML;
        var Total       = linea_Factura.cells[6].innerHTML;
        var Status      = linea_Factura.cells[7].innerHTML;
        var Calle       = linea_Factura.cells[8].innerHTML;
        var Colonia     = linea_Factura.cells[9].innerHTML;
        var Ciudad      = linea_Factura.cells[10].innerHTML;
        var Municipio   = linea_Factura.cells[11].innerHTML;
        var Estado      = linea_Factura.cells[12].innerHTML;
        var Pais        = linea_Factura.cells[13].innerHTML;
        var CP          = linea_Factura.cells[14].innerHTML;
        var RFC         = linea_Factura.cells[15].innerHTML;
        //var noCer       = linea_Factura.cells[16].innerHTML;
        var ID_Cliente  = linea_Factura.cells[16].innerHTML;
        //var Empresa = linea.cells[16].innerHTML;

    }

    $('#BtnFacturar').click(function(event) 
    {

    if (linea_Factura != null) 
    {
        var ID_Empresa = $('#ID_Empresa').val();

        $.ajax({
            url: dir + 'index.php/Controller_Empresa/getAllById',
            type: 'POST',
            //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: {ID_Empresa: ID_Empresa},
            beforeSend : function ()
            {
                $('#Cargando').css('display','');
            },
            success: function(data)
            {
                console.log(data);

                if (data == null || data == "") 
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
                          "timeOut": "1500",
                          "extendedTimeOut": "1000",
                          "showEasing": "swing",
                          "hideEasing": "linear",
                          "showMethod": "fadeIn",
                          "hideMethod": "fadeOut"
                            }

                             /*toastr.options = {
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
                                        }*/

                        toastr.warning('La empresa no cuenta con los certificados necesarios para la facturación','Advertencia');

                    //swal("Advertencia","La empresa no cuenta con los certificados necesarios para la facturación", "warning");

                    $('#btn_Facturar_modal').attr("disabled","disabled");
                }

                else
                {
                    $('#btn_Facturar_modal').removeAttr("disabled");
                    $('#ModalInvoice').modal('show');
                    $('#chk_Relacion').prop('checked', false);                                                   //Mostramos modal con los datos obtenidos de la venta  
                    $('#div_Relacion').attr('hidden', 'hidden');
                    $('#txt_TipoRelacion').attr('disabled', 'disabled');
                    $('#list_Facturas').attr('hidden', 'hidden');
                    $('#chk_Relacion').val(0);  
                    $('#checkbox_Cliente').prop('checked', false); 
                    $('#checkbox_Cliente').val(0);  
                    //$('#txt_factura_direccion').removeAttr('readonly');
                    //$('#txt_factura_municipio').removeAttr('readonly');
                    //$('#txt_factura_colonia').removeAttr('readonly');
                    //$('#txt_factura_estado').removeAttr('readonly');
                    $('#txt_factura_cp').removeAttr('readonly');
                    //$('#txt_factura_ciudad').removeAttr('readonly');
                    $('#txt_factura_pais').removeAttr('readonly');
                    $('#txt_modal_IdVenta').removeAttr('readonly');
                    $('#txt_id_cliente_sale').removeAttr('readonly');
                    $('#txt_Uso_cfdi').removeAttr('disabled');
                    $('#txt_Metodo_Pago').removeAttr('disabled');
                    $('#AlertFormaPago').attr('hidden','hidden');
                    var tablaCanceladas = document.getElementById("Tabla-facturas-canceladas");
                     tablaCanceladas.tBodies[0].innerHTML = "";
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
           $('#Cargando').css('display','none');
        });                                                        
            
                $('#label_id_venta').text("Venta N° " + linea_Factura.cells[0].innerHTML + " " + linea_Factura.cells[3].innerHTML);
            

                $('#txt_factura_folio').val(linea_Factura.cells[0].innerHTML);

               setInterval(ActualizarFecha,1000);


                var tabla = document.getElementById("invoices-table-data_modal");

                        //////////////////////////////////////////////////////////////////////////////
                        ////    Pasamos infomación a campos de la modal facturación               ////
                        //////////////////////////////////////////////////////////////////////////////

                $('#txt_factura_Razon_Social').val(linea_Factura.cells[3].innerHTML);
                //$('#txt_factura_direccion').val(linea_Factura.cells[8].innerHTML);
                //$('#txt_factura_municipio').val(linea_Factura.cells[11].innerHTML);
                $('#txt_factura_rfc').val(linea_Factura.cells[10].innerHTML);
                //$('#txt_factura_colonia').val(linea_Factura.cells[9].innerHTML);
                //$('#txt_factura_estado').val(linea_Factura.cells[12].innerHTML);
                $('#txt_factura_cp').val(linea_Factura.cells[9].innerHTML);
                //$('#txt_factura_ciudad').val(linea_Factura.cells[10].innerHTML);
                $('#txt_factura_pais').val(linea_Factura.cells[8].innerHTML);
                $('#txt_modal_IdVenta').val(linea_Factura.cells[0].innerHTML);
                $('#txt_id_cliente_sale').val(linea_Factura.cells[11].innerHTML);

                if (tabla.rows.length >= 2) {

                    tabla.deleteRow(1);
                }

                        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        ////    Crea dentro de la modal una tabla con la infomacion de la venta seleccionada                       ////
                        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    tabla.insertRow(1);

                 var celda1 = tabla.rows[1].insertCell(0);
                 var celda2 = tabla.rows[1].insertCell(1);
                 var celda3 = tabla.rows[1].insertCell(2);
                 var celda4 = tabla.rows[1].insertCell(3);
                 var celda5 = tabla.rows[1].insertCell(4);
                 var celda6 = tabla.rows[1].insertCell(5);
                 var celda7 = tabla.rows[1].insertCell(6);
                 var celda8 = tabla.rows[1].insertCell(7);

                    celda1.innerHTML = linea_Factura.cells[0].innerHTML;
                    celda2.innerHTML = linea_Factura.cells[1].innerHTML;
                    celda3.innerHTML = linea_Factura.cells[2].innerHTML;
                    celda4.innerHTML = linea_Factura.cells[3].innerHTML;
                    celda5.innerHTML = linea_Factura.cells[4].innerHTML;
                    celda6.innerHTML = linea_Factura.cells[5].innerHTML;
                    celda7.innerHTML = linea_Factura.cells[6].innerHTML;
                    celda8.innerHTML = linea_Factura.cells[7].innerHTML;



            //}//End if noCertificado == null

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
            "timeOut": "1500",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
              }

            toastr.warning('Para Facturar por favor seleccionar una Venta','Advertencia');                              //Si da click a facturar sin seleccionar una venta muestra el alert
        }    

    }); 
            //////////////////////////////////////////////////////////////////////////////
            ////    Acción de Timbrado de factura de la modal                         ////
            //////////////////////////////////////////////////////////////////////////////

        $('#btn_Facturar_modal').click(function(event) 
        {

            $('#btn_Facturar_modal').val("Facturar");
            $('#btn_Facturar_modal').removeAttr("disabled");
            $('#Cargando_Factura').attr('hidden','hidden');


                if ($('#txt_factura_Razon_Social').val() == "" || $('#txt_factura_Razon_Social').val() == null) 
                {

                //swal('Advertencia', 'El cliente no cuenta con la razón social para proceder a con la facturación','warning');
                 toastr.warning('El cliente no cuenta con la razón social para proceder a con la facturación','Advertencia');  


                }
                else if ($('#txt_factura_rfc').val() == "" || $('#txt_factura_rfc').val() == null) 
                {

                    //swal('Advertencia', 'El cliente no cuenta con el RFC para proceder a con la facturación','warning');
                     toastr.warning('El cliente no cuenta con el RFC para proceder a con la facturación ','Advertencia');  


                }
                /*else if ($('#txt_factura_cp').val() == "" || $('#txt_factura_cp').val() == null)
                {

                    swal('Advertencia', 'El cliente no cuenta con el CP para proceder a con la facturación','warning');

                }*/
                else
                {
                        var IdVentaModal = linea_Factura.cells[0].innerHTML;
                        var Exito = "";

                        var form = $('#form_datos_factura')[0];                                                                      //Obtemos los datos del formulario de la modal
                                
                        var formData = new FormData(form);                                                                   //Se crea un FormData para mandar la infomación por Ajax

                        var Relacion = new Array();

                        var UUISRelacionado = getValoresCheckBox();

                        UUISRelacionadoClean = UUISRelacionado.filter(String); 

                        //alert(UUISRelacionadoClean);

                        for (var i = 0; i <= UUISRelacionadoClean.length-1; i++) 
                        {
                            formData.append('Relacion['+i+']', UUISRelacionadoClean[i]);
                        }

                        swal({
                              title: "Importante!",
                              text: "¿Esta seguro que desea facturar la venta con el N° " + linea_Factura.cells[0].innerHTML + "?",
                              icon: "info",
                              buttons: true,
                              dangerMode: true,
                            })
                            .then((willDelete) => {
                              if (willDelete) 
                              {

                                    $.ajax({
                                        url: dir + 'index.php/Controller_Factura/getVentasMenudeoInvoice',                                               //Metodo que va a recibir los datos del formulario en PHP
                                        type: "post",                                                                                    //Tipo de envio de la infomación
                                         //dataType: "json",
                                        processData: false,  // tell jQuery not to process the data
                                        contentType: false,
                                        timeout: 35000,
                                        data:formData,
                                         beforeSend : function ()
                                         {

                                            $('#btn_Facturar_modal').text("Facturando...");
                                            $('#btn_Facturar_modal').attr("disabled","disabled");
                                            $('#Cargando_Modal_Factura').css('display','');
                                          },                                                                                   //Mandamos los datos del formulario por Ajax
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

                                        toastr.success('Factura generada con exito','Correcto'); 

                                            }
                                            else if(data == 'Error_Totales')
                                            {
                                              swal("ERROR", "Los totales de la venta y la factura no coinciden", "error"); 
                                            }
                                            else
                                            {

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
                                    .done( function (data, status) {

                                        $('#btn_Facturar_modal').text("Facturar");
                                        $('#btn_Facturar_modal').removeAttr("disabled");
                                        $('#Cargando_Modal_Factura').css('display','none');
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

                                    });

                            } 

                         });

                 }

         });//End Accion Click Btn Facturar Modal



        //////////////////////////////////////////////////////////////////////////////
        ////    Validación para la forma de pago y el metodo de pago del SAT      ////
        //////////////////////////////////////////////////////////////////////////////

$('#txt_Forma_Pago').change(function(event) {

    if ($('#txt_Forma_Pago').val() == 99) {

    $('#txt_Metodo_Pago').val('PPD');

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

toastr.warning('Al utilizar la FORMA DE PAGO 99 es obligatorio utilizar el METODO DE PAGO, "Pago en parcialidades o diferido (PPD)','Advertencia'); 

    //swal('Advertencia', 'Al utilizar la FORMA DE PAGO 99 es obligatorio utilizar el METODO DE PAGO, "Pago en parcialidades o diferido (PPD)"', 'warning');

} else if ($('#txt_Forma_Pago').val() != 99) {

    $('#txt_Metodo_Pago').val('PUE');

    //swal('Advertencia', 'Al utilizar la FORMA DE PAGO 99 es obligatorio utilizar el METODO DE PAGO Pago en parcialidades o diferido (PPD)', 'warning');

}

});

        //////////////////////////////////////////////////////////////////////////////
        ////    Validación para la forma de pago y el metodo de pago del SAT      ////
        //////////////////////////////////////////////////////////////////////////////

$('#txt_Metodo_Pago').change(function(event) {

 if ($('#txt_Metodo_Pago').val() == 'PPD') {

    $('#txt_Forma_Pago').val(99);

    toastr.warning('Al utilizar el METODO DE PAGO, "pago en parcialidades o diferido (PPD)" es obligatorio utilizar la FORMA DE PAGO Por definir (99)','Advertencia'); 
    //swal('Advertencia', 'Al utilizar el METODO DE PAGO, "pago en parcialidades o diferido (PPD)" es obligatorio utilizar la FORMA DE PAGO Por definir (99)', 'warning');

} else if ($('#txt_Metodo_Pago').val() == 'PUE') {

    $('#txt_Forma_Pago').val('01');

}

});



});


window.addEventListener("load",function(e){
    var mitabla = document.getElementById("invoices-table-canceled-data");
    mitabla.onclick = function(e){
        linea_Cancelar = e.target.parentNode;

        ////////////////////////////////////////////////////////////////////////////////////////
        ////    Se toman los datos de la venta seleccionada para pasarlos a la modal        ////
        ////////////////////////////////////////////////////////////////////////////////////////

       var IDVenta         = linea_Cancelar.cells[0].innerHTML;
       var Fecha           = linea_Cancelar.cells[1].innerHTML;
       var Distribuidor    = linea_Cancelar.cells[2].innerHTML;
       var IdFactura       = linea_Cancelar.cells[3].innerHTML;
       var Folio           = linea_Cancelar.cells[4].innerHTML;
       var Subtotal        = linea_Cancelar.cells[5].innerHTML;
       var Impuesto        = linea_Cancelar.cells[6].innerHTML;
       var Total           = linea_Cancelar.cells[7].innerHTML;
       var Status          = linea_Cancelar.cells[8].innerHTML;
       var UUID            = linea_Cancelar.cells[9].innerHTML;
       var IDIntegrador    = linea_Cancelar.cells[10].innerHTML;

    }

    $("#BtnAcuse").click(function(){

        $('#BtnAcuse').text("Recuperar Acuse del SAT");
        $('#BtnAcuse').removeAttr("disabled");
        $('#Acuse_Factura').attr('hidden','hidden');

        if (linea_Cancelar != null) {

            var fd = new FormData();
            fd.append("ID", linea_Cancelar.cells[3].innerHTML);

            $.ajax({
                url: dir+'index.php/Controller_Factura/getAcuseSATbyId',
                type: "post",
                //dataType: "json",
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                data:fd,
                beforeSend : function ()
                {

                    $('#BtnAcuse').text("Recuperando Acuse de Cancelación...");
                    $('#BtnAcuse').attr("disabled","disabled");
                    $('#Cargando').css('display','');
                },       
                success: function(data){

                    console.log(data);

                    var data2 = data.replace(" ","");

                if(data)
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
                      "onHidden": function(){location.reload();  window.open(dir + "Facturacion/RecuperarAcuse.php?ID=" + linea_Cancelar.cells[3].innerHTML);}
                    }

            toastr.success('Acuse recuperado con exito','Correcto'); 

                   //swal("Exito!","Acuse recuperado con exito", "success"); 

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

                    toastr.error('Hubo un problema al recuperar el acuse de cancelación','Error'); 

                    //swal("oh oh!", "Hubo un problema al recuperar el acuse de cancelación", "error");
                }
                
                }

                })
                .done( function (data, status) {

                    $('#BtnAcuse').text("Recuperar Acuse del SAT");
                    $('#BtnAcuse').removeAttr("disabled");
                    $('#Cargando').css('display','none');
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

                                    });


        }else{

            toastr.error('Para descargar el Acuse de Cancelación del SAT por favor seleccionar la factura de la cual necesita el Acuse','Error'); 
             //swal("Ooh Ooh!", "Para descargar el Acuse de Cancelación del SAT por favor seleccionar la factura de la cual necesita el Acuse", "warning");
        }

    });

    });


window.addEventListener("load",function(e){

fetch_data_Factura('no', '', '');

     mitabla2 = document.getElementById("invoices-table-data");
        mitabla2.onclick = function(e){

          /*  var tabla = e.target.parentNode.parentNode;
            for(var x=0; x<tabla.rows.length; x++){
              tabla.rows[x].style.backgroundColor = "transparent";
              tabla.rows[x].style.color = "#000";
            }*/

            window.linea_Factura_Realizadas = e.target.parentNode;

            ////////////////////////////////////////////////////////////////////////////////////////
            ////    Se toman los datos de la venta seleccionada para pasarlos a la modal        ////
            ////////////////////////////////////////////////////////////////////////////////////////

           var IDVenta         = window.linea_Factura_Realizadas.cells[0].innerHTML;
           var Fecha           = window.linea_Factura_Realizadas.cells[1].innerHTML;
           var Distribuidor    = window.linea_Factura_Realizadas.cells[2].innerHTML;
           var IdFactura       = window.linea_Factura_Realizadas.cells[3].innerHTML;
           var Folio           = window.linea_Factura_Realizadas.cells[4].innerHTML;
           var Subtotal        = window.linea_Factura_Realizadas.cells[5].innerHTML;
           var Impuesto        = window.linea_Factura_Realizadas.cells[6].innerHTML;
           var Total           = window.linea_Factura_Realizadas.cells[7].innerHTML;
           var Status          = window.linea_Factura_Realizadas.cells[8].innerHTML;
           var UUID            = window.linea_Factura_Realizadas.cells[9].innerHTML;
           var IDIntegrador    = window.linea_Factura_Realizadas.cells[10].innerHTML;



            //////////////////////////////////////////////////////////////////////////////
            ////    Acción Cancelar factura con Ajax                                  ////
            //////////////////////////////////////////////////////////////////////////////
    }

        //para seleccionar una opcion
    $('#invoices-table-data tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
            dato = "";
            console.log(dato);
        }
        else {
            dataTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            dato = $(this).find("td:eq(0)").text();
            console.log(dato);
            ID_Facturas_Btn = dato;

        }
    });

        /**/
    function fetch_data_Factura(is_date_search, start_date='', end_date=''){

      console.log(" dentro del fetch_data metodo Factura");

      dataTable = $('#invoices-table-data').DataTable({
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
                      if (full[11] == 1)
                      {
                         return "<label class='label label-warning'>Publico General</label>"
                      }
                      else
                      {
                         return "<label class='label label-success'>Cliente</label>"
                      }
                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                },
                {
                    "targets": 12,
                    'render': function (data, type, full, meta)
                    {
                        console.log(full[0]);

                       return " <div class='form-group'> <button data-toggle='tooltip' title='Ver PDF' type='button' id='btn_pdf_"+ full[0] +"' onclick='getRutaPDF("+full[0]+");' class='pdf btn btn-danger btn-xs btn-flat'><i class='fa fa-file-pdf-o' aria-hidden='true'></i> </button></div>  <div class='form-group'><button data-toggle='tooltip' title='Descargar XML' type='button' id='btn_xml_"+ full[0] +"' onclick='getRutaXML("+full[0]+");' class='btn btn-primary btn-xs btn-flat'><i class='fa fa-file-code-o' aria-hidden='true'></i></button></div>  <div class='form-group'><button data-toggle='tooltip' title='Enviar Factura' type='button' id='btn_correo_"+ full[0] +"' onclick='GetIDCorreo("+full[0]+");' class='btn btn-default btn-xs btn-flat'><spam class='glyphicon glyphicon-envelope'></spam></button></div> <div class='form-group'><button data-toggle='tooltip' title='Validar Saldos' type='button' id='btn_xml_"+ full[0] +"' onclick='getValidateSaldos("+full[0]+");' class='btn btn-warning btn-xs btn-flat'><i class='fa fa-money' aria-hidden='true'></i></button></div>";
                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                }
            ],
        "order" : [],
        "ajax" : {

            url: dir + "Clases/fetch_Factura.php",
            type: "POST",
            data:{
              is_date_search:is_date_search, start_date:start_date, end_date:end_date
            }
        }
      });
    }

      /*Btn Buscar Facturas Facturadas*/

    $("#search_Facturado").click(function(){

      var start_date = $('#start_date_Cancelar').val();
      var end_date = $('#end_date_Cancelar').val();

      if (start_date != '' && end_date != '') {

        $('#invoices-table-data').DataTable().destroy();

        fetch_data_Factura('yes', start_date, end_date);

      }else{
        
        $('#invoices-table-data').DataTable().destroy();
        fetch_data_Factura('no','','');
      }

    });

        $("#btn_Cancelar_Factura").click(function(){

            if (window.linea_Factura_Realizadas != null) {

                var fd = new FormData();
                fd.append("ID", window.linea_Factura_Realizadas.cells[3].innerHTML);

                swal({
                    title: "¿Estás seguro?",
                    text: "Que desea cancelar la factura con el N° " + window.linea_Factura_Realizadas.cells[3].innerHTML + " este proceso es irreversible",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {

                $.ajax({
                    url: dir+'index.php/Controller_Factura/CancelarFactura',
                    type: "post",
                    //dataType: "json",
                    processData: false,  // tell jQuery not to process the data
                    contentType: false,
                    timeout: 35000,
                    data:fd,
                    beforeSend : function ()
                    {

                        $('#btn_Cancelar_Factura').text("Cancelando Factura...");
                        $('#btn_Cancelar_Factura').attr('disabled');
                        $('#Cargando').css('display','');
                    },    
                    success: function(data){

                        console.log(data);

                        var Valores = data.replace(" ","");
                    /*Validación del PAC y mensaje de error con respecto al catalogo de matriz de errores del SAT*/

                    switch(Valores){

                        case '1':

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

                  toastr.success('El CFDi fue cancelado con exito y el Acuse de cancelación fue generado con exito','Correcto'); 

                         //swal("Exito!", "El CFDi fue cancelado con exito y el Acuse de cancelación fue generado con exito", "success");                                   //Si la factura fue creada y timbrada con exito muestra el siguiente mensaje
                       //alert("Se ha agregado el nuevo usuario de manera exitosa");  
                       //location.reload();   
                        break;
                         case "Error_Acuse":

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
                          "timeOut": "1500",
                          "extendedTimeOut": "1000",
                          "showEasing": "swing",
                          "hideEasing": "linear",
                          "showMethod": "fadeIn",
                          "hideMethod": "fadeOut"
                        }

                  toastr.error('Al recuperar el acuse de cancelación','Error'); 

                        //swal("ERROR!!", "Al recuperar el acuse de cancelación", "error");     
                        break;
                        case "Error_Cancelacion":
                        toastr.error('Ocurrio un error al tratar de cancelar el CFDi','ERROR Cancelación'); 
                        //swal("ERROR Cancelación", "Ocurrio un error al tratar de cancelar el CFDi", "error");     
                        break;
                        case "Error_Factura":
                        toastr.error('Al Cambiar de Estado la factura','Error'); 
                        //swal("ERROR", "Al Cambiar de Estado la factura", "error");     
                        break; 
                        default:
                        toastr.error('Desconocido','Error'); 
                        //swal("ERROR", "Desconocido", "error");   
                        break;              

                    }
                    
                    }

                    })
                    .done( function (data, status) {
                        $('#btn_Cancelar_Factura').text("Cancelar Factura");
                        $('#btn_Cancelar_Factura').removeAttr("disabled");
                        $('#Cargando').css('display','none');
                        //window.open(dir + "Facturacion/RecuperarAcuse.php?ID=" + linea.cells[3].innerHTML);
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

                                    });

                    } 
    });
       
    }else{

        //swal("Ooh Ooh!", "Para cancelar una factura por favor seleccionar la factura a cancelar", "warning");
        toastr.warning('Para cancelar una factura por favor seleccionar la factura a cancelar','Advertencia'); 


    }
        });


    ////////////////////////////////////////////////////////////////
    ////             Publico en General                         ////
    ////////////////////////////////////////////////////////////////

});

$(document).ready(function() {


    $('#txt_TipoRelacion').change(function(event) 
    {

        if ($('#txt_TipoRelacion').val() == 04) 
        {

            $('#list_Facturas').removeAttr('hidden'); 

            var ID_Cliente_Modal = $('#txt_id_cliente_sale').val();

                getFacturasCanceladas(ID_Cliente_Modal);                    
        }
        else
        {

            $('#list_Facturas').attr('hidden', 'hidden');
        }

    });


    ////////////////////////////////////////////////////////////////
    ///     Funcion para de validación para el tipo de relacion  ///
    ////////////////////////////////////////////////////////////////

    $('#chk_Relacion').change(function(event) 
    {

        if($("#chk_Relacion").is(':checked')) 
        {  

        $("#chk_Relacion").val(1);
             
        } 
        else 
        {  
          
          $("#chk_Relacion").val(0);  
        }

        if ($('#chk_Relacion').val() == 1) 
        {

                $('#div_Relacion').removeAttr('hidden');
                $('#txt_TipoRelacion').removeAttr('disabled');
                $('#txt_TipoRelacion').val('');
        }
        else
        {

            $('#div_Relacion').attr('hidden', 'hidden');
            $('#txt_TipoRelacion').attr('disabled', 'disabled');
            $('#list_Facturas').attr('hidden', 'hidden');

        }

    });
    
     ///////////////////////////////////////////////////////////////
    /// FIN Funcion para de validación para el tipo de relacion  ///
    ////////////////////////////////////////////////////////////////

    $('#checkbox_Cliente').change(function() {
        if(this.checked) {

            getPublicoGeneral();

        }else{
            $('#txt_factura_Razon_Social').val(linea_Factura.cells[3].innerHTML);
            //$('#txt_factura_direccion').val(linea_Factura.cells[8].innerHTML);
            //$('#txt_factura_municipio').val(linea_Factura.cells[11].innerHTML);
            $('#txt_factura_rfc').val(linea_Factura.cells[10].innerHTML);
            //$('#txt_factura_colonia').val(linea_Factura.cells[9].innerHTML);
            //$('#txt_factura_estado').val(linea_Factura.cells[12].innerHTML);
            $('#txt_factura_cp').val(linea_Factura.cells[9].innerHTML);
            //$('#txt_factura_ciudad').val(linea_Factura.cells[10].innerHTML);
            $('#txt_factura_pais').val(linea_Factura.cells[8].innerHTML);
            $('#txt_modal_IdVenta').val(linea_Factura.cells[0].innerHTML);
            $('#txt_id_cliente_sale').val(linea_Factura.cells[11].innerHTML);

            //$('#txt_factura_direccion').removeAttr('readonly');
            //$('#txt_factura_municipio').removeAttr('readonly');
            //$('#txt_factura_rfc').attr('readonly');
            //$('#txt_factura_colonia').removeAttr('readonly');
            //$('#txt_factura_estado').removeAttr('readonly');
            $('#txt_factura_cp').removeAttr('readonly');
            //$('#txt_factura_ciudad').removeAttr('readonly');
            $('#txt_factura_pais').removeAttr('readonly');
            $('#txt_modal_IdVenta').removeAttr('readonly');
            $('#txt_id_cliente_sale').removeAttr('readonly');
            $('#txt_Uso_cfdi').removeAttr('disabled');
            $('#txt_Metodo_Pago').removeAttr('disabled');
            $('#AlertFormaPago').attr('hidden','hidden');
    }
        $('#checkbox_Cliente').val(this.checked);        
    });
});



function getRutaPDF($id){
    window.open(""+dir+"Clases/Reportes/Formato_Facturacion_33.php?ID="+$id+"");
}

function getRutaXML($id){
    window.open(""+dir+"Clases/RecuperarXML.php?ID="+$id+"");
}

function getValidateSaldos($id){
    window.open(""+dir+"Clases/ValidateSaldos.php?ID="+$id+"");
}

function GetIDCorreo(id)
{

    var formData = new FormData(); 
    formData.append("ID_Factura", id);

    var Correo = "";

    $.ajax({
        url: dir + 'index.php/Controller_Factura/Cargar_Correo_Distribuidor',
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
                toastr.warning('La factura no cuenta con correo electronico asignado','Advertencia'); 


            }else

            {

            let parseJson = JSON.parse(data);    

            Correo = parseJson['Factura'][0]['Email'];

            }



        }
    })
    .done(function()
    {
            let PDF = dir + "Formato_Factura/Formato_Factura_Generica_33.php?ID="+ id;
            let XML = dir + "Facturacion/Recuperar_XML_Generico.php?ID="+ id;

            var formData1 = new FormData();
            formData1.append("XML", XML);
            formData1.append("PDF", PDF);
            formData1.append("ID", id);
            formData1.append("Para", Correo);

            $.ajax({
                url: dir + 'index.php/Controller_Factura/Mandar_Email',
                type: 'POST',
                processData: false,
                contentType: false,
                timeout: 35000,
                data: formData1,
                beforeSend : function ()
                {
                   $('#Cargando').css('display','');
                },
                success: function(data)
                {
                    console.log(data);

                    if (data == true)
                    {
                        //swal("Correcto","La factura no cuenta con correo electronico asignado","success");

                        toastr.success('Correo enviado con exito','Correcto'); 
                    }
                    else
                    {
                        //swal("Error","Hubo un error al intetar enviar el correo","error");

                        toastr.error('Hubo un error al intetar enviar el correo','Error'); 
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
                $('#Cargando').css('display','none');
            });


    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
    });
}


function getFacturasCanceladas(ID_Cliente_Modal)
{
     $.ajax({
        url: dir + 'index.php/Controller_Factura/GetAllInvoicesCanceled',
        type: 'POST',
        timeout: 35000,
        data: {ID_Cliente_Modal: ID_Cliente_Modal},
        
        beforeSend : function ()
        {
            $('#Cargando').css('display','');
        },                                                                                   //Mandamos los datos del formulario por Ajax
        success: function(data)
        {
            if (data != null && data != "") 
            {

          var content = JSON.parse(data);

            $('#Tabla-facturas-canceladas').DataTable().destroy();

            var tablaCanceladas = document.getElementById("Tabla-facturas-canceladas");

            tablaCanceladas.tBodies[0].innerHTML = "";

                for (let i = 0; i <= content['info'].length -1; i++) 
                {
                    var row = tablaCanceladas.tBodies[0].insertRow(i);   

                    var celda0 = row.insertCell(0);
                    var celda1 = row.insertCell(1);
                    var celda2 = row.insertCell(2);
                    var celda3 = row.insertCell(3);
                    var celda4 = row.insertCell(4);
                    var celda5 = row.insertCell(5);

                    var txt3 = document.createElement("input");  // Create with DOM

                    let checkbox = document.createElement("input");
                    checkbox.setAttribute("type","checkbox");
                    checkbox.setAttribute("name","checkboxUUID");
                    checkbox.setAttribute("id","checkboxUUID" + i);
                    checkbox.setAttribute("value",content['info'][i]['UUID']);
                    celda0.appendChild(checkbox);
                    celda1.innerHTML = content['info'][i]['UUID'];
                    celda2.innerHTML = content['info'][i]['Serie'];
                    celda3.innerHTML = content['info'][i]['Folio'];
                    celda4.innerHTML = content['info'][i]['Fecha_Timbrado'];
                    celda5.innerHTML = "$" + content['info'][i]['Total'];

                }

            $('#Tabla-facturas-canceladas').dataTable({
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
                "select": true

            });

        }else
        { 
          toastr.info("El Cliente " + $('#txt_factura_Razon_Social').val() + " no cuenta con facturas canceladas sin relacionar",'Información'); 
            //swal("Información","El Cliente " + $('#txt_factura_Razon_Social').val() + " no cuenta con facturas canceladas sin relacionar","info");
        }
            
    }
    })
    .done(function() {
        $('#Cargando').css('display','none');
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {

    });
        }

    function getPublicoGeneral()
    {
        /*if(window.content){

            $('#txt_factura_Razon_Social').val(window.content['general'][0]['Empresa']);
            $('#txt_factura_direccion').val(window.content['general'][0]['Calle_numero']);
            $('#txt_factura_municipio').val(window.content['general'][0]['Municipio']);
            $('#txt_factura_rfc').val(window.content['general'][0]['RFC']);
            $('#txt_factura_colonia').val(window.content['general'][0]['Colonia']);
            $('#txt_factura_estado').val(window.content['general'][0]['Estado']);
            $('#txt_factura_cp').val(window.content['general'][0]['CP']);
            $('#txt_factura_ciudad').val(window.content['general'][0]['Ciudad']);
            $('#txt_factura_pais').val(window.content['general'][0]['Pais']);
            $('#txt_modal_IdVenta').val(linea_Factura.cells[0].innerHTML);
            $('#txt_id_cliente_sale').val(window.content['general'][0]['ID']);


            $('#txt_factura_direccion').attr('readonly', 'readonly');
            $('#txt_factura_municipio').attr('readonly', 'readonly');
            $('#txt_factura_colonia').attr('readonly', 'readonly');
            $('#txt_factura_estado').attr('readonly', 'readonly');
            $('#txt_factura_cp').attr('readonly', 'readonly');
            $('#txt_factura_ciudad').attr('readonly', 'readonly');
            $('#txt_factura_pais').attr('readonly', 'readonly');
            $('#txt_modal_IdVenta').attr('readonly', 'readonly');
            $('#txt_id_cliente_sale').attr('readonly', 'readonly');

            $('#txt_Uso_cfdi').val('P01');
            $('#txt_Uso_cfdi').attr('disabled', 'disabled');

            $('#txt_Metodo_Pago').val('PUE');
            $('#txt_Metodo_Pago').attr('disabled', 'disabled');

            $('#AlertFormaPago').removeAttr('hidden');

        }
        else
        {*/

          $('#txt_factura_Razon_Social').val('Publico General');
          $('#txt_factura_rfc').val('XAXX010101000');
          $('#txt_modal_IdVenta').val(linea_Factura.cells[0].innerHTML);

          $('#txt_factura_direccion').attr('readonly', 'readonly');
          $('#txt_factura_municipio').attr('readonly', 'readonly');
          $('#txt_factura_colonia').attr('readonly', 'readonly');
          $('#txt_factura_estado').attr('readonly', 'readonly');
          $('#txt_factura_cp').attr('readonly', 'readonly');
          $('#txt_factura_ciudad').attr('readonly', 'readonly');
          $('#txt_factura_pais').attr('readonly', 'readonly');
          $('#txt_modal_IdVenta').attr('readonly', 'readonly');
          $('#txt_id_cliente_sale').attr('readonly', 'readonly');

          $('#txt_Uso_cfdi').val('P01');
          $('#txt_Uso_cfdi').attr('disabled', 'disabled');

          $('#txt_Metodo_Pago').val('PUE');
          $('#txt_Metodo_Pago').attr('disabled', 'disabled');

          $('#AlertFormaPago').removeAttr('hidden');

            /*$.ajax({
                url: dir + 'index.php/Controller_Factura/GetPublicoGeneral',
                type: 'POST',
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: {RFC: 'XAXX010101000'},
                success: function(data)
                {

                    if (data != null && data != "") 
                    {

                    window.content = JSON.parse(data);
                    console.log(window.content);

                    console.log(window.content['general'].length);

                    $('#txt_factura_Razon_Social').val(window.content['general'][0]['Empresa']);
                    $('#txt_factura_direccion').val(window.content['general'][0]['Calle_numero']);
                    $('#txt_factura_municipio').val(window.content['general'][0]['Municipio']);
                    $('#txt_factura_rfc').val(window.content['general'][0]['RFC']);
                    $('#txt_factura_colonia').val(window.content['general'][0]['Colonia']);
                    $('#txt_factura_estado').val(window.content['general'][0]['Estado']);
                    $('#txt_factura_cp').val(window.content['general'][0]['CP']);
                    $('#txt_factura_ciudad').val(window.content['general'][0]['Ciudad']);
                    $('#txt_factura_pais').val(window.content['general'][0]['Pais']);
                    $('#txt_modal_IdVenta').val(linea_Factura.cells[0].innerHTML);
                    $('#txt_id_cliente_sale').val(window.content['general'][0]['ID']);


                    $('#txt_factura_direccion').attr('readonly', 'readonly');
                    $('#txt_factura_municipio').attr('readonly', 'readonly');
                    $('#txt_factura_colonia').attr('readonly', 'readonly');
                    $('#txt_factura_estado').attr('readonly', 'readonly');
                    $('#txt_factura_cp').attr('readonly', 'readonly');
                    $('#txt_factura_ciudad').attr('readonly', 'readonly');
                    $('#txt_factura_pais').attr('readonly', 'readonly');
                    $('#txt_modal_IdVenta').attr('readonly', 'readonly');
                    $('#txt_id_cliente_sale').attr('readonly', 'readonly');

                    $('#txt_Uso_cfdi').val('P01');
                    $('#txt_Uso_cfdi').attr('disabled', 'disabled');

                    $('#txt_Metodo_Pago').val('PUE');
                    $('#txt_Metodo_Pago').attr('disabled', 'disabled');

                    $('#AlertFormaPago').removeAttr('hidden');

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
                console.log("complete");
            });*/

    //}
        
    }


    function getValoresCheckBox()
    {

        var UUIDS = new Array();

       var checkbox = document.getElementsByName("checkboxUUID");

       for (var i = 0; i <= checkbox.length-1; i++) 
       {
           //console.log(checkbox[i]['defaultValue']);

           if($('#checkboxUUID' + i).prop('checked')) 
            {
                UUIDS[i] = $('#checkboxUUID' + i).val();
            }
       }

       return UUIDS;

    }
