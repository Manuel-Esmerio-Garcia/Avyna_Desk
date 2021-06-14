var ID;
var linea;
dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';

//////////////////////////////////////////////////////////////////////////////
////                                                                      ////
////                                                                      ////
////    Se obtinene los valores de la seleccionada                        ////
////                                                                      ////
////                                                                      ////
//////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {
    $('#dist-table-data').dataTable({
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
    
} );

window.addEventListener("load",function(e){
    var mitabla = document.getElementById("dist-table-data");
    mitabla.onclick = function(e){
        linea = e.target.parentNode;

        var IdDistribuidor = linea.cells[0].innerHTML;
        var Nombre = linea.cells[1].innerHTML;
        var Apellidos = linea.cells[2].innerHTML;
        var Empresa = linea.cells[3].innerHTML;
        var Cargo = linea.cells[4].innerHTML;
        var Direccion = linea.cells[5].innerHTML;
        var Colonia = linea.cells[6].innerHTML;
        var Ciudad = linea.cells[7].innerHTML;
        var Municipio = linea.cells[8].innerHTML;
        var Estado = linea.cells[9].innerHTML;
        var Pais = linea.cells[10].innerHTML;
        var CP = linea.cells[11].innerHTML;
        var RFC = linea.cells[12].innerHTML;
        var Tel1 = linea.cells[13].innerHTML;
        var Tel2 = linea.cells[14].innerHTML;
        var Email = linea.cells[15].innerHTML;
        var Descuento = linea.cells[16].innerHTML;
        var Status = linea.cells[17].innerHTML;
        var Dia = linea.cells[18].innerHTML;
        var Region = linea.cells[19].innerHTML;
        var Zona = linea.cells[20].innerHTML;
        var Impuesto = linea.cells[21].innerHTML;
        var Idioma = linea.cells[22].innerHTML;
        var Puntos = linea.cells[23].innerHTML;
        var Envio = linea.cells[24].innerHTML;
        var Fecha = linea.cells[25].innerHTML;
        var Sucursal = linea.cells[26].innerHTML;
        var IDSucursal = linea.cells[27].innerHTML;

        ID = IdDistribuidor;

//////////////////////////////////////////////////////////////////////////////
////    Acció al dar click a editar en la pestaña de Distribuidores       ////
////                                                                      ////
////                                                                      ////
//////////////////////////////////////////////////////////////////////////////

    };

$("#modal_edit_distributor").click(function(event) {

    if (linea != null) {

        Function_Editar_Distri();

    }else{

        swal("Advertencia","Por favor seleccione a un distribuidor","warning");

        swal({
     title: "Advertencia!",
     text: "Por favor seleccione a un distribuidor",
     type: "warning",
     timer: 3000
     });

    }
});
    

});






window.addEventListener("load",function(){

        //////////////////////////////////////////////////////////////////////////////
        ////    Acción agregar clientes con Ajax                                  ////
        //////////////////////////////////////////////////////////////////////////////

    $("#btn_new_distributor").click(function(){

        var check = validateNewDistributor();

        if(check == false)
        {

            var form = $('#form_new_distributor')[0];
            var formData = new FormData(form);

            $.ajax({
                url: dir+'index.php/Distribuidor/insertNewDistributorInvoice',
                type: "post",
                //dataType: "json",
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                data:formData,
                beforeSend : function ()
                {
                    $('#btn_new_distributor').text("Guardando...");
                    $('#btn_new_distributor').attr("disabled","disabled");
                    $('#Cargando_Nuevo_Cliente').removeAttr('hidden');
                },
                success: function(data){
                console.log(data);

                if(data == true)
                {
                    swal("Good job!", "Se ha agregado el nuevo usuario de manera exitosa", "success");
                   //alert("Se ha agregado el nuevo usuario de manera exitosa");  
                   location.reload();

                   //(table.ajax.reload();                
                }
                else
                {
                    swal("oh oh!", "Hubo un error al ingresar los datos del usuario. Vuelva a intentarlo de nuevo", "error");
                    //alert("Hubo un error al ingresar los datos del usuario. Vuelva a intentarlo de nuevo");
                }
                
                }

                })
                .done( function (data, status) {

                    $('#btn_new_distributor').text("Guardar");
                    $('#btn_new_distributor').removeAttr("disabled");
                    $('#Cargando_Nuevo_Cliente').attr('hidden', 'hidden');
                })
                .fail( function( jqXHR, textStatus, errorThrown ) {

                                    if (jqXHR.status === 0) {

                                      console.log('Not connect: Verify Network.');

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

                                    });
        }
    });

        //////////////////////////////////////////////////////////////////////////////
        ////    Acción Editar clientes con Ajax                                   ////
        //////////////////////////////////////////////////////////////////////////////

    $("#btn_modal_edit_distributor_save").click(function(){
        var check = validateEditDistributor(); 

        if(check == false)
        {

            swal({
                title: "¿Estás seguro?",
                text: "El distribuidor " + linea.cells[1].innerHTML + " " + linea.cells[2].innerHTML + " sera modificado",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {

            //var form1 = $('#form_edit_client')[0];
            //var formData1 = new FormData(form1);
            var form = $('#form_edit_distributor')[0];
            var formData = new FormData(form);

            $.ajax({
                url: dir+'index.php/Distribuidor/editDistributorInvoice',
                type: "post",
                //dataType: "json",
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 35000,
                data:formData,
                beforeSend : function ()
                {
                    $('#btn_modal_edit_distributor_save').text("Guardando Cambios...");
                    $('#btn_modal_edit_distributor_save').attr("disabled","disabled");
                    $('#Cargando_Edit_Cliente').removeAttr('hidden');
                },
                success: function(data){

                if(data == true)
                {
                   swal("Good job!","Se ha actualizado los campos del distribuidor de manera exitosa", "success"); 
                   $("#btn_modal_edit_distributor_close").trigger('click');

                   location.reload();       
                }
                else
                { 
                    swal("oh oh!", "Hubo un error al actualizar los datos del distribuidor. Vuelva a intentarlo de nuevo", "error");
                }
                
                }

                })
                .done( function (data, status) {
                    $('#btn_modal_edit_distributor_save').text("Guardar Cambios");
                    $('#btn_modal_edit_distributor_save').removeAttr("disabled");
                    $('#Cargando_Edit_Cliente').attr('hidden','hidden');
                })
               .fail( function( jqXHR, textStatus, errorThrown ) {

                                    if (jqXHR.status === 0) {

                                      console.log('Not connect: Verify Network.');

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

                                    });

                } else 
                {
                     swal("Proceso cancelado", "", "info");
                     $("#btn_modal_edit_distributor_close").trigger('click');
                }
});
        }
    });

        //////////////////////////////////////////////////////////////////////////////
        ////    Acción eliminar clientes con Ajax                                 ////
        //////////////////////////////////////////////////////////////////////////////

    $("#deleteDistributor").click(function()
    {

            if (linea !=null) 
            {
                var formData1 = 'ID=' + linea.cells[0].innerHTML;

                swal({
                title: "¿Estás seguro?",
                text: "El distribuidor " + linea.cells[1].innerHTML + " " + linea.cells[2].innerHTML + " sera eliminado",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
            if (willDelete) 
            {

                $.ajax({
                url: dir+'index.php/Distribuidor/deleteDistributor',
                type: "post",
                //dataType: "json",
                timeout: 35000,
                processData: false,
                data:formData1,
                beforeSend : function ()
                 {

                },      
                success: function(data)
                {

                    if(data == true)
                    {
                    swal("Good job!", " El distribuidor fue eliminado exitosamente", {
                  icon: "success",
                    });
                    location.reload(); 
                    }
                    else
                    {
                   swal("oh oh!","Hubo un problema al intentar eliminar los datos del distribuidor. Vuelva a intentarlo de nuevo", "error");
                    }
                                            
                }

                })
                .done( function (data, status) {


                })
                .fail( function (data, status) {
                    //do whatever you want with the return data upon error
                    //alert("Estoy en el fail");
                });

              } else {
                swal("Proceso cancelado", "", "info");
              }
            });

            }//End IF linea != NULL
            else{

                swal("Advertencia", "Para eliminar por favor selecciona un distribuidor", "warning");
            }
        
    }); //Funcion Eliminar

});

function isNumberKey(evt)
    {
        var charCode = (evt.which) ? evt.which : event.keyCode
        if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))
            return false;
        return true;
    }

    function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }

    function validateNumber(number)
    {
        var reg = new RegExp('^[0-9]+$');
        return reg.test(number);
    }

    function validatePositiveNumber(e)
    {   
        var check = true; 
        if (e.which < 48 || e.which > 57) 
        {
            check = false;  // stop processing
        }
        return check; 
    }


    function validatePositivePercentageNumber(e, value)
    {
       
       if (!e.target.validity.valid) {
        e.target.value = value.substring(0,value.length - 1);
        return false;
      }
        var idx = value.indexOf('.');
      if (idx >= 0) {
        if (value.length - idx > 3 ) {
          e.target.value = value.substring(0,value.length - 1);
          return false;
        }
      }
      return true;
    }

    function validateRFC(rfc)
    {
        var reg = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/; 
        return reg.test(rfc); 
    }

    function validatePhone(phone)
    {
        var reg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
        var phone = "" + phone;
        return reg.test(phone); 
    }

    function validatePositiveDecimalNumber(number)
    {
        var reg = /^\d+(\.\d{1,2})?$/;
        var numberText = "" + number; 
        return reg.test(numberText); 
    }

    function getAllNewDistributorDivisions()
    {
         var count = table2.rows().count();
         return count;
    }

    function validateNewDistributor()
    {
        var check = false;

        try
        {
            var name = $("#txt_new_distributor_name").val();
            var lastname = $("#txt_new_distributor_lastname").val();
            var company = $("#txt_new_distributor_company").val();
            var position = $("#txt_new_distributor_position").val();
            var address = $("#txt_new_distributor_address").val();
            var colony = $("#txt_new_distributor_colony").val();
            var city = $("#txt_new_distributor_city").val();
            var town = $("#txt_new_distributor_town").val();
            var state = $("#txt_new_distributor_state").val();
            var country = $("#txt_new_distributor_country").val();
            var postalCode = $("#txt_new_distributor_postal_code").val();
            var rfc = $("#txt_new_distributor_rfc").val();
            var phone1 = $("#txt_new_distributor_phone1").val();
            var phone2 = $("#txt_new_distributor_phone2").val();
            var email = $("#txt_new_distributor_email").val(); 
            var status = $("#cmb_new_distributor_status").val();
            var discount = $("#txt_new_distributor_discount").val();
            var deliveryDay = $("#cmb_new_distributor_delivery_days").val(); 
            var branch = $("#cmb_new_distributor_branch").val(); 
            var region = $("#txt_new_distributor_region").val();
            var zone = $("#txt_new_distributor_zone").val();
            var tax = $("#txt_new_distributor_tax").val();
            var idiom = $("#cmb_new_distributor_idiom").val(); 
            var points = $('#chk_new_distributor_points').is(":checked");

            //var divitions = getAllNewDistributorDivisions();
            var minSending = $("#txt_new_distributor_min_sending").val();

            if(name != null && lastname != null && company != null && phone1 != null && email != null && status != null && discount != null && tax != null && minSending != null && points != null)
            {
                if(name.length > 0 && lastname.length > 0 && company.length > 0 && phone1.length > 0 && email.length > 0 && status.length > 0 && discount.length > 0 && tax.length > 0 && minSending.length > 0)
                {
                    var checkPhone1 = validatePhone(phone1);
                    var checkEmail = validateEmail(email); 
                    var checkDiscount = validatePositiveDecimalNumber(discount);

                    var checkPostalCode = true; 
                    var checkRFC = true; 
                    var checkPhone2 = true; 
                    var checkTax = true;
                    //var checkDivisions = true;
                    var checkMinSending = true;

                    if(postalCode != null)
                    {
                        if(postalCode.length > 0)
                        {
                            checkPostalCode = validateNumber(postalCode);
                            if(checkPostalCode == false)
                            {
                                check = true; 

                                //swal("Advertencia", "El campo Codigo Postal no es valido", "warning");

                                alert("El campo Codigo Postal no es valido");
                                $("#txt_new_distributor_postal_code").focus();
                            }
                        }
                    } 

                    if(rfc != null)
                    {
                        if(rfc.length > 0)
                        {
                            checkRFC = validateRFC(rfc); 
                            if(checkRFC == false)
                            {
                                check = true;
                                alert("El campo RFC no es valido");
                                $("#txt_new_distributor_rfc").focus();
                            }
                        }
                    }

                    if(phone2 != null)
                    {
                        if(phone2.length > 0)
                        {
                            checkPhone2 = validatePhone(phone2);
                            if(checkPhone2 == false)
                            {
                                check = true;
                                alert("El campo Telefono2 no es valido");
                                $("#txt_new_distributor_phone2").focus();
                            }
                        }
                    }

                    if(tax != null)
                    {
                        if(tax.length > 0)
                        {
                            checkTax = validatePositiveDecimalNumber(tax);
                            if(checkTax == false)
                            {
                                check = true;
                                alert("El campo Impuesto no es valido"); 
                                $("#txt_new_distributor_tax").focus(); 
                            }
                        }
                    }

                    if(minSending != null)
                    {
                        if(minSending.length > 0)
                        {   
                            checkMinSending = validatePositiveDecimalNumber(minSending); 
                            if(checkMinSending == false)
                            {
                                check = true;
                                alert("El campo Minimo de Envio no es valido");
                                $("#txt_new_distributor_min_sending").focus();  
                            }
                        }
                    }

                    if(check == false)
                    {
                        if(checkPhone1 == true && checkEmail == true && checkDiscount == true && checkPostalCode == true && checkRFC == true && checkPhone2 == true && checkTax == true  && checkMinSending == true)
                        {
                            if(parseFloat(discount) > 100)
                            {
                                check = true;
                                alert("El campo Descuento sobrepasa el 100%");
                                $("#txt_new_client_discount").focus();
                            }
                            else if(parseFloat(tax) > 100)
                            {
                                check = true;
                                alert("El campo Impuesto sobrepasa la cantidad permitida");
                                $("#chk_new_distributor_points").focus(); 
                            }
                            else
                            {
                                check = false;
                            }
                        }
                        else if(checkPhone1 == false)
                        {
                            check = true; 
                            alert("El campo Telefono1 no es valido");
                            $("#txt_new_distributor_phone1").focus();
                        }
                        else if(checkEmail == false)
                        {
                            check = true;
                            alert("El campo Email no es valido");
                            $("#txt_new_distributor_email").focus();
                        }
                        else if(checkDiscount == false)
                        {
                            check = true;
                            alert("El campo Descuento no es valido");
                            $("#txt_new_distributor_discount").focus();
                        }
                        else if(checkTax == false)
                        {
                            check = true;
                            alert("El campo Impuesto no es valido");
                            $("#chk_new_distributor_points").focus();
                        }
                        else if(checkMinSending == false)
                        {
                            check = true;
                            alert("El campo Minimo de Envio no es valido");
                            $("#txt_new_distributor_min_sending").focus();  
                        }
                        else 
                        {
                            check = true;
                            alert("Error al ingresar al Nuevo Distribuidor"); 
                        }
                    }


                }
                else if(name.length <= 0)
                {
                    check = true;
                    //swal("Advertencia", "El campo Nombre es requerido", "warning");
                    alert("El campo Nombre es requerido");
                    $("#txt_new_distributor_name").focus();
                                    }
                else if(lastname.length <= 0)
                {
                    check = true;
                    alert("El campo Apellido es requerido");
                    $("#txt_new_distributor_lastname").focus();
                }
                else if(company.length <= 0)
                {
                    check = true;
                    alert("El campo Empresa es requerido");
                    $("#txt_new_distributor_company").focus();
                }
                else if(phone1.length <= 0)
                {
                    check = true;
                    alert("El campo Telefono1 es requerido");
                    $("#txt_new_distributor_phone1").focus();
                }
                else if(email.length <= 0)
                {
                    check = true;
                    alert("El campo Email es requerido");
                    $("#txt_new_distributor_email").focus();
                }
                else if(status.length <= 0)
                {
                    check = true;
                    alert("El campo Status es requerido");
                    $("#cmb_new_distributor_status").focus();
                }
                else if(discount.length <= 0)
                {
                    check = true;
                    alert("El campo Descuento es requerido");
                    $("#txt_new_distributor_discount").focus();
                }
                else if(tax.length <= 0)
                {
                    check = true;
                    alert("El campo Impuesto es requerido");
                    $("#txt_new_distributor_tax").focus();
                }
                else if(minSending.length <= 0)
                {
                    check = true;
                    alert("El campo Minimo de Envio es requerido");
                    $("#txt_new_distributor_min_sending").focus();
                }
            }
            else if(!(name != null))
            {
                check = true;
                alert("El campo Nombre es requerido");

                $("#txt_new_distributor_name").focus(); 
            }
            else if(!(lastname != null))
            {
                check = true;
                alert("El campo Apellido es requerido");
                $("#txt_new_distributor_lastname").focus();
            }
            else if(!(company != null))
            {
                check = true;
                alert("El campo Empresa es requerido");
                $("#txt_new_distributor_company").focus();
            }
            else if(!(phone1 != null))
            {
                check = true;
                alert("El campo Telefono1 es requerido");
                $("#txt_new_distributor_phone1").focus();
            }
            else if(!(email != null))
            {
                check = true;
                alert("El campo Email es requerido");
                $("#txt_new_distributor_email").focus();
            }
            else if(!(status != null))
            {
                check = true;
                alert("El campo Status es requerido");
                $("#cmb_new_distributor_status").focus();
            }
            else if(!(discount != null))
            {
                check = true;
                alert("El campo Descuento es requerido");
                $("#txt_new_distributor_discount").focus();
            }
            else if(!(tax != null))
            {
                check = true;
                alert("El campo Impuesto es requerido");
                $("#txt_new_distributor_tax").focus();
            }
            else if(!(minSending != null))
            {
                check = true;
                alert("El campo Minimo de Envio es requerido");
                $("#txt_new_distributor_min_sending").focus();
            }
            else if(!(points != null))
            {
                check = true;
                alert("El campo Generar Puntos es requerido");
                $("#chk_new_distributor_points").focus();
            }
        }
        catch(err)
        {
            check = true;
            console.log(err.message); 
            alert("Dentro del catch");
        }
        return check;
    } //End metodo validateNewDistributor


function validateEditDistributor()
    {
        var check = false;
        try
        {
            var name = $("#txt_edit_distributor_name").val();
            var lastname = $("#txt_edit_distributor_lastname").val();
            var company = $("#txt_edit_distributor_company").val();
            var position = $("#txt_edit_distributor_position").val();
            var address = $("#txt_edit_distributor_address").val();
            var colony = $("#txt_edit_distributor_colony").val();
            var city = $("#txt_edit_distributor_city").val();
            var town = $("#txt_edit_distributor_town").val();
            var state = $("#txt_edit_distributor_state").val();
            var country = $("#txt_edit_distributor_country").val();
            var postalCode = $("#txt_edit_distributor_postal_code").val();
            var rfc = $("#txt_edit_distributor_rfc").val();
            var phone1 = $("#txt_edit_distributor_phone1").val();
            var phone2 = $("#txt_edit_distributor_phone2").val();
            var email = $("#txt_edit_distributor_email").val(); 
            var status = $("#cmb_edit_distributor_status").val();
            var discount = $("#txt_edit_distributor_discount").val();
            var deliveryDay = $("#cmb_edit_distributor_delivery_days").val(); 
            var branch = $("#cmb_edit_distributor_branch").val(); 
            var region = $("#txt_edit_distributor_region").val();
            var zone = $("#txt_edit_distributor_zone").val();
            var tax = $("#txt_edit_distributor_tax").val();
            var idiom = $("#cmb_edit_distributor_idiom").val(); 
            var points = $('#chk_edit_distributor_points').is(":checked");

            //var divisions = getAllEditDistributorDivisions();

            if(name != null && lastname != null && company != null && phone1 != null && email != null && status != null && discount != null && tax != null && points != null)
            {
                if(name.length > 0 && lastname.length > 0 && company.length > 0 && phone1.length > 0 && email.length > 0 && status.length > 0 && discount.length > 0 && tax.length > 0)
                {
                    var checkPhone1 = validatePhone(phone1);
                    var checkEmail = validateEmail(email); 
                    var checkDiscount = validatePositiveDecimalNumber(discount);

                    var checkPostalCode = true; 
                    var checkRFC = true; 
                    var checkPhone2 = true; 
                    var checkTax = true;

                    if(postalCode != null)
                    {
                        if(postalCode.length > 0)
                        {
                            checkPostalCode = validateNumber(postalCode);
                            if(checkPostalCode == false)
                            {
                                check = true; 
                                alert("El campo Codigo Postal no es valido");
                                $("#txt_edit_distributor_postal_code").focus();
                            }
                        }
                    } 

                    if(rfc != null)
                    {
                        if(rfc.length > 0)
                        {
                            checkRFC = validateRFC(rfc); 
                            if(checkRFC == false)
                            {
                                check = true;
                                alert("El campo RFC no es valido");
                                $("#txt_edit_distributor_rfc").focus();
                            }
                        }
                    }

                    if(phone2 != null)
                    {
                        if(phone2.length > 0)
                        {
                            checkPhone2 = validatePhone(phone2);
                            if(checkPhone2 == false)
                            {
                                check = true;
                                alert("El campo Telefono2 no es valido");
                                $("#txt_edit_distributor_phone2").focus();
                            }
                        }
                    }

                    if(tax != null)
                    {
                        if(tax.length > 0)
                        {
                            checkTax = validatePositiveDecimalNumber(tax);
                            if(checkTax == false)
                            {
                                check = true;
                                alert("El campo Impuesto no es valido"); 
                                $("#txt_edit_distributor_tax").focus(); 
                            }
                        }
                    }

                    /*if(divisions != null)
                    {
                        if(divisions > 0)
                        {
                            checkDivisions = validateEditDistributorDivisions();
                        }
                        else if(divisions <= 0)
                        {
                            checkDivisions = true;
                        }
                    }*/

                    if(check == false)
                    {
                        if(checkPhone1 == true && checkEmail == true && checkDiscount == true && checkPostalCode == true && checkRFC == true && checkPhone2 == true && checkTax == true)
                        {
                            if(parseFloat(discount) > 100)
                            {
                                check = true;
                                alert("El campo Descuento sobrepasa el 100%");
                                $("#txt_edit_client_discount").focus();
                            }
                            else if(parseFloat(tax) > 100)
                            {
                                check = true;
                                alert("El campo Impuesto sobrepasa la cantidad permitida");
                                $("#chk_edit_distributor_points").focus(); 
                            }
                            else
                            {
                                check = false;
                            }
                        }
                        else if(checkPhone1 == false)
                        {
                            check = true; 
                            alert("El campo Telefono1 no es valido");
                            $("#txt_edit_distributor_phone1").focus();
                        }
                        else if(checkEmail == false)
                        {
                            check = true;
                            alert("El campo Email no es valido");
                            $("#txt_edit_distributor_email").focus();
                        }
                        else if(checkDiscount == false)
                        {
                            check = true;
                            alert("El campo Descuento no es valido");
                            $("#txt_edit_distributor_discount").focus();
                        }
                        else if(checkTax == false)
                        {
                            check = true;
                            alert("El campo Impuesto no es valido");
                            $("#chk_edit_distributor_points").focus();
                        }
                        else 
                        {
                            check = true;
                            alert("Error al ingresar al Nuevo Distribuidor"); 
                        }
                    }


                }
                else if(name.length <= 0)
                {
                    check = true;
                    alert("El campo Nombre es requerido");
                    $("#txt_edit_distributor_name").focus();
                }
                else if(lastname.length <= 0)
                {
                    check = true;
                    alert("El campo Apellido es requerido");
                    $("#txt_edit_distributor_lastname").focus();
                }
                else if(company.length <= 0)
                {
                    check = true;
                    alert("El campo Empresa es requerido");
                    $("#txt_edit_distributor_company").focus();
                }
                else if(phone1.length <= 0)
                {
                    check = true;
                    alert("El campo Telefono1 es requerido");
                    $("#txt_edit_distributor_phone1").focus();
                }
                else if(email.length <= 0)
                {
                    check = true;
                    alert("El campo Email es requerido");
                    $("#txt_edit_distributor_email").focus();
                }
                else if(status.length <= 0)
                {
                    check = true;
                    alert("El campo Status es requerido");
                    $("#cmb_edit_distributor_status").focus();
                }
                else if(discount.length <= 0)
                {
                    check = true;
                    alert("El campo Descuento es requerido");
                    $("#txt_edit_distributor_discount").focus();
                }
                else if(tax.length <= 0)
                {
                    check = true;
                    alert("El campo Impuesto es requerido");
                    $("#txt_edit_distributor_tax").focus();
                }
            }
            else if(!(name != null))
            {
                check = true;
                alert("El campo Nombre es requerido");
                $("#txt_edit_distributor_name").focus(); 
            }
            else if(!(lastname != null))
            {
                check = true;
                alert("El campo Apellido es requerido");
                $("#txt_edit_distributor_lastname").focus();
            }
            else if(!(company != null))
            {
                check = true;
                alert("El campo Empresa es requerido");
                $("#txt_edit_distributor_company").focus();
            }
            else if(!(phone1 != null))
            {
                check = true;
                alert("El campo Telefono1 es requerido");
                $("#txt_edit_distributor_phone1").focus();
            }
            else if(!(email != null))
            {
                check = true;
                alert("El campo Email es requerido");
                $("#txt_edit_distributor_email").focus();
            }
            else if(!(status != null))
            {
                check = true;
                alert("El campo Status es requerido");
                $("#cmb_edit_distributor_status").focus();
            }
            else if(!(discount != null))
            {
                check = true;
                alert("El campo Descuento es requerido");
                $("#txt_edit_distributor_discount").focus();
            }
            else if(!(tax != null))
            {
                check = true;
                alert("El campo Impuesto es requerido");
                $("#txt_edit_distributor_tax").focus();
            }
            else if(!(points != null))
            {
                check = true;
                alert("El campo Generar Puntos es requerido");
                $("#chk_edit_distributor_points").focus();
            }
        }
        catch(err)
        {
            check = true;
            console.log(err.message); 
        }
        return check;
    }



function Function_Editar_Distri()
{
    //////////////////////////////////////////////////////////////////////////////
        ////    Acció al dar click a editar Guardar Cambios de la modal Editar    ////
        //////////////////////////////////////////////////////////////////////////////

            $('#edit_distributor_modal').modal('show');

                    if(linea.cells[27].innerHTML != null)
                        {
                            if(typeof(linea.cells[27].innerHTML) != "undefined")
                            {
                                if(linea.cells[27].innerHTML.length > 0)
                                {
                                    branch = linea.cells[27].innerHTML;
                                }
                                else if(linea.cells[27].innerHTML.length <= 0)
                                {
                                    linea.cells[27].innerHTML = "";
                                }
                            }
                            else 
                            {
                                linea.cells[27].innerHTML = "";
                            }
                        }
                        else 
                        {
                            linea.cells[27].innerHTML = ""; 
                        }

                    if(linea.cells[23].innerHTML != null)
                        {
                            if(typeof(linea.cells[23].innerHTML) != undefined)
                            {
                                if(linea.cells[23].innerHTML.length > 0)
                                {
                                    if(linea.cells[23].innerHTML == "1")
                                    {
                                        $('#chk_edit_distributor_points').prop('checked', true);
                                    }
                                    else 
                                    {
                                        $('#chk_edit_distributor_points').prop('checked', false);
                                    }
                                }
                                else if(linea.cells[23].innerHTML.length <= 0)
                                {
                                    $('#chk_edit_distributor_points').prop('checked', false);
                                }
                            }
                            else 
                            {
                                $('#chk_edit_distributor_points').prop('checked', false);
                            }
                        }
                        else
                        {
                            $('#chk_edit_distributor_points').prop('checked', false);
                        }

        //////////////////////////////////////////////////////////////////////////////
        ////    Mustra los valores del distribuidor seleccionado en los campos    ////
        //////////////////////////////////////////////////////////////////////////////
        var IdDistribuidor = linea.cells[0].innerHTML;
        var Nombre = linea.cells[1].innerHTML;
        var Apellidos = linea.cells[2].innerHTML;
        var Empresa = linea.cells[3].innerHTML;
        var Cargo = linea.cells[4].innerHTML;
        var Direccion = linea.cells[5].innerHTML;
        var Colonia = linea.cells[6].innerHTML;
        var Ciudad = linea.cells[7].innerHTML;
        var Municipio = linea.cells[8].innerHTML;
        var Estado = linea.cells[9].innerHTML;
        var Pais = linea.cells[10].innerHTML;
        var CP = linea.cells[11].innerHTML;
        var RFC = linea.cells[12].innerHTML;
        var Tel1 = linea.cells[13].innerHTML;
        var Tel2 = linea.cells[14].innerHTML;
        var Email = linea.cells[15].innerHTML;
        var Descuento = linea.cells[16].innerHTML;
        var Status = linea.cells[17].innerHTML;
        var Dia = linea.cells[18].innerHTML;
        var Region = linea.cells[19].innerHTML;
        var Zona = linea.cells[20].innerHTML;
        var Impuesto = linea.cells[21].innerHTML;
        var Idioma = linea.cells[22].innerHTML;
        var Puntos = linea.cells[23].innerHTML;
        var Envio = linea.cells[24].innerHTML;
        var Fecha = linea.cells[25].innerHTML;
        var Sucursal = linea.cells[26].innerHTML;
        var IDSucursal = linea.cells[27].innerHTML;

        $('#txt_edit_hidden_distributor_id').val(linea.cells[0].innerHTML);
        $('#txt_edit_distributor_name').val(linea.cells[1].innerHTML);
        $('#txt_edit_distributor_lastname').val(linea.cells[2].innerHTML);
        $('#txt_edit_distributor_company').val(linea.cells[3].innerHTML);
        $('#txt_edit_distributor_position').val(linea.cells[4].innerHTML);
        $('#txt_edit_distributor_address').val(linea.cells[5].innerHTML);
        $('#txt_edit_distributor_colony').val(linea.cells[6].innerHTML);
        $('#txt_edit_distributor_city').val(linea.cells[7].innerHTML);
        $('#txt_edit_distributor_town').val(linea.cells[8].innerHTML);
        $('#txt_edit_distributor_state').val(linea.cells[9].innerHTML);
        $('#txt_edit_distributor_country').val(linea.cells[10].innerHTML);
        $('#txt_edit_distributor_postal_code').val(linea.cells[11].innerHTML);
        $('#txt_edit_distributor_rfc').val(linea.cells[12].innerHTML);
        $('#txt_edit_distributor_phone1').val(linea.cells[13].innerHTML);
        $('#txt_edit_distributor_phone2').val(linea.cells[14].innerHTML);
        $('#txt_edit_distributor_email').val(linea.cells[15].innerHTML);
        $('#cmb_edit_distributor_status').val(linea.cells[17].innerHTML);
        $('#txt_edit_distributor_discount').val(linea.cells[16].innerHTML);
        $('#cmb_edit_distributor_delivery_days').val(linea.cells[18].innerHTML);
        $('#cmb_edit').val(linea.cells[27].innerHTML);
        $('#txt_edit_distributor_region').val(linea.cells[19].innerHTML);
        $('#txt_edit_distributor_zone').val(linea.cells[20].innerHTML);
        $('#txt_edit_distributor_tax').val(linea.cells[21].innerHTML);
        $('#txt_edit_distributor_min_sending').val(linea.cells[24].innerHTML);
        //$('#txt_edit_distributor_tax').val(Impuesto);
        $('#cmb_edit_distributor_idiom').val(linea.cells[22].innerHTML);
        $('#txt_new_distributor_date').val(linea.cells[25].innerHTML);

        //$('#edit_distributor_modal').modal();
}

function funtion_Agregar_Distri()
{
    $("#myModal").modal("show");
}

function DataTable_Distribuidor()
{
    var dataTable = $('#dist-table-data').DataTable({
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
      });    
}