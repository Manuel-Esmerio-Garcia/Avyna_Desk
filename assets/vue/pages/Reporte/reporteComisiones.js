/********************************************************************/
/***   Nombre Archivo: reporteVPF.js              			      ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 15/01/2020         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

Vue.use(Toasted)

const Comisiones = new Vue({
    el: '#Comisiones',
    name : 'Comisiones',
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

        // Cargar Libreria DatePicker //
	    $('.input-daterange').datepicker({
            format: "yyyy-mm-dd",
            autoclose: true
        });
    },
    methods: {
        _btnExport(){
            let scoped = this;
            scoped.comision_venta.dateStart = $("#start_date_Ventas").val();
            scoped.comision_venta.dateEnd = $("#end_date_Ventas").val();

            if (scoped.comision_venta.dateStart != "" && scoped.comision_venta.dateEnd != "") {
                if (scoped.comision_venta.comisionSalon != 0 && scoped.comision_venta.comisionSalon != '' && scoped.comision_venta.comisionDistribuidor != 0 && scoped.comision_venta.comisionDistribuidor != '') {
                    let request = {
                        method : 'POST',
                        url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Reporte_Comisiones/exportReport`,
                        data:{
                            dateStart: scoped.comision_venta.dateStart,
                            dateEnd: scoped.comision_venta.dateEnd,
                            distribuidor: scoped.comision_venta.distribuidor,
                            comisionSalon: scoped.comision_venta.comisionSalon,
                            comisionDistribuidor: scoped.comision_venta.comisionDistribuidor
                        }
                    }
                    scoped.active = true;
                    axios(request)
                    .then(function (response) {
                        console.log(response.data);
                        switch(parseInt(response.status)){
                            case 200:
                                console.log(response.data);
                                scoped._forceFileDownload(response, 'Reporte_Comisiones_Ventas');
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
                }
                else{
                    swal({
                        title: "¿Esta segúro que desea continuar?",
                        text: "No captura valor en alguno de los siguientes campo: '% Comisión Salon o % Comisión Distribuidor'",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            let request = {
                                method : 'POST',
                                url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Reporte_Comisiones/exportReport`,
                                data:{
                                    dateStart: scoped.comision_venta.dateStart,
                                    dateEnd: scoped.comision_venta.dateEnd,
                                    distribuidor: scoped.comision_venta.distribuidor,
                                    comisionSalon: scoped.comision_venta.comisionSalon,
                                    comisionDistribuidor: scoped.comision_venta.comisionDistribuidor
                                }
                            }
                            scoped.active = true;
                            axios(request)
                            .then(function (response) {
                                console.log(response.data);
                                switch(parseInt(response.status)){
                                    case 200:
                                        console.log(response.data);
                                        scoped._forceFileDownload(response, 'Reporte_Comisiones_Ventas');
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
                        }
                      });
                }
            }
            else{
                Vue.toasted.error('Es necesario capturar un rango de fechas',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                //scoped._fetchVentas('tableVentas',0,false,'', '', scoped.comision_venta.distribuidor, scoped.comision_venta.comisionSalon, scoped.comision_venta.comisionDistribuidor);
            }

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
        _btnsearch(){
            let scoped = this;
            scoped.comision_venta.dateStart = $("#start_date_Ventas").val();
            scoped.comision_venta.dateEnd = $("#end_date_Ventas").val();

            if (scoped.comision_venta.dateStart != "" && scoped.comision_venta.dateEnd != "") {
                if (scoped.comision_venta.comisionSalon != 0 && scoped.comision_venta.comisionSalon != '' && scoped.comision_venta.comisionDistribuidor != 0 && scoped.comision_venta.comisionDistribuidor != '') {
                    scoped._fetchVentas('tableVentas',0,false,scoped.comision_venta.dateStart, scoped.comision_venta.dateEnd, scoped.comision_venta.distribuidor, scoped.comision_venta.comisionSalon, scoped.comision_venta.comisionDistribuidor);    
                }
                else{
                    swal({
                        title: "¿Esta segúro que desea continuar?",
                        text: "No captura valor en alguno de los siguientes campo: '% Comisión Salon o % Comisión Distribuidor'",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            scoped._fetchVentas('tableVentas',0,false,scoped.comision_venta.dateStart, scoped.comision_venta.dateEnd, scoped.comision_venta.distribuidor, scoped.comision_venta.comisionSalon, scoped.comision_venta.comisionDistribuidor);    
                        }
                      });
                }
            }
            else{
                Vue.toasted.error('Es necesario capturar un rango de fechas',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                //scoped._fetchVentas('tableVentas',0,false,'', '', scoped.comision_venta.distribuidor, scoped.comision_venta.comisionSalon, scoped.comision_venta.comisionDistribuidor);
            }
        },
        /********************************************************************/
        /***   Función: _fetchVentas() 	                				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/08/2020    					                  ***/
        /***   Descripción: Cargar DataTable Side Server Global		      ***/
        /********************************************************************/
        _fetchVentas(name,possition,check,dateStart, dateEnd, distribuidor, comisionSalon, comisionDistribuidor){
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
                    url: window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Reporte_Comisiones/'+name,
                    type: "POST",
                    data:{
                        dateStart: dateStart,
                        dateEnd: dateEnd,
                        distribuidor: distribuidor,
                        comisionSalon: comisionSalon,
                        comisionDistribuidor: comisionDistribuidor
                    }
                }
            });
        },
        /********************************************************************/
        /***   Función: _fetchSalon() 	                				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/08/2020    					                  ***/
        /***   Descripción: Cargar DataTable Side Server Global		      ***/
        /********************************************************************/
        _fetchSalon(name,possition,check,dateStart, dateEnd, comisionSalon){
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
                    url: window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Reporte_Comisiones/'+name,
                    type: "POST",
                    data:{
                        dateStart: dateStart,
                        dateEnd: dateEnd,
                        comisionSalon: comisionSalon
                    }
                }
            });
        },
        _btnsearchSalon(){
            let scoped = this;
            scoped.comision_Salon.dateStart = $("#start_date_Salon").val();
            scoped.comision_Salon.dateEnd = $("#end_date_Salon").val();

            if (scoped.comision_Salon.dateStart != "" && scoped.comision_Salon.dateEnd != "") {
                if (scoped.comision_Salon.comisionSalon != 0 && scoped.comision_Salon.comisionSalon != '') {
                    scoped._fetchSalon('tableSalon',0,false,scoped.comision_Salon.dateStart, scoped.comision_Salon.dateEnd,scoped.comision_Salon.comisionSalon,);    
                }
                else{
                    swal({
                        title: "¿Esta segúro que desea continuar?",
                        text: "No captura valor en alguno de los siguientes campo: '% Comisión Salon'",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            scoped._fetchSalon('tableSalon',0,false,scoped.comision_Salon.dateStart, scoped.comision_Salon.dateEnd, scoped.comision_Salon.comisionSalon);    
                        }
                      });
                }
            }
            else{
                Vue.toasted.error('Es necesario capturar un rango de fechas',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                //scoped._fetchVentas('tableVentas',0,false,'', '', scoped.comision_venta.distribuidor, scoped.comision_venta.comisionSalon, scoped.comision_venta.comisionDistribuidor);
            }
        },
        _btnExportSalon(){
            let scoped = this;
            scoped.comision_Salon.dateStart = $("#start_date_Salon").val();
            scoped.comision_Salon.dateEnd = $("#end_date_Salon").val();

            if (scoped.comision_Salon.dateStart != "" && scoped.comision_Salon.dateEnd != "") {
                if (scoped.comision_Salon.comisionSalon != 0 && scoped.comision_Salon.comisionSalon != '') {
                        let request = {
                        method : 'POST',
                        url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Reporte_Comisiones/exportReportSalon`,
                        data:{
                            dateStart: scoped.comision_Salon.dateStart,
                            dateEnd: scoped.comision_Salon.dateEnd,
                            comisionSalon: scoped.comision_Salon.comisionSalon
                        }
                    }
                    scoped.active = true;
                    axios(request)
                    .then(function (response) {
                        console.log(response.data);
                        switch(parseInt(response.status)){
                            case 200:
                                console.log(response.data);
                                scoped._forceFileDownload(response, 'Reporte_Comisiones_Salones');
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
                }
                else{
                    swal({
                        title: "¿Esta segúro que desea continuar?",
                        text: "No captura valor en alguno de los siguientes campo: '% Comisión Salon'",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            let request = {
                                method : 'POST',
                                url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Reporte_Comisiones/exportReportSalon`,
                                data:{
                                    dateStart: scoped.comision_Salon.dateStart,
                                    dateEnd: scoped.comision_Salon.dateEnd,
                                    comisionSalon: scoped.comision_Salon.comisionSalon
                                }
                            }
                            scoped.active = true;
                            axios(request)
                            .then(function (response) {
                                console.log(response.data);
                                switch(parseInt(response.status)){
                                    case 200:
                                        console.log(response.data);
                                        scoped._forceFileDownload(response, 'Reporte_Comisiones_Salones');
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
                        }
                      });
                }
            }
            else{
                Vue.toasted.error('Es necesario capturar un rango de fechas',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                //scoped._fetchVentas('tableVentas',0,false,'', '', scoped.comision_venta.distribuidor, scoped.comision_venta.comisionSalon, scoped.comision_venta.comisionDistribuidor);
            }

        },
        _btnSendEmailSalon(){
            let scoped = this;
            scoped.comision_Salon.dateStart = $("#start_date_Salon").val();
            scoped.comision_Salon.dateEnd = $("#end_date_Salon").val();

            if (scoped.comision_Salon.dateStart != "" && scoped.comision_Salon.dateEnd != "") {
                if (scoped.comision_Salon.comisionSalon != 0 && scoped.comision_Salon.comisionSalon != '') {
                    swal({
                        title: "¿Esta seguro que desea enviar el correo a los salones?",
                        text: "Se enviara la información correspondiente a cada salon",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            window.open('http://integrattodev.cloudapp.net/WebServiceSendMail/sendEmailComisionSalon.php?dateStart='+ scoped.comision_Salon.dateStart +'&dateEnd='+scoped.comision_Salon.dateEnd+'&Porcentaje='+scoped.comision_Salon.comisionSalon+'', '_blank');
                        }
                    });
                }
                else{
                    Vue.toasted.error('Es necesario capturar el % de comisión para los salones',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.error('Es necesario capturar un rango de fechas',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
            
        },
        /********************************************************************/
        /***   Función: _fetchSalon() 	                				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 05/08/2020    					                  ***/
        /***   Descripción: Cargar DataTable Side Server Global		      ***/
        /********************************************************************/
        _fetchDistri(name,possition,check,dateStart, dateEnd, comisionDistribuidor){
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
                    url: window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Reporte_Comisiones/'+name,
                    type: "POST",
                    data:{
                        dateStart: dateStart,
                        dateEnd: dateEnd,
                        comisionDistribuidor: comisionDistribuidor
                    }
                }
            });
        },
        _btnsearchDistri(){
            let scoped = this;
            scoped.comision_Distr.dateStart = $("#start_date_Distri").val();
            scoped.comision_Distr.dateEnd = $("#end_date_Distri").val();

            if (scoped.comision_Distr.dateStart != "" && scoped.comision_Distr.dateEnd != "") {
                if (scoped.comision_Distr.comisionDistribuidor != 0 && scoped.comision_Distr.comisionDistribuidor != '') {
                    scoped._fetchDistri('tableDistri',0,false,scoped.comision_Distr.dateStart, scoped.comision_Distr.dateEnd,scoped.comision_Distr.comisionDistribuidor,);    
                }
                else{
                    swal({
                        title: "¿Esta segúro que desea continuar?",
                        text: "No captura valor en alguno de los siguientes campo: '% Comisión Distribuidores'",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            scoped._fetchDistri('tableDistri',0,false,scoped.comision_Distr.dateStart, scoped.comision_Distr.dateEnd, scoped.comision_Distr.comisionDistribuidor);    
                        }
                      });
                }
            }
            else{
                Vue.toasted.error('Es necesario capturar un rango de fechas',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                //scoped._fetchVentas('tableVentas',0,false,'', '', scoped.comision_venta.distribuidor, scoped.comision_venta.comisionSalon, scoped.comision_venta.comisionDistribuidor);
            }
        },
        _btnExportDistri(){
            let scoped = this;
            scoped.comision_Distr.dateStart = $("#start_date_Distri").val();
            scoped.comision_Distr.dateEnd = $("#end_date_Distri").val();

            if (scoped.comision_Distr.dateStart != "" && scoped.comision_Distr.dateEnd != "") {
                if (scoped.comision_Distr.comisionDistribuidor != 0 && scoped.comision_Distr.comisionDistribuidor != '') {
                        let request = {
                        method : 'POST',
                        url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Reporte_Comisiones/exportReportDistri`,
                        data:{
                            dateStart: scoped.comision_Distr.dateStart,
                            dateEnd: scoped.comision_Distr.dateEnd,
                            comisionDistribuidor: scoped.comision_Distr.comisionDistribuidor
                        }
                    }
                    scoped.active = true;
                    axios(request)
                    .then(function (response) {
                        console.log(response.data);
                        switch(parseInt(response.status)){
                            case 200:
                                console.log(response.data);
                                scoped._forceFileDownload(response, 'Reporte_Comisiones_Distribuidores');
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
                }
                else{
                    swal({
                        title: "¿Esta segúro que desea continuar?",
                        text: "No captura valor en alguno de los siguientes campo: '% Comisión Distribuidores'",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            let request = {
                                method : 'POST',
                                url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Reporte_Comisiones/exportReportDistri`,
                                data:{
                                    dateStart: scoped.comision_Distr.dateStart,
                                    dateEnd: scoped.comision_Distr.dateEnd,
                                    comisionDistribuidor: scoped.comision_Distr.comisionDistribuidor
                                }
                            }
                            scoped.active = true;
                            axios(request)
                            .then(function (response) {
                                console.log(response.data);
                                switch(parseInt(response.status)){
                                    case 200:
                                        console.log(response.data);
                                        scoped._forceFileDownload(response, 'Reporte_Comisiones_Distribuidores');
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
                        }
                      });
                }
            }
            else{
                Vue.toasted.error('Es necesario capturar un rango de fechas',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                //scoped._fetchVentas('tableVentas',0,false,'', '', scoped.comision_venta.distribuidor, scoped.comision_venta.comisionSalon, scoped.comision_venta.comisionDistribuidor);
            }

        },
        _btnSendEmailDistri(){
            let scoped = this;
            scoped.comision_Distr.dateStart = $("#start_date_Distri").val();
            scoped.comision_Distr.dateEnd = $("#end_date_Distri").val();

            if (scoped.comision_Distr.dateStart != "" && scoped.comision_Distr.dateEnd != "") {
                if (scoped.comision_Distr.comisionDistribuidor != 0 && scoped.comision_Distr.comisionDistribuidor != '') {
                    swal({
                        title: "¿Esta seguro que desea enviar el correo a los distribuidores?",
                        text: "Se enviara la información correspondiente a cada distribuidor",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            window.open('http://integrattodev.cloudapp.net/WebServiceSendMail/sendEmailComisionDistribuidor.php?dateStart='+ scoped.comision_Distr.dateStart +'&dateEnd='+scoped.comision_Distr.dateEnd+'&Porcentaje='+scoped.comision_Distr.comisionDistribuidor+'', '_blank');
                        }
                    });
                }
                else{
                    Vue.toasted.error('Es necesario capturar el % de comisión para los distribuidores',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.error('Es necesario capturar un rango de fechas',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
            
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
                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Reporte_Comisiones/init',
            }            
            // Acción Axios SingIn //
            axios(request)
            .then(function (response) {
                switch(parseInt(response.status)){
                    case 200:
                        scoped.listClient    = response.data['clientes'];
                        scoped.listBranch    = response.data['sucursal'];
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
                comision_venta:{
                    distribuidor:'',
                    comisionSalon:0,
                    comisionDistribuidor:0,
                    dateStart:'',
                    dateEnd:''
                },
                comision_Salon:{
                    comisionSalon:0,
                    dateStart:'',
                    dateEnd:'',
                },
                comision_Distr:{
                    comisionDistribuidor:0,
                    dateStart:'',
                    dateEnd:'',
                },
                listClient:null,
                listBranch:null
            }
        }
    }
});