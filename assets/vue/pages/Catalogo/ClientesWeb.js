/********************************************************************/
/***   Nombre Archivo: Clinentes.js   					          ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 11/11/2019         					      ***/
/***   Proyecto: Avyna_Desk             		                  ***/
/********************************************************************/

Vue.use(Toasted)

const clients = new Vue({
    el: '#clientsweb',
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
        let scoped = this;
        scoped._fetchGlobal("fetchClientes",19,true,'no','','');
        document.getElementById("fetchClientes").onclick = function(e){
            scoped.objCliente = e.target.parentNode;
        }
    },
    methods: {
        _addModalEliminar(){
            let scoped = this;
            if (scoped.objCliente != null) {
                if (scoped.objCliente.childNodes[19].childNodes[0].innerHTML != 'Inactivo') {

                    swal({
                        title: "¿Esta segúro que desea eliminar al cliente?",
                        text: "Una vez eliminado, pasara a un estatus de inactivo",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                    if (willDelete) {
                        scoped.active = true;

                        let request = {
                            method : 'POST',
                            url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Clientes_Web/Delete',
                            data:{
                                ID: scoped.objCliente.childNodes[0].innerHTML
                            }
                        }            
                        // Acción Axios SingIn //
                        axios(request)
                        .then(function (response) {
                            console.log(response.data);
                            switch(parseInt(response.data)){
                                case 1:
                                    Vue.toasted.success('Cliente eliminado con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                    scoped._clean();
                                break;
                                case 0:
                                    Vue.toasted.show('Ocurrio un error al eliminar al cliente.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                }else{
                    Vue.toasted.show('El cliente ya se encuentra como inactivo.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('Seleccione al cliente que desea eliminar.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        _updateCliente(){
            let scoped = this;
            if (this.Cliente.Nombre != "" && this.Cliente.Apellidos != "" &&  this.Cliente.Tel1 != "" && this.Cliente.Email != "") {
                scoped.activeModal = true;

                (scoped.ValidateStatus == true) ? scoped.Cliente.Status = 'Inactivo' : scoped.Cliente.Status = 'Activo';

                let request = {
                    method : 'POST',
                    url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Clientes_Web/Update',
                    data:{
                        Cliente: scoped.Cliente
                    }
                }            
                // Acción Axios SingIn //
                axios(request)
                .then(function (response) {
                    console.log(response.data);
                    switch(parseInt(response.data)){
                        case 1:
                            Vue.toasted.success('Cliente modificado con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            scoped._clean();
                        break;
                        case 0:
                            Vue.toasted.show('Ocurrio un error al modificar al cliente.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        break;
                        default:
                            Vue.toasted.error('Ocurrio un error desconocido por favor intente mas tarde.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        break;
                    }
                })
                .catch(function (error) {
                    scoped.activeModal = false;
                })
                .finally(function () {
                    scoped.activeModal = false;
                });
            }else{
                Vue.toasted.show('Algúnos campos obligatorios se encuentran vacios.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        _addModalEditar(){
            let scoped = this;
            if (scoped.objCliente != null) {
                $("#ModalAddCliente").modal("show");
                scoped.validate = 1;
                scoped.Cliente.ID = scoped.objCliente.childNodes[0].innerHTML;
                scoped.Cliente.Nombre = scoped.objCliente.childNodes[1].innerHTML;
                scoped.Cliente.Apellidos = scoped.objCliente.childNodes[2].innerHTML;
                scoped.Cliente.RFC = scoped.objCliente.childNodes[3].innerHTML;
                scoped.Cliente.Empresa = scoped.objCliente.childNodes[4].innerHTML;
                scoped.Cliente.Cargo = scoped.objCliente.childNodes[5].innerHTML;
                scoped.Cliente.Calle_numero = scoped.objCliente.childNodes[6].innerHTML;
                scoped.Cliente.Colonia = scoped.objCliente.childNodes[7].innerHTML;
                scoped.Cliente.Ciudad = scoped.objCliente.childNodes[8].innerHTML;
                scoped.Cliente.Municipio = scoped.objCliente.childNodes[9].innerHTML;
                scoped.Cliente.Estado = scoped.objCliente.childNodes[10].innerHTML;
                scoped.Cliente.Pais = scoped.objCliente.childNodes[11].innerHTML;
                scoped.Cliente.CP = scoped.objCliente.childNodes[12].innerHTML;
                scoped.Cliente.Tel1 = scoped.objCliente.childNodes[13].innerHTML;
                scoped.Cliente.Tel2 = scoped.objCliente.childNodes[14].innerHTML;
                scoped.Cliente.Email = scoped.objCliente.childNodes[15].innerHTML;
                scoped.Cliente.Descuento = scoped.objCliente.childNodes[16].innerHTML;
                scoped.Cliente.Nivel = scoped.objCliente.childNodes[17].innerHTML;
                scoped.Cliente.idSalon = scoped.objCliente.childNodes[18].innerHTML;
                scoped.Cliente.Status = scoped.objCliente.childNodes[19].childNodes[0].innerHTML;
                (scoped.objCliente.childNodes[19].childNodes[0].innerHTML == 'Inactivo') ? scoped.ValidateStatus = true : scoped.ValidateStatus = false;
                scoped.Cliente.idCliente = 1967;
                
            }else{
                Vue.toasted.show('Seleccione al cliente que desea editar.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
            
        },
        _addCliente(){
            let scoped = this;
            if (this.Cliente.Nombre != "" && this.Cliente.Apellidos != "" &&  this.Cliente.Tel1 != "" && this.Cliente.Email != "") {
                scoped.activeModal = true;

                let request = {
                    method : 'POST',
                    url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Clientes_Web/Insert',
                    data:{
                        Cliente: scoped.Cliente
                    }
                }            
                // Acción Axios SingIn //
                axios(request)
                .then(function (response) {
                    console.log(response.data);
                    switch(parseInt(response.data)){
                        case 1:
                            Vue.toasted.success('Cliente agregado con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            scoped._clean();
                        break;
                        case 0:
                            Vue.toasted.show('Ocurrio un error al agregar al cliente.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        break;
                        default:
                            Vue.toasted.error('Ocurrio un error desconocido por favor intente mas tarde.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        break;
                    }
                })
                .catch(function (error) {
                    scoped.activeModal = false;
                })
                .finally(function () {
                    scoped.activeModal = false;
                });
            }else{
                Vue.toasted.show('Algúnos campos obligatorios se encuentran vacios.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        _addModal(){
            $("#ModalAddCliente").modal("show");
            this.Cliente.ID = 0;
            this.Cliente.Nombre = '';
            this.Cliente.Apellidos = '';
            this.Cliente.RFC = '';
            this.Cliente.Empresa = '';
            this.Cliente.Cargo = '';
            this.Cliente.Calle_numero = '';
            this.Cliente.Colonia = '';
            this.Cliente.Ciudad = '';
            this.Cliente.Municipio = '';
            this.Cliente.Estado = '';
            this.Cliente.Pais = '';
            this.Cliente.CP = '';
            this.Cliente.Tel1 = '';
            this.Cliente.Tel2 = '';
            this.Cliente.Email = '';
            this.Cliente.Descuento = '';
            this.Cliente.Nivel = '';
            this.Cliente.Status = 'Activo';
            this.Cliente.idSalon = '';
            this.Cliente.idCliente = 1967;
            this.validate = 0;
        },
        /********************************************************************/
        /***   Función: _fetchGlobal() 	                				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Cargar DataTable Side Server Global		      ***/
        /********************************************************************/
        _fetchGlobal(name,possition,check,is_date_search='', start_date='', end_date=''){

            let scoped = this;
            let target = "";
            if (check) {
                target = [ 
                    {
                        "targets": possition,
                        'render': function (data, type, full, meta)
                        {
                            if (full[possition] == 'Activo'){
                                return "<label class='label label-success'>Activo</label>"
                            }
                            else if (full[possition] == 'Inactivo') {
                                return "<label class='label label-danger'>Inactivo</label>"
                            }
                        }
                    },
                    {
                        "targets": 20,
                        'render': function (data, type, full, meta){
                            return "<button class='btn btn-primary' onclick='_EnviarContra("+full[0]+")'>Enviar Contraseña</button>"
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
                    url: window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Clientes_Web/'+name,
                    type: "POST",
                    data:{
                        is_date_search:is_date_search, start_date:start_date, end_date:end_date
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
            let scoped = this;
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
            scoped.validate = 0;
            $("#ModalAddCliente").modal("hide");
            $('#fetchClientes').DataTable().destroy();
            scoped._fetchGlobal("fetchClientes",19,true,'no','','');
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
                validate:0,
                Cliente:{
                    ID:0,
                    Nombre:'',
                    Apellidos:'',
                    Empresa:'',
                    Cargo:'',
                    Calle_numero:'',
                    Colonia:'',
                    Ciudad:'',
                    Municipio:'',
                    Estado:'',
                    Pais:'',
                    CP:'',
                    RFC:'',
                    Tel1:'',
                    Tel2:'',
                    Email:'',
                    Descuento:'',
                    idCliente: 1967,
                    Status:'Activo',
                    Nivel:'',
                    idSalon:''
                },
                objCliente:null,
                ValidateStatus:false
            }
        }
    }
});

window.dir = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/';

function _EnviarContra(idCliente) { 
    window.open("http://integrattodev.cloudapp.net/WebServiceSendMail/SendPassword.php?idCliente="+idCliente+"",'_blank');
    var formData = new FormData();
    formData.append("idCliente", idCliente);

	$.ajax({
        url: window.dir + 'index.php/Controller_Clientes_Web/ShowPassword',
        type: 'POST',
        processData: false,
        contentType: false,
        timeout: 800000,
        data: formData,
        beforeSend : function (){
		},
		success: function(data){
            swal("Contraseña", "La contraseña que se envio al cliente es: " + data, "success");
		}
        })
        .done(function() {
            console.log("success");
        })
	    .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("fail");
        })
        .always(function() {
            console.log("always");
        });
 }