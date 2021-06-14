var dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';

window.grafica;
window.bar;

$(document).ready(function(){

	$("#exportar").click(function(event) {
		/* Act on the event */
let idSucursal = $("#select_Sucursal").val();

		var formData = new FormData();
		  formData.append("idSucursal", idSucursal);

		    $.ajax({
		           url: dir + 'index.php/Controller_Reporte_Semanal/Get_Ventas',
		           type: 'POST',
		           processData: false,  // tell jQuery not to process the data
		           contentType: false,
		           timeout: 35000,
		        //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		           data: formData,
		           beforeSend : function ()
		           {
		             $('#Cargando_Exportar').css('display','');
		           },
		           success: function(data)
		           {
		           		console.log(data);

		           		 let parsed = JSON.parse(data);

		           		 console.log(parsed);

			            if (parsed != null && parsed != "")
			            {
		            		let Detalle_Venta_Menudeo   = document.getElementById("Table_Venta_Semanal_Exportar"); 
		            		let tbody_Detalle   	   = Detalle_Venta_Menudeo.tBodies[0];

		            		$('#Table_Venta_Semanal_Exportar').DataTable().destroy();
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
								 let cel10 = row.insertCell(9);

				                 cel1.innerHTML = parsed['Ventas'][i]['ID'];
								 cel2.innerHTML = parsed['Ventas'][i]['Cliente'];
								 cel3.innerHTML = parsed['Ventas'][i]['Alias'];
				                 cel4.innerHTML = parsed['Ventas'][i]['Ciudad'];
				                 cel5.innerHTML = parsed['Ventas'][i]['Estado'];
				                 cel6.innerHTML = parsed['Ventas'][i]['Region'];
				                 cel7.innerHTML = parsed['Ventas'][i]['Zona'];
				                 cel8.innerHTML = parsed['Ventas'][i]['Dia_Pedido'];
				                 cel9.innerHTML = parsed['Ventas'][i]['Total_Venta'];
				                 cel10.innerHTML = parsed['Ventas'][i]['Total_Venta_Distr'];
				                
				                }

				                fetch_Detalle_Venta_Detalle_Exportar();
			            }

		           		$("#myModal_Exportar").modal("show");
		           }
		    })
		    .done(function() {
		           $('#Cargando_Exportar').css('display','none');
		    })
		    .fail(function() {
		           console.log("error");
		    })
		    .always(function() {
		    });

			$("#myModal_Exportar").modal("show");
	});

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

		let Sucursal 		= $("#select_Sucursal").val();

		let arrayRegion = Array();

		let Table_Header_Region   	 	= document.getElementById("Table_Header_Region"); 
		let tbody_Header_Region   	    = Table_Header_Region.tBodies[0];

		for (var i = 0; i < tbody_Header_Region.rows.length; i++)
		{
			arrayRegion.push(tbody_Header_Region.rows[i].cells[0].innerHTML)
		}

		if (Sucursal != null && Sucursal != "")
		{
			$('#Table_Venta_Semanal').DataTable().destroy();
			let Table_Venta_Semanal    = document.getElementById("Table_Venta_Semanal"); 
			Table_Venta_Semanal.tBodies[0].innerHTML = "";

			Grafica_Ventas(Sucursal);
			Grafica_Clientes(Sucursal);
			fetch_data(Sucursal,arrayRegion);
		}
		else
		{
			$('#Table_Venta_Semanal').DataTable().destroy();
			let Table_Venta_Semanal    = document.getElementById("Table_Venta_Semanal"); 
			Table_Venta_Semanal.tBodies[0].innerHTML = "";


			var ctx1 = document.getElementById("Grafica_Mes").getContext('2d');
			window.grafica = new Chart(ctx1, {
			      type: 'line',
			      data: {
			          labels: ["Actual -3", "Actual -2", "Actual -1", "Actual"],
			          datasets: [{
			              label: '$ Ventas por Semana',
			              data: [0, 0, 0, 0]				              
			          }]
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

			let ctx = document.getElementById("Grafica_Saldo").getContext('2d');                
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
  formData.append("Valor", 1);
  formData.append("idSucursal", idSucursal);

    $.ajax({
           url: dir + 'index.php/Controller_Reporte_Semanal/Get_Top_5_Clientes_Saldo',
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

           		switch(parsed['Cliente'].length)
           		{
           			case 5:
           				var ctx = document.getElementById("Grafica_Saldo").getContext('2d');                
	                window.bar = new Chart(ctx, {
						  type: 'bar',
						  data: {
						    datasets: [{
						          label: 'Total',
						          data: [parsed['Cliente'][0]['Total'], parsed['Cliente'][1]['Total'], parsed['Cliente'][2]['Total'], parsed['Cliente'][3]['Total'],parsed['Cliente'][4]['Total']],
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
						          data: [parsed['Cliente'][0]['Total_Distr'], parsed['Cliente'][1]['Total_Distr'], parsed['Cliente'][2]['Total_Distr'], parsed['Cliente'][3]['Total_Distr'],parsed['Cliente'][4]['Total_Distr']],
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
						    labels: [parsed['Cliente'][0]['Cliente'], parsed['Cliente'][1]['Cliente'], parsed['Cliente'][2]['Cliente'], parsed['Cliente'][3]['Cliente'], parsed['Cliente'][4]['Cliente']]
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
		           		var ctx = document.getElementById("Grafica_Saldo").getContext('2d');                
			                window.bar = new Chart(ctx, {
								  type: 'bar',
								  data: {
								    datasets: [{
								          label: 'Total',
								          data: [parsed['Cliente'][0]['Total'], parsed['Cliente'][1]['Total'], parsed['Cliente'][2]['Total'], parsed['Cliente'][3]['Total'],0],
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
								          data: [parsed['Cliente'][0]['Total_Distr'], parsed['Cliente'][1]['Total_Distr'], parsed['Cliente'][2]['Total_Distr'], parsed['Cliente'][3]['Total_Distr'],0],
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
								    labels: [parsed['Cliente'][0]['Cliente'],parsed['Cliente'][1]['Cliente'],parsed['Cliente'][2]['Cliente'],parsed['Cliente'][3]['Cliente'],""]
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
		           		var ctx = document.getElementById("Grafica_Saldo").getContext('2d');                
			                window.bar = new Chart(ctx, {
								  type: 'bar',
								  data: {
								    datasets: [{
								          label: 'Total',
								          data: [parsed['Cliente'][0]['Total'], parsed['Cliente'][1]['Total'], parsed['Cliente'][2]['Total'], 0,0],
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
								          data: [parsed['Cliente'][0]['Total_Distr'], parsed['Cliente'][1]['Total_Distr'], parsed['Cliente'][2]['Total_Distr'], 0,0],
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
								    labels: [parsed['Cliente'][0]['Cliente'],parsed['Cliente'][1]['Cliente'],parsed['Cliente'][2]['Cliente'],"",""]
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
				    	var ctx = document.getElementById("Grafica_Saldo").getContext('2d');                
			                window.bar = new Chart(ctx, {
								  type: 'bar',
								  data: {
								    datasets: [{
								          label: 'Total',
								          data: [parsed['Cliente'][0]['Total'], parsed['Cliente'][1]['Total'], 0, 0,0],
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
								          data: [parsed['Cliente'][0]['Total_Distr'], parsed['Cliente'][1]['Total_Distr'], 0, 0,0],
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
								    labels: [parsed['Cliente'][0]['Cliente'],parsed['Cliente'][1]['Cliente'],"","",""]
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
		           		var ctx = document.getElementById("Grafica_Saldo").getContext('2d');                
			                window.bar = new Chart(ctx, {
								  type: 'bar',
								  data: {
								    datasets: [{
								          label: 'Total',
								          data: [parsed['Cliente'][0]['Total'], 0, 0, 0,0],
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
								          data: [parsed['Cliente'][0]['Total_Distr'], 0, 0, 0,0],
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
								    labels: [parsed['Cliente'][0]['Cliente'],"","","",""]
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
					        var ctx = document.getElementById("Grafica_Saldo").getContext('2d');                
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

function Grafica_Clientes(idSucursal)
{
  ////// Graficas para el menu de inicio /////


  if (idSucursal != null && idSucursal != "")
  {
  	var formData = new FormData();
  formData.append("Valor", 1);
  formData.append("idSucursal", idSucursal);

    $.ajax({
           url: dir + 'index.php/Controller_Reporte_Semanal/Get_Grafica_Linea',
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

           	if (parsed['Semana1'][0]['Total'] == null)
           	{
           		parsed['Semana1'][0]['Total'] = 0;

           	}else if (parsed['Semana2'][0]['Total'] == null)
           	{
           		parsed['Semana2'][0]['Total'] = 0;

           	}else if (parsed['Semana3'][0]['Total'] == null)
           	{
           		parsed['Semana3'][0]['Total'] = 0;

           	}else if (parsed['Semana4'][0]['Total'] == null)
           	{
           		parsed['Semana4'][0]['Total'] = 0;

           	}

           		var ctx = document.getElementById("Grafica_Mes").getContext('2d');
				window.grafica = new Chart(ctx, {
				      type: 'line',
				      data: {
				          labels: ["Actual -3", "Actual -2", "Actual -1", "Actual"],
				          datasets: [{
				              label: '$ Ventas por Semana',
				              data: [parsed['Semana4'][0]['Total'], parsed['Semana3'][0]['Total'], parsed['Semana2'][0]['Total'], parsed['Semana1'][0]['Total']]				              
				          }]
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


function fetch_data(idSucursal,Region){

  var dataTable = $('#Table_Venta_Semanal').DataTable({
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
   /* rowCallback:function(row,data)
	{
	  if(data[6] > data[9])
      {
        $($(row).find("td")).css("background-color","#ca2d4c59");
        //$($(row).find("td")).css("color","white");
      }
	}, */ 
    "columnDefs": [
                {
                    "targets": 10,
                    'render': function (data, type, full, meta)
                    {
                        return  "<button type='button' class='btn btn-default btn-xs btn-flat' onclick='verDetalleVenta("+full[0]+");'><i class='fa fa-eye'></i></button> <button type='button' class='btn btn-primary btn-xs btn-flat' onclick='verReporte("+full[0]+",\""+full[1]+"\");'><i class='fa fa-area-chart'></i></button>"
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

        url: dir + "Clases/fetch_Reporte_Semanal.php",
        type: "POST",
        data:{
              idSucursal:idSucursal, Region:Region
            }
    }
  });
}

function verDetalleVenta(idCliente)
{
	console.log(idCliente);

	var formData = new FormData();
  formData.append("idCliente", idCliente);

    $.ajax({
           url: dir + 'index.php/Controller_Reporte_Semanal/Get_Ventas_By_ID_Cliente',
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
           		//console.log(data);

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


function fetch_Detalle_Venta_Detalle_Exportar() {
	
	$('#Table_Venta_Semanal_Exportar').dataTable({
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
           "loadingRecords": "Cargando ...",
           "processing": "Procesando...",
           "searchPlaceholder": "Comience a teclear...",
           "paginate": {
   "previous": "Anterior",
   "next": "Siguiente", 
   }
    },
      "select": true,
  });
}

function verReporte(idCliente,Cliente)
{
	var formData = new FormData();
  formData.append("idCliente", idCliente);

    $.ajax({
           url: dir + 'index.php/Controller_Reporte_Semanal/Get_Reporte_By_Cliente',
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

           		if (window.grafica_Cliente) {
					window.grafica_Cliente.clear();
					window.grafica_Cliente.destroy();
				}

           		$("#myModal_Grafica_Cliente").modal("show");
           		$("#titulo_Modal").text("Grafica de " + Cliente);
           		console.log(data);

           		 let parsed = JSON.parse(data);

           		 let labels = new Array();
           		 let datos =  new Array();
           		 let datos_Cuota =  new Array();

           		 console.log(parsed);

           		 for (var i = parsed['Cliente'].length - 1; i >= 0; i--)
           		 {
           		 	labels.push(parsed['Cliente'][i]['Fecha_venta']);
           		 	datos.push(parsed['Cliente'][i]['Total']);
           		 	datos_Cuota.push(parsed['Cliente'][i]['Cuota']);
           		 }

           		 var ctx = document.getElementById("Grafica_Linea_Cliente").getContext('2d');
		        window.grafica_Cliente = new Chart(ctx, {
		              type: 'line',
		              data: {
		                  labels: labels,
		                  datasets: [{
		                      label: '$ Ventas',
		                      data: datos,
		                      backgroundColor: "rgb(0,94,187,0.2)",
		                        strokeColor : "rgb(0,94,187,1)",
		                        pointColor : "rgb(0,94,187,1)",
		                        pointStrokeColor : "#005ebb",                      
		                  },
		                  {
		                  	label: '$ Cuota',
		                    data: datos_Cuota,
		                    backgroundColor: "rgb(241, 118, 130, 0.2)",
		                    strokeColor : "rgb(241, 118, 130,1)",
		                    pointColor : "rgb(241, 118, 130,1)",
		                    pointStrokeColor : "#f17682",
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