/********************************************************************/
/***   Nombre Archivo: Ventas.js   	     				          ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 30/12/2019         					      ***/
/***   Proyecto: Avyna_Desk             		                  ***/
/********************************************************************/

Vue.use(Toasted)

const clients = new Vue({
    el: '#sales',
    name : 'Ventas',
    data:function (){
        return this._initialState();
    },
    components:{
        loading:VueLoading,
        datetime:vuejsDatepicker
    },
    computed:{
        // Función Computado que calcula el total de los importes //
        CalcularTotal(){
            if (this.ObjListProducts != null) {
                this.total = 0;
                for (detalle of this.ObjListProducts) {
                    if (detalle.Importe != "") {
                        this.total += parseFloat(detalle.Importe);
                    }
                    else{
                        this.total += 0;
                    }
                }
                return parseFloat(this.total).toFixed(2);
            }else{
                return 0.00;
            }
        },
        CalcularProducto(){
            if (this.ObjListProducts != null) {
                this.Cant = 0;
                for (detalle of this.ObjListProducts) {
                    if (detalle.Cant != "") {
                        this.Cant += parseFloat(detalle.Cantidad);
                    }
                    else{
                        this.Cant += 0;
                    }
                }
                return parseInt(this.Cant);
            }else{
                return 0;
            }
        }
    },
    mounted() { 
        console.log("mounted");
        let scoped = this;
        // Cargar DataTable _fetchGlobal //
        scoped._fetchGlobal("tableOthersExists",true,6,"","");
        // Acción Click DataTable tableOthersExists //
        $("#tableOthersExists").on("click","tbody","tr",function(e){
            scoped.tableOthersExists = e.target.parentNode;
            scoped._getDetailsOthers(e.target.parentNode.childNodes[0].innerHTML);
        });

        // Acción Click DataTable tableProducts //
        $("#tableProducts").on("click","tbody","tr",function(e){
            if (scoped.Others.idSucursal != "") {
                scoped.tableProducts = e.target.parentNode;
                scoped._getLocations(e.target.parentNode.childNodes[0].innerHTML, scoped.Others.idSucursal);
            }else{
                Vue.toasted.show('Para Continuar es necesario seleccionar la sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }      
        });
    },
    methods: {
        _tabListado(){
            let scoped = this;
            scoped._fetch("tableListProducts");
        },
        _tabRegistro(){
            $('#tableListProducts').DataTable().destroy();
        },
        /********************************************************************/
        /***   Función: _generar() 	                        	          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 02/01/2020    					                  ***/
        /***   Descripción: Generar Otras Salidas              		      ***/
        /********************************************************************/
        _generar(){
            let scoped = this;
            if (scoped.Others.idSucursal != "") {
                if (scoped.Others.Concepto != "") {
                    if (scoped.ObjListProducts != null && scoped.ObjListProducts != "") {
                        let scoped = this;
                        scoped.activeModal = true;

                        let request = {
                            method : 'POST',
                            url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Ventas/generar',
                            data:{
                                info:scoped.ObjListProducts,
                                total:scoped.CalcularProducto,
                                cantidad:scoped.CalcularTotal,
                                idSucursal:scoped.Others.idSucursal,
                                concepto:scoped.Others.Concepto
                            }
                        }

                        axios(request)
                        .then(function (response) {
                            switch(parseInt(response.status)){
                                case 200:
                                    switch (response.data) {
                                        case 0:
                                            Vue.toasted.error('Ocurrio un error al generar la salida.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                            break;
                                        case 1:
                                            Vue.toasted.success('Otra salida generada con exito',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                            $("#modalOthersExists").modal("hide");
                                            scoped._clean();
                                            break;
                                    
                                        default:
                                            Vue.toasted.error('Ocurrio un error inesperado.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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

                    }else{
                        Vue.toasted.show('Para continuar es necesario agregar por lo menos un producto.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                    }
                }else{
                    Vue.toasted.show('Para continuar es necesario capturar el concepto de la salida.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('Para Continuar es necesario seleccionar la sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _addList() 	                        	          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 31/12/2019    					                  ***/
        /***   Descripción: Agregar producto                		      ***/
        /********************************************************************/
        _addList(details){
            let info = JSON.parse(JSON.stringify(details));
            let scoped = this;
            let Existencias = info.Existencias;
            let Cantidad = info.Cantidad;
            let contador = 0;

            if (Cantidad != 0) {

                if (Object.keys(scoped.ObjListProducts).length != 0) {
                    scoped.ObjListProducts.forEach(element => {
                        if (element.ID == info.ID) {
                            contador++;
                            Cantidad = parseInt(Cantidad) + parseInt(element.Cantidad);
                        }
                    });

                    if (contador > 0) {
                        if (Cantidad > Existencias) {
                            Vue.toasted.show('Esta sobrepasando las existencias de la locacion.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        }else{
                            scoped.ObjListProducts.forEach(element => {
                                if (element.ID == info.ID) {
                                    element.Cantidad = parseInt(Cantidad);
                                }
                            });
                            Vue.toasted.success('Cantidad agregada con exito',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        }
                    }else{
                        Vue.toasted.success('Producto agregado con exito',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        //objet.push(details);
                        scoped.ObjListProducts.push(info);
                    }
                    
                }else{
                    Vue.toasted.success('Producto agregado con exito',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                    //objet.push(details);
                    scoped.ObjListProducts.push(info);
                }
            }else{
                Vue.toasted.show('No es posible agregar el producto con cantidad 0.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _getLocations() 	                	          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 30/12/2019    					                  ***/
        /***   Descripción: Abrir Modal Otras Salidas        		      ***/
        /********************************************************************/
        _getLocations(idProducto,idSucursal){
            let scoped = this;
            scoped.activeModal = true;
            scoped.ObjDetailInventary = null;
            $('#tableLocation').DataTable().destroy();

            let request = {
                method : 'POST',
                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Ventas/getLocations',
                data:{
                    idProducto:idProducto,
                    idSucursal:idSucursal
                }
            }

            axios(request)
            .then(function (response) {
                console.log(response);
                switch(parseInt(response.status)){
                    case 200:
                        console.log(response.data);
                        scoped.ObjDetailInventary = response.data;
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
                scoped._fetch("tableLocation");            
            });
        },
        /********************************************************************/
        /***   Función: _deleteOthers() 	                	          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 02/01/2020    					                  ***/
        /***   Descripción: Eliminar Otras Salidas            		      ***/
        /********************************************************************/
        _deleteOthers(){
            let scoped = this;
            if (scoped.tableOthersExists != null) {
                if (scoped.tableOthersExists.childNodes[6].childNodes[0].innerHTML == 'Aceptada') {

                    swal({
                        title: "¿Esta segúro que desea cancelar la salida?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            scoped.active = true;
                            let request = {
                                method : 'POST',
                                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Ventas/deleteOthers',
                                data:{
                                    id:scoped.tableOthersExists.childNodes[0].innerHTML
                                }
                            }
                
                            axios(request)
                            .then(function (response) {
                                console.log(response);
                                switch(parseInt(response.status)){
                                    case 200:
                                        console.log(response.data);
                                        switch (response.data) {
                                            case 0:
                                            Vue.toasted.error('Ocurrio un error al cancelar la salida.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                break;
                                            case 1:
                                                Vue.toasted.success('Salida cancelada con exito',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                scoped._clean();
                                                $('#tableOthersExists').DataTable().ajax.reload();
                                                break;
                                        
                                            default:
                                                Vue.toasted.error('Ocurrio un error inesperado.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                                scoped.active = false;
                            })
                            .finally(function () {
                                scoped.active = false;           
                            });
                        }
                    });

                }else{
                    Vue.toasted.show('La salida ya se encuentra cancelada.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('Seleccione la salida que desea cancelar.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _openModalOthers() 	                	          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 30/12/2019    					                  ***/
        /***   Descripción: Abrir Modal Otras Salidas        		      ***/
        /********************************************************************/
        _openModalOthers(){
            console.log("Click Open Modal");
            let scoped = this;
            scoped.active = true;
            scoped.ObjProduct = null;
            $('#tableProducts').DataTable().destroy();

            let request = {
                method : 'POST',
                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Ventas/openModalOthers'
            }

            axios(request)
            .then(function (response) {
                console.log(response);
                switch(parseInt(response.status)){
                    case 200:
                        console.log(response.data);
                        scoped.ObjBranch = response.data['Sucursal'];
                        scoped.ObjProduct = response.data['Producto'];
                        $("#modalOthersExists").modal("show");
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
                scoped._fetch("tableProducts");         
            });
        },
        /********************************************************************/
        /***   Función: _getDetailsOthers() 	                	      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 30/12/2019    					                  ***/
        /***   Descripción: Cargar Detalle Otras Salidas     		      ***/
        /********************************************************************/
        _getDetailsOthers(id){
            let scoped = this;
            scoped.active = true;
            scoped.ObjDetailsOthersExits = null;
            $('#tableDetailsOthersExists').DataTable().destroy();

            let request = {
                method : 'POST',
                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Ventas/getDetailsOthers',
                data:{
                    id:id
                }
            }

            axios(request)
            .then(function (response) {
                console.log(response);
                switch(parseInt(response.status)){
                    case 200:
                        console.log(response.data);
                        scoped.ObjDetailsOthersExits = response.data;
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
                scoped._fetch("tableDetailsOthersExists");            
            });
        },
        /********************************************************************/
        /***   Función: _fetchGlobal() 	                				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 30/12/2019    					                  ***/
        /***   Descripción: Cargar DataTable Side Server Global		      ***/
        /********************************************************************/
        _fetchGlobal(name,info,column,dateInicio,dateFin){

            let target = [];
            let actions = {};

            actions = {
                "targets":column,
                'render': function (data, type, full, meta){
                    label =  "";
                    if (full[column] == 'Aceptada'){
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
                    url: window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Ventas/'+name,
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
        /***   Fecha: 30/12/2019    					                  ***/
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
        /***   Fecha: 30/12/2019    					                  ***/
        /***   Descripción: Obtener Información de la Empresa 		      ***/
        /********************************************************************/
        _initial(){
            let scoped = this;
            scoped.active = true;

            let request = {
                method : 'POST',
                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Ventas/getOthersExists',
            }

            axios(request)
            .then(function (response) {
                console.log(response);
                switch(parseInt(response.status)){
                    case 200:
                        scoped.ObjOthersExits = response.data;
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
        /***   Fecha: 30/12/2019    					                  ***/
        /***   Descripción: Limpiar Objeto Vue              		      ***/
        /********************************************************************/
        _clean(){
            let scoped = this;
            scoped._reset();
        },
        /********************************************************************/
        /***   Función: _reset() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 30/12/2019    					                  ***/
        /***   Descripción: Inicializa Nuevamente las Variables		      ***/
        /********************************************************************/
        _reset () {
            let scoped = this
            Object.assign(scoped.$data, scoped._initialState());
        },
        /********************************************************************/
        /***   Función: _initialState()                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 30/12/2019    					                  ***/
        /***   Descripción: Declaración de Variables        		      ***/
        /********************************************************************/
        _initialState (){
            return {
                active:false,
                validate:0,
                activeModal:false,
                ObjDetailsOthersExits:null,
                tableOthersExists:null,
                tableProducts:null,
                ObjProduct:null,
                ObjDetailInventary:null,
                ObjListProducts:[],
                ObjBranch:null,
                Others:{
                    idSucursal:"",
                    Concepto:""
                }
            }
        }
    }
});