window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';

function handleClick(name, loading, controller) {
  $.ajax({
    url: `${dir}index.php/${controller}`,
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 35000,
    beforeSend : function (){
      $("#loadingHeader").css('display','');
      $(`#${loading}`).css('display','');
      $(`#${name}`).css('display','none');
    },
    success: function(data){
      // console.log(data);
      window.location = `${dir}index.php/${controller}`;
    }
  })
  .done(function() {
    $("#loadingHeader").css('display','none');
    $(`#${loading}`).css('display','none');
    $(`#${name}`).css('display','');
  })
  .fail(function() {
    $("#loadingHeader").css('display','none');
    $(`#${loading}`).css('display','none');
    $(`#${name}`).css('display','');
    $("#modalErrorConexion").modal("show");
  })
  .always(function() {
    $("#loadingHeader").css('display','none');
    $(`#${loading}`).css('display','none');
    $(`#${name}`).css('display','');
  });
}

$( document ).ready(function() {  

  /// Tooltip función ///
  $('[data-toggle="tooltip"]').tooltip();
  /// Tooltip Función ///

  //////////////////////////////
  //// Validaciones Inputs  ////

  // Validación solo numeros
  $('.input-number').on('input', function () { 
    this.value = this.value.replace(/[^0-9]/g,'');
  });


  ///////////////////////////////////////////////////////////
//// Reporte Visitas Salones 22/03/2021   ////
/////////////////////////////////////////////////////////
$("#reporteVisitaSalones").click(function(event) {
  console.log("Visitas Salones");
  $.ajax({
    url: dir + 'index.php/Controller_Reporte_Visitas_Salones/',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 35000,
    beforeSend : function (){
      $("#loadingHeader").css('display','');
      $("#loadingreporteVisitaSalones").css('display','');
      $("#reporteVisitaSalones").css('display','none');
    },
    success: function(data){
      // console.log(data);
      window.location = dir + 'index.php/Controller_Reporte_Visitas_Salones';
    }
  })
  .done(function() {
    $("#loadingHeader").css('display','none');
    $("#loadingreporteVisitaSalones").css('display','none');
    $("#reporteVisitaSalones").css('display','');
  })
  .fail(function() {
    $("#loadingHeader").css('display','none');
    $("#loadingreporteVisitaSalones").css('display','none');
    $("#reporteVisitaSalones").css('display','');
    $("#modalErrorConexion").modal("show");
  })
  .always(function() {
    $("#loadingHeader").css('display','none');
    $("#loadingreporteVisitaSalones").css('display','none');
    $("#reporteVisitaSalones").css('display','');
  });
});
///////////////////////////////////////////////////////////
//// Reporte Visitas Salones 22/03/2021   ////
/////////////////////////////////////////////////////////  

///////////////////////////////////////////////////////////
//// Reporte Por Distribuidor Semanal Update 28/08/2020   ////
/////////////////////////////////////////////////////////
  $("#reporteXDistSemanal").click(function(event) {
    $.ajax({
      url: dir + 'index.php/Controller_Reporte_Semanal/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 35000,
      beforeSend : function (){
        $("#loadingHeader").css('display','');
        $("#loadingreporteXDistSemanal").css('display','');
        $("#reporteXDistSemanal").css('display','none');
      },
      success: function(data){
        window.location = dir + 'index.php/Controller_Reporte_Semanal';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingreporteXDistSemanal").css('display','none');
      $("#reporteXDistSemanal").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingreporteXDistSemanal").css('display','none');
      $("#reporteXDistSemanal").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingreporteXDistSemanal").css('display','none');
      $("#reporteXDistSemanal").css('display','');
    });
  });
///////////////////////////////////////////////////////////
//// Reporte Por Distribuidor Semanal Update 28/08/2020   ////
/////////////////////////////////////////////////////////  


///////////////////////////////////////////////////////////
//// Reporte Por Distribuidor Mensual Update 28/08/2020   ////
/////////////////////////////////////////////////////////
  $("#reporteXDistMensual").click(function(event) {
    $.ajax({
      url: dir + 'index.php/Controller_Reporte_Mensual/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 35000,
      beforeSend : function (){
        $("#loadingHeader").css('display','');
        $("#loadingreporteXDistMensual").css('display','');
        $("#reporteXDistMensual").css('display','none');
      },
      success: function(data){
        window.location = dir + 'index.php/Controller_Reporte_Mensual';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingreporteXDistMensual").css('display','none');
      $("#reporteXDistMensual").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingreporteXDistMensual").css('display','none');
      $("#reporteXDistMensual").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingreporteXDistMensual").css('display','none');
      $("#reporteXDistMensual").css('display','');
    });
  });
///////////////////////////////////////////////////////////
//// Reporte Por Distribuidor Mensual Update 28/08/2020   ////
/////////////////////////////////////////////////////////  


///////////////////////////////////////////////////////////
//// Reporte Por Bloques Distribuidor Update 28/08/2020   ////
/////////////////////////////////////////////////////////
  $("#reporteXBloques").click(function(event) {
    $.ajax({
      url: dir + 'index.php/Controller_Reporte_Bloques/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 35000,
      beforeSend : function (){
        $("#loadingHeader").css('display','');
        $("#loadingreporteXBloques").css('display','');
        $("#reporteXBloques").css('display','none');
      },
      success: function(data){
        window.location = dir + 'index.php/Controller_Reporte_Bloques';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingreporteXBloques").css('display','none');
      $("#reporteXBloques").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingreporteXBloques").css('display','none');
      $("#reporteXBloques").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingreporteXBloques").css('display','none');
      $("#reporteXBloques").css('display','');
    });
  });
///////////////////////////////////////////////////////////
//// Reporte Por Bloques Distribuidor Update 28/08/2020   ////
/////////////////////////////////////////////////////////  

///////////////////////////////////////////////////////////
//// Configuracion Update 28/08/2020   ////
/////////////////////////////////////////////////////////
  $("#Configuracion").click(function(event) {

    $.ajax({
      url: dir + 'index.php/Controller_Configuracion/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 35000,
      beforeSend : function (){
        $("#loadingHeader").css('display','');
        $("#loadingConfiguracion").css('display','');
        $("#Configuracion").css('display','none');
      },
      success: function(data){
        window.location = dir + 'index.php/Controller_Configuracion';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingConfiguracion").css('display','none');
      $("#Configuracion").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingConfiguracion").css('display','none');
      $("#Configuracion").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingConfiguracion").css('display','none');
      $("#Configuracion").css('display','');
    });
  });
///////////////////////////////////////////////////////////
//// Ticket Update 28/08/2020   ////
/////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//// Ticket Update 28/08/2020   ////
/////////////////////////////////////////////////////////
  $("#Ticket").click(function(event) {

    $.ajax({
      url: dir + 'index.php/Controller_Ticket/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 35000,
      beforeSend : function (){
        $("#loadingHeader").css('display','');
        $("#loadingHelpDesk").css('display','');
        $("#Ticket").css('display','none');
      },
      success: function(data){
        window.location = dir + 'index.php/Controller_Ticket';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingHelpDesk").css('display','none');
      $("#Ticket").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingHelpDesk").css('display','none');
      $("#Ticket").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingHelpDesk").css('display','none');
      $("#Ticket").css('display','');
    });
  });
///////////////////////////////////////////////////////////
//// Ticket Update 28/08/2020   ////
/////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//// HelpDesk Update 28/08/2020   ////
/////////////////////////////////////////////////////////
  $("#HelpDesk").click(function(event) {

    $.ajax({
      url: dir + 'index.php/Controller_HelpDesk/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 35000,
      beforeSend : function (){
        $("#loadingHeader").css('display','');
        $("#loadingHelpDesk").css('display','');
        $("#HelpDesk").css('display','none');
      },
      success: function(data){
        window.location = dir + 'index.php/Controller_HelpDesk';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingHelpDesk").css('display','none');
      $("#HelpDesk").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingHelpDesk").css('display','none');
      $("#HelpDesk").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingHelpDesk").css('display','none');
      $("#HelpDesk").css('display','');
    });
  });
///////////////////////////////////////////////////////////
//// HelpDesk Update 28/08/2020   ////
/////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//// Zonas Update 28/08/2020   ////
/////////////////////////////////////////////////////////
  $("#Zonas").click(function(event) {

    $.ajax({
      url: dir + 'index.php/Controller_Zonas/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 35000,
      beforeSend : function (){
        $("#loadingHeader").css('display','');
        $("#loadingZonas").css('display','');
        $("#Zonas").css('display','none');
      },
      success: function(data){
        window.location = dir + 'index.php/Controller_Zonas';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingZonas").css('display','none');
      $("#Zonas").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingZonas").css('display','none');
      $("#Zonas").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingZonas").css('display','none');
      $("#Zonas").css('display','');
    });
  });
///////////////////////////////////////////////////////////
//// Zonas Update 28/08/2020   ////
/////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//// Envios Update 28/08/2020   ////
/////////////////////////////////////////////////////////
  $("#Envios").click(function(event) {

    $.ajax({
      url: dir + 'index.php/Controller_Envios/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 35000,
      beforeSend : function (){
        $("#loadingHeader").css('display','');
        $("#loadingEnvios").css('display','');
        $("#Envios").css('display','none');
      },
      success: function(data){
        window.location = dir + 'index.php/Controller_Envios';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingEnvios").css('display','none');
      $("#Envios").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingEnvios").css('display','none');
      $("#Envios").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingEnvios").css('display','none');
      $("#Envios").css('display','');
    });
  });
///////////////////////////////////////////////////////////
//// Envios Update 28/08/2020   ////
/////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//// Bloques Update 28/08/2020   ////
/////////////////////////////////////////////////////////
  $("#Bloques").click(function(event) {
    console.log("Click");
    $.ajax({
          url: window.dir + 'index.php/Controller_Bloques/',
          type: 'POST',
          processData: false,  // tell jQuery not to process the data
          contentType: false,
          timeout: 35000,
    beforeSend : function ()
    {
          $("#loadingHeader").css('display','');
          $("#loadingBloques").css('display','');
          $("#Bloques").css('display','none');
    },
    success: function(data)
    {
          window.location = window.dir + 'index.php/Controller_Bloques';
    }
    })
    .done(function() {
          $("#loadingHeader").css('display','none');
          $("#loadingBloques").css('display','none');
          $("#Bloques").css('display','');
    })
    .fail(function() {
          $("#loadingHeader").css('display','none');
          $("#loadingBloques").css('display','none');
          $("#Bloques").css('display','');
          $("#modalErrorConexion").modal("show");
    })
    .always(function() {
          console.log("complete");
    });
  });
///////////////////////////////////////////////////////////
//// Bloques Update 28/08/2020   ////
/////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//// Guias Envio Update 28/08/2020   ////
/////////////////////////////////////////////////////////
  $("#guiasEnvio").click(function(event) {
    console.log("Click");
    $.ajax({
          url: window.dir + 'index.php/Controller_Guias_Envio/',
          type: 'POST',
          processData: false,  // tell jQuery not to process the data
          contentType: false,
          timeout: 35000,
    beforeSend : function ()
    {
          $("#loadingHeader").css('display','');
          $("#loadingGuiasEnvio").css('display','');
          $("#guiasEnvio").css('display','none');
    },
    success: function(data)
    {
          window.location = window.dir + 'index.php/Controller_Guias_Envio';
    }
    })
    .done(function() {
          $("#loadingHeader").css('display','none');
          $("#loadingGuiasEnvio").css('display','none');
          $("#guiasEnvio").css('display','');
    })
    .fail(function() {
          $("#loadingHeader").css('display','none');
          $("#loadingGuiasEnvio").css('display','none');
          $("#guiasEnvio").css('display','');
          $("#modalErrorConexion").modal("show");
    })
    .always(function() {
          console.log("complete");
    });
  });
///////////////////////////////////////////////////////////
//// Guias Envio Update 28/08/2020   ////
/////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//// Cupones Update 10/08/2020   ////
/////////////////////////////////////////////////////////
  $("#cupones").click(function(event) {
    console.log("Click");
    $.ajax({
          url: window.dir + 'index.php/Controller_Cupones/',
          type: 'POST',
          processData: false,  // tell jQuery not to process the data
          contentType: false,
          timeout: 35000,
    beforeSend : function ()
    {
          $("#loadingHeader").css('display','');
          $("#loadingCupones").css('display','');
          $("#cupones").css('display','none');
    },
    success: function(data)
    {
          window.location = window.dir + 'index.php/Controller_Cupones';
    }
    })
    .done(function() {
          $("#loadingHeader").css('display','none');
          $("#loadingCupones").css('display','none');
          $("#cupones").css('display','');
    })
    .fail(function() {
          $("#loadingHeader").css('display','none');
          $("#loadingCupones").css('display','none');
          $("#cupones").css('display','');
          $("#modalErrorConexion").modal("show");
    })
    .always(function() {
          console.log("complete");
    });
  });
///////////////////////////////////////////////////////////
//// Cupones Update 10/08/2020   ////
/////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//// Reporte Extracciones por Mes Update 20/06/2019   ////
/////////////////////////////////////////////////////////
  $("#reporteExtraccionesMes").click(function(event) {
    console.log("Click");
    $.ajax({
          url: window.dir + 'index.php/Controller_Reporte_Extracciones_Mes/',
          type: 'POST',
          processData: false,  // tell jQuery not to process the data
          contentType: false,
          timeout: 35000,
    beforeSend : function ()
    {
          $("#loadingHeader").css('display','');
          $("#loadingreporteExtraccionesMes").css('display','');
          $("#reporteExtraccionesMes").css('display','none');
    },
    success: function(data)
    {
          window.location = window.dir + 'index.php/Controller_Reporte_Extracciones_Mes';
    }
    })
    .done(function() {
          $("#loadingHeader").css('display','none');
          $("#loadingreporteExtraccionesMes").css('display','none');
          $("#reporteExtraccionesMes").css('display','');
    })
    .fail(function() {
          $("#loadingHeader").css('display','none');
          $("#loadingreporteExtraccionesMes").css('display','none');
          $("#reporteExtraccionesMes").css('display','');
          $("#modalErrorConexion").modal("show");
    })
    .always(function() {
          console.log("complete");
    });
  });
///////////////////////////////////////////////////////////
//// Reporte Extracciones por Mes Update 20/06/2019   ////
/////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//// Reporte X Comisiones Update 20/06/2019   ////
/////////////////////////////////////////////////////////
  $("#reportexComision").click(function(event) {
    console.log("Click");
    $.ajax({
          url: window.dir + 'index.php/Controller_Reporte_Comisiones/',
          type: 'POST',
          processData: false,  // tell jQuery not to process the data
          contentType: false,
          timeout: 35000,
    beforeSend : function ()
    {
          $("#loadingHeader").css('display','');
          $("#loadingreportexComision").css('display','');
          $("#reportexComision").css('display','none');
    },
    success: function(data)
    {
          window.location = window.dir + 'index.php/Controller_Reporte_Comisiones';
    }
    })
    .done(function() {
          $("#loadingHeader").css('display','none');
          $("#loadingreportexComision").css('display','none');
          $("#reportexComision").css('display','');
    })
    .fail(function() {
          $("#loadingHeader").css('display','none');
          $("#loadingreportexComision").css('display','none');
          $("#reportexComision").css('display','');
          $("#modalErrorConexion").modal("show");
    })
    .always(function() {
          console.log("complete");
    });
  });
///////////////////////////////////////////////////////////
//// Reporte X Comisiones Update 20/06/2019   ////
/////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//// Reporte Inventario VS Minimo Update 25/05/2020   /////
//////////////////////////////////////////////////////////
  $("#reporteVS").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_reporteVS/',
      type: 'POST',
      processData: false,
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $('#Cargando_Header').css('display','');
        $("#loadingHeader").css('display','');
        $("#reporteVS").css('display','none');
        $("#loadingreporteVS").css('display','');
      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_reporteVS';
      }
    })
    .done(function() {
      $('#Cargando_Header').css('display','none');
      $("#loadingHeader").css('display','none');
      $("#reporteVS").css('display','');
      $("#loadingreporteVS").css('display','none');
    })
    .fail(function() {
      $('#Cargando_Header').css('display','none');
      $("#loadingHeader").css('display','none');
      $("#reporteVS").css('display','');
      $("#loadingreporteVS").css('display','none');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      $('#Cargando_Header').css('display','none');
      $("#loadingHeader").css('display','none');
      $("#reporteVS").css('display','');
      $("#loadingreporteVS").css('display','none');
    });
  });

////////////////////////////////////////////////////
//// Reporte Venta Cliente Update 20/11/2019   /////
///////////////////////////////////////////////////
  $("#reporteCliente").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_reporteVentaCliente/',
      type: 'POST',
      processData: false,
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $('#Cargando_Header').css('display','');
        $("#loadingHeader").css('display','');
        $("#reporteCliente").css('display','none');
        $("#loadingreporteCliente").css('display','');
      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_reporteVentaCliente';
      }
    })
    .done(function() {
      $('#Cargando_Header').css('display','none');
      $("#loadingHeader").css('display','none');
      $("#reporteCliente").css('display','');
      $("#loadingreporteCliente").css('display','none');
    })
    .fail(function() {
      $('#Cargando_Header').css('display','none');
      $("#loadingHeader").css('display','none');
      $("#reporteCliente").css('display','');
      $("#loadingreporteCliente").css('display','none');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      $('#Cargando_Header').css('display','none');
      $("#loadingHeader").css('display','none');
      $("#reporteCliente").css('display','');
      $("#loadingreporteCliente").css('display','none');
    });
  });
////////////////////////////////////////////////////
//// Reporte Venta Cliente Update 20/11/2019   /////
///////////////////////////////////////////////////

////////////////////////////////////////////////////
//// Reporte Bodega Update 28/08/2020   /////
///////////////////////////////////////////////////
$("#Bodega").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_Bodega/',
    type: 'POST',
    processData: false,
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $('#Cargando_Header').css('display','');
      $("#loadingHeader").css('display','');
      $("#Bodega").css('display','none');
      $("#loadingBodega").css('display','');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_Bodega';
    }
  })
  .done(function() {
    $('#Cargando_Header').css('display','none');
    $("#loadingHeader").css('display','none');
    $("#Bodega").css('display','');
    $("#loadingBodega").css('display','none');
  })
  .fail(function() {
    $('#Cargando_Header').css('display','none');
    $("#loadingHeader").css('display','none');
    $("#Bodega").css('display','');
    $("#loadingBodega").css('display','none');
    $("#modalErrorConexion").modal("show");
  })
  .always(function() {
    $('#Cargando_Header').css('display','none');
    $("#loadingHeader").css('display','none');
    $("#Bodega").css('display','');
    $("#loadingBodega").css('display','none');
  });
});
////////////////////////////////////////////////////
//// Reporte Bodega Update 28/08/2020   /////
///////////////////////////////////////////////////

/////////////////////////////////////////////////
//// Configuración Roles Update 20/06/2019   ////
/////////////////////////////////////////////////
  $("#roles").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_Permisos/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 800000,
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

/////////////////////////////////////////////////
//// Operaciones Ventas  Update 20/06/2019   ////
/////////////////////////////////////////////////
  $("#ventasDirectas").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_VentasDirectas/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $("#loadingHeader").css('display','');
        $("#loadingVentasDirectas").css('display','');
        $("#ventasDirectas").css('display','none');
      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_VentasDirectas';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingVentasDirectas").css('display','none');
      $("#ventasDirectas").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingVentasDirectas").css('display','none');
      $("#ventasDirectas").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      console.log("complete");
    });
  });
/////////////////////////////////////////////////
//// Operaciones Ventas  Update 20/06/2019   ////
/////////////////////////////////////////////////

////////////////////////////////////////////////////////
//// Operaciones Recolecciones  Update 20/06/2019   ////
////////////////////////////////////////////////////////
  $("#recolecciones").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_Recolecciones/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $("#loadingHeader").css('display','');
        $("#loadingRecolecciones").css('display','');
        $("#recolecciones").css('display','none');
      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_Recolecciones';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingRecolecciones").css('display','none');
      $("#recolecciones").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingRecolecciones").css('display','none');
      $("#recolecciones").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      console.log("complete");
    });
  });
////////////////////////////////////////////////////////
//// Operaciones Recolecciones  Update 20/06/2019   ////
////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
//// Usuarios  Update 20/08/2020   ////
////////////////////////////////////////////////////////
  $("#Usuarios").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_Usuario/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $("#loadingHeader").css('display','');
        $("#loadingUsuarios").css('display','');
        $("#Usuarios").css('display','none');
      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_Usuario';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingUsuarios").css('display','none');
      $("#Usuarios").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingUsuarios").css('display','none');
      $("#Usuarios").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      console.log("complete");
    });
  });
////////////////////////////////////////////////////////
//// Usuarios  Update 20/08/2020   ////
////////////////////////////////////////////////////////

/////////////////////////////////////////////////
////     Promociones Update 20/06/2019       ////
/////////////////////////////////////////////////
  $("#promociones").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_Promociones/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 35000,
      beforeSend : function ()
      {
        $("#loadingHeader").css('display','');
        $("#loadingPromociones").css('display','');
        $("#promociones").css('display','none');
      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_Promociones';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingPromociones").css('display','none');
      $("#promociones").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingPromociones").css('display','none');
      $("#promociones").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      console.log("complete");
    });
  });
/////////////////////////////////////////////////
////     Promociones Update 20/06/2019       ////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
////     Clientes Update 28/08/2020       ////
/////////////////////////////////////////////////
  $("#Clientes").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_Cliente/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 35000,
      beforeSend : function ()
      {
        $("#loadingHeader").css('display','');
        $("#loadingClientes").css('display','');
        $("#Clientes").css('display','none');
      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_Cliente';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingClientes").css('display','none');
      $("#Clientes").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingClientes").css('display','none');
      $("#Clientes").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      console.log("complete");
    });
  });
/////////////////////////////////////////////////
////     Clientes Update 28/08/2020       ////
/////////////////////////////////////////////////

/////////////////////////////////////////////
////  Distribuidores Update 18/07/2019   ////
/////////////////////////////////////////////
  $("#distribuidor").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_Distribuidores/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 35000,
      beforeSend : function ()
      {
        $("#loadingHeader").css('display','');
        $("#loadingDistribuidor").css('display','');
        $("#distribuidor").css('display','none');
      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_Distribuidores';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingDistribuidor").css('display','none');
      $("#distribuidor").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingDistribuidor").css('display','none');
      $("#distribuidor").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      console.log("complete");
    });
  });
/////////////////////////////////////////////
////  Distribuidores Update 18/07/2019   ////
/////////////////////////////////////////////





/////////////////////////////////////////////
////     Proveedores Update 18/07/2019   ////
/////////////////////////////////////////////
  $("#proveedores").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_Proveedores/',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $("#loadingHeader").css('display','');
        $("#loadingProveedores").css('display','');
        $("#proveedores").css('display','none');
      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_Proveedores';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingProveedores").css('display','none');
      $("#proveedores").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingProveedores").css('display','none');
      $("#proveedores").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
      console.log("complete");
    });
  });
/////////////////////////////////////////////
////     Proveedores Update 18/07/2019   ////
/////////////////////////////////////////////

///////////////////////////////////////////////////
//// Configuración Compras Update 28/06/2019   ////
///////////////////////////////////////////////////
  $("#compras").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_Compras/',
      type: 'POST',
      processData: false,
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $("#loadingHeader").css('display','');
        $("#loadingCompras").css('display','');
        $("#compras").css('display','none');
      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_Compras';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','');
      $("#loadingCompras").css('display','');
      $("#compras").css('display','none');
    })
    .fail(function() {
      $("#loadingHeader").css('display','');
      $("#loadingCompras").css('display','');
      $("#compras").css('display','none');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
    });
  });
///////////////////////////////////////////////////
//// Configuración Compras Update 28/06/2019   ////
///////////////////////////////////////////////////


///////////////////////////////////////////////////
//// Configuración Empaques Update 28/06/2019   ////
///////////////////////////////////////////////////
$("#Empaques").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_Empaques/',
    type: 'POST',
    processData: false,
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $("#loadingHeader").css('display','');
      $("#loadingEmpaques").css('display','');
      $("#Empaques").css('display','none');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_Empaques';
    }
  })
  .done(function() {
    $("#loadingHeader").css('display','');
    $("#loadingEmpaques").css('display','');
    $("#Empaques").css('display','none');
  })
  .fail(function() {
    $("#loadingHeader").css('display','');
    $("#loadingEmpaques").css('display','');
    $("#Empaques").css('display','none');
    $("#modalErrorConexion").modal("show");
  })
  .always(function() {
  });
});
///////////////////////////////////////////////////
//// Configuración Empaques Update 28/06/2019   ////
///////////////////////////////////////////////////

/////////////////////////////////////
//// Venta Update 20/11/2019   /////
///////////////////////////////////
$("#ventas").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_Ventas/',
    type: 'POST',
    processData: false,
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $('#Cargando_Header').css('display','');
      $("#loadingHeader").css('display','');
      $("#ventas").css('display','none');
      $("#loadingVentas").css('display','');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_Ventas';
    }
  })
  .done(function() {
    $('#Cargando_Header').css('display','none');
    $("#loadingHeader").css('display','none');
    $("#ventas").css('display','');
    $("#loadingVentas").css('display','none');
  })
  .fail(function() {
    $('#Cargando_Header').css('display','none');
    $("#loadingHeader").css('display','none');
    $("#ventas").css('display','');
    $("#loadingVentas").css('display','none');
    $("#modalErrorConexion").modal("show");
  })
  .always(function() {
    $('#Cargando_Header').css('display','none');
    $("#loadingHeader").css('display','none');
    $("#ventas").css('display','');
    $("#loadingVentas").css('display','none');
  });
});
/////////////////////////////////////
//// Venta Update 20/11/2019   /////
///////////////////////////////////

///////////////////////////////////////////////
//// Reporte Salones Update 20/11/2019   /////
//////////////////////////////////////////////
$("#reporteSalones").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_ReporteSalones/',
    type: 'POST',
    processData: false,
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $('#Cargando_Header').css('display','');
      $("#loadingHeader").css('display','');
      $("#reporteSalones").css('display','none');
      $("#loadingreporteSalones").css('display','');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_ReporteSalones';
    }
  })
  .done(function() {
    $('#Cargando_Header').css('display','none');
    $("#loadingHeader").css('display','none');
    $("#reporteSalones").css('display','');
    $("#loadingreporteSalones").css('display','none');
  })
  .fail(function() {
    $('#Cargando_Header').css('display','none');
    $("#loadingHeader").css('display','none');
    $("#reporteSalones").css('display','');
    $("#loadingreporteSalones").css('display','none');
    $("#modalErrorConexion").modal("show");
  })
  .always(function() {
    $('#Cargando_Header').css('display','none');
    $("#loadingHeader").css('display','none');
    $("#reporteSalones").css('display','');
    $("#loadingreporteSalones").css('display','none');
  });
});
///////////////////////////////////////////////
//// Reporte Salones Update 20/11/2019   /////
//////////////////////////////////////////////


///////////////////////////////////////////////
//// Productos Update 28/08/2020   /////
//////////////////////////////////////////////
$("#Productos").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_Productos/',
    type: 'POST',
    processData: false,
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $('#Cargando_Header').css('display','');
      $("#loadingHeader").css('display','');
      $("#Productos").css('display','none');
      $("#loadingProductos").css('display','');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_Productos';
    }
  })
  .done(function() {
    $('#Cargando_Header').css('display','none');
    $("#loadingHeader").css('display','none');
    $("#Productos").css('display','');
    $("#loadingProductos").css('display','none');
  })
  .fail(function() {
    $('#Cargando_Header').css('display','none');
    $("#loadingHeader").css('display','none');
    $("#Productos").css('display','');
    $("#loadingProductos").css('display','none');
    $("#modalErrorConexion").modal("show");
  })
  .always(function() {
    $('#Cargando_Header').css('display','none');
    $("#loadingHeader").css('display','none');
    $("#Productos").css('display','');
    $("#loadingProductos").css('display','none');
  });
});
///////////////////////////////////////////////
//// Productos Update 28/08/2020   /////
//////////////////////////////////////////////

///////////////////////////////////////////////////
//// Configuración Cuentas Update 02/07/2019   ////
///////////////////////////////////////////////////
  $("#cuentas").click(function(event) {

    $.ajax({
      url: window.dir + 'index.php/Controller_Cuentas_x_Pagar/',
      type: 'POST',
      processData: false, 
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $("#loadingHeader").css('display','');
        $("#loadingCuentas").css('display','');
        $("#cuentas").css('display','none');
      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_Cuentas_x_Pagar';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingCuentas").css('display','none');
      $("#cuentas").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingCuentas").css('display','none');
      $("#cuentas").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
    });
  });
///////////////////////////////////////////////////
//// Configuración Cuentas Update 02/07/2019   ////
///////////////////////////////////////////////////

///////////////////////////////////////////////////
////////  Extracciones Update 10/07/2019   ////////
///////////////////////////////////////////////////
  $("#extracciones").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_Extracciones/',
      type: 'POST',
      processData: false, 
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $("#loadingHeader").css('display','');
        $("#loadingExtracciones").css('display','');
        $("#extracciones").css('display','none');
      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_Extracciones';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingExtracciones").css('display','none');
      $("#extracciones").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingExtracciones").css('display','none');
      $("#extracciones").css('display','');
      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
    });
  });
///////////////////////////////////////////////////
////////  Extracciones Update 10/07/2019   ////////
///////////////////////////////////////////////////

/////////////////////////////////////////
//// Facturacion Update 26/06/2019   ////
/////////////////////////////////////////
  $("#facturacion").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_Factura',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $("#loadingHeader").css('display','');
        $("#loadingFacturacion").css('display','');
        $("#facturacion").css('display','none');
      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_Factura';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingFacturacion").css('display','none');
      $("#facturacion").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingFacturacion").css('display','none');
      $("#facturacion").css('display','');
      // Abrir modal Verifique conexión
      $("#modal_verifica").modal('show');
    })
    .always(function() {
    });         
  });
/////////////////////////////////////////
//// Facturacion Update 26/06/2019   ////
/////////////////////////////////////////


//////////////////////////////////////////////
//// Factura Generica Update 26/06/2019   ////
//////////////////////////////////////////////
  $("#facturaGenerica").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_Factura_Generica',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $("#loadingHeader").css('display','');
        $("#loadingFacturaGenerica").css('display','');
        $("#facturaGenerica").css('display','none');
      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_Factura_Generica';
      }
    })
    .done(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingFacturaGenerica").css('display','none');
      $("#facturaGenerica").css('display','');
    })
    .fail(function() {
      $("#loadingHeader").css('display','none');
      $("#loadingFacturaGenerica").css('display','none');
      $("#facturaGenerica").css('display','');
      // Abrir modal Verifique conexión
      $("#modal_verifica").modal('show');
    })
    .always(function() {
    });         
  });
//////////////////////////////////////////////
//// Factura Generica Update 26/06/2019   ////
//////////////////////////////////////////////

////////////////////////////////////////
//// Inventario Update 26/06/2019   ////
////////////////////////////////////////
  $("#inventario").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_Inventario',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $("#loadingInventario").css('display', '');
        $("#inventario").css('display', 'none');
        $("#loadignHeader").css('display', '');
        $("#loadignHeader").removeClass('text-secondary');
        $("#loadignHeader").addClass('text-danger');

      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_Inventario';
      }
    })
    .done(function() {
       $("#loadingInventario").css('display', 'none');
       $("#inventario").css('display', '');
       $("#loadignHeader").css('display', 'none');
       $("#loadignHeader").removeClass('text-danger');
       $("#loadignHeader").addClass('text-secondary');
    })
    .fail(function() {
       $("#loadingInventario").css('display', 'none');
       $("#inventario").css('display', '');
       $("#loadignHeader").css('display', 'none');
       $("#loadignHeader").removeClass('text-danger');
       $("#loadignHeader").addClass('text-secondary');
        // Abrir modal Verifique conexión
        $("#modal_verifica").modal('show');
    })
    .always(function() {
    });         
  });
////////////////////////////////////////
//// Inventario Update 26/06/2019   ////
////////////////////////////////////////

//////////////////////////////////////////
//// Reporte Guia Update 24/07/2019   ////
//////////////////////////////////////////
$("#reporteGuia").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_Reporte_Guia',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $("#loadingReporteGuia").css('display', '');
      $("#reporteGuia").css('display', 'none');
      $("#loadignHeader").css('display', '');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_Reporte_Guia';
    }
  })
  .done(function() {
     $("#loadingReporteGuia").css('display', 'none');
     $("#reporteGuia").css('display', '');
     $("#loadignHeader").css('display', 'none');
  })
  .fail(function() {
     $("#loadingReporteGuia").css('display', 'none');
     $("#reporteGuia").css('display', '');
     $("#loadignHeader").css('display', 'none');
      // Abrir modal Verifique conexión
      $("#modal_verifica").modal('show');
  })
  .always(function() {
  });         
});
//////////////////////////////////////////
//// Reporte Guia Update 24/07/2019   ////
//////////////////////////////////////////

/////////////////////////////////////////////
//// Reporte Ventas Update 15/01/2020   /////
/////////////////////////////////////////////
$("#reporteVentas").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_Reporte_Venta',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $("#loadingreporteVentas").css('display', '');
      $("#reporteVentas").css('display', 'none');
      $("#loadignHeader").css('display', '');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_Reporte_Venta';
    }
  })
  .done(function() {
     $("#loadingreporteVentas").css('display', 'none');
     $("#reporteVentas").css('display', '');
     $("#loadignHeader").css('display', 'none');
  })
  .fail(function() {
     $("#loadingreporteVentas").css('display', 'none');
     $("#reporteVentas").css('display', '');
     $("#loadignHeader").css('display', 'none');
      // Abrir modal Verifique conexión
      $("#modal_verifica").modal('show');
  })
  .always(function() {
  });         
});
/////////////////////////////////////////////
//// Reporte Ventas Update 15/01/2020   /////
/////////////////////////////////////////////

/////////////////////////////////////////////
//// Reporte VPF Update 15/01/2020      /////
/////////////////////////////////////////////
$("#reporteVPF").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_ReporteVPF',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $("#loadingreporteVPF").css('display', '');
      $("#reporteVPF").css('display', 'none');
      $("#loadignHeader").css('display', '');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_ReporteVPF';
    }
  })
  .done(function() {
     $("#loadingreporteVPF").css('display', 'none');
     $("#reporteVPF").css('display', '');
     $("#loadignHeader").css('display', 'none');
  })
  .fail(function() {
     $("#loadingreporteVPF").css('display', 'none');
     $("#reporteVPF").css('display', '');
     $("#loadignHeader").css('display', 'none');
      // Abrir modal Verifique conexión
      $("#modal_verifica").modal('show');
  })
  .always(function() {
  });         
});
/////////////////////////////////////////////
//// Reporte VPF Update 15/01/2020      /////
/////////////////////////////////////////////

/////////////////////////////////////////////////////
//// Inventario Interno Updated 23/01/2020      /////
/////////////////////////////////////////////////////
$("#inventarioInterno").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_InventarioInterno',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $("#loadingInventarioInterno").css('display', '');
      $("#inventarioInterno").css('display', 'none');
      $("#loadignHeader").css('display', '');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_InventarioInterno';
    }
  })
  .done(function() {
     $("#loadingInventarioInterno").css('display', 'none');
     $("#inventarioInterno").css('display', '');
     $("#loadignHeader").css('display', 'none');
  })
  .fail(function() {
     $("#loadingInventarioInterno").css('display', 'none');
     $("#inventarioInterno").css('display', '');
     $("#loadignHeader").css('display', 'none');
      // Abrir modal Verifique conexión
      $("#modal_verifica").modal('show');
  })
  .always(function() {
  });         
});
/////////////////////////////////////////////////////
//// Inventario Interno Updated 23/01/2020      /////
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
////    Clientes WEB      Updated 23/01/2020    /////
/////////////////////////////////////////////////////
$("#clientesWeb").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_Clientes_Web',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $("#loadingClientesWeb").css('display', '');
      $("#clientesWeb").css('display', 'none');
      $("#loadignHeader").css('display', '');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_Clientes_Web';
    }
  })
  .done(function() {
     $("#loadingClientesWeb").css('display', 'none');
     $("#clientesWeb").css('display', '');
     $("#loadignHeader").css('display', 'none');
  })
  .fail(function() {
     $("#loadingClientesWeb").css('display', 'none');
     $("#clientesWeb").css('display', '');
     $("#loadignHeader").css('display', 'none');
      // Abrir modal Verifique conexión
      $("#modal_verifica").modal('show');
  })
  .always(function() {
  });         
});
/////////////////////////////////////////////////////
////    Clientes WEB      Updated 23/01/2020    /////
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
////    Ventas WEB        Updated 23/01/2020    /////
/////////////////////////////////////////////////////
$("#ventasWeb").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_Ventas_Web',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $("#loadingVentasWeb").css('display', '');
      $("#ventasWeb").css('display', 'none');
      $("#loadignHeader").css('display', '');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_Ventas_Web';
    }
  })
  .done(function() {
     $("#loadingVentasWeb").css('display', 'none');
     $("#ventasWeb").css('display', '');
     $("#loadignHeader").css('display', 'none');
  })
  .fail(function() {
     $("#loadingVentasWeb").css('display', 'none');
     $("#ventasWeb").css('display', '');
     $("#loadignHeader").css('display', 'none');
      // Abrir modal Verifique conexión
      $("#modal_verifica").modal('show');
  })
  .always(function() {
  });         
});
/////////////////////////////////////////////////////
////    Ventas WEB        Updated 23/01/2020    /////
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
////    Usuarios Packing  Updated 23/01/2020    /////
/////////////////////////////////////////////////////
$("#usuarioPacking").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_Usuario_Packing',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $("#loadingUsuarioPacking").css('display', '');
      $("#usuarioPacking").css('display', 'none');
      $("#loadignHeader").css('display', '');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_Usuario_Packing';
    }
  })
  .done(function() {
     $("#loadingUsuarioPacking").css('display', 'none');
     $("#usuarioPacking").css('display', '');
     $("#loadignHeader").css('display', 'none');
  })
  .fail(function() {
     $("#loadingUsuarioPacking").css('display', 'none');
     $("#usuarioPacking").css('display', '');
     $("#loadignHeader").css('display', 'none');
      // Abrir modal Verifique conexión
      $("#modal_verifica").modal('show');
  })
  .always(function() {
  });         
});
/////////////////////////////////////////////////////
////    Usuarios Packing  Updated 23/01/2020    /////
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
//// Reporte Extracciones Updated 23/01/2020    /////
/////////////////////////////////////////////////////
$("#reporteExtraccionesInt").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_Reporte_Extracciones_Int',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $("#loadingReporteExtraccionesInt").css('display', '');
      $("#reporteExtraccionesInt").css('display', 'none');
      $("#loadignHeader").css('display', '');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_Reporte_Extracciones_Int';
    }
  })
  .done(function() {
     $("#loadingReporteExtraccionesInt").css('display', 'none');
     $("#reporteExtraccionesInt").css('display', '');
     $("#loadignHeader").css('display', 'none');
  })
  .fail(function() {
     $("#loadingReporteExtraccionesInt").css('display', 'none');
     $("#reporteExtraccionesInt").css('display', '');
     $("#loadignHeader").css('display', 'none');
      // Abrir modal Verifique conexión
      $("#modal_verifica").modal('show');
  })
  .always(function() {
  });         
});
/////////////////////////////////////////////////////
//// Reporte Extracciones Updated 23/01/2020    /////
/////////////////////////////////////////////////////

/////////////////////////////////////////
//// Picking Update 23/01/2020      /////
/////////////////////////////////////////
$("#picking").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_Picking',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $("#loadingPicking").css('display', '');
      $("#picking").css('display', 'none');
      $("#loadignHeader").css('display', '');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_Picking';
    }
  })
  .done(function() {
     $("#loadingPicking").css('display', 'none');
     $("#picking").css('display', '');
     $("#loadignHeader").css('display', 'none');
  })
  .fail(function() {
     $("#loadingPicking").css('display', 'none');
     $("#picking").css('display', '');
     $("#loadignHeader").css('display', 'none');
      // Abrir modal Verifique conexión
      $("#modal_verifica").modal('show');
  })
  .always(function() {
  });         
});
/////////////////////////////////////////
//// Picking Update 23/01/2020      /////
/////////////////////////////////////////

//////////////////////////////////////////////////////////
//// Reporte Ventas X Salones Update 23/01/2020      /////
//////////////////////////////////////////////////////////
$("#reportexSalones").click(function(event) {
  $.ajax({
    url: window.dir + 'index.php/Controller_ReportexVentas',
    type: 'POST',
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    timeout: 800000,
    beforeSend : function ()
    {
      $("#loadingreportexSalones").css('display', '');
      $("#reportexSalones").css('display', 'none');
      $("#loadignHeader").css('display', '');
    },
    success: function(data)
    {
      window.location = window.dir + 'index.php/Controller_ReportexVentas';
    }
  })
  .done(function() {
     $("#loadingreportexSalones").css('display', 'none');
     $("#reportexSalones").css('display', '');
     $("#loadignHeader").css('display', 'none');
  })
  .fail(function() {
     $("#loadingreportexSalones").css('display', 'none');
     $("#reportexSalones").css('display', '');
     $("#loadignHeader").css('display', 'none');
      // Abrir modal Verifique conexión
      $("#modal_verifica").modal('show');
  })
  .always(function() {
  });         
});
//////////////////////////////////////////////////////////
//// Reporte Ventas X Salones Update 23/01/2020      /////
//////////////////////////////////////////////////////////

///////////////////////////////////////////
//// Cerrar Sesión Update 26/06/2019   ////
///////////////////////////////////////////
  $("#cerrarSesion").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_Login/cerrarSesion',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $("#loadingCerrarSesion").css('display', '');
        $("#cerrarSesion").css('display', 'none');
        $("#loadignHeader").css('display', '');
        $("#loadignHeader").removeClass('text-secondary');
        $("#loadignHeader").addClass('text-danger');

      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_Login';
      }
      })
      .done(function() {
         $("#loadingCerrarSesion").css('display', 'none');
         $("#cerrarSesion").css('display', '');
         $("#loadignHeader").css('display', 'none');
         $("#loadignHeader").removeClass('text-danger');
         $("#loadignHeader").addClass('text-secondary');
      })
      .fail(function() {
         $("#loadingCerrarSesion").css('display', 'none');
         $("#cerrarSesion").css('display', '');
         $("#loadignHeader").css('display', 'none');
         $("#loadignHeader").removeClass('text-danger');
         $("#loadignHeader").addClass('text-secondary');
          // Abrir modal Verifique conexión
          $("#modal_verifica").modal('show');
      })
      .always(function() {
      });         
  });
///////////////////////////////////////////
//// Cerrar Sesión Update 26/06/2019   ////
///////////////////////////////////////////


///////////////////////////////////////////
//// Cerrar Sesión Update 21/08/2019   ////
///////////////////////////////////////////
  $("#cerrarSesion2").click(function(event) {
    $.ajax({
      url: window.dir + 'index.php/Controller_Login/cerrarSesion',
      type: 'POST',
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $("#loadingCerrarSesion2").css('display', '');
        $("#cerrarSesion2").css('display', 'none');
        $("#loadignHeader").css('display', '');
        $("#loadignHeader").removeClass('text-secondary');
        $("#loadignHeader").addClass('text-danger');

      },
      success: function(data)
      {
        window.location = window.dir + 'index.php/Controller_Login';
      }
      })
      .done(function() {
         $("#loadingCerrarSesion2").css('display', 'none');
         $("#cerrarSesion2").css('display', '');
         $("#loadignHeader").css('display', 'none');
         $("#loadignHeader").removeClass('text-danger');
         $("#loadignHeader").addClass('text-secondary');
      })
      .fail(function() {
         $("#loadingCerrarSesion2").css('display', 'none');
         $("#cerrarSesion2").css('display', '');
         $("#loadignHeader").css('display', 'none');
         $("#loadignHeader").removeClass('text-danger');
         $("#loadignHeader").addClass('text-secondary');
          // Abrir modal Verifique conexión
          $("#modal_verifica").modal('show');
      })
      .always(function() {
      });         
  });
///////////////////////////////////////////
//// Cerrar Sesión Update 21/08/2019   ////
///////////////////////////////////////////

/// Cerrar Modal en caso de Error //
$("#Cerrar_Conexion").click(function(event) {
  $("#Modal_Conexion").modal("hide");
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

// funcion para validar el correo
function caracteresCorreoValido(email, div){
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    if (caract.test(email) == false){
        $(div).hide().removeClass('hide').slideDown('fast');

        return false;
    }else{
        $(div).hide().addClass('hide').slideDown('slow');
        return true;
    }
}