/********************************************************************/
/***   Nombre Archivo: Inventario_interno.js              		  ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 10/02/2020         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

Vue.use(Toasted)

const Inventary = new Vue({
    el: '#inventary',
    name : 'inventario interno',
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
        scoped._initial();

        document.getElementById("fetchInventary").onclick = function (e) {
            scoped.fetchInventary = e.target.parentNode;
            scoped._searching();
        }

        document.getElementById("fetchInternalInventary").onclick = function (e) {
            scoped.fetchInternalInventary = e.target.parentNode;
        }
    },
    methods: {
        /********************************************************************/
        /***   Función: _modalAddInventary() 	              		      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Action Open Modal                   	      ***/
        /********************************************************************/
        _modalAddInventary(){
            let scoped = this;
            if (scoped.branchSelected != "") {
                scoped.validate = 0;
                scoped._clean(3);
                $("#modalAddInventary").modal("show");
            }else{
                Vue.toasted.show('Seleccione una sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _changeBranch() 	                		      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Action change Branch                  	      ***/
        /********************************************************************/
        _changeBranch(){
            let scoped = this;
            if (scoped.branchSelected != '') {
                scoped._fetchGlobal('fetchInventary',scoped.branchSelected);
            }else{
                $('#fetchInventary').DataTable().destroy();
                document.getElementById("fetchInventary").tBodies[0].innerHTML = "";
                $('#fetchInternalInventary').DataTable().destroy();
                document.getElementById("fetchInternalInventary").tBodies[0].innerHTML = "";
                scoped._clean(4);
                Vue.toasted.show('Seleccione una sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _fetchGlobal() 	                				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Cargar DataTable Side Server Global		      ***/
        /********************************************************************/
        _fetchGlobal(name,sucursal){
            let target = "";
            target = [
                {
                    "targets": 5,
                    'render': function (data, type, full, meta)
                    {
                        if (full[5] == 'Inactivo'){
                            return "<label class='label label-danger'>" + full[5] + "</label>"
                        }else{
                            return "<label class='label label-success'>" + full[5] + "</label>"
                        }
                    }
                },
                {
                    "targets": 3,
                    'render': function (data, type, full, meta)
                    {
                        if (full[3] != null){
                            return full[3]
                        }else{
                            return 0
                        }
                    }
                },
                {
                    "targets": 4,
                    'render': function (data, type, full, meta)
                    {
                        if (full[4] != null){
                            return full[4]
                        }else{
                            return 0
                        }
                    }
                }
            ]

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
                    url: window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_InventarioInterno/'+name,
                    type: "POST",
                    data:{
                        sucursal: sucursal
                    }
                }
            });
        },
        /********************************************************************/
        /***   Función: _fetch() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
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
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Obtener Información de la Empresa 		      ***/
        /********************************************************************/
        _initial(){
            let scoped = this;
            // Acción Loading //
            scoped.active = true;

            let request = {
                method : 'POST',
                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_InventarioInterno/init',
            }            
            // Acción Axios SingIn //
            axios(request)
            .then(function (response) {
                switch(parseInt(response.status)){
                    case 200:
                        scoped.listBranch        = response.data;
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
        /***   Función: _searching() 	               				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Obtener Buscar Detalle Inventario		      ***/
        /********************************************************************/
        _searching(){
            let scoped = this;
            if (scoped.branchSelected != '') {
                if (scoped.fetchInventary != null) {
                    // Acción Loading //
                    scoped.active = true;
    
                    let request = {
                        method : 'POST',
                        url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_InventarioInterno/searching',
                        data:{
                            ID:scoped.fetchInventary.childNodes[0].innerHTML
                        }
                    }            
                    // Acción Axios SingIn //
                    axios(request)
                    .then(function (response) {
                        console.log(response.data);
                        switch(parseInt(response.status)){
                            case 200:
                                $('#fetchInternalInventary').DataTable().destroy();
                                scoped.listDetailsInventary = response.data;
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
                        scoped._fetch("fetchInternalInventary");
                    });

                }else{
                    Vue.toasted.show('Seleccione un producto del inventario.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('Seleccione una sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }                        
        },
        /********************************************************************/
        /***   Función: _addInventary() 	          				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Obtener Agregar Inventario      		      ***/
        /********************************************************************/
        _addInventary(){
            let scoped = this;
            if (scoped.addProduct != '') {
                if (scoped.addStock >= 0) {
                    if (scoped.addBranch != '') {
                        // Acción Loading //
                        scoped.activeModal = true;
        
                        let request = {
                            method : 'POST',
                            url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_InventarioInterno/addInventary',
                            data:{
                                idSucursal:scoped.addBranch,
                                Producto: scoped.addProduct,
                                Minimo: scoped.addMin,
                                Status: 'Activo',
                            }
                        }            
                        // Acción Axios SingIn //
                        axios(request)
                        .then(function (response) {
                            console.log(response.data);
                            switch(parseInt(response.status)){
                                case 200:
                                    scoped._clean(1);
                                    Vue.toasted.success('Inventario agregado con éxito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                        Vue.toasted.show('Seleccione una sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                    }
                }else{
                    Vue.toasted.show('El campo existencias debe de ser mayor a 0',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('El campo producto no debe estar vacio.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _updateInventary() 	          				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Obtener Agregar Inventario      		      ***/
        /********************************************************************/
        _updateInventary(){
            let scoped = this;
            if (scoped.addProduct != '') {
                if (scoped.addStock >= 0) {
                    if (scoped.addBranch != '') {
                        // Acción Loading //
                        scoped.activeModal = true;
                        let status = "";

                        if (scoped.checkStatus) {
                            status = 'Inactivo';
                        }else{
                            status = 'Activo';
                        }
                         
        
                        let request = {
                            method : 'POST',
                            url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_InventarioInterno/updateInventary',
                            data:{
                                ID: scoped.addID,
                                idSucursal:scoped.addBranch,
                                Producto: scoped.addProduct,
                                Minimo: scoped.addMin,
                                Status: status,
                            }
                        }            
                        // Acción Axios SingIn //
                        axios(request)
                        .then(function (response) {
                            console.log(response.data);
                            switch(parseInt(response.status)){
                                case 200:
                                    scoped._clean(1);
                                    Vue.toasted.success('Inventario modificado con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                        Vue.toasted.show('Seleccione una sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                    }
                }else{
                    Vue.toasted.show('El campo existencias debe de ser mayor a 0',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('El campo producto no debe estar vacio.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _modalDeleteInventary() 	          		      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Obtener Agregar Inventario      		      ***/
        /********************************************************************/
        _deleteInventary(){
            let scoped = this;
            if (scoped.branchSelected != "") {
                if (scoped.fetchInventary != null) {
                    if (scoped.fetchInventary.childNodes[5].childNodes[0].innerHTML != 'Inactivo') {
                        // Acción Loading //
                        scoped.active = true;
            
                        let request = {
                            method : 'POST',
                            url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_InventarioInterno/deleteInventary',
                            data:{
                                ID:scoped.fetchInventary.childNodes[0].innerHTML
                            }
                        }            
                        // Acción Axios SingIn //
                        axios(request)
                        .then(function (response) {
                            console.log(response.data);
                            switch(parseInt(response.status)){
                                case 200:
                                    console.log(response.data);
                                    scoped._clean(1);
                                    Vue.toasted.success('Inventario Eliminado con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                        Vue.toasted.show('El inventario ya se encuentra eliminado.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                    }
                }else{
                    Vue.toasted.show('Seleccione el producto que desea eliminar.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('Seleccione una sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _modalUpdateInventary() 	          		      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Obtener Agregar Inventario      		      ***/
        /********************************************************************/
        _modalUpdateInventary(){
            let scoped = this;
            if (scoped.branchSelected != "") {
                if (scoped.fetchInventary != null) {
                    // Acción Loading //
                    scoped.active = true;
        
                    let request = {
                        method : 'POST',
                        url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_InventarioInterno/getInfoUpdateInventary',
                        data:{
                            ID:scoped.fetchInventary.childNodes[0].innerHTML,
                            idSucursal:scoped.branchSelected
                        }
                    }            
                    // Acción Axios SingIn //
                    axios(request)
                    .then(function (response) {
                        console.log(response.data);
                        switch(parseInt(response.status)){
                            case 200:
                                console.log(response.data);

                                (response.data[0]['Status'] == 'Inactivo') ? scoped.checkStatus = true : scoped.checkStatus = false;

                                scoped.addID = response.data[0]['ID'];
                                scoped.addBranch = response.data[0]['idSucursal'];
                                scoped.addProduct = response.data[0]['Producto'];

                                if (response.data[0]['Existencias'] != null) {
                                    scoped.addStock = response.data[0]['Existencias'];
                                }else{
                                    scoped.addStock = 0;
                                }

                                if (response.data[0]['Minimo'] != null) {
                                    scoped.addMin = response.data[0]['Minimo'];
                                }else{
                                    scoped.addMin = 0;
                                }
                                
                                scoped.validate = 1;
                                $("#modalAddInventary").modal("show");
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
                    Vue.toasted.show('Seleccione el producto que desea modificar.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('Seleccione una sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _modalAddDetailsInventary() 	          	      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Obtener Agregar Inventario      		      ***/
        /********************************************************************/
        _modalAddDetailsInventary(){
            let scoped = this;
            if (scoped.branchSelected != "") {
                if (scoped.fetchInventary != null) {
                    scoped.validateDetails = 0;
                    scoped._clean(3);
                    $("#modalAddDetailsInventary").modal("show");
                }else{
                    Vue.toasted.show('Seleccione un inventario interno.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('Seleccione una sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _modalUpdateDetailsInventary() 	          	      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Obtener Agregar Inventario      		      ***/
        /********************************************************************/
        _modalUpdateDetailsInventary(){
            let scoped = this;
            if (scoped.branchSelected != "") {
                if (scoped.fetchInventary != null) {
                    if (scoped.fetchInternalInventary != null) {
                        scoped.addExistencias = scoped.fetchInternalInventary.childNodes[2].innerHTML;
                        scoped.addidDetails = scoped.fetchInternalInventary.childNodes[0].innerHTML;
                        scoped.addDate = scoped.fetchInternalInventary.childNodes[4].innerHTML;
                        scoped.addLote = scoped.fetchInternalInventary.childNodes[6].innerHTML;
                        scoped.addLocation = scoped.fetchInternalInventary.childNodes[8].innerHTML;
                        scoped.addCost = scoped.fetchInternalInventary.childNodes[10].innerHTML;

                        scoped.validateDetails = 1;
                        $("#modalAddDetailsInventary").modal("show");
                    }else{
                        Vue.toasted.show('Seleccione un detalle inventario interno.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                    }                    
                }else{
                    Vue.toasted.show('Seleccione un inventario interno.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('Seleccione una sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _updateDetails() 	          	                  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Obtener Agregar Inventario      		      ***/
        /********************************************************************/
        _updateDetails(){
            let scoped = this;
            if (scoped.addExistencias >= 0) {
                // Acción Loading //
                scoped.activeModalDetails = true;
        
                let request = {
                    method : 'POST',
                    url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_InventarioInterno/updateDetailsInventary',
                    data:{
                        ID :scoped.addidDetails,
                        idInventarioInterno:scoped.fetchInventary.childNodes[0].innerHTML,
                        Existencias: scoped.addExistencias,
                        Lote: scoped.addLote,
                        Fecha_ingreso: scoped.addDate,
                        Locacion: scoped.addLocation,
                        Costo: scoped.addCost
                    }
                }            
                // Acción Axios SingIn //
                axios(request)
                .then(function (response) {
                    console.log(response.data);
                    switch(parseInt(response.status)){
                        case 200:
                            scoped._clean(2);
                            Vue.toasted.success('Detalle Inventario modificada con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                    scoped.activeModalDetails = false;
                })
                .finally(function () {
                    scoped.activeModalDetails = false;
                });
            }else{
                Vue.toasted.show('Las existencias deben de ser mayor o igual a 0.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _addSaveAddDetails() 	                	      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Obtener Agregar Inventario      		      ***/
        /********************************************************************/
        _addSaveAddDetails(){
            let scoped = this;
            if (scoped.addExistencias >= 0) {
                // Acción Loading //
                scoped.activeModalDetails = true;
                let d = new Date();
                let Fecha = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
        
                let request = {
                    method : 'POST',
                    url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_InventarioInterno/addDetailsInventary',
                    data:{
                        idInventarioInterno:scoped.fetchInventary.childNodes[0].innerHTML,
                        Existencias: scoped.addExistencias,
                        Lote: scoped.addLote,
                        Fecha_ingreso: Fecha,
                        Locacion: scoped.addLocation,
                        Costo: scoped.addCost
                    }
                }            
                // Acción Axios SingIn //
                axios(request)
                .then(function (response) {
                    console.log(response.data);
                    switch(parseInt(response.status)){
                        case 200:
                            scoped._clean(2);
                            Vue.toasted.success('Detalle Inventario agregado con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                    scoped.activeModalDetails = false;
                })
                .finally(function () {
                    scoped.activeModalDetails = false;
                });
            }else{
                Vue.toasted.show('Las existencias deben de ser mayor o igual a 0.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _deleteDetailsInventary() 	               	      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Eliminar Detalle Inventario      		      ***/
        /********************************************************************/
        _deleteDetailsInventary(){
            let scoped = this;
            if (scoped.fetchInternalInventary != null) {
                swal({
                    title: "¿Esta segúro que desea eliminar el detalle?",
                    text: "Una vez eliminada, las existencias pasaran a estar en 0",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        scoped.active = true;

                        let request = {
                            method : 'POST',
                            url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_InventarioInterno/deleteDetailsInventary',
                            data:{
                                ID:scoped.fetchInternalInventary.childNodes[0].innerHTML,
                            }
                        }            
                        // Acción Axios SingIn //
                        axios(request)
                        .then(function (response) {
                            console.log(response.data);
                            switch(parseInt(response.status)){
                                case 200:
                                    scoped._clean(2);
                                    Vue.toasted.success('Detalle Inventario eliminada con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                Vue.toasted.show('Seleccione el detalle que desea eliminar.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _btnExtraerProduct() 	               	          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Extraer Inventario              		      ***/
        /********************************************************************/
        _btnExtraerProduct(){
            let scoped = this;
            if (scoped.fetchInventary != null) {
                $("#modalExtraer").modal("show");
                scoped.cantidad = scoped.fetchInventary.childNodes[3].innerHTML;
            }else{
                Vue.toasted.show('Seleccione un producto a extraer.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _btnExtraer() 	               	          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Extraer Inventario              		      ***/
        /********************************************************************/
        _btnExtraer(){
            let scoped = this;
            if (scoped.txtCantidad > 0) {
                if (scoped.txtCantidad <= scoped.cantidad) {
                    scoped.activeModalCantidad = true;
        
                    let request = {
                        method : 'POST',
                        url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_InventarioInterno/btnExtraer',
                        data:{
                            idInventarioInterno:scoped.fetchInventary.childNodes[0].innerHTML,
                            Cantidad: scoped.txtCantidad
                        }
                    }            
                    // Acción Axios SingIn //
                    axios(request)
                    .then(function (response) {
                        console.log(response.data);
                        switch(parseInt(response.status)){
                            case 200:
                                scoped._clean(2);
                                Vue.toasted.success('Extracción realizada con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                        scoped.activeModalCantidad = false;
                    })
                    .finally(function () {
                        scoped.activeModalCantidad = false;
                        $("#modalExtraer").modal("hide");
                    });
                }else{
                    Vue.toasted.show('Esta sobrepasando las existencias del producto.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }                
            }else{
                Vue.toasted.show('El campo cantidad debe de ser mayor a 0.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _clean() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020   					                      ***/
        /***   Descripción: Limpiar Objeto Vue              		      ***/
        /********************************************************************/
        _clean(value){
            let scoped = this;
            switch (value) {
                case 1:
                    scoped.activeModal = false;
                    scoped.active = false;
                    $("#modalAddInventary").modal("hide");
                    $('#fetchInternalInventary').DataTable().destroy();
                    $('#fetchInventary').DataTable().destroy();
		            scoped._fetchGlobal('fetchInventary',scoped.branchSelected);
                    $('#fetchInternalInventary').DataTable().destroy();
                    scoped.listDetailsInventary = null;
                    scoped.validate = 0;
                    scoped.fetchInventary = null;
                    scoped.fetchInternalInventary = null;
                break;
                case 2:
                    scoped.activeModalDetails = false;
                    scoped.activeModalCantidad = false;
                    $("#modalAddDetailsInventary").modal("hide");
                    $('#fetchInternalInventary').DataTable().destroy();
                    $('#fetchInventary').DataTable().destroy();
		            scoped._fetchGlobal('fetchInventary',scoped.branchSelected);
                    $('#fetchInternalInventary').DataTable().destroy();
                    scoped.listDetailsInventary = null;
                    scoped.validateDetails = 0;
                    scoped.fetchInventary = null;
                    scoped.fetchInternalInventary = null;
                    scoped.cantidad = 0;
                    scoped.txtCantidad = 0;
                    scoped.addExistencias = "";
                    scoped.addLote = "";
                    scoped.addDate = "";
                    scoped.addLocation = '';
                    scoped.addCost = 0;
                break;

                case 3:
                    scoped.checkStatus = false;
                    scoped.addBranch = "";
                    scoped.addProduct = "";
                    scoped.addStock = "";
                    scoped.addMin = "";
                    scoped.addDate = "";
                    scoped.addExistencias = 0;
                    scoped.addLocation = '';
                    scoped.addCost = 0;
                    scoped.addLote = "";
                    scoped.txtCantidad = "";
                break;

                case 4:
                    scoped.active = false;
                    scoped.activeModal = false;
                    scoped.activeModalDetails = false;
                    scoped.activeModalCantidad = false;
                    scoped.fetchInventary = null;
                    scoped.fetchInternalInventary = null;
                    scoped.listDetailsInventary = null;
                    scoped.addID = '';
                    scoped.addBranch = '';
                    scoped.addProduct = '';
                    scoped.addStock = 0;
                    scoped.addMin = 0;
                    scoped.checkStatus = 0;
                    scoped.validate = 0;
                    scoped.validateDetails = 0;
                    scoped.checkStatusDetails = 0;
                    scoped.addidDetails = '';
                    scoped.addDate = '';
                    scoped.addLote = '';
                    scoped.addExistencias = 0;
                    scoped.addLocation = '';
                    scoped.addCost = 0;
                    scoped.cantidad = 0;
                    scoped.txtCantidad = 0;
                break;
            
                default:
                break;
            }
        },

        /********************************************************************/
        /***   Función: _reset() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020   					                      ***/
        /***   Descripción: Inicializa Nuevamente las Variables		      ***/
        /********************************************************************/
        _reset () {
            let scoped = this
            Object.assign(scoped.$data, scoped._initialState());
        },
        /********************************************************************/
        /***   Función: _initialState()                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/02/2020    					                  ***/
        /***   Descripción: Declaración de Variables        		      ***/
        /********************************************************************/
        _initialState (){
            return {
                active:false,
                activeModal:false,
                activeModalDetails:false,
                activeModalCantidad:false,
                branchSelected:'',
                listBranch:null,
                fetchInventary:null,
                fetchInternalInventary:null,
                listDetailsInventary:null,
                addID:'',
                addBranch:'',
                addProduct:'',
                addStock:0,
                addMin:0,
                checkStatus:0,
                validate:0,
                validateDetails:0,
                checkStatusDetails:0,
                addidDetails:'',
                addDate:'',
                addLote:'',
                addExistencias:0,
                addLocation:'',
                addCost:0,
                cantidad:0,
                txtCantidad:0
            }
        }
    }
});
