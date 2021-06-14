
$(document).ready(function(){ 
    // Cargar DataTable fetchReporteGuia //
    fetchReporteGuia('no', '', '');

    // Cargar Libreria DatePicker //
    new Picker(document.querySelector('.date-desde'), {
        controls: true,
        format: 'YYYY-MM-DD HH:mm',
        headers: true,
        text: {
            title: 'DESDE:',
        },
    });

    new Picker(document.querySelector('.date-hasta'), {
        controls: true,
        format: 'YYYY-MM-DD HH:mm',
        headers: true,
        text: {
            title: 'HASTA:',
        },
    });

    // Acción Buscar por datetime //
    $("#searchGuias").click(function (e) { 
        let desde = $("#DateStartVentas").val();
        let hasta = $("#DateEndVentas").val();

        console.log(desde);
        console.log(hasta);
        
        if (desde != '' && hasta != ''){
            $('#fetchReporteGuia').DataTable().destroy();
            fetchReporteGuia('yes', desde, hasta);
        }
        else{
            $('#fetchReporteGuia').DataTable().destroy();
            fetchReporteGuia('no', '', '');
        }
        
    });

});

// Old Export Action //
/*var oldExportAction = function (self, e, dt, button, config) {
    if (button[0].className.indexOf('buttons-excel') >= 0) {
       if ($.fn.dataTable.ext.buttons.excelHtml5.available(dt, config)) {
           $.fn.dataTable.ext.buttons.excelHtml5.action.call(self, e, dt, button, config);
       }
       else {
           $.fn.dataTable.ext.buttons.excelFlash.action.call(self, e, dt, button, config);
       }
    } else if (button[0].className.indexOf('buttons-print') >= 0) {
       $.fn.dataTable.ext.buttons.print.action(e, dt, button, config);
    }
    if (button[0].className.indexOf('buttons-pdf') >= 0) {
       if ($.fn.dataTable.ext.buttons.pdfHtml5.available(dt, config)) {
           $.fn.dataTable.ext.buttons.pdfHtml5.action.call(self, e, dt, button, config);
       }
       else {
           $.fn.dataTable.ext.buttons.pdfFlash.action.call(self, e, dt, button, config);
       }
    } else if (button[0].className.indexOf('buttons-print') >= 0) {
       $.fn.dataTable.ext.buttons.print.action(e, dt, button, config);
    }
    if (button[0].className.indexOf('buttons-csv') >= 0) {
       if ($.fn.dataTable.ext.buttons.csvHtml5.available(dt, config)) {
           $.fn.dataTable.ext.buttons.csvHtml5.action.call(self, e, dt, button, config);
       }
       else {
           $.fn.dataTable.ext.buttons.csvFlash.action.call(self, e, dt, button, config);
       }
    } else if (button[0].className.indexOf('buttons-print') >= 0) {
       $.fn.dataTable.ext.buttons.print.action(e, dt, button, config);
    }
};

var newExportAction = function (e, dt, button, config) {
   var self = this;
   var oldStart = dt.settings()[0]._iDisplayStart;
   dt.one('preXhr', function (e, s, data) {
       // Just this once, load all data from the server...
       data.start = 0;
       data.length = 2147483647;
       dt.one('preDraw', function (e, settings) {
           // Call the original action function
           oldExportAction(self, e, dt, button, config);
           dt.one('preXhr', function (e, s, data) {
               // DataTables thinks the first item displayed is index 0, but we're not drawing that.
               // Set the property to what it was before exporting.
               settings._iDisplayStart = oldStart;
               data.start = oldStart;
           });
           // Reload the grid with the original page. Otherwise, API functions like table.cell(this) don't work properly.
           setTimeout(dt.ajax.reload, 0);
           // Prevent rendering of the full data to the DOM
           return false;
       });
   });
   // Requery the server with the new one-time export settings
   dt.ajax.reload();
};*/


// fetchReporteGuia //
function fetchReporteGuia(datetime, desde, hasta){

    $('#fetchReporteGuia').DataTable({
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
            url: window.dir + "index.php/Controller_Reporte_Guia/fetchReporteGuia",
            type: "POST",
            data:{
                datetime:datetime, desde:desde, hasta:hasta
            }
        }
    });
}
