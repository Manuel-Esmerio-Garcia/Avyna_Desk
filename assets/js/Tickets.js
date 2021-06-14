window.Linea_Ticket;
window.Linea_HelpDesk;
var dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';

window.addEventListener("load",function(e)
{


    var ID_User = $('#ID_HelpDesk').val();

    if (ID_User == 1) 
    {

        var Tab1 = $('#Ticket-tab-link1');

        Tab1.removeClass('active');

        var Tab2 = $('#Ticket-tab-link2');

        Tab2.addClass('active');
    }else{

        var Tab1 = $('#Ticket-tab-link1');

        Tab1.addClass('active');

        var Tab2 = $('#Ticket-tab-link2');

        Tab2.removeClass('active');
    }

    var Ticket = document.getElementById("Tabla_Ticket");
    Ticket.onclick = function(e)
    {
        window.Linea_Ticket = e.target.parentNode;

        let tbody = e.target.parentNode.parentNode;

        for(let x=0; x<tbody.rows.length; x++){
            tbody.rows[x].style.background = "transparent";
            tbody.rows[x].style.color = "black";
        }

        window.Linea_Ticket.style.background= '#1976D2';
        window.Linea_Ticket.style.color = "white";

        try
        {

            var ID          = window.Linea_Ticket.cells[0].innerHTML;
            var Fecha       = window.Linea_Ticket.cells[1].innerHTML;
            var Titulo      = window.Linea_Ticket.cells[2].innerHTML;
            var Descripcion = window.Linea_Ticket.cells[3].innerHTML;
            var Status      = window.Linea_Ticket.cells[4].innerHTML;
            var IDUsuario   = window.Linea_Ticket.cells[5].innerHTML;
            //var Botones     = window.Linea_Ticket.cells[6].innerHTML;

        }catch(err)
        {
            console.log(err);
        }

    }

    /*Funciones de crear Eliminar y editar Tickets del Usuario*/
    $('#Editar_Ticket').click(function(event)
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

        var check = false;

        if (window.Linea_Ticket != null && window.Linea_Ticket != "" && window.Linea_Ticket != 'undefined'){

            $("#EditarTicketModal").modal('show'); 

            console.log(window.Linea_Ticket);
            console.log(window.Linea_Ticket.childNodes[4]);
            console.log(window.Linea_Ticket.childNodes[4].childNodes[0]);

            if (window.Linea_Ticket.childNodes[4].childNodes[0].innerHTML != "Pendiente") { 

                toastr.info('El Ticket esta con estado de ' + window.Linea_Ticket.childNodes[4].childNodes[0].innerHTML + '','Información');

               // swal("Información","El Ticket esta en " + window.Linea_Ticket.cells[4].innerHTML, "info");

                $('#GuardarModalTicket').attr('disabled', 'disabled');

                //$('#Combo_Status').attr('hidden','hidden');

                $('#edit_TituloTicket').val(window.Linea_Ticket.cells[2].innerHTML);
                $('#edit_DescripcionTicket').val(window.Linea_Ticket.cells[3].innerHTML);
                //$('#Combo_Status_Tick').val(window.Linea_Ticket.cells[3].innerHTML);

                $('#edit_TituloTicket').attr('disabled', 'disabled');
                $('#edit_DescripcionTicket').attr('disabled', 'disabled');
                //$('#Combo_Status_Tick').attr('disabled', 'disabled');


            }else{

                //$('#Combo_Status').removeAttr('hidden');

                //$('#cmb_Estatus_Tick').attr('hidden');
                $('#GuardarModalTicket').removeAttr('disabled');

                $('#edit_TituloTicket').removeAttr('disabled');
                $('#edit_DescripcionTicket').removeAttr('disabled');
                //$('#cmb_Estatus').removeAttr('disabled');

                $('#edit_TituloTicket').val(window.Linea_Ticket.cells[2].innerHTML);
                $('#edit_DescripcionTicket').val(window.Linea_Ticket.cells[3].innerHTML);

                $('#GuardarModalTicket').click(function(){

                    if (!check) 
                    {
                        check = true;
                
                        if ($('#edit_TituloTicket').val() != null && $('#edit_DescripcionTicket').val() != null && $('#edit_TituloTicket').val() != "" && $('#edit_DescripcionTicket').val() != "") 
                        {
                            var Titulo          = $('#edit_TituloTicket').val();
                            var Descripcion     = $('#edit_DescripcionTicket').val();
                            var Fecha           = $('#edit_dateTicket').text();
                            var ID_User         = $('#edit_id_userTicket').val();
                            var Status          = window.Linea_Ticket.childNodes[4].childNodes[0].innerHTML;
                            var ID              = window.Linea_Ticket.cells[0].innerHTML;

                            var formData1 =  'ID=' + ID + '&FechaHora=' + Fecha + '&idUsuario_solicita=' + ID_User + '&Titulo=' + Titulo + '&Descripcion=' + Descripcion + '&Status=' + Status;

                            $.ajax({
                                url: dir + 'index.php/Controller_Ticket/EditTicket',
                                type: 'post',
                                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                                timeout: 35000,
                                processData: false,
                                data:formData1,
                                beforeSend : function (){

                                    $('#Cargando').css('display','');
                                 },
                                success: function(data)
                                {
                                    console.log(data);

                                    if (data == true) 
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

                                        toastr.success('Ticket Modificado Con Exito','Correcto');
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

                                            toastr.error('Hubo un error al generar los datos por favor intente de nuevo','Error');
                                    }
                                }
                            })
                            .done( function (data, status) {

                                   //$('#Cargando_Editar').css('display','none');
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
                            

                        }else{

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

                        toastr.warning('Los campos Titulo y Descripción son obligatorios','Advertencia');

                        }

                    }

                    });



            } // End if

        }else{

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

                        toastr.warning('Por favor Seleccione un Ticket','Advertencia');
            }
        
    });

    $('#Nuevo_Ticket').click(function(event)
    {
        var check = false;

        $('#GuardarModalnew').click(function()
        {

        if (!check) 
        {

            check = true;

                var Fecha       = $('#new_date').text(); 
                var Titulo      = $('#new_Titulo').val();
                var Descripcion = $('#new_Descripcion').val();
                var Status      = "Pendiente";
                var ID_Usuario  =  $('#new_id_user').val();

            if (Titulo != null && Descripcion != null) 
            {
                var formData1 =  'FechaHora=' + Fecha + '&idUsuario_solicita=' + ID_Usuario + '&Titulo=' + Titulo + '&Descripcion=' + Descripcion + '&Status=' + Status;

                $.ajax({
                    url: dir + 'index.php/Controller_Ticket/AddTicket',
                    type: 'post',
                    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                    timeout: 35000,
                    processData: false,
                    data:formData1,
                    beforeSend : function ()
                    {
                      $('#Cargando').css('display','');
                    },
                     success: function(data)
                    {
                        console.log(data);

                        if (data == true) 
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

                            toastr.success('Ticket Generado Con Exito','Correcto');
                            //alert("Se ha agregado el nuevo usuario de manera exitosa");  
                            
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

                            toastr.error('Hubo un error al generar los datos por favor intente de nuevo','Error');
                        }
                    }
                })
                .done(function() {
                    //$('#Cargando_Nuevo').css('display','none');
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

                        toastr.warning('Los campos Titulo y Descripción son obligatorios','Advertencia');
            }

        } //fin check

        });
            

        
    });


    $('#Eliminar_Ticket').click(function(){

        if (window.Linea_Ticket != null && window.Linea_Ticket != "" && window.Linea_Ticket != 'undefined')
        {

            swal({
              title: "Esta Seguro que Desea Eliminar el Ticket?",
              text: "Este proceso es irreversible",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {

                var formData1 =  'ID=' + window.Linea_Ticket.cells[0].innerHTML;

                $.ajax({
                    url: dir + 'index.php/Controller_Ticket/deleteTicket',
                    type: 'post',
                    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                    timeout: 35000,
                    processData: false,
                    data:formData1,
                    beforeSend : function ()
                    {
                        $('#loader').show();
                    },
                     success: function(data)
                    {
                        console.log(data);

                        if (data == true) 
                        {
                            swal('Exito !!', 'Ticket Eliminado Con Exito','success');
                            //alert("Se ha agregado el nuevo usuario de manera exitosa");  
                            location.reload();
                        }
                        else
                        {
                            swal("Error !!", "Hubo un error al generar los eliminar el ticket por favor intente de nuevo", "error");
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
                

                swal("Eliminación Exitosa", {
                  icon: "success",
                });
              } else {
                swal("Proceso abortado !");
              }
            });

        }
        else
        {
            swal("Advertencia !!", "Por favor Seleccione un Ticket", "warning");

        }

    });


        $('#Ver_Tickets').click(function(event){

            if (window.Linea_Ticket != null && window.Linea_Ticket != "" && window.Linea_Ticket != 'undefined')
            {

                var data = new FormData();
                data.append('ID', window.Linea_Ticket.cells[0].innerHTML);
                data.append('IDUsuario', window.Linea_Ticket.cells[5].innerHTML);

                $('#Title_Ver_Tickets').text("N° de Ticket " + window.Linea_Ticket.cells[0].innerHTML);

                var url = dir + "index.php/Controller_Ticket/getComentarios";
                var http = new XMLHttpRequest();
                http.open('POST', url, true);
                http.onload = function () 
                {

                    if (this.responseText != null) 
                    {
                        let json = this.responseText;

                        let parsed = JSON.parse(json);


                            divAcordeon = document.getElementById("divacordeon_Ver");
                            divAcordeon.innerHTML = "";

                            var form_group = document.createElement("div");
                            form_group.classList.add('form-group');
                            $("#divacordeon_Ver").appendChild(form_group);

                            var button = document.createElement("button"); 
                            button.classList.add('btn', 'btn-primary', 'form-control');
                            button.setAttribute('type', 'button');
                            button.setAttribute('data-toggle', 'collapse');
                            button.setAttribute('data-target', '#demo');
                            button.innerHTML = parsed['TicketCliente'][0]['Titulo'];;
                            form_group.appendChild(button);

                            var collapse = document.createElement("div"); 
                            collapse.classList.add('collapse'); //añade texto al div creado.
                            collapse.setAttribute('id','demo');
                            form_group.appendChild(collapse);

                             var textarea = document.createElement("textarea"); 
                            textarea.classList.add('form-control'); //añade texto al div creado.
                            textarea.setAttribute('rows', '5');
                            textarea.innerHTML = parsed['TicketCliente'][0]['Descripcion'];;
                            collapse.appendChild(textarea);

                            
                        for (var i = 0; i <= parsed['Comentarios'].length -1; i++) 
                        {

                            var form_group = document.createElement("div");
                            form_group.classList.add('form-group');
                            divAcordeon.appendChild(form_group);

                            var button = document.createElement("button"); 
                            button.classList.add('btn', 'btn-info', 'form-control');
                            button.setAttribute('type', 'button');
                            button.setAttribute('data-toggle', 'collapse');
                            button.setAttribute('data-target', '#demo' + parsed['Comentarios'][i]['ID']);
                            button.innerHTML = parsed['Comentarios'][i]['Titulo'];;
                            form_group.appendChild(button);

                            var collapse = document.createElement("div"); 
                            collapse.classList.add('collapse'); //añade texto al div creado.
                            collapse.setAttribute('id','demo' + parsed['Comentarios'][i]['ID']);
                            form_group.appendChild(collapse);

                             var textarea = document.createElement("textarea"); 
                            textarea.classList.add('form-control'); //añade texto al div creado.
                            textarea.setAttribute('rows', '5');
                            textarea.innerHTML = parsed['Comentarios'][i]['Comentario'];
                            collapse.appendChild(textarea);

                        }


                        function $(selector)
                        {
                            return document.querySelector(selector);
                        }

                    }
                // do something to response
                //console.log(this.responseText);

                };
                http.send(data);

                $('#VerTickets').modal('show');

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

                        toastr.warning('Para Continuar por favor seleccione un Ticket','Advertencia');
            }


        });

});

$(document).ready(function(){

    console.log($('#ID_Ticket').val());

    fetch_Ticket('no','','','',$('#ID_Ticket').val());

    $('#Ticket_Desde').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });
    $('#Ticket_Hasta').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });

    /* Btn Boton Buscar ventas */

    $("#Ticket_Buscar").click(function(){

      var start_date = $('#Ticket_Desde').val();
      var end_date = $('#Ticket_Hasta').val();
      var Status = $('#Ticket_cmb_Estatus').val();
      var Usuario = $('#ID_Ticket').val();

      if (start_date != '' && end_date != '') {

        $('#Tabla_Ticket').DataTable().destroy();
        fetch_Ticket('yes', start_date, end_date,Status,Usuario);

      }else{
        
        $('#Tabla_Ticket').DataTable().destroy();
        fetch_Ticket('no','', '',Status,Usuario);
      }

    });

    $('#Ticket_cmb_Estatus').trigger('change'); //This event will fire the change event. 
    $('#Ticket_cmb_Estatus').change(function()
    {

      var start_date    = $('#Ticket_Desde').val();
      var end_date      = $('#Ticket_Hasta').val();
      var data          = $(this).val();
      var Usuario       = $('#ID_Ticket').val();

      console.log(data);

          if (data != '') {

            if (start_date != '' && end_date != '') 
            {
                $('#Tabla_Ticket').DataTable().destroy();

                fetch_Ticket('yes', start_date, end_date,data,Usuario);
            }

            else
            {
                $('#Tabla_Ticket').DataTable().destroy();

                fetch_Ticket('no', start_date, end_date,data,Usuario);
            }

          }else{

            if (start_date != '' && end_date != '') 
            {
                $('#Tabla_Ticket').DataTable().destroy();

                fetch_Ticket('yes', start_date, end_date,data,Usuario);

            }else{

                $('#Tabla_Ticket').DataTable().destroy();

                fetch_Ticket('no', start_date, end_date,data,Usuario);
            }

          }          
    });

});

    function fetch_Ticket(is_date_search, start_date='', end_date='', Status='', Usuario=''){

      var dataTable = $('#Tabla_Ticket').DataTable({
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
                    "targets": 4,
                    'render': function (data, type, full, meta)
                    {
                        if (full[4] == 'Pendiente')
                        {
                          return "<label class='label label-danger'>Pendiente</label>"
                        }
                        else if (full[4] == 'En Proceso')
                        {
                          return "<label class='label label-warning'>En Proceso</label>"
                        }
                        else if (full[4] == 'Resuelto')
                        {
                          return "<label class='label label-success'>Resuelto</label>"
                        }
                        else
                        {
                          return "<label class='label label-danger'>Pendiente</label>"
                        }

                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                }
            ],
        "order" : [],
        "ajax" : {

            url: dir + "Clases/fetch_Tickets.php",
            type: "POST",
            data:{
              is_date_search:is_date_search, start_date:start_date, end_date:end_date, Status:Status, Usuario:Usuario
            }
        }
      });
    }