var dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.Global_Tabla_Promociones = null;
window.Global_Tabla_Ofertas = null;
window.Global_Tabla_List_Distribuidor = null;
window.Global_Tabla_List_Producto = null;
window.Global_Tabla_List_Sucursal = null;
window.Global_Tabla_List_Distribuidor_Editar = null;
window.Global_Tabla_List_Producto_Editar = null;
window.Global_Tabla_List_Sucursal_Editar = null;

window.Tipo_Oferta = "";
window.Tipo_Oferta_Editar = "";

window.Global_Tabla_List_Distribuidor_Oferta = null;
window.Global_Tabla_List_Regalo				 = null;
window.Global_Tabla_List_Division 			 = null;
window.Global_Tabla_List_Linea 				 = null;
window.Global_Tabla_List_Sublinea 			 = null;
window.Global_Tabla_List_Producto_Oferta	 = null;
window.Global_Tabla_List_Sucursal_Oferta	 = null;

window.Global_Tabla_List_Distribuidor_Oferta_Editar  = null;
window.Global_Tabla_List_Regalo_Editar				 = null;
window.Global_Tabla_List_Division_Editar 			 = null;
window.Global_Tabla_List_Linea_Editar 				 = null;
window.Global_Tabla_List_Sublinea_Editar 			 = null;
window.Global_Tabla_List_Producto_Oferta_Editar	 	 = null;
window.Global_Tabla_List_Sucursal_Oferta_Editar	 	 = null;

window.Eliminar_Distribuidor_Kit = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Distribuidores_Kit").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Distribuidor_Kit_Editar = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Distribuidores_Kit_Editar").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Producto_Kit = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Productos_Kit").tBodies[0];

	let Tabla_Sucursal         = document.getElementById("Table_Sucursales_Kit");
    let Tbody_Sucursal         = Tabla_Sucursal.getElementsByTagName("tbody")[0];

	for (var i = 0; i < Tbody_Sucursal.rows.length ; i++)
    {	
	    Tbody_Sucursal.rows[i].cells[5].innerHTML = 0;
    }

    tbody.removeChild(row1);
}

window.Eliminar_Producto_Kit_Editar = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Productos_Kit_Editar").tBodies[0];

	let Tabla_Sucursal         = document.getElementById("Table_Sucursales_Kit_Editar");
    let Tbody_Sucursal         = Tabla_Sucursal.getElementsByTagName("tbody")[0];

	for (var i = 0; i < Tbody_Sucursal.rows.length ; i++)
    {	
	    Tbody_Sucursal.rows[i].cells[5].innerHTML = 0;
    }

    tbody.removeChild(row1);
}

window.Eliminar_Sucursales_Kit_Editar = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Sucursales_Kit_Editar").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Sucursales_Kit = function (event) {
	
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Sucursales_Kit").tBodies[0];
    tbody.removeChild(row1);
}

////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

window.Eliminar_Distribuidor_Oferta = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Distribuidores_Oferta").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Regalo = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Regalos").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Division = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Divisiones").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Linea = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Linea").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Sublinea = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Sublinea").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Producto_Oferta = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Producto_Oferta").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Sucursal_Oferta = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Sucursales_Oferta").tBodies[0];
    tbody.removeChild(row1);
}

window.keypress_funcion = function (event) {
	
	let row1 = this.parentNode.parentNode;
	row1.childNodes[5].innerHTML = 0;
}

window.keypress_funcion_Editar = function (event) {
	
	let row1 = this.parentNode.parentNode;
	row1.childNodes[5].innerHTML = 0;
}


window.Recalcular_Ahorro = function (event)
{
	let row1 = this.parentNode.parentNode;
	let identidicador = row1.childNodes[5].innerHTML;

	if (identidicador == 0){

		let tbody = document.querySelector("#Table_Sucursales_Kit").tBodies[0];
		let id_Sucursal = row1.childNodes[0].innerHTML;
		let Precio_ahorro = row1.childNodes[2].childNodes[0].value;
		let Ahorro = 0;

		array_ID = new Array();
		array_Cantidad = new Array();
		let Importe = 0;
	    
	    let Tabla_Productos         = document.getElementById("Table_Productos_Kit");
	    let Tbody_Productos         = Tabla_Productos.getElementsByTagName("tbody")[0];

	    if (Tbody_Productos.rows.length > 0)
	    {
	    	for (var i = 0; i < Tbody_Productos.rows.length ; i++)
		    {		   
		    	array_ID.push(Tbody_Productos.rows[i].cells[0].innerHTML);   
			    array_Cantidad.push(Tbody_Productos.rows[i].cells[2].childNodes[0].value);
			}

			    var formData = new FormData();
	            formData.append("idCatalogo", array_ID);
	            formData.append("Cantidad", array_Cantidad);
	            formData.append("idSucursal", id_Sucursal);

	            $.ajax({
	               url: dir + 'index.php/Controller_Promociones/get_info_Inventario',
	               type: 'POST',
	               processData: false,  // tell jQuery not to process the data
	               contentType: false,
	               timeout: 35000,
	               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	               data: formData,
	               beforeSend : function ()
	                {
	                    $('#Cargando_Modal_Kits').css('display', '');
	                },
	                success: function(data)
	                {
	                    let parsed = JSON.parse(data);	
	                    Importe = parsed['Inventario']['Importe'];
			            Ahorro = parseFloat(Importe) - parseFloat(Precio_ahorro);
			            row1.childNodes[3].childNodes[0].value = parseFloat(Ahorro).toFixed(2);
			            row1.childNodes[5].innerHTML = 1;
	                }
	           })
	           .done(function() {
	           	$('#Cargando_Modal_Kits').css('display', 'none');
	           })
	           .fail(function() {
	               console.log("error");
	           })
	           .always(function() {
	           });
	      
	    }else{

	    	toastr.warning('Tiene que ver por lo menos un producto agregado', 'Advertencia');
	    }

	}
	
}

window.Recalcular_Ahorro2 = function (event)
{
	let Tabla_Sucursal         = document.getElementById("Table_Sucursales_Kit");
    let Tbody_Sucursal         = Tabla_Sucursal.getElementsByTagName("tbody")[0];

	for (var i = 0; i < Tbody_Sucursal.rows.length ; i++)
    {	
	    Tbody_Sucursal.rows[i].cells[5].innerHTML = 0;
    }
}

window.Recalcular_Ahorro_Editar2 = function (event)
{
	let Tabla_Sucursal         = document.getElementById("Table_Sucursales_Kit_Editar");
    let Tbody_Sucursal         = Tabla_Sucursal.getElementsByTagName("tbody")[0];

	for (var i = 0; i < Tbody_Sucursal.rows.length ; i++)
    {	
	    Tbody_Sucursal.rows[i].cells[5].innerHTML = 0;
    }
}

window.Recalcular_Ahorro_Editar = function (event)
{
	let row1 = this.parentNode.parentNode;
	let identidicador = row1.childNodes[5].innerHTML;

	if (identidicador == 0){

		let tbody = document.querySelector("#Table_Sucursales_Kit_Editar").tBodies[0];
		let id_Sucursal = row1.childNodes[0].innerHTML;
		let Precio_ahorro = row1.childNodes[2].childNodes[0].value;
		let Ahorro = 0;

		array_ID = new Array();
		array_Cantidad = new Array();
		let Importe = 0;
	    
	    let Tabla_Productos         = document.getElementById("Table_Productos_Kit_Editar");
	    let Tbody_Productos         = Tabla_Productos.getElementsByTagName("tbody")[0];

	    if (Tbody_Productos.rows.length > 0)
	    {
	    	for (var i = 0; i < Tbody_Productos.rows.length ; i++)
		    {		   
		    	array_ID.push(Tbody_Productos.rows[i].cells[0].innerHTML);   
			    array_Cantidad.push(Tbody_Productos.rows[i].cells[2].childNodes[0].value);
			}

			    var formData = new FormData();
	            formData.append("idCatalogo", array_ID);
	            formData.append("Cantidad", array_Cantidad);
	            formData.append("idSucursal", id_Sucursal);

	            $.ajax({
	               url: dir + 'index.php/Controller_Promociones/get_info_Inventario',
	               type: 'POST',
	               processData: false,  // tell jQuery not to process the data
	               contentType: false,
	               timeout: 35000,
	               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	               data: formData,
	               beforeSend : function ()
	                {
	                    $('#Cargando_Modal_Kits_Editar').css('display', '');
	                },
	                success: function(data)
	                {
	                	console.log(data);
	                    let parsed = JSON.parse(data);	
	                    Importe = parsed['Inventario']['Importe'];
			            Ahorro = parseFloat(Importe) - parseFloat(Precio_ahorro);
			            row1.childNodes[3].childNodes[0].value = parseFloat(Ahorro).toFixed(2);
			            row1.childNodes[5].innerHTML = 1;
	                }
	           })
	           .done(function() {
	           	$('#Cargando_Modal_Kits_Editar').css('display', 'none');
	           })
	           .fail(function() {
	               console.log("error");
	           })
	           .always(function() {
	           });
	      
	    }else{

	    	toastr.warning('Tiene que ver por lo menos un producto agregado', 'Advertencia');
	    }

	}
	
}


























////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

window.Eliminar_Distribuidor_Oferta_Editar = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Distribuidores_Oferta_Editar").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Regalo_Editar = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Regalos_Editar").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Division_Editar = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Divisiones_Editar").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Linea_Editar = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Linea_Editar").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Sublinea_Editar = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Sublinea_Editar").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Producto_Oferta_Editar = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Producto_Oferta_Editar").tBodies[0];
    tbody.removeChild(row1);
}

window.Eliminar_Sucursal_Oferta_Editar = function (event)
{
	let row1 = this.parentNode.parentNode;
	let tbody = document.querySelector("#Table_Sucursales_Oferta_Editar").tBodies[0];
    tbody.removeChild(row1);
}


$(document).ready(function(){

fetch_data_Promociones();
fetch_data_Ofertas();


    $('.input-daterange').datepicker({
      format: "yyyy-mm-dd",
      autoclose: true
    });

    /*Input fecha Kit*/

    $('#Vigencia_Inicial_Kit').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });
    $('#Vigencia_Final_Kit').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });

    $('#Vigencia_Inicial_Kit_Editar').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });
    $('#Vigencia_Final_Kit_Editar').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });

    $('#Vigencia_Inicial_Oferta').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });
    $('#Vigencia_Final_Oferta').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });

    $('#Vigencia_Inicial_Oferta_Editar').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });
    $('#Vigencia_Final_Oferta_Editar').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });

    $("#Option_Agregar_Promociones").click(function(event) {
    	/* Act on the event */
    	$("#myModal").modal("show");
    });

    $("#Agregar_Promociones").click(function(event) {
    	/* Act on the event */
    	$("#myModal").modal("show");
    });

    $("#Option_Editar_Promociones").click(function(event) {
    	/* Act on the event */
    	Editar_Promocion();
    });

    $("#Editar_Promociones").click(function(event) {
    	/* Act on the event */
    	Editar_Promocion();
    });

    $("#Option_Eliminar_Promociones").click(function(event) {
    	/* Act on the event */
    	Eliminar_Promocion();
    });

    $("#Eliminar_Promociones").click(function(event) {
    	/* Act on the event */
    	Eliminar_Promocion();
    });

    ////////////////////////////////////// Funciones Promociones KIT ////////////////////////////////////////


    $("#check_Excluir_Kit").click(function(event) {
    	
    	if ($('#check_Excluir_Kit').prop('checked'))
    	{
		    $("#Div_Table_Distribuidor_Kit").css('display','');
		}
		else
		{
			let Tabla_Clientes         = document.getElementById("Table_Distribuidores_Kit");
    		let Tbody_Clientes         = Tabla_Clientes.getElementsByTagName("tbody")[0];

    		 if (Tbody_Clientes.rows.length > 0)
    		 {
    		 	swal({
					  title: "¿Esta segúro?",
					  text: "Se encuentran distribuidores agregados a la promoción si continúa todos los distribuidores agregados previamente seran eliminas de la tabla \n \n \n ¿Desea Continuar con el proceso?",
					  icon: "warning",
					  buttons: true,
					  dangerMode: true,
					})
					.then((willDelete) => {
					  if (willDelete) {

					    Tbody_Clientes.innerHTML = "";
					    $("#Div_Table_Distribuidor_Kit").css('display','none');

					  } 
					  else 
					  {
					  	$("#check_Excluir_Kit").prop('checked', true);
					    $("#Div_Table_Distribuidor_Kit").css('display','');
					  }
					});
    		 }
    		 else
    		 {
    		 	$("#Div_Table_Distribuidor_Kit").css('display','none');
    		 }
			
		}

    });


    $("#check_Excluir_Kit_Editar").click(function(event) {
    	
    	if ($('#check_Excluir_Kit_Editar').prop('checked'))
    	{
		    $("#Div_Table_Distribuidor_Kit_Editar").css('display','');
		}
		else
		{
			let Tabla_Clientes         = document.getElementById("Table_Distribuidores_Kit_Editar");
    		let Tbody_Clientes         = Tabla_Clientes.getElementsByTagName("tbody")[0];

    		 if (Tbody_Clientes.rows.length > 0)
    		 {
    		 	swal({
					  title: "¿Esta segúro?",
					  text: "Se encuentran distribuidores agregados a la promoción si continúa todos los distribuidores agregados previamente seran eliminas de la tabla \n \n \n ¿Desea Continuar con el proceso?",
					  icon: "warning",
					  buttons: true,
					  dangerMode: true,
					})
					.then((willDelete) => {
					  if (willDelete) {

					    Tbody_Clientes.innerHTML = "";
					    $("#Div_Table_Distribuidor_Kit_Editar").css('display','none');

					  } 
					  else 
					  {
					  	$("#check_Excluir_Kit").prop('checked', true);
					    $("#Div_Table_Distribuidor_Kit_Editar").css('display','');
					  }
					});
    		 }
    		 else
    		 {
    		 	$("#Div_Table_Distribuidor_Kit_Editar").css('display','none');
    		 }
			
		}

    });


    $("#Agregar_Promocion_Editar").click(function(event) {
    	
    	let Nombre   = $("#txtNombre_Kit_Editar").val();
    	let Inicial  = $("#Vigencia_Inicial_Kit_Editar").val();
    	let Final    = $("#Vigencia_Final_Kit_Editar").val();
    	let Division = $("#select_Division_Kit_Editar").val();
    	let Linea    = $("#select_Linea_Kit_Editar").val();
    	let Sublinea = $("#select_Sublinea_Kit_Editar").val();
    	let Bandera  = 0;
    	let Status   = "";
    	let Contador = 0;

    	array_Producto = new Array();
	    array_Clientes = new Array();
	    array_Sucursal = new Array();
	    array_Cantidad = new Array();
	    array_Precio   = new Array();
	    array_Ahorro   = new Array();

    	let Tabla_Clientes         = document.getElementById("Table_Distribuidores_Kit_Editar");
    	let Tbody_Clientes         = Tabla_Clientes.getElementsByTagName("tbody")[0];

    	let Tabla_Producto         = document.getElementById("Table_Productos_Kit_Editar");
    	let Tbody_Producto         = Tabla_Producto.getElementsByTagName("tbody")[0];

    	let Tabla_Sucursal         = document.getElementById("Table_Sucursales_Kit_Editar");
    	let Tbody_Sucursal         = Tabla_Sucursal.getElementsByTagName("tbody")[0];

    	if (Nombre != null && Nombre != "" && Inicial != null && Inicial != "" && Final != null && Final != "")
    	{
    		if (Tbody_Producto.rows.length > 0 && Tbody_Sucursal.rows.length > 0)
    		{
    			for (var i = 0; i < Tbody_Producto.rows.length ; i++)
			    {		      
				    array_Producto.push(Tbody_Producto.rows[i].cells[0].innerHTML);
				    array_Cantidad.push(Tbody_Producto.rows[i].cells[2].childNodes[0].value);
			    }

			    for (var i = 0; i < Tbody_Clientes.rows.length ; i++)
			    {		      
				    array_Clientes.push(Tbody_Clientes.rows[i].cells[0].innerHTML);
			    }

			    for (var i = 0; i < Tbody_Sucursal.rows.length ; i++)
			    {		      
				    array_Sucursal.push(Tbody_Sucursal.rows[i].cells[0].innerHTML);
				    array_Precio.push(Tbody_Sucursal.rows[i].cells[2].childNodes[0].value);
				    array_Ahorro.push(Tbody_Sucursal.rows[i].cells[3].childNodes[0].value);

				    console.log(Tbody_Sucursal.rows[i].cells[5].innerHTML);
				    console.log(Tbody_Sucursal.rows[i].cells[5].innerHTML == 0);

				    if (Tbody_Sucursal.rows[i].cells[5].innerHTML == 0)
				    {
				    	Contador = 1;
				    }
				    else
				    {
				    	Contador = 0;
				    }
			    }

			    if ($('#check_Excluir_Kit_Editar').prop('checked'))
		    	{
				    Bandera = 1;
				}
				else
				{
					Bandera = 0;
				}

				if ($('#check_Status_Kit_Editar').prop('checked'))
				{
					Status = "Inactivo";
				}
				else
				{
					Status = "Activo";
				}

				if (Contador == 0)
				{
					var formData = new FormData();
				    formData.append("ID", window.Global_Tabla_Promociones.childNodes[0].innerHTML);
		            formData.append("Nombre", Nombre);
		            formData.append("Vigencia_Inicial", Inicial);
		            formData.append("Vigencia_Final", Final);
		            formData.append("Division", Division);
		            formData.append("Linea", Linea);
		            formData.append("Sublinea", Sublinea);
		            formData.append("Distribuidor", array_Clientes);
		            formData.append("Producto", array_Producto);
		            formData.append("Sucursal", array_Sucursal);
		            formData.append("Excluir", Bandera);
		            formData.append("Cantidad", array_Cantidad);
		            formData.append("Precio", array_Precio);
		            formData.append("Ahorro", array_Ahorro);
		            formData.append("Status", Status);

		            $.ajax({
		               url: dir + 'index.php/Controller_Promociones/Editar_Promocion',
		               type: 'POST',
		               processData: false,  // tell jQuery not to process the data
		               contentType: false,
		               timeout: 35000,
		               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		               data: formData,
		               beforeSend : function ()
		                {
		                    $('#Cargando_Modal_Kits_Editar').css('display', '');
		                },
		                success: function(data)
		                {
		                    console.log(data);

		                    if (data == 'Correcto')
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
						            toastr.success('Promoción agregada con exito', 'Correcto');

						            $("#myModal_Editar").modal("hide"); 

						            Limpiar();       
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
						            toastr.error('Ocurrio un error al crear la promoción', 'Error');
		                    }
		                }
		           })
		           .done(function() {
		               
		               $('#Cargando_Modal_Kits_Editar').css('display', 'none');
		           })
		           .fail(function() {
		               console.log("error");
		           })
		           .always(function() {
		           });

				}else{

					toastr.warning('Para continuar es necesario recalcular el ahorro de las sucursales', 'Advertencia');

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
		            toastr.warning('Por lo menos debe de agregar a productos y sucursal', 'Advertencia');
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
	            toastr.warning('Algúnos campos obligatorios estan vacios', 'Advertencia');
    	}
    });

    $("#Agregar_Promocion").click(function(event) {
    	
    	let Nombre   = $("#txtNombre_Kit").val();
    	let Inicial  = $("#Vigencia_Inicial_Kit").val();
    	let Final    = $("#Vigencia_Final_Kit").val();
    	let Division = $("#select_Division_Kit").val();
    	let Linea    = $("#select_Linea_Kit").val();
    	let Sublinea = $("#select_Sublinea_Kit").val();
    	let Bandera  = 0;
    	let Contador = 0;

    	array_Producto = new Array();
	    array_Clientes = new Array();
	    array_Sucursal = new Array();
	    array_Cantidad = new Array();
	    array_Precio   = new Array();
	    array_Ahorro   = new Array();

    	let Tabla_Clientes         = document.getElementById("Table_Distribuidores_Kit");
    	let Tbody_Clientes         = Tabla_Clientes.getElementsByTagName("tbody")[0];

    	let Tabla_Producto         = document.getElementById("Table_Productos_Kit");
    	let Tbody_Producto         = Tabla_Producto.getElementsByTagName("tbody")[0];

    	let Tabla_Sucursal         = document.getElementById("Table_Sucursales_Kit");
    	let Tbody_Sucursal         = Tabla_Sucursal.getElementsByTagName("tbody")[0];

    	if (Nombre != null && Nombre != "" && Inicial != null && Inicial != "" && Final != null && Final != "")
    	{
    		if (Tbody_Producto.rows.length > 0 && Tbody_Sucursal.rows.length > 0)
    		{
    			for (var i = 0; i < Tbody_Producto.rows.length ; i++)
			    {		      
				    array_Producto.push(Tbody_Producto.rows[i].cells[0].innerHTML);
				    array_Cantidad.push(Tbody_Producto.rows[i].cells[2].childNodes[0].value);
			    }

			    for (var i = 0; i < Tbody_Clientes.rows.length ; i++)
			    {		      
				    array_Clientes.push(Tbody_Clientes.rows[i].cells[0].innerHTML);
			    }

			    for (var i = 0; i < Tbody_Sucursal.rows.length ; i++)
			    {		      
				    array_Sucursal.push(Tbody_Sucursal.rows[i].cells[0].innerHTML);
				    array_Precio.push(Tbody_Sucursal.rows[i].cells[2].childNodes[0].value);
				    array_Ahorro.push(Tbody_Sucursal.rows[i].cells[3].childNodes[0].value);

				    console.log(Tbody_Sucursal.rows[i].cells[5].innerHTML);
				    console.log(Tbody_Sucursal.rows[i].cells[5].innerHTML == 0);

				    if (Tbody_Sucursal.rows[i].cells[5].innerHTML == 0)
				    {
				    	Contador = 1;
				    }
				    else
				    {
				    	Contador = 0;
				    }
			    }

			    if ($('#check_Excluir_Kit').prop('checked'))
		    	{
				    Bandera = 1;
				}
				else
				{
					Bandera = 0;
				}

				if (Contador == 0)
				{

				    var formData = new FormData();
		            formData.append("Nombre", Nombre);
		            formData.append("Vigencia_Inicial", Inicial);
		            formData.append("Vigencia_Final", Final);
		            formData.append("Division", Division);
		            formData.append("Linea", Linea);
		            formData.append("Sublinea", Sublinea);
		            formData.append("Distribuidor", array_Clientes);
		            formData.append("Producto", array_Producto);
		            formData.append("Sucursal", array_Sucursal);
		            formData.append("Excluir", Bandera);
		            formData.append("Cantidad", array_Cantidad);
		            formData.append("Precio", array_Precio);
		            formData.append("Ahorro", array_Ahorro);

		            $.ajax({
		               url: dir + 'index.php/Controller_Promociones/Guardar_Promocion',
		               type: 'POST',
		               processData: false,  // tell jQuery not to process the data
		               contentType: false,
		               timeout: 35000,
		               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		               data: formData,
		               beforeSend : function ()
		                {
		                    $('#Cargando_Modal_Kits').css('display', '');
		                },
		                success: function(data)
		                {
		                    console.log(data);

		                    if (data == 'Correcto')
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
						            toastr.success('Promoción agregada con exito', 'Correcto');

						            $("#myModal").modal("hide");

						            Limpiar();
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
						            toastr.error('Ocurrio un error al crear la promoción', 'Error');
		                    }
		                }
		           })
		           .done(function() {
		               
		               $('#Cargando_Modal_Kits').css('display', 'none');
		           })
		           .fail(function() {
		               console.log("error");
		           })
		           .always(function() {
		           });
			    }
			    else
			    {
			    	toastr.warning('Para continuar es necesario recalcular el ahorro de las sucursales', 'Advertencia');
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
		            toastr.warning('Por lo menos debe de agregar a productos y sucursal', 'Advertencia');
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
	            toastr.warning('Algúnos campos obligatorios estan vacios', 'Advertencia');
    	}

    });


    $("#Agregar_List_Producto").click(function(event) {
    	
    	if (window.Global_Tabla_List_Producto != null)
    	{
    		let Distri       = document.getElementById("Table_Productos_Kit"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Producto         = document.getElementById("Table_Productos_Kit");
    		let Tbody_Producto         = Tabla_Producto.getElementsByTagName("tbody")[0];

    		let Tabla_Sucursal         = document.getElementById("Table_Sucursales_Kit");
    		let Tbody_Sucursal         = Tabla_Sucursal.getElementsByTagName("tbody")[0];

    		let Contador = 0;

    		if (Tbody_Sucursal.rows.length > 0)
    		{
    			for (var i = 0; i < Tbody_Sucursal.rows.length ; i++)
			    {		      
				    Tbody_Sucursal.rows[i].cells[5].innerHTML = 0;
			    }
    		}

			if (Tbody_Producto.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Producto.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Producto.childNodes[0].innerHTML == Tbody_Producto.rows[i].cells[0].innerHTML)
					    {
				            Contador ++;
						}
				    }

				    if (Contador > 0)
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
				            toastr.error('El producto ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);
				           let cel4 = row.insertCell(3);

				           cel1.innerHTML = window.Global_Tabla_List_Producto.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Producto.childNodes[2].innerHTML;

						   let input = document.createElement("input");
						    input.classList.add('form-control');
						    input.setAttribute('type', 'number');
						    input.setAttribute('min', '1');
						    input.setAttribute('value', '1');
						    input.addEventListener("change",window.Recalcular_Ahorro2);
						    input.addEventListener("keypress",window.Recalcular_Ahorro2);
						    input.addEventListener("keyup",window.Recalcular_Ahorro2);
							input.addEventListener("keydown",window.Recalcular_Ahorro2);
						    cel3.appendChild(input);

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Producto_Kit);
						    cel4.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('Producto agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);
		           let cel4 = row.insertCell(3);

		           cel1.innerHTML = window.Global_Tabla_List_Producto.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Producto.childNodes[2].innerHTML;

				   let input = document.createElement("input");
				    input.classList.add('form-control');
				    input.setAttribute('type', 'number');
				    input.setAttribute('min', '1');
				    input.setAttribute('value', '1');
				    input.addEventListener("change",window.Recalcular_Ahorro2);
				    input.addEventListener("keypress",window.Recalcular_Ahorro2);
				    input.addEventListener("keyup",window.Recalcular_Ahorro2);
					input.addEventListener("keydown",window.Recalcular_Ahorro2);
				    cel3.appendChild(input);

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Producto_Kit);
				    cel4.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('Producto agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione un producto', 'Advertencia');
    	}

    });

 $("#Agregar_List_Producto_Editar").click(function(event) {
    	
    	if (window.Global_Tabla_List_Producto_Editar != null)
    	{
    		let Distri       = document.getElementById("Table_Productos_Kit_Editar"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Producto         = document.getElementById("Table_Productos_Kit_Editar");
    		let Tbody_Producto         = Tabla_Producto.getElementsByTagName("tbody")[0];

    		let Tabla_Sucursal         = document.getElementById("Table_Sucursales_Kit_Editar");
    		let Tbody_Sucursal         = Tabla_Sucursal.getElementsByTagName("tbody")[0];

    		if (Tbody_Sucursal.rows.length > 0)
    		{
    			for (var i = 0; i < Tbody_Sucursal.rows.length ; i++)
			    {		      
				    Tbody_Sucursal.rows[i].cells[5].innerHTML = 0;
			    }
    		}

    		let Contador = 0;

			if (Tbody_Producto.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Producto.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Producto_Editar.childNodes[0].innerHTML == Tbody_Producto.rows[i].cells[0].innerHTML)
					    {
				            Contador ++;
						}
				    }

				    if (Contador > 0)
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
				            toastr.error('El producto ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);
				           let cel4 = row.insertCell(3);

				           cel1.innerHTML = window.Global_Tabla_List_Producto_Editar.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Producto_Editar.childNodes[2].innerHTML;

						   let input = document.createElement("input");
						    input.classList.add('form-control');
						    input.setAttribute('type', 'number');
						    input.setAttribute('min', '1');
						    input.setAttribute('value', '1');
						    input.addEventListener("change",window.Recalcular_Ahorro_Editar2);
						    input.addEventListener("keypress",window.Recalcular_Ahorro_Editar2);
						    input.addEventListener("keyup",window.Recalcular_Ahorro_Editar2);
							input.addEventListener("keydown",window.Recalcular_Ahorro_Editar2);
						    cel3.appendChild(input);

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Producto_Kit_Editar);
						    cel4.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('Producto agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);
		           let cel4 = row.insertCell(3);

		           cel1.innerHTML = window.Global_Tabla_List_Producto_Editar.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Producto_Editar.childNodes[2].innerHTML;

				   let input = document.createElement("input");
				    input.classList.add('form-control');
				    input.setAttribute('type', 'number');
				    input.setAttribute('min', '1');
				    input.setAttribute('value', '1');
				    cel3.appendChild(input);

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Producto_Kit_Editar);
				    cel4.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('Producto agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione un producto', 'Advertencia');
    	}

    });


    $("#Agregar_Productos_Kit_Editar").click(function(event) {
    	
    	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Productos',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Kits_Editar').css('display','');
                },
                success: function(data)
                {
                	console.log(data);

                    let parsed = JSON.parse(data);

                    $("#Mostrar_Productos_Kit_Editar").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Productos_Editar"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Productos_Editar').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);
			                 //let cel3 = row.insertCell(2);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Codigo'];
			                 cel3.innerHTML = parsed['Detalle'][i]['Producto'];
			                
			                }

			                Crear_data_Lista_Productos_Editar();
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
	                $('#Cargando_Modal_Kits_Editar').css('display','none');
	            });
    });

    $("#Agregar_Productos_Kit").click(function(event) {
    	
    	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Productos',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Kits').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Productos_Kit").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Productos"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Productos').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);
			                 //let cel3 = row.insertCell(2);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Codigo'];
			                 cel3.innerHTML = parsed['Detalle'][i]['Producto'];
			                
			                }

			                Crear_data_Lista_Productos();
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
	                $('#Cargando_Modal_Kits').css('display','none');
	            });
    });

    $("#Agregar_Distribuidor_Kit_Editar").click(function(event) {
    	
    	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Distribuidores',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Kits_Editar').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Distribuidores_Kit_Editar").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Distribuidor_Editar"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Distribuidor_Editar').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 //let cel3 = row.insertCell(2);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Nombre'] + parsed['Detalle'][i]['Apellidos'];
			                
			                }

			                Crear_data_Lista_Distribuidores_Editar();
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
	                $('#Cargando_Modal_Kits_Editar').css('display','none');
	            });
    });

    $("#Agregar_Distribuidor_Kit").click(function(event) {

    	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Distribuidores',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Kits').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Distribuidores_Kit").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Distribuidor"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Distribuidor').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 //let cel3 = row.insertCell(2);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Nombre'] + parsed['Detalle'][i]['Apellidos'];
			                
			                }

			                Crear_data_Lista_Distribuidores();
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
	                $('#Cargando_Modal_Kits').css('display','none');
	            });
    });

    $("#Agregar_List_Distribuidor_Editar").click(function(event) {
    	
    	if (window.Global_Tabla_List_Distribuidor_Editar != null)
    	{
    		let Distri       = document.getElementById("Table_Distribuidores_Kit_Editar"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Distri         = document.getElementById("Table_Distribuidores_Kit_Editar");
    		let Tbody_Distri         = Tabla_Distri.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Distri.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Distri.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Distribuidor_Editar.childNodes[0].innerHTML == Tbody_Distri.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('El distribuidor ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = window.Global_Tabla_List_Distribuidor_Editar.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Distribuidor_Editar.childNodes[1].innerHTML;

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Distribuidor_Kit_Editar);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('Distribuidor agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);

		           cel1.innerHTML = window.Global_Tabla_List_Distribuidor_Editar.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Distribuidor_Editar.childNodes[1].innerHTML;

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Distribuidor_Kit_Editar);
				    cel3.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('Distribuidor agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione a un distribuidor', 'Advertencia');
    	}
    });


    $("#Agregar_List_Distribuidor").click(function(event) {
    	
    	if (window.Global_Tabla_List_Distribuidor != null)
    	{
    		let Distri       = document.getElementById("Table_Distribuidores_Kit"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Distri         = document.getElementById("Table_Distribuidores_Kit");
    		let Tbody_Distri         = Tabla_Distri.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Distri.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Distri.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Distribuidor.childNodes[0].innerHTML == Tbody_Distri.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('El distribuidor ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = window.Global_Tabla_List_Distribuidor.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Distribuidor.childNodes[1].innerHTML;

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Distribuidor_Kit);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('Distribuidor agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);

		           cel1.innerHTML = window.Global_Tabla_List_Distribuidor.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Distribuidor.childNodes[1].innerHTML;

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Distribuidor_Kit);
				    cel3.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('Distribuidor agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione a un distribuidor', 'Advertencia');
    	}
    });


$("#Agregar_Sucursal_Kit_Editar").click(function(event) {
	
	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Sucursales',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Kits_Editar').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Sucursales_Kit_Editar").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Sucursales_Editar"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Sucursales_Editar').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 //let cel3 = row.insertCell(2);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Sucursal'];
			                
			                }

			                Crear_data_Lista_Sucursal_Editar();
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
	                $('#Cargando_Modal_Kits_Editar').css('display','none');
	            });
});


$("#Agregar_Sucursal_Kit").click(function(event) {
	
	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Sucursales',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Kits').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Sucursales_Kit").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Sucursales"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Sucursales').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 //let cel3 = row.insertCell(2);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Sucursal'];
			                
			                }

			                Crear_data_Lista_Sucursal();
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
	                $('#Cargando_Modal_Kits').css('display','none');
	            });
});

$("#Agregar_List_Sucursales_Editar").click(function(event) {
	
	if (window.Global_Tabla_List_Sucursal_Editar != null)
    	{
    		let Producto        = document.getElementById("Table_Sucursales_Kit_Editar"); 
			let tbody 		 	= Producto.tBodies[0];

			let Tabla_Producto         = document.getElementById("Table_Sucursales_Kit_Editar");
    		let Tbody_Producto         = Tabla_Producto.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Producto.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Producto.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Sucursal_Editar.childNodes[0].innerHTML == Tbody_Producto.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('La sucursal ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);
				           let cel4 = row.insertCell(3);
				           let cel5 = row.insertCell(4);
				           let cel6 = row.insertCell(5);

				           cel1.innerHTML = window.Global_Tabla_List_Sucursal_Editar.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Sucursal_Editar.childNodes[1].innerHTML;

						    let input = document.createElement("input");
						    input.classList.add('form-control');
						    input.setAttribute('type', 'number');
						    input.setAttribute('min', '1');
						    input.setAttribute('value', '1');
						    input.addEventListener("change",window.Recalcular_Ahorro_Editar);
						    input.addEventListener("keypress",window.keypress_funcion_Editar);
						    input.addEventListener("keyup",window.keypress_funcion_Editar);
						    input.addEventListener("keydown",window.keypress_funcion_Editar);
						    cel3.appendChild(input);

						    let input2 = document.createElement("input");
						    input2.classList.add('form-control');
						    input2.setAttribute('type', 'number');
						    input2.setAttribute('min', '1');
						    input2.setAttribute('value', '1');
						    input2.setAttribute('readonly', 'readonly');
						    cel4.appendChild(input2);

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Sucursales_Kit_Editar);
						    cel5.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

						    let boton2 = document.createElement("button");
						    boton2.classList.add('btn', 'btn-success', 'btn-xs','btn-flat');
						    boton2.addEventListener("click",window.Recalcular_Ahorro_Editar);
						    cel5.appendChild(boton2);

						    let icono2 = document.createElement("span");
						    icono2.classList.add('glyphicon', 'glyphicon-refresh');
						    boton2.appendChild(icono2);

						    cel6.innerHTML = 0;
						    cel6.setAttribute("hidden", true);

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
				            toastr.success('Producto agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);
		           let cel4 = row.insertCell(3);
		           let cel5 = row.insertCell(4);
		           let cel6 = row.insertCell(5);

		           cel1.innerHTML = window.Global_Tabla_List_Sucursal_Editar.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Sucursal_Editar.childNodes[1].innerHTML;

				    let input = document.createElement("input");
				    input.classList.add('form-control');
				    input.setAttribute('type', 'number');
				    input.setAttribute('min', '1');
				    input.setAttribute('value', '1');
				    input.addEventListener("change",window.Recalcular_Ahorro_Editar);
				    input.addEventListener("keypress",window.keypress_funcion_Editar);
				    input.addEventListener("keyup",window.keypress_funcion_Editar);
					input.addEventListener("keydown",window.keypress_funcion_Editar);
				    cel3.appendChild(input);

				    let input2 = document.createElement("input");
				    input2.classList.add('form-control');
				    input2.setAttribute('type', 'number');
				    input2.setAttribute('min', '1');
				    input2.setAttribute('value', '1');
				    input2.setAttribute('readonly', 'readonly');
				    cel4.appendChild(input2);

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Sucursales_Kit_Editar);
				    cel5.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

				    let boton2 = document.createElement("button");
				    boton2.classList.add('btn', 'btn-success', 'btn-xs','btn-flat');
				    boton2.addEventListener("click",window.Recalcular_Ahorro_Editar);
				    cel5.appendChild(boton2);

				    let icono2 = document.createElement("span");
				    icono2.classList.add('glyphicon', 'glyphicon-refresh');
				    boton2.appendChild(icono2);

				    cel6.innerHTML = 0;
					cel6.setAttribute("hidden", true);

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
		            toastr.success('Producto agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione un producto', 'Advertencia');
    	}
});



$("#Agregar_List_Sucursales").click(function(event) {

	if (window.Global_Tabla_List_Sucursal != null)
    	{
    		let Producto        = document.getElementById("Table_Sucursales_Kit"); 
			let tbody 		 	= Producto.tBodies[0];

			let Tabla_Producto         = document.getElementById("Table_Sucursales_Kit");
    		let Tbody_Producto         = Tabla_Producto.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Producto.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Producto.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Sucursal.childNodes[0].innerHTML == Tbody_Producto.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('La sucursal ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);
				           let cel4 = row.insertCell(3);
				           let cel5 = row.insertCell(4);
				           let cel6 = row.insertCell(5);

				           cel1.innerHTML = window.Global_Tabla_List_Sucursal.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Sucursal.childNodes[1].innerHTML;

						    let input = document.createElement("input");
						    input.classList.add('form-control');
						    input.setAttribute('type', 'number');
						    input.setAttribute('min', '1');
						    input.setAttribute('value', '1');
						    input.addEventListener("change",window.Recalcular_Ahorro);
						    input.addEventListener("keypress",window.keypress_funcion);
						    input.addEventListener("keyup",window.keypress_funcion);
						    input.addEventListener("keydown",window.keypress_funcion);
						    cel3.appendChild(input);

						    let input2 = document.createElement("input");
						    input2.classList.add('form-control');
						    input2.setAttribute('type', 'number');
						    input2.setAttribute('min', '1');
						    input2.setAttribute('value', '1');
						    input2.setAttribute('readonly','readonly');
						    cel4.appendChild(input2);

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Sucursales_Kit);
						    cel5.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

						    let boton2 = document.createElement("button");
						    boton2.classList.add('btn', 'btn-success', 'btn-xs','btn-flat');
						    boton2.addEventListener("click",window.Recalcular_Ahorro);
						    cel5.appendChild(boton2);

						    let icono2 = document.createElement("span");
						    icono2.classList.add('glyphicon', 'glyphicon-refresh');
						    boton2.appendChild(icono2);

						    cel6.innerHTML = 0;
						    cel6.setAttribute("hidden", true);

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
				            toastr.success('Producto agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);
		           let cel4 = row.insertCell(3);
		           let cel5 = row.insertCell(4);
		           let cel6 = row.insertCell(5);

		           cel1.innerHTML = window.Global_Tabla_List_Sucursal.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Sucursal.childNodes[1].innerHTML;

				    let input = document.createElement("input");
				    input.classList.add('form-control');
				    input.setAttribute('type', 'number');
				    input.setAttribute('min', '1');
				    input.setAttribute('value', '1');
				    input.addEventListener("change",window.Recalcular_Ahorro);
				    input.addEventListener("keypress",window.keypress_funcion);
				    input.addEventListener("keyup",window.keypress_funcion);
					input.addEventListener("keydown",window.keypress_funcion);
				    cel3.appendChild(input);

				    let input2 = document.createElement("input");
				    input2.classList.add('form-control');
				    input2.setAttribute('type', 'number');
				    input2.setAttribute('min', '1');
				    input2.setAttribute('value', '1');
				    input2.setAttribute('readonly', 'readonly');
				    cel4.appendChild(input2);

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Sucursales_Kit);
				    cel5.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

				    let boton2 = document.createElement("button");
				    boton2.classList.add('btn', 'btn-success', 'btn-xs','btn-flat');
				    boton2.addEventListener("click",window.Recalcular_Ahorro);
				    cel5.appendChild(boton2);

				    let icono2 = document.createElement("span");
				    icono2.classList.add('glyphicon', 'glyphicon-refresh');
				    boton2.appendChild(icono2);

				    cel6.innerHTML = 0;
				    cel6.setAttribute("hidden", true);

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
		            toastr.success('Producto agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione un producto', 'Advertencia');
    	}
});

    ////////////////////////////////////// Funciones Promociones KIT ////////////////////////////////////////

    var Table_List_Distribuidor = document.getElementById("Table_Lista_Distribuidor");
    Table_List_Distribuidor.onclick = function(e)
    {
        window.Global_Tabla_List_Distribuidor = e.target.parentNode;
    }

    var Table_List_Distribuidor_Editar = document.getElementById("Table_Lista_Distribuidor_Editar");
    Table_List_Distribuidor_Editar.onclick = function(e)
    {
        window.Global_Tabla_List_Distribuidor_Editar = e.target.parentNode;
    }

    var Table_List_Producto = document.getElementById("Table_Lista_Productos");
    Table_List_Producto.onclick = function(e)
    {
        window.Global_Tabla_List_Producto = e.target.parentNode;
    }

    var Table_List_Producto_Editar = document.getElementById("Table_Lista_Productos_Editar");
    Table_List_Producto_Editar.onclick = function(e)
    {
        window.Global_Tabla_List_Producto_Editar = e.target.parentNode;
    }

    var Table_List_Sucursal = document.getElementById("Table_Lista_Sucursales");
    Table_List_Sucursal.onclick = function(e)
    {
        window.Global_Tabla_List_Sucursal = e.target.parentNode;
    }

    var Table_List_Sucursal_Editar = document.getElementById("Table_Lista_Sucursales_Editar");
    Table_List_Sucursal_Editar.onclick = function(e)
    {
        window.Global_Tabla_List_Sucursal_Editar = e.target.parentNode;
    }

    var Table_Promociones = document.getElementById("Table_Promociones");
    Table_Promociones.onclick = function(e)
    {
        window.Global_Tabla_Promociones = e.target.parentNode;

        var formData = new FormData();
            formData.append("ID", window.Global_Tabla_Promociones.childNodes[0].innerHTML);

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Productos_Promociones',
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

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Promociones_Producto"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Promociones_Producto').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);
			                 let cel4 = row.insertCell(3);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Codigo'];
			                 cel3.innerHTML = parsed['Detalle'][i]['Producto'];
			                 cel4.innerHTML = parsed['Detalle'][i]['Cantidad'];
			                
			                }

			                Crear_data_Productos_Promocion();
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


    var Table_Oferta = document.getElementById("Table_Ofertas");
    Table_Oferta.onclick = function(e)
    {
        window.Global_Tabla_Ofertas = e.target.parentNode;

        var formData = new FormData();
            formData.append("ID", window.Global_Tabla_Ofertas.childNodes[0].innerHTML);

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Productos_Ofertas',
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

		            if (parsed != null && parsed != "")
		            {
                		let Oferta_Detalle   		= document.getElementById("Table_Oferta_Producto"); 
                		let tbody_Oferta_Detalle    = Oferta_Detalle.tBodies[0];

                		let Regalo_Detalle   		= document.getElementById("Table_Regalo"); 
                		let tbody_Regalo_Detalle    = Regalo_Detalle.tBodies[0];

                		$('#Table_Oferta_Producto').DataTable().destroy();
                		Oferta_Detalle.tBodies[0].innerHTML = "";

                		$('#Table_Regalo').DataTable().destroy();
                		Regalo_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Oferta'].length; i++) 
			                {

			                 let row  = tbody_Oferta_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);

			                 cel1.innerHTML = parsed['Oferta'][i]['ID'];
			                 cel2.innerHTML = parsed['Oferta'][i]['Codigo'];
			                 cel3.innerHTML = parsed['Oferta'][i]['Producto'];
			                
			                }

			                for (var i = 0; i < parsed['Regalo'].length; i++) 
			                {

			                 let row  = tbody_Regalo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);

			                 cel1.innerHTML = parsed['Regalo'][i]['ID'];
			                 cel2.innerHTML = parsed['Regalo'][i]['Codigo'];
			                 cel3.innerHTML = parsed['Regalo'][i]['Producto'];
			                
			                }

			                Crear_data_Productos_Oferta();
			                Crear_data_Productos_Regalo();
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

function Eliminar_Promocion()
{
	if (window.Global_Tabla_Promociones != null)
	{
		if (window.Global_Tabla_Promociones.childNodes[4].childNodes[0].innerHTML == 'Activo')
		{
			swal({
				  title: "¿Esta segúro que desea eliminar la promoción?",
				  text: "Una vez eliminado pasara con a estatus inactivo",
				  icon: "warning",
				  buttons: true,
				  dangerMode: true,
				})
				.then((willDelete) => {
				  if (willDelete) {

				  	var formData = new FormData();
			            formData.append("ID", window.Global_Tabla_Promociones.childNodes[0].innerHTML);

			            $.ajax({
			                url: dir + 'index.php/Controller_Promociones/Eliminar_Promocion',
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
			                    if (data == 'Correcto')
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
							            toastr.success('Promoción eliminada con exito', 'Correcto');

							            Limpiar();       
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
							            toastr.error('Ocurrio un error al crear la promoción', 'Error');
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
	              "timeOut": "800",
	              "extendedTimeOut": "1000",
	              "showEasing": "swing",
	              "hideEasing": "linear",
	              "showMethod": "fadeIn",
	              "hideMethod": "fadeOut"
	            }
	            // Display an error toast, with a title
	            toastr.warning('La promoción se encuentra como inactiva', 'Advertencia');
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
	            toastr.warning('Seleccione una promoción', 'Advertencia');
	}
}



























































































function Editar_Promocion()
{
	if (window.Global_Tabla_Promociones != null)
	{
		var formData = new FormData();
            formData.append("ID", window.Global_Tabla_Promociones.childNodes[0].innerHTML);

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Productos_by_id',
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

		            if (parsed != null && parsed != "")
		            {
		            	let Producto        	= document.getElementById("Table_Productos_Kit_Editar"); 
						let tbody_Producto  	= Producto.tBodies[0];

						let Distribuidor        = document.getElementById("Table_Distribuidores_Kit_Editar"); 
						let tbody_Distribuidor  = Distribuidor.tBodies[0];

						let Sucursales        	= document.getElementById("Table_Sucursales_Kit_Editar"); 
						let tbody_Sucursales  	= Sucursales.tBodies[0];

						let Distribuidor_Detalle_Editar   		= document.getElementById("Table_Distribuidores_Kit_Editar"); 
						$('#Table_Distribuidores_Kit_Editar').DataTable().destroy();
					    Distribuidor_Detalle_Editar.tBodies[0].innerHTML = "";

					    let Producto_Detalle_Editar   		= document.getElementById("Table_Productos_Kit_Editar"); 
						$('#Table_Productos_Kit_Editar').DataTable().destroy();
					    Producto_Detalle_Editar.tBodies[0].innerHTML = "";

					    let Sucursal_Detalle_Editar   		= document.getElementById("Table_Sucursales_Kit_Editar"); 
						$('#Table_Sucursales_Kit_Editar').DataTable().destroy();
					    Sucursal_Detalle_Editar.tBodies[0].innerHTML = "";

                		$("#txtNombre_Kit_Editar").val(parsed['Detalle'][0]['Promocion']);
                		$("#Vigencia_Inicial_Kit_Editar").val(parsed['Detalle'][0]['Vigencia_inicial']);
                		$("#Vigencia_Final_Kit_Editar").val(parsed['Detalle'][0]['Vigencia_final']);
                		$("#select_Division_Kit_Editar").val(parsed['Detalle'][0]['idDivision']);
                		$("#select_Linea_Kit_Editar").val(parsed['Detalle'][0]['idLinea']);
                		$("#select_Sublinea_Kit_Editar").val(parsed['Detalle'][0]['idSublinea']);

                		if (parsed['Detalle'][0]['Status'] == 'Inactivo')
                		{
                			$("#check_Status_Kit_Editar").prop('checked', true);
                		}
                		else
                		{
                			$("#check_Status_Kit_Editar").prop('checked', false);
                		}

                		console.log("Mensaje: " + parsed['Detalle'][0]['Excluir_Distribuidores']);

                		if (parsed['Detalle'][0]['Excluir_Distribuidores'] == 1)
                		{
                			$("#check_Excluir_Kit_Editar").prop('checked', true);
                			$("#Div_Table_Distribuidor_Kit_Editar").css('display', '');
                		}
                		else
                		{
                			$("#check_Excluir_Kit_Editar").prop('checked', false);
                			$("#Div_Table_Distribuidor_Kit_Editar").css('display','none');
                		}

                		for (var i = 0; i < parsed['Producto'].length; i++)
					    {
					       let row  = tbody_Producto.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);
				           let cel4 = row.insertCell(3);

				           cel1.innerHTML = parsed['Producto'][i]['ID_Catalogo'];
						   cel2.innerHTML = parsed['Producto'][i]['Producto'];

						    let input2 = document.createElement("input");
						    input2.classList.add('form-control');
						    input2.setAttribute('type', 'number');
						    input2.setAttribute('min', '1');
						    input2.setAttribute('value', parsed['Producto'][i]['Cantidad']);
						    input2.addEventListener("change",window.Recalcular_Ahorro_Editar2);
						    input2.addEventListener("keypress",window.Recalcular_Ahorro_Editar2);
						    input2.addEventListener("keyup",window.Recalcular_Ahorro_Editar2);
							input2.addEventListener("keydown",window.Recalcular_Ahorro_Editar2);
						    cel3.appendChild(input2);

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Producto_Kit_Editar);
						    cel4.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);
						}

						for (var i = 0; i < parsed['Sucursal'].length; i++)
					    {
					       let row  = tbody_Sucursales.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);
				           let cel4 = row.insertCell(3);
				           let cel5 = row.insertCell(4);
				           let cel6 = row.insertCell(5);

				           cel1.innerHTML = parsed['Sucursal'][i]['ID_Sucursal'];
						   cel2.innerHTML = parsed['Sucursal'][i]['Sucursal'];

						    let input = document.createElement("input");
						    input.classList.add('form-control');
						    input.setAttribute('type', 'number');
						    input.setAttribute('min', '1');
						    input.setAttribute('value', parsed['Sucursal'][i]['precio']);
						    input.addEventListener("change",window.Recalcular_Ahorro_Editar);
						    input.addEventListener("keypress",window.keypress_funcion_Editar);
						    input.addEventListener("keyup",window.keypress_funcion_Editar);
						    input.addEventListener("keydown",window.keypress_funcion_Editar);
						    cel3.appendChild(input);

						    let input2 = document.createElement("input");
						    input2.classList.add('form-control');
						    input2.setAttribute('type', 'number');
						    input2.setAttribute('min', '1');
						    input2.setAttribute('value', parsed['Sucursal'][i]['ahorro']);
						    input2.setAttribute('readonly', 'readonly');
						    cel4.appendChild(input2);

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Sucursal_Kit_Editar);
						    cel5.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

						    let boton2 = document.createElement("button");
						    boton2.classList.add('btn', 'btn-success', 'btn-xs','btn-flat');
						    boton2.addEventListener("click",window.Recalcular_Ahorro_Editar);
						    cel5.appendChild(boton2);

						    let icono2 = document.createElement("span");
						    icono2.classList.add('glyphicon', 'glyphicon-refresh');
						    boton2.appendChild(icono2);

						    cel6.innerHTML = 1;
							cel6.setAttribute("hidden", true);
						}

						if (parsed['Sucursal'].length > 0)
						{
							//$("#Div_Table_Distribuidor_Kit_Editar").css('display','');
							//$("#check_Excluir_Kit_Editar").prop('checked', true);

							for (var i = 0; i < parsed['Cliente'].length; i++)
						    {
						       let row  = tbody_Distribuidor.insertRow(i);
					           let cel1 = row.insertCell(0);
					           let cel2 = row.insertCell(1);
					           let cel3 = row.insertCell(2);

					           cel1.innerHTML = parsed['Cliente'][i]['ID_Cliente'];
							   cel2.innerHTML = parsed['Cliente'][i]['Cliente'];

							   	let boton1 = document.createElement("button");
							    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
							    boton1.setAttribute('name', 'name_Productos');
							    boton1.addEventListener("click",window.Eliminar_Distribuidor_Kit_Editar);
							    cel3.appendChild(boton1);

							    let icono1 = document.createElement("span");
							    icono1.classList.add('glyphicon', 'glyphicon-trash');
							    boton1.appendChild(icono1);
							}
						}

                		$("#myModal_Editar").modal("show");
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
	            toastr.warning('Seleccione una promoción', 'Advertencia');
	}
}


function fetch_data_Promociones() {

	var dataTable = $('#Table_Promociones').DataTable({
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
                        if (full[4] == 'Activo')
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

        url: dir + "Clases/fetch_Promociones.php",
        type: "POST"
    }
  });
}

function fetch_data_Ofertas() {

	var dataTable = $('#Table_Ofertas').DataTable({
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
                    "targets": 6,
                    'render': function (data, type, full, meta)
                    {
                        if (full[6] == 'Activo')
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

        url: dir + "Clases/fetch_Ofertas.php",
        type: "POST"
    }
  });
}

function Crear_data_Productos_Promocion() {
	
	$('#Table_Promociones_Producto').dataTable({
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

function Crear_data_Productos_Oferta() {
	
	$('#Table_Oferta_Producto').dataTable({
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

function Crear_data_Productos_Regalo() {
	
	$('#Table_Regalo').dataTable({
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

function Crear_data_Lista_Distribuidores() {
	
	$('#Table_Lista_Distribuidor').dataTable({
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

function Crear_data_Lista_Productos() {

	$('#Table_Lista_Productos').dataTable({
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

function Crear_data_Lista_Productos_Editar() {
	
	$('#Table_Lista_Productos_Editar').dataTable({
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

function Crear_data_Lista_Sucursal() {

	$('#Table_Lista_Sucursales').dataTable({
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

function Crear_data_Lista_Sucursal_Editar() {

	$('#Table_Lista_Sucursales_Editar').dataTable({
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

function Crear_data_Lista_Distribuidores_Editar() {
	
	$('#Table_Lista_Distribuidor_Editar').dataTable({
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


function Limpiar() {

	let Distribuidor_Detalle   		= document.getElementById("Table_Distribuidores_Kit"); 
	$('#Table_Distribuidores_Kit').DataTable().destroy();
    Distribuidor_Detalle.tBodies[0].innerHTML = "";

    let Producto_Detalle   		= document.getElementById("Table_Productos_Kit"); 
	$('#Table_Productos_Kit').DataTable().destroy();
    Producto_Detalle.tBodies[0].innerHTML = "";

    let Sucursal_Detalle   		= document.getElementById("Table_Sucursales_Kit"); 
	$('#Table_Sucursales_Kit').DataTable().destroy();
    Sucursal_Detalle.tBodies[0].innerHTML = "";

    /////////////////////////////////////////////////////////////////////////////

    let Distribuidor_Detalle_Editar   		= document.getElementById("Table_Distribuidores_Kit_Editar"); 
	$('#Table_Distribuidores_Kit_Editar').DataTable().destroy();
    Distribuidor_Detalle_Editar.tBodies[0].innerHTML = "";

    let Producto_Detalle_Editar   		= document.getElementById("Table_Productos_Kit_Editar"); 
	$('#Table_Productos_Kit_Editar').DataTable().destroy();
    Producto_Detalle_Editar.tBodies[0].innerHTML = "";

    let Sucursal_Detalle_Editar   		= document.getElementById("Table_Sucursales_Kit_Editar"); 
	$('#Table_Sucursales_Kit_Editar').DataTable().destroy();
    Sucursal_Detalle_Editar.tBodies[0].innerHTML = "";


    let Promociones   		= document.getElementById("Table_Promociones"); 
	$('#Table_Promociones').DataTable().destroy();
    Promociones.tBodies[0].innerHTML = "";

    let Promociones_Detalle   		= document.getElementById("Table_Promociones_Producto"); 
	$('#Table_Promociones_Producto').DataTable().destroy();
    Promociones_Detalle.tBodies[0].innerHTML = "";

  
	$("#txtNombre_Kit_Editar").val("");
    $("#Vigencia_Inicial_Kit_Editar").val("");
    $("#Vigencia_Final_Kit_Editar").val("");
    $("#select_Division_Kit_Editar").val("");
    $("#select_Linea_Kit_Editar").val("");
    $("#select_Sublinea_Kit_Editar").val("");

	$("#txtNombre_Kit").val("");
   	$("#Vigencia_Inicial_Kit").val("");
   	$("#Vigencia_Final_Kit").val("");
   	$("#select_Division_Kit").val("");
   	$("#select_Linea_Kit").val("");
   	$("#select_Sublinea_Kit").val("");

   	window.Global_Tabla_Promociones 				= null;
	window.Global_Tabla_Ofertas 					= null;
	window.Global_Tabla_List_Distribuidor 			= null;
	window.Global_Tabla_List_Producto 				= null;
	window.Global_Tabla_List_Sucursal 				= null;
	window.Global_Tabla_List_Distribuidor_Editar 	= null;
	window.Global_Tabla_List_Producto_Editar 		= null;
	window.Global_Tabla_List_Sucursal_Editar 		= null;

   	fetch_data_Promociones();
}







































































































$(document).ready(function(){

	 $("#Option_Agregar_Ofertas").click(function(event) {
    	/* Act on the event */
    	$("#myModal_Oferta_Editar").modal("show");
    });

    $("#Agregar_Ofertas").click(function(event) {
    	/* Act on the event */
    	$("#myModal_Oferta_Editar").modal("show");
    });


	$("#Agregar_Oferta").click(function(event) {
		/* Act on the event */

		let Nombre  = $("#txt_Nombre_Oferta").val();
		let Inicial = $("#Vigencia_Inicial_Oferta").val();
		let Final   = $("#Vigencia_Final_Oferta").val();
		let Compra  = $("#txtCompra_Requerida").val();
		let Tipo 	= window.Tipo_Oferta;
		let Excluir = 0;

		if ($('#check_Excluir_Oferta').prop('checked'))
    	{
		    Excluir = 1;	
		}
		else
		{
			Excluir = 0;
		}

		array_Producto = new Array();
	    array_Clientes = new Array();
	    array_Regalos  = new Array();
	    array_Division = new Array();
	    array_Linea    = new Array();
	    array_Sublinea = new Array();
	    array_Sucursal = new Array();

	    let Tabla_Producto         = document.getElementById("Table_Producto_Oferta");
    	let Tbody_Producto         = Tabla_Producto.getElementsByTagName("tbody")[0];

    	let Tabla_Clientes         = document.getElementById("Table_Distribuidores_Oferta");
    	let Tbody_Clientes         = Tabla_Clientes.getElementsByTagName("tbody")[0];

    	let Tabla_Regalos          = document.getElementById("Table_Regalos");
    	let Tbody_Regalos          = Tabla_Regalos.getElementsByTagName("tbody")[0];

    	let Tabla_Division         = document.getElementById("Table_Divisiones");
    	let Tbody_Division         = Tabla_Division.getElementsByTagName("tbody")[0];

    	let Tabla_Linea            = document.getElementById("Table_Linea");
    	let Tbody_Linea            = Tabla_Linea.getElementsByTagName("tbody")[0];

    	let Tabla_Sublinea         = document.getElementById("Table_Sublinea");
    	let Tbody_Sublinea         = Tabla_Sublinea.getElementsByTagName("tbody")[0];

    	let Tabla_Sucursal         = document.getElementById("Table_Sucursales_Oferta");
    	let Tbody_Sucursal         = Tabla_Sucursal.getElementsByTagName("tbody")[0];

		if (Nombre != null && Nombre != "" && Inicial != null && Inicial != "" && Final != null && Final != "" && Compra != null && Compra != "")
		{
			if (Tbody_Sucursal.rows.length > 0)
			{
				if (Tbody_Producto.rows.length > 0)
				{
					for (var i = 0; i < Tbody_Producto.rows.length ; i++)
				    {		      
					    array_Producto.push(Tbody_Producto.rows[i].cells[0].innerHTML);
				    }
				}
				
				if (Tbody_Clientes.rows.length > 0)
				{
				    for (var i = 0; i < Tbody_Clientes.rows.length ; i++)
				    {		      
					    array_Clientes.push(Tbody_Clientes.rows[i].cells[0].innerHTML);
				    }
				}

				if (Tbody_Division.rows.length > 0)
				{
				    for (var i = 0; i < Tbody_Division.rows.length ; i++)
				    {		      
					    array_Division.push(Tbody_Division.rows[i].cells[0].innerHTML);
				    }
				}

				if (Tbody_Linea.rows.length > 0)
				{
				    for (var i = 0; i < Tbody_Linea.rows.length ; i++)
				    {		      
					    array_Linea.push(Tbody_Linea.rows[i].cells[0].innerHTML);
				    }
				}

				if (Tbody_Sublinea.rows.length > 0)
				{
				    for (var i = 0; i < Tbody_Sublinea.rows.length ; i++)
				    {		      
					    array_Sublinea.push(Tbody_Sublinea.rows[i].cells[0].innerHTML);
				    }
				}

				if (Tbody_Sucursal.rows.length > 0)
				{
				    for (var i = 0; i < Tbody_Sucursal.rows.length ; i++)
				    {		      
					    array_Sucursal.push(Tbody_Sucursal.rows[i].cells[0].innerHTML);
				    }
				}


					if (Tipo == 'Descuento')
					{
						let Descuento = $("#txtDescuento").val();

						if (Descuento != null && Descuento != "")
						{
							var formData = new FormData();
				            formData.append("Nombre", Nombre);
				            formData.append("Tipo_Desc", 1);
				            formData.append("Tipo_Regalo", 0);
				            formData.append("Desc", Descuento);
				            formData.append("Vigencia_inicial", Inicial);
				            formData.append("Vigencia_final", Final);
				            formData.append("Compra_req", Compra);
				            formData.append("Excluir", Excluir);
				            formData.append("Status", "Activo");
				            formData.append("Tipo", Tipo);

				            formData.append("Distribuidor", array_Clientes);
				            formData.append("Producto", array_Producto);
				            formData.append("Sucursal", array_Sucursal);
				            formData.append("Division", array_Division);
				            formData.append("Linea", array_Linea);
				            formData.append("Sublinea", array_Sublinea);

				            $.ajax({
				                url: dir + 'index.php/Controller_Promociones/Agregar_Oferta',
				                type: 'POST',
				                processData: false,  // tell jQuery not to process the data
				                contentType: false,
				                timeout: 35000,
				                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
				                data: formData,
				                beforeSend : function ()
				                {
				                    $('#Cargando_Modal_Oferta').css('display','');
				                },
				                success: function(data)
				                {
				                    console.log(data);

				                    if (data == "Correcto")
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
								            toastr.success('Oferta agregada con exito', 'Correcto');

								            Limpiar2();
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
								            toastr.error('Ocurrio un error al agregar la oferta', 'Error');
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
					                $('#Cargando_Modal_Oferta').css('display','none');
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
					            toastr.warning('Debe de capturar el descuento de la oferta', 'Advertencia');
						}
					}
					else
					{
						if (Tbody_Regalos.rows.length > 0)
						{
							for (var i = 0; i < Tbody_Regalos.rows.length ; i++)
						    {		      
							    array_Regalos.push(Tbody_Regalos.rows[i].cells[0].innerHTML);
						    }

							    var formData = new FormData();
					            formData.append("Nombre", Nombre);
					            formData.append("Tipo_Desc", 0);
					            formData.append("Tipo_Regalo", 1);
					            formData.append("Desc", 0);
					            formData.append("Vigencia_inicial", Inicial);
					            formData.append("Vigencia_final", Final);
					            formData.append("Compra_req", Compra);
					            formData.append("Excluir", Excluir);
					            formData.append("Status", "Activo");
					            formData.append("Tipo", Tipo);

					            formData.append("Distribuidor", array_Clientes);
					            formData.append("Producto", array_Producto);
					            formData.append("Sucursal", array_Sucursal);
					            formData.append("Division", array_Division);
					            formData.append("Linea", array_Linea);
					            formData.append("Sublinea", array_Sublinea);
					            formData.append("Regalo", array_Regalos);

					            $.ajax({
				                url: dir + 'index.php/Controller_Promociones/Agregar_Oferta',
				                type: 'POST',
				                processData: false,  // tell jQuery not to process the data
				                contentType: false,
				                timeout: 35000,
				                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
				                data: formData,
				                beforeSend : function ()
				                {
				                    $('#Cargando_Modal_Oferta').css('display','');
				                },
				                success: function(data)
				                {
				                    console.log(data);

				                    if (data == "Correcto")
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
								            toastr.success('Oferta agregada con exito', 'Correcto');

								            Limpiar2();
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
								            toastr.error('Ocurrio un error al agregar la oferta', 'Error');
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
					                $('#Cargando_Modal_Oferta').css('display','none');
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
					            toastr.warning('Debe de agregar por lo menos un regalo', 'Advertencia');
						}
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
	            toastr.warning('Debe de seleccionar por lo menos una sucursal', 'Advertencia');
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
	            toastr.warning('Algúnos campos obligatorios estan vacios', 'Advertencia');
		}
	});

$("#check_Excluir_Oferta").click(function(event) {
    	
    	if ($('#check_Excluir_Oferta').prop('checked'))
    	{
		    $("#Div_Table_Distribuidor_Oferta").css('display','');
		}
		else
		{
			let Tabla_Clientes         = document.getElementById("Table_Distribuidores_Oferta");
    		let Tbody_Clientes         = Tabla_Clientes.getElementsByTagName("tbody")[0];

    		 if (Tbody_Clientes.rows.length > 0)
    		 {
    		 	swal({
					  title: "¿Esta segúro?",
					  text: "Se encuentran distribuidores agregados a la oferta si continúa todos los distribuidores agregados previamente seran eliminas de la tabla \n \n \n ¿Desea Continuar con el proceso?",
					  icon: "warning",
					  buttons: true,
					  dangerMode: true,
					})
					.then((willDelete) => {
					  if (willDelete) {

					    Tbody_Clientes.innerHTML = "";
					    $("#Div_Table_Distribuidor_Oferta").css('display','none');

					  } 
					  else 
					  {
					  	$("#check_Excluir_Oferta").prop('checked', true);
					    $("#Div_Table_Distribuidor_Oferta").css('display','');
					  }
					});
    		 }
    		 else
    		 {
    		 	$("#Div_Table_Distribuidor_Oferta").css('display','none');
    		 }
			
		}

    });

$("#radio_Descuento").click(function(event) {
    	
    	if ($('#radio_Descuento').prop('checked'))
    	{
		    let Tabla_Clientes         = document.getElementById("Table_Regalos");
    		let Tbody_Clientes         = Tabla_Clientes.getElementsByTagName("tbody")[0];

    		 if (Tbody_Clientes.rows.length > 0)
    		 {
    		 	swal({
					  title: "¿Esta segúro?",
					  text: "Se encuentran regalos agregados a la oferta si continúa todos los regalos agregados previamente seran eliminas de la tabla \n \n \n ¿Desea Continuar con el proceso?",
					  icon: "warning",
					  buttons: true,
					  dangerMode: true,
					})
					.then((willDelete) => {
					  if (willDelete) {

					    Tbody_Clientes.innerHTML = "";
					    $("#Div_Regalo").css('display','none');
		    			$("#Div_Descuento").css('display','');

		    			window.Tipo_Oferta = "Descuento";

					  } 
					  else 
					  {
					  	$("#radio_Regalo").prop('checked', true);
					    $("#Div_Regalo").css('display','');
					    $("#Div_Descuento").css('display','none');

					    window.Tipo_Oferta = "Regalo";
					  }
					});
    		 }
    		 else
    		 {
    		 	$("#Div_Regalo").css('display','none');
		    	$("#Div_Descuento").css('display','');

		    	window.Tipo_Oferta = "Descuento";
    		 }
		}

    });


$("#radio_Regalo").click(function(event) {
    	
    	if ($('#radio_Regalo').prop('checked'))
    	{
    		$("#txtDescuento").val(0);
		    $("#Div_Regalo").css('display','');
		    $("#Div_Descuento").css('display','none');

		    window.Tipo_Oferta = "Regalo";
		}

    });

$("#Agregar_Linea").click(function(event) {
	
	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Linea',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Linea").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Linea"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Linea').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Linea'];
			                
			                }

			                Crear_data_Lista_Linea();
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
	                $('#Cargando_Modal_Oferta').css('display','none');
	            });
});

$("#Agregar_Sublinea").click(function(event) {
	
	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Sublinea',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Sublinea").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Sublinea"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Sublinea').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Sublinea'];
			                
			                }

			                Crear_data_Lista_Sublinea();
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
	                $('#Cargando_Modal_Oferta').css('display','none');
	            });
});

$("#Agregar_Division").click(function(event) {
	
	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Division',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Divisiones").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Division"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Division').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Division'];
			                
			                }

			                Crear_data_Lista_Division();
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
	                $('#Cargando_Modal_Oferta').css('display','none');
	            });
});

$("#Agregar_Producto_Oferta").click(function(event) {
	
	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Productos',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Producto_Oferta").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_List_Producto_Oferta"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_List_Producto_Oferta').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Codigo'];
			                 cel3.innerHTML = parsed['Detalle'][i]['Producto'];
			                
			                }

			                Crear_data_Lista_Producto();
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
	                $('#Cargando_Modal_Oferta').css('display','none');
	            });
});


$("#Agregar_Sucursal_Oferta").click(function(event) {
	
	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Sucursales',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Sucursal_Oferta").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_List_Sucursal_Oferta"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_List_Sucursal_Oferta').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Sucursal'];
			                
			                }

			                Crear_data_Lista_Sucursal_Oferta();
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
	                $('#Cargando_Modal_Oferta').css('display','none');
	            });
});

$("#Agregar_List_Sucursal_Oferta").click(function(event) {
	
	if (window.Global_Tabla_List_Sucursal_Oferta != null)
    	{
    		let Distri       = document.getElementById("Table_Sucursales_Oferta"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Distri         = document.getElementById("Table_Sucursales_Oferta");
    		let Tbody_Distri         = Tabla_Distri.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Distri.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Distri.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Sucursal_Oferta.childNodes[0].innerHTML == Tbody_Distri.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('El sucusal ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = window.Global_Tabla_List_Sucursal_Oferta.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Sucursal_Oferta.childNodes[1].innerHTML;

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Sucursal_Oferta);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('Sucursal agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);

		           cel1.innerHTML = window.Global_Tabla_List_Sucursal_Oferta.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Sucursal_Oferta.childNodes[1].innerHTML;

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Sucursal_Oferta);
				    cel3.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('Sucursal agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione una sucursal', 'Advertencia');
    	}
});


$("#Agregar_List_Producto_Oferta").click(function(event) {
	
	if (window.Global_Tabla_List_Producto_Oferta != null)
    	{
    		let Distri       = document.getElementById("Table_Producto_Oferta"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Distri         = document.getElementById("Table_Producto_Oferta");
    		let Tbody_Distri         = Tabla_Distri.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Distri.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Distri.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Producto_Oferta.childNodes[0].innerHTML == Tbody_Distri.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('El producto ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = window.Global_Tabla_List_Producto_Oferta.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Producto_Oferta.childNodes[1].innerHTML;

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Producto_Oferta);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('Producto agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);

		           cel1.innerHTML = window.Global_Tabla_List_Producto_Oferta.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Producto_Oferta.childNodes[1].innerHTML;

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Producto_Oferta);
				    cel3.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('Producto agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione una producto', 'Advertencia');
    	}
});

$("#Agregar_List_Division").click(function(event) {
	
	if (window.Global_Tabla_List_Division != null)
    	{
    		let Distri       = document.getElementById("Table_Divisiones"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Distri         = document.getElementById("Table_Divisiones");
    		let Tbody_Distri         = Tabla_Distri.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Distri.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Distri.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Division.childNodes[0].innerHTML == Tbody_Distri.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('La división ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = window.Global_Tabla_List_Division.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Division.childNodes[1].innerHTML;

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Division);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('División agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);

		           cel1.innerHTML = window.Global_Tabla_List_Division.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Division.childNodes[1].innerHTML;

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Division);
				    cel3.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('División agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione una División', 'Advertencia');
    	}
});


$("#Agregar_List_Linea").click(function(event) {
	
	if (window.Global_Tabla_List_Linea != null)
    	{
    		let Distri       = document.getElementById("Table_Linea"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Distri         = document.getElementById("Table_Linea");
    		let Tbody_Distri         = Tabla_Distri.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Distri.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Distri.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Linea.childNodes[0].innerHTML == Tbody_Distri.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('La linea ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = window.Global_Tabla_List_Linea.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Linea.childNodes[1].innerHTML;

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Linea);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('Linea agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);

		           cel1.innerHTML = window.Global_Tabla_List_Linea.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Linea.childNodes[1].innerHTML;

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Linea);
				    cel3.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('Linea agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione una Linea', 'Advertencia');
    	}
});

$("#Agregar_List_Sublinea").click(function(event) {
	
	if (window.Global_Tabla_List_Sublinea != null)
    	{
    		let Distri       = document.getElementById("Table_Sublinea"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Distri         = document.getElementById("Table_Sublinea");
    		let Tbody_Distri         = Tabla_Distri.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Distri.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Distri.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Sublinea.childNodes[0].innerHTML == Tbody_Distri.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('La sublinea ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = window.Global_Tabla_List_Sublinea.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Sublinea.childNodes[1].innerHTML;

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Sublinea);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('Sublinea agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);

		           cel1.innerHTML = window.Global_Tabla_List_Sublinea.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Sublinea.childNodes[1].innerHTML;

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Sublinea);
				    cel3.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('Sublinea agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione una Sublinea', 'Advertencia');
    	}
});

$("#Agregar_Regalo").click(function(event) {
	
	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Productos',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Productos_Regalo").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Productos_Regalo"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Productos_Regalo').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);
			                 //let cel3 = row.insertCell(2);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Codigo'];
			                 cel3.innerHTML = parsed['Detalle'][i]['Producto'];
			                
			                }

			                Crear_data_Lista_Productos_Regalo();
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
	                $('#Cargando_Modal_Oferta').css('display','none');
	            });
});

$("#Agregar_List_Producto_Regalo").click(function(event) {

	console.log(window.Global_Tabla_List_Regalo);
    	
    	if (window.Global_Tabla_List_Regalo != null)
    	{
    		let Distri       = document.getElementById("Table_Regalos"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Producto         = document.getElementById("Table_Regalos");
    		let Tbody_Producto         = Tabla_Producto.getElementsByTagName("tbody")[0];

	      	for (var i = 0; i <= 0; i++)
		    {
		       let row  = tbody.insertRow(i);
	           let cel1 = row.insertCell(0);
	           let cel2 = row.insertCell(1);
	           let cel3 = row.insertCell(2);

	           cel1.innerHTML = window.Global_Tabla_List_Regalo.childNodes[0].innerHTML;
			   cel2.innerHTML = window.Global_Tabla_List_Regalo.childNodes[2].innerHTML;

			   	let boton1 = document.createElement("button");
			    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
			    boton1.setAttribute('name', 'name_Productos');
			    boton1.addEventListener("click",window.Eliminar_Regalo);
			    cel3.appendChild(boton1);

			    let icono1 = document.createElement("span");
			    icono1.classList.add('glyphicon', 'glyphicon-trash');
			    boton1.appendChild(icono1);

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
	            toastr.success('Producto agregado con exito', 'Correcto');
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
	            toastr.warning('Seleccione un producto', 'Advertencia');
    	}

    });

$("#Agregar_Distribuidor_Oferta").click(function(event) {

    	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Distribuidores',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Distribuidores_Oferta").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Distribuidor_Oferta"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Distribuidor_Oferta').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 //let cel3 = row.insertCell(2);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Nombre'] + parsed['Detalle'][i]['Apellidos'];
			                
			                }

			                Crear_data_Lista_Distribuidores_Oferta();
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
	                $('#Cargando_Modal_Oferta').css('display','none');
	            });
    });

 $("#Agregar_List_Distribuidor_Oferta").click(function(event) {
    	
    	if (window.Global_Tabla_List_Distribuidor_Oferta != null)
    	{
    		let Distri       = document.getElementById("Table_Distribuidores_Oferta"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Distri         = document.getElementById("Table_Distribuidores_Oferta");
    		let Tbody_Distri         = Tabla_Distri.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Distri.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Distri.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Distribuidor_Oferta.childNodes[0].innerHTML == Tbody_Distri.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('El distribuidor ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = window.Global_Tabla_List_Distribuidor_Oferta.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Distribuidor_Oferta.childNodes[1].innerHTML;

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Distribuidor_Oferta);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('Distribuidor agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);

		           cel1.innerHTML = window.Global_Tabla_List_Distribuidor_Oferta.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Distribuidor_Oferta.childNodes[1].innerHTML;

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Distribuidor_Oferta);
				    cel3.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('Distribuidor agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione a un distribuidor', 'Advertencia');
    	}
    });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////




















































































$("#Option_Editar_Ofertas").click(function(event) {
    	/* Act on the event */
    Editar_Oferta();
});

$("#Editar_Ofertas").click(function(event) {
	/* Act on the event */
	Editar_Oferta();
});

$("#Option_Eliminar_Ofertas").click(function(event) {
    	/* Act on the event */
    Eliminar_Oferta();
});

$("#Eliminar_Ofertas").click(function(event) {
	/* Act on the event */
	Eliminar_Oferta();
});



$("#Agregar_Oferta_Editar").click(function(event) {

	let Nombre 		= $("#txt_Nombre_Oferta_Editar").val();
	let Inicial		= $("#Vigencia_Inicial_Oferta_Editar").val();
	let Final  		= $("#Vigencia_Final_Oferta_Editar").val();
	let Compra 		= $("#txtCompra_Requerida_Editar").val();
	let Descuento 	= "";
	let Tipo_Desc   = 0;
	let Tipo_Regalo = 0;
	let Status 		= "";
	let Excluir     = 0;

	let Tabla_Regalo         = document.getElementById("Table_Regalos_Editar");
    let Tbody_Regalo         = Tabla_Regalo.getElementsByTagName("tbody")[0];

    let Tabla_Producto       = document.getElementById("Table_Producto_Oferta_Editar");
    let Tbody_Producto       = Tabla_Producto.getElementsByTagName("tbody")[0];

    let Tabla_Cliente        = document.getElementById("Table_Distribuidores_Oferta_Editar");
    let Tbody_Cliente        = Tabla_Cliente.getElementsByTagName("tbody")[0];

    let Tabla_Division       = document.getElementById("Table_Divisiones_Editar");
    let Tbody_Division       = Tabla_Division.getElementsByTagName("tbody")[0];

    let Tabla_Linea          = document.getElementById("Table_Linea_Editar");
    let Tbody_Linea          = Tabla_Linea.getElementsByTagName("tbody")[0];

    let Tabla_Sublinea       = document.getElementById("Table_Sublinea_Editar");
    let Tbody_Sublinea       = Tabla_Sublinea.getElementsByTagName("tbody")[0];

    let Tabla_Sucursal       = document.getElementById("Table_Sucursales_Oferta_Editar");
    let Tbody_Sucursal       = Tabla_Sucursal.getElementsByTagName("tbody")[0];

	let Regalo   = new Array();
	let Cliente  = new Array();
	let Producto = new Array();
	let Division = new Array();
	let Linea    = new Array();
	let Sublinea = new Array();
	let Sucursal = new Array();

	if ($("#check_Excluir_Oferta_Editar").prop('checked'))
	{
		Excluir = 1;
	}
	else
	{
		Excluir = 0;
	}

	if ($("#check_Status_Oferta_Editar").prop('checked'))
	{
		Status = "Inactivo";
	}
	else
	{
		Status = "Activo";
	}

	if ($('#radio_Descuento_Editar').prop('checked'))
    {
    	Descuento 	= $("#txtDescuento_Editar").val();
    	Tipo_Desc 	= 1;
    	Tipo_Regalo = 0;
    }

    if ($('#radio_Regalo_Editar').prop('checked'))
    {
    	Tipo_Desc 	= 0;
    	Tipo_Regalo = 1;
    }

    if (Tipo_Regalo == 1)
    {
		if (Nombre != null && Nombre != "" && Inicial != null && Inicial != "" && Final != null && Final != "" && Compra != null && Compra != "")
		{
			if (Tbody_Regalo.rows.length > 0 && Tbody_Sucursal.rows.length > 0)
			{

				if (Tbody_Producto.rows.length > 0)
				{
					for (var i = 0; i < Tbody_Producto.rows.length; i++)
					{
						Producto.push(Tbody_Producto.rows[i].cells[0].innerHTML);
					}
					
				}

				if (Tbody_Cliente.rows.length > 0)
				{
					for (var i = 0; i < Tbody_Cliente.rows.length; i++)
					{
						Cliente.push(Tbody_Cliente.rows[i].cells[0].innerHTML);
					}
				}

				if (Tbody_Division.rows.length > 0)
				{
					for (var i = 0; i < Tbody_Division.rows.length; i++)
					{
						Division.push(Tbody_Division.rows[i].cells[0].innerHTML);
					}
				}

				if (Tbody_Linea.rows.length > 0)
				{
					for (var i = 0; i < Tbody_Linea.rows.length; i++)
					{
						Linea.push(Tbody_Linea.rows[i].cells[0].innerHTML);
					}
				}

				if (Tbody_Sublinea.rows.length > 0)
				{
					for (var i = 0; i < Tbody_Sublinea.rows.length; i++)
					{
						Sublinea.push(Tbody_Sublinea.rows[i].cells[0].innerHTML);
					}
				}

				if (Tbody_Sucursal.rows.length > 0)
				{
					for (var i = 0; i < Tbody_Sucursal.rows.length; i++)
					{
						Sucursal.push(Tbody_Sucursal.rows[i].cells[0].innerHTML);
					}
				}

				for (var i = 0; i < Tbody_Regalo.rows.length ; i++)
			    {		
			    	for (var i = 0; i < Tbody_Regalo.rows.length; i++)
					{      
				    	Regalo.push(Tbody_Regalo.rows[i].cells[0].innerHTML);
				    }
			    }


				var formData = new FormData();
				formData.append("ID", window.Global_Tabla_Ofertas.childNodes[0].innerHTML);
	            formData.append("Nombre", Nombre);
	            formData.append("Tipo_Desc", Tipo_Desc);
	            formData.append("Tipo_Regalo", Tipo_Regalo);
	            formData.append("Desc", Descuento);
	            formData.append("Vigencia_inicial", Inicial);
	            formData.append("Vigencia_final", Final);
	            formData.append("Compra_req", Compra);
	            formData.append("Excluir", Excluir);
	            formData.append("Status", Status);
	            formData.append("Tipo", 'Regalo');

	            formData.append("Distribuidor", Cliente);
	            formData.append("Producto", Producto);
	            formData.append("Sucursal", Sucursal);
	            formData.append("Division", Division);
	            formData.append("Linea", Linea);
	            formData.append("Sublinea", Sublinea);
	            formData.append("Regalo", Regalo);

	            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Editar_Oferta',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta_Editar').css('display','');
                },
                success: function(data)
                {
                    console.log(data);

                    if (data == "Correcto")
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
				            toastr.success('Oferta modificada con exito', 'Correcto');

				            Limpiar_Oferta();
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
				            toastr.error('Ocurrio un error al modificar la oferta', 'Error');
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
	                $('#Cargando_Modal_Oferta_Editar').css('display','none');
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
	            toastr.info('Seleccione por lo menos un regalo y una sucursal para continuar', 'Importante');
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
	            toastr.warning('Algunos campos obligatorios estan vacios', 'Advertencia');
		}
    }
    else
    {
    	if (Nombre != null && Nombre != "" && Inicial != null && Inicial != "" && Final != null && Final != "" && Compra != null && Compra != "")
    	{
    		if (Tbody_Sucursal.rows.length > 0 && Descuento != null && Descuento != "")
			{
				if (Tbody_Producto.rows.length > 0)
				{
					for (var i = 0; i < Tbody_Producto.rows.length; i++)
					{
						Producto.push(Tbody_Producto.rows[i].cells[0].innerHTML);
					}
					
				}

				if (Tbody_Cliente.rows.length > 0)
				{
					for (var i = 0; i < Tbody_Cliente.rows.length; i++)
					{
						Cliente.push(Tbody_Cliente.rows[i].cells[0].innerHTML);
					}
				}

				if (Tbody_Division.rows.length > 0)
				{
					for (var i = 0; i < Tbody_Division.rows.length; i++)
					{
						Division.push(Tbody_Division.rows[i].cells[0].innerHTML);
					}
				}

				if (Tbody_Linea.rows.length > 0)
				{
					for (var i = 0; i < Tbody_Linea.rows.length; i++)
					{
						Linea.push(Tbody_Linea.rows[i].cells[0].innerHTML);
					}
				}

				if (Tbody_Sublinea.rows.length > 0)
				{
					for (var i = 0; i < Tbody_Sublinea.rows.length; i++)
					{
						Sublinea.push(Tbody_Sublinea.rows[i].cells[0].innerHTML);
					}
				}

				if (Tbody_Sucursal.rows.length > 0)
				{
					for (var i = 0; i < Tbody_Sucursal.rows.length; i++)
					{
						Sucursal.push(Tbody_Sucursal.rows[i].cells[0].innerHTML);
					}
				}

				/*for (var i = 0; i < Tbody_Regalo.rows.length ; i++)
			    {		
			    	for (var i = 0; i < Tbody_Regalo.rows.length; i++)
					{      
				    	Regalo.push(Tbody_Regalo.rows[i].cells[0].innerHTML);
				    }
			    }*/

				var formData = new FormData();
				formData.append("ID", window.Global_Tabla_Ofertas.childNodes[0].innerHTML);
	            formData.append("Nombre", Nombre);
	            formData.append("Tipo_Desc", Tipo_Desc);
	            formData.append("Tipo_Regalo", Tipo_Regalo);
	            formData.append("Desc", Descuento);
	            formData.append("Vigencia_inicial", Inicial);
	            formData.append("Vigencia_final", Final);
	            formData.append("Compra_req", Compra);
	            formData.append("Excluir", Excluir);
	            formData.append("Status", Status);
	            formData.append("Tipo", 'Descuento');

	            formData.append("Distribuidor", Cliente);
	            formData.append("Producto", Producto);
	            formData.append("Sucursal", Sucursal);
	            formData.append("Division", Division);
	            formData.append("Linea", Linea);
	            formData.append("Sublinea", Sublinea);
	            formData.append("Regalo", Regalo);

	            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Editar_Oferta',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta_Editar').css('display','');
                },
                success: function(data)
                {
                    console.log(data);

                    if (data == "Correcto")
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
				            toastr.success('Oferta modificada con exito', 'Correcto');

				            Limpiar_Oferta();
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
				            toastr.error('Ocurrio un error al modificar la oferta', 'Error');
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
	                $('#Cargando_Modal_Oferta_Editar').css('display','none');
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
	            toastr.info('Seleccione por lo menos una sucursal y el % del descuento para continuar', 'Importante');
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
	            toastr.warning('Algunos campos obligatorios estan vacios', 'Advertencia');
    	}
    }






});

$("#check_Excluir_Oferta_Editar").click(function(event) {
    	
    	if ($('#check_Excluir_Oferta_Editar').prop('checked'))
    	{
		    $("#Div_Table_Distribuidor_Oferta_Editar").css('display','');
		}
		else
		{
			let Tabla_Clientes         = document.getElementById("Table_Distribuidores_Oferta_Editar");
    		let Tbody_Clientes         = Tabla_Clientes.getElementsByTagName("tbody")[0];

    		 if (Tbody_Clientes.rows.length > 0)
    		 {
    		 	swal({
					  title: "¿Esta segúro?",
					  text: "Se encuentran distribuidores agregados a la oferta si continúa todos los distribuidores agregados previamente seran eliminas de la tabla \n \n \n ¿Desea Continuar con el proceso?",
					  icon: "warning",
					  buttons: true,
					  dangerMode: true,
					})
					.then((willDelete) => {
					  if (willDelete) {

					    Tbody_Clientes.innerHTML = "";
					    $("#Div_Table_Distribuidor_Oferta_Editar").css('display','none');

					  } 
					  else 
					  {
					  	$("#check_Excluir_Oferta_Editar").prop('checked', true);
					    $("#Div_Table_Distribuidor_Oferta_Editar").css('display','');
					  }
					});
    		 }
    		 else
    		 {
    		 	$("#Div_Table_Distribuidor_Oferta_Editar").css('display','none');
    		 }
			
		}

    });

$("#radio_Descuento_Editar").click(function(event) {
    	
    	if ($('#radio_Descuento_Editar').prop('checked'))
    	{
		    let Tabla_Clientes         = document.getElementById("Table_Regalos_Editar");
    		let Tbody_Clientes         = Tabla_Clientes.getElementsByTagName("tbody")[0];

    		 if (Tbody_Clientes.rows.length > 0)
    		 {
    		 	swal({
					  title: "¿Esta segúro?",
					  text: "Se encuentran regalos agregados a la oferta si continúa todos los regalos agregados previamente seran eliminas de la tabla \n \n \n ¿Desea Continuar con el proceso?",
					  icon: "warning",
					  buttons: true,
					  dangerMode: true,
					})
					.then((willDelete) => {
					  if (willDelete) {

					    Tbody_Clientes.innerHTML = "";
					    $("#Div_Regalo_Editar").css('display','none');
		    			$("#Div_Descuento_Editar").css('display','');

		    			window.Tipo_Oferta_Editar = "Descuento";

					  } 
					  else 
					  {
					  	$("#radio_Regalo_Editar").prop('checked', true);
					    $("#Div_Regalo_Editar").css('display','');
					    $("#Div_Descuento_Editar").css('display','none');

					    window.Tipo_Oferta_Editar = "Regalo";
					  }
					});
    		 }
    		 else
    		 {
    		 	$("#Div_Regalo_Editar").css('display','none');
		    	$("#Div_Descuento_Editar").css('display','');

		    	window.Tipo_Oferta_Editar = "Descuento";
    		 }
		}

    });


$("#radio_Regalo_Editar").click(function(event) {
    	
    	if ($('#radio_Regalo_Editar').prop('checked'))
    	{
    		$("#txtDescuento_Editar").val(0);
		    $("#Div_Regalo_Editar").css('display','');
		    $("#Div_Descuento_Editar").css('display','none');

		    window.Tipo_Oferta_Editar = "Regalo";
		}

    });

$("#Agregar_Linea_Editar").click(function(event) {
	
	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Linea',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta_Editar').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Linea_Editar").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Linea_Editar"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Linea_Editar').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Linea'];
			                
			                }

			                Crear_data_Lista_Linea_Editar();
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
	                $('#Cargando_Modal_Oferta_Editar').css('display','none');
	            });
});

$("#Agregar_Sublinea_Editar").click(function(event) {
	
	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Sublinea',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta_Editar').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Sublinea_Editar").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Sublinea_Editar"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Sublinea_Editar').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Sublinea'];
			                
			                }

			                Crear_data_Lista_Sublinea_Editar();
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
	                $('#Cargando_Modal_Oferta_Editar').css('display','none');
	            });
});

$("#Agregar_Division_Editar").click(function(event) {
	
	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Division',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta_Editar').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Divisiones_Editar").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Division_Editar"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Division_Editar').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Division'];
			                
			                }

			                Crear_data_Lista_Division_Editar();
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
	                $('#Cargando_Modal_Oferta_Editar').css('display','none');
	            });
});

$("#Agregar_Producto_Oferta_Editar").click(function(event) {
	
	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Productos',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta_Editar').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Producto_Oferta_Editar").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_List_Producto_Oferta_Editar"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_List_Producto_Oferta_Editar').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Codigo'];
			                 cel3.innerHTML = parsed['Detalle'][i]['Producto'];
			                
			                }

			                Crear_data_Lista_Producto_Editar();
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
	                $('#Cargando_Modal_Oferta_Editar').css('display','none');
	            });
});


$("#Agregar_Sucursal_Oferta_Editar").click(function(event) {
	
	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Sucursales',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta_Editar').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Sucursal_Oferta_Editar").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_List_Sucursal_Oferta_Editar"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_List_Sucursal_Oferta_Editar').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Sucursal'];
			                
			                }

			                Crear_data_Lista_Sucursal_Oferta_Editar();
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
	                $('#Cargando_Modal_Oferta_Editar').css('display','none');
	            });
});

$("#Agregar_List_Sucursal_Oferta_Editar").click(function(event) {
	
	if (window.Global_Tabla_List_Sucursal_Oferta_Editar != null)
    	{
    		let Distri       = document.getElementById("Table_Sucursales_Oferta_Editar"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Distri         = document.getElementById("Table_Sucursales_Oferta_Editar");
    		let Tbody_Distri         = Tabla_Distri.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Distri.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Distri.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Sucursal_Oferta_Editar.childNodes[0].innerHTML == Tbody_Distri.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('El sucusal ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = window.Global_Tabla_List_Sucursal_Oferta_Editar.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Sucursal_Oferta_Editar.childNodes[1].innerHTML;

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Sucursal_Oferta_Editar);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('Sucursal agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);

		           cel1.innerHTML = window.Global_Tabla_List_Sucursal_Oferta_Editar.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Sucursal_Oferta_Editar.childNodes[1].innerHTML;

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Sucursal_Oferta_Editar);
				    cel3.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('Sucursal agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione una sucursal', 'Advertencia');
    	}
});


$("#Agregar_List_Producto_Oferta_Editar").click(function(event) {
	
	if (window.Global_Tabla_List_Producto_Oferta_Editar != null)
    	{
    		let Distri       = document.getElementById("Table_Producto_Oferta_Editar"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Distri         = document.getElementById("Table_Producto_Oferta_Editar");
    		let Tbody_Distri         = Tabla_Distri.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Distri.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Distri.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Producto_Oferta_Editar.childNodes[0].innerHTML == Tbody_Distri.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('El producto ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = window.Global_Tabla_List_Producto_Oferta_Editar.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Producto_Oferta_Editar.childNodes[1].innerHTML;

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Producto_Oferta_Editar);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('Producto agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);

		           cel1.innerHTML = window.Global_Tabla_List_Producto_Oferta_Editar.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Producto_Oferta_Editar.childNodes[1].innerHTML;

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Producto_Oferta_Editar);
				    cel3.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('Producto agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione una producto', 'Advertencia');
    	}
});

$("#Agregar_List_Division_Editar").click(function(event) {
	
	if (window.Global_Tabla_List_Division_Editar != null)
    	{
    		let Distri       = document.getElementById("Table_Divisiones_Editar"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Distri         = document.getElementById("Table_Divisiones_Editar");
    		let Tbody_Distri         = Tabla_Distri.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Distri.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Distri.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Division_Editar.childNodes[0].innerHTML == Tbody_Distri.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('La división ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = window.Global_Tabla_List_Division_Editar.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Division_Editar.childNodes[1].innerHTML;

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Division_Editar);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('División agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);

		           cel1.innerHTML = window.Global_Tabla_List_Division_Editar.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Division_Editar.childNodes[1].innerHTML;

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Division_Editar);
				    cel3.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('División agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione una División', 'Advertencia');
    	}
});


$("#Agregar_List_Linea_Editar").click(function(event) {
	
	if (window.Global_Tabla_List_Linea_Editar != null)
    	{
    		let Distri       = document.getElementById("Table_Linea_Editar"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Distri         = document.getElementById("Table_Linea_Editar");
    		let Tbody_Distri         = Tabla_Distri.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Distri.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Distri.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Linea_Editar.childNodes[0].innerHTML == Tbody_Distri.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('La linea ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = window.Global_Tabla_List_Linea_Editar.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Linea_Editar.childNodes[1].innerHTML;

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Linea_Editar);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('Linea agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);

		           cel1.innerHTML = window.Global_Tabla_List_Linea_Editar.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Linea_Editar.childNodes[1].innerHTML;

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Linea_Editar);
				    cel3.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('Linea agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione una Linea', 'Advertencia');
    	}
});

$("#Agregar_List_Sublinea_Editar").click(function(event) {
	
	if (window.Global_Tabla_List_Sublinea_Editar != null)
    	{
    		let Distri       = document.getElementById("Table_Sublinea_Editar"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Distri         = document.getElementById("Table_Sublinea_Editar");
    		let Tbody_Distri         = Tabla_Distri.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Distri.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Distri.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Sublinea_Editar.childNodes[0].innerHTML == Tbody_Distri.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('La sublinea ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = window.Global_Tabla_List_Sublinea_Editar.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Sublinea_Editar.childNodes[1].innerHTML;

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Sublinea_Editar);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('Sublinea agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);

		           cel1.innerHTML = window.Global_Tabla_List_Sublinea_Editar.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Sublinea_Editar.childNodes[1].innerHTML;

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Sublinea_Editar);
				    cel3.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('Sublinea agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione una Sublinea', 'Advertencia');
    	}
});

$("#Agregar_Regalo_Editar").click(function(event) {
	
	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Productos',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta_Editar').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Productos_Regalo_Editar").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Productos_Regalo_Editar"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Productos_Regalo_Editar').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 let cel3 = row.insertCell(2);
			                 //let cel3 = row.insertCell(2);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Codigo'];
			                 cel3.innerHTML = parsed['Detalle'][i]['Producto'];
			                
			                }

			                Crear_data_Lista_Productos_Regalo_Editar();
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
	                $('#Cargando_Modal_Oferta_Editar').css('display','none');
	            });
});

$("#Agregar_List_Producto_Regalo_Editar").click(function(event) {

	console.log(window.Global_Tabla_List_Regalo_Editar);
    	
    	if (window.Global_Tabla_List_Regalo_Editar != null)
    	{
    		let Distri       = document.getElementById("Table_Regalos_Editar"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Producto         = document.getElementById("Table_Regalos_Editar");
    		let Tbody_Producto         = Tabla_Producto.getElementsByTagName("tbody")[0];

	      	for (var i = 0; i <= 0; i++)
		    {
		       let row  = tbody.insertRow(i);
	           let cel1 = row.insertCell(0);
	           let cel2 = row.insertCell(1);
	           let cel3 = row.insertCell(2);

	           cel1.innerHTML = window.Global_Tabla_List_Regalo_Editar.childNodes[0].innerHTML;
			   cel2.innerHTML = window.Global_Tabla_List_Regalo_Editar.childNodes[2].innerHTML;

			   	let boton1 = document.createElement("button");
			    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
			    boton1.setAttribute('name', 'name_Productos');
			    boton1.addEventListener("click",window.Eliminar_Regalo_Editar);
			    cel3.appendChild(boton1);

			    let icono1 = document.createElement("span");
			    icono1.classList.add('glyphicon', 'glyphicon-trash');
			    boton1.appendChild(icono1);

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
	            toastr.success('Producto agregado con exito', 'Correcto');
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
	            toastr.warning('Seleccione un producto', 'Advertencia');
    	}

    });

$("#Agregar_Distribuidor_Oferta_Editar").click(function(event) {

    	var formData = new FormData();

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_Distribuidores',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: formData,
                beforeSend : function ()
                {
                    $('#Cargando_Modal_Oferta_Editar').css('display','');
                },
                success: function(data)
                {
                    let parsed = JSON.parse(data);

                    $("#Mostrar_Distribuidores_Oferta_Editar").modal("show");

		            if (parsed != null && parsed != "")
		            {
                		let Promociones_Detalle   = document.getElementById("Table_Lista_Distribuidor_Oferta_Editar"); 
                		let tbody_Promo_Detalle   = Promociones_Detalle.tBodies[0];

                		$('#Table_Lista_Distribuidor_Oferta_Editar').DataTable().destroy();
                		Promociones_Detalle.tBodies[0].innerHTML = "";

                		    for (var i = 0; i < parsed['Detalle'].length; i++) 
			                {

			                 let row  = tbody_Promo_Detalle.insertRow(i);
			                 let cel1 = row.insertCell(0);
			                 let cel2 = row.insertCell(1);
			                 //let cel3 = row.insertCell(2);

			                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
			                 cel2.innerHTML = parsed['Detalle'][i]['Nombre'] + parsed['Detalle'][i]['Apellidos'];
			                
			                }

			                Crear_data_Lista_Distribuidores_Oferta_Editar();
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
	                $('#Cargando_Modal_Oferta_Editar').css('display','none');
	            });
    });

 $("#Agregar_List_Distribuidor_Oferta_Editar").click(function(event) {
    	
    	if (window.Global_Tabla_List_Distribuidor_Oferta_Editar != null)
    	{
    		let Distri       = document.getElementById("Table_Distribuidores_Oferta_Editar"); 
			let tbody 		 = Distri.tBodies[0];

			let Tabla_Distri         = document.getElementById("Table_Distribuidores_Oferta_Editar");
    		let Tbody_Distri         = Tabla_Distri.getElementsByTagName("tbody")[0];

    		let Contador = 0;

			if (Tbody_Distri.rows.length > 0)
			{
					for (var i = 0; i < Tbody_Distri.rows.length ; i++)
				    {		      
					    if (window.Global_Tabla_List_Distribuidor_Oferta_Editar.childNodes[0].innerHTML == Tbody_Distri.rows[i].cells[0].innerHTML)
					    {
						    Contador ++;
					    }
				    }

				    if (Contador > 0)
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
				            toastr.error('El distribuidor ya se encuentra agregado', 'Error');
				    }
				    else
				    {
				      	for (var i = 0; i <= 0; i++)
					    {
					       let row  = tbody.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = window.Global_Tabla_List_Distribuidor_Oferta_Editar.childNodes[0].innerHTML;
						   cel2.innerHTML = window.Global_Tabla_List_Distribuidor_Oferta_Editar.childNodes[1].innerHTML;

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Distribuidor_Oferta_Editar);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);

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
				            toastr.success('Distribuidor agregado con exito', 'Correcto');
						}
				    }
			}
			else
			{
				for (var i = 0; i <= 0; i++)
			    {
			       let row  = tbody.insertRow(i);
		           let cel1 = row.insertCell(0);
		           let cel2 = row.insertCell(1);
		           let cel3 = row.insertCell(2);

		           cel1.innerHTML = window.Global_Tabla_List_Distribuidor_Oferta_Editar.childNodes[0].innerHTML;
				   cel2.innerHTML = window.Global_Tabla_List_Distribuidor_Oferta_Editar.childNodes[1].innerHTML;

				   	let boton1 = document.createElement("button");
				    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
				    boton1.setAttribute('name', 'name_Productos');
				    boton1.addEventListener("click",window.Eliminar_Distribuidor_Oferta_Editar);
				    cel3.appendChild(boton1);

				    let icono1 = document.createElement("span");
				    icono1.classList.add('glyphicon', 'glyphicon-trash');
				    boton1.appendChild(icono1);

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
		            toastr.success('Distribuidor agregado con exito', 'Correcto');
				}
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
	            toastr.warning('Seleccione a un distribuidor', 'Advertencia');
    	}
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// Funciones Promociones Oferta ////////////////////////////////////////

    var Table_List_Distribuidor_Oferta = document.getElementById("Table_Lista_Distribuidor_Oferta");
    Table_List_Distribuidor_Oferta.onclick = function(e)
    {
        window.Global_Tabla_List_Distribuidor_Oferta = e.target.parentNode;
    }

    var Table_List_Regalo = document.getElementById("Table_Lista_Productos_Regalo");
    Table_List_Regalo.onclick = function(e)
    {
        window.Global_Tabla_List_Regalo = e.target.parentNode;
    }

    var Table_List_Division = document.getElementById("Table_Lista_Division");
    Table_List_Division.onclick = function(e)
    {
        window.Global_Tabla_List_Division = e.target.parentNode;
    }

    var Table_List_Linea = document.getElementById("Table_Lista_Linea");
    Table_List_Linea.onclick = function(e)
    {
        window.Global_Tabla_List_Linea = e.target.parentNode;
    }

    var Table_List_Sublinea = document.getElementById("Table_Lista_Sublinea");
    Table_List_Sublinea.onclick = function(e)
    {
        window.Global_Tabla_List_Sublinea = e.target.parentNode;
    }

    var Table_List_Producto = document.getElementById("Table_List_Producto_Oferta");
    Table_List_Producto.onclick = function(e)
    {
        window.Global_Tabla_List_Producto_Oferta = e.target.parentNode;
    }

    var Table_List_Sucursal = document.getElementById("Table_List_Sucursal_Oferta");
    Table_List_Sucursal.onclick = function(e)
    {
        window.Global_Tabla_List_Sucursal_Oferta = e.target.parentNode;
    }

    ////////////////////////////////////// Funciones Promociones Oferta Editar//////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    var Table_List_Distribuidor_Oferta_Editar = document.getElementById("Table_Lista_Distribuidor_Oferta_Editar");
    Table_List_Distribuidor_Oferta_Editar.onclick = function(e)
    {
        window.Global_Tabla_List_Distribuidor_Oferta_Editar = e.target.parentNode;
    }

    var Table_List_Regalo_Editar = document.getElementById("Table_Lista_Productos_Regalo_Editar");
    Table_List_Regalo_Editar.onclick = function(e)
    {
        window.Global_Tabla_List_Regalo_Editar = e.target.parentNode;
    }

    var Table_List_Division_Editar = document.getElementById("Table_Lista_Division_Editar");
    Table_List_Division_Editar.onclick = function(e)
    {
        window.Global_Tabla_List_Division_Editar = e.target.parentNode;
    }

    var Table_List_Linea_Editar = document.getElementById("Table_Lista_Linea_Editar");
    Table_List_Linea_Editar.onclick = function(e)
    {
        window.Global_Tabla_List_Linea_Editar = e.target.parentNode;
    }

    var Table_List_Sublinea_Editar = document.getElementById("Table_Lista_Sublinea_Editar");
    Table_List_Sublinea_Editar.onclick = function(e)
    {
        window.Global_Tabla_List_Sublinea_Editar = e.target.parentNode;
    }

    var Table_List_Producto_Editar = document.getElementById("Table_List_Producto_Oferta_Editar");
    Table_List_Producto_Editar.onclick = function(e)
    {
        window.Global_Tabla_List_Producto_Oferta_Editar = e.target.parentNode;
    }

    var Table_List_Sucursal_Editar = document.getElementById("Table_List_Sucursal_Oferta_Editar");
    Table_List_Sucursal_Editar.onclick = function(e)
    {
        window.Global_Tabla_List_Sucursal_Oferta_Editar = e.target.parentNode;
    }

    ////////////////////////////////////// Funciones Promociones Oferta ////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////


});

function Crear_data_Lista_Distribuidores_Oferta() {
	
	$('#Table_Lista_Distribuidor_Oferta').dataTable({
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

function Crear_data_Lista_Productos_Regalo() {
	
	$('#Table_Lista_Productos_Regalo').dataTable({
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

function Crear_data_Lista_Division() {
	
	$('#Table_Lista_Division').dataTable({
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

function Crear_data_Lista_Linea() {
	
	$('#Table_Lista_Linea').dataTable({
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

function Crear_data_Lista_Sublinea() {
	
	$('#Table_Lista_Sublinea').dataTable({
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

function Crear_data_Lista_Producto() {
	
	$('#Table_List_Producto_Oferta').dataTable({
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

function Crear_data_Lista_Sucursal_Oferta() {
	
	$('#Table_List_Sucursal_Oferta').dataTable({
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

function Limpiar2() {
	// body...
	$("#txt_Nombre_Oferta").val("");
	$("#Vigencia_Inicial_Oferta").val("");
	$("#Vigencia_Final_Oferta").val("");
	$("#txtCompra_Requerida").val("1");
	$("#txtDescuento").val("0");

	$("#radio_Descuento").prop('checked', false);
	$("#radio_Regalo").prop('checked', false);
	$("#check_Excluir_Oferta").prop('checked',false);
	$("#Div_Table_Distribuidor_Oferta").css('display', 'none');
	$("#Div_Regalo").css('display','none');
	$("#Div_Descuento").css('display','none');

	$("#myModal_Oferta_Editar").modal("hide");

	window.Tipo_Oferta = "";

	window.Global_Tabla_List_Distribuidor_Oferta = null;
	window.Global_Tabla_List_Regalo				 = null;
	window.Global_Tabla_List_Division 			 = null;
	window.Global_Tabla_List_Linea 				 = null;
	window.Global_Tabla_List_Sublinea 			 = null;
	window.Global_Tabla_List_Producto_Oferta	 = null;
	window.Global_Tabla_List_Sucursal_Oferta	 = null;

	let Regalo   		= document.getElementById("Table_Regalos"); 
	$('#Table_Regalos').DataTable().destroy();
    Regalo.tBodies[0].innerHTML = "";

    let Cliente   		= document.getElementById("Table_Distribuidores_Oferta"); 
	$('#Table_Distribuidores_Oferta').DataTable().destroy();
    Cliente.tBodies[0].innerHTML = "";

    /*let Promociones   		= document.getElementById("Table_Promociones"); 
	$('#Table_Promociones').DataTable().destroy();
    Promociones.tBodies[0].innerHTML = "";*/

    let Division   		= document.getElementById("Table_Divisiones"); 
	$('#Table_Divisiones').DataTable().destroy();
    Division.tBodies[0].innerHTML = "";

    let Linea   		= document.getElementById("Table_Linea"); 
	$('#Table_Linea').DataTable().destroy();
    Linea.tBodies[0].innerHTML = "";

    let Sublinea   		= document.getElementById("Table_Sublinea"); 
	$('#Table_Sublinea').DataTable().destroy();
    Sublinea.tBodies[0].innerHTML = "";

    let Producto   		= document.getElementById("Table_Producto_Oferta"); 
	$('#Table_Producto_Oferta').DataTable().destroy();
    Producto.tBodies[0].innerHTML = "";

    let Sucursales   		= document.getElementById("Table_Sucursales_Oferta"); 
	$('#Table_Sucursales_Oferta').DataTable().destroy();
    Sucursales.tBodies[0].innerHTML = "";

    let Ofertas   		= document.getElementById("Table_Ofertas"); 
	$('#Table_Ofertas').DataTable().destroy();
    Ofertas.tBodies[0].innerHTML = "";

    let Oferta_Detalle   		= document.getElementById("Table_Oferta_Producto"); 
	$('#Table_Oferta_Producto').DataTable().destroy();
    Oferta_Detalle.tBodies[0].innerHTML = "";

    fetch_data_Ofertas();
}

function Limpiar_Oferta() {
	// body...
	$("#txt_Nombre_Oferta_Editar").val("");
	$("#Vigencia_Inicial_Oferta_Editar").val("");
	$("#Vigencia_Final_Oferta_Editar").val("");
	$("#txtCompra_Requerida_Editar").val("1");
	$("#txtDescuento_Editar").val("0");

	$("#radio_Descuento_Editar").prop('checked', false);
	$("#radio_Regalo_Editar").prop('checked', false);
	$("#check_Excluir_Oferta_Editar").prop('checked',false);
	$("#Div_Table_Distribuidor_Oferta_Editar").css('display', 'none');
	$("#Div_Regalo_Editar").css('display','none');
	$("#Div_Descuento_Editar").css('display','none');

	$("#myModal_Oferta_Editar_Editar").modal("hide");

	window.Tipo_Oferta_Editar = "";
	window.Global_Tabla_Ofertas = null;

	window.Global_Tabla_List_Distribuidor_Oferta_Editar = null;
	window.Global_Tabla_List_Regalo_Editar				 = null;
	window.Global_Tabla_List_Division_Editar 			 = null;
	window.Global_Tabla_List_Linea_Editar 				 = null;
	window.Global_Tabla_List_Sublinea_Editar 			 = null;
	window.Global_Tabla_List_Producto_Oferta_Editar	 = null;
	window.Global_Tabla_List_Sucursal_Oferta_Editar	 = null;

	let Regalo   		= document.getElementById("Table_Regalos_Editar"); 
	$('#Table_Regalos_Editar').DataTable().destroy();
    Regalo.tBodies[0].innerHTML = "";

    let Cliente   		= document.getElementById("Table_Distribuidores_Oferta_Editar"); 
	$('#Table_Distribuidores_Oferta_Editar').DataTable().destroy();
    Cliente.tBodies[0].innerHTML = "";

    let Division   		= document.getElementById("Table_Divisiones_Editar"); 
	$('#Table_Divisiones_Editar').DataTable().destroy();
    Division.tBodies[0].innerHTML = "";

    let Linea   		= document.getElementById("Table_Linea_Editar"); 
	$('#Table_Linea_Editar').DataTable().destroy();
    Linea.tBodies[0].innerHTML = "";

    let Sublinea   		= document.getElementById("Table_Sublinea_Editar"); 
	$('#Table_Sublinea_Editar').DataTable().destroy();
    Sublinea.tBodies[0].innerHTML = "";

    let Producto   		= document.getElementById("Table_Producto_Oferta_Editar"); 
	$('#Table_Producto_Oferta_Editar').DataTable().destroy();
    Producto.tBodies[0].innerHTML = "";

    let Sucursales   		= document.getElementById("Table_Sucursales_Oferta_Editar"); 
	$('#Table_Sucursales_Oferta_Editar').DataTable().destroy();
    Sucursales.tBodies[0].innerHTML = "";

    let Ofertas   		= document.getElementById("Table_Ofertas"); 
	$('#Table_Ofertas').DataTable().destroy();
    Ofertas.tBodies[0].innerHTML = "";

    let Oferta_Detalle   		= document.getElementById("Table_Oferta_Producto"); 
	$('#Table_Oferta_Producto').DataTable().destroy();
    Oferta_Detalle.tBodies[0].innerHTML = "";

    fetch_data_Ofertas();
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Crear_data_Lista_Distribuidores_Oferta_Editar() {
	
	$('#Table_Lista_Distribuidor_Oferta_Editar').dataTable({
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

function Crear_data_Lista_Productos_Regalo_Editar() {
	
	$('#Table_Lista_Productos_Regalo_Editar').dataTable({
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

function Crear_data_Lista_Division_Editar() {
	
	$('#Table_Lista_Division_Editar').dataTable({
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

function Crear_data_Lista_Linea_Editar() {
	
	$('#Table_Lista_Linea_Editar').dataTable({
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

function Crear_data_Lista_Sublinea_Editar() {
	
	$('#Table_Lista_Sublinea_Editar').dataTable({
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

function Crear_data_Lista_Producto_Editar() {
	
	$('#Table_List_Producto_Oferta_Editar').dataTable({
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

function Crear_data_Lista_Sucursal_Oferta_Editar() {
	
	$('#Table_List_Sucursal_Oferta_Editar').dataTable({
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


function Limpiar_Editar() {
	// body...
	$("#txt_Nombre_Oferta_Editar").val("");
	$("#Vigencia_Inicial_Oferta_Editar").val("");
	$("#Vigencia_Final_Oferta_Editar").val("");
	$("#txtCompra_Requerida_Editar").val("1");
	$("#txtDescuento_Editar").val("0");

	$("#check_Status_Oferta_Editar").prop('checked', false);
	$("#radio_Descuento_Editar").prop('checked', false);
	$("#radio_Regalo_Editar").prop('checked', false);
	$("#check_Excluir_Oferta_Editar").prop('checked',false);
	$("#Div_Table_Distribuidor_Oferta_Editar").css('display', 'none');
	$("#Div_Regalo_Editar").css('display','none');
	$("#Div_Descuento_Editar").css('display','none');

	$("#myModal_Oferta_Editar").modal("hide");

	window.Tipo_Oferta_Editar = "";

	window.Global_Tabla_List_Distribuidor_Oferta_Editar  = null;
	window.Global_Tabla_List_Regalo_Editar				 = null;
	window.Global_Tabla_List_Division_Editar 			 = null;
	window.Global_Tabla_List_Linea_Editar 				 = null;
	window.Global_Tabla_List_Sublinea_Editar 			 = null;
	window.Global_Tabla_List_Producto_Oferta_Editar	 	 = null;
	window.Global_Tabla_List_Sucursal_Oferta_Editar	 	 = null;

	let Regalo   		= document.getElementById("Table_Regalos_Editar"); 
	$('#Table_Regalos_Editar').DataTable().destroy();
    Regalo.tBodies[0].innerHTML = "";

    let Cliente   		= document.getElementById("Table_Distribuidores_Oferta_Editar"); 
	$('#Table_Distribuidores_Oferta_Editar').DataTable().destroy();
    Cliente.tBodies[0].innerHTML = "";

    /*let Promociones   		= document.getElementById("Table_Promociones_Editar"); 
	$('#Table_Promociones_Editar').DataTable().destroy();
    Promociones.tBodies[0].innerHTML = "";*/

    let Division   		= document.getElementById("Table_Divisiones_Editar"); 
	$('#Table_Divisiones_Editar').DataTable().destroy();
    Division.tBodies[0].innerHTML = "";

    let Linea   		= document.getElementById("Table_Linea_Editar"); 
	$('#Table_Linea_Editar').DataTable().destroy();
    Linea.tBodies[0].innerHTML = "";

    let Sublinea   		= document.getElementById("Table_Sublinea_Editar"); 
	$('#Table_Sublinea_Editar').DataTable().destroy();
    Sublinea.tBodies[0].innerHTML = "";

    let Producto   		= document.getElementById("Table_Producto_Oferta_Editar"); 
	$('#Table_Producto_Oferta_Editar').DataTable().destroy();
    Producto.tBodies[0].innerHTML = "";

    let Sucursales   		= document.getElementById("Table_Sucursales_Oferta_Editar"); 
	$('#Table_Sucursales_Oferta_Editar').DataTable().destroy();
    Sucursales.tBodies[0].innerHTML = "";

    let Ofertas   		= document.getElementById("Table_Ofertas_Editar"); 
	$('#Table_Ofertas_Editar').DataTable().destroy();
    Ofertas.tBodies[0].innerHTML = "";

    let Oferta_Detalle   		= document.getElementById("Table_Oferta_Producto_Editar"); 
	$('#Table_Oferta_Producto_Editar').DataTable().destroy();
    Oferta_Detalle.tBodies[0].innerHTML = "";

    fetch_data_Ofertas();
}

function Eliminar_Oferta()
{
	if (window.Global_Tabla_Ofertas != null)
	{
		if (window.Global_Tabla_Ofertas.childNodes[6].childNodes[0].innerHTML != 'Inactivo')
		{
			swal({
				  title: "¿Esta segúro que desea eliminar la oferta?",
				  text: "Una vez eliminado pasara con a estatus inactivo",
				  icon: "warning",
				  buttons: true,
				  dangerMode: true,
				})
				.then((willDelete) => {
				  if (willDelete) {

				  	var formData = new FormData();
			            formData.append("ID", window.Global_Tabla_Ofertas.childNodes[0].innerHTML);

			            $.ajax({
			                url: dir + 'index.php/Controller_Promociones/Eliminar_Oferta',
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
			                    if (data == 'Correcto')
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
							            toastr.success('Oferta eliminada con exito', 'Correcto');

							            Limpiar_Oferta();       
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
							            toastr.error('Ocurrio un error al crear la oferta', 'Error');
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
              "timeOut": "800",
              "extendedTimeOut": "1000",
              "showEasing": "swing",
              "hideEasing": "linear",
              "showMethod": "fadeIn",
              "hideMethod": "fadeOut"
            }
            // Display an error toast, with a title
            toastr.warning('La oferta se encuentra como Inactiva', 'Advertencia');
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
            toastr.warning('Seleccione una oferta', 'Advertencia');
	}
}

function Editar_Oferta()
{
	if (window.Global_Tabla_Ofertas != null)
	{
		var formData = new FormData();
            formData.append("ID", window.Global_Tabla_Ofertas.childNodes[0].innerHTML);

            $.ajax({
                url: dir + 'index.php/Controller_Promociones/Get_All_Detalle_Oferta',
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

		            if (parsed != null && parsed != "")
		            {

		            	let Regalo   		= document.getElementById("Table_Regalos_Editar"); 
						$('#Table_Regalos_Editar').DataTable().destroy();
					    Regalo.tBodies[0].innerHTML = "";

					    let Cliente   		= document.getElementById("Table_Distribuidores_Oferta_Editar"); 
						$('#Table_Distribuidores_Oferta_Editar').DataTable().destroy();
					    Cliente.tBodies[0].innerHTML = "";

					    let Division   		= document.getElementById("Table_Divisiones_Editar"); 
						$('#Table_Divisiones_Editar').DataTable().destroy();
					    Division.tBodies[0].innerHTML = "";

					    let Linea   		= document.getElementById("Table_Linea_Editar"); 
						$('#Table_Linea_Editar').DataTable().destroy();
					    Linea.tBodies[0].innerHTML = "";

					    let Sublinea   		= document.getElementById("Table_Sublinea_Editar"); 
						$('#Table_Sublinea_Editar').DataTable().destroy();
					    Sublinea.tBodies[0].innerHTML = "";

					    let Producto   		= document.getElementById("Table_Producto_Oferta_Editar"); 
						$('#Table_Producto_Oferta_Editar').DataTable().destroy();
					    Producto.tBodies[0].innerHTML = "";

					    let Sucursales   		= document.getElementById("Table_Sucursales_Oferta_Editar"); 
						$('#Table_Sucursales_Oferta_Editar').DataTable().destroy();
					    Sucursales.tBodies[0].innerHTML = "";

		            	let Regalo_table        		= document.getElementById("Table_Regalos_Editar"); 
						let tbody_Regalo  		= Regalo_table.tBodies[0];

						let Distribuidor_table        = document.getElementById("Table_Distribuidores_Oferta_Editar"); 
						let tbody_Distribuidor  = Distribuidor_table.tBodies[0];

						let Division_table        	= document.getElementById("Table_Divisiones_Editar"); 
						let tbody_Division  	= Division_table.tBodies[0];

						let Linea_table        		= document.getElementById("Table_Linea_Editar"); 
						let tbody_Linea  		= Linea_table.tBodies[0];

						let Sublinea_table        	= document.getElementById("Table_Sublinea_Editar"); 
						let tbody_Sublinea  	= Sublinea_table.tBodies[0];

						let Producto_table        	= document.getElementById("Table_Producto_Oferta_Editar"); 
						let tbody_Producto  	= Producto_table.tBodies[0];

						let Sucursal_table        	= document.getElementById("Table_Sucursales_Oferta_Editar"); 
						let tbody_Sucursal  	= Sucursal_table.tBodies[0];

						$("#txt_Nombre_Oferta_Editar").val(parsed['Oferta'][0]['Nombre']);
						$("#Vigencia_Inicial_Oferta_Editar").val(parsed['Oferta'][0]['Vigencia_inicial']);
						$("#Vigencia_Final_Oferta_Editar").val(parsed['Oferta'][0]['Vigencia_final']);
						$("#txtCompra_Requerida_Editar").val(parsed['Oferta'][0]['Compra_req']);
						$("#txtDescuento_Editar").val(parsed['Oferta'][0]['Desc']);

						if (parsed['Oferta'][0]['Tipo_Desc'] == 1)
						{
							$("#radio_Descuento_Editar").prop('checked', true);
							$("#radio_Regalo_Editar").prop('checked', false);
							$("#Div_Regalo_Editar").css('display','none');
							$("#Div_Descuento_Editar").css('display','');
						}
						else if (parsed['Oferta'][0]['Tipo_Regalo'] == 1)
						{
							$("#radio_Regalo_Editar").prop('checked', true);
							$("#radio_Descuento_Editar").prop('checked', false);
							$("#Div_Regalo_Editar").css('display','');
							$("#Div_Descuento_Editar").css('display','none');

								for (var i = 0; i < parsed['Regalo'].length; i++)
							    {
							       let row  = tbody_Regalo.insertRow(i);
						           let cel1 = row.insertCell(0);
						           let cel2 = row.insertCell(1);
						           let cel3 = row.insertCell(2);

						           cel1.innerHTML = parsed['Regalo'][i]['ID_Catalogo'];
								   cel2.innerHTML = parsed['Regalo'][i]['Producto'];

								   	let boton1 = document.createElement("button");
								    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
								    boton1.setAttribute('name', 'name_Productos');
								    boton1.addEventListener("click",window.Eliminar_Regalo_Editar);
								    cel3.appendChild(boton1);

								    let icono1 = document.createElement("span");
								    icono1.classList.add('glyphicon', 'glyphicon-trash');
								    boton1.appendChild(icono1);
								}
						}

						if (parsed['Oferta'][0]['Excluir_Distribuidores'] == 1)
						{
							$("#check_Excluir_Oferta_Editar").prop('checked',true);
							$("#Div_Table_Distribuidor_Oferta_Editar").css('display', '');

								for (var i = 0; i < parsed['Cliente'].length; i++)
							    {
							       let row  = tbody_Distribuidor.insertRow(i);
						           let cel1 = row.insertCell(0);
						           let cel2 = row.insertCell(1);
						           let cel3 = row.insertCell(2);

						           cel1.innerHTML = parsed['Cliente'][i]['ID_Cliente'];
								   cel2.innerHTML = parsed['Cliente'][i]['Cliente'];

								   	let boton1 = document.createElement("button");
								    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
								    boton1.setAttribute('name', 'name_Productos');
								    boton1.addEventListener("click",window.Eliminar_Distribuidor_Oferta_Editar);
								    cel3.appendChild(boton1);

								    let icono1 = document.createElement("span");
								    icono1.classList.add('glyphicon', 'glyphicon-trash');
								    boton1.appendChild(icono1);
								}
						}
						else
						{
							$("#check_Excluir_Oferta_Editar").prop('checked',false);
							$("#Div_Table_Distribuidor_Oferta_Editar").css('display', 'none');
						}

						if (parsed['Oferta'][0]['Status'] == 'Inactivo')
                		{
                			$("#check_Status_Oferta_Editar").prop('checked', true);
                		}
                		else
                		{
                			$("#check_Status_Oferta_Editar").prop('checked', false);
                		}

                		for (var i = 0; i < parsed['Division'].length; i++)
					    {
					       let row  = tbody_Division.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = parsed['Division'][i]['ID_Division'];
						   cel2.innerHTML = parsed['Division'][i]['Division'];

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Division_Editar);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);
						}

						for (var i = 0; i < parsed['Linea'].length; i++)
					    {
					       let row  = tbody_Linea.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = parsed['Linea'][i]['ID_Linea'];
						   cel2.innerHTML = parsed['Linea'][i]['Linea'];

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Linea_Editar);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);
						}

						for (var i = 0; i < parsed['Sublinea'].length; i++)
					    {
					       let row  = tbody_Sublinea.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = parsed['Sublinea'][i]['ID_Sublinea'];
						   cel2.innerHTML = parsed['Sublinea'][i]['Sublinea'];

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Sublinea_Editar);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);
						}

						for (var i = 0; i < parsed['Producto'].length; i++)
					    {
					       let row  = tbody_Producto.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = parsed['Producto'][i]['ID_Producto'];
						   cel2.innerHTML = parsed['Producto'][i]['Producto'];

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Producto_Oferta_Editar);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);
						}

						for (var i = 0; i < parsed['Sucursal'].length; i++)
					    {
					       let row  = tbody_Sucursal.insertRow(i);
				           let cel1 = row.insertCell(0);
				           let cel2 = row.insertCell(1);
				           let cel3 = row.insertCell(2);

				           cel1.innerHTML = parsed['Sucursal'][i]['ID_Sucursal'];
						   cel2.innerHTML = parsed['Sucursal'][i]['Sucursal'];

						   	let boton1 = document.createElement("button");
						    boton1.classList.add('btn', 'btn-danger', 'btn-xs','btn-flat');
						    boton1.setAttribute('name', 'name_Productos');
						    boton1.addEventListener("click",window.Eliminar_Sucursal_Oferta_Editar);
						    cel3.appendChild(boton1);

						    let icono1 = document.createElement("span");
						    icono1.classList.add('glyphicon', 'glyphicon-trash');
						    boton1.appendChild(icono1);
						}

                		$("#myModal_Oferta_Editar_Editar").modal("show");
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
            toastr.warning('Seleccione una oferta', 'Advertencia');
	}
}

