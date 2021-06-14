window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.Global_Bloque = null;

$(document).ready(function(){
	console.log("Ready");

	fetch_Bloques();

	// Accion click al seleccionar bloque
	var Table_Bloque = document.getElementById("Table_Bloques");
    Table_Bloque.onclick = function(e)
    {
        window.Global_Bloque = e.target.parentNode;
    }

    // Boton Eliminar Bloque
    $("#Eliminar_Bloques").click(function(event) {
    	
    	if (window.Global_Bloque != null)
    	{
    		if (window.Global_Bloque.childNodes[3].childNodes[0].innerHTML != 'Inactivo')
	    	{
	    		swal({
					  title: "¿Esta seguro que desea eliminar el bloque?",
					  text: "Una vez eliminado el bloque pasara con estatus de inactivo",
					  icon: "warning",
					  buttons: true,
					  dangerMode: true,
					})
					.then((willDelete) => {
					  if (willDelete) {
					    
					    	let formData = new FormData();
							formData.append("ID", window.Global_Bloque.childNodes[0].innerHTML);

				            $.ajax({
				               url: dir + 'index.php/Controller_Bloques/DeleteBloques',
				               type: 'POST',
				               processData: false,  // tell jQuery not to process the data
				               contentType: false,
				               timeout: 35000,
				               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
				               data: formData,
				               beforeSend : function ()
				                {
				                    $('#Cargando_Header').css('display', '');
				                },
				                success: function(data)
				                {
				                	Toast();

				                    console.log(data);

				                    if (data == 1)
				                    {
				                    	toastr.success('Bloque eliminado con exito', 'Correcto');
				                        Limpiar();
				                    }
				                    else
				                    {
				                    	toastr.error('Ocurrio un error al eliminar el bloque', 'Error');
				                    }
				                }
				           })
				           .done(function() {
				               
				               $('#Cargando_Header').css('display', 'none');
				           })
				           .fail(function() {
				               console.log("error");
				           })
				           .always(function() {
				           });
					  }
					});
	    	}
	    	else
	    	{
	    		toastr.warning('El bloque se encuentra como inactivo', 'Advertencia');
	    	}
    	}
    	else
    	{
    		toastr.info('Seleccione un bloque', 'Importante');
    	}
    });

    // Abrir Modal Editar Bloque
    $("#Editar_Bloques").click(function(event) {
    	
    	Toast();

    	if (window.Global_Bloque != null)
    	{
    		if (window.Global_Bloque.childNodes[3].childNodes[0].innerHTML == 'Inactivo')
	    	{
	    		$('#check_Status').prop('checked',true);
	    	}
	    	else
	    	{
	    		$('#check_Status').prop('checked',false);
	    	}

	    	$("#txtBloque_Editar").val(window.Global_Bloque.childNodes[1].innerHTML);
	    	$("#txtDescripcion_Editar").val(window.Global_Bloque.childNodes[2].innerHTML);

    		$("#Modal_Editar").modal("show");
    	}
    	else
    	{
    		toastr.info('Seleccione un bloque', 'Importante');
    	}
    });

    // Boton Editar Bloque
    $("#btn_Editar_Bloque").click(function(event) {
    	
    	let Bloque 		= $("#txtBloque_Editar").val();
		let Descripcion = $("#txtDescripcion_Editar").val();
		let Status 		= '';

		if($('#check_Status').prop('checked'))
        {
            Status = "Inactivo";
        }
        else
        {
            Status = "Activo";
        }

		var formData = new FormData();
			formData.append("ID", window.Global_Bloque.childNodes[0].innerHTML);
            formData.append("Bloque", Bloque);
            formData.append("Descripcion", Descripcion);
            formData.append("Status", Status);

            $.ajax({
               url: dir + 'index.php/Controller_Bloques/EditBloques',
               type: 'POST',
               processData: false,  // tell jQuery not to process the data
               contentType: false,
               timeout: 35000,
               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
               data: formData,
               beforeSend : function ()
                {
                    $('#Cargando_Editar').css('display', '');
                },
                success: function(data)
                {
                	Toast();

                    console.log(data);

                    if (data == 1)
                    {
                    	toastr.success('Bloque modificado con exito', 'Correcto');
                        Limpiar();
                    }
                    else
                    {
                    	toastr.error('Ocurrio un error al modificar el bloque', 'Error');
                    }
                }
           })
           .done(function() {
               
               $('#Cargando_Editar').css('display', 'none');
           })
           .fail(function() {
               console.log("error");
           })
           .always(function() {
           });

    });

	// Abrir Modal Bloques
	$("#Agregar_Bloques").click(function(event) {
		$("#Modal_Agregar").modal("show");
	});

	// Boton Guardar Bloque
	$("#btn_Guardar_Bloque").click(function(event) {
		
		let Bloque 		= $("#txtBloque").val();
		let Descripcion = $("#txtDescripcion").val();

		var formData = new FormData();
            formData.append("Bloque", Bloque);
            formData.append("Descripcion", Descripcion);
            formData.append("Status", 'Activo');

            $.ajax({
               url: dir + 'index.php/Controller_Bloques/AddBloques',
               type: 'POST',
               processData: false,  // tell jQuery not to process the data
               contentType: false,
               timeout: 35000,
               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
               data: formData,
               beforeSend : function ()
                {
                    $('#Cargando_Agregar').css('display', '');
                },
                success: function(data)
                {
                	Toast();

                    console.log(data);

                    if (data == 1)
                    {
                    	toastr.success('Bloque agregada con exito', 'Correcto');
                        Limpiar();
                    }
                    else
                    {
                    	toastr.error('Ocurrio un error al agregar el bloque', 'Error');
                    }
                }
           })
           .done(function() {
               
               $('#Cargando_Agregar').css('display', 'none');
           })
           .fail(function() {
               console.log("error");
           })
           .always(function() {
           });
	});

});


 function fetch_Bloques(){

  var dataTable = $('#Table_Bloques').DataTable({
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
                    "targets": 3,
                    'render': function (data, type, full, meta)
                    {
                        if (full[3] == 'Activo')
                        {
                        	return "<label class='label label-success'>Activo</label>"
                        }
                        else
                        {
                        	return "<label class='label label-danger'>Inactivo</label>"
                        }

                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                },

            ],    
    "order" : [],
    "ajax" : {

        url: dir + "Clases/fetch_Bloques.php",
        type: "POST"
    }
  });
}

function Limpiar() {
	$("#txtBloque").val("");
	$("#txtDescripcion").val("");

	$("#Modal_Agregar").modal("hide");

	$("#txtBloque_Editar").val("");
	$("#txtDescripcion_Editar").val("");
	$('#check_Status').prop('checked',false);

	$("#Modal_Editar").modal("hide");

    let bloque    = document.getElementById("Table_Bloques"); 
	$('#Table_Bloques').DataTable().destroy();
    bloque.tBodies[0].innerHTML = "";
    fetch_Bloques();

    window.Global_Bloque = null;
}

function Toast() {
	
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
      "timeOut": "800",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
}