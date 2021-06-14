/********************************************************************/
/***   Nombre Archivo: reporteVPF.js              			      ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 15/01/2020         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

Vue.use(Toasted)

const Inventary = new Vue({
    el: '#extracciones',
    name : 'Extracciones',
    data:function (){
        return this._initialState();
    },
    components:{
        loading:VueLoading
    },
    mounted() {
        console.log("Mounted");
        let scoped = this;
        scoped._fetchGlobal("tableExtracciones");
    },
    methods: {
        /********************************************************************/
        /***   Función: _fetchGlobal() 	                				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 15/01/2020    					                  ***/
        /***   Descripción: Cargar DataTable Side Server Global		      ***/
        /********************************************************************/
        _fetchGlobal(name){
            let target = "";
            target = []

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
                    url: window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Reporte_Extracciones_Mes/'+name,
                    type: "POST"
                }
            });
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
                name:"Manuel Esmerio Garcia"
            }
        }
    }
});



var example2 = new Vue({
    el: '#example-2',
    data: {active:false,},
    // definir métodos bajo el objeto `methods`
    methods: {
        /********************************************************************/
        /***   Función: _exportReport() 	                		      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 16/01/2020    					                  ***/
        /***   Descripción: Acción Descargar CSV                	      ***/
        /********************************************************************/
        btnExport(){
            let scoped = this;
            let request = {
                method : 'POST',
                url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Reporte_Extracciones_Mes/exportReport`
            }
            scoped.active = true;
            axios(request)
            .then(function (response) {
                switch(parseInt(response.status)){
                    case 200:
                        console.log(response.data);
                        scoped._forceFileDownload(response, 'Reporte_Extracciones_x_Mes');
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
    }
  })