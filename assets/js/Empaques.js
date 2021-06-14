var dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.Tabla_Ventas_Ex = null;
window.Tabla_Ventas_Men = null;
window.Tabla_Ventas_Pro = null;

$(document).ready(function(){

fetch_data();

$("#btn_Reimprimir").click(function(event) {
  
  if (window.Tabla_Ventas_Men != null){
    var formData = new FormData();
    formData.append("ID", window.Tabla_Ventas_Men.childNodes[0].innerHTML);
    formData.append("Guia", window.Tabla_Ventas_Men.childNodes[2].innerHTML);

    $.ajax({
    url: dir + 'index.php/Controller_Empaques/PrintGlobalLabel',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 0,
    data: formData,
    beforeSend : function (){
        $('#Cargando_Header').css('display','');
    },
    success: function(data){
        console.log(data);

        const obj = JSON.parse(data);

        console.log(obj.code);

        switch(obj.code){
          case 0:
            toastr.success('Waybills were successfully created.', 'Generación de guías exitosa.');
            if (window.Tabla_Ventas_Men.childNodes[2].innerHTML.length === 22) {
              window.open(dir + 'ESTAFETA/guiaprint.pdf', '_blank');
            }
            else if (window.Tabla_Ventas_Men.childNodes[2].innerHTML.length === 12) {
              window.open(dir + 'ESTAFETA/guiaprintAMPM.pdf', '_blank'); 
              // window.open(dir + 'ESTAFETA/guiaprintAMPM_365040190016.pdf', '_blank');
            }            
          break;

          case 2:
            toastr.error('The zip code is invalid.', 'Código Postal no válido.');
          break;

          case 3:
            toastr.error('There are no more waybill numbers available for the requested service.', 'Se ha terminado el rango de guías disponible para el servicio solicitado.');
          break;

          case 4:
            toastr.error('The number of labels has exceeded the maximun allowed.', 'La cantidad de guías solicitada ha excedido el máximo permitido por solicitud.');
          break;

          case 5:
            toastr.error('The ID Country is invalid.', 'El código de Páis no es válido.');
          break;

          case 100:
            toastr.error('The authentication process has failed.', 'La autenticación ha fallado.');
          break;

          case 101:
            toastr.error('The validation process of Destination Country ID failed.', 'Se ha capturado un identificador de país invalido.');
          break;

          case 500:
            toastr.error('The generation PDF process failed.', 'La creación del archivo PDF Acrobat falló.');
          break;

          case 600:
          toastr.error('The MD5 generation process has failed.', 'El algoritmo de digestión MD5.');
          break;

          case 1000:
          toastr.error('Some data into request is not valid, please verify.', 'La información en un campo no es valida.');
          break;
          case 1001:
          toastr.error('El empaque no tiene asignado un numero de guia', 'Sin guia generada.');
          break;
          default:
            toastr.error(obj.message, obj.code);
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


$("#btn_Consultar").click(function(event) {
  
  if (window.Tabla_Ventas_Men != null)
  {

    if (window.Tabla_Ventas_Men.childNodes[2].innerHTML != null && window.Tabla_Ventas_Men.childNodes[2].innerHTML != "")
    {

      if (window.Tabla_Ventas_Men.childNodes[2].innerHTML.length == 22)
      {

        var formData = new FormData();
        formData.append("Guia", window.Tabla_Ventas_Men.childNodes[2].innerHTML);

        $.ajax({
        url: dir + 'index.php/Controller_Empaques/Consultar_Estafeta',
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
            let parsed = JSON.parse(data);
            console.log(parsed);

            if (parsed != null)
            {
              if (parsed['statusSPA'] == 'CONFIRMADO')
              {
                $("#modalConsultaEstafeta").modal("show");

                $("#alert_Status").removeClass('alert-warning');
                $("#alert_Status").addClass('alert-success');

                $("#EstafetaStatus").text(parsed['statusSPA']);
                $("#descripcion_status").text('Paquete entregado con exito');

                $("#EstafetaDestino").val(parsed['deliveryData']['destinationName']);
                $("#EstafetaFecha").val(parsed['deliveryData']['deliveryDateTime']);

                $("#div_recibe").css('display','');
                $("#EstafetaRecibe").val(parsed['deliveryData']['receiverName']);

                $("#EstafetaTipo").val(parsed['packageType']);
              }
              else
              {
                let Contador_Historial = parsed['history']['History'].length -1;

                $("#modalConsultaEstafeta").modal("show");

                $("#alert_Status").removeClass('alert-success');
                $("#alert_Status").addClass('alert-warning');

                $("#EstafetaStatus").text(parsed['statusSPA']);
                $("#descripcion_status").text(parsed['history']['History'][Contador_Historial]['eventDescriptionSPA']);

                $("#EstafetaDestino").val(parsed['history']['History'][Contador_Historial]['eventPlaceName']);
                $("#EstafetaFecha").val(parsed['history']['History'][Contador_Historial]['eventDateTime']);

                $("#div_recibe").css('display','none');
                $("#EstafetaRecibe").val('');

                $("#EstafetaTipo").val(parsed['packageType']);
              }
            }
            else
            {
              toastr.warning('No se encontro registro asignado al N° de guia', 'Advertencia');
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
        toastr.warning('El N° de guia no cuenta con los valores validos', 'Advertencia');
      }
    }
    else
    {
      toastr.warning('La caja no cuenta con N° de guia', 'Advertencia');
    }
  }
  else
  {
    toastr.warning('Por favor, seleccione una caja', 'Advertencia');
  }

});

var Table_Venta_ex = document.getElementById("Table_Empaques");
Table_Venta_ex.onclick = function(e)
{
	    window.Tabla_Ventas_Ex = e.target.parentNode;

	    var formData = new FormData();
        formData.append("ID", window.Tabla_Ventas_Ex.childNodes[0].innerHTML);

        $.ajax({
            url: dir + 'index.php/Controller_Empaques/Empaque_general_view',
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
                let parsed = JSON.parse(data);

                console.log(parsed);

	            if (parsed != null && parsed != "")
	            {
	            	// Caja General
            		let Caja_General   = document.getElementById("Table_Cajas"); 
            		let tbody_General    = Caja_General.tBodies[0];

            		$('#Table_Cajas').DataTable().destroy();
            		Caja_General.tBodies[0].innerHTML = "";

            		// Caja Chica
            		let Caja_Simple   = document.getElementById("Table_Ventas_Menudeo"); 
            		let tbody_Simple    = Caja_Simple.tBodies[0];

            		$('#Table_Ventas_Menudeo').DataTable().destroy();
            		Caja_Simple.tBodies[0].innerHTML = "";

            		// Productos

            		let Productos  = document.getElementById("Table_Productos"); 
            		let tbody_Productos    = Productos.tBodies[0];

            		$('#Table_Productos').DataTable().destroy();
            		Productos.tBodies[0].innerHTML = "";

            		    for (var i = 0; i < parsed['Detalle'].length; i++) 
		                {

		                 let row  = tbody_General.insertRow(i);
		                 let cel1 = row.insertCell(0);
		                 let cel2 = row.insertCell(1);
		                 let cel3 = row.insertCell(2);

		                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
		                 cel1.setAttribute("hidden", true);
		                 cel2.innerHTML = i + 1;
		                 cel3.innerHTML = parsed['Detalle'][i]['Numero_guia'];
		                
		                }

		                Crear_data_table_Cajas();
	            }
            }
            })
            .done(function() {
                console.log("success");
            })
             .fail(function(jqXHR, textStatus, errorThrown) {

             if (jqXHR.status === 0)
             {

              console.log('Not connect: Verify Network.');
              location.reload();  

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
                $('#Cargando_Header').css('display','none');
            });
}



var Table_Venta_Men = document.getElementById("Table_Cajas");
Table_Venta_Men.onclick = function(e)
{
	    window.Tabla_Ventas_Men = e.target.parentNode;

	    var formData = new FormData();
        formData.append("ID", window.Tabla_Ventas_Men.childNodes[0].innerHTML);

        $.ajax({
            url: dir + 'index.php/Controller_Empaques/Empaques_View',
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
                let parsed = JSON.parse(data);

                console.log(parsed);

	            if (parsed != null && parsed != "")
	            {
            		// Caja Chica
            		let Caja_Simple   = document.getElementById("Table_Ventas_Menudeo"); 
            		let tbody_Simple    = Caja_Simple.tBodies[0];

            		$('#Table_Ventas_Menudeo').DataTable().destroy();
            		Caja_Simple.tBodies[0].innerHTML = "";

            		// Productos

            		let Productos  = document.getElementById("Table_Productos"); 
            		let tbody_Productos    = Productos.tBodies[0];

            		$('#Table_Productos').DataTable().destroy();
            		Productos.tBodies[0].innerHTML = "";

            		    for (var i = 0; i < parsed['Detalle'].length; i++) 
		                {

		                 let row  = tbody_Simple.insertRow(i);
		                 let cel1 = row.insertCell(0);
		                 let cel2 = row.insertCell(1);
		                 let cel3 = row.insertCell(2);
		                 let cel4 = row.insertCell(3);
		                 let cel5 = row.insertCell(4);

		                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
		                 cel1.setAttribute("hidden", true);
		                 cel2.innerHTML = parsed['Detalle'][i]['idVenta_menudeo'];
		                 cel3.innerHTML = parsed['Detalle'][i]['cliente'];
		                 cel4.innerHTML = parsed['Detalle'][i]['Cantidad'];
		                 cel5.innerHTML = i + 1;
		                
		                }

		                Crear_data_table_Venta_Menudeo();
	            }
            }
            })
            .done(function() {
                console.log("success");
            })
             .fail(function(jqXHR, textStatus, errorThrown) {

             if (jqXHR.status === 0)
             {

              console.log('Not connect: Verify Network.');
              location.reload();  

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
                $('#Cargando_Header').css('display','none');
            });
}


















































$("#Imprimir_Lista").click(function(event) {

  console.log(window.Tabla_Ventas_Pro.childNodes[0].innerHTML);
  console.log(window.Tabla_Ventas_Men.childNodes[0].innerHTML);
  
  if (window.Tabla_Ventas_Pro != null)
  {
    window.open(""+dir+"Clases/Reportes/Etiquetas_Productos.php?ID=" + window.Tabla_Ventas_Pro.childNodes[0].innerHTML + "&idEmpaque=" + window.Tabla_Ventas_Men.childNodes[0].innerHTML + "");
  }
  else
  {
    toastr.warning('Por favor, seleccione un pedido', 'Advertencia');
  }

});























































var Table_Venta_Pro = document.getElementById("Table_Ventas_Menudeo");
Table_Venta_Pro.onclick = function(e)
{
	    window.Tabla_Ventas_Pro = e.target.parentNode;

	    var formData = new FormData();
        formData.append("ID", window.Tabla_Ventas_Pro.childNodes[0].innerHTML);

        $.ajax({
            url: dir + 'index.php/Controller_Empaques/Productos_Empaque_View',
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
                let parsed = JSON.parse(data);

                console.log(parsed);

	            if (parsed != null && parsed != "")
	            {
            		// Productos
            		let Productos  = document.getElementById("Table_Productos"); 
            		let tbody_Productos    = Productos.tBodies[0];

            		$('#Table_Productos').DataTable().destroy();
            		Productos.tBodies[0].innerHTML = "";

            		    for (var i = 0; i < parsed['Detalle'].length; i++) 
		                {

		                 let row  = tbody_Productos.insertRow(i);
		                 let cel1 = row.insertCell(0);
		                 let cel2 = row.insertCell(1);

		                 cel1.innerHTML = parsed['Detalle'][i]['producto'];
		                 cel2.innerHTML = parsed['Detalle'][i]['Cantidad'];
		                
		                }

		                Crear_data_table_Producto();
	            }
            }
            })
            .done(function() {
                console.log("success");
            })
             .fail(function(jqXHR, textStatus, errorThrown) {

             if (jqXHR.status === 0)
             {

              console.log('Not connect: Verify Network.');
              location.reload();  

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
                $('#Cargando_Header').css('display','none');
            });
}


$("#Editar_Guia").click(function(event) {
	
	if (window.Tabla_Ventas_Men != null && window.Tabla_Ventas_Men != "")
	{
		$("#Modal_Editar_Guia").modal("show");

    if (window.Tabla_Ventas_Men.childNodes[2].innerHTML != null && window.Tabla_Ventas_Men.childNodes[2].innerHTML != "")
    {
      var res = window.Tabla_Ventas_Men.childNodes[2].innerHTML.split("http://www.estafeta.com/Rastreo/");

      if (res.length == 1)
      {
        $("#Numero_Guia").val(res);
      }
      else
      {
        $("#Numero_Guia").val(res[1]);
      }
    }
    else
    {
      $("#Numero_Guia").val(window.Tabla_Ventas_Men.childNodes[2].innerHTML);
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
              "timeOut": "850",
              "extendedTimeOut": "1000",
              "showEasing": "swing",
              "hideEasing": "linear",
              "showMethod": "fadeIn",
              "hideMethod": "fadeOut"
            }
            // Display an error toast, with a title
            toastr.warning('Por favor, seleccione una caja', 'Advertencia');
	}
});


$("#btn_Editar_Guia").click(function(event) {
	
	let Numero_Guia = $("#Numero_Guia").val();

	if (Numero_Guia != null && Numero_Guia != "")
	{
    if (Numero_Guia.length == 22)
    {

      //let Guia_Real = "http://www.estafeta.com/Rastreo/" + Numero_Guia;
      let Guia_Real = Numero_Guia;

	    var formData = new FormData();
      formData.append("ID", window.Tabla_Ventas_Men.childNodes[0].innerHTML);
      formData.append("Guia", Guia_Real);

      $.ajax({
      url: dir + 'index.php/Controller_Empaques/Editar_Guia',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 35000,
      //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
      data: formData,
      beforeSend : function ()
      {
          $('#Cargando_Editar_Guia').css('display','');
      },
      success: function(data)
      {
         console.log(data);

         if (data > 0)
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
            "timeOut": "850",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
          // Display an error toast, with a title
          toastr.success('Numero de guia agregado con exito', 'Correcto');

          $("#Modal_Editar_Guia").modal("hide");
					$("#Numero_Guia").val("");
					Cargar_Tablas_Cajas();
					window.Tabla_Ventas_Men = null;
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
            "timeOut": "850",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
          // Display an error toast, with a title
          toastr.warning('Ocurrio un error al editar el numero de guia', 'Advertencia');
         }
      }
      })
      .done(function() {
          console.log("success");
      })
       .fail(function(jqXHR, textStatus, errorThrown) {
    	})
        .always(function() {
            $('#Cargando_Editar_Guia').css('display','none');
      });
    }
    else
    {
      toastr.warning('El N° de guia no cuenta con los valores necesarios', 'Advertencia');
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
              "timeOut": "850",
              "extendedTimeOut": "1000",
              "showEasing": "swing",
              "hideEasing": "linear",
              "showMethod": "fadeIn",
              "hideMethod": "fadeOut"
            }
            // Display an error toast, with a title
            toastr.warning('El campo Numero de Guia esta vacio', 'Advertencia');
	}
});


$("#Eliminar_Empaque").click(function(event) {
  
  if (window.Tabla_Ventas_Ex != null && window.Tabla_Ventas_Ex != "")
  {
    swal({
        title: "¿Esta seguro que desea eliminar la extracción?",
        text: "Una vez eliminado el empaque, la Venta aparecera como NO empaquetado",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          
      var formData = new FormData();
        formData.append("ID", window.Tabla_Ventas_Ex.childNodes[0].innerHTML);

        $.ajax({
            url: dir + 'index.php/Controller_Empaques/Eliminar_Empaque',
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

               if (!isNaN(data))
               {
                  if (data == 1)
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
                          "timeOut": "850",
                          "extendedTimeOut": "1000",
                          "showEasing": "swing",
                          "hideEasing": "linear",
                          "showMethod": "fadeIn",
                          "hideMethod": "fadeOut"
                        }
                        // Display an error toast, with a title
                        toastr.success('Empaque eliminado con exito', 'Correcto');

                        // Empaque

                        let Empaque  = document.getElementById("Table_Empaques"); 
                        let tbody_Empaque    = Empaque.tBodies[0];

                        $('#Table_Empaques').DataTable().destroy();
                        Empaque.tBodies[0].innerHTML = "";

                        // Caja General
                        let Caja_General   = document.getElementById("Table_Cajas"); 
                        let tbody_General    = Caja_General.tBodies[0];

                        $('#Table_Cajas').DataTable().destroy();
                        Caja_General.tBodies[0].innerHTML = "";

                        // Caja Chica
                        let Caja_Simple   = document.getElementById("Table_Ventas_Menudeo"); 
                        let tbody_Simple    = Caja_Simple.tBodies[0];

                        $('#Table_Ventas_Menudeo').DataTable().destroy();
                        Caja_Simple.tBodies[0].innerHTML = "";

                        // Productos

                        let Productos  = document.getElementById("Table_Productos"); 
                        let tbody_Productos    = Productos.tBodies[0];

                        $('#Table_Productos').DataTable().destroy();
                        Productos.tBodies[0].innerHTML = "";


                        fetch_data();

                        window.Tabla_Ventas_Ex = null;
                        window.Tabla_Ventas_Men = null;
                        window.Tabla_Ventas_Pro = null;
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
                        "timeOut": "850",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                      }
                      // Display an error toast, with a title
                      toastr.error('Ocurrio un error al eliminar el empaque', 'Error');
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
                        "timeOut": "850",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                      }
                      // Display an error toast, with a title
                      toastr.error('Ocurrio un error al eliminar el empaque ' + data, 'Error');
               }
            }
            })
            .done(function() {
                console.log("success");
            })
             .fail(function(jqXHR, textStatus, errorThrown) {

             if (jqXHR.status === 0)
             {

              console.log('Not connect: Verify Network.');
              location.reload();  

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
                $('#Cargando_Header').css('display','none');
            });
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
            // Display an error toast, with a title
            toastr.warning('Seleccione un empaque', 'Advertencia');
  }
});

});


 function fetch_data(){

  var dataTable = $('#Table_Empaques').DataTable({
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
                    if (full[3] == 'Adeudo')
                    {
                    	return "<label class='label label-danger'>Adeudo</label>"
                    }
                    else if (full[3] == 'Confirmacion_pago')
                    {
                    	return "<label class='label label-warning'>Confirmacion Pago</label>"
                    }
                    else if (full[3] == 'Pagado')
                    {
                    	return "<label class='label label-success'>Pagado</label>"
                    }
                    else
                    {
                      return "<label class='label label-default'>" + full[3] + "</label>"
                    }

                }
                //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
            },

        ],
        
    "order" : [],
    "ajax" : {

        url: dir + "Clases/fetch_Empaques.php",
        type: "POST"
    }
  });
}

function Crear_data_table_Cajas()
{
	$('#Table_Cajas').dataTable({
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

function  Crear_data_table_Venta_Menudeo()
{
	$('#Table_Ventas_Menudeo').dataTable({
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

function Crear_data_table_Producto()
{
	$('#Table_Productos').dataTable({
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

function Cargar_Tablas_Cajas()
{
	var formData = new FormData();
    formData.append("ID", window.Tabla_Ventas_Ex.childNodes[0].innerHTML);

    $.ajax({
        url: dir + 'index.php/Controller_Empaques/Empaque_general_view',
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
            let parsed = JSON.parse(data);

            console.log(parsed);

            if (parsed != null && parsed != "")
            {
            	// Caja General
        		let Caja_General   = document.getElementById("Table_Cajas"); 
        		let tbody_General    = Caja_General.tBodies[0];

        		$('#Table_Cajas').DataTable().destroy();
        		Caja_General.tBodies[0].innerHTML = "";

        		// Caja Chica
        		let Caja_Simple   = document.getElementById("Table_Ventas_Menudeo"); 
        		let tbody_Simple    = Caja_Simple.tBodies[0];

        		$('#Table_Ventas_Menudeo').DataTable().destroy();
        		Caja_Simple.tBodies[0].innerHTML = "";

        		// Productos

        		let Productos  = document.getElementById("Table_Productos"); 
        		let tbody_Productos    = Productos.tBodies[0];

        		$('#Table_Productos').DataTable().destroy();
        		Productos.tBodies[0].innerHTML = "";

        		    for (var i = 0; i < parsed['Detalle'].length; i++) 
	                {

	                 let row  = tbody_General.insertRow(i);
	                 let cel1 = row.insertCell(0);
	                 let cel2 = row.insertCell(1);
	                 let cel3 = row.insertCell(2);

	                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
	                 cel1.setAttribute("hidden", true);
	                 cel2.innerHTML = i + 1;
	                 cel3.innerHTML = parsed['Detalle'][i]['Numero_guia'];
	                
	                }

	                Crear_data_table_Cajas();
            }
        }
        })
        .done(function() {
            console.log("success");
        })
         .fail(function(jqXHR, textStatus, errorThrown) {

         if (jqXHR.status === 0)
         {

          console.log('Not connect: Verify Network.');
          location.reload();  

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
            $('#Cargando_Header').css('display','none');
        });
}