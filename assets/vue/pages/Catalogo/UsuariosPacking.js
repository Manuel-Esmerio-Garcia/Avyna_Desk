/********************************************************************/
/***   Nombre Archivo: UsuariosPacking.js   		              ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 26/02/2020         					      ***/
/***   Proyecto: Avyna_Desk             		                  ***/
/********************************************************************/

Vue.use(Toasted)

const UsuarioPacking = new Vue({
    el: '#usuariopacking',
    name : 'Usuarios Packing',
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
        let scoped = this
        this._initial();
        document.getElementById("fetchUserPack").onclick = function(e){
            scoped.objUsuario = e.target.parentNode;
        }
    },
    methods: {
        deleteUser(){
            let scoped = this
            if (scoped.objUsuario != null) {
                if (scoped.objUsuario.cells[7].innerText == 'activo') {
                    swal({
                        title: "¿Esta seguro que desea eliminar al usuario?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            let request = {
                                method : 'POST',
                                url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Usuario_Packing/delete`,
                                data:{
                                    id: scoped.objUsuario.childNodes[0].innerHTML
                                }
                            }
                            scoped.active = true;
                            axios(request)
                            .then(function (response) {
                                console.log(response);
                                switch(parseInt(response.status)){
                                    case 200:
                                        console.log(response.data);
                                        Vue.toasted.success('Usuario packing eliminado con exito',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                        scoped.active = false;
                                        this.validate = 0;
                                        scoped._limpiar();
                                        scoped._initial();
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
                                scoped.active = false;
                            })
                            .finally(function () {
                                scoped.active = false;
                            });
                        }
                    });
                }else{
                    Vue.toasted.show('El usuario se encuentra como inactivo.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('Seleccione el usuario que desea eliminar.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }  
        },
        btnUpdateUsuario(){
            let scoped = this;
            if (this.User.Usuario != "") {
                if (this.User.Password != "") {
                    if (this.User.Nombre != "") {
                        if (this.User.Apellido != "") {
                            if (this.User.Telefono != "") {

                                if (scoped.Status == true) {
                                    scoped.User.Status = 'inactivo'
                                }else{
                                    scoped.User.Status = 'activo'
                                }
                                let request = {
                                    method : 'POST',
                                    url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Usuario_Packing/update`,
                                    data:{
                                        usuario: scoped.User
                                    }
                                }
                                scoped.activeModal = true;
                                axios(request)
                                .then(function (response) {
                                    console.log(response);
                                    switch(parseInt(response.status)){
                                        case 200:
                                            console.log(response.data);
                                            Vue.toasted.success('Usuario packing editado con exito',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                            scoped.activeModal = false;
                                            this.validate = 0;
                                            scoped._limpiar();
                                            scoped._initial();
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
                            }else{
                                Vue.toasted.show('El campo telefono no debe de estar vacio',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            }
                        }else{
                            Vue.toasted.show('El campo apellido no debe de estar vacio',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        }
                    }else{
                        Vue.toasted.show('El campo nombre no debe de estar vacio',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                    }
                }else{
                    Vue.toasted.show('El campo contraseña no debe de estar vacio',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('El campo usuario no debe de estar vacio',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        updateModalUser(){
            let scoped = this
            if (scoped.objUsuario != null) {
                let request = {
                    method : 'POST',
                    url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Usuario_Packing/getUsuarioByID`,
                    data:{
                        id: scoped.objUsuario.childNodes[0].innerHTML
                    }
                }
                scoped.active = true;
                axios(request)
                .then(function (response) {
                    console.log(response);
                    switch(parseInt(response.status)){
                        case 200:
                            scoped.User = response.data[0]
                            if (response.data[0]['Status'] == 'activo') {
                                scoped.Status = false;
                            }else{
                                scoped.Status = true;
                            }
                            scoped.validate = 1
                            $("#modalUsuarioPacking").modal("show")
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
                    scoped.active = false;
                })
                .finally(function () {
                    scoped.active = false;
                });
            }else{
                Vue.toasted.show('Seleccione el usuario que desea editar.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }  
        },
        btnSaveUsuario(){
            let scoped = this;
            if (this.User.Usuario != "") {
                if (this.User.Password != "") {
                    if (this.User.Nombre != "") {
                        if (this.User.Apellido != "") {
                            if (this.User.Telefono != "") {
                                let request = {
                                    method : 'POST',
                                    url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Usuario_Packing/create`,
                                    data:{
                                        usuario: scoped.User
                                    }
                                }
                                scoped.activeModal = true;
                                axios(request)
                                .then(function (response) {
                                    console.log(response);
                                    switch(parseInt(response.status)){
                                        case 200:
                                            console.log(response.data);
                                            Vue.toasted.success('Usuario packing creado con exito',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                            scoped.activeModal = false;
                                            this.validate = 0;
                                            scoped._limpiar();
                                            scoped._initial();
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
                            }else{
                                Vue.toasted.show('El campo telefono no debe de estar vacio',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            }
                        }else{
                            Vue.toasted.show('El campo apellido no debe de estar vacio',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        }
                    }else{
                        Vue.toasted.show('El campo nombre no debe de estar vacio',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                    }
                }else{
                    Vue.toasted.show('El campo contraseña no debe de estar vacio',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('El campo usuario no debe de estar vacio',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        addModalUser(){
            this.validate = 0;
            this._limpiarAdd()
            $("#modalUsuarioPacking").modal("show");
        },
        /********************************************************************/
        /***   Función: _fetchGlobal() 	                				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 26/02/2020    					                  ***/
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
        /***   Fecha: 26/02/2020    					                  ***/
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
        /***   Fecha: 26/02/2020    					                  ***/
        /***   Descripción: Obtener Información de la Empresa 		      ***/
        /********************************************************************/
        _initial(){
            console.log('Dentro del initial')
            let scoped = this;
            $('#fetchUserPack').DataTable().destroy()
            scoped.listUsers    =  null;
            // Acción Loading //
            scoped.active = true;

            let request = {
                method : 'POST',
                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Usuario_Packing/init',
            }            
            // Acción Axios SingIn //
            axios(request)
            .then(function (response) {
                console.log(response.data)
                switch(parseInt(response.status)){
                    case 200:
                        scoped.listUsers    = response.data
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
                scoped.active = false;
            })
            .finally(function () {
                scoped.active = false;
                scoped._fetch("fetchUserPack");
            });
        },
        _limpiar(){
            this.User.ID = ""
            this.User.Usuario = ""
            this.User.Password = ""
            this.User.Nombre = ""
            this.User.Apellido = ""
            this.User.Telefono = ""
            this.User.Correo = ""
            this.User.Tipo = "1"
            this.User.Status = "activo"
            this.listUsers = null
            this.validate = 0
            this.objUsuario = null
            this.Status = false
            $("#modalUsuarioPacking").modal("hide");
        },
        _limpiarAdd(){
            this.User.ID = ""
            this.User.Usuario = ""
            this.User.Password = ""
            this.User.Nombre = ""
            this.User.Apellido = ""
            this.User.Telefono = ""
            this.User.Correo = ""
            this.User.Tipo = "1"
            this.User.Status = "activo"
            this.validate = 0
            this.Status = false
            $("#modalUsuarioPacking").modal("hide");
        },
        /********************************************************************/
        /***   Función: _clean() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 26/02/2020    					                  ***/
        /***   Descripción: Limpiar Objeto Vue              		      ***/
        /********************************************************************/
        _clean(){
            let scoped = this;
            scoped._reset();
            $("#modalUsuarioPacking").modal("hide");
            location.reload();
        },
        /********************************************************************/
        /***   Función: _reset() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 26/02/2020    					                  ***/
        /***   Descripción: Inicializa Nuevamente las Variables		      ***/
        /********************************************************************/
        _reset () {
            let scoped = this
            Object.assign(scoped.$data, scoped._initialState());
        },
        /********************************************************************/
        /***   Función: _initialState()                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 26/02/2020    					                  ***/
        /***   Descripción: Declaración de Variables        		      ***/
        /********************************************************************/
        _initialState (){
            return {
                active:false,
                activeModal:false,
                listUsers:null,
                validate: 0,
                objUsuario:null,
                User:{
                    ID:"",
                    Usuario:"",
                    Password:"",
                    Nombre:"",
                    Apellido:"",
                    Telefono:"",
                    Correo:"",
                    Tipo:"1",
                    Status:"activo"
                },
                Status:false
            }
        }
    }
});