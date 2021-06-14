/********************************************************************/
/***   Nombre Archivo: reporteVentaCliente.js      			      ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 20/11/2019         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

Vue.use(Toasted)

const Inventary = new Vue({
    el: '#reporte',
    name : 'Reportes',
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
    },
    methods: {
        /********************************************************************/
        /***   Función: _btnGenerarReporte() 	                     	  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 21/11/2019    					                  ***/
        /***   Descripción: Generar Reporte                          	  ***/
        /********************************************************************/
        _btnGenerarReporte(){
            let scoped = this;

            if (scoped.branch != "") {
                let request = {
                    method : 'POST',
                    url : `${Vue.config.access.IntegrattoAccess.server}/Controller_ReporteSalones/btnGenerarReporte`,
                    data:{
                        distribuidor: scoped.listDealers,
                        cliente: scoped.listClients,
                        branch: scoped.branch,
                    }
                }
                scoped.active = true;
                axios(request)
                .then(function (response) {
                    switch(parseInt(response.status)){
                        case 200:
                            scoped._forceFileDownload(response, 'Reporte_Ventas_Salones');
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
                Vue.toasted.show('Seleccione una sucursal.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _deleteClient() 	                     	      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 21/11/2019    					                  ***/
        /***   Descripción: Eliminar Cliente                        	  ***/
        /********************************************************************/
        _deleteClient(){
            let scoped = this;
            if (scoped.ClientsListSelected != "" && scoped.ClientsListSelected != null) {
                scoped.listClients.splice(scoped.indexClients,1);
                scoped.ClientsListSelected = null;
            }else{
                Vue.toasted.show('Seleccione el cliente que desea eliminar del reporte.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'}); 
            }
        },
        /********************************************************************/
        /***   Función: _addClient() 	                	              ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 21/11/2019    					                  ***/
        /***   Descripción: Agregar Cliente                           	  ***/
        /********************************************************************/
        _addClient(){
            let scoped = this;
            let contador = 0;
            if (scoped.ClientsSelected != null && scoped.ClientsSelected != "") {                
                if (scoped.listClients != null && scoped.listClients != [] && scoped.listClients != "") {
                    scoped.listClients.forEach(element => {
                        if (element.ID == scoped.ClientsSelected.ID) {contador++;}
                    });
                    if (contador == 0) {
                        scoped.listClients.push(scoped.ClientsSelected);
                    }else{
                        Vue.toasted.show('El cliente ya se encuentra agregado al reporte.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                    }
                }else{
                    scoped.listClients.push(scoped.ClientsSelected);
                }
            }else{
                Vue.toasted.show('Seleccione al cliente que desea agregar al reporte.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _clickSelectedClient2() 	                	  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 21/11/2019    					                  ***/
        /***   Descripción: Click al Cliente Selected            	      ***/
        /********************************************************************/
        _clickSelectedClient2(objectProduct,index){
            let scoped = this;
            scoped.ClientsListSelected = objectProduct;
            scoped.indexClients = index;
        },
        /********************************************************************/
        /***   Función: _clickSelectedDealers2() 	                	  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 21/11/2019    					                  ***/
        /***   Descripción: Click al Distribuidor Selected            	  ***/
        /********************************************************************/
        _clickSelectedDealers2(objectProduct,index){
            let scoped = this;
            scoped.dealersListSelected = objectProduct;
            scoped.indexDealers = index;
        },
        /********************************************************************/
        /***   Función: _deleteDealers() 	                     	      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 21/11/2019    					                  ***/
        /***   Descripción: Eliminar Distribuidor                      	  ***/
        /********************************************************************/
        _deleteDealers(){
            let scoped = this;
            if (scoped.dealersListSelected != "" && scoped.dealersListSelected != null) {
                scoped.listDealers.splice(scoped.indexDealers,1);
                scoped.dealersListSelected = null;
            }else{
                Vue.toasted.show('Seleccione el distribuidor que desea eliminar del reporte.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'}); 
            }
        },
        /********************************************************************/
        /***   Función: _addDealers() 	                	              ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 21/11/2019    					                  ***/
        /***   Descripción: Agregar Distribuidor                       	  ***/
        /********************************************************************/
        _addDealers(){
            let scoped = this;
            let contador = 0;
            if (scoped.dealersSelected != null && scoped.dealersSelected != "") {                
                if (scoped.listDealers != null && scoped.listDealers != [] && scoped.listDealers != "") {
                    scoped.listDealers.forEach(element => {
                        if (element.ID == scoped.dealersSelected.ID) {contador++;}
                    });
                    if (contador == 0) {
                        scoped.listDealers.push(scoped.dealersSelected);
                    }else{
                        Vue.toasted.show('El Distribuidor ya se encuentra agregado al reporte.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                    }
                }else{
                    scoped.listDealers.push(scoped.dealersSelected);
                }
            }else{
                Vue.toasted.show('Seleccione al distribuidor que desea agregar al reporte.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _clickSelectedClient() 	                          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 21/11/2019    					                  ***/
        /***   Descripción: Click al Cliente Selected                     ***/
        /********************************************************************/
        _clickSelectedClient(objectProduct){
            let scoped = this;
            scoped.ClientsSelected = objectProduct;
        },
        /********************************************************************/
        /***   Función: _clickSelectedDealers() 	                      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 21/11/2019    					                  ***/
        /***   Descripción: Buscar Clientes Menudeo                   	  ***/
        /********************************************************************/
        _clickSelectedDealers(objectDealers){
            let scoped = this;
            scoped.dealersSelected = objectDealers;
            let request = {
                method : 'POST',
                url : `${Vue.config.access.IntegrattoAccess.server}/Controller_ReporteSalones/clickSelectedDealers`,
                data:{
                    idCliente : objectDealers.ID
                }
            }
            scoped.active = true;
            axios(request)
            .then(function (response) {
                switch(parseInt(response.status)){
                    case 200:
                        console.log(response.data);
                        scoped.objListClients    = response.data;
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
        /***   Función: _forceFileDownload() 	                		  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 20/11/2019    					                  ***/
        /***   Descripción: Acción Descargar CSV                	      ***/
        /********************************************************************/
        _forceFileDownload(response,name){
            //const url = window.URL.createObjectURL(new Blob([response.data]))
            const url = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/CSV/' + name + '.csv';
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', name + '.csv') //or any other extension
            document.body.appendChild(link)
            link.click()
        },
        /********************************************************************/
        /***   Función: _fetchGlobal() 	                				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 20/11/2019    					                  ***/
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
                    url: window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_reporteVentaCliente/'+name,
                    type: "POST"
                }
            });
        },
        /********************************************************************/
        /***   Función: _fetch() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 20/11/2019    					                  ***/
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
        /***   Fecha: 20/11/2019    					                  ***/
        /***   Descripción: Obtener Información de la Empresa 		      ***/
        /********************************************************************/
        _initial(){
            let scoped = this;
            // Acción Loading //
            scoped.active = true;

            let request = {
                method : 'POST',
                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_ReporteSalones/init',
            }            
            // Acción Axios SingIn //
            axios(request)
            .then(function (response) {
                switch(parseInt(response.status)){
                    case 200:
                        scoped.objListProduct    = response.data['catalogo'];
                        scoped.objListPromotion  = response.data['promociones'];
                        scoped.objListDealers    = response.data['clientes'];
                        scoped.listBranch        = response.data['sucursal'];
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
        /***   Fecha: 20/11/2019    					                  ***/
        /***   Descripción: Limpiar Objeto Vue              		      ***/
        /********************************************************************/
        _clean(){
            let scoped = this;
        },
        /********************************************************************/
        /***   Función: _reset() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 20/11/2019    					                  ***/
        /***   Descripción: Inicializa Nuevamente las Variables		      ***/
        /********************************************************************/
        _reset () {
            let scoped = this
            Object.assign(scoped.$data, scoped._initialState());
        },
        /********************************************************************/
        /***   Función: _initialState()                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 20/11/2019    					                  ***/
        /***   Descripción: Declaración de Variables        		      ***/
        /********************************************************************/
        _initialState (){
            return {
                active:false,

                /// Distribuidores ///
                objListDealers:null,
                listDealers:[],
                dealersSelected:null,
                dealersListSelected:null,
                indexDealers:0,

                /// Clientes ///
                objListClients:null,
                listClients:[],
                ClientsSelected:null,
                ClientsListSelected:null,
                indexClients:0,

                /// Infomación ///
                listBranch:[],
                initialDate:"",
                finalDate:"",
                branch:""
            }
        }
    }
});