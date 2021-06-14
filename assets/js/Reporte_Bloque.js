window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';

$(document).ready(function(){

	$("#select_Sucursal").change(function(event) {
		/* Act on the event */

		if (window.grafica) {
			window.grafica.clear();
			window.grafica.destroy();
		}

		if (window.bar) {
			window.bar.clear();
			window.bar.destroy();
		}

		let Sucursal = $("#select_Sucursal").val();

		if (Sucursal != null && Sucursal != "")
		{
			$('#Table_Bloque').DataTable().destroy();
			let Table_Bloque    = document.getElementById("Table_Bloque"); 
			Table_Bloque.tBodies[0].innerHTML = "";

			Grafica_Ventas(Sucursal);
			fetch_data(Sucursal);
		}
		else
		{
			$('#Table_Bloque').DataTable().destroy();
			let Table_Bloque    = document.getElementById("Table_Bloque"); 
			Table_Bloque.tBodies[0].innerHTML = "";

			let ctx = document.getElementById("Grafica_Bloque").getContext('2d');                
            window.bar = new Chart(ctx, {
				  type: 'bar',
				  data: {
				    datasets: [{
				          label: 'Total',
				          data: [0, 0, 0, 0,0],
				          backgroundColor: [
			                  'rgba(255, 206, 86, 0.2)',
			                  'rgba(255, 206, 86, 0.2)',
			                  'rgba(255, 206, 86, 0.2)',
			                  'rgba(255, 206, 86, 0.2)',
			                  'rgba(255, 206, 86, 0.2)'
			              ],
			              borderColor: [
			                  'rgba(255, 206, 86, 1)',
			                  'rgba(255, 206, 86, 1)',
			                  'rgba(255, 206, 86, 1)',
			                  'rgba(255, 206, 86, 1)',
			                  'rgba(255, 206, 86, 1)'
			              ],
			              borderWidth: 1
				        }, {
				          label: 'Total Distr.',
				          data: [0, 0, 0, 0,0],
				          backgroundColor: [
			                  'rgba(75, 192, 192, 0.2)',
			                  'rgba(75, 192, 192, 0.2)',
			                  'rgba(75, 192, 192, 0.2)',
			                  'rgba(75, 192, 192, 0.2)',
			                  'rgba(75, 192, 192, 0.2)'
			              ],
			              borderColor: [
			                  'rgba(75, 192, 192, 1)',
			                  'rgba(75, 192, 192, 1)',
			                  'rgba(75, 192, 192, 1)',
			                  'rgba(75, 192, 192, 1)',
			                  'rgba(75, 192, 192, 1)'
			              ],
			              borderWidth: 1,

				          // Changes this dataset to become a line
				          type: 'bar'
				        }],
				    labels: ["","","","",""]
				  },
				  options: {
				          scales: {
				              yAxes: [{
				                  ticks: {
				                      beginAtZero:true
				                  }
				              }]
				          }
				      }
				});
		}
	});

});


function Grafica_Ventas(idSucursal)
{
  ////// Graficas para el menu de inicio /////

  if (idSucursal != null && idSucursal != "")
  {
  	var formData = new FormData();
  	formData.append("idSucursal", idSucursal);

    $.ajax({
           url: dir + 'index.php/Controller_Reporte_Bloques/Get_Top_5_Bloques',
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

           		switch(parsed['bloques'].length)
           		{
           			case 5:
           				var ctx = document.getElementById("Grafica_Bloque").getContext('2d');                
	                window.bar = new Chart(ctx, {
						  type: 'bar',
						  data: {
						    datasets: [{
						          label: 'Total',
						          data: [parsed['bloques'][0]['Total_Venta'], parsed['bloques'][1]['Total_Venta'], parsed['bloques'][2]['Total_Venta'], parsed['bloques'][3]['Total_Venta'],parsed['bloques'][4]['Total_Venta']],
						          backgroundColor: [
					                  'rgba(255, 206, 86, 0.2)',
					                  'rgba(255, 206, 86, 0.2)',
					                  'rgba(255, 206, 86, 0.2)',
					                  'rgba(255, 206, 86, 0.2)',
					                  'rgba(255, 206, 86, 0.2)'
					              ],
					              borderColor: [
					                  'rgba(255, 206, 86, 1)',
					                  'rgba(255, 206, 86, 1)',
					                  'rgba(255, 206, 86, 1)',
					                  'rgba(255, 206, 86, 1)',
					                  'rgba(255, 206, 86, 1)'
					              ],
					              borderWidth: 1
						        }, {
						          label: 'Total Distr.',
						          data: [parsed['bloques'][0]['Total_Venta_Distr'], parsed['bloques'][1]['Total_Venta_Distr'], parsed['bloques'][2]['Total_Venta_Distr'], parsed['bloques'][3]['Total_Venta_Distr'],parsed['bloques'][4]['Total_Venta_Distr']],
						          backgroundColor: [
					                  'rgba(75, 192, 192, 0.2)',
					                  'rgba(75, 192, 192, 0.2)',
					                  'rgba(75, 192, 192, 0.2)',
					                  'rgba(75, 192, 192, 0.2)',
					                  'rgba(75, 192, 192, 0.2)'
					              ],
					              borderColor: [
					                  'rgba(75, 192, 192, 1)',
					                  'rgba(75, 192, 192, 1)',
					                  'rgba(75, 192, 192, 1)',
					                  'rgba(75, 192, 192, 1)',
					                  'rgba(75, 192, 192, 1)'
					              ],
					              borderWidth: 1,

						          // Changes this dataset to become a line
						          type: 'bar'
						        }],
						    labels: [parsed['bloques'][0]['Bloque'], parsed['bloques'][1]['Bloque'], parsed['bloques'][2]['Bloque'], parsed['bloques'][3]['Bloque'], parsed['bloques'][4]['Bloque']]
						  },
						  options: {
						          scales: {
						              yAxes: [{
						                  ticks: {
						                      beginAtZero:true
						                  }
						              }]
						          }
						      }
						});
	                break;
				    case 4:
		           		var ctx = document.getElementById("Grafica_Bloque").getContext('2d');                
			                window.bar = new Chart(ctx, {
								  type: 'bar',
								  data: {
								    datasets: [{
								          label: 'Total',
								          data: [parsed['bloques'][0]['Total_Venta'], parsed['bloques'][1]['Total_Venta'], parsed['bloques'][2]['Total_Venta'], parsed['bloques'][3]['Total_Venta'],0],
								          backgroundColor: [
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)'
							              ],
							              borderColor: [
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)'
							              ],
							              borderWidth: 1
								        }, {
								          label: 'Total Distr.',
								          data: [parsed['bloques'][0]['Total_Venta_Distr'], parsed['bloques'][1]['Total_Venta_Distr'], parsed['bloques'][2]['Total_Venta_Distr'], parsed['bloques'][3]['Total_Venta_Distr'],0],
								          backgroundColor: [
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)'
							              ],
							              borderColor: [
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)'
							              ],
							              borderWidth: 1,

								          // Changes this dataset to become a line
								          type: 'bar'
								        }],
								    labels: [parsed['bloques'][0]['Bloque'],parsed['bloques'][1]['Bloque'],parsed['bloques'][2]['Bloque'],parsed['bloques'][3]['Bloque'],""]
								  },
								  options: {
								          scales: {
								              yAxes: [{
								                  ticks: {
								                      beginAtZero:true
								                  }
								              }]
								          }
								      }
								});
				        break;
				    case 3:
		           		var ctx = document.getElementById("Grafica_Bloque").getContext('2d');                
			                window.bar = new Chart(ctx, {
								  type: 'bar',
								  data: {
								    datasets: [{
								          label: 'Total',
								          data: [parsed['bloques'][0]['Total_Venta'], parsed['bloques'][1]['Total_Venta'], parsed['bloques'][2]['Total_Venta'], 0,0],
								          backgroundColor: [
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)'
							              ],
							              borderColor: [
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)'
							              ],
							              borderWidth: 1
								        }, {
								          label: 'Total Distr.',
								          data: [parsed['bloques'][0]['Total_Venta_Distr'], parsed['bloques'][1]['Total_Venta_Distr'], parsed['bloques'][2]['Total_Venta_Distr'], 0,0],
								          backgroundColor: [
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)'
							              ],
							              borderColor: [
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)'
							              ],
							              borderWidth: 1,

								          // Changes this dataset to become a line
								          type: 'bar'
								        }],
								    labels: [parsed['bloques'][0]['Bloque'],parsed['bloques'][1]['Bloque'],parsed['bloques'][2]['Bloque'],"",""]
								  },
								  options: {
								          scales: {
								              yAxes: [{
								                  ticks: {
								                      beginAtZero:true
								                  }
								              }]
								          }
								      }
								});
				        break;
				    case 2:
				    	var ctx = document.getElementById("Grafica_Bloque").getContext('2d');                
			                window.bar = new Chart(ctx, {
								  type: 'bar',
								  data: {
								    datasets: [{
								          label: 'Total',
								          data: [parsed['bloques'][0]['Total_Venta'], parsed['bloques'][1]['Total_Venta'], 0, 0,0],
								          backgroundColor: [
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)'
							              ],
							              borderColor: [
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)'
							              ],
							              borderWidth: 1
								        }, {
								          label: 'Total Distr.',
								          data: [parsed['bloques'][0]['Total_Venta_Distr'], parsed['bloques'][1]['Total_Venta_Distr'], 0, 0,0],
								          backgroundColor: [
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)'
							              ],
							              borderColor: [
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)'
							              ],
							              borderWidth: 1,

								          // Changes this dataset to become a line
								          type: 'bar'
								        }],
								    labels: [parsed['bloques'][0]['Bloque'],parsed['bloques'][1]['Bloque'],"","",""]
								  },
								  options: {
								          scales: {
								              yAxes: [{
								                  ticks: {
								                      beginAtZero:true
								                  }
								              }]
								          }
								      }
								});
				        break;
				    case 1:
		           		var ctx = document.getElementById("Grafica_Bloque").getContext('2d');                
			                window.bar = new Chart(ctx, {
								  type: 'bar',
								  data: {
								    datasets: [{
								          label: 'Total',
								          data: [parsed['bloques'][0]['Total_Venta'], 0, 0, 0,0],
								          backgroundColor: [
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)'
							              ],
							              borderColor: [
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)'
							              ],
							              borderWidth: 1
								        }, {
								          label: 'Total Distr.',
								          data: [parsed['bloques'][0]['Total_Venta_Distr'], 0, 0, 0,0],
								          backgroundColor: [
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)'
							              ],
							              borderColor: [
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)'
							              ],
							              borderWidth: 1,

								          // Changes this dataset to become a line
								          type: 'bar'
								        }],
								    labels: [parsed['bloques'][0]['Bloque'],"","","",""]
								  },
								  options: {
								          scales: {
								              yAxes: [{
								                  ticks: {
								                      beginAtZero:true
								                  }
								              }]
								          }
								      }
								});
				        break;
				    case 0:
					        var ctx = document.getElementById("Grafica_Bloque").getContext('2d');                
			                window.bar = new Chart(ctx, {
								  type: 'bar',
								  data: {
								    datasets: [{
								          label: 'Total',
								          data: [0, 0, 0, 0,0],
								          backgroundColor: [
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(255, 206, 86, 0.2)'
							              ],
							              borderColor: [
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)',
							                  'rgba(255, 206, 86, 1)'
							              ],
							              borderWidth: 1
								        }, {
								          label: 'Total Distr.',
								          data: [0, 0, 0, 0,0],
								          backgroundColor: [
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)',
							                  'rgba(75, 192, 192, 0.2)'
							              ],
							              borderColor: [
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)',
							                  'rgba(75, 192, 192, 1)'
							              ],
							              borderWidth: 1,

								          // Changes this dataset to become a line
								          type: 'bar'
								        }],
								    labels: ["","","","",""]
								  },
								  options: {
								          scales: {
								              yAxes: [{
								                  ticks: {
								                      beginAtZero:true
								                  }
								              }]
								          }
								      }
								});
				        break;
				}
           	
                
           }
    })
    .done(function() {
           $('#Cargando_Header').css('display','none');
    })
    .fail(function() {
           console.log("error");
    })
    .always(function() {
           $('#Cargando_Header').css('display','none');
    });
  }
}


function fetch_data(idSucursal){

  var dataTable = $('#Table_Bloque').DataTable({
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
                        return  "<button type='button' class='btn btn-default btn-xs btn-flat' onclick='verDetalleBloque("+full[0]+");'><i class='fa fa-eye'></i></button> <button type='button' class='btn btn-primary btn-xs btn-flat' onclick='verReporte("+full[0]+",\""+full[1]+"\");'><i class='fa fa-area-chart'></i></button>"
                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
                },

            ], 
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
    ],
    "ajax" : {

        url: window.dir + "Clases/fetch_Reporte_Bloque.php",
        type: "POST",
        data:{
              idSucursal:idSucursal
            }
    }
  });
}

function verDetalleBloque(idBloque)
{
	console.log("ID Bloque: " + idBloque);

	var formData = new FormData();
    formData.append("idBloque", idBloque);

    $.ajax({
           url: window.dir + 'index.php/Controller_Reporte_Bloques/Get_Ventas_By_ID_Bloque',
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

           		 let parsed = JSON.parse(data);

           		 console.log(parsed);

	            if (parsed != null && parsed != "")
	            {
            		let Detalle_Venta_Menudeo   = document.getElementById("Table_Venta_Semanal_Detalle"); 
            		let tbody_Detalle   	   = Detalle_Venta_Menudeo.tBodies[0];

            		$('#Table_Venta_Semanal_Detalle').DataTable().destroy();
            		Detalle_Venta_Menudeo.tBodies[0].innerHTML = "";

            		    for (var i = 0; i < parsed['Ventas'].length; i++) 
		                {

		                 let row  = tbody_Detalle.insertRow(i);
		                 let cel1 = row.insertCell(0);
		                 let cel2 = row.insertCell(1);
		                 let cel3 = row.insertCell(2);
		                 let cel4 = row.insertCell(3);
		                 let cel5 = row.insertCell(4);
		                 let cel6 = row.insertCell(5);
		                 let cel7 = row.insertCell(6);
		                 let cel8 = row.insertCell(7);
		                 let cel9 = row.insertCell(8);

		                 cel1.innerHTML = parsed['Ventas'][i]['ID'];
		                 cel2.innerHTML = parsed['Ventas'][i]['Fecha_venta'];
		                 cel3.innerHTML = parsed['Ventas'][i]['Distribuidor'];
		                 cel4.innerHTML = parsed['Ventas'][i]['Descuento'];
		                 cel5.innerHTML = parsed['Ventas'][i]['Subtotal'];
		                 cel6.innerHTML = parsed['Ventas'][i]['Impuestos'];
		                 cel7.innerHTML = parsed['Ventas'][i]['Total'];
		                 cel8.innerHTML = parsed['Ventas'][i]['Adeudo'];
		                 cel9.innerHTML = parsed['Ventas'][i]['Status'];
		                
		                }

		                fetch_Detalle_Venta_Detalle();
	            }

           		$("#myModal").modal("show");
           }
    })
    .done(function() {
           $('#Cargando_Header').css('display','none');
    })
    .fail(function() {
           console.log("error");
    })
    .always(function() {
    });
}

function fetch_Detalle_Venta_Detalle()
{
 $('#Table_Venta_Semanal_Detalle').dataTable({
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


function verReporte(idBloque,Bloque)
{
	var formData = new FormData();
  formData.append("idBloque", idBloque);

    $.ajax({
           url: window.dir + 'index.php/Controller_Reporte_Bloques/Get_Reporte_By_Cliente',
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

           		if (window.grafica_Cliente) {
					window.grafica_Cliente.clear();
					window.grafica_Cliente.destroy();
				}

           		$("#myModal_Grafica_Cliente").modal("show");
           		//$("#div_Grafica_Cliente").css("display",'')
           		$("#titulo_Modal").text("Grafica de " + Bloque);
           		console.log(data);

           		 let parsed = JSON.parse(data);

           		 let labels = new Array();
           		 let datos =  new Array();
           		 let datos_Cuota =  new Array();

           		 console.log(parsed);

           		 
           		 if (parsed['Cliente3'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente3'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -3' + ' (' + parsed['Cliente3'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente3'][i]['Total_Mes']);
	           		 	//datos_Cuota.push(parseFloat(parsed['Cliente3'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -3');
	           		 	datos.push(0.00);
	           		 	//datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente2'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente2'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -2' + ' (' + parsed['Cliente2'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente2'][i]['Total_Mes']);
	           		 	//datos_Cuota.push(parseFloat(parsed['Cliente2'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -2');
	           		 	datos.push(0.00);
	           		 	//datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente1'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente1'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -1' + ' (' + parsed['Cliente1'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente1'][i]['Total_Mes']);
	           		 	//datos_Cuota.push(parseFloat(parsed['Cliente1'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -1');
	           		 	datos.push(0.00);
	           		 	//datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual' + ' (' + parsed['Cliente'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente'][i]['Total_Mes']);
	           		 	//datos_Cuota.push(parseFloat(parsed['Cliente'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 
           		var ctx = document.getElementById("Grafica_Linea_Cliente").getContext('2d');
		        window.grafica_Cliente = new Chart(ctx, {
		              type: 'line',
		              data: {
		                  labels: labels,
		                  datasets: [{
		                      label: '$ Ventas',
		                      data: datos,
		                      borderColor: "rgb(0,94,187,0.2)",
		                      borderWidth: 3,
		                      backgroundColor: "transparent",
		                        strokeColor : "rgb(0,94,187,1)",
		                        pointColor : "rgb(0,94,187,1)",
		                        pointStrokeColor : "#005ebb",                      
		                  }]
		              },
		              options: {
		              	responsive: true,
    					maintainAspectRatio: false
		              }
		          });


		        $("#div_dialog").addClass('modal-lg');
           }
    })
    .done(function() {
           $('#Cargando_Header').css('display','none');
    })
    .fail(function() {
           console.log("error");
    })
    .always(function() {
    });
}