window.Linea_Ventas;
window.Linea_Ventas_Menudeo;
var dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';

window.addEventListener("load",function(e)
{

  console.log("Table_Ventas_Menudeo!");

  var Table_Ventas_Menudeo = document.getElementById("table_reporte_ventas_menudeo");
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

        console.log(window.Linea_Ventas_Menudeo.cells[0].innerHTML);

        Consulta_Ventas_Menudeo(window.Linea_Ventas_Menudeo.cells[0].innerHTML);

        try
        {

            var ID          = window.Linea_Ventas_Menudeo.cells[0].innerHTML;
            var Cliente     = window.Linea_Ventas_Menudeo.cells[1].innerHTML;
            var Total       = window.Linea_Ventas_Menudeo.cells[2].innerHTML;
            var Subtotal    = window.Linea_Ventas_Menudeo.cells[3].innerHTML;
            var Impuesto    = window.Linea_Ventas_Menudeo.cells[4].innerHTML;
            var Status      = window.Linea_Ventas_Menudeo.cells[5].innerHTML;
            var Fecha     = window.Linea_Ventas_Menudeo.cells[6].innerHTML;
            //var Botones     = window.Linea_Ticket.cells[6].innerHTML;

        }catch(err)
        {
            console.log(err);
        }

    }

    console.log("Table_Ventas!");

    var Table_Ventas = document.getElementById("table_reporte_ventas");
    Table_Ventas.onclick = function(e)
    {
        window.Linea_Ventas = e.target.parentNode;

        let tbody = e.target.parentNode.parentNode;

        for(let x=0; x<tbody.rows.length; x++)
        {
            tbody.rows[x].style.background = "transparent";
            tbody.rows[x].style.color = "black";
        }

        window.Linea_Ventas.style.background= '#1976D2';
        window.Linea_Ventas.style.color = "white";

        console.log(window.Linea_Ventas.cells[0].innerHTML);

        Consulta_Ventas(window.Linea_Ventas.cells[0].innerHTML);

         try
        {

            var ID          = window.Linea_Ventas.cells[0].innerHTML;
            var Cliente     = window.Linea_Ventas.cells[1].innerHTML;
            var Total       = window.Linea_Ventas.cells[2].innerHTML;
            var Status      = window.Linea_Ventas.cells[3].innerHTML;
            var Fecha       = window.Linea_Ventas.cells[4].innerHTML;
            //var Botones     = window.Linea_Ticket.cells[6].innerHTML;

        }catch(err)
        {
            console.log(err);
        }

    }

});


$(document).ready(function() { 

console.log("Cargamos Tablas");

        fetch_data('no','','','','');
        fetch_data_Menudeo('no','','','','');

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
      var ciudad = $('#cmb_sucursal_ventas').val();
      var Status = $('#cmb_status_ventas').val();

      console.log(ciudad);
      console.log(Status);


      if (start_date != '' && end_date != '') {

        $('#table_reporte_ventas').DataTable().destroy();

        fetch_data('yes', start_date, end_date,ciudad,Status);

      }else{
        
        $('#table_reporte_ventas').DataTable().destroy();
        fetch_data('no','','','','');
      }

    });

      $('#cmb_sucursal_ventas').trigger('change'); //This event will fire the change event. 
        $('#cmb_sucursal_ventas').change(function(){

          var start_date = $('#start_date_Ventas').val();
          var end_date = $('#end_date_Ventas').val();
          var data= $(this).val();
          var Status = $('#cmb_status_ventas').val();

          console.log(data);

              if (data != '') {

                if (start_date != '' && end_date != '') 
                {
                    $('#table_reporte_ventas').DataTable().destroy();

                    fetch_data('yes', start_date, end_date,data,Status);
                }

                else
                {
                    $('#table_reporte_ventas').DataTable().destroy();

                    fetch_data('no', start_date, end_date,data,Status);
                }

              }else{

                if (start_date != '' && end_date != '') 
                {
                    $('#table_reporte_ventas').DataTable().destroy();

                    fetch_data('yes', start_date, end_date,data,Status);

                }else{

                    $('#table_reporte_ventas').DataTable().destroy();

                    fetch_data('no', start_date, end_date,data,Status);
                }
    
              }          
        });

        $('#cmb_status_ventas').trigger('change'); //This event will fire the change event. 
        $('#cmb_status_ventas').change(function(){

          var start_date = $('#start_date_Ventas').val();
          var end_date = $('#end_date_Ventas').val();
          var data= $(this).val();
          var ciudad = $('#cmb_sucursal_ventas').val();

          console.log(data);

              if (data != '') {

                if (start_date != '' && end_date != '') 
                {
                    $('#table_reporte_ventas').DataTable().destroy();

                    fetch_data('yes', start_date, end_date,ciudad,data);
                }

                else
                {
                    $('#table_reporte_ventas').DataTable().destroy();

                    fetch_data('no', start_date, end_date,ciudad,data);
                }

              }else{

                 if (start_date != '' && end_date != '') 
                {
                    $('#table_reporte_ventas').DataTable().destroy();

                    fetch_data('yes', start_date, end_date,ciudad,data);
                }

                else
                {
                    $('#table_reporte_ventas').DataTable().destroy();

                    fetch_data('no', start_date, end_date,ciudad,data);
                }
                
              }          
        });


        $('#start_date_Ventas_Menudeo').datepicker({
    format: "yyyy-mm-dd",
    autoclose: true
    });

    $('#end_date_Ventas_Menudeo').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });

    $("#btn_buscar_venta_fecha_Menudeo").click(function(){

      var start_date = $('#start_date_Ventas_Menudeo').val();
      var end_date = $('#end_date_Ventas_Menudeo').val();
      var Status = $('#cmb_status_ventas_Menudeo').val();

      console.log(Status);
      console.log(start_date);
      console.log(end_date);

      if (start_date != '' && end_date != '') {

        $('#table_reporte_ventas_menudeo').DataTable().destroy();

        fetch_data_Menudeo('yes', start_date, end_date,Status);

      }else{
        
        $('#table_reporte_ventas_menudeo').DataTable().destroy();
        fetch_data_Menudeo('no','','','','');
      }

    });

    $('#cmb_status_ventas_Menudeo').trigger('change'); //This event will fire the change event. 
        $('#cmb_status_ventas_Menudeo').change(function(){

          var start_date = $('#start_date_Ventas_Menudeo').val();
          var end_date = $('#end_date_Ventas_Menudeo').val();
          var data= $(this).val();

          console.log(data);

              if (data != '') {

                if (start_date != '' && end_date != '') 
                {
                    $('#table_reporte_ventas_menudeo').DataTable().destroy();

                    fetch_data_Menudeo('yes', start_date, end_date,data);
                }

                else
                {
                    $('#table_reporte_ventas_menudeo').DataTable().destroy();

                    fetch_data_Menudeo('no', start_date, end_date,data);
                }

              }else{

                 if (start_date != '' && end_date != '') 
                {
                    $('#table_reporte_ventas_menudeo').DataTable().destroy();

                    fetch_data_Menudeo('yes', start_date, end_date,data);
                }

                else
                {
                    $('#table_reporte_ventas_menudeo').DataTable().destroy();

                    fetch_data_Menudeo('no', start_date, end_date,data);
                }
                
              }          
        });

      $('#Ver_Detalle_Venta').click(function(){

        if (window.Linea_Ventas != null) 
        {
          var formData1 =  'ID=' + window.Linea_Ventas.cells[0].innerHTML;

      $.ajax({
        url: dir + 'index.php/Controller_Reporte_Venta/GetDetalle_Venta_Menudeo',
        type: 'post',
        //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
        timeout: 35000,
        processData: false,
        data:formData1,
        beforeSend : function ()
        {
            $("#Cargando_Venta").css('display','');
        },   
        success: function(data)
        {

          var parsed = JSON.parse(data);

          if (parsed['detalle_ventas_menudeo'].length != 0) {

          var DetalleVenta = document.getElementById("Tabla_Detalle_Venta");

          var Subtotal    = parsed['detalle_ventas_menudeo'][0]['Subtotal'];
          var Impuestos   = parsed['detalle_ventas_menudeo'][0]['Impuestos'];
          var total       = parsed['detalle_ventas_menudeo'][0]['Total'];
          var Descuento   = parsed['detalle_ventas_menudeo'][0]['Descuento'];

          var Subtotal_Menudeo    = parsed['detalle_ventas_menudeo'][0]['Subtotal_Menudeo'];
          var Impuestos_Menudeo   = parsed['detalle_ventas_menudeo'][0]['Impuestos_Menudeo'];
          var total_Menudeo       = parsed['detalle_ventas_menudeo'][0]['Total_Menudeo'];
          var Descuento_Menudeo   = parsed['detalle_ventas_menudeo'][0]['Descuento_Menudeo'];

          var Total_Productos = 0;
          var Impote_Total = 0;

          var tabla_Producto = $('#Tabla_Detalle_Venta').DataTable();

          tabla_Producto.destroy();

          DetalleVenta.tBodies[0].innerHTML = "";

          for (var i = 0; i <= parsed['detalle_ventas_menudeo'].length -1; i++) 
              {
                var row = DetalleVenta.tBodies[0].insertRow(i);

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                //var cell7 = row.insertCell(6);

                cell1.innerHTML = parsed['detalle_ventas_menudeo'][i]['ID'];
                cell2.innerHTML = parsed['detalle_ventas_menudeo'][i]['Codigo'];
                cell3.innerHTML = parsed['detalle_ventas_menudeo'][i]['Producto'];
                cell4.innerHTML = parsed['detalle_ventas_menudeo'][i]['Cantidad'];
                cell5.innerHTML = "$" + parsed['detalle_ventas_menudeo'][i]['Precio_unitario'];
                cell6.innerHTML = "$" + parsed['detalle_ventas_menudeo'][i]['Importe'];
                //cell7.innerHTML = parsed['ventas_menudeo'][i]['Status'];
                Total_Productos += parseFloat(parsed['detalle_ventas_menudeo'][i]['Cantidad']);
                Impote_Total    += parseFloat(parsed['detalle_ventas_menudeo'][i]['Importe']);


              }  

               $('#TotalProductos').val(Total_Productos);
               $('#TotalImporte').val("$ " + parseFloat(Impote_Total));

               $('#Subtotal').val("$ " + parseFloat(Subtotal));
               $('#Impuestos').val("$ " + parseFloat(Impuestos));
               $('#Total').val("$" + parseFloat(total));
               $('#Descuento').val("$ " + parseFloat(Descuento));

               $('#Subtotal_Menudeo').val("$ " + parseFloat(Subtotal_Menudeo));
               $('#Impuestos_Menudeo').val("$ " + parseFloat(Impuestos_Menudeo));
               $('#Descuento_Menudeo').val("$ " + parseFloat(Descuento_Menudeo));
               $('#Total_Menudeo').val("$ " + parseFloat(total_Menudeo));


               $('#Tabla_Detalle_Venta').dataTable({
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

              });  

              }else {

                swal("Importante", "La venta menudeo no tiene ningún Producto asignada a ninguna venta", "info");

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
        $("#Cargando_Venta").css('display','none');
        $('#exampleModalCenter').modal('show');
      });

        }
        else
        {
          swal("Advertencia","Para ver el detalle de una venta menudeo es necesario seleccionar una venta","warning");
        }

      });


    
      $("#Genera_reporte_Excel").click(function()
      {

        if (window.Linea_Ventas_Menudeo !=null) {

            window.open(dir + "Clases/Reportes/Reporte_Ventas_Menudeo.php?ID=" + window.Linea_Ventas_Menudeo.cells[0].innerHTML);

        }
        else
        {
            console.log("Error ocupa una venta menudeo");
            swal("Importante","Para obtener el reporte es necesario seleccionar una venta menudeo","info");
            //swal("Ooh Ooh!", "Para Facturar por favor seleccionar una Venta", "warning"); 
        }

      });

      $("#Genera_reporte_PDF").click(function()
      {

          if (window.Linea_Ventas_Menudeo !=null) {

              window.open(dir + "Clases/Reportes/Reporte_Venta_Menudeo_PDF.php?ID=" + window.Linea_Ventas_Menudeo.cells[0].innerHTML);

          }
          else
          {
              console.log("Error ocupa una venta menudeo");
              swal("Importante","Para obtener el reporte es necesario seleccionar una venta menudeo","info");
              //swal("Ooh Ooh!", "Para Facturar por favor seleccionar una Venta", "warning"); 
          }

      });

      $("#Genera_reporte_Excel_Ventas").click(function()
      {

        if (window.Linea_Ventas !=null) {

            window.open(dir + "Clases/Reportes/Reporte_Ventas.php?ID=" + window.Linea_Ventas.cells[0].innerHTML);

        }
        else
        {
            swal("Importante","Para obtener el reporte es necesario seleccionar una venta","info");
            //swal("Ooh Ooh!", "Para Facturar por favor seleccionar una Venta", "warning"); 
        }

      });

      $("#Genera_reporte_PDF_Ventas").click(function()
      {

          if (window.Linea_Ventas !=null) {

              window.open(dir + "Clases/Reportes/Reporte_Venta_PDF.php?ID=" + window.window.Linea_Ventas.cells[0].innerHTML);

          }
          else
          {
              swal("Importante","Para obtener el reporte es necesario seleccionar una venta","info");
              //swal("Ooh Ooh!", "Para Facturar por favor seleccionar una Venta", "warning"); 
          }

      });


      $("#exportar").click(function(event) {
        /* Act on the event */

        var formData1 =  'ID=' + '1';

         $.ajax({
        url: dir + 'index.php/Controller_Reporte_Venta/Get_info_Ventas',
        type: 'post',
        //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
        timeout: 35000,
            processData: false,
            data:formData1,
            beforeSend : function ()
            {
                $("#Cargando_Header").css('display','');
            },   
            success: function(data)
                    {

                      var Catalogo = document.getElementById("table_reporte_ventas_Expo");

                        var parsed = JSON.parse(data);

                        var tabla_Producto = $('#table_reporte_ventas_Expo').DataTable();

                        tabla_Producto.destroy();

                        Catalogo.tBodies[0].innerHTML = "";

                        $('#myModal_Exportar').modal('show');

                        for (var i = 0; i <= parsed['ventas'].length -1; i++) 
                            {
                              var row = Catalogo.tBodies[0].insertRow(i);

                              var cell1 = row.insertCell(0);
                              var cell2 = row.insertCell(1);
                              var cell3 = row.insertCell(2);
                              var cell4 = row.insertCell(3);
                              var cell5 = row.insertCell(4);
                              var cell6 = row.insertCell(5);
                              var cell7 = row.insertCell(6);
                              var cell8 = row.insertCell(7);
                              //var cell7 = row.insertCell(6);

                              cell1.innerHTML = parsed['ventas'][i]['ID'];
                              cell2.innerHTML = parsed['ventas'][i]['Distribuidor'];
                              cell3.innerHTML = parsed['ventas'][i]['Sucursal'];
                              cell4.innerHTML = parsed['ventas'][i]['Total'];
                              cell5.innerHTML = parsed['ventas'][i]['Subtotal'];
                              cell6.innerHTML = parsed['ventas'][i]['Impuestos'];
                              cell7.innerHTML = parsed['ventas'][i]['Status'];
                              cell8.innerHTML = parsed['ventas'][i]['Fecha_venta'];
                              //cell7.innerHTML = parsed['ventas_menudeo'][i]['Status'];

                            }   

                             $('#table_reporte_ventas_Expo').dataTable({
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
                                "dom":"<'row'<'form-inline' <'col-sm-offset-5'l>>>"
                                   +"<'row' <'form-inline' <'col-sm-1'f>>>"
                                   +"<rt>"
                                   +"<'row'<'form-inline'"
                                   +" <'col-sm-6 col-md-6 col-lg-6'B>"
                                   +"<'col-sm-6 col-md-6 col-lg-6'p>>>",
                        "buttons":[
                          //'copy','csv','excel','pdf'
                        'excelHtml5',
                        'csvHtml5',
                        'pdfHtml5'
                        ],

                            });                    
                    }
      })
      .done(function() {
        console.log("success");
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        $("#Cargando_Header").css('display','none');
      });
      });

});



    function Consulta_Ventas_Menudeo($id){

      var formData1 =  'ID=' + $id;

      console.log($id);

      $.ajax({
        url: dir + 'index.php/Controller_Reporte_Venta/GetVentasMenudeo',
        type: 'post',
        //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
        timeout: 35000,
            processData: false,
            data:formData1,
            beforeSend : function ()
            {
                $("#Cargando_Menudeo").css('display','');
            },   
            success: function(data)
                    {

                      var Catalogo = document.getElementById("table_reporte_ventas_menudeo_productos");

                        var parsed = JSON.parse(data);

                        var tabla_Producto = $('#table_reporte_ventas_menudeo_productos').DataTable();

                        tabla_Producto.destroy();

                        Catalogo.tBodies[0].innerHTML = "";

                        for (var i = 0; i <= parsed['ventas_menudeo'].length -1; i++) 
                            {
                              var row = Catalogo.tBodies[0].insertRow(i);

                              var cell1 = row.insertCell(0);
                              var cell2 = row.insertCell(1);
                              var cell3 = row.insertCell(2);
                              var cell4 = row.insertCell(3);
                              var cell5 = row.insertCell(4);
                              var cell6 = row.insertCell(5);
                              //var cell7 = row.insertCell(6);

                              cell1.innerHTML = parsed['ventas_menudeo'][i]['ID'];
                              cell2.innerHTML = parsed['ventas_menudeo'][i]['Codigo'];
                              cell3.innerHTML = parsed['ventas_menudeo'][i]['Producto'];
                              cell4.innerHTML = parsed['ventas_menudeo'][i]['Cantidad'];
                              cell5.innerHTML = "$" + parsed['ventas_menudeo'][i]['Precio_unitario'];
                              cell6.innerHTML = "$" + parsed['ventas_menudeo'][i]['Importe'];
                              //cell7.innerHTML = parsed['ventas_menudeo'][i]['Status'];

                            }   

                             $('#table_reporte_ventas_menudeo_productos').dataTable({
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

                            });                    
                    }
      })
      .done(function() {
        console.log("success");
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        $("#Cargando_Menudeo").css('display','none');
      });
      
    }


        function Consulta_Ventas($id){

        var formData1 =  'ID=' + $id;

        $.ajax({
            url: dir + 'index.php/Controller_Reporte_Venta/GetVentas',
            type: 'post',
            //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            timeout: 35000,
            processData: false,
            data:formData1,
            beforeSend : function ()
            {
                $("#Cargando_Venta").css('display','');
            },   
            success: function(data)
                    {

                        var Ventas_Menudeo = document.getElementById("table_reporte_ventas_menudeo_ventas");

                        var parsed = JSON.parse(data);

                        console.log(parsed);

                        var tabla_Ventas = $('#table_reporte_ventas_menudeo_ventas').DataTable();

                        tabla_Ventas.destroy();

                        Ventas_Menudeo.tBodies[0].innerHTML = "";

                        for (var i = 0; i <= parsed['ventas'].length -1; i++) 
                            {
                                var row = Ventas_Menudeo.tBodies[0].insertRow(i);

                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                var cell3 = row.insertCell(2);
                                var cell4 = row.insertCell(3);
                                var cell5 = row.insertCell(4);
                                var cell6 = row.insertCell(5);
                                var cell7 = row.insertCell(6);
                                //var cell7 = row.insertCell(6);

                                cell1.innerHTML = parsed['ventas'][i]['ID'];
                                cell2.innerHTML = parsed['ventas'][i]['Cliente'];
                                cell3.innerHTML = "$" + parsed['ventas'][i]['Subtotal'];
                                cell4.innerHTML = "$" + parsed['ventas'][i]['Impuestos'];
                                cell5.innerHTML = "$" + parsed['ventas'][i]['Total'];
                                cell6.innerHTML = parsed['ventas'][i]['Status'];
                                cell7.innerHTML = parsed['ventas'][i]['Fecha_venta'];
                                //cell7.innerHTML = parsed['ventas_menudeo'][i]['Status'];

                            }    

                            $('#table_reporte_ventas_menudeo_ventas').dataTable({
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

                            });                   
                    }
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            $("#Cargando_Venta").css('display','none');
        });
    }

    function fetch_data(is_date_search, start_date='', end_date='',ciudad='',Status=''){
      let SumaTotal = 0;
      var dataTable = $('#table_reporte_ventas').DataTable({
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
                    "targets": 4,
                    'render': function (data, type, full, meta)
                    {
                        if (full[4] == 'Pendiente')
                        {
                          return "<label class='label label-danger'><i class='fa fa-ban' aria-hidden='true'></i>&nbsp; Pendiente</label>"
                        }
                        else if (full[4] == 'Pagado')
                        {
                          return "<label class='label label-success'><i class='fa fa-money' aria-hidden='true'></i>&nbsp; Pagado</label>"
                        }
                        else if (full[4] == 'Facturado')
                        {
                          return "<label class='label label-default'><i class='fa fa-check-circle-o' aria-hidden='true'></i>&nbsp; Facturado</label>"
                        }
                        else if (full[4] == 'Adeudo')
                        {
                          return "<label class='label label-warning'><i class='fa fa-bullhorn' aria-hidden='true'></i>&nbsp; Adeudo</label>"
                        }
                        else if (full[4] == 'Confirmacion_pago')
                        {
                          return "<label class='label label-primary'><i class='fa fa-ticket' aria-hidden='true'></i>&nbsp; Condirmación Pago</label>"
                        }
                        else
                        {
                          return full[4]
                        }

                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                }
            ],
        "order" : [],
        "ajax" : {
            url: dir + "Clases/fetch_Reporte_ventas.php",
            type: "POST",
            data:{
              is_date_search:is_date_search, start_date:start_date, end_date:end_date, ciudad:ciudad, Status:Status
            },
            dataFilter: function(response){
              console.log(response);
              let res = JSON.parse(response)
              console.log(res.Info);
              $("#SumaTotales").val(res.Info);
              $("#SumaSubtotales").val(res.Subtotal);
              $("#SumaImpuestos").val(res.Impuesto);
              return response
            },
        }
      });
    }


    function fetch_data_Menudeo(is_date_search, start_date='', end_date='',Status=''){

      var dataTable = $('#table_reporte_ventas_menudeo').DataTable({
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
         "columnDefs": [
                {
                    "targets": 5,
                    'render': function (data, type, full, meta)
                    {
                        if (full[5] == 'Pendiente')
                        {
                          return "<label class='label label-danger'><i class='fa fa-ban' aria-hidden='true'></i>&nbsp; Pendiente</label>"
                        }
                        else if (full[5] == 'Pagado')
                        {
                          return "<label class='label label-success'><i class='fa fa-money' aria-hidden='true'></i>&nbsp; Pagado</label>"
                        }
                        else if (full[5] == 'Entregado')
                        {
                          return "<label class='label label-primary'><i class='fa fa-check-circle-o' aria-hidden='true'></i>&nbsp; Entregado</label>"
                        }
                        else
                        {
                          return full[5]
                        }
                       
                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                }
            ],
        "ajax" : {

            url: dir + "Clases/fetch_Reporte_ventas_menudeo.php",
            type: "POST",
            data:{
              is_date_search:is_date_search, start_date:start_date, end_date:end_date, Status:Status
            }
        }
      });
    }