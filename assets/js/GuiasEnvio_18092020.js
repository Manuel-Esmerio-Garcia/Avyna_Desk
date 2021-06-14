window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.TableGuiaEnvios = null;

$(document).ready(function(){ 

console.log("Ready");

fetch_Guia();

var mitabla = document.getElementById("table_GuiaEnvio");
mitabla.onclick = function(e){
    window.TableGuiaEnvios = e.target.parentNode;

    var fd = new FormData();
    fd.append("ID", window.TableGuiaEnvios.cells[0].innerHTML);

    $.ajax({
        url: dir+'index.php/Controller_Guias_Envio/getGuiaDescripcion',
        type: "post",
        //dataType: "json",
        processData: false,  // tell jQuery not to process the data
        contentType: false,
        timeout: 35000,
        data:fd,
        beforeSend : function ()
        {
        	$("Cargando_Header").css('display','');
        },       
        success: function(data)
        {
            console.log(data);
            let parsed = JSON.parse(data);
		    console.log(parsed);

		    if (parsed != null && parsed != "")
			{
				let Tabla_Direccion   = document.getElementById("table_GuiaDireccion"); 
        		let tbody_Direccion   = Tabla_Direccion.tBodies[0];

        		$('#table_GuiaDireccion').DataTable().destroy();
        		Tabla_Direccion.tBodies[0].innerHTML = "";

				$("#txtidGuiaDescripcion").val(parsed['GuiaDescripcion'][0]['ID']);
				$("#txtInformacion").val(parsed['GuiaDescripcion'][0]['aditionalInfo']);
				$("#txtContenido").val(parsed['GuiaDescripcion'][0]['content']);
				$("#txtDescripcion").val(parsed['GuiaDescripcion'][0]['contentDescription']);
				$("#txtReferencia").val(parsed['GuiaDescripcion'][0]['reference']);
				$("#txtPeso").val(parsed['GuiaDescripcion'][0]['weight']);
				$("#txtGuia").val(parsed['GuiaDescripcion'][0]['parcelNumber']);

				for (var i = 0; i < parsed['DireccionGuia'].length; i++) 
                {

                 	let row  = tbody_Direccion.insertRow(i);
                 	let cel1 = row.insertCell(0);
                 	let cel2 = row.insertCell(1);
                 	let cel3 = row.insertCell(2);
                 	let cel4 = row.insertCell(3);
                 	let cel5 = row.insertCell(4);
                 	let cel6 = row.insertCell(5);
                 	let cel7 = row.insertCell(6);
                 	let cel8 = row.insertCell(7);
                 	let cel9 = row.insertCell(8);
                 	let cel10 = row.insertCell(9);
                 	let cel11 = row.insertCell(10);
                 	let cel12 = row.insertCell(11);


                 	cel1.innerHTML = parsed['DireccionGuia'][i]['contactName'];
                 	cel2.innerHTML = parsed['DireccionGuia'][i]['corporateName'];
                 	cel3.innerHTML = parsed['DireccionGuia'][i]['customerNumber'];
                 	cel4.innerHTML = parsed['DireccionGuia'][i]['state'];
                 	cel5.innerHTML = parsed['DireccionGuia'][i]['city'];
                 	cel6.innerHTML = parsed['DireccionGuia'][i]['neighborhood'];
                 	cel7.innerHTML = parsed['DireccionGuia'][i]['zipCode'];
                 	cel8.innerHTML = parsed['DireccionGuia'][i]['address1'];
                 	cel9.innerHTML = parsed['DireccionGuia'][i]['address2'];
                 	cel10.innerHTML = parsed['DireccionGuia'][i]['cellPhone'];
                 	cel11.innerHTML = parsed['DireccionGuia'][i]['phoneNumber'];
                 	cel12.innerHTML = parsed['DireccionGuia'][i]['tipo'];
                }

                fetch_Direccion_Guia();

                $("#btn_Reimprimir").removeAttr('disabled');
			}
			else
			{
				$("#btn_Reimprimir").attr('disabled', 'disabled');
			}
        }

        })
        .done( function (data, status) {
        	$("Cargando_Header").css('display','none');
        })
        .fail( function( jqXHR, textStatus, errorThrown ) {

        });
}


$("#btn_Reimprimir").click(function(event) {
  
  if (window.TableGuiaEnvios != null)
  {
    var formData = new FormData();
    formData.append("ID", window.TableGuiaEnvios.childNodes[1].childNodes[1].innerHTML);

    $.ajax({
    url: dir + 'index.php/Controller_Guias_Envio/Reimprimir_Guia',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 35000,
    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
    data: formData,
    beforeSend : function ()
    {
        $('#Cargando_Header').css('display','');
    },
    success: function(data)
    {
        console.log(data);

        switch(data){
          case '0':
            toastr.success('Waybills were successfully created.', 'Generación de guías exitosa.');
            window.open(dir + 'ESTAFETA/guiaprint.pdf', '_blank');
          break;

          case '2':
            toastr.error('The zip code is invalid.', 'Código Postal no válido.');
          break;

          case '3':
            toastr.error('There are no more waybill numbers available for the requested service.', 'Se ha terminado el rango de guías disponible para el servicio solicitado.');
          break;

          case '4':
            toastr.error('The number of labels has exceeded the maximun allowed.', 'La cantidad de guías solicitada ha excedido el máximo permitido por solicitud.');
          break;

          case '5':
            toastr.error('The ID Country is invalid.', 'El código de Páis no es válido.');
          break;

          case '100':
            toastr.error('The authentication process has failed.', 'La autenticación ha fallado.');
          break;

          case '101':
            toastr.error('The validation process of Destination Country ID failed.', 'Se ha capturado un identificador de país invalido.');
          break;

          case '500':
            toastr.error('The generation PDF process failed.', 'La creación del archivo PDF Acrobat falló.');
          break;

          case '600':
          toastr.error('The MD5 generation process has failed.', 'El algoritmo de digestión MD5.');
          break;

          case '1000':
          toastr.error('Some data into request is not valid, please verify.', 'La información en un campo no es valida.');
          break;
          case '1001':
          toastr.error('El empaque no tiene asignado un numero de guia', 'Sin guia generada.');
          break;
        }
    }
    })
    .done(function() {
        $('#Cargando_Header').css('display','none');
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      $("#Modal_Conexion").modal("show");
    })
    .always(function() {
    });
  }
  else
  {
    toastr.warning('Por favor, seleccione una caja', 'Advertencia');
  }

});

});

function fetch_Direccion_Guia() {
	
	$('#table_GuiaDireccion').dataTable({
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
    ]
	});
}

function fetch_Guia() {

	let dataTable = $('#table_GuiaEnvio').DataTable({
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
                    "targets": 7,
                    'render': function (data, type, full, meta)
                    {
                        if (full[7] == 'Enviado')
                        {
                        	return "<label class='label label-success'>" + full[7] + "</label>"
                        }
                        else
                        {
                        	return "<label class='label label-warning'>" + full[7] + "</label>"
                        }

                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                },

            ],    
    "order" : [],
    "ajax" : {

        url: dir + "Clases/fetch_GuiaEnvio.php",
        type: "POST"
    }
  });
}