// Variables Globales //
var FETCHROLES = null;

$(document).ready(function(){

  // Crear DataTable  20/06/2019 //
  fetchRoles();

  // Cargar Alerts Toast //
  Toast();

  ///////////////////////////////
  /// Acciónes Agregar Roles ////
  ///////////////////////////////

  // Cargar Tabla de Permisos (Agregar Rol) //
  $("#btnAgregar").click(function(event) {

    $.ajax({
      url: window.dir + 'index.php/Controller_Permisos/fetchPermisos',
      type: 'POST',
      processData: false,
      contentType: false,
      timeout: 800000,
      beforeSend : function ()
      {
        $('#loadingHeader').css('display', '');
        $('#btnAgregar').css('display', 'none');
        $('#loadingAgregar').css('display', '');
        $('#btnEditar').css('display', 'none');
        $('#loadingEditar').css('display', '');
        $('#btnEliminar').css('display', 'none');
        $('#loadingEliminar').css('display', '');
        $('#loadingBoxRoles').css('display', '');
        $('#loadingBoxPermisos').css('display', '');
      },
      success: function(data)
      {
        let parsed = JSON.parse(data);
        console.log(parsed);

        if (parsed != null && parsed != ""){

          let fetchPermisos   = document.getElementById("fetchPermisos"); 
          let tbodyPermisos   = fetchPermisos.tBodies[0];

          $('#fetchPermisos').DataTable().destroy();
          fetchPermisos.tBodies[0].innerHTML = "";

          for (var i = 0; i < parsed.length; i++) 
          {
            let row  = tbodyPermisos.insertRow(i);
            let cel1 = row.insertCell(0);
            let cel2 = row.insertCell(1);
            let cel3 = row.insertCell(2);
            let cel4 = row.insertCell(3);

            cel1.innerHTML = parsed[i]['ID'];
            cel2.innerHTML = parsed[i]['Modulo'];
            cel3.innerHTML = parsed[i]['Permiso'];

            let checkbox = document.createElement("input");
            checkbox.setAttribute("type","checkbox");
            cel4.appendChild(checkbox); 
          }

          fetch('fetchPermisos');
        }
        else{
          toastr.warning('Ocurrio un error al consultar los permisos', 'Advertencia');
        }
      }
    })
    .done(function() {
      $("#modalAgregar").modal("show");

      $('#loadingHeader').css('display', 'none');
      $('#btnAgregar').css('display', '');
      $('#loadingAgregar').css('display', 'none');
      $('#btnEditar').css('display', '');
      $('#loadingEditar').css('display', 'none');
      $('#btnEliminar').css('display', '');
      $('#loadingEliminar').css('display', 'none');
      $('#loadingBoxRoles').css('display', 'none');
      $('#loadingBoxPermisos').css('display', 'none');
    })
    .fail(function() {
      $('#loadingHeader').css('display', 'none');
      $('#btnAgregar').css('display', '');
      $('#loadingAgregar').css('display', 'none');
      $('#btnEditar').css('display', '');
      $('#loadingEditar').css('display', 'none');
      $('#btnEliminar').css('display', '');
      $('#loadingEliminar').css('display', 'none');
      $('#loadingBoxRoles').css('display', 'none');
      $('#loadingBoxPermisos').css('display', 'none');

      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
    });

  });
  // Cargar Tabla de Permisos (Agregar Rol) //

  // Acción Seleccionar Todo Permisos //
  $("#checkTodos").click(function(event) {

    let fetchPermisos   = document.getElementById("fetchPermisos"); 
    let tbodyPermisos   = fetchPermisos.tBodies[0];
    $('#fetchPermisos').DataTable().destroy();

    if ($('#checkTodos').prop('checked')){
      for (var i = 0; i < tbodyPermisos.rows.length ; i++)
      {
        tbodyPermisos.rows[i].cells[3].childNodes[0].checked = true;
      }
    }else{
      for (var i = 0; i < tbodyPermisos.rows.length ; i++)
      {
        tbodyPermisos.rows[i].cells[3].childNodes[0].checked = false;
      }
    }

    fetch('fetchPermisos');
  });
  // Acción Seleccionar Todo Permisos //

  // Boton Guardar Rol Con Permisos //
  $("#btnAgregarRol").click(function(event) {
    
    let Rol        = $("#txtRol").val();
    let idPermisos = new Array();

    let fetchPermisos   = document.getElementById("fetchPermisos"); 
    let tbodyPermisos   = fetchPermisos.tBodies[0];
    $('#fetchPermisos').DataTable().destroy();

    for (var i = 0; i < tbodyPermisos.rows.length ; i++)
    {
      if (tbodyPermisos.rows[i].cells[3].childNodes[0].checked == true){
        idPermisos.push(tbodyPermisos.rows[i].cells[0].innerHTML);
      }
    }
    
    fetch('fetchPermisos');

    if (Rol != "" && idPermisos.length > 0)
    {
      // Acción Insertar y Validar Rol //
      var formData = new FormData();
      formData.append("Rol", Rol);
      formData.append("idPermisos", idPermisos);

      $.ajax({
        url: window.dir + 'index.php/Controller_Permisos/addRol',
        type: 'POST',
        processData: false,
        contentType: false,
        timeout: 800000,
        data: formData,
        beforeSend : function ()
        {
          $('#loadingModalAgregar').css('display','');
          $('#btnCerrarAgregar').css('display','none');
          $('#loadingCerrarAgregar').css('display','');
          $('#btnAgregarRol').css('display','none');
          $('#loadingAgregarRol').css('display','');
        },
        success: function(data)
        {
          console.log(data);

          switch(parseInt(data.trim())){

            case 0:
              toastr.error('Ocurrio un error al crear rol en el sistema.', 'Error');
              $("#alertRolDanger").css('display','none');
            break;

            case 1:
              Limpiar(1);
              toastr.success('Rol creado con exito.', 'Correcto');
              $("#alertRolDanger").css('display','none');
            break;

            case 2:
              toastr.warning('El rol asignado ya existe en el sistema.', 'Advertencia');
              $("#alertRolDanger").css('display','');
            break;

            default:
              toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
              $("#alertRolDanger").css('display','none');
          }
        }
      })
      .done(function() {
        $('#loadingModalAgregar').css('display','none');
        $('#btnCerrarAgregar').css('display','');
        $('#loadingCerrarAgregar').css('display','none');
        $('#btnAgregarRol').css('display','');
        $('#loadingAgregarRol').css('display','none');
      })
      .fail( function( jqXHR, textStatus, errorThrown ) {
        $('#loadingModalAgregar').css('display','none');
        $('#btnCerrarAgregar').css('display','');
        $('#loadingCerrarAgregar').css('display','none');
        $('#btnAgregarRol').css('display','');
        $('#loadingAgregarRol').css('display','none');
        $("#modalErrorConexion").modal("show");
      })
      .always(function() {
      });

    }else{
      toastr.warning('Algúnos campos obligatorios estan vacios', 'Advertencia');
      fetch('fetchPermisos');
    }    

  });
  // Boton Guardar Rol Con Permisos //

  ///////////////////////////////////
  /// Fin Acciónes Agregar Roles ////
  ///////////////////////////////////


  ///////////////////////////////
  /// Acciónes Editar Roles ////
  /////////////////////////////

  // Acción leer tr de la tabla al dar click //
  document.getElementById("fetchRoles").onclick = function(e)
  {
    FETCHROLES = e.target.parentNode;

    // Acción para mostrar los permisos del rol //
    let formData = new FormData();
    formData.append("idRol", FETCHROLES.childNodes[0].innerHTML);

    $.ajax({
      url: window.dir + 'index.php/Controller_Permisos/fetchPermisosRol',
      type: 'POST',
      processData: false,
      contentType: false,
      timeout: 800000,
      data: formData,
      beforeSend : function ()
      {
        $('#loadingHeader').css('display', '');
        $('#btnAgregar').css('display', 'none');
        $('#loadingAgregar').css('display', '');
        $('#btnEditar').css('display', 'none');
        $('#loadingEditar').css('display', '');
        $('#btnEliminar').css('display', 'none');
        $('#loadingEliminar').css('display', '');
        $('#loadingBoxRoles').css('display', '');
        $('#loadingBoxPermisos').css('display', '');
      },
      success: function(data)
      {
        let parsed = JSON.parse(data);
        console.log(parsed);

        if (parsed != null && parsed != ""){

          let fetchPermisos   = document.getElementById("fetchPermisosRol"); 
          let tbodyPermisos   = fetchPermisos.tBodies[0];

          $('#fetchPermisosRol').DataTable().destroy();
          fetchPermisos.tBodies[0].innerHTML = "";

          for (var i = 0; i < parsed['Permisos'].length; i++){

            let row  = tbodyPermisos.insertRow(i);
            let cel1 = row.insertCell(0);
            let cel2 = row.insertCell(1);
            let cel3 = row.insertCell(2);

            cel1.innerHTML = parsed['Permisos'][i]['ID'];
            cel2.innerHTML = parsed['Permisos'][i]['Modulo'];
            cel3.innerHTML = parsed['Permisos'][i]['Permiso'];
          }

          fetch('fetchPermisosRol');
        }
        else{
          toastr.warning('Ocurrio un error al consultar los permisos', 'Advertencia');
        }
      }
    })
    .done(function() {

      $('#loadingHeader').css('display', 'none');
      $('#btnAgregar').css('display', '');
      $('#loadingAgregar').css('display', 'none');
      $('#btnEditar').css('display', '');
      $('#loadingEditar').css('display', 'none');
      $('#btnEliminar').css('display', '');
      $('#loadingEliminar').css('display', 'none');
      $('#loadingBoxRoles').css('display', 'none');
      $('#loadingBoxPermisos').css('display', 'none');
    })
    .fail(function() {
      $('#loadingHeader').css('display', 'none');
      $('#btnAgregar').css('display', '');
      $('#loadingAgregar').css('display', 'none');
      $('#btnEditar').css('display', '');
      $('#loadingEditar').css('display', 'none');
      $('#btnEliminar').css('display', '');
      $('#loadingEliminar').css('display', 'none');
      $('#loadingBoxRoles').css('display', 'none');
      $('#loadingBoxPermisos').css('display', 'none');

      $("#modalErrorConexion").modal("show");
    })
    .always(function() {
    });
  }

  // Acción Abrir Modal Editar Rol //
  $("#btnEditar").click(function(event) {
    
    if (FETCHROLES != null)
    {
      let formData = new FormData();
      formData.append("idRol", FETCHROLES.childNodes[0].innerHTML);

      $.ajax({
        url: window.dir + 'index.php/Controller_Permisos/fetchPermisosEditar',
        type: 'POST',
        processData: false,
        contentType: false,
        timeout: 800000,
        data: formData,
        beforeSend : function ()
        {
          $('#loadingHeader').css('display', '');
          $('#btnAgregar').css('display', 'none');
          $('#loadingAgregar').css('display', '');
          $('#btnEditar').css('display', 'none');
          $('#loadingEditar').css('display', '');
          $('#btnEliminar').css('display', 'none');
          $('#loadingEliminar').css('display', '');
          $('#loadingBoxRoles').css('display', '');
          $('#loadingBoxPermisos').css('display', '');
        },
        success: function(data)
        {
          let parsed = JSON.parse(data);
          console.log(parsed);

          // Validación check Todos los permisos //
          (parsed['Permisos'].length == parsed['Count']) ? $("#checkTodosEditar").prop("checked", true) : $("#checkTodosEditar").prop("checked", false);

          // LLenamos el campo rol //
          $("#txtRolEditar").val(FETCHROLES.childNodes[1].innerHTML);

          // Conocer el estatus del Rol //
          (FETCHROLES.childNodes[2].childNodes[0].innerHTML == 'Inactivo') ? $("#checkStatusEditar").prop("checked", true) : $("#checkStatusEditar").prop("checked", false);

          if (parsed != null && parsed != ""){

            let fetchPermisos   = document.getElementById("fetchPermisosEditar"); 
            let tbodyPermisos   = fetchPermisos.tBodies[0];

            $('#fetchPermisosEditar').DataTable().destroy();
            fetchPermisos.tBodies[0].innerHTML = "";

            for (var i = 0; i < parsed['allPermisos'].length; i++){

              let row  = tbodyPermisos.insertRow(i);
              let cel1 = row.insertCell(0);
              let cel2 = row.insertCell(1);
              let cel3 = row.insertCell(2);
              let cel4 = row.insertCell(3);

              cel1.innerHTML = parsed['allPermisos'][i]['ID'];
              cel2.innerHTML = parsed['allPermisos'][i]['Modulo'];
              cel3.innerHTML = parsed['allPermisos'][i]['Permiso'];

              let checkbox = document.createElement("input");
              checkbox.setAttribute("type","checkbox");

              // Validación para marcar el checkbox con el permiso del rol //
              for (var x = 0; x < parsed['Permisos'].length; x++){
                
                if (parsed['allPermisos'][i]['ID'] == parsed['Permisos'][x]['ID']){
                  checkbox.setAttribute("checked","checked");
                }
              }

              cel4.appendChild(checkbox); 
            }

            fetch('fetchPermisosEditar');
          }
          else{
            toastr.warning('Ocurrio un error al consultar los permisos', 'Advertencia');
          }
        }
      })
      .done(function() {
        $("#modalEditar").modal("show");

        $('#loadingHeader').css('display', 'none');
        $('#btnAgregar').css('display', '');
        $('#loadingAgregar').css('display', 'none');
        $('#btnEditar').css('display', '');
        $('#loadingEditar').css('display', 'none');
        $('#btnEliminar').css('display', '');
        $('#loadingEliminar').css('display', 'none');
        $('#loadingBoxRoles').css('display', 'none');
        $('#loadingBoxPermisos').css('display', 'none');
      })
      .fail(function() {
        $('#loadingHeader').css('display', 'none');
        $('#btnAgregar').css('display', '');
        $('#loadingAgregar').css('display', 'none');
        $('#btnEditar').css('display', '');
        $('#loadingEditar').css('display', 'none');
        $('#btnEliminar').css('display', '');
        $('#loadingEliminar').css('display', 'none');
        $('#loadingBoxRoles').css('display', 'none');
        $('#loadingBoxPermisos').css('display', 'none');

        $("#modalErrorConexion").modal("show");
      })
      .always(function() {
      });
    }
    else
    {
      toastr.warning('Para editar un rol es necesario seleccionar el rol que desea editar.', 'Advertencia');
    }

  });

  // Acción Seleccionar Todo Permisos Editar //
  $("#checkTodosEditar").click(function(event) {

    let fetchPermisos   = document.getElementById("fetchPermisosEditar"); 
    let tbodyPermisos   = fetchPermisos.tBodies[0];
    $('#fetchPermisosEditar').DataTable().destroy();

    if ($('#checkTodosEditar').prop('checked')){
      for (var i = 0; i < tbodyPermisos.rows.length ; i++)
      {
        tbodyPermisos.rows[i].cells[3].childNodes[0].checked = true;
      }
    }else{
      for (var i = 0; i < tbodyPermisos.rows.length ; i++)
      {
        tbodyPermisos.rows[i].cells[3].childNodes[0].checked = false;
      }
    }

    fetch('fetchPermisosEditar');
  });
  // Acción Seleccionar Todo Permisos Editar //

  //////////////////////////
  // Acción Modificar Rol //
  //////////////////////////

  $("#btnEditarRol").click(function(event) {
    
    let idRol      = FETCHROLES.childNodes[0].innerHTML;
    let Rol        = $("#txtRolEditar").val();
    let Status     = 'Activo';
    let idPermisos = new Array();

    let fetchPermisos   = document.getElementById("fetchPermisosEditar"); 
    let tbodyPermisos   = fetchPermisos.tBodies[0];
    $('#fetchPermisosEditar').DataTable().destroy();

    for (var i = 0; i < tbodyPermisos.rows.length ; i++)
    {
      if (tbodyPermisos.rows[i].cells[3].childNodes[0].checked == true){
        idPermisos.push(tbodyPermisos.rows[i].cells[0].innerHTML);
      }
    }

    fetch('fetchPermisosEditar');

    // Conocer el estatus del Rol a modificar //
    ($('#checkStatusEditar').prop('checked')) ? Status = 'Inactivo' : Status = 'Activo'; 

    if (Rol != "" && idPermisos.length > 0)
    {
      // Acción Modificar y Validar Rol //
      var formData = new FormData();
      formData.append("idRol", idRol);
      formData.append("Rol", Rol);
      formData.append("idPermisos", idPermisos);

      $.ajax({
        url: window.dir + 'index.php/Controller_Permisos/updateRol',
        type: 'POST',
        processData: false,
        contentType: false,
        timeout: 800000,
        data: formData,
        beforeSend : function ()
        {
          $('#loadingModalEditar').css('display','');
          $('#btnCerrarEditar').css('display','none');
          $('#loadingCerrarEditar').css('display','');
          $('#btnEditarRol').css('display','none');
          $('#loadingEditarRol').css('display','');
        },
        success: function(data)
        {
          console.log(data);

          switch(parseInt(data.trim())){

            case 0:
              toastr.error('Ocurrio un error al modificar rol en el sistema.', 'Error');
              $("#alertRolDangerEditar").css('display','none');
            break;

            case 1:
              Limpiar(2);
              toastr.success('Rol modificado con exito.', 'Correcto');
              $("#alertRolDangerEditar").css('display','none');
            break;

            case 2:
              toastr.warning('El nombre del rol ya existe en el sistema.', 'Advertencia');
              $("#alertRolDangerEditar").css('display','');
            break;

            default:
              toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
              $("#alertRolDangerEditar").css('display','none');
          }
        }
      })
      .done(function() {
        $('#loadingModalEditar').css('display','none');
        $('#btnCerrarEditar').css('display','');
        $('#loadingCerrarEditar').css('display','none');
        $('#btnEditarRol').css('display','');
        $('#loadingEditarRol').css('display','none');
      })
      .fail( function( jqXHR, textStatus, errorThrown ) {
        $('#loadingModalEditar').css('display','none');
        $('#btnCerrarEditar').css('display','');
        $('#loadingCerrarEditar').css('display','none');
        $('#btnEditarRol').css('display','');
        $('#loadingEditarRol').css('display','none');

        $("#modalErrorConexion").modal("show");
      })
      .always(function() {
      });

    }else{
      toastr.warning('Algúnos campos obligatorios estan vacios', 'Advertencia');
      //fetch('fetchPermisosEditar');
    }

  });

  ///////////////////////////////
  /// Acciónes Editar Roles ////
  /////////////////////////////

  ////////////////////////////////
  /// Acciónes Eliminar Roles ////
  ////////////////////////////////

  $("#btnEliminar").click(function(event) {
    
    if (FETCHROLES != null){

      if (FETCHROLES.childNodes[2].childNodes[0].innerHTML != 'Inactivo'){

        swal({
          title: "¿Esta segúro que desea suspender el rol " + FETCHROLES.childNodes[1].innerHTML + "?",
          text: "Una vez suspendido el rol pasara a a un estatus Inactivo",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            
            let formData = new FormData();
            formData.append("idRol", FETCHROLES.childNodes[0].innerHTML);

            $.ajax({
              url: window.dir + 'index.php/Controller_Permisos/deleteRol',
              type: 'POST',
              processData: false,
              contentType: false,
              timeout: 800000,
              data: formData,
              beforeSend : function ()
              {
                $('#loadingHeader').css('display', '');
                $('#btnAgregar').css('display', 'none');
                $('#loadingAgregar').css('display', '');
                $('#btnEditar').css('display', 'none');
                $('#loadingEditar').css('display', '');
                $('#btnEliminar').css('display', 'none');
                $('#loadingEliminar').css('display', '');
                $('#loadingBoxRoles').css('display', '');
                $('#loadingBoxPermisos').css('display', '');
              },
              success: function(data)
              {
                console.log(data);

                switch(parseInt(data.trim())){

                  case 0:
                    toastr.error('Ocurrio un error al suspender el rol en el sistema.', 'Error');
                  break;

                  case 1:
                    Limpiar(3);
                    toastr.success('Rol suspendido con exito.', 'Correcto');
                  break;

                  default:
                    toastr.error('Ocurrio un error inesperado. Por favor intente de nuevo.', 'Error');
                }
              }
            })
            .done(function() {
              $('#loadingHeader').css('display', 'none');
              $('#btnAgregar').css('display', '');
              $('#loadingAgregar').css('display', 'none');
              $('#btnEditar').css('display', '');
              $('#loadingEditar').css('display', 'none');
              $('#btnEliminar').css('display', '');
              $('#loadingEliminar').css('display', 'none');
              $('#loadingBoxRoles').css('display', 'none');
              $('#loadingBoxPermisos').css('display', 'none');
            })
            .fail(function() {
              $('#loadingHeader').css('display', 'none');
              $('#btnAgregar').css('display', '');
              $('#loadingAgregar').css('display', 'none');
              $('#btnEditar').css('display', '');
              $('#loadingEditar').css('display', 'none');
              $('#btnEliminar').css('display', '');
              $('#loadingEliminar').css('display', 'none');
              $('#loadingBoxRoles').css('display', 'none');
              $('#loadingBoxPermisos').css('display', 'none');

              $("#modalErrorConexion").modal("show");
            })
            .always(function() {
            });
          }

        });
      }
      else{
        toastr.warning('El rol seleccionado ya se encuentra como "Inactivo"', 'Advertencia');
      }

    }else{
      toastr.warning('Para suspender un rol es necesario seleccionar el rol que desea suspender.', 'Advertencia');
    }

  });

});

//////////////////////////////////////////
//          Función Limpiar  25/06/2019 //
//////////////////////////////////////////

function Limpiar(valor) {
  
  let fetchPermisos   = document.getElementById("fetchPermisosRol"); 
  let tbodyPermisos   = fetchPermisos.tBodies[0];
  
  switch(valor){

    case 1:
      // Cerramos la modal // 
      $("#modalAgregar").modal("hide");
      //Limpiamos campos Modal Agregar //
      $("#txtRol").val('');
      $("#checkTodos").prop("checked", false);
      // Refrescar Datatable //
      $('#fetchRoles').DataTable().ajax.reload();
      //Limpiar Permisos del Rol //
      $('#fetchPermisosRol').DataTable().destroy();
      fetchPermisos.tBodies[0].innerHTML = "";
    break;

    case 2:
      // Cerramos la modal // 
      $("#modalEditar").modal("hide");
      //Limpiamos campos Modal Agregar //
      $("#txtRolEditar").val('');
      $("#checkTodosEditar").prop("checked", false);
      // Refrescar Datatable //
      $('#fetchRoles').DataTable().ajax.reload();
      // Limpiamos variable FETCHROLES //
      FETCHROLES = null;
      //Limpiar Permisos del Rol //
      $('#fetchPermisosRol').DataTable().destroy();
      fetchPermisos.tBodies[0].innerHTML = "";

      window.location = window.dir + 'index.php/Controller_Permisos';
    break;

    case 3:
      // Refrescar Datatable //
      $('#fetchRoles').DataTable().ajax.reload();
      // Limpiamos variable FETCHROLES //
      FETCHROLES = null;
      //Limpiar Permisos del Rol //
      $('#fetchPermisosRol').DataTable().destroy();
      fetchPermisos.tBodies[0].innerHTML = "";
    break;

    default:
  }
}

//////////////////////////////////////////
//          Función Limpiar  25/06/2019 //
//////////////////////////////////////////


//////////////////////////////////////////
// Función Cargar fetchRoles 20/06/2019 //
//////////////////////////////////////////
function fetchRoles(){
  let dataTable = $('#fetchRoles').DataTable({
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
         "paginate":{
      		"previous": "Anterior",
      		"next": "Siguiente", 
       	}
      },
      "select": true,
      "columnDefs": [
        {
          "targets": 2,
          'render': function (data, type, full, meta)
          {
            if (full[2] == 'Inactivo')
            {
                return "<span class='badge badge-danger'>"+full[2]+"</span>"
            }
            else
            {
                return "<span class='badge badge-success'>"+full[2]+"</span>"
            }
          }
        }
      ],
      "order" : [],
      "ajax" : {
          url: window.dir + "index.php/Controller_Permisos/fetchRoles",
          type: "POST"
      }
  });
}

//////////////////////////////////////////
// Función General Fetch     20/06/2019 //
//////////////////////////////////////////
function fetch($table){
  $('#'+$table).DataTable({
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
       "paginate":{
        "previous": "Anterior",
        "next": "Siguiente", 
      }
    },
    "select": true
  });
}