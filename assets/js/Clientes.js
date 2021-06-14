var dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.Global_Tabla_Clientes = null;

$(document).ready(function(){


fetch_data_Clientes_Activo($("#selectDistribuidor").val(), $("#selectNivel").val());

$("#Option_Agregar_Clientes").click(function(event) {

	$("#Modal_Agregar").modal("show");
});

$("#Agregar_Clientes").click(function(event) {

	$("#Modal_Agregar").modal("show");
});

$("#Option_Editar_Clientes").click(function(event) {

	Editar_Clientes_Menudeo();
});

$("#Editar_Clientes").click(function(event) {

	Editar_Clientes_Menudeo();
});

$("#Option_Eliminar_Clientes").click(function(event) {
    Eliminar_Cliente_Menudeo();
});

$("#Eliminar_Clientes").click(function(event) {
    Eliminar_Cliente_Menudeo();
});

$("#Mostrar_Inactivos").click(function(event) {
	
	if($('#Mostrar_Inactivos').prop('checked'))
	{
		let clientes    = document.getElementById("Table_Clientes"); 
		$('#Table_Clientes').DataTable().destroy();
	    clientes.tBodies[0].innerHTML = "";

	    fetch_data_Clientes($("#selectDistribuidor").val(), $("#selectNivel").val());
	}
	else
	{
		let clientes    = document.getElementById("Table_Clientes"); 
		$('#Table_Clientes').DataTable().destroy();
	    clientes.tBodies[0].innerHTML = "";

	    fetch_data_Clientes_Activo($("#selectDistribuidor").val(), $("#selectNivel").val());
	}
});

$("#selectDistribuidor").change(function () { 
    let distribuidor = $("#selectDistribuidor").val();
    if (distribuidor != "") {
        if($('#Mostrar_Inactivos').prop('checked')){
            let clientes    = document.getElementById("Table_Clientes"); 
            $('#Table_Clientes').DataTable().destroy();
            clientes.tBodies[0].innerHTML = "";
            fetch_data_Clientes(distribuidor, $("#selectNivel").val());
        }
        else{
            let clientes    = document.getElementById("Table_Clientes"); 
            $('#Table_Clientes').DataTable().destroy();
            clientes.tBodies[0].innerHTML = "";
            fetch_data_Clientes_Activo(distribuidor, $("#selectNivel").val());
        }
    }else{
        if($('#Mostrar_Inactivos').prop('checked')){
            let clientes    = document.getElementById("Table_Clientes"); 
            $('#Table_Clientes').DataTable().destroy();
            clientes.tBodies[0].innerHTML = "";
            fetch_data_Clientes(distribuidor, $("#selectNivel").val());
        }
        else{
            let clientes    = document.getElementById("Table_Clientes"); 
            $('#Table_Clientes').DataTable().destroy();
            clientes.tBodies[0].innerHTML = "";
            fetch_data_Clientes_Activo(distribuidor, $("#selectNivel").val());
        }
    }
});

$("#selectNivel").change(function(){
    let distribuidor = $("#selectDistribuidor").val();
    let Nivel = $("#selectNivel").val();
    if (Nivel != "") {
        if($('#Mostrar_Inactivos').prop('checked')){
            let clientes    = document.getElementById("Table_Clientes"); 
            $('#Table_Clientes').DataTable().destroy();
            clientes.tBodies[0].innerHTML = "";
            fetch_data_Clientes(distribuidor, Nivel);
        }
        else{
            let clientes    = document.getElementById("Table_Clientes"); 
            $('#Table_Clientes').DataTable().destroy();
            clientes.tBodies[0].innerHTML = "";
            fetch_data_Clientes_Activo(distribuidor, Nivel);
        }
    }else{
        if($('#Mostrar_Inactivos').prop('checked')){
            let clientes    = document.getElementById("Table_Clientes"); 
            $('#Table_Clientes').DataTable().destroy();
            clientes.tBodies[0].innerHTML = "";
            fetch_data_Clientes(distribuidor, Nivel);
        }
        else{
            let clientes    = document.getElementById("Table_Clientes"); 
            $('#Table_Clientes').DataTable().destroy();
            clientes.tBodies[0].innerHTML = "";
            fetch_data_Clientes_Activo(distribuidor, Nivel);
        }
    }
});

$("#btn_Guardar_Cliente").click(function(event) {
	
	 	let Nombre      = $("#txtNombre").val();
        let Apellidos   = $("#txt_Apellidos").val();
        let Empresa     = $("#txtEmpresa").val();
        let Cargo       = $("#txtCargo").val();
        let Calle       = $("#txtCalle").val();
        let Colonia     = $("#txtColonia").val();
        let Referencia  = $("#txtReferencia").val();
        let Ciudad      = $("#txtCiudad").val();
        let Municipio   = $("#txtMunicipio").val();
        let Estado      = $("#txtEstado").val();
        let Pais        = $("#txtPais").val();
        let CP          = $("#txtCP").val();
        let RFC         = $("#txtRFC").val();
        let Tel1        = $("#txtTel1").val();
        let Tel2        = $("#txtTel2").val();
        let Email       = $("#txtEmail").val();
        let Descuento   = $("#txtDescuento").val();
        let idDistri    = $("#select_Distribuidor").val();
        let Nivel  		= $("#txtNivel").val();
        let Semana  	= $("#txtSemana").val();
        let Dia  		= $("#txtDia").val();

        if (Nombre != null && Nombre != "" && Apellidos != null && Apellidos != "" && Empresa != null && Empresa != "" && Tel1 != null && Tel1 != "" && Email != null && Email != "" && Descuento != null && Descuento != "" && idDistri != null && idDistri != "") 
        {
        	var formData = new FormData();
            formData.append("Nombre", Nombre);
            formData.append("Apellidos", Apellidos);
            formData.append("Empresa", Empresa);
            formData.append("Cargo", Cargo);
            formData.append("Calle_numero", Calle);
            formData.append("Colonia", Colonia);
            formData.append("Referencias",Referencia);
            formData.append("Ciudad", Ciudad);
            formData.append("Municipio", Municipio);
            formData.append("Estado", Estado);
            formData.append("Pais", Pais);
            formData.append("CP", CP);
            formData.append("RFC", RFC);
            formData.append("Tel1", Tel1);
            formData.append("Tel2", Tel2);
            formData.append("Email", Email);
            formData.append("Descuento_%", Descuento);
            formData.append("idCliente", idDistri);
            formData.append("Status", 'Activo');
            formData.append("Nivel", Nivel);
            formData.append("Semana", Semana);
            formData.append("Dia", Dia);


	            $.ajax({
	               url: dir + 'index.php/Controller_Cliente/Guardar_Cliente',
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
	                    console.log(data);

	                    let Resultado = parseInt(data.trim());

	                    if(data == "Correcto")
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
	                          "timeOut": "800",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.success('Cliente agregado con exito', 'Correcto');

	                        if($('#Mostrar_Inactivos').prop('checked'))
							{
								let clientes    = document.getElementById("Table_Clientes"); 
								$('#Table_Clientes').DataTable().destroy();
							    clientes.tBodies[0].innerHTML = "";

							    fetch_data_Clientes($("#selectDistribuidor").val(), $("#selectNivel").val());
							}
							else
							{
								let clientes    = document.getElementById("Table_Clientes"); 
								$('#Table_Clientes').DataTable().destroy();
							    clientes.tBodies[0].innerHTML = "";

							    fetch_data_Clientes_Activo($("#selectDistribuidor").val(), $("#selectNivel").val());
							}

	                        //$('#Table_Clientes').DataTable().destroy();

	                        Limpiar();

	                        window.Global_Tabla_Clientes = null;

	                        //fetch_data_Clientes();
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
	                          "timeOut": "800",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.error('Ocurrio un error al crear al cliente', 'Error');
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
              "timeOut": "800",
              "extendedTimeOut": "1000",
              "showEasing": "swing",
              "hideEasing": "linear",
              "showMethod": "fadeIn",
              "hideMethod": "fadeOut"
            }
            // Display an error toast, with a title
            toastr.error('Algunos campos obligatorios estan vacios', 'Error');
        }
});


$("#btn_Editar_Cliente").click(function(event) {
	
		let Nombre      = $("#txtNombre_Editar").val();
        let Apellidos   = $("#txt_Apellidos_Editar").val();
        let Empresa     = $("#txtEmpresa_Editar").val();
        let Cargo       = $("#txtCargo_Editar").val();
        let Calle       = $("#txtCalle_Editar").val();
        let Colonia     = $("#txtColonia_Editar").val();
        let Referencia  = $("#txtReferencia_Editar").val();
        let Ciudad      = $("#txtCiudad_Editar").val();
        let Municipio   = $("#txtMunicipio_Editar").val();
        let Estado      = $("#txtEstado_Editar").val();
        let Pais        = $("#txtPais_Editar").val();
        let CP          = $("#txtCP_Editar").val();
        let RFC         = $("#txtRFC_Editar").val();
        let Tel1        = $("#txtTel1_Editar").val();
        let Tel2        = $("#txtTel2_Editar").val();
        let Email       = $("#txtEmail_Editar").val();
        let Descuento   = $("#txtDescuento_Editar").val();
        let idDistri    = $("#select_Distribuidor_Editar").val();
        let Nivel  		= $("#txtNivel_Editar").val();
        let Semana 		= $("#txtSemanaEditar").val();
        let Dia  		= $("#txtDiaEditar").val();
        let Status      = "";

        if($('#check_Status_Editar').prop('checked')){
            Status = "Inactivo";
        }
        else{
            Status = "Activo";
        }

        if (Nombre != null && Nombre != "" && Apellidos != null && Apellidos != "" && Empresa != null && Empresa != "" && Tel1 != null && Tel1 != "" && Email != null && Email != "" && Descuento != null && Descuento != "" && idDistri != null && idDistri != "") 
        {
            

        	var formData = new FormData();
        	formData.append("ID", window.Global_Tabla_Clientes.childNodes[0].innerHTML);
            formData.append("Nombre", Nombre);
            formData.append("Apellidos", Apellidos);
            formData.append("Empresa", Empresa);
            formData.append("Cargo", Cargo);
            formData.append("Calle_numero", Calle);
            formData.append("Colonia", Colonia);
            formData.append("Referencias",Referencia);
            formData.append("Ciudad", Ciudad);
            formData.append("Municipio", Municipio);
            formData.append("Estado", Estado);
            formData.append("Pais", Pais);
            formData.append("CP", CP);
            formData.append("RFC", RFC);
            formData.append("Tel1", Tel1);
            formData.append("Tel2", Tel2);
            formData.append("Email", Email);
            formData.append("Descuento_%", Descuento);
            formData.append("idCliente", idDistri);
            formData.append("Status", Status);
            formData.append("Nivel", Nivel);
            formData.append("Semana", Semana);
            formData.append("Dia", Dia);

             $.ajax({
	               url: dir + 'index.php/Controller_Cliente/Editar_Cliente',
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
	                    console.log(data);

	                    if(data == "Correcto")
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
	                          "timeOut": "800",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.success('Cliente modificado con exito', 'Correcto');

	                        if($('#Mostrar_Inactivos').prop('checked'))
							{
								let clientes    = document.getElementById("Table_Clientes"); 
								$('#Table_Clientes').DataTable().destroy();
							    clientes.tBodies[0].innerHTML = "";

							    fetch_data_Clientes($("#selectDistribuidor").val(), $("#selectNivel").val());
							}
							else
							{
								let clientes    = document.getElementById("Table_Clientes"); 
								$('#Table_Clientes').DataTable().destroy();
							    clientes.tBodies[0].innerHTML = "";

							    fetch_data_Clientes_Activo($("#selectDistribuidor").val(), $("#selectNivel").val());
							}

	                        //$('#Table_Clientes').DataTable().destroy();

	                        Limpiar();

	                        window.Global_Tabla_Clientes = null;

	                        //fetch_data_Clientes();
	                    }
	                    else if (data == "neutro")
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
	                          "timeOut": "800",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.warning('No hubo ningún cambio al cliente', 'Advertencia');
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
	                          "timeOut": "800",
	                          "extendedTimeOut": "1000",
	                          "showEasing": "swing",
	                          "hideEasing": "linear",
	                          "showMethod": "fadeIn",
	                          "hideMethod": "fadeOut"
	                        }
	                        // Display an error toast, with a title
	                        toastr.error('Ocurrio un error al modificar al cliente', 'Error');
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
              "timeOut": "800",
              "extendedTimeOut": "1000",
              "showEasing": "swing",
              "hideEasing": "linear",
              "showMethod": "fadeIn",
              "hideMethod": "fadeOut"
            }
            // Display an error toast, with a title
            toastr.error('Algunos campos obligatorios estan vacios', 'Error');
        }


      });


    var Table_Clientes = document.getElementById("Table_Clientes");
    Table_Clientes.onclick = function(e)
    {
        window.Global_Tabla_Clientes = e.target.parentNode;
    }


});

function Eliminar_Cliente_Menudeo()
{
	if (window.Global_Tabla_Clientes != null)
    {

        if (window.Global_Tabla_Clientes.childNodes[18].childNodes[0].innerHTML != 'Inactivo')
        {
            swal({
                  title: "¿Esta seguro que desea eliminar al cliente?",
                  text: "Una vez eliminada pasara a un estatus como inactivo",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                })
                .then((willDelete) => {
                  if (willDelete) {
                    
                        var formData = new FormData();
                        formData.append("ID", window.Global_Tabla_Clientes.childNodes[0].innerHTML);

                        $.ajax({
                           url: dir + 'index.php/Controller_Cliente/Eliminar_Clientes',
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
                                console.log(data);

                                if(data == "Correcto")
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
                                      "timeOut": "800",
                                      "extendedTimeOut": "1000",
                                      "showEasing": "swing",
                                      "hideEasing": "linear",
                                      "showMethod": "fadeIn",
                                      "hideMethod": "fadeOut"
                                    }
                                    // Display an error toast, with a title
                                    toastr.success('Cliente eliminado con exito', 'Correcto');

                                    if($('#Mostrar_Inactivos').prop('checked'))
									{
										let clientes    = document.getElementById("Table_Clientes"); 
										$('#Table_Clientes').DataTable().destroy();
									    clientes.tBodies[0].innerHTML = "";

									    fetch_data_Clientes($("#selectDistribuidor").val(), $("#selectNivel").val());
									}
									else
									{
										let clientes    = document.getElementById("Table_Clientes"); 
										$('#Table_Clientes').DataTable().destroy();
									    clientes.tBodies[0].innerHTML = "";

									    fetch_data_Clientes_Activo($("#selectDistribuidor").val(), $("#selectNivel").val());
									}

                                    //$('#Table_Clientes').DataTable().destroy();

                                    Limpiar();

                                    window.Global_Tabla_Clientes = null;

	                        		//fetch_data_Clientes();
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
                                      "timeOut": "800",
                                      "extendedTimeOut": "1000",
                                      "showEasing": "swing",
                                      "hideEasing": "linear",
                                      "showMethod": "fadeIn",
                                      "hideMethod": "fadeOut"
                                    }
                                    // Display an error toast, with a title
                                    toastr.error('Ocurrio un error al eliminar al cliente', 'Error');
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
                        // Display an error toast, with a title
                        toastr.warning('El cliente se encuentra como inactivo', 'Advertencia');
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
                          "timeOut": "800",
                          "extendedTimeOut": "1000",
                          "showEasing": "swing",
                          "hideEasing": "linear",
                          "showMethod": "fadeIn",
                          "hideMethod": "fadeOut"
                        }
                        // Display an error toast, with a title
                        toastr.warning('Seleccione un cliente', 'Advertencia');
    }
}


function Editar_Clientes_Menudeo()
{
	if (window.Global_Tabla_Clientes != null){


        var formData = new FormData();
        formData.append("idCliente", window.Global_Tabla_Clientes.childNodes[0].innerHTML);

        $.ajax({
            url: dir + 'index.php/Controller_Cliente/Get_Info_Cliente',
            type: 'POST',
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            timeout: 0,
            data: formData,
            beforeSend : function (){
                $('#Cargando_Header').css('display', '');
            },
            success: function(data){
                console.log(data);
                if(data){
                    const parse = JSON.parse(data);
                    console.log(parse);

                    $("#txtNombre_Editar").val(parse[0]['Nombre']);
                    $("#txt_Apellidos_Editar").val(parse[0]['Apellidos']);
                    $("#txtEmpresa_Editar").val(parse[0]['Empresa']);
                    $("#txtCargo_Editar").val(parse[0]['Cargo']);
                    $("#txtCalle_Editar").val(parse[0]['Calle_numero']);
                    $("#txtColonia_Editar").val(parse[0]['Colonia']);
                    $("#txtReferencia_Editar").val(parse[0]['Referencias']);
                    $("#txtCiudad_Editar").val(parse[0]['Ciudad']);
                    $("#txtMunicipio_Editar").val(parse[0]['Municipio']);
                    $("#txtEstado_Editar").val(parse[0]['Estado']);
                    $("#txtPais_Editar").val(parse[0]['Pais']);
                    $("#txtCP_Editar").val(parse[0]['CP']);
                    $("#txtRFC_Editar").val(parse[0]['RFC']);
                    $("#txtTel1_Editar").val(parse[0]['Tel1']);
                    $("#txtTel2_Editar").val(parse[0]['Tel2']);
                    $("#txtEmail_Editar").val(parse[0]['Email']);
                    $("#txtDescuento_Editar").val(parse[0]['Descuento_%']);
                    $("#txtNivel_Editar").val(parse[0]['Nivel']);
                    $("#txtSemanaEditar").val(parse[0]['Semana']);
                    $("#txtDiaEditar").val(parse[0]['Dia']);
                    $("#select_Distribuidor_Editar").val(parse[0]['idCliente']);

                    if (parse[0]['Status'] == 'Inactivo')
                    {
                        $("#check_Status_Editar").prop('checked', true);
                    }
                    else
                    {
                        $("#check_Status_Editar").prop('checked', false);
                    }

                    $("#Modal_Editar").modal("show");
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
            $('#Cargando_Header').css('display', 'none');
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
          "timeOut": "800",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }
        // Display an error toast, with a title
        toastr.warning('Seleccione un Cliente', 'Advertencia');
	}
}


 function fetch_data_Clientes(distribuidores,nivel){

  var dataTable = $('#Table_Clientes').DataTable({
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
                    "targets": 18,
                    'render': function (data, type, full, meta)
                    {
                        if (full[18] == 'Activo')
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

        url: dir + "Clases/fetch_Clientes.php",
        type: "POST",
        data:{
            distribuidores:distribuidores,
            nivel:nivel
        }
    }
  });
}

function fetch_data_Clientes_Activo(distribuidores,nivel) {

	var dataTable = $('#Table_Clientes').DataTable({
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
                    "targets": 18,
                    'render': function (data, type, full, meta)
                    {
                        if (full[18] == 'Activo')
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

        url: dir + "Clases/fetch_Clientes_Activo.php",
        type: "POST",
        data:{
            distribuidores:distribuidores,
            nivel:nivel
        }
    }
  });
}

function check(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8 || tecla == 32 || tecla == 241) {
        return true;
    }

    // Patron de entrada, en este caso solo acepta numeros y letras
    patron = /[A-Za-z0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}


function Limpiar() {

    $("#txtNombre").val("");
    $("#txt_Apellidos").val("");
    $("#txtEmpresa").val("");
    $("#txtCargo").val("");
    $("#txtCalle").val("");
    $("#txtColonia").val("");
    $("#txtReferencia").val("");
    $("#txtCiudad").val("");
    $("#txtMunicipio").val("");
    $("#txtEstado").val("");
    $("#txtPais").val("");
    $("#txtCP").val("");
    $("#txtRFC").val("");
    $("#txtTel1").val("");
    $("#txtTel2").val("");
    $("#txtEmail").val("");
    $("#txtDescuento").val("");
    $("#select_Distribuidor").val("");
    $("#txtNivel").val("");
    $("#txtSemana").val("");
    $("#txtDia").val("");

    $("#Modal_Agregar").modal("hide");


    $("#txtNombre_Editar").val("");
    $("#txt_Apellidos_Editar").val("");
    $("#txtEmpresa_Editar").val("");
    $("#txtCargo_Editar").val("");
    $("#txtCalle_Editar").val("");
    $("#txtColonia_Editar").val("");
    $("#txtReferencia_Editar").val("");
    $("#txtCiudad_Editar").val("");
    $("#txtMunicipio_Editar").val("");
    $("#txtEstado_Editar").val("");
    $("#txtPais_Editar").val("");
    $("#txtCP_Editar").val("");
    $("#txtRFC_Editar").val("");
    $("#txtTel1_Editar").val("");
    $("#txtTel2_Editar").val("");
    $("#txtEmail_Editar").val("");
    $("#txtDescuento_Editar").val("");
    $("#select_Distribuidor_Editar").val("");
    $("#txtNivel_Editar").val("");
    $("#txtSemanaEditar").val("");
    $("#txtDiaEditar").val("");

    $("#Modal_Editar").modal("hide");

    }