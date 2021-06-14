/********************************************************************/
/***   Nombre Archivo: Cupones.js	     				          ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 11/08/2020         					      ***/
/***   Proyecto: Avyna_Desk             		                  ***/
/********************************************************************/

Vue.use(Toasted)

const coupons = new Vue({
    el: '#coupons',
    name : 'Coupons',
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
        console.log("mounted");
        let scoped = this;
        scoped._initial();

        // Cargar Libreria DatePicker //
	    $('.input-daterange').datepicker({
            format: "yyyy-mm-dd",
            autoclose: true
        });       

        document.getElementById("tableCupones").onclick = function(e){
            scoped.objCoupon = e.target.parentNode;
        }

        document.getElementById("tableCuponesSalones").onclick = function(e){
            scoped.objCouponSalon = e.target.parentNode;
        }

        window.eliminar_Cupon = function (event) {
            $('#tableListCupones').DataTable().destroy();
            let row = this.parentNode.parentNode;
	        let tbody = document.querySelector("#tableListCupones").tBodies[0];
            tbody.removeChild(row);
            if (tbody.rows.length > 0) {
                $('#tableListCupones').dataTable({
                    "language":{
                    "lengthMenu":"Mostrar _MENU_ registros por página.",
                    "zeroRecords": "Lo sentimos. No se encontraron registros.",
                          "info": "Mostrando página _PAGE_ de _PAGES_",
                          "infoEmpty": "No hay registros aún.",
                          "infoFiltered": "(filtrados de un total de _MAX_ registros)",
                          "search" : "Búsqueda",
                          "loadingRecords": "Cargando ...",
                          "processing": "Procesando...",
                          "searchPlaceholder": "Comience a teclear...",
                          "paginate": {
                  "previous": "Anterior",
                  "next": "Siguiente", 
                  }
                   },
                     "select": true,
                });
            }
        }        
    },
    methods: {
        btnGenerarCupones(){
            let scoped = this;
            swal({
                title: "¿Esta seguro que desea generar los cupones?",
                text: "Una vez generados los distribuidores recibiran un correo con el cupon",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {

                    $('#tableListCupones').DataTable().destroy();
                    let Productos = document.getElementById("tableListCupones");
                    let Tbody = Productos.tBodies[0];

                    let arrayCupon = new Array();
                    let arrayidClienteMenudeo = new Array();
                    let arrayMonto = new Array();

                    for (var i = 0; i < Tbody.rows.length; i++) {
                        arrayCupon.push(Tbody.rows[i].cells[0].innerHTML);
                        arrayidClienteMenudeo.push(Tbody.rows[i].cells[1].innerHTML);
                        arrayMonto.push(Tbody.rows[i].cells[5].innerHTML);
                    }

                    scoped.mGenerar.active = true;

                    let request = {
                        method : 'POST',
                        url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Cupones/GenerarEnviar',
                        data: {
                            cupon: arrayCupon,
                            idClienteMenudeo: arrayidClienteMenudeo,
                            monto: arrayMonto
                        }
                    }
        
                    axios(request)
                    .then(function (response) {

                        console.log(response.data);
                        console.log(response.data.Cupones);

                        switch(parseInt(response.data.response)){
                            case 1:
                                Vue.toasted.success('Cupones creados con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                             
                                scoped.sendEmailWebService(response.data.Cupones);                             
                                //window.open("http://integrattodev.cloudapp.net/WebServiceSendMail/sendCupones.php?data=" + dataEmail + "",'_blank');
                                
                                break;
                            case 0:
                                Vue.toasted.show('Ocurrio un error al agregar el cupon.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            break;
                            default:
                                Vue.toasted.error('Ocurrio un error desconocido por favor intente mas tarde.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            break;
                        }
                    })
                    .catch(function (error) {
                        scoped.mGenerar.active = false;
                    })
                    .finally(function () {
                    });
                }
            });
        },
        sendEmailWebService(objCupones){
            let scoped = this;

            let requestEmail = {
                method : 'POST',
                url : 'http://integrattodev.cloudapp.net/WebServiceSendMail/SendCupones.php',
                data: objCupones
            }

            console.log(requestEmail);

            axios(requestEmail)
            .then( (response) => {
                console.log(response);
                console.log(response.data);
                Vue.toasted.success('Cupones enviados con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                scoped.resetGenerarCoupon();
            })
            .catch(function (error) {
                scoped.mGenerar.active = false;
            })
            .finally(function () {
                scoped.mGenerar.active = false;
            });
        },
        btnProcesar(){
            let scoped = this;
            scoped.Generar.dateStart = $("#FechaGStart").val();
            scoped.Generar.dateEnd = $("#FechaGEnd").val();
            if (scoped.Generar.Nivel != "") {
                if (scoped.Generar.dateStart != "" && scoped.Generar.dateEnd != "") {
                    if (scoped.Generar.Monto != "" && parseFloat(scoped.Generar.Monto) != 0 ) {
                        if (scoped.Generar.Cupon != "" && parseFloat(scoped.Generar.Cupon) != 0 && parseFloat(scoped.Generar.Cupon) < 100) {

                            scoped.mGenerar.active = true;

                            let request = {
                                method : 'POST',
                                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Cupones/fetchGenerarCoupon',
                                data: {
                                    nivel: scoped.Generar.Nivel,
                                    start: scoped.Generar.dateStart,
                                    end: scoped.Generar.dateEnd,
                                    monto: scoped.Generar.Monto,
                                    cupon: scoped.Generar.Cupon,
                                }
                            }

                            $('#tableListCupones').DataTable().destroy();
                            document.getElementById("tableListCupones").tBodies[0].innerHTML = "";
                
                            axios(request)
                            .then(function (response) {
                                switch(parseInt(response.status)){
                                    case 200:
                                        console.log(response.data);
                                        if (response.data != null && response.data != "") {
                                            let Productos       = document.getElementById("tableListCupones"); 
                                            let Tbody 			= Productos.tBodies[0];
                                            scoped.listCouponG = response.data;
                                            let cc = 0;

                                            //response.data.length

                                            for (let i = 0; i < response.data.length; i++) {
                                                if (parseFloat(response.data[i]['Monto_Ventas']) >= parseFloat(scoped.Generar.Monto)) {
                                                    cc++;

                                                    let row = Tbody.insertRow(0);
                                                    let cel1 = row.insertCell(0);
                                                    let cel2 = row.insertCell(1);
                                                    let cel3 = row.insertCell(2);
                                                    let cel4 = row.insertCell(3);
                                                    let cel5 = row.insertCell(4);
                                                    let cel6 = row.insertCell(5);
                                                    let cel7 = row.insertCell(6);
                        
                                                    cel1.innerHTML = response.data[i]['Cupon'];
                                                    cel2.innerHTML = response.data[i]['idSalon'];
                                                    cel3.innerHTML = response.data[i]['Salon'].trim();
                                                    cel4.innerHTML = response.data[i]['Nivel'];
                                                    cel5.innerHTML = response.data[i]['Monto_Ventas'];
                                                    cel6.innerHTML = response.data[i]['Monto_Cupon'];
                        
                                                    let boton = document.createElement("button");
                                                    boton.classList.add('btn', 'btn-danger', 'btn-xs');
                                                    boton.addEventListener("click", window.eliminar_Cupon);
                                                    cel7.appendChild(boton);
                        
                                                    let icono = document.createElement("span");
                                                    icono.classList.add('glyphicon', 'glyphicon-remove');
                                                    boton.appendChild(icono);
                                                }
                                                else{
                                                    let contador = 0;
                                                    console.log("Else");
                                                    console.log(contador++);
                                                }
                                            }

                                            console.log("Finaliza");
                                            console.log(cc);

                                            scoped.fetch();
                                        }
                                        else{
                                            Vue.toasted.show('No se encontraron clientes menudeo que cumplan con los filtros.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                                scoped.mGenerar.active = false;
                            })
                            .finally(function () {
                                scoped.mGenerar.active = false;              
                            });
                        }
                        else{
                            Vue.toasted.error('Debe de capturar un porcentaje de cupon mayor a 0 y menor a 100.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        }
                    }
                    else{
                        Vue.toasted.error('Debe de agregar un monto mayor a 0.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                    }
                }
                else{
                    Vue.toasted.error('Seleccione un rango de fechas.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }
            else{
                Vue.toasted.error('Seleccione un nivel.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
           

        },
        generarCoupon(){
            let scoped = this;
            $('#tableListCupones').DataTable().destroy();
            $("#modalGenerar").modal("show");
        },
        changeClient(){
            let scoped = this;
            if (scoped.Coupon.idCliente != '') {
                scoped.mCoupon.active  = true;

                let request = {
                    method : 'POST',
                    url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Cupones/getClienteMenudeo',
                    data: {
                        ID: scoped.Coupon.idCliente
                    }
                }
    
                axios(request)
                .then(function (response) {
                    console.log(response);
                    switch(parseInt(response.status)){
                        case 200:
                            scoped.mCoupon.vtype = true;
                            scoped.listSalon = response.data.Salon;
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
                    sscoped.mCoupon.active  = false;
                })
                .finally(function () {
                    scoped.mCoupon.active  = false;                
                });
            }
        },
        deleteCouponSalon(){
            let scoped = this;

            if (scoped.objCouponSalon != null) {
                if (scoped.objCouponSalon.childNodes[10].innerHTML != 'Cancelado') {

                    swal({
                        title: "¿Esta seguro que desea cancelar el cupon?",
                        text: "Una vez cancelado no se podra usar",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            scoped.active  = true;

                            let request = {
                                method : 'POST',
                                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Cupones/deleteCupon',
                                data: {
                                    ID: scoped.objCouponSalon.childNodes[0].innerHTML
                                }
                            }
                
                            axios(request)
                            .then(function (response) {
                                console.log(response);
                                switch(parseInt(response.status)){
                                    case 200:
                                        if (response.data == 1) {
                                            scoped.cleanCoupon();
                                            Vue.toasted.success('Cupon cancelado con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                        }else{
                                            Vue.toasted.show('Ocurrio un error al cancelar el cupon',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                                scoped.active  = false;
                            })
                            .finally(function () {
                                scoped.active  = false;                
                            });
                        }
                    });
                }else{
                    Vue.toasted.show('El cupon se encuentra cancelado.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('Por favor seleccione un cupon.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        editCouponSalon(){
            let scoped = this;
            if (scoped.objCouponSalon != null) {
                if (scoped.objCouponSalon.childNodes[11].childNodes[0].innerHTML != 'Asignado') {
                    scoped.active  = true;

                    let request = {
                        method : 'POST',
                        url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Cupones/getCuponUpdate',
                        data: {
                            ID: scoped.objCouponSalon.childNodes[0].innerHTML
                        }
                    }
        
                    axios(request)
                    .then(function (response) {
                        console.log(response);
                        switch(parseInt(response.status)){
                            case 200:
                                scoped.mCoupon.vtype = true;
                                scoped.mCoupon.validate = false;
                                scoped.mCoupon.header = 'modal-header bg-warning';
                                scoped.mCoupon.tittle = 'Editar Cupon Salon';
                                $("#modalCoupon").modal("show");
                                scoped.listSalon = response.data.Salon;
                                scoped.Coupon = {...response.data.Cupon[0]}
                                $("#dateVencimiento").val(response.data.Cupon[0]['Fecha_venc']);
                                $("#dateInicio").val(response.data.Cupon[0]['Fecha_inicio']);
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
                        scoped.active  = false;
                    })
                    .finally(function () {
                        scoped.active  = false;                
                    });
                }
                else{
                Vue.toasted.show('El cupon seleccionado ya fue asignado.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('Por favor seleccione un cupon.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        addCouponSalon(){
            let scoped = this;
            scoped.mCoupon.vtype = true;
            scoped.mCoupon.validate = true;
            scoped.mCoupon.header = 'modal-header bg-primary';
            scoped.mCoupon.tittle = 'Agregar Cupon Salon';
            scoped.resetCoupon();
            $("#modalCoupon").modal("show");
        },
        deleteCoupon(){
            let scoped = this;

            if (scoped.objCoupon != null) {
                if (scoped.objCoupon.childNodes[9].innerHTML != 'Cancelado') {
                    swal({
                        title: "¿Esta seguro que desea cancelar el cupon?",
                        text: "Una vez cancelado no se podra usar",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {

                            scoped.active  = true;

                            let request = {
                                method : 'POST',
                                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Cupones/deleteCupon',
                                data: {
                                    ID: scoped.objCoupon.childNodes[0].innerHTML
                                }
                            }
                
                            axios(request)
                            .then(function (response) {
                                console.log(response);
                                switch(parseInt(response.status)){
                                    case 200:
                                        if (response.data == 1) {
                                            scoped.cleanCoupon();
                                            Vue.toasted.success('Cupon cancelado con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                        }else{
                                            Vue.toasted.show('Ocurrio un error al cancelar el cupon',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                                scoped.active  = false;
                            })
                            .finally(function () {
                                scoped.active  = false;                
                            });
                        }
                    });
                }else{
                    Vue.toasted.show('El cupon se encuentra cancelado.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('Por favor seleccione un cupon.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        updateCoupon(){
            let scoped = this;
            scoped.Coupon.Fecha_venc = $("#dateVencimiento").val();
            scoped.Coupon.Fecha_inicio  = $("#dateInicio").val();

            if (scoped.Coupon.Fecha_inicio != "" 
            && scoped.Coupon.Fecha_venc != ""
            && scoped.Coupon.Cupon != ''
            && scoped.Coupon.idCliente != ''
            && scoped.Coupon.Tipo != ''
            && scoped.Coupon.Monto != ''
            && scoped.Coupon.Modo != '') {

                if (scoped.mCoupon.vtype) {
                    if (scoped.Coupon.idCliente_menudeo == '') {
                        Vue.toasted.error('Es necesario agregar un cliente menudeo para generar un cupon para un salon.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        return;
                    }
                }

                scoped.mCoupon.active  = true;

                let request = {
                    method : 'POST',
                    url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Cupones/updateCoupon',
                    data: scoped.Coupon
                }

                axios(request)
                .then(function (response) {
                    console.log(response);
                    switch(parseInt(response.status)){
                        case 200:
                            if (response.data == 1) {
                                scoped.cleanCoupon();
                                Vue.toasted.success('Cupon modificado con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            }else{
                                Vue.toasted.show('Ocurrio un error al cargar el cupon',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                    scoped.mCoupon.active  = false;
                })
                .finally(function () {
                    scoped.mCoupon.active  = false;                
                });
            }
            else{
                Vue.toasted.error('Algunos campos obligatorios estan vacios.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        editCoupon(){
            let scoped = this;
            if (scoped.objCoupon != null) {
                if (scoped.objCoupon.childNodes[10].childNodes[0].innerHTML != 'Asignado') {
                    scoped.active  = true;

                    console.log(scoped.objCoupon);

                    let request = {
                        method : 'POST',
                        url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Cupones/getCupon',
                        data: {
                            ID: scoped.objCoupon.childNodes[0].innerHTML
                        }
                    }
        
                    axios(request)
                    .then(function (response) {
                        console.log(response);
                        switch(parseInt(response.status)){
                            case 200:
                                scoped.mCoupon.vtype = false;
                                scoped.mCoupon.validate = false;
                                scoped.mCoupon.header = 'modal-header bg-warning';
                                scoped.mCoupon.tittle = 'Editar Cupon';
                                $("#modalCoupon").modal("show");
                                scoped.Coupon = {...response.data[0]}
                                $("#dateVencimiento").val(response.data[0]['Fecha_venc']);
                                $("#dateInicio").val(response.data[0]['Fecha_inicio']);
                                console.log(response.data);
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
                        scoped.active  = false;
                    })
                    .finally(function () {
                        scoped.active  = false;                
                    });
                }
                else{
                    Vue.toasted.show('El cupon seleccionado ya fue asignado.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }                
            }else{
                Vue.toasted.show('Por favor seleccione un cupon.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        saveCoupon(){
            let scoped = this;

            scoped.Coupon.Fecha_venc = $("#dateVencimiento").val();
            scoped.Coupon.Fecha_inicio  = $("#dateInicio").val();

            if (scoped.Coupon.Fecha_inicio != "" 
            && scoped.Coupon.Fecha_venc != ""
            && scoped.Coupon.Cupon != ''
            && scoped.Coupon.idCliente != ''
            && scoped.Coupon.Tipo != ''
            && scoped.Coupon.Monto != ''
            && scoped.Coupon.Modo != '') {

                if (scoped.mCoupon.vtype) {
                    if (scoped.Coupon.idCliente_menudeo == '') {
                        Vue.toasted.error('Es necesario agregar un cliente menudeo para generar un cupon para un salon.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        return;
                    }
                }

                scoped.mCoupon.active  = true;

                let request = {
                    method : 'POST',
                    url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Cupones/saveCoupon',
                    data: scoped.Coupon
                }

                axios(request)
                .then(function (response) {
                    console.log(response);
                    switch(parseInt(response.status)){
                        case 200:
                            if (response.data == 1) {
                                scoped.cleanCoupon();
                                Vue.toasted.success('Cupon agregado con exito.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            }else{
                                Vue.toasted.show('Ocurrio un error al cargar el cupon',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                    scoped.mCoupon.active  = false;
                })
                .finally(function () {
                    scoped.mCoupon.active  = false;                
                });
            }
            else{
                Vue.toasted.error('Algunos campos obligatorios estan vacios.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        refreshCoupon(){
            let scoped = this;
            scoped.Coupon.Cupon = scoped.makeid(6);
        },
        addCoupon(){
            let scoped = this;
            scoped.mCoupon.vtype = false;
            scoped.mCoupon.validate = true;
            scoped.mCoupon.header = 'modal-header bg-primary';
            scoped.mCoupon.tittle = 'Agregar Cupon';
            scoped.resetCoupon();
            $("#modalCoupon").modal("show");
        },
        reloadTable(){
            let scoped = this;
            if (scoped.branch != '') {
                scoped.dateBegin = $("#dateBegin").val();
                scoped.dateEnd = $("#dateEnd").val();

                scoped._fetchGlobal('tableCupones',10,scoped.branch,scoped.client,scoped.status,scoped.dateBegin, scoped.dateEnd)
                scoped._fetchGlobal('tableCuponesSalones',11,scoped.branch,scoped.client,scoped.status,scoped.dateBegin, scoped.dateEnd)
            }else{
                console.log('Necesitas seleccionar una sucursal');
            }
        },
        /********************************************************************/
        /***   Función: _fetchGlobal() 	                				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/08/2020    					                  ***/
        /***   Descripción: Cargar DataTable Side Server Global		      ***/
        /********************************************************************/
        _fetchGlobal(name,column,branch,client,status,dateBegin,dateEnd){

            let target = [];
            let actions = {};

            actions = {
                "targets":column,
                'render': function (data, type, full, meta){
                    label =  "";
                    if (full[column] == 'Activo'){
                        label += "<label class='badge badge-success'>"+full[column]+"</label>"
                    }else if(full[column] == 'Vencido'){
                        label += "<label class='badge badge-warning'>"+full[column]+"</label>"
                    }else if(full[column] == 'Cancelado'){
                        label += "<label class='badge badge-danger'>"+full[column]+"</label>"
                    }else if(full[column] == 'Canjeado'){
                        label += "<label class='badge badge-primary'>"+full[column]+"</label>"
                    }else{
                        label += "<label class='badge badge-info'>"+full[column]+"</label>"
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
                    url: window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Cupones/'+name,
                    type: "POST",
                    data:{
                        branch:branch,
                        client:client,
                        status:status,
                        dateBegin:dateBegin,
                        dateEnd:dateEnd
                    }
                }
            });
        },
        fetch(){
            console.log("fetch")
            $('#tableListCupones').dataTable({
                "language":{
                "lengthMenu":"Mostrar _MENU_ registros por página.",
                "zeroRecords": "Lo sentimos. No se encontraron registros.",
                      "info": "Mostrando página _PAGE_ de _PAGES_",
                      "infoEmpty": "No hay registros aún.",
                      "infoFiltered": "(filtrados de un total de _MAX_ registros)",
                      "search" : "Búsqueda",
                      "loadingRecords": "Cargando ...",
                      "processing": "Procesando...",
                      "searchPlaceholder": "Comience a teclear...",
                      "paginate": {
              "previous": "Anterior",
              "next": "Siguiente", 
              }
               },
                 "select": true,
            });
        },
        makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
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
                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Cupones/initial',
            }

            axios(request)
            .then(function (response) {
                console.log(response);
                switch(parseInt(response.status)){
                    case 200:
                        scoped.listBranch = response.data.Branch;
                        scoped.listClient = response.data.Client;
                        scoped.listSalon  = response.data.Salon;
                        scoped.Coupon.Cupon = scoped.makeid(6);
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
        cleanCoupon(){
            $("#modalCoupon").modal("hide");
            this.Coupon.ID = 0;
            this.Coupon.Cupon = this.makeid(6);
            this.Coupon.idCliente = '';
            this.Coupon.Fecha = '';
            this.Coupon.Fecha_venc = '';
            this.Coupon.Fecha_inicio = '';
            this.Coupon.Tipo = '';
            this.Coupon.Modo = '';
            this.Coupon.Monto = '';
            this.Coupon.Status = 'Activo';

            this.mCoupon.validate = true;
            this.mCoupon.header = 'modal-header';
            this.mCoupon.tittle = '';
            this.mCoupon.active = false;
            this.mCoupon.vtype = false;

            if (this.branch != "") { 
                $('#tableCupones').DataTable().ajax.reload();
                $('#tableCuponesSalones').DataTable().ajax.reload(); 
            }

            
        },
        resetCoupon(){

            let dateObj = new Date();
            let month   = dateObj.getUTCMonth() + 1; //months from 1-12
            let day     = dateObj.getUTCDate();
            let year    = dateObj.getUTCFullYear();

            if (day < 10) {
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }

            let newdate = year + "-" + month + "-" + day;

            this.Coupon.ID = 0;
            this.Coupon.Cupon = this.makeid(6);
            this.Coupon.idCliente = '';
            this.Coupon.idCliente_menudeo = '';
            this.Coupon.Fecha = '';
            this.Coupon.Fecha_venc = '';
            this.Coupon.Fecha_inicio = newdate;
            this.Coupon.Tipo = '';
            this.Coupon.Modo = '';
            this.Coupon.Monto = '';
            this.Coupon.Status = 'Activo';
            this.listSalon = null;
            $("#dateInicio").val(newdate);
            $("#dateVencimiento").val("");
        },
        resetGenerarCoupon(){
                this.Generar.Nivel = '';
                this.Generar.Monto = '';
                this.Generar.Cupon = '';
                this.Generar.dateStart = '';
                this.Generar.dateEnd = '';
                this.listCouponG = null;
                $("#modalGenerar").modal("hide");
                $("#FechaGStart").val("");
                $("#FechaGEnd").val("");
                $('#tableListCupones').DataTable().destroy();
                document.getElementById("tableListCupones").tBodies[0].innerHTML = "";
                if (this.branch != "") {
                    $('#tableCupones').DataTable().ajax.reload();
                    $('#tableCuponesSalones').DataTable().ajax.reload();
                }
                
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
                listBranch:null,
                listClient:null,
                listSalon:null,
                listNivel:null,
                listCouponG:null,
                dateStart:'',
                dateEnd:'',
                branch:'',
                client:'',
                status:'',
                mCoupon:{
                    header:'modal-header',
                    tittle:'',
                    validate:false,
                    active:false,
                    vtype:false
                },
                Coupon:{
                    ID:0,
                    Cupon:this.makeid(6),
                    idCliente:'',
                    idCliente_menudeo:'',
                    Fecha:'',
                    Fecha_venc:'',
                    Fecha_inicio: '',
                    Tipo:'',
                    Modo:'',
                    Monto:'',
                    Status:'Activo'
                },
                mGenerar:{
                    header:'modal-header bg-primary',
                    tittle:'Generar Cupones',
                    active:false
                },
                Generar:{
                    Nivel:'',
                    Monto:'',
                    Cupon:'',
                    dateStart:'',
                    dateEnd:''
                },
                objCoupon:null,
                objCouponSalon:null
            }
        }
    }
});