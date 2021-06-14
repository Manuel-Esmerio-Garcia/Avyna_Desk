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


    var Ticket_HelpDesk = document.getElementById("Table_Ticket_HelpDesk");
    Ticket_HelpDesk.onclick = function(e)
    {
        window.Linea_HelpDesk = e.target.parentNode;

        let tbody = e.target.parentNode.parentNode;

        for(let x=0; x<tbody.rows.length; x++){
            tbody.rows[x].style.background = "transparent";
            tbody.rows[x].style.color = "black";
        }

        window.Linea_HelpDesk.style.background= '#1976D2';
        window.Linea_HelpDesk.style.color = "white";

        try
        {

            var ID          = window.Linea_HelpDesk.cells[0].innerHTML;
            var Fecha       = window.Linea_HelpDesk.cells[1].innerHTML;
            var Usuario     = window.Linea_HelpDesk.cells[2].innerHTML;
            var Titulo      = window.Linea_HelpDesk.cells[3].innerHTML;
            var Status      = window.Linea_HelpDesk.cells[5].innerHTML;
            var Descripcion = window.Linea_HelpDesk.cells[4].innerHTML;
            var IDUsuario   = window.Linea_HelpDesk.cells[6].innerHTML;
            //var Botones     = window.Linea_HelpDesk.cells[7].innerHTML;

        }catch(err)
        {
            console.log(err);
        }
    }


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
                    url: dir + 'index.php/Controller_HelpDesk/deleteTicket',
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

                                        toastr.success('Ticket Eliminado Con Exito','Correcto');
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

                                            toastr.error('Hubo un error al generar los eliminar el ticket por favor intente de nuevo','Error');

                        }
                    }
                })
                .done(function() {
                    //$('#Cargando_Comentar').css('display','none');
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    
                });
                
              } else {

              }
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

                toastr.warning('Por favor Seleccione un Ticket','Advertencia');

        }

    });


            $('#Editar_Ticket_HelpDesk').click(function(event){

                var check = false;

            if (window.Linea_HelpDesk != null && window.Linea_HelpDesk != "" && window.Linea_HelpDesk != 'undefined') 
            {

                    var data = new FormData();
                    data.append('ID', window.Linea_HelpDesk.cells[0].innerHTML);
                    data.append('IDUsuario', window.Linea_HelpDesk.cells[6].innerHTML);

                    //$('#Title_edit_model').text("N° de Ticket " + window.Linea_HelpDesk.cells[0].innerHTML);

                    var url = dir + "index.php/Controller_HelpDesk/getComentarios";
                    var http = new XMLHttpRequest();
                    http.open('POST', url, true);
                    http.onload = function () 
                    {

                        if (this.responseText != null) 
                        {
                            var json = this.responseText;

                            var parsed = JSON.parse(json);

                                acordeonID = document.getElementById("acordeon");
                                acordeonID.innerHTML = "";

                                var panel_default = document.createElement("div");
                                panel_default.classList.add('panel', 'panel-default');
                                panel_default.setAttribute('id', 'Coment');
                                $("#acordeon").appendChild(panel_default);

                                var panel_heading = document.createElement("div"); 
                                panel_heading.setAttribute('class','panel-heading'); //añade texto al div creado.
                                panel_default.appendChild(panel_heading);

                                var panel_title = document.createElement("p"); 
                                panel_title.classList.add('panel_title'); //añade texto al div creado.
                                panel_heading.appendChild(panel_title);

                                 var accordion_toggle = document.createElement("a"); 
                                accordion_toggle.classList.add('accordion_toggle', 'collapsed'); //añade texto al div creado.
                                accordion_toggle.setAttribute('data-toggle', 'collapse');
                                accordion_toggle.setAttribute('data-parent', '#acordeon');
                                accordion_toggle.setAttribute('href', '#collapse');
                                accordion_toggle.innerHTML = parsed['TicketCliente'][0]['Titulo'];
                                panel_title.appendChild(accordion_toggle);

                                var panel_collapse = document.createElement("div"); 
                                panel_collapse.classList.add('panel-collapse', 'collapse'); //añade texto al div creado.
                                panel_collapse.setAttribute('id', 'collapse');
                                panel_default.appendChild(panel_collapse);

                                var panel_body = document.createElement("div"); 
                                panel_body.classList.add('panel-body');
                                panel_body.innerHTML = parsed['TicketCliente'][0]['Descripcion'];
                                panel_collapse.appendChild(panel_body);

                            for (var i = 0; i <= parsed['Comentarios'].length -1; i++) 
                            {
                                //console.log(arr[i]['Comentario']);

                                var panel_default = document.createElement("div");
                                panel_default.classList.add('panel', 'panel-default');
                                panel_default.setAttribute('id', 'Descrip' + parsed['Comentarios'][i]['ID']);
                                $("#acordeon").appendChild(panel_default);

                                var panel_heading = document.createElement("div"); 
                                panel_heading.setAttribute('class','panel-heading'); //añade texto al div creado.
                                panel_default.appendChild(panel_heading);

                                var panel_title = document.createElement("p"); 
                                panel_title.classList.add('panel_title'); //añade texto al div creado.
                                panel_heading.appendChild(panel_title);

                                 var accordion_toggle = document.createElement("a"); 
                                accordion_toggle.classList.add('accordion_toggle', 'collapsed'); //añade texto al div creado.
                                accordion_toggle.setAttribute('data-toggle', 'collapse');
                                accordion_toggle.setAttribute('data-parent', '#acordeon');
                                accordion_toggle.setAttribute('href', '#collapse' + parsed['Comentarios'][i]['ID']);
                                accordion_toggle.innerHTML = parsed['Comentarios'][i]['Titulo'];
                                panel_title.appendChild(accordion_toggle);

                                var panel_collapse = document.createElement("div"); 
                                panel_collapse.classList.add('panel-collapse', 'collapse'); //añade texto al div creado.
                                panel_collapse.setAttribute('id', 'collapse' + parsed['Comentarios'][i]['ID']);
                                panel_default.appendChild(panel_collapse);

                                var panel_body = document.createElement("div"); 
                                panel_body.classList.add('panel-body');
                                panel_body.innerHTML = parsed['Comentarios'][i]['Comentario'];                               
                                panel_collapse.appendChild(panel_body);

                            }

                            function $(selector)
                            {
                                return document.querySelector(selector);
                            }

                            //panel_default.remove();
                            //console.log(arr);                   
                        }
                    // do something to response
                    //console.log(this.responseText);

                    };
                    http.send(data);

                    $('#edit_ID').val(window.Linea_HelpDesk.cells[0].innerHTML);
                    $('#edit_Fecha').val();
                    $('#edit_Titulo').val(window.Linea_HelpDesk.cells[3].innerHTML);
                    $('#edit_Descripcion').val(window.Linea_HelpDesk.cells[2].innerHTML + "       " + window.Linea_HelpDesk.cells[1].innerHTML + "\n" + window.Linea_HelpDesk.cells[4].innerHTML);
                    $('#edit_cmb_new_Status').val(window.Linea_HelpDesk.childNodes[5].childNodes[0].innerHTML);
                    $('#Title_edit_model').text("Ticket Creado Por " + window.Linea_HelpDesk.cells[2].innerHTML);
                    $('#Add_Comentario').bootstrapToggle('off');

                    $('#Add_Comentario').change(function() 
                    {

                        if ($('#Add_Comentario').prop('checked') == true) 
                        {
                            $('#Comentario').removeAttr('hidden');

                        }else{

                            $('#Comentario').attr('hidden', 'hidden');
                        } 

                    });

                    $("#ComentarTicket").modal('show'); 
                
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

                toastr.warning('Para Continuar por favor seleccione un Ticket','Advertencia');

            }

        });


        $('#Guardar_Cambios_Help').click(function(event){

            var ID = $('#edit_ID').val();
            var Fecha = $('#edit_Fecha').val();
            var Titulo = $('#edit_Titulo').val();
            //var Descripcion = $('#edit_Descripcion').val();
            var Status = $('#edit_cmb_new_Status').val();
            var Comentario = $('#edit_Comentario').val();
            var Session = $('#ID_Session').val();
            var Titulo_Comentario = $('#titulo_Comentario').val();

                var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
                var f=new Date();

                var datetime = f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + "  " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();

                var Detalle = Comentario;

                var formData1 = 'IDTickets=' + ID + '&Titulo=' + Titulo_Comentario + '&Comentario=' + Detalle + '&Status=' + Status + '&Session=' + Session;


                $.ajax({
                        url: dir + 'index.php/Controller_HelpDesk/AddComentarios',
                        type: 'post',
                        //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                        timeout: 35000,
                        processData: false,
                        data:formData1,
                        beforeSend : function ()
                        {
                            $('#Cargando_Comentario_HelpDesk').css('display','');
                        },
                        success: function(data)
                                    {
                                    console.log(data);

                                    if (data == true) {

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
                                              "timeOut": "700",
                                              "extendedTimeOut": "1000",
                                              "showEasing": "swing",
                                              "hideEasing": "linear",
                                              "showMethod": "fadeIn",
                                              "hideMethod": "fadeOut",
                                              "onHidden": function()
                                              { 
                                                $('#Table_Ticket_HelpDesk').DataTable().destroy(); 
                                                fetch_Help('no','','','','');
                                              }
                                            }

                                            $("#ComentarTicket").modal("hide");

                                            toastr.success('Comentario guardado con exito','Correcto');

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
                                              "timeOut": "1000",
                                              "extendedTimeOut": "1000",
                                              "showEasing": "swing",
                                              "hideEasing": "linear",
                                              "showMethod": "fadeIn",
                                              "hideMethod": "fadeOut"
                                                }

                                                toastr.error('Hubo un error al guardar los cambios por favor intente de nuevo','Error');
                                    }

                                    }
                    })
                    .done(function() {
                        $('#Cargando_Comentario_HelpDesk').css('display','none');
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
                
        });



            $('#Comentar_Ticket_HelpDesk').click(function(event) {

            if (window.Linea_HelpDesk != null && window.Linea_HelpDesk != "" && window.Linea_HelpDesk != 'undefined') 
            {

                 var data = new FormData();
                    data.append('ID', window.Linea_HelpDesk.cells[0].innerHTML);
                    data.append('IDUsuario', window.Linea_HelpDesk.cells[6].innerHTML);

                    $('#Title_edit_HelpDesk').text("N° de Ticket " + window.Linea_HelpDesk.cells[0].innerHTML);

                    var url = dir + "index.php/Controller_HelpDesk/getComentarios";
                    var http = new XMLHttpRequest();
                    http.open('POST', url, true);
                    http.onload = function () 
                    {

                        if (this.responseText != null) 
                        {
                            let json = this.responseText;

                            let parsed = JSON.parse(json);


                                divAcordeon = document.getElementById("divacordeon");
                                divAcordeon.innerHTML = "";

                                var form_group = document.createElement("div");
                                form_group.classList.add('form-group');
                                $("#divacordeon").appendChild(form_group);

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

                                var btnEditar = document.createElement("button");
                                btnEditar.classList.add('btn', 'btn-sm', 'btn-warning');
                                btnEditar.setAttribute('id','EditarComentario_' + parsed['Comentarios'][i]['ID']);
                                btnEditar.setAttribute('style','float: right');
                                collapse.appendChild(btnEditar);

                                var EditarIcon = document.createElement("span");
                                EditarIcon.classList.add('glyphicon', 'glyphicon-pencil');
                                btnEditar.appendChild(EditarIcon);

                                var btnEliminar = document.createElement("button");
                                btnEliminar.classList.add('btn', 'btn-sm', 'btn-danger');
                                btnEliminar.setAttribute('id','EliminarComentario_' + parsed['Comentarios'][i]['ID']);
                                btnEliminar.setAttribute('style','float: right');
                                collapse.appendChild(btnEliminar);

                                var EliminarIcon = document.createElement("span");
                                EliminarIcon.classList.add('glyphicon', 'glyphicon-trash');
                                btnEliminar.appendChild(EliminarIcon);


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

                $('#EditarTicketHelpDesk').modal('show');

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

    fetch_Help('no','','','','');


    $('#Ticket_HelpDesk_Desde').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });
    $('#Ticket_HelpDesk_Hasta').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });

    /* Btn Boton Buscar ventas */

    $("#Ticket_HelpDesk_Buscar").click(function(){

      var start_date = $('#Ticket_HelpDesk_Desde').val();
      var end_date = $('#Ticket_HelpDesk_Hasta').val();
      var Status = $('#Ticket_HelpDesk_cmb_Estatus').val();
      var Usuario = $('#Ticket_HelpDesk_cmb_Usuario').val();

      if (start_date != '' && end_date != '') {

        $('#Table_Ticket_HelpDesk').DataTable().destroy();
        fetch_Help('yes', start_date, end_date,Status,Usuario);

      }else{
        
        $('#Table_Ticket_HelpDesk').DataTable().destroy();
        fetch_Help('no','','','','');
      }

    });

    $('#Ticket_HelpDesk_cmb_Estatus').trigger('change'); //This event will fire the change event. 
    $('#Ticket_HelpDesk_cmb_Estatus').change(function()
    {

      var start_date = $('#Ticket_HelpDesk_Desde').val();
      var end_date = $('#Ticket_HelpDesk_Hasta').val();
      var data= $(this).val();
      var Usuario = $('#Ticket_HelpDesk_cmb_Usuario').val();

      console.log(data);

          if (data != '') {

            if (start_date != '' && end_date != '') 
            {
                $('#Table_Ticket_HelpDesk').DataTable().destroy();

                fetch_Help('yes', start_date, end_date,data,Usuario);
            }

            else
            {
                $('#Table_Ticket_HelpDesk').DataTable().destroy();

                fetch_Help('no', start_date, end_date,data,Usuario);
            }

          }else{

            if (start_date != '' && end_date != '') 
            {
                $('#Table_Ticket_HelpDesk').DataTable().destroy();

                fetch_Help('yes', start_date, end_date,data,Usuario);

            }else{

                $('#Table_Ticket_HelpDesk').DataTable().destroy();

                fetch_Help('no', start_date, end_date,data,Usuario);
            }

          }          
    });

    $('#Ticket_HelpDesk_cmb_Usuario').trigger('change'); //This event will fire the change event. 
    $('#Ticket_HelpDesk_cmb_Usuario').change(function()
    {

      var start_date = $('#Ticket_HelpDesk_Desde').val();
      var end_date = $('#Ticket_HelpDesk_Hasta').val();
      var data= $(this).val();
      var Status = $('#Ticket_HelpDesk_cmb_Estatus').val();

      console.log(data);

          if (data != '') {

            if (start_date != '' && end_date != '') 
            {
                $('#Table_Ticket_HelpDesk').DataTable().destroy();

                fetch_Help('yes', start_date, end_date,Status,data);
            }

            else
            {
                $('#Table_Ticket_HelpDesk').DataTable().destroy();

                fetch_Help('no', start_date, end_date,Status,data);
            }

          }else{

            if (start_date != '' && end_date != '') 
            {
                $('#Table_Ticket_HelpDesk').DataTable().destroy();

                fetch_Help('yes', start_date, end_date,Status,data);

            }else{

                $('#Table_Ticket_HelpDesk').DataTable().destroy();

                fetch_Help('no', start_date, end_date,Status,data);
            }

          }          
    });


});

    function fetch_Help(is_date_search, start_date='', end_date='', Status='', Usuario=''){

      var dataTable = $('#Table_Ticket_HelpDesk').DataTable({
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
                    "targets": 5,
                    'render': function (data, type, full, meta)
                    {
                        if (full[5] == 'Pendiente')
                        {
                          return "<label class='label label-danger'>Pendiente</label>"
                        }
                        else if (full[5] == 'En Proceso')
                        {
                          return "<label class='label label-warning'>En Proceso</label>"
                        }
                        else if (full[5] == 'Resuelto')
                        {
                          return "<label class='label label-success'>Resuelto</label>"
                        }

                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                }
            ],
        "order" : [],
        "ajax" : {

            url: dir + "Clases/fetch_HelpDesk.php",
            type: "POST",
            data:{
              is_date_search:is_date_search, start_date:start_date, end_date:end_date, Status:Status, Usuario:Usuario
            }
        }
      });
    }
