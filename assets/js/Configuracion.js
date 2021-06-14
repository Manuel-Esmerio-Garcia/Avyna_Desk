window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';

$(document).ready(function() {

  //Cargamos información
  Cargar_Informacion();

  //Consumir WebServices Codigo Postal
  /*$("#CP").change(function(event) {

    let CP = $("#CP").val();
    
    var formData = new FormData();
      formData.append("CP", CP);

      $.ajax({
        url: 'https://api-codigos-postales.herokuapp.com/v2/codigo_postal/' + CP,
        type: 'GET',
        processData: false,  // tell jQuery not to process the data
        contentType: false,
        timeout: 35000,
        beforeSend : function ()
        {
          $("#Cargando_Header").css('display', '');
        },
        success: function(data)
        {
          console.log(data);

              if (data.estado != null && data.estado != "")
              {
                $("#Pais").val("México");
                $("#Estado").val(data.estado);
                $("#Municipio").val(data.municipio);

                $("#Colonia").empty();

                for (var i = 0; i < data.colonias.length; i++)
                {
                  $("#Colonia").append("<option value='" + data.colonias[i] + "'>" + data.colonias[i] + "</option>");
                }

                $("#Estado").attr('readonly', 'readonly');
                $("#Municipio").attr('readonly', 'readonly');
                $("#Pais").attr('readonly', 'readonly');
              }
              else
              {
                $("#Estado").val("");
                $("#Municipio").val("");
                $("#Pais").val("");

                $("#Estado").removeAttr('readonly');
                $("#Municipio").removeAttr('readonly');
                $("#Pais").removeAttr('readonly');
                $("#Colonia").empty();
              }
        }
        })
        .done(function() {
          $("#Cargando_Header").css('display', 'none');
        })
        .fail(function() {
          $("#Cargando_Header").css('display', 'none');
        })
        .always(function() {
               console.log("complete");
        });
  });*/


  $("#GuardarConfiguracion").click(function(event) {

        let Razon_Social        = $('#Razon_Social').val();
        let RFC                 = $('#RFC').val();
        let CP                  = $('#CP').val();
        let Regimen             = $('#cmbRegimenFiscal').val();
        let Pais                = $('#Pais').val();
        let Municipio           = $('#Municipio').val();
        let Estado              = $('#Estado').val();
        let Direccion           = $('#Direccion').val();
        let Colonia             = $('#Colonia').val();
        let Email               = $('#Email').val();
        let Tel1                = $('#Telefono1').val();
        let Tel2                = $('#Telefono2').val();
        let ID                  = $('#idEmpresa').val();
        let Contacto            = $('#Contacto').val();
        let customerNumber      = $('#customerNumber').val();
        let numExt              = $('#numExt').val();
        let numInt              = $('#numInt').val();
        let combo               = document.getElementById("cmbRegimenFiscal");
        let selected            = combo.options[combo.selectedIndex].text;

        if (Razon_Social != "")
        {
          if (RFC != "")
          {
            if (CP != "")
            {

              var formData = new FormData();
              formData.append("ID", ID);
              formData.append("Razon_Social", Razon_Social);
              formData.append("RFC", RFC);
              formData.append("Clave_Regimen_Fiscal", Regimen);
              formData.append("Descripcion_Regimen_Fiscal", selected);
              formData.append("Pais", Pais);
              formData.append("CP", CP);
              formData.append("Municipio", Municipio);
              formData.append("Estado", Estado);
              formData.append("Direccion", Direccion);
              formData.append("Colonia", Colonia);
              formData.append("Email", Email);
              formData.append("Telefono1", Tel1);
              formData.append("Telefono2", Tel2);
              formData.append("Contacto", Contacto);
              formData.append("numInt", numInt);
              formData.append("numExt", numExt);
              formData.append("customerNumber", customerNumber);

              $.ajax({
                  url: window.dir + 'index.php/Controller_Configuracion/updateEmpresa',
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
                        "timeOut": "1500",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                      }
                          toastr.success('Datos guardados con exito', 'Correcto');
                    }
                    else
                    {
                      toastr.error('Ocurrio un error al guardar los cambios', 'Error');
                    }

                  }
              })
              .done(function() {
                  $('#Cargando_Header').css('display','none');
              })
              .fail(function(jqXHR, textStatus, errorThrown) {

              })
              .always(function() {
                  
              }); 

            }
            else
            {
              toastr.error('El Codigo Postal es obligatorio', 'Error');
              //swal('Error !!','El Codigo Postal es obligatorio', 'error');
            }
          }
          else
          {
            toastr.error('El RFC es obligatorio', 'Error');
            //swal('Error !!','El RFC es obligatorio', 'error');
          }
        }
        else
        {
          toastr.error('El Regimen Fiscal es obligatorio', 'Error');
          //swal('Error !!','El Regimen Fiscal es obligatorio', 'error');
        }
  });

  $('#EliminarCSD').click(function(event)
  {
      Toast();

      swal({
        title: "¿Esta seguro de eliminar los certificados?",
        text: "Al eliminar los certificados ya no sera posible timbrar",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => 
      {
        if (willDelete)
        {
          var form = $('#form_Valida_CSD')[0];                                                                      //Obtemos los datos del formulario de la modal
          var formData = new FormData(form); 

          $.ajax({
          url: dir + 'index.php/Controller_Configuracion/EliminarCertificados',                                               //Metodo que va a recibir los datos del formulario en PHP
          type: "post",                                                                                    //Tipo de envio de la infomación
           //dataType: "json",
          processData: false,  // tell jQuery not to process the data
          contentType: false,
          data:formData,
          beforeSend : function ()
          {
               $('#Cargando_Header').css('display','');
          },                                                                                   //Mandamos los datos del formulario por Ajax
          success: function(data)
          {
            console.log(data);

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
                  "timeOut": "1500",
                  "extendedTimeOut": "1000",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut",
                  "onHidden": function(){location.reload();}
                }
                
                toastr.success('Certificados eliminados con exito', 'Correcto');
            }
            else
            {
                 toastr.error('Ocurrio un error al eliminar los certificados', 'Error');
            }
          }

          })
          .done( function (data, status) {
              $('#Cargando_Header').css('display','none');
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
          })
          .always(function() {
          });  

        }

      });

    });


  $('#ValidarCSD').click(function(event)
  {
    Toast();

    let Pass        = $('#Contraseña').val();
    let ConfirPass  = $('#Confir_Contraseña').val();
    let Cer         = $('#CSD_cer').val();
    let Key         = $('#CSD_key').val();

    if (Pass != "")
    {
      if (ConfirPass != "")
      {
        if (Pass == ConfirPass)
        {

          var form = $('#form_Valida_CSD')[0];                                                                      //Obtemos los datos del formulario de la modal
          var formData = new FormData(form); 

              $.ajax({
              url: dir + 'index.php/Controller_Configuracion/ManejoCertificado',                                               //Metodo que va a recibir los datos del formulario en PHP
              type: "post",                                                                                    //Tipo de envio de la infomación
               //dataType: "json",
              processData: false,  // tell jQuery not to process the data
              contentType: false,
              timeout: 45000,
              data:formData,                                                                                   //Mandamos los datos del formulario por Ajax
              beforeSend : function ()
              {
                   $('#Cargando_Header').css('display','');
              },
              success: function(data)
              {
                switch(data.trim()){

                  case 'FechaFinal':
                  toastr.error('Al obtener la fecha de termino', 'Error');
                  //swal("Error !!", "Al obtener la fecha de termino","error");
                  break;
                  case 'FechaInicio':
                  toastr.error('Al obtener la fecha de inicio', 'Error');
                  //swal("Error !!", "Al obtener la fecha de inicio","error");
                  break;
                  case 'Serie':
                  toastr.error('Al obtener el N° Certificado', 'Error');
                  //swal("Error !!", "Al obtener el N° Certificado","error");
                  break;
                  case 'Valida':
                  toastr.error('Al validar los certificados', 'Error');
                  //swal("Error !!", "Al validar los certificados","error");
                  break;
                  case 'Pareja':
                  toastr.error('Los certificados no coiciden', 'Error');
                  //swal("Error !!", "Los certificados no coiciden","error");
                  break;
                  case 'CER':
                  toastr.error('Al leer el certificado .CER', 'Error');
                  //swal("Error !!", "Al leer el certificado .CER","error");
                  break;
                  case 'KEY':
                  toastr.error('Al leer el certificado .KEY', 'Error');
                  //swal("Error !!", "Al leer el certificado .KEY","error");
                  break;
                  case 'Error':
                  toastr.error('Error al guardar los nuevos Certificados', 'Error');
                  //swal("Error !!", "Error al guardar los nuevos Certificados","error");
                  break;
                  case 'Contrasena':
                  toastr.error('Error la contraseña no pertenece al Certificado', 'Error');
                  //swal("Contraseña !!", "Error la contraseña no pertenece al Certificado","error");
                  break;
                  case '1':
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
                    "timeOut": "1500",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut",
                    "onHidden": function(){location.reload();}
                  }

                  toastr.success('Datos guardados con exito', 'Correcto');
                  break;
                  case '0':
                  toastr.error('Hubo un error al guardar los certificados por favor intente de nuevo', 'Error'); 
                  break;

                }

              }
              })
              .done( function (data, status) {
                   $('#Cargando_Header').css('display','none');
              })
              .fail( function( jqXHR, textStatus, errorThrown ) {
              });    
        }
        else
        {
            toastr.error('La contraseñas no coiciden, por favor de validar', 'Error');
            $('#Confir_Contraseña').val("");
        }
      }
      else
      {
          toastr.warning('Por favor ingrese la confirmación de la contraseña de los CSD', 'Advertencia');
      }
    }
    else
    {
        toastr.warning('Por favor ingrese la contraseña de los CSD', 'Advertencia');
    }
  });

});//End funcion principal

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
    "timeOut": "1500",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

}

function Cargar_Informacion()
{
  let formData = new FormData();

  $.ajax({
     url: window.dir + 'index.php/Controller_Configuracion/Cargar_Informacion',
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
          let parsed = JSON.parse(data);

          console.log(parsed);


          if (parsed['Empresa'] != null)
          {
            Cargar_Colonia(parsed['Empresa'][0]['CP']);
            
            $('#Razon_Social').val(parsed['Empresa'][0]['Razon_Social']);
            $('#RFC').val(parsed['Empresa'][0]['RFC']);
            $('#CP').val(parsed['Empresa'][0]['CP']);
            $('#cmbRegimenFiscal').val(parsed['Empresa'][0]['Clave_Regimen_Fiscal']);
            $('#Pais').val(parsed['Empresa'][0]['Pais']);
            $('#Municipio').val(parsed['Empresa'][0]['Municipio']);
            $('#Estado').val(parsed['Empresa'][0]['Estado']);
            $('#Direccion').val(parsed['Empresa'][0]['Direccion']);
            $('#Colonia').val(parsed['Empresa'][0]['Colonia']);
            $('#Email').val(parsed['Empresa'][0]['Email']);
            $('#Telefono1').val(parsed['Empresa'][0]['Telefono1']);
            $('#Telefono2').val(parsed['Empresa'][0]['Telefono2']);
            $('#idEmpresa').val(parsed['Empresa'][0]['ID']);
            $('#Contacto').val(parsed['Empresa'][0]['Contacto']);
            $('#customerNumber').val(parsed['Empresa'][0]['customerNumber']);
            $('#numExt').val(parsed['Empresa'][0]['numExt']);
            $('#numInt').val(parsed['Empresa'][0]['numInt']);

            if (parsed['Empresa'][0]['noCertificado'] != null && parsed['Empresa'][0]['noCertificado'] != "")
            {
              $("#Contraseña").val(parsed['Empresa'][0]['Pass_CSD']);
              $("#Confir_Contraseña").val(parsed['Empresa'][0]['Pass_CSD']);
              $("#Certificado").val(parsed['Empresa'][0]['noCertificado']);
              $("#Desde").val(parsed['Empresa'][0]['Vigencia_Desde']);
              $("#Hasta").val(parsed['Empresa'][0]['Vigencia_Hasta']);

              $("#Contraseña").attr('readonly', 'readonly');
              $("#Confir_Contraseña").attr('readonly', 'readonly');
              $("#ValidarCSD").attr('disabled', 'disabled');
              $("#EliminarCSD").removeAttr('disabled');
              $("#CSD_cer").attr('disabled', 'disabled');
              $("#CSD_key").attr('disabled', 'disabled');
            }
            else
            {
              $("#Contraseña").removeAttr('readonly');
              $("#Confir_Contraseña").removeAttr('readonly');
              $("#ValidarCSD").removeAttr('disabled');
              $("#EliminarCSD").attr('disabled','disabled');
              $("#CSD_cer").removeAttr('disabled');
              $("#CSD_key").removeAttr('disabled');
            }


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


function Cargar_Colonia(CP) {
  
    var formData = new FormData();
      formData.append("CP", CP);

      $.ajax({
        url: 'https://api-codigos-postales.herokuapp.com/v2/codigo_postal/' + CP,
        type: 'GET',
        processData: false,  // tell jQuery not to process the data
        contentType: false,
        timeout: 35000,
        beforeSend : function ()
        {
          $("#Cargando_Header").css('display', '');
        },
        success: function(data)
        {
          console.log(data);

              if (data.estado != null && data.estado != "")
              {
                $("#Pais").val("México");
                $("#Estado").val(data.estado);
                $("#Municipio").val(data.municipio);

                $("#Colonia").empty();

                for (var i = 0; i < data.colonias.length; i++)
                {
                  $("#Colonia").append("<option value='" + data.colonias[i] + "'>" + data.colonias[i] + "</option>");
                }

                $("#Estado").attr('readonly', 'readonly');
                $("#Municipio").attr('readonly', 'readonly');
                $("#Pais").attr('readonly', 'readonly');
              }
              else
              {
                $("#Estado").val("");
                $("#Municipio").val("");
                $("#Pais").val("");

                $("#Estado").removeAttr('readonly');
                $("#Municipio").removeAttr('readonly');
                $("#Pais").removeAttr('readonly');
                $("#Colonia").empty();
              }
        }
        })
        .done(function() {
          $("#Cargando_Header").css('display', 'none');
        })
        .fail(function() {
          $("#Cargando_Header").css('display', 'none');
        })
        .always(function() {
               console.log("complete");
        });

}