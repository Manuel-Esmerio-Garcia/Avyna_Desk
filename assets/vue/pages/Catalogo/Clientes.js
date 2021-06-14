/********************************************************************/
/***   Nombre Archivo: Clinentes.js   					          ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 11/11/2019         					      ***/
/***   Proyecto: Avyna_Desk             		                  ***/
/********************************************************************/

Vue.use(Toasted)

const clients = new Vue({
    el: '#clients',
    name : 'Clientes',
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
    },
    methods: {
        /********************************************************************/
        /***   Función: _btnUnificar() 	                	              ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Boton Unificar Cliente                        ***/
        /********************************************************************/
        _btnUnificar(){
            let scoped = this;
            if (scoped.idCliente != "") {
                if (scoped.objClientSelect != []) {
                    swal({
                        title: "¿Esta segúro que desea unificar al cliente?",
                        text: "Este proceso es irreversible",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            let request = {
                                method : 'POST',
                                url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Cliente/btnUnificar`,
                                data:{
                                    listClient: scoped.objClientSelect,
                                    idCliente : scoped.idCliente
                                }
                            }
                
                            scoped.activeModal = true;
                
                            axios(request)
                            .then(function (response) {
                                console.log(response);
                                console.log(response.data);
                                switch(parseInt(response.status)){
                                    case 200:
                                        switch(parseInt(response.data)){
                                            case 0:
                                                Vue.toasted.error('Ocurrio un error al unificar al cliente.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                scoped.active = false;    
                                            break;        
                                            case 1:
                                                Vue.toasted.success('Cliente unificado con exito ',{duration:800,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                scoped._clean();
                                            break;
                                            default:
                                                Vue.toasted.error('Ocurrio un error inesperado. Por favor intente nuevamente.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                scoped.active = false;
                                            break;
                                        }
                                    break;
                                    case 401:
                                            Vue.toasted.show('Server Error 401',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                    break;
                                    case 500:
                                            Vue.toasted.error('Server Error 500',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                    break;
                                }
                            })
                            .catch(function (error) {
                                scoped.activeModal = false;
                            })
                            .finally(function () {
                                scoped.activeModal = false;                
                            });
                        }
                    }); 
                }else{
                    Vue.toasted.show('No se agrego ningún cliente a unificar.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('No se selecciono un cliente principal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }           
        },
        /********************************************************************/
        /***   Función: _changeCliente() 	                	          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Validar que por lo menos este un cliente      ***/
        /***   seleccionado                                               ***/
        /********************************************************************/
        _changeCliente(){
            let scoped = this;
            if (scoped.idCliente != "") {
                scoped.objClientSelect.forEach(element => {
                    if (element.ID == scoped.idCliente) {
                        scoped.nameCliente = element.Nombre + " " + element.Apellidos;
                    }
                });
            }else{
                Vue.toasted.show('Seleccione al cliente principal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _validateSelectClient() 	                	  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Validar que por lo menos este un cliente      ***/
        /***   seleccionado                                               ***/
        /********************************************************************/
        _validateSelectClient(){
            let scoped = this;
            scoped.validateSelect = 0;
            scoped.objClientSelect = [];
            scoped.objClient.forEach(element => {
                if (element.validate == true) {
                    scoped.validateSelect++;
                    scoped.objClientSelect.push(element);
                }
            });

            if (scoped.validateSelect == 0) {
                Vue.toasted.show('Seleccione algún cliente.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _openModalUnificar() 	                		  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Consultar Clientes Menudeo By Id Cliente      ***/
        /********************************************************************/
        _openModalUnificar(){
            let scoped = this;
            if (scoped.distribuidor != "") {
                let request = {
                    method : 'POST',
                    url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Cliente/getClientesByIdDistrbuidor`,
                    data:{
                        idDistribuidor:scoped.distribuidor
                    }
                }
    
                // Acción Loading //
                scoped.active = true;
    
                // Acción Axios SingIn //
                axios(request)
                .then(function (response) {
                    $('#fetchClients').DataTable().destroy();
                    scoped.objClient = response.data;
                    $("#modalUnificar").modal("show");
                })
                .catch(function (error) {
                    scoped.active = false;
                })
                .finally(function () {
                    scoped.active = false;
                    $(".validateClient").attr("checked", false);
                    scoped._fetch("fetchClients");                
                });
            }else{
                Vue.toasted.show('Debe de seleccionar a un distribuidor.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }            
        },
        /********************************************************************/
        /***   Función: _fetchGlobal() 	                				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Cargar DataTable Side Server Global		      ***/
        /********************************************************************/
        _fetchGlobal(name,info,column,dateInicio,dateFin){

            let target = [];
            let actions = {};

            actions = {
                "targets":column,
                'render': function (data, type, full, meta){
                    label =  "";
                    if (full[column] == 'Pendiente'){
                        label += "<label class='badge badge-warning'>"+full[column]+"</label>"
                    }else if (full[column] == 'Extraida') {
                        label += "<label class='badge badge-success'>"+full[column]+"</label>"
                    }else if (full[column] == 'Facturada') {
                        label += "<label class='badge badge-success'>"+full[column]+"</label>"
                    }else{
                        label += "<label class='badge badge-danger'>"+full[column]+"</label>"
                    }
                    return label                                
                }
            }

            target.push(actions);

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
                "order" : [],
                "ajax" : {
                    url: window.location.protocol+"//"+window.location.host+'/Prosalon_Desk/index.php/Ingresos/InvoicingController/'+name,
                    type: "POST",
                    data:{
                        info:info,
                        column:column,
                        dateInicio:dateInicio,
                        dateFin:dateFin
                    }
                }
            });
        },
        /********************************************************************/
        /***   Función: _fetch() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Cargar DataTable Side Client Global		      ***/
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
        /***   Función: _init() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Obtener Información de la Empresa 		      ***/
        /********************************************************************/
        _initial(){
        },
        /********************************************************************/
        /***   Función: _clean() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Limpiar Objeto Vue              		      ***/
        /********************************************************************/
        _clean(){
            let scoped = this;
            scoped._reset();
            $("#modalUnificar").modal("hide");
            location.reload();
        },
        /********************************************************************/
        /***   Función: _reset() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Inicializa Nuevamente las Variables		      ***/
        /********************************************************************/
        _reset () {
            let scoped = this
            Object.assign(scoped.$data, scoped._initialState());
        },
        /********************************************************************/
        /***   Función: _initialState()                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Declaración de Variables        		      ***/
        /********************************************************************/
        _initialState (){
            return {
                active:false,
                activeModal:false,
                distribuidor:"",
                validateSelect:0,
                nameCliente:"",
                idCliente:"",
                objClient:[],
                objClientSelect:[],
            }
        }
    }
});