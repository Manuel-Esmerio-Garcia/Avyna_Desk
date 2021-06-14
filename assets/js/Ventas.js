window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.Tabla_Menudeo = null;
window.Tabla_Eliminar = null;

$(document).ready(function() {

$('.input-daterange').datepicker({
  format: "yyyy-mm-dd",
  autoclose: true
});

fetch_data_Venta_Menudeo('no','','','','');

$("#exampleFormControlSelect2").change(function(e){

	let Cliente  = $('#exampleFormControlSelect2').val();
	let Sucursal = $('#exampleFormControlSelect3').val();
	let Inicio   = $("#start_date").val();
	let Fin      = $("#end_date").val();

	if (Cliente != '' && Cliente != '')
	{
		if (Inicio != null && Inicio != "" && Fin != null && Fin != "")
		{
			$('#Table_Ventas_Menudeo').DataTable().destroy();
    		fetch_data_Venta_Menudeo('yes', Inicio,Fin,Cliente,Sucursal);
		}
		else
		{
			$('#Table_Ventas_Menudeo').DataTable().destroy();
    		fetch_data_Venta_Menudeo('no', '','',Cliente,Sucursal);
		}    	

  	}
  	else
  	{

  		if (Inicio != null && Inicio != "" && Fin != null && Fin != "")
		{
			$('#Table_Ventas_Menudeo').DataTable().destroy();
    		fetch_data_Venta_Menudeo('yes', Inicio,Fin,'',Sucursal);
		}
		else
		{
			$('#Table_Ventas_Menudeo').DataTable().destroy();
    		fetch_data_Venta_Menudeo('no', '','','',Sucursal);
		}  
  }

});

$("#exampleFormControlSelect3").change(function(e){

	let Cliente  = $('#exampleFormControlSelect2').val();
	let Sucursal = $('#exampleFormControlSelect3').val();
	let Inicio   = $("#start_date").val();
	let Fin      = $("#end_date").val();

	if (Cliente != '' && Cliente != '')
	{
		if (Inicio != null && Inicio != "" && Fin != null && Fin != "")
		{
			$('#Table_Ventas_Menudeo').DataTable().destroy();
    		fetch_data_Venta_Menudeo('yes', Inicio,Fin,Cliente,Sucursal);
		}
		else
		{
			$('#Table_Ventas_Menudeo').DataTable().destroy();
    		fetch_data_Venta_Menudeo('no', '','',Cliente,Sucursal);
		}    	

  	}
  	else
  	{

  		if (Inicio != null && Inicio != "" && Fin != null && Fin != "")
		{
			$('#Table_Ventas_Menudeo').DataTable().destroy();
    		fetch_data_Venta_Menudeo('yes', Inicio,Fin,'',Sucursal);
		}
		else
		{
			$('#Table_Ventas_Menudeo').DataTable().destroy();
    		fetch_data_Venta_Menudeo('no', '','','',Sucursal);
		}  
  }

});

$("#search").click(function(){

  let start_date = $('#start_date').val();
  let end_date   = $('#end_date').val();
  let Cliente    = $('#exampleFormControlSelect2').val();

  if (start_date != '' && end_date != '')
  {
  	if (Cliente != null && Cliente != "")
  	{
  		$('#Table_Ventas_Menudeo').DataTable().destroy();
		fetch_data_Venta_Menudeo('yes', start_date, end_date,Cliente,window.ID_Bodega);
  	}
  	else
  	{
  		$('#Table_Ventas_Menudeo').DataTable().destroy();
		fetch_data_Venta_Menudeo('yes', start_date, end_date,'',window.ID_Bodega);
  	}   

  }else{

  	if (Cliente != null && Cliente != "")
  	{
  		$('#Table_Ventas_Menudeo').DataTable().destroy();
		fetch_data_Venta_Menudeo('no', '', '',Cliente,window.ID_Bodega);
  	}
  	else
  	{
  		$('#Table_Ventas_Menudeo').DataTable().destroy();
		fetch_data_Venta_Menudeo('no', '', '','',window.ID_Bodega);
  	}

  }

});


$("#exampleFormControlSelect4").change(function(event) {

	let Distribuidor    = $('#exampleFormControlSelect4').val();

	let Table_Eliminar_Venta   = document.getElementById("Table_Eliminar_Venta"); 
	let tbody_Eliminar   	   = Table_Eliminar_Venta.tBodies[0];

	if (Distribuidor != null && Distribuidor != "")
	{
		$('#Table_Eliminar_Venta').DataTable().destroy();
		Table_Eliminar_Venta.tBodies[0].innerHTML = "";

		fetch_Eliminar_Venta(Distribuidor);
	}
	else
	{
		$('#Table_Eliminar_Venta').DataTable().destroy();
		Table_Eliminar_Venta.tBodies[0].innerHTML = "";
	}
});


$("#btnGenerarVentaDistribuidores").click(function(event) {
	
	$("#modalVentaDistribuidores").modal("show");
});

$("#selectVentaDistribuidor").change(function(event) {

	let Distri = $("#selectVentaDistribuidor").val();

	if (Distri != "")
	{
		let fetchDistribuidor   = document.getElementById("fetchVentasDistribuidor"); 
		let tbody_Distribuidor  = fetchDistribuidor.tBodies[0];
		$('#fetchVentasDistribuidor').DataTable().destroy();
		fetchDistribuidor.tBodies[0].innerHTML = "";
		fetchVentaDistribuidor(Distri);
	}
	else
	{
		let fetchDistribuidor   = document.getElementById("fetchVentasDistribuidor"); 
		let tbody_Distribuidor  = fetchDistribuidor.tBodies[0];
		$('#fetchVentasDistribuidor').DataTable().destroy();
		fetchDistribuidor.tBodies[0].innerHTML = "";
	}
});


$("#btnEnviarPedido").click(function(event) {
	
	let Test_Pedido_Table   = document.getElementById("fetchVentasDistribuidor");
    let Test_Pedido_body    = Test_Pedido_Table.getElementsByTagName("tbody")[0];
    let idCliente 			= $("#selectVentaDistribuidor").val();
    let Contador 			= 0;

	if (Test_Pedido_body.rows.length > 0)
	{
		if (Test_Pedido_body.rows[0].cells[0].innerHTML != 'Lo sentimos. No se encontraron registros.')
		{
			for (var i = 0; i < Test_Pedido_body.rows.length; i++)
			{
				if (Test_Pedido_body.rows[i].cells[0].childNodes[0].childNodes[0].checked == true)
				{
					Contador ++;
				}
			}

			if (Contador >= 1)
			{			
				if (idCliente != "")
				{
					var formData = new FormData();
				    formData.append("idCliente", idCliente);

				    $.ajax({
			            url: window.dir + 'index.php/Controller_Ventas/Get_Count_Ventas',
			            type: 'POST',
			            processData: false,
			            contentType: false,
			            timeout: 35000,
			            data: formData,
			            beforeSend : function ()
			            {
			                $('#btnEnviarPedido').css('display','none');
			                $('#loadingEnviarPedido').css('display','');
			                $('#btnCerrarEnviarPedido').css('display','none');
			                $('#loadingCerrarEnviarPedido').css('display','');
			            },
			            success: function(data)
			            {
			            	let parsed = JSON.parse(data);
			            	console.log(parsed);

			            	//if (parsed['Contador'] == 0)
		                	//{
		                		swal({
								  title: "¿Esta seguro que desea enviar el pedido?",
								  text: "Una vez enviado se genera una venta",
								  icon: "warning",
								  buttons: true,
								  dangerMode: true,
								})
								.then((willDelete) => {
									if (willDelete)
									{
									    let idPedido = new Array();

										let Productos       = document.getElementById("fetchVentasDistribuidor"); 
										let Tbody 			= Productos.tBodies[0];

										let idSucursal = parsed['Cliente'][0]['idSucursal'];
										let Total 	   = $("#spanMontoDistribuidor").text();
										let Precio_Pu  = $("#spanMontoPublico").text();
										let Cantidad   = Contador;

										let Descuento = Precio_Pu - Total;
										let Subtotal  = Total / 1.16;
										let Impuesto  = Subtotal * 0.16;

										for (var i = 0; i < Tbody.rows.length; i++)
										{
											if (Tbody.rows[i].cells[0].childNodes[0].childNodes[0].checked == true)
											{
												idPedido.push(Tbody.rows[i].cells[1].innerHTML);
											}
										}

										var formData = new FormData();
										formData.append("idPedido", idPedido);
										formData.append("idCliente", idCliente);
										formData.append("Total", Math.round(Total));
										formData.append("Adeudo", Math.round(Total));
										formData.append("Descuento", parseFloat(Descuento).toFixed(2));
										formData.append("Impuesto", parseFloat(Impuesto).toFixed(2));
										formData.append("Subtotal", parseFloat(Subtotal).toFixed(2));
										formData.append("Pedidos", Cantidad);
										formData.append("Status", 'Adeudo');
										formData.append("Extraido", 0);
										formData.append("Empaquetado", 0);
										formData.append("Timbrado", 0);
										formData.append("Tipo_Factura", 0);
										formData.append("idSucursal", idSucursal);
										formData.append("Compra_minima", Precio_Pu);

										$.ajax({
									    url: window.dir + 'index.php/Controller_Ventas/enviarPedido',
									    type: 'POST',
									    processData: false,  // tell jQuery not to process the data
									    contentType: false,
									    timeout: 35000,
									    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
									    data: formData,
									    beforeSend : function ()
									    {
									        $('#btnEnviarPedido').css('display','none');
									        $('#loadingEnviarPedido').css('display','');
									        $('#btnCerrarEnviarPedido').css('display','none');
									        $('#loadingCerrarEnviarPedido').css('display','');
									    },
									    success: function(data)
									    {
									        console.log(data);
									        if (data == 1)
						                    {
								                let Productos       = document.getElementById("fetchVentasDistribuidor"); 
												let tbody = Productos.tBodies[0];
												$('#fetchVentasDistribuidor').DataTable().destroy();
												Productos.tBodies[0].innerHTML = "";

												$("#selectVentaDistribuidor").val("");
								                $("#modalVentaDistribuidores").modal("hide");
								                $("#spanCantidad").text("0");
												$("#spanMontoPublico").text("0.00");
												$("#spanMontoSalon").text("0.00");
												$("#spanMontoDistribuidor").text("0.00");

								                toastr.success('Pedido enviado con exito', 'Correcto');
						                    }
						                    else if (data == 3)
						                    {
								                toastr.error('El pedido no cumple con la compra minima requerida', 'Error');
						                    }
						                    else
						                    {
								                toastr.error('Ocurrio un error al enviar el pedido', 'Error');
						                    }
									    }
									    })
									    .done(function() {
									        $('#btnEnviarPedido').css('display','');
									        $('#loadingEnviarPedido').css('display','none');
									        $('#btnCerrarEnviarPedido').css('display','');
									        $('#loadingCerrarEnviarPedido').css('display','none');
									    })
									    .fail(function() {
									        $('#btnEnviarPedido').css('display','');
									        $('#loadingEnviarPedido').css('display','none');
									        $('#btnCerrarEnviarPedido').css('display','');
									        $('#loadingCerrarEnviarPedido').css('display','none');
									    })
									    .always(function() {
									    });
									} 
								});
		                	//}
		                	//else
		                	//{
				            //    toastr.warning('Existen ventas sin facturas', 'Advertencia');
		                	//}
			            }
			            })
					    .done(function() {
					        $('#btnEnviarPedido').css('display','');
			                $('#loadingEnviarPedido').css('display','none');
			                $('#btnCerrarEnviarPedido').css('display','');
			                $('#loadingCerrarEnviarPedido').css('display','none');
					    })
					    .fail(function(jqXHR, textStatus, errorThrown) {
					    	$('#btnEnviarPedido').css('display','');
			                $('#loadingEnviarPedido').css('display','none');
			                $('#btnCerrarEnviarPedido').css('display','');
			                $('#loadingCerrarEnviarPedido').css('display','none');
					    })
					    .always(function() {
					    });
				}
				else
				{
					toastr.warning('Seleccione un distribuidor', 'Advertencia');
				}
			}
			else
			{
				toastr.warning('Debe de seleccionar por lo menos una venta menudeo', 'Advertencia');
			}
		}
		else
		{
			toastr.warning('El distribuidor no cuenta con ningún pedido para enviar', 'Advertencia');
		}
	}
	else
	{
		toastr.warning('El distribuidor no cuenta con ningún pedido para enviar', 'Advertencia');
	}

});


























































$("#btn_Eliminar_Venta_Menudeo").click(function(event) {

	if (window.Tabla_Menudeo != null && window.Tabla_Menudeo != "")
	{
		if (window.Tabla_Menudeo.childNodes[12].childNodes[0].innerHTML != 'Extraido'){
		swal({
		  title: "¿Esta seguro que desea eliminar la venta menudeo?",
		  text: "Una vez eliminada la venta no sera posible restaurarla",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		    
		    var formData = new FormData();
					formData.append("ID", window.Tabla_Menudeo.childNodes[0].innerHTML);

					 $.ajax({
					    url: dir + 'index.php/Controller_Ventas/Eliminar_Venta_menudeo',
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
					    	if (data.trim() == 1)
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
					                "timeOut": "700",
					                "extendedTimeOut": "1000",
					                "showEasing": "swing",
					                "hideEasing": "linear",
					                "showMethod": "fadeIn",
					                "hideMethod": "fadeOut"
					                }

					        	toastr.success('Venta eliminado con exito', 'Correcto');

						        	let Table_Ventas_Menudeo   = document.getElementById("Table_Ventas_Menudeo"); 

									$('#Table_Ventas_Menudeo').DataTable().destroy();
									Table_Ventas_Menudeo.tBodies[0].innerHTML = "";

									let Table_Detalle_Ventas_Menudeo   = document.getElementById("Table_Detalle_Ventas_Menudeo"); 

									$('#Table_Detalle_Ventas_Menudeo').DataTable().destroy();
									Table_Detalle_Ventas_Menudeo.tBodies[0].innerHTML = "";

									fetch_data_Venta_Menudeo('no','','','','');

									$('#exampleFormControlSelect2').val('');
									$('#exampleFormControlSelect3').val('');
									$("#start_date").val('');
									$("#end_date").val('');


						        	window.Tabla_Menudeo = null;
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
					                "timeOut": "700",
					                "extendedTimeOut": "1000",
					                "showEasing": "swing",
					                "hideEasing": "linear",
					                "showMethod": "fadeIn",
					                "hideMethod": "fadeOut"
					                }

					        	toastr.error('Ocurrio un error al eliminar la venta', 'Error');
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

		}else{
			toastr.warning('La venta se encuentra como extraido', 'Advertencia');
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
        toastr.warning('Por favor, seleccione una venta menudeo', 'Advertencia');
	}
});

$("#btn_Eliminar_Venta").click(function(event) {
	
	if (window.Table_Eliminar != null && window.Table_Eliminar != "")
	{
		swal({
		  title: "¿Esta seguro que desea eliminar la venta?",
		  text: "Una vez eliminada la venta no sera posible restaurarla",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {

		  	let idDistribuidor = $("#exampleFormControlSelect4").val();
		    
		    var formData = new FormData();
					formData.append("ID", window.Table_Eliminar.childNodes[0].innerHTML);
					formData.append("idDistribuidor", idDistribuidor);

					 $.ajax({
					    url: dir + 'index.php/Controller_Ventas/Eliminar_Venta',
					    type: 'POST',
					    processData: false,  // tell jQuery not to process the data
					    contentType: false,
					    timeout: 35000,
					    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
					    data: formData,
					    beforeSend : function ()
					    {
					        $('#Cargando_Eliminar_Venta').css('display','');
					    },
					    success: function(data)
					    {
					    	console.log(data);


					    	console.log(data);

		                	switch(parseInt(data.trim())){

		                		case 1:
		                			toastr.success('Venta eliminado con exito', 'Correcto');
		                			let Table_Eliminar_Venta   = document.getElementById("Table_Eliminar_Venta"); 

									$('#Table_Eliminar_Venta').DataTable().destroy();
									Table_Eliminar_Venta.tBodies[0].innerHTML = "";

						        	$("#Modal_Eliminar_Venta").modal("hide");

						        	$("#exampleFormControlSelect4").val("");

						        	window.Table_Eliminar = null;
		                		break;

		                		case 0:
		                			toastr.error('Ocurrio un error al eliminar la venta', 'Error');
		                		break;

		                		case 2:
		                			toastr.error('No es posible eliminar la venta ya que se encuentra facturada', 'Error');
		                		break;
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
					        $('#Cargando_Eliminar_Venta').css('display','none');
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
        toastr.warning('Por favor, seleccione una venta', 'Advertencia');
	}
});

$("#btn_Regresar_Venta").click(function(event) {
	
	if (window.Table_Eliminar != null && window.Table_Eliminar != "")
	{
		swal({
		  title: "¿Esta seguro que desea regresar la venta?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  	if (willDelete) {

			  	let idDistribuidor = $("#exampleFormControlSelect4").val();
			    
			    var formData = new FormData();
				formData.append("ID", window.Table_Eliminar.childNodes[0].innerHTML);
				formData.append("idDistribuidor", idDistribuidor);

				$.ajax({
				    url: dir + 'index.php/Controller_Ventas/regresarVenta',
				    type: 'POST',
				    processData: false,  // tell jQuery not to process the data
				    contentType: false,
				    timeout: 800000,
				    data: formData,
				    beforeSend : function ()
				    {
				        $('#Cargando_Eliminar_Venta').css('display','');
				    },
				    success: function(data)
				    {
				    	console.log(data);

	                	switch(parseInt(data.trim())){

	                		case 1:
	                			toastr.success('Venta regresada con exito', 'Correcto');
	                			let Table_Eliminar_Venta   = document.getElementById("Table_Eliminar_Venta"); 

								$('#Table_Eliminar_Venta').DataTable().destroy();
								Table_Eliminar_Venta.tBodies[0].innerHTML = "";

					        	$("#Modal_Eliminar_Venta").modal("hide");

					        	$("#exampleFormControlSelect4").val("");

					        	window.Table_Eliminar = null;
	                		break;

	                		case 0:
	                			toastr.error('Ocurrio un error al regresar la venta', 'Error');
	                		break;

	                		case 2:
	                			toastr.error('No es posible regresar la venta ya que se encuentra facturada', 'Error');
	                		break;
	                	}
				    }
				})
				.done(function() {
				    $('#Cargando_Eliminar_Venta').css('display','none');
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
				})
				.always(function() {
				});
		  	}
		});
	}
	else{
        toastr.warning('Por favor, seleccione una venta', 'Advertencia');
	}
});

var Table_Eliminar = document.getElementById("Table_Eliminar_Venta");
Table_Eliminar.onclick = function(e)
{
	    window.Table_Eliminar = e.target.parentNode;
}

var Table_Ventas_Menudeo = document.getElementById("Table_Ventas_Menudeo");
Table_Ventas_Menudeo.onclick = function(e)
{
	    window.Tabla_Menudeo = e.target.parentNode;

	    var formData = new FormData();
        formData.append("ID", window.Tabla_Menudeo.childNodes[0].innerHTML);

        $.ajax({
            url: dir + 'index.php/Controller_Ventas/Getinfo_Detalle_Venta_Menudeo',
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
            		let Detalle_Venta_Menudeo   = document.getElementById("Table_Detalle_Ventas_Menudeo"); 
            		let tbody_Detalle   	   = Detalle_Venta_Menudeo.tBodies[0];

            		$('#Table_Detalle_Ventas_Menudeo').DataTable().destroy();
            		Detalle_Venta_Menudeo.tBodies[0].innerHTML = "";

            		    for (var i = 0; i < parsed['Detalle'].length; i++) 
		                {

		                 let row  = tbody_Detalle.insertRow(i);
		                 let cel1 = row.insertCell(0);
		                 let cel2 = row.insertCell(1);
		                 let cel3 = row.insertCell(2);
		                 let cel4 = row.insertCell(3);
		                 let cel5 = row.insertCell(4);
		                 let cel6 = row.insertCell(5);

		                 cel1.innerHTML = parsed['Detalle'][i]['ID'];
		                 cel2.innerHTML = parsed['Detalle'][i]['Codigo'];
		                 cel3.innerHTML = parsed['Detalle'][i]['Producto'];
		                 cel4.innerHTML = parsed['Detalle'][i]['Cantidad'];
		                 cel5.innerHTML = parsed['Detalle'][i]['Precio_unitario'];
		                 cel6.innerHTML = parsed['Detalle'][i]['Importe'];
		                
		                }

		                fetch_Detalle_Venta_Menudeo();
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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// Acciones de la venta

$("#Option_Eliminar_Venta").click(function(event) {
	Cargar_Distribuidor_Eliminar_Venta();
});

$("#Eliminar_Venta_Generada").click(function(event) {
	Cargar_Distribuidor_Eliminar_Venta();
});


});









































































































function Cargar_Distribuidor_Eliminar_Venta()
{
		var formData = new FormData();

        $.ajax({
            url: dir + 'index.php/Controller_Ventas/Get_Distribuidor',
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

		         $("#exampleFormControlSelect4").empty();
		         $("#exampleFormControlSelect4").append("<option value=''>Seleccionar...</option>");

		          for (var i = 0; i < parsed['Distribuidor'].length; i++) 
		          {
		              $("#exampleFormControlSelect4").append("<option value='" + parsed['Distribuidor'][i]['ID'] + "'>" + parsed['Distribuidor'][i]['Nombre'] + parsed['Distribuidor'][i]['Apellidos'] + "</option>");
		          }

		          $("#Modal_Eliminar_Venta").modal("show");

		            let Tabla_Eliminar_Venta   = document.getElementById("Table_Eliminar_Venta"); 
            		$('#Table_Eliminar_Venta').DataTable().destroy();
            		Tabla_Eliminar_Venta.tBodies[0].innerHTML = "";

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

function fetch_data_Venta_Menudeo(is_date_search, start_date='', end_date='', Cliente='',idSucursal= '')
{
	var dataTable = $('#Table_Ventas_Menudeo').DataTable({
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
                    "targets": 12,
                    'render': function (data, type, full, meta)
                    {
                        if (full[12] == '1')
                        {
                        	return "<label class='label label-success'>Extraido</label>"
                        }
                        else
                        {
                        	return "<label class='label label-danger'>Sin Extraer</label>"
                        }

                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                },

            ],
		 "ajax" : {

            url: dir + "Clases/fetch_Venta_Menudeo.php",
            type: "POST",
            data:{
              is_date_search:is_date_search, start_date:start_date, end_date:end_date, Cliente:Cliente, idSucursal:idSucursal
            }
        }
		});
}

function fetch_Eliminar_Venta(idDistribuidor)
{
		var dataTable = $('#Table_Eliminar_Venta').DataTable({
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
		 "ajax" : {

            url: dir + "Clases/fetch_Eliminar_Venta.php",
            type: "POST",
            data:{
              idDistribuidor:idDistribuidor
            }
        }
		});
}

function fetch_Detalle_Venta_Menudeo()
{
  $('#Table_Detalle_Ventas_Menudeo').dataTable({
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


function fetchVentaDistribuidor(idCliente)
{
	var dataTable = $('#fetchVentasDistribuidor').DataTable({
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
		"paging": false,
		"select": true,	    
		"order" : [],

		"columnDefs": [
                {
                    "targets": 0,
                    'render': function (data, type, full, meta)
                    {
                    	return '<div class="checkbox"><input type="checkbox" value="" onclick="ObtenerTotales();"><span hidden="hidden">'+full[0]+'</span></div>'                    
                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                },

            ],
		 "ajax" : {

            url: window.dir + "Clases/fetch_Ventas_Distribuidor.php",
            type: "POST",
            data:{
              idCliente:idCliente
            },
            complete:function(){

            	ObtenerTotales();            
        	}  
        }
		});
}


function ObtenerTotales() {
	
	let Test_Pedido_Table         = document.getElementById("fetchVentasDistribuidor");
    let Test_Pedido_body          = Test_Pedido_Table.getElementsByTagName("tbody")[0];


    let Monto_Publico 		= 0.00;
    let Monto_Salon 		= 0.00;
    let Monto_Distribuidor  = 0.00;
    let Cantidad  			= 0;
    let Conta 				= 0;

	if (Test_Pedido_body.rows.length > 0)
	{
		for (var i = 0; i < Test_Pedido_body.rows.length ; i++)
		{
			if (Test_Pedido_body.rows[i].cells[0].innerHTML == 'Lo sentimos. No se encontraron registros.')
			{
				$("#spanCantidad").text("0");
				$("#spanMontoPublico").text("0.00");
				$("#spanMontoSalon").text("0.00");
				$("#spanMontoDistribuidor").text("0.00");

				Conta = 1;
			}
			else
			{
				let Descuento = parseInt(Test_Pedido_body.rows[i].cells[0].childNodes[0].childNodes[1].innerHTML)/100;

				if (Test_Pedido_body.rows[i].cells[0].childNodes[0].childNodes[0].checked == true)
				{					
					Monto_Publico 		+= parseFloat(Test_Pedido_body.rows[i].cells[5].innerHTML);
					Monto_Salon 		+= parseFloat(Test_Pedido_body.rows[i].cells[4].innerHTML);
					Monto_Distribuidor 	+= parseFloat(Test_Pedido_body.rows[i].cells[5].innerHTML - (Test_Pedido_body.rows[i].cells[5].innerHTML * Descuento));
					Cantidad++;

					Conta = 0;
				}
			}
		}

		if (Conta == 0)
		{
			$("#spanCantidad").text(Cantidad);
			$("#spanMontoPublico").text(Math.round(parseFloat(Monto_Publico).toFixed(2)));
			$("#spanMontoSalon").text(Math.round(parseFloat(Monto_Salon).toFixed(2)));
			$("#spanMontoDistribuidor").text(Math.round(parseFloat(Monto_Distribuidor).toFixed(2)));
		}
		else
		{
			$("#spanCantidad").text("0");
			$("#spanMontoPublico").text("0.00");
			$("#spanMontoSalon").text("0.00");
			$("#spanMontoDistribuidor").text("0.00");
		}
	}
	else
	{
		$("#spanCantidad").text("0");
		$("#spanMontoPublico").text("0.00");
		$("#spanMontoSalon").text("0.00");
		$("#spanMontoDistribuidor").text("0.00");
	}
}