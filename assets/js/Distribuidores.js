window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';
window.Global_Tabla_Distribuidor = null;
window.Global_Tabla_Distribuidor_Direccion = null;

var eliminarDivision = function (event)
{
  let row   = this.parentNode.parentNode;
  let tbody = document.querySelector("#fetchDivisiones").tBodies[0];
  tbody.removeChild(row);
}

var eliminarDivisionEditar = function (event)
{
  let row   = this.parentNode.parentNode;
  let tbody = document.querySelector("#fetchDivisionesEditar").tBodies[0];
  tbody.removeChild(row);
}


$(document).ready(function(){ 

	fetch_data_Distribuidor();

  // Cargar TOAST //
  Toast();

  /// Agregar Division AL Distribuidor ///
  $("#btnAgregarDivision").click(function(event) {
    
    let idDivision = $("#selectDivision").val();
    let Division   = $("#selectDivision option:selected").text();
    let Contador   = 0;

    if (idDivision != ""){

      let tbody = document.getElementById("fetchDivisiones").tBodies[0];

      if (tbody.rows.length > 0)
      {
        for (var i = 0; i < tbody.rows.length ; i++)
        {
          if (tbody.rows[i].cells[0].innerHTML == idDivision)
          {
            Contador = 1;
          }
        }

        if (Contador == 0){

          for (var i = 0; i <= 0; i++)
          {
            let row  = tbody.insertRow(i);
            let cel1 = row.insertCell(0);
            let cel2 = row.insertCell(1);
            let cel3 = row.insertCell(2);

            cel1.innerHTML = idDivision;
            cel2.innerHTML = Division;

            let boton = document.createElement("button");
            boton.classList.add('btn', 'btn-danger', 'btn-xs');
            boton.addEventListener("click",eliminarDivision);
            cel3.appendChild(boton);

            let icono = document.createElement("span");
            icono.classList.add('glyphicon', 'glyphicon-trash');
            boton.appendChild(icono);
          }

          $("#selectDivision").val("");
        }
        else{
          toastr.warning('La división ys esta agregada', 'Advertencia');
        }
      }
      else{

        for (var i = 0; i <= 0; i++)
        {
          let row  = tbody.insertRow(i);
          let cel1 = row.insertCell(0);
          let cel2 = row.insertCell(1);
          let cel3 = row.insertCell(2);

          cel1.innerHTML = idDivision;
          cel2.innerHTML = Division;

          let boton = document.createElement("button");
          boton.classList.add('btn', 'btn-danger', 'btn-xs');
          boton.addEventListener("click",eliminarDivision);
          cel3.appendChild(boton);

          let icono = document.createElement("span");
          icono.classList.add('glyphicon', 'glyphicon-trash');
          boton.appendChild(icono);
        }

        $("#selectDivision").val("");
      } 
    }
    else{
      toastr.warning('Seleccione una división', 'Advertencia');
    }
  });

    /// Agregar Division AL Distribuidor Editar ///
  $("#btnAgregarDivisionEditar").click(function(event) {
    
    let idDivision = $("#selectDivision_Editar").val();
    let Division   = $("#selectDivision_Editar option:selected").text();
    let Contador   = 0;

    if (idDivision != ""){

      let tbody = document.getElementById("fetchDivisionesEditar").tBodies[0];

      if (tbody.rows.length > 0)
      {
        for (var i = 0; i < tbody.rows.length ; i++)
        {
          if (tbody.rows[i].cells[0].innerHTML == idDivision)
          {
            Contador = 1;
          }
        }

        if (Contador == 0){

          for (var i = 0; i <= 0; i++)
          {
            let row  = tbody.insertRow(i);
            let cel1 = row.insertCell(0);
            let cel2 = row.insertCell(1);
            let cel3 = row.insertCell(2);

            cel1.innerHTML = idDivision;
            cel2.innerHTML = Division;

            let boton = document.createElement("button");
            boton.classList.add('btn', 'btn-danger', 'btn-xs');
            boton.addEventListener("click",eliminarDivisionEditar);
            cel3.appendChild(boton);

            let icono = document.createElement("span");
            icono.classList.add('glyphicon', 'glyphicon-trash');
            boton.appendChild(icono);
          }

          $("#selectDivision_Editar").val("");
        }
        else{
          toastr.warning('La división ys esta agregada', 'Advertencia');
        }
      }
      else{

        for (var i = 0; i <= 0; i++)
        {
          let row  = tbody.insertRow(i);
          let cel1 = row.insertCell(0);
          let cel2 = row.insertCell(1);
          let cel3 = row.insertCell(2);

          cel1.innerHTML = idDivision;
          cel2.innerHTML = Division;

          let boton = document.createElement("button");
          boton.classList.add('btn', 'btn-danger', 'btn-xs');
          boton.addEventListener("click",eliminarDivisionEditar);
          cel3.appendChild(boton);

          let icono = document.createElement("span");
          icono.classList.add('glyphicon', 'glyphicon-trash');
          boton.appendChild(icono);
        }

        $("#selectDivision_Editar").val("");
      } 
    }
    else{
      toastr.warning('Seleccione una división', 'Advertencia');
    }
  });


  $("#txtCuota_Inicial").change(function(event) {
    let Cuota = 0;
    let CI    = parseInt($("#txtCuota_Inicial_Editar").val());
    let CF    = parseInt($("#txtCuota_Final_Editar").val());
    let MLC   = parseInt($("#txtMeses_Cuota_Editar").val());
    let MA    = parseInt($("#txtMeses_Actuales_Editar").val());

    if (MLC != null && MLC != "" && MLC > 0)
    {
      Cuota = (((CF - CI) / MLC) * MA) + CI;
    }
    else
    {
      Cuota = (((CF - CI) / 1) * MA) + CI;
    }

    $("#txtCuota").val(parseFloat(Cuota).toFixed(2));
  });

  $("#txtCuota_Final").change(function(event) {
    let Cuota = 0;
    let CI    = parseInt($("#txtCuota_Inicial_Editar").val());
    let CF    = parseInt($("#txtCuota_Final_Editar").val());
    let MLC   = parseInt($("#txtMeses_Cuota_Editar").val());
    let MA    = parseInt($("#txtMeses_Actuales_Editar").val());

    if (MLC != null && MLC != "" && MLC > 0)
    {
      Cuota = (((CF - CI) / MLC) * MA) + CI;
    }
    else
    {
      Cuota = (((CF - CI) / 1) * MA) + CI;
    }

    $("#txtCuota").val(parseFloat(Cuota).toFixed(2));
  });

  $("#txtMeses_Cuota").change(function(event) {
    let Cuota = 0;
    let CI    = parseInt($("#txtCuota_Inicial_Editar").val());
    let CF    = parseInt($("#txtCuota_Final_Editar").val());
    let MLC   = parseInt($("#txtMeses_Cuota_Editar").val());
    let MA    = parseInt($("#txtMeses_Actuales_Editar").val());

    if (MLC != null && MLC != "" && MLC > 0)
    {
      Cuota = (((CF - CI) / MLC) * MA) + CI;
    }
    else
    {
      Cuota = (((CF - CI) / 1) * MA) + CI;
    }

    $("#txtCuota").val(parseFloat(Cuota).toFixed(2));
  });

  $("#txtMeses_Actuales").change(function(event) {
    let Cuota = 0;
    let CI    = parseInt($("#txtCuota_Inicial_Editar").val());
    let CF    = parseInt($("#txtCuota_Final_Editar").val());
    let MLC   = parseInt($("#txtMeses_Cuota_Editar").val());
    let MA    = parseInt($("#txtMeses_Actuales_Editar").val());

    if (MLC != null && MLC != "" && MLC > 0)
    {
      Cuota = (((CF - CI) / MLC) * MA) + CI;
    }
    else
    {
      Cuota = (((CF - CI) / 1) * MA) + CI;
    }

    $("#txtCuota").val(parseFloat(Cuota).toFixed(2));
  });


  ////////////// Editar ////////////////////

  $("#txtCuota_Inicial_Editar").change(function(event) {
    let Cuota = 0;
    let CI    = parseInt($("#txtCuota_Inicial_Editar").val());
    let CF    = parseInt($("#txtCuota_Final_Editar").val());
    let MLC   = parseInt($("#txtMeses_Cuota_Editar").val());
    let MA    = parseInt($("#txtMeses_Actuales_Editar").val());

    if (MLC != null && MLC != "" && MLC > 0)
    {
      Cuota = (((CF - CI) / MLC) * MA) + CI;
    }
    else
    {
      Cuota = (((CF - CI) / 1) * MA) + CI;
    }

    $("#txtCuota_Editar").val(parseFloat(Cuota).toFixed(2));
  });

  $("#txtCuota_Final_Editar").change(function(event) {
    let Cuota = 0;
    let CI    = parseInt($("#txtCuota_Inicial_Editar").val());
    let CF    = parseInt($("#txtCuota_Final_Editar").val());
    let MLC   = parseInt($("#txtMeses_Cuota_Editar").val());
    let MA    = parseInt($("#txtMeses_Actuales_Editar").val());

    if (MLC != null && MLC != "" && MLC > 0)
    {
      Cuota = (((CF - CI) / MLC) * MA) + CI;
    }
    else
    {
      Cuota = (((CF - CI) / 1) * MA) + CI;
    }

    $("#txtCuota_Editar").val(parseFloat(Cuota).toFixed(2));
  });

  $("#txtMeses_Cuota_Editar").change(function(event) {
    let Cuota = 0;
    let CI    = parseInt($("#txtCuota_Inicial_Editar").val());
    let CF    = parseInt($("#txtCuota_Final_Editar").val());
    let MLC   = parseInt($("#txtMeses_Cuota_Editar").val());
    let MA    = parseInt($("#txtMeses_Actuales_Editar").val());

    if (MLC != null && MLC != "" && MLC > 0)
    {
      Cuota = (((CF - CI) / MLC) * MA) + CI;
    }
    else
    {
      Cuota = (((CF - CI) / 1) * MA) + CI;
    }

    $("#txtCuota_Editar").val(parseFloat(Cuota).toFixed(2));
  });

  $("#txtMeses_Actuales_Editar").change(function(event) {
    let Cuota = 0;
    let CI    = parseInt($("#txtCuota_Inicial_Editar").val());
    let CF    = parseInt($("#txtCuota_Final_Editar").val());
    let MLC   = parseInt($("#txtMeses_Cuota_Editar").val());
    let MA    = parseInt($("#txtMeses_Actuales_Editar").val());

    if (MLC != null && MLC != "" && MLC > 0)
    {
      Cuota = (((CF - CI) / MLC) * MA) + CI;
    }
    else
    {
      Cuota = (((CF - CI) / 1) * MA) + CI;
    }

    $("#txtCuota_Editar").val(parseFloat(Cuota).toFixed(2));
  });


  $("#check_Coordinador_Editar").click(function(event) {
    /* Act on the event */

    if ($('#check_Coordinador_Editar').prop('checked') == true) 
    {
        console.log("Checked");
        $("#div_Asignacion_region").css('display', '');

    }
    else
    {
        console.log("Checked");
        $("#div_Asignacion_region").css('display', 'none');
    }
  });

    $("#btn_Guardar_Distribuidor").click(function(event) {
        
        let Nombre      = $("#txtNombre").val();
        let Apellidos   = $("#txt_Apellidos").val();
        let Empresa     = $("#txtEmpresa").val();
        let Cargo       = $("#txtCargo").val();
        let Calle       = $("#txtCalle").val();
        let Colonia     = $("#txtColonia").val();
        let Ciudad      = $("#txtCiudad").val();
        let Municipio   = $("#txtMunicipio").val();
        let Estado      = $("#txtEstado").val();
        let Pais        = $("#txtPais").val();
        let CP          = $("#txtCP").val();
        let RFC         = $("#txtRFC").val();
        let Tel1        = $("#txtTel1").val();
        let Tel2        = $("#txtTel2").val();
        let Email       = $("#txtEmail").val();
        let Descuento   = $("#txtDescuento").val();
        let idSucursal  = $("#select_Sucursal").val();
        let Contrasena  = $("#txtContrasena").val();
        let Entrega     = $("#select_Entrega").val();
        let Region      = $("#txtRegion").val();
        let Zona        = $("#txtZona").val();
        let Idioma      = $("#select_Idioma").val();
        let Impuesto    = $("#txtImpuesto").val();
        let MinimoEnvio = $("#txtMinimoEnvio").val();
        let Cuota       = $("#txtCuota").val();;
        let Cuota_Inicial = $("#txtCuota_Inicial").val();
        let Cuota_Final = $("#txtCuota_Final").val();
        let Meses_Cuota = $("#txtMeses_Cuota").val();
        let Meses_Actual  = $("#txtMeses_Actuales").val();
        let Clientes_x_dia  = $("#txtClientes_x_dia").val();
        let idBloque  = $("#select_Bloque").val();
        let Puntos      = 0;
        let Facturacion = 1;
        let Minimo      = 1;
        let ObjDate = new Date();
        let tbody = document.getElementById("fetchDivisiones").tBodies[0];
        let AsignacionDivision = new Array();
        let Fecha = ObjDate.getFullYear() + "-" +  parseInt(ObjDate.getMonth() + 1) + "-" +  ObjDate.getDate() + " " +  ObjDate.getHours() + ":" + ObjDate.getMinutes() + ":" + ObjDate.getSeconds();

        //Cuota = ((Cuota_Final - Cuota_Inicial) / Meses_Cuota) * Meses_Actual;

        if($('#check_Generar_Puntos').prop('checked'))
        {
            Puntos = 1;
        }
        else
        {
            Puntos = 0;
        }

        if($('#check_Facturacion').prop('checked'))
        {
            Facturacion = 1;
        }
        else
        {
            Facturacion = 0;
        }


        if($('#check_Minimo_Compra').prop('checked'))
        {
            Minimo = 1;
        }
        else
        {
            Minimo = 0;
        }

        ///////////////////////////////////////////////////////
        //// Agregar Asignación División Update 04/07/2019 ////
        ///////////////////////////////////////////////////////

        if (tbody.rows.length > 0)
        {
          for (var i = 0; i < tbody.rows.length ; i++)
          {
            AsignacionDivision.push(tbody.rows[i].cells[0].innerHTML);
          }
        }

        ///////////////////////////////////////////////////////
        //// Agregar Asignación División Update 04/07/2019 ////
        ///////////////////////////////////////////////////////


        if (Nombre != null && Nombre != "" && Apellidos != null && Apellidos != "" && RFC != null && RFC != "" && Contrasena != null && Contrasena != "" && idSucursal != null && idSucursal != "" && Idioma != null && Idioma != "" && Entrega != null && Entrega != "" && idBloque != "" && idBloque != null) 
        {

            var formData = new FormData();
            formData.append("Nombre", Nombre);
            formData.append("Apellidos", Apellidos);
            formData.append("Empresa", Empresa);
            formData.append("Cargo", Cargo);
            formData.append("Calle_numero", Calle);
            formData.append("Colonia", Colonia);
            formData.append("Ciudad", Ciudad);
            formData.append("Municipio", Municipio);
            formData.append("Estado", Estado);
            formData.append("Pais", Pais);
            formData.append("CP", CP);
            formData.append("RFC", RFC);
            formData.append("Tel1", Tel1);
            formData.append("Tel2", Tel2);
            formData.append("Email", Email);
            formData.append("Descuento_%", Descuento);
            formData.append("Status", 'Activo');
            formData.append("idSucursal", idSucursal);
            formData.append("Contrasena", Contrasena);
            formData.append("Dia_entrega", Entrega);
            formData.append("Region", Region);
            formData.append("Zona", Zona);
            formData.append("Idioma", Idioma);
            formData.append("Fecha_ingreso", Fecha);
            formData.append("Impuesto", Impuesto);
            formData.append("Generar_puntos", Puntos);
            formData.append("MinimoEnvio",MinimoEnvio);
            formData.append("Cuota",Cuota);

            formData.append("Facturacion",Facturacion);
            formData.append("Minimo_Compra",Minimo);
            formData.append("Cuota_Inicial",Cuota_Inicial);
            formData.append("Cuota_Final",Cuota_Final);
            formData.append("Meses_Actual",Meses_Actual);
            formData.append("Meses_Cuota",Meses_Cuota);
            formData.append("Clientes_x_dia",Clientes_x_dia);
            formData.append("idBloque",idBloque);
            formData.append("idDivision",AsignacionDivision);

             $.ajax({
               url: dir + 'index.php/Controller_Distribuidores/Guardar_Distribuidor',
               type: 'POST',
               processData: false,  // tell jQuery not to process the data
               contentType: false,
               timeout: 35000,
               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
               data: formData,
               beforeSend : function ()
                {
                    $('#Cargando_Agregar').css('display', '');
                },
                success: function(data)
                {
                    console.log(data);

                    let Resultado = data.trim();

                    if(Resultado == "Correcto")
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
                        toastr.success('Distribuidor agregado con exito', 'Correcto');

                        $('#Table_Distribuidor').DataTable().destroy();

                        Limpiar();

                        fetch_data_Distribuidor();
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
                        toastr.error('Ocurrio un error al crear al distribuidor', 'Error');
                    }
                }
           })
           .done(function() {
               
               $('#Cargando_Agregar').css('display', 'none');
           })
           .fail(function() {
               console.log("error");
           })
           .always(function() {
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
                        toastr.error('Algunos campos obligatorios estan vacios', 'Error');
        }

    });

    $("#btn_Editar_Distribuidor").click(function(event) {
        
        let Nombre      = $("#txtNombre_Editar").val();
        let Apellidos   = $("#txt_Apellidos_Editar").val();
        let Empresa     = $("#txtEmpresa_Editar").val();
        let Cargo       = $("#txtCargo_Editar").val();
        let Calle       = $("#txtCalle_Editar").val();
        let Colonia     = $("#txtColonia_Editar").val();
        let Ciudad      = $("#txtCiudad_Editar").val();
        let Municipio   = $("#txtMunicipio_Editar").val();
        let Estado      = $("#txtEstado_Editar").val();
        let Pais        = $("#txtPais_Editar").val();
        let CP          = $("#txtCP_Editar").val();
        let RFC         = $("#txtRFC_Editar").val();
        let Tel1        = $("#txtTel1_Editar").val();
        let Tel2        = $("#txtTel2_Editar").val();
        let Email       = $("#txtEmail_Editar").val();
        let Descuento   = $("#txtDescuento_Editar").val();
        let idSucursal  = $("#select_Sucursal_Editar").val();
        let Contrasena  = $("#txtContrasena_Editar").val();
        let Entrega     = $("#select_Entrega_Editar").val();
        let Region      = $("#txtRegion_Editar").val();
        let Zona        = $("#txtZona_Editar").val();
        let Idioma      = $("#select_Idioma_Editar").val();
        let Impuesto    = $("#txtImpuesto_Editar").val();
        let MinimoEnvio = $("#txtMinimoEnvio_Editar").val();
        let Puntos      = $("#txtPuntos_Editar").val();
        let Cuota       = $("#txtCuota_Editar").val();
        let Generar     = 0;
        let Status      = "";
        let Cuota_Inicial = $("#txtCuota_Inicial_Editar").val();
        let Cuota_Final   = $("#txtCuota_Final_Editar").val();
        let Meses_Cuota   = $("#txtMeses_Cuota_Editar").val();
        let Meses_Actual  = $("#txtMeses_Actuales_Editar").val();
        let Fecha         = $("#txtFechaIngreso_Editar").val();
        let Facturacion   = 1;
        let Minimo        = 1;
        let tbody = document.getElementById("fetchDivisionesEditar").tBodies[0];
        let AsignacionDivision = new Array();
        let Clientes_x_dia      = $("#txtClientes_x_dia_Editar").val();
        let idBloque = $("#select_Bloque_Editar").val();

        //Cuota = ((Cuota_Final - Cuota_Inicial) / Meses_Cuota) * Meses_Actual;

        //let ObjDate = new Date();
        //let Fecha = ObjDate.getFullYear() + "-" +  parseInt(ObjDate.getMonth() + 1) + "-" +  ObjDate.getDate() + " " +  ObjDate.getHours() + ":" + ObjDate.getMinutes() + ":" + ObjDate.getSeconds();

        if($('#check_Generar_Puntos_Editar').prop('checked'))
        {
            Generar = 1;
        }
        else
        {
            Generar = 0;
        }

        if($('#check_Status').prop('checked'))
        {
            Status = "Inactivo";
        }
        else
        {
            Status = "Activo";
        }

        if($('#check_Facturacion_Editar').prop('checked'))
        {
            Facturacion = 1;
        }
        else
        {
            Facturacion = 0;
        }


        if($('#check_Minimo_Compra_Editar').prop('checked'))
        {
            Minimo = 1;
        }
        else
        {
            Minimo = 0;
        }

        ///////////////////////////////////////////////////////
        //// Agregar Asignación División Update 04/07/2019 ////
        ///////////////////////////////////////////////////////

        if (tbody.rows.length > 0)
        {
          for (var i = 0; i < tbody.rows.length ; i++)
          {
            AsignacionDivision.push(tbody.rows[i].cells[0].innerHTML);
          }
        }

        ///////////////////////////////////////////////////////
        //// Agregar Asignación División Update 04/07/2019 ////
        ///////////////////////////////////////////////////////

        if (Nombre != null && Nombre != "" && Apellidos != null && Apellidos != "" && RFC != null && RFC != "" && Contrasena != null && Contrasena != "" && idSucursal != null && idSucursal != "" && Idioma != null && Idioma != "" && Entrega != null && Entrega != "") 
        {
            var formData = new FormData();
            formData.append("ID", window.Global_Tabla_Distribuidor.childNodes[0].innerHTML);
            formData.append("Nombre", Nombre);
            formData.append("Apellidos", Apellidos);
            formData.append("Empresa", Empresa);
            formData.append("Cargo", Cargo);
            formData.append("Calle_numero", Calle);
            formData.append("Colonia", Colonia);
            formData.append("Ciudad", Ciudad);
            formData.append("Municipio", Municipio);
            formData.append("Estado", Estado);
            formData.append("Pais", Pais);
            formData.append("CP", CP);
            formData.append("RFC", RFC);
            formData.append("Tel1", Tel1);
            formData.append("Tel2", Tel2);
            formData.append("Email", Email);
            formData.append("Descuento_%", Descuento);
            formData.append("Status", Status);
            formData.append("idSucursal", idSucursal);
            formData.append("Contrasena", Contrasena);
            formData.append("Dia_entrega", Entrega);
            formData.append("Region", Region);
            formData.append("Zona", Zona);
            formData.append("Idioma", Idioma);
            formData.append("Fecha_ingreso", Fecha);
            formData.append("Impuesto", Impuesto);
            formData.append("Generar_puntos", Generar);
            formData.append("Puntos", Puntos);
            formData.append("MinimoEnvio",MinimoEnvio);
            formData.append("Cuota",Cuota);

            formData.append("Facturacion",Facturacion);
            formData.append("Minimo_Compra",Minimo);
            formData.append("Cuota_Inicial",Cuota_Inicial);
            formData.append("Cuota_Final",Cuota_Final);
            formData.append("Meses_Actual",Meses_Actual);
            formData.append("Meses_Cuota",Meses_Cuota);
            formData.append('Clientes_x_dia',Clientes_x_dia);
            formData.append('idBloque',idBloque);
            formData.append("idDivision",AsignacionDivision);

             $.ajax({
               url: dir + 'index.php/Controller_Distribuidores/Editar_Distribuidor',
               type: 'POST',
               processData: false,  // tell jQuery not to process the data
               contentType: false,
               timeout: 35000,
               //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
               data: formData,
               beforeSend : function ()
                {
                    $('#Cargando_Editar').css('display', '');
                },
                success: function(data)
                {
                    console.log(data);

                    let Resultado = data.trim();

                    if(Resultado == "Correcto")
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
                        toastr.success('Distribuidor agregado con exito', 'Correcto');

                        $('#Table_Distribuidor').DataTable().destroy();

                        Limpiar();

                        fetch_data_Distribuidor();
                    }
                    else if (data == "neutro")
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
                        toastr.warning('No hubo ningún cambio al cliente', 'Advertencia');
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
                        toastr.error('Ocurrio un error al editar al distribuidor', 'Error');
                    }
                }
           })
           .done(function() {
               
               $('#Cargando_Editar').css('display', 'none');
           })
           .fail(function() {
               console.log("error");
           })
           .always(function() {
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
                        toastr.error('Algunos campos obligatorios estan vacios', 'Error');
        }


    });

    $("#Option_Agregar_Distribuidor").click(function(event) {
        Agregar_Distribuidor();
    });

    $("#Agregar_Distribuidor").click(function(event) {
        Agregar_Distribuidor();
    });

    $("#Option_Editar_Distribuidor").click(function(event) {
        Editar_Distribuidor();
    });

    $("#Editar_Distribuidor").click(function(event) {
        Editar_Distribuidor();
    });


    $("#Option_Eliminar_Distribuidor").click(function(event) {
        Eliminar_Distribuidor();
    });

    $("#Eliminar_Distribuidor").click(function(event) {
        Eliminar_Distribuidor();
    });

    var Table_Distribuidor_Envio = document.getElementById("Table_Direcciones_Envio");
    Table_Distribuidor_Envio.onclick = function(e)
    {
        window.Global_Tabla_Distribuidor_Direccion = e.target.parentNode;

    }


    var Table_Distribuidor = document.getElementById("Table_Distribuidor");
    Table_Distribuidor.onclick = function(e)
    {
        window.Global_Tabla_Distribuidor = e.target.parentNode;


        var formData = new FormData();
        formData.append("ID", window.Global_Tabla_Distribuidor.childNodes[0].innerHTML);

        $.ajax({
            url: dir + 'index.php/Controller_Distribuidores/Get_Direcion_Envio',
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
                let Direccion_Envio   = document.getElementById("Table_Direcciones_Envio"); 
                let tbody_Detalle     = Direccion_Envio.tBodies[0];

                $('#Table_Direcciones_Envio').DataTable().destroy();
                Direccion_Envio.tBodies[0].innerHTML = "";

                    for (var i = 0; i < parsed['Direccion'].length; i++) 
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
                       let cel11 = row.insertCell(10);
                       let cel12 = row.insertCell(11);
                       let cel13 = row.insertCell(12);
                       let cel14 = row.insertCell(13);
                       let cel15 = row.insertCell(14);

                       cel1.innerHTML = parsed['Direccion'][i]['ID'];
                       cel2.innerHTML = parsed['Direccion'][i]['Calle'];
                       cel3.innerHTML = parsed['Direccion'][i]['Numext'];
                       cel4.innerHTML = parsed['Direccion'][i]['Numint'];
                       cel5.innerHTML = parsed['Direccion'][i]['Pais'];
                       cel6.innerHTML = parsed['Direccion'][i]['Estado'];
                       cel7.innerHTML = parsed['Direccion'][i]['Municipio'];
                       cel8.innerHTML = parsed['Direccion'][i]['Ciudad'];
                       cel9.innerHTML = parsed['Direccion'][i]['Colonia'];
                       cel10.innerHTML = parsed['Direccion'][i]['CP'];
                       cel11.innerHTML = parsed['Direccion'][i]['Contacto'];
                       cel12.innerHTML = parsed['Direccion'][i]['Empresa'];
                       cel13.innerHTML = parsed['Direccion'][i]['Tel'];
                       cel14.innerHTML = parsed['Direccion'][i]['Cel'];

                       if (parsed['Direccion'][i]['Status'] == 'Activo')
                       {
                          cel15.innerHTML = '<label class="label label-success">' + parsed['Direccion'][i]['Status'] + '</label>';
                       }
                       else
                       {
                          cel15.innerHTML = '<label class="label label-danger">' + parsed['Direccion'][i]['Status'] + '</label>';
                       }
                    
                    }

                    fetch_Direccion();
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


    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    // Dirección de Envio /////////////////////////////////////////////

    $("#Agregar_Direccion_Envio").click(function(event) {

      if (window.Global_Tabla_Distribuidor != null) {
        document.getElementById("fetchDivisiones").tBodies[0].innerHTML = "";
        $("#Modal_Agregar_Direccion").modal("show");
      }
      else{
        toastr.warning('Seleccione a un distribuidor', 'Advertencia');
      }
    });


    $("#btn_Guardar_Direccion").click(function(event) {

      let Contacto = $("#txtContacto_Envio").val();
      let Empresa  = $("#txtEmpresa_Envio").val();
      let Calle    = $("#txtCalle_Envio").val();
      let Numext   = $("#txtNumext_Envio").val();
      let Numint   = $("#txtNumint_Envio").val();
      let Colonia  = $("#txtColonia_Envio").val();
      let Ciudad   = $("#txtCiudad_Envio").val();
      let Municipio = $("#txtMunicipio_Envio").val();
      let Estado   = $("#txtEstado_Envio").val();
      let Pais     = $("#txtPais_Envio").val();
      let CP       = $("#txtCP_Envio").val();
      let Tel      = $("#txtTel_Envio").val();
      let Cel      = $("#txtCel_Envio").val();
      let Ocurre   = 0;

      if($('#checkOcurre').prop('checked')){
        Ocurre = 1;
      }
      else{
        Ocurre = 0;
      }

      if (Contacto != "" && Empresa != "" && Calle != "" && Numext != "" && Colonia != "" && Ciudad != "" && Municipio != "" && Estado != "" && Pais != "" && CP != "")
      {
          var formData = new FormData();
          formData.append("Contacto", Contacto);
          formData.append("Empresa", Empresa);
          formData.append("Calle", Calle);
          formData.append("Numext", Numext);
          formData.append("Numint", Numint);
          formData.append("Colonia", Colonia);
          formData.append("Ciudad", Ciudad);
          formData.append("Municipio", Municipio);
          formData.append("Estado", Estado);
          formData.append("Pais", Pais);
          formData.append("CP", CP);
          formData.append("Tel", Tel);
          formData.append("Cel", Cel);
          formData.append("idCliente", window.Global_Tabla_Distribuidor.childNodes[0].innerHTML);
          formData.append("Status", 'Activo');
          formData.append("Ocurre", Ocurre);

        $.ajax({
            url: dir + 'index.php/Controller_Distribuidores/Add_Direccion',
            type: 'POST',
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            timeout: 35000,
            //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: formData,
            beforeSend : function ()
            {
                $('#Cargando_Add_Direccion').css('display','');
            },
            success: function(data)
            {
              console.log(data);

              if (data == 1)
              {
                toastr.success('Dirección de envio agregada con exito', 'Correcto');
                Limpiar_Direccion();
                Get_Direcciones(window.Global_Tabla_Distribuidor.childNodes[0].innerHTML);
              }
              else
              {
                toastr.error('Ocurrio un error al agregar la dirección', 'Error');
              }
            }
          })
          .done(function() {
            $('#Cargando_Add_Direccion').css('display','none');
          })
          .fail(function(jqXHR, textStatus, errorThrown) {

          })
          .always(function() {
                
          });
      }
      else
      {
          toastr.error('Algunos campos obligatorios estan vacios', 'Error');
      }

    });



    $("#Editar_Direccion_Envio").click(function(event) {
    
      if (window.Global_Tabla_Distribuidor_Direccion != null && window.Global_Tabla_Distribuidor != null)
      {

        console.log(window.Global_Tabla_Distribuidor_Direccion.childNodes[0].innerHTML);

        var formData = new FormData();
        formData.append("id", window.Global_Tabla_Distribuidor_Direccion.childNodes[0].innerHTML);

        $.ajax({
            url: dir + 'index.php/Controller_Distribuidores/getDirrecion',
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
              if (parsed != null && parsed != ""){

                $("#txtContacto_Envio_Editar").val(window.Global_Tabla_Distribuidor_Direccion.childNodes[10].innerHTML);
                $("#txtEmpresa_Envio_Editar").val(window.Global_Tabla_Distribuidor_Direccion.childNodes[11].innerHTML);
                $("#txtCalle_Envio_Editar").val(window.Global_Tabla_Distribuidor_Direccion.childNodes[1].innerHTML);
                $("#txtNumext_Envio_Editar").val(window.Global_Tabla_Distribuidor_Direccion.childNodes[2].innerHTML);
                $("#txtNumint_Envio_Editar").val(window.Global_Tabla_Distribuidor_Direccion.childNodes[3].innerHTML);
                $("#txtColonia_Envio_Editar").val(window.Global_Tabla_Distribuidor_Direccion.childNodes[8].innerHTML);
                $("#txtCiudad_Envio_Editar").val(window.Global_Tabla_Distribuidor_Direccion.childNodes[7].innerHTML);
                $("#txtMunicipio_Envio_Editar").val(window.Global_Tabla_Distribuidor_Direccion.childNodes[6].innerHTML);
                $("#txtEstado_Envio_Editar").val(window.Global_Tabla_Distribuidor_Direccion.childNodes[5].innerHTML);
                $("#txtPais_Envio_Editar").val(window.Global_Tabla_Distribuidor_Direccion.childNodes[4].innerHTML);
                $("#txtCP_Envio_Editar").val(window.Global_Tabla_Distribuidor_Direccion.childNodes[9].innerHTML);
                $("#txtTel_Envio_Editar").val(window.Global_Tabla_Distribuidor_Direccion.childNodes[12].innerHTML);
                $("#txtCel_Envio_Editar").val(window.Global_Tabla_Distribuidor_Direccion.childNodes[13].innerHTML);

                if (window.Global_Tabla_Distribuidor_Direccion.childNodes[14].childNodes[0].innerHTML == 'Inactivo')
                {
                  $("#checkStatus").prop("checked", true);
                }
                else
                {
                  $("#checkStatus").prop("checked", false);
                }

                if (parsed[0]['Ocurre'] == 1)
                {
                  $("#checkOcurreEditar").prop("checked", true);
                }
                else
                {
                  $("#checkOcurreEditar").prop("checked", false);
                }

                $("#Modal_Editar_Direccion").modal("show");
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
        toastr.info('Selecciona una dirección', 'Importante');
      }

    });


    $("#btn_Editar_Direccion").click(function(event) {
      
      let Contacto = $("#txtContacto_Envio_Editar").val();
      let Empresa  = $("#txtEmpresa_Envio_Editar").val();
      let Calle    = $("#txtCalle_Envio_Editar").val();
      let Numext   = $("#txtNumext_Envio_Editar").val();
      let Numint   = $("#txtNumint_Envio_Editar").val();
      let Colonia  = $("#txtColonia_Envio_Editar").val();
      let Ciudad   = $("#txtCiudad_Envio_Editar").val();
      let Municipio = $("#txtMunicipio_Envio_Editar").val();
      let Estado   = $("#txtEstado_Envio_Editar").val();
      let Pais     = $("#txtPais_Envio_Editar").val();
      let CP       = $("#txtCP_Envio_Editar").val();
      let Tel      = $("#txtTel_Envio_Editar").val();
      let Cel      = $("#txtCel_Envio_Editar").val();
      let Status   = '';
      let Ocurre   = 0;

      if($('#checkOcurreEditar').prop('checked')){
        Ocurre = 1;
      }
      else{
        Ocurre = 0;
      }

      if (Contacto != "" && Empresa != "" && Calle != "" && Numext != "" && Colonia != "" && Ciudad != "" && Municipio != "" && Estado != "" && Pais != "" && CP != "")
      {

        if($('#checkStatus').prop('checked'))
        {
          Status = 'Inactivo';
        }
        else
        {
          Status = 'Activo';
        }
          var formData = new FormData();
          formData.append("ID", window.Global_Tabla_Distribuidor_Direccion.childNodes[0].innerHTML);
          formData.append("Contacto", Contacto);
          formData.append("Empresa", Empresa);
          formData.append("Calle", Calle);
          formData.append("Numext", Numext);
          formData.append("Numint", Numint);
          formData.append("Colonia", Colonia);
          formData.append("Ciudad", Ciudad);
          formData.append("Municipio", Municipio);
          formData.append("Estado", Estado);
          formData.append("Pais", Pais);
          formData.append("CP", CP);
          formData.append("Tel", Tel);
          formData.append("Cel", Cel);
          formData.append("idCliente", window.Global_Tabla_Distribuidor.childNodes[0].innerHTML);
          formData.append("Status", Status);
          formData.append("Ocurre", Ocurre);

        $.ajax({
            url: dir + 'index.php/Controller_Distribuidores/Update_Direccion',
            type: 'POST',
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            timeout: 35000,
            //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: formData,
            beforeSend : function ()
            {
                $('#Cargando_Update_Direccion').css('display','');
            },
            success: function(data)
            {
              console.log(data);

              if (data == 1)
              {
                toastr.success('Dirección de envio modificada con exito', 'Correcto');
                Limpiar_Direccion();
                Get_Direcciones(window.Global_Tabla_Distribuidor.childNodes[0].innerHTML);
              }
              else
              {
                toastr.error('Ocurrio un error al modificar la dirección', 'Error');
              }
            }
          })
          .done(function() {
            $('#Cargando_Update_Direccion').css('display','none');
          })
          .fail(function(jqXHR, textStatus, errorThrown) {

          })
          .always(function() {
                
          });
      }
      else
      {
          toastr.error('Algunos campos obligatorios estan vacios', 'Error');
      }

    });


    $("#Eliminar_Direccion_Envio").click(function(event) {
      
      if (window.Global_Tabla_Distribuidor_Direccion != null && window.Global_Tabla_Distribuidor != null)
      {
        if (window.Global_Tabla_Distribuidor_Direccion.childNodes[14].childNodes[0].innerHTML != "Inactivo")
        {

              var formData = new FormData();
              formData.append("ID", window.Global_Tabla_Distribuidor_Direccion.childNodes[0].innerHTML);

            $.ajax({
              url: dir + 'index.php/Controller_Distribuidores/delete_Direccion',
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
                  toastr.success('Dirección de envio eliminada con exito', 'Correcto');
                  Limpiar_Direccion();
                  Get_Direcciones(window.Global_Tabla_Distribuidor.childNodes[0].innerHTML);
                }
                else
                {
                  toastr.error('Ocurrio un error al eliminar la dirección', 'Error');
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
          toastr.info('La dirección ya se encuentra como inactiva', 'Importante');
        }
      }
      else
      {
        toastr.info('Selecciona una dirección', 'Importante');
      }
    });

});


function Get_Direcciones(id) {

    var formData = new FormData();
    formData.append("ID", id);

  $.ajax({
    url: dir + 'index.php/Controller_Distribuidores/Get_Direcion_Envio',
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
        let Direccion_Envio   = document.getElementById("Table_Direcciones_Envio"); 
        let tbody_Detalle     = Direccion_Envio.tBodies[0];

        $('#Table_Direcciones_Envio').DataTable().destroy();
        Direccion_Envio.tBodies[0].innerHTML = "";

            for (var i = 0; i < parsed['Direccion'].length; i++) 
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
               let cel11 = row.insertCell(10);
               let cel12 = row.insertCell(11);
               let cel13 = row.insertCell(12);
               let cel14 = row.insertCell(13);
               let cel15 = row.insertCell(14);

               cel1.innerHTML = parsed['Direccion'][i]['ID'];
               cel2.innerHTML = parsed['Direccion'][i]['Calle'];
               cel3.innerHTML = parsed['Direccion'][i]['Numext'];
               cel4.innerHTML = parsed['Direccion'][i]['Numint'];
               cel5.innerHTML = parsed['Direccion'][i]['Pais'];
               cel6.innerHTML = parsed['Direccion'][i]['Estado'];
               cel7.innerHTML = parsed['Direccion'][i]['Municipio'];
               cel8.innerHTML = parsed['Direccion'][i]['Ciudad'];
               cel9.innerHTML = parsed['Direccion'][i]['Colonia'];
               cel10.innerHTML = parsed['Direccion'][i]['CP'];
               cel11.innerHTML = parsed['Direccion'][i]['Contacto'];
               cel12.innerHTML = parsed['Direccion'][i]['Empresa'];
               cel13.innerHTML = parsed['Direccion'][i]['Tel'];
               cel14.innerHTML = parsed['Direccion'][i]['Cel'];

               if (parsed['Direccion'][i]['Status'] == 'Activo')
               {
                  cel15.innerHTML = '<label class="label label-success">' + parsed['Direccion'][i]['Status'] + '</label>';
               }
               else
               {
                  cel15.innerHTML = '<label class="label label-danger">' + parsed['Direccion'][i]['Status'] + '</label>';
               }
            
            }

            fetch_Direccion();
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
function Limpiar_Direccion() {
  
  $("#txtContacto_Envio").val("");
  $("#txtEmpresa_Envio").val("");
  $("#txtCalle_Envio").val("");
  $("#txtNumext_Envio").val("");
  $("#txtNumint_Envio").val("");
  $("#txtColonia_Envio").val("");
  $("#txtCiudad_Envio").val("");
  $("#txtMunicipio_Envio").val("");
  $("#txtEstado_Envio").val("");
  $("#txtPais_Envio").val("");
  $("#txtCP_Envio").val("");
  $("#txtTel_Envio").val("");
  $("#txtCel_Envio").val("");

  let Direccion_Envio   = document.getElementById("Table_Direcciones_Envio"); 
  let tbody_Detalle     = Direccion_Envio.tBodies[0];
  $('#Table_Direcciones_Envio').DataTable().destroy();
  Direccion_Envio.tBodies[0].innerHTML = "";
  $("#Modal_Agregar_Direccion").modal("hide");

  $("#txtContacto_Envio_Editar").val("");
  $("#txtEmpresa_Envio_Editar").val("");
  $("#txtCalle_Envio_Editar").val("");
  $("#txtNumext_Envio_Editar").val("");
  $("#txtNumint_Envio_Editar").val("");
  $("#txtColonia_Envio_Editar").val("");
  $("#txtCiudad_Envio_Editar").val("");
  $("#txtMunicipio_Envio_Editar").val("");
  $("#txtEstado_Envio_Editar").val("");
  $("#txtPais_Envio_Editar").val("");
  $("#txtCP_Envio_Editar").val("");
  $("#txtTel_Envio_Editar").val("");
  $("#txtCel_Envio_Editar").val("");

  $("#Modal_Editar_Direccion").modal("hide");

  window.Global_Tabla_Distribuidor_Direccion = null;
  window.Global_Tabla_Distribuidor = null;
}

function fetch_Direccion() {
  
  let dataTable = $('#Table_Direcciones_Envio').dataTable({
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

    $("#txtNombre").val("");
    $("#txt_Apellidos").val("");
    $("#txtEmpresa").val("");
    $("#txtCargo").val("");
    $("#txtCalle").val("");
    $("#txtColonia").val("");
    $("#txtCiudad").val("");
    $("#txtMunicipio").val("");
    $("#txtEstado").val("");
    $("#txtPais").val("");
    $("#txtCP").val("");
    $("#txtRFC").val("");
    $("#txtTel1").val("");
    $("#txtTel2").val("");
    $("#txtEmail").val("");
    $("#txtDescuento").val("");
    $("#select_Sucursal").val("");
    $("#txtContrasena").val("");
    $("#select_Entrega").val("");
    $("#txtRegion").val("");
    $("#txtZona").val("");
    $("#select_Idioma").val("");
    $("#txtImpuesto").val("");
    $("#txtMinimoEnvio").val("");
    $("#txtClientes_x_dia").val("20");
    $("#select_Bloque").val("");

    $("#Modal_Agregar").modal("hide");

    $("#txtNombre_Editar").val("");
    $("#txt_Apellidos_Editar").val("");
    $("#txtEmpresa_Editar").val("");
    $("#txtCargo_Editar").val("");
    $("#txtCalle_Editar").val("");
    $("#txtColonia_Editar").val("");
    $("#txtCiudad_Editar").val("");
    $("#txtMunicipio_Editar").val("");
    $("#txtEstado_Editar").val("");
    $("#txtPais_Editar").val("");
    $("#txtCP_Editar").val("");
    $("#txtRFC_Editar").val("");
    $("#txtTel1_Editar").val("");
    $("#txtTel2_Editar").val("");
    $("#txtEmail_Editar").val("");
    $("#txtDescuento_Editar").val("");
    $("#select_Sucursal_Editar").val("");
    $("#txtContrasena_Editar").val("");
    $("#select_Entrega_Editar").val("");
    $("#txtRegion_Editar").val("");
    $("#txtZona_Editar").val("");
    $("#select_Idioma_Editar").val("");
    $("#txtImpuesto_Editar").val("");
    $("#txtMinimoEnvio_Editar").val("");
    $("#txtClientes_x_dia_Editar").val("20");
    $("#select_Bloque_Editar").val("");

    $("#txtCuota").val(0);
    $("#txtCuota_Inicial").val(0);
    $("#txtCuota_Final").val(0);
    $("#txtMeses_Cuota").val(0);
    $("#txtMeses_Actuales").val(0);

    $("#Modal_Editar").modal("hide");

    let Direccion_Envio   = document.getElementById("Table_Direcciones_Envio"); 
    let tbody_Detalle     = Direccion_Envio.tBodies[0];
    $('#Table_Direcciones_Envio').DataTable().destroy();
    Direccion_Envio.tBodies[0].innerHTML = "";

    document.getElementById("fetchDivisionesEditar").tBodies[0].innerHTML = "";
    document.getElementById("fetchDivisiones").tBodies[0].innerHTML = "";

    window.Global_Tabla_Distribuidor = null;

}

function Agregar_Distribuidor(){
    
    $("#Modal_Agregar").modal("show");
}

function Editar_Distribuidor() {
    
    if (window.Global_Tabla_Distribuidor != null)
    {

        var formData = new FormData();
            formData.append("ID", window.Global_Tabla_Distribuidor.childNodes[0].innerHTML);

            $.ajax({
               url: dir + 'index.php/Controller_Distribuidores/Get_Distribuidor_by_Id',
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
                    console.log(data);

                    let parsed = JSON.parse(data);
                    document.getElementById("fetchDivisionesEditar").tBodies[0].innerHTML = "";
                    let tbody = document.getElementById("fetchDivisionesEditar").tBodies[0];

                    console.log(parsed);

                    if (parsed != null && parsed != "")
                    {
                        for (var i = 0; i < parsed['Cliente'].length; i++) 
                        {
                            $("#txtContrasena_Editar").val(parsed['Cliente'][i]['Contrasena']);
                            $("#select_Idioma_Editar").val(parsed['Cliente'][i]['Idioma']);
                            $("#txtImpuesto_Editar").val(parsed['Cliente'][i]['Impuesto']);
                            $("#txtMinimoEnvio_Editar").val(parsed['Cliente'][i]['Minimo_envio']);
                            $("#txtPuntos_Editar").val(parsed['Cliente'][i]['Puntos']);
                            $("#select_Sucursal_Editar").val(parsed['Cliente'][i]['idSucursal']);
                            $("#txtCuota_Editar").val(parsed['Cliente'][i]['Cuota']);

                            $("#txtCuota_Inicial_Editar").val(parsed['Cliente'][i]['Cuota_Inicial']);
                            $("#txtCuota_Final_Editar").val(parsed['Cliente'][i]['Cuota_Final']);
                            $("#txtMeses_Cuota_Editar").val(parsed['Cliente'][i]['Meses_Cuota']);
                            $("#txtMeses_Actuales_Editar").val(parsed['Cliente'][i]['Meses_Actuales']);
                            $("#txtClientes_x_dia_Editar").val(parsed['Cliente'][i]['Clientes_x_dia']);
                            $("#select_Bloque_Editar").val(parsed['Cliente'][i]['idBloque']);

                            if (parsed['Cliente'][i]['Status'] == 'Inactivo')
                            {
                                $("#check_Status").prop('checked', true);
                            }
                            else
                            {
                                $("#check_Status").prop('checked', false);
                            }

                            if (parsed['Cliente'][i]['Generar_puntos'] == 1)
                            {
                                $("#check_Generar_Puntos_Editar").prop('checked', true);
                            }
                            else
                            {
                                $("#check_Generar_Puntos_Editar").prop('checked', false);
                            }

                            if (parsed['Cliente'][i]['Facturacion'] == 1)
                            {
                                $("#check_Facturacion_Editar").prop('checked', true);
                            }
                            else
                            {
                                $("#check_Facturacion_Editar").prop('checked', false);
                            }

                            if (parsed['Cliente'][i]['Minimo_Compra'] == 1)
                            {
                                $("#check_Minimo_Compra_Editar").prop('checked', true);
                            }
                            else
                            {
                                $("#check_Minimo_Compra_Editar").prop('checked', false);
                            }
                        }

                        ///////////////////////////////////////////////////////
                        //// Agregar Asignación División Update 04/07/2019 ////
                        ///////////////////////////////////////////////////////

                        if (parsed['Asignacion'].length > 0)
                        {
                          for (var i = 0; i < parsed['Asignacion'].length; i++) 
                          {
                            let row  = tbody.insertRow(i);
                            let cel1 = row.insertCell(0);
                            let cel2 = row.insertCell(1);
                            let cel3 = row.insertCell(2);

                            cel1.innerHTML = parsed['Asignacion'][i]['idDivision'];
                            cel2.innerHTML = parsed['Asignacion'][i]['Division'];

                            let boton = document.createElement("button");
                            boton.classList.add('btn', 'btn-danger', 'btn-xs');
                            boton.addEventListener("click",eliminarDivisionEditar);
                            cel3.appendChild(boton);

                            let icono = document.createElement("span");
                            icono.classList.add('glyphicon', 'glyphicon-trash');
                            boton.appendChild(icono);
                          }
                        }

                        ///////////////////////////////////////////////////////
                        //// Agregar Asignación División Update 04/07/2019 ////
                        ///////////////////////////////////////////////////////

                        $("#Modal_Editar").modal("show");

                        $("#txtNombre_Editar").val(parsed['Cliente'][0]['Nombre']);
                        $("#txt_Apellidos_Editar").val(parsed['Cliente'][0]['Apellidos']);
                        $("#txtEmpresa_Editar").val(parsed['Cliente'][0]['Empresa']);
                        $("#txtCargo_Editar").val(parsed['Cliente'][0]['Cargo']);
                        $("#txtCalle_Editar").val(parsed['Cliente'][0]['Calle_numero']);
                        $("#txtColonia_Editar").val(parsed['Cliente'][0]['Colonia']);
                        $("#txtCiudad_Editar").val(parsed['Cliente'][0]['Ciudad']);
                        $("#txtMunicipio_Editar").val(parsed['Cliente'][0]['Municipio']);
                        $("#txtEstado_Editar").val(parsed['Cliente'][0]['Estado']);
                        $("#txtPais_Editar").val(parsed['Cliente'][0]['Pais']);
                        $("#txtCP_Editar").val(parsed['Cliente'][0]['CP']);
                        $("#txtRFC_Editar").val(parsed['Cliente'][0]['RFC']);
                        $("#txtTel1_Editar").val(parsed['Cliente'][0]['Tel1']);
                        $("#txtTel2_Editar").val(parsed['Cliente'][0]['Tel2']);
                        $("#txtEmail_Editar").val(parsed['Cliente'][0]['Email']);
                        $("#txtDescuento_Editar").val(parsed['Cliente'][0]['Descuento_%']);
                        $("#select_Entrega_Editar").val(parsed['Cliente'][0]['Dia_entrega']);
                        $("#txtRegion_Editar").val(parsed['Cliente'][0]['Region']);
                        $("#txtZona_Editar").val(parsed['Cliente'][0]['Zona']);
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
                        toastr.warning('Seleccione un distribuidor', 'Advertencia');
    }
}


function Eliminar_Distribuidor() {
    
    if (window.Global_Tabla_Distribuidor != null)
    {

        if (window.Global_Tabla_Distribuidor.childNodes[16].childNodes[0].innerHTML != 'Inactivo')
        {
            swal({
                  title: "¿Esta seguro que desea eliminar al distribuidor?",
                  text: "Una vez eliminada pasara a un estatus como inactivo",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                })
                .then((willDelete) => {
                  if (willDelete) {
                    
                        var formData = new FormData();
                        formData.append("ID", window.Global_Tabla_Distribuidor.childNodes[0].innerHTML);

                        $.ajax({
                           url: dir + 'index.php/Controller_Distribuidores/Eliminar_Distribuidor',
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
                                console.log(data);

                                if(data == "Correcto")
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
                                    toastr.success('Distribuidor eliminado con exito', 'Correcto');

                                    $('#Table_Distribuidor').DataTable().destroy();

                                    Limpiar();

                                    fetch_data_Distribuidor();
                                }
                                else if (data == "neutro")
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
                                    toastr.warning('No hubo ningún cambio en el status del cliente', 'Advertencia');
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
                                    toastr.error('Ocurrio un error al eliminar al distribuidor', 'Error');
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
                        toastr.warning('El distribuidor se encuentra como inactivo', 'Advertencia');
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
                        toastr.warning('Seleccione un distribuidor', 'Advertencia');
    }
}


 function fetch_data_Distribuidor(){

  let dataTable = $('#Table_Distribuidor').DataTable({
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
                    "targets": 16,
                    'render': function (data, type, full, meta)
                    {
                        if (full[16] == 'Activo')
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

        url: dir + "Clases/fetch_Distribuidores.php",
        type: "POST"
    }
  });

    // Limpiar input filter DataTable y Focus //
    $('div.dataTables_filter input', dataTable.table().container()).val("");
    $('div.dataTables_filter input', dataTable.table().container()).focus();
}