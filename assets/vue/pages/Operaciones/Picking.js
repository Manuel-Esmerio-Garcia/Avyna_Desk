/********************************************************************/
/***   Nombre Archivo: Picking.js      		            	      ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 05/02/2020         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

Vue.use(Toasted)

const Picking = new Vue({
    el: '#pickOrder',
    name : 'pickingList',
    data:function (){
        return this._initialState();
    },
    components:{
        loading:VueLoading,
        datetime:vuejsDatepicker
    },
    computed:{
        CantidadRestante(){
            if (this.listOrderProducts != null) {
                let total = 0;
                for (detalle of this.listOrderProducts) {
                    if (detalle.Cantidad != "") {
                        total += parseInt(detalle.Cantidad);
                    }
                    else{
                        total += 0;
                    }
                }
                return parseInt(total);
            }else{
                return 0;
            }
        }
    },
    mounted() {
        let scoped = this;
        scoped._initial();
    },
    methods: {
        /********************************************************************/
        /***   Función: _searchProducts() 	                	          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 06/02/2020    					                  ***/
        /***   Descripción: Search Products                 		      ***/
        /********************************************************************/
        _searchProducts(){
            let scoped = this;

            if (scoped.branch != "") {
                if (scoped.order != "") {
                    let request = {
                        method : 'POST',
                        url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Picking/searchProducts`,
                        data:{
                            search: scoped.search,
                            order: scoped.order
                        }
                    }
                    scoped.active = true;
                    axios(request)
                    .then(function (response) {
                        switch(parseInt(response.status)){
                            case 200:
                                if (response.data.length == 1) {
                                    Vue.toasted.success('Picking realizado con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                    scoped.listOrderProductsAdd.push(response.data[0]);
                                    let idOrder = response.data[0]['ID'];

                                    for (let i = 0; i < scoped.listOrderProducts.length; i++) {
                                        if (scoped.listOrderProducts[i]['ID'] == idOrder) {
                                            scoped.listOrderProducts.splice(i,1);
                                        }                                      
                                    }
                                    
                                    scoped.search = "";
                                    scoped.$refs.search.$el.focus();
                                }else{
                                    Vue.toasted.success('Existen dos o más productos con el mismo codigo del producto.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                }
                                
                                scoped.active = false;
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
                    Vue.toasted.show('Seleecione una extracción.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }

            }else{
                Vue.toasted.show('Seleccione una sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _realizarPicking() 	                	          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 06/02/2020    					                  ***/
        /***   Descripción: Acción Realizar Picking         		      ***/
        /********************************************************************/
        _realizarPicking(){
            let scoped = this;
            if (this.CantidadRestante == 0) {
                let request = {
                    method : 'POST',
                    url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Picking/realizarPicking`,
                    data:{
                        idOrder: scoped.order
                    }
                }
                scoped.active = true;
                axios(request)
                .then(function (response) {
                    console.log(response.data);
                    switch(parseInt(response.status)){
                        case 200:
                            Vue.toasted.success('Picking realizado con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            scoped._clean();
                            scoped.active = false;
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
                Vue.toasted.error('No es posible realizar el picking del pedido, si el pedido no fue cargado completamente.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _deleteProduct() 	                	          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/02/2020    					                  ***/
        /***   Descripción: Acción Eliminar Producto         		      ***/
        /********************************************************************/
        _deleteProduct(order,index){
            this.listOrderProductsAdd.splice(index,1);
            this.listOrderProducts.push(order);
            this.$refs.search.$el.focus();
        },
        /********************************************************************/
        /***   Función: _addProduct() 	                		          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/02/2020    					                  ***/
        /***   Descripción: Acción Agregar Producto         		      ***/
        /********************************************************************/
        _addProduct(order,index){
            this.listOrderProductsAdd.push(order);
            this.listOrderProducts.splice(index,1);
            this.$refs.search.$el.focus();
        },
        /********************************************************************/
        /***   Función: _changeOrder() 	                		          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/02/2020    					                  ***/
        /***   Descripción: Acción Cambiar Extracción          		      ***/
        /********************************************************************/
        _changeOrder(){
            let scoped = this;
            if (scoped.branch != "") {
                if (scoped.order != "") {
                    let request = {
                        method : 'POST',
                        url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Picking/changeOrder`,
                        data:{
                            order: scoped.order
                        }
                    }
                    scoped.active = true;
                    axios(request)
                    .then(function (response) {
                        console.log(response.data);
                        switch(parseInt(response.status)){
                            case 200:
                                scoped.listOrderProducts = response.data;
                                scoped.active = false;
                                scoped.$refs.search.$el.focus();
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
                    Vue.toasted.show('Seleccione una extracción.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }

            }else{
                scoped.
                Vue.toasted.show('Seleccione una sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _changeBranch() 	                		      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/02/2020    					                  ***/
        /***   Descripción: Acción Cambiar Sucursal          		      ***/
        /********************************************************************/
        _changeBranch(){
            let scoped = this;
            if (scoped.branch != "") {
                let request = {
                    method : 'POST',
                    url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Picking/changeBranch`,
                    data:{
                        branch: scoped.branch
                    }
                }
                scoped.active = true;
                axios(request)
                .then(function (response) {
                    switch(parseInt(response.status)){
                        case 200:
                            scoped.listExtracciones = response.data;
                            scoped.active = false;
                            scoped.$refs.search.$el.focus();
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
                scoped._clean();
                Vue.toasted.show('Seleccione una sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }

        },
        /********************************************************************/
        /***   Función: _fetchGlobal() 	                				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/02/2020    					                  ***/
        /***   Descripción: Cargar DataTable Side Server Global		      ***/
        /********************************************************************/
        _fetchGlobal(name,possition,check){
            let target = "";
            if (check) {
                target = [
                    {
                        "targets": possition,
                        'render': function (data, type, full, meta)
                        {
                            if (full[possition] == 0){
                                return "<label class='badge badge-success'>Recibido</label>"
                            }
                            else if (full[possition] == 1) {
                                return "<label class='badge badge-warning'>Pendiente</label>"
                            }
                            else if (full[possition] == 2) {
                                return "<label class='badge badge-primary'>Envio</label>"
                            }else{
                                return "<label class='badge badge-danger'>Cancelado</label>"
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
                "order" : [],
                "ajax" : {
                    url: window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Picking/'+name,
                    type: "POST"
                }
            });
        },
        /********************************************************************/
        /***   Función: _fetch() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/02/2020    					                  ***/
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
        /***   Función: _initial() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/02/2020    					                  ***/
        /***   Descripción: Obtener Información de la Empresa 		      ***/
        /********************************************************************/
        _initial(){
            let scoped = this;
            // Acción Loading //
            scoped.active = true;

            let request = {
                method : 'POST',
                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Picking/init',
            }            
            // Acción Axios SingIn //
            axios(request)
            .then(function (response) {
                console.log(response.data);
                switch(parseInt(response.status)){
                    case 200:
                        scoped.listBranch = response.data;
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
        },
        /********************************************************************/
        /***   Función: _clean() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/02/2020    					                  ***/
        /***   Descripción: Limpiar Objeto Vue              		      ***/
        /********************************************************************/
        _clean(){
            let scoped = this;
            scoped._reset();
            scoped.$refs.search.$el.focus();

        },
        /********************************************************************/
        /***   Función: _reset() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/02/2020    					                  ***/
        /***   Descripción: Inicializa Nuevamente las Variables		      ***/
        /********************************************************************/
        _reset () {
            let scoped = this
            scoped.$refs.search.$el.focus();
            Object.assign(scoped.$data, scoped._initialState());
        },
        /********************************************************************/
        /***   Función: _initialState()                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/02/2020    					                  ***/
        /***   Descripción: Declaración de Variables        		      ***/
        /********************************************************************/
        _initialState (){
            return {
                active: false,

                // Listado de Sucursales //
                listBranch: null,
                branch: "",

                // Listado de Extracciones //
                listExtracciones : null,
                order: "",

                // Listado de Productos Pedidos //
                listOrderProducts: null,

                // Listado de Productos Agregados //
                listOrderProductsAdd: [],

                // Buscar Productos //
                search:""
            }
        }
    }
});