/********************************************************************/
/***   Nombre Archivo: reporteVPF.js              			      ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 15/01/2020         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

Vue.use(Toasted)

const Inventary = new Vue({
    el: '#VPF',
    name : 'VPF',
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
        scoped._fetchGlobal('tableVPF','','','','','');
        scoped._initial();
    },
    methods: {
        /********************************************************************/
        /***   Función: _exportReport() 	                		      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 16/01/2020    					                  ***/
        /***   Descripción: Acción Descargar CSV                	      ***/
        /********************************************************************/
        _exportReport(){
            let scoped = this;
            let dateValidate = false

            if (scoped.filter.initialDate != null && scoped.filter.initialDate != "" && scoped.filter.endDate != null && scoped.filter.endDate != "") {
                dateValidate = true;
                let dt    = new Date(scoped.filter.initialDate);
                scoped.filter.initialDate =  dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

                dt    = new Date(scoped.filter.endDate);
                scoped.filter.endDate =  dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
            }

            console.log(scoped.filter.initialDate);
            console.log(scoped.filter.endDate);

            let request = {
                method : 'POST',
                url : `${Vue.config.access.IntegrattoAccess.server}/Controller_ReporteVPF/exportReport`,
                data:{
                    initialDate: scoped.filter.initialDate,
                    endDate: scoped.filter.endDate,
                    timbrado: scoped.filter.timbrado,
                    distribuidor:scoped.filter.dealerSelected,
                    sucursal:scoped.filter.branchSelected,
                    valiate:dateValidate
                }
            }
            scoped.active = true;
            axios(request)
            .then(function (response) {
                console.log(response.data);
                switch(parseInt(response.status)){
                    case 200:
                        console.log(response.data);
                        scoped._forceFileDownload(response, 'Reporte_VPF');
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
        },
        /********************************************************************/
        /***   Función: _changeFilter() 	                		      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 15/01/2020    					                  ***/
        /***   Descripción: Acción Descargar CSV                	      ***/
        /********************************************************************/
        _changeFilter(){

            if (this.filter.initialDate != null && this.filter.initialDate != "" && this.filter.endDate != null && this.filter.endDate != "") {
                let dt    = new Date(this.filter.initialDate);
                this.filter.initialDate =  dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

                dt    = new Date(this.filter.endDate);
                this.filter.endDate =  dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
            }

            $('#tableVPF').DataTable().destroy();
            this._fetchGlobal('tableVPF',this.filter.initialDate,this.filter.endDate,this.filter.timbrado,this.filter.branchSelected,this.filter.dealerSelected);
        },
        /********************************************************************/
        /***   Función: _forceFileDownload() 	                		  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 15/01/2020    					                  ***/
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
        /***   Fecha: 15/01/2020    					                  ***/
        /***   Descripción: Cargar DataTable Side Server Global		      ***/
        /********************************************************************/
        _fetchGlobal(name,initialDate,endDate,timbrado,sucursal,distribuidor){
            let target = "";
            target = [
                {
                    "targets": 8,
                    'render': function (data, type, full, meta)
                    {
                        if (full[8] == 0){
                            return "<label class='label label-danger'>No</label>"
                        }else{
                            return "<label class='label label-success'>Si</label>"
                        }
                    }
                },
                {
                    "targets": 14,
                    'render': function (data, type, full, meta)
                    {
                        if (full[14] == 0){
                            return "<label class='label label-default'>Sin Asignar</label>"
                        }
                        else if (full[14] == 1) {
                            return "<label class='label label-warning'>Publico en General</label>"
                        }
                        else if (full[14] == 2) {
                            return "<label class='label label-success'>Propia</label>"
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
                    url: window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_ReporteVPF/'+name,
                    type: "POST",
                    data:{
                        initialDate: initialDate,
                        endDate: endDate,
                        timbrado: timbrado,
                        sucursal: sucursal,
                        distribuidor: distribuidor
                    }
                }
            });
        },
        /********************************************************************/
        /***   Función: _fetch() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 15/01/2020    					                  ***/
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
        /***   Fecha: 15/01/2020    					                  ***/
        /***   Descripción: Obtener Información de la Empresa 		      ***/
        /********************************************************************/
        _initial(){
            let scoped = this;
            // Acción Loading //
            scoped.active = true;

            let request = {
                method : 'POST',
                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_ReporteVPF/init',
            }            
            // Acción Axios SingIn //
            axios(request)
            .then(function (response) {
                switch(parseInt(response.status)){
                    case 200:
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
        /***   Fecha: 15/01/2020   					                  ***/
        /***   Descripción: Limpiar Objeto Vue              		      ***/
        /********************************************************************/
        _clean(){
            let scoped = this;
        },
        /********************************************************************/
        /***   Función: _reset() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 15/01/2020   					                  ***/
        /***   Descripción: Inicializa Nuevamente las Variables		      ***/
        /********************************************************************/
        _reset () {
            let scoped = this
            Object.assign(scoped.$data, scoped._initialState());
        },
        /********************************************************************/
        /***   Función: _initialState()                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 15/01/2020    					                  ***/
        /***   Descripción: Declaración de Variables        		      ***/
        /********************************************************************/
        _initialState (){
            return {
                active:false,
                // Distribuidor //
                objListDealers:null,
                // Sucursal //
                listBranch:null,

                filter:{
                    initialDate:'',
                    endDate:'',
                    timbrado:'',
                    dealerSelected:'',
                    branchSelected:'',
                }
            }
        }
    }
});