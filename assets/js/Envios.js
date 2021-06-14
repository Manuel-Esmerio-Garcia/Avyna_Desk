var dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.Global_Tabla_Envios = null;

$(document).ready(function(){

console.log("Ready");

var Table_Envios = document.getElementById("Table_Envios");
Table_Envios.onclick = function(e)
{
	    window.Global_Tabla_Envios = e.target.parentNode;

	    console.log(window.Global_Tabla_Envios.childNodes[0].innerHTML);
}

$("#select_Sucursal").change(function(event) {
	
	let Sucursal = $("#select_Sucursal").val();

	let Extracciones_Detalle   = document.getElementById("Table_Envios"); 
    let tbody_Detalle   	   = Extracciones_Detalle.tBodies[0];

	if (Sucursal != null && Sucursal != "")
	{
		$('#Table_Envios').DataTable().destroy();
		Extracciones_Detalle.tBodies[0].innerHTML = "";
		fetch_Envios(Sucursal);
	}
	else
	{
		$('#Table_Envios').DataTable().destroy();
		Extracciones_Detalle.tBodies[0].innerHTML = "";
	}

});

$("#btn_Enviar").click(function(event) {
	
	if (window.Global_Tabla_Envios != null)
	{
		swal({
			  title: "¿Esta segúro que desea realizar la venta?",
			  text: "Una vez enviada la venta se actualizará el estatus de la venta al igual que las ventas menudeo",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {
			   
			    var formData = new FormData();
					formData.append("ID", window.Global_Tabla_Envios.childNodes[0].innerHTML);

					 $.ajax({
					    url: dir + 'index.php/Controller_Envios/Realizar_Envio',
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

					    	if (data == 1)
					    	{
					    		toastr.options = 
	                			{
			                			"closeButton": true,
                                        "debug": false,
                                        "newestOnTop": true,
                                        "progressBar": true,
                                        "positionClass": "toast-top-right",
                                        "preventDuplicates": true,
                                        "onclick": null,
                                        "showDuration": "300",
                                        "hideDuration": "1000",
                                        "timeOut": "850",
                                        "extendedTimeOut": "1000",
                                        "showEasing": "swing",
                                        "hideEasing": "linear",
                                        "showMethod": "fadeIn",
                                        "hideMethod": "fadeOut"
                                        
                                }

	                                toastr.success('Envio realizado con exito','Correcto');

	                                let Sucursal = $("#select_Sucursal").val();

									let Extracciones_Detalle   = document.getElementById("Table_Envios"); 
								    let tbody_Detalle   	   = Extracciones_Detalle.tBodies[0];

									if (Sucursal != null && Sucursal != "")
									{
										$('#Table_Envios').DataTable().destroy();
										Extracciones_Detalle.tBodies[0].innerHTML = "";
										fetch_Envios(Sucursal);
									}
									else
									{
										$('#Table_Envios').DataTable().destroy();
										Extracciones_Detalle.tBodies[0].innerHTML = "";
									}

									window.Global_Tabla_Envios = null;

					    	}
					    	else
					    	{
					    		toastr.error('Ocurrio un error al realizar el envio','Error');
					    	}
					    }
					    })
					    .done(function() {
					        console.log("success");
					    })
					     .fail(function(jqXHR, textStatus, errorThrown) {
					     	console.log("error");
						})
					    .always(function() {
					        $('#Cargando_Header').css('display','none');
					    });
			  } 
			});
	}
	else
	{
		toastr.warning('Para continuar, seleccione una venta', 'Advertencia');
	}
});


});

function fetch_Envios(idSucursal) {

	var dataTable = $('#Table_Envios').DataTable({
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
                        if (full[4] == 'Pagado')
                        {
                        	return "<label class='label label-success'>" + full[4] + "</label>"
                        }
                        else
                        {
                        	return "<label class='label label-warning'>" + full[4] + "</label>"
                        }

                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                },

            ],    
    "order" : [],
    "ajax" : {

        url: dir + "Clases/fetch_Envios.php",
        type: "POST",
        data:{
              idSucursal:idSucursal
            }
    }
  });
}

