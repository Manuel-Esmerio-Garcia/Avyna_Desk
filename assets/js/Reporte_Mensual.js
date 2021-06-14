var dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';

window.grafica;
window.grafica_Cliente;
window.bar;

$(document).ready(function(){

	$("#exportar").click(function(event) {
		/* Act on the event */
let idSucursal = $("#select_Sucursal").val();
let idBloques = $("#select_Bloque").val();

		var formData = new FormData();
		  formData.append("idSucursal", idSucursal);
		  formData.append("idBloques", idBloques);

		    $.ajax({
		           url: dir + 'index.php/Controller_Reporte_Mensual/Get_Ventas',
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

		let Sucursal = $("#select_Sucursal").val();
		let Bloque = $("#select_Bloque").val();

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
			fetch_data(Sucursal,arrayRegion,Bloque);
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


	//
	$("#select_Bloque").change(function(event) {

		let Sucursal = $("#select_Sucursal").val();
		let Bloque = $("#select_Bloque").val();

		let arrayRegion = Array();

		let Table_Header_Region   	 	= document.getElementById("Table_Header_Region"); 
		let tbody_Header_Region   	    = Table_Header_Region.tBodies[0];

		for (var i = 0; i < tbody_Header_Region.rows.length; i++)
		{
			arrayRegion.push(tbody_Header_Region.rows[i].cells[0].innerHTML)
		}

		$('#Table_Venta_Semanal').DataTable().destroy();
		let Table_Venta_Semanal    = document.getElementById("Table_Venta_Semanal"); 
		Table_Venta_Semanal.tBodies[0].innerHTML = "";

		fetch_data(Sucursal,arrayRegion,Bloque);
		
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
           url: dir + 'index.php/Controller_Reporte_Mensual/Get_Top_5_Clientes_Saldo',
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
           url: dir + 'index.php/Controller_Reporte_Mensual/Get_Grafica_Linea',
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













































function fetch_data(idSucursal,Region,idBloques){

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
    rowCallback:function(row,data)
	{
		let Cuota_9   = parseFloat(data[11]) * 0.9;
		let Cuota_20  = parseFloat(data[11]) * 1.2;
		let Cuota     = parseFloat(data[11]);
		let Venta     = parseFloat(data[9]);

		if(Venta < Cuota_9)
	    {
	       $($(row).find("td")).css("background-color","#ca2d4c59");
	    }
	    else if ((Venta >= Cuota_9) && (Venta < Cuota))
	    {
	    	$($(row).find("td")).css("background-color","#fef9cd");
	    }
	    else if ((Venta >= Cuota) && (Venta < Cuota_20))
	    {
	    	//$($(row).find("td")).css("background-color","#f9fbfa");
	    }
	    else
	    {
	    	$($(row).find("td")).css("background-color","#cae4c0");
	    }


	  /*if(data[9] > data[7])
      {
        $($(row).find("td")).css("background-color","#ca2d4c59");
        //$($(row).find("td")).css("color","white");
      }*/
	}, 
    "columnDefs": [
                {
                    "targets": 17,
                    'render': function (data, type, full, meta)
                    {
                        return  "<button type='button' class='btn btn-default' onclick='verDetalleVenta("+full[0]+");'><i class='fa fa-eye'></i></button> <button type='button' class='btn btn-primary' onclick='verReporte("+full[0]+",\""+full[1]+"\");'><i class='fa fa-area-chart'></i></button> <button type='button' class='btn btn-warning' onclick='verFicha("+full[0]+");'><i class='fa fa-list-alt'></i></button>"
                    }
                    //"defaultContent": "<button type='button' id='btn_pdf_' class='pdf btn btn-danger btn-sm'><i class='fas fa-file-pdf'></i></button> <button type='button' id='btn_xml_' class='btn btn-primary btn-sm'><i class='fas fa-file-alt'></i></button>"
				},
				{
                    "targets": 13,
                    'render': function (data, type, full, meta)
                    {
						
						var d = new Date(full[13]);
						console.log(d.getDate());
						let mes = "";
						switch ((d.getMonth() + 1)) {
							case 1:
								mes = "Enero";
								break;
							case 2:
								mes = "Febrero";
								break;
							case 3:
								mes = "Marzo";
								break;
							case 4:
								mes = "Abril";
								break;
							case 5:
								mes = "Mayo";
								break;
							case 6:
								mes = "Junio";
								break;
							case 7:
								mes = "Julio";
								break;
							case 8:
								mes = "Agosto";
								break;
							case 9:
								mes = "Septiembre";
								break;
							case 10:
								mes = "Octubre";
								break;
							case 11:
								mes = "Noviembre";
								break;
							case 12:
								mes = "Diciembre";
								break;
						}
                        return  d.getDate()+1 + " de " + mes;
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

        url: dir + "Clases/fetch_Reporte_Mensual.php",
        type: "POST",
        data:{
              idSucursal:idSucursal, Region:Region, idBloques:idBloques
            }
    }
  });
}

function verReporte(idCliente,Cliente)
{
	var formData = new FormData();
  formData.append("idCliente", idCliente);

    $.ajax({
           url: dir + 'index.php/Controller_Reporte_Mensual/Get_Reporte_By_Cliente',
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
           		$("#titulo_Modal").text("Grafica de " + Cliente);
           		console.log(data);

           		 let parsed = JSON.parse(data);

           		 let labels = new Array();
           		 let datos =  new Array();
           		 let datos_Cuota =  new Array();

           		 console.log(parsed);

           		 if (parsed['Cliente23'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente23'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -23 ' + ' (' + parsed['Cliente23'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente23'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente23'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -23');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente22'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente22'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -22' + ' (' + parsed['Cliente22'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente22'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente22'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -22');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente21'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente21'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -21' + ' (' + parsed['Cliente21'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente21'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente21'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -21');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente20'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente20'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -20' + ' (' + parsed['Cliente20'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente20'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente20'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -20');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente19'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente19'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -19' + ' (' + parsed['Cliente19'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente19'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente19'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -19');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente18'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente18'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -18' + ' (' + parsed['Cliente18'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente18'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente18'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -18');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente17'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente17'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -17' + ' (' + parsed['Cliente17'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente17'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente17'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -17');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente16'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente16'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -16' + ' (' + parsed['Cliente16'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente16'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente16'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -16');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente15'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente15'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -15' + ' (' + parsed['Cliente15'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente15'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente15'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -15');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente14'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente14'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -14' + ' (' + parsed['Cliente14'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente14'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente14'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -14');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente13'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente13'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -13' + ' (' + parsed['Cliente13'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente13'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente13'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -13');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente12'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente12'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -12' + ' (' + parsed['Cliente12'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente12'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente12'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -12');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente11'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente11'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -11' + ' (' + parsed['Cliente11'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente11'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente11'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -11');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente10'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente10'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -10' + ' (' + parsed['Cliente10'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente10'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente10'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -10');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente9'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente9'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -9' + ' (' + parsed['Cliente9'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente9'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente9'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -9');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente8'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente8'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -8' + ' (' + parsed['Cliente8'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente8'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente8'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -8');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente7'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente7'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -7' + ' (' + parsed['Cliente7'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente7'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente7'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -7');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente6'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente6'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -6' + ' (' + parsed['Cliente6'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente6'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente6'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -6');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente5'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente5'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -5' + ' (' + parsed['Cliente5'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente5'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente5'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -5');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente4'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente4'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -4' + ' (' + parsed['Cliente4'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente4'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente4'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -4');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente3'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente3'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -3' + ' (' + parsed['Cliente3'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente3'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente3'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -3');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente2'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente2'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -2' + ' (' + parsed['Cliente2'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente2'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente2'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -2');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente1'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente1'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual -1' + ' (' + parsed['Cliente1'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente1'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente1'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual -1');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 if (parsed['Cliente'].length > 0)
           		 {
           		 	for (var i = parsed['Cliente'].length - 1; i >= 0; i--)
	           		 {
	           		 	labels.push('Actual' + ' (' + parsed['Cliente'][i]['Mes'] + ')');
	           		 	datos.push(parsed['Cliente'][i]['Total_Mes']);
	           		 	datos_Cuota.push(parseFloat(parsed['Cliente'][i]['Cuota_Final']).toFixed(2));
	           		 }
           		 }
           		 else
           		 {
           		 		labels.push('Actual');
	           		 	datos.push(0.00);
	           		 	datos_Cuota.push(0.00);
           		 }

           		 



           		 /*for (var i = parsed['Cliente'].length - 1; i >= 0; i--)
           		 {
           		 	labels.push(parsed['Cliente'][i]['Mes'] + "/" + parsed['Cliente'][i]['Ano']);
           		 	datos.push(parsed['Cliente'][i]['Total_Mes']);
           		 	datos_Cuota.push(parsed['Cliente'][i]['Cuota']);
           		 }*/
           		 
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
		                  },
		                  {
		                  	label: '$ Cuota',
		                    data: datos_Cuota,
		                    borderColor: "rgb(241, 118, 130, 0.2)",
		                    borderWidth: 3,
		                    backgroundColor: "transparent",
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

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
	try {
		decimalCount = Math.abs(decimalCount);
		decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

		const negativeSign = amount < 0 ? "-" : "";

		let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
		let j = (i.length > 3) ? i.length % 3 : 0;

		return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
	} catch (e) {
		console.log(e)
	}
}

function esEntero(numero){
    if (numero % 1 == 0) {
        return 1;
    } else {
        return 0;
    }
}

function verFicha(idClient) {
	console.log("ID Cliente: " + idClient);

	let formData = new FormData();
  	formData.append("idCliente", idClient);

    $.ajax({
		url: window.dir + 'index.php/Controller_Reporte_Mensual/getInfoFichaCliente',
		type: 'POST',
		processData: false,
		contentType: false,
		timeout: 800000,
		data: formData,
		beforeSend : function (){
			$('#Cargando_Header').css('display','');
		},
		success: function(data){
			let parsed = JSON.parse(data);

			if (parsed != null && parsed != ""){
				console.log(parsed)

				$("#txtDistribuidor").text("Distribuidor: " + parsed['Distribuidor'][0]['Nombre'] + " " + parsed['Distribuidor'][0]['Apellidos']);
				$("#txtidDistribuidor").text("N° " + parsed['Distribuidor'][0]['ID']);
				$("#txtCantidadSalones").text(parsed['CantidadSalones']);
				$("#txtCantidadSalonesTrimestral").text(parsed['CantidadSalonesTrimestral']);
				$("#txtNuevoSalones").text(parsed['CantidadNuevoSalones']);
				$("#txtNuevoSalones12").text(parsed['CantidadNuevoSalones12']);

				$("#txtSalonesAdicionales12").text(parseInt(parsed['CantidadSalones']) - parseInt(parsed['CantidadSalonesTrimestral']));
				let PerdidaSalones = (parseInt(parsed['CantidadNuevoSalones12']) - (parseInt(parsed['CantidadSalones']) - parseInt(parsed['CantidadSalonesTrimestral']))) / 3;
				
				if(esEntero(PerdidaSalones)){
					$("#txtPerdidaSalones").text(parseInt(PerdidaSalones));
				}else{
					$("#txtPerdidaSalones").text(parseFloat(PerdidaSalones).toFixed(2));
				}

				$("#txtUltimasVentas").text(parsed['UltimasVentasSalones']);  
				$("#txtUltimasVentasMes").text(parsed['UltimasVentasMes']);  
				$("#txtActiveRed").text(parsed['ActiveRed']);  
				$("#txtActiveBlack").text(parsed['ActiveBlack']);  

				$("#txtPromedioVentas").text(formatMoney(parseFloat(parsed['TotalVentasMes'][0]['Total']) / parseInt(parsed['CantidadSalones'])));

				//$("#txtPromedioVentasAnt").text(formatMoney(parseFloat(parsed['VentasSalonesAnteriores'][0]['Total']) / parseInt(parsed['UltimasVentasMes'])));

				if (parsed['UltimasVentas'][0]['Total'] != null) {
					$("#txtUltimasVentas12").text(formatMoney(parseFloat(parsed['UltimasVentas'][0]['Total']).toFixed(2)));
				}
				else{
					$("#txtUltimasVentas12").text(formatMoney(parseFloat('0.00').toFixed(2)));
				}

				if (parsed['TotalVentasMes'][0]['Total'] != null) {
					$("#txtVentasMes").text(formatMoney(parseFloat(parsed['TotalVentasMes'][0]['Total']).toFixed(2)));
				}
				else{
					$("#txtVentasMes").text(formatMoney(parseFloat('0.00').toFixed(2)));
				}

				if (parsed['VentasSalones'][0]['Total'] != null) {
					$("#txtVentasNuevoSalones").text(formatMoney(parseFloat(parsed['VentasSalones'][0]['Total']).toFixed(2)));
				}
				else{
					$("#txtVentasNuevoSalones").text(formatMoney(parseFloat('0.00').toFixed(2)));
				}

				if (parsed['VentasSalonesAnteriores'][0]['Total'] != null) {
					$("#txtVentasMesAnterior").text(formatMoney(parseFloat(parsed['VentasSalonesAnteriores'][0]['Total']).toFixed(2)));
				}
				else{
					$("#txtVentasMesAnterior").text(formatMoney(parseFloat('0.00').toFixed(2)));
				}
				
			}

			$("#modalFicha").modal("show");
		}
    })
    .done(function() {
        $('#Cargando_Header').css('display','none');
    })
    .fail(function() {
    })
    .always(function() {
    });
}




































































function verDetalleVenta(idCliente)
{
	console.log("ID Cliente: " + idCliente);

	var formData = new FormData();
  formData.append("idCliente", idCliente);

    $.ajax({
           url: dir + 'index.php/Controller_Reporte_Mensual/Get_Ventas_By_ID_Cliente',
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
		                 let cel10 = row.insertCell(9);

		                 cel1.innerHTML = parsed['Ventas'][i]['ID'];
		                 cel2.innerHTML = parsed['Ventas'][i]['Fecha_venta'];
		                 cel3.innerHTML = parsed['Ventas'][i]['Distribuidor'];
		                 cel4.innerHTML = (parseFloat(parsed['Ventas'][i]['Total']) + parseFloat(parsed['Ventas'][i]['Descuento'])).toFixed(2);
		                 cel5.innerHTML = parsed['Ventas'][i]['Descuento'];
		                 cel6.innerHTML = parsed['Ventas'][i]['Subtotal'];
		                 cel7.innerHTML = parsed['Ventas'][i]['Impuestos'];
		                 cel8.innerHTML = parsed['Ventas'][i]['Total'];
		                 cel9.innerHTML = parsed['Ventas'][i]['Adeudo'];
		                 cel10.innerHTML = parsed['Ventas'][i]['Status'];
		                
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