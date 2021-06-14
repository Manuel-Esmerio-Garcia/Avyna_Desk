/********************************************************************/
/***   Nombre Archivo: VentasWeb.js                               ***/
/***   Autor: Manuel Esmerio Garcia                               ***/
/***   Fecha Inicio: 27/03/2020                                   ***/
/***   Proyecto: Avyna_Desk                                       ***/
/********************************************************************/

Vue.use(Toasted)

const Picking = new Vue({
    el: '#VentasWeb',
    name : 'Ventas Web',
    data:function (){
        return this._initialState();
    },
    components:{
        loading:VueLoading,
        datetime:vuejsDatepicker
    },
    computed:{
    },
    mounted() {
        let scoped = this;
        scoped._fetchGlobal("fetchVentasWeb",7,true,"no",'','',false);
        // Cargar Libreria DatePicker //
        $('.input-daterange').datepicker({
            format: "yyyy-mm-dd",
            autoclose: true
        });

        document.getElementById("fetchVentasWeb").onclick = function(e){
            scoped.objVentas = e.target.parentNode;
        }
    },
    methods: {
        actionUpload(){
            console.log("Mensaje del Click");
            
            location.reload();
            window.location.reload();
        },
        _btnDeleteSales(){
            let scoped = this;
            swal({
                title: "¿Esta seguro que desea eliminar las ventas pendientes?",
                text: "Se eliminaran las ventas con estatus pendientes y que no tengan un pago relacionado.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    scoped.active = true;
    
                    let request = {
                        method : 'POST',
                        url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Ventas_Web/DeleteSales',
                    }            
                    // Acción Axios SingIn //
                    axios(request)
                    .then(function (response) {
                        console.log(response.data);
                        switch(parseInt(response.data)){
                            case 1:
                                Vue.toasted.success('Ventas con estatus pendiente y con adeudo fueron eliminadas con éxito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                scoped._clean();
                            break;
                            case 0:
                                Vue.toasted.show('Ocurrió un error al eliminar las ventas pendientes.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            break;
                            default:
                                Vue.toasted.error('Ocurrió un error desconocido por favor intente mas tarde.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            break;
                        }
                    })
                    .catch(function (error) {
                        scoped.active = false;
                    })
                    .finally(function () {
                        scoped.active = false;
                    });
                }
            });
        },
        _btnSubir(){
            $("#modalSubirArchvio").modal("show");
        },
        _btnEnviarRecordatorio(){
            window.open("http://integrattodev.cloudapp.net/WebServiceSendMail/SendRecordatorio.php",'_blank');
        },
        _btnFacturaGlobal(){
            let scoped = this;
            swal({
                title: "¿Esta seguro que desea realizar la factura global?",
                text: "Una vez realizada la factura no sera posible deshacer el cambio",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    scoped.active = true;
    
                    let request = {
                        method : 'POST',
                        url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Ventas_Web/GlobalInvoice',
                    }            
                    // Acción Axios SingIn //
                    axios(request)
                    .then(function (response) {
                        console.log(response.data);
                        switch(parseInt(response.data)){
                            case 4:
                                Vue.toasted.error('No se encontraron facturas por facturar.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                //scoped._clean();
                            break;
                            case 1:
                                Vue.toasted.success('Factura Global generada con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                scoped._clean();
                            break;
                            case 0:
                                Vue.toasted.show('Ocurrio un error al realizas la factura global.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            break;
                            default:
                                Vue.toasted.error('Ocurrio un error desconocido por favor intente mas tarde.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            break;
                        }
                    })
                    .catch(function (error) {
                        scoped.active = false;
                    })
                    .finally(function () {
                        scoped.active = false;
                    });
                }
            });
        },
        _btnEliminarAdeudo(){
            let scoped = this;
            if (scoped.objVentas != null) {
                if (parseFloat(scoped.objVentas.childNodes[5].innerHTML) != 0.00) {
                    swal({
                        title: "¿Esta seguro que desea pagar la venta?",
                        text: "Una vez pagada la venta no sera posible restaurarla",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
    
                            scoped.active = true;
    
                            let request = {
                                method : 'POST',
                                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Ventas_Web/DeleteAdeudo',
                                data:{
                                    ID: scoped.objVentas.childNodes[0].innerHTML
                                }
                            }            
                            // Acción Axios SingIn //
                            axios(request)
                            .then(function (response) {
                                console.log(response.data);
                                switch(parseInt(response.data)){
                                    case 1:
                                        Vue.toasted.success('Venta Web pagada con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                        scoped._clean();
                                    break;
                                    case 0:
                                        Vue.toasted.show('Ocurrio un error al pagar la venta.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                    break;
                                    default:
                                        Vue.toasted.error('Ocurrio un error desconocido por favor intente mas tarde.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                    break;
                                }
                            })
                            .catch(function (error) {
                                scoped.active = false;
                            })
                            .finally(function () {
                                scoped.active = false;
                            });
                        }
                    });
                }
                else{
                    Vue.toasted.show('La venta ya fue pagada.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }
            else{
                Vue.toasted.show('Seleccione la venta que desea eliminar.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        _btnEliminar(){
            let scoped = this;
            if (scoped.objVentas != null) {
                console.log(parseFloat(scoped.objVentas.childNodes[5].innerHTML));
                if (parseFloat(scoped.objVentas.childNodes[5].innerHTML) != 0.00) {
                    swal({
                        title: "¿Esta seguro que desea eliminar la venta?",
                        text: "Una vez eliminada la venta no sera posible restaurarla",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
    
                            scoped.active = true;
    
                            let request = {
                                method : 'POST',
                                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Ventas_Web/Delete',
                                data:{
                                    ID: scoped.objVentas.childNodes[0].innerHTML
                                }
                            }            
                            // Acción Axios SingIn //
                            axios(request)
                            .then(function (response) {
                                console.log(response.data);
                                switch(parseInt(response.data)){
                                    case 1:
                                        Vue.toasted.success('Venta Web eliminado con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                        scoped._clean();
                                    break;
                                    case 0:
                                        Vue.toasted.show('Ocurrio un error al eliminar la venta.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                    break;
                                    default:
                                        Vue.toasted.error('Ocurrio un error desconocido por favor intente mas tarde.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                    break;
                                }
                            })
                            .catch(function (error) {
                                scoped.active = false;
                            })
                            .finally(function () {
                                scoped.active = false;
                            });
                        }
                    });
                }
                else{
                    Vue.toasted.show('No es posible eliminar una venta, Si esta ya fue pagada.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }                
            }
            else{
                Vue.toasted.show('Seleccione la venta que desea eliminar.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        _actionCheckit(){
            console.log("Change");
            let scoped = this;
            scoped.start_date = $("#DateStartVentasWeb").val();
            scoped.end_date = $("#DateEndVentasWeb").val();

            if (scoped.start_date != "" && scoped.end_date != "") {
                $('#fetchVentasWeb').DataTable().destroy();
                scoped._fetchGlobal("fetchVentasWeb",7,true,"yes",scoped.start_date,scoped.end_date,scoped.checkit);
            }else{
                $('#fetchVentasWeb').DataTable().destroy();
                scoped._fetchGlobal("fetchVentasWeb",7,true,"no",'','',scoped.checkit);
            }
        },
        _BuscarDate(){
            console.log("Click");
            let scoped = this;
            scoped.start_date = $("#DateStartVentasWeb").val();
            scoped.end_date = $("#DateEndVentasWeb").val();

            if (scoped.start_date != "" && scoped.end_date != "") {
                $('#fetchVentasWeb').DataTable().destroy();
                scoped._fetchGlobal("fetchVentasWeb",7,true,"yes",scoped.start_date,scoped.end_date,scoped.checkit);
            }else{
                $('#fetchVentasWeb').DataTable().destroy();
                scoped._fetchGlobal("fetchVentasWeb",7,true,"no",'','',scoped.checkit);
            }
        },
        /********************************************************************/
        /***   Función: _fetchGlobal()                                    ***/
        /***   Autor: Manuel Esmerio Gacria                               ***/
        /***   Fecha: 05/02/2020                                          ***/
        /***   Descripción: Cargar DataTable Side Server Global           ***/
        /********************************************************************/
        _fetchGlobal(name,possition,check,is_date_search='', start_date='', end_date='', checkit=false){
            let scoped = this;
            let target = "";
            if (check) {
                target = [ 
                    {
                        "targets": 8,
                        'render': function (data, type, full, meta)
                        {
                            if (full[8] == 0){
                                return "<label class='badge badge-success'>Confirmado</label>"
                            }
                            else if (full[8] == 1) {
                                return "<label class='badge badge-danger'>Sin Confirmar</label>"
                            }
                            else{
                                return "<label class='badge badge-warning'>N/A</label>"
                            }
                        }
                    },
                    {
                        "targets": 6,
                        'render': function (data, type, full, meta)
                        {
                            if (full[6] == 'Enviado'){
                                return "<label class='badge badge-primary'>Enviado</label>"
                            }
                            else if (full[6] == 'Pagado') {
                                return "<label class='badge badge-success'>Pagado</label>"
                            }
                            else if (full[6] == 'Confirmacion_pago') {
                                return "<label class='badge badge-secondary'>Confirmacion_pago</label>"
                            }
                            else if (full[6] == 'Adeudo') {
                                return "<label class='badge badge-warning'>Adeudo</label>"
                            }
                            else{
                                return "<label class='badge badge-warning'>" + full[6] + "</label>"
                            }
                        }
                    },
                    {
                        "targets": possition,
                        'render': function (data, type, full, meta)
                        {
                            if (full[possition] == 0){
                                return "<label class='badge badge-danger'>Sin Extraer</label>"
                            }
                            else if (full[possition] == 1) {
                                return "<label class='badge badge-success'>Extraido</label>"
                            }
                        }
                    },
                    {
                        "targets": 15,
                        'render': function (data, type, full, meta)
                        {
                            if (full[15] == 0){
                                if (full[16] == 0) {
                                    return "<button class='btn btn-primary' onclick='Facturar(this.parentNode.parentNode)'>Facturar</button><button class='btn btn-success' onclick='Entregar(this.parentNode.parentNode)'>Entregado</button>"
                                }else{
                                    return "<button class='btn btn-primary' onclick='Facturar(this.parentNode.parentNode)'>Facturar</button>"
                                }                                
                            }
                            else if (full[15] == 1) {
                                if (full[16] == 0) {
                                    return "<button class='btn btn-default btn-sm' onclick='Descargar(this.parentNode.parentNode)'>Descargar</button> <button class='btn btn-success' onclick='Entregar(this.parentNode.parentNode)'>Entregado</button>"
                                }else{
                                    return "<button class='btn btn-default btn-sm' onclick='Descargar(this.parentNode.parentNode)'>Descargar</button>"
                                } 
                            }
                        }
                    }

                ]
            }

            $('#'+name).DataTable({
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
                    "processing": "Cargando registros...",
                    "searchPlaceholder": "Comience a teclear...",
                    "paginate": {
                        "previous": "Anterior",
                        "next": "Siguiente", 
                    }
                },
                "select": true,
                "bDestroy": true, 
                "columnDefs": target,
                "ajax" : {
                    url: window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Ventas_Web/'+name,
                    type: "POST",
                    data:{
                        is_date_search:is_date_search, start_date:start_date, end_date:end_date, checkit:checkit
                    }
                }
            });
        },
        /********************************************************************/
        /***   Función: _fetch()                                          ***/
        /***   Autor: Manuel Esmerio Gacria                               ***/
        /***   Fecha: 05/02/2020                                          ***/
        /***   Descripción: Cargar DataTable Side Client Global           ***/
        /********************************************************************/
        _fetch(table) {
            $('#'+table).dataTable({
                "language":{
                    "lengthMenu":"Mostrar _MENU_ registros por página.",
                    "zeroRecords": "Lo sentimos. No se encontraron registros.",
                    "info": "Mostrando página _PAGE_ de _PAGES_",
                    "infoEmpty": "No hay registros aún.",
                    "infoFiltered": "(filtrados de un total de _MAX_ registros)",
                    "search" : "Búsqueda",
                    "loadingRecords": "Cargando ...",
                    "processing": "Cargando registros...",
                    "searchPlaceholder": "Comience a teclear...",
                    "paginate": {
                        "previous": "Anterior",
                        "next": "Siguiente", 
                    }
                },
                "select": true,
                "bDestroy": true,
            });
        },
        /********************************************************************/
        /***   Función: _initial()                                        ***/
        /***   Autor: Manuel Esmerio Gacria                               ***/
        /***   Fecha: 05/02/2020                                          ***/
        /***   Descripción: Obtener Información de la Empresa             ***/
        /********************************************************************/
        _initial(){
            console.log("Mensaje");
        },
        ///// Abrir Modal Facturar //////
        Facturar(globalVenta, globalidClienteMenudeo){

            $("#modalInfoCliente").modal("show");

            let formData = new FormData();
            formData.append("idVenta", row.childNodes[0].innerHTML);
            formData.append("idClienteMenudeo", row.childNodes[2].childNodes[1].innerHTML);

            $.ajax({
                url: window.dir + 'index.php/Controller_VentasDirectas/GetinfoClienteMenudeoByIdVenta',
                type: 'POST',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                timeout: 800000,
                data: formData,
                beforeSend : function ()
                {
                    $('#loadingHeader').css('display','');
                    $('#btnCerrarModalInfo').css('display','none');
                    $('#loadingCerrarModalInfo').css('display','');
                    $('#btnFacturar').css('display','none');
                    $('#loadingFacturar').css('display','');
                },
                success: function(data)
                {
                    console.log(data);
                    let parsed = JSON.parse(data);

                    $("#txtClienteInfo").val(parsed[0]['Empresa']);
                    $("#txtRFCInfo").val(parsed[0]['RFC']);
                    $("#txtCPInfo").val(parsed[0]['CP']);
                    $(".txtColoniaInfo").val(parsed[0]['Colonia']);
                }
            })
            .done(function() {
                $('#loadingHeader').css('display','none');
                $('#btnCerrarModalInfo').css('display','');
                $('#loadingCerrarModalInfo').css('display','none');
                $('#btnFacturar').css('display','');
                $('#loadingFacturar').css('display','none');
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                $('#loadingHeader').css('display','none');
                $('#btnCerrarModalInfo').css('display','');
                $('#loadingCerrarModalInfo').css('display','none');
                $('#btnFacturar').css('display','');
                $('#loadingFacturar').css('display','none');
                $("#modalErrorConexion").modal("show");
            })
            .always(function() {
            });
        },
        /********************************************************************/
        /***   Función: _clean()                                          ***/
        /***   Autor: Manuel Esmerio Gacria                               ***/
        /***   Fecha: 05/02/2020                                          ***/
        /***   Descripción: Limpiar Objeto Vue                            ***/
        /********************************************************************/
        _clean(){
            let scoped = this;
            scoped.start_date = "";
            scoped.end_date = "";
            scoped.checkit = false;
            scoped.objVentas = null;
            $('#fetchVentasWeb').DataTable().destroy();
            scoped._fetchGlobal("fetchVentasWeb",7,true,"no",'','',false);
        },
        /********************************************************************/
        /***   Función: _reset()                                          ***/
        /***   Autor: Manuel Esmerio Gacria                               ***/
        /***   Fecha: 05/02/2020                                          ***/
        /***   Descripción: Inicializa Nuevamente las Variables           ***/
        /********************************************************************/
        _reset () {
            let scoped = this
            Object.assign(scoped.$data, scoped._initialState());
        },
        /********************************************************************/
        /***   Función: _initialState()                                   ***/
        /***   Autor: Manuel Esmerio Gacria                               ***/
        /***   Fecha: 05/02/2020                                          ***/
        /***   Descripción: Declaración de Variables                      ***/
        /********************************************************************/
        _initialState (){
            return {
                active: false,
                start_date: "",
                end_date: "",
                checkit:false,
                objVentas:null
            }
        }
    }
});
