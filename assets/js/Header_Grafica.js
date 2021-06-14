window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';

$( document ).ready(function() {  

  let Sucursal = 1;

  Grafica_Clientes(Sucursal);
  Grafica_Ventas(Sucursal);
  Grafica_Clientes_Semanal(Sucursal);
  Grafica_Ventas_Semanal(Sucursal);

});


function Grafica_Clientes(idSucursal)
{
  ////// Graficas para el menu de inicio /////

  if (idSucursal != null && idSucursal != "")
  {
    var formData = new FormData();
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
                      label: '$ Ventas por Mes',
                      data: [parsed['Semana4'][0]['Total'], parsed['Semana3'][0]['Total'], parsed['Semana2'][0]['Total'], parsed['Semana1'][0]['Total']],
                      backgroundColor: "rgba(255, 159, 64, 0.2)",
                        strokeColor : "rgba(255, 159, 64, 1)",
                        pointColor : "rgba(255, 159, 64, 1)",
                        pointStrokeColor : "#ffaa56",                      
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

function Grafica_Ventas(idSucursal)
{
  ////// Graficas para el menu de inicio /////

  if (idSucursal != null && idSucursal != "")
  {
    var formData = new FormData();
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
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }, {
                      label: 'Total Distr.',
                      data: [parsed['Cliente'][0]['Total_Distr'], parsed['Cliente'][1]['Total_Distr'], parsed['Cliente'][2]['Total_Distr'], parsed['Cliente'][3]['Total_Distr'],parsed['Cliente'][4]['Total_Distr']],
                      backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
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
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                        }, {
                          label: 'Total Distr.',
                          data: [parsed['Cliente'][0]['Total_Distr'], parsed['Cliente'][1]['Total_Distr'], parsed['Cliente'][2]['Total_Distr'], parsed['Cliente'][3]['Total_Distr'],0],
                          backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
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
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                        }, {
                          label: 'Total Distr.',
                          data: [parsed['Cliente'][0]['Total_Distr'], parsed['Cliente'][1]['Total_Distr'], parsed['Cliente'][2]['Total_Distr'], 0,0],
                          backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
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
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                        }, {
                          label: 'Total Distr.',
                          data: [parsed['Cliente'][0]['Total_Distr'], parsed['Cliente'][1]['Total_Distr'], 0, 0,0],
                          backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
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
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                        }, {
                          label: 'Total Distr.',
                          data: [parsed['Cliente'][0]['Total_Distr'], 0, 0, 0,0],
                          backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
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
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                        }, {
                          label: 'Total Distr.',
                          data: [0, 0, 0, 0,0],
                          backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
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

function Grafica_Clientes_Semanal(idSucursal)
{
  ////// Graficas para el menu de inicio /////

  if (idSucursal != null && idSucursal != "")
  {
    var formData = new FormData();
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

              var ctx = document.getElementById("Grafica_Semanal").getContext('2d');
        window.grafica = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: ["Actual -3", "Actual -2", "Actual -1", "Actual"],
                  datasets: [{
                      label: '$ Ventas por Semana',
                      data: [parsed['Semana4'][0]['Total'], parsed['Semana3'][0]['Total'], parsed['Semana2'][0]['Total'], parsed['Semana1'][0]['Total']],
                       backgroundColor: "rgba(255, 99, 132, 0.2)",
                        strokeColor : "rgba(255,99,132,1)",
                        pointColor : "rgba(255,99,132,1)",
                        pointStrokeColor : "#ff6384",          
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

function Grafica_Ventas_Semanal(idSucursal)
{
  ////// Graficas para el menu de inicio /////

  if (idSucursal != null && idSucursal != "")
  {
    var formData = new FormData();
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
                  var ctx = document.getElementById("Grafica_Saldo1").getContext('2d');                
                  window.bar = new Chart(ctx, {
              type: 'bar',
              data: {
                datasets: [{
                      label: 'Total',
                      data: [parsed['Cliente'][0]['Total'], parsed['Cliente'][1]['Total'], parsed['Cliente'][2]['Total'], parsed['Cliente'][3]['Total'],parsed['Cliente'][4]['Total']],
                      backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }, {
                      label: 'Total Distr.',
                      data: [parsed['Cliente'][0]['Total_Distr'], parsed['Cliente'][1]['Total_Distr'], parsed['Cliente'][2]['Total_Distr'], parsed['Cliente'][3]['Total_Distr'],parsed['Cliente'][4]['Total_Distr']],
                      backgroundColor: [
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)'
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
                  var ctx = document.getElementById("Grafica_Saldo1").getContext('2d');                
                      window.bar = new Chart(ctx, {
                  type: 'bar',
                  data: {
                    datasets: [{
                          label: 'Total',
                          data: [parsed['Cliente'][0]['Total'], parsed['Cliente'][1]['Total'], parsed['Cliente'][2]['Total'], parsed['Cliente'][3]['Total'],0],
                          backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                        }, {
                          label: 'Total Distr.',
                          data: [parsed['Cliente'][0]['Total_Distr'], parsed['Cliente'][1]['Total_Distr'], parsed['Cliente'][2]['Total_Distr'], parsed['Cliente'][3]['Total_Distr'],0],
                          backgroundColor: [
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)'
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
                  var ctx = document.getElementById("Grafica_Saldo1").getContext('2d');                
                      window.bar = new Chart(ctx, {
                  type: 'bar',
                  data: {
                    datasets: [{
                          label: 'Total',
                          data: [parsed['Cliente'][0]['Total'], parsed['Cliente'][1]['Total'], parsed['Cliente'][2]['Total'], 0,0],
                          backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                        }, {
                          label: 'Total Distr.',
                          data: [parsed['Cliente'][0]['Total_Distr'], parsed['Cliente'][1]['Total_Distr'], parsed['Cliente'][2]['Total_Distr'], 0,0],
                          backgroundColor: [
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)'
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
              var ctx = document.getElementById("Grafica_Saldo1").getContext('2d');                
                      window.bar = new Chart(ctx, {
                  type: 'bar',
                  data: {
                    datasets: [{
                          label: 'Total',
                          data: [parsed['Cliente'][0]['Total'], parsed['Cliente'][1]['Total'], 0, 0,0],
                          backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                        }, {
                          label: 'Total Distr.',
                          data: [parsed['Cliente'][0]['Total_Distr'], parsed['Cliente'][1]['Total_Distr'], 0, 0,0],
                          backgroundColor: [
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)'
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
                  var ctx = document.getElementById("Grafica_Saldo1").getContext('2d');                
                      window.bar = new Chart(ctx, {
                  type: 'bar',
                  data: {
                    datasets: [{
                          label: 'Total',
                          data: [parsed['Cliente'][0]['Total'], 0, 0, 0,0],
                          backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                        }, {
                          label: 'Total Distr.',
                          data: [parsed['Cliente'][0]['Total_Distr'], 0, 0, 0,0],
                          backgroundColor: [
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)'
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
                  var ctx = document.getElementById("Grafica_Saldo1").getContext('2d');                
                      window.bar = new Chart(ctx, {
                  type: 'bar',
                  data: {
                    datasets: [{
                          label: 'Total',
                          data: [0, 0, 0, 0,0],
                          backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                        }, {
                          label: 'Total Distr.',
                          data: [0, 0, 0, 0,0],
                          backgroundColor: [
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)'
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

