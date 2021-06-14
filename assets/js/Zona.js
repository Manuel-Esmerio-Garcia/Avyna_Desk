window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.Global_Zona = null;

$(document).ready(function(){
	console.log("Ready");

	fetch_Zonas();

	// Accion click al seleccionar bloque
	var Table_Zona = document.getElementById("Table_Zonas");
    Table_Zona.onclick = function(e)
    {
        window.Global_Zona = e.target.parentNode;
    }

	// Abrir Modal Agregar Zona //
	$("#Agregar_Zonas").click(function(event) {
		$("#Modal_Agregar").modal("show");
	});

	// Boton Guardar Zona Distribuidor //
	$("#btn_Guardar").click(function(event) {

		// Cargamos Alert //
		Toast();

		let Zona 		= $("#txtZona").val();
		let Descripcion = $("#txtDescripcion").val();
		let Poblacion 	= $("#txtPoblacion").val();
		let Bloque 		= $("#textBloque").val();
		let Cliente 	= $("#textCliente").val();
		let Cuota 		= $("#txtCuota").val();

		if (Zona != "" && Descripcion != "" && Cuota != "")
		{
			let formData = new FormData();
			formData.append("Zona", Zona);
			formData.append("Descripcion", Descripcion);
			formData.append("Poblacion", Poblacion);
			formData.append("idBloque", Bloque);
			formData.append("idCliente", Cliente);
			formData.append("CuotaFinal", Cuota);
			formData.append("Status", 'Activo');

			$.ajax({
		    url: window.dir + 'index.php/Controller_Zonas/Add_Zona',
		    type: 'POST',
		    processData: false,  // tell jQuery not to process the data
		    contentType: false,
		    timeout: 800000,
		    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		    data: formData,
		    beforeSend : function ()
		    {
		        $('#btn_Cerrar_Agregar').css('display','none');
		        $('#loading_Cerrar_Agregar').css('display','');
		        $('#btn_Guardar').css('display','none');
		        $('#loading_Guardar').css('display','');
		    },
		    success: function(data)
		    {
                if (data == 1)
                {
                	toastr.success('Zona agregada con exito', 'Correcto');
                    Limpiar();
                }
                else
                {
                	toastr.error('Ocurrio un error al agregar la zona', 'Error');
                }
		    }
		    })
		    .done(function() {
		        $('#btn_Cerrar_Agregar').css('display','');
		        $('#loading_Cerrar_Agregar').css('display','none');
		        $('#btn_Guardar').css('display','');
		        $('#loading_Guardar').css('display','none');
		    })
		     .fail(function(jqXHR, textStatus, errorThrown) {
		     	$('#btn_Cerrar_Agregar').css('display','');
		        $('#loading_Cerrar_Agregar').css('display','none');
		        $('#btn_Guardar').css('display','');
		        $('#loading_Guardar').css('display','none');

		        $("#Modal_Conexion").modal("show");
			})
		    .always(function() {  
			});
		}
		else
		{
			toastr.warning('Algunos campos obligatorios estan vacios', 'Advertencia');
		}
	});


	// Abrir Modal Editar Zona //
	$("#Editar_Zonas").click(function(event) {

		Toast()

		if (window.Global_Zona != null)
		{
			$("#txtZona_Editar").val(window.Global_Zona.childNodes[1].innerHTML);
			$("#txtDescripcion_Editar").val(window.Global_Zona.childNodes[2].innerHTML);
			$("#txtPoblacion_Editar").val(window.Global_Zona.childNodes[3].innerHTML);

			if (window.Global_Zona.childNodes[4].innerHTML != "" && window.Global_Zona.childNodes[4].innerHTML != null)
			{
				$("#textBloque_Editar").val(window.Global_Zona.childNodes[4].childNodes[1].innerHTML);
			}

			if (window.Global_Zona.childNodes[5].innerHTML != "" && window.Global_Zona.childNodes[5].innerHTML != null)
			{
				$("#textCliente_Editar").val(window.Global_Zona.childNodes[5].childNodes[1].innerHTML);
			}
			
			$("#txtCuota_Editar").val(window.Global_Zona.childNodes[6].innerHTML);
			
			if (window.Global_Zona.childNodes[7].childNodes[0].innerHTML == 'Inactivo')
			{
				$("#checkStatus").prop("checked", true);
			}
			else
			{
				$("#checkStatus").prop("checked", false);
			}

			$("#Modal_Editar").modal("show");
		}
		else
		{
			toastr.warning('Por favor, Seleccione una zona', 'Advertencia');
		}
	});


	// Boton Editar Zona Distribuidor //
	$("#btn_Editar").click(function(event) {

		// Cargamos Alert //
		Toast();

		let Zona 		= $("#txtZona_Editar").val();
		let Descripcion = $("#txtDescripcion_Editar").val();
		let Poblacion 	= $("#txtPoblacion_Editar").val();
		let Bloque 		= $("#textBloque_Editar").val();
		let Cliente 	= $("#textCliente_Editar").val();
		let Cuota 		= $("#txtCuota_Editar").val();
		let Status      = '';

		if (Zona != "" && Descripcion != "" && Cuota != "")
		{
			if($('#checkStatus').prop('checked'))
			{
				Status = 'Inactivo';
			}
			else
			{
				Status = 'Activo';
			}

			let formData = new FormData();
			formData.append("ID", window.Global_Zona.childNodes[0].innerHTML);
			formData.append("Zona", Zona);
			formData.append("Descripcion", Descripcion);
			formData.append("Poblacion", Poblacion);
			if(Bloque != "" && Bloque != null){formData.append("idBloque", Bloque);}else{formData.append("idBloque", null);}
			if(Cliente != "" && Cliente != null){formData.append("idCliente", Cliente);}else{formData.append("idCliente", null);}
			formData.append("CuotaFinal", Cuota);
			formData.append("Status", Status);

			$.ajax({
		    url: window.dir + 'index.php/Controller_Zonas/Edit_Zona',
		    type: 'POST',
		    processData: false,  // tell jQuery not to process the data
		    contentType: false,
		    timeout: 800000,
		    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		    data: formData,
		    beforeSend : function ()
		    {
		        $('#btn_Cerrar_Editar').css('display','none');
		        $('#loading_Cerrar_Editar').css('display','');
		        $('#btn_Editar').css('display','none');
		        $('#loading_Editar').css('display','');
		    },
		    success: function(data)
		    {
                if (data == 1)
                {
                	toastr.success('Zona modificada con exito', 'Correcto');
                    Limpiar();
                }
                else
                {
                	toastr.error('Ocurrio un error al modificar la zona', 'Error');
                }
		    }
		    })
		    .done(function() {
		        $('#btn_Cerrar_Editar').css('display','');
		        $('#loading_Cerrar_Editar').css('display','none');
		        $('#btn_Editar').css('display','');
		        $('#loading_Editar').css('display','none');
		    })
		     .fail(function(jqXHR, textStatus, errorThrown) {
		     	$('#btn_Cerrar_Editar').css('display','');
		        $('#loading_Cerrar_Editar').css('display','none');
		        $('#btn_Editar').css('display','');
		        $('#loading_Editar').css('display','none');

		        $("#Modal_Conexion").modal("show");
			})
		    .always(function() {  
			});
		}
		else
		{
			toastr.warning('Algunos campos obligatorios estan vacios', 'Advertencia');
		}
	});

	// Boton Eliminar Zona //
	$("#Eliminar_Zonas").click(function(event) {
		
		// Cargamos Alert //
		Toast();

		if (window.Global_Zona != null)
		{
			if (window.Global_Zona.childNodes[7].childNodes[0].innerHTML != 'Inactivo')
			{
				let formData = new FormData();
				formData.append("ID", window.Global_Zona.childNodes[0].innerHTML);

				$.ajax({
			    url: window.dir + 'index.php/Controller_Zonas/Delete_Zona',
			    type: 'POST',
			    processData: false,  // tell jQuery not to process the data
			    contentType: false,
			    timeout: 800000,
			    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			    data: formData,
			    beforeSend : function ()
			    {
			        $('#Agregar_Zonas').css('display','none');
			        $('#loading_Agregar_Zonas').css('display','');
			        $('#Editar_Zonas').css('display','none');
			        $('#loading_Editar_Zonas').css('display','');
			        $('#Eliminar_Zonas').css('display','none');
			        $('#loading_Eliminar_Zonas').css('display','');
			    },
			    success: function(data)
			    {
	                if (data == 1)
	                {
	                	toastr.success('Zona eliminada con exito', 'Correcto');
	                    Limpiar();
	                }
	                else
	                {
	                	toastr.error('Ocurrio un error al eliminar la zona', 'Error');
	                }
			    }
			    })
			    .done(function() {
			        $('#Agregar_Zonas').css('display','');
			        $('#loading_Agregar_Zonas').css('display','none');
			        $('#Editar_Zonas').css('display','');
			        $('#loading_Editar_Zonas').css('display','none');
			        $('#Eliminar_Zonas').css('display','');
			        $('#loading_Eliminar_Zonas').css('display','none');
			    })
			     .fail(function(jqXHR, textStatus, errorThrown) {
			     	$('#Agregar_Zonas').css('display','');
			        $('#loading_Agregar_Zonas').css('display','none');
			        $('#Editar_Zonas').css('display','');
			        $('#loading_Editar_Zonas').css('display','none');
			        $('#Eliminar_Zonas').css('display','');
			        $('#loading_Eliminar_Zonas').css('display','none');

			        $("#Modal_Conexion").modal("show");
				})
			    .always(function() {  
				});
			}
			else
			{
				toastr.warning('La zona ya se encuentra como inactiva', 'Advertencia');
			}
		}
		else
		{
			toastr.warning('Por favor, Seleccione una zona', 'Advertencia');
		}
	});
});

// Limpiar Campos //
function Limpiar() {
	$("#txtZona").val("");
	$("#txtDescripcion").val("");
	$("#txtPoblacion").val("");
	$("#textBloque").val("");
	$("#textCliente").val("");
	$("#txtCuota").val("");
	$("#Modal_Agregar").modal("hide");

	$("#txtZona_Editar").val("");
	$("#txtDescripcion_Editar").val("");
	$("#txtPoblacion_Editar").val("");
	$("#textBloque_Editar").val("");
	$("#textCliente_Editar").val("");
	$("#txtCuota_Editar").val("");
	$("#checkStatus").prop("checked", false);
	$("#Modal_Editar").modal("hide");

	window.Global_Zona = null;

	let zona    = document.getElementById("Table_Zonas"); 
	$('#Table_Zonas').DataTable().destroy();
    zona.tBodies[0].innerHTML = "";
    fetch_Zonas();

}

// Cargar DataTable Zonas //
 function fetch_Zonas(){

  let Table_Zonas = $('#Table_Zonas').DataTable({
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
                        if (full[7] == 'Activo')
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

        url: dir + "Clases/fetch_Zonas.php",
        type: "POST"
    }
  });

  // Limpiar input filter DataTable y Focus //
    $('div.dataTables_filter input', Table_Zonas.table().container()).val("");
    $('div.dataTables_filter input', Table_Zonas.table().container()).focus();
}

// Cargar Alert Toast
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
      "timeOut": "850",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
}