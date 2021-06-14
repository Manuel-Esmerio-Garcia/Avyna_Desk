window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';

$( document ).ready(function() {  

$("#Zonas").click(function(event) {
  /* Act on the event */

  var formData = new FormData();
formData.append("Valor", 1);

  $.ajax({
                   url: dir + 'index.php/Controller_Zonas/',
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
                          window.location = dir + 'index.php/Controller_Zonas';
                   }
            })
            .done(function() {
                   $('#Cargando_Header').css('display','none');
            })
            .fail(function() {
                   console.log("error");
            })
            .always(function() {
                   console.log("complete");
            });

});


$("#Bloques").click(function(event) {
  /* Act on the event */

  var formData = new FormData();
formData.append("Valor", 1);

  $.ajax({
                   url: dir + 'index.php/Controller_Bloques/',
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
                          window.location = dir + 'index.php/Controller_Bloques';
                   }
            })
            .done(function() {
                   $('#Cargando_Header').css('display','none');
            })
            .fail(function() {
                   console.log("error");
            })
            .always(function() {
                   console.log("complete");
            });

});


$("#Envios").click(function(event) {
  /* Act on the event */

  var formData = new FormData();
formData.append("Valor", 1);

  $.ajax({
                   url: dir + 'index.php/Controller_Envios/',
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
                          window.location = dir + 'index.php/Controller_Envios';
                   }
            })
            .done(function() {
                   $('#Cargando_Header').css('display','none');
            })
            .fail(function() {
                   console.log("error");
            })
            .always(function() {
                   console.log("complete");
            });

});

////////////////////////////////////
//// Bodega Update 20/06/2019   ////
////////////////////////////////////
$("#Bodega").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_Bodega/',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 35000,
    beforeSend : function ()
    {
      $('#Cargando_Header').css('display','');
      $("#loadingHeader").css('display','');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_Bodega';
    }
    })
    .done(function() {
      $('#Cargando_Header').css('display','none');
      $("#loadingHeader").css('display','none');
    })
    .fail(function() {
      $('#Cargando_Header').css('display','none');
      $("#loadingHeader").css('display','none');
    })
    .always(function() {
      console.log("complete");
    });
});
////////////////////////////////////
//// Bodega Update 20/06/2019   ////
////////////////////////////////////

/////////////////////////////////////////////////
//// Configuración Roles Update 20/06/2019   ////
/////////////////////////////////////////////////
$("#roles").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_Permisos/',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 35000,
    beforeSend : function ()
    {
      $("#loadingHeader").css('display','');
      $("#loadingRoles").css('display','');
      $("#roles").css('display','none');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_Permisos';
    }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingRoles").css('display','none');
      $("#roles").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingRoles").css('display','none');
      $("#roles").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      console.log("complete");
    });
});
/////////////////////////////////////////////////
//// Configuración Roles Update 20/06/2019   ////
/////////////////////////////////////////////////

$("#Usuarios").click(function(event) {
  /* Act on the event */

  var formData = new FormData();
formData.append("Valor", 1);

  $.ajax({
                   url: dir + 'index.php/Controller_Usuario/',
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
                          window.location = dir + 'index.php/Controller_Usuario';
                   }
            })
            .done(function() {
                   $('#Cargando_Header').css('display','none');
            })
            .fail(function() {
                   console.log("error");
            })
            .always(function() {
                   console.log("complete");
            });

});

$("#Promociones").click(function(event) {
var formData = new FormData();
formData.append("Valor", 1);

  $.ajax({
                   url: dir + 'index.php/Controller_Promociones/',
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
                          window.location = dir + 'index.php/Controller_Promociones';
                   }
            })
            .done(function() {
                   $('#Cargando_Header').css('display','none');
            })
            .fail(function() {
                   console.log("error");
            })
            .always(function() {
                   console.log("complete");
            });
});

$("#Clientes").click(function(event) {
var formData = new FormData();
formData.append("Valor", 1);

  $.ajax({
                   url: dir + 'index.php/Controller_Cliente/',
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
                          window.location = dir + 'index.php/Controller_Cliente';
                   }
            })
            .done(function() {
                   $('#Cargando_Header').css('display','none');
            })
            .fail(function() {
                   console.log("error");
            })
            .always(function() {
                   console.log("complete");
            });
});

$("#Distribuidores").click(function(event) {
var formData = new FormData();
formData.append("Valor", 1);

  $.ajax({
                   url: dir + 'index.php/Controller_Distribuidores/',
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
                          window.location = dir + 'index.php/Controller_Distribuidores';
                   }
            })
            .done(function() {
                   $('#Cargando_Header').css('display','none');
            })
            .fail(function() {
                   console.log("error");
            })
            .always(function() {
                   console.log("complete");
            });
});


$("#Compras").click(function(event) {
var formData = new FormData();
formData.append("Valor", 1);

  $.ajax({
                   url: dir + 'index.php/Controller_Compras/',
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
                          window.location = dir + 'index.php/Controller_Compras';
                   }
            })
            .done(function() {
                   $('#Cargando_Header').css('display','none');
            })
            .fail(function() {
                   console.log("error");
            })
            .always(function() {
                   console.log("complete");
            });
});

$("#Empaques").click(function(event) {
var formData = new FormData();
formData.append("Valor", 1);

  $.ajax({
                   url: dir + 'index.php/Controller_Empaques/',
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
                          window.location = dir + 'index.php/Controller_Empaques';
                   }
            })
            .done(function() {
                   $('#Cargando_Header').css('display','none');
            })
            .fail(function() {
                   console.log("error");
            })
            .always(function() {
                   console.log("complete");
            });
});

$("#Inventario").click(function(event) {
var formData = new FormData();
formData.append("Valor", 1);

  $.ajax({
                   url: dir + 'index.php/Controller_Inventario/',
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
                          window.location = dir + 'index.php/Controller_Inventario';
                   }
            })
            .done(function() {
                   $('#Cargando_Header').css('display','none');
            })
            .fail(function() {
                   console.log("error");
            })
            .always(function() {
                   console.log("complete");
            });
});

$("#Ventas").click(function(event) {
var formData = new FormData();
formData.append("Valor", 1);

  $.ajax({
                   url: dir + 'index.php/Controller_Ventas/',
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
                          window.location = dir + 'index.php/Controller_Ventas';
                   }
            })
            .done(function() {
                   $('#Cargando_Header').css('display','none');
            })
            .fail(function() {
                   console.log("error");
            })
            .always(function() {
                   console.log("complete");
            });
});

$("#Productos").click(function(event) {
var formData = new FormData();
formData.append("Valor", 1);

  $.ajax({
                   url: dir + 'index.php/Controller_Productos/',
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
                          window.location = dir + 'index.php/Controller_Productos';
                   }
            })
            .done(function() {
                   $('#Cargando_Header').css('display','none');
            })
            .fail(function() {
                   console.log("error");
            })
            .always(function() {
                   console.log("complete");
            });
});

$("#Cuentas_x_Cobrar").click(function(event) {
  var formData = new FormData();
  formData.append("Valor", 1);

    $.ajax({
                     url: dir + 'index.php/Controller_Cuentas_x_Pagar/',
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
                            window.location = dir + 'index.php/Controller_Cuentas_x_Pagar';
                     }
              })
              .done(function() {
                     $('#Cargando_Header').css('display','none');
              })
              .fail(function() {
                     console.log("error");
              })
              .always(function() {
                     console.log("complete");
              });
});

$("#Extracciones").click(function(event) {
  var formData = new FormData();
  formData.append("Valor", 1);

    $.ajax({
                     url: dir + 'index.php/Controller_Extracciones/',
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
                            window.location = dir + 'index.php/Controller_Extracciones';
                     }
              })
              .done(function() {
                     $('#Cargando_Header').css('display','none');
              })
              .fail(function() {
                     console.log("error");
              })
              .always(function() {
                     console.log("complete");
              });
});



$("#Cerrar_Conexion").click(function(event) {
  $("#Modal_Conexion").modal("hide");
});

});


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
    "timeOut": "900",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}